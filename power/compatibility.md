# Compatibility matrix

Surface by surface, how Waypoint is built on Power Platform, how sure we are, what it costs in
licences, and what to do when the first approach fails.

"Named formula" means it is already written in `app/Formulas.pa.yaml` and the control only binds to
it. "Gallery-in-gallery" means nested galleries, which are supported and slow; the cost note says how
slow. Confidence is high where the pattern is standard canvas work, medium where it depends on a
measurement, low where it depends on something outside the app.

Licence impact reads: **none** means the Power Apps per-app or per-user licence a maker already
needs for a Dataverse app; **premium connector** means it is inside that licence but the connector is
premium and needs to be approved by the environment's DLP policy; **PCF** means a code component,
which needs a solution and code components allowed in the environment; **Power BI** means a separate
Power BI Pro licence for anyone who looks at the tile.

## Shell and navigation

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| App shell, 1600 x 900 scaled to fit | App settings, Custom size, Scale to fit, lock aspect and orientation | High | None | None needed; this is the mock's own frame |
| App header, 48px | Horizontal `Container` with Text and icon Buttons | High | None | None |
| Nav rail, 240px and 56px collapsed | Creator Kit nav, else a `Gallery` of nav items in a `Container`, `Width` bound to a named formula | High | None | The plain Gallery is the fallback, and it is nearly as good |
| Light and dark | One named formula per token, switched on `varTheme`, saved with `SaveData` | High | None | Ship light only and add dark later; no control knows which theme it is in |
| Page head and scroll region | Vertical `Container`, fixed 64px head, one child at `Fill portions = 1` with its own scroll | High | None | Absolute positioning with a `Height` formula, if containers fight the layout |
| Present mode and Spotlight | Not carried over. Waypoint's power skin has no present mode | High | None | None |

## Pages and tabs

Ten screens, one per page of the mock. Tabs inside a page are a modern `Pivot`, or a `Gallery` of
buttons with `aria`-equivalent `AccessibleLabel` and a `varTab` variable; the Gallery is the safer
choice because the modern Pivot's styling is not fully themeable.

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| Command | Galleries over `SquadTable`, `EndedItems` and the delivery formulas, plus the Band component | High | None | None |
| Plan, the register | `Gallery` as a table, Toolbar of Dropdowns and a search `TextInput`, filters composed in one named formula | High | None | A `DataTable` control if column resizing matters more than styling |
| Plan, the drawer | `Container` pinned right at 420, `Visible` on `varDrawer` | High | None | A full screen, if the drawer crowds the register at 1600 wide |
| Work item, tabs Shape, Assess, Components, Value, Activity | Five Containers with `Visible` flags, `Edit form` inside each | High | None | One screen per tab, at the cost of the stepper's context |
| Work item, capacity check | `Gallery` over `CheckAssignees(varItem)` | Medium | None | Precompute `colFree` in `OnVisible`; if it is still slow, compute the check in a flow on save |
| Timeline, Sprint and Quarter readings | The sprint grid, below | Medium | None | See the grid row |
| Timeline, Sprints matrix | Gallery-in-gallery over `colSprintPlan`, at most eight sprints wide | High | None | A `DataTable` bound to a flattened collection |
| Timeline, Gaps matrix | `Gallery` over the person-week rows filtered to three free days or more | High | None | None |
| Team, tabs People, Squads, Absences, Reservations | Four Galleries and three Drawers, one `varTab` | High | None | None |
| Value, tabs Roll-up, Calendar, Actuals, Types | Gallery over `BenefitCalendarRows`, twelve month columns in an inner horizontal Gallery | Medium | None | Twelve `Text` controls in the row template instead of an inner Gallery: faster, uglier to maintain |
| Money | Two Galleries and a stat row over the cost tables | High | None | None |
| Close, tabs Close, History, Compare, Calibration, Outlook, Archive | Stat row, Galleries, the Close button behind a confirm dialog | High | None | None |
| Import, five steps | Stepper plus five Containers with `Visible` flags | Medium | Premium connector (SharePoint or Dataverse file, plus the flow) | Upload the file and let the flow do everything, with the app only showing progress |
| Settings, eight tabs | `Pivot` or tab Gallery, Edit forms and editable Galleries | High | None | Model-driven forms for the rarely used tabs, opened in a new window |

## Dialogs and drawers

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| Drawer (person, squad, absence, reservation, work item, calendar row, settings rows) | `Container` pinned right at 420 with a translucent `Rectangle` behind it, `SetFocus` on open | High | None | A dedicated screen |
| ConfirmDialog | Centred `Container` at 480, primary confirm button, the consequence spelled out in words | High | None | `Notify` with an undo, where the action is reversible |
| Escape to close | Not available: canvas cannot intercept Escape | High | None | A visible Close button on every drawer and dialog, which is the accessibility contract anyway |

## Grids, matrices and charts

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| Sprint grid (people down, weeks across) | Gallery-in-gallery-in-gallery over a precomputed `colGrid`, `TemplateFill` bound to one tone formula, capped at the quarter's 13 weeks | Medium | None | A dataset PCF, `wp_Waypoint.TimelineGrid`, three to five days including ALM; PCF licence note applies |
| Sprints matrix (squads down, sprints across) | Gallery-in-gallery over `colSprintPlan`, sprint labels in a separate header Gallery | High | None | `DataTable` over a flattened collection |
| Gaps matrix | `Gallery` over the free-day rows | High | None | None |
| Landing chart (benefit against target) | SVG string in an `Image` control, built by a named formula from `BenefitCalendarTotals`, with an `sr-only` `DataTable` beside it | Medium | None | A native line chart control, which cannot draw the target line the same way; or a Power BI tile |
| Month bars | SVG in an `Image`, or twelve `Rectangle` controls with `Height` bound to the month's value | High | None | The twelve rectangles are the fallback and are easier to make accessible |
| Sparklines (per squad, per sprint) | SVG in an `Image` inside the row template | Medium | None | A three-state Pill with the direction in words, which carries the same information |
| Any chart, accessible twin | A collapsed `DataTable` with the same numbers beside every chart | High | None | Not optional; it is the contract in the ccs-ui README |
| Executive reporting over the quarter | Power BI tile embedded on a screen | Low | Power BI | Keep it out of v1: the app's own galleries already show the figures |

