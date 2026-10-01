// FxCheck: the canvas app's Power Fx, bound against the real Dataverse columns, offline.
//
//   dotnet run --project tools/fxcheck -- --job <job.json> --columns power/canvas/columns.json
//
// The job file is written by scripts/fxcheck.mjs: every formula in power/app, with the file and the
// line it starts on. This program builds a symbol table from power/canvas/columns.json, resolves the
// named formulas into it, and then binds every screen and component property against the lot.
// Findings go to stdout as JSON.
using System.Collections.Immutable;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using FxCheck;
using Microsoft.PowerFx;
using Microsoft.PowerFx.Core.Utils;
using Microsoft.PowerFx.Types;

// --eval is the offline parity run in Eval.cs, not the checking path below.
if (Environment.GetCommandLineArgs().Contains("--eval")) return Eval.Run();

var jobPath = ArgOf("--job");
var columnsPath = ArgOf("--columns");
var modernPath = ArgOf("--modern");
var dataSourcesPath = ArgOf("--datasources");
var allTables = Environment.GetCommandLineArgs().Contains("--all-tables");
if (jobPath is null || columnsPath is null || modernPath is null)
{
    Console.Error.WriteLine("usage: FxCheck --job <job.json> --columns <columns.json> --modern <modern-controls.json>");
    return 2;
}

var job = JsonSerializer.Deserialize<Job>(File.ReadAllText(jobPath), Json.Options)!;
var catalogue = Catalogue.Load(columnsPath);
var modern = ModernCatalogue.Load(modernPath);

// The tables Studio has connected. A table the app has not added with Add data is still typed here,
// so the formulas that read it are checked for everything else, and reported by Rules instead.
var unconnected = !allTables && dataSourcesPath is not null && File.Exists(dataSourcesPath)
    ? catalogue.Unconnected(Catalogue.Connected(dataSourcesPath))
    : new List<string>();

var symbols = new SymbolTable();
var config = new PowerFxConfig { SymbolTable = symbols };

// The Dataverse tables, under the names Studio uses once a table is added with Add data.
var tableTypes = new Dictionary<string, TableType>();
foreach (var table in catalogue.Tables)
{
    var type = catalogue.Record(table).ToTable();
    tableTypes[table.Display] = type;
    symbols.AddVariable(table.Display, type, mutable: true);
}

// IsMatch, Match and MatchAll are in the library but off until the regular expression functions are
// enabled, and report "recognized but not supported" until they are.
config.EnableRegExFunctions(TimeSpan.FromSeconds(1), 50);

// User() is canvas-only. Rewriter renames the call to this symbol, so that User().Email binds
// against the record and User().Nope is still an error.
symbols.AddVariable("FxUser", RecordType.Empty()
    .Add("FullName", FormulaType.String)
    .Add("Email", FormulaType.String)
    .Add("Image", FormulaType.String), mutable: true);

foreach (var pair in catalogue.OptionSets)
{
    symbols.AddOptionSet(pair.Value, new DName(pair.Key));
}

// The canvas enums Power Fx Core has no table for. The modern controls' enums come from
// tools/fxcheck/modern-controls.json with every member the reference names; for the classic ones,
// and for any member the table does not carry, the members are the ones the sources use, so a
// member name that is wrong in every source is not caught.
var canvasEnums = new[]
{
    "ScreenTransition", "Font", "FontWeight", "Align", "VerticalAlign", "DisplayMode", "Layout",
    "LayoutDirection", "LayoutMode", "LayoutAlignItems", "LayoutJustifyContent", "LayoutOverflow",
    "Overflow", "NotificationType", "BorderStyle", "ImagePosition", "TextMode", "TextPosition",
    "FormMode", "Transition", "TextFormat", "RemoveFlags", "Direction", "FormPattern",
};
var allText = string.Join("\n", job.Units.Select(u => u.Text));
var enumMembers = new Dictionary<string, HashSet<string>>();
foreach (var pair in modern.Enums) enumMembers[pair.Key] = new HashSet<string>(pair.Value.Select(m => m.Trim('\u0027')));
foreach (var name in canvasEnums.Concat(modern.Enums.Keys))
{
    // A dotted enum name is quoted where the sources use it: 'BadgeCanvas.Shape'.Square.
    var pattern = name.Contains('.')
        ? "\u0027" + Regex.Escape(name) + "\u0027\\.(?:\u0027([^\u0027]+)\u0027|([A-Za-z_][A-Za-z0-9_]*))"
        : "\\b" + name + "\\.(?:\u0027([^\u0027]+)\u0027|([A-Za-z_][A-Za-z0-9_]*))";
    var members = Regex.Matches(allText, pattern)
        .Select(m => m.Groups[1].Success ? m.Groups[1].Value : m.Groups[2].Value)
        .ToList();
    if (members.Count == 0 && !enumMembers.ContainsKey(name)) continue;
    var set = enumMembers.TryGetValue(name, out var known) ? known : enumMembers[name] = new HashSet<string>();
    foreach (var member in members) set.Add(member);
}

