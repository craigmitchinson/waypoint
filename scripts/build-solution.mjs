// Builds the Waypoint Dataverse solution from power/waypoint.model.yaml: the unmanaged solution
// zip that `pac solution import` takes. Node only, no dependencies; the model file is read with a
// tolerant reader for its shape, the same trick src/export/__tests__/dataverse.test.ts uses, rather
// than a YAML parser the app does not have.
//
//   node scripts/build-solution.mjs               writes power/solution/Waypoint.zip
//   node scripts/build-solution.mjs --only wp_size  one table, for a probe import
//   node scripts/build-solution.mjs --with-keys    adds the alternate keys the import rejects
import { deflateRawSync, crc32 } from "node:zlib";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const MODEL = `${ROOT}power/waypoint.model.yaml`;
const OUT = `${ROOT}power/solution`;

export const LANGUAGE = 1033;
export const SOLUTION_NAME = "Waypoint";
export const SOLUTION_DISPLAY = "Waypoint Capacity Planner";
export const SOLUTION_VERSION = "1.0.0.0";
export const PUBLISHER_NAME = "waypoint";
export const PREFIX = "wp";
export const OPTION_VALUE_PREFIX = "10000";

// ---------------------------------------------------------------------------
// The tolerant reader
// ---------------------------------------------------------------------------

/** A flow mapping: `{ k: v, k: { k: v }, k: [a, b] }`, values quoted or bare. */
export function parseFlow(text) {
  let i = 0;
  const ws = () => { while (i < text.length && /\s/.test(text[i])) i += 1; };
  function value(inList) {
    ws();
    if (text[i] === "{") return map();
    if (text[i] === "[") return list();
    if (text[i] === '"' || text[i] === "'") {
      const quote = text[i];
      i += 1;
      let out = "";
      while (i < text.length && text[i] !== quote) { out += text[i]; i += 1; }
      i += 1;
      return out;
    }
    // A bare scalar runs to the next key, or to the brace that closes the map. Prose values carry
    // commas and full stops, so only a comma that a key follows ends one.
    let out = "";
    while (i < text.length && !"}]".includes(text[i])) {
      if (text[i] === "," && (inList || /^,\s*\w+\s*:/.test(text.slice(i)))) break;
      out += text[i];
      i += 1;
    }
    return out.trim();
  }
  function map() {
    i += 1;
    const out = {};
    while (i < text.length) {
      ws();
      if (text[i] === "}") { i += 1; return out; }
      if (text[i] === ",") { i += 1; continue; }
      let key = "";
      while (i < text.length && text[i] !== ":") { key += text[i]; i += 1; }
      i += 1;
      out[key.trim()] = value();
    }
    return out;
  }
  function list() {
    i += 1;
    const out = [];
    while (i < text.length) {
      ws();
      if (text[i] === "]") { i += 1; return out; }
      if (text[i] === ",") { i += 1; continue; }
      out.push(value(true));
    }
    return out;
  }
  return value();
}

/** The model file: its header, its choice sets and its tables. */
export function parseModel(source) {
  const lines = source.split(/\r?\n/);
  const model = {};
  const choices = [];
  const tables = [];
  let section = "";
  let choice = null;
  let table = null;
  let list = "";
  let inValues = false;

  for (const line of lines) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const top = /^([a-zA-Z]\w*):/.exec(line);
    if (top) { section = top[1]; choice = null; table = null; continue; }

    if (section === "model") {
      const pair = /^ {2}(\w+): ?(.*)$/.exec(line);
      if (pair) model[pair[1]] = pair[2].replace(/^>-\s*$/, "").trim();
      continue;
    }

    if (section === "choices") {
      const named = /^ {2}(\w+):\s*$/.exec(line);
      if (named) { choice = { logicalName: named[1], displayName: named[1], values: [] }; choices.push(choice); inValues = false; continue; }
      if (!choice) continue;
      const key = /^ {4}(\w+):\s?(.*)$/.exec(line);
      if (key) {
        inValues = key[1] === "values";
        if (key[1] === "displayName") choice.displayName = key[2].trim();
        continue;
      }
      const option = /^ {6}(\d+): ?(.*)$/.exec(line);
      if (inValues && option) choice.values.push({ value: Number(option[1]), label: option[2].trim() });
      continue;
    }

    if (section === "tables") {
      const named = /^ {2}- logicalName: (\S+)/.exec(line);
      if (named) {
        table = { logicalName: named[1], columns: [], alternateKeys: [], relationships: [] };
        tables.push(table);
        list = "";
        continue;
      }
      if (!table) continue;
      const key = /^ {4}(\w+): ?(.*)$/.exec(line);
      if (key) {
        list = ["columns", "alternateKeys", "relationships"].includes(key[1]) ? key[1] : "";
        if (!list) table[key[1]] = key[2].replace(/^>-\s*$/, "").trim();
        continue;
      }
      const item = /^ {6}- (\{.*\})\s*$/.exec(line);
      if (list && item) table[list].push(parseFlow(item[1]));
    }
  }
  return { model, choices, tables };
}

