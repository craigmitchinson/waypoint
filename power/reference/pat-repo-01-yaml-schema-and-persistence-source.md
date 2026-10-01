# microsoft/PowerApps-Tooling — YAML Schema & Persistence Source (Verbatim Source Code)

This file is different in kind from the rest of this corpus: it holds verbatim **source code**, not Microsoft Learn documentation prose, pulled directly from the `microsoft/PowerApps-Tooling` GitHub repository (the current name — it was renamed from `PowerApps-Language-Tooling`; the old name now redirects). Each file below is reproduced exactly as committed, in a fenced code block, with no summarisation. Snapshot dated 20 September 2026, `master` branch.

This repository was chased down as the top-priority lead for closing the one gap CORPUS.md section 3 describes: Learn documents controls by Studio property-pane labels in prose, while the *.pa.yaml format Studio writes uses different tokens (versioned control identifiers, LayoutMinWidth-style property names, quoted enum references, Variant tokens). The honest headline result: **this repository does not contain a per-control property or enum table for modern (Fluent) controls, and structurally cannot** — its current, actively-maintained YAML persistence code (`src/Persistence/`) is deliberately control-agnostic, and its own schema and test fixtures confirm this rather than merely omitting the data. That is itself the most useful thing this repo settles: it rules out "nobody's published this schema yet, keep looking here" as an explanation, and confirms CORPUS.md's own conclusion that a Studio round-trip is the only complete source for these tokens. What the repo *does* provide is below, split into current-format material and legacy/deprecated material — do not treat the legacy sections as evidence for the current v3.0 format's actual tokens, per the standing rule that a Studio-written sample outranks any document, and doubly so here since the legacy sections are Microsoft's own deprecated code, not even current documentation.

Files in this snapshot: 8

## Contents