foreach (var pair in enumMembers)
{
    var builder = ImmutableDictionary.CreateBuilder<DName, DName>();
    foreach (var member in pair.Value) builder[new DName(member)] = new DName(member);
    symbols.AddOptionSet(new OptionSet(pair.Key, builder.ToImmutable()), new DName(pair.Key));
}

// A canvas component is the one control whose members are declared in the source: its custom
// properties, each with a Default that types it. Typing the component as a record of them is what
// lets `cmpStepper.Steps` carry columns. A component with a behaviour property is left out, because
// `cmpX.OnSomething(arg)` is a call, not a record field read.
var componentTypes = new Dictionary<string, RecordType>();
foreach (var component in job.Components)
{
    if (component.Value.Values.Any(p => p.Kind is "Event" or "Action")) continue;
    componentTypes[component.Key] = RecordType.Empty();
}

// Control name -> the identifier and version of the modern control it is, from whichever of its
// properties the YAML sets. Used below to give a Dropdown, Combo box or Tab list a real type for
// Selected and SelectedItems instead of leaving them Deferred.
var controlKinds = job.Units
    .Where(u => u.Kind == "property" && u.Control is not null)
    .GroupBy(u => { var dot = u.Path.LastIndexOf('.'); return dot < 0 ? u.Path : u.Path[..dot]; })
    .ToDictionary(g => g.Key, g => g.First().Control!);

// A control whose Selected and SelectedItems are typed below from its own Items is declared there
// instead, once that typing is worked out further down.
var outputTypedKinds = new[] { "ModernDropdown", "ModernCombobox", "ModernTabList" };
bool IsOutputTyped(string control) =>
    controlKinds.TryGetValue(control, out var kind) && outputTypedKinds.Contains(kind.Split('@')[0]);

// A control is not a type this tool can know, so every control, and the scopes a property reads
// through, is deferred: a name under one of them is not checked. Parent and Self are keywords to
// the parser, so Rewriter renames them to the symbols declared here.
var untyped = job.Controls.Concat(new[] { "FxParent", "FxSelf", "App", "Host", "Compass", "Connection" });
foreach (var control in untyped.Distinct())
{
    if (tableTypes.ContainsKey(control) || componentTypes.ContainsKey(control) || IsOutputTyped(control)) continue;
    symbols.AddVariable(control, FormulaType.Deferred, mutable: true);
}

var engine = new RecalcEngine(config);
var parser = new ParserOptions { AllowsSideEffects = true, Culture = CultureInfo.InvariantCulture };

var ownItems = job.Units
    .Where(u => u.Kind == "property" && u.Path.EndsWith(".Items", StringComparison.Ordinal))
    .GroupBy(u => u.Path[..^".Items".Length])
    .ToDictionary(g => g.Key, g => g.First().Text);

// A modern Dropdown, Combo box or Tab list types three of its properties from its own Items: the
// row of Items is what Default and DefaultSelectedItems must carry, and the row ItemDisplayText
// reads through ThisItem. Items of ["a", "b"] is a single-column table whose column is Value.
var itemsRows = new Dictionary<string, FormulaType>();
FormulaType ItemsRow(string control)
{
    if (itemsRows.TryGetValue(control, out var cached)) return cached;
    var row = FormulaType.Deferred;
    if (ownItems.TryGetValue(control, out var items))
    {
        var check = engine.Check(Rewriter.Rewrite(items).Text, parser);
        if (!Problems(check).Any() && check.ReturnType is TableType table) row = table.ToRecord();
    }

    // A row this could not resolve yet, because its own Items reads a named formula still awaiting
    // its turn in the round-robin below, is not cached, so a later call can find it once that
    // formula is declared.
    if (row is RecordType) itemsRows[control] = row;
    return row;
}