// ---------------------------------------------------------------------------
// The model, read for the solution
// ---------------------------------------------------------------------------

/** The reference tables are organisation owned; everything else is user owned. */
const ORG_OWNED = new Set([
  "wp_workstate", "wp_graderate", "wp_gradeblend", "wp_size", "wp_listvalue", "wp_bankholiday",
  "wp_setting", "wp_gradeblendline", "wp_teamgradecost", "wp_costline",
]);

/** A column the app or Dataverse computes is never a stored column, so it is never created. */
export const isStored = (column) => column.computedIn !== "app" && column.computedIn !== "dataverse";

const truthy = (v) => v === "true" || v === true;

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const names = (tag, wrapper, description) =>
  `<${wrapper}><${tag} description="${esc(description)}" languagecode="${LANGUAGE}" /></${wrapper}>`;

const displayNames = (d) => names("displayname", "displaynames", d);
const labels = (d) => names("label", "labels", d);
const descriptions = (d) => names("Description", "Descriptions", d || " ");

/** The plural the Web API addresses the table by. */
export function entitySetName(logicalName) {
  if (/(s|x|z|ch|sh)$/.test(logicalName)) return `${logicalName}es`;
  if (/[^aeiou]y$/.test(logicalName)) return `${logicalName.slice(0, -1)}ies`;
  return `${logicalName}s`;
}

/** The relationship one lookup column makes, named for the pair it joins. */
export function relationshipName(table, column) {
  return `${table.logicalName}_${column.target.replace(/^wp_/, "")}_${column.schemaName.replace(/^wp_/, "")}`;
}

const CASCADE = { assign: "NoCascade", delete: "RemoveLink", merge: "NoCascade", reparent: "NoCascade", share: "NoCascade", unshare: "NoCascade", rollupview: "NoCascade" };

/** The cascade behaviour the model asks for on one lookup, defaults filled in. */
export function cascadeFor(table, column) {
  const declared = table.relationships.find(
    (r) => r.from === `${table.logicalName}.${column.schemaName}`,
  );
  return { ...CASCADE, ...(declared?.cascade ?? {}) };
}

// ---------------------------------------------------------------------------
// customizations.xml
// ---------------------------------------------------------------------------

const REQUIRED = (column) => (truthy(column.required) ? "required" : "none");

/**
 * The options of one choice column, written inline. The model's choice sets are also written as
 * global sets, but the columns carry a local copy of the same values: the tables were first created
 * with local sets, and Dataverse refuses to turn a local option set into a global one
 * ("IsGlobal information provided True doesn't match the value stored in DB False").
 */
let CHOICES = new Map();

function localOptionSetXml(column, table) {
  const choice = CHOICES.get(column.choiceSet);
  if (!choice) throw new Error(`unknown choice set ${column.choiceSet} on ${table.logicalName}.${column.schemaName}`);
  const options = choice.values.map((v) => `<option value="${v.value}">${labels(v.label)}</option>`).join("");
  return [
    `<optionset Name="${table.logicalName}_${column.schemaName}" localizedName="${esc(column.displayName)}">`,
    "<OptionSetType>picklist</OptionSetType>",
    `<options>${options}</options>`,
    "</optionset>",
  ].join("");
}

