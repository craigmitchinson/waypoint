# Power Apps Component Framework (PCF) — Manifest Schema Reference & ALM

Verbatim Markdown pulled directly from Microsoft's published documentation source, snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline where the include content was reachable. Source repository: `MicrosoftDocs/powerapps-docs`, folder `powerapps-docs/developer/component-framework/`. This file covers the full ControlManifest.Input.xml element schema (every element documented under Manifest schema reference) plus how code components move through solutions/ALM. Companion file: pcf-01-component-framework.md (the how-to/tutorial pages).

Pages in this file: 25

## Contents

1. [Power Apps component framework manifest schema reference | Microsoft Docs](#power-apps-component-framework-manifest-schema-reference-microsoft-docs)
2. [Code Element | Microsoft Docs](#code-element-microsoft-docs)
3. [control Element | Microsoft Docs](#control-element-microsoft-docs)
4. [CSS Element | Microsoft Docs](#css-element-microsoft-docs)
5. [data-set Element | Microsoft Docs](#data-set-element-microsoft-docs)
6. [dependency Element | Microsoft Docs](#dependency-element-microsoft-docs)
7. [domain element | Microsoft Docs](#domain-element-microsoft-docs)
8. [external-service-usage element | Microsoft Docs](#external-service-usage-element-microsoft-docs)
9. [Event Element | Microsoft Docs](#event-element-microsoft-docs)
10. [feature-usage | Microsoft Docs](#feature-usage-microsoft-docs)
11. [Image Element | Microsoft Docs](#image-element-microsoft-docs)
12. [Manifest Element | Microsoft Docs](#manifest-element-microsoft-docs)
13. [platform-action Element | Microsoft Docs](#platform-action-element-microsoft-docs)
14. [platform-library Element | Microsoft Docs](#platform-library-element-microsoft-docs)
15. [property-dependencies Element | Microsoft Docs](#property-dependencies-element-microsoft-docs)
16. [property-dependency Element | Microsoft Docs](#property-dependency-element-microsoft-docs)
17. [Property Set Element | Microsoft Docs](#property-set-element-microsoft-docs)
18. [Property Element | Microsoft Docs](#property-element-microsoft-docs)
19. [resources Element | Microsoft Docs](#resources-element-microsoft-docs)
20. [Resx Element | Microsoft Docs](#resx-element-microsoft-docs)
21. [Type | Microsoft Docs](#type-microsoft-docs)
22. [Type Group Element | Microsoft Docs](#type-group-element-microsoft-docs)
23. [Types  | Microsoft Docs](#types-microsoft-docs)
24. [uses-feature | Microsoft Docs](#uses-feature-microsoft-docs)
25. [Code components application lifecycle management | MicrosoftDocs](#code-components-application-lifecycle-management-microsoftdocs)

---

## Power Apps component framework manifest schema reference | Microsoft Docs

Source: [index.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/index)

*This section contains reference documentation for manifest schema generated using Microsoft Power Platform CLI.*

# Manifest schema reference

This section contains reference documentation for manifest schema generated using Microsoft Power Platform CLI.

> [!IMPORTANT]
> The **Available for** tab shows which elements are supported by model-driven and canvas apps. It is recommended to check the **Available for** section for each individual property whether it is supported or not. For example, the **code** element is supported for both model-driven and canvas apps, but **html** and **img** properties in **code** elements doesn't support canvas apps.

|Element|Description|Available for|
|----|-----------|-----|
|[code](code.md)|Refers to the path where the resource files are located.|Model-driven and canvas apps|
|[control](control.md)|Defines the component's namespace, version, and display information.|Model-driven and canvas apps|
|[css](css.md)|CSS describes how code components are to be displayed on UI.|Model-driven and canvas apps|
|[data-set](data-set.md)|The dataset node in the component manifest represents a specific, configurable representation of a set of table records.|Model-driven apps|
|[domain](domain.md)|Specifies the domain within the [external-service-usage element](../external-service-usage.md)|Canvas apps|
|[dependency](dependency.md)|Refers to a library in another component that this component depends on.|Model-driven apps|
|[external-service-usage](external-service-usage.md)|Indicates whether this control is using external service or not. If it is, set the enabled attribute flag as true and add the external service domain to the `<domain>` property. A control that uses any external service is a premium control and the end user will need a Power Apps license to open an app with a premium control. More information: [Licensing](../../overview.md#licensing)|Canvas apps|
|[event element](event.md)|Defines a Power FX expression that can be configured within Power Apps Studio, then triggered within the component code.|Canvas apps|
|[feature-usage](feature-usage.md)|The feature-usage element acts as a wrapper around the `uses-feature` elements, which themselves allow developers to declare which features their component wants to use. If there are no uses-feature elements defined, the feature-usage element is not required.|Model-driven apps|
|[img](img.md)|The `img` web resource allows you to add images for the code components.|Model-driven apps|
|[manifest](manifest.md)|Manifest is the metadata file that defines a component. It is an XML document that describes<br/> - The namespace of the component.<br/> - The kind of data it can be configured, either a field or a data-set.<br/> - Any properties that can be configured in the application when the component is added.<br/> - A list of resource files that the component needs.<br/> - One of them must be a JavaScript web resource. This JavaScript must include a function that will instantiate an object. This implements an interface that exposes methods that are required for the component to work. This is called the component implementation library.<br/> - The name of a JavaScript function in the component implementation library that will return an object that applies the required interface.<br/> When someone configures a component in the application, the data in the manifest filters out the available components so that only valid components for the context are available for configuration. The properties defined in the manifest for a component are rendered as configuration fields so that the person configuring the control can specify values. These property values are then available to your component function at run time.|Model-driven and canvas apps|
|[platform-action](platform-action.md)|Used to specify that control dependencies load on demand instead of when the control is loaded.|Model-driven and canvas apps|
|[platform-library](platform-library.md)|The platform library to use as a resource.<br />
This element is used in the [React controls & platform libraries (Preview) ](../../react-controls-platform-libraries.md).|Model-driven and canvas apps|
|[property-dependencies](property-dependencies.md)|Defines a group of property-dependencies.|Canvas apps|
|[property-dependency](property-dependency.md)|A property dependency in the property-dependencies node. Defines dependency between two properties.|Canvas apps|
|[property-set](property-set.md)|Defines an inner configuration within a dataset manifest node to allow you to explicitly configure a column of your dataset against a column of a given type from the table against which the dataset is configured.|Model-driven apps|
|[property](property.md)|The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.|Model-driven and canvas apps|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|Model-driven and canvas apps|
|[resx](resx.md)|The resx webresource is used to manage the localized strings you define.|Model-driven and canvas apps|
|[type](type.md)|The type in the type-group node defines the data type.|Model-driven apps|
|[type-group](type-group.md)|The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.|Model-driven and canvas apps|
|[types](types.md)||Model-driven and canvas apps|
|[uses-feature](uses-feature.md)|Indicates which feature the code components want to use.|Model-driven apps|


### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## Code Element | Microsoft Docs

Source: [code.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/code)

*Refers to the path where the resource files are located.*

# code element

Refers to the path where the resource files are located.

## Available for

Model-driven and canvas apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-----|
|`path`|Place where the resource files are located|`String`|Yes|Model-driven and canvas apps |
|`order`|The order in which the resource files should load|`Positive integer`|Yes|Model-driven and canvas apps |

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|

### Example

```XML
<code path="TS_IncrementControl.js" order="1" />
       <css path="css/TS_IncrementControl.css" order="1" />
      <resx path="strings/TSIncrementControl.1033.resx" version="1.0.0" />
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## control Element | Microsoft Docs

Source: [control.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/control)

*Defines the component's namespace, version, and display information.*

# control element

Defines the component's namespace, version, and display information.

## Available for

Model-driven and canvas apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|--------|
|`namespace`|Defines the object prototype of the component|Only letters or numbers|Yes|Model-driven and canvas apps |
|`constructor`|A method for initializing the object|Only letters or numbers|Yes|Model-driven and canvas apps |
|`control-type`|Whether the control is a standard control or a React control. The value of `virtual` indicates a React control using platform React library. Virtual controls are a feature in public preview. More information: [React controls & platform libraries](../react-controls-platform-libraries.md)|`standard`|`virtual`|No|Model-driven and canvas apps |
|`description-key`|Defines the description of the component visible in the UI.|`string`|No|Model-driven and canvas apps |
|`display-name-key`|Defines the name of the control visible in the UI.|`string`|Yes|Model-driven and canvas apps  | 
|`preview-image`|Image used on the customization screens to show a preview of the component.|`string`|No|Model-driven apps|
|`version`|Defines the version of the component defined in [Semantic Versioning](https://semver.org)|`string`|Yes|Model-driven and canvas apps |
<!--|`hidden`|Defines whether the component should be hidden or not|`true` or `false`| No|Model-driven apps|-->

## Parent Elements

|Element|Description|
|--|--|
|[manifest](manifest.md)|Manifest is the metadata file that defines a component. It is an `XML` file that describes:

- The namespace of the component.
- The kind of data it can be configured, either a field or a dataset.
- Any properties that can be configured in the application when the component is added.
- A list of resource files that the component needs. 
  - One of them must be a TypeScript web resource. This TypeScript must include a function that will instantiate an object. This implements an interface that exposes methods that are required for the component to work. This is called the component implementation library.
- The name of a TypeScript function in the component implementation library that will return an object that applies the required component interface.

When the user configures a custom component in a canvas app or a model-driven app, the data in the manifest filters out the available components so that only the valid components for the context are available for configuration. The properties defined in the manifest for a component are rendered as configuration fields so that the user configuring the component can specify values. These property values are then available to the component function at run time.|

## Child Elements

|Element|Description|Occurrences|
|--|--|--|
|[data-set](data-set.md)|The dataset node in the component manifest represents a specific, configurable representation of a set of table records.|0 or more|
|[external-service-usage](external-service-usage.md)|Indicates whether this control is using external service or not. If it is, set the enabled attribute flag as true and add the external service domain to the `<domain>` property. A control that uses any external service is a premium control and the end user will need a Power Apps license to open an app with a premium control. More information: [Licensing](../../overview.md#licensing)|0 or 1|
|[property](property.md)|The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.|0 or more|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|1|
|[type-group](type-group.md)|The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.|0 or more|
|[property-dependencies](property-dependencies.md)|Defines a group of property-dependencies.|0 or more|
|[platform-action](platform-action.md)|Used to specify that control dependencies load on demand instead of when the control is loaded.|0 or 1|

## Example

```xml
<control namespace="MyNameSpace"
   constructor="JSHelloWorldControl"
   version="1.0.0"
   display-name-key="JS_HelloWorldControl_Display_Key"
   description-key="JS_HelloWorldControl_Desc_Key"
   control-type="standard"
   preview-image="img/preview.png">
</control>
  ```

### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## CSS Element | Microsoft Docs

Source: [css.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/css)

*CSS describes how code components are to be displayed on UI.*

# css element

CSS describes how code components are to be displayed on UI.

## Available for

Model-driven and canvas apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-----|
|`path`|Relative path w.r.t manifest where CSS files are located|`string`|Yes|Model-driven and canvas apps |
|`order`|The order in which the CSS files Should load|`Positive integer`|Optional|Model-driven and canvas apps |

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|

## Example

```xml
<resources>
  <code path="TS_LocalizationAPI.js" order="1" />
   <css path="css/TS_LocalizationAPI.css" order="1" />
 </resources>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## data-set Element | Microsoft Docs

Source: [data-set.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/data-set)

*The data-set node in the component manifest represents a specific, configurable representation of a set of table records.*

# data-set element

The dataset node in the component manifest represents a specific, configurable representation of a set of table records.

You can define multiple datasets in the manifest. The first dataset in the manifest is as the primary dataset. When you configure a multi dataset component, the primary dataset property always has name `Items`. All nonprimary dataset properties will have a `_Items` suffix after the dataset name.

Certain features in the authoring panel only apply to the primary dataset properties, such as data source selector, field selector, and view selector. To configure a nonprimary dataset property, the maker needs to first import the data source to the app, then set the property value to that secondary data source. Property-set should be used for accessing columns in a nonprimary dataset property. 

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-------|
|`description-key`|Defines the description of the property.|`string`|Optional|Model-driven and canvas apps|
|`display-name-key`|Defines the name of the property.|`string`|Yes|Model-driven and canvas apps|
|`name`|Name of the grid|`string`|Yes|Model-driven and canvas apps|
|`cds-data-set-options`|Displays the `Commandbar`, `ViewSelector`, `QuickFind` if set to true |`string`|Yes|Model-driven apps|

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|


## Example

```xml
<data-set name="dataSetGrid"
   display-name-key="DataSetGridProperty"
   cds-data-set-options="displayCommandBar:true;displayViewSelector:true;displayQuickFind:true">
</data-set>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## dependency Element | Microsoft Docs

Source: [dependency.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/dependency)

*Refers to a library in another component that this component depends on.*

# dependency element

Refers to a library in another component that this component depends on.

## Available for

Model-driven apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-----|
|`type`|Set to `control`|`String`|Yes|Model-driven apps |
|`name`|The schema name name of the library component|`String`|Yes|Model-driven  apps |
|`order`|The order in which the dependent library should load|`Positive integer`|No|Model-driven  apps |
|`load-type`|Set to `onDemand`|`String`|No|Model-driven  apps |

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|

### Example

```XML
<dependency 
   type="control" 
   name="samples_SampleNS.SampleStubLibraryPCF" 
   load-type="onDemand"/>
```

### Related articles

[Dependent Libraries (preview)](../dependent-libraries.md)   
[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## domain element | Microsoft Docs

Source: [domain.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/domain)

*Indicates the domain that the external-usage-element applies to.*

# domain Element

Specifies the domain within the [external-service-usage element](../external-service-usage.md)

## Available for

Canvas apps

## Parent Elements

|Element|Description|
|--|--|
|[external-service-usage](external-service-usage.md)|Indicates whether this control is using external service or not. If it is, set the enabled attribute flag as true and add the external service domain to the `<domain>` property. A control that uses any external service is a premium control and the end user will need a Power Apps license to open an app with a premium control. More information: [Licensing](../../overview.md#licensing)|

## Example

```xml
<external-service-usage enabled="true">
   <domain>www.Microsoft.com</domain>
</external-service-usage>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## external-service-usage element | Microsoft Docs

Source: [external-service-usage.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/external-service-usage)

*Indicates whether this control is using external service or not.*

# external-service-usage element

Indicates whether this control is using external service or not. If it is, set the enabled attribute flag as true and add the external service domain to the `<domain>` property. A control that uses any external service is a premium control and the end user will need a Power Apps license to open an app with a premium control. More information: [Licensing](../../overview.md#licensing)

## Available for

Canvas apps

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

## Child Elements


|Element|Description|Occurrences|Available for|
|--|--|--|-------|
|[domain](domain.md)|Specifies the domain within the [external-service-usage element](../external-service-usage.md)|0 or more|Canvas apps |


## Example 1

External usage enabled for www.microsoft.com only.

```xml
<external-service-usage enabled="true">
   <domain>www.Microsoft.com</domain>
</external-service-usage>
```

## Example 2

External usage enabled for multiple domains.

```xml
<external-service-usage enabled="false">
  <domain>www.contoso.com</domain>
  <domain>www.yourcompany.com</domain>
</external-service-usage>
```

## Example 3

External usage isn't enabled.

```xml
<external-service-usage enabled="false" />
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Event Element | Microsoft Docs

Source: [event.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/event)

*Defines a Power FX expression that can be configured within Power Apps Studio, then triggered within the component code.*

# event element

Defines a Power FX expression that can be configured within Power Apps Studio, then triggered within the component code.

## Available for

Canvas and model-driven apps

## Properties

|Name |Description |Type |Required | Available for|
|------|------|------|-------|------------|
|`name` |Name of the event |`string` |Yes |Canvas and model-driven apps|
|`display-name-key` |Used in the customization screens as localized strings that describe the name of the event. |`string` |Yes |Canvas apps|
|`description-key` |Used in the customization screens as localized strings that describe the description of the event. |`string` |Optional |Canvas apps|
|`pfx-default-value` |The default Power Fx expression value provided to the component. |See [Remarks](#remarks) |Optional |Canvas apps|

### Remarks

Use the `pfx-default-value` property value to evaluate events and properties using Power Fx expressions instead of static default values. You can use this to:

- Responsively size the control
- Access connectors
- Provide sample data
- Reference theme properties
- Custom events

> [!NOTE]
> - You can use any Power Fx expression, but you must make sure the expression is valid when importing the control.
> - If you use inner quotes or other special characters, wrap the value in single quotes, For example: `pfx-default-value='"Test"'`
> - You can reference other controls (including screens) and their properties. Write these references as: `%ControlName.ID%.ControlProperty`. For example: `pfx-default-value='SubmitForm(%MyFormName.ID%)'`
> - Write enums, like `DisplayType` and `ScreenTransition`  as: `%EnumName.RESERVED%.EnumValue`. For example: `pfx-default-value='Back(%ScreenTransition.RESERVED%.Cover)'`
> - If `pfx-default-value` is included, then it takes precedence over `default-value`.

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

## Example

```xml
<event name="OnSelectCustomButton"
   pfx-default-value='SubmitForm(%MyFormName.ID%); Back(%ScreenTransition.RESERVED%.Cover)'
   display-name-key="OnSelectCustomButton_Display_Key"
   description-key="OnSelectCustomButton_Desc_Key" />
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## feature-usage | Microsoft Docs

Source: [feature-usage.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/feature-usage)

*The feature-usage element acts as a wrapper around the uses-feature elements, which themselves allow developers to declare which features their component wants to use.*

# feature-usage element

The feature-usage element acts as a wrapper around the `uses-feature` elements, which themselves allow developers to declare which features their component wants to use. If there are no uses-feature elements defined, the feature-usage element is not required.

## Available for

Model-driven apps

## Parent Element

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

## Child Element

|Element|Description|Available for|
|--|--|-----|
|[uses-feature](uses-feature.md)|Indicates which feature the code components want to use.|Model-driven apps|


## Example

```XML
<feature-usage>
    <uses-feature name="Device.captureAudio" required="true" />
    <uses-feature name="Device.captureImage" required="true" />
    <uses-feature name="Device.captureVideo" required="true" />
    <uses-feature name="Device.getBarcodeValue" required="true" />
    <uses-feature name="Device.getCurrentPosition" required="true" />
    <uses-feature name="Device.pickFile" required="true" />
    <uses-feature name="Utility" required="true" />
    <uses-feature name="WebAPI" required="true" />
 </feature-usage>
```

---

## Image Element | Microsoft Docs

Source: [img.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/img)

*The img web resource allows you to add images for the code components.*

# img element

The `img` web resource allows you to add images for the code components.

## Available for

Model-driven apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-------|
|`path`|Relative path w.r.t manifest where the image files are located|`string`|Yes|Model-driven apps|

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|


### Example

```XML
<resources>
   <code path="index.ts" order="1" />
     <img path="img/default.png" />
 </resources>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Manifest Element | Microsoft Docs

Source: [manifest.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/manifest)

*Manifest is the metadata file that defines a component.*

# Manifest element

Manifest is the metadata file that defines a component. It is an `XML` file that describes:

- The namespace of the component.
- The kind of data it can be configured, either a field or a dataset.
- Any properties that can be configured in the application when the component is added.
- A list of resource files that the component needs. 
  - One of them must be a TypeScript web resource. This TypeScript must include a function that will instantiate an object. This implements an interface that exposes methods that are required for the component to work. This is called the component implementation library.
- The name of a TypeScript function in the component implementation library that will return an object that applies the required component interface.

When the user configures a custom component in a canvas app or a model-driven app, the data in the manifest filters out the available components so that only the valid components for the context are available for configuration. The properties defined in the manifest for a component are rendered as configuration fields so that the user configuring the component can specify values. These property values are then available to the component function at run time.

## Available for

Model-driven and canvas apps

## Child Elements

|Element|Description|Occurrences|Available for|
|--|--|--|-------|
|[control](control.md)|Defines the component's namespace, version, and display information.|1|Model-driven and canvas apps |

<!-- IDK why these were listed as child elements. -->
<!-- |[type-group](type-group.md)|The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.|0 or more|Model-driven and canvas apps |
|[property](property.md)|The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.|0 or more|Model-driven and canvas apps |
|[data-set](data-set.md)|The dataset node in the component manifest represents a specific, configurable representation of a set of table records.|0 or more|Model-driven apps|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|1 or more|Model-driven and canvas apps |
|[feature-usage](feature-usage.md)|The feature-usage element acts as a wrapper around the `uses-feature` elements, which themselves allow developers to declare which features their component wants to use. If there are no uses-feature elements defined, the feature-usage element is not required.|0 or more|Model-driven and canvas apps | -->

## Example

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
   <control namespace="MyNameSpace"
      constructor="JSHelloWorldControl"
      version="1.0.0"
      display-name-key="JS_HelloWorldControl_Display_Key"
      description-key="JS_HelloWorldControl_Desc_Key"
      control-type="standard">
      <property name="myFirstProperty"
         display-name-key="myFirstProperty_Display_Key"
         description-key="myFirstProperty_Desc_Key"
         of-type="SingleLine.Text"
         usage="bound"
         required="true" />
      <resources>
         <code path="JS_HelloWorldControl.js"
            order="1" />
         <css path="css/JS_HelloWorldControl.css"
            order="1" />
      </resources>
   </control>
</manifest>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## platform-action Element | Microsoft Docs

Source: [platform-action.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/platform-action)

*Used to specify that control dependencies load on demand instead of when the control is loaded.*

# platform-action element

Used to specify that control dependencies load on demand instead of when the control is loaded.

## Available for

Model-driven apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|--------|
|`action-type`| Set to `afterPageLoad` | string | No | Model-driven apps|

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

### Example

```XML
<platform-action action-type="afterPageLoad" />
```

### Related articles

[Dependent Libraries (preview)](../dependent-libraries.md)   
[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## platform-library Element | Microsoft Docs

Source: [platform-library.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/platform-library)

*Platform library resources used in the component.*

# platform-library element

The platform library to use as a resource.<br />
This element is used in the [React controls & platform libraries (Preview) ](../../react-controls-platform-libraries.md).

## Available for

Model-driven and canvas apps

## Attributes

|Name|Description|Type|Required|Available for|
|--|--|--|--|-------|
|`name`|Either `React` or `Fluent`.|`string`|Yes|Model-driven and canvas apps|
|`version`|The current version of the platform library|`string`|Yes|Model-driven and canvas apps|

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|


## Example

```xml
<resources>
   <code path="index.ts" order="1" />
   <platform-library name="React" version="16.14.0" />
   <platform-library name="Fluent" version="9.46.2" />
</resources>
```

### Related articles

[React controls & platform libraries](../react-controls-platform-libraries.md)<br />
[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## property-dependencies Element | Microsoft Docs

Source: [property-dependencies.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property-dependencies)

*Defines a group of property-dependencies.*

# property-dependencies element

Defines a group of property-dependencies.

## Available for

Canvas apps

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

## Child Elements

|Element|Description|Occurrences|Available for|
|--|--|--|-------|
|[property-dependency](property-dependency.md)|A property dependency in the property-dependencies node. Defines dependency between two properties.|1 or more|Canvas apps |

### Example

```XML
<property-dependencies>
   <property-dependency input="Text" output="Photos" required-for="schema" />
</property-dependencies>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## property-dependency Element | Microsoft Docs

Source: [property-dependency.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property-dependency)

*A property dependency in the property-dependencies node. Defines dependency between two properties.*

# property-dependency element

A property dependency in the property-dependencies node. Defines dependency between two properties.

## Available for

Canvas apps

## Parameters

|Name|Description|Type|Required|Available for|
|--|--|--|--|-----|
|`input`|The name of the input property.|string|yes|Canvas apps|
|`output`|The name of the output property.|string|yes|Canvas apps|
|`required-for`|Helps identify the property dependency requirement. Currently, the only supported value is `schema`. |string|yes|Canvas apps|

## Parent Elements

|Element|Description|
|--|--|
|[property-dependencies](property-dependencies.md)|Defines a group of property-dependencies.|

### Example

```XML
<property-dependencies>
   <property-dependency input="Text" output="Photos" required-for="schema" />
</property-dependencies>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Property Set Element | Microsoft Docs

Source: [property-set.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property-set)

*Defines an inner configuration within a dataset manifest node to allow you to explicitly configure a column of your dataset against a column of a given type from the table against which the dataset is configured.*

# property-set element

Defines an inner configuration within a dataset manifest node to allow you to explicitly configure a column of your dataset against a column of a given type from the table against which the dataset is configured.

## Available for

Model-driven and canvas apps

## Properties

|Name |Description |Type |Required |Available for|
|----- |------ |------ |---------- |-------------|
|name | Name of the column. |string |Yes |Model-driven and canvas apps|
|display-name-key  | Used in customization screens as localized strings that describe the name of the property. |string |Yes |Model-driven and canvas apps|
|description-key |Used in customization screens as localized strings that describe the description of the property. |string |Optional |Model-driven apps|
|of-type |Defines the data type of the property |See [Remarks](#remarks) |Optional |Model-driven apps|
|required|Indicates whether the property is required or not.|boolean |Optional |Model-driven apps|
|of-type-group |Name of the type-group as defined in manifest. |string|Optional |Model-driven apps|
|usage |The usage property identifies if the property is meant to represent a table column that the component can change (bound) or read-only values (input). |bound or input |Yes |Model-driven apps|

## Parent Elements

|Element|Description|
|--|--|
|[dataset](data-set.md)|The dataset node in the component manifest represents a specific, configurable representation of a set of table records.|

## Child Elements

|Element|Description|Occurrences|
|--|--|--|
|[types](types.md)||0 or more|

### Remarks

The `of-type` attribute value must be one of the following:

|Value |Description |Available for |
|--|--|--|
|Currency|Monetary values between -922,337,203,685,477 and 922,337,203,685,477 can be in this column.|Model-driven and canvas apps|
|DateAndTime.DateAndTime|Displays date and time.|Model-driven and canvas apps|
|DateAndTime.DateOnly|Displays date only.|Model-driven and canvas apps|
|Decimal|Up to 10 decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Enum|Enumerated data type.|Model-driven and canvas apps|
|FP|Up to five decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Lookup.Simple|Allows for a single reference to a specific table. All custom lookups are this type.|Model-driven apps|
|Multiple|This column can contain up to 1,048,576 text characters.|Model-driven and canvas apps|
|MultiSelectOptionSet|You can customize forms (main, quick create, and quick view) and email templates by adding choices columns. When you add choices column, you can specify multiple values that are available for users to select. When users fill out the form they can select one, multiple, or all the values displayed in a drop-down list.|Model-driven and canvas apps|
|Object|Object data type. Can only be used with output properties. |Model-driven and canvas apps|
|OptionSet|This column provides a set of options. Each option has a number value and label. When added to a form, this column displays a control for users to select only one option. |Model-driven and canvas apps|
|SingleLine.Email|This stores the string time in the format valid for Emails. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Phone|This stores the string time in the format valid for Phone. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Text|This option simply displays text.|Model-driven and canvas apps|
|SingleLine.TextArea|This format option can be used to display multiple lines of text. But with a limit of 4000 characters, the Multiple Lines of Text column is a better choice if large amounts of text are expected.|Model-driven and canvas apps|
|SingleLine.Ticker|This stores the string time in the format valid for Ticker. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.URL|The text expected to provide a hyperlink to open the page specified. Out-of-the-box Unified Interface controls automatically prepend "https://" to input values that doesn't begin with a valid protocol. Only HTTP, HTTPS, FTP, FTPS, OneNote and TEL protocols are expected in this column. |Model-driven and canvas apps|
|TwoOptions|This column provides two options. Each option has a number value of 0 or 1 corresponding to a false or true value. Each option also has a label so that true or false values can be represented as "Yes" and "No", "Hot" and "Cold", "On" and "Off" or any pair of labels you want to display.|Model-driven and canvas apps|
|Whole.None|This option simply displays a number.|Model-driven and canvas apps|

> [!WARNING]
> If the `manifest.xml` file contains at least one dataset, then properties of type `Lookup.Simple` should be also wrapped into the [data-set](./../data-set.md) element.

#### Value elements that aren't supported

Following `of-type` property values aren't supported currently:

|Value|Description|
|-----|-----|
|Lookup.Customer|Allows for a single reference to either an account or a contact record. These lookups are available for the Opportunity, Case, Quote, Order, and Invoice tables. These tables also have separate Account and Contact lookups that you can use if your customers are always one type. Or you can include both instead of using the Customer lookup.|
|Lookup.Owner|Allows for a single reference to either a team or a user record. All team or user-owned tables have one of these.|
|Lookup.PartyList|Allows for multiple references to multiple tables. These lookups are found on the Email table **To** and **Cc** columns. They're also used in the Phone and Appointment tables.|
|Lookup.Regarding|Allows for a single reference to multiple tables. These lookups are found in the regarding column used in activities.|
|Status Reason|A system column that has options that provide more detail about the Status column. Each option is associated with one of the available Status options. You can add and edit the options.|
|Status|A system column that has options that generally correspond to active and inactive status. Some system columns have more options, but all custom columns have only Active and Inactive status options.|
|Whole.Duration|This format option can be used to display a list of duration options. But the data stored in the database is always a number of minutes. The column looks like a drop-down list and provides suggested options like 1 minute, 15 minutes, 30 minutes all the way up to three days. People can choose these options. However, people can also just type in a number of minutes and it resolves to that period of time.|
|Whole.Language|This option displays a list of the languages provisioned for your organization. The values are displayed as a drop-down list of language names, but the data is stored as a number using LCID codes. Language codes are four-digit or five-digit locale IDs. Valid locale ID values can be found at [Locale ID (LCID) Chart)](/previous-versions/windows/embedded/ms912047(v=winembedded.10)).|
|Whole.TimeZone|This option displays a select list of time zones such as (GMT-12:00) International Date Line West and (GMT-08:00) Pacific Time (US & Canada). Each of these zones is stored as a number. For example, for the time zone (GMT-08:00) Pacific Time (US & Canada), the TimeZoneCode is 4.|

> [!NOTE]
> At this time File columns are not supported. More information: [File columns](../../../../maker/data-platform/types-of-fields.md#file-columns)

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Property Element | Microsoft Docs

Source: [property.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property)

*The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.*

# property element

The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.

## Available for

Model-driven and canvas apps

## Properties

|Name |Description |Type |Required | Available for|
|------|------|------|-------|------------|
|default-value |The default configuration value provided to the component. In model-driven apps, this property is only allowed on inputs since the bound parameters expect to have a column associated. |string |Optional |Model-driven apps|
|description-key |Used in the customization screens as localized strings that describes the description of the property. |string |Optional |Model-driven and canvas apps|
|display-name-key |Used in the customization screens as localized strings that describes the name of the property. |string |Yes |Model-driven apps|
|name |Name of the property |string |Yes |Model-driven and canvas apps|
|of-type-group |Name of the type-group as defined in manifest| string |Optional |Model-driven apps|
|of-type| Defines the data type of the property| See [Using of-type](#using-of-type)|Optional|Model-driven and canvas apps|
|pfx-default-value |The default PFX expression value provided to the component. |See [Using pfx-default-value](#using-pfx-default-value) |Optional |Canvas apps|
|required |Whether the property is required or not |boolean |Optional |Model-driven apps|
|usage |The usage property identifies if the property is meant to represent a column that the component can change (bound), read-only (input) or output values|bound, input or output |Yes|Model-driven apps|

### Remarks

This section contains guidance about using the Property element attributes.

#### Using of-type

The `of-type` property value must be one of the following:

|Value |Description |Available for |
|--|--|--|
|Currency|Monetary values between -922,337,203,685,477 and 922,337,203,685,477 can be in this column.|Model-driven and canvas apps|
|DateAndTime.DateAndTime|Displays date and time.|Model-driven and canvas apps|
|DateAndTime.DateOnly|Displays date only.|Model-driven and canvas apps|
|Decimal|Up to 10 decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Enum|Enumerated data type.|Model-driven and canvas apps|
|FP|Up to five decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Lookup.Simple|Allows for a single reference to a specific table. All custom lookups are this type.|Model-driven apps|
|Multiple|This column can contain up to 1,048,576 text characters.|Model-driven and canvas apps|
|MultiSelectOptionSet|You can customize forms (main, quick create, and quick view) and email templates by adding choices columns. When you add choices column, you can specify multiple values that are available for users to select. When users fill out the form they can select one, multiple, or all the values displayed in a drop-down list.|Model-driven and canvas apps|
|Object|Object data type. Can only be used with output properties. |Model-driven and canvas apps|
|OptionSet|This column provides a set of options. Each option has a number value and label. When added to a form, this column displays a control for users to select only one option. |Model-driven and canvas apps|
|SingleLine.Email|This stores the string time in the format valid for Emails. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Phone|This stores the string time in the format valid for Phone. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Text|This option simply displays text.|Model-driven and canvas apps|
|SingleLine.TextArea|This format option can be used to display multiple lines of text. But with a limit of 4000 characters, the Multiple Lines of Text column is a better choice if large amounts of text are expected.|Model-driven and canvas apps|
|SingleLine.Ticker|This stores the string time in the format valid for Ticker. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.URL|The text expected to provide a hyperlink to open the page specified. Out-of-the-box Unified Interface controls automatically prepend "https://" to input values that doesn't begin with a valid protocol. Only HTTP, HTTPS, FTP, FTPS, OneNote and TEL protocols are expected in this column. |Model-driven and canvas apps|
|TwoOptions|This column provides two options. Each option has a number value of 0 or 1 corresponding to a false or true value. Each option also has a label so that true or false values can be represented as "Yes" and "No", "Hot" and "Cold", "On" and "Off" or any pair of labels you want to display.|Model-driven and canvas apps|
|Whole.None|This option simply displays a number.|Model-driven and canvas apps|

> [!WARNING]
> If the `manifest.xml` file contains at least one dataset, then properties of type `Lookup.Simple` should be also wrapped into the [data-set](./../data-set.md) element.

#### Value elements that aren't supported

Following `of-type` property values aren't supported currently:

|Value|Description|
|-----|-----|
|Lookup.Customer|Allows for a single reference to either an account or a contact record. These lookups are available for the Opportunity, Case, Quote, Order, and Invoice tables. These tables also have separate Account and Contact lookups that you can use if your customers are always one type. Or you can include both instead of using the Customer lookup.|
|Lookup.Owner|Allows for a single reference to either a team or a user record. All team or user-owned tables have one of these.|
|Lookup.PartyList|Allows for multiple references to multiple tables. These lookups are found on the Email table **To** and **Cc** columns. They're also used in the Phone and Appointment tables.|
|Lookup.Regarding|Allows for a single reference to multiple tables. These lookups are found in the regarding column used in activities.|
|Status Reason|A system column that has options that provide more detail about the Status column. Each option is associated with one of the available Status options. You can add and edit the options.|
|Status|A system column that has options that generally correspond to active and inactive status. Some system columns have more options, but all custom columns have only Active and Inactive status options.|
|Whole.Duration|This format option can be used to display a list of duration options. But the data stored in the database is always a number of minutes. The column looks like a drop-down list and provides suggested options like 1 minute, 15 minutes, 30 minutes all the way up to three days. People can choose these options. However, people can also just type in a number of minutes and it resolves to that period of time.|
|Whole.Language|This option displays a list of the languages provisioned for your organization. The values are displayed as a drop-down list of language names, but the data is stored as a number using LCID codes. Language codes are four-digit or five-digit locale IDs. Valid locale ID values can be found at [Locale ID (LCID) Chart)](/previous-versions/windows/embedded/ms912047(v=winembedded.10)).|
|Whole.TimeZone|This option displays a select list of time zones such as (GMT-12:00) International Date Line West and (GMT-08:00) Pacific Time (US & Canada). Each of these zones is stored as a number. For example, for the time zone (GMT-08:00) Pacific Time (US & Canada), the TimeZoneCode is 4.|

> [!NOTE]
> At this time File columns are not supported. More information: [File columns](../../../../maker/data-platform/types-of-fields.md#file-columns)

#### Using pfx-default-value

Use the `pfx-default-value` property value to evaluate events and properties using Power Fx expressions instead of static default values. You can use this to:

- Responsively size the control
- Access connectors
- Provide sample data
- Reference theme properties
- Custom events

> [!NOTE]
> - You can use any Power Fx expression, but you must make sure the expression is valid when importing the control.
> - If you use inner quotes or other special characters, wrap the value in single quotes, For example: `pfx-default-value='"Test"'`
> - You can reference other controls (including screens) and their properties. Write these references as: `%ControlName.ID%.ControlProperty`. For example: `pfx-default-value='SubmitForm(%MyFormName.ID%)'`
> - Write enums, like `DisplayType` and `ScreenTransition`  as: `%EnumName.RESERVED%.EnumValue`. For example: `pfx-default-value='Back(%ScreenTransition.RESERVED%.Cover)'`
> - If `pfx-default-value` is included, then it takes precedence over `default-value`.

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|


## Example

```xml
<property name="myFirstProperty" display-name-key="myFirstProperty_Display_Key"
description-key="myFirstProperty_Desc_Key" of-type="SingleLine.Text" usage="bound" required="true" />
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## resources Element | Microsoft Docs

Source: [resources.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/resources)

*The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.*

# resources element

The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.

## Available for

Model-driven and canvas apps

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|

## Child Elements

|Element|Description|Occurrences|
|--|--|--|
|[code](code.md)|Refers to the path where the resource files are located.|1|
|[css](css.md)|CSS describes how code components are to be displayed on UI.|0 or more|
|[img](img.md)|The `img` web resource allows you to add images for the code components.|0 or more|
|[resx](resx.md)|The resx webresource is used to manage the localized strings you define.|0 or more|
|[platform-library](platform-library.md)|The platform library to use as a resource.<br />
This element is used in the [React controls & platform libraries (Preview) ](../../react-controls-platform-libraries.md).|0 or more|
|[dependency](dependency.md)|Refers to a library in another component that this component depends on.|0 or more|


## Example

```xml
<resources>
  <code path="JS_HelloWorldControl.js" order="1" />
    <css path="css/JS_HelloWorldControl.css" order="1" />
</resources>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## Resx Element | Microsoft Docs

Source: [resx.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/resx)

*The resx web resource is used to manage the localized strings you define.*

# resx element

The resx webresource is used to manage the localized strings you define.

## Available for

Model-driven and canvas apps

## Parameters

|Name|Description|Type|Required|
|--|--|--|--|
|`path`|Relative path w.r.t manifest where resx files are located|`string`|Yes|
|`version`|The current version of the resx file|`string`|Yes|

## Parent Elements

|Element|Description|
|--|--|
|[resources](resources.md)|The resources node in the component manifest refers to the resource files that component requires to implement it's visualization.|

## Example

```xml
<resources>
      <code path="TS_LocalizationAPI.js" order="1" />
       <css path="css/TS_LocalizationAPI.css" order="1" />
      <resx path="strings/TSLocalizationAPI.1033.resx" version="1.0.0" />
      <resx path="strings/TSLocalizationAPI.1035.resx" version="1.0.0" />
      <resx path="strings/TSLocalizationAPI.3082.resx" version="1.0.0" />
    </resources>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Type | Microsoft Docs

Source: [type.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/type)

*The type in the type-group node defines the data type in Microsoft Dataverse.*

# type

The type in the type-group node defines the data type.

## Available for

Model-driven apps

## Parent Elements

|Element|Description|
|--|--|
|[type-group](type-group.md)|The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.|

## Value element

This element contains a `string` with one of the following values:

|Value |Description |Available for |
|--|--|--|
|Currency|Monetary values between -922,337,203,685,477 and 922,337,203,685,477 can be in this column.|Model-driven and canvas apps|
|DateAndTime.DateAndTime|Displays date and time.|Model-driven and canvas apps|
|DateAndTime.DateOnly|Displays date only.|Model-driven and canvas apps|
|Decimal|Up to 10 decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Enum|Enumerated data type.|Model-driven and canvas apps|
|FP|Up to five decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column.|Model-driven and canvas apps|
|Lookup.Simple|Allows for a single reference to a specific table. All custom lookups are this type.|Model-driven apps|
|Multiple|This column can contain up to 1,048,576 text characters.|Model-driven and canvas apps|
|MultiSelectOptionSet|You can customize forms (main, quick create, and quick view) and email templates by adding choices columns. When you add choices column, you can specify multiple values that are available for users to select. When users fill out the form they can select one, multiple, or all the values displayed in a drop-down list.|Model-driven and canvas apps|
|Object|Object data type. Can only be used with output properties. |Model-driven and canvas apps|
|OptionSet|This column provides a set of options. Each option has a number value and label. When added to a form, this column displays a control for users to select only one option. |Model-driven and canvas apps|
|SingleLine.Email|This stores the string time in the format valid for Emails. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Phone|This stores the string time in the format valid for Phone. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.Text|This option simply displays text.|Model-driven and canvas apps|
|SingleLine.TextArea|This format option can be used to display multiple lines of text. But with a limit of 4000 characters, the Multiple Lines of Text column is a better choice if large amounts of text are expected.|Model-driven and canvas apps|
|SingleLine.Ticker|This stores the string time in the format valid for Ticker. Out-of-the-box Unified Interface controls automatically make them clickable links.|Model-driven and canvas apps|
|SingleLine.URL|The text expected to provide a hyperlink to open the page specified. Out-of-the-box Unified Interface controls automatically prepend "https://" to input values that doesn't begin with a valid protocol. Only HTTP, HTTPS, FTP, FTPS, OneNote and TEL protocols are expected in this column. |Model-driven and canvas apps|
|TwoOptions|This column provides two options. Each option has a number value of 0 or 1 corresponding to a false or true value. Each option also has a label so that true or false values can be represented as "Yes" and "No", "Hot" and "Cold", "On" and "Off" or any pair of labels you want to display.|Model-driven and canvas apps|
|Whole.None|This option simply displays a number.|Model-driven and canvas apps|

> [!WARNING]
> If the `manifest.xml` file contains at least one dataset, then properties of type `Lookup.Simple` should be also wrapped into the [data-set](./../data-set.md) element.

#### Value elements that aren't supported

Following `of-type` property values aren't supported currently:

|Value|Description|
|-----|-----|
|Lookup.Customer|Allows for a single reference to either an account or a contact record. These lookups are available for the Opportunity, Case, Quote, Order, and Invoice tables. These tables also have separate Account and Contact lookups that you can use if your customers are always one type. Or you can include both instead of using the Customer lookup.|
|Lookup.Owner|Allows for a single reference to either a team or a user record. All team or user-owned tables have one of these.|
|Lookup.PartyList|Allows for multiple references to multiple tables. These lookups are found on the Email table **To** and **Cc** columns. They're also used in the Phone and Appointment tables.|
|Lookup.Regarding|Allows for a single reference to multiple tables. These lookups are found in the regarding column used in activities.|
|Status Reason|A system column that has options that provide more detail about the Status column. Each option is associated with one of the available Status options. You can add and edit the options.|
|Status|A system column that has options that generally correspond to active and inactive status. Some system columns have more options, but all custom columns have only Active and Inactive status options.|
|Whole.Duration|This format option can be used to display a list of duration options. But the data stored in the database is always a number of minutes. The column looks like a drop-down list and provides suggested options like 1 minute, 15 minutes, 30 minutes all the way up to three days. People can choose these options. However, people can also just type in a number of minutes and it resolves to that period of time.|
|Whole.Language|This option displays a list of the languages provisioned for your organization. The values are displayed as a drop-down list of language names, but the data is stored as a number using LCID codes. Language codes are four-digit or five-digit locale IDs. Valid locale ID values can be found at [Locale ID (LCID) Chart)](/previous-versions/windows/embedded/ms912047(v=winembedded.10)).|
|Whole.TimeZone|This option displays a select list of time zones such as (GMT-12:00) International Date Line West and (GMT-08:00) Pacific Time (US & Canada). Each of these zones is stored as a number. For example, for the time zone (GMT-08:00) Pacific Time (US & Canada), the TimeZoneCode is 4.|

> [!NOTE]
> At this time File columns are not supported. More information: [File columns](../../../../maker/data-platform/types-of-fields.md#file-columns)

### Example for Enum type

```XML
<property name="YesNo" display-name-key="YesNo_Display_Key" description-key="YesNo_Desc_Key" of-type="Enum" usage="input" required="false">
      <value name="Yes" display-name-key="Yes">0</value>
      <value name="No" display-name-key="No">1</value>
</property>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Type Group Element | Microsoft Docs

Source: [type-group.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/type-group)

*The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.*

# type-group element

The type-group node defines a set of types identified by a single name. This information can be used to identify the data types supported by a specific property.

## Available for

Model-driven and canvas apps

## Parameters

|Name|Description|Type|Required|
|--|--|--|--|
|`name`|Name of the data type|`string`|Yes|

## Parent Elements

|Element|Description|
|--|--|
|[control](control.md)|Defines the component's namespace, version, and display information.|


## Child Elements

|Element|Description|Occurrences|
|--|--|--|
|[type](type.md)|The type in the type-group node defines the data type.|1 or more|

The `type-group` has a limited support for canvas apps. When the type groups can easily resolve to a common type, the "most compatible" type (generally the least specific type) is chosen for the type of the given column. The resolvable type groupings are as follows:

   - **Strings**: SingleLine.Text, Multiple, SingleLine.TextArea, SingleLine.Email, SingleLine.Phone, SingleLine.URL, SingleLine.Ticker.
   - **Numbers**: Decimal, FP, Whole.None, Currency.
   - **Dates**: DateAndTime.DateAndTime, DateAndTime.DateOnly.

For example, the following type group results in the component receiving the value **Decimal** as the type for the given parameter's type:

```XML
<type-group name="numeric">
       <type>FP</type>
       <type>Decimal</type>
       <type>Whole.None</type>
</type-group>
```
When a `type-group` includes a value that is not included in any of the above groups, or includes values from more than one group, the first value listed in the `type-group` is  chosen as the type for that parameter.

For example, the following type group results in the component receiving the value **TwoOptions** for the given parameter's type:
```XML
<type-group name="example1">
       <type>TwoOptions</type>
       <type>Decimal</type>
       <type>FP</type>
</type-group>
```
While the following would again receive "Decimal":

```XML
<type-group name="example2">
       <type>Decimal</type>
       <type>TwoOptions</type>
       <type>FP</type>
</type-group>
```


### Example

```XML
<type-group name="numbers">
      <type>Whole.None</type>
      <type>Currency</type>
      <type>FP</type>
      <type>Decimal</type>
    </type-group>
```

### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## Types  | Microsoft Docs

Source: [types.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/types)

*Provides information on methods available for types element.*

# types element

## Available for 

Model-driven and canvas apps 

## Parent Elements

|Element|Description|
|--|--|
|[property](property.md)|The property node defines a specific, configurable piece of data that the component expects from the Microsoft Dataverse.|

## Child Elements

|Element|Description|Occurrences|
|--|--|--|
|[type](type.md)|The type in the type-group node defines the data type.|0 or more|


### Related articles

[Power Apps component framework manifest schema reference](index.md)<br/>
[Power Apps component framework API reference](../reference/index.md)<br/>
[Power Apps component framework overview](../overview.md)

---

## uses-feature | Microsoft Docs

Source: [uses-feature.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/uses-feature)

*Indicates which feature their components want to use.*

# uses-feature element

Indicates which feature the code components want to use.

## Available for

Model-driven apps

## Parameters

|Element|Description|Type|Required|
|--|--|---|----|
|`name`|Name of the feature that is declared in the component|`string`|Yes|
|`required`|Indicates if the component requires that feature or not|`boolean`|Yes|

## Parent Element

|Element|Description|
|--|--|
|[feature-usage](feature-usage.md)|The feature-usage element acts as a wrapper around the `uses-feature` elements, which themselves allow developers to declare which features their component wants to use. If there are no uses-feature elements defined, the feature-usage element is not required.|



### Example 

```XML
<feature-usage>
    <uses-feature name="WebAPI" required="true" />
</feature-usage>
```

The following table shows the relationship of these settings to what happens in the code at runtime whether the feature function is available to call based upon the `uses-feature` settings defined in the manifest.

|Manifest|If Host supports|If Host doesn't support|
|----|----|-----|
|`uses-feature name="device.captureImage" required="true"`|`Context.device.captureImage != null`, no check needed.|Warning at design time. Component load fails at runtime.|
|`uses-feature name="device.captureImage" required="false"`|`Context.device.captureImage != null`|`Context.device.captureImage == null`, component can adaptively check this at runtime. |
|(none)|`Context.device.captureImage == null` |`Context.device.captureImage == null` |

### Related articles

[Power Apps component framework manifest schema reference](index.md)   
[Power Apps component framework API reference](../reference/index.md)   
[Power Apps component framework overview](../overview.md)

---

## Code components application lifecycle management | MicrosoftDocs

Source: [code-components-alm.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-alm)

*Learn about the considerations and strategies for working with specific aspects of ALM from the perspective of code components in Microsoft Dataverse.*

# Code components application lifecycle management (ALM)

ALM is a term used to describe the lifecycle management of software applications, which includes development, maintenance, and governance. More information: [Application lifecycle management (ALM) with Microsoft Power Platform](/power-platform/alm/overview-alm).

This article describes considerations and strategies for working with specific aspects of lifecycle management from the perspective of code components in Microsoft Dataverse:

1. [Development and debugging ALM considerations](#development-and-debugging-alm-considerations)
1. [Code component solution strategies](#code-component-solution-strategies)
1. [Versioning and deploying updates](#versioning-and-deploying-updates)
1. [Canvas apps ALM considerations](#canvas-apps-alm-considerations)

## Development and debugging ALM considerations

When developing code components, you would follow the steps below:

1. Create code component project (`pcfproj`) from a template using [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init). More information: [Create and build a code component](create-custom-controls-using-pcf.md).
2. Implement code component logic. More information: [Component implementation](custom-controls-overview.md#component-implementation).
3. Debug the code component using the local test harness. More information: [Debug code components](debugging-custom-controls.md).
4. Create a solution project (`cdsproj`) and add the code component project as a reference. More information: [Package a code component](import-custom-controls.md).
5. Build the code component in **release** mode for distribution and deployment.

When your code component is ready for testing inside a model-driven app, canvas app, or portal, there are two ways to deploy a code component to Dataverse:

1. [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push): This deploys a single code component at a time to a solution specified by the `--solution-unique-name` parameter, or a temporary **PowerAppsTools** solution when no solution is specified.

2. Using [pac solution init](/power-platform/developer/cli/reference/solution#pac-solution-init) and `msbuild` to build a `cdsproj` solution project that has references to one or more code components. Each code component is added to the `cdsproj` using [pac solution add-reference](/power-platform/developer/cli/reference/solution#pac-solution-add-reference). A solution project can contain references to multiple code components, whereas code component projects may only contain a single code component.

   The following diagram shows the one-to-many relationship between `cdsproj` and `pcfproj` projects:

   > [!div class="mx-imgBorder"] 
   > ![One-to-many relationship between cdsproj and pcfproj projects.](media/code-component-projects.png "One-to-many relationship between cdsproj and pcfproj projects")

More information: [Package a code component](import-custom-controls.md#package-a-code-component).

## Building pcfproj code component projects

When building `pcfproj` projects, the generated JavaScript depends on the command used to build and the `PcfBuildMode` in the `pcfproj` file.

Don't normally deploy a code component into Microsoft Dataverse that you built in development mode. The component is often too large to import and might result in slower runtime performance. For more information, see [Debug code components after deployment to Microsoft Dataverse](debugging-custom-controls.md#debug-code-components-after-deployment-to-microsoft-dataverse).

For [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) to result in a release build, the `PcfBuildMode` is set inside the `pcfproj` by adding a new element under the `OutputPath` element as follows:

```xml
<PropertyGroup>
   <Name>my-control</Name>
   <ProjectGuid>6aaf0d27-ec8b-471e-9ed4-7b3bbc35bbab</ProjectGuid>
   <OutputPath>$(MSBuildThisFileDirectory)out\controls</OutputPath>
   <PcfBuildMode>production</PcfBuildMode>
</PropertyGroup>
```

The following table shows which commands result in development vs. release builds:

| Build command used on `pcfproj` | Development Build<br />(debug purposes only) | Release Build |
| --- | --- | --- |
| `npm start watch` | Always | |
| [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) | Default behavior or when `PcfBuildMode` is set to **development** in the `pcfproj` file | `PcfBuildMode` is set to **production** in the `pcfproj` file |
| `npm run build` | Default behavior | `npm run build -- --buildMode production` |

More information: [Package a code component](import-custom-controls.md#package-a-code-component).

## Building .cdsproj solution projects

When building a solution project (`.cdsproj`), you have the option to generate the output as a managed or unmanaged solution. Managed solutions are used to deploy to any environment that isn't a development environment for that solution. This includes test, UAT, SIT, and production environments. More information: [Managed and unmanaged solutions](/power-platform/alm/solution-concepts-alm#managed-and-unmanaged-solutions).

The `SolutionPackagerType` is included in the `.cdsproj` file created by [pac solution init](/power-platform/developer/cli/reference/solution#pac-solution-init), but initially commented out. Uncomment the section and set to **Managed**, **Unmanaged**, or **Both**.

```xml
 <!-- Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both) -->
 <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
 </PropertyGroup>
```

The following table shows which command and configuration results in development vs. release builds:

| Build command used on `cdsproj`    | `SolutionPackageType` | Output                                              |
| ---------------------------------- | --------------------- | --------------------------------------------------- |
| `msbuild`                          | Managed               | **Development** build inside **Managed** Solution   |
| `msbuild /p:configuration=Release` | Managed               | **Release** build inside **Managed** Solution       |
| `msbuild`                          | Unmanaged             | **Development** build inside **Unmanaged** Solution |
| `msbuild /p:configuration=Release` | Unmanaged             | **Release** build inside **Unmanaged** Solution     |

More information: [Package a code component](import-custom-controls.md#package-a-code-component).

## Source code control with code components

When developing code components, it's recommended that you use a source code control provider such as **Azure DevOps** or **GitHub**. When committing changes using git source control, the `.gitignore` file provided by the [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init) template will ensure that some files are not added to the source control because they're either restored by `npm` or are generated as part of the build process:

```
# dependencies
/node_modules

# generated directory
**/generated

# output directory
/out

# msbuild output directories
/bin
/obj
```

Since the `/out` folder is excluded, the resulting `bundle.js` file (and related resources) built will not be added to the source control. When your code components are built manually or as part of an automated build pipeline, the `bundle.js` would be built using the latest code to ensure that all changes are included.

Additionally, when a solution is built, any association solution zip files would not be committed to the source control. Instead, the output would be published as binary release artifacts.

## Using SolutionPackager with code components

In addition to source controlling the `pcfproj` and `cdsproj`, **[SolutionPackager](/power-platform/alm/solution-packager-tool)** may be used to incrementally unpack a solution into its respective parts as a series of XML files that can be committed into source control. This has the advantage of creating a complete picture of your metadata in the human-readable format so you can track changes using **pull requests** or similar. Each time a change is made to the environment's solution metadata, Solution Packager is used to unpack and the changes can be viewed as a change set.

> [!NOTE]
> At this time, SolutionPackager differs from using [pac solution clone](/power-platform/developer/cli/reference/solution#pac-solution-clone) in that it can be used incrementally to export changes from a Dataverse solution.

If you're combining code components with other solution elements like tables, model-driven apps, and canvas apps, you'd normally not need the `cdsproj` project build. Instead, you would move the built artifacts from the `pcfproj` into the solution package folder before repacking it for import.

Once a solution that contains a code component is unpacked using `SolutionPackager /action: Extract`, it will look similar to:

```
.
├── Controls
│   └── prefix_namespace.ControlName
│       ├── bundle.js *
│       └── css
│          └── ControlName.css *
│       ├── ControlManifest.xml *
│       └── ControlManifest.xml.data.xml
├── Entities
│   └── Contact
│       ├── FormXml
│       │   └── main
│       │       └── {3d60f361-84c5-eb11-bacc-000d3a9d0f1d}.xml
│       ├── Entity.xml
│       └── RibbonDiff.xml
└── Other
    ├── Customizations.xml
    └── Solution.xml
```

Under the `Controls` folder, you can see there are subfolders for each code component included in the solution. The other folders contain additional solution components added to the solution.

When committing this folder structure to the source control, you would exclude the files marked with an asterisk (\*) above, because they will be output when the `pcfproj` project is built for the corresponding component.

The only files that are required are the `*.data.xml` files since they contain metadata that describes the resources required by the packaging process. After each code component is built, the files in the `out` folder are copied over into the respective control folder in the SolutionPackager folders. Once the build outputs have been added, the package folders contain all the data required to repack into a Dataverse solution using `SolutionPackager /action: Pack`.

More information: [SolutionPackager command-line arguments](/power-platform/alm/solution-packager-tool#solutionpackager-command-line-arguments).

## Code component solution strategies

Code components are deployed to downstream environments using Dataverse solutions. Once deployed to your development environment, they can be deployed in the same way as other solution components. More information: [Solution concepts - Power Platform](/power-platform/alm/solution-concepts-alm).

There are two strategies for deploying code components inside solutions:

1. **Segmented solutions** - A solution project is created using [pac solution init](/power-platform/developer/cli/reference/solution#pac-solution-init) and then using [pac solution add-reference](/power-platform/developer/cli/reference/solution#pac-solution-add-reference) to add one or more code components. This solution can then be exported and imported into downstream environments and other segmented solutions will take a dependency on the code component solution such that it must be deployed into that environment first. This is referred to as solution segmenting because the overall functionality is split between different solution segments and layers, with interdependencies being tracked by the solution framework. If using this approach, you'll likely need multiple development environments—one for each segmented solution. More information: [Use segmented solutions in Power Apps](/power-platform/alm/segmented-solutions-alm).

2. **Single solution** - A single solution is created inside a Dataverse environment and then code components are added along with other solution components (such as tables, model-driven apps, or canvas apps) that in turn reference those code components. This solution can be exported and imported into downstream environments without any inter-solution dependencies. With this approach, code and environment branching become important so that you can deploy an update to one part of the solution without taking changes that are being made in another area. More information: [Branch and merging strategy with Microsoft Power Platform](/power-platform/alm/basics-alm#branching-and-merging-strategy).

Reasons for adopting a segmented solution approach over a mixed single solution approach might be:

1. **Versioning lifecycle** - You want to develop, deploy, and version-control your code components on a separate lifecycle to the other parts of your solution. This is a common scenario in which you have a 'fusion team,' where code components built by developers are being consumed by app makers. Typically, this would also mean that your code components would exist in a different code repository to other solution components.

2. **Shared use** - You want to share your code components between multiple environments and therefore don't want to couple your code components with any other solution components. This could be if you're an ISV or developing a code component for use by different parts of your organization that each has its own environment.

The following diagram shows an overview of the solution lifecycle for these two approaches:

> [!div class="mx-imgBorder"] 
> ![Solution Strategies.](media/solution-strategies.png "Solution Strategies")

The diagram describes the following points:

1. **Push using PAC CLI** - When the code component is ready for testing inside Dataverse, [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) is used to deploy to a development environment. This creates an unmanaged solution named **PowerAppsTools_namespace**, where _namespace_ is the namespace prefix of the solution provider under which you want to deploy your code component. The solution provider should already exist in the target environmentand must have the same namespace prefix as what you want to use for downstream environments.After deployment, you can add your code component to model-driven or canvas apps for testing.

   > [!NOTE]
   > As described above, it's important to configure the code component `cdsproj` for production build so that you deploy the code optimized for production rather than development.

2. **Add existing code components (after PAC CLI deployment)** - If you're using the single solution approach, once deployed, the code component can be added to another solution. (That solution must share the same solution publisher as used by the **PowerAppsTools** solution.)

   > [!div class="mx-imgBorder"] 
   > ![Add Existing.](media/add-existing.png "Add Existing")

3. **Build unmanaged solution project** - If you're using solution `cdsproj` projects, then an unmanaged solution can be built using `msbuild`, and then imported into your development environment.

4. **Add existing code components (after solution project deployment)** - Much in the same way as after [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push), code components that are imported from a solution project build may be added to a mixed solution, provided that the same solution publisher prefix was used.

5. **Export single solution as managed** - The single mixed component solution can then be exported as managed and imported into the downstream environments. Since the code components and other solution components are deployed in the same solution, they all share the same solution and versioning strategy.

6. **Export code component segmented solution as managed** - If you're using the segmented solution approach, you can export your code component solution project as managed into downstream environments.

7. **Build code component segmented solution as managed** - If you're using segmented solutions and have no need for an unmanaged solution, you can build the solution project directly as a managed solution using `msbuild /p:configuration=Release` . This can then be imported into environments that need to take a dependency on its code components.

8. **Consume segmented code component solution -** Once code components are deployed via a managed segmented solution, other solutions can be built, taking a dependency on the code component solution. The dependencies on code components will be listed in the solution's `MissingDependencies` section of type 66. More information: [Dependency tracking for solution components](/power-platform/alm/dependency-tracking-solution-components).

9. **Deploy code component segmented solution before solutions that use it** - When importing solutions that take dependencies on a segmented code component solution, the code component solution must be installed on the target environment before it can be imported.

More information: [Package and distribute extensions using solutions](/powerapps/developer/data-platform/introduction-solutions).

## Code components and automated build pipelines

In addition to manually building and deploying your code component solutions, you can also build and package your code components using automated build pipelines.

- If you're using **Azure DevOps**, you can use the [Microsoft Power Platform Build Tool for Azure DevOps](/power-platform/alm/devops-build-tools).
- If you're using **GitHub**, you can use the [Power Platform GitHub Actions](/power-platform/alm/devops-github-actions).

Some advantages to using automated build pipelines are:

- **They're time-efficient** - Removing the manual tasks makes the tasks of building and packaging your component quicker so that it can be done more regularly such as every time a change is checked in.
- **They're repeatable** - Once the build process is automated, it will be performed the same every time, and therefore not be dependent on the member of the team who performs the build.
- **They offer versioning consistency** - When the build pipeline automatically sets the version of your code component and the solution, you can have confidence that when a new build is created, it's versioned consistently relative to previous versions. This facilitates tracking of features, bug fixes, and deployments.
- **They're maintainable** - Since everything that's needed to build your solution is contained from inside the source control, you can always create new branches and development environments by checking out the code. When you're ready to deploy an update, pull requests can be merged into downstream branches. More information: [Branch and merging strategy with Microsoft Power Platform](/power-platform/alm/basics-alm#branching-and-merging-strategy).

As described above, there are two approaches to solution management of code components—a segmented solution projects, or a single mixed solution containing other artifacts such as model-driven apps, canvas apps, and tables to which the code components are added.

If you're using the segmented code component solution project, you can build the project inside an **Azure DevOps Pipeline** (using [Microsoft Power Platform Build Tools](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.PowerPlatform-BuildTools)) or **GitHub Pipeline** (using [GitHub Actions for Microsoft Power Platform](/power-platform/alm/devops-github-available-actions)). Each code component `pcfproj` folder is added to the source control (excluding the `generated`, `out` and `node_modules` folders), a `cdsproj` project is created, and each code component is referenced using [pac solution add-reference](/power-platform/developer/cli/reference/solution#pac-solution-add-reference) before also being added to source control. The pipeline would then perform the following:

1. Update the solution version in the `Solution.xml` file to match the version of your build. The solution version is held in the `ImportExportXml`/`Version` attribute. See below for details on versioning strategies.
2. Update the code component version in the `ControlManifest.Input.xml` file. The version is stored in the `manifest`/`control`/`version` attribute. This should be done for all of the `pcfproj` projects that are built.
3. Run an `MSBuild` task with the argument`/restore /p:configuration=Release` using a wildcard `*.cdsproj`. This will build all of the `cdsproj` projects and their referenced `pcfproj` projects.
4. Collect the built solution zip into the pipeline release artifacts. This solution will contain all code components included as references in the `cdsproj`.

If you're using a mixed solution that contains other components in addition to code components, then this would be extracted into source control using **SolutionPackager** as described above. Your pipeline would then perform the following:

1. Update the solution and code component versions in the same way as described In steps 1 and 2 above.
2. Install Microsoft Power Platform Build Tools into the build pipeline using the `PowerPlatformToolInstaller` task.
3. Restore `node_modules` using an `Npm` task with the command `ci`.
4. Build code components in production release mode using an `Npm` task with a `customCommand` parameter of`run build -- --buildMode release`.
5. Copy the output of the build into the solution packager folder for the corresponding control.
6. Package the solution using the Power Platform Build Tools `PowerPlatformPackSolution` task.
7. Collect the built solution zip into the pipeline release artifacts.

It's recommended that you commit your unpacked solution metadata to the source control in its unmanaged form to allow the creation of a development environment at any later stage. (If only managed solution metadata is committed, it makes it hard to create new development environments.) You have two options to do this:

1. Commit both managed and unmanaged using the `/packagetype:Both` option of Solution Packager. This allows packing in either managed or unmanaged mode but has the disadvantage of duplication inside source code such that changes will often appear in multiple xml files - both the managed and unmanaged version.
2. Only commit unmanaged to source control (resulting in cleaner change sets) and then, inside the build pipeline, import the packaged solution into a build environment so that it can then be exported as managed to convert it into a managed deployment artifact.

## Versioning and deploying updates

When deploying and updating your code components, it's important to have a consistent versioning strategy so that you can:

- Track which version is deployed against the features/fixes it contains.
- Ensure canvas apps can detect that they need to update to the latest version.
- Ensure that model-driven apps will invalidate their cache and load the new version.

A common versioning strategy is [semantic versioning](https://semver.org/), which has the format: `MAJOR.MINOR.PATCH`.

## Incrementing the PATCH version

The `ControlManifest.Input.xml` stores the code component version in the control element:

```xml
<control namespace="..." constructor="..." version="1.0.0" display-name-key="..." description-key="..." control-type="...">
```

When deploying an update to a code component, the version in the `ControlManifest.Input.xml` must at minimum have its PATCH (the last part of the version) incremented for the change to be detected. This can be done either manually by editing the version attribute directly or by using the following command to advance the PATCH version by one:

`pac pcf version --strategy manifest`

Alternatively, to specify an exact value for the PATCH part (for example, as part of an automated build pipeline) use:

`pac pcf version --patchversion <PATCH VERSION>`

More information: [pac pcf version](/powerapps/developer/data-platform/powerapps-cli#pcf).

## When to increment the MAJOR and MINOR version

It's recommended that the MAJOR and MINOR version of the code component's version are kept in sync with the Dataverse solution that is distributed. For example:

1. Your deployed code component version is `1.0.0` and your solution version is `1.0.0.0`.
2. You make a small update to your code component and increment the PATCH version on the code component to `1.0.1` using `pac pcf version --strategy manifest`.
3. When packaging the code component for deployment, the solution version in `Solution.xml` is updated to be 1.0.0.1, or the version is incremented automatically by manually exporting the solution.
4. You make significant changes to your solution such that you want to increment the MAJOR and MINOR version to 1.1.0.0.
5. In this case, the code component version also can be updated to be 1.1.0.

A [Dataverse solution has four parts](/powerapps/maker/data-platform/update-solutions#understanding-version-numbers-for-updates) and it can be thought of in the following structure: `MAJOR.MINOR.BUILD.REVISION`.

If you're using **AzureDevOps**, you can set your build pipeline versioning using the `Build` and `Rev` environment variables ([Run (build) number - Azure Pipelines](/azure/devops/pipelines/process/run-number)), and use PowerShell script similar to the approach described in the article [Use PowerShell scripts to customize pipelines](/azure/devops/pipelines/scripts/powershell#example-powershell-script-version-assemblies).

| Semantic version part | ControlManifest.Input.xml version part<br />`MAJOR.MINOR.PATCH` | Solution.xml version part<br />`MAJOR.MINOR.BUILD.REVISION` | AzureDevOps Build Version                                                                        |
| --------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| MAJOR                 | MAJOR                                                           | MAJOR                                                       | Set using Pipeline Variable `$(majorVersion)` or use the value last committed to source control. |
| MINOR                 | MINOR                                                           | MINOR                                                       | Set using Pipeline Variable `$(minorVersion)` or use the value last committed to source control. |
| ---                   | ---                                                             | BUILD                                                       | `$(Build.BuildId)`                                                                               |
| PATCH                 | PATCH                                                           | REVISION                                                    | `$(Rev:r)`                                                                                       |

## Canvas apps ALM considerations

Consuming code components in canvas apps is different from doing so in model-driven apps. Code components must be explicitly added to the app by selecting **Get more components** on the **Insert** panel. Once the code component is added to the canvas app, it's included as the content inside the app definition. To update to a new version of the code component after it's deployed (and the control version incremented), the app maker must first open the app in Power Apps Studio and select **Update** when prompted on the **Update code components** dialog. The app must then be saved and published for the new version to be used when the app is played by users.

> [!div class="mx-imgBorder"] 
> ![Update code components.](media/upgrade-code-component.png "Update code components")

If the app is not updated or **Skip** is used, the app continues to use the older version of the code component, even though it doesn't exist in the environment since it's been overwritten by the newer version.

Since the app contains a copy of the code component, it's therefore possible to have different versions of the code components running side by side in a single environment from inside different canvas apps. However, you cannot have different versions of a code component running side by side in the same app. App makers are encouraged to update their apps to the latest version of code components when a new version is deployed.

> [!NOTE]
> Although, at this time, you can import a canvas app without the matching code component being deployed to that environment, it's recommended that you always ensure apps are updated to use the latest version of the code components and that the same version is deployed to that environment first or as part of the same solution.

### Related articles

[Application lifecycle management (ALM) with Microsoft Power Platform](/power-platform/alm/overview-alm)<br/>
[Power Apps component framework API reference](reference/index.md)<br/>
[Create your first component](implementing-controls-using-typescript.md)<br/>
[Debug code components](debugging-custom-controls.md)<br/>