// A Dropdown, Combo box or Tab list is declared as a record of its own properties, rather than left
// Deferred, so that a formula elsewhere that reads its Selected or SelectedItems (not just the
// property being set) binds a row, or a table of rows, of its own Items: `ctl.Selected.Value` and
// `ForAll(ctl.SelectedItems As P, ...)`. DeclareOutputTyped runs once its Items formula resolves,
// which may take one of the round-robin's own rounds where Items reads a named formula.
var outputTyped = new HashSet<string>();
bool DeclareOutputTyped(string control)
{
    if (!controlKinds.TryGetValue(control, out var kind) || !modern.Controls.TryGetValue(kind, out var def)) return false;
    if (ItemsRow(control) is not RecordType row) return false;

    var record = RecordType.Empty();
    foreach (var property in def.Properties)
    {
        if (property.Value.Type == "Behaviour") continue;
        var type = property.Key switch
        {
            "Selected" or "Default" => row,
            "SelectedItems" or "DefaultSelectedItems" => row.ToTable(),
            _ => GenericModernType(property.Value.Type),
        };

        // A property this cannot type (Table, Record, Enum, Image, ...) is left off the record
        // rather than added as Deferred, which RecordType does not carry as a field type.
        if (type is DeferredType) continue;
        record = record.Add(property.Key, type);
    }

    Declare(symbols, control, record);
    return true;
}

foreach (var component in job.Components)
{
    if (!componentTypes.ContainsKey(component.Key)) continue;
    var record = RecordType.Empty();
    foreach (var property in component.Value)
    {
        var type = FormulaType.Deferred;
        if (property.Value.Default is not null)
        {
            var check = engine.Check(Rewriter.Rewrite(property.Value.Default).Text, parser);
            if (!Problems(check).Any()) type = Usable(check.ReturnType);
        }

        record = record.Add(property.Key, type is DeferredType ? Declared(property.Value.DataType) : type);
    }

    symbols.AddVariable(component.Key, record, mutable: true);
}

var findings = new List<Finding>();
var skipped = new List<string>();

// ---------------------------------------------------------------------------
// The named formulas, as `Name = expression;` definitions, and the collections and variables the
// behaviour formulas create, typed from whatever they are given.
// ---------------------------------------------------------------------------
var definitions = new List<Definition>();
foreach (var unit in job.Units.Where(u => u.Kind == "formulas")) definitions.AddRange(Definitions.Split(unit));

var assignments = new List<Assignment>();
foreach (var unit in job.Units) assignments.AddRange(Definitions.Assignments(unit));

var resolved = new HashSet<string>();
var declared = new HashSet<string>();
for (var round = 0; round < 4; round++)
{
    var progress = false;
    foreach (var assignment in assignments)
    {
        if (declared.Contains(assignment.Name) || tableTypes.ContainsKey(assignment.Name)) continue;
        var check = engine.Check(Rewriter.Rewrite(assignment.Source).Text, parser);
        if (Problems(check).Any()) continue;
        var type = Usable(check.ReturnType);
        if (assignment.WantsTable && type is RecordType record) type = record.ToTable();
        Declare(symbols, assignment.Name, type);
        declared.Add(assignment.Name);
        progress = true;
    }

    foreach (var definition in definitions)
    {
        if (resolved.Contains(definition.Name)) continue;
        var check = engine.Check(Rewriter.Rewrite(definition.Text).Text, parser);
        if (Problems(check).Any()) continue;
        Declare(symbols, definition.Name, Usable(check.ReturnType));
        resolved.Add(definition.Name);
        declared.Add(definition.Name);
        progress = true;
    }

    foreach (var control in controlKinds.Keys)
    {
        if (outputTyped.Contains(control) || !IsOutputTyped(control)) continue;
        if (!DeclareOutputTyped(control)) continue;
        outputTyped.Add(control);
        progress = true;
    }

    if (!progress) break;
}

// A Dropdown, Combo box or Tab list whose own Items never resolved falls back to Deferred, the same
// as every other control, rather than going undeclared.
foreach (var control in controlKinds.Keys)
{
    if (!IsOutputTyped(control) || outputTyped.Contains(control)) continue;
    Declare(symbols, control, FormulaType.Deferred);
}

// Whatever is still unresolved is reported once, with every other unresolved name untyped, so that
// one broken formula does not take all of its readers with it.
foreach (var name in definitions.Select(d => d.Name).Concat(assignments.Select(a => a.Name)).Distinct())
{
    if (tableTypes.ContainsKey(name) || !declared.Add(name)) continue;
    Declare(symbols, name, FormulaType.Deferred);
}

