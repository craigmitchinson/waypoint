# microsoft/PowerApps-Tooling — Control Identifier Enum & Current-Format Fixtures

Follow-up to pat-repo-01, after the repo was cloned locally rather than reached through search-engine indexing alone. Cloning it and walking the full tree (683 files) surfaced a directory search could not: `src/schemas/pa-yaml/v3.0/ControlLibraryVDev/`, which sits outside the published `schemas/` folder and isn't linked from the README or any docs page. This is the correction to pat-repo-01's headline conclusion — that repository genuinely had nothing further to give on a shallow search, but a full clone turned up real, current, three-days-old material that a directory listing (which this sandbox cannot perform against github.com or api.github.com) would have found immediately. Worth remembering for next time: search-engine indexing of a GitHub repo is not the same as having the repo, and the difference showed up here.

Snapshot dated 20 September 2026, taken from a local clone of `master` (branch tip at commit dated 17 September 2026).

Files in this snapshot: 4

## Contents

1. [ControlTypeId-1P-controls-enum.schema.yaml — the real control-identifier enum, deliberately stripped from the published schema](#controltypeid-1p-controls-enumschemayaml-—-the-real-control-identifier-enum-deliberately-stripped-from-the-published-schema)
2. [publish.ps1 (excerpt) — proof the enum is deliberately stripped before publishing, not merely omitted](#publishps1-excerpt-—-proof-the-enum-is-deliberately-stripped-before-publishing-not-merely-omitted)
3. [BuiltInControl/*.pa.yaml — current (not legacy) parser test fixtures for Variant, Layout, StyleName and template forms](#builtincontrol*payaml-—-current-not-legacy-parser-test-fixtures-for-variant-layout-stylename-and-template-forms)
4. [Screens-general-controls.pa.yaml — full-schema exercise fixture (synthetic control names, syntax only)](#screens-general-controlspayaml-—-full-schema-exercise-fixture-synthetic-control-names-syntax-only)

---

## ControlTypeId-1P-controls-enum.schema.yaml — the real control-identifier enum, deliberately stripped from the published schema

Source: [src/schemas/pa-yaml/v3.0/ControlLibraryVDev/ControlTypeId-1P-controls-enum.schema.yaml](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/schemas/pa-yaml/v3.0/ControlLibraryVDev/ControlTypeId-1P-controls-enum.schema.yaml)

*Found only by cloning the repo and browsing its full tree — invisible to search engines and not reachable from the published `schemas/` folder. Committed 17 September 2026, three days before this snapshot: current. This is the enum of every first-party ControlTypeId, split by generation: bare names (Button, CheckBox, ComboBox, DropDown, GroupContainer, Gallery, etc. — classic controls), `FluentV8/*` (the first modern-control generation), and `FluentV9/*` (the current modern-control generation: Badge, Button, CheckBox, ComboBox, DatePicker, DropDown, Header, InfoButton, Link, NumberInput, Progress, Radio, Slider, Spinner, StreamVideo, TabList, Text, TextInput, Toggle, Grid). Two things this settles or reframes, both still subject to a Studio round-trip per the standing rule: (1) modern control identifiers are namespaced with a `FluentV9/` prefix in the enum, not bare — the catalogue's `Badge@0.0.24` may need to become `FluentV9/Badge@0.0.24` (the schema's `ControlTypeId-pattern` regex — `^([A-Z][a-zA-Z0-9]*/)?[A-Z][a-zA-Z0-9]*(@\d+\.\d+\.\d+)?$` — allows exactly this: an optional `Namespace/` prefix plus an optional `@version` suffix, so both pieces combine); (2) there is no `Card` in this enum at all — under any namespace. Either ModernCard is newer than this list, is exposed under a different identifier, or is compose-only (a component built from other controls, not its own ControlTypeId) — worth a Studio check specifically. `ModernCheckbox` corresponds to `FluentV9/CheckBox` (capital B, not `Checkbox`), `ModernCombobox` to `FluentV9/ComboBox`, `ModernDropdown` to `FluentV9/DropDown`, `ModernDataGrid`/`Table` most likely to `FluentV9/Grid`, `ModernTabList` to `FluentV9/TabList`, `ModernTextInput` to `FluentV9/TextInput`. This is exhaustive within the repo — grepping the whole tree for `FluentV9` and `FluentV8` turns up this one file and nowhere else, so no per-control property or enum detail exists alongside it, only the identifier list itself.*

```yaml
# Unfortunately, it also seems to make it so that schema cache doesn't get updated if the schema file updates.
# WORKAROUND: Close the VSCode window and reopen.
#
# How to add snippets for use in VS Code: https://code.visualstudio.com/docs/languages/json#_define-snippets-in-json-schemas

$schema: http://json-schema.org/draft-07/schema#
$id: http://powerapps.com/schemas/pa-yaml/v3.0/ControlTypeId-1P-controls-enum.schema
description: >-
  The schema object representing the enum of ControlTypeIds for the current version of the controls library.

enum:
  - DataField
  - AddMedia
  - Attachments
  - Audio
  - Button
  - Camera
  - CheckBox
  - Circle
  - ComboBox
  - DatePicker
  - DropDown
  - Form
  - TypedDataCard
  - DataCard
  - Gallery
  - GroupContainer
  - Classic/Icon
  - Image
  - Label
  - ListBox
  - Microphone
  - PDFViewer
  - PowerBI
  - Radio
  - Rating
  - Rectangle
  - Slider
  - StreamVideo
  - TextInput
  - Timer
  - Toggle
  - Video
  - FluentV8/Button
  - FluentV8/CheckBox
  - FluentV8/ComboBox
  - FluentV8/DatePicker
  - FluentV8/Label
  - FluentV8/Radio
  - FluentV8/Rating
  - FluentV8/Slider
  - FluentV8/TextBox
  - FluentV8/Toggle
  - FluentV9/Badge
  - FluentV9/Button
  - FluentV9/CheckBox
  - FluentV9/ComboBox
  - FluentV9/DatePicker
  - FluentV9/DropDown
  - FluentV9/Header
  - FluentV9/InfoButton
  - FluentV9/Link
  - FluentV9/NumberInput
  - FluentV9/Progress
  - FluentV9/Radio
  - FluentV9/Slider
  - FluentV9/Spinner
  - FluentV9/StreamVideo
  - FluentV9/TabList
  - FluentV9/Text
  - FluentV9/TextInput
  - FluentV9/Toggle
  - FluentV9/Grid
```

---

## publish.ps1 (excerpt) — proof the enum is deliberately stripped before publishing, not merely omitted

Source: [src/schemas/publish.ps1](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/schemas/publish.ps1)

*The dev-source schema at `src/schemas/pa-yaml/v3.0/pa.schema.yaml` (note: `src/schemas/`, distinct from the published `schemas/` at the repo root) contains `$ref: "ControlLibraryVDev/ControlTypeId-1P-controls-enum.schema.yaml"` for the `ControlTypeId-1P-controls-enum` definition. The build markers `[schema-build-remove-next-line]` / `[schema-build-uncomment-next-line]` around it are exactly what this script's uncomment/remove logic acts on, swapping that `$ref` out for the literal `true` seen in the published schema. In other words: pcf-02's earlier finding that the published schema leaves the control enum unconstrained was correct, but the reason is now sourced precisely — it's a deliberate publish-time redaction of real, current, checked-in data, not an oversight or a sign the data doesn't exist. That distinction matters for how much to trust the VDev enum file above: it's genuine Microsoft source, three days old, just not the part of the repo Microsoft has chosen to present as the stable public contract.*

```text
$ErrorActionPreference = "Stop"
Set-StrictMode -Version 3.0

function BuildSchemaForPublish([string]$srcSchemaFilePath, [string]$outputFilePath) {
    #Copy-Item -Path $srcSchemaFilePath -Destination $outputFilePath
    $contentLines = Get-Content $srcSchemaFilePath;

    # Remove whitespace at beginning of lines
    # This makes the check for blank lines easier by allowing a simple IndexOf('')
    $contentLines = $contentLines | foreach {
        if ($_ -match '^\s+# \[schema-build-[a-z-]+\]\s*$') {
            $_ -replace '^\s+', ''
        } else {
            $_
        }
    };

    # Uncomment lines requested.
    for ($lineIdx = $contentLines.IndexOf('# [schema-build-uncomment-next-line]'); $lineIdx -ge 0; $lineIdx = $contentLines.IndexOf('# [schema-build-uncomment-next-line]')) {
        $contentLines[$lineIdx] = '# ';
        $contentLines[$lineIdx+1] = $contentLines[$lineIdx+1] -replace '#', '';
    }

    # Remove lines requested
    for ($lineIdx = $contentLines.IndexOf('# [schema-build-remove-next-line]'); $lineIdx -ge 0; $lineIdx = $contentLines.IndexOf('# [schema-build-remove-next-line]')) {
    ...
    # Uncomment lines marked [schema-build-uncomment-next-line]
    for ($lineIdx = $contentLines.IndexOf('# [schema-build-uncomment-next-line]'); $lineIdx -ge 0; $lineIdx = $contentLines.IndexOf('# [schema-build-uncomment-next-line]')) {
        $contentLines[$lineIdx] = '# ';
        $contentLines[$lineIdx+1] = $contentLines[$lineIdx+1] -replace '#', '';
    }

    # Remove lines marked [schema-build-remove-next-line]
    for ($lineIdx = $contentLines.IndexOf('# [schema-build-remove-next-line]'); $lineIdx -ge 0; $lineIdx = $contentLines.IndexOf('# [schema-build-remove-next-line]')) {
        $contentLines[$lineIdx] = '# ';
        $contentLines[$lineIdx+1] = '# ';
    }
    ...

# In src/schemas/pa-yaml/v3.0/pa.schema.yaml, the ControlTypeId-1P-controls-enum definition reads:
#
#   ControlTypeId-1P-controls-enum:
#     # [schema-build-remove-next-line]
#     $ref: "ControlLibraryVDev/ControlTypeId-1P-controls-enum.schema.yaml"
#     # [schema-build-uncomment-next-line]
#     #true
#
# The publish step removes the $ref line and uncomments the "true" line, so the PUBLISHED
# schemas/pa-yaml/v3.0/pa.schema.yaml ends up with:
#
#   ControlTypeId-1P-controls-enum:
#     true
```

---

## BuiltInControl/*.pa.yaml — current (not legacy) parser test fixtures for Variant, Layout, StyleName and template forms

Source: [src/Persistence.Tests/_TestData/ValidYaml-CI/BuiltInControl/](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/Persistence.Tests/_TestData/ValidYaml-CI/BuiltInControl/)

*Six small fixture files the current Persistence library's own CI suite parses and round-trips. Read plainly as syntax evidence, not real property values — the names used (`SuperButton`, `variant2`, `layoutC0`) are placeholder test data, not real Microsoft control variants, so do not treat `Variant: SuperButton` as meaning a real variant called SuperButton exists. What they do confirm as genuine current syntax: `Variant`, `Layout`, `MetadataKey`, `Group` sit as flat sibling keys next to `Control` and `Properties` (matching ControlInstance.cs exactly); a `Control:` value can be a bare name (`Button`), a versioned name (`Label@1.2.3`, seen in the FullSchemaUses example below), or a legacy URI-form template id (`http://microsoft.com/appmagic/button`) still accepted for back-compat. One genuine surprise: `with-style.pa.yaml` uses a `StyleName` key, which does not appear in `ControlInstance.cs` or the current published schema's `Control-instance` property list at all — either a leftover fixture for a removed/renamed feature, or a gap in the current schema's `additionalProperties: false` enforcement. Flagging rather than resolving it; not confident enough either way to fold into the catalogue.*

```yaml
# ---- with-variant.pa.yaml ----
built in:
  Control: Button
  Variant: SuperButton
  Properties:
    Text: ="button text"

# ---- with-template.pa.yaml ----
button with template:
  Control: Button
  Properties:
    Text: ="button text"

# ---- with-template-id.pa.yaml ----
button with template id:
  Control: http://microsoft.com/appmagic/button 
  Properties:
    Text: ="button text"

# ---- with-template-name.pa.yaml ----
button with template name:
  Control: Button 
  Properties:
    Text: ="button text"

# ---- with-layout.pa.yaml ----
built in:
  Control: Button
  Variant: SuperButton
  Layout: vertical
  Properties:
    Text: ="button text"

# ---- with-style.pa.yaml ----
myControl1:
  Control: Button
  StyleName: this is my style
```

---

## Screens-general-controls.pa.yaml — full-schema exercise fixture (synthetic control names, syntax only)

Source: [src/schemas-tests/pa-yaml/v3.0/FullSchemaUses/Screens-general-controls.pa.yaml](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/schemas-tests/pa-yaml/v3.0/FullSchemaUses/Screens-general-controls.pa.yaml)

*Another current-format fixture, this one deliberately using synthetic control names (`FooWithChildren`, `Bar`, `Car`, `Dog`) to test the schema and parser generically rather than any real control. Included only to show the nesting/ordering syntax (children, groups, out-of-order names to test that source order is preserved) — no real property or enum content here either.*

```yaml
Screens:
  screenName2:
    Properties:
      Prop2: =screen1Prop2
      Prop1: =screen1Prop1

    Children:
      - ctrlB:
          Control: Label
          Variant: variantB
          Layout: layoutB
          Group: Group1
          Properties:
            Prop2: =ctrlBProp2
            Prop1: =ctrlBProp1

      # Purposely set out of name sorting order to ensure ordering is maintained
      - ctrlA:
          Control: Label@1.2.3
          Variant: variantA
          Layout: layoutA
          Group: Group1
          Properties:
            Prop2: =ctrlAProp2
            Prop1: =ctrlAProp1

  screenName1:
    Children:
      - ctrlC:
          Control: FooWithChildren
          Variant: variant2
          Layout: layout2
          Properties:
            Prop2: =ctrlAProp2
            Prop1: =ctrlAProp1
          Children:
            - ctrlC0:
                Control: Bar
                Variant: variantC0
                MetadataKey: metadataKeyC0
                Layout: layoutC0
                Group: Group1
                Properties:
                  Prop2: =ctrlC0Prop2
                  Prop1: =ctrlC0Prop1
                Children:
                  - ctrlC00:
                      Control: Car
                      Variant: variantC00
                      Layout: layoutC00
            - ctrlC1:
                Control: Bar
                Variant: variantC1
                Layout: layoutC1
                Group: Group1
                Properties:
                  Prop2: =ctrlC1Prop2
                  Prop1: =ctrlC1Prop1
                Children:
                  - ctrlC10:
                      Control: Dog
                      Variant: variantC10
                      MetadataKey: metadataKeyC0
                      Layout: layoutC10
```

