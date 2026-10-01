# Audit 01a: typography census, sizes, weights and colours

## Method

All 12 app files by grep and awk extraction of every control name, control type and Size, FontWeight, Color, Font. No screen file read in full.

## Headline

There are no literals. Zero numeric Size, zero ColorValue, RGBA or hex in a font Color, zero FontColor, zero out-of-scale FontWeight. Preflight check 22 is holding. Craig's "random fonts" is role drift, not literals.

## Distinct values, all files

**Size:** TypeCaption 491, TypeBody 438, TypeSubtitle 51, TypeTitle 16, TypeBodySize 5, TypeNumberSize 2, TypeLabelSize 2, If(ThisItem.RowKind="group", TypeBody, TypeCaption) 2, TeamAvatarSize 1.

**FontWeight:** FontWeight.Semibold 479, TypeNumberWeight 2, TypeLabelWeight 2, TypeHeadingWeight 1. No Weight property exists.

**Color:** NeutralFg2 461, NeutralFg1 442, BrandFg 36, ColorFade(BrandFg, -0.2) 16, StatusBad 10, BrandBg 8, then about 35 single-use If(...) tone formulas. All token-based.

**Font:** FontUI 1038, TypeFace 9 (Components only).

**Literal counts per file:** 0 in every file for Size, Color and FontWeight. The only literal colour is Command.pa.yaml:1495 Color RGBA(0,0,0,0), the transparent hit-target button, legitimate; BorderColor RGBA(0,0,0,0) about 75 times is out of scope.

## Vocabularies

Two vocabularies. Components.pa.yaml alone uses the role aliases (TypeFace, TypeBodySize, TypeLabelSize, TypeNumberSize, Type*Weight); all 11 screens use the raw ramp names (TypeCaption, TypeBody, TypeSubtitle, TypeTitle) with hand-carried weights. That is the mechanism behind the drift below.

## Role by name class: majority then deviations

**Page h1 (<scr>Title):** TypeTitle + Semibold, all 11 screens. Clean.

**Shell brand (*HeaderName):** TypeSubtitle, all 12. Clean.

**Table headers (*Head*, *HeadTitle):** TypeCaption, 155. Clean.

**Gallery cells (*RowTitle, *Row*):** TypeBody, clean, compiler-owned.

**Field labels (*Label, *Lbl*):** Majority TypeCaption Semibold (106: FrontDoor 57, Settings 18, Team 16, Work 11, Financials 3, Benefits 1). Deviations: WorkItem 45 x TypeCaption Normal; Financials fnFig{InYear, Payback, Quarter, Recorded, Return, Tco}Label 6 x TypeBody; Settings.stCellAcLabel and QuarterClose.qcCaTotalLabel TypeBody Semibold; Command 1 x Normal. This is the biggest single cause.

**Section and card titles:** Majority TypeSubtitle (27). Deviations: WorkItem wiActualTitle, wiAssignTitle, wiCheckTitle, wiWalkTitle at TypeCaption and wiHypTitle, wiSendTitle at TypeBody, sitting beside wiShapeTitle, wiValueTitle, wiAssessTitle at TypeSubtitle, visibly smaller siblings on the same tab; Timeline tlAvailStripTitle TypeCaption vs tlAvailTitle TypeSubtitle; Command ccTitle and spTitle TypeBody.

***Value:** Majority TypeBody (17); Financials fn{Grade, Squad, Work}FootValue TypeCaption (footer, defensible).

***Total:** TypeBody 9, TypeCaption 4, split on row versus foot; no clear fault.

***Kicker, *Caption, *Count:** TypeCaption everywhere. Clean.

## Modern controls

Uniformly TypeBody (ModernTextInput 74, ModernDropdown 30, ModernCombobox 4, ModernTabList 7). ModernButton is TypeBody 64 but TypeCaption 14 (Timeline 7, Settings 5, WorkItem 2); Components' 3 use TypeBodySize. No Badge carries a size (correct). ModernAvatar.Size TeamAvatarSize is a dimension, not type.

## Rules and checks to add

1. A Label whose name ends Title and is not inside a gallery template carries TypeSubtitle, unless its name is exactly \<screenPrefix>Title (page h1), which carries TypeTitle + Semibold.

2. A Label whose name ends Label or contains Lbl carries TypeCaption + FontWeight.Semibold; no TypeBody, no implicit Normal.

3. A Label whose name contains Head and sits in a header row carries TypeCaption + Semibold + NeutralFg2.

4. Every Label declares an explicit Color (23 do not today: Timeline 10, Command 3, QuarterClose 3, Team 3, WorkItem 3, Components 1).

5. Size on a Label, ModernButton or input must be one of TypeTitle, TypeSubtitle, TypeBody, TypeCaption or a Type*Size alias; exempt ModernAvatar.Size.

6. Every ModernButton carries TypeBody; a TypeCaption button must be named *Small* to opt out (14 unnamed exceptions today).

7. Font is TypeFace everywhere or FontUI everywhere; pick one (9 vs 1038 today).

8. FontWeight must be FontWeight.Normal, Semibold, Bold or a Type*Weight name; paired check that TypeSubtitle and TypeTitle always carry Semibold (true today).

9. No literal colour in any Color; exempt a Classic/Button whose Text is "".
