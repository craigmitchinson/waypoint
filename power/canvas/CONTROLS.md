# Controls

Source: `power/canvas/source/Src/Screen1.pa.yaml` (Craig's one-of-every-control sample), cross-checked
against the classic controls already in use in `scrCommand.pa.yaml`, `scrWorkItem.pa.yaml` and
`Components/*.pa.yaml`. For each control: the exact identifier including version, its `Variant`
values where Studio wrote one, and every property name Studio saved, each with the default formula
shown (values are illustrative — Studio fills in whatever the control was dragged to, not a fixed
default). Never edit `source/`; this file only reads it.

## Modern

Modern controls (ModernButton, ModernTextInput, ModernDropdown, ModernCombobox, ModernTabList, ModernToggle and the rest) take `Size` in pixels; `Label@2.5.1` takes `Size` in points. The app holds a pixel half of the point ramp as `TypeBodyPx`, `TypeCaptionPx` and other `*Px` tokens, declared in `App.pa.yaml` as `Round(pt * 4/3)`. Preflight check `typerole` enforces the right token for each role. A `ModernButton` with `Appearance: =ButtonAppearance.Secondary` ignores `BasePaletteColor` as a fill. `LayoutOverflow` accepts `Hide` and `Scroll` only.

### ModernText@1.0.0
Instances: `Text1`, `Text2` (unconfigured: `X`/`Y` only), `Text3` (configured). `Text3`'s full
property set: `AccessibleLabel: ="hey"`, `Align: =Align.Center`, `BorderColor: =RGBA(79, 90, 94, 1)`,
`Color: =RGBA(92, 37, 4, 1)`, `Fill: =RGBA(62, 128, 149, 1)`, `Font: =Font.Georgia`,
`FontWeight: =FontWeight.Bold`, `OnSelect: =Notify("hi")`, `RadiusBottomLeft: =0`,
`RadiusBottomRight: =0`, `RadiusTopLeft: =0`, `RadiusTopRight: =0`, `Size: =20`, `Text: ="hi"`,
`Underline: =true`, `VerticalAlign: =VerticalAlign.Top`, `X: =631`, `Y: =28`. So `Text` is confirmed
as the property name, and ModernText is radius-capable (four corners, like Image/Button/TextInput).

**Not used in this app, 20 Sep 2026.** ModernText draws scroll arrows inside cells whose text fits
("0.13", "BAU rota") at every height we gave it; its internal minimum height is not in the reference
and could not be established from the player. All 641 text controls are `Label@2.5.1`, which clips
and never scrolls. `power/canvas/control-properties.json` allows ModernText no property, preflight
check 19 refuses the control itself, and `scripts/swap-text-controls.mjs` is the rewrite that was
run. The property set above stays here as the record of what Studio wrote.

The modern Text control shows scroll arrows whenever its fixed Height is short of the browser's rendered
line box (font size times about 1.2 to 1.4 plus padding), even for one word. AutoHeight on the modern
control does not recalculate while the control is hidden, so panels that open later can show stale
heights and arrows. Classic Label@2.5.1 with Overflow hidden clips instead, and AutoHeight on a wrapped
Label grows safely inside a container that hides overflow.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernButton@1.0.0
Instances: `Button1`, `Button2` (unconfigured: `X`/`Y` only), `Button3` (configured). `Button3`'s
full property set: `AccessibleLabel: ="hi"`, `Align: =Align.Center`,
`Appearance: =ButtonAppearance.Outline`, `BasePaletteColor: =RGBA(227, 106, 244, 1)`,
`BorderStyle: =BorderStyle.Dotted`, `Color: =RGBA(160, 64, 8, 1)`, `DisplayMode: =DisplayMode.View`,
`Font: =Font.Georgia`, `FontWeight: =FontWeight.Bold`, `Icon: ="Airplane"`, `IconRotation: =1`,
`IconStyle: =IconStyle.Filled`, `Italic: =true`, `Layout: =ButtonLayout.IconAfter`,
`OnSelect: =Notify("hi")`, `PaddingBottom/Left/Right/Top: =0`, `RadiusBottomLeft: =5`,
`RadiusBottomRight: =5`, `RadiusTopLeft: =5`, `RadiusTopRight: =5`, `Size: =10`,
`VerticalAlign: =VerticalAlign.Top`, `X: =527`, `Y: =28`. Note the button appearance enum is
`ButtonAppearance` (not the plain `Appearance` used by TextInput/Dropdown); fill/hover/pressed
colour is `BasePaletteColor` plus `Appearance`, not the classic `Fill`/`HoverFill`/`PressedFill`
triple. Single-word Fluent names render in the modern Button Icon property; compound names
(TaskListSquareLtr, CalendarLtr, ChartMultiple) did not, observed 20 Sep 2026.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernCard@1.3.0
Instances: `Card1`, `Card2` (unconfigured: `X`/`Y` only), `Card3` (configured). `Card3`'s full
property set: `Description: ="erdsdf"`, `DescriptionColor: =RGBA(224, 86, 6, 1)`,
`DescriptionSize: =13`, `DropShadow: =DropShadow.ExtraBold`, `Fill: =RGBA(152, 208, 70, 1)`,
`Subtitle: ="gdfgg"`, `SubtitleColor: =RGBA(12, 59, 94, 1)`, `TitleColor: =RGBA(54, 176, 75, 1)`,
`X: =1060`, `Y: =568`. Note: `TitleColor` is written but no `Title` (or other title-text) property
is — Craig set the title's colour without ever setting its text, so the exact title-text property
name is still unconfirmed.

**Official reference** (`modern-control-card`): the title-text property is named `Title`, resolving
what Studio left unconfirmed. Full property list the doc gives that Studio never wrote on `Card3`:
`Direction` (vertical/horizontal layout), `Title`, `Image`, `ImageAltText`, `HeaderImage`,
`HeaderImageAltText`, `ImagePosition`, `OnSelect`, `DisplayMode`, `Visible`, `TitleSize`,
`SubtitleSize`, `X`/`Y`/`Width`/`Height`. The doc names the corner-radius property `Radius`
(singular, one value for the whole card) — this conflicts with every other Modern control in this
file, which all use four `RadiusTopLeft`/`RadiusTopRight`/`RadiusBottomLeft`/`RadiusBottomRight`
properties; `Card3` doesn't write any radius property, so Screen1 can't confirm which form Studio
actually uses. The doc gives no enum value tables for `Direction`, `ImagePosition` or `DropShadow`
(prose only), so `DropShadow.ExtraBold` (seen on `Card3`) isn't independently confirmed by the doc.
Note the doc's example YAML uses `Control: ModernCard@1.0.0`, an older version than Screen1's
`@1.3.0`.

### ModernTextInput@1.1.1
Instances: `TextInput1`, `TextInput2` (unconfigured: `X`/`Y` only), `TextInput3` (configured).
`TextInput3`'s full property set: `AccessibleLabel: ="hello"`, `Align: =Align.Justify`,
`Appearance: =Appearance.FilledLighter`, `BasePaletteColor: =RGBA(141, 229, 250, 1)`,
`BorderStyle: =BorderStyle.Dotted`, `Color: =RGBA(52, 152, 47, 1)`, `Default: ="hi"`,
`DisplayMode: =DisplayMode.View`, `Fill: =RGBA(53, 61, 63, 1)`, `Font: =Font.'Open Sans'`,
`FontWeight: =FontWeight.Semibold`, `MaxLength: =5`, `PaddingBottom/Left/Right/Top: =0`,
`Placeholder: ="hey"`, `RadiusBottomLeft: =9`, `RadiusBottomRight: =9`, `RadiusTopLeft: =9`,
`RadiusTopRight: =9`, `Size: =5`, `Strikethrough: =true`, `X: =780`, `Y: =28`. Initial value is
`Default`, same property name as Classic; `Placeholder` is a separate, new property Classic did not
have.

**Official reference** (`modern-control-text-input`): key properties are `Text`, `Placeholder`,
`Type` and `TriggerOutput`. `Text` is the output property for the current value (the property Studio
writes for the initial value is still `Default`, confirming `TextInput3`). `Placeholder` defaults to
"Enter text". `Type` (not written on `TextInput3`) accepts `TextInputType.SingleLine` (default),
`.Multiline`, `.Password`, `.Search` — this is the Modern equivalent of Classic's
`Mode: =TextMode.MultiLine`, still unconfirmed on a Screen1 instance. `TriggerOutput` accepts
`.Keypress` (default), `.FocusOut`, `.Delayed` (forms default to `Delayed` automatically).
`Appearance` accepts `Appearance.FilledDarker` (default)/`FilledLighter` (confirmed by
`TextInput3`)/`Outline`. `MaxLength`, `Required`, `ValidationState` (`.None`/`.Error`) round out
validation. Width/Height default to 320/32.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernCombobox@1.1.1
Instances: `Combobox1`, `Combobox2`, `Combobox3` (unconfigured: `X`/`Y` only), `Combobox4`
(configured). `Combobox4`'s full property set: `AccessibleLabel: ="hi"`,
`BasePaletteColor: =RGBA(249, 83, 109, 1)`, `Color: =RGBA(224, 86, 6, 1)`,
`Fill: =RGBA(174, 208, 221, 1)`, `Font: =Font.'Great Vibes'`, `X: =713`, `Y: =200`. No `Items`,
radius or appearance property written yet on this instance.

**Official reference** (`modern-control-combobox`): key properties are `Items`,
`DefaultSelectedItems` and `SelectMultiple`, none of which `Combobox4` has written yet. `Items`
accepts a collection, table, or Power Fx formula returning a table; `ItemDisplayText` picks the
display text per item (`ThisItem...`); `DefaultSelectedItems` is the initial selection, must be a
table of records from `Items`. `SelectMultiple` (default **true**) and `IsSearchable` (default
**true**) are the behaviour toggles; `SelectedItems`/`Selected`/`SearchText` are outputs;
`MultiValueDelimiter` defaults to `", "`. `ValidationState` accepts `ValidationState.Error` /
`ValidationState.None`. `Appearance` accepts `Appearance.FilledDarker` (default),
`Appearance.FilledLighter`, `Appearance.Outline` — the same enum name and values as
`ModernTextInput`/`ModernDropdown`/`ModernNumberInput`. Radii are the usual four
`RadiusTopLeft`/etc. Width/Height default to 320/32. Recent-updates table confirms the property was
previously `Fields`, replaced by `ItemDisplayText`, and `TriggerOutput` replaced by `DelayOutput`.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernDataGrid@1.5.1
Instances: `DataGrid1`, `DataGrid2`. Properties: `X: =140`, `Y: =140`. Unconfirmed — still positions
only.

**Official reference** (`modern-control-data-grid`, the Data Grid control the doc recommends over
Table): key properties are `Items`, `Searchable`, `Sortable` and `SelectMultiple`, none written on
either instance yet. Other properties the doc lists: `Visible`, `ShowHeaders` (default true),
`ShowSelector` (default false), `Required`, `DisplayMode`; style: `BasePaletteColor`, `Font`,
`Size` (default 14), `Color`; outputs `Selected`, `SelectedItems`, `SearchText`. Width/Height
default to 792/475. Columns are configured as `ModernDataGridColumn` sub-controls (`Children:` in
YAML), each with `FieldDisplayName`/`Header Text`, `Visible`, `Width` (default 150), and a
type-specific value property — `Text` for Text/Phone/Email/URL/Button columns, `Image` for image
columns, plus `Icon` and `AccessibleLabel`. No radius or appearance/border properties are listed for
the grid itself. The doc's own example uses `ModernDataGrid@1.1.0`, older than Screen1's `@1.5.1`.

### ModernNumberInput@1.1.1
Instance: `NumberInput1`. Properties: `X: =300`, `Y: =300`.

**Official reference** (`modern-control-number-input`): key properties are `Value`, `Min`, `Max`,
`Step` and `Precision`, none written yet on `NumberInput1`. `Default` is the initial value (`Value`
is the output). `Step` defaults to 1. `Precision` accepts `DecimalPrecision` enum values:
`DecimalPrecision.Auto` (default), `.'0'`, `.'1'`, `.'2'`, `.'3'`. `Align` accepts `Align.Left`
(default)/`Center`/`Right` (no `Justify`, unlike Text/TextInput). `Appearance` accepts the same
`Appearance.FilledDarker` (default)/`FilledLighter`/`Outline` enum as Combo box/Dropdown/TextInput.
`ValidationState` accepts `.None`/`.Error`. `HintText` is the placeholder property (not
`Placeholder`, unlike Text Input). Width/Height default to 320/32. Radii are the usual four corners.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernDropdown@1.0.2
Instances: `Dropdown1` (unconfigured: `X`/`Y` only), `Dropdown2` (configured). `Dropdown2`'s full
property set: `AccessibleLabel: ="hello"`, `Appearance: =Appearance.Outline`,
`BasePaletteColor: =RGBA(246, 142, 104, 1)`, `BorderStyle: =BorderStyle.Solid`,
`Color: =RGBA(40, 112, 134, 1)`, `Default: ="hi"`, `Fill: =RGBA(12, 59, 94, 1)`,
`Font: =Font.'Segoe UI'`, `FontWeight: =FontWeight.Lighter`, `RadiusBottomLeft: =0`,
`RadiusBottomRight: =0`, `RadiusTopLeft: =0`, `RadiusTopRight: =0`, `X: =726`, `Y: =154`. `Default`
is the initial-value property, same name as Classic; no `Items`/`Items.Value` written yet on this
instance.

**Official reference** (`modern-control-dropdown`): key properties are `Items`, `Default`,
`ValidationState` and `OnChange`. `Items` accepts a table, collection, or inline array (for example
`["Option A", "Option B"]`); `ItemDisplayText` picks the display column (defaults to `ThisItem.Value`
for string arrays, `ThisItem.Value1` for tables); `Default` was previously named
`DefaultSelectedItems` per the recent-updates table — confirms Screen1's classic-matching `Default`
name is also the current Modern name, after a rename round-trip. `Selected` is the read-only output
(`Dropdown1.Selected.Value`). `Appearance` accepts `Appearance.FilledDarker` (default,
`FilledLighter`, `Outline` — same enum as Combo box/TextInput/NumberInput, not `Dropdown2`'s
`Appearance.Outline`-only sample). `ValidationState` accepts `.None`/`.Error`. Width/Height default
to 320/32.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernDatePicker@1.0.1
Instances: `DatePicker1` (unconfigured: `X`/`Y` only), `DatePicker2` (configured). `DatePicker2`'s
full property set: `AccessibleLabel: ="gdfgdf"`, `Appearance: =Appearance.FilledLighter`,
`BasePaletteColor: =RGBA(189, 178, 176, 1)`, `Color: =RGBA(160, 64, 8, 1)`,
`DateTimeZone: =DateTimeZone.UTC`, `Font: =Font.'Lato Light'`, `FontWeight: =FontWeight.Bold`,
`Format: =DatePickerFormat.Short`, `Placeholder: ="01/01/01"`, `Size: =5`, `Underline: =true`,
`X: =1046`, `Y: =736`.

**Official reference** (`modern-controls-date-picker`): key properties are `Format`,
`ValidationState` and `OnChange`. The placeholder property is named `PlaceHolder` in the doc
(capital H mid-word) — Screen1 wrote `Placeholder` (lower-case h) on `DatePicker2`; keep Screen1's
spelling and note the doc's differs. `Format` accepts `Short`, `LongAbbreviated`, `YearMonth`, or
`Custom` (with a format string such as `"dd/mm/yyyy"`) — the doc doesn't show these as a qualified
enum (e.g. `DatePickerFormat.Short`) the way Screen1's `Format: =DatePickerFormat.Short` does, so the
enum type name `DatePickerFormat` is confirmed by Screen1 only. Additional properties the doc lists
that `DatePicker2` doesn't write: `Required`, `EndDate`, `StartDate`, `StartOfWeek`, `IsEditable`,
`SelectedDate` (output), `ValidationState` (`Error`/`None`).

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernCheckbox@1.0.1
Instance: `Checkbox1`. Properties: `X: =400`, `Y: =400`. Still the only instance in the source and
still unconfigured — Craig's round of configuration did not reach this control, so it remains
positions only.

**Official reference** (`modern-control-checkbox`): key properties are `Checked`, `Label`,
`OnCheck` and `OnUncheck`, none written on `Checkbox1` yet. `Label` is the checkbox's text; `Checked`
is the controlled boolean value (default `Checked = true` now honoured on load, per recent updates).
`DisplayMode` is Edit/View/Disabled. Style properties: `BasePaletteColor`, `Font`, `Size`, `Color`,
`FontWeight` (`Bold`/`Lighter`/`Normal`/`Semibold`), plus `FontItalic`/`FontUnderline`/
`FontStrikethrough` — note the doc's own recent-updates table only renames `FontColor`→`Color` and
`FontSize`→`Size` for this control, leaving `FontItalic`/`FontUnderline`/`FontStrikethrough`
un-renamed here even though every other Modern control in this file uses the shorter
`Italic`/`Underline`/`Strikethrough` names; this looks like a doc inconsistency rather than a real
difference. No radius or border properties are listed for Checkbox at all. `Tooltip`, `OnSelect` are
additional properties.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernRadio@1.0.1
Instances: `Radio1` (unconfigured: `X`/`Y` only), `Radio2` (configured). `Radio2`'s full property
set: `AccessibleLabel: ="gserg"`, `BasePaletteColor: =RGBA(168, 110, 235, 1)`,
`Color: =RGBA(17, 61, 15, 1)`, `Default: ="fff"`, `DisabledColor: =RGBA(132, 40, 38, 1)`,
`Fill: =RGBA(53, 61, 63, 1)`, `Font: =Font.'Great Vibes'`, `FontWeight: =FontWeight.Semibold`,
`Layout: =OptionLayout.HorizontalStacked`, `RadioBackgroundFill: =RGBA(79, 90, 94, 1)`,
`RadioBorderColor: =RGBA(215, 58, 60, 1)`, `RadioSelectionFill: =RGBA(189, 49, 51, 1)`,
`RadiusBottomLeft: =9`, `RadiusBottomRight: =9`, `RadiusTopLeft: =9`, `RadiusTopRight: =9`,
`Strikethrough: =true`, `X: =1046`, `Y: =668`.

**Official reference** (`modern-controls-radio-group`): key properties are `Items`,
`ItemDisplayText`, `Default` and `Selected`, none written on `Radio2` yet — Screen1 confirms
`Default` as the initial-selection property and `RadioBackgroundFill`/`RadioBorderColor`/
`RadioSelectionFill` as radio-circle colours, matching the doc's names exactly. `Layout` (not
written on `Radio2`) accepts `Layout.Vertical` (default) or `Layout.Horizontal` — recommended for
2–7 options, with a Combo box suggested for more. `Height` "automatically sizes to fit all radio
button options" per the doc — Radio auto-sizes vertically and can't be manually height-constrained.
Other properties the doc lists that `Radio2` doesn't write: `Selected` (output), `Required`,
`TriggerOutput`, `HoverColor`, `PressedColor`, `DisabledColor` (Screen1 has `DisabledColor` too, so
confirmed), `RadioSize`, `LineHeight`.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernToggle@1.0.0
Instances: `Toggle1` (unconfigured: `X`/`Y` only), `Toggle2` (configured). `Toggle2`'s full property
set: `AccessibleLabel: ="edffef"`, `BasePaletteColor: =RGBA(227, 106, 244, 1)`,
`Color: =RGBA(255, 184, 174, 1)`, `Font: =Font.Lato`, `FontWeight: =FontWeight.Semibold`,
`Italic: =true`, `Label: ="Labelssss"`, `LabelPosition: =ToggleLabelPosition.Above`, `Size: =44`,
`X: =1080`, `Y: =733`.

