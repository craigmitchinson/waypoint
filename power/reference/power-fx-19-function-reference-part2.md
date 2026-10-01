# Power Fx — Function Reference, Part 2 of 2 (Help–With by page order)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 50

## Contents

1. [Help function](#help-function)
2. [Host object in Power Apps](#host-object-in-power-apps)
3. [If and Switch functions](#if-and-switch-functions)
4. [Int, Round, RoundDown, RoundUp, and Trunc functions](#int-round-rounddown-roundup-and-trunc-functions)
5. [IsMatch, Match, and MatchAll functions](#ismatch-match-and-matchall-functions)
6. [IsNumeric function](#isnumeric-function)
7. [WeekNum and ISOWeekNum functions](#weeknum-and-isoweeknum-functions)
8. [Now, Today, IsToday, UTCNow, and UTCToday functions](#now-today-istoday-utcnow-and-utctoday-functions)
9. [JSON function](#json-function)
10. [Language function](#language-function)
11. [Launch and Param functions](#launch-and-param-functions)
12. [Left, Mid, and Right functions](#left-mid-and-right-functions)
13. [Len function](#len-function)
14. [Lower, Upper, and Proper functions](#lower-upper-and-proper-functions)
15. [Mod function](#mod-function)
16. [Notify function](#notify-function)
17. [ParseJSON function](#parsejson-function)
18. [Patch function](#patch-function)
19. [PDF function (experimental)](#pdf-function-experimental)
20. [Print function](#print-function)
21. [Rand and RandBetween functions](#rand-and-randbetween-functions)
22. [ReadNFC function](#readnfc-function)
23. [RecordInfo function](#recordinfo-function)
24. [RecordOf and Type functions](#recordof-and-type-functions)
25. [Refresh function](#refresh-function)
26. [Relate and Unrelate functions](#relate-and-unrelate-functions)
27. [Remove and RemoveIf functions](#remove-and-removeif-functions)
28. [Replace and Substitute functions](#replace-and-substitute-functions)
29. [RequestHide function](#requesthide-function)
30. [Reset function](#reset-function)
31. [Revert function](#revert-function)
32. [Select function](#select-function)
33. [Sequence function](#sequence-function)
34. [Set function](#set-function)
35. [SetFocus function in](#setfocus-function-in)
36. [SetProperty function](#setproperty-function)
37. [ShowHostInfo object in Power Apps](#showhostinfo-object-in-power-apps)
38. [Shuffle function](#shuffle-function)
39. [Sort and SortByColumns functions](#sort-and-sortbycolumns-functions)
40. [Split function](#split-function)
41. [Summarize function](#summarize-function)
42. [Table function](#table-function)
43. [Text function](#text-function)
44. [Trace function](#trace-function)
45. [Trim and TrimEnds functions](#trim-and-trimends-functions)
46. [Update and UpdateIf functions](#update-and-updateif-functions)
47. [UpdateContext function](#updatecontext-function)
48. [User function](#user-function)
49. [Validate function](#validate-function)
50. [With function](#with-function)

---

## Help function

Source: [function-help.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-help)

*Reference information including syntax and examples for the Help function.*

# Help function
**Applies to:** 
- ✓ Power Platform CLI



Displays help information for command line Power Fx hosts.

## Description

The **Help** function displays helpful information when working with command line Power Fx hosts, such as the [Power Platform CLI](../../developer/cli/introduction.md).  

The output information includes the list of functions available and any details specific to the host. This output is updated as more guidance and new functions are added.

> [!NOTE]
> Most Power Fx hosts do not provide a **Help** function, relying on the formula bar and Power Fx documentation.

## Syntax

**Help**()

## Examples

1. Install [Power Platform CLI](../../developer/cli/introduction.md).
1. From the command line, start the [Power Fx repl](../../developer/cli/reference/power-fx.md) (interactive Power Fx Read-Eval-Print Loop) using `pac power-fx repl`.
1. Run the function `Help()`.  

```
C:\>pac power-fx repl
Power Fx REPL: x.x.x

>> Help()
Available functions (case sensitive):
  Abs             Acos            Acot            AddColumns      And
  Asin            AsType          Atan            Atan2           Average
  Blank           Boolean         Char            Clear           ClearCollect
  ...
  Text            Time            TimeValue       TimeZoneOffset  Today
  Trim            TrimEnds        Trunc           Upper           Value
  VarP            Weekday         With            Year

Formula reference: https://aka.ms/Power-Fx-Formula-Reference

true

>>
```

---

## Host object in Power Apps

Source: [object-host.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/object-host)

*Reference information including syntax and examples for the Host object in Power Apps.*

# Host object in Power Apps
**Applies to:** 
- ✓ Canvas apps



The **Host** object in Power Apps provides information about the current host running the app.

## Description

The **Host** object provides information about the host device, operating system, and player that is running an app.  **Host** is similar to [the **App** object](object-app.md) and every app has access to this information.

One of the best uses of **Host** is to debug an app that isn't working properly on a specific device or with a specific browser.  Use the text properties of this object to display information in the app's UI with a [**Text label**](/power-apps/maker/canvas-apps/controls/control-text-box) control or log the information to a database table or to [Application Insights](/power-platform/admin/overview-integration-application-insights).

It's tempting to use **Host** to tailor an app to a specific device or browser.  This is dangerous as Power Apps is designed to be run on a wide spectrum of hardware and software platforms and your **Host** based logic may not account for them all and they will change over time.  The better approach is to use information that is more abstracted and not tied to specific hardware and software. For example, use the [**Size**](/power-apps/maker/canvas-apps/controls/control-screen#additional-properties) property of the **Screen** control to tailor a screen to show less or reorganize information when running on a smaller device such as a phone.

To access the **Host** object in Power Apps Studio, expand the [**App**](object-app.md) object at the top of the **Tree view** pane and then select **Host**. In this example, the **Host** object doesn't have any properties that accept formulas.

> [!div class="mx-imgBorder"]
> ![The Host object in the Tree view pane.](media/object-host/hostobject.png)

> [!NOTE]
> The host object is currently only available in custom pages and canvas apps.

## BrowserUserAgent property

The text property **BrowserUserAgent** contains the complete user agent string that the browser uses to identify itself when running the app.

For example, a browser user agent string might be:

- Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
- AppleWebKit/537.36 (KHTML, like Gecko) 
- Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78

> [!NOTE]
> If you're running Power Apps in a native app or using the [wrap](/power-apps/maker/common/wrap/wrap-how-to) feature in Power Apps, the app is presented via a browser control, which supplies a user agent string.

## OSType property

The **OSType** property provides the name of the operating system where the app is running. The **OSType** is determined from the user agent string sent by the browser to Power Apps. The following are examples of common values for **OSType**:

| Value |
| --- |
| Windows |
| Mac OS |
| iOS |
| Android |
| Linux |
| ... |

> [!NOTE]
> Don't use the **OSType** to change experience or functionality of your app based on the reported operating system.

The **OSType** text can be used in any formula, such as showing it in a label's text property:

```power-fx
Label1.Text: "You're running " & Host.OSType
```

## SessionID property
The **SessionID** property returns the GUID that identifies the current session. Include this information when reporting problems to your administrator.

> [!NOTE]
> In embedded scenarios such as Power Apps in Power BI, the SessionID property returns the underlying Power Apps session ID, not the Power BI session ID.

```power-fx
Label1.Text: $"Provide session ID { Host.SessionID } to your administrator."
```

## TenantID property

The **TenantID** property provides the Globally Unique Identifier (GUID) that specifies the Microsoft Entra tenant associated with the presently authenticated user.

> [!NOTE]
> Similar to **SessionID**, in embedded scenarios such as Power Apps in Power BI, the tenant ID is the tenant used for the Power Apps session authentication.

```power-fx
Label1.Text: Host.TenantID
```

## Version property

The **Version** property provides the identification and version number of the Power Apps player.  Similar to **BrowserUserAgent**, more than one version number may be returned, separated by spaces.

> [!NOTE]
> The **Version** property is always an empty string when working in Power Apps Studio.

```power-fx
Label1.Text: Host.Version
```
## OfflineEnabled property

The **OfflineEnabled** property provides the runtime mode of the app in the Power Apps player. For apps that are not enabled for offline, the property is always false. For apps that are [enabled for offline](/power-apps/mobile/canvas-mobile-offline-overview) the property is false on the web, but true on iOS, Android, and Windows.  

> [!NOTE]
> Even if a canvas app doesn't function without network connectivity, the **OfflineEnabled** property remains true in Power Apps Studio for canvas apps that have been enabled for offline use.

```power-fx
Label1.Text: Host.OfflineEnabled
```
## Examples

1. Create a new Canvas app.
1. Add a **Text label** control and set the `Text` property to `"Host.BrowserUserAgent: " & Host.BrowserUserAgent`.
1. Add a **Text label** control and set the `Text` property to `"Host.OSType: " & Host.OSType`.
1. Add a **Text label** control and set the `Text` property to `"Host.SessionID: " & Host.SessionID`.
1. Add a **Text label** control and set the `Text` property to `"Host.TenantID: " & Host.TenantID`.
1. Add a **Text label** control and set the `Text` property to `"Host.Version: " & Host.Version`.
1. Add a **Text label** control and set the `Text` property to `"Host.OfflineEnabled: " & Host.OfflineEnabled`.

Run your app on different devices and with different browsers and you will see results similar to the below.

### Power Apps Studio on Windows with Edge browser

**Host.Version** is always blank when working in Power Apps Studio.

```
Host.BrowserUserAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.76
Host.OSType: Windows
Host.SessionID: ee2eed1a-8455-4e68-a433-a709302d0c71
Host.TenantID: aaaabbbb-0000-cccc-1111-dddd2222eeee
Host.Version: 
```

### Power Apps native mobile player on iOS

```
Host.BrowserUserAgent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 PowerApps/e1c23ff9-4822-4e75-a003-01c91407a4d2
Host.OSType: Windows
Host.SessionID: 3ebec22f-ee2e-412a-b3eb-45d97db34863
Host.TenantID: aaaabbbb-0000-cccc-1111-dddd2222eeee
Host.Version: PowerApps-Native/3.23084.8(iOS)
```

### Power Apps web player on Windows with Firefox browser

```
Host.BrowserUserAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0
Host.OSType: Windows
Host.SessionID: 283309a4-d88b-4b2a-88de-73b47d1b62d0
Host.TenantID: aaaabbbb-0000-cccc-1111-dddd2222eeee
Host.Version: PowerApps-Web/3.23084.6(Windows)
```

### Power Apps web player on iOS with Safari browser

```
Host.BrowserUserAgent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
Host.OSType: iOS
Host.SessionID: a09a946d-ce71-4c1f-bd35-519c79849c8d
Host.TenantID: aaaabbbb-0000-cccc-1111-dddd2222eeee
Host.Version: PowerApps-Web/3.23084.6(iOS)
```

---

## If and Switch functions

Source: [function-if.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-if)

*Reference information including syntax and examples for the If and Switch functions.*

# If and Switch functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Determines whether any condition in a set is true (**If**) or the result of a formula matches any value in a set (**Switch**) and then returns a result or executes an action.

## Description

The **If** function tests one or more conditions until a **true** result is found. If such a result is found, a corresponding value is returned. If no such result is found, a default value is returned. In either case, the returned value might be a string to show, a formula to evaluate, or another form of result.

The **Switch** function evaluates a formula and determines whether the result matches any value in a sequence that you specify. If a match is found, a corresponding value is returned. If no match is found, a default value is returned. In either case, the returned value might be a string to show, a formula to evaluate, or another form of result.

**If** and **Switch** are very similar, but you should use the best function for your situation:

- Use **If** to evaluate a single condition. The most common syntax for this function is **If**( _Condition_, _ThenResult_, _DefaultResult_ ), which provides the common "if … then … else …" pattern seen in other programming tools.
- Use **If** to evaluate multiple unrelated conditions. In Power Apps (unlike Microsoft Excel), you can specify multiple conditions without having to nest **If** formulas.
- Use **Switch** to evaluate a single condition against multiple possible matches. You can also use **If** in this case, but you'd need to repeat the formula for each possible match.

You can use both of these functions in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth) to branch between two or more actions. Only one branch will trigger an action. Conditions and matches are evaluated in order, and they stop if a condition is **true** or a match is found.

_Blank_ is returned if no conditions are **true**, no matches are found, and you don't specify a default result.

## Syntax

**If**( _Condition_, _ThenResult_ [, *DefaultResult* ] )<br>**If**( _Condition1_, _ThenResult1_ [, _Condition2_, _ThenResult2_, ... [ , *DefaultResult* ] ] )

- _Condition(s)_ - Required. Formula(s) to test for **true**. Such formulas commonly contain comparison [operators](operators.md) (such as **<**, **>**, and **=**) and test functions such as **[IsBlank](function-isblank-isempty.md)** and **[IsEmpty](function-isblank-isempty.md)**.
- _ThenResult(s)_ - Required. The corresponding value to return for a condition that evaluates to **true**.
- _DefaultResult_ - Optional. The value to return if no condition evaluates to **true**. If you don't specify this argument, _blank_ is returned.

**Switch**( _Formula_, _Match1_, _Result1_ [, _Match2_, _Result2_, ... [, *DefaultResult* ] ] )

- _Formula_ - Required. Formula to evaluate for matches. This formula is evaluated only once.
- _Match(s)_ - Required. Values to compare with the result from _Formula_. If an exact match is found, the corresponding _Result_ is returned.
- _Result(s)_ - Required. The corresponding value to return when an exact match is found.
- _DefaultResult_ - Optional. If an exact match isn't found, this value is returned. If you don't specify this argument, _blank_ is returned.

## Examples

### Values in formulas

In the following examples, a **Slider** control (named **Slider1**) has a value of **25**.

| Formula                                                                                                  | Description                                                                                                                                                                                                                         | Result          |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **If( Slider1.Value&nbsp;=&nbsp;25, "Result1" )**                                                        | The condition is **true**, and the corresponding result is returned.                                                                                                                                                                | "Result1"       |
| **If( Slider1.Value&nbsp;=&nbsp;25, "Result1", "Result2" )**                                             | The condition is **true**, and the corresponding result is returned.                                                                                                                                                                | "Result1"       |
| **If( Slider1.Value&nbsp;>&nbsp;1000, "Result1" )**                                                      | The condition is **false**, and no _DefaultResult_ was provided.                                                                                                                                                                    | _blank_         |
| **If( Slider1.Value&nbsp;>&nbsp;1000, "Result1", "Result2" )**                                           | The condition is **false**, a _DefaultResult_ was provided, and it's returned.                                                                                                                                                      | "Result2"       |
| **If( Slider1.Value&nbsp;=&nbsp;25, "Result1", Slider1.Value&nbsp;>&nbsp;0, "Result2" )**                | The first condition is **true**, and the corresponding result is returned. The second condition is also **true**, but it isn't evaluated because it appears later in the argument list than a condition that evaluates to **true**. | "Result1"       |
| **If( IsBlank(&nbsp;Slider1.Value&nbsp;), "Result1", IsNumeric(&nbsp;Slider1.Value&nbsp;), "Result2" )** | The first condition is **false** because the slider isn't _blank_. The second condition is **true** because the slider's value is a number, and the corresponding result is returned.                                               | "Result2"       |
| **If( Slider1.Value&nbsp;>&nbsp;1000, "Result1", Slider1.Value&nbsp;>&nbsp;50, "Result2", "Result3")**   | Both the first and second conditions are **false**, a _DefaultResult_ was provided, and it's returned.                                                                                                                              | "Result3"       |
| **Switch( Slider1.Value, 25, "Result1" )**                                                               | The slider's value matches the first value to be checked, and the corresponding result is returned.                                                                                                                                 | "Result1"       |
| **Switch( Slider1.Value, 20, "Result1", 25, "Result2", 30, "Result3" )**                                 | The slider's value matches the second value to be checked, and the corresponding result is returned.                                                                                                                                | "Result2"       |
| **Switch( Slider1.Value, 20, "Result1", 10, "Result2", 0, "Result3", "DefaultResult" )**                 | The slider's value doesn't match any value to be checked. A _DefaultResult_ was provided, so it's returned.                                                                                                                         | "DefaultResult" |

### Branching in behavior formulas

In these examples, a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control named **FirstName** has the value "John" typed into it.

| Formula                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                        | Result                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **If( ! IsBlank( FirstName.Text ), Navigate(&nbsp;Screen1, ScreenTransition.None ) )**                                                                                                             | The condition is **true**, so the **[Navigate](function-navigate.md)** function runs. You can use the **[IsBlank](function-isblank-isempty.md)** function to test whether a required form field has been filled in. If **FirstName** were [blank](function-isblank-isempty.md), this formula would have no effect. | **true**<br><br>The display is changed to **Screen1**.                         |
| **If( IsBlank( FirstName.Text ), Navigate(&nbsp;Screen1, ScreenTransition.None ), Back() )**                                                                                                       | Without the **!** operator, the condition is **false**, so the **[Navigate](function-navigate.md)** function doesn't run. The **[Back](function-navigate.md)** function was provided as a _DefaultResult_, so it runs.                                                                                             | **true**<br><br>The display goes back to the screen that was previously shown. |
| **Switch( FirstName.Text, "Carlos", Navigate(&nbsp;Screen1, ScreenTransition.None ), "Kirstin", Navigate( Screen2, ScreenTransition.None ), "John", Navigate( Screen3, ScreenTransition.None ) )** | The value of **FirstName.Text** is compared against "Carlos", "Kirstin", and "John" in that order. A match is found with "John", so the app navigates to **Screen3**.                                                                                                                                              | **true**<br><br>The display is changed to **Screen3**.                         |

### Step by step

1. Add a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control, and name it **Text1** if it doesn't have that name by default.
2. In **Text1**, type **30**.
3. Add a **Label** control, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
   **If( Value(Text1.Text) < 20, "Order MANY more!", Value(Text1.Text) < 40, "Order more!", Text1.Text )**

   The **Label** control shows **Order more!** because the value of **Text1** is more than 20 but less than 40.

4. In **Text1**, type **15**.

   The **Label** control shows **Order MANY more!** because the value of **Text1** is less than 20.

5. In **Text1**, type **50**.

   The **Label** control shows the value that you typed because it's more than 40.

---

## Int, Round, RoundDown, RoundUp, and Trunc functions

Source: [function-round.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-round)

*Reference information, including syntax, for the Int, Round, RoundDown, RoundUp, and Trunc functions*

# Int, Round, RoundDown, RoundUp, and Trunc functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Rounds a number.

## Round, RoundDown, and RoundUp

The **Round**, **RoundDown**, and **RoundUp** functions round a number to the specified number of decimal places:

- **Round** rounds up if the next digit is 5 or higher. Otherwise, this function rounds down.
- **RoundDown** always rounds down to the previous lower number, towards zero.
- **RoundUp** always rounds up to the next higher number, away from zero.

The number of decimal places can be specified for these functions:

| Decimal places | Description                                                  | Example                           |
| -------------- | ------------------------------------------------------------ | --------------------------------- |
| Greater than 0 | The number is rounded to the right of the decimal separator. | `Round( 12.37, 1 )` returns 12.4. |
| 0              | The number is rounded to the nearest integer.                | `Round( 12.37, 0 )` returns 12.   |
| Less than 0    | The number is rounded to the left of the decimal separator.  | `Round( 12.37, -1 )` returns 10.  |

## Int and Trunc

The **Int** and **Trunc** functions round a number to an integer (whole number without a decimal):

- **Int** rounds down to the nearest integer.
- **Trunc** truncates the number to just the integer portion by removing any decimal portion.

The difference between **Int** and **Trunc** is in the handling of negative numbers. For example, for an argument of `-4.3`, **Int** will return the integer further away from zero, `-5`, while **Trunc** will return the integer closer to zero, `-4`. **Int** returns values that are unique amongst the five rounding functions, while **Trunc** returns the same values as **RoundDown**.

Use **Trunc** to extract the decimal portion of a number by subtracting it from the original, for example `X - Trunc(X)`.

Decimal places cannot be specified with **Trunc** as it can with Microsoft Excel. Use **RoundDown** instead when this is needed.

## Single-column tables

These functions support single-column tables. If you pass a single number, the return value is the rounded version of that number. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains numbers, the return value is a single-column table of rounded numbers. The _DecimalPlaces_ parameter can be a single value or a single-column table. If the single-column table has less values that the _Number_, zero is used for the remaining values. Use [**ShowColumns**](function-table-shaping.md) and other table shaping functions to extract a single-column table from a larger table.

## Syntax

**Round**(_Number_, _DecimalPlaces_)<br>**RoundDown**(_Number_, _DecimalPlaces_)<br>**RoundUp**(_Number_, _DecimalPlaces_)

- _Number_ - Required. The number to round.
- _DecimalPlaces_ - Required. Number of decimal places to round to. Use a positive value to indicate decimal places right of the decimal separator, a negative value to the left, and zero for a whole number.

**Int**(_Number_)<br>**Trunc**(_Number_)

- _Number_ - Required. The number to be rounded to an integer.

## Examples

Rounding to a whole number.

| `X`  | `Round( X, 0 )` | `RoundUp( X, 0 )` | `RoundDown( X, 0 )` | `Int( X )` | `Trunc( X )` |
| :--: | :-------------: | :---------------: | :-----------------: | :--------: | :----------: |
| 7.9  |        8        |         8         |          7          |     7      |      7       |
| -7.9 |       -8        |        -8         |         -7          |     -8     |      -7      |
| 7.5  |        8        |         8         |          7          |     7      |      7       |
| -7.5 |       -8        |        -8         |         -7          |     -8     |      -7      |
| 7.1  |        7        |         8         |          7          |     7      |      7       |
| -7.1 |       -7        |        -8         |         -7          |     -8     |      -7      |

Rounding to two decimal places to the right of the decimal separator (0.01).

|   `X`   | `Round( X, 2 )` | `RoundUp( X, 2 )` | `RoundDown( X, 2 )` |
| :-----: | :-------------: | :---------------: | :-----------------: |
| 430.123 |     430.12      |      430.13       |       430.12        |
| 430.125 |     430.13      |      430.13       |       430.12        |
| 430.128 |     430.13      |      430.13       |       430.12        |

Rounding to two decimal places to the left of the decimal separator (100).

|   `X`   | `Round( X, -2 )` | `RoundUp( X, -2 )` | `RoundDown( X, -2 )` |
| :-----: | :--------------: | :----------------: | :------------------: |
| 430.123 |       400        |        500         |         400          |
| 449.942 |       400        |        500         |         400          |
| 450.000 |       500        |        500         |         400          |
| 450.124 |       500        |        500         |         400          |
| 479.128 |       500        |        500         |         400          |

Rounding a single-column table of values.

|                  `X`                  |        `Int( X )`         |          `Round( X, 2 )`           | `RoundDown( X, [ 0, 1, 2 ] )`  |    `RoundUp( X, [ 2 ] )`     |
| :-----------------------------------: | :-----------------------: | :--------------------------------: | :----------------------------: | :--------------------------: |
| [ 123.456, <br>987.593, <br>542.639 ] | [ 123, <br>987, <br>542 ] | [ 123.46, <br>987.59, <br>542.64 ] | [ 123, <br>987.5, <br>542.63 ] | [ 123.46, <br>988, <br>543 ] |

---

## IsMatch, Match, and MatchAll functions

Source: [function-ismatch.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ismatch)

*Reference information including syntax and examples for the IsMatch, Match, and MatchAll functions.*

# IsMatch, Match, and MatchAll functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Tests for a match or extracts parts of a text string based on a pattern.

## Description

The **IsMatch** function tests whether a text string matches a pattern that can comprise ordinary characters, predefined patterns, or a [regular expression](#regular-expressions). The **Match** and **MatchAll** functions return what was matched, including submatches.

Use **IsMatch** to validate what a user typed in a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control. For example, confirm whether the user entered a valid email address before the result is saved to your data source. If the entry doesn't match your criteria, add other controls that prompt the user to fix the entry.

Use **Match** to extract the first text string that matches a pattern and **MatchAll** to extract all text strings that match. Extract submatches to parse complex strings.

**Match** returns a record of information for the first match found, and **MatchAll** returns a table of records for every match found. The record or records contain:

| Column                                       | Type                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _named sub&#8209;match or sub&#8209;matches_ | Text                                           | Each named submatch has its own column. Create a named submatch by using **(?&lt;_name_&gt;**...**)** in the regular expression. If a named submatch has the same name as one of the predefined columns, the submatch takes precedence, and a warning is generated. Rename the submatch to avoid this warning.                                                                                                                                         |
| **FullMatch**                                | Text                                           | All of the text string that was matched.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **StartMatch**                               | Number                                         | The starting position of the match within the input text string. The first character of the string returns 1.                                                                                                                                                                                                                                                                                                                                                             |
| **SubMatches**, only if **MatchOptions.NumberedSubMatches** is used.                               | Single-column table of Text (column **Value**) | The table of numbered submatches in the order in which they appear in the regular expression. Generally, named submatches are easier to work with and are encouraged. Use the [**ForAll**](function-forall.md) function or [**Index**](function-first-last.md) function to work with an individual sub-match. If no submatches are defined in the regular expression, this table will be present but empty. |

These functions support [**MatchOptions**](#match-options). By default:

- These functions perform a case-sensitive match. Use **MatchOptions.IgnoreCase** to perform case-insensitive matches.
- **IsMatch** matches the entire text string (**Complete** MatchOption), while **Match** and **MatchAll** search for a match anywhere in the text string (**Contains** MatchOption). Use **Complete**, **Contains**, **BeginsWith**, or **EndsWith** as appropriate for your scenario.

**IsMatch** returns _true_ if the text string matches the pattern or _false_ if it doesn't. **Match** returns _blank_ if no match is found that can be tested with the [**IsBlank**](function-isblank-isempty.md) function. **MatchAll** returns an empty table if no match is found that can be tested with the [**IsEmpty**](function-isblank-isempty.md) function.

If you use **MatchAll** to split a text string, consider using the **[Split](function-split.md)** function, which is simpler and faster.

## Patterns

The key to using these functions is in describing the pattern to match. You describe the pattern in a text string as a combination of:

- Ordinary characters, such as **"abc"** or **"123"**.
- Predefined patterns, such as **Letter**, **MultipleDigits**, or **Email**. (The **Match** enum defines these patterns.)
- Regular-expression codes, such as **"\d+\s+\d+"** or **"[a-z]+"**.

Combine these elements using the [string-concatenation operator **&**](operators.md). For example, **"abc" & Digit & "\s+"** is a valid pattern that matches the characters "a", "b", and "c", followed by a digit from 0 to 9, followed by at least one whitespace character.

### Ordinary characters

The simplest pattern is a sequence of ordinary characters that match exactly.

For example, when used with the **IsMatch** function, the string "Hello" matches the pattern **"Hello"** exactly. No more and no less. The string `"hello!"` doesn't match the pattern because of the exclamation point on the end and because the case is wrong for the letter "h". (See [Match options](#match-options) for ways to modify this behavior.)

In the pattern language, the characters `. ? * + ( ) [ ] ^ $ | \` are reserved for special purposes. To use these characters, either prefix the character with a **\\** (backslash) to indicate that the character should be taken literally, or use one of the predefined patterns. For example, you can match the string `"Hello?"` by using the pattern `"Hello\\?"` with a backslash before the question mark.

### Predefined patterns

Predefined patterns provide a simple way to match either one of a set of characters or a sequence of multiple characters. Use the [string-concatenation operator **&**](operators.md) to combine your own text strings with members of the **Match** enum:

| Match enum            | Description                                                                                              | Regular expression    |
| --------------------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| **Any**               | Matches any character.                                                                                   | `.`                   |
| **Comma**             | Matches a comma `,`.                                                                                         | `,`                   |
| **Digit**             | Matches a single digit ("0" through "9").                                                                | `\d`                  |
| **Email**             | Matches an email address that contains an "at" symbol ("\@") and a domain name that contains a dot (".") | *See note* |
| **Hyphen**            | Matches a hyphen.                                                                                        | `-` *See note*               |
| **LeftParen**         | Matches a left parenthesis `(`.                                                                          | `\(`                  |
| **Letter**            | Matches a letter.                                                                                        | `\p{L}`               |
| **MultipleDigits**    | Matches one or more digits.                                                                              | `\d+`                 |
| **MultipleLetters**   | Matches one or more letters.                                                                             | `\p{L}+`              |
| **MultipleNonSpaces** | Matches one or more characters that don't add whitespace (not space, tab, or newline).                          | `\S+`                 |
| **MultipleSpaces**    | Matches one or more characters that add whitespace (space, tab, or newline).                             | `\s+`                 |
| **NonSpace**          | Matches a single character that doesn't add whitespace.                                                  | `\S`                  |
| **OptionalDigits**    | Matches zero, one, or more digits.                                                                       | `\d*`                 |
| **OptionalLetters**   | Matches zero, one, or more letters.                                                                      | `\p{L}*`              |
| **OptionalNonSpaces** | Matches zero, one, or more characters that don't add whitespace.                                         | `\S*`                 |
| **OptionalSpaces**    | Matches zero, one, or more characters that add whitespace.                                               | `\s*`                 |
| **Period**            | Matches a period or dot `.`.                                                                           | `\.`                  |
| **RightParen**        | Matches a right parenthesis `)`.                                                                         | `\)`                  |
| **Space**             | Matches a character that adds whitespace.                                                                | `\s`                  |
| **Tab**               | Matches a tab character.                                                                                 | `\t`                  |

For example, the pattern **"A" & MultipleDigits** matches the letter "A" followed by one or more digits.

Power Apps uses a different definition for **Match.EMail** and **Match.Hyphen**. Evaluate `Text( Match.Email )` to see the regular expression used by your host.

### Regular expressions

The pattern they these functions use is called a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). Power Fx's specific dialect of regular expressions is detailed in [Regular expressions in Power Fx](../regular-expressions.md).

Regular expressions are powerful and serve a wide variety of purposes. They can also look like a random sequence of punctuation marks. This article doesn't describe all aspects of regular expressions, but a wealth of information, tutorials, and tools are available online.

Regular expressions have a long history and are available in many programming languages. Every programming language has its own dialect of regular expressions, and there are few standards. We strive to ensure the same regular expression gives the same result across all Power Fx implementations. Compatibility isn't easy to accomplish as Power Fx runs on top of JavaScript and .NET which have significant differences. To accommodate running on different platforms, Power Fx regular expressions are limited to a subset of features that are widely supported across the industry.

As a result, some regular expressions that may work in other environments may be blocked or require a tweak in Power Fx. Authoring time errors are reported as unsupported features are encountered. This is one of the reasons that the regular expression and options must be an authoring time constant and not dynamic (for example, provided in a variable).

> [!NOTE]
> Power Apps uses an earlier version of Power Fx regular expressions that has fewer limitations but also fewer features. **MatchOptions.DotAll** and **MatchOptions.FreeSpacing** aren't available and the definitions of **Match.Email** and **Match.Hyphen** are different. Unicode surrogate pairs aren't treated as a single character. **MatchOptions.NumberedSubMatches** is the default. The version of regular expressions described here will be available in Power Apps soon, under a "Power Fx V1.0 compatibility" switch.

Here are some basic elements of regular expressions that build up complexity in parsing a number.

| Feature | Example | Description |
|---------|---------|-------------|
| Predfined character class | `\d` | This regular expression matches a single number, such as `1`. A character class matches a set of characters and `\d` matches the standard digits `0` to `9` and also digits defined in the Unicode character category "Nd". There are character classes for letters and numbers with `\w` and spaces including newlines with `\s`. There are also inverse character classes that are capitalized: `\D` matches everything that `\d` does not. |
| One or More | `\d+` | This regular expression matches one or more numbers, such as `123`. A `+` after an element says "one or more" of the last element. |
| Zero or One | `\+?\d` | This regular expression matches an optional `+` sign followed by one ore more numbers, such as `+123` as well as just `123`. A `?` after an element says "this is optional, it can occur zero or one time". The `+` has a backslash before it to distinguish it as a literal character rather than the "one or more" usage. |
| Grouping and alternation | `(-|\+)?\d+` | This regular expression matches either an `+` sign or a `-`, optionally, and then a series of numbers, such as `-123`, `+123`, and `123`. We are introducing two concepts here that are often used together. First, we have the parenthesis that group as set of elements together, for the `?` to act upon. Second, we have `|` which says "either this or that".  |
| Custom character class | `(-|\+)?\d+[eE][\-\+]?\d+` | This regular expression adds an exponent to the mix with two character classes, matching `+123e-12`. A character class is like `|` alternation providing a "match one of these things" in a more compact form. As with the `+`, `-` has special meaning in regular expression character classes so we need to escape it. |
| Zero or More  | `(-|\+)?\d+\.?\d*[eE][\-\+]?\d+` | This regular expression adds the decimal after the integer portion of the number, such as `-123.456e-89` or `-123.E+32`. The `\d` after the decimal point has a `*` quantifier that says "zero or more times" for decimal digits after the `.` |
| Capture groups  | `(?&lt;number&gt;(-|\+)?\d+\.?\d*)[eE](?&lt;exponent&gt;[\-\+]?\d+)` | Finally, we add capture groups for `number` and `exponent`. Not only can a regular expression match the entire string, it can also extract portions for use in your formulas, in this case the part before the `e` (or `E`) and the part after. |

These examples only give a small taste of what regular expressions can do. They are commonly used to validate ID numbers, email addresses, phone numbers, dates and times, and to extract information from all kinds of text files. Continue your journey by reading [Regular expressions in Power Fx](../regular-expressions.md), experiment, and use the web to learn more.

## Match options

Modify the behavior of these functions by specifying one or more options, which you combine using the string- concatenation operator (**&amp;**).

| MatchOptions enum | Description                                                                                                                | Impact on a regular expression                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **MatchOptions.BeginsWith**    | The pattern must match from the beginning of the text.                                                                     | Adds a **^** to the start of the regular expression.                                                                       |
| **MatchOptions.Complete**      | Default for **IsMatch** on Power Apps. The pattern matches the entire string of text, from beginning to end.                          | Adds a **^** to the start and a **$** to the end of the regular expression.                                                |
| **MatchOptions.Contains**      | Default for **Match** and **MatchAll**, and **IsMatch** outside of Power Apps. The pattern must appear somewhere in the text but doesn't need to begin or end it. | Doesn't modify the regular expression.                                                                                     |
| **MatchOptions.DotAll**      | Changes the behavior of the `.` (dot) operator to match all characters, including newline characters. Not available in Power Apps. | Doesn't modify the regular expression. This option is the equivalent of the standard "s" modifier for regular expressions.                                                                        |
| **MatchOptions.EndsWith**      | The pattern must match the end of the string of text.                                                                      | Adds a **$** to the end of the regular expression.                                                                         |
| **MatchOptions.FreeSpacing**    | Whitespace characters, including newlines, are ignored in the regular expression. End-of-line comments beginning with a `#` are ignored. Not available in Power Apps. | Only changes how the regular expression syntax. This option is the equivalent of the standard "x" modifier for regular expressions. |
| **MatchOptions.IgnoreCase**    | Treats uppercase and lowercase letters as identical. By default, matching is case sensitive.                               | Doesn't modify the regular expression. This option is the equivalent of the standard "i" modifier for regular expressions. |
| **MatchOptions.Multiline**     | Changes the behavior of `^` and `$` to match at the end of aline.                                                                                             | Doesn't modify the regular expression. This option is the equivalent of the standard "m" modifier for regular expressions. |
| **MatchOptions.NumberedSubMatches**     | Named captures are preferred because they are easier to understand and maintain. Performance also improves as unneeded captures aren't retained.  But for older regular expressions, treats each set of parenthesis as a numbered capture that is included with the **SubMatches** table in the result. Default in Power Apps. | Doesn't modify the regular expression. Named captures are disabled and `\1` style back references are enabled. |

Using **MatchAll** is the same as using the standard "g" modifier for regular expressions.

## Syntax

**IsMatch**( _Text_, _Pattern_ [, *Options* ] )

- _Text_ – Required. The text string to test.
- _Pattern_ – Required. The pattern to test as a text string. Concatenate predefined patterns that the **Match** enum defines or provide a regular expression. _Pattern_ must be a constant formula without variables, data sources, or other dynamic references that change as the app runs. Note, that the formula must be expressed as "Match.PredefinedPattern" e.g. Match.Email
- _Options_ – Optional. A text-string combination of **MatchOptions** enum values. By default, **MatchOptions.Complete** is used. _Options_ must be a constant formula without variables, data sources, or other dynamic references that change as the app runs.

**Match**( _Text_, _Pattern_ [, *Options* ] )

- _Text_ – Required. The text string to match.
- _Pattern_ – Required. The pattern to match as a text string. Concatenate predefined patterns that the **Match** enum defines, or provide a regular expression. _Pattern_ must be a constant formula without any variables, data sources, or other dynamic references that change as the app runs.
- _Options_ – Optional. A text-string combination of **MatchOptions** enum values. By default, **MatchOptions.Contains** is used. _Options_ must be a constant formula without any variables, data sources, or other dynamic references that change as the app runs.

**MatchAll**( _Text_, _Pattern_ [, *Options* ] )

- _Text_ – Required. The text string to match.
- _Pattern_ – Required. The pattern to match as a text string. Concatenate predefined patterns that the **Match** enum defines or provide a regular expression. _Pattern_ must be a constant formula without variables, data sources, or other dynamic references that change as the app runs.
- _Options_ – Optional. A text-string combination of **MatchOptions** enum values. By default, **MatchOptions.Contains** is used. _Options_ must be a constant formula without variables, data sources, or other dynamic references that change as the app runs.

## IsMatch examples

### Ordinary characters

Imagine your app has a **Text input** control named **TextInput1**. Users enter values into this control to store them in a database.

Users type **Hello world** into **TextInput1**.

| Formula                                                      | Description                                                                  | Result    |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- | --------- |
| `IsMatch( TextInput1.Text, "Hello world" )`                  | Tests whether the user's input matches, exactly, the string "Hello world".   | **true**  |
| `IsMatch( TextInput1.Text, "Good bye" )`                     | Tests whether the user's input matches, exactly, the string "Good bye".      | **false** |
| `IsMatch( TextInput1.Text, "hello", Contains )`              | Tests whether the user's input contains the word "hello" (case sensitive).   | **false** |
| `IsMatch( TextInput1.Text, "hello", Contains & IgnoreCase )` | Tests whether the user's input contains the word "hello" (case insensitive). | **true**  |

### Predefined patterns

| Formula                                                                                                             | Description                                                                                                                                        | Result    |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `IsMatch( "123-45-7890", Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit & Match.Digit )` | Matches a United States Social Security Number                                                                                                     | **true**  |
| `IsMatch( "joan@contoso.com", Match.Email )`                                                                              | Matches an email address                                                                                                                           | **true**  |
| `IsMatch( "123.456", Match.MultipleDigits & Match.Period & Match.OptionalDigits )`                                                    | Matches a sequence of digits, a period, and then zero or more digits.                                                                              | **true**  |
| `IsMatch( "123", Match.MultipleDigits & Match.Period & Match.OptionalDigits )`                                                        | Matches a sequence of digits, a period, and then zero or more digits. A period doesn't appear in the text to match, so this pattern isn't matched. | **false** |

### Regular expressions

| Formula                                                                               | Description                                                                                                                                                                                                                                                                            | Result    |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `IsMatch( "986", "\d+" )`                                                             | Matches an integer greater than zero.                                                                                                                                                                                                                                                  | **true**  |
| `IsMatch( "1.02", "\d+(\.\d\d)?" )`                                                   | Matches a positive currency amount. If the input contains a decimal point, the input must also contain two numeric characters after the decimal point. For example, 3.00 is valid, but 3.1 isn't.                                                                                      | **true**  |
| `IsMatch( "-4.95", "(-)?\d+(\.\d\d)?" )`                                              | Matches a positive or negative currency amount. If the input contains a decimal point, the input must also contain two numeric characters after the decimal point.                                                                                                                     | **true**  |
| `IsMatch( "111-11-1111", "\d{3}-\d{2}-\d{4}" )`                                       | Matches a United States Social Security number. Validates the format, type, and length of the supplied input field. The string to match must consist of three numeric characters followed by a dash, then two numeric characters followed by a dash, and then four numeric characters. | **true**  |
| `IsMatch( "111-111-111", "\d{3}-\d{2}-\d{4}" )`                                       | Same as the previous example, but one of the hyphens is out of place in the input.                                                                                                                                                                                                     | **false** |
| `IsMatch( "AStrongPasswordNot", "(?!^[0-9]\*$)(?!^[a-zA-Z]\*$)([a-zA-Z0-9]{8,10})" )` | Validates a strong password that must contain eight, nine, or 10 characters, at least one digit, and at least one alphabetic character. The string can't contain special characters.                                                                                | **false** |

## Match and MatchAll examples

| Formula                                                                                 | Description                                                                                                                                                                                                                                                                                                                                       | Result                                                                                                                                                                       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Match( "Bob Jones <bob.jones@contoso.com>", "<(?<email>" & Match.Email & ")>")`         | Extracts only the email portion of the contact information.                                                                                                                                                                                                                                                                                       | {<br>email:&nbsp;"bob.jones@contoso.com",<br>FullMatch:&nbsp;"&lt;bob.jones@contoso.com>",<br>StartMatch: 11<br>} |
| `Match( "Bob Jones <InvalidEmailAddress>", "<(?<email>" & Match.Email & ")>"`           | Extracts only the email portion of the contact information. No legal address is found (there is no @ sign), so the function returns _blank_.                                                                                                                                                                                                      | _blank_                                                                                                                                                                      |
| `Match( Language(), "(<language>\w{2})(?:-(?<script>\w{4}))?(?:-(?<region>\w{2}))?" )`  | Extracts the language, script, and region portions of the language tag that the **[Language](function-language.md)** function returns. These results reflect the United States; see the [**Language** function documentation](function-language.md) for more examples. The **(?:** operator groups characters without creating another sub-match. | {<br>language: "en",<br>script: _blank_, <br>region: "US",<br>FullMatch: "en-US", <br>StartMatch: 1<br>}                                 |
| `Match( "PT2H1M39S", "PT(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?" )` | Extracts the hours, minutes, and seconds from an ISO 8601 duration value. The extracted numbers are still in a text string; use the [**Value**](function-value.md) function to convert it to a number before mathematical operations are performed on it.                                                                                         | {<br> hours: "2",<br>minutes: "1",<br>seconds: "39",<br>FullMatch: "PT2H1M39S",<br>StartMatch: 1<br>}            |

Let's drill into that last example. If you wanted to convert this string to a date/time value using the **[Time](function-date-time.md)** function, you must pass in the named submatches individually. To do this, use the **[With](function-with.md)** function operating on the record that **Match** returns:

```power-fx
With(
    Match( "PT2H1M39S", "PT(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?" ),
   Time( Value( hours ), Value( minutes ), Value( seconds ) )
)
```

For these examples, add a [Button](/power-apps/maker/canvas-apps/controls/control-button) control, set its **OnSelect** property to this formula, and then select the button:

```power-fx
Set( pangram, "The quick brown fox jumps over the lazy dog." )
```

| Formula                                                            | Description                                                                                                                                                                                                                                                                   | Result                                                                                                                                                                                                |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Match( pangram, "THE", IgnoreCase )`                              | Find all matches of "THE" in the text string that the **pangram** variable contains. The string contains two matches, but only the first is returned because you're using **Match** and not **MatchAll**. | {<br>FullMatch: "The",<br>StartMatch: 32<br>}                                                                                                                                |
| `MatchAll( pangram, "the" )`                                       | Find all matches of "the" in the text string that the **pangram** variable contains. The test is case sensitive, so only the second instance of "the" is found.                                          | ![MatchAll for pangram.](media/function-ismatch/pangram-the-one.png)                                                                                                                                  |
| `MatchAll( pangram, "the", IgnoreCase )`                           | Find all matches of "the" in the text string that the **pangram** variable contains. In this case, the test is case insensitive, so both instances of the word are found.                                  | ![MatchAll with IgnoreCase.](media/function-ismatch/pangram-the-two.png)                                                                                                                              |
| `MatchAll( pangram, "\b\wo\w\b" )`                                 | Finds all three-letter words with an "o" in the middle. "brown" is excluded because it's not a three-letter word and, therefore, fails to match "\b" (word boundary).                                                                                               | ![MatchAll for pangram with b, wo, w and b.](media/function-ismatch/pangram-fox-dog.png)                                                                                                              |
| `Match( pangram, "\b\wo\w\b\s\*(?<between>\w.+\w)\s\*\b\wo\w\b" )` | Matches all the characters between "fox" and "dog".                                                                                                                                                                                                                           | {<br>between:&nbsp;"jumps&nbsp;over&nbsp;the&nbsp;lazy",<br>FullMatch:&nbsp;"fox&nbsp;jumps&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog",<br>StartMatch: 17<br> } |

To see the results of **MatchAll** in a gallery:

1. In an empty screen, insert a blank vertical **[gallery](/power-apps/maker/canvas-apps/controls/control-gallery)** control.

2. Set the gallery's **Items** property to **MatchAll( pangram, "\w+" )** or **MatchAll( pangram, MultipleLetters )**.

   ![Items gallery.](media/function-ismatch/pangram-gallery1.png)

3. Select "Add an item from the Insert tab" in the middle of the gallery control to select the template of the gallery.

4. Add a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control to the gallery's template.

5. Set the label's **Text** property to **ThisItem.FullMatch**.

   The gallery is filled with each word in our example text. To see all the words on one screen, resize the gallery's template and the label control.

   ![Text property.](media/function-ismatch/pangram-gallery2.png)

---

## IsNumeric function

Source: [function-isnumeric.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-isnumeric)

*Reference information including syntax and examples for the IsNumeric function.*

# IsNumeric function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages

Tests whether a value is numeric.

## Description

The **IsNumeric** function tests whether a value is numeric. Other kinds of values include Boolean, string, [table](/power-apps/maker/canvas-apps/working-with-tables), and [record](/power-apps/maker/canvas-apps/working-with-tables#records).

The return value is a Boolean **true** or **false**.

## Syntax

**IsNumeric**( _Value_ )

## Examples

| Formula              | Description                                 | Result   |
|----------------------|---------------------------------------------|----------|
| **IsNumeric(1)**     | Evaluates if the number 1 is a number       | _true_   |
| **IsNumeric("1")**   | Evaluates if the text "1" is a number       | _true_   |
| **IsNumeric("A")**   | Evaluates if the text A is a number         | _false_  |
| **IsNumeric(1+1)**   | Evaluates if the outcome of 1+1 is a number | _true_   |
| **IsNumeric("1+1")** | Evaluates if the text 1+1 is a number       | _false_  |

---

## WeekNum and ISOWeekNum functions

Source: [function-weeknum.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-weeknum)

*Reference information including syntax and examples for the WeekNum and ISOWeekNum functions.*

# WeekNum and ISOWeekNum functions
| Function | Applies to |
|-----------|------------|
| **ISOWeekNum** | 
- ✓ Canvas apps 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Pages |
| **WeekNum** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Returns the week number of a specific date.

## Description

Use the **WeekNum** and **ISOWeekNum** functions to determine the week number of a date.

These functions differ in how they determine the first week of the year (week 1):

- **WeekNum** uses the week containing January 1 as the first week of the year.  The result from this function can range from 1 to 54.

- **ISOWeekNum** uses the week containing the first Thursday of the year as the first week of the year. This follows the [ISO 8601 date and time standard definition](https://en.wikipedia.org/wiki/ISO_week_date) for week numbering.  The result from this function can range from 1 to 53.  It is possible that 52 or 53 may be returned for the first days of January since the dates could belong to the last week of the previous year.

Use the second parameter to **WeekNum** to specify which day begins a week.  You can provide either an Excel code number or use the StartOfWeek enumeration:

| Excel code | StartOfWeek enumeration | Description |
| --- | --- | --- |
| **1**, **17** |**StartOfWeek.Sunday** |Week begins on Sunday.  Default. |
| **2**, **11** |**StartOfWeek.Monday** |Week begins on Monday. |
| **12** |**StartOfWeek.Tuesday** |Week begins on Tuesday. |
| **13** |**StartOfWeek.Wednesday** |Week begins on Wednesday. |
| **14** |**StartOfWeek.Thursday** |Week begins on Thursday. |
| **15** |**StartOfWeek.Friday** |Week begins on Friday. |
| **16** |**StartOfWeek.Saturday** |Week begins on Saturday. |

**ISOWeekNum** always uses Monday as the start of the week.  In Excel, the **WeekNum** function supports an addition code **21** that is not supported here; use **ISOWeekNum** instead.

If you pass a single number to these functions, the return value is a single result.  If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains numbers, the return value is a single-column table of results, one result for each record in the argument's table. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.  

## Syntax

**WeekNum**(*DateTime* [, *StartOfWeek* ])

- *DateTime* - Required.  Date/Time value to operate on.  
- *StartOfWeek* - Optional.  Excel code or StartOfWeek enumeration that determines which day the week begins.

**ISOWeekNum**(*DateTime*)

- *DateTime* - Required.  Date/Time value to operate on.  The week always begins on Monday.

## Examples

First and last calendar weeks of 2021

| Date | WeekNum(&nbsp;Date&nbsp;) | ISOWeekNum(&nbsp;Date&nbsp;) | WeekNum(&nbsp;Date, StartOfWeek.Wednesday&nbsp;) |
|------|:-------:|:-------:|:------:|
| Friday,&nbsp;January&nbsp;1,&nbsp;2021 | 1 | 53 | 1 |
| Saturday,&nbsp;January&nbsp;2,&nbsp;2021 | 1 | 53 | 1 |
| Sunday,&nbsp;January&nbsp;3,&nbsp;2021 | 2 | 53 | 1 |
| Monday,&nbsp;January&nbsp;4,&nbsp;2021 | 2 | 1 | 1 |
| Tuesday,&nbsp;January&nbsp;5,&nbsp;2021 | 2 | 1 | 1 |
| Wednesday,&nbsp;January&nbsp;6,&nbsp;2021 | 2 | 1 | 2 |
| Thursday,&nbsp;January&nbsp;7,&nbsp;2021 | 2 | 1 | 2 |
| Saturday,&nbsp;December&nbsp;25,&nbsp;2021 | 52 | 51 | 52 |
| Sunday,&nbsp;December&nbsp;26,&nbsp;2021 | 53 | 51 | 52 |
| Monday,&nbsp;December&nbsp;27,&nbsp;2021 | 53 | 52 | 52 |
| Tuesday,&nbsp;December&nbsp;28,&nbsp;2021 | 53 | 52 | 52 |
| Wednesday,&nbsp;December&nbsp;29,&nbsp;2021 | 53 | 52 | 53 |
| Thursday,&nbsp;December&nbsp;30,&nbsp;2021 | 53 | 52 | 53 |
| Friday,&nbsp;December&nbsp;31,&nbsp;2021 | 53 | 52 | 53 |

---

## Now, Today, IsToday, UTCNow, and UTCToday functions

Source: [function-now-today-istoday.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-now-today-istoday)

*Reference information including syntax and examples for the Now, Today, IsToday, UTCNow, and UTCToday functions.*

# Now, Today, IsToday, UTCNow, UTCToday, IsUTCToday functions
| Functions | Applies to |
|-----------|------------|
| **Now** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **Today**</br>**IsToday** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **UTCNow**</br>**UTCToday** | 
- ✓ Dataverse formula columns 
- ✓ Power Pages |



Returns the current date and time, and tests whether a date/time value is today.

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) do not support the **UTCNow**, **UTCToday**, and **IsUTCToday** functions.

## Description

The **Now** function returns the current date and time as a date/time value.

The **Today** function returns the current date as a date/time value. The time portion is midnight. **Today** has the same value throughout a day, from midnight today to midnight tomorrow.

The **IsToday** function tests whether a date/time value is between midnight today and midnight tomorrow. This function returns a Boolean (**true** or **false**) value.

**Now**, **Today**, and **IsToday** functions work with the local time of the current user.

**UTCNow**, **UTCToday**, and **IsUTCToday** functions are the same as their non-UTC counterparts but work with time zone independent values and use Coordinated Universal Time (UTC).

> [!NOTE]
>
> - **UTCNow**, **UTCToday**, and **IsUTCToday** are only available in Microsoft Dataverse for Teams formula columns, and only for time-independent fields and values.
> - **Now**, **Today**, and **IsToday** are not available in Dataverse for Teams formula columns as evaluations are done without the knowledge of the current user's local time zone.
>   <br> More information: [Work with formula table columns in Dataverse for Teams](/power-apps/teams/formula-columns)

See [Date, Time, and DateTime in the data types documentation](../data-types.md#date-time-and-datetime) and [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

## Volatile Functions

**Now**, **Today**, **UTCNow**, and **UTCToday** are volatile functions. These functions return a different value for each evaluation.

When used in a data flow formula, a volatile function will only return a different value if the formula in which it appears is reevaluated. If nothing else changes in the formula then it will have the same value throughout the execution of your app.

For example, a label control with **Label1.Text = Now()** will not change while your app is active. Only closing and reopening the app will result in a new value.

The function will be reevaluated if it is part of a formula in which something else has changed. For example, if we change our example to involve a slider control with **Label1.Text = DateAdd( Now(), Slider1.Value, Minutes )** then the current time is retrieved each time the Slider control's value changes and the label's text property is reevaluated.

When used in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth), volatile functions will be evaluated each time the behavior formula is evaluated. See below for an example.

## Syntax

#### Using the user's local time

**Now**()

**Today**()

**IsToday**( _DateTime_ )

- _DateTime_ - Required. The date/time value to test.

#### Using Coordinated Universal Time (UTC)

**UTCNow**()

**UTCToday**()

**IsUTCToday**( _TimeZoneIndependentTime_ )

- _TimeZoneIndependentDateTime_ - Required. The time zone independent date/time value to test.

## Examples

For the examples in this section, the current time is **8:58 PM** on **July 11, 2021** in the Pacific Time Zone (UTC-8) and the language is **en-us**.

| Formula                                                   | Description                                                                                                  | Result                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------- |
| **Text( Now(), "mm/dd/yyyy hh:mm:ss" )**                  | Retrieves the current date and time in the user's time zone, and displays it as a string.                    | "07/11/2021 20:58:00" |
| **Text( Today(), "mm/dd/yyyy hh:mm:ss" )**                | Retrieves the current date only, leaving the time portion as midnight, and displays it as a string.          | "07/12/2021 00:00:00" |
| **IsToday( Now() )**                                      | Tests whether the current date and time is between midnight today and midnight tomorrow.                     | **true**              |
| **IsToday( Today() )**                                    | Tests whether the current date is between midnight today and midnight tomorrow.                              | **true**              |
| **Text( DateAdd( Now(), 12 ), "mm/dd/yyyy hh:mm:ss" )**   | Retrieves the current date and time, adds 12 days to the result, and displays it as a string.                | "07/23/2021 20:58:00" |
| **Text( DateAdd( Today(), 12 ), "mm/dd/yyyy hh:mm:ss" )** | Retrieves the current date, adds 12 days to the result, and displays it as a string.                         | "07/23/2021 00:00:00" |
| **IsToday( DateAdd( Now(), 12 ) )**                       | Tests whether the current date and time, plus 12 days, is between midnight today and midnight tomorrow.      | **false**             |
| **IsToday( DateAdd( Today(), 12 ) )**                     | Tests whether the current date, plus 12 days, is between midnight today and midnight tomorrow.               | **false**             |
| **Hour( UTCNow() )**                                      | Retrieves the current date and time in UTC and extracts the hour only, which is 8 hours ahead of local time. | 4                     |
| **Day( UTCToday() )**                                     | Retrieves the current date only in UTC and extracts the day, which is 1 day ahead of local time.              | 12                    |
| **IsUTCToday( UTCNow() )**                                | Tests whether the current date and time is between midnight today and midnight tomorrow, all in UTC time.    | **true**              |
| **IsUTCToday( UTCToday() )**                              | Tests whether the current date is between midnight today and midnight tomorrow, all in UTC time.             | **true**              |

#### Display a clock that updates in real time

1. Add a **[Timer](/power-apps/maker/canvas-apps/controls/control-timer)** control, set its **Duration** property to **1000**, and set its **Repeat** property to **true**.

   The timer will run for one second, automatically start over, and continue that pattern.

1. Set the control's **OnTimerEnd** property to this formula:

   **Set( CurrentTime, Now() )**

   Whenever the timer starts over (after each second), this formula sets the **CurrentTime** global variable to the current value of the **Now** function.

   ![A screen containing a timer control with the formula OnTimerEnd = Set(CurrentTime, Now()).](media/function-now-today-istoday/now-set-currenttime.png)

1. Add a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control, and set its **Text** property to this formula:

   **Text( CurrentTime, LongTime24 )**

   Use the **[Text](function-text.md)** function to format the date and time however you want, or set this property to just **CurrentTime** to show hours and minutes but not seconds.

   ![A screen that contains a label control with Text property set to Text( CurrentTime, LongTime24).](media/function-now-today-istoday/now-use-currenttime.png)

1. Preview the app by pressing F5, and then start the timer by clicking or tapping it.

   The label continually shows the current time, down to the second.

   ![Four screens showing four time values (13:50:22, 13:50:45, 13:51:03,and  13:51:25).](media/function-now-today-istoday/now-four-times.png)

1. Set the timer's **AutoStart** property to **true** and its **Visible** property to **false**.

   The timer is invisible and starts automatically.

1. Set the screen's **[OnStart](/power-apps/maker/canvas-apps/controls/control-screen)** property so that the **CurrentTime** variable has a valid value, as in this example:

   **Set(CurrentTime, Now())**

   The label appears as soon as the app starts (before the timer runs for a full second).

---

## JSON function

Source: [function-json.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-json)

*Reference information including syntax and examples for the JSON function.*

# JSON function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Generates a JSON text string for a table, a record, or a value.

## Description

The **JSON** function returns the JavaScript Object Notation (JSON) representation of a data structure as text so that it's suitable for storing or transmitting across a network. [ECMA-404]([https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf](https://ecma-international.org/publications-and-standards/standards/ecma-404/) and [IETF RFC 8259](https://tools.ietf.org/html/rfc8259) describe the format, which is widely used by JavaScript and other programming languages.

Canvas apps support the [data types](../data-types.md) that this table lists with details about their text representation:

| Data type           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Result example                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Boolean**         | _true_ or _false_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `true`                                                                         |
| **Color**           | String that contains the 8-digit hexadecimal representation for the color. This representation takes the format #_rrggbbaa_, where _rr_ is the red component, _gg_ is green, _bb_ is blue, and _aa_ is the alpha channel. For the alpha channel, **00** is fully transparent, and **ff** is fully opaque. You can pass the string to the [**ColorValue**](function-colors.md) function.                                                                                                                        | `"#102030ff"`                                                                  |
| **Currency**        | Number that uses the appropriate decimal separator for the user's language. Scientific notation is used if needed.                                                                                                                                                                                                                                                                                                                                                                                             | `1.345`                                                                        |
| **Date**            | String that contains the date in ISO 8601 **yyyy-mm-dd** format.                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"2019-03-31"`                                                                 |
| **DateTime**        | String that contains an ISO 8601 date/time. Date/time values are in UTC, as the ending "Z" indicates.                                                                                                                                                                                                                                                                                                                                                                                                          | `"2019-03-31T22:32:06.822Z"`                                                   |
| **GUID**            | String that contains the GUID value. Letters are lowercase.                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `"751b58ac-380e-4a04-a925-9f375995cc40"`                                       |
| **Image, Media**    | If **JSONFormat.IncludeBinaryData** is specified, media files are encoded in a string. Web references that use the http: or https: URL scheme aren't modified. References to in-memory binary data are encoded with the ["data:_mimetype_;base64,..."](https://en.wikipedia.org/wiki/Data_URI_scheme) format. In-memory data includes images that users capture by using the [**Camera**](/power-apps/maker/canvas-apps/controls/control-camera) control and any other references with the appres: and blob: URL schemes. | `"data:image/jpeg;base64,/9j/4AA..."`                                          |
| **Number**          | Number that uses the appropriate decimal separator for the user's language. Scientific notation is used if needed.                                                                                                                                                                                                                                                                                                                                                                                             | `1.345`                                                                        |
| **Option&nbsp;set** | Numeric value of the choice, not the label that's used for display. The numeric value is used because it's language independent.                                                                                                                                                                                                                                                                                                                                                                               | `1001`                                                                         |
| **Time**            | String that contains an ISO 8601 _hh:mm:ss.fff_ format.                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"23:12:49.000"`                                                               |
| **Record**          | Comma-delimited list, between **{** and **}**, of fields and their values. This notation resembles that for records in canvas apps, but the name is always between double quotation marks. This format doesn't support records that are based on many-to-one relationships.                                                                                                                                                                                                                                    | `{ "First Name": "Fred", "Age": 21 }`                                          |
| **Table**           | Comma-delimited list, between **[** and **]**, of records. This format doesn't support tables that are based on one-to-many relationships. Use the **JSONFormat.FlattenValueTables** option to remove the record for single column tables with the column named **Value**.                                                                                                                                                                                                                                                                                                                                                                  | `[ { "First Name": "Fred", "Age": 21 }, { "First Name": "Jean", "Age": 20 } ]` |
| **Two&nbsp;option** | Boolean value of the two option, _true_ or _false_, not the label that's used for display. The Boolean value is used because it's language independent.                                                                                                                                                                                                                                                                                                                                                        | `false`                                                                        |
| **Hyperlink, Text** | String between double quotation marks. The function escapes embedded double-quotation marks with a backslash, replaces newlines with "\n", and makes other standard JavaScript replacements.                                                                                                                                                                                                                                                                                                                   | `"This is a string."`                                                          |

Specify the optional _Format_ argument to control how readable the result is and how unsupported and binary data types are handled. By default, the output is as compact as possible with no unnecessary spaces or newlines, and unsupported data types and binary data aren't allowed. You can combine multiple formats if you specify the **&** operator.

| JSONFormat enum            | Description                                                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JSONFormat.Compact**                | Default. The output is as compact as possible with no added spaces or newlines.                                                                                                                     |
| **JSONFormat.FlattenValueTables**     | As a [Value table](../tables.md#inline-value-tables), `[1,2,3]` notation results in a table containing records where each record has a single **Value** column. In JSON, that same notation represents an array of three numbers. To make interoperability between the two easier, this option flattens a Power Fx Value table to a JSON friendly array instead of an array of records.
| **JSONFormat.IndentFour**             | To improve readability, the output contains a newline for each column and nesting level and uses four spaces for each indentation level.                                                            |
| **JSONFormat.IncludeBinaryData**      | The result includes image, video, and audio-clip columns. This format can dramatically increase the result's size and degrade your app's performance.                                               |
| **JSONFormat.IgnoreBinaryData**       | The result doesn't include image, video, or audio-clip columns. If you specify neither **JSONFormat.IncludeBinaryData** nor **JSONFormat.IgnoreBinaryData**, the function produces an error if it encounters binary data. |
| **JSONFormat.IgnoreUnsupportedTypes** | Unsupported data types are allowed, but the result won't include them. By default, unsupported data types produce an error.                                                                         |

Use the [**ShowColumns** and **DropColumns**](function-table-shaping.md) functions to control which data the result includes and to remove unsupported data types.

Because **JSON** can be both memory and compute intensive, you can use this function only in [behavior functions](/power-apps/maker/canvas-apps/working-with-formulas-in-depth). You can capture the result from **JSON** into a [variable](/power-apps/maker/canvas-apps/working-with-variables), which you can then use in data flow.

If a column has both a display name and a logical name, the result contains the logical name. Display names reflect the language of the app user and are, therefore, inappropriate for data transfer to a common service.

## Syntax

**JSON**( _DataStructure_ [, *Format* ] )

- _DataStructure_ – Required. The data structure to convert to JSON. Tables, records, and primitive values are supported, arbitrarily nested.
- _Format_ - Optional. **JSONFormat** enum value. The default value is **JSONFormat.Compact**, which doesn't add newlines or spaces and blocks binary data and unsupported columns.

## Examples

### Hierarchical data

1. Insert a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control, and set its **OnSelect** property to this formula.

   ```power-fx
   ClearCollect( CityPopulations,
       { City: "London",    Country: "United Kingdom", Population: 8615000 },
       { City: "Berlin",    Country: "Germany",        Population: 3562000 },
       { City: "Madrid",    Country: "Spain",          Population: 3165000 },
       { City: "Hamburg",   Country: "Germany",        Population: 1760000 },
       { City: "Barcelona", Country: "Spain",          Population: 1602000 },
       { City: "Munich",    Country: "Germany",        Population: 1494000 }
   );
   ClearCollect( CitiesByCountry, GroupBy( CityPopulations, "Country", "Cities" ) )
   ```

1. Select the button while holding down the Alt key.

   The **CitiesByCountry** collection is created with this data structure, which you can show by selecting **Collections** on the **File** menu and then selecting the name of the collection.

    > [!div class="mx-imgBorder"] 
    > ![CitiesByCountry collection.](media/function-json/cities-grouped.png)

   You can also show this collection by selecting **Settings** > **Upcoming features** > **Enable formula bar result view**, selecting the name of the collection in the formula bar, and then selecting the down arrow next to the name of the collection under the formula bar.

    > [!div class="mx-imgBorder"] 
    > ![Collection in the formula bar's result view.](media/function-json/cities-grouped-resultview.png)

1. Insert another button, and set its **OnSelect** property to this formula:

   ```power-fx
   Set( CitiesByCountryJSON, JSON( CitiesByCountry ) )
   ```

   This formula sets the global variable **CitiesByCountryJSON** to the JSON representation for **CitiesByCountry**.

1. Select the button while holding down the Alt key.

1. Insert a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control, and set its **Text** property to this variable.

   ```power-fx
   CitiesByCountryJSON
   ```

   The label shows this result, all on a single line with no spaces, suitable for transmission across a network:

   ```json
   [
     {
       "Cities": [{ "City": "London", "Population": 8615000 }],
       "Country": "United Kingdom"
     },
     {
       "Cities": [
         { "City": "Berlin", "Population": 3562000 },
         { "City": "Hamburg", "Population": 1760000 },
         { "City": "Munich", "Population": 1494000 }
       ],
       "Country": "Germany"
     },
     {
       "Cities": [
         { "City": "Madrid", "Population": 3165000 },
         { "City": "Barcelona", "Population": 1602000 }
       ],
       "Country": "Spain"
     }
   ]
   ```

1. Change the second button's formula to make the output more readable.

   ```power-fx
   Set( CitiesByCountryJSON, JSON(CitiesByCountry, JSONFormat.IndentFour ))
   ```

1. Select the second button while holding down the Alt key.

   The label shows the more readable result.

   ```json
   [
     {
       "Cities": [
         {
           "City": "London",
           "Population": 8615000
         }
       ],
       "Country": "United Kingdom"
     },
     {
       "Cities": [
         {
           "City": "Berlin",
           "Population": 3562000
         },
         {
           "City": "Hamburg",
           "Population": 1760000
         },
         {
           "City": "Munich",
           "Population": 1494000
         }
       ],
       "Country": "Germany"
     },
     {
       "Cities": [
         {
           "City": "Madrid",
           "Population": 3165000
         },
         {
           "City": "Barcelona",
           "Population": 1602000
         }
       ],
       "Country": "Spain"
     }
   ]
   ```

### Images and media in base64

1. Add an [**Image**](/power-apps/maker/canvas-apps/controls/control-image) control.

   This control brings **SampleImage** with it.

1. Add a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control, and set its **OnSelect** property to this formula.

   ```power-fx
   Set( ImageJSON, JSON( SampleImage, JSONFormat.IncludeBinaryData ) )
   ```

1. Select the button while holding down the Alt key.

1. Add a label, and set its **Text** property to this variable.

   ```power-fx
   ImageJSON
   ```

1. Resize the control and reduce the font size as needed to show most of the result.

   The label shows the text string that the **JSON** function captured.

   ```json
   "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KCSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIg0KCSB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI3MHB4IiBoZWlnaHQ9IjI3MHB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNzAgMjcwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCgk8ZyBjbGFzcz0ic3QwIj4NCgkJPHJlY3QgeT0iMC43IiBmaWxsPSIjRTlFOUU5IiB3aWR0aD0iMjY5IiBoZWlnaHQ9IjI2OS4zIi8+DQoJCTxwb2x5Z29uIGZpbGw9IiNDQkNCQ0EiIHBvaW50cz0iMjc3LjksMTg3LjEgMjQ1LDE0My40IDE4OC42LDIwMi44IDc1LDgwLjUgLTQuMSwxNjUuMyAtNC4xLDI3MiAyNzcuOSwyNzIiLz4NCgkJPGVsbGlwc2UgZmlsbD0iI0NCQ0JDQSIgY3g9IjIwMi40IiBjeT0iODQuMSIgcng9IjI0LjQiIHJ5PSIyNC4zIi8+DQoJPC9nPg0KPC9zdmc+"
   ```

### Value tables

This formula:
```power-fx
JSON( [1,2,3] )
```
produces the text string **[{"Value":1},{"Value":2},{"Value":3}]**.  

The same formula with the JSONFormat.FlattenValueTables option:
```power-fx
JSON( [1,2,3], JSONFormat.FlattenValueTables )
```
produces the text string **[1,2,3]**.

Note that the FlattenValueTables option has no impact when using JSON with the **CityPopulations** or **CitiesByCountry** collections as these tables are not Value tables. A Value table has a single column and it must be named "Value".

---

## Language function

Source: [function-language.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-language)

*Reference information including syntax and examples for the Language function.*

# Language function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns the language tag of the current user.

## Description

The **Language** function returns the language, script, and region of the current user as a language tag.

Use the language information to tailor your app across locales. For example, if you're creating an app that is used in Italy and France, you can use **Language** to automatically display Italian and French strings to your users in those different locations.

### Language tags

A _language tag_ can be in one of three formats:

| Return value                   | Description                                                                                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"_lg&#8209;RE_"**            | _lg_ is the two character abbreviation for the language and _RE_ is the two character abbreviation for the region. It's the most common return type. For example, "en-GB" is returned for United Kingdom. |
| **"_lg_"**                     | _lg_ is the two character abbreviation for the language. It's the format used when Power Apps has information about the language, but doesn't have information for the specific region.                 |
| **"_lg&#8209;scrp&#8209;RE_"** | _lg_ is the two character abbreviation for the language, _scrp_ is the four character abbreviation for the script, and _RE_ is the two character abbreviation for the region.                               |

Power Apps uses the [IETF BCP-47 language tag](https://tools.ietf.org/html/bcp47) format.

To see the list of supported language tags, type **Value("1",)** in the formula bar or advanced view and scroll through the list of locales suggested for the second argument.

The **[Text](function-text.md)** and **[Value](function-value.md)** functions also use language tags. Use these functions for translating to and from text strings in a globally aware manner. When passing a language tag to these functions and the region wouldn't make a difference, you can use just the language portion of the tag.

## Syntax

**Language**()

## Examples

### User's locale

It's assumed that the host operating system and/or browser are using the default locale for the location.

| Formula        | Location                  | Return Value                                                          |
| -------------- | ------------------------- | --------------------------------------------------------------------- |
| **Language()** | Lisbon, Portugal          | "pt-PT"                                                               |
| **Language()** | Rio de Janeiro, Brazil    | "pt-BR"                                                               |
| **Language()** | Atlanta, USA              | "en-US"                                                               |
| **Language()** | Manchester, United Kingdom  | "en-GB"                                                               |
| **Language()** | Paris, France             | "fr-FR"                                                               |
| **Language()** | Roseau, Dominica          | "en"                                                                  |
| **Language()** | Belgrade, Serbia          | "sr-cyrl-RS" or "sr-latn-RS," depending on the user's system settings |

### Localization table

A simple approach to localization is to create an Excel spreadsheet mapping an author defined **TextID** to a translated text for the user's language. Although you could use a collection or any other data source for this table, we chose Excel because it's easy to edit and manage outside of the app by translators.

1. Create the following table in Excel:

   ![Localization table.](media/function-language/loc-table.png)

   The entry with _blank_ for the **Language** column is used as the default if there's no specific text string found for a given language. This entry must appear after all other entries for a given **TextID**.

   For our purposes, we only need to look at the language of the locale and not the region. If regional considerations were important, we could included the full language tag value in the table above.

2. Use the **Insert** ribbon, **Table** command, to make this into a proper Excel table. By default, it's named **Table1** but you can name it whatever you like with the **Table Tools/Design** ribbon and the **Table Name:** text box on the far left hand side.
3. Save the Excel file to your local file system.
4. In Power Apps, in the right-hand pane, click, or tap the **Data Sources** tab, and then click or tap **Add data source**.
5. Click or tap **Add static data to your app**, click, or tap the Excel file that you saved, and then click or tap **Open**.
6. Select the table that you created, and then click, or tap **Connect**.

In your app, wherever you used the text **"Hello"** before, use this formula instead:

- **LookUp( Table1, TextID = "Hello" && (LanguageTag = Left( Language(), 2 ) || IsBlank( LanguageTag ))).LocalizedText**

This formula will lookup the appropriate **LocalizedText** value for the language of the user, and if that isn't found, will fall back on the default _blank_ version.

Translated strings in other languages could be longer than they're in your language. In many cases, the labels and other elements that display the strings in your user interface are needed to be wider to accommodate.

### Translation service

You can translate text on demand using a translation service, such as the Microsoft Translator service:

1. In Power Apps, in the right-hand pane, click or tap the **Data Sources** tab, and then click or tap **Add data source**.
2. Click or tap **Microsoft Translator**.

In your app, wherever you would have used the text **"Hello"** before, use this formula instead:

- **MicrosoftTranslator.Translate( "Hello", Language() )**

The Microsoft Translator service uses the same language tags that the **Language** function returns.

This approach comes with some drawbacks when compared to the previous example which utilized a pretranslated table of text strings:

- The translation takes time to complete, requiring a call to a service across the network. It results in a lag to see the translated text in your app.
- The translation is mechanical and may not be what you anticipate or be the best choice for the situation within your app.

---

## Launch and Param functions

Source: [function-param.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-param)

*Reference information including syntax and examples for the Launch and Param functions.*

# Launch and Param functions
**Applies to:** 
- ✓ Canvas apps



Launches a webpage or a canvas app and provides access to launch parameters.

## Launch

Launches a webpage or a canvas app. The function supports:

- **Address** (required), the URL of the webpage of the canvas app.
- **Parameters** (optional), named values to pass to the webpage or canvas app. In a canvas app, parameters can be read with the [**Param**](#param) function.
- **Target** (optional), the browser tab in which to launch the webpage or canvas app.

**Launch** can only be used in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

>[!NOTE]
> - If the Launch formula is used to open Power Apps and the app isn't visible to the end user, it's recommended to check if the app is blocked by a browser pop-up blocker or if the browser is wait for the user's response to a dialog box that asks whether they want to navigate to a new screen.
> - Only **https**: URIs are supported when using Launch in the Power Apps Visual in PowerBI.


### Address

Webpages are launched via a URL address. For example:

```power-fx
Launch( "https://bing.com" )
```

You can launch canvas apps with **Web link** or **App URI** (app id prefixed with `/providers/Microsoft.PowerApps/apps/`). To find these values for an app:

1. Go to [Power Apps](https://make.powerapps.com).
1. Select **Apps** from left navigation pane.
1. Select your app.
1. Select **Details** from top menu. <br> You can also select **...** (**More Commands**) and then select **Details** from the drop-down menu.

   ![App details option.](media/function-param/portal-details.png "App details option")

1. Copy **Web link**.

   ![App details with web link and app id.](media/function-param/portal-links.png "App details with web link and app id")

The **Web link** can be used in any web page and will launch the canvas app. It can also be used with the **Launch** function. For example:


```power-fx
Launch( "https://apps.powerapps.com/e/{environment id}/a/{app id}?tenantId={tenantId}" )

```

Native apps on a device can't be launched directly. There may be indirect options available on some platforms, such as a native app installing a custom URL scheme or registering with the web browser to offer an option for specific web sites.

### Parameters

**Launch** can pass parameters to the webpage or canvas app. Parameters can be provided in two ways:

- An argument list of name value pairs. For example:

  ```power-fx
  Launch( "https://bing.com/search", "q", "Power Apps", "count", 1 )
  ```

- A record of field values. For example:

  ```power-fx
  Launch( "https://bing.com/search", { q: "Power Apps", count: 1 } )
  ```

  This form can be easier to work with as it makes the association between name and value clearer. It's the only form that supports the optional _LaunchTarget_ argument.

The address and parameters are URL encoded before being passed to replace certain non-alphanumeric characters with `%` and a hexadecimal number as if the [**EncodeUrl**](function-encode-decode.md) function has been used on each.

When launching a webpage, a [query string](https://en.wikipedia.org/wiki/Query_string) of parameters can be included at the end of the URL address. Any additional parameters provided to **Launch** will be added to the end of the query string. Query strings don't work when launching a canvas app.

When launching an app on a mobile device where that app is already running, parameters will not be refreshed in the running app. An app reload is required for parameters to be refreshed.

### Target

Use the _LaunchTarget_ argument to specify the target browser window in which to open the webpage or app. Use one of the following **LaunchTarget** enum values or provide a custom window _name_.

| LaunchTarget&nbsp;enum | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New**                | The webpage or app is opened in a new window or tab.                                                                                                                                                                                                                                                                                                                                                                                            |
| **Replace**            | The webpage or app replaces the current window or tab.                                                                                                                                                                                                                                                                                                                                                                                          |
| _name_                 | Instead of an enum value, use your own text string to _name_ the window or tab. _Self_ is an internal only name that is only used by the **Launch** function. It has no impact on nor will it match the title of the window that your users see. If a window or tab with the given _name_ already exists, its contents will be replaced. Otherwise, a new window or tab will be created. _name_ can't begin with the underscore character "\_". |

**New** is the default enum when running in a web browser with **Replace** and _name_ as available options. In a mobile player, **New** is the default for webpages with _name_ as an available option; while the current canvas app will always be replaced by another canvas app.

> [!NOTE]
>
> - Using a _LaunchTarget_ with any value other than **New** in embedded scenarios (for example, Power BI or SharePoint) is not supported and may result in unexpected behavior. In the future, this behavior may change, or may cause an error.

## Param

The **Param** function retrieves a parameter passed to the app when it was launched. If the named parameter wasn't passed, **Param** returns _blank_.

- When launching a canvas app from another canvas app, use the _Parameter_ arguments to the **Launch** function. Parameter names and values will be automatically URL encoded.
- When launching a canvas app from a web page, add parameters to the [query string](https://en.wikipedia.org/wiki/Query_string) of the [canvas app web link](#address). This involves adding `&parametername=parametervalue` assuming the query string has already been started for the `tenantId`. For example, adding `&First%20Name=Vicki&category=3` would pass two parameters: `First Name` with a value of `"Vicki"` and `category` with a value of `"3"` (value type is _text_). The parameter name and value must be URL encoded if they contain spaces or special characters, similar to using the [**EncodeURL**](function-encode-decode.md) function.
- Param names are case-sensitive.
- Param names and values will be automatically URL decoded for use in your app.
- Parameter values do not change unless the app is reloaded. Using **Launch** on a mobile device where the app is already running does not refresh the parameters.
- Even if the parameter contains a number, the type returned by **Param** will always be a text string. Conversion to other types will automatically occur or use explicit conversions such as the [**Value**](function-value.md) function to convert explicitly to a number.

>[!NOTE]
> For [custom pages](/power-apps/maker/model-driven-apps/add-page-to-model-app), the only parameters accepted by the page are: recordId and entityName.

## Syntax

**Launch**( _Address_ [, *ParameterName1*, *ParameterValue1*, ... ] )

- _Address_ – Required. The address of a webpage or the ID of an app to launch.
- _ParameterName(s)_ – Optional. Parameter name.
- _ParameterValue(s)_ – Optional. Corresponding parameter values to pass to the app or the webpage.

**Launch**( _Address_, { [ *ParameterName1*: *ParameterValue1*, ... ] } [, *LaunchTarget* ] )

- _Address_ – Required. The address of a webpage or the ID of an app to launch.
- _ParameterName(s)_ – Optional. Parameter name.
- _ParameterValue(s)_ – Optional. Corresponding parameter values to pass to the app or the webpage.
- _LaunchTarget_ – Optional. A **LaunchTarget** enum value or a custom _name_.

**Param**( _ParameterName_ )

- _ParameterName_ - Required. The name of the parameter passed to the app.

### Reserved parameters

The following keywords are reserved (regardless of case) for internal use, and shouldn't be used as a custom parameter in the **Param()** function:

- amp%3Bauthmode
- amp%3Benableonbehalfof
- amp%3Bhidenavbar
- amp%3Blocale
- appmetadataversion
- authmode
- channeltype
- cordovapath
- correlationid
- debug
- delegatelaunchurl
- delegatelaunchurl
- disablepreviewredirect
- embedderorigin
- enableonbehalfof
- groupid
- hideappsplash
- hidenavbar
- hint
- hostclienttype
- hostmode
- iframecontainerid
- isfullscreen
- ispreviewmode
- loader
- loaderType
- locale
- location
- packagekind
- packageproperties
- playerresourcespath
- playersessionid
- powerappslanguage
- screencolor
- sdkversion
- site
- skipappmetadata
- skipiframecreation
- skiplaunchappcache
- source
- sourcetime
- standaloneconsent
- teamid
- teamtype
- tenantId
- theme
- uselocalpackagehostresources
- userteamrole

## Examples

### Simple Launch

#### From a canvas app to a web page:

| Formula                                                                                                                                                | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Launch(&nbsp;"http://bing.com/search",&nbsp;<br>"q",&nbsp;"Power&nbsp;Apps",&nbsp;"count",&nbsp;1&nbsp;)**                                           | Opens the webpage **https://bing.com/search?q=Power%20Apps&count=1**. A new window or tab is opened.                 |
| **Launch(&nbsp;"http://bing.com/search",&nbsp;<br>{&nbsp;q:&nbsp;"Power&nbsp;Apps",&nbsp;count:&nbsp;1&nbsp;}&nbsp;)**                                 | The same as the previous examples using the equivalent record notation. A new window or tab is opened.              |
| **Launch(&nbsp;"http://bing.com/search",&nbsp;<br>{&nbsp;q:&nbsp;"Power&nbsp;Apps",&nbsp;count:&nbsp;1&nbsp;},&nbsp;<br>LaunchTarget.Replace&nbsp;)**  | The same as the previous examples, replacing the current window or tab with the result if running in a web browser. |
| **Launch(&nbsp;"http://bing.com/search",&nbsp;<br>{&nbsp;q:&nbsp;"Power&nbsp;Apps",&nbsp;count:&nbsp;1&nbsp;},&nbsp;<br>"Search&nbsp;Results"&nbsp;)** | The same as the previous example, creating or replacing the contents of the window or tab named **Search Results**. |

#### From a canvas app to a canvas app

Update the app ID, screen name, and record number as appropriate.

```power-fx
Launch( "/providers/Microsoft.PowerApps/apps/YOUR-APP-ID",
        { Navigate: "Second Screen", Record: 34 }
)
```

#### From a web page to a canvas app

Update the app ID, tenant ID, screen name, and record number as appropriate.

```html
<html>
  <body>
    <a
      href="https://apps.powerapps.com/play/e/YOUR-APP-ENVIRONMENT-ID/a/YOUR-APP-ID?tenantId=YOUR-TENANT-ID&Navigate=Second%20Screen&Record=34"
    >
      Launch canvas app
    </a>
  </body>
</html>
```

### Simple Param

Simple launch examples above to launch canvas app [from web page](#from-a-web-page-to-a-canvas-app) or [from another canvas app](#from-a-canvas-app-to-a-canvas-app) show simple examples for Param function:

| Formula                           | Description                                                                                                                                                                                                                                          | Result          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **Param(&nbsp;"Navigate"&nbsp;)** | The **Navigate** parameter was provided when the app was launched and is returned.                                                                                                                                                                   | "Second Screen" |
| **Param(&nbsp;"Record"&nbsp;)**   | The **Record** parameter was provided when the app was launched. Even though it was passed in as a number to the **Launch** function, the result from **Param** will be a text string that can be implicitly or explicitly converted to other types. | "34"            |
| **Param(&nbsp;"User"&nbsp;)**     | The **User** parameter wasn't provided. A _blank_ value is returned that can be tested with the [**IsBlank**](function-isblank-isempty.md) function.                                                                                                 | _blank_         |

### Step by Step examples for Launch and Param

The **Product Showcase** tablet layout template was used for the following examples. To create an app with this template, follow the steps from [create an app](/power-apps/maker/canvas-apps/get-started-test-drive) article and select the **Product Showcase** template. You can also use your own app.

#### Example - Launch

1. Go to [Power Apps](https://make.powerapps.com).
1. Select **Apps** from left navigation pane.
1. Select your app and then select **Edit**.
1. Select **Insert** from the menu and then select **Label**.
1. Move the label to the bottom right of the screen.
1. From the properties pane on the right-side, select **Color** as _white_ and set **Border thickness** at _1_.
1. Select the **Text** property from right-side and enter text as _Surface tablets in news_.
1. From property list on top left, select **OnSelect**.
1. Enter formula as `Launch("https://www.bing.com/news/search","q","Microsoft Surface tablets")`. You can also use any other URL, parameter, and keywords of your choice.

   ![Launch example.](media/function-param/launch-example-onselect.png "Launch example")

1. Save and publish the app.
1. Play the app.
1. Select label **Surface tablets in news** to launch news search with keywords _Microsoft Surface tablets_.

> [!TIP]
> For scalability, you can replace the manually entered keywords in Launch function with [variables](/power-apps/maker/canvas-apps/working-with-variables).

#### Example - Param

1. Go to [Power Apps](https://make.powerapps.com).
1. Select **Apps** from left navigation pane.
1. Select your app and then select **Edit**.
1. Select **Insert** from the menu and then select **Label**.
1. Move the label to the bottom right of the screen.
1. Select **Text** property for the label from top left.
1. Enter formula as `Param("browser")`. You can also use a different parameter of your choice.

   ![Param example.](media/function-param/param-example.png "Param example")

1. Save and publish the app.
1. Copy [web link](#address) for your app from [Power Apps](https://make.powerapps.com).
1. Open a new browser.
1. Paste the app web link in the browser and append `&browser=Microsoft%20Edge` at the end.

   ![Web address.](media/function-param/param-example-web-address.png "Web address")

1. When your app launches, the label shows the parameter value passed.

   ![Param example label.](media/function-param/param-example-label.png "Param example label")

1. Close the app player and edit the app.
1. Select **App** from the Tree view on left navigation.
1. Select **StartScreen** property on top left.
1. Enter the formula as `If( Param("screen") = "techspecs", TechSpecs )`.

   ![Param example for navigation.](media/function-param/param-example-screen.png "Param example for navigation")

   [If function](function-if.md) in [StartScreen](object-app.md#startscreen-property) property checks if parameter equals a certain value, in this case the value _techspecs_. And if it matches, returns the _TechSpecs_ screen control to the **StartScreen** property.

   > [!NOTE]
   > Replace the **TechSpecs** control name in the **If** function with the name of a screen control in your own app if you're not using the **Product Showcase** app template.

1. Save and publish the app.
1. Open a new browser.
1. Paste the app web link in the browser and append `&screen=techspecs` at the end.

   ![Web address for TechSpecs screen.](media/function-param/param-example-web-address-techspecs.png "Web address for TechSpecs screen")

1. The app directly launches with **TechSpecs** as the startscreen.

### See also

[Canvas app formula reference](/power-apps/maker/canvas-apps/formula-reference)

---

## Left, Mid, and Right functions

Source: [function-left-mid-right.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-left-mid-right)

*Reference information including syntax and examples for the Left, Mid, and Right functions.*

# Left, Mid, and Right functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Extracts the left, middle, or right portion of a string of text.

## Description

The **Left**, **Mid**, and **Right** functions return a portion of a string.

- **Left** returns the beginning characters of a string.
- **Mid** returns the middle characters of a string.
- **Right** returns the ending characters of a string.

If you specify a single string as an argument, the function returns the portion that you requested of the string. If you specify a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains strings, the function returns a single-column table with a **Value** column containing the portions that you requested of those strings. If you specify a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

If the starting position is negative or beyond the end of the string, **Mid** returns _blank_. You can check the length of a string by using the **[Len](function-len.md)** function. If you request more characters than the string contains, the function returns as many characters as possible.

## Syntax

**Left**( _String_, _NumberOfCharacters_ )<br>**Mid**( _String_, _StartingPosition_ [, *NumberOfCharacters* ] )<br>**Right**( _String_, _NumberOfCharacters_ )

- _String_ - Required. The string to from which to extract the result.
- _StartingPosition_ - Required (**Mid** only). The starting position. The first character of the string is position 1.
- _NumberOfCharacters_ - Required (**Left** and **Right** only). The number of characters to return. If omitted for the **Mid** function, the function returns the portion from the starting position until the end of the string.

**Left**( _SingleColumnTable_, _NumberOfCharacters_ )<br>**Mid**( _SingleColumnTable_, _StartingPosition_ [, *NumberOfCharacters* ] )<br>**Right**( _SingleColumnTable_, _NumberOfCharacters_ )

- _SingleColumnTable_ - Required. A single-column table of strings from which to extract the results.
- _StartingPosition_ - Required (**Mid** only). The starting position. The first character of the string is position 1.
- _NumberOfCharacters_ - Required (**Left** and **Right** only). The number of characters to return. If omitted for the **Mid** function, the function returns the portion from the starting position until the end of the string.

## Examples

### Single string

The examples in this section use a text-input control as their [data source](/power-apps/maker/canvas-apps/working-with-data-sources). The control is named **Author** and contains the string "E. E. Cummings".

| Formula                      | Description                                                                           | Result     |
| ---------------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **Left( Author.Text, 5 )**   | Extracts up to five characters from the start of the string.                          | "E. E."    |
| **Mid( Author.Text, 7, 4 )** | Extracts up to four characters, starting with the seventh character, from the string. | "Cumm"     |
| **Mid( Author.Text, 7 )**    | Extracts all characters, starting with the seventh character, from the string.        | "Cummings" |
| **Right( Author.Text, 5 )**  | Extracts up to five characters from the end of the string.                            | "mings"    |

### Single-column table

Each example in this section extracts strings from the **Address** [column](/power-apps/maker/canvas-apps/working-with-tables#columns) of this data source, named **People**, and returns a single-column table that contains the results:

| Name | Address |
| --- | --- |
| "Jean" | "123 Main St NE" |
| "Fred" | "789 SW 39th #3B" |

| Formula | Description | Result |
| --- | --- | --- |
| **Left( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;), 8 )** | Extracts the first eight characters of each string. | A single-column table with a `Value` column containing the following values: "123 Main", "789 SW 3" |
| **Mid( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;), 5, 7 )** | Extracts the middle seven characters of each string, starting with the fifth character. | A single-column table with a `Value` column containing the following values: "Main St", "SW 39th" |
| **Right( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;), 7 )** | Extracts the last seven characters of each string. | A single-column table with a `Value` column containing the following values: "n St NE", "9th #3B" |

### Step-by-step example

1. Import or create a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) named **Inventory**, and show it in a gallery, as the first procedure in [Show images and text in a gallery](/power-apps/maker/canvas-apps/show-images-text-gallery-sort-filter) describes.
2. Set the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property of the lower label in the gallery to this function:

   **Right( ThisItem.ProductName, 3 )**

   The label shows the last three characters of each product name.

---

## Len function

Source: [function-len.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-len)

*Reference information including syntax and examples for the Len function.*

# Len function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns the length of a string of text.

## Description

If you specify a single string as the argument, the return value is the length as a number. If you specify a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains strings, the return value is a single-column table with a **Value** column that contains the length of each string. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

If you specify a [blank](function-isblank-isempty.md) string, **Len** returns 0.

## Syntax

**Len**( _String_ )

- _String_ - Required. The string to measure.

**Len**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of strings to measure.

## Examples

### Single string

For the examples in this section, the [data source](/power-apps/maker/canvas-apps/working-with-data-sources) is a text-input control that's named **Author** and that contains the string "E. E. Cummings".

| Formula | Description | Result |
| --- | --- | --- |
| **Len( Author.Text )** | Measures the length of the string in the **Author** control. | 14 |
| **Len( "" )** | Measures the length of an empty string. | 0 |

### Single-column table

For the first example in this section, the data source is named **People** and contains this data:

| Name | Address |
| --- | --- |
| "Jean" | "123 Main St NE" |
| "Fred" | "789 SW 39th #3B" |

| Formula | Description | Result |
| --- | --- | --- |
| **Len( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;) )** | In the **Address** [column](/power-apps/maker/canvas-apps/working-with-tables#columns) of the **People** table:<br><ul><li>Measures the length of each string.</li><li>Returns a single-column table that contains the length of each string.</li> | A single-column table with a `Value` column containing the following values: 14, 15 |
| **Len( [ "Hello", "to the", "World", "" ] )** | In the **[Value](function-value.md)** column of the inline table:<br><ul><li>Measures the length of each string.</li><li>Returns a single-column table that contains the length of each string.</li> | A single-column table with a `Value` column containing the following values: 5, 6, 5, 0 |

---

## Lower, Upper, and Proper functions

Source: [function-lower-upper-proper.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-lower-upper-proper)

*Reference information including syntax and examples for the Lower, Upper, and Proper functions.*

# Lower, Upper, and Proper functions
| Functions | Applies to |
|-----------|------------|
| **Lower**</br>**Upper** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **Proper** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Converts letters in a string of text to all lowercase, all uppercase, or proper case.

## Description

The **Lower**, **Upper**, and **Proper** functions convert the case of letters in strings.

- **Lower** converts any uppercase letters to lowercase.
- **Upper** converts any lowercase letters to uppercase.
- **Proper** converts the first letter in each word to uppercase if it's lowercase and converts any other uppercase letters to lowercase.

All three functions ignore characters that aren't letters.

If you pass a single string, the return value is the converted version of that string. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains strings, the return value is a single-column table of converted strings. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

## Syntax

**Lower**( _String_ )<br>**Upper**( _String_ )<br>**Proper**( _String_ )

- _String_ - Required. The string to convert.

**Lower**( _SingleColumnTable_ )<br>**Upper**( _SingleColumnTable_ )<br>**Proper**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of strings to convert.

## Examples

### Single string

The examples in this section use a text-input control, named **Author**, as their [data source](/power-apps/maker/canvas-apps/working-with-data-sources). The control contains the string "E. E. CummINGS".

| Formula                             | Description                                                                                                                   | Result           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **Lower(&nbsp;Author.Text&nbsp;)**  | Converts any uppercase letters in the string to lowercase.                                                                    | "e. e. cummings" |
| **Upper(&nbsp;Author.Text&nbsp;)**  | Converts any lowercase letters in the string to uppercase.                                                                    | "E. E. CUMMINGS" |
| **Proper(&nbsp;Author.Text&nbsp;)** | Converts the first letter of each word to uppercase if it's lowercase, and converts any other uppercase letters to lowercase. | "E. E. Cummings" |

### Single-column table

The examples in this section convert strings from the **Address** [column](/power-apps/maker/canvas-apps/working-with-tables#columns) of the **People** data source, which contains this data:

| Name | Address |
| --- | --- |
| "Jean" | "123 Main St NE" |
| "Fred" | "789 SW 39th #3B" |

Each formula returns a single-column table that contains the converted strings.

| Formula | Description | Result |
| --- | --- | --- |
| **Lower( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;) )** | Converts any letter that's lowercase to uppercase. | A single-column table with a `Value` column containing the following values: "123 main st ne", "789 sw 39th #3b" |
| **Upper( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;) )** | Converts any letter that's lowercase to uppercase. | A single-column table with a `Value` column containing the following values: "123 MAIN ST NE", "789 SW 39TH #3B" |
| **Proper( ShowColumns(&nbsp;People,&nbsp;"Address"&nbsp;) )** | Converts any first letter of a word that's lowercase to uppercase, and converts any other letter that's uppercase to lowercase. | A single-column table with a `Value` column containing the following values: "123 Main St Ne", "789 Sw 39th #3b" |

### Step-by-step example

1. Add a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control, and name it **Source**.
2. Add a label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this function:<br>**Proper(Source.Text)**
3. Press F5, and then type **WE ARE THE BEST!** into the **Source** box.<br>The label shows **We Are The Best!**

---

## Mod function

Source: [function-mod.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-mod)

*Reference information including syntax and examples for the Mod function.*

# Mod function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns the remainder of a division.

## Description

The **Mod** function returns the remainder after a number is divided by a divisor.

The result has the same sign as the divisor.

## Syntax

**Mod**( _Number_, _Divisor_ )

- _Number_ - Required. Number to divide.
- _Divisor_ - Required. Number to divide by.

## Examples

| Formula | Description | Result |
| --- | --- | --- |
| **Mod(25, 4)** | The number that remains after dividing 25 by 4 | 1 |
| **Mod(25, -4)** | The number that remains after dividing 25 by -4 | -3 |
| **Mod(-25, -4)** | The number that remains after dividing -25 by -4 | -1 |
| **Mod(-25, 4)** | The number that remains after dividing -25 by 4 | 3 |

---

## Notify function

Source: [function-showerror.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-showerror)

*Reference information including syntax and examples for the Notify function.*

# Notify function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps
- ✓ Power Platform CLI



Displays a banner message to the user.

## Description

The **Notify** function displays a banner message to the user at the top of the screen. The notification remains until the user dismisses it or the timeout expires which defaults to 10 seconds.

An appropriate color and icon are used depending on the type of the message. The type is specified by the second argument to the function:

> [!NOTE]
> The character limit for **Notify** function is 500 characters.

| NotificationType Argument                  | Description                            |
| ------------------------------------------ | -------------------------------------- |
| **NotificationType.Error**                 | Displays the message as an error.      |
| **NotificationType.Information** (Default) | Displays the message as informational. |
| **NotificationType.Success**               | Displays the message as success.       |
| **NotificationType.Warning**               | Displays the message as a warning.     |

Messages are shown both when authoring your app and when end users are using your app.

**Notify** can only be used in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

**Notify** can be paired with the [**IfError**](function-iferror.md) function to detect and report errors with a custom error message.

Power Apps can also send push notifications using an entirely different mechanism from **Notify**. For more information, see [Send a notification in Power Apps](/power-apps/maker/canvas-apps/add-notifications).

**Notify** always returns _true_.

Note: This function was previously named **ShowError** when it could only display error messages.

>[!NOTE]
> Notify can be used in [standalone canvas app](/power-apps/maker/canvas-apps/working-with-formulas), [custom page](/power-apps/maker/model-driven-apps/page-powerfx-in-model-app) and [Power Fx commanding](/power-apps/maker/model-driven-apps/commanding-use-powerfx) experiences. The default values for NotificationType and Timeout vary by the experience its used in. You can specify the values you want set for NotificationType and Timeout by explicitly setting them in your Power Fx expression and these values will be respected regardless of the experience. 


## Syntax

**Notify**( _Message_ [, _NotificationType_ [ , *Timeout* ] ] )

- _Message_ – Required. Message to display to the user.
- _NotificationType_ – Optional. Type of the message to display from the table above. The default is **NotificationType.Information**.
- _Timeout_ – Optional. Number of milliseconds to wait before automatically dismissing the notification. The default is 10 seconds (or 10,000 milliseconds). The notification is displayed indefinitely with a _Timeout_ of 0.

## Examples

### Step by step

1. Add a **Button** control to your screen.

2. Set the **OnSelect** property of the **Button** to the formula:

   ```power-fx
   Notify( "Hello, World" )
   ```

3. Click or press the button.

   Each time the button is clicked, the message **Hello, World** is displayed to the user as informational. It dismisses  automatically in 10 seconds (default timeout) if the user doesn't dismiss it or press the button again.

   ![In the authoring environment, showing Button.OnSelect calling Notify and displaying the resulting Hello, World message as a blue banner message for the user.](media/function-showerror/hello-world.png)

4. Change the type of message to indicate an error. Add a second argument to our formula:

   ```power-fx
   Notify( "Hello, World", NotificationType.Error )
   ```

5. Click or press the button.

   Now each time the button is clicked, the message **Hello, World** is displayed to the user as an error. It dismisses automatically in 10 seconds (default timeout) if the user doesn't dismiss it or press the button again.

   ![In the authoring environment, showing Button.OnSelect calling Notify and displaying the resulting Hello, World message as a red banner message for the user.](media/function-showerror/hello-world-error.png)

6. Change the type of message to indicate a warning. Change the second argument in our formula:

   ```power-fx
   Notify( "Hello, World", NotificationType.Warning, 4000 )
   ```

7. Click or press the button.

   Now each time the button is clicked, the message **Hello, World** is displayed to the user as a warning. It dismisses automatically in 4 seconds (4,000 milliseconds) if the user doesn't dismiss it or press the button again.

   ![In the authoring environment, showing Button.OnSelect calling Notify and displaying the resulting Hello, World message as an orange banner message for the user.](media/function-showerror/hello-world-warning.png)

8. Change the type of message to indicate success. Change the second argument in our formula:

   ```power-fx
   Notify( "Hello, World", NotificationType.Success, 0 )
   ```

9. Click or press the button.

   Now each time the button is clicked, the message **Hello, World** is displayed to the user as success. With a **0** timeout, the notification will only be dismissed by the user or by pressing the button again.

   ![In the authoring environment, showing Button.OnSelect calling Notify and displaying the resulting Hello, World message as a green banner message for the user.](media/function-showerror/hello-world-success.png)

---

## ParseJSON function

Source: [function-parsejson.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-parsejson)

*Reference information including syntax and examples for the ParseJSON function.*

# ParseJSON function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Interprets a JSON string and returns a [Dynamic value](../untyped-object.md) or a specific typed value if a type is provided.

## Description
The ParseJSON function parses a valid JSON string and returns a [Dynamic](../untyped-object.md) value representing the JSON structure. 

Optionally, use the second argument to convert the JSON to a typed object that can be directly used in Power Fx formulas. This makes the result easier to consume as conversions and coercions at the point of use are no longer required. The untyped JSON is mapped to the type with these rules:
- Columns in the type which are not present in the JSON are filled in with *blank*.
- Columns in the JSON which are not present in the type are ignored.
- Columns that are both in the type and JSON, the JSON value must be coercible to the type.

The ParseJSON function can return errors if the text isn't valid JSON according to the JavaScript Object Notation (JSON) format described in [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404) and [IETF RFC 8259](https://tools.ietf.org/html/rfc8259).

## Syntax
**ParseJSON**( *JSONString* [ , *Type* ] )

- *JSONString* – Required. The JSON structure represented as text.
- *Type* - Optional. The Power Fx type definition for the JSON structure. Without this argument, **ParseJSON** returns a dynamic value; with it the function returns a specific typed value.

## Converting Dynamic values
Without the second argument, ParseJSON returns a [Dynamic value](../untyped-object.md) which requires explicit conversion of field values in supported data types. The following table lists the [data types](../data-types.md) in Power Apps and a corresponding JSON data type and how to convert it.

| Data type | JSON examples | Description  | Example conversion |
| --- | --- | --- | --- |
| Boolean | `{ "bool": true }` | Boolean is an explicit type in JSON and can be directly converted. | **Boolean( ParseJSON("{ ""bool"": true }").bool )** |
| Color | `{ "color": "#102030" }`<br/>`{ "r": 255, "g": 128, "b": 0, "a": 0.5 }` | There's no color type in JSON. Color values can be created from RGBA integers or hexadecimal strings. | **ColorValue( ParseJSON( "{ ""color"": ""#102030"" }" ).color )**<br/>**With( { uo: ParseJSON( "{ ""r"": 255, ""g"": 128, ""b"": 0, ""a"": 0.5 }" ) }, RGBA( Value( uo.r ), Value( uo.g ), Value( uo.b ), Value( uo.a ) ) )** |
| Currency, Number | `{ "numbervalue": 123.5 }` | Numbers are represented directly in JSON with a period ( . ) as the decimal separator. | **Value( ParseJSON("{ ""numbervalue"": 123.5 }").numbervalue )** |
| Date, DateTime, Time | `{ "start": "2022-05-10" }`<br/>`{ "start": "23:12:49.000" }` | JSON doesn't have a date or time type so can only represent dates and times as strings. A dynamic value can be directly converted from a string in ISO 8601 format to a date, time or datetime. For other formats, first convert the JSON field to text using the [Text()](function-text.md) function and then use the [DateValue(), TimeValue() or DateTimeValue()](function-datevalue-timevalue.md) function that by default will use the language of the current user's settings. | **DateValue( ParseJSON("{ ""appointment"": ""2022-05-10"" }").appointment )**<br/>**DateValue( Text( ParseJSON("{ ""appointment"": ""May 5, 2022"" }").appointment ) )** |
| GUID | `{ "id": "123e4567-e89b-12d3-a456-426655440000" }` | JSON doesn't have a data type for GUIds so they can only be represented as strings. | **GUID( ParseJSON("{ ""id"": ""123e4567-e89b-12d3-a456-426655440000"" }").id )** |
| HyperLink, Image, Media | `{ "URI": "https://northwindtraders.com/logo.jpg" }` | These data types are text data types, and can be converted to text and then used in Power Apps. | **Text( ParseJSON("{ ""URI"": ""https://northwindtraders.com/logo.jpg"" }").URI )** |
| Choice | `{ "status": 1 }`<br/>`{ "status": "Closed" }` | Choices are presented as localized strings, backed by a number. The [JSON() function](function-json.md) serializes a choice to its backing number. There's no direct conversion from number or string to a choice, but the [Switch()](function-if.md) or [If()](function-if.md) functions can be used on the text or number value. | **Switch( Value( ParseJSON( "{ ""status"": 1 }" ).status ), 0, Status.Open, 1, Status.Closed )** |
| Record | `{ "field": "value" }` | There's no direct conversion from a JSON object to a record structure, but individual fields can be retrieved from the **Dynamic** value to form a record. | **{ field: Text( ParseJSON( "{ ""field"": ""value"" }" ).field ) }** |
| Record Reference | n/a | Record references are unique to datasources and can't be serialized or unserialized. Field values that represent unique keys could be used in JSON to identify records that can then be looked up. | n/a |
| Table | `[ { "id": 1, "name": "one" }, { "id": 2, "name": "two" } ]`<br/>`[1, 2, 3]` | JSON can contain arrays, which can be converted into tables. These values can be arrays of records, or arrays of values that are effectively single column tables. **ParseJSON()** arrays can only be converted into a single column table of **Dynamic** values, and can be used as such or converted to typed tables of records using **ForAll()**. | **ForAll( Table( ParseJSON( "[ { ""id"": 1, ""name"": ""one"" }, { ""id"": 2, ""name"": ""two"" } ]" ) ), { id: Value(ThisRecord.Value.id), name: Text(ThisRecord.Value.name) } )** |
| Text | `{ "stringField": "this is text" }` | Text is an explicit type in JSON and can be directly converted. | **Text( ParseJSON( "{ ""stringField"": ""this is text"" }").stringField )** |
| Two options | `{ "available": true }`<br/>`{ "available": "Yes" }` | Two options are presented as localized strings, backed by a boolean. The [JSON() function](function-json.md) serializes a two options to its boolean value. There's no direct conversion from boolean, number or string to a two options, but the [Switch()](function-if.md) or [If()](function-if.md) functions can be used on the text, number or boolean value. | **Switch( Boolean( ParseJSON( "{ ""available"": true }" ).available ), false, Availability.No, true, Availability.Yes )** |

## Examples

### Accessing field values
Given the following JSON string in a variable named `JsonString`
```JSON
{ "parent": { "child": "text value" }, "number": 567 }
```

1. The following formula returns the text `text value`:
    ```power-fx
    Text( ParseJSON( JsonString ).parent.child )
    ```
2. The following formula returns the number `567`:
    ```power-fx
    Value( ParseJSON( JsonString ).number )
    ```

In case a field name consists of an invalid identifier name, you can put the field names in single quotes.
Given the following JSON string in a variable named `JsonString`
```JSON
{ "0": { "child-field": "text value" } }
```

1. The following formula returns the text `text value`:
    ```power-fx
    Text( ParseJSON( JsonString ).'0'.'child-field' )
    ```

### Blanks
Given the following JSON string in a variable named `JsonString`
```JSON
{ "text": "text value" , "number": 567, "empty": null }
```

1. Attempting to access non-existing fields returns **Blank()**. The following formula returns `true`:
    ```power-fx
    IsBlank( Text( ParseJSON( JsonString ).parent.child ) )
    ```
2. JSON `null` values are considered **Blank()**. The following formula returns `true`:
    ```power-fx
    IsBlank( Text( ParseJSON( JsonString ).empty ) )
    ```

### Simple Arrays
Given the following JSON string in a variable named `JsonString`
```JSON
{ "array": [1, 2, 3] }
```

1. Accessing the second number in the array field's single-column table of **Dynamic** values and converting to a number using **Value()** returns `2`:
    ```power-fx
    Value( Index( ParseJSON( JsonString ).array, 2 ) )
    ```
2. Converting the single-column table of **dynamic** values in the array field, to a single column table of numbers `{ Value: 1 }, { Value: 2 }, { Value: 3 }`:
    ```power-fx
    ForAll( ParseJSON( JsonString ).array, Value( ThisRecord ) )
    ```

### Arrays of Records
Given the following JSON string in a variable named `JsonString`
```JSON
{ "array": [
    { "id": 1, "name": "One"},
    { "id": 2, "name": "Two"}
    ] }
```

1. Converting to a typed table of records directly with **ForAll()** can be done by using `ThisRecord.[fieldname]` to access **dynamic** fields and convert them to specific types:

    ```power-fx
    ForAll( ParseJSON( JsonString ).array, { id: Value(ThisRecord.id), name: Text(ThisRecord.name) })
    ```

### Array to Table

1. Converting **dynamic** values to a table by using the **Table()** function results in a single-column table of **dynamic** values. The object needs to then be accessed using `Value` (single) column and be converted to types as explained previously.

Given the following JSON string in a variable named `JsonString`
```JSON
{ "array": [1, 2, 3] }
```

**Table()** returns a single-column table of **dynamic** values with a single-column Value for number in the array...

   ```power-fx
    Set(untypedTable, Table( ParseJSON( JsonString ).array ));
    
    Value( Index(untypedTable, 1).Value.Value )
    ```

Given the following JSON string in a variable named `JsonString`
```JSON
{ "array": [
    { "id": 1, "name": "One"},
    { "id": 2, "name": "Two"}
    ] }
```

**Table()** returns a single-column table of **dynamic** values that represents each json object in the array.

  ```power-fx
    Set(untypedTable, Table( ParseJSON( JsonString ).array ) );
    
    Text( Index(untypedTable, 1).Value.name )
   ```

---

## Patch function

Source: [function-patch.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-patch)

*Reference information including syntax and examples for the Patch function.*

# Patch function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions




Modifies or creates one or more [records](/power-apps/maker/canvas-apps/working-with-tables#records) in a [data source](/power-apps/maker/canvas-apps/working-with-data-sources), or merges records outside of a data source.

Use the **Patch** function to modify records in complex situations, such as when you do updates that require no user interaction or use forms that span multiple screens.

To update records in a data source more easily for simple changes, use the **Edit form** control instead. When you add an **Edit form** control, you provide users with a form to fill in and then save the changes to a data source. For more information, see [Understand data forms](/power-apps/maker/canvas-apps/working-with-forms).

Watch this video to learn how to use the Patch function:

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=4f09e796-64f3-4895-89d9-70c8462dac37]

## Overview

Use the **Patch** function to modify one or more records of a data source. It updates the values of specific [fields](/power-apps/maker/canvas-apps/working-with-tables#elements-of-a-table) without affecting other properties. For example, this formula changes the phone number for a customer named Contoso:

`Patch( Customers, LookUp( Customers, Name = "Contoso" ), { Phone: "1-212-555-1234" } )`

Use **Patch** with the **[Defaults](function-defaults.md)** function to create records. Use this behavior to build a [single screen](/power-apps/maker/canvas-apps/working-with-data-sources) for both creating and editing records. For example, this formula creates a record for a customer named Contoso:

`Patch( Customers, Defaults( Customers ), { Name: "Contoso" } )`

> [!NOTE]
>  When you patch a collection by using a record from a data source with default values, the patch operation updates the collection with both the specified patch values and the default values from the data source. The DataSource of the patch statement and the DataSource of the Defaults function must match to create a new record.

Even if you're not working with a data source, you can use **Patch** to merge two or more records. For example, this formula merges two records into one that identifies both the phone number and the location for Contoso:

`Patch( { Name: "Contoso", Phone: "1-212-555-1234" }, { Name: "Contoso", Location: "Midtown" } )`

## Description

### Modify or create a record in a data source

To use this function with a data source, specify the data source, and then specify a base record:

- To modify a record, the base record needs to come from a data source. You might get the base record through a gallery's **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property, place it in a [context variable](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable), or obtain it through some other path. But, you must be able to trace the base record back to the data source. This requirement is important because the record includes extra information that helps you find the record again for modification.
- To create a record, use the **[Defaults](function-defaults.md)** function to create a base record with default values.

Then specify one or more change records, each of which contains new property values that override property values in the base record. Change records are processed in order from the beginning of the argument list to the end, with later property values overriding earlier ones.

The return value of **Patch** is the record that you modified or created. If you created a record, the return value might include properties that the data source generated automatically. However, the return value doesn't provide a value for fields of a related table.

For example, you use `Set(MyAccount, Patch(Accounts, First(Account), 'Account Name': "Example name"));` and then `MyAccount.'Primary Contact'.'Full Name'`. You can't yield a full name in this case. Instead, to access the fields of a related table, use a separate lookup such as:

```powerapps-dot
LookUp(Accounts, Account = MyAccount.Account).'Primary Contact'.'Full Name'
```

When you update a data source, one or more issues might arise. Use **[IfError](function-iferror.md)** and **[IsError](function-iferror.md)** with the return value from **Patch** to detect and respond to errors, as [Error Handling](../error-handling.md) describes.  You can also use the **[Errors](function-errors.md)** function to identify and examine issues, as [Working with Data Sources](/power-apps/maker/canvas-apps/working-with-data-sources) describes.

Related functions include the **[Update](function-update-updateif.md)** function to replace an entire record, and the **[Collect](function-clear-collect-clearcollect.md)** function to create a record. Use the **[UpdateIf](function-update-updateif.md)** function to modify specific properties of multiple records based on a condition.

### Modify or create a set of records in a data source

You can also use **Patch** to create or modify multiple records with a single call.

Instead of passing a single base record, provide a table of base records in the second argument. Provide change records in a table as well, corresponding one-for-one with the base records. The number of records in each change table must be the same as the number of records in the base table.

When you use **Patch** in this manner, the return value is also a table with each record corresponding one-for-one with the base and change records.

### Merge records outside of a data source

Specify two or more records that you want to merge. The function processes records in the order from the beginning of the argument list to the end, with later property values overriding earlier ones.

**Patch** returns the merged record and doesn't modify its arguments or records in any data sources.

## Syntax

#### Modify or create a record in a data source

**Patch**( _DataSource_, _BaseRecord_, _ChangeRecord1_ [, *ChangeRecord2*, … ])

- _DataSource_ – Required. The data source that contains the record that you want to modify or will contain the record that you want to create.
- _BaseRecord_ – Required. The record to modify or create. If the record came from a data source, the function finds and modifies the record. If the result of **[Defaults](function-defaults.md)** is used, the function creates a record. The DataSource of the patch statement and the DataSource of the Defaults function must match in order to create a new record. 
- _ChangeRecord(s)_ – Required. One or more records that contain properties to modify in the _BaseRecord_. The function processes change records in order from the beginning of the argument list to the end, with later property values overriding earlier ones.

#### Modify or create a set of records in a data source

**Patch**( _DataSource_, _BaseRecordsTable_, _ChangeRecordTable1_ [, *ChangeRecordTable2*, … ] )

- _DataSource_ – Required. The data source that contains the records that you want to modify or will contain the records that you want to create.
- _BaseRecordTable_ – Required. A table of records to modify or create. If the record came from a data source, the function finds and modifies the record. If the result of **[Defaults](function-defaults.md)** is used, the function creates a record. The DataSource of the patch statement and the DataSource of the Defaults function must match in order to create a new record. 
- _ChangeRecordTable(s)_ – Required. One or more tables of records that contain properties to modify for each record of the _BaseRecordTable_. The function processes change records in order from the beginning of the argument list to the end, with later property values overriding earlier ones.

#### Merge records

**Patch**( _Record1_, _Record2_ [, …] )

- _Record(s)_ - Required. At least two records that you want to merge. The function processes records in order from the beginning of the argument list to the end, with later property values overriding earlier ones.

## Examples

#### Modify or create a record (in a data source)

In these examples, you modify or create a record in a data source named **IceCream**. The data source contains the data in this [table](/power-apps/maker/canvas-apps/working-with-tables) and automatically generates the values in the **ID** [column](/power-apps/maker/canvas-apps/working-with-tables#columns):

:::image type="content" source="media/function-patch/icecream.png" alt-text="Screenshot of the IceCream data source example table showing flavors and quantities.":::


To create an in-memory version of this data source so you can try these examples, evaluate this formula:

```powerapps-dot
ClearCollect( IceCream,
    { ID: 1, Flavor: "Chocolate", Quantity: 100 },
    { ID: 2, Flavor: "Vanilla", Quantity: 200 }
)
```

| Formula                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                         | Result                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Patch(&nbsp;IceCream,<br>LookUp( IceCream, Flavor = "Chocolate" ), {&nbsp;Quantity:&nbsp;400&nbsp;} )** | Modifies a record in the **IceCream** data source:<ul><li> The **ID** column of the record to modify contains the value of **1**. (The **Chocolate** record has that ID.)</li><li>The value in the **Quantity** column changes to **400**.                                                                                                                                                                          | {&nbsp;ID:&nbsp;1, Flavor:&nbsp;"Chocolate", Quantity:&nbsp;400 }<br><br>The **Chocolate** entry in the **IceCream** data source is modified. |
| **Patch( IceCream, Defaults(&nbsp;IceCream ), {&nbsp;Flavor:&nbsp;"Strawberry"&nbsp;}&nbsp;)**            | Creates a record in the **IceCream** data source:<ul><li>The **ID** column contains the value **3**, which the data source generates automatically.</li><li>The **Quantity** column contains **0**, which is the default value for that column in the **IceCream** data source, as the **[Defaults](function-defaults.md)** function specifies.<li>The **Flavor** column contains the value of **Strawberry**.</li> | { ID:&nbsp;3, Flavor:&nbsp;"Strawberry", Quantity:&nbsp;0&nbsp;}<br><br>The **Strawberry** entry in the **IceCream** data source is created.  |

After the previous formulas are evaluated, the data source ends with these values:

:::image type="content" source="media/function-patch/icecream-after.png" alt-text="Screenshot of the IceCream data source after the Patch formulas have been evaluated.":::

#### Merge records (outside of a data source)

| Formula                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Result                                                            |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Patch(&nbsp;{&nbsp;Name:&nbsp;"James",&nbsp;Score:&nbsp;90&nbsp;}, {&nbsp;Name:&nbsp;"Jim",&nbsp;Passed:&nbsp;true&nbsp;} )** | Merges two records outside of a data source:<br><ul><li>The values in the **Name** column of each record don't match. The result contains the value (**Jim**) in the record that's closer to the end of the argument list instead of the value (**James**) in the record that's closer to the start.</li><li>The first record contains a column (**Score**) that doesn't exist in the second record. The result contains that column with its value (**90**).</li><li>The second record contains a column (**Passed**) that doesn't exist in the first record. The result contains that column with its value (**true**). | {&nbsp;Name:&nbsp;"Jim", Score:&nbsp;90, Passed:&nbsp;true&nbsp;} |

#### Modify or create a set of records (in a data source)

When you use **Patch** with tables instead of single records, you can create or modify multiple records in a single call. The return value is a table of records that corresponds one-for-one with the input tables.

This example updates the **Quantity** for multiple flavors in the **IceCream** data source at once:

```powerapps-dot
Patch(
    IceCream,
    Table(
        { ID: 1, Flavor: "Chocolate", Quantity: 150 },
        { ID: 2, Flavor: "Vanilla", Quantity: 200 }
    ),
    Table(
        { Quantity: 300 },
        { Quantity: 400 }
    )
)
```

The result is a table with the updated records: `{ ID: 1, Flavor: "Chocolate", Quantity: 300 }` and `{ ID: 2, Flavor: "Vanilla", Quantity: 400 }`.

This example creates multiple new records using **Defaults**:

```powerapps-dot
Patch(
    IceCream,
    Table( Defaults( IceCream ), Defaults( IceCream ) ),
    Table(
        { Flavor: "Mint", Quantity: 60 },
        { Flavor: "Peach", Quantity: 80 }
    )
)
```

> [!NOTE]
> When you use **Patch** with tables, the number of records in each change table must match the number of records in the base table. Otherwise, an error occurs.

To detect errors when you modify multiple records, use **[IfError](function-iferror.md)**. `IfError` is the preferred mechanism and works across Power Fx hosts:

```powerapps-dot
IfError(
    Patch(
        IceCream,
        baseRecords,
        changeRecords
    ),
    Notify( "Some records failed to update: " & FirstError.Message, NotificationType.Error )
)
```

#### Patch with Dataverse column types

The following examples apply specifically to **Microsoft Dataverse** data sources. Record shapes vary by data source (for example, SharePoint and SQL Server have different formats).

**Choice column:** To set a Choice column, use the enum value directly. This example sets a **Status** choice column on an **Accounts** table:

```powerapps-dot
Patch(
    Accounts,
    LookUp( Accounts, 'Account Name' = "Contoso" ),
    { 'Status': 'Status (Accounts)'.Active }
)
```

**Lookup column:** To set a Lookup column, provide a record with the primary key of the related table. This example sets the **Primary Contact** lookup on an **Accounts** record:

```powerapps-dot 
Patch(
    Accounts,
    LookUp( Accounts, 'Account Name' = "Contoso" ),
    { 'Primary Contact': LookUp( Contacts, 'Full Name' = "John Smith" ) }
)
```

> [!NOTE]
> These column-type examples are Dataverse-specific. Other data sources, such as SharePoint or SQL Server, might require different record shapes for similar column types. Refer to the documentation for your specific data source for the correct format.

### Delegation in formulas that use Patch

The **Patch** function itself isn't subject to [delegation](/power-apps/maker/canvas-apps/delegation-overview) because it writes to the data source rather than querying it. However, delegation warnings might appear in formulas that use **Patch** if the record-selection portion of the formula (such as **[Filter](function-filter-lookup.md)**, **[LookUp](function-filter-lookup.md)**, or **[ForAll](function-forall.md)**) involves a query that exceeds the data source delegation limits.

When you see a delegation warning in a formula that includes **Patch**, check whether the warning applies to the data retrieval functions rather than to **Patch** itself. For more information about delegation, see [Understand delegation in a canvas app](/power-apps/maker/canvas-apps/delegation-overview).

### Common errors with the Patch function

When you use the **Patch** function, errors might occur because of data source connectivity, permissions, or data conflicts. Use **[IfError](function-iferror.md)** and **[IsError](function-iferror.md)** to detect errors and respond appropriately.

- **"Network error when using Patch function"**: This error typically indicates that the app can't reach the data source. Common causes include a lost internet connection, the data source being temporarily unavailable, or insufficient permissions for the current user. Wrap the **Patch** call in **IfError** to provide a meaningful message to users.

- **"Conflicts exist with changes on the server"**: This error occurs when another user or process modifies the same record between the time your app reads the record and writes the change. Refresh the data source by calling the **[Refresh](function-refresh.md)** function and retry the operation.

- **Permission errors**: If the user doesn't have permission to create or modify records in the data source, the **Patch** call fails. Use **IfError** to catch permission-related errors and guide the user.

For general error-handling patterns, see [Error handling](../error-handling.md).

### Use of **As** or **ThisRecord**

Use the **As** or **ThisRecord** keyword in your formula to avoid ambiguous evaluation context.

In the following example, consider the first `Lookup` in the `If` statement. `(OrderID = A[@OrderID])` is expected to compare the `OrderId` in the `Lookup` scope with the `OrderId` of collection `A` in the `ForAll` scope. In this case, you likely want `A[@OrderId]` to resolve as a local parameter. But it's ambiguous.

Power Apps currently interprets both the left-hand side `OrderId` and right-hand side `A[@OrderId]` as a field in the `Lookup` scope. Therefore, `Lookup` always finds the first row in `[dbo].[Orders1]` because the condition is always true (that is, any row's `OrderId` is equal to itself).

```power-fx
ClearCollect(
    A,
    Filter(
        '[dbo].[Orders1]',
        OrderId = 8888888
    )
);
ForAll(
    A,
    If(
        LookUp(
            '[dbo].[Orders1]',
            OrderId = A[@OrderId],
            "OK"
        ) = "OK",
        Patch(
            '[dbo].[Orders1]',
            LookUp(
                '[dbo].[Orders1]',
                OrderId = A[@OrderId]
            ),
            {
      OrderName: "val1"
       }
   ),
   Patch(
            '[dbo].[Orders1]',
            Defaults('[dbo].[Orders1]'),
            {
      OrderName: "val2"
       }
   )
    )
)
```

#### Using **As** or **ThisRecord**

Whenever possible, use the **As** operator or the **ThisRecord** keyword to disambiguate the left-hand side. **As** is recommended for the preceding scenario.

When your formula uses multiple scopes with `ForAll`, `Filter`, and `Lookup` on the same data source or table, scope parameters might collide with a same field elsewhere. Therefore, use the **As** operator or **ThisRecord** to resolve the field name and avoid ambiguity.

For example, you can use the **As** operator to disambiguate in the following example.

```power-fx
ClearCollect(
    A,
    Filter(
        '[dbo].[Orders1]',
        OrderId = 8888888
    )
);
ForAll(
    A,
    If(
        LookUp(
            '[dbo].[Orders1]' As B,
            B.OrderId = A[@OrderId],
            "OK"
        ) = "OK",
        Patch(
            '[dbo].[Orders1]',
            LookUp(
                '[dbo].[Orders1]' As C,
                C.OrderId = A[@OrderId]
            ),
            {
      OrderName: "val1"
       }
   ),
   Patch(
            '[dbo].[Orders1]',
            Defaults('[dbo].[Orders1]'),
            {
      OrderName: "val2"
       }
   )
    )
)
```

Alternatively, you can use **ThisRecord** for the same purpose.

```power-fx
ClearCollect(
    A,
    Filter(
        '[dbo].[Orders1]',
        OrderId = 8888888
    )
);
ForAll(
    A,
    If(
        LookUp(
            '[dbo].[Orders1]',
            ThisRecord.OrderId = A[@OrderId],
            "OK"
        ) = "OK",
        Patch(
            '[dbo].[Orders1]',
            LookUp(
                '[dbo].[Orders1]',
                ThisRecord.OrderId = A[@OrderId]
            ),
            {
      OrderName: "val1"
       }
   ),
   Patch(
            '[dbo].[Orders1]',
            Defaults('[dbo].[Orders1]'),
            {
      OrderName: "val2"
       }
   )
    )
)
```

To learn more about the usage of the **As** operator and **ThisRecord**, see the **[Operators](operators.md)** article.

---

## PDF function (experimental)

Source: [function-pdf.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-pdf)

*Reference information including syntax and examples for the PDF function.*

# PDF function (experimental)
**Applies to:** 
- ✓ Canvas apps




[This article is prerelease documentation and is subject to change.]

Export contents from the current screen to an object for use in multiple scenarios.

> [!IMPORTANT]
> - This is an experimental feature.
> - Experimental features aren't meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback. More information: [**Understand experimental, preview, and retired features in canvas apps**](/power-apps/maker/canvas-apps/working-with-experimental-preview)
> - The behavior that this article describes is available only when the PDF function experimental feature in [**Settings &gt; Upcoming features &gt; Experimental**](/power-apps/maker/canvas-apps/working-with-experimental-preview#controlling-which-features-are-enabled) is turned on (it's off by default).
> - Your feedback is valuable to us. Please let us know what you think in the [**Power Apps experimental features community forum**](https://powerusers.microsoft.com/t5/Power-Apps-Experimental-Features/bd-p/PA_ExperimentalFeatures).

## Description

The PDF function allows you to select a screen or portions of a screen for export to a PDF object (blob).

Different configuration options enable different outcomes for the resulting generated PDF.

> [!IMPORTANT]
> - PDF generation happens on the device where the app is running. Different devices such as desktop computers and mobile devices will have different capacities when you're generating a PDF.
> - Generating a PDF with an exceptionally large file size can result in the app crashing. This depends on the capacity of the device that you're running the app on. Be aware of the size and number of images and how much data you want to include in the generated PDF, specifically for apps intended for use on a mobile device.

> [!NOTE]
> - You can only generate a PDF from content existing on the screen where you have invoked the PDF function. For example, if you have added the PDF function on screen two, then only the content in screen two can be included in the generated PDF.

## Syntax

**PDF** _(Screen or control name \[,{Size, DPI, Margin, Orientation, ExpandContainers}\])_

-   *Screen or control name –* Required. The screen or control containing the content to use to generate the PDF. Supported controls: Vertical Gallery, Vertical Layout Container, Horizontal Layout Container, Container, Screen.

-   *Size –* Optional. Controls the dimensions of the generated PDF. The default value depends on the app user's locale; Letter for US and Canada and A4 for other locales.

-   *DPI* – Optional. Controls the scaling/resolution of the generated PDF. Must be a value greater than 0. Content exceeding the space allowed by the specified margins may result in a higher effective DPI. The default value is 96.

-   *Margin –* Optional. A string specifying the size of the space reserved between the content and the outer edge of the generated PDF. Each margin of the generated PDF (top, right, bottom, left) can support a different value. Supported units of measurement for this value include in, cm, mm, pt, and px. The default value is 0.5 inch (12.7 mm) for all margins.

-   *Orientation –* Optional. Controls whether the generated PDF has a portrait (vertical) or landscape (horizontal) orientation. The default value is portrait (vertical).

-   *ExpandContainers –* Optional. Boolean. Controls whether certain containers with contents that exceed their allocated size expand to display all content in the generated PDF. Impacted controls include screens, containers, vertical and horizontal containers, vertical fixed-height galleries (not nested), forms, and scrollable canvas controls. The default value is false.

### Examples

| **Formula**                                                           | **Description**                                                                                                                                  | **Result**                                                                                                                                      |
|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **PDF(Screen1)**                                                      | Generates a PDF object with the default settings.                                                                                                | A PDF object is created from the visible contents of Screen1.                                                                                   |
| **PDF(Container1, {Size: "A3"})**                                       | Generates a PDF object with the paper size set to A3.                                                                                            | An A3-sized PDF object is created from the visible contents of Container1.                                                                      |
| **PDF(Screen1, {DPI: 72, Margin: "25mm", Orientation: "Landscape"})** | Generates a PDF object with the resolution (DPI) set to 72, the margin set to 25 millimeters, and the orientation set to landscape (horizontal). | A PDF with the specified DPI, margin, and orientation is created in the default size (dependent on locale) from the visible content on Screen1. |
| **PDF(Screen1, {ExpandContainers: true})**                            | Generates a PDF object with applicable controls expanded.                                                                                        | A PDF is created where any containers/galleries with more content than is visible are expanded to show all content in the generated PDF.        |

## Known limitations

- Certain controls aren't currently supported. These include charts, Power BI tile, Map, and some configurations of third-party PCF controls.

- Nested Galleries aren't supported.

- Non-Latin script types and font weights and styles such as bold and italic may not appear in the generated PDF for some fonts.

- Creation of fillable PDFs isn't supported.

---

## Print function

Source: [function-print.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-print)

*Reference information including syntax and examples for the Print function.*

# Print function
**Applies to:** 
- ✓ Canvas apps



Opens the current screen in the default browser print dialog.

## Description

The print function allows you to select any screen and fit it to a page in order to send it to a printer for printing or allows you to save it as a PDF file.

The different configurations of the screen enable different printing outcomes. For fixed screens, they fit the size of the page, for use of the screen templates/special sized screens, we will fit the content to the size of the print.

> [!NOTE]
> You can only print the screen you have added a button and defined **Print** function on `OnSelect` property of the button. For example, if you have added a button on `screen 2` and when you select the button, only the content in the `screen 2` gets printed.

## Syntax

`Print()`

### Examples

1. Go to [Power Apps](https://make.powerapps.com).
1. Select **Apps** from the left navigation pane.
1. Select your app or create an app from scratch.
1. Select **Insert** from the menu and then select **Button**.
1. From the property list on the top left, select **OnSelect**.
1. Enter the formula `Print()`.
1. Save and publish the app.
1. Play the app.
1. Select the button that you added. When you select the button, a default print browser pops up and allows you to choose from the available options to print or save it as a PDF file.

   ![Default print browser to print or save.](media/function-print/functions-print-screen.png "Default print browser to print or save")

### Hide controls while printing

To enable more customizable content, you can access the screen when the screen is printing to the change properties of the canvas app. For example, hiding buttons, or changing a form to view mode.

From the above example, where you insert a button on the screen and when you print the screen, you notice that the button is also gets printed. To remove the button from the screen while printing, on the button’s **Visible** property add the formula `Not Screen1.Printing`. Preview the app and select the button. Observe that the button does not show in the content in the browser preview print dialog.

### Use a screen template

An easy way to get started is to use a screen template to size your print to the letter size.

- Open or create a new canvas app.
- Select **New Screen** and select **Portrait print** option.

  ![New portrait print screen.](media/function-print/new-screen-portrait-print.png "New portrait print screen")

- Observe that the screen is sized differently from other screens with the print button on the top-right corner.

  ![Screen size portrait print.](media/function-print/screen-size-portrait-print.png "Screen size portrait print")

- Add content to this screen.
- Observe that the content is sized to the print. This enables more custom control over the experience.

### Screen sizes for common prints

To build out a print for a specific size, you can build a [responsive app](/power-apps/maker/canvas-apps/build-responsive-apps), or create a special screen to manage your print.

| Print size       | Screen height | Screen width |
| ---------------- | ------------- | ------------ |
| A4 portrait      | 1123          | 794          |
| A4 landscape     | 794           | 1123         |
| Letter portrait  | 1056          | 816          |
| Letter landscape | 816           | 1056         |
|                  |               |              |

## Known limitations

- The **Print** function currently doesn't work on mobile devices and on SharePoint forms.
- The default browser printers are the ones that will be available to print to.
- In some browser print dialogs, a setting called **Background graphics** should be enabled to see all the images and colors in the print.
- The **Print** function can't print multiple pages.

### See also

[Canvas app formula reference](/power-apps/maker/canvas-apps/formula-reference)

---

## Rand and RandBetween functions

Source: [function-rand.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-rand)

*Reference information including syntax and examples for the Rand and RandBetween functions.*

# Rand and RandBetween functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns a pseudo-random number.

## Description

The **Rand** function returns a pseudo-random number that's greater than or equal to 0 and less than 1. For example, **Rand()** might return **0.43147** and could return **0** but not **1**.

The **RandBetween** function returns a pseudo-random integer (whole number with no decimal portion) that is between two numbers, inclusive. For example, **RandBetween( 1, 3 )** may return **1**, **2**, or **3**.

## Volatile Functions

**Rand** and **RandBetween** are volatile function. Each time the function is evaluated it returns a different value.

When used in a data flow formula, a volatile function will only return a different value if the formula in which it appears is reevaluated. If nothing else changes in the formula then it will have the same value throughout the execution of your app.

For example, a label control with **Label1.Text = Rand()** won't change while your app is active. Only closing and reopening the app will result in a new value.

The function will be reevaluated if it's part of a formula in which something else has changed. For example, if we change our example to involve a slider control with **Label1.Text = Slider1.Value + Rand()** then a new random number is generated each time the Slider control's value changes and the label's text property is reevaluated. See below for this example.

When used in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth), **Rand** and **RandBetween** will be evaluated each time the behavior formula is evaluated. See below for an example.

## Syntax

**Rand**()

**RandBetween**( _Bottom_, _Top_ )

- _Bottom_ - Required. The smallest integer that the function can return.
- _Top_ - Required. The largest integer that the function can return. Must be equal to or greater than _Bottom_.

## Examples

#### Basic usage

| Formula                                      | Description                                                                                                                                                     | Result                                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Rand()**                                   | Returns a pseudo-random number that's greater than or equal to 0 and less than 1.                                                                               | Varies with each evaluation, for example **0.874252**. |
| **Rand()&nbsp;\*&nbsp;100**                  | Building on the previous example, uses multiplication to extend the range to greater than or equal to 0 and less than 100.                                      | Varies with each evaluation, for example **78.42521**. |
| **Int(&nbsp;Rand()&nbsp;\*&nbsp;100&nbsp;)** | Building on the previous example, uses the **Int** function to remove the decimal portion, resulting in an integer greater than or equal to 0 and less than 100 | Varies with each evaluation, for example **84**.       |
| **RandBetween(&nbsp;0,&nbsp;99&nbsp;)**      | Building on the previous example, performs the same operation using the **RandBetween** function                                                                | Varies with each evaluation, for example **21**.       |
| **RandBetween(&nbsp;-1,&nbsp;1&nbsp;)**      | Returns a pseudo-random number that is between -1 and 1 inclusive: **-1**, **0**, or **1**.                                                                     | Varies with each evaluation, for example **-1**.       |

#### Display a different random number as user input changes with Rand

1. Add a **[Slider](/power-apps/maker/canvas-apps/controls/control-slider)** control, and rename it **Slider1** if it has a different name.

1. Add a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control, and set its **Text** property to this formula:

   **Slider1.Value + Rand()**

   The label shows **50** (the default value for the slider) plus a random decimal:

   ![A screen displaying a label control with 50.741.](media/function-rand/rand-slider-1.png)

1. While holding down the Alt key, change the value of the slider.

   Every time you change the value of the slider, the decimal portion of the label shows a different random number:

   ![Four screens displaying a label control with four different random decimal values for each of four different slider settings 70.899, 84.667, 90.134, 99.690.](media/function-rand/rand-slider-results.png)

#### Create a table of random numbers with RandBetween

1. Add a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **ClearCollect( RandomNumbers, ForAll( Sequence( 100 ), RandBetween( 1, 20 ) ))**

   This formula creates a single-column table that's used to iterate 100 times, resulting in 100 random numbers.

1. Add a **[Data table](/power-apps/maker/canvas-apps/controls/control-data-table)**, set its **Items** property to **RandomNumbers**, and show the **Value** field.

   ![Data source selection of the RandomNumbers collection.](media/function-rand/set-show-data.png)

1. While holding down the **Alt** key, select the button by clicking or tapping it.

   The data table shows 100 hundred random numbers between 1 and 20:

   ![Data table with 100 hundred random numbers.](media/function-rand/rand-collection-1.png)

1. Select the button again to show a different list of random numbers:

   ![The same screen showing a data table with a new set of random numbers.](media/function-rand/rand-collection-2.png)

To generate a single random number instead of a table, use **Set( RandomNumber, Rand() )** or **Set( RandNumber, RandBetween( 1, 20 ) )**.

---

## ReadNFC function

Source: [function-readnfc.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-readnfc)

*Reference information, including syntax, for the ReadNFC function*

# ReadNFC function
**Applies to:** 
- ✓ Canvas apps



Reads a Near Field Communication (NFC) tag.

## Description

Use the **ReadNFC** function to read an NFC tag that is close to your device. When invoked, the screen displays instructions for scanning an NFC tag, and only returns after the tag has been scanned or it times out.

| **Column**  | **Type** | **Description**                              |
|-------------|----------|----------------------------------------------|
| Identifier  | Text     | The NFC tags identifier if available.        |
| NDEFRecords | Table    | The supported NDEF records found on the tag. |

A single **NDEFRecord** contains the following columns:

| **Column** | **Type**  | **Description**                                                                            |
|------------|-----------|--------------------------------------------------------------------------------------------|
| RTD        | Text      | The tag's Record Type Definition (RTD). Only *Text* and *URI* are supported at this time.  |
| TNF        | Number    | The tag's Type Name Format (TNF). Only TNFs of *Well Known(1)* are supported at this time. |
| Text       | Text      | The text payload of the NFC tag if RTD is *TEXT*, *blank* otherwise.                       |
| URI        | Hyperlink | The URI payload of the NFC tag if RTD is *URI*, *blank* otherwise.                         |

If the NDEF record isn't supported (for example, the TNF isn't of type *Well Known*), then it won't be returned as part of the **NDEFRecords** table.

Always check the payload values for *blank* using the [**IsBlank**](function-isblank-isempty.md) function before using it. You don't need to check the **RTD** and **TNF** values yourself as they must be the correct values for **Text** and **URI** to have a non-*blank* value.

Additional **RTD** and **TNF** values may be supported in the future. If more values are supported, additional payload columns will also be added. The raw **RTD** and **TNF** values are provided for informational purposes and don't need to be consulted if the payload column is checked for *blank*. More information about these values and their use is available through the [NFC Forum](https://nfc-forum.org/).

**ReadNFC** doesn't require a tag containing NDEF records to be used, but you may still get the tag identifier if one is available.  
  
**ReadNFC** can only be used in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

> [!NOTE]
> - **ReadNFC** is only supported when running the app on a native mobile app, such as the [iOS](https://apps.apple.com/us/app/power-apps/id1047318566) and [Android](https://play.google.com/store/apps/details?id=com.microsoft.msapps) apps. Even with a supported player, a device may not support NFC. If your application has **Formula-level error management** turned on, the function will return an error. Otherwise, an error message will be shown to the user and the function will return a *blank* record.
> - Ensure your device has the NFC setting enabled to use this capability.

## Syntax

**ReadNFC**()

## Examples

| **Formula**           | **Description**                                                                                | **Result**                                                              |
|-----------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `ReadNFC().Identifier`  | Returns the identifier of the NFC tag if one exists.                                            | `04A1C301314003`                                                          |
| `ReadNFC().NDEFRecords` | Returns a table of NDEF records found on the NFC tag if they're a supported type and payload. | :::image type="content" source="media/function-readnfc/ndefrecords.png" alt-text="NDEFRecords result with an example record."::: |

## Step-by-step example

1. Create a [blank canvas app](/power-apps/maker/canvas-apps/create-blank-app) with **Phone** format.

1. Add a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control.

1. Double-click the button control to change the button text to **Read NFC Tag** (or modify the **Text** property).

1. Set the **OnSelect** property of the button control to this formula that will add an item to our collection:  

    ```power-fx
    With(ReadNFC(),
        Set(id, Coalesce(Identifier, "No ID"));
        ForAll(NDEFRecords, Collect(tagRecords, {ID: id, Value: Coalesce(Text, URI)})))
    ```

    :::image type="content" source="media/function-readnfc/onselect-formula.png" alt-text="Above formula entered as the OnSelect property of the button.":::

    This formula reads an NFC tag using the `ReadNFC()` function, and displays type information about the result. Then it collects the read NFC tags to populate the `tagRecords` collection to be used for the gallery in the next steps.

1. Add a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) control with a vertical layout.

1. When prompted, select the **tagRecords** collection as the data source for this gallery. This action will set the **Items** property of the **Gallery** control.

    :::image type="content" source="media/function-readnfc/tagrecords.png" alt-text="Data source for gallery selected as tagRecords.":::

1. Reposition the gallery control so that it doesn't overlap the button, and change the layout type to **Title and subtitle**.

    :::image type="content" source="media/function-readnfc/gallery-layout.png" alt-text="Layout of the gallery.":::

1. Change the **Title** formula in the gallery control to **ThisItem.Value** and change the **Subtitle** formula in the gallery control to **ThisItem.ID**.

    You can also delete the **NextArrow** from the gallery control since it's not used.

1. [Save and publish](/power-apps/maker/canvas-apps/save-publish-app) the app.

1. Since the function `ReadNFC()` can't be used in Power Apps Studio or in a web browser, open your app on a mobile device.

    > [!TIP]
    > The app might take a few moments to appear on your mobile device. If you don't see the app listed, try refreshing your app list.

1. Select **Read NFC Tag** and scan a tag. Repeat the process to add multiple tags to your collection.

    :::image type="content" source="media/function-readnfc/app-example.png" alt-text="App on mobile device with the NFC Tag reading example and the result inside the gallery.":::

---

## RecordInfo function

Source: [function-recordinfo.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-recordinfo)

*Reference information including syntax and examples for the RecordInfo function.*

# RecordInfo function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Provides information about a [record](/power-apps/maker/canvas-apps/working-with-tables#elements-of-a-table) of a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

Use **RecordInfo** to obtain information about a particular record of a data source. The data source must be tabular and compatible with the [**Remove**](function-remove-removeif.md) and [**Patch**](function-patch.md) functions.

At this time, only Microsoft Dataverse is supported. Records from all other data sources will result in a formula error.

The information available:

| Information argument            | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| **RecordInfo.DeletePermission** | Does the current user have permission to remove this record from the data source? |
| **RecordInfo.EditPermission**   | Does the current user have permission to modify this record in the data source?   |
| **RecordInfo.ReadPermission**   | Does the current user have permission to read this record from the data source?   |

**RecordInfo** returns a Boolean value:

| Return value | Description                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| _true_       | The user has the permission.                                                                              |
| _false_      | The user does not have permission. If the record is _blank_ then **RecordInfo** will also return _false_. |

**RecordInfo** takes into account permissions at the data source level too. For example, if the user has permission at the record level to modify a record, but the user does not have permissions at the table level, then it will return _false_ for **ModifyPermission**. Use the [**DataSourceInfo**](function-datasourceinfo.md) function to obtain information about the data source as a whole.

## Syntax

**RecordInfo**( _Record_, _Information_ )

- _Record_ – Required. The record to test.
- _Information_ – Required. The desired information for the record.

## Examples

```power-fx
RecordInfo( First(Accounts), RecordInfo.EditPermission )
```

Checks the edit permission for the first record in the `Accounts` data source, which could be in Dataverse, SharePoint, SQL Server, or another tabular data source. If the user has permission to edit this record and modify the `Accounts` data source in general, then **RecordInfo** will return _true_.

```power-fx
With( { MyRecord: First( Accounts ) },
      RecordInfo( MyRecord, RecordInfo.EditPermission ) )
```

Captures a record using the [**With**](function-with.md) function and then passes this value to the `RecordInfo` function. The result will be the same as the last example.

```power-fx
Collect( MyAccounts, FirstN( Accounts, 10 ) );
RecordInfo( First( MyAccounts ), RecordInfo.EditPermission ) )
```

Captures the first 10 records from the `Accounts` data source into the `MyAccounts` collection. Since the records originated from a data source, they can be used with the **RecordInfo** function. The result will be the same as the last example.

```power-fx
Collect( MyCollection, [ 1, 2, 3 ] );
RecordInfo( First(MyCollection), RecordInfo.DeletePermission )
```

Creates the `MyCollection` collection and tests the first record to determine if it can be removed. Since the record's origin is a collection and not a data source, **RecordInfo** will return an error.

---

## RecordOf and Type functions

Source: [function-type.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-type)

*Reference information including syntax and examples for the RecordOf and Type functions.*

# RecordOf and Type functions
**Applies to:** 
- ✓ Canvas apps



Constructs a user defined type for use with user defined functions and untyped values.

## Description

Every function in Power Fx defines the types of values that can be passed in as parameters and the type of the output. Types are checked when you write a formula and errors shown if they don't agree with what is expected. Types are also used by the editor to suggest good options for what to pass into the function and detect errors as early as possible. 

When creating your own user defined functions, you need to specify the input and output types. For simple types like [**Decimal**](../data-types.md) or [**Text**](../data-types.md), this is easy as these basic types are predefined. For more complex types, such as records or tables, use the **Type** function to create the type.

The **Type** function also makes dynamic values easier to work with. With [**ParseJSON**](function-parsejson.md), [**IsType**](function-astype-istype.md), and [**AsType**](function-astype-istype.md) functions, a dynamic value can be converted to a typed object in which columns no longer need to be individually typed at the point of usage.

The **Type** function takes a *TypeSpecification* as its only argument. The simplest type specification is to reference an existing type, for example `Type( Text )`. A type specification for a record or table is similar to defining a record or table with literal values, where the values are replaced by type names. For example, `{Name: "Jane"}` would be typed with `Type( {Name: Text} )`. Tables are specified with square brackets, not the [**Table**](function-table.md) function, and only one record can be provided. For example, `[1,2,3]` would be typed with `Type( [Number] )`.

Use the **RecordOf** function to extract the record type from a table type. For example, `Type( RecordOf( Library ) )` would return the type of a single book from the library. To make a table type from a record type, wrap the record type in square brackets. For example, `Type( [ Book ] )` defines a library. **RecordOf** can only be used within the **Type** function.

The **Type** function and the type value it returns can only be used in specific places in Power Fx, such as the second argument to **ParseJSON**. In Canvas apps, the **Type** function can be used with a named formula in [**App.Formulas**](object-app.md#formulas-property).

## Syntax

**RecordOf**( *TableType* )

- _TableType_ – Required. The type name of a table. This doesn't accept a type specification, it needs to be the name of a previously defined type for a table.

**Type**( *TypeSpecification* )

- _TypeSpecification_ – Required. A type specification.

## Examples

### Type function

Consider the following definitions in **App.Formulas**:

```powerapps-dot
Library = 
  [ { Title: "A Study in Scarlet", Author: "Sir Arthur Conan Doyle", Published: 1887 }, 
    { Title: "And Then There Were None", Author: "Agatha Christie", Published: 1939 },
    { Title: "The Marvelous Land of Oz", Author: "L. Frank Baum", Published: 1904 } ];

// Type definition for a single book
BookType := Type( { Title: Text, Author: Text, Published: Number } );

// Type definition for a table of books
LibraryType := Type( [ BookType ] );
```

Notice how the actual title text `"A Study in Scarlet"` is replaced with the type name `Text` in the type specification, a placeholder for any text value. A parameter or variable of type `BookType` can hold one of the books in `Library`, while `LibraryType` can hold the entire table. With these types in place, we can define these user defined functions:

```powerapps-dot
SortedBooks( books: LibraryType ): LibraryType = 
    SortByColumns( Library, Author, SortOrder.Ascending, Title, SortOrder.Ascending );

PublishedInLeapYear( book: BookType ): Boolean = 
    Mod( book.Published, 4 ) = 0 And 
    (Mod( book.Published, 100 ) <> 0 Or Mod( book.Published, 400 ) = 0);
```

You can also use the `BookType` to parse a JSON string that contains a book:

```powerapps-dot
ParseJSON( "{""Title"":""Gulliver's Travels"", ""Author"": ""Jonathan Swift"", ""Published"": 1900}", BookType
)
```

Using `BookType` as the second argument to **ParseJSON** results in a typed record that can be used like any other Power Fx record.

### RecordOf function

In the **Type** function example, you start with `BookType` and build `LibraryType` by wrapping a table around it. We could have defined these types in reverse with:

```powerapps-dot
// Type definition for a table of books
RecordOfLibraryType := Type( [ { Title: Text, Author: Text, Published: Number } ] );

// Type definition for a single book
RecordOfBookType := Type( RecordOf( RecordOfLibraryType ) );
```

---

## Refresh function

Source: [function-refresh.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-refresh)

*Reference information including syntax and examples for the Refresh function.*

# Refresh function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Refreshes the [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

The **Refresh** function retrieves a fresh copy of a data source. You'll see changes that other users made.

**Refresh** has no return value, and you can use it only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Refresh**( _DataSource_ )

- _DataSource_ – Required. The data source that you want to refresh.

## Example

In this example, you'll refresh the data source named **IceCream**, which starts with this data:

![IceCream example.](media/function-refresh/icecream.png)

A user on another device changes the **Quantity** in the **Strawberry** record to **400**. You won't see this change until this formula executes:

**Refresh( IceCream )**

After that formula executes, galleries that are bound to the **IceCream** data source will show the updated value for **Strawberry**:

![IceCream after refresh.](media/function-refresh/icecream-after.png)

---

## Relate and Unrelate functions

Source: [function-relate-unrelate.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-relate-unrelate)

*Reference information including syntax and examples for the Relate and Unrelate functions.*

# Relate and Unrelate functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Relate and unrelate records of two tables through a one-to-many or many-to-many relationship.

## Description

The **Relate** function links two records through a one-to-many or many-to-many relationship in Microsoft Dataverse. The **Unrelate** function reverses the process and removes the link.

For one-to-many relationships, the Many table has a foreign-key field that points to a record of the One table. **Relate** sets this field to point to a specific record of the One table, while **Unrelate** sets this field to _blank_. If the field is already set when **Relate** is called, the existing link is lost in favor of the new link. You can also set this field by using the [**Patch**](function-patch.md) function or an **[Edit form](/power-apps/maker/canvas-apps/controls/control-form-detail)** control; you need not use the **Relate** function.

For many-to-many relationships, the system that links the records maintains a hidden join table. You can't access this join table directly; it can be read only through a one-to-many projection and set through the **Relate** and **Unrelate** functions. Neither related table has a foreign key.

The data for the table that you specify in the first argument will be refreshed to reflect the change, but the data for the table that you specify in the second argument won't. That data must be manually refreshed with the **[Refresh](function-refresh.md)** function to show the result of the operation.

These functions never create or delete a record. They only relate or unrelate two records that already exist.

You can use these functions only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

> [!NOTE]
> These functions are part of a preview feature, and their behavior is available only when the **Relational data, option sets, and other new features for CDS** feature is enabled. This is an app-level setting that's enabled by default for new apps. To find this feature switch, select **Settings**, and then select **Upcoming features**. Your feedback is very valuable to us - please let us know what you think in the [Power Apps community forums](https://powerusers.microsoft.com/t5/Expressions-and-Formulas/bd-p/How-To).

## Syntax

**Relate**( _Table1RelatedTable_, _Table2Record_ )

- _Table1RelatedTable_ - Required. For a record of _Table1_, the table of _Table2_ records related through a one-to-many or many-to-many relationship.
- _Table2Record_ - Required. The _Table2_ record to add to the relationship.

**Unrelate**( _Table1RelatedTable_, _Table2Record_ )

- _Table1RelatedTable_ - Required. For a record of _Table1_, the table of _Table2_ records related through a one-to-many or many-to-many relationship.
- _Table2Record_ - Required. The _Table2_ record to remove from the relationship.

## Examples

Consider a **Products** table with the following relationships as seen in the [Power Apps portal's table viewer](/power-apps/maker/data-platform/create-edit-entities-portal):

| Relationship display name | Related table | Relationship type |
| ------------------------- | ------------- | ----------------- |
| Product Reservation       | Reservation   | One-to-many       |
| Product &harr; Contact    | Contact       | Many-to-many      |

**Products** and **Reservations** are related through a One-to-Many relationship. To relate the first record of the **Reservations** table with the first record of the **Products** table:

`Relate( First( Products ).Reservations, First( Reservations ) )`

To remove the relationship between these records:

`Unrelate( First( Products ).Reservations, First( Reservations ) )`

At no time did we create or remove or a record, only the relationship between records was modified.

**Products** and **Contacts** are related through a Many-to-Many relationship. To relate the first record of the **Contacts** table with the first record of the **Products** table:

`Relate( First( Products ).Contacts, First( Contacts ) )`

As Many-to-Many relationships are symmetric, we could also have done this in the opposite direction:

`Relate( First( Contacts ).Products, First( Products ) )`

To remove the relationship between these records:

`Unrelate( First( Products ).Contacts, First( Contacts ) )`

or:

`Unrelate( First( Contacts ).Products, First( Products ) )`

The walk through that follows does exactly these operations on these tables using an app with **Gallery** and **Combo box** controls for selecting the records involved.

These examples depend on the sample data being installed in your environment. Either [create a trial environment including sample data](/power-apps/maker/model-driven-apps/overview-model-driven-samples#get-sample-apps) or [add sample data to an existing environment](/power-apps/maker/model-driven-apps/overview-model-driven-samples#install-or-uninstall-sample-data).

### One-to-many

#### **Relate** function

You'll first create a simple app to view and reassign the reservations that are associated with a product.

1. Create a [tablet app from blank](/power-apps/maker/canvas-apps/data-platform-create-app-scratch).

1. On the **View** tab, select **Data sources**.

1. In the **Data** pane, select **Add data** > select **Products**. <br>
   The Products table is part of the sample data loaded above.

1. On the **Insert** tab, add a blank vertical **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)** control.

1. Ensure that the control that you just added is named **Gallery1**, and then move and resize it to fill the left-hand side of the screen.

1. On the **Properties** tab, set **Gallery1**'s **Items** property to **Products** and its **Layout** to **Image and title**.

   ![Configure ProductsGallery.](media/function-relate-unrelate/products-gallery.png)

1. In **Gallery1**, ensure that the **Label** control is named **Title1**, and then set its **Text** property to **ThisItem.Name**.

   ![Configure the label in Gallery1.](media/function-relate-unrelate/products-title.png)

1. Select the screen to avoid inserting the next item into **Gallery1**. Add a second blank vertical **Gallery** control, and ensure that it's named **Gallery2**.

   **Gallery2** will show the reservations for whatever product the user selects in **Gallery1**.

1. Move and resize **Gallery2** to fill the upper-right quadrant of the screen.

1. (optional) Add the blue **Label** control above **Gallery2**, as the next graphic shows.

1. In the formula bar, set the **Items** property of **Gallery2** to **Gallery1.Selected.Reservations**.

   ![Configure Gallery2 Items.](media/function-relate-unrelate/reservations-gallery.png)

1. In the properties pane, set **Gallery2**'s **Layout** to **Title**.

   ![Configure Gallery2 Layout.](media/function-relate-unrelate/reservations-gallery-right.png)

1. In **Gallery2**, add a **[Combo box](/power-apps/maker/canvas-apps/controls/control-combo-box)** control, ensure that it's named **ComboBox1**, and then move and resize it to avoid blocking the other controls in **Gallery2**.

1. On the **Properties** tab, set **ComboBox1**'s **Items** property to **Products**.

   ![Set Items property to Products.](media/function-relate-unrelate/reservations-combo-right.png)

1. Scroll down in the **Properties** tab and set **ComboBox1**'s **Allow multiple selection** property to **Off**.

   ![Set Allow multiple selection to Off.](media/function-relate-unrelate/reservations-singleselect-right.png)

1. In the formula bar, set **ComboBox1**'s **DefaultSelectedItems** property to **ThisItem.'Product Reservation'**.

   ![Set DefaultSelectedItems for ReserveCombo.](media/function-relate-unrelate/reservations-combo.png)

1. In **Gallery2**, set **NextArrow2**'s **OnSelect** property to this formula:

   ```power-fx
   Relate( ComboBox1.Selected.Reservations, ThisItem )
   ```

   When the user selects this icon, the current reservation changes to the product that the user selected in **ComboBox1**.

   ![Configure NextArrow2.](media/function-relate-unrelate/reservations-relate.png)

1. Press F5 to test the app in Preview mode.

With this app, the user can move a reservation from one product to another. For a reservation on one product, the user can select a different product in **ComboBox1** and then select **NextArrow2** to change that reservation.

![Demonstrate Relate function in one-to-many app.](media/function-relate-unrelate/reservations-reassign.gif)

#### **Unrelate** function

At this point, you can move the relationship from one record to another, but you can't remove the relationship altogether. You can use the **Unrelate** function to disconnect a reservation record from any product.

1. On the **View** tab, select **Data sources**.

1. In the **Data** pane, select **Add data source** > **Microsoft Dataverse** > **Reservations** > **Connect**.

1. In **Gallery2**, set the **OnSelect** formula for **NextArrow2** to this formula:

   ```power-fx
   If( IsBlank( ComboBox1.Selected ),
       Unrelate( Gallery1.Selected.Reservations, ThisItem ),
       Relate( ComboBox1.Selected.Reservations, ThisItem )
   );
   Refresh( Reservations )
   ```

   ![Configure Right icon.](media/function-relate-unrelate/reservations-relate-unrelate.png)

1. Copy **Gallery2** to the Clipboard by selecting it and then pressing Ctrl-C.

1. Paste a duplicate of **Gallery2** to the same screen by pressing Ctrl-V, and then move it to the lower-right quadrant of the screen.

1. (optional) If you added a label above **Gallery2**, repeat the previous two steps for that label.

1. Ensure that the duplicate of **Gallery2** is named **Gallery2_1**, and then set its **Items** property to this formula:

   ```power-fx
   Filter( Reservations, IsBlank( 'Product Reservation' ) )
   ```

   A delegation warning appears, but it won't matter with the small amount of data in this example.

   ![Set the Items property of Gallery2_1.](media/function-relate-unrelate/reservations-lost.png)

With these changes, users can clear the selection in **ComboBox1** for a contact if that person hasn't reserved a product. Contacts who haven't reserved a product appear in **Gallery2_1** where users can assign each contact to a product.

![Demonstrate Relate and Unrelate functions in one-to-many app.](media/function-relate-unrelate/reservations-lostandfound.gif)

### Many-to-many

#### Create a many-to-many relationship

The sample data doesn't include a many-to-many relationship, but you'll create one between the Products table and the Contacts table. Users can relate each product to more than one contact and each contact to more than one product.

1. From [this page](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), select **Data** in the left navigation bar, and then select **Tables**.

   ![Open list of table.](media/function-relate-unrelate/entity-list.png)

1. Change the table filter to include all tables.

   By default, sample tables don't appear.

   ![Remove table filter.](media/function-relate-unrelate/entity-all.png)

1. Scroll down, open the **Product** table, and select **Relationships**.

1. Select **Add relationship** > **Many-to-many**.

1. Select the **Contact** table for the relationship.

1. Select **Done** > **Save table**.

#### Relate and unrelate contacts with one or more products

You'll create another app that resembles the one you created earlier in this topic, but the new app will offer a many-to-many relationship. Each contact will be able to reserve multiple products instead of only one.

1. In a blank app for tablets, create **Gallery1** as the [first procedure](#one-to-many) in this topic describes.

1. Add another blank vertical **Gallery** control, ensure that it's named **Gallery2**, and then move it into the upper-right corner of the screen.

   Later in this topic, you'll add a **Combo box** control under **Gallery2**.

1. In the formula bar, set **Gallery2**'s **Items** property to **Gallery1.Selected.Contacts**.

   ![Configure ContactsGallery - Items property.](media/function-relate-unrelate/contacts-gallery.png)

1. On the **Properties** tab, set **Layout** to **Image and title**.

   ![Configure ContactsGallery - Layout.](media/function-relate-unrelate/contacts-gallery-right.png)

1. In **Gallery2**, ensure that the **Label** control is named **Title2**, and then set its **Text** property to **ThisItem.'Full Name'**.

   No text will appear in that control until you finish this procedure and assign a contact to a product.

   ![Show contact name.](media/function-relate-unrelate/contacts-title.png)

1. Delete **NextArrow2**, insert a **Cancel** icon, and ensure that it's named **icon1**.

1. Set the **Cancel** icon's **OnSelect** property to this formula:

   ```power-fx
   Unrelate( Gallery1.Selected.Contacts, ThisItem )
   ```

   ![Configure Cancel icon.](media/function-relate-unrelate/contacts-unrelate.png)

1. On the **View** tab, select **Data sources**.

1. In the **Data** pane, select **Add data source** > **Microsoft Dataverse** > **Contacts** > **Connect**.

1. Under **Gallery2**, add a **Combo box** control, ensure that it's named **ComboBox1**, and then set its **Items** property to **Contacts**.

   ![Configure the combo box Items property.](media/function-relate-unrelate/contacts-combo.png)

1. On the **Properties** tab, set **Allow multiple selection** to **Off**.

   ![Configure the combo box Layout property.](media/function-relate-unrelate/contacts-combo-right.png)

1. Insert an **Add** icon, and set its **OnSelect** property to this formula:

   ```power-fx
   Relate( Gallery1.Selected.Contacts, ComboBox1.Selected )
   ```

   ![Configure Add icon.](media/function-relate-unrelate/contacts-relate.png)

With this app, users can now freely relate and unrelate a set of contacts to each product.

- To add a contact to a product, select the contact in the combo box at the bottom of the screen, and then select the **Add** icon.
- To remove a contact from a product, select the **Cancel** icon for that contact.

  Unlike one-to-many, a many-to-many relationship allows users to associate the same contact with multiple products.

![Demonstrate Relate and Unrelate functions in many-to-many app.](media/function-relate-unrelate/contacts-relate-unrelate.gif)

#### In reverse: relate and unrelate products with multiple contacts

Many-to-many relationships are symmetric. You can extend the example to add products to a contact and then flip between the two screens to show how the relationship appears from either direction.

1. Set the **OnVisible** property of **Screen1** to **Refresh( Products )**.

   When you update a one-to-many or many-to-many relationship, only the data of the first argument table of the **Relate** or **Unrelate** call is refreshed. The second must be refreshed manually if you want to flip between the screens of this app.

   ![Set OnVisible property to Refresh function.](media/function-relate-unrelate/contacts-refresh.png)

1. Duplicate **Screen1**.

   The duplicate will be named **Screen1_1** and form the basis for looking at the relationships from the contacts side.

   ![Duplicate a screen.](media/function-relate-unrelate/contacts-duplicate.png)

1. To create the reverse view, change these formulas on the controls of **Screen1_1**:

   - Screen1_1.OnVisible = `Refresh( Contacts )`
   - Gallery1_1.Items = `Contacts`
   - Title1_1.Text = `ThisItem.'Full Name'`
   - Label1_1.Text = `"Selected Contact Products"`
   - Gallery2_1.Items = `Gallery1_1.Selected.Products`
   - Title2_1.Text = `ThisItem.Name`
   - Icon1_1.OnSelect = `Unrelate( Gallery1_1.Selected.Products, ThisItem )`
   - ComboBox1_1.Items = `Products`
   - Icon2_1.OnSelect = `Relate( Gallery1_1.Selected.Products, ComboBox1_1.Selected )`

   The result will look very similar to the previous screen but comes at the relationship from the **Contacts** side.

   ![Show many-to-many relationship starting with contacts.](media/function-relate-unrelate/reverse-screen.png)

1. Insert an **Arrows up down** icon and set its **OnSelect** property to **Navigate( Screen1, None )**. Do the same thing on **Screen1** with the formula **Navigate( Screen1_1, None )**.

   ![Add navigation between screens.](media/function-relate-unrelate/reverse-navigate.png)

With this new screen, users can add a contact to a product and then flip to a view of contacts and see the associated product. The relationships are symmetric and shared between the two screens.

![Demonstrate many-to-many relationship from either side.](media/function-relate-unrelate/contacts-reverse.gif)

---

## Remove and RemoveIf functions

Source: [function-remove-removeif.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-remove-removeif)

*Reference information including syntax and examples for the Remove and RemoveIf functions.*

# Remove and RemoveIf functions
| Function | Applies to |
|-----------|------------|
| **Remove** | 
- ✓ Canvas apps 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **RemoveIf** | 
- ✓ Canvas apps 
- ✓ Model-driven apps |



Removes [records](/power-apps/maker/canvas-apps/working-with-tables#records) from a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) do not support the **RemoveIf** function.

## Description

### Remove function

Use the **Remove** function to remove a specific record or records from a data source.

For [collections](/power-apps/maker/canvas-apps/working-with-data-sources#collections), the entire record must match. You can use the **RemoveFlags.All** argument to remove all copies of a record; otherwise, only one copy of the record is removed.

### RemoveIf function

Use the **RemoveIf** function to remove a record or records based on a condition or a set of conditions. Each condition can be any formula that results in a **true** or **false** and can reference [columns](/power-apps/maker/canvas-apps/working-with-tables#columns) of the data source by name. Each condition is evaluated individually for each record, and the record is removed if all conditions evaluate to **true**.

**Remove** and **RemoveIf** return the modified data source as a [table](/power-apps/maker/canvas-apps/working-with-tables). You can use both functions only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

You can also use the **[Clear](function-clear-collect-clearcollect.md)** function to remove all of the records in a collection.

### Delegation

RemoveIf is supported by only a few data sources. For data sources that don't upport this feature, Power Apps will query the server and retrieve all data matching the filter expression, up to a maximum of either 500 or 2000 records or the data page size. Subsequently, it will delete each of those records individually by making separate calls to the server.

## Syntax

**Remove**( _DataSource_, _Record1_ [, *Record2*, ... ] [, **RemoveFlags.All** ] )

- _DataSource_ – Required. The data source that contains the record or records that you want to remove.
- _Record(s)_ – Required. The record or records to remove.
- **RemoveFlags.All** – Optional. In a collection, the same record may appear more than once. You can add the **RemoveFlags.All** argument to remove all copies of the record.

**Remove**( _DataSource_, _Table_ [, **RemoveFlags.All** ] )

- _DataSource_ – Required. The data source that contains the records that you want to remove.
- _Table_ – Required. A table of records to remove.
- **RemoveFlags.All** – Optional. In a collection, the same record may appear more than once. You can add the **RemoveFlags.All** argument to remove all copies of the record.

**RemoveIf**( _DataSource_, _Condition_ [, ... ] )

- _DataSource_ – Required. The data source that contains the record or records that you want to remove.
- _Condition(s)_ – Required. A formula that evaluates to **true** for the record or records to remove. You can use column names from the _DataSource_ in the formula. If you specify multiple _Conditions_, all must evaluate to **true** for the record or records to be removed.

## Examples - single formulas

In these examples, you'll remove a record or records in a data source that's named **IceCream** and that starts with the data in this table:

![IceCream example.](media/function-remove-removeif/icecream.png)

#### Create a collection with sample records

To create a collection with this data:

1. Insert a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control.
1. Set button control's **OnSelect** property to the below formula:

   ```power-fx
   ClearCollect( IceCream,
                 { ID: 1, Flavor: "Chocolate",  Quantity: 100 },
                 { ID: 2, Flavor: "Vanilla",    Quantity: 200 },
                 { ID: 3, Flavor: "Strawberry", Quantity: 300 }
   )
   ```

1. Select the button [while holding down the Alt key](/power-apps/maker/canvas-apps/keyboard-shortcuts#alternate-behavior):

#### Remove sample records from collection using a formula

| Formula                                                                                                                                                                            | Description                                                                                           | Result                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Remove(&nbsp;IceCream,<br>LookUp(&nbsp;IceCream,&nbsp;Flavor="Chocolate"&nbsp;))**                                                                           | Removes the **Chocolate** record from the data source.                                                | ![Result with Vanilla and Strawberry.](media/function-remove-removeif/icecream-no-chocolate.png)<br><br>The **IceCream** data source has been modified.     |
| **Remove(&nbsp;IceCream,<br>LookUp(&nbsp;IceCream,&nbsp;Flavor="Chocolate"&nbsp;), LookUp(&nbsp;IceCream,&nbsp;Flavor="Strawberry"&nbsp;) )** | Removes two records from the data source.                                                             | ![Result with only Vanilla.](media/function-remove-removeif/icecream-only-vanilla.png)<br><br>The **IceCream** data source has been modified.               |
| **RemoveIf(&nbsp;IceCream, Quantity&nbsp;>&nbsp;150 )**                                                                                                                            | Removes records that have a **Quantity** that's greater than **150**.                                 | ![Result with only Chocolate.](media/function-remove-removeif/icecream-only-chocolate.png)<br><br>The **IceCream** data source has been modified.           |
| **RemoveIf(&nbsp;IceCream, Quantity&nbsp;>&nbsp;150, Left(&nbsp;Flavor,&nbsp;1&nbsp;) = "S" )**                                                                                    | Removes records that have a **Quantity** that's greater than 150 and **Flavor** starts with an **S**. | ![Result with Chocolate and Vanilla.](media/function-remove-removeif/icecream-no-strawberry.png)<br><br><br>The **IceCream** data source has been modified. |
| **RemoveIf(&nbsp;IceCream, true )**                                                                                                                                                | Removes all records from the data source.                                                             | ![Result with no IceCream.](media/function-remove-removeif/icecream-empty.png)<br><br>The **IceCream** data source has been modified.                       |

## Examples - remove button outside a gallery

In this example, you'll use a [**Gallery** control](/power-apps/maker/canvas-apps/controls/control-gallery) to list the records in a table. And then use the **Remove** function to selectively remove an item.

### Prepare for sample data

This example uses the **Contacts** table in Microsoft Dataverse available with the _sample apps and data_. You can deploy _sample apps and data_ when you [create an environment](/power-platform/admin/create-environment#create-an-environment-with-a-database). You can also use any other data source instead.

### Remove button outside a gallery

In this example, you'll remove an item by using a _button_ that is outside the gallery.

1. Create a [new blank canvas app](/power-apps/maker/canvas-apps/data-platform-create-app-scratch) using a Phone layout.

   ![A blank canvas app using the phone layout.](media/function-remove-removeif/gallery-new.png)

1. Select the **Insert** from the left pane.

1. Select **Vertical gallery**. <br>
   A **Gallery** control is be added to your screen.

   ![Using the Insert tool pane to add a vertical gallery control.](media/function-remove-removeif/gallery-add.png)

1. You're prompted to select a data source where you can select a data source from the available data sources. <br>
   For example, select the **Contacts** table to use _sample data_:

   ![Selecting the Contacts table to display in the gallery.](media/function-remove-removeif/gallery-datasource.png)

   The gallery shows items from this table:

   ![Gallery added showing the Contacts table.](media/function-remove-removeif/gallery-data.png)

1. Insert a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control from left pane:

   ![Using the Insert tool pane to add a button control.](media/function-remove-removeif/gallery-addbutton.png)

1. Move the added button below the gallery items:

   ![Move button.](media/function-remove-removeif/move-button-down.png)

1. Update button text property to _Remove record_. You can also use text of your choice:

   ![Rename button.](media/function-remove-removeif/button-text.png)

1. Set the **OnSelect** property for this button control to the following formula:

   ```power-fx
   Remove( Contacts, Gallery1.Selected )
   ```

   ![Setting the OnSelect property of the button control.](media/function-remove-removeif/gallery-button-onselect.png)

   The gallery control makes the currently selected record available using **Selected** property. **Remove** function refers to this selected record to remove it.

1. Preview the app using the _Play_ button on the top right, or press _F5_ on keyboard:

   ![Preview app.](media/function-remove-removeif/preview-app.png)

1. Select a record to remove, such as _Nancy_'s record in this example:

   ![Select a record.](media/function-remove-removeif/select-nancy-record.png)

1. Select **Remove record**:

   ![Gallery of contacts, now without the Nancy record that has been removed.](media/function-remove-removeif/gallery-activatebutton.png)

   Selecting the button removes the selected record (in this example, Nancy's record).

1. Close the app preview.

   > [!TIP]
   > You can also use alternate behavior with [_Alt key_](/power-apps/maker/canvas-apps/keyboard-shortcuts#alternate-behavior) instead of using the app preview with _Play_ button or _F5_.

## Examples - trash can icon inside a gallery

In this example, you'll remove an item by using an _icon_ placed inside the gallery.

### Create a collection with sample data

If you already have [prepared sample data](#prepare-for-sample-data), skip this step and move to [Trash can icon inside a gallery](#trash-can-icon-inside-a-gallery).

1. Add a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control to your screen.
1. Set the **OnSelect** property to the following formula:

   ```power-fx
   ClearCollect( SampleContacts,
         { 'Full Name': "Yvonne McKay (sample)",      'Primary Email': "someone_a@example.com" },
         { 'Full Name': "Susanna Stubberod (sample)", 'Primary Email': "someone_b@example.com" },
         { 'Full Name': "Nancy Anderson (sample)",    'Primary Email': "someone_c@example.com" },
         { 'Full Name': "Maria Campbell (sample)",    'Primary Email': "someone_d@example.com" },
         { 'Full Name': "Robert Lyon (sample)",       'Primary Email': "someone_e@example.com" },
         { 'Full Name': "Paul Cannon (sample)",       'Primary Email': "someone_f@example.com" },
         { 'Full Name': "Rene Valdes (sample)",       'Primary Email': "someone_g@example.com" }
   )
   ```

1. Select the button [while holding down the Alt key](/power-apps/maker/canvas-apps/keyboard-shortcuts#alternate-behavior).

Sample collection is created that you can use in the following example.

### Trash can icon inside a gallery

1. Create a [new blank canvas app](/power-apps/maker/canvas-apps/data-platform-create-app-scratch) using a Phone layout.

   ![A blank canvas app using the phone layout.](media/function-remove-removeif/gallery-new.png)

1. Select the **Insert** from the left pane.

1. Select **Vertical gallery**. <br>
   A **Gallery** control is be added to your screen.

   ![Using the Insert tool pane to add a vertical gallery control.](media/function-remove-removeif/gallery-add.png)

1. You're prompted to select a data source where you can select a data source from the available data sources. <br>
   For example, select the **Contacts** table to use _sample data_:

   ![Selecting the Contacts table to display in the gallery.](media/function-remove-removeif/gallery-datasource.png)

   If you created a [collection](#create-a-collection-with-sample-data), select your collection instead:

   ![Sample contacts collection.](media/function-remove-removeif/sample-contacts.png)

1. Select a control within the top item in the gallery. <br>

   To ensure next step inserts item into gallery's template and not outside the gallery, ensure you follow this step before moving to the next step.

   ![Select top record in a gallery.](media/function-remove-removeif/gallery-select-template.png)

1. Select **Add icon** from left pane. <br>

   ![Using the Insert tool pane to add an icon control.](media/function-remove-removeif/gallery-addicon.png)

    > [!NOTE] 
    > **Add icon** inserts a **+** icon on the left side of the gallery, replicated for each item in the gallery.

1. In the top item, move the icon to the right side of the screen.

   ![Move icon.](media/function-remove-removeif/move-icon.png)

1. Select the **Icon** property for icon and set it to the following formula to update the icon image as trash icon:

   ```power-fx
   Icon.Trash
   ```

   > [!NOTE]
   > The **Icon.** prefix is only shown when you're actively editing the formula.

   ![Changing the icon to the trash can icon.](media/function-remove-removeif/gallery-icontrash.png)

1. Set the **OnSelect** property to the following formula:

   ```power-fx
   Remove( [@Contacts], ThisItem )
   ```

   > [!NOTE]
   > You must use [global disambiguation operator](operators.md#disambiguation-operator) **[@**...**]** in this example with sample data that uses the _Contacts_ table to avoid conflict with a _One-to-Many_ relationship. If you use data sources such as a list or a SQL Server table, using _global disambiguation operator_ is not required.

   ![OnSelect for trash icon.](media/function-remove-removeif/gallery-onselect.png)

1. Preview the app using the _Play_ button on the top right, or press _F5_ on keyboard.

1. Select the trash icon next to a record, for example _Maria_'s:

   ![Gallery with one of the contacts removed.](media/function-remove-removeif/gallery-activateicon.png)

   The record is deleted:

   ![Deleted record.](media/function-remove-removeif/deleted-record.png)

1. Close the app preview.

---

## Replace and Substitute functions

Source: [function-replace-substitute.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-replace-substitute)

*Reference information including syntax and examples for the Replace and Substitute functions.*

# Replace and Substitute functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Replace a portion of a string of text with another string.

## Description

The **Replace** function identifies the text to replace by starting position and length.

The **Substitute** function identifies the text to replace by matching a string. If more than one match is found, you can replace all of them or specify one to replace.

If you pass a single string, the return value is the modified string. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains strings, the return value is a single-column table with a **Value** column of modified strings. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

## Syntax

**Replace**( _String_, _StartingPosition_, _NumberOfCharacters_, _NewString_ )

- _String_ - Required. The string to operate on.
- _StartingPosition_ - Required. Character position to start the replacement. The first character of _String_ is at position 1.
- _NumberOfCharacters_ - Required. The number of characters to replace in _String_.
- _NewString_ - Required. The replacement string. The number of characters in this argument can differ from the _NumberOfCharacters_ argument.

**Substitute**( _String_, _OldString_, _NewString_ [, *InstanceNumber* ] )

- _String_ - Required. The string to operate on.
- _OldString_ - Required. The string to replace.
- _NewString_ - Required. The replacement string. _OldString_ and _NewString_ can have different lengths.
- _InstanceNumber_ - Optional. Use this argument to specify which instance of _OldString_ to replace if _String_ contains more than one instance. If you don't specify this argument, all instances will be replaced.

**Replace**( _SingleColumnTable_, _StartingPosition_, _NumberOfCharacters_, _NewString_ )

- _SingleColumnTable_ - Required. A single-column table of strings to operate on.
- _StartingPosition_ - Required. Character position to start the replacement. The first character of each string in the table is at position 1.
- _NumberOfCharacters_ - Required. The number of characters to replace in each string.
- _NewString_ - Required. The replacement string. The number of characters in this argument can differ from the _NumberOfCharacters_ argument.

**Substitute**( _SingleColumnTable_, _OldString_, _NewString_ [, *InstanceNumber* ] )

- _SingleColumnTable_ - Required. A single-column table of strings to operate on.
- _OldString_ - Required. The string to replace.
- _NewString_ - Required. The replacement string. _OldString_ and _NewString_ can have different lengths.
- _InstanceNumber_ - Optional. Use this argument to specify which instance of _OldString_ to replace if _String_ contains more than one instance. If you don't specify this argument, all instances will be replaced.

## Examples

| Formula | Description | Result |
| --- | --- | --- |
| **Replace( "abcdefghijk",&nbsp;6,&nbsp;5,&nbsp;"\*" )** | Replaces five characters in "abcdefghijk" with a single "\*" character, starting with the sixth character ("f"). | "abcde\*k" |
| **Replace(&nbsp;"2019",&nbsp;3,&nbsp;2,&nbsp;"20"&nbsp;)** | Replaces the last two characters of "2019" with "20". | "2020" |
| **Replace(&nbsp;"123456",&nbsp;1,&nbsp;3,&nbsp;"\_"&nbsp;)** | Replaces the first three characters of "123456" with a single "\_" character. | "\_456" |
| **Substitute(&nbsp;"Sales&nbsp;Data",&nbsp;"Sales",&nbsp;"Cost"&nbsp;)** | Substitutes the string "Cost" for "Sales". | "Cost Data" |
| **Substitute( "Quarter&nbsp;1,&nbsp;2018", "1", "2", 1 )** | Substitutes only the first instance of "1" with "2" because the fourth argument (_InstanceNumber_) is provided with a 1. | "Quarter 2, 2018" |
| **Substitute( "Quarter&nbsp;1,&nbsp;2011", "1", "2", 3 )** | Substitutes only the third instance of "1" with "2" because the fourth argument (_InstanceNumber_) is provided with a 3. | "Quarter 1, 2012" |
| **Substitute( "Quarter&nbsp;1,&nbsp;2011", "1", "2" )** | Substitutes all instances of "1" with "2" because the fourth argument (_InstanceNumber_) isn't provided. | "Quarter 2, 2022" |
| **Replace(<br>[&nbsp;"Quarter&nbsp;1,&nbsp;2018",<br>"Quarter&nbsp;2,&nbsp;2011",<br>"Quarter&nbsp;4,&nbsp;2019" ],<br>9, 1, "3" )** | Replaces the ninth character in each record of the single-column table with "3". | A single-column table with a `Value` column containing the following values: [&nbsp;"Quarter&nbsp;3,&nbsp;2018",<br>"Quarter&nbsp;3,&nbsp;2011",<br>"Quarter&nbsp;3,&nbsp;2019"&nbsp;] |
| **Substitute( <br>[&nbsp;"Qtr&nbsp;1,&nbsp;2018",<br>"Quarter&nbsp;1,&nbsp;2011",<br>"Q1,&nbsp;2019"&nbsp;],<br>"1", "3", 1 )** | Because the fourth argument (_InstanceNumber_) is provided with a value of 1, substitutes only the first instance of "1" in each record of the single-column table with "3". | A single-column table with a `Value` column containing the following values: [&nbsp;"Qtr&nbsp;3,&nbsp;2018",<br>"Quarter&nbsp;3,&nbsp;2011",<br>"Q3,&nbsp;2019"&nbsp;] |
| **Substitute( <br>[&nbsp;"Qtr&nbsp;1,&nbsp;2018",<br>"Quarter&nbsp;1,&nbsp;2011",<br>"Q1,&nbsp;2019"&nbsp;],<br>"1", "3" )** | Because the fourth argument (_InstanceNumber_) isn't provided, substitutes all instances of "1" in each record of the single-column table with "3". | A single-column table with a `Value` column containing the following values: [&nbsp;"Qtr&nbsp;3,&nbsp;2038",<br>"Quarter&nbsp;3,&nbsp;2033",<br>"Q3,&nbsp;2039"&nbsp;] |

---

## RequestHide function

Source: [function-requesthide.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-requesthide)

*Reference information including syntax and examples for the RequestHide function.*

# RequestHide function
**Applies to:** 
- ✓ Canvas apps



Hides the [SharePoint form](/power-apps/maker/canvas-apps/sharepoint-form-integration#understand-the-sharepointintegration-control).

> [!NOTE]
> Only works with [SharePoint forms](/power-apps/maker/canvas-apps/sharepoint-form-integration).

## Description

Use the **RequestHide** function to hide the SharePoint form. By default, RequestHide() is used for the _OnSuccess_ property of a SharePoint form being customized.

![RequestHide example.](media/function-requesthide/requesthide-fuction.png)

This function is not required for the **SharePointIntegration** control's **OnCancel** event as SharePoint by default hides the form when a user selects **Cancel**, and the function only reacts to a SharePoint form.

## Syntax

**RequestHide** ( )

- No parameters.

## Examples

| Formula           | Description     |
| ----------------- | --------------- |
| **RequestHide()** | Hides the form. |

---

## Reset function

Source: [function-reset.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-reset)

*Reference information including syntax and examples for the Reset function.*

# Reset function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Resets a control to its default value, discarding any user changes.

## Description

The **Reset** function resets a control to its **Default** property value. Any user changes are discarded.

You cannot reset controls that are within a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) or [**Edit form**](/power-apps/maker/canvas-apps/controls/control-form-detail) control from outside those controls. You can reset controls from formulas on controls within the same gallery or form. You can also reset all the controls within a form with the [**ResetForm**](function-form.md) function.

Using the **Reset** function is an alternative to toggling the **Reset** property of input controls and is generally preferred. The **Reset** property may be a better choice if many controls need to be reset together from multiple formulas. Toggling the **Reset** property can be done from a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control with the formula **Reset = Button.Pressed** or from a variable with **Reset = MyVar** and toggling **MyVar** with the formula **Button.OnSelect = Set( MyVar, true ); Set( MyVar, false )**.

Input controls are also reset when their **Default** property changes.

**Reset** has no return value, and you can use it only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Reset**( _Control_ )

- _Control_ – Required. The control to reset.

## Example

1. Insert a **Text input** control on a screen. By default, its name will be **TextInput1** and its **Default** property will be set to **"Text input"**.
2. Type a new value in the text box.
3. Insert a **Button** control on the screen.
4. Set the button's **OnSelect** property to **Reset( TextInput1 )**.
5. Select the button. This can be done even when authoring by selecting toward the ends of the control.
6. The contents of the text box will return to the value of the **Default** property.

---

## Revert function

Source: [function-revert.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-revert)

*Reference information including syntax and examples for the Revert function.*

# Revert function
**Applies to:** 
- ✓ Canvas apps



Refreshes and clears errors for the [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

The **Revert** function refreshes an entire data source or a single record in that data source. You'll see changes that other users made.

For the records reverted, **Revert** also clears any errors from the [table](/power-apps/maker/canvas-apps/working-with-tables) that the **[Errors](function-errors.md)** function returned.

If the **[Errors](function-errors.md)** function reports a conflict after a **[Patch](function-patch.md)** or other data operation, **Revert** the record to start with the conflicting version and reapply the change.

**Revert** has no return value. You can use it only in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Revert**( _DataSource_ [, *Record* ] )

- _DataSource_ – Required. The data source that you want to revert.
- _Record_ - Optional. The record that you want to revert. If you don't specify a record, the entire data source is reverted.

## Example

In this example, you'll revert the data source named **IceCream**, which starts with the data in this table:

![IceCream example.](media/function-revert/icecream.png)

A user on another device changes the **Quantity** property of the **Strawberry** record to **400**. At about the same time, you change the same property of the same record to **500**, not knowing about the other change.

You use the **[Patch](function-patch.md)** function to update the record:<br>
**Patch( IceCream, LookUp( IceCream, Flavor = "Strawberry" ), { Quantity: 500 } )**

You check the **[Errors](function-errors.md)** table and find an error:

| Record                                             | [Column](/power-apps/maker/canvas-apps/working-with-tables#columns) | Message                                                                                                              | Error                  |
| -------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **{ ID: 1, Flavor: "Strawberry", Quantity: 300 }** | _blank_                                                             | **"The record you are trying to modify has been modified by another user. Please revert the record and try again."** | **ErrorKind.Conflict** |

Based on the **Error** column, you have a **Reload** button for which the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to set to this formula:<br>
**Revert( IceCream, LookUp( IceCream, Flavor = "Strawberry" ) )**

After you select the **Reload** button, the **[Errors](function-errors.md)** table is [empty](function-isblank-isempty.md), and the new value for **Strawberry** has been loaded:

![New value for Strawberry ice cream.](media/function-revert/icecream-after.png)

You reapply your change on top of the previous change, and your change succeed because the conflict has been resolved.

![Reapplied changes with resolved conflict.](media/function-revert/icecream-success.png)

---

## Select function

Source: [function-select.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-select)

*Reference information including syntax and examples for the Select function.*

# Select function
**Applies to:** 
- ✓ Canvas apps



Simulates a select action on a control, causing the **OnSelect** formula to be evaluated.

## Description

The **Select** function simulates a select action on a control as if the user had clicked or tapped the control. As a result, the **OnSelect** formula on the target control is evaluated.

Use **Select** to propagate a select action to a parent control. This type of propagation is the default behavior in, for example, galleries. By default, the **OnSelect** property of any control in a **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)** control is set to **Select( Parent )**. That way, you can set the value of the **OnSelect** property of the gallery control itself, and that formula will be evaluated regardless of where in the gallery a user might click or tap.

If you want one or more controls in the gallery to perform different actions from the gallery itself, set the **OnSelect** property for those controls to something other than the default value. You can leave the default values for the **OnSelect** properties of most controls in the gallery if you want them to perform the same action as the gallery itself.

**Select** queues the target **OnSelect** for later processing, which may happen after the current formula has finished being evaluated. **Select** doesn't cause the target **OnSelect** to evaluate immediately, nor does **Select** wait for **OnSelect** to finish being evaluated.

You can't use **Select** across screens.

You can use **Select** only with controls that have an **OnSelect** property.

You can use **Select** only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

A control can't **Select** itself directly or indirectly through other controls.

The select function can also be used with a gallery. For example, it can be used to specify the row or column to select in a gallery and the control to select within that row or column of the gallery. When you select a row or column, the gallery selection changes and the **OnSelect** formula on the gallery control is evaluated. If a control within the row or column is provided, the **OnSelect** formula for the child control will be evaluated.

## Syntax

**Select**( _Control_ )

- _Control_ – Required. The control to select on behalf of the user.

**Select**( _Control, Row or column, Child Control_ )

- _Control_ – Required. The control to select on behalf of the user.
- _Row or column_ – Not required. The number of row or column (starting with 1) in a gallery control to select on behalf of the user.
- _Child Control_ - Not required. The child control of the control identified in the 'control' parameter to select.

## Examples

- _Button_

  `Select(button1)`

- _Gallery_

  `Select(Gallery1, 1)`

  Simulates a user selecting row 1 or column 1 in Gallery1.

- _Gallery_

  `Select(Gallery1, 1, ChildControl1)`

  Simulates a user selecting ChildConttrol1 in row 1 or column 1 of Gallery1.

#### Basic usage

1. Add a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control, and rename it **Button1** if it has a different name.

1. Set the **OnSelect** property of **Button1** to this formula:

   **Notify( "Hello World" )**

1. On the same screen, add a second **Button** control, and set its **OnSelect** property to this formula:

   **Select( Button1 )**

1. While holding down the Alt key, select the second button.

   A notification appears across the top of your app. The **OnSelect** property of **Button1** generated this notification.

   ![An animation that shows the OnSelect property settings for the two buttons and the notification when the second button is clicked.](media/function-select/basic-select.gif)

#### Gallery control

1. Add a vertical **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)** control that contains other controls.

   ![Select a vertical gallery that contains controls.](media/function-select/select-gallery.png)

2. Set the **OnSelect** property of the gallery to this formula:

   **Notify( "Gallery Selected" )**

3. While holding down the Alt key, click or tap the background of the gallery or any control in the gallery.

   All actions will show the **Gallery Selected** notification at the top of the app.

   Use the gallery's **OnSelect** property to specify the default action to take when the user clicks or taps an item in the gallery.

4. Set the **OnSelect** property of the image control to this formula:

   **Notify( "Image Selected", NotificationType.Success )**

5. While holding down the Alt key, click or tap the various elements of the gallery.

   When you click or tap any control in the gallery except the image, **Gallery Selected** appears as before. When you click or tap the image, **Image Selected** appears.

   Use individual controls in the gallery to take actions that differ from the gallery's default action.

   ![An animation that shows the default value of the OnSelect property for a gallery control, as well as a control that takes a different action.](media/function-select/gallery-select.gif)

6. On the same screen, add a **Button** control, and set its **OnSelect** property to this formula:

   **Select( Gallery1,2,Image1 )**

7. While holding down the Alt key, select the button.

   A **Image Selected** notification appears across the top of your app. The button click simulated selecting the image in row 2 of the gallery.

---

## Sequence function

Source: [function-sequence.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sequence)

*Reference information including syntax and examples for the Sequence function.*

# Sequence function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Generate a table of sequential numbers.

## Description

The **Sequence** function generates a single column table of sequential numbers, such as 1, 2, 3. The name of the column is **Value**. `Sequence( 4 )` is equivalent to `[1,2,3,4]`.

Use **Sequence** with the **ForAll** function to iterate a specific number of times. For example, the following formula adds 10 random numbers to the collection **MyRandomNumbers**:

```power-fx
ForAll( Sequence( 10 ), Collect( MyRandomNumbers, Rand() ) )
```

**ForAll** can also be used to transform the value into other data types and return a new table. For example, the following formula returns a table of the next 10 days:

```power-fx
ForAll( Sequence( 10 ), DateAdd( Today(), Value, Days ) )
```

The number of records to generate is rounded down to the nearest whole number and must be in the range 0 to 50,000. Generating a table with zero records results in an _empty_ table.

> [!NOTE] 
> **Sequence** is limited to 50,000 records.

## Syntax

**Sequence**( _Records_ [, _Start_ [, *Step* ] ] )

- _Records_ – Required. The number of records to create. Must be in the range 0 to 50,000.
- _Start_ – Optional. The starting number for the sequence. Default is 1.
- _Step_ – Optional. The increment for each successive number in the sequence. _Step_ can be negative to count down from the _Start_. Default is 1.

## Examples

### Basic usage

| Formula                                             | Description                                                                                     | Result                                                                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Sequence( 4 )**                                   | Generates a 4 record table starting at the default 1 and incrementing by the default 1.         | ![Sequence # 4.](media/function-sequence/sequence-4.png "Sequence # 4")                                                               |
| **Sequence( 4, 24 )**                               | Generates a 4 record table starting at 24 and incrementing by the default 1.                    | ![Sequence 4, 24.](media/function-sequence/sequence-4-24.png "Sequence 4, 24")                                                        |
| **Sequence( 4, 4, -1 )**                            | Generates a 4 record table starting at 4 and incrementing by -1, effectively counting backward. | ![Sequence 4, 4, -1.](media/function-sequence/sequence-4-4-n1.png "Sequence 4, 4, -1")                                                |
| **Sequence( 4, -100, 0.5 )**                        | Generates a 4 record table starting at -100 and incrementing by 0.5.                            | ![Sequence 4, -100, 0.5.](media/function-sequence/sequence-4-n100-p5.png "Sequence 4, -100, 0.5")                                     |
| **Sequence( 0.9 )**                                 | Generates an _empty_ table as the count rounds down to 0.                                       | ![Sequence 0.9.](media/function-sequence/sequence-empty.png "Sequence 0.9")                                                           |
| **ForAll( Sequence( 4 ), Rand() )**                 | Generates a 4 record table of random numbers.                                                   | ![Sequence # 4 with Random.](media/function-sequence/sequence-4-random.png "Sequence # 4 with Random")<br>_Actual numbers will vary._ |
| **Concat( Sequence( 5 ),<br>Text( Value ) & " " )** | Generates a string of numbers from 1 to 5.                                                      | **"1 2 3 4 5 "**                                                                                                                      |

### Character map

See the [**Char**](function-char.md#display-a-character-map) function reference for two **Sequence** functions working together to display a character map in a two-dimensional layout.

### Chessboard

See the [**As**](operators.md#as-operator) operator reference for two **Sequence** functions working together to create a chessboard in a text string and in two nested galleries.

---

## Set function

Source: [function-set.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-set)

*Reference information including syntax and examples for the Set function.*

# Set function
**Applies to:** 
- ✓ Canvas apps
- ✓ Desktop flows
- ✓ Power Platform CLI
- ✓ Dataverse functions



Sets the value of a global variable.

## Overview

Use the **Set** function to set the value of a global variable, which temporarily holds a piece of information, such as the number of times the user has selected a button or the result of a data operation.

Global variables are available throughout your app on all screens. These are the simplest kind of variables and fill the needs of most situations. There are also context variables which are scoped to a single screen and collections that allow row level modifications to tables. For more information about these other options, review [Understand variables](/power-apps/maker/canvas-apps/working-with-variables).

Power Apps are based on formulas that automatically recalculate as the user interacts with an app. Any formulas that depend on a variable will automatically update when it changes. However, the variable won't be automatically updated if the value of the formula used in the **Set** function changes. This requires the app maker to manually update the variable, which can be error prone and harder for others to understand. Before you use a variable, review [Understand variables](/power-apps/maker/canvas-apps/working-with-variables).

## Description

Global variables are implicitly created by using the **Set** function. No explicit declaration is required. If you remove all the **Set** functions for a global variable, that global variable will cease to exist. To clear a variable, set its value to the result of the [**Blank** function](function-isblank-isempty.md).

You can see your variables' values, definitions, and uses with the Variables view under the **File** menu in Power Apps Studio.

As the examples later in this topic show, global variables can hold several kinds of information, including these:

- a single value
- a record
- a table
- an object reference
- any result from a formula

A global variable holds its value until the app is closed. Once closed, the global variable's value will be lost and must be recreated when the app is loaded again.

Global variables cannot use the same name as an existing collection or control. It can use the same name as a context variable. To disambiguate between the two, use the [disambiguation operator](operators.md#disambiguation-operator).

**Set** has no return value, and you can use it only within a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Set**( _VariableName_, _Value_ )

- _VariableName_ - Required. The name of a global variable to create or update.
- _Value_ - Required. The value to assign to the context variable.

## Examples

| Formula                                                                                                  | Description                                                                                                                                                                                                                                                   | Result                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Set(&nbsp;Counter,&nbsp;1&nbsp;)**                                                                     | Creates or modifies the global variable **Counter**, setting its value to **1**.                                                                                                                                                                              | **Counter** has the value **1**. You can reference that variable by using the name **Counter** in a formula on any screen.                                                                                                                                                    |
| **Set(&nbsp;Counter,&nbsp;2&nbsp;)**                                                                     | Sets the value of the **Counter** global variable from the previous example to **2**.                                                                                                                                                                         | **Counter** has the value **2**.                                                                                                                                                                                                                                              |
| **Set(&nbsp;Counter,&nbsp;Counter + 1&nbsp;)**                                                           | Increments the value of the **Counter** global variable from the previous example to **3**.                                                                                                                                                                   | **Counter** has the value **3**.                                                                                                                                                                                                                                              |
| **Set(&nbsp;Name,&nbsp;"Lily" )**                                                                        | Creates or modifies the global variable **Name** setting its value to **Lily**.                                                                                                                                                                               | **Name** has the value **Lily**.                                                                                                                                                                                                                                              |
| **Set(&nbsp;Person,&nbsp;{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"1&nbsp;Main&nbsp;St"&nbsp;} )**      | Creates or modifies the global variable **Person**, setting its value to a record. The record contains two columns, named **Name** and **Address**. The value of the **Name** column is **Milton**, and the value of the **Address** column is **1 Main St**. | **Person** has the value of record **{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"1&nbsp;Main&nbsp;St"&nbsp;}**.<br><br>Reference this record as a whole with the name **Person**, or reference an individual column of this record with **Person.Name** or **Person.Address**. |
| **Set(&nbsp;Person, Patch(&nbsp;Person,&nbsp;{Address:&nbsp;"2&nbsp;Main&nbsp;St"&nbsp;}&nbsp;)&nbsp;)** | Works with the **[Patch](function-patch.md)** function to update the **Person** global variable by setting the value of the **Address** column to **2 Main St**.                                                                                              | **Person** now has the value of record **{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"2&nbsp;Main&nbsp;St"&nbsp;}**.                                                                                                                                                            |

---

## SetFocus function in

Source: [function-setfocus.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-setfocus)

*Reference information including syntax and examples for the SetFocus function.*

# SetFocus function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Moves input focus to a specific control.

## Description

The **SetFocus** function gives a control the input focus. The user's keystrokes are then received by that control, allowing them to type into a text input control or use the _Enter_ key to select a button. The user can also use the _Tab_ key, touch, mouse, or other gesture to move the input focus themselves. _Tab_ key behavior is governed by the [**TabIndex** property](/power-apps/maker/canvas-apps/controls/properties-accessibility).

Use the **SetFocus** function to set the focus when (each with an example below):

- a newly exposed or enabled input control, to guide the user in what comes next and for faster data entry.
- a form is validated, to focus and display the offending input control for quick resolution.
- a screen is displayed, to focus the first input control with the **OnVisible** property of the [**Screen**](/power-apps/maker/canvas-apps/controls/control-screen).

The control with focus may be visually different based on the [**FocusedBorderColor**](/power-apps/maker/canvas-apps/controls/properties-color-border) and [**FocusedBorderThickness**](/power-apps/maker/canvas-apps/controls/properties-color-border) properties.

## Limitations

**SetFocus** can only be used with:

- [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control
- [**Icon**](/power-apps/maker/canvas-apps/controls/control-shapes-icons) control
- [**Image**](/power-apps/maker/canvas-apps/controls/control-image) control
- [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control
- [**TextInput**](/power-apps/maker/canvas-apps/controls/control-text-input) control

You cannot set the focus to controls that are within a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) control, [**Edit form**](/power-apps/maker/canvas-apps/controls/control-form-detail) control, or [Component](/power-apps/maker/canvas-apps/create-component). **SetFocus** can be used with a control in a scrollable screen.

You cannot set the focus to controls that are within a [**Container**](/power-apps/maker/canvas-apps/controls/control-container) control.

You can only set the focus to controls on the same screen as the formula containing the **SetFocus** call.

Attempting to set the focus to a control that has its [**DisplayMode**](/power-apps/maker/canvas-apps/controls/properties-core) property set to **Disabled** has no effect. Focus will remain where it was previously.

On Apple iOS, the soft keyboard will only be displayed automatically if **SetFocus** was initiated by a direct user action. For example, invoking from a button's **OnSelect** property will display the soft keyboard while invoking from a screen's **OnVisible** will not.

You can use **SetFocus** only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**SetFocus**( _Control_ )

- _Control_ – Required. The control to give the input focus.

## Examples

### Focus on a newly exposed or enabled input control

Many shopping carts allow the customer to use the shipping address as the billing address, alleviating the need to enter the same information twice. If a different billing address is desired, the billing address text input boxes are enabled, and it is helpful to guide the customer to these newly enabled controls for faster data entry.

![Animation of choosing to use a custom Billing address, with focus moved to the Billing name input control as a result,turning off the automatic sync with the Shipping addresss.](media/function-setfocus/shipping-billing.gif)

There are many formulas in play here, but the one that moves the focus is on the **OnUncheck** property of the **Check box** control:

```powerappa-dot
SetFocus( BillingName )
```

The _Tab_ key can also be used to move focus quickly from one field to another. To better illustrate, the _Tab_ key was not used in the animation.

To create this example:

1. Create a new app.
1. Add [**Label** controls](/power-apps/maker/canvas-apps/controls/control-text-box) with the text "Shipping address", "Name:", "Address:", "Billing Address", "Name:", and "Address:" and position them as shown in the animation.
1. Add a [**Text Input** control](/power-apps/maker/canvas-apps/controls/control-text-input) and rename it **ShippingName**.
1. Add a [**Text Input** control](/power-apps/maker/canvas-apps/controls/control-text-input) and rename it **ShippingAddress**.
1. Add a [**Check box** control](/power-apps/maker/canvas-apps/controls/control-check-box) and rename it **SyncAddresses**.
1. Set the **Text** property of this control to the formula `"Use Shipping address as Billing address"`.
1. Add a [**Text Input** control](/power-apps/maker/canvas-apps/controls/control-text-input) and rename it **BillingName**.
1. Set the **Default** property on this control to the formula `ShippingName`.
1. Set the **DisplayMode** property on this control to the formula `If( SyncAddresses.Value, DisplayMode.View, DisplayMode.Edit )`. This will automatically enable or disable this control based on the state of the check box control.
1. Add a [**Text Input** control](/power-apps/maker/canvas-apps/controls/control-text-input) and rename it **BillingAddress**.
1. Set the **Default** property on this control to the formula `ShippingAddress`.
1. Set the **DisplayMode** property on this control to the formula `If( SyncAddresses.Value, DisplayMode.View, DisplayMode.Edit )`. This will automatically enable or disable this control based on the state of the check box control.
1. Set the **Default** property of the check box to the formula `true`. This will default the Billing address to use the same value as the Shipping address.
1. Set the **OnCheck** property of the check box to the formula `Reset( BillingName ); Reset( BillingAddress )`. If the user chooses to sync Shipping and Billing addresses, this will clear any user input in the Billing address fields allowing the **Default** properties on each to pull the values from the corresponding Shipping address fields.
1. Set the **OnUncheck** property of the check box to the formula `SetFocus( BillingName )`. If the user chooses to have a different billing address, this will move the focus to the first control in the Billing address. The controls will have already been enabled due to their **DisplayMode** properties.

### Focus on validation issues

> [!NOTE]
> Although this example appears to be an **Edit form** control, unfortunately **SetFocus** is not yet supported by that control. Instead, this example uses a scrollable screen to host the input controls.

When validating a form, it can be helpful to not only display a message if there is a problem but to also take the user to the field that is offending. It can be particularly helpful if the field in question is scrolled off the screen and not visible.

![An animation of validating a data entry form and having not only a message displayed but also setting the input focus to the offending input control, even if it is scrolled off the screen.](media/function-setfocus/scrollable-screen.gif)

In this animation, the validation button is repeatedly pressed until all the fields have been filled in properly. Note that the mouse pointer doesn't move down from the top of the screen. Instead the **SetFocus** function hsa moved the input focus to the control that requires attention with this formula:

```power-fx
If( IsBlank( Name ),
        Notify( "Name requires a value", Error ); SetFocus( Name ),
    IsBlank( Street1 ),
        Notify( "Street Address 1 requires a value", Error ); SetFocus( Street1 ),
    IsBlank( Street2 ),
        Notify( "Street Address 2 requires a value", Error ); SetFocus( Street2 ),
    IsBlank( City ),
        Notify( "City requires a value", Error ); SetFocus( City ),
    IsBlank( County ),
        Notify( "County requires a value", Error ); SetFocus( County ),
    IsBlank( StateProvince ),
        Notify( "State or Province requires a value", Error ); SetFocus( StateProvince ),
    IsBlank( PostalCode ),
        Notify( "Postal Code requires a value", Error ); SetFocus( PostalCode ),
    IsBlank( Phone ),
        Notify( "Contact Phone requires a value", Error ); SetFocus( Phone ),
    Notify( "Form is Complete", Success )
)
```

To create this example:

1. Create a new, blank phone app.
1. From the **Insert** menu, select **New screen**, and then select **Scrollable**.
1. In the center section of the screen, add **Text input** controls and name them **Name**, **Street1**, **Street2**, **City**, **County**, **StateProvince**, **PostalCode**, and **Phone**. Add **Label** controls above each one to identify the fields. You may need to resize the section if it is not long enough to fit all the controls.
1. Add a checkmark [**Icon** control](/power-apps/maker/canvas-apps/controls/control-shapes-icons) at the top of the screen, above the scrollable section.
1. Set the **OnSelect** property of the icon control to the formula `If( IsBlank( ...` given above.

### Focus when displaying a screen

> [!NOTE]
> Although this example appears to be an **Edit form** control, unfortunately **SetFocus** is not yet supported by that control. Instead, this example uses a scrollable screen to host the input controls.

Similar to exposing an input control, when displaying a data entry screen it is helpful to focus the first input control for faster data entry.

![An animation showing a side by side comparison of using SetFocus versus not using it when displaying a data entry screen.](media/function-setfocus/visible-setfocus.gif)

In this animation, the data entry screen on the left is not using **SetFocus**. Upon display no input control has focus, requiring the user to tab, touch, mouse, or use another means to focus the **Name** field before a value can be typed into it.

On the right we have exactly the same app with the **OnVisible** property of the data entry screen set to this formula:

```power-fx
SetFocus( Name )
```

This sets the focus to the **Name** field automatically. The user can begin typing and tabbing between fields immediately with no prior action required.

To create this example:

1. Create the "Focus on validation issues" app above.
1. On this screen, set the **OnVisible** property to the formula `SetFocus( Name )`.
1. Add a second screen.
1. Add a [**Button** control](/power-apps/maker/canvas-apps/controls/control-button).
1. Set the **OnSelect** property of this control to the formula `Navigate( Screen1 )`.
1. Preview the app from this screen. Press the button. The **OnVisible** formula will be evaluated and the **Name** field will automatically be in focus.

---

## SetProperty function

Source: [function-setproperty.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-setproperty)

*Reference information including syntax and examples for the SetProperty function.*

# SetProperty function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



The SetProperty function simulates interactions with input controls as if the user had entered or set a value on the control. This function is only available if you are writing tests in the Power Apps Test Studio. The following properties can be set using the SetProperty function.

> [!IMPORTANT]
> **Assert** function is only available for Test Studio in Power Apps.

## Syntax

_SetProperty(Control Property, value)_

- _Control Property_ – Required. The control property to set on behalf of the user.
- _Value_ – Required. The value of the property to set on behalf of the user.

## Examples

| Control        | Property      | Example expression                                                                            |
| :------------- | :------------ | :-------------------------------------------------------------------------------------------- |
| TextInput      | Text          | `SetProperty(TextInput1.Text, "Sample text")`                                                 |
| RichTextEditor | HtmlText      | `SetProperty(RichTextEditor1.HtmlText, "<p>Sample text</p>")`                                 |
| Toggle         | Value         | `SetProperty(Toggle1.Value, false)`                                                           |
| Checkbox       | Value         | `SetProperty(Checkbox1.Value, false)`                                                         |
| Slider         | Value         | `SetProperty(Slider1.Value, 10)`                                                              |
| Rating         | Value         | `SetProperty(Rating1.Value, 5)`                                                               |
| DatePicker     | SelectedDate  | `SetProperty(DatePicker1.SelectedDate, Date(2020,3,10))`                                      |
| Radio          | Selected      | `SetProperty(Radio1.Selected, "Yes")`                                                         |
| Radio          | SelectedText  | `SetProperty(Radio1.SelectedText, "Yes")`                                                     |
| Dropdown       | Selected      | `SetProperty(Dropdown1.Selected, {Value:"Sample value"})`                                     |
| Dropdown       | SelectedText  | `SetProperty(Dropdown1.SelectedText, {Value:"Sample value"})`                                 |
| Combobox       | Selected      | `SetProperty(Dropdown1.Selected, {Value:"Sample value"})`                                     |
| Combobox       | SelectedItems | `SetProperty(ComboBox1.SelectedItems, Table({Value:"Sample value"},({Value:"Sample value"}))` |
| ListBox        | Selected      | `SetProperty(Listbox1.Selected, {'Value':"Sample value"})`                                    |
| ListBox        | SelectedItems | `SetProperty(Listbox1.SelectedItems, Table({Value:"Sample value"},({Value:"Sample value"}))`  |

### See Also

[Test Studio Overview](/power-apps/maker/canvas-apps/test-studio) <br>
[Working with Test Studio](/power-apps/maker/canvas-apps/working-with-test-studio)

---

## ShowHostInfo object in Power Apps

Source: [showhostinfo.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/showhostinfo)

*Reference information including syntax and examples for the ShowHostInfo object in Power Apps.*

# ShowHostInfo function
**Applies to:** 
- ✓ Canvas apps



Show [Host object](object-host.md) information to a user.

## Description

The **ShowHostInfo** function is used to display information to the user in the app. The user will see a pop-up with the appropriate details related to the selected type of information.     

## Syntax

**ShowHostInfo(HostInfo)**

HostInfo – Required. The type of information to display.

## Examples

1. Enable a [canvas app for offline](/power-apps/mobile/canvas-mobile-offline-overview).
1. Set the [OnSelect](/power-apps/maker/canvas-apps/controls/properties-core) property of the [Sync icon](/power-apps/maker/canvas-apps/controls/control-shapes-icons) to `ShowHostInfo(HostInfo.OfflineSync)`
1. Save and publish the app.

When the users selects the Sync icon on their mobile device, a pop-up with the offline sync details such as sync status, last sync date, and downloaded tables are displayed. 

## Known issue
- The table column in the available table section shows the table name instead of the display name.
- The popup on Windows is loaded in full screen.

---

## Shuffle function

Source: [function-shuffle.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-shuffle)

*Reference information including syntax and examples for the Shuffle function.*

# Shuffle function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Randomly reorders the [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [table](/power-apps/maker/canvas-apps/working-with-tables).

## Description

The **Shuffle** function reorders the records of a table.

**Shuffle** returns a table that has the same [columns](/power-apps/maker/canvas-apps/working-with-tables#columns) and number of rows as the argument.

## Syntax

**Shuffle**( _Table_ )

- _Table_ - Required. Table to shuffle.

## Example

If you stored details about playing cards in a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) named **Deck**, this formula would return a copy of that collection that has been randomly shuffled.

**Shuffle(Deck)**

---

## Sort and SortByColumns functions

Source: [function-sort.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sort)

*Reference information including syntax and examples for the Sort and SortByColumns functions.*

# Sort and SortByColumns functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Sorts a [table](/power-apps/maker/canvas-apps/working-with-tables).

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) do not support the **SortByColumns** function.

## Description

The **Sort** function sorts a table based on a formula.

The formula is evaluated for each [record](/power-apps/maker/canvas-apps/working-with-tables#records) of the table, and the results are used to sort the table. The formula must result in a number, a string, or a Boolean value; it can't result in a table or a record.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

To sort first by one column and then by another, you embed a **Sort** formula within another. For example, you can use this formula to sort a **Contacts** table first by a **LastName** column and then by a **FirstName** column: **Sort( Sort( Contacts, LastName ), FirstName )**

The **SortByColumns** function can also be used to sort a table based on one or more columns.

The parameter list for **SortByColumns** provides the names of the columns to sort by and the sort direction per column. Sorting is performed in the order of the parameters (sorted first by the first column, then the second, and so on). Column names are specified as strings, requiring double quotes if directly included in the parameter list. For example, **SortByColumns( CustomerTable, "LastName" )**.

You can combine **SortByColumns** with a **[Drop down](/power-apps/maker/canvas-apps/controls/control-drop-down)** or **[List box](/power-apps/maker/canvas-apps/controls/control-list-box)** control to enable users to select which column to sort by.

In addition to sorting ascending or descending, **SortByColumns** can sort based on a single column table of values. For example, you can sort record based on the name of a day of the week by supplying **[ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]** as the sort order. All records which have **Monday"** will come first, followed by **Tuesday**, and so on. Records found that do not appear in the sort table are put at the end of the list.

[Tables](/power-apps/maker/canvas-apps/working-with-tables) are a value in Power Apps, just like a string or number. They can be passed to and returned from functions. **Sort** and **SortByColumn** don't modify a table; instead they take a table as an argument and return a new table that has been sorted. See [working with tables](/power-apps/maker/canvas-apps/working-with-tables) for more details.

## Delegation
When possible, Power Apps will delegate filter and sort operations to the data source and page through the results on demand. For example, when you start an app that shows a **[Gallery](../maker/canvas-apps/controls/control-gallery.md)** control filled with data, only the first set of records will be initially brought to the device. As the user scrolls, additional data is brought down from the data source. The result is a faster start time for the app and access to very large data sets.

However, delegation may not always be possible. Data sources vary on what functions and operators they support with delegation. If complete delegation of a formula isn't possible, the authoring environment will flag the portion that can't be delegated with a warning. When possible, consider changing the formula to avoid functions and operators that can't be delegated.  The [delegation list](../maker/canvas-apps/delegation-overview.md#delegable-data-sources) details which data sources and operations can be delegated.

If delegation is not possible, Power Apps will pull down only a small set of records to work on locally. Filter and sort functions will operate on a reduced set of records. What is available in the **[Gallery](../maker/canvas-apps/controls/control-gallery.md)** may not be the complete story, which could be confusing to users. 

See the [delegation overview](../maker/canvas-apps/delegation-overview.md) for more information.

## Syntax

**Sort**( _Table_, _Formula_ [, *SortOrder* ] )

- _Table_ - Required. Table to sort.
- _Formula_ - Required. This formula is evaluated for each record of the table, and the results are used to sort the table. You can reference columns within the table.
- _SortOrder_ - Optional. Specify **SortOrder.Descending** to sort the table in descending order. **SortOrder.Ascending** is the default value.

**SortByColumns**( _Table_, _ColumnName1_ [, *SortOrder1*, *ColumnName2*, *SortOrder2*, ... ] )

- _Table_ - Required. Table to sort.
- _ColumnName(s)_ - Required. The column names to sort on, as strings.
- _SortOrder(s)_ - Optional. **SortOrder.Ascending** or **SortOrder.Descending**. **SortOrder.Ascending** is the default. If multiple _ColumnNames_ are supplied, all but the last column must include a _SortOrder_.

  > [!NOTE]
  > For SharePoint and Excel data sources that contain column names with spaces, specify each space as **"\_x0020\_"**. For example, specify **"Column Name"** as **"Column_x0020_Name"**.

**SortByColumns**( _Table_, _ColumnName_, _SortOrderTable_ )

- _Table_ - Required. Table to sort.
- _ColumnName_ - Required. The column name to sort on, as strings.
- _SortOrderTable_ - Required. Single column table of values to sort by.

  > [!NOTE]
  > For SharePoint and Excel data sources that contain column names with spaces, specify each space as **"\_x0020\_"**. For example, specify **"Column Name"** as **"Column_x0020_Name"**.

## Examples

For the following examples, we'll use the **IceCream** [data source](/power-apps/maker/canvas-apps/working-with-data-sources), which contains the data in this table:

![IceCream example.](media/function-sort/icecream.png)

| Formula                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                            | Result                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sort( IceCream, Flavor )**<br><br>**SortByColumns( IceCream, "Flavor" )**                                                       | Sorts **IceCream** by its **Flavor** column. The **Flavor** column contains strings, so the table is sorted alphabetically. By default, the sort order is ascending.                                                                                                                                                                                                                   | ![Alphabetically sorted.](media/function-sort/icecream-flavor.png)                              |
| **Sort( IceCream, Quantity )**<br><br>**SortByColumns( IceCream, "Quantity" )**                                                   | Sorts **IceCream** by its **Quantity** column. The **Quantity** column contains numbers, so the table is sorted numerically. By default, the sort order is ascending.                                                                                                                                                                                                                  | ![Sorted numerically.](media/function-sort/icecream-quantity-asc.png)                           |
| **Sort( IceCream, Quantity, SortOrder.Descending )**<br><br>**SortByColumns( IceCream, "Quantity", SortOrder.Descending )**       | Sorts **IceCream** by its **Quantity** column. The **Quantity** column contains numbers, so the sort is done numerically. The sort order has been specified as descending.                                                                                                                                                                                                             | ![Sorted numerically and descending.](media/function-sort/icecream-quantity-desc.png)           |
| **Sort( IceCream, Quantity + OnOrder )**                                                                                          | Sorts **IceCream** by the sum of its **Quantity** and **OnOrder** columns for each record individually. The sum is a number, so the table is sorted numerically. By default, the sort order is ascending. Since we are sorting by a formula and not by raw column values, there is no equivalent using **SortByColumns**.                                                              | ![Sorted numerically and ascending.](media/function-sort/icecream-total.png)                    |
| **Sort( Sort( IceCream, OnOrder ), Quantity )**<br><br>**SortByColumns( IceCream, "OnOrder", SortOrder.Ascending, "Quantity", SortOrder.Ascending )** | Sorts **IceCream** first by its **OnOrder** column, and then by its **Quantity** column. Note that "Pistachio" rose above "Vanilla" in the first sort based on **OnOrder**, and then together they moved to their appropriate place based on **Quantity**.                                                                                                                             | ![Sorted with Pistachio above Vanilla.](media/function-sort/icecream-onorder-quantity.png)      |
| **SortByColumns( IceCream, "Flavor", [&nbsp;"Pistachio",&nbsp;"Strawberry"&nbsp;] )**                                             | Sorts **IceCream** by it's **Flavor** column based on the single column table containing "Pistachio" and "Strawberry". Records which have a **Flavor** of "Pistachio" will appear first in the result, followed by records that contain "Strawberry". For values in the **Flavor** column that are not matched, such as "Vanilla", they will appear after the items that were matched. | ![Sorted with Pistachio above Strawberry.](media/function-sort/icecream-onflavor-sorttable.png) |

### Step by step

To run these examples yourself, create the **IceCream** data source as a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections):

1. Add a button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>**ClearCollect( IceCream, { Flavor: "Chocolate", Quantity: 100, OnOrder: 150 }, { Flavor: "Vanilla", Quantity: 200, OnOrder: 20 }, { Flavor: "Strawberry", Quantity: 300, OnOrder: 0 }, { Flavor: "Mint Chocolate", Quantity: 60, OnOrder: 100 }, { Flavor: "Pistachio", Quantity: 200, OnOrder: 10 } )**
2. Preview the app, select the button, and then press Esc to return to the default workspace.
3. Select **Collections** on the **File** menu to display the collection that you just created, and then press Esc to return to the default workspace.

#### Sort

1. Add another button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
   **ClearCollect( SortByFlavor, Sort( IceCream, Flavor ) )**

   The previous formula creates a second collection, named **SortByFlavor**, that contains the same data as **Ice Cream**. However, the new collection contains the data sorted alphabetically by the **Flavor** column in ascending order.

2. Press F5, select the new button, and then press Esc.
3. Select **Collections** on the **File** menu to display both collections, and then press Esc to return to the default workspace.
4. Repeat the last three steps, but change the name of the collection that you want to create, and replace the **Sort** formula with a different formula from the table of examples earlier in this section that uses **Sort**.

#### SortByColumns

1. Add another button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
   **ClearCollect( SortByQuantity, SortByColumns( IceCream, "Quantity", SortOrder.Ascending, "Flavor", SortOrder.Descending ) )**

   The previous formula creates a third collection, named **SortByQuantity**, that contains the same data as **Ice Cream**. However, the new collection contains the data sorted numerically by the **Quantity** column in ascending order, and then by the **Flavor** column in descending order.

2. Press F5, select the new button, and then press Esc.
3. Select **Collections** on the **File** menu to display all three collections, and then press Esc to return to the default workspace.
4. Repeat the last three steps, but change the name of the collection that you want to create, and replace the **SortByColumns** formula with a different formula from the table of examples earlier in this section that uses **SortByColumns**.

---

## Split function

Source: [function-split.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split)

*Reference information including syntax and examples for the Split function.*

# Split function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Splits a text string into a table of substrings.

## Description

The **Split** function breaks a text string into a table of substrings. Use **Split** to break up comma delimited lists, dates that use a slash between date parts, and in other situations where a well defined delimiter is used.

A separator string is used to break the text string apart. The separator can be zero, one, or more characters that are matched as a whole in the text string. Using a zero length or _blank_ string results in each character being broken out individually. The matched separator characters are not returned in the result. If no separator match is found, then the entire text string is returned as a single result.

Use the **[Concat](function-concatenate.md)** function to recombine the string without the separators.

Use the **[MatchAll](function-ismatch.md)** function to split a string using a regular expression.

The examples show how **Split** can be used with the **[First](function-first-last.md)** and **[Last](function-first-last.md)** functions to extract a single delimited substring. The **[Match](function-ismatch.md)** function is often a more concise and powerful choice for regular expressions.

## Syntax

**Split**( _Text_, _Separator_ )

- _Text_ - Required. Text to split.
- _Separator_ - Required. Separator to use in splitting the string. Can be zero, one, or more characters.

## Examples

### Basic usage

| Formula | Description | Result |
| --- | --- | --- |
| `Split( "Apples, Oranges, Bananas", "," )` | Splits the different fruits apart, based on the comma separator. The split is performed based on only the comma and not the space after it, resulting in a space at the front of "&nbsp;Oranges" and "&nbsp;Bananas". | A single-column table with a `Value` column containing the following values: "Apples", "&nbsp;Oranges", "&nbsp;Bananas" |
| `TrimEnds( Split( "Apples, Oranges, Bananas", "," ) )` | Same as the previous example, but in this case the space is removed by the [**TrimEnds** function](function-trim.md), operating on the single column table that is produced by **Split**. We could have also used the separator **",&nbsp;"** which includes the space after the comma, but that wouldn't have worked properly if there's no space or there are two spaces. | A single-column table with a `Value` column containing the following values: "Apples", "Oranges", "Bananas" |
| `Split( "08/28/17", "/" )` | Splits the date apart, using a forward slash as the separator. | A single-column table with a `Value` column containing the following values: "08", "28", "17"|

### Different delimiters

| Formula | Description | Result |
| --- | --- | --- |
| `Split( "Hello, World", "," )` | Splits the words apart, using a comma as the separator. The second result starts with a space since it is the character immediately following the comma. | A single-column table with a `Value` column containing the following values: "Hello", "&nbsp; World" |
| `Split( "Hello, World", "o" )` | Splits the string apart, using the character "o" as the separator. | A single-column table with a `Value` column containing the following values: "Hell", ", W", "rld" |
| `Split( "Hello, World", "l" )` | Splits the string apart, using the single character "l" as the separator. Since there were no characters between both the **l**'s in **Hello**, a _blank_ value was returned. | A single-column table with a `Value` column containing the following values: "He", Blank(), "o, Wor", "d" |
| `Split( "Hello, World", "ll" )` | Splits the string apart, using the double character "ll" as the separator. | A single-column table with a `Value` column containing the following values: "He", "o, World" |
| `Split( "Hello, World", "%" )` | Splits the string apart, using the percent sign as the separator. Since this separator doesn't appear in the string, the entire string is returned as one result. | A single-column table with a `Value` column containing the following value: "Hello, World" |
| `Split( "Hello, World", "" )` | Splits the string apart, using an empty string as the separator (zero characters). This will break the string on each character. | A single-column table with a `Value` column containing the following values: "H", "e", "l", "l", "o", ",", "&nbsp;", "W", "o", "r", "l", "d" |

### Substring extraction

| Formula                                                                                          | Description                                                                                                                                                                                                                                                             | Result                  |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `First( Split( Last( Split( "Bob Jones <bob.jones@contoso.com>", "<" ) ).Result, ">" ) ).Result` | Splits the string apart based on an opening delimiter (<) and extracts the string to the right of the delimiter with **Last**. The formula then splits that result based on the closing delimiter (>) and extracts the string the left of the delimiter with **Right**. | "bob.jones@contoso.com" |
| `Match( "Bob Jones <bob.jones@contoso.com>", "<(?<email>.+)>" ).email`                           | Performs the same delimiter based extraction as the last example but uses the **Match** function and a regular expression instead.                                                                                                                                      | "bob.jones@contoso.com" |

---

## Summarize function

Source: [function-summarize.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-summarize)

*Reference information including syntax and examples for Summarize function.*

# Summarize function
**Applies to:** 
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Power Platform CLI
- ✓ Dataverse functions



Summarize [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [table](/power-apps/maker/canvas-apps/working-with-tables) by grouping on one or more [columns](/power-apps/maker/canvas-apps/working-with-tables#columns).

## Description

Use the **Summarize** function to group records of a table and summarize the columns in the group.

The first argument to **Summarize** is the table to operate on. The remaining arguments can be in any order and fall into two categories:
- Group column names. Use these to specify which columns to group on.
- Summarization formulas. Use these to summarize the columns in the **ThisGroup** table. **ThisGroup** is a table which contains all the columns of the original table, but is limited to just the records of one group at a time based on the group columns. Each formula must be named with **As** for column name in the result table.

A table is a value in Power Apps, just like a string or a number. You can specify a table as an argument for a function, and a function can return a table. **Summarize** doesn't modify a table; instead it takes a table as an argument and returns a different table. For more information, see [working with tables](/power-apps/maker/canvas-apps/working-with-tables).

## Delegation

**Summarize** can be delegated depending on the data source and complexity of the summarization formulas. Basic aggregate functions such as [**Sum**](function-aggregates.md), [**Average**](function-aggregates.md), [**Max**](function-aggregates.md), [**Min**](function-aggregates.md), [**CountRows**](function-table-counts.md), and [**Concat**](function-concatenate.md) have a good chance of being delegated. 

If complete delegation of a formula isn't possible, the authoring environment flags the portion that can't be delegated with a warning. When possible, consider changing the formula to avoid functions and operators that can't be delegated. 

For more information, see [delegation overview](/power-apps/maker/canvas-apps/delegation-overview).

## Syntax

**Summarize**( _Table_, _GroupByColumnName1_ [, _GroupByColumnName2_, ... ] [, _SummarizeColumns_ As _SummarizeNames_, ...] )

- _Table_ - Required. Table to be summarized.
- _GroupByColumnNames_ - At least one is required. The column names in _Table_ by which to group records. These columns become columns in the resulting table.
- _SummarizeColumns_ - Optional. Summarization formula over the **ThisGroup** table for each group.
- _SummarizeNames_ - Required for each _SummarizeColumn_. Each summarized column must be explicitly named for the output table.

## Examples

### Simple example

1. Create a table in your Power Fx host with this sample data:

```powerapps-dot
Set( CityPopulations,
   Table(
        { City: "London",    Country: "United Kingdom", Population: 8615000},
        { City: "Berlin",    Country: "Germany",        Population: 3562000},
        { City: "Madrid",    Country: "Spain",          Population: 3165000},
        { City: "Rome",      Country: "Italy",          Population: 2874000},
        { City: "Paris",     Country: "France",         Population: 2273000},
        { City: "Hamburg",   Country: "Germany",        Population: 1760000},
        { City: "Barcelona", Country: "Spain",          Population: 1602000},
        { City: "Munich",    Country: "Germany",        Population: 1494000},
        { City: "Milan",     Country: "Italy",          Population: 1344000}
    )
)
```

2. Evaluate the following formula:

```powerapps-dot
Summarize( CityPopulations, Country,
           Sum( ThisGroup, Population ) As 'Total Population',
           Concat( ThisGroup, City, ", " ) As Cities 
)
```

The result is this table:

| Country/Region | Total Population | Cities |
|---------|------------------|--------|
| United Kingdom | 8615000 | London |
| Germany | 6816000 | Berlin, Hamburg, Munich |
| Spain | 4767000 | Madrid, Barcelona | 
| Italy | 4218000 | Rome, Milan |
| France | 2273000 | Paris |

### Multiple group columns

1. Create a table in your Power Fx host with this sample data:

```powerapps-dot
Set( Inventory, 
   Table(
      {Supplier:"Contoso",  Fruit:"Grapes",  Price:220, Purchase:Date(2015,10,1), Tags: ["Red","Seedless"]},
      {Supplier:"Fabrikam", Fruit:"Lemons",  Price:31,  Purchase:Date(2015,10,1), Tags: ["Colombia"]},
      {Supplier:"Contoso",  Fruit:"Lemons",  Price:29,  Purchase:Date(2015,10,2), Tags: ["Peru"]},
      {Supplier:"Contoso",  Fruit:"Grapes",  Price:210, Purchase:Date(2015,10,2), Tags: ["Green","Seedless"]},
      {Supplier:"Fabrikam", Fruit:"Lemons",  Price:30,  Purchase:Date(2015,10,3), Tags: ["Mexico","Seedless"]},
      {Supplier:"Contoso",  Fruit:"Bananas", Price:12,  Purchase:Date(2015,10,3), Tags: ["Mexico"]}
   )
)
```

2. Evaluate the following formula:

```powerapps-dot
Summarize( Inventory, Supplier, Fruit, Average( ThisGroup, Price ) As 'Average Price' )
```

| Fruit   | Supplier  | Average Price |
|---------|-----------|---------------|
| Grapes  | Contoso   | 215           |
| Lemons  | Fabrikam  | 30.5          |
| Lemons  | Contoso   | 29            |
| Bananas | Contoso   | 12            |

---

## Table function

Source: [function-table.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table)

*Reference information including syntax and examples for the Table function.*

# Table function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Creates a temporary [table](/power-apps/maker/canvas-apps/working-with-tables).

## Description

The **Table** function creates a table from an argument list of [records](/power-apps/maker/canvas-apps/working-with-tables#records) or tables.

The result table's [columns](/power-apps/maker/canvas-apps/working-with-tables#columns) are the union of all the columns from all the argument records and tables. A _blank_ value is added to any column for which a record doesn't include a value.

A table is a value in Power Apps, just like a string or a number. You can specify a table as an argument for a function, and functions can return a table as a result. **Table** doesn't create a permanent table. Instead it returns a temporary table made of its arguments. You can specify this temporary table as an argument for another function, visualize it in a gallery, or embed it in another table. Fore more information, see [working with tables](/power-apps/maker/canvas-apps/working-with-tables).

You can also create a single-column table with the **[ value1, value2, ... ]** syntax.

## Syntax

**Table**( _RecordOrTable1_ [, *RecordOrTable2*, ... ] )

- _RecordOrTable(s)_ - Required. The records or table to add to the result table. If a table is provided, the records of the table are added to the resulting table as if they had been individually added.

**Table**( _Dynamic_ )

- _Dynamic_ - Required. [**Dynamic**](../untyped-object.md) value that represents a table or array. Acceptable values are dependent on the untyped provider. For [**JSON**](function-parsejson.md), the dynamic value is expected to be a JSON array. Regardless of the content type of the Untyped array, the resulting table is a single-column table of dynamic values.

## Examples

- Set the **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property of a listbox to this formula:
  ```power-fx
  Table( {Color: "red"}, {Color: "green"}, {Color: "blue" } )
  ```

  The listbox shows each color as an option.

- Add a text gallery, and set its **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property to this function:<br>
  ```power-fx
  Table( {Item: "Violin123", Location:"France", Owner:"Fabrikam"}, {Item:"Violin456", Location:"Chile"} )
  ```

  The gallery shows two records, both of which contain the name and location of an item. Only one record contains the name of the owner.

- This formula combines standard sizes with extended sizes into a single table
  ```power-fx
  Table( { Value: "XS" }, [ "S", "M", "L" ], { Value: "XL" } )
  ```

---

## Text function

Source: [function-text.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-text)

*Reference information including syntax and examples for the Text function.*

# Text function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Converts any value and formats a number or date/time value to a string of text.

## Description

The **Text** function formats a number or a date/time value based on one of these types of arguments:

- A predefined date/time format, which you specify by using the **DateTimeFormat** enumeration. For dates and times, this approach is preferred as it automatically adjusts to each user's language and region.
- A custom format, which comprises a string of placeholders that define, for example, whether numbers show a decimal separator and dates show the full name of the month, the month as an abbreviation, or the month as a number. Power Apps supports a subset of the placeholders that Microsoft Excel does. In this string, the language placeholder specifies the language in which to interpret the other placeholders. If the custom format includes a period, for example, the language-format placeholder specifies whether the period is a decimal separator (ja-JP) or a thousands separator (es-ES).

See [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

The **Text** function can also convert any data type to a text representation using a default format. Use this to pass non-text values to text-based functions such as [**Len**](function-len.md), [**Right**](function-left-mid-right.md), and [**IsMatch**](function-ismatch.md).

### <a name="predefined-datetime-formats"></a> Predefined date/time formats

For these examples, date and time used is Tuesday, April 7, 2020 8:26:59.180 PM, in the time zone UTC-7 hours.

| DateTimeFormat enum | Description                                                                                                                                                                                            | Examples (using **en-US**)          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| **LongDate**        | Four-digit year, month name, day of the month, and day of the week. The names of the month and day of the week aren't abbreviated.                                                                     | "Tuesday, April 7, 2020"            |
| **LongDateTime**    | Four-digit year, month name, day of the month, and day of the week, plus hour (12-hour clock), minutes, seconds, and AM/PM designation. The names of the month and day of the week aren't abbreviated. | "Tuesday, April 7, 2020 8:26:59 PM" |
| **LongDateTime24**  | Four-digit year, month, day of the month, and day of the week, plus hour (24-hour clock), minutes, and seconds. The names of the month and day of the week aren't abbreviated.                         | "Tuesday, April 7, 2020 20:26:59"   |
| **LongTime**        | Hour (12-hour clock), minutes, seconds, and AM/PM designation.                                                                                                                                         | "8:26:59 PM"                        |
| **LongTime24**      | Hour (24-hour clock), minutes, seconds.                                                                                                                                                                | "20:26:59"                          |
| **ShortDate**       | Four-digit year with numerical month and day of the month.                                                                                                                                             | "4/7/2020"                          |
| **ShortDateTime**   | Four-digit year with numerical month and day of the month, plus hour (12-hour clock), minutes, and AM/PM designation.                                                                                  | "4/7/2020 8:26 PM"                  |
| **ShortDateTime24** | Four-digit year with numerical month and day of the month, plus hour (24-hour clock) and minutes.                                                                                                      | "4/7/2020 20:26"                    |
| **ShortTime**       | Hour (12-hour clock), minutes, and AM/PM designation.                                                                                                                                                  | "8:26 PM"                           |
| **ShortTime24**     | Hour (24-hour clock) and minutes.                                                                                                                                                                      | "20:26"                             |
| **UTC**             | The date/time value is converted to UTC based on the current user's time zone and formatted according to the ISO 8601 standard.                                                                        | "2020-04-08T03:26:59.180Z"          |

### Number placeholders

| Placeholder      | Description                                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0** (_zero_)   | Displays insignificant zeros if a number has fewer digits than there are zeros in the format. For example, use the format **#.00** if you want to display **8.9** as **8.90**.                                                                                                                          |
| **#**            | Follows the same rules as the **0** (zero). However, **Text** doesn't return extra zeros when the number has fewer digits on either side of the decimal than there are # symbols in the format. For example, **8.9** is displayed if the custom format is **#.##** and the number to format is **8.9**. |
| **.** (_period_) | Displays the decimal point in a number. Depends on the language of the custom format; see [global apps](#global-apps) for more details.                                                                                                                                                                 |
| **,** (_comma_)  | Displays the grouping separator in a number, often used for thousands. **Text** separates groups by commas if the format contains a comma that's enclosed by number signs (**#**) or by zeros. Depends on the language of the custom format; see [global apps](#global-apps) for more details.          |

If a number has more digits to the right of the decimal point than there are placeholders in the format, the number rounds to as many decimal places as there are placeholders. If there are more digits to the left of the decimal point than there are placeholders, the extra digits are displayed. If the format contains only number signs (#) to the left of the decimal point, numbers less than 1 start with a decimal point (for example, **.47**).

### Date and time placeholders

| Placeholder        | Description                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **:::no-loc text="m":::**              | Displays the month as a number without a leading zero.                                                                                                                                                                                                              |
| **:::no-loc text="mm":::**             | Displays the month as a number with a leading zero when appropriate.                                                                                                                                                                                                |
| **:::no-loc text="mmm":::**            | Displays the month as an abbreviation (**Jan** to **Dec**).                                                                                                                                                                                                         |
| **:::no-loc text="mmmm":::**           | Displays the month as a full name (**January** to **December**).                                                                                                                                                                                                    |
| **:::no-loc text="d":::**              | Displays the day as a number without a leading zero.                                                                                                                                                                                                                |
| **:::no-loc text="dd":::**             | Displays the day as a number with a leading zero when appropriate.                                                                                                                                                                                                  |
| **:::no-loc text="ddd":::**            | Displays the day as an abbreviation (**Sun** to **Sat**).                                                                                                                                                                                                           |
| **:::no-loc text="dddd":::**           | Displays the day as a full name (**Sunday** to **Saturday**).                                                                                                                                                                                                       |
| **:::no-loc text="yy":::**             | Displays the year as a two-digit number.                                                                                                                                                                                                                            |
| **:::no-loc text="yyyy":::**           | Displays the year as a four-digit number.                                                                                                                                                                                                                           |
| **:::no-loc text="h":::**              | Displays the hour as a number without a leading zero.                                                                                                                                                                                                               |
| **:::no-loc text="hh":::**             | Displays the hour as a number with a leading zero when appropriate. If the format contains **AM** or **PM**, the hour is shown based on the 12-hour clock. Otherwise, the hour is shown based on the 24-hour clock.                                                 |
| **:::no-loc text="m":::**              | Displays the minute as a number without a leading zero.<br><br>This placeholder must appear immediately after the **h** or **hh** code or immediately before the **ss** code; otherwise, **Text** returns the month instead of minutes.                             |
| **:::no-loc text="mm":::**             | Displays the minute as a number with a leading zero when appropriate.<br><br>This placeholder must appear immediately after the **h** or **hh** placeholder or immediately before the **ss** placeholder. Otherwise, **Text** returns the month instead of minutes. |
| **:::no-loc text="s":::**              | Displays the second as a number without a leading zero.                                                                                                                                                                                                             |
| **:::no-loc text="ss":::**             | Displays the second as a number with a leading zero when appropriate.                                                                                                                                                                                               |
| **:::no-loc text="f":::**              | Displays the fractions of seconds.                                                                                                                                                                                                                                  |
| **:::no-loc text="AM/PM,a/p":::** | Displays the hour based on a 12-hour clock. **Text** returns "AM" or "a" for times from midnight until noon and "PM" or "p" for times from noon until midnight                                                                                                      |

### Literal placeholders

You can include any of these characters in your format string. They will appear in the result of **Text** as is. Additional characters are reserved for future placeholders, so you shouldn't use them.

| Character           | Description                              |
| ------------------- | ---------------------------------------- |
| Any currency symbol | Dollar sign, cents sign, euro sign, etc. |
| **+**               | Plus sign                                |
| **(**               | Left parenthesis                         |
| **:**               | Colon                                    |
| **^**               | Circumflex accent (caret)                |
| **'**               | Apostrophe                               |
| **{**               | Left curly bracket                       |
| **<**               | Less-than sign                           |
| **=**               | Equal sign                               |
| **-**               | Minus sign                               |
| **/**               | Slash mark                               |
| **)**               | Right parenthesis                        |
| **&**               | Ampersand                                |
| **~**               | Tilde                                    |
| **}**               | Right curly bracket                      |
| **>**               | Greater-than sign                        |
| &nbsp;              | Space character                          |

## Global apps

The **Text** function is globally aware. For a wide array of languages, it knows how to properly write out dates, times, currencies, and numbers. To do its job, it needs two pieces of information:

- **The language of the custom format:** For makers, how should a custom format be interpreted? The separator characters (**.** and **,**) have different meanings in different languages. If you specify a custom format, you can include a language placeholder or take the default value, which reflects the language to which your device is set. Even easier, you can use one of the [predefined date/time formats](#predefined-datetime-formats), which are language agnostic.
- **The language of the result:** For users, in what language should the function result appear? Names of months and weekdays must be in the appropriate language for the user of the app, which you can specify by adding a third, optional argument to the **Text** function.

For both, you specify the language by using a [language tag](function-language.md#language-tags). To see the list of supported languages, type **Text( 1234, "", )** in the formula bar or the **Advanced** tab of the right-hand pane, and then scroll through the list of locales suggested for the third argument.

### Language placeholder

To specify the language of the custom format, use:

| Placeholder           | Description                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[$-_LanguageTag_]** | _LanguageTag_ is a language tag as returned from the **Language** function. It can specify just the language (such as **[$-en]** for English), or it can also specify the region (such as **[$-en-GB]** to further specify Great Britain). |

The language placeholder can appear anywhere in the custom format but only once.

If you specify a custom format without a language placeholder and the format is ambiguous from a global standpoint, the language tag for your current language is inserted automatically.

**[$-en-US]** is assumed if this placeholder isn't present when your app is run.

> [!NOTE]
> In a future version, the syntax of this placeholder may change to avoid confusion with a similar, but different, placeholder that Excel supports.

### Result language tag

The result of **Text** includes translated strings for months, weekdays, and AM/PM designations, as well as the appropriate group and decimal separators.

By default, **Text** uses the language of the user running the app. The **Language** function returns the language tag for the current user. You can override this default value by supplying a language tag for the third argument to **Text**.

## Syntax

**Text**( _NumberOrDateTime_, _DateTimeFormatEnum_ [, _ResultLanguageTag_ ] )

- _NumberOrDateTime_ - Required. The number or the date/time value to format.
- _DateTimeFormat_ - Required. A member of the **DateTimeFormat** enumeration.
- _ResultLanguageTag_ - Optional. The language tag to use for the result text. By default, the language of the current user is used.

**Text**( _NumberOrDateTime_, _CustomFormat_ [, _ResultLanguageTag_ ] )

- _Number_ - Required. The number or the date/time value to format.
- _CustomFormat_ - Required. One or more placeholders enclosed in double quotation marks.
- _ResultLanguageTag_ - Optional. The language tag to use for the result text. By default, the language of the current user is used.

**Text**( _AnyValue_ )

- _AnyValue_ - Required. Value to convert to a text representation. A default format is used.

**Text** ( _Dynamic_ )

- _Dynamic_ - Required. [**Dynamic**](../untyped-object.md) value that represents a string. Acceptable values are dependent on the untyped provider. For [**JSON**](function-parsejson.md), if the dynamic value is a number or boolean, it will be converted to text.

## Examples

Unless otherwise specified, the user running these formulas is located in the United States and has selected English as their language. The **Language** function is returning "en-US".

### Number

| Formula                                                                                           | Description                                                                                                               | Result                                |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Text(&nbsp;1234.59,&nbsp;"####.#"&nbsp;)**                                                      | Formats the number with one decimal place.                                                                                | "1234.6"                              |
| **Text(&nbsp;8.9,&nbsp;"#.000"&nbsp;)**                                                           | Pads the decimal portion of the number with trailing zeros, if needed.                                                    | "8.900"                               |
| **Text(&nbsp;0.631,&nbsp;"0.#"&nbsp;)**                                                           | Pads the whole portion of the number with leading zeros, if needed.                                                       | "0.6"                                 |
| **Text(&nbsp;12,&nbsp;"#.0#"&nbsp;)**<br>**Text(&nbsp;1234.568,&nbsp;"#.0#"&nbsp;)**              | Pads the decimal portion of the number with zeros for one decimal place, and includes a second decimal place if supplied. | "12.0"<br>"1234.57"                   |
| **Text(&nbsp;12000,&nbsp;"$ #,###"&nbsp;)**<br>**Text(&nbsp;1200000,&nbsp;"$&nbsp;#,###"&nbsp;)** | Places a thousands separator every three digits, and includes a currency symbol.                                          | "$&nbsp;12,000"<br>"$&nbsp;1,200,000" |

### Date/Time

- At **2:37:47 PM** on **Monday, November 23, 2015**
- United States Pacific Time Zone (UTC-8)

| Formula                                                      | Description                                                                                                                                                                                                                                                                                                                             | Result                                 |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Text( Now(), DateTimeFormat.LongDate )**                   | Formats as a long date string, in the language and locale of the current user.                                                                                                                                                                                                                                                          | "Monday, November 23, 2015"            |
| **Text( Now(), DateTimeFormat.LongDateTime )**               | Formats as a long date and time string, in the language and locale of the current user, using a 12-hour clock.                                                                                                                                                                                                                          | "Monday, November 23, 2015 2:37:47 PM" |
| **Text( Now(), DateTimeFormat.LongTime24 )**                 | Formats as a long time string, using a 24-hour clock.                                                                                                                                                                                                                                                                                   | "14:37:47"                             |
| **Text( Now(), DateTimeFormat.ShortDate )**                  | Formats as a short date string, in the language and locale of the current user.                                                                                                                                                                                                                                                         | "11/23/2015"                           |
| **Text( Now(), "d-mmm-yy" )**                                | Formats using placeholder characters: <ul><li>**d** for a single-digit or double-digit day of the month<li>**-** as a literal character copied to the result<li>**mmm** for a three-letter abbreviation of the month<li>**-** as another literal character copied to the result<li>**yy** for a two-digit abbreviation of the year</ul> | "23-Nov-15"                            |
| **Text(1448318857\*1000, "mmm. dd, yyyy (hh:mm:ss AM/PM)")** | Shows a Unix date-time value in human-readable format if you multiply the source value by 1,000.                                                                                                                                                                                                                                        | "Nov. 23, 2015 (02:47:37 PM)"          |

### Global apps

| Formula                                                   | Description                                                                                                                                                                                                                    | Result                          |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| **Text(1234567.89, "[$-fr-FR]# ###,## &euro;", "fr-FR")** | Shows a space as a grouping separator, the comma as a decimal separator, and **&euro;** as the currency symbol.                                                                                                                | "1&nbsp;234&nbsp;567,89 &euro;" |
| **Text(1234567,89; "[$-fr-FR]# ###,## &euro;")**          | If the source data follows the French custom of using a comma as the decimal separator, you must change your locale to French and separate the arguments with a semi-colon instead of a comma to get the same result as above. | "1&nbsp;234&nbsp;567,89 &euro;" |
| **Text( Date(2016,1,31), "dddd mmmm d" )**                | Returns the weekday, month, and day of the month in the language of the current user. Because none of the placeholders are language dependent, there is no need for a format text language tag.                                | "Sunday&nbsp;January&nbsp;31"   |
| **Text( Date(2016,1,31), "dddd mmmm d", "es-ES" )**       | Returns the weekday, month, and day of the month in the "es-ES" language.                                                                                                                                                      | "domingo&nbsp;enero&nbsp;31"    |

### Converting values to text

| Formula                                                       | Description                                                                                                                                                                                                       | Result                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Text(&nbsp;1234567.89&nbsp;)**                              | Converts a number to a string. There are no thousands separators or control over the number of digits before or after the decimal separator; for more control, supply number placeholders as the second argument. | "1234567.89"                           |
| **Text(&nbsp;DateTimeValue(&nbsp;"01/04/2003"&nbsp;)&nbsp;)** | Converts a date/time value to a string of text. To control the conversion, provide either a member of the DateTimeFormat enumeration or a custom-format string.                                                   | "1/4/2003 12:00 AM"                    |
| **Text(&nbsp;true&nbsp;)**                                    | Converts a Boolean value to a string.                                                                                                                                                                             | "true"                                 |
| **Text(&nbsp;GUID()&nbsp;)**                                  | Converts a generated GUID value to a string.                                                                                                                                                                      | "f8b10550-0f12-4f08-9aa3-bb10958bc3ff" |
| **Left(&nbsp;Text(&nbsp;GUID()&nbsp;),&nbsp;4&nbsp;)**        | Returns the first four characters of a generated GUID.                                                                                                                                                            | "2d9c"                                 |

---

## Trace function

Source: [function-trace.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-trace)

*Reference information including syntax and examples for the Trace function.*

# Trace function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Often there is a lot of logic working behind the scenes in an app. Sometimes the impact is obvious, for example, a control's value or color changes, confirming the logic operated correctly. However, sometimes it isn't obvious and it can be difficult to visualize and understand what is happening inside the app. Use the **Trace** function to record diagnostic information from behind the scenes, creating a timeline of what actually happened, to better understand how your app is operating and to help debug issues.

When used in Power Apps, the output from **Trace** appears in the [Power Apps Live Monitor](/power-apps/maker/monitor-overview) tool along with other app activities. If you allowed your app to send telemetry data to [Azure Application Insights](/power-apps/maker/canvas-apps/application-insights), the **Trace** function can also be used to send information to your Application Insights resource. **Trace** can only be used in [behavior formulas](../imperative.md) - to trace values from data properties, you need to use alternatives such as [debug buttons](/troubleshoot/power-platform/power-apps/create-and-use-apps/monitor-debugging-canvas-apps#trace-data-property-values-by-using-debug-buttons). 

When used with [Test Studio](/power-apps/maker/canvas-apps/test-studio), **Trace** is an optional expression that can be used to provide additional information in your test results from the **OnTestCaseComplete** event. **Trace** event messages are combined with passed and failed assertion messages in the **Traces** table of the **TestCaseResult** record. The **Traces** table has two properties, **Message** and **Timestamp**. Trace information used in tests will also be recorded in Application Insights. Test trace information isn't be available in the Live Monitor tool as the Live Monitor is connected to the app when played from the Power Apps Studio.

## Syntax

**Trace**( _Message_ [, _TraceSeverity_ [, _CustomRecord_ [, _TraceOptions_ ] ] ] )

- _Message_ – Required. The information to be traced. Numbers, Dates, Booleans, and any other data type that can be coerced to Text.
- _TraceSeverity_ – Optional. The severity level of the Trace recorded in Live Monitor and Application Insights. Options are **TraceSeverity.Information** (default), **TraceSeverity.Warning**, **TraceSeverity.Error**, or **TraceSeverity.Critical**.
- _CustomRecord_ – Optional. A record containing custom data that is recorded in Live Monitor or Application Insights.
- _TraceOptions_ – Optional. Options are **TraceOptions.None** (default) and **TraceOptions.IgnoreUnsupportedTypes** which ignores data types in _CustomRecord_ that can't be serialized.

## Example

1. Create a button control in Power Apps Studio.
2. Set the **OnSelect** formula to the formula:
  ```power-fx
  Set( x, x+1 );
  Trace( x );
  ```
3. Open the Power Apps Live Monitor in another browser window by selecting the "Advanced tools" icon in the left hand pane and select "Open live monitor":
  ![entry point for Power Apps live monitor](media/function-trace/open-monitor.png)
4. Return to the original Studio browser window and select your button four times. Use **Alt-click** on your mouse if in design mode.
5. View the Power Apps Live Monitor.
6. The Live Monitor's grid will contain an event for each button click and for each **Trace** call, which will show the value of the variable after each increment. Drill into a Trace event to see where the **Trace** was initiated, and the expression used for the message, in the right hand panel:
  ![live monitor trace showing button being pressed four times and corresponding increments of a variable](media/function-trace/increment-trace.png)

## See Also

[Power Apps Live Monitor Overview](/power-apps/maker/monitor-overview) <br>
[Test Studio Overview](/power-apps/maker/canvas-apps/test-studio) <br>
[Working with Test Studio](/power-apps/maker/canvas-apps/working-with-test-studio)

---

## Trim and TrimEnds functions

Source: [function-trim.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-trim)

*Reference information including syntax and examples for the Trim and TrimEnds functions.*

# Trim and TrimEnds functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Removes extra spaces from a string of text.

## Description

The **Trim** function removes all spaces from a string of text except for single spaces between words.

The **TrimEnds** function removes all spaces from the start and end of a string of text but leaves spaces between words intact.

If you specify a single string of text, the return value for either function is the string with any extra spaces removed. If you specify a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains strings, the return value is a single-column table of trimmed strings. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

By trimming spaces between words, **Trim** is consistent with the function of the same name in Microsoft Excel. However, **TrimEnds** is consistent with programming tools that trim spaces only from the start and end of each string.

## Syntax

**Trim**( _String_ )<br>**TrimEnds**( _String_ )

- _String_ - Required. The string of text to remove spaces from.

**Trim**( _SingleColumnTable_ )<br>**TrimEnds**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of strings to remove spaces from.

## Example

| Formula | Description | Result |
| --- | --- | --- |
| **Trim(&nbsp;"&nbsp;&nbsp;&nbsp;Hello&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;World&nbsp;&nbsp;&nbsp;"&nbsp;)** | Removes all spaces from the start and end of a string and extra spaces from within the string. | "Hello World" |
| **TrimEnds(&nbsp;"&nbsp;&nbsp;&nbsp;Hello&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;World&nbsp;&nbsp;&nbsp;"&nbsp;)** | Removes all spaces from the start and end of a string. | "Hello&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;World" |

The following examples use a single-column collection, named **Spaces**, that contains these strings:

| Value |
| --- |
| "&nbsp;&nbsp;&nbsp;Jane&nbsp;&nbsp;&nbsp;Doe&nbsp;&nbsp;&nbsp;" |
| "&nbsp;&nbsp;&nbsp;&nbsp;Jack&nbsp;&nbsp;&nbsp;and&nbsp;&nbsp;&nbsp;Jill" |
| "Already&nbsp;trimmed" |
| "&nbsp;&nbsp;&nbsp;Venus,&nbsp;&nbsp;&nbsp;Earth,&nbsp;&nbsp;&nbsp;Mars&nbsp;&nbsp;" |
| "Oil&nbsp;and&nbsp;Water&nbsp;&nbsp;&nbsp;" |

To create this collection, set the **OnSelect** property of a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control to this formula, open Preview mode, and then click or tap the button:
<br>**ClearCollect( Spaces, [ "&nbsp;&nbsp;&nbsp;Jane&nbsp;&nbsp;&nbsp;Doe&nbsp;&nbsp;&nbsp;", "&nbsp;&nbsp;&nbsp;&nbsp;Jack&nbsp;&nbsp;&nbsp;and&nbsp;&nbsp;&nbsp;Jill", "Already&nbsp;trimmed", "&nbsp;&nbsp;&nbsp;Venus,&nbsp;&nbsp;&nbsp;Earth,&nbsp;&nbsp;&nbsp;Mars&nbsp;&nbsp;", "Oil&nbsp;and&nbsp;Water&nbsp;&nbsp;&nbsp;" ] )**

| Formula | Description | Result |
| --- | --- | --- |
| **Trim(&nbsp;Spaces&nbsp;)** | Trims all spaces from the start and end of each string and extra spaces from within each string in the **Spaces** collection. | A single-column table with a `Value` column containing the following values: "Jane&nbsp;Doe", "Jack&nbsp;and&nbsp;Jill", "Already&nbsp;trimmed", "Venus,&nbsp;Earth,&nbsp;Mars", "Oil&nbsp;and&nbsp;Water" |
| **TrimEnds(&nbsp;Spaces&nbsp;)** | Trims all spaces from the start and end of each string in the **Spaces** collection. | A single-column table with a `Value` column containing the following values: "Jane&nbsp;&nbsp;&nbsp;Doe", "Jack&nbsp;&nbsp;&nbsp;and&nbsp;&nbsp;&nbsp;Jill", "Already&nbsp;trimmed", "Venus,&nbsp;&nbsp;&nbsp;Earth,&nbsp;&nbsp;&nbsp;Mars", "Oil&nbsp;and&nbsp;Water" |

> [!NOTE]
> Extra spaces don't appear if you display a collection by clicking or tapping **Collections** on the **File** menu. To verify string length, use the **[Len](function-len.md)** function.

---

## Update and UpdateIf functions

Source: [function-update-updateif.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-update-updateif)

*Reference information including syntax and examples for the Update and UpdateIf functions.*

# Update and UpdateIf functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Updates [records](/power-apps/maker/canvas-apps/working-with-tables#records) in a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

### Update function

Use the **Update** function to replace an entire record in a data source. In contrast, the **UpdateIf** and the **[Patch](function-patch.md)** functions modify one or more values in a record, leaving the other values alone.

For a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections), the entire record must match. Collections allow duplicate records, so multiple records might match. You can use the **RemoveFlags.All** argument to update all copies of a record; otherwise, only one copy of the record is updated.

If the data source generates a column's value automatically, the value of that [column](/power-apps/maker/canvas-apps/working-with-tables#columns) must be reaffirmed.

### UpdateIf function

Use the **UpdateIf** function to modify one or more values in one or more records that match one or more conditions. The condition can be any formula that results in a **true** or **false** and can reference columns of the data source by name. The function evaluates the condition for each record and modifies any record for which the result is **true**.

To specify a modification, use a change record that contains new property values. If you provide this change record inline with curly braces, property formulas can reference properties of the record that's being modified. You can use this behavior to modify records based on a formula.

Similar to **UpdateIf**, you can also use the **[Patch](function-patch.md)** function to change specific columns of a record without affecting other columns.

Both **Update** and **UpdateIf** return the modified data source as a [table](/power-apps/maker/canvas-apps/working-with-tables). You must use either function in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

### Delegation

These functions do not delegate to a data source. However, **UpdateIf** and **RemoveIf** work locally to simulate delegation up to a limit of 500/2000 records. They progressively bring down records beyond the non-delegation limit of 500/2000 records. Records that meet the **If** condition are collected. Generally, a maximum of 500/2000 records are collected separately and then modified per execution. However, more records may be updated if the existing local data cache is large, as the function may have access to more records for evaluation. Only the initial portion of the data source will be retrieved, and then the function will be applied. This may not represent the complete picture. A warning may appear during authoring to remind you of this limitation.

## Syntax

**Update**(DataSource_, _OldRecord_, _NewRecord_ [, **RemoveFlags.All** ] )

- _DataSource_ – Required. The data source that contains the record that you want to replace.
- _OldRecord_ – Required. The record to replace.
- _NewRecord_ – Required. The replacement record. This isn't a change record. The entire record is replaced, and missing properties contain _blank_.
- _RemoveFlags.All_ – Optional. In a collection, the same record may appear more than once. Specify the **RemoveFlags.All** argument to update all copies of the record.

**UpdateIf**(DataSource_, _Condition1_, _ChangeRecord1_ [, *Condition2*, *ChangeRecord2*, ... ] )

- _DataSource_ – Required. The data source that contains the record or records that you want to modify.
- _Conditions_ – Required. A formula that evaluates to **true** for the record or records that you want to modify. You can use column names of _DataSource_ in the formula. In case multiple _Conditions_ are passed, only the _ChangeRecord_ related to the first _Condition_ that evaluates to **true** is applied.
- _ChangeRecord(s)_ - Required. For each corresponding condition, a change record of new property values to apply to records of _DataSource_ that satisfy the condition. If you provide the record inline using curly braces, property values of the existing record can be used in the property formulas.

## Examples

In these examples, you'll replace or modify records in a data source that's named **IceCream** and that starts with the data in this table:

![IceCream example.](media/function-update-updateif/icecream.png)

| Formula                                                                                                                                                                                        | Description                                                                                                                                                       | Result                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  **Update(&nbsp;IceCream,<br>LookUp(&nbsp;IceCream,&nbsp;Flavor="Chocolate"&nbsp;), {&nbsp;ID:&nbsp;1,&nbsp;Flavor:&nbsp;"Mint&nbsp;Chocolate",&nbsp;Quantity:150&nbsp;} )** | Replaces a record from the data source.                                                                                                                           | ![Replace a record.](media/function-update-updateif/icecream-mint.png)<br><br>The **IceCream** data source has been modified.                                |
| **UpdateIf(&nbsp;IceCream, Quantity > 175, {&nbsp;Quantity:&nbsp;Quantity&nbsp;+&nbsp;10&nbsp;} )**                                                                                            | Modifies records that have a **Quantity** that is greater than **175**. The **Quantity** field is incremented by 10, and no other fields are modified.            | ![Modify records.](media/function-update-updateif/icecream-mint-plus10.png)<br><br>The **IceCream** data source has been modified.                           |
| **Update(&nbsp;IceCream,<br>LookUp(&nbsp;IceCream, Flavor="Strawberry"&nbsp;),<br>{&nbsp;ID:&nbsp;3, Flavor:&nbsp;"Strawberry Swirl"} )**                                   | Replaces a record from the data source. The **Quantity** property hasn't been supplied in the replacement record, so that property will be _blank_ in the result. | ![Replace record when quantity not supplied.](media/function-update-updateif/icecream-mint-swirl.png)<br><br>The **IceCream** data source has been modified. |
| **UpdateIf(&nbsp;IceCream, true, {&nbsp;Quantity:&nbsp;0&nbsp;} )**                                                                                                                            | Sets the value of the **Quantity** property for all records in the data source to 0.                                                                              | ![Set quantity for all to 0.](./media/function-update-updateif/icecream-mint-zero.png)<br> <br>The **IceCream** data source has been modified.       |

### Step by step

1. Import or create a collection named **Inventory**, and show it in a gallery as [Show data in a gallery](/power-apps/maker/canvas-apps/show-images-text-gallery-sort-filter) describes.
2. Name the gallery **ProductGallery**.
3. Add a slider named **UnitsSold**, and set its **Max** property to this expression:<br>**ProductGallery.Selected.UnitsInStock**
4. Add a button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>**UpdateIf(Inventory, ProductName = ProductGallery.Selected.ProductName, {UnitsInStock:UnitsInStock-UnitsSold.Value})**
5. Press F5, select a product in the gallery, specify a value with the slider, and then select the button.

   The number of units in stock for the product you specified decreases by the amount that you specified.

---

## UpdateContext function

Source: [function-updatecontext.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-updatecontext)

*Reference information including syntax and examples for the UpdateContext function.*

# UpdateContext function
**Applies to:** 
- ✓ Canvas apps



Creates or updates [context variables](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable) of the current screen.

## Overview

Use the **UpdateContext** function to create a context variable, which temporarily holds a piece of information, such as the number of times the user has selected a button or the result of a data operation.

Context variables are scoped to a screen, which means that you can't build a formula that refers to a context variable on another screen. If you've used another programming tool, you can think of a context variable as similar to a local variable. Use the [**Set** function](function-set.md) to work with global variables that are available throughout your app.

Power Apps are based on formulas that automatically recalculate as the user interacts with an app. Context variables don't offer this benefit and can make your app harder to create and understand. Before you use a context variable, review [working with variables](/power-apps/maker/canvas-apps/working-with-variables).

## Description

To create or update a context variable, pass a single [record](/power-apps/maker/canvas-apps/working-with-tables#records) to the **UpdateContext** function. In each record, specify the name of a [column](/power-apps/maker/canvas-apps/working-with-tables#columns), which defines or matches the name of the variable, and the value to which you want to set that variable.

- If you specify the name of a variable that you've previously defined, **UpdateContext** sets the value of the variable to the value that you specify.
- If you specify the name of a variable that doesn't yet exist, **UpdateContext** creates a variable with that name and sets the value of that variable to the value that you specify.
- If you've previously defined a variable but don't specify it in this particular **UpdateContext** formula, its value remains the same.

Context variables are implicitly created by using the **UpdateContext** or [**Navigate** function](function-navigate.md). There is no explicit declaration required. If you remove all the **UpdateContext** and **Navigate** references to a context variable, then that context variable will cease to exist. To clear a variable set its value to the result of the [**Blank** function](function-isblank-isempty.md).

You can see your variables' values, definitions, and uses with the Variables view under the File menu in the authoring environment.

You reference a context variable in a formula by using the variable's column name. For example, **UpdateContext( { ShowLogo: true } )** creates a context variable named **ShowLogo** and sets its value to **true**. You can then use the value of this context variable by using the name **ShowLogo** in a formula. You can write **ShowLogo** as the formula for the **Visible** property of an image control and show or hide that control based on whether the value of the context variable is **true** or **false**.

As the examples later in this topic show, context variables can hold several kinds of information, including these:

- a single value
- a record
- a table
- an object reference
- any result from a formula

A context variable holds its value until the app is closed. If you define a context variable and set its value on a particular screen, that information remains intact even if the user switches to a different screen. Once the app is closed, the context variable's value will be lost and must be recreated when the app is loaded again.

Every context variable is scoped to a screen. If you want to define a context variable on one screen and modify that variable from another screen, you must build a formula that's based on the **[Navigate](function-navigate.md)** function. Or use a global variable.

**UpdateContext** has no return value, and you can use it only within a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**UpdateContext**( _UpdateRecord_ )

- _UpdateRecord_ – Required. A record that contains the name of at least one column and a value for that column. A context variable is created or updated for each column and value that you specify.

**UpdateContext**( { _ContextVariable1_: _Value1_ [, _ContextVariable2_: _Value2_ [, ... ] ] } )

- _ContextVariable1_ - Required. The name of a context variable to create or update.
- _Value1_ - Required. The value to assign to the context variable.
- _ContextVariable2_: _Value2_, ... - Optional. Additional context variables to create or update and their values.

## Examples

| Formula                                                                                                                | Description                                                                                                                                                                                                                                                    | Result                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **UpdateContext( {&nbsp;Counter:&nbsp;1&nbsp;} )**                                                                     | Creates or modifies the context variable **Counter**, setting its value to **1**.                                                                                                                                                                              | **Counter** has the value **1**. You can reference that variable by using the name **Counter** in a formula.                                                                                                                                                                         |
| **UpdateContext( {&nbsp;Counter:&nbsp;2&nbsp;} )**                                                                     | Sets the value of the **Counter** context variable from the previous example to **2**.                                                                                                                                                                         | **Counter** has the value **2**.                                                                                                                                                                                                                                                     |
| **UpdateContext( {&nbsp;Name:&nbsp;"Lily",&nbsp;Score:&nbsp;10&nbsp;} )**                                              | Creates or modifies the context variables **Name** and **Score**, setting their values to **Lily** and **10** respectively.                                                                                                                                    | **Name** has the value **Lily**, and **Score** has the value **10**.                                                                                                                                                                                                                 |
| **UpdateContext( {&nbsp;Person:&nbsp;{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"1&nbsp;Main&nbsp;St"&nbsp;}&nbsp;} )** | Creates or modifies the context variable **Person**, setting its value to a record. The record contains two columns, named **Name** and **Address**. The value of the **Name** column is **Milton**, and the value of the **Address** column is **1 Main St**. | **Person** has the value of record **{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"1&nbsp;Main&nbsp;St"&nbsp;}&nbsp;}**.<br><br>Reference this record as a whole with the name **Person**, or reference an individual column of this record with **Person.Name** or **Person.Address**. |
| **UpdateContext( {&nbsp;Person: Patch(&nbsp;Person,&nbsp;{Address:&nbsp;"2&nbsp;Main&nbsp;St"&nbsp;}&nbsp;) }&nbsp;)** | Works with the **[Patch](function-patch.md)** function to update the **Person** context variable by setting the value of the **Address** column to **2 Main St**.                                                                                              | **Person** now has the value of record **{&nbsp;Name:&nbsp;"Milton", Address:&nbsp;"2&nbsp;Main&nbsp;St"&nbsp;}&nbsp;}**.                                                                                                                                                            |

### Step-by-step example 1

1. Name the default screen **Source**, add another screen, and name it **Target**.
2. On the **Source** screen, add two buttons, and set their **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** properties so that one says **English** and the other says **Spanish**.
3. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of the **English** button to this expression:<br>**Navigate(Target, ScreenTransition.Fade, {Language:"English"})**
4. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of the **Spanish** button to this expression:<br>**Navigate(Target, ScreenTransition.Fade, {Language:"Spanish"})**
5. On the **Target** screen, add a label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this expression:<br>**If(Language="English", "Hello!", "Hola!")**
6. On the **Target** screen, select **Shapes** on the **Insert** tab, and then select the Back arrow.
7. Set the Back arrow's **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>**Navigate(Source, ScreenTransition.Fade)**
8. From the **Source** screen, press F5, and then select the button for either language.

   On the **Target** screen, the label appears in the language that corresponds to the button that you selected.

9. Select the Back arrow to return to the **Source** screen, and then select the button for the other language.

   On the **Target** screen, the label appears in the language that corresponds to the button that you selected.

10. Press Esc to return to the default workspace.

### Step-by-step example 2

1. Open the canvas app where you want to use this formula.
1. Add a new blank screen by selecting **New screen** from the command bar.
1. Add a button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula: <br> **UpdateContext( { Name: "Lily", Score: 10 } )**

---

## User function

Source: [function-user.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-user)

*Reference information including syntax and examples for the User function.*

# User function
**Applies to:** 
- ✓ Canvas apps
- ✓ Dataverse functions
- ✓ Power Pages



Returns information about the current user.

## Description

The **User** function returns a [record](/power-apps/maker/canvas-apps/working-with-tables#records) of information about the current user:

| Property            | Description                                                                                                                                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User().Email**    | Email address of the current user. The `User().Email` function returns the user's UPN and not the SMTP email address.                                                                                                                                                                                        |
| **User().EntraObjectId**    | Microsoft Entra Object ID of the current user, useful for calling APIs that use this value. This is a GUID value and unique for each user.                                                                                                                                                                                     |
| **User().FullName** | Full name of the current user, including first and last names.                                                                                                                                                                                                                                               |
| **User().Image**    | Image of the current user. This will be an image URL of the form "blob:_identifier_". Set the **[Image](/power-apps/maker/canvas-apps/controls/properties-visual)** property of the **[Image](/power-apps/maker/canvas-apps/controls/control-image)** control to this value to display the image in the app. |

> [!NOTE]
> The information returned is for the current Power Apps user. It will match the "Account" information that is displayed in the Power Apps players and studio, which can be found outside of any authored apps. This may not match the current user's information in Office 365 or other services.

> [!NOTE]
> If you published your application with a User function prior to March 2020, you may find that it, intermittently, will not retrieve photos. The issues were fixed in the late March 2020 release. To take advantage of the updated implementation, simply re-open your application, save it, and republish it.

## Syntax

**User**()

## Examples

The current Power Apps user has the following information:

- Full Name: **"John Doe"**
- Email address: **"john.doe@contoso.com"**
- Entra Object Id: **aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb** _(GUID)_
- Image: ![Image icon.](media/function-user/john-doe-picture.png "Image icon")

| Formula             | Description                                                                                                                                       | Result                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **User()**          | Record of all information for the current Power Apps user.                                                                                        | { FullName:&nbsp;"John Doe", Email:&nbsp;"john.doe@contoso.com", Image:&nbsp;"blob:1234...5678", EntraObjectId:&nbsp;a90c6800&#8209;e58c&#8209;4495&#8209;81f7&#8209;55819b56fe2a }                                   |
| **User().Email**    | The email address of the current Power Apps user.                                                                                                 | "john.doe@contoso.com"                                                                                                              |
| **User().FullName** | The full name of the current Power Apps user.                                                                                                     | "John Doe"                                                                                                                          |
| **User().EntraObjectId** | Microsoft Entra Object ID of the current user.                                                                                                   | aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb _(GUID)_                                                                                           |
| **User().Image**    | The image URL for the current Power Apps user. Set the **Image** property of the **Image** control to this value to display the image in the app. | "blob:1234...5678"<br><br>With **ImageControl.Image**:<br>![Image icon 1.](media/function-user/john-doe-picture.png "Image icon 1") |

---

## Validate function

Source: [function-validate.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-validate)

*Reference information including syntax and examples for the Validate function.*

# Validate function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



The **Validate** function checks whether the value of a single [column](/power-apps/maker/canvas-apps/working-with-tables#columns) or a complete [record](/power-apps/maker/canvas-apps/working-with-tables#records) is valid for a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

Before a user submits a data change, you can provide immediate feedback on the validity of that submission, resulting in a better user experience.

Data sources can provide information on what constitutes valid values within a record. This information can include many constraints, such as these examples:

- whether a column requires a value
- how long a string of text can be
- how high and low a number can be
- how early and late a date can be

The **Validate** function uses this information to determine whether a value is valid and to return an appropriate error message if not. You can use the **[DataSourceInfo](function-datasourceinfo.md)** function to view the same information that **Validate** uses.

Data sources vary in how much validation information they provide, including not providing any at all. **Validate** can only verify values based on this information. Even if **Validate** doesn't find a problem, applying the data change may still fail. You can use the **[Errors](function-errors.md)** function to obtain information about the failure.

If **Validate** finds a problem, the function returns an error message that you can show to the user of the app. If all values are valid, **Validate** returns [blank](function-isblank-isempty.md). When you work with a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) that has no validation information, values are always valid.

## Syntax

**Validate**( _DataSource_, _Column_, _Value_ )

- _DataSource_ – Required. The data source to validate with.
- _Column_ – Required. The column to validate.
- _Value_ – Required. The value for the selected column to be validated.

**Validate**( _DataSource_, _OriginalRecord_, _Updates_ )

- _DataSource_ – Required. The data source to validate with.
- _OriginalRecord_ - Required. The record to which updates are to be validated.
- _Updates_ - Required. The changes to apply to the original record.

## Examples

For these examples, values in the **Percentage** column of the **Scores** data source must be between 0 and 100, inclusive. If the data passes validation, the function returns _blank_. Otherwise, the function returns an error message.

### Validate with a single column

| Formula                                 | Description                                                                                          | Result                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Validate( Scores, Percentage, 10 )**  | Checks whether **10** is a valid value for the **Percentage** column in the **Scores** data source.  | _blank_                             |
| **Validate( Scores, Percentage, 120 )** | Checks whether **120** is a valid value for the **Percentage** column in the **Scores** data source. | "Values must be between 0 and 100." |

### Validate with a complete record

| Formula                                             | Description                                                                                                                                        | Result                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Validate( Scores, EditRecord, Gallery.Updates )** | Checks whether values in all columns are valid for the **Scores** data source. In this example, the value in the **Percentage** column is **10**.  | _blank_                             |
| **Validate( Scores, EditRecord, Gallery.Updates )** | Checks whether values in all columns are valid for the **Scores** data source. In this example, the value in the **Percentage** column is **120**. | "Values must be between 0 and 100." |

---

## With function

Source: [function-with.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-with)

*Reference information including syntax and examples for the With function.*

# With function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Calculates values and performs actions for a single [record](/power-apps/maker/canvas-apps/working-with-tables#records), including inline records of named values.

## Description

The **With** function evaluates a formula for a single record. The formula can calculate a value and/or perform actions, such as modifying data or working with a connection. Use the [**ForAll** function](function-forall.md) to evaluate a formula for all the records in a table of records.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

Use **With** to improve the readability of complex formulas by dividing it into smaller named sub-formulas. These named values act like simple local variables confined to the scope of the **With**. The same inline record syntax that is used with the [**UpdateContext** function](function-updatecontext.md) can be used with **With**. Using **With** is preferred over context or global variables as it is self contained, easy to understand, and can be used in any declarative formula context.

Use **With** to access the fields of the record that are returned by functions such as [**Patch**](function-patch.md) or [**Match**](function-ismatch.md). **With** holds the value from these functions long enough to be used in further calculations or actions.

If the _Record_ argument to **With** is an error, that error will be returned by the function and the _Formula_ will not be evaluated.

## Syntax

**With**( _Record_, _Formula_ )

- _Record_ – Required. The record to be acted upon. For names values, use the inline syntax `{ name1: value1, name2: value2, ... }`
- _Formula_ – Required. The formula to evaluate for _Record_. The formula can reference any of the fields of _Record_ directly as a record scope.

## Examples

### Simple named values

```power-fx
With( { radius: 10,
        height: 15 },
    Pi() * (radius*radius) * height
)
// Result: 4712.38898038 (as shown in a label control)
```

This example uses a record of named values to calculate the volume of a cylinder. **With** is being used to capture all the input values together, making it easy to separate them from the calculation itself.

### Nested With

![Interest calculator using With function.](media/function-with/interest-calculator.gif)

```power-fx
With( { AnnualRate: RateSlider/8/100,        // slider moves in 1/8th increments and convert to decimal
        Amount: AmountSlider*10000,          // slider moves by 10,000 increment
        Years: YearsSlider,                  // slider moves in single year increments, no adjustment required
        AnnualPayments: 12 },                // number of payments per year
      With( { r: AnnualRate/AnnualPayments,  // interest rate
              P: Amount,                     // loan amount
              n: Years*AnnualPayments },     // number of payments
            r*P / (1 - (1+r)^-n)             // standard interest calculation
      )
)
```

This example nests **With** functions to create a two-tier calculation for [monthly mortgage payments](https://en.wikipedia.org/wiki/Mortgage_calculator#Monthly_payment_formula). As long as there is no conflict, all of the outer **With** named values are available within the inner **With**.

Since the slider controls can only move in increments of 1, the sliders are divided or multiplied to create effectively a custom increment. In the case of the interest rate, the **RateSlider** has its **Max** property set to **48**, divided by 8 for a 1/8 percentage point increment and divided by 100 to convert from a percentage to a decimal, covering the range 0.125% to 6%. In the case of of the loan amount, the **AmountSlider** has its **Max** property set to **60** and multiplied by 10,000, covering the range 10,000 to 600,000.

The **With** is automatically recalculated as the sliders move and the new loan payment displayed. No variables are used and there is no need to use the **OnChange** property of the slider controls.

Here are the detailed instructions for creating this app:

1. Create a new app.
2. Add a [**Slider** control](/power-apps/maker/canvas-apps/controls/control-slider) and name it **RateSlider**. Set its **Max** property to 48.
3. Add a [**Label** control](/power-apps/maker/canvas-apps/controls/control-text-box) to the left of the slider control. Set its **Text** property to **"Interest Rate:"**.
4. Add a **Label** control to the right of the slider control. Set its **Text** property to the formula **RateSlider/8 & "&nbsp;%"**.
5. Add another **Slider** control and name it **AmountSlider**. Set its **Max** property to 60.
6. Add a **Label** control to the left of this slider control. Set its **Text** property to **"Loan Amount:"**.
7. Add a **Label** control to the right of this slider control. Set its **Text** property to the formula **AmountSlider/8 \* 10000**.
8. Add another **Slider** control and name it **YearsSlider**. Set its **Max** property to 40.
9. Add a **Label** control to the left of this slider control. Set its **Text** property to **"Number of Years:"**.
10. Add a **Label** control to the right of this slider control. Set its **Text** property to the formula **YearsSlider**.
11. Add a **Label** control and set its **Text** property to the formula shown above.
12. Add a **Label** control to the left of the last label control. Set its **Text** property to **"Recurring Monthly Payment:"**.

### Primary key returned from Patch

```power-fx
With( Patch( Orders, Defaults( Orders ), { OrderStatus: "New" } ),
      ForAll( NewOrderDetails,
              Patch( OrderDetails, Defaults( OrderDetails ),
                     { Order: OrderID,          // from With's first argument, primary key of Patch result
                       Quantity: Quantity,      // from ForAll's NewOrderDetails table
                       ProductID: ProductID }   // from ForAll's NewOrderDetails table
              )
      )
)
```

This example adds a record to the **Order** table in SQL Server. It then uses the returned primary key for the order, returned by the **Patch** function in the **OrderID** field, to create related records in the **OrderDetails** table.

### Extracted values with a regular expression

```power-fx
With(
    Match( "PT2H1M39S", "PT(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?" ),
    Time( Value( hours ), Value( minutes ), Value( seconds ) )
)
// Result: 2:01 AM (as shown in a label control, use the Text function to see the seconds)
```

This example extracts the hours, minutes, and seconds from an ISO 8601 duration value and then uses these sub-matches to create a Date/Time value.

Note that although the sub-matches contain numbers they are still in a text string. Use the [**Value**](function-value.md) function to convert to a number before performing mathematical operations.

### Map a record in a component

See [Map record](/power-apps/maker/canvas-apps/map-component-input-fields#map-records).

---

