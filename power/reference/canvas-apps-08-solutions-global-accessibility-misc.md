# Power Apps Canvas Apps — Solutions, Relational Data, Global/Multi-language Apps, Accessibility & Misc

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 20

## Contents

1. [Create a canvas app from within a solution](#create-a-canvas-app-from-within-a-solution)
2. [Add canvas apps and cloud flows to a solution by default](#add-canvas-apps-and-cloud-flows-to-a-solution-by-default)
3. [Install Northwind Traders database and apps](#install-northwind-traders-database-and-apps)
4. [Overview of the canvas app for Northwind Traders](#overview-of-the-canvas-app-for-northwind-traders)
5. [Create an order gallery in a canvas app](#create-an-order-gallery-in-a-canvas-app)
6. [Create a summary form in a canvas app](#create-a-summary-form-in-a-canvas-app)
7. [Create a detail gallery in a canvas app](#create-a-detail-gallery-in-a-canvas-app)
8. [Build global support into canvas apps](#build-global-support-into-canvas-apps)
9. [Build a multi-language app](#build-a-multi-language-app)
10. [Create accessible canvas apps](#create-accessible-canvas-apps)
11. [Organize controls in accessible canvas apps](#organize-controls-in-accessible-canvas-apps)
12. [Improved canvas keyboard navigation in canvas apps (experimental)](#improved-canvas-keyboard-navigation-in-canvas-apps-experimental)
13. [Accessible colors for canvas apps](#accessible-colors-for-canvas-apps)
14. [Show or hide content from assistive technologies for canvas apps](#show-or-hide-content-from-assistive-technologies-for-canvas-apps)
15. [Announce dynamic changes with live regions for canvas apps](#announce-dynamic-changes-with-live-regions-for-canvas-apps)
16. [Review a canvas app for accessibility in Power Apps](#review-a-canvas-app-for-accessibility-in-power-apps)
17. [Accessibility limitations in canvas apps](#accessibility-limitations-in-canvas-apps)
18. [Send notification from an app](#send-notification-from-an-app)
19. [Disconnect Git version control to edit canvas apps](#disconnect-git-version-control-to-edit-canvas-apps)
20. [Understand New, Preview, Experimental, and Retired features in canvas apps](#understand-new-preview-experimental-and-retired-features-in-canvas-apps)

---

## Create a canvas app from within a solution

Source: [add-app-solution.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-app-solution)

*In Power Apps, create a canvas app in a solution so that you can deploy the app to another environment.*

# Create a canvas app from within a solution

Create an app from within a solution if, for example, you want to deploy the app to a different environment. Solutions can contain not only apps but also customized tables, choices, and other components. You can quickly customize an environment in a variety of ways by creating apps and other components from within a solution, exporting the solution, and then importing it into another environment.

For more information about solutions, see [Solutions overview](../data-platform/solutions-overview.md).

## Prerequisite

To follow the steps in this topic, you must switch to an environment that contains a Microsoft Dataverse database.

> [!NOTE]
> To use or run a flow in a canvas app that is included in a [solution](../data-platform/solutions-overview.md), you must be assigned a Dataverse security role with the Read privilege on the [Process (Workflow)](../../developer/data-platform/reference/entities/workflow.md) table. For more information about security roles and privileges in Dataverse, see [Security roles and privileges](/power-platform/admin/security-roles-privileges).

## Create a solution

You can skip this procedure if you already have a solution in which you want to create an app or to which you want to link an app.

1. [Sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) to Power Apps, and then (if necessary) switch to the appropriate environment:

    - If you want to create an app from within a solution, switch to any environment that contains a Dataverse database.
    - If you want to link an existing app to a solution, switch to the environment that contains that app.

1. In the left navigation bar, select **Solutions**.

    > [!div class="mx-imgBorder"]
    > ![Solutions option in the left navigation bar.](./media/add-app-solution/left-nav.png "Solutions option in the left navigation bar")

1. In the banner under the title bar, select **New solution**.

    > [!div class="mx-imgBorder"]
    > ![New-solution option in the banner.](./media/add-app-solution/banner-new-solution.png "New-solution option in the banner")

1. In the window that appears, specify a display name, a publisher, and a version for your solution.

    > [!div class="mx-imgBorder"]
    > ![Options for a new solution.](./media/add-app-solution/configure-new-solution.png "Options for a new solution")

    A name (with no spaces) will be generated automatically based on the display name that you specify, but you can customize the generated name if you want. You can specify the default publisher for your environment and **1.0** for the version if you don't have specific needs in those areas.

1. Near the upper-left corner, select **Save and Close**.

    > [!div class="mx-imgBorder"]
    > ![Save a new solution.](./media/add-app-solution/save-new-solution.png "Save a new solution")

## Create a canvas app in a solution

You can create a blank canvas app from within a solution. You can't automatically generate a three-screen app or customize a template or sample app from within a solution.

1. [Sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) to Power Apps.

1. If necessary, switch to the environment that contains the solution in which you want to create a canvas app.

1. In the left navigation bar, select **Solutions**.

    > [!div class="mx-imgBorder"]
    > ![Solutions option in the left navigation bar.](./media/add-app-solution/left-nav.png "Solutions option in the left navigation bar")

1. In the list of solutions, select the solution in which you want to create a canvas app.

1. In the banner under the title bar, select **New** > **App** > **Canvas app**, and then select the form factor (phone or tablet) of the app that you want to create.

    > [!div class="mx-imgBorder"]
    > ![Options to create an app in a solution.](./media/add-app-solution/new-option.png "Options to create an app in a solution")

    Power Apps Studio opens with a blank canvas in another browser tab.

1. Create your app (or make at least one change), and then save your changes.

1. On the browser tab where you selected your solution, select **Done** to refresh the list of components in your solution.

    > [!div class="mx-imgBorder"]
    > ![Done button.](./media/add-app-solution/done-button.png "Done button")

    Your new app appears in the list of components for that solution. If you save any changes to your app, they will be reflected in the version that's in the solution.

## Add an existing canvas app to a solution

If you want to add an app to a solution, both must be in the same environment, and the app must have been created from within a solution.

1. [Sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) to Power Apps.

1. If necessary, switch to the environment that contains the solution to which you want to link an app.

1. In the left navigation bar, select **Solutions**.

    > [!div class="mx-imgBorder"]
    > ![Solutions option in the left navigation bar.](./media/add-app-solution/left-nav.png "Solutions option in the left navigation bar")

1. In the list of solutions, select the solution to which you want to link an app.

1. In the banner under the title bar, select **Add existing** > **App** > **Canvas app**.

    > [!div class="mx-imgBorder"]
    > ![Banner options to link an existing app.](./media/add-app-solution/add-existing.png "Banner options to link an existing app")

    A list of canvas apps that were created within a solution in this environment appears.

1. In the list of apps, select the app that you want to link to the solution, and then select **Add**.

    > [!div class="mx-imgBorder"]
    > ![Add button.](./media/add-app-solution/add-button.png "Add button")

## Known limitations

For information about known limitations, see [Solutions overview](../data-platform/solutions-overview.md#known-limitations). 

## Next steps

- Create or link more apps and [other components](/powerapps/maker/canvas-apps/solutions-overview), such as tables, flows, and dashboards, to your solution.
- [Export your solution](../data-platform/import-update-export-solutions.md) so that you can deploy it to another environment, on Marketplace, and so forth.

### See also

[Add canvas apps to solution by default (preview)](add-app-solution-default.md)

---

## Add canvas apps and cloud flows to a solution by default

Source: [add-app-solution-default.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-app-solution-default)

*Learn how to configure an environment to add new canvas apps and cloud flows to a solution by default.*

# Add canvas apps and cloud flows to a solution by default

You can [create a canvas app in a solution](add-app-solution.md) in Power Apps or [create a cloud flow in a solution](/power-automate/create-flow-solution) in Power Automate. Creating a canvas app or a cloud flow in a solution previously required manual steps. Now you can create them in a solution by default.

Because canvas apps and cloud flows in a solution are defined in Microsoft Dataverse, you can use Dataverse capabilities to manage them, including [connection references](/power-apps/maker/data-platform/create-connection-reference), [environment variables](/power-apps/maker/data-platform/environmentvariables), the [Dataverse API](/power-apps/developer/data-platform/webapi/overview), [role-based security](/power-platform/admin/database-security#environments-with-a-dataverse-database), and solution-based [application lifecycle management (ALM)](/power-platform/alm).

> [!IMPORTANT]
> - The canvas apps setting is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://www.microsoft.com/en-us/business-applications/legal/supp-powerplatform-preview/), and are available before an official release so that customers can get early access and provide feedback.

## Prerequisites

- Solutions are stored in Dataverse, so the environment must have a Dataverse database to use this feature. If yours doesn't, [add a Dataverse database](/power-platform/admin/create-database).
- To create canvas apps in solutions, you must have **write** privileges to the [CanvasApp table](../../developer/data-platform/reference/entities/canvasapp.md). To create cloud flows in solutions, you should have the [Environment Maker role](/power-platform/admin/database-security#predefined-security-roles). Learn more in [Security roles and privileges](/power-platform/admin/security-roles-privileges).
- A canvas app or cloud flow in a solution must be shared with you before you can view or edit it.

> [!IMPORTANT]
> Before you enable the creation of canvas apps and cloud flows in solutions by default, review the [Considerations](#considerations) section in this article.

## Supported creation methods and entry points

Several methods and entry points are available for creating canvas apps and cloud flows.

### Canvas apps creation methods and entry points

The following table summarizes the methods that allow you to create canvas apps in a solution by default.

| Method | Available for canvas apps in a solution by default? |
| --- | --- |
| [Create a canvas app from Dataverse](data-platform-create-app.md) | Yes |
| Create a canvas app from other data sources, such as [SharePoint](app-from-sharepoint.md), [Excel](get-started-create-from-data.md), [Azure Blob Storage](connections/connection-azure-blob-storage.md), and [others](connections-list.md#popular-connectors) | Yes |
| [Create a blank canvas app](create-blank-app.md)</br> **NOTE**: [Power Apps](https://make.powerapps.com) > **Apps** > **New app** > **Canvas** also creates a blank canvas app. | Yes |
| [Create a canvas app from a template](get-started-test-drive.md) | No |
| Create a canvas app by [customizing SharePoint forms](/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form) | No |

### Cloud flows creation methods and entry points

The following table summarizes the methods that allow you to create cloud flows in a solution by default.

| Method | Available for cloud flows in a solution by default? |
| --- | --- |
| [Create a cloud flow from blank in a portal](/power-automate/get-started-logic-flow) | Yes |
| [Create a cloud flow from a template in a portal](/power-automate/get-started-logic-template) | Yes |
| Create a cloud flow from Power Automate Management connector | Yes |
| Create a cloud flow from PowerShell | Yes |
| Create a cloud flow from Power Apps | Yes |
| [Create a cloud flow from Teams](/power-automate/teams/teams-app-create) | Yes |
| [Create a cloud flow from OneDrive](/power-automate/onedrive-business-launch-panel) | Yes |
| Create a cloud flow from Dynamics 365 | Yes |
| [Create a cloud flow from the Excel add-in](/business-applications-release-notes/april18/microsoft-flow/build-run-flows-excel) | Yes |
| [Create a cloud flow from the Power Automate mobile app](/power-automate/mobile/mobile-create-flow) | Yes |
| [Create a cloud flow from SharePoint](https://support.microsoft.com/office/create-a-flow-for-a-list-or-library-a9c3e03b-0654-46af-a254-20252e580d01) | Yes |
| Create a cloud flow from Project Roadmap | Yes |

> [!IMPORTANT]
> Unsupported entry points will fail to create any cloud flow until that support is added to create a solution cloud flow with that entry point. You must first create a cloud flow in a solution using a supported method.

## Manage feature settings for Cloud flows and Canvas apps in Dataverse solutions

You can control whether makers can create new canvas apps and cloud flows directly in Dataverse solutions.

### Existing environments
1. Sign in to the Power Platform admin center and select an environment.  
2. Go to **Settings** > **Product** > **Features**.  
3. Under **Create new canvas apps and cloud flows in Dataverse solutions**, turn on **Canvas apps (Preview)** or **Cloud flows** as desired.  

### New environments
- All new environments provisioned with a Dataverse database have the **Cloud flows** setting enabled by default.  
- The **Canvas apps (Preview)** setting is also enabled by default, though it remains in preview.  
- If you prefer not to use these features, you must manually disable them in the environment settings.  

Learn more about managing feature settings in [Manage feature settings](/power-platform/admin/settings-features).

## View canvas apps and cloud flows in solutions

To view canvas app and cloud flow objects in a solution, use the [solution view](../data-platform/solutions-area.md). You must have access to the object added inside a solution to view it in a solution view.

## Export and import using solutions

Once the feature is enabled, use solutions [export](../data-platform/export-solutions.md) and [import](../data-platform/import-update-export-solutions.md) instead of [exporting and importing legacy packages of canvas apps and flows](export-import-app.md). Legacy packages can be imported in environments with the environment setting turned off.

## Move flows into a solution with PowerShell

Use the [Add-AdminFlowsToSolution](/powershell/module/microsoft.powerapps.administration.powershell/add-adminflowstosolution) cmdlet to move non-solution Power Automate flows into a solution for better lifecycle management and deployment. This command lets you migrate multiple flows by specifying environment and solution IDs, and targeting flows by name or ID. For more information, see [Microsoft.PowerApps.Administration.PowerShell Module](/powershell/module/microsoft.powerapps.administration.powershell).

## Considerations

Take the following considerations into account before you decide to create canvas apps and cloud flows in a solution by default.

- Your Dataverse environment capacity consumption and related cost might increase.
- Known solution limitations related to canvas apps still apply to canvas apps created in solutions by default.
- This feature automatically creates environment variables when you add data sources for your apps.
- By default, this feature saves all canvas apps to the default solution, **Common Data Services Default Solution**, published by **Microsoft Dataverse Default Publisher**. However, we recommend that you save your canvas apps to a different solution. [Learn more about adding existing canvas apps to solutions](add-app-solution.md#add-an-existing-canvas-app-to-a-solution).
- When you turn the feature on or off for canvas apps and cloud flows in the Power Platform admin center, the Dataverse properties `enablecanvasappsinsolutionsbydefault` and `enableFlowsInSolutionByDefault` in the organization table are updated. You can view the value of these properties using the following sample ODATA snippet: `[org URI]/api/data/v9.0/organizations`. Learn more in [Organization table reference](/power-apps/developer/data-platform/reference/entities/organization).
- If you're planning to change the prefix for the default publisher or solution for your environment, you can learn more in [Solution publisher prefix](/power-platform/alm/solution-concepts-alm#solution-publisher-prefix), [Create solution publisher prefix](../data-platform/create-solution.md#create-a-solution-publisher) and [Change solution publisher prefix](../data-platform/create-solution.md#change-a-solution-publisher).
- Non-solution canvas apps and non-solution cloud flows can be added into a solution to add them into Dataverse, but there's no way to revert back.

## Improvements

The following scenarios were improved to support cloud flows and canvas apps defined in Dataverse:

- The **Monitor** > **Cloud flow activity** page now supports solution cloud flows.
- The [List My Flows API](/connectors/flowmanagement/#list-my-flows) doesn't return any solution cloud flows.
- [Audit log events for cloud flow permissions](/power-platform/admin/logging-power-automate#see-audited-events) that provide visibility into sharing now include solution cloud flows.
- The [List Flows as Admin API](/connectors/flowmanagement/#list-flows-as-admin) now returns solution cloud flows that weren't previously turned on (published). This API now returns all non-solution and solution cloud flows.
- Flows with delegated authentication to Roadmap can be added into a solution and migrated to Dataverse.
- Flows with delegated authentication to SharePoint can be added into a solution and migrated to Dataverse.

## Is this feature generally available or preview?

As of October 29, 2024, the cloud flows setting is generally available. The canvas apps setting remains in preview.

The cloud flows setting continues to be off by default and optional.

## Does putting flows into Dataverse use Dataverse capacity?

Moderately. Flow definitions use a small amount of Dataverse storage. A large flow definition could reach 10 KB. With this worst case scenario: 10,000 flows x 10 KB = 100 MB or 0.1 GB. The small increase in Dataverse storage used provides significant benefits, since solution cloud flows are needed to leverage capabilities including [application lifecycle management (ALM)](/power-platform/alm/overview-alm), [governance with Dataverse](/power-platform/admin/governance-considerations), [automation center](/power-automate/automation-center-overview), [drafts and versioning](/power-automate/drafts-versioning), and [expanded security capabilities](/power-platform/admin/database-security#environments-with-a-dataverse-database).

### Related information

- [Solutions overview](../data-platform/solutions-overview.md)  
- [Application lifecycle management (ALM) guide](/power-platform/alm/overview-alm)

---

## Install Northwind Traders database and apps

Source: [northwind-install.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-install)

*Learn about how to install the Northwind database and apps into an environment to explore relational concepts.*

# Install Northwind Traders database and apps

By following the steps in [this series of topics](northwind-orders-canvas-part1.md), you can discover concepts about relational data as implemented in a sample database in Microsoft Dataverse. You can also explore sample business apps, both canvas and model-driven, for managing that data and earn practical experience by creating such an app. This first topic explains how to install the Northwind Traders database in your own environment and gain access to the sample apps, which you can open for editing to reveal how they were built.

Northwind Traders is a fictitious organization that manages orders, products, customers, suppliers, and many other aspects of a small business. This sample appeared with the first versions of Microsoft Access and is still available as an Access template.

## Prerequisites

- A Power Apps license that supports Dataverse. You can [use a free trial license](../signup-for-powerapps.md) for 30 days.
- An environment with a Dataverse database. You can [create such an environment](/power-platform/admin/create-environment) if you have appropriate permissions.

## Download the solution

> [!div class="nextstepaction"]
> [Download the Northwind Traders Solution File](https://download.microsoft.com/download/f/8/d/f8ddbb69-5499-4776-bd41-00f3bae050a6/NorthwindTraders_final.zip)

This [solution](../../developer/data-platform/introduction-solutions.md) file (.zip) contains the definitions of tables, choices, and business processes; the canvas and model-driven apps; and any other pieces that are used together.

## Install the solution

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), and then ensure that you're working in an environment that contains a Dataverse database.

1. In the left navigation pane, select **Solutions**. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want. Then select **Import** in the toolbar near the top of the screen:

    > [!div class="mx-imgBorder"]
    > ![Solutions view and import-solution entry point.](media/northwind-install/solution-import.png)

1. In the **Select Solution Package** page, select **Browse**.

    > [!div class="mx-imgBorder"]
    > ![Select Solution Package page before package is selected.](media/northwind-install/select-solution2.png)

1. Find the file that you downloaded, and then select **Open**.

    Unless you selected a different location, the file will be in your Downloads folder.

1. If you have the correct file (the version number might vary), select **Next**:

    > [!div class="mx-imgBorder"]
    > ![Select Solution Package page after package is selected.](media/northwind-install/confirm-solution2.png)

1. In the **Solution Information** page, select **Next** if the name of the solution and the publisher are correct.

    > [!div class="mx-imgBorder"]
    > ![Solution Information page.](media/northwind-install/confirm-publisher.png)

1. In the **Import Options** page, select **Import** to confirm SDK message handling, which the sample requires:

    > [!div class="mx-imgBorder"]
    > ![Import Options page.](media/northwind-install/confirm-sdk.png)

    Another page appears and shows progress as the solution is installed over the next few minutes:

    > [!div class="mx-imgBorder"]
    > ![progress bar.](media/northwind-install/solution-progress.png)

    When the installation finishes, the original page shows the result:

    > [!div class="mx-imgBorder"]
    > ![Importing Solution page.](media/northwind-install/solution-success.png)

1. Select **Close**.

## Load the sample data

1. Select **Apps**, and then select **Northwind Sample Data**.

    Wait a few minutes if the Northwind apps don't appear immediately after you install the solution:

    > [!div class="mx-imgBorder"]
    > ![Northwind database in list of apps.](media/northwind-install/sample-data-app.png)

1. When the app asks for permission to interact with Dataverse, select **Allow**:

    > [!div class="mx-imgBorder"]
    > ![Consent dialog box for Dataverse.](media/northwind-install/sample-data-permission.png)

1. After the app loads and shows that the sample tables contain no records, select **Load Data** to populate the tables:

    > [!div class="mx-imgBorder"]
    > ![Load data button in Sample Data Manager.](media/northwind-install/sample-data-load.png)

    As the app loads the data, dots march across the top of the app, and the number of records increases.

    Tables are loaded in a specific order so that relationships can be established between records. For example, the **Order Details** table has a many-to-one relationship with the **Orders** and **Order Products** tables, which are loaded first.

    You can cancel the process at any time by selecting **Cancel**, and you can remove the data at any time by selecting **Remove Data**:

    > [!div class="mx-imgBorder"]
    > ![Sample Data Manager as data is loaded.](media/northwind-install/sample-data-progress.png)

    When the data finishes loading, the last row (**Many to Many Relationships**) shows **Done**, and the **Load Data** and **Remove Data** buttons are enabled again:

    > [!div class="mx-imgBorder"]
    > ![Sample Data Manager after data is loaded.](media/northwind-install/sample-data-complete.png)

## Sample apps

The Northwind solution includes these apps for interacting with this data:

- Northwind Orders (Canvas)
- Northwind Orders (Model-driven)

You open these apps the same way that you opened the app in the previous procedure.

### Canvas

This single-screen app offers a simple master-detail view of the **Orders** table, where you can view and edit a summary of the order and each line item for an order. A list of orders appears near the left edge, and you can select an arrow in that list to show a summary and the details of that order. More information: [Overview of the canvas app for Northwind Traders](northwind-orders-canvas-overview.md).

> [!div class="mx-imgBorder"]
> ![List of orders and details in Northwind canvas app.](media/northwind-install/orders-canvas.png)

### Model-driven

This app operates on the same data (in the **Orders** table) as the canvas app. In the list of orders, show more information about an order by selecting its number:

> [!div class="mx-imgBorder"]
> ![list of orders in Northwind model-driven app.](media/northwind-install/orders-model.png)

A summary of the order appears on a separate form:

> [!div class="mx-imgBorder"]
> ![order details in model-driven app.](media/northwind-install/orders-model-2.png)

If you scroll down the form, it shows the same line items as the canvas app does:

> [!div class="mx-imgBorder"]
> ![more order details in model-driven app.](media/northwind-install/orders-model-3.png)

## Do it yourself

You can follow step-by-step instructions to create the canvas app shown earlier in this topic.  The instructions are divided into three parts:

1. [Create an order gallery](northwind-orders-canvas-part1.md).
1. [Create a summary form](northwind-orders-canvas-part2.md).
1. [Create a detail gallery](northwind-orders-canvas-part3.md).

If you want to skip ahead, the solution contains a starting-point app for each part.  In the list of apps, look for **Northwind Orders (Canvas) - Begin Part 1** and so on.

This [overview of the app](northwind-orders-canvas-overview.md) explains the user interface, data sources, and how relationships are used.

> [!div class="nextstepaction"]
> [Start by reading the overview](northwind-orders-canvas-overview.md)

---

## Overview of the canvas app for Northwind Traders

Source: [northwind-orders-canvas-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-orders-canvas-overview)

*Learn about the Northwind Traders sample app and data.*

# Overview of the canvas app for Northwind Traders

Learn about the canvas app for managing relational data in the Northwind Traders database that you [installed in your environment](northwind-install.md). Then follow step-by-step instructions in subsequent topics to build this app from scratch, thereby gaining hands-on experience working with relational data.

In this topic, discover:

- How an app user shows and manages relational data in the app.
- Which types of data drive the app.
- How relationships between those types of data were created.

In a single screen, the app user can show, update, create, and delete orders.

> [!div class="mx-imgBorder"]
> ![Complete canvas app.](media/northwind-orders-canvas-part1/orders-finished.png)

## Explore the user interface

### Order gallery

On the left edge of the app, a gallery shows a list of orders, including the order number, the status, the name of the customer, and the total cost of the order. The user can scroll through the list to find an order and then show more information about it by selecting the order's arrow. More information: [Create the order gallery](northwind-orders-canvas-part1.md).

### Summary form

In the upper-right corner, a form summarizes the order that the user selected in the order gallery. The summary includes much of the same information as that gallery does, but the summary also shows the dates when the order was created and paid, as well as the name and the picture of the employee who managed the order. The user can change the data in the form, save those changes, cancel them, or delete the order by selecting an icon near the right edge of the title bar. More information: [Create the summary form](northwind-orders-canvas-part2.md).

### Detail gallery

In the lower-right corner, another gallery shows information about which products the selected order contains and in what quantities. Each item in this gallery is known as an order detail. The app user can add and delete any item in that gallery by using controls in and under it. More information: [Create the detail gallery](northwind-orders-canvas-part3.md).

> [!div class="mx-imgBorder"]
> ![Definition of screen areas.](media/northwind-orders-canvas-part1/orders-parts.png)

## Explore the data sources

To create this app, you'll show data from five tables and an choice. In fact, most areas of this app show data from multiple tables. For example, the order gallery contains this information:

- The order number is a field in the **Orders** table.
- The status is another field in the **Orders** table, an option from the **Orders Status** choice.
- The customer name is a field in the **Customers** table.
- The total cost is calculated based on data in the **Order Details** table.

The summary contains some of the same information as the list of orders, but it also contains the name and the picture of the employee who managed the order. That information is pulled from fields in the **Employees** table. The detail gallery shows records in the **Order Details** table, and each product in those details is a record in the **Order Products** table.

## Explore the relationships

You can show data from different sources (for example, tables) in the same gallery or form because those tables have relationships that were created for you in the database.

### Many-to-one relationships

For example, information about the customer and the employee for each order resides in the **Customers** and **Employees** tables. Therefore, the **Orders** table has many-to-one relationships with those tables because there are many orders, each of which can be placed by only one customer and managed by only one employee.

Each order also has one or more line items that represent the products that the order contains and their quantities. Each line item is a record in the **Order Details** table, which pulls information about each product from the **Order Products** table. Each detail identifies only one product, but each product can appear in multiple details. Therefore, the **Order Details** table has a many-to-one relationship with the **Order Products** table.

### One-to-many relationships

Each order can contain multiple line items, but each line item relates to only one order. Therefore, the **Orders** table has a one-to-many relationship with the **Order Details** table.

### Dot notation for relationships 

To show data based on a relationship between tables, you can use the dot property selector to walk across a relationship from one table to another.  For example, each record in the **Orders** table pulls information from the **Customers** table so that the order gallery can show the customer names. In that gallery, you configure this behavior by setting the **Text** property of a label to this expression:<br>`ThisItem.Customer.Company`

**ThisItem** specifies a record in the **Orders** table and pulls information from the **Customers** table about the customer who placed the order. In this case, the expression specifies that the customer's company name appears. However, the entire record for that customer is pulled, so you could just as easily show, for example, an email address for that customer instead.

As another example of walking from one table to another, you can specify that a gallery should show records in one table based on a record that the user selected in another gallery and that's in another table. To show the order details, you'll set the detail gallery's **Items** property to this expression:<br>`Gallery1.Selected.'Order Details'`

In this case, **Gallery1.Selected** specifies a record in the **Orders** table, just as **ThisItem** did in the previous example. However, this expression doesn't pull just one record as the previous expression did. Instead, it pulls an entire table of records to show the name and per-unit cost of each product (as reflected in the **Order Products** table) and the quantity (as reflected in the **Order Details** table).

## Do it yourself

You can follow step-by-step instructions to create the Northwind Orders canvas app.  The instructions are divided into three parts:

1. [Create an order gallery](northwind-orders-canvas-part1.md).
1. [Create a summary form](northwind-orders-canvas-part2.md).
1. [Create a detail gallery](northwind-orders-canvas-part3.md).

If you want to skip ahead, the solution contains a starting-point app for each part.  In the list of apps, look for **Northwind Orders (Canvas) - Begin Part 1** and so on.

> [!div class="nextstepaction"]
> [Continue by creating the order gallery](northwind-orders-canvas-part1.md)

---

## Create an order gallery in a canvas app

Source: [northwind-orders-canvas-part1.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-orders-canvas-part1)

*Learn about how to create an order gallery in a canvas app to manage data for Northwind Traders.*

# Create an order gallery in a canvas app

Follow step-by-step instructions to create an order gallery in a canvas app for managing fictitious data in the Northwind Traders database. This topic is part of a series that explains how to build a business app on relational data in Microsoft Dataverse. For best results, explore these topics in this sequence:

1. Create an order gallery (**this topic**).
1. [Create a summary form](northwind-orders-canvas-part2.md).
1. [Create a detail gallery](northwind-orders-canvas-part3.md).

> [!div class="mx-imgBorder"]
> ![Definition of screen areas.](media/northwind-orders-canvas-part1/orders-parts.png)

## Prerequisites

- [Install the Northwind Traders database and apps](northwind-install.md).
- Read through the [overview of the canvas app](northwind-orders-canvas-overview.md) for Northwind Traders.

## Create a blank app

Create a [blank canvas app](create-blank-app.md), and give it a name such as "My Northwind Orders (Canvas app)".

## Add the data

1. On the left-pane, select **Data** > **Add data** > search for, and select **Orders** table.

    ![Select View, Data sources, Add data source.](media/northwind-orders-canvas-part1/datasource-01.png)

    The **Orders** table contains many fields of various types:

    ![List of fields in the Orders table.](media/northwind-orders-canvas-part1/datasource-05.png)

    Each field has a **Display name** and a **Name**, which is sometimes called the logical name. Both names refer to the same thing. In general, you'll use the display name when you build an app, but some cases require the more cryptic **Name**, as noted in a procedure.

1. As we will be working with screens and controls next, in Power Apps Studio switch back to the **Tree View** on the left hand side by pressing the three stacked squares icon. You can return to the **Data Sources** at any time by pressing the cylinder icon.

## Create the order gallery

1. On the **Insert** tab, select **Gallery** > **Blank vertical** to add a [**Gallery**](controls/control-gallery.md) control, which will show the orders.

    > [!div class="mx-imgBorder"]
    > ![Insert, Gallery, Blank vertical.](media/northwind-orders-canvas-part1/orders-01.png)

	The control will be placed on the canvas and a fly out dialog will appear asking which data source to connect to.  

1. We could connect it directly to **Orders** here, but instead we'd like to control the sort order of the gallery.  Ignore the fly out dialog and in the formula bar set the gallery's **Items** property to this formula:

    ```power-fx
    Sort( Orders, 'Order Number', Descending )
    ```

    The [**Sort**](functions/function-sort.md) function orders the list so that the newest order (which has the highest order number) appears first.

    > [!div class="mx-imgBorder"]
    > ![Sort orders in the gallery.](media/northwind-orders-canvas-part1/orders-02b.png)

1. After a few moments the Result View will appear below the formula bar.  Pull down on the arrow at the left to see the result of our formula.  Scroll to the right to see the **Order Number** column and ensure it is sorted the way want (highest to lowest).  

    > [!div class="mx-imgBorder"]
    > ![Set Items property of the gallery.](media/northwind-orders-canvas-part1/orders-02c.png)

1. In the **Properties** tab near the right edge, open the **Layout** list:

    > [!div class="mx-imgBorder"]
    > ![List of layout options.](media/northwind-orders-canvas-part1/orders-03.png)

1. In the list of options, select **Title and subtitle**:

    > [!div class="mx-imgBorder"]
    > ![Select a layout.](media/northwind-orders-canvas-part1/orders-04.png)

    Two [**Label**](controls/control-text-box.md) controls are added in the gallery's template. By default, these controls show two columns of the **Orders** table, which you'll change next. The gallery's template is replicated vertically for each record in the table.

1. Select **Edit** (next to **Fields**) in the **Properties** tab near the right edge.

    > [!div class="mx-imgBorder"]
    > ![Select edit to update fields.](media/northwind-orders-canvas-part1/orders-04b.png)

1. In the **Data** pane, select **Title1** (or select the upper label in the gallery's template).

1. In the formula bar, set the label's **Text** property to this expression:

    ```power-fx
    "Order " & ThisItem.'Order Number'
    ```

    > [!div class="mx-imgBorder"]
    > ![Set title label's Text property.](media/northwind-orders-canvas-part1/orders-06.png)

    The order number appears at the top of each gallery item. In the gallery template, **ThisItem** grants access to all fields in the **Order** table.

1. In the **Data** pane, select **Subtitle1** (or select the lower label in the gallery's template):

    > [!div class="mx-imgBorder"]
    > ![Select subtitle label.](media/northwind-orders-canvas-part1/orders-07.png)

1. In the formula bar, set the label's **Text** property to this expression:

    ```power-fx
    ThisItem.Customer.Company
    ```

    > [!div class="mx-imgBorder"]
    > ![Set subtitle label's Text property.](media/northwind-orders-canvas-part1/orders-08.png)

    After you enter this formula, it may show a red squiggly error for a moment. The error should clear if you select anything outside the formula bar and then return the cursor to the formula bar. If the error persists or you don't see a value, select the **View** tab, select **Data sources**, and then refresh the **Orders** table by selecting the ellipsis (...) to the right of the data-source name.

    When you specify **ThisItem.Customer**, you're leveraging a many-to-one relationship between the **Orders** and **Customers** tables and retrieving the customer record that's associated with each order. From the customer record, you're extracting data in the **Company** column for display.

    You can show all the relationships from the **Orders** table to other tables, including the **Customer** table:

    ![List of relationships.](media/northwind-orders-canvas-part1/orders-09.png)

1. Close the **Data** pane by selecting the close icon (x) in its upper-right corner.

## Show each order's status

In this procedure, you'll add space in the gallery for a label and configure it to show each order's status in a different color based on the data.

1. In the gallery's template, reduce the width of the first label, **Title1**:

    > [!div class="mx-imgBorder"]
    > ![Title1 in the gallery's template.](media/northwind-orders-canvas-part1/status-01.png)

1. Repeat the previous step with the second label, **Subtitle1**:

    > [!div class="mx-imgBorder"]
    > ![Subtitle1 in the gallery's template.](media/northwind-orders-canvas-part1/status-02.png)

1. With the gallery template (or a control in the template) selected, select **Label** on the **Insert** tab:

    > [!div class="mx-imgBorder"]
    > ![Add a label.](media/northwind-orders-canvas-part1/status-03.png)

1. Move the new label to the right of the **Title1** label:

    > [!div class="mx-imgBorder"]
    > ![Move and resize a label.](media/northwind-orders-canvas-part1/status-04.png)

1. Set the **Text** property of the new label to this expression:

    ```power-fx
    ThisItem.'Order Status'
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Text property.](media/northwind-orders-canvas-part1/status-05.png)

    In the **Orders** table, the **Order Status** field holds a value from the **Orders Status** choice. A choice is similar to an enumeration in other programming tools. Each set of options is defined in the database, so users can specify only those options that are in the set. The **Orders Status** choice is also global, not local, so you can use it in other tables:

    ![Orders Status choice.](media/northwind-orders-canvas-part1/status-06.png)

    Each option in a set has a name that appears if you show it in a label. These names can be localized, and the app recognizes the same option whether an English user selects **Apple**, a French user selects **Pomme**, or a Spanish user selects **Manzana**. For this reason, you can't create a formula that relies on a hard-coded string for an option, as this topic demonstrates later.

    In formulas, you must surround **Order Status** with single quotation marks because it contains a space. However, that name functions the same way as any other name in Power Apps, such as **Customer** or **Company**, does.

1. On the **Home** tab, increase the font size of the status label to 20 points, and right align the text:

    > [!div class="mx-imgBorder"]
    > ![Change font size and alignment.](media/northwind-orders-canvas-part1/status-07.png)

1. In the formula bar, set the **Color** property of the status label to this formula:

    ```power-fx
    Switch( ThisItem.'Order Status',
        'Orders Status'.Closed, Green,
        'Orders Status'.New, Black,
        'Orders Status'.Invoiced, Blue,
        'Orders Status'.Shipped, Purple
    )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Color property of the status label.](media/northwind-orders-canvas-part1/status-08.png)

    Power Apps prevents you from creating a formula that relies on a hard-coded string for each option in a set because such formulas could produce inappropriate results if the option names are localized. Instead, the **Switch** function determines the color based on whatever string appears in the label based on the user's settings.

    With this formula in place, different status values appear in different colors, as the previous graphic shows.

## Display each order's total

1. Select the first item in the gallery, which is the gallery's template:

    > [!div class="mx-imgBorder"]
    > ![Select the gallery template.](media/northwind-orders-canvas-part1/aggregate-01.png)

1. On the **Insert** tab, select **Label** to add another label:

    > [!div class="mx-imgBorder"]
    > ![Add another label.](media/northwind-orders-canvas-part1/aggregate-02.png)

1. Move the new label so that it appears under the status label:

    > [!div class="mx-imgBorder"]
    > ![Resize and move the new label.](media/northwind-orders-canvas-part1/aggregate-03.png)

1. In the formula bar, set the new label's **Text** property to this formula:

    ```power-fx
    Text( Sum( ThisItem.'Order Details', Quantity * 'Unit Price' ), "[$-en-US]$ #,###.00" )
    ```

    > [!div class="mx-imgBorder"]
    > ![Formula for calculating an order's total cost.](media/northwind-orders-canvas-part1/aggregate-04.png)

    In this formula, the [**Sum**](functions/function-aggregates.md)  function adds up the records in the **Order Details** table that are associated with each record in the **Order** table through a one-to-many relationship. These line items make up each order, and you'll use the same one-to-many relationship to show and edit the line items in the lower-right area of the screen.

    This formula shows a blue underline and a [delegation warning](delegation-overview.md) because Dataverse doesn't support delegation of complex aggregate functions (for example, the sum of a multiplication). You can ignore this information because no order in this example will contain more than 500 line items. If necessary for a different app, you can increase that limit in **App settings**.

    The [**Text**](functions/function-text.md) function in this formula adds a currency symbol and formats the result with thousands and decimal separators. As written, the formula includes the language tag for U.S. English (**[$-en-US]**) and a dollar symbol (**$**). If you remove the language tag, it will be replaced with one based on your language settings, and the label will show the appropriate formats for that tag. If you leave the dollar symbol, the label will show the appropriate currency symbol based on the user's settings. However, you can force a different symbol to appear by replacing the dollar symbol with the one that you prefer.

1. On the **Home** tab, change the font size of the newest label to 20 points, and right align its text:

    > [!div class="mx-imgBorder"]
    > ![Change the font size and the alignment of a label.](media/northwind-orders-canvas-part1/aggregate-05.png)

1. Move the gallery to the left edge of the screen, and decrease the gallery's width to close up some space.

1. Increase the gallery's height so that it's almost as tall as the screen, but leave a little room at the top for a title bar, which you'll add at the start of the next topic:

    > [!div class="mx-imgBorder"]
    > ![Move and resize the gallery.](media/northwind-orders-canvas-part1/aggregate-06.png)

## Summary

To recap, you started to build a single-screen canvas app by adding the order gallery, which includes these elements:

- An expression to show the order number: `"Orders " & ThisItem.OrderNumber`
- A field in a many-to-one relationship: `ThisItem.Customer.Company`
- A label that shows the name of an option in a set: `ThisItem.'Order Status'`
- A label that changes format based on which option in a set the label shows: `Switch( ThisItem.'Order Status', 'Orders Status'.Closed, Green, ...`
- A complex aggregate function over a one-to-many relationship: `Sum( ThisItem.'Order Details', Quantity * 'Unit Price' )`

## Next topic

In the next topic, you'll add an [**Edit form**](controls/control-form-detail.md) control to display and edit an summary of whatever order the user selects in the gallery that you just created.

> [!div class="nextstepaction"]
> [Create the summary form](northwind-orders-canvas-part2.md)

---

## Create a summary form in a canvas app

Source: [northwind-orders-canvas-part2.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-orders-canvas-part2)

*Learn about how to create an summary form in a canvas app to manage data for Northwind Traders.*

# Create a summary form in a canvas app

Follow step-by-step instructions to create a summary form in a canvas app for managing fictitious data in the Northwind Traders database. This topic is part of a series that explains how to build a business app on relational data in Microsoft Dataverse. For best results, explore these topics in this sequence:

1. [Create an order gallery](northwind-orders-canvas-part1.md).
2. Create a summary form (**this topic**).
3. [Create a detail gallery](northwind-orders-canvas-part3.md).

> [!div class="mx-imgBorder"]
> ![Definition of screen areas.](media/northwind-orders-canvas-part1/orders-parts.png)

## Prerequisites

1. [Install the Northwind Traders database and apps](northwind-install.md).
1. Review the [overview of the canvas app](northwind-orders-canvas-overview.md) for Northwind Traders.
1. [Create the order gallery](northwind-orders-canvas-part1.md) yourself, or open the **Northwind Orders (Canvas) - Begin Part 2** app, which already contains that gallery.

## Add a title bar

Across the top of the app, create a title bar, which will hold action buttons by the end of this topic.

1. In the **Tree view** pane, select **Screen1** to ensure that you don't accidentally add a control to the order gallery:

    > [!div class="mx-imgBorder"]
    > ![Select Screen1 in the Tree view pane.](media/northwind-orders-canvas-part2/titlebar-01.png)

1. On the **Insert** tab, select **Label** to insert a [**Label**](controls/control-text-box.md) control:

    > [!div class="mx-imgBorder"]
    > ![Insert a label.](media/northwind-orders-canvas-part2/titlebar-02.png)

    The new label should appear only once, above the gallery. If it appears in each item of the gallery, delete the first instance of the label, ensure that the screen is selected (as the previous step describes), and then insert the label again.

1. Move and resize the new label to span the top of the screen:

    > [!div class="mx-imgBorder"]
    > ![Move and resize the label.](media/northwind-orders-canvas-part2/titlebar-03.png)

1. Double-click the text of the label, and then type **Northwind Orders**.

    As an alternative, modify the **Text** property in the formula bar to achieve the same result:

    > [!div class="mx-imgBorder"]
    > ![Change the text in the title bar.](media/northwind-orders-canvas-part2/titlebar-04.png)

1. On the **Home** tab, format the label:
    - Increase the font size to 24 points.
    - Make the text bold.
    - Make the text white.
    - Center the text.
    - Add a dark-blue fill to the background.

    > [!div class="mx-imgBorder"]
    > ![Formatting options on the Home tab.](media/northwind-orders-canvas-part2/titlebar-05.png)

## Add an Edit form control

In this section, you'll add controls to show a summary of any order that the user selects in the gallery.

1. On the **Insert** tab, insert an [**Edit form**](controls/control-form-detail.md) control:

    > [!div class="mx-imgBorder"]
    > ![Add an Edit form control.](media/northwind-orders-canvas-part2/form-01.png)

    By default, the form appears in the upper-left corner, where other controls might make it difficult to find:

    > [!div class="mx-imgBorder"]
    > ![Edit form control in default location.](media/northwind-orders-canvas-part2/form-02.png)

1. Move and resize the form to cover the upper-right corner of the screen under the title bar:

    > [!div class="mx-imgBorder"]
    > ![Move and resize the Edit form control.](media/northwind-orders-canvas-part2/form-03.png)

1. In the **Properties** pane, select the **Data source** drop down.

    > [!div class="mx-imgBorder"]
    > ![Set the DataSource property of the Edit form control.](media/northwind-orders-canvas-part2/form-04a.png)

1. Select the **Orders** data source.

## Add and arrange fields

1. In the **Properties** tab near the right edge, select **Edit fields** to open the **Fields** pane.

    > [!div class="mx-imgBorder"]
    > ![Open the Fields pane.](media/northwind-orders-canvas-part2/form-05.png)

1. If the **Fields** pane is not empty, remove the fields that have already been inserted.  

    > [!div class="mx-imgBorder"]
    > ![Open the Fields pane option.](media/northwind-orders-canvas-part2/form-06a.png)

1. After the fields list is empty, select **Add field**, and then select the check boxes for the **Customer** and **Employee** fields.

    > [!div class="mx-imgBorder"]
    > ![Add the Customer and Employee fields to the Edit form control.](media/northwind-orders-canvas-part2/form-06b.png)

1. Scroll down until these fields appear, and then select their check boxes:

    - **Notes**
    - **Order Date**
    - **Order Number**
    - **Order Status**
    - **Paid Date**

    > [!div class="mx-imgBorder"]
    > ![Add five more fields to the Edit form control part 1.](media/northwind-orders-canvas-part2/form-06c.png)

    > [!div class="mx-imgBorder"]
    > ![Add five more fields to the Edit form control part 2.](media/northwind-orders-canvas-part2/form-06d.png)

1. At the bottom of the **Fields** pane, select **Add**, and then close the **Fields** pane.

    The form shows seven fields, which may be in a different order:

    > [!div class="mx-imgBorder"]
    > ![Edit form control shows seven fields.](media/northwind-orders-canvas-part2/form-08.png)

    > [!NOTE]
    > If any field shows a red error icon, a problem might have occurred when data was pulled from the source. To resolve the error, refresh the data:
    >
    > 1. On the **View** tab, select **Data sources**.
    > 1. In the **Data** pane, select **Data sources**.
    > 1. Next to **Orders**, select the ellipsis (...), select **Refresh**, and then close the **Data** pane.
    >
    > If the combo box for the customer or employee name still shows an error, check the **Primary text** and **SearchField** of each box by selecting it and then opening the **Data** pane. For the customer box, both fields should be set to **nwind_company**. For the employee box, both fields should be set to **nwind_lastname**.

1. With the form selected, change the number of columns in the form from 3 to 12 in the **Properties** tab near the right edge.

    This step adds flexibility as you arrange the fields:

    > [!div class="mx-imgBorder"]
    > ![Change then number of columns in the Edit form control.](media/northwind-orders-canvas-part2/form-08b.png)

    Many UI designs rely on 12-column layouts because they can evenly accommodate rows of 1, 2, 3, 4, 6, and 12 controls. In this topic, you'll create rows that contain 1, 2, or 4 controls.

1. Move and resize the fields by dragging their handles, just as you would any other control, so that each row contains these data cards in the specified order:

    - First row: **Order Number**, **Order Status**, **Order Date**, and **Paid Date**
    - Second row: **Customer** and **Employee**
    - Third row: **Notes**

    > [!NOTE]
    > You might find it easier to widen the **Notes**, **Customer**, and **Employee** data cards before you arrange them.

    > [!div class="mx-imgBorder"]
    > ![Move and resize fields.](media/northwind-orders-canvas-part2/form-rearrange.gif)

    More information about how to arrange fields in a form: [Understand data-form layout for canvas apps](working-with-form-layout.md).

## Hide time controls

In this example, you don't need the time portions of the date fields because that level of granularity can distract the user. If you delete them, you might cause problems in formulas that rely on those controls to update date values or determine the position of another control in the data card. Instead, you'll hide the time controls by setting their **Visible** property.

1. In the **Tree view** pane, select the **Order Date** data card.

    The card might have a different name, but it contains **Order Date**.

1. While holding down the Shift key, select the hour, minute, and colon-separator controls in the **Order Date** data card.

    > [!div class="mx-imgBorder"]
    > ![Select the time controls in Order Date card.](media/northwind-orders-canvas-part2/form-09.png)

1. Set the controls' **Visible** property to **false**.

    All selected controls disappear from the form:

    > [!div class="mx-imgBorder"]
    > ![Set Visible property to false for the control.](media/northwind-orders-canvas-part2/form-10.png)

1. Resize the [**Date picker**](controls/control-date-picker.md) control to show the complete date:

    > [!div class="mx-imgBorder"]
    > ![Resize the Date picker.](media/northwind-orders-canvas-part2/form-11.png)

    Next, you'll repeat the last few steps for the **Paid Date** field.

1. In the **Tree view** pane, select the time controls in the **Paid Date** data card:

    > [!div class="mx-imgBorder"]
    > ![Select time control in Paid Date card.](media/northwind-orders-canvas-part2/form-12.png)

1. Set the selected controls' **Visible** property to **false**:

    > [!div class="mx-imgBorder"]
    > ![Set Visible property to false.](media/northwind-orders-canvas-part2/form-13.png)

1. Resize the date picker in the **Date Paid** card:

    > [!div class="mx-imgBorder"]
    > ![Resize the Date picker control.](media/northwind-orders-canvas-part2/form-14.png)

## Connect the order gallery

1. In the **Tree view** pane, collapse the form to more easily find the name of the order gallery, and then, if necessary, rename it to **Gallery1**.

1. Set the summary form's **Item** property to this expression:

    ```power-fx
    Gallery1.Selected
    ```

    > [!div class="mx-imgBorder"]
    > ![Set Item property of the form.](media/northwind-orders-canvas-part2/form-15.png)

    The form shows an summary of whatever order the app user selects in the list.

    > [!div class="mx-imgBorder"]
    > ![Select an order in the list to show its overview in the form.](media/northwind-orders-canvas-part2/form-select.gif)

## Replace a data card

**Order number** is an identifier that Dataverse assigns automatically when you create a record. This field has a [**Text input**](controls/control-text-input.md) control by default, but you'll replace it with a label so that the user can't edit this field.

1. Select the form, select **Edit fields** in the **Properties** tab near the right edge, and then select the **Order number** field:

    > [!div class="mx-imgBorder"]
    > ![Select the Order number field.](media/northwind-orders-canvas-part2/alt-01.png)

1. Open the **Control type** list:

    > [!div class="mx-imgBorder"]
    > ![Open the **Control type** list.](media/northwind-orders-canvas-part2/alt-02.png)

1. Select the **View text** data card:

    > [!div class="mx-imgBorder"]
    > ![Select the **View text** data card.](media/northwind-orders-canvas-part2/alt-02b.png)

1. Close the **Fields** pane.

    The user can no longer change the order number:

    > [!div class="mx-imgBorder"]
    > ![Order number is read-only.](media/northwind-orders-canvas-part2/alt-03.png)

1. On the **Home** tab, change the order number's font size to 20 points so that the field is easier to find:

    > [!div class="mx-imgBorder"]
    > ![Change the order number's font size.](media/northwind-orders-canvas-part2/alt-04.png)

## Use a many-to-one relationship

The **Orders** table has a many-to-one relationship with the **Employees** table: each employee can create many orders, but each order can be assigned to only one employee. When the user selects an employee in the [**Combo box**](controls/control-combo-box.md) control, its **Selected** property provides that employee's entire record from the **Employees** table. As a result, you can configure an [**Image**](controls/control-image.md) control to show the picture of whatever employee the user selects in the combo box.

1. Select the **Employee** data card:

    > [!div class="mx-imgBorder"]
    > ![Select the Employee data card.](media/northwind-orders-canvas-part2/employee-01.png)

1. In the **Advanced** tab near the right edge, unlock the data card so that you can edit formulas that were previously read-only:

    > [!div class="mx-imgBorder"]
    > ![Unlock the Employee data card.](media/northwind-orders-canvas-part2/employee-02.png)

1. In the data card, reduce the width of the combo box to make room for the employee picture:

    > [!div class="mx-imgBorder"]
    > ![Resize the combo-box control.](media/northwind-orders-canvas-part2/employee-03b.png)

1. On the **Insert** tab, select **Media** > **Image**:

    > [!div class="mx-imgBorder"]
    > ![Insert an image.](media/northwind-orders-canvas-part2/employee-04.png)

    An image appears in the data card, which expands to accommodate it:

    > [!div class="mx-imgBorder"]
    > ![Employee data card with Image control.](media/northwind-orders-canvas-part2/employee-05.png)

1. Resize the image, and move it to the right of the combo box:

    > [!div class="mx-imgBorder"]
    > ![Move and resize the image control.](media/northwind-orders-canvas-part2/employee-06.png)

1. Set the **Image** property of the image to this formula, replacing the number at the end of DataCardValue if necessary:

    ```power-fx
    DataCardValue7.Selected.Picture
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Image property of the image.](media/northwind-orders-canvas-part2/employee-07.png)

    The picture of the selected employee appears.

1. While holding down the Alt key, select a different employee in the combo box to confirm that the picture also changes.

    > [!div class="mx-imgBorder"]
    > ![Select an employee to show that employee's picture.](media/northwind-orders-canvas-part2/employee-select.gif)

## Add a Save icon

1. In the **Tree view** pane, select **Screen1**, and then select **Insert** > **Icons** > **Check**:

    > [!div class="mx-imgBorder"]
    > ![Insert check-mark icon.](media/northwind-orders-canvas-part2/save-01.png)

    The [**Check**](controls/control-shapes-icons.md) icon appears in the upper-left corner by default, where other controls might make the icon difficult to find:

    > [!div class="mx-imgBorder"]
    > ![Icon in default location.](media/northwind-orders-canvas-part2/save-02.png)

1. On the **Home** tab, change the **Color** property of the icon to white, resize the icon, and move it near the right edge of the title bar:

    > [!div class="mx-imgBorder"]
    > ![Configure the color, size, and location of the save icon.](media/northwind-orders-canvas-part2/save-03.png)

1. In the **Tree view** pane, confirm that the form's name is **Form1**, and then set the icon's **OnSelect** property to this formula:

    ```power-fx
    SubmitForm( Form1 )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the save icon's OnSelect property.](media/northwind-orders-canvas-part2/save-04.png)

    When the user selects the icon, the [**SubmitForm**](functions/function-form.md) function gathers any changed values in the form and submits them to the data source. Dots march across the top of the screen as the data is submitted, and the order gallery reflects the changes after the process finishes.

1. Set the icon's **DisplayMode** property to this formula:

    ```power-fx
    If( Form1.Unsaved, DisplayMode.Edit, DisplayMode.Disabled )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the icon's DisplayMode property.](media/northwind-orders-canvas-part2/save-05.png)

    If all changes in the form have been saved, the icon is disabled and appears in the **DisabledColor**, which you'll set next.

1. Set the icon's **DisabledColor** property to this value:

    ```power-fx
    Gray
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the icon's DisabledColor property.](media/northwind-orders-canvas-part2/save-06.png)

    The user can save changes to an order by selecting the Check icon, which is then disabled and dimmed until the user makes another change:

    > [!div class="mx-imgBorder"]
    > ![saving changes.](media/northwind-orders-canvas-part2/save-submit.gif)

## Add a Cancel icon

1. On the **Insert** tab, select **Icons** > **Cancel**:

    > [!div class="mx-imgBorder"]
    > ![Add cancel icon.](media/northwind-orders-canvas-part2/save-07.png)

    The icon appears in the upper-left corner by default, where other controls might make the icon difficult to find:

    > [!div class="mx-imgBorder"]
    > ![Cancel icon in default location.](media/northwind-orders-canvas-part2/save-08.png)

1. On the **Home** tab, change the icon's **Color** property to white, resize the icon, and move it to the left of the Check icon:

    > [!div class="mx-imgBorder"]
    > ![Change the color, size, and location of the Cancel icon.](media/northwind-orders-canvas-part2/save-09.png)

1. Set the Cancel icon's **OnSelect** property to this formula:

    ```power-fx
    ResetForm( Form1 )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Cancel icon's OnSelect property.](media/northwind-orders-canvas-part2/save-10.png)

    The [**ResetForm**](functions/function-form.md) function discards all changes in the form, which returns it to its original state.

1. Set the Cancel icon's **DisplayMode** property to this formula:

    ```power-fx
    If( Form1.Unsaved Or Form1.Mode = FormMode.New, DisplayMode.Edit, DisplayMode.Disabled )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Cancel icon's DisplayMode property.](media/northwind-orders-canvas-part2/save-11.png)

    This formula differs slightly from the one for the Check icon. The Cancel icon is disabled if all changes have been saved or the form is in **New** mode, which you'll enable next. In that case, **ResetForm** discards the new record.

1. Set the Cancel icon's **DisabledColor** property to this value:

    ```power-fx
    Gray
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Cancel icon's DisabledColor property.](media/northwind-orders-canvas-part2/save-12.png)

    The user can cancel changes to an order, and the Check and Cancel icons are disabled and dimmed if all changes have been saved:

    > [!div class="mx-imgBorder"]
    > ![Saving and cancelling changes.](media/northwind-orders-canvas-part2/save-cancel.gif)

## Add an Add icon

1. On the **Insert** tab, select **Icons** > **Add**.

    > [!div class="mx-imgBorder"]
    > ![Insert an Add icon.](media/northwind-orders-canvas-part2/save-13.png)

    The **Add** icon appears in the upper-left corner by default, where other controls might make it difficult to find:

    > [!div class="mx-imgBorder"]
    > ![Default location of Add icon.](media/northwind-orders-canvas-part2/save-14.png)

1. On the **Home** tab, set the **Color** property of the Add icon to white, resize the icon, and move it to the left of the Cancel icon:

    > [!div class="mx-imgBorder"]
    > ![Change the color, size, and location of the Add icon.](media/northwind-orders-canvas-part2/save-15.png)

1. Set the Add icon's **OnSelect** property to this formula:

    ```power-fx
    NewForm( Form1 )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Add icon's OnSelect property.](media/northwind-orders-canvas-part2/save-15b.png)

    The [**NewForm**](functions/function-form.md) function shows a blank record in the form.  

1. Set the Add icon's **DisplayMode** property to this formula:

    ```power-fx
    If( Form1.Unsaved Or Form1.Mode = FormMode.New, DisplayMode.Disabled, DisplayMode.Edit )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Add icon's DisplayMode property.](media/northwind-orders-canvas-part2/save-16.png)

    The formula disables the Add icon under these conditions:

    - The user makes changes but doesn't save or cancel them, which is the opposite behavior from the Check and Cancel icons.
    - The user selects the Add icon but makes no changes.

1. Set the Add icon's **DisabledColor** property to this value:

    ```power-fx
    Gray
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Add icon's DisabledColor property.](media/northwind-orders-canvas-part2/save-17.png)

    The user can create an order if they make no changes or they save or cancel any changes they've made. (If the user selects this icon, they can't select it again until they make one or more changes and then save or cancel those changes):

    > [!div class="mx-imgBorder"]
    > ![Create an order.](media/northwind-orders-canvas-part2/save-new.gif)

> [!NOTE]
> If you create and save an order, you might need to scroll down in the order gallery to show your new order. It won't have a total price because you haven't added any order details yet.

## Add a Trash icon

1. On the **Insert** tab, select **Icons** > **Trash**.

    > [!div class="mx-imgBorder"]
    > ![Insert a Trash icon.](media/northwind-orders-canvas-part2/save-18.png)

    The **Trash** icon appears in the upper-left corner by default, where other controls might make it difficult to find:

    > [!div class="mx-imgBorder"]
    > ![Default location of the Trash icon.](media/northwind-orders-canvas-part2/save-19.png)

1. On the **Home** tab, change the Trash icon's **Color** property to white, resize the icon, and move it to the left of the Add icon:

    > [!div class="mx-imgBorder"]
    > ![Change the color, size, and location of the Trash icon.](media/northwind-orders-canvas-part2/save-20.png)

1. Set the Trash icon's **OnSelect** property to this formula:

    ```power-fx
    Remove( Orders, Gallery1.Selected )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Trash icon's OnSelect property.](media/northwind-orders-canvas-part2/save-21.png)

    The [**Remove**](functions/function-remove-removeif.md) function removes a record from a data source. In this formula, the function removes the record that's selected in the order gallery. The Trash icon appears near the summary form (not the order gallery) because the form shows more details about the record, so the user can more easily identify the record that the formula will delete.

1. Set the Trash icon's **DisplayMode** property to this formula:

    ```power-fx
    If( Form1.Mode = FormMode.New, DisplayMode.Disabled, DisplayMode.Edit )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Trash icon's DisplayMode property.](media/northwind-orders-canvas-part2/save-22.png)

    This formula disables the Trash icon if the user is creating a record. Until the user saves the record, the **Remove** function has no record to delete.

1. Set the Trash icon's **DisabledColor** property to this value:

    ```power-fx
    Gray
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Trash icon's DisabledColor property.](media/northwind-orders-canvas-part2/save-23.png)

    The user can delete an order.

    > [!div class="mx-imgBorder"]
    > ![Deleting orders.](media/northwind-orders-canvas-part2/save-delete.gif)

## Summary

To recap, you added a form in which the user can show and edit a summary of each order, and you used these elements:

- A form that shows data from the **Orders** table: **Form1.DataSource =** `Orders`
- A connection between the form and the order gallery: **Form1.Item =** `Gallery1.Selected`
- An alternate control for the **Order number** field: **View text**
- A many-to-one relationship to show the employee's picture in the **Employee** data card: `DataCardValue1.Selected.Picture`
- An icon to save changes to an order: `SubmitForm( Form1 )`
- An icon to cancel changes to an order: `ResetForm( Form1 )`
- An icon to create an order: `NewForm( Form1 )`
- An icon to delete an order: `Remove( Orders, Gallery1.Selected )`

## Next step

In the next topic, you'll add another gallery to show the products in each order, and you'll change those details by using the [**Patch**](functions/function-patch.md) function.

> [!div class="nextstepaction"]
> [Create the detail gallery](northwind-orders-canvas-part3.md)

---

## Create a detail gallery in a canvas app

Source: [northwind-orders-canvas-part3.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-orders-canvas-part3)

*Learn about how to create a detail gallery in a canvas app to manage data for Northwind Traders.*

# Create a detail gallery in a canvas app

Follow step-by-step instructions to create a detail gallery in a canvas app for managing fictitious data in the Northwind Traders database. This topic is part of a series that explains how to build a business app on relational data in Microsoft Dataverse. For best results, explore these topics in this sequence:

1. [Create an order gallery](northwind-orders-canvas-part1.md).
1. [Create a summary form](northwind-orders-canvas-part2.md).
1. Create a detail gallery (**this topic**).

> [!div class="mx-imgBorder"]
> ![Definition of screen areas.](media/northwind-orders-canvas-part1/orders-parts.png)

## Prerequisites

Before you start this topic, you must install the database as described earlier in this topic. You must then either create the order gallery and the summary form or open the **Northwind Orders (Canvas) - Begin Part 3** app, which already contains that gallery and that form.

## Create another title bar

1. At the top of the screen, select the [**Label**](controls/control-text-box.md) control that acts as a title bar, copy it by pressing Ctrl-C, and then paste it by pressing Ctrl-V:

    > [!div class="mx-imgBorder"]
    > ![Copy and paste title bar.](media/northwind-orders-canvas-part3/details-01.png)

1. Resize and move the copy so that it appears just under the summary form.

1. Remove the text from the copy in either of these ways:

    - Double-click the text to select it, and then press Delete.
    - Set the label's **Text** property to an empty string (**""**).

    > [!div class="mx-imgBorder"]
    > ![Remove the text from the title-bar copy.](media/northwind-orders-canvas-part3/details-02.png)

## Add a gallery

1. Insert a [**Gallery**](controls/control-gallery.md) control with a **Blank vertical** layout:

    > [!div class="mx-imgBorder"]
    > ![Add a blank vertical gallery.](media/northwind-orders-canvas-part3/details-03.png)

    The new gallery, which will show order details, appears in the upper-left corner.

1. Close the fly out data source dialog, and then resize and move the detail gallery to the lower-right corner, below the new title bar:

    > [!div class="mx-imgBorder"]
    > ![Final location of order-details gallery.](media/northwind-orders-canvas-part3/details-05.png)

1. Set the **Items** property of the detail gallery to this formula:

    ```power-fx
    Gallery1.Selected.'Order Details'
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Items property of the detail gallery.](media/northwind-orders-canvas-part3/details-06.png)

    If an error appears, confirm that the order gallery is named **Gallery1** (in the **Tree view** pane near the left edge). If that gallery has a different name, rename it **Gallery1**.

    You've just linked the two galleries. When the user selects an order in the order gallery, that selection identifies a record in the **Orders** table. If that order contains one or more line items, the record in the **Orders** table is linked to one or more records in the **Order details** table, and data from those records appears in the detail gallery. This behavior reflects the one-to-many relationship that was created for you between the **Orders** and **Order Details** tables. The formula that you specified "walks" that relationship by using dot notation:

    ![One-to-many relationship between the Orders table and the Order Details table.](media/northwind-orders-canvas-part3/schema-orders-rel.png)

## Show product names

1. In the detail gallery, select **Add an item from the Insert tab** to select the gallery template:

    > [!div class="mx-imgBorder"]
    > ![Select the template for the detail gallery.](media/northwind-orders-canvas-part3/details-07.png)

    Ensure that you've selected the gallery template instead of the gallery itself. The bounding box should be slightly inside the gallery's boundary and probably shorter than the gallery's height. As you insert controls into this template, they are repeated for each item in the gallery.

1. On the **Insert** tab, insert a label into the detail gallery.

    The label should appear within the gallery; if it doesn't, try again, but make sure to select the gallery's template before you insert the label.

    > [!div class="mx-imgBorder"]
    > ![Add a label to the detail gallery.](media/northwind-orders-canvas-part3/details-08.png)

1. Set the new label's **Text** property to this formula:

    ```power-fx
    ThisItem.Product.'Product Name'
    ```

    If no text appears, select the arrow for **Order 0901** near the bottom of the order gallery.

1. Resize the label so that the full text appears:

    > [!div class="mx-imgBorder"]
    > ![Show product name in order detail.](media/northwind-orders-canvas-part3/details-09.png)

    This expression walks from a record in the **Order Details** table. The record is held in **ThisItem** over to the **Order Products** table through a many-to-one relationship:

    ![Many-to-one relationship between the Order Details table and the Order Product table.](media/northwind-orders-canvas-part3/schema-orderdetails-rel.png)

    The **Product Name** column (and other columns that you're about to use) are extracted:

    ![Column in the Order Products table.](media/northwind-orders-canvas-part3/schema-products-fields.png)

## Show product images

1. On the **Insert** tab, insert an [**Image**](controls/control-image.md) control into the detail gallery:

    > [!div class="mx-imgBorder"]
    > ![Insert image control on canvas.](media/northwind-orders-canvas-part3/details-10.png)

1. Resize and move the image and the label to be side by side.

    > [!TIP]
    > For fine-grained control over the size and the position of a control, start to resize or move it without pressing the Alt key, and then continue to resize or move the control while you hold down the Alt key:

    > [!div class="mx-imgBorder"]
    > ![Move image control.](media/northwind-orders-canvas-part3/details-11.png)

1. Set the image's **Image** property to this formula:

    ```power-fx
    ThisItem.Product.Picture
    ```

    Again, the expression references a product that's associated with this order detail and extracting the **Picture** field to display.

    > [!div class="mx-imgBorder"]
    > ![Show product image.](media/northwind-orders-canvas-part3/details-12.png)

1. Reduce the height of the gallery's template so that more than one **Order Detail** record appears at a time:

    > [!div class="mx-imgBorder"]
    > ![Shorten the gallery's template.](media/northwind-orders-canvas-part3/details-13.png)

## Show product quantity and cost

1. On the **Insert** tab, insert another label into the detail gallery, and then resize and move the new label to the right of the product information.

1. Set the new label's **Text** property to this expression:

    ```power-fx
    ThisItem.Quantity
    ```

    This formula pulls information directly from the **Order Details** table (no relationship required).

    > [!div class="mx-imgBorder"]
    > ![Show product quantity.](media/northwind-orders-canvas-part3/details-13b.png) 

1. On the **Home** tab, change the alignment of this control to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment to right.](media/northwind-orders-canvas-part3/details-14.png)

1. On the **Insert** tab, insert another label into the detail gallery, and then resize and move the label to the right of the quantity label.

1. Set the new label's **Text** property to this formula:

    ```power-fx
    Text( ThisItem.'Unit Price', "[$-en-US]$ #,###.00" )
    ```

    If you don't include the language tag (**[$-en-US]**), it will be added for you based on your language and region. If you use a different language tag, you'll want to remove the **$** just after the close square bracket (**]**), and then add your own currency symbol in that position.

    > [!div class="mx-imgBorder"]
    > ![Show unit price.](media/northwind-orders-canvas-part3/details-15.png)

1. On the **Home** tab, change the alignment of this control to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment towards right.](media/northwind-orders-canvas-part3/details-16.png)

1. On the **Insert** tab, insert another label control into the detail gallery, and then resize and move the new label to the right of the unit price.

1. Set the new label's **Text** property to this formula:

    ```power-fx
    Text( ThisItem.Quantity * ThisItem.'Unit Price', "[$-en-US]$ #,###.00" )
    ```

    Again, if you don't include the language tag (**[$-en-US]**), it will be added for you based on your language and region. If the tag is different, you'll want to use your own currency symbol instead of the **$** just after the close square bracket (**]**).

    > [!div class="mx-imgBorder"]
    > ![Show extended price.](media/northwind-orders-canvas-part3/details-17.png)

1. On the **Home** tab, change the alignment of this control to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment on right.](media/northwind-orders-canvas-part3/details-18.png)

    You're done adding controls to the detail gallery for now.

1. In the **Tree view** pane, select **Screen1** to ensure that the detail gallery is no longer selected.

## Add text to the new title bar

1. On the **Insert** tab, insert another label on to the screen:

    > [!div class="mx-imgBorder"]
    > ![Screenshot of insert label.](media/northwind-orders-canvas-part3/details-19.png)

1. Resize and move the new label above the pictures of the products in the second title bar, and then change the text's color to white on the **Home** tab.

1. Double-click the label's text, and then type **Product**:

    > [!div class="mx-imgBorder"]
    > ![Change label text to Product.](media/northwind-orders-canvas-part3/details-20.png)

1. Copy and paste the product label, and then resize and move the copy above the quantity column.

1. Double-click the new label's text, and then type **Quantity**:

    > [!div class="mx-imgBorder"]
    > ![Change label text to Quantity.](media/northwind-orders-canvas-part3/details-21.png)

1. Copy and paste the quantity label, and then resize and move the copy above the unit-price column.

1. Double-click the new label's text, and then type **Unit Price**:

    > [!div class="mx-imgBorder"]
    > ![Change label text to Unit Price.](media/northwind-orders-canvas-part3/details-22.png)

1. Copy and paste the unit-price label, and then resize and move the copy above the extended-price column.

1. Double-click the text of the new label, and then type **Extended**:

    > [!div class="mx-imgBorder"]
    > ![Change label text to Extended.](media/northwind-orders-canvas-part3/details-23.png)

## Display order totals

1. Reduce the height of the detail gallery to make room for the order totals at the bottom of the screen:

    > [!div class="mx-imgBorder"]
    > ![Shorten order-details gallery.](media/northwind-orders-canvas-part3/sum-01.png)

1. Copy and paste the title bar in the middle of the screen, and then move the copy to the bottom of the screen:

    > [!div class="mx-imgBorder"]
    > ![Copy title bar, and move copy to the bottom edge.](media/northwind-orders-canvas-part3/sum-02.png)

1. Copy and paste the product label from the middle title bar, and then move the copy to the bottom title bar, just to the left of the **Quantity** column.

1. Double-click the new label's text, and then type this text:<br>**Order Totals:**

    > [!div class="mx-imgBorder"]
    > ![Add label for order totals.](media/northwind-orders-canvas-part3/sum-03.png)

1. Copy and paste the order-totals label, and then resize and move the copy to the right of the order-totals label.

1. Set the new label's **Text** property to this formula:

    ```power-fx
    Sum( Gallery1.Selected.'Order Details', Quantity )
    ```

    This formula shows a delegation warning, but you can ignore it because no single order will contain more than 500 products.

1. On the **Home** tab, set the new label's text alignment to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment.](media/northwind-orders-canvas-part3/sum-04.png)

1. Copy and paste this label control, and then resize and move the copy under the **Extended** column.

1. Set the copy's **Text** property to this formula:

    ```power-fx
    Text( Sum( Gallery1.Selected.'Order Details', Quantity * 'Unit Price' ), "[$-en-US]$ #,###.00" )
    ```

    This formula shows a delegation warning, but you can ignore it because no single order will contain more than 500 products.

    > [!div class="mx-imgBorder"]
    > ![Show total cost of order.](media/northwind-orders-canvas-part3/sum-05.png)

## Add space for new details

In any gallery, you can show data but you can't update it or add records. Under the detail gallery, you'll add an area where the user can configure a record in the **Order Details** table and insert that record into an order.

1. Reduce the height of the detail gallery enough to make room for a single-item editing space under that gallery.

    In this space, you'll add controls so that the user can add an order detail:

    > [!div class="mx-imgBorder"]
    > ![Shorten the detail gallery.](media/northwind-orders-canvas-part3/add-details-01.png)

1. On the **Insert** tab, insert a label, and then resize and move it under the detail gallery.

    > [!div class="mx-imgBorder"]
    > ![Insert label.](media/northwind-orders-canvas-part3/add-details-02.png)

1. Double-click the text of the new label, and then press Delete.

1. On the **Home** tab, set the new label's **Fill** color to **LightBlue**:

    > [!div class="mx-imgBorder"]
    > ![Change label's fill to light blue.](media/northwind-orders-canvas-part3/add-details-03.png)

## Select a product

1. On the **Insert** tab, select **Controls** > **Combo box**:

    > [!div class="mx-imgBorder"]
    > ![Insert combo box.](media/northwind-orders-canvas-part3/add-details-08.png)

    The [**Combo box**](controls/control-combo-box.md) control appears in the upper-left corner.

1. In the fly out dialog, select the **Order Products** data source.

1. In the **Properties** tab for the combo box, select **Edit** (next to **Fields**) to open the **Data** pane.  Ensure that the **Primary text** and **SearchField** are set to **nwind_productname**.

    You specify the logical name because the **Data** pane doesn't support display names in this case yet:

    > [!div class="mx-imgBorder"]
    > ![Set the Primary text for the combo box.](media/northwind-orders-canvas-part3/add-details-10.png)

1. Close the **Data** pane.

1. In the **Properties** tab near the right edge, scroll down, turn off **Allow multiple selection**, and ensure that **Allow searching** is turned on:

    > [!div class="mx-imgBorder"]
    > ![Disable multiple selection and enable searching.](media/northwind-orders-canvas-part3/add-details-12.png)

1. Resize and move the combo box to the light-blue area, just under the product-name column in the detail gallery:

    > [!div class="mx-imgBorder"]
    > ![Move combo box.](media/northwind-orders-canvas-part3/add-details-13.png)

    In this combo box, the user will specify a record in the **Product** table for the **Order Details** record that the app will create.

1. While holding down the Alt key, select the combo box's down arrow.

    > [!TIP]
    > By holding down the Alt key, you can interact with controls in Power Apps Studio without opening Preview mode.

1. In the list of products that appears, select a product:

    > [!div class="mx-imgBorder"]
    > ![Select a product in the combo box.](media/northwind-orders-canvas-part3/add-details-14.png)

## Add a product image

1. On the **Insert** tab, select **Media** > **Image**:

    > [!div class="mx-imgBorder"]
    > ![Insert image control.](media/northwind-orders-canvas-part3/add-details-15.png)

    The [**Image**](controls/control-image.md) control appears in the upper-left corner:

    > [!div class="mx-imgBorder"]
    > ![Default location of image control.](media/northwind-orders-canvas-part3/add-details-16.png)

1. Resize and move the image to the light-blue area under the other product images and next to the combo box.

1. Set the **Image** property of the image to:

    ```power-fx
    ComboBox1.Selected.Picture
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the Image property of the image.](media/northwind-orders-canvas-part3/add-details-17.png)

    You're using the same trick as you used to show the employee picture in the summary form. The **Selected** property of the combo box returns the entire record of whatever product the user selects, including the **Picture** field.

## Add a quantity box

1. On the **Insert** tab, select **Text** > **Text input**:

    > [!div class="mx-imgBorder"]
    > ![Add text-input box.](media/northwind-orders-canvas-part3/add-details-18.png)

    The [**Text input**](controls/control-text-input.md) control appears in the upper-left corner:

    > [!div class="mx-imgBorder"]
    > ![Default location of text-input box.](media/northwind-orders-canvas-part3/add-details-19.png)

1. Resize and move the text-input box to the right of the combo box, under the quantity column in the detail gallery:

    > [!div class="mx-imgBorder"]
    > ![Resize and move text-input box.](media/northwind-orders-canvas-part3/add-details-20.png)

    By using this text-input box, the user will specify the **Quantity** field of the **Order Details** record.

1. Set the **Default** property of this control to **""**:

    > [!div class="mx-imgBorder"]
    > ![Set the **Default** property of the text-input box.](media/northwind-orders-canvas-part3/add-details-21.png)

1. On the **Home** tab, set the text alignment of this control to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment of the control to right.](media/northwind-orders-canvas-part3/add-details-22.png)

## Show the unit and extended prices

1. On the **Insert** tab, insert a **Label** control.

    The label appears in the upper-left corner of the screen:

    > [!div class="mx-imgBorder"]
    > ![Insert a label.](media/northwind-orders-canvas-part3/add-details-23.png)

1. Resize and move the label to the right of the text-input control, and set the label's **Text** property to this formula:

    ```power-fx
    Text( ComboBox1.Selected.'List Price', "[$-en-US]$ #,###.00" )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the label's Text property.](media/northwind-orders-canvas-part3/add-details-24.png)

    This control shows the **List Price** from the **Order Products** table. This value will determine the **Unit Price** field in the **Order Details** record.

    > [!NOTE]
    > For this scenario, the value is read-only, but other scenarios might call for the app user to modify it. In that case, use a **Text input** control, and set its **Default** property to **List Price**.

1. On the **Home** tab, set the text alignment of the list-price label to **Right**:

    > [!div class="mx-imgBorder"]
    > ![Change alignment of control to right side.](media/northwind-orders-canvas-part3/add-details-25.png)

1. Copy and paste the list-price label, and then resize and move the copy to the right of the list-price label.

1. Set the new label's **Text** property to this formula:

    ```power-fx
    Text( Value(TextInput1.Text) * ComboBox1.Selected.'List Price', "[$-en-US]$ #,###.00" )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the new label's Text property.](media/northwind-orders-canvas-part3/add-details-27.png)

    This control shows the extended price based on the quantity that the app user specified and the list price of the product that the app user selected. It's purely informational for the app user.

1. Double-click the text-input control for quantity, and then type a number.

    The **Extended** price label recalculates to show the new value:

    > [!div class="mx-imgBorder"]
    > ![Specify a quantity, and show the extended price.](media/northwind-orders-canvas-part3/add-details-28.png)

## Add an Add icon

1. On the **Insert** tab, select **Icons** > **Add**:

    > [!div class="mx-imgBorder"]
    > ![Insert Add icon.](media/northwind-orders-canvas-part3/add-details-29.png)

    The icon appears in the upper-left corner of the screen.

    > [!div class="mx-imgBorder"]
    > ![Default location of Add icon.](media/northwind-orders-canvas-part3/add-details-30.png)

1. Resize and move this icon to the right edge of the light-blue area, and then set the icon's **OnSelect** property to this formula:

    ```power-fx
    Patch( 'Order Details',
        Defaults('Order Details'),
        {
            Order: Gallery1.Selected,
            Product: ComboBox1.Selected,
            Quantity: Value(TextInput1.Text),
            'Unit Price': ComboBox1.Selected.'List Price'
        }
    );
    Refresh( Orders );
    Reset( ComboBox1 );
    Reset( TextInput1 )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the icon OnSelect property.](media/northwind-orders-canvas-part3/add-details-31.png)

    In general, the [**Patch**](functions/function-patch.md) function updates and creates records, and the specific arguments in this formula determine the exact changes that the function will make.

    - The first argument specifies the data source (in this case, the **Order Details** table) in which the function will update or create a record.
    - The second argument specifies that the function will create a record with the default values for the **Order Details** table unless otherwise specified in the third argument.
    - The third argument specifies that four columns in the new record will contain values from the user.

      - The **Order** column will contain the number of the order that the user selected in order gallery.
      - The **Product** column will contain the name of the product that the user selected in the combo box that shows products.
      - The **Quantity** column will contain the value that the user specified in the text-input box.
      - The **Unit Price** column will contain the list price of the product that the user selected for this order detail.

    > [!NOTE]
    > You can build formulas that use data from any column (in the **Order Products** table) for whatever product the app user selects in the combo box that shows products. When the user selects a record in the **Order Products** table, not only does the product’s name appear in that combo box but also the product’s unit price appears in a label. Each lookup value in a canvas app references an entire record, not just a primary key.

    The **Refresh** function ensures that the **Orders** table reflects the record that you’ve just added to the **Order Details** table. The **Reset** function clears the product, quantity, and unit-price data so that the user can more easily create another order detail for the same order.

1. Press F5, and then select the **Add** icon.

    The order reflects the information that you specified:

    > [!div class="mx-imgBorder"]
    > ![Animation of adding an order detail.](media/northwind-orders-canvas-part3/add-details.gif)

1. (optional) Add another item to the order.

1. Press Esc to close Preview mode.

## Remove an order detail

1. In the center of the screen, select the template of the detail gallery:

    > [!div class="mx-imgBorder"]
    > ![Select gallery template.](media/northwind-orders-canvas-part3/remove-details-01.png)

1. On the **Insert** tab, select **Icons** > **Trash**:

    > [!div class="mx-imgBorder"]
    > ![Insert Trash icon.](media/northwind-orders-canvas-part3/remove-details-02.png)

    The Trash icon appears in the upper-left corner of gallery's template.

    > [!div class="mx-imgBorder"]
    > ![Default location of icon.](media/northwind-orders-canvas-part3/remove-details-03.png)

1. Resize and move the Trash icon to the right side of the detail gallery's template, and set the icon's **OnSelect** property to this formula:

    ```power-fx
    Remove( 'Order Details', ThisItem ); Refresh( Orders )
    ```

    > [!div class="mx-imgBorder"]
    > ![Set the icon's OnSelect property.](media/northwind-orders-canvas-part3/remove-details-04.png)

    As of this writing, you can't remove a record directly from a relationship, so the [**Remove**](functions/function-remove-removeif.md) function removes a record directly from the related table. **ThisItem** specifies the record to remove, taken from the same record in the detail gallery where the Trash icon appears.

    Again, the operation uses cached data, so the **Refresh** function informs the **Orders** table that the app has changed one of its related tables.

1. Press F5 to open Preview mode, and then select the Trash icon next to each **Order Details** record that you want to remove from the order.

1. Try adding and removing various order details from your orders:

    > [!div class="mx-imgBorder"]
    > ![Animation of adding and removing order details.](media/northwind-orders-canvas-part3/remove-details.gif)

## In conclusion

To recap, you added another gallery to show order details and controls adding and removing an order detail in the app. You used these elements:

- A second gallery control, linked to the order gallery through a one-to-many relationship: **Gallery2.Items** = `Gallery1.Selected.'Order Details'`
- A many-to-one relationship from the **Order Details** table to the **Order Products** table: `ThisItem.Product.'Product Name'` and `ThisItem.Product.Picture`
- The **Choices** function to get a list of products: `Choices( 'Order Details'.Product' )`
- The **Selected** property of a combo box as the complete many-to-one related record: `ComboBox1.Selected.Picture` and `ComboBox1.Selected.'List Price'`
- The **Patch** function to create an **Order Details** record: `Patch( 'Order Details', Defaults( 'Order Details' ), ... )`
- The **Remove** function to delete an **Order Details** record: `Remove( 'Order Details', ThisItem )`

This series of topics has been a quick walkthrough of using Dataverse relationships and choices in a canvas app for educational purposes. Before you release any app to production, you should consider field validation, error handling, and many other factors.

---

## Build global support into canvas apps

Source: [global-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/global-apps)

*Learn about how to use Power Apps to build apps that use different languages.*

# Build global support into canvas apps
Power Apps is a global product. You can build and use canvas apps in many different languages and regions.

Both while building and running apps, the text displayed by Power Apps has been translated into different kinds of languages.  You'll see menu items, dialog boxes, ribbon tabs, and other text in your native language.  Typing in and displaying dates and numbers is also adapted for your particular language and region.  For example, some regions of the world use a **.** (dot or period) as the decimal separator while others use a **,** (comma).  

The apps you create can be globally aware as well.  Use the **[Language](functions/function-language.md)**, **[Text](functions/function-text.md)**, **[Value](functions/function-value.md)**, **[DateValue](functions/function-datevalue-timevalue.md)**, and other functions to adapt what is displayed and used as input in different languages.   

## Language settings
When using the native studio or a native player, the language used is provided by the host operating system. For Windows, this setting can be controlled under "All Settings" and then "Time & language" settings.  Windows also allows you to specify the characters to use for the decimal separator, overriding the language setting.  

When using the web experiences, the language used is provided by the browser.  Most browser default to the host operating system's setting with some also providing a way to set the language manually.

## Authoring environment
The authoring environment adapts to the language setting of the author.  The app itself is stored in a language agnostic manner, so that authors using different languages can edit the same app.

### Names in formulas
Most elements in formula are always in English:

* Function names: **If**, **Navigate**, **Collect**, and so on.
* Control property names: **Screen.Fill**, **Button.OnSelect**, **Textbox.Font**, and so on.
* Enumeration names: **Color.Aqua**, **DataSourceInfo.MaxValue**, **FontWeight.Bold**, and so on.
* Signal records: **Compass.Heading**, **Location. Latitude**, **App.ActiveScreen**, and so on.
* Operators: **Parent**, **in**, **exactIn**, and so on.

As the authoring experience is localized, control and other object names will appear in the native language of the author.  In Spanish, some of the control names appear as:

![Control names in Spanish.](media/global-apps/insert-controls-es.png "Control names in Spanish")

When you insert one of these controls into your app, their name will default to English.  This change is done for consistency with the control property names and the rest of the formula.  For example, **Casilla** listed above is inserted as **Checkbox1**.  

After a control is inserted, you can change the name to whatever you like.  While selected, the far left-hand side of the "Content" ribbon displays the name of the control.  Selecting this name drops down a text box where you can edit the name:

![Experience in Spanish.](media/global-apps/control-rename.png "Experience in Spanish")

If you like, here you can rename the control to **Casilla1**.  The red squiggly, in this case displayed by a browser, is because the name isn't a Spanish word and is of no concern.

You can use whatever names you like for:

* Control names
* Collection names
* Context variable names

### Formula separators and chaining operator
Some [separators and operators](functions/operators.md) will shift based on the decimal separator of the author's language:

| Author's language decimal separator | Power Apps decimal separator | Power Apps list separator | Power Apps chaining operator |
| --- | --- | --- | --- |
| **.** (dot or period) |**.** (dot or period) |**,** (comma) |**;** (semi-colon) |
| **,** (comma) |**,** (comma) |**;** (semi-colon) |**;;** (double semi-colon) |

The change in the Power Apps list separator is consistent with what happens to the Excel list separator.  It impacts:

* Arguments in function calls.
* Fields in a [record](working-with-tables.md#elements-of-a-table).
* Records in a [table](working-with-tables.md#inline-value-tables).

For example, consider the following formula expressed in a language and region that uses dot or period as the decimal separator, such as Japan or the United Kingdom:

![Power Apps formula If open paren slider1 dot value greater than 12 dot 59 comma notify open paren double-quote Valid! double-quote comma success close paren semi-colon Navigate open paren double-quote NextScreen double-quote comma None close paren comma notify open paren double-quote Invalid, try again double-quote comma error close paren close paren.](media/global-apps/operators-dot.png)

Now view this same formula in a language and region where a comma is used for the decimal separator, such as France or Spain:

![Power Apps formula If open paren slider1 dot value greater than 12 comma 59 semi-colon notify open paren double-quote Valid! double-quote semi-colon success close paren double semi-colon Navigate open paren double-quote NextScreen double-quote semi-colon None close paren semi-colon notify open paren double-quote Invalid, try again double-quote semi-colon error close paren close paren.](media/global-apps/operators-comma.png)

The highlight shows the operators that change between the two versions. The property selection operator **.** (dot or period) in **Slider1.Value** is always the same, no matter what the decimal separator is.

Internally the formula doesn't change, all that changes is how it's displayed and edited by the author.  Two different authors using two different languages can view and edit the same formula, with each seeing the appropriate separators and operators for their language.

## Creating a global app
The app you create can adapt to different languages, providing a great user experience for your users around the world.

### Language function
The **[Language](functions/function-language.md)** function returns the language tag of the current user.  For example, this function returns **"en-GB"** for users in Great Britain and **"de-DE"** for users in Germany.  

Among other things, you can use **Language** to display translated text for your users.  Your app can include a table of translated values in your app:

![Table with localized text.](media/global-apps/loc-table.png "Table with localized text")

And then use a formula such as the following to pull translated strings from the table:

```power-fx
LookUp( Table1, TextID = "Hello" && (LanguageTag = Left( Language(), 2 ) || IsBlank( LanguageTag ))).LocalizedText
```

Translated strings in other languages could be longer than they are in your language.  In many cases, the labels and other elements that display the strings in your user interface will need to be wider to accommodate.

For more information, see the documentation for the **[Language](functions/function-language.md)** function.

### Formatting numbers, dates, and times
Numbers, dates, and times are written in different formats in different parts of the world.  The meaning of commas, decimals, and the order of month, date, and year vary from location to location.   

The **[Text](functions/function-text.md)** function formats numbers and dates using the language setting of the user.

**Text** requires a format string to know how you want to format the number or date.  This format string can take one of two forms:

* **A global aware enumeration.**  For example, **Text( Now(), DateTimeFormat.LongDate )**.  This formula will format the current date in a language appropriate format.  This method is the preferred way to specify the format string.
* **A custom format string.**  For example, **Text( Now(), "[$-en-US]dddd, mmmm dd, yyyy" )** displays the same text as the enumeration when used in the language "en-US".  The advantage of the custom format string is that you can specify exactly what you want.

The "[$-en-US]" on the front of the custom format string tells **Text** in which language to interpret the custom format string.  This string is inserted for you and defaults to your authoring language. Normally you won't need to change this string.  It's useful when authors from different languages are editing the same app.

The third argument to **Text** specifies which language to use for the result of the function.  The default is the language setting of the current user.

For more information, see the documentation for the **[Text](functions/function-text.md)** function.      

### Reading numbers, dates, and times
There are four functions for reading numbers, dates, and times provided by the user:

* **[Value](functions/function-value.md)**: Converts a number in a text string to a number value.
* **[DateValue](functions/function-datevalue-timevalue.md)**: Converts a date value in a text string to a date/time value.  Anytime specified in the text string is ignored.
* **[TimeValue](functions/function-datevalue-timevalue.md)**: Converts a time value in a text string to a date/time value.  Any date specified in the text string is ignored.
* **[DateTimeValue](functions/function-datevalue-timevalue.md)**: Converts a date and time value in a text string to a date/time value.  

If you have used Excel, all of these functions are combined in the single **Value** function.  They're broken out here since Power Apps has separate types for date/time values and numbers.

All of these functions have the same arguments:

* *String, required*: A string from the user. For example, a string types into a **Text input** control and read from the control with the **Text** property.
* *Language, optional*: The language in which to interpret the *String*.  By default, the language setting of the user.

For example:

* **Value( "12,345.678", "en-US" )** or **Value( "12,345.678" )** when located where "en-US" is the user's language returns the number **12345.678**, ready for calculations.
* **DateValue( "1/2/01", "es-ES" )** or **DateValue( "1/2/01" )** when located where "es-ES" is the user's language returns the date/time value **February 1, 2001 at midnight**.
* **TimeValue( "11:43:02", "fr-FR" )** or **TimeValue( "11:43:02" )** when located where "fr-FR" is the user's language returns the date/time value **January 1, 1970 at 11:43:02**.
* **DateTimeValue( "11:43:02 1/2/01", "de-DE" )** or **DateTimeValue( "11:43:02 1/2/01" )** when located where "de-DE" is the user's language returns the date/time value **February 1, 2001 at 11:43:02**.

For more information, see the documentation for the **[Value](functions/function-value.md)** and **[DateValue, TimeValue, and DateTimeValue](functions/function-datevalue-timevalue.md)**  functions and [working with dates and times](show-text-dates-times.md).

### Calendar and Clock information
The **[Calendar](functions/function-clock-calendar.md)** and **[Clock](functions/function-clock-calendar.md)** functions provide calendar and clock information for the user's current language.  

Among other things, use these functions to provide a **Dropdown** control with a list of choices.  

For more information, see the documentation for the **[Calendar](functions/function-clock-calendar.md)** and **[Clock](functions/function-clock-calendar.md)**  functions.

---

## Build a multi-language app

Source: [multi-language-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/multi-language-apps)

*Use Power Apps to build apps that that can support multiple languages.*

# Build a multi-language app

In this article, you'll learn how to create a multi-language app with localized experience. With this method, you can use canvas app components and make translations available in an app using a uniform formula syntax.

> [!IMPORTANT]
> The method described in this article use components for canvas apps which is in public preview. For more information, see [Create a component for canvas apps](create-component.md)

## Create a translation component

When working with a multi-language app, the first step is to create a reusable component for translation. In this component, you'll store a table that acts as the dictionary of all translations you'll need. An output property will be used to provide output strings from this dictionary table based on the language of the user running the app that uses this component.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left pane, select **Apps**.

1. Under **Apps**, select **Component libraries (preview)**.

    ![Select Component libraries (preview).](media/multi-language-apps/apps-component-libraries.png "Select Component libraries (preview)")

1. Select **+ New component library (preview)**.

1. Enter a name, such as "Translation components", and select **Create** to open the component in Power Apps Studio.

1. Rename "Component1" by selecting **...** on the left pane, and then select **Rename** as "Translation component".

   ![Rename component.](media/multi-language-apps/rename-component.png "Rename component")

1. From the property pane on the right-side of the screen, select **+ New custom property**.

1. Set the following property values:

    | Property name | Value |
    | - | - |
    | Display name | Language |
    | Name | Language |
    | Description | The language that you want to translate the text to. |
    | Property type | Input |
    | Data type | Text |

1. Select **Raise OnReset when value changes** checkbox.

    ![New custom property.](media/multi-language-apps/new-custom-property.png "New custom property")

1. Select **Create**.

    > [!NOTE]
    > This input property will receive the current locale ID (LCID) of the logged-in user.

1. From the property pane on the right-side of the screen, select **+ New custom property**.

1. Set the following property values:

    | Property name | Value |
    | - | - |
    | Display name | Labels |
    | Name | Labels |
    | Description | Translated labels. |
    | Property type | Output |
    | Data type | Record |

    ![New labels property.](media/multi-language-apps/new-labels-property.png "New labels property")

1. Select **Create**.

    > [!NOTE]
    > This output property exposes the translated labels based on the input locale ID.

1. On the upper-left side of the screen, select the property list drop-down and choose **OnReset** property for the component.

    ![OnReset property for the component.](media/multi-language-apps/onreset.png "OnReset property for the component")

1. Copy and paste the following formula in the formula bar for the **OnReset** property.

   ```power-fx
   Set(
    varTranslations,
    Table(
            {
                Language: "en-us",
                Labels: {
                    Title: "UI Tips for building canvas apps",
                    JobTitle: "Power Platform Specialist"
                }
            },
            {
                Language: "pt-br",
                Labels: {
                    Title: "Dicas de UI para construir canvas apps",
                    JobTitle: "Especialista de Power Platform"
                }
            }
        )
       )
   ```

    The formula uses [Set()](functions/function-set.md) function to create a [table](functions/function-table.md) with the labels in different languages as a dictionary. To customize this table as the dictionary for your translations, change the control names such as *Title*, *JobTitle*, *Platform*, *Close*, *Open*, *Cancel*, and so on. You can add, or remove translations for control names depending on your business requirement.

    The table should also have an entry for each language that your app supports. Each entry will have a **Labels** property that will contain the translated content of all possible buttons, inputs, and labels in your app.

1. On the upper-left side of the screen, select the property list drop-down and choose **Labels** property for the component.

    ![Labels property for the component.](media/multi-language-apps/labels.png "Labels property for the component")

1. Copy and paste the following formula in the formula bar for the **Labels** property.

    ```power-fx
       LookUp(
        varTranslations,
        Language = Lower(
            Coalesce(
                Self.Language,
                Language()
            )
        )).Labels
    ```

    The formula finds the right translation entry based on the input **Language** using the [Lookup()](functions/function-filter-lookup.md) function. In case where the language isn't set, the formula uses the current user's language as the filter through [Coalesce](functions/function-isblank-isempty.md) function.

1. Select **File** -> **Save** to save the component library.

1. Select **Publish** to publish the component library.

    > [!TIP]
    > To learn more about creating, saving, and publishing component library, go to [Create an example component library](component-library.md#create-an-example-component-library)

Your translation component library is created, saved, and published for use.

## Use the translation component in your app

Previously, you created the translation component library for reuse. In this section, you'll create an app that uses the translation component library and demonstrate the language translation based on the selected language.

1. Start by creating a [blank canvas app](create-blank-app.md) with **Phone** layout.

1. On the left-side of the screen, select **+** (Insert).

1. On the bottom-left side of the screen, select **Get more components**.

1. Select **Translation component**.

    ![Select Translation component library.](media/multi-language-apps/import-translation-component.png "Select Translation component library")

    > [!NOTE]
    > The name might be different if you saved the component library created earlier with a different name.

1. Select **Import**.

1. On the left-side of the screen, select **+** (Insert).

1. Under **Library components**, select **Translation component** to add the component to this app.

1. On the left-side of the screen, select the tree view.

1. Select the translation component.

1. On the upper-left side of the screen, select the property list drop-down and choose **Visible** property for the component.

1. Set the value of the **Visible** property to **false** to make the component invisible on the app.

1. Under **Input** in the list of controls, select **Toggle**.

1. On the upper-left side of the screen, select the property list drop-down and choose **OnChange** property for the component.

1. Update the formula for the **OnCheck** property of the toggle control to the following.

    ```power-fx
        Set(varLanguage,"pt-br")
    ```

    In this formula, the toggle sets a variable called **varLanguage** with the value of "pt-br" using the function [Set()](functions/function-set.md), for Portuguese (BR) language code.

1. Update the formula for the **OnUncheck** property of the toggle control to the following.

    ```power-fx
        Set(varLanguage,"en-us")
    ```

    In this formula, the toggle sets a variable called **varLanguage** with the value of "en-us" using the function [Set()](functions/function-set.md), for English (US) language code.

1. On the left-side of the screen, select the translation component.

1. On the upper-left side of the screen, select the property list drop-down and choose **Language** property for the component.

1. Set the formula value for **Language** property to `varLanguage`. The variable **varLanguage** is determined by the toggle configured earlier. When the toggle is checked, the language is set to "pt-br". When unchecked, the language is set to "en-us".

1. On the left-side of the screen, select **+** (Insert).

1. Select **Text label**.

1. Update the label control name to **Title** from the right-side of the screen using the property pane.

1. Select **Text label** again to add one more label.

1. Update the label control name to **JobTitle**.

1. Set the **Title**, and **JobTitle** labels below the toggle control so that both labels are visible.

1. Set the **Text** property for **Title**, and **JobTitle** labels from the upper-left side of the screen to the following.

    | Label | Formula |
    | - | - |
    | Title | `'Translation component_1'.Labels.Title`  |
    | JobTitle | `'Translation component_1'.Labels.JobTitle` |

    > [!NOTE]
    > Replace **'Translation component_1'** in this formula to the name of the component in your app, if different.

    Similarly, you can use different labels, and properties, as defined in the component that you created earlier to pass more property values. For example, in addition to *Title*, and *JobTitle*, you can create more properties such as *Description*, or *Instructions* in the component library with the translated text. And then, use such properties on the respective labels, as *'Translation component_1'.Labels.Description*, or *'Translation component_1'.Labels.Instructions*.

1. Select **File** -> **Save**, update the name for your app, and then select **Save** to save your app. More information: [Save and publish an app](save-publish-app.md)

## Test your app with language translation

Now your app is using the translation component. Go to [Power Apps](https://make.powerapps.com) and select the app to run.

When the toggle is selected, the language is changed to Portuguese (BR) for the labels. When unchecked, the language is set back to English (US).

![Translation demo.](media/multi-language-apps/translation-demo.png "Translation demo")

With this approach, you can now create your own component having the translations dictionary that fits your business requirement. And then, create more canvas apps that use the component that gives the business users the ability to use different languages.

### See also

[Add and configure controls](add-configure-controls.md) <br>
[Understand variables](working-with-variables.md) <br>
[Formula reference](formula-reference.md)

---

## Create accessible canvas apps

Source: [accessible-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps)

*How to make canvas apps accessible for people with disabilities*

# Create accessible canvas apps

An accessible canvas app will allow users with vision, hearing, and other impairments to successfully use the app. In addition to being a requirement for many governments and organizations, following the below guidelines increases usability for all users, regardless of their abilities.

Use the **[Accessibility Checker](accessibility-checker.md)** to help review potential accessibility issues in your app. 

## Layout and color
Common sense and uncomplicated design helps apps be more accessible to all users. When doing heavy customization of apps take note of the below suggestions. Power Apps themes are designed to meet accessibility standards.
- Ensure all elements are clearly visible and text is of sufficient size.  All content must be easily read and understood by the naked eye.
- Ensure input elements are labeled on the screen. **[AccessibleLabel](controls/properties-accessibility.md)** property defines what the screen reader will announce.
- If customizing colors, ensure the contrast ratio of text to background is 4.5:1 or greater. Software tools that assist this process are readily available.
- Ensure layout follows a logical flow when read from top to bottom, left to right.
- [Create a responsive app](build-responsive-apps.md) so that low-vision users can zoom in and use it without scrolling back and forth.

## Keyboard

When testing your app's accessibility, ensure the app can be used by keyboard only, with or without a screen reader.

The **Tab** key should navigate to interactive elements in a logical order. You can create this with a [logical app structure](accessible-apps-structure.md#logical-control-order) and by setting each control's **[TabIndex](controls/properties-accessibility.md)** property accordingly.
- Label, Image, Icon, Shape controls: Set **TabIndex** to 0 if they are meant to be interactive. Otherwise, set **TabIndex** to -1.
- Do not set **TabIndex** greater than zero.
- Ensure that the **Simplified tab index** app setting is enabled.

## Screen readers

The following screen readers have been verified to work with Power Apps:

- **JAWS**: Microsoft Edge
- **Narrator**: Microsoft Edge
- **NVDA**: Google Chrome, Firefox
- **TalkBack**: Google Chrome, [Power Apps mobile](../../mobile/run-powerapps-on-mobile.md)
- **VoiceOver**: [Power Apps mobile](../../mobile/run-powerapps-on-mobile.md), Safari (macOS, iOS, iPadOS)

To ensure a satisfying experience with the screen reader it is recommended to:

- Ensure all input controls have the **[AccessibleLabel](controls/properties-accessibility.md)** property set.
- For images, set **[AccessibleLabel](controls/properties-accessibility.md)** to an appropriate description.
  - If a picture is not used as a button or a link (i.e. icon is there just for the decoration) and should not be read by the screen reader, make sure the **[AccessibleLabel](controls/properties-accessibility.md)** is empty or not set.
  - If a picture or an icon is used as a button, then set **[TabIndex](controls/properties-accessibility.md)** to 0 and **[AccessibleLabel](controls/properties-accessibility.md)** to the link description.

## Control type and structure
Using the right controls and grouping them will help screen reader users understand the structure of the app.

- Include at least one heading on each screen of the app. You can create headings by setting the **Role** property of a **[Label](controls/control-text-box.md)**.
- Use a **[Button](controls/control-button.md)** instead of a **[Label](controls/control-text-box.md)** for interactive text.
- Group related content in **[Containers](controls/control-container.md)**.
- Be aware of [unsupported design patterns](accessible-apps-limitations.md).

## Multimedia
Ensure all videos are captioned and a transcript of all audio recordings is available to the user. **Video** control supports closed captions in WebVTT format via the **ClosedCaptionsUrl** property.

With the screen reader enabled, **Timer** does not announce button text, but how much time has passed. Announcements can't be turned off, even if timer is hidden with low opacity.

## Working with signatures
If you have a signature field that uses the PenInput control, you need to enable an alternative method of signature input. The recommended way is to show a TextInput control where a user can type their name.  Ensure the signing instructions are placed in the **[AccessibleLabel](controls/properties-accessibility.md)** property and the control is placed close to the Pen input - to the right or immediately below.

## Next steps

[Accessible app structure](accessible-apps-structure.md)

### See also

- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)
- [Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)
- [Use the Accessibility checker](accessibility-checker.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Organize controls in accessible canvas apps

Source: [accessible-apps-structure.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-structure)

*Learn about organizing controls for accessibility in canvas apps.*

# Organize controls in accessible canvas apps

Controls in an app should be organized to help screen reader users navigate sequentially. A logical order also reduces confusion for keyboard users and helps them be more productive.

## Meaningful screen name

When a screen is loaded, screen readers will say its name. Pick a meaningful name to orientate users.

You can change the screen name in the controls tree or properties panel in Power Apps Studio. Select the screen, and then select ![Select pen icon to edit the name.](media/accessible-apps-structure/pencil-icon.png "Select pen icon to edit the name") to rename the screen.

![Screen names can be changed from the controls tree or properties panel, as highlighted in the picture.](media/accessible-apps-structure/edit-screen-name.png "Rename the screen")

The first element on a screen is its name. It's visually hidden and accessible only to screen reader users.

When a new screen loads, Power Apps focuses the screen name. If you use **[SetFocus](functions/function-setfocus.md)** immediately when the screen loads, the screen name won't be read. Consider creating a visible title and making it a [live region](accessible-apps-live-regions.md) to announce the change in context.

## Logical control order

Screen reader users can navigate content sequentially. The order is determined by the position of controls, starting from top to bottom, then left to right. The size of the control doesn't matter, only its **[X](controls/properties-size-location.md)** and **[Y](controls/properties-size-location.md)** properties matter.

In this example, A appears first in the sequence since it's closest to the top. B and C have the same vertical position, but since B is closer to the left, and hence, it appears before C. D appears last since it's furthest from the top.

![How positioning affects the order of 4 controls.](media/accessible-apps-structure/control-order-isolated.png "How positioning affects the order of 4 controls.")

> [!NOTE]
> - In **Preview** mode when editing an app, the control order is not updated for performance reasons. The order will be correct when the app is published and run.
> - Control order is not the same as that shown in the [tree view of controls](add-configure-controls.md#add-and-select-a-control) in Power Apps Studio. The tree view sorts controls according to when they were added to the app. It does not affect the order of controls when the app is run.
> - When a control's **X** or **Y** value is set to an expression, the control order is not updated when the result of the expression changes. The order is computed and fixed when the app is saved, using the initial state of the app to evaluate expressions.
>     - If you're changing its position because other controls are being hidden or shown, you can use [auto-layout containers](./build-responsive-apps.md#auto-layout-containers) to manage **X** and **Y** for you.
>     - You can also position all controls in a logical way regardless of expression values. For example, if control A should always be below control B and B may be hidden sometimes, set A's **Y** to be `If(B.Visible, B.Y + B.Height, B.Y + 1)`. The addition of 1 ensures that A is always below B, even if B is hidden.

### Grouped controls

The default order is suitable for isolated content but not for grouped content. Consider two tiles side by side, drawn with **[Rectangle](controls/control-shapes-icons.md)** controls. Each tile has a heading. Below the heading are two buttons stacked vertically: A and B for the first tile and C and D for the other.

![Example of incorrect practice: controls organized in a flat structure.](media/accessible-apps-structure/control-order-no-containers.png "Example of incorrect practice: controls organized in a flat structure.")

The default order goes from top to bottom, then left to right. Hence, the order of controls is:

1. Left **Rectangle**
1. Right **Rectangle**
1. Left heading
1. Right heading
1. A
1. C
1. B
1. D

This structure doesn't convey that A and B are together, and similarly, C and D are together.

Use **[Containers](controls/control-container.md)** to group related content. All controls in a **Container** will appear together in sequence. Within a container, controls are ordered with the same rule: top to bottom, then left to right.

Replacing the **Rectangles** of the previous example with **Containers**, the control order is now logical for screen reader users:

1. Left **Container**
1. Left heading
1. A
1. B
1. Right **Container**
1. Right heading
1. C
1. D

![Example of recommended practice: controls organized in a hierarchical structure using Containers.](media/accessible-apps-structure/control-order-with-containers.png "Example of recommended practice: controls organized in a hierarchical structure using Containers.")

All controls in a **[Form Card](controls/control-card.md)** and **[Gallery](controls/control-gallery.md)** are automatically grouped, so you don't have to use a **Container**. However, if there are subgroups, you should still use **Containers** for them.

In this example, a **Gallery** row has a thumbnail and two pieces of text on the left. On the right are two buttons. Visually and logically, the two sets of controls should be grouped. This ensures that screen reader users will encounter the left group first before the right.

![Example of recommended practice: related controls in a gallery are grouped inside Containers.](media/accessible-apps-structure/control-order-gallery.png "Example of recommended practice: related controls in a gallery are grouped inside Containers.")

## Logical keyboard navigation order

Keyboard navigation is an important aspect of any app. For many, the keyboard is more efficient than using touch or a mouse. The navigation order should:
- Follow the visual flow of controls.
- Follow either an intuitive across and then down "Z" order or a down and then across "reverse-N" order.
- Only have a tab stop at controls that are interactive.

**[AcceptsFocus](controls/properties-accessibility.md)** specifies whether controls can be reached by keyboard. For classic controls, the equivalent property is **[TabIndex](controls/properties-accessibility.md)**.

Navigation order follows [control order](#logical-control-order): from left-to-right, then top-to-bottom, in a "Z" pattern. You can customize it the same way as with control order. For example, controls in **[Containers](controls/control-container.md)**, **[Form Cards](controls/control-card.md)** and **[Galleries](controls/control-gallery.md)** are automatically grouped. The Tab key will navigate through all elements inside the container before proceeding to the next control outside of the container.

If the navigation order is unexpected, you should first check if the app structure is logical.

> [!NOTE]
> When controls are dynamically moved on the screen, for example, by having its **X** or **Y** value change according to a Power Fx expression, the navigation order will not be updated.


### Workaround for custom tab sequence

For rare scenarios where the keyboard navigation order should be different from visual order, you can position container controls carefully to have the same effect.

In the example below, button A is above button B. The natural tab navigation order is A, then B.

:::image type="content" source="media/accessible-apps-structure/simplified-tab-index-workaround-normal.png" alt-text="Two buttons with the same TabIndex, stacked vertically.":::

To reverse the tab navigation order, put B in a Container control. Set the Y value of the Container to be above A. The app structure now has the Container (and B) before A. Hence, the tab navigation order is B, then A.

:::image type="content" source="media/accessible-apps-structure/simplified-tab-index-workaround-container.png" alt-text="B is put in a container that appears before A.":::

With this technique, screen reader users will also encounter B before A when navigating without the **Tab** key.

### Custom tab indexes (retired feature)

Custom tab indexes are those that are greater than zero. They are no longer supported. All **TabIndex** values greater than zero will be treated as zero.

Custom tab indexes are almost always a sign of bad design. There are better alternatives like creating an appropriate app structure or using **[SetFocus](/power-platform/power-fx/reference/function-setfocus)** to change focus.

Some problems with custom tab indexes:

#### Accessibility
It's a serious accessibility issue to have custom tab indexes. Screen reader users navigate an app using its logical structure. Custom tab indexes ignore that structure. Since screen reader users can also navigate using **Tab** key, they'll be confused when they get a different order from other methods of navigation.

#### Usability
Users can be confused when some items appear to be skipped. They can be disoriented when focus moves in an unpredictable order. This is even more problematic for users with cognitive disabilities.

#### Maintenance
App makers have to manually update the **TabIndex** of multiple controls whenever a new one is inserted. It's easy to miss an update or get the order wrong.

#### Performance
To support custom tab indexes, the Power Apps system has to examine all controls on the page and compute the appropriate order. This computation is an intensive process. Container controls like **Gallery** have complicated rules on how **TabIndex** works for child controls. The system maps the app maker's desired **TabIndex** to a different value to obey these rules. This is why even if TabIndex is set to zero for all controls, the actual HTML `tabindex` will be some positive number.

#### Integration with other components
Custom tab indexes only work with built-in controls. Controls that aren't integrated into Power Apps' tab index system will have an unexpected navigation order. This can be a problem for [code components](/power-apps/developer/component-framework/component-framework-for-canvas-apps). Developers of these components have to keep track of interactive elements and set tab index on them. They might use third-party libraries, which may not even provide a way to customize tab indexes. On the other hand, when all tab indexes are either 0 or -1, there's no need to involve Power Apps' tab index system. Any third-party component embedded in the app will automatically get the correct tab sequence.

In the other direction, when canvas apps are embedded in another web page, custom tab indexes don't work. For example, in [custom pages](../model-driven-apps/model-app-page-overview.md). Power Apps can't control the elements outside the canvas app, so the overall tab navigation order will be illogical.


## Next steps

[Accessible colors in Power Apps](accessible-apps-color.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)
- [Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)
- [Use the Accessibility checker](accessibility-checker.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Improved canvas keyboard navigation in canvas apps (experimental)

Source: [accessibility-keyboard-navigation.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessibility-keyboard-navigation)

*Learn about how to use the improved canvas keyboard navigation experience for better accessibility.*

# Improved canvas keyboard navigation in canvas apps (experimental)

[This article is pre-release documentation and is subject to change.]

> [!IMPORTANT]
> - This is an experimental feature, and will be deprecated soon. Instead of using this experimental feature, consider [structuring an app appropriately](accessible-apps-structure.md#logical-control-order) to achieve the desired tab navigation order.
> - Experimental features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

When you're nesting controls such as containers and component instances, the user input value for [TabIndex](controls/properties-accessibility.md#acceptsfocus-and-tabindex) isn't respected sometimes. **Improved canvas keyboard navigation** experimental setting improves the navigation experience in this situation when **Tab** key is pressed on the keyboard helping focus on the desired container or control precisely and predictably.

This feature also adds support for handling accessibility for keyboard tabs inline with rest of the controls in canvas apps. And addresses manual TabIndex assignments for all controls.

> [!NOTE]
> This feature is added as "Experimental" to maintain backward compatibility and maintain existing app functionality.

When this feature is turned on, it also enables the following boolean properties for all child controls for the selected container or component instance in canvas apps:

| Property Name | Description |
| - | - |
| **Prioritize child controls** | Determines the order of navigation (**Z-order**) for child controls on canvas when pressing tab key on the keyboard. <ul> <li> **On** (Default): Pressing the tab key on the keyboard will first progress through all child controls before moving the focus outside of the selected container or component instance. This option is recommended for similarly nested HTML elements. </li> <li> **Off**: Pressing the tab key on the keyboard will progress through all controls only based on Z-order, ignoring parent-child relationship between controls or containers for keyboard navigation. </li> </ul> **Note**: This property isn't applicable to [responsive or autolayout](create-responsive-layout.md) containers. |
| **Enable child control focus** | Determines the value of [TabIndex](controls/properties-accessibility.md#acceptsfocus-and-tabindex) for child controls on canvas when pressing tab key on the keyboard. <ul> <li> **On** (Default): Pressing the tab key behaves as per TabIndex values defined on each control. </li> <li> **Off**: Pressing the tab key doesn't move focus to any child control within the selected container or component instance. Sets the TabIndex value to **-1** for all child controls. </li> </ul> |

## Configure improved canvas keyboard navigation in your app

If not already enabled, follow these steps to enable this feature in your app, and set the properties mentioned earlier.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** from the left-pane.

1. Select your app, and then select **Edit**.

1. In Power Apps Studio, select **Settings** > **Upcoming features** > **Experimental**.

1. Select **Improved canvas keyboard navigation** to turn on the feature.

    :::image type="content" source="media/accessibility-keyboard-navigation/improved-canvas-keyboard-navigation.png" alt-text="Improved canvas keyboard navigation setting":::

1. Close settings.

Now that you've enabled the experimental feature, you'll see two new properties for controls and containers&mdash;**Prioritize child controls**, and **Enable child control focus**. Change the property values as appropriate.

:::image type="content" source="media/accessibility-keyboard-navigation/additional-properties.png" alt-text="Improved canvas keyboard navigation properties":::

## Examples

Now that you understand the new feature with improved canvas keyboard navigation, let's take a look at a few examples to understand the behavior when the tab key is pressed.

### Default improved canvas keyboard navigation behavior

The following example shows multiple Text input controls, and several nesting scenarios. The number displayed in the input represents the value of the [TabIndex](controls/properties-accessibility.md#acceptsfocus-and-tabindex) property. There are two nested containers, and component controls overlaid on top of each other.

The default order is determined by the relative position of the controls. When focus enters a container or a component, tabs first traverse the children of the container before moving on to the next available control.

![Default behavior of the app](media\accessibility-keyboard-navigation\default-behavior.gif)

### When Prioritize child controls is set to Off

In the following example, each container and component control has the **Prioritize child controls** property set to "Off". All inputs are therefore considered to be on the same level of nesting, so the order is determined purely by their [X/Y position](controls/properties-size-location.md#position) relative to the screen.

![Don't prioritize child controls](media\accessibility-keyboard-navigation\child-control-priority.gif)

### Advanced configuration with mixed settings

In the following example, the orange outlined containers have **Prioritize child controls** property set to "Off". All others controls have this property set to "On". Also, a custom [TabIndex](controls/properties-accessibility.md#acceptsfocus-and-tabindex) property has been set for some inputs, indicated by the number shown in each input.

Tab order first proceeds through the containers and controls with TabIndex value of greater than 0, and then proceeds through all others with value of 0. This behavior was also the in the earlier implementation.

![Advanced configuration with mixed settings](media\accessibility-keyboard-navigation\hybrid-configuration.gif)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Use the Accessibility checker](accessibility-checker.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)
- [Improved canvas keyboard navigation in canvas apps (video)](https://youtu.be/p_tCI6Kpj68?feature=shared)

---

## Accessible colors for canvas apps

Source: [accessible-apps-color.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-color)

*Color-contrast guidelines for canvas apps in Power Apps*

# Accessible colors for canvas apps

Colors used in a canvas app should be accessible to color-blind and low-vision users. All Power Apps themes are accessible by default. When modifying colors used in an app, follow these guidelines to ensure that they remain accessible. There are several tools available online which can help you identify color contrast issues.

## Minimum contrast for text
* Text and its background must have a contrast ratio of at least 4.5:1
* Large text must have a contrast ratio of at least 3:1
* Disabled text has no contrast requirements

In practical terms, all interactive controls must have adequate color contrast between:
* **[Color](controls/properties-color-border.md)** and **[Fill](controls/properties-color-border.md)**
* **[PressedColor](controls/properties-color-border.md)** and **[PressedFill](controls/properties-color-border.md)**
* **[HoverColor](controls/properties-color-border.md)** and **[HoverFill](controls/properties-color-border.md)**

## Minimum contrast for non-text
* Non-text components, such as icons and borders, must have a contrast ratio of at least 3:1 with the colors outside of them.
* Disabled and decorative components have no contrast requirements.

### User interface components
All interactive controls must have adequate color contrast between:
* **[FocusedBorderColor](controls/properties-color-border.md)** and color outside the control

Additional color contrast checks apply for controls where the entire area is interactive or informative. For example, a **[Button](controls/control-button.md)** or an **[Icon](controls/control-shapes-icons.md)** used as a button. This ensures that the boundaries of the control are clear and users know where they can click or tap.

If there is a border for such controls, there should be adequate color contrast between:
* **[BorderColor](controls/properties-color-border.md)** and color outside the control
* **[PressedBorderColor](controls/properties-color-border.md)** and color outside the control
* **[HoverBorderColor](controls/properties-color-border.md)** and color outside the control

If there is no border, there should be adequate color contrast between:
* **[Fill](controls/properties-color-border.md)** and color outside the control
* **[PressedFill](controls/properties-color-border.md)** and color outside the control
* **[HoverFill](controls/properties-color-border.md)** and color outside the control

### Graphical objects
If an image conveys important information, consider checking it for contrast issues. This applies to controls where an image can be shown: **[Audio](controls/control-audio-video.md)**, **[Image](controls/control-image.md)**, **[Microphone](controls/control-microphone.md)**, and **[Video](controls/control-audio-video.md)**.

For video content, consider checking it for contrast issues. Alternatively or additionally, provide [closed captions](controls/control-audio-video.md) that describe the video.

## Provide other visual cues
Ensure that the app does not convey information with just color. For example, users with red-green color blindness will not be able to distinguish a red error message from a green success message.

Additional cues like an **[Icon](controls/control-shapes-icons.md)** or text styles like **[Italic](controls/properties-text.md)** and **[Underline](controls/properties-text.md)** can help convey meaning.

## Next steps

[Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)
- [Use the Accessibility checker](accessibility-checker.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Show or hide content from assistive technologies for canvas apps

Source: [accessible-apps-content-visibility.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-content-visibility)

*Techniques to show content only to sighted users or only to screen-reader users only for canvas apps*

# Show or hide content from assistive technologies for canvas apps

In most cases, all users should be able to access all content, but you might occasionally want to show content only to sighted users or only to screen-reader users. For example, you might want only screen-reader users to access descriptions of chart trends that are obvious to sighted users. You might also want to hide an icon from screen-reader users if an adjacent label describes it. Another description on the icon would be unnecessarily verbose.

## Hide content from all users

* Set **[Visible](controls/properties-core.md)** to false.

## Hide content from sighted users and show it to screen-reader users

Use one or more techniques listed below:

* Set **[Size](controls/properties-text.md)** to 0.
* Set **[Width](controls/properties-size-location.md)** and **[Height](controls/properties-size-location.md)** to 1.
* Set **[X](controls/properties-size-location.md)**, **[Y](controls/properties-size-location.md)**, or both properties such that the control is outside the screen.
* Set **[Color](controls/properties-color-border.md)** and related properties to transparent.
* Position a rectangle **[Shape](controls/control-shapes-icons.md)** above the content, and set **[Fill](controls/properties-color-border.md)** to the same color as the background color of the screen.

> [!NOTE]
> Users can still use a keyboard to access an interactive control, such as a **[Button](controls/control-button.md)**, even if you hide it by using one of the techniques in the previous list. Set **[TabIndex](controls/properties-accessibility.md)** to -1 if you want to prevent users from accessing the control by pressing the Tab key.

## Hide content from screen-reader users and show it to sighted users

* For **[Image](controls/control-image.md)**, **[Icon](controls/control-shapes-icons.md)**, and **[Shape](controls/control-shapes-icons.md)** controls, set **[AccessibleLabel](controls/properties-accessibility.md)** to the empty string "".

## Next steps

[Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Use the Accessibility checker](accessibility-checker.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Announce dynamic changes with live regions for canvas apps

Source: [accessible-apps-live-regions.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-live-regions)

*How to use live regions to notify screen readers of dynamic changes in canvas apps*

# Announce dynamic changes with live regions for canvas apps

Dynamic changes pose challenges to the visually-impaired. Users who access an app through a screen reader are focused on one part of the app. If a change happens elsewhere, those users won't be aware of it.

You can solve this problem by adding live regions, which screen readers track. If content changes in a live region, a screen reader will announce that change.

The underlying mechanism for live regions are [aria-live regions](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region), so the same guidelines apply.

## Example uses of live regions

You can use live regions to notify users when events such as these occur:

* A validation error occurs in a form.
* An action triggered by a button is successful. For example, a user might select a button to add an item to a collection, and a live region could show the message "Item added".
* The user selected a different tab.
* A background timer refreshes a news feed.

## Create and configure a live region

You can configure only a **[Label](controls/control-text-box.md)** control as a live region. Its **Live** property determines what type of live region it is.

* **Off**: Not a live region. Screen readers don't announce changes.
* **Polite**: Screen readers announce changes after finishing speaking. Use this value for non-critical notifications that don't require immediate attention.
* **Assertive**: Screen readers interrupt themselves to announce changes immediately. Use this for critical notifications that require immediate attention.

If the text content of a live region changes, screen readers will announce the entire text content, not just the changed portion. If the value of the **[Text](controls/properties-core.md)** property is set to the empty string **""**, the screen reader doesn't announce anything.

To repeat a message, clear text contents by setting the value of the **[Text](controls/properties-core.md)** property to the empty string **""** and then set the value to the message again.

## Best practices

* Always set **[Visible](controls/properties-core.md)** to true. Some screen readers don't detect live regions that disappear and reappear.
* Avoid changing the value of **[Live](controls/properties-accessibility.md)**. Some screen readers don't detect when a non-live region becomes live and vice-versa.
* Position the live region in a logical position in the app, even if it isn't visible. Ensure that its contents are sensible in context with the elements before and after it. Users can access a live region anytime through regular navigation with a screen reader, not just when changes happen.

## Next steps

[Use the Accessibility checker](accessibility-checker.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)
- [Accessibility limitations in canvas apps](accessible-apps-limitations.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Review a canvas app for accessibility in Power Apps

Source: [accessibility-checker.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessibility-checker)

*Identify ways to make a canvas app more accessible to users who have vision, hearing, and other impairments*

# Review a canvas app for accessibility in Power Apps

Users who have vision, hearing, or other impairments can use your canvas app more easily and successfully if you consider accessibility as you design how the app looks and behaves. If you're not sure how to make your app more accessible, you can run the Accessibility checker in Power Apps Studio. This tool not only finds potential accessibility issues but also explains why each might be a potential problem for users who have a specific disability and offers suggestions on how to resolve each issue.
The Accessibility checker detects screen-reader and keyboard issues for you, and you can find information about how to fix color-contrast issues  by using [accessible colors](accessible-apps-color.md).

The Accessibility checker helps you identify settings that you might want to change, but you should always consider the suggestions in the context of what your app needs to do. Many suggestions may be worthwhile, but you can ignore any that might do more harm than good.

## Find accessibility issues

1. In the upper-right corner of Power Apps Studio, select the icon for the App checker.

    ![App checker icon.](./media/accessibility-checker/app-checker-icon.png)

2. In the menu that appears, select **Accessibility**.

    ![App checker pane list of options.](./media/accessibility-checker/app-checker-menu.png)

    A list of issues appears, sorted first by severity and then by screen.

    ![Accessibility checker pane and list of items.](./media/accessibility-checker/accessibility-checker-pane.png)

3. Select the arrow next to an item to show details about it.

    ![Accessibility checker details.](./media/accessibility-checker/details-pane.png)

4. Select the back arrow to return to the list of items.

5. If you decide to address an issue, select it to open the affected property.

6. After you change one or more properties, select **Re-check** to update the list of issues.

    Resolved items disappear from the list, and new items may appear.

## Severity of issues

The Accessibility checker classifies each issue as an error, a warning, or a tip based the issue's severity.

- **Errors** identify issues that make the app difficult or impossible to use and understand for users who have a disability.
- **Warnings** identify issues that make the app difficult to use or understand for most but not all users who have a disability.
- **Tips** help you improve the experience of users who have a disability.

## Types of issues

| Issue Title                            | Severity | Issue Description  | How to fix | Why fix|
| ------------------------------         |:---------| -----| ------|------ |
| **Missing accessible label**           | Error    | When the accessible-label property of an interactive control contains no text. An interactive control can be inherently interactive, as a button is, or it has interactive properties. For example, you might have set the **OnSelect** property of an image or set its **TabIndex** property to 0 or higher.  | Edit the accessible-label property to describe the item. | If the accessible-label property contains no text, people who can’t see the screen won't understand what’s in images and controls. |
| **Focus isn't showing**                | Error    | When the **FocusBorderThickness** of a control is set to 0. It is good practice to ensure a proper color-contrast ratio between the focus border and the control itself so it's clearly visible. | Change the **FocusedBorderThickness** property to a value that's higher than 0.  | If the focus isn't visible, people who don't use a mouse can't see it when they interact with the app.   |
| **Missing captions**                   | Warning  | When the **ClosedCaptionsURL** property of an **Audio** or **Video** control is empty. | Set the **ClosedCaptionsURL** property to the URL for captions. | Without captions, people who have disabilities might not get any information from a video or audio segment. |
| **Missing helpful control settings**   | Warning  | When any of several settings (such as showing labels and markers for charts and showing default controls for **Audio**, **Video**, and **Pen input** controls) are turned off. | Select the warning, and then set the property to **true**. | By changing this property setting, you give the user better information about how the controls in your app function. |
| **HTML won't be accessible**           | Warning  | When a control other than an HTML text control contains HTML. In that case, Power Apps doesn't support accessibility of custom HTML elements. | Use a method other than HTML, or remove the HTML from this element. | Your app won't work correctly or be accessible if you add interactive HTML elements. |
| **Turn off autostart**                 | Warning  | When an **Audio** or **Video** control's **Autostart** property is set to **true**. | Set the control's **Autostart** property to **false**. | Video and audio files that play automatically can distract users. Let them choose whether to play a clip. |
| **Revise screen name**                 | Tip      | When a screen has a default name, which will be read out by screen readers when users navigate the app. | Give the screen a name that describes what's on the screen or what it's used for.| People who are blind, have low vision, or a reading disability rely on screen names to navigate using the screen reader. |
| **Add State indication text**          | Tip      |  When a control that has a state, such as a toggle, but the value labels are turned off. | Set the **ShowValue** property of the control to **true** to show its current state. | Users won't get confirmation of their actions if the state of the control doesn't appear. |
| **Check the order of the screen items**| Tip      | When the **TabIndex** property is greater than 0. App creators can set custom tab orders by setting the **TabIndex** property to a value greater than 0 but it is highly discouraged as it is hard to get right, maintain, and can break screen readers. | Set all **TabIndex** properties to 0 or -1 whenever possible.  Instead of using **TabIndex**, use the **Enhanced group** control to change the navigation order from the default.  If values of **TabIndex** greater than 0 must be used, make sure that your screen elements match the order in which you'd want to tab through them. | The navigation order should mirror the order in which controls appear on the screen, which is the default.  If manual adjustments are made, it is difficult to maintain the correct order especially in the presence of the browser's address bar and other controls outside of the app.  This can make a screen reader very difficult to use.  When read by the screen reader, the controls should be presented in the same order in which they are seen on the screen, instead of an order that's less intuitive.  |
| **Add another input method**           | Tip      | When an app contains a **Pen** control. This tip reminds you to include a separate method of input. | Add a **Text input** control in addition to the **Pen** control for an accessible experience. | Some users can't use a pen and require another way to provide information (for example, by typing a signature). |

## Next steps

[Accessibility limitations in canvas apps](accessible-apps-limitations.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)
- [Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)
- [Accessibility properties](controls/properties-accessibility.md)

---

## Accessibility limitations in canvas apps

Source: [accessible-apps-limitations.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-limitations)

*Learn about the accessibility limitations in canvas apps.*

# Accessibility limitations in canvas apps

You can [design and build accessible canvas apps](accessible-apps.md) with built-in controls. Sometimes, the combination of app design, use of various controls, and the configured control properties may result in an app to have an inaccessible user interface.

In this article, you'll learn about these accessibility limitations in canvas apps, and how can you improve the app interface to make it more accessible.

## Dialogs and overlays

Dialogs and user interfaces that appear on top of other content are not supported. These overlays require focus management, hiding background content from screen readers, and appropriate control roles.

Consider the following:

- Use separate screens for each “dialog”.
- Use the **[Notify](functions/function-showerror.md)** function.
- [Create a code component](../../developer/component-framework/overview.md) that implements an accessible dialog.

## Tabbed interfaces

A tabbed interface is made up of a list of tabs and a panel that shows content associated with the selected tab.

The only built-in control that supports tabbed interfaces is the **[Tab list](controls/modern-controls/modern-control-tabs-or-tabs-list.md)**. Avoid using **[Galleries](controls/control-gallery.md)** to create tabs. The list of tabs should be navigable with arrow keys. Appropriate control roles and states are required.

Consider the following:

- Use the built-in **[Tab list](controls/control-data-table.md)**.
- [Create a code component](../../developer/component-framework/overview.md) that implements an accessible tabbed interface.

## Custom tables

The only built-in control that supports two-dimensional data is the **[Data Table](controls/control-data-table.md)**. Avoid using **[Galleries](controls/control-gallery.md)** to present data in rows and columns. Rows and columns have to be annotated so that screen reader users can understand their structure and navigate cells.

Consider the following:

- Use the built-in **[Data Table](controls/control-data-table.md)**.
- Present data in one direction only with a **[Gallery](controls/control-gallery.md)**.
- [Create a code component](../../developer/component-framework/overview.md) that implements an accessible table.

## Custom combo boxes

It is possible to emulate a combo box by combining a **[Text Input](controls/control-text-input.md)** and a **[Gallery](controls/control-gallery.md)**. However, combo boxes assembled from built-in controls are not accessible. Combo boxes must handle arrow keys and set appropriate roles and states on its components.

Consider the following:

- Use the built-in **[Combo box](controls/control-combo-box.md)** or **[Drop down](controls/control-drop-down.md)**.
- [Create a code component](../../developer/component-framework/overview.md) that implements an accessible combo box.

## Scrollable content 

Keyboard users can't scroll **[Forms](controls/control-form-detail.md)**, **[Scrollable screens](add-scrolling-screen.md)**, and **[Containers](controls/control-container.md)** if there are no interactive controls inside them.

For **[Galleries](controls/control-gallery.md)** with no interactive content, you can set **[TabIndex](controls/properties-accessibility.md)** on the **Gallery** itself so that keyboard users can focus on it and use arrow keys to scroll it.

For **[Labels](controls/control-text-box.md)**, setting **TabIndex** will make them focusable for keyboard scrolling. However, it will also [turn them into buttons](controls/control-text-box.md#accessibility-guidelines). Don't making labels scrollable if they're not meant to be buttons. Ensure the **Label** is large enough to fit text. The **AutoHeight** property can be used to automatically adjust the control's size when it is inside a **Form**, **Scrollable screen**, or **Gallery**.

## Expandable sections

Expandable sections, also known as disclosures, contain content that is hidden until the user presses a button. There is no built-in support for these elements but there is a workaround.

Mention the expanded state in the **[AccessibleLabel](controls/properties-accessibility.md)** of the button. For example, “Show more details. Collapsed.”.

Update the **AccessibleLabel** when the expanded state changes. Position the expanded content immediately after the button so that screen reader users can logically navigate to it. Push other content down when the section expands.

## Landmarks

You can create headings with **[Label](controls/control-text-box.md)** controls. Navigation, banner, and other landmarks are not supported. Power Apps automatically sets the main landmark to the app screen.

For other landmarks, use a heading as a workaround.

## Custom roles and states

There is no built-in support for custom roles and states. Hence, it's not recommended to create composite check boxes, sliders, and toggles from built-in controls.

Consider the following:

- Mention the control's role and state in its **[AccessibleLabel](controls/properties-accessibility.md)**. For example, if an **[Icon](controls/control-shapes-icons.md)** is used as a check box, its label could be “Enable notifications. Check box. Checked.”.
- [Create a code component](../../developer/component-framework/overview.md) that sets WAI-ARIA [roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) and [states](https://www.w3.org/TR/wai-aria-1.1/#introstates) as appropriate.

## Custom keyboard handling

It is not possible to react to specific key presses. For example, you can't have custom behavior for arrow keys or the Escape key. Hence, it is not possible to compose list-like controls like radio buttons from built-in controls. Nor can you create overlays that can be dismissed with the Escape key.

Enter or Space key handling is supported with **[OnSelect](controls/properties-core.md)**. However, this property is also triggered by other input methods like mouse clicks. There is no way to distinguish the source of the event.

## Focus management

**SetFocus** function can be used to change focus but it only works in [limited scenarios](functions/function-setfocus.md#limitations).

It is not possible to detect when controls receive or lose focus.

## Hide content from screen reader users only

There is no [aria-hidden](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) equivalent to show content to sighted users but hide it for screen reader users. Only [a few scenarios](accessible-apps-content-visibility.md) are supported.

## Next steps

[Accessibility properties](controls/properties-accessibility.md)

### See also

- [Create accessible apps](accessible-apps.md)
- [Accessible app structure](accessible-apps-structure.md)
- [Accessible colors in Power Apps](accessible-apps-color.md)
- [Show or hide content from assistive technologies for canvas apps](accessible-apps-content-visibility.md)
- [Announce dynamic changes with live regions for canvas apps](accessible-apps-live-regions.md)
- [Use the Accessibility checker](accessibility-checker.md)

---

## Send notification from an app

Source: [add-notifications.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-notifications)

*Learn how to send push notifications from a canvas app in Power Apps.*

# Send notification from an app

You can send a push notification from one app to another or to the same app. In canvas apps, you can send notifications by using the Power Apps Notification connector.

In this article, the sample app used for notifications is built from the default **Case Management** app template.

> [!NOTE]
> Before you begin, create push notifications for the Power Apps mobile app. More information: [Create push notifications for the Power Apps mobile app](../../mobile/power-apps-mobile-notification.md).

1. In [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), go to the app to which you want to send push notifications.

1. Copy the app ID. More information: [Get an app ID](get-sessionid.md#get-an-app-id)

1. In the left pane, select **Data** - **Connections**.

1. Edit the app. More information: [Edit an app](edit-app.md)

1. Select **View** - **Data sources**.

1. Select **Add data source**.

1. Select **New Connection**.

1. Select **Power Apps Notification**.

    ![Select Power Apps Notification.](./media/add-notifications/select-powerapps-notification.png "Select Power Apps Notification")

1. Paste the app ID copied from the previous step.

    ![Paste the app ID.](./media/add-notifications/paste-app-id.png "Paste the app ID")

1. Select **Connect**.

1. Add the push notification connection to the trigger app using the similar steps.

    In our example, we use the same app as the trigger app. The user who reassigns the case also triggers a push notification to the new case owner.

    ![Add connection.](./media/add-notifications/add-connection.png)

1. From the push notification connection, call the **SendPushNotification** method.

    In our example, we trigger this notification by using the **OnSuccess** property in a form.

    ![Power Apps formula.](./media/add-notifications/powerapps-function.png)


## Syntax

| Name | Description |
| --- | --- |
| SendPushNotification |Sends a push notification to the app that's specified in the connection settings for the notification. |

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| recipients |String array, required |A list of: <ul> <li>Email addresses for users or security groups</li> <li>Object IDs for users or security groups in Microsoft Entra ID</li></ul> |
| message |String, required |The message body of the push notification. |
| openApp |Boolean, optional |Whether to open the app when the user taps the push notification. |
| params |Parameters, optional |Key-value parameters to pass with the notification. These can be further processed in the app to open a specific page and load a specific state. |

### Sample formulas
Send a basic notification.

```power-fx
PowerAppsNotification.SendPushNotification(
	{
		recipients: ["f60ccf6f-7579-4f92-967c-2920473c966b", "72f988bf-86f1-41af-91ab-2d7cd011db47"],
		message: "A new case was assigned to you."
	}
)
```

Send a notification that opens an app and passes along specific parameters.

```power-fx
PowerAppsNotification.SendPushNotification(
	{
		recipients: ["email1@contoso.com", "email2@contoso.com"],
		message: "message in the notification toast",
		params: Table({key:"notificationKey", value:"The value for notificationKey"}),
		openApp: true
 	}
)
```

### See also

- [Create push notifications for the Power Apps mobile app](../../mobile/power-apps-mobile-notification.md)
- [Power Apps Notification reference](/connectors/powerappsnotification/)

---

## Disconnect Git version control to edit canvas apps

Source: [git-version-control.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/git-version-control)

*Learn how to disconnect Git version control to edit canvas app*

# Disconnect Git version control to edit canvas apps 

Git version control for editing apps has been removed and is no longer supported. 

If your app currently uses this feature, follow these steps to disconnect it:

1. Open your [canvas app for editing](edit-app.md) in Power Apps Studio. On the command bar, select **Settings**.
1. Select **Git version control** and then select **Disconnect**.

If you are using PASopa, download your app from your Git provider and [pack the .zip file to an .msapp file](https://github.com/microsoft/PowerApps-Tooling/tree/master/src/PASopa#power-platform-cli-usage). Once your .msapp file is uploaded to Power Apps, follow the steps above to disconnect.


 > [!NOTE]
 > Git version control is replaced with the source control integration feature. More information: [Source code integration](/power-platform/alm/git-integration/canvas-apps-git-integration)

---

## Understand New, Preview, Experimental, and Retired features in canvas apps

Source: [working-with-experimental-preview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-experimental-preview)

*Learn about New, Preview, Experimental, and Retired features.*

# Understand new, preview, experimental, and retired features in canvas apps

With every release, we make changes and add features to make Power Apps the best tool to fit your needs. We move the product forward. 

At the same time, keeping your apps running smoothly is our top priority. Despite our best efforts, any change or improvement might unintentionally introduce a side effect, and your app might not work exactly the way it did before.

To ensure enhancements don't adversely affect current apps, we take features through a progression of stages. These stages give you a chance to try out the feature and provide us with feedback, and for us to gradually roll out the feature while watching for any problems. This article describes this process and how you can control your exposure to features that are under development.

At each stage, the number of people who use the feature increases, helping us to validate that the feature is what you need and that we're not introducing an unintended side effect.

**Your feedback is critical throughout this process.** Post your feedback in the [Power Apps Community Forum](https://powerusers.microsoft.com/t5/PowerApps-Community/ct-p/PowerApps1).

## Feature roll out stages

In short, the stages are:
- **New:** These features are new and generally available (GA), fully supported, and documented. Generally these features are on by default for new apps, but might take time to deploy everywhere. Enable for existing apps on your own schedule.
- **Preview:** These features are almost done and will be **New** soon. But at this stage there still might be some changes made. This stage is the last opportunity for feedback. These features are generally turned off by default and are documented. These features aren't GA, shouldn't be used in production, and are covered by the [Preview terms of service](https://go.microsoft.com/fwlink/?linkid=2189520).
- **Experimental:** An early stage "Preview," these features truly are experiments and might never reach GA. We're assessing the value proposition and design of the feature, and the feature might radically change or be removed completely at any time. These features are off by default and aren't generally documented. These features aren't GA, shouldn't be used in production, and are covered by the [Preview terms of service](https://go.microsoft.com/fwlink/?linkid=2189520).
- **Retired:** These features are GA features but are on their way to being removed from the product. They're still fully supported and document, but we either have a new, better way to do the same thing or usage is low. Disable for existing apps on your own schedule. Generally, these features are off by default.

How long does a feature remain in each stage? It varies from feature to feature. We look at many factors, including the number of apps that use the feature, the number of issues reported, and how urgently the feature is needed. Features can remain in a stage for weeks to many months. We might also skip some stages if we don't believe it would be helpful.

## New

Enable **New** features for all your new apps, and enable for existing apps when you're ready.

**New** features are recently added to the product. They're generally available and fully supported. You can use **New** features with confidence.

In general, **New** features are enabled by default when you create a new app. When a **New** feature is first introduced, it might not be enabled in all regions initially, allowing us time to deploy and gather information on usage and any problems. If you run into a problem with a feature, the switch can be used as a workaround to disable it until we can correct the problem.

Eventually, **New** features are no longer "new". If there's no breaking change, the switch is removed and the feature is enabled for all apps. If there's a breaking change, the old behavior is available in the app settings under **Retired** as a disable switch.

**New** features are fully documented in the [Power Apps documentation](./getting-started.md).

## Preview

Enable **Preview** features if you want to test upcoming functionalities before the feature is enabled for everyone.

**Preview** features are well on their way to being a valued part of the product. But, they aren't generally available yet and aren't fully supported, instead offered under the [preview terms of service](https://aka.ms/pa-preview-terms). **Preview** features shouldn't be used in production. 

In general, **Preview** features aren't enabled by default when creating a new app. You should only enable a **Preview** feature for testing purposes and to provide feedback before the feature becomes generally available. This stage is the last stop for feedback before the feature is finalized. 

Generally, **Preview** features graduate to **New**.

**Preview** features are documented in the [Power Apps documentation](./getting-started.md). Use the [Power Apps Experimental Features forum](https://aka.ms/pa-early-feedback) or [Power Apps blog](https://powerapps.microsoft.com/blog/) for more information. Use the "Experimental" forum as many **Preview** features start out as **Experimental** features and there may already be information or comments there that can be helpful to you.

Provide feedback on **Preview** features in the [Power Apps Experimental Features forum](https://aka.ms/pa-early-feedback). Again, "Experimental" also covers **Preview** features in the forum.

## Experimental

Enable **Experimental** features if you're an early adopter, see something useful to you, and would like to help test the feature. 

**Experimental** features are in an early-stage preview that is true to the name "experiment". This feature might significantly change or be removed at any time. These features are far from being generally available, aren't fully supported, and are offered under the [preview terms of service](https://aka.ms/pa-preview-terms). **Experimental** features shouldn't be used in production. 

**Experimental** features are never enabled by default when creating a new app. You should only enable an **Experimental** feature for testing purposes and to provide feedback. If you don't know what the feature is referring to or its possible impact, you likely shouldn't turn it on. 

Eventually **Experimental** features either graduate to **Preview** or are removed from the product.

**Experimental** features typically aren't documented. The short description in the **App settings** pane might be the only information about them. Use the [Power Apps Experimental Features forum](https://aka.ms/pa-early-feedback) or [Power Apps blog](https://powerapps.microsoft.com/blog/) for more information.

Provide feedback on **Experimental** features in the [Power Apps Experimental Features forum](https://aka.ms/pa-early-feedback). 

## Retired

Enable **Retired** features only if you need an old behavior. When appropriate, disable these features in your existing apps.


**Retired** features, while fully supported and widely available, might be phased out in favor of newer, improved methods or due to low usage. Maintaining every feature alongside ongoing product updates incurs overhead.

When a feature moves from **New** to **Retired**, the meaning of its switch is often inverted. For example, where "Delayed load" was on by default as a **New** feature, the **Retired** version becomes "Disable delayed load" and is off by default.

**Retired** features are generally not enabled when creating a new app. They're provided for existing apps that still depend on the old behavior.

**Retired** features will eventually be removed from the product after enough time has passed and usage is low. Removals are well communicated ahead of time for breaking changes.

**Retired** features are fully documented in the [Important changes (deprecations) coming in Power Platform](/power-platform/important-changes-coming).

## Defaults

In general, when creating a _new_ app:

- **New switches are On.** These features are generally available and fully supported. There might be a small delay for the switch to be turned on by default as we continue rolling out. 
- **Preview switches are Off, but can be enabled for testing and feedback.** Enable the features that are interesting to you before they're enabled for all apps, for testing and feedback. Preview features aren't ready for production.
- **Experimental switches are Off.** These features are for early adopters and should only be used with caution; they can be changed or removed at any time. Experimental features aren't ready for production.
- **Retired switches are Off.** These features are generally available and fully supported, but will eventually be removed from the product. Avoid using these features.

As _existing_ apps go through their lifecycle, you might want to take advantage of new features or to remove dependencies on retired features by adjusting these switches in your app. Turning **New** switches On and **Retired** switches Off brings existing apps into alignment with new apps and the future of the product.

## Controlling which features are enabled

Experimental and preview features are listed in the app's **Settings** > **Updates**. From within the app, select **Settings**, and then select **Updates**. Select **New**, **Preview**, **Experimental**, or **Retired** features using the available tabs.

![Settings for canvas apps.](media/working-with-experimental/advanced-settings.png "Settings for canvas app")

Each feature has a toggle switch. **Off** generally means that the feature is disabled, except in the **Retired** section where the title of the feature indicates if the switch disables the feature.

In some cases, you might need to close and reopen the app after you change a setting. The feature description should indicate when you must perform this step.

At the top of the **Settings** panel, **General** settings provide control over fully shipped, generally available features that don't belong in any of these feature categories and are a stable part of the product. We limit the number of these settings as much as possible to keep things simple and to reduce the size of our testing matrix.

These settings are specific to each app, so changing a toggle switch affects only the app that's currently open. If you create an app, these switches revert to their default settings for that app.

## Preview and Experimental features without a switch

Sometimes a tag is added in the product to indicate that a particular feature is Preview or Experimental without having a switch in **Updates**. For example, a control in an **Insert** menu might have the name **Grid (Preview)** or the entry point for the [Monitor](../monitor-overview.md) was once **Monitor (Preview)**. In these cases, the feature can't be used without first seeing this tag.

Like the **Preview** and **Experimental** feature categories previously described, these features shouldn't be used in production and are offered under the [preview terms of service](https://aka.ms/pa-preview-terms).

---