Two cautions on the SVG route. Canvas builds the SVG as a data URI in an `Image.Image` property, and
the string has to be URL-encoded; a stray `#` in a colour breaks the picture silently. And the string
has a practical length limit in the tens of kilobytes, which the landing chart is well inside and a
full-year sparkline wall is not. Draw one chart per Image.

## Interaction components

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| Stepper (work item stages, import steps) | Canvas component with typed custom properties, as `app/Components.pa.yaml` has it | High | None | A horizontal Gallery of steps with a `varStep` variable |
| Split button (primary action plus a menu) | A Button and a chevron Button in a container, the menu a `Gallery` in a `Container` with `Visible` on a variable | Medium | None | Two plain buttons side by side. Canvas has no native split button and no native menu that closes on outside click |
| Chip picker (skills, assignees, filters) | A Gallery of selected chips plus a `ComboBox` with `SelectMultiple` for adding | Medium | None | A plain multi-select `ComboBox`, losing the chip look but keeping the behaviour |
| Pill, Band, Stat, SquadSnap | Canvas components, already specified | High | None | Plain containers |
| Toolbar | Horizontal `Container` of Dropdowns, ComboBoxes and a search input | High | None | None |
| Keyboard focus order | `TabIndex` on containers and first controls, `SetFocus` on open and close | Medium | None | Test with a keyboard on every screen; canvas focus order follows control creation order more than layout |

## Data in, data out, and the jobs

| Surface | How to build | Confidence | Licence | Fallback |
| --- | --- | --- | --- | --- |
| Import, Workday absence and Jira issue exports | File to SharePoint or Dataverse, a flow parses CSV or XLSX, maps columns, matches people and returns a preview; the app applies | Medium | Premium connector (the flow's connectors and, for XLSX, Excel Online or Office Scripts) | Ask for CSV only and parse it in Power Fx with `Split`, which handles simple files but not quoted commas |
| Column mapping profiles | A `wp_importprofile` row per source, read and written by the app | High | None | Hard-code the two known layouts |
| People matching (Core or File ID, then email, then name) | Named formulas over `colPeople` in the app, on the flow's preview rows | High | None | None |
| Quarter close | One flow, `Waypoint - Close quarter`, run behind a confirm dialog, idempotent, in a changeset | Medium | None | A Power Fx `ForAll(Patch(...))` sequence in the app, which is slower and not transactional |
| Activity log | Dataverse trigger flow per business table, moving to a plugin step for Work item, Reservation, Setting and Quarter if it has to be evidential | Medium | None | Write the log row from the app on each save, which a user with the wrong role can skip |
| Jira pull, read only | Copilot Studio topic over the Jira connector, into the same mapping flow in dry-run mode | Low | Premium connector, plus Copilot Studio capacity | A scheduled flow with a saved JQL filter and no conversation over it |
| Copilot break-down export for Rovo | A flow that emits a markdown brief for one work item, to a file or the clipboard | Medium | None, unless a generative action is added | Build the markdown in Power Fx with `Concat` and put it in a copyable `TextInput` |
| Copilot in-app question answering | Copilot Studio agent over the Dataverse tables | Low | Copilot Studio capacity | Leave it out. The numbers are the product, and an agent that paraphrases them is a liability |
| Engine parity | Named formulas in `app/Formulas.pa.yaml`, asserted by Test Studio against `tests/expected.json` | Medium | None | Compute the headline figures in a nightly flow and store them, if the app is ever too slow to work them out live |

## Build order

1. The proving slice in `build-guide.md`: six tables, the shell, Command, one work item screen, the
   simple named formulas, and the numbers held against the fixture by hand.
2. `Formulas.pa.yaml` in full, and the Test Studio suites in `tests/README.md` order. Everything
   after this point binds to formulas that are already proven.
3. Plan and the register, with the drawer. The most-used screen, and pure canvas.
4. Team, with its four tabs and the absence drawer.
5. The import flow, because Team and Plan both get worse without real data in them.
6. Timeline: the Sprints matrix first, which is cheap, then the sprint grid, which is not.
7. Value and Money, with the charts last and the accessible tables first.
8. Close and the close flow.
9. Settings, the activity log, then the Jira pull and the Rovo export.

## The three risks to prove first

1. **The date arithmetic.** The engine works in UTC so a day is always a day; Power Fx dates are
   local and cross a daylight saving boundary inside every Waypoint quarter. Prove it with the two
   timeline checksums, `TimelineAvailableTotal` 912.744 and `TimelineAssignedTotal` 483.168. If those
   two land, the rest of the engine is arithmetic over numbers that are already right.
2. **The sprint grid's performance.** Three nested galleries over a precomputed grid, 60 or so people
   by 13 weeks, is around 800 template instances. Build that one screen with the real seed and time
   it before committing to the gallery design, because the alternative is a PCF and a week.
3. **The cost of the capacity check.** `FreeFor` reads every booking the person has in the week, and
   the finish walk re-sums it for every candidate week. Build the work item screen for the
   double-booked case in the fixture, "Statement matching rules v2", and see whether it answers
   inside a second. If it does not, precompute `colFree` on `OnVisible`, and if that is still slow,
   move the check to a flow that writes its answer onto the row.
