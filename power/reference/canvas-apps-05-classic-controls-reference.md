# Power Apps Canvas Apps — Classic Controls Reference

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 43

## Contents

1. [Controls and properties in canvas apps](#controls-and-properties-in-canvas-apps)
2. [Limitations of controls in canvas apps](#limitations-of-controls-in-canvas-apps)
3. [Add picture control in canvas apps](#add-picture-control-in-canvas-apps)
4. [Attachments control in Power Apps](#attachments-control-in-power-apps)
5. [Audio and Video controls in Power Apps](#audio-and-video-controls-in-power-apps)
6. [Barcode reader control in Power Apps](#barcode-reader-control-in-power-apps)
7. [Barcode scanner control (retired) in Power Apps](#barcode-scanner-control-retired-in-power-apps)
8. [Button control in Power Apps](#button-control-in-power-apps)
9. [Camera control in Power Apps](#camera-control-in-power-apps)
10. [Card control in Power Apps](#card-control-in-power-apps)
11. [Check box control in Power Apps](#check-box-control-in-power-apps)
12. [Column chart and Line chart controls in Power Apps](#column-chart-and-line-chart-controls-in-power-apps)
13. [Column control in Power Apps](#column-control-in-power-apps)
14. [Combo box control in Power Apps](#combo-box-control-in-power-apps)
15. [Container control in Power Apps](#container-control-in-power-apps)
16. [Data table control in Power Apps](#data-table-control-in-power-apps)
17. [Date Picker control in Power Apps](#date-picker-control-in-power-apps)
18. [Edit form and Display form controls in Power Apps](#edit-form-and-display-form-controls-in-power-apps)
19. [Drop down control in Power Apps](#drop-down-control-in-power-apps)
20. [Export and Import controls in Power Apps](#export-and-import-controls-in-power-apps)
21. [Gallery control in Power Apps](#gallery-control-in-power-apps)
22. [Grid container control in Power Apps](#grid-container-control-in-power-apps)
23. [Horizontal container control in Power Apps](#horizontal-container-control-in-power-apps)
24. [HTML text control in Power Apps](#html-text-control-in-power-apps)
25. [Shape and Icon controls in Power Apps](#shape-and-icon-controls-in-power-apps)
26. [Image control in Power Apps](#image-control-in-power-apps)
27. [List Box control in Power Apps](#list-box-control-in-power-apps)
28. [Microphone control in Power Apps](#microphone-control-in-power-apps)
29. [PDF viewer control (experimental) in Power Apps](#pdf-viewer-control-experimental-in-power-apps)
30. [Pen input control in Power Apps](#pen-input-control-in-power-apps)
31. [Pie chart control in Power Apps](#pie-chart-control-in-power-apps)
32. [Power BI tile control in Power Apps](#power-bi-tile-control-in-power-apps)
33. [Radio control in Power Apps](#radio-control-in-power-apps)
34. [Rating control in Power Apps](#rating-control-in-power-apps)
35. [Rich text editor control in Power Apps](#rich-text-editor-control-in-power-apps)
36. [Screen control in Power Apps](#screen-control-in-power-apps)
37. [Slider control in Power Apps](#slider-control-in-power-apps)
38. [Label control in Power Apps](#label-control-in-power-apps)
39. [Text input control in Power Apps](#text-input-control-in-power-apps)
40. [Timer control in Power Apps](#timer-control-in-power-apps)
41. [Toggle control in Power Apps](#toggle-control-in-power-apps)
42. [Vertical container control in Power Apps](#vertical-container-control-in-power-apps)
43. [Web barcode scanner control (experimental) in Power Apps](#web-barcode-scanner-control-experimental-in-power-apps)

---

## Controls and properties in canvas apps

Source: [reference-properties.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/reference-properties)

*Learn about properties of different controls in canvas apps.*

# Controls and properties in canvas apps

Configure the appearance and behavior of a control by setting one of its properties. Each type of control has a different set of properties. Some properties, such as **Height** and **Width**, are common to almost every type of control, but other properties, such as **CheckboxSize**, are specific to one type of control.

## Controls

**[Add picture](controls/control-add-picture.md)** – Load images from the local device, for upload to a data source.

**[Address input](geospatial-component-input-address.md)** - See dynamic address suggestions as you type.

**[Attachments](controls/control-attachments.md)** – Download and upload files from the local device to a data source.

**[Audio](controls/control-audio-video.md)** – Play an audio clip or the audio portion of a video clip.

**[Barcode reader](controls/control-barcodereader.md)** – Scans barcodes, QR codes, and data-matrix codes on an Android, iOS, or Windows device.

**[Barcode scanner (retired)](controls/control-new-barcode-scanner.md)** – Scans barcodes, QR codes, and data-matrix codes on an Android or iOS device. Replaced by the [barcode reader](controls/control-barcodereader.md).

**[Button](controls/control-button.md)** – Interact with the app by clicking or tapping.

**[Camera](controls/control-camera.md)** – Take and save photos in the app or to a data source.

**[Card](controls/control-card.md)** – Display and edit an individual field of a record in a **[Edit form](controls/control-form-detail.md)** or **[Display form](controls/control-form-detail.md)** control.

**[Check box](controls/control-check-box.md)** – Select or clear an option to specify **true** or **false**.

**[Column chart](controls/control-column-line-chart.md)** – Show values as vertical bars relative to two axes.

**[Column](controls/control-column.md)** - Provides the display experience for a single field in a [**Data table**](controls/control-data-table.md) control.

**[Combo box](controls/control-combo-box.md)** - Allows users to make selections from provided choices. Supports search and multi-select.

**[Container (experimental)](controls/control-container.md)** - Create nested hierarchy for accessibility and responsiveness.

**[Data table (preview)](controls/control-data-table.md)** - Show data in a tabular format.

**[Date picker](controls/control-date-picker.md)** – Specify a date by clicking or tapping.

**[Display form](controls/control-form-detail.md)** – Display records in a data source using a form.

**[Drop down](controls/control-drop-down.md)** – Show the first item in a list until a chevron is selected.

**[Edit form](controls/control-form-detail.md)** – Edit and create records in a data source using a form.

**[Display and Edit form](./controls/control-form-detail.md)** - Experimental feature: Add dynamic forms in which users can view, navigate, and edit relational data from the Microsoft Dataverse.

**[Export](controls/control-export-import.md)** – Export data for use elsewhere in Power Apps.

**[Gallery](controls/control-gallery.md)** – Show a list of records that can contain multiple types of data.

**[Grid container (prview) ](controls/control-grid-container.md)** – Allows you to layout child components anywhere in a grid pattern*, giving precise control over row and column placement.

**[HTML text](controls/control-html-text.md)** – Convert HTML tags automatically.

**[Horizontal container ](controls/control-horizontal-container.md)** – Determines the position of the child components so that you never have to set X, Y for a component inside the container.

**[Icon](controls/control-shapes-icons.md)** – Add graphic appeal and visual interest.

**[Image](controls/control-image.md)** – Show an image from, for example, a local file or a data source.

**[Import](controls/control-export-import.md)** – Import data from elsewhere in Power Apps.

**[Line chart](controls/control-column-line-chart.md)** – Show values as data points relative to two axes.

**[List box](controls/control-list-box.md)** – Select one or more items in a list.

**[Map](geospatial-component-map.md)** - View the physical position of objects from a data source, or by inputting new physical locations.

**[Measuring Camera](mixed-reality-component-measure-distance.md)** - Measure distance, area, and volume in mixed reality.

**[Microphone](controls/control-microphone.md)** – Record and save sounds in the app or to a data source.

**[PDF viewer (experimental)](controls/control-pdf-viewer.md)** – Show the content of a PDF file on the Internet.

**[Pen input](controls/control-pen-input.md)** – Draw an image or text, and save it in the app or to a data source.

**[Pie chart](controls/control-pie-chart.md)** – Show how values relate to each other.

**[Power BI tile](controls/control-power-bi-tile.md)** – Display a Power BI tile inside an app.

**[Radio](controls/control-radio.md)** – Show options that are mutually exclusive.

**[Rating](controls/control-rating.md)** – Indicate a value between 1 and a specified number.

**[Rich text editor](controls/control-richtexteditor.md)** – Allows rich text formatting by app users.

**[Screen](controls/control-screen.md)** – Show and update data about a specific task.

**[Shape](controls/control-shapes-icons.md)** – Display arrows and geometric shapes, such as rectangles.

**[Slider](controls/control-slider.md)** – Specify a value by dragging a handle.

**[Stream Video](controls/control-stream-video.md)** – Play videos and browse through channels from the Microsoft Stream service.

**[Label](controls/control-text-box.md)** – Shows data such as text, numbers, dates, or currency.

**[Text input](controls/control-text-input.md)** – Type text, numbers, and other data.

**[Timer](controls/control-timer.md)** – Configure your app to respond after a certain amount of time passes.

**[Toggle](controls/control-toggle.md)** – Drag a handle to specify **true** or **false**.

**[Video](controls/control-audio-video.md)** – Play a video clip from a local file, a data source, or YouTube.

**[Vertical container ](controls/control-vertical-container.md)** – Determines the position of the child components so that you never have to set X, Y for a component inside the container.

**[3D object](mixed-reality-component-view-3d.md)** - Rotate and zoom into the model with simple gestures in 3D.

**[View in MR](mixed-reality-component-view-mr.md)** - See how a particular item might fit within a specified space in mixed reality.

**[View shape in MR](mixed-reality-component-view-shape.md)** - See if a simple cube might fit within a specified space in mixed reality.

**[Web barcode scanner (experimental)](controls/control-barcodescanner.md)** – The legacy barcode scanner, which is obsolete but might be useful for scanning codes in a web browser.

## Common properties by category

**[Color and border](controls/properties-color-border.md)** – Configure the color and border of a control that can change as a user interacts with it.

**[Core](controls/properties-core.md)** – Configure whether the user can see and interact with a control.

**[Image](controls/properties-visual.md)** – Configure what image is shown and how it fills the control.

**[Size and location](controls/properties-size-location.md)** – Configure how big a control (or an element of a control) is and where it is in relation to the screen it's on.

**[Text](controls/properties-text.md)** – Configure how text appears in controls, such as font characteristics, alignment, line height.  

## All properties

### A

**[AccesibleLabel](controls/properties-accessibility.md)** – Reference information about properties related to accessibility in Power Apps.

**[ActualZoom](controls/control-pdf-viewer.md)** – The actual zoom of the control, which may differ from the zoom requested with the **Zoom** property.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[Align](controls/properties-text.md)** – The location of text in relation to the horizontal center of its control.  Applies to many controls.

**[AllItems](controls/control-gallery.md)** – All items in a gallery, including additional control values that are a part of the gallery's template.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**AutoDisableOnSelect** – Automatically disables the control while the OnSelect behavior is executing.  Applies to **[Button](controls/control-button.md)** and **[Image](controls/control-image.md)** controls.

**[AutoHeight](controls/properties-size-location.md)** – Whether a label automatically increases its height if its **[Text](controls/properties-core.md)** property contains more characters than the control can show. Applies to the **[Label](controls/control-text-box.md)** control.

**AutoPause** – Whether an audio or video clip automatically pauses if the user navigates to a different screen.  Applies to **[Audio](controls/control-audio-video.md)**, **[Timer](controls/control-timer.md)**, and **[Video](controls/control-audio-video.md)** controls.

**AutoStart** – Whether an audio or video control automatically starts to play a clip when the user navigates to the screen that contains that control.  Applies to **[Audio](controls/control-audio-video.md)**, **[Timer](controls/control-timer.md)**, and **[Video](controls/control-audio-video.md)** controls.

### B

**[BackgroundImage](controls/properties-visual.md)** – The name of an image file that appears in the background of a screen.  Applies to the **[Screen](controls/control-screen.md)** control.

**[BorderColor](controls/properties-color-border.md)** – The color of a control's border.  Applies to many controls.

**[BorderStyle](controls/properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.  Applies to many controls.

**[BorderThickness](controls/properties-color-border.md)** – The thickness of a control's border.  Applies to many controls.

**[Brightness](controls/control-camera.md)** – How much light the user is likely to perceive in an image.  Applies to the **[Camera](controls/control-camera.md)** control.

### C

**[CalculateOriginalDimensions](controls/control-image.md)** – Enables the **[OriginalHeight](controls/control-image.md)** and **[OriginalWidth](controls/control-image.md)** properties.  Applies to the **[Image](controls/control-image.md)** control.

**[Camera](controls/control-camera.md)** – On a device that has more than one camera, the numeric ID of the camera that the app uses.  Applies to the **[Camera](controls/control-camera.md)** control.

**[CheckboxBackgroundFill](controls/control-check-box.md)** – The background color of the box that surrounds the checkmark in a checkbox control.  Applies to the **[Check box](controls/control-check-box.md)** control.

**[CheckboxBorderColor](controls/control-check-box.md)** – The color of the border that surrounds the checkmark in a checkbox control.  Applies to the **[Check box](controls/control-check-box.md)** control.

**[CheckboxSize](controls/control-check-box.md)** – The width and height of the box that surrounds the checkmark in a checkbox control.  Applies to the **[Check box](controls/control-check-box.md)** control.

**[CheckmarkFill](controls/control-check-box.md)** – The color of the checkmark in a checkbox control.  Applies to the **[Check box](controls/control-check-box.md)** control.

**[ChevronBackground](controls/control-drop-down.md)** – The color behind the down arrow in a dropdown list.  Applies to the **[Drop down](controls/control-drop-down.md)** control.

**[ChevronFill](controls/control-drop-down.md)** – The color of the down arrow in a dropdown list.  Applies to the **[Drop down](controls/control-drop-down.md)** control.

**[Clear](controls/control-text-input.md)** – Whether a text-input control shows an "X" that the user can tap or click to clear the contents of that control.  Applies to the **[Text input](controls/control-text-input.md)** control.

**[Color](controls/properties-color-border.md)** – The color of text in a control.  Applies to many controls.

**ContentLanguage** – The language of the control's content, if different from the control's container.

**[Contrast](controls/control-camera.md)** – How easily the user can distinguish between similar colors in an image.  Applies to the **[Camera](controls/control-camera.md)** control.

**[CurrentFindText](controls/control-pdf-viewer.md)** – The current search term that is in use.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[CurrentPage](controls/control-pdf-viewer.md)** – The number of the page in a PDF file that is actually being shown.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

### D

**[Data](controls/control-export-import.md)** – The name of a collection that you want to export to a local file.  Applies to the **[Export](controls/control-export-import.md)** control.

**[DataField](controls/control-card.md)** – The name of the field within a record that this card displays and edits.  Applies to the **[Card](controls/control-card.md)** control.

**[DataSource](controls/control-form-detail.md)** – The data source that contains the record that the user will show, edit, or create.  Applies to **[Display form](controls/control-form-detail.md)** and **[Edit form](controls/control-form-detail.md)** controls.

**[Default](controls/properties-core.md)** – The initial value of a control before it is changed by the user.  Applies to many controls.

**[DefaultDate](controls/control-date-picker.md)** – The initial value of a date control before it is changed by the user.  Applies to the **[Date Picker](controls/control-date-picker.md)** control.

**[DefaultMode](controls/control-form-detail.md)** – The initial mode of a form control, either **Edit**, **New**, or **View**.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**DelayOutput** – When set to true, user input is registered after half a second delay. Useful for delaying expensive operations until user completes inputting text (i.e. for filtering when input is used in other formulas). Applies to the **[Text input](controls/control-text-input.md)** control.

**[Direction](controls/control-gallery.md)** – Whether the first item in a gallery in landscape orientation appears near the left or right edge.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[Disabled](controls/properties-core.md)** – Whether the user can interact with the control.  Applies to many controls.

**[DisabledBorderColor](controls/properties-color-border.md)** – The color of a control's border if the control's **[Disabled](controls/properties-core.md)** property is set to **true**.  Applies to many controls.

**[DisabledColor](controls/properties-color-border.md)** – The color of text in a control if its **[Disabled](controls/properties-core.md)** property is set to **true**.  Applies to many controls.

**[DisabledFill](controls/properties-color-border.md)** – The background color of a control if its **[Disabled](controls/properties-core.md)** property is set to **true**.  Applies to many controls.

**[DisplayName](controls/control-card.md)** – The user friendly name for a field in a data source.  Applies to the **[Card](controls/control-card.md)** control.

**[DisplayMode](controls/properties-core.md)** – Values can be Edit, View, or Disabled. Configures whether the control allows user input (Edit), only displays data (View) or is disabled (Disabled).

**[Document](controls/control-pdf-viewer.md)** – The URL, enclosed in double-quotation marks, of a PDF file.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[Drop shadow](controls/properties-color-border.md)** - Adds shadow effects around the control.  Applies to the **[Horizontal container ](controls/control-horizontal-container.md)** and **[Vertical container ](controls/control-vertical-container.md)** control.

- 
**[Duration](controls/control-timer.md)** – How long a timer runs.  Applies to the **[Timer](controls/control-timer.md)** control.

### E

**EnableSpellCheck** – Whether a **[Text input](controls/control-text-input.md)** control should use the browser spell check function. Power Apps for Windows doesn't support this property.

**[EndYear](controls/control-date-picker.md)** – The latest year to which the user can set value of a date-picker control.  Applies to the **[Date Picker](controls/control-date-picker.md)** control.

**Error** – The meaning of this property is dependent on the control:

* **[Add picture](controls/control-add-picture.md)** control - If there is a problem uploading an image, this property will contain an appropriate error string.
* **[Card](controls/control-card.md)** control – The user friendly error message to display for this field when validation fails.
* **[Edit form](controls/control-form-detail.md)** control – A user friendly error message to display for this form when the **[SubmitForm](functions/function-form.md)** function fails.

**[ErrorKind](controls/control-form-detail.md)** – If an error occurs when **SubmitForm** runs, the kind of error that occurred.  Applies to **[Display form](controls/control-form-detail.md)** and **[Edit form](controls/control-form-detail.md)** controls.

**[Explode](controls/control-pie-chart.md)** – The distance between wedges in a pie chart.  Applies to the **[Pie chart](controls/control-pie-chart.md)** control.

### F

**[Fill](controls/properties-color-border.md)** – The background color of a control.  Applies to many controls.

**[FindNext](controls/control-pdf-viewer.md)** – Finds the next instance of **FindText** in the document.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[FindPrevious](controls/control-pdf-viewer.md)** – Finds the previous instance of **FindText** in the document.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[FindText](controls/control-pdf-viewer.md)** – The search term to look for in the document.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[FocusedBorderColor](controls/properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](controls/properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](controls/properties-text.md)** – The name of the family of fonts in which text appears.  Applies to many controls.

**[FontWeight](controls/properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.  Applies to many controls.

### G

**[GridStyle](controls/control-column-line-chart.md)** – Whether a column or line chart shows its x-axis, its y-axis, both, or neither.  Applies to **[Column chart](controls/control-column-line-chart.md)** and **[Line chart](controls/control-column-line-chart.md)** controls.

### H

**[HandleActiveFill](controls/control-slider.md)** – The color of the handle for a slider as the user changes its value.  Applies to the **[Slider](controls/control-slider.md)** control.

**[HandleFill](controls/control-slider.md)** – The color of the handle (the element that changes position) in a toggle or slider control.  Applies to the **[Slider](controls/control-slider.md)** control.

**[HandleHoverFill](controls/control-slider.md)** – The color of the handle in a slider when the user keeps the mouse pointer on it.  Applies to the **[Slider](controls/control-slider.md)** control.

**[Height](controls/properties-size-location.md)** – The distance between a control's top and bottom edges.  Applies to many controls.

**[HintText](controls/control-text-input.md)** – Light-grey text that appears in a text-input control if it's blank.  Applies to the **[Text input](controls/control-text-input.md)** control.

**[HoverBorderColor](controls/properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.  Applies to many controls.

**[HoverColor](controls/properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.  Applies to many controls.

**[HoverFill](controls/properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.  Applies to many controls.

**[HTMLText](controls/control-html-text.md)** – Text that appears in an HTML text control and that may contain HTML tags.  Applies to the **[HTML text](controls/control-html-text.md)** control.

### I

**[Image](controls/properties-visual.md)** – The name of the image that appears in an image, audio, or microphone control.  Applies to **[Audio](controls/control-audio-video.md)**, **[Image](controls/control-image.md)**, **[Microphone](controls/control-microphone.md)**, and **[Video](controls/control-audio-video.md)** controls.

**[ImagePosition](controls/properties-visual.md)** – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.  Applies to many controls.

**[Input](controls/control-pen-input.md)** – Input.  Applies to the **[Pen input](controls/control-pen-input.md)** control.

**[Italic](controls/properties-text.md)** – Whether the text in a control is italic.  Applies to many controls.

**[Item](controls/control-form-detail.md)** – The record in the **DataSource** that the user will show or edit.  Applies to **[Display form](controls/control-form-detail.md)** and **[Edit form](controls/control-form-detail.md)** controls.

**[ItemBorderColor](controls/control-pie-chart.md)** – The color of the border around each wedge in a pie chart.  Applies to the **[Pie chart](controls/control-pie-chart.md)** control.

**[ItemBorderThickness](controls/control-pie-chart.md)** – The thickness of the border around each wedge in a pie chart.  Applies to the **[Pie chart](controls/control-pie-chart.md)** control.

**ItemColorSet** – The color of each data point in a chart.  Applies to **[Column chart](controls/control-column-line-chart.md)**, **[Line chart](controls/control-column-line-chart.md)**, and **[Pie chart](controls/control-pie-chart.md)** controls.

**[ItemPaddingLeft](controls/control-list-box.md)** – The distance between text in a listbox and its left edge.  Applies to the **[List Box](controls/control-list-box.md)** control.

**[Items](controls/properties-core.md)** – The source of data that appears in a control such as a gallery, a list, or a chart.  Applies to many controls.

**[ItemsGap](controls/control-column-line-chart.md)** – The distance between columns in a column chart.  Applies to the **[Column chart](controls/control-column-line-chart.md)** control.

### L

**[LabelPosition](controls/control-pie-chart.md)** – The location of labels in a pie chart relative to its wedges.  Applies to the **[Pie chart](controls/control-pie-chart.md)** control.

**[LastSubmit](controls/control-form-detail.md)** – The last successfully submitted record, including any server generated fields.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**Layout** – Whether the user scrolls through a gallery or adjusts a slider top to bottom (**Vertical**) or left to right (**Horizontal**).  Applies to **[Gallery](controls/control-gallery.md)** and **[Slider](controls/control-slider.md)** controls.

**[LineHeight](controls/properties-text.md)** – The distance between, for example, lines of text or items in a list.  Applies to **[List Box](controls/control-list-box.md)**, **[Radio](controls/control-radio.md)**, **[Label](controls/control-text-box.md)**, and **[Text input](controls/control-text-input.md)** controls.

**[Loop](controls/control-audio-video.md)** – Whether an audio or video clip automatically starts over as soon as it finishes playing.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

### M

**[Markers](controls/control-column-line-chart.md)** – Whether a column or line chart shows the value of each data point.  Applies to **[Column chart](controls/control-column-line-chart.md)** and **[Line chart](controls/control-column-line-chart.md)** controls.

**[MarkerSuffix](controls/control-column-line-chart.md)** – Text that appears after each value in a column chart for which the **[Markers](controls/control-column-line-chart.md)** property is set to **true**.  Applies to the **[Column chart](controls/control-column-line-chart.md)** control.

**Max** – The maximum value to which the user can set a slider or a rating.  Applies to **[Rating](controls/control-rating.md)** and **[Slider](controls/control-slider.md)** controls.

**[MaxLength](controls/control-text-input.md)** – The number of characters that the user can type into a text-input control.  Applies to the **[Text input](controls/control-text-input.md)** control.

**Media** – An identifier for the clip that an audio or video control plays.  Applies to **[Add picture](controls/control-add-picture.md)**, **[Audio](controls/control-audio-video.md)**, and **[Video](controls/control-audio-video.md)** controls.

**[Mic](controls/control-microphone.md)** – On a device that has more than one microphone, the numeric ID of the microphone that the app uses.  Applies to the **[Microphone](controls/control-microphone.md)** control.

**[Min](controls/control-slider.md)** – The minimum value to which the user can set a slider.  Applies to the **[Slider](controls/control-slider.md)** control.

**[MinimumBarWidth](controls/control-column-line-chart.md)** – The narrowest possible width of columns in a column chart.  Applies to the **[Column chart](controls/control-column-line-chart.md)** control.

**Mode** – The meaning of this property is dependent on the control:

* **[Edit form](controls/control-form-detail.md)** control – The control is in **Edit** or **New** mode.
* **[Pen input](controls/control-pen-input.md)** control – The control is in **Draw**, **Erase**, or **Select** mode.
* **[Text input](controls/control-text-input.md)** control – The control is in **SingleLine**, **MultiLine**, or **Password** mode.

### N

**[NavigationStep](controls/control-gallery.md)** – How far a gallery scrolls if its **[ShowNavigation](controls/control-gallery.md)** property is set to **true** and the user selects a navigation arrow at either end of that gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[NumberOfSeries](controls/control-column-line-chart.md)** – How many columns of data are reflected in a column or line chart.  Applies to **[Column chart](controls/control-column-line-chart.md)** and **[Line chart](controls/control-column-line-chart.md)** controls.

### O

**[OnChange](controls/properties-core.md)** – The behavior of an app when the user changes the value of a control (for example, by adjusting a slider).  Applies to many controls.

**OnCheck** – The behavior of an app when the value of a checkbox or a toggle changes to **true**.  Applies to **[Check box](controls/control-check-box.md)** and **[Toggle](controls/control-toggle.md)** controls.

**[OnEnd](controls/control-audio-video.md)** – The behavior of an app when an audio or video clip finishes playing.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

**[OnFailure](controls/control-form-detail.md)** – The behavior of an app when a data operation has been unsuccessful.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**[OnHidden](controls/control-screen.md)** – The behavior of an app when the user navigates away from a screen.  Applies to the **[Screen](controls/control-screen.md)** control.

**[OnPause](controls/control-audio-video.md)** – The behavior of an app when the user pauses the clip that an audio or video control is playing.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

**[OnReset](controls/control-form-detail.md)** – The behavior of an app when an **[Edit form](controls/control-form-detail.md)** control is reset.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**[OnSelect](controls/properties-core.md)** – The behavior of an app  when the user taps or clicks a control.  Applies to many controls.

**OnStart** – The behavior of an app when the user opens it or starts to record with a microphone control. Applies to **[Audio](controls/control-audio-video.md)**, **[Microphone](controls/control-microphone.md)**, **[Screen](controls/control-screen.md)**, and **[Video](controls/control-audio-video.md)** controls.

**[OnStateChange](controls/control-pdf-viewer.md)** – The behavior of an app when the state of the control changes. Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[OnStop](controls/control-microphone.md)** – The behavior of an app when the user stops recording with a microphone control. Applies to the **[Microphone](controls/control-microphone.md)** control.

**[OnStream](controls/control-camera.md)** – The behavior of an app when the **[Stream](controls/control-camera.md)** property is updated.  Applies to the **[Camera](controls/control-camera.md)** control.

**[OnSuccess](controls/control-form-detail.md)** – The behavior of an app when a data operation has been successful.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**[OnTimerEnd](controls/control-timer.md)** – The behavior of an app when a timer finishes running.  Applies to the **[Timer](controls/control-timer.md)** control.

**[OnTimerStart](controls/control-timer.md)** – The behavior of an app when a timer starts to run.  Applies to the **[Timer](controls/control-timer.md)** control.

**OnUncheck** – The behavior of an app when the value of a checkbox or a toggle changes to **false**.  Applies to **[Check box](controls/control-check-box.md)** and **[Toggle](controls/control-toggle.md)** controls.

**[OnVisible](controls/control-screen.md)** – The behavior of an app the user navigates to a screen.  Applies to the **[Screen](controls/control-screen.md)** control.

**[OriginalHeight](controls/control-image.md)** – Original height of an image, enabled with the **[CalculateOriginalDimensions](controls/control-image.md)** property.  Applies to the **[Image](controls/control-image.md)** control.

**[OriginalWidth](controls/control-image.md)** – Original width of an image, enabled with the **[CalculateOriginalDimensions](controls/control-image.md)** property.  Applies to the **[Image](controls/control-image.md)** control.

**[Overflow](controls/control-text-box.md)** – Whether a scrollbar appears in a label if its **[Wrap](controls/control-text-box.md)** property is set to **true** and the value of the control's **[Text](controls/properties-core.md)** property contains more characters than the control can show at one time.  Applies to the **[Label](controls/control-text-box.md)** control.

### P

**[Padding](controls/properties-size-location.md)** – The distance between the text on an import or export button and the edges of that button.  Applies to **[Add picture](controls/control-add-picture.md)**, **[Export](controls/control-export-import.md)**, and **[Import](controls/control-export-import.md)** controls.

**[PaddingBottom](controls/properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.  Applies to many controls.

**[PaddingLeft](controls/properties-size-location.md)** – The distance between text in a control and the left edge of that control.  Applies to many controls.

**[PaddingRight](controls/properties-size-location.md)** – The distance between text in a control and the right edge of that control.  Applies to many controls.

**[PaddingTop](controls/properties-size-location.md)** – The distance between text in a control and the top edge of that control.  Applies to many controls.

**[Page](controls/control-pdf-viewer.md)** – The number of the page that you want to show.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[PageCount](controls/control-pdf-viewer.md)** – The number of pages in a document.  Applies to the **[PDF viewer](controls/control-pdf-viewer.md)** control.

**[Paused](controls/control-audio-video.md)** – *True* if a media playback control is currently paused, *false* otherwise.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

**[Photo](controls/control-camera.md)** – The image captured  when the user takes a picture.  Applies to the **[Camera](controls/control-camera.md)** control.

**[Pressed](controls/control-button.md)** – *True* while a control is being pressed, *false* otherwise.  Applies to the **[Button](controls/control-button.md)** control.

**[PressedBorderColor](controls/properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.  Applies to many controls.

**[PressedColor](controls/properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.  Applies to many controls.

**[PressedFill](controls/properties-color-border.md)** – The background color of a control when the user taps or clicks that control.  Applies to many controls.

### R

**[RadioBackgroundFill](controls/control-radio.md)** – The background color of the circles in a radio-button control.  Applies to the **[Radio](controls/control-radio.md)** control.

**[RadioBorderColor](controls/control-radio.md)** – The color of the circle for each option in a radio-button control.  Applies to the **[Radio](controls/control-radio.md)** control.

**[RadioSelectionFill](controls/control-radio.md)** – The color that appears inside the circle of the selected option in a radio-button control.  Applies to the **[Radio](controls/control-radio.md)** control.

**[RadioSize](controls/control-radio.md)** – The diameter of the circles in a radio-button control.  Applies to the **[Radio](controls/control-radio.md)** control.

**[RadiusBottomLeft](controls/properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.  Applies to many controls.

**[RadiusBottomRight](controls/properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.  Applies to many controls.

**[RadiusTopLeft](controls/properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.  Applies to many controls.

**[RadiusTopRight](controls/properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.  Applies to many controls.

**RailFill** – The background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.  Applies to **[Slider](controls/control-slider.md)** and **[Toggle](controls/control-toggle.md)** controls.

**RailHoverFill** – When you hover on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.  Applies to **[Slider](controls/control-slider.md)** and **[Toggle](controls/control-toggle.md)** controls.

**[RatingFill](controls/control-rating.md)** – The color of the stars in a rating control.  Applies to the **[Rating](controls/control-rating.md)** control.

**ReadOnly** – Whether a user can change the value of a slider or rating control.  Applies to **[Rating](controls/control-rating.md)** and **[Slider](controls/control-slider.md)** controls.

**[Repeat](controls/control-timer.md)** – Whether a timer automatically restarts when it finishes running.  Applies to the **[Timer](controls/control-timer.md)** control.

**[Required](controls/control-card.md)** – Whether a card, editing the field of a data source, must contain a value.  Applies to the **[Card](controls/control-card.md)** control.

**[Reset](controls/properties-core.md)** – Whether a control reverts to its default value.  Applies to many controls.  Also see the **[Reset](functions/function-reset.md)** function.

### S

**Selected** – The selected item.  Applies to **[Drop down](controls/control-drop-down.md)** and **[Gallery](controls/control-gallery.md)** controls.

**[SelectedDate](controls/control-date-picker.md)** – The date currently selected in a date control.  Applies to the **[Date Picker](controls/control-date-picker.md)** control.

**[SelectionColor](controls/properties-color-border.md)** – The text color of a selected item or items in a list or the color of the selection tool in a pen control.  Applies to **[Drop down](controls/control-drop-down.md)**, **[List Box](controls/control-list-box.md)**, and **[Pen input](controls/control-pen-input.md)** controls.

**[SelectionFill](controls/properties-color-border.md)** – The background color of a selected item or items in a list or a selected area of a pen control.  Applies to **[Drop down](controls/control-drop-down.md)** and **[List Box](controls/control-list-box.md)** controls.

**[SelectionThickness](controls/control-pen-input.md)** – The thickness of the selection tool for a pen-input control.  Applies to the **[Pen input](controls/control-pen-input.md)** control.

**[SelectMultiple](controls/control-list-box.md)** – Whether a user can select more than one item in a listbox.  Applies to the **[List Box](controls/control-list-box.md)** control.

**[SeriesAxisMax](controls/control-column-line-chart.md)** – The maximum value of the y-axis for a column or line chart.  Applies to the **[Column chart](controls/control-column-line-chart.md)** control.

**[SeriesAxisMin](controls/control-column-line-chart.md)** – A number that determines the minimum value of the y-axis for a column chart.  Applies to the **[Column chart](controls/control-column-line-chart.md)** control.

**ShowControls** – Whether an audio or video player shows, for example, a play button and a volume slider, and a pen control shows, for example, icons for drawing, erasing, and clearing.  Applies to **[Audio](controls/control-audio-video.md)**, **[PDF viewer](controls/control-pdf-viewer.md)**, **[Pen input](controls/control-pen-input.md)**, and **[Video](controls/control-audio-video.md)** controls.

**[ShowLabels](controls/control-pie-chart.md)** – Whether a pie chart shows the value that's associated with each of its wedges.  Applies to the **[Pie chart](controls/control-pie-chart.md)** control.

**[ShowNavigation](controls/control-gallery.md)** – Whether an arrow appears at each end of a gallery so that a user can scroll through the items in the gallery by clicking or tapping an arrow.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[ShowScrollbar](controls/control-gallery.md)** – Whether a scrollbar appears when the user hovers over a gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**ShowValue** – Whether a slider's or rating's value appears as the user changes that value or hovers over the control.  Applies to **[Rating](controls/control-rating.md)** and **[Slider](controls/control-slider.md)** controls.

**[Size](controls/properties-text.md)** – The font size of the text that appears on a control.  Applies to many controls.

**[Snap](controls/control-gallery.md)** – Whether, when a user scrolls through a gallery, it automatically snaps so that the next item appears in full.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**Start** – Whether an audio or video clip plays.  Applies to **[Audio](controls/control-audio-video.md)**, **[Timer](controls/control-timer.md)**, and **[Video](controls/control-audio-video.md)** controls.

**[StartTime](controls/control-audio-video.md)** – The time after the start of an audio or video clip when the clip starts to play.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

**[StartYear](controls/control-date-picker.md)** – The earliest year to which the user can set the value of a date-picker control.  Applies to the **[Date Picker](controls/control-date-picker.md)** control.

**[Stream](controls/control-camera.md)** – Automatically updated image based on the **[StreamRate](controls/control-camera.md)** property.  Applies to the **[Camera](controls/control-camera.md)** control.

**[StreamRate](controls/control-camera.md)** – How often to update the image on the **[Stream](controls/control-camera.md)** property, in milliseconds.  This value can range from 100 (1/10th of a second) to 3,600,000 (1 hour).  Applies to the **[Camera](controls/control-camera.md)** control.

**[Strikethrough](controls/properties-text.md)** – Whether a line appears through the text that appears on a control.  Applies to many controls.

### T

**[TemplateFill](controls/control-gallery.md)** – The background color of a gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[TemplatePadding](controls/control-gallery.md)** – The distance between items in a gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[TemplateSize](controls/control-gallery.md)** – The height of the template for a gallery in vertical/portrait orientation or the width of the template for a gallery in horizontal/landscape orientation.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[Text](controls/properties-core.md)** – Text that appears on a control or that the user types into a control.  Applies to many controls.

**[Time](controls/control-audio-video.md)** – A media control's current position.  Applies to **[Audio](controls/control-audio-video.md)** and **[Video](controls/control-audio-video.md)** controls.

**[Tooltip](controls/properties-core.md)** – Explanatory text that appears when the user hovers over a control.  Applies to many controls.

**[Transition](controls/control-gallery.md)** – The visual effect (**Pop**, **Push**, or **None**) when the user hovers over an item in a gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

**[Transparency](controls/control-image.md)** – The degree to which controls behind an image remain visible.  Applies to the **[Image](controls/control-image.md)** control. Decimal values range from 0 to 1.  Where 0 is opaque, 0.5 is semi-transparent and 1 is transparent.

### U

**[Underline](controls/properties-text.md)** – Whether a line appears under the text that appears on a control.  Applies to many controls.

**[Unsaved](controls/control-form-detail.md)** – True if the **[Edit form](controls/control-form-detail.md)** control contains user changes that have not been saved.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

**[Update](controls/control-card.md)** – The value to write back to the data source for a field.  Applies to the **[Card](controls/control-card.md)** control.

**[Updates](controls/control-form-detail.md)** – The values to write back to the data source for a record loaded in a form control.  Applies to the **[Edit form](controls/control-form-detail.md)** control.

### V

**Valid** – Whether a **[Card](controls/control-card.md)** or **[Edit form](controls/control-form-detail.md)** control contains valid entries, ready to be submitted to the data source.  Applies to **[Card](controls/control-card.md)** and **[Edit form](controls/control-form-detail.md)** controls.

**[Value](controls/properties-core.md)** – The value of an input control.  Applies to **[Check box](controls/control-check-box.md)**, **[Radio](controls/control-radio.md)**, **[Slider](controls/control-slider.md)**, and **[Toggle](controls/control-toggle.md)** controls.

**ValueFill** – The background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.  Applies to **[Slider](controls/control-slider.md)** and **[Toggle](controls/control-toggle.md)** controls.

**ValueHoverFill** – When you keep the mouse pointer on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.  Applies to **[Slider](controls/control-slider.md)** and **[Toggle](controls/control-toggle.md)** controls.

**[VerticalAlign](controls/properties-text.md)** – The location of text on a control in relation to the vertical center of that control.  Applies to many controls.

**[Visible](controls/properties-core.md)** – Whether a control appears or is hidden.  Applies to many controls.

### W

**[Width](controls/properties-size-location.md)** – The distance between a control's left and right edges.  Applies to many controls.

**[WidthFit](controls/properties-size-location.md)** – Whether a control automatically grows horizontally to fill any empty space of a container control such as an **[Edit form](controls/control-form-detail.md)** control. If multiple cards have this property set to **true**, the space is divided between them. For more information, see [Understand data form layout](working-with-form-layout.md).

**[Wrap](controls/control-text-box.md)** – Whether text that's too long to fit in a label wraps to the next line.  Applies to the **[Label](controls/control-text-box.md)** control.

**[WrapCount](controls/control-gallery.md)** – How many records appear in each item of a gallery.  Applies to the **[Gallery](controls/control-gallery.md)** control.

### X

**[X](controls/properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container). Applies to many controls. For a **[Card](controls/control-card.md)** control in a container that has multiple columns, this property determines the column in which the card appears.

**[XLabelAngle](controls/control-column-line-chart.md)** – The angle of the labels below the x-axis of a column or line chart.  Applies to **[Column chart](controls/control-column-line-chart.md)** and **[Line chart](controls/control-column-line-chart.md)** controls.

### Y

**[Y](controls/properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container). Applies to many controls. For a **[Card](controls/control-card.md)** control in a container that has multiple rows, this property determines the row in which the card appears.

**[YAxisMax](controls/control-column-line-chart.md)** – The maximum value of the y-axis for a line chart.  Applies to the **[Line chart](controls/control-column-line-chart.md)** control.

**[YAxisMin](controls/control-column-line-chart.md)** – The minimum value of the y-axis for a line chart.  Applies to the **[Line chart](controls/control-column-line-chart.md)** control.

**[YLabelAngle](controls/control-column-line-chart.md)** – The angle of the labels next to the y-axis of a line or column chart.  Applies to **[Column chart](controls/control-column-line-chart.md)** and **[Line chart](controls/control-column-line-chart.md)** controls.

### Z

**Zoom** – The percentage by which an image from a camera is magnified or the view of a file in a PDF viewer.  Applies to **[Camera](controls/control-camera.md)** and **[PDF viewer](controls/control-pdf-viewer.md)** controls.

### See also

[Limitations of controls in Power Apps](control-limitations.md)

---

## Limitations of controls in canvas apps

Source: [control-limitations.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/control-limitations)

*Learn about the limitations of controls in canvas apps.*

# Limitations of controls in canvas apps

In this article, learn about the general limitations of the controls used in canvas apps. In addition, [limitations of controls in Teams](#limitations-of-controls-in-teams) lists the control limitations applicable to apps played inside Microsoft Teams. For more information about environments, go to [Types of environments](/power-platform/admin/environments-overview#types-of-environments).

- [Attachments control](controls//control-attachments.md) - see [Attachments control limitations](controls//control-attachments.md#limitations).

- [Audio, and video controls](controls/control-audio-video.md) - see [Audio and video alternatives](controls/control-audio-video.md#audio-and-video-alternatives).

- [Barcode control](controls/control-barcodereader.md), [Camera control](controls/control-camera.md)
    - On iOS, the camera control is supported in the Power Apps for mobile app. It's not supported within the browser or Teams Mobile.
   - On Android, the camera control isn't supported in Teams Mobile.
   - When using desktop browsers, the barcode reader isn't supported. Use the Power Apps for mobile app.

- [Container control](controls/control-container.md) - see [Container control limitations](controls/control-container.md#limitations).

- [Export and import controls](controls/control-export-import.md) - see [Export and import control limitations](controls/control-export-import.md#limitations).

- [Gallery control](controls/control-gallery.md) - see [Gallery control limitations](controls/control-gallery.md#limitations).

- [Image control](controls/control-image.md) - only supports external media URLs using HTTPS.

- [Power BI tile control](controls/control-power-bi-tile.md) - see [Power BI tile control limitations for passing a parameter](controls/control-power-bi-tile.md#filtering).

- [PDF viewer control (experimental)](controls/control-pdf-viewer.md) - see [PDF viewer control (experimental) limitations](controls/control-pdf-viewer.md#limitations).

- [Stream Video control](controls/control-stream-video.md) - see [Stream Video control limitations](controls/control-stream-video.md#limitations).

## Limitations of controls in Teams

This section lists limitations of canvas apps controls for apps within Microsoft Teams.

### General limitations

Apps made with Power Apps in a Dataverse for Teams environment can't be opened outside of Teams. To use controls like *Camera*, upgrade your Power Apps license so that the app can be opened outside of Teams&mdash;for example&mdash;in the Power Apps mobile app.

### Limitations of specific controls

- [Barcode control](controls/control-barcodereader.md) - the barcode reader control isn't supported in Teams Mobile.

- [Camera control](controls/control-camera.md) - the Camera control isn't supported in Teams Mobile. If you're creating a app for use inside Teams, use the [Add picture](controls/control-add-picture.md) control instead.

- [Microphone control](controls/control-microphone.md) - the following conditions apply when using the Microphone control in apps created using Power Apps on Teams Mobile:

    - The audio format for microphone recordings in Teams will always be *AAC* with a file extension of .MP4.
    - Teams has its own recording experience. The microphone control inside apps created using Power Apps will be disabled during the recording period.
    - Microphone recordings are limited to a maximum duration of 10 minutes.

### Unsupported controls

The following controls aren't supported by apps embedded in Teams:

- [Address Input](geospatial-component-input-address.md)
- [Camera](controls/control-camera.md) (in Teams Mobile)
- [Map](geospatial-component-map.md)
- [Mixed reality](mixed-reality-overview.md) (View in MR, View shape in MR, Measuring Camera)
- [Power BI tile control](controls/control-power-bi-tile.md)
- [Web barcode scanner control](controls/control-barcodescanner.md)

## Next steps

[Controls and properties reference](reference-properties.md)

---

## Add picture control in canvas apps

Source: [control-add-picture.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-add-picture)

*Information, including properties and examples, about the Add picture control.*

# Add picture control in canvas apps

Takes a photo or loads images from the local device.

## Description
With this control users can take photos or upload image files from their device and update the data source with this content. On a mobile device the user is presented with the device's choice dialog to choose between taking a photo or selecting one already available.

This control is a grouped control containing two controls: an **Image** and an **Add picture button**. The **Image** control shows the uploaded image or a placeholder if no image has been uploaded. The **Add picture button** prompts for an image to be uploaded.

See the [Image control reference](control-image.md) for **Image** properties.

## Limitations

The picture control has these limitations:

- When using the **Add Picture** control on iOS, images imported by using the camera or gallery don't contain meta-data like orientation, location information, or camera settings.

## Add picture button properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers. Should describe the purpose of adding a picture.

**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**ChangePictureText** – Text that appears on the button when an image has been uploaded.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**Error** - If there is a problem uploading an image, this property will contain an appropriate error string.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**Media** – An identifier for the clip that an audio or video control plays.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[Padding](properties-size-location.md)** – The distance between the text on an import or export button and the edges of that button.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Text](properties-core.md)** – Text that appears on the button when an image has not been uploaded.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**UseMobileCamera** – Whether to use a mobile camera directly, when available. Setting this to **TRUE** forces users to take a picture using the camera and disables uploading existing images from the device gallery.

**[VerticalAlign](properties-text.md)** – The location of text on a control in relation to the vertical center of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Patch**( *DataSource*, *BaseRecord*, *ChangeRecord* )](../functions/function-patch.md)

## Examples
### Add images to an Image gallery control
1. Add an **Add picture** control, and then triple-click it.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
1. In the **Open** dialog box, click or tap an image file, and then click or tap **Open**.
1. Add a **[Button](control-button.md)** control, move it under the **Add picture** control, and set the **[OnSelect](properties-core.md)** property for the **[Button](control-button.md)** control to this formula:<br>
   **Collect(MyPix, AddMediaButton1.Media)**
   
    Want more information about the **[Collect](../functions/function-clear-collect-clearcollect.md)** function or [other functions](../formula-reference.md)?
1. Add a **Vertical gallery** control, and set its **[Items](properties-core.md)** property to **MyPix**.
1. Select the **[Image](control-image.md)** control in the gallery and set it's **Image** property to **ThisItem.Value**.
1. Press F5, and then click or tap the **[Button](control-button.md)** control.
   
    The image from the **Add picture** control appears in the **Vertical Gallery** control. If your image doesn't have the same aspect ratio as the **[Image](control-image.md)** control in the **Vertical gallery** control, set the **[ImagePosition](properties-visual.md)** property of the **[Image](control-image.md)** control to **Fit**.
1. Click or tap the **Add picture** control, click or tap another image file, click or tap **Open**, and then click or tap the **[Button](control-button.md)** control that you added.
   
    The second image appears in the **Image gallery** control.
1. (optional) Repeat the previous step one or more times, and then return to the default workspace by pressing Esc.

Use the **[SaveData](../functions/function-savedata-loaddata.md)** function to save the images locally or the **[Patch](../functions/function-patch.md)** function to update a data source.


## Accessibility guidelines
The same guidelines for **[Button](control-button.md)** and **[Image](control-image.md)** apply. In addition, consider the following:

### Color contrast
* **Add picture button** must have adequate contrast between its text and background. Since the uploaded image may have varying colors, use an opaque **[Fill](properties-color-border.md)** on the **Add picture button** to ensure consistent contrast.

### Screen reader support
* **Add picture button** must have **Text** and **ChangePictureText** that prompts the user to add or change a picture.

### Keyboard support
* **Add picture button** must have **[TabIndex](properties-accessibility.md)** of zero or greater so that keyboard users can navigate to it.
* **Add picture button** must have clearly visible focus indicators. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Attachments control in Power Apps

Source: [control-attachments.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-attachments)

*Learn about the details, properties and examples of the attachments control in Power Apps.*

# Attachments control in Power Apps

A control that users can use to download files to their device, and upload and delete files from a list created by using Microsoft Lists or a Microsoft Dataverse table.

## Description

By using an **Attachments** control, you can open, add, and delete files from a list or a Dataverse table.

## Limitations

The attachment control has these limitations:

1. The attachment control only supports lists and Dataverse tables as data sources. It doesn't support expressions that transform these data sources into tables, such as with the **ForAll** function.

1. The upload and delete functionality works only inside a form. The attachment control appears disabled when in **Edit** mode and not inside a form. To save file additions and deletions, the app user must save the form. Because of this limitation, the attachment control isn't available from the **Insert** tab but appears in the form when the attachment form field is enabled in a SharePoint or Dataverse form.

1. The attachments control on a web browser lets you select multiple files and use drag and drop functionality. However, when you use the attachments control on [Power Apps Mobile](https://powerapps.microsoft.com/downloads/), you can only add files one at a time.

1. You might not be able to attach files stored in OneDrive or any other cloud storage. Try downloading these files to the device before attaching them by using the device's file picker.

1. The Power Apps mobile app doesn't support capturing videos directly from the camera or selecting videos from the photo library when using the **Attachments** control. To add a video, users must use the **Browse** option.
   - **On Android**: The **Browse** option displays all file types, including videos, so you can select and attach your video files.
   - **On iOS**: The **Browse** option only shows files stored in the **Files** app. If your video isn't already saved there, you need to move it to the **Files** app before you attach it.

   If a video doesn't appear as an option to attach, first save the video to your device's **Files** app and then try again.

1. Uploading and viewing attachments isn't supported when running canvas apps in Microsoft Teams on Android or iOS mobile devices.

## Key properties
**[Items](properties-core.md)** – The **Attachment** column of the list or Dataverse table. [Collections](../create-update-collection.md) and [Tables](../working-with-tables.md) aren't supported.

**MaxAttachments** – The maximum number of files the control accepts.

**MaxAttachmentSize** – The maximum allowed file size in MB for each new attachment. 1 MB here is 1,000,000 bytes (10<sup>6</sup> B) or 1,000 KB.

**OnAddFile** – Actions to perform when the user adds a new file attachment.

**OnRemoveFile** – Actions to perform when the user deletes an existing attachment.

**OnUndoRemoveFile** – Actions to perform when the user restores a deleted attachment.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers. Should describe the purpose of the attachments.

**AddAttachmentText** – The label text for the link used to add a new attachment.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of a control's text.

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisplayMode](properties-core.md)** – Whether the control allows adding and deleting files (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DropTargetBackgroundColor]** – The color of the control's drop target background.

**[DropTargetBorderColor]** – The color of the control's drop target border.

**[DropTargetBorderStyle]** – Whether the control's drop target border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[DropTargetBorderThickness]** – The thickness of the control's drop target border.

**[DropTargetTextColor]** – The color of the control's drop target text.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**MaxAttachmentsText** – The text that replaces the "Attach file" link when the control contains the maximum number of files allowed.

**NoAttachmentsText** – Informational text shown to the user when there are no files attached.

**[Padding](properties-size-location.md)** – The distance between the text on an import or export button and the edges of that button.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user selects that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user selects that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user selects that control.

**Reset** – Reverts all changes to the attachments control and returns to the previously saved state.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[Visible](properties-core.md)** – Whether a control is visible or hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (or screen, if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (or screen, if no parent container).


## Example
1. Add a form to your app, and set a list as its data source.

2. Select the **Display Form** control in the tree view on the left-hand side. You can also use **Edit Form** instead.

3. Select **Data Source** in the Properties tab in the options panel on the right and then select the list you connected to.

4. Select **Edit fields** in the *Fields* section and select **Add field**.

5. Select the **Attachments** field and select **Add**.

    The Attachments field associated with the list appears in the form.

[Learn how to add and configure a control](../add-configure-controls.md)


## Accessibility guidelines
### Color contrast
Ensure there's adequate color contrast between:
* **ItemColor** and **ItemFill**
* **ItemHoverColor** and **ItemHoverFill**
* **ItemPressedColor** and **ItemPressedFill**
* **AddedItemColor** and **AddedItemFill**
* **RemovedItemColor** and **RemovedItemFill**
* **ItemErrorColor** and **ItemErrorFill**
* **AddAttachmentColor** and **Fill**
* **MaxAttachmentsColor** and **Fill**
* **NoAttachmentsColor** and **Fill**

This requirement is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
Include the following properties:
* **[AccessibleLabel](properties-accessibility.md)**
* **AddAttachmentsText**
* **MaxAttachmentsText**
* **NoAttachmentsText**

### Keyboard support
* Use **[TabIndex](properties-accessibility.md)** with a value of zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this clarity.

---

## Audio and Video controls in Power Apps

Source: [control-audio-video.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-audio-video)

*Learn about the details, properties and examples of the audio and video controls in Power Apps.*

# Audio and Video controls in Power Apps
A control that plays an audio file, a video file, or a video on YouTube.

## Description
An **Audio** control plays a sound clip from a file, a recording from a **[Microphone](control-microphone.md)** control, or the audio track from a video file.

A **Video** control plays a video clip from a file or from YouTube or any external source.  Closed captions can optionally be shown when specified.

> [!IMPORTANT]
> Videos on Azure Media services are no longer supported. For more information, see [Retirement of the service](/azure/media-services/latest/azure-media-services-retirement). 

## Limitations

The audio and video control has these limitations:

- Power Apps Mobile runs on various types of devices, and some of them have limitations that are specific to that platform:
    - You can play videos in multiple **Video** controls at the same time on all platforms except iPhone devices.
    - You can record audio with multiple **Microphone** controls at the same time on all platforms except the web player.

## Key properties
**Loop** – Whether an audio or video clip automatically starts over as soon as it finishes playing.

**Media** – An identifier for the clip that an audio or video control plays.

> [!NOTE]
> - Use HTTPS for all external videos to ensure compatibility with modern browsers.
> - External videos must be accessible anonymously (without any authentication).

**ShowControls** – Whether an audio or video player shows, for example, a play button and a volume slider, and a pen control shows, for example, icons for drawing, erasing, and clearing.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers. Should be the title of the video or audio clip.

**AutoPause** – Whether an audio or video clip automatically pauses if the user navigates to a different screen.

**AutoStart** – Whether an audio or video control automatically starts to play a clip when the user navigates to the screen that contains that control.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**ClosedCaptionsUrl** – Video control only.  URL of closed captions file in WebVTT format.  Both video and captions URLs must be HTTPS. Server hosting both video and captions file needs to be CORS enabled.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[Image](properties-visual.md)** – The name of the image that appears in an image, audio, or microphone control.

**[ImagePosition](properties-visual.md)** – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.

**OnEnd** – Actions to perform when an audio or video clip finishes playing.

**OnPause** – Actions to perform when the user pauses the clip that an audio or video control is playing.

**OnStart** – Actions to perform when the user starts to record with a microphone control.

**Paused** – *True* if a media playback control is currently paused, *false* otherwise.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**Start** – Whether an audio or video clip plays.

**StartTime** – The time after the start of an audio or video clip when the clip starts to play.

**Time** – A media control's current position.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**First**( *TableName* )](../functions/function-first-last.md)

## Examples
### Play an audio or video file
1. On the **File** menu, click or tap **Media**, click or tap **Videos** or **Audio**, and then click or tap **Browse**.
2. Browse to the file you want to use, click or tap it, and then click or tap **Open**.
3. Press Esc to return to the default workspace, add an **Audio** or **Video** control, and set its **Media** property to the file that you added.

    Don't know how to [add and configure a control](../add-configure-controls.md)?
4. Press F5, and then play the clip by clicking or tapping the play button of the control that you added.

    > [!TIP]
   > The play button of the **Video** control appears when you hover over the control.
5. Press Esc to return to the default workspace.

### Play a YouTube video
1. Add a **Video** control, and set its **Media** property to the URL of the YouTube video, enclosed in double quotation marks.
2. Press F5, and then play the clip by clicking or tapping the play button of the **Video** control.
3. Press Esc to return to the default workspace.


## Accessibility guidelines
### Audio and video alternatives
* **ShowControls** must be true so that users can listen or watch multimedia at their own pace. This also allows users to toggle closed captions and full-screen mode on video players.
* Closed captions must be provided for videos.
  *  For YouTube videos, use authoring tools provided by YouTube to add captions.
  *  For other videos, create captions in WebVTT format, upload them, and set **ClosedCaptionsUrl** to the url location. There are several limitations. Server(s) hosting video and captions needs to be CORS-enabled and serve them using HTTPS protocol.
* Consider providing an audio or video transcript using one of these methods:
  1. Put the text in a **[Label](control-text-box.md)** and position it adjacent to the multimedia player. Optionally, create a **[Button](control-button.md)** to toggle the display of the text.
  2. Put the text in a different screen. Create a **[Button](control-button.md)** that navigates to the screen and position the button adjacent to the multimedia player.
  3. If the description is short, it can be put it in the **[AccessibleLabel](properties-accessibility.md)**.

### Color contrast
There must be adequate color contrast between:
* **[FocusedBorderColor](properties-color-border.md)** and the outside color
* **[Image](properties-visual.md)** and the multimedia player controls (if applicable)
* **[Fill](properties-color-border.md)** and the multimedia player controls (if the fill is visible)

Provide closed captions and/or transcript if the video content has color contrast issues.

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.
* **AutoStart** should be false because it can be difficult for keyboard users to stop playback quickly.

---

## Barcode reader control in Power Apps

Source: [control-barcodereader.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-barcodereader)

*Learn about the details, properties and examples of the Barcode reader control in Power Apps.*

# Barcode reader control in Power Apps

Scans barcodes, QR codes, and data-matrix codes on Android, iOS, and Windows devices.

:::image type="content" source="./media/control-barcode-reader/barcode-hero.gif" alt-text="A gif showcasing the different capabilities of the barcode reader control.":::

## Description

The control opens a native scanner on Android, iOS, and Windows devices. On iOS and Android, the scanner supports the following scanning modes:

- **Automatically scan** – A barcode is scanned as soon as it's detected.
- **Select to scan** – The user can determine which of the detected barcodes to scan. The control doesn't support scanning in a web browser.
- **Scan multiple** – The user can scan multiple barcodes during the barcode session.

On Windows devices, the barcode reader will always **automatically scan**.

The barcode reader control supports different zoom levels and turning on/off the device's flashlight from within the scanning experience.

> [!NOTE]
> The barcode scanner control is supported on Android, iOS, and Windows devices. All other platforms will show a warning stating that some features of the app won't work.

:::image type="content" source="./media/control-barcode-reader/barcode-three-screens.PNG" alt-text="A set of three screens side-by-side showing the different capabilities of the barcode reader control.":::

## Key properties

**Barcodes** – Output property that contains a table of the barcodes scanned with two columns: **Value**, and **Type**. **Value** is the text value of the code that was scanned, while **Type** is the type of the code that was scanned.

**OnScan** – Actions to perform when a barcode is successfully scanned.

**OnCancel** – Actions to perform when a barcode scan is canceled by the user.

**OnChange** - Actions to perform when a property on the barcode reader control is changed, including output properties.

**BarcodeType** - The barcode type to scan. You can target multiple barcode types by concatenating them. Ex. `'Microsoft.BarcodeReader.BarcodeType'.Code128 & 'Microsoft.BarcodeReader.BarcodeType'.Code39`.  **Default: Auto**

**Scanning mode** - Whether to `Automatically scan` the first barcode detected in view, to allow the user to `Select to scan` which of the barcodes in view to scan, or to `Scan multiple` barcodes in a single session. On Windows, the barcode reader will always `Automatically scan`.

**Scanning quality** - The image quality the barcode reader scans at. A higher quality is good for small barcodes, but could lead to slow performance. On Windows, the barcode reader will always scan at the device's camera quality. **Default: Automatic**.

**PreferFrontCamera** - If enabled the barcode reader will default to using the front facing camera instead of the rear facing camera.

**BeepOnScan** - If enabled, the barcode reader will play a beep noise when a barcode is scanned.

**VibrateOnScan** - If enabled, the barcode reader will vibrate when a barcode is scanned.

## Additional properties

**Text** - Text that appears on the button that activates the scanner.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Height](properties-size-location.md)** – The height of the button that activates the scanner.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The width of the button that activates the scanner.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen, if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen, if no parent container).

## Accessibility guidelines

The same guidelines for the **[Button](control-button.md)** control apply to the **Barcode reader** control because it's a button that launches the scan.

### Visual alternatives

* The barcode scanner is a button that doesn't display the scan result. Consider showing the scan result with a **[Label](control-text-box.md)** control. Set the label's **[Text](properties-core.md)** property to `First(BarcodeReader.Barcodes).Value` where `BarcodeReader` is the name of the barcode reader control. Set the label's **[Live](properties-accessibility.md)** property to **Polite** so that screen-reader users are notified of changes. This change makes the scanned value accessible to everyone, irrespective of visual ability.

* Users who have visual and motor disabilities might prefer not to point the camera at a barcode. Consider adding another form of input, such as a **[Text input](control-text-input.md)** control, for users to enter barcodes.

## Barcode Availability by Device

| Barcode Type | Supported on iOS and Android | Supported on Windows | Notes |
|--------------|:---:|:---:|:--------:|
| QR_CODE | ✔ | ✔ | |
| DATA_MATRIX | ✔ | ✖ | |
| AZTEC | ✔ | ✖ | |
| CODABAR | ✔ | ✔ | |
| CODE_128 | ✔ | ✔ | |
| CODE_39 | ✔ | ✔ | |
| CODE_93 | ✔ | ✖ | |
| EAN | ✔ | ✔ | Supports EAN_8 and EAN_13 |
| Interleaved 2 of 5 <br> ITF | ✔ | ✖ | |
| PDF_417 | ✔ | ✖ | |
| RSS14 <br> Databar 14 | ✔ | ✖ | Android and iOS support Stacked and Omnidirectional |
| RSS_EXPANDED <br> Databar Expanded | ✔ | ✖ | Android and iOS support Stacked and Omnidirectional |
| UPC | ✔ | ✔ | Supports UPC_A and UPC_E |
| Micro QR Code | ✔ | ✖ | |
| GS1-DWCode | ✖ | ✖ | |
| MSI | ✖ | ✖ | |

## Select() barcode reader control

The barcode reader control doesn't support Select(). As a workaround, set the barcode reader fill color to transparent and put it in front of the control you wanted to select the barcode reader with. This will result in the same experience for the app user where selecting the control launches the barcode reader experience as they will be selecting an invisible barcode reader button instead of the actual control.

### See also

[Limitations of controls in Power Apps](../control-limitations.md)

---

## Barcode scanner control (retired) in Power Apps

Source: [control-new-barcode-scanner.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-new-barcode-scanner)

*Learn about the details, properties and examples of the Barcode scanner control in Power Apps.*

# Barcode scanner control (retired) in Power Apps

The legacy control for scanning barcodes, QR codes, and data-matrix codes on an Android, iOS, and Windows device.

> [!IMPORTANT]
> The barcode scanner control is retired as it is replaced by the [barcode reader control](control-barcodereader.md). While the legacy barcode scanner's existing functionality will continue to be supported in future versions of Power Apps, the barcode reader includes the latest improvements and should be used where possible.

## Prerequisites

The barcode scanner control is retired and needs to be enabled to show up in the insert pane.

With your app open for [editing](../edit-app.md) in [Power Apps Studio](https://create.powerapps.com):

1. Open **Settings**
1. Select **Upcoming features** in the left-hand menu and select the **Retired** tab
1. Turn on the **Legacy barcode scanner** setting

## Description

The control opens a native scanner on an Android, iOS, and Windows device. The scanner automatically detects a barcode, a QR code, or a data-matrix code when in view. The control doesn't support scanning in a web browser.

> [!NOTE]
> The barcode scanner control is supported on an Android, iOS, and Windows device. All other platforms will show a warning that some features of the app won't work.

## Key properties

**Value** – Output property that contains the text value of the code that was scanned most recently.

**Type** – Output property that contains the type of the code that was scanned most recently.

**OnScan** – Actions to perform when a barcode is successfully scanned.

**OnCancel** – Actions to perform when a barcode scan is canceled by the user.

**BarcodeType** - The barcode type to scan. You can target multiple barcode types by concatenating them. Ex. BarcodeType.Code128 & BarcodeType.Code39  **Default: Auto**

**PreferFrontCamera** - Whether the front-facing camera, when available, is used for scanning.

**FlashlightEnabled** - Whether the flashlight is enabled automatically when the scanner is opened.

## Additional properties

**Text** - Text that appears on the button that activates the scanner.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Height](properties-size-location.md)** – The height of the button that activates the scanner.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**Type** - The type of code that was detected in the scan that succeeded most recently.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The width of the button that activates the scanner.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen, if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen, if no parent container).

## Accessibility guidelines

The same guidelines for the **[Button](control-button.md)** control apply to the **Barcode scanner** control because it's a button that launches the scan.

### Visual alternatives

* The barcode scanner is a button that doesn't display the scan result. Consider showing the scan result with a **[Label](control-text-box.md)** control. Set the label's **[Text](properties-core.md)** property to the barcode scanner's **Value** property. Set the label's **[Live](properties-accessibility.md)** property to **Polite** so that screen-reader users are notified of changes. This change makes the scanned value accessible to everyone, irrespective of visual ability.

* Users who have visual and motor disabilities might prefer not to point the camera at a barcode. Consider adding another form of input, such as a **[Text input](control-text-input.md)** control, for users to enter barcodes.

## Barcode Availability by Device

| Barcode Type | Android | iOS | Windows |
|--------------|:-------:|:---:|:---:|
|QR_CODE|✔|✔|✔|
|DATA_MATRIX|✔|✔|✖|
|UPC_A|✔|✔|✔|
|UPC_E|✔|✔|✔|
|EAN_8|✔|✔|✔|
|EAN_13|✔|✔|✔|
|CODE_39|✔|✔|✔|
|CODE_93|✔|✔|✖|
|CODE_128|✔|✔|✔|
|CODABAR|✔|✖|✔|
|Databar Omnidirectional|✖|✖|✔|
|Databar Stacked|✖|✖|✔|
|GS1-DWCode|✖|✖|✔|
|ITF|✔|✔|✖|
|Interleaved 2 of 5|✖|✖|✔|
|RSS14|✔|✖|✖|
|PDF_417|✔|✔|✖|
|RSS_EXPANDED|✔|✖|✖|
|MSI|✖|✖|✖|
|AZTEC|✔|✔|✖|

> [!NOTE]
> PDF_417 and AZTEC aren't supported in Auto mode.

### See also

[Limitations of controls in Power Apps](../control-limitations.md)

---

## Button control in Power Apps

Source: [control-button.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-button)

*Learn about the details, properties and examples of the button control in Power Apps.*

# Button control in Power Apps
A control that the user can click or tap to interact with the app.

## Description
Configure the **[OnSelect](properties-core.md)** property of a **Button** control to run one or more formulas when the user clicks or taps the control.

## Key properties
**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[Text](properties-core.md)** – Text that appears on a control or that the user types into a control.

## Additional properties
**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**AutoDisableOnSelect** – Automatically disables the control while the **OnSelect** behavior is running.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**ContentLanguage** -  The language of the control's content, if different from the control's container.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**Pressed** – *True* while a control is being pressed, *false* otherwise.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[VerticalAlign](properties-text.md)** – The location of text on a control in relation to the vertical center of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
**[Navigate( *ScreenName*, *ScreenTransitionValue* )](../functions/function-navigate.md)**

## Examples
### Add a basic formula to a button
1. Add a **[Text input](control-text-input.md)** control, and name it **Source**.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a **Button** control, set its **[Text](properties-core.md)** property to "Add", and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **UpdateContext({Total:Total + Value(Source.Text)})**
   
    Want more information about the **[UpdateContext](../functions/function-updatecontext.md)** function or [other functions](../formula-reference.md)?
3. Add a **[Label](control-text-box.md)** control, set its **[Text](properties-core.md)** property in the formula bar to **Value(Total)**, and then press **F5**.
4. Clear the default text from **Source**, type a number in it, and then click or tap **Add**.
   
    The **[Label](control-text-box.md)** control shows the number that you typed.
5. Clear the number from **Source**, type another number in it, and then click or tap **Add**.
   
    The **[Label](control-text-box.md)** control shows the sum of the two numbers that you typed.
6. (optional) Repeat the previous step one or more times.
7. To return to the default workspace, press Esc (or click or tap the close icon in the upper-right corner).

### Configure a button with multiple formulas
Add a formula that clears the **Text input** control between entries.

1. Set the **[HintText](control-text-input.md)** property of **Source** to "Enter a number".
2. Set the **[OnSelect](properties-core.md)** property of **Add** to this formula:
   
    **UpdateContext({Total:Total + Value(Source.Text)});<br>UpdateContext({ClearInput: ""})**
   
    > [!NOTE]
   > Separate multiple formulas with a semi-colon “**;**”.
3. Set the **[Default](properties-core.md)** property of **Source** to **ClearInput**.
4. Press **F5**, and then test the app by adding several numbers together.

### Add another button to reset the total
Add a second button to clear the total between calculations.

1. Add another **Button** control, set its **[Text](properties-core.md)** property to "Clear", and set its **[OnSelect](properties-core.md)** property to this formula:
   
    **UpdateContext({Total:0})**
2. Press **F5**, add several numbers together, and then click or tap **Clear** to reset the total.

### Change a button's appearance
#### Change a button's shape
By default, Power Apps creates a rectangular **Button** control with rounded corners. You can make basic modifications to the shape of a **Button** control by setting its **[Height](properties-size-location.md)**, **[Width](properties-size-location.md)**, and **[Radius](properties-size-location.md)** properties.

> [!NOTE]
> [Icons and Shapes](control-shapes-icons.md) provide a wide variety of designs and can perform some of the same basic functions that **Button** controls do. However, **[Icons and Shapes](control-shapes-icons.md)** don’t have a **[Text](properties-core.md)** property.

1. Add a **Button** control, and set its **[Height](properties-size-location.md)** and **[Width](properties-size-location.md)** properties to **300** to make a large square button.
2. Modify the **[RadiusTopLeft](properties-size-location.md)**, **[RadiusTopRight](properties-size-location.md)**, **[RadiusBottomLeft](properties-size-location.md)**, and **[RadiusBottomRight](properties-size-location.md)** properties to adjust the amount of curvature on each corner. Here are some examples of different shapes, each one starting from a 300 x 300 square button:
   
   * Set all four **[Radius](properties-size-location.md)** values to **150** to create a circle.
   * Set the values for **[RadiusTopLeft](properties-size-location.md)** and **[RadiusBottomRight](properties-size-location.md)** to **300** to create a leaf-shaped **Button**.
   * Set the values for **[RadiusTopLeft](properties-size-location.md)** and **[RadiusTopRight](properties-size-location.md)** to **300**, and the values for **[RadiusBottomLeft](properties-size-location.md)** and **[RadiusBottomRight](properties-size-location.md)** to **100** to create a tab-shaped button.

#### Change a button's color when you hover over it
By default, the fill color of a **Button** control will dim by 20% when you hover over it with a mouse. You can adjust this behavior by changing the **[HoverFill](properties-color-border.md)** property, which uses the **[ColorFade](../functions/function-colors.md)** function. If you set the **[ColorFade](../functions/function-colors.md)** formula to a positive percentage, the color becomes lighter when you hover over the button, while a negative percentage makes the color darker.

* Change the **[ColorFade](../functions/function-colors.md)** percentage in the **[HoverFill](properties-color-border.md)** property of one of the buttons that you created, and observe the effects.

You can also specify the color of a **Button** control by setting its **[HoverFill](properties-color-border.md)** property to a formula that contains the **[ColorValue](../functions/function-colors.md)** function instead of the **[ColorFade](../functions/function-colors.md)** function, as in **ColorValue("Red")**.

> [!NOTE]
> The color value can be any CSS color definition, either a name or a hex value.

* Replace the **[ColorFade](../functions/function-colors.md)** function with a **[ColorValue](../functions/function-colors.md)** function in one of the buttons that you created, and observe the effects.


## Accessibility guidelines
### Color contrast
* [Standard color contrast requirements](../accessible-apps-color.md) apply.

### Screen reader support
* **[Text](properties-core.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Camera control in Power Apps

Source: [control-camera.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-camera)

*Learn about the details, properties and examples of the camera control in Power Apps.*

# Camera control in Power Apps

A control that enables users to take pictures using the camera on a device.

## Description

Use the **Camera** control to capture pictures with a device's camera. The device must have a camera and the user must authorize the app to use the camera.

Select the camera control to capture a picture from the camera.

The most recently captured picture is available through the **Photo** property.  With this property, the images can be:

- **Viewed with the Image control.** Use the [Image](control-image.md) control to view the captured image. For more information, see the [examples](#examples).  
- **Temporarily put in a variable or a collection.**  Use the [Set](../functions/function-set.md) or [Collect](../functions/function-clear-collect-clearcollect.md) functions to store images in a variable or a collection.  Use caution when using multiple images in a collection at the same time consuming device's limited memory. Use the [SaveData](../functions/function-savedata-loaddata.md) and [LoadData](../functions/function-savedata-loaddata.md) functions to move images to the local storage on the device and for [offline scenarios](../offline-apps.md).
- **Stored in a database.**  Use the [Patch](../functions/function-patch.md) function to store images in a database.
- **Transmitted as a base64 encoded text string.**  Use the [JSON](../functions/function-json.md) function to base64 encode images.

Use the **Stream**, **StreamRate**, and **OnStream** properties to automatically capture images on a timer, for example snapping a picture every minute to create a time-lapse sequence.

Captured media is referenced by a text string URI. For more information, read the [data type documentation](../functions/data-types.md#uris-for-images-and-other-media).

> [!NOTE]
> - The camera control is only supported on Microsoft Edge, Chrome, Firefox, and Opera browsers; and Android and iOS devices. All other browsers and platforms will show a warning that some features of the app won't work.
> - Images generated by the camera control have a maximum resolution of 640 x 480 px. If you need full resolution images, use the [Add picture](control-add-picture.md) control instead.
> - Depending on the make and model of your mobile device, the device camera might take a few seconds to initialize when using the camera control.

## Limitations

The camera control has these limitations:

1. When you use the camera control, the image doesn't contain meta-data information. This is due to a limitation of how we take images with the camera. To mitigate this issue, use the [Add picture control](control-add-picture.md)
1. If your mobile device is low on memory, the camera is temporarily disabled to avoid crashing the device.
1. Power Apps for Windows might crash if you open an app that uses a camera control. To avoid this problem, use the web player on the Windows platform. Also, multiple cameras aren't supported.


## Key properties

**AvailableDevices** – Table of the available cameras on the device.

Table contains two columns: 
- *Id* number to be used with the **Camera** property 
- *Name* provided by the device to identify the camera. Some platforms may include *Front* or *Back* to help locate the camera.

*Note*: Not all devices in the table may be usable in your app.  Some may be specialized drivers or applications intended for specific purposes.  

**Camera** – The numeric ID of the camera to use.  Helpful on devices with more than one camera.  

**OnStream** – Actions to perform when the **Stream** property is updated.

**Photo** – The image captured when the user takes a picture. 

**Stream** – Automatically updated image based on the **StreamRate** property.

**StreamRate** – How often to update the image on the **Stream** property, in milliseconds. This value can range from 100 (1/10th of a second) to 3,600,000 (1 hour).

## Additional properties

[AccessibleLabel](properties-accessibility.md) – Label for screen readers. Should describe the purpose of taking a picture.

[BorderColor](properties-color-border.md) – The color of a control's border.

[BorderStyle](properties-color-border.md) – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

[BorderThickness](properties-color-border.md) – The thickness of a control's border.

**Brightness** – How much light the user is likely to perceive in an image.

**Contrast** – How easily the user can distinguish between similar colors in an image.

[DisplayMode](properties-core.md) – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

[FocusedBorderColor](properties-color-border.md) – The color of a control's border when the control is focused.

[FocusedBorderThickness](properties-color-border.md) – The thickness of a control's border when the control is focused.

[Height](properties-size-location.md) – The distance between a control's top and bottom edges.

[OnSelect](properties-core.md) – Actions to perform when the user taps or clicks a control.

[TabIndex](properties-accessibility.md) – Keyboard navigation order compared to other controls.

[Tooltip](properties-core.md) – Explanatory text that appears when the user hovers over a control.

[Visible](properties-core.md) – Whether a control appears or is hidden.

[Width](properties-size-location.md) – The distance between a control's left and right edges.

[X](properties-size-location.md) – The distance between the left edge of a control and the left edge of its parent container or screen.

[Y](properties-size-location.md) – The distance between the top edge of a control and the top edge of the parent container or screen.

## Examples

For these examples, you'll need a device with a camera. To test your app, use a web cam accessible from your browser. Or by saving your app and loading it into an iOS or Android device with a camera.

### Simple display of a captured picture

1. [Add](../add-configure-controls.md) a **Camera** control.

1. Authorize the app to use device's camera if prompted.

1. Add an [**Image**](../controls/control-image.md) control.

1. Set the **Image** property of the **Image** control to the following formula:

    ```power-fx
    Camera1.Photo
    ```

    > [!NOTE]
    > Replace camera control name *Camera1* as appropriate.

1. Press F5 to preview your app.

1. Take a picture by selecting or tapping the camera control. You should see the result in your image control.

### Add pictures to an Image gallery control

1. Add a **Camera** control, name it **MyCamera**, and set its [OnSelect](properties-core.md) property to this formula:

    ```power-fx
    Collect( MyPix, MyCamera.Photo )
    ```

    For more information:

    - [How to add, name, and configure a control?](../add-configure-controls.md)
    - Read more about [Collect](../functions/function-clear-collect-clearcollect.md) function or [other functions](../formula-reference.md).

1. Press F5, and then take a picture by selecting or tapping **MyCamera**.

1. Add a [Vertical gallery](control-gallery.md) control. And then resize its [Image](control-image.md) control, its template, and the **Image gallery** control itself to fit in the screen.

1. Set the [Items](properties-core.md) property of the **Image gallery** control to this formula:
 
    ```power-fx
    MyPix
    ```

1. Set the [Image](properties-visual.md) property of the **Image** control in the gallery to this formula:

    ```power-fx   
    ThisItem.Url
    ```

    The picture that you took appears in the **Image gallery** control.

1. Take as many pictures as you want, and then return to the default workspace by pressing Esc.

1. (optional) Set the **OnSelect** property of the **Image** control in the **Image gallery** control to the formula:

    ```power-fx
    Remove( MyPix, ThisItem )
    ```

1. Press F5, and then select a picture to remove it.

Use the [SaveData](../functions/function-savedata-loaddata.md) function to save the pictures locally or the [Patch](../functions/function-patch.md) function to update a data source.

### Change the active camera from a drop down

1. [Add](../add-configure-controls.md) a **Camera** control.

1. Authorize the app to use device's camera if prompted.
    
1. [Add](../add-configure-controls.md) a [Drop down](control-drop-down.md) control.

1. Set the **Items** property of the dropdown to:

    ```power-fx
    Camera1.AvailableDevices
    ```

    > [!NOTE]
      > Replace camera control name *Camera1* as appropriate.
    
1. Set **Camera** property of the camera to: 

    ```power-fx
    Dropdown1.Selected.Id
    ```

    > [!NOTE]
      > Replace dropdown control name *Dropdown1* as appropriate.

1. Press F5, and then select an item from the dropdown to change the camera.

## Accessibility guidelines

The camera control shows camera feed and also functions as a button that takes a picture. So, there are similar accessibility considerations as with buttons.

### Video alternatives

Consider adding an alternative form of input for users with visual disabilities. For example, [Add picture](control-add-picture.md) to allow users to upload an image from their device.

### Color contrast

There must be adequate color contrast between [FocusedBorderColor](properties-color-border.md) and the outside color.

### Screen reader support

[AccessibleLabel](properties-accessibility.md) must be present.

### Keyboard support

- [TabIndex](properties-accessibility.md) must be zero or greater so that keyboard users can navigate to it.

- Focus indicators must be clearly visible. Use [FocusedBorderColor](properties-color-border.md) and [FocusedBorderThickness](properties-color-border.md) to update the visibility of focus indicators.

### See also

[Limitations of controls in Power Apps](../control-limitations.md)

---

## Card control in Power Apps

Source: [control-card.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-card)

*Learn about the details, properties and examples of the card control in Power Apps.*

# Card control in Power Apps
Provides the display and editing experience for a single field of a **[Display form](control-form-detail.md)** or **[Edit form](control-form-detail.md)** control.

## Description
**[Display form](control-form-detail.md)** and **[Edit form](control-form-detail.md)** controls act as containers for displaying and viewing entire records. Each container can hold a set of **Card** controls that display individual fields or provide a way to update those fields. Each card has a **DataField** property that specifies which field of the record it works on.  

Predefined cards are defined for different data types and user experiences.  For example, there may be a card to edit a number field with a **[Text input](control-text-input.md)** control, which is great for use with the keyboard. Another card might support editing a number by using a **[Slider](control-slider.md)** control instead. With the form control selected, you can, in the right-hand pane, easily select a card based on a field.

Cards themselves contain controls. The controls of a card make up the experience for displaying and editing a single field. For example, a number card may consist of a **[Label](control-text-box.md)** control to provide the display name of the field and a **[Text input](control-text-input.md)** control to provide an editor for the value of the field. The card may also have a **[Label](control-text-box.md)** control that shows any validation errors that occur and a **[Label](control-text-box.md)** control for the common asterisk to indicate that a field is required.

You can customize the controls of a predefined card by resizing it, moving it, hiding it, adding controls to it, and making other changes. You can also start with an entirely blank card, a "custom card", to which you add controls from scratch.

Predefined cards are *locked* by default. In a locked card, you can modify only certain properties of the card or the controls within the card, and you can't delete a locked card. You can show the card lock and unlock it on the **View** tab of the **Advanced** view. If a property is locked and can't be modified, it appears with a lock icon next to its name. Unlocking a card is an advanced activity and should be done with care, because automatic formula generation will no longer occur for the card, and you can't relock a card.

Within the form's container, the **ThisItem** record is available and contains all the fields of the record.  For example, the card's **[Default](properties-core.md)** property is often set to **ThisItem**.*FieldName*.

You can use the **Parent** reference to configure a control to reference the properties of a card.  For example, a control should use **Parent.Default** to read the initial state of the field from the data source. By using **Parent** instead of directly accessing the information that you want, the card is better encapsulated, and you can change it to a different field without breaking internal formulas.

See [Understand data cards](../working-with-cards.md) for examples of how to customize, unlock, and create cards.

## Key properties
**DataField** – The name of the field within a record that this card displays and edits.

* Specify the name as a single static string that's enclosed in double quotation marks (for example, **"Name"**), not a formula.
* Unbind a card by setting its **DataField** property *blank*. The **Valid** and **Update** properties are ignored for unbound cards.

**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

* For each control in a card, set this property to **Parent.Default** to refer to the default value of the field according to the data source. For example, set a slider's **[Default](properties-core.md)** property to **Parent.Default** to ensure that the user starts with a generic value for that slider.

**DisplayMode** – Values can be **Edit, View,** or **Disabled**. Configures whether the control inside the card allows user input (**Edit**), only displays data (**View**) or is disabled (**Disabled**).  

* Allows a single card to be used in both edit and view forms, by configuring this property, which is tied to the Form's behavior by default.
* In **View** mode, child controls such as **[Text input](control-text-input.md)**, **[Drop down](control-drop-down.md)**, **[Date Picker](control-date-picker.md)** will only display the text value and will not render any interactive elements or decorations.

**DisplayName** – The user friendly name for a field in a data source.

* The **[DataSourceInfo](../functions/function-datasourceinfo.md)** function provides this metadata from the data source.
* Controls within the card should use **Parent.DisplayName** to refer to the name of the field.

**Error** – The user friendly error message to display for this field when validation fails.

* This property is set when **SubmitForm** is called.  
* The message describes validation problems based on the data source's metadata and checking the card's **Required** property.

**Required** – Whether a card, editing the field of a data source, must contain a value.

* The **[DataSourceInfo](../functions/function-datasourceinfo.md)** function provides the required metadata from the data source.
* Controls within the card should use **Parent.Required** to determine whether that card's field is required.

**Update** – The value to write back to the data source for a field.

* Use this property's formula to pull the values from the edit controls of the card in order to write back to the data source. For example, set a card's **Update** property to **Slider.Value** to update the data source with a value from the slider in that card.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[WidthFit](properties-size-location.md)** – Whether a control automatically grows horizontally to fill any empty space in a container control such as an **[Edit form](control-form-detail.md)** control. If multiple cards have this property set to **true**, the space is divided between them. For more information, see [Understand data form layout](../working-with-form-layout.md).

## Additional properties
**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**Valid** – Whether a **Card** or **[Edit form](control-form-detail.md)** control contains valid entries, ready to be submitted to the data source.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container). For a **[Card](control-card.md)** control in a container that has multiple columns, this property determines the column in which the card appears.

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container). For a **[Card](control-card.md)** control in a container that has multiple rows, this property determines the row in which the card appears.

## Examples
See [Understand data cards](../working-with-cards.md) and [Understand data form layout](../working-with-form-layout.md) for examples.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **[Fill](properties-color-border.md)** and any child controls. For example, if a card contains a **[Label](control-text-box.md)** and the label has transparent fill, then the card's **[Fill](properties-color-border.md)** effectively becomes the background color for the label. Thus, there should be adequate contrast between the card's **[Fill](properties-color-border.md)** and the label's **[Color](properties-color-border.md)**.

### Screen reader support
* **DisplayName** must be present.

---

## Check box control in Power Apps

Source: [control-check-box.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-check-box)

*Learn about the details, properties and examples of the check box control in Power Apps.*

# Check box control in Power Apps
A control that the user can select or clear to set its value to **true** or **false**.

## Description
The user can specify a Boolean value by using this familiar control, which has been used in GUIs for decades.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

**[Text](properties-core.md)** – Text that appears on a control or that the user types into a control.

**[Value](properties-core.md)** – The value of an input control.

## Additional properties
**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**CheckboxBackgroundFill** – The background color of the box that surrounds the checkmark in a checkbox control.

**CheckboxBorderColor** – The color of the border that surrounds the checkmark in a checkbox control.

**CheckboxSize** – The width and height of the box that surrounds the checkmark in a checkbox control.

**CheckmarkFill** – The color of the checkmark in a checkbox control.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**OnCheck** – Actions to perform when the value of a checkbox or a toggle changes to **true**.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**OnUncheck** – Actions to perform when the value of a checkbox or a toggle changes to **false**.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[VerticalAlign](properties-text.md)** – The location of text on a control in relation to the vertical center of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**If**( *Condition*, *Result* )](../functions/function-if.md)

## Example
1. Add a **Check box** control, name it **chkReserve**, and set its **[Text](properties-core.md)** property to show **Reserve now**.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a **[Date picker](control-date-picker.md)** control, and set its **[Visible](properties-core.md)** property to this formula:
   <br>**If(chkReserve.Value = true, true)**
   
    Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?
3. Press F5, click or tap **chkReserve** to set its **[Value](properties-core.md)** property to **true**, and then click or tap **chkReserve** again to set its **[Value](properties-core.md)** property to **false**.
   
    The **[Date Picker](control-date-picker.md)** control appears when the **[Value](properties-core.md)** property of **chkReserve** is **true** but not when it's **false**.
4. To return to the default workspace, press Esc.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **CheckmarkFill** and **CheckboxBackgroundFill**
* **CheckboxBackgroundFill** and **[Fill](properties-color-border.md)**
* **CheckboxBackgroundFill** and **[PressedFill](properties-color-border.md)**
* **CheckboxBackgroundFill** and **[HoverFill](properties-color-border.md)**

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[Text](properties-core.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Column chart and Line chart controls in Power Apps

Source: [control-column-line-chart.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-column-line-chart)

*Learn about the details, properties and examples of the Column chart, and Line chart controls in Power Apps.*

# Column chart and Line chart controls in Power Apps
Controls that show data as graphs with x- and y-axes.

## Description
**Column chart** and **Line chart** are grouped controls. Each group contains three controls: a **[Label](control-text-box.md)** for the title, the chart graphic, and a **Legend**.

## Chart key properties
**[Items](properties-core.md)** – The source of data that appears in a control such as a gallery, a list, or a chart.

**NumberOfSeries** – How many columns of data are reflected in a column or line chart.

> [!NOTE]
> A maximum of 9 series can be displayed

## Additional chart properties
**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**GridStyle** – Whether a column or line chart shows its x-axis, its y-axis, both, or neither.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**ItemColorSet** – The color of each data point in a chart.

**ItemsGap** – The distance between columns in a column chart.

* The **ItemsGap** property is available for the **Column chart** control but not the **Line chart** control.

**Markers** – Whether a column or line chart shows the value of each data point.

**MarkerSuffix** – Text that appears after each value in a column chart for which the **Markers** property is set to **true**.

* The **MarkerSuffix** property is available for the **Column chart** control but not the **Line chart** control.

**MinimumBarWidth** – The narrowest possible width of columns in a column chart.

* The **MinimumBarWidth** property is available for the **Column chart** control but not the **Line chart** control.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**SeriesAxisMax** – The maximum value of the y-axis for a column or line chart.

* The **SeriesAxisMax** property is available for the **Column chart** control but not the **Line chart** control.

**SeriesAxisMin** – A number that determines the minimum value of the y-axis for a column chart.

* The **SeriesAxisMin** property is available for the **Column chart** control but not the **Line chart** control.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**XLabelAngle** – The angle of the labels below the x-axis of a column or line chart.

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**YAxisMax** – The maximum value of the y-axis for a line chart.

* The **YAxisMax** property is available for the **Line chart** control but not the **Column chart** control.

**YAxisMin** – The minimum value of the y-axis for a line chart.

* The **YAxisMin** property is available for the **Line chart** control but not the **Column chart** control.

**YLabelAngle** – The angle of the labels next to the y-axis of a line or column chart.

## Related functions
[**Max**( *DataSource*, *ColumnName* )](../functions/function-aggregates.md)

## Example
1. Add a **[Button](control-button.md)** control, and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **Collect(Revenue, {Year:"2013", Europa:24000, Ganymede:22300, Callisto:21200}, {Year:"2014", Europa:26500, Ganymede:25700, Callisto:24700},{Year:"2014", Europa:27900, Ganymede:28300, Callisto:25600})**
   
    Don't know how to [add and configure a control](../add-configure-controls.md)?
   
    Want more information about the **[Collect](../functions/function-clear-collect-clearcollect.md)** function or [other functions](../formula-reference.md)?
2. Press F5, click or tap the **[Button](control-button.md)** control, and then press Esc to return to the default workspace.
3. Add a **Column chart** control or a **Line chart** control, set its **[Items](properties-core.md)** property to **Revenue**, and set its **NumberOfSeries** property to **3**.
   
    The control shows revenue data for each product over three years.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* each item in **ItemColorSet**
* every item in **ItemColorSet** and the background color
* **[Color](properties-color-border.md)** and the background color

### Screen reader support
* There must be a **[Label](control-text-box.md)** immediately before the chart graphic to serve as the title.
* Consider adding a summary of the chart graphic. For example, "The line chart shows a steady increase in sales between March and August this year."

    > [!NOTE]
  > Chart graphics and **Legend** are hidden from screen reader users. As an alternative, a tabular form of the data is presented to them. They can also cycle through buttons that select data in the chart.

### Low vision support
* There must be a **Legend** if more than one series is shown.
* Consider setting **GridStyle** to GridStyle.All, which shows both axes. This helps all users accurately determine the scale of the data.
* For **Column chart**, consider setting **Markers** to **true**. This helps low-vision users determine the value of a column.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.

    > [!NOTE]
  > When keyboard users navigate to the chart, they can cycle through buttons that select data in the chart.

---

## Column control in Power Apps

Source: [control-column.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-column)

*Learn about the details, properties and examples of the column control in Power Apps.*

# Column control in Power Apps
Provides the display experience for a single field in a [**Data table**](control-data-table.md) control.

## Description
The [**Data table**](control-data-table.md) control shows a dataset in a tabular format, and each column in that tabular format is represented by a **Column** control. The **Column** control provides properties that the app maker can use to customize the appearance and behavior of the column.

## Capabilities
### Now available
* Change the width of a **Column** control.
* Change the text for a **Column** control.
* Navigate by clicking or tapping the value in a **Column** control.

### Not yet available
* Customize the styling of a **Column** control.

### Known issues
* The **Visible** property doesn't work yet.

## Properties
* **DisplayName** – The text that appears in the header for the column.
  
  > [!NOTE]
  > This property will soon be renamed **HeaderText**.
  > 
  > 
* **IsHyperlink** – A value that indicates whether the data in the column should be underlined to indicate that it's a hyperlink.
* [**Width**](properties-size-location.md) – The distance between the **Column** control’s left and right edges.

## Examples
### Resize a column
1. Create a blank tablet app.
2. On the **Insert** tab, click or tap **Data table**, and then resize the **Data table** control so that it covers the whole screen.
3. In the right pane, click or tap the down arrow to the right of **No data source selected**, and then click or tap **Add a data source**.
4. In the list of connections, click or tap the connection for your Microsoft Dataverse database.
5. In the list of tables, click or tap **Account**, and then click or tap **Connect**.
   
    The **Data table** control is initialized and shows a set of default fields.
6. Click or tap the **Full name** column.
   
    ![Column control selected.](./media/control-column/pre-resize-column.png)
7. Drag the adorner on the right side to resize the field.
   
    ![Column control resized.](./media/control-column/post-resize-column.png)


## Accessibility guidelines
### Screen reader support
* **DisplayName** must be present.

---

## Combo box control in Power Apps

Source: [control-combo-box.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-combo-box)

*Learn about the details, properties and examples of the combo box control in Power Apps.*

# Combo box control in Power Apps
A control that allows users to make selections from provided choices.  Supports search and multiple selections.

## Description
A **Combo box** control allows you to search for items you will select.  The search is performed server-side on the SearchField property so performance is not affected by large data sources.  

Single or multi-select mode is configured via the SelectMultiple property.

When searching for items to select, for each item you can choose to show a single data value, two values, or a picture and two values (Person) by modifying the Layout settings in the Data pane.

When you view the control on small screens, the items list flyout becomes a full screen control for better usability.

> [!NOTE]
> If you want to search for items with *numbers*, convert numbers to text with [Text()](../functions/function-text.md) function. For example, *Text(12345)*.

## Limitations

The combo box control has these limitations:

- When you use a Combo box control inside a gallery, its selections aren't maintained when the user scrolls the gallery. This isn't an issue if you use a Combo box control inside a gallery that doesn't scroll. A workaround isn't currently available.

## People picker
To use **Combo box** as a people picker, choose the **Person** template from the Layout settings in the Data pane and configure the related data properties to be shown for the person below.

## Key properties
**[Items](properties-core.md)** – The source of data from which selections can be made.

**DefaultSelectedItems** – The initial selected item(s) before the user interacts with the control.

> [!NOTE]
> **Default** property is deprecated, use **DefaultSelectedItems** instead.

**SelectedItems** – List of selected items resulting from user interaction.

**Selected** – The last selected item resulting from user interaction.

**SelectMultiple** – Whether the user can select a single item or multiple items.

**IsSearchable** – Whether the user can search for items before selecting.

> [!NOTE]
> **IsSearchable** can be enabled only on a data source that contains at least one text field. The **Items** expression must be delegable for queries to be delegated with searching. That is, **If** statements within the **Items** expression are not supported.

**SearchFields** - The data fields of the data source searched when user is entering text.  

> [!NOTE]
> To search on multiple fields, set **SearchFields** property in this format: ["MyFirstColumn", "MySecondColumn"].  Only text fields are supported.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**DisplayFields** – List of fields shown for each item returned by the search.  Easiest to configure via the Data pane in the Properties option tab.

> [!NOTE]
> To update multiple display fields in given template, set **DisplayFields** property in this format: `["MyFirstColumn", "MySecondColumn"]`.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**InputTextPlaceholder** – Instructional text shown to end users when no items are selected.

**OnChange** – Actions to perform when the user changes a selection.

**OnNavigate** – Actions to perform when the user selects an item.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or selects a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

> [!NOTE]
> Flyout border properties are controlled by **Border** properties.

## Examples

### Basic Combo box

The steps in this example apply to any [data source that provides tables](../connections-list.md#tables), but to follow these steps exactly, use an environment with Microsoft Dataverse database having sample data.

1. Select **Insert** > **Input** > **Combo box**, and name it "Combobox1".  

1. On the **Properties** pane on the right-side of the screen, open the **Select a data source** list (next to **Items**), and then add or select a data source such as the Accounts table.

1. On the same pane, select **Edit** (next to **Fields**).

1. In the **Data** pane, open the **Primary text** list, and then select the **Primary Name** column that will show in the **Combo box** control.

1. While holding down the **Alt** key, select the down arrow to open the **Combo box** control.

    The control shows the data from the Primary Name that you specified in the data source that you specified.

#### (Optional) Show the first record by default

1. Set the **DefaultSelectedItems** property to this expression, replacing *DataSource* with the name of your data source:
    
    ```power-fx    
    First(DataSource)
    ```

#### (Optional) Display selected Account Name value in a label

1. Select **Insert** > **Text label**, and then select **Label**.  
1. Set the **Text** property to this expression, replacing *Text* with the following formula:

    ```power-fx
    If(CountRows(ComboBox1.SelectedItems)>0, Concat(ComboBox1.SelectedItems,'Account Name',", "), "NO SELECTED ITEM")
    ```

    > [!NOTE]
    > The If statement will check to see how may selected items exist and display them in a comma delimited label or a "NO SELECTED ITEM" message when empty.

### Simulate simple drop-down behavior

By setting **IsSearchable** to false and **SelectMultiple** to false, you can achieve the same functionality of a drop-down.

1. Select **Insert** > **Input**, and then select **Combo box**.  

1. On the **Properties** pane on the right-side of the screen, open the **Select a data source** list (next to **Items**), and then add or select a data source.

1. On the same pane, select **Edit** (next to **Fields**).

1. In the **Data** pane, open the **Primary text** list, and then select the column that you want to show in the **Combo box** control.

1. Set the **IsSearchable** property to false.

1. Set the **SelectMultiple** property to false.

1. While holding down the **Alt** key, select the down arrow to open the **Combo box** control.

    The control shows the data from the column that you specified in the data source that you specified.
    
    > [!NOTE]
    > "Find items" text has disappeared, and that you'll only be able to select a single item.

## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **ChevronFill** and **ChevronBackground**
* **ChevronHoverFill** and **ChevronHoverBackground**
* **SelectionColor** and **SelectionFill**
* **SelectionFill** and **[Fill](properties-color-border.md)**
* **SelectionTagColor** and **SelectionTagFill**

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

    > [!NOTE]
  > On touch screens, screen reader users can navigate the contents of the combo box sequentially. The combo box acts as a button that shows or hides its contents when selected.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

    > [!NOTE]
  > The tab key navigates to or away from the combo box. Arrow keys navigate the contents of the combo box. The escape key closes the drop-down when opened.

---

## Container control in Power Apps

Source: [control-container.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-container)

*Learn about the details, properties and examples of the container control in Power Apps.*

# Container control in Power Apps

Groups logically-related controls to create hierarchies.

## Description

The container can hold a set of controls and has its own properties.

You can start with inserting a blank container. And then, customize it by adding controls to it, resizing it, moving it, hiding it, and making other changes. You can also start with a number of controls, select them and add using tree view.

## Limitations

- Containers don't work within forms.
- The following controls are not supported within a container:
    - [Data table](control-data-table.md)
    - [PDF viewer](control-pdf-viewer.md)
    - [Web barcode scanner](control-barcodescanner.md)

## Properties

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen, if no parent container). 

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen, if no parent container). 


## Frequently asked questions

### What is the difference between a container and a group?

When editing an app, you can select controls and group them using Ctrl + G or the context menu. You can modify common properties of controls within the group. Groups are an aid for app making. They don't have properties of their own and don't affect the layout of the app.

In contrast, containers are actual controls with their own properties like **Width** and **BorderColor**. Containers affect app layout and help screen reader users understand the structure of the app.

While you can add any controls in a group, you should only add logically-related controls in a container. For example, [controls in a tile should be placed in containers](../accessible-apps-structure.md#logical-control-order).

---

## Data table control in Power Apps

Source: [control-data-table.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-data-table)

*Learn about the details, properties and examples of the data table control in Power Apps.*

# Data table control in Power Apps
Shows a set of data in a tabular format.

## Description
The **Data table** control shows a dataset in a format that includes column headers for each field that the control shows. As an app maker, you have full control over which fields appear and in what order. Like the **Gallery** control, the **Data table** control maintains a **Selected** property that points to the selected row. Therefore, you can link the **Data table** control to other controls.

## Limitations

The data table control has these limitations:

- If you copy and paste a **Data Table** control for which the **Items** property is set to a formula that contains a **Filter** function, the formula for the **Items** property on the new **Data Table** control ends up with field names that contain a **_1** suffix. This makes the field names invalid and results in no data showing up in the data table. To work around this issue, before you copy the control, confirm that the **Filter** function doesn't reference any field in the data source that has the same name as a column in the **Data Table** control. If it does, rename the column in the **Data Table** control. Alternatively, remove the **_1** suffix from the invalid field names so that they match the names in the table.

## Capabilities
Power Apps introduced the **Data table** control on May 5, 2017. This section provides information about capabilities that are supported and capabilities that aren't supported.

### Now available
* Data in a **Data table** control is read-only.
* A single row is always selected in a **Data table** control.
* Link a **Data table** control to a connected or local data source.
* Adjust column widths in a **Data table** control while you run the app, though your changes aren't saved.
* A set of default fields appear in a **Data table** control when you link it to a connector that has implemented this capability, such as the Microsoft Dataverse. You can then show or hide these fields and others as necessary.
* Customize column width and heading text.
* Show hyperlinks in a **Data table** control.
* Copy and paste a **Data table** control.

### Not yet available
* Customize the styling of individual columns.
* Add a **Data table** control in a form control.
* Change the height of all rows.
* Show images in a **Data table** control.
* Show fields from related tables.
* Use built-in functionality to filter and sort data by column heading.
* Add a **Data table** control in a **Gallery** control.
* Edit data in the **Data table** control.
* Select multiple rows.

### Known issues
* No data appears if you use the **FirstN** function in the **Items** property.

## Key properties
* [**Items**](properties-core.md) – The source of data that appears in the **Data table** control.
* **Selected** – The selected row in the **Data table** control.

## Other properties

* **AutoWidth** - The property of a column inside a data table to define if the column width should be automatic, or manual.
* [**BorderColor**](properties-color-border.md) – The color of the **Data table** control's border.
* [**BorderStyle**](properties-color-border.md) – The style of the **Data table** control's border. The options are **Solid**, **Dashed**, **Dotted**, and **None**.
* [**BorderThickness**](properties-color-border.md) – The thickness of the **Data table** control's border.
* [**Color**](properties-color-border.md) – The default text color for all data rows.
* **FieldDisplayName** - The property of a column inside a data table that defines display name for the selected column.
* [**Fill**](properties-color-border.md) – The default background color for all data rows.
* [**Font**](properties-text.md) - The default font for all data rows.
* [**FontWeight**](properties-text.md) – The default font weight for all data rows.
* **HeadingColor** – The text color for the column headings.
* **HeadingFill** – The background color of the column headings.
* **HeadingFont** – The font of the column headings.
* **HeadingFontWeight** – The font weight of the column headings.
* **HeadingSize** – The font size of the column headings.
* [**Height**](properties-size-location.md) – The distance between the **Data table** control's top and bottom edges.
* [**HoverColor**](properties-color-border.md) – The text color for the row that the mouse pointer is pointing at.
* [**HoverFill**](properties-color-border.md) – The background color of the row that the mouse pointer is pointing at.
* **IsHyperlink** - The property of a column inside a data table that defines whether the selected column should be in hyperlink format or not.
* **NoDataText** – The message that the user receives when there are no records to show in the **Data table** control.
* **Order** - The property of a column inside a data table that determines order of the column respective to other columns. The order starts from left to right with first column order value of 1.
* **SelectedColor** – The color of the text in the selected row.
* **SelectedFill** – The background color of the selected row.
* [**Size**](properties-text.md) – The default font size for all data rows.
* **Text** - The property of a column inside a data table that defines text value of the data to be displayed inside the selected column.
* [**Visible**](properties-core.md) – A value that determines whether the **Data table** control appears or is hidden.
* [**Width**](properties-size-location.md) – The distance between the **Data table** control's left and right edges.
* [**X**](properties-size-location.md) – The distance between the left edge of the **Data table** control and the left edge of its parent container (or the left edge of the screen if there is no parent container).
* [**Y**](properties-size-location.md) – The distance between the top edge of the **Data table** control and the top edge of its parent container (or the top edge of the screen if there is no parent container).

## Related functions
* [**Filter(DataSource, Formula)**](../functions/function-filter-lookup.md)(*DataSource*, *Formula*)
* [**Search(DataSource, SearchString, Column)**](../functions/function-filter-lookup.md)(*DataSource*, *SearchString*, *Column*)

## Examples
### Basic usage
1. Create a blank tablet app.
2. On the **Insert** tab, click or tap **Data table**.
   
    ![Add a Data table control to a screen.](./media/control-data-table/insert-data-table.png)
   
    A **Data table** control is added to the screen.
3. Rename the **Data table** control **SalesOrderTable**, and resize it so that it covers the whole screen.
4. In the right pane, select **Data sources**, and select **Sales orders**. If the table isn't listed, search for the table, and connect to Microsoft Dataverse.
   
    ![Select the Sales order table.](./media/control-data-table/choose-so-data-table.png)
   
    The **Data table** control is now attached to the **Sales order** data source. Several initial fields appear in the **Data table** control, because we're using a connector that supports that capability.
   
    ![Data table order.](./media/control-data-table/pre-order-data-table.png)
7. In the right pane, select one or more check boxes to show or hide individual fields.
   
    For example, select the check box next to **CustomerPurchaseOrderReference** to hide this field.
8. In the right pane, reorder the fields by dragging them up or down.
   
    ![Reorder the fields as desired.](./media/control-data-table/field-re-order-data-table.png)
   
    The **SalesOrderTable** control shows the fields in the order that you specified.
   
    ![Updated Data table.](./media/control-data-table/post-order-data-table.png)

### Restyle the header for the Data table control
1. While the **Data table** control is selected, in the right pane, click or tap the **Advanced** tab.
2. Click or tap the field for the **HeadingFill** property, and then change the value to **RGBA(62,96,170,1)**.
3. Click or tap the field for the **HeadingColor** property, and then change the value to **White**.
4. Click or tap the field for the **HeadingSize** property, and then change the value to **14**.
   
    ![Data table.](./media/control-data-table/restyled-data-table.png)

### Connect a Data table control to another control
1. Add an **Edit form** control to the screen.
2. Resize the **Data table** and **Edit form** controls so that the **Data table** control appears in the left part of the screen and the **Edit form** control appears in the right part of the screen.
   
    ![Data table and Edit form on the same screen.](./media/control-data-table/data-table-empty-form.png)
3. While **Form1** is selected, in the right pane, change the number of columns to **1**.
4. Connect **Form1** to the **Sales order** data source.
   
    Several initial fields appear in **Form1**.
   
    ![Form1 with initial fields.](./media/control-data-table/data-table-disconnected-form.png)
5. In the right pane, click or tap the **Advanced** tab.
6. Set the **Item** property for **Form1** to **SalesOrderTable.Selected**.
   
    **Form1** shows information from the row that's selected in the **Data table** control.
   
    ![Edit form connected to the Data table.](./media/control-data-table/connected-form-data-table.png)


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* [**Color**](properties-color-border.md) and [**Fill**](properties-color-border.md)
* **HeadingColor** and **HeadingFill**
* **SelectedColor** and **SelectedFill**
* [**HoverColor**](properties-color-border.md) and [**HoverFill**](properties-color-border.md)

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **NoDataText** must be present.

---

## Date Picker control in Power Apps

Source: [control-date-picker.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-date-picker)

*Learn about the details, properties and examples of the Date Picker control in Power Apps.*

# Date Picker control in Power Apps

A control that the user can select to specify a date.

## Description
If you add a **Date Picker** control instead of a **[Text input](control-text-input.md)** control, you help ensure that the user specifies a date in the correct format.

## Key properties
**DefaultDate** – The initial value of a date control unless the user changes it.

**SelectedDate** – The date currently selected in a date control.  This date is represented in local time.

**Format** – The text format in which the control shows the date and the user specifies the date. You can set this property to **ShortDate** (default) or **LongDate** to format dates based on the **Language** property of this control. You can also set this property to an expression, such as **yyyy/mm/dd** if you want the same format regardless of language. For example:

* The control shows **12/31/2017** if the user clicks or taps the last day of 2017, the **Format** property is set to **ShortDate**, and the **Language** property is set to **en-us**.
* The control shows **dimanche 31 decembre 2017** if the user clicks or taps the last day of 2017, the **Format** property is set to **LongDate**, and the **Language** property is set to **fr-fr**.

**Language** – Determines the language that's used to format dates, including names of months. If this property isn't specified, the user's device setting determines the language. Supported values include "EN-us" and "FR".

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**DateTimeZone** – Whether to display the date in **UTC** or the user's **Local** time.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**EndYear** – The latest year to which the user can set value of a date-picker control.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**IconFill** – The foreground color of a the date picker icon.

**IconBackground** – The background color of a the date picker icon.

**InputTextPlaceholder** – Instructional text that appears if no dates are entered.

**IsEditable** – Whether the Date Picker text can be edited. If false, the date can only be changed by using the calendar.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[OnChange](properties-core.md)** –  Actions to perform when the user changes the value of a control. 

Difference between **OnChange** and **OnSelect**: OnSelect and OnChange trigger on the same user action if the user's *click* causes the change. In this case, OnSelect triggers **before** OnChange.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**Reset** - Whether the Date Picker control should be reset to the **DefaultDate** value.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**StartOfWeek** – The day of the week to display in the first day column of the date-picker control.

**StartYear** – The earliest year to which the user can set the value of a date-picker control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions

**[Year](../functions/function-datetime-parts.md)**( *DateTimeValue* )

## Examples

### Basic date picker

1. Add a **Date Picker** control, and name it "Deadline".

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

2. Add a **[Label](control-text-box.md)** control, and set its **[Text](properties-core.md)** property to the following formula:

   ```power-fx
    DateDiff(Today(), Deadline.SelectedDate) & " days to go!"
    ```

    Want more information about the **[DateDiff](../functions/function-dateadd-datediff.md)** function or [other functions](../formula-reference.md)?

3. Press **F5**, choose a date in **Deadline**, and then select **OK**.

    The **[Label](control-text-box.md)** control shows the number of days between today and the date that you chose.

4. To return to the default workspace, press Esc.

##  Reset date picker to default date

1. Add a **Date Picker** control, and name it "DateTimeReset".

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

1. Add a **[Button](control-button.md)** control, and set its **[OnChange](properties-core.md)** property to the following formula:
    ```power-fx
    Reset(DateTimeReset)
    ```

1. Press **F5**, choose a new date in **DateTimeReset**, and then select **OK**.

1. Press the button. The date will reset back to the **DefaultDate** (Today).

1. To return to the default workspace, press Esc.

## Accessibility guidelines
### Color contrast
* [Standard color contrast requirements](../accessible-apps-color.md) apply.

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.
* If **IsEditable** is true and **Format** is not what users expect, add a **[Label](control-text-box.md)** to explain accepted date formats.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

> [!TIP]
> When the calendar is open, press **Page up** and **Page down** to navigate between months and **Shift+Page up** and **Shift+Page down** to navigate between years.

---

## Edit form and Display form controls in Power Apps

Source: [control-form-detail.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-form-detail)

*Learn about the details, properties and examples of the Edit form and Display form controls in Power Apps.*

# Edit form and Display form controls in Power Apps
Display, edit, and create a record in a data source.

> [!NOTE]
> This article describes the classic Edit form and Display form controls. For the modern form built on the Microsoft Fluent 2 design system, see [Form modern control](modern-controls/modern-control-form.md). Both the classic and modern forms are supported.

## Description
If you add a **Display form** control, the user can display all fields of a record or only the fields that you specify. If you add an **Edit form** control, the user can edit those fields, create a record, and save those changes to a data source.

![Example form and form view controls.](./media/control-form-detail/form-detail-intro.png)

If you add a **[Gallery](control-gallery.md)** control, you can configure it to show a table in a data source and then configure a form to show whichever record the user selects in the gallery. You can also add one or more **[Button](control-button.md)** controls that the user can select to save edits, cancel edits, and create a record. By using controls together, you can [create a complete solution](../working-with-forms.md).


## Limitations

The form control has these limitations:

- You can't copy and paste forms into data cards. This is to prevent certain combinations of controls from being created that risk the stability and performance of the app. 


### Record selection
For either type of form, you set its **DataSource** property to a table of records, and you set the form's **Item** property to show a specific record in that table. For example, you can set the **Item** property of a form to the **SelectedItem** property of a **[Gallery](control-gallery.md)** control. When the user selects a record in the gallery, the same record appears in the form, except that the form can show more fields. If the user returns to the gallery and selects a different record, the **SelectedItem** property of the gallery changes. This change updates the **Item** property of the form, which then shows the newly selected record.

You can also set a form's **Item** property by using a **Drop down** control, as [Show, edit, or add a record](../add-form.md) describes, or a function such as **Lookup** or **First**. For example, you can set the **Item** property to either of these formulas to show the Fabrikam entry in the **Accounts** table in Microsoft Dataverse:

```First(Accounts)```

```Lookup(Accounts, "Fabrikam" in name)```

Each form control contains one or more **[Card](control-card.md)** controls. By setting the **[DataField](control-card.md)** property of a card, you [specify which field that card shows and other details](../add-form.md).

### Create a record
When an **Edit form** control is in **Edit** mode, the user can update the record that's specified in the form's **Item** property. If inspected, the **Mode** property returns **Edit**.

When an **Edit form** control is in **New** mode, however, the **Item** property is ignored. The form doesn't show an existing record; instead, the values in each field match the default values of the data source with which you configured the form. The **[NewForm](../functions/function-form.md)** function causes a form to switch to this mode.

For example, you can set the **[Text](properties-core.md)** property of a button to show **New** and its **[OnSelect](properties-core.md)** property to a formula that includes the **[NewForm](../functions/function-form.md)** function. If the user selects that button, the form switches to **New** mode so that the user can create a record starting with known values.

A form switches back to **Edit** mode if either the **[ResetForm](../functions/function-form.md)** function runs or the **[SubmitForm](../functions/function-form.md)** function runs successfully.

* You can set the **[Text](properties-core.md)** property of a button to show **Cancel** and its **[OnSelect](properties-core.md)** property to a formula that includes the **[ResetForm](../functions/function-form.md)** function. If the user selects that button, any changes in progress are discarded, and the values in the form, once again, match the default values of the data source.
* You can set the **[Text](properties-core.md)** property of a button to show **Save changes** and its **[OnSelect](properties-core.md)** property to a formula that includes the **[SubmitForm](../functions/function-form.md)** function. If the user selects that button and the data source is updated, the values in the form are reset to the default values of the data source.

### Save changes
If you create a **Save changes** button as the previous section describes, the user can create or update a record and then select that button to save those changes to the data source. You could, instead, configure an **[Image](control-image.md)** control or some other control to perform the same task, as long as you configure that control with the **[SubmitForm](../functions/function-form.md)** function. In any case, the **Error**, **ErrorKind**, **OnSuccess**, and **OnFailure** properties provide feedback on the outcome.

When the **[SubmitForm](../functions/function-form.md)** function runs, it first validates the data that user wants to submit. If a required field doesn't contain a value or another value doesn't conform to some other constraint, the **ErrorKind** properties are set, and the **OnFailure** formula runs. You can configure the **Save changes** button or other control so that the user can select it only if the data is valid (that is, if the **Valid** property of the form is **true**). Note that the user must not only correct the problem but also select the **Save changes** button again (or discard the changes by selecting a **Cancel** button, as described earlier) to reset the **Error** and **ErrorKind** properties.

If the data passes validation, **[SubmitForm](../functions/function-form.md)** sends it to the data source, which can take some time depending on network latency.

* If the submission succeeds, the **Error** property is cleared, the **ErrorKind** property is set to **ErrorKind.None**, and the **OnSuccess** formula runs. If the user created a record (that is, if the form was previously in **New** mode), the form is switched to **Edit** mode so that the user can edit the newly created record or a different one.
* If the submission fails, the **Error** property contains a user-friendly error message from the data source, explaining the problem. The **ErrorKind** property is set appropriately, depending on the issue, and the **OnFailure** formula runs.

Some data sources can detect when two people try to update the same record at the same time  In this case, **ErrorKind** is set to **ErrorKind.Conflict**, and the remedy is to refresh the data source with the other user's changes and reapply the change made by this user.

> [!TIP]
> If you offer a **Cancel** button on your form so that the user can abandon changes in progress, add the **[ResetForm](../functions/function-form.md)** function to the button's **[OnSelect](properties-core.md)** property even that property also contains a **[Navigate](../functions/function-navigate.md)** function to change screens. Otherwise, the form will retain the user's changes.

### Layout
By default, cards are placed in a single column for phone apps and three columns for tablet apps. You can specify how many columns a form has and whether cards should snap to them as you configure the form. These settings aren't exposed as properties because they're used only to set the **X**, **Y**, and **Width** properties of the cards.

For more information, see [Understand data form layout](../working-with-form-layout.md).

## Key properties
**DataSource** – The data source that contains the record that the user will show, edit, or create.

* If you don't set this property, the user can't show, edit, or create a record, and no additional metadata or validation is provided.

**DefaultMode** - The initial mode of the form control.  See the description of **Mode** below for the acceptable values and their meanings. 

**DisplayMode** - The mode to use for data cards and controls within the form control.  

Derived from the **Mode** property based and cannot be set independently:

| Mode | DisplayMode | Description |
| --- | --- | --- |
| **FormMode.Edit** |**DisplayMode.Edit** |Data cards and controls are editable, ready to accept changes to a record. |
| **FormMode.New** |**DisplayMode.Edit** |Data cards and controls are editable, ready to accept a new record. |
| **FormMode.View** |**DisplayMode.View** |Data cards and controls are not editable and optimized for viewing. |

**Error** – A user friendly error message to display for this form when the **[SubmitForm](../functions/function-form.md)** function fails.

* This property applies only to the **Edit form** control.
* This property changes only when the **[SubmitForm](../functions/function-form.md)**, **EditForm**, or **[ResetForm](../functions/function-form.md)** function runs.
* If no error occurs, this property is *blank*, and **ErrorKind** is set to **ErrorKind.None**.
* When possible, the error message returned will be in the user's language. Some error messages come from the data source directly and may not be in the user's language.

**ErrorKind** – If an error occurs when **SubmitForm** runs, the kind of error that occurred.

* Applies only to an **Edit form** control.
* This property has the same enumeration as the **[Errors](../functions/function-errors.md)** function. An **Edit form** control can return these values:

| ErrorKind | Description |
| --- | --- |
| **ErrorKind.Conflict** |Another user changed the same record, resulting in a change conflict. Execute the **[Refresh](../functions/function-refresh.md)** function to reload the record, and try the change again. |
| **ErrorKind.None** |The error is of an unknown kind. |
| **ErrorKind.Sync** |The data source reported an error. Check the **Error** property for more information. |
| **ErrorKind.Validation** |A general validation issue was detected. |

**Item** – The record in the **DataSource** that the user will show or edit.

**LastSubmit** – The last successfully submitted record, including any server generated fields.

* This property applies only to the **Edit form** control.
* If the data source automatically generates or calculates any fields, such as an **ID** field with a unique number, the **LastSubmit** property will have this new value after **SubmitForm** successfully runs.
* The value of this property is available in the **OnSuccess** formula.

**Mode** – The control is in **Edit** or **New** mode.

| Mode | Description |
| --- | --- |
| **FormMode.Edit** |The user can edit a record by using the form. The values in the form's cards are pre-populated with the existing record, for the user to change. If the **[SubmitForm](../functions/function-form.md)** function runs successfully, an existing record is modified. |
| **FormMode.New** |The user can create a record by using the form. The values in the form's controls are pre-populated with the defaults for a record of the data source. If the **[SubmitForm](../functions/function-form.md)** function runs successfully, a record is created. |
| **FormMode.View** |The user can view a record by using the form. The values in the form's controls are pre-populated with the defaults for a record of the data source. |

The form switches from **New** mode to **Edit** mode when any of these changes occurs:

* The form is successfully submitted, and a record is created. If the gallery is set to automatically move selection to this new record, the form will be in **Edit** mode for the created record so that the user can make additional changes.
* The **[EditForm](../functions/function-form.md)** function runs.
* The **[ResetForm](../functions/function-form.md)** function runs. For example, the user might select a **Cancel** button that's been configured with this function.

**OnFailure** – Actions to perform when a data operation has been unsuccessful.

* This property applies only to the **Edit form** control.

**OnReset** – Actions to perform when an **Edit form** control is reset.

* This property applies only to the **Edit form** control.

**OnSuccess** – Actions to perform when a data operation has been successful.

* This property applies only to the **Edit form** control.

**Unsaved** – True if the **Edit form** control contains user changes that have not been saved.

* This property applies only to the **Edit form** control.
* Use this property to warn the user before they lose any unsaved changes.  To prevent the user from selecting a different record in a **[Gallery](control-gallery.md)** control before saving changes to the current record, set the gallery's **[Disabled](properties-core.md)** property to **Form.Unsaved** and, likewise, disable refresh operations.

**Updates** – The values to write back to the data source for a record loaded in a form control.  

* This property applies only to the **Edit form** control.
* Use this property to extract the field values from the cards within the control.  You can then use these values to manually update the data source with a **[Patch](../functions/function-patch.md)** function call or another method exposed by a connection.  You do not need to use this property if you are using the **[SubmitForm](../functions/function-form.md)** function.
* This property returns a record of values.  For example, if the form control contains card controls for **Name** and **Quantity** fields, and the values of the **[Update](control-card.md)** properties for those cards return "Widget" and 10 respectively, then the **Updates** property for the form control would return **{ Name: "Widget", Quantity: 10 }**.

**Valid** – Whether a **[Card](control-card.md)** or **Edit form** control contains valid entries, ready to be submitted to the data source.

* This property applies only to the **Edit form** control.
* A **Form** control's **Valid** property aggregates the **Valid** properties of all the **[Card](control-card.md)** controls in the form. A form's **Valid** property is **true** only if the data in all cards in that form is valid; otherwise, the form's **Valid** property is **false**.
* To enable a button to save changes only when the data in a form is valid but hasn't yet been submitted, set the button's **DisplayMode** property to this formula:
  
    **SubmitButton.DisplayMode = If(IsBlank( Form.Error ) || Form.Valid, DisplayMode.Edit, DisplayMode.Disabled)**

## Additional properties
**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## More information
- For a comprehensive overview of how forms work, see [Understand data forms](../working-with-forms.md).
- See the [Power Fx formula reference for EditForm](/power-platform/power-fx/reference/function-form).

## Accessibility guidelines
### Screen reader support
* Consider adding a heading to the form using a **[Label](control-text-box.md)**.

---

## Drop down control in Power Apps

Source: [control-drop-down.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-drop-down)

*Learn about the details, properties, and examples of the drop-down control in Power Apps.*

# Drop down control in Power Apps
A list that shows only the first item unless the user opens it.

## Description
A **Drop down** control conserves screen real estate, especially when the list contains many choices. The control takes up only one line unless the user selects the chevron to reveal more choices. The control shows a maximum of 500 items.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before the user specifies a different value.

**[Items](properties-core.md)** – The source of data that contains the items that appear in the control. If the source has multiple columns, set the control's **Value** property to the column of data that you want to show.
  
**Value** – The column of data that you want to show in the control (for example, if a data source has multiple columns).

**Selected** – The data record that represents the selected item.

**AllowEmptySelection** – Whether the control can have no selected items. When false, there will always be a selected item, which will initially be the **Default** or the first item.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**ChevronBackground** – The color behind the down arrow in a dropdown list.

**ChevronFill** – The color of the down arrow in a dropdown list.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user selects a control.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user selects that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user selects that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user selects that control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**SelectedText (Deprecated)** – A string value that represents the selected item. Use **Dropdown1.SelectedText.Value** instead, replacing "Dropdown1" with drop-down control name in the app.

**[SelectionColor](properties-color-border.md)** – The text color of a selected item or items in a list or the color of the selection tool in a pen control.

**[SelectionFill](properties-color-border.md)** – The background color of a selected item or items in a list or a selected area of a pen control.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

> [!NOTE]
> Flyout border properties are controlled by **FocusedBorder** properties.

## Examples

### Simple list

1. Add a **Drop down** control and set its **[Items](properties-core.md)** property to this expression:

    `["Seattle", "Tokyo", "London", "Johannesburg", "Rio de Janeiro"]`

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

1. Show the items in the list by selecting the control's down arrow while pressing the **Alt** key.

### List from a data source
The principles in this procedure apply to any [data source that provides tables](../connections-list.md#tables) but, to follow these steps exactly, you must open an environment for which a Microsoft Dataverse database has been created and sample data added.

1. [Open a blank app](../data-platform-create-app-scratch.md#add-a-dataverse-table-in-a-blank-app) and add the **Accounts** table from Dataverse.

1. Add a **Drop down** control and set its **[Items](properties-core.md)** property to this formula:

    `Distinct(Accounts, 'Address 1: City')`

    This formula shows all the cities in the **Accounts** table. If more than one record has the same city, the **[Distinct](../functions/function-distinct.md)** function hides the duplication in your drop-down control.

1. (Optional) Rename your **Drop down** control to **Cities**, add a vertical **Gallery** control, and set the gallery's **[Items](properties-core.md)** property to this formula:

    `Filter(Accounts, address1_city == Cities.Selected.Result)`

    This **[Filter](../functions/function-filter-lookup.md)** function shows only those records in the **Accounts** table for which the city matches the selected value in the **Cities** control.

## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **ChevronFill** and **ChevronBackground**
* **ChevronHoverFill** and **ChevronHoverBackground**
* **SelectionColor** and **SelectionFill**
* **SelectionFill** and **[Fill](properties-color-border.md)**

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Export and Import controls in Power Apps

Source: [control-export-import.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-export-import)

*Learn about the details, properties and examples of the Export and Import controls in Power Apps.*

# Export and Import controls in Power Apps
Controls for exporting data to a local file and then importing that data into another app in Power Apps.

## Description
If you want to create more than one app that uses the same data but not share that data outside those apps, you can export it and import it by using an **Export** control and an **Import** control. When you export data, you create a compressed file that you can copy to another machine, but you can't read it in any program other than Power Apps.

## Warning
Enabling this functionality in your app may expose it to security vulnerabilities and data leakage.  It is recommended to advise users to import only recognized and trusted files and only export data that is not confidential or sensitive.

## Limitations
The export functionality isn't supported in web browsers.

## Key properties
**Data** – The name of a collection that you want to export to a local file.

* The **Data** property is available for an **Export** control but not an **Import** control.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

## Additional properties
**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[Padding](properties-size-location.md)** – The distance between the text on an import or export button and the edges of that button.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Text](properties-core.md)** – Text that appears on a control or that the user types into a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[VerticalAlign](properties-text.md)** – The location of text on a control in relation to the vertical center of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Example
1. Add a **[Button](control-button.md)** control, and set its **[OnSelect](properties-core.md)** property to this formula: <br>
   ```
   ClearCollect(Products, {Name:"Europa", Price:"10.99"}, {Name:"Ganymede", Price:"12.49"}, {Name:"Callisto", Price:"11.79"})
   ```
   For more details, read [adding, naming, and configuring a control](../add-configure-controls.md), **[ClearCollect](../functions/function-clear-collect-clearcollect.md)** and [other functions](../formula-reference.md).
2. Press F5 and select **[Button](control-button.md)** control, and then press Esc.
3. Add an **Export** control, and set its **Data** property to **Products**.
4. Press F5 and select the **Export** control to download the file *Data.zip*.
5. Select **Save**, then press Esc to return to the default workspace.
6. In a new or existing app, add an **Import** control, name it **MyData**, and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **Collect(ImportedProducts, MyData.Data)**
7. Press F5 and select **MyData**, then select the file that you exported, and then select **Open**.
8. Press Esc and select **Collections** on the **File** menu, and confirm that the current app has the data that you exported.


## Accessibility guidelines
The same guidelines for **[Button](control-button.md)**  apply because **Export** and **Import** are just specialized buttons.

---

## Gallery control in Power Apps

Source: [control-gallery.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-gallery)

*Learn about the details, properties and examples of the gallery control in Power Apps.*

# Gallery control in Power Apps

A control that contains other controls and shows a set of data.

## Description

A **Gallery** control can show multiple records from a data source, and each record can contain multiple types of data. For example, use a **Gallery** control to show multiple contacts with each item showing contact information that includes a name, an address, and a phone number for each contact.

Each data field appears in a separate control within the **Gallery** control. And you can configure those controls in its template. The template appears as the first item inside the gallery:

- On the left edge of a **Gallery** control in horizontal/landscape orientation.
- And at the top of a **Gallery** control in vertical/portrait orientation. 

Any changes that you make in the template are reflected throughout the **Gallery** control.

Predefined templates for showing images and text in a gallery are available, and a gallery for variable-height items.

## Limitations

The gallery control has these limitations:

1. If a user scrolls the **Flexible height** gallery control before all items are loaded, the item that's currently in view may be pushed down and out of view when the data loading is finished. To avoid this issue, use a standard **Gallery** control instead of the **Flexible height** variant.
1. The following controls are not supported within a gallery:
    - [Display form](control-form-detail.md)
    - [Edit form](control-form-detail.md)
    - [PDF viewer](control-pdf-viewer.md)
    - [Power BI tile](control-power-bi-tile.md)
    - [Rich text editor](control-richtexteditor.md)
    - [Scrollable screen (Fluid grid)](../add-scrolling-screen.md)
    - [Web barcode scanner](control-barcodescanner.md)
1. You cannot add a gallery inside another gallery if the latter is already inside another gallery. The maximum level of nesting is 2.
1. The minimum **TemplateSize** is one. This can cause controls in the **Gallery** to drift from their expected **X** or **Y** values, when you don't account for the template size.
1. If you generate an app automatically from data, save the app, and then reopen it, the browse gallery might not immediately show any data. To resolve this issue, type at least one character in the search box, and then delete the text that you typed. The gallery will then show the data as expected.
1. If a gallery includes a ComboBox, DatePicker, Slider, or Toggle control with an `OnChange` rule that patches the same data source or collection as the gallery, it may lead to unexpected or reduced performance. This is because an `OnChange` rule that patches the data source of the gallery can create a never-ending cycle of patching and reloading. To avoid this issue, it is advisable not to use `OnChange` rules when these controls are placed within a gallery.




## Key properties

[Default](properties-core.md) – The item or record from the data source to be selected in the gallery when the app starts up.

[Items](properties-core.md) – The source of data that appears in a control such as a gallery, a list, or a chart.

**Selected** – The selected item.

## Additional properties

[AccessibleLabel](properties-accessibility.md) – Label of the gallery (not the items it contains) for screen readers. Should describe what the list of items are.

**AllItems** – Items that are loaded in the gallery. This may be less than the actual number of **Items** of the data source. More items may be loaded when the gallery is scrolled. **AllItems** also contains controls that are used in each gallery item.

**AllItemsCount** - Count of items that are loaded in the gallery. This may be less than the actual number of **Items** of the data source. More items may be loaded when the gallery is scrolled.

[BorderColor](properties-color-border.md) – The color of a control's border.

[BorderStyle](properties-color-border.md) – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

[BorderThickness](properties-color-border.md) – The thickness of a control's border.

**DelayItemLoading** - Delay loading of items (rows) until after the screen first loads.

[DisplayMode](properties-core.md) – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

[Fill](properties-color-border.md) – The background color of a control.

[Height](properties-size-location.md) – The distance between a control's top and bottom edges.

**ItemAccessibleLabel** – Label of each gallery item for screen readers. Should describe what each item is.

**LoadingSpinner** (**None**, **Controls** or **Data**) - When None, spinner will not be shown. When Controls | Data, spinner will be shown when a render pass occurs that results in visible empty rows.

**LoadingSpinnerColor** - The fill color of the loading spinner.  Default is set to BorderColor.

**NavigationStep** – How far a gallery scrolls if its **ShowNavigation** property is set to **true** and the user selects a navigation arrow at either end of that gallery.

**Selectable** – Whether gallery items can be selected. When set to **true**, screen readers identify the gallery as a selectable list. And you select an item by selecting it. When set to **false**, screen readers identify the gallery as a regular list, and selecting an item doesn't select it.

**ShowNavigation** – Whether an arrow appears at each end of a gallery so that a user can scroll through the items in the gallery by selecting an arrow.

**ShowScrollbar** – Whether a scrollbar appears when the user hovers over a gallery.

**TemplateFill** – The background color of a gallery.

**TemplatePadding** – The distance between items in a gallery.

**TemplateSize** – The height of the template for a gallery in vertical/portrait orientation. Or the width of the template for a gallery in horizontal/landscape orientation. The minimum size is one.

**Transition** – The visual effect (**Pop**, **Push**, or **None**) when the user hovers over an item in a gallery.

[Visible](properties-core.md) – Whether a control appears or is hidden.

[Width](properties-size-location.md) – The distance between a control's left and right edges.

**WrapCount** – Number of items shown per row or column based on horizontal or vertical layout.

[X](properties-size-location.md) – The distance between the left edge of a control and the left edge of its parent container or screen.

[Y](properties-size-location.md) – The distance between the top edge of a control and the top edge of the parent container or screen.

## Related functions

[Filter( *DataSource*, *Formula* )](../functions/function-filter-lookup.md)

[Reset( *Control* )](../functions/function-reset.md) - Resets your gallery back to its initial state. Initial state includes scrolling to the first item and selecting the first item or default if present. 

  > [!NOTE]
  > **Reset** control does not recursively reset all the children of the gallery.

## Examples

### Show and filter data

- [Show text](control-text-box.md#show-data-in-a-gallery)
- [Show images](control-image.md#show-a-set-of-images-from-a-data-source)
- [Filter data by selecting a list option](control-drop-down.md#examples)
- [Filter data by adjusting a slider](control-slider.md#example)

### Get data from the user

- [Get text](control-text-input.md#collect-data)
- [Get images](control-add-picture.md#add-images-to-an-image-gallery-control)
- [Get photos](control-camera.md#examples)
- [Get sounds](control-microphone.md#examples)
- [Get drawings](control-pen-input.md#create-a-set-of-images)

## Accessibility guidelines

### Color contrast

If clicking anywhere in a gallery item is meant to select it, there must be adequate color contrast between:

- [BorderColor](properties-color-border.md) and the color outside the gallery (if there is a border).
- [Fill](properties-color-border.md) and the color outside the gallery (if there's no border).

### Screen reader support

- [AccessibleLabel](properties-accessibility.md) must be present.

    > [!NOTE]
    > Screen readers will announce when items in the gallery change. The **AccessibleLabel** is also mentioned. This gives context to the announcement and is even more important when there are multiple galleries on the same screen.

- When a gallery item contains multiple controls, use **ItemAccessibleLabel** to show the contents of gallery items.

- Set the value of **Selectable** to **true** if you want users to select a gallery item. Otherwise, set that value to **false**.

- When a gallery item contains multiple controls, use **ItemAccessibleLabel** to provide a summary of the gallery item's contents.

- **Selectable** should be set appropriately, depending on whether users are meant to select a gallery item.

### Keyboard support

- Consider setting **ShowScrollbar** to **true**. On most touch screen devices, the scrollbar won't show until scrolling begins.
- If clicking anywhere in a gallery item is meant to select it, there must also be way for keyboard users to select the gallery item. For example, adding a [Button](control-button.md) that has its **OnSelect** property set to **Select(Parent)**.

    > [!NOTE]
  > Controls outside the gallery are not considered in the keyboard navigation order within the gallery. [TabIndex](properties-accessibility.md) controls inside a gallery are scoped. See [accessibility properties](properties-accessibility.md) to learn more.

### See also

[Use DelayItemLoading and Loading spinner to improve performance in Gallery](../performance-tips.md#use-delayitemloading-and-loading-spinner-to-improve-performance-in-gallery)

---

## Grid container control in Power Apps

Source: [control-grid-container.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-grid-container)

*Learn about the details, properties and examples of the grid container control in Power Apps.*

# Grid container control in Power Apps


The **Grid container** control gives you a way to **layout child components in a grid pattern**. You get precise control over where each component goes in terms of rows and columns.

This container works like CSS-style grids. You define the **rows and columns** and set the exact position for each child component using its properties.

## Description

The **Grid container** control offers a flexible layout system for canvas apps. It enables you to:

- Place child components in a **grid pattern**
- Specify the **row and column start and end** for each child
- Make responsive adjustments when the container or screen size changes
- Control alignment, spacing, and overflow within the grid

By using this approach, you don't need to manually position each component. Your apps become **more maintainable and responsive**.


## Display properties

- **Gap** – The spacing in pixels between child components inside the grid.
- **Columns** – The number of columns in the grid layout.
- **Rows** – The number of rows in the grid layout.

## Size and position

- **X** – The horizontal distance from the left edge of the parent container (or screen if no parent).
- **Y** – The vertical distance from the top edge of the parent container (or screen if no parent).
- **Width** – The distance between a control's left and right edges.
- **Height** – The distance between a control's top and bottom edges.
- **Padding** - The spacing between the container edges and its child components.

## Color and border

- **Color** – Foreground color of the container, used for borders and text if applicable.
- **Border**
  - **Style** – Type of border: Solid, Dashed, Dotted, or None.
  - **Thickness** – Width of the border in pixels.
  - **Color** – Color of the border.
- **Border radius** – The degree to which the corners of the container are rounded. You can apply this setting to all corners uniformly or split it into individual corners in advanced settings.
- **Drop shadow** – Shadow effect applied to the container. Options: None, Light, Medium, or Heavy.

## Visibility

- **Visible** – Whether the grid container is displayed. Toggle **On** or **Off**.

## Grid layout properties (child-specific)

- **Column Start / Column End** – Defines the starting and ending columns for a child component.
- **Row Start / Row End** – Defines the starting and ending rows for a child component.

## Example

1. [Create a blank canvas app from scratch](../create-blank-app.md) with a **Responsive** layout.
1. Create a new screen.
1. From the **Insert** pane under **Layout**, select **Grid container**.
1. Set container properties to occupy the full screen:  
   - X = 0  
   - Y = 0  
   - Width = Parent.Width  
   - Height = Parent.Height

1. Add several child components, such as buttons, text inputs, icons, and media. For each child, set grid placement properties:  
   - Column Start / End  
   - Row Start / End  
   - Align in Cell

1. Press **F5** to preview. Resize the screen and observe how child components **remain in their grid positions** and adjust responsively.

---

## Horizontal container control in Power Apps

Source: [control-horizontal-container.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-horizontal-container)

*Learn about the details, properties and examples of the horizontal container control in Power Apps.*

# Horizontal container control in Power Apps

Horizontal container control determines the position of the child components so that you never have to set X, Y for a component inside the container.

## Description

**Horizontal** container control distributes the available space to its child components based on the settings, as well as determines alignment of the child components.

## Properties

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** - The color of the container control.

**[Drop shadow](properties-color-border.md)** - Adds shadow effects around the control.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**Direction** - Defines in what direction the container layouts its child components. **Horizontal** and **Vertical**.

**Justify (vertical)** - Defines how child elements are aligned with the primary axis. **Start**, **End**, **Center**, **Space Between**.

**Align (Horizontal)** - Defines how child components are positioned in the container, in the off axis (opposite from `LayoutDirection`). **Start**, **Center**, **End**, **Stretch**.

**Gap** - Defines the space between containers child components in pixels. 

**Horizontal Overflow** - Defines whether the container shows scrollbars or remove content when it is too large to fit. **Scroll** and **Hide**.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.


**Vertical Overflow** - Defines whether the container shows scrollbars or remove content when it is too large to fit. **Scroll** and **Hide**.

**Wrap** -  Defines whether the content wraps to a new row or column when it cannot fit.

**Align in container** - Defines how the individual component is aligned to the parent. The default value, **Set by container**, inherits the value from the parent’s `LayoutAlignItems` property, while other properties can be used to customize the alignment for the individual child component. **Set by container**, **Start**, **End**, **Center**, and **Stretch**. 

**Fill portions** - Defines how the individual component grows when there is more screen real-estate assigned to its parent.  The number represents the portion of the extra space given to the component out of all the available extra space claimed by children of its parent.  For example, if child A has `Fill portions` set to 1 and child B has `Fill portions` set to 2, child A gets 1/3 of the extra space available while child B gets 2/3 of the extra available space.

**Minimum width** - Represent the minimum size of the component in the direction of the `Fill portions` (that is, the parent’s `Direction`).

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).


## Example

1. Create a [blank canvas app](../create-blank-app.md) with **Tablet** layout.
1. Select **File** > **Settings** > **Screen size + orientation** and disable **Scale to fit**, **Lock aspect ratio**, and **Lock orientation** and select **Apply**. 
1. Now from the **Insert** panes in the left sidebar, under **Layout** tab, select **Horizontal container**. 

   > [!div class="mx-imgBorder"]
   > ![Insert containers.](../media/create-responsive-layout/insert-containers.png "Insert containers")

1. Set the following properties to occupy the full available space of the screen:
   1. X = 0
   1. Y= 0
   1. Width = Parent.Width
   1. Height = Parent. Height
 
1. Add few buttons, text inputs, media, icons, and select **F5** to see how the app adjusts to the screen changes.

---

## HTML text control in Power Apps

Source: [control-html-text.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-html-text)

*Learn about the details, properties, and examples of the HTML text control in Power Apps.*

# HTML text control in Power Apps
A box that shows text and converts HTML tags to formatting.

## Description
An **HTML text** control not only shows plain text and numbers but also converts HTML tags, such as non-breaking spaces.

> [!NOTE]
> HTML text control assumes the HtmlText is relatively positioned. If you need to use an absolute position for your HTML text, wrap the text around a relatively positioned div. For example, `"<div style='position:relative'>" & varPageContent & "</div>"`

> [!NOTE]
> For some HTML elements default browser styling might be deleted. For instance, for HTML list (`<ul>`, `<ol>`) you will need to write your own inline styles to get the default styling back. For example,
```html
<ul style='display: block;
           list-style-type: disc;
           margin-block-start: 1em;
           margin-block-end: 1em;
           margin-inline-start: 0px;
           margin-inline-end: 0px;
           padding-inline-start: 40px;'>
  ...
</ul>
```

## Key properties
**[Color](properties-color-border.md)** – The color of text in a control.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**HtmlText** – Text that appears in an HTML text control and that may contain HTML tags.

## Additional properties
**[AutoHeight](properties-core.md)** – Set to true to allow the control to auto-grow its height to show all text. Set to false to truncate the text to the height assigned.

> [!NOTE]
> Enabling the **AutoHeight** property will grow the **Height** property of the control to a maximum value of 7680.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[OnSelect](properties-core.md)** – Actions to do when the user selects a control.

> [!NOTE]
> **OnSelect** is ignored for hyperlinks within the content referenced inside **HtmlText** property.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Find**( *FindString*, *WithinString* )](../functions/function-find.md)

## Example

1. Add a **[Label](control-text-box.md)** control, name it **Source**, and set its **[Text](properties-core.md)** property to this string:

    "\<p>We've\&nbsp;done an unusually \&quot;deep\&quot; globalization and localization.\<p>"

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

1. Add an **HTML text** control, and set its **HtmlText** property to this value:<br>
   **Source.Text**

     The **HTML text** control shows the same text as the **[Label](control-text-box.md)** control but converts the tags to the appropriate characters.

## Accessibility guidelines

ARIA mapping for elements inside the **HTML text** control are not defined automatically by Power Apps.

### Color contrast
There must be adequate color contrast between:
* **[Color](properties-color-border.md)** and **[Fill](properties-color-border.md)**
* Text with custom colors and its background

### Keyboard support
* The control can't act as a button. It doesn't have **TabIndex** and keyboard users won't be able to focus on it.
* The control can contain interactive parts in **HtmlText** like `<a>` elements, but the app setting **Simplified tab indexes" must be enabled. Otherwise, the tab navigation order will be wrong.

---

## Shape and Icon controls in Power Apps

Source: [control-shapes-icons.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-shapes-icons)

*Learn about the details, properties and examples of the Shape and Icon controls in Power Apps.*

# Shape and Icon controls in Power Apps
Graphics for which you can configure appearance and behavior properties.

## Description
These controls include arrows, geometric shapes, action icons, and symbols for which you can configure properties such as fill, size, and location. You can also configure their **[OnSelect](properties-core.md)** property so that the app responds if the user selects the control.

## Key properties (icons and shapes)
**[Fill](properties-color-border.md)** – The background color of a control.

**[OnSelect](properties-core.md)** – Actions to perform when the user selects a control.

## Key properties (icons only)

**Icon** - The type of icon to display (for example, **ArrowDown** or **ShoppingCart**). 

**Rotation** - The number of degrees to rotate the icon. 

**Color** - The color of the icon by name or RGBA values.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user selects that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user selects that control.

**[TabIndex](properties-accessibility.md)** – Keyboard-navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions

[**Navigate**( *ScreenName*, *ScreenTransition* )](../functions/function-navigate.md)

## Example

1. Name the default **[Screen](control-screen.md)** control **Target**, add a **[Label](control-text-box.md)** control, and set its **[Text](properties-core.md)** property to show **Target**.

    Don't know how to [add and configure a control](../add-configure-controls.md)?

1. Add a **[Screen](control-screen.md)** control, and name it **Source**.

1. In **Source**, add a **Shape** control, and set its **[OnSelect](properties-core.md)** property to this formula:

  `Navigate(Target, ScreenTransition.Fade)`
  
1. Press F5, and then select the **Shape** control.

    The **Target** screen appears.

1. (optional) Press Esc to return to the default workspace, add a **Shape** control to **Target**, and set the **[OnSelect](properties-core.md)** property of the **Shape** control to this formula:

  `Navigate(Source, ScreenTransition.Fade)`

## Accessibility guidelines

### Color contrast

The following applies only to graphics that are used as buttons or are otherwise not just for decoration.

For icons:
- **[Color](properties-color-border.md)** and **[Fill](properties-color-border.md)**
- Other [standard color contrast requirements](../accessible-apps-color.md) apply (if used as a button)

For shapes with borders:
- **[BorderColor](properties-color-border.md)** and the color outside the control
- **[FocusedBorderColor](properties-color-border.md)** and the color outside the control (if used as a button)

For shapes without borders:
- **[Fill](properties-color-border.md)** and the color outside the control
- **[PressedFill](properties-color-border.md)** and the color outside the control (if used as a button)
- **[HoverFill](properties-color-border.md)** and the color outside the control (if used as a button)

### Screen-reader support
- **[AccessibleLabel](properties-accessibility.md)** must be set for important graphics.

- If the graphic is for decoration or provides redundant information, leave **[AccessibleLabel](properties-accessibility.md)** empty or set it to the empty string **""** . Screen readers will ignore these graphics.

For example, you might place a **Lock** icon next to a **[Label](control-text-box.md)** that says **This form cannot be modified**. You don't need an **[AccessibleLabel](properties-accessibility.md)** for the icon because the **Label** already explains its meaning.

> [!IMPORTANT]
> When **[TabIndex](properties-accessibility.md)** is zero or greater, the icon or shape becomes a button. Its appearance doesn't change, but screen readers will treat it as a button. They will not ignore the control, even if **AccessibleLabel** is empty. When **[TabIndex](properties-accessibility.md)** is less than zero, screen readers treat the icon or shape as an image.

### Keyboard support
- **[TabIndex](properties-accessibility.md)** must be zero or greater if the graphic is used as a button. Keyboard users can then navigate to it.

- Focus indicators must be clearly visible if the graphic is used as a button. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this result.

---

## Image control in Power Apps

Source: [control-image.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-image)

*Learn about the details, properties and examples of the image control in Power Apps.*

# Image control in Power Apps
A control that shows an image from, for example, a local file or a data source.

## Description
If you add one or more **Image** controls to your app, you can show individual images that aren't part of a data set, or you can incorporate images from records in data sources.

## Key properties
**[Image](properties-visual.md)** – The name or the URL of the image that appears in an image, audio, or microphone control. 

> [!NOTE]
> - Use HTTPS for all external images to ensure compatibility with modern browsers.
> - External images must be accessible anonymously (without any authentication).

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**ApplyEXIFOrientation** – Whether to automatically apply the orientation specified in the EXIF data embedded with the image.

**AutoDisableOnSelect** – Automatically disables the control while the OnSelect behavior is executing.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**CalculateOriginalDimensions** – Enables the **OriginalHeight** and **OriginalWidth** properties.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**FlipHorizontal** – Whether to flip the image horizontally before displaying it.

**FlipVertical** – Whether to flip the image vertically before displaying it.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[ImagePosition](properties-visual.md)** – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.

**ImageRotation** – How to rotate the image before displaying it.  Values can be none, clockwise (CW) 90 degrees, counter-clockwise (CCW) 90 degrees and clockwise 180 degrees.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**OriginalHeight** – Original height of an image, enabled with the **CalculateOriginalDimensions** property.

**OriginalWidth** – Original width of an image, enabled with the **CalculateOriginalDimensions** property.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**Transparency** – The degree to which controls behind an image remain visible. Decimal values range from 0 to 1.  Where 0 is opaque, 0.5 is semi-transparent and 1 is transparent. 

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Remove**( *DataSource*, ThisItem )](../functions/function-remove-removeif.md)

## Examples
### Show an image from a local file
1. On the **File** menu, click or tap **Media**, and then click or tap **Browse**.
2. Click or tap the image file that you want to add, click or tap **Open**, and then press Esc to return to the default workspace.
3. Add an **Image** control, and set its **Image** property to the name of the file that you added.

    Don't know how to [add and configure a control](../add-configure-controls.md)?

    The **Image** control shows the image that you specified.

### Show a set of images from a data source
1. Download this [Excel file](https://download.microsoft.com/download/5/7/f/57fc6c55-6bb0-479b-a5c5-98fa08ee9efd/FlooringEstimates.xlsx), and save it on your local device.
2. In Power Apps Studio, create or open an app, and then click or tap **Add data source** in the right-hand pane.

    If **Add data source** doesn't appear in the right-hand pane, click or tap a screen in the left navigation bar.
3. Click or tap **Add static data to your app**, click or tap the Excel file that you downloaded, and then click or tap **Open**.
4. Select the **Flooring Estimates** check box, and then click or tap **Connect**.
5. Add a **Gallery** control with images, and set its **[Items](properties-core.md)** property to **FlooringEstimates**.

    Don't know how to [add and configure a control](../add-configure-controls.md)?

    The **Gallery** control shows images of carpet, hardwood, and tile products based on links in the Excel file that you downloaded.


## Accessibility guidelines
### Color contrast
* [Standard color contrast requirements](../accessible-apps-color.md) apply, if the graphic is used as a button.
* Consider checking for contrast issues within the image, if it is not purely decorative.

### Screen reader support
- **[AccessibleLabel](properties-accessibility.md)** must be set for important graphics.

- If the graphic is for decoration or provides redundant information, leave **[AccessibleLabel](properties-accessibility.md)** empty or set it to the empty string **""** . Screen readers will ignore these graphics.

For example, you might place an **Image** of a padlock next to a **[Label](control-text-box.md)** that says **This form cannot be modified**. You don't need an **[AccessibleLabel](properties-accessibility.md)** for the image because the **Label** already explains its meaning.

> [!IMPORTANT]
> When **[TabIndex](properties-accessibility.md)** is zero or greater, the **Image** becomes a button. Its appearance doesn't change, but screen readers will treat it as a button. They will not ignore the control, even if **AccessibleLabel** is empty.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater, if the graphic is used as a button. Keyboard users can then navigate to it.

* Focus indicators must be clearly visible, if the graphic is used as a button. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this result.

---

## List Box control in Power Apps

Source: [control-list-box.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-list-box)

*Learn about the details, properties and examples of the List Box control in Power Apps.*

# List Box control in Power Apps
A list in which the user can select one or multiple items.

## Description
A **List Box** control always shows all available choices (unlike a **[Drop down](control-drop-down.md)** control) and in which the user can choose more than one item at a time (unlike a **[Radio](control-radio.md)** control).

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user. 
 > [!NOTE]
 > You can only have one default selected item. If you need multiple selected items please use the [Combo Box](control-combo-box.md) control.

**[Items](properties-core.md)** – The source of data that appears in a control such as a gallery, a list, or a chart.

When you add a gallery, a list, or a chart, the property list shows **Items** by default so that you can easily specify the data that the new control should show. For example, you might set the **Items** property of a gallery to the **Account** table in Salesforce, a table named **Inventory** that you created in Excel and uploaded to the cloud, or a list named **ConferenceSpeakers**.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**ItemPaddingLeft** – The distance between text in a listbox and its left edge.

**[LineHeight](properties-text.md)** – The distance between, for example, lines of text or items in a list.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**Selected** – The data record that represents the selected item.
  > [!NOTE]
  > You can only have one default selected item. If you need multiple selected items please use the [Combo Box](control-combo-box.md) control.

**SelectedItems** - **Read-only**. Represents a datatable of selected items for a multiselect listbox.

**SelectedItemsText** - **Read-only**. Represents a datatable of selected items text for a multiselect listbox.

**SelectedText (Deprecated)** – A string value that represents the selected item.

**[SelectionColor](properties-color-border.md)** – The text color of a selected item or items in a list or the color of the selection tool in a pen control.

**[SelectionFill](properties-color-border.md)** – The background color of a selected item or items in a list or a selected area of a pen control.

**SelectMultiple** – Whether a user can select more than one item in a listbox.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Distinct**( *DataSource*, *ColumnName* )](../functions/function-distinct.md)

## Example
1. Add a **List box** control, name it **CategoryList**, and set its **[Items](properties-core.md)** property to this formula:<br>
   **["Carpet","Hardwood","Tile"]**
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
   
    ![Flooring categories in listbox.](./media/control-list-box/category-listbox.png)
2. Add three **[Drop down](control-drop-down.md)** controls, move them under **CategoryList**, and name them **CarpetList**, **HardwoodList**, and **TileList**.
3. Set the **[Items](properties-core.md)** property of each **[Drop down](control-drop-down.md)** control to one of these values:
   
   * CarpetList: **["Caserta Stone Beige","Ageless Beauty Clay", "Lush II Tundra"]**
   * HardwoodList: **["Golden Teak","Natural Hickory", "Victoria Mahogany"]**
   * TileList: **["Honey Onyx Marble","Indian Autumn Slate", "Panaria Vitality Ceramic"]**
     
     ![Flooring names in dropdown lists.](./media/control-list-box/flooring-names.png)
4. Set the **[Visible](properties-core.md)** property of each **[Drop down](control-drop-down.md)** control to one of these values:
   
   * CarpetList: **If("Carpet" in CategoryList.SelectedItems.Value, true)**
   * HardwoodList: **If("Hardwood" in CategoryList.SelectedItems.Value, true)**
   * TileList: **If("Tile" in CategoryList.SelectedItems.Value, true)**
     
     Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?
5. Press F5, and then choose one or more items in **CategoryList**.
   
    The appropriate **[Drop down](control-drop-down.md)** control or controls appear based on your choice or choices.
   
    ![Selected lists.](./media/control-list-box/selected-lists.png)
6. (optional) Press Esc to return to the default workspace.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **SelectionColor** and **SelectionFill**
* **SelectionFill** and **[Fill](properties-color-border.md)**
* **[HoverFill](properties-color-border.md)** and **[Fill](properties-color-border.md)**
* **[PressedFill](properties-color-border.md)** and **[Fill](properties-color-border.md)**

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

  > [!NOTE]
  > The tab key navigates to or away from the **List box**. Arrow keys navigate the contents of the **List box**.

---

## Microphone control in Power Apps

Source: [control-microphone.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-microphone)

*Learn about the details, properties and examples of the Microphone control in Power Apps.*

# Microphone control in Power Apps

A control that enables app users to record sounds from their device.

## Description

Use the **Microphone** control to capture audio with a device's microphone. The device must have a microphone and the user must authorize the app to use the microphone. 

The most recently recorded audio clip is available through the **Audio** property. With this property, recorded audio can be:

- **Played back with the Audio control.**  Use the [Audio](control-audio-video.md) control to listen to the recording. For more information, see the [examples](#examples).
- **Temporarily put in a variable or a collection.**  Use the [Set](../functions/function-set.md) or [Collect](../functions/function-clear-collect-clearcollect.md) functions to store audio clips in a variable or a collection.  Use caution with multiple audio clips in a collection at the same time with device's limited memory.  Use the [SaveData](../functions/function-savedata-loaddata.md) and [LoadData](../functions/function-savedata-loaddata.md) functions to move audio clips to the local storage on the device and for [offline scenarios](../offline-apps.md).
- **Stored in a database.**  Use the [Patch](../functions/function-patch.md) function to store audio clips in a database.
- **Transmitted as a base64 encoded text string.**  Use the [JSON](../functions/function-json.md) function to base64 encode audio clips.

Format of the recorded audio:

- *3gp* format for *Android*.
- *AAC* format for *iOS*.
- *OGG* format for *web browsers*.

Captured media is referenced by a text string URI. For more information, read the [data type documentation](../functions/data-types.md#uris-for-images-and-other-media).

> [!NOTE]
> The microphone control is supported only on Microsoft Edge based on Chromium, Chrome, and Firefox browsers; and Android and iOS devices. All other browsers and platforms will show a warning that some features of the app won't work.

## Limitations

The microphone control has these limitations:

- Power Apps Mobile runs on various types of devices, and some of them have limitations that are specific to that platform:
    - You can play videos in multiple **Video** controls at the same time on all platforms except iPhone devices.
    - You can record audio with multiple **Microphone** controls at the same time on all platforms except the web player.

## Key properties

**Audio** – The audio clip captured when the user records with the device's microphone. 

**Mic** – Numeric ID of the microphone on a device that has more than one microphone.

**OnStop** – Actions to perform when the user stops recording with a microphone control.

## Additional properties

[AccessibleLabel](properties-accessibility.md) – Label for screen readers. Should describe the purpose of the microphone.

[BorderColor](properties-color-border.md) – The color of a control's border.

[BorderStyle](properties-color-border.md) – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

[BorderThickness](properties-color-border.md) – The thickness of a control's border.

[Color](properties-color-border.md) – The color of text in a control.

[DisplayMode](properties-core.md) – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

[DisabledBorderColor](properties-color-border.md) – The color of a control's border if the control's [DisplayMode](properties-core.md) property is set to **Disabled**.

[DisabledColor](properties-color-border.md) – The color of text in a control if its [DisplayMode](properties-core.md) property is set to **Disabled**.

[DisabledFill](properties-color-border.md) – The background color of a control if its [DisplayMode](properties-core.md) property is set to **Disabled**.

[Fill](properties-color-border.md) – The background color of a control.

[FocusedBorderColor](properties-color-border.md) – The color of a control's border when the control is focused.

[FocusedBorderThickness](properties-color-border.md) – The thickness of a control's border when the control is focused.

[Height](properties-size-location.md) – The distance between a control's top and bottom edges.

[HoverBorderColor](properties-color-border.md) – The color of a control's border when the user keeps the mouse pointer on that control.

[HoverColor](properties-color-border.md) – The color of the text in a control when the user keeps the mouse pointer on it.

[HoverFill](properties-color-border.md) – The background color of a control when the user keeps the mouse pointer on it.

[Image](properties-visual.md) – The name of the image that appears in an image, audio, or microphone control.

[ImagePosition](properties-visual.md) – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.

[OnSelect](properties-core.md) – Actions to perform when the user selects a control.

**OnStart** – Actions to perform when the user starts to record with a microphone control.

[PressedBorderColor](properties-color-border.md) – The color of a control's border when the user selects that control.

[PressedColor](properties-color-border.md) – The color of text in a control when the user selects that control.

[PressedFill](properties-color-border.md) – The background color of a control when the user selects that control.

[Reset](properties-core.md) – Whether a control reverts to its default value.

[TabIndex](properties-accessibility.md) – Keyboard navigation order compared to other controls.

[Tooltip](properties-core.md) – Explanatory text that appears when the user hovers over a control.

[Visible](properties-core.md) – Whether a control appears or is hidden.

[Width](properties-size-location.md) – The distance between a control's left and right edges.

[X](properties-size-location.md) – The distance between the left edge of a control and the left edge of its parent container or screen.

[Y](properties-size-location.md) – The distance between the top edge of a control and the top edge of the parent container or screen.

## Examples

### Simple direct playback

In this example, we'll directly connect a **Microphone** control with an **Audio** control for immediate playback:

1. [Add](../add-configure-controls.md) a **Microphone** control to your app.
1. Authorize the app to use device's microphone if prompted.
1. Add an **Audio** control to your app.
1. Set the **Audio** control's **Media** property to the formula:

    ```power-fx
    Microphone1.Audio
    ```

    > [!NOTE]
    > Replace microphone control name *Microphone1* as appropriate.

1. Preview the app.
1. Select the **Microphone** control to begin recording.
1. Speak to record audio.
1. Select the **Microphone** control again to end the recording.
1. Select the **Audio** control to hear the recording.  

### Add sounds to a Gallery control

In this example, we'll create a gallery of audio clips stored in a collection that can be individually selected for playback:

1. [Add](../add-configure-controls.md) a **Microphone** control.

1. Set its **OnStop** property to this formula using the [Collect](../functions/function-clear-collect-clearcollect.md) function:

    ```power-fx
    Collect( MySounds, MyMic.Audio )
    ```

1. Add a **Gallery** control, move it below **MyMic**.

1. Set the [Items](properties-core.md) property for the gallery to this formula:

    ```power-fx
    MySounds
    ```

1. In the template for the **Custom gallery** control, add an [Audio](control-audio-video.md) control.

1. Set the audio control's **Media** property to this formula:

    ```power-fx
    ThisItem.Url
    ```

1. Press F5 to preview the app.

1. Select **MyMic** to start recording, and then select it again to stop recording.

1. In the **Gallery** control, select the play button in the **Audio** control to play back your recording.

1. Add as many recordings as you want, and then return to the default workspace by pressing the Esc key.

1. (optional) In the template for the **Gallery** control, add a [Button](control-button.md) control.

1. Set its [OnSelect](properties-core.md) property to the formula:

    ```power-fx
    Remove( MySounds, ThisItem )
    ```

1. Press F5, and then remove a recording by selecting the corresponding **Button** control.

Use the [SaveData](../functions/function-savedata-loaddata.md) function to save the recordings locally or the [Patch](../functions/function-patch.md) function to update a data source.

## Accessibility guidelines

The same guidelines for [Button](control-button.md)  apply because **Microphone** is just a specialized button. Also, consider:

### Audio alternatives

Consider adding an alternative form of input for users with speech disabilities or without a microphone. For example, [Text input](control-text-input.md) to allow users to enter text.

### Color contrast

- Read the [standard color contrast requirements](../accessible-apps-color.md).
- Ensure adequate color contrast between [Image](properties-visual.md) and the button text and icon (if applicable).

### Screen reader support

- [AccessibleLabel](properties-accessibility.md) must be present.

### See also

[Limitations of controls in Power Apps](../control-limitations.md)

---

## PDF viewer control (experimental) in Power Apps

Source: [control-pdf-viewer.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-pdf-viewer)

*Learn about the details, properties, and examples of the PDF viewer control in Power Apps.*

# PDF viewer control (experimental) in Power Apps

An experimental control that shows the content of a PDF file.

## Description

Show text, graphics, and other content in a PDF file by adding this type of control and setting its **Document** property to the URL, enclosed in double quotation marks, of the file that you want to show.

## Limitations

1. The PDF viewer control only supports PDF files that conform to the PDF32000 specification.

1. The security architecture of Power Apps requires the PDF Viewer to support only HTTPS links, not HTTP.  

1. The **Document** property must link directly to the PDF file. Server redirects or HTML views of the document aren't supported.

1. The file must be accessible anonymously without any authentication.

1. You can't view a PDF document in your app if the document resides on a server that has restrictive cross-origin resource sharing (CORS) settings. To resolve this issue, the server that hosts PDF documents must permit cross-origin requests from powerapps.com.

1. Embedded objects like scripts and buttons don't run.

1. Printing the document isn't supported.

App users can work around these limitations by opening PDF documents in an external browser, as prompted if the control can't open a document. This option is also available in the control menu for all external documents.

## Key properties

**Document** – The URL, enclosed in double-quotation marks, of a PDF file.

## Additional properties

**ActualZoom** – The actual zoom of the control, which might differ from the zoom requested with the **Zoom** property.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**CurrentFindText** – The current search term that is in use.

**CurrentPage** – The number of the page in a PDF file that is actually being shown.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**FindNext** – Finds the next instance of **FindText** in the document.

**FindPrevious** – Finds the previous instance of **FindText** in the document.

**FindText** – The search term to look for in the document.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or selects a control.

**OnStateChange** – Actions to perform when the state of the control changes.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**Page** – The number of the page that you want to show.

**PageCount** – The number of pages in a document.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or selects that control.

**ShowControls** – Whether an audio or video player shows, for example, a play button and a volume slider, and a pen control shows, for example, icons for drawing, erasing, and clearing.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Zoom** – The percentage by which an image from a camera is magnified or the view of a file in a PDF viewer.

## Keyboard shortcuts

- **J** - Page down
- **K** - Page up
- **N** - Page down
- **R** - Rotate all pages 90° clockwise

## Example

Add a **PDF viewer** control, and set its **Document** property to the URL, enclosed in double quotation marks, of a PDF file as in this example:

  **"https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf"**

The control shows the PDF file.

Don't know how to [add and configure a control](../add-configure-controls.md)?

## Accessibility guidelines

Not all accessibility features of PDF documents are supported because the **PDF viewer** is still in the experimental stage. Therefore, **ShowControls** should be set to **true** to allow users to open the document in an external application.

Learn how to create accessible PDF documents with the  Web Content Accessibility Guidelines [(WCAG) 2.0](https://www.w3.org/TR/WCAG-TECHS/pdf.html) and [PDF/UA](https://www.pdfa.org/pdfua-the-iso-standard-for-universal-accessibility/) standards.

### Screen reader support

Consider adding a heading using a **[Label](control-text-box.md)**, if the PDF document doesn't have a title. The heading can be positioned immediately before the **PDF viewer**.

---

## Pen input control in Power Apps

Source: [control-pen-input.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-pen-input)

*Learn about the details, properties and examples of the Pen input control in Power Apps.*

# Pen input control in Power Apps
A control in which the user can draw, erase, and highlight areas of an image.

## Description
The user can use this control like a whiteboard, drawing diagrams and writing words that can be converted to typed text.

## Limitations
The pen input  control has these limitations:

- The pen control only has partial support for drawing using a mouse or touch input in the Windows app. Strokes might be intermittent. For smooth drawing, use a pen or run the app in a browser.

## Key properties
**Image** – Output property that represents the image drawn by the end user.

**[Color](properties-color-border.md)** – The color of input strokes.

**Mode** – The control is in **Draw** or **Erase** mode.  Select mode has been deprecated.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers. Can be used to describe the purpose of the control as well as alternative methods of input.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**Input** – **Deprecated.** Whether the input supports mouse, pen, or touch inputs.  Default value (7) supports all three.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[SelectionColor](properties-color-border.md)** – The text color of a selected item or items in a list or the color of the selection tool in a pen control.

**SelectionThickness** – The thickness of the selection tool for a pen-input control.

**ShowControls** – Whether an audio or video player shows, for example, a play button and a volume slider, and a pen control shows, for example, icons for drawing, erasing, and clearing.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Collect**( *CollectionName*, *DatatoCollect* )](../functions/function-clear-collect-clearcollect.md)

## Example
### Create a set of images
1. Add a **Pen input** control, name it **MyDoodles**, and set its **ShowControls** property to **true**.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a **[Button](control-button.md)** control, move it below **MyDoodles**, and set the **[Text](properties-core.md)** property of the **[Button](control-button.md)** control to show **Add**.
3. Set the **[OnSelect](properties-core.md)** property of the **[Button](control-button.md)** control to this formula:<br>
   **Collect(Doodles, {Sketch:MyDoodles.Image})**
4. Add an **Image gallery** control, move it below the **[Button](control-button.md)** control, and shrink the width of the **Image gallery** control until it shows three items.
5. Set the **[Items](properties-core.md)** property of the **Image gallery** control to **Doodles**, and then  press F5.
6. Draw an image in **MyDoodles**, and then click or tap the **[Button](control-button.md)** control.
   
    The image that you drew appears in the **Image gallery** control.
7. (optional) In the **Pen input** control, click or tap the icon to clear the image that you drew, draw another image, and then click or tap the **[Button](control-button.md)** control.
8. In the **Image gallery** control, set the **[OnSelect](properties-core.md)** property of the **[Image](control-image.md)** control to this formula:<br>
   **Remove(Doodles, ThisItem)**
9. Remove a drawing by clicking or tapping it in the **Image gallery** control.

Use the **[SaveData](../functions/function-savedata-loaddata.md)** function to save your drawings locally or the **[Patch](../functions/function-patch.md)** function to save them to a data source.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **[BorderColor](properties-color-border.md)** and the color outside the control (if there is a border)
* **[Fill](properties-color-border.md)** and the color outside the control (if there is no border)

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** should be present.

    > [!IMPORTANT]
  > **Pen input** is not accessible to screen reader users. Always provide an alternative form of input. For example, if a sketch is required, consider adding an **[Add picture](control-add-picture.md)** control for users to upload an image. Both methods can be offered and the user can choose the one they are more comfortable with.

### Keyboard support

> [!IMPORTANT]
> **Pen input** is not accessible to keyboard users. Always provide an alternative form of input. For example, if a signature is required, consider adding a **[Text input](control-text-input.md)** for users to enter their name. Both methods can be offered and the user can choose the one they are more comfortable with.

---

## Pie chart control in Power Apps

Source: [control-pie-chart.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-pie-chart)

*Learn about the details, properties and examples of the Pie chart control in Power Apps.*

# Pie chart control in Power Apps
A control that shows relative values in comparison to each other.

## Description
Add a **Pie chart** control if you want to show relative data from a table that contains labels in the leftmost column and values in the second column from the left.

This control is a grouped control containing three controls: a **[Label](control-text-box.md)** for the title, the chart graphic, and a **Legend**.

## Chart key properties
**[Items](properties-core.md)** – The source of data that appears in a control such as a gallery, a list, or a chart.

**ShowLabels** – Whether a pie chart shows the value that's associated with each of its wedges.

## Additional chart properties
**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**Explode** – The distance between wedges in a pie chart.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**ItemBorderColor** – The color of the border around each wedge in a pie chart.

**ItemBorderThickness** – The thickness of the border around each wedge in a pie chart.

**ItemColorSet** – The color of each data point in a chart.

**LabelPosition** – The location of labels in a pie chart relative to its wedges.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Max**( *DataSource*, *ColumnName* )](../functions/function-aggregates.md)

## Example
1. Add a **[Button](control-button.md)** control, and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **Collect(Revenue2015, {Product:"Europa", Revenue:27000}, {Product:"Ganymede", Revenue:26300}, {Product:"Callisto", Revenue:29200})**
   
    Don't know how to [add and configure a control](../add-configure-controls.md)?
   
    Want more information about the **[Collect](../functions/function-clear-collect-clearcollect.md)** function or [other functions](../formula-reference.md)?
2. Press F5, click or tap the **[Button](control-button.md)** control, and then press Esc to return to the default workspace.
3. Add a **Pie chart** control, and set its **[Items](properties-core.md)** property to **Revenue2015**.
   
    The **Pie chart** control shows revenue data for each product in relation to the other products.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* each item in **ItemColorSet**
* every item in **ItemColorSet** and the background color
* **[Color](properties-color-border.md)** and the background color

### Screen reader support
* There must be a **[Label](control-text-box.md)** immediately before the chart graphic to serve as the title.

    > [!NOTE]
  > Chart graphics and **Legend** are hidden from screen reader users. As an alternative, a tabular form of the data is presented to them. They can also cycle through buttons that select data in the chart.

### Low vision support
* There must be a **Legend**.
* Consider setting **ShowLabels** to **true**. This helps low-vision users quickly determine what each pie slice represents.
* Consider setting **LabelPosition** to **LabelPosition.Outside**. This increases legibility of labels because of a more consistent color contrast.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.

    > [!NOTE]
  > When keyboard users navigate to the chart, they can cycle through buttons that select data in the chart.

---

## Power BI tile control in Power Apps

Source: [control-power-bi-tile.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-power-bi-tile)

*Learn about the details, properties, and examples of the Power BI tile control in Power Apps.*

# Power BI tile control in Power Apps

A control that shows a [Power BI](https://powerbi.microsoft.com) tile inside an app.

Don't have Power BI? [Sign up](/power-bi/service-self-service-signup-for-power-bi).

## Description

Take advantage of your existing data analysis and reporting by displaying your **[Power BI tiles](/power-bi/service-dashboard-tiles)** inside your apps. Specify the tile that you want to show by setting its **Workspace**, **Dashboard**, and **Tile** properties in the **Data** tab of the options panel.

> [!NOTE]
> - Power BI tile control is not supported on some [GCC High and DoD](/power-platform/admin/powerapps-us-government#power-apps-us-government-service-urls) environments.
> - Power BI tile control isn't available in China.
> - For licensing requirements when embedding Power BI tile, see [Licensing](/power-bi/collaborate-share/service-embed-secure#licensing).

## Sharing and security

When you share an app that contains Power BI content, you must share not only the app itself but also the [dashboard](/power-bi/service-how-to-collaborate-distribute-dashboards-reports) where the tile comes from. Otherwise, the Power BI content won't appear even for users who open the app. Apps that contain Power BI content respect the permissions for that content.

## Performance

It's not recommended to have more than three Power BI tiles loaded at the same time within an app. You can control tile loading and unloading by setting the **LoadPowerBIContent** property.

## Embedding Options

Embedding is different between versions of the Power BI API. Because of the new Power BI API authentication scheme, your tile may not be accessible on mobile or within other embedded scenarios (Teams or SharePoint).

You can control the use of API version using the **AllowNewAPI** property. For more information, see [Key properties](#key-properties).

| AllowNewAPI property value | Behavior |
| - | - |
| True | You can embed a dashboard, report, or tile by taking the **Embed URL** from Power BI and making it the **TileUrl** value. |
| False | You can embed a dashboard tile either by **Embed URL** and making it the **TileUrl** value, or using the graphical interface provided.

> [!NOTE]
> Embedding a Power BI URL (for example, in an IFrame) is not supported on Power Apps mobile since authenticating the Power BI URL request is not handled by the mobile player.

## Filtering

Filtering differs between the versions of the Power BI API. See the appropriate sections below depending on how you configure the control.

### When using the new API to call Power BI service

When **AllowNewAPI** property is set to "True", you're using new API to call Power BI service. For more information, see [Filter a report using query string parameters in the URL](/power-bi/collaborate-share/service-url-filters).

### When using the original API to call Power BI service

When **AllowNewAPI** property is set to "False", you're using the original API to call Power BI service. In this case, by passing a single parameter from the app, you can filter the results that appear in a Power BI tile. However, only string values and the equals operator are supported, and the filter might not work if the table name or the column name contains spaces.

To pass a single filter value, modify the value of the **TileURL** property, which follows this syntax:

```
"https://app.powerbi.com/embed?dashboardId=<DashboardID>&tileId=<TileID>&config=<SomeHash>"
```

To that value, append this syntax:

```
&$filter=<TableName>/<ColumnName> eq '<Value>'
```

For example, using a value from a list box: 
```
"&$filter=Store/Territory eq '" & ListBox1.Selected.Abbr & "'"
```

The parameter will filter a value in the dataset of the report where the tile originates. However, filtering feature has the following limitations:

- Only one filter can be applied.
- Only the `eq` operator is supported.
- Field type must be string.
- Filtering is only available on pinned visualization tiles. It's not supported for pinned reports.
- R and Python script visuals cannot be filtered.

You can use computed fields in the Power BI report to convert other value types to string or combines multiple fields into one.

## Key properties

**AllowNewAPI** - Whether to use the new API when calling the Power BI service. Setting the value to **True** will allow the use of the new Power BI API (which isn't supported in mobile and some embedded scenarios, but allows some more advanced filtering). **False** will use the original API. Default value is **false**.

**Dashboard** – The Power BI dashboard where the tile comes from.

**LoadPowerBIContent** – When set to **True**, the Power BI content is loaded and shown. When set to **False**, the Power BI content is unloaded, which releases memory and optimizes performance.

**PowerBIInteractions** - When set to **True**, the Power BI content can be interacted with, but Power Apps **OnSelect** event won't trigger. When set to **False**, the tile can't be interacted with, but Power Apps **OnSelect** event will trigger when the tile is selected.

**Tile** – The name of the Power BI tile that you want to display.

**Workspace** – The Power BI workspace where the tile comes from.

## Additional properties

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[OnSelect](properties-core.md)** – Actions to perform when the user selects a control. By default, the Power BI report that's associated with the tile opens.

**TileUrl** – The URL by which the tile is requested from the Power BI service. To add query string filtering to your URL, see the [filtering](#filtering) section above.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen&mdash;if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen&mdash;if no parent container).

## Example

1. On the **Insert** tab, open the **Charts** menu, and then add a **Power BI tile** control.

    Don't know how to [add and configure a control](../add-configure-controls.md)?

2. On the **Data** tab of the options panel, select **My Workspace** for the **Workspace** setting.

3. Select a dashboard in the list of dashboards, and then select a tile in the list of tiles.

    The control renders the Power BI tile.

## Accessibility guidelines

The **Power BI tile** is simply a container for Power BI content. Learn how to create accessible content with these [Power BI accessibility tips](/power-bi/desktop-accessibility).

If the Power BI content doesn't have a title, consider adding a heading using a **[Label](control-text-box.md)** control to support screen readers. You can position the label immediately before the Power BI tile.

---

## Radio control in Power Apps

Source: [control-radio.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-radio)

*Learn about the details, properties and examples of the Radio control in Power Apps.*

# Radio control in Power Apps

An input control that shows multiple options, of which users can select only one at a time.

## Description

A **Radio** control, a standard HTML input control, is best used with only a few, mutually exclusive options.

The control can have a horizontal or vertical layout.

## Key properties

**[Default](properties-core.md)** – The value of a control before the user changes it.

**[Items](properties-core.md)** – The source of data that appears in a control such as a gallery, a list, or a chart.

**Layout** – Whether the options are laid out vertically or horizontally.

**[Value](properties-core.md)** – The value of an input control.

**Selected** – The data record that represents the selected item.

## All properties

**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** – The color of text in a control.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[LineHeight](properties-text.md)** – The distance between, for example, lines of text or items in a list.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**RadioBackgroundFill** – The background color of the circles in a radio-button control.

**RadioBorderColor** – The color of the circle for each option in a radio-button control.

**RadioSelectionFill** – The color that appears inside the circle of the selected option in a radio-button control.

**RadioSize** – The diameter of the circles in a radio-button control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**SelectedText (Deprecated)** – A string value that represents the selected item.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard-navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions

[**Distinct**( *DataSource*, *ColumnName* )](../functions/function-distinct.md)

## Example

1. Add a **Radio** control, name it **Pricing**, and set its **[Items](properties-core.md)** property to this formula:

    **["Standard", "Premium"]**

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

2. Add a **[Label](control-text-box.md)** control, move it below the **Radio** control, and set the **[Text](properties-core.md)** property of the **[Label](control-text-box.md)** control to this formula:

    **If("Premium" in Pricing.Selected.Value, "$200 per day", "$150 per day")**

    Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?

3. While holding down the Alt key, select either option in the **Radio** control.

    The **[Label](control-text-box.md)** control shows the appropriate text for your choice.

4. (optional) While holding down the Alt key, select the other option to confirm that the appropriate text appears.

## Accessibility guidelines

### Color contrast

In addition to the [standard color contrast requirements](../accessible-apps-color.md), ensure adequate color contrast between:

* **RadioSelectionFill** and **RadioBackgroundFill**
* **RadioBackgroundFill** and **[Fill](properties-color-border.md)**

### Screen-reader support

* Ensure that every option has a **[Value](properties-core.md)**.
* Consider adding a **[Label](control-text-box.md)** immediately before the **Radio** control to serve as the heading.

### Keyboard support

* Set the **[TabIndex](properties-accessibility.md)** property to zero or greater so that keyboard users can navigate to it.
* Set the **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** properties so that focus indicators are clearly visible.

---

## Rating control in Power Apps

Source: [control-rating.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-rating)

*Learn about the details, properties and examples of the Rating control in Power Apps.*

# Rating control in Power Apps
A control with which users can indicate a value between 1 and a maximum number that you specify.

## Description
In this control, the user can indicate, for example, how much they liked something by selecting a certain number of stars.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

**Max** – The maximum value to which the user can set a slider or a rating.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**RatingFill** – The color of the stars in a rating control.

**ReadOnly** – Whether a user can change the value of a slider or rating control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**ShowValue** – Whether a slider's or rating's value appears as the user changes that value or hovers over the control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Average**( *Value1*, *Value2,* ... )](../functions/function-aggregates.md)

## Example
1. Add a **Rating** control, and name it **Quantitative**.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a **[Text input](control-text-input.md)** control, name it **Qualitative**, and move it below the **Rating** control.
3. Set the **[Default](properties-core.md)** property of the **[Text input](control-text-input.md)** control to **""**, and set its **HintText** to this formula:
   <br>**If(Quantitative.Value > 3, "What did you especially like?", "How might we do better?")**
   
    Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?
4. Press F5, and then click or tap either four or five stars in the **Rating** control.
   
    The hint text in the **[Text input](control-text-input.md)** control changes to reflect the high rating.
5. Click or tap fewer than four stars in **Quantitative**.
   
    The hint text in the **[Text input](control-text-input.md)** control changes to reflect the low rating.
6. To return to the default workspace, press Esc.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **RatingFill** and **[Fill](properties-color-border.md)**

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

    > [!NOTE]
  > Screen readers treat the **Rating** control as radio buttons.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.
* Consider using a different control if there are too many stars. It can be tedious to navigate with a keyboard and difficult to select accurately with a touch screen.

    > [!NOTE]
  > The same keyboard interactions for radio buttons can be used on **Rating**.

---

## Rich text editor control in Power Apps

Source: [control-richtexteditor.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-richtexteditor)

*Learn about the details, properties, and examples of the Rich text editor control in Power Apps.*

# Rich text editor control in Power Apps
Let users format text in a WYSIWYG editing area. The output format is HTML.

## Description
The **Rich text editor** control lets the app user format text in a WYSIWYG editing area.

The input and output format is HTML, but the control isn't an HTML editor. The editor removes script, style, object, and unsupported HTML elements and attributes.

Supported features include:
- Bold, italic, and underline
- Text and highlight color
- Text size
- Numbered and bulleted lists
- Hyperlinks
- Clear formatting

To use the control in a form, select the **Edit multi-line text** card, then customize it by inserting the RTE control.

## Key properties
**[Default](properties-core.md)** – Input property for the initial text value shown in the editor

**HtmlText** – Output property for the resulting rich text in HTML format


## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers. Should describe the purpose of the attachments.

**[DisplayMode](properties-core.md)** – Whether the control lets you add and delete files (**Edit**), only shows data (**View**), or is disabled (**Disabled**).

**EnableSpellCheck** – Whether the browser spell checker is enabled. This feature only checks spelling in the browser's default language. Power Apps for Windows doesn't support this property.

**[Height](properties-size-location.md)** – The distance from the control's top edge to its bottom edge.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Visible](properties-core.md)** – Whether a control is visible or hidden.

**[Width](properties-size-location.md)** – The distance from the control's left edge to its right edge.

**[X](properties-size-location.md)** – The distance from the control's left edge to the left edge of its parent container, or the screen if there's no parent container.

**[Y](properties-size-location.md)** – The distance from the control's top edge to the top edge of its parent container, or the screen if there's no parent container.


## Accessibility guidelines
### Screen reader support
* Make sure **[AccessibleLabel](properties-accessibility.md)** is present.

### Keyboard support
* Set **[TabIndex](properties-accessibility.md)** to zero or greater so keyboard users can navigate to it.

> [!TIP]
> Select <kbd>Alt</kbd>+<kbd>0</kbd> while the editor is focused to learn about other keyboard shortcuts.

> [!NOTE]
> When the toolbar is focused, select <kbd>Tab</kbd> or <kbd>Shift</kbd>+<kbd>Tab</kbd> to move between toolbar groups. You can't cycle back from the last group to the first group or vice versa.

## Limitations

### Appearance isn't guaranteed when working with other products
When you use rich text across different products, it might not look exactly the same.

- You can paste rich text from web pages, Microsoft Word, and other apps. However, the appearance might differ depending on the capabilities of the device, browser, and external source.
- Similarly, if you create rich text outside of canvas apps, it might look slightly different because built-in styles of the other app aren't present.
- If you embed the canvas app in another app, the host app might override the styles of the rich text. For example, when you use a canvas app as a [custom page](../../model-driven-apps/model-app-page-overview.md) in a model-driven app, the host app removes list styles. Bulleted lists don't show bullet points in a custom page.

Sometimes, you might want rich text to display differently based on where it's shown. For example, the primary font might be different in another product, or the text color might change when the user enables dark mode. For a consistent display, compose and show rich text in canvas apps only.

### Pasted images may not appear consistently
A pasted image might appear in a browser but not in a mobile app. Or it might appear intermittently or not at all. These are signs that the pasted image isn't supported because of:

- Cross-Origin Resource Sharing (CORS). The image host blocks the image from loading on Power Apps.
- Authentication. The image isn't publicly accessible and can only be accessed after you sign in to the image host.
- Image format support. Common image formats like jpg and png are supported, but less common types might not be supported by the browser or device.

Browsers or devices can represent images in rich text differently. Some copy the image as raw data, while others might simply reference the image's URL. Image URLs might not be accessible for the reasons above.

> [!TIP]
>  Use a screen clipping or screenshot tool to copy and paste images for the best results.

### When editing an app, Alt key doesn't allow interaction with the control
In [Power Apps Studio](../power-apps-studio.md), pressing [Alt key for quick interaction](../keyboard-shortcuts.md#alternate-behavior) doesn't work. You can only interact with the rich text editor when [previewing the app](../power-apps-studio.md#preview).

### Hyperlinks don’t open in view mode
In view mode, the rich text editor can’t open hyperlinks while the app is running. This is a known limitation of the current editor.

---

## Screen control in Power Apps

Source: [control-screen.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-screen)

*Learn about the details, properties and examples of the screen control in Power Apps.*

# Screen control in Power Apps

A UI element that contains one or more other controls in an app.

## Description

Most apps have multiple **Screen** controls that contain **[Label](control-text-box.md)** controls, **[Button](control-button.md)** controls, and other controls that show data and support navigation. For information about how to add a screen, reorder screens, and configure navigation, review [Add a screen](../add-screen-context-variables.md).

## Key properties

**[BackgroundImage](properties-visual.md)** – The name of an image file that appears in the background of a screen.

**[Fill](properties-color-border.md)** – The background color of a control.

## Additional properties

**Height** - The height of the screen. If the app is responsive ([**Scale to fit**](../set-aspect-ratio-portrait-landscape.md#change-screen-size-and-orientation) is **Off**) and the device on which the app is running is shorter than this property, the screen can scroll vertically.

**[ImagePosition](properties-visual.md)** – The position (**Fill**, **Fit**, **Stretch**, **Tile**, or **Center**) of an image in a screen or a control if it isn't the same size as the image.

**LoadingSpinner** (**None**, **Controls** or **Data**) - When None, spinner will not be shown. When Controls | Data, will show  spinner until all child controls at the screen level are visible. **Note. Nested controls are not considered.**

**LoadingSpinnerColor** - The fill color of the loading spinner.

**Name** - The name of the screen.

**OnHidden** – The behavior of an app when the user navigates away from a screen. If the **Disable non-blocking App.OnStart** rule is enabled in app settings, this property may need to wait until **App.OnStart** is finished executing. By default, this setting is turned on. 

**OnVisible** – The behavior of an app when the user navigates to a screen.  Use this property to set up variables and preload data used by the screen.  Use the [**App.OnStart**](../functions/object-app.md#onstart-property) property for set up once when the app is started. If the **non-blocking App.OnStart** is enabled, the **Screen.OnVisible** event can run parallel with it. As a result, it's recommended to refrain from relying on variables or collections that are initialized by **App.OnStart**, as they might not be fully initialized.

**Orientation** - The orientation of the screen. If its **Width** is greater than its **Height**, the orientation will be **Layout.Horizontal**; otherwise, it will be **Layout.Vertical**.

**Size** - A positive integer that classifies the size of the screen. The classification is determined by comparing the screen's **Width** property to the values in the [**App.SizeBreakpoints**](../functions/signals.md) property. The **ScreenSize** type consists of four values (**Small**, **Medium**, **Large**, and **ExtraLarge**) that correspond to the integers 1 through 4.

**Width** - The width of the screen. If the app is responsive ([**Scale to fit**](../set-aspect-ratio-portrait-landscape.md#change-screen-size-and-orientation) is **Off**) and the device on which the app is running is narrower than this property, the screen can scroll horizontally.

## Related functions

[**Distinct**( *DataSource*, *ColumnName* )](../functions/function-distinct.md)

## Example

1. Add a **[Radio](control-radio.md)** control, name it **ScreenFills**, and set its **[Items](properties-core.md)** property to this value:

    `["Red", "Green"]`

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

1. Name the default **Screen** control **Source**, add another **Screen** control, and name it **Target**.

1. In **Source**, add a **[Shape](control-shapes-icons.md)** control (such as an arrow), and set its **[OnSelect](properties-core.md)** property to this formula:

    `Navigate(Target, ScreenTransition.Fade)`

    Want more information about the **[Navigate](../functions/function-navigate.md)** function or [other functions](../formula-reference.md)?

1. In **Target**, add a **[Shape](control-shapes-icons.md)** control (such as an arrow), and set its **[OnSelect](properties-core.md)** property to this formula:

    `Navigate(Source, ScreenTransition.Fade)`

1. Set the **[Fill](properties-color-border.md)** property of **Target** to this formula:

    `If("Red" in ScreenFills.Selected.Value, RGBA(255, 0, 0, 1), RGBA(54, 176, 75, 1))`

1. Select the **Source** screen and then, while holding down the Alt key, select either option in the **[Radio](control-radio.md)** control, and then select the **[Shape](control-shapes-icons.md)** control.

    **Target** appears in the color that you selected.

1. In **Target**, select the **[Shape](control-shapes-icons.md)** control to return to **Source**.

1. (optional) Select the other option in the **[Radio](control-radio.md)** control, and then select the **[Shape](control-shapes-icons.md)** control to confirm that **Target** appears in the other color.

1. (optional) Reorder the screens by hovering over **Target** in the left navigation bar, selecting the ellipsis that appears, and then selecting **Move up**.

    **Target** appears first when the user opens the app.

## Accessibility guidelines

### Color contrast

When the **Screen** is the effective background for text, there must be adequate color contrast between:

- **[Fill](properties-color-border.md)** and text
- **[BackgroundImage](properties-visual.md)** and text (if applicable)

For example, if a **Screen** contains a **[Label](control-text-box.md)** and the label has transparent fill, then the screen's **[Fill](properties-color-border.md)** effectively becomes the background color for the label.

In addition to text, consider checking color contrast with essential graphical objects like the star images in a **[Rating](control-rating.md)** control.

### Screen reader support

- There must be a meaningful name for each **Screen**. The screen name can be viewed and edited in the same way as other controls: in the tree view of the controls pane or in the header of the properties pane.

    > [!NOTE]
  > When a new **Screen** is loaded, screen readers will announce its name.

---

## Slider control in Power Apps

Source: [control-slider.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-slider)

*Learn about the details, properties and examples of the Slider control in Power Apps.*

# Slider control in Power Apps
A control with which the user can specify a value by dragging a handle.

## Description
The user can indicate a value, between a minimum and a maximum value that you specify, by dragging the handle of a slider left-right or up-down, depending on the direction that you choose.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

**Max** – The maximum value to which the user can set a slider or a rating.

**Min** – The minimum value to which the user can set a slider.

**[Value](properties-core.md)** – The value of an input control.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**HandleActiveFill** – The color of the handle for a slider as the user changes its value.

**HandleFill** – The color of the handle (the element that changes position) in a toggle or slider control.

**HandleHoverFill** – The color of the handle in a slider when the user keeps the mouse pointer on it.

**HandleSize** – The diameter of the handle.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**Layout** – Whether the user scrolls through a gallery or adjusts a slider top to bottom (**Vertical**) or left to right (**Horizontal**).

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**RailFill** – The background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.

**RailHoverFill** – When you hover on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.

**ReadOnly** – Whether a user can change the value of a slider or rating control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**ShowValue** – Whether a slider's or rating's value appears as the user changes that value or hovers over the control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**ValueFill** – The background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.

**ValueHoverFill** – When you keep the mouse pointer on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Sum**( *Value1*, *Value2* )](../functions/function-aggregates.md)

## Example
1. Add a button, and set its **[OnSelect](properties-core.md)** property to this formula:
   <br>**ClearCollect(CityPopulations, {City:"London", Country:"United Kingdom", Population:8615000}, {City:"Berlin", Country:"Germany", Population:3562000}, {City:"Madrid", Country:"Spain", Population:3165000}, {City:"Rome", Country:"Italy", Population:2874000}, {City:"Paris", Country:"France", Population:2273000}, {City:"Hamburg", Country:"Germany", Population:1760000}, {City:"Barcelona", Country:"Spain", Population:1602000}, {City:"Munich", Country:"Germany", Population:1494000}, {City:"Milan", Country:"Italy", Population:1344000})**
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
   
    Want more information about the **[ClearCollect](../functions/function-clear-collect-clearcollect.md)** function or [other functions](../formula-reference.md)?
2. Press F5, select the button, and then press Esc.
3. Add a slider, move it below the button, and name the slider **MinPopulation**.
4. Set the slider's **Max** property to **5000000** and its **Min** property to **1000000**.
5. Add a text gallery in vertical/portrait orientation, move it below the slider, and set the gallery's **[Items](properties-core.md)** property to this formula:<br>
   **Filter(CityPopulations, Population > MinPopulation)**
6. In the first item of the gallery, set the **[Text](properties-core.md)** property of the top label to **ThisItem.City**, and set the **[Text](properties-core.md)** property of the bottom label to this formula:<br> **Text(ThisItem.Population, "##,###")**
7. Press F5, and then adjust **MinPopulation** to show only those cities that have a population that's greater than the value that you specify.
8. To return to the default workspace, press Esc.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **ValueFill** and **RailFill**
* **ValueHoverFill** and **RailHoverFill**
* **[FocusedBorderColor](properties-color-border.md)** and color outside the control
* **ValueFill** and background color
* **RailFill** and background color
* **ValueHoverFill** and background color
* **RailHoverFill** and background color

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.
* Slider value must be shown when interacting with the keyboard. This can be achieved by any one of these methods:
    * Set **ShowValue** to **true**.
    * Add a **[Label](control-text-box.md)** adjacent to the slider. Set the label's **[Text](properties-core.md)** to the slider's **[Value](properties-core.md)**.

---

## Label control in Power Apps

Source: [control-text-box.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-text-box)

*Learn about the details, properties and examples of the label control in Power Apps.*

# Label control in Power Apps

A box that shows data such as text, numbers, dates, or currency.

## Description

A label shows data that you specify as a literal string of text, which appears exactly the way you type it, or as a formula that evaluates to a string of text. Labels often appear outside of any other control (such as a banner that identifies a screen), as a label that identifies another control (such as a rating or audio control), or in a gallery to show a specific type of information about an item.

## Key properties

**[AutoHeight](properties-core.md)** – Set to true to allow the label to auto-grow its height to show all text. Set to false to truncate the text to the height assigned.

**[Color](properties-color-border.md)** – The color of text in a control.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[Text](properties-core.md)** – Text that appears on a control or that the user types into a control.

**[DelayOutput](properties-core.md)** – Set to true to delay action during text input.

## Additional properties

**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**AutoHeight** – Whether a label automatically increases its **[Height](properties-size-location.md)** property if its **[Text](properties-core.md)** property contains more characters than the control can show at one time. If the control is not visible, then the output property Height will not be updated as the text changes.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[LineHeight](properties-text.md)** – The distance between, for example, lines of text or items in a list.

**[Live](properties-accessibility.md)** – How a screen reader announces changes to the value of the label's **Text** property.

* When set to **Off**, the screen reader doesn't announce changes.
* When set to **Polite**, the screen reader finishes speaking before announcing any changes that occurred while the screen reader was speaking.
* When set to **Assertive**, the screen reader interrupts itself to announce any changes that occurred while the screen reader was speaking.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**Overflow** – Whether a scrollbar appears in a label if its **Wrap** property is set to **true** and the value of the control's **[Text](properties-core.md)** property contains more characters than the control can show at one time.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**Role** - The semantic role of the label text, such as Heading 1. Doesn't change the style of the label but makes the output semantically correct for interpretation by screen readers.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[VerticalAlign](properties-text.md)** – The location of text on a control in relation to the vertical center of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**Wrap** – Whether the text should ever wrap to multiple lines.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions

[**Text**( *Number*, "*FormatCodes*" )](../functions/function-text.md)

## Examples

### Show a literal string

* Add a label, and set its **[Text](properties-core.md)** property to **"Hello, world"** (including the double quotation marks).
  
    Don't know how to [add and configure a control](../add-configure-controls.md)?

### Show the result of a formula

* Add a label, and set its **[Text](properties-core.md)** property to a formula such as this one:<br>
  **Today()**
  
    > [!NOTE]
  > When you specify a formula, you don't use quotation marks unless an argument of the formula is a literal string. In that case, enclose the argument, not the formula, in double quotation marks.
  
    Want more information about the **[Today](../functions/function-now-today-istoday.md)** function or [other functions](../formula-reference.md)?

### Show data in a gallery

In this procedure, you'll create a collection, called **CityPopulations**, that contains data about the population of various cities in Europe. Next, you'll show that data in a gallery that contains three labels, and you'll specify the type of data that each label will show.

1. Add a button, and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **ClearCollect(CityPopulations, {City:"London", Country:"United Kingdom", Population:8615000}, {City:"Berlin", Country:"Germany", Population:3562000}, {City:"Madrid", Country:"Spain", Population:3165000}, {City:"Rome", Country:"Italy", Population:2874000}, {City:"Paris", Country:"France", Population:2273000}, {City:"Hamburg", Country:"Germany", Population:1760000}, {City:"Barcelona", Country:"Spain", Population:1602000}, {City:"Munich", Country:"Germany", Population:1494000}, {City:"Milan", Country:"Italy", Population:1344000})**
2. Press F5, select the button, and then press Esc.
3. Add a text gallery, and set its **[Items](properties-core.md)** property to **CityPopulations**.

    When the gallery is selected, the right pane shows options for that gallery.
4. In the **Gallery1** pane, set the top list to **Population**, set the middle list to **City**, and set the bottom list to **Country**.

## Accessibility guidelines

Despite its name, a **Label** control does not have to be used as a label for another control. It can be used to display any piece of text.

A **Label** can be used as a button or link by specifying **[OnSelect](properties-core.md)** behavior. When used this way, there are similar accessibility considerations as with buttons.

### Color contrast

There must be adequate color contrast between:

* **[Color](properties-color-border.md)** and **[Fill](properties-color-border.md)**
* Other [standard color contrast requirements](../accessible-apps-color.md) apply (if used as a button or link)

### Screen-reader support

* **[Text](properties-core.md)** must be present.
* **[Live](properties-accessibility.md)** should be set to **Polite** or **Assertive** if a screen reader should announce changes to the value of the **Text** property.

  > [!NOTE]
  > Screen readers will treat **Label**s as buttons when **[TabIndex](properties-accessibility.md)** is zero or greater.

### Low vision support

* **Label** should look like a link, if it is used as a link.
  * Set **[Underline](properties-text.md)** to **true**
  * **[HoverColor](properties-color-border.md)** should be different from **[Color](properties-color-border.md)**

### Keyboard support

* **[TabIndex](properties-accessibility.md)** must be zero or greater, if the text is used as a button or link. This allows keyboard users to navigate to it.
* Focus indicators must be clearly visible, if the text is used as a button or link. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Text input control in Power Apps

Source: [control-text-input.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-text-input)

*Learn about the details, properties and examples of the text input control in Power Apps.*

# Text input control in Power Apps
A box in which the user can type text, numbers, and other data.

## Description
The user can specify data by typing into a text-input control. Depending on how you configure the app, that data might be added to a data source, used to calculate a temporary value, or incorporated in some other way.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

**[Text](properties-core.md)** – Text that appears on a control or that the user types into a control.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[Align](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**Clear** – Whether a text-input control shows an "X" that the user can tap or click to clear the contents of that control. Only works in **SingleLine** mode.

**[Color](properties-color-border.md)** – The color of text in a control.

**DelayOutput** – When set to true, user input is registered after half a second delay.  Useful for delaying expensive operations until user completes inputting text (i.e. for filtering when input is used in other formulas).

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledColor](properties-color-border.md)** – The color of text in a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**[DisabledFill](properties-color-border.md)** – The background color of a control if its **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**EnableSpellCheck** – Whether a text-input control should use the browser spell check function. Power Apps for Windows doesn't support this property.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[Font](properties-text.md)** – The name of the family of fonts in which text appears.

**[FontWeight](properties-text.md)** – The weight of the text in a control: **Bold**, **Semibold**, **Normal**, or **Lighter**.

**Format** – Whether the user input is restricted to numbers only or can be any text. When set to **Number**, only digits and certain numeric symbols can be entered. Supported symbols and formats depend on the browser language and cannot be set on individual controls.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**HintText** – Light-grey text that appears in an input-text control if it's empty.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[HoverColor](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[HoverFill](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[Italic](properties-text.md)** – Whether the text in a control is italic.

**[LineHeight](properties-text.md)** – The distance between, for example, lines of text or items in a list.

**MaxLength** – The number of characters that the user can type into a text-input control.

**Mode** – The control is in **SingleLine**, **Multiline**, or **Password** mode.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[PressedColor](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[PressedFill](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**[Size](properties-text.md)** – The font size of the text that appears on a control.

**[Strikethrough](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Underline](properties-text.md)** – Whether a line appears under the text that appears on a control.

**VirtualKeyboardMode** – Type of virtual keyboard, text or numeric, that appears on an app user's touch screen. The **Format** property determines the default value. Device support varies. Devices that are running iOS must have at least version 12.2. The recommended version of Android is 9.0, and capabilities of numeric keyboards vary for Android devices. Windows 10 doesn't support this property.  

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**DateTimeValue**( *String* )](../functions/function-datevalue-timevalue.md)

## Examples
### Collect data
1. Add two text-input controls, and name them **inputFirst** and **inputLast**.
   
    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a button, set its **[Text](properties-core.md)** property to **Add**, and set its **[OnSelect](properties-core.md)** property to this formula:<br>
   **Collect(Names, {FirstName:inputFirst.Text, LastName:inputLast.Text})**
   
    Want more information about the **[Collect](../functions/function-clear-collect-clearcollect.md)** function or [other functions](../formula-reference.md)?
3. Add a text gallery in portrait/vertical orientation, set its **[Items](properties-core.md)** property to **Names**, and set the **[Text](properties-core.md)** property of **Subtitle1** to **ThisItem.FirstName**.
4. (optional) In the template gallery, delete the bottom label, named **Body1**, and set the **[TemplateSize](control-gallery.md)** property of the gallery to **80**.
5. Press F5, type a string of text into **inputFirst** and **inputLast**, and then click or tap the **Add** button.
6. (optional) Add more names to the collection, and then press Esc to return to the default workspace.

### Prompt for a password

1. Add a text-input control, name it **inputPassword**, and set its **Mode** property to **Password**.

1. Add a label, and set its **[Text](properties-core.md)** property to this formula:<br>
   **If(inputPassword.Text = "P@ssw0rd", "Access granted", "Access denied")**

    Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?

1. Press F5, and then type **P\@ssw0rd** in **inputPassword**.

    When you finish typing the password, the label stops showing **Access denied** and starts to show **Access granted**.

1. To return to the default workspace, press Esc.

1. (optional) Add a control such as an arrow, configure it to navigate to another screen, and show it only after the user types the password.

1. (optional) Add a button, configure its **[Text](properties-core.md)** property to show **Sign in**, add a timer, and disable the input-text control for a certain amount of time if the user types the wrong password and then clicks or taps the **Sign in** button.


## Accessibility guidelines
### Color contrast
* [Standard color contrast requirements](../accessible-apps-color.md) apply.

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Timer control in Power Apps

Source: [control-timer.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-timer)

*Learn about the details, properties and examples of the Timer control in Power Apps.*

# Timer control in Power Apps
A control that can determine how your app responds after a certain amount of time passes.

## Description
Timers can, for example, determine how long a control appears or change other properties of a control after a certain amount of time has passed.

> [!NOTE]
> In Power Apps Studio, timers run only in Preview mode.


## Key properties
**`Duration`** – How long a timer runs in milliseconds. The maximum is 24 hours expressed in milliseconds. Default is 60 seconds.

**`OnTimerEnd`** – Actions to perform when a timer finishes running.

**`Repeat`** – Whether a timer automatically restarts when it finishes running.

## Additional properties
**[`Align`](properties-text.md)** – The location of text in relation to the horizontal center of its control.

**`AutoPause`** – Whether the timer control automatically pauses if the user navigates to a different screen.

**`AutoStart`** – Whether the timer control automatically starts to play when the user navigates to the screen that contains that control.

**[`BorderColor`](properties-color-border.md)** – The color of a control's border.

**[`BorderStyle`](properties-color-border.md)** – Whether a control's border is **`Solid`**, **`Dashed`**, **`Dotted`**, or **`None`**.

**[`BorderThickness`](properties-color-border.md)** – The thickness of a control's border.

**[`Color`](properties-color-border.md)** – The color of text in a control.

**[`DisplayMode`](properties-core.md)** – Whether the control allows user input (**`Edit`**), only displays data (**`View`**), or is disabled (**`Disabled`**).

**[`DisabledBorderColor`](properties-color-border.md)** – The color of a control's border if the control's **[`DisplayMode`](properties-core.md)** property is set to **`Disabled`**.

**[`DisabledColor`](properties-color-border.md)** – The color of text in a control if its **[`DisplayMode`](properties-core.md)** property is set to **`Disabled`**.

**[`DisabledFill`](properties-color-border.md)** – The background color of a control if its **[`DisplayMode`](properties-core.md)** property is set to **`Disabled`**.

**[`Fill`](properties-color-border.md)** – The background color of a control.

**[`FocusedBorderColor`](properties-color-border.md)** – The color of a control's border when the control is focused.

**[`FocusedBorderThickness`](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**[`Font`](properties-text.md)** – The name of the family of fonts in which text appears.

**[`FontWeight`](properties-text.md)** – The weight of the text in a control: **`Bold`**, **`Semibold`**, **`Normal`**, or **`Lighter`**.

**[`Height`](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[`HoverBorderColor`](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[`HoverColor`](properties-color-border.md)** – The color of the text in a control when the user keeps the mouse pointer on it.

**[`HoverFill`](properties-color-border.md)** – The background color of a control when the user keeps the mouse pointer on it.

**[`Italic`](properties-text.md)** – Whether the text in a control is italic.

**[`OnSelect`](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**`OnTimerStart`** – Actions to perform when a timer starts to run.

**[`PressedBorderColor`](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**[`PressedColor`](properties-color-border.md)** – The color of text in a control when the user taps or clicks that control.

**[`PressedFill`](properties-color-border.md)** – The background color of a control when the user taps or clicks that control.

**[`Reset`](properties-core.md)** – Whether a control reverts to its default value.

**[`Size`](properties-text.md)** – The font size of the text that appears on a control.

**`Start`** – Whether the timer starts.

**[`Strikethrough`](properties-text.md)** – Whether a line appears through the text that appears on a control.

**[`TabIndex`](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**[`Text`](properties-core.md)** – Text that appears on a control or that the user types into a control.

**[`Tooltip`](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[`Underline`](properties-text.md)** – Whether a line appears under the text that appears on a control.

**[`Visible`](properties-core.md)** – Whether a control appears or is hidden.

**[`Width`](properties-size-location.md)** – The distance between a control's left and right edges.

**[`X`](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[`Y`](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**Refresh**( *DataSource* )](../functions/function-refresh.md)

## Examples
### Show a countdown
1. Add a timer, and name it **Countdown**.

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Set the timer's **Duration** property to **10000** and its **Repeat** and **Autostart** properties to **true**.
3. (optional) Make the timer easier to read by setting its **[Height](properties-size-location.md)** property to **160**, its **[Width](properties-size-location.md)** property to **600**, and its **[Size](properties-text.md)** property to **60**.
4. Add a label, and set its **[Text](properties-core.md)** property to this formula:
   <br>**"Number of seconds remaining: " & RoundUp(10-Countdown.Value/1000, 0)**

    Want more information about the **[RoundUp](../functions/function-round.md)** function or [other functions](../formula-reference.md)?

    The label shows how many seconds remain before the timer restarts.

### Animate a control
1. Add a timer, and name it **FadeIn**.

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Set the timer's **`Duration`** property to **5000**, its **`Repeat`** property to **true**, and its **[`Text`](properties-core.md)** property to **Toggle animation**.
3. (optional) Make the timer easier to read by setting its **[`Height`](properties-size-location.md)** property to **160**, its **[`Width`](properties-size-location.md)** property to **600**, and its **[`Size`](properties-text.md)** property to **60**.
4. Add a label, set its **[`Text`](properties-core.md)** property to show **Welcome!** and set its **[`Color`](properties-color-border.md)** property to this formula:
   <br>**ColorFade(Color.BlueViolet, FadeIn.Value/5000)**

    Want more information about the **[ColorFade](../functions/function-colors.md)** function or [other functions](../formula-reference.md)?

5. Select the timer button to start or stop the animation. The text in the label fades to white, returns to full intensity, and repeats the process.

## Accessibility guidelines
The same guidelines for the **[Button](control-button.md)** control apply to the **Timer** control if users can interact with it.

### Background timers
Background timers run automatically and are hidden. Use them in a supporting role where the elapsed time is of little interest to the user. For example, you can refresh data every minute or show a notification message only for a certain amount of time.

Background timers should have their **[Visible](properties-core.md)** property set to false so that they are hidden from all users.

### Timing considerations
If a **Timer** runs automatically, consider whether users have enough time to read and use content. Keyboard and screen-reader users may need more time to react to a timed event.

Any of these strategies is sufficient:
* Allow users to cancel the timed event.
* Allow users to adjust the time limit before it begins.
* Warn 20 seconds before the time limit expires and provide an easy way to extend the limit.

Some scenarios are exempt from these requirements. Learn more in the [WCAG 2.0 guideline for time limits](https://www.w3.org/TR/WCAG20/#time-limits).

### Screen reader support
* If a timer triggers changes on the current screen, use a [live region](../accessible-apps-live-regions.md) to tell screen-reader users what changed.

    > [!NOTE]
    > If the timer is visible and running, screen readers will announce the elapsed time every five seconds.

* Don't use the **[`Text`](properties-core.md)** property of a control for time-sensitive and important information. Screen readers won't announce changes to **[`Text`](properties-core.md)**.
* For interactive timers:
    * **[`Text`](properties-core.md)** must be present.
    * Consider adding a **[`Label`](control-text-box.md)** control to show the elapsed time. Use the timer's **[`Text`](properties-core.md)** property to instruct the user to start or stop the timer.

---

## Toggle control in Power Apps

Source: [control-toggle.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-toggle)

*Learn about the details, properties and examples of the Toggle control in Power Apps.*

# Toggle control in Power Apps
A control that the user can turn on or off by moving its handle.

## Description
A toggle is designed for recent GUIs but behaves the same way as a check box.

## Key properties
**[Default](properties-core.md)** – The initial value of a control before it is changed by the user.

**[Value](properties-core.md)** – The value of an input control.

## Additional properties
**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[DisabledBorderColor](properties-color-border.md)** – The color of a control's border if the control's **[DisplayMode](properties-core.md)** property is set to **Disabled**.

**FalseFill** – The toggle fill color when the toggle is off.

**FalseHoverFill** – The toggle hover fill color when toggle is off.

**FalseText** – The text shown when the toggle is off.

**[Fill](properties-color-border.md)** – The background color of a control.

**[FocusedBorderColor](properties-color-border.md)** – The color of a control's border when the control is focused.

**[FocusedBorderThickness](properties-color-border.md)** – The thickness of a control's border when the control is focused.

**HandleFill** – The fill color of the toggle handle.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**[HoverBorderColor](properties-color-border.md)** – The color of a control's border when the user keeps the mouse pointer on that control.

**[OnChange](properties-core.md)** – Actions to perform when the user changes the value of a control (for example, by adjusting a slider).

**OnCheck** – Actions to perform when the value of a checkbox or a toggle changes to **true**.

**[OnSelect](properties-core.md)** – Actions to perform when the user taps or clicks a control.

**OnUncheck** – Actions to perform when the value of a checkbox or a toggle changes to **false**.

**[PressedBorderColor](properties-color-border.md)** – The color of a control's border when the user taps or clicks that control.

**RailFill** – The background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.

**RailHoverFill** – When you hover on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **false** or the color of the line to the right of the handle in a slider control.

**[Reset](properties-core.md)** – Whether a control reverts to its default value.

**ShowLabel** – Whether a text label is shown beside the toggle control.

**[TabIndex](properties-accessibility.md)** – Keyboard navigation order in relation to other controls.

**TextPosition** – Whether the label is to the left or the right of the toggle control.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**TrueFill** – Toggle fill color when the toggle is on.

**TrueHoverFill** – Toggle hover fill color when the toggle is on.

**TrueText** – Text shown when the toggle is on.

**ValueFill** – The background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.

**ValueHoverFill** – When you keep the mouse pointer on a toggle control or a slider, the background color of the rectangle in a toggle control when its value is **true** or the color of the line to the left of the handle in a slider control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

## Related functions
[**If**( *Condition*, *Result* )](../functions/function-if.md)

## Example
1. Add a toggle, and name it **MemberDiscount**.

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?
2. Add a label, and set its **[Text](properties-core.md)** property to this formula:
   <br>**If(MemberDiscount.Value = true, "Price: $75", "Price: $100")**

    Want more information about the **[If](../functions/function-if.md)** function or [other functions](../formula-reference.md)?
3. Press F5, and change the value of **MemberDiscount**.

    The label shows a different price, depending on whether **MemberDiscount** is on or off.
4. To return to the default workspace, press Esc.


## Accessibility guidelines
### Color contrast
There must be adequate color contrast between:
* **HandleFill** and **FalseFill**
* **HandleFill** and **FalseHoverFill**
* **HandleFill** and **TrueFill**
* **HandleFill** and **TrueHoverFill**
* **FalseFill** and color outside the control
* **FalseHoverFill** and color outside the control
* **TrueFill** and color outside the control
* **TrueHoverFill** and color outside the control

This is in addition to the [standard color contrast requirements](../accessible-apps-color.md).

### Screen reader support
* **[AccessibleLabel](properties-accessibility.md)** must be present.
* **FalseText** must be present.
* **TrueText** must be present.

### Low vision support
* Consider setting **ShowLabel** to **true** so that users can quickly determine the toggle value.

### Keyboard support
* **[TabIndex](properties-accessibility.md)** must be zero or greater so that keyboard users can navigate to it.
* Focus indicators must be clearly visible. Use **[FocusedBorderColor](properties-color-border.md)** and **[FocusedBorderThickness](properties-color-border.md)** to achieve this.

---

## Vertical container control in Power Apps

Source: [control-vertical-container.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-vertical-container)

*Learn about the details, properties and examples of the Vertical container control in Power Apps.*

# Vertical container control in Power Apps

Vertical container control determines the position of the child components so that you never have to set X, Y for a component inside the container.

## Description

**Vertical container** control distributes the available space to its child components based on the settings, as well as determines alignment of the child components.

## Properties

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[Color](properties-color-border.md)** - The color of the container control.

**[Drop shadow](properties-color-border.md)** - Adds shadow effects around the control.

**[Fill](properties-color-border.md)** – The background color of a control.

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**Direction** - Defines in what direction the container layouts its child components. **Horizontal** and **Vertical**.

**Justify (vertical)** - Defines how child elements are aligned with the primary axis. **Start**, **End**, **Center**, **Space Between**.

**Align (horizontal)** - Defines how child components are positioned in the container, in the off axis (opposite from `LayoutDirection`). **Start**, **Center**, **End**, **Stretch**.

**Gap** - Defines the space between containers child components in pixels. 

**Horizontal Overflow** - Defines whether the container shows scrollbars or remove content when it is too large to fit. **Scroll** and **Hide**.

**[RadiusBottomLeft](properties-size-location.md)** – The degree to which the bottom-left corner of a control is rounded.

**[RadiusBottomRight](properties-size-location.md)** – The degree to which the bottom-right corner of a control is rounded.

**[RadiusTopLeft](properties-size-location.md)** – The degree to which the top-left corner of a control is rounded.

**[RadiusTopRight](properties-size-location.md)** – The degree to which the top-right corner of a control is rounded.

**Vertical Overflow** - Defines whether the container shows scrollbars or remove content when it is too large to fit. **Scroll** and **Hide**.

**Wrap** -  Defines whether the content wraps to a new row or column when it cannot fit.

**Align in container** - Defines how the individual component is aligned to the parent. The default value, **Set by container**, inherits the value from the parent’s `LayoutAlignItems` property, while other properties can be used to customize the alignment for the individual child component. **Set by container**, **Start**, **End**, **Center**, and **Stretch**.  

**Fill portions** - Defines how the individual component grows when there is more screen real-estate assigned to its parent.  The number represents the portion of the extra space given to the component out of all the available extra space claimed by children of its parent.  For example, if child A has `Fill portions` set to 1 and child B has `Fill portions` set to 2, child A gets 1/3 of the extra space available while child B gets 2/3 of the extra available space.

**Minimum width** - Represent the minimum size of the component in the direction of the `Fill portions` (that is, the parent’s `Direction`).

**[PaddingBottom](properties-size-location.md)** – The distance between text in a control and the bottom edge of that control.

**[PaddingLeft](properties-size-location.md)** – The distance between text in a control and the left edge of that control.

**[PaddingRight](properties-size-location.md)** – The distance between text in a control and the right edge of that control.

**[PaddingTop](properties-size-location.md)** – The distance between text in a control and the top edge of that control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).


## Example

1. Create a [blank canvas app](../create-blank-app.md) with **Tablet** layout.
1. Select **Settings** > **Display** and disable **Scale to fit**, **Lock aspect ratio**, and **Lock orientation** and select **Apply**. 
1. Now from the **Insert** panes in the left sidebar, under **Layout** tab, select **Vertical container**. 

   > [!div class="mx-imgBorder"]
   > ![Insert containers.](../media/create-responsive-layout/insert-containers.png "Insert containers")

1. Set the following properties to occupy the full available space of the screen:
   1. X = 0
   1. Y= 0
   1. Width = Parent.Width
   1. Height = Parent. Height

1. Add few buttons, text inputs, media, icons, and select **F5** to see how the app adjusts to the screen changes.

---

## Web barcode scanner control (experimental) in Power Apps

Source: [control-barcodescanner.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/control-barcodescanner)

*Learn about the details, properties and examples of the web barcode scanner control in Power Apps.*

# Web barcode scanner control (experimental) in Power Apps

The legacy barcode scanning control, which is obsolete but might be useful for scanning codes in a web browser.

## Description

The control shows the camera feed in the app so that users can scan barcodes on all devices. The control is obsolete because of poor performance, and the mobile **[Barcode reader](control-barcodereader.md)** control replaces this control.

> [!NOTE]
> The web barcode scanner control is only supported on Microsoft Edge, Chrome, Firefox, and Opera browsers. All other browsers will show a warning that some features of the app won't work.

## Key properties

**BarcodeType** - The barcode type to scan. Supported types: Codabar, Code39, Code128, EAN, I2of5, UPC. **Default: UPC**

**Camera** – On a device that has more than one camera, the numeric ID of the camera that the app uses for scanning barcodes.

## Additional properties

**[AccessibleLabel](properties-accessibility.md)** – Label for screen readers.

**[BorderColor](properties-color-border.md)** – The color of a control's border.

**[BorderStyle](properties-color-border.md)** – Whether a control's border is **Solid**, **Dashed**, **Dotted**, or **None**.

**[BorderThickness](properties-color-border.md)** – The thickness of a control's border.

**[DisplayMode](properties-core.md)** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**[Height](properties-size-location.md)** – The distance between a control's top and bottom edges.

**ShowLiveBarcodeDetection** – Whether visual cues are shown to indicate the status of barcode detection. Yellow rectangles represent areas that are being examined. A green line across a rectangle indicates successful barcode identification.

**Stream** – Automatically updated image based on the **StreamRate** property.

**StreamRate** – How often to update the image on the **Stream** property, in milliseconds.  This value can range from 100 (1/10th of a second) to 3,600,000 (1 hour).

**Text** – Value of barcode that was last identified by the scanner.

**[Tooltip](properties-core.md)** – Explanatory text that appears when the user hovers over a control.

**[Visible](properties-core.md)** – Whether a control appears or is hidden.

**[Width](properties-size-location.md)** – The distance between a control's left and right edges.

**[X](properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen, if no parent container).

**[Y](properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen, if no parent container).

## Related functions

[**Patch**( *DataSource*, *BaseRecord*, *ChangeRecord* )](../functions/function-patch.md)

## Example

### Add barcode scanner control

1. Add a **barcode scanner** control, name it "Mybarcode scanner".

    Don't know how to [add, name, and configure a control](../add-configure-controls.md)?

1. Add a **Label** control, and set its output to the barcode scanner's **Text** property.

1. Scan a barcode of the type set under **BarcodeType** property.

    The label displays the scanned barcode.

## Accessibility guidelines

### Video alternatives

* Consider adding a **[Label](control-text-box.md)** with its **[Text](properties-core.md)** set to the barcode scanner's **Text**. Since the barcode scanner doesn't display the identified barcode value, doing the above makes the scanner accessible to everyone, not just those with visual disabilities.

### Screen reader support

* **[AccessibleLabel](properties-accessibility.md)** must be present.

    > [!NOTE]
  > Screen readers will announce when a new barcode has been found. The value won't be announced. As long as the barcode is in view, screen readers will remind the user every five seconds that the same barcode is still being identified.

---

