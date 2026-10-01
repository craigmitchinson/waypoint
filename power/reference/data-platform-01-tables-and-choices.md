# Dataverse — Tables, Columns & Choices Reference

Verbatim Markdown pulled directly from Microsoft's published documentation source, snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline where the include content was reachable. Source repository: `MicrosoftDocs/powerapps-docs`, folders `powerapps-docs/maker/canvas-apps/` and `powerapps-docs/maker/data-platform/`. Note: the real published filename for the choice-column overview page is `create-edit-global-option-sets.md` — "Choice columns overview" is its display title, the URL slug did not rename when the feature was renamed from option sets to choices. No current Microsoft Learn page for a "Configuration Migration tool" was found under this TOC; that utility (if still referenced) is not part of the maker/data-platform documentation set as of this snapshot.

Pages in this file: 7

## Contents

1. [Understand tables and records in canvas apps](#understand-tables-and-records-in-canvas-apps)
2. [Create and edit Dataverse tables in canvas apps using the table designer](#create-and-edit-dataverse-tables-in-canvas-apps-using-the-table-designer)
3. [Create and edit columns for Microsoft Dataverse using Power Apps solution explorer | MicrosoftDocs](#create-and-edit-columns-for-microsoft-dataverse-using-power-apps-solution-explorer-microsoftdocs)
4. [Create and edit choices (picklists) overview for Microsoft Dataverse | MicrosoftDocs](#create-and-edit-choices-picklists-overview-for-microsoft-dataverse-microsoftdocs)
5. [Create a choice column](#create-a-choice-column)
6. [Define alternate keys using Power Apps](#define-alternate-keys-using-power-apps)
7. [Define alternate keys using solution explorer | MicrosoftDocs](#define-alternate-keys-using-solution-explorer-microsoftdocs)

---

## Understand tables and records in canvas apps

Source: [working-with-tables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-tables)

*Reference information about working with tables, columns, and records in canvas apps.*

# Understand tables and records in canvas apps

In Power Apps, you can create a canvas app that accesses information in Microsoft Excel, SharePoint, SQL Server, and several other sources that store data in records and tables. To work most effectively with this kind of data, review the concepts that underlie these structures.

* A record contains one or more categories of information about a person, a place, or a thing. For example, a record might contain the name, the email address, and the phone number of a single customer. Other tools refer to a record as a "row" or an "item."
* A table holds one or more records that contain the same categories of information. For example, a table might contain the names, the email addresses, and the phone numbers of 50 customers.

In your app, use [formulas](working-with-formulas.md) to create, update, and manipulate records and tables. You probably read and write data to an external [data source](working-with-data-sources.md), which is an extended table. In addition, you might create one or more internal tables, which are called [collections](working-with-data-sources.md#collections).

You can build a variety of formulas that take the name of a table as an argument, just as a formula in Excel takes one or more cell references as arguments. Some formulas in Power Apps return a table that reflects the other arguments that you specify. For example, you might create a formula:

* to update a record in a table by specifying that table as one of multiple arguments for the **[Patch](functions/function-patch.md)** function
* to add, remove, and rename columns in a table by specifying that table as an argument for the **[AddColumns](functions/function-table-shaping.md)**, **[DropColumns](functions/function-table-shaping.md)**, or **[RenameColumns](functions/function-table-shaping.md)** function. None of those functions modifies the original table. Instead, the function returns another table based on the other arguments that you specify.

## Elements of a table
![Table elements.](media/working-with-tables/elements-of-a-table.png)

### Records
Each record contains at least one category of information for a person, a place, or a thing. The example above shows a record for each product (**Chocolate**, **Bread**, and **Water**) and a column for each category of information (**Price**, **Quantity on Hand**, and **Quantity on Order**).

In a formula, you can refer to a record by itself, outside of a table's context, by using curly braces. For example, this record **{ Name: "Strawberries", Price: 7.99 }** isn't associated with a table. Field names, such as **Name** and **Price** in that example, aren't enclosed in double quotation marks.

### Fields
A field is an individual piece of information in a record. You can visualize this sort of field as a value in a column for a particular record.

Just as with a control, you refer to a field of a record by using the **.** [operator](functions/operators.md) on the record.  For example, **First(Products).Name** returns the **Name** field for the first record in the **Products** table.

A field can contain another record or table, as the example for the **[GroupBy](functions/function-groupby.md)** function shows. You can nest as many levels of records and tables as you want.

### Columns
A column refers to the same field for one or more records in a table. In the preceding example, each product has a price field, and all products share the same column for that price. The preceding table has four columns, shown horizontally across the top:

* **Name**
* **Price**
* **Quantity on Hand**
* **Quantity on Order**

The column's name reflects the fields in that column.

All values within a column are of the same data type. In the preceding example, the "Quantity on Hand" column always contains a number and can't contain a string, such as "12 units," for one record. The value of any field can also be *blank*.  

You might have referred to columns as "fields" in other tools.

> [!NOTE]
> For data sources such as SharePoint, Excel, or Power BI tiles that contain column names with spaces, Power Apps replaces the spaces with **"\_x0020\_"**. For example, **"Column Name"** in SharePoint, Excel, or Power BI tile appears as **"Column_x0020_Name"** in Power Apps when displayed in the data layout or used in a formula.

### Table
A table comprises one or more records, each with multiple fields that have consistent names across the records.

You use the table name to refer to any table stored in a data source or a collection. You can also pass the table name to functions that take tables as arguments. A function or formula can also return tables.

As shown in the following example, you can express a table in a formula by using the **[Table](functions/function-table.md)** function with a set of records, which you express in curly braces:

`Table( { Value: "Strawberry" }, { Value: "Vanilla" } )`

You can also define a single-column table by using square brackets. The following expression is an equivalent way to write the preceding expression:

`[ "Strawberry", "Vanilla" ]`

## Table formulas
In Excel and Power Apps, you use formulas to manipulate numbers and strings of text in similar ways:

* In Excel, type a value, such as **42**, in cell **A1**, and then type a formula, such as **A1+2**, in another cell to show the value of **44**.
* In Power Apps, set the **[Default](controls/properties-core.md)** property of **Slider1** to **42**, and set the **[Text](controls/properties-core.md)** property of a label to **Slider1.Value + 2** to show the value of **44**.

In both cases, the calculated value changes automatically if you change the values of the arguments (for example, the number in cell **A1** or the value of **Slider1**).

Similarly, you can use formulas to access and manipulate data in tables and records. You can use names of tables as arguments in some formulas, such as **Min(Catalog, Price)** to show the lowest value in the **Price** column of the **Catalog** table. Other formulas provide whole tables as return values, such as **RenameColumns(Catalog, "Price", "Cost")**, which returns all the records from the **Catalog** table but changes the name of the **Price** column to **Cost**.

Just as with numbers, formulas that involve tables and records automatically recalculate as the underlying table or record changes. If the cost of a product in the **Catalog** table is lowered to a value that is less than the previous minimum, the return value of the **[Min](functions/function-aggregates.md)** formula automatically changes to match it.

Let's walk through some simple examples.

1. Create a blank app for a phone, and add a vertical **[Gallery](controls/control-gallery.md)** control that contains other controls.

    By default, the screen shows placeholder text from a table named **CustomGallerySample**. The **[Items](controls/properties-core.md)** property of the screen's **[Gallery](controls/control-gallery.md)** control is automatically set to that table.

    ![Gallery.](media/working-with-tables/gallery-items.png)

    > [!NOTE]
    > Some controls are rearranged and enlarged for illustration purposes.

1. Instead of setting the **[Items](controls/properties-core.md)** property to the name of a table, set it to a formula that includes the name of the table as an argument, as in this example:

    `Sort(CustomGallerySample, SampleHeading, SortOrder.Descending)`

    This formula incorporates the **[Sort](functions/function-sort.md)** function, which takes the name of a table as its first argument and the name of a column in that table as its second argument. The function also supports an optional third argument, which stipulates that you want to sort the data in descending order.

    ![Sort for gallery.](media/working-with-tables/gallery-items-sort.png)

1. Set the **[Items](controls/properties-core.md)** property to a formula that takes the formula from the previous step as an argument and returns a table, as in this example:

    `FirstN(Sort(CustomGallerySample, SampleHeading, SortOrder.Descending), 2)`

    In this formula, you use the **[FirstN](functions/function-first-last.md)** function to show a particular number of records in a table. You use the **[Sort](functions/function-sort.md)** function as the first argument to **[FirstN](functions/function-first-last.md)** and a number (in this case, **2**) as the second argument, which specifies how many records to show.

    The entire formula returns a table that contains the first two records of the **CustomGallerySample** table, sorted by the **SampleHeading** column in descending order.

    ![FirstN for gallery.](media/working-with-tables/gallery-items-sort-firstn.png)

## Table functions and control properties

Consider the **Lower** function. If the variable **welcome** contains the text string **"Hello, World"**, the formula **Lower( welcome )** returns **"hello, world"**. This function doesn't change the value in that variable. **Lower** is a pure function because it only processes input and produces output. It has no side effects. All functions in Excel and most functions in Power Apps are pure functions, which means the workbook or the app recalculates automatically.

Power Apps offers a set of functions that operate on tables in the same manner. These functions take tables as input and filter, sort, transform, reduce, and summarize entire tables of data. In fact, **Lower** and many other functions that typically take a single value can also take a single-column table as input.

* **[Sort](functions/function-sort.md)**, **[Filter](functions/function-filter-lookup.md)** - Sort and filter records.
* **[FirstN](functions/function-first-last.md)**, **[LastN](functions/function-first-last.md)** - Return the first N or last N records of the table.
* **[Abs](functions/function-numericals.md)**, **[Sqrt](functions/function-numericals.md)**, **[Round](functions/function-round.md)**, **[RoundUp](functions/function-round.md)**, **[RoundDown](functions/function-round.md)** - Perform arithmetic operations on each record of a single-column table, resulting in a single-column table of results.
* **[Left](functions/function-left-mid-right.md)**, **[Mid](functions/function-left-mid-right.md)**, **[Right](functions/function-left-mid-right.md)**, **[Replace](functions/function-replace-substitute.md)**, **[Substitute](functions/function-replace-substitute.md)**, **[Trim](functions/function-trim.md)**, **[Lower](functions/function-lower-upper-proper.md)**, **[Upper](functions/function-lower-upper-proper.md)**, **[Proper](functions/function-lower-upper-proper.md)** - Perform string manipulations on each record of a single-column table, resulting in a single-column table of strings.
* **[Len](functions/function-len.md)** - For a column of strings, returns a single-column table that contains the length of each string.
* **[Concatenate](functions/function-concatenate.md)** - Concatenates multiple columns of strings, resulting in a single-column table of strings.
* **[AddColumns](functions/function-table-shaping.md)**, **[DropColumns](functions/function-table-shaping.md)**, **[RenameColumns](functions/function-table-shaping.md)**, **[ShowColumns](functions/function-table-shaping.md)** - Perform column manipulation of the table, resulting in a new table with different columns.
* **[Distinct](functions/function-distinct.md)** - Removes duplicate records.
* **[Shuffle](functions/function-shuffle.md)** - Shuffles records into a random order.
* **[HashTags](functions/function-hashtags.md)** - Searches for hashtags in a string.
* **[Errors](functions/function-errors.md)** - Provides error information when you work with a data source.

Many of these functions take a single-column table as their input. If an entire table has only one column, you can specify it by name. If a table has multiple columns, you can specify one of those columns by using *Table.Column* syntax. For example, **Products.Name** returns the single-column table of only **Name** values from the **Products** table.

You can completely reshape a table however you want by using the **[AddColumns](functions/function-table-shaping.md)**, **[RenameColumns](functions/function-table-shaping.md)**, **[ShowColumns](functions/function-table-shaping.md)**, or **[DropColumns](functions/function-table-shaping.md)** function. Again, these functions change only their output, not their source.

Properties of controls can also be tables:

* **Items** - Applies to galleries, list boxes, and combo boxes. This property defines the table that the gallery or the list shows.
* **SelectedItems** - Applies to list boxes and combo boxes. This property defines the table of items that the user selected if **SelectMultiple** is enabled.

## Behavioral formulas

Some functions are specifically designed to modify data and have side effects. Because these functions aren't pure, you must build them carefully. They can't participate in automatically recalculating values in the app. You can use these functions only within [behavioral formulas](working-with-formulas-in-depth.md).

* **[Collect](functions/function-clear-collect-clearcollect.md)**, **[Clear](functions/function-clear-collect-clearcollect.md)**, **[ClearCollect](functions/function-clear-collect-clearcollect.md)** - Creates collections, clears them, and adds data to them.
* **[Patch](functions/function-patch.md)** - Modifies one or more fields in a record.
* **[Update](functions/function-update-updateif.md)**, **[UpdateIf](functions/function-update-updateif.md)** - Updates records that match one or more criteria that you specify.
* **[Remove](functions/function-remove-removeif.md)**, **[RemoveIf](functions/function-remove-removeif.md)** - Deletes records that match one or more criteria that you specify.

## Record formulas

You can also build a formula that calculates data for an individual record, takes an individual record as an argument, and provides an individual record as a return value. Returning to the gallery example, use the **Gallery1.Selected** property to display information from whatever record the user selects in that gallery.

1. Add a [**Button**](controls/control-button.md), and set its **[OnSelect](controls/properties-core.md)** property to this formula:<br>
    **Collect( SelectedRecord, Gallery1.Selected )**

1. Select the button while holding down the Alt key.

1. In the **File** menu, select **Collections.**

    ![SelectedRecord collection.](media/working-with-tables/selected-collection.png)

This formula returns a record that includes not only the data from the record that's currently selected in the gallery but also each control in that gallery. For example, the record contains both a **SampleText** column, which matches the **SampleText** column in the original table, and a **Subtitle1** column, which represents the label that shows the data from that column. Select the table icon in the **Subtitle1** column to drill into that data.

> [!NOTE]
> The **Subtitle1** column might be named **Subtitle2** or similar if you add elements other than those that this topic specifies.

Now that you have the selected record, you can extract individual fields from it by using the **.** operator.

1. Add a **[Label](controls/control-text-box.md)** control, and then move it under the gallery and the button.

1. Set the label's **[Text](controls/properties-core.md)** property to this expression:<br>
    **"Selected: " & Gallery1.Selected.SampleHeading**

    ![Text property with updated label.](media/working-with-tables/gallery-selected.png)

You took the **Selected** property, which is a record, and extracted the **SampleHeading** property from it.

You can also use a record as a general-purpose container for related named values.

* If you build a formula around the **[UpdateContext](functions/function-updatecontext.md)** and **[Navigate](functions/function-navigate.md)** functions, use a record to gather the [context variables](working-with-variables.md#use-a-context-variable) that you want to update.
* Use the **[Updates](controls/control-form-detail.md)** property on an **[Edit form](controls/control-form-detail.md)** control to gather the changes that the user makes in a form.
* Use the **[Patch](functions/function-patch.md)** function to update a data source but also to merge records.

In these cases, the record was never a part of a table.

## Record functions and control properties
Functions that return records:

* **[FirstN](functions/function-first-last.md)**, **[LastN](functions/function-first-last.md)** - Returns the first or last record or records of the table.
* **[Lookup](functions/function-filter-lookup.md)** - Returns the first record from a table that matches one or more criteria.
* **[Patch](functions/function-patch.md)** - Updates a data source or merges records.
* **[Defaults](functions/function-defaults.md)** - Returns the default values for a data source.

Properties that return records:

* **Selected** - Applies to galleries and list boxes. Returns the currently selected record.
* **Updates** - Applies to galleries.  Pulls together all the changes that a user makes in a data-entry form.
* **[Update](functions/function-update-updateif.md)** - Applies to input controls such as text-input controls and sliders. Sets up individual properties for the gallery to pull together.

## Record scope

Some functions work by evaluating a formula across all the records of a table, one record at a time. You use the formula's result in different ways for each function:

* **AddColumns** - Use the formula to get the value for the new field you add.
* **Average**, **Max**, **Min**, **Sum**, **StdevP**, **VarP** - Use the formula to get the value you want to aggregate.
* **Filter**, **Lookup** - Use the formula to decide if the record should be part of the output.
* **Concat** - Use the formula to decide which strings to join together.
* **Distinct** - Use the formula to return a value that helps find duplicate records.
* **ForAll** - Use the formula to return any value, possibly with side effects.
* **Sort** - Use the formula to get the value to sort the records by.
* **With** - Use the formula to return any value, possibly with side effects.

Inside these formulas, you can reference the fields of the record you're working on. Each of these functions creates a "record scope" where the formula runs. The fields of the record show up as top-level identifiers. You can also reference control properties and other values from throughout your app.

For example, consider a table of **Products**:

![Products example.](media/working-with-tables/requested.png)

To create this example table in your app, insert a button, set its **OnSelect** property to this formula, and then select the button (click it while you hold down the Alt key in Power Apps Studio):

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

To check if any of these products have more requested than is available, use this formula:

`Filter( Products, 'Quantity Requested' > 'Quantity Available' )`

The first argument to **Filter** is the table of records to work on. The second argument is a formula. **Filter** makes a record scope for evaluating this formula. The fields of each record are available, like **Product**, **Quantity Requested**, and **Quantity Available**. The result of the comparison decides if each record should be part of the function's result:

![Filtered table.](media/working-with-tables/needed.png)

You can add to this example by calculating how much of each product to order:

```power-fx
AddColumns( 
    Filter( Products, 'Quantity Requested' > 'Quantity Available' ), 
    "Quantity To Order", 'Quantity Requested' - 'Quantity Available'
)
```

Here, you add a calculated column to the result. **AddColumns** uses its own record scope to calculate the difference between what you requested and what is available.

![Added columns.](media/working-with-tables/toorder.png)

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

![Updated table.](media/working-with-tables/toorderonly.png)

In the preceding example, you used double quotes (") in some places and single quotes (') in other places. You need single quotes when you reference the value of an object, such as a field or table, and the name of the object contains a space. Use double quotes when you're not referencing the value of an object but instead talking about it. Use double quotes especially in situations where the object doesn't yet exist, as in the case of **AddColumns**.

## Disambiguation

Field names you add with the record scope override the same names from elsewhere in the app.  When this happens, you can still access values from outside the record scope by using the [**@** disambiguation](functions/operators.md) operator:

* To access values from nested record scopes, use the **@** operator with the name of the table you're operating upon, using this pattern:<br>_Table_**[@**_FieldName_**]**
* To access global values, such as data sources, collections, and context variables, use the pattern **[@**_ObjectName_**]** (without a table designation).

If the table you're operating upon is an expression, such as **Filter(** _Table_**,** ... **)**, you can't use the disambiguation operator.  Only the innermost record scope can access fields from this table expression, by not using the disambiguation operator.

For example, imagine having a collection **X**:

![Collection X.](media/working-with-tables/X.png)

You create this collection by using **ClearCollect( X, \[1, 2\] )**.

And another collection **Y**:

![Collection Y.](media/working-with-tables/Y.png)

You create this collection by using **ClearCollect( Y, ["A", "B"] )**.

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

![XY table.](media/working-with-tables/XY.png)

What's going on here?  The outermost **ForAll** function defines a record scope for **X**, allowing access to the **Value** field of each record as it processes.  You can access it by simply using the word **Value** or by using **X[@Value]**.

The innermost **ForAll** function defines another record scope for **Y**.  Since this table also has a **Value** field defined, using **Value** here refers to the field in **Y**'s record and no longer the one from **X**.  To access **X**'s **Value** field, you must use the longer version with the disambiguation operator.

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

![Single column table.](media/working-with-tables/single-column.png)

For a shorter alternative, specify *Table.Column*, which extracts the single-column table of just *Column* from *Table*. For example, this formula produces exactly the same result as using **ShowColumns**.

```power-fx
Products.Product
```

## Inline records

Express records by using curly braces that contain named field values.  For example, you can express the first record in the table at the start of this topic by using this formula:

`{ Name: "Chocolate", Price: 3.95, 'Quantity on Hand': 12, 'Quantity on Order': 10 }`

You can also embed formulas within other formulas, as this example shows:

`{ Name: First(Products).Name, Price: First(Products).Price * 1.095 }`

You can nest records by nesting curly braces, as this example shows:

`{ 'Quantity': { 'OnHand': ThisItem.QuantOnHand, 'OnOrder': ThisItem.QuantOnOrder } }`

Enclose each column name that contains a special character, such as a space or a colon, in single quotes.  To use a single quote within a column name, double it.

Note that the value in the **Price** column doesn't include a currency symbol, such as a dollar sign. That formatting is applied when the value is displayed.  

## Inline tables
Create a table by using the **[Table](functions/function-table.md)** function and a set of records. You can express the table at the start of this topic by using this formula:

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
Create single-column tables by specifying values in square brackets. The resulting table has a single column, named **Value**.

For example, `[ 1, 2, 3, 4 ]` is equivalent to `Table( { Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: 4 } )` and returns this table:

![Inline table.](media/working-with-tables/inline-table.png)

---

## Create and edit Dataverse tables in canvas apps using the table designer

Source: [create-edit-tables.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-edit-tables)

*Create and edit Dataverse tables in canvas apps using the table designer.*

# Create and edit tables using the table designer

Create and edit Dataverse tables in canvas apps using the table designer inside [Power Apps Studio](power-apps-studio.md). You can also work with the data that's in the table without leaving the app that you're working on.

## Create a table

1. Create a [new](data-platform-create-app.md) or open an [existing](edit-app.md) app in Power Apps Studio.

1. In the app authoring menu, select **Data**.

   :::image type="content" source="media/tables/data-pane-1.png" alt-text="Screenshot that shows where to select the Data menu option from the authoring menu.":::

1. On the **Data** pane, select **Add Data** > **Create new table**.  

   > [!NOTE]
   > If the **Create new table** button is disabled then review [**Required permissions and limitations**](create-edit-tables.md#required-permissions-and-limitations).

   :::image type="content" source="media/tables/create-new-table.png" alt-text="Screenshot that shows what you see after you select Create new table." lightbox="media/tables/create-new-table.png":::

1. You see **Choose an option to create tables**. For example, you can choose to **Start from blank** or **Start with Copilot** to create a new table.

1. A new table is created for you in the canvas. Enter a name for the table directly where you see the table name.

   You can also expand the **Properties** pane found in the table's overflow menu (the ellipses) to edit the table properties, such as the plural name for the table. For example, a table name can be Ticket, and the plural table name can be Tickets.

   :::image type="content" source="media/tables/edit-table-properties.png" alt-text="Screenshot that shows the Edit table properties popup next to a table in the canvas." lightbox="media/tables/edit-table-properties.png":::

   Can you also add columns or sample data to the table.

1. When you're done editing, select **Save** and exit.

## Edit an existing table

Once a Dataverse table is created, you can start editing the table. You can also add existing Dataverse tables to your app and edit those tables using the table designer.

1. From the app authoring menu, select **Data**.

1. On the **Data** pane, select **Add data**.

1. In the **Select a data source** dialog box, from the list of Dataverse tables, select a table to add to your app.

   :::image type="content" source="media/tables/select-table-5.png" alt-text="Screenshot that shows how to add a table from the Data pane.":::

1. On the newly added table select, **More actions** > **Edit data**.

   :::image type="content" source="media/tables/edit-table-data-6.png" alt-text="Screenshot that shows the Data pane with the overflow menu on a table selected with the Edit data option.":::

1. The selected table is ready for editing in the table designer.

    > [!NOTE]
    > Some system tables might not be available for editing, or some editing actions may be disabled.

### Edit the table properties

After selecting **Edit data**, you see the **Edit table** designer.

1. Select **Edit table properties**.

   ![Edit table properties.](media/tables/edit-table-properties-7.png)

You can edit the following table properties.

| **Property** | **Description** |
|--------------|-----------------|
| **Display name** | The singular name for the table shown in the app. The display name can be changed later. |
| **Plural display name** | The plural name for the table shown in the app. The plural display name can be changed later. |
| **Description** | Provide a meaningful description of the purpose of the table. |

Select **Enable Attachments** to append notes and files to records for this table.

Select the **Primary column** tab if you want to change its **Display Name** or **Description**. The primary column is used by lookup fields when establishing relationships with other tables.

#### Advanced options

Select **Advanced options** to see the optional properties you can set. Otherwise some are already set for you.

| **Property** | **Description** |
|--------------|-----------------|
| **Schema name** | By default, the schema name is automatically created for you based on the display name, but you can change it. The schema name can't contain spaces and includes the customization prefix for the Dataverse solution publisher. You can't change the schema name after the table is saved. |
| **Logical name** | A unique identifier for the entity. This name can't be changed once the entity is created. |
| **Type** | Select the type of table. Use standard for most tables. Activity tables are special tables that can only be owned by a user or team, but can't be owned by an organization. Virtual tables require the table be populated with data from an external source. |
| **Record ownership** | Switch the table type to Activity table, so you can create tables that can manage tasks. The type of **Ownership** defines who can perform operations on a record. |
| **Color** | You can select your table color using words or hex codes.|
| **Primary row image** | You can choose whether to display an image for the table. This image is displayed in Power Apps in some design areas. Notice that the image doesn't appear in apps using the table. To display images in apps, use the image column. Learn more in [Image columns](../data-platform/types-of-fields.md#image-columns). |
| **Apply duplicate detection rules** | If duplicate detection is enabled for your organization, enabling allows you to create duplicate detection rules for this table. |
| **Track changes** | Enables data synchronization in a performant way by detecting what data changed since the data was initially extracted or last synchronized. |
| **Provide custom help** | When selected, set a **Help URL** to control what page users see when they select the help button in the application. Use help to provide guidance specific to your company processes for the table. |
| **Audit changes to its data** | When auditing is enabled for your organization, table records can change to be captured over time. When you enable auditing for a table, auditing is also enabled on all its fields. You can select or clear fields that you want to enable auditing on. |
| **Leverage quick create form if available** | After you create and publish a Quick Create Form for this table, people can create a new record using the Create button in the navigation pane. Learn more in [Create and design model-driven app forms](../model-driven-apps/create-design-forms.md).<br /></br>If enabled for a custom activity table, the custom activity is visible in the group of activity entities when people use the **Create** button in the navigation pane. However, because activities don't support quick create forms, the main form is used when the custom table icon is selected. |
| Enable long term retention | Table can be included in the configuration of data retention, which moves certain records to long term storage. |
| **Creating a new activity** | Associate activities to records for this table. |
| **Doing a mail merge** | App users can use this table with mail merge. |
| **Setting up SharePoint document management** | After other tasks are performed to enable document management for your organization, enabling this feature allows for this table to participate in integration with SharePoint. |
| **Can have connections** | Use the connections feature to show how records for this table have connections to records of other tables that also have connections enabled. |
| **Can have a contact email** | Send emails using an email address stored in one of the fields for this table. If a **Single Line of Text** column with format set to email doesn't already exist for this table, a new one is created when you enable sending email. |
| **Have an access team** | Create team templates for this table. |
| **Can be linked to feedback** | Let app users write feedback for any table record, or rate table records within a defined rating range. Learn more in [Configure a table for feedback/ratings](../data-platform/configure-entity-feedback.md). |
| **Appear in search results** | Enable so that table records can be included in search results when using an app. |
| **Can be taken offline** | Makes data in this table available while the Power Apps application isn't connected to a network. |
| **Can be added to a queue** | Use the table with queues. Queues improve routing and sharing of work by making records for this table available in a central place that everyone can access. |

### Add and edit columns

You can create and edit columns in the table editor.

Learn more in [How to create and edit columns](../data-platform/create-edit-fields.md).

### Editing other table properties

For more advanced table editing scenarios, using the table hub is required. Some examples of these kinds of edits are table relationships, keys, and deleting the table.

Learn more in [Create and edit tables using Power Apps](../data-platform/create-edit-entities-portal.md).

### Add and edit data

The table designer for canvas apps allows you to add new rows to a Dataverse table or edit rows inside Power Apps Studio using the table designer. You can start typing directly into the grid or select, **New row**.

Learn more in [Create your first table](../../teams/create-first-app.md#create-your-first-table).

## Remove a table

To remove a table from your app, select **More options** to the right of the table name then select, **Remove**.

> [!NOTE]
> When you remove a table, the table is removed and not deleted.

:::image type="content" source="media/tables/remove-table-8.png" alt-text="Screenshot that shows the Remove option from the overflow menu of a table in the Data pane.":::

## Required permissions and limitations

- To create a table in Dataverse, the environment must have a Dataverse database provisioned. You must have system customizer or system administrator permissions for the environment where you'd like to build a table. If these conditions aren't met, the **Create New Table** button is disabled.

- You can only create and edit tables in the current Dataverse environment. If you changed your Dataverse environment using the environment picker, then the **Create new table** and **Edit table** options is disabled.

---

## Create and edit columns for Microsoft Dataverse using Power Apps solution explorer | MicrosoftDocs

Source: [create-edit-field-solution-explorer.md](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-field-solution-explorer)

*Discover how to create and edit columns in Power Apps*

# Create and edit columns for Microsoft Dataverse using Power Apps solution explorer

Solution explorer provides one way to create and edit columns for Dataverse.

The [Power Apps portal](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) enables configuring the most common options, but certain options can only be set using solution explorer. <br />More information: 
- [Create and edit columns for Dataverse](create-edit-fields.md)
- [Create and edit columns for Dataverse using Power Apps portal](create-edit-field-portal.md)
  
Part of the name of any custom column you create is the customization prefix. This is set based on the solution publisher for the solution you’re working in. Make sure that you're working in an unmanaged solution where the customization prefix is the one you want for this table. More information: [Change the solution publisher prefix](create-solution.md#solution-publisher) 

## View columns

1. From [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), select **Solutions** on the left navigation pane, and then on the toolbar select **...** > **Switch to classic**.
1. Open the unmanaged solution where you want to view a column. The classic solution explorer opens in a new browser window.
1. In the classic solution explorer, under **Components** expand **Entities**, expand the table where you want to view columns, and then select **Fields**.

   ![Solution explorer columns view.](media/solution-explorer-fields-view.png)

In the **View** drop down list you can select one of the following views: 

 |View|Description|
 |--|--|
 |**All**| Shows all the columns for the table|
 |**Custom**|Shows only custom columns for the table|
 |**Customizable**|Shows only the columns that can be edited|

## Create a column

While viewing columns, in the command bar, select **New** which opens the new column form. Some standard tables or custom tables that are included in a managed solution might not allow you to add new columns.

> [!NOTE]
> For model-driven apps, you can also create a new column from the form editor. In the form editor, below the **Column Explorer** select **New Column** to create a new column. More information: [Add, configure, move, or delete columns on a form](../model-driven-apps/add-move-or-delete-fields-on-form.md)

![Solution explorer new column form.](media/solution-explorer-new-field-form.png)

You must enter data and confirm default values set for the following properties before you save.

|Property|Description|
|--|--|
|**Display Name**|The text to be displayed for the column in the user interface. You can change this after you save, but the value you enter will generate a value for the **Name** column.|
|**Column Requirement**|Whether data is required in the column to save the row. More information: [Column Requirement options](#column-requirement-options)|
|**Name**|The unique name across your environment. A name is generated for you based on the display name that you've entered, but you can edit it before saving. Once a column is created the name can't be changed as it might be referenced in your applications or code. The name has the customization prefix for the current solution's publisher prepended to it.|
|**Searchable**|Set this to **No** for columns for the table that you don’t use. When a column is searchable, it appears in **Advanced Find** in model-driven apps and is available when customizing views. Deselecting this reduces the number of options shown to people using advanced find.|
|**Column Security**|Whether the data in the column is secured at a higher level than the table. More information: [Column level security to control access](/dynamics365/customer-engagement/admin/field-level-security)|
|**Auditing**|Whether data for this column is audited when the table is enabled for auditing. More information: [Manage Dataverse auditing](/power-platform/admin/manage-dataverse-auditing)|
|**Description**|Enter instructions to the user about what the column is for. These descriptions appear as tooltips for the user in model-driven apps when they hover their mouse over the label of the column.|
|**Appears in global filter in interactive experience**|More information: [Configure interactive experience dashboards](/dynamics365/customer-engagement/customize/configure-interactive-experience-dashboards) |
|**Sortable in interactive experience dashboard**|More information: [Configure interactive experience dashboards](/dynamics365/customer-engagement/customize/configure-interactive-experience-dashboards)|
|**Data type**|Controls how values are stored as well as how they're formatted in some applications. Once a column is saved, you can't change the data type as it might impact the data in your table. More information: [Column Data types](#column-data-types)|
|**Column type**|Whether the column is **Simple**, **Calculated**, or **Rollup**. More information: [Column Type](#column-type)|
|**Format**|How the column is formatted. The available formatting options depend on the **Data type**.|

You can set additional options depending on your choice of **Data type**. More information: [Column Data types](#column-data-types)

## Column Requirement options

There are three column requirement options:

- **Optional**: The row can be saved even if there's no data in this column.
- **Business Recommended**: The row can be saved even if there's no data in this column. However, a blue symbol appears next to the column to indicate it's important.
- **Business Required**: The row can’t be saved if there's no data in this column. 

> [!NOTE]
>
> - When a row is saved programmatically using web services, only the SystemRequired columns are enforced. Failure to set a value for SystemRequired columns return an error. You can’t set the SystemRequired level of requirement. <br />Setting a column to Business Required means that the default behavior of a model-driven or canvas app will enforce this requirement in the app. The request won't be sent to the service if the column has no value. The app user is shown an error and prompted to add data to the required column before they can save the row. There are options within the app to override this behavior and allow operation to proceed if needed.
> - Be careful when you make columns business required. People will resist using the application if they can’t save rows because they lack the correct information to enter into a required column. People might enter incorrect data simply to save the row and get on with their work. You can use business rules or form scripts to change the requirement level as the data in the row changes as people work on it. More information  [Create business rules and recommendations to apply logic in a form](../model-driven-apps/create-business-rules-recommendations-apply-logic-form.md)

## Column Data types

There are many different types of columns, but you can only create some of them. For more information about all types of columns, see [Types of columns and column data types](types-of-fields.md).

When you create a column, **Data type** provides the following choices:

|Option|Description|
|--|--|
|**Single Line of Text**|This column can contain up to 4,000 text characters. You can set a maximum length to be less than this. This column has several format options that change the presentation of the text. More information: [Single line of text options](#single-line-of-text-options)|
|**Choice**|Displays a list of options where one can be selected. More information: [Choice column options](#choice-column-options)|
|**MultiSelect Choice**|Displays a list of options where more than one can be selected. More information: [Choice column options](#choice-column-options)|
|**Yes/No**|Displays a list of options where one of two can be selected.<br /><br /> Yes/No columns don’t provide format options at the column level. But when you add one to the form you can choose to display them as radio buttons, a check box, or a select list.|
|**Image**|Displays a single image per row in the application. Each table can have one image column. Image columns are always named `tableImage`.|
|**Whole Number**|Integers with a value between -2,147,483,648 and 2,147,483,647 can be in this column. This column has options that change depending on how the column is presented. More information: [Whole number options](#whole-number-choices)|
|**Floating Point Number**|Up to 5 decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column. You can specify the level of precision and the maximum and minimum values. More information: [Using the right type of number](types-of-fields.md#using-the-right-type-of-number)|
|**Decimal Number**|Up to 10 decimal points of precision can be used for values between -100,000,000,000 and -100,000,000,000 can be in this column. You can specify the level of precision and the maximum and minimum values. More information: [Using the right type of number](types-of-fields.md#using-the-right-type-of-number)|
|**Currency**|Monetary values between -922,337,203,685,477 and 922,337,203,685,477 can be in this column. You can set a level of precision or choose to base the precision on a specific currency or a single standard precision used by the organization. More information: [Using currency columns](types-of-fields.md#using-currency-columns)|
|**Multiple Lines of Text**|This column can contain up to 1,048,576 text characters. You can set the maximum length to be less than this. When you add this column to a model-driven app form, you can specify the dimensions of the column.|
|**Date and Time**|Use these columns to store time values. You can store values as early as 1/1/1753 12:00 AM. More information: [Date and Time options](#date-and-time-options)|
|**Lookup**|A column that allows setting a reference to a single row of a specific type of table. Some system lookup columns behave differently. More information: [Different types of lookups](types-of-fields.md#different-types-of-lookups)|
|**Customer**|A lookup column that you can use to specify a customer, which can be an account or contact. More information: [Different types of lookups](types-of-fields.md#different-types-of-lookups)|

### Single line of text options

The single line of text data type has the following format options:

|Format|Description|
|--|--|
|**Text**|A text value intended to be displayed in a single-line textbox.|
|**Text Area**|A text value intended to be displayed in a multi-line textbox. If you require more than 4,000 characters, use a **Multiple Lines of Text** data type.|
|**Email**|A text value validated as an e-mail address and rendered as a mailto link in the column. |
|**URL**|A text value validated as a URL and rendered as a link to open the URL.|
|**Ticker Symbol**|A text value for a ticker symbol that displays a link that opens to show a quote for the stock ticker symbol. |
|**Phone**|A text value validated as a phone number rendered as link to initiate a phone call by using Skype. |

You can also set a **Maximum length** to so that the system won't allow text values longer than you specify.

### Choice column options

Columns that provide a set of options can include their own set of *local* options or refer to a common set of *global* options that can be used by multiple columns.

Using a global choice  is valuable when you find yourself creating the same set of options for multiple columns. With a global choice, you only need to maintain the set of options in one place. 

When you choose **Multi Select Choice** or **Choice** data type the solution explorer designer will provide the option for a local choice by default.

![Configure a local choice .](media/local-option-set-solution-explorer.png)

#### Configure local choices

To define options, in the **Options** area click ![Add option icon.](../maker/data-platform/media/add-option-set-option-button.png) to add an option.

For each option you can add the following property values

|Property|Description|
|--|--|
|**Label**|The localizable text for the option.|
|**Value**|The number value for the option. This is prefixed with a value defined in the solution publisher for the solution you are working in. This prefix helps ensure that the value will be different from option values that can be defined in another solution and imported into your environment.|
|**External Value**|This value is used for virtual entities to map a value in an external data source with this option.|
|**Description**|A place to record the purpose for this option. This value is not displayed to application users.|
|**Color**|Specifies a color to use in charts for this option.<br />**Tip**: Use a site like [w3schools.com HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp) to find the hex code values for colors.|

Use the other icons in the options toolbar to perform the following operations:

|Icon|Operation|
|--|--|
|![Remove the selected option icon.](../maker/data-platform/media/remove-option-solution-explorer.gif)|Remove the selected option|
|![Move the selected option up icon.](../maker/data-platform/media/move-selected-option-up-solution-explorer.png)|Move the selected option up|
|![move selected option down icon.](../maker/data-platform/media/move-selected-option-down-solution-explorer.png)|Move the selected option down|
|![Sort option ascending icon.](../maker/data-platform/media/sort-option-set-option-asc-solution-explorer.png)|Sort the options by label in ascending order|
|![Sort option descending icon.](../maker/data-platform/media/sort-option-set-option-des-solution-explorer.png)|Sort the options by label in descending order|

#### Use Existing Choice

If you to choose **Use Existing Option Set** the designer displays a list of existing *global choices* and include an **Edit** and **New** buttons to configure the global choices that this column should use.

![Configure a global choice .](media/global-option-set-solution-explorer.png)

You can also configure global choices separately. More information: [Create and edit global choices for Dataverse (picklists)](create-edit-global-option-sets.md)

> [!NOTE]
> If you define every choice  as a global choice  your list of global choices will grow and could be difficult to manage. If you know that the set of options will only be used in one place, use a local choice.

### Whole number choices

Whole number columns have the following format choices:

|Format|Description|
|--|--|
|**None**|A number value presented in a text box.|
|**Duration**|A number value presented as a drop-down list that contains time intervals. A user can select a value from the list or type an integer value that represents the number of minutes.|
|**Timezone**|A number value presented as a drop-down list that contains a list of time zones.|
|**Language**|A number value presented as a drop-down list that contains a list of languages that have been enabled for the environment. If no other languages have been enabled, the base language is the only option. The value saved is the Locale Identifier (LCID) value for the language.|

You can also restrict the maximum or minimum allowed values.

### Date and Time options

Date and Time columns have the following options:

|Format |Description|
|--|--|
|**Date and Time**|A date and time value.|
|**Date Only**|A date and time value that only displays a date. The time value is stored as 12:00 AM (00:00:00) in the system.|

You can also set specific **Behavior** for Date Time columns in the **Advanced options**.

- **User local** : Displays values converted to in the current user’s local time zone. This is the default for new columns.
- **Date only**: This behavior is available for the **Date Only** type. Displays values without time zone conversion. Use this for data like birthdays and anniversaries.
- **Time zone independent**:  Displays values without time zone conversion.

More information: [Behavior and format of the Date and Time column](behavior-format-date-time-field.md)

## Column type

You can set a custom column **Field Type** to be a **Simple**, **Calculated**, or a **Rollup** column. 

### Simple

Simple means that the column isn't a calculated or rollup column.

### Calculated

With a calculated column you can enter a formula to assign a value to the column. 
These data types can be set to calculated columns: **Currency**, **Date and Time**,  **Decimal Number**,  **Multi Select Choice**, **Choice**, **Single line of text**, **Yes/No**, and **Whole Number**.

More information: [Define calculated columns to automate manual calculations](define-calculated-fields.md)

### Rollup

With a rollup column, you can set aggregation functions that run periodically to set a number value for the column. These data types can be set to calculated columns: **Currency**, **Date and Time**, **Decimal Number**, and **Whole Number**.

More information: [Define rollup columns that aggregate values](define-rollup-fields.md)

## Save new column

Once you have configured the column, use one of three commands in the command bar:

|Command|Description|
|--|--|
|**Save**|Save the column definition and leave the form window open.|
|**Save and Close**|Save the column definition and close the window.|
|**Save Create New**|Save the column definition and open a new form to create a new column.|

## Edit a column

While [viewing columns](#view-columns), select the column you want to edit. Some standard columns or custom columns that are included in a managed solution might not allow you to edit them.

> [!NOTE]
> When editing a form, for any column already added to the form you can double-click the column to display the **Column Properties**. On the **Details** tab, select **Edit**. More information: [Add, configure, move, or delete columns on a form](../model-driven-apps/add-move-or-delete-fields-on-form.md) 

After you make changes to a column, you must publish customizations. 

- To publish your changes for one table, under **Components**, select **Tables**, and then select the table that you made changes to. On the **Actions** toolbar, select **Publish**.  
  
- To publish all changes you have made to multiple tables or components, on the **Actions** toolbar, select **Publish All Customizations**.  
  
> [!NOTE]
>  Installing a solution or publishing customizations can interfere with normal system operation. We recommend that you schedule a solution to be published when it’s least disruptive to users.  

### Edit multiple columns

To edit one or more columns, select the column or columns (using the Shift key) you want to modify and then on the **Actions** toolbar, select **Edit**. 
  
When you select multiple columns to edit, the **Edit Multiple Columns** dialog box appears. You can edit **Column Requirement**, **Searchable**, and **Auditing**. 

## Delete a column

With the system administrator security role, you can delete any custom columns that aren’t part of a managed solution. When you delete a column, any data stored in the column is lost. The only way to recover data from a column that was deleted is to restore the database from a point before the column was deleted.

> [!NOTE]
> Before you can delete a custom column, you must remove any dependencies that might exist in other solution components. 

1. While [viewing columns](#view-columns), select a custom column that can be deleted in the list and select the ![Delete command.](../model-driven-apps/media/delete.gif) button in the command bar.
2. In the **Confirm Deletion** dialog, select **Delete**.

> [!TIP]
> You can select multiple custom columns to be deleted in one operation.

### Check column dependencies 

Select the column in the list. In the **More Actions** menu, select **Show Dependencies**.

![Show dependencies for column.](media/check-field-dependencies.png)

Dependencies are any related use of the column that would prevent it from being deleted. For example, if the column is used in a form or view, you must first remove references to the column in those solution components.  
  
If you delete a lookup column, the 1:N table relationship for it will automatically be deleted.  

## IME Mode

IME (input method editor) mode specifies how a physical keyboard can be used to enter characters for text columns. IMEs are tools provided by the operating system for composing text. They're commonly used to enter Chinese, Japanese, and Korean words. 
IME mode doesn't restrict the characters that users can enter. For example, when IME mode is disabled, users can still enter Japanese characters by pasting in a text input.

> [!IMPORTANT]
>
> IME Mode is used for backward compatibility with the legacy web client and the IME Mode settings described here don’t apply to Unified Interface apps. Additionally, IME mode is supported only in Internet Explorer and partially supported in Firefox.
-	**Active**: This value activates the IME initially. You can deactivate it later if desired. This is the default IME setting. 
-	**Auto**: When IME mode is auto, Power Apps won't interfere with the IME. 
-	**Disabled**: Disable IME mode to bypass the IME. This can be useful for entering alphanumeric characters in certain languages. 
-	**Inactive**: Power Apps deactivates the IME initially. You can activate it later if desired.

### See also

[Create and edit columns for Dataverse](create-edit-fields.md)<br />
[Create and edit columns for Dataverse using Power Apps portal](create-edit-field-portal.md)<br />
[Types of columns and column data types](types-of-fields.md)<br />
[Define calculated columns to automate manual calculations](define-calculated-fields.md)<br />
[Define rollup columns that aggregate values](define-rollup-fields.md)<br />
[Behavior and format of the Date and Time column](behavior-format-date-time-field.md)

---

## Create and edit choices (picklists) overview for Microsoft Dataverse | MicrosoftDocs

Source: [create-edit-global-option-sets.md](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-global-option-sets)

*Provides an overview about choice columns in Dataverse.*

# Create and edit choice columns overview

A choice (picklist) is a type of column that can be included in a table. It defines a set of options. When a choice is displayed in a form it uses a drop-down list control. When displayed in **Advanced Find** it uses a *picklist control*. Sometimes choices are called picklists by developers.  
  
You can define a choice  to use a set of options defined within itself (locally) or it can use a set of options defined elsewhere (globally) which can be used by other choice  columns.

Global choice columns are useful when you have a standard set of categories that can apply to more than one column. Maintaining two separate choice options with the same values is difficult and if they aren't synchronized you can see errors, especially if you are mapping table columns in a one-to-many table relationship. More information:  [Mapping table columns](map-entity-fields.md)

> [!NOTE]
> If you define every choice as a global choice your list of global choice columns will grow and could be difficult to manage. If you know that the set of options will only be used in one place, use a local choice.

Choice columns can be configured as either single select (choice) or multi-select (choices).

> [!NOTE]
> You can also create global choices in your environment using the following:
> - Import a solution that contains the definition of the global choices.
> - A developer can write a program to create them. <br />More information: [Developer documentation: Choices columns](/power-apps/developer/data-platform/multi-select-picklist).

## See also

[Create a choice ](custom-picklists.md)<br />

---

## Create a choice column

Source: [custom-picklists.md](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/custom-picklists)

*Step-by-step instructions for how to create a choice in Power Apps.*

# Create a choice

Choice columns allow you to include dropdown lists of fixed values to a user within your app to ensure data consistency. Choice columns were formerly referred to as option sets and are sometimes called picklists. Similar to tables, there are both standard choices or makers have the ability to create custom choice columns to use in apps.

Choices can be created while working from a solution in Power Apps (make.powerapps.com) or on a table form in the form designer.

Choice columns can be single selection only (choice) or can allow multi-selection (choices). The following screenshot shows a multi-select choices column in a model-driven app.

:::image type="content" source="media/data-platform-cds-newoptionset/multi-select-choice.png" alt-text="A multi-select choices column displayed on a model-driven app main form":::

Choices are either global or local. You can define a choice to use a set of options defined elsewhere (globally), which can be made available to other choice columns, or define a set of options only available within the choice column (locally). More information: [Create and edit choice columns overview](create-edit-global-option-sets.md)

## Create a global choice within a solution

1. Sign into [powerapps.com](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) select **Solutions**, and then open the solution you want. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.
1. On the command bar, select **New** > **Choice**.
1. Enter the following properties:
   - **Display name**. Enter the **Display name** for your column. The **Display name** is used when presenting this column to your users.
   - In the **Label** field, enter the label you want displayed for the choice option.
   - The **Value** number represents a unique value for the option and isn't displayed in the choice column in an app. Notice there's a number generated for each **Value** automatically. We recommend that you not change this. Having a unique **Value** helps ensure that the value will be different from other option values that might be defined in other solutions and imported into your environment.
   - Select the color picker to the left of the **Label** if you want a color to appear for the option in model-driven app charts.
   - Select the three vertical dots > **Additional properties** to set the following properties:
      - **Description**. Add a description for the option.
      - **External value**. This value is used for virtual tables to map a value in an external data source with this option.
      - **Hidden**. Hide the option from the choice column at runtime in apps. For more information about the limitations of this property, go to [Choice hidden property limitations](#choice-hidden-property-limitations).
      > [!CAUTION]
      > The Hidden property should never be used as a secure way to prevent users from viewing or editing column values. These properties only apply to app components such as model-driven app forms and views but don't have an effect on a user's data privileges. When a column is hidden, users can still access column data in other ways, such as by making Web API calls. To secure columns, use [column-level security to control access](/power-platform/admin/field-level-security).
1. Select **New choice** to create another option for the choice.
1. Repeat the previous step until you have the options you want for the choice.
1. Expand **Advanced options** to display additional properties: 
   - **Name**. Unique name of the global choice including the solution publisher prefix.
   - **External type name**. This value is used for virtual tables to map a value in an external data source with this choice.
   - **Description**. Enter an optional description for the choice column.
1. Select **Save**.

> [!IMPORTANT]
> Global choices can't be directly added to an app. After you create a global choice column the options from the choice can be made available when you create a local choice column. Local choice columns are table specific and can then be used with forms and views in an app.

## Create a local choice to use in forms and views

Create a local choice column for a table that can be used in forms and views within a solution.

1. Sign into [powerapps.com](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) select **Solutions**, and then open the solution you want. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.

1. Open the table where you want to create the local choice, and then on the command bar, select **New** > **Choice**.

1. In the **New column** panel, enter properties for the choice column.

### Configure properties for a local choice

- **Display name**. Enter the **Display name** for your column. The **Display name** is used when presenting this column to your users.
- **Description**. Enter an optional description of the choice column.
- **Data type**. Select **Choice** > **Choice**. Select **Choice** > **Yes/No** if you want a two option single select choice field.
- **Behavior**. Select calculated to enable the column to be included in calculated columns to automate manual calculations.
- **Required**. Set this value to **Business required** to make it so a record can't be saved without data in this column.
- **Searchable**. When selected, this column appears in Advanced Find and is available when customizing views.
- **Selecting multiple choices is allowed**. Select this option if you want to create a choice where the user can select more than one option (multi-select).
- **Sync with global choice?**
   - **Yes**. Select this option if you want the local choice to have the ability to use options from a global choice. Then, you can also select an existing global choice to use the options from that global choice.
   - **No**. Select this option if you don't want the choice to have the ability to use options from a global choice.
   - **Sync this choice with**. When **Sync with global choice** is **Yes**, you can select an existing choice column. Then, the options configured for that choice can be used for this choice.
   - If you chose **No** to enable a global choice, create the options for your choice by selecting **Choices** or, if you chose **Yes**, select **Edit choice** to edit the sync choice options or **New choice** to add new options:
   - In the **Label** field, enter the label you want displayed for the choice option.
   - The **Value** number represents a unique value for the option and isn't displayed in the choice column in an app. Notice there's a number generated for each **Value** automatically. We recommend that you not change this. Having a unique **Value** helps ensure that the value will be different from other option values that might be defined in other solutions and imported into your environment.
   - Select the color picker to the left of the **Label** if you want a color to appear for the option in model-driven app charts.
- **Default choice**. Select one of the options you created as the default choice.
- **Schema name**. This is the unique name used by the system and is automatically generated based on the display name and solution publisher prefix. After a new choice column is saved, you can't change this.
- **Enable column security**. Select this option to secure the data in the column beyond the security defined for the table.
- **Enable auditing.** If auditing has been enabled in the environment, this column can be included in change tracking.
- **Appears in dashboard's global filter**. Select this option to allow column to be available as a filter in interactive dashboards.
- **Sortable**. Select this option to allow sorting of this column when used in interactive dashboards.

Select **Save**.

Now the local choice column appears in the form and view designers to add for the table.

## Create and edit global choices using the classic solution explorer

For information about how to create and edit global choices using the classic solution explorer, go to [Create or edit a global option set (on-premises)](/dynamics365/customerengagement/on-premises/customize/create-edit-global-option-sets).

## Choice hidden property limitations

- The choice column hidden property is only applicable for model-driven apps. Other components that use Microsoft Dataverse tables, such as canvas apps, don't use the choice column hidden property.
- The choice column hidden property only works for app with the [modern, refreshed look for model-driven apps enabled](../../user/modern-fluent-design.md).
- The choice column hidden property isn't currently supported for multi-select choices even when the **Selecting multiple choices is allowed** option is selected.
- The hidden property *only hides the option label and value when displayed in a model-driven app*. Even when hidden, choice labels and values can be viewed and set by accessing the Dataverse table directly, such as from make.powerapps.com. Hidden options can also be set using the [`setValue` client API method](../../developer/model-driven-apps/clientapi/reference/attributes/setValue.md).

---

## Define alternate keys using Power Apps

Source: [define-alternate-keys-portal.md](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-portal)

*Learn how to define alternate keys using Power Apps*

# Define alternate keys using Power Apps

Power Apps provides an easy way to view and create table alternate keys with Microsoft Dataverse. *Alternate keys* provide an efficient and accurate way of integrating data with external systems. It’s essential in cases when an external system doesn’t store the globally unique identifier (GUID) IDs that uniquely identify rows in Microsoft Dataverse. For more information about alternate keys, see [Define alternate keys to reference rows](define-alternate-keys-reference-records.md).

> [!IMPORTANT]
> If the data within a column that is used in an alternate key contains one of the following characters `/`, `#`,`<`,`>`,`*`,`%`,`&`,`:`,`\\`,`?`,`+` then `GET` or `PATCH` actions won't work. If you only need uniqueness, then this approach works, but if you need to use these keys as part of data integration then it's best to create the key on columns that won't have data with those characters.

## View alternate keys

1. In [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), go to **Solutions** and open the solution you want. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.
1. Select **Tables** on the left **Objects** pane, and then open the table that you want to view.
1. In the **Schema** area, select **Keys** to view a list of any alternate keys that might be defined.

## Create an alternate key

1. While [viewing alternate keys](#view-alternate-keys), select **New key**.
1. In the Key properties pane, enter the following information: 
   1. Set a **Display name** and choose the columns to use to create the alternate key. 
   1. The **Name** column is populated based on the display name. You can change it if you want.
   1. Select the columns that you want. For example, to identify an account row with an alternate key, you can use the **Account Number** column in combination with some other column, such as the **SIC Code**, which have values that shouldn't change.

    ![Example Alternate Key Definition.](media/alternate-key-account-number-sic-code.png)

1. Select **Save** to create the alternate key.

> [!NOTE]
> The alternate key isn't immediately available for use. A system job is initiated when you save the table to create database indexes to support the alternate key.

## Delete an alternate key

While [viewing alternate keys](#view-alternate-keys), select the key you want to delete and select **Remove** > **Remove from this solution** or to delete the key from the Power Platform environment **Delete from this environment** on the command bar.

### Related articles

[Developer Documentation: Work with alternate keys](../../developer/data-platform/define-alternate-keys-entity.md)

---

## Define alternate keys using solution explorer | MicrosoftDocs

Source: [define-alternate-keys-solution-explorer.md](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-solution-explorer)

*Learn how to define alternate keys that can be used to reference rows in Microsoft Dataverse using solution explorer*

# Define alternate keys using solution explorer



Solution explorer provides one way to view and create alternate keys for Microsoft Dataverse.

The [Power Apps portal](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) enables configuring the most common options, but certain options can only be set using solution explorer. <br />More information: 
- [Define alternate keys to reference rows](define-alternate-keys-reference-records.md)<br />
- [Define alternate keys using Power Apps portal](define-alternate-keys-portal.md)

> [!IMPORTANT]
> If the data within a column that is used in an alternate key will contain one of the following characters `/`,`<`,`>`,`*`,`%`,`&`,`:`,`\\`,`?`,`+` then `GET` or `PATCH` actions will not work. If you only need uniqueness then this approach will work, but if you need to use these keys as part of data integration then it is best to create the key on columns that won't have data with those characters.

## Open solution explorer

Part of the name of any alternate key you create is the customization prefix. This is set based on the solution publisher for the solution you're working in. If you care about the customization prefix, make sure that you are working in an unmanaged solution where the customization prefix is the one you want for this table. More information: [Change the solution publisher prefix](create-solution.md#solution-publisher) 

### Open an unmanaged solution

1. From [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) select **Solutions** from the left navigation pane, and then on the toolbar, select **Switch to classic**. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.

2. In the **All Solutions** list open the unmanaged solution you want.

## View alternate keys

1. With solution explorer open, under **Components** expand **Entities** and select the table where you want to view alternate keys.
2. Expand the table and select **Keys**.

    ![View alternate keys.](media/view-alternate-keys-solution-explorer.png)

## Create an alternate key

1. While [viewing alternate keys](#view-alternate-keys), select **New**.
1. On the form, enter the **Display Name**. The **Name** column will be auto-populated based on the **Display Name**. 
2. From the **Available Attributes** list, select each attribute and then **Add >** to move the attribute into the **Selected Attributes** list.
    ![Create Alternate key.](media/create-alternate-key-solution-explorer.png)
1. Select **OK** to close the form.

### (Optional) View the system job tracking creation of indexes

1. While [viewing alternate keys](#view-alternate-keys) after you have created a new alternate key you will see a row for the key you created.
2. In the **System Job** column you will find a link to the system job that monitors the creation of the indexes to support the alternate key. 
    
    This system job will have a name that follows this pattern: `Create index for {0} for table {1}` where `0` is the **Display Name** of the alternate key and `1` is the name of the table.

    The link to the system job will not be displayed after the system job completes successfully. More information: [Monitor system jobs](/power-platform/admin/manage-dataverse-auditing#monitoring-system-jobs)


## Delete an alternate key

While [viewing alternate keys](#view-alternate-keys), select ![Delete command.](media/delete.gif).

### See also

[Define alternate keys to reference rows](define-alternate-keys-reference-records.md)<br />
[Define alternate keys using Power Apps portal](define-alternate-keys-portal.md)<br />
[Developer Documentation: Work with alternate keys](../../developer/data-platform/define-alternate-keys-entity.md)