**Official reference** (`modern-control-toggle`): key properties are `Checked`, `Label`, `OnCheck`,
`OnSelect` and `OnUncheck`. The doc names the enum type `LabelPosition` with values
`LabelPosition.Before`/`LabelPosition.After` (default **After**) — this disagrees with Screen1,
which wrote `LabelPosition: =ToggleLabelPosition.Above` on `Toggle2` (a distinct enum type name,
`ToggleLabelPosition`, and a value, `Above`, the doc doesn't mention at all). Keep Screen1's
`ToggleLabelPosition.Above` as what Studio actually writes and note the doc's disagreement.
`Checked` is the controlled boolean (doc calls it "the initial value... before it's changed by the
user", i.e. also the current value). `Tooltip` is an additional property not on `Toggle2`.

**Rejected in source, 21 Sep 2026**: Studio answered PA2108 `Unknown property 'Checked' for
control type 'ModernToggle@1.0.0'` on `qcForce` in `scrQuarterClose.pa.yaml`; `Checked` is denied in
`power/canvas/control-properties.json`. The corpus lists `Checked` as a settable property, not an
output, so there is no `qcForce.Checked` to read at runtime either — the toggle's state has to be
tracked separately (`varQcForce`, set by `OnCheck`/`OnUncheck`) and its visual state reset with
`Reset()` on the control.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernTabList@1.0.1
Instances: `TabList1` (unconfigured: `X`/`Y` only), `TabList2` (configured). `TabList2`'s full
property set: `AccessibleLabel: ="fefe"`, `BasePaletteColor: =RGBA(189, 178, 176, 1)`,
`Color: =RGBA(166, 215, 153, 1)`, `Default: ="fef"`, `Font: =Font.'Courier New'`,
`FontWeight: =FontWeight.Bold`, `Size: =6`, `Underline: =true`, `X: =1020`, `Y: =708`. `Default`
holds the selected tab; no `Items`/tab-list content property written yet on this instance.

**Official reference** (`modern-control-tabs-or-tabs-list`): key properties are `Items`, `Default`,
`Selected` and `Appearance`, confirming `TabList2`'s `Default` as the selected-tab property.
`Items` is a table, collection, or list of values, one tab header per item; `Selected` is the
read-only output used to drive content visibility (for example
`ContentSection.Visible = TabList1.Selected.Value = "Overview"`). `Appearance` (not yet written on
`TabList2`) accepts `TabListAppearance.Transparent`/`.Subtle`/`.Underline`/`.Filled`. `Alignment`
(distinct from `Align`, which is per-tab text alignment) accepts `TabListAlignment.Start`/`.Center`
(default)/`.End`. `OnChange` and `OnSelect` are both available — `OnChange` fires only when the
selection changes, `OnSelect` fires on every tab click including the already-selected one. Width/
Height default to 300/60. Limitation noted: tabs don't scroll horizontally if too many to fit.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernSlider@1.0.1
Instance: `Slider1`. Properties: `X: =540`, `Y: =540`.

**Official reference** (`modern-control-slider`): key properties are `Default`, `Min`, `Max`,
`Value` (output) and `OnChange`, none written yet on `Slider1`. `Default` is the initial value
(default **50**, resets on `Reset()`); `Min` defaults to 0, `Max` to 100. `LayoutDirection` controls
horizontal vs vertical orientation (enum values not fully captured from the pulled page beyond the
property existing). `DisplayMode` is Edit/View/Disabled as usual.

### ModernRating@1.0.1
Instance: `Rating1`. Properties: `X: =560`, `Y: =560`.

**Official reference** (`canvas-apps-04`, "Rating modern control in canvas apps"): key properties
are `Default`, `Max`, `Step` and `Color`. Screen1 confirms only `X`/`Y` on `Rating1`, so everything
below is the doc's, not Studio's. `Default` is the initial value, default **3**, and is what
`Reset()` returns to; `Max` is the number of icons, a whole number greater than 1, default **5**.
`Step` is the `RatingStep` enum: `RatingStep.Full` (default, whole values only) or `RatingStep.Half`
(half steps, e.g. 3.5). `Value` is the read-only output, read inside `OnChange` as `Self.Value`.
`Color` is the fill colour of the selected icons and takes any colour value, defaulting to the
theme's brand colour. `Icon` is the icon shape as a string, `"Star"` (default) or `"Heart"` and the
like; unfilled items render as a dimmed variant of it. Also `AccessibleLabel`, `Tooltip`,
`DisplayMode`, `Visible`. Width/Height default to 200/40. The doc's example YAML writes
`Control: ModernRating@1.0.0`, an older version than Screen1's `@1.0.1`.

### ModernInformationButton@1.0.1
Instances: `InformationButton1` (unconfigured: `X`/`Y` only), `InformationButton2` (configured).
`InformationButton2`'s full property set: `AccessibleLabel: ="sdfdsf"`,
`BasePaletteColor: =RGBA(5, 102, 178, 1)`, `Color: =RGBA(240, 98, 15, 1)`,
`Content: ="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
pellentesque sem fsfdsplacerat."`, `Font: =Font.'Dancing Script'`, `FontWeight: =FontWeight.Bold`,
`Underline: =true`, `X: =1180`, `Y: =736`.

**Official reference** (`modern-control-info-button`): key properties are `Content`, `IconColor`
and `OnSelect`, confirming `Content` and matching `InformationButton2`'s property set closely.
`IconColor` (not written on `InformationButton2`) is the colour of the icon itself, separate from
`Color`/`BasePaletteColor` which style the flyout text. Width/Height default to 32/32 — the doc's
best practice calls out a 32x32 minimum tap target. `Size` (flyout text font size) defaults to 15.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

### ModernIcon@1.1.1
Instance: `Icon1`. Properties: `X: =660`, `Y: =660`.

**Official reference** (`canvas-apps-04`, "Icon modern control in canvas apps"): key properties are
`Icon`, `IconStyle` and `OnSelect`. Screen1 confirms only `X`/`Y` on `Icon1`, so everything below is
the doc's, not Studio's. `Icon` is a Fluent icon name as a string (`"Add"`, `"Delete"`, `"Edit"`)
out of about 180 icons, parity with the classic set, and classic `Icon.*` values map to their Fluent
equivalents automatically. `IconStyle` is a typed enum, renamed from the old string `Style`:
`IconStyle.Outline` (default) or `IconStyle.Filled`. Setting `OnSelect` to an active formula gives
the control button semantics for keyboard and screen readers; left empty the icon is decorative, and
`AccessibleLabel` may then be left empty so screen readers skip it. `IconColor` is the glyph colour,
separate from `Fill` (control background) and `BasePaletteColor` (theme colour). The control is
radius-capable (four corners) and takes `BorderColor`, `BorderStyle`, `BorderThickness` and the four
`Padding*` properties; `Rotation` turns the glyph clockwise in degrees, default 0. Also `Tooltip`,
`ContentLanguage`, `DisplayMode`, `Visible`. Width/Height default to 32/32. `TabIndex` was removed in
the updated control. The doc's example YAML writes `Control: ModernIcon@1.1.0`, one patch behind
Screen1's `@1.1.1`.

### ModernAvatar@1.1.0
Instances: `Avatar1` (unconfigured: `X`/`Y` only), `Avatar2` (configured). `Avatar2`'s full property
set: `AccessibleLabel: ="dfgfdg"`, `Appearance: =AvatarColor.Beige`, `Badge: =PresenceBadge.Busy`,
`BasePaletteColor: =RGBA(189, 178, 176, 1)`, `BorderColor: =RGBA(92, 37, 4, 1)`,
`Color: =RGBA(40, 112, 134, 1)`, `Fill: =RGBA(224, 86, 6, 1)`, `Font: =Font.'Open Sans'`,
`FontWeight: =FontWeight.Bold`, `RadiusBottomLeft: =99`, `RadiusBottomRight: =99`,
`RadiusTopLeft: =99`, `RadiusTopRight: =99`, `Shape: =AvatarShape.Square`, `Size: =55`,
`Strikethrough: =true`, `X: =1100`, `Y: =704`. Radius-capable (four corners).

**Official reference** (`modern-control-avatar`): key properties are `Name`, `Image` and `Badge`,
none written on `Avatar2` yet (Screen1 hasn't set a name or picture). `Name` defaults to
`User().FullName`, `Image` to `User().Image`. `Badge` accepts `PresenceBadge` enum values:
`Available`, `Busy` (confirmed by `Avatar2`), `DoNotDisturb`, `Away`, `Offline`, `OutOfOffice`,
`Unknown`. `Shape` accepts `AvatarShape.Circular` (default) or `.Square` (confirmed by `Avatar2`).
`Appearance` (not written on `Avatar2`) accepts `Brand`, `Neutral`, or `Colorful` (prose only, no
dot-enum form shown). Width/Height default to 64/64. `OnSelect` makes the avatar interactive with
button semantics; blank leaves it display-only.

### ModernProgressBar@1.0.0
Instances: `ProgressBar1` (unconfigured: `X`/`Y` only), `ProgressBar2` (configured). `ProgressBar2`'s
full property set: `BasePaletteColor: =RGBA(227, 106, 244, 1)`, `FillColor: =RGBA(79, 90, 94, 1)`,
`Max: =150`, `ProgressColor: =ProgressColor.Success`, `Shape: =ProgressShape.Square`,
`Thickness: =ProgressThickness.Large`, `TrackColor: =RGBA(214, 221, 224, 1)`, `X: =916`, `Y: =723`.

**Official reference** (`canvas-apps-04`, "Progress Bar Modern Control in Canvas Apps"): key
properties are `Value` (default 50), `Max` (default 100) and `Indeterminate` (default false), none
written on `ProgressBar2` — confirms `Max` is the property name (matches `ProgressBar2`'s
`Max: =150`). `ProgressColor` is a typed enum, not a string: `ProgressColor.Brand` (default),
`ProgressColor.Success`, `ProgressColor.Warning`, `ProgressColor.Error` — `ProgressColor.Success` on
`ProgressBar2` is confirmed by Studio and by the doc's enum table. `Thickness` is the
`ProgressThickness` enum, `Medium` (default) or `Large` — matches `ProgressThickness.Large`. `Shape`
is the `ProgressShape` enum, `Rounded` (default) or `Square` (confirmed by `ProgressBar2`); it is the
only corner control for this control, unlike Text/Button/Avatar's four `Radius*` properties. The
control is display-only, horizontal only, and shows no label or percentage; `OnChange` was removed in
the updated control. `Tooltip`, `ContentLanguage`, `AccessibleLabel` and `Visible` round out the set.
In the indeterminate state `Value`/`Max` aren't used and the current value isn't announced to screen
readers. Width/Height default to 200/8.

### ModernSpinner@1.1.0
Instances: `Spinner1` (`X: =760`, `Y: =720`, unconfigured), `Spinner2` (`X: =780`, `Y: =720`,
unconfigured), `Spinner3` (configured). `Spinner3`'s full property set:
`AccessibleLabel: ="gdfg"`, `Appearance: =SpinnerAppearance.Inverted`,
`BasePaletteColor: =RGBA(249, 83, 109, 1)`, `Color: =RGBA(189, 49, 51, 1)`,
`Font: =Font.'Patrick Hand'`, `FontWeight: =FontWeight.Bold`, `Label: ="regr"`,
`LabelPosition: =SpinnerLabelPosition.Below`, `PaddingTop: =9`, `Size: =44`,
`SpinnerColor: =RGBA(21, 68, 18, 1)`, `Strikethrough: =true`, `TrackColor: =RGBA(15, 108, 189, 1)`,
`Underline: =true`, `X: =1120`, `Y: =720`.

**Official reference** (`modern-control-spinner`): key properties are `Label`, `Appearance` and
`SpinnerSize` — Screen1 wrote `Size` on `Spinner3` where the doc's size/position section lists
`SpinnerSize` as the sizing property; keep Screen1's `Size` as what Studio actually writes and note
the doc's `SpinnerSize` name differs. `Appearance` accepts Primary or Inverted (confirms
`SpinnerAppearance.Inverted`, though again as prose not a dot-enum table). `LabelPosition` is listed
without enum values in the doc, so `SpinnerLabelPosition.Below` on `Spinner3` isn't independently
confirmed. Note the doc still uses `FontSize`/`FontColor`/`FontItalic`/`FontUnderline`/
`FontStrikethrough` names for this control's text styling, unlike the shorter `Size`/`Color`/
`Italic`/`Underline`/`Strikethrough` names Screen1 actually writes and most other Modern controls'
reference pages use — a doc naming inconsistency, not a Screen1 disagreement to resolve.

### ModernLink@1.0.1
Instances: `Link1` (unconfigured: `X`/`Y` only), `Link2` (configured), `Link3` (unconfigured:
`X`/`Y` only). `Link2`'s full property set: `Align: =Align.Right`,
`BasePaletteColor: =RGBA(168, 110, 235, 1)`, `BorderStyle: =BorderStyle.Dashed`,
`Color: =RGBA(40, 112, 134, 1)`, `Fill: =RGBA(40, 112, 134, 1)`, `Font: =Font.'Courier New'`,
`FontWeight: =FontWeight.Bold`, `Type: =LinkAppearance.Subtle`, `Underline: =true`,
`VerticalAlign: =VerticalAlign.Top`, `X: =1140`, `Y: =736`.

**Official reference** (`modern-control-link`): key properties are `Text`, `Url` and `Type`. The
recent-updates table confirms `Type` was renamed from `Appearance` specifically for this control
(unlike Combo box/Dropdown/TextInput/NumberInput, which still call their style-variant property
`Appearance`) — matches `Link2`'s `Type: =LinkAppearance.Subtle`. `Url` (not written on `Link2`) is
capitalised `Url` in property tables but the example YAML uses `URL:` — the doc is inconsistent with
itself here; note both spellings pending a Studio round-trip. `Wrap` (default true) controls text
wrapping, not written on `Link2`. `Type` accepts `LinkAppearance.Default` (default) or
`LinkAppearance.Subtle` (confirmed). Underlines are on by default for links per the doc's prose.

`Size` is a font size in pixels on this control, where `Label@2.5.1` takes points: 1pt = 4/3 px (`canvas-apps-04-modern-controls-reference.md`, Property changes).

## Classic (already in use in the app)

### Label@2.5.1
No corner radius. `Tooltip` is Studio-confirmed (21 Sep 2026 build, no rejection). Widest property
set seen, unioned across `Screen1` gallery templates and the static labels in
`scrCommand`/`scrWorkItem`/components:
`Align: =Align.Center`/`=Align.Right`, `AutoHeight: =true`, `BorderColor: =RGBA(0, 0, 0, 1)`,
`Color: =RGBA(50, 49, 48, 1)`, `Font: =Font.'Open Sans'` (app screens use `Font: =TypeFace`),
`FontWeight: =If(ThisItem.IsSelected, FontWeight.Semibold, FontWeight.Normal)`,
`Height: =Self.Size * 1.8`, `OnSelect: =Select(Parent)` (only inside gallery templates — never on a
static label), `PaddingBottom/Left/Right/Top: =0`, `Size: =14`, `Text: =ThisItem.SampleHeading`,
`VerticalAlign: =VerticalAlign.Top`, `Visible: =!IsBlank(varProblem)` (used, not default),
`Width: =Parent.TemplateWidth - 173`, `X`, `Y`. Text is `.Text`, matching Modern's `ModernText.Text`
in name only — see mapping table. No `AccessibleLabel`: Studio rejected it with PA2108 on 20 Sep
2026, same as `Classic/Button`, so a label's spoken text is `Tooltip` where one is set.

### Classic/Button@2.2.0
Instances in `scrWorkItem`: `wiNavToggle`, `wiNavItem`, `wiNavTheme`, `wiBack`, `wiSave`. Full
property set: `BorderColor`, `Color`, `DisabledBorderColor`, `DisabledColor`, `DisabledFill`, `Fill`,
`Font`, `Height`, `HoverBorderColor`, `HoverColor`, `HoverFill`, `OnSelect`, `PressedBorderColor`,
`PressedColor`, `PressedFill`, `RadiusBottomLeft`, `RadiusBottomRight`, `RadiusTopLeft`,
`RadiusTopRight`, `Size`, `Text`, `Tooltip`, `Width`, `X`, `Y`. Radius-capable (four corner
properties, not a single `Radius`). No `AccessibleLabel`: Studio rejected it with PA2108 on
20 Sep 2026, so a hit-target button carries its spoken text as `Tooltip`. `FocusedBorderColor` and
`TabIndex` are Studio-confirmed (21 Sep 2026 build, no rejection). `PressedBorderThickness` is
rejected: Studio answered PA2108 `Unknown property 'PressedBorderThickness' for control type
'Classic/Button@2.2.0'`, 16 occurrences, on the 08:53 build of 21 Sep 2026; denied in
`power/canvas/control-properties.json`.

### Classic/TextInput@2.3.2
Instances: `wiTitleInput`, `wiJiraInput`, `wiReasonInput`, `wiNotesInput`. Text is `.Text` at
runtime, but the property Studio writes for the initial value is `Default`, not `Text`. Full
property set: `BorderColor`, `Color`, `Default`, `Fill`, `Font`, `Height`, `HoverBorderColor`,
`HoverFill`, `Mode` (`=TextMode.MultiLine` for the multi-line instances), `RadiusBottomLeft`,
`RadiusBottomRight`, `RadiusTopLeft`, `RadiusTopRight`, `Size`, `Tooltip`, `Visible`, `Width`, `X`,
`Y`. Radius-capable.

### Classic/DropDown@2.3.1
Instances: `wiEpicInput`, `wiOwnerInput`, `wiStateInput`. Full property set: `BorderColor`,
`ChevronBackground`, `ChevronFill`, `ChevronHoverBackground`, `ChevronHoverFill`, `Color`, `Default`,
`Fill`, `Font`, `Height`, `HoverFill`, `Items`, `Items.Value`, `PressedColor`, `PressedFill`,
`SelectionColor`, `SelectionFill`, `Size`, `Tooltip`, `Width`, `X`, `Y`. No radius properties written
(chevron colours instead). `Classic/ComboBox` is not present anywhere in the source — Screen1 only
carries `ModernCombobox@1.1.1`, so there is no classic combo box instance to document; see the
mapping table for the intended replacement anyway.

### Classic/Icon@2.5.0
Instances: `NextArrow1`, `NextArrow2` (Screen1 gallery templates only, not yet used in app screens).
Properties: `AccessibleLabel: =Self.Tooltip`, `BorderColor`, `Color`, `DisabledBorderColor`,
`DisabledColor`, `Height`, `Icon: =Icon.ChevronRight`, `OnSelect`, `PaddingBottom/Left/Right/Top`,
`Tooltip`, `Width`, `X`, `Y`.

### Rectangle@2.3.0
Instances: `Separator1/2`, `Rectangle1/2` (Screen1 gallery templates only). Properties:
`BorderColor`, `Fill`, `Height`, `OnSelect`, `Visible` (`=ThisItem.IsSelected`), `Width`, `X`, `Y`.
Not Radius-capable, unlike Image and `Classic/Button`: Studio answered PA2108 `Unknown property
'RadiusTopLeft'`, `'RadiusTopRight'`, `'RadiusBottomLeft'` and `'RadiusBottomRight'` `for control
type 'Rectangle@2.3.0'` on the 22 Sep 2026 build (`scrTimeline`, `tlPeekEdge`); the four are denied
in `power/canvas/control-properties.json`, and a rounded shape uses a GroupContainer instead.

### Image@2.2.3
Instances: `Image1`–`Image5`, `ProfileImage1`, `UploadedImage1`. Properties: `BorderColor`, `Height`,
`Image` (`=If(IsBlank(AddMediaButton1.Media), SampleImage, AddMediaButton1.Media)` on
`UploadedImage1`), `ImagePosition` (`=ImagePosition.Fill`), `OnSelect`, `RadiusBottomLeft`,
`RadiusBottomRight`, `RadiusTopLeft`, `RadiusTopRight`, `Width`, `X`, `Y`. Radius-capable, unlike
Label.

## Layout

### GroupContainer@1.5.0
Variants seen: `ManualLayout` (every container in `scrCommand`/`scrWorkItem`/components and
`Container2` in Screen1), `GridLayout` (`Container1`, `Container6`), `AutoLayout` (`Container3`,
`Container4`, `Container5`), plus bare `Vertical`/`Horizontal` variant values seen on some
`GroupContainer` instances in `check*`/`build` sources (a distinct spelling from `AutoLayout`, not
yet reconciled — both appear on Studio-written containers). Properties by variant:
- `ManualLayout`/`GridLayout`: `BorderColor` (Screen1 sample only — not used in app), `BorderThickness`
  (app screens, e.g. `wiStage`), `Fill`, `Height`, `Width`, `X`, `Y`.
- `AutoLayout`: `Height` (top level only), `LayoutAlignItems` (`=LayoutAlignItems.Center`),
  `LayoutDirection` (`=LayoutDirection.Horizontal`/`Vertical`), `LayoutMinHeight`, `LayoutMinWidth`
  (nested levels), `PaddingBottom/Left/Right/Top`, `Width` (top level only).
Radius-capable per the runbook baseline; no radius property appears on any instance in either file,
so Studio only writes it once a radius is actually set.
No `OnSelect`, no `AccessibleLabel` (Studio PA2108, 20 Sep 2026); row hit areas use a transparent
`Classic/Button` as last child.

Confirmed per variant by the import validation of 20 Sep 2026:
- `AutoLayout` accepts `LayoutOverflowX` and `LayoutOverflowY` (`LayoutOverflow.Hide`/`.Scroll`)
  along with `LayoutDirection`, `LayoutJustifyContent`, `LayoutAlignItems`, `LayoutGap` and
  `LayoutWrap`. No auto-layout container was flagged in that run.
- `ManualLayout` rejects all of them: PA2108 `Unknown property 'LayoutOverflowX' for control type
  'GroupContainer@1.5.0' and variant 'ManualLayout'`, 84 occurrences across `cmpBand`, `cmpStepper`,
  `scrBenefits`, `scrCommand`, `scrFinancials`, `scrQuarterClose`, `scrTeam`, `scrTimeline`,
  `scrWork` and `scrWorkItem`. A manual-layout container clips by nature and needs no overflow
  setting. Both rules are in `power/canvas/control-properties.json` under the entry's `variants`
  map and are enforced by preflight checks 13 and 17.

### Layout containers

`GroupContainer@1.5.0` is the one control behind both Vertical container and Horizontal container in
Studio's Insert pane; which one you get is the `Variant`, not a different control identifier.

The doc's pane labels map to these YAML names: "Minimum width" is `LayoutMinWidth`, "Gap" is
`LayoutGap`, "Fill portions" is `FillPortions`, and "Flexible height gallery" is `Variant:
VariableHeight`.

See `power/RUNBOOK.md`, "Layout calibration" > "Source rules", for the corpus rules on
auto-layout-as-default, flexible-height galleries, and the Wrap/Overflow/Justify combination.

- `Variant: ManualLayout` — Studio-confirmed (every `GroupContainer` in `scrCommand.pa.yaml`,
  `scrWorkItem.pa.yaml`, `Screen1.pa.yaml`, `Components/*.pa.yaml`). Free X/Y positioning, no
  layout-direction properties written.
- `Variant: AutoLayout` — Studio-confirmed (`power/canvas/build/Src/scrWorkItem.pa.yaml`,
  `scrCommand.pa.yaml`, `Screen1.pa.yaml`). This is the flex-layout variant; direction is set
  separately via `LayoutDirection`, not by the `Variant` name.
- `Variant: Vertical` / `Variant: Horizontal` — Studio-confirmed as bare variant values on
  `GroupContainer` in `check*/Src/*.pa.yaml`, `check*/Src/Components/*.pa.yaml` and
  `build/Src/scrCommand.pa.yaml` (for example nested containers under `scrCommand.pa.yaml`,
  `Command.pa.yaml`, `WorkItem.pa.yaml`). Seen alongside, not instead of, `AutoLayout` elsewhere in
  the same files — the two spellings for a flex container haven't been reconciled from the sources
  alone.

Layout properties on the container itself (YAML property name, enum members where typed):
- `LayoutDirection` — Studio-confirmed (`source/Src/Screen1.pa.yaml`, `sample2`/`sample3`
  `Screen2.pa.yaml`). Values seen: `LayoutDirection.Horizontal`, `LayoutDirection.Vertical`.
- `LayoutAlignItems` — Studio-confirmed (same files). Values seen: `LayoutAlignItems.Center`.
  `Start`/`End`/`Stretch` are documented, YAML name not yet seen from Studio.
- `LayoutJustifyContent` — documented, YAML name not yet seen from Studio; in use in our build since
  the design pass and accepted by import on 2026-09-20, Studio open still to confirm.
- `LayoutGap` — documented, YAML name not yet seen from Studio; in use in our build since the design
  pass and accepted by import on 2026-09-20, Studio open still to confirm.
- `LayoutWrap` — documented (boolean), YAML name not yet seen written by Studio in any source here.
- `LayoutOverflowX` / `LayoutOverflowY` — documented (`LayoutOverflow.Hide`/`LayoutOverflow.Scroll`
  per the Vertical/Horizontal container reference pages), YAML name not yet seen written by Studio in
  any source here. A hidden child in an auto-layout container still takes its slot and gap; a child that hides by state must also set `Width` and `Height` to 0, or the container clips its siblings.

Layout properties written on a container's children:
- `FillPortions` — documented, YAML name not yet seen from Studio; in use in our build since the
  design pass and accepted by import on 2026-09-20, Studio open still to confirm.
- `AlignInContainer` — documented (`AlignInContainer.SetByContainer`/`.Start`/`.Center`/`.End`/
  `.Stretch`), YAML name not yet seen written by Studio in any source here.
- `LayoutMinWidth` / `LayoutMinHeight` — Studio-confirmed (`source/Src/Screen1.pa.yaml`), a number,
  values seen: `16`.

### Gallery@2.15.0
Variants seen: `Vertical` and `Horizontal` (app screens, `wiNavList` and similar),
`BrowseLayout_Vertical_TwoTextOneImageVariant_ver5.0`, `BrowseLayout_Horizontal_TwoTextOneImageVariant_ver5.0`,
`BrowseLayout_Flexible_SocialFeed_ver5.0` (Screen1 sample). Properties: `AccessibleLabel`,
`BorderColor`, `Height`, `Items`, `ShowScrollbar`, `TemplateSize`, `Width`, `X`, `Y`.

### Table@1.0.278
Instance: `Table1`. Properties: `X: =220`, `Y: =220`.

### Form@2.4.4
Instances: `Form1`, `Form2`. `Variant: Modern`, `Layout: Vertical`. Properties: `BorderColor`, `X`,
`Y`.

### Toolbar@2.0.5
Instance: `Toolbar1`. Properties: `X: =520`, `Y: =520`.

### ListBox@2.2.0
Instance: `ListBox1`. Properties: `BorderColor`, `Font`, `HoverFill`, `Items.Value`, `PressedColor`,
`PressedFill`, `SelectionColor`, `SelectionFill`, `X`, `Y`.

### RichTextEditor@2.7.0
Instance: `RichTextEditor1`. Properties: `BorderColor`, `X`, `Y`.

### AddressInput@1.3.21
Instance: `AddressInput1`. Properties: `X: =460`, `Y: =460`.

### PenInput@2.3.0
Instance: `PenInput1`. Properties: `BorderColor`, `X`, `Y`.

## Media and charts

### Badge@0.0.24
Instances: `BadgeCanvas1` (unconfigured: `X`/`Y` only), `BadgeCanvas2` (configured). `BadgeCanvas2`'s
full property set: `Align: =Align.Center`, `Appearance: ='BadgeCanvas.Appearance'.Ghost`,
`BasePaletteColor: =RGBA(156, 220, 79, 1)`, `Content: ="ABc"`, `Font: =Font.'Courier New'`,
`FontColor: =RGBA(160, 64, 8, 1)`, `FontSize: =67`, `FontStrikethrough: =true`,
`FontWeight: =FontWeight.Semibold`, `Shape: ='BadgeCanvas.Shape'.Square`,
`ThemeColor: ='BadgeCanvas.ThemeColor'.Danger`, `VerticalAlign: =VerticalAlign.Middle`, `X: =1040`,
`Y: =736`. Note the enum forms: `Appearance`, `Shape` and `ThemeColor` are all qualified as
`'BadgeCanvas.<Property>'.<Value>`, not the bare `<Property>.<Value>` form seen on other Modern
controls.

**Official reference** (`modern-controls-badge`): key properties are `Content`, `Shape` and
`Appearance`, confirming `Content` and `Shape` by name. `Appearance` accepts filled, outline, ghost,
or inverted (prose, no enum table — `'BadgeCanvas.Appearance'.Ghost` on `BadgeCanvas2` is Screen1's
own confirmation of both the value and the qualified-enum form the doc doesn't show). `Shape`
accepts circular, square, or rounded (`BadgeCanvas2` uses `Square`). `ThemeColor` accepts brand,
danger (confirmed), important, informative, severe, subtle, success, or warning. The doc still uses
`FontSize`/`FontColor`/`FontItalic`/`FontUnderline`/`FontStrikethrough` for this control's text
styling, matching what `BadgeCanvas2` actually writes (`FontColor`, `FontSize`,
`FontStrikethrough`) — unlike most other Modern controls, Badge has not been through a
`Color`/`Size`/`Italic` rename round. `Appearance` value `Tint` is catalogue-only, taken from the doc
prose ("filled, outline, ghost, inverted" does not list it); it is confirmed only if Studio accepts
it on the 20 September 2026 import.

### Header@0.0.44
Instances: `Header1` (unconfigured: `Height`/`X`/`Y` only), `Header2` (configured). `Header2`'s full
property set: `BasePaletteColor: =RGBA(8, 222, 8, 1)`, `BorderColor: =RGBA(79, 90, 94, 1)`,
`BorderRadiusBottomLeft: =2`, `BorderRadiusBottomRight: =3`, `BorderRadiusTopLeft: =0`,
`BorderRadiusTopRight: =1`, `Fill: =RGBA(21, 68, 18, 1)`, `Font: =Font.Arial`,
`FontColor: =RGBA(62, 128, 149, 1)`, `Style: ='Header.Style'.Light`, `TitleFontSize: =3`, `Y: =693`
(no `X` written). Radius property name is `BorderRadius*` (four corners), unlike the plain
`Radius*` used elsewhere. No `Title` (or other title-text) property is written on this instance —
`TitleFontSize` is set but the title text itself was never configured, so the exact title-text
property name is still unconfirmed.

**Official reference** (`modern-controls-header`): key properties are `Logo`, `OnSelectLogo` and
`Title` — this resolves what Screen1 left unconfirmed: the title-text property is named `Title`,
defaulting to the current screen name. The doc gives no enum-value table for `Style` at all (just
"Header color variant, based on theme colors") — `Style: ='Header.Style'.Light` on `Header2` is
Screen1's own confirmation of both the qualified-enum form and the `Light` value. The doc also never
mentions a `BorderRadius*`/`Radius*` property for Header anywhere on the page, despite `Header2`
writing all four `BorderRadius*` corners — an omission in the doc, not a naming disagreement.
Properties the doc lists that `Header2` doesn't write: `Logo`, `IsTitleVisible`, `IsLogoVisible`,
`IsProfilePictureVisible` (shows the current user's picture by default), `LogoMaxHeight`,
`LogoToolTip`, `OnSelectLogo`. Unsupported per the doc: colour customisation beyond the listed
properties, and app navigation; the header must be added to each screen manually — it doesn't
replicate automatically.

### Timer@2.1.0
Instance: `Timer1`. Properties: `BorderColor`, `Color`, `DisabledBorderColor`, `DisabledColor`,
`DisabledFill`, `Fill`, `Font`, `HoverBorderColor`, `HoverColor`, `HoverFill`, `PressedBorderColor`,
`PressedColor`, `PressedFill`, `X`, `Y`.

### HtmlViewer@2.1.0
Instance: `HtmlText1`. Properties: `Font`, `X`, `Y`.

### Camera@2.4.0
Instance: `Camera1`. Properties: `BorderColor`, `Camera: =0`, `X`, `Y`.

### AddMedia@2.2.1
Instance: `AddMediaButton1`, `Group: AddMediaWithImage1`. Properties: `BorderColor`, `Size`, `X`, `Y`.

### StreamVideo@0.0.5
Instance: `StreamVideo1`. Properties: `X`, `Y`.

### Video@2.4.2
Instance: `Video1`. Properties: `BorderColor`, `Fill`, `X`, `Y`.

### Audio@2.3.1
Instance: `Audio1`. Properties: `BorderColor`, `Fill`, `X`, `Y`.

### Microphone@2.2.0
Instance: `Microphone1`. Properties: `BorderColor`, `Color`, `Fill`, `HoverColor`, `HoverFill`, `X`,
`Y`.

### ViewIn3D@1.2.23
Instance: `ViewIn3D1`. Properties: `X`, `Y`.

### Import@2.1.0 / Export@2.1.0
Instances: `Import1`, `Export1`. Identical property set: `BorderColor`, `Color`,
`DisabledBorderColor`, `Fill`, `Font`, `HoverBorderColor`, `HoverColor`, `HoverFill`,
`PressedBorderColor`, `PressedFill`, `X`, `Y`.

### PDFViewer@2.5.0
Instance: `PdfViewer1`. Properties: `X`, `Y`.

### Map@1.8.27
Instance: `Map1`. Properties: `X`, `Y`.

### BarChart@2.4.0 / PieChart@2.3.0 / LineChart@2.3.0
Instances: `ColumnChart1`, `PieChart1`, `LineChart1`, each in its own composite `Group`
(`CompositeColumnChart1`, `CompositePieChart1`, `CompositeLineChart1`) alongside a `Title` `Label` and
a `Legend`. Properties: `Items.Labels`, `Items.Series` (Pie, single series) or `Items.Series1`–
`Items.Series9` (Bar and Line), `X`, `Y`.

### Legend@2.1.0
Instances: `Legend1`, `Legend2`, `Legend3`. Properties: `Font`, `Height`, `ItemColorSet`
(`=<Chart>.ItemColorSet`), `Items` (`=<Chart>.SeriesLabels`), `Items.Value`, `Size` (Legend2 only),
`Width`, `X`, `Y`.

### PowerBI@2.4.0
Instance: `PowerBI1`. Properties: `BorderColor`, `X`, `Y`.

## Other

### CanvasComponent
Instances: `cmpBand_1`, `cmpPill_1/2`, `cmpStat_1`, `cmpStepper_1` (Screen1); `wiKind`, `wiState`,
`wiStepper` (`scrWorkItem`). `ComponentName` names the component; `Properties` are that component's
own custom properties (e.g. `cmpPill`: `Fill`, `Height`, `Label`, `Tone`, `Width`; `cmpStat`: `Fill`,
`Height`, `Label`, `OnBrand`, `Sub`, `Tone`, `Unit`, `Value`, `Width`; `cmpStepper`: `Current`,
`Fill`, `Height`, `Label`, `Steps`, `Width`; `cmpBand`: `Fill`, `Height`, `Kicker`, `Width`). An instance does not inherit its definition's `Width` or `Height` formulas; without them it takes the definition's design-time size.

## Responsive layout

The reference pulled for this pass has very little to say about responsive layout at the
container/screen level. It never mentions `LayoutMinWidth`, `LayoutMinHeight`, screen-size settings,
or `Fill` as a container-sizing portion — none of these terms appear anywhere across the 25 control
pages. Where the doc does discuss responsiveness, it's per-control and shallow:

- **Form**: "The form adjusts its spacing and layout to the available width, so it works across
  desktop, tablet, and mobile without manual repositioning" and "applies responsive spacing and
  layout that adjust to the available width" — no mechanism (breakpoints, min/max width) is given.
- **Table** (preview): `ReflowBehavior` switches the control between a tabular layout at 480px or
  more of width and a list layout below that, or can be pinned with `GridOnly`/`ListOnly`, or driven
  by a maker's own Power Fx breakpoint formula.
- **Combo box**: "mobile-optimized defaults" apply automatically when the control is added in a
  mobile layout (font size 24, width 560, height 64) — a one-off default swap, not live
  responsiveness.
- **Text**: the same "mobile-optimized defaults" pattern (font size 15, padding 5, width 150,
  height 32).

Nothing in the pulled reference covers `GroupContainer` variants, `AutoLayout`, `LayoutAlignItems`,
`LayoutDirection`, or Fill portions as documented in this file's own `## Layout` section — those are
canvas-container concepts, and the reference's 25 pages are all individual controls, not layout
containers or the app/screen chrome around them.

## Mapping: modern control replacing our classic use

| Classic (in use) | Modern replacement | Property-name differences that matter |
| --- | --- | --- |
| `Label@2.5.1` | `ModernText@1.0.0` | Confirmed via `Text3`. `Label.Text` → `ModernText.Text` (same name). `Label.Size` → `Size` (same name). `Fill`, `Color`, `Font` also same names — `Font` still takes a `Font.'Family Name'` enum form (`Font.Georgia` seen, quoted only for multi-word families). ModernText is radius-capable (`RadiusTopLeft` etc.), unlike Label. `FontWeight`, `Align`, `VerticalAlign`, `Underline` are also present, matching Classic's names. |
| `Classic/Button@2.2.0` | `ModernButton@1.0.0` | Confirmed via `Button3`. `Classic/Button.OnSelect` → `ModernButton.OnSelect` (same name). Button fill/hover/pressed colour is no longer a `Fill`/`HoverFill`/`PressedFill`/`DisabledFill` set — it is `BasePaletteColor` plus `Appearance` (enum `ButtonAppearance.Outline` seen; note this is a distinct enum type from the plain `Appearance` used on TextInput/Dropdown). Radii use the same `RadiusTopLeft` etc. names as Classic. New properties not present on Classic: `Icon`, `IconRotation`, `IconStyle`, `Layout` (`=ButtonLayout.IconAfter`), `BorderStyle` (`=BorderStyle.Dotted`). |
| `Classic/TextInput@2.3.2` | `ModernTextInput@1.1.1` | Confirmed via `TextInput3`. `TextInput.Default` → `ModernTextInput.Default` (same name, confirmed) plus a new `Placeholder` property Classic did not have. Radii use the same `RadiusTopLeft` etc. names as Classic. Fill/colour use `BasePaletteColor` plus `Appearance` (`=Appearance.FilledLighter` seen), not Classic's `Fill`/`HoverFill` pair. `Mode: =TextMode.MultiLine` equivalent not yet seen on a configured instance — still unconfirmed. |
| `Classic/DropDown@2.3.1` | `ModernDropdown@1.0.2` | Confirmed via `Dropdown2`. `DropDown.Default` → `ModernDropdown.Default` (same name, confirmed). Radii use the same `RadiusTopLeft` etc. names. Fill/colour use `BasePaletteColor` plus `Appearance` (`=Appearance.Outline` seen), not Classic's `Chevron*`/`Selection*`/`Pressed*` colour set. `Items`/`Items.Value` not yet written on this instance — still unconfirmed. |
| `Classic/ComboBox` | `ModernCombobox@1.1.1` | No `Classic/ComboBox` instance exists anywhere in the source to compare against. `Combobox4` (configured) confirms `AccessibleLabel`, `BasePaletteColor`, `Color`, `Fill`, `Font` on the modern side, but `Items`/selection-value property names remain unconfirmed since no classic combo box exists to map from. |
| pills (`cmpPill` component) | `Badge@0.0.24` | Confirmed via `BadgeCanvas2`: `Content`, `Appearance` (`='BadgeCanvas.Appearance'.Ghost`), `Shape` (`='BadgeCanvas.Shape'.Square`), `ThemeColor` (`='BadgeCanvas.ThemeColor'.Danger`), `FontSize`, `FontColor`. `cmpPill`'s custom `Label`/`Tone`/`Fill` map to Badge's `Content`/`ThemeColor`/`BasePaletteColor` respectively — no shared property names between the two. |
| header bar (`wiHeader` `GroupContainer`) | `Header@0.0.44` | Confirmed via `Header2` for `Style` (`='Header.Style'.Light`), `Fill`, `FontColor`, `TitleFontSize`, `BorderRadiusBottomLeft/BottomRight/TopLeft/TopRight`. The title-text property name is still unconfirmed — `Header2` sets `TitleFontSize` but no title-text property, so it's unclear whether Studio would write `Title` or `Text` once one is set. |
| cards | `ModernCard@1.3.0` | Confirmed via `Card3` for `Subtitle`, `Description`, `DropShadow` (`=DropShadow.ExtraBold`), `Fill`. The title-text property name is still unconfirmed — `Card3` sets `TitleColor` but no title-text property, so it's unclear whether Studio would write `Title` or `Text` once one is set. |
| tabs | `ModernTabList@1.0.1` | No classic tab control is in use. `TabList1` shows only `X`/`Y`; `TabList2` (configured) confirms `AccessibleLabel`, `BasePaletteColor`, `Color`, `Default` (selected tab), `Font`, `FontWeight`, `Size`, `Underline` — the tab-items binding property is not yet written on this instance and remains unconfirmed. |
| tables (`wiNavList` etc. `Gallery@2.15.0`) | `ModernDataGrid@1.5.1` or `Table@1.0.278` | Gallery carries `Items`, `TemplateSize`, `ShowScrollbar`, `AccessibleLabel`. `DataGrid1`/`DataGrid2`/`Table1` all show only `X`/`Y` in the sample — column/`Items` binding property names for either modern control are unconfirmed. |

Most remaining "unconfirmed" lines above are because Screen1's instances of that modern control
were dropped onto the canvas and never configured, so Studio has not yet written any property
beyond `X`/`Y` (and occasionally `Height`) for them — `ModernCheckbox@1.0.1` (`Checkbox1`),
`ModernDataGrid@1.5.1`, `Table@1.0.278` and the `Items` binding on `ModernTabList@1.0.1`/
`ModernCombobox@1.1.1`/`ModernDropdown@1.0.2` fall into this group. The Header and ModernCard
title-text property names are a narrower case: both controls were otherwise configured
(`Header2`, `Card3`) but Craig never set a title, so Studio never wrote whatever property holds it.
Confirming the remaining names needs a further Studio round trip with each control actually set up,
per `RUNBOOK.md` section 4, "Controls".
