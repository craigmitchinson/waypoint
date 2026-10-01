# Power Apps Canvas Apps — Design the Interface (Studio, Screens, Galleries, Forms, Copilot, Mixed Reality, Geospatial, Themes)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 48

## Contents

1. [Understand Power Apps Studio: Components and Features](#understand-power-apps-studio-components-and-features)
2. [Use inline actions when you're building  a canvas app](#use-inline-actions-when-youre-building-a-canvas-app)
3. [Add comments when you're building a canvas app](#add-comments-when-youre-building-a-canvas-app)
4. [Collaborate on canvas apps in Microsoft Power Apps Studio](#collaborate-on-canvas-apps-in-microsoft-power-apps-studio)
5. [Add and configure controls in canvas apps](#add-and-configure-controls-in-canvas-apps)
6. [Add and navigate screens in canvas apps](#add-and-navigate-screens-in-canvas-apps)
7. [Add Microsoft 365 Copilot chat for app users in canvas apps (preview)](#add-microsoft-365-copilot-chat-for-app-users-in-canvas-apps-preview)
8. [Customize Microsoft 365 Copilot in Power Apps (preview)](#customize-microsoft-365-copilot-in-power-apps-preview)
9. [Add a Copilot control to a canvas app (preview)](#add-a-copilot-control-to-a-canvas-app-preview)
10. [Add a custom Copilot to a canvas app](#add-a-custom-copilot-to-a-canvas-app)
11. [Create and edit Dataverse tables in canvas apps using the table designer](#create-and-edit-dataverse-tables-in-canvas-apps-using-the-table-designer)
12. [Show a list of items in canvas apps](#show-a-list-of-items-in-canvas-apps)
13. [Show items of different heights in a canvas app gallery](#show-items-of-different-heights-in-a-canvas-app-gallery)
14. [Best practices for using the Gallery control in canvas apps](#best-practices-for-using-the-gallery-control-in-canvas-apps)
15. [Show, edit, or add a record in a canvas app](#show-edit-or-add-a-record-in-a-canvas-app)
16. [Understand canvas-app forms](#understand-canvas-app-forms)
17. [Understand data-form layout for canvas apps](#understand-data-form-layout-for-canvas-apps)
18. [Understand data cards in Power Apps canvas apps](#understand-data-cards-in-power-apps-canvas-apps)
19. [Display a full-sized image on a canvas app form](#display-a-full-sized-image-on-a-canvas-app-form)
20. [Add a list box, a drop-down list, or radio buttons to a canvas app | Microsoft Docs](#add-a-list-box-a-drop-down-list-or-radio-buttons-to-a-canvas-app-microsoft-docs)
21. [Create a dependent drop-down list in a canvas app](#create-a-dependent-drop-down-list-in-a-canvas-app)
22. [Show data in a line, pie, or bar chart in canvas apps](#show-data-in-a-line-pie-or-bar-chart-in-canvas-apps)
23. [Using multimedia files in canvas apps](#using-multimedia-files-in-canvas-apps)
24. [Overview of Copilot answer control for canvas apps](#overview-of-copilot-answer-control-for-canvas-apps)
25. [Use mixed reality controls in Power Apps](#use-mixed-reality-controls-in-power-apps)
26. [Use the 3D object control in Power Apps](#use-the-3d-object-control-in-power-apps)
27. [Connect 3D models to Power Apps](#connect-3d-models-to-power-apps)
28. [Add pins to 3D objects in your canvas apps](#add-pins-to-3d-objects-in-your-canvas-apps)
29. [Use the View shape in MR control in Power Apps](#use-the-view-shape-in-mr-control-in-power-apps)
30. [Use the View in MR control in Power Apps](#use-the-view-in-mr-control-in-power-apps)
31. [Use the Measuring Camera control in Power Apps](#use-the-measuring-camera-control-in-power-apps)
32. [Test whether an object will fit in a space using mixed reality](#test-whether-an-object-will-fit-in-a-space-using-mixed-reality)
33. [Use the Measure in MR control to take measurements](#use-the-measure-in-mr-control-to-take-measurements)
34. [Take screenshots of 3D objects in mixed reality](#take-screenshots-of-3d-objects-in-mixed-reality)
35. [Load 3D models from CGTrader into mixed reality controls (preview)](#load-3d-models-from-cgtrader-into-mixed-reality-controls-preview)
36. [Use the Markup in MR control in Power Apps](#use-the-markup-in-mr-control-in-power-apps)
37. [Use marker detection with mixed-reality controls](#use-marker-detection-with-mixed-reality-controls)
38. [Add geospatial controls to canvas apps](#add-geospatial-controls-to-canvas-apps)
39. [Use an interactive map control in Power Apps](#use-an-interactive-map-control-in-power-apps)
40. [Insert pins from data source](#insert-pins-from-data-source)
41. [Display information about map pins](#display-information-about-map-pins)
42. [Draw and insert shapes on maps](#draw-and-insert-shapes-on-maps)
43. [Calculate routes between waypoint pins on a map (preview)](#calculate-routes-between-waypoint-pins-on-a-map-preview)
44. [Enter and resolve addresses in maps](#enter-and-resolve-addresses-in-maps)
45. [Power Apps visual for Power BI](#power-apps-visual-for-power-bi)
46. [Create an app to edit tables in canvas apps](#create-an-app-to-edit-tables-in-canvas-apps)
47. [Show, sort, and filter data in a canvas app gallery](#show-sort-and-filter-data-in-a-canvas-app-gallery)
48. [Use modern themes in canvas apps](#use-modern-themes-in-canvas-apps)

---

## Understand Power Apps Studio: Components and Features

Source: [power-apps-studio.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/power-apps-studio)

*Discover the key components and features of Power Apps Studio. Learn how to use the command bar, formula bar, canvas, and authoring tools to build canvas apps effectively.*

# Understand Power Apps Studio

Power Apps Studio is the integrated development environment where you design, build, and manage canvas apps. Learn about its key components including the command bar, formula bar, canvas, and authoring tools to create effective business applications.

## Overview of Power Apps Studio

:::image type="content" source="media/studio/pa-studio.png" alt-text="Screenshot showing the Power Apps Studio user interface." lightbox="media/studio/pa-studio.png":::

1. [Power Apps Studio modern command bar](#1--power-apps-studio-modern-command-bar): Dynamic command bar that shows a different set of commands based on the control selected.

1. [App actions](#2--app-actions): Options to view properties, add comments, run the app checker, share, preview, save, or publish the app.

1. [Properties list](#3--properties-list): List of properties for the selected object, such as *fill* or *height*.

1. [Formula bar](#4--formula-bar): Compose or edit a formula for the selected property with one or more functions.

1. [App authoring menu](#5--app-authoring-menu): Selection pane to switch between data sources and allows you to insert options.

1. [App authoring options](#6--app-authoring-options): This pane reveals the corresponding authoring feature when a feature is selected from the app authoring menu.

1. [Canvas/screen](#7--canvasscreen): Primary canvas for composing the app structure.

1. [Properties pane](#8--properties-pane): Properties list for the selected object in Tree view.

1. [Settings](#9--settings): Configure your app in settings.

1. [Screen selector](#10--screen-selector): Switch between different screens in your app. Tree view selections display here.

1. [Change canvas screen size](#11--change-canvas-screen-size): Change the display size of the canvas as you author your app.

Let's understand each option in Power Apps Studio in detail.

### 1 – Power Apps Studio modern command bar

The command bar provides Power Apps Studio options. These options are relevant to the current session and app-related settings.

:::image type="content" source="media/studio/pa-studio-options.png" alt-text="Screenshot that shows the command bar menu with lots of development options." lightbox="media/studio/pa-studio-options.png":::

#### Modern command bar

The modern command bar displays the relevant set of commands depending on the control that you select. For example, if you select an item to *insert* like a text label, you see the modern command bar change to accommodate your selection. The bar now has font type, size, color, and other text label controls.

:::image type="content" source="media/studio/pa-studio-command-bar.png" alt-text="Moving image that shows how the command bar changes depending on which control is selected." lightbox="media/studio/pa-studio-command-bar.png":::

The command bar changes when you select one of the following controls or objects:

1. App object
1. Screen
1. Button
1. Shape
1. Icon
1. Blank form
1. Form with data
1. Blank gallery
1. Gallery with data
1. Label
1. Text input
1. Date picker

When you select more than one type of control, the command bar shows the common commands between the selected controls.

#### Back

Takes you back to the build hub, closing the current Power Apps Studio session.

#### Undo and redo

:::image type="content" source="media/studio/pa-undo-redo.png" alt-text="Screenshot that shows where the undo and redo controls are located in the command bar.":::

- **Undo**: Undo the last action.
- **Redo**: Repeat the last action.

 > [!NOTE]
 > You can't undo or redo data operations, such as insert or delete a data source.

#### Cut, copy, and paste

:::image type="content" source="media/studio/pa-studio-cut-copy-paste.png" alt-text="Screenshot that shows where the cut, copy, and paste controls are located in the command bar.":::

- **Cut**: Cut the selection, and store it in the clipboard.
- **Copy**: Copy the selection, and store it in the clipboard.
- **Paste**: Paste the last cut or copied selection from the clipboard.

#### Insert

:::image type="content" source="media/studio/pa-insert-controls.png" alt-text="Screenshot that shows where the two insert controls are located. One is in the command bar and the other control (plus sign) is in the navigation menu.":::

You can access the **Insert** menu from the command bar and from the app authoring menu.

**Insert** shows all the popular objects or controls that you can add on the selected screen in your canvas app. You can also expand other choices or use the components option to insert controls from a component library.

To insert controls on the canvas, drag the control to the canvas or select the control.

##### Popular controls to insert

| **Name**      | **Description** |
|---------------|-----------------|
| *Form* | Display, edit, or create a record in a data source. |
| *Input* > *Button* | A control that the user can select to interact with the app. |
| *Input* > *Date picker* | A control that the user can select to specify a date. |
| *Input* > *Text input* | A text box that allows user input. |
| *Shapes* > *Rectangle* | A rectangular shape to configure the canvas appearance. |
| *Text* | A box that displays data such as text, numbers, dates, or currency. |
| *Vertical gallery* | A control that you can add other controls to and display a set of data. For example, list items made up of an image, title, and description is contained within a vertical gallery. <br> :::image type="content" source="media/studio/vertical-gallery-example.png" alt-text="Screenshot showing what the vertical gallery template looks like."::: |

For more information about the controls you can insert, including their properties and definitions, see [Controls and properties in canvas apps](reference-properties.md).

#### Add data

Add, refresh, or remove data sources from your canvas app. You can add one or more [connections](connections-list.md) by using data sources.  

:::image type="content" source="media/studio/pa-studio-add-data.png" alt-text="Screenshot that shows how to add data from the Add data dropdown list.":::

From the **Add data** menu, you can:

- Select any other existing tables from the current environment.
- Search for and select a connector, such as **SharePoint** or **SQL Server**.

##### Connectors

In addition to data stored within tables, many connectors are available to interact with data in popular software as a service (SaaS), services, and systems.

To choose other connectors such as SharePoint, OneDrive, or SQL Server, enter text in the data source search box or select from the list of connectors.

:::image type="content" source="media/studio/pa-studio-data-source-connector.png" alt-text="Screenshot that shows how to select a data source by choosing the Add data dropdown.":::

For more information, see [List of all Power Apps connectors](/connectors/connector-reference/connector-reference-powerapps-connectors).

#### New screen layouts

Add a new screen to your app from the **New screen** option in the command bar.

:::image type="content" source="media/studio/new-screen-from-command-bar.png" alt-text="Screenshot that shows the location of the New screen menu from the command bar.":::

You can also add a new screen from the tree view.
 
1. From the **Screens** tab, select **+ New screen**.

    :::image type="content" source="media/studio/pa-add-screen.png" alt-text="Screenshot that shows how to choose a layout from the New screen menu":::

1. Select from the list of available screen layouts such as **Sidebar**, new layouts in preview such as **Header and form**, or templates like **Email**.



#### Background color

Select a background color for a screen. You can select from the list of standard colors or select the **Custom** tab and choose your own color.

:::image type="content" source="media/studio/pa-studio-background-color.png" alt-text="Screenshot that shows where to choose a background color from the command bar.":::

#### Background image

Select **Upload** to upload images to set as the background image.

:::image type="content" source="media/studio/pa-studio-background-image.png" alt-text="Screenshot that shows where to choose a background image from the command bar.":::

#### Settings

Configure the app's settings from the [General](#general), [Display](#display), [Updates](#updates), or [Support](#support) tab.

:::image type="content" source="media/studio/pa-studio-general-settings.png" alt-text="Screenshot that shows where to choose settings from the command bar."  lightbox="media/studio/pa-studio-general-settings.png":::

##### General

- Edit the app **Name** and **Description**.
- Add or update the **App icon**. Add a custom icon by selecting **+ Add image**.
- Select an **Icon background fill** or **Icon fill** color.
- Toggle **Auto save** to save every two minutes automatically.
- Configure offline use.
- Set your **Data row limit**.
- Include debug information when you publish.
- Enable autocreation of environment variables.
- Enable the `App.OnStart` property.

To edit the app **Name**, go to the **General** tab in **Settings**.

:::image type="content" source="media/studio/pa-studio-app-name-editor.png" alt-text="Screenshot where you edit your app name in the Settings popup.":::

##### Display

- Select the **Orientation** and screen **Size**.
- **Scale to fit**: Scales the app to fit available space.
- **Lock aspect ratio**: Locks the height and width ratio.
- **Lock orientation**: Maintains app orientation when device rotates.
- **Show mobile device notifications area**: Displays notifications at the top of the screen.

For more information, see [Change screen size and orientation](set-aspect-ratio-portrait-landscape.md).

##### Updates

Configure advanced settings for the app that include features under preview, experimental, or retired features.

For more information, see [Understand experimental, preview, and retired features in Power Apps](working-with-experimental-preview.md).

##### Support

Access current Power Apps Studio information such as environment, authoring version, session ID, and session details. This information is useful for Microsoft Support sessions.

### 2 – App actions

To perform app-specific actions, use the options such as **Properties**, **Comments**, **App checker**, **Share**, **Preview the app**, **Save**, and **Publish**.

:::image type="content" source="media/studio/pa-studio-actions-menu.png" alt-text="Screenshot that shows the app actions in the command bar.":::

#### Share

When you select the **Share** app action, a new window opens where you can share the app. You can share with other users or add them as co-owners of your app. For more information, see [Share an app](share-app.md#share-an-app-from-power-apps).

> [!TIP]
> You must save the app before you can share it.

#### App checker

Select **App checker** to run a check.

For more information, see [PowerApps checker now includes App checker results for canvas apps in solutions](https://powerapps.microsoft.com/blog/powerapps-checker-now-includes-app-checker-results-for-canvas-apps-in-solutions/).

:::image type="content" source="media/studio/pa-studio-app-checker.png" alt-text="Screenshot that shows where the App checker app action is located and its menu contents." lightbox="media/studio/pa-studio-app-checker.png":::

#### Comments

Comments are notes associated with items in your app. Use comments to help your team review the app and provide feedback, or provide additional information on implementation details in your app.

:::image type="content" source="media/studio/pa-studio-comments.png" alt-text="Screenshot that shows where the Comments app action is located and its menu where you can add a new comment.":::

#### Preview

Select **Preview the app** to go into preview mode. Here you can view and interact with the current version of the app.

:::image type="content" source="media/studio/pa-studio-preview.png" alt-text="Screenshot that shows where the Preview app action is located.":::

#### Save

You can save your app in different ways, such as **Save**, **Save with version notes**, **Save as**, or **Download a copy**. The save options dropdown is located next to the **Save** app action.

:::image type="content" source="media/studio/pa-studio-save-option.png" alt-text="Screenshot that shows where save options are located.":::

**Save options include**:

- **Save**: Saves recent and unsaved changes you made to the app. Each time you save changes, a new version is created.
- **Save with version notes**: Save and add notes about your updates.
- **Save as**: Duplicate the app by saving it with a different name.
- **Download a copy**: Download a local copy of the app.

#### Publish

Select **Publish** to publish the app’s current version. For more information, see [Save and publish canvas apps](save-publish-app.md).

:::image type="content" source="media/studio/pa-studio-publish.png" alt-text="Screenshot that shows where the Publish app action is located and its popup where you can add details to the publishing of your app." lightbox="media/studio/pa-studio-publish.png":::

### 3 – Properties list

When you select an object in your canvas, you can choose one of the object's properties from its properties list. For a complete list of all possible properties, see [All properties](reference-properties.md#all-properties).

:::image type="content" source="media/studio/pa-studio-prop-list.png" alt-text="Screenshot that shows the properties list of an object you select in your app canvas.":::

### 4 – Formula bar

The formula bar lets you add, edit, or remove functions of a property from your selected object. For example, select the app screen to update the background color by using the [RGBA function](/power-platform/power-fx/reference/function-colors).

The formula bar is IntelliSense-enabled. When you start entering text that matches one or more functions, the formula bar shows a list of functions.

:::image type="content" source="media/studio/pa-studio-formula-bar.png" alt-text="Screenshot that shows the formula bar." lightbox="media/studio/pa-studio-formula-bar.png":::

When you select a function, the formula bar shows inline function help and highlights help text relevant to the cursor position.

:::image type="content" source="media/studio/pa-studio-formula-bar-2.png" alt-text="Screenshot that shows inline help for a function in the formula bar." lightbox="media/studio/pa-studio-formula-bar-2.png":::

If a formula returns an error, you can view the error details in **App checker** or directly from the app view in the canvas.

:::image type="content" source="media/studio/pa-studio-formula-bar-3.png" alt-text="Screenshot that shows formula errors viewed, using the App checker." lightbox="media/studio/pa-studio-formula-bar-3.png":::

Similarly, you find help when working with complex functions, nested functions, or when correcting a formula syntax.

For a complete list of all canvas app functions, see [Formula reference - Power Apps](/power-platform/power-fx/formula-reference).

### 5 – App authoring menu

Switch between various authoring options while working with the app.

:::image type="content" source="media/studio/pa-studio-app-authoring-menu.png" alt-text="Screenshot that shows the app authoring menu.":::

- **Tree view**: Shows a tree view of all screens and controls in the current app.
- [Insert](#insert): Add different controls to the screen.
- **Data**: [Add data](#add-data) and other [connectors](#connectors), such as tables that connect to your app.
- **Variables**: Work with [variables](working-with-variables.md) and [collections](create-update-collection.md) while editing your app.
- **Search**: Select to search for media, formulas, text, and more in your app.
- **Themes**: Choose a colored theme for the Power Apps UI.
- **Media**: Insert or remove media from the app.
- **Power Automate**: Add a flow by using the [Power Automate pane](working-with-flows.md).
- **Advanced tools**: Access the [Monitor](../monitor-canvasapps.md) and [Test](test-studio.md) tools to debug and test your app.

The options for working with canvas apps change depending on your selection from the authoring menu. For example, when you select the **Tree view** menu option, you see a **Tree view** pane appear.

### 6 – App authoring options

#### Tree view

Select the tree view to show the screens available in the app.

:::image type="content" source="media/studio/pa-studio-tree-view.png" alt-text="Screenshot that shows the Tree view pane when you select Tree view from the authoring menu.":::

> [!TIP]
> Select **App** in the tree view to work with app-specific controls. You can change app behavior, such as adding a formula for the *OnStart* event of the app.

Switch to the **Components** tab of **Tree view** to work with component library features. You can add new components or reuse ones from the published component libraries. For more information, see [Component library](component-library.md).

For more information on adding components by selecting **+ New component**, see the [Insert](#insert) section.

#### Variables

You can save data such as resulting values from a data set into temporary storage by using variables. This section lists variables used by the current app. For more information, see [Variables in canvas apps](working-with-variables.md).

:::image type="content" source="media/studio/pa-studio-collections.png" alt-text="Screenshot that shows the collections in the app that are found in the Variables section.":::

A collection is a group of items that are similar, such as products in a product list. For more information, see [Collections in canvas apps](create-update-collection.md).

#### Search

You can find components in your app or find and replace them.

:::image type="content" source="media/studio/pa-studio-search.png" alt-text="Screenshot that shows how to select the Search option from the authoring menu.":::

#### Themes

You can choose a premade colored theme or custom-make your own colored theme by selecting **+ Add a theme**.

:::image type="content" source="media/studio/pa-studio-themes.png" alt-text="Screenshot that shows how to select the Themes option from the authoring menu.":::

#### Media

Select **Media** to add images, video, or audio files to your app. Adding media directly to your app uploads the files to the app and uses the app storage.

:::image type="content" source="media/studio/pa-studio-add-media.png" alt-text="Screenshot that shows how to select the Media option from the authoring menu.":::

> [!TIP]
>
> - Each file uploaded to the app as media must be 64 MB or smaller.
> - The size of all media files uploaded to an app can't exceed 200 MB.

If you want to reference more media, consider using [audio and video controls with URLs](add-images-pictures-audio-video.md#add-images-audio-or-video-by-using-the-controls), media from [Azure Media Services](add-images-pictures-audio-video.md#add-media-from-azure-media-services).

For more information, see [Using multimedia files in Power Apps](add-images-pictures-audio-video.md).

#### Power Automate

Create a new flow with Power Automate, or select a flow you added previously.

:::image type="content" source="media/studio/pa-studio-create-flow.png" alt-text="Screenshot that shows where the Power Automate section is located.":::

For more information, see [Use Power Automate pane](working-with-flows.md).

#### Advanced tools

Advanced tools include **Monitor** and **Tests**, where you can track and test your app.

:::image type="content" source="media/studio/pa-studio-advanced-tools.png" alt-text="Screenshot that shows where the Advanced tools section is located.":::

### 7 – Canvas/screen

The canvas shows the currently selected screen in the **Tree view** from the authoring menu.

When you edit a canvas app, you can [Use inline actions in Power Apps Studio](inline-actions.md) so you don't have to leave your current view. Inline actions make the development process more efficient.

### 8 – Properties pane

The properties pane shows properties and options for the currently selected object on the canvas.

- The **Display** tab shows generic options such as the name, description, exit or exit message, and more.
- The **Advanced** tab shows options for customization with key value pairs in areas of action, data, and design in your app.

  > [!TIP]
  > The advanced properties might be locked for editing, such as when working with data cards. Select [Unlock to change properties](working-with-cards.md#unlock-a-card) in such situations.

:::image type="content" source="media/studio/pa-studio-prop-pane.png" alt-text="Screenshot that shows the properties pane that appears when you select an object in your canvas. You see two tabs in this pane: Display and Advanced.":::

### 9 – Settings

Access [Settings](#settings) at the bottom of the app authoring menu or from the command bar as previously described.


### 10 – Screen selector

Use the screen selector to switch between screens when your canvas app has multiple screens. You can also select a screen from the authoring menu by selecting the tree view. If the current selection is inside a container, or inside an individual cell in a gallery, the selector shows the breadcrumbs for the parent elements at each level.

:::image type="content" source="media/studio/pa-studio-screen-selector.png" alt-text="Screenshot that shows the location of the screen selector." lightbox="media/studio/pa-studio-screen-selector.png":::

### 11 – Change canvas screen size

You can zoom in or out while authoring the canvas app. Select **Ctrl**+**0** (zero) to *fit to window*, which fits the canvas to the current authoring window size.

The following image shows what the canvas looks like when *fit to window*. You can also use the controls to zoom further in or out to view your canvas.

:::image type="content" source="media/studio/pa-studio-fit-canvas-to-window.png" alt-text="Screnshot that shows what a canvas fit to window looks like. This image also shows the zoom controls for your canvas." lightbox="media/studio/pa-studio-fit-canvas-to-window.png":::

> [!NOTE]
> The zoom percentage or screen size you use when authoring a canvas app doesn't affect the aspect ratio you configure for the app. When you preview your app or play a published app, your screen size is temporary.

---

## Use inline actions when you're building  a canvas app

Source: [inline-actions.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/inline-actions)

*Learn how to use inline actions while you’re building a canvas app in Power Apps Studio.*

# Use inline actions in Power Apps Studio

Inline actions are hidden menus that appear when you hover over screen layouts such as a blank screen and gallery or form controls. For example, if you hover over the canvas of a blank screen of your app, you see the **Copilot** and **Templates** inline actions appear.

:::image type="content" source="media/inline-actions/inline-action-example.png" alt-text="Screenshot that shows inline actions appearing on a blank canvas, when you hover over it.":::

Use inline actions to update layouts, work with data, collaborate with your colleagues, and use Copilot directly on the canvas for specific controls. This means you can build and modify your app without navigating away from your current view in Power Apps Studio. Inline actions provide a more streamlined and efficient way to work.

## Use Copilot inline

Use Copilot inline to help you write Power Fx formulas. Use Copilot to apply conditional formatting, sort and filter your data, and more with the help of Power Apps Ideas. The Copilot button appears where applicable, offering suggestions for supported controls such as **Gallery**, **Data table**, **Text input**, **Drop down**, **Combo box**, and **Text label**. For more information, see [Power Apps Ideas](power-apps-ideas.md).

:::image type="content" source="media/inline-actions/inline-actions-power-fx.png" alt-text="Inline actions for Power Fx formulas":::

## Choose a layout

Inline actions can help you with layout options to create the look you want.

### Blank screens

You can use inline actions to apply a layout to blank screens. For example, if you add a new blank screen to your app and hover over the canvas, you can select the inline action **Templates** and then select one of more than one dozen layouts.

> [!NOTE]
> Once you add content to a screen, the **Templates** button is no longer available unless you remove the content.

:::image type="content" source="media/inline-actions/inline-actions-screen-template.png" alt-text="Use inline actions to select a screen template" lightbox="media/inline-actions/inline-actions-screen-template.png":::

### Gallery control (classic) layouts

You can insert a gallery control, hover over the control, and then use the **Layout** inline action to change the layout for that control. Different layout options appear when you add a **Vertical gallery** or **Horizontal gallery**.

> [!NOTE]
> When you change or remove controls after applying a layout, your customizations are removed.

:::image type="content" source="media/inline-actions/inline-actions-gallery-layout.png" alt-text="Use inline actions to select a layout":::

### Form control (modern or classic) layouts

When you add a modern or classic **Form** control, you're prompted to add a data source. Once the control is linked to data and added to your screen, you can see the **Layout** inline action appear when hovering over the control.

You can then use the **Layout** option to select whether the labels and inputs are arranged vertically or horizontally.

:::image type="content" source="media/inline-actions/form-control-layout.png" alt-text="Screenshot that shows two different types of layouts: vertical and horizontal.":::

- Select the **Vertical** layout to place the label above the corresponding input control. For example, you might want a title displayed with a description below the title.
- Select the **Horizontal** layout to place the label to the left of the input control. For example, you might want an image on the left side of your list item and a name on the right side of your list item.

## Add Data and Fields

When you link any control with data, you see the **Fields** inline action fill with fields from the data. For example, linking a **Table** control with data populates the **Fields** inline action with fields directly from the data such as **Account Number**, **Address 1**, and **Account Name**. You can choose which fields you want to display or add a new field.

:::image type="content" source="media/inline-actions/inline-actions-data-fields.png" alt-text="Add Data and Fields using inline actions":::

### Gallery, Table, and Form

 When you add a **Gallery**, **Table**, or **Form** control, you're prompted to add a data source through the **Select a data source** popup. Once you add a data source, the control displays the data. Use the **Fields** inline action to select which fields are shown on the control from the selected data source.

- In a **Table** control, you can drag and drop the fields to change the order that they appear in the table.

- In a **Form** control, if you choose a new data source, you're prompted to replace the data card. When you confirm your selection, it removes any customizations and generates a new form with fields corresponding to the new data source.

This form control has the **Accounts** data set as a data source. If you change that source by selecting the **Data** inline action, all customized fields are removed or replaced with fields from the new data.

:::image type="content" source="media/inline-actions/existing-form-data-card.png" alt-text="Screenshot that shows a data card with a data source selected. Selecting the Data inline action to add a different data source changes the data card and their fields.":::

> [!TIP]
> You can always access the **Data** and **Fields** inline actions to modify data used in the **Form**, **Gallery**, or **Table** control. These inline actions are available when hovering, whether or not you've selected a data source already.

## Add comments

Comments allow you to tag peers in your app to ask questions, leave instructions, and propose next steps. You can add and read
comments on a screen and any control from inline actions.  

To add a comment, select the **Comments** icon in the command bar to show the **Comments** pane. Select the **New** button to start writing a comment.

:::image type="content" source="media/inline-actions/add-a-comment.png" alt-text="Screenshot that shows where the comments button is located on the command bar.":::

Once the comment is posted, you see a comment icon in the inline action menu, when you hover over a control.

:::image type="content" source="media/inline-actions/comment-icon-inline-action-menu.png" alt-text="Screenshot that shows the comment icon appear in the inline action menu, once a comment is added.":::

If you remove all comments from a control, the comment icon in the inline action menu is removed too.

---

## Add comments when you're building a canvas app

Source: [comments.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/comments)

*Learn how to add comments while you’re building a canvas app in Power Apps Studio.*

# Add comments when you're building a canvas app

Easily add comments when you’re building a canvas app in [Power Apps Studio](power-apps-studio.md). Use comments to help your team review the app and provide feedback, or provide additional information on implementation details in your app. To allow other makers to add comments, make sure to share the app with them.

You can add comments to different components or pages.

:::image type="content" source="media/comments/comments-canvas-apps.png" alt-text="Screenshot showing where you can add comments in Power Apps." lightbox="media/comments/comments-canvas-apps.png":::

Legend

1. **Tree view**: Select a screen from the tree view and right-click to add a **New comment**.
2. **Component**: In the canvas area, right-click on a component to add a **New comment**.
3. **App actions**: Select **Comments** > **New** and then add your comments.

## Use @mention in comments to tag someone for feedback

Connect with other makers in your organization as you collaborate on creating your app. You can tag people in the comments by using **@**+ their name.

If you tag a maker that doesn’t have access to your app, then you're prompted to share the app with them.

:::image type="content" source="media/comments/comments-access.png" alt-text="Screenshot showing the maker who doesn't have access.":::

When someone tags you in a comment, you receive an email that lets you know which app you're tagged in and the person who tagged you. It also includes the comment text and a direct link to that comment.

:::image type="content" source="media/comments/comments-email.png" alt-text="Screenshot showing an example email when you're tagged in a comment.":::

## Edit or delete a comment

You can edit your comments or remove existing comments from appearing in the app.

In the **Comments** pane, next to a comment, select **...**, and then select **Edit comment** or **Delete comment**.

## Resolve a comment

Comments are commonly questions, feedback, or ideas that are important context to live alongside your app. But they might not be active discussions anymore. You can resolve a comment or reopen a resolved comment thread to better track the active comments.  

1. In the **Comments** pane, next to a comment, select **...**, and then select **Resolve comment**.
1. The comment thread appears as **Resolved**.
1. Select one to remove the comment:

   :::image type="icon" source="media/comments/reopen-thread-button.png"::: **Reopen a thread**.

   :::image type="icon" source="media/comments/delete-thread-button.png"::: **Delete a thread**.

## Limitations

1. The numbers of users who can access an app in edit mode is limited. If you have an app open and tag someone, the user receives an email notification. The user must wait for you to exit the app in order to see the comment and resolve it.
2. Comments aren't supported when you're working on an app using Git.
3. @mention isn't supported for SharePoint custom Power Apps. Learn more  in [Customize a form for a SharePoint list](/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form).

---

## Collaborate on canvas apps in Microsoft Power Apps Studio

Source: [copresence-power-apps-studio.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/copresence-power-apps-studio)

*Learn how to use copresence and coauthoring in Power Apps Studio to collaborate on canvas apps and edit together in real time.*

# Understand coauthoring and copresence in canvas apps

Collaborate on canvas apps in Power Apps Studio by using copresence and coauthoring. These features let you work with other makers in real time, improving productivity and teamwork.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=719b89e6-32ce-498b-9597-600d91019ec4]

**What you'll learn:**

- How to see who's working on your app and work together effectively
- When to use copresence vs. coauthoring for your collaboration needs
- Step-by-step instructions to enable and use these features

**Key differences:**

- **[Copresence](#use-copresence-to-see-whos-working-on-the-same-app)** shows who else is working on the same app, but only one person can edit the app at a time. The first person who opens the app gets editing control.

- **[Coauthoring](#use-coauthoring-to-edit-the-same-app-together)** lets multiple people edit the app at the same time and see each other's changes in real time.

## Use copresence to see who's working on the same app

When you open an app for editing in Power Apps Studio, indicators might show that other people are also working on the app. These indicators are part of the copresence feature.

The first person who opens the app gets editing control. If another person opens the app, a notification lets them know that someone else is editing the app, and they're viewing it in read-only mode. In read-only mode, you can't add new screens, edit control properties, or use the command bar. You can save a copy of the app.

The command bar shows the names and icons of other makers who are editing or viewing the app. The left navigation pane shows the app's structure and highlights which part of the app someone else is editing. You also get a notification to refresh the app when someone saves changes to the app.

:::image type="content" source="media/copresence/canvas-copresence.png" alt-text="Screenshot of copresence indicators in Power Apps Studio with annotations." lightbox="media/copresence/canvas-copresence.png":::

**Legend**:

1. The command bar shows the names and icons of other makers who are editing or viewing the app.
1. A **Read-only** warning appears if someone already has editing control elsewhere. You can select **Override** to become the main author and regain editing rights.
1. In **Tree view**, you see the app's structure and other people's profile pictures on the part of the app someone else is editing.

> [!TIP]
> If you're inactive for two hours while editing an app, Power Apps asks if you want to keep editing or switch to read-only mode. If you don't respond, the system puts you in read-only mode so other makers can become the editor.
>
> If autosave is on, your changes are automatically saved. If autosave isn't on, Power Apps notifies you that you're no longer editing and lets you save a copy of your changes.

## Use coauthoring to edit the same app together

Coauthoring lets multiple makers edit a canvas app at the same time. When you use coauthoring, you can see where other makers are working on the app and view their changes in real time.

:::image type="content" source="media/copresence/coauthoring.png" alt-text="Screenshot of coauthoring indicators in Power Apps Studio with annotations." lightbox="media/copresence/coauthoring.png" :::

When multiple editors work on the app, their avatars appear.

- The left navigation pane shows the app's structure in **Tree view** and shows which part of the app someone else is editing. For example, you might edit **Screen 1**, while someone else edits **Screen 2**.
- The area that another maker edits is highlighted and shows their initials. For example, someone else might edit a part of a form, which is highlighted for the first user.


> [!IMPORTANT]
> Multiple makers can select and edit a control at the same time. Be careful not to overwrite each other's changes.

## Turn on coauthoring

To use coauthoring, turn it on for each app. When you turn on coauthoring, it overrides the copresence feature.

1. [Open your app for editing](edit-app.md) in Power Apps Studio.
1. Go to **Settings** > **Updates** > **New**.
1. In the search box, type **coauthor**.
1. Turn on the **Coauthoring** toggle.

   :::image type="content" source="media/copresence/coauthor-settings.png" alt-text="Screenshot of coauthoring settings":::

## Limitations of coauthoring

- When more than one maker edits an app, the following actions aren't available:

  - Search
  - Save as
  - Open another or new app
  - Undo and redo
  - Switch authoring versions

- The maximum number of coauthors is 10, either in one session or across a total of 10 tabs, depending on which limit you reach first. Any other coauthors or tabs beyond 10 are in [copresence](copresence-power-apps-studio.md#use-copresence-to-see-whos-working-on-the-same-app) and can't edit the app or view real-time updates.

- The app language is locked to the locale of the first maker who opens the app for editing. Opening the same app in a different locale can lead to errors in formulas.

- Cut isn't available.

- Coauthoring is turned off in the [Monitor tool](../monitor-overview.md).

- You can encounter a problem with the following actions:

  - Renaming a control
  - Adding AI Builder components
  - Adding geospatial controls
  - Running a flow that another coauthor added, without refreshing the app first
  - Viewing errors from one author's actions on all other coauthors' screens
  - Copying and pasting

---

## Add and configure controls in canvas apps

Source: [add-configure-controls.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-configure-controls)

*Step-by-step instructions for adding and configuring canvas-app controls directly, from the toolbar, in the Properties tab, or in the formula bar.*

# Add and configure controls in canvas apps

Add a variety of UI elements to your canvas app, and configure aspects of their appearance and behavior directly, from the toolbar, in the **Properties** tab, or in the formula bar. These UI elements are called controls, and the aspects that you configure are called properties.

## Prerequisites

1. If you don't already have a Power Apps license, [sign up](../signup-for-powerapps.md), and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
1. Create a [blank canvas app](create-blank-app.md).

## Add and select a control

Start by adding a new screen, as well as a button or other control.

1. Select **Insert** from the [authoring menu](power-apps-studio.md#5--app-authoring-menu), and then select **New screen**.
1. Choose **Blank** to add a blank screen to your app. Screens are a type of control that can contain other types of controls.

   :::image type="content" source="./media/add-configure-controls/add-screen.png" alt-text="Screenshot that shows how to add a new screen from the Insert menu option.":::

   The new screen is named **Screen2** and appears in the **Tree view**. This pane shows a hierarchical list of controls in your app so that you can easily find and select each control.

   :::image type="content" source="./media/add-configure-controls/list-screen2.png" alt-text="Screenshot that shows the new screen added in the Tree view of your app.":::

1. With **Screen2** selected, select **Insert** again.
1. Select the **Button** control. The new control appears under **Screen2** in the hierarchical list of **Tree view**.

   :::image type="content" source="./media/add-configure-controls/add-button.png" alt-text="Screenshot that shows the new button on the canvas and the button control name in the list under Screen2.":::

   In the screen, a box with manipulable handles surrounds the button by default. These handles surround any control selected and are used to size the control.

1. Select the screen (outside the button) and the box handles disappear. To select the control again, select it directly on the canvas or from the **Tree view** list.

   > [!IMPORTANT]
   > You must always select a control before you can configure it.

## Rename a control

1. In the list of controls, hover over the control that you want to rename to reveal the overflow menu (ellipsis).
1. Select the ellipses.
1. Select **Rename**. Add a unique, memorable name to make building your app easier.

   :::image type="content" source="./media/add-configure-controls/rename-control.png" alt-text="Screenshot that shows where to rename a control through the overflow menu.":::

## Delete a control

You can delete a control either through **Tree view** or directly from the canvas.

### Delete a control from Tree view

1. In the list of controls, hover over the control that you want to delete to reveal the overflow menu (ellipsis).
1. Select the ellipses.
1. Select **Delete**.

### Delete a control from the canvas

Select the control on the canvas, then press the `Delete` key.

## Reorder screens

1. In **Tree view**, hover over a screen that you want to move up or down to reveal the overflow menu (ellipses).
1. Select the ellipsis, and then choose **Move up** or **Move down**. If you don't see a **Move down** option, your screen is at the lowest point in the list. Similarly, if you don't see a **Move up** option, your screen is at the highest point in the list.

   :::image type="content" source="./media/add-configure-controls/reorder-screen.png" alt-text="Screenshot that shows you how to reorder your screens in the Tree view through the overflow menu of a screen.":::

> [!NOTE]
> When the app is opened, the screen at the top of the list of controls usually appears first. However, you can specify a different screen by setting the **[OnStart](controls/control-screen.md)** property to a formula that includes the **[Navigate](functions/function-navigate.md)** function.

## Move and resize a control

To move a control, select it, hover over its center so that the four-headed arrow appears, and then drag the control to a different location.

![Move control.](./media/add-configure-controls/move-control.png)

To resize a control, select it, hover over any handle in the selection box so that the two-headed arrow appears, and then drag the handle.

![Drag control.](./media/add-configure-controls/resize-control.png)

> [!NOTE]
> As this article describes later, you can also move and resize a control by modifying any combination of its **[X](controls/properties-size-location.md)**, **[Y](controls/properties-size-location.md)**, **[Height](controls/properties-size-location.md)**, and **[Width](controls/properties-size-location.md)** properties in the formula bar.

## Configure a control in the Properties pane

By using the **Properties** pane, specific to the control you select, you can specify a wide variety of options.

For example, if you select a button control, you can replace the value of the text displayed through the control's **Properties** pane.

:::image type="content" source="./media/add-configure-controls/change-text.png" alt-text="Screenshot that shows how to change the display text on a button control through the Properties pane.":::

> [!NOTE]
> You can also change display text by modifying its [Text](controls/properties-core.md) property in the formula bar.

## Configure a control in the formula bar

Configure a control by selecting a property in the property list and then specifying a value in the formula bar. Autocomplete in the formula bar helps you see values you can use for a control.

### Change the font color of a control

For example, if you want to change the font color for your control's text, you see many color options.

:::image type="content" source="./media/add-configure-controls/formula-bar-options.png" alt-text="Screenshot that shows the control options you can set in the formula bar for a control.":::

### Change the position on the canvas of a control

You can set the X and Y coordinates for the position of the control using the formula bar. Setting coordinates in the formula bar gives you greater precision of control placement.

For example, if you select **X** or **Y** in the properties list and specify a number in the formula bar, you see the control move to that coordinate. In this case, the button moves to position 100 on the X axis, assuming the far left side of the canvas is the zero point.

:::image type="content" source="./media/add-configure-controls/x-property.png" alt-text="Screenshot that shows where to set the X coordinate in the formula bar.":::

### Change the control's size

You can resize a control by selecting **Height** or **Width** in the properties list and then entering a different number in the formula bar.

:::image type="content" source="./media/add-configure-controls/change-height.png" alt-text="Screenshot that shows how to change the height of a control through the formula bar.":::

### Change the control's display text

You can change a control's display text by selecting **Text** in the properties list and then specifying any combination of a literal string, an expression, or a formula in the formula bar.

#### Literal string

A literal string is surrounded by quotation marks and appears exactly as you type it. **"Hello, world"** is a literal string.

:::image type="content" source="./media/add-configure-controls/literal-string.png" alt-text="Screenshot that shows where to add a literal string in the formula bar for a control's display text.":::

> [!NOTE]
> When you add text that's longer than the width of your control, the control doesn't change its width to accommodate the text. You must manually change the control's size to fit the text.

#### Expression

An expression is often based on a property of another control. **Screen2.Height** is an expression that shows the height of **Screen2** where the display text appears for a button control.

:::image type="content" source="./media/add-configure-controls/expression.png" alt-text="Screenshot showing how to add a control property as display text for another control.":::

By using an expression, you can set a background image or icon as the fill for your button.

#### Formula

A formula includes one or more functions. The **Now** function returns the current date and time in your local time zone, and the **Text** function formats values such as dates, times, and currency.

For example, you can display the date and time in a **Label**:

:::image type="content" source="./media/add-configure-controls/formula.png" alt-text="Screenshot that shows how to create a Text() function that displays a shortened version of DateTime." lightbox="./media/add-configure-controls/formula.png":::

Formulas are usually much more complex than this example so that they can update data, sort it, filter it, and perform other operations. For more information, see the [formula reference](/power-platform/power-fx/formula-reference-canvas-apps).

## Related information

- Find step-by-step procedures for configuring common controls such as [screens](add-screen-context-variables.md), [lists](add-list-box-drop-down-list-radio-button.md), [galleries](add-gallery.md), [forms](add-form.md), and [charts](use-line-pie-bar-chart.md).
- Find reference information about each type of control in the [control reference](reference-properties.md).

---

## Add and navigate screens in canvas apps

Source: [add-screen-context-variables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables)

*Learn how to add screens to your canvas app, use arrows to navigate between them, reorder the screens, and set the start screen in Microsoft Power Apps.*

# Add and navigate screens in canvas apps

Create modern, responsive apps by adding prebuilt screens for common app scenarios. The screens feature responsive containers and modern controls that adapt to different screen sizes. You can also add custom screens with different layouts and controls.

The following new prebuilt screens are available:

- [Approval request](add-screen-context-variables.md#approval-request-screen)
- [Welcome screen](add-screen-context-variables.md#welcome-screen)
- [Header and gallery](add-screen-context-variables.md#header-and-gallery-screen)
- [Header and form](add-screen-context-variables.md#header-and-form)
- [Header and table](add-screen-context-variables.md#header-and-table)

:::image type="content" source="./media/add-screen-context-variables/add-a-screen.png" alt-text="Screenshot of the New screen menu in Power Apps Studio showing available layouts.":::

## Add a new screen

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).

1. Create a canvas app or open one for editing.

1. On the [command bar](power-apps-studio.md#1--power-apps-studio-modern-command-bar), select **New screen**, and then select a screen layout.

1. [Preview](power-apps-studio.md#preview) the app to determine how it looks on different devices. For more information, see [Preview an app](preview-app.md).

> [!TIP]
> To make the app adapt to the size of the device display it's running on, turn off the **[Scale to fit](create-responsive-layout.md#disable-scale-to-fit)** option.

## Welcome screen

The **Welcome screen** works well as the first screen of an app. You can customize each tile with an image, a title, and a description. Add or remove tiles in the main container to change the number of tiles. Use the tiles to guide users to other parts of the app.  

The **Welcome screen** template includes the following controls:

- Screen container
  - Header container
    - Header
  - Main container
    - Container
      - Image container
        - Image
      - Title container
        - Feature item button
        - Description text

:::image type="content" source="media/add-screen-context-variables/welcome-screen.png" alt-text="Screenshot that shows what appears when you add a Welcome screen layout from the New screen button." lightbox="media/add-screen-context-variables/welcome-screen.png":::

### Add and customize the Welcome screen

1. Select **New screen** > **Welcome screen**.

1. To change the image of a tile, select it and then select **Edit**.

1. Select the **Feature Item** button control and add your own text in the [Properties pane](power-apps-studio.md#8--properties-pane).

   :::image type="content" source="media/add-screen-context-variables/edit-featured-item-text.png" alt-text="Screenshot that shows where to edit the text of the Featured item tile.":::

1. Select the **Short description or engaging message** text and add your own.

1. Add and remove tiles if needed.

    - To add tiles in the tree view, copy and paste a **Container** item.

    - To remove a tile in the tree view, right-click a **Container**, and then select **Delete**.  

## Header and gallery screen

Use the **Header and gallery** screen to show a range of product or service information, like a product catalog. When you connect a gallery control to a data source, a catalog is automatically created with little customization required.

The [gallery control](controls/control-gallery.md) in the **Header and gallery** screen is a classic control. When the modern gallery control is released, the **Header and gallery** screen uses it. For more information, see [Overview of modern controls and themes in canvas apps](controls/modern-controls/overview-modern-controls.md).

The **Header and gallery** screen has the following template for controls:

- Screen container
  - Header container
    - Header
  - Main container
    - Gallery
      - Gallery container
        - Image container
          - Image
        - Title container
          - Title text
          - Description text
        - Button container
          - Button

:::image type="content" source="media/add-screen-context-variables/header-and-gallery-screen.png" alt-text="Screenshot showing the Header and gallery screen." lightbox="media/add-screen-context-variables/header-and-gallery-screen.png":::

### Add and customize the header and gallery screen

1. Select **New Screen** > **Header and gallery**.

1. In the tree view, select **Gallery** and connect it to a data source such as Dataverse.

1. Select specific controls inside the gallery, such as the image, title text, and text description. In the control's properties, use the *ThisItem* syntax to set the desired image, title text, and description.

   For example, to add the **Account name** to the title text control, find it by typing `ThisItem` in the formula bar to see a list of available items to add from your data set.

   :::image type="content" source="media/add-screen-context-variables/thisitem-property.png" alt-text="Screenshot that shows where to use ThisItem in the formula bar." lightbox="media/add-screen-context-variables/thisitem-property.png":::

## Approval request screen

The **Approval request** screen has a header, a form with a submit button, and a gallery with predefined stages. The **Approval request** screen is useful for scenarios where actions are triggered by form submissions, such as submitting an approval request or displaying a workflow process for a business.

> [!TIP]
> When you add an approval request screen, connect it to a data source. The data source determines the field names in the request form.

The **Approval request** screen has the following template for controls:

- Screen container
  - Header container
    - Header
  - Main container
    - Form container
      - Form title text
      - Approval form
      - Submit button
    - Sidebar container
      - Reviewers text
      - Reviewers gallery

:::image type="content" source="media/add-screen-context-variables/approval-request-screen.png" alt-text="Screenshot showing the Approval request screen." lightbox="media/add-screen-context-variables/approval-request-screen.png":::

### Add and customize the Approval request screen

1. Select **New Screen** > **Approval request**.

1. In the tree view on **ApprovalForm**, connect to a data source such as Dataverse.

1. Choose a data source.

1. To view the details of the approval stages, select **ReviewersGallery** under the **SidebarContainer** node in the tree view. Then, in the properties pane, select the **Advanced** tab and go to **Items**.

    The approval stages have the following details:
   - **Name**: Name of the stage or approver
   - **Title**: Subtitle of the stage or approver
   - **Status**: Stage status
   - **Current**: Whether this stage is the current stage of the approval request

   :::image type="content" source="media/add-screen-context-variables/items-reviewers-gallery.png" alt-text="Screenshot that shows the Items advanced property.":::

To notify the approver, add a Power Automate approval workflow in the button. For more information, see [Create and test an approval workflow with Power Automate](/power-automate/modern-approvals).

## Header and form

The **Header and form** screen has a header, a form, and two buttons to submit the form or cancel form submission. This screen is great for using a full-screen form.  

The **Header and form** screen has the following template for controls:

- Screen container
  - Header container
    - Header
  - Main container
    - Form container
      - Form  
    - Button container
      - Cancel button
      - Submit button

:::image type="content" source="media/add-screen-context-variables/header-and-form-screen.png" alt-text="Screenshot showing the Header and form screen." lightbox="media/add-screen-context-variables/header-and-form-screen.png":::

### Add and customize the Header and form screen

1. Select **New Screen** > **Header and form**.

1. In the tree view, you see **Form** selected and a prompt appears for you to connect the form to a data source.

1. Choose a data source.

1. Optionally, to ensure the best screen responsiveness, select each data card on the form and set its **Width Fit** property to **On** in the **Display** tab of the **Properties** pane.

## Header and table

The **Header and table** screen has two controls: a header control and a table control. This template is great for showing a detailed data table on a screen.

The **Header and table** screen has the following controls:

- Header container
  - Header
- Main container
  - Table

### Add and customize the Header and table screen

1. Select **New Screen** > **Header and table**.

1. In the tree view, select **Table** and connect it to a data source.

## Table and form

The Table and form screen contains two main controls: the modern table control and the modern form control. This template has built-in Power Fx formulas to make data connection and customization easy. This template is ideal for selecting and editing a record by using a form.  

The Table and form screen contains the following controls:

- Screen container
  - Header container
    - Header control
  - Body container
    - Text input (Search)
    - Table control
    - Form control
    - Button
      - New
      - Edit
      - Delete
      - Submit
      - Cancel

:::image type="content" source="media/add-screen-context-variables/table-and-form-screen.png" alt-text="Screenshot showing theTable and form screen." lightbox="media/add-screen-context-variables/table-and-form-screen.png":::

### Add and customize Table and form screen

In Power Apps Studio:

1. Select **New Screen** > **Table and form**.
1. Select **Data** in the inline action bar.
1. Select the data source you want.

   :::image type="content" source="media\add-screen-context-variables\select-data-source.png" alt-text="Screenshot that shows the location of the Data button, where you can select a data source from a list.":::

   When you connect, the table and form controls both connect to the data source.

You can select a record in the table control, and the form shows the details of the selected record.

All buttons in this template have prebuilt Power Fx, so you don't need to customize them. When you connect the screen to the selected data source, the screen becomes fully functional.

:::image type="content" source="media\add-screen-context-variables\screen-view-connected.png" alt-text="Screenshot that shows the screen view when connected to a data source: a data list and its form elements with a submit button." lightbox="media\add-screen-context-variables\screen-view-connected.png" :::

## Reorder screens

When your app has more than one screen, you can change their order in the tree view.

Select the overflow menu of a screen that you want to reorder, and then select **Move up** or **Move down**.

:::image type="content" source="media/add-screen-context-variables/move-screen-up-down.png" alt-text="Screenshot that shows where the overflow menu is located in order to move a screen up or down in your tree view.":::

Use the **[StartScreen](/power-platform/power-fx/reference/object-app#startscreen-property)** property to set the screen that displays first.

## Add navigation

When your app has more than one screen, add navigation so your users can move between them.

1. Select the screen. Select **Insert**. In the search box, type **Next arrow** and then select it.

1. Move the arrow to where you want it to appear on the screen.

1. Select the arrow. Set the **[OnSelect](controls/properties-core.md)** property to the **Navigate** function. For example, use **Navigate(*Target*, Fade)**.

    Replace *Target* with the name of the screen where you want to navigate.

    :::image type="content" source="media/add-screen-context-variables/onselect-default.png" alt-text="Screenshot of the OnSelect property set to the Navigate function." lightbox="media/add-screen-context-variables/onselect-default.png":::

    In this example, when a user selects the arrow, the target screen fades in.

1. On the *Target* screen, add a **Back arrow** icon the same way. Set its [OnSelect](controls/properties-core.md) property, for example, `Navigate(Target, ScreenTransition.Fade)`.

   Replace *Target* with the name of the screen where you want to return.

## Related information

[Screen-control reference](controls/control-screen.md)

---

## Add Microsoft 365 Copilot chat for app users in canvas apps (preview)

Source: [microsoft-365-copilot-canvas-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/microsoft-365-copilot-canvas-app)

*Learn how to enable Microsoft 365 Copilot chat in canvas apps to provide AI-powered insights and enhance productivity for your app users.*

# Add Microsoft 365 Copilot for app users in canvas apps (preview)

[This article is prerelease documentation and is subject to change.]

Microsoft 365 Copilot makes it easier for users to work with canvas apps by offering AI-powered insights through natural language conversations. By using this feature, users can quickly find information, navigate apps more easily, and get help to boost their productivity.
App makers can enable Microsoft 365 Copilot to give users access to conversational AI that understands app data and provides helpful, contextual answers. Users can ask questions about their Microsoft Dataverse table or SharePoint list data in plain language and receive immediate, relevant responses.

This article shows you how to enable and configure Microsoft 365 Copilot for your canvas apps, both at the environment level and for individual apps.

When enabled, users can open Microsoft 365 Copilot in their canvas app by selecting **Copilot** on the upper-right corner. For more information, see [Use Microsoft 365 Copilot in canvas apps](../../user/use-microsoft-365-copilot-canvas-apps.md).

:::image type="content" source="../../user/media/microsoft-365-copilot-button-canvas.png" alt-text="Screenshot of Microsoft 365 Copilot in the canvas app":::

> [!IMPORTANT]
>
> - This feature is in preview.  
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2189520). They're available before an official release so that customers can get early access and provide feedback.
> -  This feature is in the process of rolling out and might not be available in your region yet.

## Prerequisites

To use Microsoft 365 Copilot in canvas apps, make sure the following prerequisites are met:

- You must enable the feature using [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/).
- Your tenant must be set to allow **Dataverse data available in Microsoft 365 Copilot**. For more information, see [Enable Microsoft 365 admin center Copilot Dataverse settings](../data-platform/data-platform-intelligence.md#enable-microsoft-365-admin-center-copilot-dataverse-settings).
- Dataverse Search must be set to **Default** or **On** for the environment. For more information, see [Understand what this means for generative AI experiences](/power-platform/admin/configure-relevance-search-organization#what-dataverse-search-means-for-generative-ai-enabled-experiences).
- To use the Microsoft 365 Copilot feature in your app, users must have a Microsoft 365 Copilot license.

> [!NOTE]
>
> - Microsoft 365 Copilot for canvas apps with Dataverse relies on Dataverse Search indexes. Enabling this feature might increase your environment’s Dataverse capacity consumption. For more information, see [What actions can makers or admins take to manage Dataverse Search efficiently](../../user/relevance-search-benefits.md#what-actions-can-makers-or-admins-take-to-manage-dataverse-search-efficiently).
> - Sufficient Dataverse database capacity must be available to support indexing, semantic search, and Copilot operations. For more information, see [Capacity page details](/power-platform/admin/capacity-storage#capacity-page-details).

## Enable Microsoft 365 Copilot for your environment

To manage Microsoft 365 Copilot for canvas apps, start by learning [how to manage Microsoft 365 Copilot](/copilot/manage).

Power Platform administrators can set up and configure the Microsoft 365 Copilot feature for users in their environment.

1. Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/).

1. In the navigation pane, go to **Copilot** > **Settings**. Under **Power Apps**, expand **Chat Agent** and choose **M365 Copilot**.

1. Select an environment group or an environment name, and then select **Edit Setting**.

1. Select **On** and then select **Save** to enable Microsoft 365 Copilot for your canvas apps in the selected environment group or environment.

## Enable Microsoft 365 Copilot in a canvas app

Makers can enable or disable Microsoft 365 Copilot for a specific canvas app.

1. Sign in to [Power Apps](https://make.preview.powerapps.com).
1. Open a canvas app for editing.
1. Select **Settings** in the command bar.
1. On the left, select **General**.
1. To enable Microsoft 365 Copilot, set **M365 Copilot in canvas apps (Preview)** to **On**. To disable it, set the option to **Off**.

    :::image type="content" source="media/microsoft-365-canvas-apps/microsoft-365-copilot-app-setting.png" alt-text="Screenshot that shows how to turn Microsoft 365 Copilot on or off in a canvas app.":::

1. Select **Save** and then publish the app for the changes to take effect.

## Microsoft 365 Copilot vs. Copilot chat

 Microsoft 365 Copilot is replacing [Copilot chat in canvas apps](add-ai-copilot.md).

### Known limitations

- Agents you author can't yet use in‑app user context to optimize their responses.
- M365 Copilot in canvas apps supports apps that use either SharePoint or Dataverse as a data source but not both within the same app.
- During the initial preview phase, for SharePoint, only applications containing a single SharePoint list will return answers to questions.
- If your canvas app connects to a SharePoint list through an environment variable, Microsoft 365 Copilot won't reference data from that SharePoint list.
- Microsoft 365 Copilot for canvas apps allows users to view data by using read-only operations. This capability means that users can only view data that matches their queries and can't make any changes. To make changes, customization with an agent is required.
- Microsoft 365 Copilot for canvas apps isn't available in the Power Apps mobile app.

## Related information

- [Use Microsoft 365 Copilot in canvas apps (preview)](../../user/use-microsoft-365-copilot-canvas-apps.md)
- [Customize Microsoft 365 Copilot with an agent in canvas apps (preview)](../canvas-apps/customize-microsoft-365-copilot-chat.md)
- [Add Microsoft 365 Copilot to model-driven apps](/power-apps/maker/model-driven-apps/add-microsoft-365-copilot)
- [Use Microsoft 365 Copilot in model-driven apps](../../user/use-microsoft-365-copilot-model-driven-apps.md)
- [Customize Microsoft 365 Copilot in model-driven apps](/power-apps/maker/model-driven-apps/customize-microsoft-365-copilot-chat)

---

## Customize Microsoft 365 Copilot in Power Apps (preview)

Source: [customize-microsoft-365-copilot-chat.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/customize-microsoft-365-copilot-chat)

*Learn how to customize Microsoft 365 Copilot custom engine agents and Copilot Studio agents in Power Apps.*

# Customize Microsoft 365 Copilot with an agent (preview)

 

## Related information

- [Add Microsoft 365 Copilot for app users in canvas apps (preview)](microsoft-365-copilot-canvas-app.md)
- [Use Microsoft 365 Copilot in canvas apps (preview)](../../user/use-microsoft-365-copilot-canvas-apps.md)

---

## Add a Copilot control to a canvas app (preview)

Source: [add-ai-copilot.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-ai-copilot)

*Learn how to add a Copilot control, an AI assistant, to your canvas apps in Microsoft Power Apps.*

# Add a Copilot control to a canvas app (preview)



The Copilot control is an AI assistant that you can add to your canvas apps. By using Copilot, app users can get insights about the data in your app through natural language conversations with an AI-powered copilot. Makers can add the control to any canvas app and choose which data provide answers.

> [!IMPORTANT]
>
> Starting February 2, 2026, you can't add the Copilot control to new canvas apps. Existing apps with this control will remain functional for a limited time but will eventually no longer be supported. [Microsoft 365 Copilot in canvas apps](../canvas-apps/microsoft-365-copilot-canvas-app.md) is the new recommended solution for natural language interactions in canvas apps. To ensure a smooth transition and prevent any disruption, we recommend that you migrate to Microsoft 365 Copilot as soon as it becomes available in your environment.


> [!NOTE]
>
> - This is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2216214), and are available before an official release so that customers can get early access and provide feedback.
> - This feature is powered by [Azure OpenAI Service](/azure/cognitive-services/openai/overview).


## Prerequisites

Ensure you meet the prerequisites and region availability in [Copilot in Power Apps overview (preview)](ai-overview.md).

Copilot doesn't work in environments that use a customer-managed key or [Customer Lockbox](/azure/security/fundamentals/customer-lockbox-overview).

### Set up Copilot for your environment

To let app users use the Copilot chat experience in a canvas app, a Power Platform admin needs to enable **Allow users to analyze data using an AI-powered chat experience in canvas and model-driven apps** in the [Power Platform admin center](https://admin.powerplatform.microsoft.com/home). Learn more in [Manage feature settings](/power-platform/admin/settings-features#copilot-preview).

:::image type="content" source="media/copilot/copilot-for-app-users-on.png" alt-text="Screenshot of the Power Platform admin center environment settings, showing Copilot features.":::

### Set up Copilot for your canvas app

To add a Copilot control to your canvas app, turn on **Copilot component** and **Edit in Copilot Studio** in the app settings in [Power Apps](https://make.powerapps.com/).

**Copilot component**: Turns on the Copilot feature in your canvas app so you can add the Copilot control and connect it to a copilot.

**Edit in Copilot Studio**: Lets you customize the copilot using Copilot Studio. If you turn off this option, only the default copilot is available.

1. Open your [canvas app for editing](edit-app.md) in Power Apps Studio. On the command bar, select **Settings** > **Updates**.

1. On the **Preview** tab, turn on the **Copilot component** and **Edit in Copilot Studio** settings.

   :::image type="content" source="media/copilot/copilot-component-edit-in-copilot-studio.png" alt-text="Screenshot of app settings in Power Apps Studio, with the Copilot component and Edit in Copilot Studio options highlighted.":::

## Add the Copilot control to your canvas app

With your [canvas app open for editing](edit-app.md), and all settings configured:

1. In the app [authoring menu](power-apps-studio.md#5--app-authoring-menu), select **Insert**, and then select **Copilot (preview)**.

1. When prompted to add a data source to Copilot, select a Dataverse table as the data source.

:::image type="content" source="media/copilot/add-data-to-copilot.png" alt-text="Screenshot of the Copilot control properties pane. The Create new copilot button is highlighted.":::

> [!NOTE]
> The Copilot control only supports Dataverse tables for the data source.

## Customize the copilot by using Copilot Studio

Copilot Studio is an app that you use to create and edit copilots for your apps. Define your copilot's articles, actions, and other features. For example, make your copilot respond to specific questions about your app's data or perform actions like opening a screen or sending an email.

Customize your newly connected copilot in Power Apps through the properties menu.

1. Select the Copilot control on your canvas. Select **Edit** next to the **Customize copilot** field in **Properties**.

1. If you don't have a copilot, select **Create new copilot** in the **Customize Copilot** pane. The Copilot control in Power Apps Studio doesn't support enabling an existing Copilot from Copilot Studio.

   :::image type="content" source="media/copilot/edit-in-copilot-studio.png" alt-text="Screenshot of the Copilot control properties pane. The Edit and Edit in Copilot Studio buttons are highlighted." lightbox="media/copilot/edit-in-copilot-studio.png":::

   [Copilot Studio](https://web.powerva.microsoft.com/) opens in a new tab. Any changes you make in Copilot Studio appear in your connected copilot in your canvas app.

Learn more in [Quickstart: Create and deploy a copilot](/microsoft-copilot-studio/fundamentals-get-started).

## Collect feedback from app users

Makers and app users provide feedback on copilot responses by selecting the **Like** (thumbs up) or **Dislike** (thumbs down) button for each response. Enter detailed feedback in the text box, and then select **Submit**.

Feedback goes to Microsoft to help improve the Copilot control.

## Disallow feedback from app users

If you don't want your app users to provide feedback to Microsoft, turn off the feedback option.

1. Sign in to [Power Apps](https://make.powerapps.com), and select **Tables** from the [left navigation pane](intro-maker-portal.md#1--left-navigation-pane).


1. Select the **Organization** table from the list.

1. In the **Organization columns and data** section, select the column headers list. The **Show existing column** popup appears.

1. Search for **Allow users to provide feedback for App Copilot**, and make sure the check box is unchecked.


1. Select **Save**.

:::image type="content" source="media/copilot/allow-users-feedback-setting.png" alt-text="Screenshot of the Show existing column popup in Power Apps, highlighting the Allow users to provide feedback for App Copilot setting." lightbox="media/copilot/allow-users-feedback-setting.png":::

## Related information

- [Build apps through conversation (preview)](ai-conversations-create-app.md)
- [Use your prompt in Power Automate](/ai-builder/use-a-custom-prompt-in-flow)
- [Add Copilot for app users in model-driven apps](../model-driven-apps/add-ai-copilot.md)
- [Power Apps Copilot control (video)](https://youtu.be/11mTv6vZTvY?feature=shared)

---

## Add a custom Copilot to a canvas app

Source: [add-custom-copilot.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-custom-copilot)

*Add a custom Copilot created in Microsoft Copilot Studio and enable it for your canvas app.*

# Add a custom Copilot to a canvas app (preview)

[This article is prerelease documentation and is subject to change.]

You can integrate a custom Copilot created in Microsoft Copilot Studio and enable it for your canvas app. This lets users interact with Copilot to ask questions about the data in your app. With just a few simple steps, you can embed a custom Copilot across all your canvas app screens without changing the app's design.

> [!IMPORTANT]
> Starting February 2, 2026, adding a custom Copilot to new canvas apps will be discontinued. Existing apps using this feature will remain functional for a limited time but will eventually no longer be supported. [Microsoft 365 Copilot in canvas apps](../../user/use-microsoft-365-copilot-canvas-apps.md) is the new recommended solution for natural language interactions in canvas apps. To ensure a smooth transition and prevent any disruption, we recommend that you migrate to Microsoft 365 Copilot as soon as it becomes available in your environment.

> [!NOTE]
> - This is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2189520), and are available before an official release so that customers can get early access and provide feedback.
> - App Copilot for canvas apps is currently rolling out and might not yet be available in your region. App Copilot may be available on [Power Apps mobile](../../mobile/run-powerapps-on-mobile.md) for mobile devices before it becomes available on the web browser during rollout.

## Availability

- This capability might not be available in your region yet. Learn more in [Explore Copilot features by geography and languages](https://releaseplans.microsoft.com/en-US/availability-reports/?report=copilotfeaturereport).
- During the rollout, this capability might be accessible on the [Power Apps mobile app](../../mobile/run-powerapps-on-mobile.md) before it becomes available on web browsers.
- To use copilots in Power Apps, you must enable data movement across regions for generative AI features. This is crucial if your organization and environment are located in different regions. For more information, see [Enable copilots and generative AI features](/power-platform/admin/geographical-availability-copilot#enable-data-movement-across-regions).

## Prerequisites

Before using this feature, make sure the following prerequisites are met:

- Create a custom Copilot in [Copilot Studio](/microsoft-copilot-studio/fundamentals-get-started?tabs=web) and publish it in the same environment as your canvas app.

- Configure the custom Copilot with [user authentication in Microsoft Entra ID](/microsoft-copilot-studio/configuration-authentication-azure-ad).

- [Give makers and users access](/microsoft-copilot-studio/admin-share-bots?tabs=web) to the Copilot within the environment.


## Connect Copilot to your app

Open your [canvas app for editing](edit-app.md) in Power Apps Studio:

1. In the command bar, go to **Settings** > **Updates** > **Preview** tab, and set the toggle for **App Copilot** to **On**.

   You see a **Copilot** tab appear in **Settings**.

1. Select the **Copilot** tab. In the drop-down list under **Connect a copilot**, select a custom copilot published and shared in the same environment as your canvas app.

   :::image type="content" source="media/add-custom-copilot/copilot-tab.png" alt-text="Screenshot that shows the copilot tab in Settings and where you can select an app that was shared with you." lightbox="media/add-custom-copilot/copilot-tab.png":::

1. After you select a Copilot, close the settings dialog box and publish the app. After the app is published, users can use Copilot within it.

Copilot isn't visible when previewing an app in Power Apps Studio. To see Copilot in action, save and publish your app, and then open it using the Power Apps mobile app or a web browser.

> [!TIP]
> Removing the custom Copilot from the app will disable its functionality.

## Use Copilot in your app

- Open your canvas app in a web browser. On the command bar, select **Copilot**.

   :::image type="content" source="media/add-custom-copilot/copilot-chat-in-app.png" alt-text="Screenshot that shows the copilot chat in the app." lightbox="media/add-custom-copilot/copilot-chat-in-app.png":::

- In the Power Apps mobile app on iOS or Android devices, select the floating button to access Copilot. You can reposition the button or dismiss it. To use Copilot again after dismissing it, close and reopen the app.

## Difference between this feature and the Copilot control

This feature lets you add a custom Copilot created in Microsoft Copilot Studio to a canvas app. It doesn't require any changes to the app's layout. It's available both on the web and natively on mobile devices, and it can connect to existing custom Copilots created in Copilot Studio.

When you add a [Copilot control to a canvas app](add-ai-copilot.md), makers need to update the app's layout to accommodate the control, which is only available on the web. This control supports asking questions about your data or connecting to a new  [custom copilot from Copilot Studio](add-ai-copilot.md#customize-the-copilot-by-using-copilot-studio).

## Related information

- [FAQ for Copilot](/microsoft-copilot-studio/faqs-copilot)
- [Add Microsoft 365 Copilot for app users in canvas apps](microsoft-365-copilot-canvas-app.md)

---

## Create and edit Dataverse tables in canvas apps using the table designer

Source: [create-edit-tables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-edit-tables)

*Create and edit Dataverse tables in canvas apps using the table designer.*

# Create and edit tables using the table designer

Create and edit Dataverse tables in canvas apps using the table designer inside [Power Apps Studio](power-apps-studio.md). You can also work with the data that's in the table without leaving the app that you're working on.

## Create a table

1. Create a [new](data-platform-create-app.md) or open an [existing](edit-app.md) app in Power Apps Studio.

1. In the app authoring menu, select **Data**.

   :::image type="content" source="media/tables/data-pane-1.png" alt-text="Screenshot that shows where to select the Data menu option from the authoring menu.":::

1. On the **Data** pane, select **Add Data** > **Create new table**.  

   > [!NOTE]
   > If the **Create new table** button is disabled then review [**Required permissions and limitations**](create-edit-tables.md#required-permissions-and-limitations).

   :::image type="content" source="media/tables/create-new-table.png" alt-text="Screenshot that shows what you see after you select Create new table." lightbox="media/tables/create-new-table.png":::

1. You see **Choose an option to create tables**. For example, you can choose to **Start from blank** or **Start with Copilot** to create a new table.

1. A new table is created for you in the canvas. Enter a name for the table directly where you see the table name.

   You can also expand the **Properties** pane found in the table's overflow menu (the ellipses) to edit the table properties, such as the plural name for the table. For example, a table name can be Ticket, and the plural table name can be Tickets.

   :::image type="content" source="media/tables/edit-table-properties.png" alt-text="Screenshot that shows the Edit table properties popup next to a table in the canvas." lightbox="media/tables/edit-table-properties.png":::

   Can you also add columns or sample data to the table.

1. When you're done editing, select **Save** and exit.

## Edit an existing table

Once a Dataverse table is created, you can start editing the table. You can also add existing Dataverse tables to your app and edit those tables using the table designer.

1. From the app authoring menu, select **Data**.

1. On the **Data** pane, select **Add data**.

1. In the **Select a data source** dialog box, from the list of Dataverse tables, select a table to add to your app.

   :::image type="content" source="media/tables/select-table-5.png" alt-text="Screenshot that shows how to add a table from the Data pane.":::

1. On the newly added table select, **More actions** > **Edit data**.

   :::image type="content" source="media/tables/edit-table-data-6.png" alt-text="Screenshot that shows the Data pane with the overflow menu on a table selected with the Edit data option.":::

1. The selected table is ready for editing in the table designer.

    > [!NOTE]
    > Some system tables might not be available for editing, or some editing actions may be disabled.

### Edit the table properties

After selecting **Edit data**, you see the **Edit table** designer.

1. Select **Edit table properties**.

   ![Edit table properties.](media/tables/edit-table-properties-7.png)

You can edit the following table properties.

| **Property** | **Description** |
|--------------|-----------------|
| **Display name** | The singular name for the table shown in the app. The display name can be changed later. |
| **Plural display name** | The plural name for the table shown in the app. The plural display name can be changed later. |
| **Description** | Provide a meaningful description of the purpose of the table. |

Select **Enable Attachments** to append notes and files to records for this table.

Select the **Primary column** tab if you want to change its **Display Name** or **Description**. The primary column is used by lookup fields when establishing relationships with other tables.

#### Advanced options

Select **Advanced options** to see the optional properties you can set. Otherwise some are already set for you.

| **Property** | **Description** |
|--------------|-----------------|
| **Schema name** | By default, the schema name is automatically created for you based on the display name, but you can change it. The schema name can't contain spaces and includes the customization prefix for the Dataverse solution publisher. You can't change the schema name after the table is saved. |
| **Logical name** | A unique identifier for the entity. This name can't be changed once the entity is created. |
| **Type** | Select the type of table. Use standard for most tables. Activity tables are special tables that can only be owned by a user or team, but can't be owned by an organization. Virtual tables require the table be populated with data from an external source. |
| **Record ownership** | Switch the table type to Activity table, so you can create tables that can manage tasks. The type of **Ownership** defines who can perform operations on a record. |
| **Color** | You can select your table color using words or hex codes.|
| **Primary row image** | You can choose whether to display an image for the table. This image is displayed in Power Apps in some design areas. Notice that the image doesn't appear in apps using the table. To display images in apps, use the image column. Learn more in [Image columns](../data-platform/types-of-fields.md#image-columns). |
| **Apply duplicate detection rules** | If duplicate detection is enabled for your organization, enabling allows you to create duplicate detection rules for this table. |
| **Track changes** | Enables data synchronization in a performant way by detecting what data changed since the data was initially extracted or last synchronized. |
| **Provide custom help** | When selected, set a **Help URL** to control what page users see when they select the help button in the application. Use help to provide guidance specific to your company processes for the table. |
| **Audit changes to its data** | When auditing is enabled for your organization, table records can change to be captured over time. When you enable auditing for a table, auditing is also enabled on all its fields. You can select or clear fields that you want to enable auditing on. |
| **Leverage quick create form if available** | After you create and publish a Quick Create Form for this table, people can create a new record using the Create button in the navigation pane. Learn more in [Create and design model-driven app forms](../model-driven-apps/create-design-forms.md).<br /></br>If enabled for a custom activity table, the custom activity is visible in the group of activity entities when people use the **Create** button in the navigation pane. However, because activities don't support quick create forms, the main form is used when the custom table icon is selected. |
| Enable long term retention | Table can be included in the configuration of data retention, which moves certain records to long term storage. |
| **Creating a new activity** | Associate activities to records for this table. |
| **Doing a mail merge** | App users can use this table with mail merge. |
| **Setting up SharePoint document management** | After other tasks are performed to enable document management for your organization, enabling this feature allows for this table to participate in integration with SharePoint. |
| **Can have connections** | Use the connections feature to show how records for this table have connections to records of other tables that also have connections enabled. |
| **Can have a contact email** | Send emails using an email address stored in one of the fields for this table. If a **Single Line of Text** column with format set to email doesn't already exist for this table, a new one is created when you enable sending email. |
| **Have an access team** | Create team templates for this table. |
| **Can be linked to feedback** | Let app users write feedback for any table record, or rate table records within a defined rating range. Learn more in [Configure a table for feedback/ratings](../data-platform/configure-entity-feedback.md). |
| **Appear in search results** | Enable so that table records can be included in search results when using an app. |
| **Can be taken offline** | Makes data in this table available while the Power Apps application isn't connected to a network. |
| **Can be added to a queue** | Use the table with queues. Queues improve routing and sharing of work by making records for this table available in a central place that everyone can access. |

### Add and edit columns

You can create and edit columns in the table editor.

Learn more in [How to create and edit columns](../data-platform/create-edit-fields.md).

### Editing other table properties

For more advanced table editing scenarios, using the table hub is required. Some examples of these kinds of edits are table relationships, keys, and deleting the table.

Learn more in [Create and edit tables using Power Apps](../data-platform/create-edit-entities-portal.md).

### Add and edit data

The table designer for canvas apps allows you to add new rows to a Dataverse table or edit rows inside Power Apps Studio using the table designer. You can start typing directly into the grid or select, **New row**.

Learn more in [Create your first table](../../teams/create-first-app.md#create-your-first-table).

## Remove a table

To remove a table from your app, select **More options** to the right of the table name then select, **Remove**.

> [!NOTE]
> When you remove a table, the table is removed and not deleted.

:::image type="content" source="media/tables/remove-table-8.png" alt-text="Screenshot that shows the Remove option from the overflow menu of a table in the Data pane.":::

## Required permissions and limitations

- To create a table in Dataverse, the environment must have a Dataverse database provisioned. You must have system customizer or system administrator permissions for the environment where you'd like to build a table. If these conditions aren't met, the **Create New Table** button is disabled.

- You can only create and edit tables in the current Dataverse environment. If you changed your Dataverse environment using the environment picker, then the **Create new table** and **Edit table** options is disabled.

---

## Show a list of items in canvas apps

Source: [add-gallery.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-gallery)

*Use a gallery to show a list of items in your canvas app, and filter the list by specifying a criterion.*

# Show a list of items in canvas apps

Show a list of items from any data source by adding a **[Gallery](controls/control-gallery.md)** control to your canvas app. This topic uses Excel as the data source. Filter the list by configuring the **Gallery** control to show only those items that match the filter criterion in a **[Text input](controls/control-text-input.md)** control.

## Prerequisites

- Learn how to [add and configure a control](add-configure-controls.md) in Power Apps.

- Set up the sample data:
    1. Download [this Excel file](https://download.microsoft.com/download/5/7/f/57fc6c55-6bb0-479b-a5c5-98fa08ee9efd/FlooringEstimates.xlsx), which contains sample data for this tutorial.

    2. Upload the Excel file to a [cloud-storage account](connections/cloud-storage-blob-connections.md), such as OneDrive for Business.

- Open a blank app:
    1. Create a [blank canvas app](create-blank-app.md).

    1. [Add a connection](add-data-connection.md) to the **FlooringEstimates** table in the Excel file.

## Add a gallery to a blank screen

1. On the **Insert** tab, select **Gallery**, and then select **Vertical**.

    ![Add vertical gallery.](./media/add-gallery/gallery-dropdown.png)

1. On the **Properties** tab of the right-hand pane, open the **Items** list, and then select **Flooring Estimates**.

    ![Flooring estimates.](./media/add-gallery/select-layout.png)

1. (optional) In the **Layout** list, select a different option.

## Add a gallery in a screen

1. On the **Home** tab, select **New screen** > **List screen**.

    A screen that contains a **Gallery** control and other controls, such as a search bar, appears.

1. Set the gallery's **Items** property to `FlooringEstimates`.

    The **Gallery** control shows the sample data.

    ![Show data.](./media/add-gallery/show-data-default.png)

## Add a control to the Gallery control
Before you do any other customization, ensure that the layout for your **Gallery** control most closely matches what you want. From there, you can further modify the **Gallery** template, which determines how all data in the **Gallery** control appears.

1. Select the template by clicking or tapping near the bottom of the **Gallery** control and then selecting the pencil icon in its upper-left corner.

    ![Edit gallery template.](./media/add-gallery/edit-item.png)

2. With the template still selected, add a **[Label](controls/control-text-box.md)** control, and then move and resize it so that it doesn't overlap with other controls in the template.

    ![Add label.](./media/add-gallery/add-text-box.png)

3. Select the gallery, and then select **Edit** next to **Fields** on the **Properties** tab of the right-hand pane.

4. Select the label that you added earlier in this procedure, and then open the highlighted list in the **Data** pane.

    ![Open drop-down list.](./media/add-gallery/open-dropdown.png)

5. In that list, click or tap **Price**.

    The **Gallery** control shows the new values.

    ![Final Gallery.](./media/add-gallery/final-gallery.png)

## Filter and sort a gallery
The **[Items](controls/properties-core.md)** property of a **Gallery** control determines which items it shows. In this procedure, you configure that property so that it also determines which records appear based on filter criteria and in what order.

![Search box and sort icon.](./media/add-gallery/text-search-box.png)

1. Set the **[Items](controls/properties-core.md)** property of the **Gallery** control to this formula:

   ```power-fx
    Sort(
        Filter(
			FlooringEstimates,
			IsBlank(TextSearchBox1.Text) or TextSearchBox1.Text in Text(Name)
        ),
        Name,
        If(
            SortDescending1,
            SortOrder.Descending,
            SortOrder.Ascending
        )
    )
    ```

    For more information about the functions in this formula, see the [formula reference](formula-reference.md).

1. Double-click the search box, and then type part or all of a product name in it.

    Only those items that meet the filter criterion appear.

1. While pressing the Alt key, select the sort icon one or more times to switch the sort order.

    The records toggle between ascending and descending alphabetical order based on the product name.

## Highlight the selected item
Set the **Gallery** control's **TemplateFill** property to a formula that's similar to this example, but you can specify different colors if you want:

**If(ThisItem.IsSelected, LightCyan, White)**

## Change the default selection
Set the **Gallery** control's **Default** property to the record that you want to select by default. For example, you can specify the fifth item in the **FlooringEstimates** data source:

**Index(FlooringEstimates, 5)**

In this example, you specify the first item in the **Hardwood** category of the **FlooringEstimates** data source:

**LookUp(FlooringEstimates, Category = "Hardwood")**

## Next steps
Learn how to work with [forms](working-with-forms.md) and [formulas](working-with-formulas.md).

---

## Show items of different heights in a canvas app gallery

Source: [gallery-dynamic-sizing.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/gallery-dynamic-sizing)

*Add and configure a Flexible height gallery to automatically fit the amount of content in each item of the gallery.*

# Show items of different heights in a canvas app gallery

If different items in your data set contain different amounts of data in the same field, you can display items that contain more data without adding extra empty space after items with less data. Add and configure a **Flexible height** gallery control so that you can:

- Configure **Label** controls to expand or shrink based on their contents.
- Position each control so that it automatically appears just below the control above it.

In this article, you show data about flooring products in a **Flexible height** gallery control. The image of each product appears 5 pixels below the overview text, whether that overview is two lines or five.

![Dynamic app.](./media/gallery-dynamic-sizing/dynamic-app.png)

> [!NOTE]
> If you've never added controls to a gallery, complete the steps in [Show a list of items in a gallery](add-gallery.md) before you proceed.

## Add data to a blank app

1. Download [this Excel file](https://download.microsoft.com/download/5/7/f/57fc6c55-6bb0-479b-a5c5-98fa08ee9efd/FlooringEstimates.xlsx), which contains names, overviews, and image links for flooring products.

1. Upload the Excel file to a cloud-storage account such as OneDrive, SharePoint, Dropbox, or Google Drive.

1. Create a [blank app](create-blank-app.md) with **Phone** layout.

1. Add a connection to the **FlooringEstimates** table in the Excel file.

    For more information, see [Add a data connection](add-data-connection.md).

## Add data to a gallery

1. On the **Insert** tab, select **Gallery** > **Flexible height**.

    ![Add gallery.](./media/gallery-dynamic-sizing/add-flexible.png)

1. Resize the gallery to fill the entire screen.

1. Set the gallery's **[Items](controls/properties-core.md)** property to **FlooringEstimates**.

## Show the product names

1. In the upper-left corner of the gallery, select the pencil icon to enter template editing mode.

1. With the gallery template selected, add a **[Label](controls/control-text-box.md)** control.

1. Set the **Text** property of the **Label** control to:

   ```powerapps-dot
   ThisItem.Name
   ```

## Show the product overviews

1. With the gallery template selected, add a second **Label** control and move it below the first.

1. Set the **Text** property of the second **Label** to:

   ```powerapps-dot
   ThisItem.Overview
   ```

1. With the second **Label** selected, rename it to **OverviewText** using the name-tag icon on the **Content** tab.

1. Set the **AutoHeight** property of **OverviewText** to **true**.

   > [!TIP]
   > Setting **AutoHeight** to **true** on a label causes it to grow or shrink to fit its content. This is the key to making the flexible height gallery work correctly—without it, all items render at the same fixed height.

## Show the product images

1. Make the template taller by dragging its bottom edge down to roughly double its current height.

   You can add controls to the template more easily as you build the app. This change doesn't affect how the app looks when it runs.

1. With the gallery template selected, add an **[Image](controls/control-image.md)** control and position it below the **OverviewText** label.

1. Confirm that the **Image** property of the **Image** control is set to:

   ```powerapps-dot
   ThisItem.Image
   ```

1. Set the **[Y](controls/properties-core.md)** property of the **Image** control to position it dynamically below the overview text:

   ```powerapps-dot
   OverviewText.Y + OverviewText.Height + 5
   ```

    ![Final app.](./media/gallery-dynamic-sizing/final-app.png)

   Apply the same concept for any additional controls: set each control's **Y** property based on the **Y** and **Height** of the control immediately above it.

## Next steps

- [Add and configure a gallery control](add-gallery.md)
- [Best practices for working with galleries](gallery-best-practice.md)
- [Get started with formulas in canvas apps](working-with-formulas.md)

---

## Best practices for using the Gallery control in canvas apps

Source: [gallery-best-practice.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/gallery-best-practice)

*Learn best practices and recommendations for configuring gallery controls correctly in canvas apps to avoid unexpected behavior and improve performance.*

# Best practices for using the Gallery control in canvas apps

The **[Gallery](controls/control-gallery.md)** is the only control in canvas apps that can create other controls. It has its own [scope](/troubleshoot/power-platform/power-apps/isolate-and-troubleshoot-common-issues/isolate-canvas-app-issues#try-a-different-app-structure). These advanced features can lead to unexpected behavior when the **Gallery** isn't configured correctly. This article covers best practices and recommendations when you work with **Gallery** controls.

> [!TIP]
> Consider using [modern controls](controls/modern-controls/overview-modern-controls.md) in your gallery items where possible. Modern controls are designed to minimize common pitfalls like unintended `OnChange` triggers and provide better accessibility and styling options. You can also use [Copilot in Power Apps](ai-overview.md) to generate a gallery layout and data connection automatically.

## Don't change gallery items from within the gallery

It's easy to create unstable behavior if `OnChange` or `OnSelect` of child controls modifies the **Items** of the parent gallery. For example, a **Text input** in a gallery can have its `OnChange` property set to:

```power-fx
Patch(GalleryData, ThisItem, {Name: TextInput.Text})
``` 

This is usually fine. Most controls only trigger `OnChange` when users change their value directly. However, the following controls can cause issues because they also trigger `OnChange` when the *system* changes their value:

* **[Combo box](controls/control-combo-box.md)**
* **[Date picker](controls/control-date-picker.md)**
* **[Slider](controls/control-slider.md)**
* **[Toggle](controls/control-toggle.md)**

For example, when `ComboBox.DefaultSelectedItems` changes, it triggers `OnChange`. Consider a **Combo box** in a **Gallery** with `DefaultSelectedItems` set to `First(ThisItem.A)` and its `OnChange` property set to:

```power-fx
UpdateIf(GalleryData, Name = ThisItem.Name, {
    A: Table({
        B: First(Self.SelectedItems).B
    })
})
```

This expression updates a record in the gallery's data source that matches the current item's name, replacing the `A` column with a new table.

This causes an infinite loop. When the user changes the **Combo box** value, `OnChange` fires, which updates `GalleryData`, which changes `DefaultSelectedItems` (because `First(ThisItem.A)` refers to a new table), which triggers `OnChange` again—and so on.

To avoid infinite loops, use [modern controls](controls/modern-controls/overview-modern-controls.md) or other controls that don't trigger `OnChange` when their data changes.

### Slow performance from patching items

Even if you avoid unwanted loops, [patching](/power-platform/power-fx/reference/function-patch) or [updating](/power-platform/power-fx/reference/function-update-updateif) **Gallery** items can be slow if the gallery has many items. The **Gallery** doesn't just update the rows associated with the changed records—in some cases, it reloads all items. This happens because of the loosely structured nature of data sources, which makes it hard for the **Gallery** to determine whether a single record or the entire data source changed.

## Gallery.Selected can change unexpectedly

The **Selected** property of the **Gallery** is a moving target. It can change without user interaction when any of the following occur:

* **Gallery.Default** changes
* **Gallery.Items** changes
* Data sources are refreshed or updated

If you want a stable copy of the item the user selected, store it in a variable. For example, set the **OnSelect** property of the **Gallery** to:

```power-fx
Set(CurrentItem, Self.Selected)
```

Then use `CurrentItem` elsewhere in the app to refer to the most recently user-selected item, rather than the system-updated **Selected** property.

## Don't use Gallery.Selected in a child control's event

The **Selected** property of the **Gallery** changes when a user selects an item. However, this event isn't synchronized with child control events. Referring to `Gallery.Selected` in a child control's events can lead to unexpected results.

For example, when a user selects a **Checkbox** in a **Gallery**, the following events occur in an unspecified order:

* `Checkbox.OnSelect`
* `Checkbox.OnCheck`
* `Gallery.Selected` changes to the newly selected row

Because the order of these events isn't fixed, using `Gallery.Selected` in `Checkbox.OnSelect` might still refer to the previously selected row.

To avoid timing issues, don't use `Gallery.Selected` in child control events. If you must respond to changes in `Gallery.Selected`, use the **Gallery**'s own `OnSelect` event.

## Ensure that the Gallery knows the schema of its items

Setting `Gallery.Items` to a variable or the output of a [Canvas component](create-component.md) can produce unexpected results, depending on when the variable is set or changed.

**Galleries** must know the schema of their **Items** when the app loads. A schema (also called a *shape*) defines the name and type of columns in a data source. For example, this table:

```power-fx
[{A: "abc", B: 123}, {A: "def", B: 456}]
```

has a schema with a text column `A` and a number column `B`.

Most of the time, the **Gallery** can infer the schema from the data source and expressions used in the app. However, if the **Items** property is set to the output of a **Canvas component** or **[Import](controls/control-export-import.md)** control, the **Gallery** can't determine its schema at load time so the output table might not be available yet, and the schema might change. The **Gallery** won't render any items when it doesn't know its schema.

The same issue can occur when **Items** is set to a variable that isn't initialized when the app loads.

As a workaround, hint the expected schema to the **Gallery** using a variable. Set **App.OnStart** to:

```power-fx
If(false, Set(GalleryData, [{A: "abc", B: 123}]), Set(GalleryData, []))
```

This lets the system infer the schema of `GalleryData`. Set the **Items** property of the **Gallery** to `GalleryData`, then update it to the actual data source as needed.

## Don't assume AllItems contains all items of its dataset

The [**AllItems** property](controls/control-gallery.md#additional-properties) contains the items currently loaded into the visible area of the gallery&mdash;not all items in **Items**. **AllItems** can change as the user scrolls to load more items. Typically, this property is used to access values of child controls that the user is currently interacting with, which guarantees those items are loaded.

Don't refer to an item in **AllItems** if you're not sure whether the user has scrolled to that item.

Similarly, [**AllItemsCount**](controls/control-gallery.md#additional-properties) is the count of items loaded into view, not the total record count in **Items**. To get the total number of records in **Items**, use `CountRows(<expression used for Items property>)`.

## Next steps

- [Add a gallery to show a list of items](add-gallery.md)
- [Understand gallery dynamic sizing](gallery-dynamic-sizing.md)
- [Isolate issues in canvas apps](/troubleshoot/power-platform/power-apps/isolate-and-troubleshoot-common-issues/isolate-canvas-app-issues)
- [Overview of modern controls in canvas apps](controls/modern-controls/overview-modern-controls.md)

---

## Show, edit, or add a record in a canvas app

Source: [add-form.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-form)

*Use a canvas-app form to show, edit, or add a record from a table in your data source.*

# Show, edit, or add a record in a canvas app

In a canvas app, add and configure a **[Display](controls/control-form-detail.md)** form control to show all fields in a record. You can also add and configure an **[Edit](controls/control-form-detail.md)** form control to edit any field in a record, add a record, and save your changes back to a data source.

## Prerequisites

- Learn how to [add and configure a control](add-configure-controls.md) in Power Apps.
- Download [this Excel file](https://download.microsoft.com/download/5/7/f/57fc6c55-6bb0-479b-a5c5-98fa08ee9efd/FlooringEstimates.xlsx), which contains sample data for this tutorial.
- Upload the Excel file to a [cloud-storage account](connections/cloud-storage-blob-connections.md), such as OneDrive for Business.
- Create or open an app for phones, [add a connection](add-data-connection.md) to the **FlooringEstimates** table in the Excel file.

    You can add a form to a tablet app, but it won't match this article because the form will have three columns by default.

- If you open an existing app, [add a screen](add-screen-context-variables.md) to it.

## Add a form, and show data
1. On a blank screen, add a **[Drop down](controls/control-drop-down.md)** control, and name it **ChooseProduct**.

    > [!NOTE]
   > If you're not sure how to add a control, rename it, or set a property, see [Add and configure controls](add-configure-controls.md).

1. On the **Properties** tab of the right-hand pane, set **Items** to `FlooringEstimates` and **Value** to `Name`.

    ![Set the form's Items property.](./media/add-form/items-property.png)

    The list shows names of flooring products from the data source.

1. Add an **Edit** form control, move it below **ChooseProduct**, and then resize the form to cover most of the screen.

    ![Add a form.](./media/add-form/add-a-form.png)

    > [!NOTE]
   > This topic describes the **Edit** form control, but similar principles apply to the **Display** form control.

1. Set the form's **[DataSource](controls/control-form-detail.md)** property to **FlooringEstimates** and its **[Item](controls/control-form-detail.md)** property to this formula:

    `ChooseProduct.Selected`

   This formula specifies that, after you finish configuring the form, it will show the record that the user selects in **ChooseProduct**.

1. On the **Properties** tab of the right-hand pane, select **Edit fields**.

    ![Edit fields.](./media/add-form/edit-fields.png)

1. In the **Fields** pane, select **Add field**, select the check box for each field, and then select **Add**.

    ![Add fields.](./media/add-form/add-fields.png)

1. Select the ellipsis (...) next to **Add field**, select **Collapse all**, and then drag **Name** to the top of the list.

    ![Move field.](./media/add-form/move-field.png)

    The **Edit** form control reflects your change.

    ![Show form.](./media/add-form/show-form1.png)

## Set the card type for a field
1. In the **Fields** pane, expand the **Price** field by selecting its down arrow.

1. Open the **Control type** list, and then select **Edit slider**.

    ![Edit slider.](./media/add-form/edit-slider.png)

    In the form, the **Price** field shows a **Slider** control instead of a **Text input** control.

1. (optional) Follow the same process to change the control for the **Overview** field to an **Edit multi-line text** control.

## (Edit form only) Save changes

1. Rename the form **EditForm**.

1. Add a **[Button](controls/control-button.md)** control, and set its **[OnSelect](controls/properties-core.md)** property to this formula:

   `SubmitForm(EditForm)`

1. Press F5 to open Preview, change the name of a product, and then select the button that you created.

    The **[SubmitForm](functions/function-form.md)** function saves your changes to the data source.

1. (optional) Close Preview by pressing Esc (or by selecting the close icon in the upper-right corner).

## Next steps
Learn more about working with [forms](working-with-forms.md) and [formulas](working-with-formulas.md).

---

## Understand canvas-app forms

Source: [working-with-forms.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-forms)

*Learn how to add Display form and Edit form controls to a canvas app to view, edit, create, and delete records from a data source.*

# Understand canvas-app forms

Add three types of controls to a canvas app so that the user can browse for a record, display details about that record, and edit or create a record:

| Activity | Control | Description |
| --- | --- | --- |
| **Browse for a record** |**[Gallery](controls/control-gallery.md)** control |Filter, sort, search, and scroll through records in a data source, and select a specific record. Display only a few fields from each record to show several records at a time, even on a small screen. |
| **Show details of a record** |**[Display form](controls/control-form-detail.md)** control |For a single record, display many or all fields in that record. |
| **Edit or create a record** |**[Edit form](controls/control-form-detail.md)** control |Update one or more fields in a single record (or create a record starting with default values), and save those changes back to the underlying data source. |

Put each control on a different screen to make them easier to distinguish:

![Browse, viewing, and editing records across three screens.](./media/working-with-forms/three-screens.png)

As this article describes, combine these controls with formulas to create the overall user experience.

> [!NOTE]
> This article uses the classic Display form and Edit form controls. You can also build forms with the modern [Form control](controls/modern-controls/modern-control-form.md), which uses the Microsoft Fluent 2 design system. Both the classic and modern forms are supported and use the same form functions.

## Prerequisites

* [Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) by providing the same credentials that you used to sign up.
* Learn how to [configure a control](add-configure-controls.md) in Power Apps.

## Explore a generated app
Power Apps can automatically generate an app based on a data source that you specify. Each app contains three screens with the controls described earlier and formulas that connect them. Run these apps "out of the box," customize them for your specific goals, or examine how they work so that you can learn useful concepts that apply to your own apps. In the following sections, inspect the screens, controls, and formulas that drive a generated app.  

### Browse screen
![Browse screen.](./media/working-with-forms/afd-browse-screen-basic.png)

This screen features these key formulas:

| Control | Supported behavior | Formula |
| --- | --- | --- |
| **BrowseGallery1** |Display records from the **Assets** data source. |The **[Items](controls/properties-core.md)** property of the gallery is set to a formula that's based on the **Assets** data source. |
| **ImageNewItem1** |Display the **Edit and Create** screen with each field set to a default value, so that the user can easily create a record. |The **[OnSelect](controls/properties-core.md)** property of the image is set to this formula:<br> **NewForm( EditForm1 );<br>Navigate( EditScreen1, None )** |
| **NextArrow1** (in the gallery) |Display the **Details** screen to view many or all fields of the currently selected record. |The **[OnSelect](controls/properties-core.md)** property of the arrow is set to this formula:<br>**Navigate( DetailScreen1, None )** |

The primary control on this screen, **BrowseGallery1**, covers most of the area of the screen. The user can scroll through the gallery to find a specific record to display more fields or to update.

Set the **[Items](controls/properties-core.md)** property of a gallery to show records from a data source in it. For example, set that property to **Assets** to show records from a data source of that name.

> [!NOTE]
> In a generated app, **[Items](controls/properties-core.md)** is set to a significantly more complicated formula by default so that the user can sort and search for records. You'll learn how to build that formula later in this topic; the simpler version is enough for now.

Instead of finding a record to display or edit, the user can create a record by selecting the "+" symbol above the gallery. Create this effect by adding an **[Image](controls/control-image.md)** control, showing a "+" symbol in it, and setting its **[OnSelect](controls/properties-core.md)** property to this formula:
<br>**NewForm( EditForm1 ); Navigate( EditScreen1, None )**

This formula opens the **Edit and Create** screen, which features an **[Edit form](controls/control-form-detail.md)** control named **EditForm1**. The formula also switches that form into **New** mode, in which the form shows default values from the data source so that the user can easily create a record from scratch.

To examine any control that appears in **BrowseGallery1**, select that control in the first section of that gallery, which serves as a template for all other sections. For example, select the middle **[Label](controls/control-text-box.md)** control on the left edge:

![Browse screen controls.](./media/working-with-forms/afd-browse-gallery-controls.png)

In this example, the control's **[Text](controls/properties-core.md)** property is set to **ThisItem.AssignedTo**, which is a field in the **Assets** data source. The **[Text](controls/properties-core.md)** property of the other three **[Label](controls/control-text-box.md)** controls in the gallery are set to similar formulas, and each control shows a different field in the data source.  

Select the **[Shape](controls/control-shapes-icons.md)** control (the arrow), and confirm that its **[OnSelect](controls/properties-core.md)** property is set to this formula:
<br>**Navigate( DetailScreen1, None )**

If the user finds a record in **BrowseGallery1**, the user can select the arrow for that record to show more information about it in **DetailScreen1**. By selecting an arrow, the user changes the value of the **Selected** property of **BrowseGallery1**. In this app, that property determines which record appears in not only **DetailScreen1** but also, if the user decides to update the record, the **Edit and Create** screen.

### Detail screen
![Detail screen controls.](./media/working-with-forms/afd-detail-screen-basic.png)

This screen features these key formulas:

| Control | Supported behavior | Formula |
| --- | --- | --- |
| **DetailForm1** |Displays a record in the **Assets** data source |Set the **[DataSource](controls/control-form-detail.md)** property to **Assets**. |
| **DetailForm1** |Determines which record to display. In a generated app, displays the record that the user selected in the gallery. |Set the **[Item](controls/control-form-detail.md)** property of this control to this value:<br>**BrowseGallery1.Selected** |
| **[Card](controls/control-card.md)** controls |In a **[Display form](controls/control-form-detail.md)** control, displays a single field in a record. |Set the **[DataField](controls/control-card.md)** property to the name of a field, enclosed in double quotation marks (for example, **"Name"**). |
| **ImageBackArrow1** |When the user selects this control, opens **BrowseScreen1**. |Set the **[OnSelect](controls/properties-core.md)** property to this formula:<br>**Back()** |
| **ImageDelete1** |When the user selects this control, deletes a record. |Set the **[OnSelect](controls/properties-core.md)** property to this formula:<br>**Remove( Assets, BrowseGallery1.Selected )** |
| **ImageEdit1** |When the user selects this control, opens the **Edit and Create** screen to the current record. |Set the **[OnSelect](controls/properties-core.md)** property to this formula:<br>**Navigate( EditScreen1, None )** |

At the top of the screen, three images sit outside of **DetailForm1** and act as buttons, orchestrating between the three screens of the app.

**DetailForm1** dominates this screen and displays the record that the user selected in the gallery (because the form's **[Item](controls/control-form-detail.md)** property is set to **BrowseGallery1.Selected**). The **[DataSource](controls/control-form-detail.md)** property of the form also provides metadata about the data source, such as a user-friendly display name for each field.

**DetailForm1** contains several **[Card](controls/control-card.md)** controls. You can select either the **[Card](controls/control-card.md)** control itself or the control that it contains to discover additional information.

![Detail card and card controls selected in the authoring experience.](./media/working-with-forms/afd-detail-card-controls.png)

The **[DataField](controls/control-card.md)** property of a **[Card](controls/control-card.md)** control determines which field the card displays. In this case, that property is set to **AssetID**. The card contains a **[Label](controls/control-text-box.md)** control for which the **[Text](controls/properties-core.md)** property is set to **Parent.Default**. This control shows the **Default** value for the card, which is set through the **[DataField](controls/control-card.md)** property.

In a generated app, **[Card](controls/control-card.md)** controls are locked by default. When a card is locked, you can't modify some properties, such as **[DataField](controls/control-card.md)**, and the formula bar is unavailable for those properties. This restriction helps ensure that your customizations don't break the basic functionality of the generated app. However, you can change some properties of a card and its controls in the right-hand pane:

![Detail screen with options pane open.](./media/working-with-forms/detail-screen-new.png)

In the right-hand pane, you can select which fields to display and in which kind of control each field displays.

### Edit/Create screen
![Edit screen controls.](./media/working-with-forms/afd-edit-screen-basic.png)

This screen features these key formulas:

| Control | Supported behavior | Formula |
| --- | --- | --- |
| **EditForm1** |Displays a record in the **Assets** data source. |Set the **[DataSource](controls/control-form-detail.md)** property to **Assets**. |
| **EditForm1** |Determines which record to display. In a generated app, displays the record that the user selected in **BrowseScreen1**. |Set the **[Item](controls/control-form-detail.md)** property to this value:<br>**BrowseGallery1.Selected** |
| **[Card](controls/control-card.md)** controls |In a **[Edit form](controls/control-form-detail.md)** control, provides controls so that the user can edit one or more fields in a record. |Set the **[DataField](controls/control-card.md)** property to the name of a field, enclosed in double quotation marks (for example, **"Name"**). |
| **ImageCancel1** |When the user selects this control, discards any changes in progress, and opens the **Details** screen. |Set the **[OnSelect](controls/properties-core.md)** property to this formula:<br>**ResetForm( EditForm1 ); Back()** |
| **ImageAccept1** |When the user selects this control, submits changes to the data source. |Set the **[OnSelect](controls/properties-core.md)** property to this formula:<br>**SubmitForm( EditForm1 )** |
| **EditForm1** |If changes are accepted, returns to the previous screen. |Set the **[OnSuccess](controls/control-form-detail.md)** property to this formula:<br>**Back()** |
| **EditForm1** |If changes aren't accepted, remain on the current screen so that the user can fix any issues and try to submit again. |Leave the **[OnFailure](controls/control-form-detail.md)** property blank. |
| **LblFormError1** |If changes aren't accepted, shows an error message. |Set the **[Text](controls/properties-core.md)** property to this value:<br>**EditForm1.Error** |

As in the **Details** screen, a form control, named **EditForm1**, dominates the **Edit and Create** screen. In addition, the **[Item](controls/control-form-detail.md)** property of **EditForm1** is set to **BrowseGallery1.Selected**, so the form displays the record that the user selected in **BrowseScreen1**. While the **Details** screen shows each field as read-only, the user can update the value of one or more fields by using the controls in **EditForm1**. It also uses the **[DataSource](controls/control-form-detail.md)** property to access metadata about this data source, such as the user-friendly display name for each field and the location where changes should be saved.

If the user selects the "X" icon to cancel an update, the **[ResetForm](functions/function-form.md)** function discards any unsaved changes, and the **[Back](functions/function-navigate.md)** function opens the **Details** screen. Both the **Details** screen and the **Edit and Create** screen show the same record until the user selects a different one on **BrowseScreen1**. The fields in that record remain set to the values that were most recently saved, not any changes that the user made and then abandoned.

If the user changes one or more values in the form and then selects the "checkmark" icon, the **[SubmitForm](functions/function-form.md)** function sends the user's changes to the data source.

* If the changes are successfully saved, the form's **[OnSuccess](controls/control-form-detail.md)** formula runs, and the **Back()** function opens the detail screen to show the updated record.
* If the changes aren't successfully saved, the form's **[OnFailure](controls/control-form-detail.md)** formula runs, but it doesn't change anything because it's *blank*. The **Edit and Create** screen remains open so that the user can either cancel the changes or fix the error. **LblFormError1** shows a user-friendly error message, to which the form's **Error** property is set.

As with a **[Display form](controls/control-form-detail.md)** control, an **[Edit form](controls/control-form-detail.md)** control contains **[Card](controls/control-card.md)** controls, which contain other controls that show different fields in a record:

![Edit card and card controls selected in the authoring experience.](./media/working-with-forms/afd-edit-card-controls.png)

In the previous image, the selected card shows the **AssetID** field and  contains a **[Text input](controls/control-text-input.md)** control so that the user can edit the value of that field. (In contrast, the detail screen shows the same field in a **[Label](controls/control-text-box.md)** control, which is read-only.) The **[Text input](controls/control-text-input.md)** control has a **[Default](controls/properties-core.md)** property, which is set to **Parent.Default**. If the user were creating a record instead of editing one, that control would show an initial value that the user can change for the new record.

In the right-hand pane, you can show or hide each card, rearrange them, or configure them to show fields in different types of controls.

![Edit screen with options pane open.](./media/working-with-forms/edit-screen.png)

## Build an app from scratch
By understanding how Power Apps generates an app, you can build one yourself that uses the same building blocks and formulas discussed earlier in this topic.

## Identify test data
To get the most from this article, start with a data source with which you can experiment. It should contain test data that you can read and update without concern.

> [!NOTE]
> If you use a list created using Microsoft Lists, a SharePoint library, or an Excel table that contains column names with spaces as your data source, Power Apps will replace the spaces with **"\_x0020\_"**. For example, **"Column Name"** in SharePoint or Excel will appear as **"Column_x0020_Name"** in Power Apps when displayed in the data layout or used in a formula.

To follow the rest of this article exactly, create a list named "Ice Cream" that contains this data:

![Ice cream list.](./media/working-with-forms/sharepointlist-icecream.png)

* Create an app from blank, for phones, and [connect it to your data source](add-data-connection.md).
  
    > [!NOTE]
  > Tablet apps are very similar, but you may want a different [screen layout](#screen-design) to make the most of the extra screen space.
  
    The examples in the rest of the topic are based on a data source named **Ice Cream**.

## Browse records
Get a quick piece of information from a record by finding it in a gallery on a browse screen.

1. Add a **Vertical** gallery, and change the layout to **Title** only.
   
    ![Add vertical gallery.](./media/working-with-forms/new-gallery.png)
2. Set the gallery's **[Items](controls/properties-core.md)** property to **Ice Cream**.
3. Set the **[Text](controls/properties-core.md)** property of the first label in the gallery to **ThisItem.Title** if it's set to something else.
   
    The label now shows the value in the **Title** field for each record.
   
    ![Updated label.](./media/working-with-forms/new-gallery-2.png)
4. Resize the gallery to fill the screen, and set its **[TemplateSize](controls/control-gallery.md)** property to **60**.
   
    The screen resembles this example, which shows all records in the data source:
   
    ![Gallery connected to Ice Cream data source.](./media/working-with-forms/new-gallery-icecream.png)

## View details
If the gallery doesn't show the information that you want, select the arrow for a record to open the details screen. A **[Display form](controls/control-form-detail.md)** control on that screen shows more, possibly all, fields for the record that you selected.

The **[Display form](controls/control-form-detail.md)** control uses two properties to display the record:

* **[DataSource](controls/control-form-detail.md)** property.  The name of the data source that holds the record. This property populates the right-hand panel with fields and determines the display name and data type (string, number, date, etc.) of each field.  
* **[Item](controls/control-form-detail.md)** property.  The record to display.  This property is often connected to the **Selected** property of the **[Gallery](controls/control-gallery.md)** control so that the user can select a record in the **[Gallery](controls/control-gallery.md)** control and then drill into that record.

When the **[DataSource](controls/control-form-detail.md)** property is set, you can add and remove fields through the right-hand pane and change how they're displayed.

On this screen, users can't intentionally or accidentally change any values of the record. The **[Display form](controls/control-form-detail.md)** control is a read-only control, so it won't modify a record.

To add a **[Display form](controls/control-form-detail.md)** control:

1. Add a screen, and then add a **[Display form](controls/control-form-detail.md)** control to it
2. Set the **[DataSource](controls/control-form-detail.md)** property of the form control to **'Ice Cream'**.

In the right-hand pane, you can select the fields to display on your screen and which type of card to display for each field. As you make changes in the right-hand pane, the **[DataField](controls/control-card.md)** property on each **[Card](controls/control-card.md)** control is set to the field that the user will interact with. Your screen should resemble this example:

![Ice cream new screen.](./media/working-with-forms/ice-cream-new.png)

Finally, we need to connect the **[Display form](controls/control-form-detail.md)** control to the **[Gallery](controls/control-gallery.md)** control so that we can look at details for a specific record.  As soon as we complete setting the **[Item](controls/control-form-detail.md)** property, the first record from the gallery will appear in our form.

* Set the **[Item](controls/control-form-detail.md)** property of the **[Display form](controls/control-form-detail.md)** control to **Gallery1.Selected**.
   
    The details for the selected item appear in the form.
   
    ![Display form for Ice Cream data source, connected to the gallery control.](./media/working-with-forms/view-form-select-coconut.png)

Great!  We now turn to navigation: how a user opens the details screen from the gallery screen and opens the gallery screen from the details screen.

* Add a **[Button](controls/control-button.md)** control to the screen, set its **[Text](controls/properties-core.md)** property to show **[Back](functions/function-navigate.md)**, and set its **[OnSelect](controls/properties-core.md)** property to **Back()**.
   
    This formula returns the user back to the gallery when they finish viewing details.

    ![Display form for Ice Cream data source with back button.](./media/working-with-forms/viewform-icecream-back.png)

Now, let's return to the **[Gallery](controls/control-gallery.md)** control and add some navigation to our detail screen.

1. Switch to the first screen, which is hosting our **[Gallery](controls/control-gallery.md)** control, and select the arrow in the first item in the gallery.

2. Set the **[OnSelect](controls/properties-core.md)** property of the shape to this formula:
   <br>**Navigate( Screen2, None )**
   
    ![Display form for Ice Cream data source with back button with Navigate update.](./media/working-with-forms/gallery-icecream-nav-new.png)

3. Select the play button (or press F5), and then select an arrow in the gallery to show the details for an item.

4. Select the **[Back](functions/function-navigate.md)** button to return to the gallery of products, and then press Esc.

## Editing details
Finally, our last core activity is changing the contents of a record, which users accomplish in an **[Edit form](controls/control-form-detail.md)** control.

The **[Edit form](controls/control-form-detail.md)** control uses two properties to display and edit the record:

* **[DataSource](controls/control-form-detail.md)** property.  The name of the data source that holds the record.  Just as with the **[Display form](controls/control-form-detail.md)** control, this property populates the right-hand panel with fields and determines the display name and data type (string, number, date, etc.) for each field. This property also determines whether each field's value is valid before submitting it to the underlying data source.
* **[Item](controls/control-form-detail.md)** property.  The record to edit, which is often connected to the **Selected** property of the **[Gallery](controls/control-gallery.md)** control. That way, you can select a record in the **[Gallery](controls/control-gallery.md)** control, show it in the details screen, and edit it in the **Edit and Create** screen.

To add an **[Edit form](controls/control-form-detail.md)** control:

1. Add a screen, add an **[Edit form](controls/control-form-detail.md)** control, and then set the form's **[DataSource](controls/control-form-detail.md)** property to **'Ice Cream'**.
2. Set the **[Item](controls/control-form-detail.md)** property to **Gallery1.Selected**.

You can now select the fields to display on your screen. You can also select which type of card to display for each field. As you make changes in the right-hand pane, the **[DataField](controls/control-card.md)** property on each **[Card](controls/control-card.md)** control is set to the field your user will interact with.  Your screen should resemble this example:

![Display form for Ice Cream data source.](./media/working-with-forms/icecream-edit.png)

These two properties are the same as the properties on the **[Display form](controls/control-form-detail.md)** control.  And with these alone, we can display the details of a record.  

The **[Edit form](controls/control-form-detail.md)** control goes further by offering the **[SubmitForm](functions/function-form.md)** function to write back changes to the data source. You use this with a button or image control to save a user's changes.

* Add a **[Button](controls/control-button.md)** control, set its **[Text](controls/properties-core.md)** property to show **Save**, and set its **[OnSelect](controls/properties-core.md)** property to this formula:<br>
  **SubmitForm( Form1 )**

![Edit form for Ice Cream data source.](./media/working-with-forms/edit-icecream-save.png)

To add navigation to and from this screen:

1. Add another **[Button](controls/control-button.md)** control, set its **[Text](controls/properties-core.md)** property to show **Cancel**, and set its **[OnSelect](controls/properties-core.md)** property to this formula: <br>**ResetForm( Form1 ); Back()**
   
    This formula discards any unsaved edits and opens the previous screen.
   
    ![Updated screen.](./media/working-with-forms/edit-icecream-cancel.png)
2. Set the **[OnSuccess](controls/control-form-detail.md)** property of the form to **Back()**.
   
    When updates are successfully saved, the previous screen (in this case, the details screen) opens automatically.
   
    ![Edit form with added "OnSuccess" rule](./media/working-with-forms/edit-icecream-onsuccess.png)
3. On the **Display** screen, add a button, set its **[Text](controls/properties-core.md)** property to show **Edit**, and set its **[OnSelect](controls/properties-core.md)** property to this formula:<br> **Navigate( Screen3, None )**
   
    ![Text property updated.](./media/working-with-forms/viewform-icecream-edit.png)

You've built a basic app with three screens for viewing and entering data. To try it out, show the gallery screen, and then select the play button (or press F5 on your keyboard). The pink dot indicates where the user selects the screen at each step.

![Try out the ice cream app.](./media/working-with-forms/try-icecream.png)

## Create a record
The user interacts with the same **Edit** form to both update and create records. When the user wants to create a record, the **[NewForm](functions/function-form.md)** function switches the form to **New** mode.

When the form is in **New** mode, the value of each field is set to the defaults of the data source. The record that's provided to the form's **[Item](controls/control-form-detail.md)** property is ignored.  

When the user is ready to save the new record, **[SubmitForm](functions/function-form.md)** runs. After the form is successfully submitted, the form is switched back to **EditMode**.  

On the first screen, you'll add a **New** button:

1. On the screen with the gallery, add a **[Button](controls/control-button.md)** control.
2. Set the button's **[Text](controls/properties-core.md)** property to **New** and its **[OnSelect](controls/properties-core.md)** property to this formula:<br>
   **NewForm( Form1 ); Navigate( Screen3, None )**
   
    This formula switches the **[Edit form](controls/control-form-detail.md)** control on **Screen3** to **New** mode and opens that screen so that the user can fill it in.

![Edit form updated.](./media/working-with-forms/gallery-icecream-new.png)

When the Edit and Create screen opens, the form is empty, ready for the user to add an item. When the user selects the **Save** button, the **[SubmitForm](functions/function-form.md)** function ensures that a record is created instead of being updated. If the user selects the **Cancel** button, the **[ResetForm](functions/function-form.md)** function switches the form back to **Edit** mode, and the **[Back](functions/function-navigate.md)** function opens the screen for browsing the gallery.

## Delete a record
1. On the **Display** screen, add a button, and set its **[Text](controls/properties-core.md)** property to show **Delete**..
2. Set the button's **[OnSelect](controls/properties-core.md)** property to this formula:
   <br>**Remove( 'Ice Cream', Gallery1.Selected ); Back()**
   
    ![Remove a record.](./media/working-with-forms/viewform-icecream-remove.png)

## Handling errors
In this app, an error occurs when the value of a field is not valid, a required field is blank, you're disconnected from the network, or any number of other problems pop up.  

If **[SubmitForm](functions/function-form.md)** fails for any reason, the **Error** property of the **[Edit form](controls/control-form-detail.md)** control contains an error message to show the user. With this information, the user should be able to correct the issue and resubmit the change, or they can cancel the update.

1. On the Edit and Create screen, add a **[Label](controls/control-text-box.md)** control, and move it just below the **Save** button. Any error will be easy to see after the user selects this control to save changes.

2. Set the **[Text](controls/properties-core.md)** property of the **[Label](controls/control-text-box.md)** control to show **Form1.Error**.

    ![Display form with added "Edit" button](./media/working-with-forms/edit-icecream-error.png)

In an app that Power Apps generates from data, the **[AutoHeight](controls/control-text-box.md)** property on this control is set to *true* so that no space is consumed if no error occurs. The **[Height](controls/properties-size-location.md)** and **[Y](controls/properties-size-location.md)** properties of the **[Edit form](controls/control-form-detail.md)** control are also adjusted dynamically to account for this control growing when an error occurs. For more details, generate an app from existing data, and inspect these properties. The text-box control for errors is very short when no error has occurred, you may need to open the **Advanced** view (available on the **View** tab) to select this control.

![App from data edit form with error text control selected.](./media/working-with-forms/edit-assets-error1.png)

![App from data edit form with form control selected.](./media/working-with-forms/edit-assets-error2.png)

## Refresh data
The data source is refreshed whenever the user opens the app, but the user might want to refresh the records in the gallery without closing the app. Add a **Refresh** button so that the user can select it to manually refresh the data:

1. On the screen with the **[Gallery](controls/control-gallery.md)** control, add a **[Button](controls/control-button.md)** control and set its **[Text](controls/properties-core.md)** property to show **Refresh**.

2. Set the **[OnSelect](controls/properties-core.md)** property of this control to this formula:<br> **Refresh( 'Ice Cream' )**

    ![Refresh the data source.](./media/working-with-forms/browse-icecream-refresh.png)

## Search and sort the gallery
In the app that Power Apps generated from data, we neglected to discuss two controls at the top of the Browse screen. By using these controls, the user can search for one or more records, sort the list of records in ascending or descending order, or both.

![Sorting and searching controls on browse screen.](./media/working-with-forms/afd-browse-search-sort.png)

When the user selects the sort button, the sort order of the gallery reverses. To create this behavior, we use a *context variable* to track the direction in which the gallery is sorted. When the user selects the button, the variable is updated, and the direction reverses. The **[OnSelect](controls/properties-core.md)** property of the sort button is set to this formula:
**UpdateContext( {SortDescending1: !SortDescending1} )**

The **[UpdateContext](functions/function-updatecontext.md)** function creates the **SortDescending1** context variable if it doesn't already exist. The function will read the value of the variable and set it to the logical opposite by using the **!** operator. If the value is *true*, it becomes *false*. If the value is *false*, it becomes *true*.

The formula for the **[Items](controls/properties-core.md)** property of the **[Gallery](controls/control-gallery.md)** control uses this context variable, along with the text in the **TextSearchBox1** control:

```power-fx
Sort( 
	If( IsBlank(TextSearchBox1.Text),
		Assets,
        Filter( Assets, TextSearchBox1.Text in Text(ApproverEmail) ) 
	),
	ApproverEmail,
    If(SortDescending1, Descending, Ascending) 
)
```

Let's break this down:

* On the outside, we have the **[Sort](functions/function-sort.md)** function, which takes three arguments: a table, a field on which to sort, and the direction in which to sort.  
  
  * The sort direction is taken from the context variable that toggles when the user selects the **ImageSortUpDown1** control. The *true*/*false* value is translated to the constants **Descending** and **Ascending**.
  * The field to sort on is fixed to **ApproverEmail**. If you change the fields that appear in the gallery, you'll need to change this argument too.
* On the inside, we have the **[Filter](functions/function-filter-lookup.md)** function, which takes a table as an argument and an expression to evaluate for each record.
  
  * The table is the raw **Assets** data source, which is the starting point before filtering or sorting.
  * The expression searches for an instance of the string in **TextSearchBox1** within the **ApproverEmail** field.  Again, if you change the fields that appear in the gallery, you'll also need to update this argument.
  * If **TextSearchBox1** is empty, the user wants to show all records, and the **[Filter](functions/function-filter-lookup.md)** function is bypassed.

This is but one example; you can craft your own formula for the **[Items](controls/properties-core.md)** property, depending on the needs of your app, by composing **[Filter](functions/function-filter-lookup.md)**, **[Sort](functions/function-sort.md)**, and other functions and operators together.    

## Screen design
So far, we haven't discussed other ways to distribute controls across screens. That's because you have many options, and the best selection depends on your specific app's needs.

Because real estate on phone screens is so limited, you probably want to browse, display, and edit/create on different screens. In this topic, the **[Navigate](functions/function-navigate.md)** and **[Back](functions/function-navigate.md)** functions open each screen.  

On a tablet, you can browse, display, and edit/create on two or even one screen. For the latter, no **[Navigate](functions/function-navigate.md)** or **[Back](functions/function-navigate.md)** function would be required.

If the user is working on the same screen, you need to be careful that the user can't change the selection in the **[Gallery](controls/control-gallery.md)** and potentially lose edits in the **[Edit form](controls/control-form-detail.md)** control.  To keep the user from selecting a different record when changes to another record haven't been saved yet, set the **[Disabled](controls/properties-core.md)** property of the gallery to this formula:<br>
**EditForm.Unsaved**

## Troubleshoot common form issues

### SubmitForm doesn't save changes

If **[SubmitForm](functions/function-form.md)** runs but changes aren't saved, check the following:

- **Validation errors**: The form's **Error** property contains an error message when submission fails. Add a **[Label](controls/control-text-box.md)** control and set its **[Text](controls/properties-core.md)** property to **Form1.Error** to surface the error to the user.
- **Missing required fields**: If the data source marks fields as required, the form won't submit until those fields have values. Check the **[DataSourceInfo](functions/function-datasourceinfo.md)** function or validate fields with **[Validate](functions/function-validate.md)**.
- **Permissions**: Make sure the signed-in user has write access to the data source (for example, the SharePoint list or Dataverse table).
- **Data source connection**: If the app lost its connection, **[SubmitForm](functions/function-form.md)** can't reach the data source. Use the **[Connection](functions/signals.md)** signal to check connectivity and display a message to the user.

### Gallery doesn't show new or updated records after saving

After **[SubmitForm](functions/function-form.md)** succeeds, the form's data source is automatically refreshed. However, if the gallery is connected to a different variable or filtered view, it may not immediately reflect the change. Use the **[Refresh](functions/function-refresh.md)** function in the form's **[OnSuccess](controls/control-form-detail.md)** formula to force the gallery to reload:

```power-fx
SubmitForm(Form1);
Refresh(MyDataSource)
```

### Form shows data from the wrong record

The form's **[Item](controls/control-form-detail.md)** property controls which record is displayed. Make sure it's set to the **Selected** property of your gallery (for example, `Gallery1.Selected`). If it's set to a static record or a variable, the form may show stale data.

### Form fields are empty after switching records in the gallery

If the form's **[Item](controls/control-form-detail.md)** property is correctly set to `Gallery1.Selected` and fields still appear empty, make sure the form is in **Edit** mode, not **New** mode. Calling **[NewForm](functions/function-form.md)** switches the form to **New** mode and clears all fields. Call **[EditForm](functions/function-form.md)** to return the form to **Edit** mode before navigating to the edit screen.

### Column names show _x0020_ in the form

If your SharePoint list or Excel table has column names with spaces, Power Apps encodes those spaces as `_x0020_` in formulas. This is expected. Rename the column in your data source to remove the spaces, or continue using the encoded name in your formulas.

## Related information

- [Display form and Edit form controls reference](controls/control-form-detail.md)
- [SubmitForm, EditForm, NewForm, ResetForm functions](functions/function-form.md)
- [Understand data sources for canvas apps](working-with-data-sources.md)
- [Add a gallery control to a canvas app](add-gallery.md)
- [Add and configure controls in canvas apps](add-configure-controls.md)
- [Understand variables in canvas apps](working-with-variables.md)

---

## Understand data-form layout for canvas apps

Source: [working-with-form-layout.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-form-layout)

*Learn about how to create great-looking form layouts in canvas apps by using rows and columns.*

# Understand data-form layout for canvas apps

Easily create an attractive and efficient form when you build a canvas app in Power Apps. For example, consider this basic form for recording sales orders:

![Sample sales order.](./media/working-with-form-layout/sales-order.png)

In this tutorial, we'll walk through the steps to create this form. We'll also look at some advanced topics, such as dynamic sizing of fields to fill available space.

## Before you start

If you're new to Power Apps (or have only generated apps automatically), you'll want to [build an app from scratch](get-started-create-from-blank.md) before you dive into this article. By building an app from scratch, you'll become familiar with required concepts, such as adding data sources and controls, that are mentioned but not explained in this article.

This article is written as though you have a data source that's named **Sales order** and that contains the fields in the previous graphic. If you have a Power Apps per user, per app, or trial license and system administrator or system customizer permissions, you can [create a table](../data-platform/data-platform-create-entity.md) in Microsoft Dataverse and add similar fields.

## Add a gallery

1. Create a tablet app from scratch, and add your data source.

    Everything discussed in this article also applies to phone layouts, but phone apps often have only one vertical column.
    
2. Add a vertical **Gallery** control, and set its **Items** property to **'Sales order'**.
   
    (optional) To match the examples in this tutorial, change the gallery's **Layout** to show only **Title and subtitle**.
   
    ![Sales order list.](./media/working-with-form-layout/gallery-layout.png)
3. In the gallery, click or tap **SO004**.
   
    ![Sales order list SO004.](./media/working-with-form-layout/sales-order-gallery-screen.png)
   
    This record will appear in the form that you build by following steps later in this article.

## Add a title bar
1. Add a blank screen where you'll put the form.
   
    Outside of this tutorial, you can put the **Gallery** and **[Edit form](controls/control-form-detail.md)** controls on the same screen, but you'll have more room to work with if you put them on separate screens.
2. At the top of the new screen, add a **[Label](controls/control-text-box.md)** control, and set its **Text** property to this expression:
   <br>**"Sales Order " & Gallery1.Selected.SalesOrderId**
   
    The label shows the sales-order number of the record that you selected in the gallery.
3. (optional) Format the label as follows:
   
   1. Set its **Align** property to **Center**.
   
   2. Set its **Size** property to **20**.
   
   3. Set its **Fill** property to **Navy**.
   
   4. Set its **Color** property to **White**.
   
   5. Set its **Width** property to **Parent.Width**.
   
   6. Set its **X** and **Y** properties to **0**.
      
      ![Title bar.](./media/working-with-form-layout/title-bar.png)

## Add a form
1. Add an **Edit form** control, and then move and resize it to fill the screen under the label.
   
    In the next step, you'll connect the form control to the **Sales order** data source by using the right-hand pane, not the formula bar. If you use the formula bar, the form won't show any fields by default. You can always show any fields that you want by selecting one or more check boxes in the right-hand pane.
2. In the right-hand pane, click or tap the down arrow next to **No data source selected**, and then click or tap **Sales order**.
   
    A default set of fields from the **Sales order** data source will appear in a simple, three-column layout. However, many are blank, and they may take a few moments to settle into their final positions.  
3. Set the form's **Item** property to **Gallery1.Selected**.
   
    The form shows the record that you selected in the gallery, but the default set of fields might not match what you want in your final product.
4. In the right-hand pane, hide each of these fields by clearing its checkbox:
   
   * **Sales order ID**
   * **Account**
   * **Sales person**
   * **Account contact**
5. Move the **Order status** field by dragging it to the left and then dropping it on the other side of the **Customer purchase order reference** field.
   
    Your screen should resemble this example:
   
    ![Sales order in a basic, three-column layout.](./media/working-with-form-layout/sales-order-form-screen-3.png)

## Select a data card
Each field displayed has a corresponding data card on the form. This card includes a set of controls for the field title, an input box, a star (which appears if the field is required), and a validation error message.

You can also select cards directly on the form. When a card is selected, a black caption appears above it.

![Data card selection.](./media/working-with-form-layout/sales-order-data-card-selection.png)

> [!NOTE]
> To delete a card (not just hide it), select it, and then press Delete.

## Arrange cards in columns
By default, forms in tablet apps have three columns, and in phone apps have one. You can specify not only how many columns a form has but also whether all cards should fit within column borders.

In this graphic, the number of columns in the form was changed from three to four with the **Snap to columns** check box selected. The cards in the form were arranged automatically to fit the new layout.

![Sales order in a basic four-column layout.](./media/working-with-form-layout/sales-order-form-screen-4.png)

## Resize cards across multiple columns
Depending on the data in each card, you might want some cards to fit in a single column and other cards to span multiple columns. If a card contains more data than you want to show in a single column, you can widen the card by selecting it and then dragging the grab handle on the left or right border of its selection box. As you drag the handle, the card will "snap" to column boundaries.

To make your design more flexible but keep some structure, you can increase the number of columns to 12. With that change, you can easily configure each card to span the entire form, half of the form, one-third, one-quarter, one-sixth, and so forth. Let's see this in action.

1. In the right-hand pane, set the number of columns in the form to **12**.
   
    ![Specify number of columns.](./media/working-with-form-layout/12-columns.png)
   
    The form doesn't visibly change, but you have more snap points as you drag the left or right grab handle.
2. Increase the width of the **Order date** card by dragging the grab handle on the right one snap point to the right.
   
    The card spans four of the form's 12 columns (or 1/3 of the form), instead of only three of the form's 12 columns (or 1/4 of the form). Whenever you increase a card's width by one snap point, the card spans an additional 1/12 of the form.
   
    ![Resize a card with drag and drop.](./media/working-with-form-layout/card-resize-1.png)
3. Repeat the previous step with the **Order status** and **Customer purchase order reference** cards.
   
    ![Three cards in first row.](./media/working-with-form-layout/card-resize-2.png)

4. Resize the **Name** and **Description** cards to take up six columns (or 1/2) of the form.

5. Make the first two lines of the delivery address stretch entirely across the form:

All done. We have our desired form, mixing rows with different numbers of columns:

![Sales order in 12-column layout with resizing.](./media/working-with-form-layout/card-resize-done.png)

## Manipulate controls in a card
The delivery address includes several pieces of information that we want to visually group together for the user. Each field will remain in its own data card, but we can manipulate the controls within the card to make them fit better together.

1. Select the **First line of Delivery address** card, select the label within that card, and then delete the first three words from the text.
   
    ![Sales order delivery address renaming the first line label.](./media/working-with-form-layout/delivery-address-rename.png)
2. Select the **Second line of Delivery address** card, select the label within that card, and then delete all of the text in it.
   
    It may be tempting to remove the label control and, in many cases, that will work fine. But formulas might depend on that control being present. The safer approach is to remove the text or to set the **Visible** property of the control to **false**.
   
    ![Sales order delivery address renaming the second line label.](./media/working-with-form-layout/delivery-address-rename-2.png)
3. In the same card, move the text input box over the label to reduce the space between the first and second lines of the address.
   
    The height of the card shrinks when its contents take up less space.
   
    ![Sales order delivery address renaming the second line label for height.](./media/working-with-form-layout/delivery-address-move-input.png)

Now let's turn our attention to the third line of the address. Similar to what we just did, let's shorten the text of each label for these cards and arrange the Text input box to be to the right of each label. Here are the steps for the **State** card:

| Step | Description | Result |
| --- | --- | --- |
| 1 |Select the **State** card so that grab handles appear around it. |![Select a card.](./media/working-with-form-layout/state-morph-2.png) |
| 2 |Select the label within this card so that grab handles appear around it. |![Select a control within a card.](./media/working-with-form-layout/state-morph-3.png) |
| 3 |Place the cursor to the right of the text, and then delete the portion that we don't need. |![Change the text within a control within a card.](./media/working-with-form-layout/state-morph-3b.png) |
| 4 |Using the grab handles on the sides, size the label control to fit the new text size. |![Resize a control within a card.](./media/working-with-form-layout/state-morph-4b.png) |
| 5 |Select the text input control within this card. |![Select a different control within the card.](./media/working-with-form-layout/state-morph-6.png) |
| 6 |Using the grab handles on the sides, size the text input control to the size that you want. |![Resize a control within card.](./media/working-with-form-layout/state-morph-6b.png) |
| 7 |Drag up the text input box and to the right of the label control, and then drop the text input box. |![Move a control within a card.](./media/working-with-form-layout/state-morph-7b.png) |
| Our modifications to the **State** card are now complete. |![Modifications to the card are complete.](./media/working-with-form-layout/state-morph-8.png) | |

The result for the complete third address line:

![Sales order delivery address with more concise third line.](./media/working-with-form-layout/delivery-address-resize-city-1.png)

Many of the cards start out with dynamic formulas for their properties. For example, the Text input control that we resized and moved above had a **Width** property based on the width of its parent. When you move or resize a control, these dynamic formulas are replaced with static values. If you want, you can restore the dynamic formulas by using the formula bar.

## Turning off Snap to columns
Sometimes you'll want finer control than the standard 12 columns can provide. For these cases, you can turn off **Snap to columns** and then position cards manually. The form will continue snapping to 12 columns, but you can also hold down the Alt or Ctrl+Shift keys after starting a resize or reposition to override the snap points.  For more information, see [alternate behavior keyboard shortcuts](keyboard-shortcuts.md#alternate-behavior). 

In our example, the four components that make up the third line of the address all have exactly the same width. But this may not be the best layout, as city names are longer than state abbreviations, and the Text input box for countries/regions is short because of the length of its label.  To optimize this space, turn off **Snap to columns** in the right-hand pane and then hold down the Alt or Ctrl+Shift keys after starting to size and position these cards.

After careful positioning, the result has appropriate sizes for each field and even spacing horizontally between fields:

![Sales order delivery address third line exactly positioned.](./media/working-with-form-layout/delivery-address-resize-city-2.png)

In summary, what are the differences when **Snap to columns** is on versus off?

| Behavior | Snap to columns On | Snap to columns Off |
| --- | --- | --- |
| Resize snaps to |Number of columns you select:<br>1, 2, 3, 4, 6, or 12 |12 columns |
| Resize snap can be overridden |No |Yes, with Alt or Ctrl+Shift keys after starting the resize |
| Cards automatically relayout between rows (more on this later) |Yes |No |

## Set width and height
As with everything in Power Apps, the form's layout is governed by properties on the card controls. As already described, you can change the values of these properties by dragging controls to different locations or dragging grab handles to resize controls. But you'll discover situations in which you'll want to understand and manipulate these properties more precisely, especially when making your forms dynamic with formulas.

### Basic Layout: X, Y, and Width
The **X** and **Y** properties control the position of cards. When we work with controls on the raw canvas, these properties provide an absolute position. In a form, these properties have a different meaning:

* **X**: Order within a row.
* **Y**: Row number.

Similar to controls on the canvas, the **Width** property specifies the minimum width of the card (more on the minimum aspect in a moment).

Let's take a look at the **X**, **Y**, and **Width** properties of the cards in our form:

![Sales order form X and Y coordinates.](./media/working-with-form-layout/sales-order-xy.png)

### Overflowing rows
What happens if the cards on a row are too wide to fit on that row? Normally you don't need to worry about this possibility. With **Snap to columns** on, these three properties will automatically be adjusted so that everything fits nicely within rows without overflowing.

But with **Snap to columns** turned off or a formula-based **Width** on one or more of your cards, overflowing a row can happen. In this case, the cards will automatically wrap so that, effectively, another row is created. For example, let's manually change the **Width** property of our **Customer purchase order reference** card (first row, third item) to **500**:

![Manual resize of card, reflow to a new row.](./media/working-with-form-layout/manual-size-500.png)

The three cards on the top row no longer fit horizontally, and another row has been created to wrap the overflow. The **Y** coordinate for all these cards is still the same at 0, and the **Name** and **Description** cards still have a **Y** of 1. Cards that have different **Y** values aren't merged across rows.

You can use this behavior to create a fully dynamic layout, where cards are placed based on a Z-order, filling across as much as possible before moving to the next row. To achieve this effect, give all the cards the same **Y** value, and use **X** for the order of the cards.

### Filling spaces: WidthFit
The overflow in the last example created a space after the **Order status** card, which was the second card in the first row. We could manually adjust the **Width** properties of the two remaining cards to fill this space, but this approach is tedious.

As an alternative, use the **WidthFit** property. If this property is set to **true** for one or more cards in a row, any remaining space on the row will be evenly divided between them. This behavior is why we said earlier that the **Width** property of a card is a *minimum*, and what is seen can be wider. This property will never cause a card to shrink, only expand.

If we set **WidthFit** to **true** on the **Order status** card, it fills the available space, while the first card remains unchanged:

![WidthFit set to true on second card.](./media/working-with-form-layout/manual-widthfit-1.png)

If we also set **WidthFit** to **true** on the **Order date** card, both cards will evenly split the available space:

![WidthFit set to true on first and second cards.](./media/working-with-form-layout/manual-widthfit-2.png)

Grab handles on these cards take into account the extra width provided by **WidthFit**, not the minimum width provided by the **Width** property. It can be confusing to manipulate the **Width** property while **WidthFit** is turned on;     you may want to turn it off, make changes to **Width**, and then turn it back on.

When might **WidthFit** be useful? If you have a field that is used  only in certain situations, you can set its **Visible** property to **false**, and the other cards on the row will automatically fill the space around it. You might want to use a formula that shows a field only when another field has a particular value.

Here, we'll set the **Visible** property of the **Order status** field to a static **false**:

![WidthFit set to true on first card with status order invisible.](./media/working-with-form-layout/manual-widthfit-3.png)

With the second card effectively removed, the third card can now return to the same row as the first card. The first card still has **WidthFit** set to **true**, so it alone expands to fill the available space.

Because **Order status** is invisible, you can't select it as easily on the canvas. However, you can select any control, visible or not, in the hierarchical list of controls on the left side of the screen.

### Height
The **Height** property governs the height of each card. Cards have the equivalent of **WidthFit** for **Height**, and it's always set to **true**. Imagine that a **HeightFit** property exists, but don't look for it in the product because such a property isn't yet exposed.

You can't turn off this behavior, so changing the heights of cards can be challenging. All cards within a row appear to be the same height as the tallest card. You might look at a row like this:

![WidthFit set to true on the first card with status order invisible.](./media/working-with-form-layout/height-3.png)

Which card is making the row tall? In the previous graphic, the **Total amount** card is selected and appears tall, but its **Height** property is set to **80** (same as the height of the first row). To reduce the height of a row, you must reduce the **Height** of the tallest card in that row, and you can't identify the tallest card without reviewing the **Height** property of each card.

### AutoHeight
A card might also be taller than you expect if it contains a control for which the **AutoHeight** property is set to **true**. For example, many cards contain a label that displays an error message if the field's value causes a validation problem.

Without any text to display (no error), the label collapses to zero height. If you didn't know any better, you wouldn't know it was there, and that's as it should be:

![Cards that contain controls with AutoHeight set to true showing no height.](./media/working-with-form-layout/autoheight-0.png)

On the left side of the screen, the list of controls shows **ErrorMessage1**, which is our label control. As you update an app, you can select this control to give it some height and show grab handles with which you can position and size the control. The "A" in a blue box indicates that the control has **AutoHeight** set to **true**:

![At authoring time, AutoHeight controls show some height making it easier to drag and drop.](./media/working-with-form-layout/autoheight-1.png)

The **Text** property of this control is set to **Parent.Error**, which is used to obtain dynamic error information based on validation rules. For illustration purposes, let's statically set the **Text** property of this control, which will increase its height (and, by extension, the height of the card) to accommodate the length of the text:

![With an error message, the control and card automatically grow.](./media/working-with-form-layout/autoheight-2.png)

Let's make the error message a little longer, and again the control and the card grow to accommodate. The row overall grows in height, keeping vertical alignment between the cards:

![With a longer error message, the control and card grow even more, and note that the cards on the same row all grow together.](./media/working-with-form-layout/autoheight-3.png)

---

## Understand data cards in Power Apps canvas apps

Source: [working-with-cards.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-cards)

*Learn how to use data cards in Power Apps canvas app forms to collect and display information. Customize card types, unlock cards for advanced layouts, and understand data flow between forms and data sources.*

# Understand data cards in canvas apps

This article explains what a data card is, how to change the control users enter data into, when to unlock a card, and how the form saves changes back to Dataverse.

Data cards are the building blocks of Power Apps forms. Each data card displays and collects a value for a single field such as Name, Job Title, or Phone Number. 

The following screenshot shows a form with a data card  for **Account name** selected.

:::image type="content" source="media/working-with-cards/form-with-data-card-selected.png" alt-text="Screenshot show a form with the data card selected":::

 A **Display form** shows one record. **Edit forms** let users update an existing record or create a new one. In either type of form, each data card is connected to exactly one field (one column) in your data source—often a Dataverse table.

A data card is a container that includes the field label, required validation behavior, and the control that users interact with. A data card contains the following:

- **Required indicator (asterisk or star)**: Shows that the field must have a value.
- **Title**: The label shown to users for the field.
- **Data card value**: The input control (for example, a text box or dropdown) where users enter or edit the value
- **Error message**: Displays validation errors, usually after the form is submitted.

## Prerequisites

If you're new to forms, start by reading [add-form.md](add-form.md) and [working-with-forms.md](working-with-forms.md).

## Customize a card

A data card contains the controls that users see - usually a label such as the title, an input control like text input or dropdown, and an error message label. To customize how a field looks, select the control *inside* the card for example, the text input and adjust its size, position, or properties.

### Reorder fields on a form

Power Apps offers predefined cards for strings, numbers, and other data types. You edit the form and rearrange fields letting you change the layout without unlocking any cards.

1. Open your app for editing in [Power Apps Studio](power-apps-studio.md).
1. Select the form then select **Fields**.
1. Select **More actions** and then selet **Move up** or **Move down**. You can also select and then drag fields into the order you want. 

    :::image type="content" source="media/working-with-cards/reorder-fields-on-form.png" alt-text="Screenshot of how to reoder fields on a form ":::

### Change a card’s control type

You can easly change a card's control type. For exmaple you might want to change a single-line text card  to a multiline text card so users have more space to enter information.

1. Open your app for editing in [Power Apps Studio](power-apps-studio.md).
1. Select the form then select **Fields**.
1. Select **Expand field details** which is the down arrow next to the field that you want to edit.
1. Select the dropdown for **Control type** and then select a different control type. For example, switch from **Edit text** to **Edit multi-line text**.

    :::image type="content" source="media/working-with-cards/edit-control-type.png" alt-text="Screenshot show how to edit a cards's control type":::


### Resize a card

You can move and resize controls in a locked card.

You editing the controls inside a card without changing what field the card connects to.

1. In the form, select the data card that you want to resize such as **Account Name**.
1. Drag to move the text input within the card, and use the handles to resize it. This improves spacing and readability without unlocking the card.

    :::image type="content" source="media/working-with-cards/resize-field.png" alt-text="Screenshot of how to select a card and resize a field in the card":::


## Unlock a card

To make changes like deleting a control or adding a new control requires unlocking the card.

When you add a field to a form, Power Apps creates a data card for you and sets up the basic formulas that connect the card to the data source. By default, Power Apps locks these cards so you don't accidentally break that connection. If you need more control, such as a custom layout, extra controls, or different formulas, you can unlock the card.

The following screenshot shows a form with a data card that is locked.

:::image type="content" source="./media/working-with-cards/advanced-locked.png" alt-text="Screenshot of the Advanced tab showing a locked data card in Power Apps.":::

The key setting is [DataField](controls/control-card.md). It tells Power Apps which field (column) this card is responsible for. When the form submits, Power Apps uses the card's **DataField** value to know what field to update.

1. To unlock a card, select the card
1. In the **Properties** pane, select the **Advanced**.
1. Select lock icon or select **Unlock to change properties** to unlock properties such as  **DataField**, **DisplayName**, or **Required**. 
1. After you unlock the card, edit the generated formulas and add or remove controls inside the card.


    |Locked properties  |Unlocked properties  |
    |-------------------|---------------------|
    |:::image type="content" source="media/working-with-cards/locked-properties.png" alt-text="Screenshot of locked properties on a data card":::               |  :::image type="content" source="media/working-with-cards/unlocked-properties.png" alt-text="Screenshot of unlocked properties on a data card":::                   |


You now take control over this card and can modify it further to fit your needs. But you lose the ability to change the card from one representation to another (for example, single-line text to multi-line text) as you did before. You transformed the predefined card into a "custom card" that you now control.

> [!IMPORTANT]
> You can't relock a card after you unlock it. To get a card back to a locked state, remove it, and reinsert it in the right-hand pane.


## Interact with a form

After you unlock a card, you can control how values move between the form and the controls inside the card.

A helpful way to think about an Edit form is: **data flows in** to show the current record (defaults), and **data flows out** when you submit the form updates. The card sits in the middle - its properties tell the form which field it represents and what value should be saved.

### DataField property

The card's **DataField** property is the "this card edits this field" setting. It helps Power Apps decide what to validate, what value is required, and what field should be updated when you submit the form.

### Information flowing in

When a form shows a record, it exposes that record as **ThisItem**. Think of **ThisItem** as the current row you're editing. It contains every field for that record.

In Dataverse-backed forms, the card's **DataField** typically matches the field's logical name. The card's **Default** formula commonly references the current record, for example, **ThisItem.FieldName**, and the input control inside the card usually reads that value through **Parent.Default**. This pattern keeps the input control independent of the data source and lets the card encapsulate how the field value flows in.

Most cards set their **Default** property to the current record's value, like **ThisItem.FieldName**. You can optionally transform that value, for example, format text before it shows in the input.

Inside the card, the input control usually uses **Parent.Default** so it always shows whatever value the card provides. This approach keeps the card "self-contained". If you later change the card's default formula, you don't have to rewrite formulas inside the card.

By default, the data source's metadata sets the **DefaultValue** and **controls/control-card.md** properties based on the **controls/control-card.md** property. You can override these formulas with your own logic by using the **functions/function-datasourceinfo.md** function to integrate the data source's metadata.

### Information flowing out

When the user selects **Save**, this typically call **SubmitForm**. The form gathers values from each data card and writes them back to the data source. It uses each card’s **DataField** to know *which* field to update.

To save changes from an **Edit form**, trigger **SubmitForm(FormName)** (for example, from a **Save** button). If you want to clear the inputs after a successful submit, follow with **ResetForm(FormName)**. To create a new record instead of editing an existing one, set the form’s **DefaultMode** property to **FormMode.New** before the user starts entering data.

The form also reads each card’s **Update** property - this is the value that gets saved for that field. If you need to clean up a value before saving, such as removing extra spaces, converting text to a number, or reversing a formatting change you made in **Default**, **Update** is usually the right place to do it.

**Valid** is basically "is this field okay to submit?" Power Apps uses the data source rules and the card’s **Required** setting to decide this. If the value isn't valid, the card's **Error** property contains a message that you can show to the user, often through the **Error Message** label in the card.

If a card’s **DataField** is blank, the card isn't tied to any field - it's just a container you can use for layout. In that case, its **Update** and **Valid** values don't affect what gets saved when you submit the form.

## Dissecting an example

Take a closer look at what's inside a typical data-entry card. The following screenshots spread the controls out so you can see each piece clearly.

:::image type="content" source="./media/working-with-cards/dissect-card1.png" alt-text="Screenshot of a data-entry card in Power Apps with controls spread out for clarity.":::

In the next image, the controls inside the card are labeled so you can match what you see on the canvas to what’s in the tree view.

:::image type="content" source="./media/working-with-cards/dissect-card2.png" alt-text="Screenshot of labeled controls inside a data card in Power Apps.":::

Here are the main controls you usually see inside a card:

| Name | Type | What it does |
|---|---|---|
| **TextRequiredStar** | **Label** control | Shows a star or asterisk when the field is required. |
| **TextFieldDisplayName** | **Label** control | Shows the friendly field name the user sees. This name often differs from the internal schema name. |
| **InputText** | Text input control | Shows the current value and lets the user type a new one. |
| **TextErrorMessage** | **Label** control | Shows a message if the value can't be submitted, such as missing required data. |

These controls usually don't connect to Dataverse directly. Instead, they read simple values from the **parent card** by using **Parent**, and the card handles the connection to the data source. The following formulas are common examples.

| Control property | Formula | Beginner explanation |
|---|---|---|
| **TextRequiredStar.Visible** | **Parent.Required** | Only show the star when the field is required. |

---

## Display a full-sized image on a canvas app form

Source: [display-full-image-on-form.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/display-full-image-on-form)

*Learn about how to display a full-sized image on a canvas app form.*

# Display a full-sized image on a canvas app form
By default,	when an app user adds an image to display to a form in a canvas app, the image displayed is the thumbnail image. To display a full image for a canvas app, follow these steps: 
1. Open the canvas app in PowerApps Studio. 
2. Select **Insert**, and then select **Image**.
3. Select the image data card. 

    > [!div class="mx-imgBorder"] 
    > ![Image data card.](../canvas-apps/media/display-full-sized-image/image-data-card.png)

4. Under the **Advanced** tab set the **Data** field to the table that contains the image you want to display.
5.	Add **.Full** after the value for the image **Default** setting. 

    > [!div class="mx-imgBorder"] 
    > ![Image full size setting.](../canvas-apps/media/display-full-sized-image/image-full-setting.png)

6.	Select **Save**. 

### See also
[Show, edit, or add a record in a canvas app](add-form.md) <br />
[Image fields](../data-platform/types-of-fields.md#image-columns)

---

## Add a list box, a drop-down list, or radio buttons to a canvas app | Microsoft Docs

Source: [add-list-box-drop-down-list-radio-button.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-list-box-drop-down-list-radio-button)

*In Power Apps, create or configure multi-select options in a canvas app*

# Add a list box, a drop-down list, a combo box, or radio buttons to a canvas app

Show a single column of data (for example, from a multi-column table) in a canvas app so that users can select one or more items in a list.

- Add a list box to allow users to select more than one option.
- Add a drop-down list or combo box to take up less space on a screen.
- Add a set of radio buttons for a particular design effect.

This topic focuses on lists boxes and radio buttons, but the same principles apply to drop-down lists.

## Prerequisites

1. Create a [blank canvas app](../maker/canvas-apps/create-blank-app.md).
1. Learn how to [add and configure controls](../maker/canvas-apps/add-configure-controls.md).

## Create a simple list

1. Add a **List box** control named **MyListBox**, and set its **Items** property to this expression:

    ```["circle","triangle","rectangle"]```  <br/>

    Your designer looks similar to the following:

    ![Screen with list box control][4]

4. On the **Insert** tab, select **Icons**, select the circle, and move it under **MyListBox**:

    ![Add icon][5]  

5. Add a triangle and a rectangle, and then arrange the shapes in a row under **MyListBox**:

    ![Add shapes][6]  

6. Set the **[Visible](controls/properties-core.md)** property of the following shapes to the following functions:  

   | Shape | Set Visible function to |
   | --- | --- |
   | circle |```If("circle" in MyListBox.SelectedItems.Value, true)``` |
   | triangle |```If("triangle" in MyListBox.SelectedItems.Value, true)``` |
   | rectangle |```If("rectangle" in MyListBox.SelectedItems.Value, true)``` |

7. While holding down the Alt key, select one or more shapes in **MyListBox**.

    Only the shape or shapes that you select appear.

In these steps, you used an expression to create a list of items. You can apply this to other elements within your business. For example, you can use a **Drop down** control to display product images, product descriptions, and so on.

## Add radio buttons
1. On the **Home** tab, select **New Screen**, and then select **Blank**.

2. On the **Insert** tab, select **Controls**, and then select **Radio**.

    ![Add Radio button][10]  

3. Rename the **Radio** control to **Choices**, and set its **[Items](controls/properties-core.md)** property to this formula:  
   ```["red","green","blue"]```  <br/>

    ![Rename control][12]  

    If needed, resize the control to show all the options.

4. On the **Insert** tab, select **Icons**, and then select the circle.

5. Set the **[Fill](controls/properties-color-border.md)** property of the circle to the following function:  
   ```If(Choices.Selected.Value = "red", Red, Choices.Selected.Value = "green", Green, Choices.Selected.Value = "blue", Blue)```  

    In this formula, the circle changes its color depending on which radio button you choose.

6. Move the circle under the **Radio** control, as in this example:

    ![Move circle under the Radio control][14]  

7. While holding down the Alt key, select a different radio button to change the color of the circle.

[1]: ./media/add-list-box-drop-down-list-radio-button/preview.png
[2]: ./media/add-list-box-drop-down-list-radio-button/listbox.png
[3]: ./media/add-list-box-drop-down-list-radio-button/renamelistbox.png
[4]: ./media/add-list-box-drop-down-list-radio-button/itemslistbox.png
[5]: ./media/add-list-box-drop-down-list-radio-button/circle.png
[6]: ./media/add-list-box-drop-down-list-radio-button/allshapes.png
[10]: ./media/add-list-box-drop-down-list-radio-button/radiobutton.png
[12]: ./media/add-list-box-drop-down-list-radio-button/itemsradio.png
[14]: ./media/add-list-box-drop-down-list-radio-button/radiocircle.png
[15]: ./media/add-list-box-drop-down-list-radio-button/dropdown.png

## Add an item to an existing list

1. Add a **[Button](controls/control-button.md)** control and name it "btnReset".

   Don't know how to [add, name, and configure a control](add-configure-controls.md)?
   
2. Set **[OnSelect](controls/properties-core.md)** property on **btnReset** to this formula:
   
    ```power-fx
    ClearCollect(MyItems, {value: "circle"},{value: "triangle"},{value: "rectangle"})
    ```
   
3. Set the **[Text](controls/properties-core.md)** property on **btnReset** to `"Reset"`.

4. Add a **List box** control named **lbItems**, and set its **Items** property to `MyItems`.

5. While holding down the **Alt** key, press the **Reset** button.

    > [!NOTE]
    > The list box should populate with the items from the "MyItems" collection.

6. Arrange the list box and button so they're lined up vertically.

    ![List box button.](media\add-list-box-drop-down-list-radio-button\listboxbutton.png "List box button")

7. Add a **[Text Input](controls/control-text-input.md)** control, and name it "txtAdd".

8. Set **[Text](controls/properties-core.md)** property of **txtAdd** to `""`.

9. Add a **[Button](controls/control-button.md)** control, and name it "btnAdd".

10. Set the **[Text](controls/properties-core.md)** property of **btnAdd** to `"Add"`.

11. Set **[OnSelect](controls/properties-core.md)** property of **btnAdd** to the following formula:

    ```power-fx
    Collect(MyItems,{value: txtAdd.Text}); Reset(txtAdd)
    ```

    > [!NOTE]
    > - The collect function will add the text from the text input as an item in the collection.
    > - The reset function will reset the text input back to it's default state.

12. Arrange **txtAdd** and **btnAdd** so they're lined up vertically underneath **lbItems** and **btnReset**.

    ![All controls - before adding.](media\add-list-box-drop-down-list-radio-button\allcontrolsbeforeadd.png "All controls - before adding")

13. Preview the app by pressing **F5**.

14. Add a text value to **txtAdd** text input control.

[1]: ./media/add-list-box-drop-down-list-radio-button/allcontrolstextentered.png

15. Press the Add button.

    > [!NOTE]
    > The list box should populate with the items from the MyItems collection.

### (Optional) Remove an item from an existing list

1. Add a **[Button](controls/control-button.md)** control, and name it "btnDelete".

2. Set the **[Text](controls/properties-core.md)** property of **btnDelete** to`"Delete"`.

3. Set **[OnSelect](controls/properties-core.md)** property of **btnDelete** to the following formula:

    ```power-fx
    Remove(MyItems, lbItems.Selected)
    ```

4. Arrange **btnDelete** so it's lined up vertically underneath **btnReset**

    ![All controls with delete button.](media/add-list-box-drop-down-list-radio-button/allcontrolsdeletebutton.png "All controls with delete button")

5. Preview the app by pressing **F5**.

6. Press the Reset button to reset the list box.

7. Press an item in the list box to select it.

[1]: ./media/add-list-box-drop-down-list-radio-button/allcontrolsdeleteselected.png

8. Press the Delete button to delete item.

[1]: ./media/add-list-box-drop-down-list-radio-button/allcontrolsafterdelete.png

---

## Create a dependent drop-down list in a canvas app

Source: [dependent-drop-down-lists.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/dependent-drop-down-lists)

*Learn about how to create a drop-down list that filters another drop-down list in a canvas app.*

# Create dependent drop-down lists in a canvas app

When you create dependent (or cascading) drop-down lists, users select an option in a list to filter options in another list. Many organizations create dependent lists to help users fill out forms more efficiently. For example, users might select a country or region to filter a list of cities, or users might select a category to show only the codes in that category.

As a best practice, create a data source for the values in the "parent" and "child" lists (for example, countries/regions and cities) that's separate from the data source that users update by using the app. If you take this approach, you can use the same parent and child data in more than one app, and you can update that data without republishing the app or apps that use them. You can accomplish the same outcome by using a collection or static data, but it isn't recommended for enterprise scenarios.

For the scenario in this topic, store employees submit issues to an **Incidents** list through a form. Employees specify not only the location of the store at which the incident occurred but also the department within that location. Not all locations have the same departments, so a **Locations** list ensures that employees can't specify a department for a location that doesn't have that department.

> [!NOTE]
> This article uses a list created using Microsoft Lists as the data source. However, all tabular data sources work the same way. Within [Dataverse for Teams](../../teams/create-apps-overview.md), you'll need to enable [classic controls](../../teams/understand-power-apps-studio.md#classic-controls) to get the classic drop-down to work for this scenario.

## Create data sources

A **Locations** list shows the departments at each location.

| Location | Department |
|----------------|------------------|
| Eganville      | Bakery           |
| Eganville      | Deli             |
| Eganville      | Produce          |
| Renfrew        | Bakery           |
| Renfrew        | Deli             |
| Renfrew        | Produce          |
| Renfrew        | Pharmacy         |
| Renfrew        | Floral           |
| Pembroke       | Bakery           |
| Pembroke       | Deli             |
| Pembroke       | Produce          |
| Pembroke       | Floral           |

An **Incidents** list shows contact information and information about each incident. Create the Date column as a **Date** column, but create the other columns as **Single line of text** columns to simplify configuration and avoid [delegation](./delegation-overview.md) warnings in Microsoft Power Apps.

| First Name | Last Name | Phone Number     | Location | Department | Description       | Date      |
|------------|-----------|------------------|----------------|------------|-------------------------|-----------|
| Tonya       | Cortez   | (206) 555 - 1022 | Eganville      | Produce    | I had a problem with…   | 2/12/2019 |
| Moses     | Laflamme     | (425) 555 - 1044 | Renfrew        | Floral     | I experienced an issue… | 2/13/2019 |

By default, lists include a **Title** column that you can't rename or remove, and it must contain data before you can save an item in the list. To configure the column so that it doesn't require data:

1. Near the upper-right corner, select the gear icon, and then select **List settings**.
1. On the **Settings** page, select **Title** in the list of columns.
1. Under **Require that this column contains information**, select **No**.

After that change, you can ignore the **Title** column, or you can [remove it](https://support.office.com/article/edit-a-list-column-in-sharepoint-online-77130c2e-76d1-4f80-af8b-4c6f47b264b8) from the default view if at least one other column appears.

## Open the form

1. Open the **Incidents** list, and then select **Integrate** -> **Power Apps** -> **Customize forms**.

    ![Open the Incidents list, and then select Power Apps > Customize forms.](./media/dependent-drop-down-lists/open-form.png "Open the Incidents list, and then select Power Apps > Customize forms.")

    A browser tab opens with the default form in Power Apps Studio.

1. (optional) In the **Fields** pane, hover over the **Title** field, select the ellipsis (...) that appears, and then select **Remove**.

    If you've closed the **Fields** pane, you can open it again by selecting **SharePointForm1** in the left navigation bar and then selecting **Edit fields** on the **Properties** tab of the right-hand pane.

1. (optional) Repeat the previous step to remove the **Attachments** field from the form.

    The form appears with just the fields that you added.

    > [!div class="mx-imgBorder"]
    > ![Form without Title and Attachments fields.](./media/dependent-drop-down-lists/default-form.png)

## Replace the controls

1. In the **Fields** pane, select the arrow next to **Location**.

    If you've closed the **Fields** pane, you can open it again by selecting **SharePointForm1** in the left navigation bar and then selecting **Edit fields** on the **Properties** tab of the right-hand pane.

1. Open the **Control type** list, and then select **Allowed Values**.

    > [!div class="mx-imgBorder"]
    > ![Allowed values.](./media/dependent-drop-down-lists/change-control.png)

    The input mechanism changes to a **Drop down** control.

1. Repeat these steps for the **Department** card.

## Add the Locations list

1. Select **View** > **Data Sources** > **Add data source**.

1. Select or create a SharePoint connection, and then specify the site that contains the **Locations** list.

1. Select the check box for that list, and then select **Connect**.

    > [!div class="mx-imgBorder"]
    > ![Data pane.](./media/dependent-drop-down-lists/select-list.png)

    The list of connections shows the **Incidents** list, on which the form is based, and the **Locations** list, which will identify locations and departments in the form.

    > [!div class="mx-imgBorder"]
    > ![SharePoint data sources.](./media/dependent-drop-down-lists/data-sources.png)

## Unlock the cards

1. Select the **Location** card, select the **Advanced** tab in the right-hand pane, and then select **Unlock to change properties**.

1. Repeat the previous step for the **Department** card.

## Rename the controls

If you rename your controls, you can identify them more easily, and the examples are easier to follow. To discover other best practices, review the [Coding Standards and Guidelines whitepaper](https://aka.ms/powerappscanvasguidelines).

1. In the **Location** card, select the **Drop down** control.

1. Near the top of the right-hand pane, rename the selected control by typing or pasting **ddLocation**.

    > [!div class="mx-imgBorder"]
    > ![Rename a control.](./media/dependent-drop-down-lists/rename-control.png)

1. Repeat the previous two steps in the **Department** card to rename the **Drop down** control to **ddDepartment**.

## Configure the locations

1. Set the **Items** property of **ddlocation** to this formula:

    `Distinct(Locations, Location)`

1. (optional) While holding down the Alt key, open **ddLocation**, and confirm that the list shows the three locations.

## Configure the departments

1. Select **ddDepartment**, and then, on the **Properties** tab of the right-hand pane, select **Depends on.**

1. Under **Parent control**, ensure that **ddLocation** appears in the upper list and **Result** appears in the lower list.

    > [!NOTE]
    > If you don’t want to match on a string but on the actual ID of the row of data, select **ID** Instead of **Result**.

1. Under **Matching field**, select **Locations** in the upper list, select **Location** in the lower list, and then select **Apply**.

    > [!div class="mx-imgBorder"]
    > ![Depends on link.](./media/dependent-drop-down-lists/depends-on.png)

    The **Items** property of **ddDepartment** is set to this formula:

    `Filter(Locations, Location = ddLocation.Selected.Result)`

    This formula filters the items in **ddDepartment** based on what the user selects in **ddLocation**. Such a configuration ensures that the "child" list of departments reflects the data for its "parent" location, as the **Locations** list in SharePoint specifies.

1. On the **Properties** tab of the right-hand pane, open the list next to **Value**, and then select **Department**.

    This step sets the display text to the options from the **Department** column of the **Locations** list in SharePoint.

    > [!div class="mx-imgBorder"]
    > ![Department value.](./media/dependent-drop-down-lists/dept-value.png)

## Test the form

While holding down the Alt key, open the list of locations, select one, open the list of departments, and then select one.

The lists of locations and departments reflects the information in the **Locations** list in SharePoint.

> [!div class="mx-imgBorder"]
> ![Open the list of locations, change the selection from Renfrew to Pembroke, and then open the list of departments.](./media/dependent-drop-down-lists/dropdowns.gif)

## Save and open the form (optional)

1. Open the **File** menu, and then select **Save** > **Publish to SharePoint** > **Publish to SharePoint**.

1. In the upper-left corner, select the back arrow, and then select **Back to SharePoint**.

1. In the command bar, select **New** to open your customized form.

## FAQ

**I can’t see any data: the sources are all blank or have the wrong data.**
Confirm whether you're displaying the correct field for your control in either of these ways:

- Select a drop-down list, and then select the **Value** property in the **Properties** tab of the right-hand pane.

    > [!div class="mx-imgBorder"]
    > ![Change drop down.](./media/dependent-drop-down-lists/drop-down-display-field.png)

- Select a combo box, and then ensure that the primary text is the field that you want to display.

    > [!div class="mx-imgBorder"]
    > ![Change combo box.](./media/dependent-drop-down-lists/combo-box-display-field.png)

**My child drop-down list contains duplicate items.**
This symptom is likely due to using a **LookUp** column in SharePoint or a **Choices** function in Power Apps. To remove the duplication, wrap a **Distinct** function around the properly returning data. More information: [Distinct function](functions/function-distinct.md).

## Known limitations

This configuration is available on **Drop down** controls, as well as **Combo box** and **List box** controls that allow one selection at a time. You can't use the **Depends On** configuration for any of those controls if they allow multiple selections. This approach isn't recommended for working with choices in Microsoft Dataverse.

The **Depends On** configuration doesn't support static data or collections. To configure dependent drop-down lists with these sources, edit the expression directly in the formula bar. In addition, Power Apps doesn't support using two choice fields in SharePoint without any matching table of data, and you can't define **Matching field** within this UI.

---

## Show data in a line, pie, or bar chart in canvas apps

Source: [use-line-pie-bar-chart.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/use-line-pie-bar-chart)

*Learn about how to show categories of data as line charts, pie charts, or bar charts in a canvas app.*

# Show data in a line, pie, or bar chart in canvas apps

Use line charts, pie charts, and bar charts to display your data in a canvas app. When you work with charts, the data that you import should be structured based on these criteria:

* Each series should be in the first row.
* Labels should be in the leftmost column.

For example, your data should look similar to the following:


|Product  |Revenue2012  |Revenue2013 | Revenue2014|
|----------|-----------|------------|------------|
|Europa    |21000      |26000      | 28000       |
|Ganymede    |15000      |17000      | 21000       |
|Callisto    |14000      |19000      | 23000       |

You can create and use these charts within Power Apps. Let's get started.

## Prerequisites

* [Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) using the same credentials that you used to sign up.
* Create an app from a [template](get-started-test-drive.md), from [data](get-started-create-from-data.md), or from [scratch](get-started-create-from-blank.md).
* Learn how to [configure a control](add-configure-controls.md) in Power Apps.
* Create your own [sample data](/power-platform/admin/add-remove-sample-data) using the example above and save it in Excel. Follow the steps in this topic to import it directly into your app.

## Import the sample data
In these steps, we import the sample data into a collection, named **ProductRevenue**.

1. On the command bar select, **Insert** > **Media** > **Import**.

2. Set the control's **[OnSelect](controls/properties-core.md)** property to the following function:  

   ```Collect(ProductRevenue, Import1.Data)```

3. On the [app actions menu](power-apps-studio.md#2--app-actions), select **Preview the app** and then select the **Import Data** button.

4. In the **Open** dialog box, select your Excel file, select **Open**, and then press Esc.

5. On the [app authoring menu](power-apps-studio.md#5--app-authoring-menu) select, **Variables** > **Collections**.

    The ProductRevenue collection should be listed with the chart data you imported.

   > [!NOTE]
   > The import control is used to import Excel-like data and create the collection. The import control imports data when you are creating your app, and previewing your app. Currently, the import control does not import data when you publish your app.
   

6. Press Esc to return to the default workspace.

## Add a pie chart
1. On the command bar selelct, **Insert** > **Charts** > **Pie Chart**.

2. Move the pie chart under the **Import data** button.

3. In the pie-chart control, select the middle of the pie chart:   

    ![Pie chart control][10]

4. Set the **[Items](controls/properties-core.md)** property of the pie chart to this expression: `ProductRevenue.Revenue2014`

    ![Items property][2]  

    The pie chart shows the revenue data from 2014.

    ![Pie chart updated][3]  

## Add a bar chart to display your data
Now, let's use this ProductRevenue collection in a bar chart:

1. On the command bar, select **New screen** > **Blank**. 

2.  On the command bar, select **Insert** > **Tree view** > **Column Chart**.

3. Select the middle of the column chart. Set the **[Items](controls/properties-core.md)** property of the column chart to ```ProductRevenue```:

    ![Items property to ProductRevenue][12]  

    The column chart shows the revenue data from 2012:

    ![Column updated][4]  

4. In the column chart, select the center square:

    ![Select center square][5]

5. On the **Chart** tab, select **Number of Series**, and then enter **3** in the formula bar:

    The column chart shows revenue data for each product over three years:

    ![Updated chart][7]  

[1]: ./media/use-line-pie-bar-chart/productrevenuecollection.png
[2]: ./media/use-line-pie-bar-chart/itemsexpression.png
[3]: ./media/use-line-pie-bar-chart/piechart.png
[4]: ./media/use-line-pie-bar-chart/columnchart.png
[5]: ./media/use-line-pie-bar-chart/columnchartseries.png
[6]: ./media/use-line-pie-bar-chart/columnchartseriesfunction.png
[7]: ./media/use-line-pie-bar-chart/columnchartthreeyears.png
[8]: ./media/use-line-pie-bar-chart/preview.png
[9]: ./media/use-line-pie-bar-chart/tableformat.png
[10]: ./media/use-line-pie-bar-chart/middlepiechart.png
[11]: ./media/use-line-pie-bar-chart/import.png
[12]: ./media/use-line-pie-bar-chart/itemscolumnchart.png

---

## Using multimedia files in canvas apps

Source: [add-images-pictures-audio-video.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-images-pictures-audio-video)

*Show multimedia files in a canvas app, and upload them to a data source.*

# Using multimedia files in canvas apps

You can add images, audio, and video files to a canvas app. Add video from streaming services such as [Microsoft Clipchamp](/clipchamp/), [Azure Media Services](/azure/media-services/), or third-party streaming services, such as YouTube. Or use input controls such as **Pen Input** to collect signatures.

This article walks you through working with multimedia, streaming, and input control scenarios. The data source used in this article is an Excel file in OneDrive for Business.

## Prerequisites

[Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) by using the same credentials that you used to sign up.

Watch this video to learn how to use multimedia files in canvas apps:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=d8fdba22-a9cf-4ce4-a77d-7c7be89666bc]

## Add media from a file or the cloud

You can choose the kind of media file to add (for example, images, video, or audio). You can add images by using the media pane or by using the images control.

![Media pane.](./media/add-images-pictures-audio-video/media-pane.gif "Media pane")

> [!NOTE]
> When adding media files by URL,
> - Use HTTPS to ensure compatibility with modern browsers.
> - Ensure the URL is accessible anonymously without any authentication. Try to enter the URL in private browsing mode to verify that it's accessible without signing in.

### Add images, audio, or video by using the media pane

To add or remove media files in your app by using the **Media** pane:

1. Select **Media** from the left pane.

    ![Media.](./media/add-images-pictures-audio-video/media-panel.png "Media")

1. Select **Upload** from the media panel.

    ![Upload media.](./media/add-images-pictures-audio-video/upload-media.png "Upload media")

1. Select the files that you want to add, and then select **Open**.

1. Select the file from the media pane to insert into the screen.

    ![Add media.](./media/add-images-pictures-audio-video/add-media.png "Add media")

1. [Save and publish](save-publish-app.md) your app.

1. [Share app](share-app.md) with others.

### Add images, audio, or video by using the controls

To add images, audio, or video by using the [Image](./controls/control-image.md), [Audio or Video](./controls/control-audio-video.md) controls:

1. Select **Insert** from the top menu.

1. Select the **Media** drop-down.

1. Choose from **Image**, **Audio**, or **Video** controls.

For the **Image** control, update the *Image* property with the image file name, without extension. For the **Audio** or **Video** control, update the *Media* property with the file name, or the URL such as YouTube video URL in double quotation marks.

## Add media from Azure Media Services

1. From your Azure Media Services account, upload and publish your video asset from **AMS > Settings > Assets**.

1. After the video is published, copy its URL.

1. From Power Apps, add the **Video** control from **Insert > Media**.

1. Set the **Media** property to the URL that you copied.

    As this graphic shows, you can choose any streaming URL that Azure Media Services supports:

    ![Set media property.](./media/add-images-pictures-audio-video/ams-with-powerapps.png)

1. [Save and publish](save-publish-app.md) your app.

1. [Share app](share-app.md) with others.

## Add Microsoft Clipchamp media

For information about how to add a Microsoft Clipchamp video control, see [Microsoft Clipchamp video control example](controls/modern-controls/new-stream-video-control.md).

## Add images from the cloud to your app

In this scenario, you save images in a cloud storage account, OneDrive for Business. You use an Excel table to contain the path to the images, and you display the images in a gallery control in your app.
In this scenario, you use your own image files stored in OneDrive for Business. You create an Excel table that contains the file paths to those images, and then display the images in a gallery control in your app.

> [!NOTE]
> The path to these images in the Excel file must use forward slashes. When Power Apps saves image paths in an Excel table, the path uses backslashes. If you use image paths from such a table, change the paths in the Excel table to use forward slashes instead of backslashes. Otherwise, the images won't display.  

1. In OneDrive for Business, create a folder named Assets_images, and upload a few .jpg or .png files to that folder.

2. (Optional) If you used a different folder name, rename the folder to Assets_images.

1. In an Excel spreadsheet, create a one-column table named Images, and then add one row per image. In each row, paste the file path (direct link) to an image in your Assets_images folder.

    ![Jackets table.](./media/add-images-pictures-audio-video/jackets.png)

    Tip: To copy the file path from **OneDrive for Business**, select an image file, and then select **Path** (*Copy direct link*) from the details pane on the right side of the screen.

1. Name the table **Jackets**, and name the Excel file **Assets.xlsx**.

1. In your app, add the **Jackets** table as a [data source](add-data-connection.md).  

1. Optionally, update your app [orientation](set-aspect-ratio-portrait-landscape.md) to Landscape.

1. Select **Insert** > **Gallery**, and then select **Horizontal**.

1. Optionally, select the text field and then the heading field under the first image, and delete them to keep only images on the screen.

    ![Delete fields.](./media/add-images-pictures-audio-video/delete-fields.png)

    If you see a formula error, press **Ctrl+Z** to undo the delete. Then, delete the *Subtitle* field and the *Title* field.

1. Set the gallery's **Items** property of the gallery to `Jackets`.

    ![Items property.](./media/add-images-pictures-audio-video/items-jackets.png)

1. Select the first image in the gallery, and set its **Image** property to `ThisItem.Images`:

    ![Items images.](./media/add-images-pictures-audio-video/image-this-item.png)

    The gallery is automatically updated with the images:  

    ![Jacket images.](./media/add-images-pictures-audio-video/images.png)

    When you set the **Items** property, a column named **PowerAppsId** is automatically added to the Excel table.

1. [Save and publish](save-publish-app.md) your app.

1. [Share app](share-app.md) with others.

## Upload pen drawings to the cloud

In this scenario, you learn how to upload pen drawings to your data source, OneDrive for Business, and examine how the drawings are stored there.

1. In Excel, add **Image [image]** to cell A1.

1. Create a table by using the following steps:

   1. Select cell A1.

   1. On the **Insert** ribbon, select **Table**.

   1. In the dialog box, select **My table has headers**, and then select **OK**.

       ![Create a table.](./media/add-images-pictures-audio-video/create-table.png)

       Your Excel file is now in a table format. For more information about table formatting in Excel, see [Format the data as a table](https://support.office.com/article/Format-an-Excel-table-6789619F-C889-495C-99C2-2F971C0E2370).

   1. Name the table **Drawings**:

       ![Rename table to Drawings.](./media/add-images-pictures-audio-video/name-media-table.png)

1. Save the Excel file to OneDrive for Business as **SavePen.xlsx**.

1. In Power Apps, create a [blank app](get-started-create-from-blank.md) with Tablet layout.

1. In your app, add the OneDrive for Business account as a [data source](add-data-connection.md):

   1. Select **View** menu, and then select **Data sources**.

       ![Choose data source.](./media/add-images-pictures-audio-video/choose-data-sources.png)

   1. Select **Add data source**, and then select **OneDrive for Business**.

   1. Select **SavePen.xlsx**.

   1. Select the **Drawings** table, and then select **Connect**.

       ![Connect.](./media/add-images-pictures-audio-video/savepen.png)  

       Now, the Drawings table is listed as a data source.

1. Select **Insert** > **Input**, and then select **Pen Input**.

1. Rename the new control **MyPen**:  

    ![Rename.](./media/add-images-pictures-audio-video/rename-mypen.png)

1. On the **Insert** tab, add a **Button** control, and set its **OnSelect** property to this formula:

    **Patch(Drawings, Defaults(Drawings), {Image:MyPen.Image})**

    ![Button OnSelect.](./media/add-images-pictures-audio-video/button-on-select.png)

1. Add a **Horizontal** gallery control (**Insert** tab > **Gallery**).

1. Optionally, select the text field and then the heading field under the first image, and delete them to keep only images on the screen.

    ![Delete fields.](./media/add-images-pictures-audio-video/delete-fields.png)

    If you see a formula error, press **Ctrl+Z** to undo the delete. Then, delete the *Subtitle* field and the *Title* field.

1. Set the gallery **Items** property to `Drawings`. The **Image** property of the gallery control is automatically set to `ThisItem.Image`.

    Arrange the controls so that your screen resembles the following image:  

    ![Sample screen.](./media/add-images-pictures-audio-video/screen.png)

1. Press F5, or select Preview ( ![Preview button.](./media/add-images-pictures-audio-video/preview.png) ).

1. Draw something in MyPen, and then select the button.

    The first image in the gallery control displays what you drew.

1. Add something else to your drawing, and select the button.

    The second image in the gallery control displays what you drew.

1. Close the preview window by pressing Esc.

    In your cloud storage account, a **SavePen_images** folder is automatically created. This folder contains your saved images with IDs for their file names. To show the folder, you might need to refresh the browser window by, for example, pressing F5.

    > [!NOTE]
    > The folder name might be different if your Excel file name is different. For example, if your file name is Pen.xlsx, the folder name is Pen_images.

    In **SavePen.xlsx**, the **Image** column specifies the path to the new images.

1. [Save and publish](save-publish-app.md) your app.

1. [Share app](share-app.md) with others.

## Remove unused media

To clean up your app or reduce its size, remove all unused media files by selecting **Media** > **Remove unused media**.

:::image type="content" source="media\add-images-pictures-audio-video\remove-unused-media.png" alt-text="Remove unused media from the app":::

## Known limitations

- To enable better performance while loading an app, the following size restrictions apply:
    - The total size of all media files uploaded to an app can't exceed 200 MB.
    - The maximum size of an individual media file in an app can't exceed 64 MB.
- Supported media file types: `.jpg, .jpeg, .gif, .png, .bmp, .tif, .tiff, .svg, .wav, .mp3, .mp4`.
- When connecting your app to cloud-based storage, [Cloud-storage known limitations](connections/cloud-storage-blob-connections.md#known-limitations) apply.

## See also

- [Control reference](reference-properties.md)
- [Working with formulas](working-with-formulas.md)

---

## Overview of Copilot answer control for canvas apps

Source: [copilot-answer-control-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/copilot-answer-control-overview)

*Use the Copilot answer control for canvas app.*

#  Use Copilot answer control for canvas apps (preview)

[This article is prerelease documentation and is subject to change.]

Makers can use the Copilot answer control to set predefined questions that end users can use to get AI-generated information with a single click. The control is powered by Microsoft Copilot and is designed for mobile users to provide them with immediate answers to frequently asked questions.

> [!IMPORTANT]
> Starting February 2, 2026, this feature will be removed. Existing apps with this control will remain functional for a limited time but will eventually no longer be supported. [Microsoft 365 Copilot in canvas apps](https://releaseplans.microsoft.com/?app=Power+Apps&planID=d8f2152f-1e0e-f111-8407-7ced8d183a37) is the new the recommended solution for natural language interactions in canvas apps. To ensure a smooth transition and prevent any disruption, we recommend that you migrate to Microsoft 365 Copilot as soon as it becomes available in your environment.

> [!NOTE]
>
> - This is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2216214), and are available before an official release so that customers can get early access and provide feedback. 

:::image type="content" source="media/answer-control/answer-control-shown-on-mobile.png" alt-text="Answers shown on mobile":::

## Enable Copilot answer control for your environment

To use the Copilot answer control in a canvas app, an admin must first turn on the feature, **Allow canvas editors to insert the Copilot answer component, which allows users to receive an AI-powered answer to a predefined data query** in their environment. 

This setting can be found in the [Power Platform admin center](https://admin.powerplatform.microsoft.com) by going to **Environments** > [select an environment] > **Settings** > **Product** > **Features**. For more information, see [Manage feature settings](/power-platform/admin/settings-features#copilot-preview).

:::image type="content" source="media/answer-control/answer-control-enable-by-admin.jpg" alt-text="Turn on Copilot answer control on Power Platform admin center":::


## Add Copilot answer control

With your [canvas app open for editing](edit-app.md) in Power Apps Studio:

1. On the command bar, select **Insert** and then select **Copilot answer (preview)**
    
1. When the **Copilot answer (preview)** control is added to the canvas app, select a data source from the pane. Copilot only supports Dataverse tables.

   :::image type="content" source="media/answer-control/answer-control-select-data-type.png" alt-text="Select data source":::

1. On the control properties pane, select the **Properties** tab.

1. In the properties, enter the **Title**, **Questions for Copilot**, and **Show answer** for the question. You can also edit other control properties as needed.

   :::image type="content" source="media/answer-control/answer-control-properties.png" alt-text="Answer control properties":::

1. When you're done, [save and publish](save-publish-app.md) your app.

## Use Copilot answer control

End users can regenerate responses and provide feedback on the quality of responses.

Follow these steps to see answers generated by the Copilot answer control:

1. Open a canvas app on Power Apps mobile and navigate to the Copilot answer control in your app.
1. On the Copilot answer control select, **Send**.

    :::image type="content" source="media/answer-control/answer-control-send.png" alt-text="Use Copilot answer control on mobile":::

---

## Use mixed reality controls in Power Apps

Source: [mixed-reality-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-overview)

*Use augmented reality features in Power Apps to view and manipulate 3D models in the real world, take measurements, and create and view 3D shapes.*

# Add mixed reality controls to your canvas app

Add mixed reality (MR) controls to your canvas apps to interact with the real world in 3D.

You can use MR controls to:

- View and manipulate 3D content with [3D object](mixed-reality-component-view-3d.md)
- Overlay 3D content and 2D images on the camera feed with [View in mixed reality](mixed-reality-component-view-mr.md)
- Measure distance, area, and volume with [Measure in mixed reality](mixed-reality-component-measure-distance.md)
- Identify spaces and locations by painting 3D lines and arrows with [Markup in mixed reality](mixed-reality-component-view-shape.md)

:::image type="content" source="./media/augmented-overview/mixed-reality-overview.png" alt-text="A screenshot of a phone app with a 3D control under construction in Microsoft Power Apps Studio, alongside a photo that shows the app in use.":::

You'll find the controls on the **Insert** pane, under **Media** and **Mixed Reality**:

:::image type="content" source="./media/augmented-overview/augmented-overview-insert-all.png" alt-text="A screenshot of the Insert pane in Microsoft Power Apps Studio.":::
  
> [!TIP]
> The MR controls in Power Apps use Babylon and Babylon React Native. Mixed reality content that works in the [Babylon sandbox](https://sandbox.babylonjs.com/) should work in Power Apps through this shared MR platform. If your content works in Babylon but not in Power Apps, ask a question in the [Power Apps community forum](https://powerusers.microsoft.com/t5/Get-Help-with-Power-Apps/ct-p/PA_General).
>  
> [Read more about our integration with Babylon](https://babylonjs.medium.com/babylon-react-native-bringing-3d-and-xr-to-react-native-applications-7928b55acc85).

## Prerequisites

The device you use to create an app with MR controls, such as your PC, doesn't need to be MR-capable. Mobile devices that run the app must have specific hardware and software to use MR controls.

### Android devices

Android devices need to have Google Play Services for AR (known more commonly as ARCore) installed. ARCore should be installed automatically on MR-capable devices. If necessary, download [Google Play Services for AR from the Google Play Store](https://play.google.com/store/apps/details?id=com.google.ar.core).

For more information about ARCore and devices that support it, see the [list of supported devices on the Google ARCore support site](https://developers.google.com/ar/discover/supported-devices#android_play).

The experience is a little different for devices in China, which don't ship with the Google Play Store. [ARCore must be downloaded from specific app stores in China](https://developers.google.com/ar/discover/supported-devices#android_china).

### iOS (Apple) devices

iPhones and iPads with specific hardware can run MR apps using the ARKit framework. For more information about MR and iOS devices that support it, see the [list of supported devices on the Apple augmented reality website](https://www.apple.com/augmented-reality/). (Scroll to the bottom of the page to see the list.)

## Mixed reality controls

Start adding the controls to your apps:

- View 3D content with the **[3D object](mixed-reality-component-view-3d.md)** control.
- View images and 3D content in the real world with the **[View in mixed reality](mixed-reality-component-view-mr.md)** control.
- Measure distance, area, and volume with the **[Measure in mixed reality](mixed-reality-component-measure-distance.md)** control.
- Create and view 3D shapes with the **[View shape in mixed reality](mixed-reality-component-view-shape.md)** control.
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

### See also

[Build a 3D mobile app with Power Apps in mixed reality](/training/modules/power-apps-tutorial/)

[Improve sales conversation by placing products directly in your customer's space with Mixed Reality](https://powerapps.microsoft.com/blog/improving-sales-conversion-by-placing-products-directly-in-your-customers-space-with-mixed-reality/)

---

## Use the 3D object control in Power Apps

Source: [mixed-reality-component-view-3d.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-component-view-3d)

*View 3D models in Power Apps.*

# View 3D content in Power Apps

Easily add interactive 3D content to your canvas apps. You can [select from a gallery of 3D content](mixed-reality-component-view-3d-store.md) then rotate and zoom into the model with simple gestures.

:::image type="content" source="./media/augmented-overview/view-in-3d.png" alt-text="A photo of two phones side by side, both of which show a 3D model of a forklift viewed in two mobile apps.":::

> [!IMPORTANT]
> Your 3D content must be in the .glb, .obj, or .stl file formats. You can [convert your existing 3D models into the .glb file format](/dynamics365/mixed-reality/guides/3d-content-guidelines/) from a variety of 3D formats.

> [!TIP]
> The mixed reality (MR) controls in Power Apps use Babylon and Babylon React Native. Mixed reality content that works in the [Babylon sandbox](https://sandbox.babylonjs.com/) should work in Power Apps through this shared MR platform. If your content works in Babylon but not in Power Apps, ask a question in the [Power Apps Community Forum](https://powerusers.microsoft.com/t5/Get-Help-with-Power-Apps/ct-p/PA_General). (Tag it with "mixed reality.")

## Add 3D object control to an app screen

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Media**.
2. Select **3D object** to place the control in the app screen, or drag the control to the screen to position it more precisely.

## Key properties


Change the 3D content control's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

:::image type="content" source="./media/augmented-3d/augmented-3d-viewer-controls.png" alt-text="A 3D content control displayed next to the properties tab in Power Apps Studio.":::

| Property | Description | Type | Location |
| - | - | - | - |
| Source | Identifies the object file to display. The **3D object** control supports loading models from various sources. See [Loading external 3D models](mixed-reality-component-view-3d-store.md) for details. | Not applicable | Properties; Advanced: **Source** |
| Alternative text | Specifies the text to be displayed if the model can't load or if the user hovers over the model. | String | Properties; Advanced: **AltText** |
| Background fill | Sets the control's background color. | Color picker | Properties; Advanced: **BackgroundFill** (accepts RGBA or HTML hexadecimal color codes) |
| Pins(Items) | [Shows pins on the model at specific coordinates](mixed-reality-add-pins-3d-model.md), provided in a data source (**Items**). If *None*, no pins are shown. | Data table | Properties; Advanced: **Items** |
| Show pins | Shows the pins described in **Items**. | Boolean | Properties; Advanced: **ShowPins** |
| MaxPins | Specifies the maximum number of pins that can be shown on the model. | Integer | Advanced |
| PinsX | Specifies the location of pins on the X axis in 3D coordinate space. | Floating point number | Advanced |
| PinsY | Specifies the location of pins on the Y axis in 3D coordinate space. | Floating point number | Advanced |
| PinsZ | Specifies the location of pins on the Z axis in 3D coordinate space. | Floating point number | Advanced |
| Show reset button | Shows or hides a button that resets the model to its initial state. | Boolean | Properties; Advanced; **ShowReset** |
| OnModelLoad | Contains behavior formula that runs when a model is loaded.| Event | Advanced |
| OnChange | Contains behavior formula that runs when any property of the control is changed. | Event | Advanced |
| OnSelect | Contains behavior formula that runs when the user selects a pin or the control. | Event | Advanced |

## Additional properties

| Property | Description | Type | Location |
| - | - | - | - |
| ContentLanguage | Determines the display language of the control, if it's different from the language used in the app. | String | Advanced |
| [DisplayMode](./controls/properties-core.md) |  Determines whether the control allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Dropdown list | Advanced |
| Position | Places the upper-left corner of the control at the screen coordinates specified in *x* and *y*. | Floating point number | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the control using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| [TabIndex](./controls/properties-accessibility.md) | Specifies the order the control is selected if the user navigates the app using the Tab key. | Integer |  Advanced |
| [Tooltip](./controls/properties-core.md) | Determines the text to display when the user hovers over a pin. | String | Advanced |
| [Visible](./controls/properties-core.md) | Shows or hides the control. | Boolean | Properties; Advanced: **Visible** |

## Performance considerations

We recommend that you use one 3D control on a screen for the best user experience. Multiple instances of the **3D object** control on one screen will try to load their 3D models at the same time, which can severely degrade the performance of your app.

## Other mixed reality controls

- View 3D content and images in the real world with the **[View in mixed reality](mixed-reality-component-view-mr.md)** control.
- Measure distance, area, and volume with the **[Measure in mixed reality](mixed-reality-component-measure-distance.md)** control.
- Create and view predefined 3D shapes with the **[View shape in mixed reality](mixed-reality-component-view-shape.md)** control.
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

### See also

[Create an app with 3D and mixed reality controls](how-to/build-view-in-mr-3d-apps.md)

---

## Connect 3D models to Power Apps

Source: [mixed-reality-component-view-3d-store.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-component-view-3d-store)

*Load 3D models into Power Apps from attachments, media content, direct URLs, or Base64-encoded URIs.*

# Load 3D models in canvas apps

Load a 3D model in your canvas apps from a variety of sources. You can get models from attachments or media content, a direct URL, or a Base64-encoded URI (uniform resource identifier).

Make sure your 3D models are [optimized for use with Power Apps](/dynamics365/mixed-reality/guides/3d-content-guidelines/optimize-models) to minimize load times.

## Loading 3D models from common connectors

Loading 3D models from attachments or media content depends on how a data connector is supported. To check if a data connector will work the mixed reality controls, add a label control to the canvas app and set the **Text** property to the data source. If the label text starts with `appres://`,then that data connector should work with the **3D object control**.

> [!TIP]
> You can rename a .glb file extension to .jpg and directly upload it to the app through the Media tab.


### Load 3D models from Microsoft Lists

First, create a list in SharePoint and add an entry for each 3D model that you want to have in your app.

1. [Create a list using Microsoft Lists](https://go.microsoft.com/fwlink/?linkid=2186009).
2. Select the **+ Add column** column heading and then select **Show/hide columns**.
3. Select **Attachments** and then select **Apply**.
4. Add an entry to the list. In the entry form, select **Add attachments** and select your 3D model file.
5. Repeat for each model you want to include in your app.

Then, add a gallery to your app, set its source to the list, add a **3D object** control, and set its source to the gallery.

1. [Add a gallery](./add-gallery.md) in Power Apps Studio.
2. Set the gallery data source to the list.
3. [Add the **3D object** control](./mixed-reality-component-view-3d.md).
4. In the **Advanced** properties tab, set **Source** to **First(Gallery1.Selected.Attachments).Value**.

### Load 3D models from an Excel workbook

First, create an Excel workbook in OneDrive in the same folder that contains your model files. Add a table with rows for each model that you want to have in your app.

1. Create an Excel workbook and save it in the OneDrive folder that contains your model files.

    :::image type="content" source="./media/augmented-3d/augmented-3d-onedrive-list.png" alt-text="A screenshot of OneDrive that shows the Excel workbook ModelGallery and its accompanying 3D model files.":::

2. In the workbook, create a table with columns named **3DModel [image]** and **Name**.
3. Add a row for each model you want to show in the app gallery. Enter a label for the model in the **Name** column and the relative file path to the model file in the **3DModel [image]** column.

    :::image type="content" source="./media/augmented-3d/augmented-3d-excel-list.png" alt-text="{A screenshot of an Excel table with columns for the name of a 3D model and the path to the object file.}":::

4. Close the workbook.

Then, add a gallery to your app, set its source to the Excel workbook, add a **3D object** control, and set its source to the gallery.
  
1. [Add a gallery](./add-gallery.md) in Power Apps Studio.
2. Use the OneDrive connector to set the gallery data source to the Excel workbook.
3. [Add the **3D object** control](./mixed-reality-component-view-3d.md).
4. In the **Advanced** properties tab, set **Source** to **Gallery1.Selected.'3DModel'**.

### Load 3D models from a URL

The **Source** property of the **3D object** control can be the URL of a 3D model file.

The 3D model file must be on a server that doesn't have restrictive cross-origin resource sharing (CORS) settings. The hosting server must permit cross-origin requests from *powerapps.com*. You can use Dropbox or GitHub to host your files and get a CORS-compliant URL.

#### Host your 3D model files in Dropbox

1. Upload a 3D model file to Dropbox and select **Share**.
1. Generate a public download link. For example, *<https://www.dropbox.com/s/rANdoMGeneR4tedLink/my-file.glb?dl=0>*.
1. Modify the URL like this: replace **www** with **dl**, and remove **?dl=0** at the end.

You now have a direct-access URL (in our example, *<https://dl.dropbox.com/s/rANdoMGeneR4tedLink/my-file.glb>*), that you can use as the source of your 3D control.

#### Host your 3D model files in GitHub

1. Make sure the 3D model file is stored in a public repo.
2. Get the URL of the file. For example, *<https://github.com/microsoft/experimental-pcf-control-assets/blob/master/robot_arm.glb>*.
3. Modify the URL like this: remove **/blob/**, and replace **<https://github.com>** with **<https://raw.githubusercontent.com>**.

You now have a CORS-compliant URL (in our example, *<https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/robot_arm.glb>*), that you can use as the source of your 3D control.

### Load Base64-encoded 3D models

The **Source** property of the **3D object** control can be a Base64-encoded 3D model data URI that is in the format *data:base64,\<Base64-encoded content\>*.

> [!IMPORTANT]
> Your app may take longer to load if you use Base64-encoded models.

You can create a Base64-encoded URI of your model using Microsoft Power Automate or Microsoft Dataverse.

#### Create a Base64-encoded 3D model with Microsoft Power Automate

Power Automate can convert 3D model files stored in a SharePoint document library to Base64 using the **dataUri(base64(*file content*))** expression.

In the following example, a document library named *3DModelBase64Library* and a list named *3DModelBase64* exist in the same SharePoint site. The list must include a column of type **multiple-line text**.

1. In the document library, [create a flow](/power-automate/sharepoint-overview) based on the **When a new file is added in SharePoint, complete a custom action** template.
2. Set **Library Name** to *3DModelBase64Library* (the name of the document library in this example).
3. Add a step, **Get file content from SharePoint**.
4. Set **File Identifier** to **Identifier**.
5. Add a step, **Create item from SharePoint**.
6. Set **List Name** to *3DModelBase64* (the name of the list in this example) and **Title** to **File Name with extension**.
7. Set **dataUri** to the following expression:

    ```concat('data:model/gltf-binary;base64,', Last(split(dataUri(base64(body('Get_file_content'))), ',')))```

    :::image type="content" source="./media/augmented-3d/augmented-3d-convert-flow.png" alt-text="A screenshot of a Power Automate workflow that shows the steps to convert 3D model files in a SharePoint document library to Base64.":::

The flow runs when a file is added to the document library, converting the file to a Base64-encoded data URI.

In Power Apps Studio, connect the **3D object** control to the list using the SharePoint data connector. Set the control's **Source** property to the Base64-encoded data URI.

#### Create a Base64-encoded 3D model with Microsoft Dataverse

The [Note (Annotation) table](../../developer/data-platform/reference/entities/annotation.md) in Microsoft Dataverse converts any file attached in the **Document** field to Base64.

## Known constraints when loading 3D models from URLs in canvas apps

- The security architecture of Power Apps requires HTTPS links, not HTTP.
- The server that hosts the model files must not require authentication and must be CORS-compliant.

---

## Add pins to 3D objects in your canvas apps

Source: [mixed-reality-add-pins-3d-model.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-add-pins-3d-model)

*Add pins to 3D objects in canvas apps using Power Apps Studio.*

# Add pins to 3D models in Power Apps

Add pins (shown as circular markers) to 3D models in your canvas apps. Users can add their own pins and view information about pins they select.

:::image type="content" source="./media/augmented/pins-example.png" alt-text="A screenshot of a mobile app showing a 3D model of a chair, with four blue circles marking the locations of pins.":::

## Add predefined pins to a 3D model from an Excel workbook

The easiest way to add pins to a 3D model is to load them from an Excel workbook.

The data source for the pins must be a named table in Excel. The table must have four columns. Each column corresponds to a property of the **3D object** control. Each row is plotted as a pin on the model. The rows determine the placement of the pins in a three-dimensional coordinate system.

> [!IMPORTANT]
> The mixed-reality (MR) controls in Power Apps use a [left-handed coordinate system](/windows/uwp/graphics-concepts/coordinate-systems).

| Column | Corresponds to |
| - | - |
| Label | ItemsLabels |
| X | PinsX |
| Y | PinsY |
| Z | PinsZ |

Here's an example of a table named "TestPins" that contains coordinates to place four pins on a 3D model:

:::image type="content" source="./media/augmented/pins-table-sample.png" alt-text="An example Microsoft Excel worksheet with a table named TestPins that contains Label, X, Y, and Z columns.":::

To try this example, start by creating a table in Excel.

1. Copy the following sample data and paste it in cell A1 of a new Excel worksheet.

    | Label | X Pins | Y Pins | Z Pins |
    | - | - | - | - |
    | Front Left | -0.2 | 0.01 | 0.2 |
    | Front Right | 0.2 | 0.01 | 0.2 |
    | Zero | 0 | 0 | 0 |
    | X Point | 0 | 0.72 | -0.2 |

2. Select one of the pasted cells. On the **Home** tab, select **Format as Table**, choose a style, and then select **OK**.
3. On the **Table Design** tab under **Table Name**, enter a name such as *TestPins*.
4. Save the workbook and close it.

Next, add the table as a data source to display pins on a 3D model.

1. In Power Apps Studio, [insert a 3D model](mixed-reality-component-view-3d.md) or select an existing model.
2. [Set the **3D object** control's **Source** property](mixed-reality-component-view-3d-store.md) to *https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/chair.glb* (or any other model file of your choosing).

> [!NOTE]
> The first instance of the **3D object** control is named *3DObject1* by default and that's the name we'll use in the following examples. Additional instances of the control would be referred to as *ViewIn3D2*, *ViewIn3D3*, and so on.

1. On the model's **Properties** tab, select the **Pins(Items)** dropdown list.
2. Type *excel* in the search box, and then select **Import from Excel**.
3. Locate the Excel workbook you saved earlier and open it.
4. Select the name you gave the table in Excel and then select **Connect**.
5. On the **Advanced** tab, find **PinsX**, **PinsY**, and **PinsZ** and enter the name of the corresponding column in the table. (In this example, enter *Label* in **ItemsLabels**, *X* in **PinsX**, and so on.) Enclose the column name in quotation marks.

Pins appear on the model at the locations described by the coordinates.

## Show the label and coordinates of pins on a 3D model

Use a data table to display the label and coordinates of selected pins in a canvas app.

:::image type="content" source="./media/augmented/pins-all.png" alt-text="A screenshot of a 3D model under construction in Microsoft Power Apps Studio. Four pins have been placed on the model, and information about the pins is shown in a table below the model.":::

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Layout**.
2. Select **Data table** to place a table in the app screen, or drag the control to the screen to position it more precisely.
3. Choose to show information about all pins or only the selected pin. With the data table selected:

   - **Show all pins:** In the **Properties** pane, select the **Pins(Items)** dropdown list and select the Excel table you connected to earlier.

   - **Show the selected pin only:** In the Power Apps Studio expression editor, enter *3DObject1.SelectedItems*.

       :::image type="content" source="./media/augmented/pins-label-selected.png" alt-text="A screenshot of the Power Apps Studio expression editor showing the expression used to display information about a selected pin.":::

4. On the **Properties** pane, select **Edit fields**, and then select **Add field**.
5. Select the columns to show, and then select **Add**.

    :::image type="content" source="./media/augmented/pins-add-fields.png" alt-text="A screenshot of a 3D model under construction in Power Apps Studio, shown alongside a list of fields to add to a data table.":::

## Show the label of a selected pin on a 3D model

Use a text box to display just the label of the selected pin in a canvas app.

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab.
2. Select **Text label** to place a text box in the app screen, or drag the control to the screen to position it more precisely.
3. In the expression editor, enter *3DObject1.Selected.Label*.

## Create a collection to let users add their own pins to a 3D model

If you want to allow users to place pins on a 3D model, [use a collection](create-update-collection.md).

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab.
2. Select **Text input** to place a text entry box in the app screen.
3. Copy the text box and paste it three times to create four text input controls.
4. Set the **Default** property for each control to *X*, *Y*, *Z*, and *Label*, respectively.
5. Open the **Tree view** tab.
6. Rename each control, as appropriate, to *XCoordinate*, *YCoordinate*, *ZCoordinate*, and *LabelInput*.

    :::image type="content" source="./media/augmented/pins-coords.png" alt-text="A screenshot of the Power Apps Studio tree view that shows four renamed text input controls.":::

Next, add a button to append the user's data to the pin collection.

1. Open the **Insert** tab.
2. Select **Button** to place a button in the app screen.
3. Set the button's **Text** property to *Add pin*.
4. Enter the following code in the button's **OnSelect** property, exactly as shown:

    ```power-fx
    Collect( 
    PinsCollection,
      {
        X: XCoordinate.Text,
        Y: YCoordinate.Text,
        Z: ZCoordinate.Text,
        Label: LabelInput.Text
      }
    )
    ```

Now you'll change the data source of the pins from the Excel table to the new collection.

1. Select the 3D model.
2. On the **Properties** tab, select the **Pins(Items)** dropdown list, and then select **PinsCollection**.

    :::image type="content" source="./media/augmented/pins-collect-connect.png" alt-text="A screenshot of the Pins(Items) property of a 3D model in Power Apps Studio, with the data source PinsCollection selected.":::

3. On the **Advanced** tab, find **PinsX**, **PinsY**, and **PinsZ** and set them to *X*, *Y*, and *Z*, respectively.

When the user enters coordinates and a label and selects **Add pin**, a labeled pin is placed on the model at the entered coordinates.

## Show information about pins as they're added to a 3D model

Finally, combine the previous examples by displaying information about the pins as the user adds them.

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Add a data table to the screen.
2. On the **Properties** tab, select the **Pins(Items)** dropdown list and select **PinsCollection**.
3. Select **Edit fields**, and then select **Add field**.
4. Select the columns to show in the table, and then select **Add**.

## Other mixed reality controls

- View 3D content in mixed reality with the **[View in MR](mixed-reality-component-view-mr.md)** control.
- Measure distance, area, and volume with the **[Measuring Camera](mixed-reality-component-measure-distance.md)** control.
- Create and view predefined 3D shapes with the **[View shape in MR](mixed-reality-component-view-shape.md)** control.
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

---

## Use the View shape in MR control in Power Apps

Source: [mixed-reality-component-view-shape.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-component-view-shape)

*View a predefined 3D shape in the real world with augmented reality features in Power Apps.*

# View predefined 3D shapes in mixed reality

Use the **View shape in MR** control in a canvas app to see whether a digital cube of a given size fits in a real-world space. (To compare a 3D model of an object instead, use the [**View in MR**](mixed-reality-component-view-mr.md) control.)

The **View shape in MR** control adds a button to your app. When a user selects the button, the app overlays a cube on the device camera feed. The cube's dimensions are set as a property on the control when you author the app in Microsoft Power Apps Studio. Users may not change the size of the cube while they use the app.

:::image type="content" source="./media/augmented-overview/view-shape-in-mixed-reality.png" alt-text="A photo of a tablet screen that shows a digital cube overlaid on the user's view of an office.":::

> [!TIP]
> The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.

> [!TIP]
> The MR controls in Power Apps use Babylon and Babylon React Native. Mixed reality content that works in the [Babylon sandbox](https://sandbox.babylonjs.com/) should work in Power Apps through this shared MR platform. If your content works in Babylon but not in Power Apps, ask a question in the [Power Apps Community Forum](https://powerusers.microsoft.com/t5/Get-Help-with-Power-Apps/ct-p/PA_General). (Tag it with "mixed reality.")

## Add a **View shape in MR** button to an app screen

With your app open for editing in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Mixed Reality**.
2. Select **View shape in MR** to place the control in the app screen, or drag the control to the screen to position it more precisely.

The control is a button that's labeled with an icon of a cube and the text *Place a cube*. Change the label and hide the icon if you like in the **Text** and **Display type** properties.

   :::image type="content" source="./media/augmented-view-shape/augmented-view-shape.png" alt-text="A screenshot of the Insert tab in Power Apps Studio, showing where to find the View shape in MR control.":::

### Properties

Change the **View shape in MR** button's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

:::image type="content" source="./media/augmented-view-shape/augmented-view-shape-properties.png" alt-text="A screenshot of the View shape in MR button next to its properties in Power Apps Studio.":::

| Property | Description | Type | Location |
| - | - | - | - |
| Text | Sets the button label text. | String | Properties; Advanced: **Text** |
| Alternative text | Specifies the text to be displayed if the model can't load or if the user hovers over the model. | String | Properties; Advanced: **AltText** |
| Display type | Determines whether the button label shows an icon of a cube, text, or both. | Drop-down selection | Properties; Advanced: **DisplayType** |
| Shape width | Sets the width of the cube. | Integer | Properties; Advanced: **ShapeWidth** |
| Shape height | Sets the height of the cube. | Integer | Properties; Advanced: **ShapeHeight** |
| Shape depth | Sets the depth of the cube. | Integer | Properties; Advanced: **ShapeDepth** |
| Unit of measurement | Sets the measurement unit used for the cube's width, height, and depth. | Drop-down selection | Properties; Advanced: **Units** |
| Enable Shadows | Determines whether shadows are used to enhance the 3D effect when the cube is shown. | Boolean | Properties; Advanced: **EnableShadows** |
| Enable Marker Detection | Determines whether marker detection will be used to to determine model position and rotation. See [Use marker detection with mixed reality controls](./mixed-reality-marker-detection.md) | Boolean | Properties; Advanced: **EnableMarkerDetection** |
| Visible | Shows or hides the button. | Boolean | Properties; Advanced: **[Visible](./controls/properties-core.md)** |
 Position | Places the upper-left corner of the button at the screen coordinates specified in *x* and *y*. | Floating point number | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the button using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| Padding top | Sets the distance between the button label text and the top of the button. | Floating point number | Properties; Advanced: **[PaddingTop](./controls/properties-size-location.md)** |
| Padding bottom | Sets the distance between the button label text and the bottom of the button. | Floating point number | Properties; Advanced: **[PaddingBottom](./controls/properties-size-location.md)** |
| Padding left | Sets the distance between the button label text and the left edge of the button. | Floating point number | Properties; Advanced: **[PaddingLeft](./controls/properties-size-location.md)** |
| Padding right | Sets the distance between the button label text and the right edge of the button. | Floating point number | Properties; Advanced: **[PaddingRight](./controls/properties-size-location.md)** |
| Font | Sets the name of the family of fonts used for the button label text. | Dropdown list | Properties; Advanced: **[Font](./controls/properties-text.md)** |
| Font size | Sets the size of the button label text. | Floating point number | Properties; Advanced: **[FontSize](./controls/properties-text.md)** |
| Font weight | Sets the weight of the button label text, either *Bold*, *Lighter*, *Normal*, or *Semibold*. | Dropdown list | Properties; Advanced: **[FontWeight](./controls/properties-text.md)** |
| Text alignment | Sets the horizontal alignment of the label text in the button, either *Center*, *Justify*, *Left*, or *Right*. | Not applicable | Properties; Advanced: **[TextAlignment](./controls/properties-text.md)** |
| Vertical alignment | Sets the vertical alignment of the label text in the button, either *Bottom*, *Middle*, or *Top*. | Dropdown list | Properties; Advanced: **[VerticalAlign](./controls/properties-text.md)** |
| Font style | Sets the style of the button label text, either *Italic*, *Underline*, *Strikethrough*, or none. | Not applicable | Properties; Advanced: **Italic**, **Underline**, **Strikethrough** |
| Border radius | Determines the corner radius of the button border. | Floating point number | Properties; Advanced: **BorderRadius** |
| **[Color](./controls/properties-color-border.md)** | Sets the colors of the button label text and the button background. | Not applicable | Properties; Advanced: **FillColor**, **TextColor** |
| Border | Determines the style, width, and color of the button border. | Not applicable | Properties; Advanced: **[BorderStyle](./controls/properties-color-border.md)**, **[BorderThickness](./controls/properties-color-border.md)**, **[BorderFillColor](./controls/properties-color-border.md)** |
| Disabled | Turns off the button but leaves it visible. | Boolean | Properties; Advanced: **Disabled** |
| Disabled color | Sets the colors of the button label text, the button background, and the button border if **[DisplayMode](./controls/properties-core.md)** is **Disabled**. | Not applicable | Properties; Advanced: **DisabledContentColor**, **DisabledFillColor**, **DisabledBorderColor** |
| Pressed color | Sets the colors of the button label text, the button background, and the button border when the user selects the button. | Not applicable | Properties; Advanced: **PressedContentColor**, **PressedFillColor**, **PressedBorderColor** |
| Hover color | Sets the colors of the button label text, the button background, and the button border when the user hovers the mouse pointer over it. | Not applicable | Properties; Advanced: **HoverContentColor**, **HoverFillColor**, **HoverBorderColor** |
| OnMixedRealitySelect | Behavior that is triggered when user selects the button to launch into the mixed reality experience. | Defined action | Advanced |
| OnChange | Behavior that is triggered when any property on the button is changed. This is a common property across multiple controls. | Defined action | Advanced |
| **[Tooltip](./controls/properties-core.md)** | Determines the text to display when the user hovers over the button. | String | Advanced |
| ContentLanguage | Determines the display language of the button label, if it's different from the language used in the app. | String | Advanced |
| **[DisplayMode](./controls/properties-core.md)** | Determines whether the button allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Enum | Advanced |
| **[TabIndex](./controls/properties-accessibility.md)** | Specifies the order the button is selected if the user navigates the app using the Tab key. | Integer | Properties; Advanced: **TabIndex** |


### Output properties

Your app can make use of more properties when a user interacts with the **View shape in MR** control. These are known as output properties. You can use these properties in other controls or to customize the app experience.

| Property | Description | Type |
| - | - | - |
| Photos | Collects the photos captured during the mixed reality session. You can [upload the mixed-reality photos to OneDrive and show them in a gallery](mixed-reality-take-upload-photos.md). | Not applicable |

## Other mixed reality controls

- View 3D content with the **[3D object](mixed-reality-component-view-3d.md)** control.
- View images and 3D content in the real world with the **[View in mixed reality](mixed-reality-component-view-mr.md)** control.
- Measure distance, area, and volume with the **[Measure in mixed reality](mixed-reality-component-measure-distance.md)** control.
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

### See also

- [Create an app to view a shape in mixed reality](how-to/mobile-apps-view-shape-in-mr.md)
- [Use marker detection with mixed reality controls](./mixed-reality-marker-detection.md)

---

## Use the View in MR control in Power Apps

Source: [mixed-reality-component-view-mr.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-component-view-mr)

*View 3D models and 2D images in the real world with augmented reality features in Power Apps.*

# View 3D content or images in mixed reality

Use the **View in MR** control to place a 3D model of an object or an image in a real-world space. For instance, preview a painting on a wall before you hang it, or see whether a 3D virtual bookcase will fit where you intend it to go.

What if you don't have a 3D model of the object? Load an image of the object and set its dimensions to the object's size. The control applies the image as the face of a virtual cube of the desired size. Place this stand-in for the 3D model in your space.

The **View in MR** control adds a button to your app. When a user selects the button, the app overlays a selected 3D model (in .glb, .stl, or .obj file formats) or image (in .jpg or .png file formats) on the device camera feed.

:::image type="content" source="./media/augmented-overview/view-in-mixed-reality.png" alt-text="A photo of a tablet screen that shows a 3D model of a forklift overlaid on a warehouse interior view.":::

You can also take photos using the **View in MR** control and [upload them to OneDrive](mixed-reality-take-upload-photos.md).

> [!IMPORTANT]
> Your 3D content must be in the .glb, .stl, or .obj file formats.
> You can [convert your existing 3D models into the .glb file format](/dynamics365/mixed-reality/guides/3d-content-guidelines/) from a variety of 3D formats.
> 3D content compressed with Draco compression Draco is not supported.

> [!TIP]
> - Make sure your 3D models are [optimized for use with Power Apps](/dynamics365/mixed-reality/guides/3d-content-guidelines/optimize-models) to minimize load times.
>
> - The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.
>
> - The MR controls in Power Apps use Babylon and Babylon React Native. Mixed reality content that works in the [Babylon sandbox](https://sandbox.babylonjs.com/) should work in Power Apps through this shared MR platform. If your content works in Babylon but not in Power Apps, ask a question in the [Power Apps Community Forum](https://powerusers.microsoft.com/t5/Get-Help-with-Power-Apps/ct-p/PA_General). (Tag it with "mixed reality.")

## Add a View in MR button to an app screen

With your app open for editing in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Mixed Reality**.

1. Select **View in MR** to place the control in the app screen, or drag the control to the screen to position it more precisely.

The control is a button that's labeled with an icon of a cube and the text *View in MR*. Change the label and hide the icon if you like in the **Text** and **Display type** properties.

:::image type="content" source="./media/augmented-view-mr/augmented-view-mr.png" alt-text="A screenshot of the Insert tab in Power Apps Studio, showing where to find the View in MR control.":::

## View different models in a single session

The View in MR control displays one media file by default. To view different media files selected through a media gallery during the MR experience, use the control's *Items* advanced property. This property creates a table that lists media files the user can choose from in the mixed reality experience.

When you use the *Items* property, you need to set a value for the following additional advanced properties to map the columns of your table:

| Property | Description |
| --- | --- |
| **ItemsSource** (required) | Specifies which column in *Items* identifies the 3D model or image to show in the mixed reality view. See [Connect 3D models to Power Apps](mixed-reality-component-view-3d-store.md) to learn more about bringing models into Power Apps. |
| **ItemsLabel** | Specifies which column in *Items* contains the label to show in the media gallery. The *Alternative text* property is used for items that don't have a label specified. |
| **ItemsThumbnail** | Specifies which column in *Items* identifies the thumbnail to show in the media gallery. A default thumbnail is provided for items that don't have one specified. |
| **ItemsObjectWidth, ItemsObjectHeight, ItemsObjectDepth** | Specifies an explicit size for each media item in the table. *Object width*, *Object height*, and *Object depth* are used for items that don't have a specific size.

To test it, let's create a media gallery that shows three different plants in a room setting. Our *Items* table looks like this:

| label | source | thumbnail |
| --- | --- | ---|
| Birds of Paradise | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/bird_of_paradise_blue.glb | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/bird_of_paradise_blue.png |
| Fiddle Leaf Fig | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/flf_orange.glb | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/flf_orange.png |
| Small Palm Tree | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/palm_green.glb | https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/palm_green.png |

:::image type="content" source="./media/augmented-3d/multi-model-selection-tray.gif" alt-text="Video that shows a media gallery in a mixed reality experience.":::

With your app open for editing in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Mixed Reality**.

2. Select **View in MR** to place the control in the app screen, or drag the control to the screen to position it more precisely.

3. On the **Advanced** properties tab, select the *Items* property and type or paste the following code:

    ```power-fx
    Table(
    {
    label: "Birds of Paradise",
    source: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/bird_of_paradise_blue.glb",
    thumbnail: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/bird_of_paradise_blue.png"
    },
    {
    label: "Fiddle Leaf Fig",
    source: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/flf_orange.glb",
    thumbnail: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/flf_orange.png"
    },
    {
    label: "Small Palm Tree",
    source: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/palm_green.glb",
    thumbnail: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/palm_green.png"
    }
    )
    ```

4. Set the *ItemsLabel* property to `"label"`.

5. Set the *ItemsSource* property to `"source"`.

6. Set the *ItemsThumbnail* property to `"thumbnail"`.

     :::image type="content" source="./media/augmented-view-mr/source-list.png" alt-text="A screenshot of View in MR control properties.":::

> [!NOTE]
> The *Items* property is set to your data source which can be a collection, from a connector, or a hardcoded table like in this example. The *ItemsSource*, *ItemsLabel*, and *ItemsThumbnail* properties are set to the column names of that data source within quotation marks.

7. Save and publish the app, then open it on your mobile device to try it out.

## How objects are scaled if you resize them

If you don't specify dimensions when you place a model, the **View in MR** control follows the dimensions given in the object file. You can resize the model by entering a value other than 0 in one or more of the control's width, height, and depth properties (**Object width**, **Object height**, and **Object depth**). How the model is scaled depends on how many dimensions you change.

- If all dimensions are *0* (the default), the model's size is left as it's set in the object file.  

- If one dimension is set, the model is scaled equally based on the changed dimension, similar to setting "keep aspect ratio" when you resize an image.

- If two dimensions are set, the model scales to the two given dimensions and an average of the first two.  
  For example, say you have a model that is 12 m high, 6 m wide, and 3 m deep. You set the **View in MR** control's properties as follows: **Object height**: **24**, **Object width**: **9**, **Object depth**: **0** (unchanged). The height increases by a factor of 2, and the width increases by a factor of 1.5. The increase in height and width is averaged to find the factor by which the depth should be increased: 2 + 1.5 = 3.5 / 2 = 1.75. The final dimensions of the model are **Object height** 24, **Object width** 9, and **Object depth** 5.25 (3 x 1.75).  

- If all three dimensions are set, the model's size is changed to what you specified.

> [!NOTE]
> If the measurements don't adhere to the original aspect ratio, the model could be squashed or distorted when it's viewed in MR.

## Properties

Change the **View in MR** button's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

:::image type="content" source="./media/augmented-view-mr/augmented-view-mr-properties.png" alt-text="A screenshot of a View in MR button under construction in Microsoft Power Apps Studio, shown alongside its properties.":::

| Property | Description | Type | Location |
| - | - | - | - |
| Text | Sets the button label text. | String | Properties; Advanced: **Text** |
| Alternative text | Specifies the text to be displayed if the model can't load or if the user hovers over the model. | String | Properties; Advanced: **AltText**|
| Display type | Determines whether the button label shows an icon of a cube, text, or both. | Drop-down selection | Properties; Advanced: **DisplayType** |
| [**Source**](mixed-reality-component-view-3d-store.md) | Identifies the data source (.glb, .stl, or .obj file) to display. | Not applicable | Properties; Advanced: **Source** |
| Sources List (Items) | Data source (table) that lists [multiple media files to view](#view-different-models-in-a-single-session) in a single mixed reality session. | Table | Properties; Advanced: **Items** |
| Object width | Sets the width of the model. | Integer | Properties; Advanced: **ObjectWidth** |
| Object height | Sets the height of the model. | Integer | Properties; Advanced: **ObjectHeight** |
| Object depth | Sets the depth of the model. | Integer | Properties; Advanced: **ObjectDepth** |
| Unit of measurement | Sets the measurement unit used for the model's width, height, and depth. | List | Properties; Advanced: **Units** |
| Enable shadows | Determines whether shadows are used to enhance the 3D effect when the model is shown. | Boolean | Properties; Advanced: **EnableShadows** |
| Enable marker detection | Determines whether marker detection will be used to determine model position and rotation. See [Use marker detection with mixed reality controls](./mixed-reality-marker-detection.md) | Boolean | Properties; Advanced: **EnableMarkerDetection** |
| Visible | Shows or hides the button. | Boolean | Properties; Advanced: **[Visible](./controls/properties-core.md)** |
| Position | Places the upper-left corner of the button at the screen coordinates specified in *x* and *y*. | Floating point number | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the button using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| Padding top | Sets the distance between the button label text and the top of the button. | Floating point number | Properties; Advanced: **[PaddingTop](./controls/properties-size-location.md)** |
| Padding bottom | Sets the distance between the button label text and the bottom of the button. | Floating point number | Properties; Advanced: **[PaddingBottom](./controls/properties-size-location.md)** |
| Padding left | Sets the distance between the button label text and the left edge of the button. | Floating point number | Properties; Advanced: **[PaddingLeft](./controls/properties-size-location.md)** |
| Padding right | Sets the distance between the button label text and the right edge of the button. | Floating point number | Properties; Advanced: **[PaddingRight](./controls/properties-size-location.md)** |
| Font | Sets the name of the family of fonts used for the button label text. | List | Properties; Advanced: **[Font](./controls/properties-text.md)** |
| Font size | Sets the size of the button label text. | Floating point number | Properties; Advanced: **[FontSize](./controls/properties-text.md)** |
| Font weight | Sets the weight of the button label text, either *Bold*, *Lighter*, *Normal*, or *Semibold*. | List | Properties; Advanced: **[FontWeight](./controls/properties-text.md)** |
| Text alignment | Sets the horizontal alignment of the label text in the button, either *Center*, *Justify*, *Left*, or *Right*. | Not applicable | Properties; Advanced: **[TextAlignment](./controls/properties-text.md)** |
| Vertical alignment | Sets the vertical alignment of the label text in the button, either *Bottom*, *Middle*, or *Top*. | List | Properties; Advanced: **[VerticalAlign](./controls/properties-text.md)** |
| Font style | Sets the style of the button label text, either *Italic*, *Underline*, *Strikethrough*, or none. | Not applicable | Properties; Advanced: **Italic**, **Underline**, **Strikethrough** |
| Border radius | Determines the corner radius of the button border. | Floating point number | Properties; Advanced: **BorderRadius** |
| **[Color](./controls/properties-color-border.md)** | Sets the colors of the button label text and the button background. | Not applicable | Properties; Advanced: **FillColor**, **TextColor** |
| Border | Determines the style, width, and color of the button border. | Not applicable | Properties; Advanced: **[BorderStyle](./controls/properties-color-border.md)**, **[BorderThickness](./controls/properties-color-border.md)**, **[BorderFillColor](./controls/properties-color-border.md)** |
| Disabled | Turns off the button but leaves it visible. | Boolean | Properties; Advanced: **Disabled** |
| Disabled color | Sets the colors of the button label text, the button background, and the button border if **[DisplayMode](./controls/properties-core.md)** is **Disabled**. | Not applicable | Properties; Advanced: **DisabledContentColor**, **DisabledFillColor**, **DisabledBorderColor** |
| Pressed color | Sets the colors of the button label text, the button background, and the button border when the user selects the button. | Not applicable | Properties; Advanced: **PressedContentColor**, **PressedFillColor**, **PressedBorderColor** |
| Hover color | Sets the colors of the button label text, the button background, and the button border when the user hovers the mouse pointer over it. | Not applicable | Properties; Advanced: **HoverContentColor**, **HoverFillColor**, **HoverBorderColor** |
| OnMixedRealitySelect | Behavior that is triggered when user selects the button to launch into the mixed reality experience. | Defined action | Advanced |
| OnChange | Behavior that is triggered when any property on the button is changed. | Defined action | Advanced |
| **[Tooltip](./controls/properties-core.md)** | Determines the text to display when the user hovers over the button. | String | Advanced |
| ContentLanguage | Determines the display language of the button label, if it's different from the language used in the app. | String | Advanced |
| **[DisplayMode](./controls/properties-core.md)** | Determines whether the button allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Enum | Advanced |
| **[TabIndex](./controls/properties-accessibility.md)** | Specifies the order the button is selected if the user navigates the app using the Tab key. | Integer | Properties; Advanced: **TabIndex** |

## Output properties

Your app can make use of more properties when a user interacts with the **View in MR** control. These are known as output properties. You can use output properties in other controls or to customize the app experience.

| Property | Description | Type |
| - | - | - |
| Photos | Collects the photos captured during the mixed reality session. You can [upload the mixed-reality photos to OneDrive and show them in a gallery](mixed-reality-take-upload-photos.md). | Not applicable |

## Other mixed reality controls

- View 3D content with the **[3D object](mixed-reality-component-view-3d.md)** control.
- Measure distance, area, and volume with the **[Measure in mixed reality](mixed-reality-component-measure-distance.md)** control.
- Create and view predefined 3D shapes with the **[View shape in mixed reality](mixed-reality-component-view-shape.md)** control
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

### See also

- [Create an app with 3D and mixed reality controls](how-to/build-view-in-mr-3d-apps.md)
- [Use marker detection with mixed reality controls](./mixed-reality-marker-detection.md)

---

## Use the Measuring Camera control in Power Apps

Source: [mixed-reality-component-measure-distance.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-component-measure-distance)

*Digitally measure distances, areas, and freeform shapes in the real world with augmented reality features in Power Apps.*

# Take measurements in mixed reality

Use the **Measuring camera** control in a canvas app to measure distance, area, and volume in the real world. You can also create two- and three-dimensional freeform shapes and see how they fit in a real-world space.

The **Measuring camera** control adds a button to your app. When a user selects the button, the app shows a live feed from the device camera. On-screen instructions direct the user to establish tracking by slowly panning the device from right to left across the surface to be measured. The user identifies a starting point and adds segments as needed until the measurement is complete. Dimensions of the measured space are overlaid on the camera feed.

The user can submit the measurements for capture in the control's **Measurements** output properties. The user can also take screenshots while a space is measured. The screenshots are captured in the control's **Photos** output property.

:::image type="content" source="./media/augmented-overview/measure-in-mixed-reality.png" alt-text="A photo of a phone screen that shows dimensions overlaid on a corner in a room that's under construction.":::

> [!TIP]
> The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.

## Add a **Measuring camera** button to an app screen

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Media**.
2. Select **Measuring camera** to place the control in the app screen, or drag the control to the screen to position it more precisely.

The control is a button that's labeled with an icon of a cube and the text *Measure*. Change the label and hide the icon if you like in the **Text** and **Display type** properties.

### Properties

Change the **Measuring camera** button's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

:::image type="content" source="./media/augmented-measure/augmented-measure-properties.png" alt-text="A screenshot of a Measuring Camera button under construction in Microsoft Power Apps Studio, shown alongside its properties.":::

| Property | Description | Type | Location |
| - | - | - | - |
| Text | Sets the button label text. | String | Properties; Advanced: **Text** |
| Display type | Determines whether the button label shows an icon of a cube, text, or both. | Dropdown list | Properties; Advanced: **DisplayType** |
| Unit of measurement | Sets the unit used for the dimensions. | Dropdown list | Properties; Advanced: **Units** |
| Measurement type | Determines the kind of measurement the user can make, either *Distance*, *Area*, or *Volume* (area plus height or depth). | Dropdown list | Properties; Advanced: **MeasurementType** |
| Box draw | Locks captured measurements to rectangular shapes. | Boolean | Properties; Advanced: **BoxDraw** |
| Enable Shadows | Determines whether shadows are used to enhance the 3D effect when a shape is drawn. | Boolean | Properties; Advanced: **EnableShadows** |
| Expected measurements (Items) | Identifies a [data source](./geospatial-map-excel.md) (**Items**) in the form of a table in an Excel workbook from which to get the measurements the user should capture. | Not applicable | Properties; Advanced: **Items** |
| Visible | Shows or hides the button. | Boolean | Properties; Advanced: **[Visible](./controls/properties-core.md)** |
 Position | Places the upper-left corner of the button at the screen coordinates specified in *x* and *y*. | Floating point number | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the button using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| Padding top | Sets the distance between the button label text and the top of the button. | Floating point number | Properties; Advanced: **[PaddingTop](./controls/properties-size-location.md)** |
| Padding bottom | Sets the distance between the button label text and the bottom of the button. | Floating point number | Properties; Advanced: **[PaddingBottom](./controls/properties-size-location.md)** |
| Padding left | Sets the distance between the button label text and the left edge of the button. | Floating point number | Properties; Advanced: **[PaddingLeft](./controls/properties-size-location.md)** |
| Padding right | Sets the distance between the button label text and the right edge of the button. | Floating point number | Properties; Advanced: **[PaddingRight](./controls/properties-size-location.md)** |
| Font | Sets the name of the family of fonts used for the button label text. | Dropdown list | Properties; Advanced: **[Font](./controls/properties-text.md)** |
| Font size | Sets the size of the button label text. | Floating point number | Properties; Advanced: **[FontSize](./controls/properties-text.md)** |
| Font weight | Sets the weight of the button label text, either *Bold*, *Lighter*, *Normal*, or *Semibold*. | Dropdown list | Properties; Advanced: **[FontWeight](./controls/properties-text.md)** |
| Text alignment | Sets the horizontal alignment of the label text in the button, either *Center*, *Justify*, *Left*, or *Right*. | Not applicable | Properties; Advanced: **[TextAlignment](./controls/properties-text.md)** |
| Vertical alignment | Sets the vertical alignment of the label text in the button, either *Bottom*, *Middle*, or *Top*. | Dropdown list | Properties; Advanced: **[VerticalAlign](./controls/properties-text.md)** |
| Font style | Sets the style of the button label text, either *Italic*, *Underline*, *Strikethrough*, or none. | Not applicable | Properties; Advanced: **Italic**, **Underline**, **Strikethrough** |
| Border radius | Determines the corner radius of the button border. | Floating point number | Properties; Advanced: **BorderRadius** |
| [Color](./controls/properties-color-border.md) | Sets the colors of the button label text and the button background. | Not applicable | Properties; Advanced: **FillColor**, **TextColor** |
| Border | Determines the style, width, and color of the button border. | Not applicable | Properties; Advanced: **[BorderStyle](./controls/properties-color-border.md)**, **[BorderThickness](./controls/properties-color-border.md)**, **[BorderFillColor](./controls/properties-color-border.md)** |
| Disabled | Turns off the button but leaves it visible. | Boolean | Properties; Advanced: **Disabled** |
| Disabled color | Sets the colors of the button label text, the button background, and the button border if **[DisplayMode](./controls/properties-core.md)** is **Disabled**. | Not applicable | Properties; Advanced: **DisabledContentColor**, **DisabledFillColor**, **DisabledBorderColor** |
| Pressed color | Sets the colors of the button label text, the button background, and the button border when the user selects the button. | Not applicable | Properties; Advanced: **PressedContentColor**, **PressedFillColor**, **PressedBorderColor** |
| Hover color | Sets the colors of the button label text, the button background, and the button border when the user hovers the mouse pointer over it. | Not applicable | Properties; Advanced: **HoverContentColor**, **HoverFillColor**, **HoverBorderColor** |
| OnMixedRealitySelect | Contains code that runs when the user exits the measurement screen with new results. | Event | Advanced |
| OnChange | Contains code that runs when a button property is changed. | Event | Advanced |
| OnSelect | Contains code that runs when the user selects the button. | Event | Advanced |
| ItemsLabels  | Identifies the column in **Items** that contains the labels for the measurements users should capture. | ColumnName | Advanced |
| ItemsMeasurementType  | (Optional) Identifies the column in **Items** that contains a string  (*Distance*, *Area*, *Volume*, or *Freeform*) that specifies the type of measurement users should capture. | ColumnName | Advanced; see **MeasurementType** |
| ItemsBoxDraw | (Optional) Identifies the column in **Items** that contains a string (*True* or *False*) that locks measurements to rectangular shapes.  | ColumnName | Advanced; see **BoxDraw** |
| [Tooltip](./controls/properties-core.md) | Determines the text to display when the user hovers over a visual. | String | Advanced |
| ContentLanguage | Determines the display language of the control, if it's different from the language used in the app. | String | Advanced |
| [DisplayMode](./controls/properties-core.md) |  Determines whether the control allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Enum | Advanced |
| [TabIndex](./controls/properties-accessibility.md) | Specifies the order the control is selected if the user navigates the app using the Tab key. | Integer | Properties; Advanced: **Tab index** |

### Output properties

Your app can make use of more properties when a user interacts with the **View in MR** control. These are known as output properties. You can use these properties in other controls or to customize the app experience.

| Property | Description |
| - | - |
| Photos | Captures, in a collection, information about photos the user takes while a space is measured. Use the collection to [upload mixed-reality photos to OneDrive and show them in a gallery](mixed-reality-take-upload-photos.md). |
| Measurements | Captures, in a table, the measured distances, volumes, and areas. |
| Segments | Captures, in a table, information about segments in a measured object. |


 The Measurements table has the following columns:

- **Label:** A string that identifies the measurement
- **Id:** A number that uniquely identifies the measurement
- **Units:** A string that identifies the unit of the measurement
- **Height:** A number that represents the height of the measured volume (0 if a 2D area was measured)
- **Length:** A number that represents the total length of the measured perimeter or path
- **BoundingWidth:** A number that represents the minimum width that bounds the shape
- **BoundingDepth:** A number that represents the minimum depth that bounds the shape  
- **Area:** A number that represents the estimated area of the measured shape in units squared
- **Volume:** A number that represents the estimated volume of the measured shape in units cubed
  
The Segments table has the following columns:

- **Length:** A number that represents the total distance of a segment in the specified units
- **DirectionX:** A number that represents the X direction of the segment in world (3D) space
- **DirectionY:** A number that represents the Y direction of the segment in world(3D) space (typically 0)
- **DirectionZ:** A number that represents the Z direction of the segment in world (3D) space

Learn more about how to use output properties of the **Measuring camera** control in your apps: [Validate measurements in mixed reality using a spatial test filter](./mixed-reality-spatial-test.md)

## Other mixed reality controls

- View 3D content with the **[3D object](mixed-reality-component-view-3d.md)** control.
- View images and 3D content in the real world with the **[View in mixed reality](mixed-reality-component-view-mr.md)** control.
- Create and view predefined 3D shapes with the **[View shape in mixed reality](mixed-reality-component-view-shape.md)** control
- Paint 3D lines or draw 3D arrows to specify an area or asset in your environment with the **[Markup in MR](markup-in-mixed-reality.md)** control.

### See also

[Create an app using the Measuring Camera control](how-to/build-apps-measure-in-mr.md)

---

## Test whether an object will fit in a space using mixed reality

Source: [mixed-reality-spatial-test.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-spatial-test)

*Use mixed-reality controls in a canvas app to test whether objects of a given size will fit in a measured space.*

# Test whether an object will fit in a space using mixed reality

You can use the [Measuring Camera](mixed-reality-component-measure-distance.md) control to determine whether an object of a known size will fit in a particular space. In this article, we'll create a canvas app to do just that.

> [!TIP]
> The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.

## Add minimum dimensions input fields to a canvas app

First, we’ll create a blank canvas app. Then we'll add a way for the user to enter the minimum dimensions to test against (that is, the smallest space that will hold the object we want to fit).

1. [Create a blank canvas app](./create-blank-app.md).

2. Select the **Insert** tab. Insert and place three **Text label** controls on the screen.

3. Change the **Text** property of the labels to **Minimum Width**, **Minimum Depth**, and **Minimum Height**, respectively.

    :::image type="content" source="media/augmented-measure-fit-test/fit-test-labels.png" alt-text="A screenshot of a text label under construction in Microsoft Power Apps Studio, shown alongside its properties.":::

4. Select the **Insert** tab. Insert three **Text Input** controls, and place them to the right of the three labels.

5. Rename the text input controls to **minWidth**, **minDepth**, and **minHeight**, respectively.

    :::image type="content" source="media/augmented-measure-fit-test/fit-test-rename-text-input.png" alt-text="A screenshot of a text input control under construction in Microsoft Power Apps Studio, shown alongside its properties.":::

6. Select all three text input controls. Change the group's **Format** property to **Number** and set the **Default** property to **1.0**.

    :::image type="content" source="media/augmented-measure-fit-test/fit-test-default-text-input.png" alt-text="A screenshot of three text input controls under construction in Microsoft Power Apps Studio, shown alongside the properties of the selected group.":::

## Add and bind the **Measuring camera** control

Next, we’ll add the **Measuring camera** control to allow the user to measure a three-dimensional space. We'll bind the measurements to a data table for later use.

1. Select the **Insert** tab, and expand **Media**.

2. Select **Measuring camera** to place the control in the app screen. Drag the control near the bottom of the screen.

3. Change the control's properties as follows:

    | Property name | Value | Where |
    | - | - | - |
    | Unit of measurement | Feet or Meters | Select on the **Properties** tab |
    | Measurement type | Volume | Select on the **Properties** tab |
    | Box draw | On | Select on the **Properties** tab |
    | Items | **Table({label:"Test Volume"})** | Enter on the **Advanced** tab |
    | ItemsLabels | **"label"** | Enter on the **Advanced** tab |
    | OnMixedRealitySelect | **Set(testVolume, LookUp(MeasureInMR1.Measurements, Label = "Test Volume"));** | Enter on the **Advanced** tab |

The **Items**, **ItemsLabels**, and **OnMixedRealitySelect** properties of the **Measuring camera** control should look like the following examples when you're done:

:::image type="content" source="media/augmented-measure-fit-test/fit-test-advanced-properties-items.png" alt-text="A screenshot of a Measure in 3D control under construction in Microsoft Power Apps Studio, shown alongside its Items and ItemsLabels properties.":::

:::image type="content" source="media/augmented-measure-fit-test/fit-test-advanced-properties-onmixedrealityselect.png" alt-text="A screenshot of a Measure in 3D control under construction in Microsoft Power Apps Studio, shown alongside its OnMixedRealitySelect property.":::

The formula in **Items** captures the dimensions of the measured space in a data table named "Test Volume." The formula in **OnMixedRealitySelect** sets a variable named "testVolume" to the values captured in the "Test Volume" table.

## Display the results

Finally, we'll add text labels to display the measurements that were taken and the result of the test (that is, whether the object will fit in the measured space).

1. Select the **Insert** tab. Insert and place four **Text label** controls on the screen.

2. Change the **Text** property of the label controls as follows. (Hint: Copy each formula and paste it in the formula bar or on the **Advanced** properties tab, whichever you prefer.)

    - First label:

        ```power-fx
            If(IsBlankOrError(testVolume), "No Measurement captured",
                If(testVolume.Height >= Value(minHeight.Text) &&
                ((testVolume.BoundingWidth >= Value(minWidth.Text) && testVolume.BoundingDepth >= Value(minDepth.Text)) ||
                (testVolume.BoundingWidth >= Value(minDepth.Text) && testVolume.BoundingDepth >= Value(minWidth.Text))),
                "Fit Test Succeeded", "Fit Test Failed"))
        ```

        This formula sets the label text according to whether the test succeeded or failed, based on the minimum dimensions required to hold the object we want to fit. If the test didn't run, either because no measurements were captured or an error occurred, the label text reflects that.

        :::image type="content" source="media/augmented-measure-fit-test/fit-test-output-label.png" alt-text="A screenshot of a text label control under construction in Microsoft Power Apps Studio, shown with its Text property in the formula bar and advanced properties tab.":::

    - Second label:

        ```power-fx
            Concatenate("Bounding Width: ", Text(testVolume.BoundingWidth))
        ```

        This formula sets the label text to "Bounding Width:" followed by the width dimension of the measured space.

    - Third label:

        ```power-fx
            Concatenate("Bounding Depth: ", Text(testVolume.BoundingDepth))
        ```

        This formula sets the label text to "Bounding Depth: " followed by the depth dimension of the measured space.

    - Fourth label:

        ```power-fx
            Concatenate("Bounding Height: ", Text(testVolume.Height))
        ```

        This formula sets the label text to "Bounding Height: " followed by the height dimension of the measured space.

The app screen should now look like this:

:::image type="content" source="media/augmented-measure-fit-test/fit-test-completed-app.png" alt-text="A screenshot of the final app screen.":::

## Test the app

Select the preview button to run the app in preview mode. Select **Measuring camera** to populate the labels with data. To verify that the label bindings are working, enter new values in the text input fields.

:::image type="content" source="media/augmented-measure-fit-test/fit-test-succeeded.png" alt-text="A screenshot of the app screen in preview mode after new minimum dimensions have been entered.":::

The values for **Bounding Width** and **Bounding Depth** can be swapped when you perform the test.

[Save and publish](save-publish-app.md) your app. Open it on a mixed-reality–enabled device to test whether an object with the specified dimensions will fit within the bounds of any measurement captured.

## Filtering a data source


The app we created tests a single set of dimensions that are specified by the user when the app runs. However, you can extend it to test against any data source by applying the formula as a **Filter** predicate.

For example, let's say that our app contains a reference to a Dataverse table named **Products** that includes three columns: **Width**, **Depth**, and **Height** (corresponding to each product's dimensions). To filter the collection to show only the measurements that would fit in a measured volume, we can apply the following formula.

```power-fx
    If(IsBlankOrError(testVolume), Products,
    Filter(Products, testVolume.Height >= Height &&
        ((testVolume.BoundingWidth >= Width && testVolume.BoundingDepth >= Depth) ||
        (testVolume.BoundingWidth >= Depth && testVolume.BoundingDepth >= Width))))
```

### See also

- [3D object control](mixed-reality-component-view-3d.md)
- [Measuring Camera control](mixed-reality-component-measure-distance.md)
- [View shape in MR control](mixed-reality-component-view-shape.md)

---

## Use the Measure in MR control to take measurements

Source: [measure-your-space-in-mixed-reality.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/measure-your-space-in-mixed-reality)

*Use the Measure in MR control to take measurements using your device's camera.*

# Use the Measure in MR control to take measurements

Measure the distance, area, and volume of your physical space using your device camera.

To use the measurement feature, your app maker needs to enable the [Measure in MR](mixed-reality-component-measure-distance.md) control for your canvas app. Depending on how your app maker has configured the app, the type of measurements can vary as shown in the example below.

   > [!div class="mx-imgBorder"]
   > ![Enter measurements](./media/mr-measurement/measurement-inputs-5.png)

## Basic navigation

It's easy to get around and take measurements of your space. The following illustration shows the primary navigation elements.

   > [!div class="mx-imgBorder"]
   > ![Image that shows the screen where you can take measurements.](./media/mr-measurement/measurement-legend.png)

Legend

1. **Camera**: Take a picture of your current view. The picture can be used by your
canvas app but isn't viewable when you're in a mixed reality experience.
1. **Undo**: Rewinds the last measurement action taken and returns to the state before the last add, reset, or delete.
1. **Add**: Select to start a new measurement or add a new measurement point. When you're done measuring the button changes to a checkmark button that you select to complete your measurement.
1. **Overview**: Opens a list with details of the items you have measured.
1. **Submit**: When you're done taking your measurement(s), use the Submit button to close the mixed reality experience and send the measurement(s) to your canvas app. The button is grayed out if there are no measurements or when you're in the process of taking measurements.
1. **Overview**: Opens a list with details of the items you have measured.
1. **Reset**: Clear all your measurements at once.
1. **Exit**: Leave the mixed reality experience and return to your canvas app.

## Take a measurement

1. Open your canvas app and select the **Measure in MR** button.

2. Follow the instructions on the screen by moving your device until it vibrates, and white dots appear. The white dot with a circle is the starting point of your measurement.

    ![Start a measurement.](./media/mr-measurement/measurement-in-mr-final.gif)

3. Select ![Add button](./media/mr-measurement/add-button-8.png) to start a new measurement. Then follow these steps depending on the type of measurement you're taking:

   - **Distance**
     1. Select ![Add button](./media/mr-measurement/add-button-8.png) and then slowly move the dot to where you want the measurement to end.
     1. Select the checkmark button to finish the measurement.

        > [!div class="mx-imgBorder"]
        > ![Measure wall distance.](./media/mr-measurement/distance-9.png)

     1. Continue taking measurements, or select **Submit** to save your final measurements and return to your canvas app.
         > [!div class="mx-imgBorder"]
         > ![Submit measurement of desk area](./media/mr-measurement/distance-final-measurement-10.png)

   - **Area**
      1. Select ![Add button](./media/mr-measurement/add-button-8.png) to add points and outline the area that you want to measure.
         > [!div class="mx-imgBorder"]
         > ![Measure desk area](./media/mr-measurement/area-choose-points-12.png)

      2. Connect the last dot to the first dot to complete the measurement. When you're done, select the checkmark button.
         > [!div class="mx-imgBorder"]
         > ![Connect the last dot to the first dot.](./media/mr-measurement/area-endpoint-13.png)

      3. Continue taking measurements, or select **Submit** to save your final measurements and return to your canvas app.
         > [!div class="mx-imgBorder"]
         > ![Continue or submit measurement.](./media/mr-measurement/area-final-measurement-14.png)

   - **Volume**
      1. Select ![Add button](./media/mr-measurement/add-button-8.png) to add points and outline the base of the volume that you want to measure.
         > [!div class="mx-imgBorder"]
         > ![Add point to outline the base of the volume.](./media/mr-measurement/volume-add-points-15.png)

      1. Connect the last dot to the first dot to complete the measurement.
         > [!div class="mx-imgBorder"]
         > ![Connect the volume measurement.](./media/mr-measurement/volume-complete-measurement-16.png)

      1. Move your device upwards and select the desired height and then select the checkmark button.
         > [!div class="mx-imgBorder"]
         > ![Move your device upwards to complete the objects height.](./media/mr-measurement/volume-upwards-17.png)

      1. Continue taking measurements, or select **Submit** to save your final measurements and return to your canvas app.
          > [!div class="mx-imgBorder"]
          > ![Continue taking volume measurements or submit the measurements.](./media/mr-measurement/area-submint-18.png)  

          > [!NOTE]
          > If your app has **Box Draw** enabled then you can only measure volume by a rectangular prism. To take this measurement select four points; three to draw the base and one for the height.<br><br>
            ![Measure four points.](./media/mr-measurement/measure-four-points.png)

   - **Freeform**
       1. Select ![Add button](./media/mr-measurement/add-button-8.png) to measure distance, multi-segment, area, and volume all together.
       1. Connect the last dot to the first dot to complete the measurement.
          > [!div class="mx-imgBorder"]
          > ![Freeform measurement.](./media/mr-measurement/measure-freeform.png)  

       1. Keep the dot at the last point and tap the green checkmark to finish your current measurement. Continue taking other measurements, or if you are done, select **Submit** to return to your canvas app.
          > [!div class="mx-imgBorder"]
          > ![Continue taking freeform measurements or submit the measurements.](./media/mr-measurement/measure-form-submint.png)  

          The same rectangle can be part of a volume measurement. Instead of selecting the last point you added, rotate your phone upwards to select a height and then  tap the green checkmark. Continue taking other measurements, or if you are done, select **Submit** to return to your canvas app.
           > [!div class="mx-imgBorder"]
           > ![Measure rectangle freeform.](./media/mr-measurement/rectangle-freeform.png)

> [!NOTE]
> If your app has **Box Draw** enabled, then in freeform you can only measure in a rectangular area and volume.

 track of your measurements

When you take measurements, you can always go back and review your measurements.

1. At the top select the measurement overview or select the overview button.

   > [!div class="mx-imgBorder"]
   > ![Choose the item you want to measure.](./media/mr-measurement/measure-4.png)

2. If your app maker has given you specific measurements to take, you can see their types here, beneath their label. Select the arrow next to measurement to view more details.

   > [!div class="mx-imgBorder"]
   > ![Review measurements.](./media/mr-measurement/review-measurements.png)

3. On the **Measurement Inputs** screen, you can do the following:

    - Select an incompleted measurement to measure it immediately.

    - Select the delete button to clear or remove a measurement.

    - Select the close button or overview button to continue measuring where you left off.
     > [!div class="mx-imgBorder"]
     > ![Review your measurements.](./media/mr-measurement/measurement-input.png)

---

## Take screenshots of 3D objects in mixed reality

Source: [mixed-reality-take-upload-photos.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-take-upload-photos)

*Take photos of 3D objects in the real world with augmented reality features in Power Apps.*

# Take and upload mixed-reality photos

In this article, we'll create an app that can take photos of a mixed-reality session and upload them to a folder on OneDrive. We'll use the **View in MR** control in this example, but the **View shape in MR** and **Measuring camera** controls would work as well.

We'll cover the following tasks:

- Adding a **3D object** control to view and manipulate a sample 3D object
- Connecting the **3D object** control to a **View in MR** control to view the 3D object in the real world
- Adding a gallery control to view photos taken with the **View in MR** control
- Uploading the photos to OneDrive with a Microsoft Power Automate flow
- Uploading photos captured in mixed-reality to Dataverse

## Prerequisites

- [Create a blank canvas app](./create-blank-app.md).
- Create a folder called **MRPhotos** on OneDrive. You'll use this folder to store your uploaded photos.

>[!TIP]
>The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.

## Add a button to take a photo of a 3D object in mixed reality

This example has three parts. First, we'll add a button that lets users take a photo of a 3D object in a mixed reality experience.

### Insert a **3D object** control

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Media**.
1. Select **3D object** to place a 3D object on the app screen. Drag the control to the screen to position it more precisely.

    The control comes with a transparent cube shape. If you like, change the control's **Source** property to [load a different 3D model](mixed-reality-component-view-3d-store.md). In this example, we'll use the URL *<https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/robot_arm.glb>*.

    :::image type="content" source="./media/augmented-upload-photo/augmented-view-3d-shape.png" alt-text="A screenshot of a 3D object control under construction in Microsoft Power Apps Studio, shown with its Source property.":::

### Insert and connect a **View in MR** control

1. Open the **Insert** tab and expand **Mixed Reality**.
1. Select **View in MR** to place the control on the app screen, or drag the control to the screen to position it more precisely.
1. Change the control's **Source** property to **3DObject1.Source**. (*3DObject1* is the name of the **3D object** control we added earlier.) This expression directs the **View in MR** control to overlay the 3D model on the device camera feed.

   :::image type="content" source="./media/augmented-upload-photo/augmented-view-mr.png" alt-text="A screenshot of a View in MR control under construction in Microsoft Power Apps Studio, shown with its Source property.":::

1. [Save and publish the app](save-publish-app.md) and [run it on your mobile device](../../mobile/run-powerapps-on-mobile.md).

1. Select **View in MR** to view the 3D object in mixed reality. Select the camera icon to take a photo of the MR view.

## Insert a gallery control to view photos taken in the app

Next, we'll add a gallery so users can view the photos they've taken.

1. Edit your app again. Open the **Insert** tab and place a **Vertical gallery** control on the screen.
1. Change the control's **Items** property to **ViewInMR1.Photos**. (*ViewInMR1* is the name of the **View in MR** control we added earlier.)
1. Optionally, change the gallery's **Layout** property to **Image and title**.

    :::image type="content" source="./media/augmented-upload-photo/augmented-view-gallery.png" alt-text="A screenshot of a vertical gallery under construction in Microsoft Power Apps Studio, shown with its Items and Layout properties.":::

1. Preview the app and select **View in MR** to generate a sample photo.
    The gallery populates with a sample picture.

    :::image type="content" source="./media/augmented-upload-photo/gallery-example.png" alt-text="A screenshot of a canvas app that shows a 3D model and a photo of the model in a gallery.":::

>[!NOTE]
>If users exit the MR view to see the gallery, then enter the MR view again and take more photos, the new photos will replace the ones they took earlier.

### Add a larger overlay to the thumbnail images in the gallery

To make the photos in the gallery easier to see, you can add a full-size overlay that appears when the user selects a thumbnail image.

1. Edit your app again. Open the **Insert** tab and expand **Media**.
1. Select **Image** to place an image control on the screen. Move and size it according to how you want the larger photo to appear when a thumbnail image is selected.

    :::image type="content" source="./media/augmented-upload-photo/insert-pop-up.png" alt-text="A screenshot of an image control under construction in Microsoft Power Apps Studio.":::

1. Change the image control's properties as follows:
    | Property | Value |
    | - | - |
    | **OnSelect** | **UpdateContext({vVisibleImageZoom:false})** |
    | **Image** | **Gallery1.Selected.Image2** (assuming the gallery control is *Gallery1* and the first thumbnail image is *Image2*)
    | **Visible** | **vVisibleImageZoom**

1. Select the first thumbnail image in the gallery control. Change its **OnSelect** property to **UpdateContext({vVisibleImageZoom:true})**.

    :::image type="content" source="./media/augmented-upload-photo/set-gallery-onselect.png" alt-text="A screenshot of a thumbnail image in a gallery in Microsoft Power Apps Studio, shown with its OnSelect property.":::

1. [Save and publish the app](save-publish-app.md) and [run it on your mobile device](../../mobile/run-powerapps-on-mobile.md).
1. Select **View in MR**, and then select the camera icon to take a photo. Select the back arrow at the top of the screen to exit the MR view.
1. Select the thumbnail in the gallery to show a larger version of the photo. Select the image to hide it.

## Upload photos to OneDrive with a Power Automate flow

Last, we'll create a workflow using the Power Automate pane. The workflow uploads photos from the app to a folder named **MRPhotos** on OneDrive.

### Create a flow in Power Automate

1. Edit your app. On the app authoring menu, select **Power Automate** > **Create new flow**.

1. Search for and select the Power Apps button template.

    :::image type="content" source="./media/augmented-upload-photo/create-power-apps-button.png" alt-text="A screenshot of the Power Automate template page, with the Power Apps button template selected.":::
    
1. In the **Create your flow** window, select **Edit in advanced mode**.    

1. Select **Power Apps button** at the top of the window and enter a new name for your flow. In this example, we'll name the flow *Upload MR Photo*.

    :::image type="content" source="./media/augmented-upload-photo/rename-flow.png" alt-text="A screenshot of the Power Automate edit window, with the workflow name highlighted.":::

1. Select Power Apps button at the top of the window and enter a new name for your flow. In this example, we'll name the flow Upload MR Photo.

    :::image type="content" source="./media/augmented-upload-photo/rename-flow-delete-trigger.png" alt-text="A screenshot of the Power Automate edit window, with the PowerApps step selected for deletion.":::

1. Search for **PowerApps (V2)** and select the PowerApps (V2) trigger.

    :::image type="content" source="./media/augmented-upload-photo/select-powerapps-v2-trigger.png" alt-text="A screenshot of the Power Automate edit window, with the PowerApps (v2) trigger selected.":::

1. Select **Add an input**, and then select **File**.
1. Change the label *File Content* to **Image**.

    :::image type="content" source="./media/augmented-upload-photo/trigger-inputs.png" alt-text="A screenshot of the Power Automate edit window, with the File input label changed to Image.":::

1. Select **New step**. Search for **OneDrive Create file** and select the **Create file** action.

    :::image type="content" source="./media/augmented-upload-photo/onedrive-create-file-action.png" alt-text="A screenshot of the Power Automate edit window, with the OneDrive Create file action selected.":::

1. In **Folder Path**, select the folder icon and navigate to the **MRPhotos** folder you created earlier.
1. In **File Name**, enter **@{triggerBody()?['file']?['name']}** (Your text changes to "file.name.")
1. In **File Content**, enter **@{triggerBody()['file']['contentBytes']}** (Your text changes to "Image.")
1. Save your flow.

The complete flow should look like this:

:::image type="content" source="./media/augmented-upload-photo/flow-complete.png" alt-text="A screenshot of the Power Automate edit window, with the completed workflow shown.":::

### Connect the workflow to a button in your app

1. Return to your app in Power Apps Studio. Your flow is now listed under **Available flows**.

    :::image type="content" source="./media/augmented-upload-photo/flow-data-pane.png" alt-text="A screenshot of the Power Apps Studio Data pane, with the new flow shown.":::

1. Open the **Insert** tab and select **Button**. Place the button control on the screen and resize it as needed.
1. Change the button control's **Text** property to **Upload photos**.
1. In the formula bar at the top of the Power Apps window, select the **OnSelect** property. Select **Action** > **Power Automate** > **Upload MR Photo**.

    :::image type="content" source="./media/augmented-upload-photo/add-flow-to-button.png" alt-text="A screenshot of a button control under construction in Power Apps Studio, with a flow added to the control's OnSelect property.":::

    The button control's **OnSelect** property changes to **UploadMRPhoto.Run(**.

1. To upload the last photo taken, paste the following code after the opening parenthesis: **{file:{name:GUID() & ".png", contentBytes:Last(ViewInMR1.Photos).ImageURI}})**

    :::image type="content" source="./media/augmented-upload-photo/button-upload-code.png" alt-text="A screenshot of a button control's OnSelect property in the Power Apps Studio formula bar, which uploads the last photo taken.":::

    If you placed the button control inside the gallery, paste the following code instead: **{file: {name:GUID() & ".png", contentBytes:ThisItem.ImageURI}})**

    :::image type="content" source="./media/augmented-upload-photo/button-upload-code-gallery.png" alt-text="A screenshot of a button control's OnSelect property in the Power Apps Studio formula bar, when the button is in a gallery.":::

    To make the button upload all the photos taken, delete **UploadMRPhoto.Run(** and paste the following code: **ForAll(ViewInMR1.Photos, UploadMRPhoto.Run({file:{name:GUID() & ".png", contentBytes:ImageURI}}))**

    :::image type="content" source="./media/augmented-upload-photo/button-upload-code-all.png" alt-text="A screenshot of a button control's OnSelect property in the Power Apps Studio formula bar, which uploads all photos taken.":::

1. Preview the app and select **View in MR**, and then select **Upload photos**. Check the **MRPhotos** folder on OneDrive and confirm that the sample photo has been uploaded.

### Add offline capability to your app

You can use your app even when you have limited or no network connectivity using the [**SaveData** and **LoadData** functions](./functions/function-savedata-loaddata.md).

## Upload photos captured in mixed-reality to Dataverse

You can add photos to Dataverse tables through an Image data type column. Image columns in Dataverse have two required fields - Full and Value - which can be set to the ImageURI output of the MR controls.

For example, if you wanted to upload the first photo captured by the Markup in MR control to a Dataverse column called Image:

```power-fx
    Image: {Full: First(MarkupInMR.Photos).ImageURI, Value: First(MarkupInMR.Photos).ImageURI}
```

### See also

- [3D object control](mixed-reality-component-view-3d.md)
- [Measuring Camera control](mixed-reality-component-measure-distance.md)
- [View shape in MR control](mixed-reality-component-view-shape.md)

---

## Load 3D models from CGTrader into mixed reality controls (preview)

Source: [mixed-reality-cgtrader.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-cgtrader)

*Add 3D models from CGTrader into mixed reality controls in your canvas apps.*

# Load 3D models from CGTrader into mixed reality controls (preview)

[This article is pre-release documentation and is subject to change.]

>[!IMPORTANT]
>This is a preview feature.
>Preview features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

Want to build apps with mixed-reality 3D content without having to create your own 3D models? Use the [CGTrader connector](/connectors/cgtrader/) to import 3D content from CGTrader into your canvas apps. CGTrader offers a library of thousands of free and premium 3D models. Browse and load models inside your app, and then use them with the [3D object](mixed-reality-component-view-3d.md) and [View in MR](mixed-reality-component-view-mr.md) controls.

The connector provides a no-code replacement for working with the CGTrader API. Using [*actions*](/connectors/connectors#actions), apps send requests to the CGTrader API and fetch model data. For more information, see the [Connectors overview](/connectors/custom-connectors/use-custom-connector-powerapps).

## Prerequisites

Request an API key (OAuth client ID and client secret) at https://www.cgtrader.com/developers. Be sure to store your API key in a secure location.

## Create a CGTrader connection

You'll need to create a CGTrader connection in Power Apps after you receive your API key. In this example, we'll create a connection on the Power Apps home page. You can also create a connection when you're editing an app in Power Apps Studio.

>[!TIP]
>A connection is an instance of a connector. You can create multiple connections with different configurations.

1. Sign in to [Power Apps](https://make.powerapps.com/).
1. In the navigation bar, select **Data** > **Connections** > **New connection**.

    :::image type="content" source="./media/augmented/mixed-reality-connector-create.png" alt-text="A screenshot of the Power Apps data connections window.":::

1. Search for and select **CGTrader (preview)**.

    :::image type="content" source="./media/augmented/mixed-reality-connector-search.png" alt-text="A screenshot of the Power Apps connections search result with CGTrader selected.":::

1. Enter the **Client ID** and **Client Secret** you received from CGTrader.

    :::image type="content" source="./media/augmented/mixed-reality-connector-key.png" alt-text="A screenshot of the CGTrader connector account window.":::

A CGTrader connection is now listed on the **Connections** page.

## Add a CGTrader connection to your canvas app

1. [Edit](./edit-app.md) or create a [canvas app](./create-blank-app.md).

1. In the navigation bar, select **Data** > **Add data**. Search for and select **CGTrader**.

    :::image type="content" source="media/augmented/mixed-reality-connector-data-source.png" alt-text="A screenshot of the Microsoft Power Apps Studio data source panel, with a search for CGTrader shown.":::

1. Select the connection you created earlier.

## Load CGTrader models directly into 3D object or View in MR controls

1. Find and select a model on the [CGTrader website](https://www.cgtrader.com/).
1. Note the supported file types and Model ID.

    :::image type="content" source="./media/augmented/mixed-reality-connector-model-id.png" alt-text="A screenshot of the file types and Model ID of a 3D object on CGTrader.com.":::

1. In Power Apps Studio, add a [**3D object**](./mixed-reality-component-view-3d.md) or [**View in MR**](./mixed-reality-component-view-mr.md) control to the app screen.
1. Set the control's **Source** property to **CGTrader.GetModel(*model_id*, "*file_type*")**, where *model_id* is the ID of the model you selected, and *file_type* is one of the supported file types.

    :::image type="content" source="./media/augmented/mixed-reality-connector-example.png" alt-text="A screenshot of a 3D object control under construction in Microsoft Power Apps Studio, shown with its Source property set to a CGTrader model.":::

## Connector actions

The following table lists the most common CGTrader connector actions and examples. For a list of all connector actions, their parameters, and return types, see the [CGTrader connector reference](/connectors/cgtrader/#actions).

| Action | Description | Example |
|-|-|-|
| **[GetModel](/connectors/cgtrader/#downloads-a-model-with-the-given-id-and-file-type.)** | Downloads a 3D object with the given Model ID and file type. | **CGTrader.GetModel(*model_id*, *"file_type"*)** |
| **[GetModelInfo](/connectors/cgtrader/#gets-the-info-of-a-model-with-the-given-id.)** | Gets information about a 3D object with the given Model ID. | **CGTrader.GetModelInfo(*model_id*)** |
| **[SearchModels](/connectors/cgtrader/#searches-for-models-from-cgtrader-based-on-the-given-filters.)** | Searches for models from CGTrader based on the given filters. Consider binding this action to the items in a gallery. | **CGTrader.SearchModels({keywords:"*keywords*",extensions:"*file_types*"}).Models** |
| **[GetCategories](/connectors/cgtrader/#gets-the-available-category-names-and-ids.)** | Gets available category names and Model IDs. | **CGTrader.GetCategories()** |

### See also

- [View 3D content in canvas apps](mixed-reality-component-view-3d.md)
- [View 3D content or images in the real world](mixed-reality-component-view-mr.md)

---

## Use the Markup in MR control in Power Apps

Source: [markup-in-mixed-reality.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/markup-in-mixed-reality)

*Paint lines in 3D or draw 3D arrows with augmented reality features in Power Apps.*

# Use the Markup in MR control in Power Apps (preview)

[This article is pre-release documentation and is subject to change.]

>[!IMPORTANT]
>This is a preview feature.
>Preview features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

Add the **Markup in MR** control in your app to allow users to add markups to visually specify an area or a particular asset in their environment.
Users can instantly place mixed reality markups such as arrows, add drawings, and then take photos of the marked-up object.

The **Markup in MR** control creates a **Markup in MR** button in your mixed reality app. When a user selects the **Markup in MR** button, it shows a live camera feed of the device. A user can identify points of interest to begin inking or adding arrows directly on the object.

Ink and arrows will scale appropriately depending on the distance from the objects. When you exit the **Markup in MR** screen screenshots are captured in the control's **Photos** output property.

> [!TIP]
> The mixed-reality (MR) controls work best in well-lit environments with flat-textured surfaces. Tracking is better on LIDAR-enabled devices.

> [!TIP]
> The MR controls in Power Apps use Babylon and Babylon React Native. Mixed reality content that works in the [Babylon sandbox](https://sandbox.babylonjs.com/) should work in Power Apps through this shared MR platform. If your content works in Babylon but not in Power Apps, ask a question in the [Power Apps Community Forum](https://powerusers.microsoft.com/t5/Get-Help-with-Power-Apps/ct-p/PA_General). (Tag it with "mixed reality.")

## Use Markup in MR

When a user selects the **Markup in MR** button, they will be prompted to move their phone side-to-side for better object or area detection. Once an object or area is detected the user can start using the markup toolbar.

### Add an arrow

To position an arrow:

- Make sure the arrow is selected in the markup toolbar.

- Move your device around to position the dot on the object or area you want.
    to highlight

- Select to place the ghost arrow on your device screen.

- To rotate the arrow, select and drag the arrow in a circular motion (360
    degrees).

### Inking

To determine where you start drawing:

- Make sure the ink pen is selected in the markup toolbar.

- Select and drag on the screen to start drawing.

## Add the Markup in MR control 

Insert the control into your app as you normally would for any other button control.

With an app open for editing in [Power Apps
Studio](https://create.powerapps.com/):

1. Open the **Insert** tab.

2. Expand **Mixed reality**.

3. Select the control **Markup in MR** to place it in the center of the app screen or drag and drop it to position it anywhere on the screen.

   > [!div class="mx-imgBorder"] 
   >![Add the Mark in MR control.](./media/mr-controls/markup-control-add-control-1.png)


You can modify the control with several properties.

> [!TIP]
> Some properties are only available under **More options** in the **Advanced** tab on the **Markup in MR** pane.
> 
>   ![Markup in MR control properties.](./media/mr-controls/markup-control-properties-2.png)


| **Property**         | **Description**                                                                                                                                                                                                                       | **Type**       | **Location**                          |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|---------------------------------------|
| Photos               | The photos captured during the mixed reality session.<br>Note: You can [upload the mixed-reality photos to OneDrive and show them in a gallery](mixed-reality-take-upload-photos.md).                                                                                                                                                                                | Not Applicable | Not Applicable (Output property only) |                   
| OnMixedRealitySelect | Behavior that is triggered when exiting the MR experience with new results.                                                                                                                                                           | Defined Action | Advanced                              |
| OnChange             | Behavior that is triggered when any property on the button is changed.                                                                                                                                                                | Defined Action | Advanced                              |


### Additional properties

| **Property**                                                                                                             | **Description**                                                                                                                                                                            |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**BorderColor**](./controls/properties-color-border.md)         | The color of a control's border.                                                                                                                                                           |
| [**BorderStyle**](./controls/properties-color-border.md)         | Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.                                                                                                              |
| [**BorderThickness**](./controls/properties-color-border.md)     | The thickness of a control's border.                                                                                                                                                       |
| [**Color**](./controls/properties-color-border.md)               | The color of text in a control.                                                                                                                                                            |
| [**DisplayMode**](./controls/properties-core.md)                 | Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).                                                                            |
| [**DisabledBorderColor**](./controls/properties-color-border.md) | The color of a control's border if the control's [**DisplayMode**](./controls/properties-core.md) property is set to **Disabled**. |
| [**DisabledColor**](./controls/properties-color-border.md)       | The color of text in a control if its [**DisplayMode**](./controls/properties-core.md) property is set to **Disabled**.            |
| [**DisabledFill**](./controls/properties-color-border.md)        | The background color of a control if its [**DisplayMode**](./controls/properties-core.md) property is set to **Disabled**.         |
| [**FillColor**](./controls/properties-color-border.md)           | The background color of a control.                                                                                                                                                         |
| [**Font**](./controls/properties-text.md)                        | The name of the family of fonts in which text appears.                                                                                                                                     |
| [**FontStyle**](./controls/properties-text.md)                   | The style of the text in the control: **None**, **Strikethrough**, **Underline**, or **Italic**.                                                                                         |
| [**FontSize**](./controls/properties-text.md)                    | The font size of the text that appears on a control.                                                                                                                                       |
| [**FontWeight**](./controls/properties-text.md)                  | The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**                                                                                                    |
| [**Height**](./controls/properties-size-location.md)             | The distance between a control's top and bottom edges.                                                                                                                                     |
| [**HoverBorderColor**](./controls/properties-color-border.md)    | The color of a control's border when the user keeps the mouse pointer on that control.                                                                                                     |
| [**HoverColor**](./controls/properties-color-border.md)          | The color of the text in a control when the user keeps the mouse pointer on it.                                                                                                            |
| [**HoverFill**](./controls/properties-color-border.md)           | The background color of a control when the user keeps the mouse pointer on it.                                                                                                             |
| [**PaddingBottom**](./controls/properties-size-location.md)      | The distance between text in a control and the bottom edge of that control.                                                                                                                |
| [**PaddingLeft**](./controls/properties-size-location.md)        | The distance between text in a control and the left edge of that control.                                                                                                                  |
| [**PaddingRight**](./controls/properties-size-location.md)       | The distance between text in a control and the right edge of that control.                                                                                                                 |
| [**PaddingTop**](./controls/properties-size-location.md)         | The distance between text in a control and the top edge of that control.                                                                                                                   |
| [**PressedBorderColor**](./controls/properties-color-border.md)  | The color of a control's border when the user taps or clicks that control.                                                                                                                 |
| [**PressedColor**](./controls/properties-color-border.md)        | The color of text in a control when the user taps or clicks that control.                                                                                                                  |
| [**PressedFill**](./controls/properties-color-border.md)         | The background color of a control when the user taps or clicks that control.                                                                                                               |
| [**TabIndex**](./controls/properties-accessibility.md)           | Keyboard navigation order.                                                                                                                                                                 |
| [**TextAlignment**](./controls/properties-text.md)               | The alignment of the text: **Center**, **Left**, **Right**, or **Justify**                                                                                                                 |
| [**Tooltip**](./controls/properties-core.md)                     | Explanatory text that appears when the user hovers over a control.                                                                                                                         |
| [**VerticalAlign**](./controls/properties-text.md)               | The location of text on a control in relation to the vertical center of that control: **Middle**, **Top**, or **Bottom**                                                                   |
| [**Visible**](./controls/properties-core.md)                     | Whether a control appears or is hidden.                                                                                                                                                    |
| [**Width**](./controls/properties-size-location.md)              | The distance between a control's left and right edges.                                                                                                                                     |
| [**X**](./controls/properties-size-location.md)                  | The distance between the left edge of a control and the left edge of its parent container (or the screen if there's no parent container).                                                  |
| [**Y**](./controls/properties-size-location.md)                  | The distance between the top edge of a control and the top edge of the parent container (or the screen if there's no parent container).                                                    |


### Output properties


| **Property** | **Description**                                                                                                                                                                                                                                 | **Type**       |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| Photos       | Collects the photos captured during the mixed reality session. You can [upload the mixed-reality photos to OneDrive and show them in a gallery](mixed-reality-take-upload-photos.md). | Not applicable |

## Other Mixed Reality controls


-   View 3D content with the [View in
    3D](mixed-reality-component-view-3d.md) control.

-   View images and 3D content in the real world with the [View in mixed
    reality](mixed-reality-component-view-mr.md) control.

-   Create and view predefined 3D shapes with the [View shape in mixed
    reality](mixed-reality-component-view-shape.md) control.

-   Measure distance, area, and volume with the [Measure in mixed
    reality](mixed-reality-component-measure-distance.md) control.

---

## Use marker detection with mixed-reality controls

Source: [mixed-reality-marker-detection.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/mixed-reality-marker-detection)

*How to use the marker detection feature of the View in MR and View shape in MR mixed-reality controls in a canvas app.*

# Use marker detection with mixed-reality controls (preview)

[This article is pre-release documentation and is subject to change.]

>[!IMPORTANT]
>This is a preview feature.
>Preview features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

Use physical markers to improve the precision and persistence of media that's placed using the [View in MR](./mixed-reality-component-view-mr.md) and [View shape in MR](./mixed-reality-component-view-shape.md) controls. This topic covers how to enable marker detection and how to add markers to your space.

## Prerequisites

In addition to the standard device compatibility requirements outlined in [add mixed reality controls to your canvas app](./mixed-reality-overview.md), marker detection requires physical markers to be present in your space.

To create a marker, print out the image below or display the image on a monitor or tablet. For best results, the marker should be printed in portrait orientation on standard A4 or 8.5" x 11" letter paper. Ensure that the marker is fully visible and not cut off on either the top or bottom. The marker should be approximately 20 x 20 cm for optimal tracking speed and accuracy.

:::image type="content" source="./media/augmented-marker-detection/mixed-reality-marker.png" alt-text="Image used for marker detection in mixed reality experiences." lightbox="./media/augmented-marker-detection/mixed-reality-marker-1.png":::

## Enable marker detection

Enable marker detection for the **View in MR** and **View shape in MR** controls.

With an app open for editing in [Power Apps Studio](https://create.powerapps.com/):

1. Open the **Insert** tab.

2. Expand **Mixed reality**.

3. Select the **View shape in MR** or **Markup in MR** control.

4. On the **Properties** tab, set the **Enable marker detection** property to **On** in the properties panel or the formula bar.

   :::image type="content" source="./media/augmented-marker-detection/marker-detection-properties.png" alt-text="A screenshot of the properties panel with the marker detection toggle highlighted.":::

## Use marker detection on device

When you enter the mixed-reality experience, you'll be prompted to point your device at a physical marker in your space. To quickly acquire tracking, make sure the marker is fully in frame and about 2-5 feet from the device.

:::image type="content" source="./media/augmented-marker-detection/marker-detection-point-device.png" alt-text="A screenshot of the mixed-reality placement experience showing optimal framing of the marker for detection.":::

Once the marker is detected, the loaded media will be automatically aligned and placed directly on top of the marker. You can manipulate the media's position or rotate it by using the on-screen gestures or by physically moving the marker.

:::image type="content" source="./media/augmented-marker-detection/marker-detection-placement.gif" alt-text="An animated image showing marker detection for placement and positioning.":::

If no marker is present or detection is taking too long, you can turn off the marker detection by selecting the highlighted marker detection button.

:::image type="content" source="./media/augmented-marker-detection/marker-detection-fallback.gif" alt-text="An animated image showing how to disable marker detection during the mixed-reality experience.":::

### See also

- [View in MR control](./mixed-reality-component-view-mr.md)
- [View shape in MR control](./mixed-reality-component-view-shape.md)

---

## Add geospatial controls to canvas apps

Source: [geospatial-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-overview)

*Add geospatial controls to your canvas apps to see interactive maps with dynamic routing and get address autosuggestion*

# Add geospatial controls to your canvas apps

Add interactive maps with dynamic routing and address lookup to your canvas apps using geospatial controls.

Use the following prebuilt controls for geospatial applications:

- [Interactive map](geospatial-component-map.md)
- [Address input](geospatial-component-input-address.md)

The map control runs with limited features available by default. You can enable additional map control features and support for the address input control [by turning on full support in the Power Platform admin center](#prerequisites-for-full-support). Refer to the [table at the bottom of the page](#privacy-and-security-considerations) for more details on data usage in limited and full support.

## Prerequisites for full support

Before you can use geospatial features in your apps, your Power Platform administrator has a couple of tasks to complete:

1. Enable geospatial features in the Power Platform admin center for the environment you intend to use. The geospatial features require their own terms of service, which your admin must review and agree to.
2. Make sure the geospatial controls aren't blocked by the environment's data loss prevention policies.

  >[!IMPORTANT]
  > Geospatial controls are not available in [Power Apps US Government](/power-platform/admin/powerapps-us-government).

### Enable geospatial features for the environment

If you don't have administrative access to the Power Platform admin center, ask your admin to enable geospatial features for you. You can similarly follow these steps to disable geospatial features.

1. Open the [Power Platform admin center](https://admin.powerplatform.microsoft.com).
1. On the **Environments** tab, select the environment you want to use for your apps, and then select **Settings**.

    :::image type="content" source="./media/geospatial/ppac-environment.png" alt-text="A screenshot of the Power Platform admin center, with an environment selected.":::

1. Expand **Product**, and then select **Features**.

    :::image type="content" source="./media/geospatial/ppac-settings.png" alt-text="A screenshot of the Power Platform admin center, with the environment Product Features setting selected.":::

1. Under **Map and address services**, turn on the **Full** toggle. You can use the toggles in this section to similarly turn on and off limited support as well.

    :::image type="content" source="./media/geospatial/geo-admin-flag.png" alt-text="A screenshot of the Power Platform admin center, with the default Limited and Full support toggle settings in view. The Limited toggle is on and the Full toggle is off.":::
1. Read the terms of service. Select **I agree to the terms of service**, and then select **Enable**.

    >[!IMPORTANT]
    >
    >The terms of service must be agreed to before you can use all geospatial features in your apps.
    >
    >Mapping capabilities are provided by a third party. Microsoft shares address and location queries, but not customer or user names, with the provider. Requests are sent securely over HTTPS or aren't exposed to the public Internet.

1. Select **Save**.

### Review the environment's data loss prevention policies

Geospatial controls use the Spatial Services connector to fetch map tiles and to look up and geocode addresses. Your Power Platform admin must make sure data loss prevention policies that apply to that connector don’t conflict with the policies that affect the controls. [Learn more about data loss prevention policies for Power Platform](/power-platform/admin/prevent-data-loss).


## Privacy and security considerations

- Power Apps doesn’t link search queries to any user or tenant when shared with TomTom, and the shared search queries can’t be used to identify individuals or tenants.
- Azure Maps doesn't store the request information sent by you. For more information about Azure Maps compliance, see [Azure global compliance](https://azure.microsoft.com/blog/new-azure-maps-make-identifying-local-compliance-options-easy/)
- Requests sent between TomTom and Azure Maps are not exposed over the public Internet.
- Requests sent between apps you create with the geospatial controls and Azure Maps are sent over HTTPS.
- The following table describes the user data that Power Apps sends to Azure Maps, Bing Maps, and TomTom on full support:

    | Control | Feature | Data |  Purpose | Sent to Azure Maps | Sent to Bing Maps | Sent to TomTom | User identifiers or tracking data sent | Enabled in Full Support | Enabled in Limited Support |
    | ------- | ------- | ---- | ------------------ | ----------------- | -------------- | ------- | ------ | ------ | ------ |
    | Map | Show map tiles | Coordinates in and around the map view | To show the map tiles in the map view. | Yes | No | Yes | No | Yes | Yes |
    | Map | Show pins and shapes from coordinates | Pin and shape coordinates | Feature does not require sending coordinate data. | No | No | No | No | Yes | Yes |
    | Map | Show pins and route waypoints | Pins and route waypoint addresses | To translate addresses to latitude/longitude coordinates, and show them on the map. | No | Yes | Yes | No | Yes | No |
    | Map | Show routes | Route waypoint coordinates | To calculate routes between waypoints. | Yes | No | Yes | No | Yes | No |
    | Address Input | Address Search | Address search query string | To show address search results. | No | Yes | Yes | No | Yes | No |
    | Address Input | Address Search | Current device location | To bias address search results around the device location. | No | Yes | Yes | No | Yes | No |

### Next steps

Add the controls to your apps:

- Visualize and interpret location data with the **[Interactive map](geospatial-component-map.md)** control.
- See dynamic address suggestions as you type with the **[Address input](geospatial-component-input-address.md)** control.

### See also

[Create an app that uses the address input and map controls](how-to/mobile-apps-address-map.md)

---

## Use an interactive map control in Power Apps

Source: [geospatial-component-map.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-component-map)

*View an interactive map with customized pins, dynamic routing, and shapes with the geospatial controls in Power Apps.*

# Interactive map control

Easily add an interactive map to your canvas apps. Plot markers from a data source containing addresses or latitude and longitude pairs. As you zoom out, the markers will optionally cluster to condense groups of data. On mobile devices and web experiences, a map can show the user's current position and calculate a route to the user's destination. Maps can be switched between road and satellite views.

:::image type="content" source="./media/augmented-geospatial/geospatial-map-component.png" alt-text="A screenshot of a tablet app in which a map control is under construction in Microsoft Power Apps Studio.":::

## Interactive map features

- [Use a data source to insert pins](geospatial-map-excel.md)
- [Display information about map pins](geospatial-map-infocards.md)
- [Show routes between waypoints](geospatial-map-routing.md)
- [Draw and insert shapes](geospatial-map-draw-shapes.md)

## Prerequisites

You'll need to satisfy a few [prerequisites](geospatial-overview.md#prerequisites-for-full-support) before you can use maps in your canvas apps. Refer to the [privacy and security table](geospatial-overview.md#privacy-and-security-considerations) for more details on how different map features use data.

## Add a map to an app screen

With your app open for [editing](edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Select the **Insert** tab and expand **Media**.
2. Select **Map** to place a map in the app screen, or drag the control to the screen to position it more precisely.

## Adding pins, routes, and shapes

Pins, routes, and shapes are data set properties that need to both identify a data source, which is a table from a collection or connector, and the relevant columns. The data source is set in the Items property (Items for pins, RouteWaypoints_Items for routes, Shape_Items for shapes) and the relevant columns are set in the related properties (e.g. ItemLatitudes, ItemLongitudes, etc for pins). The [Properties](#properties) section contains additional information about these data sets and their related properties.

For example, if you had a table collection named **Locations** with **Name**, **Longitude**, and **Latitude** columns:

| Name | Longitude | Latitude |
| - | - | - |
| Fourth Coffee (sample) | -98.29277 | 26.2774 |
| Litware, Inc. (sample) | -96.85572 | 32.55253 |
| Adventure Works (sample) | -96.99952 | 32.72058 |

To display these as labeled pins on the map:

1. Set the **Items** property to Locations
1. Set the **ItemLabels** property to "Name"
1. Set the **ItemLongitude** property to "Longitude"
1. Set the **ItemLatitude** property to "Latitude"

    >[!IMPORTANT]
    >
    >The relevant column names need to be in quotation marks in the related properties. The data source should not have quotation marks.

You can see how to do [display pins from an Excel sheet](geospatial-map-excel.md) or [build an app](how-to/mobile-apps-address-map.md) that uses the address input control to populate pins on the map control as additional examples.

 >[!NOTE]
 > - Each map control can display up to 5000 pins from latitude or longitude and 50 pins from addresses. The pin limit is lower for addresses as the map needs to geocode these addresses into latitude or longitude to display them. We recommend not using addresses where possible. You can [save geocoded addresses back to your data source](geospatial-map-excel.md#save-geocoded-addresses-from-map-control-to-data-source).
 > - When both latitude or longitude and an address is given for a single pin, the map control will prioritize using the latitude or longitude to avoid geocoding the address.
 > - The maximum number of shapes that can be drawn in a map control is limited to 500.


## Properties

Change a map's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

:::image type="content" source="./media/augmented-geospatial/geospatial-controls.png" alt-text="A screenshot of a phone app in which a map control is shown next to the Properties tab in Microsoft Power Apps Studio.":::

The map control has six different types of properties:

1. [Styling properties](#styling-properties)
1. [Behavioral properties](#behavioral-properties)
1. [Pin properties](#pin-properties)
1. [Route properties](#route-properties)
1. [Shape properties](#shape-properties)
1. [Output properties](#output-properties)

### Styling properties

| Property | Description | Type | Tab |
| - | - | - | - |
| Satellite view | Displays the map in satellite view. Leave this property off to display the map in road view. | Boolean | Properties; Advanced: **SatelliteView** |
| Map style | Sets the map style. Options: Road, Night, Road shaded relief, Satellite, Satellite road labels, High contrast light, High contrast dark, Grayscale light, Grayscale dark. | Enum | Properties |
| Transparency | Determines the map's transparency, from 0 (opaque) to 100 (transparent).| Integer| Properties; Advanced: **Transparency** |
| [Visible](./controls/properties-core.md) | Shows or hides the map. | Boolean | Properties; Advanced: **Visible** |
| Position | Places the upper-left corner of the map at the screen coordinates specified in *x* and *y*. | Floating point number | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the map using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| Border radius | Determines the corner radius of the map border. | Floating point number | Properties; Advanced: **BorderRadius** |
| Border | Determines the style, width, and color of the map border. | Not applicable | Properties; Advanced: **[BorderStyle](./controls/properties-color-border.md)**, **[BorderThickness](./controls/properties-color-border.md)**, **[BorderColor](./controls/properties-color-border.md)** |
| [DisplayMode](./controls/properties-core.md) |  Determines whether the control allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Enum | Advanced |

### Behavioral properties

| Property | Description | Type | Tab |
| - | - | - | - |
| Show info cards | [Shows information](./geospatial-map-infocards.md) about a mapped location when the user selects it (*On click*) or points to it (*On hover*). If *None*, no information is shown. | Enum | Properties; Advanced: **InfoCards** |
| Use default location | Initializes the map at a default location. | Boolean | Properties; Advanced: **DefaultLocation** |
| Default latitude | Sets the latitude coordinate the map shows if **Use default location** is enabled. | Floating point number | Properties; Advanced: **DefaultLatitude** |
| Default longitude | Sets the longitude coordinate the map shows if **Use default location** is enabled. | Floating point number | Properties; Advanced: **DefaultLongitude** |
| Default zoom level | Sets the zoom level if **Use default location** is enabled, from 0 to 22. | Integer | Properties; Advanced: **DefaultZoomLevel** |
| Show current location | Displays the user's current location. | Boolean | Properties; Advanced: **CurrentLocation** |
| Current location latitude | Sets the latitude coordinate of the current location pin that the map shows if **Show current location** is enabled. To place the pin at the user's current location, set this property to [Location.Latitude](/power-platform/power-fx/reference/signals#locationn). | Floating point number | Properties; Advanced: **CurrentLocationLatitude** |
| Current location longitude | Sets the longitude coordinate of the current location pin that the map shows if **Show current location** is enabled. To place the pin at the user's current location, set this property to [Location.Longitude](/power-platform/power-fx/reference/signals#location). | Floating point number | Properties; Advanced: **CurrentLocationLongitude** |
| Zoom control | Shows the zoom control. | Boolean | Properties; Advanced: **Zoom** |
| Compass control | Shows the compass control. | Boolean | Properties; Advanced: **Compass** |
| Pitch control | Shows the pitch (tilt) control. | Boolean | Properties; Advanced: **Pitch** |
| [TabIndex](./controls/properties-accessibility.md) | Specifies the order the map is selected if the user navigates the app using the Tab key. | Integer | Properties; Advanced: **Tab index** |
| [Tooltip](./controls/properties-core.md) | Determines the text to display when the user hovers over a visual. | String | Advanced |
| ContentLanguage | Determines the display language of the map, if it's different from the language used in the app. | String | Advanced |
| OnLoad | Contains code that runs when the map is loaded. | Event | Advanced |
| OnMapClick | Contains code that runs when the user selects the map. The latitude and longitude of the clicked point is in the **ClickedLocation** output property. | Event | Advanced |
| OnChange | Contains code that runs when any aspect of the map is changed. | Event | Advanced |
| OnSelect | Contains code that runs when the user selects something on the map. | Event | Advanced |

### Pin properties

| Property | Description | Type | Tab |
| - | - | - | - |
| Locations(Items) | Identifies a [data source](./geospatial-map-excel.md) (**Items**) in the form of a table from which to get locations to show on the map. The table lists sets of longitudes and latitudes, or physical addresses, to display as pins. Using latitude or longitude is recommended as addresses need to be geocoded and so have a more restrictive pin limit. The table can be a collection or from a data source like Excel Online. Each row must have an entry for label, longitude, and latitude, or a physical address, and optionally the pin color and icon. | Not applicable | Properties; Advanced: **Items** |
| ItemsLabels | Identifies the column in **Items** that contains the labels for the pins. | ColumnName | Advanced |
| ItemsLatitudes | Identifies the column in **Items** that contains the latitude position of the pins. | ColumnName | Advanced |
| ItemsLongitudes | Identifies the column in **Items** that contains the longitude position of the pins.  | ColumnName | Advanced |
| ItemsAddresses | Identifies the column in **Items** that contains addresses that represent the location of the pins. There is a limit to how many pins can be displayed from addresses. We recommend geocoding your addresses to latitude, longitude pairs and using those to display pins when possible. | ColumnName | Advanced |
| ItemsColors | Identifies the column in **Items** that contains the colors of the pins. | ColumnName | Advanced |
| ItemsIcons | Identifies the column in **Items** that contains the icons of the pins. | ColumnName | Advanced |
| Cluster pins | Groups nearby map pins instead of displaying them individually. | Boolean | Properties; Advanced: **Clustering** |
| Pin color | Determines the default color of pins shown on the map. This color is overridden by the **ItemsColors** property if set | Color picker | Properties; Advanced: **PinColor** |
| OnItemsChange | Contains code that runs when pins on the map are changed. | Event | Advanced |

### Route properties

| Property | Description | Type | Tab |
| - | - | - | - |
| Enable routing | Determines whether the user can request directions to a specified location. | Boolean | Properties; Advanced: **UseRouting** |
| Route waypoints(Items) | Shows route waypoints, as provided in a data source (**RouteWaypoints_Items**) in the form of a table. The table can be a collection or from a data source like Excel Online. If *None*, no waypoints are shown. | Enum | Properties; Advanced: **RouteWaypoints_Items** |
| RouteWaypointsLabels | Identifies the column in **RouteWaypoints_Items** that contains the labels for the waypoints. | ColumnName | Advanced
| RouteWaypointsLatitudes | Identifies the column in **RouteWaypoints_Items** that contains the latitude position of the waypoints. | ColumnName | Advanced |
| RouteWaypointsLongitudes | Identifies the column in **RouteWaypoints_Items** that contains the longitude position of the waypoints.  | ColumnName | Advanced |
| RouteWaypointsAddresses | Identifies the column in **RouteWaypoints_Items** that contains addresses that represent the location of waypoints. | ColumnName | Advanced |
| Maintain waypoint order | Determines whether a calculated route maintains waypoints in the order provided.| Boolean | Properties; Advanced: **RouteMaintainOrder** |
| Optimize route | Determines whether a calculated route is optimized for distance, time, or isn't optimized. | Enum | Properties; Advanced: **RouteOptimization** |
| Route travel mode | Determines whether a route is calculated for a car or a truck, which may require avoiding bridges with certain height or weight restrictions. | Enum | Properties; Advanced: **RouteTravelMode** |
| OnRouteDirectionChange | Contains code that runs when the app detects the user has changed direction while on a computed route.| Event | Advanced |

### Shape properties

| Property | Description | Type | Tab |
| - | - | - | - |
| Show shapes | Shows the shapes in **Shapes_Items**. | Boolean | Properties; Advanced: **ShowShapes** |
| Shapes_Items | Identifies a data source (**Shapes_Items**) in the form of a table from which to get shapes to show on the map. The table can be a collection or from a data source like Excel Online. Each row must have an entry for the shape (GeoJSON object) and (optionally) a label and color. | TableName | Advanced |
| ShapeGeoJSONObjects | Identifies the column in **Shapes_Items** with strings that represent the GeoJSON objects of the shapes, in shape collection or single shape GeoJSON format. | ColumnName | Advanced |
| ShapeLabels | Identifies the column in **Shapes_Items** that contains the labels for the shapes. | ColumnName | Advanced |
| ShapeColors | Identifies the column in **Shapes_Items** that contains the colors of the shapes. | ColumnName | Advanced |
| Show shape labels | Shows the shape labels, if provided. | Boolean | Properties; Advanced: **ShowShapeLabels** |
| Enable shape drawing | Shows drawing tools on the map. | Boolean | Properties; Advanced: **ShapeDrawing** |
| Enable shape deleting and label editing | Determines whether the user can delete shapes and edit their labels. | Boolean | Properties; Advanced: **ShapeEditingDeleting** |
| OnShapeCreated | Contains code that runs when the user adds a shape to the map. | Event | Advanced |
| OnShapeSelected | Contains code that runs when the user selects a shape on the map. | Event | Advanced |
| OnShapeEdited | Contains code that runs when the user modifies a shape on the map. | Event | Advanced |
| OnShapeDeleted | Contains code that runs when the user deletes a shape on the map. | Event | Advanced |

### Output properties

Other properties become available when a user interacts with a map. You can use these *output properties* in other controls or to customize the app experience.

| Property | Description | Type |
| - | - | - |
| CenterLocation | Captures the map's center point. | Not Applicable |
| ClickedLocation | Captures the last location the user selected, either *.Latitude* or *.Longitude*. | Record |
| Selected | Captures the selected pin. | Record |
| SelectedItems | Captures the selected pin or pins in the selected cluster. | Table |
| GeocodedItems | Captures the geocoded locations of the pins. | Table |
| RouteWaypoints_Selected | Corresponds to the record of the selected shape in **RouteWaypoints_Items**. | Record |
| RouteWaypoints_SelectedItems | Corresponds to the records of the selected overlapping shapes in **RouteWaypoints_Items**. | Table |
| Shapes_Selected | Corresponds to the record of the selected shape in **Shapes_Items**. | Record |
| Shapes_SelectedItems | Corresponds to the records of the selected overlapping shapes in **Shapes_Items**. | Table |
| SelectedShape | Captures the *.Perimeter* and *.Area* of the selected shape. | Record |
| DeletedShape | Captures the *.Perimeter* and *.Area* of the last deleted shape. | Record |
| GeoJSON | Captures the list of shapes in Feature Collection GeoJSON format. | String |

## Other geospatial controls

To see dynamic address suggestions as you type, use the **[Address input](geospatial-component-input-address.md)** control.



## Known limitations

- Requires internet connection

### See also

[Create an app with address input and map controls](how-to/mobile-apps-address-map.md)

---

## Insert pins from data source

Source: [geospatial-map-excel.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-map-excel)

*Add customized pins to your map control in Power Apps by using a dataset.*

# Use a data source to insert pins

You can load a table that contains existing data into the map control. The control will then plot each row in your table as a map pin.

## Prerequisites

1. Create a Canvas app and make sure it meets the [Geospatial prerequisites](geospatial-overview.md#prerequisites-for-full-support). 
2. In your app, [insert a map](geospatial-component-map.md). 

## Add pin data from an Excel workbook

Your data source needs to contain a named table with the following columns that should then be mapped to the associated property in the control's **Advanced** pane.

Column description | Maps to property | Required
-- | -- | --
Label for the pin | ItemsLabels | Required
Longitude of the pin | ItemsLongitudes | Required
Latitude of the pin | ItemsLatitudes | Required
Color of the pin | ItemsColors | Optional
Icon for the pin | ItemsIcons | Optional

The color field accepts any CSS string, as defined in [Color enumeration and ColorFade, ColorValue, and RGBA functions in Power Apps](/power-platform/power-fx/reference/function-colors).

You can use the icons described in the [List of image templates](/azure/azure-maps/how-to-use-image-templates-web-sdk#list-of-image-templates) topic as your icon.

The following Excel table shows the required columns:

:::image type="content" source="media/geospatial/sample-excel.png" alt-text="Sample excel file with a table named TestData and containing Name, Longitude, and Latitude columns":::

You can copy the following sample data to test this functionality:

Name | Longitude | Latitude | Color | Icon
-- | -- | -- | -- | --
Fourth Coffee (sample) | -98.29277 | 26.2774 | Blue | marker-flat
Litware, Inc. (sample) | -96.85572 | 32.55253 | #ffefcd| hexagon-thick
Adventure Works (sample) | -96.99952 | 32.72058 | | car
Fabrikam, Inc. (sample) | -118.30746 | 34.86543 | |
Blue Yonder Airlines (sample) | -118.66184 | 34.17553 | |
City Power & Light (sample) | -113.46184 | 37.15363 | |
Contoso Pharmaceuticals (sample) | -80.26711 | 40.19918 | |
Alpine Ski House (sample) | -102.63908 | 35.20919 | |
A Datum Corporation (sample) | -89.39433 | 40.71025 | |
Coho Winery (sample) | -116.97751 | 32.87466 | |

1. Copy and paste the table into a new data source. In this example, we are using an Excel workbook.  

1. Select one of the cells, and then on the Home tab in the ribbon, select **Format as Table** and choose any style, and then **OK**.

    ![Screenshot highlighting the format as table option in Excel.](./media/geospatial/convert-table.png)

1. Select the table, and then go to the **Table Design** tab on the ribbon. Enter a name for the table under **Table Name:**, for example *TestData*.

    ![Screenshot highlighting the table name in Excel.](./media/geospatial/table-name.png)

1. Save the workbook.

1. Open or create a new app in Power Apps, and insert the map control.

1. On the **Properties** pane, select the **Locations(Items)** field and then search for *excel* and select **Import from Excel**.

    :::image type="content" source="media/geospatial/select-excel.png" alt-text="Screenshot of the Import from Excel option.":::

1. Locate the Excel workbook and then select **Open**. Select the table that contains the information, **TestData**, and then **Connect**.

    ![Screenshot of the table selection panel.](./media/geospatial/select-table.png)

1. On the **Properties** pane, go to the **Advanced** tab, and select **More options**.

1. Set the following properties:

    - **ItemsLabels** as *"Name"*
    - **ItemsLatitudes** as *"Latitude"*
    - **ItemsLongitudes** as *"Longitude"*
    - (Optional) **ItemsColors** as *"Colors"*
    - (Optional) **ItemsIcons** as *"Icons"*

1. The map control will now show each row in the table as a pin, labeled with its *Name* as defined in the Excel table, and using the provided icons and colors. If an icon or color isn't provided, then the control will use the default icon and color.

    ![A screenshot of the map control with custom icons and different colors.](./media/geospatial/pins-map.png)

 >[!NOTE]
 > Each map control can display up to 5000 pins from latitude or longitude and 50 pins from addresses. The pin limit is lower for addresses as the map needs to geocode these addresses into latitude or longitude to display them. We recommend not using addresses where possible. You can [save geocoded addresses back to your data source](geospatial-map-excel.md#save-geocoded-addresses-from-map-control-to-data-source).
 >
 > When both latitude or longitude and an address is given for a single pin, the map control will prioritize using the latitude or longitude to avoid geocoding the address.

## Save geocoded addresses from map control to data source

To avoid geocoding the same set of addresses every time the map control is launched, you can save the geocoded addresses back to the original data source, such that when the map relaunches, it will use the latitude and longitude instead of geocoding the addresses again.

To do so, add a button to save the geocoded address back to the original data source with the following formula:

```power-fx
 ForAll(Map1.GeocodedItems, Patch(Accounts1, LookUp(Accounts1, ThisRecord.Address = Address && ThisRecord.Name = Label), {Latitude: Latitude, Longitude: Longitude }))
```

![Screenshot of the app showing the formula in the formula bar.](https://user-images.githubusercontent.com/66707906/118740084-d3081d80-b7ff-11eb-9295-2855bd7e9a96.png)

## Other interactive map features

- [Add info cards to pins](geospatial-map-infocards.md)
- [Show routes between waypoints](geospatial-map-routing.md)
- [Draw and insert shapes onto maps](geospatial-map-draw-shapes.md)

## Other geospatial controls

To see dynamic address suggestions as you type, use the **[Address input](geospatial-component-input-address.md)** control.

---

## Display information about map pins

Source: [geospatial-map-infocards.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-map-infocards)

*Add cards that display information about pinned locations in your canvas apps.*

# Add informational cards to pins on a map


Easily add cards to maps in your canvas apps to show details about pinned locations. When a user selects a pin, a card pops up with information from the [data source you bound to the map control](./geospatial-map-excel.md). Any column in the data source (for example, an Excel table) can be shown as a field on the card.

## Prerequisites

1. [Create a canvas app](./create-blank-app.md) and make sure it meets the [geospatial prerequisites](./geospatial-overview.md#prerequisites-for-full-support).
1. [Insert a map](./geospatial-component-map.md).


## Add info cards to pins

1. [Bind the map to a data source](./geospatial-map-excel.md).
1. In the map control's **Properties** pane, select **Show info cards**. Select **On click** to show the info card when the user selects a pin, or **On hover** if it should appear when the user hovers over the pin.

    :::image type="content" source="./media/geospatial/map-info-card-type.png" alt-text="A screenshot of a map control's Properties pane with the Show info cards property open to show the On click and On hover options.":::

1. In the **Properties** pane, next to **Fields**, select **Edit**.
1. Select **Add field**, and then select the fields from the data source that you want to show in the card. Select **Add**.

    :::image type="content" source="./media/geospatial/map-choose-fields.png" alt-text="A screenshot of a map control's Properties pane, showing the data source fields.":::

When the user selects a pin, an info card shows the fields you selected.

  :::image type="content" source="./media/geospatial/map-info-card-example.png" alt-text="A screenshot of a map pin selected in a canvas app, with an info card that shows the location Name, Occupancy, and Phone data.":::

## Other interactive map features

- [Use data from Excel to insert pins](./geospatial-map-excel.md)
- [Show routes between waypoints](geospatial-map-routing.md)
- [Draw and insert shapes onto maps](./geospatial-map-draw-shapes.md)

## Other geospatial controls

To see dynamic address suggestions as you type, use the **[Address input](geospatial-component-input-address.md)** control.

---

## Draw and insert shapes on maps

Source: [geospatial-map-draw-shapes.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-map-draw-shapes)

*Allow canvas app users to draw shapes on a map, or insert predefined shapes and display their measurements, in Power Apps.*

# Draw and insert shapes on a map (preview)

[This topic is pre-release documentation and is subject to change.]

Add a drawing panel to your maps to let users draw and label shapes on them. You can also insert and label predefined shapes to highlight specific regions or areas of interest.

:::image type="content" source="./media/geospatial/custom-geojson-shape-example.png" alt-text="A screenshot of a map control with example shapes drawn and labeled.":::

>[!IMPORTANT]
>
>- This is a preview feature.
>- Preview features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

## Prerequisites

1. [Create a canvas app](./create-blank-app.md) and make sure it meets the [geospatial prerequisites](geospatial-overview.md#prerequisites-for-full-support).
1. [Insert a map](./geospatial-component-map.md#add-a-map-to-an-app-screen).

## Draw and label shapes on an interactive map

1. In the map control's **Properties** pane, turn on the following properties:

    - **(Preview) Enable Shape Drawing**
    - **(Preview) Enable Shape Deleting and Label Editing**

        :::image type="content" source="./media/geospatial/enable-feature.png" alt-text="A screenshot of a map control's Properties pane, showing the Shape Drawing properties turned on.":::

    A drawing panel appears in the upper-left corner of the map control.

    :::image type="content" source="./media/geospatial/drawing-panel.png" alt-text="A screenshot of a map control in a canvas app, with the drawing panel highlighted.":::

    The panel features three tools:

    - A polygon drawing tool for drawing freeform shapes
    - A square drawing tool for drawing squares and rectangles
    - A circle drawing tool for drawing circles and ovals

1. Select a tool and draw a shape on the map. To finish and close a freeform shape, double-click the final point.

Drawn shapes are automatically labeled. To change a label, select the shape, and then enter a new name in the box in the upper-right corner of the map.

To delete a shape, select it, and then select the trashcan.

:::image type="content" source="./media/geospatial/example-shapes.png" alt-text="A screenshot of a map control with sample shapes and labels, with the trashcan icon and label box highlighted.":::

## Import GeoJSON shapes into a map

If you already have shapes defined in GeoJSON format, you can import them into your map. For example, you might have a shape that defines a specific area that you want to highlight.

The GeoJSON string for each shape in your data source needs to be in [the correct format](https://en.wikipedia.org/wiki/GeoJSON), in a single cell.

To import shapes, first connect your data source to the map control. Then, assign the control's properties to the appropriate columns in the data source, as in the following example:

:::image type="content" source="media/geospatial/custom-geojson-shape.png" alt-text="A screenshot of a map control's advanced properties, with data source fields provided and the resulting shapes displayed on the map.":::

Your data source must be a named table with at least three columns. Each column corresponds to an advanced property of the map control.

| Column description | Corresponds to | Required |
| - | - | - |
| The shape's GeoJSON coordinates in [the correct format](https://en.wikipedia.org/wiki/GeoJSON) | ShapeGeoJSONObjects | Required |
| Shape label | ShapeLabels | Optional |
| Shape color | ShapeColors | Optional |

> [!Tip]
> Specify the color using a [name, CSS color definition, or RGBA value](/functions/>function-colors). If the color isn't provided, then the shape will use the app's defaults.


The data source must be named. If you're using an Excel workbook as the data source, use the name of the table that contains the data. In this example, we'll import shapes from an Excel table named *Seattle1*.

:::image type="content" source="./media/geospatial/custom-geojson-shape-excel.png" alt-text="A screenshot of a table in Excel with GeoJSON shape data.":::

1. Copy the following sample data into a blank workbook, format it as a table, and name the table *Seattle1*. Then, connect the workbook to your map as a data source. For detailed instructions using a similar example, see [Use a data source to place pins on a map](./geospatial-map-excel.md).

      | County | GeoJSON | TotalCases | Color |
      | -| - | - | - |
      |  Adams | {"type":"FeatureCollection","properties":{"kind":"state","state":"WA"},"features":[{"type":"Feature","properties":{"kind":"county","name":"Adams","state":"WA"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-118.9503,47.2640],[-117.9590,47.2586],[-117.9699,46.8697],[-118.0466,46.7711],[-118.2109,46.7383],[-119.2132,46.7383],[-119.3720,46.7383],[-119.3665,46.9135],[-118.9832,46.9135],[-118.9777,47.2640]]]]}}]} | 1689 | RGB(184,210,232) |
      |  Asotin | {"type":"FeatureCollection","properties":{"kind":"state","state":"WA"},"features":[{"type":"Feature","properties":{"kind":"county","name":"Asotin","state":"WA"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-117.0388,46.4261],[-117.0607,46.3549],[-116.9841,46.2946],[-116.9676,46.2015],[-116.9238,46.1687],[-116.9841,46.0920],[-116.9183,45.9934],[-117.4825,45.9989],[-117.4825,46.1194],[-117.4222,46.1194],[-117.4222,46.3823],[-117.2305,46.4096],[-117.2305,46.4644],[-117.1977,46.4206]]]]}}]} | 1096 | RGB(184,210,232) |
      |  Benton | {"type":"FeatureCollection","properties":{"kind":"state","state":"WA"},"features":[{"type":"Feature","properties":{"kind":"county","name":"Benton","state":"WA"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-119.8759,46.6287],[-119.6240,46.6452],[-119.5144,46.7273],[-119.4542,46.6780],[-119.2680,46.5192],[-119.2680,46.2727],[-119.0434,46.1906],[-118.9448,46.0756],[-118.9393,46.0263],[-118.9886,45.9989],[-119.1256,45.9332],[-119.4323,45.9167],[-119.5692,45.9277],[-119.6678,45.8565],[-119.8704,45.8346],[-119.8649,46.0427],[-119.8759,46.6287]]]]}}]} | 13111 | RGB(13,106,191) |
      |  Chelan | {"type":"FeatureCollection","properties":{"kind":"state","state":"WA"},"features":[{"type":"Feature","properties":{"kind":"county","name":"Chelan","state":"WA"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-120.7029,48.5292],[-120.6536,48.5347],[-120.6262,48.4964],[-120.6646,48.4471],[-120.6481,48.3978],[-120.5605,48.3704],[-120.5879,48.3211],[-120.5112,48.3101],[-120.3524,48.2170],[-120.3633,48.1568],[-120.3250,48.1294],[-120.1443,48.0637],[-120.1443,48.0363],[-120.0895,48.0199],[-120.0512,47.9596],[-119.8704,47.9596],[-119.9964,47.7789],[-120.2100,47.7515],[-120.1990,47.6803],[-120.2374,47.5872],[-120.3031,47.5215],[-120.3195,47.4557],[-120.2921,47.4010],[-120.0895,47.3407],[-120.0950,47.2640],[-120.3907,47.2586],[-120.5276,47.3352],[-120.5605,47.3079],[-120.8015,47.4229],[-120.9165,47.4284],[-121.1137,47.5981],[-121.1301,47.6748],[-121.0644,47.7132],[-121.1192,47.7789],[-121.0699,47.8282],[-121.1520,47.8446],[-121.1739,47.8884],[-121.1630,47.9541],[-121.1192,47.9980],[-121.1520,48.0418],[-121.0151,48.0746],[-120.9439,48.1130],[-120.9548,48.1513],[-120.9056,48.1623],[-121.0041,48.2937],[-121.0699,48.3156],[-121.0425,48.3485],[-121.0644,48.3923],[-121.0370,48.4306],[-121.0480,48.4854],[-120.8563,48.5511],[-120.7851,48.5073]]]]}}]} | 5324 | RGB(112,187,255) |

1. Bind the following advanced properties of the map control to the appropriate columns in the data source:

      | Property | Column |
      | - | - |
      | ShapeGeoJSONObjects | GeoJSON |
      | ShapeLabels | County |
      | ShapeColors | Color |

    Your map should look something like this:

    :::image type="content" source="./media/geospatial/custom-geojson-counties.png" alt-text="A screenshot of a map with imported shapes that highlight specific areas.":::

## Display the perimeter and area of drawn or inserted shapes (preview)

Your apps can show the perimeter (in feet) and area (in square feet) of a selected shape on a map.

1. In your app, open the **Insert** tab and expand **Display**.
1. Select **Text label** to insert a label on the app screen. Move and resize it as you like.
1. Change the **Text** property of the label control to *[Map].SelectedShape.Area* or *[Map].SelectedShape.Perimeter* to display the selected shape's area or perimeter. (Hint: Enter the given value in the formula bar or on the **Properties** tab, whichever you prefer.)

In the following example, we used four text labels to display both the area and perimeter of the selected shape:

:::image type="content" source="./media/geospatial/measurement-display.png" alt-text="A screenshot of a shape selected on a map, next to two text labels that show the shape's area and perimeter.":::

## Other interactive map features

- [Use data from Excel to insert pins](./geospatial-map-excel.md)
- [Add info cards to pins](./geospatial-map-infocards.md)
- [Show routes between waypoints](geospatial-map-routing.md)

## Other geospatial controls

To see dynamic address suggestions as you type, use the **[Address input](./geospatial-component-input-address.md)** control.

---

## Calculate routes between waypoint pins on a map (preview)

Source: [geospatial-map-routing.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-map-routing)

*Add waypoint pins to a map and calculate routes between them in Power Apps.*

# Calculate routes between waypoint pins on a map (preview)

[This topic is pre-release documentation and is subject to change.]

The map control in a canvas app can add waypoint pins using data imported from a table in an Excel workbook. The control can calculate routes between waypoints, reorder waypoints, and recalculate a route to improve travel time or distance.

>[!IMPORTANT]
>
>- This is a preview feature.
>- Preview features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

You'll need a data source that contains a named table with the following columns. Each column corresponds to an advanced property of the map control. Each row is pinned as a waypoint on the map.

| Column name | Corresponds to | Required |
| - | - | - |
| Name (or Label) | RouteWaypointsLabels | Optional |
| Longitude | RouteWaypointsLongitudes | Optional (required if Address isn't given) |
| Latitude | RouteWaypointsLatitudes | Optional (required if Address isn't given) |
| Address | RouteWaypointsAddresses | Optional (required if Longitude and Latitude aren't given) |


> [!NOTE]
> All properties are technically optional. However, at least one of an address or a latitude/longitude pair must be provided for the waypoint location to be plotted.


## Import waypoint pins from an Excel table

In this example, we'll import waypoint data from an Excel table named *TestData*.

### Create a data source

1. [Create a table](https://go.microsoft.com/fwlink/?linkid=2186917) in Excel with the following data. Name the table **TestData**.

    | Name | Longitude | Latitude | Address |
    | - | - | - | - |
    | Work | -122.156481 | 47.663448 | 1 Microsoft Way, Redmond, WA 98052 |
    | Meet up | -122.221037 | 47.57137 |
    | Swimming | -122.144133 | 47.600373 |
    | Tennis | -122.137265 | 47.616115 |

    Your table should look something like this:

    :::image type="content" source="./media/geospatial/map-routing-table.png" alt-text="An example Excel worksheet with a table named TestData that contains information needed to place waypoint pins on a map.":::

1. Save the workbook to your OneDrive for Business and close the file.

### Bind the data source to a map control

1. [Create a canvas app](./create-blank-app.md). Make sure it meets the [geospatial prerequisites](./geospatial-overview.md#prerequisites-for-full-support).
1. [Insert a map control](./geospatial-component-map.md).
1. On the control's **Properties** tab, select the **Route waypoints(Items)** box and type *excel*.

    :::image type="content" source="./media/geospatial/map-routing-property.png" alt-text="A screenshot that shows how to search for a waypoint data source to connect to a map control in Power Apps Studio.":::

1. Select **Import from Excel**.
1. Navigate to your OneDrive for Business and select the Excel workbook you saved earlier.
1. Select the table **TestData**, and then select **Connect**.

    :::image type="content" source="./media/geospatial/select-table.png" alt-text="Screenshot of the table selection panel.":::

1. On the **Advanced** tab, find **RouteWaypointsLabels**, **RouteWaypointsLatitudes**, **RouteWaypointsLongitudes**, and **RouteWaypointsAddresses** and enter the name of the corresponding column in the table. (In this example, enter *Name* in **RouteWaypointsLabels**, *Latitude* in **RouteWaypointsLatitudes**, and so on.) Enclose the column name in quotation marks.

    >[!NOTE]
    >Address is interchangeable with Latitude and Longitude. If Latitude and Longitude are provided, then Address isn't used. If Address is provided, then Latitude and Longitude aren't needed. There is a limit to the number of waypoints that can be displayed when using address, so use Latitude and Longitude when possible. 

Pins appear on the map at the locations described by the coordinates or addresses in the table. If the table included labels, the pins are labeled. The pins are numbered in the order the waypoint locations appear in the table.

:::image type="content" source="./media/geospatial/map-routing-pins.png" alt-text="A screenshot of a map with pinned and labeled waypoints shown next to the map's properties.":::

## Calculate routes between the waypoints

With the map control selected, open the **Properties** tab and turn on **Enable routing**.

The control calculates routes between the pinned waypoints.

:::image type="content" source="./media/geospatial/map-routing-directions.png" alt-text="A screenshot of a map with routes between pinned waypoints.":::

>[!NOTE]
>By default, the map control reorders the middle waypoints to decrease travel time or travel distance. The first and last waypoints are considered the origin and destination and can't be reordered. To keep the waypoints in the order given in the data source, turn on the control's **Maintain waypoint order** property.

### Properties

Change how a route is calculated using properties.

| Property | Description | Type | Tab |
| - | - | - | - |
| Enable routing | Calculates routes between waypoints. | Boolean | Properties; Advanced: **UseRouting** |
| Maintain waypoint order | Determines whether a calculated route maintains waypoints in the order provided in the data source. | Boolean | Properties; Advanced: **RouteMaintainOrder** |
| Optimize route | Determines whether a calculated route is optimized for distance, time, or isn't optimized. | Dropdown list | Properties; Advanced: **RouteOptimization** |
| Route travel mode | Determines whether a route is calculated for a car or a truck, which may require avoiding bridges with certain height or weight restrictions. | Dropdown list | Properties; Advanced: **RouteTravelMode** |
| Show route pins | Determines whether pins are shown over the route waypoints. | Boolean | Properties; Advanced: **ShowRoutePins** |

### Output Properties

Some properties become available only when a calculated route changes. These *output properties* are placed in the **RouteDirection** object. The **OnRouteDirectionChange** event is a recommended way to use the output in other controls or to customize the app experience.

| Property | Description | Type | Tab |
| - | - | - | - |
| OnRouteDirectionChange | Contains code that runs when the route is changed. | Event | Advanced |
| RouteDirection | Describes the routing outputs:<ul><li>LengthInMeters: The length in meters of the entire route</li><li>TravelTimeInSeconds: The expected travel time in seconds of the entire route</li><li>RouteGeoJSON: A string that describes the route in GeoJSON format</li><li>RouteLegs: A table that describes each leg of the route:<ul><li>Index: A number that represents the leg's order in the route</li><li>LengthInMeters: The length of the leg in meters</li><li>TravelTimeInSeconds: The expected travel time of the leg in seconds</li><li>StartLabel: The label of the leg's starting point</li><li>StartLatitude: The latitude of the leg's starting point</li><li>StartLongitude: The longitude of the leg's starting point</li><li>StartAddress: The address of the leg's starting point</li><li>EndLabel: The label of the leg's ending point</li><li>EndLatitude: The latitude of the leg's ending point</li><li>EndLongitude: The longitude of the leg's ending point</li><li>EndAddress: The address of the leg's ending point</li></ul><li>OrderedWaypoints: A table that describes each waypoint after the waypoints are ordered:<ul><li>Index: A number that represents the waypoint's order in the route</li><li>Label: The label of the waypoint</li><li>Latitude: The latitude of the waypoint</li><li>Longitude: The longitude of the waypoint</li><li>Address: The address of the waypoint</li></ul></ul> | Object | Not applicable (output property only)

### See also

[Interactive map control](./geospatial-component-map.md)

---

## Enter and resolve addresses in maps

Source: [geospatial-component-input-address.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/geospatial-component-input-address)

*Use the address input control in Power Apps to quickly and easily enter accurate addresses.*

# Use the address input control to easily enter addresses

Entering addresses can be frustrating and error-prone, particularly in mobile apps. Use the address input control to make address entry easier. The control uses fuzzy logic to suggest potential matches as you type. Select the one you want to quickly and easily enter an accurate address.

The control returns the address as structured data. Your app can extract information such as city, street, municipality, and even latitude and longitude coordinates. The data is in a format that's friendly to many locales and international address formats.

## Prerequisites

Before you can use the control in your apps, you'll need to [enable geospatial features for the environment](geospatial-overview.md#enable-geospatial-features-for-the-environment). Make sure you also [review the prerequisites for using geospatial controls](geospatial-overview.md#prerequisites-for-full-support). Refer to the [privacy and security table](geospatial-overview.md#privacy-and-security-considerations) for more details on the address input control's data usage.

## Add an address input control to your app

With your app open for [editing](./edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open the **Insert** tab and expand **Input**.
1. Select **Address input** to place an address input box in the app screen, or drag the control to the screen to position it more precisely. You must enter at least three characters including one number for the address input control.

## Set a default search radius

By default, the control will search around the user's location. You can refine the default search area to help narrow the initial results.

1. On the address input control's **Properties** tab, turn on the **Search within radius** property.
1. Enter a longitude, latitude, and radius in meters.

The control will start searching at the given latitude and longitude, out to the distance specified.

## Use the map control with the address input control

You can add a button to your app to save entered addresses as a data collection. Then you can retrieve the addresses and display them in [the map control](geospatial-component-map.md).

1. Add a map control and an address input control to your app.

1. Insert and place a **Button** control.

1. Change the **OnSelect** property of the button control as follows. (Hint: Copy the formula and paste it in the formula bar or on the **Advanced** properties tab, whichever you prefer.)

1. Enter a longitude, latitude, and radius (in meters).

    The control will start searching at the latitude and longitude, out to the distance specified in the radius field.


    ```power-fx
    If(IsBlank(AddressInput1.SearchResultJson), "", Collect(locations, {Latitude: AddressInput1.SelectedLatitude, Longitude: AddressInput1.SelectedLongitude}))
    ```

    The formula saves the current latitude and longitude to a collection named *locations*, as long as the search results aren't blank.

    :::image type="content" source="./media/geospatial/input-code.png" alt-text="A screenshot of the button under construction in Power Apps Studio, shown with its OnSelect property.":::

1. Select the map control. Change its properties as follows:

    | Property name | Value | Where |
    | - | - | - |
    | Items | "Locations" | **Properties** tab |
    | ItemsLatitudes | "Latitude" | **Advanced** tab |
    | ItemsLongitudes | "Longitude" | **Advanced** tab |

When the user selects the button, the result from the address input control is added to the map as a new pin.

## Properties

Change an address input control's behavior and appearance using properties. Some properties are only available on the **Advanced** tab.

| Property | Description | Type | Tab |
| - | - | - | - |
| Default | Sets the initial value of the control. | String | Properties; Advanced: **[Default](./controls/properties-core.md)** |
| Hint text | Sets the hint that appears in the control before the user enters text. | String | Properties; Advanced: **HintText** |
| Font | Sets the name of the family of fonts used for the control text. | Dropdown list | Properties; Advanced: **[Font](./controls/properties-text.md)** |
| Font size | Sets the size of the control text. | Floating point number | Properties; Advanced: **[FontSize](./controls/properties-text.md)** |
| Font weight | Sets the weight of the control text, either *Bold*, *Lighter*, *Normal*, or *Semibold*. | Dropdown list | Properties; Advanced: **[FontWeight](./controls/properties-text.md)** |
| Text alignment | Sets the horizontal alignment of the control text, either *Center*, *Justify*, *Left*, or *Right*. | Dropdown list | Properties; Advanced: **[TextAlignment](./controls/properties-text.md)** |
| Line height | Sets the vertical distance between lines of text in the control. | Floating point number |  Properties; Advanced: **[LineHeight](./controls/properties-text.md)** |
| Display mode |  Determines whether the control allows user input (*Edit*), only displays data (*View*), or is disabled (*Disabled*). | Dropdown list | Properties; Advanced: **[DisplayMode](./controls/properties-core.md)** |
| Font style | Sets the style of the control text, either *Italic*, *Underline*, *Strikethrough*, or none. | Dropdown list | Properties; Advanced: **Italic**, **Underline**, **Strikethrough** |
| Search result limit | Sets the number of suggested addresses the control displays. | Integer | Properties; Advanced: **SearchResultLimit** |
| Search within radius | Determines whether the control should suggest addresses within the **Radius** of the **Latitude** and **Longitude**. | Boolean | Properties; Advanced: **SearchWithinRadius** |
| Latitude | Sets the latitude coordinate of the center point used for address suggestions. Requires **Search within radius** to be on. | Floating point number from -90 to 90 | Properties; Advanced: **Latitude** |
| Longitude | Sets the longitude coordinate of the center point used for address suggestions. Requires **Search within radius** to be on. | Floating point number from -180 to 180 | Properties; Advanced: **Longitude** |
| Radius | Sets the radius, in meters, around **Latitude** and **Longitude** to constrain address suggestions. Requires **Search within radius** to be on. | Floating point number | Properties; Advanced: **Radius** |
| Language | Sets the language that address suggestions are returned in. | String | Properties; Advanced: **Language** |
| Country set | Identifies a comma-separated list of countries/regions to constrain address suggestions to, in ISO 3166 alpha-2 format; for example, *US,CA,MX*. | String | Properties; Advanced: **CountrySet** |
| Visible | Shows or hides the control. | Boolean | Properties; Advanced: **[Visible](./controls/properties-core.md)** |
| Padding top | Sets the distance between the control text and the top of the control. | Floating point number | Properties; Advanced: **[PaddingTop](./controls/properties-size-location.md)** |
| Padding bottom | Sets the distance between the control text and the bottom of the control. | Floating point number | Properties; Advanced: **[PaddingBottom](./controls/properties-size-location.md)** |
| Padding left | Sets the distance between the control text and the left edge of the control. | Floating point number | Properties; Advanced: **[PaddingLeft](./controls/properties-size-location.md)** |
| Padding right | Sets the distance between the control text and the right edge of the control. | Floating point number | Properties; Advanced: **[PaddingRight](./controls/properties-size-location.md)** |
 Position | Places the upper-left corner of the control at the screen coordinates specified in *X* and *Y*. | Integer | Properties; Advanced: **[X](./controls/properties-size-location.md)**, **[Y](./controls/properties-size-location.md)** |
| Size | Determines the size of the control using the pixel values provided in *Width* and *Height*. | Integer | Properties; Advanced: **[Width](./controls/properties-size-location.md)**, **[Height](./controls/properties-size-location.md)** |
| Border radius | Determines the corner radius of the control border. | Floating point number | Properties; Advanced: **BorderRadius** |
| [Color](./controls/properties-color-border.md) | Sets the colors of the control text and the control background. | Not applicable | Properties; Advanced: **FillColor**, **TextColor** |
| Border | Determines the style, width, and color of the control border. | Not applicable | Properties; Advanced: **[BorderStyle](./controls/properties-color-border.md)**, **[BorderThickness](./controls/properties-color-border.md)**, **[BorderColor](./controls/properties-color-border.md)** |
| Tab index | Specifies the order the control is selected if the user navigates the app using the Tab key. | Integer | Properties; Advanced: **[TabIndex](./controls/properties-accessibility.md)** |
| Tooltip | Determines the text to display when the user hovers over the control. | String | Properties; Advanced: **[Tooltip](./controls/properties-core.md)** |
| Hover color | Sets the colors of the control text, the control background, and the control border when the user hovers the mouse pointer over it. | Not applicable | Properties; Advanced: **HoverFontColor**, **HoverFillColor**, **HoverBorderColor** |
| Disabled color | Sets the colors of the control text, the control background, and the control border if **DisplayMode** is *Disabled*. | Not applicable | Properties; Advanced: **DisabledFontColor**, **DisabledFillColor**, **DisabledBorderColor** |
| Pressed color | Sets the colors of the control text, the control background, and the control border when the user selects the control. | Not applicable | Properties; Advanced: **PressedFontColor**, **PressedFillColor**, **PressedBorderColor** |
| ContentLanguage | Determines the display language of the control, if it's different from the language that's used in the app. | String | Advanced |
| OnAddressSelect | Contains code that runs when the user selects a suggested address. | Event | Advanced |
| OnChange | Contains code that runs when a control property is changed. | Event | Advanced |

### Output properties

Other properties become available when a user interacts with the address input control. You can use these *output properties* in other controls or to customize the app experience.

| Property | Description |
| - | - |
| UserInput | The text the user typed in the input box |
| SelectedLatitude | The latitude of the address that the user selected |
| SelectedLongitude | The longitude of the address that the user selected |
| SearchResultJson | The search result, based on **UserInput**, displayed as a string in JSON format |
| FreeformAddress | The address that the user selected from the list of suggested addresses |
| LocalName | The name of a geographic area or locality that groups a number of addressable objects for addressing purposes, without being an administrative unit |
| PostalCode | The postal code |
| ExtendedPostalCode | The extended postal code |
| CountryCode | The country code |
| Country | The country/region name |
| CountryCodeISO3 | The country code in ISO alpha-3 format |
| CountrySubdivisionName | The country/region subdivision name |
| StreetName | The street name |
| StreetNumber | The street number |
| Municipality | The municipality |
| MunicipalitySubdivision | The municipality subdivision |
| CountryTertiarySubdivision | The country/region tertiary subdivision |
| CountrySecondarySubdivision | The country/region secondary subdivision |
| CountrySubdivision | The country/region subdivision |

## Other geospatial controls

To visualize and interpret location data, use the **[interactive map](geospatial-component-map.md)** control.

---

## Power Apps visual for Power BI

Source: [powerapps-custom-visual.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/powerapps-custom-visual)

*Procedure and limitations for embedding a canvas app that uses the same data source and can be filtered like other report items in Power BI.*

# Power Apps visual for Power BI

Power BI enables data insights and better decision-making, while Power Apps enables everyone to build and use apps that connect to business data. Using the Power Apps visual, you can pass context-aware data to a canvas app, which updates in real time as you make changes to your report. Now, your app users can derive business insights and take actions from right within their Power BI reports and dashboards.

## Using the Power Apps visual

Let's look at the steps required to use the Power Apps visual in your Power BI report.

1. Power Apps visual is available by default in the Power BI service. If you're using Power BI Desktop and don't see it, you must upgrade to the latest version of Power BI Desktop.

2. Add the Power Apps visual to your report, and set the data fields associated with it.

    ![Select report data.](./media/powerapps-custom-visual/add-visual-set-data.png)

    You can choose an existing app or create one, but the report must be published to the Power BI service and opened in Microsoft Edge or Google Chrome.

3.  If you choose to create an app, you can choose in which environment to create it.

    ![New or existing app.](./media/powerapps-custom-visual/create-new-or-choose-app.png)

    If you choose to use an existing app, the visual prompts you to open the app in Power Apps. The visual then sets up the required components in your app so that Power BI can send data to Power Apps.

    If you create a new app, Power Apps creates a simple app with the required components already set up.

    > [!NOTE]
    > You must create a new app from Power Apps visual in Power BI report for the `PowerBIIntegration.Refresh()` function to be available in the app.

    ![New app.](./media/powerapps-custom-visual/new-app.png)

4. Now in Power Apps Studio, you can use the data fields you set in step 2. The `PowerBIIntegration` object acts like any other Power Apps read-only data source or collection. You can use the object to populate any control, or join and filter with other data sources.

    ![Custom formula.](./media/powerapps-custom-visual/custom-formula.png)

    This formula joins Power BI data with the Customer data source: `LookUp(Customer,Customer_x0020_Name=First(PowerBIIntegration.Data).Customer_Name)`

   The Power BI report and the instance of Power Apps Studio that was launched share a live data connection. While they're both open, you can filter or change the data in your report to see the updated data reflect immediately in your app in Power Apps Studio.

5. After you have completed building or making changes to your app, save and publish the app in Power Apps to see your app in the Power BI report.

6. Once you're satisfied with your changes, make sure to share the app with users of your report and then save your report.

7. You've created a report in which your users can take actions as they gain insights from your data.

    ![Working report.](./media/powerapps-custom-visual/working-report.gif)

    If you need to make changes to an app, open the report in edit mode, select **More options** (**. . .**) on the Power Apps visual and select **Edit**.

    ![Edit app.](./media/powerapps-custom-visual/edit-app.png)

## Limitations of the Power Apps visual

The following limitations apply to the Power Apps visual:

- Only **https** is supported for the Launch function in the Power Apps Visual.
- Power Apps visual is only supported for [Embed for your organization](/power-bi/developer/embedded/embed-organization-app). [Embed for your customers](/power-bi/developer/embedded/embed-customer-app) is not supported.
- The maximum number of records that can be passed from Power BI to Power Apps visual using "PowerBIIntegration" object is limited to 1000.
- Power Apps visual is only supported for [guest users](share-app-guests.md) when the following conditions are met:
  - The canvas app URI (weblink) includes the tenantId of the app in the query string.
  - The Power BI portal authenticates the user, instead of allowing anonymous access. 
  - The canvas app is shared with the guest user attempting to see the contents of the app. 
- Power Apps visual doesn't support multi-level embedding of Power Apps in Sovereign clouds. For example, embedding a Power BI report with Power Apps visual to a SharePoint page, or further embedding that SharePoint page to a Teams channel isn't supported on sovereign clouds.
- If you change the data fields associated with the visual, you must edit the app from within the Power BI service by selecting the ellipsis (...) and then selecting **Edit**. Otherwise, the changes won't be propagated to Power Apps, and the app will behave in unexpected ways.
- The Power Apps visual can't trigger a refresh of Power BI reports and Power BI data sources from within Power BI Desktop. If you write back data from the app to the same data source as the report, your changes won't be reflected immediately in Power BI Desktop. Changes are reflected on the next scheduled refresh.
- The Power Apps visual can't filter the data or send any data back to the report.
- You'll need to share the app separately from your report. Learn about [sharing apps in Power Apps](share-app.md).
- Power BI Report Server doesn't support the Power Apps visual.
- Following limitations apply when using the `PowerBIIntegration.Refresh()` function:
    - You must create a new app from Power Apps visual in Power BI report for this function to be available in the app.
    - You must use a source that supports [DirectQuery](/power-bi/desktop-directquery-data-sources) and the data connection must be created using DirectQuery method.
- Power Apps in Power BI Desktop provides data to Power Apps Studio when creating apps but not while editing. Use Power BI Web to preview the data while editing apps.
- The Power BI mobile app doesn't support microphone control in Power Apps visuals.

> [!NOTE]
> We recommend that you first publish your report to the Power BI service and then create or modify apps.

## Browser support

The following table lists the browser supportability for view, create, and modify actions of the Power Apps visual. Supported browsers and actions are identified by a check mark ( &check; ).

|Browser|View|Create|Modify
|-|-|-|-
|Microsoft Edge|&check;|&check;|&check;
|Google Chrome|&check;|&check;|&check;
|Safari \*|&check;
|Mozilla Firefox
|All other browsers

\* In Safari, you must enable cross site tracking (**Preferences** > **Privacy**, and clear **Prevent cross site tracking**) to view Power Apps visual.

## Accessibility support

To navigate the Power Apps visual using the keyboard, follow these steps:

1. Focus selection on the Power BI Report for the Power Apps visual that you want.
2. Use the **Tab** key on the keyboard until the visual is highlighted.
3. Use the **Ctrl+Right** key on the keyboard to enter the visual.
3. Use the  **Tab** key on the keyboard until the component of the visual you want is selected.

For more information, go to [Power BI Accessibility Documentation](/power-bi/desktop-accessibility)


## Next steps

* Go through a simple [step-by-step tutorial](/power-bi/visuals/power-bi-visualization-powerapp).
* Check out our [video](https://aka.ms/powerappscustomvisualvideo).

---

## Create an app to edit tables in canvas apps

Source: [add-editable-tables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-editable-tables)

*Learn how to build a canvas app interface that lets users add, edit, and search records in a data source directly from the app.*

# Create an app to edit tables in canvas apps

Bringing related data and actions together on one screen lets users get more done without switching between views. Microsoft Excel is a familiar example—you can read and edit data inline in the same grid.

With Power Apps, you can build the same kind of experience on top of any data source, and customize it further to fit your business.

This tutorial builds a sample catalog-management app that combines:

- A **data source** (Microsoft Dataverse in this example; you can use Excel or another connector instead).
- A **form** control to add new records.
- A **gallery** with **text input** controls to display and edit existing records inline.
- A **search** box to filter the gallery.

## Prerequisites

- Access to a [Power Platform environment](/power-platform/admin/environments-overview#types-of-environments).
- Permission to create tables in Microsoft Dataverse.

The tutorial uses a Dataverse table named **Editable tables** with the columns shown below. You can use your own table—just substitute your table and column names in the formulas.

![Dataverse columns for sample table.](./media/add-editable-tables/dataverse-table-columns.png "Dataverse columns for sample table")

To learn more, see:

- [Work with table columns](/powerapps/teams/table-columns)
- [Create a form](/powerapps/maker/model-driven-apps/create-and-edit-forms#create-a-form) and [set the form order](/powerapps/maker/model-driven-apps/control-access-forms#set-the-form-order) for adding new records.

## Step 1: Create a blank canvas app

Create a [blank canvas app](create-blank-app.md) named **Catalog Management app** with the **Tablet** layout.

## Step 2: Add a data source

This tutorial uses a Dataverse table, but the same pattern works with Excel on SharePoint or OneDrive, or any other tabular connector.

1. On the left pane, select **Data** > **Add data**.
1. Select **See all tables**, and then select **Editable tables** (or your own table).

For more information, see [Add a data source](add-data-connection.md#add-a-data-source).

## Step 3: Add a form to create new records

In this step, you add an **Edit form** so users can create new records.

1. On the left pane, select **+ Insert** > **Edit form**.
1. On the **Properties** pane, set **Data source** to your table.
1. Select **Edit fields** to choose the columns to show on the form. Reorder them as needed.
1. Set **Default mode** to **New**.
1. Adjust **Width** and **Height** so the form fills the left half of the canvas.
1. Rename the form to **NewProductForm** so the formulas in this tutorial match what you see on screen.
1. On the left pane, select **+ Insert** > **Button**.
1. Set the button's **Text** property to `"Add product"`.
1. Set the button's **OnSelect** property to:

   ```powerapps-dot
   SubmitForm(NewProductForm);
   NewForm(NewProductForm)
   ```

   - [SubmitForm](functions/function-form.md) saves the new record to your data source.
   - [NewForm](functions/function-form.md) resets the form so users can add another record right away.

## Step 4: Add a gallery as an editable table

Now add a blank vertical gallery on the right half of the canvas. Each row holds one text-input control per column you want to edit.

1. On the left pane, select **+ Insert** > **Layout** > **Blank vertical gallery**.
1. On the **Properties** pane, set the gallery's **Items** property to your table (for example, `'Editable tables'`).
1. Rename the gallery to **ProductGallery**.
1. Resize the gallery to fill the right half of the canvas.
1. Select **Edit** (the pencil icon in the upper-left of the gallery) to enter template-editing mode.
1. On the left pane, select **+ Insert** > **Input** > **Text input**. A new text input appears in the first cell of the gallery template—repeat this for each editable column.
1. Arrange the text inputs side by side across the top of the template so they form a single editable row:

    ![Align blank vertical gallery.](./media/add-editable-tables/align-gallery.png "Align blank vertical gallery")

    Resize the template height so it matches the input height. The gallery now renders one editable row per record.

1. Rename each text input to match its column (for example, **ProductInput**, **SegmentInput**). Named controls make the formulas in the rest of the tutorial easier to follow.
1. For each text input, set its **Default** property to the matching column on `ThisItem`. For example:

   ```powerapps-dot
   ThisItem.Product
   ```

   - [ThisItem](functions/operators.md#thisitem-thisrecord-and-as-operators) refers to the current record being rendered in the gallery.
   - Replace `Product` with each column name as you configure the other inputs.

1. For each text input, set its **OnChange** property to write the user's edit back to the data source. For example, on `ProductInput`:

   ```powerapps-dot
   Patch('Editable tables', ThisItem, { Product: ProductInput.Text })
   ```

   - [Patch](functions/function-patch.md) updates the current record with the new value.
   - Replace `'Editable tables'`, `Product`, and `ProductInput` with your table, column, and control names.

> [!TIP]
> Adjust column widths by dragging the edges of the first row in each column, or by setting the **Width** property directly.

## Step 5: Add edit and cancel controls

By default, the gallery is editable, which can lead to accidental changes. Add an explicit edit toggle so users only edit when they intend to.

1. On the left pane, select **+ Insert** > **Icons**, and add an **Edit** icon and a **Cancel (badge)** icon. Place them where they're easy to find—for example, near the top of the gallery.
1. On the left pane, select **Tree view**, and then select **App**.
1. Set the **App.OnStart** property to:

   ```powerapps-dot
   Set(galleryDisplayMode, DisplayMode.Disabled)
   ```

   This creates a `galleryDisplayMode` variable and sets the gallery to read-only when the app starts. [Set](functions/function-set.md) creates or updates a global variable.

   > [!NOTE]
   > To run **OnStart** immediately so you can test, right-click **App** in the Tree view and select **Run OnStart**.

1. Select **ProductGallery** and set its **DisplayMode** property to:

   ```powerapps-dot
   galleryDisplayMode
   ```

1. Configure the **Edit** and **Cancel** icons:

    | Icon | Property | Formula |
    | --- | --- | --- |
    | Edit | **OnSelect** | `Set(galleryDisplayMode, DisplayMode.Edit)` |
    | Edit | **Visible** | `galleryDisplayMode = DisplayMode.Disabled` |
    | Cancel | **OnSelect** | `Set(galleryDisplayMode, DisplayMode.Disabled)` |
    | Cancel | **Visible** | `galleryDisplayMode = DisplayMode.Edit` |

    Only one icon is visible at a time—**Edit** when the gallery is locked, **Cancel** when it's editable.

1. Place the two icons in the same position. Because their **Visible** properties are mutually exclusive, users see a single toggle.

> [!TIP]
> Press **F5** (or select **Preview** in the upper-right) to test the app. To test a single action without entering full preview, hold **Alt** and select the control.

## Step 6: Add a search box

As your data grows, finding a specific record gets harder. A search box filters the gallery in real time.

1. On the left pane, select **+ Insert** > **Input** > **Text input**, and place it above the gallery.
1. Rename it to **SearchInput**, and clear its **Default** property.
1. Set **SearchInput.HintText** to `"Search products or segments"`.
1. Update **ProductGallery.Items** to filter on the search text:

   ```powerapps-dot
   If(
       IsBlank(SearchInput.Text),
       'Editable tables',
       Filter(
           'Editable tables',
           SearchInput.Text in Product || SearchInput.Text in Segment
       )
   )
   ```

   - [If](functions/function-if.md) returns the full table when the search box is empty, or the filtered results otherwise.
   - [IsBlank](functions/function-isblank-isempty.md) detects an empty search box.
   - [Filter](functions/function-filter-lookup.md) returns rows that match the criteria.
   - The `in` operator does a case-insensitive substring match.
   - `||` is the logical **OR** operator. Add or remove columns to fit your scenario.

> [!TIP]
> You can comment out parts of a formula with `//` to keep the original logic available while you experiment.

## Step 7: Polish with branding, profile info, and a reset button

The app already works. These optional touches make it feel more complete. Apply them with the same control-and-property pattern used in earlier steps.

| Capability | Control | Properties | Notes |
| --- | --- | --- | --- |
| App title bar | **Text label** | **Text** `"Admin Catalog Management"`; **Font size** `28`; **Color** blue; **Align** center | Customize values as needed. |
| User display name | **Text label** | **Text** `Office365Users.MyProfileV2().displayName` | Requires the [Office 365 Users](connections/connection-office365-users.md) connector. |
| User profile photo | **Image** | **Image** `Office365Users.UserPhotoV2(Office365Users.MyProfileV2().userPrincipalName)` | Requires the [Office 365 Users](connections/connection-office365-users.md) connector. |
| Reset the search box | **Reload** icon | **OnSelect** `Reset(SearchInput)` | Clears the search box so the gallery shows all rows. |
| Section heading above gallery | **Text label** | **Text** `"Current products"`; **Font size** `16`; **Font weight** bold | Customize as needed. |

For example, the finished app looks like this:

![Final version of app with all controls and properties configured.](./media/add-editable-tables/final-app.png "Final version of app with all controls and properties configured")

## Step 8: Save, publish, and share

[Save and publish](save-publish-app.md) your app, then share it [within your organization](share-app.md) or with [guests](share-app-guests.md).

## See also

- [Add and configure controls in canvas apps](add-configure-controls.md)
- [Control reference](reference-properties.md)
- [Working with formulas](working-with-formulas.md)

---

## Show, sort, and filter data in a canvas app gallery

Source: [show-images-text-gallery-sort-filter.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/show-images-text-gallery-sort-filter)

*Learn how to use a gallery to display data, and how to sort and filter data in a canvas app gallery.*

# Show, sort, and filter data in a canvas app gallery

Create a gallery to show data about several products, and sort and filter that information.

In Power Apps, use a gallery to show several related items, much like a product catalog. Galleries are great for displaying product names, prices, and unit counts. In this article, you create a gallery and sort and filter the information using Power Fx functions. When an item is selected, a border highlights it.

> [!NOTE]
> This article uses a tablet app layout. You can follow the same steps in a phone app, but you might need to resize some controls to fit the screen.

## Prerequisites

- [Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) using the same credentials that you used to sign up.
- Create a tablet app from a [template](get-started-test-drive.md) or [from scratch](get-started-create-from-blank.md).
- Learn how to [configure a control](add-configure-controls.md).

## Show data in a gallery

1. Create a collection named **Inventory** by adding a **Button** control and setting its **OnSelect** property to the following formula:

   ```powerapps-dot
   ClearCollect(
       Inventory,
       { ProductName: "Europa",    UnitsInStock: 25 },
       { ProductName: "Ganymede",  UnitsInStock: 32 },
       { ProductName: "Callisto",  UnitsInStock: 12 },
       { ProductName: "Io",        UnitsInStock: 47 },
       { ProductName: "Titan",     UnitsInStock: 18 }
   )
   ```

1. Select the button while holding the **Alt** key (or select **Preview** and then the button) to populate the **Inventory** collection with five products, each with a product name and a unit count.

   > [!NOTE]
   > This article uses a small inline collection so you can follow along without external data. For production scenarios, connect to a real data source such as [SharePoint](connections/connection-sharepoint-online.md) or [Microsoft Dataverse](connections/connection-common-data-service.md).

1. On the **Insert** tab, select **Layout** > **Horizontal gallery**.

1. In the right-hand pane, select a layout that shows a title and subtitle.

1. Set the **Items** property of the gallery to **Inventory**.

1. Rename the gallery to **ProductGallery** and resize it to show three products at once.

1. Select the bottom label in the first gallery item.

   > [!NOTE]
   > When you change the first item in a gallery, the same change automatically applies to all other items.

1. Set the **Text** property of the label to:

   ```powerapps-dot
   ThisItem.UnitsInStock
   ```
   
The label now shows the number of units in stock for each product.

   > [!TIP]
   > You can bind any label to any field in your collection. For example, use `ThisItem.ProductName` or `ThisItem.Price` if those fields exist in your data source.

## Highlight the selected gallery item

1. Select any gallery item *except* the first one, then select the edit (pencil) icon in the upper-left corner to enter template editing mode.

1. On the **Insert** tab, select **Shapes** > **Rectangle**. A solid rectangle appears in each gallery item.

1. On the **Properties** pane, set **Color** to **No fill** (transparent).

1. Under **Border**, set the style dropdown to **Solid** and the thickness value to **3**.

1. Resize the rectangle to surround the gallery item contents.

1. Set the **Visible** property of the rectangle to:

   ```powerapps-dot
   ThisItem.IsSelected
   ```
   
The blue border now appears only around the selected item.

   > [!TIP]
   > If the border overlaps content, select the rectangle and choose **Reorder** > **Send to Back** to move it behind other controls.

## Sort and filter items in the gallery

### Sort in ascending or descending order

1. Select any gallery item *except* the first one to update the gallery's **Items** property.

1. Change the **Items** property to sort by product name in ascending order:

   ```powerapps-dot
   Sort(Inventory, ProductName)
   ```

1. To sort in descending order, change the **Items** property to:

   ```powerapps-dot
   Sort(Inventory, ProductName, SortOrder.Descending)
   ```

### Filter items with a slider and text input

1. On the **Insert** tab, select **Input** > **Slider**. Rename the slider to **StockFilter** and position it below the gallery.

1. Set the slider's range to match the data:
   - Set **Min** to: `Min(Inventory, UnitsInStock)`
   - Set **Max** to: `Max(Inventory, UnitsInStock)`

1. Select any gallery item *except* the first one and set the **Items** property to:

   ```powerapps-dot
   Filter(Inventory, UnitsInStock <= StockFilter.Value)
   ```

1. Select **Preview** (F5) and adjust the slider to see the gallery filter products by stock quantity.

1. To also filter by product name, add a **Text input** control (on the **Insert** tab, select **Input** > **Text input**), rename it **NameFilter**, and place it below the slider.

1. Update the **Items** property to combine both filters:

   ```powerapps-dot
   Filter(Inventory, UnitsInStock <= StockFilter.Value && NameFilter.Text in ProductName)
   ```

1. In **Preview**, set the slider to **30** and type **g** in the text input. The gallery shows only products with 30 or fewer units in stock *and* a product name containing the letter "g".

## Tips and tricks

- Select the preview button (F5) at any time to test what you've built.
- You can resize and reposition controls using drag-and-drop.
- Press **Esc** or select **X** to close the preview window.
- To change all items in a gallery at once, select the *first* item in the gallery.
- To update gallery-level properties (such as **Items** or **ShowScrollbar**), select any item *except* the first one.

## Summary

In this article, you:

- Created a collection with sample product data.
- Displayed collection data in a horizontal gallery.
- Configured labels to show field values from each record.
- Added a selection border around the active gallery item.
- Sorted gallery items by product name in ascending and descending order.
- Used a slider and text input to filter products by stock quantity and name.

---

## Use modern themes in canvas apps

Source: [modern-theming.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-theming)

*Learn how to create, customize, and apply modern themes in Power Apps canvas apps. Streamline app styling with Fluent design and consistent visual appeal.*

# Use modern themes in canvas apps

Modern themes are preestablished style sets that transform the look of your canvas app in Power Apps. These themes, based on Microsoft's Fluent design language, modify various style aspects such as color, typography, borders, and shadows, ensuring a visually pleasing interface that streamlines app development.

Modern themes enable makers to effortlessly design apps with unified and consistent visual appeal, reducing customization time while maintaining professional aesthetics.

## Prerequisites

Enable the modern themes feature in the settings of an app:

1. Open your app or create a new app.
1. From your app, open **Settings** from the app authoring menu or [modern command bar](../../power-apps-studio.md#1--power-apps-studio-modern-command-bar).
1. Go to **Updates** > **New** > **Modern controls and themes**.
1. Set the **Modern controls and themes** toggle to **On**.
1. Close the **Settings** popup.

For more information, see [Enable modern controls and themes for your app](overview-modern-controls.md#enable-modern-controls-and-themes-for-your-app).

> [!NOTE]
> When you enable modern controls and themes, you can't select classic themes from the command bar. To use *retired* classic themes, go to **Retired** > **Keep classic themes** in **Updates** and toggle it to **On**.

## Create a theme

Use the available themes to style your app. Or, design your own theme for a more personalized visual aesthetic. You can also paste a theme from YAML format.

1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.
1. On the **Themes** pane, select **Add a theme**.
1. Select **Create custom theme** to design a new theme, or select **Paste theme** to import a theme from YAML format. For more information about pasting themes, see [Copy and paste themes](#copy-and-paste-themes).

   The **Create a theme** dialog appears.

    :::image type="content" source="media/create-custom-theme.png" alt-text="Screenshot showing the Create a theme user interface.":::

1. In the **Create a theme** dialog, choose or enter the following information:

   | Feature | Action or description |
   |---------|-------------|
   | Primary (seed) color | Choose a color from the color picker. You can, alternatively, enter the hexadecimal or RGB manually. |
   | Lock primary color (preview) | The 16-slot theme palette is generated using the seed color. <br>- Toggled off: The 16-slot palette is optimized for accessibility. Toggled off is the default option. <br>- Toggled on: The seed color is placed in the primary (middle) slot of the palette. The remaining colors are generated by making the colors incrementally lighter on one side and darker on the other side. The generated palette might not meet contrast ratio accessibility requirements. |
   | Theme name | Enter a unique theme name. |
   | Font | Choose your default font used by the controls in the app. |
   | Torsion | Impacts the tint, shade, or tone of the palette. Torsion isn't applicable if you choose **Lock primary color**. |
   | Vibrancy | Impacts the muteness or brightness of the palette. Vibrancy isn't applicable if you choose **Lock primary color**. |
   | Palette overrides | Override the color used for one or more slots in the palette by selecting a slot and choosing a new color. Select **Reset** to return to the generated value for that slot.  |

   You can also look at a static preview of your new theme. Interact with the sample controls to see how your theme is applied to the rest state and various interaction states.

   :::image type="content" source="media/preview-option.png" alt-text="Screenshot showing the Preview section of the pane when you create or edit a theme. ":::

1. Select **Create**. Your new theme is created and applied to your app.

## Copy and paste themes

You can copy and paste themes in YAML format to duplicate themes within your app or share them across different apps. This approach makes it easy to maintain consistent branding across multiple applications or back up your custom theme configurations.

### Copy a theme

To copy a theme's YAML definition:

1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.
1. On the **Themes** pane, locate the theme you want to copy.
1. Select the **More options** (...) button on the theme card, and then select **Copy theme**.
   
   :::image type="content" source="media/copy-a-theme.png" alt-text="Screenshot that shows the location of the copy theme selector.":::

The theme definition is copied to your clipboard in YAML format.

### Paste a theme

To paste a theme from YAML:

1. Copy a valid theme YAML definition to your clipboard.
1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.
1. On the **Themes** pane, select **Add a theme**.
1. Select **Paste theme**.
 
   :::image type="content" source="media/paste-a-theme.png" alt-text="Screenshot showing the location of the ellipses points where you can paste a theme.":::

The new theme is created and appears in your themes list with the name specified in the YAML. If a theme with the same name already exists, the pasted theme is automatically renamed to avoid conflicts.

### YAML format

Theme definitions use the following YAML structure:

```yaml
Themes:
  Theme Name:
    Font: "'Segoe UI', 'Open Sans', sans-serif"
    BasePaletteColor: '#2e4bf0'
    HueTorsion: -27
    Vibrancy: -52
    ColorOverrides:
      Lighter30: '#bd3535'
      Darker10: '#1a2d8f'
```

The following table describes each property in the YAML format:

| Property | Description | Required |
|----------|-------------|----------|
| Theme Name | The display name for your theme. Must be unique within the app. | Yes |
| Font | CSS font family specification. Use standard web font names. | Yes |
| BasePaletteColor | The seed color for palette generation in hex format (for example, '#2e4bf0'). This color determines the base for all 16 color slots. | Yes |
| HueTorsion | Adjusts the hue rotation of generated colors. Range: -100 to 100. Negative values shift toward cooler tones, positive values toward warmer tones. | Yes |
| Vibrancy | Adjusts the saturation and brightness. Range: -100 to 100. Negative values create more muted colors, positive values create more vibrant colors. | Yes |
| ColorOverrides | Optional overrides for individual color slots (Lighter30, Lighter20, Lighter10, Base, Darker10, Darker20, Darker30, Darker40). Specify only the colors you want to customize. | No |

### Example: Share a corporate brand theme

This example shows a theme configured with corporate brand colors:

```yaml
Themes:
  Corporate Brand:
    Font: "'Segoe UI', 'Open Sans', sans-serif"
    BasePaletteColor: '#0078d4'
    HueTorsion: 0
    Vibrancy: 10
    ColorOverrides:
      Base: '#0078d4'
      Darker10: '#106ebe'
      Darker20: '#005a9e'
      Lighter10: '#2b88d8'
      Lighter20: '#c7e0f4'
```

To use this theme in another app:

1. Copy the YAML code.
1. Open the target app in Power Apps Studio.
1. In the **Themes** panel, select **Add a theme** > **Paste theme**.

The Corporate Brand theme is now available in your app.

### Tips for using copy and paste with themes

- **Save themes externally**: Copy and save your custom themes to a text file or documentation system for backup and version control.
- **Share across teams**: Share theme YAML definitions with team members to ensure consistent branding across multiple apps.
- **Duplicate and modify**: To create theme variations, copy an existing theme, paste it, then modify the YAML properties rather than starting from scratch.
- **Font availability**: When pasting themes across apps or organizations, ensure the specified font families are available and properly licensed.
- **Minimal overrides**: For easier maintenance, only specify `ColorOverrides` for colors that must differ from the generated palette. Let the `BasePaletteColor`, `HueTorsion`, and `Vibrancy` properties handle the rest.
- **Test accessibility**: After pasting a theme, test it on both desktop and mobile views to ensure color contrast and readability meet accessibility standards (WCAG 2.1 AA minimum).

## Apply modern theme

1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.
1. On the **Themes** pane, select one of the default themes.
1. If you have classic controls in your app, you're prompted to apply the modern theme to these controls. You can always select **Undo** from the command bar if you don't like the theme.
   > [!NOTE]
   > When you choose to apply modern themes to classic controls, Power Fx formulas are set on properties of the impacted controls that reference variables from the modern theme. Visually, classic controls might not align exactly with their modern control counterparts, as the classic controls aren't based on Fluent v9.

When you select a modern theme, the style of the theme automatically applies to the controls in your app. This action sets the **App.Theme** property.

## Edit a theme

You can edit a theme and change one or more parameters of the custom theme.

1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.

1. On the **Themes** pane, find the tile of the theme you want to edit. Select the overflow menu and then select **Edit**.

   :::image type="content" source="media/edit-a-theme.png" alt-text="Screenshot showing the location of the ellipses points where you can select Edit.":::

1. On the **Edit theme** pane, adjust the theme as needed.
1. Select **Save** or cancel out of the dialog.

> [!NOTE]
> You can't edit default themes. Changes that you make through the visual theme editor update the underlying YAML properties. If you copy, modify, and re-paste a theme's YAML, those changes appear in the visual editor and anywhere the theme is applied.

## Delete a theme

If you no longer need a custom theme in your app, you can delete it.

1. On the app authoring menu, select ![Themes icon](media/theme-icon.png) **Themes**.
1. On the **Themes** pane, find the theme that you want to delete, select the overflow menu, and then select **Delete**.
1. On the confirmation dialog box, select **Delete theme**.

If your app has any Power Fx formulas that reference this theme, you need to manually update the formula.

> [!NOTE]
> You can't delete built-in themes.

> [!TIP]
> Before deleting a custom theme, consider copying its YAML definition for backup. You can easily restore the theme later by pasting the YAML.

## Use themes with Power Fx

Makers can use modern theme objects through Power Fx. Reference the currently active theme object by using **App.Theme**. Reference any theme loaded into the app by its instance name, such as **RedTheme**. To ensure that the color selections adapt to theme changes, reference the theme object by using **App.Theme**.

Each theme object includes the following information:

- **Name** of the theme
- **Colors**, a 16-color brand ramp collection that you can access individually by name; **Primary foreground color** is the default text color, such as the color of text on a background
- **Font** used in the theme

The following image shows the slot variables inside the **Colors** collection and, as an example, the corresponding colors for the **Steel** theme.

:::image type="content" source="media/modern-themes-color-ramp.png" alt-text="Screenshot that shows the slot variables and 16-part color brand ramp for the steel theme.":::

By using the theme brand ramp, you can manually style a classic control based on the current modern theme. For example, set `Button.Fill = App.Theme.Colors.Primary`.

> [!NOTE]
> To provide feedback, see: [Provide your feedback to Microsoft](overview-modern-controls.md#provide-feedback-to-microsoft).
>

## See also

[Modern controls blog post](https://go.microsoft.com/fwlink/?linkid=2229189)
[Using modern themes with Power Apps (video)](https://youtu.be/xuyR2BikwyQ?feature=shared)

---