foreach (var definition in definitions.Where(d => !resolved.Contains(d.Name)))
{
    var unsupported = Definitions.UnsupportedIn(definition.Text);
    if (unsupported is not null)
    {
        skipped.Add(definition.Unit.File + ":" + definition.Name + ": uses " + unsupported + ", which Power Fx Core does not carry");
        continue;
    }

    var rewritten = Rewriter.Rewrite(definition.Text);
    var check = engine.Check(rewritten.Text, parser);
    var debug = Environment.GetEnvironmentVariable("FXDEBUG");
    if (debug == definition.Name || debug == "*")
    {
        Console.Error.WriteLine("### " + definition.Name);
        if (debug != "*") Console.Error.WriteLine(rewritten.Text);
        foreach (var e in check.Errors) Console.Error.WriteLine("  " + e.Severity + " " + e.Message + " @" + e.Span?.Min);
    }

    foreach (var error in Problems(check))
    {
        var offset = definition.Offset + rewritten.ToSource(error.Span?.Min ?? 0);
        findings.Add(Locate(definition.Unit, offset, definition.Name, error.Message));
    }
}

// ---------------------------------------------------------------------------
// Every screen and component property.
// ---------------------------------------------------------------------------
var properties = 0;
var galleries = 0;
foreach (var unit in job.Units.Where(u => u.Kind == "property"))
{
    var unsupported = Definitions.UnsupportedIn(unit.Text);
    if (unsupported is not null)
    {
        skipped.Add(unit.File + ":" + unit.Path + ": uses " + unsupported + ", which Power Fx Core does not carry");
        continue;
    }

    var dot = unit.Path.LastIndexOf('.');
    var control = dot < 0 ? unit.Path : unit.Path[..dot];
    var property = dot < 0 ? unit.Path : unit.Path[(dot + 1)..];
    var declaredType = unit.Control is not null ? modern.TypeOf(unit.Control, property) : null;

    var extra = new SymbolTable();
    if (declaredType == "ItemsText" && ItemsRow(control) is RecordType itemRow)
    {
        extra.AddVariable("ThisItem", itemRow, mutable: true);
        extra.AddVariable("ThisRecord", itemRow, mutable: true);
    }
    else if (unit.ThisItem is not null)
    {
        var items = engine.Check(Rewriter.Rewrite(unit.ThisItem).Text, parser);
        FormulaType row = !Problems(items).Any() && items.ReturnType is TableType table
            ? table.ToRecord()
            : FormulaType.Deferred;
        if (row is RecordType) galleries++;
        extra.AddVariable("ThisItem", row, mutable: true);
        extra.AddVariable("ThisRecord", row, mutable: true);
    }

    var rewritten = Rewriter.Rewrite(unit.Text);
    var check = engine.Check(rewritten.Text, parser, ReadOnlySymbolTable.Compose(extra, symbols));
    properties++;
    var problems = Problems(check).ToList();
    foreach (var error in problems)
    {
        findings.Add(Locate(unit, rewritten.ToSource(error.Span?.Min ?? 0), unit.Path, error.Message));
    }

    // Default and DefaultSelectedItems are a row, and a table of rows, of the control's own Items.
    // Studio answers a text Default with "Invalid formula. Expected a value compatible with Items".
    if (problems.Count == 0 && declaredType is "ItemsRow" or "ItemsRowTable" && ItemsRow(control) is RecordType wanted)
    {
        var column = wanted.FieldNames.FirstOrDefault() ?? "Value";
        var wantsTable = declaredType == "ItemsRowTable";
        var ok = wantsTable ? check.ReturnType is TableType : check.ReturnType is RecordType;
        if (!ok)
        {
            var form = wantsTable ? $"[{{{column}: ...}}]" : $"{{{column}: ...}}";
            findings.Add(Locate(unit, 0, unit.Path,
                $"{property} on {unit.Control} takes a value compatible with Items: " +
                (wantsTable ? "a table of records from Items" : "a record from Items") +
                $", written {form} or a LookUp into Items, not {Describe(check.ReturnType)}."));
        }
    }
}

// ---------------------------------------------------------------------------
// The syntactic rules, over every unit's raw text rather than through the engine.
// ---------------------------------------------------------------------------
foreach (var unit in job.Units)
{
    findings.AddRange(Rules.ColumnArgumentsNotStringLiterals(unit));
    findings.AddRange(Rules.UnconnectedTables(unit, unconnected));
    var modernFinding = Rules.UnknownModernProperty(unit, modern);
    if (modernFinding is not null) findings.Add(modernFinding);
    var thisItemFinding = Rules.ThisItemOnGalleryLevelProperty(unit, ownItems);
    if (thisItemFinding is not null) findings.Add(thisItemFinding);
}

