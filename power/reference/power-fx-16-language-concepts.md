# Power Fx — Language Concepts (Operators, Data Types, Tables, Variables, Error Handling, Grammars)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 13

## Contents

1. [Microsoft Power Fx overview | Microsoft Docs](#microsoft-power-fx-overview-microsoft-docs)
2. [Operators and Identifiers in Microsoft Power Fx | Microsoft Docs](#operators-and-identifiers-in-microsoft-power-fx-microsoft-docs)
3. [Data types](#data-types)
4. [Microsoft Power Fx Tables: Records, Columns, and Formulas](#microsoft-power-fx-tables-records-columns-and-formulas)
5. [Understand imperative logic in a Microsoft Power Fx | Microsoft Docs](#understand-imperative-logic-in-a-microsoft-power-fx-microsoft-docs)
6. [Understand Variables in Microsoft Power Fx | Microsoft Docs](#understand-variables-in-microsoft-power-fx-microsoft-docs)
7. [Understand errors in Power Fx](#understand-errors-in-power-fx)
8. [Global support in Microsoft Power Fx | Microsoft Docs](#global-support-in-microsoft-power-fx-microsoft-docs)
9. [Regular expressions in Microsoft Power Fx | Microsoft Docs](#regular-expressions-in-microsoft-power-fx-microsoft-docs)
10. [Dynamic values](#dynamic-values)
11. [Working with JSON in Power Fx](#working-with-json-in-power-fx)
12. [Microsoft Power Fx expression grammar | Microsoft Docs](#microsoft-power-fx-expression-grammar-microsoft-docs)
13. [Microsoft Power Fx YAML Formula Grammar | Microsoft Docs](#microsoft-power-fx-yaml-formula-grammar-microsoft-docs)

---

## Microsoft Power Fx overview | Microsoft Docs

Source: [overview.md](https://learn.microsoft.com/en-us/power-platform/power-fx/overview)

*Overview of the Power Fx language*

# Microsoft Power Fx overview

Power Fx is the low-code language that Microsoft Power Platform uses. It's a general-purpose, strongly typed, declarative, and functional programming language.

Power Fx is expressed in human-friendly text. It's a low-code language that makers can work with directly in an Excel-like formula bar or Visual Studio Code text window. The "low" in low-code comes from the concise and simple nature of the language, which makes common programming tasks easy for both makers and developers. It enables the full spectrum of development from no-code for those who never programmed before to "pro-code" for the seasoned professional, with no learning or rewriting cliffs in between. Diverse teams can collaborate and save time and expense.

> [!NOTE]
> - Microsoft Power Fx is the new name for the formula language for canvas apps in Power Apps. This overview and associated articles are a work in progress as Microsoft extracts the language from canvas apps, integrates it with other Microsoft Power Platform products, and makes it available as open source. To learn more about and experience the language today, start with [Get started with formulas in canvas apps](/powerapps/maker/canvas-apps/working-with-formulas) in the Power Apps documentation and sign up for a free [Power Apps trial](https://powerapps.microsoft.com).
> - In this article, *makers* refers to users who might use a feature at either end of the programming skill spectrum. *Developers* refers to users when the feature is more advanced and is likely beyond the scope of a typical Excel user.

Power Fx binds objects together with declarative spreadsheet-like formulas. For example, think of the **Visible** property of a UI control as a cell in an Excel worksheet, with an associated formula that calculates its value based on the properties of other controls. The formula logic recalculates the value automatically, similar to how a spreadsheet does, which affects the visibility of the control.

Also, Power Fx offers imperative logic when needed. Worksheets don't typically have buttons that can submit changes to a database, but apps often do. The same expression language is used for both declarative and imperative logic.

Microsoft will make Power Fx available as open-source software. It's currently integrated into canvas apps, and Microsoft is in the process of extracting it from Power Apps for use in other Microsoft Power Platform products and as open source. More information: [Microsoft Power Fx on GitHub](https://github.com/microsoft/power-fx)

This article is an overview of the language and its design principles. To learn more about Power Fx, see the following articles:

- [Data types](data-types.md)
- [Operators and identifiers](operators.md)
- [Tables](tables.md)
- [Variables](variables.md)
- [Imperative logic](imperative.md)
- [Global support](global.md)
- [Expression grammar](expression-grammar.md)
- [YAML formula grammar](yaml-formula-grammar.md)

## Think spreadsheet

What if you could build an app as easily as you build a worksheet in Excel?

What if you could take advantage of your existing spreadsheet knowledge?

These questions inspired the creation of Power Apps and Power Fx. Hundreds of millions of people create worksheets with Excel every day. Let's bring them app creation that's easy and uses Excel concepts that they already know. By breaking Power Fx out of Power Apps, we're going to answer these questions for building automation, or a virtual agent, or other domains.

All programming languages, including Power Fx, have *expressions*: a way to represent a calculation over numbers, strings, or other data types. For example, `mass * acceleration` in most languages expresses multiplication of `mass` and `acceleration`. You can put the result of an expression in a variable, use it as an argument to a procedure, or nest it in a bigger expression.

Power Fx takes this a step further. An expression by itself says nothing about what it's calculating. It's up to the maker to place it in a variable or pass it to a function. In Power Fx, instead of only writing an expression that has no specific meaning, you write a *formula* that binds the expression to an identifier. You write `force = mass * acceleration` as a formula for calculating `force`. As `mass` or `acceleration` changes, `force` automatically updates to a new value. The expression described a calculation, a formula gave that calculation a name and used it as a recipe. This is why we refer to Power Fx as a *formula language*.

For example, this [formula from Stack Overflow](https://stackoverflow.com/questions/350264/how-can-i-perform-a-reverse-string-search-in-excel-without-using-vba) searches a string in reverse order. In Excel, it looks like the following image.

:::image type="content" source="media/overview/reverse-search-excel.png" alt-text="Reverse search":::

Screenshot of a formula bar in Excel with the formula:
=RIGHT(A1,LEN(A1)-
FIND("|",
SUBSTITUTE(A1," ","|",
LEN(A1)-LEN(SUBSTITUTE(A1," ",""))))
Cell A1 contains the text "Hello, World! It is great to meet you!" Cell A2 contains the text "you!"

Power Fx works with this same formula, with the cell references replaced with control property references:

> [!div class="mx-imgBorder"]
> ![Power Fx reverse search.](media/overview/reverse-search-power-apps.gif "Power Fx reverse search")

Screenshot of a Power Fx formula bar in Power Apps. The formula is
=RIGHT(Input.Text,Len(Input.Text)-
FIND("|",
SUBSTITUTE(Input.Text," ","|",
Len(Input.Text)-Len(Substitute(Input.Text," ",""))))
In the Input box below the formula, the text "Hello, World! It is great to meet you!" appears, letter by letter. At the same time in the Label box, the letters of the last word appear. When the full text appears in the Input box, the word "you!" appears in the Label box.

As the `Input` control value changes, the `Label` control automatically recalculates the formula and shows the new value. There are no `OnChange` event handlers here, as would be common in other languages.

Another example uses a formula for the `Fill` color of the screen. As the sliders that control Red, Green, and Blue change, the background color automatically changes as it's being recalculated.

> [!div class="mx-imgBorder"]
> ![Color slider.](media/overview/color-sliders-power-apps.gif "Color slider")

There are no `OnChange` events for the slider controls, as would be common in other languages. There's no way to explicitly set the `Fill` property value at all. If the color isn't working as expected, you need to look at this one formula to understand why it isn't working. You don't need to search through the app to find a piece of code that sets the property at an unexpected time; there is no time element. The correct formula values are always maintained.

As the sliders are set to a dark color, the labels for Red, Green, and Blue change to white to compensate. This change happens through a simple formula on the `Color` property for each label control.

> [!div class="mx-imgBorder"]
> ![Power Fx color sliders.](media/overview/color-sliders-power-apps-labels.png "Power Fx color sliders")

What's great about this formula is that it's isolated from what's happening for the `Fill` color: these are two entirely different calculations. Instead of large monolithic procedures, Power Fx logic is typically made up of lots of smaller formulas that are independent. This structure makes them easier to understand and enables enhancements without disturbing existing logic.

Power Fx is a declarative language, just as Excel is. The maker defines what behavior they want, but it's up to the system to determine and optimize how and when to accomplish it. To make that practical, most work is done through pure functions without side effects, making Power Fx also a functional language (again, just as Excel is).

## Always live

A defining aspect of worksheets is that they're always live, and changes are reflected instantaneously. There's no compile or run mode in a worksheet. When you modify a formula or enter a value, the worksheet immediately recalculates to reflect the changes. Any detected errors surface immediately and don't interfere with the rest of the worksheet.

Power Fx implements the same thing. It uses an incremental compiler to continuously keep the program in sync with the data it's operating on. Changes automatically propagate through the program's graph, affecting the results of dependent calculations. These calculations might drive properties on controls such as color or position. The incremental compiler also provides a rich formula editing experience with IntelliSense, suggestions, autocomplete, and type checking.

In the following animation, the order number is displayed in a label control dependent on the slider control, even though there are two errors on the labels below it. The app is very much alive and interactive. The first attempt at fixing the formula by entering `.InvalidName` results in an immediate red line and error displayed, as it should, but the app keeps running.

> [!div class="mx-imgBorder"]
> ![Always live.](media/overview/always-live.gif "Always live")

When you enter `.Employee`, the `Data` pane adds the Employees table, retrieves metadata for this table, and immediately offers suggestions for columns. You just walked across a relationship from one table to another, and the system made the needed adjustments to the app's references. The same thing happens when adding a `.Customer`.

After each change, the slider continues with its last value and any variables retain their value. Throughout, the order number continues to be displayed in the top label as it should. The app is live, processing real data, the entire time. You can save it, walk away, and others can open and use it just like Excel. There's no build step, no compile, there's only a publish step to determine which version of the app is ready for users.

## Low code

Power Fx describes business logic in concise, yet powerful, formulas. Most logic reduces to a single line, with plenty of expressiveness and control for more complex needs. The goal is to keep to a minimum the number of concepts a maker needs to understand&mdash;ideally, no more than an Excel user would already know.

For example, to look up the first name of an employee for an order, you write the Power Fx as shown in the following animation. Beyond Excel concepts, the only added concept used here is the dot **"."** notation for drilling into a data structure, in this case `.Employee.'First Name'`. The animation shows the mapping between the parts of the Power Fx formula and the concepts that need to be explicitly coded in the equivalent JavaScript.

> [!div class="mx-imgBorder"]
> ![Low-code JavaScript.](media/overview/low-code-javascript.gif "Low-code JavaScript")

Let's look more in-depth at all the things that Power Fx does for us and the freedom it has to optimize because the formula is declarative:

- **Asynchronous**: All data operations in Power Fx are asynchronous. The maker doesn't need to specify this, nor does the maker need to synchronize operations after the call is over. The maker doesn't need to be aware of this concept at all, they don't need to know what a promise or lambda function is.

- **Local and remote**: Power Fx uses the same syntax and functions for data that's local in-memory and remote in a database or service. The user need not think about this distinction. Power Fx automatically delegates what it can to the server, to process filters and sorts there more efficiently.

- **Relational data**: Orders and Customers are two different tables, with a many-to-one relationship. The OData query requires an "$expand" with knowledge of the foreign key, similar to a Join in SQL. The formula has none of this; in fact, database keys are another concept the maker doesn't need to know about. The maker can use simple dot notation to access the entire graph of relationships from a record.

- **Projection**: When writing a query, many developers write `select * from table`, which brings back all the columns of data. Power Fx analyzes all the columns that are used through the entire app, even across formula dependencies. Projection is automatically optimized and, again, a maker doesn't need to know what "projection" means.

- **Retrieve only what is needed**: In this example, the `LookUp` function implies that only one record should be retrieved and that's all that's returned. If more records are requested by using the `Filter` function&mdash;for which thousands of records might qualify&mdash;only a single page of data is returned at a time, on the order of 100 records per page. The user must gesture through a gallery or data table to see more data, and it automatically brings in more data for them. The maker can reason about large sets of data without needing to think about limiting data requests to manageable chunks.

- **Runs only when needed**: You define a formula for the `Text` property of the label control. As the variable selected changes, the `LookUp` is automatically recalculated and the label is updated. The maker didn't need to write an OnChange handler for Selection, and didn't need to remember that this label is dependent upon it. This is declarative programming, as discussed earlier: the maker specified what they wanted to have in the label, not how or when it should be fetched. If this label isn't visible because it's on a screen that isn't visible, or its `Visible` property is false, you can defer this calculation until the label is visible and effectively eliminate it if that rarely happens.

- **Excel syntax translation**: Many users know that the ampersand (**&**) is used for string concatenation in Excel. JavaScript uses a plus sign (**+**), and other languages use a dot (**.**).

- **Display names and localization**:  `First Name` is used in the Power Fx formula while `nwind_firstname` is used in the JavaScript equivalent. In Microsoft Dataverse and SharePoint, there's a display name for columns and tables in addition to a unique logical name. The display names are often much more user-friendly, as in this case, but they have another important quality in that they can be localized. If you have a multilingual team, each team member can see table and field names in their own language. In all use cases, Power Fx makes sure that the correct logical name is sent to the database automatically.

## No code

You don't need to read or write Power Fx to start expressing logic. You can express many customizations and logic through simple switches and UI builders. These no-code tools are built to read and write Power Fx, so there's plenty of headroom for someone to take it further. However, no-code tools never offer all the expressiveness of the full language. Even when you use no-code builders, the formula bar is front and center in Power Apps to educate the maker about what's being done on their behalf so they can begin to learn Power Fx.

Let's look at some examples. In Power Apps, the property panel provides no-code switches and knobs for the properties of the controls. In practice, most property values are static. You can use the color builder to change the background color of the `Gallery`. Notice that the formula bar reflects this change, updating the formula to a different `RGBA` call. At any time, you can go to the formula bar and take this change a step further - in this example, by using `ColorFade` to adjust the color. The color property still appears in the properties panel, but an **fx** icon appears on hover and you're directed to the formula bar. This fully works in two ways: removing the `ColorFade` call returns the color to something the property panel can understand, and you can use it again to set a color.

> [!div class="mx-imgBorder"]
> ![No-code color.](media/overview/no-code-color.gif "No-code color")

Here's a more complicated example. The gallery shows a list of employees from Dataverse. Dataverse provides views over table data. You can select one of these views and the formula changes to use the `Filter` function with this view name. You can use the two drop-down menus to dial in the correct table and view without touching the formula bar. But let's say you want to go further and add a sort. You can add that function in the formula bar, and the property panel again shows an fx icon and directs modifications to the formula bar. And again, if you simplify the formula to something the property panel can read and write, it can be used.

> [!div class="mx-imgBorder"]
> ![No-code sort.](media/overview/no-code-sort.gif "No-code sort")

These examples are simple. Power Fx makes a great language for describing no-code interactions. It's concise, powerful, and easy to parse. It provides the headroom that is so often needed with "no cliffs" up to low-code.

## Pro code

Low-code makers sometimes build solutions that require the help of an expert or are taken over by a professional developer to maintain and enhance. Professionals also appreciate that low-code development can be easier, faster, and less costly than building a professional tool. Not every situation requires the full power of Visual Studio.

Professionals want to use professional tools to be most productive. You can store Power Fx formulas in [YAML source files](yaml-formula-grammar.md), which are easy to edit by using Visual Studio Code, Visual Studio, or any other text editor. Storing formulas in YAML files enables you to put Power Fx under source control by using GitHub, Azure DevOps, or any other source code control system.

> [!div class="mx-imgBorder"]
> ![Pro code Visual Studio Code.](media/overview/pro-code-vscode.gif "Pro code Visual Studio Code")

> [!div class="mx-imgBorder"]
> ![Pro code GitHub.](media/overview/pro-code-github.gif "Pro code GitHub")

Power Fx supports formula-based components for sharing and reuse. It supports parameters to component properties, enabling the creation of pure user-defined functions with more enhancements on the way.

Also, Power Fx is great at stitching together components and services built by professionals. Out-of-the-box connectors provide access to hundreds of data sources and web services. Custom connectors enable Power Fx to talk to any REST web service. Code components enable Power Fx to interact with fully custom JavaScript on the screen and page.

## Design principles

### Simple

Power Fx is designed to target the maker audience, whose members aren't trained as developers. Wherever possible, the language uses knowledge that this audience already knows or can pick up quickly. The number of concepts required to be successful is kept to a minimum.

Being simple is also good for developers. For the developer audience, Power Fx aims to be a low-code language that cuts down the time required to build a solution.

### Excel consistency

Microsoft Power Fx language borrows heavily from the Excel formula language. It takes advantage of Excel knowledge and experience from the many makers who also use Excel. Types, operators, and function semantics are as close to Excel as possible.

If Excel doesn't have an answer, Power Fx next looks to SQL. After Excel, SQL is the next most commonly used declarative language and can provide guidance on data operations and strong typing that Excel doesn't.

### Declarative

The maker describes *what* they want their logic to do, not exactly *how* or *when* to do it. This approach allows the compiler to optimize by performing operations in parallel, deferring work until needed, and prefetching and reusing cached data.

For example, in an Excel worksheet, the author defines the relationships among cells but Excel decides when and in what order to evaluate formulas. Similarly, you can think of formulas in an app as "recalc-ing" as needed based on user actions, database changes, or timer events.

### Functional

Use pure functions that don't have side effects. This approach results in logic that's easier to understand and gives the compiler the most freedom to optimize.

Unlike Excel, apps by their nature do mutate state. For example, apps have buttons that save changes to the record in a database. Some functions, therefore, do have side effects, although limit these side effects as much as is practical.

### Composition

Where possible, add functionality that composes well with existing functionality. You can decompose powerful functions into smaller parts that you can more easily use independently.

For example, a **Gallery** control doesn't have separate `Sort` and `Filter` properties. Instead, you compose the `Sort` and `Filter` functions together into a single `Items` property. You layer the UI for expressing `Sort` and `Filter` behavior on top of the `Items` property by using a two-way editor for this property.

### Strongly typed

The types of all values are known at compile time. This approach allows for the early detection of errors and rich suggestions while authoring. 

Polymorphic types are supported, but before you can use them, you must pin their type to a static type and that type must be known at compile time. The **IsType** and **AsType** functions are provided for testing and casting types.

### Type inference

Types are derived from their use without being declared. For example, setting a variable to a number results in the variable's type being established as a number.

Conflicting type usage results in a compile-time error.

### Locale-sensitive decimal separators

Some regions of the world use a dot (**.**) as the decimal separator, while others use a comma (**,**). Excel follows this regional convention. Other programming languages generally use a canonical dot (**.**) as the decimal separator for all users worldwide. To be as approachable as possible for makers at all levels, it's important that `3,14` is a decimal number for a person in France who has used that syntax all their lives.

The choice of decimal separator has a cascading impact on the list separator, used for function call arguments, and the chaining operator.

| Author's language decimal separator | Power Fx decimal separator | Power Fx list separator | Power Fx chaining operator |
| --- | --- | --- | --- |
| **.** (dot) |**.** (dot) |**,** (comma) |**;** (semicolon) |
| **,** (comma) |**,** (comma) |**;** (semicolon) |**;;** (double semicolon) |

More information: [Global support](global.md)

### Not object-oriented 

Excel isn't object-oriented, and neither is Power Fx. For example, in some languages, the length of a string is expressed as a property of the string, such as `"Hello World".length` in JavaScript. Excel and Power Fx instead express this in terms of a function, as `Len( "Hello World" )`.

Components with properties and methods are object-oriented and Power Fx easily works with them. But where possible, prefer a functional approach.

### Extensible 

Makers can create their components and functions by using Power Fx itself. Developers can create their components and functions by writing JavaScript.

### Developer friendly 

Although makers are the primary target, try to be developer-friendly wherever possible. If it doesn't conflict with the design principles described previously, do things in a way that a developer appreciates. For example, Excel has no capability for adding comments, so use C-like line and inline comments.

### Language evolution 

Evolving programming languages is both necessary and tricky. Everyone&mdash;rightfully&mdash;is concerned that a change, no matter how well-intentioned, might break existing code and require users to learn a new pattern. Power Fx takes backward compatibility seriously, but the Power Fx team also strongly believes that they won't always get it right the first time and that the community can collectively learn what's best. A programming language must evolve, and Power Fx was designed to support language evolution from the very beginning.

Every saved Power Fx document includes a language version stamp. If the Power Fx team wants to make an incompatible change, they write what they call a "back compat converter" that automatically rewrites the formula the next time it's edited. If the change is something major that the team needs to educate the user about, the app displays a message with a link to the docs. By using this facility, Power Fx can still load apps that were built with the preview versions of Power Apps from many years ago, despite all the changes that have occurred since then.

For example, the Power Fx team introduced the `ShowError` function to display an error banner with a red background. 

![Show error.](media/overview/showerror-2018.png "Show error")

Users loved it, but they also asked for a way to show a success banner (green background) or an informational banner (blue background). So, the team came up with a more generic `Notify` function that takes a second argument for the kind of notification. The team could have just added `Notify` and kept `ShowError` the way it was, but instead they replaced `ShowError` with `Notify`. They removed a function that was previously in production and replaced it with something else. Because there would have been two ways to do the same thing, this change would have caused confusion&mdash;especially for new users&mdash;and, most importantly it would have added complexity. Nobody complained, everybody appreciated the change and then moved on to their next Notify feature.

This is how the same app looks when loaded into the latest version of Power Apps. No action was required by the user to make this transformation happen, it occurred automatically when the app was opened.

![Notify function replaces ShowError.](media/overview/showerror-2021.png "New show error")

By using this facility, Power Fx can evolve faster and more aggressively than most programming languages.

### No undefined value

Some languages, such as JavaScript, use the concept of an *undefined* value for uninitialized variables or missing properties. For simplicity's sake, Power Fx avoids this concept. Instances that would be undefined in other languages are treated as either an error or a blank value. For example, all uninitialized variables start with a blank value. All data types can take on the value of blank.

## Related articles

[Data types](data-types.md)<br>
[Operators and identifiers](operators.md)<br>
[Tables](tables.md)<br>
[Variables](variables.md)<br>
[Imperative logic](imperative.md)<br>
[Global support](global.md)<br>
[Expression grammar](expression-grammar.md)<br>
[YAML formula grammar](yaml-formula-grammar.md)<br/>
[Formulas in canvas apps](/powerapps/maker/canvas-apps/working-with-formulas)

---

## Operators and Identifiers in Microsoft Power Fx | Microsoft Docs

Source: [operators.md](https://learn.microsoft.com/en-us/power-platform/power-fx/operators)

*Reference information, including syntax and examples, for the operators and identifiers in Microsoft Power Fx*

# Operators and Identifiers

> [!NOTE]
> Microsoft Power Fx is the new name for the canvas apps formula language.  These articles are work in progress as we extract the language from canvas apps, integrate it with other Microsoft Power Platform products, and make it available as open source.  Start with the [Microsoft Power Fx Overview](overview.md) for an introduction to the language.    

The operators in Microsoft Power Fx are described below.  Some of these operators are dependent on the language of the author.  See [Global apps](global.md) for more information.


|  Symbol   |      Type      |    Syntax      |        Description       |
|-------------------|--------------|------------------|-----------------------|
|   **.**       |       Property Selector        |      **Slider1.Value<br>Color.Red**      |    Extracts a property from a table control, or enumeration.  For backward compatibility, **!** can be used.   |
| **.**<br>[language dependent](global.md)  |    Decimal separator   |      **1.23**   |  Separator between whole and fractional parts of a number. The character depends on the language.    |
|  **( )**    |   Parentheses   |  **Filter(T, A &lt; 10)**<br><br>**(1 + 2) \* 3**   |      Enforces precedence order, and groups sub expressions in a larger expression  |
|   **+**     |  Arithmetic operators   |    **1 + 2**     |       Addition     |
|   **-**    |    &nbsp;    |   **2 - 1**    |   Subtraction and sign   |
| *   |   &nbsp;   |   **2 \* 3**      |       Multiplication    |
|                                **/**                                |                       &nbsp;                        |                                                                                  **2 / 3**                                                                                   |                                                                                                   Division (also see the **[Mod](reference/function-mod.md)** function)                                                                                                    |
|                                **^**                                |                       &nbsp;                        |                                                                                  **2 ^ 3**                                                                                   |                                                                                          Exponentiation, equivalent to the **[Power](reference/function-numericals.md)** function                                                                                          |
|                                **%**                                |                       &nbsp;                        |                                                                                   **20%**                                                                                    |                                                                                                         Percentage (equivalent to &quot;\* 1/100&quot;)                                                                                                          |
|                                **=**                                |                Comparison operators                 |                                                                               **Price = 100**                                                                                |                                                                                                                             Equal to                                                                                                                             |
|                              **&gt;**                               |                       &nbsp;                        |                                                                              **Price &gt; 100**                                                                              |                                                                                                                           Greater than                                                                                                                           |
|                              **&gt;=**                              |                       &nbsp;                        |                                                                             **Price &gt;= 100**                                                                              |                                                                                                                     Greater than or equal to                                                                                                                     |
|                              **&lt;**                               |                       &nbsp;                        |                                                                              **Price &lt; 100**                                                                              |                                                                                                                            Less than                                                                                                                             |
|                              **&lt;=**                              |                       &nbsp;                        |                                                                             **Price &lt;= 100**                                                                              |                                                                                                                      Less than or equal to                                                                                                                       |
|                            **&lt;&gt;**                             |                       &nbsp;                        |                                                                            **Price &lt;&gt; 100**                                                                            |                                                                                                                           Not equal to                                                                                                                           |
|                              **&amp;**                              |            String concatenation operator            |                                                      **&quot;hello&quot; &amp; &quot; &quot; &amp; &quot;world&quot;**                                                       |                                                                                                             Makes multiple strings appear continuous                                                                                                             |
|                      **&amp;&amp;** or **And**                      |                  Logical operators                  |                                       **Price &lt; 100 &amp;&amp; Slider1.Value = 20**<br>or **Price &lt; 100 And Slider1.Value = 20**                                       |                                                                                         Logical conjunction, equivalent to the **[And](reference/function-logicals.md)** function                                                                                          |
|                     **&#124;&#124;** or **Or**                      |                       &nbsp;                        |                                        **Price &lt; 100 &#124;&#124; Slider1.Value = 20** or **Price &lt; 100 Or Slider1.Value = 20**                                        |                                                                                          Logical disjunction, equivalent to the **[Or](reference/function-logicals.md)** function                                                                                          |
|                          **!** or **Not**                           |                       &nbsp;                        |                                                              **!(Price &lt; 100)** or **Not (Price &lt; 100)**                                                               |                                                                                           Logical negation, equivalent to the **[Not](reference/function-logicals.md)** function                                                                                           |
|                             **exactin**                             |  [Membership operators](#in-and-exactin-operators)  |                                                                   **Gallery1.Selected exactin SavedItems**                                                                   |                                                                                       Belonging to a [collection](/powerapps/maker/canvas-apps/working-with-data-sources) or a table                                                                                        |
|                             **exactin**                             |                       &nbsp;                        |                                           **&quot;Windows&quot; exactin “To display windows in the Windows operating system...”**                                            |                                                                                                                 Substring test (case-sensitive)                                                                                                                  |
|                               **in**                                |                       &nbsp;                        |                                                                     **Gallery1.Selected in SavedItems**                                                                      |                                                                                                               Belonging to a collection or a table                                                                                                               |
|                               **in**                                |                       &nbsp;                        |                                                      **&quot;The&quot; in &quot;The keyboard and the monitor...&quot;**                                                      |                                                                                                                Substring test (case-insensitive)                                                                                                                 |
|                                **@**                                | [Disambiguation operator](#disambiguation-operator) |                                                                           **MyTable[@fieldname]**                                                                            |                                                                                                                       Field disambiguation                                                                                                                       |
|                                **@**                                |                       &nbsp;                        |                                                                              **[@MyVariable]**                                                                               |                                                                                                                      Global disambiguation                                                                                                                       |
| **,**<br>[[language dependent](global.md)]  |                   List separator                    | **If(X < 10, "Low", "Good")**<br>**{ X: 12, Y: 32 }**<br>**[ 1, 2, 3 ]** | Separates: <ul><li>arguments in function calls</li><li>fields in a [record](/powerapps/maker/canvas-apps/working-with-tables)</li><li>records in a [table](/powerapps/maker/canvas-apps/working-with-tables)</li></ul> This character depends on the language. |
| **;**<br>[[language dependent](global.md)] |                  Formula chaining                   |                                     **Collect(T, A); Navigate(S1, &quot;&quot;)**                                     |                                                                          Separate invocations of functions in behavior properties. The chaining operator depends on the language.                                                                          |
|                             **As**                              |         [As operator](#as-operator)         |                                                                               **AllCustomers As Customer**                                                                                |                                                                                                           Overrides **ThisItem** and **ThisRecord** in galleries and record scope functions.  **As** is useful for providing a better, specific name and is especially important in nested  scenarios.                                                                                                             |
|                             **Self**                              |         [Self operator](#self-and-parent-operators)         |                                                                               **Self.Fill**                                                                                |                                                                                                           Access to properties of the current control                                                                                                             |
|                             **Parent**                              |         [Parent operator](#self-and-parent-operators)         |                                                                               **Parent.Fill**                                                                                |                                                                                                           Access to properties of a control container                                                                                                            |
|                            **ThisItem**                             |       [ThisItem operator](#thisitem-operator)       |                                                                            **ThisItem.FirstName**                                                                            |                                                                                                          Access to fields of a Gallery or form control                                                                                                           |
|                            **ThisRecord**                             |       [ThisItem operator](#thisitem-operator)       |                                                                            **ThisRecord.FirstName**                                                                            |                                                                                                          Access to the complete record and individual fields of the record within **ForAll**, **Sum**, **With**, and other record scope functions.  Can be overridden with the **As** operator.                                                                                                           |

## in and exactin operators

Use the **[in](operators.md#in-and-exactin-operators)** and **[exactin](operators.md#in-and-exactin-operators)** operators to find a string in a [data source](/powerapps/maker/canvas-apps/working-with-data-sources), such as a collection or an imported table. The **[in](operators.md#in-and-exactin-operators)** operator identifies matches regardless of case, and the **[exactin](operators.md#in-and-exactin-operators)** operator identifies matches only if they're capitalized the same way. Here's an example:

1. Create or import a collection named **Inventory**, and show it in a gallery, as the first procedure in [Show images and text in a gallery](/powerapps/maker/canvas-apps/show-images-text-gallery-sort-filter) describes.
2. Set the **[Items](/powerapps/maker/canvas-apps/controls/properties-core)** property of the gallery to this formula:
   <br>**Filter(Inventory, "E" in ProductName)**

    The gallery shows all products except Callisto because the name of that product is the only one that doesn't contain the letter you specified.
3. Change the **[Items](/powerapps/maker/canvas-apps/controls/properties-core)** property of the gallery to this formula:
   <br>**Filter(Inventory, "E" exactin ProductName)**

    The gallery shows only Europa because only its name contains the letter that you specified in the case that you specified.

## ThisItem, ThisRecord, and As operators

A few controls and functions apply formulas to individual records of a table.  To refer to the individual record in a formula, use one of the following:

| Operator | Applies to | Description |
|----------|------------|-------------|
| **ThisItem** | **[Gallery](/powerapps/maker/canvas-apps/controls/control-gallery)**&nbsp;control<br>**[Edit&nbsp;form](/powerapps/maker/canvas-apps/controls/control-form-detail)**&nbsp;control<br>**[Display&nbsp;form](/powerapps/maker/canvas-apps/controls/control-form-detail)**&nbsp;control | The default name for the current record in a **Gallery** or form control. |
| **ThisRecord** | **[ForAll](reference/function-forall.md)**, **[Filter](reference/function-filter-lookup.md)**, **[With](reference/function-with.md)**, **[Sum](reference/function-aggregates.md)** and other [record scope](/powerapps/maker/canvas-apps/working-with-tables) functions |  The default name for the current record in **ForAll** and other record scope functions. |
| **As** *name* | **[Gallery](/powerapps/maker/canvas-apps/controls/control-gallery)**&nbsp;control<br>**[ForAll](reference/function-forall.md)**, **[Filter](reference/function-filter-lookup.md)**, **[With](reference/function-with.md)**, **[Sum](reference/function-aggregates.md)** and other record scope functions | Defines a *name* for the current record, replacing default **ThisItem** or **ThisRecord**.  Use **As** to make formulas easier to understand and resolve ambiguity when nesting. |

### ThisItem operator

For example, in the following **Gallery** control, the **Items** property is set to the **Employees** data source (such as the **Employees** entity included with the [Northwind Traders sample](/powerapps/maker/canvas-apps/northwind-orders-canvas-overview)):

```power-fx
Employees
``` 

> [!div class="mx-imgBorder"]  
> ![Employees shown in a gallery.](media/operators/as-gallery-items.png)

The first item in the gallery is a template that is replicated for each employee.  In the template, the formula for the picture uses **ThisItem** to refer to the current item:

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

**ThisRecord** is used in functions that have a [record scope](/powerapps/maker/canvas-apps/working-with-tables).  For example, we can use the **Filter** function with our gallery's **Items** property to only show first names that being with *M*:

```power-fx
Filter( Employees, StartsWith( ThisRecord.Employee.'First Name', "M" ) )
``` 

> [!div class="mx-imgBorder"]  
> ![Filtering the employees based on name, using ThisRecord.](media/operators/as-gallery-filter-thisrecord.png)

**ThisRecord** is optional and implied by using the fields directly, for example, in this case, we could have written:

```power-fx
Filter( Employees, StartsWith( 'First Name', "M" ) )
```  

Although optional, using **ThisRecord** can make formulas easier to understand and may be required in ambiguous situations where a field name may also be a relationship name.  **ThisRecord** is optional while **ThisItem** is always required.

Use **ThisRecord** to reference the whole record with **Patch**, **Collect**, and other record scope functions.  For example, the following formula sets the status for all inactive employees to active:

```power-fx
With( { InactiveEmployees: Filter( Employees, Status = 'Status (Employees)'.Inactive ) },
      ForAll( InactiveEmployees, 
              Patch( Employees, ThisRecord, { Status: 'Status (Employees)'.Active } ) ) )
```

### As operator

Use the **As** operator to name a record in a gallery or record scope function, overriding the default **ThisItem** or **ThisRecord**.  Naming the record can make your formulas easier to understand and may be required in nested situations to access records in other scopes.

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

**As** can also be used with record scope functions to replace the default name **ThisRecord**.  We can apply this to our previous example to clarify the record we are working with:

```power-fx
With( { InactiveEmployees: Filter( Employees, Status = 'Status (Employees)'.Inactive ) },
      ForAll( InactiveEmployees As Employee, 
              Patch( Employees, Employee, { Status: 'Status (Employees)'.Active } ) ) )
```

When nesting galleries and record scope functions, **ThisItem** and **ThisRecord** always refers to the inner most scope, leaving records in outer scopes unavailable.  Use **As** to make all record scopes available by giving each a unique name.  

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

- We start by iterating an unnamed table of 8 numbered records from the [**Sequence**](reference/function-sequence.md) function.  This loop is for each row of the board, which is commonly referred to as **Rank** and so we give it this name.
- For each row, we iterate another unnamed table of 8 columns, and we give the common name **File**.
- If **Rank.Value + File.Value** is an odd number, the square gets an **X**, otherwise a dot.  This part of the formula is referencing both **ForAll** loops, made possible by using the **As** operator.
- [**Concat**](reference/function-concatenate.md) is used twice, first to assemble the columns and then the rows, with a [**Char(10)**](reference/function-char.md) thrown in to create a new line.

A similar example is possible with nested **Gallery** controls instead of **ForAll** functions. Let's start with the vertical gallery for the **Rank**.  This gallery control will have an **Items** formula of:  

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

And finally, within this gallery, we'll add a **Label** control that will be replicated for each **File** and each **Rank**.   We'll size it to fill the entire space and use the **Fill** property to provide the color with this formula:

```power-fx
If( Mod( Rank.Value + File.Value, 2 ) = 1, Green, Beige )
```

> [!div class="mx-imgBorder"]  
> ![Label control within the two galleries that provides the alternating colors for the chessboard.](media/operators/as-chessboard-fill.png)

## Self and Parent operators

There are three ways to refer to a control and its properties within a formula:

| Method | Description |
|--------|-------------|
| By control name |  Any control can be referenced by name from anywhere within the app.<br><br>For example, **Label1.Fill** refers to the fill property of the control who's name is **Label1**.  | 
| **Self** operator | It's often convenient to reference another property of the same control when writing a formula.  Instead of using an absolute reference by name, it's easier and more portable to use a relative reference to one*self*.  The **Self** operator provides that easy access to the current control.<br><br>For example, **Self.Fill** refers to the fill color of the current control.   |
| **Parent** operator | Some controls host other controls, such as the **[Screen](/powerapps/maker/canvas-apps/controls/control-screen)** and **[Gallery](/powerapps/maker/canvas-apps/controls/control-gallery)** controls. The hosting control of the controls within it is called the *parent*.  Like the **Self** operator, the **Parent** operator provides an easy relative reference to the container control.<br><br>For example, **Parent.Fill** refers to the fill property of the control that is the container for the current control. |

**Self** and **Parent** are operators and not properties on the controls themselves. Referring to **Parent.Parent**, **Self.Parent** or **Parent.Self** is not supported.

## Identifier names

The names of variables, data sources, columns, and other objects can contain any [Unicode](https://en.wikipedia.org/wiki/Unicode).

Use single quotes around a name that contains a space or other special character.  
Use two single quotes together to represent one single quote in the name.  Names that do not contain special characters do not require single quotes.

Here are some example column names you might encounter in a table, and how they are represented in a formula:

| Column name in a database   | Column reference in a formula |
|-----------------------------|-------------------------------|
| SimpleName                  | ```SimpleName``` |
| NameWith123Numbers          | ```NameWith123Numbers``` |
| Name with spaces            | ```'Name with spaces'``` |
| Name with "double" quotes   | ```'Name with "double" quotes'``` |
| Name with 'single' quotes   | ```'Name with ''single'' quotes'``` |
| Name with an @ at sign      | ```'Name with an @ at sign'``` |

Double quotes are used to [designate text strings](data-types.md#embedded-text).  

## Display names and logical names
Some data sources such as SharePoint and Microsoft Dataverse have two different names to refer to the same table or column of data:

* **Logical name** - A name that is guaranteed to be unique, does not change after being created, usually does not allow spaces or other special characters, and is not localized into different languages.  As a result, the name can be cryptic.  These names are used by professional developers.  For example, **cra3a_customfield**.  This name may also be referred to as **schema name** or just **name**.

* **Display name** - A name that is user-friendly and intended to be seen by end users.  This name may not be unique, may change over time, may contain spaces and any Unicode character, and may be localized into different languages.  Corresponding to the example above, the display name may be **Custom Field** with space in between the words.
 
Since display names are easier to understand, Power Fx will suggest them as choices and not suggest logical names.  Although logical names are not suggested, they can still be used if typed indirectly.

For example, imagine you have added a **Custom Field** to an entity in Dataverse.  A logical name will be assigned for you by the system, which you can modify only when creating the field.  The result would look similar to:

> [!div class="mx-imgBorder"]  
> ![Accounts entity with Custom Field added, showing a display name of "Custom Field" and a logical name of "cr5e3_customfield."](media/operators/customfield_portal.png)

When authoring a reference to a field of Accounts, the suggestion will be made to use **'Custom Field'** since this is the display name. The single quotes must be used because this name has a space in it:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing suggestions for field names of Accounts with the display name 'Custom Field' highlighted.](media/operators/customfield_suggest_display.png)

After selecting the suggestion, 'Custom Field' is shown in the formula bar and the data is retrieved: 

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the display name 'Custom Field' for the field.](media/operators/customfield_display.png)

Although it is not suggested, we could also use the logical name for this field.  This will result in the same data being retrieved.  No single quotes are required since this name does not contain spaces or special characters:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the logical name cr5e3_customfield for the field.](media/operators/customfield_logical.png)

Behind the scenes, a mapping is maintained between the display names seen in formulas and the underlying logical names.  Since logical names must be used to interact with the data source, this mapping is used to convert from the current display name to the logical name automatically and that is what is seen in the network traffic.  This mapping is also used to convert back to logical names to switch into new display names, for example, if a display name changes or a maker in a different language edits the app.

> [!NOTE] 
> Logical names are not translated when moving an app between environments.  For Dataverse system entity and field names, this should not be a problem as logical names are consistent across environments.  But any custom fields, such as **cra3a_customfield** in this example above, may have a different environment prefix (**cra3a** in this case).  Display names are preferred as they can be matched against display names in the new environment. 

## Name disambiguation
Since display names are not unique, the same display name may appear more than once in the same entity.  When this happens, the logical name will be added to the end of the display name in parentheses for one of more of the conflicting names.  Building on the example above, if there was a second field with the same display name of **Custom Field** with a logical name of **cra3a_customfieldalt** then the suggestions would show:

> [!div class="mx-imgBorder"]  
> ![Studio formula bar showing the use of the logical name cr5e3_customfieldalt to disambiguate the two versions of "Custom Field."](media/operators/customfield_suggest_alt.png)

Name disambiguation strings are added in other situations where name conflicts occur, such as the names of entities, option sets, and other Dataverse items. 

## Disambiguation operator

Some functions create [record scopes](/powerapps/maker/canvas-apps/working-with-tables) for accessing the fields of table while processing each record, such as **Filter**, **AddColumns**, and **Sum**.  Field names added with the record scope override the same names from elsewhere in the app.  When this happens, you can still access values from outside the record scope with the **@** disambiguation operator:

* To access values from nested record scopes, use the **@** operator with the name of the table being operated upon using this pattern:<br>_Table_**[@**_FieldName_**]**
* To access global values, such as data sources, collections, and context variables, use the pattern **[@**_ObjectName_**]** (without a table designation).

For more information and examples, see [record scopes](/powerapps/maker/canvas-apps/working-with-tables).

---

## Data types

Source: [data-types.md](https://learn.microsoft.com/en-us/power-platform/power-fx/data-types)

*Discover the different data types in Power Fx, how they work, and how to use them effectively in your apps. Learn more and get started today.*

# Data types

Information flows through Power Fx in small, discrete values, like the cells of a spreadsheet. For example, data in a **Birthday** field and an **Anniversary** field both flow through as a **Date** value that includes the year, month, and day. Power Fx formats these values, constrains input to what's appropriate for each, and shares the values with a database. Birthdays and anniversaries might differ to people, but the system handles them in the same way. In this case, **Date** is an example of a [data type](https://en.wikipedia.org/wiki/Data_type).

This article explains each data type in Power Fx, how they work, and how they map to external data sources.


| Data type            | Description                                                                                                                                                                                                                                                                                                                                    | Examples                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Boolean**          | A _true_ or _false_ value. You can use it directly in **If**, **Filter**, and other functions without a comparison.                                                                                                                                                                                                                                 | _true_                                                                                                                        |
| **Choice**           | A choice from a set of options, backed by a number. This data type combines a localizable text label with a numeric value. The label appears in the app, and the numeric value is stored and used for comparisons. The **Type** function supports this data type if you use an instance of a **Choice** field by name.                                                                                                                           | **ThisItem.OrderStatus**                                                                                                      |
| **Color**            | A color specification that includes an alpha channel.                                                                                                                                                                                                                                                                                              | **Color.Red**<br>**ColorValue( "#102030" )**<br>**RGBA( 255, 128, 0, 0.5 )**                                                  |
| **Currency**         | A currency value stored in a floating-point number. Currency values are the same as number values with currency-formatting options. The **Type** function doesn't support the **Currency** data type.                                                                                                                                                                                                      | **123**<br>**4.56**                                                                                                           |
| **Date**             | A date without a time, in the app user's time zone.                                                                                                                                                                                                                                                                                      | **Date( 2019, 5, 16 )**                                                                                                       |
| **DateTime**         | A date with a time, in the app user's time zone.                                                                                                                                                                                                                                                                                         | **DateTimeValue( "May 16, 2019 1:23:09 PM" )**                                                                                |
| **Decimal**         | A number with high precision, base 10 operations, and a limited range.                                                                                                                                                                                                                                                                                         | **123**<br>**Decimal( "1.2345" )**                                                                                |
| **Dynamic** (formerly **UntypedObject**) | The value's type is dynamic and can vary at runtime. A Dynamic value could be any existing type, and can be converted into compatible types using functions such as [Boolean()](reference/function-boolean.md), [Value()](reference/function-value.md), [Table()](reference/function-table.md), etc. For more information, see [Dynamic values](untyped-object.md) and [Working with JSON](working-with-json.md). | **ParseJSON("{ ""Field"" : 1234 }").Field** |
| **Float**          | A number with standard precision, base 2 operations, and a wide range.                                                                                                                                                                                                                                                                                                                        | **123**<br>**8.903e121**<br>**1.234e-200**                                                                                        |
| **GUID**             | A [globally unique identifier](https://wikipedia.org/wiki/Universally_unique_identifier).                                                                                                                                                                                                                                                    | **GUID()**<br>**GUID( "123e4567-e89b-12d3-a456-426655440000" )**                                                              |
| **Hyperlink**        | A text string that contains a hyperlink.                                                                                                                                                                                                                                                                                                           | **"https://powerapps.microsoft.com"**                                                                                         |
| **Image**            | A [universal resource identifier (URI)](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) text string to an image in .jpeg, .png, .svg, .gif, or another common web-image format. The **Type** function doesn't support the **Image** data type.                                                                                                                                                     | **MyImage** added as an app resource<br>**"https://northwindtraders.com/logo.jpg"**<br>**"appres://blobmanager/7b12ffa2..."** |
| **Media**            | A URI text string to a video or audio recording. The **Type** function doesn't support the **Media** data type.                                                                                                                                                                                                                                                                                               | **MyVideo** added as an app resource<br>**"https://northwindtraders.com/intro.mp4"**<br>**"appres://blobmanager/3ba411c..."** |
| **Number** | An alias for **Decimal** (most Power Fx hosts) or **Float** (Canvas apps). If you can use either variety of number for a situation, use **Number** for maximum compatibility.    | **123**<br>**0.0123**<br>**1e4**   |
| **Record**           | A record of data values. This compound data type contains instances of other data types listed in this article. For more information, see [Working with tables](/power-apps/maker/canvas-apps/working-with-tables). The **Type** function supports this data type if you use an instance of a **Record**.                                                                                                                          | **{ Company: "Northwind Traders",<br>Staff: 35, <br>NonProfit: false }**                                                      |
| **Record reference** | A reference to a record in a table. These references are often used with polymorphic lookups. For more information, see [Working with references](/power-apps/maker/canvas-apps/working-with-references). The **Type** function doesn't support this data type.                                                                                                                                               | **First(Accounts).Owner**                                                                                                     |
| **Table**            | A table of records. All records must have the same field names and data types, and omitted fields are treated as _blank_. This compound data type contains instances of other data types listed in this article. For more information, see [Working with tables](/power-apps/maker/canvas-apps/working-with-tables). The **Type** function supports this data type if you use an instance of a **Table**.    | **Table( { FirstName: "Sidney",<br>LastName: "Higa" }, <br>{ FirstName: "Nancy",<br>LastName: "Anderson" } )**                |
| **Text**             | A Unicode text string.                                                                                                                                                                                                                                                                                                                          | **"Hello, World"**                                                                                                            |
| **Time**             | A time without a date, in the app user's time zone.                                                                                                                                                                                                                                                                                      | **Time( 11, 23, 45 )**                                                                                                        |
| **Void** | Used only by behavior user defined functions, it indicates that a function doesn't have a return type. The **Type** function doesn't support this data type. Even though a function doesn't have a return type or value, it can always return an error. | **Hi(): Void = { Notify( "Hello!"  ) }**
| **Yes/No**       | A choice from a set of two options, backed by a boolean value. This data type combines a localizable text label with a boolean value. The label appears in the app, and the boolean value is stored and used for comparisons. The **Type** function supports this data type if you use an instance of a **Yes/No** field by name.                                                                                                                   | **ThisItem.Taxable**                                                                                                          |

Many of these data types are similar and have the same underlying representation, like a **Hyperlink** field being treated as **Text**. The extra data types give better default experiences in forms and other controls.

## Blank

All data types can have a value of _blank_ (no value). The term "null" is often used in databases for this concept.

Use the **Blank** function with the **Set** or **Patch** function to set a variable or field to _blank_. For example, **Set( x, Blank() )** removes the value in the global variable **x**.

Test for a _blank_ value with the [**IsBlank**](reference/function-isblank-isempty.md) function. Replace possible _blank_ values with non-_blank_ values by using the [**Coalesce**](reference/function-isblank-isempty.md) function.

Because all data types support _blank_, the **Boolean** and **Two option** data types have three possible values.

## Text, Hyperlink, Image, and Media

All four of these data types are based on a [Unicode](https://en.wikipedia.org/wiki/Unicode) text string.

### Embedded text

Embedded text strings in a formula are enclosed in double quotation marks. Use two double quotes together to represent a single double quote in the text string. For example, using the following formula in the **OnSelect** property of a [**Button**](/power-apps/maker/canvas-apps/controls/control-button) control:

```power-fx
Notify( "Jane said ""Hello, World!""" )
```

Results in a banner when the button is pressed, where the first and last double quotes are omitted (as they delimit the text string) and the repeated double quotes around **Hello, World!** are replaced with a single double quote:

![pop up notification with the message Jane said "Hello, World."](media/data-types/literal-string.png)

Single quotation marks are used for [identifier names](operators.md#identifier-names) that contain special characters and have no special significance within a text string.

### String interpolation

Use string interpolation to embed formulas within a text string. This approach is often easier to work with and visualize the output than using the [**Concatenate**](reference/function-concatenate.md) function or [**&**](operators.md) operator.

Prefix the text string with a dollar sign **$** and enclose the formula to be embedded with curly braces **{ }**. To include a curly brace in the text string, use repeated curly braces: **{{** or **}}**. String interpolation can be used anywhere a standard text string can be used.

For example, consider this formula with global variables **Apples** set to 3 and **Bananas** set to 4:

```power-fx
$"We have {Apples} apples, {Bananas} bananas, yielding {Apples+Bananas} fruit total."
```

This formula returns the text string **We have 3 apples, 4 bananas, yielding 7 fruit total.** The variables **Apples** and **Bananas** are inserted in the text replacing the curly braces, along with the result of the mathematical formula **Apples+Bananas**. Spaces and other characters around the curly braces are preserved as they are.

Embedded formulas can include any functions or operators. All that is required is that the result of the formula can be coerced to a text string. For example, this formula inserts **NickName** if it's supplied, or the **FirstName** if not, in a greeting:

```power-fx
$"Welcome {Coalesce( NickName, FirstName )}, it's great to meet you!"
```

If **NickName** is set to "Joe", then this formula produces the text string **Welcome Joe, it's great to meet you!**. But if **NickName** is _blank_ and **FirstName** is "Joseph", then this formula produces **Dear Joseph, great to meet you!** instead.

String interpolation can include standard text strings in the embedded formula. For example, if neither **NickName** nor **FirstName** were supplied, we could still provide **"Friend"** as a substitute:

```power-fx
$"Welcome {Coalesce( NickName, FirstName, "Friend" )}!"
```

String interpolations can even be nested. Consider this example where **First**, **Middle**, and **Last** names are combined into a greeting. Even if one or two of these values are _blank_, the correct number of spaces are maintained between the name parts. If none of the parts are provided, the inner string interpolation will collapse to an empty string, and be replaced by the [**Coalesce**](reference/function-isblank-isempty.md) function by "Friend".

```power-fx
$"Welcome {Coalesce( Trim( $"{First} {Middle} {Last}"}), "Friend" )}!"
```

| First   | Middle  | Last    | Result                     |
| ------- | ------- | ------- | -------------------------- |
| John    | Qunicy  | Doe     | `Welcome John Quincy Doe!` |
| John    | _blank_ | Doe     | `Welcome John Doe!`        |
| _blank_ | _blank_ | Doe     | `Welcome Doe!`             |
| _blank_ | _blank_ | _blank_ | `Welcome Friend!`          |

### Newlines

Embedded text strings can contain newlines. For example, consider setting the **Text** property of a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control to the following:

```power-fx
"Line 1
Line 2
Line 3"
```

This formula results in three lines shown in the label control:

:::image type="content" source="media/data-types/text-string-literal-newlines.png" alt-text="Embedded text string and label control showing three lines with Line 1, Line 2, and Line 3.":::

Newlines are also supported with string interpolation:

```power-fx
$"Line {1}
Line {1+1}
Line {1+1+1}"
```

Which results in the same output:

:::image type="content" source="media/data-types/string-interpolation-newlines.png" alt-text="String interpolation formula and label control showing three lines with Line 1, Line 2, and Line 3.":::

### Image and Media resources

Through the **File** menu, you can add image, video, and audio files as app resources. The name of the imported file becomes the resource name in the app. In this graphic, the Northwind Traders logo, which is named **nwindlogo**, has been added to the app:

![Northwind resource.](media/data-types/nwind-resource.png "Northwind resource")

To use this resource in an app, specify it in the **Image** property of an [**Image**](/power-apps/maker/canvas-apps/controls/control-image) control:

![Northwind image.](media/data-types/nwind-image.png "Northwind image")

### URIs for images and other media

You can dig a little deeper into that last example by setting the **Text** property of a [**Label**](/power-apps/maker/canvas-apps/controls/control-text-box) control to **nwindlogo**. The label shows a text string:

![Northwind text.](media/data-types/nwind-text.png "Northwind text")

Canvas apps reference each image or other media file, whether it's in the cloud or added as an app resource, by a URI text string.

For example, the **Image** property of an image control accepts not only app resources but also links to images on the web, such as "https://northwindtraders.com/logo.jpg". The property also accepts inline images that use the [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme), as in this example:

```power-fx
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFAQMAAACtnVQoAAAABlBMVEUAAAB0J3UMNU6VAAAAAXRSTlMAQObYZgAAABRJREFUCNdjUGJgCGVg6GgAkkA2AA8/AffqCEBsAAAAAElFTkSuQmCC"
```

That URI displays a scaled-up version of two purple diamonds:

![Double diamonds.](media/data-types/double-diamonds.png "Double diamonds")

You can show the most recent image captured in a [**Camera**](/power-apps/maker/canvas-apps/controls/control-camera) control if you set the **Image** property of an image control to the **Photo** property of the camera control. The app holds the image in memory, and the **Photo** property of the camera control returns a URI reference to the image. For example, you might take a picture, and the camera's **Photo** property could return **"appres://blobmanager/7b12ffa2ea4547e5b3812cb1c7b0a2a0/1"**.

You use a URI to reference an image or another media file stored in a database. That way, the app doesn't retrieve the actual data until it's needed. For example, an attachment in a Microsoft Dataverse table might return **"appres://datasources/Contacts/table/..."** As in the camera example, you can display this image by setting the **Image** property of an image control to this reference, which retrieves the binary data.

When you save a media data type, such as an image, to a database, the app sends the actual image or media data, not the URI reference.

### Size limits

As text strings and URIs, these data types have no preset limit on their length.

The binary data that these data types reference also has no preset limit on size. For example, an image captured through the camera control that's referenced as **"appres://..."** can be as large and high resolution as the device's camera can muster. The resolution, frame rate, and other attributes of media files aren't limited by the data type, but specific controls for playing and capturing media may have their own limitations.

However, all data sizes are subject to the amount of available memory in the app. Browsers running on a desktop computer typically support more than 100 megabytes of data. However, the amount of available memory on a device such as a phone might be far lower, typically in the range 30-70 megabytes. To determine whether your app runs within these limits, test common scenarios on all devices on which it should run.

As a best practice, hold data in memory only as long as necessary. Upload images to a database as soon as you can; download images only when the app's user requests them.

## Numbers

> [!NOTE]
> Power Apps only supports **Float** today and it's the type of all numbers. **Decimal** support will be added soon.

Power Fx supports two kinds of numbers: **Decimal** and **Float** (with synonyms **Number** and **Currency**).

**Decimal** is best for most business calculations. It can accurately represent numbers in base 10 meaning that `0.1` can be exactly represented and will avoid rounding errors during calculations. It has a large enough range for any business need, up to 10<sup>28</sup> with up to 28 digits of precision. **Decimal** is the default numeric data type for most Power Fx hosts, used if one simply writes `2*2`.

**Float** is best for scientific calculations. It can represent numbers in a larger range, up to 10<sup>308</sup>. Precision is limited to 15 decimal places and math is based on base 2 so it can't represent some common decimal values precisely. **Float** also has higher performance and is favored if that is a factor and precision isn't critical.

### Decimal numbers

The **Decimal** data type most often uses the [.NET decimal data type](xref:System.Decimal). Some hosts, such as Dataverse formula columns that are run in SQL Server, use the SQL Server decimal data type. 

**Decimal** does math the way you learned in school, using base 10 digits, important to avoid rounding errors from very small differences that can accumulate when using base 2 math (as used by **Float**).

The range is from positive 79,228,162,514,264,337,593,543,950,335 to negative 79,228,162,514,264,337,593,543,950,335. The decimal separator can be placed anywhere within these numbers, providing up to 28 digits of precision, and still be precisely represented. For example, 79,228,162,514,264.337593543950335 can be exactly represented, as can 7.9228162514264337593543950335.

### Floating point numbers

The **Float** data type, also known as **Number** or **Currency**, uses the [IEEE 754 double-precision floating-point standard](https://en.wikipedia.org/wiki/IEEE_754). This standard provides a very large range of numbers in which to work, from –1.79769 x 10<sup>308</sup> to 1.79769 x 10<sup>308</sup>. The smallest value that can be represented is 5 x 10<sup>–324</sup>.

**Float** can exactly represent whole numbers (or integers) between –9,007,199,254,740,991 (–(2<sup>53</sup> – 1)) and 9,007,199,254,740,991 (2<sup>53</sup> – 1), inclusive. This range is larger than the 32-bit (or 4-byte) integer data types that databases commonly use. However, canvas apps can't represent 64-bit (or 8-byte) integer data types. You might want to store the number in a text field or use a calculated column to make a copy of the number in a text field, so that it maps into a **Text** data type in the canvas app. In this manner, you can hold, display, and enter these values, and comparing them to determine whether they're equal; however, you can't perform numerical calculations on them in this form.

Floating-point arithmetic is approximate, so it can sometimes give unexpected results with many documented examples. You might expect the formula **55 / 100 \* 100** to return exactly 55 and **(55 / 100 \* 100) - 55** to return exactly zero. However, the latter formula returns 7.1054 x 10<sup>–15</sup>, which is very small but not zero. That tiny difference doesn't normally cause a problem, and the app rounds it away when showing the result. However, small differences can compound in subsequent calculations and appear to give the wrong answer.

Database systems often store currencies and perform calculations by using decimal math, which offers a smaller range but greater control over the precision. By default, canvas apps map currencies in and out of floating-point values; therefore, the result might differ from calculations that are done in a native decimal data type. Depending on the precision needs of your app, you might want to work with these values as **Text**, as described for large integers earlier.

### Defaults and conversions

> [!NOTE]
> Power Apps only supports **Float** today and it's the type of all numbers. **Decimal** support will be added soon.

Most Power Fx hosts use **Decimal** by default. Having this default means:
- Literal numbers in formulas. The number `1.234` is interpreted as a **Decimal** value. For example, the formula `1.234 * 2` interprets the `1.234` and `2` as **Decimal** and return a **Decimal** result.
- Value function. `Value( "1.234" )` returns a **Decimal** value. For example, in the formula `Value( "1.234" ) * 2`, the **Value** function interprets the contents of the text string `"1.234"` as a **Decimal**.

To work with **Float** values, the **Float** function is used. Extending our example, `Float( 1.234 )` converts the **Decimal** `1.234` to **Float**. **Float** can also be used as a replacement for **Value** to convert a string containing a floating point number such as `Float( "1.234" )` to a **Float** value, which is required if the number can't be represented as a **Decimal**.

In summary:

| Usage                            | **Decimal** | **Float** |
|----------------------------------|-------------|-----------|
| Literal numbers in formulas      | `1.234` | `Float( 1.234 )`<br>`Float( "1.234" )` |
| Conversion from text string      | `Value( "1.234" )`<br>`Decimal( "1.234" )` | `Float( "1.234" )` |
| Conversion between numeric types | `Decimal( float )` | `Float( decimal )` |
| Conversion to text string        | `Text( decimal )` | `Text( float )` |
 
### Mixing numeric types

**Float** and **Decimal** values can be freely mixed. When mixed, **Decimal** values are converted to **Float** values due to the larger range. As this conversion can result in a loss of precision, it's important to not mix the two needlessly. Since **Decimal** is the default literal data type and most numeric functions preserve the type, it's relatively easy to avoid moving to **Float** without desiring it.

For example, consider the following calculation using `pac power-fx repl` after installing the [Power Platform CLI](../developer/cli/introduction.md). Since both numbers are **Decimal**, the calculation is done in **Decimal**, and the result retains full precision:

```power-fx
>> 1.0000000000000000000000000001 * 2
2.0000000000000000000000000002
```

If instead, the second operand was changed to **Float** then the entire calculation would be done in **Float**, and the tiny fractional part would be lost:

```power-fx
>> 1.0000000000000000000000000001 * Float(2)
2
```

## Date, Time, and DateTime

### Time zones

Date/time values fall in these categories:

- **User local**: These values are stored in [UTC (Coordinated Universal Time)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), but the app user's time zone affects how the app shows these values and how the app user specifies them. As an example, the same moment appears differently to a user in Canada than it does to a user in Japan.
- **Time zone independent**: The app shows these values the same way and the app user specifies them the same way, regardless of time zone. The same moment appears the same way to a user in Canada as it does to a user in Japan. App authors who don't expect their apps to run in different time zones use these values because they're simpler overall.

This table shows some examples:

| Date/time type            | Value stored in the database                   | Value displayed and entered 7 hours west of UTC  | Value displayed and entered 4 hours east of UTC |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| **User local**            | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM | Saturday,&nbsp;May&nbsp;18,&nbsp;2019<br>9:00 PM | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>8:00 AM  |
| **Time zone independent** | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM   | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM  |

For **User local** date/times, canvas apps use the time zone of the browser or device, but model-driven apps use the user's setting in Dataverse. These settings typically match, but results differ if these settings differ.

Use the [**DateAdd**](reference/function-dateadd-datediff.md) and [**TimeZoneInformation**](reference/function-dateadd-datediff.md) functions to convert local time to UTC and back again. See the examples at the end of the documentation for these functions.

### Numeric equivalents

Canvas apps hold and calculate all date/time values, whether **User local** or **Time zone independent** in UTC. The app translates the values based on the app user's time zone when showing them and when the app user specifies them.

When a canvas app reads a **Time zone independent** value from a data source or writes such a value to a data source, the app automatically adjusts the value to compensate for the time zone of the app's user. The app then treats the value as a UTC value, consistent with all other date/time values in the app. Because of this compensation, the original **Time zone independent** value appears when the app adjusts the UTC value for the app user's time zone.

You can observe this behavior more closely by using the [**Value**](reference/function-value.md) function to access the underlying numerical value for a date/time value. This function returns the date/time value as the number of milliseconds since January 1, 1970 00:00:00.000 UTC.

Because every date/time value is held in UTC, the formula **Value( Date( 1970, 1, 1 ) )** won't return zero in most parts of the world because the **Date** function returns a date in UTC. For example, the formula would return 28,800,000 in a time zone that's offset from UTC by eight hours. That number reflects the number of milliseconds in eight hours.

Returning to our example:

| Date/time type            | Value stored in the database                   | Value displayed and entered 7 hours west of UTC  | **Value** function returns                                                  |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| **User local**            | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM | Saturday,&nbsp;May&nbsp;18,&nbsp;2019<br>9:00 PM | 1,558,238,400,000<br> (Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM UTC)  |
| **Time zone independent** | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM | Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>4:00 AM   | 1,558,263,600,000<br> (Sunday,&nbsp;May&nbsp;19,&nbsp;2019<br>11:00 AM UTC) |

### Converting Unix times

Unix times reflect the number of seconds since January 1, 1970 00:00:00 UTC. Because canvas apps use milliseconds instead of seconds, you can convert between the two by multiplying or dividing by 1,000.

For example, Unix time shows September 9, 2001, at 01:46:40 UTC as 1,000,000,000. To show that date/time value in a canvas app, multiply that number by 1,000 to convert it to milliseconds, and then use it in a [**Text**](reference/function-text.md) function. The formula **Text( 1000000000 \* 1000, DateTimeFormat.UTC )** returns the string **2001-09-09T01:46:40.000Z**.

However, that function returns **Saturday, September 8, 2001 18:46:40** if you use the **DateTimeFormat.LongDateTime24** format in a time zone that's -7 hours offset from UTC (7 hours west of UTC). This result shows the **DateTime** value correctly based on the local time zone.

To convert to a Unix time, divide the result from **Value** by 1,000:
<br>**RoundDown( Value( UnixTime ) / 1000, 0 )**

If you need the Unix time in a **Date** value for further calculations or display within Power Apps, use this formula:
<br>**DateAdd( Date( 1970,1,1 ), UnixTime, Seconds )**

### SQL Server

SQL Server has [**Datetime**, **Datetime2**, and other date/time data types](/sql/t-sql/functions/date-and-time-data-types-and-functions-transact-sql) that don't include a time-zone offset and don't indicate which time zone they're in. Canvas apps assume these values are stored in UTC and treat them as **User local**. If the values are meant to be time-zone independent, correct for the UTC translations by using the [**TimeZoneOffset**](reference/function-dateadd-datediff.md#converting-to-utc) function.

Canvas apps use the included time-zone information in **Datetimeoffset** fields when converting a value to the app's internal UTC representation. The apps always use UTC as the time zone (zero time zone offset) when they write data.

Canvas apps read and write values of the [**Time**](/sql/t-sql/data-types/time-transact-sql) data type in SQL Server as text strings in the [ISO 8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations). For example, you must parse this string format and use the [**Time**](reference/function-date-time.md) function to convert the text string **"PT2H1M39S"** to a **Time** value:

```power-fx
With(
    Match( "PT2H1M39S", "PT(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?" ),
    Time( Value( hours ), Value( minutes ), Value( seconds ) )
)
// Result: 2:01 AM (as shown in a label control, use the Text function to see the seconds)

```

### Mixing date and time information

**Date**, **Time**, and **DateTime** have different names, but they all hold the same information about dates and times.

A **Date** value can include time information with it, which is usually midnight. A **Time** value can carry date information, which is usually January 1, 1970. Dataverse also stores time information with a **Date Only** field but shows only the date information by default. Similarly, canvas apps sometimes distinguish between these data types to determine default formats and controls.

Adding and subtracting date and time values directly isn't recommended because time-zone and other conversions could cause confusing results. Either use the **Value** function to convert date/time values to milliseconds first and take into account the app user's time zone, or use the [**DateAdd**](reference/function-dateadd-datediff.md) and [**DateDiff**](reference/function-dateadd-datediff.md) functions to add or subtract from one of these values.

## Choices and Yes/No

Choices and two-option data types give two or more choices for an app user to select. For example, an **Order Status** choice might offer the choices **New**, **Shipped**, **Invoiced**, and **Closed**. The two-option data type gives only two choices.

Both of these data types show their labels as text. For example, a label control shows one of the order-status options if the control's **Text** property is set to a formula that references that choice. Option labels can be localized for app users in different locations.

When an app user selects an option and saves the change, the app sends the data to the database, which stores it in a way that's independent of language. An option in a choice is sent and stored as a number, and an option in a two-option data type is sent and stored as a boolean value.

The labels are for display only. You can't compare the labels directly because they're specific to a language. Instead, each choice has an enumeration that works with the underlying number or boolean value. For example, you can't use this formula:

`If( ThisItem.OrderStatus = "Active", ...`

But you can use this formula:

`If( ThisItem.OrderStatus = OrderStatus.Active, ...`

For global choices (which tables share), the name of the option-set enumeration matches the name of the global choice. For local choices (which are scoped to a table), the name can include the table name. This behavior avoids conflicts if multiple tables have choices with the same name. For example, the **Accounts** table might have an **OrderStatus** choice, and its name might be **OrderStatus (Accounts)**. That name has spaces and parentheses, so you need to surround it with single quotation marks if you reference it in a formula.

Two-option values also behave as boolean values. For example, a two-option value named **TaxStatus** might have the labels **Taxable** and **Non-Taxable**, which correspond to _true_ and _false_. To show this, use this formula:

`If( ThisItem.Taxable = TaxStatus.Taxable, ...`

You can also use this formula:

`If( ThisItem.Taxable, ...`

---

## Microsoft Power Fx Tables: Records, Columns, and Formulas

Source: [tables.md](https://learn.microsoft.com/en-us/power-platform/power-fx/tables)

*Explore Microsoft Power Fx tables, records, fields, and columns, and learn how to use formulas to shape and manipulate tabular data.*

# Microsoft Power Fx tables

> [!NOTE]
> Microsoft Power Fx is the new name for the canvas apps formula language.  These articles are work in progress as Microsoft extracts the language from canvas apps, integrates it with other Microsoft Power Platform products, and makes it available as open source.  Start with the [Microsoft Power Fx Overview](overview.md) for an introduction to the language.   

Microsoft Power Fx tables organize data into records, fields, and columns from sources such as Microsoft Excel, SharePoint, and SQL Server. Learn these structures to write formulas that access, shape, and manipulate tabular data effectively.

* A record contains one or more categories of information about a person, a place, or a thing. For example, a record might contain the name, the email address, and the phone number of a single customer. Other tools refer to a record as a "row" or an "item."
* A table holds one or more records that contain the same categories of information. For example, a table might contain the names, the email addresses, and the phone numbers of 50 customers.

You can build a variety of formulas that take the name of a table as an argument, just as a formula in Excel takes one or more cell references as arguments. Some formulas in Power Fx return a table that reflects the other arguments that you specify. For example, you might create a formula:

* to update a record in a table by specifying that table as one of multiple arguments for the **[Patch](reference/function-patch.md)** function
* to add, remove, and rename columns in a table by specifying that table as an argument for the **[AddColumns](reference/function-table-shaping.md)**, **[DropColumns](reference/function-table-shaping.md)**, or **[RenameColumns](reference/function-table-shaping.md)** function. None of those functions modifies the original table. Instead, the function returns another table based on the other arguments that you specify.

## Elements of a table

:::image type="content" source="media/tables/elements-of-a-table.png" alt-text="Screenshot of records, fields, and columns that form a table.":::

### Records
Each record contains at least one category of information for a person, a place, or a thing. The example earlier shows a record for each product (**Chocolate**, **Bread**, and **Water**) and a column for each category of information (**Price**, **Quantity on Hand**, and **Quantity on Order**).

In a formula, you can refer to a record by itself, outside of a table's context, by using curly braces. For example, this record **{ Name: "Strawberries", Price: 7.99 }** isn't associated with a table. Note that field names, such as **Name** and **Price** in that example, aren't enclosed in double quotation marks.

### Fields
A field is an individual piece of information in a record. You can visualize this sort of field as a value in a column for a particular record.

Just as with a control, you refer to a field of a record by using the **.** [operator](operators.md) on the record.  For example, **First(Products).Name** returns the **Name** field for the first record in the **Products** table.

A field can contain another record or table, as the example for the **[GroupBy](reference/function-groupby.md)** function shows. You can nest as many levels of records and tables as you want.

### Columns
A column refers to the same field for one or more records in a table. In the preceding example, each product has a price field, and that price is in the same column for all products.  The preceding table has four columns, shown horizontally across the top:

* **Name**
* **Price**
* **Quantity on Hand**
* **Quantity on Order**

The column's name reflects the fields in that column.

All values within a column are of the same data type. In the preceding example, the "Quantity on Hand" column always contains a number and can't contain a string, such as "12 units," for one record.  The value of any field may also be *blank*.  

You might have referred to columns as "fields" in other tools.

### Table
A table comprises one or more records, each with multiple fields that have consistent names across the records.

Any table that's stored in a data source or a collection has a name, which you use to refer to the table and pass it to functions that take tables as arguments.  Tables can also be the result of a function or a formula.

As in the following example, you can express a table in a formula by using the **[Table](reference/function-table.md)** function with a set of records, which you express in curly braces:

`Table( { Value: "Strawberry" }, { Value: "Vanilla" } )`

You can also define a single-column table with square brackets.  An equivalent way to write the above:

`[ "Strawberry", "Vanilla" ]`

## Table formulas
In Excel and Power Fx, you use formulas to manipulate numbers and strings of text in similar ways:

* In Excel, type a value, such as **42**, in cell **A1**, and then type a formula, such as **A1+2**, in another cell to show the value of **44**.
* In Power Apps, set the **[Default](/powerapps/maker/canvas-apps/controls/properties-core)** property of **Slider1** to **42**, and set the **[Text](/powerapps/maker/canvas-apps/controls/properties-core)** property of a label to **Slider1.Value + 2** to show the value of **44**.

In both cases, the calculated value changes automatically if you change the values of the arguments (for example, the number in cell **A1** or the value of **Slider1**).

Similarly, you can use formulas to access and manipulate data in tables and records. You can use names of tables as arguments in some formulas, such as **Min(Catalog, Price)** to show the lowest value in the **Price** column of the **Catalog** table. Other formulas provide whole tables as return values, such as **RenameColumns(Catalog, "Price", "Cost")**, which returns all the records from the **Catalog** table but changes the name of the **Price** column to **Cost**.

Just as with numbers, formulas that involve tables and records are automatically recalculated as the underlying table or record changes. If the cost of a product in the **Catalog** table is lowered below the previous minimum, the return value of the **[Min](reference/function-aggregates.md)** formula will automatically change to match it.

## Table functions and control properties

Consider the **Lower** function. If the variable **welcome** contains the text string **"Hello, World"**, the formula **Lower( welcome )** returns **"hello, world"**.  This function doesn't change the value in that variable. **Lower** is a pure function in that it only processes input and produces output. That's all; it has no side effects. All functions in Excel and most functions in Power Fx are pure functions, which allow the workbook or the app to be recalculated automatically.

Power Fx offers a set of functions that operate on tables in the same manner. These functions take tables as input and filter, sort, transform, reduce, and summarize entire tables of data. In fact, **Lower** and many other functions that typically take a single value can also take a single-column table as input.

Many functions take a single-column table as their input. If an entire table has only one column, you can specify it by name. If a table has multiple columns, you can specify one of those columns by using *Table.Column* syntax. For example, **Products.Name** returns the single-column table of only **Name** values from the **Products** table.

You can completely reshape a table however you want by using the **AddColumns**, **RenameColumns**, **ShowColumns**, or **DropColumns** function. Again, these functions change only their output, not their source.

## Behavioral formulas

Other functions are specifically designed to modify data and have side effects. Because these functions aren't pure, you must build them carefully, and they can't participate in automatically recalculating values in the app. You can use these functions only within behavioral formulas.

## Record scope

Some functions work by evaluating a formula across all the records of a table, one record at a time. The formula's result is used in different ways:

* **AddColumns** - Formula provides the value for the new column.
* **Average**, **Max**, **Min**, **Sum**, **StdevP**, **VarP** - Formula provides the value to aggregate.
* **Filter**, **Lookup** - Formula determines if the record should be included in the output.
* **Concat** - Formula determines the strings to concatenate together.
* **Distinct** - Formula returns a value, used to identify duplicate records.
* **ForAll** - Formula can return any value, potentially with side effects.
* **Sort** - Formula provides the value to sort the records on.
* **With** - Formula can return any value, potentially with side effects.

Inside these formulas, you can reference the fields of the record being processed. Each of these functions creates a "record scope" in which the formula is evaluated, where the fields of the record are available as top-level identifiers. You can also reference control properties and other values from throughout your app.

For example, take a table of **Products** placed in a global variable:

:::image type="content" source="media/tables/requested.png" alt-text="Screenshot of the Products table with requested and available quantities.":::

```power-fx
Set( Products,
    Table(
        { Product: "Widget",    'Quantity Requested': 6,  'Quantity Available': 3 },
        { Product: "Gadget",    'Quantity Requested': 10, 'Quantity Available': 20 },
        { Product: "Gizmo",     'Quantity Requested': 4,  'Quantity Available': 11 },
        { Product: "Apparatus", 'Quantity Requested': 7,  'Quantity Available': 6 }
    )
)
```

To determine whether any of these products have more requested than is available:

`Filter( Products, 'Quantity Requested' > 'Quantity Available' )`

The first argument to **Filter** is the table of records to operate on, and the second argument is a formula.  **Filter** creates a record scope for evaluating this formula in which the fields of each record are available, in this case **Product**, **Quantity Requested**, and **Quantity Available**.  The result of the comparison determines if each record should be included in the result of the function:

:::image type="content" source="media/tables/needed.png" alt-text="Screenshot of a filtered Products table where requested quantity exceeds available quantity.":::

Adding to this example, you can calculate how much of each product to order:

```power-fx
AddColumns( 
    Filter( Products, 'Quantity Requested' > 'Quantity Available' ), 
    "Quantity To Order", 'Quantity Requested' - 'Quantity Available'
)
```

Here you add a calculated column to the result. **AddColumns** has its own record scope that it uses to calculate the difference between what is requested and what is available.

:::image type="content" source="media/tables/toorder.png" alt-text="Screenshot of the Products table after adding the Quantity To Order calculated column.":::

Finally, you can reduce the result table to just the columns that you want:

```power-fx
ShowColumns(
    AddColumns(
        Filter( Products, 'Quantity Requested' > 'Quantity Available' ),
        "Quantity To Order", 'Quantity Requested' - 'Quantity Available'
    ),
    "Product",
    "Quantity To Order"
)
```

:::image type="content" source="media/tables/toorderonly.png" alt-text="Screenshot of the result table with only Product and Quantity To Order columns.":::

Note that in the preceding examples, you use double quotes (") in some places and single quotes (') in other places.  Single quotes are required when referencing the value of an object, such as a field or table, if the name of the object contains a space.  Use double quotes when you're not referencing the value of an object but instead talking about it, especially in situations where the object doesn't yet exist, as in the case of **AddColumns**.

## Disambiguation

Field names that you add with the record scope override the same names from elsewhere in the app. When this override happens, you can still access values from outside the record scope by using the [**@** disambiguation](operators.md) operator:

* To access values from nested record scopes, use the **@** operator with the name of the table you're operating on, following this pattern:<br>_Table_**[@**_FieldName_**]**
* To access global values, such as data sources, collections, and context variables, use the pattern **[@**_ObjectName_**]** (without a table designation).

If the table you're operating on is an expression, such as **Filter(** _Table_**,** ... **)**, you can't use the disambiguation operator. Only the innermost record scope can access fields from this table expression by not using the disambiguation operator.

For example, imagine you have a collection **X**:

:::image type="content" source="media/tables/X.png" alt-text="Screenshot of the X collection containing the values 1 and 2.":::

You can create this collection by using **ClearCollect( X, \[1, 2\] )**.

And another collection **Y**:

:::image type="content" source="media/tables/Y.png" alt-text="Screenshot of the Y collection containing the values A and B.":::

You can create this collection by using **ClearCollect( Y, ["A", "B"] )**.

In addition, define a context variable named **Value** with this formula: **UpdateContext( {Value: "!"} )**

Let's put it all together. In this context, the following formula:

```power-fx
Ungroup(
    ForAll( X,
        ForAll( Y,
            Y[@Value] & Text( X[@Value] ) & [@Value]
        )
    ),
    "Value"
)
```

produces this table:

:::image type="content" source="media/tables/XY.png" alt-text="Screenshot of the nested ForAll result combining X, Y, and global Value entries.":::

What's going on here? The outermost **ForAll** function defines a record scope for **X**, so you can access the **Value** field of each record as it processes. You can access it by simply using the word **Value** or by using **X[@Value]**.

The innermost **ForAll** function defines another record scope for **Y**. Since this table also has a **Value** field defined, using **Value** here refers to the field in **Y**'s record and no longer the one from **X**. To access **X**'s **Value** field, you must use the longer version with the disambiguation operator.

Since **Y** is the innermost record scope, accessing fields of this table doesn't require disambiguation, so you can use this formula with the same result:

```power-fx
Ungroup(
    ForAll( X,
        ForAll( Y,
            Value & Text( X[@Value] ) & [@Value]
        )
    ),
    "Value"
)
```

All the **ForAll** record scopes override the global scope. The **Value** context variable you defined isn't available by name without the disambiguation operator. To access this value, use **[@Value]**.

**Ungroup** flattens the result because nested **ForAll** functions result in a nested result table.

## Single-column tables

To operate on a single column from a table, use the **ShowColumns** function as in this example:

```power-fx
ShowColumns( Products, "Product" )
```

This formula produces this single-column table:

:::image type="content" source="media/tables/single-column.png" alt-text="Screenshot of a single-column table containing Product values.":::

For a shorter alternative, specify *Table.Column*, which extracts the single-column table of just *Column* from *Table*. For example, this formula produces exactly the same result as using **ShowColumns**.

```power-fx
Products.Product
```

## Inline records

You express records by using curly braces that contain named field values.  For example, you can express the first record in the table at the start of this topic by using this formula:

`{ Name: "Chocolate", Price: 3.95, 'Quantity on Hand': 12, 'Quantity on Order': 10 }`

You can also embed formulas within other formulas, as this example shows:

`{ Name: First(Products).Name, Price: First(Products).Price * 1.095 }`

You can nest records by nesting curly braces, as this example shows:

`{ 'Quantity': { 'OnHand': ThisItem.QuantOnHand, 'OnOrder': ThisItem.QuantOnOrder } }`

Enclose each column name that contains a special character, such as a space or a colon, in single quotes.  To use a single quote within a column name, double it.

Note that the value in the **Price** column doesn't include a currency symbol, such as a dollar sign. That formatting is applied when the value is displayed.  

## Inline tables
You can create a table by using the **[Table](reference/function-table.md)** function and a set of records. You can express the table at the start of this topic by using this formula:

```power-fx
Table( 
   { Name: "Chocolate", Price: 3.95, 'Quantity on Hand': 12, 'Quantity on Order': 10 },
   { Name: "Bread", Price: 4.95, 'Quantity on Hand': 34, 'Quantity on Order': 0 },
   { Name: "Water", Price: 4.95, 'Quantity on Hand': 10, 'Quantity on Order': 0 } 
)
```

You can also nest tables:

```power-fx
Table( 
   { Name: "Chocolate", 
     'Quantity History': Table( { Quarter: "Q1", OnHand: 10, OnOrder: 10 },
                                { Quarter: "Q2", OnHand: 18, OnOrder: 0 } ) 
   }
)
```

## Inline value tables
You can create single-column tables by specifying values in square brackets. The resulting table has a single column, named **Value**.

For example, `[ 1, 2, 3, 4 ]` is equivalent to `Table( { Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: 4 } )` and returns this table:

:::image type="content" source="media/tables/inline-table.png" alt-text="Screenshot of an inline Value table containing the numbers 1 through 4.":::

---

## Understand imperative logic in a Microsoft Power Fx | Microsoft Docs

Source: [imperative.md](https://learn.microsoft.com/en-us/power-platform/power-fx/imperative)

*Reference information about working with imperative logic, which can change state in Microsoft Power Fx*

# Imperative logic

> [!NOTE]
> Microsoft Power Fx is the new name for the canvas apps formula language.  These articles are work in progress as we extract the language from canvas apps, integrate it with other Microsoft Power Platform products, and make it available as open source.  Start with the [Microsoft Power Fx Overview](overview.md) for an introduction to the language.

Most formulas in Microsoft Power Fx calculate a value.  Like an Excel spreadsheet, recalculation happens automatically as values change.  For example, you might want to show the value in a **Label** control in red if the value is less than zero or in black otherwise. So you can set the **Color** property of that control to this formula:

```power-fx
If( Value(TextBox1.Text) >= 0, Color.Black, Color.Red )
```

In this context, what does it mean when the user selects a **Button** control?  No value has changed, so there is nothing new to calculate. Excel has no equivalent to a **Button** control.  

By selecting a **Button** control, the user initiates a sequence of actions, or behaviors, that will change the state of the app:

* Change the screen that's displayed: **Back** functions.
* Control a signal (Power Apps only): **Enable** and **Disable** functions.
* Refresh, update, or remove items in a [data source](/powerapps/maker/canvas-apps/working-with-data-sources): **Refresh**, **Update**, **UpdateIf**, **Patch**, **Remove**, **RemoveIf** functions.
* Update a context variable (Power Apps canvas only):  **[UpdateContext](reference/function-updatecontext.md)** function.
* Create, update, or remove items in a [collection](reference/function-clear-collect-clearcollect.md):  **Collect**, **Clear**, **ClearCollect** functions.

Because these functions change the state of the app, they can't be automatically recalculated. You can use them in the formulas for the **OnSelect**, **OnVisible**, **OnHidden**, and other **On...** properties, which are called behavior formulas.

### More than one action
Use semicolons to create a list of actions to perform. For example, you might want to update a context variable and then return to the previous screen:

```power-fx
UpdateContext( { x: 1 } ); Back()
```

Actions are performed in the order in which they appear in the formula.  The next function won't start until the current function has completed. If an error occurs, subsequent functions might not start.

---

## Understand Variables in Microsoft Power Fx | Microsoft Docs

Source: [variables.md](https://learn.microsoft.com/en-us/power-platform/power-fx/variables)

*Learn how to use Power Fx variables, including global variables, context variables, and collections, to manage values and state in your apps.*

# Power Fx variables

> [!NOTE]
> Microsoft Power Fx is the new name for the canvas apps formula language.  These articles are work in progress as Microsoft extracts the language from canvas apps, integrates it with other Microsoft Power Platform products, and makes it available as open source.  Start with the [Microsoft Power Fx Overview](overview.md) for an introduction to the language.   

Learn how Power Fx variables differ from variables in tools such as Visual Basic or JavaScript, and when formulas are a better choice. This article explains how to choose global variables, context variables, or collections to manage app values and state.

In other tools, you might explicitly perform a calculation and store the result in a variable. However, Power Fx and Excel both automatically recalculate formulas as the input data changes, so you usually don't need to create and update variables. By taking this approach whenever possible, you can more easily create, understand, and maintain your app.

In some cases, you need to use variables in Power Fx. Power Fx extends Excel's model by adding [behavior formulas](imperative.md). These formulas run when, for example, a user selects a button. Within a behavior formula, it's often helpful to set a variable to use in other formulas.

In general, avoid using variables. But sometimes only a variable can enable the experience you want. You implicitly create and type variables when they appear in functions that set their values. 

## Translate Excel into Power Fx

### Excel

Let's review how Excel works. A cell can contain a value, such as a number or a string, or a formula that's based on the values of other cells. After the user enters a different value into a cell, Excel automatically recalculates any formulas that depend on the new value. You don't have to do any programming to enable this behavior.

In the following example, cell **A3** is set to the formula **A1+A2**. If **A1** or **A2** changes, **A3** automatically recalculates to reflect the change. This behavior requires no coding outside of the formula itself.

:::image type="content" source="media/variables/excel-formula-recalculation.gif" alt-text="Screenshot of an Excel formula recalculating the sum after an input value changes.":::

Excel doesn't have variables. The value of a cell that contains a formula changes based on its input, but there's no way to remember the result of a formula and store it in a cell or anywhere else. If you change a cell's value, the entire spreadsheet might change, and any previously calculated values are lost. An Excel user can copy and paste cells, but that's under the user's manual control and isn't possible with formulas.

### Power Fx

Logic that you create in Power Fx behaves very much like Excel. Instead of updating cells, you can add controls wherever you want on a screen and name them for use in formulas.

For example in Power Apps, you can replicate the Excel behavior in an app by adding a **[Label](/powerapps/maker/canvas-apps/controls/control-text-input)** control, named **Label1**, and two **[Text input](/powerapps/maker/canvas-apps/controls/control-text-input)** controls, named **TextInput1** and **TextInput2**. If you then set the **[Text](/powerapps/maker/canvas-apps/controls/control-text-input)** property of **Label1** to **TextInput1.Text + TextInput2.Text**, it always shows the sum of whatever numbers are in **TextInput1** and **TextInput2** automatically.

:::image type="content" source="media/variables/power-fx-control-sum.png" alt-text="Screenshot of two text inputs and a label calculating a sum with a Power Fx formula.":::

Notice that the **Label1** control is selected, showing its **[Text](/powerapps/maker/canvas-apps/controls/properties-core)** formula in the formula bar at the top of the screen. Here you find the formula **TextInput1.Text + TextInput2.Text**. This formula creates a dependency between these controls, just as dependencies are created between cells in an Excel workbook.  Let's change the value of **TextInput1**:

:::image type="content" source="media/variables/power-fx-automatic-sum-recalculation.gif" alt-text="Screenshot of a Power Fx formula automatically recalculating a sum when an input changes.":::

The formula for **Label1** is automatically recalculated, showing the new value.

In Power Fx, you can use formulas to determine not only the primary value of a control but also properties such as formatting. In the next example, a formula for the **[Color](/powerapps/maker/canvas-apps/controls/properties-color-border)** property of the label automatically shows negative values in red. The **[If](reference/function-if.md)** function should look familiar from Excel:

`If( Value(Label1.Text) < 0, Color.Red, Color.Black )`

:::image type="content" source="media/variables/power-fx-conditional-color-formatting.gif" alt-text="Screenshot of a Power Fx formula changing a label color when the calculated value is negative.":::

You can use formulas for a wide variety of scenarios:

* By using your device's GPS, a map control can display your current location with a formula that uses **Location.Latitude** and **Location.Longitude**.  As you move, the map automatically tracks your location.
* Other users can update data sources.  For example, others on your team might update items in a SharePoint list.  When you refresh a data source, any dependent formulas automatically recalculate to reflect the updated data. Furthering the example, you might set a gallery's **[Items](/powerapps/maker/canvas-apps/controls/properties-core)** property to the formula **Filter( SharePointList )**, which automatically displays the newly filtered set of [records](tables.md#records).

### Benefits of Power Fx formulas

Using formulas to build apps offers many advantages:

* If you know Excel, you know Power Fx. The model and formula language are the same.
* If you use other programming tools, consider how much code you'd need to accomplish these examples. In Visual Basic, you'd need to write an event handler for the change event on each text-input control. The code to perform the calculation in each of these event handlers is redundant and could get out of sync, or you'd need to write a common subroutine. In Power Fx, you accomplish all of that work with a single, one-line formula.
* To understand where **Label1**'s text comes from, you know exactly where to look: the formula in the **[Text](/powerapps/maker/canvas-apps/controls/properties-core)** property. There's no other way to affect the text of this control. In a traditional programming tool, any event handler or subroutine could change the value of the label, from anywhere in the program. This approach can make it hard to track down when and where a variable was changed.
* If the user changes a slider control and then changes their mind, they can change the slider back to its original value. It's as if nothing ever changed: the app shows the same control values as it did before. There are no ramifications for experimenting and asking "what if," just as there are none in Excel.  

In general, if you can achieve an effect by using a formula, you're better off. Let the formula engine in Power Fx do the work for you.  

## Know when to use variables

Let's change our simple adder to act like an old-fashioned adding machine, with a running total. If you select an **Add** button, you add a number to the running total. If you select a **Clear** button, you reset the running total to zero.

| Display | Description |
|----|----|
|  :::image type="content" source="media/variables/adding-machine-initial-state.png" alt-text="Screenshot of an adding machine app with a zero total and 77 entered in the text input."::: | When the app starts, the running total is 0.<br><br>The red dot represents the user's finger in the text-input box, where the user enters **77**. |
| :::image type="content" source="media/variables/adding-machine-select-add.png" alt-text="Screenshot of the adding machine with 77 in the text input as the user selects Add."::: | The user selects the **Add** button. |
| :::image type="content" source="media/variables/adding-machine-second-addition.png" alt-text="Screenshot of the adding machine showing a total of 77 before another 77 is added."::: | 77 is added to the running total.<br><br>The user selects the **Add** button again. |
| :::image type="content" source="media/variables/adding-machine-total-before-clear.png" alt-text="Screenshot of the adding machine showing a running total of 154 before the user selects Clear."::: | 77 is again added to the running total, resulting in 154.<br><br>The user selects the **Clear** button. |
| :::image type="content" source="media/variables/adding-machine-cleared-total.png" alt-text="Screenshot of the adding machine after the running total has been reset to zero."::: | The running total is reset to 0. |

Our adding machine uses something that doesn't exist in Excel: a button. In this app, you can't use only formulas to calculate the running total because its value depends on a series of actions that the user takes. Instead, you must record and update the running total manually. Most programming tools store this information in a *variable*.

You'll sometimes need a variable for your app to behave the way you want.  But the approach comes with caveats:

* You must manually update the running total. Automatic recalculation won't do it for you.
* You can't calculate the running total based on the values of other controls. It depends on how many times the user selected the **Add** button and what value was in the text-input control each time. Did the user enter 77 and select **Add** twice, or did they specify 24 and 130 for each of the additions? You can't tell the difference after the total reaches 154.
* Changes to the total can come from different paths. In this example, both the **Add** and **Clear** buttons can update the total. If the app doesn't behave the way you expect, which button is causing the problem?

## Use a global variable

To create your adding machine, you need a variable to hold the running total. The simplest variables to work with in Power Fx are *global variables*.  

How global variables work:

* Use the **[Set](reference/function-set.md)** function to set the value of the global variable.  **Set( MyVar, 1 )** sets the global variable **MyVar** to a value of **1**.
* Use the global variable by referencing the name you used with the **Set** function.  In this case, **MyVar** returns **1**.
* Global variables can hold any value, including strings, numbers, records, and [tables](tables.md).

Let's rebuild our adding machine by using a global variable:

1. Add a text-input control, named **TextInput1**, and two buttons, named **Button1** and **Button2**.

1. Set the **Text** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to  **"Clear"**.

1. To update the running total whenever a user selects the **Add** button, set its **OnSelect** property to this formula:

    **Set( RunningTotal, RunningTotal + TextInput1.Text )**

    The mere existence of this formula establishes **RunningTotal** as a global variable that holds a number because of the **+** operator. You can reference **RunningTotal** anywhere in the app. Whenever the user opens this app, **RunningTotal** has an initial value of *blank*.

    The first time that a user selects the **Add** button and **[Set](reference/function-set.md)** runs, **RunningTotal** is set to the value **RunningTotal + TextInput1**.

    :::image type="content" source="media/variables/power-fx-global-variable-add-formula.png" alt-text="Screenshot of the Add button OnSelect property using Set to update a Power Fx global variable.":::

1. To set the running total to **0** whenever the user selects the **Clear** button, set its **OnSelect** property to this formula:

    **Set( RunningTotal, 0 )**

    :::image type="content" source="media/variables/power-fx-global-variable-clear-formula.png" alt-text="Screenshot of the Clear button OnSelect property using Set to reset a Power Fx global variable.":::

1. Add a **Label** control, and set its **Text** property to **RunningTotal**.

    This formula automatically recalculates and shows the user the value of **RunningTotal** as it changes based on the buttons that the user selects.

    :::image type="content" source="media/variables/power-fx-global-variable-label.png" alt-text="Screenshot of a label Text property displaying the value of the RunningTotal global variable.":::

1. Preview the app, and you have your adding machine as described earlier. Enter a number in the text box and press the **Add** button a few times. When ready, return to the authoring experience by using the <kbd>Esc</kbd> key.

    :::image type="content" source="media/variables/global-variable-running-total-preview.png" alt-text="Screenshot of the adding machine preview with an input value and the calculated running total.":::

1. To show the global variable's value, select the **File** menu, and select **Variables** in the left-hand pane.

    :::image type="content" source="media/variables/global-variables-file-menu.png" alt-text="Screenshot of the global Variables option selected from the File menu in the app editor.":::

1. To show all the places where the variable is defined and used, select it.

    :::image type="content" source="media/variables/global-variable-definitions-and-uses.png" alt-text="Screenshot of the locations where a global variable is defined and used in the app.":::

## Types of variables

Power Fx has two types of variables:

| Variable type | Scope | Description | Functions that establish |
| --- | --- | --- | --- |
| Global variables |App |Simplest to use. Holds a number, text string, Boolean, record, table, and more. You can reference it from anywhere in the app. |[**Set**](reference/function-set.md) |
| Collections |App |Holds a table that you can reference from anywhere in the app. You can modify the contents of the table rather than setting it as a whole. You can save it to the local device for later use. |[**Collect**](reference/function-clear-collect-clearcollect.md)<br>[**ClearCollect**](reference/function-clear-collect-clearcollect.md) |

When you use Power Apps, you see a third type of variable:

| Variable type | Scope | Description | Functions that establish |
| --- | --- | --- | --- |
| Context variables |Screen |Great for passing values to a screen, much like parameters to a procedure in other languages. You can reference it from only one screen. |[**UpdateContext**](reference/function-updatecontext.md)<br>[**Navigate**](reference/function-navigate.md) |

## Create and remove variables

You create all variables implicitly when they appear in a **Set**, **UpdateContext**, **Navigate**, **Collect**, or **ClearCollect** function. To declare a variable and its type, just include it in any of these functions anywhere in your app. None of these functions create variables; they only fill variables with values. You never declare variables explicitly as you might in another programming tool, and all typing is implicit from usage.

For example, you might have a button control with an **OnSelect** formula equal to **Set( X, 1 )**. This formula establishes **X** as a variable with a type of number. You can use **X** in formulas as a number, and that variable has a value of *blank* after you open the app but before you select the button. When you select the button, you give **X** the value of **1**.

If you add another button and set its **OnSelect** property to **Set( X, "Hello" )**, an error occurs because the type (text string) doesn't match the type in the previous **Set** (number). All implicit definitions of the variable must agree on type. Again, all this happened because you mentioned **X** in formulas, not because any of those formulas actually ran.

You remove a variable by removing all the **Set**, **UpdateContext**, **Navigate**, **Collect**, or **ClearCollect** functions that implicitly establish the variable. Without these functions, the variable doesn't exist. You must also remove any references to the variable because they cause an error.

## Variable lifetime and initial value

The app holds all variables in memory while it runs. After the app closes, the values that the variables held are lost.

You can store the contents of a variable in a data source by using the **Patch** or **Collect** functions. You can also store values in collections on the local device by using the [**SaveData**](reference/function-savedata-loaddata.md) function.

When the user opens the app, all variables have an initial value of *blank*.

## Read variables

Use the variable's name to read its value. For example, you can define a variable with this formula:

`Set( Radius, 12 )`

Then you can simply use **Radius** anywhere that you can use a number, and it replaces with **12**:

`Pi() * Power( Radius, 2 )`

If you give a context variable the same name as a global variable or a collection, the context variable takes precedence. However, you can still reference the global variable or collection if you use the [disambiguation operator](reference/operators.md) **[@Radius]**.

## Use a context variable (Power Apps only)

Here's how to create the adding machine using a context variable instead of a global variable.

How context variables work:

* You implicitly establish and set context variables by using the **UpdateContext** or **Navigate** function. When the app starts, the initial value of all context variables is *blank*.
* You update context variables with records. In other programming tools, you commonly use "=" for assignment, as in "x = 1". For context variables, use **{ x: 1 }** instead. When you use a context variable, use its name directly without the record syntax.
* You can also set a context variable when you use the **Navigate** function to show a screen. If you think of a screen as a kind of procedure or subroutine, this approach resembles parameter passing in other programming tools.
* Except for **Navigate**, context variables are limited to the context of a single screen, which is where they get their name. You can't use or set them outside of this context.
* Context variables can hold any value, including strings, numbers, records, and [tables](tables.md).

Let's rebuild our adding machine by using a context variable:

1. Add a text-input control, named **TextInput1**, and two buttons, named **Button1** and **Button2**.

1. Set the **Text** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to  **"Clear"**.

1. To update the running total whenever a user selects the **Add** button, set its **OnSelect** property to this formula:

    **UpdateContext( { RunningTotal: RunningTotal + TextInput1.Text } )**

    The mere existence of this formula establishes **RunningTotal** as a context variable that holds a number because of the **+** operator. You can reference **RunningTotal** anywhere in this screen. Whenever the user opens this app, **RunningTotal** has an initial value of *blank*.

    The first time that the user selects the **Add** button and **[UpdateContext](reference/function-updatecontext.md)** runs, **RunningTotal** is set to the value **RunningTotal + TextInput1**.

    :::image type="content" source="media/variables/context-variable-add-formula.png" alt-text="Screenshot of the Add button OnSelect property updating the RunningTotal context variable.":::

1. To set the running total to **0** whenever the user selects the **Clear** button, set its **OnSelect** property to this formula:

    **UpdateContext( { RunningTotal: 0 } )**

    Again, **[UpdateContext](reference/function-updatecontext.md)** is used with the formula **UpdateContext( { RunningTotal: 0 } )**.

    :::image type="content" source="media/variables/context-variable-clear-formula.png" alt-text="Screenshot of the Clear button OnSelect property resetting the RunningTotal context variable.":::

1. Add a **Label** control, and set its **Text** property to **RunningTotal**.

    This formula automatically recalculates and shows the user the value of **RunningTotal** as it changes based on the buttons that the user selects.

    :::image type="content" source="media/variables/context-variable-label-text.png" alt-text="Screenshot of a label Text property displaying the RunningTotal context variable value.":::

1. Preview the app and you have your adding machine as described earlier. Enter a number in the text box and press the **Add** button a few times. When ready, return to the authoring experience by using the <kbd>Esc</kbd> key.

    :::image type="content" source="media/variables/context-variable-running-total-preview.png" alt-text="Screenshot of the app preview with a text input value and a context-variable running total.":::

1. You can set the value of a context variable while navigating to a screen. This technique is useful for passing "context" or "parameters" from one screen to another. To demonstrate this technique, insert a screen, insert a button, and set its **OnSelect** property to this formula:

    **Navigate( Screen1, None, { RunningTotal: -1000 } )**

    :::image type="content" source="media/variables/navigate-context-variable-formula.png" alt-text="Screenshot of a button OnSelect property using Navigate to pass a context variable to Screen1.":::

    Hold down the <kbd>Alt</kbd> key while you select this button to both show **Screen1** and set the context variable **RunningTotal** to -1000.

    :::image type="content" source="media/variables/screen1-context-variable-result.png" alt-text="Screenshot of Screen1 after navigation sets the RunningTotal context variable to negative 1000.":::

1. To show the value of the context variable, select the **File** menu, and then select **Variables** in the left-hand pane.

    :::image type="content" source="media/variables/context-variables-file-menu.png" alt-text="Screenshot of the context Variables option selected from the File menu in the app editor.":::

9. Select the context variable to see where it's defined and used.

    :::image type="content" source="media/variables/context-variable-definitions-and-uses.png" alt-text="Screenshot of the locations where a context variable is defined and used in the app.":::

## Use a collection

Finally, let's look at creating our adding machine with a collection. Since a collection holds a table that you can easily modify, this adding machine keeps a "paper tape" of each value as you enter them.

How collections work:

* Use the **ClearCollect** function to create and set collections. You can use the **Collect** function instead, but it effectively requires another variable instead of replacing the old one.  
* A collection is a kind of data source and, therefore, a table. To access a single value in a collection, use the **First** function, and extract one field from the resulting record. If you use a single value with **ClearCollect**, this value is the **Value** field, as in this example:<br>
**First(** *VariableName* **).Value**

Let's recreate our adding machine by using a collection:

1. Add a **Text input** control, named **TextInput1**, and two buttons, named **Button1** and **Button2**.

1. Set the **Text** property of **Button1** to **"Add"**, and set the **Text** property of **Button2** to **"Clear"**.

1. To update the running total whenever a user selects the **Add** button, set its **OnSelect** property to this formula:

    **Collect( PaperTape, TextInput1.Text )**

    The mere existence of this formula establishes **PaperTape** as a collection that holds a single-column table of text strings. You can reference **PaperTape** anywhere in this app. Whenever a user opens this app, **PaperTape** is an empty table.

    When this formula runs, it adds the new value to the end of the collection. Because you're adding a single value, **Collect** automatically places it in a single-column table, and the column's name is **Value**, which you use later.

    :::image type="content" source="media/variables/collection-add-button-formula.png" alt-text="Screenshot of the Add button OnSelect property collecting an input value in PaperTape.":::

1. To clear the paper tape when the user selects the **Clear** button, set its **[OnSelect](/powerapps/maker/canvas-apps/controls/properties-core)** property to this formula:

    **Clear( PaperTape )**

    :::image type="content" source="media/variables/collection-clear-button-formula.png" alt-text="Screenshot of the Clear button OnSelect property clearing all values from PaperTape.":::

1. To display the running total, add a label, and set its **[Text](/powerapps/maker/canvas-apps/controls/properties-core)** property to this formula:

    **Sum( PaperTape, Value )**

    :::image type="content" source="media/variables/collection-running-total-formula.png" alt-text="Screenshot of a label Text property using Sum to calculate the PaperTape running total.":::

1. To run the adding machine, press F5 to open Preview, enter numbers in the text-input control, and select buttons.

    :::image type="content" source="media/variables/collection-adding-machine-preview.png" alt-text="Screenshot of the collection-based adding machine with an input value and running total.":::

1. To return to the default workspace, press the <kbd>Esc</kbd> key.

1. To display the paper tape, insert a **Data table** control, and set its **[Items](/powerapps/maker/canvas-apps/controls/properties-core)** property to this formula:

    **PaperTape**

    In the right-hand pane, select **Edit fields** and then select **Add field**, select **Value** column and then select **Add** to show it.

    :::image type="content" source="media/variables/collection-paper-tape-data-table.png" alt-text="Screenshot of a data table displaying the values added to the PaperTape collection.":::

1. To see the values in your collection, select **Collections** on the **File** menu.

    :::image type="content" source="media/variables/paper-tape-collection-preview.png" alt-text="Screenshot of the Collections view displaying the stored values in the PaperTape collection.":::

1. To store and retrieve your collection, add two additional button controls, and set their **Text** properties to **Load** and **Save**. Set the **OnSelect** property of the **Load** button to this formula:

     **Clear( PaperTape ); LoadData( PaperTape, "StoredPaperTape", true )**

     You need to clear the collection first because **LoadData** will append the stored values to the end of the collection.

     :::image type="content" source="media/variables/collection-load-button-formula.png" alt-text="Screenshot of the Load button OnSelect property clearing and loading the PaperTape collection.":::

11. Set the **OnSelect** property of the **Save** button to this formula:

     **SaveData( PaperTape, "StoredPaperTape" )**

     :::image type="content" source="media/variables/collection-save-button-formula.png" alt-text="Screenshot of the Save button OnSelect property saving the PaperTape collection locally.":::

12. Preview again by pressing the <kbd>F5</kbd> key, enter numbers in the text-input control, and select buttons. Select the **Save** button. Close and reload the app, and select the **Load** button to reload your collection.

---

## Understand errors in Power Fx

Source: [error-handling.md](https://learn.microsoft.com/en-us/power-platform/power-fx/error-handling)

*Reference information about working with errors in Power Fx.*

# Error handling

The behavior described in this article is available only when the **Formula-level error management** feature is turned on.

Power Fx supports formula-level error handling. This feature is turned on by default for all new apps. However, some older apps might have it turned off in app **Settings**. Keep this feature turned on.

1. Open the canvas app in edit mode.
1. Go to **Settings** > **Updates** > **Retired** tab.
1. Make sure **Disable formula-level management** is turned off.

For more information, see [Controlling which features are enabled](/power-apps/maker/canvas-apps/working-with-experimental-preview#controlling-which-features-are-enabled).

Errors happen. Networks go down, storage fills up, unexpected values flow in. It's important that your logic continues to work properly in the face of potential issues.

By default, errors flow through the formulas of an app and are reported to the end user of the app. In this way, the end user knows something unexpected happened. They can potentially fix the problem themselves with a different input, or they can report the problem to the owner of the app.

As an app maker, take control of errors in your app:
- **Detect and handle an error.**  If there's a chance an error might occur, write the app's formulas to detect the error condition and retry the operation. The end user doesn't need to be concerned that an error occurred because the maker took the possibility into account. Capture the error by using the [**IfError**, **IsError**, and **IsErrorOrBlank**](reference/function-iferror.md) functions within a formula.
- **Report an error.**  If an error isn't handled in the formula where you encountered it, the error bubbles up to the **App.OnError** handler. You can't replace the error because it already occurred and is a part of formula calculations. But you can use **App.OnError** to control how the error is reported to the end user, including suppressing the error reporting all together. **App.OnError** also provides a common choke point for error reporting across the entire app.
- **Create and rethrow an error.**  Finally, you might detect an error condition with your own logic, a condition that's specific to your app. Use the [**Error**](reference/function-iferror.md) function to create custom errors. Use the **Error** function to rethrow an error after being interrogated in **IfError** or **App.OnError**.

## Getting started

Let's start with a simple example.

1. Create a new screen in a Power Apps Canvas app.
1. Insert a **TextInput** control. It defaults to the name **TextInput1**.
1. Insert a **Label** control.
1. Set the **Text** property of the **Label** control to the formula

```power-fx
1/Value( TextInput1.Text )
```
:::image type="content" source="media/error-handling/intro-error-default.png" alt-text="Screenshot of error banner displayed with 'the value cannot be converted to a number' for the text input control containing 'Text input'.":::

You see an error because the default text of a **TextInput** control is `"Text input"`, which can't be converted to a number. By default this is a good thing: the end user gets a notification that something isn't working as expected in the app.

Obviously, you don't want an error to greet the user each time they start this app. Likely `"Text input"` isn't the right default for the text input box anyway. To fix this problem, change the **Default** property of the **TextInput** control to:

```power-fx
Blank()
```
:::image type="content" source="media/error-handling/intro-error-blank.png" alt-text="Screenshot of error banner displayed with 'division by zero'.":::

Hmm, now you see a different error. Mathematical operations with *blank*, such as division, coerce the blank value to a zero. That value causes a division by zero error. To fix this problem, you need to decide what the appropriate behavior is for this situation in this app. The answer might be to show *blank* when the text input is *blank*. You can accomplish this goal by wrapping your formula with the **IfError** function:

```power-fx
IfError( 1/Value( TextInput1.Text ), Blank() )
```
:::image type="content" source="media/error-handling/intro-error-iferror-all.png" alt-text="Screenshot showing no error banner displayed, an error due to a blank value has been replaced with a blank.":::

Now the error is replaced with a valid value and the error banner goes away. But, you might have overshot, the **IfError** you used covers *all* errors, including typing in a bad value such as `"hello"`. You can address this problem by tuning your **IfError** to handle the division by zero case only and rethrow all other errors:

```power-fx
IfError( 1/Value( TextInput1.Text ), 
         If( FirstError.Kind = ErrorKind.Div0, Blank(), Error( FirstError ) ) )
```
:::image type="content" source="media/error-handling/intro-error-iferror-div0.png" alt-text="Screenshot showing no error banner displayed, an error due specifically to division by zero has been replaced by a blank, otherwise the error is re-thrown.":::

So, run your app and try some different values.

Without any value, as when the app starts, there's no answer displayed as the default value is *blank*, but there also no error shown as the **IfError** replaces the division by zero error.

:::image type="content" source="media/error-handling/intro-enter-blank.png" alt-text="Screenshot showing no answer displayed and no error banner.":::

If you type in a 4, you get the expected result of 0.25:

:::image type="content" source="media/error-handling/intro-enter-4.png" alt-text="Screenshot showing 0.25 displayed and no error banner.":::

And if you type in something illegal, like `hello`, then you receive an error banner:

:::image type="content" source="media/error-handling/intro-enter-hello.png" alt-text="Screenshot showing no value displayed and error banner shown for the inability to convert 'hello' to a number.":::

This is a simple introductory example. You can handle errors in many different ways, depending on the needs of the app:

1. Instead of an error banner, you could show **"#Error"** in the label control with the formula. To keep the types of the replacements compatible with the first argument to **IfError**, you need to explicitly convert the numerical result to a text string by using the **Text** function.
    ```power-fx
    IfError( Text( 1/Value( TextInput1.Text ) ), 
             If( FirstError.Kind = ErrorKind.Div0, Blank(), "#Error" )
    ```
    :::image type="content" source="media/error-handling/intro-error-inlinestring.png" alt-text="Screenshot showing no error banner and instead #Error is shown as the result.":::
1. Instead of wrapping this specific instance with **IfError**, you could write a centralized **App.OnError** handler. You can't replace the string shown with "#Error" as the error already happened and **App.OnError** is only provided to control reporting.
    ```power-fx
    If( FirstError.Kind <> ErrorKind.Div0, Error( FirstError ) )
    ```

## Error propagation

Errors flow through formulas much as they do in Excel. For example, in Excel, if cell `A1` has the formula `=1/0`, then A1 displays the error value `#DIV0!`:

:::image type="content" source="media/error-handling/excel-div0-1.png" alt-text="Screenshot of Excel spreadsheet with A1=1/0 and #DIV/0! shown in the cell.":::

If cell `A2` refers to `A1` with a formula such as `=A1*2`, the error propagates through that formula too:

:::image type="content" source="media/error-handling/excel-div0-2.png" alt-text="Screenshot of Excel spreadsheet with A2=A1*2 and #DIV/0! shown in the cell.":::

The error replaces the value that the formula would otherwise calculate. There's no result for the multiplication in cell `A2`, only the error from the division in `A1`.

Power Fx works the same way. In general, if you provide an error as an argument to a function or operator, the operation doesn't take place. The input error flows through as the result of the operation. For example, `Mid( Text( 1/0 ), 1, 1 )` returns a Division by Zero error, as the inner most error passes through the [**Text**](reference/function-text.md) function and [**Mid**](reference/function-left-mid-right.md) function:

:::image type="content" source="media/error-handling/pa-formula-div0.png" alt-text="Screenshot of error banner showing invalid operation: division by zero.":::

In general, errors don't flow through Power Apps control properties. Let's extend the previous example with another control that displays if the first label's `Text` property is an error state:

:::image type="content" source="media/error-handling/pa-formula-div0-control.png" alt-text="Screenshot showing no error shown on second label control.":::

It's fine that errors don't propagate through a control because the system observes errors on the input to all control properties. The error isn't lost.

Most functions and operators follow the "error in, error out" rule, but there are some exceptions. The functions **IsError**, **IsErrorOrBlank**, and **IfError** are designed for working with errors, so they might not return an error even if one is passed into them.

## Observing errors

Power Fx doesn't observe errors until the formula uses the error value.

As a result, the **If** and **Select** functions might not return an error if one is passed in. Consider the formula `If( false, 1/0, 3 )`. There's a division by zero error present in this formula, but since the `If` function isn't taking that branch because of the `false` condition, Power Fx and Power Apps don't report an error:

:::image type="content" source="media/error-handling/pa-not-observed.png" alt-text="Screenshot showing no error banner shown with If function in label Text property.":::

Using the **Set** function with an error doesn't report an error at the point the error is placed into the variable. For example in Power Apps, here's a formula in **App.OnStart** that places a division by zero error into the variable `x`:

:::image type="content" source="media/error-handling/pa-set-not-observed-1.png" alt-text="Screenshot showing no error banner shown with Set function call in App.OnStart.":::

No error is reported, because `x` isn't being referenced. However, the moment you add a label control and set its **Text** property to `x`, the error is displayed:

:::image type="content" source="media/error-handling/pa-set-not-observed-2.png" alt-text="Screenshot showing error banner shown with label control referencing the variable x.":::

You can observe errors within a formula by using the **IfError**, **IsError**, and **IsErrorOrBlank** functions. By using these functions, you can return an alternate value, take alternate action, or modify the error before it's observed and reported.

## Reporting errors

After Power Fx observes an error, the next step is to report the error to the end user.

Unlike Excel, there's not always a convenient place to show an error result, as the result of a formula might drive a property such as X and Y coordinates of a control for which there's no convenient place to show some text. Each Power Fx host controls how errors are ultimately displayed to the end user and how much control the maker has over this process. In Power Apps, an error banner is shown and **App.OnError** is used to control how the error is reported.

It's important to note that **App.OnError** can't replace the error in the same way that **IfError** can. At the point that **App.OnError** is executed, the error already happened, and the result is propagated through other formulas. **App.OnError** only controls how the error is reported to the end user and provides a hook for the maker to log the error if desired.

The scope variables **FirstError** and **AllErrors** provide context information about the error or errors. This context provides information on the kind of error, where the error originated, and where it was observed.

## Stopping after an error

Behavior formulas support taking action, modifying databases, and changing state. These formulas allow more than one action to be done in a sequence by using the `;` chaining operator (or `;;` depending on the locale).

In this case, for example, the grid control shows what is in the `T` table. Each button select changes the state in this table with two **Patch** calls:

:::image type="content" source="media/error-handling/pa-behavior-no-error.gif" alt-text="Screenshot of animation showing the two records in table T being updated with random numbers after each button click.":::

In a chained behavior formula, actions don't stop after the first error. Let's modify our example to pass an invalid index number in the first **Patch** call. The second **Patch** continues on despite this earlier error. The first error is reported to the end user, and shown as an error in Studio on the control:

:::image type="content" source="media/error-handling/pa-behavior-first-error.gif" alt-text="Screenshot of animation showing only the second record in table T being updated with random numbers after each button click, the first record resulting in an error.":::

Use **IfError** to stop execution after an error. Similar to the **If** function, the third argument to this function provides a place to put actions that should be executed only if there's no error:

:::image type="content" source="media/error-handling/pa-behavior-stop-error.gif" alt-text="Screenshot of animation showing no changes to either record in table T, because the IfError is preventing the second operation from completing after an error.":::

If an error is encountered during one of the iterations of **ForAll**, the rest of the iterations don't stop. **ForAll** is designed to execute each iteration independently, allowing for parallel execution. When the **ForAll** is complete, an error is returned, which contains all the errors encountered (by examining **AllErrors** in **IfError** or **App.OnError**).

For example, the following formula results in **ForAll** returning two errors (for the division by zero for `Value` of 0, twice) and `Collection` has three records (for when `Value` isn't 0): `[1, 2, 3]`.

```power-fx
Clear( Collection ); 
ForAll( [1,0,2,0,3], If( 1/Value > 0, Collect( Collection, Value ) ) );
```

## Working with multiple errors

Since a behavior formula can execute more than one action, it can also encounter more than one error.

By default, the app reports the first error to the end user. In this example, both **Patch** calls fail, but the second call fails with a division by zero error. The user sees only the first error about index:

:::image type="content" source="media/error-handling/pa-behavior-two-errors.png" alt-text="Screenshot of first index error displayed in an error banner, the second error is not reported.":::

The **IfError** function and **App.OnError** can access all the errors encountered by using the **AllErrors** scope variable. In this case, you can set this variable to a global variable and look at both errors encountered. They appear in the table in the same order in which they were encountered:

:::image type="content" source="media/error-handling/pa-behavior-allerrors.png" alt-text="Screenshot of capture of the errors into the global variable PatchErrors where we can see that both errors present.":::

Nonbehavior formulas can also return multiple errors. For example, using the **Patch** function with a batch of records to update can return multiple errors, one for each record that fails.

## Errors in tables

As you saw earlier, you can store errors in variables. You can also include errors in data structures, such as tables. This approach is important because it ensures that an error on any one record can't invalidate the entire table.

For example, consider this data table control in Power Apps:

:::image type="content" source="media/error-handling/pa-error-in-table-1.png" alt-text="Screenshot of data table showing an error for the field Reciprocal for an input of 0, which results in a division by zero error.":::

The calculation in **AddColumns** encountered a division by zero error for one of the values. For that one record, the **Reciprocal** column has an error value (division by zero) but the other records don't and are fine. `IsError( Index( output, 2 ) )` returns false and `IsError( Index( output, 2 ).Value )` returns true.

If an error occurs when filtering a table, the entire record is an error. The operation still returns the record in the result so that the end user knows something was there and there's a problem.

Take this example. Here, the original table has no errors, but the act of filtering creates an error whenever **Value** is equal to 0:

:::image type="content" source="media/error-handling/pa-table-filter.png" alt-text="Screenshot of data table showing errors for two records that could not be processed by the Filter criteria.":::

The values -5 and -3 are properly filtered out. The values 0 result in an error in processing the filter, and so it's unclear if the record should be included or not in the result. To maximize transparency for end users and help makers debug, the operation includes an error record in place of the original. In this case, `IsError( Index( output, 2 ) )` returns true.

## Data source errors

The functions that modify data in data sources, such as **[Patch](reference/function-patch.md)**, **[Collect](reference/function-clear-collect-clearcollect.md)**, **[Remove](reference/function-remove-removeif.md)**, **[RemoveIf](reference/function-remove-removeif.md)**, **[Update](reference/function-update-updateif.md)**, **[UpdateIf](reference/function-update-updateif.md)**, and **[SubmitForm](reference/function-form.md)** report errors in two ways:
- Each of these functions returns an error value as the result of the operation. You can detect errors by using **IsError** and replace or suppress errors by using **IfError** and **App.OnError** as usual.
- After the operation, the **Errors** function also returns the errors for previous operations. This behavior can be useful for displaying the error message on a form screen without needing to capture the error in a state variable.

For example, this formula checks for an error from **Collect** and displays a custom error message:
```power-fx
IfError( Collect( Names, { Name: "duplicate" } ),
         Notify( $"OOPS: { FirstError.Message }", NotificationType.Warning ) )
```

The **Errors** function also returns information about past errors during runtime operations. It can be useful for displaying an error on a form screen without needing to capture the error in a state variable. 

## Rethrowing errors

Sometimes you expect potential errors and can safely ignore them. Inside **IfError** and **App.OnError**, if an error is detected that should be passed to the next higher handler, rethrow it by using `Error( AllErrors )`.

## Creating your own errors

You can also create your own errors by using the **Error** function.

If you create your own errors, use values greater than 1,000 to avoid potential conflicts with future system error values.

## ErrorKind enum values

| ErrorKind enum | Value | Description |
|----------------|-------|-------------|
| AnalysisError | 18 | System error. There's a problem with compiler analysis. |
| BadLanguageCode | 14 | An invalid or unrecognized language code was used. |
| BadRegex | 15 | Invalid regular expression. Check the syntax used with the **IsMatch**, **Match**, or **MatchAll** functions. |
| Conflict | 6 | The record you're updating is already changed at the source and you need to resolve the conflict. A common solution is to save any local changes, refresh the record, and reapply the changes. |
| ConstraintViolated | 8  | The record didn't pass a constraint check on the server. | 
| CreatePermission | 3 | You don't have permission to create a record for the data source. For example, the **Collect** function was called. |
| DeletePermissions | 5 | You don't have permission to delete a record for the data source. For example, the **Remove** function was called. |
| Div0 | 13 | Division by zero. |
| EditPermissions | 4 | You don't have permission to create a record for the data source. For example, the **Patch** function was called. |
| GeneratedValue | 9 | A value was erroneously passed to the server for a field that the server automatically calculates. |
| InvalidFunctionUsage | 16 | Invalid usage of a function. Often one or more of the arguments to the function is incorrect or used in an invalid way. |
| FileNotFound | 17 | The **SaveData** storage couldn't be found. |
| InsufficientMemory | 21 | There's not enough memory or storage on the device for the operation. |
| InvalidArgument | 25 | An invalid argument was passed to a function. | 
| Internal | 26 | System error. There's an internal problem with one of the functions. |
| MissingRequired | 2 | A required field of a record is missing. |
| Network | 23 | There's a problem with network communications. |
| None | 0 | System error. There's no error. |
| NotApplicable | 27 | No value is available. This error is useful to differentiate a *blank* value that can be treated as a zero in numerical calculations, from blank values that should be flagged as a potential problem if the value is used. |
| NotFound | 7 | Record couldn't be found. For example, the record to be modified in the **Patch** function. |
| NotSupported | 20 | Operation not supported by this player or device. |
| Numeric | 24  | A numeric function was used in an improper way. For example, **Sqrt** with -1. |
| QuoteExceeded | 22 | Storage quota exceeded. |
| ReadOnlyValue | 10 | Column is read only and can't be modified. | 
| ReadPermission | 19 | You don't have permission to read records for the data source. | 
| Sync | 1 | The data source reported an error. Check the Message column for more information. | 
| Unknown | 12 | There was an error, but of an unknown kind. |
| Validation | 11 | The record didn't pass a validation check. |

---

## Global support in Microsoft Power Fx | Microsoft Docs

Source: [global.md](https://learn.microsoft.com/en-us/power-platform/power-fx/global)

*Use Microsoft Power Fx to express logic worldwide.*

# Global support

> [!NOTE]
> Microsoft Power Fx is the new name for the canvas apps formula language.  These articles are work in progress as we extract the language from canvas apps, integrate it with other Microsoft Power Platform products, and make it available as open source.  Start with the [Microsoft Power Fx Overview](overview.md) for an introduction to the language.    

Both while building and running logic, the text displayed by Power Fx will be displayed in the appropriate languages. Typing in and displaying dates and numbers is adapted for your particular language and region.  

For example, some regions of the world use a **.** (dot or period) as the decimal separator while others use a **,** (comma).  This is what Excel does too.  This is commonly not done in other programming languages, using a canonical **.** as the decimal separator for all users worldwide.  To be as approachable as possible for makers at all levels, it is important that `3,14` is a decimal number for a person in France who has used that syntax all their lives.   

The apps you create can be globally aware as well.  Use the **Language**, **Text**, and **Value**, **DateValue**, and other functions to adapt what is displayed and used as input in different languages.   

## Language settings

When using the native studio or a native player, the language used is provided by the host operating system. For Windows, this setting can be controlled under "All Settings" and then "Time & language" settings.  Windows also allows you to specify the characters to use for the decimal separator, overriding the language setting.  

When using the web experiences, the language used is provided by the browser.  Most browser default to the host operating system's setting with some also providing a way to set the language manually.

## Authoring environment

The authoring environment adapts to the language setting of the author.  The app itself is stored in a language agnostic manner, so that authors using different languages can edit the same app.

### Names in formulas

Most elements in formula are always in English:

* Function names: **If**, **Navigate**, **Collect**, and so on.
* Control property names: **Screen.Fill**, **Button.OnSelect**, **Textbox.Font**, and so on.
* Enumeration names: **Color.Aqua**, **DataSourceInfo.MaxValue**, **FontWeight.Bold**, and so on.
* Signal records: **Compass.Heading**, **Location. Latitude**, **App.ActiveScreen**, and so on.
* Operators: **Parent**, **in**, **exactIn**, and so on.

As the authoring experience is localized, control and other object names will appear in the native language of the author.  In Spanish, some of the control names appear as:

![Control names in Spanish.](media/global-apps/insert-controls-es.png "Control names in Spanish")

When you insert one of these controls into your app, their name will default to English.  This change is done for consistency with the control property names and the rest of the formula.  For example, **Casilla** listed above is inserted as **Checkbox1**.  

After a control is inserted, you can change the name to whatever you like.  While selected, the far left-hand side of the "Content" ribbon displays the name of the control.  Selecting this name drops down a text box where you can edit the name:

![Experience in Spanish.](media/global-apps/control-rename.png "Experience in Spanish")

If you like, here you can rename the control to **Casilla1**.  The red squiggly, in this case displayed by a browser, is because the name isn't a Spanish word and is of no concern.

You can use whatever names you like for:

* Control names
* Collection names
* Context variable names

### Formula separators and chaining operator
Some [separators and operators](operators.md) will shift based on the decimal separator of the author's language:

| Author's language decimal separator | Power Apps decimal separator | Power Apps list separator | Power Apps chaining operator |
| --- | --- | --- | --- |
| **.** (dot or period) |**.** (dot or period) |**,** (comma) |**;** (semi-colon) |
| **,** (comma) |**,** (comma) |**;** (semi-colon) |**;;** (double semi-colon) |

The change in the Power Apps list separator is consistent with what happens to the Excel list separator.  It impacts:

* Arguments in function calls.
* Fields in a [record](tables.md#elements-of-a-table).
* Records in a [table](tables.md#inline-value-tables).

For example, consider the following formula expressed in a language and region that uses dot or period as the decimal separator, such as Japan or the United Kingdom:

![Power Apps formula If open paren slider1 dot value greater than 12 dot 59 comma notify open paren double-quote Valid! double-quote comma success close paren semi-colon Navigate open paren double-quote NextScreen double-quote comma None close paren comma notify open paren double-quote Invalid, try again double-quote comma error close paren close paren.](media/global-apps/operators-dot.png)

Now view this same formula in a language and region where a comma is used for the decimal separator, such as France or Spain:

![Power Apps formula If open paren slider1 dot value greater than 12 comma 59 semi-colon notify open paren double-quote Valid! double-quote semi-colon success close paren double semi-colon Navigate open paren double-quote NextScreen double-quote semi-colon None close paren semi-colon notify open paren double-quote Invalid, try again double-quote semi-colon error close paren close paren.](media/global-apps/operators-comma.png)

The highlight shows the operators that change between the two versions. The property selection operator **.** (dot or period) in **Slider1.Value** is always the same, no matter what the decimal separator is.

Internally the formula doesn't change, all that changes is how it's displayed and edited by the author.  Two different authors using two different languages can view and edit the same formula, with each seeing the appropriate separators and operators for their language.

## Creating a global app
The app you create can adapt to different languages, providing a great user experience for your users around the world.

### Language function
The **Language** function returns the language tag of the current user.  For example, this function returns **"en-GB"** for users in Great Britain and **"de-DE"** for users in Germany.  

Among other things, you can use **Language** to display translated text for your users.  Your app can include a table of translated values in your app:

![Table with localized text.](media/global-apps/loc-table.png "Table with localized text")

And then use a formula such as the following to pull translated strings from the table:

```power-fx
LookUp( Table1, TextID = "Hello" && (LanguageTag = Left( Language(), 2 ) || IsBlank( LanguageTag ))).LocalizedText
```

Translated strings in other languages could be longer than they are in your language.  In many cases, the labels and other elements that display the strings in your user interface will need to be wider to accommodate.

For more information, see the documentation for the **Language** function.

### Formatting numbers, dates, and times
Numbers, dates, and times are written in different formats in different parts of the world.  The meaning of commas, decimals, and the order of month, date, and year vary from location to location.   

The **Text** function formats numbers and dates using the language setting of the user.

**Text** requires a format string to know how you want to format the number or date.  This format string can take one of two forms:

* **A global aware enumeration.**  For example, **Text( Now(), DateTimeFormat.LongDate )**.  This formula will format the current date in a language appropriate format.  This method is the preferred way to specify the format string.
* **A custom format string.**  For example, **Text( Now(), "[$-en-US]dddd, mmmm dd, yyyy" )** displays the same text as the enumeration when used in the language "en-US".  The advantage of the custom format string is that you can specify exactly what you want.

The "[$-en-US]" on the front of the custom format string tells **Text** in which language to interpret the custom format string.  This string is inserted for you and defaults to your authoring language. Normally you won't need to change this string.  It's useful when authors from different languages are editing the same app.

The third argument to **Text** specifies which language to use for the result of the function.  The default is the language setting of the current user.

For more information, see the documentation for the **Text** function.      

### Reading numbers, dates, and times
There are four functions for reading numbers, dates, and times provided by the user:

* **Value**: Converts a number in a text string to a number value.
* **DateValue**: Converts a date value in a text string to a date/time value.  Anytime specified in the text string is ignored.
* **TimeValue**: Converts a time value in a text string to a date/time value.  Any date specified in the text string is ignored.
* **DateTimeValue**: Converts a date and time value in a text string to a date/time value.  

If you have used Excel, all of these functions are combined in the single **Value** function.  They're broken out here since Power Apps has separate types for date/time values and numbers.

All of these functions have the same arguments:

* *String, required*: A string from the user. For example, a string types into a **Text input** control and read from the control with the **Text** property.
* *Language, optional*: The language in which to interpret the *String*.  By default, the language setting of the user.

For example:

* **Value( "12,345.678", "en-US" )** or **Value( "12,345.678" )** when located where "en-US" is the user's language returns the number **12345.678**, ready for calculations.
* **DateValue( "1/2/01", "es-ES" )** or **DateValue( "1/2/01" )** when located where "es-ES" is the user's language returns the date/time value **February 1, 2001 at midnight**.
* **TimeValue( "11:43:02", "fr-FR" )** or **TimeValue( "11:43:02" )** when located where "fr-FR" is the user's language returns the date/time value **January 1, 1970 at 11:43:02**.
* **DateTimeValue( "11:43:02 1/2/01", "de-DE" )** or **DateTimeValue( "11:43:02 1/2/01" )** when located where "de-DE" is the user's language returns the date/time value **February 1, 2001 at 11:43:02**.

For more information, see the documentation for the **Value** and **DateValue, TimeValue, and DateTimeValue**  functions.

### Calendar and Clock information
The **Calendar** and **Clock** functions provide calendar and clock information for the user's current language.  

Among other things, use these functions to provide a **Dropdown** control with a list of choices.  

For more information, see the documentation for the **Calendar** and **Clock**  functions.

---

## Regular expressions in Microsoft Power Fx | Microsoft Docs

Source: [regular-expressions.md](https://learn.microsoft.com/en-us/power-platform/power-fx/regular-expressions)

*Reference information about working with regular expressions in Microsoft Power Fx*

# Regular expressions

The [**IsMatch**, **Match**, and **MatchAll** functions](reference/function-ismatch.md) are used to extract and validate patterns in text. The pattern they use is called a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). 

Regular expressions are powerful and versatile. However, they can sometimes appear as a random sequence of punctuation marks. This article doesn't describe all aspects of regular expressions, but a wealth of information, tutorials, and tools are available online.

Regular expressions have a long history and are available in many programming languages. Every programming language has its own dialect of regular expressions, and there are few standards. As much as possible, we're striving to have the same regular expression give the same result across all Power Fx implementations. Compatibility isn't easy to accomplish as Power Fx runs on top of JavaScript and .NET which have significant differences. To run on different platforms, Power Fx regular expressions use a subset of features widely supported across the industry.

As a result, some regular expressions that work in other environments might be blocked or need adjustments in Power Fx. Authoring time errors are reported as unsupported features are encountered. This is why the regular expression and options must be an authoring-time constant and not dynamic, such as being provided in a variable.

> [!NOTE]
> Power Apps uses an earlier version of Power Fx regular expressions, which has fewer limitations but also fewer features. **MatchOptions.DotAll** and **MatchOptions.FreeSpacing** aren't available and the definitions of **Match.Email** and **Match.Hyphen** are different. Unicode surrogate pairs aren't treated as a single character. **MatchOptions.NumberedSubMatches** is the default. The version of regular expressions described here is available in Power Apps soon, under a "Power Fx V1.0 compatibility" switch.

## Supported features

Power Fx supports the following regular expression features, with notes on how Power Fx behavior might differ from other systems.

The regular expression must be constant and not calculated or stored in a variable. The `&` operator, string interpolation `$"{...}"`, and the `Concatenate`, `Char`, and `UniChar` functions with constant arguments are supported.

### Literal characters

| Feature | Description |
|---------|---------|
| Literal characters | Any Unicode character can be inserted directly, except `\`, `[`, `]`, `^`, `$`, `.`, `|`, `?`, `*`, `+`, `(`, `)`, `{`, and `}`. When using **MatchOptions.FreeSpacing**, `#`, ` `, and other `\s` space characters must be escaped as they have a different meaning. |
| Escaped literal characters | `\` (backslash) followed by one of the direct literal characters, such as `\?` to insert a question mark. `\#` and `\ ` may also be used even when **MatchOptions.FreeSpacing** is disabled for consistency. | 
| Hexadecimal and Unicode character codes | `\x20` with exactly two hexadecimal digits, `\u2028` with exactly four hexadecimal digits and can be used for high and low surrogates. |
| Unicode code point | `\u{01F47B}` with up to eight hexadecimal digits. Must be in the range 0 to U+10FFFF and can't be used for either a high or low surrogate. May result in a surrogate pair (two characters) if greater than U+FFFF. |
| Carriage return | `\r`, the same as `Char(13)`. |
| Newline character | `\n`, the same as `Char(10)`. |
| Form feed | `\f`, the same as `Char(12)`. |
| Horizontal Tab | `\t`, the same as `Char(9)`. |

 Use `\x` or `\u` instead. Octal codes for characters, such as `\044` or `\o{044}` are disallowed, because they can be ambiguous with numbered back references.

`\v` isn't supported because it is ambiguous across regular expression languages. Use `\x0b` for a vertical tab or `[\x0b\f\r\n\x85\u2028\u2029]` for vertical whitespace.

### Assertions

Assertions match a particular position in the text but don't consume any characters.

| Feature | Description |
|---------|---------|
| Start of line | `^`, matches the beginning of the text, or of a line if **MatchOptions.Multiline** is used. |
| End of line | `$`, matches the end of the text, or of a line if **MatchOptions.Multiline** is used. |
| Lookahead | `(?=a)` and `(?!a)`, matches ahead for a pattern.
| Lookbehind | `(?<=b)` and `(?<!b)`, matches behind for a pattern.
| Word breaks | `\b` and `\B`, using the Unicode definition of letters `[\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Nd}\p{Pc}\p{Lm}]`. |

`$` matches the end of a line, including any trailing `\r\n`, `\r`, or `\n`.

Lookahead and lookbehind assertions can't contain submatches or unlimited quantifiers within, and can't be used with a quantifier outside. 

### Character classes

| Feature | Description |
|---------|---------|
| Dot | `.`, matches everything except `\r` and `\n` unless **MatchOptions.DotAll** is used. |
| Character class | `[abc]` list of characters, `[a-fA-f0-9]` range of characters, `[^a-z]` everything but these characters. Character classes can't be nested, subtracted, or intersected, and many punctuation marks may not appear twice in a row (`@@`, `%%`, `!!`, etc). |  
| Word characters | `\w` and `\W` using the Unicode definition of letters `[\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Nd}\p{Pc}\p{Lm}]`. `\W` can't be used in a negative character class.|
| Digit characters | `\d` includes the digits `0` to`9` and `\p{Nd}`, `\D` matches everything except characters matched by `\d`. `\D` can't be used in a negative character class.|
| Space characters | `\s` includes spacing characters `[ \t\n\x0b\f\r\x85\u2028\u2029\p{Z}]`, `\S` which matches everything except characters matched by `\s`. `\S` can't be used in a negative character class.|
| Unicode character category | `\p{Ll}` matches all Unicode lowercase letters, while `\P{Ll}` matches everything that isn't a Unicode lowercase letter. `\P{}` can't be used in a negative character class. |

To increase clarity and avoid ambiguity, square bracket character classes are more restrictive than in other regular expression languages:
- Literal hyphen characters must be escaped. Use `[\-a]` instead of `[-a]` to match `-` or `a`.
- Beginning square brackets must be escaped. Use `[\[a]` instead of `[[]` to match `[` or `a`.
- Unless it's the first character and indicating negation, the character must be escaped. Use `[a\^]` instead of `[a^]` to match `^` or `a`.
- Curly braces must be escaped. Use `[\{\}]` to match `{` or `}`.
- Empty character class `[]` isn't supported. To include a closing square bracket in a character class, escape it.

Unicode character categories supported by `\p{}` and `\P{}`:
- Letters: `L`, `Lu`, `Ll`, `Lt`, `Lm`, `Lo`
- Marks: `M`, `Mn`, `Mc`, `Me`
- Numbers: `N`, `Nd`, `Nl`, `No`
- Punctuation: `P`, `Pc`, `Pd`, `Ps`, `Pe`, `Pi`, `Pf`, `Po`
- Symbols: `S`, `Sm`, `Sc`, `Sk`, `So`
- Separators: `Z`, `Zs`, `Zl`, `Zp`
- Control and Format: `Cc`, `Cf`, while other `C` prefix categories aren't supported.

`\W`, `\D`, `\S`, and `\P{}` can't be used within a negated character class `[^...]`. In order to be implemented on some platforms, these negative character classes are translated to their Unicode equivalents which could be difficult to do if also negated.

Unicode characters between U+10000 and U+10FFFF, requiring surrogate pairs, aren't supported in character classes.

### Quantifiers

| Feature | Description |
|---------|---------|
| Greedy zero or one | `?` matches zero or one time, with as *large* a match as possible. |
| Greedy zero or more | `*` matches zero or more times, with as *large* a match as possible. |
| Greedy one or more | `+` matches one or more times, with as *large* a match as possible. |
| Greedy at least n | `{n,}` matches at least *n* times, with as *large* a match as possible. For example, `a{3,}` matches all the characters in `aaaaa`. |
| Greedy between n and m | `{n,m}` matches between *n* and *m* times, with as *large* a match as possible. For example, `a{1,3}` matches the first three characters of `aaaaa`. |
| Lazy zero or one | `??` matches zero or one time, with as *small* a match as possible. |
| Lazy zero or more | `*?` matches zero or more times, with as *small* a match as possible. |
| Lazy one or more | `+?` matches one or more times, with as *small* a match as possible. |
| Lazy at least n | `{n,}?` matches at least *n* times, with as *small* a match as possible. For example, `a{3,}?` matches only the first three characters in `aaaaa`. |
| Lazy between n and m | `{n,m}?` matches between *n* and *m* times, with as *small* a match as possible. For example, `a{1,3}?` matches only the first character of `aaaaa`. |
| Exact n | `{n}` matches *n* times, exactly. For example, `a{3}` matches exactly three characters of `aaaaa`. |

Possessive quantifiers aren't supported.

Mixing sub-matches and quantifiers has limitations. For more information, see [Possibly empty sub-matches](#possibly-empty-submatches).

### Groups

| Feature | Description |
|---------|---------|
| Group | `(` and `)` are used to group elements for quantifiers to be applied. For example, `(abc)+` matches `abcabc`. |
| Alternation | `a|b` matches "a" or "b", often used in a group. |
| Named submatch and back reference | `(?<name>chars)` captures a submatch with the name `name`, referenced with `\k<name>`. can't be used if **MatchOptions.NumberedSubMatches** is enabled. |
| Numbered submatch and back reference | When **MatchOptions.NumberedSubMatches** is enabled, `(a)` captures a submatch referenced with `\1`. |
| Noncapture group | `(?:a)`, creates group without capturing the result as a named or numbered submatch. All groups are non-capturing unless **MatchOptions.NumberedSubMatches** is enabled. |

Named and numbered submatches cannot be used together. By default, named submatches are enabled and are preferred for clarity and maintainability, while standard capture groups become non capture groups with improved performance. This behavior can be changed with **MatchOptions.NumberedSubMatches** which provides for traditional capture groups but disables named capture groups. Some implementations treat a mix of numbered and named capture groups differently which is why Power Fx disallows it. 

Self referencing capture groups aren't supported, for example the regular expression `(a\1)`.

Two capture groups can't share the same name, for example, the regular expression `(?<id>\w+)|(?<id>\d+)` isn't supported.

The name of a named submatch must begin with a `\p{L}` character or `_`, and can continue with those characters plus `\p{Nd}`. Names are limited in length to 62 UTF-16 code units.

Backreferences to possibly empty submatches and to submatches within a look behind or look ahead are also not supported. 

Some implementations offer an "explicit capture" option to improve performance which is unnecessary in Power Fx as it's the default. **MatchOptions.NumberedSubMatches** disables it and enables implicitly numbered captures.

Mixing submatches and quantifiers has limitations. See [Possibly empty submatches](#possibly-empty-submatches) for more information.

### Comments

| Feature | Description |
|---------|---------|
| Inline comments | `(?# comment here)`, which is ignored as a comment. Comment ends with the next close parenthesis, even if an opening parenthesis is in the comment.|

See **MatchOptions.FreeSpacing** for an alternative for formatting and commenting regular expressions.

### Inline options

| Feature | Description |
|---------|---------|
| Inline options | `(?im)` is the same as using **MatchOptions.IgnoreCase** and **MatchOptions.Multiline**. Must be set at the beginning of the regular expression. |

Supported inline modes are `[imsx]`. These correspond to **MatchOptions.IgnoreCase**, **MatchOptions.Multiline**, **MatchOptions.DotAll**, and **MatchOptions.FreeSpacing**, respectively. `n` is also accepted for compatibility but has no effect as it is the default and is incompatible with **MatchOptions.NumberedSubMatches**.

Inline options cannot be used to disable an option or set an option for a subexpression.

## Options

Match options change the behavior of regular expression matching. There are two ways to enable options, which can be mixed so long as there's no conflict:
- **MatchOptions** enum value passed as the third argument to **Match**, **MatchAll**, and **IsMatch**.  Options can be combined with the `&` operator or `Concatenate` function, for example `MatchOptions.DotAll & MatchOptions.FreeSpacing`. All of the regular expression functions require that **MatchOptions** is a constant value, it can't be calculated or stored in a variable. 
- `(?...)` prefix at the very beginning of the regular expression.  Options can be combined with multiple letters in the `(?...)` construct, for example `(?sx)`.  Some options don't have a `(?...)` equivalent but may have other ways to get the same effect, for example **MatchOptions.BeginsWith** is the equivalent of `^` at the beginning of the regular expression.

### Contains

Enabled with **MatchOptions.Contains** without a regular expression text equivalent. **MatchOptions.Contains** is the default for all functions outside of Power Apps; within Power Apps **MatchOptions.Complete** is the default for **IsMatch**.

### Complete

Enabled with **MatchOptions.Complete** or use `^` and `$` at the beginning and of the regular expression, respectively.

### BeginsWith

Enabled with **MatchOptions.BeginsWith** or use `^` at the beginning and of the regular expression.

### EndsWith

Enabled with **MatchOptions.EndsWith** or use `$` at the end of the regular expression.

### DotAll

Enabled with **MatchOptions.DotAll** or `(?s)` at the start of the regular expression.

Normally the dot `.` operator matches all characters except newline characters `[\n\x0b\f\r\x85\u2028\u2029]`. With the **DotAll** modifier, all characters are matched, including newlines.

In this example, only the "Hello" is matched as by default the `.` won't match the newline:

```powerapps-dot
Trim( Match( "Hello
              World", ".*" ).FullMatch )
// returns 
// "Hello"
```

But if we add the **DotAll** modifier, then the newline and all subsequent characters are matched:

```powerapps-dot
Trim( Match( "Hello
              World", ".*", MatchOptions.DotAll ).FullMatch )
// returns 
// "Hello
// World"
```

### FreeSpacing

Enabled with **MatchOptions.FreeSpacing** or `(?x)` at the start of a regular expression.

Free spacing makes it easier to read and maintain a complex regular expression. The rules are simple:
- Space characters are ignored in the regular expression, including all characters that would match `\s`. If matching a space is desired, use `\s`, `\ `, `\t`, `\r`, or `\n`.
- `#` begins a comment which runs until the end of the line. It and all characters that follow up to the next newline character (characters not matched by `.` without **MatchOptions.DotAll**) are ignored.
- Characters classes aren't included in these changes. Space characters and `#` act as they normally do. For example, `IsMatch( "a#b c", "(?x)a[ #]b[ #]c" )` returns *true*. Some regular expression languages include character classes in free spacing, or provide an option to include them, but Power Fx doesn't.

For example, here is a complex regular expression for matching an ISO [8601 date time](https://en.wikipedia.org/wiki/ISO_8601):

```powerapps-dot
IsMatch( 
    "2025-01-17T19:38:49+0000",
    "^\d{4}-(0\d|1[012])-([012]\d|3[01])(T([01]\d|2[0123]):[0-5]\d(:[0-5]\d(\.\d{3})?)?(Z|[\-+]\d{4}))?$"
)
// returns true
```

And here is the identical regular expression with free spacing utilizing multiple lines, indentation for groups, and regular expression comments, making this version easier to understand, validate, and maintain.

```powerapps-dot
IsMatch( "2025-01-17T19:38:49+0000", 
    "(?x)                 # enables free spacing, must be very first
    ^                     # matches from beginning of text
    \d{4}                 # year (0000-9999)
    -(0\d|1[012])         # month (00-12)
    -([012]\d|3[01])      # day (00-31, range not checked against month)
    (T([01]\d|2[0123])    # optional time, starting with hours (00-23)
      :[0-5]\d            # minutes (00-59)
      (:[0-5]\d           # optional seconds (00-59)
        (\.\d{3})?        # optional milliseconds (000-999)
      )?
      (Z|[\-+]\d{4})      # time zone
    )?
    $                     # matches to end of text
    "
)
// returns true
```

### IgnoreCase

Enabled with **MatchOptions.IgnoreCase** or `(?i)` at the start of a regular expression.

Matches text in a letter case insensitive: upper case letters match lower case letters and lower case letters match upper case letters. 

For example:

```powerapps-dot
IsMatch( "HELLO!", "hello", MatchOptions.IgnoreCase )
// returns true

IsMatch( "file://c:/temp/info.txt", "^FILE://", MatchOptions.IgnoreCase )
// returns true
```

Most parts or Power Fx are culture aware, but not here. Using culture invariant matching is the industry standard for regular expressions, including in JavaScript and Perl. It's useful in the second example where a system resource is being matched, in for example, the `tr-TR` culture where `I` isn't the uppercase equivalent of `i`.

If a culture aware, case insensitive match is needed, use characters class with the matching characters instead, for example `[Hh][Ee][Ll][Ll][Oo]` for the first example.

### Multiline

Enabled with **MatchOptions.Multiline** or `(?m)` at the start of a regular expression.

Normally, `^` and `$` anchors match the beginning and of the input text. With the **Multiline** modifier, these anchors match the beginning and end of lines in the input text, where each line ends with `\r`, `\n`, `\r\n`, or the end of the input.  For example:

```powerapps-dot
MatchAll( "Hello" & Char(13) & Char(10) & "World", "^.+$" )
// returns 
// "Hello"
```

## Predefined patterns

Predefined patterns let you match either one of a set of characters or a sequence of multiple characters. Use the [string-concatenation operator **&**](operators.md) to combine your text strings with members of the **Match** enum:

| Match enum            | Description                                                                                              | Regular expression    |
| --------------------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| **Any**               | Matches any character.                                                                                   | `.`                   |
| **Comma**             | Matches a comma `,`.                                                                                         | `,`                   |
| **Digit**             | Matches a single digit (`0` through `9` and other members of `\p{Nd}`).                                                                | `\d`                  |
| **Email**             | Matches an email address that contains an "at" symbol (`@`) and a domain name that contains at least one dot (`.`), delimited by whitespace and punctuation characters. | *see note*            |
| **Hyphen**            | Matches a hyphen.                                                                                        | `-` *see note*        |
| **LeftParen**         | Matches a left parenthesis `(`.                                                                          | `\(`                  |
| **Letter**            | Matches a letter.                                                                                        | `\p{L}`               |
| **MultipleDigits**    | Matches one or more digits.                                                                              | `\d+`                 |
| **MultipleLetters**   | Matches one or more letters.                                                                             | `\p{L}+`              |
| **MultipleNonSpaces** | Matches one or more characters that don't add whitespace (not space, tab, or newline).                   | `\S+`                 |
| **MultipleSpaces**    | Matches one or more characters that add whitespace (space, tab, or newline).                             | `\s+`                 |
| **NonSpace**          | Matches a single character that doesn't add whitespace.                                                  | `\S`                  |
| **OptionalDigits**    | Matches zero, one, or more digits.                                                                       | `\d*`                 |
| **OptionalLetters**   | Matches zero, one, or more letters.                                                                      | `\p{L}*`              |
| **OptionalNonSpaces** | Matches zero, one, or more characters that don't add whitespace.                                         | `\S*`                 |
| **OptionalSpaces**    | Matches zero, one, or more characters that add whitespace.                                               | `\s*`                 |
| **Period**            | Matches a period or dot `.`.").                                                                           | `\.`                  |
| **RightParen**        | Matches a right parenthesis `)`.                                                                         | `\)`                  |
| **Space**             | Matches a character that adds whitespace.                                                                | `\s`                  |
| **Tab**               | Matches a tab character.                                                                                 | `\t`                  |

For example, the pattern **"A" & Match.MultipleDigits** matches the letter "A" followed by one or more digits.

The **Match.Email** pattern is more complex than the rest. It detects and extracts common email addresses in the form **local@hostname.tld**, possibly from long passages of text, and supports international characters and emojis. Use it to validate a form that takes an email address as an input, as a quick test that the input is in an email form. If you're not extracting, use **MatchOptions.Complete** to detect an email address, for example, in a text input control.

However, **Match.Email** doesn't validate that the email address conforms to all of the many evolving standards for email addresses, domain names, and top-level-domains which would require a complicated regular expression that would need to be updated from time to time. Although most email addresses are treated as expected, **Match.Email** matches some invalid cases, such as an underscore in the hostname, and doesn't match some valid cases, such as quoted email addresses or IP addresses. If needed, there are many regular expressions on the web for detecting a truly legal email address. Always test your regular expression for your specific needs before using in production.

If you want to see the regular expression used, evaluate the formula `Text( Match.Email )`. The first part matches the characters before the `@` and excludes common ASCII punctuation as per [RFC 822 and revisions](https://www.rfc-editor.org/rfc/rfc822.html#section-3.3) and Unicode beginning and ending punctuation for easier extraction, such as `(`, `[`, `“`, `«`, and `「`. It doesn't support the uncommon and discouraged use of quoted strings or comments. Following the `@`, the second and third parts of the regular expression are the same and separated by a `.`, ensuring that there's always at least one `.` in the address. These parts exclude all Unicode punctuation except for `.`, `-`, and `_`. IP addresses aren't supported. Throughout the entire email address, international characters and emojis are supported.

In Power Apps, when not using Power Fx 1.0, **Match.Email** and **Match.Hyphen** have slightly different definitions. **Match.Email** is simpler, but isn't suitable for extracting an email address as it capture spaces. Previously, **Match.Hyphen** was escaped outside of a character class which is now illegal.

### NumberedSubMatches

Enabled with **MatchOptions.NumberedSubMatches** with no inline option. `(?n)` is supported as the opposite of this option for compatibility and is the default.

By default, `(...)` doesn't capture, the equivalent of what most systems call "explicit capture." To capture, use a named capture with `(?<name>...)` with backreference `\k<name>`. Using named captures improves performance by not capturing groups that aren't needed, improving clarity by using names, and not prone to errors if the position of captures changes.

If you have an existing regular expression, it may depend on groups being captured automatically and numbered, including numbered back references. This behavior is available by using the **MatchOptions.NumberedSubMatches** option.

Named and numbered submatches can't be used together. Because some implementations treat a mix of numbered and named capture groups differently, Power Fx disallows it. 

## Possibly empty submatches

As stated in the introduction, Power Fx's regular expressions are intentionally limited to features that can be consistently implemented on .NET, JavaScript, and other programming language regular expression engines. Authoring-time errors prevent using features that aren't part of this set. 

One area that can be different between implementations is how empty submatches are handled. For example, consider the regular expression `(?<submatch>a*)+` asked to match the text `a`. On .NET, the submatch results in an empty text string, while on JavaScript it results in `a`. Both can be argued as correct implementations, as the `+` quantifier can be satisfied with an empty string since the contents of the group has a `*` quantifier.

To avoid different results across Power Fx implementations, submatches that might be empty can't be used with a quantifier. Here are examples of how a submatch could be empty:

| Examples | Description |
|----------|-------------|
| `(?<submatch>a{0,}b*)+` | All the contents of the submatch are optional, so the entire submatch might be empty. |
| `((<submatch>a)?b)+` | Because of the `?` outside the submatch, the submatch as a whole is optional. |
| `(?<submatch>a|b*)+` | Alternation within the submatch with something that could be empty could result in the entire submatch being empty. |
| `((?<submatch>a)|b)+` | Alternation outside the submatch could match `b` in which case the submatch would be empty.|

The submatch in `(?<submatch>a+)+` can't be empty because there must be at least one `a` in the submatch, and it is supported.

## Unicode

Power Fx regular expressions use Unicode categories to define `\w`, `\d`, and `\s`, with specific categories available through `\p{..}`.

These definitions might vary across platforms. For example, the Unicode standard is updated from time to time with new characters which will later be implemented by platforms at their own pace. Expect variations in results between platforms until all platforms are updated.

Power Fx regular expressions ensure category information is always available for the Basic Multilingual Plane (characters U+0 to U+ffff). Some platforms don't implement categories for characters in the Supplementary Multilingual Plane and beyond (U+10000 through U+10ffff). This limitation is usually not a concern as characters in the Basic Multilingual Plane are the most commonly used. Use character values directly instead of categories if your scenario involves characters at or beyond U+10000. Test your regular expressions on the platforms you intend to use.

Small edge case differences might exist between platforms. For example, some platforms may not see `ſ` as matching `s` when **MatchOptions.IgnoreCase** is invoked. If these characters are important for your scenario, use a character class like `[ſsS]` to match case insensitively and explicitly include the desired characters.

---

## Dynamic values

Source: [untyped-object.md](https://learn.microsoft.com/en-us/power-platform/power-fx/untyped-object)

*Reference information about Dynamic values in Power Fx.*

# Dynamic values

**Dynamic** is a data type in Power Fx that can hold any data structure, complex or simple. It can't be used directly and conversion to another data type at runtime, either explicitly or implicitly. Fields of records in a **Dynamic** value can be accessed using the dot notation, and existence of fields is only verified at runtime.

There are two ways to create a **Dynamic** value:
- Using the [**ParseJSON** function](./reference/function-parsejson.md).
- Using a connector that returns a "dynamic" type.

> [!NOTE]
> **Dynamic** was formerly called **UntypedObject**. Only the name has changed, there is no change in the semantics. 

## Simple Types

The value of a variable containing a **Dynamic** value can't be used directly. You always have to correctly type it using the corresponding type constructor or by converting it to a specific type with **AsType** and **ParseJSON** functions.

The following examples convert the value of a **Dynamic** variable named `DynValue`.

```powerapps-dot
Text(DynValue)
```
```powerapps-dot
Value(DynValue)
```

The following table lists the data types and corresponding functions to convert **Dynamic** to that data type.

| Data Type | Function  | Description |
| --- | --- | --- |
| Boolean | [Boolean()](./reference/function-boolean.md) | When converting **Dynamic** to **Boolean**, the underlying value has to represent a boolean or a type that can be automatically converted (such as a string "true"). |
| Color | [ColorValue() or RGBA()](./reference/function-colors.md) | Colors can be represented in Cascading Style Sheet (CSS) color definition notation as a string, or as individual RGBA components. The **Dynamic** can be converted directly from a Cascading Style Sheet (CSS) color definition string using the [ColorValue()](./reference/function-colors.md) function, or from individual RGBA [numbers](./reference/function-value.md) into color using the [RGBA()](./reference/function-colors.md) function. |
| Currency, Number | [Value()](./reference/function-value.md) | When converting **Dynamic** to **Number**, the underlying value has to represent a number or a type that can be automatically converted (such as a string "123.456"). |
| Date, DateTime, Time | [DateValue(), TimeValue() or DateTimeValue()](./reference/function-datevalue-timevalue.md) | Date, time and datetime can be directly converted from **Dynamic** to their respective type, when represented in ISO 8601 format. Other formats must first be converted to text using the [Text()](./reference/function-text.md) function and then passed into the [DateValue(), TimeValue() or DateTimeValue()](./reference/function-datevalue-timevalue.md) function that by default will use the language of the current user's settings to interpret the date and time. |
| GUID | [GUID()](./reference/function-guid.md) | A **Dynamic** value can be directly converted to GUID if the underlying object represents a GUID, or if it represents a string. |
| HyperLink, Image, Media | [Text()](./reference/function-text.md) | These data types are text data types, and can be converted to text and then used in Power Fx. |
| Choice, Two Option | [Switch() or If()](./reference/function-if.md) | **Choices** and **two options** are presented as localized strings in Power Fx. **Choices** are backed by a number and **two options** as booleans. There's no direct conversion from boolean, number or string to a **choice** or **two option**, but the [Switch()](./reference/function-if.md) or [If()](./reference/function-if.md) functions can be used on the boolean, text or number value to correctly assign the **choice** or **two option** value. |
| Record | n/a | There's no direct conversion from **Dynamic** to a record structure, but individual fields can be retrieved from the **Dynamic** to create a new record. |
| Record Reference | n/a | Record references are unique to datasources and have no meaningful representation in **Dynamic**. |
| Table | [Table()](./reference/function-table.md) and [ForAll()](./reference/function-forall.md) | An **Dynamic** can represent an array, which can be converted into a table. These objects can be arrays of records, or arrays of values that are effectively single-column tables. [ForAll()](./reference/function-forall.md) can be used to create a table with fully typed records. Review the examples further down this article for more information. |
| Text | [Text()](./reference/function-text.md) | Text can be directly converted. If a **Dynamic** value represents a number, you need to convert the **Dynamic** to number first using [Value()](./reference/function-value.md) before converting to text. |

## Record Types

You can access fields on a variable representing a **Dynamic** record using regular dot-notation used for records. However, the existence of the fields won't be verified until runtime. As a result, there's also no intellisense available. If a field doesn't exist or has an underlying **null** value, accessing it will result in a **Blank()** value.

Each field on the record is also of type **Dynamic**, and needs to be properly typed. The field can be a dynamic record of simple type. In case it's a record, you can chain the dot-notation. If any field in the chain doesn't exist, **Blank()** is returned.

The following examples use fields from a **Dynamic** variable named `DynRecord`.

```powerapps-dot
Text(DynRecord.StringField)
```
```powerapps-dot
Value(DynRecord.Field.ChildField)
```

In case a field name consists of an invalid identifier name, for example when the field names starts with a number or contains invalid characters such as a hyphen, you can put the field names in single quotes:

```powerapps-dot
dynamic.'01'
dynamic.'my-field'
```

### Dynamic column access

Sometimes the names of columns in a record will be dynamic. Use the [**ColumnNames** function](reference/function-columnnames-column.md) to determine which column names are available in a record, and then use the [**Column** function](reference/function-columnnames-column.md) to retrieve the value of a named column.

For example, 
```powerapps-dot
LettersUsed = ParseJSON( "{ ""d"": 2, ""p"": 3 }" );

Concat( ColumnNames( LettersUsed ) As Names, Names.Value, ", " )
// returns "d, p"

Sum( ForAll( ColumnNames( LettersUsed ) As Names, Column( LettersUsed, Names.Value ) ), Value )
// returns 5
```

## Arrays

A **Dynamic** variable can contain an array. Even though the array could be either an array of records or array of simple types, converting the **Dynamic** array to a table using the [Table()](./reference/function-table.md) function will always result in a single-column table of **Dynamic**. Functions such as [ForAll()](./reference/function-forall.md) and [Index()](./reference/function-first-last.md) do not require you to first create a **Table()** and as result don't require you to use the single-column `Value` field,

For example, to get the second number in an array of **Dynamic** containing number values ( `[1, 2, 3]` ), the following formula can be used to retrieve the second row in the table and convert column to a number:

```powerapps-dot
Value( Index( UOArray, 2 ) )
```

If the **Dynamic** was converted to a **Table()** first, the second row in the result single-column table is a `Value` column containing the **Dynamic**:

```powerapps-dot
Value( Index( Table( UOArray ), 2 ).Value )
```

For an array of records that have a text column called `Field`, the same logic applies. The **Dynamic** can be accessed directly, or if using the **Table()** function will result in a single-column table of **Dynamic**.

The `Field` column can be access directly from the **Dynamic** returned by the **Index()** function.

```powerapps-dot
Text( Index( UORecordArray, 2 ).Field )
```

When using the **Table()** function, first retrieve the single-column `Value` column to get the **Dynamic**, then access the `Field` column:

```powerapps-dot
Text( Index( Table( UORecordArray ), 2 ).Value.Field )
```

To convert an array of records to a typed table, you can use the [ForAll()](./reference/function-forall.md) function and convert each individual field.

```powerapps-dot
ForAll( UORecordArray, { FirstField: Value(ThisRecord.FirstField), SecondField: Text(ThisRecord.SecondField) } )
```

If the **Dynamic** is first converted to a table, again, the resulting single-column table of **Dynamic** will require you to use the `Value` column to get the fields.

```powerapps-dot
ForAll( Table(UORecordArray), { FirstField: Value(ThisRecord.Value.FirstField), SecondField: Text(ThisRecord.Value.SecondField) } )
```

## Converting to typed records and tables

Instead of converting each simple value individually, the **ParseJSON**, [**IsType**](reference/function-astype-istype.md), and [**AsType**](reference/function-astype-istype.md) functions can be used to convert a **Dynamic** to a typed object in bulk. Use the [**Type**](reference/function-type.md) function to create a type that will map the dynamic structure to a typed structure.

For example, here we are interpreting the JSON strings as date time values, without needing to call the [**DateTimeValue** function](reference/function-datevalue-timevalue.md):

```powerapps-dot
Eclipse = ParseJSON( "{ ""Start"": ""2026-08-12T18:26:00.000Z"", ""End"": ""2026-08-12T18:33:00.000Z"" }",
                     Type( { Start: DateTime, End: DateTime } ) );

DateDiff( Eclipse.Start, Eclipse.End, TimeUnit.Minutes )
// 7
```

---

## Working with JSON in Power Fx

Source: [working-with-json.md](https://learn.microsoft.com/en-us/power-platform/power-fx/working-with-json)

*Guide to working with JSON in Power Fx.*

# Working with JSON in Power Fx

Power Fx allows makers to read **JSON** into a [Dynamic value](untyped-object.md) using the [ParseJSON](reference/function-parsejson.md) function.

## Reading and converting values

**ParseJSON** will convert the following **JSON** record string into a **Dynamic** record with fields `ItemName`, `Quantity`, `ReleaseDate` and `AvailableForPreOrder`.

```JSON
{
  "ItemName" : "Widget 1",
  "Quantity" : 46,
  "ReleaseDate" : "2022-09-01",
  "AvailableForPreOrder" : true
}
```

Each of the fields can be accessed using the dot notation on the **Dynamic** value returned from **ParseJSON**.

```power-fx
Set( dynvalue, ParseJSON( jsonStringVariable ) );

Set( item, Text ( dynamic.ItemName ) );
Set( quantity, Value ( dynamic.Quantity ) );
Set( release, DateValue ( dynamic.ReleaseDate ) );
Set( preorder, Boolean ( dynamic.AvailableForPreOrder ) );
```

It is generally a good idea to explicitly convert a dynamic value to a specific type. Setting a dynamic as a variable value makes the variable a dynamic value as well. So, converting such value explicitly when setting to a variable is likely needed. But in most cases dynamic values will convert to a specific type automatically ("coerce") when used as function parameters where the type is a simple type like boolean, number, or text, and the function's parameter profile does not have potential conflicting overloads.

```power-fx
Left( dynamic.ItemName, 1 ); // "W"
Radians( dynamic.Quantity ); // 0.80285146
If (dynamic.AvailableForPreOrder, "Available", "Not Available" ); // "Available"
```

In addition to automatically converting the type in function calls, dynamic values will also be converted when assigned to control properties, where possible.

```power-fx
Label1.Text: dynamic.Quantity
InputText1.Default: dynamic.ItemName
```

And finally, when [using operators](./operators.md) such as **&** or **+**, a dynamic value will be coerced if there is no ambiguity on the expected type.

```power-fx
dynamic.Quantity + 1 // result is a number
dynamic.ItemName & " (preorder)" // result is text
dynamic.Quantity + dynamic.Quantity // result is a number
dynamic.Quantity & dynamic.ItemName // result is text
```

> [!NOTE]
> **JSON** does not have a **GUID**, **Color**, **Time** or **DateTime** type. These values are represented as a string. If you assign a **JSON** dynamic value containing a date to a text property directly, the original text of the **JSON** will be used. This may be important when dealing with time zones, date formats, etc. In such cases you should explicitly convert the values using **GUID()**, **ColorValue()**, **DateValue()**, **DateTimeValue()**, etc.

In case a field name consists of an invalid identifier name, for example when the field names starts with a number or contains invalid characters such as a hyphen, you can put the field names in single quotes:

```power-fx
dynamic.'01'
dynamic.'my-field'
```

Power Fx won't evaluate the existence of the field until the formula is run. This allows flexibility in the incoming **JSON**. For example, the previous **JSON** may sometimes contain an extra field called `Discount`. But in our previous example, this field isn't present. Writing a formula that uses the `Discount` field won't result in any errors, during the app making process or when users use the app. If the field is missing when the formula runs, the value will just result in a [Blank()](reference/function-isblank-isempty.md) value.

> [!NOTE]
> **JSON** supports `null` values for fields. These will also result in **Blank()** values. Currently, there is no distinction in Power Fx between a missing field, or a field that has the value `null`.

As accessing fields of a dynamic value isn't evaluated when writing the formula, there's also no **Intellisense** available. Both **JSON** and **Power Fx** are case sensitive, so take extra care in writing out field names.

**JSON** values don't have to be in a record-style notation. Valid **JSON** can be just a value, such as `"text value"`,  `true` or `123.456`. In such a case, the dynamic value that **ParseJSON** returns is the value itself and the dot notation isn't used.

```power-fx
Set( myText, Boolean( ParseJSON( "true" ) ) );

Set( myNumber, Value( ParseJSON( "123.456" ) ) );
```

Finally, **JSON** supports nested records. Converting such **JSON** to a **Dynamic** value results in nested objects, and the dot notation can be used to traverse the hierarchy.

```JSON
{
  "Version" : 1,
  "RootElement" : {
    "Parent" : {
      "Name" : "This is the parent",
      "Child" : {
        "Name" : "This is the child"
      }
    }
  }
}
```

When converting this **JSON** string to a **Dynamic** variable named `jsonObject`, the fields can be accessed using the dot notation.

```power-fx
Set( jsonObject, ParseJSON( jsonStringVariable ) );

Set( parentName, Text( jsonObject.RootElement.Parent.Name ) ); // "This is the parent"

Set( childName, Text( jsonObject.RootElement.Parent.Child.Name ) ); // "This is the child"
```

If any of the fields in the dot notation expression don't exist, **Blank()** will be returned.

## Arrays and tables

**JSON** can contain arrays of values or records. These arrays can be accessed directly, or converted into **Power Fx** tables.

```JSON
{
  "OrderNumber" : "SO000010",
  "CustomerID" : "CUST0126",
  "OrderLines" : [
    {
      "Item" : "Widget 1",
      "Quantity" : 3
    },
    {
      "Item" : "Widget 2",
      "Quantity" : 5
    }
  ]
}
```

This **JSON** contains a record with a field named `OrderLines` which contains an array of records. Each record has two fields: `Item` and `Quantity`. If the **JSON** is converted into a **Dynamic** value using the **ParseJSON** function and set to a variable named `jsonOrder`, we can access the individual order lines in several ways.

```power-fx
Set( jsonOrder, ParseJSON( jsonStringVariable ) );
```

You can retrieve individual records and values using the [Index()](reference/function-first-last.md) function. For example, to get the second record in the `OrderLines` field, then access the `Quantity` field and convert it to a value.

```power-fx
Set( line2Quantity, Value( Index( jsonOrder.OrderLines, 2 ).Quantity ) ); // 5
```

You can convert the array of order lines directly to a table. This will create a single-column table with a **Dynamic** value representing the record.

```power-fx
Set( orderLines, Table( jsonOrder.OrderLines ) );
```

Single column table 'orderLines' now has a 'Value' column that represents the **Dynamic** value. To use any of the fields from a record in this table, use the dot notation to access the specific **JSON** field on the **Dynamic** value in the `Value` column.

```power-fx
Set( jsonRecord, Index( orderLines, 2 ) ); // Get the second record in the table

Set( line2Item, Text( jsonRecord.Value.Item ) ); // "Widget 2"
```

To make the use of the order line records easier and more straightforward in other parts of your app, you can convert the whole **Dynamic** value to an entirely typed record using the [ForAll()](reference/function-forall.md) function. Providing the **Dynamic** value directly to **ForAll()** means you can access the object fields directly instead of using the single-column `Value` field.

```power-fx
Set( typedOrderLines, ForAll( jsonOrder.OrderLines, { Item : Text( ThisRecord.Item ), Quantity : Value( ThisRecord.Quantity ) } ) );
```

The new `typedOrderLines` variable is now a fully typed **Power Fx** table with the following columns and values:

| Item | Quantity |
| --- | --- |
| "Widget 1" | 3 |
| "Widget 2" | 5 |

The previous examples use arrays of records, but **JSON** can also contain arrays of just values. Consider the following example that is a valid **JSON** string containing an array of three strings.

```JSON
[ "First Item", "Second Item", "Third Item"]
```

We can retrieve one of the items from the array using the **Index()** function, and convert it to text.

```power-fx
Text( Index( ParseJSON( jsonStringVariable ), 2 ) ) // "Second Item"
```

---

## Microsoft Power Fx expression grammar | Microsoft Docs

Source: [expression-grammar.md](https://learn.microsoft.com/en-us/power-platform/power-fx/expression-grammar)

*Annotated grammar for the Microsoft Power Fx language*

# Expression grammar

> [!NOTE]
> Microsoft Power Fx is the new name for the formula language for canvas apps. These articles are a work in progress as we extract the language from canvas apps, integrate it with other Microsoft Power Platform products, and make it available as open source. Start with the [Microsoft Power Fx overview](overview.md) for an introduction to the language.

Microsoft Power Fx is based on formulas that bind a name to an expression. Just like in Excel worksheets, as inbound dependencies to the expression change, the expression is recalculated and the value of the name changes, possibly cascading the recalculation into other formulas.

This grammar covers the expression part of the formula. Binding to a name to create a formula is dependent on how Power Fx is integrated. In worksheets, the binding syntax isn't exposed, it's implied by the location where the expression is written&mdash;for example, entering `=B1` in the A1 cell. In some cases, no binding is required at all and Power Fx is used as an expression evaluator, for example in supporting calculated columns of a database table. For Power Apps, the binding is implied when working in Power Apps Studio with [a serialization format based on YAML for use outside Power Apps Studio](yaml-formula-grammar.md).

## Grammar conventions

The lexical and syntactic grammars are presented by using grammar productions. Each grammar production defines a non-terminal symbol and the possible expansions of that non-terminal symbol into sequences of non-terminal or terminal symbols. In grammar productions, non-terminal symbols are shown in italic type, and terminal symbols are shown in a fixed-width font.

The first line of a grammar production is the name of the non-terminal symbol being defined, followed by a colon. Each successive indented line contains a possible expansion of the non-terminal symbol given as a sequence of non-terminal or terminal symbols. For example, the production:

&emsp;&emsp;*GlobalIdentifier* **:**<br>
&emsp;&emsp;&emsp;&emsp;`[@`&emsp;*Identifier*&emsp;`]`

defines a *GlobalIdentifier* to consist of the token `[@`, followed by an *Identifier*, followed by the token `]`.

When there is more than one possible expansion of a non-terminal symbol, the alternatives are listed on separate lines. The subscript "opt" is used to indicate an optional symbol. For example, the production:

&emsp;&emsp;*FunctionCall* **:**<br>
&emsp;&emsp;&emsp;&emsp;*FunctionIdentifier*&emsp;`(`&emsp;*FunctionArguments*<sub>opt</sub>&emsp;`)`

is shorthand for:

&emsp;&emsp;*FunctionCall* **:**<br>
&emsp;&emsp;&emsp;&emsp;*FunctionIdentifier*&emsp;`(`&emsp;`)`<br>
&emsp;&emsp;&emsp;&emsp;*FunctionIdentifier*&emsp;`(`&emsp;*FunctionArguments*&emsp;`)`

Alternatives are normally listed on separate lines, though in cases where there are many alternatives, the phrase "one of" might precede a list of expansions given on a single line. This is simply shorthand for listing each of the alternatives on separate lines.

For example, the production:

&emsp;&emsp;*DecimalDigit* **:** **one of**<br>
&emsp;&emsp;&emsp;&emsp;`0`&emsp;`1`&emsp;`2`&emsp;`3`&emsp;`4`&emsp;`5`&emsp;`6`&emsp;`7`&emsp;`8`&emsp;`9`

is shorthand for:

&emsp;&emsp;*DecimalDigit* **:**<br>
&emsp;&emsp;&emsp;&emsp;`0`<br>
&emsp;&emsp;&emsp;&emsp;`1`<br>
&emsp;&emsp;&emsp;&emsp;`2`<br>
&emsp;&emsp;&emsp;&emsp;`3`<br>
&emsp;&emsp;&emsp;&emsp;`4`<br>
&emsp;&emsp;&emsp;&emsp;`5`<br>
&emsp;&emsp;&emsp;&emsp;`6`<br>
&emsp;&emsp;&emsp;&emsp;`7`<br>
&emsp;&emsp;&emsp;&emsp;`8`<br>
&emsp;&emsp;&emsp;&emsp;`9`

### Lexical analysis

The lexical-unit production defines the lexical grammar for a Power Fx expression. Every valid Power Fx expression conforms to this grammar.

&emsp;&emsp;<a name="ExpressionUnit"></a>*ExpressionUnit* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[ExpressionElements](#ExpressionElements)*<sub>opt</sub><br>

&emsp;&emsp;<a name="ExpressionElements"></a>*ExpressionElements* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[ExpressionElement](#ExpressionElement)*<br>
&emsp;&emsp;&emsp;&emsp;*[ExpressionElement](#ExpressionElement)*&emsp;*[ExpressionElements](#ExpressionElements)*<sub>opt</sub><br>

&emsp;&emsp;<a name="ExpressionElement"></a>*ExpressionElement* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[Whitespace](#Whitespace)*<br>
&emsp;&emsp;&emsp;&emsp;*[Comment](#Comment)*<br>
<!--&emsp;&emsp;&emsp;&emsp;*[Token](#Token)*<br>-->

At the lexical level, a Power Fx expression consists of a stream of *Whitespace*, *Comment*, and *Token* elements. Each of these productions is covered in the following sections. Only *Token* elements are significant in the syntactic grammar.

### Whitespace

Whitespace is used to separate comments and tokens within a Power Apps document.

&emsp;&emsp;<a name="Whitespace"></a>*Whitespace* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode Space separator (class Zs)<br>
&emsp;&emsp;&emsp;&emsp;any Unicode Line separator (class Zl)<br>
&emsp;&emsp;&emsp;&emsp;any Unicode Paragraph separator (class Zp)<br>
&emsp;&emsp;&emsp;&emsp;Horizontal tab character (U+0009)<br>
&emsp;&emsp;&emsp;&emsp;Line feed character (U+000A)<br>
&emsp;&emsp;&emsp;&emsp;Vertical tab character (U+000B)<br>
&emsp;&emsp;&emsp;&emsp;Form feed character (U+000C)<br>
&emsp;&emsp;&emsp;&emsp;Carriage return character (U+000D)<br>
&emsp;&emsp;&emsp;&emsp;Next line character (U+0085)<br>

### Comments

Two forms of comments are supported:

- Single-line comments that start with the characters `//` and extend to the end of the source line.
- Delimited comments that start with the characters `/*` and end with the characters `*/`. Delimited comments can span multiple lines.

&emsp;&emsp;<a name="Comment"></a>*Comment* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[DelimitedComment](#DelimitedComment)*<br>
&emsp;&emsp;&emsp;&emsp;*[SingleLineComment](#SingleLineComment)*<br>

&emsp;&emsp;<a name="SingleLineComment"></a>*SingleLineComment* **:**<br>
&emsp;&emsp;&emsp;&emsp;`//`&emsp;*[SingleLineCommentCharacters](#SingleLineCommentCharacters)*<sub>opt</sub><br>

&emsp;&emsp;<a name="SingleLineCommentCharacters"></a>*SingleLineCommentCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[SingleLineCommentCharacter](#SingleLineCommentCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;*[SingleLineCommentCharacter](#SingleLineCommentCharacter)*&emsp;*[SingleLineCommentCharacters](#SingleLineCommentCharacters)*<sub>opt</sub><br>

&emsp;&emsp;<a name="SingleLineCommentCharacter"></a>*SingleLineCommentCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode characters except a NewLineCharacter<br>

&emsp;&emsp;<a name="DelimitedComment"></a>*DelimitedComment* **:**<br>
&emsp;&emsp;&emsp;&emsp;`/*`&emsp;*[DelimitedCommentCharacters](#DelimitedCommentCharacters)*<sub>opt</sub>&emsp;`*/`<br>

&emsp;&emsp;<a name="DelimitedCommentCharacters"></a>*DelimitedCommentCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[DelimitedCommentCharactersNoAsterisk](#DelimitedCommentCharactersNoAsterisk)*&emsp;*[DelimitedCommentCharacters](#DelimitedCommentCharacters)*<sub>opt</sub><br>
&emsp;&emsp;&emsp;&emsp;`*`&emsp;*[DelimitedCommentAfterAsteriskCharacters](#DelimitedCommentAfterAsteriskCharacters)*<br>

&emsp;&emsp;<a name="DelimitedCommentAfterAsteriskCharacters"></a>*DelimitedCommentAfterAsteriskCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[DelimitedCommentNoSlashAsteriskCharacter](#DelimitedCommentNoSlashAsteriskCharacter)*&emsp;*[DelimitedCommentCharacters](#DelimitedCommentCharacters)*<sub>opt</sub><br>
&emsp;&emsp;&emsp;&emsp;`*`&emsp;*[DelimitedCommentAfterAsteriskCharacters](#DelimitedCommentAfterAsteriskCharacters)*<br>

&emsp;&emsp;<a name="DelimitedCommentCharactersNoAsterisk"></a>*DelimitedCommentCharactersNoAsterisk* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character except * (asterisk)<br>

&emsp;&emsp;<a name="DelimitedCommentNoSlashAsteriskCharacter"></a>*DelimitedCommentNoSlashAsteriskCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character except a / (slash) or * (asterisk)<br>

Comments aren't nested. The character sequences `/*` and `*/` have no special meaning within a single-line comment, and the character sequences `//` and `/*` have no special meaning within a delimited comment.

Comments aren't processed within text-literal strings.

The following example includes two delimited comments:

```power-fx
/* Hello, world
*/
"Hello, world"    /* This is an example of a text literal */
```

The following examples include three single-line comments:

```power-fx
// Hello, world
//
"Hello, world"    // This is an example of a text literal
```

### Literals

A *literal* is a source code representation of a value.

&emsp;&emsp;<a name="Literal"></a>*Literal* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[LogicalLiteral](#LogicalLiteral)*<br>
&emsp;&emsp;&emsp;&emsp;*[NumberLiteral](#NumberLiteral)*<br>
&emsp;&emsp;&emsp;&emsp;*[TextLiteral](#TextLiteral)*<br>

#### Logical literals

A *logical literal* is used to write the values true and false, and produce a logical value.

&emsp;&emsp;<a name="LogicalLiteral"></a>*LogicalLiteral* **:** **one of**<br>
&emsp;&emsp;&emsp;&emsp;`true`&emsp;`false`<br>

#### Number literals

A *number literal* is used to write a numeric value and produce a number value.

&emsp;&emsp;<a name="NumberLiteral"></a>*NumberLiteral* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[DecimalDigits](#DecimalDigits)*&emsp;*[ExponentPart](#ExponentPart)*<sub>opt</sub><br>
&emsp;&emsp;&emsp;&emsp;*[DecimalDigits](#DecimalDigits)*&emsp;*[DecimalSeparator](#DecimalSeparator)*&emsp;*[DecimalDigits](#DecimalDigits)*<sub>opt</sub>&emsp;*[ExponentPart](#ExponentPart)*<sub>opt</sub><br>
&emsp;&emsp;&emsp;&emsp;*[DecimalSeparator](#DecimalSeparator)*&emsp;*[DecimalDigits](#DecimalDigits)*&emsp;*[ExponentPart](#ExponentPart)*<sub>opt</sub><br>

&emsp;&emsp;<a name="DecimalDigits"></a>*DecimalDigits* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[DecimalDigit](#DecimalDigit)*<br>
&emsp;&emsp;&emsp;&emsp;*[DecimalDigits](#DecimalDigits)*&emsp;*[DecimalDigit](#DecimalDigit)*<br>

&emsp;&emsp;<a name="DecimalDigit"></a>*DecimalDigit* **:** **one of**<br>
&emsp;&emsp;&emsp;&emsp;`0`&emsp;`1`&emsp;`2`&emsp;`3`&emsp;`4`&emsp;`5`&emsp;`6`&emsp;`7`&emsp;`8`&emsp;`9`<br>

&emsp;&emsp;<a name="ExponentPart"></a>*ExponentPart* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[ExponentIndicator](#ExponentIndicator)*&emsp;*[Sign](#Sign)*<sub>opt</sub>&emsp;*[DecimalDigits](#DecimalDigits)*<br>

&emsp;&emsp;<a name="ExponentIndicator"></a>*ExponentIndicator* **:** **one of**<br>
&emsp;&emsp;&emsp;&emsp;`e`&emsp;`E`<br>

&emsp;&emsp;<a name="Sign"></a>*Sign* **:** **one of**<br>
&emsp;&emsp;&emsp;&emsp;`+`&emsp;`-`<br>

#### Text literals

A *text literal* is used to write a sequence of Unicode characters and produce a text value. Text literals are enclosed in double quotation marks. To include double quotation marks in the text value, repeat the double quotation marks, as shown in the following example:

```power-fx
"The ""quoted"" text" // The "quoted" text
```

&emsp;&emsp;<a name="TextLiteral"></a>*TextLiteral* **:**<br>
&emsp;&emsp;&emsp;&emsp;`"`&emsp;*[TextLiteralCharacters](#TextLiteralCharacters)*<sub>opt</sub>&emsp;`"`<br>

&emsp;&emsp;<a name="TextLiteralCharacters"></a>*TextLiteralCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[TextLiteralCharacter](#TextLiteralCharacter)*&emsp;*[TextLiteralCharacters](#TextLiteralCharacters)*<sub>opt</sub><br>

&emsp;&emsp;<a name="TextLiteralCharacter"></a>*TextLiteralCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[TextCharacterNoDoubleQuote](#TextCharacterNoDoubleQuote)*<br>
&emsp;&emsp;&emsp;&emsp;*[DoubleQuoteEscapeSequence](#DoubleQuoteEscapeSequence)*<br>

&emsp;&emsp;<a name="TextCharacterNoDoubleQuote"></a>*TextCharacterNoDoubleQuote* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode code point except double quote<br>

&emsp;&emsp;<a name="DoubleQuoteEscapeSequence"></a>*DoubleQuoteEscapeSequence* **:**<br>
&emsp;&emsp;&emsp;&emsp;`"`&emsp;`"`<br>

## Identifiers

An *identifier* is a name used to refer to a value. Identifiers can either be regular identifiers or single quoted identifiers.

&emsp;&emsp;<a name="Identifier"></a>*Identifier* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[IdentifierName](#IdentifierName)* **but** **not** *[Operator](#Operator)* **or** *[ContextKeyword](#ContextKeyword)*<br>

&emsp;&emsp;<a name="IdentifierName"></a>*IdentifierName* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[IdentifierStartCharacter](#IdentifierStartCharacter)*&emsp;*[IdentifierContinueCharacters](#IdentifierContinueCharacters)*<sub>opt</sub><br>
&emsp;&emsp;&emsp;&emsp;`'`&emsp;*[SingleQuotedIdentifier](#SingleQuotedIdentifier)*&emsp;`'`<br>

&emsp;&emsp;<a name="IdentifierStartCharacter"></a>*IdentifierStartCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[LetterCharacter](#LetterCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;`_`<br>

&emsp;&emsp;<a name="IdentifierContinueCharacter"></a>*IdentifierContinueCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[IdentifierStartCharacter](#IdentifierStartCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;*[DecimalDigitCharacter](#DecimalDigitCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;*[ConnectingCharacter](#ConnectingCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;*[CombiningCharacter](#CombiningCharacter)*<br>
&emsp;&emsp;&emsp;&emsp;*[FormattingCharacter](#FormattingCharacter)*<br>

&emsp;&emsp;<a name="IdentifierContinueCharacters"></a>*IdentifierContinueCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[IdentifierContinueCharacter](#IdentifierContinueCharacter)*&emsp;*[IdentifierContinueCharacters](#IdentifierContinueCharacters)*<sub>opt</sub><br>

&emsp;&emsp;<a name="LetterCharacter"></a>*LetterCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Uppercase letter** (**Lu**) or **Lowercase letter** (**Ll**)<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Titlecase letter** (**Lt**)<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Letter modifier** (**Lm**) or **Letter other** (**Lo**)<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Number letter** (**Nl**)<br>

&emsp;&emsp;<a name="CombiningCharacter"></a>*CombiningCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Non-spacing mark** (**Mn**) or **Spacing combining mark** (**Mc**)<br>

&emsp;&emsp;<a name="DecimalDigitCharacter"></a>*DecimalDigitCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Decimal digit** (**Nd**)<br>

&emsp;&emsp;<a name="ConnectingCharacter"></a>*ConnectingCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Connector punctuation** (**Pc**)<br>

&emsp;&emsp;<a name="FormattingCharacter"></a>*FormattingCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character of the class **Format** (**Cf**)<br>

### Single quoted identifiers

A *single quoted identifier* can contain any sequence of Unicode characters to be used as an identifier, including keywords, whitespace, comments, and operators. Single quotation mark characters are supported with an escape sequence of two single quotation marks.

&emsp;&emsp;<a name="SingleQuotedIdentifier"></a>*SingleQuotedIdentifier* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[SingleQuotedIdentifierCharacters](#SingleQuotedIdentifierCharacters)*<br>

&emsp;&emsp;<a name="SingleQuotedIdentifierCharacters"></a>*SingleQuotedIdentifierCharacters* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[SingleQuotedIdentifierCharacter](#SingleQuotedIdentifierCharacter)*&emsp;*[SingleQuotedIdentifierCharacters](#SingleQuotedIdentifierCharacters)*<sub>opt</sub><br>

&emsp;&emsp;<a name="SingleQuotedIdentifierCharacter"></a>*SingleQuotedIdentifierCharacter* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[TextCharactersNoSingleQuote](#TextCharactersNoSingleQuote)*<br>
&emsp;&emsp;&emsp;&emsp;*[SingleQuoteEscapeSequence](#SingleQuoteEscapeSequence)*<br>

&emsp;&emsp;<a name="TextCharactersNoSingleQuote"></a>*TextCharactersNoSingleQuote* **:**<br>
&emsp;&emsp;&emsp;&emsp;any Unicode character except ' (U+0027)<br>

&emsp;&emsp;<a name="SingleQuoteEscapeSequence"></a>*SingleQuoteEscapeSequence* **:**<br>
&emsp;&emsp;&emsp;&emsp;`'`&emsp;`'`<br>

### Disambiguated identifier

&emsp;&emsp;<a name="DisambiguatedIdentifier"></a>*DisambiguatedIdentifier:*<br>
&emsp;&emsp;&emsp;&emsp;*[TableColumnIdentifier](#TableColumnIdentifier)*<br>
&emsp;&emsp;&emsp;&emsp;*[GlobalIdentifier](#GlobalIdentifier)*<br>

&emsp;&emsp;<a name="TableColumnIdentifier"></a>*TableColumnIdentifier* **:**<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*&emsp;`[@`&emsp;*[Identifier](#Identifier)*&emsp;`]`<br>

&emsp;&emsp;<a name="GlobalIdentifier"></a>*GlobalIdentifier:*<br>
&emsp;&emsp;&emsp;&emsp;`[@`&emsp;*[Identifier](#Identifier)*&emsp;`]`<br>

### Context keywords

&emsp;&emsp;<a name="ContextKeyword"></a>*ContextKeyword:*<br>
&emsp;&emsp;&emsp;&emsp;`Parent`<br>
&emsp;&emsp;&emsp;&emsp;`Self`<br>
&emsp;&emsp;&emsp;&emsp;`ThisItem`<br>
&emsp;&emsp;&emsp;&emsp;`ThisRecord`<br>

### Case sensitivity

Power Apps identifiers are case-sensitive. The authoring tool will automatically change them to the correct case when a formula is being written.

## Separators

&emsp;&emsp;<a name="DecimalSeparator"></a>*DecimalSeparator:*<br>
&emsp;&emsp;&emsp;&emsp;`.` (dot) for languages that use a dot as the separator for decimal numbers, for example `1.23`<br>
&emsp;&emsp;&emsp;&emsp;`,` (comma) for languages that use a comma as the separator for decimal numbers, for example `1,23`<br>

&emsp;&emsp;<a name="ListSeparator"></a>*ListSeparator:*<br>
&emsp;&emsp;&emsp;&emsp;`,` (comma) if *[DecimalSeparator](#DecimalSeparator)* is `.` (dot)<br>
&emsp;&emsp;&emsp;&emsp;`;` (semicolon) if *[DecimalSeparator](#DecimalSeparator)* is `,` (comma)<br>

&emsp;&emsp;<a name="ChainingSeparator"></a>*ChainingSeparator:*<br>
&emsp;&emsp;&emsp;&emsp;`;` (semicolon) if *[DecimalSeparator](#DecimalSeparator)* is `.` (dot)<br>
&emsp;&emsp;&emsp;&emsp;`;;` (double semicolon) if *[DecimalSeparator](#DecimalSeparator)* is `,` (comma)<br>

## Operators

Operators are used in formulas to describe operations involving one or more operands. For example, the expression `a + b` uses the `+` operator to add the two operands `a` and `b`.

&emsp;&emsp;<a name="Operator"></a>*Operator:*<br>
&emsp;&emsp;&emsp;&emsp;*[BinaryOperator](#BinaryOperator)*<br>
&emsp;&emsp;&emsp;&emsp;*[BinaryOperatorRequiresWhitespace](#BinaryOperatorRequiresWhitespace)*<br>
&emsp;&emsp;&emsp;&emsp;*[PrefixOperator](#PrefixOperator)*<br>
&emsp;&emsp;&emsp;&emsp;*[PrefixOperatorRequiresWhitespace](#PrefixOperatorRequiresWhitespace)*<br>
&emsp;&emsp;&emsp;&emsp;*[PostfixOperator](#PostfixOperator)*<br>

&emsp;&emsp;<a name="BinaryOperator"></a>*BinaryOperator:* **one of**<br>
&emsp;&emsp;&emsp;&emsp;`=`&emsp;`<`&emsp;`<=`&emsp;`>`&emsp;`>=`&emsp;`<>`<br>
&emsp;&emsp;&emsp;&emsp;`+`&emsp;`-`&emsp;`*`&emsp;`/`&emsp;`^`<br>
&emsp;&emsp;&emsp;&emsp;`&`<br>
&emsp;&emsp;&emsp;&emsp;`&&`&emsp;`||`<br>
&emsp;&emsp;&emsp;&emsp;`in`&emsp;`exactin`<br>

&emsp;&emsp;<a name="BinaryOperatorRequiresWhitespace"></a>*BinaryOperatorRequiresWhitespace:*<br>
&emsp;&emsp;&emsp;&emsp;`And`&emsp;*[Whitespace](#Whitespace)*<br>
&emsp;&emsp;&emsp;&emsp;`Or`&emsp;*[Whitespace](#Whitespace)*<br>

&emsp;&emsp;<a name="PrefixOperator"></a>*PrefixOperator:*<br>
&emsp;&emsp;&emsp;&emsp;`!`<br>

&emsp;&emsp;<a name="PrefixOperatorRequiresWhitespace"></a>*PrefixOperatorRequiresWhitespace:*<br>
&emsp;&emsp;&emsp;&emsp;`Not`&emsp;*[Whitespace](#Whitespace)*<br>

&emsp;&emsp;<a name="PostfixOperator"></a>*PostfixOperator:*<br>
&emsp;&emsp;&emsp;&emsp;`%`<br>

### Reference operator

&emsp;&emsp;<a name="ReferenceOperator"></a>*ReferenceOperator:* **one of**<br>
&emsp;&emsp;&emsp;&emsp;`.`&emsp;`!`<br>

### Object reference

&emsp;&emsp;<a name="Reference"></a>*Reference:*<br>
&emsp;&emsp;&emsp;&emsp;*[BaseReference](#BaseReference)*<br>
&emsp;&emsp;&emsp;&emsp;*[BaseReference](#BaseReference)*&emsp;*[ReferenceOperator](#ReferenceOperator)*&emsp;*[ReferenceList](#ReferenceList)*<br>

&emsp;&emsp;<a name="BaseReference"></a>*BaseReference:*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*<br>
&emsp;&emsp;&emsp;&emsp;*[DisambiguatedIdentifier](#DisambiguatedIdentifier)*<br>
&emsp;&emsp;&emsp;&emsp;*[ContextKeyword](#ContextKeyword)*<br>

&emsp;&emsp;<a name="ReferenceList"></a>*ReferenceList:*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*&emsp;*[ReferenceOperator](#ReferenceOperator)*&emsp;*[ReferenceList](#ReferenceList)*<br>

### Inline record

&emsp;&emsp;<a name="InlineRecord"></a>*InlineRecord:*<br>
&emsp;&emsp;&emsp;&emsp;`{`&emsp;*[InlineRecordList](#InlineRecordList)*<sub>opt</sub>&emsp;`}`<br>

&emsp;&emsp;<a name="InlineRecordList"></a>*InlineRecordList:*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*&emsp;`:`&emsp;*[Expression](#Expression)*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*&emsp;`:`&emsp;*[Expression](#Expression)*&emsp;*[ListSeparator](#ListSeparator)*&emsp;*[InlineRecordList](#InlineRecordList)*<br>

### Inline table

&emsp;&emsp;<a name="InlineTable"></a>*InlineTable:*<br>
&emsp;&emsp;&emsp;&emsp;`[`&emsp;*[InlineTableList](#InlineTableList)*<sub>opt</sub>&emsp;`]`<br>

&emsp;&emsp;<a name="InlineTableList"></a>*InlineTableList:*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*&emsp;*[ListSeparator](#ListSeparator)*&emsp;*[InlineTableList](#InlineTableList)*<br>

## Expression

&emsp;&emsp;<a name="Expression"></a>*Expression:*<br>
&emsp;&emsp;&emsp;&emsp;*[Literal](#Literal)*<br>
&emsp;&emsp;&emsp;&emsp;*[Reference](#Reference)*<br>
&emsp;&emsp;&emsp;&emsp;*[InlineRecord](#InlineRecord)*<br>
&emsp;&emsp;&emsp;&emsp;*[InlineTable](#InlineTable)*<br>
&emsp;&emsp;&emsp;&emsp;*[FunctionCall](#FunctionCall)*<br>
&emsp;&emsp;&emsp;&emsp;`(`&emsp;*[Expression](#Expression)*&emsp;`)`<br>
&emsp;&emsp;&emsp;&emsp;*[PrefixOperator](#PrefixOperator)*&emsp;*[Expression](#Expression)*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*&emsp;*[PostfixOperator](#PostfixOperator)*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*&emsp;*[BinaryOperator](#BinaryOperator)*&emsp;*[Expression](#Expression)*<br>

### Chained expressions

&emsp;&emsp;<a name="ChainedExpression"></a>*ChainedExpression:*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*<br>
&emsp;&emsp;&emsp;&emsp;*[Expression](#Expression)*&emsp;*[ChainingSeparator](#ChainingSeparator)*&emsp;*[ChainedExpression](#ChainedExpression)*<sub>opt</sub><br>

### Function call

&emsp;&emsp;<a name="FunctionCall"></a>*FunctionCall:*<br>
&emsp;&emsp;&emsp;&emsp;*[FunctionIdentifier](#FunctionIdentifier)*&emsp;`(`&emsp;*[FunctionArguments](#FunctionArguments)*<sub>opt</sub>&emsp;`)`<br>

&emsp;&emsp;<a name="FunctionIdentifier"></a>*FunctionIdentifier:*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*<br>
&emsp;&emsp;&emsp;&emsp;*[Identifier](#Identifier)*&emsp;`.`&emsp;*[FunctionIdentifier](#FunctionIdentifier)*<br>

&emsp;&emsp;<a name="FunctionArguments"></a>*FunctionArguments:*<br>
&emsp;&emsp;&emsp;&emsp;*[ChainedExpression](#ChainedExpression)*<br>
&emsp;&emsp;&emsp;&emsp;*[ChainedExpression](#ChainedExpression)*&emsp;*[ListSeparator](#ListSeparator)*&emsp;*[FunctionArguments](#FunctionArguments)*<br>

---

## Microsoft Power Fx YAML Formula Grammar | Microsoft Docs

Source: [yaml-formula-grammar.md](https://learn.microsoft.com/en-us/power-platform/power-fx/yaml-formula-grammar)

*Microsoft Power Fx YAML formula syntax*

# Power Fx YAML formula grammar

> [!NOTE]
> Microsoft Power Fx is the new name for the formula language for canvas apps. These articles are a work in progress as we extract the language from canvas apps, integrate it with other Microsoft Power Platform products, and make it available as open source. Start with the [Microsoft Power Fx overview](overview.md) for an introduction to the language.

Microsoft Power Fx has a well-established grammar for expressions based on Excel. However, when used in Power Apps and other hosts where UI provides the name-to-expression binding for a formula, there is no standard way of editing the formula binding as text.

We've selected the industry standard [YAML](https://yaml.org/spec/1.2/spec.html) as our language for this binding. There are already a large number of editors, tools, and libraries for working with YAML. This article describes how we represent formulas in YAML.

At this time, we support only a restricted subset of YAML. Only the constructs described in this article are supported.

Not everything that defines a canvas app is represented here; additional information flows through other files that the tool produces and consumes.

## Leading equal sign

First and foremost, all expressions must begin with a leading equal sign `=`:

```
Visible: =true
X: =34
Text: |
	="Hello, " &
	"World"
```

We use the `=` in this manner for three reasons:

- It's consistent with Excel, which uses a leading `=` to bind an expression to a cell.
- It effectively escapes the formula language's syntax so that YAML doesn't attempt to parse it. Normally, YAML would treat `text: 1:00` as minutes and seconds, converting it to a number. By inserting an `=`, YAML won't use its implicit typing rules and formulas won't be harmed. Using `=` covers most cases, but not all, and those exceptions are described in the following section, [Single-line formulas](#single-line-formulas).
- In the future, we will support both formulas (starts with `=`) and non-formulas (no `=`) in the same file, just as Excel does We can do this in YAML and non-YAML files alike across Microsoft Power Platform source files. Anywhere a formula is supported, the leading `=` differentiates a Power Apps formula expression from a static scalar value.

## Single-line formulas

Single-line formulas are written in the form:

*Name* `:` `SPACE` `=` *Expression*

The space between the colon and the equal sign is required to be YAML-compliant. The equal sign disrupts YAML's normal interpretation of the expression, allowing the rest of the line to be interpreted as Power Fx.
For example:

```
Text1: ="Hello, World"
Text2: ="Hello " & ", " & "World"
Number1: =34
Boolean1: =true
Time1: =1:34
```

The number sign `#` and colon `:` aren't allowed anywhere in single-line formulas, even if they're in a quoted text string or identifier name. To use a number sign or colon, you must express the formula as a multiline formula. The number sign is interpreted as a comment in YAML, and the colon is interpreted as a new name map in YAML. To add a comment to a single-line comment, use the Power Fx line comment starting with `//`.

Using normal YAML escaping with single quotes and C-like backslashes isn't supported; use a multiline formula instead. This is for consistency and to facilitate cut/paste between the formula bar in Power Apps Studio and YAML source files.

See the canvas apps [operators and identifiers](reference/operators.md) documentation for details on allowed names and the structure of an expression.

## Multiline formulas

Formulas can span multiple lines by using YAML's block scalar indicators:  

*Name* `:` `SPACE` ( `|` or `|+` or `|-` )
&emsp;`=` *Expression-Line*
&emsp;*Expression-Line*
&emsp;...

All lines that are a part of the block must be indented at least one space in from the level of the first line.

For example:

```
Text1: |
    ="Hello, World"
Text2: |
    ="Hello" &
    "," &
    "World"
```

All forms of YAML multiline scalar notations are accepted on import, including `>+`, for example. However, to ensure that whitespace is properly preserved, only `|`, `|+`, or `|-` are produced.

## Component instance

Components are instanced by using YAML object notation. The type of the object is established with the `As` operator as a part of the left-side YAML tag. For container controls, objects can be nested.

*Name*&emsp;`As`&emsp;*Component-Type*&emsp;[ `.`&emsp;*Component-Template* ]&emsp;`:`
&emsp;( *Single-Line-Formula* or *Multi-Line-Formula* or *Object-instance* )
&emsp;...

All lines that are a part of the block must be indented at least one space in from the level of the first line.

For example:

```
Gallery1 As Gallery.horizontalGallery:
    Fill: = Color.White
    Label1 As Label:
        Text: ="Hello, World"
        X: =20
        Y: =40
        Fill: |
            =If( Lower( Left( Self.Text, 6 ) ) = "error:",
                Color.Red,
                Color.Black
            ) 
```

*Component-Type* can be any canvas component or control. Base types, such as *Number*, aren't supported.

*Component-Template* is an optional specifier for components that have different templates, such as the Gallery. Not all components have templates.

If *Name* contains special characters and is wrapped with single quotation marks, the entire phrase to the left side of the colon will need to be escaped. This can be done in one of the following ways: 

- Use single quotation marks to wrap the entire left side, which requires that the existing single quotation marks be used twice:
    ```
    '''A name with a space'' As Gallery':
    ```
- Use double quotation marks to wrap the entire left side, but be sure that there are no double quotation marks in the name:
    ```
    "'A name with a space' As Gallery":
    ```

## Component definition

Similarly, components are defined by creating an instance of one of the supported base types. The base types can't be instanced directly. Within an object definition, properties can be added to what the base type provides.

The supported base types are: CanvasComponent

### Simple property definition

Components use properties to communicate with the app in which they're hosted.

*Name* `:` ( *Single-Line-Expression* or *Multi-Line-Expression* )

The type of the formula is implied by the type of the expression.

For input properties, the expression provides the default to be inserted into the app when the component is instanced. The maker can modify this expression as they see fit, but can't change the type.

For output properties, the expression provides the calculation to be performed. The maker can't modify this expression, it's encapsulated in the component. 

At this time, all properties are data flow only and can't contain side effects.

At this time, additional metadata about the property isn't defined here but is instead defined in the other files of the `.msapp` file, for example the property's description. 

For example:

```
DateRangePicker As CanvasComponent:
    DefaultStart: |-
		=// input property, customizable default for the component instance
		Now()                      
    DefaultEnd: |-
		=// input property, customizable default for the component instance
		DateAdd( Now(), 1, Days )    
    SelectedStart: =DatePicker1.SelectedDate   // output property
    SelectedEnd: =DatePicker2.SelectedDate     // output property
```

## YAML compatibility 

### YAML comments

YAML line comments delimited by the number sign `#` aren't preserved anywhere in the source format. Instead, within a formula, delimit line comments with `//` characters or block comments with `/*` and `*/`. More information: [Comments](expression-grammar.md#comments)

### Errors for common pitfalls

There are a few places where the Power Fx and YAML grammars are incompatible or might be confusing for a user. In these cases, an error is thrown.

For example, in the following:

```
Text: ="Hello #PowerApps"
Record: ={ a: 1, b: 2 }
```

the number sign `#` is treated as a comment by YAML, even though it's embedded in what Excel considers a text string (wrapped by double quotation marks). To avoid confusion, this case will throw an error during import. A YAML multiline form can be used instead.

In the case of the value for `record`, YAML considers `a:` and `b:` to be another name map binding. YAML allows the same name map to be reused, with the last one silently overriding any previous definitions. Because this can be confusing for a low-code maker and can result in the loss of a property formula, an error is thrown if the same name is encountered twice.

---

