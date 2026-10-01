# Power Apps Guidance — Coding Guidelines & Co-Developing Apps

Verbatim Markdown pulled directly from Microsoft's published documentation source (`MicrosoftDocs/powerapps-docs`, the `guidance/` docset — a sibling of the `maker/` tree not reached by the original canvas-apps TOC crawl, found via web search while answering a question about UX/layout guidance), snapshot dated 20 September 2026. Covers app design guidelines (modern controls, forms, containers, galleries, PCF), responsive design guidelines, code readability/optimization/error-handling/monitoring, and the co-development (multi-author) guidance.

Pages in this file: 11

## Contents

1. [Power Apps coding guidelines](#power-apps-coding-guidelines)
2. [Power Apps application design guidelines](#power-apps-application-design-guidelines)
3. [Responsive design guidelines in Power Apps](#responsive-design-guidelines-in-power-apps)
4. [Code readability best practices](#code-readability-best-practices)
5. [Power Apps code optimization](#power-apps-code-optimization)
6. [Error handling in Power Apps](#error-handling-in-power-apps)
7. [Testing and monitoring in Power Apps](#testing-and-monitoring-in-power-apps)
8. [Best practices: Collaborating and co-developing apps using Power Apps](#best-practices-collaborating-and-co-developing-apps-using-power-apps)
9. [Establishing a collaboration model | Microsoft Docs](#establishing-a-collaboration-model-microsoft-docs)
10. [Co-development governance | Microsoft Docs](#co-development-governance-microsoft-docs)
11. [Try community solutions and tools | Microsoft Docs](#try-community-solutions-and-tools-microsoft-docs)

---

## Power Apps coding guidelines

Source: [coding-guidelines_overview.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/overview)

*Learn best practices and coding guidelines for developing Power Apps that are consistent, performant, and maintainable.*

# Power Apps coding guidelines

Creating a simple canvas app is straightforward, but as the application's complexity grows, maintaining high code quality becomes essential. These guidelines describe standards for naming objects, collections, and variables, and provide recommendations for developing consistent, performant, and easily maintainable apps.

The guidelines offer essential guidance for developers who design, build, test, deploy, and maintain Power Apps apps in various environments, including small businesses, corporations, and government entities.



## Next step

> [!div class="nextstepaction"]
> [App design guidelines](app-design-guidelines.md)

---

## Power Apps application design guidelines

Source: [coding-guidelines_app-design-guidelines.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/app-design-guidelines)

*Discover best practices for designing user-friendly Power Apps. Learn about modern controls, form design, gallery optimization, and reusable components to create impactful business solutions.*

# App design guidelines

Designing effective and user-friendly Power Apps is essential for creating impactful business solutions. This guide provides best practices and recommendations for designing Power Apps, focusing on modern controls, form design, container usage, gallery optimization, and building reusable components.

## Modern controls

Modern controls in canvas apps represent a significant advancement in the development and design of user interfaces within the Microsoft ecosystem. Based on Microsoft's Fluent Design System, these controls are designed to deliver a fast, performance-oriented, and accessible user experience, all while ensuring seamless integration with theming capabilities. The introduction of these controls, including tab lists, progress bars, info buttons, spinners, and more, underscores a strategic shift towards creating more intuitive, responsive, and visually appealing applications. By using these modern controls, developers can easily implement sophisticated user interface (UI) elements that are both aesthetically pleasing and functionally rich, enhancing the overall user engagement and satisfaction.

The inherent design of these controls, keeping theming in mind, allows for a unified and consistent look and feel across applications, significantly reducing the effort required in customizing and branding apps. The ability to automatically update the styles of all controls based on the set theme simplifies the design process and ensures that applications remain visually coherent throughout. This approach aligns with the needs of modern businesses seeking to maintain brand consistency while offering high-quality digital experiences. The modern controls also emphasize accessibility and performance, ensuring that applications are usable by a wide range of audiences, including those with disabilities, aligning with inclusive design principles. As such, the modern controls in canvas apps aren't just a set of UI components but a transformative toolset that empowers developers to build more efficient, maintainable, accessible, and cohesive applications that meet the evolving needs of businesses and users alike.

> [!IMPORTANT]
> While a subset of the modern controls in canvas apps is generally available (GA), the broader feature set remains in preview. Explore and provide feedback on these preview controls. However, keep in mind that features and functionalities might change based on feedback and testing before they reach general availability.

## Forms design and guidelines

This section provides best practices for designing forms in Power Apps, including organizing your form, reusing forms, form modes, and control placement.

### Organize your form

- Divide your form into logical sections and group related fields together.
- Aim to keep your form on a single screen. If it's lengthy, consider dividing it into multiple screens, steps, or tabs.
- Use clear and simple language for field labels and avoid unfamiliar terms or jargon.
- Implement validation rules to ensure data accuracy. For mandatory fields, clearly indicate that they're required. Validate email addresses, phone numbers, and other formats as needed.

### Reuse forms

- Use a single form for creating new records, editing existing records, and displaying records in view-only mode.
- Reuse the same form to reduce development and maintenance time while ensuring consistency.

### Form modes

Set the form mode dynamically based on user actions. For example:

- When creating a new record, set the form to "New" mode.
- When editing an existing record, set the form to "Edit" mode.
- When displaying a record, set the form to "View" mode.

### Control placement

- Place different controls (such as gallery, display form, and edit form) on separate screens to make them distinguishable.
- Combine these controls with formulas to create a cohesive user experience.

## Containers

As the canvas app grows to address more business scenarios, the number of controls increases, and you need to organize the controls based on their function. One way to do this is to group the controls. However, grouping controls isn't always recommended. The canvas app `Container` control holds a set of controls and has its own properties.

Containers function as empty spaces where you can insert and organize controls in relation to the top-left corner of the container. You can nest containers, allowing you to create more complex layouts and manage related controls together.

Containers are actual controls with their own properties like `Width` and `BorderColor`. Containers affect app layout and help screen reader users understand the structure of the app.

While you can add any controls in a group, you should only add logically related controls in a container.

Organizing elements in Power Apps using groups allows users to apply shared properties to multiple elements. However, making individual property changes within a group might require manual adjustments. Groups aren't part of the logical structure of an app for accessibility reasons because screen readers can't recognize them. The inability to nest groups also makes creating intricate layouts challenging.

## Gallery design and guidelines

The Gallery control in Power Apps allows you to display and interact with data. Keep the following best practices in mind when designing galleries to ensure optimal performance and user experience.

- **Avoid changing gallery items from within**: Don't modify the `Items` property of a gallery within child controls' events like `OnChange` or `OnSelect`. This action can cause unexpected behavior, especially when dealing with controls that trigger events when their values change.

- **Be cautious with OnChange triggered controls**: Be cautious when using controls like Combo box, Date picker, Slider, or Toggle in galleries. These controls might trigger the `OnChange` event unexpectedly, which can lead to potential issues like infinite loops.

- **Assess performance impact on patching**: Consider the performance impact when patching or updating items in a gallery, especially when dealing with many items. Patching can be slow, and the gallery might reload all items, which affects performance.

- **Handle infinite loops with care**: If modifying gallery data triggers events that lead to infinite loops, use modern controls or controls that don't trigger `OnChange` when their data changes to break the loop.

- **Avoid nested galleries**: Nested galleries can lead to performance issues and complex data binding. Whenever possible, avoid nesting galleries. Instead, try to design your data structure and use functions in an optimized way.

- **Use flexible height galleries**: Fixed-height galleries might limit content visibility, especially when dealing with dynamic data. Use flexible height galleries by setting the `Height` property to `Parent.Height` or a dynamic value based on your data. This setting ensures that the gallery adjusts its height to accommodate varying amounts of data.

    :::image type="content" source="media/image11.png" alt-text="Screenshot of Power Apps Studio with Blank flexible height gallery highlighted.":::

- **Optimize data loading**: When you optimize data loading in Power Apps, fetch and display only the necessary columns in a gallery instead of retrieving the entire dataset.

    Here's an example of how you can achieve this optimization. Suppose you have a collection named `ProductSales` with multiple columns, but you want to display only the "ProductName" and "QuantitySold" columns in a gallery.

    ```powerappsfl
    // Collection named ProductSales with sample sales data
    
    ClearCollect(ProductSales, 
        Table(
            { ProductName: "Phone", UnitPrice: 499.99, QuantitySold: 100 },
            { ProductName: "Laptop", UnitPrice: 999.99, QuantitySold: 50 },
            { ProductName: "Tablet", UnitPrice: 299.99, QuantitySold: 75 }
        )
    )
    
    // Bind the gallery to display only the "ProductName" and "QuantitySold" columns
    
    Gallery1.Items = ShowColumns(ProductSales, ProductName, QuantitySold)
    ```

Learn more about [Gallery best practices](/power-apps/maker/canvas-apps/gallery-best-practice).

## Build reusable components with Power Apps Component Framework (PCF)

Power Platform enables you to create reusable components through the Power Apps Component Framework (PCF). Learn more in [Power Apps Component Framework overview](/power-apps/developer/component-framework/overview).

Consider creating PCF components in Power Apps for the following scenarios:

- **Complex UI elements**: You need to create complex user interface elements or controls that aren't readily available in the standard Power Apps controls.

- **Custom controls for specific requirements**: Your app has specific requirements that aren't met by the out-of-the-box controls, and you need to create custom controls tailored to your needs.

- **Consistent user experience across apps**: You want to maintain a consistent user experience across multiple Power Apps or environments by encapsulating specific functionalities within a PCF component.

- **Reusability across apps**: You anticipate the need to reuse a specific piece of functionality or user interface element in multiple apps. Creating a PCF component allows you to build once and reuse.

- **Implementing advanced logic**: You need to implement advanced business logic or calculations that are beyond the capabilities of standard formulas or functions in Power Apps.

- **Improved user experience**: You aim to enhance the overall user experience by creating visually appealing and interactive components that aren't achievable with the default controls.

## Next step

> [!div class="nextstepaction"]
> [Responsive design guidelines](responsive-design-guidelines.md)

---

## Responsive design guidelines in Power Apps

Source: [coding-guidelines_responsive-design-guidelines.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/responsive-design-guidelines)

*Learn best practices for designing responsive, accessible canvas apps that adapt to different screen sizes and orientations.*

# Responsive design guidelines

Responsive canvas apps adapt their layout and navigation to the available viewport instead of scaling a fixed canvas. Design responsive behavior intentionally so that the app remains usable in every supported window size, device orientation, zoom level, and input mode.

Each of the following guidelines is aimed at ensuring your canvas app provides an optimal user experience, regardless of the device's screen size or orientation. These guidelines address one of the most critical aspects of modern app development. These guidelines are instrumental for developers looking to enhance the accessibility and user engagement of their Power Apps.

## Adapt to screen sizes

Canvas apps should be designed to automatically adjust their layout and interface based on the device's screen size. This responsiveness ensures that the app remains functional and visually appealing across various devices, from smartphones to desktop computers.

## Use auto-layout containers

Use horizontal and vertical auto-layout containers as the primary structure for a responsive screen. These containers dynamically organize and align app components, making sure they respond effectively to changes in screen dimensions.

### Disable *Scale to Fit* and manage aspect ratio and orientation

Turn off the **Scale to Fit** setting to enable true app responsiveness. This setting prevents scaling and promotes natural layout adaptation to various screen sizes. Also, adjust the aspect ratio and **Lock Orientation** settings. These adjustments ensure that the app's layout effectively responds to different screen sizes and orientations. The app maintains a consistent and functional interface whether the device is in portrait or landscape mode.

### Use responsive layouts

Use layout designs like split-screen and sidebar, which offer different user experiences on various devices. This adaptability enhances the app's functionality, making it more intuitive for users on any device.

### Use formulas for dynamic layout

Use formulas instead of fixed coordinates for positioning and sizing controls. This approach ensures they adapt to changes in screen dimensions for a dynamic, responsive layout.

### Plan for various devices

Effective responsive design involves anticipating how the app looks and functions on different devices. This anticipation includes decisions about resizing elements or hiding them entirely on smaller screens to optimize space and maintain usability.

### Practical implementation

Transforming a nonresponsive canvas app into a responsive one requires a systematic approach. This approach involves adjusting settings for responsiveness and carefully configuring container properties to ensure elements within the app adapt to different screen sizes.

## Resources

- [Create responsive layouts in canvas apps](../../maker/canvas-apps/create-responsive-layout.md)
- [Building responsive canvas apps](../../maker/canvas-apps/build-responsive-apps.md)
- [Organize controls in accessible canvas apps](../../maker/canvas-apps/accessible-apps-structure.md)
- [Review a canvas app for accessibility](../../maker/canvas-apps/accessibility-checker.md)
- [Overview of modern controls and themes in canvas apps](../../maker/canvas-apps/controls/modern-controls/overview-modern-controls.md)
- [Recent updates to modern controls in canvas apps](../../maker/canvas-apps/controls/modern-controls/modern-control-updates.md)
- [Recommendations for optimizing layout](/power-platform/well-architected/experience-optimization/layout)

## Next step

> [!div class="nextstepaction"]
> [Code readability](code-readability.md)

---

## Code readability best practices

Source: [coding-guidelines_code-readability.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/code-readability)

*Learn how to improve Power Apps code readability with best practices for naming conventions, comments, and formatting.*

# Code readability

Code readability is an important aspect of app development that is often overlooked. Readable code is easier to understand, maintain, and debug.

## Naming conventions

Consistent naming conventions significantly improve the readability of your code. It helps you quickly identify the purpose of each element in your app and makes it easier to navigate through your codebase.

### General naming conventions

This section describes "camel case" and "Pascal case" naming conventions. If you're already familiar with those terms, you can skip ahead.

#### Camel case

Use camel case for controls and variables. Camel case begins with a lowercase prefix, removes all spaces from object or variable names, and capitalizes the first letter of each word after the first. For example, a text input control might be named **txtUserEmailAddress**.

#### Pascal case

Use Pascal case for data sources. Pascal case is sometimes referred to as "upper camel case." Like camel case, it removes all spaces and capitalizes the first letter of words. However, unlike camel case, Pascal case also capitalizes the first word. For example, a common data source in Power Apps is the Microsoft Office 365 Users connector, which is named **Office365Users** in code.

### Screen names

Choose screen names that clearly show the purpose of the screen, which makes it easier to navigate through complex apps in Power Apps Studio.

Screen readers read screen names aloud. Users with vision accessibility needs rely on these screen readers. Use plain language for screen names, include spaces, and avoid abbreviations. End each name with the word "Screen" to provide clear context when the name is announced.

Here are some good examples:

- `Home_Screen` or `Home Screen`
- `Search_Screen` or `Search Screen`

:::image type="content" source="media/image1.png" alt-text="Screenshot that shows a list of screen names that follow the described pattern.":::

These example screen names are less understandable:

- `Home`
- `LoaderScreen`
- `EmpProfDetails`
- `Thrive Help`

### Control names

Use camel case for all control names on the canvas. Start with a three-character type descriptor, followed by the purpose of the control. This approach helps identify the type of control and makes it easier to build formulas and search. For example, `lblUserName` indicates that the control is a label.

The following table shows the abbreviations for common controls.

| **Control name**                      | **Abbreviation** |
|---------------------------------------|------------------|
| Badge                                 | bdg              |
| Button                                | btn              |
| Camera control                        | cam              |
| Canvas                                | can              |
| Card                                  | crd              |
| Charts                                | chr              |
| CheckBox                              | chk              |
| Collection                            | col              |
| Combo box                             | cmb              |
| Component                             | cmp              |
| Container                             | con              |
| Dates                                 | dte              |
| Drop down                             | drp              |
| Form                                  | frm              |
| Gallery                               | gal              |
| Group                                 | grp              |
| Header                                | hdr              |
| Html text                             | htm              |
| Icon                                  | ico              |
| Image                                 | img              |
| Info Button                           | info             |
| Label                                 | lbl              |
| Link                                  | lnk              |
| List box                              | lst              |
| Microphone                            | mic              |
| Microsoft Stream                      | str              |
| Page section shape                    | sec              |
| Pen Input                             | pen              |
| Power BI Tile                         | pbi              |
| Progress Bar                          | pbar             |
| Rating                                | rtg              |
| Rich text editor                      | rte              |
| Shapes (rectangle, circle, and so on) | shp              |
| Slider                                | sld              |
| Tab List                              | tab              |
| Table                                 | tbl              |
| Text input                            | txt              |
| Timer                                 | tmr              |
| Toggle                                | tgl              |
| Video                                 | vid              |

Detailed list of controls and their properties are described in [Controls reference](/power-apps/maker/canvas-apps/reference-properties).

> [!NOTE]
> Control names must be unique across an application. If a control is reused on multiple screens, the short screen name should have a suffix. For example, `galBottomNavMenuHS`, where "HS" stands for "Home Screen." This approach makes it easier to reference the control in formulas across screens.

Here are some bad examples:

- `zipcode`
- `Next`

When you consistently name your controls, your app is cleaner in the navigation view, and your code is cleaner too.

:::image type="content" source="media/image2.png" alt-text="Screenshot of the navigation view showing control names following the described pattern.":::

### Data source names

When you add a data source to your application, you can't change the name in the Power Apps app. The name is inherited from the source connector or data entities that are derived from the connection.

Here are some examples:

- **Name inherited from the source connector:** The Office 365 Users connector is named `Office365Users` in your code.
- **Data entities derived from the connection:** A Microsoft SharePoint list named `Employees` is returned from the SharePoint connector. Therefore, the name of the data source in your code is `Employees`. The same Power Apps app can also use ***the same SharePoint connector*** to access a SharePoint list named `Contractors`. In this case, the name of the data source in the code is `Contractors`.

Learn more about connectors and connections in [Overview of connectors for canvas apps](/powerapps/maker/canvas-apps/connections-list).

#### Standard action connectors

In standard action connectors that expose functions, such as LinkedIn, the data source name and its operations use Pascal casing. For example, the LinkedIn data source is named `LinkedIn` and has an operation named `ListCompanies`.

```powerappsfl
ClearCollect(
    colCompanies,
    LinkedIn.ListCompanies()
)
```

#### Custom connectors

Use custom connectors to connect to custom application programming interfaces (APIs), such as services or line-of-business APIs that your company creates. Any maker in your environment can create custom connectors. Use Pascal casing for the data source name and its operations. The custom connector name and the way it appears in Power Apps can differ.

Consider this example of a custom connector named `MS Auction Item Bid API`.

:::image type="content" source="media/image4.png" alt-text="Screenshot of a connector named MS Auction Item Bid API.":::

When you create a connection from this connector and add it to your Power Apps app as a data source, it appears as `AuctionItemBidAPI`.

:::image type="content" source="media/image5.png" alt-text="Screenshot of a connector showing that the name is AuctionItemBidAPI.":::

To discover the reason, look inside the OpenAPI file for a title attribute that contains the text `Auction Item Bid API`.

```json
"info": {
    "version": "v1",
    "title": "Auction Item Bid API"
},
```

Power Apps removes all the spaces from this attribute value and uses it as the name of your data source.

> [!TIP]
> Change the value of this attribute to a Pascal-cased name such as `AuctionItemBidAPI` and use it as the name of your custom connection. This way, there's no confusion. Change this value before you import the OpenAPI file to create the custom connector.

> [!NOTE]
> If you use the **Create from a blank** option instead of importing an existing OpenAPI file, Power Apps prompts you for the custom connector name. This name is both the name of the custom connector and the value of the title attribute inside the OpenAPI file. Use a Pascal-cased name such as `AuctionItemBidAPI` to keep things consistent and simple.

#### Excel DataTables

Power Apps uses DataTables in Microsoft Excel to connect to data in Excel worksheets. Keep these points in mind when you create Excel documents as data sources:

- Give your DataTables descriptive names. The name is in the Power Apps app when you write the code to connect to it.
- Use one DataTable per worksheet.
- Give the same name to the DataTable and worksheet.
- Use descriptive column names in the DataTables.
- Use Pascal casing. Each word of the DataTable name should begin with a capital letter, such as `EmployeeLeaveRequests`.

### Variable names

Naming conventions for variables in canvas apps are important for maintaining readability, consistency, and clarity in your Power Apps projects. While no strict standard is enforced, adopting a consistent naming convention across your canvas app can make it easier for you and other collaborators to understand, use, and manage the variables.

- Use camel case, where the first letter of each word is capitalized except for the first word.
- Choose meaningful and descriptive names that clearly describe the purpose or content of the variable. Avoid overly generic names like `temp` or `var1`. Instead, use descriptive names like `userEmail` or `totalAmount`.
- Consider using prefixes or suffixes to indicate the type of variable. For instance:
  - `strUserName` for a text/string variable
  - `numTotalAmount` for a numeric variable
  - `boolIsEnabled` for a boolean variable
  - `locVarName` for local variables/context variables
  - `gblVarLoginUser` for global variables
- Decide whether your variables should be named in the singular or plural form and stick to that convention. For example, consistently use `userCount` or `users`.
- Avoid using reserved words or names that might conflict with Power Apps functions or keywords. Check the Power Apps documentation for a list of reserved words.
- Consider using prefixes that provide context about the variable's usage or scope. For example:
  - `frm` for form variables
  - `col` for collections
  - `var` for general-purpose variables
- Avoid special characters. Keep names alphanumeric and avoid special characters or spaces. Stick to letters and numbers.

Power Apps lets context variables and global variables share the same names. This sharing can cause confusion because your formulas use context variables by default unless you use the [disambiguation operator](/powerapps/maker/canvas-apps/functions/operators#disambiguation-operator).

Avoid this situation by following these conventions:

- Prefix context variables with `loc`.
- Prefix global variables with `gbl`.
- The name after the prefix should indicate the intent or purpose of the variable. You can use multiple words without needing to separate them by special characters, such as underscores, if you capitalize the first letter of each word.
- Use camel casing. Begin your variable names with a prefix in lowercase letters, and then capitalize the first letter of each word in the name.

These examples follow standards and conventions:

- **Global variable:** `gblFocusedBorderColor`
- **Context variable:** `locSuccessMessage`
- **Scope variable:** `scpRadius`

These examples don't follow the standards and are harder to understand:

- `dSub`
- `rstFlds`
- `hideNxtBtn`
- `ttlOppCt`
- `cFV`
- `cQId`

Avoid short and cryptic variable names such as `EID`. Use `EmployeeId` instead.

When an app has many variables, type the prefix in the formula bar to see a list of available variables.  If you follow these guidelines to name your variables, you can find them easily in the formula bar as you develop your app. Ultimately, this approach leads to faster and more efficient app development.

### Collection names

- Use names that describe the collection's contents. Think about what the collection contains and how it's used, and name it accordingly.
- Prefix collection names with `col`.
- Use the name after the prefix to show the intent or purpose of the collection. You can use multiple words without spaces or underscores if you capitalize the first letter of each word.
- Use camel casing. Start your collection names with a lowercase `col` prefix, and then capitalize the first letter of each word in the name.

These examples follow the collection name conventions:

- `colMenuItems`
- `colThriveApps`

These examples don't follow the collection name conventions:

- `orderscoll`
- `tempCollection`

> [!TIP]
> When an app has many collections, type the prefix in the formula bar to see a list of available collections. If you follow these guidelines for naming your collections, you can easily find them in the formula bar as you develop your app. This approach leads to quicker app development.

## Comments and documentation

When you write code for your application, focus on adding clear comments. Comments help you understand the code later and make it easier for the next developer to work on the project.

Power Apps supports two comment styles to make your code clearer: line comments, which use double forward slashes (`//`) for single-line notes, and block comments, which use `/*` and `*/` for multi-line notes.

### Line comments

Add a double forward slash (`//`) to any line of code in Power Apps to make the rest of the line a comment.

Use line comments to explain what the next line of code does. You can also use them to temporarily disable a line of code for testing.

Here's an example of a line comment.

```powerappsfl
// ClearCollect function populates the Expenses2 collection with sample data
ClearCollect(
    Expenses2,
    // Entry 1: Client hosted meet and greet
    {
        Title: "Client hosted meet and greet:",
        ID: "4"
        // additional properties  
    }
)
```

### Block comments

Text between `/*` and `*/` is a block comment. Block comments can cover several lines, unlike line comments, which only cover one line.

Use block comments for longer explanations, like documenting a code module header. You can also use them to temporarily disable several lines of code during testing or debugging.

For better code organization, add comments after you use the Format Text feature. This approach helps when your comments appear before a code block.

```powerappsfl
/*
    Patch Operation to Insert Data:
    - Inserts a new employee record into the 'Employee' entity.
    - Adds corresponding department details to the 'Department' entity.
    Note: Ensure that foreign key relationships and dependencies are maintained for data integrity.
*/
Patch(
    Employee,
    Defaults(Employee),
    {
        FirstName: "John",
        LastName: "Doe",
        Position: "Software Developer"
    }
)
```

The Format Text feature follows these rules for comments:

1. If a property starts with a block comment, the next line of code is added to it.
1. If a property starts with a line comment, the next line of code isn't added to it. Otherwise, the code is commented out.
1. Line and block comments elsewhere in the property are added to the previous line of code.

Don't worry about adding too many or too long comments. Power Apps removes all comments when it creates the client app package. Comments don't affect package size, app download speed, or loading times.

### Modern app designer with comments

In Power Apps, use the commenting features in both Power Apps Studio and the modern app designer.

To add comments in Power Apps Studio, use these methods:

- Right-click the ellipsis ("...") of any item in the Tree View.
- Right-click a component in the canvas area.
- Select the **Comments** button located on the command bar in the top right-hand corner of the screen.

When you mention a colleague in a comment, use the "@" symbol followed by their name. This action sends a notification email to the person you tag. If the tagged user doesn't have access to the app, Power Apps prompts you to share the app with them.

:::image type="content" source="media/image9.png" alt-text="Screenshot of an expenses app showing a person mentioned with @ in a comment.":::

### Indentation and formatting

Indentation and formatting help keep your app clear and organized. When your code is well-formatted, it's easier to read and understand.

#### Indentation

Power Apps doesn't enforce strict indentation. Use spaces to separate different sections of your formulas. Press the spacebar several times to create an indentation.

#### Line breaks

Break long formulas into multiple lines to make them easier to read. Press Enter to add a line break in the formula bar.

#### Use the Format text command

The **Format text** command in the formula bar adds indentation, spacing, and line breaks to your Power Apps code. Use the **Format text** command to keep a consistent coding style in your canvas app and to help prevent errors.

:::image type="content" source="media/image10.png" alt-text="Screenshot of Power Apps Studio with the Format text command highlighted.":::

## Related information

- [Use consistent naming conventions in Power Automate cloud flows](/power-automate/guidance/coding-guidelines/use-consistent-naming-conventions)
- [Build readable and maintainable scripts in Power Automate desktop flows](/power-automate/guidance/desktop-flow-coding-guidelines/build-readable-flow-scripts)

## Next step

> [!div class="nextstepaction"]
> [Code optimization](code-optimization.md)

---

## Power Apps code optimization

Source: [coding-guidelines_code-optimization.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/code-optimization)

*Discover best practices for Power Apps code optimization, including tips for using `With`, `Concurrent`, and `Coalesce` functions to enhance app efficiency.*

# Code optimization

As canvas apps evolve to meet different business needs, keeping performance optimal is critical. Data handling, user interface design, and app functionality all require a careful approach to code optimization.

As canvas apps become more complex, you can run into issues with data retrieval, formula complexity, and rendering speed. To balance strong functionality with a responsive user interface, use a systematic approach to code optimization.

## Power Fx formula optimization

This section provides best practices for optimizing Power Fx formulas.

### With function

The `With` function evaluates a formula for a single record. The formula can calculate a value or perform actions, like modifying data or working with a connection. Use `With` to make complex formulas easier to read by dividing them into smaller named subformulas. These named values act like simple local variables limited to the scope of `With`. `With` is better than context or global variables because it's self-contained, easy to understand, and works in any declarative formula context. Learn more about the [With function](/power-platform/power-fx/reference/function-with).

:::image type="content" source="media/image13.png" alt-text="Screenshot of a Power Fx formula that uses the With function.":::

### Concurrent function

The `Concurrent` function allows multiple formulas in the same property to be evaluated at the same time if they have connector or Dataverse calls. Normally, multiple formulas are evaluated at the same time when you chain them with the `;` (semicolon) operator. With `Concurrent`, the app evaluates all formulas in a property at the same time, even after using the `;` operator. This concurrency means users wait less time for results. When data calls don't start until the previous calls finish, the app waits for the sum of all request times. If data calls start at the same time, the app waits only for the longest request time. Learn more about the [Concurrent function](/power-platform/power-fx/reference/function-concurrent).

```powerappsfl
Concurrent(
    ClearCollect(colAccounts1, Accounts),
    ClearCollect(colUsers1, Users),
    ClearCollect(colEnvDef1, 'Environment Variable Definitions'),
    ClearCollect(colEnvVal1, 'Environment Variable Values')
);
```

### Coalesce function

The `Coalesce` function evaluates its arguments in order and returns the first value that's not blank or an empty string. Use this function to replace a blank value or empty string with a different value, but leave nonblank and nonempty string values unchanged. If all arguments are blank or empty strings, the function returns blank. `Coalesce` is a good way to convert empty strings to blank values. Learn more about the [Coalesce function](/power-platform/power-fx/reference/function-isblank-isempty#coalesce).

This example requires `value1` and `value2` to be evaluated twice:

```powerappsfl
If(Not IsBlank(value1), value1, Not IsBlank(value2), value2)
```

This function can be reduced to:

```powerappsfl
Coalesce(value1, value2)
```

### IsMatch function

The `IsMatch` function tests if a text string matches a pattern made up of ordinary characters, predefined patterns, or a regular expression. Learn more about the [IsMatch function](/power-platform/power-fx/reference/function-ismatch).

For example, this formula matches a United States Social Security number:

```powerappsfl
IsMatch(TextInput1.Text, "\d{3}-\d{2}-\d{4}")
```

Explanation of the regular expression:

- `\\d` Matches any digit (0-9).

- `{3}` Specifies that the preceding digit pattern (\\d) should occur exactly three times.

- `-` Matches the hyphen character.

- `{2}` Specifies that the preceding digit pattern (\\d) should occur exactly two times.

- `{4}` Specifies that the preceding digit pattern (\\d) should occur exactly four times.

More examples of `IsMatch`:

```powerappsfl
IsMatch(TextInput1.Text, "Hello World")
IsMatch(TextInput1\_2.Text, "(?!^\[0-9\]\\\*$)(?!^\[a-zA-Z\]\\\*$)(\[a-zA-Z0-9\]{8,10})")
```

## Optimize app OnStart

The `OnStart` property for canvas apps plays a crucial role in defining actions that occur when the app is launched. This property allows app developers to execute global initialization tasks, set up variables, and perform actions that should happen only once during the app's startup process. Understand and effectively use the `OnStart` property to create responsive and efficient canvas apps.

Streamline the `App.OnStart` function by migrating variable setups to named formulas. Named formulas, especially those configured early in the app lifecycle, are advantageous. These formulas handle the initialization of variables based on data calls, providing a cleaner and more organized structure for your code. Learn more in [Build large and complex canvas apps](/power-apps/maker/canvas-apps/working-with-large-apps).

> [!NOTE]
> The `OnStart` property is imperative. It's an ordered list of work that needs to be done before the first screen appears. Because it's so specific about not only *what* needs to be done, but also *when* that work must be done based on order, it limits the reordering and deferring optimizations that might otherwise be done.

### Start screen

If `App.OnStart` contains a `Navigate` function call, even if it's in an `If` function and rarely called, the app must complete execution of `App.OnStart` before it shows the first screen of the app. `App.StartScreen` is a declarative way to indicate which screen should be shown first, and it doesn't block optimizations.

Setting the `StartScreen` property shows the first screen before `App.OnStart` is complete. `App.StartScreen` declares which screen object to show first without requiring any preprocessing.

Instead of writing code like:

```powerappsfl
App.OnStart = Collect(OrdersCache, Orders);
If(Param("AdminMode") = "1", Navigate(AdminScreen), Navigate(HomeScreen))
```

Change the code to:

```powerappsfl
App.OnStart = Collect(OrdersCache, Orders);
App.StartScreen = If(Param("AdminMode") = "1", AdminScreen, HomeScreen)
```

More information: [App.StartScreen: a declarative alternative to Navigate in App.OnStart](https://www.microsoft.com/power-platform/blog/power-apps/app-startscreen-a-new-declarative-alternative-to-navigate-in-app-onstart/).

> [!WARNING]
> Avoid dependencies between `StartScreen` and `OnStart`. Referencing a named formula that in turn references a global variable might cause a race condition in which `StartScreen` isn't applied correctly.
>
> Don't create dependencies between `StartScreen` and `OnStart`. While the app blocks referencing global variables in `StartScreen`, you can reference a named formula, which in turn references a global variable. This approach might cause a race condition in which the `StartScreen` isn't applied correctly.

### Named formulas

Named formulas are static or constants that can be defined in `App.Formulas`. Once declared in `App.Formulas`, they can be used anywhere in the app, and their values always stay up to date. Named formulas in Power Apps let you define values or sets of values that the platform automatically manages and updates. This functionality shifts the responsibility of value calculation and upkeep from the developer to Power Apps, streamlining the development process. Named formulas in Power Apps are a powerful feature that can significantly enhance app performance and maintainability.

Named formulas also help when declaring app themes. When you build enterprise apps, you often want the app to have common themes that provide a consistent look and user experience. To create a theme, you need to declare tens to hundreds of variables in `App.OnStart`. This declaration increases the code length and the app's initialization time.

Modern controls can also help significantly with theming and help reduce customer written logic to handle theming. Modern controls are currently in preview.

For example, you can move the following code on `App.OnStart` to `App.Formulas`, which reduces the startup time on global variable declarations.

```powerappsfl
Set(BoardDark, RGBA(181,136,99, 1));
Set(BoardSelect, RGBA(34,177,76,1));
Set(BoardRowWidth, 10);                      // expected 8 plus two guard characters for regular expressions.
Set(BoardMetadata, 8 \* BoardRowWidth + 1);   // which player is next, have pieces moved for castling rules, etc.
Set(BoardBlank, "----------------------------------------------------------------\_00000000000000");
Set(BoardClassic, "RNBQKBNR\_\_PPPPPPPP------------------------\_--------\_\_pppppppp\_\_rnbqkbnr\_\_0000000000");
```

You can move the code to `App.Formulas` as follows:

```powerappsfl
BoardSize = 70;
BoardLight = RGBA(240,217,181, 1);
BoardDark = RGBA(181,136,99, 1);
BoardSelect = RGBA(34,177,76,1);
BoardRowWidth = 10;                      // expected 8 plus two guard characters for regular expressions
BoardMetadata = 8 \* BoardRowWidth + 1;   // which player is next, have pieces moved for castling rules, etc.
BoardBlank = "----------------------------------------------------------------\_00000000000000";
BoardClassic = "RNBQKBNR\_\_PPPPPPPP------------------------\_--------\_\_pppppppp\_\_rnbqkbnr\_\_0000000000";
```

Another example is in setting `Lookups`. Here, a change is required in a `Lookup` formula to get the user information from Office 365 instead of Dataverse. You only need to make the change in one place, without changing the code everywhere.

```powerappsfl
UserEmail = User().Email;
UserInfo = LookUp(Users, 'Primary Email' = User().Email);
UserTitle = UserInfo.Title;
UserPhone = Switch(UserInfo.'Preferred Phone', 'Preferred Phone (Users)'.'Mobile Phone', UserInfo.'Mobile Phone',
UserInfo.'Main Phone');
```

These formulas embody the essence of calculation. They articulate the process for determining `UserEmail`, `UserInfo`, `UserTitle`, and `UserPhone` based on other values. This logic is encapsulated, enabling widespread utilization throughout the app, and can be modified in a singular location. The adaptability extends to switching from the Dataverse Users table to the Office 365 connector without necessitating alterations to formulas scattered across the app.

Another approach is to optimize `countRows`.

```powerappsfl
varListItems = CountRows(SampleList)
```

With the `Set` function, you must initialize the variable `varListItems` with the initial count of rows in the sample list and set it again after the list items are added or removed. With named formulas, as the data changes, the `varListItems` variable is updated automatically.

Named formulas in the `App.Formulas` property provide a more flexible and declarative approach for managing values and calculations throughout the app. They offer advantages in terms of timing independence, automatic updates, maintainability, and immutable definitions compared to relying solely on `App.OnStart`.

| Aspect                | Named formulas (App.Formulas)                                     | App.OnStart                                                              |
|-----------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------|
| Timing independence   | Formulas are available instantly and can be calculated in any order. | Variables might introduce timing dependencies that affect availability.     |
| Automatic updates     | Formulas automatically update when dependencies change.           | Variables are set once during startup; manual updates might be needed.     |
| Maintainability       | Centralized formulas in one location improve maintainability.     | Scattered variables might require finding and updating in multiple places. |
| Immutable definitions | Formula definitions in `App.Formulas` are immutable.                | Variable values might be susceptible to accidental changes.                |

### User defined functions

[User defined functions in Power Apps Studio](/power-platform/power-fx/reference/object-app#user-defined-functions) enable you to create your own custom functions.

Define a formula under `App.Formulas` as follows:

```powerappsfl
FunctionName(Parameter1:DataType1, Parameter2:DataType2):OutputDataType = Formula
```

The code works as follows:

- `FunctionName` invokes the function.

- `Parameter` is the name of the input. You can include one or more inputs.

- `DataType` is the data type that the argument passed into the function must match. Available data types include Boolean, Color, Date, Datetime, Dynamic, GUID, Hyperlink, Text, and Time.

- `OutputDataType` is the data type for the function's output.

- `Formula` is the function's output.

Use `IfError` to implement error handling within the defined function:

```powerappsfl
// Function to calculate the area of a circle based on the radius
calcAreaOfCircle(radius: Number): Number = 
    IfError(Pi() * radius * radius, 0);
```

Call the defined function from a text or label control.

```powerappsfl
calcAreaOfCircle(Int(*TextInput1*.Text))
```

## Optimize variables

Variables define and set local and global values you use throughout your app. While they're convenient, using too many variables can make your app less efficient.

The following example demonstrates how to set a variable for each attribute of an object, which requires using `Set` for every property.

```powerappsfl
Set(varEmpName, Office365Users.MyProfile().DisplayName);
Set(varEmpCity, Office365Users.MyProfile().City);
Set(varEmpPhone, Office365Users.MyProfile().BusinessPhones);
Set(varEmpUPN, Office365Users.MyProfile().UserPrincipalName);
Set(varEmpMgrName, Office365Users.ManagerV2(varEmpUPN).DisplayName);
```

A more efficient approach is to use the property only when you need it:

```powerappsfl
Set(varEmployee, Office365Users.MyProfile())
"Welcome " & varEmployee.DisplayName
```

Use context variables and global variables wisely. If a variable's scope goes beyond a single screen, use global variables instead of context variables.

Too many unused variables increase memory usage and can slow app initialization. Resources are allocated for these variables even if you don't use them. Unused variables also add complexity to your app's logic. Keep your Power App clean and organized for better performance and easier development.

## Optimize collections

Collections are temporary data storage structures you use to store and manipulate data in a Power Apps app. However, collections can cause performance overhead. Limit your use of collections and use them only when necessary.

```powerappsfl
// Use this pattern
ClearCollect(colErrors, {Text: gblErrorText, Code: gblErrorCode});

// Do not use this pattern
Clear(colErrors);
Collect(colErrors, {Text: gblErrorText, Code: gblErrorCode});
```

To count records in a local collection, use `CountIf` instead of `Count(Filter())`.

Consider this approach when working with collections:

- **Limit the size and number of collections**. Because collections are local to the app, they're stored in the mobile device memory. The more data collections hold, or the more collections you use, the worse the performance. Use the `ShowColumns` function to get only specific columns. Add the `Filter` function to get only relevant data.

  The following example function returns the entire dataset:

  ```powerappsfl
  ClearCollect(colDemoAccount, Accounts);
  ```

  Compare this function to the following code, which returns only specific records and columns:

  ```powerappsfl
  ClearCollect(colAcc,
    ShowColumns(
      Filter(Accounts, !IsBlank('Address 1: City')),
      "name","address1_city"))
  ```

  This example returns the following dataset:

  :::image type="content" source="media/image21.png" alt-text="Screenshot of a dataset with a table named colAcc and two columns, address1_city and name.":::

- **Set a data source refresh frequency**. If you add new records to the collection, refresh it or collect to it to get the new or changed records. If multiple users update your data source, refresh the collection to get the new or changed records. More refresh calls mean more interaction with the server.

### Cache data in collections and variables

A collection is a table variable that stores rows and columns of data, not just a single data item. Collections are useful for two main reasons: aggregating data before sending it to the data source, and caching information to avoid frequent queries. Because collections match the tabular structure of the data source and Power Apps, they let you interact with data efficiently, even when you're offline.

```powerappsfl
// Clear the contents of EmployeeCollection, it already contains data
ClearCollect(
    colEmployee,
    {
        Id: "1",
        Name: "John",
        Department: "IT"
    },
    {
        Id: "2",
        Name: "Nestor",
        Department: "IT"
    }
)
```

### Remove unused variables and media

While unused media and variables might not significantly impact app performance, it's important to clean up your app by removing any unused media or variables.

- Unused media files increase app size, which can slow down app load times.

- Unused variables increase memory usage and can slightly slow down app initialization. Resources are allocated for these variables even if they aren't used. Too many unused variables can also make the app's logic more complex.

- Use App Checker to review unused media and variables.

## Optimize screens and controls

To optimize screens and controls in Power Apps, consider the following best practices.

### Avoid cross referencing controls

Controls that reference controls on other screens can slow down app loading and navigation. This approach can force the app to load the other screens rather than wait until the user goes to that screen. To solve this problem, use variables, collections, and navigation context to share state across screens.

The App checker in Power Apps Studio shows controls that are cross-referenced. Review App checker regularly to fix this issue.

In the following image, the Gallery 1 control is cross-referenced in Screen 2, Label 2 control.

:::image type="content" source="media/image23.png" alt-text="Screenshot of Power Apps Studio showing a cross-referenced control.":::

If you reference a control from the first screen in the app in the second screen, there's no performance hit because the first screen is already loaded. This behavior is actually beneficial because the app is declarative instead of using variables.

If you reference controls that aren't yet loaded, such as the first screen referencing a control named `Label 3` from screen 3, the app loads that screen into memory.

### Enable DelayOutput for text controls

The **DelayOutput** setting, when set to true, registers user input after a half-second delay. This delay is useful for postponing expensive operations until the user finishes entering text, like filtering when input is used in other formulas.

For example, consider a gallery whose **Items** are filtered depending on what the user enters in the TextInput control:

- If you set **DelayOutput** to false, which is the default, the gallery filters as soon as any text is typed. If you have a gallery with many items, reloading the gallery with changes right away slows down performance. It's better to wait. This behavior is practical when you're using the `TextInput` for a search string or the `StartsWith` function.

- If you set **DelayOutput** to true, there's a short delay before the changes are detected. This delay provides time to finish typing. The delay works well with the `TextInput.OnChange` property. If you have actions tied to changes, you don't want them triggered until you finish typing in the field.

## Delegation and server-side processing

Using delegation and server-side processing allows your app to handle large datasets efficiently by offloading operations to the data source.

### Delegation

Delegation in Power Apps refers to the app's ability to offload certain operations to the underlying data source rather than processing the operations within Power Apps itself. By using delegation in Power Apps, you can create more efficient and scalable applications that perform well even in scenarios involving large datasets. Be aware of delegation limitations for specific data sources and operations, and design your app accordingly to achieve optimal performance.

> [!NOTE]
> Not all functions are delegable. Learn more about delegation in [Query limitations: Delegation and query limits](/power-apps/maker/canvas-apps/delegation-overview).

Delegation has several advantages, such as query optimization and support for large datasets. Additionally, if the source data changes frequently, delegation helps keep data up to date.

### Reduce API calls to data source

Sometimes, it can seem convenient to create collections by performing joins within your canvas app. Consider the following example.
In the example, there are two tables: Drivers and Trucks. The code creates a collection of drivers and truck details, and for each truck, it calls the driver who owns the truck.

```powerappsfl
// Bad code
ClearCollect(vartruckdata, AddColumns('Truck Details',
    "CITY",LookUp(Drivers, 'Truck Details'\[@'Dummy ID'\] = Drivers\[@'Truck Details'\],City),
        "FIRSTNAME",LookUp(Drivers, 'Truck Details'\[@'Dummy ID'\] = Drivers\[@'Truck Details'\],'Driver First Name'),
    "LASTNAME",LookUp(Drivers, 'Truck Details'\[@'Dummy ID'\] = Drivers\[@'Truck Details'\],'Driver Last Name'),
        "STATE",LookUp(Drivers, 'Truck Details'\[@'Dummy ID'\] = Drivers\[@'Truck Details'\],State)));
```

Performing such join in the canvas app can generate many calls to the data source, which leads to slow loading times.

A better approach is:

```powerappsfl
// Good code
Set(
    varTruckData,
    LookUp(
        Drivers,
        'Dummy ID' = ThisRecord.'Dummy ID',
        'Driver First Name'
    ) & LookUp(
        Drivers,
        'Dummy ID' = ThisRecord.'Dummy ID',
        'Driver Last Name'
        )
);

Set(
    varTruckData,
    With(
        {
            vDriver: LookUp(
                Drivers,
                'Dummy ID' = ThisRecord.'Dummy ID'
            )
        },
        vDriver.'Driver First Name' & vDriver.'Driver Last Name'
    )
)
```

In the real-time scenario, you can reduce loading times from five minutes to under 10 seconds by fixing the data at the source.

### Server-side processing

Different data sources, like SQL and Dataverse, let you delegate data processing, such as filters and lookups, to the data source. In SQL Server, you can create views defined by a query. In Dataverse, you can create low-code plugins to process data on the server and return only the final results to your canvas app.

Delegating data processing to the server can improve performance, reduce client-side code, and make your app easier to maintain.

Learn more about [plugins in Dataverse](/power-apps/maker/data-platform/low-code-plug-ins).

## Optimize query data patterns

Optimizing how your app queries data can significantly reduce load times and improve overall responsiveness.

### Use explicit column selection

The Explicit Column Selection (ECS) feature is on by default for all new apps. If it's not on for your app, turn it on. ECS automatically reduces the number of columns retrieved to only those used in the app. If ECS isn't on, you might get more data than you need, which can affect performance. Sometimes, when an app gets data through collections, the original source of a column can be lost. ECS drops columns if it can't determine that they're used. To force ECS to keep a missing column, use the Power Fx expression `ShowColumns` after a collection reference or in a control.

### Avoid calling Power Automate to populate a collection

A common practice is to use Power Automate to fetch and populate collections in Power Apps. While this approach is valid, there are situations where it might not be the most efficient choice. Calling Power Automate adds network latency and a 0.6-second performance cost to instantiate the Power Automate flow.

Overuse of Power Automate flows can also lead to execution limits and throttling. Always evaluate the trade-offs between network latency and performance cost.

### Eliminate N+1 problem

The N+1 problem is a common issue in database queries where, instead of fetching all the required data in a single query, multiple extra queries are made to retrieve related data. This problem can lead to performance issues, as each extra query incurs overhead.

A simple call like this to load a collection can generate N+1 calls to data source:

```powerappsfl
ClearCollect(MyCollection, OrdersList,
    {
        LookUp(CustomersList,CustomerID = OrdersList[@CustomerID])
    }
)
```

In the context of canvas apps and galleries, the N+1 problem might arise when working with data sources and galleries that display related records. The issue typically occurs when more queries are made for each item displayed in the gallery, leading to a performance bottleneck.

Use View objects in SQL Server to avoid N+1 query problem, or change the user interface to avoid triggering the N+1 scenario.

Dataverse automatically fetches the required data of related tables and you can select the columns from related tables.

```powerappsfl
ThisItem.Account.'Account Name'
```

If `RelatedDataSource` size is small (fewer than 500 records), cache it in a collection and use the collection to drive the Lookup (N+1) query scenario.

### Limit the package size

Although Power Apps optimizes app loading, you can take steps to reduce the footprint of your apps. A reduced footprint is especially important for users of older devices or users in locales where there's higher latency or reduced bandwidth.

- Evaluate the media embedded in your app. If something isn't used, delete it.

  For example, embedded images might be too large. Instead of PNG files, see whether you can use SVG images. Be careful about using text in SVG images because the font must be installed on the client. A workaround when you need to show text is to superimpose a text label over an image.

- Evaluate whether the resolution is appropriate for the form factor. The resolution for a mobile app doesn't need to be as high as the resolution for a desktop app. Experiment to get the right balance of image quality and size.

- If you have unused screens, delete them. Be careful not to delete any hidden screens that only app makers or administrators use.

- Evaluate whether you're trying to fit too many workflows into one app. For example, do you have both admin screens and client screens in the same app? If so, consider breaking them into individual apps. This approach also makes it easier for multiple people to work on the apps at the same time, and it limits the "blast radius" (amount of testing) when app changes require a full test pass.

## Optimize ForAll

The `ForAll` function in Power Apps is used to iterate through a table of records and apply a formula or set of formulas to each record. While the function itself is versatile, improper use of the `ForAll` function can quickly make your app less performant.

The `ForAll` function is a singular sequential function instead of a concurrent function. Therefore, it looks at only one record at a time, gets the result, and then continues to the next record until it goes through all records in its scope.

**Avoid nesting `ForAll`.** This practice can lead to exponential iterations and significantly affect performance.

```powerappsfl
ClearCollect(FollowUpMeetingAttendees.ForAll(ForAll(Distinct(AttendeesList.EmailAddress.Address).Lookup(Attendees))))
```

### Batch update the database

You can use `ForAll` and `Patch` to batch update the database. However, be careful when you use the order of `ForAll` and `Patch`.

The following function is the better approach, for example:

```powerappsfl
Patch(SampleFoodSalesData, ForAll(colSampleFoodSales,
    {
        demoName:"fromCanvas2"
    })
);
```

Whereas the following approach is less efficient:

```powerappsfl
ForAll(colSampleFoodSales, Patch(SampleFoodSalesData,
    {
        demoName:"test"
    })
);
```

## Next step

> [!div class="nextstepaction"]
> [Error handling](error-handling.md)

---

## Error handling in Power Apps

Source: [coding-guidelines_error-handling.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/error-handling)

*Discover best practices for error handling in Power Apps, including validation, patching, and custom error messages.*

# Error handling

Power Fx supports formula-level error handling. This feature is turned on by default for all new apps. However, some older apps might have it turned off in app **Settings**. We recommend keeping this feature turned on.

To check if this feature is turned on:

1. Open a canvas app for editing.
1. Go to the **Settings** > **Updates** > **Retired** tab.
1. Make sure **Disable formula-level management** is turned off.

When this setting is enabled, you can use formulas like `IfError`, `IsError`, `Error`, and `IsBlankorError`. These functions help you detect errors, provide alternative values, or take specific actions based on the error. When you turn on this setting, you can write null or blank values to data sources. When you turn off this feature, errors are returned as blank values.

## Validation error handling

These functions help validate inputs like incorrect formats or required fields. Use `If` statements or functions like `IsBlank` and `IsError` to validate user input. Provide clear error messages and prevent further processing until the input is corrected.

```powerappsfl
If( IsBlank(TextInput.Text),
    Notify("Field cannot be blank", 
    NotificationType.Error),
    // Continue with processing
)
```

## Patch function error handling

Similar to the previous example, `Error` functions help catch errors while patching data to a data source. The `Patch` function reports errors in two ways.

It can return an error value as the result of the operations.

```powerappsfl
UpdateContext(
    {   
    result : Patch(
             Feeds,
             Defaults(Feeds),
             {
                 createdon: Now(),
                 crde8_content: TextInput1_1.Text
                 cr9ce_imageurl: filename
             }
        )
    }
)
```

You can detect errors by using `IsError` and replace or suppress them by using `IfError`.

```powerappsfl
IfError(result, Notify("There was an issue saving data" , NotificationType.Error));
IfError(result, Notify("There was an issue saving data" , & FirstError.Message, NotificationType.Error))

If(
    IsError(
        Patch(
            Feeds,
            Defaults(Feeds),
            {
                createdon: Now(),
                crde8_content: TextInput1_1.Txt,
                cr9ce_imageurl: filename        
            }
        )
    ),
    Notify("Error: There was an issue saving data", NotificationType.Error)
)
```

### Forms error handling

When you use Forms to submit data by using the `SubmitForm` function, use the Form control property `OnFailure` to notify users of error messages.

```powerappsfl
// OnSelect property of the form's submit button
SubmitForm(frm_SubmitData);

// OnSuccess property of the form
Navigate('Success Screen');

// OnFailure property of the form
Notify("Error: the invoice could not be created", NotificationType.Error);
```

### Custom error message by using the OnError property

The Power Apps `OnError` property captures all unhandled errors in your app. By using the `OnError` property, you can run an expression every time the app encounters an unhandled error. For example, you can store the error in a variable or use a function like `IfError` to replace the error with another value. To use the [`OnError` property](/power-platform/power-fx/reference/object-app#onerror-property), add it to the app where you want to handle errors. Then, write a formula in the `OnError` property box to specify the error message you want to display.

`App.OnError` can't replace the error like `IfError` can. When `App.OnError` runs, the error already happened and the result already went through other formulas. `App.OnError` only controls how the error is reported to the end user. It also provides a way for the maker to log the error if they want.

This code on `App.OnError` can help locate the source of the error:

```powerappsfl
Notify(
    Concatenate(
        FirstError.Message,
        ", Observed: ",
        FirstError.Observed,
        ", Source: ",
        FirstError.Source
    ),
    NotificationType.Error
)
```

## Related information

- [Power Fx error handling](/power-platform/power-fx/error-handling)

## Next step

> [!div class="nextstepaction"]
> [Monitoring and testing](monitoring-testing.md)

---

## Testing and monitoring in Power Apps

Source: [coding-guidelines_monitoring-testing.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/monitoring-testing)

*Master testing and monitoring in Power Apps. Use tools like Monitor and App Checker to troubleshoot, enhance performance, and improve app accessibility.*

# Monitoring and testing

Testing and monitoring help you build reliable, high-performance Power Apps. Use the following Power Apps built-in tools to debug and diagnose performance issues, identify formula errors, and ensure your app is accessible to all users.

## Monitor

Power Apps Monitor is a debugging tool that monitors a stream of events from a user's sessions to diagnose and troubleshoot problems related to performance.

You can use the tool from Power Apps Studio or to monitor published apps during runtime. To access monitor for a published app, go to the app, and select **Details** and then **Monitor**.

:::image type="content" source="media/image33.png" alt-text="Screenshot of Power Apps with the context menu open, showing Monitor in the menu.":::

The Monitor tool returns important information, such as:

- Nature of the operation, such as `Select`, `Load Screen`, `Navigate`, and `GetRows`.

- Result and Result info, which indicate whether the call is Success, Failure, or Warning. Result info includes information such as the number of rows returned, runtime errors like 404 or 429, and more.

- Duration, which is the amount of time taken to complete a given request.

- Data source and control information.

:::image type="content" source="media/image34.png" alt-text="Screenshot of Monitor results showing the columns described." lightbox="media/image34.png":::

On selecting an item in the grid, you can get more information, such as an overview of the event, the formula related to the selected event, and the HTTP request sent and response received. By default, the formula is only available during authoring, not for published apps. To show the formula for published apps, you need to enable an option in the app settings. Go to **File**, then **Settings**, and turn on **Debug published app**.

:::image type="content" source="media/image35.png" alt-text="Screenshot of the Settings dialog with the Debug published app option enabled.":::

This image shows the JSON details of an item selected in the event grid:

:::image type="content" source="media/image36.png" alt-text="Screenshot showing the JSON details of an item selected in the event grid." lightbox="media/image36.png":::

Learn more in [Use Monitor to get insights and recommendations for your app](../../maker/common/monitor-app-performance.md).

## App checker

App checker provides a streamlined method for identifying formula issues and addressing accessibility concerns within your app. You access it through the App checker icon in the Power Apps Studio toolbar.

The tool presents a comprehensive list of formula-related issues and actionable recommendations. Its purpose extends beyond error detection, as it also contributes to improving debugging efficiency, optimizing performance, and ensuring alignment with best practices.

:::image type="content" source="../../maker/canvas-apps/media/studio/pa-studio-app-checker.png" alt-text="Screenshot of Power Apps Studio highlighting the App checker icon and the App checker panel listing formula issues and accessibility recommendations.":::

Learn more about [App checker](/power-apps/maker/canvas-apps/power-apps-studio#app-checker).

## Accessibility checker

The Accessibility checker functions in a manner similar to the formula errors checker. It scrutinizes your app for potential accessibility problems and presents them in a comprehensive list. The Accessibility checker offers guidance such as on enabling keyboard and screen reader support within apps.

When you select an item from the Accessibility checker list, the relevant property opens for addressing the identified issue. Selecting the right chevron reveals detailed information along with a link to resources that provide insights into creating accessible apps.

:::image type="content" source="../../maker/canvas-apps/media/accessibility-checker/accessibility-checker-pane.png" alt-text="Screenshot of Accessibility checker pane in Power Apps showing a list of detected accessibility issues and guidance links.":::

Learn more about the [Accessibility checker in Power Apps](/power-apps/maker/canvas-apps/accessibility-checker).

---

## Best practices: Collaborating and co-developing apps using Power Apps

Source: [co-develop_overview.md](https://learn.microsoft.com/en-us/power-apps/guidance/co-develop/overview)

*Learn more about how to collaborate and co-develop low-code apps in Power Apps.*

# Best practices: Collaborating and co-developing apps using Power Apps 

Digital transformation as a mechanism for improving business efficiency is a key component in the success of most organizations today. Yet often, the business-focused domain experts are unable to create apps with the functionality that they want, whereas developers may struggle to understand the commercial and process implications of the code they’re asked to build. In consequence, there can be a disconnect between an organization’s business imperatives and the subsequent implementation of that company’s applications.

However, enabling organizations to truly support business growth takes more than just a top-notch development team; it requires the participation of business-savvy individuals to drive the creation of solutions that an organization can use to maintain its competitive advantage. 

[Microsoft Power Apps](https://powerplatform.microsoft.com/power-apps/), part of Microsoft Power Platform, enables *app makers* (business technologists or individuals with business domain experience) to build and deploy low-code or no-code applications within fusion teams. Fusion teams unite business technologists, professional developers, and IT departments into a joint venture that can deliver production-ready digital products. These blended teams can accelerate development cycles and release products more quickly that provide the solutions that users need today. 

## Aim

This content provides guidance for multidisciplinary teams to define and adopt co-development best practices that help promote collaboration, accelerate scalable development, reduce organizational silos, and optimize application delivery of low-code applications when using Power Apps. 

## What is an enterprise low-code application platform?
Power Apps is an example of an enterprise low-code application platform. Low-code application platforms are rapid application development and deployment environments that use either low-code or no-code techniques to create multi-platform apps. Makers with different levels of technical experience can use a low-code application platform to design and build applications without writing all functionality in a traditional programming language.

Typically, an enterprise  low-code application platform includes the following functionality:
- Application metadata to define the information that the app stores and displays
- A runtime interpreter to process this metadata when the app runs
- A WYSIWYG user interface that simplifies and speeds up app deployment 
- Optional programming extensions, which professional developers can use to enhance the app’s functionality

Low-code application platforms can also provide:
- Visual designers, templates, and reusable components.
- Connectors for business data and services.
- Access to a managed data platform, such as Microsoft Dataverse.
- Tools for sharing, governance, and application lifecycle management.
- Extensibility for professional developers.


### Challenges of low-code application co-development
Because low-code application platform provides a mechanism for makers or business technologists to create business apps, the ability to start prototyping apps in isolation can also provide challenges for IT departments, including siloing and a growth in shadow IT projects. In consequence, it's important to understand how low-code app development can work alongside traditional coded business apps; indeed, must both sides work together to create multidisciplinary or fusion team, which provides the best approach for optimal business application co-development. Diverse fusion teams can bring together different perspectives and ideas, leading to better and more successful outcomes.

### Achieving successful low-code application co-development
[Microsoft Dataverse](/power-apps/maker/data-platform/data-platform-intro) provides a secure, cloud-based data platform that fusion teams can use to define and share business data, relationships, logic, and security across applications.

## Low-code development using Power Apps
[Power Apps supports collaboration](/power-apps/maker/canvas-apps/copresence-power-apps-studio) through comments, copresence, real-time coauthoring, [reusable component libraries](/power-apps/maker/canvas-apps/component-library), and [code components](/power-apps/developer/component-framework/overview). For applications that require controlled development and release processes, teams can use solutions, source control, and [Microsoft Power Platform application lifecycle management](/power-platform/alm/).

[Power Apps](https://powerplatform.microsoft.com/power-apps/) provides an innovative approach that enables business-focused personnel to use low- or no-code approaches to create and deploy apps within their organization. Professional developers can then collaborate with these makers to enhance and refine these apps within fusion teams, consisting of both business and technical staff. Power Apps enables organizations to incorporate low-code apps into their application development lifecycles. 

### Advantages of Power Apps

Power Apps provides a fully featured low-code and no-code development environment suitable for use by single individuals all the way up to full multi-role fusion teams working in all sizes of organization. With a robust feature set, an extensive number of integrations, a wide array of user interface options, a comprehensive set of templates for various business needs, and powerful mobile functionality, Power Apps provides everything a maker might need to solve business challenges while supporting enhancements from professional developers. 

### Microsoft Power Platform family

[Power Apps](https://powerplatform.microsoft.com/power-apps/) is part of the [Microsoft Power Platform](https://powerplatform.microsoft.com/) family, which also includes the following low-code or no-code tools:
- [Power BI](https://www.microsoft.com/power-platform/products/power-bi) – make informed confident business decisions by putting data-driven insights into everyone’s hands.
- [Power Pages](https://powerpages.microsoft.com/) – quickly create low-code business websites for delivering vital information and services to your customers.
- [Power Automate](https://www.microsoft.com/en-us/power-platform/products/power-automate/) – boost business productivity by giving everyone the ability to automate organizational processes.
- [Microsoft Copilot Studio](https://www.microsoft.com/microsoft-copilot/microsoft-copilot-studio) – build agents to engage conversationally with your customers and employees, all without requiring coding.

This content concentrates on how Power Apps enables businesses to benefit from new, more integrated ways of working, starting with establishing an effective collaboration model. The fusion team model supports multi-role collaboration generating an advanced way to building apps involving both domain and specialist knowledge and experience.


> [!div class="nextstepaction"]
> [Next step: Establishing a collaboration model](collaboration.md)

### See also

[Ebook: Fusion development approach to building apps using Power Apps](../fusion-dev-ebook/index.md)

---

## Establishing a collaboration model | Microsoft Docs

Source: [co-develop_collaboration.md](https://learn.microsoft.com/en-us/power-apps/guidance/co-develop/collaboration)

*Learn more about how to establish a well-defined and structured collaboration model for fusion app development.*

# Establishing a collaboration model

A well-defined and structured collaboration model is central to the efficient operation of a fusion team. This section considers the factors that can contribute to this success, such as well-defined roles and responsibilities, a structured business rhythm, reliable communication channels, and an accessible documentation portal. 


## Define roles and responsibilities
To create an efficient fusion team, you must first establish clear roles and responsibilities. The key approach is to start small and only introduce more roles and personnel when necessary. Use smaller targets to build on success and demonstrate the value of the fusion team model before attempting more ambitious projects. 

At a minimum, your team should include the following personnel and roles:
- **The product owner** – typically, this is the person tasked with ensuring the projects’ success. He or she'll also define the clear and compelling purpose or may co-develop that vision with the remainder of the team.
- **The domain expert** – this is the business-savvy member of the team who understands and can articulate both the challenge and the solution. With the simplicity of the Power Apps low-code approach, he or she should be able to get most of the way to creating that solution.
- **The professional developer** – the ‘Pro Dev’ takes the solution from the domain expert and gives it enough coding support to enable it to deliver its intended functionality (and nothing more) if necessary.
- **The administrator** – this team member facilitates integration and support scenarios, while performing back-end administrative services.
Any further support in terms of time and expertise that the core team requires can be brought in on a flexible basis, rather than as a permanent member of the group. This approach ensures efficient operation of the fusion team while providing access to the more resources that the product owner needs for the team to achieve its goals. 

## Establish a rhythm of business model
Synchronizing operational rhythms related to app development in fusion team can improve team effectiveness by aligning to the following structure:

- **Define a repeating calendar event for team synchronization.** For most teams, weekly or fortnightly status update meetings are fine. However, don’t schedule meetings for the sake of having meetings and try to avoid increasing the frequency of meetings close to deadlines, as that approach can be counterproductive. 
- **Keep to agreed working hours.** Ideally, your team will be collocated, although fusion teams can also work effectively across geographies and time zones. Whatever the working arrangements, ensure that everyone understands the purpose and duration of working hours and respects those boundaries. 
- **Create a weekly rhythm.** The team’s weekly rhythm should include solo work, collaborative interactions, and, when necessary, effective meetings. These meetings should have a specific purpose, such as:
  - Scope reviews – to bring teams together on new initiatives.
  - User experience reviews – to go over app design and mockups.
Meetings to plan other meetings, meetings instead of emails or instant messages, or meetings without a clearly defined purpose are productivity killers.
- **Work efficiently.** The team needs to align internally to create the most usable solution. This alignment should include the ability to reuse components that others have built.
- **Maintain consistent progress towards the goal.** To ensure the team meets its goals, it's essential that everyone works together to achieve that outcome. For fusion teams working with Power Apps, maintaining this progress means capturing and understanding user feedback, prioritizing the backlog, and establishing and maintaining a holistic roadmap of the whole project. 
- **Generate a support matrix.** A support matrix provides a structured approach for obtaining the necessary support to progress towards the team’s overall goals. An inevitable challenge with business technologists directly building apps is when they reach the limits of their knowledge and abilities. At this point, who do they reach out to and how do they do that? How do they deal with a user bug report? This matrix should set out how they can raise a support ticket to engage the right team in troubleshooting and resolving the issue, based on the issue’s severity. For each support scenario, this matrix explains the escalation and troubleshooting path. 

## Define how the team communicates
Standardizing team communications is another essential component in maintaining an efficient operation. All team members must know how the team connects, particularly in asynchronous modes across time zones. Your communications strategy should consider the following areas:
- **Channels.** What channels will the team use for primary and secondary communications? What are the advantages and disadvantages of each? In a world of choice, simply adopting email may not be best solution and options such as Microsoft Teams may provide better clarity, improved traceability, and higher response rates. 
- **Notification types.** How are you going to notify your team of updates or events that they need to action? 
- **Message frequency and volume.** How often do you inform your team? A daily communication can provide a useful summary of what’s happened that day, but some messages may need earlier action. Most knowledge workers are overloaded with emails. Ensure that you achieve a balance between frequency and volume to avoid team members being swamped with project-related messages. 
- **Automation.** How can you automate the communication process? Standardized email templates, bots, and event alerts can all help, but need to be used responsibly if they aren't to overload team members’ ability to respond. 
- **Good communication skills.** Not everyone in a team will have the same level of communication skills, but anyone can get better. Simple approaches like choosing a good subject for an email make a dramatic difference in how well the team responds to that message. Encourage simple and effective writing in all communications; where there are actions that team members need to take, be specific and call out those actions in the subject line. 

An example of how to employ effective communication skills might be where you need to change a table definition in Dataverse, such as adding multiple fields. When you send out a notification of this intended change, the team must understand that if they don't respond within a reasonable time, then this lack of response indicates their agreement. Standardized and logical communication processes help improve efficiency and deliver expected outcomes. 

## Publish a documentation portal
Documentation isn't just an optional part of any project – it's essential for communication, collaboration, support, and ongoing operations. Commented code is good code and creating comprehensive explanatory and training documentation is an essential part of the deployment and learning phases of any fusion project. 

- **Application catalog.** The application catalog is a matrix or table that summarizes and coordinates all applications within a particular team’s responsibility. The catalog includes all the respective owners from the roles and responsibilities section. A key function is to ensure that the team knows exactly who owns what, thereby simplifying the process of contacting the right team member for specific answers. 
- **Technical questions.** Your team should maintain a repository of frequently asked (or even not-so-frequently-asked) technical questions about the operation of the app. These questions need to be reasonable, with the answers well-written and accessible. 
- **How-to guides.** How-to guides are instantly digestible sets of procedures that provide simple answers to common setup and operating questions. Typically, they would answer a specific question, such as “How do I get started creating a new app?”
- **Onboarding.** Onboarding instructions are internal-only documents designed to help new team members. This documentation would include information such as access requests, joining email distribution lists, setting up and subscribing to alerts, and so on. 

## Best practices
The following best practices should help in defining boundaries and approaches for efficient work within fusion teams.

### Accountability
While maker-led development and fusion teams enable rapid application development and deployment, it's vital to ensure that this effort is overt and conducted in partnership with the IT department. Makers must be accountable to IT to help prevent issues in relation to the growth of shadow IT systems. 

In consequence, IT must be alerted whenever a maker starts building an app. This notification in turn facilitates the development process, as IT can provide suitable support to the maker and the fusion team, helping them create well-architected apps that are properly secured and managed.

### Automation

A well-implemented automation can provide a huge boost to productivity. An example of how to increase solution deployment success is by automating any required checks in multi-solution deployments. These automated checks can include:

- Solution version verification, where each deployment uses an updated version number, thus avoiding issues when troubleshooting.
- Duplicate connection references.
- Missing connection references.
- Duplicate components.

The [PR Checker solution](community-solutions-tools.md) includes an example of how to incorporate this automation effectively. 

### Reporting

Fusion teams and maker-developed apps must align to a data-first approach, which means building apps where it's possible to monitor success directly. Achieving this outcome requires good instrumentation that provides the ability to discover what the team is doing well, along with analysis of this feedback to generate accurate appraisals of the effectiveness of a particular app. To achieve this outcome, you should:

- **Monitor and assess applications.** Just because one person thinks something is useful or a good idea, doesn’t automatically mean everyone will find value in it. Teams need to monitor app usability and assess their functionality to ensure that any new developments are useful and functioning appropriately. 
- **Encourage good judgment.** In other words, don’t build apps just because you can – only build them to address a specific business need. 


> [!div class="nextstepaction"]
> [Next step: Establishing co-development governance](governance.md)

---

## Co-development governance | Microsoft Docs

Source: [co-develop_governance.md](https://learn.microsoft.com/en-us/power-apps/guidance/co-develop/governance)

*Learn how to establish an effective co-development governance framework to ensure consistency and repeatability in maker-defined projects and fusion teams.*

# Co-development governance
Establishing an effective co-development governance framework is an important part of ensuring consistency and repeatability in maker-defined projects and fusion teams. This article describes an approach to defining a governance flowchart. 

## Defining the end-to-end process
You can use the following process as an example and customize it to your organization’s best practices. It isn't necessary to complete every single step, as long as you achieve the required outcome. 

![Sample end-to-end process](media/process-flow.png)

### Add features to backlog
Backlogs enable you to plan your project by adding features that drive the overall experience. The backlog also provides the overall roadmap that the team intends to deliver.

When adding a new feature to the backlog, the goal is to describe the general scope. Each feature then defines the business value, draft story titles, scope, and data model changes that drive the code development efforts. 

In addition, when adding a business-critical feature, you're recommended to identify any critical scenarios to automate your testing. After you've added your feature(s), you can schedule your Scope Alignment Meeting.

### Scope alignment meeting
The focus of this meeting should be limited to reviewing each proposed new feature, then checking for any existing apps, scenarios, or data models that already provide this functionality to avoid duplication of efforts. This meeting also provides the opportunity to discuss the impact on other apps. Finally, you should check if this feature requires an Experience Review.

### Add stories and storyboard to backlog
After the scope alignment meeting, any draft user story titles can be added under the feature. At this point, details aren't required, and the status of the user story is "New". You can view stories either in the backlog or board view.

The following figure shows a sample user story added to a backlog.
 
![Sample user story added to backlog](media/sample-user-story.png)

At this point, it's vital to maintain quality by organizing work by work stream and application. This approach helps keep related work items together and enables experts in each workstream to develop and maintain deep understanding of the functionality and data usage within each app. 

### Experience review
Experience Reviews should focus on the end user experience and ensure that your team follows organizational best practices. This consistency ensures that all your apps provide a dependable and repeatable experience for end users and support teams.

### Add story details
Adding a typical user story may incorporate the following information:
1. **Title**: As a \<persona\>, I can \<do something\> so that \<impact/priority/value\>
1. **Description**: The description includes (although it isn't limited to) certain key details, such as:
    - Brief description of the scenario that summarizes the desired outcome
    - Narrative - describes the actions users will take to navigate and accomplish the scenario
    - Alternative narrative - describes other ways users can accomplish the same outcome
    - Design Notes – records the entity, fields, views, mockup screens, and business rules associated with the user story
    - Security Roles Impacted - lists all the security roles impacted or that are relevant to the user story. 

After adding all these details, you would change the state of the user story to "Ready for Review". In most cases, the feature team and business team (if applicable) review the user stories.

### Story review
Story Reviews typically occur within the fusion team to ensure that all the details are called out in the story and that there's no ambiguity. Following completion of all the reviews, the recommendation is to assign the user story to a team member.
Ensuring that your team stays aligned during the development process is vital to achieving your overall goals. 

### Add tasks and test cases
After reviewing the stories, team members create tasks in [Azure DevOps](https://azure.microsoft.com/services/devops/). The overall process for adding tasks and test cases is as follows:
1. Open a sprint backlog. Alternatively, create a new sprint.
1. Add existing work items to the sprint. If you’ve already added work items that don’t appear in the sprint, then you should check their area and iteration paths. Remember to assign any unparented tasks to the relevant work items.
1. Add tasks to backlog items. If you don’t have backlog items assigned to your sprint, then do that now. Also set the sprint start and end dates.
1. Fill out the task form. As a rule of thumb, tasks should take no longer than a day to complete. Tasks that are larger than this timescale should be broken down. 
1. Track or integrate any unparented tasks. You can track unparented tasks just like other tasks or drag them to an existing backlog item to parent them. 

After adding tasks and test cases, you can then go on to set sprint capacity.

For more information on adding tasks, see [Add tasks to backlog](/azure/devops/boards/sprints/add-tasks) items to support sprint planning.

### Prepare solutions

An important aspect to successful co-development is a structured release management process. Solutions are the mechanism for implementing [application lifecycle management](/power-platform/alm/overview-alm) (ALM); you use solutions to distribute components across environments through export and import activities. A component represents an artifact used in your application and something that you can potentially customize. Anything that can be included in a solution is a component, such as tables, columns, canvas and model-driven apps, Power Automate flows, chatbots, charts, and plug-ins.  

> [!IMPORTANT]
> During release planning, determine the strategy for managing [solutions](/power-platform/alm/solution-concepts-alm) in your project. Use solutions to manage your project and easily find components you've created to then distribute to other environments.  

#### Deployments

Components can take multiple sprints to complete depending on the complexity and team velocity.  Components should be [added](/power-platform/alm/update-solutions-alm) to a solution in a development environment as tasks get completed. Solutions are then imported to a production environment after they are tested. We recommend that you also maintain one test environment to perform end-to-end testing and try out solution deployment before going to production.

#### Power Platform environments

[Environments](/power-platform/alm/basics-alm#types-of-environments-used-in-alm) are a space to store, manage, and share your organization's business data, apps, and business processes. They also serve as containers to separate apps that might have different roles, security requirements, or target audiences. 

If your organization has a multi-team fusion setup where each team is developing their own solutions, it is important to coordinate the duration of sprints and releases. Sprints do not have to be of a consistent length along a project timeline and can vary in duration between teams, according to each group's preferences. However, the release cadence cannot be less than the shortest sprint duration across all teams.   

#### Source control
Consider adopting a source code control system like Azure DevOps. [Azure DevOps](/azure/devops) provides developer services for support teams to plan work, collaborate on code development, and build and deploy applications.

Export a solution from your development environment containing your apps and customizations, unpack your solution, and store the components in your source control system. 

#### Advanced topic: Pull request (PR) reviews

You should only create PRs for stories that are active and have had features reviewed and approved. You should ensure that solution versioning is accurate, following the sprint and dev guidelines set out in [Implement Scrum practices for your team in Azure Boards](/azure/devops/boards/sprints/scrum-overview). Test results from the PR can be screenshots or videos that depict the functionality being built.

Automating the PR governance process helps ensure code quality without requiring a manual review of basic checks such as solution versions. 

> [!NOTE]
> Use the [PR checker tool](community-solutions-tools.md#pull-request-checker) to automate the pull request checking process.

## Templates and standardization

Templates and standardization deliver efficiency by helping to promote consistency within the team. All aspects of the team’s operations&#8212;whether that is onboarding tasks, story review presentations, or [work item templates](/azure/devops/boards/backlogs/work-item-template?tabs=browser) that help save time and provide guidance to teams when defining user stories, features, bugs, or tasks&#8212;benefit from standardization and simplification. 

## Implementing an effective support model
An effective support model is essential for the long-term success of an application after its deployment, as highlighted in the earlier section about generating a support matrix. Bugs and outages are inevitable, so it is vital that the team has a structured approach for dealing with these occurrences, and the support matrix provides the necessary framework. 

### Creating the service level agreement
A key factor in any support model is the definition of the Service Level Agreement (SLA). The SLA should be a formal document that the team draws up that contains sections that cover the following items:
- **Outages** – what level of service outage is acceptable, whom to inform, what actions to take, confirmation of service resumption, and actions to prevent a repeat. Any automated testing procedures that the team uses need to align with the expected outage tolerance and the applicable SLA.
- **Bugs** – who can notify, assignment of severity levels, classification, actions on detection, who is responsible for resolving and signing off.
- **Escalations** – escalation levels, assignment of staff to levels, responsibilities at each level, distribution lists for each level, and so on.

The SLA should be stored in the team’s documentation portal and updated as required. 

### Delivering application support
The best approach for delivering the application support specified in the SLA is for the team that created the solution also to be responsible for supporting it. The advantages of this system are:
1. It encourages better quality development, because those who created the app know that they're going to have to support it.
1. The creators will be able to find and fix bugs quicker than a third-party team, simply because they know the app better. 
1. Delegating the fixing of potentially mission-critical software to another group can be demoralizing and time-consuming for that group.
As with other phases of application creation, development, and deployment, the fusion team should partner with IT for assistance when required.

## Monitoring application satisfaction and usability
The final part of the support effort is monitoring and assessing the satisfaction and usability of the deployed app. Metrics are useful here, along with more traditional methods, such as polling and questionnaires. For more information about monitoring app usage, see [Admin Analytics for Power Apps](/azure/devops/boards/backlogs/work-item-template?tabs=browser). 

Ultimately, if customers aren’t using a published app, then that app isn’t fulfilling its purpose. Regular review meetings can check on these satisfaction and usability metrics to create a positive feedback loop that can alter or add stories to the backlog to generate and then deploy an updated version of the app. 

## Summary
The development of no-code and low-code tools such as Power Apps has expanded options for business technologists or makers to create, develop, and deploy apps. This development works best within a fusion team environment, comprising a product owner, a domain expert, a pro dev, and an administrator, with this team bringing in other resources as required. 

Integrating agile and scrum development approaches within fusion teams results in more rapid app development and a higher probability of successful deployment with a feature set that makes a significant difference to the business. By applying these best practices, guidelines, and recommendations, your fusion team will be able to use Power Apps to address your organization’s digital transformation challenges.  

> [!div class="nextstepaction"]
> [Next step: Try community solutions and tools](community-solutions-tools.md)

---

## Try community solutions and tools | Microsoft Docs

Source: [co-develop_community-solutions-tools.md](https://learn.microsoft.com/en-us/power-apps/guidance/co-develop/community-solutions-tools)

*Learn about community solutions and tools available for fusion teams to use.*

# Try community solutions and tools

This article provides information on community solutions and tools available for fusion teams to use. Although the underlying features and components used to build these are fully supported, the solutions and tools shared below are sample implementations. Our customers and community can use and customize these to implement in their organizations.

> [!IMPORTANT]
> - If you encounter issues using the solutions and tools, report issues at [https://aka.ms/microsoft-focus-center-issues](https://aka.ms/microsoft-focus-center-issues).
> - Microsoft Support won't help with issues related to community solutions and tools. For issues with core features in Microsoft Power Platform, use standard channel to contact Microsoft Support.

## Anonymizer
A tool to anonymize data in Dataverse tables after a production org is copied over to a sandbox instance. This is specially useful when you need to anonymize for privacy reasons before developers use the sandbox instance.

More information: [Data Anonymization Tools](https://github.com/microsoft/Microsoft-Focus-Center/tree/main/Tools/Anonymization)

## Just-in-Time access

A lightweight and extensible solution for requesting elevated access on a production Dynamics 365 environment using a Canvas app.

More information: [Building a JIT app for elevated permissions on Microsoft Power Platform](https://powerapps.microsoft.com/en-us/blog/building-a-jit-app-for-elevated-permissions-on-microsoft-power-platform)

## Pull request checker

An ADO build pipeline tool to automate routine and common checks for Dynamics 365 solutions to improve solution ALM and deployments to higher environments.

More information: [Focus Center PR checker](https://github.com/microsoft/Microsoft-Focus-Center/tree/main/Tools/FocusCenterPRChecker)