var report = new Report
{
    Definitions = definitions.Count,
    Properties = properties,
    Galleries = galleries,
    Findings = findings.OrderBy(f => f.File).ThenBy(f => f.Line).ThenBy(f => f.Column).ToList(),
    Skipped = skipped,
};
Console.WriteLine(JsonSerializer.Serialize(report, Json.Options));
return findings.Count > 0 ? 1 : 0;

// Three things canvas allows and Power Fx Core does not: the single-column shorthand
// `table.'Column'`, a language tag in a Text() format string, and the odd construct the rewriting
// above leaves behind. They are not errors in Studio, so they are not errors here, and the umbrella
// "has some invalid arguments" that comes with one goes with it.
static IEnumerable<ExpressionError> Problems(CheckResult result)
{
    var errors = result.Errors.Where(e => e.Severity >= ErrorSeverity.Moderate).ToList();
    var dialect = errors.Where(IsDialect).ToList();
    if (dialect.Count > 0)
    {
        errors = errors.Where(e => !IsDialect(e) && !e.Message.Contains("has some invalid arguments")).ToList();
    }

    // Once something in a formula is an error, everything that reads it is one too. The first
    // report is the one worth having, so the errors that only say "and then this was an Error" go.
    return errors.Count > 1 ? errors.Where(e => !IsCascade(e)).DefaultIfEmpty(errors[0]) : errors;
}

// A type the binder could not work out is deferred rather than wrong, so a formula that reads it is
// still checked for everything else.
static void Declare(SymbolTable symbols, string name, FormulaType type)
{
    try
    {
        symbols.AddVariable(name, type, mutable: true);
    }
    catch (Exception)
    {
        symbols.AddVariable(name, FormulaType.Deferred, mutable: true);
    }
}

// A property with no Default, or one this tool could not bind, falls back to the DataType the
// component declares for it.
static FormulaType Declared(string dataType) => dataType switch
{
    "Text" => FormulaType.String,
    "Number" => FormulaType.Number,
    "Boolean" => FormulaType.Boolean,
    "Color" => FormulaType.Color,
    "Date and time" or "DateAndTime" => FormulaType.DateTime,
    _ => FormulaType.Deferred,
};

// A property on a Dropdown, Combo box or Tab list that is not one of the Items-derived ones, typed
// from modern-controls.json's own Type name. Enum, Table, Record and the rest are Deferred here: the
// property being set is still checked against its declared type in the loop below, this is only what
// a formula reads back off the control elsewhere.
static FormulaType GenericModernType(string type) => type switch
{
    "Text" or "ItemsText" => FormulaType.String,
    "Number" => FormulaType.Number,
    "Boolean" => FormulaType.Boolean,
    "Color" => FormulaType.Color,
    "DateTime" => FormulaType.DateTime,
    _ => FormulaType.Deferred,
};

// A type named the way a formula author would name it, for a finding's message.
static string Describe(FormulaType type) => type switch
{
    StringType => "text",
    NumberType or DecimalType => "a number",
    BooleanType => "a boolean",
    TableType => "a table",
    RecordType => "a record",
    _ => "that type",
};

static FormulaType Usable(FormulaType? type) =>
    type is null or BlankType or UnknownType or DeferredType || type == FormulaType.BindingError
        ? FormulaType.Deferred
        : type;

static bool IsCascade(ExpressionError error) =>
    error.Message.Contains("on Error values") || error.Message.Contains(": Error,") || error.Message.Contains(", Error");

static bool IsDialect(ExpressionError error) =>
    error.Message.StartsWith("Deprecated use of", StringComparison.Ordinal)
    || error.Message.Contains("format specifier")
    || error.Message.Contains("Use the And operator")
    // A component's own custom properties are not in the catalogue, so a call to one of them is
    // read as a call into a namespace this tool never built.
    || error.Message.Contains("unsupported function in namespace");

static Finding Locate(Unit unit, int offset, string formula, string message)
{
    var line = 0;
    var column = 0;
    for (var i = 0; i < Math.Min(offset, unit.Text.Length); i++)
    {
        if (unit.Text[i] == '\n')
        {
            line++;
            column = 0;
        }
        else
        {
            column++;
        }
    }

    return new Finding
    {
        File = unit.File,
        Formula = formula,
        Line = unit.Line + line,
        Column = column + 1,
        Message = message,
    };
}

static string? ArgOf(string name)
{
    var args = Environment.GetCommandLineArgs();
    for (var i = 0; i < args.Length - 1; i++)
    {
        if (args[i] == name) return args[i + 1];
    }

    return null;
}
