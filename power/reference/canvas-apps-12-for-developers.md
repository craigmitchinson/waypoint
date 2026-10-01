# Power Apps Canvas Apps — For Developers

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 13

## Contents

1. [Use code view for canvas app controls](#use-code-view-for-canvas-app-controls)
2. [Source code files for canvas apps (pa.yaml)](#source-code-files-for-canvas-apps-payaml)
3. [Canvas apps for enterprise developers, partners, and ISVs](#canvas-apps-for-enterprise-developers-partners-and-isvs)
4. [Custom connectors for canvas apps](#custom-connectors-for-canvas-apps)
5. [Integrate canvas apps into websites and other services](#integrate-canvas-apps-into-websites-and-other-services)
6. [Develop offline-capable canvas apps](#develop-offline-capable-canvas-apps)
7. [Canvas component overview](#canvas-component-overview)
8. [Component library](#component-library)
9. [Component library application lifecycle management (ALM)](#component-library-application-lifecycle-management-alm)
10. [Map input fields of a component](#map-input-fields-of-a-component)
11. [Add multimedia to a component](#add-multimedia-to-a-component)
12. [Behavior formulas for components (experimental)](#behavior-formulas-for-components-experimental)
13. [Canvas component properties](#canvas-component-properties)

---

## Use code view for canvas app controls

Source: [code-view.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/code-view)

*Learn how to use the code view in Microsoft Power Apps Studio to understand your canvas app's functionality.*

# Use code view for canvas app controls 

Use the code view feature to look at the underlying code for each control on your app's screens. The code uses an improved format that's a subset of YAML.

With code view you can:

- View the code for each control on your screen.
- Copy the code for a control and share it outside of Power Apps Studio.
- Paste the code for a control and create a new control based on it.

## View, copy, and paste code

Code view shows the code for the selected control and all its child controls.

Code view lets you copy and paste code to any screen in your app or outside of Power Apps to duplicate the control. This feature is helpful when controls are highly customized and you want to share or duplicate them.

### View code

1. Open your app for [editing](edit-app.md) in Power Apps Studio.

1. Right-click the control in the tree view or on the screen, and then select **View code**.

    :::image type="content" source="media/code-view/view-code.png" alt-text="Screenshot of the tree view in Power Apps Studio, with the View code option on a control's context menu highlighted.":::

> [!TIP]
> Use the keyboard shortcut `Ctrl+F` to find a specific string in the code.

### Copy and paste code

1. To copy the code of a selected control:
   - Use the menu to copy.
   - Use the shortcut <kbd>Ctrl</kbd>+<kbd>C</kbd>.
   - When viewing your code in the code view popup, select **Copy code**.
1. To add a new control from the code:

   - Use the menu to paste.
   - Use the shortcut <kbd>Ctrl</kbd>+<kbd>V</kbd>.

     :::image type="content" source="media/code-view/paste-code.png" alt-text="Screenshot of the tree view in Power Apps Studio, with the Paste code option highlighted on a control's context menu.":::

  > [!IMPORTANT]
  > Use the YAML format that Power Apps Studio generates. The code is validated before the new control is created.

## Browser clipboard access required

To paste code into Power Apps Studio using code view, your browser must have access to the clipboard. If you encounter issues pasting code, check your browser settings and ensure clipboard permissions are enabled for the site.

The first time you paste code, your browser will prompt you to grant clipboard access. Approve this request to enable pasting functionality in Power Apps Studio.

:::image type="content" source="media/code-view/edge-clipboard-warning.png" alt-text="Screenshot of edge asking for permission to access the clipboard content.":::

> [!TIP]
> If pasting doesn't work, check if clipboard access to Power Apps is blocked in your browser. In Microsoft Edge, you can manually add **https://make.powerapps.com** to the allowed sites for clipboard access in your browser settings.

## Known limitations

- You can't copy and paste or view the code for the **App Object**.
- You can't edit the code in the code view.

## Related information

- [Get started with formulas in canvas apps](working-with-formulas.md)
- [Use Find and Replace in the formula bar](formula-bar-find-replace.md)
- [Formula reference - canvas apps](formula-reference.md)
- [Power Fx YAML formula grammar](/power-platform/power-fx/yaml-formula-grammar)
- [Understand app functionality through code view (video)](https://youtu.be/qwXfvs9wzFY?feature=shared)

---

## Source code files for canvas apps (pa.yaml)

Source: [power-apps-yaml.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/power-apps-yaml)

*Learn about how to view source code files for canvas apps.*

# View source code files for canvas apps

Use the source code for a canvas app to review changes made by makers in Power Apps Studio. The generated canvas app YAML code is read-only and can't be modified. Any changes to the file are ignored and might be lost.

> - The YAML schema is in active development, and the content might be incomplete.
> - The current static schema for ***.pa.yaml** files is available [here](https://raw.githubusercontent.com/microsoft/PowerApps-Tooling/refs/heads/master/schemas/pa-yaml/v3.0/pa.schema.yaml).

Power Fx and YAML are the languages used for Power Apps source code. YAML is valued for its human-readable format and benefits from a wide array of editors, tools, and libraries for manipulation.

## Access source code files

You have access to the source code files if you're using the [Power Platform Git Integration](/power-platform/alm/git-integration/overview), eliminating the need for **.msapp** files.

The Power Apps Studio creates the source code for canvas apps, which is stored as *.pa.yaml files within the **.msapp** file. The **.msapp** file is a binary file that contains a collection of files, including the source code.

> [!TIP]
> To effectively use application lifecycle management (ALM), it's recommended to use solutions. [Canvas apps package](export-import-app-package.md) doesn't support ALM and should only be used for basic import and export capabilities when Dataverse isn't available.

You can also get the source code files either from the **.msapp** file or by using [Power Platform CLI](/power-platform/developer/cli/introduction).

The ***.pa.yaml** files can be found in the **\Src** folder of the extracted **.msapp**.

> [!Important]
> Only files located in the **\Src** directory of the extracted **.msapp** are intended for use with source control.
> The JSON files in the **.msapp** shouldn't be used as source code because those aren't stable between save and load cycles.

### Download and Extract the pa.yaml files using Power Platform CLI

Connect to your environment using Power Platform CLI and then use the following commands:

1. To list the canvas apps in your current environment, use the command: [pac canvas list](/power-platform/developer/cli/reference/canvas#pac-canvas-list).
1. To extract the source code files, use the command: [pac canvas download](/power-platform/developer/cli/reference/canvas#pac-canvas-download) with the [parameter -d](/power-platform/developer/cli/reference/canvas#--extract-to-directory--d).


### Extract source code files from a .msapp file

To extract source code files from a [.msapp file](export-import-single-app.md#export-msapp-files-in-power-apps), you have two options:

1. Manually unzip the **.msapp** file.
1. Alternatively, you can use the following command: 

```powershell
 Expand-Archive -Path "C:\path\to\yourFile.msapp" -DestinationPath "C:\path\to\destination"
```

## File structure for a .msapp file

For older **.msapp** files without the \src folder, follow these steps to generate source code files:

1. Import and resave and download the new **.msapp** in Power Apps Studio.
1. After that, you can proceed to [extract the source code files](#extract-source-code-files-from-a-msapp-file).

In the **\src** folder, find the following files and folders:

- **App.pa.yaml**: Represents the App.
- **[screen Name].pa.yaml**: One file for each screen, representing the screen.
- **\Component**: A folder containing one file for each [component](create-component.md#create-an-example-component), represented as [component Name].pa.yaml.

Only ***.pa.yaml** files within the **\src** folder can be used as source code. Any other file shouldn't be used as source code.

## Power Apps YAML schema versions

Currently, the only active schema version of Power Apps source code is Source Code (*.pa.yaml). The following table shows the other historical formats:

|Format name|File extension|Description|
|-----------|-----------|-------|
| [Experimental](power-apps-yaml.md#experimental-format-fxyaml) | *.fx.yaml| Retired. Version used by the experimental [Power Apps Git version control](git-version-control.md) and [pac canvas unpack](/power-platform/developer/cli/reference/canvas#pac-canvas-unpack)—no longer in development.|
| [Early preview](power-apps-yaml.md#preview) | -  | Retired. The version used by code view, copy code, and paste code. There's no version information in this schema.|
| [Source code](power-apps-yaml.md#source-code-payaml) | *.pa.yaml files | Active. Includes enhancements and version details for source control. |

## Experimental format (*.fx.yaml)

This schema is retired.

This schema describes an experimental format used by the Power Platform CLI to process and convert canvas apps into a source code format. This format isn't actively developed anymore.

You can't directly convert ***.fx.yaml** files to the new formats. To convert older apps, package the canvas app as a **.msapp** file and import it into Power Apps Studio.

## Preview

This schema is retired.

This version was used by [Code view](code-view.md) during the [preview](working-with-experimental-preview.md#preview) period. It is designed to create canvas apps in Power Apps Studio, letting you easily copy and paste controls. In this version, the source code is used in Power Apps Studio instead of being converted, like the experimental format.

The format during preview was temporary and is no longer in use. You cannot paste code from the preview format.

Here are the changes made from the experimental format:

1. **ZIndex property removal**: The ZIndex property is removed. Instead, a screen is represented as an array of controls. The order of controls determines their stacking order. Normal controls are ordered in ascending order, while responsive controls are ordered in descending order.
1. **JSON object representation replacement**: The "As" syntax is no longer used to define the control type. Instead, the left side of the control's name identifier remains unique. Only properties that differ from the default values are serialized. Two new properties define the control type and default values:

- **Control**: Represents the control type in YAML.
- **Variant**: Identifies a variant of a control type, which might alter default property values, add or remove properties, or modify the behavior or layout of the control.

These properties are used for instantiating controls and don't accept Power Fx expressions.

## Source code (*.pa.yaml)

> [!IMPORTANT]
>
> - The YAML source code for canvas apps is actively being developed. The content may be incomplete and subject to change.
> - The **.pa.yaml** files are read-only and should only be used to review changes made in Power Apps Studio. These files are not used when an app is loading.
> - External editing, merging, and conflict resolution is supported only in [Power Platform Git Integration](/power-platform/alm/git-integration/overview).

This schema is designed for source control purposes and allows the use of a single YAML file.

Updates from the previous format include:

1. Grouping of Top-Level Node Elements:
    - The top-level keywords "App" and "Screens" are examples of how elements are now grouped in a top-level node.
2. Control Version Specification:
    - You can now specify the version of a control using the Control Keyword followed by the **@** operator. If no version is specified, the most current version of the control is used. The version is used to deserialize the properties of the source code. Runtime version of the control is defined by the authoring version.
3. Simplified Variant Names:
    - Not all controls require a variant.
4. Consistent ZIndex for All Controls:
    - All controls now use an ascending order to determine the ZIndex value, starting from 1. This behavior aligns with the [CSS 2 spec](https://drafts.csswg.org/css2/#z-index).

---

## Canvas apps for enterprise developers, partners, and ISVs

Source: [dev-enterprise-intro.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/dev-enterprise-intro)

*Learn about developing solutions with canvas apps for enterprise developers, partners, and ISVs.*

# Canvas apps for enterprise developers, partners, and ISVs

As a developer, you can extend canvas apps in Power Apps, enabling even more powerful solutions for organizations and customers.

## Canvas apps for enterprise developers

As an enterprise developer, empower your organization to build robust, tailored solutions on Power Apps:

- **Build custom connectors**: Develop custom connectors to connect to your organization's data and web services. [Learn more](/connectors/custom-connectors/)

- **Create canvas apps using Power Platform CLI**: Use [Microsoft Power Platform CLI](/power-platform/developer/cli/introduction) to create, pack (preview), and unpack (preview) canvas apps using a [custom connector](/connectors/custom-connectors/). More information: [Power Platform CLI - **pac canvas**](/power-platform/developer/cli/reference/canvas)

- **Build Azure Functions**: Craft Azure Functions to extend apps with custom server-side logic. [Learn more](/azure/azure-functions/app-service-export-api-to-powerapps-and-flow)

- **Embed apps**: Embed apps directly into your website experiences to create integrated solutions, surfacing apps where people in your organization already do their work. [Learn more](embed-apps-dev.md)

- **Build offline-capable apps**: Develop offline-capable apps so your users are productive whether they are online or offline. [Learn more](offline-apps.md)

## Canvas apps for ISVs and Microsoft partners

As a Microsoft partner or Independent Software Vendor (ISV), accelerate customer adoption by extending your products to integrate with your customers' data and business processes:

- **Build and certify custom connectors**: Bring your product into the Microsoft cloud by building a connector that enables Power Apps to talk to your service. [Learn more](/connectors/custom-connectors/submit-certification)

- **List your solution on Microsoft Marketplace**: Generate new leads for your business by building an app with Power Apps and publishing it to Microsoft Marketplace for new customers to find. [Learn more](/power-platform/developer/appsource/publish-app)

- **Get started today for free**: Sign-up for the Power Apps Developer Plan for free and start building apps in a dedicated developer environment. [Learn more](../developer-plan.md)

---

## Custom connectors for canvas apps

Source: [register-custom-api.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/register-custom-api)

*Learn about creating, using, sharing, and certifying custom connectors for canvas apps in Power Apps.*

# Custom connectors for canvas apps

Without writing any code, you can build workflows and canvas apps with [Azure Logic Apps](https://azure.microsoft.com/services/logic-apps), [Power Automate](https://make.powerautomate.com), and [Power Apps](https://powerapps.microsoft.com). To help you integrate your data and business processes, these services offer [180+ connectors](/connectors/) - for Microsoft services and products, as well as other services, such as GitHub, Salesforce, and Twitter.

Sometimes though, you might want to call APIs, services, and systems that aren't available as pre-built connectors. To support more tailored scenarios, you can build *custom connectors* with their own triggers and actions. We have a complete set of basic and advanced tutorials for custom connectors on the Connectors documentation site. We recommend that you start with the [custom connector overview](/connectors/custom-connectors/), but you can also go straight to the following topics for details on a specific area:

* [Create a custom connector from an OpenAPI definition](/connectors/custom-connectors/define-openapi-definition)

* [Create a custom connector from a Postman collection](/connectors/custom-connectors/define-postman-collection)

* [Create a custom connector from scratch](/connectors/custom-connectors/define-blank)

* [Use a custom connector from Power Apps](/connectors/custom-connectors/use-custom-connector-powerapps)

* [Share custom connectors in your organization](/connectors/custom-connectors/share)

* [Submit your connectors for Microsoft certification](/connectors/custom-connectors/submit-certification)

* [Custom connector FAQ](/connectors/custom-connectors/faq)

---

## Integrate canvas apps into websites and other services

Source: [embed-apps-dev.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/embed-apps-dev)

*Learn about how to embed canvas apps in websites and other services.*

# Integrate canvas apps into websites and other services
The apps that you build are often most useful when they're available right where people do their work. By embedding canvas apps in an iframe, you can integrate those apps into websites and other services, such as Power BI or SharePoint.

In this topic, we'll show you how to set parameters for app embedding; then we'll embed our Asset Ordering app in a website.

![Power BI dashboard with embedded app.](./media/embed-apps-dev/embed-dashboard.png)

> [!NOTE]
> - Only Power Apps users in the same tenant can access the embedded app.
> - Embedding canvas apps in any native desktop application isn't supported, which includes Andrioid and iOS. This excludes first-party integrations such as Power Apps in Teams.

You can also integrate canvas apps into SharePoint Online without using an iframe. More information: [Use the Power Apps web part](https://support.office.com/article/use-the-powerapps-web-part-6285f05e-e441-408a-99d7-aa688195cd1c).

## Set URI parameters for your app
If you have an app you want to embed, the first step is to set parameters for the Uniform Resource Identifier (URI), so that the iframe knows where to find the app. The URI is in the following form:

```
https://apps.powerapps.com/play/[AppID]?source=iframe
```
For GCC users

```
https://apps.gov.powerapps.us/play/[AppID]?source=iframe
```

> [!IMPORTANT]
> As of August 2019, the URI format has changed from https://web.powerapps.com/webplayer to https://apps.powerapps.com/play. Please update any embedded iframes to use the new URI format. References to the previous format will be redirected to the new URI to ensure compatibility.
>
> Previous format:
> 
> https\://web.powerapps.com/webplayer/iframeapp?source=iframe&appId=/providers/Microsoft.PowerApps/apps/[AppID]

The only thing you have to do is substitute the ID of your app for [AppID] in the URI (including '[' & ']'). We'll show you how to get that value shortly, but first here are all the parameters available in the URI:

* **[appID]** - It provides the ID of the app to run.
* **tenantid** - is an optional parameter to support guest access and determines which tenant to open the app from. 
* **screenColor** - is used to provide a better app loading experience for your users. This parameter is in the format [RGBA (red value, green value, blue value, alpha)](../canvas-apps/functions/function-colors.md) and controls the screen color while the app loads. It is best to set it to the same color as your app's icon.
* **source** - does not affect the app, but we suggest you add a descriptive name to refer to the source of the embedding.
* Lastly, you can add any custom parameters you want using the [Param() function](../canvas-apps/functions/function-param.md), and those values can be consumed by your app. They are added to the end of the URI, such as `[AppID]?source=iframe&param1=value1&param2=value2`. These parameters are read only during launch of the app. If you need to change them, you must relaunch the app. Note that only the first item after [appid] should have a "?"; after that use the "&" as illustrated here. 

### Get the App ID
The app ID is available on powerapps.com. For the app you want to embed:

1. In [powerapps.com](https://powerapps.microsoft.com), on the **Apps** tab, click or tap the ellipsis ( **. . .** ), then **Details**.
   
    ![Go to app details.](./media/embed-apps-dev/details.png)
1. Copy the **App ID**.
   
    ![Copy app ID from details.](./media/embed-apps-dev/app-id.png)
1. Substitute the `[AppID]` value in the URI. For our Asset Ordering app, the URI looks like this:
   
    ```
    https://apps.powerapps.com/play/76897698-91a8-b2de-756e-fe2774f114f2?source=iframe
    ```

You may need to allow pop-ups in browser when you embed an app in your website that uses [Launch()](functions/function-param.md) function to launch a webpage or an app.

## Embed your app in a website
Embedding your app is now as simple as adding the iframe to the HTML code for your site (or any other service that supports iframes, such as Power BI or SharePoint):

```html
<iframe width="[W]" height="[H]" src="https://apps.powerapps.com/play/[AppID]?source=website&screenColor=rgba(165,34,55,1)" allow="geolocation; microphone; camera"/>
```

Specify values for the iframe width and height, and substitute the ID of your app for `[AppID]`.

> [!NOTE]
> Include `allow="geolocation; microphone; camera"` in your iframe HTML code to allow your apps to use these capabilities on Google Chrome.

The following image shows the Asset Ordering app embedded in a Contoso sample website.

![Contoso website with embedded app.](./media/embed-apps-dev/contoso-website.png)

Keep the following points in mind for authenticating users of your app:

- If your website uses Microsoft Entra ID based authentication, no additional sign-in is required.
- If your website uses any other sign-in mechanism or is not authenticated, your users see a sign-in prompt on the iframe. After they sign-in, they will be able to run the app as long as the author of the app has shared it with them.

As you can see, embedding apps is simple and powerful. Embedding enables you to bring apps right to the places you and your customers work – websites, Power BI dashboards, SharePoint pages, and more.

---

## Develop offline-capable canvas apps

Source: [offline-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/offline-apps)

*Learn about how to develop offline-capable canvas apps so that your users are productive whether they are online or offline.*

# Develop offline-capable canvas apps

Mobile users often need to be productive even when they have limited or no connectivity. When you build a canvas app, you can perform these tasks:

- Open Power Apps Mobile and run apps when the device is not connected to the network.
- Determine when an app is offline, online, or in a metered connection by using the [Connection](functions/signals.md#connection) signal object.
- Synchronize data between your device and the server.

If your app connects to Dataverse, offline support is [**built-in**](../../mobile/canvas-mobile-offline-overview.md). Power Apps will allows you to download data to your device and upload changes back to Dataverse. If your app does not use Dataverse, you can use collections and leverage the [**LoadData** and **SaveData**](functions/function-savedata-loaddata.md) functions for basic storage when offline.

> [!NOTE]
> - Offline capability for canvas apps is available while running the apps using the native [Power Apps Mobile](https://powerapps.microsoft.com/downloads/) players on iOS, Android, and Windows.
> - Canvas apps running in web browsers can't run offline, even when using a web browser on a mobile device.
> - Canvas apps in Teams are limited to 1 MB of data through the LoadData and SaveData functions&mdash;useful for a small number of text strings, numbers, and dates. Use of images or other media is inappropriate for this limit. More information: [**LoadData** and **SaveData** function reference](functions/function-savedata-loaddata.md)

## Enable offline support in a Dataverse-based canvas app
For Microsoft Dataverse-based canvas apps, you must use the offline capability built-in with the [offline-first](../../mobile/canvas-mobile-offline-overview.md) experience.  For more information, see [Set up mobile offline for canvas apps](../../mobile/canvas-mobile-offline-setup.md) and [Working with canvas apps offline](../../mobile/canvas-mobile-offline-working.md). With the flip of a switch, your app can work with Dataverse data wherever you are, with or without a network connection. Just build your app with standard Power Fx formulas and the offline feature handles all the complexity for you. 

## Use LoadData and SaveData for all other connectors
This section includes an example using Twitter data.  An even simpler example that doesn't require a connection is included in the [**LoadData** and **SaveData** function reference](functions/function-savedata-loaddata.md).

Watch this video to learn how to create offline enabled canvas apps which don't use Dataverse data:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=60fd9b60-80a9-445b-bd4e-b7f4f068431e]

## Limitations

**LoadData** and **SaveData** combine to form a simple mechanism to store small amounts of data on a local device. By using these functions, you can add simple offline capabilities to your app.

These functions are limited by the amount of available app memory because they operate on an in-memory collection. Available memory can vary depending on the device, the operating system, the memory that Power Apps Mobile uses, and the complexity of the app in terms of screens and controls. If you store more than a few megabytes of data, test your app with expected scenarios on the devices on which you expect it to run. You'll generally have 30-70 megabytes of available memory.

The functions also don't automatically resolve merge conflicts when a device comes online. Configuration on what data is saved and how to handle reconnection is up to the maker when writing expressions.

After using **LoadData** to populate a collection, that collection cannot be used to update Dataverse data which includes a lookup field. Doing so will result in the lookup field not being updated.

For updates on offline capabilities, return to this topic, and subscribe to the [Power Apps blog](https://powerapps.microsoft.com/blog/).

## Overview

When you design offline scenarios, you should first consider how your apps work with data. Apps in Power Apps primarily access data through a set of [connectors](../canvas-apps/connections-list.md) that the platform provides, such as SharePoint, Office 365, and Microsoft Dataverse. You can also build custom connectors that enable apps to access any service that provides a RESTful endpoint. This could be a Web API or a service such as Azure Functions. All these connectors use HTTPS over the Internet, which means your users must be online for them to access data and any other capabilities that a service offers.

![Power Apps with connectors.](./media/offline-apps/online-app.png)

### Handling offline data

In Power Apps, you can filter, search, sort, aggregate, and manipulate data in a consistent way regardless of the data source. Sources range from in-memory collections in the app to lists created using Microsoft Lists to SQL databases and Dataverse. Because of this consistency, you can easily retarget an app to use a different data source. More importantly for offline scenarios, you can use local collections for data management with almost no changes to an app's logic. In fact, local collections are the primary mechanism for handling offline data.

## Build an offline app

To keep the focus on the offline aspects of app development, this topic illustrates a simple scenario focused around Twitter. You'll build an app that enables you to read Twitter posts and submit tweets while being offline. When the app comes online, the app posts tweets and reloads the local data.

At a high level, the app performs these tasks:

- When the user opens the app:

  - If the device is online, the app fetches data through the Twitter connector and populates a collection with that data.
  - If the device is offline, the app loads the data from a local cache file by using the [**LoadData**](../canvas-apps/functions/function-savedata-loaddata.md) function.
  - The user can submit tweets. If the app is online, it posts the tweets directly to Twitter and refreshes the local cache.

- Every five minutes while the app is online:

  - The app posts any tweets in the local cache.
  - The app refreshes the local cache and saves it by using the [**SaveData**](../canvas-apps/functions/function-savedata-loaddata.md) function.

### Step 1: Add Twitter to a blank phone app

1. Create a [blank canvas app](create-blank-app.md) with **Phone** layout.
1. On the **View** tab, select **Data sources**.
1. In the **Data** pane, select **Add data source**.
1. Select **New Connection** > **Twitter** > **Create**.
1. Enter your credentials, create the connection, and then close the **Data** pane.

### Step 2: Collect existing tweets

1. In the **Tree view** pane, select **App**, and then set its **OnStart** property to this formula:

    ```power-fx
    If( Connection.Connected,
        ClearCollect( LocalTweets, Twitter.SearchTweet( "PowerApps", {maxResults: 10} ) );
            Set( statusText, "Online data" ),
        LoadData( LocalTweets, "LocalTweets", true );
            Set( statusText, "Local data" )
    );
    SaveData( LocalTweets, "LocalTweets" );
    ```

    > [!div class="mx-imgBorder"]
    > ![Formula to load tweets.](./media/offline-apps/load-tweets.png)

1. In the **Tree view** pane, select the ellipsis menu for the **App** object, and then select **Run OnStart** to run that formula.

    > [!div class="mx-imgBorder"]
    > ![Run formula to load tweets.](./media/offline-apps/load-tweets-run.png)

    > [!NOTE]
    > The **LoadData** and **SaveData** functions might show an error in Power Apps Studio because browsers don't support them. However, they'll perform normally after you deploy this app to a device.

This formula checks whether the device is online:

- If the device is online, the formula loads up to 10 tweets with the search term "PowerApps" into a **LocalTweets** collection.
- If the device is offline, the formula loads the local cache from a file called "LocalTweets" if it's available.

### Step 3: Show tweets in a gallery

1. On the **Insert** tab, select **Gallery** > **Blank flexible height**.

1. Set the **Items** property of the [**Gallery**](controls/control-gallery.md) control to `LocalTweets`.

1. In the gallery template, add three [**Label**](controls/control-text-box.md) controls, and set the **Text** property of each label to one of these values:

    - `ThisItem.UserDetails.FullName & " (@" & ThisItem.UserDetails.UserName & ")"`
    - `Text(DateTimeValue(ThisItem.CreatedAtIso), DateTimeFormat.ShortDateTime)`
    - `ThisItem.TweetText`

1. Make the text in the last label bold so that the gallery resembles this example.

    > [!div class="mx-imgBorder"]
    > ![Gallery showing sample tweets.](./media/offline-apps/tweet-gallery.png)

### Step 4: Show connection status

1. Under the gallery, insert a label, and then set its **Color** property to **Red**.

1. Set the newest label's **Text** property to this formula:

    `If( Connection.Connected, "Connected", "Offline" )`

This formula determines whether the device is online. If it is, the label shows **Connected**; otherwise, it shows **Offline**.

### Step 5: Add a box to compose tweets

1. Under the connection-status label, insert a [**Text input**](controls/control-text-input.md) control, and rename it **NewTweetTextInput**.

1. Set the text-input box's **Default** property to `""`.

    > [!div class="mx-imgBorder"]
    > ![Gallery over status info and text-input box.](./media/offline-apps/status-input.png)

### Step 6: Add a button to post the tweet

1. Under the text-input box, add a **Button** control, and set its **Text** property to this value:

    `"Tweet"`

1. Set the button's **OnSelect** property to this formula:

    ```power-fx
    If( Connection.Connected,
        Twitter.Tweet( "", {tweetText: NewTweetTextInput.Text} ),
        Collect( LocalTweetsToPost, {tweetText: NewTweetTextInput.Text} );
            SaveData( LocalTweetsToPost, "LocalTweetsToPost" )
    );
    Reset( NewTweetTextInput );
    ```  

1. In the **OnStart** property for the **App**, add a line at the end of the formula:

    ```power-fx
    If( Connection.Connected,
        ClearCollect( LocalTweets, Twitter.SearchTweet( "PowerApps", {maxResults: 100} ) );
            Set( statusText, "Online data" ),
        LoadData( LocalTweets, "LocalTweets", true );
            Set( statusText, "Local data" )
    );
    SaveData( LocalTweets, "LocalTweets" );
    LoadData( LocalTweetsToPost, "LocalTweetsToPost", true );  // added line
    ```

    > [!div class="mx-imgBorder"]
    > ![Run formula to load tweets with uncommented line.](./media/offline-apps/load-tweets-save.png)

This formula determines whether the device is online:

- If the device is online, it posts the tweet immediately.
- If the device is offline, it captures the tweet in a **LocalTweetsToPost** collection and saves it to the device.

Then the formula resets the text in the text-input box.

### Step 7: Check for new tweets

1. On the right side of the button, add a **Timer** control.

    > [!div class="mx-imgBorder"]
    > ![Final apps.](./media/offline-apps/final-app.png)

1. Set the timer's **Duration** property to **300000**.

1. Set the timer's **AutoStart** and **Repeat** properties to **true**.

1. Set the timer's **OnTimerEnd** to this formula:

    ```power-fx
    If( Connection.Connected,
        ForAll( LocalTweetsToPost, Twitter.Tweet( "", {tweetText: tweetText} ) );
        Clear( LocalTweetsToPost );
        ClearCollect( LocalTweets, Twitter.SearchTweet( "PowerApps", {maxResults: 10} ) );
        SaveData( LocalTweets, "LocalTweets" );
   )
    ```

This formula determines whether the device is online. If it is, the app tweets all the items in the **LocalTweetsToPost** collection and then clears the collection.

## Test the app

1. Open the app using [Power Apps Mobile](https://powerapps.microsoft.com/downloads/) on a mobile device that's connected to the Internet.

    Existing tweets appear in the gallery, and the status shows **Connected**.

1. Disconnect the device from the Internet by enabling the device's airplane mode and disabling wi-fi.

    The status label shows that the app is **Offline**.

1. While the device is offline, write a tweet that includes **Power Apps**, and then select the **Tweet** button.

    The tweet is stored locally in the **LocalTweetsToPost** collection.

1. Reconnect the device to the Internet by disabling the device's airplane mode and enabling wi-fi.

    Within five minutes, the app posts the tweet, which appears in the gallery.

We hope this article gives you an idea of the capabilities that Power Apps has for building offline apps. As always, please provide feedback in our [forum](https://powerusers.microsoft.com/t5/PowerApps-Forum/bd-p/PowerAppsForum1) and share your examples of offline apps in the [Power Apps community blog](https://powerusers.microsoft.com/t5/PowerApps-Community-Blog/bg-p/PowerAppsBlog).

---

## Canvas component overview

Source: [create-component.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-component)

*Learn about how to create reusable components for canvas apps.*

# Canvas component overview

> [!NOTE]
> - This section explains canvas components that encompass low-code UI extensibility capabilities. Professional developers can also use the [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) to build code components.
> - You can also use canvas components in model-driven apps by using custom pages and the component library. For more information, see [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md).

Components are reusable building blocks for canvas apps. App makers can create custom controls to use inside an app, or across apps by using a [component library](component-library.md). Components can use advanced features such as custom properties and enable complex capabilities. This article introduces component concepts and some examples.

Components are useful when building larger apps that have similar control patterns. If you update a component definition inside the app, all instances in the app reflect your changes. Components also reduce duplication of effort by eliminating the need to copy and paste controls and improve performance. When you use a [component library](component-library.md), components help create collaborative development and standardize the look and feel in an organization.

To learn how to use components in canvas apps, watch this video:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=7ec063b0-df8e-4cf8-b407-72ce6132115f]

## Components in canvas apps

You can create a component from within an app as explained in this article, or by creating a new component inside a [component library](component-library.md). Use a component library when you need to use components across multiple app screens. You can also copy existing components into an existing or a new component library.

To create a component within an app, go to **Tree View**, select the **Components** tab, and then select **New component**:

![Create new custom component using tree view.](./media/create-component/insert-new-component-treeview.png "Create new custom component using tree view")

Selecting **New component** opens an empty canvas. Add controls as part of the component definition on the canvas. If you edit a component in the canvas, you update instances of the same component in other app screens. Apps that reuse an already created component can also receive component updates after you publish component changes.

You can select a component from the list of existing components in the left pane after you select a screen. When you select a component, you insert an instance of that component onto the screen, just as you insert a control.

Components available inside the app appear under the **Custom** category in a list of components inside the tree view. Components imported from component libraries appear under the **Library components** category:

![Insert components to the app.](./media/create-component/insert-components.png "Insert components to the app")

> [!NOTE]
> The components discussed in this article are different from the Power Apps component framework that enables developers and makers to create code components for model-driven and canvas apps. For more information, see [Power Apps component framework overview](../../developer/component-framework/overview.md).

## Custom properties

A component can receive input values and emit data if you create one or more custom properties. These scenarios are advanced and require you to understand [formulas](formula-reference.md) and binding contracts.

> [!NOTE]
> An experimental feature for enhanced component properties provides even more options for properties, including functions and behavior functions. For more information, see [Canvas component properties (experimental)](./component-properties.md)

**Input property** is how a component receives data to be used in the component. Input properties appear in the **Properties** tab of the right-hand pane if an instance of the component is selected. You can configure input properties with expressions or formulas, just as you configure standard properties in other controls. Other controls have input properties, such as the **Default** property of a **Text input** control.

**Output property** is used to emit data or component state. For example, the **Selected** property on a **Gallery** control is an output property. When you create an output property, you can determine what other controls can refer to the component state.

The following walk-through further explains these concepts.

## Create an example component

In this example, you'll create a menu component that resembles the following graphic. And you can change the text later to use it in multiple screens, apps, or both:

![Final gallery.](./media/create-component/menu-instance-new.png "Final gallery")

> [!NOTE]
> We recommend that you use a [component library](component-library.md) when creating components for reuse. Updating components inside an app only makes the component updates available inside the app. When using a component library, you get prompted to update components if components inside a library are updated and published.

### Create a new component

1. Create a [blank canvas app](create-blank-app.md).

1. In the **Tree View**, select **Components** and then select **New component** to create a new component.

    ![Create new custom component using tree view.](./media/create-component/insert-new-component-treeview.png "Create new custom component using tree view")

1. Select the new component in the left pane, select the ellipsis (**...**), and then select **Rename**. Type or paste the name as **MenuComponent**.

1. In the right-hand pane, set the component's width as **150** and its height as **250**, and then select **New custom property**. You can also set the height and width to any other value as appropriate.

    ![New property.](./media/create-component/new-property.png "New property")

1. In the **Display name**, **Property name**, and **Description** boxes, type or paste text as *Items*.

    ![Display name, property name, description boxes.](./media/create-component/property-names.png "Display name, property name, description boxes")

    Don't include spaces in the property name because you'll refer to the component by this name when you write a formula. For example, **ComponentName.PropertyName**.

    The display name appears on the **Properties** tab of the right-hand pane if you select the component. A descriptive display name helps you and other makers understand the purpose of this property. The **Description** appears in a tooltip if you hover over the display name of this property in the **Properties** tab.

1. In the **Data type** list, select **Table**, and then select **Create**.

    ![Data type of the property.](./media/create-component/property-data-type.png "Data type of the property")

    The **Items** property is set to a default value based on the data type that you specified. You can set it to a value that suits your needs. If you specified a data type of **Table** or **Record**, you might want to change the value of the **Items** property to match the data schema that you want to input to the component. In this case, you'll change it to a list of strings.

    You can set the property's value in the formula bar if you select the name of the property on the **Properties** tab of the right-hand pane.

    ![Custom input property on the Properties tab.](./media/create-component/properties-tab.png "Custom input property on the Properties tab")

    As the next graphic shows, you can also edit the property's value on the **Advanced** tab of the right-hand pane.

1. Set the component's **Items** property to this formula:

    ```power-fx
    Table({Item:"SampleText"})
    ```

    ![Formula.](./media/create-component/set-component-items.png "Formula")

1. In the component, insert a blank vertical **Gallery** control and select **Layout** on the property pane as **Title**.

1. Make sure that the property list shows the **Items** property (as it does by default). Then set the value of that property to this expression:

    ```power-fx
    MenuComponent.Items
    ```

    This way, the **Items** property of the **Gallery** control reads and depends on the **Items** input property of the component.

1. (Optional) Set the **Gallery** control's **BorderThickness** property to **1** and its **TemplateSize** property to **50**. You can also update values for border thickness and template size to any other value as appropriate.

### Add component to a screen

Next, add the component to a screen and specify a table of strings for the component to show.

1. In the left pane, select the list of screens, and then select the default screen.

    ![Default screen.](./media/create-component/default-screen.png "Default screen")

1. On the **Insert** tab, open the **Components** menu, and then select **MenuComponent**.

    ![Insert component.](./media/create-component/insert.png "Insert component")

    The new component is named **MenuComponent_1** by default.

1. Set the **Items** property of **MenuComponent_1** to this formula:

    ```power-fx
    Table({Item:"Home"}, {Item:"Admin"}, {Item:"About"}, {Item:"Help"})
    ```

    This instance resembles this graphic, but you can customize the text and other properties of each instance.

    ![Final gallery.](./media/create-component/menu-instance-new.png "Final gallery")

### Create and use output property

So far, you created a component and added it to an app. Next, create an output property that reflects the item that the user selects in the menu.

1. Open the list of components, and then select **MenuComponent**.

1. In the right-hand pane, select the **Properties** tab, and then select **New custom property**.

1. In the **Display name**, **Property name**, and **Description** boxes, type or paste **Selected**.

1. Under **Property type**, select **Output**, and then select **Create**.

    ![Property type as output.](./media/create-component/output-property-type.png "Property type as output")

1. On the **Advanced** tab, set the value of the **Selected** property to this expression, adjusting the numeral in the gallery name if necessary:

    ```power-fx
    Gallery1.Selected.Item
    ```

    ![Advanced pane.](./media/create-component/advance.png "Advanced pane")

1. On the default screen of the app, add a label, and set its **Text** property to this expression, adjusting the numeral in the component name if necessary:

    ```power-fx
    MenuComponent_1.Selected
    ```

    **MenuComponent_1** is the default name of an instance, not the name of the component definition. You can rename any instance.

1. While holding down the Alt key, select each item in the menu.

    The **Label** control reflects the menu item that you selected most recently.

## Scope

Input and output properties clearly define the interface between a component and its host app.  By default, the component is encapsulated so that it's easier to reuse the component across apps, requiring the use of the properties to pass the information in and out of the component. Scope restrictions keep the data contract of a component simple and cohesive, and it helps enable component-definition updates&mdash;especially across apps with component libraries.

But there are times when a component might want to share a data source or a variable with its host. This sharing is especially useful when the component is only intended for use in one particular app. For these cases, you can directly access app level information by turning on the **Access app scope** switch in the component's property pane:

![Access app scope switch in component property pane](media/create-component/access-app-scope.png)

When you turn on **Access app scope**, the following items are accessible from within a component:

- Global variables
- Collections
- Controls and components on screens, such as a TextInput control
- Tabular data sources, such as Dataverse tables

When you turn this setting off, the component can't access any of the preceding items. [**Set**](functions/function-set.md) and [**Collect**](functions/function-clear-collect-clearcollect.md) functions are still available but the resulting variables and collections are scoped to the component instance and aren't shared with the app.

Non-tabular data sources, such as Azure Blob Storage or a custom connector, are available whether this setting is turned on or off. Think of these data sources more like referencing an environment resource rather than an app resource. When a component is brought into an app from a component library, these data sources from the environment are also brought in.

Components in a component library can never access app scope, as there's no single app scope to refer to. So, this setting isn't available in this context, and is effectively off. Once imported into an app, and if customization is allowed by the component maker, the switch can be enabled, and the component can be modified to use the app scope.

> [!NOTE]
> - You can insert instances of components into a screen within a component library, and preview that screen for testing purposes.
> - Component library doesn't display when using [Power Apps Mobile](https://powerapps.microsoft.com/downloads/).

## Import and export components (retired)

> [!NOTE]
> This feature is retired. [Component libraries](component-library.md) are the recommended way to reuse the components across the apps. When using component library, an app maintains dependencies on the components it uses. The app maker is alerted when the updates to dependent components become available. Hence, all new reusable components should be created within the component libraries instead.

The ability to import and export components is disabled by default since this feature is retired. While the recommended method to work with components is to use [component libraries](component-library.md), you can still enable this feature on a per-app basis as an exception until the feature is removed. To do this, [edit your app](edit-app.md) in Power Apps Studio and then, go to **Settings** > **Upcoming features** > **Retired** > Set **Export and import components** to On.

![Enable export and import of components.](./media/create-component/settings-enable-import-export.png "Enable export and import of components")

After you enable this feature, you can use the following capabilities to import and export components.

### Import components from another app

To import one or more components from one app into another app, select **Import components** from the **Insert** menu and then use the **Custom** drop-down menu. Or use **Components** in the tree view on the left pane.

A dialog box lists all apps that contain components that you have permission to edit. Select an app, and then select **Import** to import the most recent published version of all of the components in that app. After you import at least one component, you can edit your copy and delete any that you don't need.

![Import components dialog box.](./media/create-component/import-component-screen.png "Import components dialog box")

You can save an app with existing components to a file locally and then reuse the file by importing it. You can use the file to import components to another app.

If the app contains a modified version of the same component, you're prompted to decide whether to replace the modified version or cancel the import. 

After you create components in an app, other apps can consume the components from this app by importing them.

> [!NOTE]
> If a component that you imported from another app is modified in the original app, you must manually import the component again in the consuming app to receive latest component changes. Use component libraries instead to work with [component updates](component-library.md#update-a-component-library) more efficiently.

### Export components from your app

You can export components to a file and download them for import to another app.

Select the **Export components** option from the **Components** section in the tree view on the left pane:

![Export components tree view.](./media/create-component/export-components-treeview.png "Export components tree view")

You can also use the **Insert** menu and then select the **Custom** drop-down menu instead.

![Export components insert menu.](./media/create-component/export-components-insert-menu.png "Export components insert menu")

Selecting **Export components** downloads the components to a file:

![Download component.](./media/create-component/download-component.png "Download component")

The downloaded component file uses the *.msapp* file name extension. 

### Import components from exported components file

To import components from an exported components file, select **Import components** from either **Insert** menu and then use the **Custom** drop-down menu or use **Components** in the tree view on the left pane. From the components dialog box, select **Upload file** instead of selecting any other components or apps:

![Import component file.](./media/create-component/import-component-file.png "Import component file")

From the **Open** dialog box, browse to the location of the component file and select **Open** to import components inside the app.

### Import components from exported app

You can save an app locally by selecting **File** > **Save As**:

![Save app.](./media/create-component/save-app-locally.png "Save app")

After you save the app, you can reuse its components by importing them from a file. For more information, see the previous section on importing components from an exported components file.

## Known limitations

- When you have two or more instances of the same component in an app, you can't configure a custom input property to a custom output property value across same or different instances. This action results in a circular reference warning message. To work around this limitation, create a copy of the component inside your app.
- Adding and running Power Automate flows in component libraries isn't supported.
- You can't save data sources or controls that include data from those data sources (such as forms, fluid grids, or data tables) with components.
- You can't insert a component into a gallery or a form (including SharePoint form).
- Components don't support the [**UpdateContext**](./functions/function-updatecontext.md) function, but you can create and update variables in a component by using the [**Set**](functions/function-set.md) function. The scope of these variables is limited to the component, but you can access them from outside the component through custom output properties.

## Next steps

Learn to use a [component library](component-library.md) to create a repository of reusable components.

### See also

- [Component library](component-library.md)
- [Component library application lifecycle management (ALM)](component-library-alm.md)
- [Map input fields of a component](map-component-input-fields.md)
- [Add multimedia to a component](component-multimedia.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Component library

Source: [component-library.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-library)

*Learn about working with a library of reusable components for canvas apps.*

# Component library

In the [overview](create-component.md) article for creating components, you learn about components inside a canvas app. As you create components inside an app, you can also create a library of components that you can reuse. By creating a component library, app makers can easily share and update one or more components with other makers.

Component libraries are containers of component definitions that make it easy to:

- Discover and search components.
- Publish updates.
- Notify app makers of available component updates.

> [!NOTE]
> Component libraries are the recommended way to reuse components across apps. When using a component library, an app maintains dependencies on the components it uses. The app maker is alerted when updates to dependent components become available. Hence, create reusable components within component libraries. An earlier Power Apps feature that allowed [importing components from one canvas app to another](create-component.md#import-and-export-components-retired) is retired.

## Difference between an app and a component library

A component library provides a centralized and managed repository of components for reusability.

The **Insert** pane on the left navigation defaults to a components tab if you create a component library. When you create an app, this view shows screens instead of components.

> [!NOTE]
> The screens in a component library are available for testing only. It provides library creators a way to quickly test the created components on an actual screen and also validate the update behavior as components are enhanced over time. To use the components from the component library, you must create an app that uses the component library.

You can preview component library components by using the screens inside the library with the play option. When you select the component tab, the play option is disabled. The component library doesn't display when using Power Apps Mobile.

> [!NOTE]
> The component library discussed in this article is different from the Power Apps component framework that enables developers and makers to create code components for model-driven and canvas apps. For more information, see [Power Apps component framework overview](../../developer/component-framework/overview.md).

## Working with component library

You can create a new component library or edit an existing component library from the same interface. Go to [Power Apps](https://make.powerapps.com) > select **More** from left navigation > select **Discover all** > select **Component libraries** from the **App enhancements** section. You can also pin **Component libraries** option to your Power Apps interface. For more information, see [Left navigation in Power Apps](intro-maker-portal.md#1--left-navigation-pane).

## Create an example component library

The steps to create components inside a component library are the same as creating components inside an app. You'll create a component library and then reuse the steps for creating components from [components overview example](create-component.md#create-an-example-component). Then you use the component library to provide the reusable components in a new app.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Component libraries** in the left navigation, and then select **New component library**.
   Alternatively, if you don't see **Component libraries** in the left nav, select **More** from the left navigation, select the **Discover all** button, and select **Component libraries** from the **App enhancements** section.

1. Name the component library *Menu components*; or provide a different name of your choice.

1. Follow the steps to create components from [components overview example](create-component.md#create-an-example-component). You don't have to open Power Apps Studio or create a new blank app, since you already created a new component library. Start with step 2.

    After following the steps to create components, follow the next set of steps to also [add components to a screen](create-component.md#add-component-to-a-screen) and the steps to [create output property](create-component.md#create-and-use-output-property).

1. After you complete the components creation and testing, save the component library by selecting the **Save** icon from the app actions.

    You also have an option to **Save with version notes** under the arrow menu next to the **Save** icon. A version note is useful to retrieve versions of a component library and for upgrading the components used in apps from this component library. For more details about app actions, see the [Understand Power Apps Studio](power-apps-studio.md#save) article.

    ![Version note when saving component library.](./media/component-library/save-component-libray-version-note.png "Version note when saving component library")

    > [!TIP]
    > A version note is useful when reviewing versions of a component library and for the app makers using your component library to review changes and update apps consuming these components as needed. Go to [update a component library](component-library.md?#update-a-component-library) for more details.

1. You can publish a saved component library. Only published component library updates are available for apps that consume a component library. Select the **Publish** icon from the app actions to publish the component library version:

    ![Publish component library version.](./media/component-library/publish-component-library.png "Publish component library version")

## Library component customization

When you create a component inside a component library, you can set whether apps that use the library components can customize the component. By default, this setting is **On** within the components properties. Turn this setting **Off** to remove the ability to customize the component in other apps.

:::image type="content" source="media/component-library/allow-customization-on.png" alt-text="Option to allow customization to this component when being used by an app.":::

When you add a component that allows customization, you see an option to edit this component for more customization. The app makes a local copy, and you can make changes to the local component copy. The association with the component library is removed once you edit the component.

:::image type="content" source="media/component-library/edit-customizable-component.png" alt-text="Edit a component allowed for customization.":::

Selecting **Edit component** prompts you to copy the component locally for customization.

If you don't allow the components to be customized, the consuming apps don't show the option to edit the component.

:::image type="content" source="media/component-library/allow-customization-off.png" alt-text="No option to edit component inside consuming app.":::

In this case, the only way to edit the component is to edit the component library where the component is stored.

## Import from a component library

After you create and publish a component library, apps can consume the components from this component library by importing the library. You can also [share a component library](component-library.md#component-library-permissions).

To import from a component library, edit an existing app or create a new app. After the app opens in canvas app studio, select **Insert** or the **+** on the left navigation. Then select **Get more components** to list the component libraries available in the current environment:

![Get more components.](./media/component-library/get-more-components.png "Get more components")

You see the list of component libraries available in the current environment on the right side of the screen. Select an individual component from a component library. Or use **Select all** to import all of the components from the library at once:

![Import components.](./media/component-library/components.png "Import components")

> [!NOTE]
> If a maker doesn't see the component library listed in the import section, ensure the component library is shared with the maker. For more details, see [component library permissions](component-library.md#component-library-permissions).

> [!NOTE]
>You can select and import more than one component and across different component libraries.  

Components available inside the app are listed under the **Custom** category in the list of components in the **Insert** pane. Components available from imported component libraries are listed under the **Library components** category:

![Insert components to the app.](./media/component-library/insert-components.png "Insert components to the app")

## Update a component library

You can modify an existing component library and save any changes with other version notes. However, the updated component library version must be published for use in existing apps that use the component library. The [example component library](component-library.md#create-an-example-component-library) steps explain how to publish a component library after saving it.

There are two ways apps using the components from library can get the latest changes.

### Method 1: Component update notification on app edit

Makers of other apps get notified when updated components are available. The notification appears when makers edit the apps in canvas app studio. They can choose to update the components:

![Update available.](./media/component-library/update-available.png "Update available")

Select **Review**, and you see the option to update the component:

![Update component.](./media/component-library/update-components.png "Update component")

Version notes you add when publishing the component library version appear here.  

Select **Update** to update the components.

### Method 2: Proactive check for updates

Use this method to check proactively for the app update while working on the app in Studio.

To do this check, select the **Insert component** panel on the left side, and then select the **Check for updates** icon.

![Check for latest components](./media/component-library/check-for-updates.png "Check for latest components")

If there are updates for components used from the library, you get a message to review and get the latest changes. When you review and update, the app updates with the latest components.

### Updating component from a component library in a consuming app

If you import a component from a component library, you can't edit it inside the consuming app. If you select **Edit component**, you see an option to create a copy of the component inside the current app so you can make changes:

![Edit library component.](./media/component-library/edit-library-component.png "Edit library component")

If you select **Create a copy**, the component is copied to the local app. The local copy of the component appears under the **Custom** category in the **Insert** pane. This local copy of the component doesn't receive updates if a new version of the originating component library is published later.

> [!NOTE]
> The in-use instances of components from the component library aren't affected after you create a local copy of a component, and remain linked to the component library definition. Only instances of the locally copied components (from **Custom** category) are considered to be the local app components.

## Deleting a component library

If a component library is referenced by a canvas app, it can't be deleted. This condition is true for both Power Platform and non-Power Platform environments.  Remove the component from the app before deleting the library.  You can find information about the apps using the component library in either solution dependencies view or in the message, which is shown when you try to delete library.

![Delete library component.](./media/component-library/delete-component-library-dependencies.png "Delete library component")

## Component library permissions

Sharing a component library works the same way you share a canvas app. When you share a component library, you allow others to reuse the component library. Once shared, others can edit the component library and import components from this shared component library for creating and editing apps. If shared as a co-owner, a user can use, edit, and share a component library but not delete or change the owner.

Additional considerations when sharing component libraries to security groups:

- You can't use the [sharing UI](share-app.md) when sharing component libraries created as part of a solution. Instead, use [Set-PowerAppRoleAssignment cmdlet](/powershell/module/microsoft.powerapps.administration.powershell/set-adminpowerapproleassignment#parameters) with **CanEdit** permission level to share the component libraries with the selected security group.
- Component libraries created in a Power Platform environment [without a Dataverse database](/power-platform/admin/create-environment#create-an-environment-in-the-power-platform-admin-center) shared as **Co-owner** automatically grant **CanEdit** permission to the selected security group.

## Known limitations

- [Known limitations](create-component.md#known-limitations) that apply to components also apply to component libraries.
- You can't import components from a locally saved component library. You can download a component library by selecting **Download a copy** from the app actions. But if you try to import that saved component library, you see the following error message:

    ![Import component library file.](./media/component-library/import-component-library-file.png "Import component library file")

- If you're importing an app and a component library in an environment for the first time, ensure the app uses the latest version of the component included with the component library. Otherwise, the app doesn't receive updates after the import. The app recognizes and prompts for the updated version upon subsequent component library imports to the same environment.
- Code components aren't supported inside component libraries.

### See also

- [Canvas components](create-component.md)
- [Component library application lifecycle management (ALM)](component-library-alm.md)
- [Map input fields of a component](map-component-input-fields.md)
- [Add multimedia to a component](component-multimedia.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Component library application lifecycle management (ALM)

Source: [component-library-alm.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-library-alm)

*Learn about the application lifecycle management (ALM) with component libraries*

# Component library application lifecycle management (ALM)

A [component library](component-library.md) is a special type of canvas app that can contain one or more canvas components. These library components can then be used by all the other canvas apps in the environment. This capability enables you to create reusable shared components across all apps in an environment, unlike [app-level components](create-component.md#components-in-canvas-apps) that are restricted to one app.

To use a component from a component library, you have to first import the component into the canvas app. Once imported, you can then add the component to any app screen. Any updates in the component definition from the component library will prompt you to review and incorporate the change [on demand](component-library.md#method-2-proactive-check-for-updates) or when the [app is opened for editing](component-library.md#method-1-component-update-notification-on-app-edit). Component libraries and dependent apps can also be moved to another environment using standard [Microsoft Dataverse solutions](/power-platform/alm/solution-concepts-alm).

> [!NOTE]
> In this article, the term "import" refers to importing a component from a component library to an app, and shouldn't be confused with importing a solution into Dataverse.

When a component from a component library is imported into a canvas app, that component's definition is copied into the definition of the canvas app. Once a component definition has been imported, the app is "self-contained" as far as that component definition is concerned. The app maker can choose to [edit the component](component-library.md#library-component-customization), and create  local instances of the component within the app. At this point there's no direct link to the component library from where the component originated. This self-containment characteristic also applies if the canvas app is then migrated to a different environment where the component library isn't present.
You can continue to create instances of the imported component definition within the apps in the target environment, and the apps can still be published and played. No new updates will be prompted or received in the consuming app in this case.

In order to maintain the relationship from the app to the component library, ensure that you use the component library to make any changes to the component, instead of editing the component within the consuming app.

## Canvas apps and component libraries solution support

Consistent with the other solution object dependencies, if a canvas app imports a canvas component from a component library, it will have a dependency on that component library. In order to move an app to the new environment, you'll need to either package the component library inside the same solution or install it as a pre-requisite. App to component library dependency is maintained in the target environment. At a later point, when a component library with the updated component is imported using a solution into the target environment, existing apps will get the new component definitions using the regular [component update flow](component-library.md#update-a-component-library).

### Creating and exporting component library in a solution

You can either create a component library directly from within the solution, or add it to an existing solution.

:::image type="content" source="media/component-library-alm/new-add-existing-library-solution.png" alt-text="Add an existing component library to a solution, or a new one.":::

When a component library is saved in an environment that has Dataverse available, component library is automatically added to the default solution. A unique logical name is generated for the component library with the **Default CDS Publisher** prefix. This behavior is to ensure that the solution system is aware of its presence, and can link the dependencies from the apps that use the component library's logical name.

> [!NOTE]
> Component libraries created before the rollout of the component library ALM feature need to be edited, published, and the editor must be closed explicitly before they're enabled for the ALM capabilities. You can check the component library ALM readiness by its presence in the default solution.

:::image type="content" source="media/component-library-alm/check-default-solution.png" alt-text="Check default solution for your component library presence.":::

Component libraries inside a solution also support **Allow customizations** managed properties that govern the behavior of the component library in the target environment.

:::image type="content" source="media/component-library-alm/allow-customizations.png" alt-text="Allow customizations managed property for component library.":::

If you turn off this setting, and export the solution to a target environment, you won't be able to edit the component library.

:::image type="content" source="media/component-library-alm/edit-disabled.png" alt-text="You can't edit the component library that doesn't allow customizations.":::

### Component library dependencies

Apps that use components from the component library will be marked as dependent in the solutions infrastructure. This behavior applies to all apps that are added to any Dataverse solution in a given environment. You can still create apps outside of solutions, but those apps won't have any solution dependencies. You can later add these apps to solutions to make them part of the solution ALM.

:::image type="content" source="media/component-library-alm/dependencies.gif" alt-text="Animation that shows a canvas app in a solution using the component from the component library in the same solution and the dependencies for both.":::

If you import a solution that only has an app that uses a component from a component library, but excludes the component library, you'll see the following message:

"Import failed due to missing dependencies for \<app name\>".

In this case, you can choose to install the component library solution first, or bundle the component library with the solution that contains the canvas app. Either of the steps would ensure the app will have the dependency created in the target environment.

When the library is updated and a newer component version is imported through the solutions, the app will get a notification and receive the updates when the [app is opened for editing](component-library.md#method-1-component-update-notification-on-app-edit).

> [!NOTE]
> If the component library managed property **Allow customizations** is turned off, the component library can't be edited in the target environment.

Dependencies are calculated based on the latest published state of an app. If you restore an older version of the app that doesn't use a library component, the dependency will be removed from the app, and the solution. Importing a component into an app from a component library without actually using it also creates a dependency since the unused library component remains available within the app for a future use.

> [!TIP]
> Editing a component from a component library inside the consuming app creates a local copy. At this point, the library component is still available for use through the **Insert** pane. In order to remove the dependency completely, delete the component from **Insert** > **Library components** > **...** (ellipsis) > **Remove from app**.

## Best practices and troubleshooting

- Limit the number of components in a library to 20 to get optimal performance. Plan and create multiple component libraries in advance as the number of components in them will likely grow over time. This approach will also reduce the solution payload as apps are moved across the environment.

- There's a delay from when the component library is published to when it's available to the application, and can take up to 5 minutes.

- If the app isn't able to receive the update from the library component in the target environment where the solution is installed, check using the below actions:


    - Changes made to a component library in a target environment reside at the top layer of a component. Subsequently, these customizations define the runtime behavior of the component. To remove these unmanaged customizations, see [Remove an unmanaged layer](../data-platform/solution-layers.md#remove-an-unmanaged-layer).
    - Determine the component library logical name from the solution view. Use the default solution if library isn't explicitly added to solution.
    - Download app using the library component to local computer using **File** > **Save as** > **This computer**. Rename the downloaded file to have a .zip extension, and unzip the package. Open the **Properties.json** file, and then search for the keyword "LibraryDependencies". You should see a matching library logical name.
    - If you're consuming the solution, check that the canvas app has properly identified the component libraries as [solution dependencies](/power-platform/alm/solution-concepts-alm#solution-dependencies). If the solution doesn't properly identify the component libraries as solution dependencies, that means the app dependency to the component library link hasn't been created properly. In that case, check with the solution provider to resolve the issue.
    - If you're the solution publisher, check that the component libraries are saved with the library logical name in the solution, and that it's same as the one referenced in the component library .msapp package.

- Solution export always exports the latest version of the component library. Hence, always update the apps with the latest component version before exporting them through solutions. This action ensures that the apps have the same component version as available in the latest version of the component library. Apps and library are considered to be synchronized with each other when they're moved to a target environment for the first time; and hence, you're not prompted for any update being available when editing the app.

### See also

- [Canvas components](create-component.md)
- [Component library](component-library.md)
- [Map input fields of a component](map-component-input-fields.md)
- [Add multimedia to a component](component-multimedia.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Map input fields of a component

Source: [map-component-input-fields.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/map-component-input-fields)

*Learn about how to map input fields of a component to the table or record.*

# Map input fields of a component

A component can receive input values to emit or process data using custom input properties. In this article, you'll learn about working with such components expecting one or more input properties with a specific schema for the given table or record, and how to map the component input fields to the columns of the data source.

> [!TIP]
> To learn about what the custom input and output properties in components are, see [Custom properties in components](create-component.md#custom-properties).

## Map columns

Use the [RenameColumns()](functions/function-table-shaping.md) function to rename one or more columns of a table
to match the input property schema for input column selection.

For example, consider a component that expects a table input with the following format:

| **Flavor** | **UnitPrice** | **QuantitySold** |
|------------|---------------|------------------|
| Strawberry | 1.99          | 20               |
| Chocolate      | 2.99          | 45               |

The input property expects table data type:

:::image type="content" source="media/map-component-input-fields/custom-input-property.png" alt-text="Custom input property expecting Table data type.":::

The schema of the input property looks like the following formula:

```power-fx
Table({Flavor: "Strawberry",UnitPrice: 1.99, QuantitySold:20})
```

:::image type="content" source="media/map-component-input-fields/custom-property-formula.png" alt-text="Custom input property formula defined as table and sample values.":::

The app consuming this component has the following **IceCreams** table that doesn’t match with the component schema:

| **FlavorName** | **Price** | **SaleNumber** |
|----------------|-----------|----------------|
| Strawberry     | 1.99      | 20             |
| Chocolate      | 2.99      | 45             |

:::image type="content" source="media/map-component-input-fields/icecreams-table.png" alt-text="Schema of IceCreams table.":::

To map the correct fields, use **RenameColumn()** function to rename expected columns.

```power-fx
RenameColumns(IceCreams,"cra56_flavorname","Flavor","cra56_price","UnitPrice","cra56_salenumber","QuantitySold")
```

:::image type="content" source="media/map-component-input-fields/app-custom-input-property.png" alt-text="App using component that uses custom input property mapping with the correct columns using RenameColumns function.":::

The input fields that the component expects are now mapped with the matching columns from the data source.

## Map records

Use [With()](functions/function-with.md) function to map a single record.

For example, continuing from the [earlier example](#map-columns) for mapping columns, the custom input property of a component inside an app expects a record type with the following schema:

```power-fx
{Flavor: "Strawberry",UnitPrice: 1.99, QuantitySold: 20}
```

:::image type="content" source="media/map-component-input-fields/custom-record-property.png" alt-text="Custom input property formula defined as record and sample values.":::

Since the **IceCreams** data source expects column names as **FlavorName**, **Price**, and **SaleNumber**, we'll need to change the mapping for the record once the component is added to the app.

Use **With()** function to select the columns of the **IceCreams** table, and map them to the input fields of the component:

```power-fx
With(Gallery3.Selected,{Flavor:FlavorName,UnitPrice:Price,QuantitySold:SaleNumber})
```

:::image type="content" source="media/map-component-input-fields/app-component-record.png" alt-text="Component record in app mapped to the data source schema.":::

The following animation shows the example of a component added to the app that shows the selected record from the gallery (above the component):

:::image type="content" source="media/map-component-input-fields/component-selected-record.gif" alt-text="Animation that shows selection of a record from gallery above changing the component instance text below.":::

## Map tables

Use [ForAll()](functions/function-forall.md) function to map a table of records with the records expected by the component added to the app.

For example, at the end of the [map columns](#map-columns) example, you can use the **ForAll()** function to map the entire table with the specific columns to point to the fields from the component for each row:

```power-fx
ForAll(IceCreams,{Flavor:FlavorName,UnitPrice:Price,QuantitySold:SaleNumber})
```

:::image type="content" source="media/map-component-input-fields/map-table-forall.png" alt-text="Map table using ForAll() function for all records.":::

## Map using dropdown (deprecated)

You can use the **Advanced** tab for a component added to an app that expects input property of table or record type, and select the field mappings using the dropdown option. This mapping is assigned by default, and unless you manually select the appropriate mapping fields, the mapping might not yield expected results.

For example, the following animation shows the formula being updated to rename columns. The component on screen doesn't change the field mapping since the default field selection using this dropdown needs to be updated manually.

:::image type="content" source="media/map-component-input-fields/deprecated-dropdown.gif" alt-text="Deprecated method to select field mapping using dropdown in advanced property section of a component added to an app.":::

This method of selecting the mapping using the dropdown has been [deprecated](important-changes-deprecations.md#map-component-fields-using-dropdown-option). Instead, use the [column](#map-columns), [record](#map-records), or [table](#map-tables) mapping methods as described earlier in this article.

You can still use the dropdown option to choose mapping for existing apps, though not recommended. For new apps, this option will be unavailable by default. To turn this deprecated capability on or off, go to **Settings** > **Upcoming features** > **Retired**, and choose **Allow automatic field assignment for component inputs**.

:::image type="content" source="media/map-component-input-fields/setting-feature.png" alt-text="Allow automatic field assignment for component inputs setting.":::

When turning the setting on, ensure you save and reopen the app in Power Apps Studio. Once reopened, update the input property formula to trigger formula validation so that the dropdown options start to appear in the Advanced properties pane.

### See also

- [Behavior formulas for components](component-behavior.md)
- [Deprecated: Map component fields using dropdown option](important-changes-deprecations.md#map-component-fields-using-dropdown-option)
- [Canvas components](create-component.md)
- [Component library](component-library.md)
- [Component library application lifecycle management (ALM)](component-library.md)
- [Add multimedia to a component](component-multimedia.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Add multimedia to a component

Source: [component-multimedia.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-multimedia)

*Learn about how to add multimedia to a canvas component.*

# Add multimedia to a component

You can add multimedia files to the components inside a library. These components can then be used by all apps in an environment and can be moved across environments using standard [component application lifecycle management](component-library-alm.md) (ALM) through solutions in Microsoft Dataverse.

To add multimedia to a component, use the same steps that you'd follow when adding multimedia files in a canvas app. More information: [Using multimedia files in canvas apps](add-images-pictures-audio-video.md)

After adding multimedia files to a component inside the component library, the files will appear under the media pane as they do for canvas apps:

:::image type="content" source="media/component-multimedia/add-multimedia.png" alt-text="Example of Power Apps Studio with a library and multimedia added.":::

Media resources in a component library are defined at the library level, and not tied to individual components. Importing any component from the component library will import all media resources from the library to the app. However, you can remove the unused media when app customization is complete. More information: [Remove unused media](add-images-pictures-audio-video.md#remove-unused-media)

> [!TIP]
> Prefix the media resources in a component library with a unique namespace or library name so that those names don't conflict with existing resources in an app during import.

During the component import to your app, if the component library multimedia has a resource with the same name as the multimedia that already exists inside your app, the import process adds an underscore ("_") and a random number to enforce name uniqueness.

## Example

Consider that you created a component library with a slider image that uses an icon with an [input property](map-component-input-fields.md) for the component named "value" to set it's `X` property.

:::image type="content" source="media/component-multimedia/slider-component.png" alt-text="Slider component using an input property named value.":::

To reuse this multimedia component in your app, all you have to do is import the component, and link the component's input property with the value you'll supply from within the app.

Start with importing the component to your app:

:::image type="content" source="media/component-multimedia/imported-component.png" alt-text="Component imported to your app.":::

After the import, you can insert a [slider](controls/control-slider.md) control, and set the imported component's value to the slider's value:

:::image type="content" source="media/component-multimedia/insert-slider.png" alt-text="Set component value to the slider's value.":::

When you play this app, the slider movement in the app would then move the imported slider component:

:::image type="content" source="media/component-multimedia/play-app.png" alt-text="App being played that will move slider inside component as slider control is moved":::

### See also

- [Canvas components](create-component.md)
- [Component library](component-library.md)
- [Component library application lifecycle management (ALM)](component-library.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Behavior formulas for components (experimental)

Source: [component-behavior.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-behavior)

*Do one or more tasks in canvas app when a component-based action occurs.*

# Behavior formulas for components (experimental)

[This article is pre-release documentation and is subject to change.]

> [!IMPORTANT]
> This is an experimental feature. For more information, see [Experimental and preview features](working-with-experimental-preview.md).

Specify one or more [behavior formulas](working-with-formulas-in-depth.md) that run when an event triggers a change in component instances.

For example, set a component's **OnReset** property to one or more formulas that do initialization and clear input. Reset values when the **Reset** function runs on the component instances.

> [!NOTE]
> The feature to create custom behavioral properties is currently experimental. However, you can use the default **OnReset** property that is available on all components in your production environment.

## OnReset

With a component master selected, select **OnReset** in the drop-down list of properties (on the left side of the formula bar), and then enter one or more formulas.

> [!div class="mx-imgBorder"]
> ![OnReset property.](./media/component-behavior/example-onreset.png "OnReset property")

To test **OnReset**, configure a control to reset the component. For example, set the **OnSelect** property of a button to this formula: **Reset**(*ComponentName*).

### Example - Reset timer

> [!div class="mx-imgBorder"]
> ![OnReset Example - Reset timer.](./media/component-behavior/Resettimer.gif "OnReset Example - Reset timer")

In this time picker component, two variables are used to display the time _selectedHour and _selectedMinute. When the picker gets reset, these variables should be reset to a default value, say 12: 12.  The OnReset property for the component has the following formula: **Set(_selectedHour,12); Set(_selectedMinute,12)**

To trigger reset, go to a screen and insert an instance of the component. Add a button and configure OnSelect of the button to call **Reset(TimerComponent_instance)**  to trigger OnReset.

> [!div class="mx-imgBorder"]
> ![Reset button.](./media/component-behavior/reset-button.png "Reset button")

## Update OnReset using custom property

Besides resetting a component instance from outside of the component, there's another method to trigger the OnReset from the inside. "**Raise OnReset when value changes**" is an option when creating a custom input property. It allows the value changes of this property to trigger OnReset of the component. This method is designed to set and reset the default value easily. 

> ![OnReset using custom property.](./media/component-behavior/property-trigger.png "OnReset using custom property")

### Example

> [!div class="mx-imgBorder"]
> ![OnSelect example animation.](./media/component-behavior/updateordernumber2.gif "OnSelect example animation")

The example above shows reviewing order numbers and updating the numbers. The numeric up and down component is used to increase or decrease number of orders. When selecting the gallery on the left, the default number of the numeric up and down component is reset to display the order number of the selected tool. **Raise OnReset when value changes** made it possible to reset the default value when the input changes. 

To do so, check **Raise OnReset when value changes** of the default input property. **OnReset** of the component is set to **Set(_numericValue,'Numeric up down'.DefaultValue)**. _numericValue is the variable to store the value of the current order value. Set the **Default** of the text input control to **If(IsBlank(_numericValue), 'Numeric up down'.DefaultValue, _numericValue)**.

### See also

- [Canvas components](create-component.md)
- [Component library](component-library.md)
- [Component library application lifecycle management (ALM)](component-library.md)
- [Behavior formulas for components](component-behavior.md)
- [Power Apps component framework](../../developer/component-framework/component-framework-for-canvas-apps.md) 
- [Add canvas components to a custom page in a model-driven app](../model-driven-apps/page-canvas-components.md)

---

## Canvas component properties

Source: [component-properties.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/component-properties)

*Using properties in canvas components.*

# Canvas component properties

[Canvas components](./create-component.md) let makers create different types of properties to pass values or logic between the component and the app that hosts the component. Properties are essential for building interactive, reusable components.


## Prerequisites

This feature is on by default for new apps. For existing apps, you need to turn it on in your app settings.

1. Open your [canvas app for editing](edit-app.md) in Power Apps Studio. On the command bar, select **Settings** > **Updates**.

1. On the **New** tab, find and turn on the **Enhanced component properties** setting.

## Types of properties

There are four types of properties available to makers.

1. [Data properties](component-properties.md#data-property): Data properties pertain to data, like a color or text value. A **Data** property can be set to be **Input** or **Output**, which indicates if the component provides data to the app (**Output**) or the app provides data to the component (**Input**). **Data** properties are the only properties that participate in app data flow.
2. [Function properties](component-properties.md#function-property): Function properties are related to logic, such as performing a calculation based on specific parameters or altering text. A **Function** property can be set to be **Input** or **Output**, which indicates if the component provides a function the app can call (**Output**), or the app provides a function the component can call (**Input**). **Function** properties do not participate in an app's data flow, and cannot use component or app variables.
3. [Action properties](component-properties.md#action-property): Action properties are a type of property that deals with logic and behaves like an **Output** **Function**. Thus, the component has the logic defined, and that logic can use chained expressions and manipulate collections or variables ("behavior"). For example, a `Clear()` **Action** property could provide functionality the app can call to clear out some values in the component, or a `Save()` **Action** property that updates a datasource.
4. [Event properties](component-properties.md#event-property): Event properties are a category of property that involves logic and functions as an **Input** **Function**. Thus, the app defines the logic, which the component can call and that logic can use chained expressions and manipulate collections or variables ("behavior"). Typically these properties' names reflect an event such as `OnSelect` or `OnChanged`.


### Data property

A data property's usage is easy to imagine. Standard controls in apps typically have several data properties, to set default values, text color, size, etc. Let's look at a simple example where you want to make properties of a control within the component available to the hosting app. In this example, the component is named `Component1`. Put a slider control inside the component. Add an **Input** property to specify the color from the consuming app, and an **Output** property so the component can tell the app the current value of the slider. This example assumes the component has a **Slider** control named `Slider`.

1. In the property pane of the component, select **New custom property**.
2. On the **New custom property** pane, enter display name `Slider Color`.
3. Select **Property type** of **Data** and select **Property definition** value **Input**.
4. Finally, from the **Data type** dropdown, select **Color**.
5. Click **Create**.

Next, select the `Slider1` **Slider** control. Find its **ValueFill** property and in the formula bar, enter `Component1.SliderColor`. `Component1` is the name of the component, and `SliderColor` is the name of the property you added.

Now the component has a `SliderColor` property that can be set in the consuming app to pass a color into the component and set the slider's **ValueFill** property.

You might also want to provide the value of the slider to the consuming app. To do this, add an **Output** property.

1. In the property pane of the component, select **New custom property**.
2. On the **New custom property** pane, enter display name `Slider Value`.
3. Select **Property type** of **Data** and select **Property definition** value **Output**.
4. Finally, from the **Data type** dropdown, select **Number**.
5. Click **Create**.

When a **Data** property is **Output**, the component provides the value to the consuming app. To set the formula, set the new `SliderValue` property in the component to the **Value** property of the slider.

1. In the property pane of the component, click on the `Slider Value` property.
2. In the formula bar, replace the default value of `100` with the following formula: `Slider1.Value`.

Now the component's `SliderValue` property reflects the value of the slider inside the component, which the consuming app can read.

### Function property

A function property contains an expression that returns a value. Typically, the function takes arguments that it uses to calculate the value to return.

> [!NOTE]
> Function properties currently cannot access variables or component values and properties, and cannot trigger data flow. Any required values have to be passed in as arguments.

An **Output** function is a simple way to create a custom function for Power Apps. The component defines an **Output** function with an expression that takes some arguments and returns a value. This function can then be used in an app using the component's name (say `Component1`) by calling `Component1.MyFunction(arg1, arg2)`.

An **Input** function lets a consuming app provide logic to a component, similar to a function pointer or callback function. For example, if the component works with people's names, it can have an input function with arguments `firstname` and `lastname` and expects a string back. The app can define the function expression to return `$"{firstname} {lastname}"` or `$"{lastname}, {firstname}"`. The component calls the function the app maker provides and uses the returned string.

### Action property

Action properties are similar to function properties of type **Output**, but they allow side-effect formulas and expression chaining. A component can have an action property named `AddRecord` that lets the app add a record to a collection inside the component, or a `Reset` action that clears variables or collections inside the component.

In the earlier slider example for the **Data property**, you can add an action property called `ResetValue` to set the slider back to its default value. Use the formula `Reset( Slider1 )` for this. Now, instances of the component in the app can call `Component1.ResetValue()` to set the slider back to the default value.

### Event property

Many standard controls have common **Event**-type properties, which are input behavior function properties. **OnSelect** on the button control is a common example. A component can define event properties and call these events like a function. For example, a component with a button control can have an event property named `OnButtonClicked`. In the button control's **OnSelect**, the component can call its `Component1.OnButtonClicked()` property. A consuming app can define its own logic for this property to act when the button inside the component is pressed.

## Default values for properties or arguments

Default values give an argument or property a value if none is set. This doesn't make sense for some types of properties. In some cases, you can use default values to show the expected schema for a record. By providing a default record, you set the record type as the expected schema.

For example, an **Action** property named `AddRecord` takes a record to add to a local collection. To show the schema of the expected record, add a default value for the `AddRecord` property's argument.

---

