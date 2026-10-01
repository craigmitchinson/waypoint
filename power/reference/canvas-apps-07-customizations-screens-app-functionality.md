# Power Apps Canvas Apps — Basic Customizations, Screens & App Functionality

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 22

## Contents

1. [Tutorial: Customize a gallery in Power Apps](#tutorial-customize-a-gallery-in-power-apps)
2. [Customize forms in canvas apps](#customize-forms-in-canvas-apps)
3. [Customize a card in a canvas app](#customize-a-card-in-a-canvas-app)
4. [Building responsive canvas apps](#building-responsive-canvas-apps)
5. [Change screen size and orientation of canvas apps](#change-screen-size-and-orientation-of-canvas-apps)
6. [Create responsive layouts in canvas apps](#create-responsive-layouts-in-canvas-apps)
7. [Get started with formulas in canvas apps](#get-started-with-formulas-in-canvas-apps)
8. [Automate your business processes with agent builder in a canvas app](#automate-your-business-processes-with-agent-builder-in-a-canvas-app)
9. [Use Copilot to create and edit Power Fx formulas in Power Apps](#use-copilot-to-create-and-edit-power-fx-formulas-in-power-apps)
10. [Understand variables in canvas apps](#understand-variables-in-canvas-apps)
11. [Understand behavior formulas for canvas apps](#understand-behavior-formulas-for-canvas-apps)
12. [Use the Search pane](#use-the-search-pane)
13. [Use Find and Replace in the formula bar](#use-find-and-replace-in-the-formula-bar)
14. [Show text, dates, and times in canvas apps](#show-text-dates-and-times-in-canvas-apps)
15. [Create and update a collection in a canvas app](#create-and-update-a-collection-in-a-canvas-app)
16. [Show information about a user in a canvas app](#show-information-about-a-user-in-a-canvas-app)
17. [Use Power Automate pane](#use-power-automate-pane)
18. [Start a flow in a canvas app](#start-a-flow-in-a-canvas-app)
19. [Convert rules to expressions](#convert-rules-to-expressions)
20. [Create or update bulk records in Power Apps](#create-or-update-bulk-records-in-power-apps)
21. [Power Apps Ideas](#power-apps-ideas)
22. [Transform natural language to Power Fx formulas](#transform-natural-language-to-power-fx-formulas)

---

## Tutorial: Customize a gallery in Power Apps

Source: [customize-layout-sharepoint.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/customize-layout-sharepoint)

*Learn about how to customize data that appears in gallery and other elements of canvas apps generated automatically.*

# Tutorial: Customize a gallery in Power Apps

In this tutorial, you'll customize a list of records, called a gallery, and make other changes in an app that was generated automatically in Microsoft Power Apps. Users can manage data in the app even if you don't make these changes, but the app will be easier to use if you customize it for your organization's needs.

For example, the gallery for this tutorial matches this graphic by default. The email address is featured more prominently than other types of data, and users can sort and filter the gallery based on text in that address:

![Default gallery.](./media/customize-layout-sharepoint/gallery-before.png)

However, your users might be more interested in the account name more than the email address, so you'll reconfigure the gallery to highlight, sort, and filter based on the key data for your organization. In addition, you'll change the title of the default screen to differentiate it from the other screens in the app.

![Gallery after changes.](./media/customize-layout-sharepoint/gallery-after.png)

You'll also add a scroll bar so that users who don't have touch screens or mouse wheels can browse the entire gallery.

> [!div class="checklist"]
> * Change the layout of the gallery
> * Change the type of data that appears in the gallery
> * Change the columns by which users can sort and search the data
> * Change the screen title
> * Show a scroll bar

This tutorial starts with an app that was generated from a specific data source. However, the same concepts apply to any app that you generate in Power Apps, whether from a list created using Microsoft Lists, a SharePoint library, an Excel table, or some other data source.

If you're not signed up for Power Apps, [sign up for free](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) before you start.

## Prerequisites

[Generate an app](data-platform-create-app.md) from the **Accounts** table of Microsoft Dataverse.

## Open the generated app

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), and then select **Apps** near the left edge.

1. Find the app that you generated, select the ellipsis icon (**...**) for it, and then select **Edit**.

    ![Open app for editing.](./media/customize-layout-sharepoint/open-app.png)

1. If the **Welcome to Power Apps Studio** dialog box appears, select **Skip**.

## Change the layout

1. In the left navigation pane, select **BrowseGallery1**.

    When the gallery is selected, a selection box with handles surrounds it.

    ![Select gallery.](media/customize-layout-sharepoint/select-gallery-1.png)

1. On the **Properties** tab of the right-hand pane, open the list of options under **Layout**, and then select the option that shows only a title.

    ![Select title-only layout.](./media/customize-layout-sharepoint/choose-layout.png)

1. Next to **Fields**, select **Edit**, and then select the down arrow for the title box.

    The name of this control will end in a numeral, such as **Title1**, but the numeral might differ based on other actions you might have taken.

1. In the list of options, select **Account name**, and then close the **Data** pane.

    The gallery shows the name of each account.

    ![Final gallery.](./media/customize-layout-sharepoint/final-gallery.png)

## Change sort and search columns

1. Select the gallery as the previous section describes.

    ![Gallery highlighted.](./media/customize-layout-sharepoint/select-gallery-title.png)

1. Near the upper-left corner, confirm that the property list shows **Items**.

    ![Items property.](./media/customize-layout-sharepoint/items-property.png)

    The value of this property appears in the formula bar. You set this property to specify not only the data source for the gallery but also the columns by which users can sort and search the data.

1. Copy this formula, and then paste it in the formula bar.

    ```SortByColumns(Search(Accounts, TextSearchBox1.Text, "name"), "name", If(SortDescending1, Descending, Ascending))```

    By using this formula, you ensure that:

    * If a user types one or more characters in the search bar, the gallery shows only those account names that contain the text that the user typed.
    * If a user selects the sort icon, the gallery is sorted alphabetically by account name in either ascending or descending order, depending on how many times the user selects the icon.

     For more information about these and other functions, see the [formula reference](formula-reference.md).

### Test sorting and searching

1. Open Preview mode by pressing F5 (or by selecting the play button near the upper-right corner).

    ![Open Preview mode.](./media/customize-layout-sharepoint/open-preview.png)

1. Near the upper-right corner of the browse screen, select the sort icon one or more times to change the alphabetical sort order between ascending and descending.

    ![Test the sort icon.](./media/customize-layout-sharepoint/sort-button.png)

1. In the search box, type **k** to show only those account names that contain the letter that you typed.

    ![Test the search bar.](./media/customize-layout-sharepoint/test-filter.png)

1. Remove all text from the search bar, and then close Preview mode by pressing Esc (or by selecting the close icon near the upper-right corner).

## Change the screen title

1. Select the title of the screen by clicking or tapping it.

    ![Select screen title.](./media/customize-layout-sharepoint/select-title.png)

1. Ensure that the property list shows **Text** and then, in the formula bar, replace **Accounts** with **Browse** (retaining the double quotation marks).

    ![Update screen title.](./media/customize-layout-sharepoint/change-screen-title.png)

    The screen reflects your change.

    ![New screen title.](./media/customize-layout-sharepoint/new-screen-title.png)

## Show a scrollbar

If your users might have neither touch screens nor mouse wheels, configure the gallery to show a scrollbar when the user hovers over it with the mouse. That way, users can show all accounts even if the screen can't show them all at once.

1. Select the gallery as the first procedure describes.

    ![Gallery highlighted for scrollbar.](./media/customize-layout-sharepoint/select-gallery-sorted.png)

1. Set the gallery's **Show scrollbar** property to **true**.

## Next steps

In this tutorial, you've customized the gallery and made other changes to the default screen for browsing records in a generated app. You can also customize the default screens for displaying details and creating or updating accounts. As the browse screen contains a gallery, the other two screens in the app contain forms. You can change, for example, which types of data the forms show and in which order.

---

## Customize forms in canvas apps

Source: [customize-forms-sharepoint.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/customize-forms-sharepoint)

*Learn about how to specify which data to show in a canvas app form, in which order to show them, and in which controls.*

# Customize forms in canvas apps

In a canvas app, customize a **Display form** control and an **Edit form** control so that they show the data that matters most and in the most intuitive order to help users easily understand and update the data.

Each form comprises one or more cards, each of which shows data from a particular column in the data source. By following the steps in this topic, you can specify which cards appear in a form and move cards up and down within a form.

If you're unfamiliar with canvas-pps, see [What are canvas apps?](getting-started.md).

## Prerequisites

[Generate an app](data-platform-create-app.md) from the Microsoft Dataverse, and then [customize the gallery](customize-layout-sharepoint.md) in that app.

## Show and hide cards

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), and then open the app that you generated and customized.

1. In the left navigation bar, type or paste **D** in the search bar to filter the list of elements, and then select **DetailForm1**.

    > [!div class="mx-imgBorder"]
    > ![Select details screen.](./media/customize-forms-sharepoint/select-detailform.png)

1. On the **Properties** tab of the right-hand pane, select **Edit fields** to open the **Fields** pane.

    > [!div class="mx-imgBorder"]
    > ![Open fields pane.](./media/customize-forms-sharepoint/edit-fields.png)

1. Hide a field, such as **Description**, by hovering over it, selecting the ellipsis (...) that appears, and then selecting **Remove**.

    > [!div class="mx-imgBorder"]
    > ![Hide description.](./media/customize-forms-sharepoint/hide-fields.png)

1. Show a field by selecting **Add field**, typing or pasting the first few letters of the field's name in the search box, selecting the field's check box, and then selecting **Add**.

    > [!div class="mx-imgBorder"]
    > ![List of fields.](./media/customize-forms-sharepoint/show-field.png)

## Reorder the cards

1. In the **Fields** pane, drag the **Account Name** field to the top of the list of fields.

    The cards in **DetailForm1** reflect the change.

    > [!div class="mx-imgBorder"]
    > ![Reordered cards.](./media/customize-forms-sharepoint/reordered-card.png)

1. (optional) Reorder the other cards into this sequence:

    - Account Name
    - Number of Employees
    - Annual Revenue
    - Main Phone
    - Address 1: Street 1
    - Address 1: Street 2
    - Address 1: City
    - Address 1: ZIP/Postal Code

1. In the left navigation bar, type or paste **Ed** in the search bar, and then select **EditForm1** to select it.

1. Repeat the steps in the previous procedure and this one so that the fields in **EditForm1** match those in **DetailForm1**.

## Run the app

1. In the left navigation bar, type or paste **Br** in the search bar, and then select **BrowseScreen1** to select it.

1. Open Preview mode by pressing F5 (or by selecting the **Preview** icon near the upper-right corner).

    > [!div class="mx-imgBorder"]
    > ![Preview icon.](./media/customize-forms-sharepoint/open-preview.png)

1. In the upper-right corner, select the plus icon to add a record in **EditScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Add record.](./media/customize-forms-sharepoint/add-record.png)

1. Add whatever data you want, and then select the checkmark icon in the upper-right corner to save your changes and return to **BrowseScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Save record.](./media/customize-forms-sharepoint/save-record.png)

1. Select the arrow for the item that you just created to show details about that item in **DetailScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Right arrow.](./media/customize-forms-sharepoint/right-arrow.png)

1. In the upper-right corner, select the edit icon to update the record in **EditScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Edit record.](./media/customize-forms-sharepoint/edit-record.png)

1. Change the information in one or more fields, and then select the check mark in the upper-right corner to save your changes and return to **DetailScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Save changes.](./media/customize-forms-sharepoint/save-record.png)

1. Near the upper-right corner, select the trash-can icon to delete the record that you just updated and to return to **BrowseScreen1**.

    > [!div class="mx-imgBorder"]
    > ![Delete record.](./media/customize-forms-sharepoint/delete-record.png)

1. Close Preview mode by pressing Esc (or by selecting the close icon near the upper-left corner).

## Next steps

- [Save and publish](save-publish-app.md) your app.
- [Customize a card](customize-card.md) in your app.

---

## Customize a card in a canvas app

Source: [customize-card.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/customize-card)

*Change the default control that appears in a card on a Details or Edit form in a canvas app.*

# Customize a card in a canvas app

Perform basic customization (without unlocking a card) by, for example, changing its control. Perform advanced customization by unlocking the card and, for example, adding a control that isn't available for that card by default.

For an overview, see [Understand data cards](working-with-cards.md).

## Prerequisites

- Learn how to [add and configure controls](add-configure-controls.md).
- You can review this topic for general concepts only, or you can follow it step by step if you first complete the procedures in these topics:

    1. [Generate an app](data-platform-create-app.md).
    1. [Customize its gallery](customize-layout-sharepoint.md).
    1. [Customize its forms](customize-forms-sharepoint.md).

## Customize a locked card

In this procedure, you'll replace a **[Text-input](controls/control-text-input.md)** control with a **[Slider](controls/control-slider.md)** control without unlocking the card.

1. In the app that you generated and customized, select **EditForm1** in the left navigation bar, and then select **Edit fields** on the **Properties** tab of the right-hand pane.

1. In the list of fields, select the down arrow for **Number of Employees**, and then open the list under **Control type**.

    > [!div class="mx-imgBorder"]
    > ![Drop-down list of options for a number card.](./media/customize-card/card-selector.png)

1. Select **Edit Slider**.

    The screen reflects your change.

    > [!div class="mx-imgBorder"]
    > ![EditForm1 with slider control.](./media/customize-card/add-slider.png)

## Unlock and customize a card

In this procedure, you'll unlock a card and update the **Max** property of the **Slider** control that you just added.

1. In **EditForm1**, select the **Slider** control in the **Number of Employees** card.

    > [!div class="mx-imgBorder"]
    > ![Select the slider.](./media/customize-card/select-slider.png)

1. On the **Advanced** tab of the right-hand pane, select the lock icon to unlock the card.

    > [!div class="mx-imgBorder"]
    > ![Unlock card.](./media/customize-card/lock-icon.png)

1. Set the **Max** property of the **Slider** control to 10,000.

    > [!div class="mx-imgBorder"]
    > ![Max property on Advanced tab.](./media/customize-card/max-property.png)

    The **Slider** control shows a more accurate value.

    > [!div class="mx-imgBorder"]
    > ![Slider range: 0-10,000.](./media/customize-card/final-slider.png)

## Next steps

Now that you have a basic understanding of how to generate an app and customize a gallery, a form, and a card, you can [build your own app from scratch](data-platform-create-app-scratch.md).

---

## Building responsive canvas apps

Source: [build-responsive-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/build-responsive-apps)

*Learn about how to build responsive canvas apps.*

# Building responsive canvas apps  

Responsiveness refers to the ability of an app to automatically align to different screen sizes and form factors to use the available screen space sensibly, providing great UI and UX in every device, form factor, and screen size. 

Responsiveness allows different elements of the app to specify how they: 

- Stretch or resize with the screen size changes.

- Maintain or change positions with the screen size changes. 

## Why should you build responsive apps

End users can access your app from different devices such as phones, tablets, laptops, and desktops with large monitors, different screen sizes, and with varied number of pixels.

To ensure great user experience and usability of the app on each form factor and device, designing the app with responsive design principles is necessary. Even if the app is intended to be used only on the web browser or on mobile phones, user device screen sizes can be different, so designing the app with responsive principles is a good idea.

## Designing the app with responsiveness principles

Before you start designing the UI for your app, you need to consider the following aspects: 

- What form factors or devices do you want to support.

- How the app should look on each form factor?

- What elements of the app need to stretch or resize?

- Are the elements hidden on some form factors?

- Does the app behave different in some form factors?

Once all these requirements are gathered, you should start thinking about how these different UI layouts can be created in a single application with the responsive tools available in Power Apps. 

Before you start using the responsive layouts, you need to do the following:

1. Go to [Power Apps](https://make.powerapps.com).
1. Open the app where you want to use the responsive layout.
1. Go to **Settings** > **Display** to disable **Scale to fit**, **Lock aspect ratio**, and **Lock orientation** and select **Apply**.

   ![Settings disable lock orientation.](media/create-responsive-layout/settings-disable-lock-orientation.png "Settings disable lock orientation")

## Responsive layouts

The following responsive layouts can be created by adding a new screen and selecting the appropriate option from the **Layout** tab: 

> [!div class="mx-imgBorder"]
> ![Screen layouts.](media/create-responsive-layout/different-screen-layouts.png "Screen layouts")

> [!NOTE]
> The new responsive layouts are available to the apps formats but the new screen templates are available only for **Tablet** format.

### Split-screen

The Split-screen layout has two sections, each occupying 50% width of the screen on desktops. On mobile devices, the sections are placed one below the other, each occupying up the entire screen width. 

### Sidebar

The Sidebar layout has a fixed width sidebar on the left. The main body consists of a fixed height header, and the main section takes up the rest of the screen width.  By default, the template has the same behavior on mobile, however some customizations are recommended based on the UI pattern desired for the mobile experience. 

## Working with containers 

Containers are building blocks of all the responsive design. A container can be an [auto-layout container](#auto-layout-containers) in vertical or horizontal direction, or a fixed-layout container, which in the future will support constraints. 

Below are some tips for building your app’s UI with containers:

- Always create UI elements that form a UI table inside a container.

- Allows the container to have its own responsive properties and settings to specify how it is positioned or resized on different screen sizes.

- Allows you to change how its child components are laid out with respect to responsiveness. 

Choose one of two layout modes for a container: Manual layout or auto-layout (Horizontal or Vertical)

## Auto-layout containers

Two controls, [Horizontal container](controls/control-horizontal-container.md) and [Vertical container](controls/control-vertical-container.md) can be used to automatically lay out the child components. These containers determine the position of the child components so that you never have to set X, Y for a component inside the container. Also, it can distribute the available space to its child components based on the settings, as well as determines both the vertical and horizontal alignment of the child components.  

### When to use auto-layout containers

You can use auto-layout containers in the following scenarios:

- UI needs to be responsive to screen size or form factor changes.
- There is more than one child component that needs to resize or move around based on the screen size or form factor changes.
- When you need to stack items vertically or horizontally (regardless of their size).
- When you need to space items evenly on the screen.

### Example for auto-layout container

To build a responsive screen:

1. Create a [blank canvas app](create-blank-app.md) with **Tablet** layout.
1. Select **Settings** > **Display** and disable **Scale to fit**, **Lock aspect ratio**, and **Lock orientation** and select **Apply**. 
1. Now from the **Insert** panes in the left sidebar, under **Layout** tab, select **Horizontal container**. 

   > [!div class="mx-imgBorder"]
   > ![Insert containers.](media/create-responsive-layout/insert-containers.png "Insert containers")

1. The top-most container needs to be sized to take the entire space with these properties. It will be the same size as the screen as it resizes.  
   1. X = 0 
   1. Y= 0 
   1. Width = Parent.Width 
   1. Height = Parent. Height 

1. Now, from the **Insert** pane add two **Vertical containers** into the Horizontal container. 

   > [!div class="mx-imgBorder"]
   > ![Add vertical containers.](media/create-responsive-layout/add-two-vertical-containers.png "Add vertical containers")

1. To make the containers, fill the full vertical space, Select **Container1** and set the `Align (vertical)` property to `Stretch`.  

   > [!div class="mx-imgBorder"]
   > ![Align stretch.](media/create-responsive-layout/align-property-stretch.png "Align stretch")

1. To divide the screen between the content, use the `Fill portions` property on the two child containers. The left container will take up 1/4 of the screen space. 
   1. Select **Container2**. You'll see that the `Flexible width` property is turned on. Set the `Fill portions` to 1. 
   1. Select **Container3**. You'll see that the `Flexible width` property is turned on. Set the `Fill portions` to 3.  
1. Select **Container2**. Set the `Fill = RGBA(56, 96, 178, 1)` property in the formula bar. Set `Align (horizontal)` to `Stretch`.   
1. Add few buttons to create a menu. Rename the buttons as needed.  

   > [!div class="mx-imgBorder"]
   > ![Add buttons.](media/create-responsive-layout/add-buttons-to-container.png "Add buttons")

1. Select **Container3** and add a Horizontal container and turn off the `Flexible height` property. Set `Height` to 100. Set `Align (vertical)` to `Stretch`.  
1. Add some **Icons** into **Container4**. Change the icons to be different with the icon property.  

   > [!div class="mx-imgBorder"]
   > ![Add icons.](media/create-responsive-layout/add-icons-to-container.png "Add icons")

1. Select **Container4**. Set the `Justify (horizontal)` property to `End`. Set the `Align (vertical)` to `Center`. Set `Gap` to 40 to create space between the icons.  
1. Select **Container3**. Set `Align (horizontal)` to `Stretch`. Set `Vertical Overflow` to `Scroll`.  
1. Add different **Label**, **Inputs**, **Media**  until they extend beyond the container. Change the color of the rectangles to be different. You'll see a scroll bar to access the unseen content. 

   > [!div class="mx-imgBorder"]
   > ![Add different inputs.](media/create-responsive-layout/add-different-inputs-media-icons.png "Add different inputs")  

1. Select Preview or F5. Change the size of the browser window to see how your app adjusts to different screen sizes.

## Known issues

- Certain combinations of layout container properties are incompatible or can produce undesirable outputs, for example:
   - If the container’s `Wrap` property is enabled, the `Align` property setting is ignored on child controls. 
   - If the container’s `Wrap` property is disabled and the container’s primary-axis overflow is set to **Scroll** (Horizontal Overflow for Horizontal containers or Vertical Overflow for Vertical containers), it is recommended to set the `Justify` property to either **Start** or **Space Between**. 
   - The **Center** or **End** options can cause child controls inaccessible when the container is too small to display all the controls, even though the `Overflow` property is set to **Scroll**. 

- You can’t resize or reposition the controls on the canvas app because the drag & drop controls are disabled in the layout containers. Instead, use the layout container properties to achieve the desired size and positioning. Control ordering can be changed via the **Tree view**, or by using the arrow keys as shortcuts. 

- The **Data table**, **Charts**, and **Add Picture** controls are currently not supported in the layout containers. 

- Some of the layout containers properties are hidden for child controls. The hidden properties can still be accessible via the formula bar or from the advanced panel. However, these properties will be ignored even if they are set in these places. 

- When controls are moved into a layout container (for example, when copy or pasting the controls), they are inserted into the container by their order in the **Tree view**.

## See also

[Create responsive layouts](create-responsive-layout.md)

---

## Change screen size and orientation of canvas apps

Source: [set-aspect-ratio-portrait-landscape.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/set-aspect-ratio-portrait-landscape)

*Step-by-step instructions for changing settings such as the screen size and the orientation of a canvas app in Power Apps.*

# Change screen size and orientation of canvas apps

Customize a canvas app by changing its screen size and orientation.

## Change screen size and orientation

1. Sign in to [Power Apps](https://make.powerapps.com).
1. Open the app to [edit](edit-app.md).
1. Select **Settings**.
1. Select **Display**.
1. Under **Orientation** list, select **Portrait** or **Landscape**. <br> 

    ![Orientation for phone layout.](./media/set-aspect-ratio-portrait-landscape/phone-layout-orientation.png "Orientation for phone layout")

1. (Tablet apps only) Under **Aspect ratio**, perform either of these steps:

    - Select the ratio that matches the target device for this app.
    - Select **Custom** to set your own size, and then specify a width between 50 - 3840 and a height between 50 - 2160.

    ![Change the aspect ratio of a tablet app.](./media/set-aspect-ratio-portrait-landscape/aspect-tablet.png "Aspect ratio for a tablet")
    
    > [!NOTE]
    > **Size** is only available for apps with **Tablet** layout.

1. Under **Scale to fit**, specify either **On** or **Off**.

    ![Scale to fit.](./media/set-aspect-ratio-portrait-landscape/scale-to-fit.png "Scale to fit")

    This setting is on by default so that app screens resize to fit the available space on the device. When this setting is on, the app's **Width** property matches its **DesignWidth**, and the app's **Height** matches its **DesignHeight**.

    If you turn this setting off, the app adjusts to the aspect ratio of the device on which it's running and takes up all of the available space. The app doesn't scale and, as a result, screens can show more information.

    When this setting is turned off, **Lock aspect ratio** is automatically turned off and disabled. In addition, the **Width** property of all screens is set to `Max(App.Width, App.DesignWidth)`, and their **Height** property is set to `Max(App.Height, App.DesignHeight)` so that they track the dimensions of the window in which the app is running. With this change, you can create apps that respond to different devices and window dimensions. More information: [Create responsive layout](create-responsive-layout.md)

1. Under **Lock aspect ratio**, specify either **On** or **Off**.

    ![Lock aspect ratio.](./media/set-aspect-ratio-portrait-landscape/lock-aspect-ratio.png "Lock aspect ratio")

    If this setting is on, the app retains the screen orientation and aspect ratio that you specified in steps 2 and 3, no matter the device. For example, a phone app that's running in a web browser retains the ratio for a phone, showing a dark bar on each side instead of filling the window.

    If this setting is off, the app adjusts to the aspect ratio of the device on which it's running. We don't recommend this because the app can be distorted to the point of being unusable, depending on the screen size. For example, controls may overlap or text might be clipped.

    > [!NOTE]
    > This setting can't be turned off for certain controls such as **[Rich text editor](controls/control-richtexteditor.md)** and [Fluent UI controls](../../teams/use-the-fluent-ui-controls.md). They won't distort according to screen size. [Create a responsive layout](create-responsive-layout.md) to specify how these controls should adapt to different screen sizes.

1. Under **Lock orientation**, specify either **On** or **Off**.

    ![Lock orientation.](./media/set-aspect-ratio-portrait-landscape/lock-orientation.png "Lock orientation")

    If you lock the app's orientation, the app retains the orientation that you specify. If the app is running on a device for which the screen is in a different orientation, the app displays incorrectly and may show unwanted results. If you unlock the app's orientation, it adjusts to the screen orientation of the device on which it's running.

    You can also modify the app's orientation by enabling **Optimize embedding appearance** in **Settings** > **Display**. This feature top-left aligns the app when it's embedded and changes the background color of the hosting canvas to white.

    ![Embedding experience.](./media/set-aspect-ratio-portrait-landscape/embedding-experience.png "Embedding experience")

1. Close **Settings** dialog.

1. [Save and publish](save-publish-app.md) your app.
 
### Enumerated app behavior for scale to fit and lock aspect ratio settings

| Scenario | Scale to fit | Lock aspect ratio | App layout behavior on 'screen resize'                                                                                                                                                                                  | Notes to include in docs                                                                                                                                                           |
|----------|--------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1        | Enabled      | Enabled           | The screen width and height are set by the maker. The screen scales to the window size available.                                                                                                                       |                                                                                                                                                                                    |
| 2        | Disabled     | Enabled           | Not applicable. When scale to fit is disabled, lock aspect ratio is also disabled.                                                                                                                                      |                                                                                                                                                                                    |
| 3        | Enabled      | Disabled          | In Power Apps Studio, the screen scales to the window size available.     In the end-user experience, Power Apps scales to the smallest edge (width or height), and then fills the UI for the larger edge.  | For apps built for mobile, we recommend makers use **lock orientation** with this setting.                                                                               |
| 4        | Disabled     | Disabled          | App experiences can be responsive. Makers can manipulate control locations using Power Fx to set X and Y values as well as width and height.                                                                                                        | For more information, see [Responsive layout documentation](create-responsive-layout.md) and consider using auto-layout containers.       |

## Next steps

- [Create responsive layouts in canvas apps](create-responsive-layout.md).
- Check [common issues and resolutions](/troubleshoot/power-platform/power-apps/common-issues-and-resolutions) if you're running into any problems.




## Related information

[Change screen size and orientation of canvas apps (video)](https://youtu.be/dsow8q4LzA8?feature=shared)

---

## Create responsive layouts in canvas apps

Source: [create-responsive-layout.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-responsive-layout)

*Learn about configuring Height, Width, X, and Y properties of controls in canvas apps.*

# Create responsive layouts in canvas apps

Before you building a canvas app in Power Apps, specify whether to tailor the app for a phone or a tablet. This choice determines the size and shape of the canvas on which you build your app.

After you make that choice, you can make a few more choices if you select **Settings** > **Display**. You can choose portrait or landscape orientation and screen size (tablet only). You can also lock or unlock the aspect ratio and support device rotation (or not).

Those choices underlie every other choice you make as you design screen layouts. If your app runs on a device of a different size or on the web, your entire layout scales to fit the screen where the app is running. If an app designed for a phone runs in a large browser window, for example, the app scales to compensate and looks oversized for its space. The app can't take advantage of the additional pixels by showing more controls or more content.

If you create a responsive layout, controls can respond to different devices or window sizes, making various experiences feel more natural. To achieve a responsive layout, you adjust some settings and write expressions throughout your app. 

## Disable Scale to fit

You can configure each screen control so that its layout adapts to the actual space in which the app is running.

You activate responsiveness by turning off the app's **Scale to fit** setting, which is on by default. When you turn this setting off, you also turn off **Lock aspect ratio** because you're no longer designing for a specific screen shape. (You can still specify whether your app supports device rotation.)

![Disable Scale to Fit setting.](media/create-responsive-layout/scale-to-fit-off.png)

To make your app responsive, you must take additional steps, but this change is the first step toward making responsiveness possible.

## Understand app and device screen dimensions

To make your app's layouts respond to changes in the device screen, or web browser, dimensions, you'll write formulas that use the **Width** and **Height** properties of the screen. To show these properties, open an app in Power Apps Studio, and then select a screen control. The default formulas for these properties appear on the **Advanced** tab of the right-hand pane.

**Width** = `Max(App.Width, App.MinScreenWidth)`

**Height** = `Max(App.Height, App.MinScreenHeight)`

These formulas refer to the **Width**, **Height**, **MinScreenWidth**, and **MinScreenHeight** properties of the app. The app's **Width** and **Height** properties correspond to the dimensions of the device or browser window in which your app is running. If the user resizes the browser window (or rotates the device if you've turned off **Lock orientation**), the values of these properties change dynamically. The formulas in the screen control's **Width** and **Height** properties are reevaluated when these values change.

The values in the **App.Width** and **App.Height** properties come from the dimensions that you specify in the **Display** pane of **Settings**. For example, if you select the landscape "16:9 Default" size, **App.Width** is 1366, and **App.Height** is 768.

As they're used in the formulas for the screen control's **Width** and **Height** properties, **MinScreenWidth** and **MinScreenHeight** are the minimum dimensions for which you'll design the app. If the actual area available to your app is even smaller than these minimum dimensions, the formulas for the screen control's **Width** and **Height** properties ensure that their values won't become any smaller than minimums. In that case, the user must scroll to view all of the layout's content. The **MinScreenWidth** and **MinScreenHeight** properties can be set in the  **App Object** > **Properties** > **Advanced**.

After you establish your app's **MinScreenWidth** and **MinScreenHeight**, you won't (in most cases) need to change default formulas for each screen control's **Width** and **Height** properties. Later, this topic discusses cases in which you might want to customize these formulas.

## Use formulas for dynamic layout

To create a responsive design, you locate and size each control by using formulas instead of absolute (constant) coordinate values. These formulas express each control's position and size in terms of the overall screen size or relative to other controls in the current screen.

> [!IMPORTANT]
> After you write formulas for the **X**, **Y**, **Width** and **Height** properties of a control, your formulas will be overwritten with constant values if you subsequently drag the control in the canvas editor. When you start to use formulas to achieve dynamic layout, you should avoid dragging controls.

In the simplest case, one control fills an entire screen. To create this effect, set the control's properties to these values:

| Property      | Value            |
|--------|---------------|
| **X**      | `0`             |
| **Y**      | `0`             |
| **Width**  | `Parent.Width`  |
| **Height** | `Parent.Height` |

These formulas use the **Parent** operator. For any control placed directly on a screen, **Parent** refers to the screen. With these property values, the control appears in the upper-left corner of the screen (0, 0) and has the same **Width** and **Height** as the screen.

Later in this topic, you'll apply these principles (and the **Parent** operator) to position controls inside other containers, such as galleries, group controls, and components.

As an alternative, the control can fill only the top half of the screen. To create this effect, set the **Height** property to **Parent.Height** / 2, and leave the other formulas unchanged.

If you want a second control to fill the bottom half of the same screen, you can take at least two other approaches to constructing its formulas. For simplicity, you might take this approach:

| Control | Property | Formula           |
|-|----------|-------------------|
| **Upper** | **X**        | `0`                 |
| **Upper** | **Y**        | `0`                 |
| **Upper** | **Width**    | `Parent.Width`      |
| **Upper** | **Height**   | `Parent.Height / 2` |
| **Lower** | **X**        | `0`                 |
| **Lower** | **Y**        | `Parent.Height / 2` |
| **Lower** | **Width**    | `Parent.Width`      |
| **Lower** | **Height**   | `Parent.Height / 2` |

![Upper and Lower control.](media/create-responsive-layout/dynamic-layout.png)

This configuration would achieve the effect that you want, but you'd need to edit each formula if you changed your mind about the relative sizes of the controls. For example, you might decide that the top control should occupy only the top one-third of the screen, with the bottom control filling the lower two-thirds. 

To create that effect, you'd need to update the **Height** property of the **Upper** control and the **Y** and **Height** properties of the **Lower** control. Instead, consider writing the formulas for the **Lower** control in terms of the **Upper** control (and itself), as in this example:


| Control | Property | Formula           |
|-|----------|-------------------|
| **Upper** | **X**        | `0`                 |
| **Upper** | **Y**        | `0`                 |
| **Upper** | **Width**    | `Parent.Width`      |
| **Upper** | **Height**   | `Parent.Height / 3` |
| **Lower** | **X**        | `0`                       |
| **Lower** | **Y**        | `Upper.Y + Upper.Height`  |
| **Lower** | **Width**    | `Parent.Width`            |
| **Lower** | **Height**   | `Parent.Height - Lower.Y` |

![Upper and Lower controls relative sizing.](media/create-responsive-layout/dynamic-layout2.png)

With these formulas in place, you need only change the **Height** property of the **Upper** control to express a different fraction of the height of the screen. The **Lower** control automatically moves and resizes to account for the change.

You can use these formula patterns for expressing common layout relationships between a control, named **C**, and its parent or a sibling control, named **D**.

| Relationship between C and its parent | Property | Formula | Illustration |
|--|--|--|--|
| **C** fills width of parent, with a margin of *N* | **X**| `N` | ![Example of C filling width of parent.](media/create-responsive-layout/c1.png) |
|  | **Width** | `Parent.Width - (N * 2)` |  |
| **C** fills height of parent, with a margin of *N* | **Y** | `N` | ![Example of C filling height of parent.](media/create-responsive-layout/c2.png) |
|  | **Height** | `Parent.Height - (N * 2)` |  |
| **C** aligned with right edge of parent, with margin of *N* | **X** | `Parent.Width - (C.Width + N)` | ![Example of C aligning with right edge of parent.](media/create-responsive-layout/c3.png) |
| **C** aligned with bottom edge of parent, with margin of *N* | **Y** | `Parent.Height - (C.Height + N)` | ![Example of C aligning with bottom edge of parent.](media/create-responsive-layout/c4.png) |
| **C** centered horizontally on parent | **X** | `(Parent.Width - C.Width) / 2` | ![Example of C centered horizontally on parent.](media/create-responsive-layout/c5.png) |
| **C** centered vertically on parent | **Y** | `(Parent.Height - C.Height) / 2` | ![Example of C centered vertically on parent.](media/create-responsive-layout/c6.png) |

| Relationship between C and D | Property | Formula | Illustration |
|--|--|--|--|
| **C** horizontally aligned with **D** and the same width as **D** | **X** | `D.X` | ![Example of horizonal aligned pattern.](media/create-responsive-layout/d1.png) |
|  | **Width**    | `D.Width` |  |
| **C** vertically aligned with **D** and same height as **D**  | **Y** | `D.Y` | ![Example of vertical aligned pattern.](media/create-responsive-layout/d2.png) |
|  | **Height** | `D.Height` |  |
| Right edge of **C** aligned with right edge of **D** | **X** | `D.X + D.Width - C.Width` | ![Example of right edge aligned pattern.](media/create-responsive-layout/d3.png) |
| Bottom edge of **C** aligned with bottom edge of **D** | **Y** | `D.Y + D.Height - C.Height` | ![Example of bottom edge aligned pattern.](media/create-responsive-layout/d4.png) |
| **C** centered horizontally relative to **D** | **X** | `D.X + (D.Width - C.Width) / 2`  | ![Example of centered horizontally pattern.](media/create-responsive-layout/d5.png) |
| **C** centered vertically relative to **D** | **Y** | `D.Y + (D.Height - C.Height) /2` | ![Example of centered vertically pattern.](media/create-responsive-layout/d6.png) |
| **C** positioned to the right of **D** with a gap of N | **X** | `D.X + D.Width + N` | ![Example of positioned to the right pattern.](media/create-responsive-layout/d7.png) |
| **C** positioned below **D** with a gap of *N*             | **Y** | `D.Y + D.Height + N` | ![Example of positioned below pattern.](media/create-responsive-layout/d8.png) |
| **C** fills space between **D** and right edge of parent | **X** | `D.X + D.Width` | ![Example of filling space between D and right edge pattern.](media/create-responsive-layout/d9.png) |
|  | **Width** | `Parent.Width - C.X` |  |
| **C** fills space between **D** and bottom edge of parent | Y | `D.Y + D.Height` | ![Example of filling space between D and bottom of the edge pattern.](media/create-responsive-layout/d10.png) |
| | **Height** | ```Parent.Height - C.Y```

## Hierarchical layout

As you construct screens that contain more controls, it will become more convenient (or even necessary) to position controls relative to a parent control, rather than relative to the screen or a sibling control. By organizing your controls into a hierarchical structure, you can make your formulas easier to write and maintain.

### Galleries

If you use a gallery in your app, you'll need to lay out controls within the gallery's template. You can position these controls by writing formulas that use the **Parent** operator, which will refer to the gallery template. In the formulas on controls within a gallery template, use the **Parent.TemplateHeight** and **Parent.TemplateWidth** properties; don't use **Parent.Width** and **Parent.Height**, which refer to the overall size of the gallery.

![Vertical gallery showing Template Width and Height.](media/create-responsive-layout/gallery-vertical.png)

### Container control

You can use the **Layout container** control, as a parent control.

Consider the example of a header at the top of a screen. It's common to have a header with a title and several icons with which your users can interact. You can construct such a header using the **Container** control, containing a **Label** control and two **Icon** controls:

![Header example using a group.](media/create-responsive-layout/header-group.png)

Set the properties for these controls to these values:

| Property | Header | Menu | Close | Title |
|--|--|--|--|--|
| **X** | `0`  | `0` | `Parent.Width - Close.Width` | `Menu.X + Menu.Width` |
| **Y** | `0` | `0` | `0` | `0` |
| **Width**  | `Parent.Width` | `Parent.Height` | `Parent.Height` | `Close.X - Title.X` |
| **Height** | `64` | `Parent.Height` | `Parent.Height` | `Parent.Height` |

For the **Header** control, `Parent` refers to the screen. For the others, `Parent` refers to the **Header** control.

Having written these formulas, you can adjust the size or position of the **Header** control by changing the formulas for its properties. The sizes and positions of the child controls will automatically adjust accordingly.

## Auto-layout container controls

You can use an feature, the **Auto-layout** container controls to automatically lay out the child components. These containers determine the position of the child components so that you never have to set X, Y for a component inside the container. Also, it can distribute the available space to its child components based on the settings, as well as determines both the vertical and horizontal alignment of the child components. More information: [Auto-layout container controls](build-responsive-apps.md#auto-layout-containers)

### Components

If you use another feature, named Components, you can construct building blocks and reuse them throughout your app. As with the **Container** control, the controls that you place within a component should base their position and size formulas on `Parent.Width` and `Parent.Height`, which refer to the size of the component. More information: [Create a component](create-component.md).

## Adapting layout for device size and orientation

So far, you've learned how to use formulas to change each control's size in response to the available space, while keeping controls aligned relative to each other. But you might want or need to make more substantial layout changes in response to different device sizes and orientations. When a device is rotated from portrait to landscape orientation, for example, you might want to switch from a vertical layout to a horizontal one. On a larger device, you can present more content or rearrange it to provide a more appealing layout. On a smaller device, you might need to split up content across multiple screens.

### Device orientation

The default formulas for a screen's **Width** and **Height** properties, as this topic described earlier, won't necessarily provide a good experience if a user rotates a device. For example, an app designed for a phone in portrait orientation has a **DesignWidth** of 640 and a **DesignHeight** of 1136. The same app on a phone in landscape orientation will have these property values:

- The screen's **Width** property is set to `Max(App.Width, App.DesignWidth)`. The app's **Width** (1136) is larger than its **DesignWidth** (640), so the formula evaluates to 1136.
- The screen's **Height** property is set to `Max(App.Height, App.DesignHeight)`. The app's **Height** (640) is smaller than its **DesignHeight** (1136), so the formula evaluates to 1136.

With a screen **Height** of 1136 and a device height (in this orientation) of 640, the user must scroll the screen vertically to show all of its content, which might not be the experience that you want.

To adapt the screen's **Width** and **Height** properties to the device orientation, you can use these formulas:

**Width** = `Max(App.Width, If(App.Width < App.Height, App.DesignWidth, App.DesignHeight))`

**Height** = `Max(App.Height, If(App.Width < App.Height, App.DesignHeight, App.DesignWidth))`

These formulas swap the app's **DesignWidth** and **DesignHeight** values, based on whether the device's width is less than its height (portrait orientation) or more than its height (landscape orientation).

After you adjust the screen's **Width** and **Height** formulas, you might also want to rearrange controls within your screen to better use the available space. For example, if each of two controls occupies half of the screen, you might stack them vertically in portrait but arrange them side by side in landscape.

You can use the screen's **Orientation** property to determine whether the screen is oriented vertically or horizontally.

> [!NOTE]
> In landscape orientation, the **Upper** and **Lower** controls appear as left and right controls.

| Control | Property | Formula |
|--|----------|---|
| **Upper** | **X** | `0` |
| **Upper** | **Y** | `0` |
| **Upper** | **Width** | `If(Parent.Orientation = Layout.Vertical, Parent.Width, Parent.Width / 2)` |
| **Upper** | **Height**   | `If(Parent.Orientation = Layout.Vertical, Parent.Height / 2, Parent.Height)` |
| **Lower** | X | `If(Parent.Orientation = Layout.Vertical, 0, Upper.X + Upper.Width)`  |
| **Lower** | Y | `If(Parent.Orientation = Layout.Vertical, Upper.Y + Upper.Height, 0)` |
| **Lower** | **Width** | `Parent.Width - Lower.X` |
| **Lower** | **Height** | `Parent.Height - Lower.Y` |

![expressions to adapt a portrait orientation.](media/create-responsive-layout/portrait.png)

![expressions to adapt a landscape orientation.](media/create-responsive-layout/landscape.png)

### Screen sizes and breakpoints

You can adjust your layout based on the size of the device. The screen's **Size** property classifies the current device size. The size is a positive integer; the ScreenSize type provides named constants to help with readability. This table lists the constants:

| Constant              | Value | Typical device type (using default app settings) |
|-----------------------|-------|--------------------------------------------------|
| ScreenSize.Small      | 1     | Phone                                            |
| ScreenSize.Medium     | 2     | Tablet, held vertically                          |
| ScreenSize.Large      | 3     | Tablet, held horizontally                        |
| ScreenSize.ExtraLarge | 4     | Desktop computer                                 |

Use these sizes to make decisions about your app's layout. For example, if you want a control to be hidden on a phone-sized device but visible otherwise, you could set the control's **Visible** property to this formula:

```power-fx
Parent.Size >= ScreenSize.Medium
```

This formula evaluates to **true** when the size is medium or larger and **false** otherwise.

If you want a control to occupy a different fraction of the screen width based on the screen size, set the control's **Width** property to this formula:

```power-fx
Parent.Width *
Switch(
    Parent.Size,
    ScreenSize.Small, 0.5,
    ScreenSize.Medium, 0.3,
    0.25
)
```
This formula sets the control's width to half of the screen width on a small screen, three-tenths of the screen width on a medium screen, and a quarter of the screen width on all other screens.

## Custom breakpoints

The screen's **Size** property is calculated by comparing the screen's **Width** property to the values in the app's **SizeBreakpoints** property. This property is a single-column table of numbers that indicate the width breakpoints that separate the named screen sizes:

In an app created for tablet or web, the default value in the app's **SizeBreakpoints** property are **[600, 900, 1200]**. In an app created for phones, the value is **[1200, 1800, 2400]**. (The values for phone apps are doubled because such apps use coordinates that are effectively double the coordinates used in other apps.)

![default values of App.SizeBreakpoints property.](media/create-responsive-layout/default-breakpoints.png)

You can customize your app's breakpoints by changing the values in the app's **SizeBreakpoints** property. Select **App** in the tree view, select **SizeBreakpoints** in the property list, and then edit the values in the formula bar. You can create as many breakpoints as your app needs, but only sizes 1 through 4 correspond to named screen sizes. In formulas, you can refer to sizes beyond ExtraLarge by their numeric values (5, 6, and so forth).

You can also specify fewer breakpoints. For example, your app might need only three sizes (two breakpoints), so the possible screen sizes will be Small, Medium, and Large.

## Known limitations

The authoring canvas doesn't respond to the sizing formulas created. To test responsive behavior, save and publish your app, and then open it on devices or in browser windows of various sizes and orientations.

If you write expressions or formulas in the **X**, **Y**, **Width**, and **Height** properties of a control, you'll overwrite those expressions or formulas if you later drag the control to a different location or resize the control by dragging its border.

---

## Get started with formulas in canvas apps

Source: [working-with-formulas.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-formulas)

*Learn how to use Power Fx formulas to customize a canvas app, calculate values, respond to user input, and control app behavior.*

# Get started with formulas in canvas apps

Configure your canvas app with formulas that not only calculate values and perform other tasks (as they do in Excel) but also respond to user input (as an app requires).

- In Excel, you build formulas that populate cells and create tables and charts.
- In Power Apps, you build similar formulas as you configure controls instead of cells. In addition, you build formulas that apply specifically to apps instead of spreadsheets.

Power Apps uses **Power Fx**, an open-source, low-code formula language based on Excel that you can use to express logic, data manipulation, and app behavior.

For example, you build a formula to determine how your app responds when users select a button, adjust a slider, or provide other input. These formulas might show a different screen, update a data source that's external to the app, or create a table that contains a subset of the data in an existing table.

You can use formulas for a wide variety of scenarios. For example, you can use your device's GPS, a map control, and a formula that uses **Location.Latitude** and **Location.Longitude** to display your current location. As you move, the map automatically tracks your location.

This article provides an overview of working with formulas. Browse the [formula reference](formula-reference.md) for more details and the complete list of functions, operators, and other building blocks you can use.

## Prerequisites

1. [Sign up](../signup-for-powerapps.md) for Power Apps and [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) with your credentials.
1. Learn how to [configure a control](add-configure-controls.md) in Power Apps.
  
## Use Power Fx formula bar

The Power Fx formula bar at the top of Power Apps Studio is where you write and edit formulas for your app. It provides IntelliSense - autocomplete suggestions, syntax highlighting, and inline error messages - to help you build formulas faster and with fewer mistakes.

1. Open your app for editing in Power Apps Studio.
1. Select any control or screen in the canvas.
1. In the property drop-down on the left side of the formula bar, select the property you want to set a formula for (for example, **Text** or **OnSelect**).
1. Select the formula bar and start typing your formula. As you type, IntelliSense shows suggestions for functions and properties that match your input.
1. Select a suggestion or continue typing until your formula is complete.

> [!TIP]
> Use [Copilot formula suggestions](ai-formulas-formulabar.md) to generate or explain formulas using natural language. In the formula bar, select the Copilot icon (when available) and describe what you want the formula to do.

## Show a value

In Excel, you enter a specific piece of data, such as the number **42** or the phrase **Hello World**, by typing it into a cell. That cell shows the data exactly as you type it. In Power Apps, you can similarly specify a piece of data that doesn't change by setting the **[Text](controls/properties-core.md)** property of a label to the exact sequence of characters that you want, surrounded by double quotation marks.

1. Create a [blank canvas app](create-blank-app.md).

    The formula bar sits at the top of the screen.

    :::image type="content" source="media/working-with-formulas/formula-bar.png" alt-text="Formula bar." lightbox="media/working-with-formulas/formula-bar.png" :::

    1. *Property list*: Each control and screen has a [set of properties](reference-properties.md). Use this list to select a specific property.  
    1. *Formula*: The formula to be calculated for this property, made up of [values, operators, and functions](formula-reference.md). As you type, IntelliSense helps you with recommendations for formula, syntax, and errors.
    1. *Selected control*: In the formula bar, you can see and edit properties for the selected control or for the screen if no controls are selected.

1. Add a **[Text](controls/control-text-box.md)** control to the screen.

    When you add a text label, the property list automatically shows the **[Text](controls/properties-core.md)** property, which drives what the control shows. By default, the value of this property is **"Text"**.  

1. Set the value of the **[Text](controls/properties-core.md)** property to **"Hello World"** by typing that string, surrounded by double quotes, into the formula bar:

    :::image type="content" source="media/working-with-formulas/label-hello-world.png" alt-text="Using the label Hello World." lightbox="media/working-with-formulas/label-hello-world.png":::

    The label reflects this new value as you type it. The screen might show yellow exclamation-point icons while you type. These icons indicate errors, but they go away when you finish entering a valid value. For example, a string without double quotation marks on both ends isn't valid.

    In Excel, you can show a number, such as **42**, by typing it into a cell or by typing a formula that resolves to that number, such as **=SUM(30,12)**. In Power Apps, you can achieve the same effect by setting the **Text** property of a control, such as a label, to **42** or **Sum(30,12)**. The cell and the label show that number regardless of what else changes in the worksheet or the app.

    > [!NOTE]
    > In Power Apps, you don't precede a formula with an equals sign or a plus sign as you do in Excel. The formula bar treats anything you type there as a formula by default. You also don't surround a formula with double quotation marks ("), as you did earlier to specify a string of text.

1. In the **[Text](controls/properties-core.md)** property of the label, replace **"Hello World"** with **Sum(1,2,3)**.

   While you type, the formula bar helps you by showing the description and the expected arguments for this function. As with the final double quotation mark in **"Hello World"**, the screen shows a red cross, showing an error, until you type the final parenthesis of this formula.

    :::image type="content" source="media/working-with-formulas/label-sum-partial.png" alt-text="Using the label - typing the partial function without a closing parenthesis shows errors." lightbox="media/working-with-formulas/label-sum-partial.png":::

    Completed formula with the final parenthesis added:

    :::image type="content" source="media/working-with-formulas/label-sum.png" alt-text="Using the complete formula Sum(1,2,3)." lightbox="media/working-with-formulas/label-sum.png":::

## Change a value based on input

In Excel, you type **=A1+A2** into a cell to show the sum of whatever values cells **A1** and **A2** contain. If either or both of those values change, the cell that contains the formula automatically shows the updated result.

:::image type="content" source="./media/working-with-formulas/excel-recalc.gif" alt-text="Animation of Excel recalculating the sum of two numbers.":::

In Power Apps, you can achieve a similar result by adding controls to a screen and setting their properties. This example shows a text label named **Text1** and two **[Text input](controls/control-text-input.md)** controls, named **TextInput1** and **TextInput2**. Add a formula to the **Text1** control so that when you enter a number into **TextInput1** and **TextInput2**, the values are added together and displayed in **Text1**.

:::image type="content" source="./media/working-with-formulas/recalc1.png" alt-text="Screenshot of Power Apps recalculating the sum of two numbers." lightbox="./media/working-with-formulas/recalc1.png":::

Regardless of what numbers you type in the text-input controls, the text label always shows the sum of those numbers because its **[Text](controls/properties-core.md)** property is set to this formula: `TextInput1.Text + TextInput2.Text`.

In Excel, you can use conditional-formatting formulas to show, for example, negative values in red. In Power Apps, you can use formulas to determine not only the primary value of a control but also properties such as color.

In this example, a formula for the **[Color](controls/properties-color-border.md)** property of the label automatically shows negative values in red. The **[If](functions/function-if.md)** function should look familiar from Excel:

`If( Value(Label1.Text) < 0, Color.Red, Color.Black )`

:::image type="content" source="./media/working-with-formulas/recalc-color.png" alt-text="Animation of conditional formatting." lightbox="media/working-with-formulas/recalc-color.png":::

## Change a color based on user input

You can configure your app with formulas so that users can change your app's appearance or behavior. For example, you can create a filter to show only data that contains a string of text that the user specifies, or let users sort a set of data based on a certain column.

In this example, let users change the background color of the screen by adjusting sliders.

1. Remove the controls from the previous procedures, or create a blank app as you did previously, and add three slider controls to it. Search for **Slider** in the search box of the **Insert** pane, and then select **Slider** to add a slider to the canvas. Repeat to add three sliders.

    :::image type="content" source="media/working-with-formulas/insert-slider.png" alt-text="Insert a slider control." lightbox="media/working-with-formulas/insert-slider.png":::

1. Arrange the sliders so they don't overlap, add three labels, and configure the labels to show **Red**, **Green**, and **Blue** text.

1. Set the **Max** property of each slider to **255** (the default is 100), which is the maximum value of a color component for the **[RGBA](functions/function-colors.md)** function.

   :::image type="content" source="media/working-with-formulas/three-sliders.png" alt-text="Screenshot that shows the sliders and labels arrangement, including the Max property set to 255." lightbox="media/working-with-formulas/three-sliders.png":::

1. Select the screen to deselect any control, and then set the screen's **[Fill](controls/properties-color-border.md)** property to this formula: **RGBA( Slider1.Value, Slider2.Value, Slider3.Value, 1 )**. Your screen turns dark gray, reflecting the sliders' current positions.

    In the formula, you can access control properties by using the [property selector](/power-platform/power-fx/reference/operators). For example, **Slider1.Value** refers to the slider's **[Value](controls/properties-core.md)** property, which represents where the user placed the slider between the **Min** and **Max** values.

1. Select **Preview** (F5) and adjust the sliders to see how each one changes the background color of the screen.

    :::image type="content" source="media/working-with-formulas/three-sliders-partial-rgba.png" alt-text="Screenshot that shows the color of the screen when you adjust the sliders.":::

    As each slider changes, the **[RGBA](functions/function-colors.md)** formula recalculates and the screen color updates immediately.

## Manage app behavior

Use formulas not only to perform calculations and change appearance but also to take action. For example, set the **[OnSelect](controls/properties-core.md)** property of a button to a formula that includes the **[Navigate](functions/function-navigate.md)** function. When a user selects that button, the screen that you specify in the formula appears.

Use some functions, such as **[Navigate](functions/function-navigate.md)** and **[Collect](functions/function-clear-collect-clearcollect.md)**, only in behavior formulas. Behavior formulas are the formulas on **On...** properties, such as **OnSelect**, **OnVisible**, **OnHidden**, and **OnStart**. If you put one of these functions in a property that expects a value&mdash;such as **Text**, **Visible**, or **Fill**&mdash;the formula is flagged as an error, because that property expects a value (for example, a Boolean for **Visible**) rather than an action. The [formula reference](formula-reference.md) calls out if a function can only be used in this context. For the full rules and the list of state-changing functions, see [Working with formulas in depth](working-with-formulas-in-depth.md).

Take more than one action in a behavior formula by separating functions with a semicolon (;). For example, you might update a context variable, push data to a data source, and then navigate to another screen&mdash;all in a single **OnSelect** formula.

> [!TIP]
> If you're not sure which function to use for a behavior, try describing the action in plain language to [Copilot in the formula bar](ai-formulas-formulabar.md). For example, type "navigate to Screen2 and collect the form data" and Copilot suggests the appropriate formula.

## View a list of properties by category

The properties list shows properties alphabetically, but you can also view all the properties of a control organized by category. Select a control—for example, **Text1**—and then select the **Advanced** tab in the **Properties** pane to see a full categorized list of properties for that control.

:::image type="content" source="media/working-with-formulas/advanced-open.png" alt-text="Advanced view." lightbox="media/working-with-formulas/advanced-open.png":::

You can edit formulas directly within this view. Use the property search box to quickly find and change a property's behavior or appearance.

## Formula syntax

As you type a formula in the formula bar, different syntax elements appear in different colors to improve readability and help you understand long formulas. Here's the color code list in Power Apps.

:::image type="content" source="./media/working-with-formulas/syntax-highlighting.png" alt-text="Screenshot that shows a table list of syntax highlighting.":::



### Related information

- [Use Find and Replace in the formula bar](formula-bar-find-replace.md)
- [Use Copilot to generate formulas](ai-formulas-formulabar.md)
- [Power Fx formula reference for canvas apps](formula-reference.md)
- [Working with formulas in depth](working-with-formulas-in-depth.md)

---

## Automate your business processes with agent builder in a canvas app

Source: [agent-builder.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/agent-builder)

*How to create an agent to help automate business processes in a canvas app using agent builder.*

# Build an AI agent to automate your business process


Agent builder in Power Apps lets organizations transition into the AI-first era by using the knowledge, logic, and actions of an app to create copilot agents. These agents handle daily tasks, streamline processes, enhance productivity, and improve overall business efficiency.


 Makers can create agents that automate processes within their existing canvas apps. Agent builder uses the app's metadata and the desired agent goal to generate a comprehensive step-by-step process, extract knowledge, and identify triggers. This process, knowledge, and triggers are then combined with extracted skills from the app, resulting in a fully equipped copilot that offers detailed instructions, knowledge, triggers, and actions.

After creating the agent, makers can edit, test, and publish it in Microsoft Copilot Studio.

## Prerequisites
- Your tenant administrator must turn on the [Publish Copilots with AI features](/microsoft-copilot-studio/security-and-governance) setting in the Power Platform admin center.
- Include a Dataverse database in your environment. More information: [Add a Microsoft Dataverse database](/power-platform/admin/create-database).
- Ensure that block unmanaged customizations is disabled. Learn more in [Block unmanaged customizations in Dataverse environments](/power-platform/alm/block-unmanaged-customizations).
- Current environment has Microsoft Copilot Studio solution version 2.0.0.649.1 or higher.

## Create an agent

To streamline your manual process, generate an agent that replicates the steps you typically follow to complete tasks.

1. Sign in to [Power Apps](https://make.powerapps.com).
1. Select **Agents** in the left navigation pane. If you don't see **Agents**, select **More**, and then find and select **Agents**. 
1. Select **Create an agent from an app**.
    :::image type="content" source="media/agent-builder/ab-create-agent-from-app-new-menu.png" alt-text="Screenshot of creating an agent from an app":::

1. Select your app and then select **Next** on the command bar.
:::image type="content" source="media/agent-builder/ab-select-app-then-next.png" alt-text="Select an app and then select next":::

    Alternatively, you can select **Apps** in the left navigation pane. Select your app, and then select **Create agent from app** on the command bar. You can also select **Commands** (![Commands button.](media/power-apps-page-icons/apps-commands-menu-to-edit.png)) for the app and then select **Create agent from app**.


1. Select a suggestion, or in the text box, describe the process you want to automate, and then select **Next**.

    :::image type="content" source="media/agent-builder/ab-suggestions-1.png" alt-text="Select a suggestion or describe the process you want to automate":::

1. When you select a suggestion, the text box is automatically filled. You can edit it and add more details about what you want the agent to do. To improve the agent's accuracy, use simple, everyday language, and be specific, like:

   - Review pending vacation requests and update their status based on predefined approval criteria.
   - Generate and dispatch notification messages to employees regarding the status of their vacation requests.

1. Based on the suggestion or the information that you provide for the agent's goal and the app's metadata, agent builder generates step-by-step instructions to replace your manual process and extracts triggers and knowledge. Review the instructions for accuracy, and make any necessary edits. Then review the extracted knowledge and triggers for accuracy, and make any necessary edits. When you're done, select **Create**.

### Regenerate instructions to improve the response

You can also revise the description to better represent the process you want to automate. When you're done, select the **Regenerate instructions** to receive updated instructions that match the new goal of the agent.

:::image type="content" source="media/agent-builder/ab-regenerate-instructions.png" alt-text="Regenerate instructions to improve response":::

### Best practices

When you edit the instructions, follow these suggestions:

- Use clear and specific wording in the instructions. For example, "Filter the claims data using the approval status" rather than "Filter the data."

- Verify the instructions to ensure they meet their goal.

- Keep each of the sentences for the instructions relatively simple. If there are too many details and conditions in one of the sentences, it might not work as intended.

- Ensure the logical flow of the instructions is easy to follow. Avoid adding new instructions at the end of the instruction set. Instead, move instructions in line to maintain a logical sequence. 
  
  Here are example instructions:

    1. Read the data from the table.

    2. Process the data with pending status.

    3. If amount is less than $50 auto approve it and mark it as approved.

    4. Update the table with new status.

    5. And if the amount is more than $50 but less than $500 check to see if it's an approved item.

    6. Additionally if the amount is more than $500 update the status to manual review.

    To improve the logical flow in this example, move steps 5 and 6 after step 3.

## Limitations

- If a data source connection isn't found, you can't extract actions for the app. In such cases, the agent builder generates an agent with the actions that can be converted, or none if no actions can be converted.

- Deprecated Excel connectors aren't supported. However, the following Excel connectors are supported:

  - [Excel Online (Business)](connections/connection-excel.md)
  - [Excel Online](connections/connection-excel.md)

- Agent builder is available only in regions where Microsoft Copilot Studio generative agents are available.
- This feature is available only for canvas apps.

## Provide feedback

Unless feedback is disabled by your admin, each step in the agent builder includes a **Like** (thumbs up) and **Dislike** button (thumbs down).

After reviewing the agent's responses, you can provide feedback in your own words. When you're done, select **Submit**.

## Related information

[FAQ for agent builder in canvas apps](../common/faq-agent-builder.md)

---

## Use Copilot to create and edit Power Fx formulas in Power Apps

Source: [ai-formulas-formulabar.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-formulas-formulabar)

*Learn how to use Copilot, an AI feature in Power Apps, to create and edit Power Fx formulas in the formula bar from natural language or code comments.*

# Use Copilot to create and edit Power Fx formulas

Copilot is an AI feature in Power Apps Studio that helps you create and change Power Fx formulas quickly. Use Copilot in the formula bar to explain Power Fx formulas in everyday language or generate Power Fx formulas from natural language or code comments.

## Prerequisites

An admin must enable Copilot for your environment and tenant. For more information, see [Copilot in Power Apps overview](ai-overview.md).

## Explain a formula

Use Copilot in the formula bar to learn what a formula does in plain language.

1. Select a control and its property. For example, select a label control with its **Text** property.

1. On the formula bar, select the dropdown near the **fx** field label, and then select **Explain this formula**.

   :::image type="content" source="media/copilot/ufb-copilot-dropdown.png" alt-text="Screenshot of the Copilot functionality menu showing the Explain this formula item.":::

   Alternatively, select part of a formula, select the dropdown near the **fx** field label, and then select **Explain this selection** to explain only that part.

   :::image type="content" source="media/copilot/copilot-explain-section.png" alt-text="Screenshot of Copilot's option to Explain this section, showing part of the formula highlighted by the user." lightbox="media/copilot/copilot-explain-section.png":::

    Copilot gives you an explanation of the formula that you can copy and insert as a code comment, or share with other makers working on the same app. When Copilot explains a selection, it can add context if that's important for the explanation.

    :::image type="content" source="media/copilot/copilot-explanation.png" alt-text="Screenshot of Copilot's explanation of a formula.":::

### Known limitations of explaining formulas

- The maximum length for a formula explanation is 5,000 characters. If the formula is longer, use a partial explanation to make sure it works.
- Copilot recognizes only default properties in Power Apps.
- Copilot doesn't recognize user-defined functions.

> [!NOTE]
> AI-generated content can be inaccurate, so check it for accuracy.

## Generate formulas from code comments

Copilot can generate Power Fx formulas from code comments in the formula bar. You can accept the suggestion or type the formula yourself. Formula code comments can also serve as documentation for your formulas, just like regular code comments.

1. With your canvas app open for editing, type a code comment using `//` or `/*` in the formula bar.

    :::image type="content" source="media/copilot/ufb-comment-copilot.png" alt-text="Screenshot of a comment typed in the Copilot formula bar." lightbox="media/copilot/ufb-comment-copilot.png":::

    Wait a few seconds for Copilot to generate a formula suggestion or press `Enter` to generate it immediately.

1. Press `Tab` on the keyboard to accept and use the suggested formula. You can also type through the suggestion.

    :::image type="content" source="media/copilot/ufb-commentfx-copilot.png" alt-text="Screenshot of a comment with a suggested formula." lightbox="media/copilot/ufb-commentfx-copilot.png":::

The suggestion remains until you select elsewhere or type a character that doesn't match the suggestion.

You can keep the comments used for generating Power Fx formulas in the formula bar as documentation, similar to traditional code comments.

> [!NOTE]
>
> - If Copilot doesn't provide a suggestion, then it couldn't generate a formula based on your comment. Try rephrasing the comment.
> - We recommend enclosing in quotes the elements that you want to include in your formula, such as `"Button1.text"`.

### Known limitations of generating formulas from code comments

- Copilot works on a singular control and property, and it doesn't make changes to other controls or properties to achieve the desired outcome.
- Copilot doesn't take existing formula text into account.
- Copilot only recognizes default properties in Power Apps.
- Copilot doesn't recognize user-defined functions.
- Code comments only work with general Power Fx functions, and not Power Apps-specific functions such as `Navigate()`.
- The advanced panel doesn't trigger suggestions.
- Existing formulas for the property aren't included in the suggestion.

## Create a formula (preview)

[This section is prerelease documentation and is subject to change.]

From the Copilot dropdown menu in the formula bar, you can now generate a formula by using natural language to make a discrete request.

> [!NOTE]
> The **Copilot for formulas** feature is on by default. To turn it off, open your app, go to **Settings** > **Updates** > **Preview**, and find the **Copilot for formulas** toggle. If you turn off the setting, the **Create a formula (preview)** menu option disappears from the Copilot dropdown menu in the formula bar.

### Use Copilot to create a formula from a discrete request

1. Select a control, like a **Text label**, and its corresponding property, such as **Text**.

1. On the formula bar, select the **Copilot functionality menu** > **Create a formula**.

    :::image type="content" source="media/copilot/ufb-create-input.png" alt-text="Screenshot of the Create a Formula functionality showing a sample input." lightbox="media/copilot/ufb-create-input.png":::
1. In the Copilot text box, type your request, such as *show today's day of the week*.
1. Select the **Create** arrow to submit your request.
1. Copilot attempts to create a formula. Select **Apply** to insert the formula in the same position as the Copilot interface, or update and resubmit your request.

    :::image type="content" source="media/copilot/ufb-create-formula.png" alt-text="Screenshot of the Create a Formula functionality showing recommended formula." lightbox="media/copilot/ufb-create-formula.png":::

    You see the result after you apply the formula.

    :::image type="content" source="media/copilot/copilot-request-result.png" alt-text="Screenshot that shows the day of the week in a text label.":::

  > [!NOTE]
  > The same limitations apply for creating formulas from a discrete request as [generating formulas from code comments](ai-formulas-formulabar.md#known-limitations-of-generating-formulas-from-code-comments).

## Responsible AI

Understand the choices you have when working with AI. Learn more in [FAQ about using AI responsibly in Power Apps](../common/responsible-ai-overview.md). Review the [Power Fx Copilot FAQ](../common/faqs-copilot-powerfx.md) for questions about this feature specifically.

## Language support

The following table lists the languages available for the formula bar copilot features. The list is based on the settings in your Power Platform environment and browser.

| **Name** | **Language Code** | **Functionality Supported** |
|----------|-------------------|-----------------------------|
| English | en-US | Explain a formula, Comment generated formulas, Create a formula|
| Chinese (simplified) - China | zh-Hans | Explain a formula, Comment generated formulas |
| Czech - Czech Republic | cs-CZ | Explain a formula, Comment generated formulas |
| Danish - Denmark | da-DK | Explain a formula, Comment generated formulas |
| Dutch - Netherlands | nl-NL | Explain a formula, Comment generated formulas |
| Finnish - Finland | fi-FI | Explain a formula, Comment generated formulas |
| French - France | fr-FR | Explain a formula, Comment generated formulas |
| German - Germany | de-DE | Explain a formula, Comment generated formulas |
| Greek - Greece | el-GR | Explain a formula, Comment generated formulas |
| Italian - Italy | it-IT | Explain a formula, Comment generated formulas |
| Japanese - Japan | ja-JP | Explain a formula, Comment generated formulas |
| Korean - Korea | ko-KR | Explain a formula, Comment generated formulas |
| Norwegian (Bokmål) - Norway | nb-NO | Explain a formula, Comment generated formulas |
| Polish - Poland | pl-PL | Explain a formula, Comment generated formulas |
| Portuguese - Brazil | pt-BR | Explain a formula, Comment generated formulas |
| Russian - Russia | ru-RU | Explain a formula, Comment generated formulas |
| Spanish (Traditional Sort) - Spain | es-ES | Explain a formula, Comment generated formulas |
| Swedish - Sweden | sv-SE | Explain a formula, Comment generated formulas |
| Thai - Thailand | th-TH | Explain a formula, Comment generated formulas |
| Turkish - Türkiye | tr-TR | Explain a formula, Comment generated formulas |



## Related information

[Copilot comment generated formulas (video)](https://youtu.be/kV60VZoPoWw?feature=shared)

---

## Understand variables in canvas apps

Source: [working-with-variables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-variables)

*Reference information about working with state, context variables, and collections in canvas apps.*

# Understand variables in canvas apps

If you've used another programming tool, like Visual Basic or JavaScript, you might ask: **Where are the variables?** Power Apps works differently and needs a different approach. Instead of reaching for a variable when you build a canvas app, ask yourself: **What would I do in Excel?**

In other tools, you might explicitly perform a calculation and store the result in a variable. But Power Apps and Excel automatically recalculate formulas as the input data changes, so you usually don't need to create or update variables. By using this approach, you more easily create, understand, and maintain your app.

Sometimes, you need to use variables in Power Apps, which extends Excel's model by adding [behavior formulas](working-with-formulas-in-depth.md). These formulas run when, for example, a user selects a button. Within a behavior formula, it's often helpful to set a variable for use in other formulas.

In general, avoid using variables. But sometimes only a variable lets you create the experience you want. Variables are implicitly created and typed when they appear in functions that set their values. 

## Translate Excel into Power Apps

### Excel

Let's review how Excel works. A cell can have a value, like a number or a string, or a formula that's based on the values of other cells. When you enter a different value into a cell, Excel automatically recalculates any formulas that depend on the new value. You don't need to do any programming to enable this behavior.

In the following example, cell **A3** uses the formula **A1+A2**. If **A1** or **A2** changes, **A3** automatically recalculates to show the change. This behavior doesn't require any coding outside of the formula itself.

![Animation of recalculating the sum of two numbers in Excel.](media/working-with-variables/excel-recalc.gif)

Excel doesn't have variables. The value of a cell with a formula changes based on its input, but there's no way to remember the result of a formula and store it in a cell or anywhere else. If you change a cell's value, the entire spreadsheet can change, and any previously calculated values are lost. You can copy and paste cells, but that's manual and isn't possible with formulas.

### Power Apps

Apps you create in Power Apps work a lot like Excel. Instead of updating cells, you add controls anywhere on a screen and name them for use in formulas.

For example, you can copy the Excel behavior in an app by adding a **[Label](controls/control-text-box.md)** control named **Label1**, and two **[Text input](controls/control-text-input.md)** controls named **TextInput1** and **TextInput2**. If you set the **[Text](controls/properties-core.md)** property of **Label1** to **TextInput1 + TextInput2**, it always shows the sum of the numbers in **TextInput1** and **TextInput2** automatically.

![Calculating the sum of two numbers in Power Apps.](media/working-with-variables/recalc1.png)

Notice that the **Label1** control is selected, showing its **[Text](controls/properties-core.md)** formula in the formula bar at the top of the screen. The formula **TextInput1 + TextInput2** creates a dependency between these controls, just like dependencies between cells in an Excel workbook. Let's change the value of **TextInput1**:

![Animation of calculating the sum of two numbers in Power Apps.](media/working-with-variables/recalc2.gif)

The formula for **Label1** automatically recalculates and shows the new value.

In Power Apps, you use formulas to set not only the main value of a control but also properties like formatting. In the next example, a formula for the **[Color](controls/properties-color-border.md)** property of the label automatically shows negative values in red. The **[If](functions/function-if.md)** function looks familiar from Excel:

`If( Value(Label1.Text) < 0, Red, Black )`

![Animation of conditional formatting.](media/working-with-variables/recalc-color.gif)

You use formulas for many scenarios:

* When your device's GPS is on, a map control shows your current location with a formula that uses **Location.Latitude** and **Location.Longitude**. As you move, the map automatically tracks your location.
* Other users update [data sources](working-with-data-sources.md). For example, others on your team might update items in a list. When you refresh a data source, any dependent formulas automatically recalculate to show the updated data. For example, you might set a gallery's **[Items](controls/properties-core.md)** property to the formula **Filter( SharePointList )**, which automatically shows the newly filtered set of [records](working-with-tables.md#records).

### Benefits

Using formulas to build apps has many advantages:

* If you know Excel, you know Power Apps. The model and formula language are the same.
* If you've used other programming tools, think about how much code you'd need to do these examples. In Visual Basic, you'd write an event handler for the change event on each text-input control. The code to do the calculation in each is redundant and can get out of sync, or you'd need to write a common subroutine. In Power Apps, you do all of that with a single, one-line formula.
* To see where **Label1**'s text comes from, you know exactly where to look: the formula in the **[Text](controls/properties-core.md)** property. There's no other way to change the text of this control. In a traditional programming tool, any event handler or subroutine can change the value of the label, from anywhere in the program. This makes it hard to track down when and where a variable changed.
* If you change a slider control and then change your mind, you can change the slider back to its original value. It's as if nothing ever changed: the app shows the same control values as before. There are no consequences for experimenting and asking "what if," just like in Excel.  

In general, if you can do something with a formula, you're better off. Let the formula engine in Power Apps work for you.  

## Know when to use variables

Let's change our simple adder to act like an old-fashioned adding machine with a running total. When you select the **Add** button, you add a number to the running total. When you select the **Clear** button, you reset the running total to zero.

| Display | Description |
|----|----|
|  ![App with a Text input control, a label, and two buttons.](media/working-with-variables/button-changes-state-1.png) | When the app starts, the running total is 0.<br><br>The red dot represents the user's finger in the text-input box, where the user enters **77**. |
| ![The Text input control contains 77, and the Add button is being pressed.](media/working-with-variables/button-changes-state-2.png) | The user selects the **Add** button. |
| ![The total is 77, and another 77 is being added to it.](media/working-with-variables/button-changes-state-3.png) | 77 is added to the running total.<br><br>The user selects the **Add** button again. |
| ![The total is 154 before it's cleared.](media/working-with-variables/button-changes-state-4.png) | 77 is again added to the running total, resulting in 154.<br><br>The user selects the **Clear** button. |
| ![The total is cleared.](media/working-with-variables/button-changes-state-5.png) | The running total is reset to 0. |

Our adding machine uses something that doesn't exist in Excel: a button. In this app, you can't use only formulas to calculate the running total because its value depends on a series of actions that the user takes. Instead, you record and update the running total manually. Most programming tools store this information in a *variable*.

Sometimes you need a variable for your app to behave the way you want, but this approach comes with caveats:

* You manually update the running total. Automatic recalculation doesn't do it for you.
* The running total isn't calculated based on the values of other controls. It depends on how many times the user selects the **Add** button and what value is in the text-input control each time. Did the user enter 77 and select **Add** twice, or did they enter 24 and 130 for each addition? You can't tell the difference after the total reaches 154.
* Changes to the total can come from different actions. In this example, both the **Add** and **Clear** buttons update the total. If the app doesn't behave the way you expect, which button causes the problem?

## Use a global variable

To create an adding machine, you need a variable to hold the running total. The simplest variables to use in Power Apps are *global variables*.  

How global variables work:

* Set the value of a global variable with the **[Set](functions/function-set.md)** function.  **Set( MyVar, 1 )** sets the global variable **MyVar** to a value of **1**.
* Use the global variable by referencing the name used with the **Set** function.  In this case, **MyVar** returns **1**.
* Global variables can hold any value, including strings, numbers, records, and [tables](working-with-tables.md).

Rebuild the adding machine by using a global variable:

1. Add a text-input control named **TextInput1**, and two buttons named **Button1** and **Button2**.

1. Set the **[Text](controls/properties-core.md)** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to  **"Clear"**.

1. To update the running total when a user selects the **Add** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **Set( RunningTotal, RunningTotal + TextInput1 )**

    This formula creates **RunningTotal** as a global variable that holds a number because of the **+** operator. Reference **RunningTotal** anywhere in the app. When the user opens the app, **RunningTotal** has an initial value of *blank*.

    The first time a user selects the **Add** button and **[Set](functions/function-set.md)** runs, **RunningTotal** is set to the value **RunningTotal + TextInput1**.

    ![Screenshot of the OnSelect property of the Add button set to the Set function.](media/working-with-variables/global-variable-1.png)

1. To set the running total to **0** when the user selects the **Clear** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **Set( RunningTotal, 0 )**

    ![Screenshot of the OnSelect property of the Clear button set to the Set function.](media/working-with-variables/global-variable-2.png)

1. Add a **[Label](controls/control-text-box.md)** control, and set its **[Text](controls/properties-core.md)** property to **RunningTotal**.

    This formula automatically recalculates and shows the user the value of **RunningTotal** as it changes based on the buttons the user selects.

    ![Screenshot of the Text property of the label set to the name of the variable.](media/working-with-variables/global-variable-3.png)

1. Preview the app. Enter a number in the text box and select the **Add** button a few times. When ready, return to the authoring experience using the <kbd>Esc</kbd> key.

    ![Screenshot of the text-input control with a value, and the label with the running total.](media/working-with-variables/global-variable-4.png)

1. To show the global variable's value, select **Variables** on the app authoring menu.

      ![Screenshot of the Variables and collections menu.](media/working-with-variables/var-collections-menu.png)
      

1. To show all the places where the variable is defined and used, select it under **Global variables**.

      ![Screenshot of the list of locations where the variable is used.](media/working-with-variables/var-collections-1.png)

## Types of variables

Power Apps has three types of variables:

| Variable type | Scope | Description | Functions that establish |
| --- | --- | --- | --- |
| Global variables |App |Use global variables to hold a number, text string, Boolean, record, table, or other value that you reference anywhere in the app. |[**Set**](functions/function-set.md) |
| Context variables |Screen |Use context variables to pass values to a screen, like parameters in other languages. You reference them from only one screen. |[**UpdateContext**](functions/function-updatecontext.md)<br>[**Navigate**](functions/function-navigate.md) |
| Collections |App |Use collections to hold a table that you reference anywhere in the app. You can change the contents of the table, and save it to the local device for later use. |[**Collect**](functions/function-clear-collect-clearcollect.md)<br>[**ClearCollect**](functions/function-clear-collect-clearcollect.md) |

## Create and remove variables

Variables are created implicitly when they appear in a **Set**, **UpdateContext**, **Navigate**, **Collect**, or **ClearCollect** function. To declare a variable and its type, just include it in any of these functions anywhere in your app. These functions don't create variables; they only fill variables with values. You never declare variables explicitly like you might in another programming tool, and all typing is implicit from usage.

For example, you might have a button control with an **OnSelect** formula equal to **Set( X, 1 )**. This formula establishes **X** as a variable with a type of number. You use **X** in formulas as a number, and that variable has a value of *blank* after you open the app but before you select the button. When you select the button, you give **X** the value of **1**.

If you add another button and set its **OnSelect** property to **Set( X, "Hello" )**, an error occurs because the type (text string) doesn't match the type in the previous **Set** (number). All implicit definitions of the variable must agree on type. Again, all this happens because you mention **X** in formulas, not because any of those formulas actually run.

Remove a variable by removing all the **Set**, **UpdateContext**, **Navigate**, **Collect**, or **ClearCollect** functions that implicitly establish the variable. Without these functions, the variable doesn't exist. Also remove any references to the variable because they cause an error.

## Variable lifetime and initial value

Variables stay in memory while the app runs. When the app closes, the values in variables are lost.

Store the contents of a variable in a data source by using the **Patch** or **Collect** functions. Store values in collections on the local device by using the [**SaveData**](functions/function-savedata-loaddata.md) function.

When the user opens the app, all variables start with an initial value of *blank*.

## Reading variables

Use the variable's name to read its value. For example, define a variable with this formula:

`Set( Radius, 12 )`

Then use **Radius** anywhere you use a number, and it's replaced with **12**:

`Pi() * Power( Radius, 2 )`

If you give a context variable the same name as a global variable or a collection, the context variable takes precedence. You can reference the global variable or collection by using the [disambiguation operator](functions/operators.md#disambiguation-operator) **[@Radius]**.

### Reserved variable names

Don't use any of the following variable names. These names are app properties, and using them can cause variable name collisions that result in unexpected app behavior.

- ActiveScreen
- DesignHeight
- DesignWidth
- Height
- MinScreenHeight
- MinScreenWidth
- SizeBreakpoints
- StudioVersion
- TestCaseId
- Testing
- TestSuiteId
- Theme
- Width

## Use a context variable

Let's look at how you create an adding machine by using a context variable instead of a global variable.

How context variables work

* You implicitly establish and set context variables by using the **[UpdateContext](functions/function-updatecontext.md)** or **[Navigate](functions/function-navigate.md)** function. When the app starts, the initial value of each context variable is *blank*.
* You update context variables with records. In other programming tools, you usually use "=" for assignment, like "x = 1". For context variables, use **{ x: 1 }** instead. When you use a context variable, use its name directly without the record syntax.
* You can also set a context variable when you use the **[Navigate](functions/function-navigate.md)** function to show a screen. If you think of a screen as a kind of procedure or subroutine, this approach is like parameter passing in other programming tools.
* Except for **[Navigate](functions/function-navigate.md)**, context variables are limited to the context of a single screen, which is where they get their name. You can't use or set them outside this context.
* Context variables can hold any value, including strings, numbers, records, and [tables](working-with-tables.md).

Rebuild the adding machine by using a context variable:

1. Add a text-input control, named **TextInput1**, and two buttons, named **Button1** and **Button2**.

2. Set the **[Text](controls/properties-core.md)** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to  **"Clear"**.

3. To update the running total whenever a user selects the **Add** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **UpdateContext( { RunningTotal: RunningTotal + TextInput1 } )**

    This formula establishes **RunningTotal** as a context variable that holds a number because of the **+** operator. You reference **RunningTotal** anywhere in this screen. When the user opens the app, **RunningTotal** has an initial value of *blank*.

    The first time the user selects the **Add** button and **[UpdateContext](functions/function-updatecontext.md)** runs, **RunningTotal** is set to the value **RunningTotal + TextInput1**.

    ![OnSelect property of the Add button with updatecontext.](media/working-with-variables/context-variable-1.png)

4. To set the running total to **0** whenever the user selects the **Clear** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **UpdateContext( { RunningTotal: 0 } )**

    Again, use **[UpdateContext](functions/function-updatecontext.md)** with the formula **UpdateContext( { RunningTotal: 0 } )**.

    ![OnSelect property of the Clear button updatecontext.](media/working-with-variables/context-variable-2.png)

5. Add a **[Label](controls/control-text-box.md)** control, and set its **[Text](controls/properties-core.md)** property to **RunningTotal**.

    This formula will automatically be recalculated and show the user the value of **RunningTotal** as it changes based on the buttons that the user selects.

    ![Text property of label.](media/working-with-variables/context-variable-3.png)

1. Preview the app. Enter a number in the text box and select the **Add** button a few times. When you're ready, return to the authoring experience by using the <kbd>Esc</kbd> key.

    ![Text-input control shows a value, and label shows running total.](media/working-with-variables/context-variable-4.png)

1. Set the value of a context variable while navigating to a screen to pass "context" or "parameters" from one screen to another. To demonstrate this technique, insert a screen, insert a button, and set its **OnSelect** property to this formula:

    **Navigate( Screen1, None, { RunningTotal: -1000 } )**

    ![OnSelect property of a button.](media/working-with-variables/context-variable-5.png)

    Hold down the <kbd>Alt</kbd> key while you select this button to show **Screen1** and set the context variable **RunningTotal** to -1000.

    ![Screen1 is open.](media/working-with-variables/context-variable-6.png)

1. To show the value of the context variable, do one of the following:

   - If you're using the preview version of Power Apps Studio, select **Variables** in the app authoring menu.
    
   - If you're using the classic version of Power Apps Studio, select the **File** menu, and then select **Variables** in the left pane.

1. To show where the context variable is defined and used, select it under **Context variables**.


## Use a collection

Let's create an adding machine by using a collection. Because a collection holds a table that's easy to change, this adding machine keeps a "paper tape" of each value as you enter it.

How collections work

* Create and set collections by using the **[ClearCollect](functions/function-clear-collect-clearcollect.md)** function. You can use the **[Collect](functions/function-clear-collect-clearcollect.md)** function instead, but it requires another variable instead of replacing the old one.
* A collection is a type of data source and a table. To get a single value in a collection, use the **[First](functions/function-first-last.md)** function, and get one field from the resulting record. If you use a single value with **[ClearCollect](functions/function-clear-collect-clearcollect.md)**, this is the **Value** field, as in this example:<br>
**First(** *VariableName* **).Value**

Create an adding machine by using a collection:

1. Add a **[Text input](controls/control-text-input.md)** control, named **TextInput1**, and two buttons, named **Button1** and **Button2**.

2. Set the **[Text](controls/properties-core.md)** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to **"Clear"**.

3. To update the running total whenever a user selects the **Add** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **Collect( PaperTape, TextInput1.Text )**

    The mere existence of this formula establishes **PaperTape** as a collection that holds a single-column table of text strings. You can reference **PaperTape** anywhere in this app. Whenever a user opens this app, **PaperTape** is an empty table.

    When this formula runs, it adds the new value to the end of the collection. Because we're adding a single value, **Collect** automatically places it in a single-column table, and the column's name is **Value**, which you'll use later.

    ![OnSelect property of the Add button with collect.](media/working-with-variables/papertape-1.png)

4. To clear the paper tape when the user selects the **Clear** button, set its **[OnSelect](controls/properties-core.md)** property to this formula:

    **Clear( PaperTape )**

    ![OnSelect property of the Clear but1. To run the adding machine, select <kbd>F5</kbd> to open Preview, enter numbers in the text input control, and select buttons.

    ![Screenshot of the Text input control showing a value, and the label showing the running total.](media/working-with-variables/papertape-run-1.png)label.](media/working-with-variables/papertape-3.png)

6. To run the adding machine, press F5 to open Preview, enter numbers in the text-input control, and select buttons.

    ![The Text input control shows a value, and the label show the running total.](media/working-with-variables/papertape-run-1.png)

1. To return to the default workspace, select <kbd>Esc</kbd>.

8. To display the paper tape, insert a **Data table** control, and set its **[Items](controls/properties1. To see the values in your collection, do one of the following:

   - If you're using the preview version of Power Apps Studio, select **Variables** in the app authoring menu, and then select **Collections**.

   - If you're using the classic version of Power Apps Studio, select **Collections** on the **File** menu.. To see the values in your collection, do one of the following:

   - If you're using the preview version of Power Apps Studio, select **Variables** in the app authoring menu and then select **Collections**. 
    
   - If you're using the classic versionof Power Apps Studio, select **Collections** on the **File** menu.

1. To store and get your collection, add two more button controls, and set their **Text** properties to **Load** and **Save**. Set the **OnSelect** property of the **Load** button to this formula:

     **Clear( PaperTape ); LoadData( PaperTape, "StoredPaperTape", true )**

     You need to clear the collection first because **LoadData** will append the stored values to the end of the collection.

     ![OnSelect property of the Load button.](media/working-with-variables/papertape-5.png)

11. Set the **OnSelect** property of the **Save** button to this formula:

     **SaveData( PaperTape, "StoredPaperTape" )**

     ![OnSelect* property of the Save button.](media/working-with-variables/papertape-6.png)

1. Preview again by selecting <kbd>F5</kbd>, enter numbers in the text input control, and select buttons. Select the **Save** button. Close and reload the app, and select the **Load** button to reload your collection.

> [!NOTE]
> **SaveData** and **LoadData** functions work in Power Apps Mobile but not Power Apps Studio or the web player for Power Apps.

---

## Understand behavior formulas for canvas apps

Source: [working-with-formulas-in-depth.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-formulas-in-depth)

*Reference information about working with behavior formulas, which change the state of a canvas app.*

# Understand behavior formulas for canvas apps

Most formulas calculate a value.  Like an Excel spreadsheet, recalculation happens automatically as values change.  For example, you might want to show the value in a **[Label](controls/control-text-box.md)** control in red if the value is less than zero or in black otherwise. So you can set the **[Color](controls/properties-color-border.md)** property of that control to this formula:

```power-fx
If( Value(TextBox1.Text) >= 0, Color.Black, Color.Red )
```

In this context, what does it mean when the user selects a **[Button](controls/control-button.md)** control?  No value has changed, so there is nothing new to calculate. Excel has no equivalent to a **[Button](controls/control-button.md)** control.  

By selecting a **[Button](controls/control-button.md)** control, the user initiates a sequence of actions, or behaviors, that will change the state of the app:

* Change the screen that's displayed: **[Back](functions/function-navigate.md)** and **[Navigate](functions/function-navigate.md)** functions.
* Control a [signal](functions/signals.md): **[Enable](functions/function-enable-disable.md)** and **[Disable](functions/function-enable-disable.md)** functions.
* Refresh, update, or remove items in a [data source](working-with-data-sources.md): **[Refresh](functions/function-refresh.md)**, **[Update](functions/function-update-updateif.md)**, **[UpdateIf](functions/function-update-updateif.md)**, **[Patch](functions/function-patch.md)**, **[Remove](functions/function-remove-removeif.md)**, **[RemoveIf](functions/function-remove-removeif.md)** functions.
* Update a [context variable](working-with-variables.md#use-a-context-variable):  **[UpdateContext](functions/function-updatecontext.md)** function.
* Create, update, or remove items in a [collection](working-with-data-sources.md#collections):  **[Collect](functions/function-clear-collect-clearcollect.md)**, **[Clear](functions/function-clear-collect-clearcollect.md)**, **[ClearCollect](functions/function-clear-collect-clearcollect.md)** functions.

Because these functions change the state of the app, they can't be automatically recalculated. You can use them in the formulas for the **[OnSelect](controls/properties-core.md)**, **[OnVisible](controls/control-screen.md)**, **[OnHidden](controls/control-screen.md)**, and other **On...** properties, which are called behavior formulas.

### More than one action
Use semicolons to create a list of actions to perform. For example, you might want to update a context variable and then return to the previous screen:

```power-fx
UpdateContext( { x: 1 } ); Back()
```

Actions are performed in the order in which they appear in the formula.  The next function won't start until the current function has completed. If an error occurs, subsequent functions might not start.

---

## Use the Search pane

Source: [search.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/search)

*Learn how to use the Search pane inside Power Apps Studio to find text.*

# Use the Search pane 

You can now use the Search pane to locate objects&mdash;like media files, variables, collections, and data sources&mdash;across your app. You can also use the Search pane to find repeated instances of strings in formulas. For example, using the Search pane, you can look for each instance of `HoverColor` to determine the setting for that property in other areas of your app. You can use the Search pane to learn more about what's being used by your app, where, and you can go right to those results to make any necessary updates. In addition, you can use the replace capability to update one or more instances of text, variables, collections, or formula references.

:::image type="content" source="media/search/search-pane-1.png" alt-text="The Search pane visible inside Power Apps Studio.":::

## Prerequisites

- [Sign up](../signup-for-powerapps.md) for Power Apps.
- [Create an app from a template](get-started-test-drive.md), [create a new app](data-platform-create-app.md), or [open an existing app](edit-app.md) in Power Apps.
- [Learn how to configure a control](add-configure-controls.md).

## Open the Search pane

You can open the Search pane by selecting **Search** ![Search icon](media/search/search-icon.png). You can also use shortcut keys by selecting **Ctrl**+**F** when your cursor is outside the formula bar, or selecting **Ctrl**+**Shift**+**F** when your cursor is inside the formula bar.

You can also open the Search pane directly to the Replace functionality by selecting **Ctrl**+**H** when your cursor is outside the formula bar, or selecting **Ctrl**+**Shift**+**H** when your cursor is inside the formula bar.

> [!NOTE]
> Selecting **Ctrl**+**F** or **Ctrl**+**H** inside the formula bar will open the [Find and Replace](formula-bar-find-replace.md) capability inside the formula bar.

## Filter search results

You can filter search results by selecting one or more categories. These categories help you focus the search by narrowing down the areas within the app&mdash;such as screens, media, and collections.

To select the categories you want to search on, use the filter option next to the search box. The default selection is **All**, which searches across all categories within the open app.

The following example shows search results filtered for the search term **Snow** with the selected categories of **Variables** and **Collections**.

:::image type="content" source="media/search/filter-1.png" alt-text="Filter option selected on the Search pane.":::

## Refine your search

You can use more search options to further refine your search. These options are available inside the filter option named **More search options** (below the **Categories** section).

:::image type="content" source="media/search/more-search-options.png" alt-text="More search options under Categories in the filter option.":::

- **Match case** returns search results that only match the specified case.

    In the following example, instances of **Snow** (uppercase S) will appear as a match, but **snow** (lowercase S) won't.

    :::image type="content" source="media/search/match-case-1.png" alt-text="An example of matching the case for search results with results for the uppercase keyword.":::

- **Match whole word** returns search results for exact matches of the entire sequence of characters.

    In the following example, **Snow** returns only a few results although **Snow** appears within names many times across all app objects.

    :::image type="content" source="media/search/match-whole-words-1.png" alt-text="An example of matching the whole word in search result that limits search for the exact word only.":::

- **Use regular expression (RegEx)** returns search results for matches conforming to the [regular expression](/deployedge/edge-learnmore-regex) specified within the input area.

    In the following example, using the regular expression search capability with `Snowboarding( Mountain | Dashboard)` formula returns matches for **Snowboarding** when it appears together with either **Mountain** or **Dashboard**.

    :::image type="content" source="media/search/regex-1.png" alt-text="An example of matching regular expression syntax while searching for text.":::

## Work with search results

Selecting search results in different areas of the Search pane will behave differently depending on the context of the result. The search results can be classified under two broad categories&mdash;**Definitions** and **Instances**:

- **Definitions** describe the object being referred to in your app, usually in a formula.

    There are several category headers inside the Search pane that you can use to navigate through the results. Categories such as **Variables**, **Collections**, **Data**, **Media**, **Flows**, and **Components** are referred to as **definitions**.

    Selecting the results under such definition category headers takes you to the appropriate information screen such as for Variables and Collections, or to the appropriate pane where that object is available in your app (such as Data, Media, Flows, or Components).

- **Instances** describe the search results that are tied to an individual app, screen, or control property in the formula bar. All these results are tied to the **Screens** category based on the structure found inside the **Tree View**. When you select a result under this **Screens** category, you'll be taken to that specific formula bar reference or the related control, as applicable.

### Variables

Selecting a global or a context variable under the **Variables** header in the search results will take you to the Variables information screen for the selection.

As shown below, you're taken to the definition of the global or context variable depending on your selection from the search results available.

Search result:

:::image type="content" source="media/search/variables-1.png" alt-text="Global and context variables available in search result.":::

If you're using the preview version of Power Apps Studio, select the **Context variables** or **Global variables** to see more information about the variable.

:::image type="content" source="media/search/global-context-variables.png" alt-text="Selecting a global or context variable takes you to the information screen.":::

If you're using the classic version of Power Apps Studio, depending on the selected global or context variable, you're taken to the information screen for the selected type of variable.

Global variable selected:

:::image type="content" source="media/search/global-variable.png" alt-text="Selecting a global variable takes you to the information screen of the selected global variables.":::

Context variable selected:

:::image type="content" source="media/search/local-variable-1.png" alt-text="Selecting a context variable takes you to the information screen of the selected context variables.":::


### Collections

Selecting a collection under the **Collections** header will take you to the information screen for that collection.

:::image type="content" source="media/search/collections-1.png" alt-text="Collections selected from search results showing the relevant collection details.":::

### Data

Selecting a result under the **Data** header opens the **Data** pane, and prepopulates the search input for that pane by using the selected result text.

:::image type="content" source="media/search/data.png" alt-text="Data selected from search results showing the relevant data connection details.":::

### Media

Selecting a result under the **Media** header opens the **Media** pane, and prepopulates the search input for that pane with the selected result text.

:::image type="content" source="media/search/media.png" alt-text="Media selected from search results showing the relevant media details.":::

### Flows

The **Flows** header only appears if you've enabled the [Power Automate pane (preview)](working-with-flows.md). Selecting a result here opens the Power Automate pane and prepopulates the search input with the selected result text.

:::image type="content" source="media/search/flows.png" alt-text="Flow selected from search results showing the relevant flow details.":::

### Components

Selecting a result under the **Components** header takes you to the components section in the **Tree view** pane, and prepopulates the search input for that pane with the selected result text.

:::image type="content" source="media/search/components.png" alt-text="Component selected from search results showing the relevant component details.":::

### Screens

Selecting a result under the **Screen** header selects the appropriate control or screen on the canvas, and opens the property for the result in the formula bar. The selected result also gets highlighted in the formula bar.

:::image type="content" source="media/search/screens.png" alt-text="Screens selected from search results showing the relevant screen details.":::

## Refreshing the search results

If you make changes within the app, you'll need to refresh the results pane to see the change reflected in your search results.

:::image type="content" source="media/search/refresh-1.png" alt-text="Use the Refresh button to refresh the search results based on changes inside the app elements.":::

## Clear the search term

Search terms and results are kept until you no longer need them. To clear the search term and results, select the **X** to the right of the input area.

:::image type="content" source="media/search/clear-search-term.png" alt-text="Clear the search terms.":::

## Replace

You can replace one or more instances of certain types of search results, including variable names, collection names, any formula text including strings, or other formula references.

After you perform a search, the replace pivot shows the list of search results that can be replaced.

:::image type="content" source="media/search/eligible-replace.png" alt-text="List of search results that are eligible for replacing.":::

### Replace results

All results that can be replaced are selected by default. You can refine the list of results to replace by deselecting individual results or entire categories by selecting the checkbox next to the result or category heading. 

:::image type="content" source="media/search/work-with-search-results-1.png" alt-text="Refine the list of results to replace.":::

You can also filter the result list to only show selected categories of results.

:::image type="content" source="media/search/work-with-search-results-2.png" alt-text="Filter the result list to only show selected categories of results.":::

As you refine the list of results to replace, the replace button at the bottom of the panel keeps track of the number of replacements to be made. If all items are selected, the button reads **Replace all** with the total count of all replaceable items.

:::image type="content" source="media/search/work-with-search-results-3.png" alt-text="Results showing total replacements found.":::

If you've selected results from the list, the button is updated to read **Replace selected** with the total count of selected items.

:::image type="content" source="media/search/work-with-search-results-4.png" alt-text="Replace selected button showing total number of items to replace.":::

You can also interact with individual results in the results list directly to perform replacements by selecting the ellipsis to the right of each individual result in the result list.

:::image type="content" source="media/search/work-with-search-results-5.png" alt-text="Select the ellipsis to replace an individual result.":::

### Replacing Variables results

Performing a replacement for results in the Variables category replaces the variable name at the definition level, meaning all instances of the matching variable name will be replaced across the entire app. You can also view the variable details on their information screen to review the usage before making the replacement.

:::image type="content" source="media/search/variables.png" alt-text="Screen showing replacing variables results.":::

### Replacing Collections results

Similar to variables, replacing a result in the Collections category replaces the collection name at the definition level, replacing all matching instances of the collection name across the app. You can view collection details on their information screen prior to making the replacement.

:::image type="content" source="media/search/collections.png" alt-text="Screen showing replace collections results.":::

### Replacing Screens results

The Screens category shows individual replaceable results following the structure in the tree view, so you can replace text in formulas, formula references, and control names. Replacements made in the Screens category only replace the single instance of the selected matching result, so you can pick and choose what you'd like to replace. You can also review the formula match before making the replacement.

:::image type="content" source="media/search/replace-screens.png" alt-text="Replacing Screens results.":::

### Completing the replacement and undoing replacements

After you've refined your selection to the items you'd like to replace, selecting the button prompts you to confirm the operation.

:::image type="content" source="media/search/search-replace.png" alt-text="Select Replace to confirm to replace and undo replacements.":::

Confirming the operation performs the replacement, and a notification indicates whether the replacement was successful. 

:::image type="content" source="media/search/search-replace-confirm.png" alt-text="Confirmation of replacements.":::

The replacement operation might fail if a control name is already in use or unsupported characters are included.

:::image type="content" source="media/search/replace-fail.png" alt-text="Replacement operation has failed.":::

After the replacement is complete, you can undo the replacement by using the undo button or by selecting **Ctrl**+**Z**.

## Limitations

The Search pane is limited to returning a maximum of 2,000 results. A notification appears if you exceed this limit.

:::image type="content" source="media/search/max-results-1.png" alt-text="Maximum number of results reached.":::

### See also

[Use Find and Replace in the formula bar](formula-bar-find-replace.md)

---

## Use Find and Replace in the formula bar

Source: [formula-bar-find-replace.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/formula-bar-find-replace)

*Learn how to use the find and Replace to search for strings and make changes to one or more matches.*

# Use Find and Replace in the formula bar

In complex Power Apps, formulas can get lengthy. Locating and replacing portions of large formulas can become difficult. You can now use the **Find and Replace** capability for the selected control or property to easily find and replace the specified word or sequence of characters.

With **Find and Replace** capability, you can search for combinations of letters, numbers, words, and phrases within a formula in the formula bar. This capability also allows you to use text casing, whole words, and regular expressions to find and replace text inside formulas.

## Prerequisites

- [Sign up](../signup-for-powerapps.md) for Power Apps.
- [Create an app](get-started-test-drive.md) or [open an existing app](edit-app.md) in Power Apps.
- Learn how to [configure a control](add-configure-controls.md).

## Launch Find and Replace

You can launch the **Find and Replace** control in the formula bar using the **Find and replace** button, or shortcut keys. You can also pre-populate text in the search input.

To get started, [create a new app](get-started-test-drive.md), or [edit an existing app](edit-app.md) in Power Apps Studio. Once open, use any of the following methods to launch the **Find and Replace** control.

### Method 1: Use the Find and Replace button

1. Select the control or property that you want to edit.

1. Select the drop-down on the right-side of the formula bar to show the **Find and Replace** control.

    :::image type="content" source="media/formula-bar-find-replace/expand-button.png" alt-text="The expand button on the right hand side of the formula bar":::

    > [!TIP]
    > You can also drag the formula bar down to expand the formula bar making it easier to read complex expressions.

1. Select **Find and replace** from the bottom of the formula bar.

    :::image type="content" source="media/formula-bar-find-replace/find-replace-button.png" alt-text="The Find and Replace button underneath the formula bar":::

    **Find and Replace** control appears on the upper-right hand side of the formula bar.

    :::image type="content" source="media/formula-bar-find-replace/find-replace-formula-bar.png" alt-text="The Find and Replace control appears inside the formula bar":::

### Method 2: Use shortcut keys

1. Select the control or property that you want to edit.

1. While your cursor is within the formula bar, press **Ctrl+F** to find, or **Ctrl+H** to find and replace the specified word or sequence of characters in the formula.

    :::image type="content" source="media/formula-bar-find-replace/shortcut-keys.gif" alt-text="An animation showing the Find and Replace control launching by pressing Ctrl + F to launch Find and pressing Ctrl + H to launch Find and Replace":::

### Method 3: Launch Find and Replace with text already selected

You can also launch the control pre-populated with text from your formula that you wish to search for.

To do this, select or keep the cursor inside the formula bar over the section that you want to find or replace. And then, use **Find and replace** button, or the shortcut keys as described earlier to launch **Find and Replace** control.

:::image type="content" source="media/formula-bar-find-replace/select-find-replace.png" alt-text="Cursor placed on the portion of the formula to find and replace, and another screen with the Find and Replace control open.":::

## Working with Find and Replace

When working with **Find**, you have three options to search the formula. When working with **Replace**, you have two options to choose from. We'll take a look at the options for both **Find** and **Replace**.

### Find

Add text or characters to search for into the provided input area. And then, use the icons on the right-hand side of the input area to help refine your search:

- **Match case** returns only matches with the specified case.

    In the example below, instances of `TicketList` will appear as a match, but `ticketlist` wouldn't.
    
    :::image type="content" source="media/formula-bar-find-replace/match-case.png" alt-text="The Match Case refiner icon on the Find and Replace control":::

- **Match whole word** returns only exact matches of the entire sequence of characters.

    In the example below, instances of `Ticket` returns no matches although the word `Ticket` appears within the names several times in the formula.

    :::image type="content" source="media/formula-bar-find-replace/match-whole-word.png" alt-text="The Match Whole Word refiner icon on the Find and Replace control":::

- **Use regular expression** (RegEx) returns only matches conforming to the regular expression specified within the input area. More information: [Regular expressions](functions/function-ismatch.md#regular-expressions)

    In the example below, using the Regular Expression search capability with `Screen(Priority|Task)` returns matches for `Screen` when it appears together with either `Priority` or `Task` as shown below.

    :::image type="content" source="media/formula-bar-find-replace/regex-highlighting.png" alt-text="The formula in the formula bar with matching results highlighted for the regular expression shown in the Find and Replace control":::

- **Previous match** or **Next match** arrows allow you to move forward and backward through any matches the search returns. As you move through the matches, the match position updates and the row containing the match is highlighted to let you know which match you're currently working with.

    :::image type="content" source="media/formula-bar-find-replace/match-highlighting.png" alt-text="The formula in the formula bar with a line highlighted for the match currently in focus from using the previous match and next match arrow arrows":::

- **Find in selection** limits the search area within a formula to only the selected portion of a formula. To select part of the formula, select and hold at the beginning of the desired searching area and then drag your cursor to highlight the entire desired area. To select using the keyboard, move cursor focus to the beginning of the desired search area, then hold **Shift** key, and use the arrow keys to highlight the desired search area.  

    In the example below, the search has been limited to the selected area, so the search now only returns two matches instead of the four matches returned previously.

    :::image type="content" source="media/formula-bar-find-replace/selection-highlighting.png" alt-text="The formula in the formula bar showing a selected block of text":::

### Replace

By default, the **Find and replace** control opens in collapsed format and only displays the Find capability. To expand the control and show the Replace capability, select the icon to the left of the search input box, or press **Ctrl+H** on your keyboard. To collapse again, select the rotated icon.

Collapsed replace mode:

:::image type="content" source="media/formula-bar-find-replace/toggle-replace-mode.png" alt-text="The Toggle Replace Mode icon on the left hand side of the Find and Replace control, before the text input areas":::

Expanded replace mode:

:::image type="content" source="media/formula-bar-find-replace/collapse-replace-mode.png" alt-text="The Collapse Replace Mode icon on the left hand side of the Find and Replace control, before the text input areas":::

In the Replace input area, specify the word or sequence of characters you’d like to replace the search text.

Use the **Replace** or **Replace all** icons to update one or all matches returned with the specified word or characters.

:::row:::
   :::column span="":::

        **Replace**

      :::image type="content" source="media/formula-bar-find-replace/replace-one.png" alt-text="The Replace icon on the right-hand side of the Find and Replace control, after the Replace text input field.":::
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::

        **Replace all**

      :::image type="content" source="media/formula-bar-find-replace/replace-all.png" alt-text="The Replace All icon on the right-hand side of the Find and Replace control, after the Replace text input field.":::
   :::column-end:::
:::row-end:::

### See also

- [Use the Search pane (preview)](search.md)
- [Get started with formulas in canvas apps](working-with-formulas.md)
- [Add and configure controls](add-configure-controls.md)

---

## Show text, dates, and times in canvas apps

Source: [show-text-dates-times.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/show-text-dates-times)

*Learn about how to show text, dates, and times in a canvas app.*

# Show text, dates, and times in canvas apps
In Power Apps, add dates and times to a canvas app, and format them to show the right level of detail or to reflect your locale. Calculate the amount of time between two dates, or calculate a date that's a certain amount of time before or after a date that you specify. Convert dates to or from separate values for days, months, and years, and convert times to or from separate values for hours, minutes, and seconds.

For example, add data from users about stock trades or client meetings, data from an external source, or data from another app created in Power Apps. If that data includes times down to the millisecond, round it to the nearest minute for simplicity. Calculate how many days remain before a major milestone. If you want to schedule client meetings every five days, calculate those dates automatically. If May 10, 1985, is stored in separate fields for the day, the month, and the year, consolidate them into a single value. Conversely, break each date into separate values if your app manages them separately.

## Prerequisites

* [Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) by providing the same credentials that you used to sign up.
* Create an app or open an existing app in Power Apps.
* Learn how to [configure a control](add-configure-controls.md) in Power Apps.

## Show text in a Label control
Show text in a **[Label](controls/control-text-box.md)** control by setting the value of its **[Text](controls/properties-core.md)** property. Set this property by typing directly into the control or by typing an expression in the formula bar.

* If you type directly into the control, it shows exactly what you type.
* If you type an expression in the formula bar, the control shows the result of the expression.

Here are some examples.

1. Add a **[Label](controls/control-text-box.md)** control named **ShowText**, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**Now()**
   
    If your computer is set to the "en-us" locale, the current date and time appears in this format:
    <br>*mm/dd/yyyy hh:mm AM/PM*
   
    If your computer is set to a locale such as "fr-fr", the current date and time appears in this format:
    <br>*dd/mm/yyyy hh:mm AM/PM*
2. Set the **[Text](controls/properties-core.md)** property of **ShowText** to this formula:
   <br>**DateDiff(Today(), DateValue("01/01/2025"))**
   
   
    The control shows the number of days between today and January 1, 2020, by using these functions:
   
   * **DateDiff**, which calculates the number of days, quarters, or years between two dates.
   * **Today**, which calculates the current day as a value.
   * **DateValue**, which converts a literal string, as shown between double quotation marks, to a value on which calculations can be performed.
3. Add a **[Text input](controls/control-text-input.md)** control named **BirthDate**, and move it under **ShowText**.

4. In **BirthDate**, type the month and the day of your birth (for example, **05/18**).

5. Set the **[Text](controls/properties-core.md)** property of **ShowText** to this formula:
   <br>**DateDiff(Today(), DateValue(BirthDate.Text))**
   

    **ShowText** shows the number of days between today and whatever date you type into **BirthDate**. If your birthday has already occurred this year, **ShowText** displays a negative value.

## Format dates and times by using DateTimeValue
Convert dates and times from strings of text to values, which you can format in a variety of ways and use in calculations. Specify the format by using built-in and custom options.

> [!NOTE]
> The **[DateTimeValue](functions/function-datevalue-timevalue.md)** and **[DateValue](functions/function-datevalue-timevalue.md)** functions can convert dates in any of these formats into values:  
> 
> * MM/DD/YYYY  
> * DD/MM/YYYY  
> * DD Mon YYYY  
> * Month DD, YYYY  
> 
> 

1. Add a **[Text input](controls/control-text-input.md)** control named **ArrivalDateTime**, and type a date and time in this format:
   <br>**5/10/85 6:15 AM**
2. Add a **[Label](controls/control-text-box.md)** control named **ShowDate**, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**DateTimeValue(ArrivalDateTime.Text)**
   

   
    **ShowDate** shows the same information that you typed, but it's been converted from text to a value and formatted differently. For example, the year appears as four digits instead of just two.
3. Change the **[Text](controls/properties-core.md)** property of **ShowDate** to this formula:
   <br>**DateTimeValue(ArrivalDateTime.Text, "fr")**
   

   
    **ShowDate** shows the day before the month, as a French user would expect.
   
   > [!TIP]
   > To display a list of other locales in Intellisense, remove the closing quotation mark and **fr** from the formula, but leave the open quotation mark:
   > 

   > 
4. To use one of several built-in formats, change the **[Text](controls/properties-core.md)** property of **ShowDate** to this formula:
   <br>**Text(DateTimeValue(ArrivalDateTime.Text), DateTimeFormat.LongDateTime)**
   

    **ShowDate** shows the day of the week, the date, and the time.
   
   > [!TIP]
   > The **DateTimeFormat** parameter supports several other built-in formats. To display that list, remove **LongDateTime** from the formula.
   > 
   > 
5. To use a custom format, change the **[Text](controls/properties-core.md)** property of **ShowDate** to this formula:
   <br>**Text(DateTimeValue(ArrivalDateTime.Text), "mm/dd/yyyy hh:mm:ss.fff AM/PM")**
   

   
    **ShowDate** shows the date/time value in the format that you specified, including milliseconds.
   
   > [!TIP]
   > To round the time to the nearest tenth or hundredth of a second, specify **hh:mm:ss.f** or **hh:mm:ss.ff** in the formula.
   > 
   > 

## Format a date by using DateValue

1. Add a **[Text input](controls/control-text-input.md)** control named **ArrivalDate**, and then type a date in it (for example, **5/10/85**).

2. Add a **[Label](controls/control-text-box.md)** control named **FormatDate**, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**DateValue(ArrivalDate.Text)**
   
    **FormatDate** shows the date that you typed, except the year appears as four digits.
3. Set the **[Text](controls/properties-core.md)** property of **FormatDate** to this formula:
   <br>**DateValue(ArrivalDate.Text, "fr")**
   
    **FormatDate** shows the day before the month, just as a French user would expect.
4. To use one of several built-in formats, set the **[Text](controls/properties-core.md)** property of **FormatDate** to this formula:
   <br>**Text(DateValue(ArrivalDate.Text), DateTimeFormat.LongDate)**
   
    **FormatDate** shows the day of the week, the month, the day, and the year.
5. To use a custom format, set the **[Text](controls/properties-core.md)** property of **FormatDate** to this formula:
   <br>**Text(DateValue(ArrivalDate.Text), "yy/mm/dd")**
   
    **FormatDate** shows the date in the format that you specified.

## Format a time using DateTimeValue

1. Add a **[Text input](controls/control-text-input.md)** control named **ArrivalTime**, and then type **6:15 AM** in it.

2. Add a **[Label](controls/control-text-box.md)** control named **ShowTime**.

3. To use one of several built-in formats, set the **[Text](controls/properties-core.md)** property of **ShowTime** to this formula:
   <br>**Text(DateTimeValue(ArrivalTime.Text), DateTimeFormat.LongTime)**
   
    **ShowTime** shows the time that you specified, including seconds.
4. To use a custom format, set the **[Text](controls/properties-core.md)** property of **ShowTime** to this formula:
   <br>**Text(DateTimeValue(ArrivalTime.Text), "hh:mm:ss.fff AM/PM")**
   
    **ShowTime** shows the time that you specified, including seconds and milliseconds.
   
   > [!TIP]
   > To round the time to the nearest tenth or hundredth of a second, enter **hh:mm:ss.f** or **hh:mm:ss.ff** in the formula.
   > 
   > 

## Show the time between dates

1. Add two **[Text input](controls/control-text-input.md)** controls named **Start** and **End**.

2. Type **4/1/2015** in **Start**, and type **1/1/2016** in **End**.

3. Add a **[Label](controls/control-text-box.md)** control named **DateDiff**, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**DateDiff(DateValue(Start.Text), DateValue(End.Text))**
   

   
    **DateDiff** shows **275**, which is the number of days between April 1, 2015, and January 1, 2016.
4. Set the **[Text](controls/properties-core.md)** property of **DateDiff** to this formula:  <br>**DateDiff(DateValue(Start.Text), DateValue(End.Text), Months)**
   
    **DateDiff** shows **9**, which is the number of months between April 1, 2015, and January 1, 2016. Replace **Months** with **Quarters** or **Years** to show the time in those units.

## Identify a date before or after another date

1. Add a **[Text input](controls/control-text-input.md)** control named **Start**, and type **5/10/1985** in it.

2. Add a **[Label](controls/control-text-box.md)** control named **DateAdd**, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**DateAdd(DateValue(Start.Text), 3)**
   

   
    **DateAdd** shows **5/13/1985**, which is three days after the date in **Start**.
3. Set the **[Text](controls/properties-core.md)** property of **DateAdd** to this formula:
   <br>**DateAdd(DateValue(Start.Text), -3)**
   

   
    **DateAdd** shows **5/7/1985**, which is three days before the date in **Start**.
4. Change the **[Text](controls/properties-core.md)** property of **DateAdd** to this formula:
   <br>**DateAdd(DateValue(Start.Text), 3, Months)**
   

   
    The label shows **8/10/1985**, which is three months after the date in **Start**. Replace **Months** with **Quarters** or **Years** to identify a date that's the specified number of quarters or years before or after the date in **Start**.

## Calculate dates based on years, months, and days

1. Add three **[Drop down](controls/control-drop-down.md)** controls named **Year**, **Month**, and **Day**.

2. Set the **[Items](controls/properties-core.md)** property of **Year** to this formula:
   <br>**Table({Year:"2014"}, {Year:"2015"}, {Year:"2016"})**

3. Set the **[Items](controls/properties-core.md)** property of **Month** to this formula:
   <br>**Table({Month:"1"}, {Month:"2"}, {Month:"3"}, {Month:"4"}, {Month:"5"}, {Month:"6"}, {Month:"7"}, {Month:"8"}, {Month:"9"}, {Month:"10"}, {Month:"11"}, {Month:"12"})**

4. Set the **[Items](controls/properties-core.md)** property of **Day** to this formula:
   <br>**Table({Day:"1"}, {Day:"2"}, {Day:"3"}, {Day:"4"}, {Day:"5"}, {Day:"6"}, {Day:"7"}, {Day:"8"}, {Day:"9"}, {Day:"10"}, {Day:"11"}, {Day:"12"}, {Day:"13"}, {Day:"14"}, {Day:"15"}, {Day:"16"}, {Day:"17"}, {Day:"18"}, {Day:"19"}, {Day:"20"}, {Day:"21"}, {Day:"22"}, {Day:"23"}, {Day:"24"}, {Day:"25"}, {Day:"26"}, {Day:"27"}, {Day:"28"}, {Day:"29"}, {Day:"30"}, {Day:"31"})**

5. Add a **[Label](controls/control-text-box.md)** control, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**Text(Date(Value(Year.SelectedText.Value), Value(Month.SelectedText.Value), Value(Day.SelectedText.Value)), DateTimeFormat.LongDate)**
   
    **Wednesday, January 1, 2014** is listed by default. Select different values in the **[Drop down](controls/control-drop-down.md)** controls to change the date in the **[Label](controls/control-text-box.md)** control.

You may need to convert data that you didn't expect. If you add **[Text input](controls/control-text-input.md)** controls instead of **[Drop down](controls/control-drop-down.md)** controls, a user may enter an incorrect date, such as May 45. The **[Date](functions/function-date-time.md)** function handles atypical data in the following ways:

* If a year value is between 0 and 1899 (inclusive), the function adds that value to 1900 to calculate the year.
* If a year value is between 1900 and 9999 (inclusive), the function uses that value as the year.
* If a year value is less than 0 or is 10000 or greater, the function returns an error value.
* If a month value is greater than 12, the function adds that number of months to the first month of the specified year.
* If a month value is less than 1, the function subtracts that many months, plus 1, from the first month of the specified year.
* If a day value is greater than the number of days in the specified month, the function adds that many days to the first day of the month and returns the corresponding date from a subsequent month.
* If a day value is less than 1, the function subtracts that many days, plus 1, from the first day of the specified month.

## Calculate times based on hours, minutes, and seconds

1. Add two **Drop-down** lists named **Hour** and **Minute**.

2. Set the **[Items](controls/properties-core.md)** property of **Hour** to this formula:
   <br>**Table({Hour:"9"}, {Hour:"10"}, {Hour:"11"}, {Hour:"12"}, {Hour:"13"}, {Hour:"14"}, {Hour:"15"}, {Hour:"16"}, {Hour:"17"})**

3. Set the **[Items](controls/properties-core.md)** property of **Minute** to this formula:
   <br>**Table({Minute:"0"}, {Minute:"15"}, {Minute:"30"}, {Minute:"45"})**

4. Add a **[Label](controls/control-text-box.md)** control, and set its **[Text](controls/properties-core.md)** property to this formula:  
   <br>**Text(Time(Value(Hour.SelectedText.Value), Value(Minute.SelectedText.Value),0), DateTimeFormat.ShortTime)**

5. Select **15** in **Hour** and **45** in **Minute**.
   
    The **[Label](controls/control-text-box.md)** control shows **3:45 PM**.
   
    You can add entries to **Hour** and **Minute** so that users can select from a bigger range of hours and a more precise number of minutes. You can also add a third **[Drop down](controls/control-drop-down.md)** control so that users can specify seconds. If you add a third list, set the **[Text](controls/properties-core.md)** property of the **[Label](controls/control-text-box.md)** control to the following expression:<br>**Text(Time(Value(Hour.Selected.Value), Value(Minute.Selected.Value), Value(Second.Selected.Value)), DateTimeFormat.LongTime)**

### See also

[Date picker control examples](controls/control-date-picker.md#examples)

---

## Create and update a collection in a canvas app

Source: [create-update-collection.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-update-collection)

*Create a collection, add items to the collection, and remove one or all items from a collection in a canvas app.*

# Create and update a collection in a canvas app

Use a collection to store data that users can manage in your app. A collection is a group of items that are similar, such as products in a product list. For more information about different types of variables, including collections, see [Understand canvas-app variables](working-with-variables.md).

## Prerequisites

- [Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) by providing the same credentials that you used to sign up.
- Create an app or open an existing app in Power Apps.
- Learn how to [configure a control](add-configure-controls.md) in Power Apps.

Watch this video to learn how to create and update a collection:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=b709db8a-7d9c-4869-b2f7-76027df3bee0]

## Create a multicolumn collection

1. In Power Apps Studio, add a **Text input** control.

1. Rename the control by selecting its ellipsis in the left navigation pane, selecting **Rename**, and then typing **ProductName**.

   :::image type="content" source="./media/create-update-collection/rename-textbox.png" alt-text="Screenshot that shows you how to rename a control.":::

1. Add a **Drop down** control.

   :::image type="content" source="./media/create-update-collection/add-dropdown.png" alt-text="Screenshot that shows how to add a dropdown list.":::

1. Rename the **Drop down** control **Colors**, and make sure that the **Items** property is selected in the property list.

   :::image type="content" source="./media/create-update-collection/items-property.png" alt-text="Screenshot that shows the Items property next to the formula bar.":::

1. In the formula bar, replace **DropDownSample** with this expression:

    `["Red","Green","Blue"]`

1. Add a **Button** control, set its **Text** property to **"Add"**, and set its **OnSelect** property to this formula:

    ```power-fx
    Collect(
        ProductList,
        {
            Product: "ProductName.Text",
            Color: "Colors.Selected.Value"
        }
    )
    ```

1. To preview the app, press `F5` or select the play button. Type some text into **ProductName**, select an option in **Colors**, and then select **Add**.

1. Repeat the previous step at least two more times, and then press `Esc`.

1. Select the **Variables** pane and then select **Collections** to see the collections that you created.

   :::image type="content" source="./media/create-update-collection/collections.png" alt-text="Screenshot that shows the Collections section of the Variables list.":::

## Show a collection

1. Select **Insert** > **Vertical gallery** control.

1. Set the gallery's **Items** property to **ProductList**.

1. Select the gallery in the tree view and then select **Fields**.

1. Set the subtitle field to **Color**, and set the title field to **Product**.

1. Select **Layout** > **Title and subtitle**.

   :::image type="content" source="./media/create-update-collection/change-layout.png" alt-text="Screenshot that shows the Layout tab with Title and subtitle tile selected.":::

## Remove one or all items

1. Select the gallery and add a **Trash** icon to the gallery template.

1. Set the icon's **OnSelect** property to this formula:

    `Remove(ProductList, ThisItem)`

1. Outside the gallery, add a button, set its **Text** property to **"Clear"**, and set its **OnSelect** property to this formula:

    `Clear(ProductList)`

1. While holding down the Alt key, select the **Trash** icon for an item to remove that item from the collection, or select the **Clear** button to remove all items from the collection.

## Put a list into a collection

1. [Create a connection to a list created using Microsoft Lists](connections/connection-sharepoint-online.md#create-a-sharepoint-connection).

1. Add a button, and set its **[OnSelect](controls/properties-core.md)** property to this function, replacing *ListName* with the name of your list:

    `Collect(MySPCollection, ListName)`

    This function creates a collection named **MySPCollection** that contains the same data as your list.

1. Select the button while holding down the `Alt` key.

For information about how to show data in a form (with drop-down lists, date pickers, and people pickers), see [Edit form and Display form controls](controls/control-form-detail.md).

## Next steps

- Review the [reference article](functions/function-clear-collect-clearcollect.md) for the **Collect** function.
- Learn how to shape data in a collection by using the [AddColumns, DropColumns, RenameColumns, and ShowColumns](functions/function-table-shaping.md) functions.

---

## Show information about a user in a canvas app

Source: [show-current-user.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/show-current-user)

*Learn about how to display the name and email address of the signed-in user in a canvas app.*

# Show information about a user in a canvas app

In Power Apps, show the full name, the email address, and the picture that's associated with the user who's signed in to a canvas app. You can use this information, for example, to automatically fill in a form.

For example, you can use this feature to:

* Create a sign-up "sheet" for users to attend training, volunteer for events, check in at a kiosk, and more.
* Display the full name on a Human Resources app.
* Automatically enter an email address when contacting your helpdesk.

Basically, you can use this anywhere users would benefit from a form or labels that are populated automatically

## Prerequisites

1. Create a [blank canvas app](../maker/canvas-apps/create-blank-app.md).
1. Learn how to [add and configure controls](../maker/canvas-apps/add-configure-controls.md).

## Show user details

1. On the **Insert** tab, click or tap **Media**, and then click or tap **Image**.
   
   ![Insert media][2]
2. Set the **[Image](controls/properties-visual.md)** property to this formula:
   <br>**User().Image**
   
    ![Image property][3]
3. On the **Insert** tab, click or tap **Text**, and then click or tap **Label**:  
   
    ![Text label][4]
4. Set the **[Text](controls/properties-core.md)** property to this formula:
   <br>**User().FullName**
   
   ![Text property with formula][6]
   
   When you do this, the label is automatically populated with your full name. Move the label so it's below the image control, similar to the following:
   
   ![Image of label][5]
5. Add another label, and set its **[Text](controls/properties-core.md)** property to this formula:
   <br>**User().Email**  
   
    ![Text property with user email][8]
   
    When you do this, the label is automatically populated with your email address. Move the label so it's below the first label, similar to the following:  
   
    ![Image with name and email][7]

[2]: ./media/show-current-user/add-image.png
[3]: ./media/show-current-user/imageproperty.png
[4]: ./media/show-current-user/insertlabel.png
[5]: ./media/show-current-user/label.png
[6]: ./media/show-current-user/textproperty.png
[7]: ./media/show-current-user/secondlabel.png
[8]: ./media/show-current-user/email.png
[9]: ./media/show-current-user/preview.png

---

## Use Power Automate pane

Source: [working-with-flows.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-flows)

*Learn how to use Power Automate pane to work with flows in Power Apps.*

# Use Power Automate pane

Create new flows or add and edit existing flows using the Power Automate pane within Power Apps Studio. The Power Automate pane is enabled by default.

> [!IMPORTANT]
> Arguments that pass from Power Apps to Power Automate are visible as network traffic and can be intercepted. Most traffic is likely harmless data that are irrelevant outside the application, for example arguments like "yes" or "Redmond".
>
> Evaluate the parameters passed to Power Automate and consider the consequences (if any) if they're changed by an exernal actor. To mitigate risks, validate the parameter values passed.  
>
> For example, if you send sensitive data to a person in your organization through email, for example `someuser@contoso.com`, validate the address in Power Automate. You can check the incoming arguments to confirm the organization, `@contoso.com`, and only allow the flow to proceed if the right organization is present.

## Create a new flow

1. Open a [new](data-platform-create-app.md) or an [existing](edit-app.md) app in Power Apps Studio.

2. On the app authoring menu, select **Power Automate**.

   :::image type="content" source="media/working-with-flows/power-automate-button.png" alt-text="A screenshot highlighting the Power Automate option in the left pane.":::

3. In the Power Automate pane, select **Create new flow**.

   :::image type="content" source="media/working-with-flows/create-new-flow.png" alt-text="A screenshot showing the Create your flow screen having several options from which to choose a flow template.":::

This action opens the **Create your flow** modal dialog within Power Apps Studio. You can choose to create the flow from the available templates, or create a flow from scratch.

### Start with a template

Power Automate provides several flow templates that you can choose from by default. This section explains how to create a flow using such available templates from within Power Apps Studio.

1. From the list of available templates, select a template of your choice. For this example, we use **Click a button in Power Apps to send an email**.

   :::image type="content" source="media/working-with-flows/selected-flow-template.png" alt-text="A screenshot showing Click a button in Power Apps to send an email template.":::

1. The next step shows the connections required to create a flow based on the selected template. More information: [Connectors overview](connections-list.md)

   :::image type="content" source="media/working-with-flows/connections.png" alt-text="A screenshot showing connections required by the flow.":::

1. (Optional) You can use **Edit in advanced mode** to update the connection, and customize the flow template. When done, select **Save** to save the flow. Skip the next step since your flow creation process is now complete.

1. Select **Next** > **Create** to create the flow.

    The flow now appears in the list of flows inside the Power Automate pane, under the **In your app** section.

    :::image type="content" source="media/working-with-flows/flow-in-your-app.png" alt-text="A screenshot showing the flow added to your app.":::

    > [!TIP]
    > For more information about creating cloud flows from templates, see [Create a cloud flow from a template](/power-automate/get-started-logic-template).

### Create from blank

Instead of using the available templates, you can create a flow from scratch, and customize the steps as per your requirement.

1. Select **Create from blank**.

1. Add and customize the flow with steps and actions, as shown in the following example.

    :::image type="content" source="media/working-with-flows/customize-blank-flow.png" alt-text="A screenshot showing example workflow.":::

1. When done, select **Save** from upper right corner of the screen.

    > [!TIP]
    > For more information about customizing and configuring cloud flows, see the **How to** articles starting from [Add multiple actions and advanced options to a cloud flow](/power-automate/multi-step-logic-flow).

## Add an existing flow

You might have access to the existing flows in the environment where you're creating your app. To add and use these flows in your app, select **Add a flow**, and then choose the flow from the **Add a flow from this environment** section.

:::image type="content" source="media/working-with-flows/add-existing-flow.png" alt-text="A screenshot showing the option to add existing flows from the current environment.":::

> [!TIP]
> You can hover over the flow to see more details before adding to your app.

You must meet the following requirements to be able to add an existing flow to a canvas app:

- Have access to the flow
- Have access to see the flows that are part of the same solution
- Have a Power Apps trigger for your flows.

After being added, the flow will appear under the **In your app** section inside the Power Automate pane.

## Reference a flow

To reference the added flow, update the formula bar for the control or component within Power Apps Studio with the flow details. For example, to reference a flow named "PowerAppsbutton" that triggers an email without accepting any input parameters, use the following formula on the button's **OnSelect** property:

```power-fx
PowerAppsbutton.Run()
```

:::image type="content" source="media/working-with-flows/reference-flow.png" alt-text="A screenshot showing a flow added to the OnSelect property of the button with a formula.":::

This behavior is different from how the reference to a flow works within Power Apps Studio if the Power Automate pane is disabled.

When you add a flow with the Power Automate pane disabled, you must choose a behavior property of the control or the component that you want to associate with the flow. Adding a flow, in this case, clears any formula already associated with the chosen property (when the flow reference is added). Any existing formula gets removed, and you must carefully make a copy of the existing formula before adding the flow in order to preserve it. You can then paste your copied formula back after the flow reference is added.

For example, on a button's OnSelect property, adding the flow removes your existing formula, and you have to carefully make a copy of the existing formula before adding the flow. The following example shows the process with the Power Automate pane disabled. In this case, the formula added for the button property is removed to reference the added flow.

:::image type="content" source="media/working-with-flows/old-method.png" alt-text="A screenshot showing flow added to OnSelect property of the button that replaces existing formula for the button property." border="false":::

Whereas with the Power Automate pane enabled, any existing formula is preserved automatically (isn't removed). You can add the flow reference in the formula for a behavior property as per your requirement.

The following example shows the process with the Power Automate pane enabled. When the flow is added, the existing formula for the button's OnSelect property is preserved, and the flow reference isn't added automatically.

:::image type="content" source="media/working-with-flows/new-method.png" alt-text="A screenshot showing flow added to OnSelect property of the button that doesn't get replaced after the flow addition." border="false":::

Now you can reference the flow through the regular process of updating the formula for the control or component&mdash;as explained earlier.

## Edit an existing flow

You can now edit flows added to your app without leaving Power Apps Studio.

1. Under the **In your app** section of the Power Automate pane, select **...** (ellipsis) to the right of a flow.

1. Select **Edit**.

    :::image type="content" source="media/working-with-flows/edit-flow.png" alt-text="A screenshot showing the option to edit an existing flow.":::

    The flow opens inside the editor.

    :::image type="content" source="media/working-with-flows/edit-flow-editor.png" alt-text="A screenshot showing the flow open in editor for customization.":::

1. Make your changes, and then select **Save**.

    > [!IMPORTANT]
    > To avoid losing unsaved changes, ensure you select **Save** before closing the editor.

## Refresh a flow

If any changes are made to the flow in [Power Automate](https://make.powerautomate.com) (instead of using Power Apps Studio), refresh your flow to get the latest changes.

To refresh the flow and pull the latest changes, select **...** (ellipsis) to the right of your flow, and then select **Refresh**.

:::image type="content" source="media/working-with-flows/refresh-flow.png" alt-text="A screenshot showing the option to refresh the flow and pull in the latest changes.":::

A loading spinner appears, and the flow is refreshed.

  >[!IMPORTANT]
  > After making changes to a flow outside of Power Apps Studio, you must perform this step; otherwise, the flow may fail to run—even in previously published apps. Skipping this step can also lead to performance issues in the Power Platform admin center, as each time the canvas app runs, it will try to validate the flow's connections using outdated information, which may not succeed.

## Remove a flow

To remove a flow from your app, select **...** (ellipsis) to the right of your flow, and then select **Remove from app**.

:::image type="content" source="media/working-with-flows/remove-flow.png" alt-text="A screenshot showing the option to remove the flow from the app.":::

This action only removes the flow from the app, while the flow remains intact in the environment. You can add the flow again to the same app, or use it in other apps.

## Classic Power Automate experience

The Power Automate pane is now enabled by default. To use the classic Power Automate experience to [create a flow](using-logic-flows.md), switch back to the old experience manually.

> [!IMPORTANT]
> It’s recommended that you use the [Power Automate pane](working-with-flows.md) to create a flow. The classic Power Automate experience should only be used for troubleshooting. The classic experience will be retired soon and won't be available.

1. Open a [new](data-platform-create-app.md) or an [existing](edit-app.md) app in Power Apps Studio.

1. Select **Settings** at the top.

1. Select **Upcoming features**.

1. Under the **Retired** tab, select **Enable Classic Power Automate pane** to set the toggle to **On**. 

### See also

- [Add and configure controls](add-configure-controls.md)

---

## Start a flow in a canvas app

Source: [using-logic-flows.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/using-logic-flows)

*Learn about how to create a flow that performs one or more tasks after an event, such as a user selecting a button, occurs in a canvas app.*

# Start a flow in a canvas app (retired)

You can use Power Automate to create logic that performs one or more tasks when an event occurs in a canvas app. For example, you can configure a button that performs a single task or multiple tasks. When the button is pressed, an item is created in a list (Microsoft Lists), an email or meeting request is sent, and a file is added to the cloud. You can configure any control in the app to start the flow, which continues to run even if you close Power Apps.

> [!NOTE]
> When a user runs a flow from within an app, that user must have permission to perform the tasks that are specified in the flow. Otherwise, the flow will fail.

## Enable classic Power Automate experience

By default, the new [Power Automate pane](working-with-flows.md) is enabled by default. To use the classic Power Automate experience to create a flow, switch back to the old experience manually.

> [!IMPORTANT]
> It’s recommended that you use the [Power Automate pane](working-with-flows.md) to create a flow. The classic Power Automate experience should only be used for troubleshooting. The classic experience will be retired soon and won't be available.

1. Open a [new](data-platform-create-app.md) or an [existing](edit-app.md) app in Power Apps Studio.

1. Select **Settings** at the top.

1. Select **Upcoming features**.

1. Under the **Retired** tab, select **Enable Classic Power Automate pane** to set the toggle to **On**.

## Prerequisites

- [Sign up](../signup-for-powerapps.md) for Power Apps.
- Learn how to [configure a control](add-configure-controls.md).
- A SharePoint site with two lists.
  - List **RepairShop** contains Title, and ContactEmail columns.
  - List **Assets** contains Title, AssetType, and RepairShop columns. The AssetType column is a choice column with choices such as "Desktop" or "Laptop".
  - The RepairShop column in Assets list is a lookup column that gets values from the ContactEmail column in RepairShop list.
  - Create a few items in the **RepairShop** list for sample contacts.

## Create a flow

In this section, you create a flow using Power Automate that creates an item in a list using the input value for the list column from an app created using Power Apps. You create the app that uses this flow in the next section.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left-pane, select **Flows**.

1. Select **+ New flow** > **Instant cloud flow**.

1. Enter flow name, such as **FlowInApp**.

1. Under **Choose how to trigger this flow**, select **Power Apps**.

    :::image type="content" source="./media/using-logic-flows/ceate-instant-flow.png" alt-text="Screenshot that shows the flow option that lets's you choose how to trigger a Power Apps flow.":::

1. Select **Create**.

1. Select **+ New step**.

1. Under **Choose an operation**, search for or select **SharePoint** connector.

    :::image type="content" source="./media/using-logic-flows/choose-sharepoint-connector.png" alt-text="Screenshot that shows where you can search or choose a SharePoint connector when you choose an operation.":::

1. Search for, or select **Create item** action.

   :::image type="content" source="./media/using-logic-flows/sharepoint-create-item-action.png" alt-text="Screenshot that shows where you can search or choose the create item action.":::

1. For **Site Address**, enter or choose your SharePoint site that has the lists **Assets** and **RepairShop**.

1. For **List Name**, select the **Assets** list.

   :::image type="content" source="./media/using-logic-flows/site-and-list.png" alt-text="Screenshot that shows the site address and list name fields.":::

1. For **Title**, choose **Ask in Power Apps** from the **Dynamic content** tab. The action automatically updates to **Createitem_Title**.

   :::image type="content" source="./media/using-logic-flows/ask-in-powerapps-create-title.png" alt-text="screenshot that shows the Ask in Power Apps button where a title gets created." lightbox="./media/using-logic-flows/ask-in-powerapps-create-title.png":::

1. Choose values for **AssetType Value**, and **RepairShop Id** of your choice.

    :::image type="content" source="./media/using-logic-flows/assettype-repairshopid.png" alt-text="Screenshot that shows the AssetType Value and RepairShop Id fields.":::

1. Select **Save**.

> [!IMPORTANT]
> Arguments that pass from Power Apps to Power Automate are visible as network traffic and can be intercepted. Most traffic is likely harmless data that are irrelevant outside the application, for example arguments like "yes" or "Redmond".
>
> Evaluate the parameters passed to Power Automate and consider the consequences (if any) if they're changed by an exernal actor. To mitigate risks, validate the parameter values passed.  
>
> For example, if you send sensitive data to a person in your organization through email, for example `someuser@contoso.com`, validate the address in Power Automate. You can check the incoming arguments to confirm the organization, `@contoso.com`, and only allow the flow to proceed if the right organization is present.

## Add a flow to an app

In this section, you create an app using Power Apps that uses the flow created in the earlier section. The app uses text entered in a text box when the button is selected to trigger the flow to create an item in the selected list.

1. Create a [blank canvas app](create-blank-app.md) with a name such as **AppWithFlow**.

1. Select **+** (Insert) on the left-pane.

1. Select **Text input** control.

1. Select **Button** control.

1. On the canvas, move the button control below the text input control.

    ![Design the app.](./media/using-logic-flows/assettype-repairshopid.png "Design the app")

1. Select **Action** menu at the top, and then select **Power Automate**.

    > [!NOTE]
    > Adding a flow to the selected control or component clears out any existing formula for the chosen property. For example, when you add a flow to a button's `OnSelect` property that has a complex formula, the flow addition clears out this formula. Ensure you make a copy of the formula before adding the flow. However, this behavior is different when adding flow with the Power Automate pane enabled. Learn more in [Reference a flow](working-with-flows.md#reference-a-flow).

    :::image type="content" source="./media/using-logic-flows/action-power-automate.png" alt-text="Screenshot that shows what an associated flow looks like in Power Automate." lightbox="./media/using-logic-flows/action-power-automate.png":::

    Alternatively, if you enabled the **Enable Power Automate pane** preview feature, you can choose your flow from the left-pane inside Power Apps Studio.

    :::image type="content" source="media/using-logic-flows/power-automate-pane-add-flow.png" alt-text="A screenshot showing the Power Automate button in the left pane with the Add Flow dialog opened, showing the FlowInApp flow available to add to the app.":::

   More information: [Use Power Automate pane (preview)](working-with-flows.md)

1. Select **FlowInApp**.

1. In the formula bar, remove the formula for the selected **OnVisible** property.

1. Select the text input control.

1. From the top-left side of the screen, select the property list drop-down, and then select the **Default** property.

1. In the formula bar, change the default property value from `"Text input"` to `"Enter Asset Title"`.

1. Select the button control.

1. From the top-left side of the screen, select the property list drop-down, and then select the **Text** property.

1. In the formula bar, change the text property value from `"Button"` to `"Create Asset"`.

1. From the top-left side property list, select the **OnSelect** property for the button.

1. Enter the following formula in the formula bar.

    ```power-fx
    FlowInApp.Run(TextInput1.Text)
    ```

    In this formula, **FlowInApp** is the name of the flow you added using Power Automate. The **.Run** specifies the flow to execute. The flow executes with **TextInput1** text input control added to this canvas, with the value entered in this text box (**.Text**).

    When this button is selected, the app runs the flow with the value from the text input control, passing the text value to the flow to execute. And the flow creates the list item with this text input value along with rest of the selection inside the flow configuration.

    :::image type="content" source="./media/using-logic-flows/onselect-button.png" alt-text="Screenshot that shows the OnSelect property formula for a button on the canvas.":::

1. [Save and publish](save-publish-app.md) the app.

## Test the flow

Now that you have both the flow and the app created, run the app and verify the creation of an item inside the selected list.

1. In [Power Apps](https://make.powerapps.com), select **Apps**, and then, select the **AppWithFlow** app.

   :::image type="content" source="./media/using-logic-flows/run-app-with-flow.png" alt-text="Screenshot that shows where to find the Run AppWithFlow app.":::

1. Enter a value in the text input box, and then select **Create Asset**.

   :::image type="content" source="./media/using-logic-flows/run-app.png" alt-text="Screenshot that shows the entered value and the Create Asset button.":::

1. Verify that the item is created in your list.

   :::image type="content" source="./media/using-logic-flows/check-sharepoint-list.png" alt-text="Screenshot that shows the assets created in SharePoint.":::

Now that you created a sample app that runs a flow and adds an item inside a list, you can create more complex applications. Your apps can interact with Power Automate and manipulate data inside various data sources.

### Related information

- [Use Power Automate pane (preview)](working-with-flows.md)
- [Add and configure controls](add-configure-controls.md)

---

## Convert rules to expressions

Source: [working-with-rules.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-rules)

*Learn about how to convert rules to expressions in canvas apps.*

# Convert rules to expressions

The capability to create rules in canvas apps for automated app modification based on specified criteria will be removed. This feature was retired in 2019 and will now be fully removed.

You'll have a few months to convert the rules into expressions using a converter. If there are any rules remaining in your canvas app that haven't been converted by the end of this period, the system will perform the conversion automatically.

> [!IMPORTANT]
> Effective October 14, 2019, the rules feature in canvas apps is deprecated. More information: [Blog: Canvas Rules feature deprecation](https://powerapps.microsoft.com/blog/canvas-rules-feature-deprecation/).

## Convert rules

When you edit an app that has rules, you'll receive a prompt to convert them. The converter helps in migrating the rules within your app to a format that is compatible with future versions of Power Apps Studio. By utilizing the rules conditions in your app, the converter substitutes the references with corresponding inline expressions.

Follow these steps to convert rules in your app:

1. Open your app for editing and go to the Rules panel.
2. On the warning message, select **Convert rules**.

   > [!div class="mx-imgBorder"] 
   > ![Convert rules.](./media/working-with-rules/convert-rules.png)

3. A dialog opens, which shows all the rules which will be converted. The rule name is shown on the left, and its associated conditional expression is shown on the right. On the **Convert rules** dialog box, select **Convert now**.

   > [!div class="mx-imgBorder"] 
   >![Convert now.](./media/working-with-rules/rules-1.png)

When the conversion is complete, a notification appears to alert you whether the conversion was successful. Formulas that previously referenced rule names have been updated to directly use their associated conditional expression instead.

Before the conversion, the Power Fx formula references rule names in the formula in place of their associated conditional expressions.

> [!div class="mx-imgBorder"] 
> ![Before the conversion.](./media/working-with-rules/rules-3.png)

After the conversion, rule name references have been removed and replaced. In this example, **Rule2** was converted to **Slider1.Value > 50**.

> [!div class="mx-imgBorder"] 
> ![After the conversion.](./media/working-with-rules/rules-2.png)


## Reverting the conversion

When the conversion is done, the rules are converted to the corresponding expression. During the conversion period, you can revert your changes to bring the rules back to your app for review and troubleshooting if necessary. While in the same session, you can use the Undo button or Ctrl-Z to revert the rule conversion. If you save the app, you can restore the previous version to revert the change. However, you will be prompted to convert the rules again the next time the app is opened for editing.

## Known Issues

If your rules are in an error state or are empty, they will be replaced with the following formula: Boolean(Blank()). This formula preserves the behavior of rules in this state.

---

## Create or update bulk records in Power Apps

Source: [create-update-records-bulk.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-update-records-bulk)

*Learn how to update or create bulk records in canvas apps.*

# Create or update bulk records in Power Apps

Updating or creating records in bulk allows you to act on many records at once. Here are some scenarios where you would want to bulk *update* records:

- You have many photos and want to upload them all at once.
- You want to submit a time sheet with a week’s data at once.

 You might also want to *create* new records in bulk. For example, when your app has to select many images, you might want to upload them all at once.

This article explains how to update or create bulk records depending on your scenario.

## Formulas to bulk update records

The formulas in this section can be used to bulk update records in canvas apps.

- [Patch() function](functions/function-patch.md#modify-or-create-a-set-of-records-in-a-data-source-1)&mdash;Use this function when the collection matches the data source.

    ```power-fx
    Patch( DataSource, Collection )
    ```

- [ForAll() function](functions/function-forall.md) + [nested Patch](functions/function-patch.md) + [disambiguation operator](functions/operators.md)&mdash;Use this function when the data sources have different columns that you need to join.

    ```power-fx
    ForAll( Collection,
        Patch( DataSource, 
            LookUp( DataSource, Id = Collection[@Id] ),
            { Column: Value }
        )
    )
    ```

- [AddColumns() function](functions/function-table-shaping.md)&mdash;This function can be used to provide a lookup reference in the Collection that contains the updates to the DataSource if it doesn't have fields that easily reference the table.



## Example of a checklist

This example uses a checklist of tasks. When you're done with a few tasks, you can mark them as complete. You could extend this scenario to a product launch checklist, home inspection checklist, or other lists.

The following screenshot shows the checklist items in Microsoft Excel file. You can check off the tasks related to your blogging or posting on social media in this example. The table in Excel is called  `ChecklistItems`. 

The example uses collections to demo this behavior. The approach works for any tabular backend of your choice.

> [!div class="mx-imgBorder"]
> ![alt text.](./media/create-records-update-bulk/bulk-update-records-1.png)

The Excel data is imported as static data into the app. On the `App.OnStart` property, `Collect()` the Excel ChecklistItems data into the `ChecklistItemsSource` collection. The `ChecklistItemsSource` collection will be used as the source data throughout the app.

This example uses a two screen app:

- **Screen 1**&mdash;Used to review the checklist items and mark them as complete.
- **Screen 2**&mdash;Used to create a new checklist item. The new item will be added to `ChecklistItemsSource` collection.

> [!div class="mx-imgBorder"]
> ![Screen1.](./media/create-records-update-bulk/bulk-update-records-2.jpg) ![Screen2](./media/create-records-update-bulk/bulk-update-records-3.jpg)

Every time a checklist item is checked, it's added into a collection called `CheckedItems`. It uses the formula below on the `OnCheck` event property of the checkbox control. If the item is already checked and is part of the collection, it's removed. If not, the checked item is added.

You can toggle the status between **Done** and **Pending**, or you can use the `Oncheck` and `OnUncheck` events:

```power-fx
If( !IsBlank( 
        LookUp( CheckedItems, Id = ThisItem.Id )
    ),
    Remove( CheckedItems, ThisItem ),
    Collect( CheckedItems, ThisItem )
)
```

## Create multiple records at once

There are different ways of bulk updating records depending on the scenario. This section explains how to create multiple records at once in canvas apps.

When the user selects **Done** in the above example, you need to update `ChecklistItemsSource` with changes from the CheckedItems collection.

### For columns with the same name

If your source and destination have the same column names, you can use a Patch statement. For example, `ChecklistItemsSource` and the `CheckedItems` collections have the same column names. You can use the formula below to update the source at once with all the changes.

```power-fx
Patch( ChecklistItemsSource, CheckedItems )
```

### For columns with different names

If the columns in source and destination tables vary, use ForAll with Patch instead.

With `ForAll()`, you must loop through each record using a condition. The condition is a comparison between similar columns (for example, `Id` column) of the different tables. This comparison becomes complicated when the source table and the destination table have the same column names (for example, if `ProjectId` was a column found in both `Project` and `PurchaseOrder` tables).

Here are the alternatives:

#### Use with disambiguation operator

To update the `Status` of `CheckedItems` to "Done", when the source and destination table column names are the same, use this formula:

```power-fx
ForAll( CheckedItems,
    Patch( ChecklistItemsSource, 
        LookUp( ChecklistItemsSource, Id = CheckedItems[@Id] ),
        { Status: "Done" }
    )
)
```

For each item in the `CheckedItems` collection, the Id (represented by the disambiguation operator `CheckedItems[@Id])` is compared against the Id column of the `ChecklistItemsSource` collection. Then, each matched record is updated with the status as "Done". The disambiguation operator is used when two columns belonging to different tables have the same name. If you don't use this disambiguation operator, you'll see that only the first record gets updated.

#### Use an extra label within the gallery

If you don't want to use an extra collection to store the checked items, you can try the following steps:
1. Create an extra label within the gallery template.
   1. Bind it to the Id column.
   1. Rename the label to IdText.

1. Remove the code on the **OnCheck** of the checkbox control mentioned above.

1. Write the following formula on the OnSelect event of the Done Button:

      ```power-fx
      ForAll(
          Filter( ChecklistGallery.AllItems,
            StatusCheckbox.Value = true
          ),
          Patch( ChecklistItemsSource,
            LookUp( ChecklistItemsSource, Id = IdText.Text ),
            { Status: "Done" }
          )
      )
    ```

Here, you're directly applying the filter on the Gallery's items to find the checked items. For each record in the filtered items, a match is found on the **ChecklistItemsSource** table by comparing the Id with value stored in IdText label.

The status is updated to "Done".

The disambiguation operator can't be used on the Gallery's items. Instead, you can store a label within the gallery and reference it for comparison.

#### Use an alternative to create a new column with a different label

This method is an alternative to using the disambiguation operator or a label inside gallery.

While creating a local copy of your data source, you can use the `AddColumns()` formula to create a new column with a different label (`NewId`) for the Id column in your source collection. When using ForAll with Patch, you compare the NewId column against the Id column in your source data.

## Bulk create records

You may want to create new records in bulk if, for example, you want to upload many images all at once.

Here's an example using [Example of a checklist](#example-of-a-checklist).

On the Create Checklist Items screen, each time you select **Add**, the information is stored in the `NewChecklistItems` collection. When you select **Submit**, `ForAll()` with `Patch()` are used to update the source collection.

```power-fx
ForAll( NewChecklistItems,
    Patch( ChecklistItemsSource,
        Defaults( ChecklistItemsSource ),{
            Id: Id,
            Category: Category,
            Description: Description,
            Status:Status
        }
    )
)
```

For each item in the `NewChecklistItems`, a new record is created (indicated by `Defaults(ChecklistItemsSource)`) in the `ChecklistItemsSource` collection. The `Id` is set to the `Id` from the `NewChecklistItems` collection. Similarly, `Category`, `Description`, and `Status` values are set.

### See also

- [Formula reference for Power Apps](formula-reference.md)

---

## Power Apps Ideas

Source: [power-apps-ideas.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/power-apps-ideas)

*Learn about Power Apps Ideas, its limitations and supportability, and how to benefit from the generated formulas.*

# Power Apps Ideas


[Power Fx](/power-platform/power-fx/overview) is the open-source programming language for low code. It enables millions of people with Excel-like skills to add advanced logic to their apps. However, sometimes it's not easy to write a formula, even for the most experienced Power Fx users, as it can sometimes take a lot of time searching for, learning about, and debugging complex formulas.

Power Apps Ideas is created to help everyone from the new makers to the seasoned IT pros to ease and speed up the formula authoring experience by using the power of AI models.

If you’re struggling with Power Fx and don’t want to spend time on it, try Power Apps Ideas.

## Use Power Apps Ideas in your app


When you're building a canvas app, Power Apps Ideas will automatically suggest ideas for supported controls such as **Gallery**, **Data table**, **Text box**, **Drop down**, **Combo box**, and **Text label**. 

When you select the name field in a gallery, you'll see an idea for a formula that you may want to use. However, if you select the plus icon, then you won’t see an idea because we currently don’t have ideas for icons. 

:::image type="content" source="media/power-apps-ideas/ideas-example.gif" alt-text="Suggested ideas prompt.":::

There are two methods to benefit from Power Apps Ideas in your app.

Transform natural language to Power Fx formulas

You can enter your requirements in plain natural language (currently limited to English (en-us)), and Power Apps will transform your requirement to a Power Fx formula.

For details, go to [Transform natural language to Power Fx formulas](power-apps-ideas-transform.md).


## Dismiss an idea

If you don’t want to see Ideas, select the close button (**X**) and then confirm that you don’t want to see Ideas anymore. 

If you want to see Ideas again, right-click on the control to see suggested Ideas.


## Next steps

- [Transform natural language to Power Fx formulas](power-apps-ideas-transform.md)

### See also

[Formula reference](formula-reference.md)

---

## Transform natural language to Power Fx formulas

Source: [power-apps-ideas-transform.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/power-apps-ideas-transform)

*Learn how to use Power Apps Ideas to transform natural language into Power Fx formulas.*

# Transform natural language to Power Fx formulas 


Power Apps Ideas can generate ideas for formulas using the following controls on different properties:

- **Gallery**
- **Data table**
- **Text box**
- **Drop down**
- **Combo box**
- **Text label** 


Power Apps Ideas also supports Microsoft Dataverse, Microsoft Lists, SharePoint library, and Excel as connectors. So, if you're using one of the supported controls and want to write a formula for Gallery or Dropdown items, or for Label’s text content, color, or visibility, then check out Power Apps Ideas.

For example, instead of figuring out how to write the following formula ...

```power-fx
Filter('Table1', StartsWith('fullname', "Yvonne"))
```

... You can type `'name starts with Yvonne` instead.

To begin, let’s look at a simple app to see how you can use Power Apps Ideas to help write formulas.

You can follow the steps mentioned in [Create a canvas app from Microsoft Dataverse](data-platform-create-app.md) to generate that app using the **Accounts** table from Dataverse.

1. Select **BrowseGallery1,** which is bound to the **Accounts** table.

1. Select **Sort, filter, and search** on the ideas box. 

   :::image type="content" source="media/power-apps-ideas/sort-filter.png" alt-text="Sort, filter, and search.":::

1. Select one of the default suggestions to check how it works or start entering your own query in natural language such as English (en-us).

    :::image type="content" source="media/power-apps-ideas/sort-filter-ideas.png" alt-text="Suggested ideas for sorting and filtering.":::

1. When typing you can use the default query, modify it, or describe it in your own way.

1. You'll see one or more formula suggestions produced. Let’s use the example **search accounts where name in textinput**. You'll see two suggestions in the results. Each of those formula suggestions includes three parts:

    - **Accounts** where the text in **TextInput1** appears in **name**. This is trying to explain what the suggested formula is doing so that it's easier for users who aren't familiar with Power Fx to understand the result. The names of the components used in the app are shown in bold.
    
    - **Apply to: Items**: This suggests which property the formula will be applied to. As Power Apps controls have many properties, Ideas can identify which property a formula should be applied to.

    - The formula suggestion in this scenario is `Search('Accounts', TextInput1.Text, "name")`.

        :::image type="content" source="media/power-apps-ideas/Ideas_example_c7.png" alt-text="Suggested formula based on entered search scenario.":::

1. Select your preferred suggestion and then select **Apply**. In this case, let's select the first suggestion since it's the best fit. The formula gets updated automatically and runs so you can check the result in your app. You can then decide whether to keep the selected formula or modify it.

## More examples

Consider the following examples for inspiration while working with Power Apps Ideas.

| Scenario | Description | Ideas example |
| --- | --- | --- |
|**Sort your table** |Sort by a single column |sort accounts by Account Name|
| | |sort accounts by Account Name A-Z|
| | |sort accounts by Account Name Z-A|
| |Sort accounts by Account Name and Created On|
| | |sort accounts by Account Name A-Z and Created On latest on top|
| |Sort existing tables |sort Gallery3 by Account Name Z to A|
|**Filter or search table by some conditions**|A number condition|accounts with length of Account Name bigger than 10|
| |A date condition|accounts created a week ago, accounts modified last 3 days|
| |A text condition|accounts with name contains Karen|
| |A few conditions|accounts whose name contains Karen and created 7 days ago|
| |A choice value|inactive accounts|
| |Search table by user input|search accounts with name in textinput|
| |Find a single record|first record in accounts where name contains Karen|
| |Find records on the top or the bottom of the table|top 10 accounts|
| | |last 10 accounts|
|**Conditional formatting (apply to color and visible)** |A number condition|accounts with length of Account Name bigger than 10|
| |A date condition|red if created 7 days ago|
| |A text condition|blue if name contains Karen|
|**Text generation** |Numbers|count of gallery sum of slider1 and slider2|
||String|label4 and label5 Trim textinput1First 3 characters of TextInput1|



## Best practices

To get the best results, follow these tips when writing the plain natural language query in the Ideas pane.

- Leverage default queries to see what kind of scenarios are supported.
- Be precise in your query. Ideas can recognize controls such as tables and columns. However, if you don't get a suggestion, try using the full name of the assets you’re referencing. For example, use **TextInput1** when you have multiple text input controls in the app. This way the system knows which control you're referring to. 

## Limitations

> [!NOTE]
> We're improving the model so it can accomplish more complex tasks and support more functions, controls, and properties. If you have a wish list, submit your ideas through [Power Apps Ideas - Power Platform Community](https://ideas.powerapps.com/).

Power Apps Ideas currently has the following limitations:

- Regions and language: Currently available in environments created inside the United States, with English (en-us) set as the browser's default language.
- Recognizes control value of **TextInput**, **Dropdown**, **DatePicker**, **Slider**, **Toggle**, **Checkbox**, and **Radio** as input.

   | Controls | Properties | 
   | --- | --- |
   | **Gallery**, **Data table**, **Drop down**, **Combo box** | Items |
   | **Text Box**, **Label** | Text, Color, Visible |
   
- Data sources: Currently Ideas supports Dataverse tables, Microsoft Lists, and Excel sheets.
- Functions: See [Supported Power Fx functions](#supported-power-fx-functions). We’ll continue to add support for more functions.
- Data types: Supports Text, Whole Number, Date and Time, Date Only, Decimal Number, Choice, Choices, Yes/No Lookup. Not supported: File and Image.
- This feature's model understands some commonly used expressions in natural language. For example, it can translate from `latest on top`, `big to small` to a descending order and `oldest on top`, `small to big` to ascending order. And it can understand most of the context so even if you didn't specify the table names, it will make the best prediction based on the current table that is bound to the control.<br>  

## Supported Power Fx functions

Functions supported by the Power Apps Ideas feature:

:::row:::
   :::column span="":::
      [Abs](functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [Average](functions/function-aggregates.md)
   :::column-end:::
   :::column span="":::
      [Concat](functions/function-concatenate.md)
   :::column-end:::
   :::column span="":::
      [Countif](functions/function-table-counts.md)
   :::column-end:::
   :::column span="":::
      [Countrows](functions/function-table-counts.md)
   :::column-end:::
   :::column span="":::
      [Date](functions/function-date-time.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [DateAdd](functions/function-date-time.md)
   :::column-end:::
   :::column span="":::
      [DateDiff](functions/function-date-time.md)
   :::column-end:::
   :::column span="":::
      [DateTimeValue](functions/function-datevalue-timevalue.md)
   :::column-end:::
   :::column span="":::
      [DateValue](functions/function-datevalue-timevalue.md)
   :::column-end:::
   :::column span="":::
      [Day](functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Distinct](functions/function-distinct.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [EndsWith](functions/function-startswith.md)
   :::column-end:::
   :::column span="":::
      [Filter](functions/function-filter-lookup.md)
   :::column-end:::
   :::column span="":::
      [FirstN](functions/function-first-last.md)
   :::column-end:::
   :::column span="":::
      [Hour](functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [If](functions/function-if.md)
   :::column-end:::
   :::column span="":::
      [IsBlank](functions/function-isblank-isempty.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [IsEmpty](functions/function-isblank-isempty.md)
   :::column-end:::
   :::column span="":::
      [LastN](functions/function-first-last.md)
   :::column-end:::
   :::column span="":::
      [Lower](functions/function-lower-upper-proper.md)
   :::column-end:::
   :::column span="":::
      [Max](functions/function-aggregates.md)
   :::column-end:::
   :::column span="":::
      [Min](functions/function-aggregates.md)
   :::column-end:::
   :::column span="":::
      [Minute](functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Month](functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Not](functions/function-logicals.md)
   :::column-end:::
   :::column span="":::
      [Now](functions/function-now-today-istoday.md)
   :::column-end:::
   :::column span="":::
      [Power](functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [Proper](functions/function-lower-upper-proper.md)
   :::column-end:::
   :::column span="":::
      [Rand](functions/function-rand.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Round](functions/function-round.md)
   :::column-end::: 
   :::column span="":::
      [RoundDown](functions/function-round.md)
   :::column-end:::
   :::column span="":::
      [RoundUp](functions/function-round.md)
   :::column-end:::
   :::column span="":::
      [Search](functions/function-filter-lookup.md)
   :::column-end:::
   :::column span="":::
      [Second](functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Split](functions/function-split.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Sort](functions/function-sort.md)
   :::column-end:::
   :::column span="":::
      [SortByColumns](functions/function-sort.md)
   :::column-end:::
   :::column span="":::
      [StartsWith](functions/function-startswith.md)
   :::column-end:::
   :::column span="":::
      [Sum](functions/function-aggregates.md)
   :::column-end:::
   :::column span="":::
      [Time](functions/function-date-time.md)
   :::column-end:::
   :::column span="":::
      [TimeValue](functions/function-datevalue-timevalue.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Today](functions/function-now-today-istoday.md)
   :::column-end:::
   :::column span="":::
      [Trim](functions/function-trim.md)
   :::column-end:::
   :::column span="":::
      [TrimEnds](functions/function-trim.md)
   :::column-end:::
   :::column span="":::
      [Upper](functions/function-lower-upper-proper.md)
   :::column-end:::
   :::column span="":::
      [Weekday](functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Year](functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::

## Give feedback to Microsoft

If you have feedback for this feature—for example, you find the formula suggestions inaccurate or you have suggestions or ideas to share with us—you can find the feedback card in the Ideas panel. By selecting Send feedback, you can enter your thoughts. (Don't include confidential or personal information in your feedback.) 


Microsoft is committed to developing and deploying AI technologies in a responsible manner. If you find any inappropriate or absurd results generated by Power Apps
Ideas, look in the same feedback card for a [Report it now](https://msrc.microsoft.com/report/abuse) link below the feedback box that can help us keep our AI model behaving in a responsible manner. For a timely response, select **Threat type** as "URL" and **Incident type** as "Responsible AI" as shown in the following screenshot.

:::image type="content" source="media/power-apps-ideas/ideas-feedback-channel.png" alt-text="Give us feedback.":::



### See also

- [Formula reference](formula-reference.md)
- [Power Apps Ideas overview](power-apps-ideas.md)

---

