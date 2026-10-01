# Power Apps Component Framework (PCF) — Reference

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and, for the Power Pages tutorial, `MicrosoftDocs/power-pages-docs` GitHub repositories), snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline. Two decorative preview-banner includes referenced by source pages live in a shared-content submodule not present in either public repo and were dropped (they only restate that a feature is in preview, which the page text already says).

Pages in this file: 9

## Contents

1. [Create and build a code component| Microsoft Docs](#create-and-build-a-code-component-microsoft-docs)
2. [Package a Code Component in a Solution File](#package-a-code-component-in-a-solution-file)
3. [Debug Code Components During Development](#debug-code-components-during-development)
4. [Add code components to a column or table in model-driven apps | Microsoft Docs](#add-code-components-to-a-column-or-table-in-model-driven-apps-microsoft-docs)
5. [Code components for canvas apps  | Microsoft Docs](#code-components-for-canvas-apps-microsoft-docs)
6. [Tutorial: How to use code components in Power Pages](#tutorial-how-to-use-code-components-in-power-pages)
7. [Publish code components on Marketplace | Microsoft Docs](#publish-code-components-on-marketplace-microsoft-docs)
8. [Customize the Editable Grid Control](#customize-the-editable-grid-control)
9. [Bring intelligence into your components using Agent APIs (preview)](#bring-intelligence-into-your-components-using-agent-apis-preview)

---

## Create and build a code component| Microsoft Docs

Source: [create-custom-controls-using-pcf.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/create-custom-controls-using-pcf)

*Start creating a component using the Power Apps component framework tooling.*

# Create and build a code component

This article shows how to create and deploy code components by using Microsoft Power Platform CLI.

## Prerequisites

Install the following components:

1. [Visual Studio Code (VSCode)](https://code.visualstudio.com/Download) (Make sure you select the **Add to PATH** option)
1. [node.js](https://nodejs.org/en/download/) (Use the LTS version)
1. [Microsoft Power Platform CLI](/powerapps/developer/data-platform/powerapps-cli#install-power-apps-cli) (Use the Visual Studio Code extension)

## Create a new component

Open Visual Studio Code and open a new terminal window by selecting **Terminal** > **New Terminal**.
1. In the terminal window, create a new folder on your local machine, for example, *C:\projects\My_code_Component* by using the command `mkdir <Specify the folder name>`.
1. Go to the newly created folder by using the command `cd <specify your new folder path>`.
1. Create a new component project by passing some basic parameters by using the [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init) command:

    ```CLI
    pac pcf init --namespace <specify your namespace here> --name <Name of the code component> --template <component type> --run-npm-install
    ```
1. The preceding command also runs the `npm install` command to retrieve all the required project dependencies.
1. Open your project folder `C:\projects\My_code_Component` in any developer environment of your choice and get started with your code component development. The quickest way to get started is by running `code .` from your command prompt once you are in the `C:\projects\My_code_Component` directory. This command opens your component project in Visual Studio Code.
1. Implement the required artifacts for the component like manifest, component logic, and styling and then build the component project. For more information, see [Create your first code component](implementing-controls-using-typescript.md).

## Build your component

To build the component project, open the project folder that contains `package.json` in Visual Studio Code. Use the (Ctrl-Shift-B) command, and then select the build options.

Alternatively, you can quickly build the component by using the `npm run build` command in the Visual Studio Code terminal window for development purposes. For building a release version, use `npm run build -- --buildMode production`.

> [!TIP]
> To debug the component during or after the build operation, see [Debug a code component](debugging-custom-controls.md).

When you're done implementing the component logic in TypeScript, bundle all the code component elements into a solution file. This solution file lets you import the solution into Microsoft Dataverse. For more information, see [Package a code component](import-custom-controls.md).

### See also

[Debug code components](debugging-custom-controls.md)<br/>
[Package a code component](import-custom-controls.md)<br/>
[Add code components to a column or table](add-custom-controls-to-a-field-or-entity.md)<br/>
[Power Apps component framework API reference](reference/index.md)<br/>
[Power Apps component framework overview](overview.md)

---

## Package a Code Component in a Solution File

Source: [import-custom-controls.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/import-custom-controls)

*Learn how to package a code component in a solution file, import it into Microsoft Dataverse, and deploy updates with Microsoft Power Platform CLI.*

# Package a code component

Learn how to package a code component in a solution file and import it into Microsoft Dataverse so it's available at runtime. You also learn how to connect to an environment, deploy updates with Microsoft Power Platform CLI, and remove components from a solution.

## Process

To create and import a solution file:

1. Create a new folder inside the sample component folder and name it **Solutions** (or any name you choose) by using the command `mkdir Solutions`. Navigate into the directory by using the command `cd Solutions`.

1. Create a new solutions project by using the [pac solution init](/power-platform/developer/cli/reference/solution) command. Use the solution project for bundling the code component into a solution ZIP file that you import into Dataverse.
   
   ```CLI
   pac solution init --publisher-name developer --publisher-prefix dev
   ```

   > [!NOTE]
   > The `publisher-name` and `publisher-prefix` values must be unique to your environment.
 
1. After you create the new solution project, set the **Solutions** folder as the location for the created sample component. Add the reference by using the [pac solution add-reference](/power-platform/developer/cli/reference/solution) command. This reference informs the solution project about which code components to add during the build. You can add references to multiple components in a single solution project.

   ```CLI   
    pac solution add-reference --path c:\downloads\mysamplecomponent
   ```

1. To generate a ZIP file from the solution project, go into your solution project directory and build the project by using the following command. This command uses *MSBuild* to build the solution project by pulling down the *NuGet* dependencies as part of the restore. Use the `/restore` flag only the first time you build the solution project. For every build after that, run the command `msbuild`.

   ```CLI
   msbuild /t:restore
   ```
   ```CLI
   msbuild
   ```

   Or if you have installed the .NET SDK, version 6 or later:

   ```CLI
   dotnet build
   ```


    > [!TIP]
    > - If msbuild 15.9.* isn't in the path, open Developer Command Prompt for VS 2017 to run the `msbuild` commands.
    > - Building the solution in the *debug* configuration generates an unmanaged solution package. Building the solution in *release* configuration generates a managed solution package. You can override these settings by specifying the `SolutionPackageType` property in the `cdsproj` file.
    > - Set the msbuild configuration to `Release` to issue a production build. Example: `msbuild /p:configuration=Release`
    > - If you encounter an error that says *Ambiguous project name* when running the `msbuild` command on your solution, ensure that your solution name and project name aren't the same.

1. After the build succeeds, find the generated solution files inside the `\bin\debug\` folder.
1. [Import the solution into Dataverse](../../maker/data-platform/import-update-export-solutions.md) manually by using the web portal or automatically by using the [Microsoft Power Platform Build Tools](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.PowerPlatform-BuildTools).

## Connect to your environment

You can deploy the code components directly from Microsoft Power Platform CLI by connecting to the Dataverse environment and then pushing the updated components.

Follow the steps in the following list to create the authentication profile, connect to Dataverse, and push the updated components. 
 
1. Create your authentication profile by using the [pac auth create](/power-platform/developer/cli/reference/auth) command. 
 
    ```CLI
    pac auth create --url https://xyz.crm.dynamics.com 
    ```
 
1. If you previously created an authentication profile, view all existing profiles by using the [pac auth list](/power-platform/developer/cli/reference/auth) command. 

   ```CLI
    pac auth list 
   ```
 
1. Switch between previously created authentication profiles by using the [pac auth select](/power-platform/developer/cli/reference/auth) command. 
   
   ```CLI
    pac auth select --index <index of the active profile>
    ``` 

1. Get basic information about the environment by using the [pac org who](/power-platform/developer/cli/reference/org) command. The connection uses the default authentication profile. 

    ```CLI
    pac org who 
    ```
 
1. Delete a particular authentication profile by using the [pac auth delete](/power-platform/developer/cli/reference/auth) command with the `pac auth delete --index <index of the profile>` syntax. 
1. Clear all authentication profiles from your local machine by using the [pac auth clear](/power-platform/developer/cli/reference/auth) command. This action is irreversible because it completely deletes the `authprofile.json` file and token cache file from your local machine. 

## Deploy code components

After you create an authentication profile, start pushing the code components to the Dataverse instance with all the latest changes. 

The `push` capability speeds up the inner-developer cycle development because it bypasses the code component versioning requirements and doesn't require that you build your solution (cdsproj) to import the code component. 

To use the `push` capability, follow these steps:

1. Ensure that you have a valid authentication profile.
1. Go to the directory where the sample component file is located.
1. Run the [pac pcf push](/power-platform/developer/cli/reference/pcf) command.

   ```CLI
   pac pcf push --publisher-prefix <your publisher prefix>
   ```

   > [!NOTE]
   > The publisher prefix that you use with the `push` command should match the publisher prefix of your solution where you include the components.

## Remove components from a solution

If you want to remove a code component from a solution file:

1. Edit the `cdsproj` file in the solution project directory and remove the references to the component. Here's an example of a component reference:

   ```XML
   <ItemGroup>
       <Projectreference Include="..\pcf_component\pcf_component.pcfproj">
         <Project>0481bd83-ffb0-4b70-b526-e0b3dd63e7ef</Project>
         <Name>pcf_component</Name>
         <Targets>Build</Targets>
         <referenceOutputAssembly>false</referenceOutputAssembly>
         <OutputItemType>Content</OutputItemType>
         <CopyToOutputDirectory>Always</CopyToOutputDirectory>
       </Projectreference>
   </ItemGroup>
   ```

1. Perform a rebuild (or clean) by using the following command:
   
    ```CLI
    msbuild /t:rebuild
    ```

### See also

[Add code components to a column or table in model-driven apps](add-custom-controls-to-a-field-or-entity.md)<br/>
[Add components to a canvas app](component-framework-for-canvas-apps.md#add-components-to-a-canvas-app)<br/>
[Power Apps component framework API reference](reference/index.md)<br/>
[Power Apps component framework overview](overview.md)<br />
[Microsoft Power Platform CLI Command Groups](/power-platform/developer/cli/reference/)

---

## Debug Code Components During Development

Source: [debugging-custom-controls.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/debugging-custom-controls)

*Learn how to debug code components with the browser test harness, developer tools, Fiddler, and Requestly before and after deployment to Dataverse.*

# Debug code components

This article explains how to debug code components during development and after deployment to Microsoft Dataverse. Use unit tests to validate component logic independently of the Power Apps component framework runtime.

This article shows how to debug your code components using the test harness and after deploying to Microsoft Dataverse:

- [Debug code components](#debug-code-components)
   - [Debug code components with the browser test harness](#debug-code-components-with-the-browser-test-harness)
    - [Test code components with mock data](#test-code-components-with-mock-data)
    - [Common limitations when using the test harness](#common-limitations-when-using-the-test-harness)
   - [Use browser developer tools to debug code components](#use-browser-developer-tools-to-debug-code-components)
      - [Bundle code components with webpack](#bundle-code-components-with-webpack)
      - [Use developer tools to debug code components](#use-developer-tools-to-debug-code-components)
    - [ES5 vs ES6](#es5-vs-es6)
   - [Debug code components after deployment to Microsoft Dataverse](#debug-code-components-after-deployment-to-microsoft-dataverse)
      - [Use Fiddler to debug code components](#use-fiddler-to-debug-code-components)
      - [Use Requestly to debug code components](#use-requestly-to-debug-code-components)




## Debug code components with the browser test harness

While you're implementing the code component logic, using `npm start` or `npm start watch` builds the code component and open the local test harness in a new browser window. This test harness is part of Microsoft Power Platform CLI and hence is the same irrespective of if you plan to use your code component in model-driven apps, canvas apps, or portals. More information: [Create your first component](implementing-controls-using-typescript.md).

> [!NOTE]
> Before you can use `npm start` you need to check if npm is installed in your machine.

The following image shows what Visual Studio Code looks like when you use the `npm start watch` for the `DataSetGrid` sample:

:::image type="content" source="media/debugging-custom-controls/debug-code-components-vscode-watch.png" alt-text="Screenshot of Visual Studio Code running the DataSetGrid component in watch mode.":::

Launching the test harness in `watch` mode enables you to quickly see the changes in action. Changes made to any of the following component assets are automatically reflected in the test harness without having to restart it:

1. `index.ts` file.
1. Imported modules in `index.ts` (excluding node_modules).
1. All of the resources listed in the `ControlManifest.Input.xml` file, for example, `css/DataSetGrid.css` or `strings/DataSetGrid.1033.resx`

If you make changes to any of these files, you'll see a `Change detected` message and the browser reloads with the updated code.

:::image type="content" source="media/debugging-custom-controls/code-component-change-detected.png" alt-text="Screenshot of the test harness reloading after detecting code component changes.":::

The following image shows the test harness once it's opened in a new browser window:

:::image type="content" source="media/debugging-custom-controls/code-component-test-harness-layout.png" alt-text="Screenshot of the browser test harness with the code component and input panels.":::

As the image above shows, the browser window opens to display four areas. The code component is rendered in the left pane while the right pane has three sections that depend on the type of component being debugged:

- **Context Inputs** is shown for all code component types:

  - **Form Factor**: Provides a way to specify the form factor and test the code component with each form factor (web, tablet, phone). Form factor is helpful when the code component changes its layout depending on where the component is loaded. You can detect the form factor in the code using [`context.client.getFormFactor()`](reference\client\getformfactor.md).
  - **Component Container Width & Height**: Initially, the width and height are empty. This places your code component inside a container `div` that has no width or height CSS style set. If you provide a width or height, the container `div` has its dimensions constrained so that you can see how your code component adapts to the space available. You need to carefully test your code components behavior inside Power Apps once deployed since the exact behavior is different to that of the test harness. Additionally, your component needs to make a call to `context.mode.trackContainerResize(true)` if it wants to receive `context.mode.allocatedHeight` `context.mode.allocatedWidth` in the `updateView` method, however the test harness always provides the height and width irrespective of this call.
    More information: [trackContainerResize](reference\mode\trackcontainerresize.md).

  > [!NOTE]
  > When using the test harness, `allocatedWidth` and `allocatedHeight` will be provided as text rather than numeric values.

- **Data Inputs** is an interactive UI that displays all the properties and their [types](manifest-schema-reference/types.md) or [type-groups](manifest-schema-reference/type-group.md) defined in the [manifest](manifest-schema-reference/manifest.md) file. The contents of this area are dependent on the properties and datasets defined in the `ControlManifest.Input.xml` and allows providing mock data for test purposes.

- **Outputs** render the output whenever a component's [getOutputs](reference/control/getoutputs.md) method gets called.

> [!NOTE]
> If you want to modify the `ControlManifest.Input.xml` file, you will need to restart the debug process before any additional properties or datasets appear in the inputs section. You can do this by using `Ctrl + c` on the running process at the command line and then running `npm start watch` again.

> [!IMPORTANT]
> Using `npm start` and `npm start watch` builds your code component optimized for development and debugging. This code would not normally be deployed to Microsoft Dataverse. More information: [Code Components Application Lifecycle Management](code-components-alm.md).

### Test code components with mock data

- For components with [`property`](reference\property.md) elements in the `ControlManifest.Input.xml`, the **Data Inputs** section shows an input box for each value.

   :::image type="content" source="media/debugging-custom-controls/code-component-test-harness-data-inputs.png" alt-text="Screenshot of test harness Data Inputs fields for code component properties.":::

- For _dataset_ type components, you can load a CSV file with test data for each [data-set](manifest-schema-reference\data-set.md) element. You manually create or export in .csv format directly from your environment. After loading a CSV file, you can bind each [property-set](manifest-schema-reference\property-set.md) defined in the `ControlManifest.Input.xml` to a column in the CSV file. The following screenshot shows how this binding is done by picking the column for each property:

   :::image type="content" source="media/debugging-custom-controls/dataset-test-harness-map-csv-columns.png" alt-text="Screenshot of CSV columns mapped to dataset properties in the test harness.":::

- If you don't have any properties defined in the `ControlManifest.Input.xml` file, then all the columns get automatically loaded into the test harness. The following screenshot shows how you can assign the data type to the code component for each column in the source CSV:

   :::image type="content" source="media/debugging-custom-controls/dataset-test-harness-assign-column-data-types.png" alt-text="Screenshot of data types assigned to CSV columns in the test harness.":::

> [!NOTE]
> When loading a CSV sample dataset you must select **Apply** before the data is loaded. If the dataset has property-set elements defined, then each must be mapped to a column in the CSV before you can select **Apply**. These settings are not remembered and must be set every time a code change is made, after the test harness re-loads.

### Common limitations when using the test harness

While the test harness is suitable for testing simple code components, the following scenarios might mean that the test harness can't be used to test a more complex code component:

1. The [updatedProperties](reference\updatedproperties.md) array isn't populated when properties are changed via the test harness **Data Inputs** section.
1. Using features listed in the `feature-usage` section of the `ControlManifest.Input.xml`. For example, calling the `context.WebApi.*` methods throw an exception from within the test harness.
1. Use of the [paging](reference/paging.md), [sorting](reference/sortstatus.md), and [filtering](reference/filtering.md) APIs on datasets throw an exception from within the test harness.
1. Use of complex datatype bindings that provide more metadata such as choices and lookups. For choice columns, the test harness gives you three simple choices with minimal metadata.
1. Model-driven apps specifics such as field level security, read-only behavior, dataset selection API, and integration with the model-driven apps command bar.
1. Other context APIs such as [Navigation](reference/navigation.md) and [Utility](reference/utility.md) methods.

To test these scenarios, you need to first deploy your code component and test it by using the technique described in [Debug code components after deployment to Microsoft Dataverse](#debug-code-components-after-deployment-to-microsoft-dataverse)

## Use browser developer tools to debug code components

Modern browsers have a built-in set of developer tools that allow you to inspect the HTML, CSS, and JavaScript loaded on the current page. You can access these developer tools using the keyboard shortcut `Ctrl`+`Shift`+`I`. Using the `F12` key is also a common keyboard shortcut to open the developer tools however this shortcut doesn't work inside Power Apps Studio due to it being already used for the **Download App** keyboard shortcut.

### Bundle code components with webpack

When you write code components using TypeScript, your code probably looks different from the JavaScript that is emitted into the bundled code component output. When you run `npm start` or `npm start watch`, the `pcf-scripts` module (added to the `packages.json` by running [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init)) uses web pack to build multiple TypeScript files into a single `bundle.js` inside the `out` folder. This folder also contains any other resources (for example, `html`/`css`) referenced by your `ControlManifest.Input.xml` including the manifest itself, but named instead as just `ControlManifest.xml`.

When you use modern TypeScript language features such as import/export or async/await that the targeted standard of JavaScript (for example, ES5), doesn't support, the build process transpiles the TypeScript into JavaScript without using these language features. The source maps that are output as part of the development build, provide the information to the developer tools so that breakpoint locations in your TypeScript can be mapped to the corresponding line of JavaScript. Equally, when an exception occurs or you step through the code, you can see the original TypeScript line rather than the underlying transpiled JavaScript.

Another feature of bundling is that when you use `npm install` to include an external module, the build process adds the required module into your code component's `bundle.js` using the contents of the associated `node_modules` directory. For this reason, any external modules used must be packaged in such a way that they can be bundled. More information: [Best practices: Module imports](code-components-best-practices.md#module-imports).

> [!NOTE]
> The source maps will only be output when you run the build-in development mode and will result in a much larger file than your production build. For this reason, it is not recommended to deploy your code component after building for development purposes. More information: [Application Lifecycle Management (ALM)](code-components-alm.md).

### Use developer tools to debug code components

This section describes how to debug your code component inside the Microsoft Edge developer tools:

1. Load your code component into a browser session using either:

   1. The test harness using `npm start watch`.
   1. A local development build of your code component loaded into a model-driven, canvas app, or portal browser session. You don't need to deploy a development build of your code component to Dataverse server. Instead, you can use Fiddler Auto Responders as described in [Debug code components after deployment to Microsoft Dataverse](#debug-code-components-after-deployment-to-microsoft-dataverse).

1. Select `Ctrl` + `Shift` + `I` to open the developer tools.
1. Select the **Sources** tab inside the developer tools panel.
1. Use `Ctrl` + `P` to show the **Open File** command pallet. You can also select **Open File** from the **ellipsis** menu.
1. Enter the name of your control (which is the name of the control you used in [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init)).
1. Select the file in the matches listed that is similar to:
   `webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./DataSetGrid/index.ts`

   :::image type="content" source="media/debugging-custom-controls/edge-devtools-open-component-source.png" alt-text="Screenshot of Microsoft Edge DevTools showing a code component TypeScript source file.":::

1. Locate the `updateView` function and place a breakpoint on the first line.
1. Make a change to the properties that are bound to your code component. In the test harness, changing properties can be done using the properties panel, or inside Power Apps, you can make a change to a bound property or dataset. Changing properties triggers a call to `updateView`.
1. You'll now see your breakpoint hit, and you can inspect the code.

   :::image type="content" source="media/debugging-custom-controls/edge-devtools-updateview-breakpoint.png" alt-text="Screenshot of Microsoft Edge DevTools paused at an updateView breakpoint.":::

1. You can also inspect the HTML elements and CSS created by the component using the **Elements** tab. If you have a specific set of interactions that you're interested in (root container element), you can place a breakpoint on the HTML Dom element using the **Context Menu** (while the root element is selected) > **Break on** > **subtree modifications**

   :::image type="content" source="media/debugging-custom-controls/edge-devtools-break-on-subtree-modifications.png" alt-text="Screenshot of Microsoft Edge DevTools menu for breaking on subtree modifications.":::

### ES5 vs ES6

Currently, by default, code components are configured to transpile into ES5 JavaScript so that older browsers are supported. You can change the target to ES6 if you don't need to support older browsers by setting the `target` in your projects `tsconfig.json` to `ES6`:

```json
{
  "extends": "./node_modules/pcf-scripts/tsconfig_base.json",
  "compilerOptions": {
    "target": "ES6",
    "typeRoots": ["node_modules/@types"]
  }
}
```

> [!NOTE]
> At this time source maps are generated from TypeScript transpiled output for each TypeScript file rather than from the source. If ES5 is targeted, then your source maps will be harder to read due to the ES6 language features (such as classes) being removed. Until support for ES6 is added, even if you need to output ES5, you can update your `tsconfig.json` to target ES6 while developing so that the source maps are closer to the original TypeScript. If you need to output ES5, remember to set it back before building your code component for production deployment.

## Debug code components after deployment to Microsoft Dataverse

To fully test the logic inside the context of a model-driven app, canvas app, or portal you can first deploy and configure your code component to Microsoft Dataverse and then use either [Fiddler](https://www.telerik.com/download/fiddler)'s Auto Responder feature or use [requestly](https://requestly.io/). In both cases, you'll load a development build of your code component (built locally) into the browser without having to continuously deploy changes as you debug your code. Debugging this way allows you to debug against a nondevelopment downstream environment without having to first deploy a development build.

First ensure your component is deployed and configured in Microsoft Dataverse. Ideally, you should only publish production builds of code components into Microsoft Dataverse. For larger code components, publishing a development build might result in the error [Web resource size is too large](issues-and-workarounds.md#web-resource-size-is-too-large). Since we're going to redirect the code component's `bundle.js` to a locally built version, you can update your `.pcfproj` file to always build in production mode when using [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) by setting the property `PcfBuildMode` to production.

```XML
<PropertyGroup>
  <Name>ReactStandardControl</Name>
  <ProjectGuid>0df84c56-2f55-4a80-ac9f-85b7a14bf378</ProjectGuid>
  <OutputPath>$(MSBuildThisFileDirectory)out\controls</OutputPath>
  <PcfBuildMode>production</PcfBuildMode>
</PropertyGroup>
```

### Use Fiddler to debug code components

To debug your code component using Fiddler:

1. Download and install [Fiddler Classic](https://www.telerik.com/download/fiddler)
1. Open Fiddler and from the menu bar, go to **Tools**, and then select **Options**.
1. Select the **HTTPS** tab in the dialog box and check the **Capture HTTPS CONNECTS** and **Decrypt HTTPS traffic** checkboxes so that the HTTPS traffic is captured and then decrypted.

   :::image type="content" source="media/debugging-custom-controls/fiddler-capture-decrypt-https-settings.png" alt-text="Screenshot of Fiddler HTTPS options for capturing and decrypting HTTPS traffic.":::

1. Select **OK** to close the dialog box.

   > [!NOTE]
   >
   > - If it is the first time you are enabling this setting, Fiddler will prompt you to install a certificate. Install the certificate and restart Fiddler so that the new settings take effect.
   > - If you have run Fiddler in the past and get a `NET::ERR_CERT_AUTHORITY_INVALID` error, in the **HTTPS** tab, select the **Actions** button and choose **Reset All Certificates**. This will also present multiple prompts for the new certificates to be installed.

1. In the right-hand panel, select the **AutoResponder** tab.
1. Ensure that **Enable Rules** and **Unmatched requests passthrough** are checked.
1. Select **Add Rule** and enter first:

   ```
   REGEX:(.*?)((?'folder'css|html)(%252f|\/))?YOUR_NAMESPACE\.YOUR_CONTROL_NAME[\.\/](?'fname'[^?]*\.*)(.*?)$
   ```

   where:

   - **YOUR_NAMESPACE** - the namespace you provided to [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init) as contained in the `control.namespace` attribute of the `ControlManifest.Input.xml`
   - **YOUR_CONTROL_NAME** - the component name you provided to [pac pcf init](/power-platform/developer/cli/reference/pcf#pac-pcf-init) and set in the `control.constructor` attribute of the `ControlManifest.Input.xml`

   This rule aims to match requests for the code component's `bundle.js` and related resources (`css`/`html`) in such a way that it works for both model-driven, and canvas apps, both in Power Apps Studio and Player.

   An example of this rule looks like the following:

   :::image type="content" source="media/debugging-custom-controls/fiddler-autoresponder-code-component-rule.png" alt-text="Screenshot of a Fiddler AutoResponder rule for local code component resources.":::

   If you want a simpler **AutoResponder** rule approach, see [Script web resource development using Fiddler Auto Responder](../model-driven-apps/streamline-javascript-development-fiddler-autoresponder.md).

1. Enter a string like this for the path to respond with:

   ```
   C:\COMPONENT_ROOT_FOLDER\out\controls\YOUR_CONTROL_NAME\${folder}\${fname}
   ```

   For example, if your code component root folder is `C:\src\PowerApps-Samples\component-framework\DataSetGrid` and the component name is `DataSetGrid`, the path would be:

   ```
   C:\src\PowerApps-Samples\component-framework\DataSetGrid\out\controls\DataSetGrid\${folder}\${fname}
   ```

1. Select **Save**.
1. Open the **Filters** tab and check **Use Filters**. In the **Response Headers** section, check **Set response header** and provide the following:

   Header: `Access-Control-Allow-Origin`

   Value: `*`

   :::image type="content" source="media/debugging-custom-controls/fiddler-access-control-response-header-filter.png" alt-text="Screenshot of a Fiddler response-header filter for cross-origin access.":::

   > [!IMPORTANT]
   > This step is only necessary when debugging code components after they are deployed to canvas apps because the resources are stored in blob storage rather than underneath the `powerapp.com` domain. As such, any requests to these resources will require cross-domain access when loaded by the browser. Only enable this `Access-Control-Allow-Origin` filter rule when you are debugging since it will modify headers of other sites that you visit.

1. Now that you have the **AutoResponder** rules running you'll need to first clear the cache in the browser and reload the page containing the code component. This can easily be done by opening developer tools (`Ctrl + Shift + I`), right-clicking the **Refresh** > **Empty cache and hard refresh**.

   :::image type="content" source="media/debugging-custom-controls/edge-empty-cache-hard-refresh.png" alt-text="Screenshot of the Microsoft Edge Empty cache and hard refresh command.":::

1. Once you have your code component loaded from your local machine, you can make changes to the code (while `npm start watch` is running) and refresh the browser to load the newly built versions. Fiddler's Auto Responder will automatically add a cache-control header so that it will not be cached by the browser so a simple refresh will reload the resources without having to clear the cache each time.

### Use Requestly to debug code components

To debug your code component using Requestly:

1. Enable Internet Information Services (IIS) on your machine.

   1. Open **Control Panel** and select **Programs and Features** > **Turn Windows** features on or off.
   1. Enable Internet Information Services.
   1. Expand the Internet Information Services and verify that the web server components listed in the next section are enabled.
   1. Select **OK**.

1. Setup ISS

   1. Open IIS on your machine.
   1. In right side panel **Connections**, expand tree and right-click on **Sites**.
   1. Add website.
   1. Set **Site** name.
   1. Set **Physical path** to your custom component folder, for example, `C:\COMPONENT_ROOT_FOLDER\out\controls\YOUR_CONTROL_NAME\`
   1. Set **Port** (any number, for instance,  **7777**).
   1. Select **OK**. Selected folder is now hosted on `http://localhost:<SELECTED_PORT>`

   :::image type="content" source="media/debugging-custom-controls/iis-add-code-component-website.png" alt-text="Screenshot of IIS settings for hosting code component files on a local website.":::

1. Download and install [Requestly](https://requestly.io)
1. Follow onboarding to the tool.
1. Open rules (navigate to https://app.requestly.io/rules).
1. Add "Replace Host" rule:

   1. Set name of the rule.
   1. Set "Replace" field with `https://[ORG_URL]/[APPLICATION_ID]/webresources/[YOUR_NAMESPACE].[YOUR_CONTROL_NAME]/`
   1. Set "With" with `http://localhost:<SELECTED_PORT>`
   1. Set "If request" with "URL" "Contains" `[YOUR_NAMESPACE].[YOUR_CONTROL_NAME]`
   1. Save the rule and enable it.

   :::image type="content" source="media/debugging-custom-controls/requestly-replace-code-component-host-rule.png" alt-text="Screenshot of a Requestly Replace Host rule for local code component files.":::

1. Now you need to clear the cache in the browser and reload the page containing the code component. You can clear the cache in the browser and reload the page by opening developer tools (`Ctrl + Shift + I`), right-clicking the **Refresh** > **Empty cache and hard refresh**.

   :::image type="content" source="media/debugging-custom-controls/edge-empty-cache-hard-refresh.png" alt-text="Empty cache and hard refresh":::

1. Once you have your code component loaded from your local machine, you can make changes to the code (while `npm start watch` is running) and refresh the browser to load the newly built versions. Requestly automatically adds a cache-control header so that it isn't cached by the browser so a simple refresh will reload the resources without having to clear the cache each time.

### Related articles

[Power Apps component framework API reference](reference/index.md)<br/>
[Power Apps component framework overview](overview.md)<br/>
[Application Lifecycle Management (ALM)](code-components-alm.md)<br/>
[Create your first component](implementing-controls-using-typescript.md)

---

## Add code components to a column or table in model-driven apps | Microsoft Docs

Source: [add-custom-controls-to-a-field-or-entity.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/add-custom-controls-to-a-field-or-entity)

*Learn how to add code components to a column or table.*

# Add code components to a column or table in model-driven apps

Code components let you transform columns that traditionally contain text into visualizations. Similarly, you can use code components to transform datasets, such as a view, to display in a more visual rendering rather than a list of records. Code components can appear as visualizations on forms, dashboards, views, and homepage grids. 



   > [!div class="mx-imgBorder"] 
   > ![Custom slider control.](../../maker/model-driven-apps/media/slider-control.PNG "Custom slider control ")

## Add a code component to a column

Following the steps below will change the default label and text box column of the **Budget Amount** column to the slider code component on the Opportunity table. You can use similar steps to replace an existing column with a code component or configure a code component for a custom column.

1. Navigate to **Settings** > **Customizations** > **Customize the System**.

2. Expand **Entities**, expand the table that you want, such as the **Opportunity** table, select **Forms**, and then open a form such as the **Main** form.

3. In the form editor, double-click the column where you want to add a code component, such as the **Budget Amount** column on the opportunity main form. You can also create a custom column.

4. Select the Controls tab on the **Field Properties** page, and then select **Add Control**.

5. On the Add Control page, select the component that you want, such as the **Linear Slider** component, and then select **Add**.

   > [!div class="mx-imgBorder"] 
   > ![Add linear slider control.](../../maker/model-driven-apps/media/add-slider.PNG "Add linear slider control")

6. Choose the client where you want the component to appear.

   - **Web**. To make the code component available from any web browser, select the Web option next to the component. Notice that setting the Web option includes rendering the component in web browsers on PCs, Macs, and mobile devices.

   - **Phone**. To make the code component available on phones running Dynamics 365 for phones, select the Phone option next to the component.

   - **Tablet**. To make the code component available on tablet devices running Dynamics 365 for tablets, select the Tablet option next to the component.

   > [!div class="mx-imgBorder"] 
   > ![Choose the client apps to view the custom control.](../../maker/model-driven-apps/media/choose-client.png "Choose the client apps to view the custom control") 

7. Select the pencil icon next to **Min**, **Max**, and **Step**, set the property option, and then select **OK**.  
   
   > [!div class="mx-imgBorder"] 
   > ![Add custom control properties.](../../maker/model-driven-apps/media/ccf-add-properties.png "Add custom control properties")

   - **Min**. Set the minimum accepted value. You can bind a static value that you enter or bind the value to an existing column. In this example **Bind to static value** is **Currency** and the minimum value that can be entered is *zero*.  
  
       - **Bind to a static value**. Select the data type, such as a whole number (Whole.None), currency, floating point (FP), or decimal. Next, enter a number that represents the minimum accepted value for the column.  
  
       - **Bind to values on a field**. Select a column from the list that will be used as the minimum accepted value.  
  
   - **Max**. Set the maximum accepted value for the column. Similar to the Min value, you can bind a static value that you enter or bind the value to an existing column as described earlier. In this example, **Bind to static value** is **Currency** and the maximum value that can be entered is **1 billion**.  
  
   - **Step**. This represents the unit to increment or decrement when adding to or subtracting from  the current value. For example, for budget amount you can select 100 dollar increments\decrements.  
  
   - **Hide Default Control**. Hides the component so neither the component nor the data is displayed in any of the clients that don't support the code component.   
  
8. Select **OK**, to close the Field Properties page.  
  
9. To activate the customization, on the table form select **Save**, and then select **Publish**.  
  
10. Select **Save and Close** to close the form editor.  
  
## Add code component to a table

To add a code component like dataset component or simple table component to a grid or view, follow the steps below:

  - Navigate to **Settings > Customizations** and click on **Customize the System**.
  - Click on the arrow next to **Entities** tab a select the table you want to add the code component. 
  - Click on the **Controls** tab and click on **Add a control**.
  - On the Add Control page, select the component that you want, such as Simple Table component and then select **Add**.
  - Choose the client where you want the component to appear.


## See the code component in action  

 Open a record that includes the column with the code component, such as the Opportunity form from the previous example, and view how the column is changed. The column is now rendered as a slider component instead of the text column.  

> [!div class="mx-imgBorder"] 
> ![Slider control rendered on form.](../../maker/model-driven-apps/media/slider-control.PNG "Slider control rendered on form")  

### See also

[Implementing components in TypeScript](implementing-controls-using-typescript.md)<br/>
[Power Apps component framework API reference](reference/index.md)<br/>
[Power Apps component framework overview](overview.md)

---

## Code components for canvas apps  | Microsoft Docs

Source: [component-framework-for-canvas-apps.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps)

*Learn how to create code components using Power Apps component framework for canvas apps.*

# Code components for canvas apps

Professional developers can use Power Apps component framework to create code components that they can use in their canvas apps. For more information, see [Power Apps component framework overview](overview.md).

App makers can use Power Apps component framework to create, import, and add code components to canvas apps by using [Microsoft Power Platform CLI](get-powerapps-cli.md). Certain APIs might not be available in canvas apps. Check each API to determine where it's available.  

## Security considerations

> [!WARNING]
> Code components contain code that Microsoft didn't generate. Code components from an untrusted source can potentially access security tokens and data when the component is rendered. Only add code component solutions from trusted sources.

When you open a canvas app that contains code components in Power Apps Studio, a warning message about potentially unsafe code appears. Code components in the Power Apps Studio environment have access to security tokens, so only open components from trusted sources. Administrators and system customizers should review and validate all code components before importing those components in an environment and making them available for makers to use in their apps. The `Default` publisher appears when you import code components by using an unmanaged solution or when you use [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) to install your code component.

![Safety warning.](media/canvas-app-safety-warning.png "Safety warning")  

## Prerequisites

- A Power Apps license is required. For more information, see [Power Apps component framework licensing](overview.md#licensing).
- System administrator privileges are required to enable the Power Apps component framework feature in the environment.

## Enable the Power Apps component framework feature

To add code components to an app, you need to enable the Power Apps component framework feature in each environment where you want to use them. By default, the Power Apps component feature is enabled for model-driven apps. To enable an environment to use code components inside its apps:

1. Sign in to [Power Apps](https://powerapps.microsoft.com/).

1. Select **Settings** ![Settings.](media/settings.png), and then select **Admin Center**.

    > [!div class="mx-imgBorder"]
    > ![Settings and Admin Center.](media/select-admin-center-from-settings.png "Settings and Admin Center")

1. On the left pane, select **Environments**, select the environment where you want to enable this feature, and then select **Settings**.

1. Expand **Product**, and select **Features**.

1. From the list of available features, turn on **Power Apps component framework for canvas apps**, and then select **Save**.

   > [!div class="mx-imgBorder"]
   > ![Enable Power Apps component framework.](media/enable-pcf-feature.png "Enable Power Apps component framework")

## Implementing code components

After you enable the Power Apps component framework feature in your environment, you can start implementing the logic for code components. For a step-by-step tutorial, see [Create your first code component](implementing-controls-using-typescript.md).

Check the [limitations](limitations.md) of code components in canvas apps before starting implementation.

## Add components to a canvas app

1. Go to Power Apps Studio.

1. Create a new canvas app, or edit an existing app to which you want to add the code component.

   > [!IMPORTANT]
   > Make sure you [imported](../../maker/data-platform/import-update-export-solutions.md) the solution .zip file containing the code components into Microsoft Dataverse.

1. On the left pane, select **Add** (**+**), and then select **Get more components**.

   > [!div class="mx-imgBorder"]
   > ![Insert components.](media/insert-code-components-using-get-more-components.png "Insert components")

1. Select the **Code** tab, select a component from the list, and then select **Import**.

    > [!div class="mx-imgBorder"]
    > ![Import a component.](media/insert-component-add-sample-component.png "Import a component")

1. On the left pane, select **+**, expand **Code components**, and then select the component to add it to the app.

   > [!div class="mx-imgBorder"]
   > ![Add a component.](media/add-sample-component-from-list.png "Add a component")

   > [!NOTE]
   > You can also add components by selecting **Insert** > **Custom** > **Import component**. This option is deprecated and will be removed in a future release, so use the flow described earlier.
   >

On the **Properties** tab, you see the code component properties.

> [!div class="mx-imgBorder"]
> ![Default code component properties pane.](media/property-pane-with-parameters.png "Default code components properties pane")

> [!NOTE]
> To re-import existing code components and make the properties available in the default **Properties** tab, update the code component's manifest version. The properties remain available on the **Advanced** properties tab.

## Delete a code component from a canvas app

1. Open the app where you added the code component.
1. On the left pane, select **Tree view**, and then select the screen where you added the code component.
1. Next to the component, select **More** (**...**), and then select **Delete**.

   > [!div class="mx-imgBorder"]
   > ![Delete a code component.](media/delete-code-component.png "Delete a code component")

1. Save the app to see the changes.

## Update existing code components

To see runtime changes after updating code components, change the `version` property in the manifest file. Change the version of the component whenever you make changes.

> [!NOTE]
> Power Apps Studio updates existing code components only when you close or reopen the app. When you reopen the app, it asks you to update the code components. Simply deleting or adding code components back into the app doesn't update the components. Publish all the customizations in the updated solution first, otherwise updates made to the code component don't appear.

### See also

[Power Apps component framework overview](overview.md)<br/>
[Create your first code component](implementing-controls-using-typescript.md)<br/>
[Learn Power Apps component framework](/training/paths/use-power-apps-component-framework)

---

## Tutorial: How to use code components in Power Pages

Source: [component-framework-tutorial.md](https://learn.microsoft.com/en-us/power-pages/configure/component-framework-tutorial)

*Walk through example steps for creating a sample code component and adding it to a Dataverse form used to create a form component inside Power Pages.*

# Tutorial: Use code components in portals

In the tutorial, you'll add a custom component to a Microsoft Dataverse form, and enable the custom control to be visible on a webpage.

This tutorial will use the **Feedback** table and the **Contact us** webpage that is available in the **Starter layout** templates. 

## Prerequisites

- Your portal version must be [9.3.3.x](/power-apps/maker/portals/versions/version-9.3.3.x) or higher.
- Your starter portal package must be [9.2.2103.x](/power-apps/maker/portals/versions/version-9.3.3.x) or higher.
- A site using one of the **Starter layout** [templates](../templates/site-design.md).

To create a sample component, follow the steps in the tutorial [Create your first component](/power-apps/developer/component-framework/implementing-controls-using-typescript). At the end of that tutorial, you'll have the component named TSLinearInputComponent packaged and uploaded to your Dataverse environment which you can use in Power Pages.

You can also use some of the out of the box controls that are available. In our example we will use the number input control.

## Step 1. Add the code component to a field in a form

1. In the design studio, select the [Data workspace](../getting-started/use-data-workspace.md).

1. Select the **Feedback** table.

1. Select **Forms** and then choose to edit the **simple contact us form**.

1. Select **+ Add field** and choose the **Rating** field.

1. Position the **Rating** field on the form.

1. With the **Rating** field selected, choose **+ Component** and select the **Number input** component.

    :::image type="content" source="media/component-framework/add-component-to-form.png" alt-text="Add component to form.":::

1. Configure the control to have a **Type** of **Whole Number** and a **Static value** of **1**.

1. Select **Done**.

1. Select **Save** and **Publish form**.

## Step 2. Configure form component on webpage

In the following steps we will configure the existing feedback page, you can also [create your own page](../getting-started/first-page.md) and add your own [form](../getting-started/add-form.md) component.

1. In the **Pages** workspace, select the **Contact us** page.

1. The ratings field should appear on the form with the message **Enable custom component to see this field in preview**.

1. Select the field and choose **Edit field**.

1. Select the **Enable custom component** field.

    :::image type="content" source="media/component-framework/enable-code-component.png" alt-text="Enable custom component in design studio.":::

1. Select **OK**.

1. When you preview the site, you should see the custom component enabled.

    :::image type="content" source="media/component-framework/custom-component-on-form.png" alt-text="Custom component on a form.":::

## Next steps

[Overview: Use code components in Power Pages](component-framework.md)

### See also

- [Power Apps component framework overview](/power-apps/developer/component-framework/overview)
- [Create your first component](/power-apps/developer/component-framework/implementing-controls-using-typescript)
- [Add code components to a field or table in model-driven apps](/power-apps/developer/component-framework/add-custom-controls-to-a-field-or-entity)

---

## Publish code components on Marketplace | Microsoft Docs

Source: [publish-components-marketplace.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/publish-components-marketplace)

*After you have tested your code components and want it to distribute to others to use it, you must publish it on Microsoft Marketplace.*

# Publish code components on Marketplace

After you have tested your code components and want it to distribute to others to use it, you must publish it on Microsoft Marketplace.

For detailed information on how to publish your code components on Marketplace, see [Publish your app on Marketplace](/power-platform/developer/appsource/publish-app).

---

## Customize the Editable Grid Control

Source: [customize-editable-grid-control.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/customize-editable-grid-control)

*Learn how to customize the editable grid control with custom cell renderers and editors for specialized visuals and interactions. Get started.*

# Customize the editable grid control

This article explains how to customize the editable grid control in Power Apps to meet specialized visual and interaction requirements. Use the [Power Apps grid control](../../maker/model-driven-apps/the-power-apps-grid-control.md) extensibility APIs to build a grid customizer code component with custom cell renderers and editors.

:::image type="content" source="../../maker/model-driven-apps/media/power-apps-grid-custom-renderers.png" alt-text="Screenshot of custom cell renderers in the Power Apps editable grid control." lightbox="../../maker/model-driven-apps/media/power-apps-grid-custom-renderers.png":::

## Grid customizer control

A grid customizer is a PCF control that implements the Power Apps grid control customizer interface. This interface allows you to define the React element that renders when a grid cell is in read-only mode (the cell renderer) or in edit mode (the cell editor). Multiple grid customizer controls can exist in an environment, but each grid can only have a single grid customizer control assigned. You might decide that a separate customizer control is needed for each grid you want to modify, or you might choose to reuse the same customizer control for multiple grids.

### Implement a grid customizer control

To implement a grid customizer control, you first need to be familiar with the steps to [Create and build a code component](create-custom-controls-using-pcf.md) and you must have access to the template control.

The template control is included in the [PowerApps-Samples](https://github.com/microsoft/PowerApps-Samples) GitHub repository. You need to clone or download the repo to access the files located here: [PowerApps-Samples/component-framework/resources/GridCustomizerControlTemplate](https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework/resources/GridCustomizerControlTemplate)

1. Open the `GridCustomizerControlTemplate` folder using Visual Studio Code.
1. In a terminal window, run `npm install`.
1. Create your custom cell renderers and editors.

   The customization code is in the **customizers** folder.
   - `CellRendererOverrides.tsx` includes cell renderer customizers per data type.
   - `CellEditorOverrides.tsx` includes cell editor customizers per data type.

   Modify these files to add react elements to render when a cell is in read-only (cell renderer) or in edit (cell editor) mode.

   Each file exports an object mapping the column data type to a function returning a react element to render inside the cells for that column type.


   ```typescript
   /**
    * Provide cell renderer overrides per column data type.
   */
    export interface CellRendererOverrides {
      [dataType: string]: (props: CellRendererProps, rendererParams: GetRendererParams)
      => React.ReactElement | null | undefined; 
   };

   /**
    * Provide cell editor overrides per column data type.
   */
    export interface CellEditorOverrides {
      [dataType: string]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams)
      => React.ReactElement | null | undefined; 
   };
   ```

   > [!NOTE]
   > If the function returns null or undefined, the grid uses the internal renderer or editor for the targeted cells.
    
1. After defining your custom cell renderers and editors, **package** the grid customizer control and **import** it to your Power Apps environment. Alternatively, use the [pac pcf push](/power-platform/developer/cli/reference/pcf#pac-pcf-push) command.
1. After publishing the grid customizer control, open the **Customize the system** panel from the **Settings > Customizations** menu.

   :::image type="content" source="media/customize-editable-grid-settings-customize-system.png" alt-text="Screenshot of the Settings and Customizations menu used to open Customize the system.":::

1. From the entities node, select an entity that your customizer control targets (for example, Account).  
1. From the right panel, select the **Controls** tab.

   :::image type="content" source="media/customize-editable-grid-control-tab.png" alt-text="Screenshot of the Controls tab for the selected entity in Customize the system.":::

1. From the **Controls** list, add the **Power Apps grid control**.

   :::image type="content" source="media/customize-editable-grid-add-power-apps-grid-control.png" alt-text="Screenshot of the Controls list used to add the Power Apps grid control." lightbox="media/customize-editable-grid-add-power-apps-grid-control-full.png":::

1. In the **Properties** panel, set the **Customizer control** property to the full logical name of your grid customizer code component.

   Full logical name = `{publisher prefix}_{namespace}.{control name}`

   :::image type="content" source="../../maker/model-driven-apps/media/power-apps-grid-assign-customizer-control.png" alt-text="Screenshot of a grid customizer code component assigned to the Customizer control property." lightbox="media/power-apps-grid-assign-customizer-control-full.png":::
 
1. **Save and publish** your customizations for this entity.
1. Test your customizer by opening the main grid for the customized entity.
1. Repeat steps 6-11 for any other entities whose grid needs a grid customizer control.

## Best practices

- Cell renderers and editors are user interface components. Don't use them to mutate data or metadata of the grid.
- The customizer controls should be lightweight and fast so they don't affect overall grid performance.
- To maintain the design consistency, follow [Fluent design principles](https://www.microsoft.com/design/fluent/#/) and use [Fluent controls](https://developer.microsoft.com/en-us/fluentui#/controls/web) in your customizers.
- Ensure your custom renderer or editor is accessible.
- The customizer function should be pure since the grid calls it multiple times to get customized elements and expects the return value to be consistent.
- The grid might dispose a customizer element at any time and call to get a new one at any time. Ensure to dispose of any internal state on unmount to prevent memory leaks.
- Don't use renderers to override the values in the grid since the server doesn't use the new values to do filtering or sorting.

## Example

You can find an example of a customized editable grid control here: [Customized editable grid](sample-controls/customized-editable-grid-control.md).

### See also

[Power Apps component framework overview](overview.md)<br/>
[Create your first code component](implementing-controls-using-typescript.md)<br/>
[Learn Power Apps component framework](/training/paths/use-power-apps-component-framework)

---

## Bring intelligence into your components using Agent APIs (preview)

Source: [bring-intelligence-using-agent-apis.md](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/bring-intelligence-using-agent-apis)

*Learn about how you can integrate Copilot Studio topics into your custom components using Agent APIs*

# Bring intelligence into your component using Agent APIs (preview)



Agent APIs are a set of interfaces introduced in Microsoft Power Apps that allow components to interact with topics created in Microsoft Copilot Studio. These APIs are available in two forms:

- `Context.Copilot` methods used for PCF controls. This is the subject of this article.
- [Xrm.Copilot namespace used for client scripts in model-driven apps.](../model-driven-apps/clientapi/bring-intelligence-using-agent-apis.md)

These APIs are designed to enhance integration with Microsoft Copilot Studio, enabling more intelligent and responsive app experiences. The APIs use a single Copilot Studio agent that is either:
- App assistant agent selected in the model app designer of custom apps. See more at [Working with an app assistant agent](../../maker/model-driven-apps/add-agents-to-app.md#working-with-an-app-assistant-agent).
- Model app containing lead or opportunity table, which implicitly uses the "Copilot in Dynamics 365 Sales" agent.

|API|Description|
|---------|---------|
|[copilot.executeEvent](reference/copilot/executeevent.md)|Executes a Microsoft Copilot Studio topic based on the registered Event Name. Returns an array of type [MCSResponse](../mcsresponse.md).|
|[copilot.executePrompt](reference/copilot/executeprompt.md)|Executes a Microsoft Copilot Studio topic based on the trigger queries registered in the topic. Returns an array of type [MCSResponse](../mcsresponse.md).|

## Accessibility

When creating a code component, ensure the following best practices in [code component accessibility checks](code-components-best-practices.md#check-accessibility) are followed to have an accessible experience.

### Related articles

[FAQ for Agent APIs and Agent Response component](../../maker/common/faq-agent-api-component.md)  
[Copilot](reference/copilot.md)  
[executeEvent](reference/copilot/executeevent.md)  
[executePrompt](reference/copilot/executeprompt.md)  
[Working with an app assistant agent](../../maker/model-driven-apps/add-agents-to-app.md#working-with-an-app-assistant-agent)  
[Power Apps component framework overview](overview.md)  
[Create your first code component](implementing-controls-using-typescript.md)  
[Learn Power Apps component framework](/training/paths/use-power-apps-component-framework)  
[Xrm.Copilot (Client API reference)](../model-driven-apps/clientapi/reference/xrm-copilot.md)  
[Add agent response with the form designer (preview)](../../maker/model-driven-apps/form-designer-add-configure-agent-response.md)