function attributeBody(column, table) {
  const d = [];
  switch (column.type) {
    case "text":
      d.push(`<Format>${column.format === "email" ? "email" : column.format === "url" ? "url" : "text"}</Format>`);
      d.push(`<MaxLength>${column.maxLength || 100}</MaxLength>`);
      break;
    case "memo":
      d.push("<Format>textarea</Format>");
      d.push(`<MaxLength>${column.maxLength || 2000}</MaxLength>`);
      break;
    case "whole":
      d.push("<Format>none</Format>");
      d.push(`<MinValue>${column.min ?? -2147483648}</MinValue>`);
      d.push(`<MaxValue>${column.max ?? 2147483647}</MaxValue>`);
      break;
    case "decimal":
      d.push(`<MinValue>${column.min ?? -100000000000}</MinValue>`);
      d.push(`<MaxValue>${column.max ?? 100000000000}</MaxValue>`);
      d.push(`<Accuracy>${Math.min(Number(column.precision) || 2, 10)}</Accuracy>`);
      break;
    case "currency":
      d.push("<MinValue>-922337203685477</MinValue>");
      d.push("<MaxValue>922337203685477</MaxValue>");
      d.push("<Accuracy>2</Accuracy>");
      d.push("<AccuracySource>2</AccuracySource>");
      break;
    case "date":
      d.push(`<Format>${column.format === "DateAndTime" ? "datetime" : "date"}</Format>`);
      d.push(`<Behavior>${column.format === "DateAndTime" ? 1 : 1}</Behavior>`);
      d.push("<CanChangeDateTimeBehavior>1</CanChangeDateTimeBehavior>");
      break;
    case "boolean":
      d.push(`<optionset Name="${table.logicalName}_${column.schemaName}" localizedName="${esc(column.displayName)}"><OptionSetType>boolean</OptionSetType>`);
      d.push(`<options><option value="0">${labels("No")}</option><option value="1">${labels("Yes")}</option></options>`);
      d.push("</optionset>");
      d.push("<DefaultValue>0</DefaultValue>");
      break;
    case "choice":
      d.push(localOptionSetXml(column, table));
      break;
    case "lookup":
      d.push("<LookupStyle>single</LookupStyle>");
      // The target is named by the EntityRelationship, not here: LookupType/@id is a GUID, and a
      // logical name in it fails the import with "Input string was not in a correct format".
      d.push("<LookupTypes />");
      break;
    default:
      throw new Error(`unknown column type ${column.type} on ${table.logicalName}.${column.schemaName}`);
  }
  return d.join("");
}

const TYPE = {
  text: "nvarchar", memo: "ntext", whole: "int", decimal: "decimal", currency: "money",
  date: "datetime", boolean: "bit", choice: "picklist", lookup: "lookup",
};

function attributeXml(column, table) {
  const primary = column.schemaName === table.primaryColumn;
  const readOnly = column.type === "lookup" && column.target === "systemuser" ? "" : "";
  return [
    `<attribute PhysicalName="${column.schemaName}">`,
    `<Type>${TYPE[column.type]}</Type>`,
    `<Name>${column.schemaName}</Name>`,
    `<LogicalName>${column.schemaName}</LogicalName>`,
    `<RequiredLevel>${REQUIRED(column)}</RequiredLevel>`,
    `<DisplayMask>${primary ? "PrimaryName|" : ""}ValidForAdvancedFind|ValidForForm|ValidForGrid</DisplayMask>`,
    "<ImeMode>auto</ImeMode>",
    "<ValidForUpdateApi>1</ValidForUpdateApi>",
    "<ValidForReadApi>1</ValidForReadApi>",
    "<ValidForCreateApi>1</ValidForCreateApi>",
    "<IsCustomField>1</IsCustomField>",
    "<IsAuditEnabled>0</IsAuditEnabled>",
    "<IsSecured>0</IsSecured>",
    `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
    "<IsCustomizable>1</IsCustomizable>",
    "<IsRenameable>1</IsRenameable>",
    "<CanModifySearchSettings>1</CanModifySearchSettings>",
    "<CanModifyRequirementLevelSettings>1</CanModifyRequirementLevelSettings>",
    "<CanModifyAdditionalSettings>1</CanModifyAdditionalSettings>",
    attributeBody(column, table),
    primary ? "<IsPrimaryName>1</IsPrimaryName>" : "",
    readOnly,
    displayNames(column.displayName),
    descriptions(column.description),
    "</attribute>",
  ].join("");
}

function primaryKeyXml(table) {
  return [
    `<attribute PhysicalName="${table.logicalName}id">`,
    "<Type>primarykey</Type>",
    `<Name>${table.logicalName}id</Name>`,
    `<LogicalName>${table.logicalName}id</LogicalName>`,
    "<RequiredLevel>systemrequired</RequiredLevel>",
    "<DisplayMask>ValidForAdvancedFind</DisplayMask>",
    "<ImeMode>auto</ImeMode>",
    "<ValidForUpdateApi>0</ValidForUpdateApi>",
    "<ValidForReadApi>1</ValidForReadApi>",
    "<ValidForCreateApi>1</ValidForCreateApi>",
    "<IsCustomField>1</IsCustomField>",
    "<IsAuditEnabled>0</IsAuditEnabled>",
    "<IsSecured>0</IsSecured>",
    `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
    "<IsCustomizable>0</IsCustomizable>",
    "<IsRenameable>1</IsRenameable>",
    "<CanModifySearchSettings>1</CanModifySearchSettings>",
    "<CanModifyRequirementLevelSettings>0</CanModifyRequirementLevelSettings>",
    "<CanModifyAdditionalSettings>1</CanModifyAdditionalSettings>",
    displayNames(`${table.displayName} id`),
    descriptions(`Unique identifier for ${table.displayName}`),
    "</attribute>",
  ].join("");
}

