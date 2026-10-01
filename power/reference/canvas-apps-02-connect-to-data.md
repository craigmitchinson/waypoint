# Power Apps Canvas Apps — Connect to Data & Connectors

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 30

## Contents

1. [Overview of connectors for canvas apps](#overview-of-connectors-for-canvas-apps)
2. [Working with dynamic values](#working-with-dynamic-values)
3. [Working with expired tokens](#working-with-expired-tokens)
4. [Connect to Microsoft Dataverse](#connect-to-microsoft-dataverse)
5. [Microsoft Dataverse and the improve data source experience](#microsoft-dataverse-and-the-improve-data-source-experience)
6. [Connect to cloud-storage from Power Apps](#connect-to-cloud-storage-from-power-apps)
7. [Connect to Azure Blob Storage from Power Apps](#connect-to-azure-blob-storage-from-power-apps)
8. [Connect to Azure DevOps from Power Apps](#connect-to-azure-devops-from-power-apps)
9. [Connect to Dynamics 365 from Power Apps](#connect-to-dynamics-365-from-power-apps)
10. [Connect to Dynamics AX from Power Apps](#connect-to-dynamics-ax-from-power-apps)
11. [Connect to Microsoft Translator from Power Apps](#connect-to-microsoft-translator-from-power-apps)
12. [Connect to Office 365 Outlook from Power Apps](#connect-to-office-365-outlook-from-power-apps)
13. [Connect to Office 365 Users connection from Power Apps](#connect-to-office-365-users-connection-from-power-apps)
14. [Connect to an Oracle database from Power Apps](#connect-to-an-oracle-database-from-power-apps)
15. [Connect to Power BI from Power Apps](#connect-to-power-bi-from-power-apps)
16. [Connect to SharePoint from a canvas app](#connect-to-sharepoint-from-a-canvas-app)
17. [Connect to SQL Server from Power Apps overview](#connect-to-sql-server-from-power-apps-overview)
18. [Use Microsoft SQL Server securely with Power Apps](#use-microsoft-sql-server-securely-with-power-apps)
19. [Access data in SQL Server](#access-data-in-sql-server)
20. [View results in SQL Server](#view-results-in-sql-server)
21. [Connect to Twitter from Power Apps](#connect-to-twitter-from-power-apps)
22. [Add data connections to canvas apps](#add-data-connections-to-canvas-apps)
23. [Manage connections in canvas apps](#manage-connections-in-canvas-apps)
24. [Rename Power Apps action-based data sources](#rename-power-apps-action-based-data-sources)
25. [Understand delegation in a canvas app](#understand-delegation-in-a-canvas-app)
26. [Manage an on-premises data gateway in Power Apps](#manage-an-on-premises-data-gateway-in-power-apps)
27. [What is an on-premises data gateway?](#what-is-an-on-premises-data-gateway)
28. [Understand data sources for canvas apps](#understand-data-sources-for-canvas-apps)
29. [Understand tables and records in canvas apps](#understand-tables-and-records-in-canvas-apps)
30. [Understand record references and polymorphic lookups in canvas apps](#understand-record-references-and-polymorphic-lookups-in-canvas-apps)

---

## Overview of connectors for canvas apps

Source: [connections-list.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections-list)

*Overview of all the available connections that you can use to build canvas apps.*

# Overview of connectors for canvas apps

Data is at the core of most apps, including apps you build in Power Apps. You store data in a *data source*, and you bring that data into your app by creating a *connection*. The connection uses a specific *connector* to talk to the data source. Power Apps has connectors for many popular services and on-premises data sources, including SharePoint, SQL Server, Office 365, Salesforce, and Twitter. To get started adding data to a canvas app, see [Add a data connection in Power Apps](add-data-connection.md).

A connector might provide **tables** of data or **actions**. Some connectors provide only tables, some provide only actions, and some provide both. Also your connector might be either a standard or custom connector.

> [!NOTE]
> Keep the number of connectors in a canvas app to a maximum of 10, and connection references to no more than 20. Going beyond these limits can lead to longer loading times for users when launching the app and can cause problems when saving the app.

## Tables

If your connector provides tables, add your data source, and then select the table in the data source that you want to manage. Power Apps retrieves table data into your app and updates data in your data source automatically. For example, add a data source that has a table named **Lessons**, and then set the **Items** property of a control, such as a gallery or a form, to this value in the formula bar:

![Plain data source Items property.](./media/connections-list/ItemPropertyPlain.png)

Specify the data that your app retrieves by customizing the **Items** property of the control that shows your data. Continuing the previous example, sort or filter the data in the **Lessons** table by using that name as an argument for the **Search** and **SortByColumn** functions. In this graphic, the formula set for the **Items** property specifies that the data is sorted and filtered based on the text in **TextSearchBox1**.

![Expanded data source Items property.](./media/connections-list/ItemPropertyExpanded.png)

For more information about customizing your formula with tables, see these articles:

[Understand data sources in Power Apps](working-with-data-sources.md)<br>
[Generate an app from Excel data](get-started-create-from-data.md)<br>
[Create an app from scratch](get-started-create-from-blank.md)<br>
[Understand tables and records in Power Apps](working-with-tables.md)

> [!NOTE]
> To connect to data in an Excel workbook, host it in a cloud storage service like OneDrive. For more information, see [Connect to cloud-storage from Power Apps](connections/cloud-storage-blob-connections.md).

## Actions

If your connector provides actions, select your data source as you did before. Instead of selecting a table as the next step, manually connect a control to an action by editing the **Items** property of the control that shows your data. The formula you set for the **Items** property specifies the action that retrieves data. For example, the app doesn't retrieve any data if you connect to Yammer and then set the **Items** property to the name of the data source. To populate a control with data, specify an action such as **GetMessagesInGroup(5033622).messages**.

![Action data source Items property.](./media/connections-list/ItemPropertyAction.png)

To handle custom data updates for action connectors, build a formula that includes the **Patch** function. In the formula, identify the action and the fields that bind to the action.

> [!NOTE]
> For action-based connectors, galleries and other controls don't automatically page in more data like they do for tabular connectors. For example, if you bind a tabular data source to a gallery, it retrieves the first set or page of records (for example, 100 records), and then it pages in more data as the control requests it. For an action-based connector, it retrieves a "page" of data, but if the data requested exceeds the page size, the control doesn't automatically get the next page.

For more information about how to customize your formula for custom updates, see these articles:

[Patch](functions/function-patch.md)<br />[Collect](functions/function-clear-collect-clearcollect.md)<br />[Update](functions/function-update-updateif.md)

Dynamic schema is a common type of result for action based connectors. Dynamic schema refers to the possibility that the same action might return a table with different columns depending on how it's called. Conditions that might cause the columns in the table to differ include input parameters, the user or role executing the action, and the group in which the user is working, among others. For example, SQL Server stored procedures might return different columns if run with different inputs, or an Azure DevOps instance might use custom fields that aren't available by default.

> [!NOTE]
> The [connector documentation](/connectors) shows dynamic schema results with this message **"The outputs of this operation are dynamic."** as the return value.

For more information about how to work with dynamic schema in Power Apps, see [Working with Dynamic values](untyped-and-dynamic-objects.md) for an overview and [Connect to Azure DevOps from Power Apps](connections/azure-devops.md) for a detailed example.

## Popular connectors

This table links to more information about popular connectors. For a complete list, see [All connectors](/connectors/connector-reference/).

| &nbsp; | &nbsp; |
| --- | --- |
| [**Microsoft Dataverse**](connections/connection-common-data-service.md) | [**Cloud storage**](connections/cloud-storage-blob-connections.md) ** |
| [**Dynamics AX**](connections/connection-dynamicsax.md)|[**Excel**](connections/connection-excel.md)|
| [**Microsoft Translator**](connections/connection-microsoft-translator.md)| [**Office 365 Outlook**](connections/connection-office365-outlook.md)|
| [**Office 365 Users**](connections/connection-office365-users.md) |[**Oracle**](connections/connection-oracledb.md)|
| [**Power BI**](connections/connection-powerbi.md) |[**SharePoint**](connections/connection-sharepoint-online.md) |
| [**SQL Server**](connections/sql-connection-overview.md) |[**Twitter**](connections/connection-twitter.md) |

** Applies to Azure Blob, Box, Dropbox, Google Drive, and OneDrive.

## Standard and custom connectors

Power Apps provides *standard* connectors for many commonly used data sources. If Power Apps has a standard connector for the type of data source you want to use, use that connector. To connect to other types of data sources, like a service you built, see [Register and use custom connectors](../canvas-apps/register-custom-api.md).

## All standard connectors

Standard connectors don't require special licensing. For more information, see [Power Apps plans](https://powerapps.microsoft.com/pricing/).

Ask questions about a specific connector in the [Power Apps forums](https://powerusers.microsoft.com/t5/PowerApps-Community/ct-p/PowerApps1), and suggest connectors you want to add or other improvements in [Power Apps Ideas](https://ideas.powerapps.com/).

## Security and types of authentication

As you author your app and create a connection to a data source, you might see that your choice of connector offers different ways to authenticate. For instance, the SQL Server connector allows you to use Microsoft Entra Integrated, SQL Server Authentication, and Windows Authentication. Each type of authentication has different levels of security. Understand what information and rights you share with users who use your application. The primary example in this article is SQL Server. However, the principles apply to all types of connections.

> [!NOTE]
> - For detailed information about security considerations when using a relational database server, such as Microsoft SQL Server or Oracle, as the data source for an app, see [Use Microsoft SQL Server securely with Power Apps](connections\sql-server-security.md).
> - Power Apps doesn't support **External member** identities. For more information, see [Properties of a Microsoft Entra B2B collaboration user](/azure/active-directory/external-identities/user-properties).
> - Gateway selection isn't supported for custom connectors that use the anonymous authentication type.

### Microsoft Entra ID

This authentication is a secure type of connection. For example, SharePoint uses this type of authentication. SQL Server also allows for this type of authentication. When you connect, the Microsoft Entra service identifies you separately to SharePoint on your behalf. You don't have to supply a username or password. As an author, you can create and work with the data source by using your credentials. When you publish your application, your application user signs in by using their credentials. If the data is appropriately secured on a back-end, your users can only see what they're authorized to see based on their credentials. This type of security allows you to change rights for specific application users on the back-end data source after the application is published. For instance you can grant access, deny access, or refine what a user or set of users can see all on the back-end data source.

### Open-standard authorization (OAuth)

This type of connection is also secure. For example, Twitter uses this type of authentication. When you connect, **you must supply your user name and password.** As an author, you can create and work with the data source by using your credentials. When you publish your application and your application user signs in, they must also supply their credentials. Therefore this type of connection is secure as your users must use their own credentials to access the data source service.

### Shared connections and secure implicit connections

In a shared connection, the Power Apps author provides the user name and password for the connection when creating the data source in the application. The connection authentication to the data source is then **implicitly shared** with end users. Once the application is published, the connection is also published and available to your users.

Before January 2024, your end users could take the connection that you shared with them and create separate new applications. Your users can't see the user name or password, but the connection is available to them. However, **after January 2024, all newly created shared connections are secured.** To secure existing apps, republish them. The connection is no longer shared with end users. The published Power App talks to a connection proxy. The connection proxy only talks to the specific Power App for which it's linked. The connection proxy limits the actions that are sent to the connections to the ones in the Power App **{Get, Put/Patch, Delete}** for a given data source. If you have an app using the connections published before January 2024, republish your application and unshare any connections with end users that shouldn't have them.

In SQL Server, an example of this type of connection is **SQL Server Authentication**. Many other database data sources provide a similar capability. When you publish your application, your users don't need to supply a unique user name and password.

> [!NOTE]
> Your end-users might encounter the error message **You do not have correct permissions to use this connection** in the consent dialog. Two situations might cause this error. First, the application might have a shared implicit connection that **isn't** a secure implicit connection. Sharing the connection with the end user resolves this issue but isn't recommended because all shared connections should be secure implicit connections. The author should convert all connections in the application to be secure implicit connections to resolve this issue. Second, the connection might already be a secure implicit connection. Republishing might resolve this issue. If it doesn't, then a product bug should be filed.

#### Notification to update your apps (secure implicit connections)

If you have applications that might be upgraded to use this feature, you see a message on the **Apps** page. It indicates the number of apps that need your attention.

![Notification to update your apps.](./media/connections-list/attention-alert.png)

Select the link and it opens a side panel that lists all of the apps that need attention.

![Side panel.](./media/connections-list/app-needs-attention.png)

Select the **open** icon to the right of the app name to open and republish it. Continue with the following directions.

#### Enable secure implicit connections for an existing app

Open an existing [app open for editing](../../edit-app.md) with implicitly shared connections already published:

1. On the command bar, select **Settings** and search for **"Secure"**.
1. Update the feature switch appropriately to enable secure implicit connections.
1. Save and publish the app.

#### Unsharing

Once you publish the app, follow these steps to verify that sharing works correctly:

- Check if connections are shared with co-owners. If you don't want an end-user to get a connection, then uncheck the **Co-owner** checkbox.

![Uncheck co-owner.](./media/connections-list/co-owner-property.png)

- To verify the feature works correctly, share the app with a different user who isn't an owner. Once you share the app, check the **Connections** list in the **Dataverse** tab in [Power Apps](https://make.powerapps.com) for that user. Verify that the user doesn't have a connection available.

- Open the **Sharing** panel to change the end-user's right to the connection. Choose the **X** to remove the user's access to the connection.

![Can Use / Revoke.](./media/connections-list/can-use-revoke.png)

#### Use apps with a new secure implicit connection

When you republish and share your app, end-users don't have access to the connection but work with the hidden proxy connection. Users can't create a new app based on your original connection.

#### Limitations

1. All types of implicitly shared connections work, such as action and tabular.
1. Server and database names are hidden in network traces but visible in the consent dialog. Column names aren't hidden.
1. For tabular connectors, the feature only limits CRUD actions such as Get, Post, Put, or Delete. If you have permissions to **Put**, then you have access to **Post**.
1. Action based connectors limit based on the specific API being used in the application.
1. Warnings are still enabled in sharing. The warning around implicitly shared connections still warns while in preview. However, your connection with this feature is secure – despite the warning.
1. Publishing to an entire tenant, as opposed to specific groups or individuals isn't supported.
1. There's a known issue when importing an implicitly shared secure connection via a connection reference. The security isn't set properly in the target environment.
1. There's a known issue importing a solution using a service principal, causing import failure. A workaround is to share the connection with the service principal.

### Windows Authentication

This type of connection isn't secure because it doesn't rely on end-user authentication. Use Windows authentication when you need to connect to a data source that is **on-premises**. An example of this type of connection is to an on-premises server that has a SQL Server. The connection must go through a gateway. Since it goes through a gateway, the connector has access to all of the data on that data source. As a result, any information that you can access with the Windows credentials you supply is available to the connector. When you publish the application, you also publish the connection and make it available to your users. This behavior means that your end users can create applications by using this same connection and access the data on that machine. Connections to the data source are also **Implicitly Shared** with users that the app is shared with. This type of connection might be valid when your data source only lives on an on-premises server and the data on that source is freely shareable.

## Data sources in solutions

Solutions help with [application lifecycle management](/power-platform/alm/overview-alm) and offer other ways to manage the lifecycle of **data sources**. If a canvas app is in a solution, you can create [connection references](../data-platform/create-connection-reference.md) and [environment variables](../data-platform/environmentvariables.md) to store information about the data sources. This setup makes it easy to change or reconnect data sources when you move solutions to different environments.

## Rename data sources in apps

Learn how to rename data sources in an app, and understand the difference between tabular and action-based data sources. For more information, see [Rename Power Apps action-based data sources](rename-data-source.md).

## Connection consent dialog

When users open an app that uses connectors for the first time, they see a connection consent dialog for the following purposes.

1. To inform users about the data sources accessed by the app.
1. To outline the actions a connector might or might not perform in an app. For example, for apps using the **Office 365 Users** connector:

  - This app is able to:
    - Read your full user profile
    - Read the full profile of all users
  - The app can't:
    - Modify or delete any user-profile information

1. To capture end-user consent to connect to the data sources that the app uses.
1. To facilitate manual end-user authentication, when needed.

For some connections, Power Platform can automatically authenticate a user to access a data source. However, if the automatic sign-in fails, this dialog prompts users to fix a connection by manually signing in. Power Platform can only attempt automatic sign-in for a connection when a data source preauthorizes Microsoft’s Azure API connections service principal, granting it permission to perform single sign-on for a user when a connection is created. For more information on single sign-on, see [What is single sign-on (SSO)?](/azure/active-directory/manage-apps/what-is-single-sign-on)

For model-driven apps that use custom pages, when there are multiple custom pages in an app, the consent dialog asks for data permissions for all of the connectors in all the custom pages even if users don't open them.

The following image is an example of the connection consent dialog for an app connecting to a SharePoint site.

![Power Apps consent dialog](./media/connections-list/power_apps_consent_dialog.png)

For select connectors, admins can suppress this dialog and consent on behalf of end users to connect to a data source. The following table explains which types of connectors the consent dialog might be suppressed for an app.

> [!NOTE]
> If an admin suppresses the consent dialog but the platform can’t perform single sign-on for an end-user, the dialog is presented to the user when they launch the app.

| Connector type | Consent dialog suppressible? | Reference |
|---|---|---|
| Microsoft connectors that support single sign-on (such as SharePoint, Office 365 users) | Yes | [Power Apps admin cmdlet](/powershell/module/microsoft.powerapps.administration.powershell/set-adminpowerappapistobypassconsent) |
| Connector accessing a non-Microsoft, partner service, such as Salesforce | No | Not applicable |
| Custom connectors using OAuth with Microsoft Entra ID as the identity provider. These custom connectors are built by organizations, and are only accessible by the users within the organization (for example, built by Contoso for only Contoso users) | Yes | [Manage Connections](add-manage-connections.md#manage-the-consent-dialog-appearance-for-custom-connectors-using-microsoft-entra-id-oauth) |

Microsoft Power Platform can only suppress the consent dialog for connections to data sources where all the following conditions are true:

1. The data source doesn't require an explicit consent UI.
1. The data source preauthorizes Microsoft’s Azure API connections service principal to enable single sign-on.
1. An admin configures an app to suppress the consent for the preceding connections.

Microsoft’s Azure API connections service principal preauthorization exists for Microsoft's first-party data sources. Custom applications registered in a Microsoft Entra tenant that are used by custom connectors might configure this preauthorization. An admin manages consent suppression on a per-app basis (as opposed to connector basis), so suppression is managed at the most granular app experience level. This level of granularity prevents consent suppression for an organization’s "approved apps" from inadvertently suppressing consent for apps that aren't approved or reviewed.

---

## Working with dynamic values

Source: [untyped-and-dynamic-objects.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/untyped-and-dynamic-objects)

*How to work with dynamic values.*

# Working with dynamic values 

When you use actions in Power Apps, you can encounter dynamic return values or input values for some actions. Previously, Power Apps ignored dynamic input fields, and they weren't visible in Power Fx expressions. Now, you work directly with these fields. Previously, when a return type was dynamic, Power Apps returned a Boolean value. Now, it returns a dynamic value instead.

> [!NOTE]
> If your Power Fx expressions rely on a Boolean return value from these functions, rewrite the formula and explicitly cast the dynamic value to a Boolean. Certain functions, like 'IfError,' don't fully support dynamic values yet. If your expression uses one of these functions, see the note at the end of this article for workarounds.


## Passing in dynamic values as parameters

Certain actions necessitate using a dynamic value as a parameter. If you have a Power Fx record, convert it to a dynamic value to pass it to the action.

In the following example, the merge action on a Dataverse **Account** table requires several dynamic arguments. To prepare, define three variables to hold the TargetObject, SubordinateObject, and UpdateContextObject. Start by assigning the text string **Microsoft.Dynamics.CRM.account** to a variable, which you reuse throughout the example.

```power-fx
Set (OdataType, “Microsoft.Dynamics.CRM.account”);
```

Then assign TargetObject a Power Fx record with the properties name, accountid, and @odata.type. Similarly, assign Power Fx records to the Subordinate and UpdateContext objects.

```power-fx
Set (TargetObject, {name: "Test 2", accountid: "145dc2ba-85a2-ed11-aado-0022482d76a5", '@odata.type': OdataType});
Set (SubordinateObject, {name: FirstRecord.’Account name’, accountid: FirstRecord.Account, ‘@odata.type’ : OdataType });
Set (UpdateContextObject, {telephone1: FirstRecord.’Main Phone’, address1_city: FirstRecord.’Address 1 : City’, ‘@odata.type’ : OdataType }); 
```

Next, create three more variables to store the dynamic records after the conversion: TargetDynamicValue, SubordinateDynamicValue, and UpdateContextDynamicValue. To convert, use the ParseJSON(JSON()) function on the original variables. This action transforms the Power Fx records into dynamic values.

```power-fx
Set (TargetDynamicValue, ParseJSON(JSON(TargetObject)));
Set (SubordinateDynamicValue, ParseJSON(JSON(SubordinateObject)));
Set (UpdateContextDynamicValue, ParseJSON(JSON(UpdateContextObject)));
```
Finally, call the merge action and pass in the necessary parameters for both dynamic and specific types:

```power-fx
Environment.Merge({Target: TargetDynamicValue, Subordinate: SubordinateDynamicValue, UpdateContent: UpdateContextDynamicValue, PerformParentingChecks: false  });
```

## Using dynamic values returned via an action

If an **Action** based connector returns an object, you can access its properties directly, even if they don't have a type. But if you want to use a property for something specific in Power Apps, like labeling, cast it first.

In this example, the `httpRequest` function returns a dynamic value that's already cast as a Boolean.

```power-fx
Set (response, Office365Groups.HttpRequest("/v1.0/me", "GET", ""));
```
One of the properties in the response is displayName. It can be accessed, and cast, with a Power Fx expression like the following:
```power-fx
Text(response.displayName)
```
Cast to the object **Text** to use it in a Power Apps label control.

## Working with Dynamic fields

Action responses now capture dynamic output, and you can use the method described above to access these properties. You can also work with dynamic input fields.

Consider the `GetMessageDetails` action in Microsoft Teams, which has a dynamic input `body` parameter. Previously, you couldn't view or specify this parameter. With the recent update, set a variable called `body` with the appropriate Power Fx record structure.

```power-fx
Set ( body, ParseJSON(JSON( {recipient: { groupID: “7f733b36-7c7f-4f4c-9699-0a7b7a2b3897”, channelID: “19: 085d522328fb4a439220641006f7f25@thread.tacv2”}})));
```
Then, we can call the GetMessageDetails action and assign the response to the teamsResponse variable.
```power-fx
Set (teamsResponse, MicrosoftTeams.GetMessageDetails ( 1661365068558, “channel”, body ));
```

## Converting formulas that return dynamic values that previously returned Boolean

Power Fx takes a limited number of dynamic values so explicit conversion may be necessary for your formula. In particular, if your formula depends on a Boolean response then you need to convert. If you need to simply know if an error exists, you can use the IsError function:

```power-fx
If(
  IsError(Office365Outlook.CalendarDeleteItemV2("Calendar", 1)),
  Notify("An Outlook appointment could not be found or could not be deleted")
)
```
To access error information that is exclusively available through IfError, you must transform the dynamic value into a specific type using a conversion function such as Boolean, Text, or Value. These functions will produce an error if they are given one. The following example, illustrates this:

```power-fx
With({result: Office365Outlook.CalendarDeleteItemV2("Calendar", 1)},
If( IsError(result),
  IfError(
    Boolean(result),  // any conversion function would do, such as Text, Value, …
    Notify("An Outlook appointment could not be found or could not be deleted: " & FirstError.Message)
) ) )
```

---

## Working with expired tokens

Source: [working-with-tokens.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-tokens)

*Learn how to manage tokens in Power Apps, Logic Apps, and Power Automate to ensure seamless connections even after credential changes or token revocations.*

# Manage expired tokens

This article explains how tokens are managed to ensure apps continue to function smoothly when credentials change.

API Hub handles connections differently for Power Apps, Logic App, and Power Automate. When you change your credentials, Power Apps automatically reauthenticates using a new token, while Logic Apps and Power Automate might run into issues because they use stored tokens that can become stale.


## Manage tokens in Power Apps

When a connection is invoked from Power Apps, API Hub uses the OBO (on-behalf-of) token sent in the 'invoke' request from Power Apps. API Hub exchanges the OBO token for a token to the target service. The OBO token is generated and validated during each Power Apps session before invoking the connector.

For example, if a user **changes their password**, all tokens are revoked. When Power Apps directly invokes the connection, it uses the new token in the 'invoke' request to proceed. The request to the connector succeeds without the user having to reauthenticate the connection.

## Manage tokens in Logic Apps and Power Automate

When a connection is invoked from Logic Apps or Power Automate, API Hub uses the stored token in the connection to exchange it for a token to the target service.

For example, **changing passwords or enforcing an MFA policy** revokes all tokens. A Logic Apps or Power Automate SSO (single sign-on) connection call fails during token exchange because the tokens aren't marked as broken, and the token stored in the connection is stale.

## Refresh tokens in Power Apps, Logic Apps, and Power Automate

Power Apps automatically renews or reauthenticates any connection that is broken. However, connections aren't marked as broken when tokens are revoked. They're marked as broken when the token exchange on API Hub fails. 

Therefore, Logic Apps and Power Automate must first attempt to run the connector with expired tokens. This action causes the connection to be marked as broken. Once Power Apps encounters a broken connection, it refreshes its local cache of connections, and the connection is repaired.

---

## Connect to Microsoft Dataverse

Source: [connection-common-data-service.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-common-data-service)

*Learn how to connect to Microsoft Dataverse and use it for building apps in Power Apps.*

# Connect to Microsoft Dataverse

Securely store your business data in Dataverse and build rich apps in Power Apps so users can manage that data. You can also integrate that data into solutions that include Power Automate, Power BI, and data from Dynamics 365.

By default, the app connects to the current environment for Dataverse tables. If your app moves to another environment, the connector connects to data in the new environment. This behavior works well for an app that uses a single environment or follows an application lifecycle management (ALM) process for moving from development, to test, and then to production.

When you add data from Dataverse, change the environment, and then select one or more tables. By default, the app connects to data in the current environment.

![Default environment.](media/connection-common-data-service/common-data-service-connection-change-environment.png)

If you select **Change environment**, specify a different environment to pull data from instead of, or in addition to, the current environment.

![Other environments.](media/connection-common-data-service/common-data-service-connection-select-environment.png)

The name of the selected environment appears under the tables list.

![New environments.](media/connection-common-data-service/common-data-service-connection-after-change-environment.png)

## Visibility and access

When you select **Change environment**, you see a list of environments. Even if you see an environment in the list, the security roles in the environment control what you can do there. For example, if you don't have read privileges, you can't see the tables and records in the environment.

> [!NOTE]
> Connections listed in the app details pane outside of the app designer show connections that need user consent. Because native Dataverse connections used in the app don't need additional consent, a native connection isn't in that list.


## Power Apps data type mappings

The Microsoft Dataverse connector is more robust than the Dynamics 365 connector and is approaching feature parity. The following table lists the data types in Power Apps and how they map to data types in Dataverse.

| Power Apps | Microsoft Dataverse |
| --- | --- |
| Choice | Choice, Yes/No |
| DateTime | Date Time, Date and Time, Date Only |
| Image | Image |
| Number | Floating Point Number, Currency, Decimal Number, Duration, Language, TimeZone, Whole Number |
| Text | Email, Multiline Text, Phone, Text, Text Area, Ticker Symbol, URL |
| Guid | Unique Identifier |

## Power Apps delegable functions and operations for Dataverse

These Power Apps operations, for a given data type, can be delegated to
Dataverse for processing instead of processing locally within Power Apps.

| **Item**                                                        | **Number [1]** | **Text [2]** | **Choice** | **DateTime [3]** | **Guid** |
|-----------------------------------------------------------------|----------------|--------------|------------|------------------|----------|
| \<, \<=, \>, \>=                                                | Yes            | Yes          | No         | Yes              | \-       |
| =, \<\>                                                         | Yes            | Yes          | Yes        | Yes              | Yes      |
| And/Or/Not                                                      | Yes            | Yes          | Yes        | Yes              | Yes      |
| CountRows [4] [5], CountIf [6]                                  | Yes            | Yes          | Yes        | Yes              | Yes      |
| Filter                                                          | Yes            | Yes          | Yes        | Yes              | Yes      |
| First [7]                                                       | Yes            | Yes          | Yes        | Yes              | Yes      |
| In (membership) [8]                                             | Yes            | Yes          | Yes        | Yes              | Yes      |
| In (substring)                                                  | \-             | Yes          | \-         | \-               | \-       |
| IsBlank [9]                                                     | Yes            | Yes          | No         | Yes              | Yes      |
| Lookup                                                          | Yes            | Yes          | Yes        | Yes              | Yes      |
| Search                                                          | No             | Yes          | No         | No               | \-       |
| Sort                                                            | Yes            | Yes          | Yes        | Yes              | \-       |
| SortByColumns                                                   | Yes            | Yes          | Yes        | Yes              | \-       |
| StartsWith                                                      | \-             | Yes          | \-         | \-               | \-       |
| Sum, Min, Max, Avg [6]                                          | Yes            | \-           | \-         | No               | \-       |
| UpdateIf/RemoveIf [10]                                          | Yes            | \-           | \-         | No               | \-       |

### Notes
1.  Numeric with arithmetic expressions (for example, `Filter(table, field + 10 > 100)`) aren't delegable. Language and TimeZone aren't delegable. Casting a column to a number isn't supported. If a value appears as a number in Power Apps but the backend data source isn't a simple number, such as currency, then it isn't delegated.
2.  Doesn't support Trim[Ends] or Len. Supports other functions like Left, Mid, Right, Upper, Lower, Replace, and Substitute. Also, casting such as Text(column) isn't supported for delegation.
3.  DateTime is delegable except for DateTime functions Now() and
    Today().
4.  CountRows on Dataverse uses a cached value. For non-cached values where the record count is under 50,000 records, use `CountIf(table, True)`.
5.  For CountRows, ensure that users have appropriate permissions to get totals for the table. 
6.  All aggregate functions are limited to a collection of 50,000 rows. If needed, use the Filter function to select 50,000 rows. Aggregate functions aren't supported on views.
7.  The FirstN function isn't supported.
8.  The `In` operator is subject to the 15-table query limit of Dataverse.
9.  Supports comparisons. For example, `Filter(TableName, MyCol = Blank())`.
10. UpdateIf and RemoveIf work locally but simulate delegation to a limit of 500 or 2,000 records. They successively bring down records beyond the nondelegation 500 or 2,000 record limit. Records that meet the If condition are collected. Generally, a maximum of 500 or 2,000 records are collected separately and then changed per execution. However, more records can be updated if the existing local data cache is large because the function can access more records for evaluation.

## Call Dataverse actions directly in Power Fx

As part of the Power Fx language, you can now directly invoke a Dataverse action within a formula. Both unbound and bound actions are supported. Add a Power Fx `Environment` language object to your app to use Dataverse actions.

You can work with dynamic fields for both inputs and outputs. For inputs, many Dataverse actions require a dynamic value as an argument. Pass these arguments by using ParseJSON to convert a Power Fx record into a dynamic value. For outputs, if an action returns dynamic values, just use dot notation to access object properties. Cast specific values for use in Power Apps, such as in a label.

Before this feature, you often used Power Automate to call Dataverse directly. Calling Dataverse from Power Fx gives you significant performance benefits and is easier to use, so use this approach for direct transactional reads and updates. If your app uses Power Automate to call Dataverse actions, you see a banner suggesting you use this direct action approach instead.

Working with dynamic fields isn't limited to Dataverse. This feature works with all types of connectors and provides basic ad hoc dynamic schema support.

> [!NOTE]
> 1. DV actions aren't fully supported in Power Fx commanding (for any action call with parameters).
> 2. Direct references to an entity or entity collections aren't supported.
> 3. For parameters of object type that are nested two or more levels deep, Power Apps treats the second-level attributes as required.

### Enable access to Microsoft Dataverse actions

For new apps, this feature is automatically enabled. For apps you created earlier, enable access to Dataverse actions.

For older apps, open your canvas app for editing. Go to **Settings** > **Upcoming features** > **Retired**, and enable Dataverse actions.

### Add the Power Fx Environment language object to your app

To use Dataverse actions in your Power Fx formulas, select **Add data**, search for **Environment**, and add it to your app.

![Screenshot of searching for the Power Fx Environment object in the Add data pane.](media/connection-common-data-service/common-data-service-connection-search-for-environment.png)

This step adds the Power Fx `Environment` language object to your app.

![Screenshot of the Power Fx Environment object as a data source in the app.](media/connection-common-data-service/common-data-service-connection-environment-object-added.png)


### Access Dataverse actions

After you add the Power Fx `Environment` object to your app, access Dataverse actions by adding `Environment` to your formula and then using dot notation for the actions.

![Screenshot of using the Power Fx Environment object in a formula.](media/connection-common-data-service/common-data-service-connection-using-the-Envrionment-PowerFx-object.png)

Unbound Dataverse actions are at the same level as tables and need the parent scope of the **Environment** language object. All actions in your environment are available—both system and custom. Both bound and unbound actions are available. The two-level call limit is removed.

![Screenshot of using a Dataverse action connected to a button.](media/connection-common-data-service/common-data-service-connection-hooking-up-an-action-to-a-button.png)

For more details on how to use Dataverse actions in your formulas, see [Working with dynamic values](../untyped-and-dynamic-objects.md).



### Pass entity type arguments for bound and unbound actions

To pass entity type arguments for Dataverse actions, set the entity type argument value to a variable. Make sure to fill in any missing values, such as ***activityId**. This step is important for entities that don't have defined types in the swagger.

```power-fx
Set(MyArgVar, {
  name: First(systemUser).name,
  Id: First(systemUser).Id
  ... })
```

### Rename, refresh, and use actions in other environments

To rename an Environment, select the ellipses and then select "Rename". If you add a new Dataverse action in Dataverse and want Power Apps to see it, select "Refresh". To use an action in a different environment, change the environment, then search for 'Environment', select it, and add it to your app.

---

## Microsoft Dataverse and the improve data source experience

Source: [use-native-cds-connector.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/use-native-cds-connector)

*Learn about upgrading native Microsoft Dataverse connector for improve data source experience.*

# Microsoft Dataverse and the improve data source experience


## Overview

In May 2021, many features that were previously optional are now the default behavior for all new apps. This article provides guidance to users who developed an app before the introduction of new features, on how to upgrade their app to leverage the latest functionalities.

### Native Dataverse

If you created a canvas app with either the Dataverse or the Dynamics 365 connector before November 2019, then you might not have the benefits of using the current native connection experience for the Dataverse.

If you created your app prior to November 2019 and you aren't using a native Dataverse connection, then in Settings in the Upcoming features tab, in the 'Retired' tab you'll find the **Improve data source experience and Microsoft Dataverse views** option along with the **Relational data, choices, and other new features for Microsoft Dataverse**.

## How do I upgrade?

Upgrade your app by inspecting the settings of the features and then by following the directions below:

### *Relational data, option sets and other new features for Microsoft Dataverse* is Off

Check *Retired* section under *Upcoming features*.  If set to *Off*, continue with the following instructions as a first step in the conversion.

If you don't see **Relational data, option sets and other new features for Microsoft Dataverse** in *General settings*, or if it’s already *On*, skip the following steps and continue to the [next section](#improve-data-source-experience-and-microsoft-dataverse-views-is-off).

- **Step 1**: Turn **Use display names** feature **On**:

    1. Turn **Use display names** feature *On*.
    1. Wait for the health monitor to finish analyzing your app.
    1. Save, close, and reopen your app.
    1. Resolve all formula errors.
    1. Save, close, and reopen your app.

    *Possible errors and suggestions*:

    It’s possible that some of the newly shown display names may conflict with the display names for other tables, fields, or controls. For example, you may have a control and a field with the same name. You can change the name of the control with a unique value to fix.

    For any field and table display name conflict, you may see a formula that expects a table but resolves to a locally scoped field name.

    Use the square bracket with an **@** symbol to indicate a global scope so it resolves to the table; for example, **[@tableName]**.

- **Step 2**: Turn **Relational data, option sets and other new features for Microsoft Dataverse** and **Use GUID data types instead of strings** features **On**:

    1. Turn **Relational data, option sets and other new features for Microsoft Dataverse** feature *On*.
    1. Turn **Use GUID data types instead of strings** feature *On*.
    1. Wait for the health monitor to finish analyzing your app.
    1. Resolve all formula errors.
    1. Save, close, and reopen your app.  

    *Possible errors and suggestions*:

    It’s possible to have errors at this stage if you're using a choice field or hard-coded GUID text values.  <br><br>

  - *Choice values*: If you're using choice field with a text identifier for the choice value, use the dot notation instead to reference the choice value. For example, change `Patch(Accounts, OptionSet1 = “12345”)` to `Patch(Accounts, OptionSet.Item1)` where `Item1` corresponds to the `12345` value. <br>
    More information: [Detailed Examples](#detailed-examples).
  - *GUIDs*: If you're using a static GUID string such as `015e45e1044e49f388115be07f2ee116`, convert it to a function that returns a GUID object; for example `GUID(“015e45e1044e49f388115be07f2ee116”)`.
  - *Lookups*: If you're using Lookup functions to get first-level lookup values such as `Lookup(Contacts, ‘contactID’ = ThisItem.ContactID”)`, consider using `ThisItem.PrimaryContacts` (where PrimaryContacts is the name of the table) instead.

### *Improve data source experience and Microsoft Dataverse views* is Off

Use the following instruction to turn **Improve data source experience and Microsoft Dataverse views** feature *On*:

1. Remove your existing Dataverse data source connections.
1. Turn *On* the **Improve data source experience and Microsoft Dataverse views** feature.
1. Add the Dataverse connection using the new data source selection experience.
1. Save your application.

> [!NOTE]
> If your application is extremely large, adding your data source connections back may take a while. Don't close the application during this process.

## Converting canvas apps with the Dynamics 365 connector

To convert your app that uses the Dynamics 365 connector, you need to remove and add the connections to your data sources. Use the steps below to convert your connections to your data sources.

1. Ensure the **Improve data source experience and Microsoft Dataverse views** feature is turned *On*.
2. Remove your existing Dynamics 365 data source connections.
3. Add the connections to your data sources to the Dataverse using the new data source selection experience.

    > [!NOTE]
    > - If you have connections to other environments (other than current), select the *Table* category and then the *More* (...) option to change the environment. You can then select a table from a different environment to add to your application. Cross-tenant connections don't work with the improved native connector. You'll need to use data integration to access data cross-tenant.
    > - You need to meet one of the following requirements to be able to see an environment that you want to add the connection to:
    >   - You're the **Owner** of the app, or the app is [shared](share-app.md) with you as a **Co-owner**.
    >   - You're a member of at least one of these security roles: **Environment Admin**, **Environment Maker**, or **System Administrator**. For more information about the security roles in an environment, go to [Configure user security to resources in an environment](/power-platform/admin/database-security).

4. Save your application.

*Possible errors and suggestions*:

It’s possible to have errors as you convert if: you aren't using Display Names, if you're using GUID strings, or if you're using a choice.

- If control name conflicts, change the name of the control to be different and unique.
- For field and table display name conflicts, you might see a formula that is expecting a table but is resolving to a more locally scoped field name. Use the square bracket with an *@* symbol to indicate a global scope so it resolves to the table; for example, **[@tableName]**.
- *Choice values*: If you're using a choice field with a text identifier for the choice value, use the dot notation instead to reference the choice value. For example, change `Patch(Accounts, OptionSet1 = “12345”)` to `Patch(Accounts, OptionSet.Item1)` where `Item1` corresponds to the `12345` value. <br>
More information: [Detailed Examples](#detailed-examples).
- *GUIDs*: If you're using a static GUID string such as `015e45e1044e49f388115be07f2ee116`, convert it to a function that returns a GUID object; for example `GUID(“015e45e1044e49f388115be07f2ee116”)`.
- *Lookups*: If you're using Lookup functions to get first-level lookup values such as `Lookup(Contacts, ‘contactID’ = ThisItem.ContactID”)`, consider using `ThisItem.PrimaryContacts` (where PrimaryContacts is the name of the table) instead.
- For any Polymorphic references, refer to the Detailed Examples section below.

## Detailed Examples

Converting your app to use the new **Option sets** and **Two options** data types with supporting controls can be challenging while upgrading an app to use the new *Improve data source experience and Microsoft Dataverse views* feature.

### Choices

Separate `_myfield` and `_myfield_label` fields were used for choice earlier. Now, there's a single `myfield` that can be used both for locale-independent comparisons and to obtain the locale-specific label.

#### Removing and adding choice Data cards

We recommend that youremove existing data cards and add them back to work with your choice. For example, if you're working with the Account table and the Category choice, you see that the *DataField* property of the data card was set to `_accountcategorycode_label`. In the field list you can see that the data card has a type of *String*:

![OptionSet with old style name.](./media/use-native-cds-connector/OptionSet-with-old-style-name.png)

With the new *Improved data source experience and Microsoft Dataverse views* feature, you no longer see `_accountcategorycode_label`. It's replaced by `accountcategorycode`. Your card is now be marked as **custom** and you'll see errors. Remove the old data card and add the *Choice* back. The new data card is *Choice* aware.

![OptionSet with new style name.](./media/use-native-cds-connector/OptionSet-with-new-style-name.png)

#### Editing the Choice Filter expressions to use new syntax

Previously, if you wanted to use a Choice value in a Filter expression you would need to use the *Value* field. For example:

```power-fx
Filter(Account,'Category Value' = "1")
```

You'll need to edit this formula. Choice text identifer is no longer used for the value. This expression should be updated to:

```power-fx
Filter(Account, Category= ‘Category (Accounts)’.’Preferred Customer’)
```

'Category(Accounts)' is the name of enum used in the Category field of the Accounts table. This is a local choice.  You can read more about local and global choices here: [Global choices.](../data-platform/create-edit-global-option-sets.md)

#### Editing choices patch statements to use new syntax

Following is an example of earlier Patch statement for choice:

```power-fx
Patch( Accounts, First(Accounts), { ‘Category Value’: 1 } ) )
```

You'll need to update your statements to follow this form:

```power-fx
Patch( Accounts, First(Accounts), { Category: ‘Category (Accounts)’.’Preferred Customer’ } )
```

#### Choice disambiguation

If the display name of an choice **field** and the name of the choice are the same, you'll need to disambiguate the formula. To continue using the Accounts Category Code example, the **@** implies to use the choice, not the field.

```power-fx
Filter(Accounts, 'Category Code' = [@’Category Code’].'Preferred Customer')
```

### Two Options

#### Removing and adding Yes/No Data cards

Remove existing data cards and add them back to work with your Yes/No. The data types were earlier recognized as simple boolean - such as true/on and false/off with no labels:

![Yes/No - old style.](./media/use-native-cds-connector/TwoOptionSet-Old.png)

With the new *Improved data source experience and Microsoft Dataverse views* feature, your card will now be marked as **custom** and you'll see errors.  Remove the old data card and add the choice back. You'll see an edit control with two options by default after you add.

![Yes/No - new style.](./media/use-native-cds-connector/TwoOptionSet-New.png)

If you prefer the toggle switch for your boolean field, you can unlock the data card and replace the control in the data card with a toggle instead.  You'll also need to set these properties on the Toggle.

```power-fx
Toggle1.Default = ThisItem.’Do not allow Bulk Emails’
Toggle1.TrueText = ‘Do not allow Bulk Emails (Accounts)’.’Do Not Allow’
Toggle1.FalseText = ‘Do not allow Bulk Emails (Accounts)’.Allow
DataCard.Value = If( Toggle1.Value,
    ‘Do not allow Bulk Emails (Accounts)’.’Do Not Allow’,
    ‘Do not allow Bulk Emails (Accounts)’.Allow )
```

![Two option Toggle switch.](./media/use-native-cds-connector/TwoOption-Toggle.png)

#### Refining Two Option Patch statements

Using the [Patch](./functions/function-patch.md) function with Two option should work 'as is'. It supports direct use of true and false, similar to Boolean. The only difference is being if you had put the value in a Label control earlier that showed true and false, it will now show the Two option labels instead.

### Polymorphic lookups

Following guidelines help to upgrade your application if it referenced [polymorphic](working-with-references.md) fields. Polymorphic lookups, from the same field, support references to a restricted set of multiple tables.  Similar to references in other languages, a record reference is a pointer to a specific record in a specific table. A record reference carries the table information allowing it to point to a record in several other tables, which differs from a normal lookup that can only point to records in one table.  

#### Access, Set, and Filter on the Owner field of a record

For instance, the Owner field in a table can refer to a record in the Users table or the Teams table. The same lookup field in different records could refer to records in different tables.

![Polymorphic Owner field.](./media/use-native-cds-connector/Polymorphic1.png)

##### Polymorphic with Filter and Patch

Record references can be used just like a full record:

```power-fx
Filter( Accounts, Owner = First( Teams ) )
Patch( Accounts, First( Accounts ), { Owner: First( Users ) })
```

##### Polymorphic with a Gallery displaying Owner name

Since a reference can point to different tables, you must be specific. You can't use **ThisItem.Owner.Name**, as the name field in the **Team** table is **Team Name**, and the name field in the **User** table is **Full Name**. Power Apps doesn't know which type of lookup you're referring to, until you run the app.

To fix this issue:

1. Add the data sources for the entity types that Owner could be; in current example, Users and Teams).
2. Use more functions to make your intent clear.

There are two new functions you can make use of:

- IsType – Checks if a record reference is of a particular table type.
- AsType – Casts a record reference to a particular table type.

With these functions, you can write a formula that displays the name of the Owner taken from two differently named fields, based on the table type of the Owner:

```power-fx
If( IsType( ThisItem.Owner,  [@Teams]), 
    AsType( ThisItem.Owner, [@Teams]).'Team Name', 
    AsType( ThisItem.Owner, [@Users]).'Full Name' )
```

![Gallery with As Type.](./media/use-native-cds-connector/Polymorphic-And-AsType-in-Gallery.png)

Global disambiguation operator for `[@Teams]` and `[@Users]` is used to ensure that you reference the global table type. Though in this case it's not necessary, it's a recommended to always be clear. One-to-many relationships often conflict in the gallery's record scope, and this practice avoids that confusion.

#### Access and set the Company Name field (a Customer data type) of the Contacts table

Customer lookup field is another polymorphic lookup that's similar to Owner. You can only have one Owner field per table. But a table can include zero, one, or more Customer lookup fields. The Contacts system table includes the Company Name field, which is a Customer lookup field. Read [show the fields of a customer](./working-with-references.md#show-the-columns-of-a-customer) for more details.

#### Access and set the Regarding field of activity tables such as Faxes, Phone Calls, Email Messages

Polymorphic lookups aren't limited to Accounts and Contacts. The list of tables is extensible with custom tables. For example, the Faxes table has a polymorphic Regarding lookup field, which can refer to Accounts, Contacts, and other tables. If you have a gallery with data source set to Faxes, you can use the following formula to display the name associated with the Regarding lookup field.

 ```power-fx
If( IsBlank( ThisItem.Regarding ), "",
    IsType( ThisItem.Regarding, [@Accounts] ),
        "Account: " & AsType( ThisItem.Regarding, [@Accounts] ).'Account Name',
    IsType( ThisItem.Regarding, [@Contacts] ),
        "Contacts: " & AsType( ThisItem.Regarding, [@Contacts] ).'Full Name',
    "" )
```

![Gallery with Regarding.](./media/use-native-cds-connector/Polymorphic-With-Regarding.png)

Read [Regarding lookup fields](./working-with-references.md#understand-regarding-lookup-columns) and [Regarding relationships](./working-with-references.md#understand-regarding-relationships) for more details.

#### Access the list of all Activities for a record

In Dataverse, tables such as Faxes, Tasks, Emails, Notes, Phone Calls, Letters, and Chats are designated as [activities](../../developer/data-platform/activity-entities.md). You can also create your own [custom activity tables](../../developer/data-platform/custom-activities.md).

You can show activities of a specific type (such as Faxes or Taxes), or all activities associated with a table such as account. Add the Activities table and other individual tables whose data you plan to display in the canvas app.

Each time you add a record to (for example the Tasks table), a record in the Activity table with the fields common across all activity tables is created. Read [activity table](./working-with-references.md#activity-table) for more details.

The following example shows that as you select an Account, all the Activities associated with that account will be displayed:

![Polymorphic Activities.](./media/use-native-cds-connector/Polymorphic-Activities.png)

The records are being displayed from the Activity table. But you can still use the [IsType](./functions/function-astype-istype.md) function to identify which kind of activity they are. Again, before you use IsType with a table type, you must add the necessary data source.

By using this formula, you can show the record type in a label control within the gallery:

 ```power-fx
If( IsType( ThisItem, [@Faxes] ), "Fax",
    IsType( ThisItem, [@'Phone Calls'] ), "Phone Call",
    IsType( ThisItem, [@'Email Messages'] ), "Email Message",
    IsType( ThisItem, [@Chats] ), "Chat",
    "Unknown")
```

 ![New Polymorphic-IsType.](./media/use-native-cds-connector/Polymorphic-IsType.png)

#### Access the list of Notes for a record

When you create a table, you can enable attachments. If you select the check box for enabling attachments, you create a Regarding relationship with the Notes table, as this graphic shows for the Accounts table:

![Notes field.](./media/use-native-cds-connector/Notes-Field.png)

##### Filtering

You can't read or filter based on the Regarding field. However, the reverse Notes one-to-many relationship is available. To list all the Notes associated to an Account table, you can use the following formula:

```power-fx
First( Accounts ).Notes
```

##### Patch

You can't set the Notes field on a table by using Patch. To add a record to a table's Notes table, you can use the Relate function. Create the note first, as in this example:

```power-fx
Relate( ThisItem.Notes, Patch( Notes, Defaults( Notes ), { Title: "A new note", isdocument:'Is Document (Notes)'.No } ) )
```

## Next steps

- [Formula reference](./formula-reference.md)
- [Controls reference](./reference-properties.md)

### See also

[What is Dataverse?](../data-platform/data-platform-intro.md)

---

## Connect to cloud-storage from Power Apps

Source: [cloud-storage-blob-connections.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/cloud-storage-blob-connections)

*See how to connect to a cloud-storage account, and display Excel data in your app*

# Connect to cloud-storage from Power Apps

Power Apps offers several cloud-storage connections. Using any of these connections, you can store an Excel file and use the information in it throughout your app. These connections include:  

[Box](/connectors/box/) | [Dropbox](/connectors/dropbox/) | [Google Drive](/connectors/googledrive/) | [OneDrive](/connectors/onedrive/) | [OneDrive for Business](/connectors/onedriveforbusiness/) |
| --- | --- | --- | --- | --- |
| ![Box](media/cloud-storage-blob-connections/boxicon.png "Box") |![Dropbox](media/cloud-storage-blob-connections/dropboxicon.png "Dropbox") |![Google Drive](media/cloud-storage-blob-connections/googledriveicon.png "Google Drive") |![OneDrive](media/cloud-storage-blob-connections/onedrive-icon.png "OneDrive")  |![OneDrive for Business](media/cloud-storage-blob-connections/onedrive-icon.png "OneDrive for Business") |

> [!NOTE]
> To learn about using Azure Blob Storage with Power Apps, go to [Connect to Azure Blob Storage from Power Apps](connection-azure-blob-storage.md).

## Prerequisites
* Access to [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the [connection](../maker/canvas-apps/add-manage-connections.md)
* Create an app from a [template](../maker/canvas-apps/get-started-test-drive.md), from [data](../maker/canvas-apps/get-started-create-from-data.md), or from [scratch](../maker/canvas-apps/get-started-create-from-blank.md)

* An Excel file with the data [formatted as a table](https://support.office.com/article/Create-an-Excel-table-in-a-worksheet-E81AA349-B006-4F8A-9806-5AF9DF0AC664):
  
  1. Open the Excel file, and then select any cell in the data that you want to use.
  2. On the **Insert** tab, select **Table**.
  3. In the **Save as Table** dialog box, select the **My table has headers** checkbox, and then select **OK**.
  4. Save your changes.

## Connect to the cloud storage connection
1. At [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), expand **Manage**, and select **Connections**:  
   
    ![Select Connections.](./media/cloud-storage-blob-connections/connections.png)
2. Select **New connection**, and select your cloud storage connection. For example, select **OneDrive**.
3. You are prompted for the user name and password of your cloud storage account. Enter them, and then select **Sign in**:  
    ![Enter user name and password.](./media/cloud-storage-blob-connections/signin.png)
   
    Once you are signed in, this connection is ready to be used within your apps.
4. In your app, click or tap **Data sources** on the **View** tab of the ribbon. In the right-hand pane, click or tap **Add a data source**, click or tap your cloud-storage connection, and then choose the Excel table.
5. Select **Connect**.
   
    The table is listed as a data source:
   
    ![Select the Excel table.](./media/cloud-storage-blob-connections/selecttable.png)
   
    > [!NOTE]
   > Remember, the Excel data must be formatted as a table.

## Using the Excel data in your app
1. On the **Insert** tab, select **Gallery**, and then select a **With text** gallery control.
2. Set the **[Items](../controls/properties-core.md)** property of the gallery to your Excel table. For example, if your Excel table is named **Table1**, then set it to Table1:  
   
    ![Items property.](./media/cloud-storage-blob-connections/itemsproperty.png)  
   
    The gallery is automatically updated with information from your Excel table.
3. In the gallery, select the second or third **Label** control. By default, you see the **Text** property of the second and third labels is automatically set to `ThisItem.something`. You can set these labels to any column in your table.
   
    In the following example, the second label is set to `ThisItem.Name` and the third label is set to `ThisItem.Notes`:  
   
    ![Second label.](./media/cloud-storage-blob-connections/items-secondtextbox.png)  
   
    ![Third label.](./media/cloud-storage-blob-connections/items-thirdtextbox.png)  
   
    Sample output:  
    ![Second and third labels.](./media/cloud-storage-blob-connections/secondthirdtextboxes.png)
   
> [!NOTE]
> The first box is actually an image control. If you don't have an image in your Excel table, then you can delete the image control, and add a label in its place. [Add and configure controls](../add-configure-controls.md) is a good resource.

[Understand tables and records](../working-with-tables.md) provides more details and some examples.  

## Sharing your app
You can share [your app](../share-app.md), [your resources](../share-app-resources.md) such as connectors, and [your data](../share-app-data.md) with others in your organization.

If you're sharing a folder in Dropbox, the shared folder must be attached to the user's Dropbox account.

There are [certain limitations](#sharing-excel-tables) with connectors involving Excel files.

## Known limitations

- If **Data type unsupported** or **Not formatted as a table** appears when you try to use an Excel connection in your app, [format the data as a table](https://support.office.com/article/Create-an-Excel-table-in-a-worksheet-E81AA349-B006-4F8A-9806-5AF9DF0AC664).

- If your Excel data includes a calculated column, you can't use it to build an app, and you can’t add that data to an existing app.

- Power Apps mobile app for Windows platform doesn't support **Dropbox** connector. A pop-up dialog will show the following message in this situation: <br>
  `Upgrade browser to use Dropbox`
<br> When this happens, consider using web player on Windows platform.

### Sharing Excel tables
To share data in an Excel file:

* In OneDrive for Business, share the file itself.
* In OneDrive, share the folder that contains the file, and specify file paths, not URLs, for any media.
* In Dropbox or Google Drive, share either the file or the folder.

## Helpful links
See all the [available connections](../connections-list.md).  
Learn how to [add connections](../add-manage-connections.md) and [add a data source](../add-data-connection.md) to your apps.  
[Understand tables and records](../working-with-tables.md) with tabular data sources.  
Some additional gallery resources include [Show a list of items](../add-gallery.md) and [Show images and text in a gallery](../show-images-text-gallery-sort-filter.md).

<!--Icon references-->
[boxicon]: ./media/cloud-storage-blob-connections/boxicon.png
[dropboxicon]: ./media/cloud-storage-blob-connections/dropboxicon.png
[googledriveicon]: ./media/cloud-storage-blob-connections/googledriveicon.png
[onedriveicon]: ./media/cloud-storage-blob-connections/onedriveicon.png
[onedriveforbusinessicon]: ./media/cloud-storage-blob-connections/onedriveforbusinessicon.png

---

## Connect to Azure Blob Storage from Power Apps

Source: [connection-azure-blob-storage.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-azure-blob-storage)

*Learn how to connect and upload files to Azure Blob Storage using canvas apps.*

# Connect to Azure Blob Storage from Power Apps

Power Apps can connect to [Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction). You can upload files such as Word, Excel, or multimedia images, audio or video using the [Azure Blob Storage connector for Power Apps](/connectors/azureblob/).

When you design a canvas app that connects to Azure Blob Storage, the app uses the blob storage account name and key to connect. After you share the app with others, users can use the connection configured inside the app to upload files to Azure Blob Storage without the need to share blob storage name and keys with the app users.

In this article, you'll learn how to create a sample canvas app that connects to Azure Blob Storage, and add controls to the app that allow you to upload different types of files to the connected blob storage.

> [!NOTE]
> To learn more about other types of cloud storage options with Power Apps (such as OneDrive, OneDrive for Business, Google Drive, Dropbox, or Box), go to [Connect to cloud storage from Power Apps](cloud-storage-blob-connections.md).

## Prerequisites

Before you begin, create and configure a [BlockBlobStorage account](/azure/storage/blobs/storage-blob-create-account-block-blob?tabs=azure-portal). You can also use legacy BlobStorage account, though not recommended. More information: [Types of storage accounts in Azure Blob Storage](/azure/storage/common/storage-account-overview)

## Create Azure Blob Storage connection

Power Apps requires a connection to Azure Blob Storage to be created for the app to connect to the storage.

To create the Azure Blob Storage connection:

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left-pane, expand **Data**.

1. Select **Connections**.

1. Select **New connection**.

1. Select **Azure Blob Storage**.

    ![New Azure Bob Storage connection.](./media/connection-azure-blob-storage/azure-blob-storage-connection.png "New Azure Bob Storage connection")

1. Copy and paste the account name, and access key.

    ![Enter storage account name and access keys.](./media/connection-azure-blob-storage/storage-access-keys.png "Enter storage account name and access keys")

    For more information about how to copy account name and access key, go to [View account access keys in Azure](/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

1. Select **Create**.

Your connection to the Azure Blob Storage is now configured and ready to use with canvas apps.

## Create canvas app with Azure Blob Storage connection

Now that you have the connection with Azure Blob Storage created, let's create a canvas app that connects to this storage.

> [!NOTE]
> In this section, you'll create a sample app with sample controls, functionality and layout design. Depending on your business requirement, you can create the app with a different structure, or customize differently.

1. Create a [blank canvas app](../create-blank-app.md) with the name "Sample app for Azure Blob Storage" and **Phone** layout.

1. Inside Power Apps Studio, on the left-pane, select ![Data](./media/connection-azure-blob-storage/select-data.png "Data").

1. Select **Add data**.

1. From the list of connectors, select **Azure Blob Storage**.

    ![Select Azure Blob Storage connection.](./media/connection-azure-blob-storage/select-connector.png "Select Azure Blob Storage connection")

## View containers and files

Now that you have the app connected to Azure Blob Storage, let's add galleries to see containers and files within the containers from the connected storage.

1. Select **Insert** -> **Gallery** -> **Blank vertical**.

1. From the right-side of the screen, on the property pane, select the layout drop-down and choose **Title**.

    ![Select gallery layout for containers.](./media/connection-azure-blob-storage/select-layout-1.png "Select gallery layout for containers")

1. Select first ![Arrow icon.](./media/connection-azure-blob-storage/arrow-icon.png "Arrow icon") inside the gallery, and delete it.

    ![Delete arrow icon.](./media/connection-azure-blob-storage/delete-arrow-icon.png "Delete arrow icon")

1. From the right-side of the screen, on the property pane, select the drop-down for data source, and choose **Azure Blob Storage**.

    ![Data source for the gallery of containers.](./media/connection-azure-blob-storage/select-data-source-for-gallery.png "Data source for the gallery of containers")

1. Set the **Items** property of the gallery to:

    ```power-fx
    AzureBlobStorage.ListRootFolderV2().value
    ```

    ![List of containers.](./media/connection-azure-blob-storage/containers-list.png "List of containers")

    This operation lists blobs in the Azure Blob Storage root folder. More information: [List blobs in root folder](/connectors/azureblob#list-blobs-in-root-folder)

1. Select **Insert** -> **Gallery** -> **Blank vertical** to add another blank vertical gallery.

1. Move the gallery below the gallery you added earlier that shows the list of containers.

1. From the right-side of the screen, on the property pane, select the layout drop-down and choose **Title, subtitle, and body**.

1. Select first ![Arrow icon.](./media/connection-azure-blob-storage/arrow-icon.png "Arrow icon") inside the gallery, and delete it.

1. From the right-side of the screen, on the property pane, select the drop-down for data source, and choose **Azure Blob Storage**.

1. Set the **Items** property of the gallery to:

    ```power-fx
    AzureBlobStorage.ListFolderV2(Gallery1.Selected.Id).value
    ```

    This operation lists blobs in a container. More information: [List blobs](/connectors/azureblob#list-blobs)
    
    > [!NOTE]
    > *Gallery1* in this formula is the reference to the gallery added earlier that lists all containers in the storage account. Update the formula with the gallery name if different.

1. From the right-side of the screen, on the property pane, select **Edit** for **Fields**.

1. Change the selected fields for the gallery title as **DisplayName**, subtitle as **LastModified**, and body as **Path**.

    ![Select fields.](./media/connection-azure-blob-storage/set-fields.png "Select fields")

    The gallery now shows the list of files from the container selected using the gallery on the top.

    ![List of files from a container.](./media/connection-azure-blob-storage/files-list.png "List of files from a container")

1. Select **Insert** -> **Text label**.

1. Place the label on top of the app screen.

1. Set the label's  **Text** property as "Select a container".

1. Use the properties pane on the right-side of the screen and choose the label text color, size, and label text background color of your choice.

1. Select **Insert** -> **Text label**.

1. Place the label above the gallery with the list of files.

1. Set the label's  **Text** property as "Files list".

    ![List of files with labels added.](./media/connection-azure-blob-storage/files-list-with-labels.png "List of files with labels added")

## Upload files to Azure Blob Storage

With the app design so far, you're able to select a container and then list the files from the container.

Let's configure the app with controls and logic to allow upload of files to the connected Azure Blob Storage.

1. Select **Insert** -> **Media** -> **Add picture** to add the ability to select files to upload.

1. Resize the **Add picture** control and place it on the bottom-left of the app screen.

1. Set the **Text** property of the control to "Select a file to upload".

1. Select **Insert** -> **Button**.

1. Place the button on bottom-right side of the app screen.

1. Set the **Text** property of the button to "Upload".

1. Select **Insert** -> **Text input**.

1. Place the text input control above the **Upload** button.

1. Set the **Default** property of the button to "Enter File Name".

1. Set the **OnSelect** property of the button to:

    ```power-fx
    AzureBlobStorage.CreateFile(Gallery1.Selected.Name,TextInput1.Text, UploadedImage1.Image)
    ```

    This operation uploads a blob to Azure Blob Storage. More information: [Create blob](/connectors/azureblob#create-blob)

    > [!NOTE]
    > *Gallery1* in this formula is the reference to the gallery added earlier that lists all containers in the storage account. The file will be uploaded to the selected container in gallery 1. *TextInput1* and *uploadImage1* reference the text input and upload image controls. Update the formula with the control names if different.

    The app controls look like this in the sample app now.

    ![Upload file to the connected storage.](./media/connection-azure-blob-storage/upload-functionality-added.png "Upload file to the connected storage")

    > [!TIP]
    > Ensure you select **All files** when using the upload option to ensure all file types are visible in the file explorer dialog box.

## Download files from Azure Blob Storage

So far you've added the ability to view containers, files from the selected container, and the option to upload files to the storage. Now, let's understand how to work with the download capability with the connected storage.

1. Select the first row in the gallery with the list of files from a container.

    ![Select first row in the file list gallery.](./media/connection-azure-blob-storage/select-first-row.png "Select first row in the file list gallery")

1. Select **Insert** -> **Icons** -> **Download**.
    This adds the download icon for all rows in the gallery.

1. Move the first download icon towards the right side inside the gallery on the app screen. This also moves the rest of the icons for the next rows in the gallery.

    ![Move first row in the file list gallery.](./media/connection-azure-blob-storage/move-download-icon.png "Move first row in the file list gallery")

1. Set the **OnSelect** property of the download icon to:

    ```power-fx
    Launch(AzureBlobStorage.CreateShareLinkByPath(ThisItem.Path).WebUrl)
    ```

    This operation creates a SAS link for a blob using the path. More information: [Create SAS URI by path](/connectors/azureblob#create-blob)

    > [!IMPORTANT]
    > SAS URI created using **CreateShareLinkByPath** has a [default expiry](/connectors/azureblob#create-sas-uri-by-path) of 24 hours. If you have a business requirement to expire the URI in a shorter or different time, consider updates to this formula. For example, the below sample expires the URI in 1 hour using [Now()](../functions/function-datevalue-timevalue.md) and [DateAdd()](../functions/function-dateadd-datediff.md) functions.
    
    ```power-fx
    Launch(AzureBlobStorage.CreateShareLinkByPath(ThisItem.Path,{ExpiryTime:DateAdd( Now(),1)}).WebUrl)
    ```

    > [!TIP]
    > For more information about configuring Azure Blob Storage for public anonymous access, and different public access levels, go to [Configure anonymous public read access for containers and blobs](/azure/storage/blobs/anonymous-read-access-configure?tabs=portal).

The app now has the ability to allow you to download the files.

## Test, save, publish and share the app

Play the app to test, and verify the app works as expected. After the testing, ensure you [save and publish](../save-publish-app.md) the app before you close Power Apps Studio. And then, you can share the app with others [within your organization](../share-app.md), or [guests outside your organization](../share-app-guests.md).

## Optional customizations

In this section, you'll learn about optional and additional customizations that you can consider for your app.

### Media type

You can use **Media type**, or **Path** fields for the gallery to optionally display the image content in the respective controls. For example, [PDF viewer](../controls/control-pdf-viewer.md) for PDF files, [Image](../controls/control-image.md) for images, or [Audio/video](../controls/control-audio-video.md) for audio/video files.

For example, to filter the files with the file extension type of **.pdf**, use the following sample formula.

```power-fx
If(".pdf" in Gallery2.Selected.Path, AzureBlobStorage.GetFileContent(Gallery2.Selected.Id))
```

Similarly, you can use different file extension types, or media types to additionally customize added controls.

### Refresh galleries connected to Azure Blob Storage

The Azure Blob Storage connection doesn't refresh data inside the galleries automatically when the data is updated. If you have more than one container, you can select the other container and then, select the previously selected container back to refresh the connected gallery to display the changes.

Another method that can be considered is to use a collection for the first gallery, and then, use the function [ClearCollect](../functions/function-clear-collect-clearcollect.md) to refresh the collection.

For example, the following formulas allow you to update the collection for the top containers list in the first gallery, and update the second gallery when the upload button is selected, or when the screen appears (OnVisible screen property).

1. Set the **Items** property of the first gallery for the list of containers to "TopLevelList".

1. Append to the upload button **OnSelect** property:

    ```power-fx
    ClearCollect(TopLevelList, AzureBlobStorage.ListRootFolderV2().value)
    ```

3. Add to the screen **OnVisible** property:

    ```power-fx
    ClearCollect(TopLevelList, AzureBlobStorage.ListRootFolderV2().value)
    ```

## Limitations

You can't use Microsoft Excel as the data source when the file is stored in Azure Blob Storage. To use Excel as the data source, use the other cloud storage connectors (such as OneDrive, OneDrive for Business, Google Drive, Dropbox, or Box). More information: [Connect to cloud storage from Power Apps](cloud-storage-blob-connections.md)

## Next steps

[Design the app interface](../add-configure-controls.md)

### See also

[Connect to cloud storage from Power Apps](cloud-storage-blob-connections.md)

---

## Connect to Azure DevOps from Power Apps

Source: [azure-devops.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/azure-devops)

*See how to connect to Azure DevOps projects, display the queries and work items.*

# Connect to Azure DevOps from Power Apps

The Power Apps connector for [Azure DevOps](/connectors/visualstudioteamservices/) lets you work with your Azure DevOps instance. View Azure DevOps queries, select work items by type, and view or edit details—all from inside a canvas app connected to Azure DevOps.

> [!TIP]
> For a complete list of all actions, see [Azure DevOps connector actions](/connectors/visualstudioteamservices/#actions).

This article guides you through building a canvas app that connects to Azure DevOps to get a list of queries and interact with work items in your project.

## Prerequisites

You need the following:

- A Power Apps license. If you don't have one, use a [30-day trial](../../signup-for-powerapps.md), or sign up for a [developer plan](../../developer-plan.md) for non-production use.
- If you're new to Power Apps, learn the basics by [generating an app](../get-started-test-drive.md), then customize the app's [controls](../add-configure-controls.md), [gallery](../add-gallery.md), [forms](../working-with-forms.md), and [cards](../working-with-cards.md).
- A [blank canvas app](../create-blank-app.md) to connect to Azure DevOps.
- To create the app in this article, you need an [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops) instance with an organization, a project, and a shared query that has a few sample work items available for editing.
- The Azure DevOps instance must let **Third-party application access via OAuth**. For more information, see [Manage access policies for Azure DevOps](/azure/devops/organizations/accounts/change-application-access-policies#manage-a-policy).

## Step 1 - Add Azure DevOps data source

To connect to Azure DevOps, [edit](../edit-app.md) the [blank canvas app](../create-blank-app.md), and add the **Azure DevOps** data source.


:::image type="content" source="./media/azure-devops/add-data-source.png" alt-text="Screenshot of connecting to Azure DevOps in the data source selection pane.":::

If you don't have an Azure DevOps connection, select **Connect**, follow the prompts to enter your details, and allow the app to connect.

## Step 2 - List shared queries

In this section, you use the [ListQueriesInFolder](/connectors/visualstudioteamservices/#list-queries-within-folder) action for the Azure DevOps connector to list the available queries.

1. In the left pane, select **Insert** > **Layout** > **Blank vertical gallery**.

1. Enter the following formula for the **Items** property of the gallery. Replace the example parameter values with your own values.

    ```power-fx
    AzureDevOps.ListQueriesInFolder("Project", "Organization", "Folder").value
    ```


:::image type="content" source="./media/azure-devops/list-queries-in-folder.png" alt-text="Screenshot of list queries in folder using formula added to Items property of the vertical gallery.":::

The example uses the variables "Project", "Organization", and "Folder". The actual values are in the text boxes below the formula bar (highlighted). You find your Project and Organization values in the URL used to connect to Azure DevOps. The Folder is usually "Shared Queries" or "My Queries".


:::image type="content" source="./media/azure-devops/find-azuredevops-project-name.png" alt-text="Screenshot of locating the project and organization name for your Azure DevOps instance.":::

If you get the following error in the above formula, [enable third-party app access using OAuth](/azure/devops/organizations/accounts/change-application-access-policies#manage-a-policy) in your Azure DevOps organization, and try again.

"AzureDevOps.ListQueriesInFolder failed:{\"status\":401,\"message\":\"TF400813:The user 'GUID' isn't authorized to access this resource.\"}"

1. Set the **Layout** for the gallery to **Title and subtitle**.

1. Choose the fields appropriate for Azure DevOps as **Name** and **FolderOptions** for the title and subtitles.


:::image type="content" source="./media/azure-devops/query-list-fields.png" alt-text="Screenshot of gallery fields for listing queries.":::

## Step 3 - List work items

Use the [GetQueryResultsV2](/connectors/visualstudioteamservices/#get-query-results) action for the Azure DevOps connector to list all work items for the selected query. This action binds the gallery to the data source.

1. Insert another blank vertical gallery and place it next to the existing gallery.

1. Enter the following formula for the **Items** property of the gallery. Replace the example parameter values with your project and organization names.

    ```power-fx
    AzureDevOps.GetQueryResultsV2("Project", Text(Gallery1.Selected.Id), "Organization").value
    ```


:::image type="content" source="./media/azure-devops/get-query-results.png" alt-text="Screenshot of get query results from existing gallery based on the query selected.":::

This formula uses the [GetQueryResultsV2](/connectors/visualstudioteamservices/#get-query-results) action with the project name, query ID, and organization name. The query ID in this example (`Gallery2.Selected.Id`) refers to the query selected from the list of queries available through the gallery added earlier. Replace the gallery name as needed.

### Add dynamic return values to your gallery

The result of **GetQueryResultsV2** is dynamic, so the values are dynamic as well.


:::image type="content" source="./media/azure-devops/dynamic-return-results-message.png" alt-text="Screenshot of work item fields of title, work item type.":::

But you can access some of the values. Azure DevOps returns a basic set of values for all typed items. Select the data card in the gallery and insert two text labels. Set the text property of the labels as follows:

```power-fx
ThisItem.Value.'System.WorkItemType'
ThisItem.Value.'System.Title'
```

## Step 4 - Display work items

The app shows a list of all queries and the list of work items for the selected query. Now, add an edit form to display data.

1. Move both galleries to the left side of the screen to make room for the edit form.

1. Add **Edit form** to the screen and move it to the right side of the galleries.


:::image type="content" source="./media/azure-devops/add-edit-form.png" alt-text="Screenshot of adding an edit form.":::

1. Set the **DataSource** property of the edit form to `AzureDevOps.GetQueryResultsV2("Project", Text(Gallery1.Selected.Id),"Organization").value`. Replace "Project" and "Organization" with your project and organization names.

1. Set the **Item** property of the edit form to `Gallery2.Selected`.

This formula sets the **Item** property for the edit form to the work item that is selected.

1. Select **...** (ellipsis) > **Add a custom card**.


:::image type="content" source="./media/azure-devops/add-custom-card.png" alt-text="Screenshot of adding a custom card in the edit form.":::

1. Move the data card to the top of the edit form.


:::image type="content" source="./media/azure-devops/custom-card-top.png" alt-text="Screenshot of a custom card moved to the top section inside the edit form.":::

1. Increase the size of the text input control.


:::image type="content" source="./media/azure-devops/text-input-inside-custom-card.png" alt-text="Screenshot of a text input control inside a custom card.":::

1. Set the **Default** property of the text input control to `Text(ThisItem.Value.'System.Title')`. The Text function returns the value as text.


:::image type="content" source="./media/azure-devops/title-custom-card.png" alt-text="Screenshot of a text input control referring to the title of the work item.":::

This formula sets the default text inside the text input control to the **Title** field from the selected Azure DevOps work item.

> [!TIP]
> If your Azure DevOps project uses the **Description** field with HTML or rich text, use the [Rich text editor](../controls/control-richtexteditor.md) input control instead of the [Text input](../controls/control-text-input.md) or label controls. The **Rich text editor** control helps display the description as rich text instead of HTML code.

1. Repeat the previous steps to add another custom card, with a text input control inside with the **Default** property set to `Text(ThisItem.Value.'System.State')`.

This formula sets the default text inside the text input control to the **State** field from the selected Azure DevOps work item.

1. Rearrange the data cards inside the edit form to create space for the save icon.

### Add dynamic return values to your forms

So far, you use the Edit form, which simplifies data access by providing a common DataSource and Item property for all data cards in the form. To access dynamic values, set **both** the data source and the item properties as follows (replace Organization and Project with your values):

```power-fx
AzureDevOps.GetWorkItemDetails(Gallery2.Selected.Value.'System.Id',Organization, Project, Gallery2.Selected.Value.'System.WorkItemType')
```

When you pass the text property "WorkItemType", such as "Feature", you can switch between items like Features and Work Items. Because the set of fields for these items differs, the return type from this call is dynamic.

Access specific values using the common method Text(ThisItem.Value.'System.Id'). Alternatively, access them through the more general dynamic response using Text(ThisItem.fields.System_Id). These dynamic value names aren't typically documented. To find the correct names for these fields, including non-standard fields, open the monitor tool and examine the data response for the GetWorkItemDetails call. See the image below for guidance.

If you aren't using an Edit form but are using a container, retrieve these values with a formula like the one below, which gets information from a custom team field.

```power-fx
Text(AzureDevOps.GetWorkItemDetails(Gallery2.Selected.Value.'System.Id',Organization, Project, Gallery2.Selected.Value.'System.WorkItemType').fields.One_custom_CustomField1)
```


:::image type="content" source="./media/azure-devops/monitor-workitem-details.png" alt-text="Screenshot of the monitor tool showing work item details.":::

## Updating values in Azure DevOps

To update a value in Azure DevOps, use the `UpdateWorkItem` function in the `OnSelect` property of a button.

```power-fx
AzureDevOps.UpdateWorkItem(
    Gallery2.Selected.Value.'System.Id',
    Organization,
    {
        description: "This is a new description",
        dynamicFields: ParseJSON(JSON({'Custom Field 1': "This is new custom text" }))
    }
)
```

The formula adds new sample text, but you can also use a Power Fx expression.

Make sure the formula uses lowercase for built-in field names. For example, when you refer to the Description field, use `description: "This is a new description"` instead of `Description: "This is a new description"`. Incorrect casing can result in the error "400 Required parameter missing for requested operation: 'UpdateWorkItem'". For custom or dynamic values, use the display name as shown in the UI, such as 'Custom Field 1'. This naming convention is specific to Azure DevOps and might differ from other services.

## Next steps

Run the app. Select a query from the list of queries. Then, choose a work item you want to update the title or description of. Make a change, and then select the save button. The app saves your changes to the Azure DevOps work item. Switch to another query, and then switch back to see the changes in the app.

You can also customize the app further or create an app with more data cards on forms. Use a display form instead of an edit form to show data in different data cards. When you use a display form, use the [Text label](../controls/control-text-box.md) control to show text. When you use rich text or HTML format (like the **Description** field in Azure DevOps), use the [HTML text](../controls/control-html-text.md) control. For more information about customizing the app, see [controls](../add-configure-controls.md), [gallery](../add-gallery.md), [forms](../working-with-forms.md), and [cards](../working-with-cards.md).

### See also

[Working with dynamic schema data sources in Power Apps (experimental)](../working-with-dynamic-schema.md)

---

## Connect to Dynamics 365 from Power Apps

Source: [connection-dynamics-crmonline.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-dynamics-crmonline)

*Learn about how to create an app for managing data in Dynamics 365.*

# Connect to Dynamics 365 from Power Apps

If you want to connect to Dynamics 365 Business Central, Dynamics 365 Customer Insights, or Dynamics 365 Finance and Operations apps, choose the relevant connector.  

> [!IMPORTANT]
> The Dynamics 365 connector is deprecated. For more information, see [Dynamics 365 connector deprecation announcement](/power-platform/important-changes-coming#dynamics-365-connector-is-deprecated).
>
> - Use the [Microsoft Dataverse connector](connection-common-data-service.md) when connecting to the Microsoft Dataverse used for Microsoft Dynamics 365 Sales, Microsoft Dynamics 365 Customer Service, Microsoft Dynamics 365 Field Service, Microsoft Dynamics 365 Marketing, and Microsoft Dynamics 365 Project Service Automation. 
> - To convert your app that uses the deprecated Dynamics 365 connector, go to [Converting canvas apps with the Dynamics 365 connector](../use-native-cds-connector.md#converting-canvas-apps-with-the-dynamics-365-connector).

## See also

[Connecting to Your Business Central Data to Build a Business App Using Power Apps](/dynamics365/business-central/across-how-use-financials-data-source-powerapps)  
[Microsoft Power Platform integration with Finance and Operations](/dynamics365/fin-ops-core/dev-itpro/power-platform/overview)

---

## Connect to Dynamics AX from Power Apps

Source: [connection-dynamicsax.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-dynamicsax)

*See the available Dynamics AX functions, responses, and examples.*

# Connect to Dynamics AX from Power Apps
![Dynamics AX Online.](./media/connection-dynamicsax/dynamics-ax.png)

Use this connection to easily build apps that read, update, and delete data from these versions of Dynamics AX:

•    Dynamics AX Update1 + [hotfix-KB article](https://fix.lcs.dynamics.com/Issue/Resolved?kb=3175021&bugId=3762232&qc=75f75fb7cb5de685683dafada9bdc618a7674bc4e299935b567a28ac02489b5c)

•    Dynamics AX Update 2 and later

For information about how to create an app, see [Generate an app automatically](../get-started-create-from-data.md) or [Create an app from scratch](../get-started-create-from-blank.md). These topics are written for Excel, but the same principles apply to Dynamics AX.

For information about how to add data from Dynamics AX to an existing app, see [Add a data connection](../add-data-connection.md).

See the [list of available connections](../connections-list.md), and learn how to [manage connections](../add-manage-connections.md) in Power Apps.

### Next steps
* Learn how to [show data from a data source](../add-gallery.md).
* Learn how to [view details and create or update records](../add-form.md).

---

## Connect to Microsoft Translator from Power Apps

Source: [connection-microsoft-translator.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-microsoft-translator)

*See how to connect to Microsoft Translator, step through some examples, and see all the functions.*

# Connect to Microsoft Translator from Power Apps

![Microsoft Translator.](./media/connection-microsoft-translator/translatoricon.png)

Add the Microsoft Translator connector to display translated text in a **Label** control in your app. For example, you can create an input text box that asks the user to enter some text to translate. In another label, you can display the translated text.

This topic shows you how to create the Microsoft Translator connection, use the Microsoft Translator connection in an app, and lists the available functions.

## Prerequisites
* Access to [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the [connection](../maker/canvas-apps/add-manage-connections.md)
* Create an app from a [template](../maker/canvas-apps/get-started-test-drive.md), from [data](../maker/canvas-apps/get-started-create-from-data.md), or from [scratch](../maker/canvas-apps/get-started-create-from-blank.md)

## Connect to Microsoft Translator
1. Create a [blank canvas app](../create-blank-app.md).
2. In the left-hand pane, select **Data** tab, and then select **Add data source**.
3. Select **New connection**, and then select **Microsoft Translator**:  

    ![Connect to Microsoft Translator.](./media/connection-microsoft-translator/add-translator.png)
4. Select **Connect**. Your connection appears under **Data sources**:  

    ![Connect.](./media/connection-microsoft-translator/translatordatasource.png "Connect")

## Use the Microsoft Translator connection in your app
### Translate text
1. From the **Tree View** on the left-side of the screen, select **Insert**, and then choose the **Text input** control. Rename the text input control to **Source**.

2. Add a **Drop down** list (**Insert** menu > **Controls**), rename it to **TargetLang**, and move it below **Source**.
3. Set the **[Items](../controls/properties-core.md)** property of **TargetLang** to the following formula:  

    `MicrosoftTranslator.Languages()`
4. Add a label, move it below **TargetLang**, and set its **[Text](../controls/properties-core.md)** property to the following formula:  

    `MicrosoftTranslator.Translate(Source.Text, TargetLang.Selected.Value)`
5. Type some text into **Source**, and select a language in **TargetLang**. The label shows the text that you entered in the language you chose:  

    ![Translate text from English to Spanish.](./media/connection-microsoft-translator/translate-text.png)

### Speak translated text
If you haven't already, follow the steps in the previous section to translate some text. These next steps use the same controls.

1. Set the **[Items](../controls/properties-core.md)** property of the **TargetLang** drop-down list to the following formula:  

    `MicrosoftTranslator.SpeechLanguages()`
2. Rename the second label (not the **Source** box) to **Target**.
3. Add an **Audio** control (**Insert** menu > **Media**), and set its **Media** property to the following formula:  

    `MicrosoftTranslator.TextToSpeech(Target.Text, TargetLang.Selected.Value)`
4. Press F5, or select the Preview button (![Preview icon.](./media/connection-microsoft-translator/preview.png)). Type some text into **Source**, select a language in **TargetLang**, and then select the play button in the audio control.

    The app plays an audio version of the text that you entered in the language you chose.
5. Press Esc to return to the default workspace.

### Detect the source language
These next steps use the same **Source** text input and **Target** text controls. You can create new controls if you prefer, just update the names in the formula.

1. Select the **Target** text control, and set the **[Text](../controls/properties-core.md)** property to the following formula:  

    `MicrosoftTranslator.Detect(Source.Text).Name`
2. Type some text into **Source**.

    The label shows you the language of the text that you typed. For example, the label shows **French** if you type **bonjour**, or **Italian** if you type **ciao**.

## View the available functions
This connection includes the following functions:

| Function Name | Description |
| --- | --- |
| [Languages](connection-microsoft-translator.md#languages) |Retrieves all languages that Microsoft Translator supports |
| [Translate](connection-microsoft-translator.md#translate) |Translates text to a specified language using Microsoft Translator |
| [Detect](connection-microsoft-translator.md#detect) |Detects source language of given text |
| [SpeechLanguages](connection-microsoft-translator.md#speechlanguages) |Retrieves the languages available for speech synthesis |
| [TextToSpeech](connection-microsoft-translator.md#texttospeech) |Converts a given text into speech as an audio stream in wave format |

### Languages
Get languages: Retrieves all languages that Microsoft Translator supports

#### Input properties
None.

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Code |string |No | |
| Name |string |No | |

### Translate
Translate text: Translates text to a specified language using Microsoft Translator

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| query |string |yes |Text to translate |
| languageTo |string |yes |Target language code (example: 'fr') |
| languageFrom |string |no |Source language (if not provided, Microsoft Translator will try to auto-detect) (example: en) |
| category |string |no |Translation category (default: 'general') |

#### Output properties
None.

### Detect
Detect language: Detects source language of given text

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| query |string |yes |Text whose language will be identified |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Code |string |No | |
| Name |string |No | |

### SpeechLanguages
Get speech languages: Retrieves the languages available for speech synthesis

#### Input properties
None.

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Code |string |No | |
| Name |string |No | |

### TextToSpeech
Text to speech: Converts a given text into speech as an audio stream in wave format

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| query |string |yes |Text to convert |
| language |string |yes |Language code to generate speech (example: 'en-us') |

#### Output properties
None.

## Helpful links
See all the [available connections](../connections-list.md).  
Learn how to [add connections](../add-manage-connections.md) to your apps.

---

## Connect to Office 365 Outlook from Power Apps

Source: [connection-office365-outlook.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-office365-outlook)

*Reference information, including examples, for the Office 365 Outlook connection to Power Apps.*

# Connect to Office 365 Outlook from Power Apps

![Office 365 Outlook.](./media/connection-office365-outlook/office365icon.png)

If you connect to Office 365 Outlook, you can show, send, delete, and reply to email messages, in addition to other tasks.

You can add controls to perform these functions in your app. For example, you can add **Text input** controls to ask for the recipient, the subject, and the body of the email, and add a **Button** control to send the email.

This article shows you how to add Office 365 Outlook as a connection, add Office 365 Outlook as a data source to your app, and use this data in different controls.

> [!IMPORTANT]
> As of this writing, the calendar operation doesn't support recurring events.

## Prerequisites
* Access to [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the [connection](../maker/canvas-apps/add-manage-connections.md)
* Create an app from a [template](../maker/canvas-apps/get-started-test-drive.md), from [data](../maker/canvas-apps/get-started-create-from-data.md), or from [scratch](../maker/canvas-apps/get-started-create-from-blank.md)

## Connect to Office 365 Outlook

1. [Add a data connection](../add-data-connection.md) and select **Office 365 Outlook**:  
   
    ![Connect to Office 365.](./media/connection-office365-outlook/add-office.png)

1. Select **Connect**, and if prompted to sign in, enter your work account.

The Office 365 Outlook connection has been created and added to your app. Now, it's ready to be used.

## Show messages

1. On the **Insert** menu, select **Gallery**, and then select a **Blank vertical** control.

1. Set its **[Items](../controls/properties-core.md)** property to the following formula:  
   
    `Office365Outlook.GetEmails({fetchOnlyUnread:false})`
   
    After changing the settings, change **Layout** to **Title, Subtitle, Body**.
    
    The gallery control is automatically populated with some of your emails.
    
1. In the gallery, set the **Text** property of the first label to `ThisItem.From`. Set the second label to `ThisItem.Subject`. Set the third label to `ThisItem.BodyPreview`. You can also resize the labels.
   
    The gallery control is automatically populated with the new properties.

1. This function has several optional parameters available. Set the gallery's **Items** property to one of the following formulas:
   
    `Office365Outlook.GetEmails({fetchOnlyUnread:false})`  
    `Office365Outlook.GetEmails({fetchOnlyUnread:false, top:2})`  
    `Office365Outlook.GetEmails({folderPath:"Sent Items", fetchOnlyUnread:false, top:2})`  
    `Office365Outlook.GetEmails({folderPath:"Sent Items", fetchOnlyUnread:false, top:2, searchQuery:"powerapps"})`  
    `Office365Outlook.GetEmails({folderPath:"Deleted Items", fetchOnlyUnread:false, top:2, skip:3})`

## Send a message

1. On the **Insert** menu, select **Text**, and then select **Text input**.

1. Repeat the previous step 2 more times so that you have three boxes, and then arrange them in a column:  
   
    ![Three boxes in a column.](./media/connection-office365-outlook/threetextinput.png)

1. Rename the controls to:  
   
   * **inputTo**
   * **inputSubject**
   * **inputBody**

1. On the **Insert** menu, select **Controls**, and then select **Button**. Set its **[OnSelect](../controls/properties-core.md)** property to the following formula:  
   
    `Office365Outlook.SendEmail(inputTo.Text, inputSubject.Text, inputBody.Text)`

1. Move the button so that it appears under all the other controls, and set its **[Text](../controls/properties-core.md)** property to **"Send email"**.

1. Press F5, or select the Preview button (![Preview button.](./media/connection-office365-outlook/preview.png)). Type in a valid email address in **inputTo**, and type whatever you want in the other two **Text input** controls.

1. Select **Send email** to send the message. Press Esc to return to the default workspace.

## Send a message with an attachment

You can, for example, create an app in which the user takes pictures by using the device's camera and then sends them as attachments. Users can also attach many other kinds of files to an email app.

To add an attachment to a message, follow the steps in the previous section, but add a parameter to specify an attachment (when you set the **OnSelect** property of the button). This parameter is structured as a table in which you specify up to three properties for each attachment:

* Name
* ContentBytes
* @odata.type

> [!NOTE]
> You can specify the @odata.type property for only one attachment, and you can set it to an empty string.

In this example, a photo will be sent as **file1.jpg**:

`Office365Outlook.SendEmail(inputTo.Text, inputSubject.Text, inputBody.Text, {Attachments:Table({Name:"file1.jpg", ContentBytes:Camera1.Photo, '@odata.type':""})})`

In this example, an audio file will be sent in addition to the photo:

`Office365Outlook.SendEmail(inputTo.Text, inputSubject.Text, inputBody.Text, {Attachments:Table({Name:"file1.jpg", ContentBytes:Camera1.Photo, '@odata.type':""}, {Name:"AudioFile", ContentBytes:microphone1.audio })})`

## Delete a message

1. On the **Insert** menu, select **Gallery**, and then select a **Text gallery** control.

1. Set its **[Items](../controls/properties-core.md)** property to the following formula:  
   
    `Office365Outlook.GetEmails({fetchOnlyUnread:false})`
   
    The gallery control is automatically populated with some of your emails.

1. In the gallery, set the **Text** property of the first label to `ThisItem.Id`. Set the second label to `ThisItem.Subject`. Set the third label to `ThisItem.Body`.

1. Select the first label in the gallery, and rename it to **EmailID**:
   
    ![Rename first label.](./media/connection-office365-outlook/renameheading.png)

5. Select the third label in the gallery, and add a **Button** (**Insert** menu). Set the button's **OnSelect** property to the following formula:  
   
    `Office365Outlook.DeleteEmail(EmailID.Text)`

6. Press F5, or select the Preview button (![Preview button.](./media/connection-office365-outlook/preview.png)). Select one of the emails in your gallery, and select the button. 
    
    > [!NOTE]
    > This deletes the selected email from your inbox. So, choose wisely.

7. Press Esc to return to the default workspace.

## Mark a message as read

This section uses the same controls as [Delete a message](connection-office365-outlook.md#delete-a-message).

1. Set the button's **OnSelect** property to the following formula:  
   
    `Office365Outlook.MarkAsRead(EmailID.Text)`

1. Press F5, or select the Preview button (![Preview button.](./media/connection-office365-outlook/preview.png)). Select one of the unread emails, and then select the button.

1. Press Esc to return to the default workspace.

### See also

- For a list of all functions and their parameters, see the [Office 365 Outlook reference](/connectors/office365connector/).
- See all the [available connections](../connections-list.md).  
- Learn how to [manage your connections](../add-manage-connections.md).

---

## Connect to Office 365 Users connection from Power Apps

Source: [connection-office365-users.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-office365-users)

*See how to connect to Office 365 Users, step through some examples, and see all the functions.*

# Connect to Office 365 Users connection from Power Apps

![Office 365 Users.](./media/connection-office365-users/office365icon.png)

Office 365 Users lets you access user profiles in your organization using your Office 365 account. You can perform various actions such as get your profile, a user's profile, a user's manager or direct reports.

You can display this information in a label on your app. You can display one function, multiple functions, or even combine different functions. For example, you can create an expression that combines the User Name and Phone Number, and then display this information in your app.

This article shows you how to add Office 365 Users as a connection, add Office 365 Users as a data source to your app, and use table data in a gallery control.

## Prerequisites
* Access to [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the [connection](../maker/canvas-apps/add-manage-connections.md)
* Create an app from a [template](../maker/canvas-apps/get-started-test-drive.md), from [data](../maker/canvas-apps/get-started-create-from-data.md), or from [scratch](../maker/canvas-apps/get-started-create-from-blank.md)

## Add a connection

1. [Add a data connection](../add-data-connection.md) and select **Office 365 Users**:  

    ![Connect to Office 365.](./media/connection-office365-users/add-office.png)
2. Select **Connect**, and if prompted to sign in, enter your work account.

The Office 365 Users connection has been created and added to your app. Now, it's ready to be used.

## Use the connection in your app
### Show information about the current user
1. On the **Insert** menu, select **Label**
2. In the function bar, set its **[Text](../controls/properties-core.md)** property to any of the following formulas:

   `Office365Users.MyProfile().City`  
   `Office365Users.MyProfile().CompanyName`  
   `Office365Users.MyProfile().Country`  
   `Office365Users.MyProfile().Department`  
   `Office365Users.MyProfile().DisplayName`  
   `Office365Users.MyProfile().GivenName`  
   `Office365Users.MyProfile().Id`  
   `Office365Users.MyProfile().JobTitle`  
   `Office365Users.MyProfile().Mail`  
   `Office365Users.MyProfile().MailNickname`  
   `Office365Users.MyProfile().mobilePhone`  
   `Office365Users.MyProfile().OfficeLocation`  
   `Office365Users.MyProfile().PostalCode`  
   `Office365Users.MyProfile().Surname`  
   `Office365Users.MyProfile().TelephoneNumber`  
   `Office365Users.MyProfile().UserPrincipalName`  
   `Office365Users.MyProfile().AccountEnabled`  

The label shows the information that you entered about the current user.

### Show information about another user
1. On the **Insert** menu, select **Text**, and then select **Text input**. Rename it **InfoAbout**:  

    ![Rename control.](./media/connection-office365-users/renameinfoabout.png)
2. In **InfoAbout**, type or paste an email address of a user in your organization. For example, type in *yourName*@*yourCompany.com*.
3. Add a **Label** (**Insert** menu), and set its **[Text](../controls/properties-core.md)** property to any of the following formulas:

   * To show information about another user:  

     `Office365Users.UserProfile(InfoAbout.Text).City`  
     `Office365Users.UserProfile(InfoAbout.Text).CompanyName`  
     `Office365Users.UserProfile(InfoAbout.Text).Country`  
     `Office365Users.UserProfile(InfoAbout.Text).Department`  
     `Office365Users.UserProfile(InfoAbout.Text).DisplayName`  
     `Office365Users.UserProfile(InfoAbout.Text).GivenName`  
     `Office365Users.UserProfile(InfoAbout.Text).Id`  
     `Office365Users.UserProfile(InfoAbout.Text).JobTitle`  
     `Office365Users.UserProfile(InfoAbout.Text).Mail`  
     `Office365Users.UserProfile(InfoAbout.Text).MailNickname`  
     `Office365Users.UserProfile(InfoAbout.Text).mobilePhone`  
     `Office365Users.UserProfile(InfoAbout.Text).OfficeLocation`  
     `Office365Users.UserProfile(InfoAbout.Text).PostalCode`  
     `Office365Users.UserProfile(InfoAbout.Text).Surname`  
     `Office365Users.UserProfile(InfoAbout.Text).TelephoneNumber`  
     `Office365Users.UserProfile(InfoAbout.Text).UserPrincipalName`  
     `Office365Users.UserProfile(InfoAbout.Text).AccountEnabled`  
     `Office365Users.UserProfile(InfoAbout.Text).BusinessPhones`

   * To show information about another user's manager:  

     `Office365Users.Manager(InfoAbout.Text).City`  
     `Office365Users.Manager(InfoAbout.Text).CompanyName`  
     `Office365Users.Manager(InfoAbout.Text).Country`  
     `Office365Users.Manager(InfoAbout.Text).Department`  
     `Office365Users.Manager(InfoAbout.Text).DisplayName`  
     `Office365Users.Manager(InfoAbout.Text).GivenName`  
     `Office365Users.Manager(InfoAbout.Text).Id`  
     `Office365Users.Manager(InfoAbout.Text).JobTitle`  
     `Office365Users.Manager(InfoAbout.Text).Mail`  
     `Office365Users.Manager(InfoAbout.Text).MailNickname`  
     `Office365Users.Manager(InfoAbout.Text).mobilePhone`  
     `Office365Users.Manager(InfoAbout.Text).OfficeLocation`  
     `Office365Users.Manager(InfoAbout.Text).PostalCode`  
     `Office365Users.Manager(InfoAbout.Text).Surname`  
     `Office365Users.Manager(InfoAbout.Text).TelephoneNumber`  
     `Office365Users.Manager(InfoAbout.Text).UserPrincipalName`  
     `Office365Users.Manager(InfoAbout.Text).AccountEnabled`  
     `Office365Users.Manager(InfoAbout.Text).BusinessPhones`

The label shows the information that you entered about the user you specified or that user's manager.

> [!NOTE]
> If you're developing an app based on a table in the Microsoft Dataverse, you can specify a user based on ID instead of email address.

For example, you can [create an app automatically](../data-platform-create-app.md), add a screen that contains a **Label** control, and set the control's **Text** property to this formula:
<br>**Office365Users.UserProfile(BrowseGallery1.Selected.CreatedByUser).DisplayName**

If you create a contact and select that contact in the browse screen of the app, the **Label** control will show your display name.

### Show the direct reports of another user
1. Add a **Text input** control (**Insert** menu > **Text**), and rename it **InfoAbout**.
2. In **InfoAbout**, enter the email address of a user in your organization. For example, enter *yourManagersName*@*yourCompany.com*
3. Add a **With text** gallery (**Insert** menu > **Gallery**), and set its **[Items](../controls/properties-core.md)** property to the following formula:

    `Office365Users.DirectReports(InfoAbout.Text)`

    The gallery shows information about the direct reports of the user you entered.

    With the gallery selected, the right-hand pane shows options for that gallery.
4. In the second list, select **JobTitle**. In the third list, select **DisplayName**. The gallery is updated to show these values.  

> [!NOTE]
> The first box is actually an image control. If you don't have an image, you can delete the image control, and add a label in its place. [Add and configure controls](../add-configure-controls.md) is a good resource.

### Search for users

1. Add a **Text input** control (**Insert** menu > **Text input**).

1. Select **Insert** > **Vertical gallery**.

1. Change layout of the vertical gallery to **Title, subtitle, and body**.

1. Select the arrow icon from first row inside the gallery, and delete it.

1. Update the vertical gallery formula to the following.

    ```power-fx
    Office365Users.SearchUserV2({searchTerm:TextInput1.Text,top:5}).value
    ```

    In the formula above, the search term references text entered in the text input control ("TextInput1" in this example); and the search results are limited to top 5.

1. Update vertical gallery fields to show **DisplayName** in gallery title, **JobTitle** in subtitle, and **Department** in body.

    :::image type="content" source="media/connection-office365-users/gallery.png" alt-text="Gallery fields selected.":::

1. Play the app, and enter text inside the text input box. As you enter text, the results change based on the input string changes.

    :::image type="content" source="media/connection-office365-users/search.png" alt-text="Example of search.":::

## View the available functions
This connection includes the following functions:

| Function Name | Description |
| --- | --- |
| [DirectReports](connection-office365-users.md#directreports) |Returns the direct reports for the specified user. |
| [Manager](connection-office365-users.md#manager) |Retrieves user profile for the manager of the specified user. |
| [MyProfile](connection-office365-users.md#myprofile) |Retrieves the profile for the current user. |
| [SearchUser](connection-office365-users.md#searchuser) |Retrieves search results of user profiles. |
| [UserProfile](connection-office365-users.md#userprofile) |Retrieves a specific user profile. |

### MyProfile
Get my profile: Retrieves the profile for the current user.

#### Input properties
None.

#### Output properties

| Property Name | Type | Description |
| --- | --- | --- |
| City | string |City of user. |
| CompanyName | string |Company of user. |
| Country | string |Country of user. |
| Department |string |Department of user. |
| DisplayName |string |Display name of user. |
| GivenName |string |Given name of user. |
| Id |string |User id. |
| JobTitle |string |Job title of user. |
| Mail |string |Email id of user. |
| MailNickname |string |Nickname of user. |
| mobilePhone | string |Mobile phone of user. |
| OfficeLocation | string |Office location of user.|
| PostalCode | string |Postal code of user.|
| Surname |string |Surname of user. |
| TelephoneNumber |string |Telephone number of user. |
| UserPrincipalName |string |User Principal Name. |
| AccountEnabled |boolean |Account enabled flag. |
| BusinessPhones | string |Phone numbers of user's company.|

### UserProfile
Get user profile: Retrieves a specific user profile.

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Id |string |yes |User principal name or email id. |

#### Output properties

| Property Name | Type | Description |
| --- | --- | --- |
| City | string |City of user. |
| CompanyName | string |Company of user. |
| Country | string |Country of user. |
| Department |string |Department of user. |
| DisplayName |string |Display name of user. |
| GivenName |string |Given name of user. |
| Id |string |User id. |
| JobTitle |string |Job title of user. |
| Mail |string |Email id of user. |
| MailNickname |string |Nickname of user. |
| Surname |string |Surname of user. |
| TelephoneNumber |string |Telephone number of user. |
| UserPrincipalName |string |User Principal Name. |
| AccountEnabled |boolean |Account enabled flag. |
| BusinessPhones | string |Phone numbers of user's company.|

### Manager
Get manager: Retrieves user profile for the manager of the specified user.

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Id |string |yes |User principal name or email id. |

#### Output properties

| Property Name | Type | Description |
| --- | --- | --- |
| City | string |City of user. |
| CompanyName | string |Company of user. |
| Country | string |Country of user. |
| Department |string |Department of user. |
| DisplayName |string |Display name of user. |
| GivenName |string |Given name of user. |
| Id |string |User id. |
| JobTitle |string |Job title of user. |
| Mail |string |Email id of user. |
| MailNickname |string |Nickname of user. |
| mobilePhone | string |Mobile phone of user. |
| OfficeLocation | string |Office location of user.|
| PostalCode | string |Postal code of user.|
| Surname |string |Surname of user. |
| TelephoneNumber |string |Telephone number of user. |
| UserPrincipalName |string |User Principal Name. |
| AccountEnabled |boolean |Account enabled flag. |
| BusinessPhones | string |Phone numbers of user's company.|

### DirectReports
Get direct reports: Get direct reports.

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| Id |string |yes |User principal name or email id. |

#### Output properties

| Property Name | Type | Description |
| --- | --- | --- |
| City | string |City of user. |
| CompanyName | string |Company of user. |
| Country | string |Country of user. |
| Department |string |Department of user. |
| DisplayName |string |Display name of user. |
| GivenName |string |Given name of user. |
| Id |string |User id. |
| JobTitle |string |Job title of user. |
| Mail |string |Email id of user. |
| MailNickname |string |Nickname of user. |
| mobilePhone | string |Mobile phone of user. |
| OfficeLocation | string |Office location of user.|
| PostalCode | string |Postal code of user.|
| Surname |string |Surname of user. |
| TelephoneNumber |string |Telephone number of user. |
| UserPrincipalName |string |User Principal Name. |
| AccountEnabled |boolean |Account enabled flag. |
| BusinessPhones | string |Phone numbers of user's company.|

### SearchUser
Search for users: Retrieves search results of user profiles.

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| searchTerm |string |no |Search string. Applies to: display name, given name, surname, mail, mail nickname, and user principal name. |

#### Output properties

| Property Name | Type | Description |
| --- | --- | --- |
| City | string |City of user. |
| CompanyName | string |Company of user. |
| Country | string |Country of user. |
| Department |string |Department of user. |
| DisplayName |string |Display name of user. |
| GivenName |string |Given name of user. |
| Id |string |User id. |
| JobTitle |string |Job title of user. |
| Mail |string |Email id of user. |
| MailNickname |string |Nickname of user. |
| mobilePhone | string |Mobile phone of user. |
| OfficeLocation | string |Office location of user.|
| PostalCode | string |Postal code of user.|
| Surname |string |Surname of user. |
| TelephoneNumber |string |Telephone number of user. |
| UserPrincipalName |string |User Principal Name. |
| AccountEnabled |boolean |Account enabled flag. |
| BusinessPhones | string |Phone numbers of user's company.|

### See also
* See all the [available connections](../connections-list.md).
* Learn how to [add connections](../add-manage-connections.md) to your apps.

---

## Connect to an Oracle database from Power Apps

Source: [connection-oracledb.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-oracledb)

*Learn how to connect to Oracle Database and use it for building apps in Power Apps.*

# Connect to an Oracle database from Power Apps

List tables, and create, read, update, and delete table rows in an Oracle database after you create a connection and build an app in Power Apps. The Oracle Database connection supports full delegation of filtering, sorting, and other functions but not triggers or stored procedures.

## Prerequisites
* Oracle 9 and later
* Oracle Data Access Client (ODAC) software 11.2 or later
* Installation of an on-premises data gateway
* Installation of the Oracle client SDK

### Install an on-premises data gateway
To install a gateway, follow the steps in [this tutorial](../gateway-management.md).

An on-premises data gateway acts as a bridge, providing quick and secure data transfer between on-premises data (data that isn't in the cloud) and the Power BI, Power Automate, Logic Apps, and Power Apps services. You can use the same gateway with multiple services and multiple data sources. For more information, see [Understand gateways](../gateway-reference.md).

### Install Oracle client
On the same computer as the on-premises data gateway, install ODAC 11.2 or later. For example, you can install [64-bit ODAC 12c Release 4 (12.1.0.2.4) for Windows x64](https://www.oracle.com/technetwork/database/windows/downloads/index-090165.html) or choose a version that you prefer. You must choose a windows installer version since xcopy version does not work with on-premises data gateway.  Otherwise, an error will appear if you try to create or use the connection, as the list of known issues describes.

## Create an app from a table in an Oracle database

1. Go to [Power Apps](https://make.powerapps.com).

1. Select **Create** from the left-pane.

1. Under **Start from**, select **More data sources**.

1. Select **New connection**.

1. In the list of connections, select **Oracle Database**.

   ![New database.](./media/connection-oracledb/oracle-db.png)

1. Specify the name of an Oracle server, a username, and a password.

    Specify a server in this format if an SID is required: <br> `ServerName/SID`

   ![Connection parameters.](./media/connection-oracledb/connection-params.png "Connection parameters")

1. Select the gateway that you want to use, or install one.

    If your gateway doesn't appear after you install it, select **Refresh gateway list**.

   ![New gateway.](./media/connection-oracledb/choose-gateway.png "New gateway")

1. Select **Create** to create the connection.

   ![Create connection.](./media/connection-oracledb/create-button.png "Create connection")

1. Select **default** dataset.

   ![Select dataset.](./media/connection-oracledb/choose-dataset.png "Select dataset")

1. In the list of tables, select the table that you want to use.

   ![Select table.](./media/connection-oracledb/choose-table.png "Select table")

1. Select **Connect** to create the app.
    
    ![Connect to the table and create app.](./media/connection-oracledb/connect-button.png "Connect to the table and create app")

Power Apps creates an app that has three screens and shows data from the table that you selected:

* **BrowseScreen1**, which lists all entries in the table.
* **DetailScreen1**, which provides more info about a single entry.
* **EditScreen1**, in which users can update an entry or create an entry.

![Different app screens.](./media/connection-oracledb/afd-app.png "Different app screens")

## Next steps

* To save the app that you've generated, press Ctrl-S.
* To customize **BrowseScreen1** (which appears by default), see [Customize a layout](../customize-layout-sharepoint.md).
* To customize **DetailsScreen1** or **EditScreen1**, see [Customize a form](../customize-forms-sharepoint.md).

## Known issues, tips, and troubleshooting

1. Can't reach the Gateway.
   
    This error appears if the on-premises data gateway can't connect to the cloud. To check the status of your gateway, sign in to powerapps.microsoft.com, select **Gateways**, and then select the gateway that you want to use.
   
    Make sure that your gateway is running and can connect to the Internet. Avoid installing the gateway on a computer that may be turned off or asleep. Also try restarting the on-premises data gateway service (PBIEgwService).

1. System.Data.OracleClient requires Oracle client software version 8.1.7 or greater.
   
    This error appears if the Oracle client SDK isn't installed on the same computer as the on-premises data gateway. To resolve this issue, [install the official provider](/power-bi/connect-data/desktop-connect-oracle-database).

1. Table '[Tablename]' doesn't define any key columns.
   
    This error appears if you're connecting to a table that doesn't have a primary key, which the Oracle Database connection requires.

1. Stored procedures, tables with composite keys, and nested object types in tables aren't directly supported in Power Apps. However, stored procedures using Power Automate are supported.

1. Schema name dependency across environments.

   When connecting Power Apps to Oracle on-premises data sources, the schema prefix is treated as part of the table name. This means that the schema name must be exactly the same in every environment such as development, preproduction, and production. If you use different Oracle usernames or schemas in each environment, your app may not be able to find the tables during deployment—even if you update the connection references correctly. This will result in an **Entity Not Found** error.

   This limitation is by design: Power Apps does not currently support dynamic schema name substitution using environment variables. To prevent deployment failures, you should use the same Oracle schema name in all environments. Alternatively, you can consider solutions like Power Automate flows or Dataverse virtual entities, which provide more flexibility for managing environment-specific configurations.

---

## Connect to Power BI from Power Apps

Source: [connection-powerbi.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-powerbi)

*Learn about connecting to Power BI from Power Apps.*

# Connect to Power BI from Power Apps

![Power BI.](./media/connection-powerbi/powerbiicon.png)

Power BI is a suite of business analytics tools to analyze data and share insights. Monitor your business and get answers quickly with rich dashboards available on every device. In your app, you can check the status of the data alerts that you have set up in the Power BI service. For more information on data alerts in Power BI, head to the [documentation page](/power-bi/service-set-data-alerts).

This topic shows you how to use the Power BI connection in an app, and lists the available functions.

> [!NOTE]
> The Power BI connection is not [delegable](../delegation-overview.md).

## Prerequisites
* [Sign up](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the Power BI [connection](../add-manage-connections.md)
* Create an app from a [template](../get-started-test-drive.md), from [data](../get-started-create-from-data.md), or from [scratch](../get-started-create-from-blank.md)

## Use the Power BI connection in your app
### List the alerts that you've set up in the Power BI service
1. On the **Insert** menu, select **Gallery**, and add any of the **Text galleries**.
2. To show the current user's alerts, set the [Items](../controls/properties-core.md) property of the gallery to the following formula:

   `PowerBI.GetAlerts()`

The gallery will update with the list of alerts. For each alert, you will receive the alert name, the ID number of the alert, and the ID of the group workspace in which the alert was configured. You will need the alert ID to get further information about the alert.

### View the status of an alert
To view the status of the alert, call the CheckAlertStatus function with the alert ID obtained from the step above.

The alert ID can be passed in either as a literal string (e.g. "1234") or as a reference to a gallery section populated using the GetAlerts() call (e.g. Gallery1.Selected.alertId)

To proceed, add a label, and then set its [Text](../controls/properties-core.md) property to one of these formulas:

* `PowerBI.CheckAlertStatus( /* alert ID that you received from GetAlert */ ).alertTitle`
* `PowerBI.CheckAlertStatus( /* alert ID that you received from GetAlert */ ).currentTileValue`
* `PowerBI.CheckAlertStatus( /* alert ID that you received from GetAlert */ ).alertThreshold`
* `PowerBI.CheckAlertStatus( /* alert ID that you received from GetAlert */ ).isAlertTriggered`

The label will update with the current status of the alert.

## View the available functions
This connection includes the following functions:

| Function Name | Description |
| --- | --- |
| GetAlerts |List the alerts that you have set up in the Power BI service |
| CheckAlertStatus |Check the status of a particular alert |

## GetAlerts
List the alerts that you have set up in the Power BI service.

#### Input properties
None.

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| value |array |No |An array of the data alerts that you have set up in the Power BI service. Each element in the array will include: <ul><li>alertTitle: the title of the alert</li><li>alertId: the ID of the alert</li><li>groupId: the ID of the group that the alert was created in</li></ul> |

## CheckAlertStatus
Check the status of an alert.

> [!NOTE]
> Requests to this endpoint will be throttled on a per-alert basis if called too frequently.

#### Input properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| alertId |integer |Yes |The ID of the alert, as returned by GetAlerts |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| tileValue |number |No |The value of the tile when the alert was triggered |
| tileUrl |string |No |URL for the tile that has the alert |
| alertTitle |string |No |Name of the alert |
| isAlertTriggered |boolean |No |Whether the alert is currently triggered |
| alertThreshold |number |No |The threshold at which the alarm is triggered |

## Helpful links
See all the [available connections](../connections-list.md).  
Learn how to [add connections](../add-manage-connections.md) to your apps.

---

## Connect to SharePoint from a canvas app

Source: [connection-sharepoint-online.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-sharepoint-online)

*Connect to SharePoint from a canvas app in Microsoft Power Apps.*

# Connect to SharePoint from a canvas app

:::image type="icon" source="./media/connection-sharepoint-online/sharepointicon.png":::

There are different ways to connect to SharePoint in a canvas app:

- Connect to a SharePoint site to generate an app automatically from a list.
- Create a SharePoint connection before you add data to a new or existing app.

> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. The list can always be found in both Microsoft Lists and SharePoint. Learn more in [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5).

## Connect SharePoint to an app by creating an app

If you have a SharePoint site with a SharePoint list, you can create an app in Power Apps through the list menu in Microsoft Lists.

The **Integrate** > **Power Apps** > **Create an app** menu in Microsoft Lists takes you to Power Apps and builds an app using your list as a data source.

Learn more in [Create a canvas app with data from Microsoft Lists](../app-from-sharepoint.md).

## Create a SharePoint connection

If you build a new app or have an existing app, you can connect to SharePoint through the **Data** menu in Power Apps.

1. [Sign in to Power Apps](https://make.powerapps.com/).
1. Select **More** > **Connections** in the left navigation bar.

   :::image type="content" source="./media/connection-sharepoint-online/connections-menu.png" alt-text="Screenshot that shows the location of the Connections menu option in the More menu.":::

1. Select **+ New connection** and choose **SharePoint**. A popup appears.

1. Choose either the cloud-services or on-premises option:

    - To connect to SharePoint Online, select **Connect directly (cloud services)** and then **Create**. Provide credentials (if prompted).

        ![To connect to SharePoint Online, select Connect directly (cloud services).](./media/connection-sharepoint-online/select-online.png "Connect to a site")

        The connection is created, and you can add data to an existing app or build an app from scratch.

    - To connect to an on-premises site, select **Connect using on-premises data gateway**.

      Choose **Windows** as the authentication type and add your credentials. If your credentials include a domain name, specify it as `domain\alias`.

      :::image type="content" source="./media/connection-sharepoint-online/specify-creds.png" alt-text="Screenshot of the popup showing how to connect using on-premises data gateway.":::

      Under **Choose a gateway**, select the gateway that you want to use, and then select **Create**.

      > [!NOTE]
      > If you don't have an on-premises data gateway installed, [install one](../gateway-reference.md), and then select the  refresh icon for a list of gateways.

      The connection is created. You can add data to an existing app or build an app from scratch.

## Add data to an existing app

1. In Power Apps Studio, open the app that you want to update, select **Data** on the left-pane.

1. Select **Add data** > **Connectors** > **SharePoint**.

   :::image type="content" source="./media/connection-sharepoint-online/select-sp-site.png" alt-text="Screenshot showing the menu path to connect to SharePoint from the Data menu.":::

1. A side panel opens. Under **Connect to a SharePoint site**, select an entry in the **Recent sites** list (or add your own URL), and then select **Connect**.

1. Under **Choose a list**, select the check box for one or more lists, then select **Connect**:

   :::image type="content" source="./media/connection-sharepoint-online/select-sp-tables.png" alt-text="Screenshot that shows lists you can choose to include.":::

   > [!NOTE]
   > Power Apps supports lists, not template-based lists. If you don't see your list, type the list name in **Enter custom table name** box.
   > :::image type="content" source="./media/connection-sharepoint-online/custom-list.png" alt-text="Screenshot that shows the box where you can add a list name.":::

   You see a confirmation banner that your data source was added to your app.

   
## Power Apps data type mappings

|Power Apps      | SharePoint                                                                         |
| -------------- | ---------------------------------------------------------------------------------- |
| `Boolean`      | Yes/No (checkbox)                                                                  |
| `DateTime`     | Date and Time                                                                      |
| `Image`        | Hyperlink or Picture, Image                                                        |
| `Complex`      | Choice, Lookup, Person, Group, Task Outcome, External Data, Managed Metadata       |
| `Number`       | Number, Currency, ID                                                               |
| `Text`         | Single line of text, Multiple lines of text, Calculated                            |

> [!NOTE]
  > SharePoint types that map to Power Apps as complex often have subfields that map to basic types such as text and number.

## Power Apps delegable functions and operations for SharePoint

The following Power Apps operations, for a given data type, may be delegated to SharePoint for processing (rather than processing locally within Power Apps).

| Operation/Function [1]  | Number  | Text         | Boolean | DateTime    | Complex [2] |
|-------------------------|---------|--------------|---------|-------------|-------------|
| `<, <=,<>, >, >=`       | Yes [3] | No           | No      | Yes         | Yes         |
| `=`                     | Yes     | Yes          | Yes     | Yes         | Yes         |
| `Filter`                | Yes     | Yes          | Yes     | Yes         | Yes         |
| `IsBlank`               | -       | No [4]       | -       | -           | No          |
| `Lookup`                | Yes     | Yes          | Yes     | Yes         | Yes         |
| `Sort`                  | Yes     | Yes          | Yes     | Yes         | No          |
| `SortByColumns`         | Yes     | Yes          | Yes     | Yes         | No          |
| `StartsWith`            | -       | Yes          | -       | -           | Yes [5]     |
| `UpdateIf/RemoveIf` [6] | Yes     | No           | -       | -           | No          |

### Notes

1. Expressions that are joined with **And** or **Or** are delegable to SharePoint. **Not** won't delegate. SharePoint system fields don't generally delegate. These fields include:
  * ​​​​​​Identifier
  * IsFolder
  * Thumbnail
  * Link​
  * Name
  * FilenameWithExtension
  * Path
  * FullPath
  * ModerationStatus
  * ModerationComment
  * ContentType
  * IsCheckedOut
  * VersionNumber
  * TriggerWindowStartToken
  * TriggerWindowEndToken

2. SharePoint supports delegation of complex types by deferring the decision for delegation to the subfield involved. Check the type of the subfield being used on the complex type and then check this table for delegation capabilities.  Only Email and DisplayName are delegable in the Person data type.
3. SharePoint ID fields are shown as a number field in Power Apps. However, the underlying type is actually Text. SharePoint only supports the equal ('=') operation for delegation on an ID field. Relational operations such as `<, <=,<>, >, >=` won't work on a SharePoint ID field.
4. A formula such as Filter(..., IsBlank(CustomerId)) won't delegate to SharePoint. However, that formula is semantically close to Filter(..., CustomerId = Blank()), will delegate to SharePoint. These formulas aren't equivalent because the second formula won't treat the empty string ("") as empty. However, the second formula might work for your purposes. On SharePoint, this approach works for the 'equals' operator ("=") but not the operator for 'not equals' ("<>").
5. SharePoint does not support delegation of StartsWith on subfields of Choice or Lookup complex types.
6. UpdateIf and RemoveIf work locally but simulate delegation to a limit of 500/2000 records. They successively bring down records beyond the non-delegation 500/2000 record limit. Records that meet the If condition are collected. Generally, a maximum of 500/2000 records are collected separately and then changed per execution. However, more records may be updated if the existing local data cache is large as the function may have access to more records for evaluation.

  





## Related information

- Learn more about working with lists in Power Apps in [Integrate SharePoint Online into Power Apps overview](../sharepoint-list-integration-overview.md)
- [Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)

---

## Connect to SQL Server from Power Apps overview

Source: [sql-connection-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/sql-connection-overview)

*Learn how to connect to a SQL server to access and view data from Microsoft Power Apps.*

# Connect to SQL Server from Power Apps overview

There are different ways to connect to data in SQL Server in your app, using Power Fx formulas. You can access data directly or use a view or stored procedures to create, update, or delete data in your app.

## Prerequisites

To access data directly, you can create a *Start with data* app for your SQL Server data. This method lets you get a basic, working app that you can modify with views and stored procedures.

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) and go to the **Apps** page.
1. Select **New app** > **Start with data**.

   :::image type="content" source="media/sql-connection/new-app-start-with-data.png" alt-text="Screenshot that shows how to create an app by starting with data under the New app menu.":::
1. From the **Start with data** page, choose **Connect external data**.
1. Under **Choose a data set to start** select **From SQL**.

   If you have an existing SQL Server connection, it loads.

   > [!NOTE]
   > If you don't already have a SQL Server connection, you're prompted to create one.
1. Select your SQL connection.
1. Enter your **Server** name and **Database name**, then choose **Connect**. Choose a table from the list of tables that appear.

   :::image type="content" source="media/sql-connection/sql-server-details.png" alt-text="Screenshot that shows the Create an app page where you can choose a SQL Server connection, including a table.":::

   > [!NOTE]
   > Only one connection is shown at a time. To use a different connection, select the **...** overflow menu on your SQL connection, then find a new one or create a new SQL connection.

1. Select **Create app**.

## Access data

Once your app is connected to SQL Server, you can access data: [Access data in SQL Server](sql-connection-access-data.md).

## View results

To view the results of your SQL queries, see: [View results in SQL Server](sql-connection-view-results.md).

## Power Apps data type mappings

| SQL Server | Power Apps |
| --- | --- |
| `bigint`, `decimal`, `int`, `money`, `numeric`, `smallint`, `smallmoney`, `tinyint`, `float`, `real` | Number |
| `char`, `nchar`, `varchar`, `nvarchar`, `text`, `ntext` | Text |
| `bit` | Boolean |
| `date`, `datetime`, `datetime2`, `smalldatetime`, `datetimeoffset`, `time` | DateTime |
| `uniqueidentifier` | Guid |

> [!NOTE]
> If a SQL Server data type doesn't appear in the previous table, that data type isn't supported.
> Unsupported data types include the following examples: `binary()`, `varbinary()`, `image`, `cursor`,
> `rowversion`, `hierarchyid`, `sql_variant xml`, Spatial Geometry Types, Spatial Geography Types, and table. Also, 'tinyint' and 'smallint' are not supported as primary keys.

## Power Apps functions and operations delegable to SQL Server

Power Apps can delegate Power Fx query operations (for example, Filter) to the back-end data source for processing. Delegation allows the back-end data service (for example, SQL Server) to do the filtering work so that only a few records must be transferred to your device. 

This table shows which operations are delegable to SQL Server by data type. Expressions joined with `And`, `Or`, and `Not` are delegable.


| Operation or function    | Number | Text    | Boolean | DateTime | Guid |
| ------------------------ | ------ | ----    | ------- | -------- | ---- |
| `*, +, -, /`             | Yes    | -       | -       | No       | -    |
| `<`, `<=`, `>`, `>=`     | Yes    | No      | No      | Yes      | -    |
| `=`, `<>`                | Yes    | Yes     | Yes     | Yes      | Yes  |
| `Average`                | Yes    | -       | -       | -        | -    |
| `EndsWith`               | -      | Yes [1] | -       | -        | -    |
| `Filter`                 | Yes    | Yes     | Yes     | Yes [2]  | Yes  |
| `In` (substring)         | -      | Yes [3] | -       | -        | -    |
| `IsBlank` [4]            | No     | No      | No      | No       | No   |
| `Len` (length)           | -      | Yes [5] | -       | -        | -    |
| `Lookup`                 | Yes    | Yes     | Yes     | Yes      | Yes  |
| `Max`                    | Yes    | -       | -       | No       | -    |
| `Min`                    | Yes    | -       | -       | No       | -    |
| `Search`                 | No     | Yes     | No      | No       | -    |
| `Sort`                   | Yes    | Yes     | Yes     | Yes      | -    |
| `SortByColumns`          | Yes    | Yes     | Yes     | Yes      | -    |
| `StartsWith`             | -      | Yes [6] | -       | -        | -    |
| `Sum`                    | Yes    | -       | -       | -        | -    |
| `UpdateIf, RemoveIf` [7] | Yes    | Yes     | Yes     | Yes      | Yes  |

### Notes

1. Supported for `(EndsWith(\<column>, "string value"))` but not for `(EndsWith("string value", \<column>))`. If a char(10) column has a value of "hello", `EndsWith(\<column>, "llo")` returns false, by design. A char(10) column has 10 characters.

2. Direct date filters don't work for SQL Server with an on premise Data Gateway. However, you can create a calculated column that works. For example, you can create: <br>`ALTER TABLE myTable ADD DateAsInt AS (YEAR([date]) * 10000 + MONTH([date]) * 100 + DAY([date]))` <br>And then filter on the calculated number column. 

3. Supported for `("string value" in \<column>)`, but not for `(\<column> in "string value")`.

4. An expression such as `Filter('[dbo].[MyOrders]', !IsBlank(CustomerId))` won't delegate to the server. However, you can use an expression such as `Filter('[dbo].[MyOrders]', CustomerId <> Blank())`, which does delegate to the server and is semantically close. The difference is that the second expression won't treat the empty string ("") as empty. Although the expressions aren't equivalent, the latter might work for your purposes. You can't use this method for the Guid data type. 

5. Power Apps delegates the `Len` function, but the behavior might not work as you expect. In SQL Server, a char(10) column with value "hello" always has a length of 10. However, Power Apps treats that string as having a length of 5, which may cause discrepancies and confusion. Don't use `char`/`nchar` on SQL server, but use `varchar`/`nvarchar` instead.

6. Supported for `(StartsWith(\<column>, "string value"))`, but not for `(StartsWith("string value", \<column>))`

7. UpdateIf and RemoveIf work locally but simulate delegation to a limit of 500/2000 records. They successively bring down records beyond the non-delegation 500/2000 record limit. Records that meet the If condition are collected. Generally, a maximum of 500/2000 records are collected separately and then changed per execution. However, more records may be updated if the existing local data cache is large as the function may have access to more records for evaluation.


## Related information

---

## Use Microsoft SQL Server securely with Power Apps

Source: [sql-server-security.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/sql-server-security)

*Understand how to use SQL Server securely with Power Apps.*

# Use Microsoft SQL Server securely with Power Apps

There are different ways to [connect](../connections-list.md#security-and-types-of-authentication) and authenticate to SQL Server with Power Apps. This article outlines concepts that can be helpful in making a choice about how to
connect to SQL Server with a security approach that matches requirements for your app.

> [!IMPORTANT]
> The [**secure implicit connections**](../connections-list.md#shared-connections-and-secure-implicit-connections) feature was released in January 2024. Microsoft strongly encourages all apps currently using implicit connections to convert to secure implicit connections and to revoke connections shared with end users. 


## Difference between explicit, implicit, and secure implicit connections

A connection to SQL Server is created whenever you create an app using Power Apps connecting to SQL Server. When such apps are published and shared with others, both the app and the connection are deployed to those users. In other words, the app and the connection&mdash;both are visible to users the apps is shared with.

The authentication method used for such connections can be **explicit** or **implicit**. We can also say such connection is shared explicitly or implicitly.

- An **explicitly shared connection** means that the end user of the application must authenticate to SQL Server with their own explicit credentials. Usually this authentication happens behind the scenes as part of Microsoft Entra or Windows authentication handshake. The user doesn’t even notice when the authentication takes place.
- An **implicitly shared connection** means that the user implicitly uses the credentials of the account that the app maker used to connect and authenticate to the data source during while creating the app. The end user’s credentials are **not** used to authenticate. Each time the end user runs the app, they're using the credentials the author created the app with.
- A **secure implicitly shared connection** refers to a scenario where the end user of the app implicitly uses the credentials of the account that the app maker used to connect and authenticate to the data source while creating the app. This means that the end user's own credentials are not used to authenticate. Instead, when the user runs the app, they are using the credentials that the author of the app created it with. It is important to note that the end user is not provided with direct access to the connection, and the app only allows access to a limited set of actions and tables.


The following four connection authentication types can be used with SQL Server for Power Apps:

| Authentication Type                 | Power Apps connection method |
|-------------------------------------|------------------------------|
| Microsoft Entra Integrated                 | Explicit                     |
| SQL Server Authentication | Implicit / Secure Implicit                     |
| Windows Authentication              | Implicit / Secure Implicit                    |
| Windows Authentication (nonshared) | Explicit                     |

## Implicit connection sharing risks

All new applications automatically use the new secure implicit connections. However, with apps that use the older 'implicit connections', both the app and its connections are deployed to end users, it means that **end users can author new applications based on those connections**. 


When an author uses [**secure implicit connections**](../connections-list.md#shared-connections-and-secure-implicit-connections), it means that no connection is shared and no end user receives the connection object. This eliminates the risk of an end-user author reusing a connection to create a new app. Instead, the app works with a proxy connection that is aware of the app and only communicates with that specific app. The proxy connection allows limited actions (create, read, update, delete) and access to specific tables in the app that are defined when the app is published. Therefore, only authorized actions and access are granted to the end user.

The older style simple implicit connection actually distributes a connection object to the end user. For example, if you create an app that filters out the data you don’t want users to see. But, the filtered out data is present in the database. But you're relying on the filter you configured to ensure the end users won’t see certain data.

Again, with older style simple implicit connections, after you deploy the app, end users can use the connection deployed with your app in any new apps they create. In the new apps, users can see the data you filtered out in your application. It's important to use the new secure implicit connections. 

> [!IMPORTANT]
> Once an older implicitly shared connection is deployed to end users, the restrictions you may have put in the app you shared (such as filters or read-only access) are no longer valid for new apps end users create. The end users will have whatever rights the authentication allows as part of implicitly shared connection. Therefore, when you convert an app to use secure implicit connections, you must **also** revoke the connections you shared with your app.  Admins can get a report of apps with implicitly shared connections with the COE toolkit. 


## Client and server security

You can't rely on the security of data through filtering or other client-side operations to be secure. Applications that require secure filtering of data must ensure that both the user identification and filtering happens on the server.

Use services such as Microsoft Entra ID instead of relying on the filters designed within the apps when it comes to user identity and security. This configuration ensures server-side filters work as expected.

The following illustrations explain how the security patterns within the apps differ between client-side and server-side security models.

![Client-side security pattern in an app.](media/sql-server-security/client-security.png "Client-side security pattern in an app")

In a client security app pattern, [1] the user only authenticates to the application on the client side. Then [2] the application requests information of the service, and [3] the service returns the information solely based on the data request.

![Server-side security pattern in an app.](media/sql-server-security/server-security.png "Server-side security pattern in an app")

In a server-side security pattern, [1] the user first authenticates to the service so the user is known to the service. Then, [2] when a call is made from the application, the service [3] uses the known identity of the current user to filter the data appropriately and [4] returns the data.

The implicit departmental sharing scenarios described above is combination of these two patterns. The user must log in to the Power Apps service using Microsoft Entra credentials. This behavior is the server security app pattern. The user is known using the Microsoft Entra identity on the service. Hence, the app is restricted to the set of users to which Power Apps has formally shared the application.

However, the implicit shared connection to SQL Server is the client security app pattern. SQL Server only knows that a specific user name and password is used. Any client-side filtering, for instance, can be bypassed with a new application using the same user name and password.

To securely filter data on the server side, use built-in security features in SQL Server such as [row level
security](/sql/relational-databases/security/row-level-security) for rows, and the
[deny](/sql/t-sql/statements/deny-object-permissions-transact-sql) permissions to specific objects (such as columns) to specific users. This approach uses the Microsoft Entra user identity to filter the data on the server.

Some existing corporate services have used an approach where the user identity is captured in a business data layer much in the same way that Microsoft Dataverse does. In this case, the business layer may or may not use SQL Server’s row level security and deny features directly. If it doesn't, it's often the case that the security is enabled using stored procedures or views.

The business layer (on the server side) uses a known user Microsoft Entra identity to invoke a stored procedure as a SQL Server principal and filter the data. However, Power Apps doesn't currently connect to stored procedures. A business layer may also invoke a view that uses the Microsoft Entra identity as a SQL Server principal. In this case, use Power Apps to connect to the views so that the data is filtered on the server-side. Exposing only views to users may need Power Automate flows for updates.

### See also

[Overview of connectors for canvas apps](../connections-list.md)

---

## Access data in SQL Server

Source: [sql-connection-access-data.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/sql-connection-access-data)

*Learn different methods to access data in SQL Server in Microsoft Power Apps.*

# Access data in SQL Server

## Add a data source

**Direct access**:

If you select the *Start with data* option when you create an app, the **Items** property of your gallery uses a Power Fx formula with a data source name that points directly to your database table.

For example, if you have a `BOOKLENDING` table, you see this formula:

```power-fx
Search([@'[dbo].[BOOKLENDING]'], SearchInput1.Text, author, author,book_name,category)
```

**Views and stored procedures**:

A common professional data access pattern is to use views and then stored procedures for create, update, and delete instead of allowing direct access. If you want to use views or stored procedures, change the example formula. Similarly, the form for the record doesn't use the built-in direct approach of the `SubmitForm()` formula.


**Triggers**:

One database pattern is to use triggers on tables. If a table has a trigger, you can't use the direct pattern `Submit()` for create, update, and delete. `Submit()` conflicts with SQL trigger handling and the built-in Power Apps behavior, which use the same output parameter.

You can directly access the table for queries, but to handle `Create`, `Update`, or `Delete`, call a stored procedure.

> [!NOTE]
> The SQL Server connector, like all connectors that work with relational data, assumes that tables have a primary key. A primary key is critical for finding specific records to update. If a SQL Server table doesn't have a primary key, the data is read-only. If you have access and edit rights to the SQL Server table, consider adding an auto-generated key.
>

## Use a view

A *view* is a saved query that shows as a single table of data.

Views appear in the list of tables you can select when you add a data source. Views only support queries—not updates. To update data, use a [stored procedure](#use-stored-procedures).

If you create a table with the `Start with data` option, you get screens and formulas that show records in a gallery and form. You see formulas and functionality for creating, editing, and deleting records. But if you use a view, you only see a display screen for the gallery and form.

You might want autogenerated screens from `Start with data` for views.

To use this autogenerated option:

1. Choose `Start with data` with a *basic table*.
1. Delete and replace the table data source.

**Example**:

For example, if you have a `BOOKLENDINGVIEW` table and add it as a data source for Power Apps, the formula can be as simple as:

```power-fx
BOOKLENDINGVIEW
```

You can also replace other create, update, and delete formulas with a view data source and calls to stored procedures.  

## Use stored procedures

When you add a SQL Server connection to your app, you can add stored procedures and call them directly in Power Fx.

> [!NOTE]
> This feature also works with secure, implicit connections.

:::image type="content" source="media/connection-azure-sqldatabase/tables-views-stored-proc-selector.png" alt-text="Screenshot that shows lists of tables, views, and stored procedures available to be added to your app.":::

After you select a stored procedure, a child node appears, and you can designate the stored procedure as **Safe to use for galleries and tables**.

A stored procedure is *safe* if it doesn't perform any action that might be unwanted in certain scenarios. For example, if a stored procedure collects all accounts from a given city and then sends them an email, you might not always want emails sent every time the stored procedure is called. In that case, don't mark the stored procedure as safe.

**Check a stored procedure as safe only if**:

1. There are **no side effects** to calling this procedure on demand.

   You can call the procedure multiple times or whenever Power Apps refreshes the control. When you use it with an **Items** property of a gallery or table, Power Apps calls the stored procedure whenever the system determines a refresh is needed. You can't control when the stored procedure is called.

1. The stored procedure returns a modest amount of data.

   Action calls, like stored procedures, don't have a limit on the number of rows retrieved. They aren't automatically paged in 100-record increments like tabular data sources such as tables or views.
  
   If the stored procedure returns too much data (many thousands of records), your app might slow down or crash. For performance reasons, bring in fewer than 2,000 records.

If you check a stored procedure as safe, you can assign it as an **Items** property in galleries or tables in your app.

> [!IMPORTANT]
> The schema of the return values of the stored procedure should be *static*, so the values don't change from call to call. For example, if a stored procedure returns two tables, it *always* returns two tables. You can work with either specific or dynamic results.
>
> The structure of the results also needs to be static. For example, if the schema of the results is *dynamic*, then results are dynamic and you must provide a specific type to use them in Power Apps. For more information, see [dynamic results](sql-connection-view-results.md#dynamic-results).

### SQL namespace prepended to stored procedure name

The SQL Server namespace name, where you store the procedure, is added to the start of the stored procedure name. For example, all stored procedures in the **'DBO'** SQL Server namespace have **'dbo'** at the start of the name.

For example, when you add a stored procedure, you might see more than one data source in your project.

:::image type="content" source="media/connection-azure-sqldatabase/sqlserver-datasources.png" alt-text="Screenshot that shows SQL data sources.":::

### Calling a stored procedure

To use a stored procedure in Power Apps, add the connector name before the stored procedure name, such as `Paruntimedb.dbonewlibrarybook`.

> [!NOTE]
> When Power Apps brings in the stored procedure, it combines the namespace and procedure name so that `dbo.newlibrarybook` becomes `dbonewlibrarybook`.

Arguments are passed as a Power Apps record with named value pairs:

```power-fx
<datasourceName>.<StoredprocedureName>({<paramName1: value, paramName2: value, ... >})
```

> [!TIP]
> Convert values if needed as you pass them into your stored procedure, since you're reading from a text value in Power Apps. For example, if you're updating an integer in SQL, convert the text in the field using `Value()`.

Here's an example of what stored procedures could look like when assigning them to an `OnSelect` property.

:::image type="content" source="media/sql-connection/stored-procedures.png" alt-text="Screenshot that shows how to call stored procedures directly using key/value pairs and dot notation.":::

### Variables and all stored procedures

Access a stored procedure for the **Items** property of a gallery after you declare it safe for the UI. Reference the data source name and the name of the stored procedure followed by `ResultSets`. Access multiple results by referencing the set of tables returned, such as Table 1, Table 2, and so on.

For example, a stored procedure from the table `Paruntimedb` with the name `dbo.spo_show_all_library_books()` looks like this:

```power-fx
Paruntimedb.dbospshowalllibrarybooks().ResultSets.Table1
```

This query populates the gallery with records. However, stored procedures are *action* behaviors on the tabular model. `Refresh()` only works with tabular data sources and doesn't work with stored procedures. Refresh the gallery when a record is created, updated, or deleted.

> [!NOTE]
> When you use a `Submit()` on a form for a tabular data source, it effectively calls `Refresh()` under the hood and updates the gallery.

### Use a variable to populate and refresh the gallery

Use a variable in the `OnVisible` property for the screen, and set the stored procedure to the variable.

```power-fx
Set(SP_Books, Paruntimedb.dbospshowalllibrarybooks().ResultSets.Table1);
```

You can then set the `Items` property of the gallery to the variable name.

```power-fx
SP_Books
```

After you create, update, or delete a record with a call to the stored procedure, set the variable again to refresh the gallery.

```power-fx
Paruntimedb.dbonewlibrarybook({   
  book_name: DataCardValue3_2.Text, 
  author: DataCardValue1_2.Text,
    ...
});
Set(SP_Books, Paruntimedb.dbospshowalllibrarybooks().ResultSets.Table1);
```

### Use Power Automate to call stored procedures

Power Automate handles asynchronous actions best. Call stored procedures as part of a series of calls in a business process.

To call Power Automate and then call stored procedures, create input variables as part of your flow.

:::image type="content" source="media/connection-azure-sqldatabase/pa-input.png" alt-text="Screenshot that shows the Power Automate input.":::

Then pass your input variables into the call of your stored procedure.

:::image type="content" source="media/connection-azure-sqldatabase/pa-execute-procedure.png" alt-text="Execute stored procedure":::

Add this Power Automate flow to your app and call it. Pass optional arguments as a record “{ … }”. The following example includes all optional arguments.

:::image type="content" source="media/connection-azure-sqldatabase/pa-example.png" alt-text="Power Automate flow":::

---

## View results in SQL Server

Source: [sql-connection-view-results.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/sql-connection-view-results)

*Learn more about how to view the results of stored procedures from SQL Server in Microsoft Power Apps.*

# View results in SQL Server

If you use a direct table access pattern or a view, the query result binds to the control or table. Power Fx automatically lets your app page data into the gallery or table. However, stored procedures can return a query result, a return code, or values from `Out` parameters.

To use these different result types in your app, follow these patterns.

## Formulas for different controls

Here are typical formulas for views and stored procedures:

| Control | Property |  Formula| Description |
| ------- | -------- | ------- | ----------- |
| Gallery or Table | Items | `DataSource` | You can further refine the table or view data source with a [Filter](/power-platform/power-fx/reference/function-filter-lookup) and a [StartsWith](/power-platform/power-fx/reference/function-startswith). The other generated query clauses are appended to the existing query. |
| Form | DataSource | `DataSource` | The table or view data source. |
| Submit button on a form | [OnSelect](/power-apps/maker/canvas-apps/controls/properties-core) | `DataSource.dboSPName({ args}); Refresh (‘DataSource’)` | The first `DataSource` in this formula is the stored procedure data source, which holds your stored procedure. The `DataSource` in the refresh formula is the view data source. |
| Delete button on a form | [OnSelect](/power-apps/maker/canvas-apps/controls/properties-core) | `SP DataSource.dboSPName({ args}); Refresh (‘View DataSource’)` | The first `DataSource` in this formula is the stored procedure data source, which holds your stored procedure. The `DataSource` in the refresh formula is the view data source. |

## Return code

Use this return code to get the result of a return statement.

```power-fx
<datasourceName>.<StoredprocedureName>({<paramName1: value, paramName2: value, ... >}).ReturnCode
```

## Output parameters

Use the parameter name as it appears in the JSON payload.

```power-fx
<datasourceName>.<StoredprocedureName>({<paramName1: value, paramName2: value, ... >}).OutputParameters.<parameterName>
```

## Result Sets

You can use other tables by their name, like `Table1`, `Table2`, or `Table3`.

```power-fx
<datasourceName>.<StoredprocedureName>({<paramName1: value, paramName2: value, ... >}).ResultSets.Table1
```

## Dynamic results

Some complicated stored procedures return dynamic results. This result is common for stored procedures that use temporary tables. Power Apps can't easily determine the results ahead of time. So, the return is marked as *dynamic* and you can't access these results directly. First, provide a type.

You can access the data with the following data access example pattern.

### Data access example

1. Pull the results into a variable named `MyDynamicValue`.
1. Pull `Table1` from that variable and put it into a variable named `table1`.

   > [!TIP]
   > This step isn't strictly necessary. It's useful, though, to put all the results in a variable and then pull out the parts you need later.

1. Iterate through `table1` and extract the JSON elements as named value pairs.
1. Match the names with those returned in the JSON payload.
1. To validate, open Power Apps monitor and look at the body section of the data node for a record.

```power-fx
Set(
    <MyDynamicValue>, // pull results into variable
    <datasourceName>.<StoredprocedureName>( 
      { <paramName1>: "someString" }
    ).ResultSets
);
Set(
    table1, // put Table1 into table1
    <MyDynamicValue>.Table1
);
Set(
    TypedTable,
    ForAll(
        table1, // extract JSON from table1
        {
            BookID: Value(ThisRecord.BookID),
            BookName: Text(ThisRecord.BookName)
        }
    )
);

```

---

## Connect to Twitter from Power Apps

Source: [connection-twitter.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/connections/connection-twitter)

*See how to connect to Twitter, step through some examples, and see all the functions.*

# Connect to Twitter from Power Apps

![Twitter.](./media/connection-twitter/twittericon.png)

Twitter lets you post tweets and get tweets, timeline, friends, and followers from your Twitter account.

You can display this information in a label on your app. For example, you can add an input text box, ask the user to enter in some Tweet text, and then add a button that "posts" the tweet. You can use similar methods to get a tweet or search for a tweet, and then display the text in a label or gallery control in your app.

This topic shows you how to create the Twitter connection, use the Twitter connection in an app, and lists the available functions.

## Prerequisites
* Access to [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc)
* Add the [connection](../maker/canvas-apps/add-manage-connections.md)
* Create an app from a [template](../maker/canvas-apps/get-started-test-drive.md), from [data](../maker/canvas-apps/get-started-create-from-data.md), or from [scratch](../maker/canvas-apps/get-started-create-from-blank.md)

## Connect to Twitter

1. Start by creating a [blank canvas app](../create-blank-app.md).

1. In the left-hand pane, select **Data** > **Add data**.

1. Select **New connection**, and then select **Twitter**:  

    :::image type="content" source="media/connection-twitter/addconnection.png" alt-text="Add connection.":::

1. Select from the default shared application, or choose to bring your own application (along with Consumer Key/Consumer Secret).

1. Select **Connect**.

1. Choose , enter your Twitter sign in credentials, and then select **Authorize app**.

1. Select **Add Data Source**. Your connection appears under **Data sources**:  
    ![Close the Options pane.](./media/connection-twitter/twitterdatasource.png)

The Twitter connection has been created, and added to your app. Now, it's ready to be used.

## Use the Twitter connection in your app
### Show a timeline
1. On the **Insert** menu, select **Gallery**, and add any of the **With text** galleries.
2. Let's show some timelines:  

   * To show the current user's timeline, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formulas:

       `Twitter.HomeTimeline().TweetText`  
       `Twitter.HomeTimeline({maxResults:3}).TweetText`  
   * To show another user's timeline, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formula:  

       `Twitter.UserTimeline( *TwitterHandle* ).TweetText`

       Enter a Twitter handle in double quotation marks or an equivalent value. For example, enter `"satyanadella"` or `"powerapps"` directly in the formula expression.
   * Add a text input control named **Tweep**, and set its Default property to `Tweep.Text`. In the Tweep text box, type in a Twitter handle such as `satyanadella` (without quotation marks and without the @ symbol).

       In the gallery control, set the Items property to the following formula:  

       `Twitter.UserTimeline(Tweep.Text, {maxResults:5}).TweetText`

       The gallery control automatically shows the tweets of the Twitter handler you type in.

     > [!TIP]
     > Some of these formulas use the **maxResults** argument to show the *x* number of most recent tweets in a timeline.
3. Set the gallery's **Items** property to `Twitter.HomeTimeline()`.

    With the gallery selected, the right-hand pane shows options for that gallery.
4. Select **TweetText** in the first list, select **TweetedBy** in the second list, and select **CreatedAt** in the third list.

    The gallery now shows the values of the properties you chose.

### Show followers
1. Using a **With text** gallery, let's show some followers:  

   * To show the current user's followers, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formula:  

       `Twitter.MyFollowers()`  
       `Twitter.MyFollowers({maxResults:3})`
   * To show another user's followers, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formula:  

       `Twitter.Followers( *TwitterHandle* )`

       Enter a Twitter handle in double quotation marks or an equivalent value. For example, enter `"satyanadella"` or `"powerapps"` directly in the formula expression.
   * Add a text input control named **Tweep**, and set its Default property to `Tweep.Text`. In the Tweep text box, type in a Twitter handle such as `satyanadella` (without quotation marks and without the @ symbol).

       In the gallery control, set the Items property to the following formula:  

       `Twitter.Followers(Tweep.Text, {maxResults:5})`

       The gallery control automatically shows who is following the Twitter handle you type in.

     > [!TIP]
     > Some of these formulas use the **maxResults** argument to show the *x* number of most recent tweets in a timeline.
2. Set the gallery's **Items** property to `Twitter.MyFollowers()`.

    With the gallery selected, the right-hand pane shows options for that gallery.
3. Select **UserName** in the second list, and select **FullName** in the third list.

    The gallery now shows the values of the properties you chose.

### Show followed users
1. Using a **With text** gallery, let's show some followed users:  

   * To show which users the current user is following, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formula:  

       `Twitter.MyFollowing()`  
       `Twitter.MyFollowing({maxResults:3})`
   * To show which users another user is following, set the **[Items](../controls/properties-core.md)** property of the gallery to the following formula:

       `Twitter.Following( *TwitterHandle* )`

       Enter a Twitter handle in double quotation marks or an equivalent value. For example, enter `"satyanadella"` or `"powerapps"` directly in the formula expression.
   * Add a text input control named **Tweep**, and set its Default property to `Tweep.Text`. In the Tweep text box, type in a Twitter handle such as `satyanadella` (without quotation marks and without the @ symbol).

       In the gallery control, set the Items property to the following formula:  

       `Twitter.Following(Tweep.Text, {maxResults:5})`

       The gallery control automatically shows the other handles you are following.

     With the gallery selected, the right-hand pane shows options for that gallery.
2. Select **Description** in the **Body1** list, **UserName** in the **Heading1** list, and **FullName** in the **Subtitle1** list.

    The gallery now shows the values of the properties you chose.

### Show information about a user
Add a label, and then set its **[Text](../controls/properties-core.md)** property to one of these formulas:  

* `twitter.User( *TwitterHandle* ).Description`
* `twitter.User( *TwitterHandle* ).FullName`
* `twitter.User( *TwitterHandle* ).Location`
* `twitter.User( *TwitterHandle* ).UserName`
* `twitter.User( *TwitterHandle* ).FollowersCount`
* `twitter.User( *TwitterHandle* ).FriendsCount`
* `twitter.User( *TwitterHandle* ).Id`
* `twitter.User( *TwitterHandle* ).StatusesCount`

Enter a Twitter handle in double quotation marks or an equivalent value. For example, enter `"satyanadella"` or `"powerapps"` directly in the formula expression.

Or, you can use an input text control to type in a Twitter handle, just as we have throughout this topic.

### Search tweets
1. Using a **With text** gallery, set its **[Items](../controls/properties-core.md)** property to the following formula:  

    `Twitter.SearchTweet( *SearchTerm* ).TweetText`

    Enter a *SearchTerm* in double quotation marks or by referring to an equivalent value. For example, enter `"PowerApps"` or `"microsoft"` directly in the formula.

    Or, you can use an **Input text** control to specify a search term, just as we have throughout this topic.

    > [!TIP]
   > Show the first five results by using maxResults:  

    `Twitter.SearchTweet(SearchTerm.Text, {maxResults:5}).TweetText`
2. Set the gallery's **Items** property to `Twitter.SearchTweet(SearchTerm.Text, {maxResults:5})`.

    With the gallery selected, the right-hand pane shows options for that gallery.
3. Select **TweetText** in the first list, **TweetedBy** in the second list, and **CreatedAt** in the third list.

    The gallery now shows the values of the properties you chose.

### Send a tweet
1. Add a text input control, and then rename it **MyTweet**.
2. Add a button, and then set its **[OnSelect](../controls/properties-core.md)** property to the following formula:  
    `Twitter.Tweet("",{tweetText: MyTweet.Text})`
    <br> Example: `Twitter.Tweet("",{tweetText:"Sample tweet!"})`
3. Press F5, or select the Preview button (![Preview button.](./media/connection-twitter/preview.png)). Type some text into **MyTweet**, and then select the button to tweet the text that you entered.
4. Press Esc to return to the default workspace.

## View the available functions
This connection includes the following functions:

| Function Name | Description |
| --- | --- |
| [UserTimeline](connection-twitter.md#usertimeline) |Retrieves a collection of the most recent tweets posted by the specified user |
| [HomeTimeline](connection-twitter.md#hometimeline) |Retrieves the most recent tweets and re-tweets posted me and my followers |
| [SearchTweet](connection-twitter.md#searchtweet) |Retrieves a collection of relevant tweets matching a specified query |
| [Followers](connection-twitter.md#followers) |Retrieves users following the specified user |
| [MyFollowers](connection-twitter.md#myfollowers) |Retrieves users who are following me |
| [Following](connection-twitter.md#following) |Retrieves users who the specified user is following |
| [MyFollowing](connection-twitter.md#myfollowing) |Retrieves users that I am following |
| [User](connection-twitter.md#user) |Retrieves details about the specified user (example: user name, description, followers count, etc.) |
| [Tweet](connection-twitter.md#tweet) |Tweet |
| [OnNewTweet](connection-twitter.md#onnewtweet) |Triggers a workflow when a new tweet is posted which matches your search query |

### UserTimeline
Get user timeline: Retrieves a collection of the most recent tweets posted by the specified user

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| userName |string |yes |Twitter handle |
| maxResults |integer |no |Maximum number of tweets to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| TweetText |string |Yes | |
| TweetId |string |No | |
| CreatedAt |string |No | |
| RetweetCount |integer |Yes | |
| TweetedBy |string |Yes | |
| MediaUrls |array |No | |

### HomeTimeline
Get home timeline: Retrieves the most recent tweets and re-tweets posted me and my followers

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| maxResults |integer |no |Maximum number of tweets to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| TweetText |string |Yes | |
| TweetId |string |No | |
| CreatedAt |string |No | |
| RetweetCount |integer |Yes | |
| TweetedBy |string |Yes | |
| MediaUrls |array |No | |

### SearchTweet
Search tweet: Retrieves a collection of relevant tweets matching a specified query

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| searchQuery |string |yes |Query text (you may use any Twitter supported query operators: https://www.twitter.com/search) |
| maxResults |integer |no |Maximum number of tweets to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| TweetText |string |Yes | |
| TweetId |string |No | |
| CreatedAt |string |No | |
| RetweetCount |integer |Yes | |
| TweetedBy |string |Yes | |
| MediaUrls |array |No | |

### Followers
Get followers: Retrieves users following the specified user

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| userName |string |yes |Twitter handle of the user |
| maxResults |integer |no |Maximum number of users to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| FullName |string |Yes | |
| Location |string |Yes | |
| Id |integer |No | |
| UserName |string |Yes | |
| FollowersCount |integer |No | |
| Description |string |Yes | |
| StatusesCount |integer |No | |
| FriendsCount |integer |No | |

### MyFollowers
Get my followers: Retrieves users who are following me

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| maxResults |integer |no |Maximum number of users to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| FullName |string |Yes | |
| Location |string |Yes | |
| Id |integer |No | |
| UserName |string |Yes | |
| FollowersCount |integer |No | |
| Description |string |Yes | |
| StatusesCount |integer |No | |
| FriendsCount |integer |No | |

### Following
Get following: Retrieves users who the specified user is following

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| userName |string |yes |Twitter handle of the user |
| maxResults |integer |no |Maximum number of users to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| FullName |string |Yes | |
| Location |string |Yes | |
| Id |integer |No | |
| UserName |string |Yes | |
| FollowersCount |integer |No | |
| Description |string |Yes | |
| StatusesCount |integer |No | |
| FriendsCount |integer |No | |

### MyFollowing
Get my following: Retrieves users that I am following

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| maxResults |integer |no |Maximum number of users to retrieve, e.g. {maxResults:5} |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| FullName |string |Yes | |
| Location |string |Yes | |
| Id |integer |No | |
| UserName |string |Yes | |
| FollowersCount |integer |No | |
| Description |string |Yes | |
| StatusesCount |integer |No | |
| FriendsCount |integer |No | |

### User
Get user: Retrieves details about the specified user (example: user name, description, followers count, etc.)

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| userName |string |yes |Twitter handle of the user |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| FullName |string |Yes | |
| Location |string |Yes | |
| Id |integer |No | |
| UserName |string |Yes | |
| FollowersCount |integer |No | |
| Description |string |Yes | |
| StatusesCount |integer |No | |
| FriendsCount |integer |No | |

### Tweet
Post a new tweet: Tweet

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| tweetText |string |no |Text to be posted e.g. {tweetText:"hello"} |
| body |string |no |Media to be posted |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| TweetId |string |Yes | |

### OnNewTweet
When a new tweet appears: Triggers a workflow when a new tweet is posted which matches your search query

#### Input properties

| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| searchQuery |string |yes |Query text (you may use any Twitter supported query operators: https://www.twitter.com/search) |

#### Output properties

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| value |array |No | |

## Helpful links
See all the [available connections](../connections-list.md).  
Learn how to [add connections](../add-manage-connections.md) to your apps.

---

## Add data connections to canvas apps

Source: [add-data-connection.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-data-connection)

*Learn how to add a data connection to an existing canvas app or to an app that you're building from scratch.*

# Add data connections to canvas apps

In Power Apps, add a data connection to an existing canvas app or to an app that you're building from scratch. Your app can connect to SharePoint, Microsoft Dataverse, Salesforce, OneDrive, or [many other data sources](connections-list.md).

After you add a connection, your next step is to display and manage data from that data source in your app, as in these examples:

- Connect to OneDrive, and manage data in an Excel workbook in your app.
- Connect to Twilio, and send an SMS message from your app.
- Connect to Microsoft Dataverse, and update a table from your app.
- Connect to SQL Server, and update a table from your app.

## Prerequisites

[Sign up](../signup-for-powerapps.md) for Power Apps, and then [sign in](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) by providing the same credentials that you used to sign up.

## Add a data source

1. Create a [blank canvas app](create-blank-app.md) or open an existing canvas app for editing.
1. In Power Apps Studio, select **Data** from the [app authoring menu](power-apps-studio.md#5--app-authoring-menu) on the left pane.
1. Select **Add data** at the top of the **Data** pane.
1. In the search box, type the name of the connector or data source you want for example, **SharePoint** or **Dataverse**.
1. Select the connector from the results list.
   - If you already have a configured connection for that connector, select it to add it to your app.
   - If no existing connection appears, select **Add a connection** to create a new one.

> [!NOTE]
> When you connect to **Microsoft Dataverse**, you can select the environment from the drop-down list before choosing a table. By default, the connection uses your current working environment.

Some connectors, such as **Office 365 Outlook**, require no additional steps and you can show data from them immediately. Other connectors, such as [SharePoint](connections/connection-sharepoint-online.md) and [SQL Server](connections/sql-connection-overview.md), prompt you for additional information&mdash;like a site URL or server name&mdash;before the connection is complete.

> [!TIP]
> Not sure which connector to use? Browse the full list at [Connectors overview](connections-list.md). You can also describe your scenario to [Copilot in Power Apps](ai-overview.md) and it can suggest an appropriate data source.

## Identify or change a data source

If you're updating an app, you might need to identify or change the source of data that appears in a gallery, a form, or another control. For example, you might need to locate a data source in an app that someone else created or that you built long ago.

1. Select the control, such as a gallery or form that you want to identify or change the data source.
1. On the **Properties** tab of the right-hand pane, find the **Data source** or **Items** property. The name of the current data source appears there.
1. To change the data source, select the drop-down next to the data source name, or edit the **Items** property directly in the formula bar.
1. Select or create a different data source as needed.

> [!NOTE]
> If the expected data source is missing from the **Data** pane, the connection might have expired or been revoked. Select **Add data** again, search for the connector, and re-authenticate to restore it.

## Troubleshooting tips

- **Connection not appearing**: Refresh the **Data** pane by closing and reopening it, or sign out and sign back in to Power Apps to refresh your available connections.
- **Authentication errors**: Some connectors for example, SQL Server require credentials or an on-premises data gateway. Confirm that your gateway is running and your credentials are valid.
- **Dataverse table not found**: Confirm that you're connected to the correct environment. You can switch environments from the Power Apps home page before opening the app.

## Next steps

- To show and update data from a source such as SharePoint, Dataverse, or SQL Server, [add a gallery](add-gallery.md) and [add a form](add-form.md).
- For connector-specific functions such as sending email or translating text, review the [Connectors overview](connections-list.md).
- To learn about working with data sources in formulas, see [Working with data sources](working-with-data-sources.md).

---

## Manage connections in canvas apps

Source: [add-manage-connections.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-manage-connections)

*Add, delete, and update connections from canvas apps to data sources such as SharePoint, SQL Server, and OneDrive for Business.*

# Manage connections in canvas apps

In [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), create a connection to one or more data sources, delete a connection, or update its credentials.

Your canvas app's data connection can connect to SharePoint, SQL Server, Office 365, OneDrive for Business, Salesforce, Excel, and many other [data sources](connections-list.md).

Your next step after this article is to display and manage data from the data source in your app, as in these examples:

* Connect to OneDrive for Business, and manage data in an Excel workbook in your app.
* Update a list on a SharePoint site.
* Connect to SQL Server, and update a table from your app.
* Send email in Office 365.
* Send a tweet.
* Connect to Twilio, and send an SMS message from your app.

## Prerequisites

1. [Sign up](../signup-for-powerapps.md) for Power Apps.
2. Sign in to [make.powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) using the same credentials that you used to sign up.

## Background on data connections

Most canvas apps use external information called **Data Sources** that is stored in cloud services. A common example is a table in an Excel file stored in OneDrive for Business. Apps are able to access these data sources by using **Connections**.

The most common type of data source is the table, which you can use to retrieve and store information. You can use connections to data sources to read and write data in Microsoft Excel workbooks, Microsoft Lists, SQL tables, and many other formats, which can be stored in cloud services like OneDrive for Business, DropBox, and SQL Server.

There are other kinds of data sources that aren't tables, such as email, calendars, twitter, and notifications.

Using the **[Gallery](controls/control-gallery.md)**, **[Display form](controls/control-form-detail.md)**, and **[Edit form](controls/control-form-detail.md)** controls, it's easy to create an app that reads and writes data from a data source. To get started, read the article [Understand data forms](working-with-forms.md).

In addition to creating and managing connections in [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), you also create connections when you do these tasks:

* Automatically generate an [app from data](app-from-sharepoint.md), such as a list created using Microsoft Lists.
* Update an existing app, or create one from scratch as [add a connection](add-data-connection.md) describes.
* Open an app that another user created and [shared with you](share-app.md).

### How data connections are used when running the app

When a canvas app runs, Power Apps attempts to locate and reuse an existing connection. If no suitable connection is found, a new one is created for the user based on the connection information stored in the app. This newly created connection may differ from the one originally used during app authoring. This behavior may differ from how other products in the Power Platform handle connections.

> [!NOTE]
> If you want to use Power Apps Studio instead, open the **File** menu, and then click or tap **Connections**, [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc) opens so that you can create and manage connections there.

## Create a new connection

1. If you haven't already done so, log in to [make.powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
2. In the left navigation, expand **Data** and select **Connections**.
   
    ![Connections Manage.](./media/add-manage-connections/open-connections.png)
3. Select **New connection**.
   
    ![New connection.](./media/add-manage-connections/add-connection.png)
4. Select a connector in the list that appears, and then follow the prompts.
   
   ![Select a connector.](./media/add-manage-connections/choose-connection.png)
5. Select the **Create** button.
   
   ![Select Create.](./media/add-manage-connections/create-connection.png)
6. Follow the prompts. Some connectors prompt you to provide credentials, specify a particular set of data, or perform other steps. Others such as **Microsoft Translator**, don't.
   
   For example, these connectors require additional information before you can use them.
   
   * [SharePoint](connections/connection-sharepoint-online.md)
   * [SQL Server](connections/sql-connection-overview.md)

The new connector appears under **Connections**, and you can [add it to an app](add-data-connection.md).

## Update or delete a connection

In the list of connections, find the connection that you want to update or delete, and then select the ellipsis (...) on the right of the connection.

![Update connection.](./media/add-manage-connections/auth-or-delete.png)

* To update the credentials for a connection, select the key icon, and then provide credentials for that connection.
* To delete the connection, select delete.
* Select the information icon to see the connection details.

## Consent dialog fine-grained permissions

The consent dialog presents **fine-grained** permissions to end users. Instead of asking the user to give permissions to all actions a connector can perform, the consent dialog lists the specific permissions that the app uses. The operations that an app uses are captured and stored in the app metadata when app is saved. For example, if an app is published with the specific Read action, then it will initially just request permission for the Read action. If then the author subsequently adds **Create**, **Update**, and **Delete** record actions then the consent dialog will be presented to the user again for the aggregated permissions of **Read**, **Create**, **Update**, and **Delete**. If the author subsequently removes the **Delete** records action, then the consent dialog isn't presented again. The permissions continue with the maximum set of actions that have ever been used in the app at any point. If you wish to publish an app that only shows reduced permissions, the app must be republished under a different name. 

The exception to this rule is for actions used in a Power Automate Flow that is embedded in a Power App. In this case **all** the actions are always shown for the actions used by a Power Automate flow.

## Manage the consent dialog appearance for custom connectors using Microsoft Entra ID OAuth

By default, when end-users launch canvas apps they’re presented a connection consent dialog before they’re able to access the app experience for the first time. It’s possible for admins to suppress this consent dialog for select connectors: 
* Microsoft First Party connectors (like SharePoint, Office 365 Users) and 
* Custom connectors using either Microsoft Entra ID OAuth or NoAuth (No Authentication)

### Suppress consent dialog for apps that use custom connectors using Microsoft Entra ID OAuth

To suppress consent dialog for apps created using Power Apps that connect through custom connectors using Microsoft Entra ID OAuth/NoAuth, follow the below steps.

#### Step 1. Provision Microsoft’s Azure API connections service principal in your Microsoft Entra tenant

Microsoft’s Azure API connectors service is used by all Power Apps using connectors. Provisioning this service in your tenant is a prerequisite for your custom applications, and custom connectors to pre-authorize this service to exercise single-sign-on capabilities with your custom applications and allow Power Apps to suppress the consent dialog.

A tenant admin must run the following PowerShell commands:

```Powershell
 Connect-MgGraph -Scope Application.ReadWrite.All -TenantId <target tenant id>
 New-MgServicePrincipal -AppId "fe053c5f-3692-4f14-aef2-ee34fc081cae" -DisplayName "Azure API Connections"
```

Example successful output:

![Add Azure API connections SPN to tenant](./media/add-manage-connections/custom_connector_oauth_add_SPN.png)

#### Step 2. Pre-authorize Microsoft’s Azure API connections service principal in your Microsoft Entra app
  
For each custom connector where consent is expected to be suppressed, authorize "Microsoft’s Azure API Connections" service principal to one of the scopes defined in your app.

The owner of the Microsoft Entra custom application used by a custom connector must add the app ID “fe053c5f-3692-4f14-aef2-ee34fc081cae” to one of the application scopes. Any scope can be created and used for single-sign-on to succeed.

To set the scope using Azure portal, go to [Azure portal](https://portal.azure.com) > Microsoft Entra ID > App Registrations > Select the relevant app > Expose an API > Add a client application > Add the app ID “fe053c5f-3692-4f14-aef2-ee34fc081cae” to one of the application scopes.

![Preauthorize Azure API connections to custom API 1](./media/add-manage-connections/custom_connector_oauth_preauthorize_1.png)
  
![Preauthorize Azure API connections to custom API 2](./media/add-manage-connections/custom_connector_oauth_preauthorize_2.png)
  
#### Step 3. Grant admin consent the client third-party Microsoft Entra app
  
For each custom connector using OAuth/NoAuth where consent is expected to be suppressed, an admin must use [Microsoft Entra’s grant tenant-wide admin consent to an application](/azure/active-directory/manage-apps/grant-admin-consent).

> [!NOTE]
> Admins have granular control on which custom applications, and the corresponding custom connector consent may be suppressed.  

#### Step 4. Update custom connector in Power Platform to attempt single-sign-on
  
For each custom connector using OAuth/NoAuth where consent is expected to be suppressed, a user with edit permissions on the custom connector must change the "Enable on-behalf-of login" value to "true".
  
The owner of the custom connector must choose to edit the connector, go to the **Security** section, and change the value in **Enable on-behalf-of login** from "false" to "true".

![Configure custom connector for single sign on](./media/add-manage-connections/custom_connector_oauth_enable_sso.png)
  
#### Step 5. Admin configures consent bypass for the app

In addition to the admin consent granted on a custom application in Microsoft Entra ID, which is used by a custom connector, an admin must also configure an app to bypass consent. For each app where consent is expected to be bypassed an admin must run the following command:

 ```Powershell
  Set-AdminPowerAppApisToBypassConsent -AppName <Power Apps app id>
```

### Remove consent suppression for apps that use custom connectors using Microsoft Entra ID OAuth/NoAuth

To remove consent suppression for a custom connector, an admin must perform at least one of the following actions:

1. Remove the tenant-wide admin consent grant to the application in Azure: [Microsoft Entra’s grant tenant-wide admin consent to an application](/azure/active-directory/manage-apps/grant-admin-consent).
1. Use the following Power Apps admin cmdlet to disable Power Apps’ attempt to suppress the consent dialog. [Clear-AdminPowerAppApisToBypassConsent](/powershell/module/microsoft.powerapps.administration.powershell/clear-adminpowerappapistobypassconsent)

---

## Rename Power Apps action-based data sources

Source: [rename-data-source.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/rename-data-source)

*Learn about how to rename Power Apps action-based data sources.*

# Rename Power Apps action-based data sources

A change in the display name of a connector in Power Apps may cause errors in formulas used by the app. This problem takes extra efforts to
update existing formulas with manual intervention, and name changes.

With the ability to rename action-based data sources, you can save the extra efforts
required to fix the formulas affected by the connector name change.

## Action-based and tabular data sources

Before you start using this feature, it’s important to understand the difference
between action-based and tabular data sources.

Action-based data sources use the data source, or the service name in the formula. Tabular data sources use the name of the table instead.

For example, [Azure DevOps](/connectors/visualstudioteamservices) is action-based connector, while [Excel](/connectors/excel) is tabular data source.

For example, when you reference an Azure DevOps instance, the formula uses
Azure DevOps as the data source name

![Example of AzureDevOps data source.](media/rename-data-source/azuredevops.png "Example of AzureDevOps data source")

When using Excel, the data source name in formula uses the table name (instead of the connector, or the service name):

![Example of Excel data source.](media/rename-data-source/excel.png "Example of Excel data source")

## How are data source names generated?

Data source names are generated from the display name of the connection they're
based on. The first instance of a data source name in an app is typically the
exact name of the connection. For instance, if you use “AzureDevOps” data
source, the name of the connection will be “AzureDevOps”. And, if you add
another “AzureDevOps” data source to the same application, the second data
source will be named “AzureDevOps_1”.

## Renamed connectors

Occasionally, a connector goes through a change in the display name. For example, from “OldConnector” to “NewConnector”.

Existing apps will continue to work even though your data source names say “OldConnector”. This behavior is because your data sources still point (under the covers) to the correct connector type.

However, if you drop your existing data source in the app, and add it again, the
new data source will be named “NewConnector”. Your formulas will still reference
“OldConnector” though, causing formula errors wherever this data source name exists.

## Fixing broken formula references to data source names

Using the new “Rename” feature, you can rename your action-based connectors and
fix up your formulas automatically.

![Rename option for data source.](media/rename-data-source/rename-data-source.png "Rename option for data source")

To fix this kind of problem, rename the data source from the new display name
back to the old display name.

For example, rename the data source display name from “New Connector” back to
“Old Connector”. Once you rename, all your formula references will reconnect and
work as before. Your application will now work correctly. You can save the app
changes and publish the new version.

### Optional – use new data source name (Recommended)

After your data source name and formulas are in sync, you can also rename your
data source again to bring it in line with the new connector name.

For example, you can rename your data source to be “NewConnector”. This rename
updates all formula references to use the new name. We recommended this approach because if you ever have to drop your data source again, then readding the data
source will be based on the newer connector display name. This step will help
you avoid future issues.

This approach works because the data source display name, and the formula
referenced data sources are in sync. In other words, exactly same display name.
Renaming data sources in the formulas can’t happen before you rename
your data source back because the data source display name, and the formula
referenced data sources aren’t the same.

## Limitations

This rename capability is limited to action-based connectors. It doesn’t work
for tabular data sources. Tabular data sources use the name of the tables
they’re pointing to (as opposed to the general name of the service hosting them).

### See also

- [Overview of connectors for canvas apps](connections-list.md)
- [List of all Power Apps connectors](/connectors/connector-reference/connector-reference-powerapps-connectors)

---

## Understand delegation in a canvas app

Source: [delegation-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview)

*Learn about how to use delegation to process large data sets efficiently in a canvas app.*

# Query limitations: Delegation and query limits

Power Apps works best with a back-end data source when a Power Fx query fully translates into an equivalent query that runs on the data source. Power Apps sends a query the data source understands, the data source runs the query, and Power Apps gets the results. For example, the data source filters the data and only returns the rows that meet the filter criteria. When this process happens, Power Apps **delegates** the query to the data source.

But Power Fx queries can't always translate into equivalent queries on every data source. For example, Dataverse supports more query features than Excel. Dataverse supports the 'in' (membership) query operator, but Excel doesn't. A query is **nondelegable** if it uses a feature the data source doesn't support. If any part of a query expression is nondelegable, Power Apps doesn't delegate any part of the query.

When a query is nondelegable, Power Apps gets the first 500 records from the data source and then runs the actions in the query. You can increase this limit to 2,000 records. [Changing the limit](#changing-the-limit) **Power Apps limits the result size to 500 records to keep your app performing well.** Larger result sets can cause performance problems for your app and Power Apps.

But this limitation can be a problem because the query might return incorrect results if the data source has more than 500 or 2,000 records. For example, if your data source has 10 million records and your query needs to work on the last part of the data, like family names that start with 'Z', and your query uses a nondelegable operator like distinct, you only get the first 500 or 2,000 records. So, you get incorrect results.

**Create your Power Fx queries by using the delegable tables for your data source.** Only use query functions that can be delegated. It's the only way to keep your app performing well and to make sure users get all the information they need.

Pay attention to delegation warnings that show where delegation isn't possible. If you work with small data sets (fewer than 500 records), you can use any data source and formula because the app processes data locally if the formula isn't delegated.

> [!NOTE]
> Delegation warnings help you manage your app so it returns correct results. If the data in your data source exceeds 500 records and a function isn't delegated, Power Fx marks the formula with a blue underline. 

## Delegable data sources
Delegation works only with certain tabular data sources. If a data source supports delegation, its [connector documentation](/connectors/) explains that support. These popular tabular data sources support delegation:

- [Power Apps delegable functions and operations for Microsoft Dataverse](connections/connection-common-data-service.md#power-apps-delegable-functions-and-operations-for-dataverse)
- [Power Apps delegable functions and operations for SharePoint](connections/connection-sharepoint-online.md#power-apps-delegable-functions-and-operations-for-sharepoint)
- [Power Apps delegable functions and operations for SQL Server](connections/sql-connection-overview.md#power-apps-functions-and-operations-delegable-to-sql-server)
- [Power Apps delegable functions and operations for Salesforce](/connectors/salesforce/#power-apps-delegable-functions-and-operations-for-salesforce)


Imported Excel workbooks (by using the **Add static data to your app** data source), collections, and tables stored in context variables don't need delegation. This data is already in memory, so you use the full Power Apps language.

## Delegable functions
Use only formulas that can be delegated. This article lists formula elements that can be delegated. Every data source is different, and not all data sources support all these elements. Check for delegation warnings in your formula.

### Filter functions
You can delegate **[Filter](functions/function-filter-lookup.md)**, **[Search](functions/function-filter-lookup.md)**, **[First](functions/function-first-last.md)**, and **[LookUp](functions/function-filter-lookup.md)**.

Within the **Filter** and **LookUp** functions, use these functions with columns of the table to select the appropriate records:

* **[And](functions/function-logicals.md)** (including **[&&](functions/operators.md)**), **[Or](functions/function-logicals.md)** (including **[||](functions/operators.md)**), **[Not](functions/function-logicals.md)** (including **[!](functions/operators.md)**)
* **[In](functions/operators.md)**
        > [!NOTE]
    > [In](functions/operators.md) is only delegated for columns on the base data source. For example, if the data source is the **Accounts** table, `Filter(Accounts, Name in ["name1", "name2"])` delegates to the data source for evaluation. But `Filter(Accounts, PrimaryContact.Fullname in ["name1", "name2"])` isn't delegated because the **Full name** column is on a different table (**PrimaryContact**) than **Accounts**. The expression is evaluated locally.
* **[=](functions/operators.md)**, **[<>](functions/operators.md)**, **[>=](functions/operators.md)**, **[<=](functions/operators.md)**, **[>](functions/operators.md)**, **[<](functions/operators.md)**
* **[+](functions/operators.md)**, **[-](functions/operators.md)**
* **[TrimEnds](functions/function-trim.md)**
* **[IsBlank](functions/function-isblank-isempty.md)**
* **[StartsWith](functions/function-startswith.md)**, **[EndsWith](functions/function-startswith.md)**
* Constant values that are the same across all records, like control properties, and [global and context variables](working-with-variables.md).

You can also use parts of your formula that evaluate to a constant value for all records. For example, **Left( Language(), 2 )**, **Date( 2019, 3, 31 )**, and **Today()** don't depend on any columns of the record, so they return the same value for all records. These values are sent to the data source as a constant and don't block delegation.

The previous list doesn't include these notable items:

* **[If](functions/function-if.md)**
* **[*](functions/operators.md)**, **[/](functions/operators.md)**, **[Mod](functions/function-mod.md)**
* Column casting operations: **[Text](/power-platform/power-fx/reference/function-text)**, **[Value](/power-platform/power-fx/reference/function-value)**
* **[Concatenate](functions/function-concatenate.md)** (including **[&](functions/operators.md)**)
* **[ExactIn](functions/operators.md)**
* String manipulation functions: **[Lower](functions/function-lower-upper-proper.md)**, **[Upper](functions/function-lower-upper-proper.md)**, **[Left](functions/function-left-mid-right.md)**, **[Mid](functions/function-left-mid-right.md)**, **[Len](functions/function-left-mid-right.md)**, ...
* Signals: **[Location](functions/signals.md)**, **[Acceleration](functions/signals.md)**, **[Compass](functions/signals.md)**, ...
* Volatiles: **[Rand](functions/function-rand.md)**, ...
* [Collections](working-with-variables.md)

## Delegation and collections
When you use `With`, `UpdateContext`, or `Set`, these functions create collections internally. Collections are a static in-memory list of records and can't participate in delegation. You don't see a delegation warning.

## Query limitations

### Lookup and expand levels
Power Apps lets you use up to two lookup levels. A Power Fx query expression can include a maximum of two lookup functions to maintain performance. When a query expression includes a lookup, Power Apps first queries the base table, then runs a second query to expand the first table with the lookup information. One additional level beyond this is supported as the maximum. For offline scenarios, only one level of lookup expand is supported.

You can expand or join up to 20 entities in a single query. If you need to join more than 20 tables in one query, try creating a view on the data server if possible.

### Expression evaluation - property of entity must be on left side 'LHS' of equality operator
Put the property of an entity to be compared on the left hand side (LHS) of an equation. For example, in the following expression, the entity property **'Business unit ID'.Name** is on the LHS, and the expression works:

```power-fx
Filter(
        Budgets,
        'Business unit ID'.Name = LookUp(
            Users,
            'Primary Email' = User().Email,
            'Business Unit'
        ).Name,
        DataCardValue37.Selected.'Date Range String'='Date Range String'
    )
```
However, this expression doesn't work:

```power-fx
 Filter(
        Budgets,
        LookUp(
            Users,
            'Primary Email' = User().Email,
            'Business Unit'
        ).Name = 'Business unit ID'.Name,
        'Date Range String'=DataCardValue37.Selected.'Date Range String'
    )
```

### Sorting functions
**[Sort](functions/function-sort.md)** and **[SortByColumns](functions/function-sort.md)** can be delegated.

In **Sort**, the formula can only be the name of a single column and doesn't include other operators or functions.

### Aggregate functions
Some aggregate functions can be delegated based on back-end support. Functions like **[Sum](functions/function-aggregates.md)**, **[Average](functions/function-aggregates.md)**, **[Min](functions/function-aggregates.md)**, and **[Max](functions/function-aggregates.md)** can be delegated. Counting functions, like **[CountRows](functions/function-table-counts.md)** and **[Count](functions/function-table-counts.md)**, can also be delegated. However, **[RemoveIf](functions/function-remove-removeif.md)** and **[UpdateIf](functions/function-update-updateif.md)** have delegation restrictions. Only a limited number of data sources support delegation for these functions. For more information, see the [Delegation list](#delegable-data-sources).



## Nondelegable functions
All other functions can't delegate. Notable functions include:

* **[FirstN](functions/function-first-last.md)**, **[Last](functions/function-first-last.md)**, **[LastN](functions/function-first-last.md)**
* **[Choices](functions/function-choices.md)**
* **[Concat](functions/function-concatenate.md)**
* **[Collect](functions/function-clear-collect-clearcollect.md)**, **[ClearCollect](functions/function-clear-collect-clearcollect.md)**
* **[GroupBy](functions/function-groupby.md)**, **[Ungroup](functions/function-groupby.md)**

## Nondelegable limits
Formulas that can't be delegated are processed locally. Local processing lets you use the full Power Apps formula language. But there's a tradeoff: all the data comes to the device first, which can mean getting a large amount of data over the network. This process can take time and make your app seem slow or unresponsive.

To avoid this problem, Power Apps limits the amount of data that can be processed locally to 500 records by default. This limit lets you use small data sets completely and work with large data sets by seeing partial results.

Be careful when using this feature because it can confuse users. For example, if you use the **Filter** function with a selection formula that can't be delegated over a data source with a million records, only the first 500 records are scanned. If the record you want is record 501 or 500,001, **Filter** doesn't find or return it.

Aggregate functions can also be confusing. For example, if you use **Average** over a column in that same million-record data source, **Average** can't be delegated because the expression isn't delegated (see the [earlier note](#aggregate-functions)). Only the first 500 records are averaged. If you're not careful, a user might think a partial answer is the complete answer.

## Changing the limit
The default number of records is 500, but you can change this number for your app:

1. Select **Settings**.
1. Under **General**, change the **Data row limit** setting from 1 to 2,000.

In some cases, 2,000, 1,000, or 1,500 records is enough for your scenario. You can increase this number to fit your needs, but as you do, your app's performance can degrade, especially for wide tables with many columns. It's still best to delegate as much as possible.

To make sure your app scales to large data sets, set this value to 1. Anything that can't be delegated returns a single record, which is easy to detect when testing your app. This helps you avoid surprises when moving a proof-of-concept app to production.

## Delegation warnings
Power Apps shows a warning (yellow triangle) when you create a formula that can't be delegated. It's easier to know what is and isn't delegated.

Delegation warnings appear only on formulas that use delegable data sources. If you don't see a warning but think your formula isn't delegated, check your data source type against the list of [delegable data sources](delegation-overview.md#delegable-data-sources) earlier in this article.

## Examples
In this example, you automatically generate a three-screen app based on a SQL Server table named **[dbo].[Fruit]**. To learn how to generate the app, apply similar principles from the [article about Dataverse](data-platform-create-app.md) to SQL Server.

![Three-screen app.](./media/delegation-overview/products-afd.png)

The gallery's **Items** property uses a formula with the **SortByColumns** and **Search** functions, both of which can be delegated.

In the search box, enter **"Apple"**.

Marching dots briefly appear near the top of the screen as the app communicates with SQL Server to process the search request. All records that match the search criteria appear, even if the data source has millions of records.

![Search text-input control.](./media/delegation-overview/products-apple.png)

The search results include **"Apples"** and **"Pineapple"** because the **Search** function looks everywhere in a text column. To find only records that contain the search term at the start of the fruit's name, use another delegable function, **Filter**, with a more specific search term. For simplicity, remove the **SortByColumns** call.

![Remove SortByColumns call.](./media/delegation-overview/products-apple-delegationwarning.png)

The new results include **"Apples"** but not **"Pineapple"**. A yellow triangle appears next to the gallery and in the screen thumbnail if the left navigation bar shows thumbnails. A blue, wavy line appears under part of the formula. Each of these elements indicates a warning. When you hover over the yellow triangle next to the gallery, this message appears:

![Hover over delegation warning.](./media/delegation-overview/products-apple-yellowwarning.png)

SQL Server is a delegable data source, and **Filter** is a delegable function. However, **Mid** and **Len** can't be delegated to any data source.

But it works, doesn't it? Kind of. That's why this is a warning and not a red, wavy squiggle.

- If the table has fewer than 500 records, the formula works perfectly. All records are brought to the device, and **Filter** is applied locally.
- If the table has more than 500 records, the formula doesn't return record 501 or higher, even if it matches the criteria.

### See also

- [Troubleshoot Power Apps canvas app performance issues](/troubleshoot/power-platform/power-apps/canvas-app-performance/troubleshoot-perf-table) <br>
[Performance tips and best practice to use delegation](performance-tips.md#use-delegation)

---

## Manage an on-premises data gateway in Power Apps

Source: [gateway-management.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/gateway-management)

*Learn about how to manage an on-premises data gateway and its connections.*

# Manage an on-premises data gateway in Power Apps

Install an on-premises data gateway to transfer data quickly and securely between a canvas app that's built in Power Apps and a data source that isn't in the cloud, such as an on-premises SQL Server database or an on-premises SharePoint site. View all gateways for which you have administrative permissions, and manage permissions and connections for those gateways. 

You can connect to on-premises data over the [connectors](/connectors/connector-reference/connector-reference-powerapps-connectors) that use data gateway.

## Prerequisites

* The user name and password that you used to [sign up](../signup-for-powerapps.md) for Power Apps.
* Administrative permissions on a gateway. (You have these permissions by default for each gateway that you install, and an administrator of another gateway can grant you these permissions for that gateway.)
* A license that supports accessing on-premises data using an on-premises gateway. For more information, see the [pricing page](https://powerapps.microsoft.com/pricing/).

## Install a gateway

To install a gateway, follow the steps in [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install). Install the gateway in standard mode because the _on-premises data gateway (personal mode)_ is available only for Power BI.

## View and manage gateway permissions

1. In the left navigation bar of [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), click or tap **Gateways**, and then click or tap a gateway.

2. Add a user to a gateway by clicking or tapping **Users**, specifying a user or group, and then specifying a permission level:

   * **Can use**: Users who can create connections on the gateway to use for apps and flows, but cannot share the gateway. Use this permission for users who will run apps but not share them.
   * **Can use + share**: Users who can create a connection on the gateway to use for apps and flows, and automatically share the gateway when sharing an app. Use this permission for users who need to share apps with other users or with the organization.
   * **Admin**: Administrators who have full control of the gateway, including adding users, setting permissions, creating connections to all available data sources, and deleting the gateway.

For **Can use** and **Can use + share** permission levels, select the data sources that the user can connect to over the gateway.

> [!NOTE]
> **Can use** and **Can use + share** does not apply to custom connectors.  Only gateway **Admins** can create connections for custom connectors.

## View and manage gateway connections

1. In the left navigation bar of [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), click or tap **Gateways**, and then click or tap a gateway.

2. Click or tap **Connections**, and then click or tap a connection to view its details, edit the settings, or delete it.

3. To share a connection, click or tap **Share**, and then add or remove users.

    > [!NOTE]
   > You can share only some types of connections, such as SQL Server. For more information, see [Share app resources](share-app-resources.md).

For more information about how to manage a connection, see [Manage your connections](add-manage-connections.md).

## Troubleshooting and Advanced Configuration

For more information about troubleshooting issues with gateways, see [Troubleshoot the on-premises data gateway](/data-integration/gateway/service-gateway-tshoot). For more information about configuration, see [Use the on-premises data gateway app](/data-integration/gateway/service-gateway-app).

## Next steps

* [Install the on-premises data gateway](/data-integration/gateway/service-gateway-install).
* Create an app that connects to an on-premises data source, such as [SQL Server](connections/sql-connection-overview.md) or [SharePoint](connections/connection-sharepoint-online.md).
* [Share an app](share-app.md) that connects to an on-premises data source.

---

## What is an on-premises data gateway?

Source: [gateway-reference.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/gateway-reference)

*Learn about on-premises data gateways when working with canvas apps in Power Apps.*

# What is an on-premises data gateway?

The on-premises data gateway acts as a bridge to provide quick and secure data transfer between on-premises data (data that isn't in the cloud) and several Microsoft cloud services. These cloud services include Power BI, Power Apps, Power Automate, Azure Analysis Services, and Azure Logic Apps. By using a gateway, organizations can keep databases and other data sources on their on-premises networks, yet securely use that on-premises data in cloud services.

## How the gateway works

![Gateway overview.](media/gateway-reference/on-premises-data-gateway.png)

For more information on how the gateway works, see [On-premises data gateway architecture](/data-integration/gateway/service-gateway-onprem-indepth).

## Types of gateways

There are two different types of gateways, each for a different scenario:

- **On-premises data gateway** allows multiple users to connect to multiple on-premises data sources. You can use an on-premises data gateway with all supported services, with a single gateway installation. This gateway is well-suited to complex scenarios with multiple people accessing multiple data sources.

- **On-premises data gateway (personal mode)** allows one user to connect to sources, and can’t be shared with others. An on-premises data gateway (personal mode) can be used only with Power BI. This gateway is well-suited to scenarios where you’re the only person who creates reports, and you don't need to share any data sources with others.

## Use a gateway

There are four main steps for using a gateway.

1. [Download and install the gateway](/data-integration/gateway/service-gateway-install) on a local computer.
2. [Configure](/data-integration/gateway/service-gateway-app) the gateway based on your firewall and other network requirements.
3. [Add gateway admins](/data-integration/gateway/service-gateway-manage) who can also manage and administer other network requirements.
4. [Troubleshoot](/data-integration/gateway/service-gateway-tshoot) the gateway in case of errors.

## End user accessing via a gateway
An end user will use the credentials for the gateway that the Power Apps author used to create the gateway. End users will see a connection in the consent dialog but it will be with the credentials provided by the Power Apps author. 

## Next steps

- [Install the on-premises data gateway](/data-integration/gateway/service-gateway-install)

---

## Understand data sources for canvas apps

Source: [working-with-data-sources.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-data-sources)

*Learn about connections, data source types, delegation limits, error handling, and collections for canvas apps.*

# Understand data sources for canvas apps

In Power Apps, most canvas apps use external information stored in cloud services called **Data Sources**. A common example is a table in an Excel file stored in OneDrive. Apps access these data sources by using **Connections**.

This article discusses the different kinds of data sources and how to work with table data sources, including how to handle delegation, error handling, and common issues.

It's easy to create an app that does basic reading and writing to a data source. But sometimes you want more control over how data flows in and out of your app. This article describes how the **[Patch](functions/function-patch.md)**, **[DataSourceInfo](functions/function-datasourceinfo.md)**, **[Validate](functions/function-validate.md)**, and **[Errors](functions/function-errors.md)** functions provide more control.

## Kinds of data sources

Data sources can be connected to a cloud service, or they can be local to an app.

### Connected data sources

The most common data sources are **tables**, which you can use to retrieve and store information. You can use **connections** to data sources to read and write data in Microsoft Excel workbooks, lists created using Microsoft Lists, SharePoint libraries, SQL tables, and many other formats, which can be stored in cloud services such as OneDrive, DropBox, and SQL Server.

Data sources other than tables include email, calendars, Twitter, and notifications, but this article doesn't discuss these other kinds of data sources.

### Local data sources

With **[Gallery](controls/control-gallery.md)**, **[Display form](controls/control-form-detail.md)**, and **[Edit form](controls/control-form-detail.md)** controls, you can create an app that reads and writes data from a data source. To get started, see [Understand data forms](working-with-forms.md).  

When you ask Power Apps to create an app from data, these controls are used. Behind the scenes, the app uses an internal table to store and manipulate the data that comes from the data source.

A special type of data source is the [Collection](working-with-data-sources.md#collections), which is local to the app and not backed by a connection to a service in the cloud. Therefore, the information can't be shared across devices for the same user or between users. Collections can be loaded and saved locally.

### Kinds of tables

Tables that are internal to an app are fixed values, just as a number or a string is a value. Internal tables aren't stored anywhere, but exist in your app's memory. You can't directly modify the structure and data of a table. What you can do instead is to create a new table through a formula: you use that formula to make a modified copy of the original table.

External tables are stored in a data source for later retrieval and sharing. Power Apps provides "connections" to read and write stored data. Within a connection, you can access multiple tables of information. You can select which tables to use in your app, and each becomes a separate *data source*.  

To learn more, see [Working with tables](working-with-tables.md) about internal tables, but also external tables residing in a cloud service.

## Working with tables

You can use table data sources the same way that you use an internal Power Apps table. Just like an internal table, each data source has [records](working-with-tables.md#records), [columns](working-with-tables.md#columns), and properties that you can use in formulas. In addition:

* The data source has the same column names and data types as the underlying table in the connection.
  
    > [!NOTE]
  > For SharePoint and Excel data sources that contain column names with spaces, Power Apps replaces the spaces with **"\_x0020\_"**. For example, **"Column Name"** in SharePoint or Excel appears as **"Column_x0020_Name"** in Power Apps when displayed in the data layout or used in a formula.
* The data source is loaded from the service automatically when the app is loaded. You can force the data to refresh by using the **[Refresh](functions/function-refresh.md)** function.
* As users run an app, they can create, modify, and delete records and push those changes back to the underlying table in the service.
  * Records can be created with the **[Patch](functions/function-patch.md)** and **[Collect](functions/function-clear-collect-clearcollect.md)** functions.  
  * Records can be modified with the **[Patch](functions/function-patch.md)**, **[Update](functions/function-update-updateif.md)**, and **[UpdateIf](functions/function-update-updateif.md)** functions.
  * Records can be removed with the **[Remove](functions/function-remove-removeif.md)** and **[RemoveIf](functions/function-remove-removeif.md)** functions.
  * Errors when working with a data source are available through the **[Errors](functions/function-errors.md)** function.
* The **[DataSourceInfo](functions/function-datasourceinfo.md)**, **[Defaults](functions/function-defaults.md)**, and **[Validate](functions/function-validate.md)** functions provide information about the data source that you can use to optimize the user experience.

### Creating data sources

Power Apps can't be used to create a connected data source, or modify its structure; the data source must already exist in a service somewhere. For example, to create a table in an Excel workbook stored on OneDrive, you first use Excel Online on OneDrive to create a workbook. Next you create a connection to it from your app.  

However, collection data sources *can* be created and modified inside an app, but are only temporary.

### Display one or more records

![Flow of information when an app reads the information in a data source.](media/working-with-data-sources/reading-from-a-datasource.png)

This diagram shows the flow of information when an app reads the information in a data source:

* The information is stored and shared through a storage service (in this case, Microsoft Lists or SharePoint Online).
* A connection makes this information available to the app. The connection takes care of authentication of the user to access the information.
* When the app is started or the **[Refresh](functions/function-refresh.md)** function is pressed, information is drawn from the connection into a data source in the app for local use.
* Formulas are used to read the information and expose it in controls that the user can see. You can display the records of a data source by using a gallery on a screen and wiring the **[Items](controls/properties-core.md)** property to the data source: **Gallery.Items = DataSource**. You wire controls within the gallery, to the gallery, using the controls' **[Default](controls/properties-core.md)** property.  
* The data source is also a table. So you can use **[Filter](functions/function-filter-lookup.md)**, **[Sort](functions/function-sort.md)**, **[AddColumns](functions/function-table-shaping.md)**, and other functions to refine and augment the data source before using it as a whole. You can also use the **[Lookup](functions/function-filter-lookup.md)**, **[First](functions/function-first-last.md)**, **[Last](functions/function-first-last.md)**, and other functions to work with individual records.

### Modify a record

The arrows in the previous diagram are one way. Changes to a data source aren't pushed back through the same formulas in which the data was retrieved. Instead, new formulas are used. Often a different screen is used for editing a record than for browsing records, especially on a mobile device.

To modify an existing record of a data source, the record must have originally come from the data source. The record might display in a gallery, a [context variable](working-with-variables.md#use-a-context-variable), and any number of formulas, but its origin should be traceable back to the data source. Extra information travels with the record that uniquely identifies it, ensuring that you modify the correct record.

![Flow of information to update a data source.](media/working-with-data-sources/writing-to-a-datasource.png)
This diagram shows the flow of information to update a data source:

* An **[Edit form](controls/control-form-detail.md)** control provides a container for input cards, which are made up of user input controls such as a text-input control or a slider. The **[DataSource](controls/control-form-detail.md)** and **[Item](controls/control-form-detail.md)** properties are used to identify the record to edit.
* Each input card has a **[Default](controls/properties-core.md)** property, which is set to the field of the form's **ThisItem** record. The controls within the input card take their input values from **[Default](controls/properties-core.md)**. Normally, you don't need to modify this default.
* Each input card exposes an **[Update](controls/control-card.md)** property. This property maps the user's input to a specific field of the record for writing back to the data source. Normally, you don't need to modify this property.
* A button or an image control on the screen enables the user to save changes to the record. The **[OnSelect](controls/properties-core.md)** formula of the control calls the **[SubmitForm](functions/function-form.md)** function to do this work. **[SubmitForm](functions/function-form.md)** reads all the **[Update](controls/control-card.md)** properties of the cards and writes back to the data source.
* Sometimes there are issues. A network connection might be down, or a validation check is made by the service that the app didn't know about. The **Error** and **[ErrorKind](controls/control-form-detail.md)** properties of the form control makes this information available, so you can display it to the user.  

For more fine grained control over the process, you can also use the **[Patch](functions/function-patch.md)** and **[Errors](functions/function-errors.md)** function. The **[Edit form](controls/control-form-detail.md)** control exposes an **[Updates](controls/control-form-detail.md)** property so that you can read the values of the fields within the form. You can also use this property to call a custom connector on a connection, completely bypassing the **Patch** and **SubmitForm** functions.

### Validation

Before you make a change to a record, the app should do what it can to make sure the change is acceptable. There are two reasons for checking:

* *Immediate feedback to the user*. The best time to fix a problem is right when it happens, when it's fresh in the user's mind. Literally with each touch or keystroke, red text can appear that identifies an issue with their entry.
* *Less network traffic and less user latency*. More issues detected in the app mean fewer conversations over the network to detect and resolve issues. Each conversation takes time during which the user must wait before they can move on.

Power Apps offers two tools for validation:

* The data source can provide information about what is and isn't valid. For example, numbers can have minimum and maximum values, and one or more entries can be required. You can access this information with the **[DataSourceInfo](functions/function-datasourceinfo.md)** function.  
* The **[Validate](functions/function-validate.md)** function uses this same information to check the value of a single column or of an entire record.

### Error handling

Now that you validated your record, update that record with **[Patch](functions/function-patch.md)**.

But, there might still be a problem. The network is down, validation of the service failed, or the user doesn't have the right permissions, just to name a few of the possible errors your app might encounter. Your app needs to respond appropriately to error situations, providing feedback to the user and a means for them to make it right.  

When errors occur with a data source, your app automatically records the error information and makes it available through the **[Errors](functions/function-errors.md)** function. Errors are associated with the records that had the problems. If the problem is something the user can fix, such as a validation problem, they can resubmit the record, and the errors are cleared.

If an error occurs when a record is created with **[Patch](functions/function-patch.md)** or **[Collect](functions/function-clear-collect-clearcollect.md)**, there's no record to associate any errors with. In this case, *blank* is returned by **[Patch](functions/function-patch.md)** and can be used as the record argument to **[Errors](functions/function-errors.md)**. Creation errors are cleared with the next operation.

The **[Errors](functions/function-errors.md)** function returns a table of error information. This information can include the column information, if the error can be attributed to a particular column. Use column-level error messages in label controls that are close to where the column is located on the edit screen. Use record-level error messages where the **Column** in the error table is *blank*, in a location close to the **Save** button for the entire record.  

### Working with large data sources

When you create reports from large data sources (perhaps millions of records), you want to minimize network traffic. Let's say you want to report on all **Customers** having a **StatusCode** of *Platinum* in New York City. Your **Customers** table contains millions of records.

You don't want to bring those millions of customers into your app, and then choose the ones you want. The choice should happen inside the cloud service where your table is stored, where you send the chosen records over the network.

Many, but not all, functions that you can use to choose records can be *delegated*, which means that they're run inside the cloud service. Learn more in [Delegation](delegation-overview.md).

> [!IMPORTANT]
> By default, Power Apps retrieves only the first **500 records** from a data source. You can raise this limit to a maximum of **2,000 records** in app settings. If your data source contains more records and your formula isn't fully delegable, a yellow delegation warning triangle appears in Power Apps Studio. When you see this warning, your app may not return all matching records at runtime. To avoid data loss in large data sets, use delegable functions such as **[Filter](functions/function-filter-lookup.md)** and **[Sort](functions/function-sort.md)** with supported data sources, or consider using Microsoft Dataverse, which has broader delegation support.

#### Identify and resolve delegation warnings

A delegation warning often appears in the formula bar as a yellow triangle when Power Apps can't push a formula operation to the data source, but not every nondelegable case shows this warning. To check whether a formula is delegable:

1. Select the control or formula that processes your data source.
2. Look for a yellow triangle icon in Power Apps Studio.
3. Hover over the triangle to read the delegation warning message.

To resolve delegation issues:
- Replace non-delegable functions (such as **Search** for text columns in SharePoint) with delegable alternatives where possible.
- Switch to Microsoft Dataverse as your data source for the broadest delegation support.
- Use server-side views (for SharePoint) or stored procedures (for SQL) to pre-filter data.
- To troubleshoot delegation issues that aren’t flagged, use Live Monitor under **Advanced tools** to inspect the queries Power Apps sends and the data returned from each data source. For more information, see [Debugging canvas apps with Live monitor](../monitor-canvasapps.md).

## Collections

Collections are a special type of data source. They're local to the app and not backed by a connection to a service in the cloud. Therefore, the information can't be shared across devices for the same user or between users.

Collections operate like any other data source, with a few exceptions:

* Collections can be created dynamically with the **[Collect](functions/function-clear-collect-clearcollect.md)** function. They don't need to be established ahead of time, as connection-based data sources do.
* The columns of a collection can be modified at any time using the **[Collect](functions/function-clear-collect-clearcollect.md)** function.
* Collections allow duplicate records. More than one copy of the same record can exist in a collection. Functions such as **[Remove](functions/function-remove-removeif.md)** operate on the first match they find, unless the **All** argument is supplied.
* You can use the **[SaveData](functions/function-savedata-loaddata.md)** and **[LoadData](functions/function-savedata-loaddata.md)** functions to save and reload a copy of the collection. The information is stored in a private location that other users, apps, or devices can't access.
* You can use the **[Export](controls/control-export-import.md)** and **[Import](controls/control-export-import.md)** controls to save and reload a copy of the collection to a file that the user can interact with.  

For more information on working with a collection as a data source, see [create and update a collection](create-update-collection.md).

Collections are commonly used to hold global state for the app. See [working with variables](working-with-variables.md) for the options available for managing state.

## Troubleshoot common data source issues

### My gallery only shows 500 records

By default, Power Apps retrieves only the first 500 records from a data source. If your gallery appears to be missing records, you likely have a delegation issue. Check for a yellow triangle warning on your gallery's **Items** formula, and make sure the filter formula you're using is delegable for your data source. See [Working with large data sources](#working-with-large-data-sources) for resolution steps.

### Column names show _x0020_ in my formulas

If your SharePoint list or Excel table has column names with spaces (for example, **My Column**), Power Apps replaces spaces with `_x0020_` in formulas (for example, `MyTable.My_x0020_Column`). This is expected behavior. Rename the column in the source data to remove spaces, or continue using the encoded name in your formulas.

### Data source changes aren't appearing in my app

If the underlying data changed externally (for example, a record was added in SharePoint), your app doesn't automatically detect changes while it's running. Use the **[Refresh](functions/function-refresh.md)** function to force the app to reload the current data. For example, add a button with `OnSelect = Refresh(MyDataSource)`.

### When should I use Patch instead of SubmitForm?

Use **[SubmitForm](functions/function-form.md)** when you have an **Edit form** control—it handles validation, field mapping, and error display automatically. Use **[Patch](functions/function-patch.md)** when you need to:

- Update a record without a form control.
- Update only specific fields without affecting others.
- Write to multiple data sources in one operation.
- Build a completely custom save experience.

## Related information

- [Delegation overview for canvas apps](delegation-overview.md)
- [Delegable data sources and functions in canvas apps](delegation-list.md)
- [Understand canvas-app forms](working-with-forms.md)
- [Working with tables in canvas apps](working-with-tables.md)
- [Working with variables in canvas apps](working-with-variables.md)
- [Create and update a collection in canvas apps](create-update-collection.md)

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

## Understand record references and polymorphic lookups in canvas apps

Source: [working-with-references.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-references)

*Learn about how to work with record references and polymorphic lookups in canvas apps.*

# Understand record references and polymorphic lookups in canvas apps

When you wrote a research paper in school, you probably provided a list of your references at the end. You didn't include a copy of the actual background material you used but rather a web link, book title and author, or other information so that someone could track down the original source. You mixed different kinds of sources in a single list, newspaper articles next to audio recordings, each with their own specific details for a proper citation. For example, Wikipedia articles often include a [long list of references](https://en.wikipedia.org/wiki/Microsoft#References).

In canvas apps, you often work with copies of records downloaded from data sources. You use the [**LookUp**](functions/function-filter-lookup.md) and [**Filter**](functions/function-filter-lookup.md) functions and the [**Gallery**](controls/control-gallery.md) control's **Selected** property to identify the specific record that you want. All the records from **Filter** or **Selected** will be of the same table type, so you can use fields with a simple .*Field* notation. These copies often include reference information so you can use the [**Patch**](functions/function-patch.md) function to update the original source.

Canvas apps also support *record references*. Much like a research-paper reference, a record reference refers to a record without including a complete copy of it. Such a reference can refer to a record in any table. Also like research-paper references, you can mix records from different tables in a single column.

Many operations on record references are identical to working with records. You can compare record references to each other and to full records. You can set a record reference's value with the **Patch** function just as you would a lookup with a full record.

There is one important usage difference: you can't directly access the fields of a record reference without first establishing to which table it refers. This is because canvas apps require that all types be known when you write formulas. Because you don't know the type of a record reference until the app is running, you can't use the simple .*Field* notation directly. You must first dynamically determine the table type with the [**IsType**](functions/function-astype-istype.md) function and then use .*Field* notation on the result of the [**AsType**](functions/function-astype-istype.md) function.

*Table type* refers to the schema of each record in a table. Each table has a unique set of fields with different names and data types. Each record of the table inherits that structure; two records have the same table type if they come from the same table.

> [!NOTE]
> You can choose from many different connectors to connect to different types of data sources for canvas apps. However, when working with canvas apps inside Power Apps Studio, **columns** in Microsoft Dataverse are referred to as **fields** similar to all other data sources. **Column** is only used when referring to a column inside Dataverse. More information: [Dataverse terminology updates](../data-platform/data-platform-intro.md#terminology-updates)

## Polymorphic lookups

Microsoft Dataverse supports relationships between records. Each record in the **Accounts** table has a **Primary Contact** lookup column to a record in the **Contacts** table. The lookup can only refer to a record in **Contacts** and can't refer to a record in, say, the **Teams** table. That last detail is important because you always know what columns will be available for the lookup.

Dataverse also supports polymorphic lookups, which can refer to a record from any table in a set. For example, the **Owner** column can refer to a record in the **Users** table or the **Teams** table. The same lookup column in different records could refer to records in different tables. In this case, you don't always know what columns will be available.

Canvas record references were designed for working with polymorphic lookups in Dataverse. You can also use record references outside of this context, which is how the two concepts differ.

In the next section, you'll start to explore these concepts by working with the **Owner** lookup.

## Show the columns of a record owner

Every table in Dataverse includes an **Owner** column. This column can't be removed, you can't add another, and it always requires a value.

To show that column in the **Account** table:

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
1. In the left pane bar, select **Data** > **Tables**.
1. In the list of tables, select **Account**.
1. In the upper-right corner, open the filter list (which is set to **Default** by default), and then select **All**.
1. Scroll down until the **Owner** column appears.

    ![Owner column on Account table.](media/working-with-references/owner-field.png)

This lookup column can refer to a record from either the **Teams** table or the **Users** table. Not every record in these tables has permission to be an **Owner**; check the supported roles if you run into a problem.

This graphic shows a simple gallery of **Accounts**, where the **Accounts** table has been added to the app as a data source:

> [!div class="mx-imgBorder"]
> ![Accounts shown in a Gallery control.](media/working-with-references/accounts-gallery.png)

> [!IMPORTANT]
> Throughout this topic, the graphics show some names and other values that aren't part of the sample data that ships with Dataverse. The steps accurately demonstrate how to configure controls for a particular result, but your experience will vary based on the data for your organization.

To show the owner of each account in the gallery, you might be tempted to use the formula **ThisItem.Owner.Name**. However, the name field in the **Team** table is **Team Name**, and the name field in the **User** table is **Full Name**. The app can't know which type of lookup you're working with until you run the app, and it can vary between records in the **Accounts** table.

You need a formula that can adapt to this variance. You also need to add the data sources for the table types that **Owner** could be (in this case, **Users** and **Teams**). Add these three data sources to your app:

![Accounts, Teams, and Users tables in the Data pane.](media/working-with-references/accounts-datasources.png)

With these data sources in place, use this formula to display the name of either a user or a team:

```power-fx
If( IsType( ThisItem.Owner, Teams ),
    "Team: " & AsType( ThisItem.Owner, Teams ).'Team Name',
    "User: " & AsType( ThisItem.Owner, Users ).'Full Name' )
```

> [!div class="mx-imgBorder"]
> ![Accounts shown in a Gallery control with Owner field displayed.](media/working-with-references/accounts-displayowner.png)

In this formula, the **IsType** function tests the **Owner** field against the **Teams** table. If it's of that table type, the **AsType** function casts it to a **Team** record. At this point, you can access all the fields of the **Teams** table, including **Team Name**, by using the *.Field* notation. If **IsType** determines that the **Owner** isn't a record in the **Teams** table, that field must be a record in the **Users** table because the **Owner** field is required (can't be *blank*).

To use any fields of a record reference, you must first use the **AsType** function to cast it to a specific table type. You can't access fields directly from the **Owner** field because the system doesn't know what table type you want to use.

The **AsType** function returns an error if the **Owner** field doesn't match the table type being requested, so you can use the **IfError** function to simplify this formula. First, turn on the experimental feature **Formula-level error management**:

![Experimental switch to turn on formula-level error management.](media/working-with-references/accounts-iferror.png)

Then replace the previous formula with this one:

```power-fx
IfError(
    "Team: " & AsType( ThisItem.Owner, Teams ).'Team Name',
    "User: " & AsType( ThisItem.Owner, Users ).'Full Name' )
```

## Filter based on an owner

Congratulations—you've finished the hardest aspect of working with a record reference. Other use cases are more straightforward because they don't access fields of the record. As a case in point, take filtering, which you'll explore in this section.

Add a **Combo box** control above the gallery, and set these properties of the new control:

- **Items**: `Users`
- **SelectMultiple**: `false`

> [!div class="mx-imgBorder"]
> ![Added combo-box control above gallery with Items property set to Users.](media/working-with-references/filter-insert-combobox.png)

To filter the gallery by a specific user selected from this combo box, set the gallery's **Items** property to this formula:

```power-fx
Filter( Accounts, Owner = ComboBox1.Selected )
```

> [!div class="mx-imgBorder"]
> ![Filtered gallery based on value set in the combo-box control.](media/working-with-references/filter-accounts.png)

> [!IMPORTANT]
> The instructions in this topic are accurate if you follow the steps exactly. However, any formula that refers to a control by its name fails if the control has a different name. If you delete and add a control of the same type, the number at the end of the control's name changes. For any formula that shows an error, confirm that it contains the correct names of all controls.

You don't need to use **IsType** or **AsType** because you're comparing record references to other record references or to full records. The app knows the table type of **ComboBox1.Selected** because it's derived from the **Users** table. Accounts for which the owner is a team won't match the filter criterion.

You can get a little fancier by supporting filtering by either a user or a team.

1. Make some space near the top of the screen by resizing the gallery and moving the combo box, insert a [**Radio** control](controls/control-radio.md) above the gallery, and then set these properties for the new control:

    - **Items**: `[ "All", "Users", "Teams" ]`
    - **Layout**: `Layout.Horizontal`

1. For the **Combo box** control, set this property (if the combo box disappears, select **Users** in the radio control):

    - **Visible**: `Radio1.Selected.Value = "Users"`

1. Copy and paste the **Combo box** control, move the copy directly over the original, and then set these properties for the copy:

    - **Items**: `Teams`
    - **Visible**: `Radio1.Selected.Value = "Teams"`

    The app will display only one combo box at a time, depending on the state of the radio control. Because they're directly above one another, they'll appear to be the same control that changes its contents.

1. Finally, set the **Items** property of the **Gallery** control to this formula:

    ```power-fx
    Filter( Accounts,
        Radio1.Selected.Value = "All"
        Or (Radio1.Selected.Value = "Users" And Owner = ComboBox1.Selected)
        Or (Radio1.Selected.Value = "Teams" And Owner = ComboBox1_1.Selected)
    )
    ```

    > [!div class="mx-imgBorder"]
    > ![Filtered gallery showing all records or a specific user or team.](media/working-with-references/filter-combobox.png)

With these changes, you can show all records or filter them based on either a user or a team:

> [!div class="mx-imgBorder"]
> ![Animation showing different filtered results based on the radio control and combo boxes.](media/working-with-references/filter-allthree.gif)

The formula is fully delegable. The portion that's comparing the radio-button values is a constant across all records and is evaluated before the rest of the filter is sent to Dataverse.

If you want to filter on the type of the owner, you can use the **IsType** function, but it's not yet delegable.

> [!div class="mx-imgBorder"]
> ![Filter by owner type by using IsType.](media/working-with-references/filter-bytype.png)

## Update the owner by using Patch

You can update the **Owner** field in the same manner as any other lookup. To set the currently selected account's owner to the first team:

```power-fx
Patch( Accounts, Gallery1.Selected, { Owner: First( Teams ) } )
```

This approach doesn't differ from a normal lookup because the app knows the type of **First( Teams )**. If you want the first user instead, replace that portion with **First( Users )**. The **Patch** function knows that the **Owner** field can be set to either of these two table types.

To add this capability to the app:

1. In the **Tree view** pane, select the **Radio** control and the two **Combo box** controls at the same time.

1. On the ellipsis menu, select **Copy these items**.

    > [!div class="mx-imgBorder"]
    > ![Copy of multiple controls using the tree view.](media/working-with-references/patch-copy.png)

1. On the same menu, select **Paste**.

    > [!div class="mx-imgBorder"]
    > ![Paste of multiple controls using the tree view.](media/working-with-references/patch-paste.png)

1. Move the copied controls to the right of the gallery.

    > [!div class="mx-imgBorder"]
    > ![Moved copied controls to the right of the gallery.](media/working-with-references/patch-position.png)

1. Select the copied **Radio** control, and then change these properties:

    - Items: `[ "Users", "Teams" ]`
    - Default: `If( IsType( Gallery1.Selected.Owner, Users ), "Users", "Teams" )`

    > [!div class="mx-imgBorder"]
    > ![Removed the all choice from the radio control.](media/working-with-references/patch-noall.png) 

1. In the **Radio** control, select **Users** so that the **Combo box** control that lists users is visible.

1. Select the visible **Combo box** control, and then set the **DefaultSelectedItems** property to this formula:

    ```power-fx
    If( IsType( Gallery1.Selected.Owner, Users ),
        AsType( Gallery1.Selected.Owner, Users ),
        Blank()
    )
    ```

    > [!div class="mx-imgBorder"]
    > ![Default property set for the Users combo box.](media/working-with-references/patch-default-users.png)

1. In the **Radio** control, select **Teams** so that the **Combo box** control that lists teams is visible.

1. Select the **Radio** control to take selection away from the now-invisible **Combo box** control for users.

1. Select the visible **Combo box** control for teams, and then set its **DefaultSelectedItems** property to this formula:

    ```power-fx
    If( IsType( Gallery1.Selected.Owner, Teams ),
        AsType( Gallery1.Selected.Owner, Teams ),
        Blank()
    )
    ```

    > [!div class="mx-imgBorder"]
    > ![Default property set for the Teams combo box.](media/working-with-references/patch-default-teams.png)

1. Insert a **Button** control, move it under the **Combo box** control, and then set the button's **Text** property to `"Patch Owner"`.

1. Set the **OnSelect** property of the button to this formula:

    ```power-fx
    Patch( Accounts, Gallery1.Selected,
        { Owner: If( Radio1_1.Selected.Value = "Users",
                     ComboBox1_2.Selected,
                     ComboBox1_3.Selected ) } )
    ```

    > [!div class="mx-imgBorder"]
    > ![Formula set on Button control.](media/working-with-references/patch-button.png)

The copied **Radio** and **Combo box** controls show the owner for the currently selected account in the gallery. With the same controls, you can set the owner of the account to any team or user by selecting the button:

> [!div class="mx-imgBorder"]
> ![Animation showing patch of Owner with either a User or a Team.](media/working-with-references/patch-allthree.gif)

## Show the owner by using a form

You can show an **Owner** field inside a form by adding a custom card. As of this writing, you can't change the value of the field with a form control.

1. Insert an **Edit form** control, and then resize and move it to the lower-right corner.

1. On the **Properties** tab near the right side of the screen, open the **Data source** list, and then select **Accounts**.

    > [!div class="mx-imgBorder"]
    > ![Form control showing additional fields with blank values.](media/working-with-references/form-insert.png)  

1. Set the form's **Item** property to `Gallery1.Selected`.

    > [!div class="mx-imgBorder"]
    > ![Form control showing additional fields populated from the selected item in the gallery.](media/working-with-references/form-item.png)

1. On the **Properties** tab near the right side of the screen, select **Edit fields**.

1. In the **Fields** pane, select the ellipsis, and then select **Add a custom card**.

    > [!div class="mx-imgBorder"]
    > ![Command for adding a custom card.](media/working-with-references/form-customcard.png)

    The new card appears at the bottom of the form control.

1. Resize the card as needed to show all the text.

    > [!div class="mx-imgBorder"]
    > ![Inserted custom card, blank.](media/working-with-references/form-inserted-customcard.png)

1. Insert a **Label** control into the custom card, and then set the label's **Text** property to the formula that you used in the gallery:

    ```power-fx
    If( IsType( ThisItem.Owner, Teams ),
        "Team: " & AsType( ThisItem.Owner, Teams ).'Team Name',
        "User: " & AsType( ThisItem.Owner, Users ).'Full Name' )
    ```

    > [!div class="mx-imgBorder"]
    > ![Custom card showing the Owner field in a label control.](media/working-with-references/form-displayowner.png)

For each selection in the gallery, more fields of the account, including the record's owner, appear in the form. If you change the owner by using the **Patch** button, the form control also shows that change.

> [!div class="mx-imgBorder"]
> ![Animation showing the form control responding to changes in the gallery.](media/working-with-references/form-allthree.gif)

## Show the columns of a customer

In Dataverse, the **Customer** lookup column is another polymorphic lookup that's very similar to **Owner**.

**Owner** is limited to one per table, but tables can include zero, one, or more **Customer** lookup column. The **Contacts** system table includes the **Company Name** column, which is a **Customer** lookup column.

![Contact table showing Company Name column as a Customer data type that isn't required.](media/working-with-references/customer-companyname.png)

You can add more **Customer** lookup columns to a table by selecting the **Customer** data type for a new column.

![Customer data type from the list of data types when creating a column.](media/working-with-references/customer-datatype.png)

A **Customer** lookup field can refer to a record from either the **Accounts** table or the **Contacts** table. You'll use the **IsType** and **AsType** functions with these tables, so now is a good time to add them as data sources (you can leave **Teams** and **Users** in place).

![Accounts, Teams, Users, and Contacts tables in the Data pane.](media/working-with-references/customer-datasources.png)

The treatment of the **Customer** and **Owner** fields is so similar that you can literally copy the app (**File** > **Save as**, and then specify a different name) and make these simple replacements:

| Location | **Owner** sample | **Customer** sample |
|----------|-----------|------------------|
| Throughout | **Owner** | **'Customer Name'** |
| Throughout | **Users** | **Accounts** |
| Throughout | **Teams** | **Contacts** |
| Gallery's **Items** property | **Accounts** | **Contacts** |
| Form's **Items** property | **Accounts** | **Contacts** |
| The first argument of **Patch**<br>in the button's **OnSelect** property | **Accounts** | **Contacts** |
| Filter radio's **Items** property | **[&nbsp;"All",&nbsp;"Users",&nbsp;"Teams"&nbsp;]** | **[&nbsp;"All",&nbsp;"Accounts",&nbsp;"Contacts"&nbsp;]** |
| Patch radio's **Items** property | **[ "Users", "Teams" ]** | **[ "Accounts", "Contacts" ]** |
| Combo box's **Visible** property | **"Users"** and **"Teams"** | **"Accounts"** and **"Contacts"** |

For example, the new gallery should have this **Items** property:

```power-fx
Filter( Contacts,
    Radio1.Selected.Value = "All"
    Or (Radio1.Selected.Value = "Accounts" And 'Company Name' = ComboBox1.Selected)
    Or (Radio1.Selected.Value = "Contacts" And 'Company Name' = ComboBox1_1.Selected)
)
```

> [!div class="mx-imgBorder"]
> ![Customer app derived from the Owner app with simple changes applied.](media/working-with-references/customer-simple-update.png)

Two important differences between **Customer** and **Owner** require an update to the formulas inside the gallery and the form:

1. One-to-many relationships between **Accounts** and **Contacts** take precedence when you refer to these table types by name. Instead of **Accounts**, use **\[\@Accounts]**; instead of **Contacts**, use **\[\@Contacts]**. By using the [global disambiguation operator](functions/operators.md#disambiguation-operator), you ensure that you're referring to the table type in **IsType** and **AsType**. This problem exists only in the record context of the gallery and form controls.

1. The **Owner** field must have a value, but **Customer** fields can be *blank*. To show the correct result without a type name, test for this case with the [**IsBlank** function](functions/function-isblank-isempty.md), and show an empty text string instead.

Both of these changes are in the same formula, which appears in the custom card in the form, as well as in the **Text** property of the gallery's label control:

```power-fx
If( IsBlank( ThisItem.'Company Name' ), "",
    IsType( ThisItem.'Company Name', Accounts ),
        "Account: " & AsType( ThisItem.'Company Name', Accounts ).'Account Name',
    "Contact: " & AsType( ThisItem.'Company Name', Contacts ).'Full Name'
)
```

> [!div class="mx-imgBorder"]
> ![Update to Text property of subtitle label control in the gallery.](media/working-with-references/customer-update.png)

With these changes, you can view and change the **Company Name** field in the **Contacts** table.

> [!div class="mx-imgBorder"]
> ![Animation that shows how selecting a contact changes the other controls and the form.](media/working-with-references/customer-allthree.gif)

## Understand Regarding lookup columns

The **Regarding** lookup column differs a little from those that you've already worked with in this topic. You'll start by applying the patterns that this topic described earlier, and then you'll learn other tricks.

You can start simply with the **Faxes** table. This table has a polymorphic **Regarding** lookup column, which can refer to **Accounts**, **Contacts**, and other tables. You can take the app for **Customers** and modify it for **Faxes**.

| Location | **Customer** sample | **Faxes** sample |
|----------|-----------|------------------|
| Throughout | **'Customer Name'** | **Regarding** |
| Gallery's **Items** property | **Contacts** | **Faxes** |
| Form's **Items** property | **Contacts** | **Faxes** |
| The first argument of **Patch**<br> in the button's **OnSelect** property | **Contacts** | **Faxes** |

Again, you'll need to add a data source: this time for **Faxes**. On the **View** tab, select **Data sources**:

![Data pane showing Accounts, Teams, Users, Contacts, and Faxes tables.](media/working-with-references/faxes-datasources.png)

An important difference for **Regarding** is that it isn't limited to **Accounts** and **Contacts**. In fact, the list of tables is extensible with custom tables. Most of the app can accommodate this point without modification, but you must update the formula for the label in the gallery and the form:

```power-fx
If( IsBlank( ThisItem.Regarding ), "",
    IsType( ThisItem.Regarding, Accounts ),
        "Account: " & AsType( ThisItem.Regarding, Accounts ).'Account Name',
    IsType( ThisItem.Regarding, Contacts ),
        "Contacts: " & AsType( ThisItem.Regarding, Contacts ).'Full Name',
    ""
)
```

> [!div class="mx-imgBorder"]
> ![Updated Text property for the subtitle control for Regarding lookups.](media/working-with-references/regarding-label.png)

After you make these changes, you work with the **Regarding** lookup just as you did the **Owner** and **Customer** lookups.

> [!div class="mx-imgBorder"]
> ![Animation that shows how selecting an item in the gallery changes the other controls and the form.](media/working-with-references/regarding-allthree.gif)

## Understand Regarding relationships

**Regarding** differs from **Owner** and **Customer** because the former involves a many-to-one relationship. By definition, a reverse, one-to-many relationship allows you to write **First( Accounts ).Faxes**.

Let's back up and look at the table definitions. In Dataverse, tables such as **Faxes**, **Tasks**, **Emails**, **Notes**, **Phone Calls**, **Letters**, and **Chats** are designated as [*activities*](../../developer/data-platform/activity-entities.md). You can also create your own [custom activity tables](../../developer/data-platform/custom-activities.md). When you view or create an activity table, its settings appear under **More settings**.

![Activity table setting when creating a table.](media/working-with-references/activity-entitytype.png)

Other tables can be related to an activity table if they're enabled as an *activity task* in the table's settings. **Accounts**, **Contacts**, and many other standard tables are so designated (again, under **More settings**).

![Activity task setting when creating a table.](media/working-with-references/activity-entityuse.png)

All activity tables and activity-task tables have an implied relationship. If you change the filter to **All** at the top of the screen, select the **Faxes** table, and then select the **Relationships** tab, all tables that can be a target of a **Regarding** lookup appear.

![Relationships of the Faxes table showing Regarding many-to-one relationships.](media/working-with-references/activity-manytoone.png)

If you show the relationships for the **Accounts** table, all the tables that can be a source of a **Regarding** lookup field appear.

![Relationships of the Account table showing Regarding one-to-many relationships.](media/working-with-references/activity-onetomany.png)

What does it all mean?

- When you write formulas, you must consider that the list of activity tables isn't fixed, and you can create your own. The formula must appropriately handle an activity table that you didn't expect.
- Activity tasks and activities have a one-to-many relationship. You can easily ask for all faxes that relate to an account.

To explore this concept in the app:

1. Add another screen.

    > [!div class="mx-imgBorder"]
    > ![Insert a blank screen.](media/working-with-references/activitypointer-newscreen.png)

1. Insert a gallery control, resize it, and then move it to the left side of the screen.

1. On the **Properties** tab near the right side of the screen, set the gallery's **Items** to **Accounts**.

    > [!div class="mx-imgBorder"]
    > ![Set Items to Accounts in property pane.](media/working-with-references/activitypointer-accounts.png)

1. Set the gallery's layout to **Title**, and then set the title field to **Account Name**.

    > [!div class="mx-imgBorder"]
    > ![Set Layout to Title for gallery control in the properties pane.](media/working-with-references/activitypointer-account-name.png)

1. Add a second gallery, resize it, and then move it to the right side of the screen.

1. Set the new gallery's **Items** property to `Gallery2.Selected.Faxes`.

    This step returns the filtered list of faxes for a given account.

    > [!div class="mx-imgBorder"]
    > ![Set the Items property of the gallery that shows faxes.](media/working-with-references/activitypointer-faxes.png)

1. Set the gallery's layout to **Title and subtitle**, and then set the title field to show the **Subject** field (which might be lowercase **subject**).

    > [!div class="mx-imgBorder"]
    > ![Set title to Subject field.](media/working-with-references/activitypointer-subject.png)

As you select an item in the list of accounts, the list of faxes shows faxes for only that account.

> [!div class="mx-imgBorder"]
> ![Animation showing selection in the accounts gallery driving the list of faxes.](media/working-with-references/activitypointer-allthree.gif)

## Activity table

As the previous section describes, you can show all the faxes for an account. However, you can also show all the activities for an account, including faxes, email messages, phone calls, and other interactions.

For the latter scenario, you use the **Activity** table. You can show this table by turning on **All** in the upper-right corner to remove the filter from the list of tables.

![List of tables showing the Activity table.](media/working-with-references/activitypointer-entity.png)

The **Activity** table is special. Whenever you add a record to the **Faxes** table, the system also creates a record in the **Activity** table with the columns that are common across all activity tables. Of those columns, **Subject** is one of the most interesting.

You can show all activities by changing only one line in the previous example. Replace `Gallery2.Selected.Faxes` with `Gallery2.Selected.Activities`.

> [!div class="mx-imgBorder"]
> ![Change of Items property for the second gallery, changing from faxes to activities.](media/working-with-references/activitypointer-gallery.png)

Records are coming from the **Activity** table, but you can nevertheless use the **IsType** function to identify which kind of activity they are. Again, before you use **IsType** with a table type, you must add the data source.

![Data pane showing all the tables required for the IsType function.](media/working-with-references/activity-datasources.png)

By using this formula, you can show the record type in a label control within the gallery:

```power-fx
If( IsType( ThisItem, Faxes] ), "Fax",
    IsType( ThisItem, 'Phone Calls' ), "Phone Call",
    IsType( ThisItem, 'Email Messages' ), "Email Message",
    IsType( ThisItem, Chats ), "Chat",
    "Unknown"
)
```

> [!div class="mx-imgBorder"]
> ![Set text property to formula to show information for faxes, phone calls, and other activities.](media/working-with-references/activitypointer-type.png)

You can also use **AsType** to access the fields of the specific type. For example, this formula determines the type of each activity and, for phone calls, shows the phone number and call direction from the **Phone Numbers** table:

```power-fx
If( IsType( ThisItem, Faxes ), "Fax",
    IsType( ThisItem, 'Phone Calls' ),
       "Phone Call: " &
       AsType( ThisItem, 'Phone Calls' ).'Phone Number' &
       " (" & AsType( ThisItem, 'Phone Calls' ).Direction & ")",
    IsType( ThisItem, 'Email Messages' ), "Email Message",
    IsType( ThisItem, Chats ), "Chat",
    "Unknown"
)
```

> [!div class="mx-imgBorder"]
> ![Expanded text property with more information for a phone call.](media/working-with-references/activitypointer-phonecall.png)

As a result, the app shows a complete list of activities. The **Subject** field appears for all types of activities, whether the formula takes them into account or not. For types of activities that you know about, you can show their type names and type-specific information about each activity.

> [!div class="mx-imgBorder"]
> ![Completed screen showing information for different kinds of activities.](media/working-with-references/activitypointer-complete.png)

## Notes table

So far, all of the **Regarding** examples have been based on activities, but the **Notes** table represents another case.

When you create a table, you can enable attachments.

![Enabling attachments and notes when creating a table.](media/working-with-references/notes-entity.png)

If you select the check box for enabling attachments, you'll create a **Regarding** relationship with the **Notes** table, as this graphic shows for the **Accounts** table:

![Account table showing relationship to Notes through a one-to-many relationship.](media/working-with-references/notes-relationships.png)

Other than this difference, you use the **Regarding** lookup in the same manner in which you use activities. Tables that are enabled for attachments have a one-to-many relationship to **Notes**, as in this example:

`First( Accounts ).Notes`

> [!NOTE]
> As of this writing, the **Regarding** lookup isn't available for the **Notes** table. You can't read or filter based on the **Regarding** column, and you can't set the column by using **Patch**.
>
> However, the reverse **Notes** one-to-many relationship is available, so you can filter a list of notes for a record that's enabled for attachments. You can also use the [**Relate**](functions/function-relate-unrelate.md) function to add a note to a record's **Notes** table, but the note must be created first, as in this example:
>
>`Relate( ThisItem.Notes, Patch( Notes, Defaults( Notes ), { Title: "A new note" } ) )`

## Activity parties

As of this writing, canvas apps don't support activity parties.

---