1. [pa.schema.yaml — Power Apps source YAML schema (v3.0)](#paschemayaml-—-power-apps-source-yaml-schema-v30)
2. [ControlInstance.cs — the C# record backing *.pa.yaml control deserialization](#controlinstancecs-—-the-c#-record-backing-*payaml-control-deserialization)
3. [PaYamlSerializerTests.cs — the persistence library's own YAML round-trip test fixtures](#payamlserializertestscs-—-the-persistence-library's-own-yaml-round-trip-test-fixtures)
4. [PaYamlSerializer.cs — the top-level serializer/deserializer entry point](#payamlserializercs-—-the-top-level-serializerdeserializer-entry-point)
5. [YAMLFileFormat.md — the 'Experimental' PASopa-era YAML format](#yamlfileformatmd-—-the-'experimental'-pasopa-era-yaml-format)
6. [GlobalTemplates.cs — legacy PASopa control template defaults, including GroupContainer's three layout variants](#globaltemplatescs-—-legacy-pasopa-control-template-defaults-including-groupcontainer's-three-layout-variants)
7. [ControlProperty.cs — legacy per-property default-value record](#controlpropertycs-—-legacy-per-property-default-value-record)
8. [commonStyleProperties.xml — legacy classic-control common property datatypes](#commonstylepropertiesxml-—-legacy-classic-control-common-property-datatypes)

---

## pa.schema.yaml — Power Apps source YAML schema (v3.0)

Status: **CURRENT — actively referenced by the repo's own README**

Source: [schemas/pa-yaml/v3.0/pa.schema.yaml](https://github.com/microsoft/PowerApps-Tooling/blob/master/schemas/pa-yaml/v3.0/pa.schema.yaml) — raw: [pa.schema.yaml](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/schemas/pa-yaml/v3.0/pa.schema.yaml)

*This is the authoritative, currently-maintained JSON Schema (draft-07) for *.pa.yaml files, referenced by the README's VS Code YAML-extension setup instructions. It is structurally identical in scope to the pa.schema.yaml already held in this project's own repo root: control-agnostic. Two details worth recording explicitly because they are the schema's own evidence, not silence: (1) `ControlTypeId-1P-controls-enum` is defined as the literal JSON Schema value `true` ("no constraint") rather than an `enum` list of control identifiers — Microsoft's own schema authors chose not to enumerate first-party control type IDs here. (2) `Variant` is typed only as `{type: string, minLength: 1}` — no enum of allowed variant values. Both are deliberate omissions in the schema itself, confirming that control identifiers, versions, property names and Variant values are validated dynamically by the Power Apps service/Studio at pack/unpack time, not by this open-source schema. This is sourced confirmation that the gap is architectural, not a documentation gap.*

```yaml
$schema: http://json-schema.org/draft-07/schema#
$id: http://powerapps.com/schemas/pa-yaml/v3.0/pa.schema
title: Microsoft Power Apps schema for app source yaml files (v3.0).
description: >-
  The schema for all *.pa.yaml files which are used to describe a Power Apps canvas app.
  All *.pa.yaml files in an *.msapp are logically combined into a single *.pa.yaml file.

type: object
additionalProperties: false
properties:
  App:
    $ref: "#/definitions/App-instance"
  Screens:
    $ref: "#/definitions/Screens-name-instance-map"
  ComponentDefinitions:
    $ref: "#/definitions/ComponentDefinitions-name-instance-map"
  DataSources:
    $ref: "#/definitions/DataSources-name-instance-map"
  EditorState:
    $ref: "#/definitions/EditorState"

defaultSnippets:
  - label: App
    body:
      App:
        Properties:
          StartScreen: =${1:Screen1}
  - label: Screens
    body:
      Screens:
        ${1:Screen1}:
          Children:
            - $0

definitions:
  App-instance:
    description: Represents the top-level App entity.
    type: object
    additionalProperties: false
    properties:
      Properties: { $ref: "#/definitions/Properties-formula-map" }

  Screens-name-instance-map:
    description: |-
      Unordered map where keys are the names of each screen.
    type: object
    propertyNames: { $ref: "#/definitions/Screen-name" }
    additionalProperties:
      $ref: "#/definitions/Screen-instance"
    defaultSnippets:
      - label: Add a Screen
        body:
          ${1:Screen1}:
            Children:
              - $0

  Screen-name:
    $ref: "#/definitions/entity-name"

  Screen-instance:
    type: object
    additionalProperties: false
    properties:
      Properties: { $ref: "#/definitions/Properties-formula-map" }
      Children: { $ref: "#/definitions/Children-Control-instance-sequence" }

  Children-Control-instance-sequence:
    description: >-
      A sequence of control instances, where each item is a control's name with a control instance.
      The order of the control instances in the sequence indicates the effective z-index of the control in the app.
    type: array
    items:
      type: object
      minProperties: 1
      maxProperties: 1
      propertyNames: { $ref: "#/definitions/Control-instance-name" }
      additionalProperties:
        $ref: "#/definitions/Control-instance"
      defaultSnippets:
        - label: Add Control
          body:
            '${2:Control1}':
              Control: ${1:Label}
              Properties:
                X: =10
                Y: =10$0
        - label: Add custom `Component` instance
          body:
            '${2:${1}1}':
              Control: Component
              ComponentName: ${1:MyComponent}
              Properties:
                X: =10
                Y: =10$0
        - label: Add `CodeComponent` instance (aka PCF control)
          body:
            '${2:${1}1}':
              Control: CodeComponent
              ComponentName: ${1:MyComponent}
              Properties:
                X: =10
                Y: =10$0

  Control-instance-name:
    $ref: "#/definitions/entity-name"

  ControlTypeId:
    description: The invariant identifier for the type of control being instantiated.
    allOf:
      - $ref: "#/definitions/ControlTypeId-pattern"
    not:
      anyOf:
        - $ref: "#/definitions/ControlTypeId-disallowed-types"
        - $ref: "#/definitions/ControlTypeId-not-yet-supported"
    oneOf:
      - $ref: "#/definitions/ControlTypeId-oneOf-3P-types"
      - $ref: "#/definitions/ControlTypeId-1P-controls"

  ControlTypeId-pattern:
    $comment: Defines reusable schema for validating the pattern allowed for control type identifiers.
    type: string
    pattern: |-
      ^([A-Z][a-zA-Z0-9]*/)?[A-Z][a-zA-Z0-9]*(@\d+\.\d+\.\d+)?$

  ControlTypeId-disallowed-types:
    enum:
      - AppInfo
      - HostControl
      - Screen
      - AppTest
      - TestCase
      - TestSuite

  ControlTypeId-not-yet-supported:
    enum:
      - CommandComponent
      - DataComponent
      - FunctionComponent

  ControlTypeId-oneOf-3P-types:
    $comment: The set of ControlTypeIds that represent third-party controls.
    oneOf:
      - $ref: "#/definitions/ControlTypeId-CanvasComponent"
      - $ref: "#/definitions/ControlTypeId-CodeComponent"


  ControlTypeId-CanvasComponent:
    description: |-
      Identifies a canvas component instance. This control type requires additional properties to be specified.
    type: string
    const: CanvasComponent

  ControlTypeId-CodeComponent:
    description: |-
      Identifies a custom code component (aka PCF control) instance. This control type requires additional properties to be specified.
    type: string
    const: CodeComponent

  ControlTypeId-1P-controls:
    description: The invariant identifier of a first-party control published by Power Apps (aka the 'Control Library').
    allOf:
      - $ref: "#/definitions/ControlTypeId-pattern"
      - $ref: "#/definitions/ControlTypeId-1P-controls-enum"
    not:
      $comment: Exclude built-in control identifiers as these are not defined in the 'Control Library'.
      $ref: "#/definitions/ControlTypeId-oneOf-3P-types"

  ControlTypeId-1P-controls-enum:
    true

  Control-instance:
    type: object
    required: [Control]
    properties:
      Control: { $ref: "#/definitions/ControlTypeId" }
      Group: { $ref: "#/definitions/Control-Group-name" }
      Properties: { $ref: "#/definitions/Properties-formula-map" }
    if:
      required: [Control]
      properties:
        Control: { $ref: "#/definitions/ControlTypeId-oneOf-3P-types" }
    then:
      allOf:
        - if:
            properties:
              Control: { $ref: "#/definitions/ControlTypeId-CanvasComponent" }
          then:
            required: [ComponentName]
            additionalProperties: false
            properties:
              Control: true
              ComponentLibraryUniqueName: { $ref: "#/definitions/ComponentLibrary-unique-name" }
              ComponentName: { $ref: "#/definitions/ComponentDefinition-name" }
              Group: true
              Properties: true
        - if:
            properties:
              Control: { $ref: "#/definitions/ControlTypeId-CodeComponent" }
          then:
            required: [ComponentName]
            additionalProperties: false
            properties:
              Control: true
              ComponentName: { $ref: "#/definitions/CodeComponent-ComponentName" }
              Group: true
              Properties: true
              Children: { $ref: "#/definitions/Children-Control-instance-sequence" }
    else:
      additionalProperties: false
      properties:
        Control: true
        Variant:
          type: string
          minLength: 1
        MetadataKey:
          type: string
          minLength: 1
        Layout:
          type: string
          minLength: 1
        IsLocked:
          type: boolean
        Group: true
        Properties: true
        Children: { $ref: "#/definitions/Children-Control-instance-sequence" }

  Control-Group-name:
    description: |-
      The name of the group of controls to associate this control with.

      Groups do not impact the behavior of an app, but are used in the Studio to organize controls when editing.
    allOf:
      - { $ref: "#/definitions/Control-instance-name" }

  CodeComponent-ComponentName:
    description: |-
      The unique name of the Code Component (aka PCF control) as it occurs in Dataverse.
      The format is: ( <publisher-prefix> '_' )? ( <JS-Namespace> '.' )+ <JS-ClassName> ( '(' <GUID> ')' )?
    type: string
    pattern: |-
      ^([a-zA-Z][a-zA-Z0-9]{1,7})_)?(\w+\.)+(\w+)(\([0-9a-f-]{36}\))?$

  ComponentDefinitions-name-instance-map:
    type: object
    propertyNames: { $ref: "#/definitions/ComponentDefinition-name" }
    additionalProperties:
      $ref: "#/definitions/ComponentDefinition-instance"

  ComponentDefinition-name:
    $ref: "#/definitions/entity-name"

  ComponentDefinition-instance:
    type: object
    required: [DefinitionType]
    properties:
      DefinitionType:
        enum:
          - CanvasComponent
          - CommandComponent
      Description:
        description: The description for this component definition.
        type: string
      AllowCustomization:
        description: >
          Only applicable for components defined in a component library.
          This keyword should always be specified for component definitions in a component library.
        type: boolean
    allOf:
      - if:
          properties:
            DefinitionType: { const: "CanvasComponent" }
        then:
          additionalProperties: false
          properties:
            DefinitionType: true
            Description: true
            AllowCustomization: true
            AccessAppScope:
              description: >
                Indicates whether this component can access app level information.
                Only applicable for canvas components that are NOT defined in a component library.
              type: boolean
            CustomProperties:
              type: object
              propertyNames:
                $ref: "#/definitions/ComponentDefinition-CustomProperty-name"
              additionalProperties:
                $ref: "#/definitions/ComponentDefinition-CustomProperty"
            Properties:
              type: object
              propertyNames:
                allOf:
                  - $ref: "#/definitions/ComponentDefinition-CustomProperty-name"
                  - not:
                      enum:
                        - X
                        - Y
                        - Visible
              additionalProperties: { $ref: "#/definitions/pfx-formula" }
              properties:
                ContentLanguage: { $ref: "#/definitions/pfx-formula" }
                ChildTabPriority: { $ref: "#/definitions/pfx-formula" }
                EnableChildFocus: { $ref: "#/definitions/pfx-formula" }
                Fill: { $ref: "#/definitions/pfx-formula" }
                Height: { $ref: "#/definitions/pfx-formula" }
                OnReset: { $ref: "#/definitions/pfx-formula" }
                Width: { $ref: "#/definitions/pfx-formula" }
            Children: { $ref: "#/definitions/Children-Control-instance-sequence" }
      - if:
          properties:
            DefinitionType: { const: "CommandComponent" }
        then:
          additionalProperties: false
          properties:
            DefinitionType: true
            Description: true
            AllowCustomization: true
            Properties:
              type: object
              additionalProperties: false
              properties:
                AutoSave: { $ref: "#/definitions/pfx-formula" }
                DataSource: { $ref: "#/definitions/pfx-formula" }
                Icon: { $ref: "#/definitions/pfx-formula" }
                OnSelect: { $ref: "#/definitions/pfx-formula" }
                Title: { $ref: "#/definitions/pfx-formula" }
                Tooltip: { $ref: "#/definitions/pfx-formula" }
                Visible: { $ref: "#/definitions/pfx-formula" }

  ComponentDefinition-CustomProperty-name:
    $ref: "#/definitions/entity-property-name"

  ComponentDefinition-CustomProperty:
    type: object
    required: [PropertyKind]
    properties:
      PropertyKind:
        description: The kind of property that is added to the custom component.
        type: string
        oneOf:
          - const: Input
            description: This kind of property can send or receive values between the app and the component. The formula for this property is defined in the app where the component is used.
          - const: Output
            description: This kind of property can send or receive values between the app and the component. The formula for this property is defined once in the component.
          - const: InputFunction
            description: This kind of property can be called as a function with parameters. The formula for this property is defined in the app where the component is used.
          - const: OutputFunction
            description: This kind of property can be called as a function with parameters. The formula for this property is defined once in the component.
          - const: Event
            description: This kind of property allows you to create an event that the component can trigger, and then be handled by the app.
          - const: Action
            description: This kind of property can be called as a function with parameters, and can contain logic that changes state (side effects).
      DisplayName:
        description: DEPRECATED. This is not used anywhere and will be removed.
        type: string
      Description:
        type: string
      Default:
        description: The default formula to use for this property when an instance does not explicitly set it.
        allOf:
          - $ref: "#/definitions/pfx-formula"
    allOf:
      - if:
          properties:
            PropertyKind: { const: "Input" }
        then:
          required: [DataType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            DataType: { $ref: "#/definitions/pfx-data-type" }
            RaiseOnReset:
              description: If turned on, the component's OnReset behavior will run when the input property's value changes.
              type: boolean
            Default: true
      - if:
          properties:
            PropertyKind: { const: "Output" }
        then:
          required: [DataType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            DataType: { $ref: "#/definitions/pfx-data-type" }
      - if:
          properties:
            PropertyKind: { const: "InputFunction" }
        then:
          required: [ReturnType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            ReturnType: { $ref: "#/definitions/pfx-function-return-type" }
            Default: true
            Parameters: { $ref: "#/definitions/pfx-function-parameters" }
      - if:
          properties:
            PropertyKind: { const: "OutputFunction" }
        then:
          required: [ReturnType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            ReturnType: { $ref: "#/definitions/pfx-function-return-type" }
            Parameters: { $ref: "#/definitions/pfx-function-parameters" }
      - if:
          properties:
            PropertyKind: { const: "Event" }
        then:
          required: [ReturnType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            ReturnType: { $ref: "#/definitions/pfx-function-return-type" }
            Default: true
            Parameters: { $ref: "#/definitions/pfx-function-parameters" }
      - if:
          properties:
            PropertyKind: { const: "Action" }
        then:
          required: [ReturnType]
          additionalProperties: false
          properties:
            PropertyKind: true
            DisplayName: true
            Description: true
            ReturnType: { $ref: "#/definitions/pfx-function-return-type" }
            Parameters: { $ref: "#/definitions/pfx-function-parameters" }

  ComponentLibrary-unique-name:
    description: |-
      The unique name of the component library within Dataverse.
      It has the form "{PublisherPrefix}_{ComponentLibraryName}".
    type: string
    pattern: |-
      ^([a-z][a-z0-9]{1,7})_(\S.{0,63})$
    not:
      description: |-
        Cannot contain any of the following invalid chars `.\/:*?"<>|`.
      pattern: |-
        [.\\/:*?"<>|]

  DataSources-name-instance-map:
    type: object
    propertyNames: { $ref: "#/definitions/DataSource-name" }
    additionalProperties:
      $ref: "#/definitions/DataSource-instance"

  DataSource-name:
    $ref: "#/definitions/entity-name"

  DataSource-instance:
    type: object
    required:
      - Type
    additionalProperties: false
    properties:
      Type:
        type: string
        enum:
          - Table
          - Actions
      ConnectorId:
        type: string
      Parameters:
        type: object
        additionalProperties:
          type: string
    oneOf:
      - required: [Type]
        additionalProperties: false
        properties:
          Type:
            const: Table
          Parameters:
            type: object
            required: [TableLogicalName]
            additionalProperties: false
            properties:
              TableLogicalName:
                type: string
      - required: [Type]
        additionalProperties: false
        properties:
          Type:
            const: Actions

  Properties-formula-map:
    description: >-
      A map of property names to formulas.
      The allowed property names are dependant on the entity instance type.
      The values are Power Fx formula expressions.
    type: object
    propertyNames:
      $ref: "#/definitions/entity-property-name"
    additionalProperties:
      $ref: "#/definitions/pfx-formula"

  EditorState:
    description: Represents metadata related to the editor state of the application that enhances the editing experience.
    type: object
    additionalProperties: false
    properties:
      ScreensOrder:
        description: Ordered list of screen names representing the order in the editor.
        type: array
        items:
          $ref: "#/definitions/Screen-name"
      ComponentDefinitionsOrder:
        description: Ordered list of component definition names representing the order in the editor.
        type: array
        items:
          $ref: "#/definitions/ComponentDefinition-name"

  entity-name:
    description: The base requirements for a named entity in an app.
    type: string
    minLength: 1

  entity-property-name:
    description: The base requirements for a property of an entity in an app.
    type: string
    minLength: 1

  pfx-function-parameters:
    type: array
    items:
      type: object
      minProperties: 1
      maxProperties: 1
      propertyNames: { $ref: "#/definitions/pfx-function-parameter-name" }
      additionalProperties:
        type: object
        required: [DataType]
        additionalProperties: false
        properties:
          Description: { type: string }
          IsOptional: { type: boolean }
          DataType: { $ref: "#/definitions/pfx-data-type" }
          Default:
            description: The default formula to use for this parameter when not explicitly specified.
            allOf:
              - $ref: "#/definitions/pfx-formula"

  pfx-function-parameter-name:
    description: The name of a Power Fx function parameter.
    type: string

  pfx-function-return-type:
    oneOf:
      - $ref: "#/definitions/pfx-data-type"
      - description: aka `void`
        enum: [None]

  pfx-data-type:
    type: string
    enum:
      - Text
      - Number
      - Boolean
      - DateAndTime
      - Screen
      - Record
      - Table
      - Image
      - VideoOrAudio
      - Color
      - Currency

  pfx-formula:
    oneOf:
      - type: string
        pattern: ^=.*
      - type: 'null'
```

---

## ControlInstance.cs — the C# record backing *.pa.yaml control deserialization

Status: **CURRENT**

Source: [src/Persistence/PaYaml/Models/SchemaV3/ControlInstance.cs](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/Persistence/PaYaml/Models/SchemaV3/ControlInstance.cs) — raw: [ControlInstance.cs](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/Persistence/PaYaml/Models/SchemaV3/ControlInstance.cs)

*Confirms at the code level (not just the schema) that `Variant`, `Layout`, `MetadataKey` and `ComponentName` are all untyped, unconstrained `string?` fields. `Properties` is a generic `NamedObjectMapping<PFxExpressionYaml>` — a bare name-to-formula map with no per-control-type property list anywhere in this class or its callers. The `[YamlMember(Alias = "Control")]` attribute is what maps the YAML key `Control:` to the `ControlType` field seen in samples like `Control: Badge@0.0.24`.*

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Models.PowerFx;
using YamlDotNet.Serialization;

namespace Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Models.SchemaV3;

public record ControlInstance : IPaControlInstanceContainer
{
    public ControlInstance() { }

    [SetsRequiredMembers]
    public ControlInstance(string controlType)
    {
        ControlType = controlType ?? throw new ArgumentNullException(nameof(controlType));
    }

    [property: YamlMember(Alias = "Control")]
    public required string? ControlType { get; init; }

    public string? Variant { get; init; }

    public string? ComponentName { get; init; }

    public string? ComponentLibraryUniqueName { get; init; }

    public string? MetadataKey { get; init; }

    public string? Layout { get; init; }

    public bool? IsLocked { get; init; }

    /// <summary>
    /// The name of the group of controls that this control should be grouped with.
    /// This does not impact the visual layout of the control or behavior, but is used to group controls together for organizational purposes from within the Studio.
    /// </summary>
    [property: YamlMember(Alias = "Group")]
    public string? GroupName { get; init; }

    public NamedObjectMapping<PFxExpressionYaml>? Properties { get; init; }

    public NamedObjectSequence<ControlInstance>? Children { get; init; }
}
```

---

## PaYamlSerializerTests.cs — the persistence library's own YAML round-trip test fixtures

Status: **CURRENT**

Source: [src/Persistence.Tests/PaYaml/Serialization/PaYamlSerializerTests.cs](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/Persistence.Tests/PaYaml/Serialization/PaYamlSerializerTests.cs) — raw: [PaYamlSerializerTests.cs](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/Persistence.Tests/PaYaml/Serialization/PaYamlSerializerTests.cs)

*Included as a negative result, not a positive one: every control instance in this file's test fixtures uses only the generic built-ins `Button` and `Label` (e.g. `Control: Button`). There is no Badge, ModernCard, ModernCheckbox, GroupContainer, or any other modern/versioned control anywhere in this test suite. This corroborates ControlInstance.cs — the persistence library genuinely does not carry modern-control property or enum knowledge, in its production code or its own tests, so there is nothing further to extract from this repo's current codebase for the Section 5 table.*

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using FluentAssertions.Execution;
using Microsoft.PowerPlatform.PowerApps.Persistence;
using Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Models;
using Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Models.SchemaV3;
using Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Serialization;

namespace Persistence.Tests.PaYaml.Serialization;

[TestClass]
public class PaYamlSerializerTests : VSTestBase
{
    [TestMethod]
    public void DeserializeAppInstanceSetsLocationInfo()
    {
        PaYamlSerializer.Deserialize<PaModule>("App: {}")!.App!.Start.Should().Be(new(1, 6));
        PaYamlSerializer.Deserialize<PaModule>("\nApp: {}")!.App!.Start.Should().Be(new(2, 6));
        PaYamlSerializer.Deserialize<PaModule>("\nApp:\n Properties: {}")!.App!.Start.Should().Be(new(3, 2));
    }

    [TestMethod]
    public void DeserializeNamedObjectSetsLocationInfo()
    {
        // Since App.Properties is a NamedObjectMapping, the location info should be set on the NamedObject
        var paModule = PaYamlSerializer.Deserialize<PaModule>("""
            App:
                Properties:
                    Foo: =true
                    Bar: ="hello world"
            """);
        paModule.ShouldNotBeNull();
        paModule.App.ShouldNotBeNull();
        paModule.App.Properties.ShouldNotBeNull();
        paModule.App.Properties.Should().ContainName("Foo").WhoseNamedObject.Start.Should().Be(new(3, 9));
        paModule.App.Properties.Should().ContainName("Bar").WhoseNamedObject.Start.Should().Be(new(4, 9));
        paModule.App.Start.Should().Be(new(2, 5), "`App.Start` location info should now be set correctly");
    }

    [TestMethod]
    public void DeserializeControlStyles()
    {
        var paModule = PaYamlSerializer.Deserialize<PaModule>("""
            ControlStyles:
              PrimaryButton:
                Control: Button
                Properties:
                  Fill: =Color.Blue
              Emphasis:
                Control: Label
                Properties:
                  Color: =Color.Red
            """);

        paModule.ShouldNotBeNull();
        paModule.ControlStyles.ShouldNotBeNull();
        paModule.ControlStyles.Should().HaveCount(2);

        // Each style is keyed by its (unique) name and targets a single control type.
        paModule.ControlStyles["PrimaryButton"].ControlType.Should().Be("Button");
        paModule.ControlStyles["PrimaryButton"].Properties.Should().ContainName("Fill");

        paModule.ControlStyles["Emphasis"].ControlType.Should().Be("Label");
        paModule.ControlStyles["Emphasis"].Properties.Should().ContainName("Color");

        // Round-trips back to equivalent YAML.
        var roundTrippedYaml = PaYamlSerializer.Serialize(paModule);
        roundTrippedYaml.Should().BeYamlEquivalentTo("""
            ControlStyles:
              PrimaryButton:
                Control: Button
                Properties:
                  Fill: =Color.Blue
              Emphasis:
                Control: Label
                Properties:
                  Color: =Color.Red
            """);
    }

    #region Deserialize Examples

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/App.pa.yaml", 5)]
    public void DeserializeExamplePaYamlApp(string path, int expectedAppPropertiesCount)
    {
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(File.ReadAllText(path));
        paFileRoot.ShouldNotBeNull();

        // Top level properties
        paFileRoot.App.ShouldNotBeNull();
        paFileRoot.ComponentDefinitions.Should().BeNullOrEmpty();
        paFileRoot.Screens.Should().BeNullOrEmpty();

        paFileRoot.App.Properties.Should().NotBeNull()
            .And.HaveCount(expectedAppPropertiesCount);
        paFileRoot.App.Should().NotDefineMember("Children", "App.Children is still under design review");
    }

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/DataSources/Dataversedatasources1.pa.yaml")]
    public void DeserializeExamplePaYamlDataSources(string path)
    {
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(File.ReadAllText(path));
        paFileRoot.ShouldNotBeNull();

        // Top level properties
        paFileRoot.DataSources.ShouldNotBeNull();
        paFileRoot.App.Should().BeNull();
        paFileRoot.ComponentDefinitions.Should().BeNullOrEmpty();
        paFileRoot.Screens.Should().BeNullOrEmpty();
        paFileRoot.DataSources.Should().HaveCount(4);
        paFileRoot.DataSources.Should().AllSatisfy(ds => ds.Value.ConnectorId.Should().BeNull());
        paFileRoot.DataSources.GetValue("DataverseActions").Type.Should().Be(DataSourceType.Actions);

        // Assert all DataSources except DataverseActions are of type Table
        paFileRoot.DataSources
            .Where(ds => ds.Name != "DataverseActions")
            .Select(ds => ds.Value)
            .Should()
            .AllSatisfy(ds => ds.Type.Should().Be(DataSourceType.Table));
    }

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/Screen1.pa.yaml", 2, 8, 14, 2, 3)]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/FormsScreen2.pa.yaml", 0, 1, 62, 0, 0)]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/CanvasComponentsScreen4.pa.yaml", 0, 6, 6, 0, 0)]
    public void DeserializeExamplePaYamlScreen(string path, int expectedScreenPropertiesCount, int expectedScreenChildrenCount, int expectedDescendantsCount, int expectedScreenGroupsCount, int expectedTotalGroupsCount)
    {
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(File.ReadAllText(path));
        paFileRoot.ShouldNotBeNull();

        // Top level properties
        paFileRoot.App.Should().BeNull();
        paFileRoot.ComponentDefinitions.Should().BeNullOrEmpty();
        paFileRoot.Screens.ShouldNotBeNull();

        // Check screen counts
        paFileRoot.Screens.Should().HaveCount(1);
        var screen = paFileRoot.Screens.First().Value;
        if (expectedScreenPropertiesCount == 0)
            screen.Properties.Should().BeNull();
        else
            screen.Properties.Should().HaveCount(expectedScreenPropertiesCount);

        if (expectedScreenChildrenCount == 0)
            screen.Children.Should().BeNull();
        else
        {
            screen.Children.Should().HaveCount(expectedScreenChildrenCount);
            GetGroupCount(screen).Should().Be(expectedScreenGroupsCount);
        }

        if (expectedDescendantsCount == 0)
            screen.Properties.Should().BeNull();
        else
            screen.DescendantControlInstances().Should().HaveCount(expectedDescendantsCount);

        screen.DescendantControlInstances().Sum(nc => GetGroupCount(nc.Value)).Should().Be(expectedTotalGroupsCount - expectedScreenGroupsCount);

        static int GetGroupCount(IPaControlInstanceContainer container)
        {
            if (container.Children is null)
                return 0;

            return container.Children
                .Select(c => c.Value.GroupName)
                .Where(g => g != null)
                .Distinct()
                .Count();
        }
    }

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/MyHeaderComponent.pa.yaml", 9, 5, 1)]
    public void DeserializeExamplePaYamlComponentDefinition(string path, int expectedCustomPropertiesCount, int expectedPropertiesCount, int expectedChildrenCount)
    {
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(File.ReadAllText(path));
        paFileRoot.ShouldNotBeNull();

        // Top level properties
        paFileRoot.App.Should().BeNull();
        paFileRoot.ComponentDefinitions.ShouldNotBeNull();
        paFileRoot.Screens.Should().BeNullOrEmpty();

        // Check components counts
        paFileRoot.ComponentDefinitions.Should().HaveCount(1);
        var componentDefinition = paFileRoot.ComponentDefinitions.First().Value;
        componentDefinition.Properties.Should().HaveCount(expectedPropertiesCount);
        componentDefinition.CustomProperties.Should().HaveCount(expectedCustomPropertiesCount);
        componentDefinition.Children.Should().HaveCount(expectedChildrenCount);
    }

    [TestMethod]
    public void DeserializeExamplePaYamlSingleFileApp()
    {
        var path = @"_TestData/SchemaV3_0/Examples/Single-File-App.pa.yaml";
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(File.ReadAllText(path));
        paFileRoot.ShouldNotBeNull();

        // Top level properties
        paFileRoot.App.ShouldNotBeNull();
        paFileRoot.ComponentDefinitions.Should().BeNullOrEmpty();
        paFileRoot.Screens.ShouldNotBeNull();

        // Check random spot in the document
        paFileRoot.App.Properties.ShouldNotBeNull();
        paFileRoot.App.Properties.Should().ContainNames("BackEnabled", "Theme");
        var screen = paFileRoot.Screens.Should().ContainName("Screen1").WhoseValue;
        screen.Properties.Should().BeNullOrEmpty();
        screen.Children.Should().HaveCount(2)
            .And.ContainNames("Label1", "TextInput1");
    }

    [TestMethod]
    public void DeserializeDuplicateControlNamesShouldFail()
    {
        var path = @"_TestData/InvalidYaml-CI/duplicate-control-in-sequence.pa.yaml";
        var ex = Assert.ThrowsExactly<PersistenceLibraryException>(() => PaYamlSerializer.Deserialize<NamedObjectSequence<ControlInstance>>(File.ReadAllText(path)));
        ex.ErrorCode.Should().Be(PersistenceErrorCode.DuplicateNameInSequence);
    }

    #endregion

    #region RoundTrip from yaml

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/App.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/Screen1.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/FormsScreen2.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/CanvasComponentsScreen4.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/CodeComponentsScreen5.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/MyHeaderComponent.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/MyComponentLibrary.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/InputProperties-Default.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/OutputProperties.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/Parameters-Default.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Single-File-App.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/AmbiguousComponentNames.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/App.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/ComponentDefinitions.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/Screens-general-controls.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/Screens-with-components.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/Themes.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/FullSchemaUses/ControlStyles.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/DataSources/Dataversedatasources1.pa.yaml")]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/_EditorState.pa.yaml")]
    public void RoundTripFromYaml(string path)
    {
        var originalYaml = File.ReadAllText(path);
        var paFileRoot = PaYamlSerializer.Deserialize<PaModule>(originalYaml);
        paFileRoot.ShouldNotBeNull();

        var roundTrippedYaml = PaYamlSerializer.Serialize(paFileRoot);
        TestContext.WriteTextWithLineNumbers(roundTrippedYaml, "roundTrippedYaml:");
        roundTrippedYaml.Should().BeYamlEquivalentTo(originalYaml);
    }

    #endregion

    #region Is Sequence checks

    [TestMethod]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/App.pa.yaml", false)]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Screens/Screen1.pa.yaml", false)]
    [DataRow(@"_TestData/SchemaV3_0/Examples/Src/Components/MyHeaderComponent.pa.yaml", false)]
    [DataRow(@"_TestData/ValidYaml-CI/With-list-of-controls.pa.yaml", true)]
    [DataRow(@"_TestData/InvalidYaml/Dupliacte-Keys.pa.yaml", false)]
    public void IsSequenceCheckShouldWorkAsExpected(string path, bool expected)
    {
        var yaml = File.ReadAllText(path);
        PaYamlSerializer.CheckIsSequence(yaml).Should().Be(expected);
    }

    [TestMethod]
    public void IsSequenceCheckShouldReturnFalseForInvalidSequences()
    {
        using var _ = new AssertionScope();
        PaYamlSerializer.CheckIsSequence("").Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("   ").Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("a yaml literal string").Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("{ prop1: str2 }").Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("https://somedomain.com/path/resource?param1=foo").Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("""
            <html>
                <body>
                    <h1>Hello World!</h1>
                </body>
            </html>
            """).Should().BeFalse();

        // The following two examples cause a YamlException to be thrown because they aren't valid yaml.
        // But we need to ensure that CheckIsSequence returns false rather than throwing.
        PaYamlSerializer.CheckIsSequence("""
            &sdf=[]{ - not a sequence html: some invalid yaml
            """).Should().BeFalse();
        PaYamlSerializer.CheckIsSequence("""
            * md list item 1
            * md list item 2
            """).Should().BeFalse();
    }

    [TestMethod]
    [DataRow("[]")]
    [DataRow("['str',333]")]
    public void IsSequenceCheckShouldReturnTrueForInlineSequences(string yaml)
    {
        PaYamlSerializer.CheckIsSequence(yaml).Should().BeTrue();
    }

    [TestMethod]
    public void IsSequenceCheckShouldReturnTrueWhenSequenceInFragmentStartsWithComments()
    {
        var yaml = """
            # comment
            - name: control1
            - name: control2
            """;

        PaYamlSerializer.CheckIsSequence(yaml).Should().BeTrue();
    }

    [TestMethod]
    public void IsSequenceCheckShouldReturnTrueWhenSequenceInFragmentBeginsWithDocumentStart()
    {
        var yaml = """
            ---
            - name: control1
            - name: control2
            """;

        PaYamlSerializer.CheckIsSequence(yaml).Should().BeTrue();
    }

    #endregion

    [TestMethod]
    public void SerializeComponentCustomPropertyUnionPropertyOrder()
    {
        // Since App.Properties is a NamedObjectMapping, the location info should be set on the NamedObject
        var actualYaml = PaYamlSerializer.Serialize(new ComponentCustomPropertyUnion()
        {
            PropertyKind = ComponentPropertyKind.Input,
            DisplayName = "My Property",
            Description = "My Property Description",
            DataType = PaYamlPropertyDataType.Boolean,
            Default = new("true"),
        });
        actualYaml.TrimEnd().Should().Be("""
            PropertyKind: Input
            DisplayName: My Property
            Description: My Property Description
            DataType: Boolean
            Default: =true
            """.Replace("\r\n", "\n"));
    }

    [TestMethod]
    public void DeserializeRespectsConfiguredMaximumRecursion()
    {
        // Arrange: build a deeply-nested mapping that exceeds the configured recursion limit.
        var options = new PaYamlSerializerOptions { MaximumRecursion = 5 };
        var yaml = BuildNestedMappingYaml(depth: 20);

        // Act
        Action act = () => PaYamlSerializer.Deserialize<Dictionary<string, object>>(yaml, options);

        // Assert: the exception is wrapped as PersistenceLibraryException with the
        // YamlDotNet MaximumRecursionLevelReachedException as the inner exception.
        act.Should().Throw<PersistenceLibraryException>()
            .WithErrorCode(PersistenceErrorCode.MaximumRecursionLevelReached)
            .WithInnerException<YamlDotNet.Core.MaximumRecursionLevelReachedException>();
    }

    [TestMethod]
    [DataRow(null)]
    [DataRow(55)]
    public void DeserializeSucceedsWhenMaximumRecursionRaisedOrNull(int? maxRecursion)
    {
        // Arrange: same depth-20 input that fails with default recursion, raised limit.
        var options = new PaYamlSerializerOptions { MaximumRecursion = maxRecursion };
        var yaml = BuildNestedMappingYaml(depth: 20);

        // Act
        FluentActions.Invoking(() => PaYamlSerializer.Deserialize<Dictionary<string, object>>(yaml, options))
            .Should().NotThrow()
            .Which.Should().NotBeNull();
    }

    private static string BuildNestedMappingYaml(int depth)
    {
        var sb = new System.Text.StringBuilder();
        for (var i = 0; i < depth; i++)
        {
            sb.Append(new string(' ', i * 2)).Append("k:").AppendLine();
        }
        sb.Append(new string(' ', depth * 2)).Append("k: leaf").AppendLine();
        return sb.ToString();
    }
}
```

---

## PaYamlSerializer.cs — the top-level serializer/deserializer entry point

Status: **CURRENT**

Source: [src/Persistence/PaYaml/Serialization/PaYamlSerializer.cs](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/Persistence/PaYaml/Serialization/PaYamlSerializer.cs) — raw: [PaYamlSerializer.cs](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/Persistence/PaYaml/Serialization/PaYamlSerializer.cs)

*Included for completeness of the current-format picture — shows how the schema and model classes above are wired into an actual YamlDotNet-based reader/writer. No per-control data.*

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Globalization;
using System.Text;
using YamlDotNet.Core;
using YamlDotNet.Core.Events;
using YamlDotNet.Serialization;

namespace Microsoft.PowerPlatform.PowerApps.Persistence.PaYaml.Serialization;

public static class PaYamlSerializer
{
    private static readonly Encoding Utf8NoBom = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);

    #region Serialize
    // TODO: Create transformer for serialization only first, then do a separate PR for deserialization.

    /// <summary>
    /// Converts the value of a type specified by a generic type parameter into a YAML string.
    /// </summary>
    /// <typeparam name="TValue">The type of the value to serialize.</typeparam>
    /// <param name="value">The value to convert.</param>
    /// <param name="options">Options to control serialization behavior.</param>
    /// <returns></returns>
    public static string Serialize<TValue>(TValue value, PaYamlSerializerOptions? options = null)
    {
        var sb = new StringBuilder();
        using (var writer = new StringWriter(sb, CultureInfo.InvariantCulture))
        {
            WriteTextWriter(writer, value, options);
        }
        return sb.ToString();
    }

    public static void Serialize<TValue>(Stream utf8Stream, TValue value, PaYamlSerializerOptions? options = null)
    {
        _ = utf8Stream ?? throw new ArgumentNullException(nameof(utf8Stream));

        using var writer = new StreamWriter(utf8Stream, Utf8NoBom);
        WriteTextWriter(writer, value, options);
    }

    private static void WriteTextWriter<TValue>(TextWriter writer, in TValue? value, PaYamlSerializerOptions? options)
    {
        _ = writer ?? throw new ArgumentNullException(nameof(writer));

        options ??= PaYamlSerializerOptions.Default;
        var targetType = typeof(TValue);

        // Configure the YamlDotNet serializer
        using var context = new PaYamlSerializationContext(options);
        var builder = new SerializerBuilder();
        context.ApplyToSerializerBuilder(builder);
        var serializer = builder.Build();

        try
        {
            serializer.Serialize(writer, value, targetType);
        }
        catch (YamlException ex)
        {
            throw PersistenceLibraryException.FromYamlException(ex, PersistenceErrorCode.SerializationError);
        }
    }
    #endregion

    #region Deserialize

    /// <summary>
    /// Parses the text representing a single YAML value into an instance of the type specified by a generic type parameter.
    /// </summary>
    /// <typeparam name="TValue">The target type of the YAML value.</typeparam>
    /// <param name="yaml">The YAML text to parse.</param>
    /// <param name="options">Options to control the behavior during parsing.</param>
    /// <returns></returns>
    public static TValue? Deserialize<TValue>(string yaml, PaYamlSerializerOptions? options = null)
        where TValue : notnull
    {
        _ = yaml ?? throw new ArgumentNullException(nameof(yaml));

        using var reader = new StringReader(yaml);
        return ReadFromReader<TValue>(reader, options);
    }

    public static TValue? Deserialize<TValue>(Stream utf8Stream, PaYamlSerializerOptions? options = null)
        where TValue : notnull
    {
        _ = utf8Stream ?? throw new ArgumentNullException(nameof(utf8Stream));

        using var reader = new StreamReader(utf8Stream, detectEncodingFromByteOrderMarks: true);
        return ReadFromReader<TValue>(reader, options);
    }

    private static TValue? ReadFromReader<TValue>(TextReader reader, PaYamlSerializerOptions? options)
        where TValue : notnull
    {
        _ = reader ?? throw new ArgumentNullException(nameof(reader));

        options ??= PaYamlSerializerOptions.Default;

        // Configure the YamlDotNet serializer
        using var context = new PaYamlSerializationContext(options);
        var builder = new DeserializerBuilder();
        context.ApplyToDeserializerBuilder(builder);
        var serializer = builder.Build();

        try
        {
            var value = serializer.Deserialize<TValue>(reader);

            return value;
        }
        catch (YamlException ex)
        {
            var errorCode = PersistenceErrorCode.YamlInvalidSyntax;
            if (ex is MaximumRecursionLevelReachedException)
                errorCode = PersistenceErrorCode.MaximumRecursionLevelReached;
            else if (ex.InnerException is ArgumentException && ex.InnerException.Message.Contains("An item with the same key has already been added"))
                errorCode = PersistenceErrorCode.DuplicateNameInSequence;

            throw PersistenceLibraryException.FromYamlException(ex, errorCode);
        }

        // TODO: Consider using FluentValidation nuget package to validate the deserialized object
        // See: fluentvalidation.net
        // See: https://www.youtube.com/watch?v=jblRYDMTtvg
    }

    /// <summary>
    /// checks the input source is a sequence of YAML items.
    /// </summary>
    /// <remarks>
    /// This method does not perform validation on the input fragment.
    /// </remarks>
    /// <param name="yaml"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException">thrown when <paramref name="yaml"/> is null.</exception>
    public static bool CheckIsSequence(string yaml)
    {
        ThrowIfNull(yaml);

        using var reader = new StringReader(yaml);
        return CheckIsSequence(reader);
    }

    /// <summary>
    /// checks the input source is a sequence of YAML items.
    /// </summary>
    /// <remarks>
    /// This method does not perform validation on the input fragment.
    /// </remarks>
    /// <param name="reader"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException">thrown when <paramref name="reader"/> is null.</exception>
    public static bool CheckIsSequence(TextReader reader)
    {
        ThrowIfNull(reader);

        var parser = new Parser(reader);

        try
        {
            // Need to consume the StreamStart and DocumentStart events to get to the root sequence
            parser.TryConsume<StreamStart>(out _);
            parser.TryConsume<DocumentStart>(out _);

            return parser.TryConsume<SequenceStart>(out _);
        }
        catch (YamlException)
        {
            // If we hit a YamlException, the input is not well-formed YAML, which means it can't be a sequence.
            // This also prevents the exception from propagating to the caller.
            return false;
        }
    }

    #endregion
}
```

---

## YAMLFileFormat.md — the 'Experimental' PASopa-era YAML format

Status: **LEGACY / DEPRECATED — explicitly marked experimental by Microsoft**

Source: [docs/YAMLFileFormat.md](https://github.com/microsoft/PowerApps-Tooling/blob/master/docs/YAMLFileFormat.md) — raw: [YAMLFileFormat.md](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/docs/YAMLFileFormat.md)

*The document's own banner: "This document describes the 'Experimental' format generated by PASopa, which is deprecated." Describes an older `Name As ControlType.Template:` object-notation syntax, superseded by the current `Name:\n  Control: ControlType@version` mapping form seen in the v3.0 schema above. Kept here for historical context only — do not use this syntax as evidence for the current format.*

```markdown
# Experimental Power Apps YAML Source File Format

> [!WARNING]
> **This document describes the 'Experimental' format generated by PASopa, which is deprecated.**

The Power Apps formula language has a well established grammar for expressions based on Excel.  However, it lacks the syntax for binding an expression to a property, this has always been handled behind the scenes.

We have selected the industry standard [YAML](https://yaml.org/spec/1.2/spec.html) as our language for this binding.  There are already a large number of editors, tools, and libraries for manipulating YAML.  This document describes how we represent formulas in YAML.

At this time, we support only a restricted subset of YAML.  Only the constructs described in this document are supported.

This is very much a work in progress and may change.  Not everything that defines a Canvas app is represented here, additional information flows through the other files that the tool produces and consumes.

## Leading =

First and foremost, all expressions must begin with a leading equals sign `=`:

```
	Visible: =true
	X: =34
	Text: |
		="Hello, " &
		"World"
```

We use the `=` in this manner for three reasons:
- It is consistent with Excel's usage of a leading `=` to bind an expression to a cell.
- It effectively escapes the formula language's syntax so that YAML does not attempt to parse it.  Normally. YAML would treat `text: 1:00` as minutes and seconds, converting to a number.  By inserting an `=`, YAML will not use its implicit typing rules and formulas will not be unharmed.  Using `=` covers most cases, but not all, and those exceptions are described below under *Single-line formulas*.
- In the future, we can support both formulas (starts with `=`) and non-formulas (no `=`) in the same file, just as Excel does.  We can do this in YAML and non-YAML files alike across in source files of the Power Platform.  Anywhere a formula is supported, the leading `=` differentiates a Power Apps formula expression from a static scalar value.

## Single-line formulas

Single-line formulas are written in the form:

*Name* `:` `SPACE` `=` *Expression*

The space between the colon and the equals sign is required to be YAML compliant.  The equals sign disrupts YAML's normal interpretation of the expression, allowing the rest of the line to be interrupted as the formula language.

For example:

```
Text1: ="Hello, World"
Text2: ="Hello " & ", " & "World"
Number1: =34
Boolean1: =true
Time1: =1:34
```

The pound sign `#` and colon `:` are not allowed anywhere in single-line formulas, even if they are in a quoted text string or identifier name. To use a pound sign or colon, the formula must be expressed as a multi-line formula.  The pound sign is interpreted as a comment in YAML and the colon is interpreted as a new name map in YAML.  To add a comment to a single line comment, use the formula language's line comment starting with `//`.

Using normal YAML escaping with single quotes and C-like backslashes is not supported.  If these would be required, us a multi-line formula instead.  We do this for consistency and to facilitate cut/paste between the formula bar in Power Apps Studio and YAML source files.

See the canvas app [operators and identifiers](https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/operators) documentation for details on allowed names and the structure of an expression.

## Multi-line formulas

Formulas can span multiple lines using YAML's block scalar indicators:

*Name* `:` `SPACE` ( `|` or `|+` or `|-` )
&emsp;`=` *Expression-Line*
&emsp;*Expression-Line*
&emsp;...

All lines that are a part of the block must be indented at least one space in from the level of the first line.

For example:
```
Text1: |
    ="Hello, World"
Text2: |
    ="Hello" &
    "," &
    "World"
```

We accept all forms of YAML multi-line scalar notation on import, including for example `>+`.  However, we will only produce `|`, `|+`, or `|-` to ensure that whitespace is properly preserved.

## Component instance

Components are instanced using YAML object notation.  The type of the object is established with the `As` operator as a part of the left hand side YAML tag.  For container controls, objects can be nested.

*Name*&emsp;`As`&emsp;*Component-Type*&emsp;[ `.`&emsp;*Component-Template* ]&emsp;`:`
&emsp;( *Single-Line-Formula* or *Multi-Line-Formula* or *Object-instance* )
&emsp;...

All lines that are a part of the block must be indented at least one space in from the level of the first line.

For example:
```
Gallery1 As Gallery.horizontalGallery:
    Fill: = Color.White
    Label1 As Label:
        Text: ="Hello, World"
        X: =20
        Y: =40
        Fill: |
            =If( Lower( Left( Self.Text, 6 ) ) = "error:",
                Color.Red,
                Color.Black
            )
```

*Component-Type* can be any canvas component or control.  Base types, such as *Number* are not supported.

*Component-Template* is an optional specifier for components that have different templates such as the Gallery.  Not all components will have templates.

If *Name* contains special characters and is wrapped with single quotes, then the entire phrase to the left of the colon will need to be escaped.  This can be done in two ways:
- Use single quotes to wrap the entire left hand side, requiring the existing single quotes to be doubled:
    ```
    '''A name with a space'' As Gallery':
    ```
- Use double quotes to wrap the entire left hand side, but be careful that there are no double quotes in the name:
    ```
    "'A name with a space' As Gallery":
    ```

## Component definition

Similarly, components are defined by creating an instance of one of the supported base types.  The base types cannot be instanced directly.  Within an object definition, properties can be added to what the base type provides.

The supported base types are:
- CanvasComponent

### Simple property definition

Components use properties to communicate with the app in which they are hosted.

*Name* `:` ( *Single-Line-Expression* or *Multi-Line-Expression* )

The type of the formula is implied by the type of the expression.

For input properties, the expression provides the default to be inserted into the app when the component is instanced.  The app maker can modify this expression as they see fit, but cannot change the type.

For output properties, the expression provides the calculation to be performed.  The app maker cannot modify this expression, it is encapsulated in the component.

At this time, all properties are data flow only and cannot contain side effects.

At this time, additional metadata about the property is not defined here but is instead in the other files of the .msapp file, for example the property's description.

For example:

```
DateRangePicker As CanvasComponent:
    DefaultStart: |-
		=// input property, customizable default for the component instance
		Now()
    DefaultEnd: |-
		=// input property, customizable default for the component instance
		DateAdd( Now(), 1, Days )
    SelectedStart: =DatePicker1.SelectedDate   // output property
    SelectedEnd: =DatePicker2.SelectedDate     // output property
```

## YAML compatibility

### YAML comments

YAML's `#` line comments are not preserved anywhere in the source format.  Instead, within a formula, use the formula language's line comments that start with `//` or block comments that are delimited with `/*` and `*/`.

### Errors for common pitfalls

There are a few places where the formula language and YAML grammars are incompatible or could be confusing for a user.  In these cases, we will throw an error.

For example in:
```
Text: ="Hello #PowerApps"
Record: ={ a: 1, b: 2 }
```
the `#` is treated as a comment by YAML even though it is embedded in what Excel would consider a double quoted text string.  In the record case, YAML considers `a:` and `b:` to be another name map binding.  To avoid confusion, we will error on these cases during import.  In these cases, a YAML multi-line form can be used instead.

YAML allows the same name map to be reused, the last silently overriding any previous definitions.  As this can be very confusing for a low code maker and can result in the loss of a property formula, we will error if we see the same name twice.
```

---

## GlobalTemplates.cs — legacy PASopa control template defaults, including GroupContainer's three layout variants

Status: **LEGACY / DEPRECATED — src/PAModel is the unsupported PASopa tool**

Source: [src/PAModel/ControlTemplates/GlobalTemplates.cs](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/PAModel/ControlTemplates/GlobalTemplates.cs) — raw: [GlobalTemplates.cs](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/PAModel/ControlTemplates/GlobalTemplates.cs)

*The README marks the whole PASopa tool (everything under src/PAModel) as legacy and no longer supported, so treat this as historical evidence, not current-format confirmation — per the standing rule, a Studio-written sample outranks this. That said, it is real Microsoft source code, and it is the closest thing found to an authoritative list of GroupContainer's layout properties: `LayoutMode`, `LayoutDirection` (`LayoutDirection.Horizontal` / `.Vertical` / `.Manual`), `LayoutWrap`, `LayoutAlignItems` (`LayoutAlignItems.Start`), `LayoutJustifyContent` (`LayoutJustifyContent.Start`), `LayoutGap`, `LayoutOverflowX`, `LayoutOverflowY` (`LayoutOverflow.Hide`) — all set via three named variants: `horizontalAutoLayoutContainer`, `verticalAutoLayoutContainer`, `manualLayoutContainer`. Flag this precisely because it conflicts with the catalogue's current guess in two ways worth resolving against a Studio sample rather than assuming either is right: (1) these variant names are lowercase camelCase strings, not the `Variant: Vertical`/`Horizontal`/`AutoLayout` tokens currently logged as Studio-written in CORPUS.md section 5; (2) this code has no `FillPortions`, `LayoutMinWidth`, or `AlignInContainer` on the container template itself — in this legacy model those may have lived on the *child* control's properties rather than the container, which would explain their absence here without meaning they don't exist in the current v3.0 format.*

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.AppMagic.Authoring.Persistence;
using Microsoft.PowerPlatform.Formulas.Tools.EditorState;

namespace Microsoft.PowerPlatform.Formulas.Tools.ControlTemplates;

internal class GlobalTemplates
{
    public static void AddCodeOnlyTemplates(TemplateStore templateStore, Dictionary<string, ControlTemplate> templates, AppType type)
    {
        templates.Add("appinfo", CreateAppInfoTemplate(type));
        if (!templateStore.TryGetTemplate("appinfo", out _))
        {
            templateStore.AddTemplate("appinfo", new CombinedTemplateState()
            {
                Id = "http://microsoft.com/appmagic/appinfo",
                Name = "appinfo",
                Version = "1.0",
                LastModifiedTimestamp = "0",
                IsComponentTemplate = false,
                FirstParty = true,
            });
        }

        templates.Add("screen", CreateScreenTemplate(type));
        if (!templateStore.TryGetTemplate("screen", out _))
        {
            templateStore.AddTemplate("screen", new CombinedTemplateState()
            {
                Id = "http://microsoft.com/appmagic/screen",
                Name = "screen",
                Version = "1.0",
                LastModifiedTimestamp = "0",
                IsComponentTemplate = false,
                FirstParty = true,
            });
        }

        /*  Prior to PAC Document version 1.318, the groupContainer control was not version
            flexible, so we must check for its existence here. These can be removed from
            GlobalTemplates IFF all documents are upgraded to 1.318+ (unlikely) OR if support
            for documents 1.317 and lower is dropped. */
        if (!templates.ContainsKey("groupContainer"))
        {
            templates.Add("groupContainer", CreateGroupContainerTemplate(type));
        }
        if (!templateStore.TryGetTemplate("groupContainer", out _))
        {
            templateStore.AddTemplate("groupContainer", new CombinedTemplateState()
            {
                Id = "http://microsoft.com/appmagic/groupContainer",
                Name = "groupContainer",
                Version = "1.0",
                LastModifiedTimestamp = "0",
                IsComponentTemplate = false,
                FirstParty = true,
            });
        }
    }

    private static ControlTemplate CreateAppInfoTemplate(AppType type)
    {
        var template = new ControlTemplate("appinfo", "1.0", "http://microsoft.com/appmagic/appinfo");
        template.InputDefaults.Add("MinScreenHeight", type == AppType.Phone ? "640" : "320");
        template.InputDefaults.Add("MinScreenWidth", type == AppType.Phone ? "640" : "320");
        template.InputDefaults.Add("ConfirmExit", "false");
        template.InputDefaults.Add("SizeBreakpoints", type == AppType.Phone ? "[1200, 1800, 2400]" : "[600, 900, 1200]");
        return template;
    }

    private static ControlTemplate CreateScreenTemplate(AppType type)
    {
        var template = new ControlTemplate("screen", "1.0", "http://microsoft.com/appmagic/screen");
        template.InputDefaults.Add("Fill", "RGBA(255, 255, 255, 1)");
        template.InputDefaults.Add("Height", "Max(App.Height, App.MinScreenHeight)");
        template.InputDefaults.Add("Width", "Max(App.Width, App.MinScreenWidth)");
        template.InputDefaults.Add("Size", "1 + CountRows(App.SizeBreakpoints) - CountIf(App.SizeBreakpoints, Value >= Self.Width)");
        template.InputDefaults.Add("Orientation", "If(Self.Width < Self.Height, Layout.Vertical, Layout.Horizontal)");
        template.InputDefaults.Add("LoadingSpinner", "LoadingSpinner.None");
        template.InputDefaults.Add("LoadingSpinnerColor", "RGBA(0, 51, 102, 1)");
        template.InputDefaults.Add("ImagePosition", "ImagePosition.Fit");
        return template;
    }

    private static ControlTemplate CreateGroupContainerTemplate(AppType type)
    {
        var template = new ControlTemplate("groupContainer", "1.0", "http://microsoft.com/appmagic/groupContainer");
        template.InputDefaults.Add("Width", "500");
        template.InputDefaults.Add("Height", type == AppType.Phone ? "225" : "200");
        template.InputDefaults.Add("PaddingTop", "0");
        template.InputDefaults.Add("PaddingBottom", "0");
        template.InputDefaults.Add("PaddingRight", "0");
        template.InputDefaults.Add("PaddingLeft", "0");
        template.InputDefaults.Add("BorderColor", "RGBA(0, 0, 0, 1)");
        template.InputDefaults.Add("BorderStyle", "BorderStyle.Solid");
        template.InputDefaults.Add("BorderThickness", "0");
        template.InputDefaults.Add("Fill", "RGBA(0, 0, 0, 0)");
        template.InputDefaults.Add("X", "0");
        template.InputDefaults.Add("Y", "0");
        template.InputDefaults.Add("Visible", "true");
        template.InputDefaults.Add("ChildTabPriority", "true");
        template.InputDefaults.Add("EnableChildFocus", "true");


        // These share a lot of properties, and they should be in the base template, but this is
        // mirroring what is found in the groupContainer_oam.xml definition. 
        var horizontalContainerDefaults = new Dictionary<string, string>()
        {
            { "LayoutMode", "LayoutMode.Auto" },
            { "LayoutDirection", "LayoutDirection.Horizontal" },
            { "LayoutWrap", "false" },
            { "LayoutAlignItems", "LayoutAlignItems.Start" },
            { "LayoutJustifyContent", "LayoutJustifyContent.Start" },
            { "LayoutGap", "0" },
            { "LayoutOverflowX", "LayoutOverflow.Hide" },
            { "LayoutOverflowY", "LayoutOverflow.Hide" }
        };

        template.VariantDefaultValues.Add("horizontalAutoLayoutContainer", horizontalContainerDefaults);

        var verticalContainerDefaults = new Dictionary<string, string>()
        {
            { "LayoutMode", "LayoutMode.Auto" },
            { "LayoutDirection", "LayoutDirection.Vertical" },
            { "LayoutWrap", "false" },
            { "LayoutAlignItems", "LayoutAlignItems.Start" },
            { "LayoutJustifyContent", "LayoutJustifyContent.Start" },
            { "LayoutGap", "0" },
            { "LayoutOverflowX", "LayoutOverflow.Hide" },
            { "LayoutOverflowY", "LayoutOverflow.Hide" }
        };
        template.VariantDefaultValues.Add("verticalAutoLayoutContainer", verticalContainerDefaults);

        var manualContainerDefaults = new Dictionary<string, string>()
        {
            { "LayoutMode", "LayoutMode.Auto" },
            { "LayoutDirection", "LayoutDirection.Manual" },
            { "LayoutWrap", "false" },
            { "LayoutAlignItems", "LayoutAlignItems.Start" },
            { "LayoutJustifyContent", "LayoutJustifyContent.Start" },
            { "LayoutGap", "0" },
            { "LayoutOverflowX", "LayoutOverflow.Hide" },
            { "LayoutOverflowY", "LayoutOverflow.Hide" }
        };
        template.VariantDefaultValues.Add("manualLayoutContainer", manualContainerDefaults);

        return template;
    }
}
```

---

## ControlProperty.cs — legacy per-property default-value record

Status: **LEGACY / DEPRECATED**

Source: [src/PAModel/ControlTemplates/ControlProperty.cs](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/PAModel/ControlTemplates/ControlProperty.cs) — raw: [ControlProperty.cs](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/PAModel/ControlTemplates/ControlProperty.cs)

*The class GlobalTemplates.cs above uses to store each property's name and per-platform (phone/web) default value. Included for completeness; carries no new property names of its own.*

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
using Microsoft.AppMagic.Authoring.Persistence;


namespace Microsoft.PowerPlatform.Formulas.Tools.ControlTemplates;

internal sealed class ControlProperty
{
    public string Name { get; }
    public string DefaultValue { get; }
    public string PhoneDefaultValue { get; }
    public string WebDefaultValue { get; }

    public ControlProperty(string name, string defaultVal, string phoneDefault, string webDefault)
    {
        Name = name;
        DefaultValue = defaultVal;
        PhoneDefaultValue = phoneDefault;
        WebDefaultValue = webDefault;
    }

    public string GetDefaultValue(AppType type)
    {
        if (type == AppType.Phone && PhoneDefaultValue != null)
            return PhoneDefaultValue;
        if (type == AppType.Web && WebDefaultValue != null)
            return WebDefaultValue;

        return DefaultValue;
    }
}
```

---

## commonStyleProperties.xml — legacy classic-control common property datatypes

Status: **LEGACY / DEPRECATED**

Source: [src/PAModel/ControlTemplates/commonStyleProperties.xml](https://github.com/microsoft/PowerApps-Tooling/blob/master/src/PAModel/ControlTemplates/commonStyleProperties.xml) — raw: [commonStyleProperties.xml](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/master/src/PAModel/ControlTemplates/commonStyleProperties.xml)

*Legacy XML property definitions for classic controls (Text, Image, AccessibleLabel, Role, Tooltip, Fill, HoverFill, PressedFill, DisabledFill, and more), each with its `datatype`. Corroborates common-property datatypes already documented in canvas-apps-06-common-properties.md; does not cover modern (Fluent) controls, which postdate this file.*

```xml
<?xml version="1.0" encoding="utf-8" ?>

<properties xmlns="http://openajax.org/metadata" 
  xmlns:appMagic="http://schemas.microsoft.com/appMagic">

  <!-- Data -->
  <property name="Text" localizedName="##CommonProperties_Text##" datatype="String" defaultValue="">
    <title>Caption</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_Text_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Text_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Image" localizedName="##CommonProperties_Image##" datatype="Image" defaultValue="SampleImage" converter="encodeImageUrl" isExpr="true">
    <title>Image content</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_Image_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Image_Tooltip##</appMagic:tooltip>
  </property>
  <property name="AccessibleLabel" localizedName="##CommonProperties_AccessibleLabel##" datatype="String" defaultValue="">
    <title>Accessible label</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_AccessibleLabel_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_AccessibleLabel_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Role" localizedName="##CommonProperties_Role##" datatype="TextRole" defaultValue="%TextRole.RESERVED%.Default" isExpr="true">
    <title>Role</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_Role_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Role_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Tooltip" localizedName="##CommonProperties_Tooltip##" datatype="String" defaultValue="">
    <title>Tooltip</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_Tooltip_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Tooltip_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Fill -->
  <property name="Fill" localizedName="##CommonProperties_Fill##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 0)" converter="argbConverter">
    <title>Background color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Fill_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Fill_Tooltip##</appMagic:tooltip>
  </property>
  <property name="HoverFill" localizedName="##CommonProperties_HoverFill##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 0)" converter="argbConverter">
    <title>Hover Background color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_HoverFill_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_HoverFill_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PressedFill" localizedName="##CommonProperties_PressedFill##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 0)" converter="argbConverter">
    <title>Click Background color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PressedFill_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PressedFill_Tooltip##</appMagic:tooltip>
  </property>
  <property name="DisabledFill" localizedName="##CommonProperties_DisabledFill##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 0)" converter="argbConverter">
    <title>Disabled Background color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_DisabledFill_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_DisabledFill_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Border Radius -->
  <property name="RadiusTopLeft" localizedName="##CommonProperties_RadiusTopLeft##" datatype="Number" defaultValue="0" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Radius Top Left</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_RadiusTopLeft_DisplayName##</appMagic:displayName>
  </property>
  <property name="RadiusTopRight" localizedName="##CommonProperties_RadiusTopRight##" datatype="Number" defaultValue="0" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Radius Top Right</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_RadiusTopRight_DisplayName##</appMagic:displayName>
  </property>
  <property name="RadiusBottomLeft" localizedName="##CommonProperties_RadiusBottomLeft##" datatype="Number" defaultValue="0" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Radius Bottom Left</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_RadiusBottomLeft_DisplayName##</appMagic:displayName>
  </property>
  <property name="RadiusBottomRight" localizedName="##CommonProperties_RadiusBottomRight##" datatype="Number" defaultValue="0" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Radius Bottom Right</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_RadiusBottomRight_DisplayName##</appMagic:displayName>
  </property>

  <!-- Text -->
  <property name="Font" localizedName="##CommonProperties_Font##" datatype="Font" defaultValue="%Font.RESERVED%.'Open Sans'" isExpr="true" converter="fontConverter">
    <title>font family</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>fontFamily</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Font_DisplayName##</appMagic:displayName>
  </property>
  <property name="Size" localizedName="##CommonProperties_Size##" datatype="Number" defaultValue="11" converter="ptConverter">
    <title>font size</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>fontSize</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Size_DisplayName##</appMagic:displayName>
  </property>
  <property name="FontWeight" localizedName="##CommonProperties_FontWeight##" datatype="FontWeight" defaultValue="%FontWeight.RESERVED%.Normal" isExpr="true">
    <title>font weight</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>fontWeight</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_FontWeight_DisplayName##</appMagic:displayName>
  </property>
  <property name="Italic" localizedName="##CommonProperties_Italic##" datatype="boolean" defaultValue="false" converter="italicConverter">
    <title>italic</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Italic_DisplayName##</appMagic:displayName>
  </property>
  <property name="Underline" localizedName="##CommonProperties_Underline##" datatype="boolean" defaultValue="false">
    <title>underline</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Underline_DisplayName##</appMagic:displayName>
  </property>
  <property name="Strikethrough" localizedName="##CommonProperties_Strikethrough##" datatype="boolean" defaultValue="false">
    <title>underline</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Strikethrough_DisplayName##</appMagic:displayName>
  </property>

  <!-- Color -->
  <property name="Color" localizedName="##CommonProperties_Color##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Color_DisplayName##</appMagic:displayName>
  </property>
  <property name="HoverColor" localizedName="##CommonProperties_HoverColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>hover color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_HoverColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_HoverColor_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PressedColor" localizedName="##CommonProperties_PressedColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>pressed color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PressedColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PressedColor_Tooltip##</appMagic:tooltip>
  </property>
  <property name="DisabledColor" localizedName="##CommonProperties_DisabledColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>disabled color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_DisabledColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_DisabledColor_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Border Properties-->
  <property name="BorderStyle" localizedName="##CommonProperties_BorderStyle##" datatype="BorderStyle" defaultValue="%BorderStyle.RESERVED%.Solid" isExpr="true">
    <title>Border Style</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>lineStyle</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_BorderStyle_DisplayName##</appMagic:displayName>
  </property>
  <property name="BorderThickness" localizedName="##CommonProperties_BorderThickness##" datatype="Number" defaultValue="0" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Border Thickness</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>lineWidth</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_BorderThickness_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_BorderThickness_Tooltip##</appMagic:tooltip>
  </property>
  <property name="FocusedBorderColor" localizedName="##CommonProperties_FocusedBorderColor##" datatype="Color" isExpr="true" defaultValue="RGBA(101, 128, 187, 1)" converter="argbConverter">
    <title>Focused Border Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_FocusedBorderColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_FocusedBorderColor_Tooltip##</appMagic:tooltip>
  </property>
  <property name="FocusedBorderThickness" localizedName="##CommonProperties_FocusedBorderThickness##" datatype="Number" defaultValue="2" converter="pxConverter" nullDefault="0" minimum="0">
    <title>Focused Border Thickness</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>lineWidth</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_FocusedBorderThickness_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_FocusedBorderThickness_Tooltip##</appMagic:tooltip>
  </property>
  <property name="BorderColor" localizedName="##CommonProperties_BorderColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>Border Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_BorderColor_DisplayName##</appMagic:displayName>
  </property>
  <property name="DisabledBorderColor" localizedName="##CommonProperties_DisabledBorderColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>Disabled Border Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_DisabledBorderColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_DisabledBorderColor_Tooltip##</appMagic:tooltip>
  </property>
  <property name="HoverBorderColor" localizedName="##CommonProperties_HoverBorderColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>Hover Border Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_HoverBorderColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_HoverBorderColor_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PressedBorderColor" localizedName="##CommonProperties_PressedBorderColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 0, 0, 1)" converter="argbConverter">
    <title>Pressed Border Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>color</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PressedBorderColor_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PressedBorderColor_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Padding -->
  <property name="Padding" localizedName="##CommonProperties_Padding##" datatype="Number" defaultValue="0" converter="pxConverter">
    <title>Padding</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>padding</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Padding_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Padding_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PaddingTop" localizedName="##CommonProperties_PaddingTop##" datatype="Number" defaultValue="0" converter="pxVerticalConverter" nullDefault="0">
    <title>PaddingTop</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>padding</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PaddingTop_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PaddingTop_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PaddingRight" localizedName="##CommonProperties_PaddingRight##" datatype="Number" defaultValue="0" converter="pxHorizontalConverter" nullDefault="0">
    <title>PaddingRight</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>padding</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PaddingRight_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PaddingRight_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PaddingBottom" localizedName="##CommonProperties_PaddingBottom##" datatype="Number" defaultValue="0" converter="pxVerticalConverter" nullDefault="0">
    <title>PaddingBottom</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>padding</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PaddingBottom_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PaddingBottom_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PaddingLeft" localizedName="##CommonProperties_PaddingLeft##" datatype="Number" defaultValue="0" converter="pxHorizontalConverter" nullDefault="0">
    <title>PaddingLeft</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>padding</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_PaddingLeft_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_PaddingLeft_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Options -->
  <property name="ShowControls" localizedName="##CommonProperties_ShowControls##" datatype="Boolean" direction="in" defaultValue="true">
    <title>Show Controls</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ShowControls_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ShowControls_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Visible" localizedName="##CommonProperties_Visible##" datatype="boolean" defaultValue="true">
    <title>Visible</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Visible_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Visible_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Disabled" localizedName="##CommonProperties_Disabled##" datatype="boolean" defaultValue="false">
    <title>Disabled</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Disabled_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Disable_Tooltip##</appMagic:tooltip>
  </property>
  <property name="AutoDisableOnSelect" localizedName="##CommonProperties_AutoDisableOnSelect##" datatype="Boolean" direction="in" defaultValue="true">
    <title>Disable the control when OnSelect is in progress</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_AutoDisableOnSelect_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_AutoDisableOnSelect_Tooltip##</appMagic:tooltip>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:isInOverflow>true</appMagic:isInOverflow>
    <appMagic:group>options</appMagic:group>
  </property>
  <property name="DisplayMode" localizedName="##CommonProperties_DisplayMode##" datatype="DisplayMode" defaultValue="%DisplayMode.RESERVED%.Edit" isExpr="true">
    <title>DisplayMode</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>displayMode</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_DisplayMode_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_DisplayMode_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Paragraph -->
  <property name="Align" localizedName="##CommonProperties_Align##" datatype="Align" defaultValue="%Align.RESERVED%.Left" isExpr="true">
    <title>align</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>align</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Align_DisplayName##</appMagic:displayName>
  </property>
  <property name="VerticalAlign" localizedName="##CommonProperties_VerticalAlign##" datatype="VerticalAlign" defaultValue="%VerticalAlign.RESERVED%.Top" isExpr="true">
    <title>VerticalAlign</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>verticalAlign</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_VerticalAlign_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_VerticalAlign_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ImagePosition" localizedName="##CommonProperties_ImagePosition##" datatype="ImagePosition" defaultValue="%ImagePosition.RESERVED%.Fill" isExpr="true" converter="imagePositionConverter">
    <title>ImagePosition</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>imagePosition</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ImagePosition_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ImagePosition_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ShowValue" localizedName="##CommonProperties_ShowValue##" datatype="Boolean" defaultValue="true">
    <title>Show/hide the value label</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ShowValue_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ShowValue_Tooltip##</appMagic:tooltip>
  </property>
  <!-- Behavior Properties(Events)-->
  <!-- TASK: 74722: What should the datatype be? -->
  <property name="OnSelect" localizedName="##CommonProperties_OnSelect##" datatype="Boolean" defaultValue="false" direction="in">
    <title>Click Behavior</title>
    <appMagic:category>behavior</appMagic:category>
    <appMagic:displayName>##CommonProperties_OnSelect_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_OnSelect_Tooltip##</appMagic:tooltip>
  </property>
  <property name="OnChange" localizedName="##CommonProperties_OnChange##" datatype="Boolean" defaultValue="false" direction="in">
    <title>Change Behavior</title>
    <appMagic:category>behavior</appMagic:category>
    <appMagic:displayName>##CommonProperties_OnChange_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_OnChange_Tooltip##</appMagic:tooltip>
  </property>
  <property name="OnStart" localizedName="##CommonProperties_OnStart##" datatype="Boolean" defaultValue="false" direction="in">
    <title>Behavior when playback starts</title>
    <appMagic:category>behavior</appMagic:category>
    <appMagic:displayName>##CommonProperties_OnStart_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_OnStart_Tooltip##</appMagic:tooltip>
  </property>
  <property name="OnPause" localizedName="##CommonProperties_OnPause##" datatype="Boolean" defaultValue="false" direction="in">
    <title>Behavior when playback pauses</title>
    <appMagic:category>behavior</appMagic:category>
    <appMagic:displayName>##CommonProperties_OnPause_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_OnPause_Tooltip##</appMagic:tooltip>
  </property>
  <property name="OnEnd" localizedName="##CommonProperties_OnEnd##" datatype="Boolean" defaultValue="false" direction="in">
    <title>Behavior when playback ends and stops</title>
    <appMagic:category>behavior</appMagic:category>
    <appMagic:displayName>##CommonProperties_OnEnd_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_OnEnd_Tooltip##</appMagic:tooltip>
  </property>
  <property name="defaultWidth" localizedName="##CommonProperties_defaultWidth##" datatype="Number" defaultValue="100" hidden="true">
    <title>Default width</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="defaultHeight" localizedName="##CommonProperties_defaultHeight##" datatype="Number" defaultValue="100" hidden="true">
    <title>Default height</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="minimumWidth" localizedName="##CommonProperties_minimumWidth##" datatype="Number" defaultValue="10" hidden="true">
    <title>Minimum width</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="minimumHeight" localizedName="##CommonProperties_minimumHeight##" datatype="Number" defaultValue="10" hidden="true">
    <title>Minimum height</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="maximumWidth" localizedName="##CommonProperties_maximumWidth##" datatype="Number" defaultValue="1366" hidden="true">
    <title>Maximum width</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="maximumHeight" localizedName="##CommonProperties_maximumHeight##" datatype="Number" defaultValue="768" hidden="true">
    <title>Maximum height</title>
    <appMagic:category>design</appMagic:category>
  </property>

  <!-- Position & Size -->
  <property name="X" localizedName="##CommonProperties_X##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Position on x-axis</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_X_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_X_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Y" localizedName="##CommonProperties_Y##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Position on y-axis</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_Y_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Y_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Width" localizedName="##CommonProperties_Width##" datatype="Number" defaultValue="100" minimum="0" nullDefault="0">
    <title>Width of control</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>width</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Width_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Width_Tooltip##</appMagic:tooltip>
  </property>
  <property name="WidthFit" localizedName="##CommonProperties_WidthFit##" datatype="Boolean" defaultValue="false">
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_WidthFit_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_WidthFit_Tooltip##</appMagic:tooltip>
  </property>
  <property name="Height" localizedName="##CommonProperties_Height##" datatype="Number" defaultValue="100" minimum="0" nullDefault="0">
    <title>Height of control</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>height</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_Height_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_Height_Tooltip##</appMagic:tooltip>
  </property>
  <property name="NumberOfColumns" localizedName="##CommonProperties_NumberOfColumns##" datatype="Number" defaultValue="3" phoneDefaultValue="1" hidden="true">
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_NumberOfColumns_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_NumberOfColumns_Tooltip##</appMagic:tooltip>
  </property>
  <property name="SnapToColumns" localizedName="##CommonProperties_SnapToColumns##" datatype="Boolean" defaultValue="true" hidden="true">
    <appMagic:displayName>##CommonProperties_SnapToColumns_DisplayName##</appMagic:displayName>
    <appMagic:category>design</appMagic:category>
    <appMagic:tooltip>##CommonProperties_SnapToColumns_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutX" localizedName="##CommonProperties_LayoutX##" datatype="Number" hidden="true">
    <title>X value managed by layout</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="LayoutY" localizedName="##CommonProperties_LayoutY##" datatype="Number" hidden="true">
    <title>Y value managed by layout</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="LayoutWidth" localizedName="##CommonProperties_LayoutWidth##" datatype="Number" hidden="true">
    <title>Width value managed by layout</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="LayoutHeight" localizedName="##CommonProperties_LayoutHeight##" datatype="Number" hidden="true">
    <title>Height value managed by layout</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="ThemeColor" localizedName="##CommonProperties_ThemeColor##" datatype="Color" isExpr="true" defaultValue="RGBA(0, 176, 240, 1)" converter="argbConverter">
    <title>Theme Color</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_ThemeColor_DisplayName##</appMagic:displayName>
    <appMagic:helperUI>color</appMagic:helperUI>
  </property>
  <property name="ReadOnly" localizedName="##CommonProperties_ReadOnly##" datatype="Boolean" defaultValue="false">
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_ReadOnly_DisplayName##</appMagic:displayName>
    <appMagic:helperUI>boolean</appMagic:helperUI>
    <appMagic:tooltip>##CommonProperties_ReadOnly_Tooltip##</appMagic:tooltip>
  </property>
  <property name="PreserveAspectRatio" localizedName="##CommonProperties_PreserveAspectRatio##" datatype="Boolean" defaultValue="false" hidden="true" styleable="true">
    <title>used for shape controls to determine if they should preserve aspect ratio when the app size changes at runtime</title>
    <appMagic:category>design</appMagic:category>
  </property>
  <property name="TabIndex" localizedName="##CommonProperties_TabIndex##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Tab Index</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_TabIndex_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_TabIndex_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ResizerGrip" localizedName="##CommonProperties_ResizerGrip##" datatype="String" defaultValue="" hidden="true">
    <title>Resizer grip</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:displayName>##CommonProperties_ResizerGrip_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ResizerGrip_Tooltip##</appMagic:tooltip>
  </property>

  <!-- Auto-layout properties -->
  <property name="LayoutMode" localizedName="##CommonProperties_LayoutMode##" datatype="LayoutMode" defaultValue="%LayoutMode.RESERVED%.Manual" nullDefault="%LayoutMode.RESERVED%.Manual" isExpr="true" hidden="true">
    <title>Layout Mode</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutMode</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutMode_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutMode_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutDirection" localizedName="##CommonProperties_LayoutDirection##" datatype="LayoutDirection" defaultValue="%LayoutDirection.RESERVED%.Horizontal" nullDefault="%LayoutDirection.RESERVED%.Horizontal" isExpr="true" hidden="true">
    <title>Layout Direction</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutDirection</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutDirection_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutDirection_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutWrap" localizedName="##CommonProperties_LayoutWrap##" datatype="Boolean" defaultValue="false" hidden="true">
    <title>Layout Wrap</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutWrap</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutWrap_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutWrap_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutAlignItems" localizedName="##CommonProperties_LayoutAlignItems##" datatype="LayoutAlignItems" defaultValue="%LayoutAlignItems.RESERVED%.Start" nullDefault="%LayoutAlignItems.RESERVED%.Start" isExpr="true" hidden="true">
    <title>Layout Align</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutAlignItems</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutAlignItems_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutAlignItems_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutJustifyContent" localizedName="##CommonProperties_LayoutJustifyContent##" datatype="LayoutJustifyContent" defaultValue="%LayoutJustifyContent.RESERVED%.Start" nullDefault="%LayoutJustifyContent.RESERVED%.Start" isExpr="true" hidden="true">
    <title>Layout Justify</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutJustifyContent</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutJustifyContent_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutJustifyContent_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutOverflowX" localizedName="##CommonProperties_LayoutOverflowX##" datatype="LayoutOverflow" defaultValue="%LayoutOverflow.RESERVED%.Hide" nullDefault="%LayoutOverflow.RESERVED%.Hide" isExpr="true" hidden="true">
    <title>Layout Overflow</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutOverflowX</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutOverflowX_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutOverflowX_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutOverflowY" localizedName="##CommonProperties_LayoutOverflowY##" datatype="LayoutOverflow" defaultValue="%LayoutOverflow.RESERVED%.Hide" nullDefault="%LayoutOverflow.RESERVED%.Hide" isExpr="true" hidden="true">
    <title>Layout Overflow</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutOverflowY</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutOverflowY_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutOverflowY_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutGap" localizedName="##CommonProperties_LayoutGap##" datatype="Number" defaultValue="0" nullDefault="0" hidden="true">
    <title>Layout Gap</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutGap</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutGap_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutGap_Tooltip##</appMagic:tooltip>
  </property>
  <property name="GrowthPortions" localizedName="##CommonProperties_GrowthPortions##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Growth Portions</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>growthPortions</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_GrowthPortions_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_GrowthPortions_Tooltip##</appMagic:tooltip>
  </property>
  <property name="AlignInContainer" localizedName="##CommonProperties_AlignInContainer##" datatype="AlignInContainer" defaultValue="%AlignInContainer.RESERVED%.SetByContainer" nullDefault="%AlignInContainer.RESERVED%.SetByContainer" isExpr="true">
    <title>Self Align</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>alignInContainer</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_AlignInContainer_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_AlignInContainer_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutMinHeight" localizedName="##CommonProperties_LayoutMinHeight##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Layout Min Height</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutMinHeight</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutMinHeight_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutMinHeight_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutMaxHeight" localizedName="##CommonProperties_LayoutMaxHeight##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Layout Max Height</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutMaxHeight</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutMaxHeight_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutMaxHeight_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutMinWidth" localizedName="##CommonProperties_LayoutMinWidth##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Layout Min Width</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutMinWidth</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutMinWidth_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutMinWidth_Tooltip##</appMagic:tooltip>
  </property>
  <property name="LayoutMaxWidth" localizedName="##CommonProperties_LayoutMaxWidth##" datatype="Number" defaultValue="0" nullDefault="0">
    <title>Layout Max Width</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>layoutMaxWidth</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_LayoutMaxWidth_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_LayoutMaxWidth_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ActualWidth" localizedName="##CommonProperties_ActualWidth##" datatype="Number" direction="out">
    <title>Actual Width</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>actualWidth</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ActualWidth_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ActualWidth_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ActualHeight" localizedName="##CommonProperties_ActualHeight##" datatype="Number" direction="out">
    <title>Actual Height</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>actualHeight</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ActualHeight_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ActualHeight_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ActualX" localizedName="##CommonProperties_ActualX##" datatype="Number" direction="out">
    <title>Actual X</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>actualX</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ActualX_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ActualX_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ActualY" localizedName="##CommonProperties_ActualY##" datatype="Number" direction="out">
    <title>Actual Y</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>actualY</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ActualY_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ActualY_Tooltip##</appMagic:tooltip>
  </property>
  <property name="ContentLanguage" localizedName="##CommonProperties_ContentLanguage##" datatype="String" defaultValue="">
    <title>ContentLanguage</title>
    <appMagic:category>data</appMagic:category>
    <appMagic:displayName>##CommonProperties_ContentLanguage_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ContentLanguage_Tooltip##</appMagic:tooltip>
  </property>

  <property name="ChildTabPriority" localizedName="##ChildTabPriority##" datatype="Boolean" defaultValue="true">
    <title>Prioritize child controls</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>childTabPriority</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_ChildTabPriority_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_ChildTabPriority_Tooltip##</appMagic:tooltip>
  </property>
  <property name="EnableChildFocus" localizedName="##EnableChildFocus##" datatype="Boolean" defaultValue="true">
    <title>Enable child control focus</title>
    <appMagic:category>design</appMagic:category>
    <appMagic:helperUI>enableChildFocus</appMagic:helperUI>
    <appMagic:displayName>##CommonProperties_EnableChildFocus_DisplayName##</appMagic:displayName>
    <appMagic:tooltip>##CommonProperties_EnableChildFocus_Tooltip##</appMagic:tooltip>
  </property>
</properties>
```