/**
 * The alternate keys, written as the documented EntityKeys block. Off unless --with-keys is passed:
 * this environment's solution import rejects every shape of the block that has been tried
 * ("The attributes must be defined for creating an EntityKey"), so the keys are made by hand in the
 * maker portal instead, from the alternateKeys in the model.
 */
function entityKeysXml(table, withKeys) {
  if (!withKeys || !table.alternateKeys.length) return "";
  const keys = table.alternateKeys
    .filter((key) => key.columns.every((c) => table.columns.some((col) => col.schemaName === c && isStored(col))))
    .map((key) => [
      "<EntityKey>",
      `<Name>${key.name}</Name>`,
      `<LogicalName>${key.name}</LogicalName>`,
      "<IsCustomizable>1</IsCustomizable>",
      `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
      `<KeyAttributes>${key.columns.map((c) => `<KeyAttribute>${c}</KeyAttribute>`).join("")}</KeyAttributes>`,
      displayNames(key.name),
      "</EntityKey>",
    ].join(""));
  return keys.length ? `<EntityKeys>${keys.join("")}</EntityKeys>` : "";
}

export function entityXml(table, withKeys) {
  const stored = table.columns.filter(isStored);
  const attributes = [primaryKeyXml(table), ...stored.map((c) => attributeXml(c, table))].join("");
  const entity = [
    `<entity Name="${table.logicalName}">`,
    names("LocalizedName", "LocalizedNames", table.displayName),
    names("LocalizedCollectionName", "LocalizedCollectionNames", table.displayCollectionName),
    descriptions(table.description),
    `<attributes>${attributes}</attributes>`,
    `<EntitySetName>${entitySetName(table.logicalName)}</EntitySetName>`,
    "<IsDuplicateCheckSupported>1</IsDuplicateCheckSupported>",
    "<IsBusinessProcessEnabled>0</IsBusinessProcessEnabled>",
    "<IsRequiredOffline>0</IsRequiredOffline>",
    "<IsInteractionCentricEnabled>0</IsInteractionCentricEnabled>",
    "<IsConnectionsEnabled>0</IsConnectionsEnabled>",
    "<IsDocumentManagementEnabled>0</IsDocumentManagementEnabled>",
    "<IsActivity>0</IsActivity>",
    "<IsActivityParty>0</IsActivityParty>",
    "<IsAvailableOffline>1</IsAvailableOffline>",
    "<IsChildEntity>0</IsChildEntity>",
    "<IsAuditEnabled>0</IsAuditEnabled>",
    "<IsMailMergeEnabled>0</IsMailMergeEnabled>",
    "<IsVisibleInMobile>0</IsVisibleInMobile>",
    "<IsVisibleInMobileClient>1</IsVisibleInMobileClient>",
    "<IsReadOnlyInMobileClient>0</IsReadOnlyInMobileClient>",
    "<IsOfflineInMobileClient>1</IsOfflineInMobileClient>",
    "<IsQuickCreateEnabled>0</IsQuickCreateEnabled>",
    "<IsMapiGridEnabled>0</IsMapiGridEnabled>",
    "<IsReadingPaneEnabled>1</IsReadingPaneEnabled>",
    "<EnforceStateTransitions>0</EnforceStateTransitions>",
    `<OwnershipTypeMask>${ORG_OWNED.has(table.logicalName) ? "OrgOwned" : "UserOwned"}</OwnershipTypeMask>`,
    "<IsCustomEntity>1</IsCustomEntity>",
    "<IsCustomizable>1</IsCustomizable>",
    "<IsRenameable>1</IsRenameable>",
    "<IsMappable>1</IsMappable>",
    `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
    "</entity>",
  ].join("");
  return [
    "<Entity>",
    `<Name LocalizedName="${esc(table.displayName)}" OriginalName="${esc(table.displayName)}">${table.logicalName}</Name>`,
    `<EntityInfo>${entity}</EntityInfo>`,
    entityKeysXml(table, withKeys),
    "</Entity>",
  ].join("");
}

export function relationshipXml(table, column) {
  const cascade = cascadeFor(table, column);
  return [
    `<EntityRelationship Name="${relationshipName(table, column)}">`,
    "<EntityRelationshipType>OneToMany</EntityRelationshipType>",
    "<IsCustomizable>1</IsCustomizable>",
    `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
    `<ReferencingEntityName>${table.logicalName}</ReferencingEntityName>`,
    `<ReferencedEntityName>${column.target}</ReferencedEntityName>`,
    `<ReferencingAttributeName>${column.schemaName}</ReferencingAttributeName>`,
    "<CascadeAssign>" + cascade.assign + "</CascadeAssign>",
    "<CascadeDelete>" + cascade.delete + "</CascadeDelete>",
    "<CascadeReparent>" + cascade.reparent + "</CascadeReparent>",
    "<CascadeShare>" + cascade.share + "</CascadeShare>",
    "<CascadeUnshare>" + cascade.unshare + "</CascadeUnshare>",
    "<CascadeRollupView>" + cascade.rollupview + "</CascadeRollupView>",
    "<IsValidForAdvancedFind>1</IsValidForAdvancedFind>",
    "<IsHierarchical>0</IsHierarchical>",
    `<RelationshipDescription>${descriptions(column.description)}</RelationshipDescription>`,
    "<EntityRelationshipRoles>",
    `<EntityRelationshipRole><NavPaneDisplayOption>DoNotDisplay</NavPaneDisplayOption><NavPaneArea>Details</NavPaneArea><NavPaneOrder>10000</NavPaneOrder><NavPaneLabel><LocalizedLabels><LocalizedLabel description="${esc(table.displayCollectionName)}" languagecode="${LANGUAGE}" /></LocalizedLabels></NavPaneLabel><RelationshipRoleType>1</RelationshipRoleType></EntityRelationshipRole>`,
    "</EntityRelationshipRoles>",
    "</EntityRelationship>",
  ].join("");
}

export function optionSetXml(choice) {
  const options = choice.values
    .map((v) => `<option value="${v.value}" ExternalValue="">${labels(v.label)}${descriptions(v.label)}</option>`)
    .join("");
  return [
    `<optionset Name="${choice.logicalName}" localizedName="${esc(choice.displayName)}" IsGlobal="1">`,
    "<OptionSetType>picklist</OptionSetType>",
    `<IntroducedVersion>${SOLUTION_VERSION}</IntroducedVersion>`,
    "<IsCustomizable>1</IsCustomizable>",
    displayNames(choice.displayName),
    `<options>${options}</options>`,
    "</optionset>",
  ].join("");
}

export function customizationsXml({ tables, choices, withKeys }) {
  CHOICES = new Map(choices.map((c) => [c.logicalName, c]));
  const lookups = tables.flatMap((t) =>
    t.columns.filter((c) => c.type === "lookup" && isStored(c)).map((c) => relationshipXml(t, c)));
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    "<ImportExportXml>",
    `<Entities>${tables.map((t) => entityXml(t, withKeys)).join("")}</Entities>`,
    "<Roles />",
    "<Workflows />",
    "<FieldSecurityProfiles />",
    "<Templates />",
    `<EntityMaps />`,
    `<EntityRelationships>${lookups.join("")}</EntityRelationships>`,
    "<OrganizationSettings />",
    `<optionsets>${choices.map(optionSetXml).join("")}</optionsets>`,
    "<CustomControls />",
    "<SolutionPluginAssemblies />",
    `<Languages><Language>${LANGUAGE}</Language></Languages>`,
    "</ImportExportXml>",
  ].join("");
}

export function solutionXml({ tables, choices }) {
  const roots = [
    ...tables.map((t) => `<RootComponent type="1" schemaName="${t.logicalName}" behavior="0" />`),
    ...choices.map((c) => `<RootComponent type="9" schemaName="${c.logicalName}" behavior="0" />`),
  ].join("");
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<ImportExportXml version="9.2.0.0" SolutionPackageVersion="9.2" languagecode="1033" generatedBy="CrmLive" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    "<SolutionManifest>",
    `<UniqueName>${SOLUTION_NAME}</UniqueName>`,
    names("LocalizedName", "LocalizedNames", SOLUTION_DISPLAY),
    descriptions("The Waypoint Capacity Planner data model: tables, choices, keys and relationships."),
    `<Version>${SOLUTION_VERSION}</Version>`,
    "<Managed>0</Managed>",
    "<Publisher>",
    `<UniqueName>${PUBLISHER_NAME}</UniqueName>`,
    names("LocalizedName", "LocalizedNames", "CCS Intelligent Process Automation"),
    descriptions("CCS Intelligent Process Automation"),
    '<EMailAddress xsi:nil="true"></EMailAddress>',
    '<SupportingWebsiteUrl xsi:nil="true"></SupportingWebsiteUrl>',
    `<CustomizationPrefix>${PREFIX}</CustomizationPrefix>`,
    `<CustomizationOptionValuePrefix>${OPTION_VALUE_PREFIX}</CustomizationOptionValuePrefix>`,
    "<Addresses></Addresses>",
    "</Publisher>",
    `<RootComponents>${roots}</RootComponents>`,
    "<MissingDependencies></MissingDependencies>",
    "</SolutionManifest>",
    "</ImportExportXml>",
  ].join("");
}

export const CONTENT_TYPES = [
  '<?xml version="1.0" encoding="utf-8"?>',
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
  '<Default Extension="xml" ContentType="text/xml" />',
  "</Types>",
].join("");

// ---------------------------------------------------------------------------
// The zip, written by hand so the script needs nothing installed
// ---------------------------------------------------------------------------

export function zip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;
  for (const [name, text] of entries) {
    const raw = Buffer.from(text, "utf8");
    const body = deflateRawSync(raw);
    const nameBuf = Buffer.from(name, "utf8");
    const sum = crc32(raw) >>> 0;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt32LE(0, 10);
    local.writeUInt32LE(sum, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    locals.push(local, nameBuf, body);

    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);
    entry.writeUInt16LE(20, 6);
    entry.writeUInt16LE(0, 8);
    entry.writeUInt16LE(8, 10);
    entry.writeUInt32LE(0, 12);
    entry.writeUInt32LE(sum, 16);
    entry.writeUInt32LE(body.length, 20);
    entry.writeUInt32LE(raw.length, 24);
    entry.writeUInt16LE(nameBuf.length, 28);
    entry.writeUInt32LE(offset, 42);
    central.push(entry, nameBuf);
    offset += local.length + nameBuf.length + body.length;
  }
  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, dir, end]);
}

// ---------------------------------------------------------------------------

export function readModel() {
  return parseModel(readFileSync(MODEL, "utf8"));
}

function main() {
  const only = process.argv.includes("--only")
    ? process.argv[process.argv.indexOf("--only") + 1].split(",")
    : null;
  const parsed = readModel();
  const tables = only ? parsed.tables.filter((t) => only.includes(t.logicalName)) : parsed.tables;
  const used = new Set(tables.flatMap((t) => t.columns.filter(isStored).map((c) => c.choiceSet)));
  const choices = only ? parsed.choices.filter((c) => used.has(c.logicalName)) : parsed.choices;
  const model = { tables, choices, withKeys: process.argv.includes("--with-keys") };

  const files = [
    ["solution.xml", solutionXml(model)],
    ["customizations.xml", customizationsXml(model)],
    ["[Content_Types].xml", CONTENT_TYPES],
  ];
  mkdirSync(`${OUT}/src`, { recursive: true });
  for (const [name, text] of files) writeFileSync(`${OUT}/src/${name}`, text);
  writeFileSync(`${OUT}/${SOLUTION_NAME}.zip`, zip(files));
  const lookups = tables.reduce((n, t) => n + t.columns.filter((c) => c.type === "lookup" && isStored(c)).length, 0);
  const columns = tables.reduce((n, t) => n + t.columns.filter(isStored).length, 0);
  console.log(`${tables.length} tables, ${columns} columns, ${lookups} relationships, ${choices.length} choice sets -> ${OUT}/${SOLUTION_NAME}.zip`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
