# Power Apps Canvas Apps — Modern Controls Reference (Full)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Supersedes the earlier 25-control extraction: pulled from primary source, includes the full 33-page modern controls section including two controls previously missed (Icon, Rating), the master index, the changelog, and the Fluent-UI upgrade guide.

Pages in this file: 32

## Contents

1. [Overview of modern controls and theming in canvas apps](#overview-of-modern-controls-and-theming-in-canvas-apps)
2. [Modern controls and properties in canvas apps](#modern-controls-and-properties-in-canvas-apps)
3. [Rename controls with Copilot (preview)](#rename-controls-with-copilot-preview)
4. [Recent modern control updates in canvas apps - Power Apps](#recent-modern-control-updates-in-canvas-apps-power-apps)
5. [Upgrade Fluent UI Controls to Modern Controls](#upgrade-fluent-ui-controls-to-modern-controls)
6. [Badge control in Power Apps](#badge-control-in-power-apps)
7. [Button Modern Control in Canvas Apps: Properties and Examples](#button-modern-control-in-canvas-apps-properties-and-examples)
8. [Card modern control in Power Apps](#card-modern-control-in-power-apps)
9. [Checkbox modern control in Power Apps](#checkbox-modern-control-in-power-apps)
10. [Combo box modern control in canvas apps - Power Apps](#combo-box-modern-control-in-canvas-apps-power-apps)
11. [Date picker modern control in canvas apps - Power Apps](#date-picker-modern-control-in-canvas-apps-power-apps)
12. [Dropdown modern control in canvas apps - Power Apps](#dropdown-modern-control-in-canvas-apps-power-apps)
13. [Form modern control in canvas apps - Power Apps](#form-modern-control-in-canvas-apps-power-apps)
14. [Header modern control in Power Apps](#header-modern-control-in-power-apps)
15. [Icon modern control in canvas apps - Power Apps](#icon-modern-control-in-canvas-apps-power-apps)
16. [Info button modern control in canvas apps - Power Apps](#info-button-modern-control-in-canvas-apps-power-apps)
17. [Link modern control in canvas apps - Power Apps](#link-modern-control-in-canvas-apps-power-apps)
18. [Number Input modern control in canvas apps - Power Apps](#number-input-modern-control-in-canvas-apps-power-apps)
19. [Progress Bar Modern Control in Canvas Apps: Properties and Examples](#progress-bar-modern-control-in-canvas-apps-properties-and-examples)
20. [Radio modern control in canvas apps - Power Apps](#radio-modern-control-in-canvas-apps-power-apps)
21. [Rating modern control in canvas apps - Power Apps](#rating-modern-control-in-canvas-apps-power-apps)
22. [Slider modern control in canvas apps - Power Apps](#slider-modern-control-in-canvas-apps-power-apps)
23. [Spinner Modern Control in Canvas Apps: Properties and Examples](#spinner-modern-control-in-canvas-apps-properties-and-examples)
24. [Tab List modern control in canvas apps - Power Apps](#tab-list-modern-control-in-canvas-apps-power-apps)
25. [Text modern control in canvas apps - Power Apps](#text-modern-control-in-canvas-apps-power-apps)
26. [Text Input modern control in canvas apps - Power Apps](#text-input-modern-control-in-canvas-apps-power-apps)
27. [Toggle modern control in Power Apps](#toggle-modern-control-in-power-apps)
28. [Avatar Modern Control in Canvas Apps: Properties and Examples](#avatar-modern-control-in-canvas-apps-properties-and-examples)
29. [Copilot answer modern control in Power Apps](#copilot-answer-modern-control-in-power-apps)
30. [Data Grid modern control in canvas apps - Power Apps](#data-grid-modern-control-in-canvas-apps-power-apps)
31. [Stream control in Power Apps](#stream-control-in-power-apps)
32. [Table control in Power Apps](#table-control-in-power-apps)

---

## Overview of modern controls and theming in canvas apps

Source: [overview-modern-controls.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls)

*Learn about modern controls and theming in canvas apps.*

# Overview of modern controls and themes in canvas apps

Canvas apps now support modern controls and theming based on the [Microsoft Fluent 2 design system](https://fluent2.microsoft.design). Modern controls offer improved accessibility, performance, and usability compared to classic controls. The accompanying theming system lets you customize your app's appearance from a central location.

This article explains how to enable modern controls and themes in your canvas apps and provides information about ongoing development.


## Enable modern controls and themes for your app
With your [canvas app open for editing](../../edit-app.md):
1. On the command bar, select **Settings** > **Updates**.
1. Select the **New** tab and then turn on **Modern controls and themes**.

- The app refreshes with the new app authoring menu. Modern controls are part of existing categories. Two additional categories exist for legacy controls - Classic and Classic icons.

   > [!div class="mx-imgBorder"]
   > ![List of modern controls](media/modern-controls-list.png)

- To see modern themes, on the app authoring menu, select **Themes**. For information, see [Use modern themes in canvas apps](modern-theming.md).

   > [!div class="mx-imgBorder"]
   > ![Themes pane](media/modern-themes-pane.png)

## What's next for these controls and themes?
The Power Apps team is consistently improving and adding new capabilities for modern controls and themes. They publish updates to the [Power Apps blog](https://powerapps.microsoft.com/en-us/blog/) every month on the progress made for modern controls.
  
## Provide feedback to Microsoft

To provide feedback, offer suggestions, or report problems, go to the [community forum](https://go.microsoft.com/fwlink/?linkid=2229838).

You can also provide feedback for individual controls in the Power Apps Studio from the control properties by selecting the thumbs up or down and comments option. The same feedback mechanism is available for modern themes in the **Themes** pane.

---

## Modern controls and properties in canvas apps

Source: [modern-controls-reference.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-reference)

*Learn about properties of modern controls in canvas apps.*

# Modern controls and properties in canvas apps

Modern controls in Power Apps provide an enhanced user experience with updated styling, improved accessibility, and better performance compared to classic controls. These controls follow Microsoft's Fluent Design System and offer a consistent, professional appearance across your canvas apps.

This reference guide covers the available modern controls and their properties. Each control serves a specific purpose - from basic interactions like buttons and text inputs to advanced features like Copilot integration and data visualization. Use these controls to build intuitive, accessible applications that align with modern design standards.

Before implementing modern controls in your app, review the overview of modern controls to understand key concepts and best practices.


## Modern controls

**[Avatar](modern-control-avatar.md)** – A control that shows a graphic representation of a user, team, or entity.

**[Badge](modern-controls-badge.md)** – A badge is a visual decoration for UI elements.

**[Button](modern-control-button.md)** – Interact with the app by clicking or tapping.

**[Card (preview)](modern-control-card.md)** - Cards help makers create clean, responsive object summaries such as contact tiles, document previews, or product listings in either horizontal or vertical orientation.

**[Checkbox](modern-control-checkbox.md)** - Select or clear an option to specify **true** or **false**.

**[Combobox](modern-control-combobox.md)** - A control that users can use to make selections from provided choices and supports search and multiple selections.

**[Copilot answer (preview)](modern-control-copilot-answer.md)** - A control that makers can use to add predefined questions that end users can use to get generated answers.

**[Data Grid](modern-control-data-grid.md)** - A control that displays records from a data source in a scrollable, sortable, and searchable grid.

**[Date picker](modern-controls-date-picker.md)** - A control that the user can select to specify a date.

**[Dropdown (preview)](modern-control-dropdown.md)** – Select a value from the list of items.

**[Form](modern-control-form.md)** - Display, edit, and create records with a modern Edit or Display form.

**[Header](modern-controls-header.md)** – A control that creates a modern app header.

**[Info button](modern-control-info-button.md)** – Use this control to provide additional information to users.

**[Link](modern-control-link.md)** – Open hyperlinks in new tab.

**[Number input](modern-control-number-input.md)** - A number input control the user can modify.

**[Progress bar](modern-control-progress-bar.md)** – Displays the progress, can be configured as determinate showcasing exact progress or indeterminate for ongoing progress.

**[Radio group](modern-controls-radio-group.md)** – An input control that shows multiple options, of which users can select only one at a time.

**[Spinner](modern-control-spinner.md)** – Displays state in motion, for example, loading a page or table.

**[Slider](modern-control-slider.md)** - A control with which the user can specify a value by dragging a handle.

**[Stream (preview)](new-stream-video-control.md)** - A control that lets you add Steam videos in your app.

**[Table (preview)](modern-control-table.md)** – A control that shows a set of data in a tabular or list format.

**[Tabs or tab list](modern-control-tabs-or-tabs-list.md)** – Select a tab to move screens or take action on app.

**[Text](modern-control-text.md)** – Display text on the app, can also be used as label for fields.

**[Text input](modern-control-text-input.md)** – A box in which the user can type text, numbers, and other data.

**[Toggle](modern-control-toggle.md)** – A control that the user can turn on or off by moving the handle.


### See also
[Overview of modern controls in canvas apps](overview-modern-controls.md)

---

## Rename controls with Copilot (preview)

Source: [copilot-rename-controls.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/copilot-rename-controls)

*Rename controls in bulk for canvas apps with AI in Microsoft Power Apps.*

# Rename controls in canvas apps with Copilot (preview)

[This article is prerelease documentation and is subject to change.]

Canvas apps often have many controls, so it's important to give them meaningful names for easier maintenance and collaboration. With the new **Proactive control rename** feature, Copilot suggests names for controls. Makers review the suggestions and apply changes to multiple controls at once. When a control's name is updated, the change appears across all its references.

Currently, the most frequently renamed and supported controls are:

- Labels
- Buttons

Additional support for more controls will be incorporated based on feedback from preview.

> [!IMPORTANT]
>
> - This is a preview feature.
> - This feature is available in English only.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2189520), and are available before an official release so customers can get early access and provide feedback.

## Prerequisites

Make sure you meet the prerequisites and region availability in [Copilot in Power Apps overview (preview)](../ai-overview.md#availability).

By default, the **Proactive control rename** setting is on for new apps.

To use this feature for an existing app, follow these steps:

1. Open your [canvas app for editing](../edit-app.md) in Power Apps Studio. On the command bar, select **Settings** > **Updates**.
1. On the **Preview** tab, find and turn on the **Proactive control rename** setting.
1. On the **New** tab, find and turn on the **New analysis engine** setting.


## Rename controls

When you rename a control like the **Button** control, Copilot suggests names for other **Button** controls that have similar properties.

1. Open your [canvas app for editing](../edit-app.md) in Power Apps Studio.

1. In the **Tree view**, select a control, and then select **More options** (...).

1. Select **Rename**, type a new name for the control, and then press Enter.

    > [!NOTE]
    > When you manually rename a control, Copilot only appears if there are other controls on the same screen that can be renamed.

1. Copilot appears with suggestions to rename other controls of the same type.

    :::image type="content" source="media/rename-controls/rename-control-copilot-appears.png" alt-text="Copilot appears with suggestions to rename controls":::

1. Select **View Suggestions**.

1. Review the suggested names, and clear any item that you don't want to rename. :::image type="content" source="media/rename-controls/rename-control-unselect-rename.png" alt-text="Screenshot of unselecting a suggested renaming of a control.":::

1. When you're done, select **Rename** to apply the changes. <br>If a formula references a control, the control name is automatically updated in the formula.

    :::image type="content" source="media/rename-controls/rename-control-copilot-suggestions.png" alt-text="Screenshot of suggested names from Copilot.":::


## Best practices and recommendations

To get the best results from Copilot, use this feature after you set the **Text** property of a control. For example, Copilot doesn't suggest names for a button with the default Text property value **Button** or an invalid **Text** property value like **If()**.

If you still don't get the results you want, send us your feedback.

When you manually rename a control, use standard, relevant names and naming patterns so Copilot can reference them when suggesting renames. Avoid special characters and spaces. For example, renaming a **Button** to **collectResponse** gives better renaming suggestions for other buttons than using a name like **collect_1**.

## Limitations

- Only the **Label** and **Button** controls are supported.
- When you rename a label manually, Copilot appears only if there are other labels under the same screen that can be renamed.
- Only controls with a valid **Text** property are considered for renaming by Copilot.
- The **Text** property can be a **Text** literal or a formula returning **Text** type.
- Only controls with nondefault **Text** property are considered for renaming. For example, the **Text** property value can't be the default value, such as **Button** or **Text**.

## See also

[FAQ for rename controls in canvas apps with Copilot](../../common/faq-rename-control.md)

---

## Recent modern control updates in canvas apps - Power Apps

Source: [modern-control-updates.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-updates)

*Learn about recent updates to modern controls in Power Apps canvas apps, what changed, and how to update your existing apps.*

# Recent updates to modern controls in canvas apps

Starting February 2026, modern controls in canvas apps have updated versions with new property names, enum-based values, and behavior changes. This article explains what changed and how to update your existing apps.

> [!IMPORTANT]
> These updates might require you to update formulas in your existing apps. Before you update any control, review the update guide for that control and fix any affected formulas.

## Why update?

- **Better performance** — Events like `OnChange` fire less often, reducing unnecessary recalculations.
- **Better mobile experience** — Controls use touch-friendly sizes and font defaults on mobile layouts.
- **More styling options** — Separate corner radius properties and new border styles give you more design control.
- **IntelliSense and validation** — Enum-based values replace plain strings, so you get autocomplete and compile-time checks in your formulas.

## Find and update controls in your app

When you open an app that uses an older version of a modern control, you see a notification on the control. The notification tells you that an update is available, and includes a **Learn more** link and an **Update** button.

:::image type="content" source="media/modern-controls-updates-1.png" alt-text="Screenshot of a modern control showing an update notification with Learn more and Update options.":::

### Steps to update a control

1. Select **Learn more** to open the update guide for that control.
1. Review property renames, enum changes, and behavior differences listed in the guide.
1. Find formulas in your app that use renamed or removed properties, and update them.
1. Select **Update** to upgrade the control to the new version.
1. Test your app to make sure everything works as expected.

> [!TIP]
> The **Update** button might not appear for all controls right away. Check back if you don't see it yet.

## Controls with available updates

The following table lists each control that has an updated version, with a link to its specific update guide and a summary of what changed.

| Control | Update guide | Key changes |
|---------|----------------|-------------|
| Text | [Updates to Text control](modern-control-text.md#recent-updates) | Nine property renames, enum values, new OnSelect event, DisplayMode removed |
| Number Input | [Updates to Number Input](modern-control-number-input.md#recent-updates) | OnChange on blur plus step clicks, TriggerOutput removed, new styling properties |
| Date Picker | [Updates to Date Picker](modern-control-date-picker.md#recent-updates) | View mode fixed, format honored, DateTimeZone respected, gallery crash fixed |
| Text Input | [Updates to Text Input](modern-control-text-input.md#recent-updates) | OnChange on focus out only, TriggerOutput default = Keypress, View mode truly read-only |
| Tab List | [Updates to Tab List](modern-control-tabs-or-tabs-list.md#recent-updates) | New Appearance property, item order preserved, Items auto-refresh |
| Combo Box | [Updates to Combo Box](modern-control-combobox.md#recent-updates) | SelectMultiple default = true, toggle to unselect, OnChange fires on every selection |
| Radio | [Updates to Radio](modern-controls-radio-group.md#recent-updates) | Item order preserved, View mode read-only (not disabled), new styling properties |
| Link | [Updates to Link](modern-control-link.md#recent-updates) | URL security validation (XSS protection), FontWeight fix, Wrap fix |
| Info Button | [Updates to Info Button](modern-control-info-button.md#recent-updates) | Content flyout expansion fixed, click reliability improved, AcceptsFocus removed |
| Button | [Updates to Button](modern-control-button.md#recent-updates) | Six property renames, enum values for Appearance/Layout/IconStyle, new Tooltip and border properties, AcceptsFocus removed |
| Dropdown | [Updates to Dropdown control](modern-control-dropdown.md#recent-updates) | Fluent-themed flyout on desktop, DefaultSelectedItems renamed to Default, FontSize renamed to Size, enum format changes |
| Icon | [Updates to Icon control](modern-control-icon.md#recent-updates) | OnSelect support, TabIndex removed, Style renamed to IconStyle, new border and padding properties |
| Slider | [Updates to Slider](modern-control-slider.md#recent-updates) | Value renamed to Default, Layout renamed to LayoutDirection, enum values for Size and LayoutDirection, new Tooltip property |
| Toggle | [Updates to Toggle](modern-control-toggle.md#recent-updates) | FontColor renamed to Color, FontSize renamed to Size, LabelPosition uses enum values, new Tooltip property, improved sizing, read-only View mode |
| Checkbox | [Updates to Checkbox](modern-control-checkbox.md#recent-updates) | FontColor renamed to Color, FontSize renamed to Size, new Tooltip property, read-only View mode, more reliable Checked behavior |
| Avatar | [Updates to Avatar](modern-control-avatar.md#recent-updates) | Font property renames, Badge and Shape use enum values, FontWeight uses enum, new OnSelect and Tooltip properties, Out of office merged into Badge |
| Spinner | [Updates to Spinner](modern-control-spinner.md#recent-updates) | Font property renames, LabelPosition uses the SpinnerLabelPosition enum, new Tooltip property |
| Progress Bar | [Updates to Progress Bar](modern-control-progress-bar.md#recent-updates) | ProgressColor, Thickness, and Shape use enum values, new Tooltip property, OnChange isn't available in the updated control |
| Form | [Updates to Form](modern-control-form.md#recent-improvements) | New screen templates, red required indicator, consistent typography, display names for people fields, reliable date fields; same form model and functions as classic |

## Property changes across modern controls

This section covers changes that affect multiple controls. If you only need to update one control, use the update guide linked in the [table above](#controls-with-available-updates).

### Property renames

For consistency across controls, many properties have new names. If your formulas reference the old names, update them to use the new names:

| Old name (Previous) | New name (New) | Affected controls |
|---------------------|----------------|-------------------|
| `FontColor` | `Color` | Text, Link, Info Button, Radio, Text Input, Tab List, Number Input, Date Picker, Combo Box, Button, Toggle, Checkbox, Avatar, Spinner |
| `FontSize` | `Size` | Text, Link, Info Button, Radio, Text Input, Tab List, Number Input, Date Picker, Combo Box, Button, Dropdown, Toggle, Checkbox, Avatar, Spinner |
| `FontItalic` | `Italic` | Text, Link, Info Button, Radio, Text Input, Tab List, Date Picker, Combo Box, Button, Avatar, Spinner |
| `FontStrikethrough` | `Strikethrough` | Text, Link, Info Button, Radio, Text Input, Date Picker, Combo Box, Button, Avatar, Spinner |
| `FontUnderline` | `Underline` | Text, Link, Info Button, Radio, Text Input, Date Picker, Combo Box, Button, Avatar, Spinner |
| `Weight` | `FontWeight` | Text only |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` | All controls with borders |

### New enum patterns

Properties that previously accepted plain text strings (like `"Bold"` or `"Start"`) now require typed enum values (like `FontWeight.Bold` or `Align.Left`). If your formulas hardcode the old string values, update them.

By using enums, you get IntelliSense autocomplete, compile-time validation, and localization safety in your Power Fx formulas. Each control's update guide lists the specific enum changes for that control.

#### Align

**Used by:** Text, Text Input, Number Input, Link, Tab List, Date Picker, Combo Box

| Enum value | Description |
|------------|-------------|
| `Align.Left` | Aligns text to the left edge |
| `Align.Center` | Centers text horizontally |
| `Align.Right` | Aligns text to the right edge |
| `Align.Justify` | Stretches text to fill the full width (Text, Link only) |

The previous string values `"Start"` or `""` (empty string) map to `Align.Left`. The previous value `"End"` maps to `Align.Right`.

#### VerticalAlign

**Used by:** Text, Link

| Enum value | Description |
|------------|-------------|
| `VerticalAlign.Top` | Aligns text to the top of the control |
| `VerticalAlign.Middle` | Centers text vertically (default) |
| `VerticalAlign.Bottom` | Aligns text to the bottom of the control |

The previous Text control defaulted to `""` (empty/undefined). The new default is `VerticalAlign.Middle`.

#### FontWeight

**Used by:** Text, Text Input, Number Input, Link, Tab List, Radio, Combo Box, Date Picker, Info Button

| Enum value | Description |
|------------|-------------|
| `FontWeight.Bold` | Bold weight |
| `FontWeight.Semibold` | Semibold weight |
| `FontWeight.Normal` | Normal/regular weight (default) |
| `FontWeight.Lighter` | Lighter weight |

> [!IMPORTANT]
> **FontWeight.Medium removed**: The `Medium` value isn't available in the new controls. If your previous control used `FontWeight.Medium`, it automatically maps to `FontWeight.Normal` during the update.

The previous Text control property was named `Weight` with string values (`"Regular"`, `"Bold"`, and so on). The new property is `FontWeight` with enum values. Both the property name and the value format changed.

#### ValidationState

**Used by:** Date Picker, Text Input, Number Input, Combo Box, Dropdown, Radio

| Enum value | Description |
|------------|-------------|
| `ValidationState.None` | No validation styling (default) |
| `ValidationState.Error` | Shows error styling (red border) |

> [!NOTE]
> Only two values are available: `None` and `Error`. There's no `Valid` or `Success` state.

#### Appearance

**Used by:** Date Picker, Text Input, Number Input, Combo Box, Dropdown

| Enum value | Description |
|------------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default for most controls) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |


#### BorderStyle

**Used by:** Text, Text Input, Number Input, Date Picker, Combo Box, Tab List, Link, Radio, Icon, Dropdown

| Enum value | Description |
|------------|-------------|
| `BorderStyle.Solid` | Solid line border (default) |
| `BorderStyle.Dashed` | Dashed line border |
| `BorderStyle.Dotted` | Dotted line border |
| `BorderStyle.None` | No border |


#### IconStyle

**Used by:** Icon, Button

| Enum value | Description |
|------------|-------------|
| `IconStyle.Outline` | Renders the icon in outline (unfilled) style (default) |
| `IconStyle.Filled` | Renders the icon in filled style |

Replace the previous string values `"Outline"` and `"Filled"` with `IconStyle.Outline` and `IconStyle.Filled`.

### BorderRadius split into corner-specific properties

Controls that previously had a single **BorderRadius** property now have four separate properties for each corner:

```
// Previous version
Control.BorderRadius = 8

// New version
Control.RadiusTopLeft = 8
Control.RadiusTopRight = 8
Control.RadiusBottomLeft = 8
Control.RadiusBottomRight = 8
```

This change gives you more flexibility to create controls with different corner radii, such as rounded top corners only.

### OnChange behavior improvements

Several controls changed *when* the **OnChange** event fires. This change is one of the most impactful changes. If your app logic depends on OnChange, review this table:

| Control | Previous OnChange | New OnChange | Impact |
|---------|------------------|--------------|--------|
| Text Input | Every keystroke | Focus out (blur) only | **CRITICAL** - Major performance improvement, might require formula updates |
| Number Input | Every keystroke | Focus out + step button clicks | Major performance improvement |
| Combo Box | Delayed/Focus out | Every selection/deselection | More responsive interaction |
| Radio | Sometimes inconsistent | Every selection reliably | Improved reliability |

> [!TIP]
> If you need per-keystroke updates (for example, live search), reference the control's output property (such as `TextInput1.Text`) directly in your formulas instead of relying on OnChange.

### TriggerOutput changes

The **TriggerOutput** property controls when a control pushes its value to dependent formulas. Here's what changed:

| Control | Change | Impact |
|---------|--------|--------|
| Text Input | Default changed from **FocusOut** to **Keypress** | Text updates immediately on keystroke (Delayed in forms) |
| Number Input | **TriggerOutput** property removed entirely | No longer available |
| Combo Box | No longer fires OnChange | TriggerOutput and OnChange are now independent |
| Text Input | No longer fires OnChange | TriggerOutput and OnChange are now independent |

### Improved mobile defaults

When you add an updated control to a mobile layout canvas, it automatically uses touch-friendly defaults:

- Larger widths and heights for easier tapping
- Larger font sizes (typically 24 pt)
- Appropriate padding and spacing

You don't need to do anything extra - these defaults apply automatically for new controls on mobile layouts.

### Updated command bar and right-click menus

Updated controls include refreshed command bar and right-click menus in the Studio authoring experience, giving you quick access to common style properties like font, color, fill, alignment, and borders.

## See also

- [Modern controls overview](overview-modern-controls.md)
- Individual control update guides (see table in the section above)

---

## Upgrade Fluent UI Controls to Modern Controls

Source: [upgrade-fluent-ui-controls-to-modern.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/upgrade-fluent-ui-controls-to-modern)

*Learn how to upgrade the earlier Fluent UI (v8) controls to the latest modern controls in Power Apps canvas apps in Microsoft Teams and in custom pages in model-driven apps.*

# Upgrade Fluent UI controls to modern controls

The Fluent UI (v8) controls are the earlier controls that you add to canvas apps in Microsoft Teams and to custom pages in model-driven apps. The updated modern controls are built on the Microsoft Fluent 2 design system and supersede these Fluent UI (v8) controls. You can upgrade the Fluent UI (v8) controls in your app to the latest modern controls.

> [!IMPORTANT]
> The Fluent UI (v8) controls in canvas apps in Microsoft Teams and in custom pages in model-driven apps are deprecated. Modern controls replace them. Upgrade your apps to modern controls to keep getting the latest design, performance, and accessibility improvements.

## Benefits of upgrading

When you upgrade to modern controls, your app gains the improvements that modern controls provide:

- **Microsoft Fluent 2 design**: Controls use the current Fluent 2 design system, so your app matches the latest Microsoft look and feel and stays visually consistent.
- **Theming**: Modern controls respond to the app theme, so you can restyle your app from one place instead of setting colors control by control.
- **Responsive sizing**: Controls use touch-friendly sizes and font defaults, and they adapt to different screen sizes and mobile layouts.
- **Built-in accessibility**: Modern controls improve keyboard navigation and screen reader support, and they use semantic structure for tab order, so you don't set tab numbers manually.
- **Enum-based properties**: Properties that took plain text strings now use typed enum values, so you get IntelliSense, autocomplete, and compile-time validation in your Power Fx formulas.
- **Better performance**: Events such as OnChange fire less often, which reduces unnecessary recalculation in your app.

## Where you can upgrade

Add and upgrade the Fluent UI (v8) controls in these two app surfaces:

- [Canvas apps in Microsoft Teams](../../../../teams/use-the-fluent-ui-controls.md)
- [Custom pages in model-driven apps](../../../model-driven-apps/design-page-for-model-app.md)

These are the only surfaces where the Fluent UI (v8) controls are used.

## Controls you can upgrade

In canvas apps in Microsoft Teams and in custom pages in model-driven apps, upgrade the following Fluent UI (v8) controls to modern controls:

- Button
- Text input (Text box)
- Combo box
- Date picker
- Radio group
- Rating
- Slider

## Upgrade a control

1. Open your canvas app in Microsoft Teams, or your custom page in a model-driven app, in Power Apps Studio.
1. Select the Fluent UI (v8) control that you want to upgrade.
1. Select the **Update** action on the control or in the control's properties.
1. Review the property mapping and the changes that Studio applies.

You can undo and redo the upgrade if you need to.

## Property changes

When you upgrade a control, Studio maps supported properties to modern control properties. Not every property maps one-to-one.

| Earlier property | Modern property |
| --- | --- |
| ButtonType | Appearance |
| Value | Default |
| ColorText | Color |
| Layout | LayoutDirection |
| Font size | Font size changes from points to pixels. Values are scaled. |
| TabIndex | Removed |
| AcceptsFocus | Removed |

## Considerations

- Some earlier styling options, including hover, pressed, disabled state colors, and focus outline, aren't available on modern controls.
- Any property without a modern equivalent isn't carried over.
- Review each control after upgrading to confirm its behavior, layout, and styling.

## See also

- [Overview of modern controls](overview-modern-controls.md)
- [Modern controls reference](modern-controls-reference.md)

---

## Badge control in Power Apps

Source: [modern-controls-badge.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-badge)

*Learn about the details, properties, and examples of the Badge control in Power Apps.*

# Badge control in Power Apps

A badge is a visual decoration for UI elements.

## Description
Badge can be used to display content in a visually better way. The key properties for this control are **Content**, **Shape**, and **Appearance**. 

## General

**Content** – The content to be displayed inside Badge control

**Visible** - Whether a control appears or is hidden. 

## Size and position

**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Width** - The distance between a control's left and right edges. 

**Height** - The distance between a control's top and bottom edges. 

## Style and theme

**Appearance** – A Badge can be filled, outline, ghost, inverted.

**Shape** – The shape of the badge can be circular, square, or rounded. 

**ThemeColor** – The style of the badge has different visual representations based on the selected scenarios: brand, danger, important, informative, severe, subtle, success, or warning. 

**BasePaletteColor** - The color palette applied to a control. This impacts all surfaces of the control that render a theme color. This property is on in effect if the **Color** property has a value of **Brand**.  

**Font** - The name of the family of fonts in which text appears. 

**FontSize** - The font size of the text that appears on a control. If the value is null or zero, then the font size is driven by selected Fluent theme. 

**FontColor** - The color of text in a control. 

**FontWeight** - The weight of the text in a control: **Bold**, **Lighter**, **Normal**, or **Semibold**. 

**FontItalic** - Whether the text in a control is italic. 

**FontUnderline** - Whether a line appears under the text that appears on a control. 

**FontStrikethrough** - Whether a line appears through the text that appears on a control. 


## Additional properties

**AccessibleLabel** – Label for screen readers. 

**DisplayMode** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled).

---

## Button Modern Control in Canvas Apps: Properties and Examples

Source: [modern-control-button.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-button)

*Discover how to use the Button modern control in Power Apps canvas apps. Learn key properties, styling options, and implementation examples to trigger actions effectively.*

# Button modern control in canvas apps

The **Button** modern control provides a clickable element that triggers actions in a canvas app, offering flexible styling and comprehensive interaction capabilities.

## Description

The **Button** modern control provides a clickable element that triggers app logic when selected. Use it for form submissions, navigation, confirmations, and any interaction that requires user input. The control supports icon and text combinations, full font styling, and multiple appearance styles through Fluent theming. Key properties for this control are **Text**, **Appearance**, and **OnSelect**.

> [!NOTE]
> This article describes the updated Button modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## General

**Text** – The label displayed on the button. Supports any text or Power Fx formula that evaluates to a string. Use this property to set or change the button text.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the button based on app state.

## Behavior

**OnSelect** – Use the **OnSelect** property to define what happens when the button is selected. It's how the app responds when the user selects the button. The control is accessible: **OnSelect** also triggers when the user presses Enter or Space while the control has keyboard focus.

> [!TIP]
> Common OnSelect actions include:
 > - `Navigate(Screen2)` - Navigate to another screen
 > - `SubmitForm(Form1)` - Submit a form
 > - `Set(varName, value)` - Set a variable
 > - `Notify("Message", NotificationType.Success)` - Show a notification
 > - `Patch(DataSource, Record, Updates)` - Update data

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). When **Disabled**, the button is visually dimmed and **OnSelect** doesn't fire.

## Getting started

The **Button** modern control is one of the most commonly used controls in Power Apps. At its core, a button has two essential elements: the text that users see (the **Text** property) and the action that happens when selected (the **OnSelect** property). Once you understand these basics, you can create interactive apps that respond to user input.

### Set button text

To change what text appears on your button, set the **Text** property:

- **In the Properties pane**: Enter text directly in the **Text** field
- **Using a formula**: `Text = "Click Me"` or `Text = "Save " & TextInput1.Text`

### Make buttons interactive

Define what happens when users selects the button using the **OnSelect** property:

1. Select the button in your app.
1. In the Properties pane, find the **OnSelect** property.
1. Enter your Power Fx formula, such as `Navigate(NextScreen)`.

### Configure button properties

Power Apps uses a streamlined approach for editing controls.

- Select the button on the canvas:
  - **Use the Properties pane** on the right to modify basic properties.
  - **Use the formula bar** at the top for advanced formulas.
  - **Switch to Advanced properties** for detailed customization.

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **96**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**Align** – The horizontal alignment of the button content within the control. Accepts `Align` enum values: `Align.Left`, `Align.Center`, `Align.Right`, `Align.Justify`.

**VerticalAlign** – The vertical alignment of the button content. Accepts `VerticalAlign` enum values: `VerticalAlign.Top`, `VerticalAlign.Middle`, `VerticalAlign.Bottom`.

**PaddingTop** – Distance between the button content and the top edge of the control.

**PaddingBottom** – Distance between the button content and the bottom edge of the control.

**PaddingLeft** – Distance between the button content and the left edge of the control.

**PaddingRight** – Distance between the button content and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the button. Accepts `ButtonAppearance` enum values:

| Value | Description |
|-------|-------------|
| `ButtonAppearance.Primary` | Filled button using the brand color. Default. |
| `ButtonAppearance.Secondary` | Subtle filled style, secondary emphasis. |
| `ButtonAppearance.Outline` | Outlined button with no background fill. |
| `ButtonAppearance.Subtle` | Minimal styling, no border or fill. |
| `ButtonAppearance.Transparent` | No visible styling; blends with the background. |

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Change this property to apply a different theme color to the button.

**Icon** – The Fluent icon name to display alongside the button text (for example, `"Add"`, `"Save"`, `"Delete"`). Leave blank for a text-only button.

**IconStyle** – Whether the icon renders in outline or filled style. Accepts `IconStyle` enum values: `IconStyle.Outline` (default) or `IconStyle.Filled`.

**IconRotation** – Rotation in degrees applied to the icon. Default is **0**.

**Layout** – The position of the icon relative to the button text. Accepts `ButtonLayout` enum values:

| Value | Description |
|-------|-------------|
| `ButtonLayout.IconBefore` | Icon appears to the left of the text. Default. |
| `ButtonLayout.IconAfter` | Icon appears to the right of the text. |
| `ButtonLayout.IconOnly` | Only the icon is shown; no text label. |

**Font** – The font family used for the button label.

**Size** – The font size of the button label, in points.

**Color** – The color of the button label text.

**FontWeight** – The weight (thickness) of the button label. Accepts `FontWeight` enum values: `FontWeight.Bold`, `FontWeight.Semibold`, `FontWeight.Normal` (default), `FontWeight.Lighter`.

**Italic** – Whether the button label appears in italic style.

**Underline** – Whether a line appears under the button label text.

**Strikethrough** – Whether a line appears through the middle of the button label text.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Additional properties

**AccessibleLabel** – Label read by screen readers. Provide a meaningful description when the button label alone isn't sufficient (for example, when using an icon-only button).

**Tooltip** – Explanatory text that appears when the user hovers over the button.

**ContentLanguage** – The display language for the control content, if different from the app language.

## Example

The following YAML example shows a submit button and a cancel button with OnSelect actions:

```yaml
- SubmitButton:
    Control: ModernButton@1.0.0
    Properties:
      Text: ="Submit"
      OnSelect: |
        SubmitForm(DataForm1);
        Navigate(SuccessScreen)
      Appearance: =ButtonAppearance.Primary
      Icon: ="Checkmark"
      IconStyle: =IconStyle.Outline
      Layout: =ButtonLayout.IconBefore
      AccessibleLabel: ="Submit the form"
      Tooltip: ="Submit your response"
      Width: =120
      Height: =36

- CancelButton:
    Control: ModernButton@1.0.0
    Properties:
      Text: ="Cancel"
      OnSelect: =Navigate(HomeScreen)
      Appearance: =ButtonAppearance.Outline
      Width: =120
      Height: =36
```

### Common button patterns

Here are typical button implementations:

**Navigation button:**
```powerfx
OnSelect = Navigate(DetailsScreen, ScreenTransition.Fade)
```

**Data submission:**
```powerfx
OnSelect = SubmitForm(Form1); Notify("Data saved!", NotificationType.Success)
```

**Variable update:**
```powerfx
OnSelect = Set(IsVisible, !IsVisible)
```

**Confirmation dialog:**
```powerfx
OnSelect = If(
    Confirm("Are you sure you want to delete this item?"),
    Remove(Collection1, ThisItem)
)
```

## Recent updates

The updated version of the **Button** modern control includes the following improvements and behavior changes.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|---|---|
| `FontSize` | `Size` |
| `FontColor` | `Color` |
| `FontItalic` | `Italic` |
| `FontUnderline` | `Underline` |
| `FontStrikethrough` | `Strikethrough` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Removed properties

| Removed property | Notes |
|---|---|
| `AcceptsFocus` | Removed. The modern Button control always accepts keyboard focus. No replacement needed. |

### Bug fixes and improvements

- **Updated enums**: `Appearance`, `Layout`, and `IconStyle` now use typed Power Fx enums (`ButtonAppearance`, `ButtonLayout`, `IconStyle`) instead of string values, improving IntelliSense and reducing formula errors.
- **Tooltip support**: New `Tooltip` property shows explanatory text on hover.
- **Border improvements**: Added `BorderStyle` and `BorderThickness` for more precise border control. Four corner-specific properties replace `BorderRadius` for independent corner control.
- **Full font control**: Font properties are now consistent with other modern controls. Use `Font`, `Size`, `Color`, `Italic`, `Underline`, and `Strikethrough`.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Card modern control in Power Apps

Source: [modern-control-card.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-card)

*Learn about the details, properties, and examples of the card modern control in Power Apps.*

# Card modern control

Cards help makers create clean, responsive object summaries such as contact tiles, document previews, or product listings in either horizontal or vertical orientation.

## Description

Use a Card when you want to show a concise overview of an item with optional imagery and text.
The control adapts its layout to the sections a maker chooses to configure, enabling consistent patterns without requiring multiple independent controls.

## General

**Direction** – Determines whether the card layout is vertical or horizontal

**Title** – Header title text displayed on the card

**Subtitle** – Supplemental text displayed under or beside the title in the header

**Description** – Description text displayed below the header of the card

**Image** – Main preview image for the card

**ImageAltText** – Alt text for the preview image for accessibility

**HeaderImage** – Small avatar or icon displayed in the header with the title and subtitle

**HeaderImageAltText** – Alt text for the header image

**ImagePosition** – Determines whether the preview image appears before or after the header section

## Behavior

**OnSelect** – Action triggered when the user selects the card

**DisplayMode** – Controls whether the card is interactive, view‑only, or disabled

**Visible** – Shows or hides the card

## Style and theme

**Fill** – The background fill color of the card. When set, text colors automatically adjust for contrast unless explicitly overridden.

**Radius** – Controls corner roundness of the card container

**DropShadow** – Defines the shadow style applied to the card

**TitleColor** – The font color of the title text. Overrides auto-contrast when explicitly set.

**SubtitleColor** – The font color of the subtitle text. Overrides auto-contrast when explicitly set.

**DescriptionColor** – The font color of the description text. Overrides auto-contrast when explicitly set.

**TitleSize** – The font size of the title text, in points.

**SubtitleSize** – The font size of the subtitle text, in points.

**DescriptionSize** – The font size of the description text, in points.

> [!NOTE]
> When you set a **Fill** color without explicitly setting text colors, the card automatically adjusts text to contrast with the background (black or white based on luminance). If you set an explicit color property such as **TitleColor**, it overrides the auto-contrast behavior for that text slot.

## Size and position

**X, Y** – Position of the control on the canvas

**Width, Height** – Dimensions of the control

## Examples

The following examples show three Card configurations you can copy and paste directly into your app configuration.

### **Vertical card with description**
```yaml
- VerticalCardwithDescription:
    Control: ModernCard@1.0.0
    Properties:
      Description: ="This is a sample description"
      Height: =240
      Width: =329
      X: =50
      Y: =45
```

### **Horizontal card with long description and no image**
```yaml
- HorizontalCardwithLongDescriptionNoImage:
    Control: ModernCard@1.0.0
    Properties:
      Description: ="This is a long description text. It provides a rich, narrative overview designed to help users understand the purpose, value, and key capabilities of the experience. This section typically expands beyond a short summary by offering contextual background, explaining how the feature solves real user problems, and detailing what makes it uniquely impactful."
      Height: =240
      Image: =Blank()
      LayoutDirection: =LayoutDirection.Horizontal
      Width: =300
      X: =40
      Y: =40
```

### **Vertical card with header on top**
```yaml
- VerticalCardwithHeaderOnTop:
    Control: ModernCard@1.0.0
    Properties:
      HeaderImage: =Blank()
      Height: =240
      ImagePlacement: =ImagePlacement.AfterHeader
      Subtitle: ="This is subtitle which can take whole of single line."
      Title: ="Title for the card"
      Width: =350
      X: =40
      Y: =40
```

### **Card with custom text styling**
```yaml
- StyledCard:
    Control: ModernCard@1.0.0
    Properties:
      Title: ="Featured Product"
      Subtitle: ="Limited time offer"
      Description: ="High quality item with premium features."
      Fill: =RGBA(0, 51, 102, 1)
      TitleColor: =RGBA(255, 255, 255, 1)
      SubtitleColor: =RGBA(200, 220, 255, 1)
      DescriptionColor: =RGBA(180, 200, 230, 1)
      TitleSize: =18
      SubtitleSize: =14
      DescriptionSize: =12
      Height: =240
      Width: =350
      X: =40
      Y: =40
```

---

## Checkbox modern control in Power Apps

Source: [modern-control-checkbox.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-checkbox)

*Learn about the details, properties, and examples of the checkbox modern control in Power Apps.*

# Checkbox modern control in Power Apps

A control that the user can select or clear to set its value to **true** or **false**.

## Description
The user can specify a Boolean value by using this familiar control that's been used in graphical user interfaces (GUIs) for decades. The key properties for this control are **Checked**, **Label**, **OnCheck**, and **OnUncheck**.

## General

**Label** – The checkbox's label.

**AccessibleLabel** – Label for screen readers.

**Visible** - Whether a control appears or is hidden. 

## Behavior 

**Checked** – The controlled value for the checkbox.

**DisplayMode** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled).

## Size and position 

**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Width** - The distance between a control's left and right edges. 

**Height** - The distance between a control's top and bottom edges. 

## Style and theme

**BasePaletteColor** - The color palette applied to a control. This color impacts all surfaces of the control that render a theme color. 

**Font** - The name of the family of fonts in which text appears. 

**Size** - The font size of the text that appears on a control. If the value is null or zero, the selected Fluent theme drives the font size. 

**Color** - The color of text in a control. 

**FontWeight** - The weight of the text in a control: Bold, Lighter, Normal, or Semibold. 

**FontItalic** - Whether the text in a control is italic. 

**FontUnderline** - Whether a line appears under the text that appears on a control. 

**FontStrikethrough** - Whether a line appears through the text that appears on a control. 


## Additional properties

**Tooltip** - Explanatory text that appears when the user hovers over the control. 

**OnCheck** - Actions to perform when the user checks the control. 

**OnSelect** - Actions to perform when the user selects a control. 

**OnUncheck** - Actions to perform when the user unchecks the control. 

## Recent updates

The updated version of the **Checkbox** modern control includes the following improvements and behavior changes.

### Property renames

| Previous property | New property | Notes |
|---|---|---|
| `FontColor` | `Color` | Renamed for consistency across modern controls. |
| `FontSize` | `Size` | Renamed for consistency across modern controls. |

### Improvements

- **Tooltip support**: A new `Tooltip` property shows explanatory text when the user hovers over the checkbox.
- **Read-only View mode**: When `DisplayMode` is `View`, the checkbox now renders as read-only rather than looking disabled, so users can clearly tell the difference between a value they can't change and a control that's unavailable.
- **More reliable Checked behavior**: The control now honors a `Checked` default of **true** when the app loads, and the `OnCheck` and `OnUncheck` events fire consistently, including when the checkbox is used inside a gallery.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Recent updates to modern controls](modern-control-updates.md)
- [Toggle modern control](modern-control-toggle.md)

---

## Combo box modern control in canvas apps - Power Apps

Source: [modern-control-combobox.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-combobox)

*Learn about the details, properties, and examples of the Combo box modern control in Power Apps.*

# Combo box modern control in canvas apps

A searchable, multiselect dropdown control for selecting one or more items from a list.

## Description

The **Combo box** modern control provides a flexible, searchable dropdown interface that enables users to select one or more items from a list of options. This control combines the functionality of a traditional dropdown with advanced search capabilities, making it ideal for scenarios where users need to choose from large datasets or multiple selections.

Key properties for this control are **Items**, **DefaultSelectedItems**, and **SelectMultiple**.

## General

**Items** – The data source that contains the items shown in the combo box. Can be a collection, table, or Power Fx formula that returns a table.

**ItemDisplayText** – A formula that determines what text to display for each item in the dropdown list. Use `ThisItem` to reference the current item. Example: `ThisItem.DisplayName` or `ThisItem.Value1`.

**DefaultSelectedItems** – The initial items selected in the control before the user makes a change. Must be a table of records from the **Items** data source.

**InputTextPlaceholder** – Hint text that appears in the input field when no items are selected. Default is **"Find items"**.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**SelectMultiple** – Whether users can select multiple items. When `true`, users can select multiple items and each selected item can be toggled on or off by clicking it again. When `false`, only one item can be selected at a time. Default is **true**.

**IsSearchable** – Whether the search box is enabled. When `true`, users can type to filter the list. When `false`, the control acts as a simple dropdown without search. Default is **true**.

**OnChange** – How the app responds when the user selects or deselects an item. This event fires immediately on every selection or deselection, making it ideal for real-time filtering or dependent dropdowns.

**AllowMultipleSelection** – (Display property) A toggle that controls whether users can select multiple items. Maps to the **SelectMultiple** property.

**AllowSearching** – (Display property) A toggle that controls whether search is enabled. Maps to the **IsSearchable** property.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the selection is shown but can't be changed.

**DelayOutput** – When set to `true`, delays updates to the **SearchText** output property until the user pauses typing. When `false`, **SearchText** updates immediately on each keystroke. This property does not affect when **OnChange** fires — **OnChange** fires immediately on every selection and deselection regardless of this setting. Default is **false**.

## Data

**SelectedItems** – (Output) A table of records representing the items currently selected by the user. Use this property to reference the user's selections in formulas.

**Selected** – (Output) When **SelectMultiple** is `false`, returns the single selected item as a record. When **SelectMultiple** is `true`, returns the first selected item.

**SearchText** – (Output) The current text typed by the user in the search box. Use this to create custom filtering logic or to track search behavior.


> [!NOTE]
> Output properties such as **SelectedItems** in a Combo box control return a table of the currently selected records and can’t be set directly. Instead, other controls and formulas use this property to access the current selection. For example, reference `ComboBoxName.SelectedItems` in a label, gallery, or formula to work with the selected records.


**MultiValueDelimiter** – The separator character used when displaying multiple selected items in the input field. Default is **", "** (comma and space).

## Validation

**Required** – Whether the control must have at least one item selected before the form can be submitted. When `true`, the control shows a validation error if empty.

**ValidationState** – The current validation state of the control. Accepts `ValidationState` enum values:

| Value | Description |
|-------|-------------|
| `ValidationState.Error` | The control value has an error |
| `ValidationState.None` | No validation applied (default) |

## Size and position

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **320**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the text and the top edge of the control.

**PaddingBottom** – Distance between the text and the bottom edge of the control.

**PaddingLeft** – Distance between the text and the left edge of the control.

**PaddingRight** – Distance between the text and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the control. Accepts `Appearance` enum values:

| Value | Description |
|-------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Changes this property to apply a different theme color to the control.

**Font** – The name of the font family in which text appears.

**Size** – The font size of the text, in points. Default is **14**.

**Color** – The color of the text in the control.

**FontWeight** – The weight (thickness) of the text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text appears in italic style.

**Underline** – Whether a line appears under the text.

**Strikethrough** – Whether a line appears through the middle of the text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Example

The following YAML example shows combo box controls with single and multiselect modes:

```yaml
- DepartmentComboBox:
    Control: ModernCombobox@1.0.0
    Properties:
      Items: =["Engineering", "Sales", "Marketing", "Support"]
      ItemDisplayText: =ThisItem.Value
      InputTextPlaceholder: ="Select a department..."
      SelectMultiple: =false
      IsSearchable: =true
      Required: =true
      X: =40
      Y: =100
      Width: =320
      Height: =32

- TeamMemberComboBox:
    Control: ModernCombobox@1.0.0
    Properties:
      Items: =["Alice Smith", "Bob Johnson", "Carol Williams", "David Brown"]
      ItemDisplayText: =ThisItem.Value
      InputTextPlaceholder: ="Select team members..."
      SelectMultiple: =true
      IsSearchable: =true
      MultiValueDelimiter: ="; "
      X: =40
      Y: =150
      Width: =320
      Height: =32
```

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the control is for. Describe the purpose of the combo box, not the current selection.

**TabIndex** – The tab order of the control relative to other controls. Controls with lower **TabIndex** values receive focus before controls with higher values.

## Recent updates

The updated version of the **Combo box** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Enum format changes

The following properties now require typed enum syntax instead of plain string values:

| Property | Previous format | New format |
|----------|----------------|------------|
| `Appearance` | `"FilledDarker"` | `Appearance.FilledDarker` |
| `ValidationState` | `"None"` | `ValidationState.None` |

### Behavioral changes

- **SelectMultiple defaults to true**: The **SelectMultiple** property now defaults to `true`. If your app requires single selection, explicitly set `SelectMultiple = false`.
- **Toggle selection behavior**: Clicking a selected item now unselects it, making it easier to remove selections without clearing the entire list.
- **Immediate OnChange firing**: The **OnChange** event now fires immediately on every selection or deselection, enabling real-time filtering and dependent dropdowns. Note: **DelayOutput** controls when **SearchText** updates — it does not affect **OnChange** timing.
- **Search text clears on selection**: When an item is selected, the search text automatically clears.
- **Reset() includes SearchText**: The `Reset()` function now clears both the selection and the search text.

### Removed and replaced properties

| Removed property | Replacement | Notes |
|------------------|-------------|-------|
| `TriggerOutput` | `DelayOutput` | `TriggerOutput = "Keypress"` → `DelayOutput = false`. `TriggerOutput = "FocusOut"` → `DelayOutput = true`. |
| `Fields` | `ItemDisplayText` | Replace `Fields = ["FieldName"]` with `ItemDisplayText = ThisItem.FieldName`. |

### Other improvements

- **Improved data handling**: Better support for Dataverse many-to-one relationships and increased item limit handling (previously limited to about 800 items).
- **Mobile-optimized defaults**: When adding the control in a mobile layout, defaults are automatically adjusted (font size 24, width 560, height 64).

## Limitations

- The control works best with lists that have up to several thousand items. For very large datasets (more than 10,000 items), consider using server-side filtering by using the **SearchText** output property.
- In the current version, chevron and checkbox icons don't scale with font size.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Date picker modern control in canvas apps - Power Apps

Source: [modern-control-date-picker.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-date-picker)

*Learn about the details, properties, and examples of the Date picker modern control in Power Apps.*

# Date picker modern control in canvas apps

The **Date picker** modern control provides an intuitive calendar interface for date selection in canvas apps. This control combines visual calendar navigation with flexible formatting options to create a seamless date input experience for users.

## Description

Use this control when you need users to select specific dates, such as appointment scheduling, event planning, or filtering data by date ranges. The control supports customizable date formats, timezone handling, and date range restrictions to meet diverse application requirements.

Key capabilities include:

- Visual calendar interface with month and year navigation
- Flexible date formatting using predefined formats or custom patterns
- Date range validation to restrict selectable dates
- Timezone support for local or UTC display
- Accessibility features for screen readers and keyboard navigation

The control outputs the selected date through the SelectedDate property, which you can use in formulas throughout your app.


Key properties for this control are **SelectedDate**, **Format**, and **DateTimeZone**.

## General

**Placeholder** – Hint text that appears when no date is selected. Default is **"Select a date"**.

**DefaultDate** – The initial date selected in the control before the user makes a change. Use this property to set a default date when the picker first loads.

**Format** – The display format for the selected date. Accepts `DatePickerFormat` enum values or a custom format string:

**Enum values:**

| Value | Description | Example |
|-------|-------------|---------|
| `DatePickerFormat.LongAbbreviated` | Abbreviated month with full year (default) | Jan 15, 2024 |
| `DatePickerFormat.Short` | Short numeric format | 1/15/2024 |
| `DatePickerFormat.Long` | Full month name with year | January 15, 2024 |

**Custom format strings:**

You can also use custom date format patterns as strings to create specific date representations:

| Format string | Example output |
|---------------|----------------|
| `"dd-mm-yyyy"` | 15-01-2024 |
| `"dd-mm"` | 15-01 |
| `"yyyy-mm-dd"` | 2024-01-15 |
| `"dd/mm/yyyy"` | 15/01/2024 |
| `"mm/dd/yyyy"` | 01/15/2024 |

Use custom format strings when you need a specific date representation not available in the enum values. Example: `Format = "dd-mm-yyyy"`.

**DateTimeZone** – The timezone used for date display and storage. Accepts `DateTimeZone` enum values:

| Value | Description |
|-------|-------------|
| `DateTimeZone.Local` | User's local timezone (default) |
| `DateTimeZone.UTC` | Coordinated Universal Time |

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnChange** – How the app responds when the user selects a different date. This event fires when the date selection changes.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the selected date is shown but the calendar can't be opened.

**IsEditable** – Whether the user can type a date directly into the input field or must use the calendar picker. When `false`, users must select the calendar icon to choose a date. Default is **false**.

## Date range

**StartDate** – The earliest date that can be selected in the calendar. Dates before this date are disabled. Default is **Date(1900, 1, 1)**.

**EndDate** – The latest date that can be selected in the calendar. Dates after this date are disabled. Default is **Date(Year(Today())+100, 12, 31)**.

**StartOfWeek** – The day that appears as the first column in the calendar view. Accepts `StartOfWeek` enum values:

| Value | Description |
|-------|-------------|
| `StartOfWeek.Sunday` | Week starts on Sunday (default) |
| `StartOfWeek.Monday` | Week starts on Monday |
| `StartOfWeek.Tuesday` | Week starts on Tuesday |
| `StartOfWeek.Wednesday` | Week starts on Wednesday |
| `StartOfWeek.Thursday` | Week starts on Thursday |
| `StartOfWeek.Friday` | Week starts on Friday |
| `StartOfWeek.Saturday` | Week starts on Saturday |

## Data

**SelectedDate** – (Output) The date currently selected by the user. Returns a date value that you can use in formulas. Returns `Blank()` if no date is selected.

## Validation

**ValidationState** – The current validation state of the control. Accepts `ValidationState` enum values:

| Value | Description |
|-------|-------------|
| `ValidationState.Error` | The control value has an error |
| `ValidationState.None` | No validation applied (default) |

## Size and position

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **320**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the text and the top edge of the control.

**PaddingBottom** – Distance between the text and the bottom edge of the control.

**PaddingLeft** – Distance between the text and the left edge of the control.

**PaddingRight** – Distance between the text and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the control. Accepts `Appearance` enum values:

| Value | Description |
|-------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Change this property to apply a different theme color to the control.

**Font** – The name of the font family in which text appears.

**Size** – The font size of the text, in points. Default is **0** (uses theme default).

**Color** – The color of the text in the control.

**FontWeight** – The weight (thickness) of the text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text appears in italic style.

**Underline** – Whether a line appears under the text.

**Strikethrough** – Whether a line appears through the middle of the text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the control is for. It should describe the purpose of the date picker, not the current selection.

**ContentLanguage** – The language used for formatting dates and calendar display. The app settings provide the value if you don't specify it.

## Example

The following YAML example shows date picker controls for selecting dates:

```yaml
- StartDatePicker:
    Control: ModernDatePicker@1.0.0
    Properties:
      Placeholder: ="Select start date"
      DefaultDate: =Today()
      StartDate: =Today()
      EndDate: =Today() + 365
      StartOfWeek: =StartOfWeek.Monday
      X: =40
      Y: =100
      Width: =280
      Height: =32

- EndDatePicker:
    Control: ModernDatePicker@1.0.0
    Properties:
      Placeholder: ="Select end date"
      Format: =DatePickerFormat.Short
      DefaultDate: =Today() + 7
      StartOfWeek: =StartOfWeek.Monday
      X: =340
      Y: =100
      Width: =280
      Height: =32
```

## Recent updates

The updated version of the **Date picker** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Removed properties

| Removed property | Notes |
|------------------|-------|
| `Required` | Use `ValidationState` instead to control validation styling. |

### Bug fixes and improvements

- **DisplayMode.View properly enforced**: In **View** mode, the control is now properly read-only and the calendar can't be opened. Previously, the picker was still editable in View mode.
- **Format property fully honored**: All format values are now properly applied. Previously, certain format values were ignored until another change was made.
- **DateTimeZone respected**: The **DateTimeZone** property now correctly applies to date display and storage. Previously, this property value was sometimes ignored.
- **Blank value handling**: When the control is in **View** mode with a blank value, it no longer incorrectly shows a previous value.
- **Mobile calendar improvements**: Calendar flyout is now properly sized for mobile devices, with optimized defaults (width 560, height 64, font size 24).
- **Month/Year flyout positioning**: Fixed issue where the month/year selector went off-screen on smaller displays.
- **Gallery and data card stability**: Resolved crashes that occurred when adding the date picker to galleries or data cards.
- **Color palette inheritance**: The calendar flyout now properly respects the **BasePaletteColor** override.
- **Command bar integration**: The authoring command bar and right-click menu now show Font, Font Size, Font color, and Background color for quick access.
- **DefaultDate property**: New property allows setting an initial date when the picker first loads.

## Limitations

- The calendar icon doesn't scale with font size in the current version.
- On mobile devices, the control shows the Fluent calendar view instead of the native mobile date picker.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Dropdown modern control in canvas apps - Power Apps

Source: [modern-control-dropdown.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-dropdown)

*Learn about the details, properties, and examples of the Dropdown modern control in Power Apps.*

# Dropdown modern control in canvas apps

Let users pick a single value from a collapsible list.

## Description

The **Dropdown** modern control presents a list of choices in a compact, collapsible format. Users select one item and the list collapses back to a single line. Use the **Dropdown** control when you need users to choose one option from a list of more than seven items, for required fields with a fixed set of choices, or for forms where screen space is limited. For fewer options (two to seven), consider using a [Radio group](modern-controls-radio-group.md) instead. If users need to select multiple items, use a [Combo box](modern-control-combobox.md).

Key properties for this control are **Items**, **Default**, **ValidationState**, and **OnChange**.

> [!NOTE]
> This article describes the updated Dropdown modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

On desktop, the updated control opens a **Fluent-themed flyout** that matches the app's visual theme. The previous version opened the browser's HTML `<select>` element, which couldn't be themed. 

## General

**Items** – The source of data that contains the items that appear in the control. Accepts a table, a collection, or an inline array (for example, `["Option A", "Option B", "Option C"]`).

**ItemDisplayText** – A Power Fx formula evaluated for each item in **Items** to determine the text shown in the list. Use `ThisItem` to reference the current item. Defaults to `ThisItem.Value` for string arrays and `ThisItem.Value1` for table data sources. Change this when your data source has a specific column to display (for example, `ThisItem.Name`).

**Default** – The initial selected value before the user makes a change. Set this to a value that exists in **Items** (for example, `="Option A"`). Leave blank for no default selection.

**AccessibleLabel** – Label read by screen readers. Describe the purpose of the dropdown (for example, `"Select a country"`).

**Visible** – Whether the control appears or is hidden.

## Behavior

**OnChange** – Actions to perform when the user changes the selection. Use `Self.Selected.Value` inside the formula to read the newly selected item. For example, `Notify("You selected " & Self.Selected.Value)` displays a message each time the selection changes.

**Required** – Whether the user must make a selection. When **true**, an indicator appears beside the dropdown. Default is **false**.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**ValidationState** – Applies validation styling to the control. Accepts `ValidationState` enum values:

| Value | Description |
|-------|-------------|
| `ValidationState.None` | No validation styling. Default. |
| `ValidationState.Error` | Highlights the control border in red to indicate an error. |

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **320**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the control content and the top edge of the control.

**PaddingBottom** – Distance between the control content and the bottom edge of the control.

**PaddingLeft** – Distance between the control content and the left edge of the control.

**PaddingRight** – Distance between the control content and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the dropdown field. Accepts `Appearance` enum values:

| Value | Description |
|-------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Use this value to apply a different theme color to the control.

**Font** – The font family used for the dropdown text.

**Size** – The font size of the dropdown text, in points. Default is **14**.

**Color** – The color of the dropdown text.

**FontWeight** – The weight (thickness) of the dropdown text. Accepts `FontWeight` enum values: `FontWeight.Bold`, `FontWeight.Semibold`, `FontWeight.Normal` (default), `FontWeight.Lighter`.

**Italic** – Whether the dropdown text appears in italic style.

**Underline** – Whether a line appears under the dropdown text.

**Strikethrough** – Whether a line appears through the middle of the dropdown text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Additional properties

**ContentLanguage** – The display language for the control content, if different from the app language.

## Output properties

**Selected** – The currently selected item, returned as a record. For a string array, use `Dropdown1.Selected.Value` to read the selected text. For a table data source, use `Dropdown1.Selected.<ColumnName>`.

> [!NOTE]
> **Selected** is an output property. You can reference it in other controls and formulas, but you can't set it directly.

## Examples

### Basic dropdown with inline options

This example creates a required country dropdown with inline validation. When the user hasn't selected a value, the control shows an error state.

```yaml
- CountryDropdown:
    Control: ModernDropdown@1.0.0
    Properties:
      AccessibleLabel: ="Select your country"
      Default: ={Value:"United States"}
      ItemDisplayText: =ThisItem.Value
      Items: =["Australia", "Canada", "United Kingdom", "United States"]
      Required: =true
      ValidationState: =If(IsBlank(CountryDropdown.Selected.Value), ValidationState.Error, ValidationState.None)
      Width: =240   
```

### Dropdown bound to a data source

This example binds the dropdown to a table data source and displays the **Name** column. The **OnChange** action stores the selected record in a variable.

```yaml
- DepartmentDropdown:
    Control: ModernDropdown@1.0.0
    Properties:
      AccessibleLabel: ="Select a department"
      Appearance: =Appearance.Outline
      ItemDisplayText: =ThisItem.Name
      Items: =Departments
      OnChange: =Set(varSelectedDept, Self.Selected)
      Width: =320
```

## Recent updates

The updated version of the **Dropdown** modern control includes the following improvements and behavior changes.

### Property renames

| Previous property | New property | Notes |
|---|---|---|
| `DefaultSelectedItems` | `Default` | Set the initial selection through `Default`. Change any formula referencing `Dropdown1.DefaultSelectedItems` to `Dropdown1.Default`. |
| `FontSize` | `Size` | Renamed to match other modern controls. Default changed from **0** (inherits from theme) to **14**. |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` | Split into four independent corner radius properties for greater styling flexibility. |

### Enum format changes

| Property | Previous value | New value |
|---|---|---|
| `Appearance` | `"FilledDarker"` | `Appearance.FilledDarker` |
| `Appearance` | `"Filled"` | `Appearance.Filled` |
| `Appearance` | `"Outline"` | `Appearance.Outline` |
| `ValidationState` | `"None"` | `ValidationState.None` |
| `ValidationState` | `"Error"` | `ValidationState.Error` |

### Bug fixes and improvements

- **Fluent-themed flyout**: On desktop, the dropdown list now opens as a Fluent-themed flyout that matches the app's visual design. The previous version used the browser's HTML `<select>` element, which couldn't be themed. On mobile, both versions use the device-native picker and it remains unchanged.
- **ItemDisplayText**: New property that controls which field of a data source record to show in the list. For string arrays, this property defaults automatically. For table data sources, set this property to the column you want to display (for example, `ThisItem.Name`).
- **Full font control**: New `Font`, `Color`, `FontWeight`, `Italic`, `Underline`, and `Strikethrough` properties give full text styling control, consistent with other modern controls.
- **Updated enums**: `Appearance` and `ValidationState` now use typed Power Fx enums, improving IntelliSense and reducing formula errors.

## Accessibility

**AccessibleLabel** – Set this property to a meaningful description so screen readers can announce the purpose of the dropdown (for example, `"Select your country"`).

**Required** – When set to **true**, screen readers announce the field as required.

Keyboard users can press **Enter** or **Space** to open the dropdown, use **Arrow** keys to move between items, and press **Enter** to confirm a selection.

## Limitations

- The Fluent-themed flyout is available on desktop only. On mobile, the control uses the device-native picker.
- Very large data sources may cause the dropdown list to load slowly. Filter or limit the data where possible.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Form modern control in canvas apps - Power Apps

Source: [modern-control-form.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-form)

*Learn about the details, properties, and examples of the modern Edit form and Display form controls in Power Apps canvas apps.*

# Form modern control in canvas apps

Use a modern form to display, edit, and create records in a data source.

## Description

The modern **Form** control lets users view and work with a single record from a data source. Add an **Edit form** to let users create a record or edit an existing one and save the changes. Or, add a **Display form** to show a record as read-only. The modern form is built on the Microsoft Fluent 2 design system, so it uses updated styling, spacing, and accessibility defaults. It adapts its layout to different screen sizes.

Each field in the record appears in the form. You choose which columns to show and the order in which they appear. When you select a field, you can change the column it's bound to and how the value displays.

Key properties for this control are **DataSource**, **Item**, and **DefaultMode**.

## Modern vs. classic form


The modern **Form** control and the classic [Edit form and Display form controls](../control-form-detail.md)both use the same underlying form model. You set the same **DataSource** and **Item** properties. You use the same [form functions](/power-platform/power-fx/reference/function-form) - **SubmitForm**, **NewForm**, **EditForm**, **ViewForm**, and **ResetForm** - to control the form. Your existing knowledge and formulas carry over.

The modern form differs from the classic form in these ways:

- It uses the Microsoft Fluent 2 design system for a consistent, modern appearance.
- It applies responsive spacing and layout that adjust to the available width.
- It provides updated accessibility defaults, such as a clearer required-field indicator.

Both the classic and modern forms are supported, so you can choose the one that fits your app. To use modern controls, turn on modern controls and themes in your app settings.

## Key features

The modern **Form** control provides these capabilities:

- **Microsoft Fluent 2 design**: Fields, labels, and validation messages use the Fluent 2 design system for a clean, consistent appearance that matches the rest of your modern app.
- **Responsive layout**: The form adjusts its spacing and layout to the available width, so it works across desktop, tablet, and mobile without manual repositioning.
- **Theming**: The form follows the app theme, so you can style forms consistently from one place.
- **Built-in accessibility**: The form provides accessible defaults, including a clear required-field indicator and screen reader support.
- **Familiar form model**: The form uses the same **DataSource**, **Item**, and **DefaultMode** properties and the same form functions as the classic form, so your existing patterns and formulas carry over.

## General

**DataSource** – The data source that contains the record the form displays or edits. The data source also provides column display names and validation, such as which fields are required.

**Item** – The record to display or edit. For example, set **Item** to the **Selected** item of a [Gallery](modern-control-table.md) or to a function such as `First(Accounts)` or `LookUp(Accounts, "Fabrikam" in name)`. In **New** mode, the **Item** property is ignored and the form shows default values from the data source.

**DefaultMode** – The initial mode of the form. Accepts `FormMode` enum values:

| Value | Description |
|-------|-------------|
| `FormMode.Edit` | The form edits the record in the **Item** property. Default. |
| `FormMode.New` | The form creates a record, starting from the default values of the data source. |
| `FormMode.View` | The form displays the record in the **Item** property as read-only. |

## Behavior

**OnSuccess** – Actions to perform when a data operation succeeds after **SubmitForm** runs.

**OnFailure** – Actions to perform when a data operation fails after **SubmitForm** runs.

**OnReset** – Actions to perform when the form resets, such as when **ResetForm** runs.

**DisplayMode** – Whether the control allows input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). The form's mode determines this value.

**Visible** – Whether the control appears or is hidden.

## Output properties

**Mode** – The current mode of the form: **Edit**, **New**, or **View**.

**Unsaved** – Whether the form has changes that the user hasn't saved yet. Use this property to warn users before they navigate away from unsaved edits.

**Updates** – A record of the values in the form's fields, ready to pass to a function such as **Patch**.

**Valid** – Whether all fields in the form, including required fields, currently hold valid values.

**Error** – A user-friendly error message to display when a data operation fails. Available after **OnFailure** runs.

**ErrorKind** – The kind of error that occurred, expressed as an `ErrorKind` enum value.

**LastSubmit** – The last successfully submitted record, including any server-generated values such as an ID. Available after **OnSuccess** runs.

## Work with the form

Use the [form functions](/power-platform/power-fx/reference/function-form) to change the form's mode and to save changes. Set these formulas on the **OnSelect** property of buttons.

- Switch to **New** mode so the user can create a record:

  ```power-fx
  NewForm(Form1)
  ```

- Switch to **Edit** mode to change the record in the **Item** property:

  ```power-fx
  EditForm(Form1)
  ```

- Switch to **View** mode to show the record as read-only:

  ```power-fx
  ViewForm(Form1)
  ```

- Save the changes in the form to the data source:

  ```power-fx
  SubmitForm(Form1)
  ```

- Discard changes in progress and reset the form to the default values:

  ```power-fx
  ResetForm(Form1)
  ```

When **SubmitForm** runs, the form validates required fields before it writes to the data source. If validation succeeds, the form saves the record and runs **OnSuccess**. If it fails, the form runs **OnFailure** and sets the **Error** and **ErrorKind** properties.

## Recent improvements

Recent releases added the following improvements to the modern **Form** control:

- **New screen templates**: Updated screen templates give the form and header cleaner default spacing, padding, and description text when you add a form-based screen.
- **Clearer required fields**: The required-field indicator appears in red, so users can spot required fields more easily.
- **Consistent typography**: Font size and bold styling are consistent across the form's fields and labels.
- **Display names for people fields**: A person or group field shows the display name of the selected user instead of an identifier.
- **Reliable date fields**: A date field keeps its value when the form switches to **Edit** mode.
- **Accurate validation**: Required-field validation stays accurate when the form's bound data source changes.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [List of modern controls and properties](modern-controls-reference.md)
- [Edit form and Display form controls (classic)](../control-form-detail.md)
- [Understand canvas-app forms](../../working-with-forms.md)
- [EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions](/power-platform/power-fx/reference/function-form)

---

## Header modern control in Power Apps

Source: [modern-controls-header.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-header)

*Learn about the details, properties, and examples of the header modern control in Power Apps.*

# Header modern control in Power Apps 

A control that creates a modern app header.

## Description

The **Header** control is a fundamental control that lets you design a user interface for a common app with ease. With minimal configuration, this control responds to themes that use modern theming and dynamic responsiveness, adjusting to the size of the parent container or app. The **Header** control supports a logo, a page title, and displays the user picture, while providing various unique style options. The key properties for this control are **Logo**, **OnSelectLogo**, and **Title**.


## General

**Title** – The title label displayed in the header. Default value is the current screen name. 

**IsTitleVisible** – Whether the title is displayed in the header.

**Logo** – The image displayed in the header. 

**IsLogoVisible** – Whether the logo image is displayed. 

**IsProfilePictureVisible** – Whether the user picture is displayed in the header. By default, a picture of the current user using the app is shown. 

**Visible** - Whether a control appears or is hidden. 

## Size and position

**X** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container). 

**Y** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container). 

**Width** - The distance between a control's left and right edges.  

**Height** - The distance between a control's top and bottom edges.

## Style and theme

**BasePaletteColor** - The color palette applied to a control. This impacts all surfaces of the control that render a theme color. This property has no effect if the **ThemeStyle** property is set to **Neutral**.    

**Style** – Header color variant, based on theme colors. 

**Font** - The name of the family of fonts in which text appears. 

**TitleFontSize** - The font size of the title that appears on a control. If the value is null or zero, then the font size is driven by selected Fluent theme. 

**FontColor** - The color of text in a control.

## Additional properties 

**DisplayMode** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled).  

**LogoMaxHeight** – The maximum height the logo can be placed within the control. 

**LogoToolTip** - Tooltip for the logo.  

**OnSelectLogo** - Actions to perform when the user selects the logo. 


## Unsupported capabilities

The following features aren't supported:

- Customization of colors 
- App navigation

> [!NOTE]
> This list will change over time as we're working to support these capabilities.

The header doesn't automatically replicate across app screens, so it needs to be manually added to each screen.

---

## Icon modern control in canvas apps - Power Apps

Source: [modern-control-icon.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-icon)

*Learn about the details, properties, and examples of the Icon modern control in Power Apps.*

# Icon modern control in canvas apps

Displays a Fluent icon that can optionally respond to user interaction.

## Description

The **Icon** modern control displays a Fluent icon from a library of approximately **180 icons**, matching parity with the classic icon set. You can use it in two ways:

- **Decorative** – Display a static icon as a visual indicator (for example, a status badge or label prefix). Leave the **OnSelect** property empty.
- **Interactive** – Respond to user input. Set the **OnSelect** property to a formula, and the control automatically renders with button semantics so it works with keyboard navigation and screen readers.

Common uses include toolbar actions, status indicators, inline navigation, and lightweight call-to-action elements.

The key properties for this control are **Icon**, **IconStyle**, and **OnSelect**.

> [!NOTE]
> This article describes the updated Icon modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## Add an icon to your app

1. Open your canvas app for editing.
1. On the left pane, select **Insert** (+).
1. Expand **Modern controls** and choose **Icon**.
1. In the property pane on the right, set the **Icon** property to a Fluent icon name such as `"Add"`, `"Delete"`, or `"Edit"`.
1. (Optional) Set **OnSelect** to a formula to make the icon interactive.

## General

**Icon** – The name of the Fluent icon to display (for example, `"Add"`, `"Delete"`, `"Edit"`). Accepts any valid Fluent icon name as a string.

**Visible** – Whether the control appears or is hidden.

## Behavior

**OnSelect** – Actions to perform when the user selects the icon. When this property contains an active formula, the icon renders with button semantics for keyboard and screen reader accessibility.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **32**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**Rotation** – The angle in degrees to rotate the icon clockwise. Default is **0**.

**PaddingTop** – Distance between the icon and the top edge of the control.

**PaddingBottom** – Distance between the icon and the bottom edge of the control.

**PaddingLeft** – Distance between the icon and the left edge of the control.

**PaddingRight** – Distance between the icon and the right edge of the control.

## Style and theme

**IconStyle** – Whether the icon renders in outline or filled style. Accepts `IconStyle` enum values:

| Value | Description |
|-------|-------------|
| `IconStyle.Outline` | Renders the icon in outline (unfilled) style. Default. |
| `IconStyle.Filled` | Renders the icon in filled style. |

**IconColor** – The color of the icon.

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Use this value to apply a different theme color to the icon.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – Label read by screen readers. When you set **OnSelect**, always provide a meaningful description of the action (for example, `"Delete item"`). Because an icon has no visible text, this label is the only way assistive technology can communicate the control's purpose.

> [!TIP]
> For decorative icons that don't perform an action, you can leave **AccessibleLabel** empty so screen readers skip the control.

## Additional properties

**Tooltip** – Explanatory text that appears when the user hovers over the control.

**ContentLanguage** – The display language for the control content, if different from the app language.

## Examples

### Interactive delete icon

This example shows a filled red delete icon that performs an action when selected. The `AccessibleLabel` and `Tooltip` properties ensure the control is usable with keyboard, screen readers, and mouse hover.

```yaml
- DeleteIcon:
    Control: ModernIcon@1.1.0
    Properties:
      AccessibleLabel: ="Delete this item"
      Icon: ="Delete"
      IconColor: =RGBA(176, 0, 32, 1)
      IconStyle: =IconStyle.Filled
      OnSelect: =Remove(MyDataSource, ThisItem)
      Tooltip: ="Delete this item"
```

### Decorative status icon

This example shows a non-interactive icon used as a visual status indicator. Because `OnSelect` isn't set, the icon renders as a decorative element.

```yaml
- StatusIcon:
    Control: ModernIcon@1.1.0
    Properties:
      Icon: ="CheckmarkCircle"
      IconColor: =RGBA(16, 124, 16, 1)
      IconStyle: =IconStyle.Filled
      Width: =24
      Height: =24
```

### Formula examples

Change the icon based on a condition:

```powerapps-dot
If(ThisItem.Status = "Complete", "CheckmarkCircle", "Clock")
```

Toggle between outline and filled styles:

```powerapps-dot
If(ThisItem.IsSelected, IconStyle.Filled, IconStyle.Outline)
```

## Recent updates

The updated version of the **Icon** modern control includes the following improvements and behavior changes.

### Property renames

| Previous property | New property | Notes |
|---|---|---|
| `Style` | `IconStyle` | Renamed for clarity; also changed from string to typed enum. |

### Removed properties

| Removed property | Notes |
|---|---|
| `TabIndex` | Removed. The control automatically handles focus management. |

### Bug fixes and improvements

- **Expanded icon set**: The icon library has been expanded from approximately 56 icons to **180 icons**, matching parity with the classic icon set. Classic Icon.* enum values are now automatically mapped to their Fluent equivalents.
- **OnSelect support**: The icon now triggers actions when selected. When you set `OnSelect` to an active formula, the control renders with button semantics, making it fully accessible via keyboard and screen readers.
- **AccessibleLabel**: New property for screen readers - especially important for interactive icons where the glyph alone doesn't convey meaning.
- **Updated enum**: `IconStyle` now uses a typed Power Fx enum (`IconStyle.Outline`, `IconStyle.Filled`) instead of a plain string, improving IntelliSense and reducing formula errors.
- **Full border and fill control**: New `Fill`, `BorderColor`, `BorderStyle`, `BorderThickness`, and four corner radius properties (`RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight`) provide complete styling options.
- **Padding support**: New `PaddingTop`, `PaddingBottom`, `PaddingLeft`, `PaddingRight` properties control spacing between the icon glyph and the control boundary.
- **BasePaletteColor**: Apply a custom theme color to the icon.

## Best practices

- **Always set AccessibleLabel for interactive icons.** Icons don't have visible text, so the accessible label is essential for screen reader users.
- **Use Tooltip for discoverability.** A tooltip helps sighted users understand what an icon does when they hover over it.
- **Choose Filled vs. Outline intentionally.** Use `IconStyle.Filled` for active or selected states and `IconStyle.Outline` for default states to give users a visual cue.
- **Keep icon sizes consistent.** Use the same **Width** and **Height** values for icons that appear together (for example, in a toolbar) so the layout looks uniform.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Info button modern control in canvas apps - Power Apps

Source: [modern-control-info-button.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-info-button)

*Learn about the details, properties, and examples of the Info button modern control in Power Apps.*

# Info button modern control in canvas apps

An interactive information icon that displays detailed content in a flyout when clicked or hovered.

## Description

The **Info button** control provides contextual help and additional information in your canvas apps. When users select or hover over this interactive information icon, it displays detailed content in a flyout panel without disrupting their workflow.

Use this control to:

- Provide contextual help for form fields and complex features
- Display tooltips with additional guidance
- Offer explanatory content without cluttering your app interface
- Enhance user experience with on-demand information

The **Info button** appears as a standard information icon and supports rich text content, customizable styling, and accessibility features.This modern control integrates seamlessly with your app's design system through theme-based colors and flexible positioning options.

Key properties for this control are **Content**, **IconColor**, and **OnSelect**.

## General

**Content** – The information text displayed in the flyout when the user clicks or hovers over the info button icon. Supports plain text and formatted content.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnSelect** – How the app responds when the user clicks the info button. Use this property to trigger extra actions beyond showing the flyout, such as logging analytics or updating variables.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the icon is shown but the flyout can't be opened.

## Size and position

**X** – Distance between the left edge of the control and the left edge of its parent container. If there's no parent container, the screen acts as the parent.

**Y** – Distance between the top edge of the control and the top edge of its parent container. If there's no parent container, the screen acts as the parent.

**Width** – Distance between the control's left and right edges. The default value is **32**.

**Height** – Distance between the control's top and bottom edges. The default value is **32**.

**PaddingTop** – Distance between the icon and the top edge of the control.

**PaddingBottom** – Distance between the icon and the bottom edge of the control.

**PaddingLeft** – Distance between the icon and the left edge of the control.

**PaddingRight** – Distance between the icon and the right edge of the control.

## Style and theme

**BasePaletteColor** – The base color that the theme uses to generate the control's color palette. Change this property to apply a different theme color to the control.

**Font** – The name of the font family used for text in the flyout content.

**Size** – The font size of text in the flyout, in points. The default is **15**.

**Color** – The color of text in the flyout content.

**FontWeight** – The weight (thickness) of text in the flyout. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text in the flyout appears in italic style.

**Underline** – Whether a line appears under the text in the flyout.

**Strikethrough** – Whether a line appears through the middle of the text in the flyout.

**IconColor** – The color of the information icon button itself. Use this value to match your app's theme or draw attention to important information.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the info button provides information about. It should describe the purpose or topic of the information, not just "info button".

**ContentLanguage** – The language used for the flyout content. If you don't specify this property, the app settings provide the language.

## Example

The following YAML example shows contextual help buttons for form fields with conditional styling and tooltip content:

```yaml
- EmailInfoButton:
    Control: ModernInformationButton@1.0.0
    Properties:
      Content: ="We'll use this email to send you order confirmations and account notifications. Your email is never shared with third parties."
      IconColor: =Color.Blue
      AccessibleLabel: ="Email address information"
      X: =200
      Y: =100
      Width: =28
      Height: =28

- PasswordInfoButton:
    Control: ModernInformationButton@1.0.0
    Properties:
      Content: '="Password requirements: At least 8 characters, one uppercase letter, one number, and one special character (!@#$%)"'
      IconColor: =Color.Orange
      AccessibleLabel: ="Password requirements"
      X: =200
      Y: =150
      Width: =28
      Height: =28

- GeneralInfoButton:
    Control: ModernInformationButton@1.0.0
    Properties:
      Content: ="Click the info icon to view additional details and helpful tips."
      IconColor: =Color.Gray
      Size: =14
      X: =200
      Y: =200
      Width: =28
      Height: =28
```

## Recent updates

The updated version of the **Info button** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |

### Removed properties

| Removed property | Notes |
|------------------|-------|
| `AcceptsFocus` | Removed. The control now automatically manages focus behavior for accessibility. |

### Bug fixes and improvements

- **Content expansion fixed**: The information flyout background now properly expands to fit all content. Previously, long text could be clipped or overflow the flyout.
- **Improved reliability**: Resolved intermittent crashes that occurred when you clicked the info button in certain scenarios.
- **Simplified properties**: Streamlined property organization with most styling properties now in the **Design** section for better discoverability.
- **Consistent styling**: Font and color properties now consistently apply to both the icon and flyout content.

## Best practices

- **Keep content concise**: While the flyout can display lengthy text, aim for two to three short sentences for better user experience.
- **Use accessible labels**: Always provide descriptive **AccessibleLabel** text that explains what information the button provides.
- **Strategic placement**: Position info buttons next to form fields, labels, or unfamiliar terms where users might need clarification.
- **Consistent iconcolor**: Use consistent colors across your app to help users recognize info buttons quickly.
- **Mobile considerations**: Ensure info buttons are large enough to tap easily on mobile devices (minimum 32x32 pixels).

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Link modern control in canvas apps - Power Apps

Source: [modern-control-link.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-link)

*Learn about the details, properties, and examples of the Link modern control in Power Apps.*

# Link modern control in canvas apps

A clickable hyperlink control that navigates users to web URLs or triggers custom actions.

## Description

The **Link** modern control creates clickable hyperlinks that can navigate to external websites or trigger custom actions in your canvas app. Use this control to provide users with quick access to related resources, documentation, or external services while maintaining a consistent visual design with your app's theme.

Key benefits:

- Navigate to external URLs with built-in security validation
- Customize appearance with multiple styling options
- Support for text wrapping and responsive design
- Full accessibility compliance with screen reader support
- Seamless integration with Power Apps theming system

Key properties for this control are **Text**, **Url**, and **Type**.

## General

**Text** – The display text shown for the hyperlink. This is the text users see and click on. Can be different from the actual URL.

**Url** – The web address to go to when the link is clicked. Must be a valid URL that uses `http://`, `https://`, or other safe protocols. For security, the control blocks URLs that use `javascript:` or other unsafe schemes.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**Wrap** – Whether the text wraps to the next line when it goes beyond the control width. When `true`, text wraps to multiple lines. When `false`, text is clipped or continues on a single line. Default is **true**.

**DisplayMode** – Whether the control accepts user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **Edit** mode, the link is clickable. In **View** mode, it displays as text without being clickable.

## Size and position

**Align** – The horizontal alignment of text within the control. Accepts `Align` enum values:

| Value | Description |
|-------|-------------|
| `Align.Left` | Aligns text to the left edge (default) |
| `Align.Center` | Centers text horizontally |
| `Align.Right` | Aligns text to the right edge |
| `Align.Justify` | Stretches text to fill the full width |

**VerticalAlign** – The vertical alignment of text within the control. Accepts `VerticalAlign` enum values:

| Value | Description |
|-------|-------------|
| `VerticalAlign.Top` | Aligns text to the top |
| `VerticalAlign.Middle` | Centers text vertically (default) |
| `VerticalAlign.Bottom` | Aligns text to the bottom |

**AutoHeight** – Whether the control automatically increases its height when the text content exceeds the visible area.

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **150**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the text and the top edge of the control. Default is **5**.

**PaddingBottom** – Distance between the text and the bottom edge of the control. Default is **5**.

**PaddingLeft** – Distance between the text and the left edge of the control. Default is **5**.

**PaddingRight** – Distance between the text and the right edge of the control. Default is **5**.

## Style and theme

**Type** – The visual style of the link. Accepts `LinkAppearance` enum values:

| Value | Description |
|-------|-------------|
| `LinkAppearance.Default` | Standard link appearance with theme color (default) |
| `LinkAppearance.Subtle` | Subtle appearance with lighter styling |

**BasePaletteColor** – The base color the theme uses to generate the control's color palette. Change this property to apply a different theme color to the control.

**Font** – The name of the font family for the text.

**Size** – The font size of the text, in points. Default is **15**.

**Color** – The color of the link text in the control.

**FontWeight** – The weight (thickness) of the text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text appears in italic style.

**Underline** – Whether a line appears under the text. Links typically have underlines by default.

**Strikethrough** – Whether a line appears through the middle of the text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the link leads to. Use a description of the destination or purpose of the link, not just "link".

**ContentLanguage** – The language used for the link text. Inherits from app settings if you don't specify it.

## Example

The following YAML example shows link controls with different styling options:

```yaml
- DocumentationLink:
    Control: ModernLink@1.0.0
    Properties:
      Text: ="View Documentation"
      URL: ="https://docs.microsoft.com/powerapps"
      Type: =LinkAppearance.Default
      Size: =16
      FontWeight: =FontWeight.Semibold
      X: =40
      Y: =100
      Width: =200
      Height: =32

- SupportLink:
    Control: ModernLink@1.0.0
    Properties:
      Text: ="Contact Support"
      URL: ="https://support.microsoft.com"
      Type: =LinkAppearance.Subtle
      Size: =14
      X: =40
      Y: =150
      Width: =200
      Height: =32

- TermsLink:
    Control: ModernLink@1.0.0
    Properties:
      Text: ="Terms and Conditions"
      URL: ="https://company.com/terms"
      Type: =LinkAppearance.Subtle
      Size: =12
      Wrap: =false
      X: =40
      Y: =200
      Width: =150
      Height: =32
```

## Recent updates

The updated version of the **Link** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |
| `Appearance` | `Type` (uses `LinkAppearance` enum: `LinkAppearance.Default` or `LinkAppearance.Subtle`) |

### Removed properties

| Removed property | Notes |
|------------------|-------|
| `AcceptsFocus` | Removed. The control now automatically manages focus behavior for accessibility. |

### Bug fixes and improvements

- **Wrap behavior fixed**: The **Wrap** property now correctly controls text wrapping. Previously, changing this property didn't update the text display.
- **Simplified property organization**: Properties are now logically organized into **Data** and **Design** sections for better discoverability.
- **Default padding**: All padding properties now default to **5** pixels for consistent spacing.

## Best practices

- **Clear link text**: Use descriptive text that tells users where the link leads. Avoid generic text like "click here" or "link".
- **Accessible labels**: Always provide descriptive **AccessibleLabel** text for screen readers that explains the link's destination.
- **URL validation**: Only use standard `https://` or `http://` URLs. The control blocks unsafe protocols for security.
- **Visual differentiation**: Use the **Type**, **Color**, or **Underline** properties to make links visually distinct from regular text.
- **Test navigation**: Use Alt+Click in edit mode to test that links navigate to the correct destinations.
- **Mobile tap targets**: Ensure links are large enough to tap easily on mobile devices (minimum 32x32 pixels height).


## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Number Input modern control in canvas apps - Power Apps

Source: [modern-control-number-input.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-number-input)

*Learn about the details, properties, and examples of the Number Input modern control in Power Apps.*

# Number Input modern control in canvas apps

A numeric input field with increment and decrement buttons, validation, and decimal precision control.

## Description

The **Number Input** control is a modern control in Power Apps that lets users enter numeric values with built-in validation, increment/decrement buttons, and configurable precision settings. This control provides a user-friendly interface for numeric data entry while automatically enforcing data integrity through minimum and maximum value constraints.

Use this control when you need to collect numbers from users, such as quantities, prices, percentages, or measurements. The control includes step buttons for easy value adjustment, supports decimal precision control, and provides visual validation feedback to ensure data quality.

Key capabilities:

- Input validation with customizable min/max boundaries
- Increment and decrement buttons with configurable step values
- Decimal precision control from integers to three decimal places
- Built-in accessibility features and screen reader support
- Responsive design that adapts to different screen sizes


Key properties for this control are **Value**, **Min**, **Max**, **Step**, and **Precision**.

## General

**Default** – The initial value displayed when the control first loads. Use this value to set a default numeric value before user interaction.

**Value** – The current numeric value in the control. This value is the output property you reference in formulas to get the user's entered number.

**HintText** – Placeholder text displayed in the input field when it's empty. Use this text to guide users on what value to enter.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnChange** – How the app responds when the user changes the value. This event fires when the user moves focus away from the control (on blur) or clicks the increment or decrement step buttons, not on every keystroke.

**Min** – The minimum allowed value. Users can't enter or step below this number. The control shows a validation error if the user attempts to enter a value below the minimum.

**Max** – The maximum allowed value. Users can't enter or step above this number. The control shows a validation error if the user attempts to enter a value above the maximum.

**Step** – The increment or decrement amount when users click the step up or down buttons. Default is **1**.

**Precision** – The number of decimal places to display and allow. Accepts `DecimalPrecision` enum values:

| Value | Description |
|-------|-------------|
| `DecimalPrecision.Auto` | Automatically determines decimal places based on input (default) |
| `DecimalPrecision.'0'` | No decimal places (integers only) |
| `DecimalPrecision.'1'` | One decimal place (e.g., 12.3) |
| `DecimalPrecision.'2'` | Two decimal places (e.g., 12.34) |
| `DecimalPrecision.'3'` | Three decimal places (e.g., 12.345) |

**ValidationState** – The visual validation state of the control. Accepts `ValidationState` enum values:

| Value | Description |
|-------|-------------|
| `ValidationState.None` | No validation styling (default) |
| `ValidationState.Error` | Shows error styling (red border) |

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the value is shown but can't be edited.

## Size and position

**Align** – The horizontal alignment of text within the control. Accepts `Align` enum values:

| Value | Description |
|-------|-------------|
| `Align.Left` | Aligns text to the left edge (default) |
| `Align.Center` | Centers text horizontally |
| `Align.Right` | Aligns text to the right edge |

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **320**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the text and the top edge of the control.

**PaddingBottom** – Distance between the text and the bottom edge of the control.

**PaddingLeft** – Distance between the text and the left edge of the control.

**PaddingRight** – Distance between the text and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the control. Accepts `Appearance` enum values:

| Value | Description |
|-------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |

**BasePaletteColor** – The base color that the theme uses to generate the control's color palette. Change this property to apply a different theme color to the control.

**Font** – The name of the font family for the text.

**Size** – The font size of the text, in points.

**Color** – The color of the text in the control.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the input field is for. Describe the type of numeric data expected, such as "Product quantity" or "Age in years".

**ContentLanguage** – The language used for the input text. If you don't specify this property, the app settings provide the value.

## Example

The following YAML example shows a product quantity selector with inventory validation and a currency amount input with dynamic formatting:

```yaml
- QuantityInput:
    Control: ModernNumberInput@1.0.0
    Properties:
      Default: =1
      Min: =1
      Max: =100
      Step: =1
      Precision: =DecimalPrecision.'0'
      HintText: ="Enter quantity"
      AccessibleLabel: ="Product quantity"
      X: =40
      Y: =100
      Width: =200
      Height: =32

- PriceInput:
    Control: ModernNumberInput@1.0.0
    Properties:
      Default: =0
      Min: =0
      Max: =10000
      Step: =0.01
      Precision: =DecimalPrecision.'2'
      HintText: ="0.00"
      Align: =Align.Right
      Appearance: =Appearance.FilledDarker
      AccessibleLabel: ="Purchase amount in dollars"
      X: =40
      Y: =150
      Width: =200
      Height: =32

- DiscountInput:
    Control: ModernNumberInput@1.0.0
    Properties:
      Default: =0
      Min: =0
      Max: =100
      Step: =5
      Precision: =DecimalPrecision.'1'
      HintText: ="0.0"
      AccessibleLabel: ="Discount percentage"
      X: =40
      Y: =200
      Width: =200
      Height: =32
```

## Recent updates

The updated version of the **Number input** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Removed properties

| Removed property | Notes |
|------------------|-------|
| `TriggerOutput` | Removed entirely. **OnChange** now fires on focus out and step button clicks. |

### Bug fixes and improvements

- **OnChange optimization**: The **OnChange** event now fires on focus out (when the user leaves the field) and when clicking step buttons, not on every keystroke. This change improves performance and reduces unnecessary formula evaluations.
- **Default value**: The **Default** property allows you to set an initial value when the control loads, separate from the **Value** property.
- **HintText support**: New **HintText** property provides placeholder text to guide users.
- **Color property added**: The **Color** property for text color is now available. This property was missing in the previous version.
- **Fill property added**: The **Fill** property for background color is now available for better styling control.
- **Font property added**: The **Font** property allows you to change the font family.
- **Race condition fixed**: Resolved an issue where entering a new value and immediately submitting a form recorded the previous value instead of the new one.
- **Value overflow fixed**: Numbers no longer overflow or display incorrectly at high values.
- **Min/Max validation improved**: The control now properly validates that Min can't exceed Max.
- **Simplified properties**: Properties are now logically organized into **Data** and **Design** sections for better discoverability.

## Best practices

- **Set reasonable boundaries**: Always define **Min** and **Max** values to prevent invalid data entry.
- **Match precision to data**: Use **Precision** to match your data requirements (integers for quantities, two decimals for currency, and so on).
- **Appropriate step values**: Set **Step** to meaningful increments (for example, 5 for ages, 0.01 for currency, 10 for large numbers).
- **Clear hints**: Use **HintText** to show the expected format or example values (for example, "0.00" for currency).
- **Validate input**: Use **ValidationState** to provide visual feedback when values are out of acceptable ranges.
- **Accessible labels**: Always provide descriptive **AccessibleLabel** text that explains what numeric value is expected.
- **OnChange efficiency**: Since **OnChange** fires on blur and step clicks (not every keystroke), it's safe to use for calculations or data updates without performance concerns.

## Limitations

- The control doesn't directly support currency symbols. Use separate Text controls to display currency formatting.
- Step buttons might not scale proportionally with control size in all scenarios.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Progress Bar Modern Control in Canvas Apps: Properties and Examples

Source: [modern-control-progress-bar.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-progress-bar)

*Discover how to use the Progress bar modern control in Power Apps canvas apps. Learn its properties, styling options, accessibility behavior, and examples.*

# Progress bar modern control in canvas apps

The **Progress bar** modern control shows the progress of an operation in a canvas app.

## Description

Use the **Progress bar** control to show measurable progress, such as completed steps or uploaded records. When progress can't be measured, use the indeterminate state to show that an operation is still running. The control is display-only and doesn't accept user input. Key properties are **Value**, **Max**, and **Indeterminate**.

> [!NOTE]
> This article describes the updated Progress bar modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## General

**Value** – The current progress value. The control displays this value relative to **Max**. Values below zero display as zero, and values above **Max** display as complete. The default is **50**.

**Max** – The value that represents completion. The default is **100**.

**AccessibleLabel** – A label read by screen readers. Describes the operation whose progress is displayed, such as `"Uploading invoices"`.

**Visible** – Whether the control appears or is hidden.

## Behavior

**Indeterminate** – Whether the control shows an animated indeterminate state instead of measurable progress. When this property is `true`, **Value** and **Max** aren't used to determine the displayed progress. The default is `false`.

**DisplayMode** – Whether the control uses the **Edit**, **View**, or **Disabled** visual state. The Progress bar is display-only in every mode and doesn't accept user input.

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. The default is **200**.

**Height** – Distance between the control's top and bottom edges. The default is **8**.

## Style and theme

**ProgressColor** – The semantic color of the progress indicator. Accepts `ProgressColor` enum values:

| Value | Description |
|---|---|
| `ProgressColor.Brand` | Uses the app's brand color. Default. |
| `ProgressColor.Success` | Indicates successful or positive progress. |
| `ProgressColor.Warning` | Indicates a warning state. |
| `ProgressColor.Error` | Indicates an error or critical state. |

**Thickness** – The thickness of the progress indicator. Accepts `ProgressThickness` enum values:

| Value | Description |
|---|---|
| `ProgressThickness.Medium` | Medium thickness. Default. |
| `ProgressThickness.Large` | Large thickness. |

**Shape** – The corner style of the progress indicator. Accepts `ProgressShape` enum values:

| Value | Description |
|---|---|
| `ProgressShape.Rounded` | Rounded ends. Default. |
| `ProgressShape.Square` | Square corners. |

## Additional properties

**Tooltip** – Explanatory text that appears when a user hovers over the control.

**ContentLanguage** – The display language for the control's accessible content, if different from the app language.

## Accessibility

The control exposes progress-bar semantics to assistive technologies. In the determinate state, screen readers receive the current value, minimum value, and maximum value. In the indeterminate state, the current value isn't announced.

Set **AccessibleLabel** to identify the operation whose progress is shown. The control isn't keyboard interactive because it doesn't accept user input.

## Example

The following self-contained YAML example shows 65 percent completion:

```yaml
- CompletionProgress:
    Control: ModernProgressBar@1.0.0
    Properties:
      Value: =65
      Max: =100
      Indeterminate: =false
      ProgressColor: =ProgressColor.Brand
      Thickness: =ProgressThickness.Large
      Shape: =ProgressShape.Rounded
      AccessibleLabel: ="65 percent complete"
      Tooltip: ="Progress: 65 percent"
```

## Limitations

- The control is horizontal only.
- The control doesn't display a label or percentage. Use a separate Text control when visible text is needed.
- The control is display-only and doesn't expose behavior events.

## Recent updates

The updated version of the **Progress bar** modern control includes the following improvements and behavior changes.

### Removed properties

| Removed property | Notes |
|---|---|
| `OnChange` | Not available in the updated control. The Progress bar is display-only and its value is driven by a formula. |

### Bug fixes and improvements

- **Updated enums**: `ProgressColor`, `Thickness`, and `Shape` now use the typed `ProgressColor`, `ProgressThickness`, and `ProgressShape` enums instead of string values, improving IntelliSense and reducing formula errors.
- **Tooltip support**: New `Tooltip` property shows explanatory text on hover.
- **Native implementation**: The control is now a native control based on Fluent UI, with progress-bar semantics for assistive technologies.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Recent updates to modern controls](modern-control-updates.md)
- [Size and location properties](../properties-size-location.md)

---

## Radio modern control in canvas apps - Power Apps

Source: [modern-controls-radio-group.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-radio-group)

*Learn about the details, properties, and examples of the Radio modern control in Power Apps.*

# Radio modern control in canvas apps

A group of mutually exclusive radio button options that users can use to select one item from a list.

## Description

The **Radio** modern control provides a user-friendly way to present mutually exclusive options in your canvas apps. Users can select exactly one option from a group of choices, making it ideal for scenarios like selecting shipping methods, rating satisfaction, or choosing payment types.

This control automatically manages the selection state—when a user selects one option, any previously selected option is automatically deselected. The Radio control supports both vertical and horizontal layouts, customizable styling, and comprehensive accessibility features to ensure your apps work for all users.

Use the **Radio** control when you need users to make a single choice from 2-7 clearly defined options. For larger option sets, consider using a [Combo Box](modern-control-combobox.md) control instead.

Key properties for this control are **Items**, **ItemDisplayText**, **Default**, and **Selected**.

## General

**Items** – The data source that provides the list of options to display. Can be a table, collection, or list of values. Each item becomes a selectable radio button option.

**ItemDisplayText** – The formula that determines what text displays for each radio button option. Use `ThisItem` to reference the current item from **Items**. For example, `ThisItem.Title` or `ThisItem.OptionName`.

**Default** – The item that the control selects by default when it first loads. Must match an item from the **Items** source.

**Selected** – The currently selected item (output property). Use this in formulas to reference which option the user chooses.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnChange** – How the app responds when the user selects a different radio button option. This event fires immediately every time the selection changes.

**Layout** – The arrangement of radio button options. Accepts `Layout` enum values:

| Value | Description |
|-------|-------------|
| `Layout.Vertical` | Stacks options vertically (default) |
| `Layout.Horizontal` | Arranges options horizontally in a row |

**Required** – Whether the user must select an option before submitting a form. When `true`, the control shows validation styling if no selection exists.

**TriggerOutput** – Forces the control to output its current selected value. Use this value when you need to manually trigger value updates.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the selected option appears with a read-only appearance (not grayed out like **Disabled**).

## Size and position

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges.

**Height** – Distance between the control's top and bottom edges. The control automatically sizes to fit all radio button options.

**PaddingTop** – Distance between the options and the top edge of the control.

**PaddingBottom** – Distance between the options and the bottom edge of the control.

**PaddingLeft** – Distance between the options and the left edge of the control.

**PaddingRight** – Distance between the options and the right edge of the control.

**LineHeight** – The spacing between radio button options, measured in pixels or points.

## Style and theme

**BasePaletteColor** – The base color that the theme uses to generate the control's color palette. Change this property to apply a different theme color to the control.

**Font** – The name of the font family in which option text appears.

**Size** – The font size of the option text, in points.

**Color** – The color of the option text in the control.

**FontWeight** – The weight (thickness) of the option text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the option text appears in italic style.

**Underline** – Whether a line appears under the option text.

**Strikethrough** – Whether a line appears through the middle of the option text.

**Fill** – The background fill color of the control.

**HoverColor** – The color of an option's text when the user hovers the mouse over it.

**PressedColor** – The color of an option's text when the user clicks it.

**DisabledColor** – The color of option text when the control is in **Disabled** mode.

**RadioSize** – The size of the radio button circles in pixels.

**RadioBackgroundFill** – The background fill color of the radio button circles.

**RadioBorderColor** – The border color of the radio button circles.

**RadioSelectionFill** – The fill color of the inner circle when a radio button is selected.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the radio group represents. It should describe the category or question being answered (for example, "Shipping method" or "Payment type").

**ContentLanguage** – The language used for the option text. Inherits from app settings if not specified.

## Example

The following YAML example shows radio button controls with different option sets:

```yaml
- ShippingRadio:
    Control: ModernRadio@1.0.0
    Properties:
      Items: =["Standard (5-7 days)", "Express (2-3 days)", "Overnight"]
      Layout: =Layout.Vertical
      AccessibleLabel: ="Select shipping method"
      X: =40
      Y: =100
      Width: =300

- SatisfactionRadio:
    Control: ModernRadio@1.0.0
    Properties:
      Items: =["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"]
      Required: =true
      Layout: =Layout.Vertical
      AccessibleLabel: ="Service satisfaction rating"
      X: =40
      Y: =200
      Width: =250

- PaymentRadio:
    Control: ModernRadio@1.0.0
    Properties:
      Items: =["Credit Card", "Debit Card", "PayPal", "Bank Transfer"]
      Layout: =Layout.Vertical
      AccessibleLabel: ="Select payment method"
      X: =40
      Y: =350
      Width: =320
```

## Recent updates

The updated version of the **Radio** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.


| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Bug fixes and improvements

- **Item order preserved**: The control now respects the order of items in the **Items** property and displays them in the same sequence. Previously, the control sometimes reordered items unexpectedly.
- **View mode appearance**: When you set **DisplayMode** to **View**, the control displays a proper read-only appearance instead of appearing disabled or grayed out.
- **OnChange reliability**: The **OnChange** event now fires immediately and reliably on every selection change.
- **Gallery selection fixed**: Radio buttons inside galleries now respond correctly to single clicks. Previously, a double-click was sometimes required.
- **Scrolling support**: Long lists of radio options now scroll properly instead of being cut off.
- **Theme color respected**: The **BasePaletteColor** property is now properly respected and no longer overridden by default colors.
- **Default value matching**: The **Default** property now correctly matches items from the **Items** data source without unexpected errors.
- **Hover and pressed states**: New **HoverColor** and **PressedColor** properties provide visual feedback for user interactions.
- **Radio styling control**: New properties (**RadioSize**, **RadioBackgroundFill**, **RadioBorderColor**, **RadioSelectionFill**) give you fine-grained control over radio button appearance.
- **Disabled state color**: New **DisabledColor** property controls text color when the control is disabled.

## Best practices

- **Clear option text**: Use **ItemDisplayText** to provide clear, descriptive labels for each option. Avoid abbreviations or jargon.
- **Reasonable option count**: Radio buttons work best with 2-7 options. For more options, consider using a Combo Box control instead.
- **Default selection**: Always set a **Default** value to guide users toward the most common or recommended choice.
- **Accessible labels**: Provide descriptive **AccessibleLabel** text that explains what the user is choosing between (for example, "Select your preferred contact method").
- **Visual feedback**: Use **HoverColor** and **PressedColor** to provide clear visual feedback for user interactions.
- **Layout consideration**: Use **Layout.Vertical** for most cases. Only use **Layout.Horizontal** when you have short option labels and limited options (2-4).


## Limitations

- The control height automatically adjusts to fit all options and you can't manually constrain it to a specific height with scrolling (items scroll if needed).
- Very small or very large width and height values might not be fully respected by the control.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Rating modern control in canvas apps - Power Apps

Source: [modern-control-rating.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-rating)

*Learn about the details, properties, and examples of the Rating modern control in Power Apps.*

# Rating modern control in canvas apps

Allow users to provide a star-based rating by selecting icons.

## Description

The **Rating** modern control lets users provide a rating by selecting from a row of icons (stars by default). It supports full and half-step precision, customizable icon shapes, and color theming. Use it for feedback forms, product reviews, satisfaction surveys, or any scenario where users need to express a value on a scale.

Key properties for this control are **Default**, **Max**, **Step**, and **Color**.

## General

**Default** – The initial rating value before the user makes a selection. Resets to this value when `Reset` is triggered. Default is **3**.

**Max** – The maximum number of icons (stars) displayed. Must be a whole number greater than 1. Default is **5**.

**Step** – Whether users can select half-step increments or only whole values. Accepts `RatingStep` enum values:

| Value | Description |
|-------|-------------|
| `RatingStep.Full` | Users can only select whole values. Default. |
| `RatingStep.Half` | Users can select half-step increments (for example, 3.5). |

**AccessibleLabel** – Label read by screen readers. Provide a meaningful description such as `"Rate your experience"`.

## Behavior

**OnChange** – Actions to perform when the user changes the rating value. Use `Self.Value` to read the new value.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**Visible** – Whether the control appears or is hidden.

## Output properties

**Value** – The current rating value selected by the user. Read-only.

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **200**.

**Height** – Distance between the control's top and bottom edges. Default is **40**.

## Style and theme

**Color** – The fill color of the selected (filled) rating icons. Accepts any color value — `RGBA(r, g, b, a)`, named colors like `Color.Gold`, or formula-driven values. Defaults to the app's brand/theme color.

**Icon** – The icon shape used for rating items. Accepts icon names as a string (for example, `"Star"`, `"Heart"`). The control uses the selected icon for filled items and a dimmed variant for unfilled items. Default is **Star**.

## Additional properties

**Tooltip** – Explanatory text that appears when the user hovers over the control.

## Example

The following YAML example shows a 5-star rating control with gold color and an OnChange action:

```yaml
- FeedbackRating:
    Control: ModernRating@1.0.0
    Properties:
      Default: =3
      Max: =5
      Step: =RatingStep.Full
      Icon: ="Star"
      Color: =RGBA(255, 185, 0, 1)
      AccessibleLabel: ="Rate your experience"
      Tooltip: ="Select 1 to 5 stars"
      OnChange: =Set(varRatingValue, Self.Value)

- RatingLabel:
    Control: ModernText@1.0.0
    Properties:
      Text: =If(varRatingValue >= 4, "Thanks for the great rating!", "We appreciate your feedback.")
      Size: =14
```

### Half-star rating with heart icons

```yaml
- HeartRating:
    Control: ModernRating@1.0.0
    Properties:
      Default: =2.5
      Max: =5
      Step: =RatingStep.Half
      Icon: ="Heart"
      Color: =RGBA(220, 38, 38, 1)
      AccessibleLabel: ="Rate this item"
```

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Classic Rating control](../control-rating.md)
- [Size and location properties](../properties-size-location.md)

---

## Slider modern control in canvas apps - Power Apps

Source: [modern-control-slider.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-slider)

*Learn about the details, properties, and examples of the Slider modern control in Power Apps.*

# Slider modern control in canvas apps

Let users select a numeric value by dragging a handle along a track.

## Description

The **Slider** modern control lets users set a value between a minimum and maximum by dragging a handle along a track. The control supports horizontal and vertical orientation.

Use this control when you want users to pick a value from a continuous range, such as:

- Volume or brightness controls
- Budget or price range selectors
- Quantity pickers
- Rating or satisfaction scales

Key properties for this control are **Default**, **Min**, **Max**, **Value** (output), and **OnChange**.

> [!NOTE]
> This article describes the updated Slider modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## General

**Default** – The initial value of the slider before the user makes a change. Resets to this value when `Reset` is triggered. Default is **50**.

**Min** – The minimum value the user can set. Default is **0**.

**Max** – The maximum value the user can set. Default is **100**.

**Visible** – Whether the control appears or is hidden.

## Behavior

**OnChange** – Actions to perform when the user changes the slider value. Use `Self.Value` to read the current value.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

**LayoutDirection** – The orientation of the slider track. Accepts `LayoutDirection` enum values:

| Value | Description |
|-------|-------------|
| `LayoutDirection.Horizontal` | Handle moves left to right. Default. |
| `LayoutDirection.Vertical` | Handle moves bottom to top. |

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **200**.

**Height** – Distance between the control's top and bottom edges. Default is **35**.

## Style and theme

**BasePaletteColor** – The base color that the theme uses to generate the control's color palette. Change this value to apply a different theme color to the slider track and handle.

**Size** – The visual size of the slider handle and track. Accepts `SliderSize` enum values:

| Value | Description |
|-------|-------------|
| `SliderSize.Small` | Smaller handle and track. |
| `SliderSize.Medium` | Standard size. Default. |
| `SliderSize.Large` | Larger handle and track. |

## Accessibility

**AccessibleLabel** – Label that screen readers read. Describe the purpose of the slider (for example, `"Volume"`). Always set this property so assistive technologies can identify the control.

**ContentLanguage** – The display language for the control content, if different from the app language.

**Tooltip** – Explanatory text that appears when the user hovers over the control. Helpful for sighted users who need additional context about the slider's purpose.

## Output properties

**Value** – The current value of the slider, updated as the user drags the handle. Use this value in formulas to read the slider's current position (for example, `Slider1.Value`).

## Examples

### Budget selector with a label

This example shows a horizontal slider that lets users set a monthly budget. A label updates in real time as the user drags the handle.

```yaml
- BudgetSlider:
    Control: ModernSlider@1.0.0
    Properties:
      Default: =500
      Min: =0
      Max: =10000
      LayoutDirection: =LayoutDirection.Horizontal
      Size: =SliderSize.Medium
      AccessibleLabel: ="Monthly budget"
      Tooltip: ="Drag to set your monthly budget"
      Width: =300
      Height: =35

- BudgetLabel:
    Control: ModernText@1.0.0
    Properties:
      Size: =14
      Text: |-
        ="Budget: $" & BudgetSlider.Value
```

### Vertical volume slider

This example uses a vertical slider for a volume control and writes the selected value to a variable.

```yaml
- VolumeSlider:
    Control: ModernSlider@1.0.0
    Properties:
      Default: =30
      Min: =0
      Max: =100
      LayoutDirection: =LayoutDirection.Vertical
      Size: =SliderSize.Small
      AccessibleLabel: ="Volume"
      Width: =35
      Height: =200
```

## Recent updates

The updated version of the **Slider** modern control includes the following improvements and behavior changes.

### Property renames

| Previous property | New property | Notes |
|---|---|---|
| `Value` (input) | `Default` | The input property that sets the initial value is now `Default`. `Value` is now a read-only output property. |
| `Layout` | `LayoutDirection` | Renamed for clarity and changed from string to typed enum. |

### Enum format changes

| Property | Previous value | New value |
|---|---|---|
| `LayoutDirection` | `"Horizontal"` | `LayoutDirection.Horizontal` |
| `LayoutDirection` | `"Vertical"` | `LayoutDirection.Vertical` |
| `Size` | `"Small"` | `SliderSize.Small` |
| `Size` | `"Medium"` | `SliderSize.Medium` |
| `Size` | `"Large"` | `SliderSize.Large` |

### Bug fixes and improvements

- **Separate Default and Value**: `Default` sets the initial value; `Value` is now a dedicated read-only output property. This change matches the pattern used by Number Input and other modern controls, making formulas more predictable.
- **Tooltip support**: New `Tooltip` property shows explanatory text on hover.
- **Updated enums**: `LayoutDirection` and `Size` now use typed Power Fx enums, improving IntelliSense and reducing formula errors.

## Best practices

- **Set meaningful Min and Max values.** A slider from 0 to 100 works well for percentages, but for dollar amounts or quantities, use a range that matches the expected input so each drag movement feels responsive.
- **Always provide an AccessibleLabel.** Screen readers rely on this property to describe the slider's purpose to users with visual impairments.
- **Pair the slider with a label** that displays the current value (for example, `"Budget: $" & Slider1.Value`). Users can see the exact number without guessing from the handle position.
- **Use vertical orientation sparingly.** Horizontal sliders are more familiar to most users. Reserve vertical sliders for cases where the metaphor matches, such as volume faders.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Spinner Modern Control in Canvas Apps: Properties and Examples

Source: [modern-control-spinner.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-spinner)

*Discover how to use the Spinner modern control in Power Apps canvas apps. Learn key properties, sizes, styling options, and examples to show loading and in-progress states.*

# Spinner modern control in canvas apps

Displays state in motion, such as loading a page or table.

## Description

Use the **Spinner** modern control to display loading scenarios where an action is in progress. The control communicates an indeterminate wait, and you show or hide it based on the loading state of your app. Key properties for this control are **Label**, **Appearance**, and **LabelPosition**.

The Spinner is a display-only control. For progress that you can measure as a percentage, use the [Progress Bar modern control](modern-control-progress-bar.md).

> [!NOTE]
> This article describes the updated Spinner modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## General

**Label** – The label next to the spinner, such as `"Loading records..."`. The label slot receives the styling related to the text associated with the spinner.

**AccessibleLabel** – Label read by screen readers. When not set, the control uses the **Label** value. Describe the operation in progress, for example `"Loading customer records"`.

**Visible** – Whether the control appears or is hidden. Set this property to a Boolean value that represents the loading state.

## Behavior

**OnChange** – Actions to perform when a property of the spinner changes.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). The spinner doesn't accept user input, so this property primarily affects the visual appearance.

## Size and position

**LabelPosition** – Position of the label relative to the spinner. Accepts `SpinnerLabelPosition` enum values: `SpinnerLabelPosition.Before`, `SpinnerLabelPosition.After` (default), `SpinnerLabelPosition.Above`, or `SpinnerLabelPosition.Below`.

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges.

**Height** – Distance between the control's top and bottom edges.

## Style and theme

**Appearance** – The appearance of the spinner. Set to **Primary** (default) for the app's brand colors, or **Inverted** for use on dark backgrounds.

**BasePaletteColor** – The color palette applied to a control. This property impacts all surfaces of the control that render a theme color.

**Font** – The name of the family of fonts in which the label appears.

**Size** – The font size of the label text, as a number. If the value is null or zero, the selected Fluent theme drives the font size.

**Color** – The color of the label text.

**FontWeight** – The weight of the label text. Accepts `FontWeight` enum values: `FontWeight.Bold`, `FontWeight.Semibold`, `FontWeight.Normal` (default), or `FontWeight.Lighter`.

**Italic** – Whether the label text appears in italic style.

**Underline** – Whether a line appears under the label text.

**Strikethrough** – Whether a line appears through the label text.

## Additional properties

**Tooltip** – Explanatory text that appears when the user hovers over the control.

**ContentLanguage** – The display language for the control content, if different from the app language.

## Example

The following YAML example shows a loading spinner with its label positioned below:

```yaml
- LoadingSpinner:
    Control: ModernSpinner@1.1.0
    Properties:
      Label: ="Loading customer records..."
      AccessibleLabel: ="Loading customer records"
      Size: =14
      LabelPosition: =SpinnerLabelPosition.Below
      Width: =400
```

Typically, you bind the spinner's `Visible` property to a loading variable that you set before and after a data operation, so the spinner shows only while work is in progress:

```powerfx
Set(varIsLoading, true);
ClearCollect(colCustomers, Customers);
Set(varIsLoading, false)
```

## Recent updates

The updated version of the **Spinner** modern control includes the following improvements and behavior changes.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|---|---|
| `FontSize` | `Size` |
| `FontColor` | `Color` |
| `FontItalic` | `Italic` |
| `FontUnderline` | `Underline` |
| `FontStrikethrough` | `Strikethrough` |

### Bug fixes and improvements

- **Updated enums**: `LabelPosition` now uses the typed `SpinnerLabelPosition` enum instead of string values, improving IntelliSense and reducing formula errors. `FontWeight` uses the `FontWeight` enum, and `Appearance` accepts the **Primary** and **Inverted** values.
- **Tooltip support**: New `Tooltip` property shows explanatory text on hover.
- **Consistent font properties**: Label font properties are now consistent with other modern controls. Use `Font`, `Size`, `Color`, `Italic`, `Underline`, and `Strikethrough`.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Recent updates to modern controls](modern-control-updates.md)
- [Progress Bar modern control](modern-control-progress-bar.md)
- [Size and location properties](../properties-size-location.md)

---

## Tab List modern control in canvas apps - Power Apps

Source: [modern-control-tabs-or-tabs-list.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-tabs-or-tabs-list)

*Learn about the details, properties, and examples of the Tab List modern control in Power Apps.*

# Tab List modern control in canvas apps

A tabbed navigation control that users can use to switch between different content sections by clicking tab headers.

## Description

The **Tab List**  modern control enables you to create intuitive tabbed navigation interfaces in canvas apps. Users can switch between different content sections by selecting tab headers, making it ideal for organizing related information or features within a single screen.

This control serves as a navigation component that you combine with other controls to build comprehensive tabbed experiences. When users select a tab, you can use conditional visibility to show or hide content sections accordingly. The **Tab List** control offers flexible styling options and accessibility features to ensure your tabbed interfaces work effectively for all users.

Key capabilities:

- Display multiple clickable tab headers from a data source
- Support various visual styles including transparent, subtle, underline, and filled appearances
- Provide keyboard navigation and screen reader support
- Enable responsive alignment and sizing options
- Trigger events when users interact with tabs

Use the **Tab List** control when you need to organize content into logical sections that users can navigate independently, such as product details, dashboard views, or settings categories.


Key properties for this control are **Items**, **Default**, **Selected**, and **Appearance**.

## General

**Items** – The data source that provides the list of tabs to display. Can be a table, collection, or list of values. Each item becomes a clickable tab header.

**Default** – The tab that is selected by default when the control first loads. Must match an item from the **Items** source.

**Selected** – The currently selected tab (output property). Use this in formulas to reference which tab the user chooses and to control visibility of content sections.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnChange** – How the app responds when the user clicks a different tab. This event fires every time the selected tab changes. Use this value to update variables, load data, or track navigation.

**OnSelect** – How the app responds when the user clicks any tab (including the currently selected one). Use this value for additional interactions beyond navigation.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, tabs are displayed but can't be clicked.

## Size and position

**Align** – The horizontal alignment of tab text within each tab button. Accepts `Align` enum values:

| Value | Description |
|-------|-------------|
| `Align.Left` | Aligns text to the left edge |
| `Align.Center` | Centers text horizontally (default) |
| `Align.Right` | Aligns text to the right edge |

**Alignment** – The alignment and positioning of the entire tab list. Accepts `TabListAlignment` enum values:

| Value | Description |
|-------|-------------|
| `TabListAlignment.Start` | Aligns tabs to the left or start edge |
| `TabListAlignment.Center` | Centers the tab list (default) |
| `TabListAlignment.End` | Aligns tabs to the right or end edge |

**X** – Distance between the left edge of the control and the left edge of its parent container. If the control has no parent container, the screen acts as the parent container.

**Y** – Distance between the top edge of the control and the top edge of its parent container. If the control has no parent container, the screen acts as the parent container.

**Width** – Distance between the control's left and right edges. Default is **300**.

**Height** – Distance between the control's top and bottom edges. Default is **60**.

**PaddingTop** – Distance between the tab text and the top edge of each tab button.

**PaddingBottom** – Distance between the tab text and the bottom edge of each tab button.

**PaddingLeft** – Distance between the tab text and the left edge of each tab button.

**PaddingRight** – Distance between the tab text and the right edge of each tab button.

## Style and theme

**Appearance** – The visual style of the tabs. Accepts `TabListAppearance` enum values:

| Value | Description |
|-------|-------------|
| `TabListAppearance.Transparent` | Transparent background with text only |
| `TabListAppearance.Subtle` | Subtle background with minimal styling |
| `TabListAppearance.Underline` | Tabs with underline indicator for selection |
| `TabListAppearance.Filled` | Filled tab buttons with solid backgrounds |

**Font** – The name of the font family for the tab text.

**Size** – The font size of the tab text, in points.

**Color** – The color of the tab text in the control.

**FontWeight** – The weight (thickness) of the tab text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the tab text appears in italic style.

**Underline** – Whether a line appears under the tab text.

**Strikethrough** – Whether a line appears through the middle of the tab text.

**BorderColor** – The color of the borders around tabs (when applicable based on Appearance).

**BorderStyle** – The style of the tab borders. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the tab borders in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of tab buttons.

**RadiusTopRight** – The corner radius for the top-right corner of tab buttons.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of tab buttons.

**RadiusBottomRight** – The corner radius for the bottom-right corner of tab buttons.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the tab list represents. It should describe the category or sections being navigated (for example, "Product information sections" or "Report views").

**ContentLanguage** – The language used for the tab text. If you don't specify this property, the app settings provide the value.

## Example

The following YAML example shows tab list controls with different appearance styles:

```yaml
- ProductTabs:
    Control: ModernTabList@1.0.0
    Properties:
      Items: =["Overview", "Specifications", "Reviews", "Support"]
      Default: ="Overview"
      Appearance: =TabListAppearance.Underline
      Alignment: =TabListAlignment.Center
      Size: =16
      FontWeight: =FontWeight.Semibold
      AccessibleLabel: ="Product information tabs"
      X: =40
      Y: =100
      Width: =600
      Height: =60

- DashboardTabs:
    Control: ModernTabList@1.0.0
    Properties:
      Items: =["Sales", "Inventory", "Reports"]
      Default: ="Sales"
      Appearance: =TabListAppearance.Filled
      Alignment: =TabListAlignment.Start
      Size: =15
      AccessibleLabel: ="Dashboard section tabs"
      X: =40
      Y: =180
      Width: =600
      Height: =60

- SettingsTabs:
    Control: ModernTabList@1.0.0
    Properties:
      Items: =["Account", "Privacy", "Notifications", "Billing"]
      Default: ="Account"
      Appearance: =TabListAppearance.Subtle
      Alignment: =TabListAlignment.Start
      Size: =14
      Align: =Align.Left
      AccessibleLabel: ="Settings categories"
      X: =40
      Y: =260
      Width: =250
      Height: =60
```

## Recent updates

The updated version of the **Tab list** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Bug fixes and improvements

- **Appearance property**: The new **Appearance** property with four visual styles (**Transparent**, **Subtle**, **Underline**, **Filled**) gives you more design flexibility for tabbed interfaces.
- **Item order preserved**: Tabs now display in the exact order specified in the **Items** property. Previously, the control sometimes reordered tabs unexpectedly.
- **Items refresh fixed**: Updating the **Items** property now automatically refreshes the tab list. Previously, changes to **Items** didn't always trigger a visual update.
- **Default property**: The new **Default** property allows you to specify which tab is selected when the control loads.
- **Alignment control**: The new **Alignment** property controls the positioning of the entire tab list (start, center, end).
- **Improved tab sizing**: Tab buttons now size more consistently and responsively.

## Best practices

- **Clear tab labels**: Use short, descriptive labels for tabs (one or two words). Avoid long phrases that make tabs too wide.
- **Reasonable tab count**: Use two to seven tabs for optimal usability. For more sections, consider alternative navigation patterns like a tree view or menu.
- **Default selection**: Always set a **Default** value to ensure a tab is selected when the control loads.
- **Conditional visibility**: Use the **Selected** output property to control visibility of content sections.
  ```
  ContentSection.Visible = TabList1.Selected.Value = "Overview"
  ```
- **Accessible labels**: Provide descriptive **AccessibleLabel** text that explains what the tabs navigate between.
- **Consistent appearance**: Use the same **Appearance** style for all tab lists in your app for visual consistency.
- **OnChange for data loading**: Use **OnChange** to load data or update variables when tabs change, improving performance by loading only what's needed.

## Limitations

- The Tab List control provides navigation only - you must manually control content visibility using the **Selected** property.
- Very small or very large width and height values might not be fully respected by the control.
- Tab buttons don't automatically scroll horizontally if there are too many tabs to fit the width.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Text modern control in canvas apps - Power Apps

Source: [modern-control-text.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-text)

*Learn about the details, properties, and examples of the Text modern control in Power Apps.*

# Text modern control in canvas apps

Use this control to display text and labels on your app screen.

## Description

The **Text** modern control displays static or dynamic text content in your canvas app. Use it for labels, headings, messages, and any text that doesn't require user input.

This versatile control offers rich formatting options, including font styling, colors, alignment, and automatic sizing. You can display static text strings or dynamic content using Power Fx formulas. The control also supports user interaction through the **OnSelect** event, making it useful for clickable labels and interactive text elements.


Key properties for this control are **Text**, **Size**, and **Color**.

## General

**Text** – The text string to display on the canvas. Supports any text or Power Fx formula that evaluates to a string.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnSelect** – How the app responds when the user selects  the Text control. The control is accessible: **OnSelect** also triggers when the user presses Enter or Space while the control has keyboard focus.

**Wrap** – Whether the text wraps to the next line when it exceeds the control width. When set to `false`, text is clipped at the control boundary.

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges.

**Height** – Distance between the control's top and bottom edges.

**AutoHeight** – Whether the control automatically increases its height when the text content exceeds the visible area. When **Visible** is `false`, the **Height** output property doesn't update as text changes.

**Align** – The horizontal alignment of text within the control. Accepts `Align` enum values:

| Value | Description |
|-------|-------------|
| `Align.Left` | Aligns text to the left edge |
| `Align.Center` | Centers text horizontally |
| `Align.Right` | Aligns text to the right edge |
| `Align.Justify` | Stretches text to fill the full width |

**VerticalAlign** – The vertical alignment of text within the control. Accepts `VerticalAlign` enum values:

| Value | Description |
|-------|-------------|
| `VerticalAlign.Top` | Aligns text to the top |
| `VerticalAlign.Middle` | Centers text vertically (default) |
| `VerticalAlign.Bottom` | Aligns text to the bottom |

## Style and theme

**Font** – The name of the font family for the text.

**Size** – The font size of the text, in points. The default is **15**.

**Color** – The color of the text in the control.

**FontWeight** – The weight (thickness) of the text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text appears in italic style.

**Underline** – Whether a line appears under the text.

**Strikethrough** – Whether a line appears through the middle of the text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**PaddingTop** – Distance between the text and the top edge of the control.

**PaddingBottom** – Distance between the text and the bottom edge of the control.

**PaddingLeft** – Distance between the text and the left edge of the control.

**PaddingRight** – Distance between the text and the right edge of the control.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Example

The following YAML example shows a clickable label with styling that you can use for headings or interactive text elements:

```yaml
- TitleLabel:
    Control: ModernText@1.0.0
    Properties:
      Text: ="Welcome to Power Apps"
      X: =40
      Y: =40
      Width: =300
      Height: =50
      Size: =24
      FontWeight: =FontWeight.Bold
      Color: =RGBA(0, 120, 212, 1)
      Align: =Align.Center
      VerticalAlign: =VerticalAlign.Middle

- StatusLabel:
    Control: ModernText@1.0.0
    Properties:
      Text: '="Status: Active"'
      X: =40
      Y: =120
      Width: =200
      Height: =40
      Size: =16
      FontWeight: =FontWeight.Semibold
      Color: =Color.Green
      Fill: =RGBA(0, 255, 0, 0.1)
      BorderColor: =Color.Green
      BorderThickness: =2
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      OnSelect: =Set(varLabelClicked, true)
```

## Recent updates

The updated version of the **Text** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.


| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `Weight` | `FontWeight` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Removed properties

| Removed property | Notes |
|------------------|-------|
| `DisplayMode` | Removed from the property panel. The property still exists for backward compatibility but has no effect. The Text control is display-only; use the **OnSelect** event for interactive behavior. |

### Bug fixes and improvements

- **OnSelect event**: The control now supports an **OnSelect** event, making it possible to trigger actions when a user clicks or taps the text. This event is fully accessible and also responds to keyboard input (Enter or Space).
- **Vertical alignment default**: The default **VerticalAlign** is now `VerticalAlign.Middle` for better visual balance.
- **Auto height improvements**: Fixed scroll bar appearing in portrait mode and auto height not recalculating when the control is hidden.
- **Text scaling**: Fixed an issue where the text control didn't scale correctly within containers.
- **Updated command bar**: The authoring command bar and right-click menu now show Font, Font size, Alignment, Font color, and Background color for quick access.
- **Mobile-optimized defaults**: When adding the control in a mobile layout, the app automatically adjusts the defaults (font size 15, padding 5, width 150, height 32).
- **Inline text editing**: Double-click the Text control on the canvas to edit its text directly inline, without navigating to the formula bar or properties panel.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Text Input modern control in canvas apps - Power Apps

Source: [modern-control-text-input.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-text-input)

*Learn about the details, properties, and examples of the Text Input modern control in Power Apps.*

# Text Input modern control in canvas apps

A text input field for capturing single-line or multi-line text, with support for password masking and search modes.

## Description

Use the **Text Input** control to capture text input from users with flexible formatting options. The control supports single-line text, multi-line text areas, password fields with masking, and search input with appropriate styling. Key properties for this control are **Text**, **Placeholder**, **Type**, and **TriggerOutput**.

## General

**Default** – The initial text displayed when the control first loads. Use this to set a default value before user interaction.

**Text** – The current text value in the control (output property). This is what you reference in formulas to get the user's entered text.

**Placeholder** – Hint text displayed in the input field when it's empty. Use this to guide users on what to enter. Default is **"Enter text"**.

**Visible** – Whether the control appears or is hidden. Use a Power Fx formula to show or hide the control based on app state.

## Behavior

**OnChange** – How the app responds when the user changes the text. This event fires when the user moves focus away from the control (on blur), not on every keystroke. This improves performance and prevents issues with rapid formula execution.

**OnSelect** – How the app responds when the user clicks or taps inside the control.

**Type** – The input mode for the text field. Accepts `TextInputType` enum values:

| Value | Description |
|-------|-------------|
| `TextInputType.SingleLine` | Standard single-line text input (default) |
| `TextInputType.Multiline` | Multi-line text area that allows line breaks |
| `TextInputType.Password` | Password field that masks characters as *** |
| `TextInputType.Search` | Search input with appropriate styling |

**TriggerOutput** – Controls when the **Text** output property updates. Accepts `TriggerOutput` enum values:

| Value | Description |
|-------|-------------|
| `TriggerOutput.Keypress` | Updates on every keystroke (default) |
| `TriggerOutput.FocusOut` | Updates only when focus leaves the control |
| `TriggerOutput.Delayed` | Updates after a short delay (used in forms) |

> [!NOTE]
> When added to a form, **TriggerOutput** automatically defaults to **Delayed** for better form performance.

**MaxLength** – The maximum number of characters allowed in the input field. Users cannot type beyond this limit.

**Required** – Whether the user must enter text before submitting a form. When `true`, the control shows validation styling if left empty.

**ValidationState** – The visual validation state of the control. Accepts `ValidationState` enum values:

| Value | Description |
|-------|-------------|
| `ValidationState.None` | No validation styling (default) |
| `ValidationState.Error` | Shows error styling (red border) |

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**). In **View** mode, the text is shown but cannot be edited (truly read-only).

## Size and position

**Align** – The horizontal alignment of text within the control. Accepts `Align` enum values:

| Value | Description |
|-------|-------------|
| `Align.Left` | Aligns text to the left edge (default) |
| `Align.Center` | Centers text horizontally |
| `Align.Right` | Aligns text to the right edge |

**X** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**Y** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **320**.

**Height** – Distance between the control's top and bottom edges. Default is **32**.

**PaddingTop** – Distance between the text and the top edge of the control.

**PaddingBottom** – Distance between the text and the bottom edge of the control.

**PaddingLeft** – Distance between the text and the left edge of the control.

**PaddingRight** – Distance between the text and the right edge of the control.

## Style and theme

**Appearance** – The visual style of the control. Accepts `Appearance` enum values:

| Value | Description |
|-------|-------------|
| `Appearance.FilledDarker` | Filled with darker background (default) |
| `Appearance.FilledLighter` | Filled background style |
| `Appearance.Outline` | Outlined border with transparent background |

**BasePaletteColor** – The base color used by the theme to generate the control's color palette. Changes this property to apply a different theme color to the control.

**Font** – The name of the font family in which text appears.

**Size** – The font size of the text, in points.

**Color** – The color of the text in the control.

**FontWeight** – The weight (thickness) of the text. Accepts `FontWeight` enum values:

| Value | Description |
|-------|-------------|
| `FontWeight.Bold` | Bold text |
| `FontWeight.Semibold` | Semibold text |
| `FontWeight.Normal` | Normal weight (default) |
| `FontWeight.Lighter` | Lighter weight |

**Italic** – Whether the text appears in italic style.

**Underline** – Whether a line appears under the text.

**Strikethrough** – Whether a line appears through the middle of the text.

**Fill** – The background fill color of the control.

**BorderColor** – The color of the control's border.

**BorderStyle** – The style of the control's border. Accepts `BorderStyle` enum values: `BorderStyle.Solid`, `BorderStyle.Dashed`, `BorderStyle.Dotted`, or `BorderStyle.None`.

**BorderThickness** – The thickness of the control's border in pixels.

**RadiusTopLeft** – The corner radius for the top-left corner of the control.

**RadiusTopRight** – The corner radius for the top-right corner of the control.

**RadiusBottomLeft** – The corner radius for the bottom-left corner of the control.

**RadiusBottomRight** – The corner radius for the bottom-right corner of the control.

## Accessibility

**AccessibleLabel** – A label for screen readers to announce what the input field is for. Should describe the type of text expected (e.g., "Customer name" or "Feedback comments").

**ContentLanguage** – The language used for the input text. Inherits from app settings if not specified.

## Example

The following YAML example shows text input controls with various input types:

```yaml
- NameInput:
    Control: ModernTextInput@1.0.0
    Properties:
      Placeholder: ="Enter your full name"
      Type: =TextInputType.SingleLine
      TriggerOutput: =TriggerOutput.Keypress
      Required: =true
      Appearance: =Appearance.FilledDarker
      AccessibleLabel: ="Full name, required field"
      X: =40
      Y: =100
      Width: =300
      Height: =32

- EmailInput:
    Control: ModernTextInput@1.0.0
    Properties:
      Placeholder: ="you@company.com"
      Type: =TextInputType.SingleLine
      TriggerOutput: =TriggerOutput.Keypress
      MaxLength: =100
      Required: =true
      AccessibleLabel: ="Email address, required field"
      X: =40
      Y: =150
      Width: =300
      Height: =32

- PasswordInput:
    Control: ModernTextInput@1.0.0
    Properties:
      Placeholder: ="At least 8 characters"
      Type: =TextInputType.Password
      TriggerOutput: =TriggerOutput.Keypress
      MaxLength: =50
      Required: =true
      AccessibleLabel: ="Password, must be at least 8 characters"
      X: =40
      Y: =200
      Width: =300
      Height: =32

- CommentsInput:
    Control: ModernTextInput@1.0.0
    Properties:
      Default: =""
      Placeholder: ="Tell us more about your inquiry..."
      Type: =TextInputType.Multiline
      TriggerOutput: =TriggerOutput.FocusOut
      MaxLength: =500
      Align: =Align.Left
      AccessibleLabel: ="Additional comments, optional, maximum 500 characters"
      X: =40
      Y: =250
      Width: =300
      Height: =120

- SearchInput:
    Control: ModernTextInput@1.0.0
    Properties:
      Placeholder: ="Search..."
      Type: =TextInputType.Search
      TriggerOutput: =TriggerOutput.Delayed
      Appearance: =Appearance.Outline
      AccessibleLabel: ="Search by name or description"
      X: =40
      Y: =390
      Width: =300
      Height: =32
```

## Recent updates

The updated version of the **Text input** modern control includes improvements and behavior change.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.


| Previous property | New property |
|-------------------|--------------|
| `FontColor` | `Color` |
| `FontSize` | `Size` |
| `FontItalic` | `Italic` |
| `FontStrikethrough` | `Strikethrough` |
| `FontUnderline` | `Underline` |
| `BorderRadius` | `RadiusTopLeft`, `RadiusTopRight`, `RadiusBottomLeft`, `RadiusBottomRight` |

### Bug fixes and improvements

- **OnChange optimization**: The **OnChange** event now fires only when the user leaves the field (on blur), not on every keystroke. This improves performance and prevents issues with rapid formula execution.
- **TriggerOutput flexibility**: The **TriggerOutput** property now defaults to **Keypress** for immediate updates, with **Delayed** used automatically in forms for better performance.
- **Default property**: New **Default** property allows you to set an initial value when the control loads.
- **Password preview**: Password fields now show masked characters (***) even in preview mode, making it easier to design secure forms.
- **DisplayMode.View fixed**: When set to **View** mode, the control is now truly read-only. Previously, users could still edit the text.
- **Null handling improved**: Blank or null values now properly return empty strings instead of null, preventing formula errors.
- **Multiline overflow fixed**: Multi-line text areas no longer have overflow issues when users press Enter to create new lines.
- **OnChange tabbing fixed**: **OnChange** no longer fires when users tab through fields without making changes.
- **Border rendering fixed**: Borders now render correctly even when control height is less than 32 pixels.
- **Color palette override**: The **BasePaletteColor** property in the property panel now properly overrides the global theme.

## Best practices

- **Clear placeholders**: Use **Placeholder** to show example text or formatting hints (e.g., "MM/DD/YYYY" for dates).
- **Appropriate type**: Use **Type** appropriately - **Password** for sensitive data, **Multiline** for long text, **Search** for search boxes.
- **MaxLength validation**: Set **MaxLength** to prevent users from entering too much text, especially for database fields with character limits.
- **TriggerOutput consideration**: Use **Keypress** for immediate feedback (search, filters), **FocusOut** for validation, **Delayed** for expensive operations.
- **Required fields**: Mark required fields clearly with **Required** and provide visual feedback with **ValidationState**.
- **Accessible labels**: Always provide descriptive **AccessibleLabel** text that explains what text to enter.
- **OnChange efficiency**: Since **OnChange** fires on blur (not every keystroke), it's safe to use for data updates and validations without performance concerns.
- **Character counters**: For fields with **MaxLength**, consider showing a character count to help users stay within limits.


## See also

- [Modern controls overview](overview-modern-controls.md)
- [Size and location properties](../properties-size-location.md)

---

## Toggle modern control in Power Apps

Source: [modern-control-toggle.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-toggle)

*Learn about the details, properties, and examples of the toggle modern control in Power Apps.*

# Toggle modern control in Power Apps

A control that the user can turn on or off by moving the handle.

## Description

A toggle is a user interface element built for modern graphical user interfaces (GUIs) that functions in the same way as a checkbox. Use a toggle when you want an on/off switch metaphor - for example, to enable or disable a setting. The key properties for this control are **Checked**, **Label**, **OnCheck**, **OnSelect**, and **OnUncheck**.
 
## General

**Label** – The text shown next to the toggle. 

**AccessibleLabel** – Label for screen readers. 

**Visible** - Whether a control appears or is hidden. 

## Behavior

**Checked** - The initial value of a control before it's changed by the user. 

**DisplayMode** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled). 

## Size and position 

**LabelPosition** – Where the label appears relative to the toggle. This property uses the typed enum values `LabelPosition.Before` and `LabelPosition.After`. The default is `LabelPosition.After`. 

**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Width** - The distance between a control's left and right edges. 

**Height** - The distance between a control's top and bottom edges. 

## Style and theme

**BasePaletteColor** - The color palette applied to a control. This color impacts all surfaces of the control that render a theme color. 

**Font** - The name of the family of fonts in which text appears. 

**Size** - The font size of the text that appears on a control. If the value is null or zero, the selected Fluent theme drives the font size. 

**Color** - The color of text in a control. 

**FontWeight** - The weight of the text in a control: **Bold**, **Lighter**, **Normal**, or **Semibold**. 

**FontItalic** - Whether the text in a control is italic. 

**FontUnderline** - Whether a line appears under the text that appears on a control. 

**FontStrikethrough** - Whether a line appears through the text that appears on a control. 

## Additional properties

**Tooltip** – Explanatory text that appears when the user hovers over the control. 

**OnCheck** – Actions to perform when the value of the toggle changes to **true**. 

**OnSelect** – Actions to perform when the user selects a control. 

**OnUncheck** – Actions to perform when the value of the toggle changes to **false**. 

## Recent updates

The updated version of the **Toggle** modern control includes the following improvements and behavior changes.

### Property renames

| Previous property | New property | Notes |
|---|---|---|
| `FontColor` | `Color` | Renamed for consistency across modern controls. |
| `FontSize` | `Size` | Renamed for consistency across modern controls. |

### Enum format changes

Properties that previously accepted plain text strings now use typed Power Fx enums. Typed enums give you IntelliSense autocomplete and compile-time validation, and they help avoid formula errors from misspelled values.

| Property | Previous value | New value |
|---|---|---|
| `LabelPosition` | `"Before"` | `LabelPosition.Before` |
| `LabelPosition` | `"After"` | `LabelPosition.After` |

### Improvements

- **Tooltip support**: A new `Tooltip` property shows explanatory text when the user hovers over the toggle.
- **Improved sizing**: The toggle now fills the full width and height of the control's bounds, so it sizes predictably when you resize the control or place it in a responsive container.
- **Read-only View mode**: When `DisplayMode` is `View`, the toggle now renders as read-only rather than looking disabled, so users can clearly tell the difference between a value they can't change and a control that's unavailable.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Recent updates to modern controls](modern-control-updates.md)
- [Checkbox modern control](modern-control-checkbox.md)

---

## Avatar Modern Control in Canvas Apps: Properties and Examples

Source: [modern-control-avatar.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-avatar)

*Discover how to use the Avatar modern control in Power Apps canvas apps. Learn key properties, presence badges, styling options, and examples to represent users and entities.*

# Avatar modern control in canvas apps

A control that shows a visual representation of a user, team, or entity, with an optional presence badge.

## Description

Use the **Avatar** modern control to visually represent a user, team, or entity. The control displays the image supplied in **Image**, falls back to initials derived from **Name**, and shows a generic person icon when neither value is available. You can also show a presence badge and, in the updated version, make the avatar respond to selection. Key properties for this control are **Name**, **Image**, and **Badge**.

> [!NOTE]
> This article describes the updated Avatar modern control. For information about what changed from the previous version, see [Recent updates](#recent-updates).

## General

**Name** – The name of the person or entity. The control uses this value to determine the initials that appear when there's no image, and for accessibility. The default is `User().FullName`.

**Image** – The visual representation for the person or entity. Accepts image URLs, data URIs, and Power Apps image references. The default is `User().Image`.

**Badge** – A small visual decoration added to convey the status of the person or entity. Accepts `PresenceBadge` enum values. Use a blank value when no badge should appear.

| Value | Description |
|-------|-------------|
| `PresenceBadge.Available` | The person is available. |
| `PresenceBadge.Busy` | The person is busy. |
| `PresenceBadge.DoNotDisturb` | The person doesn't want to be disturbed. |
| `PresenceBadge.Away` | The person is away. |
| `PresenceBadge.Offline` | The person is offline. |
| `PresenceBadge.OutOfOffice` | The person is out of office. |
| `PresenceBadge.Unknown` | The status is unknown. |

**Visible** – Whether the control appears or is hidden.

## Behavior

**OnSelect** – Actions to perform when the user selects the avatar. When this property contains an active formula, the avatar becomes interactive and renders with button semantics, so it responds to Enter or Space while it has keyboard focus. When the property is blank, the avatar is display-only.

**DisplayMode** – Whether the control allows interaction (**Edit**), only displays content (**View**), or is disabled (**Disabled**). When **Disabled** and **OnSelect** is set, the avatar is dimmed and **OnSelect** doesn't fire.

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **64**.

**Height** – Distance between the control's top and bottom edges. Default is **64**.

## Style and theme

**Shape** – Whether the avatar appears with a circular or square shape. Accepts `AvatarShape` enum values: `AvatarShape.Circular` (default) or `AvatarShape.Square`.

**Appearance** – An avatar can have portions of itself styled for greater emphasis or to be subtle. The following options are available:

- **Brand**: Uses the modern theme to style the avatar. Use the **BasePaletteColor** property to override this color scheme.
- **Neutral**: Uses a grayscale for the initials background to provide a subtle appearance.
- **Colorful**: Uses a color from a predefined set of colors, based on a hash of the provided **Name**.

**BasePaletteColor** – The color palette applied to a control. This property impacts all surfaces of the control that render a theme color. If the value is null or zero, the color is driven by the selected Fluent theme.

**Font** – The name of the family of fonts in which the initials appear.

**Size** – The font size of the initials. If the value is null or zero, the font size is driven by the avatar dimensions.

**Color** – The color of the initials. If not set, the control chooses a contrasting color based on **Appearance**.

**FontWeight** – The weight of the initials. Accepts `FontWeight` enum values: `FontWeight.Bold`, `FontWeight.Semibold`, `FontWeight.Normal` (default), or `FontWeight.Lighter`.

**Italic** – Whether the initials appear in italic style.

**Underline** – Whether a line appears under the initials.

**Strikethrough** – Whether a line appears through the initials.

## Additional properties

**AccessibleLabel** – Label read by screen readers. When not set, the control uses the **Name** value. When **OnSelect** is set, describe the action, for example `"Open profile for " & User().FullName`.

**Tooltip** – Explanatory text that appears when the user hovers over the control.

**ContentLanguage** – The display language for the control content, if different from the app language.

## Example

The following YAML example shows the current user's avatar with a presence badge, and a second avatar that opens a profile screen when selected:

```yaml
- CurrentUserAvatar:
    Control: ModernAvatar@1.0.0
    Properties:
      Name: =User().FullName
      Image: =User().Image
      Badge: =PresenceBadge.Available
      Shape: =AvatarShape.Circular
      Appearance: ="Brand"
      Tooltip: =User().FullName
      Width: =64
      Height: =64

- EmployeeAvatar:
    Control: ModernAvatar@1.0.0
    Properties:
      Name: =ThisItem.FullName
      Image: =ThisItem.Photo
      Badge: =PresenceBadge.Away
      Shape: =AvatarShape.Square
      Appearance: ="Colorful"
      AccessibleLabel: ="Open profile for " & ThisItem.FullName
      OnSelect: =Navigate(ProfileScreen)
      Width: =48
      Height: =48
```

## Recent updates

The updated version of the **Avatar** modern control includes the following improvements and behavior changes.

### Property renames

The following properties are renamed. Update any formulas in your app that reference the old property names.

| Previous property | New property |
|---|---|
| `FontSize` | `Size` |
| `FontColor` | `Color` |
| `FontItalic` | `Italic` |
| `FontUnderline` | `Underline` |
| `FontStrikethrough` | `Strikethrough` |

### Removed properties

| Removed property | Notes |
|---|---|
| `Out of office` | Removed. Use `Badge = PresenceBadge.OutOfOffice` to show the out-of-office presence instead. |

### Bug fixes and improvements

- **Updated enums**: `Badge` and `Shape` now use typed Power Fx enums (`PresenceBadge` and `AvatarShape`) instead of string values, improving IntelliSense and reducing formula errors. `FontWeight` uses the `FontWeight` enum.
- **OnSelect support**: The avatar can now trigger actions when selected. When `OnSelect` is set, the control renders with button semantics and is fully accessible via keyboard and screen readers.
- **Tooltip support**: New `Tooltip` property shows explanatory text on hover.
- **Full font control**: Font properties are now consistent with other modern controls. Use `Font`, `Size`, `Color`, `Italic`, `Underline`, and `Strikethrough`.

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Recent updates to modern controls](modern-control-updates.md)
- [Size and location properties](../properties-size-location.md)

---

## Copilot answer modern control in Power Apps

Source: [modern-control-copilot-answer.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-copilot-answer)

*Learn about the details, properties, and examples of the Copilot answer modern control in Power Apps.*

# Copilot answer modern control in Power Apps (preview)

[This article is pre-release document and is subject to change.]

A control that makers can use to add predefined questions that end users can use to get generated answers.

> [!IMPORTANT]
> Starting February 2, 2026, adding a Copilot answer control to new canvas apps will be discontinued. Existing apps with this control will remain functional for a limited time but will eventually no longer be supported. [Microsoft 365 Copilot in canvas apps](https://releaseplans.microsoft.com/?app=Power+Apps&planID=d8f2152f-1e0e-f111-8407-7ced8d183a37) is the new the recommended solution for natural language interactions in canvas apps. To ensure a smooth transition and prevent any disruption, we recommend that you migrate to Microsoft 365 Copilot as soon as it becomes available in your environment.

> [!NOTE]
> - This is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2189520), and are available before an official release so that customers can get early access and provide feedback.
> - App Copilot for canvas apps is currently rolling out and might not yet be available in your region.

## Description

Makers can use the Copilot answer control to set predefined questions that end users can use to get generative answers with a single click. The control is optimized for mobile users and is powered by Microsoft Copilot.

## Key properties

**Data source (Items)** – The Copilot answer control only supports Dataverse as the data source. The answer to the question comes from the Dataverse table that you select.

**Views** – A user can select any of the views that are available in the data source.  

**Fields** - Default list of fields available for the table. Users can select **Edit** to see the list of fields. They can also add or modify the fields based on their requirements.  

**Title** – A label that is displayed at the top of the Copilot answer control.  

**Question for Copilot** – This is the question a maker asks the Copilot answer control. The question is used as the prompt to generate a response that is displayed by the answer control that's based on the selected **Data source** property.


## Additional properties

**Show answer** – Should the Copilot answer control answer a question when the user clicks on the ‘Arrow’ icon (After sending) or as soon as the control loads when the question is defined in the properties window (Immediate).

**DisplayMode** – Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled).

**Position** - Whether a control appears or is hidden.

**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**[Size](../properties-text.md)** – The size of the control on the canvas

---

## Data Grid modern control in canvas apps - Power Apps

Source: [modern-control-data-grid.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-data-grid)

*Learn about the details, properties, and examples of the Data Grid modern control in Power Apps.*

# Data Grid modern control in canvas apps

Display records from a data source in a scrollable, sortable, and searchable grid.

## Description

The **Data Grid** modern control displays records in a column-and-row layout built on Fluent UI. It supports optional search filtering, sortable columns, and selectable rows. The control supports **row virtualization**, enabling smooth scrolling through large datasets with more than 2,000 records. You configure columns as subcontrols, and they support multiple types including text, number, phone, email, URL, and button. Use this control when you need a high-performance, data-dense view of tabular data with built-in interaction. Key properties for this control are **Items**, **Searchable**, **Sortable**, and **SelectMultiple**.

> [!NOTE]
> The **Data Grid** control is the recommended control for displaying tabular data in canvas apps, instead of the [Table control](modern-control-table.md). It provides improved performance and usability for data-dense scenarios.

> [!NOTE]
> If you enable text wrapping at the column level, row virtualization is disabled. To take advantage of virtualization for large datasets, keep text wrapping turned off on your columns.

## Recent improvements

The Data Grid control includes the following improvements for general availability:

- **Automatic virtualization for large datasets**: Row virtualization turns on automatically so you can scroll smoothly through large datasets. Virtualization is disabled only when you enable text wrapping on a column. The app checker flags columns that have text wrapping enabled so you can keep virtualization on.
- **Consistent row heights**: Rows render at a consistent height whether or not virtualization is active.
- **Resettable control**: The **Reset** function now resets the control, including the current selection.
- **Multiple-selection choice columns**: Columns bound to multiple-selection choice fields now display their values.
- **More reliable search**: Fixed an issue that could cause the control to stop responding when you use the search bar, and improved the search bar's padding and alignment.
- **Email columns**: Selecting a value in an email column no longer affects your browser session.
- **Copy and paste**: Copying and pasting the control no longer changes its columns into custom variants.
- **Column configuration**: You can configure column variants for data sources that aren't directly connected, and column property formulas can use `ThisItem`.
- **Data source changes**: Switching the data source refreshes the columns, and the search filter clears when you turn off **Searchable**.

## Limitations

The Data Grid control has the following limitations:

- **Attachment columns aren't supported**: The grid doesn't render attachment-type columns from Microsoft Dataverse.
- **Per-column text styling isn't available**: You can't set the font size or font color for an individual column.
- **Alternating row colors aren't available**: The grid doesn't support zebra striping.
- **Variable row height isn't available**: All rows use the same height. You can't set a custom or per-row height.
- **Search hint text isn't customizable**: You can't change the placeholder text in the search bar.
- **Search delegation**: Search might not be delegable on all data sources, and a delegation warning might not appear. For large data sources, verify that search returns the results you expect.
- **DefaultSelectedItems**: Changes to the default selected items aren't reflected after the grid first loads.

## General

**Items** – The data source for the grid. Accepts a Dataverse table, collection, or inline table expression.

**Visible** – Whether the control appears or is hidden.

## Behavior

**Searchable** – Whether a search bar appears above the grid. When **true**, users can type to filter visible rows. The current search string is exposed through the **SearchText** output property. The default value is **false**.

**Sortable** – Whether users can sort by a column by selecting its header. Default is **false**.

**SelectMultiple** – Whether users can select more than one row at a time. Default is **false**.

**ShowHeaders** – Whether column header labels appear at the top of the grid. Default is **true**.

**ShowSelector** – Whether a checkbox appears at the start of each row for row selection. Default is **false**.

**Required** – Whether the user must select at least one row.

**DisplayMode** – Whether the control allows user input (**Edit**), only displays data (**View**), or is disabled (**Disabled**).

## Size and position

**[X](../properties-size-location.md)** – Distance between the left edge of the control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – Distance between the top edge of the control and the top edge of its parent container (screen if no parent container).

**Width** – Distance between the control's left and right edges. Default is **792**.

**Height** – Distance between the control's top and bottom edges. Default is **475**.

## Style and theme

**BasePaletteColor** – The base color that the theme uses to generate the control's color palette.

**Font** – The font family used for the grid text.

**Size** – The font size of the grid text, in points. Default is **14**.

**Color** – The color of the grid text.

## Output properties

**Selected** – The most recently selected row, returned as a record.

**SelectedItems** – All currently selected rows, returned as a table. Use this property when **SelectMultiple** is **true**.

**SearchText** – The current value the user types in the search bar. This property is only available when **Searchable** is **true**.

## Configuring columns

The Data Grid uses **Data Grid Column** sub-controls to define how each column appears and what data it shows. You add columns when you connect a data source and configure fields in the authoring panel. Column properties are locked by default. Select a column and choose **Unlock** to customize it.

### Column properties

**Header Text** – The label shown in the column header.

**Visible** – Whether the column appears in the grid.

**Width** – The width of the column in pixels. Default is **150**.

**Text** – (Text, Phone, Email, URL, Button columns) A Power Fx formula evaluated per row that returns the value to display. Evaluated in the context of `ThisItem` (for example, `ThisItem.'Full Name'`).

**Image** – (Image column) A Power Fx formula evaluated per row that returns an image value or URL.

**Icon** – The Fluent icon shown in the column cell.

**AccessibleLabel** – (Image column) The accessible label for the image, read by screen readers.

### Column types

| Column type | Description |
|-------------|-------------|
| Text column | Displays a text value. |
| Number column | Displays a numeric value. |
| Phone column | Displays a phone number. |
| Email column | Displays an email address as a link. |
| URL column | Displays a URL as a hyperlink. |
| Button column | Displays a button in each row cell. |

## Example

The following YAML example shows a searchable grid with two text columns:

```yaml
- DataGrid2:
    Control: ModernDataGrid@1.1.0
    Properties:
      Items: |-
        =Table({Name: "Alice Contoso", Department: "Sales"}, {Name: "Bob Fabrikam", Department: "Engineering"}, {Name: "Carol Northwind", Department: "Marketing"})
      Searchable: =true
      X: =40
      Y: =40
    Children:
      - Department_Column1:
          Control: ModernDataGridColumn@1.1.0
          Variant: Textual
          IsLocked: true
          Properties:
            FieldDisplayName: ="Department"
            Text: =ThisItem.Department
      - Name_Column1:
          Control: ModernDataGridColumn@1.1.0
          Variant: Textual
          IsLocked: true
          Properties:
            FieldDisplayName: ="Name"
            Text: =ThisItem.Name
```

## See also

- [Modern controls overview](overview-modern-controls.md)
- [Table modern control](modern-control-table.md)
- [Size and location properties](../properties-size-location.md)

---

## Stream control in Power Apps

Source: [new-stream-video-control.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/new-stream-video-control)

*Learn about the details, properties, and examples of the new stream control in Power Apps.*

# Stream control (based on SharePoint) in Power Apps (preview)

[This article is pre-release document and is subject to change.]

The Stream control in Power Apps lets you embed Microsoft [Stream (on SharePoint)](/stream/streamnew/new-stream) videos directly in your canvas app. Adding a Stream video in your app makes a smooth integration of videos hosted on Microsoft Stream in your canvas app. It also improves the user experience.

## Prerequisites

To add a Stream video in your canvas app, follow these steps to get the embed URL of the video:

1. Open your [Stream (on SharePoint)](/stream/streamnew/new-stream) video.
1. Select **Share** > **Embed code**.
:::image type="content" source="media/embed-URL-image.png" alt-text="Microsoft Stream embed URL":::

1. Copy the URL starting from **https://** to the **UniqueId=** including the Unique ID numbers.
:::image type="content" source="media/sample-embed-code.png" alt-text="embed URL example":::

> [!IMPORTANT] 
> The Microsoft Stream control in Power Apps only supports URLs that follow the *.sharepoint.com pattern. If your SharePoint domain doesn't follow this pattern, the Stream control will show an invalid URL error.

## Add Stream control 

1. Open your app canvas app for [editing](../../edit-app.md).
1. On the [command bar](../../power-apps-studio.md#1--power-apps-studio-modern-command-bar), select **Insert** > **Media** > **Stream (preview)**.
1. In the **STREAM** pane, enter the **Stream URL** of the video. This is the embed URL from the [Prerequisites](new-stream-video-control.md#prerequisites) section of the article.
1. Customize the size of the embedded video player by setting the width and height properties of the control.


## Properties

**Stream URL (Required)** - The URL of the Stream video that you want to embed. This is the embed URL of the video. The URL should only have Unique ID. If URL detects other parameters, the control detects as invalid URL.
 
**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Width** - The distance between a control's left and right edges. 

**Height** - The distance between a control's top and bottom edges. 

## Mobile support for stream control
Stream control is now also supported on mobile. To comply with Apple's privacy policies, iOS users must follow these steps to enable cross-site tracking on Power Apps:

1. On iOS, select **Settings** > go to **Power Apps**.
1. Set the toggle for **Allow Cross-Website Tracking** to **On**.

## Limitations

1. Control properties such as auto start, auto play, and start from are coming soon.
1. Don't add more than four videos on a single canvas app screen because it can cause performance issues.
3. The last played state isn't preserved for a video that's in a gallery.

---

## Table control in Power Apps

Source: [modern-control-table.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-table)

*Learn about the details, properties, and examples of the modern Table control in Power Apps.*

# Table modern control in Power Apps (preview)

[This article is pre-release document and is subject to change.]

A control that shows a set of data in a tabular or list format.

> [!IMPORTANT]
> For displaying tabular data, use the [Data Grid modern control](modern-control-data-grid.md) instead of the Table control. The Data Grid control is optimized for performance and data-dense scenarios, and it's the recommended control for tabular data going forward.

## Description
The **Table** control is a modern responsive control that shows a set of data in a tabular or list format. The tabular format includes column headings for each displayed field and a footer that provides details about the dataset such as the record count. The list format presents the data in a single column and has three fields for each row. As an app maker, you have full control over what fields you add to the control including the order. Although all added fields are visible in the tabular format, only the initial three fields appear in the narrower list format.

Similar to the **Gallery** and **Data** table controls, the **Table** maintains a **Selected** property that points to the selected row and you can use it to link the **Table** control to other controls. The key properties for this control are **Items**, **ReflorBehavior**, **Selected**, and **OnSelect**.

## Supported capabilities

- Data in a **Table** control is read-only.
- The tabular format offers a modern data browsing experience with infinite scroll, eliminating the need for paging buttons.
- The **Table** control supports linking to Microsoft Dataverse tables and collections.
- When you connect a **Table** control to a compatible connector such as Microsoft Dataverse, it displays a predefined set of fields by default. You can also display or hide other fields based on your needs.
- The **Table** control can automatically switch between tabular and list formats. You can manually manage this behavior by using the **Reflow** property.
- When you run your app, you can adjust column width in the **Table** control. However, your changes aren't saved.
- Change the color palette for the **Table** via the Base palette color property. 

### Unsupported capabilities
Currently, the listed capabilities aren't supported. However, since the **Table** control is still evolving, check back for any updates.

* Linking the **Table** to other data connectors.
* Customizing the style of the **Table** other than the color palette or modifying individual columns.


## General

**[Items](../properties-core.md)** - The source of data for the items that appear in the table.

**NoDataText** - The message shown to a user when there are no records to show in the **Table** control. 

**[Visible](../properties-core.md)** - Whether a control appears or is hidden.

## Behavior 

**ReflowBehavior** - The default responsive behavior of the table. **Reflow** means the table displays in tabular form when the control is 480 or more pixels wide and transitions to a list format in narrower conditions. **GridOnly** (or **ListOnly**) means the table always displays in a tabular (or list) format regardless of the control width. You can use Power Fx formulas to create your own breakpoints for defining the responsive behavior of the table.

**EnableSorting** – Allows users to sort the data in the table by using dropdowns from the column headers for supported data types. 

**EnableRangeSelection** – Whether users can select a portion of the table to copy its values. Default is **Yes**. 

## Size and position 

**[X](../properties-size-location.md)** – The distance between the left edge of a control and the left edge of its parent container (screen if no parent container).

**[Y](../properties-size-location.md)** – The distance between the top edge of a control and the top edge of the parent container (screen if no parent container).

**Width** - The distance between a control's left and right edges. 

**Height** – The distance between a control's top and bottom edges. 


## Style and theme 

**HeaderFont** - The font for the column headings. 

**HeaderFontSize** - The font size for the column headings. 

**HeaderFontColor** - The text color for the column headings. 

**HeaderFontWeight** - The font weight for the column headings. 

**BasePaletteColor** - The color palette you apply to a control. This color affects all surfaces of the control that render a theme color. 

**Font** - The name of the family of fonts in which text appears. 

**FontSize** - The font size for the text that appears on a control. If the value is null or zero, the selected Fluent theme determines the font size. 

**FontColor** - The color of text in a control. 

**FontWeight** - The weight of the text in a control: Bold, Lighter, Normal, or Semibold. 

## Additional properties

**Selected** – The selected row in the **Table** control.  

**DisplayMode** - Whether the control allows user input (Edit), only displays data (View), or is disabled (Disabled). 

**OnSelect** – Defines the action triggered when a single record is selected.  

**ShowAvatar** - Whether the user’s avatar appears or is hidden in the list mode. 

**ShowColumnHeaders** – Whether the column headers appear or are hidden. 

**ShowFooter** - Whether the footer appears or is hidden.  

**[Size](../properties-text.md)** – The size of the control on the canvas.

**AccessibleLabel** – Label for screen readers.

---

