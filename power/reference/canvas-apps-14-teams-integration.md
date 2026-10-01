# Power Apps Canvas Apps — Teams Integration (Dataverse for Teams)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 46

## Contents

1. [Power Apps and Microsoft Teams integration - Overview | Microsoft Docs](#power-apps-and-microsoft-teams-integration-overview-microsoft-docs)
2. [Embed a canvas app as tab app | Microsoft Docs](#embed-a-canvas-app-as-tab-app-microsoft-docs)
3. [Embed an app in Teams  | Microsoft Docs](#embed-an-app-in-teams-microsoft-docs)
4. [Create apps in Microsoft Teams by using Power Apps | Microsoft Docs](#create-apps-in-microsoft-teams-by-using-power-apps-microsoft-docs)
5. [Install the Power Apps personal app in Teams| Microsoft Docs](#install-the-power-apps-personal-app-in-teams-microsoft-docs)
6. [Create your first app in Teams | Microsoft Docs](#create-your-first-app-in-teams-microsoft-docs)
7. [Overview of the Power Apps app in Microsoft Teams | Microsoft Docs](#overview-of-the-power-apps-app-in-microsoft-teams-microsoft-docs)
8. [Understand Power Apps Studio in Dataverse for a Teams environment | Microsoft Docs](#understand-power-apps-studio-in-dataverse-for-a-teams-environment-microsoft-docs)
9. [Use the Fluent UI controls in Power Apps app in Microsoft Teams | Microsoft Docs](#use-the-fluent-ui-controls-in-power-apps-app-in-microsoft-teams-microsoft-docs)
10. [Create additional apps using Power Apps app from Teams | Microsoft Docs](#create-additional-apps-using-power-apps-app-from-teams-microsoft-docs)
11. [Create an app from a list in Microsoft Teams](#create-an-app-from-a-list-in-microsoft-teams)
12. [Microsoft Dataverse for Teams overview | Microsoft Docs](#microsoft-dataverse-for-teams-overview-microsoft-docs)
13. [Dataverse for Teams vs. Dataverse | Microsoft Docs](#dataverse-for-teams-vs-dataverse-microsoft-docs)
14. [Comparing Microsoft Lists, Dataverse for Teams, and Dataverse | Microsoft Docs](#comparing-microsoft-lists-dataverse-for-teams-and-dataverse-microsoft-docs)
15. [Create a table in Teams | Microsoft Docs](#create-a-table-in-teams-microsoft-docs)
16. [Delete or edit a table in Dataverse for Teams| Microsoft Docs](#delete-or-edit-a-table-in-dataverse-for-teams-microsoft-docs)
17. [Table relationships in Dataverse for Teams | Microsoft Docs](#table-relationships-in-dataverse-for-teams-microsoft-docs)
18. [Work with Dataverse for Teams table columns | Microsoft Docs](#work-with-dataverse-for-teams-table-columns-microsoft-docs)
19. [Work with Dataverse for Teams formula table columns | Microsoft Docs](#work-with-dataverse-for-teams-formula-table-columns-microsoft-docs)
20. [Edit table data in Excel and publish it back to Dataverse for Teams | Microsoft Docs](#edit-table-data-in-excel-and-publish-it-back-to-dataverse-for-teams-microsoft-docs)
21. [Move customizations between environments | Microsoft Docs](#move-customizations-between-environments-microsoft-docs)
22. [View Dataverse for Teams table data in Power BI Desktop (preview) | Microsoft Docs](#view-dataverse-for-teams-table-data-in-power-bi-desktop-preview-microsoft-docs)
23. [Dataverse for Teams environment language | Microsoft Docs](#dataverse-for-teams-environment-language-microsoft-docs)
24. [FAQs for Dataverse for Teams | Microsoft Docs](#faqs-for-dataverse-for-teams-microsoft-docs)
25. [Use Teams integration object | Microsoft Docs](#use-teams-integration-object-microsoft-docs)
26. [How to build apps for Microsoft Teams](#how-to-build-apps-for-microsoft-teams)
27. [Add notifications to make your apps collaborative](#add-notifications-to-make-your-apps-collaborative)
28. [Integrate your Teams Power Apps with Planner](#integrate-your-teams-power-apps-with-planner)
29. [Integrate Power Apps in Teams with Azure Active Directory](#integrate-power-apps-in-teams-with-azure-active-directory)
30. [Integrate your Teams app with calls and meetings](#integrate-your-teams-app-with-calls-and-meetings)
31. [Enable consistent experience across sessions using LoadData and SaveData functions.](#enable-consistent-experience-across-sessions-using-loaddata-and-savedata-functions)
32. [Have a conversation about your business data in a Teams app.](#have-a-conversation-about-your-business-data-in-a-teams-app)
33. [Build an app in Teams using Power Apps and Dataverse for Teams to retrieve Power Platform videos for readiness | Microsoft Docs](#build-an-app-in-teams-using-power-apps-and-dataverse-for-teams-to-retrieve-power-platform-videos-for-readiness-microsoft-docs)
34. [Manage your apps using Power Apps app in Teams | Microsoft Docs](#manage-your-apps-using-power-apps-app-in-teams-microsoft-docs)
35. [Set permission and share your app using Power Apps in Teams | Microsoft Docs](#set-permission-and-share-your-app-using-power-apps-in-teams-microsoft-docs)
36. [Publish your app using Power Apps app in Teams | Microsoft Docs](#publish-your-app-using-power-apps-app-in-teams-microsoft-docs)
37. [Remove your apps | Microsoft Docs](#remove-your-apps-microsoft-docs)
38. [Uninstall the Power Apps personal app | Microsoft Docs](#uninstall-the-power-apps-personal-app-microsoft-docs)
39. [Use sample app templates in Teams | Microsoft Docs](#use-sample-app-templates-in-teams-microsoft-docs)
40. [Customize sample app templates  | Microsoft Docs](#customize-sample-app-templates-microsoft-docs)
41. [Localize sample app templates](#localize-sample-app-templates)
42. [Theming in sample app templates](#theming-in-sample-app-templates)
43. [Granting permission to tables in Dataverse for Microsoft Teams | Microsoft Docs](#granting-permission-to-tables-in-dataverse-for-microsoft-teams-microsoft-docs)
44. [Frequently Asked Questions (FAQs) and answers when using sample app templates | Microsoft Docs](#frequently-asked-questions-faqs-and-answers-when-using-sample-app-templates-microsoft-docs)
45. [Known issues and limitations for Dataverse for Teams | Microsoft Docs](#known-issues-and-limitations-for-dataverse-for-teams-microsoft-docs)
46. [Migrate Microsoft Access data to Microsoft Dataverse for Teams | Microsoft Docs](#migrate-microsoft-access-data-to-microsoft-dataverse-for-teams-microsoft-docs)

---

## Power Apps and Microsoft Teams integration - Overview | Microsoft Docs

Source: [overview.md](https://learn.microsoft.com/en-us/power-apps/teams/overview)

*Provides an overview of using Power Apps with Microsoft Teams.*

# Power Apps and Microsoft Teams integration

Microsoft Teams provides a collaboration surface where makers can build, share, and use Power Apps experiences for teams, chats, and personal use.

Power Apps can be used in five scenarios with Teams.

Scenario|Description
--------|-------
[Embed a canvas app as a tab app](embed-teams-tab.md)| Use the **Power Apps tab** for Teams to embed a canvas app as a tab app in Teams. The canvas app integrates business data from a wide variety of Microsoft and third-party data sources, including Dataverse.|
[Embed a canvas app as a personal app](embed-teams-app.md)| Embed a canvas app as a first-class Teams personal app. The canvas app integrates business data from a wide variety of Microsoft and third-party data sources, including Dataverse.|
[Embed a model-driven app as a tab app](embed-model-driven-teams-tab.md)| Use the **Power Apps tab** for Teams to embed a model-driven app as a tab app in Teams.|
[Embed a model-driven app as a personal app](embed-model-driven-teams-personal.md)| Embed a model-driven app as a first-class Teams personal app.|
[Create apps in Teams backed by Microsoft Dataverse for Teams](create-apps-overview.md)|Use the Power Apps app in Teams to create canvas apps within Teams backed by Dataverse for Teams, the built-in low-code data platform for Teams. Dataverse for Teams empowers users to build custom apps, bots, and workflows&mdash;by using Power Apps, Microsoft Copilot Studio, and Power Automate, respectively&mdash;without ever leaving the Teams interface.


### Related articles

[What is Dataverse for Teams?](overview-data-platform.md)<br/>
[Create your first app in Teams](create-first-app.md)<br/>
[Set permission and share apps with colleagues](set-perms-and-share.md)<br/>
[Use flows in Microsoft Teams](/power-automate/teams/overview)<br/>
[Microsoft Copilot Studio in Teams](/microsoft-copilot-studio/fundamentals-get-started-teams)

---

## Embed a canvas app as tab app | Microsoft Docs

Source: [embed-teams-tab.md](https://learn.microsoft.com/en-us/power-apps/teams/embed-teams-tab)

*Learn how to add an app to a Microsoft Teams channel using the PowerApps tab so that people you've shared the app with can open it in that channel.*

# Embed a canvas app as tab app in Teams

You can customize the Teams experience by adding Power Apps canvas apps to your channels in Teams using the **Power Apps** tab. In this topic, you learn how to add the Product Showcase sample app template to a Teams channel, and then open the app from that channel. 

![App embedded in Microsoft Teams.](media/open-app-embedded-in-teams/embedded-app.png "App embedded in Microsoft Teams")

If you're not signed up for Power Apps, [sign up for free](https://make.powerapps.com/signup?redirect=marketing&email=) before you begin.

## Prerequisites

To follow this procedure, you need an [Office 365 subscription](https://signup.microsoft.com/Signup?OfferId=467eab54-127b-42d3-b046-3844b860bebf&dl=O365_BUSINESS_PREMIUM&ali=1) and a [channel in Teams](https://www.youtube.com/watch?v=he2f1quaR7M).

## Sign in to Power Apps

Sign into Power Apps at [https://make.powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).

## Add an app

1. In Microsoft Teams, select a team, and a channel under that team. In this example, it's the **General** channel under the **Business Development** team.

    ![Select General channel.](media/open-app-embedded-in-teams/teams-select-channel.png "Select General channel")

2. Choose **+** to add a tab.

    ![Select +.](media/open-app-embedded-in-teams/teams-add-tab.png "Select +")

3. In the **Add a tab** dialog box, choose **Power Apps**.

    ![Select Add a tab.](media/open-app-embedded-in-teams/add-a-tab.png "Select Add a tab")

4. Choose **Sample app templates** > **Product Showcase** > **Save**.

    ![Select Product Showcase and Save.](media/open-app-embedded-in-teams/select-an-app.png "Select Product Showcase and Save")

    The app is now available to use in the channel.

    ![App shows up in channel.](media/open-app-embedded-in-teams/app-in-channel.png "App shows up in channel")

> [!NOTE]
> You must [share](../maker/canvas-apps/share-app.md) your own apps before you add them to Teams (sample app templates are shared by default).

## Open an app

1. In Microsoft Teams, choose the team and the channel that contains the app.

    ![Select General in Teams under your team.](media/open-app-embedded-in-teams/teams-select-channel.png "Select General in Teams under your team")

2. Choose the **Product Showcase** tab.

    ![Select Product Showcase tab.](media/open-app-embedded-in-teams/open-tab.png "Select Product Showcase tab")

    The app opens in the channel.

    ![App opens.](media/open-app-embedded-in-teams/app-in-channel.png "App opens")

## Known issues

In the desktop app for Microsoft Teams:

* Apps must load content such as images and .pdf files over a secure (https) connection.
* Not all sensors, such as **Acceleration**, **Compass**, and **Location**, are supported.
* Only these audio formats are supported: AAC, H264, OGG Vorbis, and WAV.

In the mobile app for Microsoft Teams:
* End users can't download attachments from canvas apps. As a workaround, use Microsoft Teams desktop to access the canvas app and download the attachment.


## Clean up resources

To remove the app from the channel, choose the **Product Showcase** tab > **Remove**.

---

## Embed an app in Teams  | Microsoft Docs

Source: [embed-teams-app.md](https://learn.microsoft.com/en-us/power-apps/teams/embed-teams-app)

*You can embed an app created in Power Apps in Microsoft Teams to share it.*

# Embed a canvas app as personal app in Teams

You can share an app you've created by embedding it directly into Microsoft Teams. When completed, users can select **+** to add your app to any of **your** team channels or conversations in the team you are in. The app appears as a tile under **Tabs for your team**.

> [!NOTE]
> The Teams experience changes frequently. If the current Teams UI or screenshots in this article don't match what you see, use the option names and overall flow as your guide.

> [!NOTE]
> Team custom app policies must be set to allow uploading custom apps. If you are unable to embed your app in Teams, check with your administrator to see if they've setup [custom app settings](/MicrosoftTeams/teams-custom-app-policies-and-settings#custom-app-policy-and-settings).

## Prerequisites

- You need a valid [Power Apps license](/power-platform/admin/pricing-billing-skus).
- To embed an app into Teams, you need an existing app [created using Power Apps](../maker/canvas-apps/data-platform-create-app.md).

## Add to Teams

1. Sign in to [Power Apps](https://make.powerapps.com), and then select **Apps**.

1. Select **More actions** (...) for the app you want to share in Teams, and then select **Add to Teams**.

    :::image type="content" source="media/embed-teams-app/add-to-teams-option.png" alt-text="Add to Teams.":::

    **Add to Teams** panel opens on the right-side of the screen.

    :::image type="content" source="media/embed-teams-app/add-to-teams-review.png" alt-text="Add to Teams - review options.":::

1. (Optional) If the app doesn't have any description, select **Edit details** to open the app in Power Apps Studio to add.

1. (Optional) Select **Advanced settings** to add additional details such as *Name*, *Website*, *Terms of Use*, *Privacy Policy*, *MPN ID* (Microsoft Partner Network ID).

    ![Add additional details.](media/embed-teams-app/additional-settings-embed.png "Add additional details")

1. Select **Add to Teams** and you'll be asked to open Teams.

    :::image type="content" source="media/embed-teams-app/add-to-teams-button.png" alt-text="Add to Teams button.":::

    > [!TIP]
    > If you want, you can also choose **Download app** to download the app, and then use the steps described in [Upload your app in Microsoft Teams](/microsoftteams/platform/concepts/deploy-and-publish/apps-upload) article to upload the app to Teams.

1. Select **Open Microsoft Teams** to open Teams app, or select **Cancel** followed by **Use the web app instead** to open Teams web.

1. Select **Add**. You can also choose to add the app to a specific team using **Add to team**, or a specific chat using **Add to chat**.

    :::image type="content" source="media/embed-teams-app/add-to-teams-in-teams.png" alt-text="Add app to Teams, a team, or a chat.":::

    The app is now added to Teams.

    > [!TIP]
    > You can also [pin the app](install-personal-app.md#pin-power-apps-to-teams) for easy access.

## Add to Teams using the web player

You can also add canvas apps to Teams using the web player.

1. Go to [Power Apps](https://make.powerapps.com) > **Apps** > select the app to launch in a new browser tab.

1. [Edit the app](../maker/canvas-apps/edit-app.md) > select ![Play the app.](media/embed-teams-app/play.png) or press **F5** to play the app.

1. After the app is open using the web player, choose the **Add to Teams** button from the top-right side of the screen.

    :::image type="content" source="media/embed-teams-app/add-to-teams-web-player.png" alt-text="Add app to Teams using web player.":::

1. When prompted, select **Cancel**.

1. Select **Launch it now** to open the Teams app. Alternatively, you can also choose **Use the web app instead** to open the app in Teams web.

> [!NOTE]
> - To add canvas apps to Teams using the web player:
>     - Your organization must have **Allow interaction with custom apps** turned on. More information: [Manage custom app policies and settings in Microsoft Teams](/microsoftteams/teams-custom-app-policies-and-settings)
>     - Your organization must allow **Shared Power Apps**. More information: [Manage Microsoft Power Platform apps in the Microsoft Teams admin center](/microsoftteams/manage-power-platform-apps)
> - You can only add apps to Teams that belong to the same tenant as your Teams account. Otherwise, you'll see an error "App was not found in tenant".

## Publish the app to the Teams catalog

If you're an admin, you can also [publish the app](/microsoftteams/tenant-apps-catalog-teams) to the Microsoft Teams catalog.

## Use context from Teams

To build deeply integrated apps with Teams, you can use Team's context variables with the `Param()` function. For example, use the following formula in screen's **Fill** property to change the background of app based on user's theme within Teams:

```
Switch(
        Param("theme"),
        "dark",
        RGBA(
            32,
            31,
            31,
            1
        ),
        "contrast",
        RGBA(
            0,
            0,
            0,
            1
        ),
        RGBA(
            243,
            242,
            241,
            1
        )
    )
```

To test the app, publish it and then play it within Teams.

The following context variables from Teams are supported:

- locale
- channelId
- channelType
- chatId
- groupId (not supported with private channels)
- hostClientType
- subEntityId
- teamId
- teamType
- theme
- userTeamRole

> [!NOTE]
> This feature was added in March, 2020. If you embedded your app within Teams before this, you may need to re-add your app to Teams to use this functionality.

## Improve the performance of your app

You can optionally preload your app within Teams to increase performance. For mor information: [Enable Preload app for enhanced performance](../maker/canvas-apps/performance-tips.md#enable-preload-app-for-enhanced-performance). 

### See also

[Welcome to Microsoft Teams](/MicrosoftTeams/teams-overview)
[Manage your apps in Teams](manage-your-apps.md)
[Publish your app in Teams](publish-and-share-apps.md)

---

## Create apps in Microsoft Teams by using Power Apps | Microsoft Docs

Source: [create-apps-overview.md](https://learn.microsoft.com/en-us/power-apps/teams/create-apps-overview)

*Provides an overview of creating apps in Microsoft Teams.*

# Create apps in Microsoft Teams by using Power Apps

With the significant number of enterprise employees working remotely, and millions of them meeting and collaborating through Microsoft Teams, there's significant interest in building low-code and no-code applications that can make remote work easier and more productive.

Introducing [Microsoft Dataverse for Teams](overview-data-platform.md) (formerly called Project Oakdale), a built-in, low-code data platform for Teams that empowers you to build custom apps and workflows in Teams by using Power Apps and Power Automate. Dataverse for Teams, built on [Microsoft Dataverse](../maker/data-platform/data-platform-intro.md) (formerly called Common Data Service), provides relational data storage, rich data types, enterprise-grade governance, and one-click solution deployment to the Teams app store.  

The new Power Apps app in Teams provides an integrated experience for app makers to create and edit apps and workflows within Teams, and quickly publish and share them for anyone on the team to use, without having to switch between multiple apps and services. With Power Apps Studio embedded in the Power Apps app in Teams and the new built-in data platform providing an easy-to-use, editable data table, you can quickly build apps based on custom data tables that are Teams-specific and scenario-specific.

![The app creation experience in Teams.](media/overview.png "The app creation experience in Teams, including the embedded Power Apps Studio experience")

To help organizations realize value faster, you can use *templates*, which are purpose-built apps for common application patterns that can be easily discovered and installed by members of the team. Although these templates can work without modification, members of the team can customize and extend them to meet the specific needs of their business.

Access and authorization align with the Microsoft Teams security model and include security groups that enable access for owners, members, and guests of the team that your app is associated with.

## Licensing requirements

The ability to create apps within Microsoft Teams will be available as part of select Microsoft 365 subscriptions. For detailed information, see [Licensing and restrictions](/power-platform/admin/about-teams-environment#licensing-and-restrictions) in the Power Platform admin guide.

## Get started with creating apps in Teams

There are two ways to use the apps created by using Power Apps in Teams:

- You can use the Power Apps app from the default Teams catalog as a personal app and create apps to share with teams in Teams. More information: [Install the Power Apps personal app](install-personal-app.md)

When you create an app in Teams with the Power Apps app for the first time, or install an app created with Power Apps from the app catalog for the first time, a new Dataverse for Teams environment is created for the selected team. The Dataverse for Teams environment is used to store, manage, and share team-specific data, apps, flows, and chatbots. Each team can have one Dataverse for Teams environment, and all data, apps, and flows created with the Power Apps app inside a team are available from that environment. More information: [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment)

When you create an app in Teams with the Power Apps app for the first time, or install an app created with Power Apps from the app catalog for the first time, you get to choose which team is responsible for customizing, maintaining, and sharing the app.

After selecting a team, we will create a new Dataverse for Teams environment if one doesn’t already exist. This will provide the necessary workspace for your team to collaborate on all your data, apps, flows, and bots. More information: [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment)

## Get started with creating flows and chatbots in Teams

You can create:

- Power Automate flows by using the new Power Apps app in Teams. More information: [Create flows using the Power Apps app in Teams](/power-automate/teams/create-flows-power-apps-app)

- Chatbots by using the new Microsoft Copilot Studio app in Teams. More information: [Microsoft Copilot Studio in Teams](/microsoft-copilot-studio/fundamentals-get-started-teams)

### Next steps

[Install the Power Apps personal app](install-personal-app.md)<br/>
[Create your first app in Teams](create-first-app.md)

### Related articles
[Administer Dataverse for Teams environment](/power-platform/admin/about-teams-environment)

---

## Install the Power Apps personal app in Teams| Microsoft Docs

Source: [install-personal-app.md](https://learn.microsoft.com/en-us/power-apps/teams/install-personal-app)

*Learn about installing the Power Apps app in Teams.*

# Install the Power Apps personal app in Microsoft Teams

A *personal app* is a Teams application that has a personal scope. Power Apps is by default available for you to select and add to a tab in the Teams channel of your choice. More information: [Personal apps](/microsoftteams/platform/concepts/design/personal-apps)

1. Open Microsoft Teams, and then select **More added apps** (...).

1. Search for **Power Apps**.

   ![Search for Power Apps.](media/search-power-apps.png "Search for Power Apps")

1. Select **Add**.

   ![Add Power Apps.](media/add-power-apps.png "Add Power Apps")

Power Apps is now added to Teams. You can access the app in Teams from the left pane.

![Power Apps app.](media/power-apps-home-tab.png "Power Apps app")

> [!TIP]
> As an alternative to using the flyout menu, you can select **Apps** from the lower-left corner in Teams, and then search for **Power Apps** to install the app.

## Pin Power Apps to Teams

To easily access Power Apps app, **right click** the Power Apps app from  ![More added apps.](media/more-added-apps-ellipsis.png "More added apps"), and then select **Pin**.

![Pin Power Apps app.](media/pin-power-apps.png "Pin Power Apps app")

This action adds Power Apps to the Teams left rail for quick access.

When you pin Power Apps app, the text of the app icon in the Teams rail changes from italicized to normal to reflect the pinned app.

![Italic text change for app icon.](media/pin-italic-text.png "Italic text change for app icon")

You can unpin Power Apps app anytime with a **right click** on the Power Apps app from the left rail, and then by selecting **Unpin**.

![Unpin Power Apps app.](media/unpin-power-apps.png "Unpin Power Apps app")

## Pop out app

If you're using [Microsoft Teams desktop app](https://www.microsoft.com/microsoft-teams/download-app), you can use the **Pop up out** option to open Power Apps in a separate window for ease of use.

![Pop out app.](media/pop-out-app.png "Pop out app")

This way, you can continue to use Microsoft Teams for day-to-day interactions and still be able to interact with Power Apps separately.

### Next steps

[Create your first app in Teams](create-first-app.md)<br/>
[Overview of the Power Apps app](overview-of-the-power-apps-app.md)

---

## Create your first app in Teams | Microsoft Docs

Source: [create-first-app.md](https://learn.microsoft.com/en-us/power-apps/teams/create-first-app)

*Learn how to create your first app in Teams.*

# Create your first app in Microsoft Teams

You can create, edit, and delete [canvas apps](../maker/canvas-apps/getting-started.md) in Teams. If you're creating an app by using Power Apps in a Teams team for the first time, you also create a new Dataverse for Teams environment. For more information, see [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment).

## Prerequisites

- A [Microsoft Teams license](/microsoftteams/get-clients) (included with most Microsoft 365 plans).
- Power Apps for Teams doesn't require a standalone Power Apps license. The capability is included with your Teams license for apps that use Dataverse for Teams.
- You must be a member of the team where you want to create the app.

> [!NOTE]
> The Teams user interface updates regularly. If the screenshots or steps in this article don't exactly match what you see, look for similar options in the current interface. The core workflow remains the same.

Creating an app in Microsoft Teams is a quick and easy three-step process.

1. [Create your app](#create-your-app)
1. [Create your first table](#create-your-first-table)
1. [Customize and publish your app](#customize-and-publish-your-app)

![Create your first app in 3 steps.](media/create-your-first-app.png "Create your first app in 3 steps")

Watch this video to learn how to create your first app.
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=3e63d41c-d4eb-411e-b99a-7cc87bb2992d]
Ensure you refer to the [latest steps](#create-your-first-table) when creating the table.

Now let's go through each step in detail.

## Create your app

After installing the Power Apps app template:

1. Start Teams, and sign in.

1. In the left pane, select **Power Apps**, and then select **Start now**.

    ![Start creating an app.](media/create-app-1.png "Start creating an app")

    > [!TIP]
    > If you don't see the **Power Apps** app in the left pane, select ![More added apps - ellipsis.](media/more-added-apps-ellipsis.png "More added apps - ellipsis") (*More added apps*), and then select **Power Apps**.

    ![Power Apps.](media/power-apps.png "Power Apps")

1. Select a team where you want to create the app. This is where the app lives. Team members can't see the app until you publish the app. You can also share the app with colleagues within your company that are not part of the team. For more information, see [Set permission and share apps with colleagues](set-perms-and-share.md).

    ![Select a team to create the app.](media/select-a-team-for-this-app.png "Select a team to create the app")

    If this is the first app you're creating in the selected team, a new Dataverse for Teams environment is created for the selected team. You see a message about this when you select the team. For more information, see [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment).

    ![Creating the first app in a team.](media/select-a-team-for-this-app-environment.png "Creating the first app in a team")

1. Select **Create**. You see a confirmation about the Dataverse for Teams environment being created, which might take some time. You're notified when the environment is available for you to create your first app by using an email and a Teams notification.

    ![First app in a team.](media/create-app-4.png "First app in a team")

    > [!NOTE]
    > Environment creation fails if the Teams team that you selected has *Hiddenmembership* enabled. If this happens, try creating the app in a different team. For more information, see [Hidden membership groups](known-issues-limitations.md#hidden-membership-groups).

1. Enter an app name, and then select **Save**.

    ![Name your app.](media/name-your-app.png "Name your app")

    > [!TIP]
    > An app template is included with the app by default, so that you can get started with creating your table and using the app. For more information, see [Understand Power Apps Studio](understand-power-apps-studio.md).

## Create your first table

Data for apps built in Teams lives in Dataverse for Teams environments as tables. Like other data experiences, you can add extra columns to track different attributes of each record before filling the table with multiple rows of data.

> [!TIP]
> For more information about Dataverse for Teams tables, see [Overview of Dataverse for Teams](overview-data-platform.md).

To create your first table:

1. Select **With data**.

    ![Select With data](media/start-with-data.png "Select With data")

1. Select **Create new table** > **Start with blank table**.

    ![Create your first table.](media/create-first-table.png "Create your first table")

1. In the **Create a table** dialog box, select **Edit table properties** and type a meaningful name for your
new table that describes this dataset, and then select
**Save**.

1. After the table is created, add columns of different types, add rows, and
work with data in the visual editor.

   ![Visual editor.](media/table-designer-1.png "Visual editor")

### Add columns to the table

To add a new column to track new data:

1. Select **New column.**  

1. Enter a name that best describes your new column.

1. Select the type for your column.

    > [!TIP]
    > For more information about column types supported by the visual editor, go to [Supported column types](understand-power-apps-studio.md#supported-column-types). To add columns that aren't supported by
    the visual editor, create a table by using the solution explorer. More information: [Create tables](create-table.md)

1. If required, change **Advanced options** for the selected column type.

1. Select **Save**.

1. Repeat the previous steps to add the rest of the data columns.

### Add rows to the table

Select **Add row** to add rows.


#### Paste the copied data into the table

You can paste up to **50 rows** of data into a table. To create new rows from the copied data, add empty rows in the table first. Adding new empty rows ensures pasting data from clipboard doesn't accidentally overwrite your existing data.

> [!CAUTION]
> Paste operations are automatically saved, and there's no undo option. Use caution when pasting data over existing rows since this action overwrites your existing data in the table.

To paste the data from clipboard into the table:

1. Select the record that you want to add new records above or below.

1. Select **Insert row above**, or **Insert row below** to insert rows before or after existing rows.
    <br> For example, inserting row above the selected row:

    ![Insert row above.](media/insert-row.png "Insert row above")

1. Repeat the preceding step to add more empty rows, as needed.

    > [!TIP]
    > If you're unsure of how many rows you need, create additional empty rows before pasting data. You can delete extra empty rows later.

1. Select the top-left cell from the newly created rows.

    ![Select top-left cell.](media/select-top-left-cell.png "Select top-left cell")

1. Paste the copied data.

    ![Paste rows.](media/paste-rows.png "Paste rows")

    > [!NOTE]
    > If you paste data when the cell is in edit mode (if you *double-clicked* top-left cell), the data is pasted inside the cell. If this problem happens, delete the incorrectly pasted data, select any other cell, select the top-left cell, and try to paste again.

    ![Incorrect pasting of rows.](media/paste-inside-edit-cell.png "Incorrect pasting of rows")

1. Remove any extra empty rows.

    ![Delete extra row.](media/delete-extra-row.png "Delete extra row")

    > [!TIP]
    > To delete multiple rows that are together, select the top row, and press the **Shift** key on the keyboard. Keep the key pressed, select the last row in the chunk of the rows that you want to delete. Then, select **Delete X record(s)**.

    ![Delete multiple rows.](media/delete-multiple-records.png "Delete multiple rows")

Changes to the table are automatically saved. However, check for errors, and fix them before you close the visual editor.

## Customize and publish your app

When you close the table, the app template that you added to the app screen by default automatically refreshes to use the new table.

> [!NOTE]
> To add new data sources, such as a new table, or to reopen the app, see [Manually connect data to the app](#manually-connect-data-to-the-app) for steps to manually refresh the app with the new data.

![Updated app template.](media/updated-gallery.png "Updated app template")

Depending on the number of fields you add to your table, you might need to update the form and the gallery in the app template.

### Manually connect data to the app

The gallery and the edit form components on the screen automatically refresh with the data only for the first data source. If you add extra data sources, such as a new table, or if you reopen the app, you need to manually connect the data to the template gallery and form.

> [!TIP]
> Skip these steps if the app screen is already connected to the table that you created.

To manually connect to the new data:

1. Select the gallery, and then select the correct data source.

    ![Change the gallery data source.](media/select-gallery-source.png "Change the gallery data source")

1. Select the form, and then select the correct data source.

    ![Change the form data source.](media/select-form-source.png "Change the form data source")

1. If you see any formula error, select **Edit in the formula bar**, and update the formula with the data source name.

    ![Edit the formula.](media/edit-formula.png "Edit the formula")

    For example, to change from using *Instructions* as the data source name for the edit form to *Recipes*, replace the name of the data source.

    Change from:

    ```power-fx
    Remove(Instructions, selectedRecord); If(IsEmpty(Errors(Instructions, selectedRecord)),UpdateContext( {itemSelected:false, editMode:false, newMode:false, deleteMode:false}); Set(CurrentItem,First(Instructions)););
    ```
    Change to:

    ```power-fx
    Remove(Recipes, selectedRecord); If(IsEmpty(Errors(Recipes, selectedRecord)),UpdateContext( {itemSelected:false, editMode:false, newMode:false, deleteMode:false}); Set(CurrentItem,First(Recipes)););
    ```

1. Repeat the earlier step to fix any extra formula errors.

### Update background color for the selected gallery record

The gallery shows records you created earlier. However, you need to change the background color for a record when you select it from the gallery to show the selection.

To update the selected item background color:

1. Select the gallery.

    ![Select the gallery for background fill.](media/select-gallery.png "Select the gallery for background fill")

1. Select *TemplateFill* property from the property drop-down on the top-left.

    ![Select TemplateFill property.](media/select-templatefill.png "Select TemplateFill property")

1. Update the *TemplateFill* property value in the formula bar to the following formula:

    ```power-fx
    If(ThisItem.IsSelected, RGBA(0,0,0,.05), RGBA(0,0,0,0))
    ```

### Update fields on the form

The template shows two fields inside the form by default. To add more fields to the form:

1. Select the form.

    ![Select the form.](media/app-form.png "Select the form")

1. Select **Edit fields** from the property pane on the right.

    ![Edit fields.](media/edit-form-fields.png "Edit fields")

1. Select **Add fields**.

    ![Add fields.](media/add-fields.png "Add fields")

1. Select the fields that you want to add on the form.

    ![Select fields to add.](media/add-fields-list.png "Select fields to add")

1. Select **Add**.

1. (Optional) Select fields to move up or down, or remove unwanted fields by selecting **Remove**.

    ![Move or remove fields.](media/move-remove-field.png "Move or remove fields")

1. Close the fields pane.

When you add, remove, or reorder fields, the form updates automatically.

![Updated form.](media/form-updated.png "Updated form")

### Update fields in the gallery

You might need to update the gallery on the default app template to reflect the fields from the table you created.

![Default gallery.](media/gallery-fields.png "Default gallery")

To update the fields in the gallery:

1. Select **Edit fields** from the property pane on the right.

1. Select the drop-down menu for a gallery component (such as image, title, or subtitle) and change the selection to the field you want.

    ![Edit selected field.](media/gallery-fields-change.png "Edit selected field")

1. Close the data pane.

The gallery updates with the selected changes.

![Updated gallery.](media/gallery-fields-updated.png "Updated gallery")

### Update the app title

To update the app title:

1. Select the label from the upper-left corner of the screen.

    ![Updated title.](media/app-title.png "Updated title")

1. Change the *Text* property value from the properties pane on the right.

    ![Update title property.](media/update-title.png "Update title property")

Verify all the changes you made to the app.

![Verify all changes.](media/app-changes.png "Verify all changes")

> [!TIP]
> For better responsiveness, the [data cards](../maker/canvas-apps/working-with-cards.md) by default have the [**Width fit**](../maker/canvas-apps/controls/properties-size-location.md#size) property set to *On*. If you want to resize the data cards manually, select the data cards and then set the **Width fit** property to *Off*.

![Data card - width fit property.](media/data-card-width-fit.png "Data card - width fit property")

### Save and preview the app

Now that you've created your first app with data, you can save your changes and preview the app.

![Save and preview.](media/save-preview.png "Save and preview")

1. Select **Save**.

1. Select **Preview**.

    - To add a new record, select **New record** and fill in the form.
    - To edit a record, select the record from the left pane, and edit the values.
    - To close the preview, select **Close** or the **Esc** key.

### Publish and add app to Teams channel

Select **Publish to Teams** to publish the app so others in your team can use the app, and add the app to Teams channel. More information: [Publish and add an app to Teams](publish-and-share-apps.md)

Now that you've created your first app from a blank table, let's go through the
Power Apps interface, Studio, controls and how to create additional apps in
detail.

## Additional considerations for Microsoft 365 Group

When you select **Create** to create an app in the selected team, Power Apps automatically enables the selected team's Microsoft 365 Group for security. However, if the group can't be enabled for security, you see the following error: 

`The request failed with error: 'Insufficient privileges to complete the operation.' The tracking Id is '[xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]'`.

To fix this issue, manually update the Microsoft 365 Group setting *SecurityEnabled* from
*False* to *True* by using PowerShell. For detailed steps, see [Share an app with Microsoft 365 Groups](../maker/canvas-apps/share-app.md#share-an-app-with-microsoft-365-groups). For more information, see [Microsoft 365 Groups and Microsoft Teams](/microsoftteams/office-365-groups).

### Enabling security for teams with same names

Team names aren't always unique. It's possible for more than one
team in Teams to share the same display name. For example, there might be
more than one team with the name "Inspection" in a tenant. However, the
Microsoft 365 Group associated with each team has a different *ObjectId* in
Microsoft Entra ID, even when the team names are the same. The *ObjectId* in
Microsoft Entra ID for a Microsoft 365 Group is the same as the *GroupId* in
Teams for the associated team.

To find the **GroupId** (ObjectID in Azure AD) of a team:

1. Go to the team in Teams.

1. Select any channel in the team.

1. Select **More options** (...) from the upper-right corner, and then select **Get link to channel**.

    ![Get link to the channel.](media/get-channel-link.png "Get link to the channel")

1. Copy the *GroupID* from the link.

    ![Group ID.](media/group-id.png "Group ID")

    You can also copy the channel link by selecting **Copy**, and then pasting it into a text editor
to get the *GroupID* value.

    `https://teams.microsoft.com/l/channel/19%3a06f038959c9f4387a35f5d776484cff2%40thread.tacv2/General?groupId=40b7e373-a788-4e29-a590-5a86db7550e3&tenantId=00000000-0000-0000-0000-0000000000000000`

1. Now that you have the correct team's **GroupID** (ObjectID in Microsoft Entra ID), use the instructions in
[Share an app with Microsoft 365 Groups](../maker/canvas-apps/share-app.md#share-an-app-with-microsoft-365-groups)
to enable security for the team's Microsoft 365 Group.

## Troubleshooting

### App publish fails with status code 400

If you receive a "Request failed with status code 400" error when publishing your app to Teams:

1. Ensure the team's Microsoft 365 Group is security-enabled. See [Additional considerations for Microsoft 365 Group](#additional-considerations-for-microsoft-365-group).
1. Check that you have the correct permissions within the team (owner or member).
1. Try signing out of Teams and signing back in, then attempt publishing again.

### App doesn't appear in Teams after publishing

If your published app doesn't appear in the Teams app store or the **Built by your colleagues** section:

1. Allow up to 24 hours for the app to propagate across Teams.
1. Sign out and sign back in to Teams to clear the cache.
1. If using Teams web, refresh the browser.
1. Verify that [custom app policies](/microsoftteams/teams-custom-app-policies-and-settings) in your organization allow uploaded apps.

### How to delete an app

To delete an app you no longer need, see [Delete an app](manage-your-apps.md#delete-an-app).

## Next steps

[Overview of the Power Apps app](overview-of-the-power-apps-app.md)<br/>
[Understand Power Apps Studio](understand-power-apps-studio.md)<br/>
[Use the Fluent UI controls](use-the-fluent-ui-controls.md)<br/>
[Create additional apps](create-additional-apps.md)

---

## Overview of the Power Apps app in Microsoft Teams | Microsoft Docs

Source: [overview-of-the-power-apps-app.md](https://learn.microsoft.com/en-us/power-apps/teams/overview-of-the-power-apps-app)

*Learn about the Power Apps app in Microsoft Teams.*

# Overview of the Power Apps app

Use the Power Apps app to create and manage apps across the available environments for your teams. Select the Power Apps app from the left pane in Microsoft Teams to open the Power Apps interface.

> [!NOTE]
> If **Power Apps** doesn't appear on the left pane, you can [install](install-personal-app.md) it. After you install the app, you need to [create your first app](create-first-app.md) to create an environment. For more information, see [About Teams environments](/power-platform/admin/about-teams-environment).

> [!IMPORTANT]
> The Teams interface updates regularly. If specific options or tabs mentioned here don't match what you see, look for similar functionality in the current Teams interface. The core features described here remain available.

![Power Apps app.](media/power-apps-overview-app.png "Power Apps app")

Three tabs are available: **Home**, **Build**, and **About**. You can start creating a new app by selecting **Create an app** on the **Home** tab.

![Power Apps app tabs.](media/power-apps-overview-3.png "Power Apps app tabs")

Let's understand each tab in detail.

## Home

Your **Power Apps** experience in Teams starts with the **Home** tab. Use the **Home** tab to get started creating new apps with Power Apps. 

![Home.](media/home-tab.png "Home")

1. **Introduction Video**: Watch a one-minute video to find out what Power Apps in Teams is all about.

1. **Create an app**: Select **Create an app** to enter the Power Apps Studio integrated inside Teams and start building a Power Apps app. As you learned from [Create your first app in Teams](create-first-app.md), a new environment is created for your team when you first create an app. Creating additional apps in the same team uses the environment that you already created for the team.

1. **Recent apps**: Find the apps that you recently edited in this section. Select an app from this section to directly open the app inside the Studio. This section is empty if you didn't edit any app yet.

1. **Sample app templates**: This section shows available sample app templates.

1. **Learn**: Find helpful articles in this section to get you started with Power Apps in Teams.

## Build hub

Select the **Build** hub to see the list of environments for each team that you're a member of, and the list of apps or objects that the team created or installed.

![Build.](media/power-apps-overview-4.png "Build")

1. **Environments**: Each Microsoft Teams team with an environment that you have access to is listed here.

    If you have more than one team with environments, select the team or environment you want from the left pane.

    ![Environment list.](media/power-apps-overview-6.png "Environment list")

    Select ![Expand/collapse.](media/power-apps-overview-7.png "Expand/collapse") to collapse or expand the environment list.

    ![Expand and collapse the list.](media/power-apps-overview-8.png "Expand and collapse the list")

    When you select an environment from the list, you see the recent resources built by the selected environment's team, or the apps installed in the selected environment on the right side of the screen.

1. **Built by this team**: This list shows all Power Apps objects such as apps, flows, and tables created in the selected environment (the Teams team). Select **New app** to create a new app. Select **See all** to open the solution explorer for the environment. More information: [Solution explorer](#solution-explorer)

    Select **See all** to view all the components in the selected environment, and to create new apps or components.

    ![Built by this team.](media/power-apps-overview-5.png "Built by this team")

    In the *Items created for* list, select an app, or a table to directly open the selection in the respective editor.

1. **Installed apps**: Shows a list of installed apps in the environment (Teams team) from the Teams app store.

    ![Installed apps.](media/power-apps-overview-9.png "Installed apps")

    Select an app, or a table to directly open the selection in the respective editor.

## Solution explorer

When you select **See all** from the environment list on the **Build** hub, you see the Power Apps solution explorer with a tree view of the pages for the environment. To get started, select a page from the solution explorer on the left.

### All

Shows all available Power Apps objects such as apps, flows, and chatbots in the selected environment.

![Solution explorer - All.](media/power-apps-overview-16.png "Solution explorer - All")

Select **New** to create new apps, flows, or tables.

![Solution explorer - All - New option.](media/power-apps-overview-15.png "Solution explorer - All - New option")

### Apps

Shows the apps created with Power Apps. More information: [Manage your apps](manage-your-apps.md)

![Solution explorer - Apps.](media/power-apps-overview-10.png "Solution explorer - Apps")

### Flows

Shows all the Power Automate flows in the selected team's environment. Power Automate is a service that helps you create automated workflows between your
favorite apps and services to synchronize files, get notifications, collect data, and more. Different types of flows are available. More information: [Get started with Power Automate](/power-automate/teams/overview)

![Solution explorer - Flows.](media/power-apps-overview-11.png "Solution explorer - Flows")

### Tables

In Power Apps, a *table* defines information that you want to track in the form of records, which typically include properties such as company name, location,
products, email, and phone. You can then surface that data by creating an app that refers to the table. For more information about tables, go to [Tables overview](../maker/data-platform/entity-overview.md).

![Solution explorer - Tables.](media/power-apps-overview-12.png "Solution explorer - Tables")

### Other - Connection references

Lists connections available to the environment. Data is stored in a data source, and you bring that data into your app by creating a connection. A Power Apps connection connects your app to such a data source. You can use several other types of connections to connect to the Dataverse for Teams environment within the team. More information: [Overview of canvas-app connectors](../maker/canvas-apps/connections-list.md)

![Connection references.](media/power-apps-overview-13.png "Connection references")

### Other - Environment variables

Lists the environment variables for your selected team's environment. Apps and flows often require different configuration settings across environments.
You can use environment variables as configurable input parameters separately to manage data, rather than hard-coding values in your customization or using additional tools. More information: [Environment variables overview](../maker/data-platform/environmentvariables.md).

![Solution explorer - Environment variables.](media/power-apps-overview-14.png "Solution explorer - Environment variables")

## About

Select the **About** tab to view the version of the installed Power Apps app.

![About tab.](media/power-apps-overview-2.png "About tab")

You can get your current session details by selecting the **About** tab and then selecting **Session details**. The session details include
useful information that you can share with others when investigating an issue or working with support teams.

![About tab - Session details.](media/power-apps-overview-1.png "About tab - Session details")

- **Timestamp**: Date and time in Coordinated Universal Time (UTC).
- **Session ID**: Unique GUID representing the current Power Apps session.
- **Tenant ID**: Tenant ID of Teams and Power Apps.
- **Object ID**: Object ID of the user account in Microsoft Entra ID.
- **Build name**: Build and version details of the Power Apps app.
- **Resource ID**: ID of the resource.
- **Unique name**: Unique name of the Dataverse organization.
- **Instance url**: URL of the Dataverse instance.

> [!NOTE]
> Use session details only when you contact Microsoft Support to investigate an issue.

## Canvas apps terminology reference and definitions

When you create canvas apps by using Power Apps from the Teams interface, you need to understand the terms and definitions for various objects, options, and actions in an app. The following table defines these canvas app terms.

| **Component or action**                                                                                        | **Description**                                                                                                                                                                                              |
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Power Apps Studio](../powerapps-overview.md#power-apps-for-app-makers-and-creators) | An application used to make or author a canvas app.                                                                                                             |
| [Canvas app](../maker/canvas-apps/getting-started.md)                           | An app that you can create from scratch or by using any available template through Power Apps Studio.                                                                                             |
| [Model-driven app](../maker/model-driven-apps/model-driven-app-overview.md)     | An application based on Dataverse forms, views, tables, columns, and other components.                                                                                                                     |
| [Connector](/connectors/connectors)                                                  | A connection object that connects an app with a data source. For example, a connector for SharePoint or a connector for OneDrive.                                                                                |
| [Control](../maker/canvas-apps/reference-properties.md#controls)                | An object that you add on the canvas to provide certain app functionality.                                                                                                                              |
| [Property](../maker/canvas-apps/reference-properties.md#all-properties)         | Behaviors representing the controls available in an app.                                                                                                                                                     |
| [Function](../maker/canvas-apps/formula-reference.md)                           | Readily available functionality to extend the behavior of a control or app.                                                                                                                                      |
| [Formula](../maker/canvas-apps/formula-reference.md)                            | A combination of one or more functions to accomplish a certain task or action.                                                                                                                                 |
| [Screen](../maker/canvas-apps/add-screen-context-variables.md)                  | The visible area of an app enclosing available visible controls. An app can have multiple screens.                                                                                                               |
| [Component](../maker/canvas-apps/create-component.md)                           | Reusable combinations of controls that you can define, save, and use for new apps.                                                                                     |
| [Save an app](../maker/canvas-apps/save-publish-app.md)  | Saving an app for the first time, or saving new changes to an app.                                                                                                                                           |
| [Publish an app](../maker/canvas-apps/save-publish-app.md)       | Making an app available to the app store for general consumption.                                                                                                                                            |
| [Versions](../maker/canvas-apps/save-publish-app.md#identify-and-manage-app-versions)  | Each time you save an app, you create a new version that you can [restore](../maker/canvas-apps/restore-an-app.md). |
| [Share an app](../maker/canvas-apps/share-app.md)                               | Allowing users or groups to use the app, as consumers or co-owners.                                                                                                                                          |

### See also

[Understand Power Apps Studio](understand-power-apps-studio.md)  
[Create your first app](create-first-app.md)  
[Manage your apps](manage-your-apps.md)  
[Set permissions and share apps with colleagues](set-perms-and-share.md)

---

## Understand Power Apps Studio in Dataverse for a Teams environment | Microsoft Docs

Source: [understand-power-apps-studio.md](https://learn.microsoft.com/en-us/power-apps/teams/understand-power-apps-studio)

*Learn the components inside Power Apps Studio in Teams.*

# Understand Power Apps Studio in Dataverse in a Teams environment

When you create a canvas app by using any method, you're taken to the canvas app
builder called Power Apps Studio. You can use Power Apps Studio to design, build, and manage your canvas app.

> [!NOTE]
> The Teams experience changes frequently. If the current Teams UI or screenshots in this article don't match what you see, use the option names and overall flow as your guide.

## Overview of Power Apps Studio

![Power Apps Studio.](media/studio-power-apps.png "Power Apps Studio")

1. [Build hub](#1---build-hub) – select different pages in the Power Apps app.

1. [Power Apps Studio options](#2--power-apps-studio-options) – options relevant to the settings in a Power Apps Studio session.

1. [App actions](#3--app-actions) - options to rename, save, preview, or publish the app.

1. [Properties list](#4--properties-list) - list of properties for the selected object.

1. [Formula bar](#5--formula-bar) - compose or edit a formula for the selected property with one
or more functions.

1. [Power Apps app](#6--power-apps-app) – Power Apps app in Microsoft Teams.

1. [App authoring menu](#7--app-authoring-menu) - selection pane to switch between data sources and
insert options.

1. [App authoring options](#8--app-authoring-options) - details pane with options relevant to the selected
menu item for authoring the app.

1. [Canvas/screen](#9--canvasscreen) - primary canvas for composing the app structure.

1. [Properties pane](#10--properties-pane) - properties list for the selected object in UI format.

1. [Screen selector](#11--screen-selector) - switch between different screens in an app.

1. [Change canvas screen size](#12--change-canvas-screen-size) - change the size of the canvas during an authoring experience in Power Apps Studio.

Let's understand each option in Power Apps Studio in detail.

## 1 - Build hub

Opening Power Apps Studio from the build hub opens an app authoring experience
that inherits the Teams interface and options. The **Home**, **Build**, and **About** tabs are described in [Overview of the Power Apps app](overview-of-the-power-apps-app.md).

## 2 – Power Apps Studio options

Power Apps Studio options are available on the menu in the upper-left corner. The
options are relevant to the current session and app-related settings.

:::image type="content" source="media/studio-options.png" alt-text="Power Apps Studio options.":::

### Back

Takes you back to the build hub, closing the current Power Apps Studio session.

### Undo and redo

![Undo and redo.](media/studio-undo-redo.png "Undo and redo")

- **Undo** – undo the last action.
- **Redo** – repeat the last action.

### Cut, copy, and paste

![Cut, copy and paste.](media/studio-cut-copy-paste.png "Cut, copy and paste")

- **Cut** – Cut the selection, and store it in the clipboard.
- **Copy** – Copy the selection, and store it in the clipboard.
- **Paste** - Paste the last cut, or copied selection from the clipboard.

### Add data

:::image type="content" source="media/studio-add-data.png" alt-text="Add data.":::

- Create a new table by selecting **Create new table**.
- Select any other existing tables from the current environment.
- Search and select a connector, such as **SharePoint** or **SQL Server**.

### New screen

Add screens based on the available layouts.

#### Layouts

Select a new screen to add to the app based on the layout of the screen.

![Layout scenarios.](media/studio-scenarios.png "Layout scenarios")

Select a screen type based on the available scenarios, such as **Blank**, **Scrollable**, **List**, **Success**, **Tutorial**, **Email**, **People**, **Meeting**, or **Calendar**.

### App checker

Runs the [App checker](https://powerapps.microsoft.com/blog/powerapps-checker-now-includes-app-checker-results-for-canvas-apps-in-solutions/) with available rules and shows the results.

![App-checker.](media/studio-app-checker.png "App-checker")

### Settings

Configure the app's general settings.

:::image type="content" source="media/studio-general-settings.png" alt-text="App settings.":::

#### General

Shows app name, and allows changing the app icon. To update the icon, select a new icon or background color. To add or update description, enter text in the text box. You can also upload a custom icon for the app using the **Browse** option.

#### Display

Shows the screen size and orientation. To change, select the radio buttons for **Orientation** and **Size**.

Advanced settings allow you to further customize the app screen configuration.

- **Scale to it**: Scales the app to fit available space.
- **Lock aspect ratio**: Locks the height and width ratio.
- **Lock orientation**: Maintains app orientation when device rotates.

To change the setting, toggle the switch.

More information: [Change screen size and orientation](../maker/canvas-apps/set-aspect-ratio-portrait-landscape.md)

#### Upcoming features

Allows you to configure advanced settings for the app that include features under preview, experimental or retired features.

More information: [Understand experimental, preview, and deprecated features in Power Apps](../maker/canvas-apps/working-with-experimental-preview.md)

#### Support

Shows current Power Apps Studio session details, version, and other information useful when working with Microsoft support.

### Power Automate

Create a new flow with Power Automate, or select any available flow.

![Power Automate.](media/studio-power-automate.png "Power Automate")

More information: [Create flows using the Power Apps app in Teams](/power-automate/teams/create-flows-power-apps-app)

### Collections

A collection is a group of items that are similar, such as products in a product list. This section lists the collections used by the current app. More information: [Collections in canvas apps](../maker/canvas-apps/create-update-collection.md) used by the app.

![Collections.](media/settings-collections.png "Collections")

### Variables

You can save data such as the result values from a data set into temporary storage by using variables. This section lists variables used by the current app. More information: [Variables in canvas apps](../maker/canvas-apps/working-with-variables.md) used by the app.

![Variables.](media/studio-variables.png "Variables")

## 3 – App actions

Use the options in the upper-right corner of Power Apps Studio to work with app-specific actions.

:::image type="content" source="media/studio-app-actions.png" alt-text="App actions.":::

### App name editor

Select the name of the app to edit it.

![App name editor.](media/studio-app-name-editor.png "App name editor")

### Save

:::image type="content" source="media/studio-save-options.png" alt-text="Studio save options.":::

Save allows you to perform the following actions:

- **Save** - Saves recent and unsaved changes you made to the app in Power Apps Studio. Each time you save changes, a new version is created.
- **Save as** - Duplicate the app by saving the app with a different name.
- **Save and publish** - Allows you to both save the app, and publish it at the same time.

### Preview

This will show a preview version of the app in Microsoft Teams that you can interact with.

### Publish to Teams

Publishes the app’s current version to a channel within Microsoft Teams. For more
information about publishing an app, go to [Publish an app](publish-and-share-apps.md#publish-and-add-an-app-to-teams).

## 4 – Properties list

Shows the list of available properties for the selected object on the canvas.
The properties list changes based on your selection. For a complete list of all properties, go to [All properties](../maker/canvas-apps/reference-properties.md#all-properties).

![Properties list.](media/studio-properties-list.png "Properties list")

## 5 – Formula bar

Use the formula bar to add, edit, or remove functions relevant to the selected
object and the property selected from the properties list. For example, select
the screen to update the background by using the [RGBA function](../maker/canvas-apps/functions/function-colors.md).

![Formula bar.](media/studio-formula-bar.png "Formula bar")

The formula bar is IntelliSense-enabled, and provides tips as you enter text to help you with the function syntax. If a formula returns an error, tips relevant to the syntax error and mitigation steps are displayed. When you start entering text that matches one or more functions, the formula bar shows inline function help and highlights help text relevant to the cursor position.

![Function in the formula bar.](media/studio-function-1.png "Function in the formula bar")

Similarly, you'll find help when working with complex functions, nested
functions, or when correcting a formula syntax.

For a quick and easy function reference, you can also select the formula drop-down menu.

![Formula drop-down menu.](media/studio-function-2.png "Formula drop-down menu")

Select an event type from the drop-down menu at the top of the dialog box, such as
**Action** instead of **Text**.

![Function event selection.](media/studio-function-3.png "Function event selection")

Select an action that you want to add a function for.

![Change in function event selection.](media/studio-function-4.png "Change in function event selection")

The available functions for the selected event type are dynamically updated
depending on the object you select. For example, if you selected a button on the
canvas, the available **Action** functions also include the function
*ClearCollect()*.

![Function ClearCollect() selected.](media/studio-function-5.png "Function ClearCollect() selected")

You can read the description of the selected **Action** function. Double-clicking a function name adds it into the formula bar.

For a complete list of all canvas app functions, go to [Formula reference](../maker/canvas-apps/formula-reference.md).

## 6 – Power Apps app

The Power Apps app in Teams is described in detail in [Overview of the Power Apps app](overview-of-the-power-apps-app.md).

## 7 – App authoring menu

Switch between various authoring options while working with the app.

:::image type="content" source="media/studio-app-1.png" alt-text="App authoring menu.":::

> [!TIP]
> You can also select the expand button to expand the list to include names instead of just icons.

- **Tree view** - Shows a tree view of all screens and controls in the current app.
- **Insert** - Allows you to add different controls to the screen.
- **Data** - Add or remove data such as tables that the app connects to.
- **Media** - Insert or remove media from the app.

## 8 – App authoring options

The options for working with canvas apps change depending on the selection on the left pane.

### Tree view

Select the tree view to show the screens available in the app,

:::image type="content" source="media/studio-tree-view.png" alt-text="Tree view.":::

> [!TIP]
> Select **App** in the tree view to work with app-specific controls or to
change app behavior, such as adding a formula on *OnStart* event of the app.

Switch to the **Components** tab to work with component library features. You can add
new components or reuse those that were already published from published
component libraries. More information: [Component library](../maker/canvas-apps/component-library.md)

![Tree view - components.](media/studio-tree-view-1.png "Tree view - components")

### Insert

**Insert** shows all the popular objects or controls that you can
add on the selected screen in your canvas app. You can also expand other
choices or use the components option to insert controls from a component
library.

:::image type="content" source="media/studio-insert.png" alt-text="Insert.":::

To insert controls on the canvas, you can drag the control to the canvas,
select the control, or select **(...)** and then select **Add to canvas**.

> [!TIP]
> Dataverse for Teams provides new components built on the [Fluent UI framework](https://www.microsoft.com/design/fluent/#/). More information: [Fluent UI controls](use-the-fluent-ui-controls.md).

#### Popular controls
| **Name**      | **Description**                                                                                      |
|-----------------|------------------------------------------------------------------------------------------------------|
|*Label* | A box that shows data such as text, numbers, dates, or currency. |
|*Edit form*|Display, edit, or create a record in a data source.|
|*Text*|A box that shows text.|
|*Text box*|A box in which the user can enter text, numbers, and other data.|
|*Vertical gallery*|A control that contains other controls and shows a set of data.|
|*Add icon*|Graphics for which you can configure appearance and behavior properties.|
|*Rectangle*|A rectangular shape to configure the canvas appearance.|
|*Date Picker*|A control that the user can select to specify a date.|
|*Button*|A control that the user can select to interact with the app.|

For more information about the controls that you can insert, and their properties
and definitions, go to [Controls and properties in Power Apps](../maker/canvas-apps/reference-properties.md).

#### Classic controls

Dataverse for Teams uses [Fluent UI controls](use-the-fluent-ui-controls.md) by default. If necessary, you can enable classic controls by using the experimental feature setting. To do this, go to **Settings** > **Upcoming features** > **Experimental** > toggle **Classic controls** to **On**.

After you enable classic controls, you'll be able to see and add them from the **Classic** category.

:::image type="content" source="media/classic-control.png" alt-text="Classic controls.":::

For example, you may need to enable classic controls when using [dependent drop-down lists](../maker/canvas-apps/dependent-drop-down-lists.md) when using Dataverse for Teams.

### Data

Add, refresh, or remove data sources from your canvas app. You
can add one or more
[connections](../maker/canvas-apps/connections-list.md)
by using data sources.  

In addition to data stored within tables, there are many connectors available to interact with data in popular SaaS, services, and systems.

:::image type="content" source="media/studio-data.png" alt-text="Data.":::

Select **Create new table** to create a new table in the Dataverse for Teams
environment.

To choose other connectors such as SharePoint, OneDrive, or SQL Server, you can
enter text in the data source search box or select from the list of connectors.

![Select data source.](media/studio-select-1.png "Select data source")

More information: [List of all Power Apps connectors](/connectors/connector-reference/connector-reference-powerapps-connectors)

### Visual editor

When you select **Create new table** and enter a name for the new table, you open visual editor where you can design the table, add columns of different data types, enter data in rows, and save the changes.

![Visual editor.](media/studio-table-designer.png "Visual editor")

To get started with visual editor, select **Create a table** and enter
the table name. You can also expand the *Advanced settings* to update the table's plural name. For example, a table name can be *Shape*, and the plural table name can be *Shapes*.

![Create table.](media/studio-create-table.png "Create table")

Watch this video that shows you how to quickly create table and columns.
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=40f4f29f-77df-420a-a182-cb71b39f4613]

> [!NOTE]
> You can use visual editor in Power Apps Studio to quickly create a table while authoring an app. However, you can also use the [Build tab](edit-delete-table.md) to edit or delete the tables you create by using Power Apps Studio. Go to [Create tables in Microsoft Teams](create-table.md) for more information about creating tables by using the **Build** tab.

#### Understand visual editor

Visual editor allows you to work with table rows, columns, and data.

![Authoring a table in visual editor.](media/studio-table-1.png "Authoring a table in visual editor")

##### Table name

Select **Edit** ![Edit icon.](media/studio-edit-icon.png "Edit icon") to edit the name of the table.

![Edit the table name.](media/studio-edit-1.png "Edit the table name")

##### Add row

Select **Add row** to add a new row to the table.

![Add a row.](media/studio-add-row.png "Add a row")

##### Add columns

Select **Add columns** to add new columns of the available column types
supported by visual editor.

###### Supported column types

Visual editor supports specific data types as columns. The following options
are available when creating a new column using visual editor inside Power Apps Studio:

- Text
- Email
- URL
- Phone
- Auto number
- Number
- Date (Only dates without the user locale (time zone) settings are supported.)
- Decimal
- Lookup
- Choice
- Yes/No

> [!IMPORTANT]
> To add columns of types that aren't supported by visual editor, such as file or image, [create a table](create-table.md) by using the solution explorer instead.

###### Advanced options

The advanced options for columns change depending on the type of column. For example, a **Text** column type has an advanced option for **Max length**. By contrast, an **Auto number** column type has options such as the type of autonumbering, prefixes, and maximum number of digits. More information: [Types of fields](../maker/data-platform/types-of-fields.md)

##### Show/hide columns

Use the **Show/hide columns** option to show or hide available columns, including columns automatically created as part of the table metadata.

For example, you can add an *Owner* column created by default to the existing table.

![Show/hide columns.](media/show-hide-columns.png "Show/hide columns")

##### Refresh

Refreshes the current table with data.

##### Save

To save changes to a table, select **Save.** When you change a table and try to close it without saving changes, you're prompted to discard changes.

![Save changes.](media/studio-save-table-changes.png "Save changes")

To ensure that changes to the table are saved, you can select the next row inside the table, or select any other cell after editing a cell to trigger the auto save functionality.

![Saving changes.](media/studio-saving-changes.png "Saving changes")

After you close a saved table, you'll see the table added to the list of
available data sources in **Data** on the left pane.

##### Visual editor view

Select from the options of **Compact**, **Default**, or **Comfortable** layouts to switch the view with columns and rows spacing to change visual editor layout.

##### Row count

Shows the row counts in the table.

##### Column options

Select the drop-down menu next to the column heading to view column-related options.

![Column options.](media/studio-column-options.png "Column options")

| **Option**      | **Description**                                                                                      |
|-----------------|------------------------------------------------------------------------------------------------------|
| *Edit column*   | Edit the column name or advanced options. After it's created, you can't change the name of the column. |
| *Hide*          | Hide or unhide the column.                                                                           |
| *Insert column* | Insert a new column at the selected column location.                                                 |
| *A to Z*        | Sort records in ascending order.                                                                     |
| *Z to A*        | Sort records in descending order.                                                                    |
| *Filter by*     | Filter column data based on the filter criteria you define.                                                 |
| *Move left*     | Move the column to the left from the current position.                                               |
| *Move right*    | Move the column to the right from the current position.                                              |
| *Pin left*      | Pin the column to the left side of the table.                                                        |
| *Pin right*     | Pin the column to the right side of the table.                                                       |
| *Delete column* | Delete the column.                                                                                   |

##### Edit existing table

After you add rows and columns, and add data, you can close the table and use it as
the data source in your app. To edit content in the table, you can use
the app controls or go back to visual editor.

To edit the table, select the table data source, and then select **Edit data** to
open the table in visual editor.

:::image type="content" source="media/studio-edit-2.png" alt-text="Edit table data.":::

After you close visual editor, the data source is automatically refreshed
to reflect the updated data in Power Apps Studio. You can also select **Refresh**
to manually refresh Power Apps Studio to reflect the data in the controls you added on the canvas.

### Media

Select **Media** to add images, video, or audio files to your app. Adding media directly to your app uploads the files to the app and uses the app storage. Each file uploaded to the app as media must be 64 MB or smaller, and the size of all media files uploaded to an app can't exceed 200 MB.

:::image type="content" source="media/studio-media.png" alt-text="Media.":::

If you want to reference more media, consider using [audio and video controls with URLs](../maker/canvas-apps/add-images-pictures-audio-video.md#add-images-audio-or-video-by-using-the-controls),
using media from [Azure Media Services](../maker/canvas-apps/add-images-pictures-audio-video.md#add-media-from-azure-media-services).
More information: [Using multimedia files in Power Apps](../maker/canvas-apps/add-images-pictures-audio-video.md)

## 9 – Canvas/screen

The canvas shows the currently selected screen from the left pane.

## 10 – Properties pane

The properties pane shows properties and options available for the currently
selected object on the canvas. The **Properties** tab shows generic options such as the name, color, size, or position. The **Advanced** tab shows more options for advanced customization. The advanced properties might sometimes be locked for editing, such as when working with data cards. You can select [Unlock to change properties](../maker/canvas-apps/working-with-cards.md#unlock-a-card) in such situations.

![Properties pane.](media/studio-properties-pane.png "Properties pane")

## 11 – Screen selector

Use the screen selector to switch between screens when your canvas app has multiple screens. You can also select a screen from the left pane by selecting the
tree view. If the current selection is inside a container, or inside an individual cell in a gallery, the selector shows the breadcrumbs for the parent elements at each level.

## 12 – Change canvas screen size

You can zoom in or zoom out while authoring the canvas app. Select **Ctrl**+**0**
**Fit to window** to fit the screen size
based on the current authoring window size. The zoom percentage or screen size you use while
authoring a canvas app has no impact on the aspect ratio configured for the app when you preview your app or play a published app.

### See also

[Use the Fluent UI controls](use-the-fluent-ui-controls.md)  
[Overview of the Power Apps app](overview-of-the-power-apps-app.md)  
[Manage your apps in Teams](manage-your-apps.md)  
[Create tables in Microsoft Teams](create-table.md)

---

## Use the Fluent UI controls in Power Apps app in Microsoft Teams | Microsoft Docs

Source: [use-the-fluent-ui-controls.md](https://learn.microsoft.com/en-us/power-apps/teams/use-the-fluent-ui-controls)

*Learn about the new Fluent UI Framework controls in Power Apps.*

# Use Fluent UI controls

Creating apps that look great in Microsoft Teams will be easier with our new components. Built on the [Fluent UI framework](https://www.microsoft.com/design/fluent/#/), the new components will look great with Teams styles and will automatically adjust to the Teams default theme. The new controls are Button, Check box, Combo box, Date picker, Label, Radio group, Rating, Slider, Text box, and Toggle.

Let's take a look at each Fluent UI control and its most useful properties. For a complete list of controls and properties in Power Apps, go to [Controls and properties in Power Apps](../maker/canvas-apps/reference-properties.md).

## Button

A control that the user can select to interact with the app.

![Button control.](media/fluent-button.png "Button control")

### Description

Configure the OnSelect property of a **Button** control to run one or more formulas when the user selects the control.

### Key properties

*ButtonType* – The style of button to show, Standard, or Primary. Default value: **Standard**.

*OnSelect* – How the app responds when the user selects a control.

*Text* – Text that appears on a control or that the user enters into a control.

## Check box

A control that the user can select or clear to set its value to **true** or
**false**.

![Check box control.](media/fluent-check-box.png "Check box control")

### Description

The user can specify a Boolean value by using this familiar control, which has
been widely used in the user interface.

### Key properties

*Box side* – The side of the control on which the check box is displayed.

*Label* – Text that appears on a control.

*Checked* – Whether the control is checked or not.

## Combo box

A control that allows users to make selections from provided choices. Supports
search and multiple selections.

![Combo box control.](media/fluent-combo-box.png "Combo box control")

### Description

A **Combo box** control allows a user to search for items to select.

Single-select or multiple-select mode is configured via the *SelectMultiple* property.

### Key properties

*Items* – The source of data from which selections can be made.

*DefaultSelectedItems* – The items that are initially selected before the user interacts with the control.

*SelectMultiple* – Whether the user can select a single item or multiple items.

*IsSearchable* – Whether the user can search for items before selecting.

### Limitations

1. The list of Options doesn't support Data Paging. It's limited to show the first 500 records.

1. Filtering the list of Options by typing in the Text Box area of the Control works inside the browser, not on the Server. This, coupled with the previous limitation, means that Filtering will not match any Option(s) beyond the first 500 entries, even when the Text matches.

## Date picker

A control that the user can select to specify a date.

![Date picker control.](media/fluent-date-picker.png "Date picker control")

### Description

If you add a **Date picker** control instead of a text input control, you
help ensure that the user specifies a date in the correct format.

### Key properties

*Value* – The date currently selected in a date control. This date is
represented in local time.

## Label

A box that shows data such as text, numbers, dates, or currency.

![Label control.](media/fluent-label.png "Label control")

### Description

A label shows data that you specify as a literal string of text or as a formula that evaluates to a string of text. Labels often appear outside of any other control (such as a banner that identifies a screen), as a label that identifies another control (such as a rating or audio control), or in a gallery to show a specific type of information about an item.

### Key properties

*Color* – The color of text in a control.

*Font* – The name of the family of fonts in which text appears.

*Text* – The text that appears on a control.

## Radio group

An input control that shows multiple options, only one of which users can select at a time.

![Radio group control.](media/fluent-radio-group.png "Radio group control")

### Description

A **Radio group** control, a standard HTML input control, is best used with only a
few, mutually exclusive options.

### Key properties

*Items* – The source of data that appears in a control such as a gallery, a
list, or a chart.

*Selected* – The data record that represents the selected item.

## Rating

A control with which users can indicate a value from 0 through a maximum number
that you specify.

![Rating control.](media/fluent-rating.png "Rating control")

### Description

In this control, the user can indicate, for example, how much they liked
something by selecting a certain number of stars.

### Key properties

*Value* – The initial value of a control before it's changed by the user.

*Max* – The maximum value to which the user can set a slider or a rating.

## Slider

A control with which the user can specify a value by dragging a handle.

![Slider control.](media/fluent-slider.png "Slider control")

### Description

The user can indicate a value, between a minimum and a maximum value that you
specify, by dragging the handle of a slider left to right or up and down, depending on the direction that you choose.

### Key properties

*Max* – The maximum value to which the user can set a slider or a rating.

*Min* – The minimum value to which the user can set a slider.

*Value* – The value of an input control.

*Layout* – Whether a control is displayed horizontally or vertically.

*Show value* – Whether a control should display the value.

## Text box

A box in which the user can enter text, numbers, and other data.

![Text box control.](media/fluent-text-box.png "Text box control")

### Description

The user can specify data by typing into a **Text box** control. Depending on how
you configure the app, that data might be added to a data source, used to
calculate a temporary value, or incorporated in some other way.

### Key properties

*Font* – The name of the family of fonts in which text appears.

*Text* – Text that appears on a control or that the user enters into a control.

## Toggle

A control that the user can turn on or off by moving its handle.

![Toggle control.](media/fluent-toggle.png "Toggle control")

### Description

A **Toggle** control is designed for the modern user interface, but behaves the same way as a check box.

### Key properties

*Checked* – Whether the control is checked or not.

*OffText* – The text of the off state.

*OnText* – The text of the on state.

## Difference between Fluent UI and classic controls

Properties of controls have been simplified for the ease of use. The following table lists differences between Fluent UI controls and classic control property names.

| Control type | Classic | Fluent UI |
|---------|:-------:|:------:|
|Button|Fill<br />Background<br />TabIndex|ColorFill<br />ColorBackground<br />AcceptsFocus|
|Check box|Default<br />TabIndex|Checked<br />AcceptsFocus|
|Combo box|InputTextPlaceholder<br />TabIndex|Text<br />AcceptsFocus|
|Date picker|SelectedDate<br />TabIndex|Value<br />AcceptsFocus|
|Label|Size|FontSize|
|Radio group|TabIndex|AcceptsFocus|
|Rating|Default<br />TabIndex|Value<br />AcceptsFocus|
|Slider|Default<br />TabIndex|Value<br />AcceptsFocus|
|Text box|Color<br />Default<br />Fill<br />SpellCheck<br />TabIndex|ColorText<br />Value<br />ColorBackground<br />EnableSpellCheck<br />AcceptsFocus|
|Toggle|Size<br />Default<br />TabIndex|FontSize<br />Checked<br />AcceptsFocus|

## Upgrade to modern controls

The Fluent UI (v8) controls in your canvas app in Microsoft Teams are deprecated. Modern controls replace them. Upgrade your apps to modern controls to keep getting the latest design, performance, and accessibility improvements. For more information, see [Upgrade Fluent UI controls to modern controls](../maker/canvas-apps/controls/modern-controls/upgrade-fluent-ui-controls-to-modern.md).


### See also

[Create additional apps](create-additional-apps.md)  
[Understand Power Apps Studio](understand-power-apps-studio.md)  
[Upgrade Fluent UI controls to modern controls](../maker/canvas-apps/controls/modern-controls/upgrade-fluent-ui-controls-to-modern.md)

---

## Create additional apps using Power Apps app from Teams | Microsoft Docs

Source: [create-additional-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/create-additional-apps)

*Learn about the available different methods to create additional apps using Power Apps app from Teams.*

# Create additional apps from Microsoft Teams

Using the Power Apps app to create the [first app](create-first-app.md) in a team creates an environment. After an environment is available, you can create additional apps in the team by using several methods. Let's take a look at them.

## Create an app from the Power Apps home

Select **Create an app** from the Power Apps app to get started with creating an app.

![Create an app from the Power Apps home.](media/additional-apps-1.png "Create an app from the Power Apps home")

When the team that you select already has an environment available, you're not prompted to install an environment. Instead, you can select **Create** to create the app.

![Select Create to create the app.](media/additional-apps-2.png "Select Create to create the app")

## Create an app from the environment home

To create an app for the environment, you can also select the environment on the left pane, and then select **New**.

![Create an app from the environment home.](media/additional-apps-3.png "Create an app from the environment home")

You can also select **Create** at the bottom of the environment list.

![Select Create from the environment list.](media/additional-apps-4.png "Select Create from the environment list")

## Create an app while inside a team

To create an app while you're inside a team, go to the team and select the channel. Select **Add a tab** ![Add a tab.](media/additional-apps-5.png "Add a tab").

![Create an app from inside a team by adding a tab.](media/additional-apps-7.png "Create an app from inside a team by adding a tab")

In the dialog box, select **Power Apps**, and then select **Create an app in Power Apps**.

![Create an app while inside a team.](media/additional-apps-6.png "Create an app while inside a team")

## Create an app from the solution explorer

You can also select **New** \> **Canvas app**, and then select an app layout to
create an app. A canvas app is an app that you can create from scratch
or using any available template through Power Apps Studio. More
information: [Canvas apps terminology reference and definitions](overview-of-the-power-apps-app.md#canvas-apps-terminology-reference-and-definitions)

![Create an app from the solution explorer.](media/additional-apps-8.png "Create an app from the solution explorer")

> [!TIP]
> Creating a canvas app using different methods doesn't affect which app features are available. If you want to change the app orientation and size after you selected a layout, go to [Change screen size and orientation of a canvas app](../maker/canvas-apps/set-aspect-ratio-portrait-landscape.md).

### See also

- [Microsoft Teams integration object](use-teams-integration-object.md)  
- [Use the Fluent UI controls](use-the-fluent-ui-controls.md)
- [Create apps from lists in Teams](create-apps-lists.md)

---

## Create an app from a list in Microsoft Teams

Source: [create-apps-lists.md](https://learn.microsoft.com/en-us/power-apps/teams/create-apps-lists)

*Learn about how to create an app from a list in Microsoft Teams*

# Create an app from a list in Microsoft Teams

You can create an app from within a [list in a Microsoft Teams channel](https://support.microsoft.com/office/create-a-list-in-a-teams-channel-7d2538c0-0177-4dcc-8e4c-44d218fc5a85).

> [!TIP]
> To learn more about the **Lists** app in Teams, go to [Overview of the Lists app in Microsoft Teams](/microsoftteams/manage-lists-app#overview-of-lists).

1. [Create a list in a Teams channel](https://support.microsoft.com/office/create-a-list-in-a-teams-channel-7d2538c0-0177-4dcc-8e4c-44d218fc5a85).

1. From the list, select **Integrate** > **Power Apps** > **Create an app**.

    :::image type="content" source="media/create-apps-lists/list-in-teams-power-apps-menu.png" alt-text="Create app from a Microsoft list in Teams.":::

1. If you have never used Power Apps in Teams before, you'll be prompted to add the Power Apps app to Teams. Select **Add** to install the Power Apps app in Teams. More information: [Install the Power Apps personal app in Microsoft Teams](install-personal-app.md)

1. In the modal that appears, enter a name for your app and then select **Save**.

    :::image type="content" source="media/create-apps-lists/power-apps-studio-save-app-from-list.png" alt-text="Name your app and save it.":::

    The app will be created using the data from your list.

1. (Optional) Customize your app by adding and configuring [controls](../maker/canvas-apps/add-configure-controls.md).

1. (Optional) Select **Publish to Teams** to publish your app to a channel of any team that you have access to, including the team where your Microsoft list is located.

    :::image type="content" source="media/create-apps-lists/power-apps-add-to-teams-channel.png" alt-text="Publish app to a Teams channel.":::

    > [!NOTE]
    > Apps created in Teams are only accessible within Teams. You may view your apps created in Teams by selecting **Integrate** > **Power Apps** > **See all apps** from the command bar of a list in Teams or by going directly to the **Build** tab in Power Apps in Teams. In the **Build** tab, a link is available to navigate to the rest of your apps in Power Apps web.

### See also

- [Create your first app in Microsoft Teams](create-first-app.md)
- [Create additional apps from Microsoft Teams](create-additional-apps.md)

---

## Microsoft Dataverse for Teams overview | Microsoft Docs

Source: [overview-data-platform.md](https://learn.microsoft.com/en-us/power-apps/teams/overview-data-platform)

*Provides the benefits of Dataverse for Teams.*

# Overview of Microsoft Dataverse for Teams

Microsoft Dataverse for Teams delivers a built-in, low-code data platform for Microsoft Teams. It provides relational data storage, rich data types, enterprise-grade governance, and one-click solution deployment. Dataverse for Teams enables everyone to easily build and deploy apps.

:::image type="content" source="media/tables-in-teams.png" alt-text="Dataverse for Teams table in Teams.":::

Some of the benefits of Dataverse for Teams include:

- Support to build low-code and no-code apps, flows, and chatbots for and within Teams.

- Core data capabilities from the same platform behind Microsoft Power Platform and Dynamics 365.

- Storage, rich data types with enterprise capabilities, and one-click solution deployment.

- A new visual editor that makes it even easier to define and populate table data.

- Enterprise security that's easy to use and aligned with the approach used in Teams.

- Inclusion in most existing Teams licenses.

- Storage of 2 GB per team, and support for up to 1 million rows.

- Support for 5 teams plus 1 additional team for every 20 licensed users.

- The capability to be upgraded to Dataverse.

For the latest licensing, capacity, and request-limit guidance, see [Dataverse for Teams FAQs](data-platform-faqs.md) and [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment).

## Tables in Dataverse for Teams

Dataverse for Teams tables provide the ability to create, populate, and query data within Dataverse for Teams. Tables represent different types of entities important to an organization, such as a table to store products or another to store orders.  

Each of these tables includes columns that contain data about the subject of the table. For example, a table named *Product* might have columns that contain a product name, product identifier, manufacturer identifier, and price. Each of these columns can contain different types of data. For example, the type of data for a product name is text, identifiers could be numbers, and so on.

A solution often has multiple tables that are used together in an application. For example, an Order table might reference multiple other tables, such as Customer, Product, and Country. These tables are "related" to one another, and tables provide the way to create those relationships.

You can create and populate these tables with a new visual editor that makes it even easier to work with these tables.

> [!NOTE]
> All the capabilities found in tables are powered by Dataverse for Teams. Although this will satisfy many situations, in some situations an organization might want to have additional capacity, capabilities, or control over their solution. In these scenarios, Dataverse for Teams environments can be upgraded to Microsoft Dataverse. The upgrade process has several considerations discussed in [Upgrade process](/power-platform/admin/about-teams-environment#upgrade-process) in the Microsoft Power Platform admin guide.

## Security in Dataverse for Teams

These tables and the applications that use them are secured with enterprise-grade security that's easy to understand and use for low-code and no-code developers. Security in Dataverse for Teams aligns to how security is handled in Teams, with a focus on Owners, Members, and Guests.

## Administer Dataverse for Teams environment

You can administer and manage Dataverse for Teams environment using the Power Platform admin center. More information: [About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment) in the Power Platform admin guide.

### See also

[How are Dataverse for Teams and Dataverse different?](data-platform-compare.md) <br />
[Create tables](create-table.md)<br/>
[Work with table relationships](relationships-table.md)<br/>
[Dataverse for Teams FAQs](data-platform-faqs.md)<br/>
[Overview of creating apps in Teams](create-apps-overview.md)

---

## Dataverse for Teams vs. Dataverse | Microsoft Docs

Source: [data-platform-compare.md](https://learn.microsoft.com/en-us/power-apps/teams/data-platform-compare)

*Explains the differences between Dataverse for Teams and Dataverse.*

# How are Dataverse for Teams and Dataverse different?

Applications within a team in Microsoft Teams have access to a Dataverse for Teams environment. Dataverse for Teams is a common platform that allows all these interfaces to have a unified understanding of how the data is modeled and consumed. Dataverse for Teams delivers a targeted set of the features commonly needed for creating apps, flows, and more within Teams. If your organization requires more capabilities, such as more granular control for security and governance, or capacity beyond the approximately 1 million rows a Dataverse for Teams environment can contain, Dataverse for Teams can be [upgraded](/power-platform/admin/about-teams-environment#upgrade-process) to Dataverse.

## Table features

Following are the differences between a Dataverse for Teams and Dataverse table features.

|Feature  |Dataverse for Teams  |Dataverse  |
|---------|---------|---------|
|Basic data types     |  Yes       |  Yes       |
|Advanced data types​ (customer, multiple transaction currencies)      |  No       |  Yes       |
|Relational storage      | Yes       |  Yes       |
|Non-relational storage (logs)   |  No       |  Yes       |
|Managed data lake      |  No       | Yes        |
|File and image support     | Yes        |  Yes       |
|Find, filter, sort     |   Yes      |  Yes       |
|Advanced and Dataverse search      |   No      | Yes        |
|Mobile offline     |  No       |  Yes       |

Most of the standard tables that are provided with a Power Platform environment won't be present as part of Dataverse for Teams.

## Business intelligence, professional developer, and maker features

This table describes the differences between Dataverse for Teams and Dataverse business intelligence and professional developer features.


|Area  |Feature  |Dataverse for Teams  |Dataverse  |
|---------|---------|---------|---------|
|Business intelligence     |  Data visualization   |  Yes    |  Yes   |
|      |   Paginated reports (SQL Server Reporting Services)   |  No    |  Yes     |
|Professional developer     | API access       |  No     |  Yes     |
|      |  Plug-ins       |   No      |  Yes       |
|      |  Power Apps component framework       |   No      |  Yes       |
| Maker     |  Create canvas apps      |   Yes     |  Yes       |
|        |  Create model-driven apps      |   No     |  Yes       |

## Environments

In Dataverse for Teams and Dataverse, data is stored within an environment. Dataverse for Teams creates a single environment for each team in Teams where you create data, apps, chatbots, and workflows. Environments support backups, point-in-time restore, and disaster recovery. With Dataverse for Teams, capacity is measured with relational, image, and file data. The 2-GB capacity provided to a team can typically store up to 1 million rows of data.

To make management easier, the lifecycle of the Dataverse for Teams environment is connected to that of the associated team. For example, when a team is deleted, the associated environment is also deleted.

Whereas Dataverse for Teams focuses on one environment per team for up to 10,000 teams, Dataverse supports unlimited environments in addition to capabilities that are relevant for multiple environments, such as copy and reset.


|Environment lifecycle  |Dataverse for Teams  |Dataverse  |
|---------|---------|---------|
|Environments   | 1 per Team     | Unlimited        |
|Maximum size     |   1 million rows or 2 GB      |  Unlimited     |
|Upgrade to Dataverse   |  Yes    |  N/A    |

## Security

Because collaboration in Teams happens with people inside and outside your organization, the security model needed to support this is easy to use. In Dataverse for Teams, access is preconfigured with a security role based on membership type such as owners, members, or guests.

Because Dataverse isn't specific to the Teams environment, it delivers more options for admin and user roles. It also includes many other security capabilities such as customer-managed keys, field-level security, hierarchical security, sharing, and support for legacy authentication.

> [!NOTE]
> Because Dataverse for Teams environments are specific to a team, they only contain one business unit.


|Security feature  |Dataverse for Teams  |Dataverse  |
|---------|---------|---------|
|Admin roles     |  System Administrator and System Customizer       |  System Administrator and System Customizer and other service admin roles. More information: [Use service admin roles to manage your tenant](/power-platform/admin/use-service-admin-role-manage-tenant)      |
|User roles    | Team owners, members, and guests        |  Several standard security roles and custom roles can also be created. More information: [Security roles and privileges](/power-platform/admin/security-roles-privileges)       |
|Activity logging     |  No       |  Yes       |
|Auditing     |  No       |  Yes       |
|Business units     |   One      |  Unlimited      |
|Customer-managed environment encryption key     |   No      |  Yes       |
|Field-level security     |   No      |  Yes       |
|Hierarchical security     |  No       |  Yes       |
|Record sharing     |  No       |  Yes       |
|Create Owner Teams**  | Yes      |  Yes       |
|Create Microsoft Entra group Teams  | No      |  Yes       |
|Record sharing to Group Teams | No      |  Yes       |
|Assign Teams Roles to Owner Teams<sup>1</sup> | Yes     | Yes   |
|Change record ownership** | Yes   | Yes  |

<sup>1</sup> *Can be done via a custom app in Power Apps* 

## Integration

Integration with Dataverse for Teams is delivered primarily through connectors. Support for both standard connectors and the ability to use the Dataverse connector to connect to a Dataverse for Teams for a Teams environment is included. Users with Premium licenses have access to the full set of over 350 standard and premium connectors available. This allows you to bring data into or retrieve data from tables in Dataverse for Teams, execute workflows when data in those tables change, and also use data from tables in workflow logic.

Dataverse can also use connectors. Additionally, Dataverse includes other built-in integration capabilities that can export data to a data lake or publish events to an event hub, service bus, or by using webhooks. Dataverse also supports the TDS protocol, which provides integration with SQL Server.

Dataverse can also be used with server-side sync to synchronize with Exchange or POP3, and with Data Export Service, which synchronizes data to Azure SQL Database.


|Integration feature  |Dataverse for Teams  |Dataverse  |
|---------|---------|---------|
|Power Automate     |   Yes      |  Yes       |
|Azure Synapse Link for Dataverse    |   No      |  Yes       |
|Data Export Service     |   No      |  Yes       |
|Events to Azure Event Hubs     |   No      |  Yes       |
|Events to Azure Service Bus     |   No      |  Yes       |
|Webhooks     |   No      |  Yes       |
|Server-side sync     |   No      |  Yes       |
|SQL Server Management Studio     |   No      |   Yes      |

  

### See also

[Create a table](create-table.md)

---

## Comparing Microsoft Lists, Dataverse for Teams, and Dataverse | Microsoft Docs

Source: [compare-data-sources.md](https://learn.microsoft.com/en-us/power-apps/teams/compare-data-sources)

*Quickly understand and apply the key considerations that will help you pick the correct data source for your app between one Microsoft Lists, Dataverse for Teams, and Dataverse.*

# Comparing Microsoft Lists, Dataverse for Teams, and Dataverse

Whether you’re using Power Apps to build a small app for your team or a mission critical app for your business, there are many great options for data. 

This article focuses on three of the most popular data technologies used in Microsoft Power Platform: Microsoft Lists, Microsoft Dataverse for Teams, and Microsoft Dataverse. With the answers to the questions below, you can quickly understand and apply the key considerations that will help you pick the correct one for your application.

The questions are broken out into four categories: 

|Category |Questions |
|----------|---------|
| Data |What types of data (and how much of it) will your application require?<br/>How do you want to search the data? |
|Application | How will the app be made available? For example, will it be a Teams app, custom code, or something else?<br/>Will guests be accessing your application?<br/>Who will build the app; low-code or pro developers?<br/>What special capabilities does your application need? |
|Integration |What do you want to integrate the system with? For example, databases, services, and so on? |
|Admin and governance | What are your organizations requirements related to security and compliance?<br/>Are there special requirements for backing up and restoring the data? |

## Key considerations and differences between Lists, Dataverse for Teams, and Dataverse

Using the answers to the questions above, use the table below to help identify the right technology for your application.

|Considerations  |Lists  |Dataverse for Teams  |Dataverse  |
|- |- |- |- |
|Types of data  |Lists, File, Image  |Relational, File, or Image  |Relational, File, Image, Lake, Log, Dataverse Search<br/>Virtual tables  |
|Number of data types  |15  |23 (Currency is basic version)  |24 (Currency is advanced version)  |
|Common Data Model  |N/A  |User table only  |Full support  |
|Capacity  |Up to 30M rows<br/>([considerations](/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits) for lists > 100k)  |Up to 1M rows<br/><br/>Small number of files or images<br/><br/>For limits on API requests per day, go to the entitlements available for Microsoft 365 apps with Power Platform access in the article: [Request limits based on user licenses](/power-platform/admin/api-request-limits-allocations#request-limits-based-on-user-licenses)  | No specified limit on rows. <br/><br/>No specified limit of files or images.<br/><br/> For limits on API requests per day, with option of capacity add-ons, go to this article: [Request limits based on user licenses](/power-platform/admin/api-request-limits-allocations#request-limits-based-on-user-licenses)  |
| Data movement  |Create from/Export to Excel  |Dataflows In  |Dataflows In/Out<br/>Server-side sync<br/>Synapse Integration (Bring Your Own Data Lake, Data Factory)  |
|Security  |Owners, Members, Visitors, Designers, Approvers roles Customizable permissions  |Owner, Member, Guest roles<br/><br/> Share app with Azure AD group  |Robust options to satisfy complex enterprise scenario requirements, such as roles, business units, auditing, CMK, hierarchical/field-Level security, and so on  |
|Clients  |Lists, Teams<sup>1</sup>, custom code   |Teams  |Teams, Power Apps, Power Pages, Dynamics 365, custom code |
|Guest limitations  |Can't create or delete a list  |Can't make, install, or edit apps  |Must be in Azure AD using Azure B2B  |
|Pro developer capability  |REST API<br/>Graph API  | N/A  |REST API<br/>Software Development Kit (SDK)<br/> Plug-in Support <br/>Integration (Event Hub, Service Bus, Webhook, Export to Lake) SQL Server Management Studio Integration  |
|Package and deploy  |Package and deploy Lists  |Single unmanaged solution per environment  |Unlimited  |
|Additional capabilities  |Calculations and rollups  | N/A  |Business workflows<br/>Business rules<br/>Calculations and rollups<br/>Mobile offline  |

<sup>1</sup>You can't create or pin lists on Power Apps mobile.

### See also
[Dataverse and Dataverse for Teams licensing](/power-platform/admin/powerapps-flow-licensing-faq#dataverse) <br />
[How are Dataverse for Teams and Dataverse different?](data-platform-compare.md) <br />
[What is Dataverse?](/powerapps/maker/data-platform/data-platform-intro)

---

## Create a table in Teams | Microsoft Docs

Source: [create-table.md](https://learn.microsoft.com/en-us/power-apps/teams/create-table)

*Explains how to create a Dataverse for Teams table.*

# Create tables in Microsoft Teams

In Teams, data is defined by *tables*. To create a table, you must be a member of a team.

> [!NOTE]
> The Teams experience changes frequently. If the current Teams UI or screenshots in this article don't match what you see, use the option names and overall flow as your guide.

If you need to work with existing data after the table is created, see [Edit table data in Excel and publish it back to Dataverse for Teams](edit-data-in-excel.md) and [Dataverse for Teams FAQs](data-platform-faqs.md#how-do-users-import-data-into-tables-in-dataverse-for-teams).

## Types of tables

Whereas Dataverse has two types of tables (a standard table with ownership defined and an activity table), you can only create standard tables in Dataverse for Teams.

You define the type of table by selecting **More settings** when you create a table.

There are four different types of table ownership. When you create a table, the only options are **user**, **team owned**, or **organization-owned**, but you should be aware that other tables have different ownership types. More information: [Types of tables in Dataverse](../maker/data-platform/types-of-entities.md)

## Create a table

Watch this video for a quick overview about how to create a table in Dataverse for Teams:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=a7b07bc4-1e08-4ed9-8675-b700a8e1a6a3]

1. Sign in to Teams, and then select the link for **Power Apps**.
   > [!div class="mx-imgBorder"] 
   > ![Sign in to Power Apps.](media/create-table1.png "Sign in to Power Apps")

2. Select the **Build** tab, and then select **See all**.
   > [!div class="mx-imgBorder"] 
   > ![The Build tab.](media/create-table2.png "The Build tab")

3. Select **New** on the command bar, and then select **Table**.
    > [!div class="mx-imgBorder"] 
    > ![New table menu option.](media/create-table3.png "New table menu option")

4. In the **New table** pane, enter the following information. Required columns are designated with an asterisk (*) next to the column label.
    - **Display name**: The name of the table to be displayed. For example, **Product**.
    - **Plural display name**: The name used to reflect multiples of what the table contains. For example, **Products**.
    - **Name**: A unique internal name for the table. Unlike the display name, after it's saved this value can't be changed.
       > [!NOTE]
       > Each Dataverse for Teams environment is assigned a prefix when it's created, such as **cr628**. The name for every table and column you create will be prefixed with this value. This value can't be changed.
    - **Display name** (Primary name column): Every table contains a primary name column, which is used by lookup fields when establishing relationships with other tables. Typically the primary name column stores the name or primary description of the data stored in the entity.
    - **Name** (Primary name column): This column is pre-populated based on the primary name column name you enter. It includes the prefix. You cannot change this after the table is saved.
    - **More settings**: This area provides additional settings that are available. More information: [Create a custom table](../maker/data-platform/data-platform-create-entity.md).
     
      <img src = "media/create-table4.png" alt = "Column details" width = "350" height = "586">

5. Select **Done**.

### See also

[Edit or delete a table](edit-delete-table.md)
[Overview of Microsoft Dataverse for Teams](overview-data-platform.md)
[Dataverse for Teams FAQs](data-platform-faqs.md)

---

## Delete or edit a table in Dataverse for Teams| Microsoft Docs

Source: [edit-delete-table.md](https://learn.microsoft.com/en-us/power-apps/teams/edit-delete-table)

*Explains how to delete or edit a table in Dataverse for Teams.*

# Edit or delete a table

With Dataverse for Teams, you can perform the following types of operations on a table:

- Create table columns.
- Delete a table.
- Create, edit, and delete table relationships. More information: [Work with table relationships](relationships-table.md)

## Edit table properties

In Microsoft Teams, you can edit four table properties:

- **Display name**: The name you want to display for the table.
- **Plural display name**: The plural of the table name, when needed for display.
- **Description**: A brief description of the purpose of the table.
- **Quick create settings**: This enables quick creation of records for client apps that support this feature.

> [!NOTE]
> - You can also edit a table using the visual editor. More information: [Create your first table](create-first-app.md#create-your-first-table)
> - Each Dataverse for Teams environment is assigned a prefix when it's created, such as **cr1a3**. The name for every table and column you create will be prefixed with this value. This value can't be changed.

1. On the left pane, select **Tables**.
2. Select the table you want and then select **Settings** on the command bar to display the **Edit table** dialog box.  
   <img src = "media/edit-table1.png" alt = "Edit table" width = "350" height = "557">
    
    For more information about these settings, see [Create a table](../maker/data-platform/data-platform-create-entity.md#create-a-table).
4. Make the changes you want, and then select **Done**.

## Edit table columns

You can edit table columns using the visual editor. 

1. On the left pane, select **Tables**.
2. Select the table you want, select **Edit data** on the command bar to display the visual editor.

   :::image type="content" source="media/edit-table2.png" alt-text="Quick edit visual editor.":::

More information: [Create your first table](create-first-app.md#create-your-first-table)

## Delete a table

Anyone who's a member of the team can delete tables that aren't part of a [managed solution](/power-platform/alm/solution-concepts-alm#managed-and-unmanaged-solutions).

In the **Tables** list, select **…** next to the table you want to delete, and then select **Delete table**. Alternatively, while viewing a table, select **Delete table** on the command bar.
<!-- >> [!div class="mx-imgBorder"] 
> ![Delete table.](media/delete-table.png "Delete table")  -->

### See also

[Work with table relationships](relationships-table.md)

---

## Table relationships in Dataverse for Teams | Microsoft Docs

Source: [relationships-table.md](https://learn.microsoft.com/en-us/power-apps/teams/relationships-table)

*Explains how to create and use table relationships in in Dataverse for Teams.*

# Work with table relationships

Table relationships define the ways that table records can be associated with records from other tables or the same table. There are three types of table relationships. Dataverse for Teams allows for the creation of the same relationship types as Dataverse does:

- **One-to-many relationships**. In this type of relationship, each row in table A can match more than one row in table B, but each row in table B can match only one row in table A. For example, a class of students have a single classroom.

- **Many-to-one relationships**. In this type of relationship, each row in table B can match more than one row in table A, but each row in table A can match only one row in table B. For example, one single teacher teaches many classes.

- **Many-to-many relationships**. In this type of relationship, each row in table A can match more than one row in table B, and vice versa. For example, students attend many classes, and each class can have multiple students.

More information: [Entity relationships](../maker/data-platform/create-edit-entity-relationships.md)

## Create a table relationship

To add a lookup relation to a table, create a relation on the **Relationships** tab and specify the table with which you want to create a relationship.

1. In the **Power Apps** section of Microsoft Teams, select the table to create a relationship. This can be done by opening the table and selecting the **Relationships** tab.

   > [!div class="mx-imgBorder"] 
   > ![Relationships tab.](media/create-relate-table.png "Relationships tab") 

   Or, on the left pane, expand **Tables**, expand the table you want, and then select **Relationships**. <br />

 <!--   > [!div class="mx-imgBorder"] 
    > ![Create a relationship from the left pane.](media/create-relate-table2.png "Create a relationship from the left pane") -->

2. When the relationships page is open, select **Add relationship**, and then select the type of relationship you want to create (for example, **Many-to-one**).

   > [!div class="mx-imgBorder"] 
   > ![Add a relationship.](media/create-relate-table3.png "Add a relationship")

More information: [Create a relationship between entities](../maker/data-platform/data-platform-entity-lookup.md) 

> [!NOTE]
> When defining columns of type lookup within a table, a many-to-one relationship is created automatically.

## Edit a table relationship

Editing relationships in Dataverse for Teams works the same as Dataverse except that you can't manage collaboration functions, such as allowing feedback or enabling SharePoint document management. More information: [Relationship actions](../maker/data-platform/create-edit-entity-relationships.md#actions)

## Delete a table relationship

While viewing table relationships, select the table relationship you want to delete, and then do one of the following:

- Select **Delete relationship** on the command bar.

   <img src="media/delete-table-relationship1.png" alt="Delete table relationship from command bar" height="300" width="350">

- Select **…** next to the relationship, and then select **Delete relationship**.
   > [!div class="mx-imgBorder"] 
   > ![Delete table relationship in context.](media/delete-table-relationship2.png "Delete table relationship in context") 

### See also

[Work with table columns](table-columns.md)

---

## Work with Dataverse for Teams table columns | Microsoft Docs

Source: [table-columns.md](https://learn.microsoft.com/en-us/power-apps/teams/table-columns)

*Explains how to create and use Dataverse for Teams table columns.*

# Work with table columns

With the exception of the Customer column, all column types in Dataverse are available in Dataverse for Teams as *columns*. This article covers the content you'll need for working with table columns in Dataverse for Teams.

Watch this video for a quick overview about column data types in Dataverse for Teams:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=416d5037-a701-436d-bd77-e7fcb5329ead]

Notice that the currency feature will always use the default currency for the country/region that was selected during Dataverse for Teams environment creation. This can't be changed, and additional transaction currencies or exchange rates can't be added. However, you can upgrade from Dataverse for Teams to Dataverse for full currency functionality.

For more information about the columns available, see these Dataverse articles:

- [Columns overview](../maker/data-platform/fields-overview.md)
- [Create and edit global option sets overview](../maker/data-platform/create-edit-global-option-sets.md)
- [Autonumber columns](../maker/data-platform/autonumber-fields.md)
- [Set managed properties for columns](../maker/data-platform/set-managed-properties-for-field.md)
- [Behavior and format of the Date and Time column](../maker/data-platform/behavior-format-date-time-field.md)

## Create a column

Watch this video to learn how to create columns in Dataverse for Teams:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=9a5cecc2-2fce-4ad5-adc9-0d68afb3426c]

1. On the **Build** tab, select **See all**, and then expand **Tables**. 
2. Select the table you want to add a column to, and then select **Add column** on the command bar.
    > [!div class="mx-imgBorder"] 
    > ![Create a table column.](media/create-table-column.png "Create a table column")

The rest of the process to add and manage columns is the same as in Dataverse, which is documented in these articles:
- [Create and edit columns for Dataverse using Power Apps portal](../maker/data-platform/create-edit-field-portal.md)
- [Manage custom columns in an entity](../maker/data-platform/data-platform-manage-fields.md)

## Choice columns

In Dataverse for Teams, choices can only be created as a column within a table. Creating choices is otherwise the same as creating an option set in Dataverse. More information: [Create an Option set](../maker/data-platform/custom-picklists.md)

## Calculated and rollup columns

Calculated columns and rollup columns are not currently supported in Dataverse for Teams.

### See also

[Create a table](create-table.md)

---

## Work with Dataverse for Teams formula table columns | Microsoft Docs

Source: [formula-columns.md](https://learn.microsoft.com/en-us/power-apps/teams/formula-columns)

*Explains how to create and use formula table columns in Dataverse for Teams.*

# Work with formula table columns (preview)

[This topic is pre-release documentation and is subject to change.] More information: [Power Apps preview program](/power-platform/admin/preview-environments)

Formula columns are a data type in Microsoft Dataverse for Teams that are built on Power Fx. You can add a formula column to a table in real time. The Dataverse table stores the logic and gives you the values during fetch operations. Formula columns use the Power Fx syntax that's similar to Office Excel. As you enter the formula, Intellisense helps you with recommendations for formula, syntax, and errors.

> [!NOTE]
> Formula columns can be added as a calculated field. Currently, formula columns can't be used in roll-up fields or with plugins.

## Add a formula column

1. On the **Build** tab, select **See all**, and then expand **Tables**.
1. From the list of tables in Power Apps app for Teams, select the table you want.
1. Select **Add column** or select **Edit data** > **Add column**. When you select **Edit data**, you can also select **+** on the column where you want to add the formula column.
1. In the **Add new column** pane: 
   - Enter a **Name** for the column, such as *Total price*.
   - Select **Formula** as the **Type**.
   - Enter the formula in the **Expression** box. In this example, the *Price* column (Decimal data type) is multiplied by the *Number of units* column (Number data type).  Select **Create**.
   :::image type="content" source="media/create-formula-column.png" alt-text="Create a formula column":::

When you create a record, the formula column executes the formula and displays the data for the record. If the formula column value for a record doesn't update, select **Refresh** on the command bar to execute the formula.

:::image type="content" source="media/record-example-formula-column.png" alt-text="Example record with a formula column":::

Notice that the column type is determined by the formula. You can change the formula after you’ve created it if it doesn’t change the column type. For example, the formula *price * discount* creates a column type of number, whereas the formula *First & “ “ & Last* creates a column type of string. You can change a *price * discount* formula to  *price * (discount +10%)* because that doesn’t change the column type. However, once saved, you can’t change the *price * discount* formula to  *Text(price * discount)* because that would require changing the column type to string.

## Data types

The following data types can be displayed in a formula column:

- Text
- Decimal Number
- Yes/No (boolean)
- Date

> [!NOTE]
> The Currency data type is not currently supported.

## Function types

The following function types are supported with the formulas used in a formula column:

- Decimal
- String
- Boolean
- Option Set
- DateTime (TZI)
- DateTime (User local) (limited to comparisons with other user local values and the DateAdd function)
- DateTime (Date only) (limited to comparisons with other date-only values, and the DateAdd function)
- Currency
- Whole Number, promoted to Decimal

## Operators

These operators are supported with the formulas used in a formula column: <br>
+, -, \*, /, %, ^, in, exactin, &

More information: [Operators in Power Apps](../maker/canvas-apps/functions/operators.md)

## Available functions 

The following scalar functions are available with formula columns.

:::row:::
   :::column span="":::
      [Abs](../maker/canvas-apps/functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [And](../maker/canvas-apps/functions/function-logicals.md)
   :::column-end:::
   :::column span="":::
      [Average](../maker/canvas-apps/functions/function-aggregates.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Blank](../maker/canvas-apps/functions/function-isblank-isempty.md)
   :::column-end:::
   :::column span="":::
      [Char](../maker/canvas-apps/functions/function-char.md)
   :::column-end:::
   :::column span="":::
      [Concatenate](../maker/canvas-apps/functions/function-concatenate.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [DateAdd](../maker/canvas-apps/functions/function-dateadd-datediff.md)
   :::column-end:::
   :::column span="":::
      [DateDiff](../maker/canvas-apps/functions/function-dateadd-datediff.md)
   :::column-end:::
   :::column span="":::
      [Day](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [EndsWith](../maker/canvas-apps/functions/function-startswith.md)
   :::column-end:::
   :::column span="":::
      [Exp](../maker/canvas-apps/functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [Hour](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [If](../maker/canvas-apps/functions/function-if.md)
   :::column-end:::
   :::column span="":::
      [IfError](../maker/canvas-apps/functions/function-iferror.md)
   :::column-end:::
   :::column span="":::
      [Int](../maker/canvas-apps/functions/function-round.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [IsBlank](../maker/canvas-apps/functions/function-isblank-isempty.md)
   :::column-end:::
   :::column span="":::
      [IsError](../maker/canvas-apps/functions/function-iferror.md)
   :::column-end:::
   :::column span="":::
      [ISOWeekNum](../maker/canvas-apps/functions/function-weeknum.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [IsUTCToday](../maker/canvas-apps/functions/function-now-today-istoday.md)
   :::column-end:::
   :::column span="":::
      [Left](../maker/canvas-apps/functions/function-left-mid-right.md)
   :::column-end:::
   :::column span="":::
      [Len](../maker/canvas-apps/functions/function-len.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Ln](../maker/canvas-apps/functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [Lower](../maker/canvas-apps/functions/function-lower-upper-proper.md)
   :::column-end:::
   :::column span="":::
      [Max](../maker/canvas-apps/functions/function-aggregates.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Mid](../maker/canvas-apps/functions/function-left-mid-right.md)
   :::column-end:::
   :::column span="":::
      [Min](../maker/canvas-apps/functions/function-aggregates.md)
   :::column-end:::
   :::column span="":::
      [Minute](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Mod](../maker/canvas-apps/functions/function-mod.md)
   :::column-end:::
   :::column span="":::
      [Month](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Not](../maker/canvas-apps/functions/function-logicals.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Or](../maker/canvas-apps/functions/function-logicals.md)
   :::column-end:::
   :::column span="":::
      [Power](../maker/canvas-apps/functions/function-numericals.md)
   :::column-end:::
   :::column span="":::
      [Replace](../maker/canvas-apps/functions/function-replace-substitute.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Right](../maker/canvas-apps/functions/function-left-mid-right.md)
   :::column-end:::
   :::column span="":::
      [Round](../maker/canvas-apps/functions/function-round.md)
   :::column-end:::
   :::column span="":::
      [RoundDown](../maker/canvas-apps/functions/function-round.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [RoundUp](../maker/canvas-apps/functions/function-round.md)
   :::column-end:::
   :::column span="":::
      [Second](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [Sqrt](../maker/canvas-apps/functions/function-numericals.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [StartsWith](../maker/canvas-apps/functions/function-startswith.md)
   :::column-end:::
   :::column span="":::
      [Substitute](../maker/canvas-apps/functions/function-replace-substitute.md)
   :::column-end:::
   :::column span="":::
      [Sum](../maker/canvas-apps/functions/function-aggregates.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Switch](../maker/canvas-apps/functions/function-if.md)
   :::column-end:::
   :::column span="":::
      [Text](../maker/canvas-apps/functions/function-text.md) \*
   :::column-end:::
   :::column span="":::
      [Trim](../maker/canvas-apps/functions/function-trim.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Trunc](../maker/canvas-apps/functions/function-round.md)
   :::column-end:::
   :::column span="":::
      [TrimEnds](../maker/canvas-apps/functions/function-trim.md)
   :::column-end:::
   :::column span="":::
      [Upper](../maker/canvas-apps/functions/function-lower-upper-proper.md)
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [UTCNow](../maker/canvas-apps/functions/function-now-today-istoday.md)
   :::column-end:::
   :::column span="":::
      [UTCToday](../maker/canvas-apps/functions/function-now-today-istoday.md)
   :::column-end:::
   :::column span="":::
      [Value](../maker/canvas-apps/functions/function-value.md) \*
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      [Weekday](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
   :::column span="":::
      [WeekNum](../maker/canvas-apps/functions/function-weeknum.md)
   :::column-end:::
   :::column span="":::
      [Year](../maker/canvas-apps/functions/function-datetime-parts.md)
   :::column-end:::
:::row-end:::

\* The **Text** and **Value** functions only work with whole numbers, where no decimal separator is involved. Since the decimal separator varies across locales, and the formula columns are evaluated without locale knowledge, there's no way to properly interpret or generate the decimal separator.

### See also

[Work with table columns](table-columns.md) <br />
[Formula reference for Power Apps](../maker/canvas-apps/formula-reference.md)

---

## Edit table data in Excel and publish it back to Dataverse for Teams | Microsoft Docs

Source: [edit-data-in-excel.md](https://learn.microsoft.com/en-us/power-apps/teams/edit-data-in-excel)

*Explains how to edit table data in Dataverse for Teams.*

# Edit table data in Excel and publish it back to Dataverse for Teams

By opening Dataverse for Teams table data in Microsoft Excel, you can quickly and easily view and edit the data by using the Microsoft Power Apps Office Add-in.
:::image type="content" source="../maker/data-platform/media/data-platform-cds-excel-addin/ExcelAddin.png" alt-text="Dataverse for Teams table data in Excel.":::

To install the Power Apps Excel Add-in, see [Microsoft PowerApps Office Add-in](https://marketplace.microsoft.com/product/office/WA104380330?tab=Overview). For more information about how to add or remove an Office Excel Add-in, see [Add or remove add-ins in Excel](https://support.office.com/article/add-or-remove-add-ins-in-excel-0af570c4-5cf3-4fa9-9b88-403625a0b460).

## Open table data in Excel

1. Sign in to Teams, and then in the left pane, select the **Power Apps**.
1. Select the **Build** tab, and then select **See all**.
1. In the left navigation pane, select **Tables**, next to the table you want, select **…**, and then select **Edit data in Excel**.
   :::image type="content" source="media/edit-data-in-excel.png" alt-text="Edit data in Excel command.":::

1. Open the Excel worksheet that is downloaded to your browser's default download folder named similar to *crdcb_table-name (1591125669213).xlsx*.
1. In Excel, select **Enable editing** to enable the Power Apps Excel Add-in to run. The Excel Add-in runs in a pane on the right side of the Excel window.

> [!IMPORTANT]
> - If the pane displays an error message, see [Office Store Add-in download disabling](../maker/data-platform/data-platform-excel-addin.md#office-store-add-in-download-disabling).
> - If this is the first time that you've run the Power Apps Excel Add-in, you must **Trust this Add-in** to allow the Excel Add-in to run.
> - The maximum table size when editing in Excel is one million cells. If there are too many rows or columns, not all data will be read or published.

## Next steps
- [View and refresh data in Excel](../maker/data-platform/data-platform-excel-addin.md#view-and-refresh-data-in-excel)
- [Edit data in Excel](../maker/data-platform/data-platform-excel-addin.md#edit-data-in-excel)
- [Configure the add-in to adjust tables and columns](../maker/data-platform/data-platform-excel-addin.md#configure-the-add-in-to-adjust-tables-and-columns)
- [Troubleshooting](../maker/data-platform/data-platform-excel-addin.md#troubleshooting)

---

## Move customizations between environments | Microsoft Docs

Source: [import-solution-in-teams.md](https://learn.microsoft.com/en-us/power-apps/teams/import-solution-in-teams)

*Explains how to transport customizations between Microsoft Dataverse for Teams environments or between Dataverse and Dataverse for Teams.*

# Move customizations between environments

Microsoft Dataverse for Teams provides a simplified way to transport customizations between Dataverse for Teams environments. Additionally, customizations can also be moved between Dataverse and Dataverse for Teams environments.

## Export customizations from Dataverse for Teams

Take the following steps to export your customizations from Dataverse for Teams. Notice that the solution packages you export from Dataverse for Teams are unmanaged.
1. From the Power Apps personal app in Teams, select the **Build** tab of the team where you want to export your customizations. More information: [Install the Power Apps personal app in Microsoft Teams](install-personal-app.md)
1. Select **See all**, and select the items you want to export. 
1. On the command bar, select **Export**.
1. You can now review your selected items. By default, all dependencies of the items you selected are added too.
   - We recommend that you keep the option **Export all dependencies**  under **Advanced settings** selected. By including all dependencies, you're optimizing your success when importing your customizations into another environment.
   - If you prefer to manually select the dependencies of your items, you can change the value to **Export selected dependencies** under **Advanced settings**. Importing customizations that don't include all dependencies will fail if those dependencies aren't already in the destination environment.

     ![Review selections.](media/export-customizations.png)
1. Select **Export as zip**. The selected items are exported as a compressed solution file (.zip). The solution file is automatically offered for download when the export completes.
   - Files you download from Microsoft Teams will show up in your device's downloads folder. In Microsoft Teams desktop, you can navigate to the **Downloads** section by select **Files** on the left side of the Teams client.

## Import customizations into Dataverse for Teams

Take the following steps to import your customizations into Dataverse for Teams:

1. From the Power Apps personal app in Teams, select the **Build** tab of the team where you want to import your customizations. More information: [Install the Power Apps personal app in Microsoft Teams](install-personal-app.md)
1. Select **See all**, and then on the command bar, select **Import**.
1. On the **Import a solution** page, select **Browse**.

    ![Select Browse.](media/teams-import-solution.png)
1. Locate the compressed (.zip) file that contains the solution you want to import, select **Open**, and then select **Next**. 
1. Review the items that you want to import.
   - If you're importing an unmanaged solution, you can select the item that you want to import into your team. We recommend that you keep the default selection and import all of the items. This helps ensure that all items and their dependencies are imported. Import will fail when you exclude an item that isn't already in the team and another item in the import is dependent on it.
   - If you're importing a managed solution, all the items will be imported.
 
   ![Choose items to import.](media/import-customizations.png)
1. Depending on the components in the solution, you might be prompted for additional information when you select **Next**.
   - If your solution contains connection references, you’ll be prompted to select the connections you want. If a connection doesn't already exist, create a new one.
   - If your solution contains environment variables, you'll be prompted to enter values. You won't see this page if values are already present in your solution or the target environment.
1. Select **Import**.

Your solution imports in the background and might take a while. A notification appears on the **Build** tab as the solution is imported.

![Currently importing solution message.](media/teams-import-staus.png)
After the import completes, a success or failure notification is displayed.
 
The location of your solution components is different depending on whether you imported a managed or unmanaged solution:
* With a managed solution, all your customizations appear on the **Build** tab under **Installed apps** using the name of the solution.
* With an unmanaged solution, all your customizations appear on the **Build** tab under **Built by this team**.

## Move customizations from Microsoft Dataverse to Dataverse for Teams
### Create a solution in a Power Platform environment
The first step to move your customizations from Microsoft Dataverse to Dataverse for Teams is to create a solution in Dataverse. Include only components that are fully supported for Dataverse for Teams. Solutions that include components that aren't supported by Dataverse for Teams won’t import. 

The following custom components can be imported into Dataverse for Teams:

* Canvas apps
* Tables
* Flows
* Bots
* Connection references
* Environment variables

> [!NOTE]
> Only include items that you or your team have created. Solutions that contain any of the standard Dataverse or Dynamics 365 tables, such as account or contact, won’t import.

For information about the differences between Dataverse for Teams and Dataverse, go to [How are Dataverse for Teams and Dataverse different?](data-platform-compare.md)

For information about how to create a solution with Dataverse, go to [Create a solution](../maker/data-platform/create-solution.md).

### Export the solution from Dataverse

Typically, you want to export your solution from Dataverse as managed. However, if your goal is to transport your customizations to Dataverse for Teams and continue your development from there, export your solution as an unmanaged solution. More information: [Export solutions](../maker/data-platform/export-solutions.md) 

You can now import your solution into Dataverse for Teams. More information: [import customizations into Dataverse for teams](#import-customizations-into-dataverse-for-teams).

## Troubleshooting import failures

If the import isn’t successful, you’ll see a notification on the solutions page that displays error or warning messages that were captured. Select **Download Log File** to capture details about what caused the import to fail. The most common cause for an import to fail is that the solution didn't contain some required components.

When you download the log file, you'll find an XML file in your browser's default download folder that you can open using an XML reader, such as Microsoft Excel, to view the contents.

## Known issues

When you're working with a new Dataverse for Teams environment, the **Import** command is missing because the **See all** link located on the **Build** tab isn't displayed for that environment.  

To work around this issue, create and save an app in the environment. When an item exists in the environment, the **See all** link is available and you'll be able to browse to the **Build** tab.

### See also

[Export solutions](../maker/data-platform/export-solutions.md)

---

## View Dataverse for Teams table data in Power BI Desktop (preview) | Microsoft Docs

Source: [view-table-data-power-bi.md](https://learn.microsoft.com/en-us/power-apps/teams/view-table-data-power-bi)

*Provides an overview of Dataverse for Teams.*

# View Dataverse for Teams table data in Power BI Desktop

You can use Power BI Desktop to view data from tables in Dataverse for Teams. This enables you to create sophisticated reports to analyze data from your Dataverse for Teams tables. This is possible using a new connector that can use direct query mode for real-time data while enforcing the Dataverse for Teams security model when accessing data. Additionally, the connector automatically maps relationships.

## Prerequisites

You must have the appropriate Power BI [license](/power-bi/admin/service-admin-licensing-organization) to build and share Power BI reports.

## Step 1: Get the environment URL

Follow the steps to get the URL of your Dataverse for Teams environment, which is required to connect from the Power BI Desktop.

1. Start Teams, and sign in.

1. In the left pane, select **Power Apps**, and then select the **Build** tab.

1. Select the team in the left pane that contains the data you want to view in Power BI.

    ![Select a team to view data.](media/select-team-data.png)

1. Select the **About** tab, and then select **Session Details** to display the session details information.<br/> Copy the Instance url value to notepad. This is the environment URL of your Dataverse for Team environment. For example: `https://orga0e34f66.crm.dynamics.com/`

    ![Select about tab - session details.](media/copy-env-url.png)

## Step 2: View the table data in Power BI

1. Open Power BI Desktop, and sign in. Don’t have Power BI
    Desktop? [Get it now](https://powerbi.microsoft.com/downloads/).

1. Select **Get data**.

1. On the **Get Data** page, select **Power Platform** > **Dataverse**. Select **Connect**.

1. Read the preview disclaimer and select **Continue**.
 
1. On the next page, specify the environment URL that you copied earlier. Make sure you remove `https://` and the trailing `/` from the URL. So, in this case you will add `orga0e34f66.crm.dynamics.com`.<br/>Select the data connectivity mode and select **OK**.

    ![Specify the environment URL.](media/set-env-url.png)

1.  On the next page, select **Sign in**. You'll be prompted to specify your credentials to sign in to your Dataverse for Teams environment. Specify your credentials and submit.
 
1. On successful sign in, the **Connect** button becomes available. Select **Connect**. 

   ![Connect to your table.](media/select-connect.png)

    The environment appears in the Power BI Desktop **Navigator** window. Expand it to view the tables available to analyze. Select a table to view its data.

   ![Views your tables.](media/pbi-navigator.png)

For more information about working with Power BI Desktop, see [Get started with Power BI Desktop](/power-bi/desktop-getting-started).

### See also

[View Dataverse table data in Power BI Desktop (preview)](../maker/data-platform/view-entity-data-power-bi.md) <br/>
[Dataverse for Teams FAQs](data-platform-faqs.md)

---

## Dataverse for Teams environment language | Microsoft Docs

Source: [language-data-platform.md](https://learn.microsoft.com/en-us/power-apps/teams/language-data-platform)

*Dataverse for Teams environment language.*

# Dataverse for Teams environment language

A Dataverse for Teams environment is automatically created when a Teams user *either* [creates an app](create-first-app.md) in a team using the Power Apps app for the first time *or* installs an app (created using Power Apps app) in a team for the first time from the Teams app catalog. During the environment creation, the environment’s language is set to the tenant default language.

The language settings for the environment define the language, sorting, and search formats of the tables in the environment. The *default* language set during the automatic creation of the environment can't be changed thereafter. 

When a user accesses the Power Apps app within a team in Microsoft Teams, the user’s language setting is compared against the default language of the Dataverse for Teams environment for the team. Depending on the match of the languages, the following happens:
 
- If the user's language setting matches the default language of the environment, the default language is used to display existing information and for creating new tables and columns.

- If the user's language setting is different from the default language of the environment and the environment:

    - Doesn't have the required language pack installed, the new language pack matching the user's language setting will automatically be installed in the environment. It might take up to 15 minutes for the language pack installation to complete. This is a one-time installation, and will only occur the first time a new language is used.

    - Already has the required language pack installed, the environment will use the user’s language.

    Also, this does not change the default language of the environment, but provides a localized user experience for the user when viewing the existing information in the team, and allows all new tables and columns created by the user to have localized labels that match their language.

> [!IMPORTANT]
> - Any existing tables or columns at the time of the language change will not be translated to another language. They will continue to use the existing names.
>- In some cases, a language supported by Teams might not be available in Dataverse for Teams and other Power Platform features. When this happens, the nearest fallback language is used for the interface. More information: [Supported languages and fallbacks](#supported-languages-and-fallbacks) later in this topic. 

### Example

User A’s language is English (United States) in Teams and they create an app in a team called Team 1. 

User B’s language is set to French in Teams and they access the Power Apps app in Team 1.
- If the Dataverse for Teams environment doesn't have the French language pack installed, it will be automatically installed in the environment for Team 1. The user interface for User B immediately changes to French while the language pack is installed. After the language pack is installed, any new tables and columns will be created in the French language.
- If the Dataverse for Teams environment for Team 1 already has the French language pack installed, no additional installation is required.
 
If the User B changes their language in Teams again and accesses the Power Apps app in the team next time, the new language pack will be installed if the language isn't already installed in Dataverse for Teams environment.

## Supported languages and fallbacks

The languages supported across Teams, Dataverse for Teams, and other Power Platform features vary slightly. When a language is not supported by Dataverse for Teams and other Power Platform features, these will use an identified fallback language. Here is a list of the languages supported across Teams, Dataverse for Teams, and other Power Platform features and their fallback languages. 

The fallback languages are denoted in *italics*.


| Teams             | Dataverse for Teams           | Power Apps Studio | Power Automate    | Microsoft Copilot Studio | Power BI           |
|-----------------------|-----------------------|------------------------------|-----------------------|-------------------------|-----------------------|
| Arabic                | Arabic                | *English US*                   | *English US*            | *English US*              | Arabic                |
| Brazilian Portuguese  | Brazilian Portuguese  | Brazilian Portuguese         | Brazilian Portuguese  | Brazilian Portuguese    | Brazilian Portuguese  |
| Bulgarian             | Bulgarian             | Bulgarian                    | Bulgarian             | *English US*              | Bulgarian             |
| Catalan               | Catalan               | Catalan                      | Catalan               | *Spanish*                 | Catalan               |
| Croatian              | Croatian              | Croatian                     | Croatian              | *English US*              | Croatian              |
| Czech                 | Czech                 | Czech                        | Czech                 | *English US*              | Czech                 |
| Danish                | Danish                | Danish                       | Danish                | Danish                  | Danish                |
| Dutch                 | Dutch                 | Dutch                        | Dutch                 | Dutch                   | Dutch                 |
| English (Canada)      | *English US*            | *English US*                   | *English US*            | *English US*              | *English US*            |
| English UK            | *English US*           | *English US*                   | *English US*            | *English US*              | *English US*            |
| English US            | English US            | English US                   | English US            | English US              | English US            |
| Estonian              | Estonian              | Estonian                     | Estonian              | *English US*              | Estonian              |
| Flipino             | *English US*           | *English US*                   | *English US*            | *English US*              | *English UK*            |
| Finnish               | Finnish               | Finnish                      | Finnish               | *Swedish*                 | Finnish               |
| French                | French                | French                       | French                | French                  | French                |
| French (Canada)       | *French*           | *French*                       | *French*                | *French*                  | *French*                |
| German Standard       | German Standard       | German Standard              | German Standard       | German Standard         | German Standard       |
| Greek                 | Greek                 | Greek                        | Greek                 | *English US*              | Greek                 |
| Hebrew                | Hebrew                | *English US*                   | *English US*            | *English US*              | Hebrew                |
| Hindi                 | Hindi                 | Hindi                        | Hindi                 | Hindi                   | Hindi                 |
| Hungarian             | Hungarian             | Hungarian                    | Hungarian             | *English US*              | Hungarian             |
| Icelandic             | *English US*               | *English US*                   | *English US*            | *English US*              | English UK            |
| Indonesian            | Indonesian            | Indonesian                   | Indonesian            | *English US*              | Indonesian            |
| Italian               | Italian               | Italian                      | Italian               | Italian                 | Italian               |
| Japanese              | Japanese              | Japanese                     | Japanese              | Japanese                | Japanese              |
| Korean                | Korean                | Korean                       | Korean                | Korean                  | Korean                |
| Latvian               | Latvian               | Latvian                      | Latvian               | *English US*              | Latvian               |
| Lithuanian            | Lithuanian            | Lithuanian                   | Lithuanian            | *English US*              | Lithuanian            |
| Norwegian - NB        | Norwegian - NB        | Norwegian - NB               | Norwegian - NB        | Norwegian - NB          | Norwegian - NB        |
| Norwegian - NN        | *Norwegian - NB*        | *Norwegian - NB*               | *Norwegian - NB*        | *Norwegian - NB*          | *Norwegian - NB*        |
| Polish                | Polish                | Polish                       | Polish                | Polish                  | Polish                |
| Portuguese (Portugal) | Portuguese (Portugal) | Portuguese (Portugal)        | Portuguese (Portugal) | *Brazilian Portuguese*    | Portuguese (Portugal) |
| Romanian              | Romanian              | Romanian                     | Romanian              | *English US*              | Romanian              |
| Russian (cyrillic)    | Russian (cyrillic)    | Russian (cyrillic)           | Russian (cyrillic)    | Russian (cyrillic)      | Russian (cyrillic)    |
| Serbian (Latin)       | Serbian (Latin)       | Serbian (Latin)              | Serbian (Latin)       | *English US*              | Serbian (Latin)       |
| Simplified Chinese    | Simplified Chinese    | Simplified Chinese           | Simplified Chinese    | Simplified Chinese      | Simplified Chinese    |
| Slovak                | Slovak                | Slovak                       | Slovak                | *English US*              | Slovak                |
| Slovenian             | Slovenian             | Slovenian                    | Slovenian             | *English US*              | Slovenian             |
| Spanish               | Spanish               | Spanish                      | Spanish               | Spanish                 | Spanish               |
| Spanish (Mexico)      | *Spanish*               | *Spanish*                      | *Spanish*               | *Spanish*                 | *Spanish*               |
| Swedish               | Swedish               | Swedish                      | Swedish               | Swedish                 | Swedish               |
| Thai                  | Thai                  | Thai                         | Thai                  | English US              | Thai                  |
| Traditional Chinese   | Traditional Chinese   | Traditional Chinese          | Traditional Chinese   | Traditional Chinese     | Traditional Chinese   |
| Turkish               | Turkish               | Turkish                      | Turkish               | Turkish                 | Turkish               |
| Ukrainian             | Ukrainian             | Ukrainian                    | Ukrainian             | *English US*              | Ukrainian             |
| Vietnamese            | Vietnamese            | Vietnamese                   | *English US*            | *English US*              | Vietnamese            |
| Welsh                 | *English US*             | *English US*                   | *English US*            | *English US*              | *English UK*            | 

### See also

[What is Dataverse for Teams?](overview-data-platform.md) <br />
[Create tables](create-table.md)<br/>
[About the Dataverse for Teams environment](/power-platform/admin/about-teams-environment)

---

## FAQs for Dataverse for Teams | Microsoft Docs

Source: [data-platform-faqs.md](https://learn.microsoft.com/en-us/power-apps/teams/data-platform-faqs)

*Frequent asked questions (FAQs) for Dataverse for Teams.*

# FAQs for Dataverse for Teams 

Here is a list of frequently asked (FAQs) for Dataverse for Teams; also see [Dataverse for Teams licensing FAQs](/power-platform/admin/powerapps-flow-licensing-faq#dataverse-for-teams) in the Power Platform admin guide.

### What does Dataverse for Teams enable and how does this impact Microsoft Power Platform and Teams users? 

Power Apps developers and Microsoft Copilot Studio chatbot creators will now be able to make and manage their apps and bots directly in Teams with embedded [Power Apps](overview.md) and [Microsoft Copilot Studio](/microsoft-copilot-studio/fundamentals-get-started-teams) apps. This enables a streamlined end-to-end user experience and allows makers to deploy to Teams with one click through the Teams app store. These new features are powered by Power Platform enhancement in Teams that provide enterprise datastores with rich data types to Microsoft 365 users and is now included in Microsoft 365 and Office 365 licenses.

Also, apps built with Power Apps and used in Teams will be responsive to the form factor that they're loaded on, meaning a creator can build an app once for users to view full screen on both mobile devices and desktops.  

### What value does Dataverse for Teams offer for professional developers?

Dataverse includes a robust set of capabilities for professional developers, including API access, the ability to create plug-ins, and so on. 

Dataverse for Teams is initially focused on the low-code and no-code developer and does not provide access to these capabilities at launch. However, Dataverse for Teams capability along with premium functionality through Power apps provides professional developers the ability to create robust solutions with far less code, including extending the out-of-the-box capabilities of Power Automate with their own custom logic in Azure functions, connect their own web services, etc.

### When should customers use Lists versus Dataverse for Teams?

Lists is great for quickly tracking data in Teams. All your lists are instantly usable inside of Teams. Additionally, you can build canvas apps and flows on top of your Lists just like you can today in SharePoint. 

Dataverse for Teams is great for building Microsoft Power Platform solutions in Teams. With support for files, images, and multiple related tables, Dataverse for Teams can meet your needs today and be promoted to the full Dataverse if you need additional capacity or capabilities in the future.

### How does security and governance differ between Dataverse and Microsoft Dataverse for Teams?

Dataverse for Teams is enterprise grade and designed to work within Teams. Focused on Teams, it aligns with the core roles identified in the environment: Owners, Members, and Guests. 

For Dataverse for Teams, access to the environment is restricted just to the Teams owners, members, and guests. 
Granting access to the environment is managed by Teams Owner by adding or removing the Teams members.
Key benefits include -
- Supports Teams Azure AD security group with runtime (JIT) user access and privilege checks.  
- Auto assignment of System Administrator security role to Teams Owners. 
- Ability to assign different security roles to Teams Owners and Members.  
- No security settings management for Business Unit and Teams is required.

Dataverse is designed to be used in any application (not just Teams) and includes additional security features such as auditing, sharing, field level and hierarchical security.  

### How do users import data into tables in Dataverse for Teams?
Makers have the opportunity to bring in data through both the apps they develop as well as via connectors in Power Apps and Power Automate.

### Which tables are available to developers in Dataverse for Teams?  
 
Dataverse for Teams makes it easy for users to create custom tables for all of their scenarios. 

It also includes a User table that represents the Common Data Model's [User entity](/common-data-model/schema/core/applicationcommon/user). Data stored in the User table corresponds to a user in Azure Active Directory (Azure AD). 


### Does Dataverse for Teams include support for Common Data Model?
 
The User table is included in Dataverse for Teams. A broader set of Common Data Model entity support is available out-of-the-box in Dataverse. 

### Can I use tables from other environments?
 
Applications can include data from environments that the maker has access to within the current tenant.

### Where can I use the new visual editor?

In addition to the table designer experience previously found in Dataverse, Dataverse for Teams includes a new, easy-to-use editable grid that helps user be even more productive. You can also use tables from other environments subject to the normal permission model. The new visual editor is currently available only in Dataverse for Teams.


### See also

[Dataverse for Teams overview](overview-data-platform.md)<br />
[How are Dataverse for Teams and Dataverse different?](data-platform-compare.md) <br />
[Create tables](create-table.md)<br/>
[Work with table relationships](relationships-table.md)

---

## Use Teams integration object | Microsoft Docs

Source: [use-teams-integration-object.md](https://learn.microsoft.com/en-us/power-apps/teams/use-teams-integration-object)

*Learn how to use the Teams integration object when creating apps using Power Apps inside Teams.*

# Microsoft Teams integration object

You can use the Teams integration object to easily find and access the Teams integration features and use the improved usability of expressions while integrating your canvas app with Teams. The availability of a *Teams integration object* can be validated by checking the presence of **Teams** control from the tree view.

![Teams integration object.](media/teams-1.png "Teams integration object")

There are two features available with the integration of Power Apps with Teams. You can get a Teams theme inside a canvas app, and you can filter data depending on the team or channel context.

> [!NOTE]
> To further integrate with Teams, you can use the [Microsoft Teams connector](/connectors/teams/) with actions such as post a message, create a Teams meeting, list channels, and more.

## Get the Teams theme

Teams uses three themes: *Default*, *Dark*, and *High contrast.* When using the expressions to retrieve theme names, you can use the names as *Default*, *Dark*, and *Contrast* in the Power Apps formula bar.

To retrieve a theme name, use the following formula.

```power-fx
Switch(
    Teams.Theme.Name,
    TeamsTheme.Default,
    Color.DimGrey,
    TeamsTheme.Dark,
    Color.White,
    TeamsTheme.Contrast,
    Color.Black
    )
```

In the above formula, the expression *Teams.Theme.Name* is used to evaluate theme names of *Default*, *Dark*, or *Contrast* and the color of the selected
canvas app object is changed depending on the color entered in the formula.

The [Switch() function](../maker/canvas-apps/functions/function-if.md) evaluates a formula and determines whether the result matches any value in a sequence that you specify.

![Function Switch().](media/teams-2.png "Function Switch()")

This function results in changing the background of canvas app, depending on the change in the theme selection in Teams.

![Teams themes.](media/teams-themes.png "Teams themes")

For example, use this formula in the [*Fill* property](../maker/canvas-apps/controls/properties-color-border.md#normal) of a control (such as, a rectangle) to change the fill color based on the selected Teams theme.

| **Teams theme**                               | **App background**                       |
|-----------------------------------------------|------------------------------------------|
| *Default (App background color: DimGrey)*     | ![Default theme.](media/teams-default-theme.png "Default theme") |
| *Dark (App background color: White)*          | ![Dark theme.](media/teams-dark-theme.png "Dark theme") |
| *High contrast (App background color: Black)* | ![High contrast theme.](media/teams-high-contrast.png "High contrast theme") |

## Get the Teams channel name to filter app data

You can get the Teams channel name in canvas app functions, such as [function Filter()](../maker/canvas-apps/functions/function-filter-lookup.md). To get a Teams channel name, use the following syntax:

```powerapps-dot
Teams.ThisChannel.DisplayName
```

For example, you can add a label and set the *Text* property to display the name of the Teams channel.

![Show the Teams channel name.](media/teams-3.png "Show the Teams channel name")

For example, [connecting to a list hosted on a SharePoint site](../maker/canvas-apps/connections/connection-sharepoint-online.md), you can list the items in a default gallery.

![Show SharePoint list items.](media/teams-4.png "Show SharePoint list items")

The list shows all items and a column representing the Teams channel name.

![All items.](media/teams-5.png "All items")

Considering the Teams channel name as *General*, you can use the following formula to filter the gallery content depending on the name of the channel.

*Filter('Colors', Channel = Teams.ThisChannel.DisplayName)*

![Filtered items.](media/teams-filtered-items.png "Filtered items")

For more information about the Teams client SDK, go to [Context interface](/javascript/api/@microsoft/teams-js/microsoftteams.context). For more information about using context from Teams, go to [Use context from teams](./embed-teams-app.md#use-context-from-teams).

### See also

[Manage your apps](manage-your-apps.md)  
[Understand Power Apps Studio](understand-power-apps-studio.md)

---

## How to build apps for Microsoft Teams

Source: [how-templates-built.md](https://learn.microsoft.com/en-us/power-apps/teams/how-templates-built)

*Learn the process in which Microsoft built the template apps for Microsoft Teams, and how you can use similar techniques when designing and building your own apps.*

# How to build apps for Microsoft Teams

The [sample app templates](use-sample-apps.md) for Microsoft Teams are designed, and built with the following goals:

- Provide fully functional apps for Teams that have relevance across multiple industries.
- Provide examples of deeper integration of line-of-business data from Power Apps into collaborative elements of Teams to drive better more productive workloads.
- Provide examples of using good UX design with Teams and Power Apps.
- Provide extensible apps which users can modify and extend to suit their business requirements.

In this article, we'll review the process that we used to build these apps, and the steps that you can follow when building your own Power Apps.

> [!TIP]
> This article highlights some of the approaches taken when designing the Teams template apps. For additional resources on bet practices for building Power Apps, please refer to [Power Apps guidance documentation](/powerapps/guidance/planning/introduction) section of the Power Apps docs.

Watch this video to learn how the Power Apps templates for Microsoft Teams were made:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=a16dd643-8d23-4c54-a619-a4fe0d38c07d]

## Define

Before designing and building, you need to have an idea&mdash;can be an idea for a solution to a business problem, an idea for modernizing a legacy or manual process, or an idea for an app that will make the life of your users easier.

Look to see if there are any existing solutions for the problem. Talk to the stakeholders, customers, or potential users of the app and get their input. Capture their requirements or user stories and prioritize based on what is the highest priority need or opportunity.

Identify “personas” or roles of users who will use your application. At this point, you want to focus on defining the user’s key problems&mdash;what are their unmet needs? How important is it for them to solve this problem?

Many teams tend to dive into solutioning before they've fully understood the user’s problem. One way to avoid this trap is to use the “Jobs to be done” framework. This framework helps us identify and understand the needs and goals of the users that are the original drivers of their actions or decisions. This artifact documents each of the persona’s core objective and jobs they want to accomplish in their language.

![Jobs to be done framework](media/how-templates-are-built/personas.png "Jobs To Be Done framework")

The above example shows personas and jobs to be done for Inspection sample app template for store walk scenario.

## Design

Once you've identified and validated your idea, personas, and their jobs to be done, now is time to design your app. It can be tempting to jump into development at this point, but a bit more design planning will serve you well.

Having a plan will ensure a consistent user experience while enabling you to make the best design decisions for the app.

### Design user experience

Make your design plan by creating user flow and wireframes (blueprints) for each job statement. This process helps to ensure the process your solution takes are logical, efficient, and tackles the core of the problem at hand.

Playing with the flow can help you better understand the various pros and cons of different processes. This understanding allows you to select the flow and screen that will enable users to achieve their end goal smoothly. There are many tools available to help you achieve the design outcome. For example, Microsoft applications such as PowerPoint, Visio, or 3rd-party applications such as Figma, Adobe XD, Sketch, or even simple pen and paper.

This is also a good check point to get the feedback from end users. Share these high-level flows with your app users and get their feedback on the end to end experience. The iteration at this stage is lower risk as you can quickly make changes and compare options.  

Once the base layout is in, now you can have some fun. Do you want a clean and crisp app? Or something more playful. Think about the state of mind of the user and what would work best for them. Wireframing the app screens also helps you to plan out what data connectors will be needed, and giving you an artifact you can review with the stakeholders to get feedback before building the app to verify that the proposed design addresses the requirements.  

![Wireframes](media/how-templates-are-built/storyboards.png "Wireframes")

**Once you have identified the requirements and personas and prioritized the backlog, identify the set of features that will be needed to satisfy the “must have” items in the backlog. This is called the Minimum Viable Product (MVP).**

### Design data model

Along with the user experience, designing the data model of the app is also important. While Power Apps can connect to data from anywhere, you want to think through the data that is needed in the app and how it will be used. In Visio, or some other data diagraming tool, plan out the tables, fields, and relationships that will be needed to support your desired app functionality. Here's an example of the data model for Milestones app tables, and their relationships.

![Milestones data model](media/milestones-architecture/data-model.png "Milestones data model")

Think through how users will need to interact with the data as you plan what field data types to use. For example, drop-downs for Status, Priority, and Category are updatable in Milestones&mdash;that's why we created a table for these options and used a lookup to link them to the work item. For other infrequently changing list options that aren't editable by users in the app, we used choice data type fields. Make sure your data design fits the purpose and
usage patterns of your app and users.

## Develop

Now that you've got an idea and a design, start building the app in Power Apps. If you're building an app using Power Apps in Teams, we recommend creating a private team and limiting the members of the team to only those involved in the app development process.

Be sure to periodically review progress with stakeholders to get feedback. Once they see the app coming together, it will build excitement for the finished product, and they'll also provide feedback that you can use to iterate and improve the app experience.

## Validate

Once the app functionality is complete, thoroughly test the app:

- Test as each Persona

- Test in Teams Desktop

- Test in Teams Mobile

- Test as user who isn't a member of the team if your app will be shared for broad distribution (sharing with colleagues outside of the team).

- Verify **App Checker** to determine if there are any issues or accessibility problems with your app and address them.

- Run the app through the [Power Apps Code Review  Tool](https://powerapps.microsoft.com/blog/power-apps-code-review-tool/). This tool has been purpose built to highlight specific areas of potential improvement in the app across a range of areas such as performance, maintainability, and security.

## Deploy

Your app is now complete and fully tested. Now it's time to onboard users. With Teams, you've several options that you can use to give users access to your app:

- Add members to the team in which you developed the app.

- Create a solution and move the app and underlying tables to a different Team environment.

- Share the app for broad distribution.

To share an app for broad distribution, follow these steps:

1. In Teams, open the Power Apps app.

1. Under **Recent apps** select **See more**.

    ![See more](media/how-templates-are-built/build-app-see-more.png "See more")

1. Select the team where your app is installed.

1. Select **Share with colleagues**.

    ![Share with colleagues button](media/how-templates-are-built/share-with-colleagues.png "Share with colleagues button")

1. In the **Enter or select a security group** field, enter a security group or team with which you want to share access to your app.

1. Toggle **Colleague can use** to **on** for the app that you wish to share.

    ![Toggle colleagues can use to on](media/how-templates-are-built/share-screen.png "Toggle colleagues can use to on")

1. Select **Save**.

> [!NOTE]
> You'll need to set table permissions for the Microsoft Dataverse tables included in your app before users will be able to use it. For more information on table permissions, see [Set permission and share apps with colleagues](set-perms-and-share.md).

---

## Add notifications to make your apps collaborative

Source: [add-app-notifications.md](https://learn.microsoft.com/en-us/power-apps/teams/add-app-notifications)

*Learn how to add notifications to your Power Apps in Teams to make them more collaborative*

# Add notifications to make your apps collaborative

Apps in Microsoft Teams are designed to enable collaboration between people in your organization. When you have an app that has a hand-off of information, such as group A doing something that group B then needs to process, if everything happens in the app, users may miss important updates, and processes might stall.

Using notifications for critical events in your apps in Teams enhances collaboration by proactively letting users know that something needs their attention or needs to be done.

Teams and Power Platform give you many options in the ways that you can notify people.

- Email notifications
- SMS/text notifications
- Teams messages
- Adaptive cards
- Channel posts

Watch this video to learn how to add notifications to make your apps collaborative:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=c17e7bd1-aa38-434e-8120-e26b90cb3618]

## Choose the right notification type

How should you decide what type of notification to use? Many people default to email notifications, but many people also complain that they receive too many emails. Email is an acceptable type of notification, but it should be used sparingly. Especially for urgent notifications, as frequent emails are only seen after a period of time.

Here are some questions to ask when defining the appropriate type of notification:

1. **Is the notification urgent?**

    If you're creating an app to track safety issues, and there's an urgent issue that requires immediate attention, a notification like SMS text, push notification, or high priority Teams message should be used so the notification is immediately noticed. But don’t over-use these types of notifications for non-urgent notifications, or you risk irritating your users.

1. **Is the notification informational or actionable? If you're creating a notification, what do you want to have the notification recipient do with the notification?**

    Informational notifications are to notify users, but they're for information purposes only. For example, in the Employee Ideas sample app template for Teams, when a new idea is created, a message is posted in a Teams channel notifying people that a new idea has been created.

    Actionable notification enable one or more follow-up activities by the recipient. In the extending Employee Ideas article, we show how to change the notification to an adaptive card so users can open the submitted idea and vote for it.

    If the notification requires that the user be able to do something with the notification, such as open a record or respond, an actionable notification should be used&mdash;such as an interactive card, or add a hyperlink to deep link to the app.

    Also, Teams makes other types of notifications more actionable by enabling conversations around the notification&mdash;when you post a message to a Teams channel, users can respond to it in the channel, facilitating the ability for multiple people to discuss the notification.

1. **Is the notification personal, or to a group?**

    Is there a specific person that should be notified? Or, is there a group of people that needs to know about the notification? For personal notifications, consider sending a message, email, or text message so that other users aren't overloaded with non-applicable notifications. If the message should be seen by multiple people in a group, a post In a Teams channel is a better choice, as the users in the group can all see the message and collaborate on it.

1. **What is the frequency of notification?**

    In the Inspection sample app template for Teams, by default, a message is posted to a Teams channel when an inspection is completed. However, if you've a high frequency of inspections, many messages will be posted to the channel. And when many notifications are posted to a channel, individual notifications can get lost. Think of your phone notification center&mdash;when you've a few apps giving you notifications, they're helpful, but if you've many apps posting updates, notifications become noise. In this case, you'd want to reevaluate your notifications, and either change the notification to only notify on urgent inspections, or issues.

1. **What is the impact on the users?**

    Your colleagues are probably busy, and each interruption can add stress to their lives&mdash;especially in high quantities. Notifications are good if they make important information more available. But they can also have negative impact if too frequent or unnecessary. Also, arbitrary notifications can diminish a user's sense of control&mdash;if many messages start arriving that a user has no control over. And it can be a frustrating experience. Consider giving users an option in the app to control their notifications&mdash;this can be a settings toggle to opt in to notifications, or a preference to select what type of notification to receive. See [extending bulletins](bulletins-notification-preference.md) for an example.

## Notifications: Power Apps or Power Automate

When creating a notification, you have two options:

- Have your app create the notification directly.
- Or, trigger a Power Apps flow to post the notification.

The decision as to which approach you should use depends on what type of notification you're using, and how the notification should be triggered. Some notification types&mdash;such as adaptive cards, require Power Automate. Others, like sending emails, text messages, or Teams channel messages can be sent from a Power Automate formula, or a Power Automate flow. While there isn’t a “right or wrong” answer to this question, here are some rules to consider:

- Notifications sent directly from an app without flow will be in the context of the user making the change in the app. That means that the user will need access to the service sending the message, and some types of messages like emails may come from their personal account. If you want to send messages from a service account or general notification mailbox, a Power Automate flow can be owned by a different user account, and send a message when triggered by a data condition (like a record being created).

- If a flow sends a notification, and is triggered directly by the app, the flow needs to be shared or assigned with the user triggering the flow. If a flow sends a notification, and is triggered by a data condition (like a record creation or update), the flow doesn't need to be shared or owned by the triggering user.

- By using Power Automate to send notifications, you can update your notifications without having to republish your app. If your notification details frequently change, or users other than the maker of the app need to modify them, having the notification sent by Power Automate can segment your workloads and enable other users to work on the notifications while you work on the app.

- Power Apps sending notifications directly use formulas to define the notification logic, Power Automate flow uses a more graphical interface to set the properties of a notification. For example, from a Power Apps app, you can use the following formula to send email with the Outlook connector:

```power-fx
Microsoft365Outlook.SendEmail("mailbox@contoso.com", Summary, Description)
```

In Power Automate instead, the send an email action is presented in a graphical manner, allowing users to populate the fields in a manner similar to how they send an email in Outlook.

![Power Automate notification](media/add-app-notifications/notification-choices.png "Power Automate notification")

Sending an email from Power Apps directly is faster for experienced makers, but the more details are required&mdash;such as attachment files and formatted text. For the less experienced makers, sending the email with Power Automate flow might be easier.

---

## Integrate your Teams Power Apps with Planner

Source: [integrate-planner.md](https://learn.microsoft.com/en-us/power-apps/teams/integrate-planner)

*Learn how to make your Power Apps in Teams work with Planner.*

# Integrate with Microsoft Planner

In this article, we'll learn how to integrate Power Apps with Planner to create and assign tasks to users within the organization.

Power Apps in Microsoft Teams enables collaboration between people and groups. Employees already use Teams to work, communicate, and collaborate. Apps in Teams have deep integration with other Teams capabilities. For example, in Teams, you can assign tasks to team members using Planner in your Teams channel. Apps that require follow-up by others in your team, such as to address issues reported in the Issue Reporting app, can leverage Planner in the Teams channel and create Tasks where users already manage their tasks.

Watch this video to learn how to integrate Power Apps with Planner:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=37312c36-393d-44fd-ba8a-9b3dbdf8d60e]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Teams that will be available as part of select Microsoft 365 subscriptions. We'll also need the ability to connect to Planner.

## Login into Teams

Login into Teams using either the Desktop app or the web app.

## Create a new Team

In this section, we'll create a new Teams team and then create an app within that team. Skip this section if you already have a team that you want to use instead.

1. To create a new team, select the **Teams** tab > select **Join or create a team** > select **Create Team** > select **From Scratch** > select **Public**, and give the team a name such as "Planner Integration". And then, select **Create**.

1. Select and add any members in your organization that you'd like to add to the team for testing purposes, and select **Add**.

1. Select **Close**.

    The new team gets created and is listed under the Teams tab.

## Create a new app

We'll create an app with five fields capturing details that will be used to create a Task in Planner.

1. Open Teams.

1. Select Power Apps from the left-pane.

1. Select **+ New app** under **Recent apps**.

1. Select the team created earlier, and select **Create** to open Power Apps Studio.

1. Enter a name for the app, such as "Integrate with Planner", and select **Save**.

    The app shows a default gallery

1. Select the database option from the left-pane to connect to the Planner.

1. Select **+ Add data**, and then select **Connectors**.

1. Enter "Planner" in the search box to look for the Planner connector.

1. Select **Planner**.

1. If prompted, sign in.

    Planner gets added as a data connection to the app

1. Select to open the Tree view.

1. Select **+ New screen** > **Blank layout**.

1. Add the following controls.

    1. Title (text input)

        | Property | Value           |
        | -------- | --------------- |
        | Name     | Title           |
        | Type     | Text box        |
        | X        | Screen2.Width/2 |
        | Y        | 135             |
        | Width    | 320             |
        | Height   | 35              |

    1. From Date (date picker)
    
        | Property | Value           |
        | -------- | --------------- |
        | Name     | FromDate        |
        | Type     | Date picker     |
        | X        | Screen2.Width/2 |
        | Y        | 235             |
        | Width    | 320             |
        | Height   | 35              |
    
    1. Due Date (date picker)

        | Property | Value           |
        | -------- | --------------- |
        | Name     | DueDate        |
        | Type     | Date picker     |
        | X        | Screen2.Width/2 |
        | Y        | 335             |
        | Width    | 320             |
        | Height   | 35              |
    
    1. Assigned To (combo box)

        | Property | Value           |
        | -------- | --------------- |
        | Name     | AssignedTo      |
        | Type     | Combo box       |
        | X        | Screen2.Width/2 |
        | Y        | 435             |
        | Width    | 320             |
        | Height   | 35              |
    
    1. Planner ID (combo box)

        | Property | Value                                            |
        | -------- | ------------------------------------------------ |
        | Name     | PlannerID                                        |
        | Type     | Combo box                                        |
        | Items    | Planner.ListGroupPlans(Param("groupID")).value   |
        | X        | Screen2.Width/2                                  |
        | Y        | 535                                              |
        | Width    | 320                                              |
        | Height   | 35                                               |

1. Add the following labels.

    1. Title

        | Property | Value       |
        |----------|-------------|
        | Name     | Label_Title |
        | X        | 365         |
        | Y        | 135         |
        | Width    | 320         |
        | Height   | 35          |

    2. From Date

        | Property | Value          |
        |----------|----------------|
        | Name     | Label_FromDate |
        | X        | 365            |
        | Y        | 235            |
        | Width    | 320            |
        | Height   | 35             |

    3. Due Date
    
        | Property | Value          |
        |----------|----------------|
        | Name     | Label_DueDate  |
        | X        | 365            |
        | Y        | 335            |
        | Width    | 320            |
        | Height   | 35             |

    4. Assigned To

        | Property | Value             |
        |----------|-------------------|
        | Name     | Label_AssignedTo  |
        | X        | 365               |
        | Y        | 435               |
        | Width    | 320               |
        | Height   | 35                |

    5. Planner ID

        | Property | Value             |
        |----------|-------------------|
        | Name     | Label_PlannerID   |
        | X        | 365               |
        | Y        | 535               |
        | Width    | 320               |
        | Height   | 35                |

1. Add a button to the bottom of the screen with the following properties.

    | Property | Value             |
    |----------|-------------------|
    | Name     | Button_CreateTask   |
    | X        | 526               |
    | Y        | 635               |
    | Width    | 320               |
    | Height   | 35                |

1. Copy the following formula in the **OnSelect** property of **Button_CreateTask**.

    ```power-fx
    Planner.CreateTaskV3(
        Param("groupId"),
        PlannerID.Selected.id,
        Title.Value,
        {
            startDateTime: FromDate.Value,
            dueDateTime: DueDate.Value,
            assignments: AssignedTo.Selected.'User Name'
        }
    )
    ```

    > [!NOTE]
    > Upon selecting the **Create Task** button, it'll use the parameters provided in the formula to figure out the team for which the task is being created, the planner within the team the task is to be created, the Title from the text box captured on the screen, and the From and Due dates captured on the screen.

1. Move **Screen2** up above **Screen1**. If you want, you can also delete **Screen1** instead.

## Save and publish the app

1. Select **Save** on the top-right side of the screen to save the app.

1. Select **Publish**.

1. Select **Next**.

1. Under **Add to Channel**, make sure the channel under which the app should be shown is listed and shows as at least "1 active tab(s)" and not "0 active tab(s)".

    ![Save and publish the App](media/integrate-with-planner/save-and-publish-the-app-1.png "Save and publish the app")

1. Select **Save and Close**.

## Test the app

1. Open the team under which the app is created.

1. Select **+ Add a tab**.

1. Search for tasks by Planner to add a planner tab to the team.

1. Enter tab name under **Create a new plan**, for example "Tasks Integration". And then, select **Save**.

    The tab gets added to the Team

    ![Testing the app](media/integrate-with-planner/testing-the-app-1.png)

1. Run the app in preview mode or from within the team.

1. Populate the columns with appropriate values.

    ![Populate the fields](media/integrate-with-planner/testing-the-app-2.png "Populate the columns")

1. Select **Create Task**.

1. Go to the Planner tab for which the task is being created&mdash;in our example, "Tasks Integration Planner".

    A new task with the details should be added to the list.

    ![Task is created](media/integrate-with-planner/testing-the-app-3.png "Task is created")

## See Planner integration in action

To see an example of Planner integration, check out the [Issue Reporting](issue-reporting.md) sample app template for Teams. Issue Reporting makes it easy for users to report issues. These issues are created in Planner and assigned for follow-up.

This integration can be easily extended to add logic to automatically assign the Planner Tasks or [provide notifications for issue tasks](extend-issue-sign-up-notification.md).

---

## Integrate Power Apps in Teams with Azure Active Directory

Source: [integrate-azure-ad.md](https://learn.microsoft.com/en-us/power-apps/teams/integrate-azure-ad)

*Learn how to integrate your apps with Azure Active Directory to use data about the people in your organization in your app.*

# Integrate with Azure Active Directory

In this article, we'll learn about how to integrate apps created using Power Apps in Microsoft Teams with Azure Active Directory (AD).

Integration with Azure AD enables many deep capabilities within your organization hierarchy, the people in your organizations, and groups. For example, you can get information about a person, their job title, department, or photo. You can also get information about the user's organization hierarchy, such as their manager.

This integration can also be used to grant access to app functionality based on their role or group membership, and therefore, be used to control security to sensitive data or functionality.

In this article, we'll create a Power Apps app with a button with administrative access on it. The visibility of the button will depend on whether the user is a member of the admin group or not.

Watch this video to learn how to integrate Power Apps app with Azure Active Directory:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=9fabda9a-e9b5-43af-addd-a27d3f381f18]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Teams that will be available as part of select Microsoft 365 subscriptions. We'll also need access to Azure AD to create the admin group and assign members to it.

## Sign in to Teams

Login into Teams using either the Desktop app or the web app.

## Create a new Team

In this section, we'll create a new team, and then create an app within that team. Skip this section if you already have a team that you want to use instead of creating a new one.

1. To create a new team, select the Teams tab, and then select **Join or create a team** on the left bottom of the screen.

1. Select **Create Team** > **From Scratch** > **Public**, give the team a name such as "Azure AD Integration", and select **Create**.

1. (Optional) If you have any members in your organization that you'd like to add to the team for testing purposes, select them, and add them in the popup for adding members.

1. Select **Close**.

The new team gets created, and is listed under the Teams tab.

## Create a new Azure AD Group

1. Sign in to [Azure portal](https://portal.azure.com) with the same account that you logged into Teams with earlier.

1. On the top search bar, search for and select **Groups**.

1. Select **+ New Group**.

1. Set up the group with the following values:

    | Option | Value |
    | - | - |
    | Group type | Microsoft 365 |
    | Group name | Admin Access |
    | Group email address | Automatically updated |
    | Group description | Group for users with Admin access |

1. Select **Create**.

1. Copy the group's object ID from the group overview screen for use later.

## Create a new app

We'll create an app with a button that will only show up if the user is a member of the team we created above.

1. Open the Teams app.

1. Select **Power Apps**.

1. Select **+ New app** under **Recent apps**.

1. Select the team created earlier, and then select **Create**.

1. The app gets created, and the Power Apps Studio opens to allow editing the app.

1. Enter a name for the app, such as "Integrate with Azure AD", and then select **Save**.

1. Select **Data** > **Add data**.

1. In the connectors list, search for Azure AD, and select it to add that as a connection.

1. Select **Connect**.

1. Sign in, and select **Accept** to connect.

1. In the **Tree view**, select **+ New screen** to add a new screen to the app.

1. Select **+** (Insert) icon on the left-pane.

1. Select **Button**.

1. Set the "Text" property of the button to “Admin access”.

1. Select **+** (Insert) again, and then select label control to add.

1. Update the label text to "Admin level: ".

    ![Create a new App](media/integrate-with-azure-active-directory/create-a-new-app-1.png "Create a new app")

1. Select the app from the tree view, and open the **OnStart** property from the top-left of the screen.

1. Enter the following formula for the app OnStart:

    ```power-fx
    If(
        !IsEmpty(
            AzureAD.CheckMemberGroups(
                User().Email,
                ["Enter your Azure group ID here"]
            ).Value
        ),
        Set(varAdmin,true),
        Set(varAdmin,false)
    )
    ```

    > [!NOTE]
    > Update the formula with the group ID (GUID) for the group you copied [earlier](#create-a-new-azure-ad-group).

1. Select **...** (ellipsis) next to the app, and then select **Run OnStart**.

1. Select **...** (ellipsis) next to **Settings** on the top ribbon, and select to view variables. **varAdmin** is set to False.

1. Select Screen 2 from the Tree view, and update the Text formula for the label to `"Admin Level: " & varAdmin`. The label will currently show as "Admin level: false" on the screen.

    We'll now control the visibility of the Admin Access button so that it only shows up when the user is an admin (for example, belongs to the Admin access group in Azure AD)

1. Select the button, and set the **Visible** property to "varAdmin".

    The button doesn't show up anymore since we don't have admin access.

## Testing the integration

1. Sign in to [Azure portal](https://portal.azure.com).

1. Select the group created earlier.

1. Select **Members** under **Manage** from the left-pane.

1. Select **+ Add members** to add members to the group/

1. Select users from the list of users under **Add members** to add to the group.

1. Select **Select**. Selected users get added to the group.

1. Go back to Teams.

1. Select **Tree view**.

1. Select the app > **Run OnStart**.

The admin access button is now visible on Screen 2, and the label shows admin level as **true** since we're now members of the Admin access group.

## See Azure AD integration in action

You can see an example of Azure AD integration in the **Profile+** sample app template for Teams.

![See Active Directory integration in action](media/integrate-with-azure-active-directory/see-active-directory-integration-in-action-1.png "See Active Directory integration in action")

- **Office 365 Users** connector is used to retrieve the user profile, including name, photo, manager, and other details.
- **Office 365 Groups** connector is used to retrieve the people who report to a selected user.

---

## Integrate your Teams app with calls and meetings

Source: [integrate-calls-and-meetings.md](https://learn.microsoft.com/en-us/power-apps/teams/integrate-calls-and-meetings)

*Learn how to use Teams calls and meetings with your Power Apps in Teams.*

# Integrate with calls and meetings

Apps in Microsoft Teams drive collaboration by enabling users to do work where they communicate and collaborate. Many apps require a “back and forth” communication or passing items between people. For example, in the Inspection sample app template for Teams, managers create inspection forms, users complete the inspection, and reviewers review the inspections.

Power Apps in Teams can leverage deep integration with other Teams capabilities to make apps collaborative. In this article, we'll learn how we can integrate Power Apps with Teams to make calls or schedule meetings with other users within the organization.

Watch this video to learn how to integrate Power Apps with calls and meetings:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=022e5ad1-7a6d-49bb-99de-93dd4041bebd]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Teams that will be available as part of select Microsoft 365 subscriptions.

## Log in into Teams

Log in into Teams using either the Desktop app or the web app

## Create a new team

In this section, we'll create a new Teams team, and then create an app within that team. Skip this section if you already have a team that you want to use.

1. To create a new team, select the Teams tab > select **Join or create a team** on the bottom-left side of the screen > select **Create Team** > select **From Scratch** > select **Public**, and give the team a name such as "Calls and Meetings Integration". And then, select **Create**.

1. If you have any members in your organization you'd like to add to the team for testing purposes, add them in the pop-up, and then select **Add**.

1. Select **Close**.

The new team gets created and is listed under the Teams tab

## Create a new app

Well create an app with a gallery of users and buttons on each of the display forms to either call, chat or schedule a meeting with a user from the list.

1. Open Teams app.

1. Select **Power Apps** from the left-pane.

1. Select **+ New app** under **Recent apps**.

1. Select the team created earlier, and select **Create** to open the app in Power Apps Studio.

1. Enter a name for the app, such as "Integrate with calls and meetings".

1. Select **Save**.

    The app shows a default gallery

1. Select the gallery, and search for users in the **Add a data source** search box.

1. Select **Users** from the list of data sources.

    The list of users shows in the gallery on the left-side of the screen. The right-side of the screen shows details of the selected user record.

1. Select the app from the left-pane, and update the **OnStart** property of the app with the following formula:

    ```power-fx
    Set(gblIsHostClientWeb,Param("hostClientType")="web")
    ```

    > [!NOTE]
    > This formula checks if the user is accessing Teams from a web browser, desktop, or a mobile app.

1. Select **Screen1** from the Tree view.

1. Select **+** (Insert) > **Button** to add a button.

1. Move the button to the details pane on the right-side of the screen.

1. Set the following properties of the button.

    | Property | Value  |
    |----------|--------|
    | Text     | "Call" |
    | Width    | 150    |
    | Height   | 45     |
    | X        | 500    |
    | Y        | 300    |

    Copy the following formula in the **OnSelect** property of the button:

    ```power-fx
    If(
        gblIsHostClientWeb,
        Launch(
            "https://teams.microsoft.com/l/call/0/0?users="&BrowseGallery1.Selected.'Primary Email',
            {},
            LaunchTarget.New
        ),
        Launch(
            "msteams://teams.microsoft.com/l/call/0/0?users="&BrowseGallery1.Selected.'Primary Email',
            {},
            LaunchTarget.New
        )
    )
    ```

    > [!NOTE]
    > - If the user is accessing Teams using a web browser, this will launch the call window in the browser itself because of `https://` protocol identifier. If the user is accessing Teams using the Teams desktop or mobile app, then it launches the call window in the Teams app itself because of `msteams://` instead.
    > - The format to launch a call through a deep-link is:
    > `https://teams.microsoft.com/l/call/0/0?users=\<user1\>,\<user2]`. More information: [Generate a deep link to a call](/microsoftteams/platform/concepts/build-and-test/deep-links#generate-a-deep-link-to-a-call)

1. Add another button with the following properties:

    | Property | Value               |
    |----------|---------------------|
    | Text     | "Schedule a Meeting" |
    | Width    | 150                 |
    | Height   | 45                  |
    | X        | Button1.X + 200     |
    | Y        | Button1.Y           |

1. Copy the following formula in the **OnSelect** property of the new button:

    ```power-fx
    If(
        gblIsHostClientWeb,
        Launch(
            "https://teams.microsoft.com/l/meeting/new?subject=New%20Meeting&attendees="&BrowseGallery1.Selected.'Primary Email',
            {},
            LaunchTarget.New
        ),
        Launch(
            "msteams://teams.microsoft.com/l/meeting/new?subject=New%20Meeting&attendees="&BrowseGallery1.Selected.'Primary Email',
            {},
            LaunchTarget.New
        )
    )
    ```

1. Add a third button with the following properties

    | Property | Value               |
    |----------|---------------------|
    | Text     | "Chat"              |
    | Width    | 150                 |
    | Height   | 45                  |
    | X        | Button2.X + 200     |
    | Y        | Button1.Y           |

1. Copy the following formula in the **OnSelect** property of the new button:

    ```power-fx
    If(
        gblIsHostClientWeb,
        Launch(
            "https://teams.microsoft.com/l/chat/0/0?users="&BrowseGallery1.Selected.'Primary Email'&"&topicName=&message=Hi!",
            {},
            LaunchTarget.New
        ),
        Launch(
            "msteams://teams.microsoft.com/l/chat/0/0?users="&BrowseGallery1.Selected.'Primary Email'&"&topicName=&message=Hi!",
            {},
            LaunchTarget.New
        )
    )
    ```

    The screen should appear as shown below

    ![Create a new App](media/integrate-with-calls-and-meetings/create-a-new-app-1.png)

## Save and publish the app

1. Select **Save** on the top-right side of the screen to save the app.

1. Select **Publish** to publish the app.

1. Select **Next** in the pop-up.

1. Under **Add to Channel**, make sure the channel under which the app should be shown is listed and shows as "1 active tab(s)" and not "0 active tab(s)".

    ![Save and Publish the App](media/integrate-with-calls-and-meetings/save-and-publish-the-app-1.png "Save and publish the app")

1. Select **Save and Close**.

## Test the app

1. Run the app in the preview mode.

1. Select a user from the list on the left.

1. If you don't have a user showing up in the list, share the app with another colleague/user. Once that user logs in into the app, they'll show up in this list of users.

1. Select the user from the list.

1. Test the options. 

The call button launches a new call. The meeting button creates a meeting invitation with the selected person

## See chat, call, and meeting integration in action

For an example of chat, call, and meeting integration in action, check out the [Profile +](profile-app.md) sample app for template Teams.

When opened from within a Team, the app displays the other members of the team. You can select the **Select people to connect with** and select one or more people, then start a call or chat with the selected people, or schedule a meeting.

![See chat](media/integrate-with-calls-and-meetings/see-chat-call-and-meeting-integration-in-action-1.png "See chat")

---

## Enable consistent experience across sessions using LoadData and SaveData functions.

Source: [consistent-experience-across-sessions.md](https://learn.microsoft.com/en-us/power-apps/teams/consistent-experience-across-sessions)

*Learn how to make your Teams-based Power Apps store session data so that the users don't lose their work when leaving the app tab.*

# Enable consistent experience across sessions using LoadData and SaveData functions

Microsoft Dataverse for Microsoft Teams delivers a built-in, low-code data platform for Teams. It provides relational data storage, rich data types, enterprise-grade governance, and one-click solution deployment. Dataverse for Teams enables everyone to easily build and deploy apps.

While there are numerous advantages of using Power Apps in Teams, one of the biggest design considerations is the ability to keep consistent experience across sessions.

While using an app, if we switch a tab in Teams to look at Wiki or Planner, or even chat with someone, the session data of the app is lost and we'd have to start the session from scratch. For example, if we're in the middle of an inspection using the Inspections app and we switch tabs even for a moment, all the data that was captured on the inspection would be lost and we'll have to recapture all that information.

In this article, we'll learn how to use the [LoadData() and SaveData() functions](../maker/canvas-apps/functions/function-savedata-loaddata.md) to store the session data within the app to avoid any loss of work because of switching tabs in Teams.

Watch this video to learn how to enable consistent experience across sessions:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=e669c7fe-3f11-43ad-8233-0dbbb374bec5]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Teams that is available as part of select Microsoft 365 subscriptions.

## Log in into Teams

Log in into Teams using Teams Desktop.

## Create a new Team

To create a new team:

1. Select the Teams tab.
1. Select **Join** or create a team on the bottom-left of the screen.
1. Select **Create a team from scratch**.
1. Select **Public** and give the team a name. In this example, we'd use "MSFT Partners".
1. Select **Create**.

The new team gets created and is listed under the Teams tab.

![Create a new Team](media/consistent-experience-across-sessions/create-a-new-team-1.gif "Create a new Team")

## Create a Power Apps app in Teams

To create a Power Apps app in teams, we need to open Power Apps Studio in Teams as shown below.

![Create a Power App in Teams](media/consistent-experience-across-sessions/create-a-power-app-in-teams-1.png)

1. Select **Power Apps** from the list of apps and pin it to the left-pane, and then select it.

    ![Pin Power Apps in Teams](media/consistent-experience-across-sessions/create-a-new-team-2.gif "Pin Power Apps in Teams")

1. Select **Start now** to create the first app.

1. Select the team for which this app is to be created&mdash;a Power Apps environment is created for that team (there's one Power Apps environment per team).

1. While the environment is being created, close the dialog box that says **Getting things ready**.

1. Select the **Build** tab on top, and in a few seconds the created app should appear in the list.

1. Open the app, and notice it gets created in the tablet layout/form factor by default.

    ![Tablet layout](media/consistent-experience-across-sessions/create-a-new-team-3.png "Tablet layout")

1. Enter a name for the app **Persistent session example** app, and select **Save**.

    ![Save a Power Apps app in Teams](media/consistent-experience-across-sessions/create-a-new-team-5.png "Save a Power Apps app in Teams")

    The app gets created with a gallery.

    ![App is created with a gallery](media/consistent-experience-across-sessions/create-a-new-team-6.png "App is created with a gallery")

1. Select **Create new table** to create a new table.

1. Enter **Accounts**, and select **Create**.

    ![Add a table name](media/consistent-experience-across-sessions/create-a-new-team-7.png "Add a table name")

1. Add two columns&mdash;**Phone** with data type of Phone, and **City** with data type of Text.

    ![Add columns](media/consistent-experience-across-sessions/create-a-new-team-8.png "Add columns")

    ![Add phone and city columns](media/consistent-experience-across-sessions/create-a-new-team-9.png "Add phone and city columns")

1. Add sample data to the three columns.

1. Repeat to add at least five records.

1. Select **Close**.

    ![Select close](media/consistent-experience-across-sessions/create-a-new-team-10.png "Select close")

    The accounts table gets added as a data table

1. Select **Tree View** > Select **BrowseGallery1** > Select **Accounts** as the data source.

    ![Select Accounts as data source](media/consistent-experience-across-sessions/create-a-new-team-11.png "Select Accounts as data source")

## Publish the app in Teams

1. Select **Publish to Teams**.

    ![Select  the Power Apps app in Teams](media/consistent-experience-across-sessions/publish-the-power-app-in-microsoft-teams-1.png)

1. Select **Next**.

    ![Select the Next button](media/consistent-experience-across-sessions/publish-the-power-app-in-microsoft-teams-2.png "Select the Next button")

1. Select **+** to add the app to the "General" channel.

    ![Add app to channel](media/consistent-experience-across-sessions/publish-the-power-app-in-microsoft-teams-3.png "Add app to channel")

    ![Select the channel](media/consistent-experience-across-sessions/publish-the-power-app-in-microsoft-teams-4.png "Select the channel")

1. Go to the **Persistent Session Example** team, and notice the **Persistent session example** app shows up on the top as a tab.

    ![Navigate to Team](media/consistent-experience-across-sessions/publish-the-power-app-in-microsoft-teams-5.png "Navigate to Team")

## Testing the issue

1. Open the **Persistent session example** app from the **Persistent Session Example** team.

    ![Open the app](media/consistent-experience-across-sessions/testing-the-issue-1.png "Open the app")

1. Select **New Record** to create a new account in the app.

1. Enter the name and phone number

1. Before you enter **City** and save the record, switch to a different tab (like Files or Wiki on top or a different team), and then come back to the app.

1. Notice that the data entered in the two columns is no longer available on the screen and is lost

    ![Testing the issue](media/consistent-experience-across-sessions/testing-the-issue-2.gif)

## Solution: Use SaveData() and LoadData() functions

To resolve the above issue, we'll use the [LoadData() and SaveData() functions](../maker/canvas-apps/functions/function-savedata-loaddata.md). We'll create a collection for the data entered on a form as and when data is entered, and keep saving the data in the collection until the record has been committed or saved. This way, if the record hasn't been saved and we must tab out of the screen for some reason, the collection would have the saved data that would get loaded once we're back in the app. We'll also clear the collection once the record has been saved so that the collection is ready to capture new data when the next new record is being created.

1. Start with making sure that the changes we're applying are applicable only in the case of a new record. So, we're updating the variable **newMode** that will be used as a condition on the edit form to figure out what data needs to be displayed. Select **New record** and add the following formula on the **OnSelect** property of the button:

    ```power-fx
    NewForm(EditForm1);
    UpdateContext({newMode: true})
    ```

    ![OnSelect formula](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-1.png "OnSelect formula")

1. Next, we'll add the data from the individual input controls to a collection, and then we'll save the data to a local file from that collection. Select the text input box&mdash;in our example it's the "DataCardValue1" of the "Name_DataCard1" on "EditForm1" for the **Name** field&mdash;enter the following formula in the **OnChange** property of the input field:

    ```power-fx
    Collect(
        colAccount,    
        { Column:"Name",Value:Self.Value}
    );
    SaveData(colAccount,"colAccount").
    ```

    With this change, we're adding the data to a local cache so that if the user leaves the app, their data won't be lost.
    
    ![Make a collection](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-2.png "Make a collection")
    
    Similarly, enter the following code in the **OnChange** property for **Phone** (DataCardValue2):
    
    ```power-fx
    Collect(colAccount, {Column:"Phone",Value:Self.Value});
    SaveData(colAccount,"colAccount");
    ```
    
    And enter the following code in **OnChange** property for **City** (DataCardValue3):
    
    ```power-fx
    Collect(colAccount {Column:"City", Value:Self.Value});
    SaveData(colAccount, "colAccount");
    ```

1. Now we'll update the App OnStart so that if there's any data saved in the collection, that would get loaded on the start of the app.

    Go to the **App** > **OnStart** property, and add the following formula:

    ```power-fx
    LoadData(colAccount,"colAccount", true)
    ```

    ![App OnStart](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-3.png "App OnStart")

1. Next, we need to update the **Default** property of the data fields so that when the page loads once we come back to the app, if data exists in the collection, it should show the data from the collection by default.

    Select the field **DataCard** and update the **Default** property of the data card to the following formula for the listed fields.
    
    For **Name** field, enter **Name_DataCard1:**
    
    ```power-fx
    If(
        newMode && !IsBlank(
            Last(
                Filter(colAccount, Column = "Name")
            ).Value
        ),
        Last(
            Filter(colAccount, Column = "Name")
        ).Value,
        If(newMode, Blank(), ThisItem.Name)
    )
    ```
    
    ![Update default property](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-4.png "Update default property")
    
    Similarly, enter the following formula in the **Default** property formula for **Phone** (Phone_DataCard1):
    
    ```power-fx
    If(
        newMode && !IsBlank(
            Last(
                Filter(colAccount, Column ="Phone")
            ).Value
        ),
        Last(
            Filter(colAccount, Column = "Phone")
        ).Value,
        If(newMode, Blank(), ThisItem.Phone)
    )
    ```
    
    And use the following formula for **City** (City_DataCard1):
    
    ```power-fx
    If(
        newMode && !IsBlank(
            Last(
                Filter(colAccount, Column = "City")
            ).Value
        ),
        Last(
            Filter(colAccount, Column = "City")
        ).Value,
        If(newMode,Blank(), ThisItem.City)
    )
    ```

1. Now, we need to clear the collection in two scenarios:

    1. When the user submits the form, and the changes get saved.
    1. When the user selects the cancel button to cancel the changes.

    Use the following formula in the **OnSelect** property of the **Submit** button.

    ```power-fx
    SubmitForm(EditForm1);
    UpdateContext({editMode: false, newMode: false});
    Clear(colAccount);
    SaveData(colAccount, "colAccount");
    ```

    ![Submit OnSelect](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-5.png "Submit OnSelect")

    Select the **Cancel** button, and enter the following formula:

    ```power-fx
    ResetForm(EditForm1);
    UpdateContext({editMode: false, newMode: false});
    Clear(colAccount);
    SaveData(colAccount, "colAccount");
    ```

    ![Cancel formula](media/consistent-experience-across-sessions/use-save-data-and-load-data-functions-6.png "Cancel formula")

1. Publish the apps after making all the above changes by selecting **Publish to Teams**.

## Test the app again

1. Go to the team and run the app.

1. Select **+ New** record, and add the name and phone details for the new record.

1. Select another tab to move out of the app.

1. Come back to the app&mdash;it shows details of the first account.

1. Now, when we select **+ New** again, we'll see the Name and Phone details populated in those text input fields already. And we can resume adding the account we were adding before we had to tab out of the app.

    ![Test the app again](media/consistent-experience-across-sessions/test-the-app-again-1.gif)

## How we use SaveData and LoadData in the Inspection app

In the Inspection sample app template, we use load data and save data on the inspection form&mdash;if a user is in the middle of an inspection, and they switch away from the apps in Teams (like to send someone a message), we don’t want them to lose their place in the inspection. When they return to the app tab in Teams, the app gives them the option to resume the in-progress inspection.

## Considerations

In Dataverse for Teams, there are some limits to the SaveData() and LoadData() capabilities.

- 1-MB limit on Teams Desktop.
- Doesn't work in a browser.
- Apps in mobile are limited by the amount of local storage available to the app.

---

## Have a conversation about your business data in a Teams app.

Source: [business-data.md](https://learn.microsoft.com/en-us/power-apps/teams/business-data)

*Learn how to enable conversations about your business from within your Power Apps in Teams.*

# Have a conversation about your business data in a Teams app

Apps in Microsoft Teams drive collaboration by enabling users to do work where they communicate and collaborate. One way to make your apps collaborative is by adding the ability to have a conversation about your app or the data in your app. Teams is your go-to place to have such conversations.

For example, in the [Profile+ sample app template](profile-app.md) for Teams, when you select one or more profile cards in the app, you can start a chat with the selected people directly in Teams.

You might also want to use this capability for your apps. For example, if you're building a sales opportunity tracker for the sales manager to review upcoming deals, you might want to add a button for the user to chat with the sales person about the opportunity.

This way, Power Apps in Teams can use deep integration with other Teams capabilities to make apps collaborative. In this article, we'll learn how we can integrate Power Apps with Teams to facilitate conversations.

Watch this video to learn how to configure having conversations about business data in Teams app:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=aeacd56d-232b-4187-83f0-e15dc4103f43]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Teams that will be available as part of select Microsoft 365 subscriptions.

## Log in into Teams

Log in into Teams using either the Desktop app or the web app

## Create a new Team

In this section, we'll create a new Teams team and then create an app within that team. Skip this section if you already have a team you want to use instead.

1. To create a new team, select the Teams tab, and then select **Join or create a team** on the left bottom of the screen.

1. Select **Create Team** > **From Scratch** > **Public**, give the team a name such as "Calls and Meetings Integration", and select **Create**.

1. (Optional) If you have any members in your organization that you'd like to add to the team for testing purposes, select them, and add them in the popup for adding members.

1. Select **Close**.

The new team gets created, and is listed under the Teams tab.

## Create a new app

We'll create an app where the user can start a conversation for a particular team and Channel by selecting a button and typing in a message in a text box. The user can then select the **Submit** button to post the message in the particular
team and channel in Teams, then other user can join the conversation.

1. Open Teams.

1. Select **Power Apps** from the left-pane.

1. Select **+ New app** under **Recent apps**.

1. Select the team created earlier, and then select **Create**.

    The app gets created and Power Apps Studio opens to allow editing the app.

1. Enter a name for the app, such as "Conversation app", and select **Save**.

    The app is created with a default gallery on Screen 1.

## Add Teams as a connector

We need to add Teams as a connector to the app since we want to be able to access the teams and channels from the logged in user’s account.

1. Select **Data** from the left-pane.
1. Select **+ Add data**, and then select **Connectors**.
1. Scroll down and select **See all connectors**.
1. Search for and select Teams connector.

## Add a new table to capture company record

We need to add a table to maintain a list of companies we'll use as the company record, and to start a conversation about it.

1. Select **Data** from the left-pane.

1. Select **+ Add data** and then create a new table with the name "Company", and plural name as "Companies".

1. Add a few company names to the table, and then select **Close**.

## Add a new screen to select the customer

Next, we'll add a screen to the app so that users can select the customer that they want to have the conversation about.

1. In the tree view, select **+ New screen** > select **Scenarios** tab > select **List**.

    A new screen gets added with a gallery list.

1. Update the title of the gallery to "Companies List".

1. Select **Companies** as the data source for the gallery.

    The list of companies that was added shows up in the gallery **TemplateGalleryList1**.

1. Delete **Screen1** from the tree view, and rename the new screen to **Screen1**.

## Add a new table to capture the conversation details

We need to add another table to capture the details such as the Teams conversation ID, team, and channel related to a conversation started in the app.

1. Select **Data** > **+ Add data** > **Create new table**.

1. Enter table name as **Conversation** and plural name as **Conversations**.

1. Change the default **Name** column name to **ID**.

1. Add the following columns to the conversation table:

    | **Column**   | **Type**                       |
    | ------------ | ------------------------------ |
    | Team         | Text                           |
    | Team Channel | Text                           |
    | Team Name    | Text                           |
    | Channel Name | Text                           |
    | Company      | Lookup, related table= Company |

1. Save and close the table.

## Add a new screen to start or join a conversation

Now, we'll add a new screen where the app user can start or join a conversation.

1. In the tree view, select **+ New screen** > **Blank layout**.

1. Update the **Fill** property of the screen to something other than white color.

    In our example, we've set the Fill property of the screen to `RGBA(224, 224, 237, 1)`.

1. Select **+** (Insert) > **Input** > **Button**.

1. Update the following properties of the button.

    | Property  | Value                                              |
    |-----------|----------------------------------------------------|
    | Name      | startaconversation_Button                          |
    | Text      | "Start a conversation"                             |
    | Width     | 200                                                |
    | Height    | 32                                                 |
    | Font size | 12                                                 |
    | X         | `Parent.Width/2 - startaconversation_Button.Width/2` |
    | Y         | 100                                                |
    | OnSelect  | `Set(enterMessage,true)`                             |

1. Select **+** (Insert) > **Input** > **Combo box**.

1. Update the following properties of the Combo box.

    | Property | Value                                  |
    |----------|----------------------------------------|
    | Name     | team_Combobox                          |
    | Items    | `MicrosoftTeams.GetAllTeams().value`     |
    | Width    | 320                                    |
    | Height   | 32                                     |
    | X        | `Parent.Width/2 - team_ComboBox.Width/2` |
    | Y        | 200                                    |
    | Text     | "Team"                                 |
    | Tooltip  | "Team"                                 |
    | Visible  | enterMessage                           |

1. Add another combo box and update the following properties.

    | Property | Value                                                                                                               |
    |----------|---------------------------------------------------------------------------------------------------------------------|
    | Name     | channel_Combobox                                                                                                    |
    | Items    |         `If(!IsBlank(team_ComboBox.Selected.id),MicrosoftTeams.GetChannelsForGroup(team_ComboBox.Selected.id).value)` |
    | Width    | 320                                                                                                                 |
    | Height   | 32                                                                                                                  |
    | X        | `Parent.Width/2 - channel_ComboBox.Width/2`                                                                           |
    | Y        | 200                                                                                                                 |
    | Text     | "Channel"                                                                                                           |
    | Tooltip  | "Channel"                                                                                                           |
    | Visible  | enterMessage                                                                                                        |

1. Select **+** (Insert) > **Input** > **Text box**.

1. Update the following properties of the Textbox.

    | Property    | Value                                    |
    |-------------|------------------------------------------|
    | Name        | message_TextBox                          |
    | Value       | ""                                       |
    | Width       | 500                                      |
    | Height      | 180                                      |
    | X           | `Parent.Width/2 - message_TextBox.Width/2` |
    | Y           | 300                                      |
    | Placeholder | Type message here                        |
    | Visible     | enterMessage                             |

1. Select **+** (Insert) > **Input** > **Button**.

1. Update the following properties of the button.

    | Property  | Value                                  |
    |-----------|----------------------------------------|
    | Name      | submit_Button                          |
    | Value     | "Submit"                               |
    | Width     | 96                                     |
    | Height    | 32                                     |
    | Font size | 12                                     |
    | X         | `Parent.Width/2 - submit_Button.Width/2` |
    | Y         | 500                                    |
    | Visible   | enterMessage                           |

1. Copy the following formula in the **OnSelect** event of the button.

    ```power-fx
    Patch(Conversations,Defaults(Conversations),{ID:MicrosoftTeams.PostMessageToChannelV3(team_ComboBox.Selected.id,channel_ComboBox.Selected.id,{content:message_TextBox.Value,contentType: "text"},{subject:"New conversation"}).id,Team:team_ComboBox.Selected.id,'Team Channel':channel_ComboBox.Selected.id, 'Team Name':team_ComboBox.Selected.displayName,'Channel Name':channel_ComboBox.Selected.displayName, Company: TemplateGalleryList1.Selected}); Set(enterMessage,false); Reset(team_ComboBox);Reset(channel_ComboBox);Reset(message_TextBox)
    ```

    > [!NOTE]
    > - In the above formula, we're using the **Patch** function to create a row in the **Conversations** table to capture the conversation ID along with the team, team name, channel and channel came. At the same time, we're also posting a message in the appropriate team and channel using the **PostMessageToChannelV3** function. We then set the **enterMessage** variable back to "false" to hide some of the fields and buttons whose visibility depends on this variable.
    > - The subject is hardcoded to “New conversation" to keep the app simple ,and not add another text box control to capture. But a text box can be added for subject to the screen and can be captured by the user. This formula will need to be adjusted accordingly to reference that control.
    > The **Reset** function doesn't work for the **Fluent UI Combobox** control. This is needed to not have any team or channel selected once a message is posted.

1. Select **+** (Insert) > **Input** > **Button**.

1. Update the following properties of the button.

    | Property  | Value                                  |
    |-----------|----------------------------------------|
    | Name      | joinconversation_Button                |
    | Text      | "Join conversation"                    |
    | Width     | 200                                    |
    | Height    | 32                                     |
    | Font size | 12                                     |
    | X         | `Parent.Width/2 - submit_Button.Width/2` |
    | Y         | 500                                    |
    | Visible   | enterMessage                           |

1. Copy the following formula in the **OnSelect** event of the button.

    ```power-fx
    Launch(Concatenate("msteams://teams.microsoft.com/l/message/",Last(Sort(Conversations, 'Created On', Ascending)).'Team Channel',"/",Gallery1.Selected.etag,"?tenantId=",Param("tenandId"),"&groupId=",Last(Sort(Conversations, 'Created On', Ascending)).Team,"&parentMessageId=",LookUp(MicrosoftTeams.GetMessagesFromChannel(Last(Sort(Conversations, 'Created On', Ascending)).Team,Last(Sort(Conversations, 'Created On', Ascending)).'Team Channel').value,id = Last(Sort(Conversations, 'Created On', Ascending)).Team).etag,"&teamName=",Last(Sort(Conversations, 'Created  On', Ascending)).'Team Name',"&channelName=",Last(Sort(Conversations, 'Created On', Ascending)).'Channel Name'),{},LaunchTarget.New)
    ```

    > [!NOTE]
    > - In the above formula, we're using the **Launch** function to launch Teams using the team and channel parameters of the last record that was created in the **Conversations** table. We're doing this so that when a user starts a conversation and submits a message to post to a channel, the user can then select the **Join Conversation** button to go to the Teams post directly.
    > - We're using the last function here to keep it simple. If you anticipate using this app more extensively and anticipate having multiple conversations, you could get creative by using a gallery of conversations, and letting the user select which conversation they'd want to join.*

## Update the gallery OnSelect Property

Next, we'll update the **OnSelect** property of the company gallery so that when a user selects a company from the list, the app will go to the second screen.

1. Select **Screen1** from the tree view to open the **Companies** gallery.

2. Set the **OnSelect** property of the gallery item to `Navigate(Screen2)`.

## Save and publish the app

1. Select **Save** on the top-right to save the app.

1. Select **Publish** on the top-right to publish the app.

1. Select **Next**.

1. Under **Add to Channel**, make sure the channel under which the app should be shown is listed and shows as "1 active tab(s)" and not "0 active tab(s)".

1. Select **Save and Close** to complete the publishing of the app.

## Testing the app

Run the app in preview mode or go to the team in which the app is created.

1. The Companies gallery should show up as the first screen.
1. Select one of the companies.
1. You should only see two buttons: **Start a conversation** and **Join a conversation**.
1. Select **Start a conversation**.
1. Additional fields should show up:
    - Team (dropdown with a list of teams)
    - Channel (dropdown list of channels within the selected team)
    - Message box (text box to type in the message to be sent to the team)
    - Submit button (to submit the message)
1. Select a team.
1. Select a channel within the team.
1. Enter message.
1. Select **Submit**. All the additional fields/controls get hidden.
1. Select **Join conversation** to be taken to the team and channel chat where the last message was sent.

    ![Testing the app](media/have-a-conversation-about-your-business-data/testing-the-app-1.png "Testing the app")

---

## Build an app in Teams using Power Apps and Dataverse for Teams to retrieve Power Platform videos for readiness | Microsoft Docs

Source: [tutorial-buildapp-retrieve-videos.md](https://learn.microsoft.com/en-us/power-apps/teams/tutorial-buildapp-retrieve-videos)

*Tutorial on how to build an app in Teams using Power Apps and Dataverse for Teams that retrieves, lists, and displays content to used for readiness.*

# Build an app to retrieve Power Platform videos for readiness

In this tutorial, you’ll build a solution that retrieves, lists, and displays content that can be used for readiness.

![Video Library app.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-intro.png "Video Library app")

## Objective

The focus of this tutorial will be on finding, retrieving, browsing, and playing video content available on YouTube or RSS Feeds with MP4 video files.  It will continually monitor these channels and feeds for new content, and send a message to a specified Microsoft Team when new content is available.

The channels and feeds in the tutorial will focus on Power Platform content but can easily be used for other topics.

In this tutorial, you’ll use:

- Power Apps to build the application to specify the YouTube channels and RSS feeds.
- Power Automate to retrieve information about new and existing videos.
- Microsoft Dataverse for Teams to create tables to store the feed and video information.
- Power Automate to send a message to Microsoft Teams when a new video is delivered.

## Prerequisites

- Identify an existing Microsoft Team or create a new Microsoft Team that you’ll build your app for.

- Identify an existing channel or create a new channel within Microsoft Teams to post the messages sent, to specify that a new video has been retrieved.

If you’re unfamiliar with how to create a Team or a channel in a Team, see [Create a channel in Teams](https://support.microsoft.com/office/create-a-channel-in-teams-fda0b75e-5b90-4fb8-8857-7e102b014525).

In this tutorial, we'll use a channel named "Readiness".

## Step 1: Install and pin Power Apps in Teams

In this section, you’ll install the Power Apps app in Teams and pin it to the left rail so you can easily access it. To learn how to do install and pin the Power Apps app, see [Install the Power Apps personal app in Microsoft Teams](./install-personal-app.md).

If you’ve already done installed and pinned the Power Apps app, you can skip to the next step.

## Step 2: Create the app and the tables

In this section, you’ll take the initial steps to create the application.

1. Select the Power Apps app.

1. Select the **Build** tab at the top of the screen.

1. Select **Create** shown in the lower left of the screen.

    This action will display the **Create an app** dialog box.

1. Select the name of the team from the drop-down list and select **Create**.

    ![Create app.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-createapp.png "Create app")

    > [!NOTE]
    > If this is the first time you’ve tried to create an app in this Microsoft Teams team, it will take a moment to set up.

1. When prompted for the name of the app, enter **Video Library** and select **Save**.

### Step 2.1: Create the table for the feeds

In this section, you'll create a table to store the names and details for the feeds that will be used by the application.

1. Select **Create new table** on the left side of the screen.

1. When prompted for the name of the table, enter **Feeds**.

1. Select **Create**.

#### Step 2.1.1: Edit the Name column

1. In the visual editor, select the drop-down menu for the **Name** column and then **Edit column**.

1. Change the name to *Title*.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Save**.

#### Step 2.1.2: Create the Description column

1. Select **+** to create a new column.

1. Specify the name as *Description*.

1. For **Type**, select **Text** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.1.3: Create the Image Link column

1. Select **+** to create a new column.

1. Specify the name as *Image Link*.

1. For **Type**, select **URL** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.1.4: Create the Image Title column

1. Select **+** to create a new column.

1. Specify the name as *Image Title*.

1. For **Type**, select **Text** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.1.5: Create the Last Retrieved column

1. Select **+** to create a new column.

1. Specify the name as *Last Retrieved*.

1. For **Type**, select **Text** from the list.

1. Select **Create**.

#### Step 2.1.6: Create the Link column

1. Select **+** to create a new column.

1. Specify the name as *Link*.

1. For **Type**, select **URL** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.1.7: Create the Published On column

1. Select **+** to create a new column.

1. Specify the name as *Published On*.

1. For **Type**, select **Text** from the list.

1. Select **Create**

#### Step 2.1.8: Add a row

In the visual editor, add a row for the Microsoft show "\#LessCodeMorePower" that will be used in testing.

| **Title**       | \#LessCodeMorePower (HD) - Channel 9                     |
|-----------------|----------------------------------------------------------|
| **Description** | The show all about Power Apps. Learn more here!           |
| **Image Link**  | https://sec.ch9.ms/content/feedimage.png                 |
| **Image Title** | \#LessCodeMorePower (HD) - Channel 9                     |
| **Link**        | https://s.ch9.ms/Shows/Less-Code-More-Power/feed/mp4high |

> [!NOTE]
> Leave the **Published On** column empty.

The visual editor should resemble the image below.

![Visual editor.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-tbldesigner.png "Visual editor")

Select **Close** to close the visual editor.

The screen created automatically in the app, named **Screen1**, should automatically bind to the table, displaying the fields in the table and the record you added.

The screen should resemble the image below.

![Screen created in the app.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-screen1.png "Screen created in the app")

### Step 2.2: Create the table for the feed items

In this section, you'll create a table to store the details for the videos stored in the Feed Items for the YouTube channel or RSS feed.

1. Select **Add data** on the left side of the screen.

1. Select **Create new table**.

    ![Create a new table.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-feeditems.png "Create a new table")

1. When prompted for the name of the table, enter *Feed Items*.

#### Step 2.2.1: Edit the Name column

1. In the visual editor, select the drop-down for the **Name** column, and then select **Edit column**.

1. Change the name to *Feed Item ID*.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Save**.

#### Step 2.2.2: Create the Feed column

1. Select **+** to create a new column.

1. Specify the name as *Feed*.

1. For **Type**, select **Lookup** from the list.

1. For the table, select **Feeds** from the list

1. Select **Create**.

#### Step 2.2.3: Create the Title column

1. Select **+** to create a new column.

1. Specify the name as *Title*.

1. For **Type**, select **Text** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.2.4: Create the Description column

1. Select **+** to create a new column.

1. Specify the name as *Description*.

1. For **Type**, select **Text** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *2500*.

1. Select **Create**.

#### Step 2.2.5: Create the Primary Feed Link column

1. Select **+** to create a new column.

1. Specify the name as *Primary Feed Link*.

1. For **Type**, select **URL** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.2.6: Create the Video Link column

1. Select **+** to create a new column.

1. Specify the name as *Video Link*.

1. For **Type**, select **URL** from the list.

1. Select **Advanced options** and then change the value for **Max length** to *255*.

1. Select **Create**.

#### Step 2.2.7: Create the Published On column

1. Select **+** to create a new column.

1. Specify the name as *Published On*

1. For **Type**, select **Text** from the list.

1. Select **Create**.

The visual editor should resemble the image below.

![Visual editor for feed items table.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-feeditems-tbl.png "Visual editor for feed items table")

Select **Close** to close the visual editor.

Now that you’ve created the required tables, select **Save** on the upper-right corner to save the app and close the Power Apps Studio.

## Step 3: Create flows to get the video details for configured feeds

In this section, you'll create flows in Power Automate to retrieve videos for each of the configured feeds. This flow will monitor the RSS feeds for the addition of new videos, retrieve details for the videos, and save those details in the database.

When you’ve completed this section, your flow should resemble the diagram below.

![Entire flow - complete.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-complete_flow.png "Entire flow - complete")

> [!NOTE]
> Power Automate has a trigger that allows you to detect when a new item is added to a feed for an individual feed. When tracking multiple feeds, this would require multiple feeds and would require the same number of flows to match the number of feeds. The approach taken in this lab is more complex but with the benefit of having a single flow that supports any number of configured feeds in a single flow.

### Step 3.1: Create the flow

1. Select the **Build** tab.

1. From the list on the left, select the name of your team in which you created the tables earlier.

1. Select **See all** under the *Built by this Team* tab.

1. Select **New**.

1. Select **Flow** > **Scheduled**.

    > [!div class="mx-imgBorder"]
    > ![Create a scheduled flow.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-flowsched.png "Create a scheduled flow")

1. In the **Build a scheduled flow** dialog,

    1. Enter the name as "Retrieve Videos".

    1. Select **Day** as the frequency.

    1. Select **Create**.

    > [!div class="mx-imgBorder"]
    > ![Build a scheduled flow.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-schedflow.png "Build a scheduled flow")

### Step 3.2: Add the initialize variable action

1. Select **New step**.

1. Enter *Initialize variable* in the search box.

1. Select the **Initialize variable** action.

1. Enter *Link to Video* in the **Name** field.

1. Select **String** in the drop-down for **Type**.

    ![Add the initialize variable action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-init-variable.png "Add the initialize variable action")

    > [!NOTE]
    > Don’t enter any value in the **Value** field.

### Step 3.3: Add the List Records action

1. Select **New Step**.

1. Enter *Microsoft Dataverse* in the search box and select the action named **List records**.

1. Select **Feeds** in the **Entity name** property.

1. Select ellipsis (…) in the header of the action and select **Rename**.

1. Rename the action to *Get list of feeds to retrieve*.

    ![Add the List Records action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-feedslist.png "Add the List Records action")

### Step 3.4: Add the Current time action

1. Select **New Step**.

1. Enter *Date Time* in the search box and select the action named **Current time**.

    > [!div class="mx-imgBorder"]
    > ![Add the Current time action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-current-time.png "Add the Current time action")

### Step 3.5: Add the Apply to each action

1. Select **New Step**.

1. Enter *Apply to each* in the search box, and then select the action named **Apply to each**.

1. Select the text box under **Select output from previous steps**.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **value**.

1. Select ellipsis (…) in the header of the action and select **Rename**.

1. Rename the action to *Loop through each of the feeds in the database*.

    ![Add the Apply to Each action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-loopfeeds.png "Add the Apply to Each action")

### Step 3.6: Add the List all RSS Feed Items action

1. Select **Add an action**.

1. Enter *RSS* in the search box and select the action called **List all RSS feed items**.

1. Select the box for the property **The RSS feed URL**.

1. In the **Dynamic content**, scroll down to the section **Get list of feeds to retrieve**, and then select **Link**.

1. Select in the box for the property **since** and select **Last Retrieved**.

    ![Add the List all RSS Feed Items action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-rssfeeds.png "Add the List all RSS Feed Items action")

### Step 3.7: Add the Apply to Each Action

1. Select **Add an action**.

1. Enter *Apply to each* in the search box and select the action named **Apply to each**.

1. Select the text box under **Select output from previous steps**.

1. In the **Dynamic content** list, scroll down to the section called **List all RSS feed items**, and then select **body**.

1. Select ellipsis (…) in the header of the action, and then select **Rename**.

1. Rename the action to *Loop through each of the items in the feed since last retrieved*.

    ![Loop through each of the items in the feed since last retrieved.](media/tutorial-buildapp-retrieve-videos/feeds-body-loop-through.png "Loop through each of the items in the feed since last retrieved")

### Step 3.8: Add the Apply to Each action

1. Select **Add an action** inside *Loop through each of the items in the feed since last retrieved*.

1. Enter *Apply to each* in the search box and select the action named **Apply to each**.

1. Select the text box under **Select output from previous steps**.

1. In the **Dynamic content** list, scroll down to the section **List all RSS feed items**, and then select **Feed links**.

1. Select ellipsis (…) in the head of the action, and then select **Rename**.

1. Rename the action to *Evaluate links to determine if this is YouTube or a Vlog with a video*.

    ![Evaluate links to determine if this is YouTube or a Vlog with a video.](media/tutorial-buildapp-retrieve-videos/feeds-feed-links-loop-through.png "Evaluate links to determine if this is YouTube or a Vlog with a video")

### Step 3.9: Add the Condition action

1. Select **Add an action**.

1. Enter *Condition* in the search box, and then select the action named **Condition**.

1. Select the text box containing text **Choose a value**.

1. In the **Dynamic content** list that is displayed, scroll down to the section called **Evaluate links to determine if this is YouTube or a Vlog with a video**, and then select **Current item**.

1. Select the drop-down that shows **is equal to**, and then select **contains**.

1. Select the text box text **Choose a value** and enter the value **.mp4**.

1. Select ellipsis (…) in the header of the action, and then select **Rename**.

1. Rename the action to *Check to see if there is a link with an MP4 file*.

    ![Check to see if there is a link with an MP4 file.](media/tutorial-buildapp-retrieve-videos/feeds-mp4-check.png "Check to see if there is a link with an MP4 file")

1. In the **If yes** path on the left, select **Add an action**.

    1. Enter *Set variable* in the search box, and then select the action named **Set Variable**.

    1. Select **Link to Video** in the drop-down for the *Name* property.

    1. Select the textbox for the **Value** property.

    1. In the **Dynamic content** list, scroll down to the section called **Evaluate links to determine if this is YouTube or a Vlog with a video** and select **Current item**.

    1. Select ellipsis (…) in the header of the action, and then select **Rename**

    1. Rename the action to *Specify the Video Link is the link to an MP4 File*.

        ![Specify the Video Link is the link to an MP4 File.](media/tutorial-buildapp-retrieve-videos/feeds-mp4-yes.png "Specify the Video Link is the link to an MP4 File")

1. In the **If No** path on the left, select **Add an action**.

    1. Enter *Set variable* in the search box, and then select the action named **Set Variable**.

    1. Select **Video Link** in the drop-down for the **Name** property.

    1. Select the textbox for the **Value** property.

    1. In the **Dynamic content** list, scroll down to the section **List all RSS feed items**, and then select **Primary feed link**.

    1. Select ellipsis (…) in the header of the action, and then select **Rename**.

    1. Rename the action to *Specify the Video Link is the Primary feed link*.

        ![Specify the Video Link is the Primary feed link.](media/tutorial-buildapp-retrieve-videos/feeds-video-link.png "Specify the Video Link is the Primary feed link")

Select the header of the action to show the title of **Evaluate links to determine if this is YouTube or a Vlog with a video**.

![Add the primary feed link.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-primary-feed.png "Add the primary feed link")

### Step 3.10: Add the Create a New Record action

1. Inside *Loop through each of the items in the feed since last retrieved* action, select **Add an action**.

1. Enter *Microsoft Dataverse* in the search box, and then select the action called **Create a new record**.

1. Select **Feed Items** in the *Entity name* property.

1. In the **Dynamic content** list scroll down to the section **List all RSS feed items**, and then select **Feed ID**.

1. Select the textbox next to *Field Item ID*.

1. Select **Show advanced options** link in the action to display all the fields in  the table.

1. Select the textbox next to *Description*.

1. In the **Dynamic content** list, scroll down to the section called **List all RSS feed items** and select **Feed summary**.

1. Select the textbox next to *Feed (Feeds)*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **OData Id**.

1. Select the textbox next to *Primary Feed Link*.

1. In the **Dynamic content** list scroll down to the section **List all RSS feed items**, and then select **Primary feed link**.

1. Select the textbox next to *Published On*.

1. In the **Dynamic content** list, scroll down to the section **List all RSS feed items**, and then select **Feed published on**.

1. Select the textbox next to *Title*.

1. In the **Dynamic content** list, scroll down to the section **List all RSS feed items**, and then select **Feed title**.

1. Select the textbox next to *Video Link*.

1. In the **Dynamic content** list, scroll down to the section **Variables**, and then select **Link to Video**.

    ![Set primary feed link.](media/tutorial-buildapp-retrieve-videos/tutorial-create-new-record.png "Set primary feed link")

### Step 3.11: Add the Set Variable action

1. Select **Add action** after *Create new record*.

1. Enter **Teams** in the search box, and then select the **Post a message (V3) (preview)** action.

1. In the drop-down for the **Team** property, select the team to send the message.

1. In the drop-down for the **Channel** property, select the channel to send the message.

1. Select **Show advanced options** link.

1. In the *Message* property, create a message with details about the item. An example message is shown in the image below.

    ![Add the Set Variable action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-postmsg.png "Add the Set Variable action")

Select the header of the action to show the title of **Loop through each of the items since last retrieved**.

### Step 3.12: Add the Update Record action

1. Inside *Loop through each of the feeds in the database* action, select **Add an action**.

1. Enter *Microsoft Dataverse* in the search box, and then select the action **Update a record**.

1. Select **Feeds** for the *Entity Name*.

1. Select textbox next to *Item ID*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Feeds**.

1. Select textbox next to *Title*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Title**.

1. Select **Show advanced options** link in the action to display all the fields in  the table.

1. Select textbox next to *Description*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Description**.

1. Select textbox next to *Image Link*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Image Link**.

1. Select textbox next to *Image Title*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Image Title**.

1. Select textbox next to *Last Retrieved*.

1. In the **Dynamic content** list, scroll down to the section **Current time** and select **Current time**.

1. Select textbox next to *Link*.

1. In the **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Link**

1. Select textbox next to *Published On*.

1. In **Dynamic content** list, scroll down to the section **Get list of feeds to retrieve**, and then select **Published On**.

    ![Add the Update Record action.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-publishedon.png "Add the Update Record action")

Your complete flow should look like the following image:

![Completed flow.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-complete_flow.png "Completed flow")

### Step 3.13: Save the Flow

1. From the upper-right side of the screen, select **Save**.

1. Select the back arrow in the upper left.

1. Select the flow **Retrieve Videos**.

1. Select **Run** in the command bar.

1. From the panel on the right side of the screen, select **Run flow**.

1. Select **Done**.

1. Select the refresh button in **28-day run history** to show the details of the flow run.

    ![Run flow.](media/tutorial-buildapp-retrieve-videos/run-flow.png "Run flow")

If the flow doesn't show as succeeded, select **Run** and it will display the failed action with any associated error message.

## Step 4: Edit the app to add the video library interface

In this section, you'll create a new screen in the app that enables you and other members of the team to browse through videos, see the video details, and play them directly within Teams.

To start editing the app:

1. Select Power Apps from the left rail in Teams.

1. Select the **Build** tab.

1. From the left pane, select the team environment where the app is created.

1. Under *Built by this team**, select the **Video Library** app.

Now create a new screen and configure the screen controls using the following steps.

### Step 4.1: Create new screen

1. Select **Tree view**.

1. Select **New screen**.

1. Select **Blank** layout.

1. Select **+** to begin adding controls to screen.

### Step 4.2: Add the header

1. Enter **Rectangle** in the search box.

1. Drag the rectangle control onto the screen.

1. Set the following properties with these values:

    |Property  | Value |
    |----------|-------|
    | X  | 0  |
    | Y  | 0  |
    | Width  | 1365  |
    | Height  | 60  |
    | Color  | Purple  |

### Step 4.3: Add the header label

1. Enter **Label** in the search box.

1. Drag the label onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Text  | Video Library  |
    | Display Mode  | View  |
    | Font size  | 24  |
    | X  | 576  |
    | Y  | 0  |
    |Width | 191 |
    |Height | 61 |
    |Color | White |

### Step 4.4: Add a rectangle for the Video List Header

1. Enter **Rectangle** in the search box.

1. Drag the rectangle control onto the screen.

1. Set the following properties with these values:

    |Property  | Value |
    |----------|-------|
    | X  | 0  |
    | Y  | 61  |
    | Width  | 1365  |
    | Height  | 58  |
    | Color  | Purple  |

### Step 4.5: Add a label for the Video List Header

1. Enter **Label** in the search box.

1. Drag the label onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Text  | Select a video from the list below  |
    | Display Mode  | View  |
    | Font size  | 14  |
    | X  | 39  |
    | Y  | 74  |
    |Width | 320 |
    |Height | 32   |
    |Color | White |

### Step 4.6: Add a Vertical Gallery

1. Enter **Vertical Gallery** in the search box.

1. Drag the label onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Name  | Video Library  |
    | Data Source  | Feed Items  |
    | Layout  | Image, title, and subtitle  |
    | X  | 0  |
    | Y  | 119  |
    |Width | 450 |
    |Height | 649 |

In the tree view on the left side of the screen, there are three controls underneath the Video Gallery with names starting with Subtitle, Title, and Image.

![Video library gallery.](media/tutorial-buildapp-retrieve-videos/video-library-gallery.png "Video library gallery")

#### Step 4.6.1: Set the Subtitle

1. Select the control that starts with **Subtitle**.

1. Select the **Text** property from the property list on top-left.

1. Update the property value to the following formula:

    ```power-fx
    ThisItem.Feed.Description
    ```

#### Step 4.6.2: Set the Title

1. Select the control that starts with **Title**.

1. Select the **Text** property from the property list on top-left.

1. Update the property value to the following formula:

    ```power-fx
    ThisItem.Feed.Title
    ```

#### Step 4.6.3: Set the Image

1. Select the control that starts with **Image**.

1. Select the **Text** property from the property list on top-left.

1. Update the property value to the following formula:

    ```power-fx
    ThisItem.Feed.'Image Link'
    ```

### Step 4.7: Add the background for the feed item

1. Enter **Rectangle** in the search box.

1. Drag the rectangle control onto the screen.

1. Set the following properties with these values:

    |Property  | Value |
    |----------|-------|
    | X  | 451  |
    | Y  | 61  |
    | Width  | 915  |
    | Height  | 707  |
    | Color  | Purple  |

### Step 4.8: Add the feed item title header label

1. Enter **Label** in the search box.

1. Drag the label onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Font size  | 18  |
    | X  | 466  |
    | Y  | 51  |
    |Width | 883 |
    |Height | 78   |
    |Color | White |

1. Select the **Text** property from the property list on top-left.

1. Set the **Text** property value to the following formula: 

    ```power-fx
    'Video Library'.Selected.Title
    ```

### Step 4.9: Add a Video Control

1. Enter **Video** in the search box.

1. Drag the video control onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | X  | 450  |
    | Y  | 129  |
    |Width | 916 |
    |Height | 523 |

1. Select the **Media** property from the property list on top-left.

1. Set the **Media** property value to the following formula:

    ```power-fx
    'Video Library'.Selected.'Video Link'
    ```

### Step 4.10: Add the feed description HTML Text control

1. Enter **HTML text** in the search box.

1. Drag the HTML text control onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Font size  | 14  |
    | X  | 458  |
    | Y  | 651  |
    |Width | 908 |
    |Height | 82        |
    |Color | White |

1. Select the **HtmlText** property from the property list on top-left.

1. Set the **HtmlText** property value to the following formula:

    ```power-fx
    'Video Library'.Selected.Description
    ```

### Step 4.11: Add the Published On label

1. Enter **Label** in the search box.

1. Drag the Label onto the screen.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | Font size  | 14  |
    | X  | 1153  |
    | Y  | 732  |
    |Width | 213 |
    |Height | 36        |
    |Color | White |

1. Select the **Text** property from the property list on top-left.

1. Set the **Text** property value to the following formula: 

    ```power-fx
    Concatenate("Published On ",Text('Video Library'.Selected.'Published On'))
    ```

### Step 4.12: Enable toggle between screens

Currently there are two separate screens, but no way to toggle between them. The ability to toggle between the screens will be important to enable the addition of more feeds.

#### Step 4.12.1: Add the gear icon

1. Select **Screen2**.

1. Select **Add icon** from the properties pane.

1. Select the **Settings** icon type.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | X  | 1307 |
    | Y  | 6  |
    |Width  | 48 |
    |Height | 51   |
    | Color | White |

1. Select the **OnSelect** property from the property list on top-left.

1. Set the **OnSelect** property value to the following formula: 

    ```power-fx
    Navigate(Screen1)
    ```

#### Step 4.12.2: Configure the back button

1. Select **Screen1**.

1. Select **Add icon** from the properties pane.

1. Select the **Back** icon type.

1. Set the following properties with these values:

    | Property  | Value  |
    |-----------|--------|
    | X  | 225 |
    | Y  | 12  |
    |Width  | 32 |
    |Height | 32   |

1. Select the **OnSelect** property from the property list on top-left.

1. Set the **OnSelect** property value to the following formula:

    ```power-fx
    Navigate(Screen2)
    ```

When you select the gear icon, the app will now show the form to edit the list of feeds. Selecting the back button will return to the list of videos.

## Step 5: Test the app

Before publishing the application to teams, it’s important to test core functionality.

### Step 5.1: Test the Power Automate Flow

1. Run the Power Automate flow.

1. Confirm that new items have been added to the **Feed Items** table.

1. Confirm that the flow has posted new messages to the Channel you specified when configuring the application.

### Step 5.2: Test the app functionality

1. Open the app in Power Apps Studio.

1. From upper-right side of the screen, select **Preview**.

1. Select the list of feed items in the gallery on the left.

1. When you select an item, confirm that the *Title*, *Description*, *Publish Date*, and the Video details are displayed.

1. Select the video and confirm the video plays.

### Step 5.3: Test additions to the Feeds table

1. Add another feed to the **Feeds** table.

1. Rerun the Power Automate flow.

1. Repeat the above steps.

## Step 6: Publish the app

1. Select the **Publish to Teams** icon in the upper right.

1. Select **Next**.

1. Select **+** next to the channel, such as **Readiness** to add the app to.

    ![Publish the app.](media/tutorial-buildapp-retrieve-videos/tutorial-buildapp-publish-app.png)

1. Select **Save and close**.

### See also

[Use sample app templates in Microsoft Teams](use-sample-apps.md)

---

## Manage your apps using Power Apps app in Teams | Microsoft Docs

Source: [manage-your-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/manage-your-apps)

*Learn how to manage your apps using Power Apps app in Teams.*

# Manage your apps in Teams

To manage an app, select **Apps** from the solution explorer. Then select the app that you want to manage, or select **Commands** (**…**) next to the app name, and then select commands from the drop-down menu.

> [!NOTE]
> The Teams experience changes frequently. If the current Teams UI or screenshots in this article don't match what you see, use the option names and overall flow as your guide.

![Select apps.](media/manage-apps-1.png "Select apps")

## Edit an app

Select **Edit** to edit the app in Power Apps Studio. More information: [Edit a canvas app in Power Apps](../maker/canvas-apps/edit-app.md) and [Understanding Power Apps Studio](understand-power-apps-studio.md)

> [!TIP]
> Use this option if you want to rename an app, or change app icon and description. For detailed steps, go to [rename an app](#rename-an-app) or [change app icon and description](#change-app-icon-and-description).

## Add to Teams

Allows you to download the app and then add it to Teams. For the current end-to-end experience, see [Embed a canvas app as personal app in Teams](embed-teams-app.md) and [Publish your app in Teams](publish-and-share-apps.md).

![Add to Teams.](media/embed-app-teams.png "Add to Teams")

## App details

The **Details** option shows the owner of the app, when the app was created and last modified, app ID and license designation.

![App details.](media/app-details.png "App details")

## Restore an app

A canvas app can have multiple versions. You can restore an app to an available published version.

To restore an app to a specific version:

1. Select **Versions** from the [app details](#app-details) screen.

    ![App versions.](media/app-versions.png "App versions")

1. Select a version other than *Live* that you want to restore.

1. Select ![Ellipsis for versions.](media/ellipsis.png "Ellipsis for versions").

1. Select **Restore**.

    ![Restore a version.](media/restore-version.png "Restore a version")

    > [!NOTE]
    > The restored app becomes the latest version of the app. However, the latest version is not yet live. You must publish the restored version to make the restored version available to all users.

1. Select ![Ellipsis to publish restored version.](media/ellipsis.png "Ellipsis to publish restored version") for the restored version.

1. Select **Publish this version**.

    ![Publish restored version.](media/publish-restored-version.png "Publish restored version")

1. Review the app preview and select **Publish this version** to confirm.

    ![Confirm publish restored version.](media/confirm-publish-restored-version.png "Confirm publish restored version")

The **Versions** tab now shows the restored version as *Live*:

![Confirm restored app.](media/confirm-restored-app.png "Confirm restored app")

More information: [Restore an app](../maker/canvas-apps/restore-an-app.md)

## Delete an app

Select **Delete** to delete an app. When prompted, select **Delete from cloud** to delete the app.

![Delete app.](media/manage-app-2.png "Delete app")

For more information about deleting an app, go to [Delete an app](../maker/canvas-apps/delete-app.md).

## Rename an app

To rename an app:

1. [Edit the app](manage-your-apps.md#edit-an-app) in Power Apps Studio.
1. Select the app name from the top-right.
1. Update the name.

    ![Rename an app.](media/studio-app-name-editor.png "Rename an app")

1. Select **Save**.

More information: [Edit app editor](understand-power-apps-studio.md#app-name-editor)

## Change app icon and description

To change the app icon and description:

1. [Edit the app](manage-your-apps.md#edit-an-app) in Power Apps Studio.
1. Select **Settings**.
1. Update the icon and description.

    ![Change app icon and description.](media/studio-general-settings.png "Change app icon and description")

1. Select **Save**.

More information: [Change app settings](understand-power-apps-studio.md#settings)

### See also

[Publish and share your apps](publish-and-share-apps.md)
[Set permission and share apps with colleagues](set-perms-and-share.md)
[Embed a canvas app as personal app in Teams](embed-teams-app.md)

---

## Set permission and share your app using Power Apps in Teams | Microsoft Docs

Source: [set-perms-and-share.md](https://learn.microsoft.com/en-us/power-apps/teams/set-perms-and-share)

*Learn how to share your apps and set table permissions using Power Apps in Teams.*

# Set permission and share apps with colleagues

After collaboration with your team to build an app, as an owner of the team, you can share the app and its underlying data with other colleagues within your company that don't belong to your development team.

> [!NOTE]
> The Teams experience changes frequently. If the current Teams UI or screenshots in this article don't match what you see, use the option names and overall flow as your guide.

To share an app:

1. Assign the correct permissions for the tables in your app for the **Colleagues with access** role.

2. Select a security group you would like to assign to the **Colleagues with
access** role.
    
3. Choose which apps the **Colleagues with access** role should have access to.

Once you’re done sharing your apps, they’ll appear in the [Built for your
colleagues](/microsoftteams/manage-power-platform-apps) section within the Teams app store. If you’re a Teams admin, you can also pin apps for users in the Teams app bar for even easier discovery.

![Built by your colleagues.](media/built-for-your-colleagues.png "Built by your colleagues")

> [!NOTE]
> - If your app doesn't appear in the **Built by your colleagues** section, your Teams app might be caching information. If this happens, try signing out, and sign back in if you're using the Teams desktop app. If you're using Teams web app, try refreshing your browser.
> - You need to be an owner within the team to share apps and edit table
permissions. If you are not an owner, the **Manage permission** and **Share with colleagues** options won't appear.

## Assign table permissions

By default, the **Colleagues with access** role has no access to the data inside any of the custom tables you built using Dataverse for Teams. If you would like users outside of your team to access this data, you'll need to change the default access to one of these four permission sets:

- **Full access** – Allows end users to see and edit all records in the table.

- **Collaborate** – Allows end users to see all records, but they can only edit their own records.

- **Reference** – Provides a read-only view of data for end users.

- **Private** ­– Allows end users to only view and edit their own data.

Use **Full access** or **Collaborate** when colleagues need to edit data, and use **Reference** when they only need read-only access.

> [!NOTE]
> You can also use this experience to alter the default access rights for
members and guests within your team. By default, Team members are given **Full
access** and guests are given **Private** access to new custom tables.

To set the permissions of a table:

1. Select **Build** tab.

1. Select the team that contains the app and tables you want to share.

1. Select **See all** under the list of resources in the team.

1. Select **Tables** from the left pane.

1. Select the table you want to share.  

    ![Manage permissions.](media/manage-permissions.png "Manage permissions")

1. Select the **Manage permissions** in the command bar.

1. Under the **Colleagues with access** role, and select the permission set that you want to grant this role.  

    ![Colleagues with access.](media/colleagues-with-access.png "Colleagues with access")

    > [!TIP]
    > After you assign a security group to the **Colleagues with access** role, you'll see the name of the security group reflected in
    the table permission panel.

1. Select **Save**.

1. Repeat the above steps for the remaining tables in your app.

> [!IMPORTANT]
> When using **Share app with Colleagues in the Microsoft Teams app store** and the security group doesn't exist in the Dataverse organization, the Teams app will be created and assigned the **Basic User** role. 

## Assign the colleagues with access role to a security group and share the app

After you’ve completed setting the permissions to all your tables, you’re now
ready to share the app with an existing security group.

> [!NOTE]
> - You can share an app to a single security group.
> - If you want to share the app to a Microsoft 365 group, it must be [security enabled](../maker/canvas-apps/share-app.md#share-an-app-with-microsoft-365-groups).
> - The security group's membership type must be **Assigned**. More information: [Group membership types in Microsoft Entra ID](/azure/active-directory/fundamentals/active-directory-groups-create-azure-portal#membership-types)
> - Your Power Apps administrator may have applied the limit to the maximum size of the security group. By default, this limit is 10,000 members. More information: [List tenant settings (preview) - powerPlatform.teamsIntegration.shareWithColleaguesUserLimit](/power-platform/admin/list-tenantsettings), [Set-TenantSettings](/powershell/module/microsoft.powerapps.administration.powershell/set-tenantsettings)

To share an app:

1. Select **Build** tab.

1. Select the team that contains the app you want to share.

1. In the top-right, select the **Share with colleagues**.

    ![Share with colleagues.](media/share-with-colleagues.png "Share with colleagues")

1. Search for, and select the security group you want to share the apps and tables with.

    ![Search and select group.](media/select-group-to-share.png "Search and select group")

1. Set **Colleague can use** toggle to **On** for the apps and tables that you want to share with the security group selected in the previous step.

    ![Set On for apps and tables.](media/toggle-on.png "Set On for apps and tables")

1. Select **Save**.

The apps you selected will now appear in the [Built for your
colleagues](/microsoftteams/manage-power-platform-apps) section within the Teams app store.

### Optional: Pin the app to the app bar as a tenant administrator

If you're a tenant administrator, you can go one step forward and pin the apps for end users in Teams. To pin apps in Teams, follow the steps to [add an app to the app catalog](embed-teams-app.md), and then, [edit or create a new Teams app setup policy](/microsoftteams/teams-app-setup-policies) with your app.

| Teams desktop client | Teams mobile client |
| - | - |
| ![Teams desktop client](media/app-setup-policies-desktop-app-bar.png "Teams desktop client") | ![Teams mobile client](media/mobile-app-ui.png "Teams mobile client")  |

### See also

[Publish your app in Teams](publish-and-share-apps.md)
[Manage your apps in Teams](manage-your-apps.md)
[Set table permissions in Dataverse for Teams](dataverse-for-teams-table-permissions.md)

---

## Publish your app using Power Apps app in Teams | Microsoft Docs

Source: [publish-and-share-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/publish-and-share-apps)

*Learn how to publish and share your apps using Power Apps app in Teams.*

# Publish your app in Teams

In this article, learn about how you can publish and add apps to Microsoft Teams team.

## Publish and add an app to Teams

Whenever you save changes to a canvas app, you automatically publish them only for yourself and anyone else who has permissions to edit the app. When you finish making changes, you must explicitly publish them to make them available to everyone the app is shared with.

To publish an app, select the **Publish to Teams** button from the top-right side of Power Apps Studio.

![Publish to Teams.](media/publish-app-5.png "Publish to Teams")

Select **Next.** Publishing an app creates a new version of the app and makes the published version of the app available to everyone else the app is shared with.

![Select Next.](media/publish-app-6.png "Select Next")

A list of all channels is displayed. You can add the app to one or more channels as a tab in the team.

![List of channels.](media/publish-app-7.png "List of channels")

Select **Add a tab** ![Add a tab.](media/publish-app-9.png "Add a tab"), and then select **Save + close**.

> [!TIP]
> If the app is already published to a Teams channel as a tab, you'll have the option to **Show tabs**. <br> To publish updated version of an app to an existing active tab, select **Save + close** without adding a new tab. <br> To add published version of an app to a new tab in a different channel, Select **Add a tab** ![Add a tab.](media/publish-app-9.png "Add a tab") for the channel you want, and then select **Save + close**.

![Select and save.](media/publish-app-8.png "Select and save")

More information: [Publish an app](../maker/canvas-apps/save-publish-app.md)

## Move an app to another Teams channel in the same team

Moving an app to another Teams channel in the same team requires publishing the app to the new channel, and then, removing the app from the old channel.

- To publish an app to the new channel: Follow the steps to [publish and add an app to Teams](#publish-and-add-an-app-to-teams). But before you select **Save + close**, select **Add a tab** ![Add a tab.](media/publish-app-9.png "Add a tab") for the new channel you want. And then, select **Save + close** to publish the app to the new channel.
- To remove the app from a channel: Follow the steps to [remove an app](remove-your-apps.md).

### See also

[Set permission and share apps with colleagues](set-perms-and-share.md)

[Manage your apps in Teams](manage-your-apps.md)

---

## Remove your apps | Microsoft Docs

Source: [remove-your-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/remove-your-apps)

*Learn how to remove your apps using Power Apps app from Teams.*

# Remove an app from your team

Removing an app that was added as a tab from a Microsoft Teams channel makes it inaccessible from the Teams tab for all members of the Teams channel.

To remove an app from your team:

1. Go to the team that you added the app to.

    ![Team.](media/remove-apps-1.png "Team")

2. Select the drop-down for the tab.

    ![Select tab.](media/remove-app-2.png "Select tab")

3. Select **Remove**.

4. Confirm **Remove**.

    ![Confirm removal.](media/remove-app-confirm.png "Confirm removal")

The app is now removed from your Teams channel.

![App removed.](media/remove-app-3.png "App removed")

### See also

[Uninstall the Power Apps personal app](uninstall-personal-apps.md)

---

## Uninstall the Power Apps personal app | Microsoft Docs

Source: [uninstall-personal-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/uninstall-personal-apps)

*Learn how to uninstall personal apps using Power Apps app from Microsoft Teams.*

# Uninstall the Power Apps personal app

Uninstalling the Power Apps app removes the app as a personal app available to your account. Uninstalling the Power Apps app doesn't uninstall or remove the apps created by using Power Apps from the respective Microsoft Teams channels.

To uninstall the Power Apps personal app:

1. Select ![Ellipsis.](media/uninstall-1.png "Ellipsis") on the left pane in Teams.

    ![Find an app.](media/uninstall-find-apps.png  "Find an app")

2. Find the Power Apps app by using search, if it's not visible in your most recent view.

3. Right-click to select **Power Apps** app, and then select **Uninstall** from the shortcut menu.

    ![Select Power Apps.](media/uninstall-2.png "Select Power Apps")

5. In the window that appears, select **Uninstall**.

    ![Confirm uninstall.](media/uninstall-confirm.png "Confirm uninstall")

The Power Apps app is now uninstalled from Teams.

![Power Apps app uninstalled.](media/uninstall-3.png "Power Apps app uninstalled")

### See also

[Install the Power Apps personal app](install-personal-app.md)

---

## Use sample app templates in Teams | Microsoft Docs

Source: [use-sample-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/use-sample-apps)

*Learn how to use sample app templates in Teams*

# Use sample app templates in Microsoft Teams

Several sample app templates are available for use in Microsoft Teams that you can download from [here](https://github.com/microsoft/teams-powerapps-app-templates). You can choose the sample app template that best fits your business requirement and quickly install it to get started. Sample app templates created with Power Apps typically consist of multiple components such as apps, flows, and tables.

> [!IMPORTANT]
> Sample app templates available for [download](https://github.com/microsoft/teams-powerapps-app-templates) are provided as-is. For any issues, feedback, support, or changes related to sample app templates, go to https://github.com/microsoft/teams-powerapps-app-templates/issues and submit an issue or a pull request.

## Available sample app templates

The following table lists sample app templates available for [download](https://github.com/microsoft/teams-powerapps-app-templates).

:::row:::
   :::column span="":::
      ![Boards app.](media/app-icons/boards-app-icon.png "Boards app") <br> [Boards](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/Boards) <br> A simple way to connect and share with people in your organization with similar interests.
   :::column-end:::
   :::column span="":::
      ![Bulletins app](media/app-icons/bulletins-app-icon.png "Bulletins app") <br> [Bulletins](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/Bulletins) <br> Manager and user apps for company communications.
   :::column-end:::
   :::column span="":::
      ![Employee ideas](media/app-icons/employee-ideas-app-icon.png "Employee ideas app") <br> [Employee ideas](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/EmployeeIdeas) <br> App for campaigns and ideas.
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      ![How to.](media/app-icons/how-to-app-icon.png "How to app") <br> [How to](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/HowTo) <br> Learn how to be a Power Apps maker.
   :::column-end:::
   :::column span="":::
      ![Inspection app](media/app-icons/inspection-app-icon.png "Inspection app") <br> [Inspection](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/Inspection) <br> Manager and user apps for area inspections.
   :::column-end:::
   :::column span="":::
      ![Issue reporting app](media/app-icons/issue-reporting-app-icon.png "Issue reporting app") <br> [Issue reporting](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/IssueReporting) <br> Manager and user apps for issue reporting.
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
      ![Milestones app](media/app-icons/milestones-app-icon.png "Milestones app") <br> [Milestones](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/Milestones) <br> App to keep track of projects, and initiatives.
   :::column-end:::
    :::column span="":::
      ![Perspectives app.](media/app-icons/perspectives-app-icon.png "Perspectives app") <br> [Perspectives](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/Perspectives) <br> A simple way to add topics and extend the topics with Q&A for discussions.
   :::column-end:::
   :::column span="":::
      ![Profile+ app](media/app-icons/profile-app-icon.png "Profile+ app") <br> [Profile+](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/ProfilePlus) <br> Quickly find out about people in your organization.
   :::column-end:::
:::row-end:::
:::row:::
   :::column span="":::
    ![Get connected app](media/app-icons/get-connected-app-icon.png "Get connected app") <br> [Get connected](https://github.com/microsoft/teams-powerapps-app-templates/tree/main/GetConnected) <br> Connect with people in your organization with similar skills.
   :::column-end:::
   :::column span="":::
    :::column-end:::
   :::column span="":::
    :::column-end:::
:::row-end:::

The following tutorial shows how to install the Employee ideas app. You can use similar steps to install other sample app templates.

## Install the sample app template

To learn about installing sample app templates, go to https://github.com/microsoft/teams-powerapps-app-templates.

> [!NOTE]
> - Installing sample app templates automatically enables the selected team's Microsoft 365 Group for security. More information: [Enable security for the selected team's Microsoft 365 Group](../maker/canvas-apps/share-app.md#share-an-app-with-microsoft-365-groups)
> - If you can't upload or install uploaded sample app templates, check your [app permission policies in Microsoft Teams](/microsoftteams/teams-app-permission-policies).

## Run the sample app template

To run the installed app, select the app's tab from the team channel. In this example, we'll use **Employee ideas**.

### Step 1 - Allow connections

Before you can use the app, it might ask your permission to use connections.

> [!NOTE]
> The list of connections you see below is an example. The number and types of connections asking for your permissions may vary depending on the app you install.

![Select Allow to let the app use connections.](media/sample-app-10.png "Select Allow to let the app use connections")

Select **Allow**, so the app can use connections.

### Step 2 - Select the channel

Select the channel (in this example, the channel is populated automatically), and then select **Let's go**.

![Select Let's go.](media/sample-app-11.png "Select Let's go")

### Step 3 - Use the app

The **Employee ideas** app is now open and ready for your use.

![Select app from available list.](media/sample-app-12.png "Select app from available list")

For more details about using the **Employee ideas** app, go to [Employee ideas](employee-ideas.md).

## Edit the sample app template

You can further customize and edit the components of an installed Power Apps app in Teams. More information: [Manage your apps](manage-your-apps.md)

## Report installation errors

If you get any errors during the installation process, you can help us troubleshoot the problem much more effectively by selecting **Ctrl**+**Alt**+**A** on the keyboard to get the session details. For more information about session details, go to [About tab](overview-of-the-power-apps-app.md#about).

For issues related to the sample app templates, report an issue at https://github.com/microsoft/teams-powerapps-app-templates.

## Sample app template updates

Updates to the sample app templates are published immediately. If you already have a sample app template in use when this happens, a new version of the app is created with these updates and published as the live version. If you [customized a sample app](customize-sample-apps.md), you can [restore the app to a previous version](manage-your-apps.md#restore-an-app) with your customizations, or recreate the customizations on top of the updated live version. When restoring the app to preserve your customizations, ensure to check the app functionality for compatibility with the updates.

## Sample app templates FAQs

For Frequently Asked Questions about sample app templates, go to [Sample app templates FAQs](sample-apps-faqs.md).

## See also

[Customize sample app templates](customize-sample-apps.md)
[Manage your apps in Teams](manage-your-apps.md)
[Overview of the Power Apps app](overview-of-the-power-apps-app.md)

---

## Customize sample app templates  | Microsoft Docs

Source: [customize-sample-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/customize-sample-apps)

*Learn how to customize sample app templates.*

# Customize sample app templates 

In this article, you'll learn about customizing sample app templates. For example, you may need to change the company logo, update the data inside the sample app templates to fit your business requirement, add or remove controls on the screens to extend the app.

## Prerequisites

Install a sample app template. More details: [Use sample app templates in Microsoft Teams](use-sample-apps.md).

> [!NOTE]
> - Sections of this article uses one of the available sample app templates as an example. The tables, controls, screens and other components of the apps may vary depending on the app you installed. Use discretion when customizing the app that you select.
> - Read [Sample app template updates](use-sample-apps.md#sample-app-template-updates) before you customize sample app templates to understand the impact of new releases to the sample app template versions.

## Open the sample app templates in Power Apps Studio

To start with customizing the sample app templates, the first step is to open the app inside Power Apps Studio.

1. Sign in to Teams.

1. Select ![More added apps.](media/more-added-apps-ellipsis.png "More added apps") (*More added apps*).

1. Select Power Apps.

    ![Select Power Apps app.](media/power-apps.png "Select Power Apps app")

1. Select [Build](overview-of-the-power-apps-app.md#build-hub) tab.

1. Select the team environment where you installed the sample app template.

1. Select **Installed apps**.

1. Select the sample app template that you installed.

1. If prompted, select the location.

More information: [Edit an app in Power Apps Studio](manage-your-apps.md#edit-an-app)

## Remove sample data

When you install sample app templates, the tables might be pre-populated with sample data. The following table lists the sample app templates and the list of tables with the sample data to be removed:

To remove data from the sample app templates:

1. Open the sample app template (for example, **Manage inspections**) in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select **Data** from the left pane.

1. Select ![Data - ellipsis.](media/customize-sample-apps/data-ellipsis.png "Data - ellipsis") next to the table name (for example, *Area Inspection Task* for **Manage inspections** app).

1. Select **Edit data**.

1. Delete all rows containing sample data.

    ![Delete rows.](media/customize-sample-apps/delete-rows.png "Delete rows")

1. Close the visual editor.

1. Repeat the previous steps for the remaining tables.

## Add your logo to the loading screen

1. Open the sample app template (for example, **Inspection**) in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select [Tree view](understand-power-apps-studio.md#tree-view) from the left pane.

1. If not already selected, select **Landing Screen**.

1. Select **Insert**.

1. Select **Image** control in *Media*.

    ![Add image.](media/customize-sample-apps/add-image.png "Add image")

1. From the properties pane on the right side, select the **Image** drop-down, and then select **+ Add an image file**.

    ![Add image file.](media/customize-sample-apps/add-image-file.png "Add image file")

1. Select image for your company logo, and then select **Open**.

1. Position and size image control to the position you want on loading screen.

    ![Company logo.](media/customize-sample-apps/company-logo.png "Company logo")

## Change the welcome screen text

> [!NOTE]
> The Inspection app welcome screen greeting text uses a formula containing global
variables to correctly display the desired terminology for inspections and items being inspected. Use caution when changing this formula.

1. Open the sample app template (for example, **Inspection**) in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select the text label control with the greeting text **Glad to have you here**.

    The formula for the greeting text is in this format:

    ```power-fx
    "Glad to have you here, we are ready for you to " & If(Lower(gblWorkType)="inspection", "inspect", Lower(gblWorkType)) & Switch(
    Left(
        Lower(areaLabel),
        1
    ),
    "a",
    " an ",
    "e",
    " an ",
    "i",
    " an ",
    "o",
    " an ",
    "u",
    " an ",
    " a "
    ) & Lower(areaLabel)
    ```

1. Select the formula bar.

1. Select the phrase **Glad to have you here**.

1. Update the greeting text, such as **We are happy that you are here**.

    ```power-fx
    "We are happy that you are here, we are ready for you to " & If(Lower(gblWorkType)="inspection", "inspect", Lower(gblWorkType)) & Switch(
    Left(
        Lower(areaLabel),
        1
    ),
    "a",
    " an ",
    "e",
    " an ",
    "i",
    " an ",
    "o",
    " an ",
    "u",
    " an ",
    " a "
    ) & Lower(areaLabel)
    ```

    ![Update greeting text in formula.](media/customize-sample-apps/update-greeting-text.png "Update greeting text in formula")

## Change the screen background color

> [!NOTE]
> The Inspection app leverages global theme variables to ensure consistent
user experience. If you modify a screen fill, the modified screen will no longer use the standard app theme.

1. Open the sample app template (for example, **Inspection**) in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select [Tree view](understand-power-apps-studio.md#tree-view) from the left pane.

1. Select **Welcome Screen** from Tree view.

1. Select [Fill](../maker/canvas-apps/controls/properties-color-border.md#normal) from the property list on the top-left.

1. In formula bar, replace the formula with the color that you want.

    Screen background fill color will be set to the selected background color.

    ![Change background color.](media/customize-sample-apps/change-background.png "Change background color")

## Bulk edit data

If you want to quickly edit the data in the app, you can open the table and modify or delete data.

> [!CAUTION]
> Sample app templates uses several related tables, such as Area Inspection Locations and Area Inspection Location Types for Inspection app. Use caution when deleting records from the tables without checking data relationship and dependencies.

1. Open the sample app template (for example, **Inspection**) in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select **Data** from the left pane.

1. Select ![Data - ellipsis.](media/customize-sample-apps/data-ellipsis.png "Data - ellipsis") next to the table name (for example, *Area Inspection Location Types* for Inspection app).

1. Select the cell inside the Visual Editor, for example **Food** in the **Name** column.

1. Replace the text with the value you want.

1. Close the visual editor.

    Data in the app should reflect the updated value, such as the location name in this example.

    ![Bulk edit data.](media/customize-sample-apps/update-table.png "Bulk edit data")

## Add a column to the app

> [!IMPORTANT]
> The Inspection app customization steps in this section covers some of the advanced configuration options. This example requires that you have familiarity with the [Power Apps Studio](understand-power-apps-studio.md), are comfortable with modifying [formulas](../maker/canvas-apps/formula-reference.md), and work with controls such as [containers](../maker/canvas-apps/controls/control-container.md).

Consider a scenario where you have multiple stores, and you want to associate locations and inspections with specific stores.

### Add Store Name text column to the Location table

1. Open the **Manage inspections** app in [Power Apps Studio](#open-the-sample-app-templates-in-power-apps-studio).

1. Select **Data** from the left pane.

1. Select ![Data - ellipsis.](media/customize-sample-apps/data-ellipsis.png "Data - ellipsis") next to the table name (for example, *Area Inspection Locations* for **Manage inspections** app).

1. Select **Add column**.

1. Enter **Name** as "Store Name".

1. Select **Create**.

1. Close the visual editor.

    ![Add Store Name column.](media/customize-sample-apps/add-store-name.png "Add Store Name column")

### Add Store Name column to the location form

1. Select the **Locations Screen**.

    > [!TIP]
    > You can ignore the error about the use of the preview connectors in this app.

1. In [Tree view](understand-power-apps-studio.md#tree-view), search for `btnArea_GroupedAreas`.

1. In the **Grouped Areas** on the form, drag the left edge to be parallel with the edge of the **Title** field.

    > [!NOTE]
    > The Grouped Areas field control is in a container. Hence, the
    selected area may appear in a different part of the screen than where you
    see the column. Dragging the selected area resizes the column.

1. Select **Insert** from the left pane.

1. Select **Label** control.

1. Position the **Label** so that it's aligned horizontally with **Grouped areas**, and vertically with the **Area type**.

    ![Label control position.](media/customize-sample-apps/label-control.png "Label control position")

1. Select **Text** from the property list on the top-left.

1. Select the formula bar.

1. Change the formula to **Store Name**.

1. Select **Insert** from the left pane.

1. Select **Text box** control.

1. Drag the text box control to be aligned horizontally with **Grouped area** and vertically with **Area type**.

1. Select **Value** from the property list on the top-left.

1. In the formula bar, replace the current value with `gblLocation.'Store Name'`

1. Select **ColorBackground** from the property list on the top-left.

1. In the formula bar, enter "White".

    ![ColorBackground property.](media/customize-sample-apps/colorbackground.png "ColorBackground property")

1. Select **Display mode** from the property list on the top-left.

1. In the formula bar, enter "Edit" if not already present.

1. Hold the **ALT key** on your keyboard, and select the **Edit**.

    ![Edit with alt key pressed.](media/customize-sample-apps/edit-alt-key.png "Edit with alt key pressed")

1. Select **Tree view** from the left pane.

1. Search for `btnAreaDetails_Save` and select the returned control.

1. Expand the formula bar.

1. At the end of the 17th line, add a comma and this formula:

    ```power-fx
    'Store Name':Microsoft_CoreControls_TextBox1.Value
    ```

    This section of the formula should now look like the following:

    ```power-fx
    {
    	msft_name: txtArea_EditTitle.Text,
    	'Location Type': cmbAreaDetails_AreaType.Selected,
    	'Primary Image': picArea_UploadedImage.Image, 'Store Name':Microsoft_CoreControls_TextBox1.Value
    }
    ```

    > [!NOTE]
    > If the updated formula shows error, verify the text box name for the store name. For example, it may be `Microsoft_CoreControls_TextBox2` instead of `Microsoft_CoreControls_TextBox1`, depending on your changes.

1. Select the label control added in step 5.

1. Select the **Y** property from the property list on the top-left.

1. Select the formula bar.

1. Change the formula to: 

    ```power-fx
    If(gblEditLocation,250,200)
    ```    

1. Select text box added in step 11.

1. Select the **Y** property from the property list on the top-left.

1. Select the formula bar.

1. Change the formula to: 

    ```power-fx
    If(gblEditLocation,282,232)
    ```    

1. Hold the **CTRL key** on your keyboard, and select both the store name label and the text box.

1. Select Visible property from the property list on the top-left.

1. Select the formula bar.

1. Change the formula to: 

    ```power-fx
    If(gblViewInspection, false, true)
    ```

    ![Position changes with property Y.](media/customize-sample-apps/position-changes.png "Position changes with property Y")

## Publish app updates to Teams

To save and publish the changes to the sample app:

1. Select **Save** from the top-right.

1. Select **Publish to Teams**

1. Select **Next**.

1. To publish updated version of an app to an existing active tab, select **Save + close**. <br> 
To add published version of an app to a new tab in a different channel, Select ![Add a tab.](media/publish-app-9.png) (Add a tab) for the channel you want, and then select **Save + close**.

More information: [Publish and add an app to Teams](publish-and-share-apps.md)

---

## Localize sample app templates

Source: [localizing-sample-apps.md](https://learn.microsoft.com/en-us/power-apps/teams/localizing-sample-apps)

*Learn how to add extra localizations to the sample for Microsoft Teams.*

# Localize sample app templates

The sample app templates for Microsoft Teams have been localized to support eight different languages so that they can be used by people with different languages. Depending on the user’s language, you can see the text in an app in the appropriate language, if that language has been included in the app localization.

For example, consider that you use the Russian language. Russian isn't a language included in the standard localization; however, you can still use the app in Russian&mdash;if you add that language and localize the app labels.

This article covers the approach used for localization of the sample app templates for Teams, and how to extend it to add support for another language (such as Russian). In this example, we'll use the [Milestones app](milestones.md); but this same approach is used consistently across all of the Teams template Power Apps, and you can follow the same approach for localization of your own canvas apps.

Watch this video to learn how to localize sample app templates:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=2b55d792-7cde-4948-9072-5d38d33e844f]

## Prerequisites

To complete this lesson, we'd need the ability to create Power Apps within Teams, which is available as part of select Microsoft 365 subscriptions.

## Understanding localization in Power Apps

In canvas apps, text labels and other visual text components can be localized by loading a static Excel data source to your app containing the localized value for each text string in each language. For more information about this process, see [Language function](../maker/canvas-apps/functions/function-language.md).

For example, Milestones app contains an Excel data source called **StaticLocalizationsjon** with three columns&mdash;"OOBTextID", "LanguageTag", and "LocalizedText".

-   **OOBTextID** is the identifier of the text that is to be localized.

-   **LanguageTag** is the identifier of the language in which the text is to be localized. Language tag is a standard abbreviated text defining a language and the country/region its being used in (for example, "en-US" means "English-United States").

-   **LocalizedText** is the text in the appropriate language that needs to be displayed.

Here's an example with localized text for each text ID.

| **OOBTextID**                         | **LanguageTag** | **LocalizedText**                     |
|---------------------------------------|-----------------|---------------------------------------|
| lblLoadingText\_AppLoading\_\_locText | en-US           | Getting things ready ...              |
| lblLoadingText\_AppLoading\_\_locText | de-DE           | Dinge fertig machen ...               |
| lblLoadingText\_AppLoading\_\_locText | es-ES           | Preparando las cosas ...              |
| lblLoadingText\_AppLoading\_\_locText | fr-FR           | Préparer les choses ...               |
| lblLoadingText\_AppLoading\_\_locText | it-IT           | Preparare le cose ...                 |
| lblLoadingText\_AppLoading\_\_locText | ja-JP           | 準備をする..。                        |
| lblLoadingText\_AppLoading\_\_locText | nl-NL           | Dingen klaarmaken ...                 |
| lblLoadingText\_AppLoading\_\_locText | pt-BR           | Preparando as coisas ...              |
| lblLoadingText\_AppName\_\_locText    | en-US           | Milestones                            |
| lblLoadingText\_AppName\_\_locText    | de-DE           | Meilensteine                          |
| lblLoadingText\_AppName\_\_locText    | es-ES           | Hitos                                 |
| lblLoadingText\_AppName\_\_locText    | fr-FR           | Jalons                                |
| lblLoadingText\_AppName\_\_locText    | it-IT           | Passaggi fondamentali                 |
| lblLoadingText\_AppName\_\_locText    | ja-JP           | マイルストーン                        |
| lblLoadingText\_AppName\_\_locText    | nl-NL           | Mijlpalen                             |
| lblLoadingText\_AppName\_\_locText    | pt-BR           | Etapas                                |
| lblLoadingText\_BuiltWith\_\_locText  | en-US           | Built with Microsoft Power Platform   |
| lblLoadingText\_BuiltWith\_\_locText  | de-DE           | Erstellt mit Microsoft Power Platform |
| lblLoadingText\_BuiltWith\_\_locText  | es-ES           | Creada con Microsoft Power Platform   |
| lblLoadingText\_BuiltWith\_\_locText  | fr-FR           | Créé avec Microsoft Power Platform    |
| lblLoadingText\_BuiltWith\_\_locText  | it-IT           | Creata con Microsoft Power Platform   |
| lblLoadingText\_BuiltWith\_\_locText  | ja-JP           | Microsoft Power Platform でビルド     |
| lblLoadingText\_BuiltWith\_\_locText  | nl-NL           | Gebouwd met Microsoft Power Platform  |
| lblLoadingText\_BuiltWith\_\_locText  | pt-BR           | Criado com o Microsoft Power Platform |

> [!NOTE]
> The above table is from the master file that contains localized text for all the screens in the app. However, it's been filtered to show only the rows relevant to earlier discussions.

## How to use Excel as a static data source in your app

Static data is data loaded into Power Apps from Excel. This data isn't editable in the app. If you want to add a static data source to your app, perform the following steps.

1. In Teams, right-click on **Power Apps**, and pop out the app.

1. Select the **Build** tab.

1. Open the desired app to edit in Studio. In this example, we'll use **Milestones** app.

1. Select the **Data** tab.

1. Select **Add data**.

    ![Add data connection](media/localizing-sample-apps/add-data.png "Add data connection")

1. Select **Connectors**.

1. Select **See all connectors**.

    ![Display all connectors](media/localizing-sample-apps/see-all-connectors.png "Display all connectors")

1. Select **Import from Excel**.

1. Select the **LocalizationMilestones_AllLanguages** file, and select **Open**.

1. On the right of the screen, you're asked to choose a table. Select the table **staticLocalizations**, and select **Connect**. The table gets added as a data source and can be used in the app.

    ![Statis localization connection](media/localizing-sample-apps/static-localization.png "Static localization connection")

## Adding a new language to your app

Now that you understand how localization is handled in Power Apps, if you want to add an additional language to the app, you don’t have to update every text control in the app. The text formulas are built to dynamically display the appropriate localized copy of text strings based on the user’s language.

To add Russian, you would first add Russian translation to the spreadsheet for each **OOBTextID**. In this example, we'll show how we can add localized text for the text on the first page of the app.

1. Open **LocalizationMilestoes_AllLanguages.xlsx** file.

1. Add the following rows to the Excel:

    | OOBTextID                             | LanguageTag | LocalizedText                                 |
    |---------------------------------------|-------------|-----------------------------------------------|
    | lblLoadingText\_AppName\_\_locText    | ru-RU       | Вехи                                          |
    | lblLoadingText\_BuiltWith\_\_locText  | ru-RU       | Создано на платформе Microsoft Power Platform |
    | lblLoadingText\_AppLoading\_\_locText | ru-RU       | Готовимся ...                                 |

1. To add Russian text for all pages, we'd have to add rows for all the OOBTextIDs as they exist for any other language, then add **ru-RU** as the Language tag. and then add the Russian translation for each of those OOBTextIDs.

1. Save Excel file.

    > [!NOTE]
    > Since the Excel file already exists as a data source in the data sources list for the app, we'll have to remove the excel from the list of data sources and then readd it as shown above.

1. Update the app OnStart function **gblUserLanguage** to include the language that you added to the Excel file. In the example below we've added Russian:

    ```power-fx
    //user language
    Set(gblUserLanguage,Switch(Left(Language(),2),"de","de-DE","en","en-US","es","es-ES","fr","fr-FR","it","it-IT","ja","ja-JP","nl","nl-NL",
    "pt","pt-BR","ru-RU",
    //default
    "en-US"));
    //build localization collection, with user's language
    ClearCollect(colLocalization,Filter(staticLocalizations,LanguageTag = gblUserLanguage));Collect(colLocalization,Filter(staticLocalizationsNewMessages,LanguageTag = gblUserLanguage));
    ```

1. Save and publish the app.

Since the formulas dynamically retrieve the localized content, there's no need to update the formulas to reflect the newly added language.

## Adding and localizing a new label

As an extension to the default Milestones app, we'll add a new label and learn how to localize it.
Let us add a label to the Loading screen:

1. Select **Insert**, and select label control.

    ![Insert a label](media/localizing-sample-apps/insert-label.png "Insert a label").

1. Update the Text and properties of the label.

    ![Welcome to app](media/localizing-sample-apps/welcome-to-the-app.png "Welcome to app")

    For now, we'll set the text to "Welcome to the app" until it's ready for localization.

1. Open the Excel file to add rows for this text.

1. Create eight rows in the Excel file with **OOBTextID** value **lblLoadingText_Welcome_locText**, and **LanguageTag** for the 8 rows:

    | en-US |
    |-------|
    | de-DE |
    | es-ES |
    | fr-FR |
    | it-IT |
    | ja-JP |
    | nl-NL |
    | pt-BR |

1. For the third column&mdash;**LocalizedText**, translate the text "Welcome to the app" in the 8 different languages:

    - en-US (US English)
    - de-DE (German)
    - es-ES (Spanish)
    - fr-FR (French)
    - it-IT (Italian)
    - ja-JP (Japanese)
    - nl-NL (Dutch)
    - pt-BR (Portuguese)

1. Update the spreadsheet with all the translated text as shown below.

    ![Component localization file](media/localizing-sample-apps/localization-file.png "Component localization file")

1. Save the spreadsheet.

1. Go back to the app editor in Teams.

1. To refresh the Excel data source (since we updated it), select **Data** > **...** (ellipsis), and then select **Remove** next to the **staticLocalizations** Excel spreadsheet.

    ![Remove staticLocalizations](media/localizing-sample-apps/static-localization-remove.png "Display all connectors")

    Removing the table will cause some errors in the app. However, we'll readd the updated Excel file in the next steps.

1. Readd the spreadsheet as a connector, and select **staticLocalizations** table as the data source (make sure to select the correct excel file that was updated).

1. Select the label with the text "Welcome to the app".

1. Open the **Text** property of the label and paste the following formula:

   ```power-fx
   With({varDefault: "Welcome to the app", varOOBTextId: "lblLoadingText_Welcome_locText"}, With({varLocalizedText: LookUp(colLocalization;OOBTextID = varOOBTextId, LocalizedText)}, Coalesce(varLocalizedText;varDefault)))
   ```

1. To test the localization of the label we created, change the language of our user in Teams to one of the languages that is in our localization Excel spreadsheet. You can change your Teams language by selecting your photo in the upper-right corner, and then selecting settings.

1. Select Milestones to open the app and the **Welcome to the app** label has been localized to the language that was selected in the previous step. You can verify the same by going to the specific Team channel where the app was installed and playing the published app.

---

## Theming in sample app templates

Source: [sample-app-theming.md](https://learn.microsoft.com/en-us/power-apps/teams/sample-app-theming)

*Learn how to theming formulas in the template Power Apps for Microsoft Teams.*

# Theming in sample app templates

The most attractive feature about canvas apps is the ability to customize the user interface per the user or organization’s branding and liking. Theming strategy provides us with the ability to create apps that match the organizational brand. A **theme** contains a collection of styles that define multiple design properties for controls and components such as colors, fonts, and borders.

In this article, we'll learn how to use global variables to define themes, and how the colors and properties can be easily changed throughout the app by just updating the global variables.

Watch this video to learn about theming in sample app templates:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=c8ddd966-a7fc-431b-8b2c-375e85b862ba]

## Prerequisites

To complete this lesson, we'd need the ability to create apps within Microsoft Teams that will be available as part of select Microsoft 365 subscriptions. You'll also need the Milestones sample app template for Microsoft Teams installed in your Team. You can install it in your team at <https://aka.ms/TeamsMilestones>.

## Defining the theming strategy

In this example, we'll see how global variables have been used to define colors and styles for theming in the Milestones app. The following global variables have been defined in the **OnVisible** property of the **Loading screen**.

- **gblAppColors** to define colors so they can be referenced easily
- **gblAppSizes** to define different sizes of fonts for mobile and web apps
- **gblAppStyles** properties of every single control using **gblAppColors**
- **gblThemeDark** set to true when the Teams theme is dark so all controls adapt to the dark theme
- **gblThemeHiCo** set to true when the Teams theme is high contrast so all controls adapt to the high contrast high contrast

## Testing the theming Strategy

Two hidden screens have been defined for testing the theming strategy:

- Hidden Admin Screen – This screen has two toggles defined  **tglAdmin_DarkMode** and **tglAdmin_ContrastMode**. This screen helps with quick testing of dark and contrast modes without having to  change the theme of teams for testing

    ![The hidden admin screen](media/sample-app-theming/hidden-admin-screen.png "The hidden admin screen")

- Hidden Controls Screen – This screen has every single control with properties set using gblAppStyles.

    - Helps in testing out theme changes.
    - Helps in copying a particular control and pasting it on the required screen so that the formula for the control doesn't need to be typed repeatedly.
    
      ![The hidden control screen](media/sample-app-theming/hidden-control-screen.png "The hidden control screen")

## Using the theming variables for a sample app templates

1. To understand the usage of theming in the Milestones app, select  **Projects Screen** in the Tree view to open the screen and then select **+New Project**.

1. Select the **Color** property of **+New Project**.

    Notice that the formula references **gblAppStyles** > **ButtonTransparent** > **Color** formula from the **OnVisible** property of the Loading screen.

    So now, if the theme of the app is High Contrast, then the color defined in **gblAppColors** > **HighContrastHyperlinks** formula will be used.

1. Another example would be to look at the Primary and Secondary buttons.

    - Select the Project Screen in the editor.

    - Hold down the Alt key and select the Filter icon on the Projects Screen.

        The Filter work items pop-up opens up. Notice the two buttons: **Clear** and **Apply**.

      ![Clear and apply buttons](media/sample-app-theming/clear-apply.png "Clear and apply buttons")

      **Apply** is an example of a primary button and **Clear** is an example of a secondary button.

1. Select the **Apply** button, and select any Border/Thickness/Color related property and notice the formula defined.

    ![Select a color property](media/sample-app-theming/color-property.png "Select a color property")

1. The **Apply** button is defined as the Primary button and uses all the properties defined on **Loading Screen** > **OnVisible**> **ButtonPrimary** formula.

    Depending on the theme and color variables selected in the ButtonPrimary formula, the styling properties of the button will get updated.

    Similarly, **Clear** is defined as a Secondary button and uses all properties defined under **gblAppStyles** > **ButtonSecondary**.

    > [!NOTE]
    > Another possible extension to the app would be to add Font as a Property, either as one variable to be used across all controls, or once per control (like how the other styling properties are defined separately for primary buttons, or secondary buttons). The font throughout the Milestones app is Segoe UI and there was no need identified for theming of the font.

## Updating the theme in the sample app template

In this section, we'll see how we can change a property of a particular control and how the control gets updated across various screens. In our example, we'll update the Fill property of the Primary button and see how the button color changes in the Dark mode, and the Default mode.

1. Go to the **Loading Screen** and select the OnVisible property in the dropdown.

1. Expand the formula bar and scroll down to the **ButtonPrimary** > **Fill** function.

1. Update the last two parameters to Red and DarkRed.

   ![Update fill property](media/sample-app-theming/red-green.png "Update fill property")

1. Go to another screen and then back to Loading Screen for the **OnVisible** function to run.

1. Go to the **Projects** screen, select the **Filter** button to open the Filter pop-up and notice the color of the Apply button is now DarkRed.

   ![Apply button is now DarkRed](media/sample-app-theming/dark-red.png "Apply button is now DarkRed")

1. Go to the **Hidden Admin Screen**, hold **Alt** key on the keyboard, and select the **Dark Mode On** toggle.

   ![Toggle dark mode](media/sample-app-theming/dark-mode-toggle.png "Toggle dark mode")

1. Go to the Loading Screen again for the function to load and then come back to the Projects screen. Notice the screen is now in dark mode (with the  background dark), and the Apply button color has now changed to **Red**.

   ![Red button and dark mode](media/sample-app-theming/dark-mode.png "Red button and dark mode")

1. Similarly, changing properties of the **SecondaryButton** would have changed colors for the secondary button, such as the **Clear** button.

    > [!NOTE]
    > Updating the fill function directly is a quick way of testing theming as shown earlier. If the color needs to be changed for not just the Primary Button control but for all other controls where it is being used as well, then the color palette under the variable gblAppColors should be updated with the formula of the desired colors and names that makes the most sense to your organization. For example,`companynameDefaultHeader: ColorValue("#30D5C8")` would be the formula for turquoise blue.

---

## Granting permission to tables in Dataverse for Microsoft Teams | Microsoft Docs

Source: [dataverse-for-teams-table-permissions.md](https://learn.microsoft.com/en-us/power-apps/teams/dataverse-for-teams-table-permissions)

*Learn about managing table permissions in Dataverse for Teams while building apps.*

# Granting permission to tables in Dataverse for Microsoft Teams

When building Power Apps, one important consideration is data security. Your apps drive important business processes, and if users can see sensitive data or delete records that they shouldn't have access to, it can disrupt your business.

For example, if you've an app with sensitive customer data, unauthorized access to the data could put your company at risk of compliance with privacy laws.

You may think "I'll just obscure access to sensitive data in my app!" However, if the underlying data source is shared with users, they can still get to the data, or build new apps on the data source, giving them access to the restricted records.

One of the advantages of building Power Apps in Teams with Dataverse for Teams is that it provides the ability to set the table permissions to your specific business needs that map the security roles in Teams&mdash;such as Owners, Members, Guests, and App Users.

For example, if there's a table that the users should only be able to modify for the records that they own, Dataverse for Teams offers a table permission called **Collaborate** that gives users the ability to only edit records that they own. In this article, we'll review the table permissions in Dataverse for Teams, and learn about how you can use them to secure your important business applications.

> [!NOTE]
> Only team owners have the ability to edit table permissions currently.

Watch this video to learn how to configure table permissions:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=23f33cc0-7db3-40fc-85e9-d6c3057b2489]

## Understanding team roles

Permission to apps and the data that they use in Teams are based on the following roles in Teams team.

- **Owner** - A team member with the owner role. This includes the creator of the team, and anyone who has been given the owner role by another users. Owners get full access to the data used in apps in the team.
- **Member** - A team member who isn't an owner. By default, team members get full access like owners, but you can also change the permission for team members. You might want to restrict members from being able to edit certain tables. 
- **Guest** - A guest is someone outside of your organization who is added to the team. By default, guests can create records, but not view records created by others.
- **Colleagues with access**: With Power Apps for Teams, you can share an app with Azure AD security group whose members need not be part of the Teams team where the app was built. This enables you to add users to the application without having to add them to the specific team, and opens up “Broad Distribution” scenarios. For example, you may want to build an app that is enabled for every accountant in the organization, or even every employee in that organization.

## Understanding table permissions

When assigning security to a table, the following are the permissions that you can assign:

- **Full Access** – Allows end users to see and edit all records in the table.
- **Collaborate** – Allows end users to see all records and create new records. But they can only edit or delete their own records. An example for when you want to use collaborate is "up votes" in the Ideas the Perspectives app. You want each user of the app to view the up-votes of other users. But they shouldn't be able to change the votes for any users other than their own.
- **Reference** – Provides a read-only view of data. Users can't create, edit, or delete any records. An example is in Bulletins app&mdash;if you want users to read bulletin records but not edit them, you'd give them **Reference** permission on the **Bulletin** table.
- **Private** – Users can create new records. Additionally, they can view, edit, or delete their own records only. An example is in the Issue reporting app&mdash;if you want users to only be able to create and see their own issue records in Dataverse, you'd give them **Private** permission on the **Issue Report** table.

## Table permissions in real-world scenario

Let’s take a look at how table permissions work in practice. We'll create a table, and then show what two different users see.

> [!NOTE]
> To complete this part of the lesson, you'll need an environment with two user logins. One of them having the team owner role and another with team member (a member of the team but not granted owner role)

1. Sign in to Teams as the Team owner.
1. Create an app and the table in team with a Dataverse for Teams database.
1. Right-click on the Power Apps icon and pop out the app.
1. Create a new app.
    1. App name: "Vehicle Manager"
    1. Select **Create new table** and name it "Vehicle".
    1. Add columns: "Make", "Model", "Year Manufactured".
    1. Select **Show/hide columns**.
    1. From Show/hide column dialog, select the **Owner** field and select **Save**.

    ![Showing columns](media/granting-permissions-to-tables-in-dataverse-for-teams/seeing-them-in-practice-1.png "Showing columns")

    Your table should now look like this:

    ![View vehicle table](media/granting-permissions-to-tables-in-dataverse-for-teams/seeing-them-in-practice-2.png "View vehicle table")

1. Add a record to the table:
    1. Select **Add row**.
    1. Enter record details.
    1. The owner field of the created record will reflect your logged-in user account.

1. Select the area outside of the table definition screen to return to the app.

1. Save and Publish the app. You'll need to select a channel in which the app will be displayed&mdash;select **+** next to the desired channel name to select the channel.

### Configure and verify table permissions

We're going to set the permissions for the vehicles table for Team members:

1. In Teams, open the **Power Apps** app. Right-click on the Power Apps icon in Teams, and select **Pop out app**. This will pop out the app in a new window, so if you move somewhere else in Teams, you won’t lose your changes.

1. Select the **Build** tab.

1. Select the team that contains the Vehicle Manager app.

1. In the **Items created for…** area, select **See all**.

1. Select **Tables** from the solution components bar.

1. Select the Vehicle table and then select **Manage permissions**.

1. Select the **Member** node. The initial permission will show Full access. Select the permission **Private** and select **Save**.

    ![Manage table permissions](media/granting-permissions-to-tables-in-dataverse-for-teams/seeing-them-in-practice-3.png "Manage table permissions")

Next, we'll log in to Teams as a user who is a non-owner Team member to observe their experience.

1. Log into Teams using a user who is a member of the team in which the app is installed.
1. Select the channel where the app is installed.
1. Select the tab for the Vehicle Manager app.
1. The app should open for the user, but no records will show in the gallery, as the user only has visibility to their own records.
1. Select **New record** to create a new vehicle record, select the check mark to save the record.
1. You should now see one record in the gallery.

Log out of Teams and log back in as the Team owner. We'll now go to the table and see the created data.

1. Log in to Teams using the Team owner personal.
1. Right-click on the Power Apps icon and pop out the app.
1. Select the **Build** tab.
1. Select the team in which the Vehicle Manager app is installed
1. Select the Vehicle table
1. Select **Edit**.
1. You'll now see two records in the Vehicle table, each with a different owner.

    ![View table records](media/granting-permissions-to-tables-in-dataverse-for-teams/seeing-them-in-practice-4.png "View table records")

So how would this apply to one of the sample app templates for Teams?

For example, with Bulletins we might set the following permissions for the tables in the app:

| Table                        | Permission  | Reason                                                                                                                      |
|------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| Bulletin                     | Reference   | Users should read all bulletins, but not edit or create bulletins.                                                          |
| Bulletin Bookmark            | Private     | Users should create their own bulletins, but not view or edit other users’ bookmarks.                                       |
| Bulletin Category            | Reference   | Users should read all categories but not edit or create categories.                                                         |
| Bulletin Category Preference | Private     | Users should create their own category preferences but shouldn't be able to read or edit other users category preferences. |
| Bulletin Contact             | Reference   | Users should read all contact records but not create or edit contacts.                                                      |
| Bulletin FAQ                 | Reference   | Users should read all FAQ records but not create or edit existing FAQ records.                                              |
| Bulletin FAQ Category        | Reference   | Users should read all FAQ categories but not create or edit existing FAQ records                                            |
| Bulletin Link                | Reference   | Users should read all links but not create or edit existing link records.                                                   |
| Bulletin Link Category       | Reference   | Users should read all link categories but not create or edit existing link categories.                                      |
| Bulletin Read Receipts       | Private     | Users should be able to create new read receipts when they view a bulletin, but not read or edit other users read receipts. |
| Bulletin User Settings       | Private     | Users should be able to create new user setting records but not read or edit other users setting records.                   |

## What permissions should I share?

Before assigning permissions, you should plan your security based on the personas of users of your app. Who will administer the app? Who will use the app? How will they use it?

For example, the Inspection sample app template for Teams is designed to address the following personas:

- **Inspection manager** - Creates Inspection forms and manages the list of locations or assets.
- **Inspection reviewer** - Reviews inspection data and approves inspections.
- **Inspection User** - Completes the inspections.

Once we have the personas defined, relate these personas to the team role to which they should be assigned:

- **Inspection manager** - Since inspection managers will need full access to create inspection forms and other system table records, we'll make them owners in the team.
- **Inspection reviewer** - Since inspection reviewers should be able to edit all inspections, but they won't create inspection forms, we'll make them team members. This will enable us to give them reference access to the Area **Inspection Checklist** table (where inspection form data is stored), but full access to **Area Inspection** table (where inspection records are stored).
- **Inspection user** - Inspection users should only be able to submit new inspections, but not create new inspection forms or see other user’s inspections. So we won't make them members of the team in which the app is installed&mdash;we'll share the app with them as colleagues, and give them **Reference** permission to **Area Inspection Checklist** and **Private** permission to **Area Inspection**. This will allow users to view inspection forms and create their own inspection records.

For more details about the recommended table permissions for the sample app templates for Teams, see articles about deploying sample app templates broadly, such as [Deploy Profile + as broad distribution app](deploy-profile-plus-broad-distribution.md).

---

## Frequently Asked Questions (FAQs) and answers when using sample app templates | Microsoft Docs

Source: [sample-apps-faqs.md](https://learn.microsoft.com/en-us/power-apps/teams/sample-apps-faqs)

*Learn about the Frequently Asked Questions (FAQs) and answers when using sample app templates.*

# Frequently Asked Questions (FAQs) for sample app templates

In this article, learn about the frequently asked questions and the answers about using the sample app templates.

> [!IMPORTANT]
> For any issues, feedback, support, or changes related to sample app templates, go to https://github.com/microsoft/teams-powerapps-app-templates/issues and submit an issue or a pull request.

## When I try to install a sample app template, I get an error that the app is already in the team.

You may see the following error when you try to install a sample app template in a team that already has the app installed, but you’re not the app owner, or the team owner.

`This app is already in this team` <br>
`To update it, you must be its owner or a team owner.`

When this happens, use the installed app, or install the app in a different team.

## How can I move an app to another channel in the same Team?

For the steps to move an app, go to [Move an app to another Teams channel in the same team](publish-and-share-apps.md#move-an-app-to-another-teams-channel-in-the-same-team).

## How do I delete the sample data from the sample app templates?

For the steps to delete sample data from the sample app templates, go to [Remove sample data](customize-sample-apps.md#remove-sample-data).

## Planner tasks are created with “Former Member” instead of the name of the assigned user

When you assign a task in the Issue reporting, or Inspection apps who isn't a member of the Teams team, the user's name on the task will show as "Former member".
To correctly display the user's name, add the user to the Team where the app is installed.

![Former member.](media\sample-apps-faqs\former-member.png "Former member")

## Why can't I create tasks in Inspection app?

If a user isn't allowed to create tasks using a mobile device in the Inspection app:

1. Open **Manage inspections** in Power Apps Studio.

1. Select **Settings**.

1. In the Planner drop-down, select the Planner that you want to use.

1. **Save**

## Inspection app forms are slow

If your inspection forms are loading slowly, reduce the size of images used in the inspection steps. Users can't interact with the form before all images on the form are loaded.

---

## Known issues and limitations for Dataverse for Teams | Microsoft Docs

Source: [known-issues-limitations.md](https://learn.microsoft.com/en-us/power-apps/teams/known-issues-limitations)

*Provides an overview of known issues and limitations when using Power Apps with Microsoft Teams.*

# Known issues and limitations

This article provides details about the known issues and limitations when using [**Dataverse for Teams environments**](/power-platform/admin/about-teams-environment).

## Additional components

The following components aren't supported:

- Model-driven apps
- AI Builder
- Code apps

> [!NOTE]
> Custom connectors are supported only if both of these conditions are met:
> - The app or flow is running in the context of Microsoft Teams.
> - And, the custom connector points at an APIM endpoint in Azure. 

## Controls

To learn about the limitations of controls in Dataverse for Teams environments, go to [Limitations of controls in Power Apps](../maker/canvas-apps/control-limitations.md).

## Region availability

Dataverse for Teams currently isn't available in:

- Power Apps operated by 21Vianet in China

## Hidden membership groups

Dataverse for Teams doesn't support [hidden membership groups](/graph/api/resources/group?preserve-view=true&view=graph-rest-1.0#group-visibility-options). You'll receive the following error when you try to create an app in a team that has the group visibility set to *Hiddenmembership*.

`Existing limits on this team` <br>
`You're unable to continue due to an administrative setting on this team. You can try again with another team.`

The group may have hidden membership enabled by your administrator. Try using Dataverse for Teams on a new Teams team, an existing team that doesn't have hidden membership enabled, or contact your administrator.

## Localization

Localization of [Power Apps Studio](understand-power-apps-studio.md) isn't supported.

## Power Apps component framework

[Power Apps component framework](/powerapps/developer/component-framework/overview) isn't supported.

## Required fields

There's no enforcement of user-created required table fields. Rows that have empty values in those fields can be saved successfully. System required fields are enforced and cannot be saved without a value.

## Studio

### Classic controls

Enabling [classic controls](understand-power-apps-studio.md#classic-controls) requires a refresh of Power Apps Studio.  

### Fluent UI date picker control

The Fluent UI date picker control doesn't yet support format string.  If you need to support special formatting, you'll need to enable classic controls and use the classic Date Picker.

### Canvas components

You may see red errors while using the modern controls in canvas components. These errors won't functionally impact your app, and you can ignore them.

![Canvas components.](media/canvas-components.png "Canvas components")

### New connections

Connections in the Power Apps Studio that require an authentication dialog fails in the [Teams desktop client](/microsoftteams/get-clients#desktop-client). Open the Studio in the [Teams web client](/microsoftteams/get-clients#web-client) to add these connectors.

### Studio and visual editor synchronization

Power Apps Studio doesn't reflect the changes to tables after:

1. Renaming tables.
1. Adding relationships within the inline [visual editor](understand-power-apps-studio.md#visual-editor).

To see the new changes, refresh Power Apps Studio.

### Studio version

It's currently not possible to change your Studio version.

### Visual editor

Currency, Duration, Language, Ticker, and Timezone fields can't be added using visual editor. To create these fields, use the experience to work with tables as available using [solution explorer](create-table.md).

## Load time limit

Apps embedded in Teams are required to load within 30 seconds as per Teams requirements. If an app exceeds this 30 seconds limit, Teams assumes that the app has timed-out, and will display an error screen. If your app is encountering this 30 second timeout, review [tips to improve performance](../maker/canvas-apps/performance-tips.md) for boosting your app’s performance.

## Theme

Power Apps Studio and apps currently don't support **Dark theme**.

## Others

-	If a user is an owner of the Azure Active Directory (Azure AD) group associated with a team but isn't also a member of that group, they may not be able to see that team in the Power Apps and Microsoft Copilot Studio apps.

-	It may take up to 2 hours for deleting, renaming, or restoring a team to reflect correctly within the Power Apps and Microsoft Copilot Studio apps.

-	It may take up to 15 minutes for new team users to be able to see the team within the Power Apps and Microsoft Copilot Studio apps.

- Users with the **Teams Guest** role con't trigger flows embedded in canvas apps.

---

## Migrate Microsoft Access data to Microsoft Dataverse for Teams | Microsoft Docs

Source: [migrate-access-to-dvft.md](https://learn.microsoft.com/en-us/power-apps/teams/migrate-access-to-dvft)

*You can migrate your Microsoft Access data to Microsoft Dataverse for Teams*

# Migrate Microsoft Access data to Microsoft Dataverse for Teams (preview)

[This topic is pre-release documentation and is subject to change.]

Microsoft Access users can now choose to migrate their data into Dataverse or Dataverse for Teams to make use of Azure Cloud security and Power Platform functionality. Migrating Access data to Dataverse provides many new opportunities for interaction and management of data.

Watch this short video about migrating Access data to Dataverse for Teams.
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=de255c2b-7a20-47a7-a7fe-f0cbdf19ee99]

## Next steps

- [Migrate Microsoft Access data to Microsoft Dataverse (preview)](../maker/data-platform/migrate-access-to-dataverse.md)
- [Data types and sizes for Access data migration to Dataverse (preview)](../maker/data-platform/migrate-access-datatypes.md)
- [System columns and tables in Dataverse and Dataverse for Teams (preview)](../maker/data-platform/access-migrate-linked-tables.md)

---

