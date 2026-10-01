# Power Apps Canvas Apps — Performance & Optimization

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 12

## Contents

1. [How to create performant Power Apps](#how-to-create-performant-power-apps)
2. [Monitor your apps performance](#monitor-your-apps-performance)
3. [Analyze system-generated logs using Application Insights](#analyze-system-generated-logs-using-application-insights)
4. [Understand canvas app execution phases and data call flow](#understand-canvas-app-execution-phases-and-data-call-flow)
5. [Small data payloads in Power Apps](#small-data-payloads-in-power-apps)
6. [Optimized query data patterns in Power Apps](#optimized-query-data-patterns-in-power-apps)
7. [Speed up app or page load in Power Apps](#speed-up-app-or-page-load-in-power-apps)
8. [Efficient calculations in Power Apps](#efficient-calculations-in-power-apps)
9. [Performance considerations for Power Apps](#performance-considerations-for-power-apps)
10. [Build large and complex canvas apps](#build-large-and-complex-canvas-apps)
11. [Build business logic](#build-business-logic)
12. [Power Apps coding guidelines](#power-apps-coding-guidelines)

---

## How to create performant Power Apps

Source: [create-performant-apps-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-performant-apps-overview)

*Learn how to create performant Power Apps for faster, more efficient apps. Discover key principles and tips to optimize your app's performance.*

# Overview of creating performant apps

Creating performant Power Apps ensures your apps run efficiently and provides a better user experience. This article explains key patterns, anti-patterns to avoid, and design principles to help you build high-performing Power Apps for your organization.

- **App patterns and Power Apps productivity gain**: Power Apps makes it easier to build enterprise-grade apps by using established app patterns. Patterns are groups of Power Apps elements that work together, like data sources, collections, controls, Power Automate, and pages. Power Apps includes key performant patterns by default, so low-code developers quickly build functional enterprise apps. Deployment and administration tasks are also straightforward. With Power Apps, your team is more productive because many elements don't need your attention.

- **Power Apps steers towards performant patterns**: Power Apps guides you toward well known performant patterns by default. These patterns include streamlined data loading at launch, automatic incremental paging, caching data for collections, and loading only essential data for each page. These proven patterns work well for data-heavy enterprise apps. Many successful Power Apps implementations use more than 100 tables and over 50 screens while keeping excellent performance.

- **Falling into anti-patterns**: When you build an app on any development platform, you risk making it perform poorly because of anti-patterns. These patterns can cause slow loading, slow page transitions, and make it hard to update or get data. Common anti-patterns include loading too much data, turning everything into collections, and overloading OnStart. People often use these patterns to work around real or perceived Power Apps limitations. Even with guidance, you might still use a bad pattern and end up with a slow app.

## Key performance design principles

When building your app, consider these key performance principles to ensure it runs efficiently. These principles cover most aspects needed to enhance your app's speed. Some performance suggestions might appear in multiple sections due to their interrelated nature. 

- [Optimize page loads](fast-app-page-load.md): Optimize your apps for app and page load speed. Minimize, delay, or eliminate actions that prevent fast app or page load.
- [Small data payloads](small-data-payloads.md): Keep the amount of data that is bulk retrieved small.
- [Optimize query data patterns](optimized-query-data-patterns.md): Do data mashups on the server, not in your app.  
- [Fast calculations](efficient-calculations.md): Work with Power Fx, not against it.

For a deeper understanding, also see [Execution phases of a Power App](execution-phases-data-flow.md) article.

## Additional performance guidance

Other performance considerations can affect your app. For more information, see these articles:

- [Other performance considerations](app-performance-considerations.md): Discusses other factors that might affect performance, including client, device, geography, and on-premises data gateway location factors.
- [Monitor for canvas apps](../monitor-canvasapps.md): Use Monitor to see where time is spent in an app that's already published, so you can find slow requests when no error message appears.
- [Monitor app performance](../common/monitor-app-performance.md): Review performance telemetry for a deployed app.
- [Build large complex apps](working-with-large-apps.md): Lists key factors to consider when building a large app.
- [Canvas app coding standards and guidelines](https://www.microsoft.com/power-platform/blog/wp-content/uploads/2024/06/PowerApps-canvas-app-coding-standards-and-guidelines.pdf): Lists general coding and development guidelines that help you build an app.

---

## Monitor your apps performance

Source: [monitor-app-performance.md](https://learn.microsoft.com/en-us/power-apps/maker/common/monitor-app-performance)

*Get valuable insights and recommendations for your app using Monitor.*

#  Use Monitor to get insights and recommendations for your app

Monitor in Power Apps offers insights and recommendations to enhance app performance. It provides makers with detailed information on their app's performance and actionable steps to improve their apps.


## Prerequisites

To use this feature, your administrator must enable certain analytics and monitoring settings in the Power Platform Admin Center. For more information, see [Monitoring experiences for makers](/power-platform/admin/monitoring/monitoring-overview#monitoring-experiences-for-makers). When you sign in to Power Apps and open Monitor, make sure you’ve selected the correct environment and that you’re a member of that environment with an assigned role (for example, Basic User). Otherwise, you won’t be able to access Monitor.

## Open and pin Monitor

1. Sign in to [Power Apps](https://make.powerapps.com).
1. On the left navigation, select **Apps**.
1. On the command bar, select **Monitor**.
1. On the left navigation pane, select the :::image type="content" source="../canvas-apps/media/intro-maker-portal/pin-button.png" alt-text="Pin button next to Monitor"::: pin button next to **Monitor**.


## Use Monitor 

The **Monitor** page displays metric cards at the top, highlighting the top three underperforming apps for each metric. If all apps perform well on a specific metric, the card doesn't list any apps. Use the tabs under the cards to switch between viewing your model-driven, canvas, and code apps. 

:::image type="content" source="media/monitor-apps/monitor-in-power-apps.jpg" alt-text="Monitor main screen showing app metrics":::

| Metric | Definition | Available for Canvas apps | Available for Model-driven apps | Available for Code apps |
| ------------- | ------------- |------------- | ------------- | ------------- |
| **App open success rate**  | Indicates the percentage of app launch attempts that successfully allowed end-users to access the app. This metric is calculated once every 24 hours. | Yes | Yes | Yes |
| **App session count** | The number of distinct user sessions in an app in one day. A session begins when a user opens the app and ends after a period of inactivity or when the app is closed. | Yes | Yes | Yes |
| **Time to interactive (TTI)**  | Measures the time end-users wait to access the first screen of an app. It doesn't include the time users wait to see all data presented on the first screen, such as filling in rows of a gallery. This metric is calculated every 24 hours and is measured using percentiles, with the 75th percentile being reported. | Yes | No | Yes |
| **Time to full load (TTFL)**  | Measures the time end-users wait to see all data displayed on the first screen of an app. In the app launch lifecycle, this metric follows the **Time to interactive** phase. This metric is calculated every 24 hours and is measured using percentiles, with the 75th percentile being reported.| Yes | No | No |
| **Data request success rate** | A percentage that describes how often data requests coming from an app are successful | Yes | No | No |
| **Data request latency** | The average time (in seconds) it takes for all data requests made by the app to complete during a session. |  Yes | No | No |
| **Row summary dwell time** | The time (in seconds) that end users spend on the expanded AI row summary of a main form. | No | Yes | No |


### View metrics and recommendations for an app

  When you select an app on the  **Monitor** page, a side pane opens and displays more data for each metric, including a data chart for the last 30 days.

1. On **Monitor** page, select an app.

1. To view recommendations for an app, select the app’s name to open the side panel. The chart shows a callout with a recommended action for improving the metric.

    :::image type="content" source="media/monitor-apps/monitor-side-pane.png" alt-text="App metrics and recommendations":::

  > [!IMPORTANT]
  > Recommendations are only available in Managed Environments. Contact your admin to enable Managed Environments for access to recommendations.

---

## Analyze system-generated logs using Application Insights

Source: [application-insights.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/application-insights)

*Learn how to analyze and use system-generated logs from your canvas apps using Application Insights.*

# Analyze system-generated logs using Application Insights

Connect your canvas apps to [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is a feature of [Azure Monitor](/azure/azure-monitor/overview). Application Insights includes analytics tools that help diagnose issues and understand user behavior in apps. Use the collected information to make better business decisions and improve app quality.

## Prerequisites

- You need access to the [Azure portal](https://portal.azure.com).
- You need permission to [create Azure resources](/azure/role-based-access-control/quickstart-assign-role-user-portal).

> [!NOTE]
> To view telemetry information, your tenant admin needs to enable **Canvas app insights**. Sign in as an admin at the [Power Platform admin center](https://admin.powerplatform.microsoft.com/). Select **Settings** > **Tenant settings** > **Canvas app insights**. In the **Canvas app insights** pane, turn the toggle **On** and save your changes.
> Learn more in [Tenant settings](/power-platform/admin/tenant-settings).

## Create an Application Insights resource

Send system-generated logs from an app by creating an Application Insights resource to store events.

Learn how to [create a workspace-based resource](/azure/azure-monitor/app/create-workspace-resource?tabs=bicep#create-a-workspace-based-resource) for Application Insights in the Azure portal.

## Connect your app to Application Insights

> [!NOTE]
>
> - When you specify a connection string, remember that data can be sent across tenants. Trace events are sent to the App Insights resource that corresponds to the connection string you set for your app, even if the target App Insights instance is in a different tenant than the app.
> - Be cautious when importing existing .msapp files because connection strings for App Insights might be present. Manually open the app after import to check that the correct App Insights connection string is used.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Open an app to [edit it](edit-app.md).

1. Select the **App** object in the left navigation tree view, and paste the **Connection string** from your Application Insights resource.

    ![Screenshot of adding a connection string.](./media/application-insights/add-connection-string.png "Add connection string")

1. **Save** and **Publish** your app.

1. **Play** the published app and browse the different screens.

When you browse the app screens, events are automatically logged to Application Insights. These include usage details like:

- Where users access the app from
- Which devices users use
- The types of browsers users use

> [!IMPORTANT]
> Play the published app to send events to Application Insights. Events don't send to Application Insights when you preview the app in Power Apps Studio.

## View events in Application Insights

1. Sign in to the [Azure portal](https://portal.azure.com/) and open the Application Insights resource you [created previously](#create-an-application-insights-resource).

1. In the left navigation pane, select **Users** under the **Usage** section.

    > [!NOTE]
    >
    > The **Users** view shows app usage details, such as:
    > - Number of users who viewed the app
    > - Number of user sessions
    > - Number of events logged
    > - Users' operating systems and browser version details
    > - Users' region and location
    >
    > [Learn more about users, sessions, and events analysis in Application Insights](/azure/azure-monitor/app/usage-segmentation).

1. Select a user session to view specific details, such as session length and screens visited.

    ![Screenshot of usage details for users.](./media/application-insights/appinsights-users.gif "Usage details for users")

1. In the left navigation pane, select **Events** under the **Usage** section. You can view a summary of all the screens viewed across all app sessions.

    ![Screenshot of event details for the app.](./media/application-insights/appInsights-events.gif "Event details for the app")

> [!TIP]
> Explore more Application Insights features, such as:
>
> - [Funnels](/azure/azure-monitor/app/usage-funnels)
> - [Cohorts](/azure/azure-monitor/app/usage-cohorts)
> - [Impact analysis](/azure/azure-monitor/app/usage-impact)
> - [Retention analysis](/azure/azure-monitor/app/usage-retention)
> - [Usage flows](/azure/azure-monitor/app/usage-flows)

## Create custom trace events

Write custom traces to Application Insights to analyze information specific to your app. The [Trace](./functions/function-trace.md) function allows you to collect:

- Detailed usage information for controls on the screens
- Which specific users are accessing your app
- What errors occur

Tracing helps you diagnose issues by sending a trail of information as users browse your app and take actions. Trace messages sent to Application Insights have one of three severities:

- Information
- Warning
- Error

Send a trace message with the appropriate severity based on the situation. You can query the data and take specific actions based on the severity.

> [!NOTE]
> If you are logging any personal data, be aware of your obligations with respect to various privacy laws and regulations. Refer to the [Microsoft Trust Center](https://www.microsoft.com/trust-center) and the [Service Trust Portal](https://servicetrust.microsoft.com/ViewPage/HomePageVNext) for more information.

Create a component in your app to collect feedback on each screen and log events to Application Insights.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** in the left navigation pane. From the list of apps, select the **Kudos** app, and then select **Edit**.

    > [!NOTE]
    > You can also [create](open-and-run-a-sample-app.md) a new app or [edit](edit-app.md) an existing app instead.

1. Select **Components** in the **Tree view**:

    ![Components.](./media/application-insights/new-component.png "Components")

1. Select **New component**, then resize the width to 200 and the height to 75:

    ![Height and width.](./media/application-insights/resize-component.png "Height and width")

1. Select **Insert** from the menu and then select **Icons** to add *Emoji - Frown* and *Emoji - Smile*:

    ![Add icons.](./media/application-insights/add-icons.png "Add icons")

1. Select **New custom property** to create a custom property:

    ![Create custom property.](./media/application-insights/create-custom-property.png "Create custom property")

1. Enter the property *Name* and *Display name* (for example, *FeedbackScreen*).

1. Enter a property *Description*.

1. Select **Property type** as **Input** and **Data type** as **Screen**:

    ![Custom property.](./media/application-insights/custom-input-property.png "Custom property")

    > [!NOTE]
    > An input property lets you capture the screen name and its component to log this information to Application Insights.

1. Select the component in the **Tree view**, select **More actions** (**&hellip;**), and select **Rename** to give the component a meaningful name, such as *FeedbackComponent*.

    ![Rename component and icons.](./media/application-insights/rename-component-icons.png "Rename component and icons")

1. Select the icons, select **More actions** (**&hellip;**), and then select **Rename** to rename the icons with meaningful names, such as *FrownIcon* and *SmileIcon*.

1. Select **FrownIcon**, select the **OnSelect** property, and enter the following expression in the formula bar:

    ```power-fx
    Trace(
       "App Feedback",
       TraceSeverity.Information,
           {
             UserName: User().FullName,
             UserEmail: User().Email,
             Screen: FeedbackComponent.FeedbackScreen.Name,
             FeedbackValue: "-1"
           }
         );
    Notify("Thanks for your feedback!");
    ```

    ![Frown icon formula.](./media/application-insights/frownicon-formula.png "Frown icon formula")

    > [!NOTE]
    > The formula sends *UserName*, *UserEmail*, *Screen*, and *Feedback* (with the value *-1*) to Application Insights.

1. Select **SmileIcon**, select the **OnSelect** property, and then enter the following expression in the formula bar:
    
    ```power-fx
    Trace(
       "App Feedback",
       TraceSeverity.Information,
           {
             UserName: User().FullName,
             UserEmail: User().Email,
             Screen: FeedbackComponent.FeedbackScreen.Name,
             FeebackValue: "1"
           }
         );
    Notify("Thanks for your feedback!");
    ```

1. Add the component to one of the screens in your app:

    ![Add feedback component.](./media/application-insights/add-feedback-component.png "Add feedback component")

1. Select **Save** and then select **Publish** to save and publish your app.

1. Play the published app and send smile or frown feedback from its screens.

    > [!IMPORTANT]
    > You must play the published app to send events to Application Insights. Events are not sent to Application Insights when you preview the app in Power Apps Studio.

    ![Play published app.](./media/application-insights/play-published-app.png "Play published app")

## Analyze custom data in Application Insights

You can now begin to analyze the data you sent using the [Trace](#create-custom-trace-events) function from your app in Application Insights.

1. Sign in to the [Azure portal](https://portal.azure.com/) and open the application insights resource you created [earlier](#create-an-application-insights-resource).

    ![Select Application Insights.](./media/application-insights/select-app-insights.png "Select Application Insights")

1. Select **Logs** under **Monitoring** in the left navigation pane.

    ![Select Logs.](./media/application-insights/select-logs.png "Select Logs")

1. Enter the following query and select **Run** to view the feedback from your app:

    ```kusto
    traces
    | where message == "App Feedback"
    | order by timestamp
    ```

    ![View app feedback.](./media/application-insights/view-app-feedback.png "View app feedback")

1. Select a row in the results and expand the *customDimensions* field. 

    The values for **Screen**, **UserName**, **UserEmail**, and **FeedbackValue** for the **OnSelect** event of the smile or frown icon in your component are recorded. Values are also recorded for each event sent to Application Insights, such as the **appId**, **appName**, and **appSessionId**.

    ![Expand custom dimensions.](./media/application-insights/expand-custom-dimensions.png "Expand custom dimensions")

1. Use the following example query to extend the properties of the JSON custom dimensions and project the columns in the results view.

    ```kusto
    traces
        | extend customdims = parse_json(customDimensions)
        | where message == "App Feedback"
        | project timestamp
            , message
            , AppName = customdims.['ms-appName']
            , AppId = customdims.['ms-appId']
            , FeedbackFrom = customdims.UserEmail
            , Screen = customdims.Screen
            , FeedbackValue = customdims.FeedbackValue
        | order by timestamp desc
    ```

    ![Extend customDimensions query.](./media/application-insights/custom-dimensions-extend-query.png "Extend customDimensions query")

    > [!TIP]
    > *Log queries* are powerful. Use them to join multiple tables, aggregate large amounts of data, and run complex operations. [Learn more about log queries](/azure/azure-monitor/log-query/log-query-overview).

## Analyze app lifecycle data in Application Insights
The session summary event is logged once per session and contains 
information on app open success, app open optimal vs non-optimal sessions, and app 
open performance metrics.

### Limits
These events are accurate for canvas apps running in a web browser. They aren't available for apps running in Power Apps mobile, and their values might not always be available or accurate for custom pages.  

Here is an example query showing how to access the session summary event and all 
available fields: 

```kusto
customEvents 
| where name == "PowerAppsClient.PublishedApp.SessionLoadSummary" 
// 
| extend cd = parse_json(customDimensions) 
// 
| extend sessionSummary = parse_json(tostring(cd["ms-sessionSummary"])) 
| extend successfulAppLaunch = tobool(sessionSummary["successfulAppLaunch"]) 
| extend unsuccessfulReason = tostring(sessionSummary["unsuccessfulReason"]) 
| extend appLoadResult = tostring(sessionSummary["appLoadResult"]) 
| extend appLoadNonOptimalReason = 
tostring(sessionSummary["appLoadNonOptimalReason"]) 
// 
| extend timeToAppInteractive = todouble(sessionSummary["timeToAppInteractive"]) 
| extend timeToAppFullLoad = todouble(sessionSummary["timeToAppFullLoad"]) 
// 
| project 
    timestamp, 
    session_Id, 
    successfulAppLaunch, 
    unsuccessfulReason, 
    appLoadResult, 
    appLoadNonOptimalReason, 
    timeToAppInteractive, 
    timeToAppFullLoad 
| limit 5 
```
The following fields help measure app open success and latency of performance markers tied to end-user experiences. 

| Field                   | Description                                                                                                                                                                         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| successfulAppLaunch     | Boolean value indicating whether   the session successfully launched the app                                                                                                        |
| unsuccessfulReason      | If the session failed to launch   the app, this indicates the reason / error. This field will be an empty   string if the session was successful.                                   |
| appLoadResult           | Indicates if the session was   optimal or not.       Possible values: optimal, other                                                                                                |
| appLoadNonOptimalReason | If the session was not optimal,   this indicates the reason.       Possible values: interaction-required, throttled, screen-navigated-away,   other                                 |
| timeToAppInteractive    | Duration in milliseconds for the   app session to reach an interactive state. In this state, users can start to   interact with the first screen, but data may not be fully loaded. |
| timeToAppFullLoad       | Duration in milliseconds for the   app session to reach a fully loaded state, where all data requests for the   first screen have finished loading.                                 |

### Sample queries

#### App Open Success rates

This query will show the app open success rate by day. This can be used to evaluate spikes 
or trends in issues that users may be experiencing 
 ```kusto
customEvents 
| where name == "PowerAppsClient.PublishedApp.SessionLoadSummary" 
| extend cd = parse_json(customDimensions) 
| extend sessionSummary = parse_json(tostring(cd["ms-sessionSummary"])) 
| extend successfulAppLaunch = tobool(sessionSummary["successfulAppLaunch"]) 
| summarize 
sessions_total = dcount(session_Id), 
sessions_success = dcountif(session_Id, successfulAppLaunch == true) 
by bin(timestamp, 1d) 
| extend successRate =  
100.0 * (todouble(sessions_success) / todouble(sessions_total)) 
| project timestamp, successRate 
| render timechart
```
#### Count of Unsuccessful Sessions by Reason 
This query will show counts of unsuccessful sessions by reason / error. This can be used to 
debug app open failures or evaluate trends in issues that users may be experiencing. 

 ```kusto
customEvents 
| where name == "PowerAppsClient.PublishedApp.SessionLoadSummary" 
| extend cd = parse_json(customDimensions) 
| extend sessionSummary = parse_json(tostring(cd["ms-sessionSummary"])) 
| extend successfulAppLaunch = tobool(sessionSummary["successfulAppLaunch"]) 
| extend unsuccessfulReason = tostring(sessionSummary["unsuccessfulReason"]) 
| where successfulAppLaunch == false 
| summarize 
count() 
by unsuccessfulReason, bin(timestamp, 1d) 
| render timechart
```

#### App Open Performance 
This query will show app open performance metrics by day. This can be used to evaluate 
performance trends over time or after making changes. 
We recommend: 
1. Using the 75th percentile of the timeToAppInteractive and timeToAppFullLoad fields 
to avoid noise caused by outliers.
1. Filtering to only optimal sessions to avoid noise in the data caused by expected 
cases like sessions with user interaction, sessions where the app was loaded in a 
background tab, etc.

```kusto
customEvents 
| where name == "PowerAppsClient.PublishedApp.SessionLoadSummary" 
| extend cd = parse_json(customDimensions) 
| extend sessionSummary = parse_json(tostring(cd["ms-sessionSummary"])) 
| extend appLoadResult = tostring(sessionSummary["appLoadResult"]) 
| extend timeToAppInteractive = todouble(sessionSummary["timeToAppInteractive"]) 
| extend timeToAppFullLoad = todouble(sessionSummary["timeToAppFullLoad"]) 
| where appLoadResult == "optimal" 
| summarize 
percentile(timeToAppInteractive, 75), 
percentile(timeToAppFullLoad, 75) 
by bin(timestamp, 1d) 
| render timechart
```

#### App Load State on HTTP Calls 
There is a new request header x-ms-app-load-state that indicates if an HTTP call 
contributed to app startup. Specifically, this can be used to determine which HTTP calls 
impacted the timeToAppFullLoad above.

The header can be one of two values: 

| Value    | Description                                                        |
|----------|--------------------------------------------------------------------|
| TTFL     | indicates that the request contributed to timeToAppFullLoad        |
| PostTTFL | indicates that the request did not contribute to timeToAppFullLoad |

Here is an example query showing how to access the header value and projecting it in the 
appLoadState column: 

```kusto
dependencies 
| extend cd = parse_json(customDimensions) 
| extend requestHeaders = parse_json(tostring(cd["requestHeaders"])) 
| extend appLoadState = tostring(requestHeaders["x-ms-app-load-state"]) 
| project timestamp, session_Id, appLoadState, name, duration 
| limit 5
```

#### Count of HTTP calls contributing to Full Load 
This query will show the average count of HTTP calls that are contributing to 
timeToAppFullLoad by day. This can be used to evaluate the number of calls the app is 
making at startup that may be contributing to poor performance. 

```kusto
dependencies 
| extend cd = parse_json(customDimensions) 
| extend requestHeaders = parse_json(tostring(cd["requestHeaders"])) 
| extend appLoadState = tostring(requestHeaders["x-ms-app-load-state"]) 
| where appLoadState == "TTFL" 
| summarize httpCalls = count() by session_Id, bin(timestamp, 1d) 
| summarize avg(httpCalls) by timestamp 
| render timechart
```

#### Duration of HTTP calls contributing to Full Load 
This query will show the total duration of HTTP calls that are contributing to 
timeToAppFullLoad by day. This can be used to evaluate the overall impact of HTTP calls to 
app startup performance. 

```kusto
dependencies 
| extend cd = parse_json(customDimensions) 
| extend requestHeaders = parse_json(tostring(cd["requestHeaders"])) 
| extend appLoadState = tostring(requestHeaders["x-ms-app-load-state"]) 
| where appLoadState == "TTFL" 
| summarize httpCallDuration = sum(duration) by session_Id, bin(timestamp, 1d) 
| summarize percentile(httpCallDuration, 80) by timestamp 
| render timechart
```
#### Duration of HTTP calls contributing to Full Load by URL
Similar to above, this query will show the count and duration of HTTP calls contributing to 
timeToAppFulLoad by URL. This can be used to identify specific slow HTTP calls that are 
impacting app startup performance. 

```kusto
dependencies 
| extend cd = parse_json(customDimensions) 
| extend requestHeaders = parse_json(tostring(cd["requestHeaders"])) 
| extend appLoadState = tostring(requestHeaders["x-ms-app-load-state"]) 
| where appLoadState == "TTFL" 
| summarize 
count(), percentile(duration, 80) by name
```

## Monitor unhandled errors (experimental)

[This section contains pre-release documentation and is subject to change.]

> [!IMPORTANT]
> - This is an experimental feature.
> - Experimental features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

You can't always anticipate or plan for every error that might occur while your app runs. Unhandled Power Fx formula errors are reported to users as banner messages. They can also be reported to Application Insights to show their frequency and severity without relying on your app's users to report issues. You can also [set up real-time alerts](/azure/azure-monitor/app/availability-alerts) when runtime errors occur to take a more proactive approach.

### Enable error passing to Application Insights

Enable the setting that lets Power Apps pass unhandled runtime errors to Azure Application Insights.

> [!WARNING]
> Enabling the **Pass errors to Azure Application Insights** setting might incur additional costs for storing Application Insights logs.

1. Open the canvas app for editing. 
1. Select **Settings** > **Updates** > **Experimental**, and turn on **Pass errors to Azure Application Insights**.
1. Save and then publish your app.

### Error events in Application Insights

Unhandled Power Fx errors that users encounter at app runtime are reported to the **traces** table. Unhandled errors can be identified and distinguished from other error events by the event message "Unhandled error." The "severityLevel" dimension of these events is 3 (TraceSeverity.Error).

Detailed error messages are provided in the "errors" dimension of the *customDimension* property. In situations where multiple errors occurred during the same operation, the errors are consolidated in the "errors" dimension of a single trace event. The error messages match those reported in [Monitor](/power-apps/maker/monitor-canvasapps) during a live debug session.

This example query identifies unhandled errors and expands all error messages in the trace event:

```kusto
traces
    | where message == "Unhandled error"
    | extend customdims = parse_json(customDimensions)
    | extend errors = parse_json(tostring(customdims.['errors']))
    | mv-expand errors
    | project timestamp
        , itemId //unique identifier for the trace event
        , AppName = customdims.['ms-appName']
        , AppId = customdims.['ms-appId']
        , errors = errors.['Message']
    | order by timestamp desc
```

:::image type="content" source="media/application-insights/kusto.png" alt-text="Screenshot of the sample output for the example query.":::

## Correlation tracing (experimental)

[This section contains pre-release documentation and is subject to change.]

> [!IMPORTANT]
> - This is an experimental feature.
> - Experimental features aren’t meant for production use and may have restricted functionality. These features are available before an official release so that customers can get early access and provide feedback.

Connecting to external data and services is essential for most apps. Correlation tracing generates and propagates context information to link system-generated logs across a canvas app and its connections, subject to certain [limitations](#limitations). For example, your app might call a custom connector that then calls an Azure Function or another REST API. Correlation tracing allows you to correlate actions taken in the app with the underlying API calls across tiers. This is useful for troubleshooting.

Canvas app correlation tracing implements context tracing and follows the [W3C specification](https://www.w3.org/TR/trace-context/).

### Enable correlation tracing

> [!WARNING]
> Enabling this setting might incur additional costs related to storing Application Insights logs.

1. To enable correlation tracing, open your cavas app for editing.
1. Select **Settings** > **Udates** > **Experimental** >  and turn on **Enable Azure Application Insights correlation tracing**.
1. Save and publish the app.

:::image type="content" source="media/application-insights/correlation-tracing.png" alt-text="Screenshot of the setting to enable Azure Application Insights correlation tracing.":::

### Limitations

- Correlation tracing works only with custom connectors. Other connector types aren't supported.
- HTTP requests are captured in Application Insights only if the connected service [is also connected to Application Insights](/azure/azure-monitor/app/app-insights-overview).

### Using correlation tracing

When enabled, correlation tracing adds a new system-generated log event in the **dependencies** table of the canvas app's Application Insights instance. This event is recorded at the time a response from a network call is received. Dependency events capture details of the network call, including the request and response headers, response status code, and duration of the call.

:::image type="content" source="media/application-insights/correlation-dependencies.png" alt-text="Sample event logged in the dependencies table.":::

If the connected service is also connected to Application Insights, an additional system-generated log event capturing the request is generated in the **requests** table of the service's Application Insights instance. Some Azure services, such as Azure Functions, can be connected without any coding from the Azure portal. Both the canvas app or multiple apps and connected services can be connected to the same Application Insights instance.

:::image type="content" source="media/application-insights/correlation-requests.png" alt-text="Sample event logged in the requests table.":::

Join network calls for supported connectors with other system-generated logs on the "operation_Id" dimension. The following query shows a network call alongside trace events emitted during an app session.

```kusto
traces | union dependencies | union requests | union pageViews | union customEvents
| project timestamp
    , itemType
    , name
    , operation_Name
    , message
    , severityLevel
    , customDimensions
    , operation_Id
    , operation_ParentId
| where operation_Id == "0a7729e3e83c4e4d93cb4f51149f73b9" //placeholder operation_Id, replace
| order by timestamp asc
```

:::image type="content" source="media/application-insights/correlation-output.png" alt-text="Screenshot of sample output for the earlier example query.":::
  
## Export data to Power BI

You can export your Application Insights data and query results to Power BI for analysis and data presentation.

1. Sign in to the [Azure portal](https://portal.azure.com/) and open the Application Insights resource you set up [earlier](#create-an-application-insights-resource).

1. Select **Logs** under **Monitoring** in the left navigation pane.

1. In the log analytics query window, select the **Export** menu.

1. Select **Export to Power BI (M query)** to download a Power BI query file.

    ![Screenshot of the Export Power BI query option in the log analytics query window.](./media/application-insights/export-powerbi-query.png "Export Power BI query")

1. Open the downloaded file in a text editor, and copy the query to the clipboard.

1. Open Power BI.

1. Select **Get Data** in the **Home** ribbon, and then select **Blank query**.

    ![Screenshot of the Blank query option in Power BI's Get Data menu.](./media/application-insights/powerbi-blank-query.png "Power BI blank query")

1. In the query window, select **Advanced Editor**, paste the query into the window, select **Done**, and then select **Close & Apply**.

    ![Screenshot of the Advanced Editor in Power BI with a query pasted into the window.](./media/application-insights/powerbi-advance-query.png "Power BI advance query")

Create charts and visualizations in Power BI to represent feedback from your app and make data-driven decisions.

![Screenshot of charts and visualizations in Power BI representing app feedback.](./media/application-insights/powerbi-feedback.png "Charts and visualizations")

## Default Trace event context and dimensions

Default dimensions are added to the *customDimensions* property on each Trace event. These dimensions identify the application and application sessions where the events occur. If you log additional custom data using the Trace function, it also appears in the custom dimensions.

| Dimension Name  | Represents                                            |
|-----------------|-------------------------------------------------------|
| ms-appId | The Application ID of the app that sent the event. |
| ms-appname | The Application name of the app that sent the event. |
| ms-appSessionId | The application session ID. This value might not be populated in some scenarios. When available, this value overrides the standard Application Insights sessionID dimension. |
| ms-tenantID | The unique identifier of the tenant where the application is published. |
| ms-environmentId | The name of the environment where the application is published. |
| userId | A unique identifier for the user associated with the session. |
| ms-duration | An imputed value measuring the time it takes for a user to navigate from one screen to another. This value overrides the standard Application Insights PageView duration dimension. |
| sessionId | A session ID that can be used to correlate all events associated with a single application session. This value is always present and is recommended for understanding unique session count. This value is taken from the player's session ID and is shown when viewing the session details while playing the app. Session ID might sometimes get a default, random, unique Application Insights-generated value. This default value isn't reliable and doesn't correlate with any app-specific parameters. |
| Duration | An imputed value measuring the time it takes for a user to navigate from one screen to another. This value matches the duration reported by the ms-duration dimension. |
| ms-isTest | Indicates whether the session is associated with the Test Studio test runner. |
| ms-currentScreenName | The name of the page the user navigates from (available for page navigation events). |
| ms-targetScreenName | The name of the page a user is navigating to (present for page navigation events). |

## Unsupported scenarios

Application Insights doesn't support these scenarios.

- Offline player events aren't recorded.
- Events from mobile apps (iOS and Android) aren't recorded when the app is suspended.

---

## Understand canvas app execution phases and data call flow

Source: [execution-phases-data-flow.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/execution-phases-data-flow)

*Learn about the execution phases of canvas apps while starting-up, and the flow of data calls.*

# Understand canvas app execution phases, data call flow, and performance monitoring

When a user opens a canvas app, the app goes through several phases of execution before showing any user interface. While the app loads, it connects to different [data sources](./connections-list.md#popular-connectors)&mdash;such as SharePoint, Microsoft Dataverse, SQL Server (on-premises), Azure SQL Database (online), Excel, and Oracle.

In this article, you'll learn about these different phases of execution and how an app connects to data sources and about tools you can use to monitor performance.

## Execution phases in canvas apps

A canvas app goes through the following phases of execution before showing the interface to a user:

1. **Authenticate the user**: Prompts the first-time user to sign in with credentials for whatever connections the app needs. If that user opens the app again, that person might be prompted again, depending on the organization's security policies.

1. **Get metadata**: Retrieves metadata, such as the version of the Power Apps platform on which the app runs and the sources from which it must retrieve data.

1. **Initialize the app**: Performs any tasks specified in the [OnStart](functions/object-app.md#onstart-property) property.

1. **Render the screens**: Renders the first screen with controls that the app populates with data. If the user opens other screens, the app renders them by using the same process.  

## Data call flow in canvas apps

Data calls from canvas apps send data to tabular data sources by using connectors over the OData protocol.OData requests flow to back-end layers to reach out to the target data source and retrieve data for the client, or commit data to the data source. Action based connectors that enable APIs work in the same way. 

Understanding how OData and API requests travel in canvas apps can help you to optimize your canvas app performance and your back-end data sources.

In this section, you'll learn about how the data call flows in canvas apps with different data source types.

### Data call flow with online data sources

The following diagram shows how a typical data request in a canvas app (on the left side) travels server-side layers, reaches out to the target data source (on the right side), and then returns the data to the client.

![Typical data call flow for all connectors except the connector for Dataverse.](media\execution-phases-data-flow\all-connectors-general.png "Typical data call flow for all connectors except the connector for Dataverse")

Each layer in the preceding diagram can perform quickly or encounter some overhead while processing the request. In many apps, two particular spots commonly present noticeable overhead:

- **Back-end data source** while processing the request.

- **Client** while sending the request&mdash;or while manipulating the received data on the heap memory and executing the associated JavaScript functions to process data to show in screens.

### Data call flow with on-premises data gateway

If a canvas app connects to an on-premises data source like SQL Server, you need to have another layer called an [*on-premises data gateway*](gateway-reference.md). This gateway is mandatory for accessing on-premises data sources. It takes charge of converting OData protocol requests to SQL Data Manipulation Language (DML) statements.

The following diagram shows where and how the on-premises data gateway is put in place to process data requests.

![Data call flow for an on-premises data gateway.](media\execution-phases-data-flow\on-premiess-connectors.png "Data call flow for an on-premises data gateway")

If the app uses a data source on-premises, the location and the specification of the data gateway also affect the performance of data calls.

### Data call flow with Microsoft Dataverse

When you use Microsoft Dataverse as the data source, data requests go to the environment instance directly&mdash;without passing through Azure API Management. Because of this, the performance of data calls is faster compared to the rest of the data sources. The app is by default connected to Microsoft Dataverse when you create a new canvas app.

![Data call flow with Microsoft Dataverse.](media\execution-phases-data-flow\dataverse-connector.png "Data call flow with Microsoft Dataverse")

With the understanding of this high-level concept of how data calls travel, you can get into the details of reviewing the performance of your app. In summary, performance overhead can happen at any of the layers&mdash;from client, API Management, connector, on-premises data gateway, or back-end data sources.

## Measuring performance

### Power Apps Monitoring tool
While you can use the browser's developer tools to see performance, Power Apps subsets the set of calls in the Monitoring tool to just those that are Power Apps. 

The Power Apps monitoring tool can help you track what is actually sent to the data source and timestamps for when requests are sent and responses come from the server. 

You can learn more about the monitoring tool in this article: [Debugging canvas apps with Monitor](optimized-query-data-patterns.md) . 

![Monitoring tool.](./media/execution-phases-data-flow/monitoring-screen.png)

### Measuring memory pressure on the client

To see memory consumption graphically, you can use the developer tools for your browser to profile memory. It helps you visualize heap size, documents, nodes, and listeners. Profile the app's performance by using a browser, as described in [Microsoft Edge (Chromium) Developer Tools overview](/microsoft-edge/devtools-guide-chromium/landing/). Check the scenarios that exceed the memory threshold of the JS heap. More information: [Fix memory problems](/microsoft-edge/devtools-guide-chromium/memory-problems/)

 ![Memory usage graph.](./media/execution-phases-data-flow/memorygraph.png)


## Next steps
[Small data payloads](small-data-payloads.md)


### See also

[Troubleshooting issues for Power Apps](/troubleshoot/power-platform/power-apps/isolate-and-troubleshoot-common-issues/common-issues-and-resolutions)

---

## Small data payloads in Power Apps

Source: [small-data-payloads.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/small-data-payloads)

*Small data payloads in Power Apps.*

# Small data payloads - limit the amount of data you get
One of the most important patterns for enterprise data apps is to limit the size of the data you fetch into Power Apps. If the data payloads are small, nearly everything else gets easier. The Gallery and Table controls do this for you automatically when you connect directly to the data source in the Items property. For instance, when connected directly to a remote data source, a Gallery control pages in data in small increments, for example, 100 records. This default leverages the fact that an end user rarely really needs more than a hundred records for a user task.

## Use delegation
One key way to keep data payloads small is to rely on the data source to do work for you before it gets to Power Apps. **[Delegation](delegation-overview.md)** is when Power Fx can translate a Power Fx expression into a query expression that a data source such as Dataverse, SQL Server, SharePoint, and Excel can handle on its own. And, then Power Fx delegates that query, or gives the responsibility of doing the query work, the data mashup, to the data source. The data source produces the correct data and returns it to Power Apps. 

When the data source is bound directly to a gallery or table, then the data is paged or handed back the data to Power Apps in small performant increments of 100 records. Different data sources have different capabilities. Dataverse, for example, has many more capabilities to filter data on the server than Excel. A good example is CountRows and CountIf. Dataverse supports CountRows in a limited way. Dataverse calculates the size of the table periodically and keep that value around. When CountRows is called, you're given that value. That way it doesn't have to perform a full table scan to get the exact number for every CountRows call. But Dataverse also supports an exact count with CountIf up to 50,000 rows. It supplies these two different capabilities as a way to help preserve good performance of Dataverse server. In contrast, SharePoint doesn't support this function. So, a Power Fx expression with CountRows or CountIf for SharePoint isn't delegated. Instead, Power Apps downloads a limited number of rows, 500 – 2000. Power Fx works on the 500/2000 records locally and returns a result. If your data is always less than 500/2000 records this approach can work. But if it's greater than 500/2000 records you might get incorrect results. 

### Avoid too many columns
By default, Power Apps computes the actual columns you need for a given query using a feature call **Explicit Column Selection**.  This feature is on by default for all new apps. To turn on the explicit column selection feature on the canvas app, go to **Settings** > **Upcoming features** > **Preview**> turn on **Explicit column selection** toggle.


## Suggestions
To achieve the goal of a small data payload, consider the following questions and suggestions:
1. Aim for the default query for a gallery or table to only return approximately 100 – 200 records. If you use a delegable query, this happens automatically. If you're querying an API, or other source that doesn't support delegation, use parameters to refine the results. 

    - Consider using a data source based view that automatically filters the data.  Most enterprise-grade apps make heavy use of views on the data source.
    - Consider using default lookup or filter values to scope the data.  
    -	Consider requiring search arguments in the UI before you show data.
    - Consider these questions about your app:
        - What is necessary on a given screen by default? 
        - What data does the end user really need to take a given business action? 
        - Users generally don’t need thousands of records on an initial screen to accomplish a task.  
    
2. Start building your query for a gallery or table by using the [delegation tables](delegation-overview.md) for your data source. Only choose the functions supported for your query. If your query isn't delegable, what can you do to make it delegable?

---

## Optimized query data patterns in Power Apps

Source: [optimized-query-data-patterns.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/optimized-query-data-patterns)

*Optimized query data patterns in Power Apps.*

# Optimized query data patterns
The simplest and fastest data query pattern is:

1. A single table or view
2. Prefiltered on the server to what you need
3. Columns are indexed correctly for the expected queries
 
When you design your app, you need to think about how to query the data quickly. The best way to query data is to use a single table or view that has all the information you need, and filter it on the server before you display it in your app. You also need to make sure that the columns you use to filter or sort the data are indexed properly. This makes your app faster and smoother.

For example, suppose you have a gallery that shows a list of customers and their salespersons. If you store the customer and salesperson information in separate tables, you need to use lookups to get the salesperson name for each customer. This slows down your app because it needs to run many queries to the other table. A better way is to create a view that combines the customer and salesperson information in one table, and use that view as the data source for your gallery. Then your app only needs to run one query to get all the data it needs.

There's a trade-off between query speed and data normalization. Data normalization means that you store the data only once, and avoid duplication. This helps to keep the data consistent and accurate. However, sometimes you need to duplicate some data to make the queries faster and easier. You need to balance these two goals in your app design and table structure. Otherwise your app will be slow and laggy because it needs to do numerous work to filter and join the data from different tables.

## Use server-side views
Views are probably the most common tool to help balance these goals.  They present a single table structure for queries, prefilter data for what you need in the query, and enable lookups and joins to other tables. Because the filters, lookups and joins for the view are computed on the server, both the payload and client-side compute are minimized. 

## Avoid too many lookups on a gallery
A gallery can display many records from a data source. But sometimes, you need to show additional information from another data source that is related to the original one. For example, you have a gallery that shows a list of customers, and you want to show the name of the salesperson who is assigned to each customer. The salesperson’s name is stored in a different data source than the customer’s information. To show the salesperson’s name, you need to use a lookup function that finds the matching record in the other data source. This expands the original table with the lookup values.

However, expanding the table can be very slow if you have many records and many lookups. For each record in the gallery, the app needs to run a separate query to the other data source and get the lookup value. This means that the app may need to run many queries for each record, which can take a long time and affect the app performance. This anti-pattern is sometimes known as “N squared, (n^2)" or an "N+1" problem.

## Use StartsWith or Filter
Power Fx provides several ways to search data. In general, use an expression that leverages an index like **StartsWith** or **Filter** instead of one that reads the entire table like **In**. The In operator is fine for in-memory collections or if the external data source table is very small.

## Consider duplicating data 
Sometimes data is slow to access in a query because it is stored in a different location or format. To make the query faster, you can copy the slow data and store it locally in a table that is fast and easy to query. However, this means that the local data may not be the most updated version of the original data. Then run another process to update the local data periodically. This process can be a Power Automate flow, a plugin, a stored procedure, or any other method that can move data from one place to another.

The frequency requirement of updating the local data depends on your business needs. How fresh does the data need to be for your app? For example, suppose you work for Contoso, a company that sells bicycles. The list of available bicycles is stored in a Products database that you can access through an API in a custom connector. But say the API call is slow, and so you decide to copy the product data and store it locally in a table. Then you create a view that combines your table with other relevant data for your app. You also create a Power Automate flow that runs every day and updates your table with the latest product data from the API. Then your app can query the local data faster, and the data is only one day old at most.

Duplicating data is a common type of technique in enterprise-grade applications to ensure good performance. You can use Dataverse plugins, stored procedures, or data movement to duplicate data into a single table that is optimized for querying. The key question is: how up to date must this data be? If you can afford some delay, you can use this technique to speed up your app.

## Suggestions

To achieve this goal, consider the following questions and suggestions:

1. How important is it for a customer to see the data value in a gallery or data grid? Would it be acceptable to first select a record and then show the data in a form?
2. Can a view do the prework necessary to see data in the right format?
3. Are you using an "IN" operator where a "StartsWith" will work? 
4. How current does your data need to be? Is there a data duplication strategy you can use to get your query to work over a single table by default?

---

## Speed up app or page load in Power Apps

Source: [fast-app-page-load.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/fast-app-page-load)

*Optimizing app and page loading for peak performance in Power Apps.*

# Optimize app or page load for peak performance

One of the key factors that shape a user's perception of an app is how quickly it opens and becomes functional. Therefore, prioritizing this goal is crucial in building a performant app. To achieve optimal app performance, there's three main areas that require attention:

1. Load data fast
2. Efficient calculations
3. Minimizing required resources

Each of these areas has several common anti-patterns.

## Load data fast

Follow these guidelines to achieve fast data loading apps.

### Avoid directly populating a collection with large amounts of data
Sometimes authors use ClearCollect() to copy data from a server to a collection in their app. This practice is a work-around for delegation limitations in the source or because they plan to use collections in the app for other purposes. Using ClearCollect() can potentially increase the speed of the app when the collection is later utilized. However, it's important to exercise caution while implementing it. Using ClearCollect in this manner can lead to slower app load times or when navigating between pages. ClearCollect() must finish before you can see the data in a gallery or a table. This step can take a long time if there's lots of data or if you use this approach for too many data sources. Collections are best used for situations where the data is small and you need to do many calculations on the collection. For example, a good use of collections is an Online order basket. The customer may update and remove items several times before choosing to commit the order.  Additionally, you may augment the collection with more data items like potential discounts, highlights, etc. Data that is 'read-only' should be accessed natively - without bringing it into a collection.

### Consider avoiding calling Power Automate to populate a collection
This issue is a slight variation of the previous section. Sometimes authors also use Power Automate to populate their collection in Power Apps. There's approximately a 0.6-second performance cost to instantiate Power Automate. Power Automate must be independently launched each time it's called. It must allocate memory, get situated with the right components, and be ready to run.  As with the above advice, one or two calls to Power Automate might not be an issue depending on your app. But, almost universally, the worst performing apps overuse this approach. The performance cost can add up quickly and ruin the performance of your app.

### Avoid using SaveData() and LoadData() as a full offline scenario
Some authors use ClearCollect() and then SaveData() to store data for general purpose offline use. You can use SaveData() to save the collection to your device, and LoadData() to load it when you're offline. However, this approach isn't recommended for instances where there's a large amount of data or if the data is complex. It makes your app slower because it has to wait for ClearCollect() to finish before it can show the data. You should only use SaveData() and LoadData() for small and simple data scenarios such as preferences and short lists. A better way to work with large amounts of offline data is to use the Power Apps offline feature that works with Dataverse. This feature can handle larger and more complex data more efficiently.

### Use Explicit column selection
Explicit column selection is on by default. However, some authors turn this feature off. The issue is that with Explicit column selection (ECS) turned on, columns are sometimes not retrieved from the data source if the data is first retrieved into a collection. As some tables may have many columns, ECS automatically computes which columns are necessary to retrieve based on their usage in controls (for example, galleries and forms.) As some tables can many columns, reducing the size of the download can speed up performance. Some tables can have a hundred columns or more. If your app only needs to use 10 columns, and you bring down all the columns from a 100 column table, you are bringing down ten times as much data as you actually need.

Most issues arise when bringing data into collections. If a column is explicitly referenced in a control then ECS works well.  And, ECS generally does work for collections. However, the column lineage is occasionally lost when the data moves through collections and variables.  And, and so Power Apps may lose track of the column it should retrieve. To resolve this issue, you can force Power Apps to "remember" the column by using the `ShowColumns` function. For example:

```power-fx
    ClearCollect(
        MyColTable, 
        ShowColumns(Filter(BankAccounts, AcountNo = 32),
        "Col1", 
        "Col2", 
        "Col3")
    );
```

   Where `Col1`, `Col2`, and `Col3` are columns you expect to be retrieved from the data source (for example, the `Account` data source).

   Alternatively, you can add a hidden control to your form that references the column. This forces Power Apps to "remember" the column.

## Fast calculations
Fast (or efficient) calculations are a performance goal in its own right. For more information, see [Fast (efficient) calculations](efficient-calculations.md). However there are some common anti-patterns that can affect app load as well and so we discuss them here. Below is a list of  optimizations you should consider that might affect app launch or page navigation.

### Use App.Formulas
Historically many authors have put a large number of calculations in OnStart. When you place an expression in OnStart, it forces Power Apps to run that expression precisely when the app starts and before everything else. However, with the introduction of App.Formulas you can let Power Apps decide when to run an expression. Power Apps can run the formula 'Just-in-time' before it's needed. For more information, see [App formulas](/power-platform/power-fx/reference/object-app). Use App.Formulas to split up your formula into pieces that Power Apps can arrange more efficiently for execution. 

### Use Concurrent
Use the Concurrent function to allow formulas to be executed at the same time. It's common to use this function to populate collections as it allows for parallel execution. While this can provide some modest speed ups, adding many data sources can cause timing and throttling issues.  

### Use Enhanced performance for hidden controls
When enabled by default in all new apps created since December 2022, Power Apps doesn't render any control that isn't initially visible.

## Minimize required resources
Minimize the resources required to launch your app or screen. This effort includes carefully scoping or partitioning the resources your app or screen needs. Below are several approaches to help you. 

### Use a low dependency start screen and eliminate unused screens.
Use a low-dependency first screen such as a welcome on your application. Create a screen that doesn't load a gallery or table or reference data. This manages the user's perception of speed and allow Power Fx to properly delay some calculations to later. If you have any unused screens, remove them. 

### Keep cross screen dependencies between screens low
Cross page references force the load of additional pages via references, for example, referencing controls on pages and putting into collections. Some references might be unavoidable.  Centralize common references to a single page if possible so that only page is loaded.

### Consider embedded media
Authors sometimes embed media in their apps to ensure fast loading. If you have embedded media consider whether or not, you're using it.  If not, delete it. If you have embedded a .png file, consider substituting a .svg file which is smaller. Note that if you use a .svg, the font for the .svg must be on the client machine. Consider the embedded media resolution. Is it too high for the device it will used on?

### Don't forget App.StartScreen
If you use App.StartScreen, ensure the first screen is a blank screen.  Due to current packaging of the app, the first logical screen is always bundled with the app init logic and will get initialized, regardless of whether we ever navigate to it.

### Consider splitting up the app
If your app is large, consider partitioning it into smaller apps. If the functionality is separate enough in different parts of your app, this approach might work. In this scenario, you create an actual separate app that you launch with parameters that include context from the first or parent app.  



## Suggestions
To achieve the goal of a fast app and page start, consider the following questions and suggestions:

1. Are you loading lots of data in a first screen?  Can you use a different first screen? 
1. Are you running many commands or Power Fx expressions at the beginning of the app load? Can you defer these commands and expressions to a later point in the application? Only get the data you actually need to start the app? 
1 Can you convert expressions in App.OnStart to named formulas with App.Formulas?  This allows Power Fx to decide when to actually execute the formula rather than forcing it to happen on load or navigate events. 
1. Can you use a separate Power Automate flow to create a temporary table in a local data store such as Dataverse that combines data from different sources? And then access that data in your Power App? 
1. For business process kick offs, can you use Server triggered actions rather than calling a Power Automate Flow?
1. Can you create a view on the server that joins the data for you?
1. If you want to use offline data in your app, can you use the Power Apps offline feature that works with Dataverse? If your data isn't in Dataverse, can you move it there?

---

## Efficient calculations in Power Apps

Source: [efficient-calculations.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/efficient-calculations)

*Efficient or fast calculations in Power Apps*

# Fast calculations

Power Fx expressions are powerful and do many background calculations for you automatically. While Power Fx automates many things for you, it's possible to fine-tune your calculations so there as fast as possible. 

## Data retrieval 

### Use Explicit column selection
The Explicit Column Selection (ECS) feature is enabled by default for all new apps. If it isn't enabled for your app, you should enable it. ECS automatically reduces the number of columns retrieved to only the ones that are used in the application. If ECS isn't enabled, you might be retrieving more data than you need, which can affect performance. Occasionally, when an app pulls data in through collections, the original lineage or source of a column can be lost. We don't know if it’s being used and we drop it using ECS. You can usually force ECS to work for a missing column by using the PowerFx expression **ShowColumns** after a collection reference or by using it in a control.

### Use images on galleries, tables, and forms carefully
Use Dataverse thumbnail versions of images for galleries and tables. Dataverse thumbnails are small about 1 kilobyte and are stored inline as part of the record, and are useful and fast for display on controls that show collections. All other image references including all SharePoint images require a separate call and shouldn't be placed on a gallery or table. Place images that require a separate call on detail forms. Consider never showing a full image by default. Full detailed images can be useful and important to users. However, you can make these images available to users through an explicit user action, for example, a button or navigation to a separate page. SharePoint has a range of intermediate sized images you can use for use on a form short of the full image. Dataverse only has two sizes: Thumbnail and Full.

## Calculations

### Split up formulas with App.formula
The use of App.formulas and named formulas can help with the speed of app load and page navigation because it allows Power Fx to decide when to evaluate a formula. That means it doesn't have to necessarily evaluate it in OnStart. In addition, named formulas can generally help speed as well. In particular if you have a long script, breaking it up into named formulas allow for more efficient calculations as Power Fx can schedule the work and it enables reuse. For more information, see [App formulas](/power-platform/power-fx/reference/object-app).

### Use Concurrent
Use the [Concurrent](functions/function-concurrent.md) function to allow formulas to be executed at the same time. Carefully choose where concurrent is used. It can provide some modest speed  ups but if you're running items that depend on each other it can cause timing and throttling issues.  

### Defer significant updates to a nonblocking UI step
Large updates to a data source may take a while to complete. But users expect the UI to return control to them quickly. Tasks may be either sequential where the update must finish before the user can take another actions or asynchronous (the update can finish separate of user actions.)

An example of a time-consuming synchronous task is confirming a seat at a concert.  For most time-consuming synchronous tasks like this, it’s common to put up a progress bar. This UI actually blocks the user but ensures that the task is complete before other UI elements are updated.  This approach may not work for your application.  Businesses normally handle longer sequential steps as an explicit business step.  You're approved to go the next step via a business process signal.  An example is an approval.  An approval may come quickly or may be delayed.  In the UI you can signal that the process is complete several ways.  You can enable a button, show a message, send e-mail, or enable a part of the UI such as a menu item.

An example of an asynchronous task is the completion of an order.  A customer updates an order basket, works through their order and then places the order. But several updates must happen before the customer is given a confirmed ship date.  In this example, the Ship Date isn't something you can easily provide right away. , you can defer this part of the update to an e-mail that is sent to the customer later.

For synchronous tasks, you'll often use the code in Power Apps for UI blocking tasks. For instance, the code waits until it gets a return value and then releases the progress bar. It is best to minimize these types of situations. But for tasks that use an explicit business step or asynchronous tasks it's common to use an external service to complete the task such as a Dataverse action, stored procedure, or a Power Automate flow.

### Place 'ForAll' appropriately
If you have an expression with ForAll and collect that looks like this:
```power-fx
ForAll(x, Collect(y, { … }))
```
Then, invert this to 
```power-fx
Collect(y, ForAll(x, { … }))
```
In the first pattern, any dependent rule on collection y is notified of changes and evaluated for each iteration of x.  In the second pattern, these rules are only evaluated once.
 
### Consider avoiding references to Gallery.AllItems 
When working with Power Apps, it’s best to avoid referencing Gallery.AllItems unless you need out user values. This is because every time AllItems is read, a new output table is generated. Instead, use Gallery.AllItemsCount if you just want to know how many items are loaded.

### Carefully use Gallery.TemplateSize
To ensure that flexible-height galleries are rendered correctly, it’s important to set a reasonable default size. Initially, we try to render as many rows as possible based on this value. If you set the default size to 0, we try to render everything, except for a few edge cases. If you’re using a formula, make sure to set a minimum value for when the formula might evaluate to 0. For example, you could use Max (20, varFoo + rectBar.Height). This way, if varFoo and rectBar.Height aren’t yet available, we at least use a reasonable value of 20.

### Note DelayOutput especially for search
 There's one second delay before the changes is detected, which allows you to complete the typing instead of detecting the changes for every typing.

---

## Performance considerations for Power Apps

Source: [app-performance-considerations.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/app-performance-considerations)

*Other performance considerations for Power Apps*

# Other performance considerations
In addition to the [four key performance principles](create-performant-apps-overview.md), there are several other possible reasons for poor performance typically due to external factors. 

## Consider the differences in Client browsers, devices, and locations
Canvas apps can be used on different devices, browsers, and locations with varying network conditions. As the Power Apps client is executed, be sure to use modern, updated, and supported browsers. The performance of an app might vary when loading large sets of data on different platforms like iOS or Android. This variation happens because of different network request limitations on each platform. For example, the number of concurrent network requests allowed differs by platform. These differences can have a major impact act on the data load time for large datasets.

## Consider the differences in Geographic location of the on-premises data gateway and environment
Users can access canvas apps globally. However, we recommend that you locate the data source near most of your users. For example, when your app accesses your on-premises data gateway, it’s best to place the gateway near the users who is accessing the app most frequently.

## General Server-side issues
Poor performance might be caused by problems at the server source of the data. This can happen for various reasons. You can use the monitoring tool to assess the specific issue by measuring the data call timings.

### Possible bottlenecks issues in the data source
There are many possible causes of bottlenecks in the data source. Usually, a few tables in the data source are at the center of activity for many queries. Queries might be slow if:

* The data source is missing or has incorrect indexes.
* The query is joining extra-ordinary large amounts of data on the server.
* The query requires a table SCAN, for example, **In** operator instead of using an index like **StartsWith**.
* The back-end machine hosting the data source is low on resources.
* The back-end SQL instance has blockings, deadlocks, or resource contention.
* The on-premises data gateway is unhealthy.
* The on-premises data gateway should be scaled out.

When these problems occur, tune the back-end data source to avoid slowing the app’s performance.

## Specific data sources

### Azure SQL Database
It's important to select the right tier for your business requirements. For more information, see [Azure SQL Database documentation](/azure/azure-sql/database/sql-database-paas-overview). A lower tier has some limitations and constraints. From a performance perspective, CPU, I/O throughput, and latency are important. Therefore, we recommend that you check the performance of the SQL database periodically, and check whether resource usage exceeds the threshold. For example, on-premises SQL Server normally sets the threshold of CPU usage to around 75 percent.

### SharePoint

The SharePoint connector can be used to create apps that use data from SharePoint Lists. Here are some common performance problems and resolutions for SharePoint:

**Avoid too many dynamic lookup columns**: SharePoint supports various data types, including dynamic lookups such as Person, Group, and Calculated. If a list defines too many dynamic columns, it takes more time to manipulate these dynamic columns within SharePoint before returning data to the client running the canvas app. To avoid this, don’t overuse the dynamic lookup columns in SharePoint. For example, use static columns to keep email aliases or people’s names.

**Carefully use the picture column and attachment**: The size of an image and an attached file can contribute to a slow response while retrieving to the client. Review your list, and ensure that only necessary columns have been defined. The number of columns in the list affects the performance of the data requests. This is because the matched records, or the records up to the defined data row limits, are retrieved and transmitted back to the client with all the columns defined in the list—even if the app doesn’t use all of them.

**Consider breaking up large lists**: If you have a large list with hundreds of thousands of records, consider partitioning the list or splitting it into several lists based on parameters such as categories, or date and time. For instance, your data might be stored in different lists on a yearly or monthly basis. In such a case, you can design the app to let a user select a time window and retrieve the data within that range.

### Dataverse
When you use Microsoft Dataverse as the data source, data requests go directly to the environment instance without passing through Azure API Management. So, it tends to be faster than other data sources.  For more information, see [Data call flow when connecting to Microsoft Dataverse.](execution-phases-data-flow.md#data-call-flow-with-microsoft-dataverse)

**Check custom table configurations**: If custom tables are used in Dataverse, additional security configuration might be required for users to view the records with canvas apps. For more information, see [Security concepts in Dataverse](/power-platform/admin/wp-security-cds), [Configure user security to resources in an environment](/power-platform/admin/database-security), and [Security roles and privileges.](/power-platform/admin/security-roles-privileges)

### Excel

The Excel connector allows a canvas app to connect to a table in an Excel file. However, this connector has limitations compared to other data sources. For example, it restricts the canvas app to loading data from the table only up to 2,000 records due to limited delegable functions. To load more than 2,000 records, partition your data in different data tables as other data sources.

**Use the new Excel connector**: Be sure to use the new Excel connector - Excel business online. It allows for multi-user access and handles contention issues better. 

**Only use the columns you need from large data lists in Excel**: An app can perform slowly if the Excel file that has too many data tables or data tables that contain an immense amount of data over several columns. To ensure that your app isn’t affected by this problem, define only the columns you need on the data table in an Excel file.

**Note the limitations of Excel as a database.**  Excel isn’t a relational database system : Any changes from an app are managed by Excel in the same way as if a user were changing data in an Excel file directly. If the app has a high number of reads, but fewer update operations, it might perform well. However, if the app requires heavy transactions, it can adversely affect the performance of the app. There’s no specific threshold value for the number of transactions. It also depends on the data being manipulated. Several other aspects also affect the app’s performance, such as network overhead or the user’s device.

**Consider the differences in geographic location**: The geographic location of the data and its distance from customer locations can be a performance issue. This issue can be amplified if a mobile client has limited bandwidth.

## Enable Preload app for enhanced performance

You can optionally preload your app to increase performance.

1. Sign in to [Power Apps](https://make.powerapps.com).

2. On the left navigation pane, select **Apps**.

3. Select the app and then select **Settings** on the command bar.

4. In the **App settings** pance, set the **Preload app for enhanced performance** to **Yes**. The app will then pre-load.
 
5. For the changes to take effect for apps embedded in Teams, remove and add your app into Teams again.

    > [!NOTE]
    > This makes the compiled app assets accessible via unauthenticated endpoints to enable loading them before authentication. However, users can still only use your app to access data via connectors only after authentication and authorization completes. This behavior ensures that the data an app retrieves from data sources won’t be available to unauthorized users. Compiled app assets include a collection of JavaScript files containing text authored in app controls (such as PCF controls), media assets (such as images), the app name, and the environment URL the app resides in.
    > 
    > In general, apps should retrieve media and information from data sources, through connections. If media and information must be added to the app, without coming from a connection, and it is considered sensitive you may want to disable this setting. Note, disabling this setting will result in users waiting a bit longer to access an app.

---

## Build large and complex canvas apps

Source: [working-with-large-apps.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-large-apps)

*Learn how to work efficiently with large and complex canvas apps in Power Apps Studio.*

# Build large and complex canvas apps

Most of the articles in this section of the documentation cover the runtime performance of apps as experienced by the people who use them. This article covers app performance as experienced by the people who make them.

As apps become larger and more complex, Power Apps Studio needs to load and manage larger numbers of controls, formulas, and data sources, all with interdependencies that grow exponentially. Power Apps Studio can take longer to load, and features such as IntelliSense and color coding can lag. Use the recommendations that follow to better work with large and complex apps in Power Apps Studio. They can also help to improve your apps' runtime performance.

The examples in this article use the [Hospital Emergency Response sample solution](../../sample-apps/emergency-response/overview.md).

## Use App.Formulas instead of App.OnStart

> [!TIP]
> You can use [With](/power-platform/power-fx/reference/function-with) function and canvas component custom output properties as an alternative to named formulas.

The best way to reduce loading time for both Power Apps Studio and your app is to replace variable and collection initialization in **App.OnStart** with [named formulas in **App.Formulas**](/power-platform/power-fx/reference/object-app#formulas-property).

Let's look at the following example, which uses App.OnStart.

```power-fx
// Get the color of text on a dark background.
Set(varColorOnDark,RGBA(0, 0, 0, 1));

// Get the color of the menu icons.
Set(varColorMenuIcon,"#0070a9");

// Get the styles for a form.
Set(varFormStyle,
    {
        DataCard: { Height: 50 },
        Title: { Height: 50, Size: 21, Color: varColorOnDark },
        Control: { Height: 50, Size: 18 },
        Label: { Size: 18, Color: varColorOnDark }
    }
);

ClearCollect(
    FacilitiesList,
    ForAll(
        Facilities,
        { Name: 'Facility Name', Id: Facility }
    )
);
If(
    Not IsBlank(Param("FacilityID")),
    Set(ParamFacility,
        LookUp(
            FacilitiesList,
            Id = GUID(Param("FacilityID"))
        ).Name
    );
);
```

Because they're a sequence of statements, your app must evaluate these **Set** and **Collect** calls in order before it can display the first screen, which makes the app load more slowly. And because the entire **App.OnStart** must be considered as a whole, order preserved, and errors aggregated before returning the final result, the formula is complex for Power Apps Studio to analyze.

There's a better way. Use **App.Formulas** instead and define these variables and collections as named formulas, as in the following example.

```power-fx
// Get the color of text on a dark background.
varColorOnDark = RGBA(0, 0, 0, 1);

// Get the color of the menu icons.
varColorMenuIcon = "#0070a9";

// Get the styles for a form.
varFormStyle = 
    {
        DataCard: { Height: 50 },
        Title: { Height: 50, Size: 21, Color: varColorOnDark },
        Control: { Height: 50, Size: 18 },
        Label: { Size: 18, Color: varColorOnDark }
    };

FacilitiesList =
    ForAll(
        Facilities,
        { Name: 'Facility Name', Id: Facility }
    );

ParamFacility = 
    If( Not IsBlank(Param("FacilityID")),
        LookUp(
            FacilitiesList,
            Id = GUID(Param("FacilityID"))
        ).Name,
        Blank()
    );
```

This change may seem small, but it can have a huge impact. Because each named formula is independent of the others, Power Apps Studio can analyze them independently, effectively splitting a large **App.OnStart** into smaller pieces. We've seen Power Apps Studio load time drop by as much as 80% with this change alone.

Your app also loads faster because it doesn't have to evaluate these formulas until it needs the result. The first screen of the app is displayed immediately.

Named formulas can't be used in all situations because you can't modify them or use them with **Set**. Some situations require the use of a state variable that can be modified. **Set** is perfect for these situations and you should continue to use it. But, more often than not, you're using global variables in **OnStart** to set up static values that don't change. In those cases, a named formula is the better choice.

Since named formulas are immutable, the prefix `var` (short for "variable") as a naming convention is no longer appropriate. We didn't change the names in this example because it would require changes to the rest of the app to match.

It's tempting to place a named formula in **App.OnStart**, but don't. They don't belong there. As an **On** behavior property, **App.OnStart** evaluates each of its statements in order, creating global variables, and talking to databases *only once, when the app is loaded*. Named formulas are formulas that define how to calculate something *whenever needed* and are always true. It's this formula nature that allows them to be independent and allows the app to finish loading before they're evaluated.

## Split up long formulas

**App.OnStart** is one of the worst offenders for long formulas and definitely where you should start, but it isn't the only case.

Our studies have shown that nearly all apps with a long load time for Power Apps Studio have at least one formula of more than 256,000 characters. Some apps with the longest load times have formulas of more than 1 million characters. Formulas that long put a significant strain on Power Apps Studio.

To make matters worse, copying and pasting a control with a long formula duplicates the formula in the control's properties without it being realized. Power Apps is modeled after Excel, where multiple copies of a formula are common. However, in Excel formulas are limited to one expression and are capped at 8,000 characters. Power Apps formulas can grow much longer with the introduction of imperative logic and the chaining operator (`;` or `;;`, depending on locale).

The general solution is to split long formulas into smaller parts and reuse the parts, as we did in the previous section when we changed **Set**/**Collect** statements in **App.OnStart** to named formulas in **App.Formulas**. In other programming languages, reusable parts are often referred to as subroutines or user-defined functions. You can think of named formulas as a simple form of user-defined function with no parameters or side-effects.

### Use named formulas everywhere

In the earlier example, we used named formulas as a replacement for **App.OnStart**. However, you can use them to replace a calculation anywhere in an app.

For example, one of the screens in the Hospital Emergency Response sample solution includes this logic in **Screen.OnVisible**:

```power-fx
ClearCollect(
    MySplashSelectionsCollection,
    {
        MySystemCol: First(
            Filter(
                Regions,
                Region = MyParamRegion
            )
        ).System.'System Name',
        MyRegionCol: First(
            Filter(
                Regions,
                Region = MyParamRegion
            )
        ).'Region Name',
        MyFacilityCol: ParamFacility,
          MyFacilityColID:  LookUp(
            FacilitiesList,
            Id = GUID(Param("FacilityID"))
        ).Id
    }
); 
```

This formula can be split into a set of named formulas. It also makes the formula easier to read.

```power-fx
MyRegion = LookUp(
                    Regions,
                    Region = MyParamRegion
           );

MyFacility = LookUp(
                    FacilitiesList,
                    Id = GUID(Param("FacilityID")
            );

MySplashSelectionsCollection = 
    {
        MySystemCol: MyRegion.System.'System Name',
        MyRegionCol: MyRegion.'Region Name',
        MyFacilityCol: ParamFacility,
        MyFacilityColID:  MyFacility.Id
    };
```

We extracted **ParamFacility** as a named formula earlier when we moved most of the **Set** calls from **App.OnStart** to named formulas in **App.Formulas**.

Named formulas are evaluated only when their values are needed. If the original intent of using **Screen.OnVisible** was to defer work until the screen is shown, then the work is still deferred as global named formulas in **App.Formulas**.

### Use the With function

You can also use the **With** function in a formula to split up logic. Create a record in the first parameter with the values you want to use as fields, and then use those fields in the second parameter to calculate the return value from **With**. For example, the previous example can be written as just one named formula:

```power-fx
MySplashSelectionsCollection = 
    With( { MyRegion: LookUp(
                            Regions,
                            Region = MyParamRegion
                      ),
            MyFacility: LookUp(
                            FacilitiesList,
                            Id = GUID(Param("FacilityID")
                      ) 
           },
           {
                MySystemCol: MyRegion.System.'System Name',
                MyRegionCol: MyRegion.'Region Name',
                MyFacilityCol: ParamFacility,
                MyFacilityColID:  MyFacility.Id
           }
    )
```

One downside to using **With** this way is that `MyFacility` can't use `MyRegion` because they're defined in the same **With** function, a problem that's not present with named formulas. One solution is to nest **With** functions and use the **As** keyword to name the record for each to give easy access to all the **With** variables.

### Use canvas components

Canvas components are most often used to create a UI control that can be placed on the canvas just like a control. You can also use them without placing them in the UI to perform calculations with custom output properties as an alternative to named formulas. Canvas components are easy to share across apps with component libraries and, unlike named formulas, are fully supported. However, they're harder to configure and use than named formulas.

To split logic:

1. In Power Apps Studio, switch to the **Components** tab in the **Tree view**.
1. Create a new component.
1. In the **Properties** pane, turn on **Access app scope**.
1. Add a custom property.
1. Set the **Property type** to **Output** and the **Data type** as appropriate.
1. Select **Create**.
1. In the property picker next to the formula bar at the top of the screen, select the new property.
1. Write the formula for the logic to split and reuse.

To use the logic:

1. Switch to the **Screens** tab in the **Tree view**.
1. In the **Insert** pane, expand **Custom** and insert your component.
1. To calculate a value with the property, use *ComponentName.PropertyName*.

### Use Select with a hidden control for imperative logic

Imperative logic is used to modify state with **Set** and **Collect**, notify the user with **Notify**, navigate to another screen or app with **Navigate** and **Launch**, and write values to a database with **Patch**, **SubmitForm**, or **RemoveIf**.

Named formulas and canvas component custom output properties don't support imperative logic. A common way to split up imperative logic is to use the **OnSelect** property of a hidden control.

1. Add a **Button** control to a screen.
1. Set the **OnSelect** property to the imperative logic you want to execute.
1. Set the **Visible** property to false, since there's no need for the user to see or interact with it.
1. Call `Select( Button )` when you want to execute the imperative logic.

For example, one of the screens in our sample has the following **OnSelect** property on a **Button** control. (This simple example is for illustration purposes only. Normally, you would only use this technique for longer formulas.)

```power-fx
btnAction_17.OnSelect = 
    Trace("Feedback Screen: Submit Button",TraceSeverity.Information);
    If(
        // Proceed if all forms are validated.
        And(
            FormFeedback.Valid
        ),
    
        // Set the updates to static variables.
        Set(updatesFeedback,Patch(Defaults('App Feedbacks'), FormFeedback.Updates));
        // Submit the first form. Subsequent actions can be found in the OnSuccess.
        SubmitForm(FormFeedback);
        ,
    
        Notify("Please complete all fields before proceeding",
               NotificationType.Warning,2000)
    );
```

To split this logic into parts, we can put portions onto separate **Button** controls and **Select** them from the original:

```power-fx
btnTrace.OnSelect = 
    Trace("Feedback Screen: Submit Button",TraceSeverity.Information);

btnSubmit.OnSelect = 
    If(
        // Proceed if all forms are validated.
        And(
            FormFeedback.Valid
        ),
    
        // Set the updates to static variables.
        Set(updatesFeedback,Patch(Defaults('App Feedbacks'), FormFeedback.Updates));
        // Submit the first form. Subsequent actions can be found in OnSuccess.
        SubmitForm(FormFeedback);
        ,
    
        Notify("Please complete all fields before proceeding",
               NotificationType.Warning,2000)
    );

btnAction_17.OnSelect = 
    Select( btnTrace );
    Select( btnSubmit );
```

This technique only works on the same screen. Other techniques that are slightly more complicated work across screens, like using the **Toggle** control, setting **OnCheck** to the logic you want to run, and setting **Default** to a global variable and then toggling the global variable with `Set( global, true ); Set( global, false )` at the point you want to run the logic.

In this example, some logic splitting had already been done. The comment mentions that "Subsequent actions can be found in OnSuccess." This event runs imperative logic after the record has been successfully submitted, a solution specific to the **SubmitForm** function.

## Partition the app

Some apps grow to thousands of controls and hundreds of data sources, which slows Power Apps Studio. As with long formulas, large apps can be split into smaller sections that work together to create one user experience.

### Separate canvas apps

One approach is to implement sections in separate canvas apps and use the **Launch** function to navigate between the separate apps and pass needed context.

This approach was used in the [Hospital Emergency Response sample solution](../../sample-apps/emergency-response/overview.md). Separate apps manage each of the major areas of the overall app. The apps share a common switchboard component through a component library that each app shows on its startup screen:

:::image type="content" source="media/working-with-large-apps/app-components.png" alt-text="Screenshot of the Hospital Emergency Response Sample solution canvas app running on a phone, showing the switchboard canvas component.":::

When the user selects an area, the component uses metadata about the apps available and which app is hosting the component. If the desired screen is in this app (that is, **ThisItem.Screen** is not blank), then a **Navigate** call is made. But if the desired screen is in a different app (that  is, **ThisItem.PowerAppID** is not blank), then a **Launch** function is used with the App ID of the target and the FacilityID context:

```power-fx
If(
    IsBlank(ThisItem.Screen),
    If(IsBlank(ThisItem.PowerAppID), 
        Launch(ThisItem.URL),           
        Launch("/providers/Microsoft.PowerApps/apps/" & ThisItem.PowerAppID, 
               "FacilityID", Home_Facility_DD.Selected.Id)
    ),
    Navigate(
        ThisItem.Screen,
        Fade
    )
);
```

State in the original app is lost when another app is launched. Be sure to save any state before you call the **Launch** function. Write it to a database, call **SaveData**, or pass state to the target app with parameters that are read with the **Param** function.

### Model-driven app with custom pages

Sections can also be implemented as [custom pages](../model-driven-apps/model-app-page-overview.md). Custom pages act as a mini canvas app with a model-driven app container for navigation.

---

## Build business logic

Source: [app-business-logic.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/app-business-logic)

*Build business logic in Power Apps.*

# Build business logic

Power Platform offers various capabilities for makers to build business logic for Power Apps. In this article, you find an overview of the key methods and offer guidance to help determine the most suitable approach building business logic for Power Apps.

## Use Power Fx in your app

Power Fx is the low code functional programming language shared by Excel and Power Platform. When used with Power Platform connectors, makers can access data and create custom app logic. Power Fx supports the following characteristics:

- **Live** – Canvas apps recalculate just as Excel spreadsheets do. As users interact with the app, Power Fx is in the background making data requests and keeping the state of the app up to date with Dataverse.

- **Delegation** – Power Fx optimizes data handling by delegating operations to the server whenever possible. Functions like [Filter()](/power-platform/power-fx/reference/function-filter-lookup), [Lookup()](/power-platform/power-fx/reference/function-filter-lookup), and [Search()](/power-platform/power-fx/reference/function-filter-lookup) enable server-side data filtering, ensuring that only the necessary data is retrieved to support the app's functionality and user experience. In cases where delegation isn't possible, functions run locally within the JavaScript environment of the browser.

- **Optimized for Dataverse** – Dataverse serves as the primary data storage option for Power Apps, offering direct, and low-latency access due to fewer intermediary layers. Power Fx is also compatible with Dataverse's diverse relationship types, including many-to-one and one-to-many associations.

- **Offline** – The [Power Apps mobile app](../../mobile/canvas-mobile-offline-overview.md) enables offline use of Dataverse data, allowing users to use the app in the field allowing a seamless connection. Any changes made offline are synchronized when internet connection is available. The app's predefined business logic remains operational, even without an internet connection.

## Use cloud flows in your app

Power Automate is a low code workflow service built on top of the Power Platform connector ecosystem. Power Automate adds the following capabilities when building Power Apps:

- **Asynchronous** – A Power Automate cloud flow is inherently asynchronous. This means that when a flow is initiated, it's using a queuing system to manage the various subtasks. The asynchronous nature of Power Automate means makes it well-suited for longer running complex sequences of logic.

- **Detailed logging** – All flows create a record of what happened when they executed in the form of [Run History](/power-automate/dataverse/cloud-flow-run-metadata) providing traceability and ensuring auditing record for what happened and why.

- **Multi-connector** – Although it's possible to create multi-connector Power Apps logic, due to the live nature of Power Apps, as you increase the number of connectors performance degrades. These complex multi-connector scenarios are a great place to use Power Automate which can offload these cases from live execution in the app.

## Choose between Power Fx and cloud flows for your app

We recommend using Power Fx for developing business logic in Power Apps. While it's a powerful tool, there are scenarios where integrating other tools might be more appropriate.

### Low latency use cases

Power Fx excels in delivering low latency for Power Apps, making it the go to choice for developing responsive business logic. However, the actual latency experienced can vary based on the complexity of the operations and the volume of data being processed. It's crucial to understand that while Power Fx can facilitate swift interactions, the design, and objectives of your application play a pivotal role in its overall performance. For more information, see [performance and optimization articles](create-performant-apps-overview.md) earlier in this section.

When it comes to accessing data efficiently, the combination of Dataverse and Power Fx offers the quickest solution.

For more information, see [Data call flow with Microsoft Dataverse](execution-phases-data-flow.md?#data-call-flow-with-microsoft-dataverse).

### Complex sequences and use of multiple connectors

When dealing with complex sequences of action that span various connectors, Power Automate serves as an effective asynchronous solution to delegate processing away from Power Apps. This asynchronous capability lets Power Apps kick off a workflow and proceed with other tasks without having to pause for a response.

## Design app experience around inherent task latency

When designing user experiences, it's essential to consider the latency that comes with executing complex tasks.

There are two strategies:

1. Pause the user experience until the task finishes, providing a visual indicator of progress.

2. Offload the complex task to Power Automate, allowing the user experience to continue uninterrupted.

## Related content

[Overview of creating performant apps](create-performant-apps-overview.md)

---

## Power Apps coding guidelines

Source: [overview.md](https://learn.microsoft.com/en-us/power-apps/guidance/coding-guidelines/overview)

*Learn best practices and coding guidelines for developing Power Apps that are consistent, performant, and maintainable.*

# Power Apps coding guidelines

Creating a simple canvas app is straightforward, but as the application's complexity grows, maintaining high code quality becomes essential. These guidelines describe standards for naming objects, collections, and variables, and provide recommendations for developing consistent, performant, and easily maintainable apps.

The guidelines offer essential guidance for developers who design, build, test, deploy, and maintain Power Apps apps in various environments, including small businesses, corporations, and government entities.



## Next step

> [!div class="nextstepaction"]
> [App design guidelines](app-design-guidelines.md)

---

