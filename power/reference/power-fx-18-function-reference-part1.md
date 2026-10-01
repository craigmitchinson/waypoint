# Power Fx — Function Reference, Part 1 of 2 (Abs–HashTags by page order)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 51

## Contents

1. [Abs, Exp, Ln, Power, Log, and Sqrt functions](#abs-exp-ln-power-log-and-sqrt-functions)
2. [Acceleration, App, Compass, Connection, and Location signals in Power Apps](#acceleration-app-compass-connection-and-location-signals-in-power-apps)
3. [Acos, Acot, Asin, Atan, Atan2, Cos, Cot, Degrees, Pi, Radians, Sin, and Tan functions](#acos-acot-asin-atan-atan2-cos-cot-degrees-pi-radians-sin-and-tan-functions)
4. [AddColumns, DropColumns, RenameColumns, and ShowColumns functions](#addcolumns-dropcolumns-renamecolumns-and-showcolumns-functions)
5. [AIClassify, AIExtract, AIReply,AISummarize, AISentiment, and AITranslate functions](#aiclassify-aiextract-aireplyaisummarize-aisentiment-and-aitranslate-functions)
6. [And, Or, and Not functions](#and-or-and-not-functions)
7. [App object in Power Apps](#app-object-in-power-apps)
8. [Operators and Identifiers in Power Apps](#operators-and-identifiers-in-power-apps)
9. [Assert function](#assert-function)
10. [AsType and IsType functions](#astype-and-istype-functions)
11. [Average, Max, Min, StdevP, Sum, and VarP functions](#average-max-min-stdevp-sum-and-varp-functions)
12. [Back and Navigate functions](#back-and-navigate-functions)
13. [Blank, Coalesce, IsBlank, and IsEmpty functions](#blank-coalesce-isblank-and-isempty-functions)
14. [Boolean function](#boolean-function)
15. [Calendar and Clock functions](#calendar-and-clock-functions)
16. [Char and UniChar functions](#char-and-unichar-functions)
17. [Choices function](#choices-function)
18. [Collect, Clear, and ClearCollect functions](#collect-clear-and-clearcollect-functions)
19. [SaveData, LoadData, and ClearData functions](#savedata-loaddata-and-cleardata-functions)
20. [Color enumeration and ColorFade, ColorValue, and RGBA functions](#color-enumeration-and-colorfade-colorvalue-and-rgba-functions)
21. [ColumnNames and Column functions](#columnnames-and-column-functions)
22. [Concat and Concatenate functions](#concat-and-concatenate-functions)
23. [Concurrent function](#concurrent-function)
24. [Confirm function](#confirm-function)
25. [Copy function](#copy-function)
26. [Count, CountA, CountIf, and CountRows functions](#count-counta-countif-and-countrows-functions)
27. [DataSourceInfo function](#datasourceinfo-function)
28. [Date, DateTime, and Time functions](#date-datetime-and-time-functions)
29. [DateAdd, DateDiff, and TimeZoneOffset functions](#dateadd-datediff-and-timezoneoffset-functions)
30. [DateValue, TimeValue, and DateTimeValue functions](#datevalue-timevalue-and-datetimevalue-functions)
31. [Day, Month, Year, Hour, Minute, Second, and Weekday functions](#day-month-year-hour-minute-second-and-weekday-functions)
32. [Hex2Dec and Dec2Hex functions](#hex2dec-and-dec2hex-functions)
33. [Decimal, Float, and Value functions](#decimal-float-and-value-functions)
34. [Defaults function](#defaults-function)
35. [Enable and Disable functions](#enable-and-disable-functions)
36. [Distinct function](#distinct-function)
37. [Download function](#download-function)
38. [EDate and EOMonth functions](#edate-and-eomonth-functions)
39. [EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions](#editform-newform-submitform-resetform-and-viewform-functions)
40. [EncodeHTML, EncodeUrl, and PlainText functions](#encodehtml-encodeurl-and-plaintext-functions)
41. [EndsWith and StartsWith functions](#endswith-and-startswith-functions)
42. [Error, IfError, IsError, and IsBlankOrError functions](#error-iferror-iserror-and-isblankorerror-functions)
43. [Errors function](#errors-function)
44. [Exit function](#exit-function)
45. [Filter, Search, and LookUp functions](#filter-search-and-lookup-functions)
46. [Find function](#find-function)
47. [First, FirstN, Index, Last, and LastN functions](#first-firstn-index-last-and-lastn-functions)
48. [ForAll function](#forall-function)
49. [GroupBy and Ungroup functions](#groupby-and-ungroup-functions)
50. [GUID function](#guid-function)
51. [HashTags function](#hashtags-function)

---

## Abs, Exp, Ln, Power, Log, and Sqrt functions

Source: [function-numericals.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-numericals)

*Reference information including syntax and examples for the Abs, Exp, Ln, Power, and Sqrt functions.*

# Abs, Exp, Ln, Power, Log, and Sqrt functions
| Functions | Applies to |
|-----------|------------|
| **Abs**</br>**Exp**</br>**Ln**</br>**Power**</br>**Sqrt** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **Log** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Calculates absolute values, logarithms, square roots, and the results of raising _e_ or any number to specified powers.

## Description

The **Abs** function returns the non-negative value of its argument. If a number is negative, **Abs** returns the positive equivalent.

The **Exp** function returns _e_ raised to the power of its argument. The transcendental number _e_ begins 2.7182818...

The **Ln** function returns the natural logarithm (base _e_) of its argument.

The **Power** function returns a number raised to a power. It's equivalent to using the [**^** operator](operators.md).

The **Log** function returns the logarithm of its first argument in the base specified by its second argument (or 10 if not specified).

The **Sqrt** function returns the number that, when multiplied by itself, equals its argument.

If you pass a single number, the return value is a single result based on the function called. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains numbers, the return value is a single-column table of results in a **Value** column, one result for each record in the argument's table. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

If an argument would result in an undefined valued, the result is _blank_. Which can happen with square roots and logarithms of negative numbers.

## Syntax

**Abs**( _Number_ )<br>**Exp**( _Number_ )<br>**Ln**( _Number_ )<br>**Sqrt**( _Number_ )

- _Number_ - Required. Number to operate on.

**Power**( _Base_, _Exponent_ )

- _Base_ - Required. Base number to raise.
- _Exponent_ - Required. The exponent to which the base number is raised.

**Log**( _Number_, _Base_ )

- _Number_ - Required. Number to calculate the logarithm.
- _Base_ - Optional. The base of the logarithm to calculate. By default, 10 (when not specified).

**Abs**( _SingleColumnTable_ )<br>**Exp**( _SingleColumnTable_ )<br>**Ln**( _SingleColumnTable_ )<br>**Sqrt**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of numbers to operate on.

## Examples

### Single number

| Formula | Description | Result |
| --- | --- | --- |
| **Abs( -55 )** | Returns the number without the negative sign. | 55 |
| **Exp( 2 )** | Returns _e_ raised to the power of 2, or _e_ \* _e_. | 7.389056... |
| **Ln( 100 )** | Returns the natural logarithm (base _e_) of the number 100. | 4.605170... |
| **Log( 100 )** | Returns the logarithm in base 10 of the number 100. | 2 |
| **Log( 64, 2 )** | Returns the logarithm in base 2 of the number 64. | 6 |
| **Power( 5, 3 )** | Returns 5 raised to the power of 3, or 5 \* 5 \* 5. | 125 |
| **Sqrt( 9 )** | Returns the number that, when multiplied by itself, results in 9. | 3 |

### Single-column table

The examples in this section use a [data source](/power-apps/maker/canvas-apps/working-with-data-sources) that's named **ValueTable** and that contains this data:

| Value |
| --- |
| 9 |
| -4 |
| 2 |

| Formula | Description | Result |
| --- | --- | --- |
| **Abs(&nbsp;ValueTable&nbsp;)** | Returns the absolute value of each number in the table. | A single-column table with a `Value` column containing the following values: 9, 4, 2 |
| **Exp(&nbsp;ValueTable&nbsp;)** | Returns _e_ raised to the power of each number in the table. | A single-column table with a `Value` column containing the following values: 8103.083927..., 0.018315..., 7.389056... |
| **Ln(&nbsp;ValueTable&nbsp;)**   | Returns the natural logarithm of each number in the table. | A single-column table with a `Value` column containing the following values: 2.197224..., Blank(), 0.693147... |
| **Sqrt(&nbsp;ValueTable&nbsp;)** | Returns the square root of each number in the table | A single-column table with a `Value` column containing the following values: 3, Blank(), 1.414213... |

### Step-by-step example

1. Add a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control, and name it **Source**.
2. Add a **Label** control, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:
   <br>
   **Sqrt( Value( Source.Text ) )**
3. Type a number into **Source**, and confirm that the **Label** control shows the square root of the number that you typed.

---

## Acceleration, App, Compass, Connection, and Location signals in Power Apps

Source: [signals.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/signals)

*Reference information including syntax and examples for the Acceleration, App, Compass, Connection, and Location signals in Power Apps.*

# Acceleration, App, Compass, Connection, and Location signals in Power Apps




Returns information about the app's environment, such as where the user is located in the world and which screen is displayed.

## Description and syntax

Signals are values that can change at any time, independent of how the user may be interacting with the app. Formulas that are based on signals automatically recalculate as these values change.

Signals typically return a [record](/power-apps/maker/canvas-apps/working-with-tables#records) of information. You can use and store this information as a record, or you can extract individual properties by using the **.** [operator](operators.md).

> [!NOTE]
> The **Acceleration** and **Compass** functions return accurate values in a native player such as on iOS or Android, but those functions return zero values as you create or modify an app in the browser.

### Acceleration

The **Acceleration** signal returns the device's acceleration in three dimensions relative to the device's screen. Acceleration is measured in _g_ units of 9.81 m/second<sup>2</sup> or 32.2 ft/second<sup>2</sup> (the acceleration that the Earth imparts to objects at its surface due to gravity).

| Property           | Description                                     |
| ------------------ | ----------------------------------------------- |
| **Acceleration.X** | Right and left. Right is a positive number.     |
| **Acceleration.Y** | Forward and back. Forward is a positive number. |
| **Acceleration.Z** | Up and down. Up is a positive number.           |

### App

Among other properties, the **App** object includes a signal that indicates which screen is showing.

| Property             | Description                                                                                                                                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App.ActiveScreen** | Screen that's showing. Returns a screen object, which you can use to reference properties of the screen or compare to another screen to determine which screen is showing. You can use the **[Back](function-navigate.md)** or **[Navigate](function-navigate.md)** function to change the screen that's showing. |

More information: [**App** object](object-app.md) documentation.

### Compass

The **Compass** signal returns the compass heading of the top of the screen. The heading is based on magnetic north.

| Property            | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| **Compass.Heading** | Heading in degrees. Returns a number 0 to 360, and 0 is north. |

### Connection

The **Connection** signal returns the information about the network connection. When on a metered connection, you may want to limit how much data you send or receive over the network. Or, if your app is enabled for offline, you may want to display different information depending on the current sync state.

| Property                 | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Connection.Connected** | Returns a Boolean true or false value that indicates whether the device is connected to either a Wi-Fi or cellular network. Please note that this does not guarantee an active internet connection.|
| **Connection.Metered**   | Returns a Boolean **true** or **false** value that indicates whether the connection is metered.            |
| **Connection.Sync**   | Returns an enum named **ConnectionSync** which holds the current synchronization state for an app that is enabled for offline. 
    
Below are the enums values available for Connection.Sync.

| Enum value                 | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Connected** | Your device is connected to the network and your app is ready to work offline |
| **ConnectedWithWarning**   | Your device is connected with a warning.            |
| **ConnectedPendingUpsync**   | Some data on your device must be synchronized with the service. 
| **ConnectedError**   | There was an error on the last synchronization attempt. 
| **ConnectedRefresh**   | Your app is currently synchronizing data with the service. 
| **NotConnected**   | Your device isn't connected to the service. 
| **NotConnectedWithWarning**   | The last synchronization warning. 
| **NotConnectedPendingUpsync**   | There are updates on your device waiting to be synchronized. 
| **NotConnectedSyncError**   | The last synchronization error. 
    



### Location

The **Location** signal returns the location of the device based on the Global Positioning System (GPS) and other device information, such as cell-tower communications and IP address.

When a user accesses the location information for the first time, the device may prompt that user to allow access to this information.

As the location changes, dependencies on the location will continuously recalculate, which will consume power from the device's battery. To conserve battery life, you can use the **[Enable](function-enable-disable.md)** and **[Disable](function-enable-disable.md)** functions to turn location updates on and off. Location is automatically turned off if the displayed screen doesn't depend on location information.

| Property               | Description                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location.Altitude**  | Returns a number that indicates the altitude, measured in meters, above sea level.                                                                                                  |
| **Location.Latitude**  | Returns a number, from –90 to 90, that indicates the latitude, as measured in degrees from the equator. A positive number indicates a location that's north of the equator.         |
| **Location.Longitude** | Returns a number, from –180 to 180, that indicates the longitude, as measured in degrees from Greenwich, England. A positive number indicates a location that's east of Greenwich. |

## Examples

In a baseball field, a pitcher throws a phone from the pitcher's mound to a catcher at home plate. The phone is lying flat with respect to the ground, the top of the screen is pointed at the catcher, and the pitcher adds no spin. At this location, the phone has cellular network service that's metered but no WiFi. The **PlayBall** screen is displayed.  The app is enabled for offline and is connected to the service.

| Formula                         | Description                                                                                                                                                                                                                                                                                                                                                                                    | Result                                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Location.Latitude**           | Returns the latitude of the current location. The field is located at map coordinates 47.591 N, 122.333 W.                                                                                                                                                                                                                                                                                     | 47.591<br><br>The latitude will change continuously as the ball moves between the pitcher and the catcher.                          |
| **Location.Longitude**          | Returns the longitude of the current location.                                                                                                                                                                                                                                                                                                                                                 | 122.333<br><br>The longitude will change continuously as the ball moves between the pitcher and the catcher.                        |
| **Location**                    | Returns the latitude and longitude of the current location, as a record.                                                                                                                                                                                                                                                                                                                       | {&nbsp;Latitude:&nbsp;47.591, Longitude:&nbsp;122.333&nbsp;}                                                                        |
| **Compass.Heading**             | Returns the compass heading of the top of the screen. At this field, home plate is roughly southwest from the pitcher's mound.                                                                                                                                                                                                                                                                 | 230.25                                                                                                                              |
| **Acceleration.X**              | Returns the acceleration of the device side to side. The pitcher is throwing the phone straight ahead with respect to the screen's top, so the device isn't accelerating side to side.                                                                                                                                                                                                         | 0                                                                                                                                   |
| **Acceleration.Y**              | Returns the acceleration of the device front to back. The pitcher initially gives the device a large acceleration when throwing the device, going from 0 to 90 miles per hour (132 feet per second) in half a second. After the device is in the air, ignoring air friction, the device doesn't accelerate further. The device decelerates when the catcher catches it, bringing it to a stop. | 8.2, while the pitcher throws the device.<br><br>0, while the device is in the air.<br><br>-8.2, as the catcher catches the device. |
| **Acceleration.Z**              | Returns the acceleration of the device top to bottom. While in the air, the device experiences the effects of gravity.                                                                                                                                                                                                                                                                         | 0, before the pitcher throws the device.<br><br>1, while the device is in the air.<br><br>0, after the catcher catches the device.  |
| **Acceleration**                | Returns the acceleration as a record.                                                                                                                                                                                                                                                                                                                                                          | { X: 0, Y: 264, Z: 0 } as the pitcher throws the device.                                                                            |
| **Connection.Connected**        | Returns a Boolean value that indicates whether the device is connected to a network                                                                                                                                                                                                                                                                                                            | **true**                                                                                                                            |
| **Connection.Metered**          | Returns a Boolean value that indicates whether the connection is metered                                                                                                                                                                                                                                                                                                                       | **true**                                                                                                                            |
| **Connection.Sync**          | Returns an enum value that indicates current sync state.                                                                                                                                                                                                                                                                                                                       | **ConnectionSync.Connected**                                                                                                                            |
| **App.ActiveScreen = PlayBall** | Returns a Boolean value that indicates whether **PlayBall** is displayed.                                                                                                                                                                                                                                                                                                                      | **true**                                                                                                                            |
| **App.ActiveScreen.Fill**       | Returns the background color for the displayed screen.                                                                                                                                                                                                                                                                                                                                         | **Color.Green**                                                                                                                     |

---

## Acos, Acot, Asin, Atan, Atan2, Cos, Cot, Degrees, Pi, Radians, Sin, and Tan functions

Source: [function-trig.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-trig)

*Reference information including syntax and examples for the Acos, Acot, Asin, Atan, Atan2, Cos, Cot, Degrees, Pi, Radians, Sin, and Tan functions.*

# Acos, Acot, Asin, Atan, Atan2, Cos, Cot, Degrees, Pi, Radians, Sin, and Tan functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Calculates trigonometric values.

## Description

### Primary functions

The **Cos** function returns the cosine of its argument, an angle specified in radians.

The **Cot** function returns the cotangent of its argument, an angle specified in radians.

The **Sin** function returns the sine of its argument, an angle specified in radians.

The **Tan** function returns the tangent of its argument, an angle specified in radians.

### Inverse functions

The **Acos** function returns the arccosine, or inverse cosine, of its argument. The arccosine is the angle whose cosine is the argument. The returned angle is given in radians in the range 0 (zero) to &pi;.

The **Acot** function returns the principal value of the arccotangent, or inverse cotangent, of its argument. The returned angle is given in radians in the range 0 (zero) to &pi;.

The **Asin** function returns the arcsine, or inverse sine, of its argument. The arcsine is the angle whose sine is the argument. The returned angle is given in radians in the range -&pi;/2 to &pi;/2.

The **Atan** function returns the arctangent, or inverse tangent, of its argument. The arctangent is the angle whose tangent is the argument. The returned angle is given in radians in the range -&pi;/2 to &pi;/2.

The **Atan2** function returns the arctangent, or inverse tangent, of the specified _x_ and _y_ coordinates as arguments. The arctangent is the angle from the _x_-axis to a line that contains the origin (0, 0) and a point with coordinates (_x_, _y_). The angle is given in radians between -&pi; and &pi;, excluding -&pi;. A positive result represents a counterclockwise angle from the _x_-axis; a negative result represents a clockwise angle. **Atan2(&nbsp;_a_,&nbsp;_b_&nbsp;)** equals **Atan(&nbsp;_b_/_a_&nbsp;)**, except that **_a_** can equal 0 (zero) with the **Atan2** function.

### Helper functions

The **Degrees** function converts radians to degrees. &pi; radians equals 180 degrees.

The **Pi** function returns the transcendental number &pi;, which begins 3.141592...

The **Radians** function converts degrees to radians.

### Notes

If you pass a single number to these functions, the return value is a single result. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains numbers, the return value is a single-column table of results with a **Value** column, one result for each record in the argument's table. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

If an argument would result in an undefined value, the result is _blank_. This can happen, for example, when using inverse functions with arguments that are out of range.

## Syntax

### Primary Functions

**Cos**( _Radians_ )<br>**Cot**( _Radians_ )<br>**Sin**( _Radians_ )<br>**Tan**( _Radians_ )

- _Radians_ - Required. Angle to operate on.

**Cos**( _SingleColumnTable_ )<br>**Cot**( _SingleColumnTable_ )<br>**Sin**( _SingleColumnTable_ )<br>**Tan**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of angles to operate on.

### Inverse Functions

**Acos**( _Number_ )<br>**Acot**( _Number_ )<br>**Asin**( _Number_ )<br>**Atan**( _Number_ )

- _Number_ - Required. Number to operate on.

**Acos**( _SingleColumnTable_ )<br>**Acot**( _SingleColumnTable_ )<br>**Asin**( _SingleColumnTable_ )<br>**Atan**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. A single-column table of numbers to operate on.

**Atan2**( _X_, _Y_ )

- _X_ - Required. _X_-axis coordinate.
- _Y_ - Required. _Y_-axis coordinate.

### Helper Functions

**Degrees**( _Radians_ )

- _Radians_ - Required. Angle in radians to convert to degrees.

**Pi**()

**Radians**( _Degrees_ )

- _Degrees_ - Required. Angle in degrees to convert to radians.

## Examples

### Single number

| Formula | Description | Result |
| --- | --- | --- |
| **Cos(&nbsp;1.047197&nbsp;)** | Returns the cosine of 1.047197 radians or 60 degrees. | 0.5 |
| **Cot(&nbsp;Pi()/4&nbsp;)** | Returns the cotangent of 0.785398... radians or 45 degrees. | 1 |
| **Sin(&nbsp;Pi()/2&nbsp;)** | Returns the sine of 1.570796... radians or 90 degrees. | 1 |
| **Tan(&nbsp;Radians(60)&nbsp;)** | Returns the tangent of 1.047197... radians or 60 degrees. | 1.732050... |
| **Acos(&nbsp;0.5&nbsp;)** | Returns the arccosine of 0.5, in radians. | 1.047197... |
| **Acot(&nbsp;1&nbsp;)** | Returns the arccotangent of 1, in radians. | 0.785398... |
| **Asin(&nbsp;1&nbsp;)** | Returns the arcsine of 1, in radians. | 1.570796... |
| **Atan(&nbsp;1.732050&nbsp;)** | Returns the arctangent of 1.732050, in radians. | 1.047197... |
| **Atan2(&nbsp;5,&nbsp;3&nbsp;)** | Returns the arctangent of the angle from the _x_-axis of the line that contains the origin (0,0) and the coordinate (5,3), which is approximately 31 degrees. | 0.540419... |
| **Atan2(&nbsp;4,&nbsp;4&nbsp;)** | Returns the arctangent of the angle from the _x_-axis of the line that contains the origin (0,0) and the coordinate (4,4), which is exactly &pi;/4 radians or 45 degrees. | 0.785398... |
| **Degrees(&nbsp;1.047197&nbsp;)** | Returns the equivalent number of degrees for 1.047197 radians. | 60 |
| **Pi()** | Returns the transcendental number &pi;. | 3.141592... |
| **Radians(&nbsp;15&nbsp;)** | Returns the equivalent number of radians for 15 degrees. | 0.261799... |

### Single-column table

The examples in this section use a [data source](/power-apps/maker/canvas-apps/working-with-data-sources) that's named **ValueTable** and that contains the following data. The last record in the table is &pi;/2 radians or 90 degrees.

| Value |
| --- |
| 0.5 |
| -2 |
| 1.570796... |

| Formula | Description | Result |
| --- | --- | --- |
| **Cos(&nbsp;ValueTable&nbsp;)** | Returns the cosine of each number in the table. | A single-column table with a `Value` column containing the following values: 0.877582..., -0.416146..., 0 |
| **Cot(&nbsp;ValueTable&nbsp;)** | Returns the cotangent of each number in the table. | A single-column table with a `Value` column containing the following values: 1.830487..., 0.457657..., 0 |
| **Sin(&nbsp;ValueTable&nbsp;)** | Returns the sine of each number in the table. | A single-column table with a `Value` column containing the following values: 0.479425, -0.909297..., 1 |
| **Tan(&nbsp;ValueTable&nbsp;)** | Returns the tangent of each number in the table. | A single-column table with a `Value` column containing the following values: 0.546302..., 2.185039..., 3060023.306952... |
| **Acos(&nbsp;ValueTable&nbsp;)** | Returns the arccosine of each number in the table. | A single-column table with a `Value` column containing the following values: 1.047197..., Blank(), Blank() |
| **Acot(&nbsp;ValueTable&nbsp;)** | Returns the arccotangent of each number in the table. | A single-column table with a `Value` column containing the following values: 1.107138..., 2.677945..., 0.566911... |
| **Asin(&nbsp;ValueTable&nbsp;)** | Returns the arcsine of each number in the table. | A single-column table with a `Value` column containing the following values: 0.523598..., Blank(), Blank() |
| **Atan(&nbsp;ValueTable&nbsp;)** | Returns the arctangent of each number in the table. | A single-column table with a `Value` column containing the following values: 0.463647..., -1.107148..., 1.00388... |
| **Degrees(&nbsp;ValueTable&nbsp;)** | Returns the equivalent number of degrees for each number in the table, assumed to be angles in radians. | A single-column table with a `Value` column containing the following values: 28.647889..., -114.591559..., 90 |
| **Radians(&nbsp;ValueTable&nbsp;)** | Returns the equivalent number of radians for each number in the table, assumed to be angles in degrees. | A single-column table with a `Value` column containing the following values: 0.008726..., -0.034906..., 0.027415... |

---

## AddColumns, DropColumns, RenameColumns, and ShowColumns functions

Source: [function-table-shaping.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-shaping)

*Reference information including syntax and examples for the AddColumns, DropColumns, RenameColumns, and ShowColumns functions.*

# AddColumns, DropColumns, RenameColumns, and ShowColumns functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Shapes a [table or record](/power-apps/maker/canvas-apps/working-with-tables) by adding, dropping, renaming, and selecting its [columns](/power-apps/maker/canvas-apps/working-with-tables#columns).

The [ForAll](function-forall.md) function can also be used to shape a table, by returning a table of new records created from existing columns.

## Overview

These functions shape a table or record by adjusting its columns:

- Reduce a table or record that contains multiple columns down to a single column for use with single-column functions, such as **[Lower](function-lower-upper-proper.md)** or **[Sqrt](function-numericals.md)**.
- Add a calculated column to a table or record (for example, a **Total Price** column that shows the results of multiplying **Quantity** by **Unit Price**).
- Rename a column to something more meaningful, for display to users or for use in formulas.

A table is a value in Power Apps, just like a string or a number. You can specify a table as an argument in a formula, and functions can return a table as a result.

> [!NOTE]
> The functions that this topic describes don't modify the original table. Instead, they take that table as an argument and return a new table with a transform applied. For more information, see [working with tables](/power-apps/maker/canvas-apps/working-with-tables).

You can't modify the columns of a [data source](/power-apps/maker/canvas-apps/working-with-data-sources) by using these functions. You must modify the data at its source. You can add columns to a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) with the **[Collect](function-clear-collect-clearcollect.md)** function. For more information, see [working with data sources](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

The **AddColumns** function adds a column to a table or record, and a formula defines the values in that column. Existing columns remain unmodified.

The formula is evaluated for the provided record, or for each record of the provided table.
Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

The **DropColumns** function excludes columns from a table or record. All other columns remain unmodified. **DropColumns** excludes columns, and **ShowColumns** includes columns.

Use the **RenameColumns** function to rename one or more columns of a table or record by providing at least one argument pair that specifies the name of a column that the table or record contains (the old name, which you want to replace) and the name of a column that the table or record doesn't contain (the new name, which you want to use). The old name must already exist in the table or record, and the new name must not exist. Each column name may appear only once in the argument list as either an old column name or a new column name. To rename a column to an existing column name, first drop the existing column with **DropColumns**, or rename the existing column out of the way by nesting one **RenameColumns** function within another.

The **ShowColumns** function includes columns of a table or record and drops all other columns. You can use **ShowColumns** to create a single-column table or record from a multi-column table or record. **ShowColumns** includes columns, and **DropColumns** excludes columns.

For all these functions, the result is a new table or record with the transform applied. The original table or record isn't modified. You can't modify an existing table or record with a formula. SharePoint, Microsoft Dataverse, SQL Server, and other data sources provide tools for modifying the columns of lists and tables, which are often referred to as the schema. The functions in this topic only transform an input table or record, without modifying the original, into an output table or record for further use.

The arguments to these functions support delegation. For example, a **Filter** function used as an argument to pull in related records searches through all listings, even if the **'[dbo].[AllListings]'** data source contains a million rows:

```power-fx
AddColumns( RealEstateAgents,
   Listings,
   Filter(  '[dbo].[AllListings]', ListingAgentName = AgentName )
)
```

However, the output of these functions is subject to the [non-delegation record limit](/power-apps/maker/canvas-apps/delegation-overview#non-delegable-limits). In this example, only 500 records are returned even if the **RealEstateAgents** data source has 501 or more records.

If you use **AddColumns** in this manner, **Filter** must make separate calls to the data source for each of those first records in **RealEstateAgents**, which causes lots of network chatter. If **[dbo](.[AllListings]** is small enough and doesn't change often. You can call the **Collect** function in [**OnStart**](signals.md#app) to cache the data source in your app when it starts. As an alternative, you could restructure your app so that you pull in the related records only when the user asks for them.

> [!NOTE]
> In Power Apps prior to version 3.24042, column names were specified with a text string using double quotes, and if connected to a data source they also needed to be logical names. For example, the logical name **"cr43e_name"** with double quotes was used instead of the display name **Name** without quotes. For SharePoint and Excel data sources that contain column names with spaces, each space was specified with **"\_x0020\_"**, for example **"Column Name"** as **"Column_x0020_Name"**. After this version, all apps were automatically updated to the new syntax described in this article. 

## Syntax

**AddColumns**( _TableOrRecord_, _ColumnName1_, _Formula1_ [, *ColumnName2*, *Formula2*, ... ] )

- _TableOrRecord_ - Required. Table or record to operate on.
- _ColumnName(s)_ - Required. Names of the columns to add. 
- _Formula(s)_ - Required. Formulas to evaluate for each record. The result is added as the value of the corresponding new column. You can reference other columns of the table or record in this formula.

**DropColumns**( _TableOrRecord_, _ColumnName1_ [, *ColumnName2*, ... ] )

- _TableOrRecord_ - Required. Table or record to operate on.
- _ColumnName(s)_ - Required. Names of the columns to drop. 

**RenameColumns**( _TableOrRecord_, _OldColumnName1_, _NewColumnName1_ [, *OldColumnName2*, *NewColumnName2*, ... ] )

- _TableOrRecord_ - Required. Table or record to operate on.
- _OldColumnName(s)_ - Required. Names of the columns to rename from the original table or record. This element appears first in the argument pair (or first in each argument pair if the formula includes more than one pair).
- _NewColumnName(s)_ - Required. Replacement names. This element appears last in the argument pair (or last in each argument pair if the formula includes more than one pair). 

**ShowColumns**( _TableOrRecord_, _ColumnName1_ [, *ColumnName2*, ... ] )

- _TableOrRecord_ - Required. Table or record to operate on.
- _ColumnName(s)_ - Required. Names of the columns to include. 

## Examples

The examples in this section use the **IceCreamSales** data source, which contains the data in this table:

![IceCream example.](media/function-table-shaping/icecream.png)

None of these examples modify the **IceCreamSales** data source. Each function transforms the value of the data source as a table and returns that value as the result.

| Formula                                                                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                 | Result                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **AddColumns( IceCreamSales, Revenue, UnitPrice \* QuantitySold )**                                                                                  | Adds a **Revenue** column to the result. For each record, **UnitPrice \* QuantitySold** is evaluated, and the result is placed in the new column.                                                                                                                                                                                                                                           | ![Result with Srawberry, Chocolate and Vanilla.](media/function-table-shaping/icecream-add-revenue.png)                              |
| **DropColumns( IceCreamSales, UnitPrice )**                                                                                                          | Excludes the **UnitPrice** column from the result. Use this function to exclude columns, and use **ShowColumns** to include them.                                                                                                                                                                                                                                                           | ![Result with Strawberry, Chocolate, Vanilla having only QuantitySold column.](media/function-table-shaping/icecream-drop-price.png) |
| **ShowColumns( IceCreamSales, Flavor )**                                                                                                             | Includes only the **Flavor** column in the result. Use this function include columns, and use **DropColumns** to exclude them.                                                                                                                                                                                                                                                              | ![Only Flavor column.](media/function-table-shaping/icecream-select-flavor.png)                                                      |
| **RenameColumns( IceCreamSales, UnitPrice, Price)**                                                                                                | Renames the **UnitPrice** column in the result.                                                                                                                                                                                                                                                                                                                                             | ![Result with Flavor, Price and Revenue.](media/function-table-shaping/icecream-rename-price.png)                                    |
| **RenameColumns( IceCreamSales, UnitPrice, Price, QuantitySold, Number)**                                                                      | Renames the **UnitPrice** and **QuantitySold** columns in the result.                                                                                                                                                                                                                                                                                                                       | ![Result with 3 IceCreams and columns as Flavor, Price, Revenue.](media/function-table-shaping/icecream-rename-price-quant.png)      |
| **DropColumns(<br>RenameColumns(<br>AddColumns( IceCreamSales, Revenue,<br>UnitPrice \* QuantitySold ),<br>UnitPrice, Price ),<br>Quantity )** | Performs the following table transforms in order, starting from the inside of the formula: <ol><li>Adds a **Revenue** column based on the per record calculation of **UnitPrice \* Quantity**.<li>Renames **UnitPrice** to **Price**.<li>Excludes the **Quantity** column.</ol> Order is important, for example we can't calculate with **UnitPrice** after it's renamed. | ![IceCream example for unit price.](media/function-table-shaping/icecream-all-transforms.png)                                        |

### Step by step

Let's try some of the examples from earlier in this article.

1. Create a collection by adding a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control and setting its **OnSelect** property to this formula:

   ```power-fx
   ClearCollect( IceCreamSales,
      Table(
          { Flavor: "Strawberry", UnitPrice: 1.99, QuantitySold: 20 },
          { Flavor: "Chocolate", UnitPrice: 2.99, QuantitySold: 45 },
          { Flavor: "Vanilla", UnitPrice: 1.50, QuantitySold: 35 }
      )
   )
   ```

1. Run the formula by selecting the button while holding down the Alt key.

1. Add a second **Button** control, set its **OnSelect** property to this formula, and then run it:

   ```power-fx
   ClearCollect( FirstExample,
      AddColumns( IceCreamSales, Revenue, UnitPrice * QuantitySold )
   )
   ```

1. On the **File** menu, select **Collections**, and then select **IceCreamSales** to show that collection.

   As this graphic shows, the second formula didn't modify this collection. The **AddColumns** function used **IceCreamSales** as a read-only argument; the function didn't modify the table to which that argument refers.

   ![Collection viewer showing three records of the Ice Cream Sales collection that doesn't include a Revenue column.](media/function-table-shaping/ice-cream-sales-collection.png)

1. Select **FirstExample**.

   As this graphic shows, the second formula returned a new table with the added column. The **ClearCollect** function captured the new table in the **FirstExample** collection, adding something to the original table as it flowed through the function without modifying the source:

   ![Collection viewer showing three records of the First Example collection that includes a new Revenue column.](media/function-table-shaping/first-example-collection.png)

### Map columns in a component

See [Map columns](/power-apps/maker/canvas-apps/map-component-input-fields#map-columns).

---

## AIClassify, AIExtract, AIReply,AISummarize, AISentiment, and AITranslate functions

Source: [function-ai.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ai)

*Reference information including syntax and examples for the AIClassify, AIExtract, AIReply, AISummarize, AISentiment, and AITranslate functions.*

# AIClassify, AIExtract, AIReply, AISentiment, AISummarize, AISummarizeRecord, and AITranslate
**Applies to:** 
- ✓ Canvas apps
- ✓ Dataverse functions



## Description

Dataverse provides various ready-to-use AI functions that are preconfigured and don't require any data collection, building, or training. You can use these prebuilt AI functions in your app and workflows to improve functionality and streamline processes. The AI functions work with canvas apps, AI Builder, and low-code plugins so can easily integrate them into your solutions.

- **AIClassify** classifies text into one of the provided categories. For example, the following list of categories can be used to classify issues submitted by your customers:

    - Problem
    - Billing
    - How To
    - Licensing

- **AIExtract** extracts specified entities such as registration numbers, phone numbers, or names of people.
  > [!NOTE]
  > The AIExtract function is still in development and might not operate properly. We remove this note when it's ready to use.
- **AIReply** drafts a reply to the message that you provide. For example, this function drafts a reply to a customer's review of a product.
- **AISentiment** detects the sentiment of the text that you provide. For example, this function detects whether the sentiment of a customer review is positive, negative, or neutral.
- **AISummarize** summarizes the text that you provide. For example, this function summarizes an email message or text from a document.
- - **AISummarizeRecord** summarizes the information in a record. For example, this function summarizes a customer's information based on a record in the Customers table.
- **AITranslate** translates text from another language. For example, this function translates a customer email or product review. The source language doesn't need to be specified, and is automatically detected.

    For more information about languages supported for the source and target language, see [Translator language support—Translation](/azure/ai-services/translator/language-support) and review the list of supported languages under the **Auto Language Detection** column. 

Learn more about how to use AI functions in the following video.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=f8308ee0-9bf6-45a4-a940-e0b49a41354f]

## Prerequisites
For more information on prerequisites, see [Requirements and licensing for prebuilt prompts](/ai-builder/prebuilt-prompts#prerequisites).

## Use in canvas apps

You can call these functions from canvas apps. However, it's a little more complicated than described for other Power Fx hosts:
1. You need to add the **Environment** data source.
1. The AI functions are functions in the **Environment** namespace. Where this documentation describes calling **AISummarize( ... )**, for example, you need to use **Environment.AISummarize( ... )**.
1. Arguments to the function must be named columns in a record, passed as the only argument. The names of the columns are given in the **Syntax** section matching the names of the parameters.
1. The return value from these functions is always a record containing one column. The name of the column is listed in the *Syntax* section.
1. These functions are [behavior functions](/power-apps/maker/canvas-apps/working-with-formulas-in-depth) and can't be used in Canvas data flow, for example as the input to the **Text** property of a **Text** control. Use the [**Set**](function-set.md) function to place the result in a global variable, and then use that value elsewhere in your app.

Here's an example:

1. Open a canvas app for editing in [Power Apps Studio](/power-apps/maker/canvas-apps/power-apps-studio).
1. From the Data pane, select **Add data** and then add the **Environment** data source.
1. From the Insert pane, add a **Button** control.
1. In the formula bar, select the **OnSelect** property and enter the following formula:
   ```power-fx
   Set( Summary, Environment.AISummarize( {Text: "2, 4, 6, 8, 10, 12, 14, 16"} ).SummarizedText )
   ```
1. From the Insert pane, add a **Text** control.
1. In the formula bar, select the **Text** property and enter the following formula:
   ```power-fx
   Summary
   ```
1. The text box displays an AI generated summary similar to:
   ```
   The given text is a sequence of even numbers from 2 to 16, increasing by 2 each time.
   ```

> [!NOTE]
> We are in the process of adding the same function signatures that other Power Fx hosts enjoy to canvas. The new signatures augment and not replace the current mechanism; apps using the current mechanism will continue to work without modification.

## Syntax

**AIClassify**( _Text_, _Categories_ )
- *Text* - Required. A text sentences. The text to classify.
- _Categories_ - Required. Single column of table of text categories.
- Canvas apps - The return value is in the _Classification_ column.

**AIExtract**( _Text_, _Entity_ )
- _Text_ - Required. A text sentences. The text to extract the data from.
- _Entity_ - Required. The entity to extract. The name of entity to extract.
- Canvas apps - The return value is in the _ExtractedData_ column, a table of zero or more rows of data matching the provided entity.

**AIReply**( _Text_ )
- _Text_ - Required. A text sentence. The text to respond to.
- Canvas apps - The return value is in the _PreparedResponse_ column. 

**AISentiment**( _Text_ )
- _Text_ - Required. The text to analyze for sentiment.
- Canvas apps - The return value is in the _AnalyzedSentiment_ column and is "Positive," "Neutral," or "Negative".

**AISummarize**( _Text_ )
- _Text_ - Required. The text to summarize.
- Canvas apps - The return value is in the _SummarizedText_ column.

**AISummarizeRecord**( _Entity_ )
- _Entity_ - Required. The Dataverse record to summarize.
- Canvas apps - The return value is in the _SummarizedText_ column.

**AITranslate**( _Text_, _TargetLanguage_ )
- _Text_ - Required. The text to translate.
- _TargetLanguage_ - The language tag to translate into such as "fr" for French. See the [**Language** function](./function-language.md) for more details.
- Canvas apps - The return value is in the _TranslatedText_ column.

## Examples

To set up the following examples:
1. In the Tree view, select the **App** object and add the following to the **Formulas** property:
   ```power-fx
   Subject = "Washington is a state that offers a variety of food experiences for locals and visitors alike. 
   Whether you are looking for fresh seafood, farm-to-table produce, ethnic specialties, or gourmet treats, 
   you will find something to satisfy your taste buds in Washington. Washington is famous for its seafood, 
   especially salmon, oysters, crab, and clams. The state has a long coastline and numerous rivers and lakes 
   that provide abundant and high-quality seafood.";
   ```
1. Create a **Button** control.
1. Create a **Text** control and set its **Text** property to:
   ```power-fx
   Result
   ```

### AIClassify

1. In Canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AIClassify( {Text:Subject, Categories: ["Housing", "Food"]} ).Classification )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AIClassify( Subject, ["Housing", "Food"] ) )
   ```
1. Press the button. The **Text** control displays the result:
   ```
   Food
   ```

### AIExtract

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AIExtract( {Text:Subject, Entity: "State"} ).ExtractedText )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AIExtract( Subject, "State" ) )
   ```
1. Press the button. The **Text** control displays the result.

### AIReply

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AIReply( {Text:Subject} ).PreparedResponse )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AIReply( Subject ) )
   ```
1. Press the button. The **Text** control displays a result similar to:
   ```
   Washington state is indeed a culinary delight, offering a diverse range of food experiences
   for both residents and tourists. From fresh seafood to farm-to-table produce, ethnic specialties
   to gourmet treats, there is something to please every palate in Washington. The state is
   particularly renowned for its seafood, with salmon, oysters, crab, and clams being local favorites.
   This is due to Washington's extensive coastline and numerous rivers and lakes, which provide an
   abundance of high-quality seafood. If you have any specific questions or need recommendations
   for dining in Washington, feel free to ask!
   ```

### AISummarize

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AISummarize( {Text:Subject} ).SummarizedText )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AISummarize( Subject ) )
   ```
1. Press the button. The **Text** control displays a result similar to:
   ```
   Washington state is known for its diverse food experiences, catering to both locals and visitors.
   From fresh seafood to farm-to-table produce, ethnic specialties, and gourmet treats, there is
   something to please everyone's taste buds. Seafood, particularly salmon, oysters, crab, and clams,
   is a highlight in Washington. With its extensive coastline, rivers, and lakes, the state offers
   an abundance of high-quality seafood options.
   ```

### AISummarizeRecord

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AISummarizeRecord( First(Accounts) ).SummarizedText )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AISummarizeRecord( First(Accounts) ) )
   ```
1. Press the button. The **Text** control displays a result similar to:
   ```
   The record provided was created on July 2, 2024, at 17:24:32 in the selected time zone. 
   The account number for this record is ACC0001, associated with the company
   [USMF](pagetype=entityrecord&etn=cdm_company&id=bdcdb6ff-7[204-4345](tel:2044345)-b46f-9545195385fd).
   The record was last modified on July 2, 2024, at 17:24:32 in the selected time zone.


### AISentiment

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AISentiment( {Text:Subject} ).AnalyzedSentiment )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AISentiment( Subject ) )
   ```
1. Press the button. The **Text** control displays the result:
   ```
   Positive
   ```

### AITranslate

1. In canvas apps, set the **OnSelect** property of the **Button** control to:
   ```power-fx
   Set( Result, Environment.AITranslate( {Text:Subject, TargetLanguage: "fr"} ).TranslatedText )
   ```
   For all other products, use this formula:
   ```power-fx
   Set( Result, AITranslate( Subject, "fr" ) )
   ```
1. Press the button. The **Text** control displays a result similar to:
   ```
   Washington est un État qui offre une variété d’expériences culinaires pour les habitants et les visiteurs. 
   Que vous soyez à la recherche de fruits de mer frais, de produits de la ferme à la table,
   de spécialités ethniques ou de friandises gastronomiques, vous trouverez de quoi satisfaire vos
   papilles à Washington. Washington est célèbre pour ses fruits de mer, en particulier le saumon, les huîtres,
   le crabe et les palourdes. L’État possède un long littoral et de nombreuses rivières et lacs 
   qui fournissent des fruits de mer abondants et de haute qualité.
   ```

---

## And, Or, and Not functions

Source: [function-logicals.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-logicals)

*Reference information including syntax and examples for the And, Or, and Not functions.*

# And, Or, and Not functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Boolean logic functions, commonly used to manipulate the results of comparisons and tests.

## Description

The **And** function returns **true** if all of its arguments are **true**.

The **Or** function returns **true** if any of its arguments are **true**.

The **Not** function returns **true** if its argument is **false**; it returns **false** if its argument is **true**.

These functions work the same way as they do in Excel. You can also use [operators](operators.md) to perform these same operations, using either Visual Basic or JavaScript syntax:

| Function notation | Visual Basic operator notation | JavaScript operator notation |
| ----------------- | ------------------------------ | ---------------------------- |
| **And( x, y )**   | **x And y**                    | **x && y**                   |
| **Or( x, y )**    | **x Or y**                     | **x &#124;&#124; y**         |
| **Not( x )**      | **Not x**                      | **! x**                      |

These functions work with logical values. You can't pass them a number or a string directly; instead, you must make a comparison or a test. For example, this logical formula **x > 1** evaluates to the Boolean value **true** if **x** is greater than **1**. If **x** is less than **1**, the formula evaluates to **false**.

## Syntax

**And**( _LogicalFormula1_, _LogicalFormula2_ [, *LogicalFormula3*, ... ] )<br>
**Or**( _LogicalFormula1_, _LogicalFormula2_ [, *LogicalFormula3*, ... ] )<br>
**Not**( _LogicalFormula_ )

- _LogicalFormula(s)_ - Required. Logical formulas to evaluate and operate on.

## Examples

The examples in this section use these global variables:

- **a** = _false_
- **b** = _true_
- **x** = 10
- **y** = 100
- **s** = "Hello World"

To create these global variables in an app, insert a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control, and set its **OnSelect** property to this formula:

```power-fx
Set( a, false ); Set( b, true ); Set( x, 10 ); Set( y, 100 ); Set( s, "Hello World" )
```

Select the button (by clicking it while you hold down the Alt key), and then set the **Text** property of a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control to a formula in the first column of the next table.

| Formula                                                                                     | Description                                                                                                                                                                                                                         | Result  |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **And( a, b )**                                                                             | Tests the values of **a** and **b**. One of the arguments is _false_, so the function returns _false_.                                                                                                                              | _false_ |
| **a And b**                                                                                 | Same as the previous example, using Visual Basic notation.                                                                                                                                                                          | _false_ |
| **a && b**                                                                                  | Same as the previous example, using JavaScript notation.                                                                                                                                                                            | _false_ |
| **Or( a, b )**                                                                              | Tests the values of **a** and **b**. One of the arguments is _true_, so the function returns _true_.                                                                                                                                | _true_  |
| **a Or b**                                                                                  | Same as the previous example, using Visual Basic notation.                                                                                                                                                                          | _true_  |
| **a &#124;&#124; b**                                                                        | Same as the previous example, using JavaScript notation.                                                                                                                                                                            | _true_  |
| **Not( a )**                                                                                | Tests the value of **a**. The argument is _false_, so the function returns the opposite result.                                                                                                                                     | _true_  |
| **Not a**                                                                                   | Same as the previous example, using Visual Basic notation.                                                                                                                                                                          | _true_  |
| **! a**                                                                                     | Same as the previous example, using JavaScript notation.                                                                                                                                                                            | _true_  |
| **Len(&nbsp;s&nbsp;)&nbsp;<&nbsp;20 And&nbsp;Not&nbsp;IsBlank(&nbsp;s&nbsp;)**              | Tests whether the length of **s** is less than 20 and whether it isn't a **blank** value. The length is less than 20, and the value isn't blank. Therefore, the result is _true_.                                                   | _true_  |
| **Or(&nbsp;Len(&nbsp;s&nbsp;)&nbsp;<&nbsp;10, x&nbsp;<&nbsp;100, y&nbsp;<&nbsp;100&nbsp;)** | Tests whether the length of **s** is less than 10, whether **x** is less than 100, and whether **y** is less than 100. The first and third arguments are false, but the second one is true. Therefore, the function returns _true_. | _true_  |
| **Not IsBlank(&nbsp;s&nbsp;)**                                                              | Tests whether **s** is _blank_, which returns _false_. **Not** returns the opposite of this result, which is _true_.                                                                                                                | _true_  |

---

## App object in Power Apps

Source: [object-app.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/object-app)

*Reference information including syntax and examples for the App object in Power Apps.*

# App object in Power Apps
**Applies to:** 
- ✓ Canvas apps

Get information about the currently running app and control the app's behavior.

## Description

Like a control, the **App** object has properties that identify which screen is showing and prompt you to save changes so you don't lose them. Every app has an **App** object.

Write formulas for some properties of the **App** object. At the top of the **Tree view** pane, select the **App** object as you would any other control or screen. To view or edit one of the object's properties, select it in the drop-down list to the left of the formula bar.

> [!div class="mx-imgBorder"]
> ![Screenshot of the App object selected in the Tree view pane. The properties pane is visible.](media/object-app/appobject.png)

This article covers the following **App** object properties:

- [ActiveScreen](#activescreen-property) – the screen that's currently displayed.
- [BackEnabled](#backenabled-property) – how the app responds to the device back gesture.
- [ConfirmExit and ConfirmExitMessage](#confirmexit-properties) – warn the user before closing the app.
- [Connection string](#connection-string-property) – set up Application Insights logging.
- [Formulas](#formulas-property) – define named formulas, user defined functions, and user defined types.
- [OnError](#onerror-property) – handle errors globally.
- [OnStart](#onstart-property) – run logic when the app starts.
- [StartScreen](#startscreen-property) – set the screen shown first when the app loads.
- [StudioVersion](#studioversion-property) – return the Power Apps Studio version that published the app.

## ActiveScreen property

The **ActiveScreen** property identifies the screen that's currently displayed.

This property returns a screen object. Use it to reference properties of the current screen, such as the name with the formula **App.ActiveScreen.Name**. You can also compare this property to another screen object, like with the comparison formula **App.ActiveScreen = Screen2** to check if **Screen2** is the current screen.

Use the **[Back](function-navigate.md)** or **[Navigate](function-navigate.md)** function to switch the screen that's displayed.

## BackEnabled property

The **BackEnabled** property changes how the app responds to the device back gesture (swipe or use the hardware back button on Android devices, or swipe from the left on iOS devices) when running in [Power Apps mobile](/power-apps/mobile/run-powerapps-on-mobile). When enabled, the device back gesture goes back to the screen that was most recently shown, which is similar to the [**Back**](function-navigate.md#back) formula. When disabled, the device back gesture takes the user to the app list. 

## ConfirmExit properties

Nobody wants to lose unsaved changes. Use the **ConfirmExit** and **ConfirmExitMessage** properties to warn the user before closing your app.

> [!NOTE]
> - **ConfirmExit** doesn't work in apps embedded in, for example, Power BI and SharePoint.
> - **ConfirmExit** isn't supported in custom pages. 
> - Now, these properties can reference controls only on the first screen if the **Delayed load** preview feature is enabled (which it is by default for new apps). If you reference other screens, Power Apps Studio doesn't show an error, but the published app doesn't open in Power Apps Mobile or a browser. Microsoft is working to lift this limitation. In the meantime, turn off **Delayed load** in **Settings** > **Upcoming features** (under **Preview**).

### ConfirmExit

**ConfirmExit** is a Boolean property that, when *true*, opens a confirmation dialog box before the app closes. By default, this property is *false*, and no dialog box appears.

When the user might have unsaved changes in the app, use this property to show a confirmation dialog box before exiting the app. Use a formula that checks variables and control properties (for example, the **Unsaved** property of the [**Edit form**](/power-apps/maker/canvas-apps/controls/control-form-detail) control).

The confirmation dialog box appears in any situation where data can be lost, such as:

- Run the [**Exit**](function-exit.md) function.
- If the app runs in a browser:
  - Close the browser or the browser tab where the app runs.
  - Select the browser's back button.
  - Run the [**Launch**](function-param.md#launch) function with a *LaunchTarget* of **Self**.
- If the app runs in Power Apps Mobile (iOS or Android):
  - Swipe to switch to a different app in Power Apps Mobile.
  - Select the back button on an Android device.
  - Run the [**Launch**](function-param.md#launch) function to launch another canvas app.

The exact look of the confirmation dialog box can vary across devices and versions of Power Apps.

The confirmation dialog box doesn't show in Power Apps Studio.

### ConfirmExitMessage

By default, the confirmation dialog box shows a generic message, such as **"You may have unsaved changes."** in the user's language.

Use **ConfirmExitMessage** to provide a custom message in the confirmation dialog box. If this property is *blank*, the default value is used. Custom messages are truncated as needed to fit within the confirmation dialog box, so keep the message to a few lines at most.

In a browser, the confirmation dialog box can show a generic message from the browser.

### Example

1. Set the **App** object's **ConfirmExit** property to this expression:

    ```power-fx
    AccountForm.Unsaved Or ContactForm.Unsaved
    ```

    The dialog box appears if the user changes data in either form and then tries to close the app without saving those changes.

    > [!div class="mx-imgBorder"]
    > ![Generic confirmation dialog box.](media/object-app/confirm-native.png)

1. Set the **App** object's **ConfirmExitMessage** property to this formula:

    ```power-fx
    If( AccountForm.Unsaved,
        "Accounts form has unsaved changes.",
        "Contacts form has unsaved changes."
    )
    ```

    The dialog box shows a form-specific message when the user changes data in either form and then tries to close the app without saving those changes.

    > [!div class="mx-imgBorder"]
    > ![Form-specific confirmation dialog box.](media/object-app/confirm-native-custom.png)

## Connection string property

Use the **Connection string** property to export system-generated application logs to [Application Insights](/power-apps/maker/canvas-apps/application-insights).

To set the connection string:

1. Open your app for [editing](/power-apps/maker/canvas-apps/edit-app) in Power Apps Studio.
1. Select the **App** object in the left navigation tree view.
1. Enter the **Connection string** in the properties pane.

If data isn't sent to Application Insights, contact your Power Platform admin and check whether Application Insights is disabled at the tenant level.

## Formulas property

Use the **Formulas** property to define reusable logic across your app. The **Formulas** property supports three constructs:

- [Named formulas](#formulas-property) – assign a name to a formula and reuse the value throughout the app.
- [User defined functions](#user-defined-functions) – named formulas that take parameters and return a value.
- [User defined types](#user-defined-types) – named types you can reuse in formulas and function signatures.

### Named formulas

Use named formulas in the **Formulas** property to define a formula that you can reuse throughout your app.

In Power Apps, formulas determine the value of control properties. For example, to set the background color consistently across an app, set the **Fill** property for each control to a common formula:

```power-fx
Label1.Fill: ColorValue( Param( "BackgroundColor" ) )
Label2.Fill: ColorValue( Param( "BackgroundColor" ) )
Label3.Fill: ColorValue( Param( "BackgroundColor" ) )
```

With so many places where this formula appears, it becomes tedious and error prone to update them all if a change is needed. Instead, create a global variable in **OnStart** to set the color once, and then reuse the value throughout the app:

```power-fx
App.OnStart: Set( BGColor, ColorValue( Param( "BackgroundColor" ) ) )
Label1.Fill: BGColor
Label2.Fill: BGColor
Label3.Fill: BGColor
```

While this method is better, it also depends on **OnStart** running before the value for **BGColor** is established. **BGColor** might also be manipulated in some corner of the app that the maker is unaware of, a change made by someone else, and that can be hard to track down.

Named formulas provide an alternative. Just as you commonly write *control-property = expression*, you can instead write *name = expression* and then reuse *name* throughout your app to replace *expression*. Define these formulas in the **Formulas** property:

```power-fx
App.Formulas: BGColor = ColorValue( Param( "BackgroundColor" ) );
Label1.Fill: BGColor
Label2.Fill: BGColor
Label3.Fill: BGColor
```

The advantages of using named formulas include:

- **The formula's value is always available.** There's no timing dependency, no **OnStart** that must run first before the value is set, no time in which the formula's value is incorrect. Named formulas can refer to each other in any order, so long as they don't create a circular reference. They can be calculated in parallel. 
- **The formula's value is always up to date.** The formula can perform a calculation that is dependent on control properties or database records, and as they change, the formula's value automatically updates. You don't need to manually update the value as you do with a variable. And formulas only recalculate when needed.
- **The formula's definition is immutable.** The definition in **Formulas** is the single source of truth and the value can't be changed somewhere else in the app. With variables, some code might unexpectedly change a value, but this hard-to-debug situation isn't possible with named formulas.
- **The formula's calculation can be deferred.** Because its value is immutable, it can always be calculated when needed, which means it need not be calculated until it's needed. Formula values that aren't used until **screen2** of an app is displayed need not be calculated until **screen2** is visible. Deferring this work can improve app load time. Named formulas are declarative and provide opportunities for the system to optimize how and when they're computed.
- **Named formulas is an Excel concept.** Power Fx uses Excel concepts where possible since so many people know Excel well. Named formulas are the equivalent of named cells and named formulas in Excel, managed with the Name Manager. They recalculate automatically like cells of a spreadsheet and control properties do.

Define named formulas one after another in the **Formulas** property, each ending with a semicolon. The type of the formula is inferred from the types of the elements within the formula and how they're used together. For example, these named formulas retrieve useful information about the current user from Dataverse:

```power-fx
UserEmail = User().Email;
UserInfo = LookUp( Users, 'Primary Email' = User().Email );
UserTitle = UserInfo.Title;
UserPhone = Switch( UserInfo.'Preferred Phone', 
                    'Preferred Phone (Users)'.'Mobile Phone', UserInfo.'Mobile Phone',
                    UserInfo.'Main Phone' );
```

If the formula for **UserTitle** needs to be updated, you can easily update it in this one location. If **UserPhone** isn't needed in the app, then these calls to the **Users** table in Dataverse aren't made. There's no penalty for including a formula definition that isn't used.

Some limitations of named formulas:
- They can't use behavior functions or otherwise cause side effects within the app. 
- They can't create a circular reference. Having **a = b;** and **b = a;** in the same app isn't allowed.

## User-defined functions

Power Fx includes a long list of built-in functions, such as **If**, **Text**, and **Set**. By using user-defined functions, you can write your own functions that take parameters and return a value, just like the built-in functions. Think of user-defined functions as an extension to named formulas that adds parameters and supports behavior formulas.

For example, you might define a named formula that returns fiction books from a library:

```powerapps-dot
Library = [ { Title: "The Hobbit", Author: "J. R. R. Tolkien", Genre: "Fiction" },
            { Title: "Oxford English Dictionary", Author: "Oxford University", Genre: "Reference" } ];

LibraryFiction = Filter( Library, Genre = "Fiction" );
```

Without parameters, you need to define separate named formulas for each genre. But instead, parameterize your named formula:

```powerapps-dot
LibraryType := Type( [ { Title: Text, Author: Text, Genre: Text } ] );

LibraryGenre( SelectedGenre: Text ): LibraryType = Filter( Library, Genre = SelectedGenre );
```

Now you can call `LibraryGenre( "Fiction" )`, `LibraryGenre( "Reference" )`, or filter on other genres by using a single user-defined function.

The syntax is:

**FunctionName**( [ *ParameterName1*: *ParameterType1* [ , *ParameterName2*: *ParameterType2* ... ] ] ) : *ReturnType* = *Formula*;

- *FunctionName* – Required. The name of the user-defined function.
- *ParameterName(s)* – Optional. The name of a function parameter.
- *ParameterType(s)* – Optional. The name of a type, either a built-in [data type name](../data-types.md), a data source name, or a type defined by using the **Type** function.
- *ReturnType* – Required. The type of the return value from the function.
- *Formula* – Required. The formula that calculates the value of the function based on the parameters.

You must type each parameter and the output from the user-defined function. In this example, `SelectedGenre: Text` defines the first parameter to the function to be of type **Text** and `SelectedGenre` is the name of the parameter that is used in the body for the [**Filter** operation](function-filter-lookup.md). See [**Data types**](../data-types.md) for the supported type names. The [**Type** function](function-type.md) is used to create an aggregate type for the library, so that you can return a table of books from the function.

You define `LibraryType` as a plural table of records type. If you want to pass a single book to a function, you can extract the type of the record for this table by using the [**RecordOf** function](function-type.md):

```powerapps-dot
BookType := Type( RecordOf( LibraryType ) );

IsGenre( Book: BookType, SelectedGenre: Text ): Boolean = (Book.Genre = SelectedGenre);
```

Record matching for function parameters is tighter than it is in other parts of Power Fx. The fields of a record value must be a proper subset of the type definition and can't include extra fields. For example, `IsGenre( { Title: "My Book", Published: 2001 }, "Fiction" )` results in an error.

Recursion isn't yet supported by user-defined functions.

### Behavior user defined functions


Named formulas and most user defined functions don't support behavior functions with side effects, such as [**Set**](function-set.md) or [**Notify**](function-showerror.md). In general, avoid updating state if you can. Instead, rely on functional programming patterns and allow Power Fx to recalculate formulas as needed automatically. But, there are cases where it's unavoidable. To include behavior logic in a user defined function, wrap the body in curly braces:

```powerapps-dot
Spend( Amount: Number ) : Void = {
    If( Amount > Savings, 
        Error( $"{Amount} is more than available savings" ),
        Set( Savings, Savings - Amount );
        Set( Spent, Spent + Amount) 
    );
}
```

Now you can call `Spend( 12 )` to check if you have 12 in your Savings, and if so, debit it by 12 and add 12 to the Spent variable. The return type of this function is **Void** as it doesn't return a value.

The syntax of a behavior user defined function is:

**FunctionName**( [ *ParameterName1*: *ParameterType1* [ , *ParameterName2*: *ParameterType2* ... ] ] ) : *ReturnType* = { *Formula1* [ ; *Formula2* ... ] };

- *FunctionName* – Required. The name of the user-defined function.
- *ParameterName(s)* – Optional. The name of a function parameter.
- *ParameterType(s)* – Optional. The name of a type, either a built-in [data type name](../data-types.md), a data source name, or a type defined with the [**Type** function](function-type.md).
- *ReturnType* – Required. The type of the return value from the function. Use **Void** if the function doesn't return a value.
- *Formula(s)* – Required. The formula that calculates the value of the function based on the parameters.

As with all Power Fx formulas, execution doesn't end when an error is encountered. After the [**Error** function](function-iferror.md) is called, the [**If** function](function-if.md) prevents the changes to **Savings** and **Spent** from happening. The [**IfError** function](function-iferror.md) can also be used to prevent further execution after an error. Even though it returns **Void**, the formula can still return an error if there's a problem. 

## User defined types

Use named formulas with the [**Type**](function-type.md) function to create user defined types. Use `:=` instead of `=` to define a user defined type, for example `Book := Type( { Title: Text, Author: Text } )`. See the [**Type** function](function-type.md) for more information and examples.

## OnError property

Use **OnError** to take action when an error happens anywhere in the app. It provides a global opportunity to intercept an error banner before it's displayed to the end user. You can also use it to log an error by using the [**Trace** function](function-trace.md) or write to a database or web service.

In Canvas apps, the result of every formula evaluation is checked for an error. If an error is encountered, **OnError** is evaluated with the same **FirstError** and **AllErrors** scope variables that the app uses if the entire formula is wrapped in an [**IfError** function](function-iferror.md).

If **OnError** is empty, a default error banner shows the **FirstError.Message** of the error. Defining an **OnError** formula overrides this behavior, so the maker can handle error reporting as needed. You can request the default behavior in **OnError** by rethrowing the error by using the [**Error** function](function-iferror.md). Use the rethrowing approach if you want to filter out or handle some errors differently, but let others pass through.

**OnError** can't replace an error in calculations the way that **IfError** can. If **OnError** is invoked, the error already happened and is already processed through formula calculations like **IfError**; **OnError** controls error reporting only.

**OnError** formulas are evaluated concurrently and it's possible that their evaluation might overlap with the processing of other errors. For example, if you set a global variable at the top of an **OnError** and read it later on in the same formula, the value might have changed. Use the [**With** function](function-with.md) to create a named value that is local to the formula.

Although **OnError** processes each error individually, the default error banner might not appear for each error individually. To avoid having too many error banners displayed at the same time, the same error banner isn't displayed again if it was recently shown.

### Example

Consider a **Label** control and **Slider** control that are bound together through the formula:

```power-fx
Label1.Text = 1/Slider1.Value
```

:::image type="content" source="media/object-app/onerror-noerror.png" alt-text="Label and slider control bound through the formula Label1.Text = 1/Slider1.Value.":::

The slider defaults to 50. If you move the slider to 0, **Label1** shows no value, and an error banner appears:

:::image type="content" source="media/object-app/onerror-div0.png" alt-text="Slider control moved to 0, resulting in a division by zero error, and an error banner.":::

Let's look at what happens in detail:

1. You move the slider to the left and the **Slider1.Value** property changes to 0.
1. **Label1.Text** automatically reevaluates. Division by zero occurs, generating an error.
1. There's no **IfError** in this formula. The division by zero error is returned by the formula evaluation.
1. **Label1.Text** can't show anything for this error, so it shows a *blank* state.
1. **OnError** is invoked. Since there's no handler, the standard error banner is displayed with error information.

If needed, you can also change the formula to `Label1.Text = IfError( 1/Slider1.Value, 0 )`. Using **IfError** means there's no error or error banner. You can't change the value of an error from **OnError** because the error already happened - **OnError** only controls how it's reported.

If you add an **OnError** handler, it doesn't affect steps before step 5, but it does change how the error is reported:

```power-fx
Trace( $"Error {FirstError.Message} in {FirstError.Source}" )
```

:::image type="content" source="media/object-app/onerror-trace-formula.png" alt-text="App.OnError formula set to generate a Trace.":::

With this **OnError** handler, the app user doesn't see any error. But the error is added to the Monitor's trace, including the source of the error information from **FirstError**:

:::image type="content" source="media/object-app/onerror-trace.png" alt-text="Slider control moved to 0, resulting in a division by zero error, but no error banner.":::

If you also want to show the default error banner along with the trace, rethrow the error by using the **Error** function after the **Trace** call, as if the **Trace** wasn't there:

```power-fx
Trace( $"Error {FirstError.Message} in {FirstError.Source}" );
Error( FirstError )
```

## OnStart property

> [!NOTE]
> Using the **OnStart** property can cause performance problems when loading an app. Consider these alternatives before adding logic to **OnStart**:
>
> - To cache data or set up global variables, use a [named formula](#formulas-property) in the **Formulas** property where possible.
> - To set the first screen to show, use the [**StartScreen**](#startscreen-property) property instead of [**Navigate**](function-navigate.md).
> - To run logic when a specific screen is shown, use the screen's **OnVisible** property.
>
> Depending on your context, the **OnStart** property might be disabled by default. If you don't see it and need to use it, check the app's Advanced settings for a switch to enable it.
>
> When the nonblocking **OnStart** rule is enabled (the default), **OnStart** runs at the same time as other app rules. As a result:
>
> - Variables initialized in **OnStart** might not be fully initialized when other app rules read them.
> - A screen can render and become interactive before **App.OnStart** or **Screen.OnVisible** finishes running, especially if those functions take a long time.

The **OnStart** property runs when the user starts the app. Use this property to:

- Retrieve and cache data in collections by using the **[Collect](function-clear-collect-clearcollect.md)** function.
- Set up global variables by using the **[Set](function-set.md)** function.

This formula runs before the first screen appears. No screen is loaded, so you can't set context variables with the **[UpdateContext](function-updatecontext.md)** function. But you can pass context variables with the **Navigate** function.

After you change the **OnStart** property, test it by hovering over the **App** object in the **Tree view** pane, selecting the ellipsis (...), and then selecting **Run OnStart**. Unlike when the app loads for the first time, existing collections and variables are already set. To start with empty collections, use the **[ClearCollect](function-clear-collect-clearcollect.md)** function instead of the **Collect** function.

> [!div class="mx-imgBorder"]
> ![App-item shortcut menu for Run OnStart](media/object-app/appobject-runonstart.png "App-item shortcut menu for Run OnStart")

> [!NOTE]
> - Using the [**Navigate**](function-navigate.md) function in the **OnStart** property is retired. Existing apps still work. For a limited time, you can enable it in the app settings (under **Retired**). But using **Navigate** this way can cause app load delays because it forces the system to finish running **OnStart** before showing the first screen. Use the **StartScreen** property instead to set the first screen displayed.
> - The retired switch is off for apps created before March 2021 where you added **Navigate** to **OnStart** between March 2021 and now. When you edit these apps in Power Apps Studio, you see an error. Turn the retired switch on to clear this error.

## StartScreen property

The **StartScreen** property sets which screen shows first. Power Apps evaluates this property once when the app loads and returns the screen object to show. By default, this property is empty, and the first screen in the Studio Tree view shows first.

**StartScreen** is a data flow property that can't contain behavior functions. All data flow functions are available. Use these functions and signals to decide which screen to show first:

- [**Param**](function-param.md) function to read parameters used to start the app.
- [**User**](function-user.md) function to read information about the current user.
- [**LookUp**](function-filter-lookup.md), [**Filter**](function-filter-lookup.md), [**CountRows**](function-table-counts.md), [**Max**](function-aggregates.md), and other functions that read from a data source.
- API calls through a connector. Make sure the call returns quickly.
- Signals such as [**Connection**](signals.md#connection), [**Compass**](signals.md#compass), and **App**.

> [!NOTE]
> Global variables and collections, including those created in **OnStart**, aren't available in **StartScreen**. Named formulas are available and are often a better alternative for formula reuse across the app.

If **StartScreen** returns an error, the first screen in the Studio Tree view shows as if **StartScreen** isn't set. Use the **IfError** function to catch any errors and redirect to an error screen.

After you change **StartScreen** in Studio, test it by hovering over the **App** object in the **Tree view** pane, selecting the ellipsis (...), and then selecting **Navigate to StartScreen**. The screen changes as if the app just loaded.

> [!div class="mx-imgBorder"]
> ![Navigate to StartScreen](media/object-app/appobject-runstartscreen.png "Navigate to StartScreen")

### Examples

```power-fx
Screen9
```
`Screen9` shows first whenever the app starts.

```power-fx
If( Param( "admin-mode" ) = 1, HomeScreen, AdminScreen )
```
Checks if the Param "admin-mode" is set and uses it to decide if HomeScreen or AdminScreen shows first.

```power-fx
If( LookUp( Attendees, User = User().Email ).Staff, StaffPortal, HomeScreen )
```
Checks if an attendee is a staff member and directs them to the correct screen on startup.

```power-fx
IfError( If( CustomConnector.APICall() = "Forest", 
             ForestScreen, 
             OceanScreen 
         ), 
         ErrorScreen 
)
```
Directs the app based on an API call to either `ForestScreen` or `OceanScreen`. If the API fails, the app uses `ErrorScreen` instead.

## StudioVersion property

Use the **StudioVersion** property to show or log the version of Power Apps Studio used to publish an app. This property helps when you're debugging and checking that your app is republished with a recent version of Power Apps Studio.

**StudioVersion** returns text. The format of this text can change over time, so treat it as a whole and don't extract individual parts.

---

## Operators and Identifiers in Power Apps

Source: [operators.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/operators)

*Reference information including syntax and examples for the Operators and Identifiers in Power Apps.*

# Operators and Identifiers in Power Apps
| Functions | Applies to |
|-----------|------------|
| **Operators**</br>**Identifiers** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **ThisItem**</br>**Self**</br>**Parent** | 
- ✓ Canvas apps |



Some of these operators are dependent on the language of the author. For more information about language support in canvas apps, see [Global apps](/power-apps/maker/canvas-apps/global-apps).

| Symbol                                                                        | Type                                                        | Example                                                                                          | Description                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **'**...**'**                                                                 | [Identifier](#identifier-names)                             | **'Account Name'**                                                                               | Identifiers that contain special characters, including spaces, are enclosed in single quotes                                                                                                                                                                                                             |
| **"**...**"**                                                                 | [Text string](../data-types.md#text-hyperlink-image-and-media) | **"Hello, World"**                                                                               | Text strings are enclosed in double quotes                                                                                                                                                                                                                                                               |
| **$"**...**"**                                                                | [String interpolation](../data-types.md#string-interpolation)  | **$"Dear {FirstName},"**                                                                         | Formulas embedded within a text string                                                                                                                                                                                                                                                                   |
| **.**                                                                         | Property Selector                                           | **Slider1.Value<br>Color.Red<br>Acceleration.X**                                                 | Extracts a property from a [table](/power-apps/maker/canvas-apps/working-with-tables), control, [signal](signals.md), or enumeration. For backward compatibility, **!** may also be used.                                                                                                                |
| **.**<br>[[language dependent](/power-apps/maker/canvas-apps/global-apps)]    | Decimal separator                                           | **1.23**                                                                                         | Separator between whole and fractional parts of a number. The character depends on the language.                                                                                                                                                                                                         |
| **( )**                                                                       | Parentheses                                                 | **Filter(T, A &lt; 10)**<br><br>**(1 + 2) \* 3**                                                 | Enforces precedence order, and groups subexpressions in a larger expression                                                                                                                                                                                                                              |
| **+**                                                                         | Arithmetic operators                                        | **1 + 2**                                                                                        | Addition                                                                                                                                                                                                                                                                                                 |
| **-**                                                                         | &nbsp;                                                      | **2 - 1**                                                                                        | Subtraction and sign                                                                                                                                                                                                                                                                                     |
| \*                                                                            | &nbsp;                                                      | **2 \* 3**                                                                                       | Multiplication                                                                                                                                                                                                                                                                                           |
| **/**                                                                         | &nbsp;                                                      | **2 / 3**                                                                                        | Division (also see the **[Mod](function-mod.md)** function)                                                                                                                                                                                                                                              |
| **^**                                                                         | &nbsp;                                                      | **2 ^ 3**                                                                                        | Exponentiation, equivalent to the **[Power](function-numericals.md)** function                                                                                                                                                                                                                           |
| **%**                                                                         | &nbsp;                                                      | **20%**                                                                                          | Percentage (equivalent to &quot;\* 1/100&quot;)                                                                                                                                                                                                                                                          |
| **=**                                                                         | Comparison operators                                        | **Price = 100**                                                                                  | Equal to                                                                                                                                                                                                                                                                                                 |
| **&gt;**                                                                      | &nbsp;                                                      | **Price &gt; 100**                                                                               | Greater than                                                                                                                                                                                                                                                                                             |
| **&gt;=**                                                                     | &nbsp;                                                      | **Price &gt;= 100**                                                                              | Greater than or equal to                                                                                                                                                                                                                                                                                 |
| **&lt;**                                                                      | &nbsp;                                                      | **Price &lt; 100**                                                                               | Less than                                                                                                                                                                                                                                                                                                |
| **&lt;=**                                                                     | &nbsp;                                                      | **Price &lt;= 100**                                                                              | Less than or equal to                                                                                                                                                                                                                                                                                    |
| **&lt;&gt;**                                                                  | &nbsp;                                                      | **Price &lt;&gt; 100**                                                                           | Not equal to                                                                                                                                                                                                                                                                                             |
| **&amp;**                                                                     | String concatenation operator                               | **&quot;hello&quot; &amp; &quot; &quot; &amp; &quot;world&quot;**                                | Makes multiple strings appear continuous                                                                                                                                                                                                                                                                 |
| **&amp;&amp;** or **And**                                                     | Logical operators                                           | **Price &lt; 100 &amp;&amp; Slider1.Value = 20**<br>or **Price &lt; 100 And Slider1.Value = 20** | Logical conjunction, equivalent to the **[And](function-logicals.md)** function                                                                                                                                                                                                                          |
| **&#124;&#124;** or **Or**                                                    | &nbsp;                                                      | **Price &lt; 100 &#124;&#124; Slider1.Value = 20** or **Price &lt; 100 Or Slider1.Value = 20**   | Logical disjunction, equivalent to the **[Or](function-logicals.md)** function                                                                                                                                                                                                                           |
| **!** or **Not**                                                              | &nbsp;                                                      | **!(Price &lt; 100)** or **Not (Price &lt; 100)**                                                | Logical negation, equivalent to the **[Not](function-logicals.md)** function                                                                                                                                                                                                                             |
| **exactin**                                                                   | [Membership operators](#in-and-exactin-operators)           | **Gallery1.Selected exactin SavedItems**                                                         | Belonging to a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) or a table                                                                                                                                                                                              |
| **exactin**                                                                   | &nbsp;                                                      | **&quot;Windows&quot; exactin “To display windows in the Windows operating system...”**          | Substring test (case-sensitive)                                                                                                                                                                                                                                                                          |
| **in**                                                                        | &nbsp;                                                      | **Gallery1.Selected in SavedItems**                                                              | Belonging to a collection or a table                                                                                                                                                                                                                                                                     |
| **in**                                                                        | &nbsp;                                                      | **&quot;The&quot; in &quot;The keyboard and the monitor...&quot;**                               | Substring test (case-insensitive)                                                                                                                                                                                                                                                                        |
| **@**                                                                         | [Disambiguation operator](#disambiguation-operator)         | **MyTable[@fieldname]**                                                                          | Field disambiguation                                                                                                                                                                                                                                                                                     |
| **@**                                                                         | &nbsp;                                                      | **[@MyVariable]**                                                                                | Global disambiguation                                                                                                                                                                                                                                                                                    |
| **,**<br>[[language dependent](/power-apps/maker/canvas-apps/global-apps)] | List separator                                              | **If( X < 10, "Low", "Good" )**<br>**{ X: 12, Y: 32 }**<br>**[ 1, 2, 3 ]**                       | Separates: <ul><li>arguments in function calls</li><li>fields in a [record](/power-apps/maker/canvas-apps/working-with-tables#elements-of-a-table)</li><li>records in a [table](/power-apps/maker/canvas-apps/working-with-tables#inline-value-tables)</li></ul> This character depends on the language. |
| **;**<br>[[language dependent](/power-apps/maker/canvas-apps/global-apps)]    | Formula chaining                                            | **Collect(T, A); Navigate(S1, &quot;&quot;)**                                                    | Separate invocations of functions in behavior properties. The chaining operator depends on the language.                                                                                                                                                                                                 |
| **As**                                                                        | [As operator](#as-operator)                                 | **AllCustomers As Customer**                                                                     | Overrides **ThisItem** and **ThisRecord** in galleries and record scope functions. **As** is useful for providing a better, specific name and is especially important in nested scenarios.                                                                                                               |
| **Self**                                                                      | [Self operator](#self-and-parent-operators)                 | **Self.Fill**                                                                                    | Access to properties of the current control                                                                                                                                                                                                                                                              |
| **Parent**                                                                    | [Parent operator](#self-and-parent-operators)               | **Parent.Fill**                                                                                  | Access to properties of a control container                                                                                                                                                                                                                                                              |
| **ThisItem**                                                                  | [ThisItem operator](#thisitem-operator)                     | **ThisItem.FirstName**                                                                           | Access to fields of a Gallery or form control                                                                                                                                                                                                                                                            |
| **ThisRecord**                                                                | [ThisRecord operator](#thisrecord-operator)                 | **ThisRecord.FirstName**                                                                         | Access to the complete record and individual fields of the record within **ForAll**, **Sum**, **With**, and other record scope functions. Can be overridden with the **As** operator.                                                                                                                    |

> [!NOTE]
> The **@** operator can also be used to validate the type of the record object against a data source. For example, `Collect(coll,Account@{'Account Number': 1111})`

## in and exactin operators

Use the **[in](operators.md#in-and-exactin-operators)** and **[exactin](operators.md#in-and-exactin-operators)** operators to find a string in a [data source](/power-apps/maker/canvas-apps/working-with-data-sources), such as a collection or an imported table. The **[in](operators.md#in-and-exactin-operators)** operator identifies matches regardless of case, and the **[exactin](operators.md#in-and-exactin-operators)** operator identifies matches only if they're capitalized the same way. Here's an example:

1. Create or import a collection named **Inventory**, and show it in a gallery, as the first procedure in [Show images and text in a gallery](/power-apps/maker/canvas-apps/show-images-text-gallery-sort-filter) describes.
2. Set the **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property of the gallery to this formula:
   <br>**Filter(Inventory, "E" in ProductName)**

   The gallery shows all products except Callisto because the name of that product is the only one that doesn't contain the letter you specified.

3. Change the **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property of the gallery to this formula:
   <br>**Filter(Inventory, "E" exactin ProductName)**

   The gallery shows only Europa because only its name contains the letter that you specified in the case that you specified.

## ThisItem, ThisRecord, and As operators

A few controls and functions apply formulas to individual records of a table. To refer to the individual record in a formula, use one of the following:

| Operator       | Applies to                                                                                                                                                                                                                                                                                 | Description                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ThisItem**   | **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)**&nbsp;control<br>**[Edit&nbsp;form](/power-apps/maker/canvas-apps/controls/control-form-detail)**&nbsp;control<br>**[Display&nbsp;form](/power-apps/maker/canvas-apps/controls/control-form-detail)**&nbsp;control | The default name for the current record in a **Gallery** or form control.                                                                                                       |
| **ThisRecord** | **[ForAll](function-forall.md)**, **[Filter](function-filter-lookup.md)**, **[With](function-with.md)**, **[Sum](function-aggregates.md)** and other [record scope](/power-apps/maker/canvas-apps/working-with-tables#record-scope) functions                                              | The default name for the current record in **ForAll** and other record scope functions.                                                                                         |
| **As** _name_  | **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)**&nbsp;control<br>**[ForAll](function-forall.md)**, **[Filter](function-filter-lookup.md)**, **[With](function-with.md)**, **[Sum](function-aggregates.md)** and other record scope functions                          | Defines a _name_ for the current record, replacing default **ThisItem** or **ThisRecord**. Use **As** to make formulas easier to understand and resolve ambiguity when nesting. |

### ThisItem operator

For example, in the following **Gallery** control, the **Items** property is set to the **Employees** data source (such as the **Employees** table included with the [Northwind Traders sample](/power-apps/maker/canvas-apps/northwind-orders-canvas-overview)):

```power-fx
Employees
```

> [!div class="mx-imgBorder"]  
> ![Employees shown in a gallery.](media/operators/as-gallery-items.png)

The first item in the gallery is a template that is replicated for each employee. In the template, the formula for the picture uses **ThisItem** to refer to the current item:

```power-fx
ThisItem.Picture
```

> [!div class="mx-imgBorder"]  
> ![Formula for the picture of an employee.](media/operators/as-gallery-picture.png)

Likewise, the formula for the name also uses **ThisItem**:

```power-fx
ThisItem.'First Name' & " " & ThisItem.'Last Name'
```

> [!div class="mx-imgBorder"]  
> ![Formula for the first and last name of an employee.](media/operators/as-gallery-name.png)

### ThisRecord operator

**ThisRecord** is used in functions that have a [record scope](/power-apps/maker/canvas-apps/working-with-tables#record-scope). For example, we can use the **Filter** function with our gallery's **Items** property to only show first names that being with _M_:

```power-fx
Filter( Employees, StartsWith( ThisRecord.Employee.'First Name', "M" ) )
```

> [!div class="mx-imgBorder"]  
> ![Filtering the employees based on name, using ThisRecord.](media/operators/as-gallery-filter-thisrecord.png)

**ThisRecord** is optional and implied by using the fields directly, for example, in this case, we could have written:

```power-fx
Filter( Employees, StartsWith( 'First Name', "M" ) )
```

Although optional, using **ThisRecord** can make formulas easier to understand and may be required in ambiguous situations where a field name may also be a relationship name. **ThisRecord** is optional while **ThisItem** is always required.

Use **ThisRecord** to reference the whole record with **Patch**, **Collect**, and other record scope functions. For example, the following formula sets the status for all inactive employees to active:

```power-fx
With( { InactiveEmployees: Filter( Employees, Status = 'Status (Employees)'.Inactive ) },
      ForAll( InactiveEmployees,
              Patch( Employees, ThisRecord, { Status: 'Status (Employees)'.Active } ) ) )
```

### As operator

Use the **As** operator to name a record in a gallery or record scope function, overriding the default **ThisItem** or **ThisRecord**. Naming the record can make your formulas easier to understand and may be required in nested situations to access records in other scopes.

For example, you can modify the **Items** property of our gallery to use **As** to identify that we are working with an Employee:

```power-fx
Employees As Employee
```

> [!div class="mx-imgBorder"]  
> ![Gallery of employees, using the As operator.](media/operators/as-gallery-filter-as-employee.png)

The formulas for the picture and name are adjusted to use this name for the current record:

```power-fx
Employee.Picture
```

> [!div class="mx-imgBorder"]  
> ![Picture of an employee using the Employee name set with the As operator.](media/operators/as-gallery-as-picture.png)

```power-fx
Employee.'First Name' & " " & Employee.'Last Name'
```

> [!div class="mx-imgBorder"]  
> ![First and last name of an employee using the Employee name set with the As operator.](media/operators/as-gallery-as-name.png)

**As** can also be used with record scope functions to replace the default name **ThisRecord**. We can apply this to our previous example to clarify the record we're working with:

```power-fx
With( { InactiveEmployees: Filter( Employees, Status = 'Status (Employees)'.Inactive ) },
      ForAll( InactiveEmployees As Employee,
              Patch( Employees, Employee, { Status: 'Status (Employees)'.Active } ) ) )
```

When nesting galleries and record scope functions, **ThisItem** and **ThisRecord** always refers to the inner most scope, leaving records in outer scopes unavailable. Use **As** to make all record scopes available by giving each a unique name.

For example, this formula produces a chessboard pattern as a text string by nesting two **ForAll** functions:

```power-fx
Concat(
    ForAll( Sequence(8) As Rank,
        Concat(
            ForAll( Sequence(8) As File,
                    If( Mod(Rank.Value + File.Value, 2) = 1, " X ", " . " )
            ),
            Value
        ) & Char(10)
    ),
    Value
)
```

Setting a **Label** control's **Text** property to this formula displays:

> [!div class="mx-imgBorder"]  
> ![Chessboard text shown in a label control.](media/operators/as-forall-nesting.png)

Let's unpack what is happening here:

- We start by iterating an unnamed table of 8 numbered records from the [**Sequence**](function-sequence.md) function. This loop is for each row of the board, which is commonly referred to as **Rank** and so we give it this name.
- For each row, we iterate another unnamed table of 8 columns, and we give the common name **File**.
- If **Rank.Value + File.Value** is an odd number, the square gets an **X**, otherwise a dot. This part of the formula is referencing both **ForAll** loops, made possible by using the **As** operator.
- [**Concat**](function-concatenate.md) is used twice, first to assemble the columns and then the rows, with a [**Char(10)**](function-char.md) thrown in to create a new line.

A similar example is possible with nested **Gallery** controls instead of **ForAll** functions. Let's start with the vertical gallery for the **Rank**. This gallery control will have an **Items** formula of:

```power-fx
Sequence(8) as Rank
```

> [!div class="mx-imgBorder"]  
> ![Illustration of the outer gallery that provides the Rank iteration.](media/operators/as-chessboard-rank.png)

Within this gallery, we'll place a horizontal gallery for the **File**, that will be replicated for each **Rank**, with an **Items** property of:

```power-fx
Sequence(8) as File
```

> [!div class="mx-imgBorder"]  
> ![Illustration of the inner gallery that provides the File iteration.](media/operators/as-chessboard-file.png)

And finally, within this gallery, we'll add a **Label** control that will be replicated for each **File** and each **Rank**. We'll size it to fill the entire space and use the **Fill** property to provide the color with this formula:

```power-fx
If( Mod( Rank.Value + File.Value, 2 ) = 1, Green, Beige )
```

> [!div class="mx-imgBorder"]  
> ![Label control within the two galleries that provides the alternating colors for the chessboard.](media/operators/as-chessboard-fill.png)

## Self and Parent operators

There are three ways to refer to a control and its properties within a formula:

| Method              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| By control name     | Any control can be referenced by name from anywhere within the app.<br><br>For example, **Label1.Fill** refers to the fill property of the control who's name is **Label1**.                                                                                                                                                                                                                                                                                                                                                |
| **Self** operator   | It's often convenient to reference another property of the same control when writing a formula. Instead of using an absolute reference by name, it's easier and more portable to use a relative reference to one*self*. The **Self** operator provides that easy access to the current control.<br><br>For example, **Self.Fill** refers to the fill color of the current control.                                                                                                                                          |
| **Parent** operator | Some controls host other controls, such as the **[Screen](/power-apps/maker/canvas-apps/controls/control-screen)** and **[Gallery](/power-apps/maker/canvas-apps/controls/control-gallery)** controls. The hosting control of the controls within it's called the _parent_. Like the **Self** operator, the **Parent** operator provides an easy relative reference to the container control.<br><br>For example, **Parent.Fill** refers to the fill property of the control that is the container for the current control. |

**Self** and **Parent** are operators and not properties on the controls themselves. Referring to **Parent.Parent**, **Self.Parent** or **Parent.Self** is not supported.

## Identifier names

The names of variables, data sources, columns, and other objects can contain any [Unicode](https://en.wikipedia.org/wiki/Unicode).

Use single quotes around a name that contains a space or other special character.  
Use two single quotes together to represent one single quote in the name. Names that don't contain special characters don't require single quotes.

Here are some example column names you might encounter in a table, and how they're represented in a formula:

| Column name in a database | Column reference in a formula   |
| ------------------------- | ------------------------------- |
| SimpleName                | `SimpleName`                    |
| NameWith123Numbers        | `NameWith123Numbers`            |
| Name with spaces          | `'Name with spaces'`            |
| Name with "double" quotes | `'Name with "double" quotes'`   |
| Name with 'single' quotes | `'Name with ''single'' quotes'` |
| Name with an @ at sign    | `'Name with an @ at sign'`      |

Double quotes are used to [designate text strings](../data-types.md#embedded-text).

## Display names and logical names

Some data sources such as SharePoint and Microsoft Dataverse have two different names to refer to the same table or column of data:

- **Logical name** - A name that is guaranteed to be unique, doesn't change after being created, usually doesn't allow spaces or other special characters, and isn't localized into different languages. As a result, the name can be cryptic. These names are used by professional developers. For example, **cra3a_customfield**. This name may also be referred to as **schema name** or just **name**.

- **Display name** - A name that is user-friendly and intended to be seen by end users. This name may not be unique, may change over time, may contain spaces and any Unicode character, and may be localized into different languages. Corresponding to the example above, the display name may be **Custom Field** with space in between the words.

Since display names are easier to understand, Canvas apps will suggest them as choices and not suggest logical names. Although logical names aren't suggested, they can still be used if typed indirectly.

For example, imagine you've added a **Custom Field** to a table in Dataverse. A logical name will be assigned for you by the system, which you can modify only when creating the field. The result would look similar to:

> [!div class="mx-imgBorder"]  
> ![Accounts table with Custom Field added, showing a display name of "Custom Field" and a logical name of "cr5e3_customfield."](media/operators/customfield_portal.png)

When authoring a reference to a field of Accounts, the suggestion will be made to use **'Custom Field'** since this is the display name. Single quotes must be used because this name has a space in it:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing suggestions for field names of Accounts with the display name 'Custom Field' highlighted.](media/operators/customfield_suggest_display.png)

After selecting the suggestion, 'Custom Field' is shown in the formula bar and the data is retrieved:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the display name 'Custom Field' for the field.](media/operators/customfield_display.png)

Although it isn't suggested, we could also use the logical name for this field. This will result in the same data being retrieved. Single quotes are not required since this name doesn't contain spaces or special characters:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the logical name cr5e3_customfield for the field.](media/operators/customfield_logical.png)

Behind the scenes, a mapping is maintained between the display names seen in formulas and the underlying logical names. Since logical names must be used to interact with the data source, this mapping is used to convert from the current display name to the logical name automatically and that is what is seen in the network traffic. This mapping is also used to convert back to logical names to switch into new display names, for example, if a display name changes or a maker in a different language edits the app.

> [!NOTE]
> Logical names are not translated when moving an app between environments. For Dataverse system table and field names, this should not be a problem as logical names are consistent across environments. But any custom fields, such as **cra3a_customfield** in this example above, may have a different environment prefix (**cra3a** in this case). Display names are preferred as they can be matched against display names in the new environment.

## Name disambiguation

Since display names aren't unique, the same display name may appear more than once in the same table. When this happens, the logical name will be added to the end of the display name in parentheses for one of more of the conflicting names. Building on the example above, if there was a second field with the same display name of **Custom Field** with a logical name of **cra3a_customfieldalt** then the suggestions would show:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the logical name cr5e3_customfieldalt to disambiguate the two versions of "Custom Field."](media/operators/customfield_suggest_alt.png)

Name disambiguation strings are added in other situations where name conflicts occur, such as the names of table, choices, and other Dataverse items.

## Disambiguation operator

Some functions create [record scopes](/power-apps/maker/canvas-apps/working-with-tables#record-scope) for accessing the fields of table while processing each record, such as **Filter**, **AddColumns**, and **Sum**. Field names added with the record scope override the same names from elsewhere in the app. When this happens, you can still access values from outside the record scope with the **@** disambiguation operator:

- To access values from nested record scopes, use the **@** operator with the name of the table being operated upon using this pattern:<br>_Table_**[@**_FieldName_**]**
- To access global values, such as data sources, collections, and context variables, use the pattern **[@**_ObjectName_**]** (without a table designation).

For more information and examples, see [record scopes](/power-apps/maker/canvas-apps/working-with-tables#record-scope).

---

## Assert function

Source: [function-assert.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-assert)

*Reference information, including syntax, for the Assert function.*

# Assert function
**Applies to:** 
- ✓ Canvas apps



An assertion is a condition or an expression that evaluates to true or false in a test. If the expression returns false, the test case will fail. Assertions are used to validate the expected result of a test or test step, against the actual result and to fail the test if the condition is false. Assertions can be used to validate the state of controls in your app such as label values, list box selections and other control properties.

> [!IMPORTANT]
> **Assert** function is only available for Test Studio in Power Apps.

Assertion messages, for both passed and failed assertions, are also contained in a Traces table in the TestCaseResult record.

## Syntax

_Assert(expression, message)_

- _Expression_ – Required. An expression that evaluates to true or false.
- _Message_ – Not Required. A message that describes the assertion failure.

## Examples

`Assert(lblResult.Text = "Success", "lblResult value Expected : Success , Actual : " & lblResult.Text)`<br>
`Assert(ListBox1.Selected.Value = "Success", "ListBox1 selection Expected : Success, Actual : " & ListBox1.Selected.Value)`<br>
`Assert(kudosAfterTest = kudosBeforeTest + 1, "Kudos count. Expected : " & kudosBeforeTest + 1 & " Actual :" & kudosAfterTest)`

### See Also

[Test Studio Overview](/power-apps/maker/canvas-apps/test-studio) <br>
[Working with Test Studio](/power-apps/maker/canvas-apps/working-with-test-studio)

---

## AsType and IsType functions

Source: [function-astype-istype.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-astype-istype)

*Reference information including syntax and examples for the AsType and IsType functions.*

# AsType and IsType functions
| Function | Applies to |
|-----------|------------|
| **AsType** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **IsType** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Model-driven apps 
- ✓ Dataverse functions 
- ✓ Power Pages |



Checks if a record reference is a specific table type (**IsType**) and treats the reference as that type (**AsType**).

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) don't support **IsType**.

## Description

The **AsType** and **IsType** functions can be used to convert record references (for example polymorphic lookups in Dataverse) and dynamic values to typed values that can be used directly.

### Record References

Read [Understand record references and polymorphic lookups](/power-apps/maker/canvas-apps/working-with-references) for a broader introduction and more details.

A lookup field usually refers to records in a particular table. Because the table type is well established, access the fields of the lookup using simple dot notation. For example, **First( Accounts ).'Primary Contact'.'Full Name'** walks from the **Accounts** table to the **Primary Contact** record in the **Contacts** table and extracts the **Full Name** field.

Microsoft Dataverse also supports polymorphic lookup fields, which can refer to records from a set of tables, as in these examples.

| Lookup field  | Can refer to                                             |
| ------------- | -------------------------------------------------------- |
| **Owner**     | **Users** or **Teams**                                   |
| **Customer**  | **Accounts** or **Contacts**                             |
| **Regarding** | **Accounts**, **Contacts**, **Knowledge Articles**, etc. |

In canvas-app formulas, use record references to work with polymorphic lookups. Because a record reference can refer to different tables, you can't know which fields are available at runtime when you write a formula. The _Record.Field_ notation isn't available. These formulas need to adapt to the records that the app encounters when it runs.

The **IsType** function checks if a record reference refers to a specific table type. The function returns a Boolean TRUE or FALSE.

The **AsType** function treats a record reference as a specific table type, also called _casting_. You use the result as if it's a record of the table and use the _Record.Field_ notation to access all the fields of that record. If the reference isn't of the specific type, an error occurs.

Use these functions together to first check the table type of a record and then treat it as a record of that type so the fields are available:

```power-fx
If( IsType( First( Accounts ).Owner, Users ),
    AsType( First( Accounts ).Owner, Users ).'Full Name',
    AsType( First( Accounts ).Owner, Teams ).'Team Name'
)
```

You need these functions only if you access the fields of a record reference. For example, you use record references in the [**Filter**](function-filter-lookup.md) function without **IsType** or **AsType**:

```power-fx
Filter( Accounts, Owner = First( Users ) )
```

Similarly, you can use record references with the [**Patch**](function-patch.md) function:

```power-fx
Patch( Accounts, First( Accounts ), { Owner: First( Teams ) } )
```

When you use these functions in a record context, such as within a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) or [**Edit form**](/power-apps/maker/canvas-apps/controls/control-form-detail) control, you might need the [global disambiguation operator](operators.md#disambiguation-operator) to reference the table type. For example, this formula works for a gallery that displays a list of contacts where **Company Name** is a **Customer** lookup:

```power-fx
If( IsType( ThisItem.'Company Name', Accounts ),
    AsType( ThisItem.'Company Name', Accounts ).'Account Name',
    AsType( ThisItem.'Company Name', Contacts ).'Full Name'
)
```

For both functions, specify the type by using the name of the data source connected to the table. For the formula to work, add a data source to the app for any types you want to check or cast. For example, add the **Users** table as a data source if you want to use **IsType** and **AsType** with an **Owner** lookup and records from that table. Add only the data sources you use in your app; you don't need to add all the tables that a lookup could reference.

If the record reference is _blank_, **IsType** returns FALSE, and **AsType** returns _blank_. All fields of a _blank_ record are also _blank_.

### Dynamic values

A **Dynamic** value from a web API or the [**ParseJSON** function] needs to be converted to a specific typed value before you can use it in Power Fx. Here are some options:
1. Implicitly type the field at the point you use it. For example, an object converts to a number if you use it with the `+` operator, if it can be converted to a number. This option can cause unexpected conversions and can't convert records and tables as a whole.
1. Explicitly type each field individually with the **Decimal**, **Text**, **DateTime**, **GUID**, and other type constructor functions. This option is the most invasive to your formulas because you need to do each field separately.
1. Explicitly type JSON with the second argument to the **ParseJSON** function. This option is easy and avoids needing the **Dynamic** value.
1. Explicitly type a **Dynamic** value using the **AsType** function. You can also check the type before you try the conversion with the **IsType** function.

## Syntax

**AsType**( _RecordReference_, _TableType_ )

- _RecordReference_ - Required. A record reference, often a lookup field that refers to a record in any of several tables.
- _TableType_ - Required. The specific table to cast the record to.
 
**AsType**( _DynamicValue_, _TypeSpecification_ )

- _DynamicValue_ - Required. A dynamic value from the [**ParseJSON** function](function-parsejson.md) or API call.
- _TypeSpecification_ - Required. A type name or type specification you define with the [**Type** function](function-type.md).

**IsType**( _RecordReference_, _TableType_ )

- _RecordReference_ - Required. A record reference, often a lookup field that can refer to a record in any of multiple tables.
- _TableType_ - Required. The specific table to test for.

**IsType**( _DynamicValue_, _TypeSpecification_ )

- _DynamicValue_ - Required. A dynamic value from the [**ParseJSON** function](function-parsejson.md) or an API call.
- _TypeSpecification_ - Required. A type name or type specification defined with the [**Type** function](function-type.md).

## Examples

### Record References

[Understand record references and polymorphic lookups](/power-apps/maker/canvas-apps/working-with-references) contains extensive examples.

1. Create a blank canvas app for tablets.

1. On the left pane, select **Data** > **Add data**, and then add **Accounts** and **Contacts** tables.

   ![Blank app with two data sources: accounts and contacts.](media/function-astype-istype/contacts-add-datasources.png)

1. On the left pane, select **+** (Insert) > **Layout** > **Blank vertical gallery**.

   ![Insert a gallery control with a blank vertical layout.](media/function-astype-istype/contacts-customer-gallery.png)

1. Select **Connect to data**, and then select **Contacts** as the data source.

1. Set the gallery layout to **Title and subtitle**.

    > [!div class="mx-imgBorder"] 
    > ![Open the layout picker from the properties pane.](media/function-astype-istype/contacts-customer-layout.png)

    > [!div class="mx-imgBorder"] 
    > ![Set layout to Title and subtitle.](media/function-astype-istype/contacts-customer-flyout.png)

1. In the **Data** pane, open the **Title1** list, and then select **Full Name**.

    > [!div class="mx-imgBorder"] 
    > ![Set title value.](media/function-astype-istype/contacts-customer-title.png)

1. Select the **Subtitle1** label control.

    > [!div class="mx-imgBorder"] 
    > ![Set subtitle value.](media/function-astype-istype/contacts-customer-subtitle.png)

1. Set the **Text** property of **Subtitle1** to this formula:

   ```power-fx
   If( IsBlank( ThisItem.'Company Name' ), "--",
       IsType( ThisItem.'Company Name', Accounts ),
           "Account: " & AsType( ThisItem.'Company Name', Accounts ).'Account Name',
       "Contact: " & AsType( ThisItem.'Company Name', Contacts ).'Full Name'
   )
   ```

    > [!div class="mx-imgBorder"] 
    > ![Screen is now complete showing accounts and contacts intermixed in the gallery.](media/function-astype-istype/contacts-customer-complete.png)

   The subtitle in the gallery shows these values:

      - "--" if the **'Company Name'** is _blank_.
   - "Account: " and the **Account Name** field from the **Accounts** table if the **Company Name** field refers to an account.
   - "Contact: " and the **Full Name** field from the **Contacts** table if the **Company Name** field refers to a contact.

   Your results can differ because the sample data can be modified to show more types of results.

### Dynamic values

The following examples show a simple JSON record interpreted in various ways by **ParseJSON**, **AsType**, and **IsType** in the [Pac CLI Power Fx REPL](../../developer/cli/reference/power-fx.md).

In this first example, no type information is provided to **ParseJSON**, so it returns a dynamic value.

```powerapps-dot
>> Set( rec, ParseJSON( "{""a"":1}" ) )
rec: <Dynamic: Use Value, Text, Boolean, or other functions to establish the type>
```

The field is implicitly converted to a number when used in a numerical context.

```powerapps-dot
>> 1 + rec.a
2
```

As an alternative, this example explicitly converts the record to a typed Power Fx record with the second argument to **ParseJSON**.

```powerapps-dot
>> ParseJSON( "{""a"":1}", Type( {a: Number} ) )
{a:1}
```

And another alternative, this example explicitly converts the record to a typed Power Fx record using **AsType**.

```powerapps-dot
>> AsType( ParseJSON( "{""a"":1}" ), Type( {a: Number} ) )
{a:1}
```

Finally, if you aren't sure, this example tests the type before converting it with the **IsType** function.

```powerapps-dot
>> IsType( ParseJSON( "{""a"":1}" ), Type( {a: Number} ) )
true
```

---

## Average, Max, Min, StdevP, Sum, and VarP functions

Source: [function-aggregates.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates)

*Reference information including syntax and examples for the Average, Max, Min, StdevP, Sum, and VarP functions.*

# Average, Max, Min, StdevP, Sum, and VarP functions
| Functions | Applies to |
|-----------|------------|
| **Average**</br>**Max**</br>**Min**</br>**Sum** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **StdevP**</br>**VarP** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Aggregate functions that summarize a set of numbers.

## Description

The **Average** function calculates the average, or arithmetic mean, of its arguments.

The **Max** function finds the maximum value.

The **Min** function finds the minimum value.

The **Sum** function calculates the sum of its arguments.

The **StdevP** function calculates the standard deviation of its arguments.

The **VarP** function calculates the variance of its arguments.

You can supply the values for these functions as:

- Separate arguments. For example, **Sum( 1, 2, 3 )** returns 6.
- A [table](/power-apps/maker/canvas-apps/working-with-tables) and a formula to operate over that table. The aggregate will be calculated on the values of the formula for each [record](/power-apps/maker/canvas-apps/working-with-tables#records).

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

These functions operate on numeric values only. Other types of values, such as strings or records, are ignored. Use the **[Value](function-value.md)** function to convert a string into a number.

The **Average**, **Max**, **Min**, and **Sum** functions can be delegated when used with a [data source that supports delegation for these functions](/power-apps/maker/canvas-apps/delegation-overview). However, **StdevP** and **VarP** can't be delegated for any data sources. If delegation isn't supported, only the first portion of the data will be retrieved and then the function applied locally. The result may not represent the complete story. A delegation warning will appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](/power-apps/maker/canvas-apps/delegation-overview).

## Syntax

**Average**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )<br>**Max**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )<br>**Min**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )<br>**Sum**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )<br>**StdevP**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )<br>**VarP**( _NumericalFormula1_, [ *NumericalFormula2*, ... ] )

- _NumericalFormula(s)_ - Required. Numeric values to operate on.

**Average**( _Table_, _NumericalFormula_ )<br>**Max**( _Table_, _NumericalFormula_ )<br>**Min**( _Table_, _NumericalFormula_ )<br>**Sum**( _Table_, _NumericalFormula_ )<br>**StdevP**( _Table_, _NumericalFormula_ )<br>**VarP**( _Table_, _NumericalFormula_ )

- _Table_ - Required. Table to operate on.
- _NumericalFormula_ - Required. Formula to evaluate for each record. The result of this formula is used for the aggregation. You can use columns of the table in the formula.

## Examples

### Step by step

Let's say that you had a [data source](/power-apps/maker/canvas-apps/working-with-data-sources) named **Sales** that contained a **CostPerUnit** column and a **UnitsSold** column, and you set the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property of a label to this function:<br>
**Sum(Sales, CostPerUnit \* UnitsSold)**

The label would show total sales by multiplying the values in those columns for each record and then adding the results from all records together:<br>![Calculate total sales from units sold and cost per unit.](./media/function-aggregates/total-sales.png)

As a different example, let's say that you had sliders that were named **Slider1**, **Slider2**, and **Slider3** and a label with its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property set to this formula:<br>
**Sum(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the sum of all values to which the sliders were set.<br>
**Average(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the average of all values to which the sliders were set.<br>
**Max(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the maximum of all values to which the sliders were set.<br>
**Min(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the minimum of all values to which the sliders were set.<br>
**StdevP(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the standard deviation of all values to which the sliders were set.<br>
**VarP(Slider1.Value, Slider2.Value, Slider3.Value)**: The label would show the variance of all values to which the sliders were set.

---

## Back and Navigate functions

Source: [function-navigate.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-navigate)

*Reference information including syntax and examples for the Back and Navigate functions.*

# Back and Navigate functions
**Applies to:** 
- ✓ Canvas apps

Changes which screen is displayed.

## Overview

Most apps contain multiple screens. Use the **Back** and **Navigate** function to change which screen is displayed. For example, set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of a button to a formula that includes a **Navigate** function if you want to show a different screen when a user selects that button. In that formula, you can specify a visual transition, such as **Fade**, to control how one screen changes to another.

**Back** and **Navigate** change only which screen is displayed. Screens that aren't currently displayed continue to operate behind the scenes. You can build formulas that refer to properties of controls on other screens. For example, a user can change the value of a slider on one screen, navigate to a different screen that uses that value in a formula, and determine how it affects what happens in the new screen. The user can then navigate back to the original screen and confirm that the slider has kept its value.

[Context variables](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable) are also preserved when a user navigates between screens. You can use **Navigate** to set one or more context variables for the screen that the formula will display, which is the only way to set a context variable from outside the screen. You can use this approach to pass parameters to a screen. If you've used another programming tool, this approach is similar to passing parameters to procedures.

Use the **App** object's [**StartScreen**](object-app.md#startscreen-property) property to control the first screen to be displayed.

You can use either function only within a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Navigate



In the first argument, specify the name of the screen to display.

In the second argument, specify how the old screen changes to the new screen:

| Transition Argument                 | Description                                                                             | Demonstration                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **ScreenTransition.Cover**          | The new screen slides into view, moving right to left, to cover the current screen.     | ![screen transition cover animation.](media/function-navigate/cover.gif)                |
| **ScreenTransition.CoverRight**     | The new screen slides into view, moving left to right, to cover the current screen.     | ![screen transition cover right animation.](media/function-navigate/coverright.gif)     |
| **ScreenTransition.Fade**           | The current screen fades away to reveal the new screen.                                 | ![screen transition fade animation.](media/function-navigate/fade.gif)                  |
| **ScreenTransition.None** (Default) | The new screen quickly replaces the current screen.                                     | ![screen transition none animation.](media/function-navigate/none.gif)                  |
| **ScreenTransition.UnCover**        | The current screen slides out of view, moving right to left, to uncover the new screen. | ![screen transition uncover animation.](media/function-navigate/uncover.gif)            |
| **ScreenTransition.UnCoverRight**   | The current screen slides out of view, moving left to right, to uncover the new screen. | ![screen transition uncover right animation.](media/function-navigate/uncoverright.gif) |

You can use **Navigate** to create or update [context variables](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable) of the new screen. As an optional third argument, pass a [record](/power-apps/maker/canvas-apps/working-with-tables#records) that contains the context-variable name as a [column](/power-apps/maker/canvas-apps/working-with-tables#columns) name and the new value for the context variable. This record is the same as the record that you use with the **[UpdateContext](function-updatecontext.md)** function.

Set the **[OnHidden](/power-apps/maker/canvas-apps/controls/control-screen)** property of the old screen, the **[OnVisible](/power-apps/maker/canvas-apps/controls/control-screen)** property of the new screen, or both to make additional changes during the transition. The **App.ActiveScreen** property will be updated to reflect the change.

**Navigate** normally returns **true** but will return **false** if an error is encountered.

Context variables for navigation are explained in the article [navigate between screens](/power-apps/maker/canvas-apps/add-screen-context-variables#add-navigation).

## Back



The **Back** function returns to the screen that was most recently displayed.

For each **Navigate** call, the app tracks the screen that appeared and the transition. You can use successive **Back** calls to return all the way to the screen that appeared when the user started the app.

When the **Back** function runs, the inverse transition is used by default. For example, if a screen appeared through the **CoverRight** transition, **Back** uses **UnCover** (which is to the left) to return. **Fade** and **None** are their own inverses. Pass an optional argument to **Back** to force a specific transition.

**Back** normally returns **true** but returns **false** if the user hasn't navigated to another screen since starting the app.

## Syntax

**Back**( [ *Transition* ] )

- _Transition_ - Optional. The visual transition to use between the current screen and the previous screen. Refer to the list of valid values for this argument earlier in this article. By default, the transition through which a screen returns is the inverse of the transition through which it appeared.

**Navigate**( _Screen_ [, _Transition_ [, *UpdateContextRecord* ] ] )

- _Screen_ - Required. The screen to display. In place of _Screen_, you can also use a control that is on the screen you wish to navigate to.
- _Transition_ - Optional. The visual transition to use between the current screen and the next screen. See the list of valid values for this argument earlier in this article. The default value is **None**.
- _UpdateContextRecord_ - Optional. A record that contains the name of at least one column and a value for each column. This record updates the [context variables](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable) of the new screen as if passed to the **[UpdateContext](function-updatecontext.md)** function.

## Examples

| Formula                                                                                                     | Description                                                                                                                                                                                       | Result                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigate( Details )**                                                                                     | Displays the **Details** screen with no transition or change in value for a context variable.                                                                                                     | The **Details** screen appears quickly.                                                                                                                                                                                                                                                                                    |
| **Navigate( Details, ScreenTransition.Fade )**                                                              | Displays the **Details** screen with a **Fade** transition. No value of a context variable is changed.                                                                                            | The current screen fades away to show the **Details** screen.                                                                                                                                                                                                                                                              |
| **Navigate( Details, ScreenTransition.Fade, {&nbsp;ID:&nbsp;12&nbsp;} )**                                   | Displays the **Details** screen with a **Fade** transition, and updates the value of the **ID** context variable to **12**.                                                                       | The current screen fades away to show the **Details** screen, and the context variable **ID** on that screen is set to **12**.                                                                                                                                                                                             |
| **Navigate( Details, ScreenTransition.Fade, {&nbsp;ID:&nbsp;12&nbsp;,&nbsp;Shade:&nbsp;Color.Red&nbsp;} )** | Displays the **Details** screen with a **Fade** transition. Updates the value of the **ID** context variable to **12**, and updates the value of the **Shade** context variable to **Color.Red**. | The current screen fades away to show the **Details** screen. The context variable **ID** on the **Details** screen is set to **12**, and the context variable **Shade** is set to **Color.Red**. If you set the **Fill** property of a control on the **Details** screen to **Shade**, that control would display as red. |
| **Back()**                                                                                                  | Displays the previous screen with the default return transition.                                                                                                                                  | Displays the previous screen through the inverse transition of the transition through which the current screen appeared.                                                                                                                                                                                                   |
| **Back( ScreenTransition.Cover )**                                                                          | Displays the previous screen with the **Cover** transition.                                                                                                                                       | Displays the previous screen through the **Cover** transition, regardless of the transition through which the current screen appeared.                                                                                                                                                                                     |

### Step-by-step

1. Create a blank app.

1. Add a second screen to it.

   The app contains two blank screens: **Screen1** and **Screen2**.

1. Set the **Fill** property of **Screen2** to the value `Gray`.

1. On **Screen2**, add a button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   ```power-fx
   Navigate( Screen1, ScreenTransition.Cover )
   ```

1. While holding down the **Alt** key, select the button.

   **Screen1** appears with a white background through a transition that covers to the left.

1. On **Screen1**, add a button, and set its **OnSelect** property to this formula:

   ```power-fx
   Back()
   ```

1. While holding down the **Alt** key, select the button.

   The second screen appears with a gray background through a transition that uncovers to the right (the inverse of **Cover**).

1. Select the button on each screen repeatedly to bounce back and forth.

### See also

[Using context variables](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable)

---

## Blank, Coalesce, IsBlank, and IsEmpty functions

Source: [function-isblank-isempty.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-isblank-isempty)

*Reference information including syntax and examples for the Blank, Coalesce, IsBlank, and IsEmpty functions.*

# Blank, Coalesce, IsBlank, and IsEmpty functions
| Functions | Applies to |
|-----------|------------|
| **Blank** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **Coalesce**</br>**IsEmpty** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **IsBlank** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |


 

Tests whether a value is blank or a [table](/power-apps/maker/canvas-apps/working-with-tables) contains no [records](/power-apps/maker/canvas-apps/working-with-tables#records), and provides a way to create _blank_ values.

## Overview

_Blank_ is a placeholder for "no value" or "unknown value." For example, a **[Combo box](/power-apps/maker/canvas-apps/controls/control-combo-box)** control's **Selected** property is _blank_ if the user hasn't made a selection. Many data sources can store and return NULL values, which are represented in Power Apps as _blank_.

Any property or calculated value in Power Apps can be _blank_. For example, a Boolean value normally has one of two values: **true** or **false**. But in addition to these two, it can also be _blank_ indicating that the state isn't known. This is similar to Microsoft Excel, where a worksheet cell starts out as blank with no contents but can hold the values **TRUE** or **FALSE** (among others). At any time, the contents of the cell can again be cleared, returning it to a _blank_ state.

_Empty string_ refers to a string that contains no characters. The [**Len** function](function-len.md) returns zero for such a string and it can be written in a formulas as two double quotes with nothing in between `""`. Some controls and data sources use an empty string to indicate a "no value" condition. To simplify app creation, the **IsBlank** and **Coalesce** functions test for both _blank_ values or empty strings.

In the context of the **IsEmpty** function, _empty_ is specific to tables that contain no records. The table structure may be intact, complete with [column](/power-apps/maker/canvas-apps/working-with-tables#columns) names, but no data is in the table. A table may start as empty, take on records and no longer be empty, and then have the records removed and again be empty.

## Blank

The **Blank** function returns a _blank_ value. Use this to store a NULL value in a data source that supports these values, effectively removing any value from the field.

## IsBlank

 

The **IsBlank** function tests for a _blank_ value or an empty string. The test includes empty strings to ease app creation since some data sources and controls use an empty string when there's no value present. To test specifically for a _blank_ value use `if(Value = Blank(), ...` instead of **IsBlank**. The **IsBlank** function considers empty tables as not blank, and **IsEmpty** should be used to test a table.

When enabling error handling for existing apps, consider replacing **IsBlank** with [**IsBlankOrError**](function-iferror.md#isblankorerror) to preserve existing app behavior. Prior to the addition of error handling, a _blank_ value was used to represent both null values from databases and error values. Error handling separates these two interpretations of _blank_, which could change the behavior of existing apps that continue to use **IsBlank**.

The return value for **IsBlank** is a boolean **true** or **false**.

## Coalesce

 

The **Coalesce** function evaluates its arguments in order and returns the first value that isn't _blank_ or an empty string. Use this function to replace a _blank_ value or empty string with a different value but leave non-_blank_ and non-empty string values unchanged. If all the arguments are _blank_ or empty strings, then the function returns _blank_, making **Coalesce** a good way to convert empty strings to _blank_ values.

`Coalesce( value1, value2 )` is the more concise equivalent of `If( Not IsBlank( value1 ), value1, Not IsBlank( value2 ), value2 )` and doesn't require **value1** and **value2** to be evaluated twice. The [**If** function](function-if.md) returns _blank_ if there's no "else" formula as is the case here.

All arguments to **Coalesce** must be of the same type; for example, you can't mix numbers with text strings. The return value from **Coalesce** is of this common type.

## IsEmpty

 

The **IsEmpty** function tests whether a table contains any records. It's equivalent to using the **[CountRows](function-table-counts.md)** function and checking for zero. You can check for data-source errors by combining **IsEmpty** with the **[Errors](function-errors.md)** function.

The return value for **IsEmpty** is a Boolean **true** or **false**.

## Syntax

**Blank**()

**Coalesce**( _Value1_ [, *Value2*, ... ] )

- _Value(s)_ – Required. Values to test. Each value is evaluated in order until a value that isn't _blank_ and not an empty string is found. Values after this point aren't evaluated.

**IsBlank**( _Value_ )

- _Value_ – Required. Value to test for a _blank_ value or empty string.

**IsEmpty**( _Table_ )

- _Table_ - Required. Table to test for records.

## Examples

### Blank

1. Create an app from scratch, and add a **Button** control.
2. Set the button's **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   ```power-fx
   ClearCollect( Cities, { Name: "Seattle", Weather: "Rainy" } )
   ```

3. Preview your app, click or tap the button that you added, and then close Preview.
4. On the **File** menu, click or tap **Collections**.

   The **Cities** collection appears, showing one record with "Seattle" and "Rainy":

   ![Collection showing Seattle with Rainy weather.](./media/function-isblank-isempty/seattle-rainy.png)

5. Click or tap the back arrow to return to the default workspace.
6. Add a **Label** control, and set its **Text** property to this formula:

   ```power-fx
   IsBlank( First( Cities ).Weather )
   ```

   The label shows **false** because the **Weather** field contains a value ("Rainy").

7. Add a second button, and set its **OnSelect** property to this formula:

   ```power-fx
   Patch( Cities, First( Cities ), { Weather: Blank() } )
   ```

8. Preview your app, click or tap the button that you added, and then close Preview.

   The **Weather** field of the first record in **Cities** is replaced with a _blank_, removing the "Rainy" that was there previously.

   ![Collection showing Seattle with a blank Weather field.](./media/function-isblank-isempty/seattle-blank.png)

   The label shows **true** because the **Weather** field no longer contains a value.

### Coalesce

| Formula                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                | Result  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Coalesce(&nbsp;Blank(),&nbsp;1&nbsp;)**          | Tests the return value from the **Blank** function, which always returns a _blank_ value. Because the first argument is _blank_, evaluation continues with the next argument until a non-_blank_ value and non-empty string is found.                                                                                                                                                                                                                      | **1**   |
| **Coalesce( "", "2" )**                            | Tests the first argument, which is an empty string. Because the first argument is an empty string, evaluation continues with the next argument until a non-_blank_ value and non-empty string is found.                                                                                                                                                                                                                                                     | **2**   |
| **Coalesce( Blank(), "", Blank(), "", "3", "4" )** | **Coalesce** starts at the beginning of the argument list and evaluates each argument in turn until a non-_blank_ value and non-empty string is found. In this case, the first four arguments all return _blank_ or an empty string, so evaluation continues to the fifth argument. The fifth argument is non-_blank_ and non-empty string, so evaluation stops here. The value of the fifth argument is returned, and the sixth argument isn't evaluated. | **3**   |
| **Coalesce( "" )**                                 | Tests the first argument, which is an empty string. Because the first argument is an empty string, and there are no more arguments, the function returns _blank_.                                                                                                                                                                                                                                                                                           | _blank_ |

### IsBlank

1. Create an app from scratch, add a text-input control, and name it **FirstName**.
2. Add a label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   ```power-fx
   If( IsBlank( FirstName.Text ), "First Name is a required field." )
   ```

   By default, the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property of a text-input control is set to **"Text input"**. Because the property contains a value, it isn't blank, and the label doesn't display any message.

3. Remove all the characters from the text-input control, including any spaces.

   Because the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property no longer contains any characters, it's an empty string, and **IsBlank( FirstName.Text )** is **true**. The required field message is displayed.

For information about how to perform validation by using other tools, see the **[Validate](function-validate.md)** function and [working with data sources](/power-apps/maker/canvas-apps/working-with-data-sources).

Other examples:

| Formula                              | Description                                                                                                                                                                                                              | Result    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| **IsBlank(&nbsp;Blank()&nbsp;)**     | Tests the return value from the **Blank** function, which always returns a _blank_ value.                                                                                                                                | **true**  |
| **IsBlank( "" )**                    | A string that contains no characters.                                                                                                                                                                                    | **true**  |
| **IsBlank( "Hello" )**               | A string that contains one or more characters.                                                                                                                                                                           | **false** |
| **IsBlank( _AnyCollection_ )**       | Because the [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) exists, it isn't blank, even if it doesn't contain any records. To check for an empty collection, use **IsEmpty** instead. | **false** |
| **IsBlank( Mid( "Hello", 17, 2 ) )** | The starting character for **[Mid](function-left-mid-right.md)** is beyond the end of the string. The result is an empty string.                                                                                         | **true**  |
| **IsBlank( If( false, false ) )**    | An **[If](function-if.md)** function with no _ElseResult_. Because the condition is always **false**, this **[If](function-if.md)** always returns _blank_.                                                              | **true**  |

### IsEmpty

1. Create an app from scratch, and add a **Button** control.
2. Set the button's **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **Collect( IceCream, {Flavor: "Strawberry", Quantity: 300}, {Flavor: "Chocolate", Quantity: 100} )**

3. Preview your app, click or tap the button that you added, and then close Preview.

   A collection named **IceCream** is created and contains this data:

   ![A table with Strawberry and Chocolate flavours with quantity 300 and 100.](media/function-isblank-isempty/icecream-strawberry-chocolate.png)

   This collection has two records and isn't empty. **IsEmpty( IceCream )** returns **false**, and **CountRows( IceCream )** returns **2**.

4. Add a second button, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **Clear( IceCream )**

5. Preview your app, click or tap the second button, and then close Preview.

   The collection is now empty:

   ![A collection with Flavor and Quantity as empty collection.](media/function-isblank-isempty/icecream-clear.png)

   The **[Clear](function-clear-collect-clearcollect.md)** function removes all the records from a collection, resulting in an empty collection. **IsEmpty( IceCream )** returns **true**, and **CountRows( IceCream )** returns **0**.

You can also use **IsEmpty** to test whether a calculated table is empty, as these examples show:

| Formula                                                             | Description                                                                                                                              | Result    |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **IsEmpty( [&nbsp;1,&nbsp;2,&nbsp;3 ] )**                           | The single-column table contains three records and, therefore, isn't empty.                                                              | **false** |
| **IsEmpty( [&nbsp;] )**                                             | The single-column table contains no records and is empty.                                                                                | **true**  |
| **IsEmpty( Filter( [&nbsp;1,&nbsp;2,&nbsp;3&nbsp;], Value > 5 ) )** | The single-column table contains no values that are greater than 5. The result from the filter doesn't contain any records and is empty. | **true**  |

---

## Boolean function

Source: [function-boolean.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-boolean)

*Reference information including syntax and examples for the Boolean function.*

# Boolean function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Convert a text, number, or dynamic value to a Boolean value.

## Description

Use the **Boolean** function to convert other types to a Boolean value. A Boolean value is *true*, *false*, or *blank*.

In most cases, type coercion happens automatically, and you don't need to use the **Boolean** function explicitly. For example, `If( "true", 1, 0 )` returns 1 because the text string `"true"` is automatically converted to a Boolean. The **Boolean** function is useful when you want an explicit conversion or when you use a dynamic value.

## Syntax

**Boolean**( *Text* )<br>
**Boolean**( *TextSingleColumnTable* )

* *Text* - Required. The string(s) to convert. Must be a case insensitive version of `"true"` or `"false"`. These text strings aren't localized. *blank* and empty text is also accepted and converted to a *blank*. All other text strings return an error.

**Boolean**( *Number* )<br>
**Boolean**( *NumberSingleColumnTable* )

* *Number* - Required. The number(s) to convert. `0` is converted to *false* and all other numbers are converted to *true*. *blank* values are accepted and converted to a *blank*.

**Boolean**( *DynamicValue* )

* *DynamicValue* - Required. The dynamic value to convert. Acceptable values depend on the dynamic provider. For [**JSON**](function-parsejson.md), JSON boolean values `true`, `false`, and `null` are accepted, corresponding to *true*, *false*, and *blank* values in Power Fx. String or number values are accepted as outlined for the *String* and *Number* overloads described earlier.

## Examples

#### Basic usage

| Formula | Description | Result |
| --- | --- | --- |
| **Boolean(&nbsp;"true"&nbsp;)** | Converts the text string `"true"` to a boolean value. | *true* |
| **Boolean(&nbsp;"false"&nbsp;)** | Converts the text string `"false"` to a boolean value. | *false* |
| **Boolean(&nbsp;"TRUE"&nbsp;)** | Converts the text string `"TRUE"` to a boolean value. | *true* |
| **Boolean(&nbsp;"TrUe"&nbsp;)** | Converts the text string `"TrUe"` to a boolean value. | *true* |
| **Boolean(&nbsp;"Truthful"&nbsp;)** | Attempts to convert the text string `"Truthful"` to a boolean value, but since it isn't a case insensitive variation of `true` and `false`, an error is returned. | *error (invalid argument)* |
| **Boolean(&nbsp;Blank()&nbsp;)** | Converts the *blank* value to a boolean value. | *blank* |
| **Boolean(&nbsp;0&nbsp;)** | Converts the number `0` to a boolean value. | *false* |
| **Boolean(&nbsp;1&nbsp;)** | Converts the number `1` to a boolean value. | *true* |
| **Boolean(&nbsp;-1234&nbsp;)** | Converts the number `-1234` to a boolean value. | *true* |

### Dynamic usage

| Formula | Description | Result |
| --- | --- | --- |
| **Boolean( ParseJSON( "{&nbsp;""bool"":&nbsp;true&nbsp;}" ).bool )** | Converts the dynamic value `true` (a JSON Boolean) to a boolean value. | *true* |
| **Boolean( ParseJSON( "{&nbsp;""bool"":&nbsp;null&nbsp;}" ).bool )** | Converts the dynamic value `null` (a JSON null) to a boolean value. | *blank* |
| **Boolean( ParseJSON( "{&nbsp;""bool"":&nbsp;"true"&nbsp;}" ).bool )** | Attempts to convert the dynamic value `"true"` (a JSON string) to a boolean value, but since it isn't a valid boolean value in JSON, an error is returned. | *error (invalid argument)* |
| **Boolean( ParseJSON( "[&nbsp;true,&nbsp;false,&nbsp;null&nbsp;]" ).bool )** | Attempts to convert an array of boolean values to a single column table.  Single column tables aren't supported with dynamic values, and instead the formula `ForAll( Table(ParseJSON( "[true, false, null]" )), Boolean( ThisRecord.Value ) )` or `ForAll( ParseJSON( "[true, false, null]" ), Boolean( ThisRecord ) )` should be used. | *error (invalid argument)* |

#### Single column tables

| Formula | Description | Result |
| --- | --- | --- |
| **Boolean( [&nbsp;"true",&nbsp;"false",&nbsp;Blank()&nbsp;] )** | Converts the single column table of text strings to a single column table of boolean values. | [ *true*, *false*, *blank* ] |
| **Boolean( [&nbsp;"true",&nbsp;"falsified"&nbsp;] )** | Converts the single column table of text strings to a single column table of boolean values.  Since the second record in this table isn't a case insensitive variation of `true` and `false`, an error is returned for this record. | [ *true*, *error (invalid argument)* ] |
| **Boolean( [&nbsp;1,&nbsp;2,&nbsp;0 &nbsp;] )** | Converts the single column table of numbers to a single column table of boolean values. | [ *true*, *true*, *false* ] |

---

## Calendar and Clock functions

Source: [function-clock-calendar.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clock-calendar)

*Reference information including syntax and examples for the Calendar and Clock functions.*

# Calendar and Clock functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Retrieves calendar and clock information about the current locale.

## Description

The **Calendar** and **Clock** functions are a set of functions that retrieve information about the current locale.

You can use these functions to display dates and times in the language of the current user. The single-column tables returned by **Calendar** and **Clock** functions can be used directly with the **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property of Dropdown and Listbox controls.

| Function                     | Description                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Calendar.MonthsLong()**    | Single-column table containing the full names of each month, starting with "January".                                                        |
| **Calendar.MonthsShort()**   | Single-column table containing the abbreviated names of each month, starting with "Jan" for January.                                         |
| **Calendar.WeekdaysLong()**  | Single-column table containing the full names of each weekday, starting with "Sunday".                                                       |
| **Calendar.WeekdaysShort()** | Single-column table containing the full names of each weekday, starting with "Sun" for Sunday.                                               |
| **Clock.AmPm()**             | Single-column table containing the long uppercase "AM" and "PM" designations. If the language uses a 24-hour clock, the table is empty. |
| **Clock.AmPmShort()**        | Single-column table containing the short uppercase "A" and "P" designations. If the language uses a 24-hour clock, the table is empty.  |
| **Clock.IsClock24()**        | Boolean indicating if a 24-hour clock is used in this locale.                                                                                |

Use the **[Text](function-text.md)** function to format date and time values using this same information. The **[Language](function-language.md)** function returns the current language and region code.

## Syntax

**Calendar.MonthsLong**()

**Calendar.MonthsShort**()

**Calendar.WeekdaysLong**()

**Calendar.WeekdaysShort**()

**Clock.AmPm**()

**Clock.AmPmShort**()

**Clock.IsClock24**()

## Examples

1. Insert a Dropdown control.
2. Set the formula for the **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property to:

   - **Calendar.MonthsLong()**

3. Users of your app can now select a month in their own language. **MonthsLong** can be replaced with any of the single-column tables that are returned by **Calendar** to create weekday and time selectors.

In the United States, with **[Language](function-language.md)** returning "en-US", the following is returned by the **Calendar** functions:

| Formula                      | Description                                                                                                               | Result                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Calendar.MonthsLong()**    | The return value contains the full name of each month, starting with "January".                                           | ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] |
| **Calendar.MonthsShort()**   | The return value contains the abbreviated name of each month, starting with "January".                                    | [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]                                       |
| **Calendar.WeekdaysLong()**  | The return value contains the full name of each day, starting with "Sunday".                                              | [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]                                             |
| **Calendar.WeekdaysShort()** | The return value contains the abbreviated name of each day, starting with "Sunday".                                       | [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]                                                                          |
| **Clock.AmPm()**             | This language uses a 12-hour clock. The return value contains the uppercase versions of the full AM and PM designations.  | [ "AM", "PM" ]                                                                                                               |
| **Clock.AmPmShort()**        | This language uses a 12-hour clock. The return value contains the uppercase versions of the short AM and PM designations. | [ "A", "P" ]                                                                                                                 |
| **Clock.IsClock24()**        | This language uses a 12-hour clock.                                                                                       | **false**                                                                                                                    |

---

## Char and UniChar functions

Source: [function-char.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-char)

*Reference information including syntax and examples for the Char and UniChar functions.*

# Char and UniChar functions
| Function | Applies to |
|-----------|------------|
| **Char** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **UniChar** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |

Translates a character code into a string.

## Description

The **Char** function translates a number into a string with the corresponding ASCII character.

The **UniChar** function translates a number into a string with the corresponding Unicode character.

If you pass a single number, the return value is the translated string version of that number. If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains numbers, the return value is a single-column table of strings in a **Value** column. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.

## Syntax

**Char**( _CharacterCode_ )

- _CharacterCode_ - Required. ASCII character code to translate.

**Char**( _CharacterCodeTable_ )

- _CharacterCodeTable_ - Required. Table of ASCII character codes to translate.

**UniChar**( _UnicodeCode_ )

- _UnicodeCode_ - Required. Unicode character code to translate.

**UniChar**( _UnicodeCodeTable_ )

- _UnicodeCodeTable_ - Required. Table of Unicode character codes to translate.

## Examples

### Single number

| Formula | Description | Result |
| --- | --- | --- |
| **Char( 65 )** | Returns the character that corresponds to ASCII code 65. | "A" |
| **Char( 105 )** | Returns the character that corresponds to ASCII code 105. | "i" |
| **Char( 35 )** | Returns the character that corresponds to ASCII code 35. | "#" |
| **UniChar( 35 )** | Returns the character that corresponds to Unicode code 35. | "#" |
| **UniChar( 233 )** | Returns the character that corresponds to Unicode code 233. | "á" |
| **UniChar( 9829 )** | Returns the character that corresponds to Unicode code 9829. | "♥" |

### Single-column table

The example in this section converts numbers from a single-column table.

| Formula | Result |
| --- | --- |
| `Char( [ 65, 105 ] )` | A single-column table with a `Value` column containing the following values: "A", "i" |
| `Char( [ 35, 52 ] )` | A single-column table with a `Value` column containing the following values: "#", "4" |
| `UniChar( [ 71, 97, 114, 231, 111, 110 ] )` | A single-column table with a `Value` column containing the following values: "G", "a", "r", "ç", "o", "n" |

### Display a character map

1. On an empty screen in a tablet app, add a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) control with a **Blank Horizontal** layout, and then set these properties:

   - **Items**: `Sequence( 8, 0, 16 ) As HighNibble`
   - **Width**: `Parent.Width`
   - **Height**: `Parent.Height`
   - **TemplateSize**: `Parent.Width / 8`
   - **TemplatePadding**: 0
   - **X**: 0
   - **Y**: 0

1. Inside that gallery, add a **Gallery** control with a **Blank Vertical** layout, and then set these properties:

   - **Items**: `Sequence( 16, HighNibble.Value ) As FullCode`
   - **Width**: `Parent.Width / 8`
   - **Height**: `Parent.Height`
   - **TemplateSize**: `Parent.Height / 16`
   - **TemplatePadding**: 0
   - **X**: 0
   - **Y**: 0

1. Inside the second (vertical) gallery, add a **Label** control, and set these properties:

   - **Text**: `FullCode.Value`
   - **Width**: `Parent.Width / 2`
   - **X**: 0
   - **Y**: 0
   - **Align**: `Center`
   - **FontWeight**: `Bold`
   - **Size**: 24

1. Inside the second (vertical) gallery, add another **Label** control, and set these properties:

   - **Text**: `Char( FullCode.Value )`
   - **Width**: `Parent.Width / 2`
   - **X**: `Parent.Width / 2`
   - **Y**: 0
   - **FontWeight**: `Bold`
   - **Size**: 24

You've created a chart of the first 128 ASCII characters. Characters that appear as a small square can't be printed.

![First 128 ASCII characters.](media/function-char/chart-lower.png)

If you want to see how **FullCode.Value** gets its values. Let's begin with the outer horizontal gallery. Its **Items** property uses the **Sequence** function to create 8 columns, starting with 0 with increments of 16:

![Outer gallery illustrated.](media/function-char/chart-lower-outer.png)

Nested within this gallery is another vertical gallery. Its **Items** property fills in the gap left by the increment of 16 from the outer gallery:

![Inner gallery illustrated.](media/function-char/chart-lower-inner.png)

To show the extended ASCII characters, it's a simple matter of changing the starting point for the chart, set in the Sequence function for the outer gallery:

`Sequence( 8, 128, 16 ) As HighNibble`

![Extended ASCII characters.](media/function-char/chart-higher.png)

Finally, to show the characters in a different font, set the **Font** property of the second label to a value such as **'Dancing Script'**.

![Dancing Script.](media/function-char/chart-higher-dancing-script.png)

---

## Choices function

Source: [function-choices.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-choices)

*Reference information including syntax and examples for the Choices function.*

# Choices function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps
- ✓ Power Pages



Returns a table of the possible values for a lookup column.

## Description

The **Choices** function returns a table of the possible values for a lookup column.

Use the **Choices** function to provide a list of choices for your user to select from. This function is commonly used with the [**Combo box**](/power-apps/maker/canvas-apps/controls/control-combo-box) control in edit forms.

For a lookup, the table that **Choices** returns matches the foreign table that's associated with the lookup. By using **Choices**, you eliminate the need to add the foreign table as an additional data source. **Choices** returns all columns of the foreign table.

Because **Choices** returns a table, you can use [**Filter**](function-filter-lookup.md), [**Sort**](function-sort.md), [**AddColumns**](function-table-shaping.md), and all the other table-manipulation functions to filter, sort, and shape the table.

At this time, you can't [delegate](/power-apps/maker/canvas-apps/delegation-overview) **Choices**. If this limitation poses a problem in your app, add the foreign table as a data source, and use it directly.

**Choices** doesn't require column names to be strings and enclosed in double quotes, unlike the [**ShowColumns**](function-table-shaping.md), [**Search**](function-filter-lookup.md), and other table functions. Provide the formula as if you were referencing the column directly.

Column references must be direct to the data source. For example, if the data source is **Accounts** and the lookup is **SLA**, the column reference would be **Accounts.SLA**. The reference can't pass through a function, a variable, or a control. Furthering this example, if **Accounts** is fed to a **Gallery** control, use the formula **Gallery.Selected.SLA** to reference the SLA for the selected account. However, this reference has passed through a control, so it can't be passed to the **Columns** function - you must still use **Accounts.SLA**.

At this time, you can use lookup columns only with SharePoint and Microsoft Dataverse.

## Syntax

**Choices**( _column-reference_ [, _text-filter_ ] )

- _column-reference_ - Required. A lookup column of a data source. Don't enclose the column name in double quotes. The reference must be directly to the column of the data source and not pass through a function or a control.
- _text-filter_ - Optional. Filters the list of choices by only returning choices that start with the text specified in _text-filter_. If an empty string is specified, all choices will be returned.

## Examples

#### Choices for a lookup

1. [Create a database](/power-platform/admin/create-database) in Dataverse, and select the **Include sample apps and data** box.

   Many tables, such as **Accounts**, are created.

   **Note**: Table names are singular on make.powerapps.com and plural in Power Apps Studio.

   ![A partial list of the fields from the Account table in Dataverse for Apps, highlighting that "Primary Contact" is a lookup field](media/function-choices/entity-account.png)

   The **Accounts** table has a **Primary Contact** column, which is a lookup to the **Contacts** table.

   ![A partial list of the fields from the Contact table in the Dataverse.](media/function-choices/entity-contact.png)

   For each account, a contact is designated as the primary contact, or the primary contact is _blank_.

1. [Generate an app](/power-apps/maker/canvas-apps/data-platform-create-app) from the **Accounts** table.

1. In the list of screens and controls near the left edge, scroll down until **EditScreen1** appears, and then select **EditForm1** just under it.

   ![In the left navigation bar, select EditForm1 on EditScreen1.](media/function-choices/select-editform.png)

1. On the **Properties** tab of the right pane, select **Edit fields**.

   ![Open the Data pane.](media/function-choices/open-data-pane.png)

1. In the **Fields** pane, select **Add field**.

1. Search for the **Primary Contact** field, select its check box, and then select **Add**.

   ![Select Accounts to open the Data pane.](media/function-choices/field-list.png)

   The **Primary Contact** field appears at the bottom of the form. If the field shows an error, select **Data sources** on the **View** tab, select the ellipsis (...) for the **Accounts** data source, and then select **Refresh**.

1. (optional) Drag the **Primary Contact** field from the bottom to the top of the list of fields.

1. In the card for **Primary Contact**, select the **Combo box** control.

   The **Items** property of that control is set to a formula that identifies the column by either its display name, as in the first example, or its logical name, as in the second example:

   - **Choices( Accounts.'Primary Contact' )**
   - **Choices( Accounts.primarycontactid )**

     ![A canvas screen with a form control. The Combo box control within the Primary Contact card is selected, and the Items property with the formula Choices( Accounts.'Primary Contact' ) appears.](media/function-choices/accounts-primary-contact.png)

1. For illustration purposes, we can view the complete table returned by the **Choices** function in a **Data table** control. On the **Home** tab, select **New screen**, and then select **Blank**.

1. On the **Insert** tab, select **Data table**.

1. Set the **Items** property of the **Data table** control to this formula:

   **Choices( Accounts.'Primary Contact' )**

1. In the middle of the **Data table** control, select the link that starts **Choose the fields...**, and then select the check boxes for the field or fields that you want to show (for example, **firstname** and **lastname**).

   ![A canvas screen with a data table control. The Items property is set to the formula Choices( Accounts.'Primary Contact' ), and the table shows the firstname and lastname columns for the first set of records from the Contacts table.](media/function-choices/full-accounts-pc.png)

---

## Collect, Clear, and ClearCollect functions

Source: [function-clear-collect-clearcollect.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clear-collect-clearcollect)

*Reference information including syntax and examples for the Collect, Clear, and ClearCollect functions.*

# Collect, Clear, and ClearCollect functions
| Function | Applies to |
|-----------|------------|
| **Clear** | 
- ✓ Canvas apps 
- ✓ Desktop flows 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **ClearCollect** | 
- ✓ Canvas apps 
- ✓ Desktop flows 
- ✓ Power Platform CLI |
| **Collect** | 
- ✓ Canvas apps 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |

Creates and clears [collections](/power-apps/maker/canvas-apps/working-with-data-sources#collections) and adds [records](/power-apps/maker/canvas-apps/working-with-tables#records) to any [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Collect



The **Collect** function adds records to a data source. The items to be added can be:

- A single value: The value is placed in the **[Value](function-value.md)** field of a new record. All other properties are left [blank](function-isblank-isempty.md).
- A record: Each named property is placed in the corresponding property of a new record. All other properties are left blank.
- A [table](/power-apps/maker/canvas-apps/working-with-tables): Each record of the table is added as a separate record of the data source as described above. The table isn't added as a nested table to a record. To do this, wrap the table in a record first.

When used with a collection, additional [columns](/power-apps/maker/canvas-apps/working-with-tables#columns) will be created as needed. The columns for other data sources are fixed by the data source and new columns can't be added.

If the data source doesn't already exist, a collection is created.

Collections are sometimes used to hold global variables or make a temporary copy of a data source. Canvas apps are based on formulas that automatically recalculate as the user interacts with an app. Collections don't enjoy this benefit and their use can make your app harder to create and understand. Before using a collection in this manner, review [working with variables](/power-apps/maker/canvas-apps/working-with-variables).

You can also use the **[Patch](function-patch.md)** function to create records in a data source.

**Collect** returns the modified data source as a table. **Collect** can only be used in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Clear



The **Clear** function deletes all the records of a collection. The columns of the collection will remain.

Note that **Clear** only operates on collections and not other data sources. You can use **[RemoveIf](function-remove-removeif.md)( _DataSource_, true )** for this purpose. Use caution as this will remove all records from the data source's storage and can affect other users.

You can use the **[Remove](function-remove-removeif.md)** function to selectively remove records.

**Clear** has no return value. It can only be used in a behavior formula.

## ClearCollect



The **ClearCollect** function deletes all the records from a collection. And then adds a different set of records to the same collection. With a single function, **ClearCollect** offers the combination of **Clear** and then **Collect**.

**ClearCollect** returns the modified collection as a table. **ClearCollect** can only be used in a behavior formula.

### Delegation

When used with a data source, these functions can't be delegated. Only the first portion of the data source will be retrieved and then the function applied. The result may not represent the complete story. A warning may appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](../maker/canvas-apps/delegation-overview.md).

## Syntax

**Collect**( _DataSource_, _Item_, ... )

- _DataSource_ – Required. The data source that you want to add data to. If it doesn't already exist, a new collection is created.
- _Item(s)_ - Required. One or more records or tables to add to the data source.

**Clear**( _Collection_ )

- _Collection_ – Required. The collection that you want to clear.

**ClearCollect**( _Collection_, _Item_, ... )

- _Collection_ – Required. The collection that you want to clear and then add data to.
- _Item(s)_ - Required. One or more records or tables to add to the data source.

## Examples

### Clearing and adding records to a data source

In these examples, you'll erase and add to a collection that's named **IceCream**. The data source begins with these contents:

![Sample data source.](media/function-clear-collect-clearcollect/icecream.png)

| Formula                                                                                                                                               | Description                                                                                                               | Result                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ClearCollect( IceCream, {&nbsp;Flavor:&nbsp;"Strawberry",&nbsp;Quantity:&nbsp;300&nbsp;} )**                                                        | Clears all data from the **IceCream** collection and then adds a record that includes a quantity of strawberry ice cream. | ![Table with one record.](media/function-clear-collect-clearcollect/icecream-clearcollect.png)<br><br>The **IceCream** collection has also been modified. |
| **Collect( IceCream, {&nbsp;Flavor:&nbsp;"Pistachio",&nbsp;Quantity:&nbsp;40&nbsp;}, {&nbsp;Flavor:&nbsp;"Orange",&nbsp;Quantity:&nbsp;200&nbsp;} )** | Adds two records to the **IceCream** collection that includes a quantity of pistachio and orange ice cream.               | ![Table with two records.](media/function-clear-collect-clearcollect/icecream-collect.png)<br><br>The **IceCream** collection has also been modified.     |
| **Clear( IceCream )**                                                                                                                                 | Removes all records from the **IceCream** collection.                                                                     | ![Empty table.](media/function-clear-collect-clearcollect/icecream-clear.png)<br><br>The **IceCream** collection has also been modified.                  |

For step-by-step examples of how to create a collection, see [Create and update a collection](/power-apps/maker/canvas-apps/create-update-collection).

### Records and tables

These examples examine how record and table arguments to **Collect** and **ClearCollect** are handled.

| Formula                                                                                                                                                                                        | Description                                                                                                                                                                                                                       | Result                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ClearCollect( IceCream, {&nbsp;Flavor:&nbsp;"Chocolate",&nbsp;Quantity:&nbsp;100&nbsp;}, {&nbsp;Flavor:&nbsp;"Vanilla",&nbsp;Quantity:&nbsp;200&nbsp;} )**                                   | Clear all data and then adds two records to the **IceCream** collection that includes a quantity of chocolate and vanilla ice cream. The records to be added are provided as individual arguments to the function.                | ![Chocolate and Vanilla records added to collection.](media/function-clear-collect-clearcollect/icecream.png) <br><br>The **IceCream** collection has also been modified.                                                    |
| **ClearCollect( IceCream, Table( {&nbsp;Flavor:&nbsp;"Chocolate",&nbsp;Quantity:&nbsp;100&nbsp;}, {&nbsp;Flavor:&nbsp;"Vanilla",&nbsp;Quantity:&nbsp;200&nbsp;} ) )**                          | Same as the previous example except that the records are combined in a table and passed in through a single argument. The contents of the table are extracted record by record before being added to the **IceCream** collection. | ![Chocolate and Vanilla records added to collection and modified.](media/function-clear-collect-clearcollect/icecream.png)<br><br>The **IceCream** collection has also been modified.                                        |
| **ClearCollect( IceCream,<br>{&nbsp;MyFavorites: Table( {&nbsp;Flavor:&nbsp;"Chocolate",&nbsp;Quantity:&nbsp;100&nbsp;}, {&nbsp;Flavor:&nbsp;"Vanilla",&nbsp;Quantity:&nbsp;200&nbsp;} ) } )** | Same as the previous example except that the table is wrapped in a record. The records of the table aren't extracted and instead the entire table is added as a cell of the record.                                               | ![Chocolate and Vanilla records added to collection modified with table wrapped in a record.](media/function-clear-collect-clearcollect/icecream-myfavorites.png)<br><br>The **IceCream** collection has also been modified. |

---

## SaveData, LoadData, and ClearData functions

Source: [function-savedata-loaddata.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-savedata-loaddata)

*Reference information including syntax and examples for the SaveData, LoadData, and ClearData functions.*

# SaveData, LoadData, and ClearData functions
**Applies to:** 
- ✓ Canvas apps



Saves and reloads a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) from the app host's storage.


## Description

The **SaveData** function stores a collection for later use under a name.

The **LoadData** function reloads a collection by name that was previously saved with **SaveData**. You can't use this function to load a collection from another source.

The **ClearData** function clears the storage under a specific name or clears all storage associated with the app if no name is provided.

> [!NOTE]
>
> - The name shared between **SaveData**, **LoadData**, and **ClearData** is a key, not a file name. It need not be complex as names are unique to each app and there is no danger of name conflict. The name must not contain any of these characters: `*".?:\<>|/`.
> - SaveData is limited to 1 MB of data for Power Apps running in Teams and in a web browser. There is no fixed limit for Power Apps running in a mobile player but there are practical limits discussed below.
> - Don't use **SaveData** to store sensitive data in the web since it'll be stored in plain text.

Use these functions to improve app-startup performance by:

- Caching data in the **[App.OnStart](/power-apps/maker/canvas-apps/controls/control-screen#additional-properties)** formula on a first run.
- Reloading the local cache on next runs.

You can also use these functions to add [simple offline capabilities](/power-apps/maker/canvas-apps/offline-apps) to your app.

You can't use these functions inside a browser when:

- Authoring the app in Power Apps Studio.

To test your app, run it in Power Apps Mobile on an iPhone or Android device.

These functions are limited by the amount of available app memory as they operate on an in-memory collection. Available memory can vary depending on factors such as:

- The device and operating system.
- The memory that the Power Apps player uses.
- Complexity of the app with screens and controls.

Test your app with expected scenarios on the type of devices you expect the app to run when storing large data. Expect to have between 30 MB and 70 MB of available memory generally.

These functions depend on the collection being implicitly defined with **[Collect](function-clear-collect-clearcollect.md)** or **[ClearCollect](function-clear-collect-clearcollect.md)**. You don't need to call **Collect** or **ClearCollect** to load data into the collection for defining it. It's a common case when using **LoadData** after a previous **SaveData**. All that is needed is the presence of these functions in a formula to implicitly define the structure of the collection. For more information, see [creating and removing variables](/power-apps/maker/canvas-apps/working-with-variables#create-and-remove-variables).

The loaded data will be appended to the collection. Use the **[Clear](function-clear-collect-clearcollect.md)** function before calling **LoadData** if you want to start with an empty collection.

## Data security

Consider carefully the isolation and encryption of data stored with **SaveData** and decide if it's appropriate for your needs, especially if devices are shared by multiple users.

Data stored with **SaveData** is isolated from other Power Apps by the Power Apps players. Data is stored based on the app's App ID, automatically isolating the **SaveData** name space between Power Apps.

The operating system and browser is responsible for isolating data between Power Apps and other apps on a device and with websites. For example, the operating system is responsible for isolating data stored in Microsoft Outlook from data stored in Power Apps, and also isolating that data from websites such as Bing.com or PowerApps.com. The operating system's built in app sandbox facilities are used for **SaveData** storage which is usually not accessible to or hidden from the user.
 
When using the same app, the operating system and browser is also responsible for isolating the data between different operating system level users. For example, if two different users share a computer and use two different Windows login credentials, the operating system is responsible for isolating data between the two Windows users.

Data may or may not be isolated between different Power Apps users if the operating system user is the same. Not every Power Apps player treats this the same way. For example, while logged in as the same Windows user, in the Power Apps player, the user signs out of Power Apps and signs in as a different Power Apps user. Data stored in an app before the change of Power Apps user, may be accessible to the second Power Apps user within the same app. The data may also be removed and the first Power Apps user may no longer be able to access it. The behavior varies between Power Apps players.

The operating system may also encrypt the data or you can use a mobile device management tool such as [Microsoft Intune](https://www.microsoft.com/microsoft-365/enterprise-mobility-security/microsoft-intune). Data stored when playing an app in a web browser is not encrypted.

## Syntax

**SaveData**( _Collection_, _Name_ )<br>**LoadData**( _Collection_, _Name_ [, *IgnoreNonexistentFile* ])

- _Collection_ - Required. Collection to be stored or loaded.
- _Name_ - Required. Name of the storage. The name must be same to save and load same set of data. The name space isn't shared with other apps. Names must not contain any of these characters: `*".?:\<>|/`.
- _IgnoreNonexistentFile_ - Optional. A Boolean value indicating what to do if the file doesn't already exist. Use _false_ (default) to return an error and _true_ to suppress the error.

**ClearData**( [*Name*] )

- _Name_ - Optional. Name of the storage previously saved with **SaveData**. If _Name_ is not provided, all storage associated with the app is cleared.

## Examples

| Formula                               | Description                                                                                                                         | Result                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **SaveData( LocalCache, "MyCache" )** | Save the **LocalCache** collection to the user's device under the name "MyCache", suitable for **LoadData** to retrieve later.      | Data is saved to the app host under the name "MyCache".     |
| **LoadData( LocalCache, "MyCache" )** | Loads the **LocalCache** collection from the user's device under the name "MyCache", previously stored with a call to **SaveData**. | Data is loaded from the app host under the name "MyCache".  |
| **ClearData( "MyCache" )**            | Clears the storage under the name "MyCache". Any data stored under this name will no longer be available through **LoadData**.      | Data is removed from the app host under the name "MyCache". |
| **ClearData()**                       | Clear all storage associated with this app. Data stored by other apps is not affected.                                              | All data is removed from the app host.                      |
|                                       |                                                                                                                                     |                                                             |

### Simple offline example

Following simple example captures and stores the names and pictures of everyday items while offline. It stores the information in the device's local storage for later use. This allows the app to be closed or the device to restart without losing data.

> [!NOTE]
> This example uses a camera control to capture images. Since **SaveData** is limited to 1 MB of data when running in Teams or a web browser, this example will not work with more than a few images. Also, depending on the camera, it may not work with even one image. Use a device to work through this full example, or remove the camera control and picture part of this example to run in Teams or in a web browser.

1. Create a blank canvas app with a tablet layout. For more details, read [creating an app from a template](/power-apps/maker/canvas-apps/get-started-test-drive) and select **Tablet layout** under **Blank app**.

1. Add a [**Text input**](/power-apps/maker/canvas-apps/controls/control-text-input) control and a [**Camera**](/power-apps/maker/canvas-apps/controls/control-camera) control and arrange them roughly as shown:

   > [!div class="mx-imgBorder"]  
   > ![A text input and camera control added to a blank screen.](media/function-savedata-loaddata/simple-text-camera.png)

1. Add a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control.

1. Double-click the button control to change the button text to **Add Item** (or modify the **Text** property).

1. Set the **OnSelect** property of the button control to this formula that will add an item to our collection:

   ```power-fx
   Collect( MyItems, { Item: TextInput1.Text, Picture: Camera1.Photo } )
   ```

   > [!div class="mx-imgBorder"]
   > ![A button control added with the text "Add Item" and the OnSelect property set](media/function-savedata-loaddata/simple-additem.png)

1. Add another **Button** control.

1. Double-click the button control to change the button text to **Save Data** (or modify the **Text** property).

1. Set the **OnSelect** property of the button control to this formula in order to save our collection to the local device:

   ```power-fx
   SaveData( MyItems, "LocalSavedItems" )
   ```

   > [!div class="mx-imgBorder"]
   > ![A button control added with the text "Save Data" and the OnSelect property set](media/function-savedata-loaddata/simple-savedata.png)

   It's tempting to test the button as it doesn't affect anything. But you'll only see an error as you're authoring in a web browser. Save the app first and open on a device before you follow the next steps to test this formula:

1. Add a third **Button** control.

1. Double-click the button control to change the button text to **Load Data** (or modify the **Text** property).

1. Set the **OnSelect** property of the button control to this formula in order to load our collection from the local device:

   ```power-fx
   LoadData( MyItems, "LocalSavedItems" )
   ```

   > [!div class="mx-imgBorder"]
   > ![A button control added with the text "Load Data" and the OnSelect property set](media/function-savedata-loaddata/simple-loaddata.png)

1. Add a [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) control with a Vertical layout that includes a picture and text areas:

   > [!div class="mx-imgBorder"]
   > ![Gallery variety selection, "Vertical" selected with image and text areas](media/function-savedata-loaddata/simple-gallery-add.png)

1. When prompted, select the **MyItems** collection as the data source for this gallery. This will set the **Items** property of the **Gallery** control:

   > [!div class="mx-imgBorder"]
   > ![Gallery selection of data source.](media/function-savedata-loaddata/simple-gallery-collection.png)
   > The image control in the gallery template should default its **Image** property to **ThisItem.Picture** and the label controls should both default their **Text** properties to **ThisItem.Item**. Check these formulas if after adding items in the following steps you don't see anything in the gallery.

1. Position the control to the right of the other controls:

   > [!div class="mx-imgBorder"]
   > ![Gallery repositioned to the right of the screen.](media/function-savedata-loaddata/simple-gallery-placed.png)

1. Save your app. If it's the first time it has been saved, there's no need to publish it. If it's not the first time, publish the app after you save.

1. Open your app on a device such as a phone or tablet. **SaveData** and **LoadData** can't be used in Studio or in a web browser. Refresh your app list if you don't see your app immediately, it can take a few seconds for the app to appear on your device. Signing out and back in to your account can help too.

   > [!div class="mx-imgBorder"]
   > ![App running with no items added.](media/function-savedata-loaddata/simple-mobile.png)
   > Once your app has been downloaded, you can disconnect from the network and run the app offline.

1. Enter the name and take a picture of an item.

1. Select the **Add Item** button. Repeat adding items a couple of times to load up your collection.

   > [!div class="mx-imgBorder"]
   > ![App running with three items added.](media/function-savedata-loaddata/simple-mobile-with3.png)

1. Select the **Save Data** button. This will save the data in your collection to your local device.

1. Close the app. Your collection in memory will be lost including all item names and pictures, but they'll still be there in the device's storage.

1. Launch the app again. The collection in memory will again show as empty in the gallery.

   > [!div class="mx-imgBorder"]
   > ![App again running with no items added.](media/function-savedata-loaddata/simple-mobile.png)

1. Select the **Load Data** button. The collection will be repopulated from the stored data on your device and your items will be back in the gallery. The collection was empty before this button calls the **LoadData** function; there was no need to call **Collect** or **ClearCollect** before loading the data from storage.

   > [!div class="mx-imgBorder"]
   > ![App running with three items restored after calling the LoadData function.](media/function-savedata-loaddata/simple-mobile-load1.png)

1. Select the **Load Data** button again. The stored data will be appended to the end of the collection and a scroll bar will appear on the gallery. If you would like to replace rather than append, use the **Clear** function first to clear out the collection before calling the **LoadData** function.
   > [!div class="mx-imgBorder"]
   > ![App running with six items restored after calling the LoadData function twice.](media/function-savedata-loaddata/simple-mobile-load2.png)

### More advanced offline example

For a detailed example, see the article on [simple offline capabilities](/power-apps/maker/canvas-apps/offline-apps).

---

## Color enumeration and ColorFade, ColorValue, and RGBA functions

Source: [function-colors.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-colors)

*Reference information including syntax and examples for the Color enumeration and ColorFade, ColorValue, and RGBA functions.*

# Color enumeration and ColorFade, ColorValue, and RGBA functions
| Functions | Applies to |
|-----------|------------|
| **Color** | 
- ✓ Model-driven apps |
| **ColorFade**</br>**ColorValue** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **RGBA** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Use built-in color values, define custom colors, and use the alpha channel to control transparency.

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) don't support the **Color** enumeration.

## Description

Use the **Color** enumeration to access colors defined by HTML's Cascading Style Sheets (CSS). For example, **Color.Red** returns pure red. A list of these colors appears at the end of this article.

The **ColorValue** function returns a color based on a CSS color string. The string can be in any of these forms:

- **CSS color name:** **"RoxyBrown"** and **"OliveDrab"** are examples. These names don't include spaces. The list of supported colors appears later in this article.
- **6-digit hex value:** For example, **"#ffd700"** is the same as **"Gold"**. The string uses the format "#_rrggbb_", where _rr_ is the red portion in two hexadecimal digits, _gg_ is the green, and _bb_ is the blue.
- **8-digit hex value:** For example, **"#ff7f5080"** is the same as **"Coral"** with a 50% alpha channel. The string uses the format "#_rrggbbaa_", where _rr_, _gg_, and _bb_ are identical to the 6-digit form. The alpha channel is represented by _aa_: **00** means fully transparent, and **ff** means fully opaque.

The **RGBA** function returns a color based on red, green, and blue components. The function also includes an alpha channel for mixing colors of controls layered in front of each other. The alpha channel ranges from 0% or 0% (fully transparent and invisible) to 1% or 100% (fully opaque and completely blocks any layers behind a control).

The **ColorFade** function returns a brighter or darker version of a color. The amount of fade ranges from -1 (fully darkens a color to black), to 0 (doesn't affect the color), to 1 (fully brightens a color to white).

## Alpha channel

In a canvas app, you layer controls in front of one another and set the transparency of a control to any controls behind it. As a result, colors blend through the layers. For example, this diagram shows how the three primary colors mix with an alpha setting of 50 percent:

> [!div class="mx-imgBorder"]
> ![Three primary colors with an alpha setting of 50%.](media/function-colors/alpha-primary.png)

You can also blend images in file formats that support alpha channels. For example, you can't blend .jpeg files, but you can blend .png files. The next graphic shows the same red, green, and blue colors from the previous example, but the red color appears as a squiggle (instead of a circle) in a .png file with a 50 percent alpha channel:

> [!div class="mx-imgBorder"]
> ![Red squiggle with an alpha setting of 50% in front of blue and green circles.](media/function-colors/alpha-image.png)

If you specify a **Color** enumeration value or build a **ColorValue** formula with a color name or a 6-digit hexadecimal value, the alpha setting is 100 percent, which is fully opaque.

## Syntax

**Color**._ColorName_

- _ColorName_ - Required. A Cascading Style Sheet (CSS) color name. The list of possible enumeration values is at the end of this article.

**ColorValue**( _CSSColor_ )

- _CSSColor_ - Required. A Cascading Style Sheet (CSS) color definition. S name, OliveDralike a hex value, like **#6b8e23** olikeffd420**. Hex values can use either #_rrggbb__usgormat. format

**ColorValue**( _Dynamic_ )

- _Dynamic_ - Required. A **Dynamic** value with a string that represents a Cascading Style Sheet (CSS) color definition.

**RGBA**( _Red_, _Green_, _Blue_, _Alpha_ )

- _Red_, _Green_, _Blue_ - Required. Color component values that range from 0 (no saturation) to 255 (full saturation).
- _Alpha_ - Required. Alpha component that ranges from 0 (fully transparent) to 1 (fully opaque). You can also use a percentage, 0% to 100%.

**ColorFade**( _Color_, _FadeAmount_ )

- _Color_ - Required. A color value like **Color.Red** or the output from **ColorValue** or **RGBA**.
- _FadeAmount_ - Required. A number between -1 and 1. -1 fully darkens a color to black, 0 doesn't affect the color, and 1 fully brightens a color to white. You can also use a percentage, from -100% to 100%.

## Built-in colors

| Color enumeration              | ColorValue                                                                        | RGBA                                                  | Color Swatch                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Color.AliceBlue**            | **ColorValue( "#f0f8ff"&nbsp;)**<br>**ColorValue( "aliceblue"&nbsp;)**            | **RGBA(&nbsp;240,&nbsp;248,&nbsp;255,&nbsp;1&nbsp;)** | ![aliceblue.](./media/function-colors/color-aliceblue.png)                       |
| **Color.AntiqueWhite**         | **ColorValue( "#faebd7"&nbsp;)**<br>**ColorValue( "AntiqueWhite"&nbsp;)**         | **RGBA(&nbsp;250,&nbsp;235,&nbsp;215,&nbsp;1&nbsp;)** | ![antiquewhite.](./media/function-colors/color-antiquewhite.png)                 |
| **Color.Aqua**                 | **ColorValue( "#00ffff"&nbsp;)**<br>**ColorValue( "AQUA"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;255,&nbsp;255,&nbsp;1&nbsp;)**   | ![aqua.](./media/function-colors/color-aqua.png)                                 |
| **Color.Aquamarine**           | **ColorValue( "#7fffd4"&nbsp;)**<br>**ColorValue( "Aquamarine"&nbsp;)**           | **RGBA(&nbsp;127,&nbsp;255,&nbsp;212,&nbsp;1&nbsp;)** | ![aquamarine.](./media/function-colors/color-aquamarine.png)                     |
| **Color.Azure**                | **ColorValue( "#f0ffff"&nbsp;)**<br>**ColorValue( "azure"&nbsp;)**                | **RGBA(&nbsp;240,&nbsp;255,&nbsp;255,&nbsp;1&nbsp;)** | ![azure.](./media/function-colors/color-azure.png)                               |
| **Color.Beige**                | **ColorValue( "#f5f5dc"&nbsp;)**<br>**ColorValue( "Beige"&nbsp;)**                | **RGBA(&nbsp;245,&nbsp;245,&nbsp;220,&nbsp;1&nbsp;)** | ![beige.](./media/function-colors/color-beige.png)                               |
| **Color.Bisque**               | **ColorValue( "#ffe4c4"&nbsp;)**<br>**ColorValue( "BISQUE"&nbsp;)**               | **RGBA(&nbsp;255,&nbsp;228,&nbsp;196,&nbsp;1&nbsp;)** | ![bisque.](./media/function-colors/color-bisque.png)                             |
| **Color.Black**                | **ColorValue( "#000000"&nbsp;)**<br>**ColorValue( "Black"&nbsp;)**                | **RGBA(&nbsp;0,&nbsp;0,&nbsp;0,&nbsp;1&nbsp;)**       | ![black.](./media/function-colors/color-black.png)                               |
| **Color.BlanchedAlmond**       | **ColorValue( "#ffebcd"&nbsp;)**<br>**ColorValue( "blanchedalmond"&nbsp;)**       | **RGBA(&nbsp;255,&nbsp;235,&nbsp;205,&nbsp;1&nbsp;)** | ![blanchedalmond.](./media/function-colors/color-blanchedalmond.png)             |
| **Color.Blue**                 | **ColorValue( "#0000ff"&nbsp;)**<br>**ColorValue( "Blue"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;0,&nbsp;255,&nbsp;1&nbsp;)**     | ![blue.](./media/function-colors/color-blue.png)                                 |
| **Color.BlueViolet**           | **ColorValue( "#8a2be2"&nbsp;)**<br>**ColorValue( "BLUEVIOLET"&nbsp;)**           | **RGBA(&nbsp;138,&nbsp;43,&nbsp;226,&nbsp;1&nbsp;)**  | ![blueviolet.](./media/function-colors/color-blueviolet.png)                     |
| **Color.Brown**                | **ColorValue( "#a52a2a"&nbsp;)**<br>**ColorValue( "Brown"&nbsp;)**                | **RGBA(&nbsp;165,&nbsp;42,&nbsp;42,&nbsp;1&nbsp;)**   | ![brown.](./media/function-colors/color-brown.png)                               |
| **Color.Burlywood**            | **ColorValue( "#deb887"&nbsp;)**<br>**ColorValue( "burlywood"&nbsp;)**            | **RGBA(&nbsp;222,&nbsp;184,&nbsp;135,&nbsp;1&nbsp;)** | ![burlywood.](./media/function-colors/color-burlywood.png)                       |
| **Color.CadetBlue**            | **ColorValue( "#5f9ea0"&nbsp;)**<br>**ColorValue( "CadetBlue"&nbsp;)**            | **RGBA(&nbsp;95,&nbsp;158,&nbsp;160,&nbsp;1&nbsp;)**  | ![cadetblue.](./media/function-colors/color-cadetblue.png)                       |
| **Color.Chartreuse**           | **ColorValue( "#7fff00"&nbsp;)**<br>**ColorValue( "CHARTREUSE"&nbsp;)**           | **RGBA(&nbsp;127,&nbsp;255,&nbsp;0,&nbsp;1&nbsp;)**   | ![chartreuse.](./media/function-colors/color-chartreuse.png)                     |
| **Color.Chocolate**            | **ColorValue( "#d2691e"&nbsp;)**<br>**ColorValue( "Chocolate"&nbsp;)**            | **RGBA(&nbsp;210,&nbsp;105,&nbsp;30,&nbsp;1&nbsp;)**  | ![chocolate.](./media/function-colors/color-chocolate.png)                       |
| **Color.Coral**                | **ColorValue( "#ff7f50"&nbsp;)**<br>**ColorValue( "coral"&nbsp;)**                | **RGBA(&nbsp;255,&nbsp;127,&nbsp;80,&nbsp;1&nbsp;)**  | ![coral.](./media/function-colors/color-coral.png)                               |
| **Color.CornflowerBlue**       | **ColorValue( "#6495ed"&nbsp;)**<br>**ColorValue( "CornflowerBlue"&nbsp;)**       | **RGBA(&nbsp;100,&nbsp;149,&nbsp;237,&nbsp;1&nbsp;)** | ![cornflowerblue.](./media/function-colors/color-cornflowerblue.png)             |
| **Color.Cornsilk**             | **ColorValue( "#fff8dc"&nbsp;)**<br>**ColorValue( "CORNSILK"&nbsp;)**             | **RGBA(&nbsp;255,&nbsp;248,&nbsp;220,&nbsp;1&nbsp;)** | ![cornsilk.](./media/function-colors/color-cornsilk.png)                         |
| **Color.Crimson**              | **ColorValue( "#dc143c"&nbsp;)**<br>**ColorValue( "Crimson"&nbsp;)**              | **RGBA(&nbsp;220,&nbsp;20,&nbsp;60,&nbsp;1&nbsp;)**   | ![crimson.](./media/function-colors/color-crimson.png)                           |
| **Color.Cyan**                 | **ColorValue( "#00ffff"&nbsp;)**<br>**ColorValue( "cyan"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;255,&nbsp;255,&nbsp;1&nbsp;)**   | ![cyan.](./media/function-colors/color-cyan.png)                                 |
| **Color.DarkBlue**             | **ColorValue( "#00008b"&nbsp;)**<br>**ColorValue( "DarkBlue"&nbsp;)**             | **RGBA(&nbsp;0,&nbsp;0,&nbsp;139,&nbsp;1&nbsp;)**     | ![darkblue.](./media/function-colors/color-darkblue.png)                         |
| **Color.DarkCyan**             | **ColorValue( "#008b8b"&nbsp;)**<br>**ColorValue( "DARKCYAN"&nbsp;)**             | **RGBA(&nbsp;0,&nbsp;139,&nbsp;139,&nbsp;1&nbsp;)**   | ![darkcyan.](./media/function-colors/color-darkcyan.png)                         |
| **Color.DarkGoldenRod**        | **ColorValue( "#b8860b"&nbsp;)**<br>**ColorValue( "DarkGoldenRod"&nbsp;)**        | **RGBA(&nbsp;184,&nbsp;134,&nbsp;11,&nbsp;1&nbsp;)**  | ![darkgoldenrod.](./media/function-colors/color-darkgoldenrod.png)               |
| **Color.DarkGray**             | **ColorValue( "#a9a9a9"&nbsp;)**<br>**ColorValue( "darkgray"&nbsp;)**             | **RGBA(&nbsp;169,&nbsp;169,&nbsp;169,&nbsp;1&nbsp;)** | ![darkgray.](./media/function-colors/color-darkgray.png)                         |
| **Color.DarkGreen**            | **ColorValue( "#006400"&nbsp;)**<br>**ColorValue( "DarkGreen"&nbsp;)**            | **RGBA(&nbsp;0,&nbsp;100,&nbsp;0,&nbsp;1&nbsp;)**     | ![darkgreen.](./media/function-colors/color-darkgreen.png)                       |
| **Color.DarkGrey**             | **ColorValue( "#a9a9a9"&nbsp;)**<br>**ColorValue( "DARKGREY"&nbsp;)**             | **RGBA(&nbsp;169,&nbsp;169,&nbsp;169,&nbsp;1&nbsp;)** | ![darkgrey.](./media/function-colors/color-darkgrey.png)                         |
| **Color.DarkKhaki**            | **ColorValue( "#bdb76b"&nbsp;)**<br>**ColorValue( "DarkKhaki"&nbsp;)**            | **RGBA(&nbsp;189,&nbsp;183,&nbsp;107,&nbsp;1&nbsp;)** | ![darkkhaki.](./media/function-colors/color-darkkhaki.png)                       |
| **Color.DarkMagenta**          | **ColorValue( "#8b008b"&nbsp;)**<br>**ColorValue( "darkmagenta"&nbsp;)**          | **RGBA(&nbsp;139,&nbsp;0,&nbsp;139,&nbsp;1&nbsp;)**   | ![darkmagenta.](./media/function-colors/color-darkmagenta.png)                   |
| **Color.DarkOliveGreen**       | **ColorValue( "#556b2f"&nbsp;)**<br>**ColorValue( "DarkOliveGreen"&nbsp;)**       | **RGBA(&nbsp;85,&nbsp;107,&nbsp;47,&nbsp;1&nbsp;)**   | ![darkolivegreen.](./media/function-colors/color-darkolivegreen.png)             |
| **Color.DarkOrange**           | **ColorValue( "#ff8c00"&nbsp;)**<br>**ColorValue( "DARKORANGE"&nbsp;)**           | **RGBA(&nbsp;255,&nbsp;140,&nbsp;0,&nbsp;1&nbsp;)**   | ![darkorange.](./media/function-colors/color-darkorange.png)                     |
| **Color.DarkOrchid**           | **ColorValue( "#9932cc"&nbsp;)**<br>**ColorValue( "DarkOrchid"&nbsp;)**           | **RGBA(&nbsp;153,&nbsp;50,&nbsp;204,&nbsp;1&nbsp;)**  | ![darkorchid.](./media/function-colors/color-darkorchid.png)                     |
| **Color.DarkRed**              | **ColorValue( "#8b0000"&nbsp;)**<br>**ColorValue( "darkred"&nbsp;)**              | **RGBA(&nbsp;139,&nbsp;0,&nbsp;0,&nbsp;1&nbsp;)**     | ![darkred.](./media/function-colors/color-darkred.png)                           |
| **Color.DarkSalmon**           | **ColorValue( "#e9967a"&nbsp;)**<br>**ColorValue( "DarkSalmon"&nbsp;)**           | **RGBA(&nbsp;233,&nbsp;150,&nbsp;122,&nbsp;1&nbsp;)** | ![darksalmon.](./media/function-colors/color-darksalmon.png)                     |
| **Color.DarkSeaGreen**         | **ColorValue( "#8fbc8f"&nbsp;)**<br>**ColorValue( "DARKSEAGREEN"&nbsp;)**         | **RGBA(&nbsp;143,&nbsp;188,&nbsp;143,&nbsp;1&nbsp;)** | ![darkseagreen.](./media/function-colors/color-darkseagreen.png)                 |
| **Color.DarkSlateBlue**        | **ColorValue( "#483d8b"&nbsp;)**<br>**ColorValue( "DarkSlateBlue"&nbsp;)**        | **RGBA(&nbsp;72,&nbsp;61,&nbsp;139,&nbsp;1&nbsp;)**   | ![darkslateblue.](./media/function-colors/color-darkslateblue.png)               |
| **Color.DarkSlateGray**        | **ColorValue( "#2f4f4f"&nbsp;)**<br>**ColorValue( "darkslategray"&nbsp;)**        | **RGBA(&nbsp;47,&nbsp;79,&nbsp;79,&nbsp;1&nbsp;)**    | ![darkslategray.](./media/function-colors/color-darkslategray.png)               |
| **Color.DarkSlateGrey**        | **ColorValue( "#2f4f4f"&nbsp;)**<br>**ColorValue( "DarkSlateGrey"&nbsp;)**        | **RGBA(&nbsp;47,&nbsp;79,&nbsp;79,&nbsp;1&nbsp;)**    | ![darkslategrey.](./media/function-colors/color-darkslategrey.png)               |
| **Color.DarkTurquoise**        | **ColorValue( "#00ced1"&nbsp;)**<br>**ColorValue( "DARKTURQUOISE"&nbsp;)**        | **RGBA(&nbsp;0,&nbsp;206,&nbsp;209,&nbsp;1&nbsp;)**   | ![darkturquoise.](./media/function-colors/color-darkturquoise.png)               |
| **Color.DarkViolet**           | **ColorValue( "#9400d3"&nbsp;)**<br>**ColorValue( "DarkViolet"&nbsp;)**           | **RGBA(&nbsp;148,&nbsp;0,&nbsp;211,&nbsp;1&nbsp;)**   | ![darkviolet.](./media/function-colors/color-darkviolet.png)                     |
| **Color.DeepPink**             | **ColorValue( "#ff1493"&nbsp;)**<br>**ColorValue( "deeppink"&nbsp;)**             | **RGBA(&nbsp;255,&nbsp;20,&nbsp;147,&nbsp;1&nbsp;)**  | ![deeppink.](./media/function-colors/color-deeppink.png)                         |
| **Color.DeepSkyBlue**          | **ColorValue( "#00bfff"&nbsp;)**<br>**ColorValue( "DeepSkyBlue"&nbsp;)**          | **RGBA(&nbsp;0,&nbsp;191,&nbsp;255,&nbsp;1&nbsp;)**   | ![deepskyblue.](./media/function-colors/color-deepskyblue.png)                   |
| **Color.DimGray**              | **ColorValue( "#696969"&nbsp;)**<br>**ColorValue( "DIMGRAY"&nbsp;)**              | **RGBA(&nbsp;105,&nbsp;105,&nbsp;105,&nbsp;1&nbsp;)** | ![dimgray.](./media/function-colors/color-dimgray.png)                           |
| **Color.DimGrey**              | **ColorValue( "#696969"&nbsp;)**<br>**ColorValue( "DimGrey"&nbsp;)**              | **RGBA(&nbsp;105,&nbsp;105,&nbsp;105,&nbsp;1&nbsp;)** | ![dimgrey.](./media/function-colors/color-dimgrey.png)                           |
| **Color.DodgerBlue**           | **ColorValue( "#1e90ff"&nbsp;)**<br>**ColorValue( "dodgerblue"&nbsp;)**           | **RGBA(&nbsp;30,&nbsp;144,&nbsp;255,&nbsp;1&nbsp;)**  | ![dodgerblue.](./media/function-colors/color-dodgerblue.png)                     |
| **Color.FireBrick**            | **ColorValue( "#b22222"&nbsp;)**<br>**ColorValue( "FireBrick"&nbsp;)**            | **RGBA(&nbsp;178,&nbsp;34,&nbsp;34,&nbsp;1&nbsp;)**   | ![firebrick.](./media/function-colors/color-firebrick.png)                       |
| **Color.FloralWhite**          | **ColorValue( "#fffaf0"&nbsp;)**<br>**ColorValue( "FLORALWHITE"&nbsp;)**          | **RGBA(&nbsp;255,&nbsp;250,&nbsp;240,&nbsp;1&nbsp;)** | ![floralwhite.](./media/function-colors/color-floralwhite.png)                   |
| **Color.ForestGreen**          | **ColorValue( "#228b22"&nbsp;)**<br>**ColorValue( "ForestGreen"&nbsp;)**          | **RGBA(&nbsp;34,&nbsp;139,&nbsp;34,&nbsp;1&nbsp;)**   | ![forestgreen.](./media/function-colors/color-forestgreen.png)                   |
| **Color.Fuchsia**              | **ColorValue( "#ff00ff"&nbsp;)**<br>**ColorValue( "fuchsia"&nbsp;)**              | **RGBA(&nbsp;255,&nbsp;0,&nbsp;255,&nbsp;1&nbsp;)**   | ![fuchsia.](./media/function-colors/color-fuchsia.png)                           |
| **Color.Gainsboro**            | **ColorValue( "#dcdcdc"&nbsp;)**<br>**ColorValue( "Gainsboro"&nbsp;)**            | **RGBA(&nbsp;220,&nbsp;220,&nbsp;220,&nbsp;1&nbsp;)** | ![gainsboro.](./media/function-colors/color-gainsboro.png)                       |
| **Color.GhostWhite**           | **ColorValue( "#f8f8ff"&nbsp;)**<br>**ColorValue( "GHOSTWHITE"&nbsp;)**           | **RGBA(&nbsp;248,&nbsp;248,&nbsp;255,&nbsp;1&nbsp;)** | ![ghostwhite.](./media/function-colors/color-ghostwhite.png)                     |
| **Color.Gold**                 | **ColorValue( "#ffd700"&nbsp;)**<br>**ColorValue( "Gold"&nbsp;)**                 | **RGBA(&nbsp;255,&nbsp;215,&nbsp;0,&nbsp;1&nbsp;)**   | ![gold.](./media/function-colors/color-gold.png)                                 |
| **Color.GoldenRod**            | **ColorValue( "#daa520"&nbsp;)**<br>**ColorValue( "goldenrod"&nbsp;)**            | **RGBA(&nbsp;218,&nbsp;165,&nbsp;32,&nbsp;1&nbsp;)**  | ![goldenrod.](./media/function-colors/color-goldenrod.png)                       |
| **Color.Gray**                 | **ColorValue( "#808080"&nbsp;)**<br>**ColorValue( "Gray"&nbsp;)**                 | **RGBA(&nbsp;128,&nbsp;128,&nbsp;128,&nbsp;1&nbsp;)** | ![gray.](./media/function-colors/color-gray.png)                                 |
| **Color.Green**                | **ColorValue( "#008000"&nbsp;)**<br>**ColorValue( "GREEN"&nbsp;)**                | **RGBA(&nbsp;0,&nbsp;128,&nbsp;0,&nbsp;1&nbsp;)**     | ![green.](./media/function-colors/color-green.png)                               |
| **Color.GreenYellow**          | **ColorValue( "#adff2f"&nbsp;)**<br>**ColorValue( "GreenYellow"&nbsp;)**          | **RGBA(&nbsp;173,&nbsp;255,&nbsp;47,&nbsp;1&nbsp;)**  | ![greenyellow.](./media/function-colors/color-greenyellow.png)                   |
| **Color.Grey**                 | **ColorValue( "#808080"&nbsp;)**<br>**ColorValue( "grey"&nbsp;)**                 | **RGBA(&nbsp;128,&nbsp;128,&nbsp;128,&nbsp;1&nbsp;)** | ![grey.](./media/function-colors/color-grey.png)                                 |
| **Color.Honeydew**             | **ColorValue( "#f0fff0"&nbsp;)**<br>**ColorValue( "Honeydew"&nbsp;)**             | **RGBA(&nbsp;240,&nbsp;255,&nbsp;240,&nbsp;1&nbsp;)** | ![honeydew.](./media/function-colors/color-honeydew.png)                         |
| **Color.HotPink**              | **ColorValue( "#ff69b4"&nbsp;)**<br>**ColorValue( "HOTPINK"&nbsp;)**              | **RGBA(&nbsp;255,&nbsp;105,&nbsp;180,&nbsp;1&nbsp;)** | ![hotpink.](./media/function-colors/color-hotpink.png)                           |
| **Color.IndianRed**            | **ColorValue( "#cd5c5c"&nbsp;)**<br>**ColorValue( "IndianRed"&nbsp;)**            | **RGBA(&nbsp;205,&nbsp;92,&nbsp;92,&nbsp;1&nbsp;)**   | ![indianred.](./media/function-colors/color-indianred.png)                       |
| **Color.Indigo**               | **ColorValue( "#4b0082"&nbsp;)**<br>**ColorValue( "indigo"&nbsp;)**               | **RGBA(&nbsp;75,&nbsp;0,&nbsp;130,&nbsp;1&nbsp;)**    | ![indigo.](./media/function-colors/color-indigo.png)                             |
| **Color.Ivory**                | **ColorValue( "#fffff0"&nbsp;)**<br>**ColorValue( "Ivory"&nbsp;)**                | **RGBA(&nbsp;255,&nbsp;255,&nbsp;240,&nbsp;1&nbsp;)** | ![ivory.](./media/function-colors/color-ivory.png)                               |
| **Color.Khaki**                | **ColorValue( "#f0e68c"&nbsp;)**<br>**ColorValue( "KHAKI"&nbsp;)**                | **RGBA(&nbsp;240,&nbsp;230,&nbsp;140,&nbsp;1&nbsp;)** | ![khaki.](./media/function-colors/color-khaki.png)                               |
| **Color.Lavender**             | **ColorValue( "#e6e6fa"&nbsp;)**<br>**ColorValue( "Lavender"&nbsp;)**             | **RGBA(&nbsp;230,&nbsp;230,&nbsp;250,&nbsp;1&nbsp;)** | ![lavender.](./media/function-colors/color-lavender.png)                         |
| **Color.LavenderBlush**        | **ColorValue( "#fff0f5"&nbsp;)**<br>**ColorValue( "lavenderblush"&nbsp;)**        | **RGBA(&nbsp;255,&nbsp;240,&nbsp;245,&nbsp;1&nbsp;)** | ![lavenderblush.](./media/function-colors/color-lavenderblush.png)               |
| **Color.LawnGreen**            | **ColorValue( "#7cfc00"&nbsp;)**<br>**ColorValue( "LawnGreen"&nbsp;)**            | **RGBA(&nbsp;124,&nbsp;252,&nbsp;0,&nbsp;1&nbsp;)**   | ![lawngreen.](./media/function-colors/color-lawngreen.png)                       |
| **Color.LemonChiffon**         | **ColorValue( "#fffacd"&nbsp;)**<br>**ColorValue( "LEMONCHIFFON"&nbsp;)**         | **RGBA(&nbsp;255,&nbsp;250,&nbsp;205,&nbsp;1&nbsp;)** | ![lemonchiffon.](./media/function-colors/color-lemonchiffon.png)                 |
| **Color.LightBlue**            | **ColorValue( "#add8e6"&nbsp;)**<br>**ColorValue( "LightBlue"&nbsp;)**            | **RGBA(&nbsp;173,&nbsp;216,&nbsp;230,&nbsp;1&nbsp;)** | ![lightblue.](./media/function-colors/color-lightblue.png)                       |
| **Color.LightCoral**           | **ColorValue( "#f08080"&nbsp;)**<br>**ColorValue( "lightcoral"&nbsp;)**           | **RGBA(&nbsp;240,&nbsp;128,&nbsp;128,&nbsp;1&nbsp;)** | ![lightcoral.](./media/function-colors/color-lightcoral.png)                     |
| **Color.LightCyan**            | **ColorValue( "#e0ffff"&nbsp;)**<br>**ColorValue( "LightCyan"&nbsp;)**            | **RGBA(&nbsp;224,&nbsp;255,&nbsp;255,&nbsp;1&nbsp;)** | ![lightcyan.](./media/function-colors/color-lightcyan.png)                       |
| **Color.LightGoldenRodYellow** | **ColorValue( "#fafad2"&nbsp;)**<br>**ColorValue( "lightgoldenrodyellow"&nbsp;)** | **RGBA(&nbsp;250,&nbsp;250,&nbsp;210,&nbsp;1&nbsp;)** | ![lightgoldenrodyellow.](./media/function-colors/color-lightgoldenrodyellow.png) |
| **Color.LightGray**            | **ColorValue( "#d3d3d3"&nbsp;)**<br>**ColorValue( "LightGray"&nbsp;)**            | **RGBA(&nbsp;211,&nbsp;211,&nbsp;211,&nbsp;1&nbsp;)** | ![lightgray.](./media/function-colors/color-lightgray.png)                       |
| **Color.LightGreen**           | **ColorValue( "#90ee90"&nbsp;)**<br>**ColorValue( "lightgreen"&nbsp;)**           | **RGBA(&nbsp;144,&nbsp;238,&nbsp;144,&nbsp;1&nbsp;)** | ![lightgreen.](./media/function-colors/color-lightgreen.png)                     |
| **Color.LightGrey**            | **ColorValue( "#d3d3d3"&nbsp;)**<br>**ColorValue( "LightGrey"&nbsp;)**            | **RGBA(&nbsp;211,&nbsp;211,&nbsp;211,&nbsp;1&nbsp;)** | ![lightgrey.](./media/function-colors/color-lightgrey.png)                       |
| **Color.LightPink**            | **ColorValue( "#ffb6c1"&nbsp;)**<br>**ColorValue( "LIGHTPINK"&nbsp;)**            | **RGBA(&nbsp;255,&nbsp;182,&nbsp;193,&nbsp;1&nbsp;)** | ![lightpink.](./media/function-colors/color-lightpink.png)                       |
| **Color.LightSalmon**          | **ColorValue( "#ffa07a"&nbsp;)**<br>**ColorValue( "LightSalmon"&nbsp;)**          | **RGBA(&nbsp;255,&nbsp;160,&nbsp;122,&nbsp;1&nbsp;)** | ![lightsalmon.](./media/function-colors/color-lightsalmon.png)                   |
| **Color.LightSeaGreen**        | **ColorValue( "#20b2aa"&nbsp;)**<br>**ColorValue( "lightseagreen"&nbsp;)**        | **RGBA(&nbsp;32,&nbsp;178,&nbsp;170,&nbsp;1&nbsp;)**  | ![lightseagreen.](./media/function-colors/color-lightseagreen.png)               |
| **Color.LightSkyBlue**         | **ColorValue( "#87cefa"&nbsp;)**<br>**ColorValue( "LightSkyBlue"&nbsp;)**         | **RGBA(&nbsp;135,&nbsp;206,&nbsp;250,&nbsp;1&nbsp;)** | ![lightskyblue.](./media/function-colors/color-lightskyblue.png)                 |
| **Color.LightSlateGray**       | **ColorValue( "#778899"&nbsp;)**<br>**ColorValue( "LIGHTSLATEGRAY"&nbsp;)**       | **RGBA(&nbsp;119,&nbsp;136,&nbsp;153,&nbsp;1&nbsp;)** | ![lightslategray.](./media/function-colors/color-lightslategray.png)             |
| **Color.LightSlateGrey**       | **ColorValue( "#778899"&nbsp;)**<br>**ColorValue( "LightSlateGrey"&nbsp;)**       | **RGBA(&nbsp;119,&nbsp;136,&nbsp;153,&nbsp;1&nbsp;)** | ![lightslategrey.](./media/function-colors/color-lightslategrey.png)             |
| **Color.LightSteelBlue**       | **ColorValue( "#b0c4de"&nbsp;)**<br>**ColorValue( "lightsteelblue"&nbsp;)**       | **RGBA(&nbsp;176,&nbsp;196,&nbsp;222,&nbsp;1&nbsp;)** | ![lightsteelblue.](./media/function-colors/color-lightsteelblue.png)             |
| **Color.LightYellow**          | **ColorValue( "#ffffe0"&nbsp;)**<br>**ColorValue( "LightYellow"&nbsp;)**          | **RGBA(&nbsp;255,&nbsp;255,&nbsp;224,&nbsp;1&nbsp;)** | ![lightyellow.](./media/function-colors/color-lightyellow.png)                   |
| **Color.Lime**                 | **ColorValue( "#00ff00"&nbsp;)**<br>**ColorValue( "LIME"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;255,&nbsp;0,&nbsp;1&nbsp;)**     | ![lime.](./media/function-colors/color-lime.png)                                 |
| **Color.LimeGreen**            | **ColorValue( "#32cd32"&nbsp;)**<br>**ColorValue( "LimeGreen"&nbsp;)**            | **RGBA(&nbsp;50,&nbsp;205,&nbsp;50,&nbsp;1&nbsp;)**   | ![limegreen.](./media/function-colors/color-limegreen.png)                       |
| **Color.Linen**                | **ColorValue( "#faf0e6"&nbsp;)**<br>**ColorValue( "linen"&nbsp;)**                | **RGBA(&nbsp;250,&nbsp;240,&nbsp;230,&nbsp;1&nbsp;)** | ![linen.](./media/function-colors/color-linen.png)                               |
| **Color.Magenta**              | **ColorValue( "#ff00ff"&nbsp;)**<br>**ColorValue( "Magenta"&nbsp;)**              | **RGBA(&nbsp;255,&nbsp;0,&nbsp;255,&nbsp;1&nbsp;)**   | ![magenta.](./media/function-colors/color-magenta.png)                           |
| **Color.Maroon**               | **ColorValue( "#800000"&nbsp;)**<br>**ColorValue( "MAROON"&nbsp;)**               | **RGBA(&nbsp;128,&nbsp;0,&nbsp;0,&nbsp;1&nbsp;)**     | ![maroon.](./media/function-colors/color-maroon.png)                             |
| **Color.MediumAquamarine**     | **ColorValue( "#66cdaa"&nbsp;)**<br>**ColorValue( "MediumAquamarine"&nbsp;)**     | **RGBA(&nbsp;102,&nbsp;205,&nbsp;170,&nbsp;1&nbsp;)** | ![mediumaquamarine.](./media/function-colors/color-mediumaquamarine.png)         |
| **Color.MediumBlue**           | **ColorValue( "#0000cd"&nbsp;)**<br>**ColorValue( "mediumblue"&nbsp;)**           | **RGBA(&nbsp;0,&nbsp;0,&nbsp;205,&nbsp;1&nbsp;)**     | ![mediumblue.](./media/function-colors/color-mediumblue.png)                     |
| **Color.MediumOrchid**         | **ColorValue( "#ba55d3"&nbsp;)**<br>**ColorValue( "MediumOrchid"&nbsp;)**         | **RGBA(&nbsp;186,&nbsp;85,&nbsp;211,&nbsp;1&nbsp;)**  | ![mediumorchid.](./media/function-colors/color-mediumorchid.png)                 |
| **Color.MediumPurple**         | **ColorValue( "#9370db"&nbsp;)**<br>**ColorValue( "MEDIUMPURPLE"&nbsp;)**         | **RGBA(&nbsp;147,&nbsp;112,&nbsp;219,&nbsp;1&nbsp;)** | ![mediumpurple.](./media/function-colors/color-mediumpurple.png)                 |
| **Color.MediumSeaGreen**       | **ColorValue( "#3cb371"&nbsp;)**<br>**ColorValue( "MediumSeaGreen"&nbsp;)**       | **RGBA(&nbsp;60,&nbsp;179,&nbsp;113,&nbsp;1&nbsp;)**  | ![mediumseagreen.](./media/function-colors/color-mediumseagreen.png)             |
| **Color.MediumSlateBlue**      | **ColorValue( "#7b68ee"&nbsp;)**<br>**ColorValue( "mediumslateblue"&nbsp;)**      | **RGBA(&nbsp;123,&nbsp;104,&nbsp;238,&nbsp;1&nbsp;)** | ![mediumslateblue.](./media/function-colors/color-mediumslateblue.png)           |
| **Color.MediumSpringGreen**    | **ColorValue( "#00fa9a"&nbsp;)**<br>**ColorValue( "MediumSpringGreen"&nbsp;)**    | **RGBA(&nbsp;0,&nbsp;250,&nbsp;154,&nbsp;1&nbsp;)**   | ![mediumspringgreen.](./media/function-colors/color-mediumspringgreen.png)       |
| **Color.MediumTurquoise**      | **ColorValue( "#48d1cc"&nbsp;)**<br>**ColorValue( "MEDIUMTURQUOISE"&nbsp;)**      | **RGBA(&nbsp;72,&nbsp;209,&nbsp;204,&nbsp;1&nbsp;)**  | ![mediumturquoise.](./media/function-colors/color-mediumturquoise.png)           |
| **Color.MediumVioletRed**      | **ColorValue( "#c71585"&nbsp;)**<br>**ColorValue( "MediumVioletRed"&nbsp;)**      | **RGBA(&nbsp;199,&nbsp;21,&nbsp;133,&nbsp;1&nbsp;)**  | ![mediumvioletred.](./media/function-colors/color-mediumvioletred.png)           |
| **Color.MidnightBlue**         | **ColorValue( "#191970"&nbsp;)**<br>**ColorValue( "midnightblue"&nbsp;)**         | **RGBA(&nbsp;25,&nbsp;25,&nbsp;112,&nbsp;1&nbsp;)**   | ![midnightblue.](./media/function-colors/color-midnightblue.png)                 |
| **Color.MintCream**            | **ColorValue( "#f5fffa"&nbsp;)**<br>**ColorValue( "MintCream"&nbsp;)**            | **RGBA(&nbsp;245,&nbsp;255,&nbsp;250,&nbsp;1&nbsp;)** | ![mintcream.](./media/function-colors/color-mintcream.png)                       |
| **Color.MistyRose**            | **ColorValue( "#ffe4e1"&nbsp;)**<br>**ColorValue( "MISTYROSE"&nbsp;)**            | **RGBA(&nbsp;255,&nbsp;228,&nbsp;225,&nbsp;1&nbsp;)** | ![mistyrose.](./media/function-colors/color-mistyrose.png)                       |
| **Color.Moccasin**             | **ColorValue( "#ffe4b5"&nbsp;)**<br>**ColorValue( "Moccasin"&nbsp;)**             | **RGBA(&nbsp;255,&nbsp;228,&nbsp;181,&nbsp;1&nbsp;)** | ![moccasin.](./media/function-colors/color-moccasin.png)                         |
| **Color.NavajoWhite**          | **ColorValue( "#ffdead"&nbsp;)**<br>**ColorValue( "navajowhite"&nbsp;)**          | **RGBA(&nbsp;255,&nbsp;222,&nbsp;173,&nbsp;1&nbsp;)** | ![navajowhite.](./media/function-colors/color-navajowhite.png)                   |
| **Color.Navy**                 | **ColorValue( "#000080"&nbsp;)**<br>**ColorValue( "Navy"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;0,&nbsp;128,&nbsp;1&nbsp;)**     | ![navy.](./media/function-colors/color-navy.png)                                 |
| **Color.OldLace**              | **ColorValue( "#fdf5e6"&nbsp;)**<br>**ColorValue( "OLDLACE"&nbsp;)**              | **RGBA(&nbsp;253,&nbsp;245,&nbsp;230,&nbsp;1&nbsp;)** | ![oldlace.](./media/function-colors/color-oldlace.png)                           |
| **Color.Olive**                | **ColorValue( "#808000"&nbsp;)**<br>**ColorValue( "Olive"&nbsp;)**                | **RGBA(&nbsp;128,&nbsp;128,&nbsp;0,&nbsp;1&nbsp;)**   | ![olive.](./media/function-colors/color-olive.png)                               |
| **Color.OliveDrab**            | **ColorValue( "#6b8e23"&nbsp;)**<br>**ColorValue( "olivedrab"&nbsp;)**            | **RGBA(&nbsp;107,&nbsp;142,&nbsp;35,&nbsp;1&nbsp;)**  | ![olivedrab.](./media/function-colors/color-olivedrab.png)                       |
| **Color.Orange**               | **ColorValue( "#ffa500"&nbsp;)**<br>**ColorValue( "Orange"&nbsp;)**               | **RGBA(&nbsp;255,&nbsp;165,&nbsp;0,&nbsp;1&nbsp;)**   | ![orange.](./media/function-colors/color-orange.png)                             |
| **Color.OrangeRed**            | **ColorValue( "#ff4500"&nbsp;)**<br>**ColorValue( "ORANGERED"&nbsp;)**            | **RGBA(&nbsp;255,&nbsp;69,&nbsp;0,&nbsp;1&nbsp;)**    | ![orangered.](./media/function-colors/color-orangered.png)                       |
| **Color.Orchid**               | **ColorValue( "#da70d6"&nbsp;)**<br>**ColorValue( "Orchid"&nbsp;)**               | **RGBA(&nbsp;218,&nbsp;112,&nbsp;214,&nbsp;1&nbsp;)** | ![orchid.](./media/function-colors/color-orchid.png)                             |
| **Color.PaleGoldenRod**        | **ColorValue( "#eee8aa"&nbsp;)**<br>**ColorValue( "palegoldenrod"&nbsp;)**        | **RGBA(&nbsp;238,&nbsp;232,&nbsp;170,&nbsp;1&nbsp;)** | ![palegoldenrod.](./media/function-colors/color-palegoldenrod.png)               |
| **Color.PaleGreen**            | **ColorValue( "#98fb98"&nbsp;)**<br>**ColorValue( "PaleGreen"&nbsp;)**            | **RGBA(&nbsp;152,&nbsp;251,&nbsp;152,&nbsp;1&nbsp;)** | ![palegreen.](./media/function-colors/color-palegreen.png)                       |
| **Color.PaleTurquoise**        | **ColorValue( "#afeeee"&nbsp;)**<br>**ColorValue( "PALETURQUOISE"&nbsp;)**        | **RGBA(&nbsp;175,&nbsp;238,&nbsp;238,&nbsp;1&nbsp;)** | ![paleturquoise.](./media/function-colors/color-paleturquoise.png)               |
| **Color.PaleVioletRed**        | **ColorValue( "#db7093"&nbsp;)**<br>**ColorValue( "PaleVioletRed"&nbsp;)**        | **RGBA(&nbsp;219,&nbsp;112,&nbsp;147,&nbsp;1&nbsp;)** | ![palevioletred.](./media/function-colors/color-palevioletred.png)               |
| **Color.PapayaWhip**           | **ColorValue( "#ffefd5"&nbsp;)**<br>**ColorValue( "papayawhip"&nbsp;)**           | **RGBA(&nbsp;255,&nbsp;239,&nbsp;213,&nbsp;1&nbsp;)** | ![papayawhip.](./media/function-colors/color-papayawhip.png)                     |
| **Color.PeachPuff**            | **ColorValue( "#ffdab9"&nbsp;)**<br>**ColorValue( "PeachPuff"&nbsp;)**            | **RGBA(&nbsp;255,&nbsp;218,&nbsp;185,&nbsp;1&nbsp;)** | ![peachpuff.](./media/function-colors/color-peachpuff.png)                       |
| **Color.Peru**                 | **ColorValue( "#cd853f"&nbsp;)**<br>**ColorValue( "PERU"&nbsp;)**                 | **RGBA(&nbsp;205,&nbsp;133,&nbsp;63,&nbsp;1&nbsp;)**  | ![peru.](./media/function-colors/color-peru.png)                                 |
| **Color.Pink**                 | **ColorValue( "#ffc0cb"&nbsp;)**<br>**ColorValue( "Pink"&nbsp;)**                 | **RGBA(&nbsp;255,&nbsp;192,&nbsp;203,&nbsp;1&nbsp;)** | ![pink.](./media/function-colors/color-pink.png)                                 |
| **Color.Plum**                 | **ColorValue( "#dda0dd"&nbsp;)**<br>**ColorValue( "plum"&nbsp;)**                 | **RGBA(&nbsp;221,&nbsp;160,&nbsp;221,&nbsp;1&nbsp;)** | ![plum.](./media/function-colors/color-plum.png)                                 |
| **Color.PowderBlue**           | **ColorValue( "#b0e0e6"&nbsp;)**<br>**ColorValue( "PowderBlue"&nbsp;)**           | **RGBA(&nbsp;176,&nbsp;224,&nbsp;230,&nbsp;1&nbsp;)** | ![powderblue.](./media/function-colors/color-powderblue.png)                     |
| **Color.Purple**               | **ColorValue( "#800080"&nbsp;)**<br>**ColorValue( "PURPLE"&nbsp;)**               | **RGBA(&nbsp;128,&nbsp;0,&nbsp;128,&nbsp;1&nbsp;)**   | ![purple.](./media/function-colors/color-purple.png)                             |
| **Color.Red**                  | **ColorValue( "#ff0000"&nbsp;)**<br>**ColorValue( "Red"&nbsp;)**                  | **RGBA(&nbsp;255,&nbsp;0,&nbsp;0,&nbsp;1&nbsp;)**     | ![red.](./media/function-colors/color-red.png)                                   |
| **Color.RosyBrown**            | **ColorValue( "#bc8f8f"&nbsp;)**<br>**ColorValue( "rosybrown"&nbsp;)**            | **RGBA(&nbsp;188,&nbsp;143,&nbsp;143,&nbsp;1&nbsp;)** | ![rosybrown.](./media/function-colors/color-rosybrown.png)                       |
| **Color.RoyalBlue**            | **ColorValue( "#4169e1"&nbsp;)**<br>**ColorValue( "RoyalBlue"&nbsp;)**            | **RGBA(&nbsp;65,&nbsp;105,&nbsp;225,&nbsp;1&nbsp;)**  | ![royalblue.](./media/function-colors/color-royalblue.png)                       |
| **Color.SaddleBrown**          | **ColorValue( "#8b4513"&nbsp;)**<br>**ColorValue( "SADDLEBROWN"&nbsp;)**          | **RGBA(&nbsp;139,&nbsp;69,&nbsp;19,&nbsp;1&nbsp;)**   | ![saddlebrown.](./media/function-colors/color-saddlebrown.png)                   |
| **Color.Salmon**               | **ColorValue( "#fa8072"&nbsp;)**<br>**ColorValue( "Salmon"&nbsp;)**               | **RGBA(&nbsp;250,&nbsp;128,&nbsp;114,&nbsp;1&nbsp;)** | ![salmon.](./media/function-colors/color-salmon.png)                             |
| **Color.SandyBrown**           | **ColorValue( "#f4a460"&nbsp;)**<br>**ColorValue( "sandybrown"&nbsp;)**           | **RGBA(&nbsp;244,&nbsp;164,&nbsp;96,&nbsp;1&nbsp;)**  | ![sandybrown.](./media/function-colors/color-sandybrown.png)                     |
| **Color.SeaGreen**             | **ColorValue( "#2e8b57"&nbsp;)**<br>**ColorValue( "SeaGreen"&nbsp;)**             | **RGBA(&nbsp;46,&nbsp;139,&nbsp;87,&nbsp;1&nbsp;)**   | ![seagreen.](./media/function-colors/color-seagreen.png)                         |
| **Color.SeaShell**             | **ColorValue( "#fff5ee"&nbsp;)**<br>**ColorValue( "SEASHELL"&nbsp;)**             | **RGBA(&nbsp;255,&nbsp;245,&nbsp;238,&nbsp;1&nbsp;)** | ![seashell.](./media/function-colors/color-seashell.png)                         |
| **Color.Sienna**               | **ColorValue( "#a0522d"&nbsp;)**<br>**ColorValue( "Sienna"&nbsp;)**               | **RGBA(&nbsp;160,&nbsp;82,&nbsp;45,&nbsp;1&nbsp;)**   | ![sienna.](./media/function-colors/color-sienna.png)                             |
| **Color.Silver**               | **ColorValue( "#c0c0c0"&nbsp;)**<br>**ColorValue( "silver"&nbsp;)**               | **RGBA(&nbsp;192,&nbsp;192,&nbsp;192,&nbsp;1&nbsp;)** | ![silver.](./media/function-colors/color-silver.png)                             |
| **Color.SkyBlue**              | **ColorValue( "#87ceeb"&nbsp;)**<br>**ColorValue( "SkyBlue"&nbsp;)**              | **RGBA(&nbsp;135,&nbsp;206,&nbsp;235,&nbsp;1&nbsp;)** | ![skyblue.](./media/function-colors/color-skyblue.png)                           |
| **Color.SlateBlue**            | **ColorValue( "#6a5acd"&nbsp;)**<br>**ColorValue( "SLATEBLUE"&nbsp;)**            | **RGBA(&nbsp;106,&nbsp;90,&nbsp;205,&nbsp;1&nbsp;)**  | ![slateblue.](./media/function-colors/color-slateblue.png)                       |
| **Color.SlateGray**            | **ColorValue( "#708090"&nbsp;)**<br>**ColorValue( "SlateGray"&nbsp;)**            | **RGBA(&nbsp;112,&nbsp;128,&nbsp;144,&nbsp;1&nbsp;)** | ![slategray.](./media/function-colors/color-slategray.png)                       |
| **Color.SlateGrey**            | **ColorValue( "#708090"&nbsp;)**<br>**ColorValue( "slategrey"&nbsp;)**            | **RGBA(&nbsp;112,&nbsp;128,&nbsp;144,&nbsp;1&nbsp;)** | ![slategrey.](./media/function-colors/color-slategrey.png)                       |
| **Color.Snow**                 | **ColorValue( "#fffafa"&nbsp;)**<br>**ColorValue( "Snow"&nbsp;)**                 | **RGBA(&nbsp;255,&nbsp;250,&nbsp;250,&nbsp;1&nbsp;)** | ![snow.](./media/function-colors/color-snow.png)                                 |
| **Color.SpringGreen**          | **ColorValue( "#00ff7f"&nbsp;)**<br>**ColorValue( "SPRINGGREEN"&nbsp;)**          | **RGBA(&nbsp;0,&nbsp;255,&nbsp;127,&nbsp;1&nbsp;)**   | ![springgreen.](./media/function-colors/color-springgreen.png)                   |
| **Color.SteelBlue**            | **ColorValue( "#4682b4"&nbsp;)**<br>**ColorValue( "SteelBlue"&nbsp;)**            | **RGBA(&nbsp;70,&nbsp;130,&nbsp;180,&nbsp;1&nbsp;)**  | ![steelblue.](./media/function-colors/color-steelblue.png)                       |
| **Color.Tan**                  | **ColorValue( "#d2b48c"&nbsp;)**<br>**ColorValue( "tan"&nbsp;)**                  | **RGBA(&nbsp;210,&nbsp;180,&nbsp;140,&nbsp;1&nbsp;)** | ![tan.](./media/function-colors/color-tan.png)                                   |
| **Color.Teal**                 | **ColorValue( "#008080"&nbsp;)**<br>**ColorValue( "Teal"&nbsp;)**                 | **RGBA(&nbsp;0,&nbsp;128,&nbsp;128,&nbsp;1&nbsp;)**   | ![teal.](./media/function-colors/color-teal.png)                                 |
| **Color.Thistle**              | **ColorValue( "#d8bfd8"&nbsp;)**<br>**ColorValue( "THISTLE"&nbsp;)**              | **RGBA(&nbsp;216,&nbsp;191,&nbsp;216,&nbsp;1&nbsp;)** | ![thistle.](./media/function-colors/color-thistle.png)                           |
| **Color.Tomato**               | **ColorValue( "#ff6347"&nbsp;)**<br>**ColorValue( "Tomato"&nbsp;)**               | **RGBA(&nbsp;255,&nbsp;99,&nbsp;71,&nbsp;1&nbsp;)**   | ![tomato.](./media/function-colors/color-tomato.png)                             |
| **Color.Transparent**          | **ColorValue( "#00000000"&nbsp;)**<br>**ColorValue( "Transparent"&nbsp;)**        | **RGBA(&nbsp;0,&nbsp;0,&nbsp;0,&nbsp;0&nbsp;)**       | ![transparent.](./media/function-colors/color-transparent.png)                   |
| **Color.Turquoise**            | **ColorValue( "#40e0d0"&nbsp;)**<br>**ColorValue( "turquoise"&nbsp;)**            | **RGBA(&nbsp;64,&nbsp;224,&nbsp;208,&nbsp;1&nbsp;)**  | ![turquoise.](./media/function-colors/color-turquoise.png)                       |
| **Color.Violet**               | **ColorValue( "#ee82ee"&nbsp;)**<br>**ColorValue( "Violet"&nbsp;)**               | **RGBA(&nbsp;238,&nbsp;130,&nbsp;238,&nbsp;1&nbsp;)** | ![violet.](./media/function-colors/color-violet.png)                             |
| **Color.Wheat**                | **ColorValue( "#f5deb3"&nbsp;)**<br>**ColorValue( "WHEAT"&nbsp;)**                | **RGBA(&nbsp;245,&nbsp;222,&nbsp;179,&nbsp;1&nbsp;)** | ![wheat.](./media/function-colors/color-wheat.png)                               |
| **Color.White**                | **ColorValue( "#ffffff"&nbsp;)**<br>**ColorValue( "White"&nbsp;)**                | **RGBA(&nbsp;255,&nbsp;255,&nbsp;255,&nbsp;1&nbsp;)** | ![white.](./media/function-colors/color-white.png)                               |
| **Color.WhiteSmoke**           | **ColorValue( "#f5f5f5"&nbsp;)**<br>**ColorValue( "whitesmoke"&nbsp;)**           | **RGBA(&nbsp;245,&nbsp;245,&nbsp;245,&nbsp;1&nbsp;)** | ![whitesmoke.](./media/function-colors/color-whitesmoke.png)                     |
| **Color.Yellow**               | **ColorValue( "#ffff00"&nbsp;)**<br>**ColorValue( "Yellow"&nbsp;)**               | **RGBA(&nbsp;255,&nbsp;255,&nbsp;0,&nbsp;1&nbsp;)**   | ![yellow.](./media/function-colors/color-yellow.png)                             |
| **Color.YellowGreen**          | **ColorValue( "#9acd32"&nbsp;)**<br>**ColorValue( "YELLOWGREEN"&nbsp;)**          | **RGBA(&nbsp;154,&nbsp;205,&nbsp;50,&nbsp;1&nbsp;)**  | ![yellowgreen.](./media/function-colors/color-yellowgreen.png)                   |

---

## ColumnNames and Column functions

Source: [function-columnnames-column.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-columnnames-column)

*Reference information including syntax and examples for the ColumnNames and Column functions.*

# ColumnNames and Column functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Retrieves column names and values from a [dynamic value](../untyped-object.md).

## Description
The ColumnNames function returns the names of all columns from a [dynamic record](../untyped-object.md), returning a table with all the names from that record.

The Column function returns the value of a property from a [dynamic record](../untyped-object.md) with the given column name. The value is returned as a [dynamic value](../untyped-object.md).

The ColumnNames and Column functions return errors if the [dynamic value](../untyped-object.md) doesn't represent a record (that is, if it represents a table or a scalar or primitive value).

## Syntax
**ColumnNames**( *DynamicRecord* )

* *DynamicRecord* – Required. A [dynamic value](../untyped-object.md) that represents a record.

**Column**( *DynamicRecord*, *ColumnName* )

* *DynamicRecord* – Required. A [dynamic value](../untyped-object.md) that represents a record.
* *ColumnName* - Required. The name of the column to be retrieved from the given record.

## Examples

### Accessing field values
Given the following JSON string in a variable named `JsonString`
```JSON
{ "name": "Seattle", "population": 737000 }
```

1. The following formula returns a single-column table with a `Value` column containing the following values: "name", "population":
    ```power-fx
    ColumnNames( ParseJSON( JsonString ) )
    ```
2. The following formula returns the number `737000`:
    ```power-fx
    Value( Column( ParseJSON( JsonString ), "population" ) )
    ```
    - Notice that this formula is similar to the `.` operator for [dynamic records](../untyped-object.md#record-types), but the column name doesn't have to be known beforehand.

3. The following formula returns the text value `"name: Seattle, population: 737000"`:
    ```power-fx
    With(
        { untyped: ParseJSON( JsonString ) },
        Concat(
            ColumnNames( untyped ),
            $"{Value}: {Column( untyped, Value )}",
            ", "))
    ```

### Blanks
Given the following JSON string in a variable named `JsonString`
```JSON
{ "text": "text value" , "number": 567, "empty": null }
```

1. Attempting to access nonexisting fields returns **Blank()**. The following formula returns `true`:
    ```power-fx
    IsBlank( Column( ParseJSON( JsonString ), "does not exist" ) )
    ```
2. JSON `null` values are considered **Blank()**. The following formula returns `true`:
    ```power-fx
    IsBlank( Column( ParseJSON( JsonString ), "empty" ) )
    ```

### Nonrecords
Calling the Column or ColumnNames functions with dynamic values that don't represent records return an error. All of those expressions in the following list are erroneous:

| Formula                                          | Reason for error                                 |
| ------------------------------------------------ | ------------------------------------------- |
| **ColumnNames( ParseJSON ( "[1, 2, 3]" ) )**       | Dynamic value represents an array          |
| **Column( ParseJSON ( "23.45" ), "Value" )**           | Dynamic value represents a number          |
| **ColumnNames( ParseJSON ( """hello""" ) )**       | Dynamic value represents a text            |
| **Column( ParseJSON ( "{""a"":false}" ).a, "a" )** | Dynamic value represents a boolean value   |

---

## Concat and Concatenate functions

Source: [function-concatenate.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-concatenate)

*Reference information including syntax and examples for the Concat and Concatenate functions.*

# Concat and Concatenate functions
| Function | Applies to |
|-----------|------------|
| **Concat** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **Concatenate** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Concatenates individual strings of text and strings in [tables](/power-apps/maker/canvas-apps/working-with-tables).

## Description

The **Concatenate** function concatenates a mix of individual strings and a single-column table of strings. When you use this function with individual strings, it's equivalent to using the **&** [operator](operators.md).

The **Concat** function concatenates the result of a formula applied across all the [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a table, resulting in a single string. Use this function to summarize the strings of a table, just as the **[Sum](function-aggregates.md)** function does for numbers.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

Use the [**Split**](function-split.md) or [**MatchAll**](function-ismatch.md) function to split a string into a table of substrings.

## Syntax

**Concat**( _Table_, _Formula_, _separator_)

- _Table_ - Required. Table to operate on.
- _Formula_ - Required. Formula to apply across the records of the table.
- _Separator_ - Optional. A text value to be inserted between concatenated rows of the table.

**Concatenate**( _String1_ [, *String2*, ...] )

- _String(s)_ - Required. Mix of individual strings or a single-column table of strings.

## Examples

The examples in this section use these global variables:

- **FirstName** = "Jane"
- **LastName** = "Doe"
- **Products** = ![Table with two columns and four rows.](media/function-concatenate/products.png)

To create these global variables in an app, insert a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control, and set its **OnSelect** property to this formula:

```power-fx
Set( FirstName, "Jane" ); Set( LastName, "Doe" );
Set( Products,
    Table(
        { Name: "Violin", Type: "String" },
        { Name: "Cello", Type: "String" },
        { Name: "Trumpet", Type: "Wind" }
    )
)
```

Select the button (by clicking it while you hold down the Alt key).

### Concatenate function and the & operator

For these examples, set the **Text** property of a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control to a formula from the first column of the next table.

| Formula | Description | Result |
| --- | --- | --- |
| **Concatenate(&nbsp;LastName,&nbsp;",&nbsp;",&nbsp;FirstName&nbsp;)** | Concatenates the value in **LastName**, the string **", "** (a comma followed by a space), and the value in **FirstName**. | "Doe,&nbsp;Jane" |
| **LastName&nbsp;&&nbsp;",&nbsp;"&nbsp;&&nbsp;FirstName** | Same as the previous example except using the **&** operator instead of the function. | "Doe,&nbsp;Jane" |
| **Concatenate(&nbsp;FirstName,&nbsp;"&nbsp;",&nbsp;LastName&nbsp;)** | Concatenates the value in **FirstName**, the string **" "** (a single space), and the value in **LastName**. | "Jane&nbsp;Doe" |
| **FirstName&nbsp;&&nbsp;"&nbsp;"&nbsp;&&nbsp;LastName** | Same as the previous example, using the **&** operator instead of the function. | "Jane&nbsp;Doe" |

### Concatenate with a single-column table

For this example, add a blank, vertical [**Gallery**](/power-apps/maker/canvas-apps/controls/control-gallery) control, set its **Items** property to the formula in the next table, and then add a label in the gallery template.

| Formula | Description | Result |
| --- | --- | --- |
| **Concatenate( "Name:&nbsp;",&nbsp;Products.Name, ",&nbsp;Type:&nbsp;",&nbsp;Products.Type )** | For each record in the **Products** table, concatenates the string **"Name: "**, the name of the product, the string **", Type: "** and the type of the product. | A single-column table with a `Value` column containing the following values: "Name: Violin, Type: String", "Name: "Cello, Type: String", "Name: Trumpet, Type: Wind" |

### Concat function

For these examples, set the **Text** property of a label to a formula from the first column of the next table.

| Formula | Description | Result |
| --- | --- | --- |
| **Concat( Products, Name, ", " )** | Evaluates the expression **Name** for each record of **Products** and concatenates the results together into a single text string separated by **", "**. | "Violin,&nbsp;Cello,&nbsp;Trumpet" |
| **Concat( Products, "'" & Name & "'", ", " )** | Evaluates the expression **"'" & Name & "'"** for each record of **Products** and concatenates the results together into a single text string separated by **", "**. | "'Violin',&nbsp;'Cello',&nbsp;'Trumpet'" |
| **Concat( Filter(&nbsp;Products,&nbsp;Type&nbsp;=&nbsp;"String"&nbsp;), Name, ", " )** | Evaluates the formula **Name** for each record of **Products** that satisfies the filter **Type = "String"**, and concatenates the results into a single text string separated by **", "**. | "Violin,&nbsp;Cello" |


### Split and MatchAll

If you used **Concat** with a separator, you can reverse the operation by using the **Split** function.

For these examples, add a blank, vertical gallery, set its **Items** property to a formula in the next table, and then add a label in the gallery template.

| Formula | Description | Result |
| --- | --- | --- |
| **Split( Concat(&nbsp;Products,&nbsp;Name,&nbsp;",&nbsp;"&nbsp;), ", " )** | Splits the text string with the separator **", "**. | A single-column table with a `Value` column containing the following values: "Violin", "Cello", "Trumpet" |

---

## Concurrent function

Source: [function-concurrent.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-concurrent)

*Reference information including syntax and examples for the Concurrent function.*

# Concurrent function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Evaluates multiple formulas concurrently with one another.

## Description

The **Concurrent** function allows multiple formulas specified within the same property to be evaluated at the same time if they have connector or Dataverse calls. Normally, multiple formulas are evaluated by chaining them together with the [**;**](operators.md) (semi-colon) operator, which evaluates each formula sequentially. With the Concurrent function, the app will evaluate all formulas within a property concurrently even after using the **;** operator. This concurrency helps users wait less for the same result.  

In the [**OnStart**](/power-apps/maker/canvas-apps/controls/control-screen) property of your app, use **Concurrent** to improve performance when the app loads data. When data calls don't start until the previous calls finish, the app must wait for the sum of all request times. If data calls start at the same time, the app needs to wait only for the longest request time. Web browsers often improve performance by performing network calls concurrently.

You can't predict the order in which formulas within the **Concurrent** function start and end evaluation. Formulas within the **Concurrent** function shouldn't contain dependencies on other formulas within the same **Concurrent** function, and Power Apps shows an error if you try. From within, you can safely take dependencies on formulas outside the **Concurrent** function because they complete before the **Concurrent** function starts. Formulas after the **Concurrent** function can safely take dependencies on formulas within: they'll all complete before the **Concurrent** function finishes and moves on to the next formula in a chain (if you use the **;** operator). Watch out for subtle order dependencies if you're calling functions or service methods that have side effects.

You can chain formulas together with the **;** operator within an argument to **Concurrent**. For example, **Concurrent( Set( a, 1 ); Set( b, a+1 ), Set( x, 2 ); Set( y, x+2 ) )** evaluates **Set( a, 1 ); Set( b, a+1 )** concurrently with **Set( x, 2 ); Set( y, x+2 )**. In this case, the dependencies within the formulas are fine: **a** will be set before **b**, and **x** will be set before **y**.

Depending on the device or browser in which the app is running, only a handful of formulas might actually be evaluated concurrently. **Concurrent** uses the available capabilities and won't finish until all formulas have been evaluated.

If you enable **Formula-level error management** (in advanced settings), the first error encountered in argument order is returned from **Concurrent**; otherwise, _blank_ is returned. If all formulas are successful, _true_ is returned. If one formula fails, the rest of that formula stops, but other formulas continue evaluating.

You can use **Concurrent** only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Concurrent**( _Formula1_, _Formula2_ [, ...] )

- _Formula(s)_ – Required. Formulas to evaluate concurrently. You must supply at least two formulas.

## Examples

#### Loading data faster

1. Create an app, and add four data sources from Microsoft Dataverse, SQL Server, or SharePoint.

   This example uses four tables from the [sample Adventure Works database on SQL Azure](/azure/sql-database/sql-database-get-started-portal). After you create the database, connect to it from Power Apps using the fully qualified server name (for example, srvname.database.windows.net):

   ![Connect to Adventure Works database in Azure.](media/function-concurrent/connect-database.png)

2. Add a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control, and set its **OnSelect** property to this formula:

   ```power-fx
   ClearCollect( Product, '[SalesLT].[Product]' );
   ClearCollect( Customer, '[SalesLT].[Customer]' );
   ClearCollect( SalesOrderDetail, '[SalesLT].[SalesOrderDetail]' );
   ClearCollect( SalesOrderHeader, '[SalesLT].[SalesOrderHeader]' )
   ```

3. In [Microsoft Edge](/microsoft-edge/devtools-guide/network) or [Google Chrome](https://developers.google.com/web/tools/chrome-devtools/network-performance/), turn on developer tools to monitor network traffic while your app is running.

4. (optional) Turn on network throttling to exaggerate the effects of this comparison.

5. While holding down the Alt key, select the button, and then watch the network traffic.

   The tools show four requests performed in series, similar to this example. Actual times have been removed as they vary wildly. The graph shows that each call starts after the last has finished:

   ![Time graph of four network requests, each one starting after the last finishes, covering the entire span of time.](media/function-concurrent/chained-network.png)

6. Save, close, and reopen the app.

   Power Apps caches data, so selecting the button again won't necessarily cause four new requests. Each time you want to test performance, close and reopen your app. If you turned network throttling on, you may want to turn it off until you're ready for another test.

7. Add a second **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control, and set its **OnSelect** property to this formula:

   ```power-fx
   Concurrent(
       ClearCollect( Product, '[SalesLT].[Product]' ),
       ClearCollect( Customer, '[SalesLT].[Customer]' ),
       ClearCollect( SalesOrderDetail, '[SalesLT].[SalesOrderDetail]' ),
       ClearCollect( SalesOrderHeader, '[SalesLT].[SalesOrderHeader]' )
   )
   ```

   Note that you added the same **ClearCollect** calls to the first button, but they're wrapped in a **Concurrent** function and separated by commas this time.

8. Clear the network monitor in the browser.

9. If you were using network throttling before, turn it on again.

10. While holding down the Alt key, select the second button, and then watch the network traffic.

    The tools show four requests performed concurrently, similar to this example. Again, actual times have been removed as they vary wildly. The graph shows that all the calls start at about the same time and don't wait for the previous one to finish:

    ![Time graph of four network requests, all four starting together, covering about half of the span of time.](media/function-concurrent/concurrent-network.png)

    These graphs are based on the same scale. By using **Concurrent**, you halved the total amount of time these operations took to finish.

11. Save, close, and reopen the app.

#### Race condition

1. Add a connection to the [Microsoft Translator](/power-apps/maker/canvas-apps/connections/connection-microsoft-translator) service to your app.

2. Add a [**Text input**](/power-apps/maker/canvas-apps/controls/control-text-input) control, and rename it **TextInput1** if it has a different name.

3. Add a **Button** control, and set its **OnSelect** property to this formula:

   ```power-fx
   Set( StartTime, Value( Now() ) );
   Concurrent(
       Set( FRTrans, MicrosoftTranslator.Translate( TextInput1.Text, "fr" ) );
           Set( FRTransTime, Value( Now() ) ),
       Set( DETrans, MicrosoftTranslator.Translate( TextInput1.Text, "de" ) );
           Set( DETransTime, Value( Now() ) )
   );
   Collect( Results,
       {
           Input: TextInput1.Text,
           French: FRTrans, FrenchTime: FRTransTime - StartTime,
           German: DETrans, GermanTime: DETransTime - StartTime,
           FrenchFaster: FRTransTime < DETransTime
       }
   )
   ```

4. Add a [**Data table**](/power-apps/maker/canvas-apps/controls/control-data-table) control, and set its **Items** property to **Results**.

5. On the **Properties** tab of the right pane, select **Edit fields** to open the **Fields** pane.

6. In the list of fields, select the check box for each field to show them all in the data table.

7. (optional) Drag the **Input** field to the top of the list, and drag the **FrenchFaster** field to the bottom of the list.

   ![List of fields in the Result collection.](media/function-concurrent/field-list.png)

8. In the **Text input** control, type or paste a phrase to translate.

9. While holding down the Alt key, select the button multiple times to fill the table.

   The times are shown in milliseconds.

   ![Display of the data table containing results of translating the string "Hello World" to French and German. Sometimes the French translation is faster than the German, and sometimes it's the other way around.](media/function-concurrent/race-condition.png)

   In some cases, the French translation is faster than the German translation, and vice versa. Both start at the same time, but one returns before the other for various reasons, including network latency and server-side processing.

   A [race condition](https://en.wikipedia.org/wiki/Race_condition) would occur if the app depended on one translation ending first. Fortunately, Power Apps flags most timing dependencies that it can detect.

---

## Confirm function

Source: [function-confirm.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-confirm)

*Learn how to use the Confirm function to display customizable confirmation dialogs in Power Fx apps, including options for titles, subtitles, and button labels.*

# Confirm function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps

Use this function to display a confirmation dialog box to the user.

## Description

The **Confirm** function displays a dialog box on top of the current screen with two buttons: a _confirm_ button and a _cancel_ button. In model-driven apps, these buttons default to localized versions of "OK" and "Cancel" respectively. Confirm is also available in canvas apps for showing a simple confirmation dialog and returning a Boolean result.

The user must choose one of the buttons before the dialog is dismissed. Besides selecting the Cancel button, the dialog can be dismissed through platform-specific gestures (such as the Esc key or clicking outside the dialog). In canvas apps, this dismissal path is treated as no action (that is, it returns `blank`).


> [!NOTE]
> In canvas apps, the **Confirm** function uses the Fluent dialog. Make sure [modern controls are enabled](/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls#enable-modern-controls-and-themes-for-your-app); otherwise, the native browser dialog appears.

## Syntax

```
Confirm( Message [, OptionsRecord ] )
```

- _Message_ - Required. Message to display to the user.
- _OptionsRecord_ - Optional. Provide option settings for the dialog box. See below for available options.

## Options

Use the _OptionsRecord_ parameter to customize the confirmation dialog:

| Option | Description |
|--------|-------------|
| **ConfirmButton** | The text to display on the confirm button, replacing the default localized "OK" or "Confirm" text. |
| **CancelButton** | The text to display on the cancel button, replacing the default localized "Cancel" text. |
| **Title** | The text to display as the dialog title. Displayed in a larger, bolder font than the message. It might be truncated if very long. |
| **Subtitle** | The text to display as the dialog subtitle. Displayed between the title and message. It might be truncated if very long. |

## Default behavior

**Button labels:** If you don't provide custom button labels, Confirm uses localized default button text:
- In canvas apps (preview), the defaults are **"Confirm"** and **"Cancel"** (localized).
- In model-driven apps, the defaults are **"OK"** and **"Cancel"** (localized).

**Return value:** Confirm returns `true` if the user selects the confirm button, and `false` otherwise.

## Examples

### Model-driven apps

#### Simple confirmation before removing a record

```powerfx
If( Confirm( "Are you sure?" ), Remove( ThisItem ) )
```

Displays a confirmation dialog with default buttons. If the user selects the confirm button, the record is removed.

#### Confirmation with custom title

```powerfx
If( Confirm( "Are you sure?", { Title: "Delete Confirmation" } ), Remove( ThisItem ) )
```

Adds a title to the confirmation dialog before removing a record.

#### Custom button labels for user preference

```powerfx
Set( FavColor,
     If( Confirm( "What is your favorite color?",
                  { ConfirmButton: "Red", CancelButton: "Green" }
         ),
         "Red",
         "Green"
     )
)
```

Uses custom button labels to capture a simple preference. The result is stored in the global variable `FavColor`.

#### Modal message without checking return value

```powerfx
Confirm( "There was a problem, please review your order." )
```

Displays a modal message that the user must acknowledge before continuing. The return value isn't checked.

---

### Canvas apps 

#### Confirm before delete 

Use **Confirm** to prevent accidental deletion of records:

```powerfx
// Button.OnSelect
If(
    Confirm(
        "Are you sure you want to delete this record?",
        {
            Title: "Delete confirmation",
            Subtitle: "This action can't be undone.",
            ConfirmButton: "Delete",
            CancelButton: "Cancel"
        }
    ),
    Remove(YourDataSource, Gallery1.Selected);
    Notify("Record deleted.", NotificationType.Success)
)
```

Displays a confirmation dialog with title, subtitle, and custom button labels. The record is only deleted if the user selects **Delete**.

#### Confirm before saving a form

Use **Confirm** to validate user intent before submitting data:

```powerfx
// Save button.OnSelect
If(
    Confirm(
        "Do you want to save these changes?",
        { Title: "Save changes" }
    ),
    SubmitForm(EditForm1);
    ResetForm(EditForm1);
    Notify("Changes saved successfully.", NotificationType.Success)
)
```

Displays a confirmation dialog before submitting the form. The form is only submitted if the user confirms.

#### Store result in a variable for multiple actions

Store the confirmation result to use in multiple downstream operations:

```powerfx
// Button.OnSelect
Set(
    varConfirmed,
    Confirm("Do you want to proceed with this operation?")
);

If(
    varConfirmed,
    Notify("Processing your request...", NotificationType.Information);
    /* Additional operations */,
    Notify("Operation canceled.", NotificationType.Warning)
)
```

The Boolean result is stored in `varConfirmed` and can be referenced multiple times for conditional logic.

#### Full customization with all options

Showcase all available customization options:

```powerfx
// Button.OnSelect
If(
    Confirm(
        "This is the main message that describes what the user needs to confirm.",
        {
            Title: "Action Required 🔔",
            Subtitle: "Please choose one of the options below.",
            ConfirmButton: "Yes, proceed",
            CancelButton: "No, cancel"
        }
    ),
    Notify("User confirmed!", NotificationType.Success),
    Notify("User canceled.", NotificationType.Warning)
)
```

Displays a fully customized dialog with title, subtitle, message, and custom button labels.

## FAQs

### Can I hide the Cancel button?
No. The current design always shows both the Confirm and Cancel buttons. Users must have the ability to dismiss or cancel the dialog.

### Can I add a third button or more than two options?
No. Confirm supports exactly two options: a confirm action and a cancel action. For scenarios requiring multiple choices, consider using a different UI pattern such as a custom screen or dropdown control.

### Does Confirm block other operations?
Yes. Confirm displays as a modal dialog that the user must dismiss before they can interact with other parts of the app.

## See also

[**Notify**](function-showerror.md) - Displays a non-modal banner message at the top of the screen that doesn't require user dismissal.

---

## Copy function

Source: [function-copy.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-copy)

*Reference information for the Copy function.*

# Copy function
**Applies to:** 
- ✓ Canvas apps



Copies text to the clipboard on the device where the app is running.

## Description

The **Copy** function takes any text value and copies it to the clipboard. Regardless of the contents of the text, the clipboard will contain plain text without any special mime type. The function is considered a side-effects function and as a result it can only be used in behavior properties.

> [!NOTE]
> The **Copy()** function is limited to the access given to clipboard by the host of the app. As a result, embedded apps scenarios such as Power Apps in SharePoint, embedded apps in Power BI, Teams, etc. don't support **Copy()**. Other embedded scenarios might not support the function either. Makers should use **[IfError()](./function-iferror.md)** to ensure the action to copy to clipboard was effective and if not, to properly alert the user that the copy failed.

## Syntax

**Copy**( _text_ )

- _text_ - Required. The text to be copied to the clipboard.

## Examples

### Text Input with Copy Button
The **Copy** function can be used to create a style of input controls seen in many apps, where a button right now to the input text allows for a quick copy of the input's text to the clipboard.

1. Insert a **Text input** control on a screen. By default, the name will be **TextInput1**.
2. Insert a **Button** control on the screen, next to the input control.
3. Set the button's **OnSelect** property to **Copy( TextInput1.Text )**.

When the button is selected, the text from the text input control will be copied to the clipboard.

### Processing text to put on clipboard

The **Copy** function accepts text, which can be itself an expression that manipulates text from your app in some way. For example, an app may have an employee record that contain the employee's first name, last name, and title. A formula could put this information on the clipboard as one piece of text. The following example uses string interpolation to combine the data into one string:

```power-fx
Copy( $"{employeeRecord.Name} {employeeRecord.LastName} ({employeeRecord.Title})" )
```

---

## Count, CountA, CountIf, and CountRows functions

Source: [function-table-counts.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts)

*Reference information including syntax and examples for the Count, CountA, CountIf, and CountRows functions.*

# Count, CountA, CountIf, and CountRows functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Counts all [records](/power-apps/maker/canvas-apps/working-with-tables#records) in a [table](/power-apps/maker/canvas-apps/working-with-tables), or counts all records that satisfy a condition.

## Description

The **Count** function counts the number of records that contain a number in a single-column table.

The **CountA** function counts the number of records that aren't _blank_ in a single-column table. This function includes [empty](function-isblank-isempty.md) text ("") in the count.

The **CountIf** function counts the number of records in a table that are **true** for a logical formula. The formula can reference [columns](/power-apps/maker/canvas-apps/working-with-tables#columns) of the table.

The **CountRows** function counts the number of records in a table.

Each of these functions returns a number.

You need to enable the **Enhanced delegation for Microsoft Dataverse** option in the advance settings to make **CountIf** and **CountRows** functions delegation to work. To enable the option:

1. Open the app where you want to use the functions.
1. Select **Settings** > **Upcoming features** > **Preview**.
1. Turn on the **Enhanced delegation for Microsoft Dataverse** option.

    > [!div class="mx-imgBorder"] 
    > ![Enable delegation.](media/enable-delegation-functions.png)

<!--When used with a data source, these functions can't be delegated. Only the first portion of the data source will be retrieved and then the function applied. The result may not represent the complete story. A warning may appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](../maker/canvas-apps/delegation-overview.md).-->

> [!IMPORTANT]
>
> - There is a 50K delegation limit if you use `CountRows` and `CountIf` functions with filters. There is no hard limit on the `CountRows` function when extracted directly from the data source because of the cached count that Dataverse keeps.
> - If the `CountRows(<Data Source>)` function is used without filtering, the count might not be 100% accurate, because the cached count updates periodically. If you need precise count and expect the result to be under the aggregate limit, you can bypass the cached count via `CountIf(<Data Source>, True)`.

## Syntax

**Count**( _SingleColumnTable_ )<br>
**CountA**( _SingleColumnTable_ )

- _SingleColumnTable_ - Required. Column of records to count.

**CountIf**( _Table_, _LogicalFormula_ )

- _Table_ - Required. Table of records to count.
- _LogicalFormula_ - Required. Formula to evaluate for each record of the table. Records that return **true** for this formula are counted. The formula can reference columns of the table.

**CountRows**( _Table_ )

- _Table_ - Required. Table of records to count.

## Example

1. Import or create a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) named **Inventory**, as the first subprocedure in [Show images and text in a gallery](/power-apps/maker/canvas-apps/show-images-text-gallery-sort-filter) describes.
2. Add a label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **CountIf(Inventory, UnitsInStock < 30)**

   The label shows **2** because two products (Ganymede and Callisto) have fewer than 30 units in stock.

3. Add another label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **CountA(Inventory.UnitsInStock)**

   The label shows **5**, the number of non-empty cells in the **UnitsInStock** column.

4. Add another label, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **CountRows(Inventory)**

   The label shows **5** because the collection contains five rows.

---

## DataSourceInfo function

Source: [function-datasourceinfo.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datasourceinfo)

*Reference information including syntax and examples for the DataSourceInfo function.*

# DataSourceInfo function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Provides information about a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Overview

Data sources can provide a wealth of information to optimize the user experience.

You can use [column](/power-apps/maker/canvas-apps/working-with-tables#columns)-level information to validate user input and provide immediate feedback to the user before using the **[Patch](function-patch.md)** function. The **[Validate](function-validate.md)** function uses this same information.

You can use information at the data-source level, for example, to disable or hide **Edit** and **New** buttons for users who don't have permissions to edit and create [records](/power-apps/maker/canvas-apps/working-with-tables#records).

Data sources vary in how much information they provide, including not providing any at all. [Collections](/power-apps/maker/canvas-apps/working-with-data-sources#collections) provide no information. If a piece of information isn't provided, a default is used, or _blank_ is returned.

> [!NOTE]
> Currently, the DataSourceInfo function is not supported in Microsoft Lists.

## Description

### Column information

You can use **DataSourceInfo** to obtain information about a particular column of a data source:

| Information Argument           | Result Type | Description                                                                                                                                   |
| ------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **DataSourceInfo.DisplayName** | String      | Display name for the column. If no display name is defined, returns the column name.                                                          |
| **DataSourceInfo.MaxLength**   | Number      | Maximum number of characters that the column can hold. Applies only to columns that contain strings. If a maximum isn't set, returns _blank_. |
| **DataSourceInfo.MaxValue**    | Number      | Maximum numeric value that a column can hold. Applies only to columns that contain numbers. If a maximum isn't set, returns _blank_.          |
| **DataSourceInfo.MinValue**    | Number      | Minimum numeric value that a column can hold. Applies only to columns that contain numbers. If a minimum isn't set, returns _blank_.          |
| **DataSourceInfo.Required**    | Boolean     | Is a value required for this column? If not set by the data source, returns **false**.                                                        |

The third argument is the name of a column as a string. For example, column **Phone** in collection **People** would be passed as **"Phone"** including the double quotes.

### Data-source information

You can also use **DataSourceInfo** to obtain information about a data source as a whole:

| Information Argument                | Result Type | Description                                                                                                                   |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **DataSourceInfo.AllowedValues**    | Boolean     | What types of permissions can users be granted for this data source? If not set by the data source, returns _blank_.          |
| **DataSourceInfo.CreatePermission** | Boolean     | Does the current user have permission to create records in this data source? If not set by the data source, returns **true**. |
| **DataSourceInfo.DeletePermission** | Boolean     | Does the current user have permission to delete records in this data source? If not set by the data source, returns **true**. |
| **DataSourceInfo.EditPermission**   | Boolean     | Does the current user have permission to edit records in this data source? If not set by the data source, returns **true**.   |
| **DataSourceInfo.ReadPermission**   | Boolean     | Does the current user have permission to read records in this data source? If not set by the data source, returns **true**.   |

> [!NOTE] 
> **DataSourceInfo** returns _true_ if it cannot determine whether the current user has the requested permission. Permissions will be checked again by the server when the actual operation is carried out and an error is displayed if it was not allowed. At this time, permissions checking with **DataSourceInfo** is only possible when using Microsoft Dataverse.

## Syntax

**DataSourceInfo**( _DataSource_, _Information_ [, _ColumnName_] )

- _DataSource_ – Required. The data source to use.
- _Information_ – Required. The type of information that you want to retrieve.
- _ColumnName_ – Optional. The column name for which to retrieve column-level information. For information at the data-source level, the _ColumnName_ argument can't be used.

> [!NOTE]
> In Power Apps prior to version 3.24042, column names were specified with a text string using double quotes, and if connected to a data source they also needed to be logical names. For example, the logical name **"cr43e_name"** with double quotes was used instead of the display name **Name** without quotes. For SharePoint and Excel data sources that contain column names with spaces, each space was specified with **"\_x0020\_"**, for example **"Column Name"** as **"Column_x0020_Name"**. After this version, all apps were automatically updated to the new syntax described in this article. 

## Examples

The examples in this section use this data source, named **IceCream**:

![Icecream example.](media/function-datasourceinfo/icecream.png "Icecream example")

The data source has also provided this information:

- The display name for **Quantity** is "Quantity on Hand".
- The maximum length of **Flavor** is 30 characters.
- The **Flavor** column must contain a value. The **Quantity** column isn't required.
- The minimum **Quantity** is 0.
- The maximum **Quantity** is 100.
- The current user can read and edit the records of the **IceCream** data source but can't create or delete records.

| Formula                                                                               | Description                                                                                         | Result             |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------ |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.DisplayName,&nbsp;Quantity&nbsp;)** | Returns the display name for the **Quantity** column of the **IceCream** data source.               | "Quantity on Hand" |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.MaxLength,&nbsp;Flavor&nbsp;)**     | Returns the maximum length of the string for the **Flavor** column of the **IceCream** data source. | 30                 |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.Required,&nbsp;Flavor&nbsp;)**      | Is the **Flavor** column of the **IceCream** data source required?                                  | **true**           |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.Required,&nbsp;Quantity&nbsp;)**    | Is the **Quantity** column of the **IceCream** data source required?                                | **false**          |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.MaxValue,&nbsp;Quantity&nbsp;)**    | Returns the maximum numeric value for the **Quantity** column of the **IceCream** data source.      | 100                |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.MinValue,&nbsp;Quantity&nbsp;)**    | Returns the minimum numeric value for the **Quantity** column of the **IceCream** data source.      | 0                  |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.ReadPermission)**                     | Can the current user read records in the **IceCream** data source?                                  | **true**           |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.EditPermission)**                     | Can the current user edit records in the **IceCream** data source?                                  | **true**           |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.CreatePermission)**                   | Can the current user create records in the **IceCream** data source?                                | **false**          |
| **DataSourceInfo(&nbsp;IceCream, DataSourceInfo.DeletePermission)**                   | Can the current user delete records in the **IceCream** data source?                                | **false**          |

---

## Date, DateTime, and Time functions

Source: [function-date-time.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-date-time)

*Reference information including syntax and examples for the Date, DateTime, and Time functions.*

# Date, DateTime, and Time functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Converts date and time components to a date/time value.

## Description

The **Date** function converts individual Year, Month, and Day values to a Date/Time value. The time portion is midnight.

- If Year is between 0 and 1899 (inclusive), the function adds that value to 1900 to calculate the year. **70** becomes **1970**.
- If Month is less than 1 or more than 12, the result subtracts or adds that many months from the beginning of the specified year.
- If Day is greater than the number of days in the specified month, the function adds that many days to the first day of the month and returns the corresponding date from a subsequent month. If Day is less than 1, the function subtracts that many days, plus 1, from the first day of the specified month.

The **Time** function converts individual Hour, Minute, Second, and optionally Millisecond values to a Date/Time value. The result has no date associated with it.

The **DateTime** function combines the **Date** and **Time** functions into a single function, taking both date and time arguments and returning a Date/Time value that has both date and time components.

See the **[DateValue](function-datevalue-timevalue.md)**, **[TimeValue](function-datevalue-timevalue.md)**, and **[DateTimeValue](function-datevalue-timevalue.md)** functions for information about how to convert a string to a value.

Also see [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

## Syntax

**Date**( _Year_, _Month_, _Day_ )

- _Year_ - Required. Numbers greater than 1899 are interpreted as absolute (1980 is interpreted as 1980); numbers that range from 0 to 1899 are interpreted as relative to 1900. (For example, 80 is interpreted as 1980.)
- _Month_ - Required. A number that ranges from 1 to 12.
- _Day_ - Required. A number that ranges from 1 to 31.

**Time**( _Hour_, _Minute_, _Second_ [, _Milliseconds_ ] )

- _Hour_ - Required. Number of hours, usually in the range 0 (12:00 AM) to 23 (11:00 PM).
- _Minute_ - Required. Number of minutes, usually in the range 0 to 59.
- _Second_ - Required. Number of seconds, usually in the range 0 to 59.
- _Milliseconds_ - Optional. Number of milliseconds, usually in the range 0 to 999.

**DateTime**( _Year_, _Month_, _Day_, _Hour_, _Minute_, _Second_ [, _Milliseconds_ ] )

- _Year_ - Required. Numbers greater than 1899 are interpreted as absolute (1980 is interpreted as 1980); numbers that range from 0 to 1899 are interpreted as relative to 1900. (For example, 80 is interpreted as 1980.)
- _Month_ - Required. A number that ranges from 1 to 12.
- _Day_ - Required. A number that ranges from 1 to 31.
- _Hour_ - Required. Number of hours, usually in the range 0 (12:00 AM) to 23 (11:00 PM)
- _Minute_ - Required. Number of minutes, usually in the range 0 to 59.
- _Second_ - Required. Number of seconds, usually in the range 0 to 59.
- _Milliseconds_ - Optional. Number of milliseconds, usually in the range 0 to 999.

## Examples

### Date

If a user typed 
- **1979** in a text-input control named **HireYear**
- **3** in a text-input control named **HireMonth**
- **17** in a text-input control named **HireDay**

this formula would return `3/17/1979`:

```power-fx
Date( Value(HireYear.Text), Value(HireMonth.Text), Value(HireDay.Text) )
```

### Time

If a user typed
- **14** in a text-input control named **BirthHour**
- **50** in a text-input control named **BirthMinute**
- **24** in a text-input control named **BirthSecond**

this formula would return `02:50:24 P`:

```power-fx
Text( 
    Time(Value(BirthHour.Text), Value(BirthMinute.Text), Value(BirthSecond.Text)), 
    "hh:mm:ss A/P" 
)
```

### DateTime

If a user typed 
- **2023** in a text-input control named **EclipseYear**
- **10** in a text-input control named **EclipseMonth**
- **28** in a text-input control named **EclipseDate**
- **13** in a text-input control named **EclipseHour**
- **14** in a text-input control named **EclipseMinute**
- **5** in a text-input control named **EclipseSecond**
- **231** in a text-input control named **EclipseMillisecond**

this formula would return `10/28/23 01:14:05.231 PM`:

```power-fx
Text(
    DateTime(Value(EclipseYear.Text), Value(EclipseMonth.Text), Value(EclipseDate.Text), 
        Value(EclipseHour.Text), Value(EclipseMinute.Text), 
        Value(EclipseSecond.Text), Value(EclipseSecond.Millisecond)
    ), 
    "yy/mm/dd hh:mm:ss.000 AM/PM"
)
```

---

## DateAdd, DateDiff, and TimeZoneOffset functions

Source: [function-dateadd-datediff.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-dateadd-datediff)

*Reference information including syntax and examples for the DateAdd, DateDiff, and TimeZoneOffset functions.*

# DateAdd, DateDiff, and TimeZoneOffset functions
| Functions | Applies to |
|-----------|------------|
| **DateAdd**</br>**DateDiff** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **TimeZoneOffset** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |

| Function | Applies to |
| - | - |
| **DateAdd** | |
| **DateDiff** | |
| **TimeZoneOffset** | |


Adds to or finds the difference in date/time values and converts between local time and UTC.

## Description

The **DateAdd** function adds a number of units to a date/time value. The result is a new date/time value. You can also subtract a number of units from a date/time value by specifying a negative value.

The **DateDiff** function returns the difference between two date/time values. The result is a whole number of units.

For both functions, units can be **TimeUnit.Milliseconds**, **TimeUnit.Seconds**, **TimeUnit.Minutes**, **TimeUnit.Hours**, **TimeUnit.Days**, **TimeUnit.Months**, **TimeUnit.Quarters**, or **TimeUnit.Years**. By default, both functions use **TimeUnit.Days** as units.

The **TimeZoneOffset** function returns the number of minutes between the user's local time and UTC (Coordinated Universal Time).

You can use **DateAdd** with the **TimeZoneOffset** to convert between the user's local time and UTC (Coordinated Universal Time). Adding **TimeZoneOffset** will convert a local time to UTC, and subtracting it (adding the negative) will convert from UTC to local time.

Also see [Date, Time, and DateTime data types](../data-types.md#date-time-and-datetime) and [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

## Syntax

**DateAdd**( _DateTime_, _Addition_ [, *Units* ] )

- _DateTime_ - Required. Date/time value to operate on.
- _Addition_ - Required. Number, in _Units_, to add to the _DateTime_.
- _Units_ - Optional. The type of _Units_ to add: **TimeUnit.Milliseconds**, **TimeUnit.Seconds**, **TimeUnit.Minutes**, **TimeUnit.Hours**, **TimeUnit.Days**, **TimeUnit.Months**, **TimeUnit.Quarters**, or **TimeUnit.Years**. If not specified, **TimeUnit.Days** are used.

**DateDiff**( _StartDateTime_, _EndDateTime_ [, *Units* ] )

- _StartDateTime_ - Required. Starting date/time value.
- _EndDateTime_ - Required. Ending date/time value.
- _Units_ - Optional. The type of _Units_ to subtract: **TimeUnit.Milliseconds**, **TimeUnit.Seconds**, **TimeUnit.Minutes**, **TimeUnit.Hours**, **TimeUnit.Days**, **TimeUnit.Months**, **TimeUnit.Quarters**, or **TimeUnit.Years**. If not specified, **TimeUnit.Days** are used.

**TimeZoneOffset**( [ *DateTime* ] )

- _DateTime_ - Optional. Date/time value for which to return the offset. By default, the current date/time is used.

## Examples

In all of these examples, assume that the current date and time is **July 15, 2013, 1:02 PM**.

### Simple DateAdd

| Formula                                                                 | Description                                                                                    | Result             |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------ |
| **Text( DateAdd( Now(), 3 ),<br>"dd-mm-yyyy hh:mm" )**                  | Adds three days (default units) to the current date and time.                                  | "18-07-2013 13:02" |
| **Text( DateAdd( Now(), 4, TimeUnit.Hours ),<br>"dd-mm-yyyy hh:mm" )**           | Add four hours to the current date and time.                                                   | "15-07-2013 17:02" |
| **Text( DateAdd( Today(), 1, TimeUnit.Months ),<br>"dd-mm-yyyy hh:mm" )**        | Adds one month to the current date, without time as **Today** doesn't return a time component. | "15-08-2013 00:00" |
| **Text( DateAdd( Now(), &#8209;30, TimeUnit.Minutes ),<br>"dd-mm-yyyy hh:mm" )** | Subtracts 30 minutes from the current date and time.                                           | "15-07-2013 12:32" |

### Simple DateDiff

| Formula                                              | Description                                                                                                                                                                 | Result |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **DateDiff( Now(), DateValue("1/1/2014") )**         | Returns the difference between the two units in the default units of **TimeUnit.Days**                                                                                               | 170    |
| **DateDiff( Now(), DateValue("1/1/2014"), TimeUnit.Months )** | Returns the difference between the two values in **TimeUnit.Months**                                                                                                                 | 6      |
| **DateDiff( Now(), Today(), TimeUnit.Minutes )**              | Returns the difference between the current date/time and the current date only (no time) in minutes. Since the **Now** is later than **Today** the result will be negative. | -782   |

### Difference of dates with fractional results

The function DateDiff only returns a whole number of the units being subtracted, and the precision is given in the unit specified. To calculate the difference with a higher precision, use a smaller unit, and convert the result appropriately, like in the examples below.

| Formula                                                                    | Description                                                                                                        | Result |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| **DateDiff( TimeValue("09:45:00"), TimeValue("10:15:36"), TimeUnit.Hours )**        | The minutes/seconds are ignored, the difference is based on the time up to the hour.                               | 1      |
| **DateDiff( TimeValue("09:45:00"), TimeValue("10:15:36"), TimeUnit.Minutes )/60**   | The minutes are used in the difference, and the result is divided by 60 to have the difference in hours.           | 0.5    |
| **DateDiff( TimeValue("09:45:00"), TimeValue("10:15:36"), TimeUnit.Seconds )/3600** | The minutes and seconds are used in the difference; the result is divided by 3600 to have the difference in hours. | 0.51   |

### Converting to UTC

To convert to UTC (Coordinated Universal Time), add the **TimeZoneOffset** for the given time.

For example, imagine the current date and time is **July 15, 2013, 1:02 PM** in Pacific Daylight Time (PDT, UTC-7). To determine the current time in UTC, use:

- **DateAdd( Now(), TimeZoneOffset(), TimeUnit.Minutes )**

**TimeZoneOffset** defaults to the current time, so you don't need to pass it an argument.

To see the result, use the **Text** function with the format _dd-mm-yyyy hh:mm_, which will return **15-07-2013 20:02**.

### Converting from UTC

To convert from UTC, subtract the **TimeZoneOffset** (by adding the negative) for the given time.

For example, imagine the UTC date and time **July 15, 2013, 8:02 PM** is stored in a variable named **StartTime**. To adjust the time for the user's time zone, use:

- **DateAdd( StartTime, &minus;TimeZoneOffset( StartTime ), TimeUnit.Minutes )**

Note the negative sign before **TimeZoneOffset** to subtract the offset rather than add it.

To see the result, use the **Text** function with the format _dd-mm-yyyy hh:mm_, which will result in **15-07-2013 13:02** if you're in Pacific Daylight Time.

---

## DateValue, TimeValue, and DateTimeValue functions

Source: [function-datevalue-timevalue.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datevalue-timevalue)

*Reference information including syntax and examples for the DateValue, TimeValue, and DateTimeValue functions.*

# DateValue, TimeValue, and DateTimeValue functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Converts date, time, or both in a _string_ to a _date/time_ value.

## Description

- **DateValue** function converts a _date string_ (like "10/01/2014") to a _date/time_ value.

- **TimeValue** function converts a _time string_ (like "12:15 PM") to a _date/time_ value.

- **DateTimeValue** function converts a _date and time string_ (like "January 10, 2013 12:13 AM") to a _date/time_ value.

**DateValue** function ignores any time information in the date string, and **TimeValue** function ignores any date information in the time string.

> [!NOTE]
> The DateValue, TimeValue, and DateTimeValue functions by default use the language from the current user's settings. You can override it to ensure that strings are interpreted properly. For example, "10/1/1920" is interpreted as _October 1_ in "_en_" and as _January 10_ in "_fr_".

Dates must use one of these formats:

- MM/DD/YYYY or MM-DD-YYYY
- DD/MM/YYYY or DD-MM-YYYY
- YYYY/MM/DD or YYYY-MM-DD
- MM/DD/YY or MM-DD-YY
- DD/MM/YY or DD-MM-YY
- DD Mon YYYY
- Month DD, YYYY

To convert from numeric date, month and year components, read [Date](function-date-time.md). <br>
To convert from numeric hour, minute and second components, read [Time](function-date-time.md).

For more information, see:

- [Working with date and time](/power-apps/maker/canvas-apps/show-text-dates-times)
- [Date/time and data types](../data-types.md#date-time-and-datetime)

## Syntax

**DateValue**( _String_ [, *Language*] )<br>
**DateTimeValue**( _String_ [, *Language* ] )<br>
**TimeValue**( _String_ [, *Language* ] )

- _String_ - Required. A text string that contains a date, time, or combination date and time value.
- _Language_ - Optional. A language string, such as would be returned by the first two characters from the [Language](function-language.md) function. If not provided, the language of the current user's settings is used.

**DateValue**( _Dynamic_ )<br>
**DateTimeValue**( _Dynamic_ )<br>
**TimeValue**( _Dynamic_ )

- _Dynamic_ - Required. [**Dynamic** value](../untyped-object.md) that represents a date or time. Acceptable values are dependent on the untyped provider. For [**JSON**](function-parsejson.md), the dynamic value is expected to be a JSON string that contains a date and time in ISO 8601 format. Dates or times in other formats result in an error. Consider converting such values to [**Text**](function-text.md) first, then to a date or time. Keep in mind that time zones and locale-related formats are important considerations when communicating with external systems.

## Examples

### DateValue

If you type **10/11/2014** into a text-input control named **Startdate**, and then set the [Text](/power-apps/maker/canvas-apps/controls/properties-core) property of a label to these formulas:

- Convert a date from a string in the user's locale and show the result as a long date.

  ```power-fx
  Text( DateValue( Startdate.Text ), DateTimeFormat.LongDate )
  ```

  Device set to **en** locale shows the label as **Saturday, October 11, 2014**.

  > [!NOTE]
  > You can use several options with the **DateTimeFormat** enum. To display a list of options, type the parameter followed by a dot or period (**.**) in the formula bar or check [**Text** function reference](function-text.md).

- Convert date from a string in the French locale and show the result as a long date. In this example, the months and day of the month are interpreted differently from English.

  ```power-fx
  Text( DateValue( Startdate.Text, "fr" ), DateTimeFormat.LongDate )
  ```

  Device set to **en** locale shows the label as **Monday, November 10, 2014**.

If you enter **October 20, 2014** instead:

- Convert a date from a string in the user's locale and calculate the difference between two days, in days

  ```power-fx
  DateDiff( DateValue( Startdate.Text ), Today() )
  ```

  Device set to **en** locale shows the label as **9**, indicating the number of days between October 11 and October 20. The [DateDiff](function-dateadd-datediff.md) function can also show the difference in months, quarters, or years.

### DateTimeValue

If you typed **10/11/2014 1:50:24.765 PM** into a text-input control named **Start**, and then set the [Text](/power-apps/maker/canvas-apps/controls/properties-core) property of a label to the following formula:

- Convert both a date and time string in the current locale.

  ```power-fx
  Text( DateTimeValue( Start.Text ), DateTimeFormat.LongDateTime )
  ```

  Device set to **en** locale shows the label as **Saturday, October 11, 2014 1:50:24 PM**.

  > [!NOTE]
  > You can use several options with the **DateTimeFormat** enum. To display a list of options, type the parameter followed by a dot or period (**.**) in the formula bar or check [**Text** function reference](function-text.md).

- Convert both a date and time string in the French locale. Month and day of the month are interpreted differently.

  ```power-fx
  Text( DateTimeValue( Start.Text, "fr"), DateTimeFormat.LongDateTime )
  ```

  Device set to **en** locale shows the label as **Monday, November 10, 2014 1:50:24 PM**.

- Convert both a date and time string in the user's locale, and display the result with a fractional second.

  ```power-fx
  Text( DateTimeValue( Start.Text ), "dddd, mmmm dd, yyyy hh:mm:ss.fff AM/PM" )
  ```

  Device set to **en** locale shows the label as **Saturday, October 11, 2014 01:50:24.765 PM**.

  As an alternative, you can specify **hh:mm:ss.f** or **hh:mm:ss.ff** to round the time to the nearest 10<sup>th</sup> or 100<sup>th</sup> of a second.

### TimeValue

Name a text-input control **FinishedAt**, and set the [Text](/power-apps/maker/canvas-apps/controls/properties-core) property of a label to this formula:

```power-fx
If( TimeValue( FinishedAt.Text ) < TimeValue( "5:00:00.000 PM" ),
    "You made it!",
    "Too late!"
)
```

- If you type **4:59:59.999 PM** in the **FinishedAt** control, the label shows "_You made it!_"
- If you type **5:00:00.000 PM** in the **FinishedAt** control, the label shows "_Too late!_"

---

## Day, Month, Year, Hour, Minute, Second, and Weekday functions

Source: [function-datetime-parts.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts)

*Reference information including syntax and examples for the Day, Month, Year, Hour, Minute, Second, and Weekday functions.*

# Day, Month, Year, Hour, Minute, Second, and Weekday functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns individual components of a Date/Time value.

## Description

The **Day** function returns the day component of a Date/Time value, ranging from 1 to 31.

The **Month** function returns the month component of a Date/Time value, ranging from 1 to 12.

The **Year** function returns the year component of a Date/Time value, starting with 1900.

The **Hour** function returns the hour component of a Date/Time value, ranging from 0 (12:00 AM) to 23 (11:00 PM).

The **Minute** function returns the minute component of a Date/Time value, ranging from 0 to 59.

The **Second** function returns the second component of a Date/Time value, ranging from 0 to 59.

The **Weekday** function returns the weekday of a Date/Time value. By default, the result ranges from 1 (Sunday) to 7 (Saturday). You can specify a different range with a Microsoft Excel Weekday function code or a StartOfWeek enumeration value:

| Excel code    | StartOfWeek enumeration    | Description                                       |
| ------------- | -------------------------- | ------------------------------------------------- |
| **1**, **17** | **StartOfWeek.Sunday**     | Numbers 1 (Sunday) through 7 (Saturday). Default. |
| **2**, **11** | **StartOfWeek.Monday**     | Numbers 1 (Monday) through 7 (Sunday).            |
| **3**         | **StartOfWeek.MondayZero** | Numbers 0 (Monday) through 6 (Sunday).            |
| **12**        | **StartOfWeek.Tuesday**    | Numbers 1 (Tuesday) through 7 (Monday).           |
| **13**        | **StartOfWeek.Wednesday**  | Numbers 1 (Wednesday) through 7 (Tuesday).        |
| **14**        | **StartOfWeek.Thursday**   | Numbers 1 (Thursday) through 7 (Wednesday).       |
| **15**        | **StartOfWeek.Friday**     | Numbers 1 (Friday) through 7 (Thursday).          |
| **16**        | **StartOfWeek.Saturday**   | Numbers 1 (Saturday) through 7 (Friday).          |

All functions return a number.

See [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

## Syntax

**Day**( _DateTime_ )<br>**Month**( _DateTime_ )<br>**Year**( _DateTime_ )<br>**Hour**( _DateTime_ )<br>**Minute**( _DateTime_ )<br>**Second**( _DateTime_ )

- _DateTime_ - Required. Date/Time value to operate on.

**Weekday**( _DateTime_ [, *WeekdayFirst* ] )<br>

- _DateTime_ - Required. Date/Time value to operate on.
- _WeekdayFirst_ - Optional. Excel code specifying which day starts the week. If not supplied, 1 (Sunday first) is used.

## Examples

For the following example, the current time is **3:59:37 PM** on **Thursday, April 9, 2015**.

| Formula                                                    | Description                                                                                                                                    | Result |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Year(&nbsp;Now()&nbsp;)**                                | Returns the year component of the current time and date.                                                                                       | 2015   |
| **Month(&nbsp;Now()&nbsp;)**                               | Returns the month component of the current time and date.                                                                                      | 4      |
| **Day(&nbsp;Now()&nbsp;)**                                 | Returns the day component of the current time and date.                                                                                        | 9      |
| **Hour(&nbsp;Now()&nbsp;)**                                | Returns the hour component of the current time and date.                                                                                       | 15     |
| **Minute(&nbsp;Now()&nbsp;)**                              | Returns the minute component of the current time and date.                                                                                     | 59     |
| **Second(&nbsp;Now()&nbsp;)**                              | Returns the second component of the current time and date.                                                                                     | 37     |
| **Weekday(&nbsp;Now()&nbsp;)**                             | Returns the weekday component of the current time and date, using the default start of the week as Sunday.                                     | 5      |
| **Weekday(&nbsp;Now(),&nbsp;14&nbsp;)**                    | Returns the weekday component of the current time and date, using an Excel code to specify the start of the week as Thursday.                  | 1      |
| **Weekday(&nbsp;Now(),&nbsp;StartOfWeek.Wednesday&nbsp;)** | Returns the weekday component of the current time and date, using a **StartOfWeek** enumeration to specify the start of the week as Wednesday. | 2      |

---

## Hex2Dec and Dec2Hex functions

Source: [function-hexdec.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-hexdec)

*Reference information including syntax and examples for the Hex2Dec and Dec2Hex functions in Power Fx.*

# Dec2Hex and Hex2Dec functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Convert between hexadecimal text strings and numbers.

## Description

Use the **Dec2Hex** function to convert a number to a hexadecimal text string. **Dec2Hex** emits the characters `0` through `9` and upper case characters `A` through `F`; use the [**Lower**](function-lower-upper-proper.md) function to convert the result to lower case if desired. **Dec2Hex** truncates the input number to a whole number as if the [**Trunc**](function-round.md) function has been applied first. Use *Places* to pad a positive number with leading `0`s (zeros) and limit the length of the output; *Places* is ignored if the input is negative.

Use the **Hex2Dec** function to convert a text string containing hexadecimal digits (`0` through `9` and `A` through `F`) to a number. Upper and lower case characters are accepted. No more than 10 hexadecimal characters can be passed to **Hex2Dec**.

Both these functions work with a 40 bit, two's-complement, whole number. The range of accepted values for both functions is hexadecimal 8000000000 or decimal -549755813888 to hexadecimal 7FFFFFFFFF or decimal 549755813887.

If you pass a single number or text string to these functions, the return value is a single result.  If you pass a single-column [table](/power-apps/maker/canvas-apps/working-with-tables) the return value is a single-column table of results, one result for each record in the argument's table. If you have a multi-column table, you can shape it into a single-column table, as [working with tables](/power-apps/maker/canvas-apps/working-with-tables) describes.  

If the input value is out of range or includes invalid hexadecimal characters, an **ErrorKind.Numeric** error is returned. If the input was a single column table, the error is embedded in the output table.

## Syntax

**Dec2Hex**( *Number* [, *Places*] )

- *Number* - Required. Number to convert to hexadecimal.
- *Places* - Optional. The number of characters to use if the number is positive. If *Places* is omitted, **Dec2Hex** uses the minimum number of characters necessary. If this parameter is provided, and the result doesn't fit in the space provided, an **ErrorKind.Numeric** error is returned. *Places* is ignored if the number to convert is negative.

**Hex2Dec**( *HexString* )

- *HexString* - Required. String of hexadecimal digits to convert to a number.

## Examples

### Basic usage of Hex2Dec

| Formula | Result |
| --- | --- |
| `Hex2Dec( "A5" )` | `165` |
| `Hex2Dec( "FFFFFFFF5B")` | `-165` |
| `Hex2Dec( "c8d" )` | `3213` |
| `Hex2Dec( "fffffff373" )` | `-3213` |
| `Hex2Dec( "ffffffffff" )` | `-1` |
| `Hex2Dec( "ffffffffffff" )` | `error (out of range)` |
| `Hex2Dec( "43j" )` | `error (invalid hexadecimal character)` |
| `Hex2Dec( [ "A", "12", "FFFF" ] )` | `[ 10, 18, 65535 ]` |
| `Hex2Dec( [ "3", "E", "I", "B" ] )` | `[ 3, 14, error (invalid hexadecimal character), 11 ]` |

### Basic usage of Dec2Hex

| Formula | Result |
| --- | --- |
| `Dec2Hex( 165 )`        | `"A5"` |
| `Dec2Hex( -165 )`       | `"FFFFFFFF5B"` |
| `Dec2Hex( 3213 )`       | `"c8d"` |
| `Dec2Hex( -3213 )`      | `"FFFFFFF373"` |
| `Dec2Hex( -1 )`         | `"FFFFFFFFFF"` |
| `Dec2Hex( 3.74 )`       | `"3"` |
| `Dec2Hex( -3.74 )`      | `"FFFFFFFFFD"` |
| `Dec2Hex( [ 10, 255, -16 ] )` | `[ "A", "FF", "FFFFFFFFF0" ]` |
| `Dec2Hex( 1e45 )`       | `error (out of range)` |
| `Dec2Hex( [ 1, 1e-45, 1e45, 2 ] )` | `[ "1", "0", error (out of range), "2" ]` |

### Basic usage of Dec2Hex with Places argument

| Formula | Result |
| --- | --- |
| `Dec2Hex( 45780 )`      | `"B2D4"` |
| `Dec2Hex( 45780, 4 )`   | `"B2D4"` |
| `Dec2Hex( 45780, 5 )`   | `"0B2D4"` |
| `Dec2Hex( 45780, 6 )`   | `"00B2D4"` |
| `Dec2Hex( 45780, 3 )`   | `error (not enough space)` |
| `Dec2Hex( 45780, 11 )`  | `error (out of range)` |
| `Dec2Hex( -45780 )`     | `"FFFFFF4D2C"` | 
| `Dec2Hex( -45780, 4 )`  | `"FFFFFF4D2C"` | 
| `Dec2Hex( -45780, 6 )`  | `"FFFFFF4D2C"` | 
| `Dec2Hex( -45780, 10 )` | `"FFFFFF4D2C"` | 
| `Dec2Hex( -45780, 11 )` | `error (out of range)` | 

### Basic usage of Dec2Hex with single column tables and Places argument

| Formula | Result |
| --- | --- |
| `Dec2Hex( [ 10, 255, -16 ], [ 1, 2, 3 ] )`      | `[ "A", "FF", "FFFFFFFFF0" ]` |
| `Dec2Hex( [ 10, 255, -16 ], 4 )`   | `[ "000A", "00FF", "FFFFFFFFF0" ]` |
| `Dec2Hex( 255, [0, 1, 2, 3] )`   | `[ error (not enough space), error (not enough space), "FF", "0FF" ]` |

---

## Decimal, Float, and Value functions

Source: [function-value.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-value)

*Reference information including syntax and examples for the Decimal, Float, and Value functions.*

# Decimal, Float, and Value functions
| Function | Applies to |
|-----------|------------|
| **Decimal** | 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **Float** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **Value** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Converts a string of text or other types to a number.

## Description

> [!NOTE]
> Power Apps only supports the **Value** function and it returns a **Float** value. Support for the **Decimal** and **Float** functions will be added soon. 

Use the **Decimal**, **Float**, and **Value** functions to convert a string of text that contains number characters to a numeric value. Use these function when you need to perform calculations on numbers that were entered as text by a user. These functions can also be used to convert other types to a number, such as date/time and Boolean.

The **Value** function will return the default numeric data type for the Power Fx host you are using, which is usually **Decimal** and the best choice for most situations. Use the **Decimal** and **Float** functions when you need a specific data type for a particular scenario, such as a scientific calculation with a very large number. For more details on working with these data types, see [the Numbers section of Data types](../data-types.md#numbers).

Different languages interpret **,** and **.** differently. By default, the text is interpreted in the language of the current user. You can specify the language to use with a language tag, using the same language tags that are returned by the **[Language](function-language.md)** function.

Notes on the format of the string:

- The string may be prefixed with the currency symbol for the current language. The currency symbol is ignored. Currency symbols for other languages aren't ignored.
- The string may be include a percent sign (**%**) at the end, indicating that it's a percentage. The number will be divided by 100 before being returned. Percentages and currency symbols can't be mixed.
- The string may be in scientific notation, with 12 x 10<sup>3</sup> expressed as "12e3".

If the number isn't in a proper format, these functions will return an error.

To convert date and time values, use the [**DateValue**](function-datevalue-timevalue.md), [**TimeValue**](function-datevalue-timevalue.md), or [**DateTimeValue**](function-datevalue-timevalue.md) functions.

## Syntax

**Decimal**( _String_ [, _LanguageTag_ ] )<br>
**Float**( _String_ [, _LanguageTag_ ] )<br>
**Value**( _String_ [, _LanguageTag_ ] )

- _String_ - Required. String to convert to a numeric value.
- _LanguageTag_ - Optional. The language tag in which to parse the string. If not specified, the language of the current user is used.

**Decimal**( _Dynamic_ )<br>
**Float**( _Dynamic_ )<br>
**Value**( _Dynamic_ )

- _Dynamic_ - Required. [**Dynamic**](../untyped-object.md) value that represents a number. Acceptable values are dependent on the untyped provider.  For [**JSON**](function-parsejson.md), the dynamic value is expected to be a JSON number, boolean, or text that can be converted to a number. Keep in mind that locale-related formats are important considerations when communicating with external systems.

## Examples

The user running these formulas is located in the United States and has selected English as their language. The **Language** function is returning "en-US". The Power Fx host uses **Decimal** by default.

### Value and Decimal

Since we are using a host that has **Decimal** as the default, **Value** and **Decimal** will return the same results.

| Formula                         | Description                                                                                    | Result  |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| **Value(&nbsp;"123.456"&nbsp;)**<br>**Decimal(&nbsp;"123.456"&nbsp;)**          | The default language of "en-US" will be used, which uses a period as the decimal separator.    | 123.456 (**Decimal**) |
| **Value(&nbsp;"123.456",&nbsp;"es-ES"&nbsp;)**<br>**Decimal(&nbsp;"123.456",&nbsp;"es-ES"&nbsp;)** | "es-ES" is the language tag for Spanish in Spain. In Spain, a period is a thousands separator. | 123456 (**Decimal**) |
| **Value(&nbsp;"123,456"&nbsp;)**<br>**Decimal(&nbsp;"123,456"&nbsp;)**        | The default language of "en-US" will be used, which uses a comma as a thousands separator.     | 123456 (**Decimal**) |
| **Value(&nbsp;"123,456",&nbsp;"es-ES"&nbsp;)**<br>**Decimal(&nbsp;"123,456",&nbsp;"es-ES"&nbsp;)** | "es-ES" is the language tag for Spanish in Spain. In Spain, a comma is the decimal separator.  | 123.456 (**Decimal**) |
| **Value(&nbsp;"12.34%"&nbsp;)**<br>**Decimal(&nbsp;"12.34%"&nbsp;)** | The percentage sign at the end of the string indicates that this is a percentage.              | 0.1234 (**Decimal**) |
| **Value(&nbsp;"$&nbsp;12.34"&nbsp;)**<br>**Decimal(&nbsp;"$&nbsp;12.34"&nbsp;)**          | The currency symbol for the current language is ignored.                                       | 12.34 (**Decimal**) |
| **Value(&nbsp;"24e3"&nbsp;)**<br>**Decimal(&nbsp;"24e3"&nbsp;)**             | Scientific notation for 24 x 10<sup>3</sup>.                                                   | 24000 (**Decimal**)  |
| **Value(&nbsp;true&nbsp;)**<br>**Decimal(&nbsp;true&nbsp;)**               | Converts a Boolean to a number, 0 for *false* and 1 for *true* | 1 **Decimal** |

### Float

The **Float** function will have very close to the same results as above. Since 123.456 cannot be precisely represented in **Float**, the result is an approximation that is very close (123.456000000000003069544618484E2) and compounding rounding errors calculations could result in an unexpected result. The resulting type will be **Float** instead.

Where things diverge is if larger or smaller numbers are used.

| Formula | Description | Result |
|---------|-------------|--------|
| **Float(&nbsp;1e100&nbsp;)** | Because the literal number `1e100` is beyond the range of a **Decimal**, this results in an error before ever calling the **Float** function.  | *error (overflow)* | 
| **Decimal(&nbsp;1e100&nbsp;)** | Same problem as with the **Float** function.  | *error (overflow)* |
| **Float(&nbsp;"1e100"&nbsp;)** | The number in the text string is within the range of **Float** numbers.  | 1e100 **Float** |
| **Decimal(&nbsp;"1e100"&nbsp;)** |  The number in the text string is beyond the range of **Decimal** numbers. | *error (overflow)* |
| **Float(&nbsp;"10000000000.0000000001"&nbsp;)** | The number in the text string is within the range of **Float** numbers.  However, the number requires more precision than a **Float** can provide and will be truncated. | 1 (**Float**) |
| **Decimal(&nbsp;"10000000000.0000000001"&nbsp;)** |  The number in the text string is within both the range and precision of a **Decimal** numbers. | 10000000000.0000000001 (**Decimal**) |

---

## Defaults function

Source: [function-defaults.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-defaults)

*Reference information including syntax and examples for the Defaults function.*

# Defaults function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Returns the default values for a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Description

Use the **Defaults** function to prepopulate a data entry form, making it easier to fill.

This function returns a [record](/power-apps/maker/canvas-apps/working-with-tables#records) that contains the default values for the data source. If a [column](/power-apps/maker/canvas-apps/working-with-tables#columns) within the data source doesn't have a default value, that property isn't present.

Data sources vary in how much default information they provide, including not providing any at all. When you work with a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections) or another data source that doesn't support default values, the **Defaults** function returns an [empty](function-isblank-isempty.md) record.

You can combine the **Defaults** function with the **[Patch](function-patch.md)** function to [create a record](/power-apps/maker/canvas-apps/working-with-data-sources).

## Syntax

**Defaults**( _DataSource_ )

- _DataSource_ – Required. The data source for which you want default values.

## Examples

| Formula                          | Description                                                | Result           |
| -------------------------------- | ---------------------------------------------------------- | ---------------- |
| **Defaults(&nbsp;Scores&nbsp;)** | Returns the default values for the **Scores** data source. | **{ Score: 0 }** |

---

## Enable and Disable functions

Source: [function-enable-disable.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-enable-disable)

*Reference information including syntax and examples for the Enable and Disable functions.*

# Enable and Disable functions
**Applies to:** 
- ✓ Canvas apps



Turns a [signal](signals.md) on or off.

## Overview

Some signals can change often, requiring the app to recalculate as they do. Rapid changes over a long period of time can drain a device's battery. You can use these functions to manually turn a signal on or off.

When a signal isn't in use, it's automatically turned off.

## Description

The **Enable** and **Disable** functions turn a signal on and off, respectively.

These functions currently only work for the **[Location](signals.md)** signal.

These functions have no return value. You can use them only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Enable**( _Signal_ )<br>**Disable**( _Signal_ )

- _Signal_ - Required. The signal to turn on or off.

---

## Distinct function

Source: [function-distinct.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-distinct)

*Reference information including syntax and examples for the Distinct function.*

# Distinct function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Summarizes [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [table](/power-apps/maker/canvas-apps/working-with-tables), removing duplicates.

## Description

The **Distinct** function evaluates a formula across each record of a table and returns a one-column table of the results with duplicate values removed. The name of the column is **Value**.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

When used with a data source, this function can't be delegated. Only the first portion of the data source will be retrieved and then the function applied. The result may not represent the complete story.  A warning may appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](../maker/canvas-apps/delegation-overview.md).

## Syntax

**Distinct**( _Table_, _Formula_ )

- _Table_ - Required. Table to evaluate across.
- _Formula_ - Required. Formula to evaluate for each record.

## Example

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
   ```

1. Select the button while holding down the Alt key.

   The formula is evaluated and the **CityPopulations** collection is created which you can show by selecting **CityPopulations** in the formula bar:

    > [!div class="mx-imgBorder"] 
    > ![CityPopulations collection shown in result view.](media/function-distinct/citypopulations-create.png)

1. Insert a [**Data table**](/power-apps/maker/canvas-apps/controls/control-data-table) control, and set its **Items** property to this formula:

   ```power-fx
   Distinct( CityPopulations, Country )
   ```

   You can view the result of this formula in the formula bar by selecting the entire formula:

    > [!div class="mx-imgBorder"] 
    > ![Output from Distinct function shown in result view.](media/function-distinct/citypopulations-distinct.png)

1. Use the **Edit fields** link in the data table's properties pane to add the **Value** column:

    > [!div class="mx-imgBorder"] 
    > ![Output from Distinct function shown in data table.](media/function-distinct/citypopulations-datatable.png)

1. Insert a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control, and set its **Text** property to the formula:

   ```power-fx
   First( Sort( Distinct( CityPopulations, Country ), Value ) ).Value
   ```

   This formula sorts the results from **Distinct** with the [**Sort**](function-sort.md) function, takes the first record from the resulting table with the [**First**](function-first-last.md) function, and extracts the **Result** field to obtain just the country/region name.

    > [!div class="mx-imgBorder"] 
    > ![Output from Distinct function showing the first country/region by name.](media/function-distinct/citypopulations-first.png)

---

## Download function

Source: [function-download.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-download)

*Reference information including syntax and examples for the Download function.*

# Download function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Downloads a file from the web to the local device.

## Description

The **Download** function downloads a file from the web to the local device.

In native players (Windows, Android, and iOS), the user is prompted for a location to save the file.

When used on the web, **Download** is dependent on the browser's settings and pop-up blocker configuration to determine what happens with the file. For images, videos, PDFs, and other file types that the browser natively supports, a new browser tab is opened to display the file. Many browsers support saving the contents to the local file system.

Only on Windows, **Download** returns the location where the file was stored locally as a text string.

**Download** can only be used in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Download**( _Address_ )

- _Address_ – Required. The URL address of a web resource to download.

> [!NOTE]
> Power Apps cannot authenticate download requests to the address provided in the Download() function.
>
> For example, when using this function to download a file stored on a SharePoint site that requires authentication, the request might work when using a web browser since the browser session might authenticate against the SharePoint site using cached credentials. However, in Power Apps mobile app, the request won't work since authenticating the download request is not handled by the mobile device.


## Examples

### Simple Download

The following formula downloads the user's guide for the Surface Book, a PDF file:

```power-fx
Download( "https://go.microsoft.com/fwlink/?linkid=827480" )
```

When run in a mobile device, the user is prompted for a location to save the file.

When run in most web browsers, a new tab is opened to display the PDF file as most browsers natively support this file type.

### Step by Step

The **Product Showcase** tablet layout template was used for the following example. To create an app with this template, follow the steps from [create an app](/power-apps/maker/canvas-apps/get-started-test-drive) article and select the **Product Showcase** template. You can also use your own app.

1. Go to [Power Apps](https://make.powerapps.com).
1. Select **Apps** from left navigation pane.
1. Select your app and then select **Edit**.
1. Select **Insert** from the menu and then select **Label**.
1. Move the label to the bottom right of the screen.
1. From the properties pane on the right-side, select **Color** as _white_ and set **Border thickness** at _1_.
1. Select the **Text** property from right-side and enter text as _Download User Guide_.
1. From property list on top left, select **OnSelect**.
1. Enter formula as `Download("https://go.microsoft.com/fwlink/?linkid=827480")`. You can also use any other URL of your choice.

   ![Download example.](media/function-download/download-example-onselect.png "Download example")

1. Save and publish the app.
1. Play the app.
1. Select the **Download User Guide** button to download the guide.

> [!NOTE]
> - Your browser settings determine whether to download the file or open the file directly in a new tab. For more details, go to [Download function description](#description).
> - If the Download formula is used to retrieve a file and the file isn’t downloaded successfully, it’s recommended to check whether the download is blocked by a browser pop-up blocker or if the browser is waiting for the user’s response to a dialog box asking for permission to download the file.

### See also

[Canvas app formula reference](/power-apps/maker/canvas-apps/formula-reference)

---

## EDate and EOMonth functions

Source: [function-edate-eomonth.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-edate-eomonth)

*Reference information including syntax and examples for the EDate and EOMonth functions.*

# EDate and EOMonth functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Adds or subtracts months to a Date/Time value, with optional adjustment to the day of the month.

## Description

The **EDate** and **EOMonth** functions move a Date/Time forward or backward by a specified number of months.

After the month adjustment, **EDate** leaves the day portion unmodified unless the new value would be beyond the end of the month. For example, moving July 31 backward by one month yields June 30. Use **EDate** to calculate the maturity dates or due dates that fall on the same day of the month as the date of issue.

After the month adjustment, **EOMonth** changes the day potion to the last day of the resulting month. Use **EOMonth** to calculate the maturity dates or due dates that fall on the last day of the month. **EOMonth** can be used to move a Date/Time to the end of the month by adding zero months.

All functions return a Date value. No time component is included, even if one was present in the input Date/Time.

See [working with dates and times](/power-apps/maker/canvas-apps/show-text-dates-times) for more information.

## Syntax

**EDate**( _DateTime_, _NumberOfMonths_ )

- _DateTime_ - Required. Date/Time value to operate on.
- _NumberOfMonths_ - Required. Number of months to add or subtract to _DateTime_. A positive value yields a future date, a negative value yields a past date, and zero leaves the entire input _DateTime_ unchanged.

**EOMonth**( _DateTime_, _NumberOfMonths_ )

- _DateTime_ - Required. Date/Time value to operate on.
- _NumberOfMonths_ - Required. Number of months to add or subtract to _DateTime_. A positive value yields a future date, a negative value yields a past date, and zero changes the day portion of the input _DateTime_ to the end of the month.

## Examples

### EDate

| Formula                                                    | Description                                                                       | Result            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| **EDate(&nbsp;Date(2023,5,15)&nbsp;,&nbsp;4&nbsp;)**       | Adds four months to May 15, 2023, leaving the date unchanged.                     | Date(2023,9,15)   |
| **EDate(&nbsp;Date(2023,5,15)&nbsp;,&nbsp;-1002&nbsp;)**   | Subtracts 1,002 months from May 15, 2023, leaving the date unchanged.             | Date(1939,11,15)   |
| **EDate(&nbsp;Date(2023,5,15)&nbsp;,&nbsp;0&nbsp;)**       | Adds zero months to May 15, 2023 leaving the month and year unchanged, also leaves the date unchanged. | Date(2023,5,15)   |
| **EDate(&nbsp;Date(2023,5,31)&nbsp;,&nbsp;1&nbsp;)**       | Adds one month to May 15, 2023, adjusting the date since June doesn't have as many days as May. | Date(2023,6,30)   |

### EOMonth

| Formula                                                     | Description                                                                       | Result            |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| **EOMonth(&nbsp;Date(2023,5,15);&nbsp;,&nbsp;4&nbsp;)**     | Adds four months to May 15, 2023, moving the date to the end of the month.        | Date(2023,9,30)   |
| **EOMonth(&nbsp;Date(2023,5,15);&nbsp;,&nbsp;-1002&nbsp;)** | Subtracts 1,002 months from May 15, 2023, moving the date to the end of the resulting month.  | Date(1939,11,30)   |
| **EOMonth(&nbsp;Date(2023,5,15);&nbsp;,&nbsp;0&nbsp;)**     | Adds zero months to May 15, 2023 leaving the month and year unchanged, moving the date to the end of the unmodified month.  | Date(2023,5,31)   |
| **EOMonth(&nbsp;Date(2023,5,31);&nbsp;,&nbsp;1&nbsp;)**     | Adds one month to May 15, 2023, moving the date to the end of the resulting month. | Date(2023,6,30)   |

---

## EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions

Source: [function-form.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-form)

*Reference information including syntax and examples for the EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions.*

# EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions
**Applies to:** 
- ✓ Canvas apps



View, edit, or create an item, save the contents, and reset the controls in an **[Edit form](/power-apps/maker/canvas-apps/controls/control-form-detail)** control.

## Overview

These functions change the state of the **Edit form** control. The form control can be in one of these modes:

| Mode              | Description                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FormMode.Edit** | The form is populated with an existing record and the user can modify the values of the fields. Once complete, the user can save the changes to the record. |
| **FormMode.New**  | The form is populated with default values and the user can modify the values of the fields. Once complete, the user can add the record to the data source.  |
| **FormMode.View** | The form is populated with an existing record but the user cannot modify the values of the fields.                                                          |

## Description

These functions are often invoked from the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** formula of a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** or **[Image](/power-apps/maker/canvas-apps/controls/control-image)** control so that the user can save edits, abandon edits, or create a record. You can [use controls and these functions together](/power-apps/maker/canvas-apps/working-with-forms) to create a complete solution.

These functions return no values.

You can use these functions only in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

### SubmitForm

Use the **SubmitForm** function in the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of a Button control to save any changes in a Form control to the data source.

Before submitting any changes, this function checks for validation issues with any field that's marked as required or that has one or more constraints on its value. This behavior matches that of the **[Validate](function-validate.md)** function.

**SubmitForm** also checks the **[Valid](/power-apps/maker/canvas-apps/controls/control-form-detail)** property of the Form, which is an aggregation of all the **[Valid](/power-apps/maker/canvas-apps/controls/control-card)** properties of the **[Card](/power-apps/maker/canvas-apps/controls/control-card)** controls that the Form control contains. If a problem occurs, the data isn't submitted, and the **[Error](/power-apps/maker/canvas-apps/controls/control-form-detail)** and **[ErrorKind](/power-apps/maker/canvas-apps/controls/control-form-detail)** properties of the Form control are set accordingly.

If validation passes, **SubmitForm** submits the change to the data source.

- If successful, the Form's **[OnSuccess](/power-apps/maker/canvas-apps/controls/control-form-detail)** behavior runs, and the **[Error](/power-apps/maker/canvas-apps/controls/control-form-detail)** and **[ErrorKind](/power-apps/maker/canvas-apps/controls/control-form-detail)** properties are cleared. If the form was in **FormMode.New** mode, it is returned to **FormMode.Edit** mode.
- If unsuccessful, the Form's **[OnFailure](/power-apps/maker/canvas-apps/controls/control-form-detail)** behavior runs, and the **[Error](/power-apps/maker/canvas-apps/controls/control-form-detail)** and **[ErrorKind](/power-apps/maker/canvas-apps/controls/control-form-detail)** properties are set accordingly. The mode of the form is unchanged.

### EditForm

The **EditForm** function changes the Form control's mode to **FormMode.Edit**. In this mode, the contents of the Form control's **[Item](/power-apps/maker/canvas-apps/controls/control-form-detail)** property are used to populate the form. If the **SubmitForm** function runs when the form is in this mode, a record is changed, not created. **FormMode.Edit** is the default for the Form control.

>[!NOTE]
> When the form is in edit mode and Item is null, data card properties are not evaluated and will return default values. 

### NewForm

The **NewForm** function changes the Form control's mode to **FormMode.New**. In this mode, the contents of the Form control's **[Item](/power-apps/maker/canvas-apps/controls/control-form-detail)** property are ignored, and the default values of the Form's **[DataSource](/power-apps/maker/canvas-apps/controls/control-form-detail)** property populate the form. If the **SubmitForm** function runs when the form is in this mode, a record is created, not changed.

### ResetForm

The **ResetForm** function resets the contents of a form to their initial values, before the user made any changes. If the form is in **FormMode.New** mode, the form is reset to **FormMode.Edit** mode. The **[OnReset](/power-apps/maker/canvas-apps/controls/control-form-detail)** behavior of the form control also runs. You can also reset individual controls with the **[Reset](function-reset.md)** function but only from within the form.

### ViewForm

The **ViewForm** function changes the Form control's mode to **FormMode.View**. In this mode, the contents of the Form control's **[Item](/power-apps/maker/canvas-apps/controls/control-form-detail)** property are used to populate the form. The **SubmitForm** and **ResetForm** functions have no effect when in this mode.

### DisplayMode Property

The current mode can be read through the **Mode** property. The mode also determines the value of the **DisplayMode** property, which can be used by data cards and controls within the form control. Often, the data card's **DisplayMode** property will be set to **Parent.DisplayMode** (referencing the form) as will the control's **DisplayMode** property (referencing the data card):

| Mode              | DisplayMode          | Description                                                                |
| ----------------- | -------------------- | -------------------------------------------------------------------------- |
| **FormMode.Edit** | **DisplayMode.Edit** | Data cards and controls are editable, ready to accept changes to a record. |
| **FormMode.New**  | **DisplayMode.Edit** | Data cards and controls are editable, ready to accept a new record.        |
| **FormMode.View** | **DisplayMode.View** | Data cards and controls are not editable and optimized for viewing.        |

## Syntax

**SubmitForm**( _FormName_ )

- _FormName_ - Required. Form control to submit to the data source.

**EditForm**( _FormName_ )

- _FormName_ - Required. Form control to switch to **FormMode.Edit** mode.

**NewForm**( _FormName_ )

- _FormName_ - Required. Form control to switch to **FormMode.New** mode.

**ResetForm**( _FormName_ )

- _FormName_ - Required. Form control to reset to initial values. Also switches the form from **FormMode.New** mode to **FormMode.Edit** mode.

**ViewForm**( _FormName_ )

- _FormName_ - Required. Form control to switch to **FormMode.View** mode.

## Examples

See [Understand data forms](/power-apps/maker/canvas-apps/working-with-forms) for complete examples.

1. Add a Button control, set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to show **Save**, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **SubmitForm( EditForm )**

2. Set the **[OnFailure](/power-apps/maker/canvas-apps/controls/control-form-detail)** property of a Form control to blank and its **[OnSuccess](/power-apps/maker/canvas-apps/controls/control-form-detail)** property to this formula:

   **Back()**

3. Name a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control **ErrorText**, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **EditForm.Error**

   When the user selects the **Save** button, any changes in the Form control are submitted to the underlying data source.

   - If the submission succeeds, any changes are saved or, if the Form control is in **New** mode, a record is created. **ErrorText** is _blank_ and the previous screen reappears.
   - If the submission fails, **ErrorText** shows a user-friendly error message, and the current screen remains visible so that the user can correct the problem and try again.

4. Add a Button control, set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to show **Cancel**, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **ResetForm( EditForm ); Back()**

   When the user selects the **Cancel** button, the values in the Form control are reset to what they were before the user started to edit it, the previous screen reappears, and the Form control is returned to **Edit** mode if it was in **New** mode.

5. Add a Button control, set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to show **New**, and set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:

   **NewForm( EditForm ); Navigate( EditScreen, None )**

   When the user selects the **New** button, the Form control switches to **New** mode, the default values for the Form control's data source populate that control, and the screen that contains the Form control appears. When the **SubmitForm** function runs, a record is created instead of updated.

---

## EncodeHTML, EncodeUrl, and PlainText functions

Source: [function-encode-decode.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-encode-decode)

*Reference information including syntax and examples for the EncodeHTML, EncodeUrl, and PlainText functions.*

# EncodeHTML, EncodeUrl, and PlainText functions
| Functions | Applies to |
|-----------|------------|
| **EncodeHTML** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions |
| **EncodeUrl**</br>**PlainText** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Encodes and decodes strings.

## Description

The **EncodeUrl** function encodes a URL string, replacing certain nonalphanumeric characters with % and a hexadecimal number.

The **EncodeHTML** function encodes a string, replacing certain characters that need to be escaped to appear properly in an HTML context. For example, the characters &lt;, &gt;, and &amp; are replaced by &amp;lt;, &amp;gt;, and &amp;amp;, respectively.

The **PlainText** function removes HTML and XML tags, converting certain tags such as these to an appropriate symbol:

- **&amp;nbsp;**
- **&amp;quot;**

The return value from these functions is the encoded or decoded string. This function doesn't remove all HTML and XML tags.

## Syntax

**EncodeUrl**( _String_ )

- _String_ - Required. URL to be encoded.

**EncodeHTML**( _String_ )

- _String_ - Required. HTML to be encoded.

**PlainText**( _String_ )

- _String_ - Required. String from which HTML and XML tags are stripped.

## Examples

If you show an RSS feed in a text gallery and then set the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property of a label in that gallery to **ThisItem.description**, the label might show raw HTML or XML code as in this example:

```html
<p>
  We have done an unusually&nbsp;&quot;deep&quot; globalization and
  localization.
</p>
```

If you set the **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property of the label to **PlainText(ThisItem.description)**, the text appears as in this example:

```
    We have done an unusually "deep" globalization and localization.
```

With the formula **EncodeHTML(ThisItem.description)**, the HTML tags are encoded so that they show up as text when interpreted as HTML, which can be useful to see the HTML structure:

```
&lt;p&gt;
  We have done an unusually&amp;nbsp;&amp;quot;deep&amp;quot; globalization and
  localization.
&lt;/p&gt;
```

If instead of a label you have an [HTML text control](/power-apps/maker/canvas-apps/controls/control-html-text) in the gallery, and you set the **[HtmlText](/power-apps/maker/canvas-apps/controls/control-html-text)** property of that control to **ThisItem.description** you also see the decoded text, because the HTML text control is interpreting the tags as HTML.

---

## EndsWith and StartsWith functions

Source: [function-startswith.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-startswith)

*Reference information including syntax and examples for the EndsWith and StartsWith functions.*

# EndsWith and StartsWith functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Dataverse formula columns
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Tests whether a text string begins or ends another text string.

## Description

The **EndsWith** function tests whether one text string ends with another.

The **StartsWith** function tests whether one text string begins with another.

For both functions, the tests are case insensitive if the back-end datasource supports it by default. For example, collections, Dataverse, SharePoint, and SQL Server support case insensitivity by default. Oracle does not. The return value of both is a Boolean **true** or **false**.

Use **EndsWith** and **StartsWith** with the **[Filter](function-filter-lookup.md)** function to search the data within your app. You can also use the **[in](operators.md#in-and-exactin-operators)** operator or the **[Search](function-filter-lookup.md)** function to look anywhere within text strings, not just at the beginning or end. Your choice of functions will depend on the needs of your app and which function can be [delegated](/power-apps/maker/canvas-apps/delegation-overview) for your particular data source. If one of these functions can't be delegated, a delegation warning will appear at authoring time to warn you of this limitation. 

## Syntax

**EndsWith**( _Text_, _EndText_ )

- _Text_ – Required. The text to test.
- _EndText_ – Required. The text to search for at the end of _Text_. If _EndText_ is an empty string, **EndsWith** returns _true_.

**StartsWith**( _Text_, _StartText_ )

- _Text_ – Required. The text to test.
- _StartText_ – Required. The text to search for at the beginning of _Text_. If _StartText_ is an empty string, **StartsWith** returns _true_.

## Examples

| Formula                                     | Description                                                                                                                                                                        | Result    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **EndsWith( "Hello World", "world" )**      | Tests whether **"Hello World"** ends with **"world"**. The test is case insensitive.                                                                                               | **true**  |
| **EndsWith( "Good bye", "good" )**          | Tests whether **"Good bye"** ends with **"good"**. The _EndText_ argument (**"good"**) appears in the text but not at the end.                                                     | **false** |
| **EndsWith( "Always say hello", "hello" )** | Tests whether **"Always say hello"** ends with **"hello"**.                                                                                                                        | **true**  |
| **EndsWith( "Bye bye", "" )**               | Tests whether **"Bye bye"** ends with an empty text string (**Len** returns 0). Easing its use in **Filter** expressions, **EndsWith** is defined to return **true** in this case. | **true**  |

| Formula                                       | Description                                                                                                                                                                            | Result    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **StartsWith( "Hello World", "hello" )**      | Tests whether **"Hello World"** begins with **"hello"**. The test is case insensitive.                                                                                                 | **true**  |
| **StartsWith( "Good bye", "hello" )**         | Tests whether **"Good bye"** begins with **"hello"**.                                                                                                                                  | **false** |
| **StartsWith( "Always say hello", "hello" )** | Tests whether **"Always say hello"** begins with **"hello"**. Although **"hello"** appears in the text, it doesn't appear at the beginning.                                            | **false** |
| **StartsWith( "Bye bye", "" )**               | Tests whether **"Bye bye"** starts with an empty text string (**Len** returns 0). Easing its use in **Filter** expressions, **StartsWith** is defined to return **true** in this case. | **true**  |

### Search user experience

In many apps, you can type one or more characters into a search box to filter a list of records in a large data set. As you type, the list shows only those records that match the search criteria.

The examples in the rest of this topic show the results of searching a **Customers** list that contains this data:

![Example of Customers list.](media/function-startswith/customers.png)

To create this data source as a collection, create a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control and set its **OnSelect** property to this formula:

**ClearCollect( Customers, Table( { Name: "Fred Garcia", Company: "Northwind Traders" }, { Name: "Cole Miller", Company: "Contoso" }, { Name: "Glenda Johnson", Company: "Contoso" }, { Name: "Mike Collins", Company: "Adventure Works" }, { Name: "Colleen Jones", Company: "Adventure Works" } ) )**

As in this example, you can show a list of records in a [**Gallery control**](/power-apps/maker/canvas-apps/controls/control-gallery) at the bottom of a screen. Near the top of the screen, you can add a [**Text input**](/power-apps/maker/canvas-apps/controls/control-text-input) control, named **SearchInput**, so that users can specify which records interest them.

![Customers gallery.](media/function-startswith/customers-ux-unfiltered.png)

As the user types characters in **SearchInput**, the results in the gallery are automatically filtered. In this case, the gallery is configured to show records for which the name of the customer (not the name of the company) starts with the sequence of characters in **SearchInput**.If the user types **co** in the search box, the gallery shows these results:

![Customers gallery with search.](media/function-startswith/customers-ux-startswith-co.png)

To filter based on the **Name** column, set the **Items** property of the gallery control to one of these formulas:

| Formula                                                       | Description                                                                                                                                                                                                                                                                                                                                                                              | Result                                                                                              |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Filter( Customers, StartsWith( Name, SearchInput.Text ) )** | Filters the **Customers** data source for records in which the search string appears at the start of the **Name** column. The test is case insensitive. If the user types **co** in the search box, the gallery shows **Colleen Jones** and **Cole Miller**. The gallery doesn't show **Mike Collins** because the **Name** column for that record doesn't start with the search string. | ![Example of StartsWith.](media/function-startswith/customers-name-co-startswith.png)               |
| **Filter( Customers, SearchInput.Text in Name )**             | Filters the **Customers** data source for records in which the search string appears anywhere in the **Name** column. The test is case insensitive. If the user types **co** in the search box, the gallery shows **Colleen Jones,** **Cole Miller,** and **Mike Collins** because the search string appears somewhere in the **Name** column of all of those records.                   | ![Example of SearchInput.Text in Name.](media/function-startswith/customers-name-co-contains.png)   |
| **Search( Customers, SearchInput.Text, "Name" )**             | Similar to using the **in** operator, the **Search** function searches for a match anywhere within the **Name** column of each record. Note that you must enclose the column name in double quotation marks.                                                                                                                                                                             | ![Example of SearchInput.Text with Name.](media/function-startswith/customers-name-co-contains.png) |

You can expand your search to include the **Company** column as well as the **Name** column:

| Formula                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Result                                                                                                |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Filter( Customers, StartsWith( Name, SearchInput.Text ) &#124;&#124; StartsWith( Company, SearchInput.Text ) )** | Filters the **Customers** data source for records in which either the **Name** column or the **Company** column starts with the search string (for example, **co**). The [**&#124;&#124;** operator](operators.md) is _true_ if either **StartsWith** function is _true_.                                                                                                                                                                                                     | ![Filter with StartsWith.](media/function-startswith/customers-all-co-startswith.png)                 |
| **Filter( Customers, SearchInput.Text in Name &#124;&#124; SearchInput.Text in Company )**                         | Filters the **Customers** data source for records in which either the **Name** column or the **Company** column contains the search string (for example, **co**) anywhere within it.                                                                                                                                                                                                                                                                                          | ![Filter with search text in name.](media/function-startswith/customers-all-co-contains.png)          |
| **Search( Customers, SearchInput.Text, "Name", "Company" )**                                                       | Similar to using the **in** operator, the **Search** function searches the **Customers** data source for records in which either the **Name** column or the **Company** column contains the search string (for example, **co**) anywhere within it. The **Search** function is easier to read and write than **Filter** if you want to specify multiple columns and multiple **in** operators. Note that you must enclose the names of the columns in double quotation marks. | ![Filter with search text in name, company.](media/function-startswith/customers-all-co-contains.png) |

---

## Error, IfError, IsError, and IsBlankOrError functions

Source: [function-iferror.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-iferror)

*Reference information including syntax and examples for the Error, IfError, IsError, IsBlankOrError functions.*

# Error, IfError, IsError, IsBlankOrError functions
| Functions | Applies to |
|-----------|------------|
| **Error**</br>**IfError**</br>**IsError** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Dataverse formula columns 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |
| **IsBlankOrError** | 
- ✓ Canvas apps 
- ✓ Copilot Studio 
- ✓ Desktop flows 
- ✓ Model-driven apps 
- ✓ Power Platform CLI 
- ✓ Dataverse functions 
- ✓ Power Pages |



Detects errors and provides an alternative value or takes action. Create a custom error or pass through an error.

> [!NOTE]
>
> If an app has disabled the _Formula-level error management_ feature under **Settings** > **Updates** > **Retired**, those functions will not work correctly.


## IfError

The **IfError** function tests values until it finds an error. If the function discovers an error, the function evaluates and returns a corresponding replacement value and stops further evaluation. A default value can also be supplied for when no errors are found. The structure of **IfError** resembles that of the **If** function: **IfError** tests for errors, while **If** tests for **true**.

Use **IfError** to replace an error with a valid value so that downstream calculations can continue. For example, use this function if user input might result in a division by zero:

```powerapps-dot
IfError( 1/x, 0 )
```

This formula returns `0` if the value of `x` is zero, as `1/x` produces an error. If `x` isn't zero, then `1/x` is returned.

### Stopping further processing

When [chaining](operators.md) formulas together in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth), such as:

```powerapps-dot
Patch( DS1, ... );
Patch( DS2, ... )
```

The second [**Patch**](function-patch.md) function to `DS2` will be attempted even if the **Patch** to `DS1` fails. The scope of an error is limited to each formula that is chained.

Use **IfError** to do an action and only continue processing if the action was successful. Applying **IfError** to this example:

```powerapps-dot
IfError(
    Patch( DS1, ... ), Notify( "problem in the first action" ),
    Patch( DS2, ... ), Notify( "problem in the second action" )
)
```

If the **Patch** of `DS1` has a problem, the first **Notify** is executed. No further processing occurs including the second **Patch** of `DS2`. If the first **Patch** succeeds, the second **Patch** will execute.

If supplied, the optional _DefaultResult_ argument is returned if no errors are discovered. Without this argument, the last _Value_ argument is returned.

Building on the last example, the return value from **IfError** can be checked to determine if there were any problems:

```powerapps-dot
IfError(
    Patch( DS1, ... ), Notify( "problem in the first action" );  false,
    Patch( DS2, ... ), Notify( "problem in the second action" ); false,
    true
)
```

### Type compatibility

**IfError** returns the value of one of its arguments. The types of all values that might be returned by **IfError** must be compatible.

In the last example, **Patch** returns a record that isn't compatible with the Booleans used for the _Replacement_ formulas or the _DefaultResult_. Which is fine, since there's no situation in which the return value from these **Patch** calls would be returned by **IfError**.

> [!NOTE]
> While the behavior in process for a change, the types of all arguments to **IfError** must be compatible currently.

In the simple example described earlier:

```powerapps-dot
IfError( 1/x, 0 )
```

The types of `1/x` and `0` were compatible as both were numbers. If they're not, the second argument is coerced to match the type of the first argument.

Excel displays **#DIV/0!** when a division by zero occurs.

Consider **IfError** with the following instead:

```powerapps-dot
IfError( 1/x, "#DIV/0!" )
```

The above formula won't work. The text string `"#DIV/0!"` is coerced to the type of the first argument to **IfError**, which is a number. The result of **IfError** is yet another error since the text string can't be coerced. As a fix, convert the first argument to a text string so that **IfError** always returns a text string:

```powerapps-dot
IfError( Text( 1/x ), "#DIV/0!" )
```

As seen above, **IfError** can return an error if the _Replacement_ or _DefaultResult_ is an error.

### FirstError / AllErrors

Within in the replacement formulas, information about the errors found is available through the **FirstError** record and **AllErrors** table. **AllErrors** is a table of error information records with **FirstError** being a shortcut to the first record of this table. **FirstError** always returns the same value as **First( AllErrors )**.

Error records include:

| Field        | Type                    | Description                                                                                                                                                                                                                                                |
| ------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kind**     | ErrorKind enum (number) | Category of the error.                                                                                                                                                                                                                                     |
| **Message**  | Text string             | Message about the error, suitable to be displayed to the end user.                                                                                                                                                                                         |
| **Source**   | Text string             | Location in where the error originated, used for reporting. For example, for a formula bound to a control property, this value is in the form _ControlName.PropertyName_.                                                                                   |
| **Observed** | Text string             | Location in where the error is surfaced to the user, used for reporting. For example, for a formula bound to a control property, this value is in the form _ControlName.PropertyName_.                                                                      |
| **Details**  | Record                  | Details about the error. Currently, details are provided only for network errors. This record includes **HttpStatusCode** which contains the HTTP status code and **HttpResponse** which contains the body of the response from the connector or service. |

For example, consider the following formula as a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control's **OnSelect** property:

```powerapps-dot
Set( a, 1/0 )
```

And this formula on the **OnSelect** property of a second [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control:

```powerapps-dot
IfError( a, Notify( "Internal error: originated on " & FirstError.Source & ", surfaced on " & FirstError.Observed ) )
```

The example formula above would display the following banner when the two buttons are activated in sequence:

![Button control activated, showing a notification from the Notify function.](media/function-iferror/notify-firsterror.png)

Typically, there will be only one error that **FirstError** can sufficiently work with. However, there are scenarios where multiple errors may be returned. For example, when using a [formula chaining operator](./operators.md) or the [**Concurrent** function](./function-concurrent.md). Even in these situations, reporting **FirstError** might be enough to reveal a problem instead overloading a user with multiple errors. If you still have a requirement to work with each error individually, you can use the **AllErrors** table.

## IsError

The **IsError** function tests for an error value.

The return value is a Boolean _true_ or _false_.

Using **IsError** prevents any further processing of the error.

## IsBlankOrError

The **IsBlankOrError** function tests for either a blank value or an error value and is the equivalent of `Or( IsBlank( X ), IsError( X ) )`.

When enabling error handling for existing apps, consider replacing **IsBlank** with **IsBlankOrError** to preserve existing app behavior. Before the addition of error handling, a _blank_ value was used to represent both null values from databases and error values. Error handling separates these two interpretations of _blank_ which could change the behavior of existing apps that continue to use **IsBlank**.

The return value is a boolean _true_ or _false_.

Using **IsBlankOrError** prevents any further processing of the error.

Use the **Error** function to create and report a custom error. For example, you might have logic to determine whether any given value is valid for your context or not&mdash;something not checked for a problem automatically. You can create and return your own error, complete with **Kind** and **Message**, using the same record described above for the **IfError** function.

In the context of **IfError**, use the **Error** function to rethrow or pass through an error. For example, your logic in **IfError** may decide that in some cases an error can be safely ignored, but in other cases the error is important to send through. Within **IfError** or **App.OnError**, use **Error( FirstError )** to pass through an error.

The **Error** function can also be passed a table of errors, as would be found in the **AllErrors** table. Use **Error( AllErrors )** to rethrow all the errors and not just the first.

A _blank_ record or empty table passed to **Error** results in no error.

## Syntax

**Error**( **ErrorRecord** )<br>**Error**( **ErrorTable** )

- _ErrorRecord_ – Required. Error information record, including **Kind**, **Message**, and other fields. **Kind** is required. **FirstError** can be passed directly.
- _ErrorTable_ – Required. Table of error information records. **AllErrors** can be passed directly.

**IfError**( _Value1_, _Replacement1_ [, _Value2_, _Replacement2_, ... [, *DefaultResult* ] ] )

- _Value(s)_ – Required. Formula(s) to test for an error value.
- _Replacement(s)_ – Required. The formulas to evaluate and values to return if matching _Value_ arguments returned an error.
- _DefaultResult_ – Optional. The formulas to evaluate if the formula doesn't find any errors.

**IsError**( _Value_ )<br>**IsBlankOrError**( _Value_ )

- _Value_ – Required. Formula to test.

## Examples

### Simple IfError

| Formula                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                      | Result |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **IfError( 1, 2 )**                                           | The first argument isn't an error. The function has no other errors to check and no default return value. The function returns the last _value_ argument evaluated.                                                                                                                                                                                                                                                              | 1      |
| **IfError( 1/0, 2 )**                                         | The first argument returns an error value (because of division by zero). The function evaluates the second argument and returns it as the result.                                                                                                                                                                                                                                                                                | 2      |
| **IfError( 10, 20, 30 )**                                     | The first argument isn't an error. The function has no other errors to check but does have a default return value. The function returns the _DefaultResult_ argument.                                                                                                                                                                                                                                                            | 30     |
| **IfError( 10, 11, 20, 21, 300 )**                            | The first argument **10** isn't an error, so the function doesn't evaluate that argument's corresponding replacement **11**. The third argument **20** isn't an error either, so the function doesn't evaluate that argument's corresponding replacement **21**. The fifth argument **300** has no corresponding replacement and is the default result. The function returns that result because the formula contains no errors. | 300    |
| **IfError( 1/0, Notify( "There was an internal problem" ) )** | The first argument returns an error value (due to division by zero). The function evaluates the second argument and displays a message to the user. The return value of **IfError** is the return value of **Notify**, coerced to the same type as the first argument to **IfError** (a number).                                                                                                                                 | 1      |

### Simple IsError

| Formula                                                             | Description                                                                                                                                                                                                                                                                                                                                | Result  |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **IsError( 1 )**                                                    | The argument isn't an error.                                                                                                                                                                                                                                                                                                               | _false_ |
| **IsError( Blank() )**                                              | The argument is a blank, but not an error.                                                                                                                                                                                                                                                                                                 | _false_ |
| **IsError( 1/0 )**                                                  | The argument is an error.                                                                                                                                                                                                                                                                                                                  | _true_  |
| **If( IsError( 1/0 ), Notify( "There was an internal problem" ) )** | The argument to **IsError** returns an error value (because of division by zero). This function returns _true_, which causes the **If** to display a message to the user with the **Notify** function. The return value of **If** is the return value of **Notify**, coerced to the same type as the first argument to **If** (a boolean). | _true_  |

### Simple IsBlankOrError

| Formula                       | Description                             | Result  |
| ----------------------------- | --------------------------------------- | ------- |
| **IsBlankOrError( 1 )**       | The argument isn't an error or a blank. | _false_ |
| **IsBlankOrError( Blank() )** | The argument is a blank.                | _true_  |
| **IsBlankOrError( 1/0 )**     | The argument is an error.               | _true_  |

### Simple Error

In this example, dates are validated relative to one another, resulting in an error if there is a problem.

```powerapps-dot
If( StartDate > EndDate,
    Error( { Kind: ErrorKind.Validation, Message: "Start Date must be before End Date" } ) )
```

In this example, some errors are allowed to pass through while others are suppressed and replaced with a value. In the first case, **b** is in an error state because the **Value** function has an invalid argument. Because this is unexpected by the formula writer, it is passed through so the user sees it. In the second case, with the same formula, **b** has the value 0, resulting in a division by zero. In this case, the formula writer may know that this is acceptable for this logic, suppress the error (no banner is shown), and return -1 instead.

```powerapps-dot
With( {a: 1, b: Value("a")},
      IfError( a/b, If( FirstError.Kind <> ErrorKind.Div0, Error( FirstError ), -1 ) ) )
// returns an error with Kind = ErrorKind.InvalidArgument

With( {a: 1, b: 0} )
      IfError( a/b, If( FirstError.Kind <> ErrorKind.Div0, Error( FirstError ), -1 ) ) )
// returns -1
```

The **AllErrors** table can be filtered like any other table. Used with the **Error** function, expected errors can be removed and the remaining errors retained and reported. For example, if we knew that division by zero wasn't going to be a problem in a particular context, those errors could be filtered out, leaving all other errors intact with the following formula:

```powerapps-dot
Error( Filter( AllErrors, Kind <> ErrorKind.Div0 ) )
```

### Step by step

1. Add a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control, and name it **TextInput1** if it doesn't have that name by default.

1. Add a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control, and name it **Label1** if it doesn't have that name by default.

1. Set the formula for **Label1**'s **Text** property to:

   ```powerapps-dot
   IfError( Value( TextInput1.Text ), -1 )
   ```

1. In **TextInput1**, enter **1234**.

   Label1 shows the value **1234** as this is a valid input to the Value function.

1. In **TextInput1**, enter **ToInfinity**.

   Label1 shows the value **-1** as this isn't a valid input to the Value function. Without wrapping the Value function with IfError, the label would show no value as the error value is treated as a _blank_.

### See also

[Formula reference for Power Apps](/power-apps/maker/canvas-apps/formula-reference)

---

## Errors function

Source: [function-errors.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-errors)

*Reference information including syntax and examples for the Errors function.*

# Errors function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps



Provides error information for previous changes to a [data source](/power-apps/maker/canvas-apps/working-with-data-sources).

## Overview

Errors can happen when a [record](/power-apps/maker/canvas-apps/working-with-tables#records) of a data source is changed. Many causes are possible, including network outages, inadequate permissions, and edit conflicts.

The functions that modify data in data sources, such as **[Patch](function-patch.md)**, **[Collect](function-clear-collect-clearcollect.md)**, **[Remove](function-remove-removeif.md)**, **[RemoveIf](function-remove-removeif.md)**, **[Update](function-update-updateif.md)**, **[UpdateIf](function-update-updateif.md)**, and **[SubmitForm](function-form.md)** report errors in two ways:
- Each of these functions returns an error value as the result of the operation. Errors can be detected with **IsError** and replaced or suppressed with **IfError** and **App.OnError** as usual. See [Error Handling](../error-handling.md) for more information.
- After the operation, the **Errors** function will also return the errors for previous operations. It can be useful for displaying the error message on a form screen without needing to capture the error in a state variable.

You can avoid some errors before they happen by using the **[Validate](function-validate.md)** and **[DataSourceInfo](function-datasourceinfo.md)** functions. See [working with data sources](/power-apps/maker/canvas-apps/working-with-data-sources) for more suggestions on how to work with and avoid errors.

## Description

The **Errors** function returns a [table](/power-apps/maker/canvas-apps/working-with-tables) of errors that contains the following [columns](/power-apps/maker/canvas-apps/working-with-tables#columns):

- **Record**. The record in the data source that had the error. If the error occurred during the creation of a record, this column is _blank_.
- **Column**. The column that caused the error, if the error can be attributed to a single column. If not, it's _blank_.
- **Message**. A description of the error. This error string can be displayed for the end user. This message may be generated by the data source and could be long and contain raw column names that may not have any meaning to the user.
- **Error**. An error code that can be used in formulas to help resolve the error:

| ErrorKind                     | Description                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ErrorKind.Conflict            | Another change was made to the same record, resulting in a change conflict. Use the **[Refresh](function-refresh.md)** function to reload the record and try the change again. |
| ErrorKind.ConstraintViolation | One or more constraints have been violated.                                                                                                                                    |
| ErrorKind.CreatePermission    | An attempt was made to create a record, and the current user doesn't have permission to create records.                                                                        |
| ErrorKind.DeletePermission    | An attempt was made to delete a record, and the current user doesn't have permission to delete records.                                                                        |
| ErrorKind.EditPermission      | An attempt was made to edit a record, and the current user doesn't have permission to edit records.                                                                            |
| ErrorKind.GeneratedValue      | An attempt was made to change a column that the data source generates automatically.                                                                                           |
| ErrorKind.MissingRequired     | The value for a required column is missing from the record.                                                                                                                    |
| ErrorKind.None                | There's no error.                                                                                                                                                             |
| ErrorKind.NotFound            | An attempt was made to edit or delete a record, but the record couldn't be found. Another user may have changed the record.                                                    |
| ErrorKind.ReadOnlyValue       | An attempt was made to change a column that's read only.                                                                                                                       |
| ErrorKind.Sync                | An error was reported by the data source. Check the Message column for more information.                                                                                       |
| ErrorKind.Unknown             | There was an error, but of an unknown kind.                                                                                                                                    |
| ErrorKind.Validation          | There was a general validation issue detected, that didn't fit one of the other kinds.                                                                                        |

Errors can be returned for the entire data source, or for only a selected row by providing the _Record_ argument to the function.

**[Patch](function-patch.md)** or another data function may return a _blank_ value if, for example, a record couldn't be created. You can pass _blank_ to **Errors**, and it returns appropriate error information in these cases. Subsequent use of data functions on the same data source clears this error information.

If there are no errors, the table that **Errors** returns will be [empty](function-isblank-isempty.md) and can be tested with the **[IsEmpty](function-isblank-isempty.md)** function.

## Syntax

**Errors**( _DataSource_ [, *Record* ] )

- _DataSource_ – Required. The data source for which you want to return errors.
- _Record_ – Optional. A specific record for which you want to return errors. If you don't specify this argument, the function returns errors for the entire data source.

## Examples

### Step by Step

For this example, we'll be working with the **IceCream** data source, a data source for which Power Apps will attempt to detect conflicts:

![Ice Cream.](media/function-errors/icecream.png "Ice Cream")

> [!NOTE]
> Power Apps does not attempt to detect conflicts for changes to Dataverse tables.

Through the app, a user loads the Chocolate record into a data-entry form and then changes the value of **Quantity** to 90. The record to be worked with is placed in the [context variable](/power-apps/maker/canvas-apps/working-with-variables#use-a-context-variable) **EditRecord**:

- **UpdateContext( { EditRecord: LookUp( IceCream, Flavor = "Chocolate" ) } )**

To make this change in the data source, the **[Patch](function-patch.md)** function is used:

- **Patch( IceCream, EditRecord, Gallery.Updates )**

Where **Gallery.Updates** evaluates to **{ Quantity: 90 }**, since only the **Quantity** property has been modified.

Unfortunately, just before the **[Patch](function-patch.md)** function was invoked, somebody else modifies the **Quantity** for Chocolate to 80. Because this is a supported data source for conflict detection, Power Apps will detect this and not allow the conflicting change to occur. You can check for this situation with the formula:

- **IsEmpty( Errors( IceCream, EditRecord ) )**

Which returns **false**, because the **Errors** function returned the following table:

| Record                                 | Column  | Message                                                                                                      | Error              |
| -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| { Flavor: "Chocolate", Quantity: 100 } | _blank_ | "Another user has modified the record that you're trying to modify. Reload the record and try again." | ErrorKind.Conflict |

You can place a label on the form to show this error to the user.

- To show the error, set the label's **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
  **Label.Text = First(Errors( IceCream, EditRecord )).Message**

You can also add a **Reload** button on the form, so that the user can efficiently resolve the conflict.

- To show the button only when a conflict has occurred, set the button's **[Visible](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
  **!IsEmpty( Lookup( Errors( IceCream, EditRecord ), Error = ErrorKind.Conflict ) )**
- To revert the change, which the user selects the button, set its **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property to this formula:<br>
  **ReloadButton.OnSelect = Revert( IceCream, EditRecord )**

---

## Exit function

Source: [function-exit.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-exit)

*Reference information including syntax and examples for the Exit function.*

# Exit function
**Applies to:** 
- ✓ Canvas apps
- ✓ Power Platform CLI



Exits the currently running app and optionally signs out the current user.

## Description

The **Exit** function exits the currently running app. The user is returned to the list of apps. The user can then select another app to open.

**Exit** stops any further formula evaluation. Any function calls chained with a [semicolon operator](operators.md) after the **Exit** aren't carried out.

Use the optional _Signout_ argument to sign the current user out of Power Apps. _Signout_ is useful when devices are shared to ensure user security.

While authoring the app, calling **Exit** doesn't exit or sign out the user. However, it stops the evaluation of the rest of the formula.

**Exit** can only be used in [behavior formulas](/power-apps/maker/canvas-apps/working-with-formulas-in-depth).

## Syntax

**Exit**( [*Signout*] )

- _Signout_ – Optional. A Boolean value that if _true_ signs the current user out of Power Apps. The default is _false_ and the user remains signed in.

## Examples

| Formula                    | Description                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Exit()**                 | Exits the current app and leaves the user signed in. The user is returned to the list of apps.                                     |
| **Exit(&nbsp;true&nbsp;)** | Exits the current app and the user is signed out. The user needs to sign back in with their credentials before running an app. |

---

## Filter, Search, and LookUp functions

Source: [function-filter-lookup.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup)

*Reference information including syntax and examples for the Filter, Search, and LookUp functions.*

# Filter, Search, and LookUp functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Finds one or more [records](/power-apps/maker/canvas-apps/working-with-tables#records) in a [table](/power-apps/maker/canvas-apps/working-with-tables).

Watch this video to learn how to use **Filter**, **Search**, and **LookUp** functions:

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=55b2c144-b5ac-4d66-b398-fea03eb21f17]

> [!NOTE]
> [PAC CLI pac power-fx commands](/power-platform/developer/cli/reference/power-fx) do not support the **Search** function.

## Description

The **Filter** function finds records in a table that satisfy a formula. Use **Filter** to find a set of records that match one or more criteria and discard those records that don't.

The **LookUp** function finds the first record in a table that satisfies a formula. Use **LookUp** to find a single record that matches one or more criteria.

For both, the formula is evaluated for each record of the table. Records that result in _true_ are included in the result. Besides the normal formula [operators](operators.md), you can use the **[in](operators.md#in-and-exactin-operators)** and **[exactin](operators.md#in-and-exactin-operators)** operators for substring matches.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

The **Search** function finds records in a table that contain a string in one of their columns. The string might occur anywhere within the column; for example, searching for ":::no-loc text="rob":::" or ":::no-loc text="bert":::" would find a match in a column that contains ":::no-loc text="Robert":::". Searching is case-insensitive. Unlike **Filter** and **LookUp**, the **Search** function uses a single string to match instead of a formula.

**Filter** and **Search** return a table that contains the same columns as the original table and the records that match the criteria. **LookUp** returns only the first record found, after applying a formula to reduce the record to a single value. If no records are found, **Filter** and **Search** return an [empty](function-isblank-isempty.md) table, and **LookUp** returns _blank_.

[Tables](/power-apps/maker/canvas-apps/working-with-tables) are a value in Power Apps, just like a string or number. They can be passed to and returned from functions. **Filter**, **Search**, and **LookUp** don't modify a table. Instead, they take a table as an argument and return a table, a record, or a single value from it. See [working with tables](/power-apps/maker/canvas-apps/working-with-tables) for more details.

## Delegation
When possible, Power Apps will delegate filter and sort operations to the data source and page through the results on demand. For example, when you start an app that shows a **[Gallery](../maker/canvas-apps/controls/control-gallery.md)** control filled with data, only the first set of records will be initially brought to the device. As the user scrolls, additional data is brought down from the data source. The result is a faster start time for the app and access to very large data sets.

However, delegation may not always be possible. Data sources vary on what functions and operators they support with delegation. If complete delegation of a formula isn't possible, the authoring environment will flag the portion that can't be delegated with a warning. When possible, consider changing the formula to avoid functions and operators that can't be delegated.  The [delegation list](../maker/canvas-apps/delegation-overview.md#delegable-data-sources) details which data sources and operations can be delegated.

If delegation is not possible, Power Apps will pull down only a small set of records to work on locally. Filter and sort functions will operate on a reduced set of records. What is available in the **[Gallery](../maker/canvas-apps/controls/control-gallery.md)** may not be the complete story, which could be confusing to users. 

See the [delegation overview](../maker/canvas-apps/delegation-overview.md) for more information.


## Syntax

**Filter**(Table*, *Formula1* [, *Formula2\*, ... ] )

- _Table_ - Required. Table to search.
- _Formula(s)_ - Required. The formula by which each record of the table is evaluated. The function returns all records that result in **true**. You can reference columns within the table. For Dataverse data sources, a formula can be the name of a Dataverse view. If you supply more than one formula, the results of all formulas are combined with the **[And](function-logicals.md)** function.

> [!NOTE]
> Dataverse views can be created which return additional columns from related tables. However, Power Apps only returns those columns which are known to be part of the specified Dataverse data source.

**Search**(Table*, *SearchString*, *Column1* [, *Column2\*, ... ] )

- _Table_ - Required. Table to search.
- _SearchString_ - Required. The string to search for. If _blank_ or an empty string, all records are returned.
- _Column(s)_ - Required. The names of columns within _Table_ to search. If _SearchString_ is found within the data of any of these columns as a partial match, the full record will be returned.

> [!NOTE]
> In Power Apps prior to version 3.24042, column names for the **Search** function were specified with a text string using double quotes, and if connected to a data source they also needed to be logical names. For example, the logical name **:::no-loc text="&quot;cr43e_name&quot;":::** with double quotes was used instead of the display name **Name** without quotes. For SharePoint and Excel data sources that contain column names with spaces, each space was specified with **:::no-loc text="&quot;_x0020_&quot;":::**, for example **:::no-loc text="&quot;Column Name&quot;":::** as **:::no-loc text="&quot;Column_x0020_Name&quot;":::**. After this version, all apps were automatically updated to the new syntax described in this article. 

**LookUp**(Table*, *Formula* [, *ReductionFormula\* ] )

- _Table_ - Required. Table to search. In the UI, the syntax is shown as _source_ above the function box.
- _Formula_ - Required.
  The formula by which each record of the table is evaluated. The function returns the first record that results in **true**. You can reference columns within the table. In the UI, the syntax is shown as _condition_ above the function box.
- _ReductionFormula_ - Optional. This formula is evaluated over the record that was found, and then reduces the record to a single value. You can reference columns within the table. If you don't use this parameter, the function returns the full record from the table. In the UI, the syntax is shown as _result_ above the function box.

## Examples

The following examples use the **IceCream** [data source](/power-apps/maker/canvas-apps/working-with-data-sources):

![Ice cream data source.](media/function-filter-lookup/icecream.png "Ice cream data source")

| Formula                                                  | Description                                                                                                                                                                                                       | Result                                                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`Filter(IceCream, OnOrder > 0)`**                        | Returns records where **OnOrder** is greater than zero.                                                                                                                                                           | ![Filter On order.](media/function-filter-lookup/icecream-onorder.png "Filter on order")                       |
| **`Filter(IceCream, Quantity + OnOrder > 225)`**           | Returns records where the sum of **Quantity** and **OnOrder** columns is greater than 225.                                                                                                                        | ![Filter quantity and order.](media/function-filter-lookup/icecream-overstock.png "Filter quantity and order") |
| **`Filter(IceCream, "chocolate" in Lower(Flavor ))`**      | Returns records where the word ":::no-loc text="chocolate":::" appears in the **Flavor** name, independent of uppercase or lowercase letters.                                                                                         | ![Filter in lower.](media/function-filter-lookup/icecream-chocolate.png "Filter in lower")                     |
| **`Filter(IceCream, Quantity < 10 && OnOrder < 20)`**      | Returns records where the **Quantity** is less than 10 and **OnOrder** is less than 20. No records match these criteria, so an empty table is returned.                                                           | ![Filter on quantity.](media/function-filter-lookup/icecream-empty.png "Filter on quantity")                   |
| **`Search(IceCream, "choc", Flavor)`**                   | Returns records where the string ":::no-loc text="choc":::" appears in the **Flavor** name, independent of uppercase or lowercase letters.                                                                                            | ![Search items.](media/function-filter-lookup/icecream-chocolate.png "Search items")                           |
| **`Search(IceCream, "", Flavor)`**                       | Because the search term is empty, all records are returned.                                                                                                                                                       | ![Search all items.](media/function-filter-lookup/icecream.png "Search all items")                             |
| **`LookUp(IceCream, Flavor = "Chocolate", Quantity)`**     | Searches for a record with **Flavor** equal to ":::no-loc text="Chocolate":::", of which there's one. For the first record that's found, returns the **Quantity** of that record.                                                    | 100                                                                                                            |
| **`LookUp(IceCream, Quantity > 150, Quantity + OnOrder)`** | Searches for a record with **Quantity** greater than 150, of which there are multiple. For the first record that's found, which is ":::no-loc text="Vanilla":::" **Flavor**, returns the sum of **Quantity** and **OnOrder** columns. | 250                                                                                                            |
| **`LookUp(IceCream, Flavor = "Pistachio", OnOrder)`**      | Searches for a record with **Flavor** equal to ":::no-loc text="Pistachio":::", of which there are none. Because none is found, **Lookup** returns _blank_.                                                                           | _blank_                                                                                                        |
| **`LookUp(IceCream, Flavor = "Vanilla")`**                 | Searches for a record with **Flavor** equal to ":::no-loc text="Vanilla":::", of which there's one. Since no reduction formula was supplied, the entire record is returned.                                                          | { Flavor: ":::no-loc text="Vanilla":::", Quantity: 200, OnOrder: 75 }                                                               |

### Filtering with choice columns

The following example uses the **Account** table in Microsoft Dataverse as data source. This example shows how to **Filter** list of accounts based on selected Combo box control values:

#### Step by step

1. Open a blank app.
1. Add a new screen by selecting the **New Screen** option.
1. On the **Insert** tab, select **Gallery** and then select **Vertical**.
1. On the **Properties** tab of the right-hand pane, open **Data Source** and then select **Accounts**.
1. (Optional) In the **Layout** list, select different options.
1. On the **Insert** tab, select **Input** and then select **Combo box**. Repeat the step to add two more combo box controls.
1. For each combo box control, on the **Properties** tab of the right-hand pane, open **Data Source** and then select **Accounts**. Select **Edit** next to **Fields** option and then select the **Primary text** and **SearchField** values. The **Primary text** should be the choices column you want to add to the combo box. Repeat the step for other two combo box controls.

   ![Setting combo box values.](media/function-filter-lookup/setting-combobox-values.png "Setting combo box values")

1. Now select **Gallery** control and set the **Items** property to the following formula:

   ```
   Filter(Accounts,
    'Industry' = ComboBox3.Selected.Industry Or IsBlank(ComboBox3.Selected.Industry),
    'Relationship Type' = ComboBox2.Selected.'Relationship Type' Or
      IsBlank(ComboBox2.Selected.'Relationship Type'),
    'Preferred Method of Contact' = ComboBox1.Selected.'Preferred Method of Contact' Or
      IsBlank(ComboBox1.Selected.'Preferred Method of Contact'))
   ```

   ![Accounts data source.](media/function-filter-lookup/filtering-choices.gif "Accounts data source")

### Search user experience

The following examples use the **IceCream** [data source](/power-apps/maker/canvas-apps/working-with-data-sources):

In many apps, you can type one or more characters into a search box to filter a list of records in a large data set. As you type, the list shows only those records that match the search criteria.

The examples in the rest of this article show the results of searching a list, named **Customers**, that contain this data:

![Search on customers.](media/function-filter-lookup/customers.png "Search on customers")

To create this data source as a collection, create a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control and set its **OnSelect** property to this formula:

**`ClearCollect(Customers, Table({ Name: "Fred Garcia", Company: "Northwind Traders" }, { Name: "Cole Miller", Company: "Contoso" }, { Name: "Glenda Johnson", Company: "Contoso" }, { Name: "Mike Collins", Company: "Adventure Works" }, { Name: "Colleen Jones", Company: "Adventure Works" }) )`**

As in this example, you can show a list of records in a [**Gallery control**](/power-apps/maker/canvas-apps/controls/control-gallery) at the bottom of a screen. Near the top of the screen, you can add a [**Text input**](/power-apps/maker/canvas-apps/controls/control-text-input) control, named **SearchInput**, so that users can specify which records interest them.

![Search using search input.](media/function-filter-lookup/customers-ux-unfiltered.png "Search using search input")

As the user types characters in **SearchInput**, the results in the gallery are automatically filtered. In this case, the gallery is configured to show records for which the name of the customer (not the name of the company) starts with the sequence of characters in **SearchInput**. If the user types **co** in the search box, the gallery shows these results:

![Search with starts with.](media/function-filter-lookup/customers-ux-startswith-co.png "Search with starts with")

To filter based on the **Name** column, set the **Items** property of the gallery control to one of these formulas:

| Formula                                                    | Description                                                                                                                                                                                                                                                                                                                                                                              | Result                                                                                                               |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Filter(Customers, StartsWith(Name, SearchInput.Text) )** | Filters the **Customers** data source for records in which the search string appears at the start of the **Name** column. The test is case insensitive. If the user types **co** in the search box, the gallery shows **Colleen Jones** and **Cole Miller**. The gallery doesn't show **Mike Collins** because the **Name** column for that record doesn't start with the search string. | ![Filter with start with.](media/function-filter-lookup/customers-name-co-startswith.png "Filter with start with")   |
| **Filter(Customers, SearchInput.Text in Name)**            | Filters the **Customers** data source for records in which the search string appears anywhere in the **Name** column. The test is case insensitive. If the user types **co** in the search box, the gallery shows **Colleen Jones,** **Cole Miller,** and **Mike Collins** because the search string appears somewhere in the **Name** column of all of those records.                   | ![Filter with search input.](media/function-filter-lookup/customers-name-co-contains.png "Filter with search input") |
| **Search(Customers, SearchInput.Text, Name)**            | Similar to using the **in** operator, the **Search** function searches for a match anywhere within the **Name** column of each record. You must enclose the column name in double quotation marks.                                                                                                                                                                                       | ![Search customers.](media/function-filter-lookup/customers-name-co-contains.png "Search customers")  

You can expand your search to include the **Company** column and the **Name** column:

| Formula                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Result                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Filter(Customers, StartsWith(Name, SearchInput.Text) || StartsWith(Company, SearchInput.Text) )` | Filters the **Customers** data source for records in which either the **Name** column or the **Company** column starts with the search string (for example, **co**). The [**&#124;&#124;** operator](operators.md) is _true_ if either **StartsWith** function is _true_.                                                                                                                                                                                           | ![Filter customers start with.](media/function-filter-lookup/customers-all-co-startswith.png "Filter customers start with")              |
| `Filter(Customers, SearchInput.Text in Name || SearchInput. Text in Company)`                     | Filters the **Customers** data source for records in which either the **Name** column or the **Company** column contains the search string (for example, **co**) anywhere within it.                                                                                                                                                                                                                                                                                | ![Filter customers search input.](media/function-filter-lookup/customers-all-co-contains.png "Filter customers search input")            |
| `Search(Customers, SearchInput.Text, Name, Company)`                                                    | Similar to using the **in** operator, the **Search** function searches the **Customers** data source for records in which either the **Name** column or the **Company** column contains the search string (for example, **co**) anywhere within it. The **Search** function is easier to read and write than **Filter** if you want to specify multiple columns and multiple **in** operators. | ![ Search customers with search input.](media/function-filter-lookup/customers-all-co-contains.png "Search customers with search input") |

---

## Find function

Source: [function-find.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-find)

*Reference information including syntax and examples for the Find function.*

# Find function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Finds a string of text, if it exists, within another string.

## Description

The **Find** function looks for a string within another string and is case sensitive. To ignore case, first use the **[Lower](function-lower-upper-proper.md)** function on the arguments.

**Find** returns the starting position of the string that was found. Position 1 is the first character of the string. **Find** returns _blank_ if the string in which you're searching doesn't contain the string for which you're searching.

## Syntax

**Find**( _FindString_, _WithinString_ [, *StartingPosition* ] )

- _FindString_ - Required. The string to find.
- _WithinString_ - Required. The string to search within.
- _StartingPosition_ - Optional. The starting position to start searching. Position 1 is the first character.

## Examples

| Formula                                          | Description                                                                    | Result                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Find("World", "Hello World")**                  | Returns the starting position of **"World"**.                                      | 7                                                                         |
| **Find("World", "Hello World, Hello World", 10)** | Returns the starting position of the first occurrence of **"World"** after the 10th character. | 20                                                                         |
| **Find("Mars", "Hello World")**                   | Returns blank since the FindString is not in the WithinString                   | Blank()                                                                        |

---

## First, FirstN, Index, Last, and LastN functions

Source: [function-first-last.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-first-last)

*Reference information including syntax and examples for the First, FirstN, Index, Last, and LastN functions.*

# First, FirstN, Index, Last, and LastN functions
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Returns the first, last, or a specific [record](/power-apps/maker/canvas-apps/working-with-tables#records), or a set of first or last records, from a table.

## Description

The **First** function returns the first record of a [table](/power-apps/maker/canvas-apps/working-with-tables).

The **FirstN** function returns the first set of records of a table; the second argument specifies the number of records to return.

The **Last** function returns the last record of a table.

The **LastN** function returns the last set of records of a table; the second argument specifies the number of records to return.

The **Index** function returns a record of a table based on its ordered position in the table. Record numbering begins with 1 so `First( table )` returning the same record as `Index( table, 1 )`. **Index** returns an error if the requested record index is less than 1, greater than the number of records in the table, or the table is empty.

**First**, **Index**, and **Last** return a single record. **FirstN** and **LastN** return a table, even if you specify only a single record.

### Delegation

When used with a data source, these functions can't be delegated. Only the first portion of the data source will be retrieved and then the function applied. The result may not represent the complete story. A warning may appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](../maker/canvas-apps/delegation-overview.md).

For example, when used with a data source containing a large table with 1 million records, **Last** is subject to the non-delegation limit and doesn't return the last record of the entire data source. Likewise, using **Index** to request a record in the middle of 1 million records results in an error because the index is out of range based on the non-delegation limit.

## Syntax

**First**( _Table_ )<br>**Last**( _Table_ )

- _Table_ - Required. Table to operate on.

**FirstN**( _Table_ [, *NumberOfRecords* ] )<br>**LastN**( _Table_ [, *NumberOfRecords* ] )

- _Table_ - Required. Table to operate on.
- _NumberOfRecords_ - Optional. Number of records to return. If you don't specify this argument, the function returns one record.

**Index**( _Table_, _RecordIndex_ )

- _Table_ - Required. Table to operate on.
- _RecordIndex_ - Required. The index of the record to return. Record numbering begins with 1.

## Examples

For the following examples, we use the **IceCream** [data source](/power-apps/maker/canvas-apps/working-with-data-sources), which contains the data in this table:

:::image type="content" source="media/function-first-last/icecream.png" alt-text="IceCream example.":::

This table can be placed in a collection with this formula (put in the OnStart formula for a Button control and press the button):

```power-fx
Collect( IceCream, Table( { Flavor: "Chocolate", Quantity: 100 },
                          { Flavor: "Vanilla", Quantity: 200 },
                          { Flavor: "Strawberry", Quantity: 300 },
                          { Flavor: "Mint Chocolate", Quantity: 60 },
                          { Flavor: "Pistachio", Quantity: 200 } ) )
```

| Formula                                          | Description                                                                    | Result                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **First(&nbsp;IceCream&nbsp;)**                  | Returns the first record of **IceCream**.                                      | { Flavor: "Chocolate", Quantity: 100 }                                                                         |
| **Last(&nbsp;IceCream&nbsp;)**                   | Returns the last record of **IceCream**.                                       | { Flavor: "Pistachio", Quantity: 200 }                                                                         |
| **Index(&nbsp;IceCream,&nbsp;3&nbsp;)**          | Returns the third record of **IceCream**.                                      | { Flavor: "Strawberry", Quantity: 300 }                                                                        |
| **FirstN(&nbsp;IceCream,&nbsp;2&nbsp;)**         | Returns a table containing the first two records of **IceCream**.              | ![Table containing the records for Chocolate and Vanilla](media/function-first-last/icecream-first2.png)       |
| **LastN(&nbsp;IceCream,&nbsp;2&nbsp;)**          | Returns a table containing the last two records of **IceCream**.                 | ![Table containing the records for Mint Chocolate and Pistachio](media/function-first-last/icecream-last2.png) |
| **Index(&nbsp;IceCream,&nbsp;4&nbsp;).Quantity** | Returns the fourth record of the table, and extracts the Quantity column.       | 60                                                                                                             |
| **Index(&nbsp;IceCream,&nbsp;10&nbsp;)**         | Returns an error since the record requested is beyond the bounds of the table. | _Error_                                                                                                        |

---

## ForAll function

Source: [function-forall.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-forall)

*Reference information including syntax and examples for the ForAll function.*

# ForAll function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions
- ✓ Power Pages



Calculates values and performs actions for all the [records](/power-apps/maker/canvas-apps/working-with-tables#records) in a [table](/power-apps/maker/canvas-apps/working-with-tables).

## Description

The **ForAll** function evaluates a formula for all the records in a table. The formula can calculate a value and/or perform actions, such as modifying data or working with a connection. Use the [**With** function](function-with.md) to evaluate the formula for a single record.

Use the [**Sequence** function](function-sequence.md) with the **ForAll** function to iterate based on a count.

Fields of the record currently being processed are available within the formula.  Use the [**ThisRecord** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) or simply reference fields by name as you would any other value. The [**As** operator](../maker/canvas-apps/functions/operators.md#thisitem-thisrecord-and-as-operators) can also be used to name the record being processed which can help make your formula easier to understand and make nested records accessible. For more information, see the examples below and [working with record scope](../maker/canvas-apps/working-with-tables.md#record-scope).

### Return value

The result of each formula evaluation is returned in a table, in the same order as the input table.

If the result of the formula is a single value, the resulting table is a single-column table. If the result of the formula is a record, the resulting table contains records with the same columns as the result record.

If the result of the formula is a _blank_ value, then there's no record in the result table for that input record. In this case, there are fewer records in the result table than the source table.

### Taking action

The formula can include functions that take action, such as modifying the records of a data source with the **[Patch](function-patch.md)** and **[Collect](function-clear-collect-clearcollect.md)** functions. The formula can also call methods on connections. Multiple actions can be performed per record by using the [**;** operator](operators.md). You can't modify the table that is the subject of the **ForAll** function.

When writing your formula, keep in mind that records can be processed in any order and, when possible, in parallel. The first record of the table may be processed after the last record.

Take care to avoid ordering dependencies. For this reason, you can't use the **[UpdateContext](function-updatecontext.md)**, **[Clear](function-clear-collect-clearcollect.md)**, and **[ClearCollect](function-clear-collect-clearcollect.md)** functions within a **ForAll** function because they could easily be used to hold variables that would be susceptible to this effect. You can use **[Collect](function-clear-collect-clearcollect.md)**, but the order in which records are added is undefined.

Several functions that modify data sources, including **Collect**, **Remove**, and **Update**, return the changed data source as their return value. These return values can be large and consume significant resources if returned for every record of the **ForAll** table. You may also find that these return values aren't what you expect because **ForAll** can operate in parallel and may separate the side effects of these functions from obtaining their result. If the return value from **ForAll** isn't used, which is often the case with data modification functions, then the return value won't be created and there are no resource or order concerns. But if you're using the result of a **ForAll** and one of the functions that returns a data source, think carefully about how you structure the result and try it out first on small data sets.

### Alternatives

Many functions in Power Apps can process more than one value at a time by using a single-column table. For example, the **Len** function can process a table of text values, returning a table of lengths, in the same manner, that **ForAll** could. This can eliminate the need to use **ForAll** in many cases, can be more efficient, and is easier to read.

Another consideration is that **ForAll** isn't delegable while other functions may be, such as **Filter**.

### Delegation

When used with a data source, this function can't be delegated. Only the first portion of the data source will be retrieved and then the function applied. The result may not represent the complete story.  A warning may appear at authoring time to remind you of this limitation and to suggest switching to delegable alternatives where possible. For more information, see the [delegation overview](../maker/canvas-apps/delegation-overview.md).

## Syntax

**ForAll**(_Table_, _Formula_)

- _Table_ - Required. Table to be acted upon.
- _Formula_ - Required. The formula to evaluate for all records of the _Table_.

## Examples

### Calculations

The following examples use the **Squares** [data source](/power-apps/maker/canvas-apps/working-with-data-sources):

![Example of squares.](media/function-forall/squares.png)

To create this data source as a collection, set the **OnSelect** property of a **Button** control to this formula, open Preview mode, and then select the button:

`ClearCollect( Squares, [ "1", "4", "9" ] )`

| Formula                                                                                       | Description                                                                                                                                                                                                                      | Result                                                 |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **ForAll(&nbsp;Squares, Sqrt(&nbsp;Value&nbsp;)&nbsp;)**<br><br>**Sqrt(&nbsp;Squares&nbsp;)** | For all the records of the input table, calculates the square root of the **Value** column. The **Sqrt** function can also be used with a single-column table, making it possible to perform this example without using **ForAll**. | ![Example of Sqrt.](media/function-forall/sqrt.png)    |
| **ForAll(&nbsp;Squares, Power(&nbsp;Value,&nbsp;3&nbsp;)&nbsp;)**                             | For all the records of the input table, raises the **Value** column to the third power. The **Power** function doesn't support single-column tables. Therefore, **ForAll** must be used in this case.                           | ![Example of Power.](media/function-forall/power3.png) |

### Using a connection

The following examples use the **Expressions** [data source](/power-apps/maker/canvas-apps/working-with-data-sources):

![Example of expressions.](media/function-forall/translate.png)

To create this data source as a collection, set the **OnSelect** property of a **Button** control to this formula, open Preview mode, and then select the button:

`ClearCollect( Expressions, [ "Hello", "Good morning", "Thank you", "Goodbye" ] )`

This example also uses a [Microsoft Translator](/power-apps/maker/canvas-apps/connections/connection-microsoft-translator) connection. To add this connection to your app, see the article about how to [manage connections](/power-apps/maker/canvas-apps/add-manage-connections).

| Formula                                                              | Description                                                                                                                   | Result                                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **ForAll(Expressions, MicrosoftTranslator.Translate(Value, "es"))** | For all the records in the Expressions table, translate the contents of the **Value** column into Spanish (abbreviated "es"). | ![Example with value "es."](media/function-forall/translate-es.png) |
| **ForAll(Expressions, MicrosoftTranslator.Translate(Value, "fr"))** | For all the records in the Expressions table, translate the contents of the **Value** column into French (abbreviated "fr").  | ![Example with value "fr."](media/function-forall/translate-fr.png) |

### Copying a table

Sometimes you need to filter, shape, sort, and manipulate data. Power Apps provides many functions for doing this, such as **Filter**, **AddColumns**, and **Sort**. Power Apps treats each table as a value, allowing it to flow through formulas and be consumed easily.

And sometimes you want to make a copy of this result for later use, or you want to move information from one data source to another. Power Apps provides the **Collect** function to copy data.

But before you make that copy, think carefully if it's needed. Many situations can be addressed by filtering and shaping the underlying data source on-demand with a formula. Some of the downsides to making a copy include:

- Two copies of the same information mean that one of them can fall out of sync.
- Making a copy can consume much of the computer memory, network bandwidth, and/or time.
- For most data sources, copying can't be delegated, limiting how much data can be moved.

The following examples use the **Products** [data source](/power-apps/maker/canvas-apps/working-with-data-sources):

![Example of products data source.](media/function-forall/prod.png)

To create this data source as a collection, set the **OnSelect** property of a **Button** control to this formula, open Preview mode, and then select the button:

```power-fx
ClearCollect( Products,
    Table(
        { Product: "Widget",    'Quantity Requested': 6,  'Quantity Available': 3 },
        { Product: "Gadget",    'Quantity Requested': 10, 'Quantity Available': 20 },
        { Product: "Gizmo",     'Quantity Requested': 4,  'Quantity Available': 11 },
        { Product: "Apparatus", 'Quantity Requested': 7,  'Quantity Available': 6 }
    )
)
```

Our goal is to work with a derivative table that includes only the items where more has been requested than is available, and for which we need to place an order:

![Example of derivative table.](media/function-forall/prod-order.png)

We can perform this task in a couple of different ways, all of which produce the same result, with various pros and cons.

#### Table shaping on demand

Don't make that copy! We can use the following formula anywhere we need:

```power-fx
// Table shaping on demand, no need for a copy of the result
ShowColumns(
    AddColumns(
        Filter( Products, 'Quantity Requested' > 'Quantity Available' ),
        "Quantity To Order", 'Quantity Requested' - 'Quantity Available'
    ),
    "Product",
    "Quantity To Order"
)
```

A [record scope](/power-apps/maker/canvas-apps/working-with-tables#record-scope) is created by the **Filter** and **AddColumns** functions to perform the comparison and subtraction operations, respectively, with the **'Quantity Requested'** and **'Quantity Available'** fields of each record.

In this example, the **Filter** function can be delegated. This is important, as it can find all the products that meet the criteria, even if that is only a few records out of a table of millions. At this time, **ShowColumns** and **AddColumns** cannot be delegated, so the actual number of products that need to be ordered is limited. If you know the size of this result is always be relatively small, this approach is fine.

And because we didn't make a copy, there's no extra copy of the information to manage or fall out of date.

#### ForAll on demand

Another approach is to use the **ForAll** function to replace the table-shaping functions:

```power-fx
ForAll( Products,
    If( 'Quantity Requested' > 'Quantity Available',
        {
            Product: Product,
            'Quantity To Order': 'Quantity Requested' - 'Quantity Available'
        }
    )
)
```

This formula may be simpler for some people to read and write.

No part of the **ForAll** is delegable. Only the first portion of the **Products** table is evaluated, which could be a problem if this table is large. Because **Filter** could be delegated in the previous example, it could work better with large data sets.

#### Collect the result

In some situations, a copy of data may be required. You may need to move information from one data source to another. In this example, orders are placed through a **NewOrder** table on a vendor's system. For high-speed user interactions, you may want to cache a local copy of a table so that there's no server latency.

We use the same table shaping as the previous two examples, but we capture the result into a collection:

```power-fx
ClearCollect( NewOrder,
    ShowColumns(
        AddColumns(
            Filter( Products, 'Quantity Requested' > 'Quantity Available' ),
            "Quantity To Order", 'Quantity Requested' - 'Quantity Available'
        ),
        "Product",
        "Quantity To Order"
    )
)
```

```power-fx
ClearCollect( NewOrder,
    ForAll( Products,
        If( 'Quantity Requested' > 'Quantity Available',
            {
                Product: Product,
                'Quantity To Order': 'Quantity Requested' - 'Quantity Available'
            }
        )
    )
)
```

**ClearCollect** and **Collect** can't be delegated. As a result, the amount of data that can be moved in this manner is limited.

#### Collect within ForAll

Finally, we can perform the **Collect** directly within the **ForAll**:

```power-fx
Clear( NewOrder );
ForAll( Products,
    If( 'Quantity Requested' > 'Quantity Available',
        Collect( NewOrder,
            {
                Product: Product,
                'Quantity To Order': 'Quantity Requested' - 'Quantity Available'
            }
        )
    )
)
```

Again, the **ForAll** function can't be delegated at this time. If our **Products** table is large, **ForAll** looks at the first set of records only and we may miss some products that need to be ordered. But for tables that we know are remain small, this approach is fine.

Note that we aren't capturing the result of the **ForAll**. The **Collect** function calls made from within it returns the **NewOrder** data source for all the records, which could add up to numerous data if we were capturing it.

### Map table in a component

See [Map tables](/power-apps/maker/canvas-apps/map-component-input-fields#map-tables).

---

## GroupBy and Ungroup functions

Source: [function-groupby.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-groupby)

*Reference information including syntax and examples for the GroupBy and Ungroup functions.*

# GroupBy and Ungroup functions
| Function | Applies to |
|-----------|------------|
| **GroupBy** | 
- ✓ Canvas apps 
- ✓ Model-driven apps 
- ✓ Power Pages |
| **Ungroup** | 
- ✓ Canvas apps 
- ✓ Model-driven apps |



Groups and ungroups [records](/power-apps/maker/canvas-apps/working-with-tables#records) of a [table](/power-apps/maker/canvas-apps/working-with-tables).

## Description

The **GroupBy** function returns a table with records grouped together based on the values in one or more [columns](/power-apps/maker/canvas-apps/working-with-tables#columns). Records in the same group are placed into a single record, with a column added that holds a nested table of the remaining columns.

The **Ungroup** function reverses the **GroupBy** process. This function returns a table, breaking into separate records any records that were grouped together.

You can group records by using **GroupBy**, modify the table that it returns, and then ungroup records in the modified table by using **Ungroup**. For example, you can remove a group of records by following this approach:

- Use the **GroupBy** function.
- Use the **[Filter](function-filter-lookup.md)** function to remove the entire group of records.
- Use the **Ungroup** function.

You can also aggregate results based on a grouping:

- Use the **GroupBy** function.
- Use the **[AddColumns](function-table-shaping.md)** function with **[Sum](function-aggregates.md)**, **[Average](function-aggregates.md)**, and other aggregate functions to add a new column, which is an aggregate of the group tables.
- Use the **[DropColumns](function-table-shaping.md)** function to drop the group table.

**Ungroup** tries to preserve the original order of the records that were fed to **GroupBy**. This isn't always possible (for example, if the original table contains _blank_ records).

A table is a value in Power Apps, just like a string or a number. You can specify a table as an argument for a function, and a function can return a table. **GroupBy** and **Ungroup** don't modify a table; instead they take a table as an argument and return a different table. See [working with tables](/power-apps/maker/canvas-apps/working-with-tables) for more details.

> [!NOTE]
> In Power Apps prior to version 3.24042, column names were specified with a text string using double quotes, and if connected to a data source they also needed to be logical names. For example, the logical name **"cr43e_name"** with double quotes was used instead of the display name **Name** without quotes. For SharePoint and Excel data sources that contain column names with spaces, each space was specified with **"\_x0020\_"**, for example **"Column Name"** as **"Column_x0020_Name"**. After this version, all apps were automatically updated to the new syntax described in this article. 

## Syntax

**GroupBy**( _Table_, _ColumnName1_ [, *ColumnName2*, ... ], _GroupColumnName_ )

- _Table_ - Required. Table to be grouped.
- _ColumnName(s)_ - Required. The column names in _Table_ by which to group records. These columns become columns in the resulting table.
- _GroupColumnName_ - Required. The column name for the storage of record data not in the _ColumnName(s)_.

**Ungroup**( _Table_, _GroupColumnName_ )

- _Table_ - Required. Table to be ungrouped.
- _GroupColumnName_ - Required. The column that contains the record data setup with the **GroupBy** function.

## Examples

### Create a collection

1. Add a button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property so that the button shows **Original**.
2. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of the **Original** button to this formula:

```power-fx
ClearCollect( CityPopulations,
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
```

3. While holding down the Alt key, select the **Original** button.

   You just created a [collection](/power-apps/maker/canvas-apps/working-with-data-sources#collections), named **CityPopulations**, that contains this data:
   
   ![CityPopulations example.](media/function-groupby/cities.png)

4. To display this collection, select **Collections** on the **File** menu and then select the **CityPopulations** collection. The first five records in the collection appear:

   ![CityPopulations collection.](media/function-groupby/citypopulations-collection.png)

### Group records

1. Add another button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property to **"Group"**.
2. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of this button to this formula:

   **ClearCollect( CitiesByCountry, GroupBy( CityPopulations, Country, Cities ) )**

3. While holding down the Alt key, select the **Group** button.

   You just created a collection, named **CitiesByCountry**, in which the records of the previous collection are grouped by the **Country** column.

   ![Cities grouped.](media/function-groupby/cities-grouped.png)

4. To display the first five records in this collection, select **Collections** on the **File** menu.

   ![Cities by country/region.](media/function-groupby/citiesbycountry-collection.png)

5. To display the populations of cities in a country/region, select the table icon in the **Cities** column for that country/region (for example, Germany):

   ![Population - Germany.](media/function-groupby/population-germany.png)

### Filter and ungroup records

1. Add another button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property so that the button shows **"Filter"**.
2. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of this button to this formula:

   **ClearCollect( CitiesByCountryFiltered, Filter( CitiesByCountry, "e" in Country ) )**

3. While holding down the Alt key, select the button that you added.

   You just created a third collection, named **CitiesByCountryFiltered**, that includes only those countries that have an "e" in their names (that is, not Spain or Italy).

   ![CitiesByCountryFiltered.](media/function-groupby/cities-grouped-hase.png)

4. Add one more button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property so that the button shows **"Ungroup"**.
5. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of this button to this formula:

   **ClearCollect( CityPopulationsUngrouped, Ungroup( CitiesByCountryFiltered, Cities ) )**

   Which results in:

   ![Cities by country/region after ungroup.](media/function-groupby/cities-hase.png)

### Aggregate results

Another operation we can perform on a grouped table is to compile the results. In this example, we'll sum the population of the major cities in each country/region.

1. Add another button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property so that the button shows **"Sum"**.
2. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of the **"Sum"** button to this formula:

   **ClearCollect( CityPopulationsSum, AddColumns( CitiesByCountry, 'Sum of City Populations', Sum( Cities, Population ) ) )**

   Which results in:

   ![Cities sum.](media/function-groupby/cities-sum.png)

   **[AddColumns](function-table-shaping.md)** starts with the base **CitiesByCountry** collection and adds a new column **Sum of City Populations**. This column's values are calculated row-by-row, based on the formula **Sum( Cities, Population )**. **AddColumns** provides the value of the **Cities** column (a table) for each row, and **[Sum](function-aggregates.md)** adds up the **Population** for each row of this sub table.

   Now that we have the sum that we want, we can use **[DropColumns](function-table-shaping.md)** to remove the sub tables.

4. Add another button, and set its **[Text](/power-apps/maker/canvas-apps/controls/properties-core)** property so that the button shows **"SumOnly"**.
5. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of the **"SumOnly"** button to this formula:

   **ClearCollect( CityPopulationsSumOnly, DropColumns( CityPopulationsSum, Cities ) )**

   Which results in:

   ![Countries sum.](media/function-groupby/cities-sum-drop-cities.png)

   Note that we didn't need to ungroup this table.

---

## GUID function

Source: [function-guid.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-guid)

*Reference information including syntax and examples for the GUID function.*

# GUID function
**Applies to:** 
- ✓ Canvas apps
- ✓ Copilot Studio
- ✓ Desktop flows
- ✓ Model-driven apps
- ✓ Power Platform CLI
- ✓ Dataverse functions



Convert a GUID ([globally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)) string to a GUID value, or create a new GUID value.

## Description

Use the **GUID** function to convert a string with the hexadecimal representation of a GUID into a GUID value you can pass to a database. Database systems like Microsoft Dataverse and SQL Server use GUID values as keys.

The string can have uppercase or lowercase letters, but it must be 32 hexadecimal digits in one of these formats:

- **"123e4567-e89b-12d3-a456-426655440000"** (hyphens in standard locations)
- **"123e4567e89b12d3a456426655440000"** (no hyphens)

If you don't specify an argument, the function creates a new GUID.

To convert a GUID value to a string, use it in a string context. The GUID value converts to a hexadecimal string with hyphens and lowercase letters.

When generating a new GUID, the function uses pseudo-random numbers to create a version 4 [IETF RFC 4122](https://www.ietf.org/rfc/rfc4122.txt) GUID. When converting a string to a GUID, the function supports any GUID version by accepting any string of 32 hexadecimal digits.

## Volatile functions

**GUID** is a volatile function when used without an argument. Each time the function is evaluated, it returns a different value.

When you use a volatile function in a data-flow formula, it returns a different value only if the formula is reevaluated. If nothing else changes in the formula, it keeps the same value while your app is open.

For example, if you set the **Text** property of a label control to **GUID()**, it doesn't change while your app is active. You get a different value only when you close and reopen the app.

The function is reevaluated if it's part of a formula where something else changes. For example, if you set the **Text** property of a **Label** control to this formula, a GUID is generated each time the user changes the value of the **Text input** control:

**TextInput1.Text & " " & GUID()**

When you use **GUID** in a [behavior formula](/power-apps/maker/canvas-apps/working-with-formulas-in-depth), it's evaluated each time the formula is evaluated. For more information, see the examples later in this topic.

## Syntax

**GUID**( [ _GUIDString_ ] )

- _GUIDString_ – Optional. A text string that has the hexadecimal representation of a GUID. If you don't supply a string, the function creates a new GUID.

**GUID**( _Dynamic_ )

- _Dynamic_ – Required. [**Dynamic**](../untyped-object.md) value that represents a GUID. Acceptable values depend on the untyped provider. For [**JSON**](function-parsejson.md), the dynamic value is expected to be a GUID represented as a JSON string.

## Examples

#### Basic usage

To return a GUID value based on the hexadecimal string representation:

```power-fx
GUID( "0f8fad5b-d9cb-469f-a165-70867728950e" )
```

You can also provide the GUID string without hyphens. This formula returns the same GUID value:

```power-fx
GUID( "0f8fad5bd9cb469fa16570867728950e" )
```

Used in context, to set the **Status** field of a new database record to a well-established value:

```power-fx
Patch( Products, Default( Products ), { Status: GUID( "F9168C5E-CEB2-4faa-B6BF-329BF39FA1E4" ) } )
```

You probably don't want to show GUIDs to users, but GUIDs can help you debug your app. To show the value of the **Status** field in the record you created in the previous example, set the **Text** property of a **Label** control to this formula:

```power-fx
First( Products ).Status
```

The **Label** control shows **f9168c5e-ceb2-4faa-b6bf-329bf39fa1e4**.

#### Create a table of GUIDs

1. Set the **[OnSelect](/power-apps/maker/canvas-apps/controls/properties-core)** property of a **[Button](/power-apps/maker/canvas-apps/controls/control-button)** control to this formula:

   ```power-fx
   ClearCollect( NewGUIDs, ForAll( Sequence(5), GUID() ) )
   ```

   This formula creates a single-column table that's used to iterate five times, resulting in five GUIDs.

1. Add a **[Data table](/power-apps/maker/canvas-apps/controls/control-data-table)** control, set its **Items** property to **NewGUIDs**, and show the **Value** field.

1. Hold down the Alt key and select the button.

   The data table shows a list of GUIDs:

   ![A screen showing a data table with five different GUID values.](media/function-guid/guid-collection-1.png)

1. Select the button again to show a new list of GUIDs:

   ![The same screen showing a data table with a new set of five different GUID values.](media/function-guid/guid-collection-2.png)

To generate a single GUID instead of a table, use this formula:

```power-fx
Set( NewGUID, GUID() )
```

---

## HashTags function

Source: [function-hashtags.md](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-hashtags)

*Reference information including syntax and examples for the HashTags function.*

# HashTags function
**Applies to:** 
- ✓ Canvas apps
- ✓ Model-driven apps
- ✓ Power Pages



Extracts the hashtags (#strings) from a string of text.

## Description

The **HashTags** function scans a string for hashtags. Hashtags start with a pound character (#), which is followed by any combination of:

- uppercase and lowercase letters
- numerals
- underscores
- currency symbols (such as $)

**HashTags** returns a one-column [table](/power-apps/maker/canvas-apps/working-with-tables) that contains the hashtags in the string. If the string contains no hashtags, the function returns a one-column table that's [empty](function-isblank-isempty.md).

## Syntax

**HashTags**( _String_ )

- _String_ - Required. String to scan for hashtags.

## Examples

### Step by step

1. Add a **[Text input](/power-apps/maker/canvas-apps/controls/control-text-input)** control, name it **Tweet**, and type this sentence into it:

   **This #app is #AMAZING and can #coUnt123 or #123abc but not #1-23 or #$\*(#\@")**

2. Add a vertical custom gallery, and set its **[Items](/power-apps/maker/canvas-apps/controls/properties-core)** property to this function:

   **HashTags(Tweet.Text)**

3. Add a **[Label](/power-apps/maker/canvas-apps/controls/control-text-box)** control to the gallery template.

   The gallery shows these hashtags:

   - **\#app**
   - **\#AMAZING**
   - **\#coUnt123**
   - **\#123abc**
   - **\#1**

---

