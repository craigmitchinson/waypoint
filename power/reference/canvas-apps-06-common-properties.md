# Power Apps Canvas Apps — Common Control Properties

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 6

## Contents

1. [Accessibility properties for Power Apps](#accessibility-properties-for-power-apps)
2. [Color and border properties in Power Apps](#color-and-border-properties-in-power-apps)
3. [Core properties in Power Apps](#core-properties-in-power-apps)
4. [Image properties in Power Apps](#image-properties-in-power-apps)
5. [Size and location properties in Power Apps](#size-and-location-properties-in-power-apps)
6. [Text properties in Power Apps](#text-properties-in-power-apps)

---

## Accessibility properties for Power Apps

Source: [properties-accessibility.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-accessibility)

*Reference information about properties related to accessibility in Power Apps.*

# Accessibility properties for Power Apps

Configuration of properties that aid alternative ways of interacting with controls suitable for users with disabilities.

## Properties

### AccessibleLabel
Label for screen readers.

An empty value for Image, Icon, and Shape controls will hide the controls from screen reader users.

### Live
How screen readers should announce changes to content. Available only in the **[Label](control-text-box.md)** control.

* When set to **Off**, the screen reader doesn't announce changes.
* When set to **Polite**, the screen reader finishes speaking before announcing any changes that occurred while the screen reader was speaking.
* When set to **Assertive**, the screen reader interrupts itself to announce any changes that occurred while the screen reader was speaking.

Learn how to [announce dynamic changes with live regions](../accessible-apps-live-regions.md).

### Role
Intended purpose of a control. Available only in the **[Label](control-text-box.md)** control.

This lets screen reader users know whether a **Label** is a heading and allows them to navigate quickly to different parts of the app. There should be exactly one **Heading1** in each screen that serves as the main heading. Use **Heading2** for subheadings. **Heading3** and **Heading4** can be used for finer hierarchies of headings.

Use **Default** for normal text.

### AcceptsFocus and TabIndex
Determines if the control participates in keyboard navigation.

You can use **AcceptsFocus** to configure keyboard navigation for [modern controls](./modern-controls/overview-modern-controls.md). [Classic controls](../reference-properties.md) use **TabIndex**.

| AcceptsFocus | TabIndex | Behavior | Default for |
|--------------|----------|----------|-------------|
| true | 0 or greater | Control participates in keyboard navigation, unless it's hidden or disabled. | [**Button**](control-button.md), [**Text input**](control-text-input.md), [**Combo box**](control-combo-box.md), and other typically interactive controls. |
| false | &minus;1 or less than 0 | Control does not participate in keyboard navigation. | [**Label**](control-text-box.md), [**Image**](control-image.md), [**Icon**](control-shapes-icons.md), and other typically non-interactive controls. |

Any keyboard navigation sequence can be achieved with just these properties, along with the use of the [**Container**](control-container.md) control. For **TabIndex**, we recommend using either 0 or -1 for simplicity.

Controls that have a **Visible** property value of *false* or a **DisplayMode** property value of **Disabled** are not included in keyboard navigation.

> [!IMPORTANT]
> **TabIndex** only affects keyboard navigation. A [logical control order](../accessible-apps-structure.md) is still necessary for screen reader users to understand app structure. Some screen reader users don't even use keyboards.


### See also

- [Create accessible apps](../accessible-apps.md)
- [Accessible app structure](../accessible-apps-structure.md)
- [Accessible colors in Power Apps](../accessible-apps-color.md)
- [Show or hide content from assistive technologies for canvas apps](../accessible-apps-content-visibility.md)
- [Announce dynamic changes with live regions for canvas apps](../accessible-apps-live-regions.md)
- [Use the Accessibility checker](../accessibility-checker.md)
- [Accessibility limitations in canvas apps](../accessible-apps-limitations.md)

---

## Color and border properties in Power Apps

Source: [properties-color-border.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-color-border)

*Reference information about the color and border properties in Power Apps.*

# Color and border properties in Power Apps

## Overview

Configure the style of a control based on how the user interacts with it.

You can specify colors in many ways:

- [**Color**](../functions/function-colors.md) enumeration: Specify color names from cascading style sheets, as in these examples:

  - **Color.Red**
  - **Color.Indigo**

- [**ColorValue**](../functions/function-colors.md) function: Specify text strings such as color names from cascading style sheets and hex-code notation (**#**), as in these examples:

  - **ColorValue( "AliceBlue" )**
  - **ColorValue( "#ff00ff" )**

- [**ColorFade**](../functions/function-colors.md) function: Specify how faded a color is, from fully black (-100%) to fully white (100%), as in this example:

  - **ColorFade( Color.Red, 50% )**

- [**RGBA**](../functions/function-colors.md) function: Specify the red, green, and blue components of a color from 0 to 255, and specify an alpha channel from 0% (fully transparent) to 100% (fully opaque), as in this example:

  - **RGBA( 255, 0, 255, 25% )**

Color properties can also reference other color properties. For example, **Label.PressedColor** may be set to the formula **Label1.Color**, automatically cascading a change from one property to another.

## Normal

These properties are in effect normally, when the user is not interacting with the control.

**BorderColor** – The color of a control's border.

- Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**BorderStyle** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

- Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**BorderThickness** – The thickness of a control's border.

- Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**Color** – The color of text in a control.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.


**Drop Shadow** - Adds shadow effects around the control.

- Applies to **[Horizontal container](control-horizontal-container.md)** and **[Vertical container](control-vertical-container.md)** controls.

**Fill** – The background color of a control.

- Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Screen](control-screen.md)**, **[Shape](control-shapes-icons.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

## Focused

These properties are in effect when the control is focused.

**FocusedBorderColor** – The color of a control's border when it has focus.

**FocusedBorderThickness** – The thickness of a control's border when it has focus.

- These properties apply to **[Add picture](control-add-picture.md)**, **[Attachments](control-attachments.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Check box](control-check-box.md)**, **[Combo box](control-combo-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

## Disabled

These properties are in effect when the control is disabled.  A control can be disabled if the **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**DisabledBorderColor** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, and **[Toggle](control-toggle.md)** controls.

**DisabledColor** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**DisabledFill** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

## Hover

These properties are in effect when the user hovers over the control with a mouse.

**HoverBorderColor** – The color of a control's border when the user keeps the mouse pointer on that control.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pie chart](control-pie-chart.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, and **[Toggle](control-toggle.md)** controls.

**HoverColor** – The color of the text in a control when the user keeps the mouse pointer on it.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**HoverFill** – The background color of a control when the user keeps the mouse pointer on it.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Shape](control-shapes-icons.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

## Pressed

These properties are in effect when a button or image control is pressed.

**PressedBorderColor** – The color of a control's border when the user taps or clicks that control.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pie chart](control-pie-chart.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, and **[Toggle](control-toggle.md)** controls.

**PressedColor** – The color of text in a control when the user taps or clicks that control.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**PressedFill** – The background color of a control when the user taps or clicks that control.

- Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

## Selection

These properties are in effect when the user selects an item in a control.

**SelectionColor** – The text color of a selected item or items in a list or the color of the selection tool in a pen control.

- Applies to **[Drop down](control-drop-down.md)**, **[List Box](control-list-box.md)**, and **[Pen input](control-pen-input.md)** controls.

**SelectionFill** – The background color of a selected item or items in a list or a selected area of a pen control.

- Applies to **[Drop down](control-drop-down.md)** and **[List Box](control-list-box.md)** controls.

## Order of color

A control can be in multiple states.  For example: focused and hovered.  Only one color is used, in this order:

1. Disabled
1. Pressed
1. Hover
1. Focus 
1. Normal

---

## Core properties in Power Apps

Source: [properties-core.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-core)

*Reference information about the core properties in Power Apps.*

# Core properties in Power Apps
Configure whether the user can see and interact with a control.

### Properties
**Default** – The initial value of a control before it is changed by the user.

* Applies to **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Gallery](control-gallery.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Rich Text Editor](control-richtexteditor.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, and **[Toggle](control-toggle.md)** controls.

**DelayOutput** – Set to true to delay action during text input.

* Applies to  **[Text input](control-text-input.md)**, **[Card](control-card.md)**

**DisplayMode** – Values can be **Edit, View,** or **Disabled**. Configures whether the control allows user input (**Edit**), only displays data (**View**) or is disabled (**Disabled**).  In **View** mode, input controls such as **[Text input](control-text-input.md)**, **[Drop down](control-drop-down.md)**, **[Date Picker](control-date-picker.md)** will only display the text value and will not render any interactive elements or decorations.  This makes them suitable to be displayed in Forms or as readable output.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Combo box](control-combo-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Rich text editor](control-richtexteditor.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**Items** – The source of data that appears in a control such as a gallery, a list, or a chart.

* Applies to **[Column chart](control-column-line-chart.md)**, **[Combo box](control-combo-box.md)**, **[Drop down](control-drop-down.md)**, **[Gallery](control-gallery.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Pie chart](control-pie-chart.md)**, and **[Radio](control-radio.md)** controls.

**OnChange** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

* Applies to **[Add picture](control-add-picture.md)**, **[Combo box](control-combo-box.md)**, **[Drop down](control-drop-down.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Rich text editor](control-richtexteditor.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, and **[Toggle](control-toggle.md)** controls.

**OnSelect** – Actions to perform when the user taps or clicks a control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Combo box](control-combo-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, and **[Toggle](control-toggle.md)** controls.

**Reset** – Whether a control reverts to its default value.  Also see the **[Reset](../functions/function-reset.md)** function.

* Applies to **[Audio](control-audio-video.md)**, **[Check box](control-check-box.md)**, **[Combo box](control-combo-box.md)**, **[Drop down](control-drop-down.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**Text** – Text that appears on a control or that the user types into a control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**Tooltip** – Explanatory text that appears when the user hovers over a control.

* Applies to **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Check box](control-check-box.md)**, **[Combo box](control-combo-box.md)**, **[Drop down](control-drop-down.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**Value** – The value of an input control.

* Applies to **[Check box](control-check-box.md)**, **[Radio](control-radio.md)**, **[Slider](control-slider.md)**, and **[Toggle](control-toggle.md)** controls.

**Visible** – Whether a control appears or is hidden.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Combo box](control-combo-box.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Rich text editor](control-richtexteditor.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

---

## Image properties in Power Apps

Source: [properties-visual.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-visual)

*Reference information about image properties in Power Apps.*

# Image properties in Power Apps
Configure graphical elements in your app, including images, photos, and elements of a pen control.

**BackgroundImage** – The name of an image file that appears in the background of a screen.

* Applies to the **[Screen](control-screen.md)** control.

**Image** – The name of the image that appears in an image, audio, or microphone control.

* Applies to **[Audio](control-audio-video.md)**, **[Image](control-image.md)**, **[Microphone](control-microphone.md)**, and **[Video](control-audio-video.md)** controls.

**ImagePosition** – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.
- Fill - Fills the entire specified size with the image. Scales the image proportionally. Crops the image as needed.
- Fit - Fits the entire image into the specified size. Scales the image proportionally. Doesn't crop the image.
- Stretch - Fills the entire specified size with the image. Stretches the image disproportionately as needed. Doesn't crop the image.
- Tile - Repeats the image across the control into the specified size.  Doesn't scale the image. Crops the image as needed.
- Center - Places the image in the center of the control. Doesn't scale the image. Crops the image as needed.

* Applies to **[Audio](control-audio-video.md)**, **[Image](control-image.md)**, **[Microphone](control-microphone.md)**, **[Screen](control-screen.md)**, and **[Video](control-audio-video.md)** controls.

---

## Size and location properties in Power Apps

Source: [properties-size-location.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-size-location)

*Reference information about size and location properties in Power Apps.*

# Size and location properties in Power Apps
## Overview
Configure how big a control (or an element of a control) is and where it is in relation to the screen it's on.

## Position
**X** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container). For a **[Card](control-card.md)** control in a container that has multiple columns, this property determines the column in which the card appears.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**Y** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container). For a **[Card](control-card.md)** control in a container that has multiple rows, this property determines the row in which the card appears.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

## Size
**Height** – The distance between a control's top and bottom edges.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**AutoHeight** – Whether a control automatically changes its height to fit the size of its contents, given a fixed width.

Not supported in **[Horizontal containers](control-horizontal-container.md)** because the control's width is not fixed. In **[Vertical containers](control-vertical-container.md)**, the **Fill portions** and **Minimum width** properties take precedence over **Autoheight**.

* Applies to **[Label](control-text-box.md)** and **[HTML text](control-html-text.md)**

**Width** – The distance between a control's left and right edges.

* Applies to **[Add picture](control-add-picture.md)**, **[Audio](control-audio-video.md)**, **[Button](control-button.md)**, **[Camera](control-camera.md)**, **[Card](control-card.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Display form](control-form-detail.md)**, **[Drop down](control-drop-down.md)**, **[Edit form](control-form-detail.md)**, **[Export](control-export-import.md)**, **[Gallery](control-gallery.md)**, **[HTML text](control-html-text.md)**, **[Icon](control-shapes-icons.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[Import](control-export-import.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Microphone](control-microphone.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Rating](control-rating.md)**, **[Shape](control-shapes-icons.md)**, **[Slider](control-slider.md)**, **[Text input](control-text-input.md)**, **[Timer](control-timer.md)**, **[Toggle](control-toggle.md)**, and **[Video](control-audio-video.md)** controls.

**WidthFit** – Whether a control automatically grows horizontally to fill any empty space of a container control such as an **[Edit form](control-form-detail.md)** control. If multiple cards have this property set to **true**, the space is divided between them. For more information, see [Understand data form layout](../working-with-form-layout.md).

* Applies to **[Card](control-card.md)**

## Padding
**Padding** – The distance between the text on an import or export button and the edges of that button.

* Applies to **[Add picture](control-add-picture.md)**, **[Export](control-export-import.md)**, and **[Import](control-export-import.md)** controls.

**PaddingBottom** – The distance between text in a control and the bottom edge of that control.

* Applies to **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Radio](control-radio.md)**, and **[Text input](control-text-input.md)** controls.

**PaddingLeft** – The distance between text in a control and the left edge of that control.

* Applies to **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Radio](control-radio.md)**, and **[Text input](control-text-input.md)** controls.

**PaddingRight** – The distance between text in a control and the right edge of that control.

* Applies to **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Radio](control-radio.md)**, and **[Text input](control-text-input.md)** controls.

**PaddingTop** – The distance between text in a control and the top edge of that control.

* Applies to **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[HTML text](control-html-text.md)**, **[Image](control-image.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[PDF viewer](control-pdf-viewer.md)**, **[Radio](control-radio.md)**, and **[Text input](control-text-input.md)** controls.

## Radius
**RadiusBottomLeft** – The degree to which the bottom-left corner of a control is rounded.

* Applies to **[Button](control-button.md)**, **[Export](control-export-import.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, and **[Text input](control-text-input.md)** controls.

**RadiusBottomRight** – The degree to which the bottom-right corner of a control is rounded.

* Applies to **[Button](control-button.md)**, **[Export](control-export-import.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, and **[Text input](control-text-input.md)** controls.

**RadiusTopLeft** – The degree to which the top-left corner of a control is rounded.

* Applies to **[Button](control-button.md)**, **[Export](control-export-import.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, and **[Text input](control-text-input.md)** controls.

**RadiusTopRight** – The degree to which the top-right corner of a control is rounded.

* Applies to **[Button](control-button.md)**, **[Export](control-export-import.md)**, **[Image](control-image.md)**, **[Import](control-export-import.md)**, and **[Text input](control-text-input.md)** controls.

---

## Text properties in Power Apps

Source: [properties-text.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-text)

*Reference information about text properties in Power Apps.*

# Text properties in Power Apps
Configure the text that appears on a control, as a hint when the user types data, and specify other text-related characteristics.

## Text appearance
**Font** – The name of the family of fonts in which text appears.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**FontWeight** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**Italic** – Whether the text in a control is italic.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**Size** – The font size of the text that appears on a control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Column chart](control-column-line-chart.md)**, **[Date Picker](control-date-picker.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[HTML text](control-html-text.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Line chart](control-column-line-chart.md)**, **[List Box](control-list-box.md)**, **[Pen input](control-pen-input.md)**, **[Pie chart](control-pie-chart.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**Strikethrough** – Whether a line appears through the text that appears on a control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**Underline** – Whether a line appears under the text that appears on a control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Drop down](control-drop-down.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[List Box](control-list-box.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

## Text placement
**Align** – The location of text in relation to the horizontal center of its control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, **[Label](control-text-box.md)**, **[Radio](control-radio.md)**, **[Text input](control-text-input.md)**, and **[Timer](control-timer.md)** controls.

**LineHeight** – The distance between, for example, lines of text or items in a list.

* Applies to **[List Box](control-list-box.md)**, **[Label](control-text-box.md)**, **[Radio](control-radio.md)**, and **[Text input](control-text-input.md)** controls.

**VerticalAlign** – The location of text on a control in relation to the vertical center of that control.

* Applies to **[Add picture](control-add-picture.md)**, **[Button](control-button.md)**, **[Check box](control-check-box.md)**, **[Export](control-export-import.md)**, **[Import](control-export-import.md)**, and **[Label](control-text-box.md)** controls.

---

