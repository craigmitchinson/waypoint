# Power Apps Canvas Apps — How-To Guides

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 11

## Contents

1. [How to create a canvas app connected to Microsoft Dataverse from scratch](#how-to-create-a-canvas-app-connected-to-microsoft-dataverse-from-scratch)
2. [How to create a canvas app with Power BI visual](#how-to-create-a-canvas-app-with-power-bi-visual)
3. [Create a canvas app that can trigger a Power Automate flow](#create-a-canvas-app-that-can-trigger-a-power-automate-flow)
4. [Create a canvas app with the barcode reader control](#create-a-canvas-app-with-the-barcode-reader-control)
5. [Create an app that uses mobile sensors](#create-an-app-that-uses-mobile-sensors)
6. [Create an app with 3D and mixed reality controls](#create-an-app-with-3d-and-mixed-reality-controls)
7. [Create an app to view a shape in mixed reality](#create-an-app-to-view-a-shape-in-mixed-reality)
8. [Create an app with address input and map controls](#create-an-app-with-address-input-and-map-controls)
9. [Create an app using the Measuring Camera control](#create-an-app-using-the-measuring-camera-control)
10. [Create a canvas app with deep link to a specific screen](#create-a-canvas-app-with-deep-link-to-a-specific-screen)
11. [Work with the PDF function (experimental)](#work-with-the-pdf-function-experimental)

---

## How to create a canvas app connected to Microsoft Dataverse from scratch

Source: [build-connected-dataverse.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/build-connected-dataverse)

*Learn about how to create a canvas app from scratch.*

# How to create a canvas app connected to Microsoft Dataverse from scratch

Microsoft Dataverse is a premier data platform for Power Platform. Dataverse lets you securely store and manage data used by your apps within a set of tables.

In this article, we'll create an app connected to existing data in a Power Platform environment.

## Prerequisites

To complete this lesson, you'll need a Power Apps environment with a Dataverse database with at least one table containing data. If you don’t have a license, you can sign up for the [Power Apps Developer Plan](../../developer-plan.md), or use a [Power Apps trial](../../signup-for-powerapps.md).

## Create a trial environment

An environment in Power Apps is a space to store, manage, and share your organization’s business data, apps, chatbots, and flows. It also serves as a container to separate apps that might have different roles, security requirements, or target audiences. Each environment can have one Dataverse database.

To make sure that you have what you need to complete this lesson, we're going to create a new environment that includes a Dataverse database. This environment is a 30-day trial that will go away at the end of the 30 days, but you can upgrade it to a sandbox or production environment if you want to keep it.

We're going to create a trial environment that will include a Dataverse database, and the sample data used in this article.

1. Go to [Power Platform admin center](https://admin.powerplatform.microsoft.com/).

1. Select **Environments**.

1. Select **New**.

1. Name the environment **Dataverse Trial**.

1. Select **Trial** for environment type.

1. Toggle **Create Database** to **Yes**.

1. Select **Next**.

    ![Create new environment](media/build-connected-dataverse/create-new-environment.png "Create new environment")

1. Toggle **Deploy Sample Apps and Data** to **Yes**.

1. Select **Save**.

Your trial environment will now be created, including a Dataverse database and sample data.

## Create a canvas app

Create a [canvas app](../data-platform-create-app.md) with **Accounts** table in Dataverse. When done, Power Apps will generate an app for you. This app includes the following screens:

- **Browse Screen** - a screen to search, sort, and select an account record, and launch the edit screen to create a new record.
- **Detail Screen** - a read-only screen that displays the details of the record selected on the browse screen.
- **Edit Screen** - an edit form that is used to edit the details of a selected record or create new records.

## Try the app

From Power Apps Studio, you can preview your app to try it out.

1. Select **Play** from the top-right corner of the screen.

1. From the **Account** list, select **Alpine Ski House**.

1. View the details of Alpine Ski House.

1. Select ![Select edit](media/build-connected-dataverse/pencil.png "Select edit") to edit the record.

1. On edit form, remove **(sample)** from the account name field.

1. Select ![Select save](media/build-connected-dataverse/save.png "Select save") to save the record changes.

1. Back on the account list screen, select **+** to launch a new record form.

1. Enter the desired fields, such as **Account name**.

1. Save the record.

1. Verify that the newly created record appears in the account list gallery.

1. To exit preview mode, select ![Select close](media/build-connected-dataverse/close.png "Select close") in the upper-right corner of the screen.

## Using the Tree view

The **Tree View** is on the left-side of the screen (if you don’t see it, select ![Tree view button](media/build-connected-dataverse/tree-view-icon.png "Tree view button")). The tree view gives you easy access to the components in your canvas app, such as screens, galleries, text input controls, and text labels.

The tree view can be collapsed or expanded by screen to make it easy to focus on the part of the app on which you're working.

Currently, the **BrowseScreen1** is expanded. To see the components for other screens, select **>** next to the name of the screen.

![Select expand](media/build-connected-dataverse/expand.png "Select expand")

## Modify the gallery of accounts

A gallery in Power Apps is used to show several related items. For example, in our app, **BrowseGallery1** displays all of our account records. When one of the items is selected, a border is placed around the item to indicate that it has been selected.

By default, this gallery includes the following three fields: Account name, phone number, and city.

However, we can change the fields included in the gallery.

1. From the tree view, select **BrowseGallery1**.

1. In the property pane on the right-side of the screen, select **Edit**.

    ![Edit fields included in the gallery](media/build-connected-dataverse/edit-fields-in-the-gallery.png "Edit fields included in the gallery")

1. The field data panel will appear. Change Subtitle to Website.

1. Select outside of the field data panel.

1. App will now display the website fields value instead of the phone number.

    ![Accounts gallery showing website](media/build-connected-dataverse/accounts-gallery-showing-website.png "Accounts gallery showing website")

### Update search to include the account name

When you previewed the app, you may have noticed that searching by account name didn’t work. That is because the autogenerated app search formula doesn't include the **Account name** field. In this lesson, we'll update to search formula to include the Account name field.

> [!TIP]
> The account name is stored in a column called **Name**.

1. In the tree view, select **BrowseGallery1**.

1. Verify the **Items** property is selected in the property selector.

1. In the formula bar, update the formula as follows:

   ```power-fx
   SortByColumns(Search([@Accounts], TextSearchBox1.Text, "name","address1_city","address1_composite"), "name", If(SortDescending1, Descending, Ascending))
   ```

    The formula consists of [SortByColumns](../functions/function-sort.md), [Search](../functions/function-filter-lookup.md), and [If](../functions/function-if.md) functions to search the **Accounts** table with the text entered in the search box that has the matching data in the name, address1_city, and address1_composite fields, and allow sorting.

The account list can now be searched and sorted by the Account name field.

## Add fields to the account detail screen

**Datascreen1** includes a display form that displays the data of the record selected on the browse screen. Display form controls are read-only, intended to allow users to read data but not create or edit data.

1. In the tree view, expand **DetailScreen1**.

1. Select **DetailForm1**.

1. In the right-side properties pane, select **Edit Fields**.

1. Select **Add field**.

1. Select the following fields:

    - Address 1: Country
    - Address 1: State/Province
    - Address 1: Street 1
    - Address 1: ZIP/Postal Code

1. Select **Add**.

    ![Gallery fields panel](media/build-connected-dataverse/gallery-fields-panel.png "Gallery fields panel")

1. You'll now see the selected fields in the Field panel. Rearrange the fields by dragging and dropping them or by selecting **...** (ellipsis) to the right of the field name, and selecting **Move up** or **Move down.**

1. Arrange the field in the following order:

    - Account Name
    - Main Phone
    - Address 1: Street 1
    - Address 1: City
    - Address 1: State/Province
    - Address 1: Zip/Postal Code
    - Address 1: Country/Region

    ![Address fields](media/build-connected-dataverse/address-fields.png "Address fields")

1. Select anywhere outside of the field pane to close the pane, and return to **DetailScreen1**.

You'll now see the selected fields displayed in the correct order.

## Modify account edit screen

**EditScreen1** allows users to edit or create account records. This screen includes an Edit Form control called **EditForm1**.

> [!NOTE]
> Since the edit form is one of the primary methods for creating or updating records, it should include every field that you want your users to be able to submit, and shouldn't include any fields that are read-only or the ones you don't want your users to modify.

In this lesson, we'll add the same fields that we added earlier to the display form, plus the ability to attach files.

1. In the tree view, expand **EditScreen1**.

1. Select **EditForm1**.

1. In the right-side properties panel, select **Edit Fields**.

1. Select **Add field**.

1. Select the following fields:

    - Address 1: Country
    - Address 1: State/Province
    - Address 1: Street 1
    - Address 1: ZIP/Postal Code

1. You'll now see the selected fields in the field pane. Rearrange the fields by dragging and dropping them or by selecting **...** (ellipsis) to the right of the field name, and selecting **Move up** or **Move down.**

1. Arrange the field in the following order:

    - Account Name
    - Main Phone
    - Address 1: Street 1
    - Address 1: City
    - Address 1: State/Province
    - Address 1: Zip/Postal Code
    - Address 1: Country/Region

1. Select anywhere outside of the field pane to close the field pane.

1. To minimize unnecessary scrolling in the app, we want the **Edit Form** to arrange the fields into two columns. In the properties pane on the right, select 2 in the **Columns** drop down.

1. To make the form easier to read, we want to remove **Address 1:** part of the address field labels.

    - In tree view, expand **EditForm1**.
    - Select **Address 1: City_DataCard2** control.
    - In the properties pane on right, select **Advanced**.
    - Select **Unlock to change properties**.
    - Change **DisplayName** property to **City**.
    - Follow the above steps to remove **Address 1:** from the Street 1, Country/Region, State/Province, and Zip/Postal Code fields.

**EditScreen1** should now look like the following:

![Accounts Edit screen](media/build-connected-dataverse/accounts-edit-screen.png "Accounts Edit screen")

## Save the app

By saving the app, your app will become available to use and share with others.

1. In Power Apps Studio, select **File**.
1. In the **Name** field, enter **Account Manager**.
1. Select an icon and background color from the **Icon** area. This will be used to identify your app in the app list.
1. Select **Save**.
1. Select **Save** in the lower right corner.
1. Once app is saved, select the back arrow to return to the Power Apps Studio.

    ![Save the app and go back](media/build-connected-dataverse/save-the-app-and-go-back.png "Save the app and go back")

## Run the app

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Verify that you're in the environment you used to create the app by looking in the upper-right corner of the screen. If different, select **Environment** and select the appropriate environment.

1. Select **Apps**.

1. From the app list, select **Account Manager**.

1. When the app loads, verify the changes made.

   - Search app list for **Blue Yonder Airlines**.
   - Select the **Blue Yonder** record and verify you see the fields added to the **Display form**.
   - Select ![Select edit](media/build-connected-dataverse/pencil.png "Select edit") to edit the record.
   - Verify form displays two columns of fields.
   - Verify that the field names don't display **Address 1:** in the labels.
   - Select **Attach file** in the Attachment area, select a file, and select **Open**.
   - Verify uploaded file appears in the attachment list.
   - Select ![Select save](media/build-connected-dataverse/save.png "Select save") to save the record.

## Run your app on mobile

To test your Power Apps on your mobile device:

1. [Download](https://powerapps.microsoft.com/downloads) the app from your mobile app store.
1. Sign in using your work or school account.
1. Select your app from the list.

### See also

- [Create a canvas app from a template](../get-started-test-drive.md)
- [Add and configure controls in canvas apps](../add-configure-controls.md)
- [Get started with formulas in canvas apps](../working-with-formulas.md)

---

## How to create a canvas app with Power BI visual

Source: [build-powerbi-visual.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/build-powerbi-visual)

*Learn about how to create a canvas app with Power BI visual.*

# How to create a canvas app with Power BI visual

Microsoft Power BI is a powerful analysis and visualization tool. Power Apps is great at enabling people to take action on the web and mobile. Canvas apps created using Power Apps can be embedded in a Power BI report. Similarly, a Power BI report tile can be added to a canvas app. The best of both worlds can be achieved at the same place and same time.

In this example, we'll create a quick Power BI report and a canvas app, and then see how we can add the report as a tile in the app.

Watch this video to learn how to create a canvas app with Power BI visual:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=1624717a-18d6-4aba-ae5f-0d0503b2cccb]

## Prerequisites

To complete this lesson, we'd need the ability to create Power BI dashboards and reports.

## Sign in to Power BI

Sign in to Power BI with the same Office license as the one used for creating the Power Apps.

## Create a new workspace

1. Select **Workspaces** from the left-pane.

    ![Select the Workspaces link](media/build-powerbi-visual/create-a-new-workspace-1.png "Select the Workspaces link")

1. Select **Create a workspace**.

    ![Select the Create a workspace button](media/build-powerbi-visual/create-a-new-workspace-2.png "Select the Create a workspace button")

1. Enter a name for the workspace, and then select **Save**.

    ![Enter a name for the workspace](media/build-powerbi-visual/create-a-new-workspace-3.png "Enter a name for the workspace")

    The workspace gets created

    ![The workspace gets created](media/build-powerbi-visual/create-a-new-workspace-4.png "The workspace gets created")

1. Select **+ New**, and add a dashboard.

    ![Select the New button and add a Dashboard](media/build-powerbi-visual/create-a-new-workspace-5.png "Select the New button and add a Dashboard")

1. Add a name for the dashboard, then select **Create**.

    ![Add a name for the dashboard](media/build-powerbi-visual/create-a-new-workspace-6.png "Add a name for the dashboard")

    The Power BI dashboard gets created within the workspace we created

    ![The Power BI Dashboard gets created](media/build-powerbi-visual/create-a-new-workspace-7.png "The Power BI Dashboard gets created")

1. Open the workspace, select **+ New**, and then select **Dataset** to create a new dataset.

    ![Open the workspace and select the New button](media/build-powerbi-visual/create-a-new-workspace-8.png "Open the workspace and select the New button")

1. Select **Samples** under "More ways to create your own content" to use sample data.

    ![Select the Samples hyperlink](media/build-powerbi-visual/create-a-new-workspace-9.png "Select the Samples hyperlink")

1. Select **Sales and Marketing sample**. You can also select another sample of your choice.

    ![Select the Sales and Marketing sample](media/build-powerbi-visual/create-a-new-workspace-10.png "Select the Sales and Marketing sample")

1. Select **Connect** to connect to the sample data.

    ![Select the Connect button to connect to the data sample](media/build-powerbi-visual/create-a-new-workspace-11.png "Select the Connect button to connect to the data sample")

    A dataset with the Sales and Marketing sample and a report gets added to the Workspace.

    ![Sample and a report gets added to the workspace](media/build-powerbi-visual/create-a-new-workspace-12.png "Sample and a report gets added to the workspace")

1. From the left-pane, select the report that was created from the dataset, select **...** (ellipsis), and select then select **Pin to a dashboard**.

    ![Select the Pin to dashboard option](media/build-powerbi-visual/create-a-new-workspace-13.png "Select the Pin to dashboard option")

1. Select **Existing dashboard**, select the dashboard, and then select **Pin live**.

    ![Select the dashboard and select Pin live](media/build-powerbi-visual/create-a-new-workspace-14.png "Select the dashboard and select Pin live")

The report gets added to the dashboard, and is ready for use in Power Apps.

## Create a new canvas app

1. Start by creating a [blank canvas app](../create-blank-app.md).

1. Select **Insert** > **Charts** > **Power BI tile**.

    ![Select Inser Charts and select Power BI Tile](media/build-powerbi-visual/create-a-new-canvas-app-4.png "Select Inser Charts and select Power BI Tile")

    The Power BI Tile gets added to the screen.

    ![The Power BI Tile gets added to the screen](media/build-powerbi-visual/create-a-new-canvas-app-5.png "The Power BI Tile gets added to the screen")

1. Select the Workspace, dashboard and tile created earlier to add the Power BI tile to the canvas app.

    ![Power BI Tile is added to the canvas app](media/build-powerbi-visual/create-a-new-canvas-app-6.png "Power BI Tile is added to the canvas app")

1. [Save and publish](../save-publish-app.md) the app.

You've created a canvas app with Power BI tile.

### See also

- [Connect to Power BI from Power Apps](../connections/connection-powerbi.md)
- [Power Apps visual for Power BI](../powerapps-custom-visual.md)
- [Power BI tile control in Power Apps](../controls/control-power-bi-tile.md)
- [Tutorial: Embed a Power Apps visual in a Power BI report](/power-bi/visuals/power-bi-visualization-powerapp)

---

## Create a canvas app that can trigger a Power Automate flow

Source: [trigger-flow.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/trigger-flow)

*Learn about how to create a canvas app that can trigger a Power Automate flow.*

# Create a canvas app that can trigger a Power Automate flow

Power Automate can be used to create logic that performs one or more tasks when an event occurs in a canvas app. For example, a button can be configured so that, when a user selects it, an item is created in a list, an email, or meeting request is sent, a file is added to the cloud, or all of these. Any control in the app can be configured to start the flow, that continues to run even if you close the app.

In this article, we'll learn how create and trigger a flow using canvas apps.

Watch this video to learn how to create a canvas app that can trigger a flow:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=97f1d303-9f0d-4817-9f9d-c899d023d9b1]

## Prerequisites

To complete this lesson, you'll need Power Automate and Power Apps environment with a Dataverse database. If you don't have a license, you can sign up for the [Power Apps Developer Plan](../../developer-plan.md) or use [Power Apps trial](../../signup-for-powerapps.md).

## Create a trial environment

An environment in Power Apps is a space to store, manage, and share your organization’s business data, apps, chatbots, and flows. It also serves as a container to separate apps that might have different roles, security requirements, or target audiences. Each environment can have one Dataverse database.

To make sure that you have what you need to complete this lesson, we're going to create a new environment that includes a Dataverse database. This is a 30-day trial that will go away at the end of the 30 days, but you can upgrade it to a sandbox or production environment if you want to keep it.

We're going to create a trial environment that will include a Dataverse database, and the sample data used in this article.

1. Go to [Power Platform admin center](https://admin.powerplatform.microsoft.com/).

1. Select **Environments**.

1. Select **New**.

1. Name the environment **Dataverse Trial**.

1. Select **Trial** for environment type.

1. Toggle **Create Database** to **Yes**.

1. Select **Next**.

1. Toggle **Deploy Sample Apps and Data** to **Yes**.

1. Select **Save**.

Your trial environment will now be created, including a Dataverse database and sample data.

## Create a canvas app

In this lesson, we'll create an app to search, view, and create customer accounts using the **Accounts** table in Dataverse.

1. Start by creating a [blank canvas app](../create-blank-app.md).

1. Select **Create a gallery**.

    ![Create a gallery](media/trigger-flow/build-a-canvas-app-4.png "Create a gallery")

1. Select **Accounts** table.

1. Stretch the gallery to the bottom of the screen, and add a label to the top with the text **Accounts**. And then, update the other properties as listed below.

    | Property | Value |
    | - | - |
    | Font | Open Sans |
    | Font size | 21 |
    | Font weight | Bold |
    | Text alignment | Center |
    | Auto height | Off |
    | Line height | 1.2 |
    | Overflow | Hidden |
    | Display mode | Edit |
    | Visible | On |
    | Position (X, Y) | 0, 0 |
    | Size (Width, Height) | 640, 71 |
    | Padding | 5 Top, 5 Bottom, 5 Left, 5 Right |

    ![Update gallery properties](media/trigger-flow/build-a-canvas-app-6.png "Update gallery properties")

1. Add an **Add** icon to the top-right of the screen by selecting **Insert** > **Icon** > **Add**. And then, update the properties of the icon to color white and padding of 5 from all sides.

    ![Add an Add icon](media/trigger-flow/build-a-canvas-app-7.png "Add an Add icon")

1. From the top-left side of the screen, select **New screen** > **Form**.

    ![Add new form](media/trigger-flow/build-a-canvas-app-8.png "Add new form")

1. Update the title of the form to **New Account**, and select the data source as **Accounts** from the pane on the right-side of the screen.

    ![Update title and select data source](media/trigger-flow/build-a-canvas-app-9.png "Update title and select data source")

1. Select **Edit fields** on the right-pane.

    :::image type="content" source="media/trigger-flow/build-a-canvas-app-10.png" alt-text="Select edit fields.":::

1. Select **Add field** and add **Email** to the form.

    :::image type="content" source="media/trigger-flow/build-a-canvas-app-11.png" alt-text="Add email field.":::

    The email field gets added to the form.

    :::image type="content" source="media/trigger-flow/build-a-canvas-app-12.png" alt-text="The email field gets added.":::

1. Set the default mode of the form to **New**.

    ![Default form mode](media/trigger-flow/build-a-canvas-app-13.png "Default form mode")

1. Select Screen1 that has the accounts gallery, and set the **OnSelect** property of the **+** icon to `Navigate(Screen2)`.

    ![Configure navigation to screen 2](media/trigger-flow/build-a-canvas-app-14.png "Configure navigation to screen 2")

1. Select **Insert** > **New screen** > **Blank screen** to add a new screen to the app.

1. Select **Insert** > **Icon**, and then select the Check (badge) icon to add it to the screen.

    ![Insert badge icon](media/trigger-flow/build-a-canvas-app-16.png "Insert badge icon")

1. Move the icon to the top center of the canvas.

    ![Move icon to top-center](media/trigger-flow/build-a-canvas-app-17.png "Move icon to top-center")

1. Add a label with text **Account was created successfully!**, and move it under the icon added in the earlier step.

    ![Add Account was created successfully label](media/trigger-flow/build-a-canvas-app-18.png "Add Account was created successfully label")

1. Add an additional label below the label added in the previous step with text **Send a welcome note to the Customer?**.

    ![Send a welcome note to the Customer](media/trigger-flow/build-a-canvas-app-19.png "Send a welcome note to the Customer")

1. Add a **Text Input** box by selecting **Insert** > **Input** > **Text Input**. Set the **Mode** of the control to **Multiline**, and default text to **Thank you for creating an account with us. We look forward to serving you!**. And move the control below the label added in the previous step.

    ![Add multiline text input control](media/trigger-flow/build-a-canvas-app-20.png "Add multiline text input control")

1. Set the **OnVisible** property of **Screen3** to `Reset(TextInput1)`.

    ![OnVisible property of screen 3](media/trigger-flow/build-a-canvas-app-21.png "OnVisible property of screen 3")

1. Add two buttons to the screen with text **Yes** and **No**, and place them below the input text box added in the previous step.

    ![Yes No buttons](media/trigger-flow/build-a-canvas-app-22.png "Yes No buttons")

1. Go to the **New Account** form screen, and set the **OnVisible** property of the screen to `ResetForm(EditForm3)`.

    ![OnVisible property of New Account form](media/trigger-flow/build-a-canvas-app-23.png "OnVisible property of New Account form")

1. Select the check icon on the top-right, and set the **OnSelect** property to `SubmitForm(EditForm3);Navigate(Screen3)`.

    ![Navigate to screen 3](media/trigger-flow/build-a-canvas-app-24.png "Navigate to screen 3")

1. Select the X button on the top-right, and set the **OnSelect** property to `Back()`.

    ![Back function for close](media/trigger-flow/build-a-canvas-app-25.png "Back function for close")

1. Go back to **Screen3** by selecting **Screen3** in the tree view.

    ![Go to screen 3](media/trigger-flow/build-a-canvas-app-26.png "Go to screen 3")

1. Select the **No** button, and set the button's **OnSelect** property to `Navigate(Screen1)`.

    ![Navigate to screen 1](media/trigger-flow/build-a-canvas-app-27.png "Navigate to screen 1")

1. Select the **Yes** button, on the app authoring menu select **Power Automate**.

    ![Select Power Automate fromt he app authoring menu.](media/trigger-flow/build-a-canvas-app-28-1.png "Select the Yes button and select Action on the top")

1. Select **Create a new flow** to create a new Power Automate flow.

    ![Select Create a new flow.](media/trigger-flow/build-a-canvas-app-29-1.png "Select Create a new flow to create")

## Create the Power Automate Flow

1. On the **Create your flow** screen, from the list of instant templates, select **Click a button in Power Apps to send an email**.

   > [!div class="mx-imgBorder"]
   > ![Select the Click a button in Power Apps to send an email template.](media/trigger-flow/create-the-power-automate-flow-1-1.png "select the Click a button in Power Apps to send an email.")

1. Enter a name for the flow as "Flow triggered by Power Apps", and select **Power Apps** as the trigger.
    
   > [!div class="mx-imgBorder"]
   > ![Enter a name for the flow](media/trigger-flow/create-the-power-automate-flow-2-1.png "Enter a name for the flow")

1. Select **Edit in advanced mode** and then select, **Continue**.
     
   > [!div class="mx-imgBorder"]
   > ![Edit the flow in advacned mode](media/trigger-flow/edit-advacned-mode.png "Edit in advacned mode")

1. The **To** field and the **Body** field are automatically auto-populated with the following:
  
   - To: **Sendanemail(V2)_To**.
   - Body: **Sendanemail(V2)_Body**


1. In **Subject** field, delete **Sendanemail(V2)_To** and enten **Thank you for your business!** in the **Subject** field.

    ![Enter Thank you for your business](media/trigger-flow/add-subject.png "Enter Thank you for your business")

1. Select **Save** to save the flow.

## Trigger the flow from within the canvas app

1. Select the **Yes** button > in the **OnSelect** property enter the two parameters for the To email address and the Body of the email as follows:

    ```power-fx
    FlowtriggeredbyaPowerapp.Run(
       EditForm3.LastSubmit.Email,
       TextInput1.Text
    );
    Navigate(Screen1);
    ```

    > [!NOTE]
    > The email address is picked up from the new account record created on the previous screen. and the body for the email is picked from the text box text captured on this screen.

    
   > [!div class="mx-imgBorder"]
   > ![Fill in the two parameters for the To email address](media/trigger-flow/onselect-flow.png "Fill in the two parameters for the To email address")

## Test the app

Run the app in preview mode. In this test, we'll create a new account by entering details like account name, phone number, city, and email address on the **New Account** screen. On saving the new account details, we'll be prompted to send an email to the customer where we can update the verbiage of the email, and then select **Yes** to send the email. This will trigger the flow, and email will be sent to the email address on the account.

![Run the app in Preview mode](media/trigger-flow/test-the-app-1-1.png "Run the app in Preview mode")

![Create a new account by entering details like account name](media/trigger-flow/test-the-app-2.gif "Create a new account by entering details like account name")

An email like this should appear in your inbox

![Email like this should appear in your inbox](media/trigger-flow/test-the-app-3.png "mail like this should appear in your inbox")

### See also

[Use Power Automate pane](../working-with-flows.md)

---

## Create a canvas app with the barcode reader control

Source: [create-app-barcode-scanner.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/create-app-barcode-scanner)

*Learn how to make a canvas app that uses the barcode reader control.*

# Create a canvas app with the barcode reader control

The barcode reader control in Power Apps lets you use your phone or mobile device to scan barcodes from [various formats](../controls/control-barcodereader.md#barcode-availability-by-device).

Some of the common uses of barcode reader control in a canvas app are:

- An app to check in items like books into a collection
- An inventory management app that uses barcode to identify items
- An employee app to check in and badge scanning for security

In this article, we'll create a canvas app with barcode reader and display scanned items in a gallery.

Watch this video to learn how to create an app with barcode reader:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=8714cb52-ce37-452c-bc47-1af24b1f6b93]

## Prerequisites

- [Power Apps license](/power-platform/admin/pricing-billing-skus)
- Before you create an app from scratch, familiarize yourself with Power Apps basics by [generating an app](../get-started-test-drive.md) and then customizing that app's [controls](../add-configure-controls.md), [gallery](../add-gallery.md), [forms](../working-with-forms.md), and [cards](../working-with-cards.md).
- To create an app, you must be assigned to the [Environment Maker](/power-platform/admin/database-security) security role.

## Open a blank app

Create a [blank canvas app](../create-blank-app.md).

## Add barcode scanner

1. From the left-pane, select **Screen1**.

1. From the left-pane, select **+ Insert** > expand **Media** > select **Barcode reader** control.

    ![ Select barcode reader](media/ceate-app-barcode-scanner/select-barcode-scanner.png "Select barcode reader")

1. From the properties list on the right-side of the screen, select **Advanced** tab, and then select the **OnScan** property.

    ![OnScan property](media/ceate-app-barcode-scanner/select-advanced-onscan.png "OnScan property")

1. Set the **OnScan** property of the Barcode scanner control to this expression by typing or pasting it in the formula bar.

    ```power-fx
    Collect(
        colScannedItems,
        {ScannedItem: First(BarcodeScanner1.Barcodes).Value, ScannedTime: Now()}
    )
    ```

1. From the **Properties** pane, set **X** property to "180" and the **Y** property to "1005".

    ![X and y properties](media/ceate-app-barcode-scanner/add-barcode-scanner-4.png "X and y properties")

## Add gallery

1. Select **+ Insert** > expand **Layout** > select **Vertical gallery** control.

    ![Gallery types select Vertical](media/ceate-app-barcode-scanner/insert-vertical-gallery.png "Gallery types select Vertical")

1. From the properties pane, select the layout for the gallery as **Title and subtitle**.

    ![Select Title and subtitle](media/ceate-app-barcode-scanner/gallery-title-subtitle.png "Select Title and subtitle")

1. Select the gallery control on canvas.

1. Set the **Items** property of the gallery control to this expression by typing or pasting it in the formula bar.

    ```power-fx
    colScannedItems
    ```

    ![Items property of the Gallery control](media/ceate-app-barcode-scanner/add-gallery-4.png "Items property of the Gallery control")

1. In the left-pane, expand the **Gallery1**, and select **Title2**.

    ![Left navigation bar select Title2](media/ceate-app-barcode-scanner/add-gallery-5.png "Left navigation bar select Title2")

1. Set the **Text** property of **Title2** to the following expression.

    ```power-fx
    ThisItem.ScannedItem
    ```

    ![Text property of the Label control](media/ceate-app-barcode-scanner/add-gallery-7.png "Text property of the Label control")

1. Select **Subtitle2** label, and set it's **Text** property to this expression.

    ```power-fx
    ThisItem.ScannedTime
    ```

    ![Set the Text property of the Label control](media/ceate-app-barcode-scanner/add-gallery-10.png "Set the Text property of the Label control")

## Try the app

1. To test the app, select **Screen1**, and then press **F5** on the keyboard.

1. After testing, [save and publish](../save-publish-app.md) the app.

1. Download [Power Apps Mobile](https://powerapps.microsoft.com/downloads/) on your phone.

1. Open the **Power Apps** app, and sign in.

1. Select and open the barcode reader app.

    ![Launch your Barcode Reader application](media/ceate-app-barcode-scanner/test-the-app-2.png "Launch your Barcode Scanner application")

1. Select **Scan**, and scan any barcode label (for example, barcode label on a book).

## Final Results

You'll see the scanned barcode information is saved inside the app.

![Final Results](media/ceate-app-barcode-scanner/final-results-1.png "Final Results")

### See also

[Barcode scanner control in Power Apps](../controls/control-new-barcode-scanner.md)

---

## Create an app that uses mobile sensors

Source: [mobile-sensors.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/mobile-sensors)

*Learn how to use mobile sensors in Power Apps - including NFC, accelerometer, and location.*

# Create an app that uses mobile sensors

Sensors enable you to add richer functionality into your apps by leveraging the capabilities of your phone. In this article, you'll learn about using sensors on your mobile device within Power Apps.

To do this, you'll be making a sample app with two screens. The first screen will display the current compass heading, latitude, longitude, altitude, and can scan NFC tags to obtain text information. The second screen will showcase how to display accelerometer data to produce the angle of the device along the X and Y axes.

To set up the scenario behind the first screen, imagine that you are building an app for an NFC-based scavenger hunt. Each participant will use the app to scan an NFC tag which will provide them with a compass heading, latitude, and longitude that will point them to their next destination. At that destination, the participant will then scan another tag and repeat the process until they reach the end of the hunt.

For the second screen, imagine needing a tool to roughly measure angles. When on the second screen, the participant will be able to place or hold their device on a surface, and get the angles on the X and Y axis of the device as well as view a visual representation of those angles.

Watch this video to learn how to build an app that uses mobile sensors:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=01899fa6-7a02-4ed6-9ab1-4bc8b5bf17b9]

## Prerequisites

- Any level of Power Apps license can be used for this app, as no data connections are being used.
- A mobile device such as a mobile phone or tablet with GPS and accelerometer capabilities will be needed as most PCs might not have the necessary sensors.
- An [NFC capable device](https://en.wikipedia.org/wiki/List_of_NFC-enabled_mobile_devices) is needed for the NFC scanning feature. It's also assumed that the NFC tags to be scanned have been pre-configured to produce text values in the following example format:

    ```
    "<b>Heading: </b> 80 degrees <br>
    <b>Latitude: </b> 44.4604788 <br>
    <b>Longitude: </b> -110.82813759"
    ```

    This will provide the text in an HTML-friendly format for the app. The setup of the NFC tags is beyond the scope of this article, and the NFC elements can be ignored if needed; the primary focus is using the mobile sensors in Power Apps.

## Add header and HTML text for the device sensor outputs

### Header label

With an app open for editing in [Power Apps](https://make.powerapps.com/), add a **Text label** to the screen by dragging and dropping it from the **Insert** pane. Position it at the top-left corner of the screen, and modify the following properties in the Properties pane:

| Property       | Value               |
|----------------|---------------------|
| Text           | "Scavenger Hunt"    |
| Font size      | 24                  |
| Font weight    | FontWeight.Semibold |
| Text alignment | Align.Center        |
| Width          | Parent.Width        |

Then in the **Advanced** pane, modify the following properties:

| Property       | Value                  |
|----------------|------------------------|
| Color          | RGBA(255, 255, 255, 1) |
| Fill           | RGBA(56, 96, 178, 1)   |

This will provide a header for the screen.

### HTML text for the device sensor outputs

Next, add an **HTML text** control. This will be used to display all the device sensor outputs in one place. Use this code in the **HtmlText** property:

```power-fx
"<b><u>Current Location</u></b><br>  
<br>
<b>Compass Heading: </b>" & Round(Compass.Heading, 2) & Char(0176) &
"<br>
<br>
<b>Lat: </b>" & Location.Latitude & "<br>
<b>Long: </b>" & Location.Longitude & "<br>
<b>Alt: </b>" & Round(Location.Altitude, 2) & " m"
```

Change the following properties in the Advanced pane:

| Property        | Value             |
|-----------------|-------------------|
| Size            | 21                |
| BorderStyle     | BorderStyle.Solid |
| BorderThickness | 2                 |
| Width           | 560               |
| Height          | 576               |
| PaddingTop      | 16                |
| PaddingRight    | 16                |
| PaddingBottom   | 16                |
| PaddingLeft     | 16                |

If you examine what was put in the HtmlText, you may notice that there are two sensor types that are being used.

First is the **Compass** sensor, which is using the **Heading** property to provide the compass heading from the device.

Second is the **Location** sensor, which provides the **Latitude**, **Longitude**, and **Altitude**. There are two considerations about Location. First, if you use just Location without the dot operator and property, you'll get a record that has fields for Latitude, Longitude, and Altitude. Second, the Altitude property is in meters by default. If you would like to convert it to feet, replace the following formula:

Use meters:

```power-fx
Round(Location.Altitude, 2) & " m"
```

Use feet:

```power-fx
Round(Location.Altitude \* 3.2808, 2) & " ft"
```

> [!NOTE]
> Many sensor properties might not work correctly if you preview the app inside Power Apps Studio. To work with sensor properties for testing, prefer to use a mobile phone instead.

Now position the **HTML text** control near the lower half of the screen.

## Add Button for the NFC scan and HTML text control

### NFC scan button

Add a button to the app, positioning in below the **HTML text** control that you added in the last step, and change the following properties in the Advanced pane:

| Property        | Value                               |
|-----------------|-------------------------------------|
| OnSelect        | ClearCollect(colNFCScan, ReadNFC()) |
| Text            | "Scan NFC Tag"                      |

The code in the **OnSelect** property is utilizing the [ReadNFC()](../functions/function-readnfc.md) function, which activates the NFC reader. It then stores what is read from the NFC tag in a collection called **colNFCScan**. This collection will have four fields: **RTD**, **Text**, **TNF**, and **URI**. While a full explanation of these fields is beyond the scope of this article, some explanation may be helpful. **TNF** stands for **Type Name Format** and is used to define the structure of the **Record Type Definition**, or **RTD**, which in turn defines the type of record contained in the **Text** and/or **URI** fields. **URI** stands for **Uniform Resource Identifier**, which is essentially the address of a resource. For the NFC tags being used in this example, in addition to the **Text** field containing the example text from the introduction of this topic, they would contain a **TNF** value of *1*, an **RTD** value of *T*, and a blank **URI** value.

### Add HTML text control to display the NFC scan information

Add a second **HTML text** control and use the following formula in the **HTMLText** property:

```power-fx
"<b><u>Next Destination</u></b><br>
<br>" &
First(colNFCScan).Text
```

Change the following properties in the Advanced pane:

| Property        | Value             |
|-----------------|-------------------|
| Size            | 21                |
| BorderStyle     | BorderStyle.Solid |
| BorderThickness | 2                 |
| Width           | 560               |
| Height          | 248               |
| PaddingTop      | 16                |
| PaddingRight    | 16                |
| PaddingBottom   | 16                |
| PaddingLeft     | 16                |

Without any NFC data present, the control will display **Next Destination**. When an NFC tag is scanned, it'll display **Next Destination**, and then the data from the **Text** field in the data collected from the scan.

Assuming the data for the NFC tags has been configured as described in the introduction, the user will see the next compass heading, latitude, and longitude values for the next scavenger hunt location after scanning one of those tags.

![Compass heading latitude and longitude values](media/mobile-sensors/html-text-control-to-display-the-nfc-scan-information-1.png "Compass heading latitude and longitude values")

## Test the app

Save and publish the app. On a mobile device with the necessary sensors, open the app and observe the compass heading, latitude, longitude, and altitude values. Try walking around while turning in various directions to see changes in the various sensor readings.

![Try walking around while turning in various directions](media/mobile-sensors/html-text-control-to-display-the-nfc-scan-information-2.png "Try walking around while turning in various directions")

Press the **Scan NFC Tag** button to observe the NFC reader control. If you have an NFC tag that can produce a **Text** value, scan the tag to observe the text in the app. If not, select **Cancel**.

![Scan NFC Tag](media/mobile-sensors/html-text-control-to-display-the-nfc-scan-information-3.png "Scan NFC Tag")

## Add and configure second screen

Add a new **Blank screen** for the angle measurement portion of the app.

After adding the screen, go back to the first screen and add a **Next Arrow** icon from **+ Insert** > **Icons** > choose the **Next Arrow** icon. Position it in the top-right corner of the screen, and change the following properties in the Advanced pane:

| Property        | Value                  |
|-----------------|------------------------|
| OnSelect        | Navigate(Screen2)      |
| Color           | RGBA(255, 255, 255, 1) |

If you have renamed the second screen that was just added, substitute that name for **Screen2** in the **Navigate** function.

Preview the app, selecting the icon that was just added to verify that it navigates you to the blank screen that was just added.

## Add configuration for X and Y angles

Add a **Text label** to the screen by dragging and dropping it from the **Insert** pane. Position it at the top-left corner of the screen and modify the following properties in the **Properties** pane:

| Property       | Value               |
|----------------|---------------------|
| Text           | "2 Axis Level"      |
| Font size      | 24                  |
| Font weight    | FontWeight.Semibold |
| Text alignment | Align.Center        |
| Width          | Parent.Width        |

Then in the Advanced pane, modify the following properties:

| Property       | Value                  |
|----------------|------------------------|
| Color          | RGBA(255, 255, 255, 1) |
| Fill           | RGBA(56, 96, 178, 1)   |

This will provide a header for the second screen.

Next, add a **Back Arrow** icon from **+ Insert** > **Icons** > choose the **Back Arrow** icon. Position it in the top-left corner of the screen and change the following properties in the **Advanced** pane:

| Property       | Value                  |
|----------------|------------------------|
| OnSelect       | Navigate(Screen1)      |
| Color          | RGBA(255, 255, 255, 1) |

If you've renamed the first screen that was just added, substitute that name for **Screen1** in the **Navigate** function.

Finally, add an **HTML text** control. This will be used to display all the device sensor outputs in one place. Use the following formula in the HTML Text property:

```power-fx
"<b><u>Angles:</u></b><br>
<br>
<table width='100%'>
<tr>
<td width='50%'><b>X: </b>" & Abs(Round(Acceleration.X * (90 / 9.81),
0)) & Char(0176) & "</td>
<td width='50%'><b>Y: </b>" & Abs(Round(Acceleration.Y * (90 / 9.81),
0)) & Char(0176) & "</td>
</tr>
</table>"
```

Change the following properties in the Advanced tab:

| Property        | Value             |
|-----------------|-------------------|
| Size            | 21                |
| BorderStyle     | BorderStyle.Solid |
| BorderThickness | 2                 |
| Width           | 560               |
| Height          | 168               |
| PaddingTop      | 16                |
| PaddingRight    | 16                |
| PaddingBottom   | 16                |
| PaddingLeft     | 16                |

Position this control near the top of the app screen.

If you examine what was put in the **HtmlText**, you may notice that it is using the **Acceleration** sensor, with **X** and **Y** properties. There is also a **Z** property that we are not using in this scenario.

This sensor detects gravitational forces on the device over three planes. Using a mobile phone as an example, imagine a line extending out of the sides of the phone. This would be the **X** plane. Lifting the right side of the phone will produce a positive value and lifting the left side will produce a negative value. A line extending out of the top and bottom of the phone would represent the **Y** plane. Lifting the top of the phone will produce a positive value and lifting the bottom will produce a negative value. Finally, a line coming out of the screen and back of the phone would represent the **Z** plane. Causing the screen to face upwards will produce a positive value and facing it downward will result in a negative value.

The accelerometer will measure forces acting on the device both in motion, such as if you dropped the device, and at rest, such as tilting the device on one or more of the axes described earlier. At rest, the theoretical values should be between 0 and +/- 9.81 m/s2, with 0 indicating that the relative axis is parallel to the Earth with no gravity acting on the sensor and a reading of 9.81 indicating that the relative axis is perpendicular to the Earth and the full force of gravity is acting on the sensor.

Looking at the code in the **HTML text** control you just added, notice the following section:

```power-fx
Abs(Round(Acceleration.X * (90 / 9.81), 0))
```

In this formula, from inside-out, first, the **Acceleration** on the **X** plane is being multiplied by **(90 / 9.81)**. This is using the theoretical maximum at-rest value to convert the sensor reading into degrees. The value of *90* is present because at the maximum theoretical value, the device would be perpendicular to the Earth on that plane, giving a measure of 90 degrees.

That value in degrees is then rounded to zero decimal places to provide a whole number degree value. Last, the absolute value of that rounded number is calculated to give a positive reading. This is so it will not matter if the angle is measured from one side or another.

> [!NOTE]
> The values shared above are approximates, and don't represent exact measurement.

## Add the level visuals

In this step, we're going to use some controls in unconventional ways to achieve a visual goal.

### Circular bubble level-like visual

To begin, add a **Button** control to the screen, renaming it to **btnCircleLevel** and change the following properties in the **Advanced** pane:

| Property               | Value                             |
|------------------------|-----------------------------------|
| Text                   | ""                                |
| BorderColor            | RGBA(56, 96, 178, 1)              |
| FocusedBorderThickness | 2                                 |
| Fill                   | Transparent                       |
| DisabledFill           | Self.Fill                         |
| X                      | (Parent.Width - Self.Width) / 2   |
| Y                      | (Parent.Height - Self.Height) / 2 |
| Width                  | 400                               |
| Height                 | Self.Width                        |

The result of these changes should produce a circular button in the center of the screen that cannot be pressed due to being disabled.

Next, add a **Circle** shape, set it's Border Radius to 400 and change the following properties in the **Advanced** pane:

| Property               | Value                                                                                                            |
|------------------------|------------------------------------------------------------------------------------------------------------------|
| FocusedBorderThickness | 0                                                                                                                |
| X                      | (Parent.Width - Self.Width) / 2 + (Round(Acceleration.X / 9.81 \* 90, 0) / 90 \* btnCircleLevel.Width / 2)   |
| Y                      | (Parent.Height - Self.Height) / 2 - (Round(Acceleration.Y / 9.81 \* 90, 0) / 90 \* btnCircleLevel.Width / 2) |
| Width                  | 42                                                                                                               |
| Height                 | Self.Width                                                                                                       |
| Width                  | 400                                                                                                              |
| Height                 | Self.Width                                                                                                       |

The **X** and **Y** properties allow the **Circle** shape to move about the center of the app screen, relative change in the **Acceleration** sensor values but contained within the circular area of **btnCircleLevel**.

### X and Y Axis bubble level-like visuals

Add a **Slider** control to the app, rename it to **sldXValue**, and change the following properties in the **Advanced** pane:

| Property  | Value                                         |
| --------- | --------------------------------------------- |
| Min       | -90                                           |
| Max       | 90                                            |
| Default   | Round(Acceleration.X \* (90 / 9.81), 0)       |
| ValueFill | Self.RailFill                                 |
| X         | (Parent.Width - Self.Width) / 2               |
| Y         | btnCircleLevel.Y + btnCircleLevel.Height + 30 |
| Width     | btnCircleLevel.Width                          |
| Height    | 70                                            |

This **Slider** control will display the angle similar to how a bubble level does: the **Handle** will move towards the raised side of the device, similar to the air bubble in a bubble level.

Next, copy **btnCircleLevel** by selecting it, pressing **Ctrl + C** and then **Ctrl + V**. Rename the control to **btnXValueOverlay** and change the following properties in the **Advanced** pane:

| Property | Value                                         |
|----------|-----------------------------------------------|
| X        | sldXValue.X - sldXValue.HandleSize / 2        |
| Y        | sldXValue.Y                                   |
| Width    | sldXValue.Width + sldXValue.HandleSize        |
| Height   | sldXValue.Height                              |

These changes will position it over the **sldXValue** control, preventing the user from changing its value and providing a visual border.

Copy and paste **sldXValue**, using the same method used to copy **btnCircleLevel**. Rename it to **sldYValue** and change the following properties:

| Property | Value                              |
| -------- | ---------------------------------- |
| Layout   | Layout.Vertical                    |
| X        | btnCircleLevel.X - Self.Width - 30 |
| Y        | (Parent.Height - Self.Height) / 2  |
| Width    | sldXValue.Height                   |
| Height   | sldXValue.Width                    |

Copy and paste **btnXValueOverlay**, renaming it to **btnYValueOverlay**, changing the following properties:

| Property | Value                                         |
|----------|-----------------------------------------------|
| X        | sldYValue.X                                   |
| Y        | sldYValue.Y - sldYValue.HandleSize / 2        |
| Width    | sldYValue.Width                               |
| Height   | sldYValue.Height + sldYValue.HandleSize       |

This completes the bubble level-like visuals.

## Test the level app

![Test the app](media/mobile-sensors/test-the-app-1.png "Test the app")

Save and publish the app. On a mobile device with the necessary sensors, open the app and navigate to screen with the bubble level visuals. Tilt the device from left to right, then up and down, and finally in all directions, noting the changes in angle properties as well as the changes in the visuals. Find an angled surface to place the device on and again note the angles and visuals.

### See also

- [Acceleration, App, Compass, Connection, and Location signals in Power Apps](../functions/signals.md)
- [Mixed reality controls in Power Apps](../mixed-reality-overview.md)
- [Geospatial controls in Power Apps](../geospatial-overview.md)

---

## Create an app with 3D and mixed reality controls

Source: [build-view-in-mr-3d-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/build-view-in-mr-3d-apps)

*Learn about how to use 3D and mixed reality controls.*

# Create an app with 3D and mixed reality controls

You can use the [3D object](../mixed-reality-component-view-3d.md) and [View in MR](../mixed-reality-component-view-mr.md) controls to view items in 3D, or to see how a particular item might fit within a specified space.

In this article, you'll learn how to use the 3D and mixed reality controls in Power Apps.

Watch this video to learn how to build mobile apps with View in MR control:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=7651a5f3-4886-4910-97b0-290116a9fa89]

## Prerequisites

See [prerequisites for mixed-reality capable devices](../mixed-reality-overview.md#prerequisites).

## Create an app with View in MR control

The **View in MR** control creates a button in your app. When app users selects the button, it overlays a selected 3D model (in the .glb file format) or image (in .jpg or .png file formats) onto the live camera feed of the device.

> [!TIP]
> You can also take photos and [upload them to OneDrive](../mixed-reality-take-upload-photos.md).

In this section, we will build a screen in an app that will allow a user to view the selected item in mixed reality using the **View in MR** control.

1. Open an app in [Power Apps Studio](https://create.powerapps.com/).

1. Select the **OnStart** property of the app, copy and paste the following:

    ```power-fx
    ClearCollect(
        col3dObjects,
        {
            ObjectName: "Forklift",
            ObjectURL: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/forklift.glb"
        },
        {
            ObjectName: "HVAC",
            ObjectURL: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/hvac.glb"
        },
        {
            ObjectName: "Machine",
            ObjectURL: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/machine.glb"
        },
        {
            ObjectName: "Pallet w/ Boxes",
            ObjectURL: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/pallet_with_boxes.glb"
        },
        {
            ObjectName: "Robot Arm",
            ObjectURL: "https://raw.githubusercontent.com/microsoft/experimental-pcf-control-assets/master/robot_arm.glb"
        }
    )
    ```

    :::image type="content" source="media/build-view-in-mr-3d-apps/app-onstart.png" alt-text="App OnStart property with the formula updated as mentioned in the above sample code.":::

    This formula will create a collection containing the names and links of the 3D objects to be viewed in mixed reality.

1. Add a **Text label** to the screen by dragging and dropping it from the **Insert** tab.

1. Position the added text label at the top-left corner of the screen, and modify the following properties in the **Properties** tab:

    | Property       | Value               |
    |----------------|---------------------|
    | Text           | "View In MR"        |
    | Font size      | 24                  |
    | Font weight    | `FontWeight.Semibold` |
    | Text alignment | `Align.Center`        |
    | Width          | 640        |

1. In the Advanced tab, modify the following properties for the text label:

    | Property       | Value                      |
    |----------------|----------------------------|
    | Color          | `RGBA(255, 255, 255, 1)`     |
    | Fill           | `RGBA(56, 96, 178, 1)`       |

    This change provides a header for the screen.

1. Insert a **Blank vertical gallery** from the **Layout** section of the **Insert** tab.

1. Position the gallery below the "View in MR" header you added earlier and expand it to use rest of the screen.

1. Change the following properties of the gallery:

    | Property      | Value        |
    |---------------|--------------|
    | Data source   | `col3dObjects` |
    | Template size | 80           |
    | X | 0 |
    | Y | 92 |
    | Width | 640 |
    | Height | 1044 |

1. Select **Edit gallery** to edit the gallery.

    :::image type="content" source="media/build-view-in-mr-3d-apps/edit-gallery.png" alt-text="Edit gallery for MR.":::

1. Insert a **Text label** into the gallery.

1. Change the following properties of the added text label:

    | Property | Value               |
    |----------|---------------------|
    | Text     | `ThisItem.ObjectName` |
    | X        | 10                  |
    | Y        | 5                   |
    | Width    | 540                 |

1. Edit the gallery again.

1. From the **Mixed Reality** section of the **Insert** tab, drag and drop the **View in MR** control into the gallery.

1. Change the following properties of the **View in MR** control.

| Property     | Value                                 |
|--------------|---------------------------------------|
| Text         | "View In MR"                          |
| Display type | Icon                                  |
| Source       | `ThisItem.ObjectURL`                    |
| X            | `Parent.TemplateWidth - Self.Width - 5` |
| Y            | 5                                     |
| Width        | 70                                    |

This change will provide a gallery that has a list of 3D objects and a button to press for the user to view those objects in mixed reality.

### Test the mixed reality control

Now that all the controls have been added, [save and publish](../save-publish-app.md) the app. On a mixed-reality capable device, open the app, and press the button that corresponds with the object you would like to view. This will open the **View in MR** experience.

:::image type="content" source="media/build-view-in-mr-3d-apps/view-mr-app.png" alt-text="View in MR.":::

Follow the on-screen instructions to calibrate the device by slowly moving it left and right while pointing the camera at a surface to be measured. Once the calibration is complete, you'll see an array of dots on the surface as well as a circle near the center of the screen. This circle shows where the 3D object can be placed initially. Once the cube has been placed it can be moved or rotated by using touch controls.

To move the object, press on it and slide it to where you would like it to be placed. To rotate the object, press one finger to the screen then swipe with another finger right or left.

Use the back button in the top left corner to return to the app screen and select another object. Repeat this process as desired to view each of the objects.

## Create an app with 3D object control

The **3D object** control allows you to view an item in 3D inside Power Apps. When app loads, it shows the 3D models (in the .glb file format) or image (in .jpg or .png file formats) inside the app through the control. You can select the 3D model to rotate, zoom in or out.

In this section, we will build a screen in an app that will allow a user to view the selected items in 3D using the **3D object** control.

1. Follow the steps 1 and 2 from the [Create an app with View in MR control](#create-an-app-with-view-in-mr-control) section to create an app with the collection of 3D objects for the app.

1. Add a **Text label** to the screen by dragging and dropping it from the **Insert** tab.

1. Position the added text label at the top-left corner of the screen, and modify the following properties in the **Properties** tab:

    | Property       | Value               |
    |----------------|---------------------|
    | Text           | "3D object"        |
    | Font size      | 24                  |
    | Font weight    | `FontWeight.Semibold` |
    | Text alignment | `Align.Center`        |
    | Width          | 640        |

1. In the Advanced tab, modify the following properties for the text label:

    | Property       | Value                      |
    |----------------|----------------------------|
    | Color          | `RGBA(255, 255, 255, 1)`     |
    | Fill           | `RGBA(56, 96, 178, 1)`       |

    This change provides a header for the screen.

1. Insert a **Blank vertical gallery** from the **Layout** section of the **Insert** tab.

1. Position the gallery below the "View in MR" header you added earlier and expand it to use rest of the screen.

1. Change the following properties of the gallery:

    | Property      | Value        |
    |---------------|--------------|
    | Data source   | `col3dObjects` |
    | Template size | 80           |
    | X | 0 |
    | Y | 92 |
    | Width | 640 |
    | Height | 1044 |

1. Select **Edit gallery** to edit the gallery.

    :::image type="content" source="media/build-view-in-mr-3d-apps/edit-gallery-3d.png" alt-text="Edit gallery for 3D.":::

1. Insert a **Text label** into the gallery.

1. Change the following properties of the added text label:

    | Property | Value               |
    |----------|---------------------|
    | Text     | `ThisItem.ObjectName` |
    | Width    | 640                 |

1. Edit the gallery again.

1. From the **Media** section of the **Insert** tab, drag and drop the **3D object** control into the gallery.

1. Change the following properties of the **View in MR** control.

| Property     | Value                                 |
|--------------|---------------------------------------|
| Source       | `ThisItem.ObjectURL`                    |
| X            | 18 |
| Y            | 138                                    |
| Width        | 600                                    |
| Height | 550 |

This change will provide a gallery that has a list of 3D objects that you can view in 3D.

### Test the 3D control

Now that all the controls have been added, [save and publish](../save-publish-app.md) the app. On a mixed-reality capable device, open the app, touch the screen to zoom in, zoom out, or turn the object being viewed in 3D.

:::image type="content" source="media/build-view-in-mr-3d-apps/view-in-3d.png" alt-text="3D object.":::

Since the gallery contains several objects in 3D, swipe down on the screen to see other objects and use the zoom or turn capabilities to work with the objects in 3D.

### See also

- [3D object control](../mixed-reality-component-view-3d.md)
- [Measuring Camera control](../mixed-reality-component-measure-distance.md)
- [View shape in MR control](../mixed-reality-component-view-shape.md)

---

## Create an app to view a shape in mixed reality

Source: [mobile-apps-view-shape-in-mr.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/mobile-apps-view-shape-in-mr)

*Learn how to use the view shape in MR control in your Power Apps.*

# Create an app to view a shape in mixed reality

You can use the **View Shape in MR** control in your app to let users see if a simple cube might fit within a specified space. They might want to do this to see how a certain object that you provide would fit in their space. If you have a 3D model or a head-on picture for the object, you'd like to fit test consider using the [View in MR](../mixed-reality-component-view-mr.md) instead.

The control creates a button in your app. When app users select the button, it overlays a cube onto the live camera feed of the device. You set up the dimensions of the cube when you edit the control in Power Apps.

Watch this video to learn how to build mobile apps with View Shape in MR control:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=2b6080fd-8236-48a5-b9b2-48285eccdba6]

In this article, we'll create a screen in an app that will allow users to create a custom cube shape by inputting unit to be used (centimeters, feet, inches, or meters), and defining the height, width, and depth of the cube.

## Prerequisites

See [prerequisites for mixed-reality capable devices](../mixed-reality-overview.md#prerequisites).

## Add controls for cube’s dimensions and units

Add header and labels to define cube's dimensions and units to the app screen.

### Header label

With an app open for editing in [Power Apps Studio](https://create.powerapps.com/), add a text label to the screen. Position it at the top-left corner of the screen and modify the following properties in the Properties tab:

| Property       | Value               |
|----------------|---------------------|
| Text           | `"Place A Cube"`      |
| Font size      | `24`                  |
| Font weight    | `FontWeight.Semibold` |
| Text alignment | `Align.Center`        |
| Width          | `Parent.Width`        |

Then in the Advanced tab, modify the following properties:

| Property | Value                  |
|----------|------------------------|
| Color    | `RGBA(255, 255, 255, 1)` |
| Fill     | `RGBA(56, 96, 178, 1)`   |

This change will provide a header for the screen.

### Labels and controls to specify cube properties

1. Add four text labels to the screen. These labels will be used to identify the
controls we'll add later. For each label, modify the **Text** property to one of the following:

    - `Unit Type`
    - `Width`
    - `Height`
    - `Depth`

1. Set the **Width** property of these labels to 160 and position them so they're stacked vertically in the order described above, near the top of the screen and to the left side.

1. Add a dropdown control and three text entry controls. The dropdown will be used to select a unit type for the cube dimensions and the three text entry controls will be used to enter the width, height, and depth of the cube.

1. Select the drop-down, rename it to *drpUnitType*, and change the following properties:

    | Property | Value                                       |
    |----------|---------------------------------------------|
    | Items    | `["Centimeters", "Feet", "Inches", "Meters"]` |
    | Default  | `"Feet"`                                      |
    | Width    | `280`                                         |

1. Position the control to the right of the Unit Type label.

1. Add three text input controls, and rename them to *txtShapeHeight*, *txtShapeWidth*, and *txtShapeDepth*. Change the following properties for all three controls:

    | Property | Value             |
    |----------|-------------------|
    | Default  | `2`                 |
    | Format   | `TextFormat.Number` |
    | Width    | `144`               |

1. Position the text input control named *txtShapeWidth* to the right of the Width label. Likewise, position the controls named *txtShapeHeight* and *txtShapeDepth* to the right of the Height and Depth labels, respectively.

Next, you'll add the View Shape in MR control and configure it to use the controls that were created to provide dynamic dimensions to the MR cube it'll generate.

## Insert the View Shape in MR control

Insert the control into your app.

1. Open the **Insert** tab.

1. Expand **Mixed Reality**.

1. Select the control **View Shape in MR** to place it in the center of the
    app screen, or drag and drop it to position it anywhere on the screen.

1. Once the control has been added, position it near the bottom of the screen and change the following properties:

    | Property    | Value                      |
    |-------------|----------------------------|
    | Text        | `"Place a cube"`             |
    | ShapeWidth  | `txtShapeWidth.Text`         |
    | ShapeHeight | `txtShapeHeight.Text`        |
    | ShapeDepth  | `txtShapeDepth.Text`         |
    | Units       | `drpUnitType.Selected.Value` |
    | Width       | `280`                        |
    
    :::image type="content" source="media/build-mobile-apps-view-shape-in-mr/view-in-shape.png" alt-text="View shape in mixed-reality control on a screen.":::

## Test the app

Now that all the controls have been added, [save and publish](../save-publish-app.md) the app. On a [mixed-reality capable device](#prerequisites), open the app, and press the **Place a cube** button. This will open the **View Shape in MR** experience, allowing the user to define an area to be measured.

Follow the on-screen instructions to calibrate the device by slowly moving it left and right while pointing the camera at a surface to be measured. Once the calibration is complete, you'll see an array of dots on the surface and a circle near the center of the screen. This circle shows where the cube can be placed initially. Once the cube has been placed, it can be moved or rotated by using touch controls.

To move the cube, press on it and slide it to where you would like it to be placed. To rotate the cube, press one finger to the screen, and then swipe with another finger right or left.

Use the back button in the top-left corner to return to the app screen and change one or more of the width, height, depth, or unit type settings. Select the **Place a cube** button and place the new cube.

### See also

- [3D object control](../mixed-reality-component-view-3d.md)
- [Measuring Camera control](../mixed-reality-component-measure-distance.md)
- [View shape in MR control](../mixed-reality-component-view-shape.md)

---

## Create an app with address input and map controls

Source: [mobile-apps-address-map.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/mobile-apps-address-map)

*Learn about how to create apps using address input and map controls in canvas apps.*

# Create an app with address input and map controls

There are many scenarios where users are expected to enter addresses in an app. Historically, there have been multiple fields capturing each element of an address where the user provides the street address, city and the postal code, and selects state. Entering addresses can be frustrating and error-prone, particularly in mobile scenarios.

The address input control presents the user with dynamic address suggestions as they type. Using fuzzy matching logic, the control suggests multiple potential address matches from which the user can select&mdash;making it quicker and easier to enter accurate addresses.

The control returns the address as structured data, allowing the application to extract information like city, street, municipality, and even latitude and longitude. The data is in a format friendly to many locales and international address formats.

To use the control, you need to enable the [Geospatial Services](../geospatial-overview.md#enable-geospatial-features-for-the-environment) for the environment.

- Watch this video to learn how to use the address input control:
    > [!VIDEO https://learn-video.azurefd.net/vod/player?id=ff56e551-756f-4796-8af9-419b40b1dbfd]


- Watch this video to learn how to use the map control:
    > [!VIDEO https://learn-video.azurefd.net/vod/player?id=c62bc98b-cf1f-4289-af11-82618c5e6d02]

In this article, we'll learn how to use the address input control in canvas apps.

## Prerequisites

To complete this lesson, you'll need a Power Apps environment with a Microsoft Dataverse database. If you don't have a license, you can sign up for the [Power Apps Developer Plan](../../developer-plan.md) or use a [Power Apps trial](../../signup-for-powerapps.md).

## Create a trial environment

An environment in Power Apps is a space to store, manage, and share your organization’s business data, apps, chatbots, and flows. It also serves as a container to separate apps that might have different roles, security requirements, or target audiences.

Each environment can have one Dataverse database.

To make sure that you have what you need to complete this lesson, we're going to create a new environment that includes a Dataverse database. This is a 30-day trial that will go away at the end of the 30 days, but you can upgrade it to a sandbox or production environment if you want to keep it.

We're going to create a trial environment that will include a Dataverse database, and the sample data used in this topic.

1. Go to [Power Platform admin center](https://admin.powerplatform.microsoft.com/) in a web browser.

1. Select **Environments**.

1. Select **New**.

1. Enter a name, for example "Dataverse Trial".

1. Select **Trial** for the environment type.

1. Toggle **Create Database** to **Yes**.

1. Select **Next**.

    :::image type="content" source="media/mobile-apps-address-map/create-a-trial-environment-1.png" alt-text="Create a trial environment.":::

1. Toggle **Deploy Sample Apps and Data** to **Yes**.

1. Select **Save**.

Your trial environment will now be created, including a Dataverse database and sample data in Dataverse tables.

## Enable the Geospatial Services for the environment

Before we can use the Geospatial Services in canvas apps, an admin must enable access to the features for the environment where we want to create the app.

To learn about how to enable **Geospatial services** in your environment, see [Enable the geospatial features for the environment](../geospatial-overview.md).

## Build a canvas app

We'll start with creating an app and then, we'll create a header control to use within the app to standardize the look and feel of the header on different screens.

1. Create a [blank canvas app](../create-blank-app.md) in the environment you created [earlier](#create-a-trial-environment).

1. Select **Insert** > **New Screen** > **Scrollable** to add a new screen.

    :::image type="content" source="media/mobile-apps-address-map/build-a-canvas-app-5.png" alt-text="Select scrollable.":::

1. Change the label text to "New Account".

    ![Header](media/mobile-apps-address-map/build-a-canvas-app-6.png)

1. Select **Insert** > **Forms** > **Edit** to add a form to the screen.

    ![Select edit](media/mobile-apps-address-map/build-a-canvas-app-7.png)

    The form control gets added

    ![Form control is added](media/mobile-apps-address-map/build-a-canvas-app-8.png)

1. Update the following properties of the form:

    | Property    | Value        |
    |-------------|--------------|
    | Data source  | Accounts     |
    | Columns     | 2            |
    | DefaultMode | `FormMode.New` |
    
1. Select **Edit** next to fields to add more fields to the form, and select the following address fields:

    - Address 1: Street 1
    - Address 1: City
    - Address 1: State
    - Address 1: Zip/Postal Code
    - Address 1: Country/Region
    - Address 1: Latitude
    - Address 1: Longitude

    ![Address properties](media/mobile-apps-address-map/build-a-canvas-app-10.png)

1. Adjust the order of the fields as shown below.

    ![Account Name and Main Phone in first row, Address 1: Street 1 and Address 1: City in second row, Address 1: State/Province and Address 1: ZIP/Postal Code in third row, Address 1: Country/Region and Address 1: Latitude in fourth row, Address 1: Longitude in the fifth row.](media/mobile-apps-address-map/build-a-canvas-app-11.png)

## Address Input control

In this section, we'll add the **Address Input** control to the app.

1. Select **Insert** > **Input** > **Address Input** to add the control to the screen.

    ![Select address input control](media/mobile-apps-address-map/address-input-component-1.png)

1. Move the control to the top-right side of the screen.

    ![Address input box is added](media/mobile-apps-address-map/address-input-component-2.png)

### Configure properties for the Address Input control

In this section, we'll review and if necessary, set various properties of the address control. There are a few **Address Input** control-specific properties.

![Address input controls](media/mobile-apps-address-map/address-input-component-3.png)

| **Property**         | **Description**                                                                                                                                                                                                                |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Search result limit  | The number of suggested addresses the control displays. We've set it to 5 in this example, so not more than five addresses will show up in search.                                                                              |
| Search within radius | Whether the control should suggest addresses within the user-defined **Radius** of the **Latitude** and **Longitude**. We've set it to **Yes** in this example.                                                                      |
| Latitude             | The latitude of the center point used to geo-bias address suggestions. Requires **Search within radius** to be on. We've set it to the formula `Location.Latitude` in this example to return the latitude of the current location.   |
| Longitude            | The longitude of the center point used to geo-bias address suggestions. Requires **Search within radius** to be on. We've set it to the formula `Location.Longitude` in this example to return the latitude of the current location. |
| Radius               | The radius, in meters, around **Latitude** and **Longitude** to constrain the address suggestions. Requires **Search within radius** to be **On**. We've set it to 100000 in this example.                                           |
| Language             | The language the address suggestions are returned in. We've left it with the default - "English (United States)".                                                                                                              |
| Country set          | Comma-separated list of countries/regions to constrain the address suggestions to, in ISO 3166 alpha-2 country codes. Examples: "US", "FR", "KW". We've it as US in this example.                                                     |

### Configure output properties for the Address Input control

The control outputs various properties when a user interacts with it inside an app. You can use these outputs in other controls or to customize the experience.

The following table lists the output properties available.

| **Property**                | **Description**                                                                                                                                                                         |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UserInput                   | Text the user has typed in the input box.                                                                                                                                               |
| SelectedLatitude            | Latitude of the user-selected address in the input field.                                                                                                                               |
| SelectedLongitude           | Longitude of the user-selected address in the input field.                                                                                                                              |
| SearchResultJson            | The search result (based on the UserInput property), displayed as a string in JSON format.                                                                                              |
| FreeformAddress             | Selected address from the list of suggested addresses.                                                                                                                                  |
| LocalName                   | An address control that represents the name of a geographic area or locality that groups multiple addressable objects for addressing purposes, without being an administrative unit. |
| PostalCode                  | Postal code.                                                                                                                                                                            |
| ExtendedPostalCode          | Extended Postal Code.                                                                                                                                                                   |
| CountryCode                 | Country code.                                                                                                                                                                           |
| Country                     | Country.                                                                                                                                                                                |
| CountryCodeISO3             | Country code in ISO alpha-3 format.                                                                                                                                                     |
| CountrySubdivisionName      | Country subdivision name.                                                                                                                                                               |
| StreetName                  | Street name.                                                                                                                                                                            |
| StreetNumber                | Street number.                                                                                                                                                                          |
| Municipality                | Municipality.                                                                                                                                                                           |
| MunicipalitySubdivision     | Municipality subdivision.                                                                                                                                                               |
| CountryTertiarySubdivision  | Country tertiary subdivision.                                                                                                                                                           |
| CountrySecondarySubdivision | Country secondary subdivision.                                                                                                                                                          |
| CountrySubdivision          | Country subdivision.                                                                                                                                                                    |

When you run the app and start typing an address, it will show addresses that match the entered value and are located only within 100,000 meters of the current location. Also, notice that it doesn't show more than five address suggestions at a time when you start typing in the address.

![Address entry](media/mobile-apps-address-map/address-input-component-4.gif)

Using the above control, we'll capture the address in the address fields of the form to create a new account. This step is useful so that the user doesn't have to type in each of the address elements individually.

We'll set the data card values to the appropriate property value from the address input.

> [!TIP]
> The default values of the data card might be locked. To unlock them, select the data card and go to the **Advanced properties**, and then select **Unlock to change properties**.

![Unlock the control](media/mobile-apps-address-map/address-input-component-5.png)

|Data card  |Value  |
|---------|---------|
|Address 1: Street 1     |  `AddressInput1.StreetNumber & " " & AddressInput1.StreetName`       |
|Address 1: City     |   `AddressInput1.Municipality`      |
|Address 1: State/Province     |   `AddressInput1.CountrySubdivision`      |
|Address 1: Zip/Postal Code     |   `AddressInput1.PostalCode`      |
|Address 1: Country/Region Datacard     |   `AddressInput1.Country`      |
|Address 1: Latitude     |   `AddressInput1.SelectedLatitude`      |
|Address 1: Longitude     |   `AddressInput1.SelectedLongitude`      |

Example for **Address 1: Street 1** data card:

![Address formula](media/mobile-apps-address-map/address-input-component-6.png)

The form gets populated with all the address fields when an address is selected in the **Address Input** control.

![Final form](media/mobile-apps-address-map/address-input-component-7.png)

## Map control

In this section, we'll see how to add the **Map** control on the app to show the selected location on the map.

1. Before adding the **Map** control, we need to create a collection to capture the address from the address input – this collection will be used as the data source for the map.

    On the **OnAddressSelect** property of the **Address Input** control, enter the following formula to create a collection that captures the address data.

    ```power-fx   
    ClearCollect(
        colSelectedAddress,
        {
            Street: AddressInput1.StreetNumber & " " & AddressInput1.StreetName,
            City: AddressInput1.Municipality,
            State: AddressInput1.CountrySubdivision,
            Zip: AddressInput1.PostalCode,
            Country: AddressInput1.Country,
            Latitude: AddressInput1.SelectedLatitude,
            Longitude: AddressInput1.SelectedLongitude
        }
    )
    ```

    ![Map control formula](media/mobile-apps-address-map/map-component-1.png)

1. Select an area outside of the **Address Input** control, and select **Insert** > **Media** > **Map** to add the map control to the screen.

    ![Select map](media/mobile-apps-address-map/map-component-2.png)

1. Select the collection as the data source.

    ![Select the control](media/mobile-apps-address-map/map-component-3.png)

1. Move the map below the address input section.

    ![Place the map on the screen](media/mobile-apps-address-map/map-component-4.png)

### Configure properties for the Map control

In this section, we'll review and if necessary, set various properties of the map control.

The following table lists the properties available.

| **Property**                            | **Description**                                                                                                                                                                                                                                       |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data source(Items)                      | Data source (table) that lists a predefined set of longitudes and latitudes to display as map pin on the map when it's loaded. Map each of the columns in your data by using the *ItemAddresses*, *ItemLongitudes*, *ItemLatitudes*, and *ItemLabels*. |
| Use default location                    | Whether the map initializes at a default location set by the user.                                                                                                                                                                                    |
| Default longitude                       | Longitude the map would go to when it's loaded if **Use default location** is enabled.                                                                                                                                                                    |
| Default latitude                        | Latitude the map would go to when it's loaded if **Use default location** is enabled.                                                                                                                                                                     |
| Default zoom level                      | Zoom level the map would be set to when it's loaded if **Use default location** is enabled.                                                                                                                                                               |
| Show current location                   | Whether the map should display the current location of the user.                                                                                                                                                                                      |
| Current location latitude               | The latitude of the current location of the user if **Show Current Location** is enabled.                                                                                                                                                                 |
| Current location longitude              | The longitude of the current location of the user if **Show Current Location** is enabled.                                                                                                                                                                |
| Satellite view                          | Whether the style of the map is a satellite view or a road view.                                                                                                                                                                                      |
| Cluster pins                            | Whether the map pins are clustered.                                                                                                                                                                                                                   |
| Zoom control                            | Whether the zoom control appears on the map.                                                                                                                                                                                                        |
| Compass control                         | Whether the compass control appears on the map.                                                                                                                                                                                                     |
| Pitch control                           | Whether the pitch control appears on the map.                                                                                                                                                                                                       |
| Pin color                               | The color of the pins.                                                                                                                                                                                                                                |
| ItemsLabels                             | A column in Items with the strings you want to use as labels for the pins.                                                                                                                                                                            |
| ItemsAddresses                          | A column in Items with the strings that represent the location of the pins.                                                                                                                                                                           |
| ItemsLongitudes                         | Name of the column in the table in your data source with floating-point numbers that represent the longitude position of the pins.                                                                                                                    |
| ItemsLatitudes                          | Name of the column in the table in your data source with floating-point numbers that represent the latitude position of the pins.                                                                                                                     |
| ItemsColors                             | Color of the pins.                                                                                                                                                                                                                                     |
| ItemsIcons                              | Icon of the pins.                                                                                                                                                                                                                                      |
| Items                                   | Name of the table in your data source that contains all the records that you want to plot in the map by using pins. Each row must have an entry for the label, longitude, and latitude for each row.                                                  |
| OnMapClick                              | How the map responds when any location is selected.                                                                                                                                                                                                    |
| OnSelect                                | How the app responds when a map pin is selected.                                                                                                                                                                                                      |
| OnLoad                                  | How the app responds when the map finishes loading.                                                                                                                                                                                                   |
| OnItemsChange                           | How the app responds when the map pins change.                                                                                                                                                                                                        |
| Show info cards                         | Whether the informational cards appear on the pins of the map.                                                                                                                                                                                            |
| Show shapes                             | Whether the shapes in **Shapes_Items** appear on the map.                                                                                                                                                                                                 |
| Show shape labels                       | Whether the labels appear on the shapes of the map.                                                                                                                                                                                                   |
| Enable shape drawing                    | Whether the drawing tools control appears on the map.                                                                                                                                                                                               |
| Enable shape deleting and label editing | Whether shapes can be deleted and their labels can be edited on the map.                                                                                                                                                                              |
| Shapes_Items                            | Name of the table in your data source that contains all the records with the GeoJSON objects that you want to show in the map as shapes.                                                                                                                  |
| ShapeGeoJSONObjects                     | Name of the column in the table in your data source with strings that represent the GeoJSON objects of the shapes.                                                                                                                                    |
| ShapeLabels                             | A column in **Shapes_Items** with the strings you want to use as labels for the shapes.                                                                                                                                                                   |
| ShapeColors                             | Color of the shapes.                                                                                                                                                                                                                                  |
| OnShapeSelected                         | How the app responds when a shape on the map is selected.                                                                                                                                                                                             |
| OnShapeCreated                          | How the app responds when a shape on the map is created.                                                                                                                                                                                              |
| OnShapeEdited                           | How the app responds when a shape on the map is edited.                                                                                                                                                                                               |
| OnShapeDeleted                          | How the app responds when a shape on the map is deleted.                                                                                                                                                                                              |

### Configure output properties for the Map control

The Map control outputs various properties when a user interacts with it inside an app. You can use these outputs in other controls or to customize the experience.

The following table lists the output properties available.

| **Property**         | **Description**                                                                                                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CenterLocation       | Center location of the map as either `.Latitude` or `.Longitude`. The output will be an integer. For example, calling `Map1.CenterLocation.Latitude` will output a single integer such as "47.60357". |
| Selected             | The selected pin on the map.                                                                                                                                                                  |
| SelectedItems        | The selected pin or pins of the selected cluster on the map.                                                                                                                                  |
| GeocodedItems        | The geo-coded locations of the pins on the map.                                                                                                                                                |
| ClickedLocation      | The last clicked location on the map as either `.Latitude` or `.Longitude`.                                                                                                                       |
| Shapes_Selected      | The record of the selected shape from **Shapes_Items**.                                                                                                                                       |
| Shapes_SelectedItems | The records of the selected overlapping shapes from **Shapes_Items**.                                                                                                                         |
| SelectedShape        | The selected shape on the map with `.Perimeter` and `.Area`.                                                                                                                                      |
| DeletedShape         | The last deleted shape on the map with `.Perimeter` and `.Area`.                                                                                                                                |
| GeoJSON              | The list of shapes on the map in Feature Collection GeoJSON format.                                                                                                                           |

To drop a pin on the address entered in the address input, we'll use the collection we created on the **OnAddressSelect** property and use that in the map control.

| Property       | Value                        |
|----------------|------------------------------|
| Items          | `colSelectedAddress`           |
| ItemsLatitudes | `colSelectedAddress.Latitude`  |
| ItemsLongitude | `colSelectedAddress.Longitude` |

![Map control properties](media/mobile-apps-address-map/map-component-5.png)

Some of the properties of the pin can be customized per location pin are explained below:

1. **ItemsColors** - To update the color of the pin to a different color for each location, add a column to the collection **Color: Red**, and use that in the **ItemsColors** data property of the **Map** control.

1. **ItemsLabels** - To update the label of the pin to a different label showing the address for each location, add a column to the collection **Label:AddressInput1.FreeformAddress**, and use that in the **ItemsLabels** data property of the **Map** control.

1. **ItemsIcons** - To change the icon of the pin for each location, add a column to the collection and use that in the **ItemsIcons** data property of the **Map** control. In this example, we'll add a triangle icon with the formula as `Icon: triangle`.

    > [!TIP]
    > For the complete list of icons, go to [List of image templates](/azure/azure-maps/how-to-use-image-templates-web-sdk#list-of-image-templates).

    ```power-fx
    ClearCollect(
        colSelectedAddress,
        {
            Street: AddressInput1.StreetNumber & " " & AddressInput1.StreetName,
            City: AddressInput1.Municipality,
            State: AddressInput1.CountrySubdivision,
            Zip: AddressInput1.PostalCode,
            Country: AddressInput1.Country,
            Latitude: AddressInput1.SelectedLatitude,
            Longitude: AddressInput1.SelectedLongitude,
            Label: AddressInput1.FreeformAddress,
            Color: Red,
            Icon: Triangle
        }
    );
    ```

After adding these to the collection, go to the **Advanced** tab of the **Map** control, and update the **ItemsColors**, **ItemsLabels** and **ItemsIcons** properties.

![Map control advanced properties](media/mobile-apps-address-map/map-component-6.png)

Run the app in preview mode to test. The map shows the location selected in the address input with a triangle icon and the address shows up as a label on the map.

![Map control update address](media/mobile-apps-address-map/map-component-7.gif)

### See also

[Interactive map control](../geospatial-component-map.md)

---

## Create an app using the Measuring Camera control

Source: [build-apps-measure-in-mr.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/build-apps-measure-in-mr)

*Learn how to use the Measuring Camera control in Power Apps.*

# Create an app using the Measuring Camera control

You can use the [Measuring Camera](../mixed-reality-component-measure-distance.md) control in your app to let users measure distance, area, and volume. During the measurement, you create two-dimensional and three-dimensional polygons that can be used to confirm how a certain-sized object would fit within a space.

The control creates a button in your app. When app users select the button, it shows a live camera feed of the device. App users can then specify a starting point, and one or multiple sequential endpoints to measure between. The instances of measured segments are shown directly on the live camera feed.

When the user exits the control, the measurements that were taken are captured in the **Measurements** property so they can be saved or stored.

Screenshots taken during the mixed reality experience are stored in the **Photos** property for viewing within the app.

In this article, we'll create a screen in an app to use the **Measuring camera** control to measure the area of a user-defined space as well as view a photo of the space that was measured.

Watch this video to learn how to build mobile apps with Measuring Camera control:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=94d7ae60-3cb4-41e5-80bd-d8212fa3e4a8]

## Prerequisites

See [prerequisites for mixed-reality capable devices](../mixed-reality-overview.md#prerequisites).

## Create the app with Measuring Camera control

1. Open an app in [Power Apps Studio](https://make.powerapps.com).

1. Select the **Insert** tab.

1. Expand **Media**.

1. Select the **Measuring camera** control to insert it on the screen.

1. Position the control near the bottom of the screen.

1. Change the following properties for the control using the property pane on the right-side of the screen.

    | Property            | Value        |
    |---------------------|--------------|
    | Text                | Measure Area |
    | Unit of measurement | Feet         |
    | Measurement type    | Area         |

    :::image type="content" source="media\build-apps-measure-in-mr\button-properties.png" alt-text="Measure Area button properties.":::

1. Select the Advanced tab and change the **OnMixedRealitySelect** property to the following formula:

    ```power-fx
    ClearCollect(colMRMeasurements, Self.Measurements);  
    ClearCollect(colMRPhotos, Self.Photos)  
    ```

    :::image type="content" source="media\build-apps-measure-in-mr\onmixedrealityselect-formula.png" alt-text="OnMixedRealitySelect formula.":::

    This formula will allow the user to define areas to be measured in square feet and store the most recent results of the measurements in a collection named **colMRMeasurements**, and the most recent photos in a collection named **colMRPhotos**.

1. Add a text label to the screen and move it to the top-left corner of the screen.

1. Change the following properties of the added text label:

    | Property       | Value        |
    |----------------|--------------|
    | Text           | Measure Area |
    | Font size      | 24           |
    | Font weight    | Semibold     |
    | Text alignment | Center       |
    | Width          | Parent.Width |
    | Color    | `RGBA(255, 255, 255, 1)` |
    | Fill     | `RGBA(56, 96, 178, 1)`   |

    :::image type="content" source="media\build-apps-measure-in-mr\header-label.png" alt-text="Header label.":::

    This label provides a header for the screen.

1. Add an image control, and move it just below the header label.

1. Change the following properties for the image control:

    | Property         | Value                       |
    |------------------|-----------------------------|
    | Image            | `First(colMRPhotos).ImageURI` |
    | Border Thickness | 2                           |

    The image control will display the first image taken from the **Measuring camera** control.

1. Add another label to the screen, positioning it below the image control. 

1. Change the **Text** property of the label to the following formula:

    ```power-fx
    "Area: " & If(IsEmpty(colMRMeasurements), "no area measured", First(colMRMeasurements).Area & " sq. " & First(colMRMeasurements).Unit)
    ```

    :::image type="content" source="media\build-apps-measure-in-mr\completed-app.png" alt-text="Completed app.":::

    This label will display the first area measurement and unit type that is collected from the **Measuring camera** control. If there's no measurement to be returned, the text will show **Area: no area measured** to let the user know that no value is present.

## Test the app

> [!TIP]
> Watch the video embedded at the top of this article to see how the app works.

Now that all the controls have been added, [save and publish](../save-publish-app.md) the app. On a mixed-reality capable device (as defined in the Prerequisites section), open the app, and press the **Measure Area** button. This action will open the **Measuring camera** experience, allowing the user to define an area to be measured.

Follow the on-screen instructions to calibrate the device by slowly moving it left and right while pointing the camera at a surface to be measured. Once the calibration is complete, you'll see an array of dots on the surface as well as a circle and dot reticle in the center of the screen. This reticle is used to define lengths, areas, and volumes by using the + button to add points and line segments.

Photos can be captured using the camera button. These photos will show the lengths, areas, and volumes defined by the user.

There's an undo button to undo any placed points.

Begin by placing a point using the **+** button. You'll notice that an orange line and measurement now appear connected to the point you placed. Place a second point and notice how a line with measurement appears between the two points you place. Continue placing points until the desired shape has been fully defined. To close a shape, place the reticle on the first point made and use the **+** button. You'll notice that the center point of the reticle changes color from white to green, indicating that the shape can be closed. If two of the sides of the shape intersect, or you try to close a shape using any other point than the first one. You'll notice that the center point of the reticle changes from white to red, indicating that a point cannot be placed there.

Once an area has been fully defined, position the device so that a picture can be taken of the area you defined and use the camera button to do so. The select the **Submit** button. A confirmation dialog will appear, asking if you've finished with your measurements. If you have more measurements to enter, select **Cancel** to return to the MR environment. If you're finished, select **Submit** to be taken back to the app screen.

You'll see the first picture taken as well as the calculated area of the shape you defined as well as the units, in this case square-feet.

The measurement and photo can then be used like any other photo or text field in Power Apps, for instance to be sent in an email or stored in a table in Microsoft Dataverse.

### See also

- [Measuring Camera control](../mixed-reality-component-measure-distance.md)
- [Add mixed reality controls to your canvas app](../mixed-reality-overview.md)

---

## Create a canvas app with deep link to a specific screen

Source: [deep-linking.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/deep-linking)

*Learn how to deep link to a specific screen within canvas apps.*

# Create a canvas app with deep link to a specific screen

A common scenario when building apps is the need to share a "deep link" to a specific screen. Deep links are useful when you want to get users straight to a specific screen and data rather than asking them to navigate from the "home" screen of your app.

To deep link into Power Apps, you'll use this URL syntax: `https://apps.powerapps.com/play/{App ID}?{Query}`.

In this syntax:
- **App ID**&mdash;ID of the app. Go to [Power Apps](https://make.powerapps.com) > **Apps** > Select your app > **Details**.
- **Query**&mdash;The query text allows you to supply the data to deep link to. You'll need to make some code changes to your canvas app to use the provided parameters to open the app using the query URL.

In this article, you'll learn about how to:

- Set up a canvas app to handle the query parameter.
- Create a UI for emailing a deep link directly from a screen of your app.
- Use the app to browse to a specific account, send an email with the deep link, and use the link from the received email to open the app directly to that account.

## Prerequisites

- [Power Apps license](/power-platform/admin/pricing-billing-skus)
- If you're new to Power Apps, familiarize yourself with Power Apps basics by [generating an app](../get-started-test-drive.md) and then customizing that app's [controls](../add-configure-controls.md), [gallery](../add-gallery.md), [forms](../working-with-forms.md), and [cards](../working-with-cards.md).
- To create an app, you must be assigned to the [Environment Maker](/power-platform/admin/database-security) security role.

## Create the app

[Create an app](../data-platform-create-app.md) using the **Accounts** table in Microsoft Dataverse.

Your app opens to the **BrowseScreen**, that shows a list of accounts in a gallery. By default, this gallery shows an email address, a city, and an account name. The app also contains **DetailScreen** and **EditScreen**.

## Update navigation

Now you'll set the navigation to use a context that we'll use to take the user to another screen.

1. On **BrowseScreen** screen, select **Layout** under gallery properties, and select **Title, subtitle and body**

    :::image type="content" source="media/deep-linking/account-list.png" alt-text="Accounts list view.":::

1. Select first record of **BrowseGallery** gallery. And then, under **OnSelect**, enter the following:

    ```power-fx
    Navigate(DetailScreen1, Fade, {accountVal:ThisItem})
    ```

    :::image type="content" source="media/deep-linking/onselect-accountval.png" alt-text="Set AccountVal.":::

    The [Navigate()](../functions/function-navigate.md) function creates a context variable called **accountVal**. This variable is populated whenever you select a record from the gallery. Upon selecting record, you'll be taken to the **DetailScreen** with the selected value (in this example, account) in **accountVal**.

1. From the **Tree view** on the left-side of the screen, expand **DetailScreen1**, and select **DetailForm1**.

    :::image type="content" source="media/deep-linking/select-detailform1.png" alt-text="Select DetailForm1 from Tree view.":::

1. From the properties pane on the right-side of the screen, select **Edit fields**, and add **Account**, **Primary Contact**, and **Email** fields.

    :::image type="content" source="media/deep-linking/account-detail.png" alt-text="Accounts Detail view.":::

1. Select **DetailForm**, and set **Item** to **accountVal**.

    :::image type="content" source="media/deep-linking/set-account-detail.png" alt-text="AccountVal.":::

1. [Save](../save-publish-app.md) with the name "Account deep linking".

## Get the App ID

**App ID** is a unique GUID representing a given app, and generated when you save the app to cloud.

To get the **App ID**, open a new tab and go to [Power Apps](https://make.powerapps.com) > **Apps** > Select your app > **Details**. More information: [Get an App ID](../get-sessionid.md#get-an-app-id)

  :::image type="content" source="media/deep-linking/app-detail.png" alt-text="App details.":::

## Enable deep link to a screen

The goal of this example is to take users to the **DetailsScreen1** when the app is launched with the **accountId** query parameter as part of the app URL. For this purpose, we'll use function [Param()](../functions/function-param.md) that retrieves the query string parameter supplied while launching the app.

1. Select **App** from the **Tree view** on the left-side of the screen.

    > [!TIP]
    > If you've closed Power Apps Studio, reopen the saved "Account deep linking" app by [editing](../edit-app.md) the app.

1. Select **OnStart** property from the list of properties.

1. To store the **App ID** value, update the **OnStart** property formula as below.

    ```power-fx
    Set(AppID, "GUID");
    If(Not(IsBlank(Param("accountId"))),Set(accountId,Param("accountId")));
    ```

    In this formula, function [Set()](../functions/function-set.md) sets the **App ID** to the GUID of the app. And function [Param()](../functions/function-param.md) stores the value in the **accountId** variable, when not blank.

    > [!NOTE]
    > Ensure you replace "GUID" in the above formula to your App ID as appropriate.

    :::image type="content" source="media/deep-linking/app-onstart.png" alt-text="App OnStart formula with Set and Param functions.":::

1. Select **StartScreen** property for the app, and add the following:

    ```power-fx
    If(Not(IsBlank(Param("accountId"))),DetailScreen1,BrowseScreen1)
    ```

    This function checks if the Param is blank, then stay on the **BrowseScreen1**. Else, go to **DetailScreen1**.

    :::image type="content" source="media/deep-linking/app-startscreen.png" alt-text="App StartScreen formula with Param function to redirect or stay based on variable value.":::

1. Select **DetailScreen1** from the **Tree view**.

1. Select **OnVisible** property, and enter the following:

    ```power-fx
    If(Not(IsBlank(accountId)), UpdateContext({accountVal:LookUp(Accounts, Account = GUID(accountId))}))
    ```

    This function uses **accountId** stored from the previous step to set **accountVal** variable.

    :::image type="content" source="media/deep-linking/detailscreen-onvisible.png" alt-text="DetailScreen1 with OnVisible property formula.":::

## Create the deep link URL

Your app is now configured to receive **accountId** as the parameter that contains the GUID for an account from the **Accounts** table. And when this parameter is provided with the request to the app, the app will directly open the details screen (**DetailScreen1**) with the given **accountId**.

To invoke app with the parameter value, we have to use the following syntax:

`https://apps.powerapps.com/play/{App ID}?{Query}`

In the above syntax, we have to add the **App ID** and the query that contains **accountId** variable with its value.

For example, when the following URL was entered in a browser for the sample tenant, the app **Account deep linking** opened directly with the supplied **accountId** parameter value (in this example, "A. Datum Corporation (Sample)"): `https://apps.powerapps.com/play/061b64cd-e5a0-4a7a-a77f-b6f8586dd6c7?accountId=01e5bf81-7d44-ec11-8c60-002248094566`

:::image type="content" source="media/deep-linking/sample-link.png" alt-text="Sample link with A. Datum Corporation (Sample) details open.":::

## Send deep link in email

We can also supply a variable **accountVal** to point to the account's ID instead of using absolute link explained above while invoking the URL for the given account from inside the app.

For this purpose, we'll create a button and add the ability to invoke an email from within the app with the deep link to the selected account's details screen from the **Account deep linking** app.

1. Select **Data** from the left-side of the screen.

1. Select **Add data** > search for and select **Office 365 Outlook** > select **Connect**.

    > [!NOTE]
    > This action adds the Microsoft 365 Outlook connection so that we can use the next steps to invoke composing an email to share the account information.

1. Select **DetailScreen1** from the **Tree view**.

1. Insert a button at bottom-right of the screen, and rename it to **Share Account**.

1. On the button's **OnSelect** property, enter the following:

    ```power-fx
    Office365Outlook.SendEmailV2("Recipient", "Subject", "Here's the deep link to the selected account - https://apps.powerapps.com/play/{App ID}?accountId=" & accountVal.Account)
    ```

    This formula uses the Microsoft 365 connector for Outlook to send an email using the [SendEmailV2](/connectors/office365/#send-an-email-(v2)) operation.

    > [!NOTE]
    > Replace **Recipient**, **Subject**, and **AppID** in the above formula with the email address of the recipient, subject for the email, and the ID of the app.

    :::image type="content" source="media/deep-linking/share-account-button.png" alt-text="Share Account button.":::

1. [Save and publish](../save-publish-app.md) the app.

## Test the app

Run the app, and go to the details screen for any account. And then, select the button **Share account**. The **OnSelect** button formula triggers an email to the recipient with the subject and body configured earlier. Here's a sample email sent by the configured app:

:::image type="content" source="media/deep-linking/sent-email.png" alt-text="Email sent using button Share account.":::

Open the email, and copy the deep link that points to the selected account, and you'll be taken directly to the account details screen in the **Account deep linking** app, instead of the default browse screen.

:::image type="content" source="media/deep-linking/app-opened-from-email.png" alt-text="App opened using the link from the email.":::

### See also

- [Create a canvas app from a template](../get-started-test-drive.md)
- [Add and configure controls in canvas apps](../add-configure-controls.md)
- [Get started with formulas in canvas apps](../working-with-formulas.md)

---

## Work with the PDF function (experimental)

Source: [pdf-function.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/how-to/pdf-function)

*Learn to use the PDF function in Microsoft Power Apps to generate and work with a PDF file in your apps.*

# Work with the PDF function (experimental)

The PDF function in Power Apps generates a PDF document from the contents of a screen or certain types of controls. You can pass the generated file to an action connector&mdash;for example, to send it in an email using the Office 365 Outlook connector&mdash;or to a Power Automate flow as part of an automation scenario.

> [!IMPORTANT]
>
> - This is an experimental feature. Experimental features aren't meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback. [Understand experimental, preview, and retired features in canvas apps](../working-with-experimental-preview.md).
> - You must turn on the PDF function in [Settings &gt; Upcoming features &gt; Experimental](../working-with-experimental-preview.md#controlling-which-features-are-enabled). As an experimental feature, it's disabled by default.
> - Send your feedback in the [Power Apps experimental features community forum](https://powerusers.microsoft.com/t5/Power-Apps-Experimental-Features/bd-p/PA_ExperimentalFeatures).

## Turn on the PDF function

Since the PDF function is an experimental feature, it's turned off by default. To use it in your apps, you need to turn it on manually.

1. [Sign in to Power Apps](https://make.powerapps.com) and [create a canvas app](../create-blank-app.md) or open an existing app.

1. In Power Apps Studio, on the command bar, select **Settings**.

1. Select **Upcoming features**.

1. On the **Experimental** tab, turn on **PDF function**.

## Use the PDF function to generate a PDF file

In the following example, we use the PDF function in the `OnSelect` property of a button to generate a PDF file. You can also use the PDF function in `OnVisible`, `OnHidden`, or any other [behavior property](../working-with-formulas-in-depth.md).

1. Select an existing button or add a new button to your canvas app.

1. In the button's `OnSelect` property, add the PDF function and enter the target of the function as a parameter. Enter the formula: `PDF(SubmitInspectionScreen);`

    In this example, we're targeting the screen `SubmitInspectionScreen` to generate a PDF file from the contents of our sample app's Inspection screen. Replace it with the name of a screen in your app.

    :::image type="content" source="media/pdf/print-pdf-enter-formula-2.png" alt-text="Screenshot of adding the PDF function to a button's OnSelect property.":::

1. Select [**Save and publish**](../power-apps-studio.md#save).

Play the app and select the button you added. The PDF file is generated and stored in memory for future use. The following section suggests a few ways to work with the PDF file in your app.

The PDF function can only target the screen that's currently visible. You can pass the entire screen, as in our example, or enter [more parameters](/power-platform/power-fx/reference/function-pdf#syntax) to specify a container or gallery to limit the content to pass.

## Work with the generated PDF file

You can use the generated PDF file in many ways. Here are a few, using the example in the previous section.

### View the file with the PDF viewer control

1. In your canvas app, select the button that you created in the previous example or add a new button.

1. In the button's `OnSelect` property, enter the following formula, replacing `SubmitInspectionScreen` with the name of a screen in your app: `Set(myPDF, PDF(SubmitInspectionScreen));`

    :::image type="content" source="media/pdf/print-pdf-button-prop-3.png" alt-text="Screenshot of setting the OnSelect property of a button in a canvas app.":::

1. Select **Insert** > **PDF viewer (experimental)**.

1. From the [properties  list](../power-apps-studio.md#3--properties-list), select the **Document** property and then enter **myPDF** in the formula bar.

    :::image type="content" source="media/pdf/print-pdf-document-prop-4.png" alt-text="Screenshot of setting the Document property of a button in a canvas app.":::

1. Select [**Save and publish**](../power-apps-studio.md#save).

Play the app and select the button you added. The PDF file is generated, stored in the variable `myPDF`, and visible in the PDF viewer control.

The PDF viewer control appears as a black shape inside the generated PDF file. To exclude the control from the generated file, place the content you want to turn into a PDF file inside a container or gallery and target that instead of the screen; for example,`PDF(Container1)` or `PDF(Gallery1).`

### Use an action connector

In this example, we generate a PDF file that we send as an email attachment using the [Office 365 Outlook connector](/connectors/office365).

1. In your canvas app, select the button that you created in the previous example or add a new button.

1. In the button's `OnSelect` property, enter the following formula:

   ```
   Office365Outlook.SendEmailV2( 
      "sample@email.com", 
       "New Safety Inspection" 
       "A new safety inspection has been submitted for your review. Please see attached.", 
       { 
           Attachments: Table( 
                { 
                    Name: "submittedInspection.pdf", 
                    ContentBytes: PDF(SubmitInspectionScreen) 
                } 
            ) 
       } 
    ); 
   ```

    :::image type="content" source="media/pdf/print-pdf-onselect-button-5.png" alt-text="Screenshot of an email added to a button's OnSelect property.":::

1. Select [**Save and publish**](../power-apps-studio.md#save).

Play the app and select the button you added. The PDF file is generated, and an email is sent to the specified email address with the generated PDF file attached.

### Use in a Power Automate flow

In this example, we generate a PDF file and pass it to a Power Automate flow that stores the file in a document library using the [SharePoint connector](/connectors/sharepointonline). This example replaces the default PowerApps trigger in Power Automate with the PowerApps (V2) trigger.

#### Create a flow to use in your app

1. In your canvas app, select the button that you created in the previous example or add a new button.

1. In the [app authoring menu](..//power-apps-studio.md#5--app-authoring-menu), select **Power Automate** > **Create new flow**.

1. Select **Create from blank**.

1. To delete the default PowerApps trigger, select the trigger menu (**&hellip;**), and then select **Delete**.

    :::image type="content" source="media/pdf/print-pdf-delete-flow-8.png" alt-text="Screenshot of deleting the default PowerApps trigger in the Power Automate flow.":::

1. Search for and select **PowerApps (V2)**.

    :::image type="content" source="media/pdf/print-pdf-select-trigger-9.png" alt-text="Screenshot of selecting the PowerApps (V2) trigger.":::

1. Select the **PowerApps V2** trigger to expand the node, and then select **Add an input**.

    :::image type="content" source="media/pdf/print-pdf-add-input-10.png" alt-text="Screenshot of adding an input to the PowerApps (V2) trigger node.":::

1. Select **File** as the type of user input.

1. Select **Add an input** again, and then select **Text** as the type of user input.

1. Rename the input **File Name** and change the description to **Please enter the name of the file**.

    :::image type="content" source="media/pdf/print-pdf-add-input-12.png" alt-text="Screenshot of two user inputs in the PowerApps (V2) trigger node.":::
#### Add the SharePoint connector to the flow

1. Select **New step** to add an action. Search for **SharePoint** and select **Create file**.

    :::image type="content" source="media/pdf/print-pdf-create-file-13.png" alt-text="Screenshot of adding the SharePoint Create file connector to the flow.":::

1. In **Site Address**, select a SharePoint site that you have permission to add files to.

1. In **Folder Path**, select a document library that you have permission to add files to.

1. Select the **File Name** input. In the **Dynamic content** tab, select a file name under **PowerApps (V2)**.

1. Select the **File Content** input, and then select **File Content** in the list.

    :::image type="content" source="media/pdf/print-pdf-create-file-14.png" alt-text="Screenshot of selecting a file to save using the SharePoint Create file connector.":::
    
1. Select **Save**, and then select the **x** in the upper-right corner to close the Power Automate window.

1. The Power Automate pane refreshes, and the new PowerApps (V2) flow, **Create file**, appears in the list.

    :::image type="content" source="media/pdf/print-pdf-flow-created-16.png" alt-text="Screenshot of the flow in the Power Automate list.":::

#### Add the flow to a button in your app

1. Select the button in your app canvas. In the button's `OnSelect` property, enter the following formula, replacing the flow name and generated PDF file name with your own:

    ```
    'PowerAppV2->Createfile'.Run( 
       "NewInspectionReport.pdf", 
        {         
           file: { 
                name: "NewInspectionReport.pdf", 
                contentBytes: PDF(InspectionDetails) 
            }               
        } 
    );  
    ```

    :::image type="content" source="media/pdf/print-pdf-save-17.png" alt-text="Screenshot of the flow added to a button's OnSelect property.":::

1. Select [**Save and publish**](../power-apps-studio.md#save).

Play the app and select the button you added. The Power Automate flow runs and adds the generated PDF file into the document library.

### See also

[PDF function in Power Apps (experimental)](/power-platform/power-fx/reference/function-pdf)

---

