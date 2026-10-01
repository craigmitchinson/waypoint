# Power Apps Canvas Apps — Preview, Publish, Share, Manage & Test

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 18

## Contents

1. [Preview your canvas apps](#preview-your-canvas-apps)
2. [Save and publish canvas apps](#save-and-publish-canvas-apps)
3. [Share a canvas app with your organization](#share-a-canvas-app-with-your-organization)
4. [Share a canvas app with guest users](#share-a-canvas-app-with-guest-users)
5. [Share Excel files used by an app](#share-excel-files-used-by-an-app)
6. [Share resources used by canvas apps](#share-resources-used-by-canvas-apps)
7. [Change app name and icon for canvas apps](#change-app-name-and-icon-for-canvas-apps)
8. [Edit a canvas app](#edit-a-canvas-app)
9. [Overview of exporting and importing canvas apps](#overview-of-exporting-and-importing-canvas-apps)
10. [Export and import canvas apps as a package](#export-and-import-canvas-apps-as-a-package)
11. [Export and import a canvas app as a single app file](#export-and-import-a-canvas-app-as-a-single-app-file)
12. [Delete a canvas app](#delete-a-canvas-app)
13. [How to check license designation for an app](#how-to-check-license-designation-for-an-app)
14. [Restore your canvas app to a previous version](#restore-your-canvas-app-to-a-previous-version)
15. [Test Studio](#test-studio)
16. [Working with Test Studio](#working-with-test-studio)
17. [Automate tests with Azure Pipelines using classic editor](#automate-tests-with-azure-pipelines-using-classic-editor)
18. [Automate tests with Azure Pipelines using YAML](#automate-tests-with-azure-pipelines-using-yaml)

---

## Preview your canvas apps

Source: [preview-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/preview-app)

*Preview your app in Power Apps Studio to see how the app will look for your app users.*

# Preview an app

When you create an app, it's helpful to preview your app and see how it will look for your users. Use the preview app feature to see how your app appears on various devices and in different sizes. Previewing an app is especially beneficial when you're building a responsive app.

To preview an app, open the app for editing in [Power Apps Studio](https://create.powerapps.com), in the actions menu, select ![Preview button.](media/studio/preview-button.png)
**Preview the app**.

Use the preview options to see how your app looks on different devices using the device picker. 

> [!div class="mx-imgBorder"] 
> ![Preview your app.](media/studio/preview-app.png)

Legend: 
1. **Tablet Devices**: Allows you to select from common tablet devices from several manufacturers, along with the ability to select a custom size based on your needs. This option shows a device frame and device safe zone, which is shown as the black area either on the top and bottom or sides depending on the orientation of the device. It also shows a black area with the home bar at the bottom.  
2. **Mobile devices**: Lets you select from common phones from different manufacturers, along with the ability to select a custom size based on your needs. This option shows a device frame and device safe zone, which is shown as the black area either on the top and bottom or sides depending on the orientation of the device. It also shows a black area with the home bar at the bottom. 
3. **Web view**: See how your app looks like on a web browser. You can select a window size to fill the browser window, or you can select canvas size to see how the app looks while authoring without leaving the preview.
4. **Orientation Switcher**: Switch between vertical and horizontal orientation. The **Orientation Switcher** option is disabled if the **Lock Orientation** setting turned on. 

If you're developing a responsive app, the content within the app adjusts to fit the screen size of the device being used.

Watch this video to learn how the device picker helps you confirm that your app is adjusting correctly.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=6fb4ee34-2393-4bf2-b3b9-749b8a7cd257]

## Display settings

The way your app behaves with each preview option is determined by app type and your display settings. 

- If an app is created using the phone layout, you can still preview it on the web and tablet devices using the device picker. However, if an app isn't created using a responsive layout, it then appears in a phone shape on the web and selected tablet device. You get a message explaining why the preview is narrow. If you’d like an app to be responsive to phone, tablet, and web sizes then we recommend selecting the tablet option when you create an app. You can use responsive auto layout containers to determine the flow of the content for different screen sizes including phones. More information: [Building responsive canvas apps](build-responsive-apps.md)  

- Under Display settings:
   - **Scale To Fit**: When set to **On** your entire app is scaled to fit the available space. If a smaller space is available to the app, you may notice empty space on the sides to accommodate the scaling. When a user plays the app, they will also see the empty space.
  - **Lock Orientation**: When set to **On**, the **Switch Orientation** button in the device picker is disabled.  

## Known Issues 

- If **Scale To Fit** setting is on and **Lock Aspect Ratio** is off, your preview won't be accurate. This configuration isn't recommended. More information: [Change screen size and orientation of canvas apps](set-aspect-ratio-portrait-landscape.md)  

- If **Scale to Fit** is off and you resize your browser window while in preview mode, the preview won't be accurate. To address the issue, close and reopen the preview once your browser window is in the desired size.

---

## Save and publish canvas apps

Source: [save-publish-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/save-publish-app)

*Step-by-step instructions for saving and publishing canvas apps.*

# Save and publish canvas apps

Saving and publishing an app are two different actions:

- **Save** stores your latest changes so you and other app editors can keep working on them. Saving doesn't change what end users see.
- **Publish** makes your saved changes available to everyone the app is shared with.

Use this article to save your work, turn AutoSave on or off, publish updates, and manage app versions. To share an app with users, see [Share a canvas app](share-app.md).

## Save your app

Open your app for editing in [Power Apps](https://make.powerapps.com), and then save your work in one of these ways:

- Select **Save** :::image type="icon" source="media/save-publish-app/save-icon.png"::: on the command bar to save any unsaved changes. Each save creates a new entry in the app's version history.

- Select the dropdown arrow next to **Save** and choose one of the following options:

  | Option | What it does |
  | --- | --- |
  | **Save with version notes** | Saves the app and lets you add notes that describe what changed in this version. |
  | **Save as** | Creates a copy of the app with a different name. |
  | **Download a copy** | Downloads a local `.msapp` file of the app for backup or offline editing. |

## Turn AutoSave on or off

By default, Power Apps saves your work automatically every two minutes. AutoSave helps prevent lost changes if your browser or device closes unexpectedly.

To change the setting:

1. On the command bar, select **Settings**, and then go to the **General** tab.
1. In the **Auto save** section, set the **Auto save** toggle to **On** or **Off**.

   :::image type="content" source="media/save-publish-app/autosave2.png" alt-text="Screenshot of the AutoSave toggle location in Power Apps settings.":::

> [!TIP]
> Even with AutoSave on, select **Save** before you close the browser tab to make sure your most recent changes are captured.

## Publish your app

Publishing your app pushes your latest saved changes to the users you've shared the app with.

1. On the command bar, select **Publish**. If you have unsaved changes, you're prompted to save first. After you save, select **Publish** again.
1. (Optional) Enter a description of what's new in this version.
1. Select **Publish this version**.

Users see the new version the next time they open or refresh the app.

> [!NOTE]
>
> - When you publish a canvas app, the app runs on the latest version of Power Apps and picks up the newest features and performance improvements. If you haven't published in several months, you usually see an immediate performance benefit when you republish.
> - To make app startup faster, Power Apps caches some details (such as environment and connection information) in the user's browser. Cached data stays until the browser clears it. For steps, see [Clear your browser cache](/troubleshoot/power-platform/power-apps/troubleshooting-startup-issues#clear-your-browser-cache).

### Create an app description with Copilot (preview)

If your app is in a [managed environment](/power-platform/admin/managed-environment-overview), you can use AI to help create a description for your app.

In the **Publishing** dialog box, select **Create descriptions using AI** when you save and publish your app.

You can also generate an app description by going to **Settings** > **General**. Under **Description**, select **Create descriptions using AI**.

Admins can disable this feature for managed environments in Power Platform admin. For more information, see [Managed Environments panel](/power-platform/admin/managed-environment-enable).

> [!NOTE]
> If you don't add a description before publishing the app, Copilot generates one after the app is published. Makers can edit this description if Copilot doesn't generate it correctly.

> [!IMPORTANT]
>
> - To use this capability, your app must be in a [managed environment](/power-platform/admin/managed-environment-overview).
> - Preview features aren't meant for production use and can have restricted functionality. These features are available before an official release so customers get early access and provide feedback.
> - For more information, go to our [preview terms](https://go.microsoft.com/fwlink/?linkid=2189520).
> - This capability is powered by [Azure OpenAI Service](/azure/cognitive-services/openai/overview).
> - This capability isn't available in all regions yet and can be subject to usage limits or capacity throttling.
> - To learn about capabilities and limitations of AI-powered and Copilot features in Power Apps, see [Responsible AI FAQs for Power Apps](../common/responsible-ai-overview.md).

## Identify and manage app versions

Each time you save the app, Power Apps adds a new entry to the version history. The version marked **Live** is the one your shared users currently run. Other versions are saved drafts that you can review or restore.

To view all versions of an app:

1. Go to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), and in the left pane, select **Apps**.
1. Select the **More commands** icon :::image type="icon" source="media/save-publish-app/vertical-ellipses.png"::: next to the app name.
1. Select **Details** > **Details**.
1. Go to the **Versions** tab.

:::image type="content" source="media/save-publish-app/publish-portal.png" alt-text="Screenshot of where different versions of the app are located and how to publish a specific version." lightbox="media/save-publish-app/publish-portal.png":::

From this tab you can:

- See which version is **Live**.
- Select an earlier version and publish it to roll back. For details, see [Restore a canvas app to a previous version](restore-an-app.md).

To publish the most recent saved version, open the app in the studio and select the publish icon :::image type="icon" source="media/save-publish-app/publish-icon.png" alt-text="publish icon":::.

> [!NOTE]
>
> - Newly published changes can take a few seconds to appear when users launch the app. Publishing time depends on app complexity and can take a few minutes for large apps.
> - If users already have the app open when you publish, they need to reload the app to see the new version.
> - App preload is on by default to reduce wait time. You can turn it off if needed. For more information, see [Create performant apps](create-performant-apps-overview.md).

## In-app notifications for new versions

When you publish an update, users who currently have the app open see two notifications:

1. **A new version of this app is coming. We'll let you know when it's available.** &mdash; appears while the new version is being prepared.
1. **You're using an old version of this app. Refresh to use the latest version.** &mdash; appears when the new version is ready. Users select **Refresh** to load it.

### Where these notifications appear

| Scenario | Notification available? |
| --- | --- |
| Canvas app on web | Yes |
| Canvas app embedded in an iframe | Yes |
| Customized SharePoint forms | No |
| Canvas app embedded in Microsoft Teams | No |
| Canvas app embedded in Power BI | No |
| Power Apps web part | No |

## Related information

- Run an app in a [browser](../../user/run-app-browser.md) or on a [mobile device](../../mobile/run-powerapps-on-mobile.md).
- [Rename a canvas app](set-name-tile.md).
- [Restore a canvas app](restore-an-app.md) to an earlier version.
- [Share a canvas app](share-app.md) with other users.

---

## Share a canvas app with your organization

Source: [share-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/share-app)

*Learn about how to share canvas apps by giving other users in your organization the permissions to run or modify it.*

# Share a canvas app with your organization

When you create a canvas app, you can define which users in your organization can use the app, modify it, and even re-share it. You can specify individual users by name or designate a security group in Microsoft Entra ID.

Watch this video to learn more about sharing canvas apps with your organization.
> [!VIDEO 0d5b6fd3-7914-490f-a7d5-0a333610beea]

## Prerequisites

Before you share an app, you must [save it](save-publish-app.md) (not locally) and then [publish](save-publish-app.md) it.

- Give your app a meaningful name and a clear description, so that people know what your app does and they can easily find it in a list. Select **Settings** > specify a name, and then enter a description.

- Whenever you make changes, you must save and publish the app again if you want others to see those changes.

> [!IMPORTANT]
> For a shared app to function as you expect, you must also manage permissions for the data source or sources on which the app is based, such as [Microsoft Dataverse](#dataverse) or [Excel](share-app-data.md). You might also need to share [other resources](share-app-resources.md) on which the app depends, such as flows, gateways, or connections.

## Share an app from Power Apps

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left navigation pane, select **Apps**.

1. Select the app that you want to share.

1. On the command bar, select **Share**. Or select the **Commands** menu next to your app name and then select **Share**.

1. In the **Share** dialog box, type the names or alias of the user or security groups in Microsoft Entra ID.

1. Select the down arrow to choose permissions for the app. Options include:
    - **User**: Can use the app only.
    - **Co-Owner**: Can use, edit, and share the app but not delete or change owners.

        :::image type="content" source="media/share-app/share-app-coowner.png" alt-text="share with a co-owner":::

        - If your app connects to a Dataverse table, the permissions dropdown displays a **More security roles** option. Select the appropriate security roles, and those roles are automatically assigned to users when you share the app.
    - If your admin enabled [app level security roles](/power-platform/admin/settings-collaboration#security-roles) in Power Platform Admin, makers with the **System Administrator** security role can give collaborators app-level privileges when sharing. Makers assign privileges from the security role picker, with App reader, App user, App maker, or App admin as the security role options. To edit assigned security roles, unshare and reshare the app to assign the appropriate security role under Manage Access.
        - **App reader**: This role gives read privilege for both user or team owned tables and org owned tables. 
        - **App user**: This role gives full access to only their own records in user or team owned tables, and read privilege to org owned tables.
        - **App maker**: This role gives create and read privilege for all records in user or team owned tables, but only write, delete, assign, share, append, and append to privileges for their own records in user or team owned tables. It also gives read privilege to org owned tables.
        - **App admin**: This role gives full access to all records in user or team owned tables and org owned tables.
        
            :::image type="content" source="media/share-app/app-level-security-roles.png" alt-text="App level security roles":::

1. Optional steps:
   - Select the **overflow menu (...)** at the top-right corner and then select **Upload app image** to include an image of the app in the email.

    :::image type="content" source="media/share-app/share-app-app-image.png" alt-text="Add an app image":::

   - Select **Manage access** to display app access details, including current users and co-owners. You can also edit user access and assign security roles here. The **Additional data access** tab shows app connections to data sources like Dataverse tables or Excel files on OneDrive for Business. To manage security roles for data sources other than Dataverse, such as Excel files on OneDrive, ensure you share these data sources with the app users.

     :::image type="content" source="media/share-app/share-app-access.png" alt-text="Manage app access":::

1. Add an optional message and then select **Share**.

> [!NOTE]
> - To learn about sharing apps outside of your organization, see [Share a canvas app with guest users](share-app-guests.md).
> - To learn about sharing limits applicable to canvas apps in managed environments, see [Sharing limits](/power-platform/admin/managed-environment-sharing-limits).

## Classic app sharing experience

You can still use the classic app sharing experience by selecting the classic sharing option.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left navigation pane, select **Apps**.

1. Select the app that you want to share.

1. On the command bar, select **Share**. Or select the **Commands** menu next to your app name and then select **Share**.

1. Select the **overflow menu (...)** at the top-right corner and then select **Use classic sharing**.

   :::image type="content" source="media/share-app/share-app-revert-to-classic.png" alt-text="Share app using classic sharing":::

1. Specify the name or alias of the users or security groups in Microsoft Entra ID with whom you want to share the app.

    You can share an app with a list of aliases, friendly names, or a combination of those (for example, **Meghan Holmes \<meghan.holmes@contoso.com\>**) if the items are separated by semicolons.

    If several people have the same name but different aliases, the first person found is added to the list. A tooltip appears if a name or alias already has permission or can't be resolved.

    :::image type="content" source="media/share-app/individual-user.png " alt-text="Screenshot that shows what happens when you search for a name in the search field on an app page.":::

   > [!NOTE]
   > You can't share an app with a distribution group in your organization or with a group outside your organization.

   > [!IMPORTANT]
   > To avoid degraded experiences, use a security group when sharing the app with over 100 users.

1. If your app contains premium components, such as a map or address input, users must have a Power Apps license to use the app. To request licenses for the users of your app, select **Request licenses**, which submits the request to your admin.

   :::image type="content" source="media/request-licenses-for-others-banner.png" alt-text="Request Power Apps licenses for your users.":::

   > [!NOTE]
   > You can't request licenses for security groups or distribution lists. For more information about requesting licenses, see [Request Power Apps licenses for your app users](../common/request-licenses-for-users.md).

1. If you want to allow users to edit and share the app, select the **Co-owner** check box.

    :::image type="content" source="media/share-app/co-owner.png" alt-text="Screenshot that shows where to check the box for Co-owner.":::

    In the sharing interface, you can't grant Co-owner permission to a security group if you [created the app from within a solution](add-app-solution.md). However, it's possible to grant co-owner permission to a security group for apps in a solution by using the [Set-PowerAppRoleAssignment cmdlet](/powershell/module/microsoft.powerapps.administration.powershell/set-adminpowerapproleassignment).  

1. If your app connects to data for which users need access permissions, specify security roles as appropriate.

    For example, your app might connect to a table in a Dataverse database. When you share such an app, the sharing panel prompts you to manage security for that table.

    ![Assign a security role.](media/share-app/data-permissions-common-data-servicel.png "Assign a security role")

    For more information about managing security for a table, go to [Manage table permissions](#manage-table-permissions).

    If your app uses connections to other data sources&mdash;such as an Excel file hosted on OneDrive for Business&mdash;ensure that you share these data sources with the users you shared the app with.

    ![Share an Excel file on OneDrive for Business.](media/share-app/data-permissions-odb-excel.png "Share an Excel file on OneDrive for Business")

    For more information about sharing canvas app resources and connections, go to [Share canvas app resources](share-app-resources.md).

1. If you want to help people find your app, select the **Send an email invitation to new users** check box.

    ![Send an email invitation.](media/share-app/send-email-invitation.png "Send an email invitation")

1. At the bottom of the share panel, select **Share**.

    Users can now run the app by using Power Apps Mobile on a mobile device or from Marketplace on [Microsoft 365](https://www.office.com/apps) in a browser. Co-owners can edit and share the app in [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).

    If you sent an email invitation, users can also run the app by selecting the link in the invitation email:

    - If a user selects the **Open the app** link on a mobile device, the app opens in Power Apps Mobile.
    - If a user selects the **Open the app** link on a desktop computer, the app opens in a browser.
    - If a user selects the **Microsoft Teams** link, the app opens in Microsoft Teams.

        If you selected **Co-owner** while sharing, the recipients see a link for **Power Apps Studio** that opens the app for editing with Power Apps Studio.

<!--markdownlint-disable MD036-->
**To change permissions for a user or a security group**

- To allow co-owners to run the app but no longer edit or share it, clear the **Co-owner** check box.
- To stop sharing the app with that user or group, select the **Remove** (x) icon.

## Share apps by using Teams

You can share a link to your app in a Teams chat. The user that you share the app with needs to be on the same tenant and have access to the app that you're sharing.

> [!NOTE]
> - To add canvas apps to Teams by using the web player:
>     - Your organization must have **Allow interaction with custom apps** turned on. For more information, see [Manage custom app policies and settings in Microsoft Teams](/microsoftteams/teams-custom-app-policies-and-settings).
>     - Your organization must allow **Shared Power Apps**. For more information, see [Manage Microsoft Power Platform apps in the Microsoft Teams admin center](/microsoftteams/manage-power-platform-apps).
> - If you're the sender or receiver and get a **This app cannot be found** error when you select **Add app to Teams**, this error means you don't have access to the app. To get access, contact your admin.  
> - If you're the sender and you don't have the Power Apps personal app installed in Teams, a preview card appears with a **Show Preview** button. To unfurl the full adaptive card, select **Show Preview**.

To share the app, copy the app link from your web browser and paste it into the Teams chat. Before you send the link, you see a preview of your message.

> [!div class="mx-imgBorder"]
> ![Share your app using Teams.](media/share-app/teams-link.png "Share your app using Teams")

Legend:

1. **Link to app**: Select the web link to open the app.
2. **Collapse preview**: Select to close the preview. When you collapse the preview, the user that you send the link to only gets a web link to open the app. They won't see the buttons to add the **App to Teams** or **Launch app in web**.
3. **Name of app**: Shows the name of the app.
4. **Add app to Teams**: Select to add the app to Teams.
5. **Launch app in Web**: Open the app directly in your browser.

## Request licenses for your users

When sharing an app that requires a license for use, you can request Power Apps licenses for your users. For more information, see [Request Power Apps licenses for your app users](../common/request-licenses-for-users.md).

## Security group considerations

- All existing members of the security group inherit the app permissions. New users joining the security group will inherit the security group permissions on the app. Users leaving the group will no longer have access through that group, but those users can continue to have access either by having permissions assigned to them directly or through membership in another security group.

- Every member of a security group has the same permissions for an app as the overall group does. However, you can specify greater permissions for one or more members of that group to allow them greater access. For example, you can give Security Group A permission to run an app. Then, you can also give User B, who belongs to that group, Co-owner permission. Every member of the security group can run the app, but only User B can edit it. If you give Security Group A Co-owner permission and User B permission to run the app, that user can still edit the app.

- Users must explicitly be a member of the security group. If a user is an owner of the group, they must also assign themselves as a member of the group to inherit app permissions.

### Share an app with Microsoft 365 groups

You can share an app with [Microsoft 365 groups](/microsoft-365/admin/create-groups/compare-groups). However, the group must have security enabled. Enabling security ensures that the Microsoft 365 group can receive security tokens for authentication to access apps or resources.

**Using Microsoft Graph:**

1. Install the Microsoft Graph module. 

    ```powershell
    Install-Module Microsoft.Graph -Scope CurrentUser
    ```

2. Connect to Microsoft Graph. For information about the administrator roles required to manage groups, see  [Microsoft Entra roles for managing groups](/graph/api/resources/groups-overview#microsoft-entra-roles-for-managing-groups).

    ```powershell
    Connect-MgGraph -Scopes "Group.ReadWrite.All"
    ```

3. Set the Object ID of Microsoft 365 group.

    ```powershell
    $ObjectID = "<ObjectID>"
    ```

4. Enable security.

    ```powershell
    Update-MgGroup -GroupId $ObjectID -BodyParameter @{ SecurityEnabled = $true }
    ```

5. Verify the update.

    ```powershell
    Get-MgGroup -GroupId $ObjectID | Select-Object DisplayName, SecurityEnabled
    ```


> [!NOTE]
> You must be the owner of the Microsoft 365 group to enable security.
> Setting the **SecurityEnabled** property to **True** doesn't affect how Power Apps and Microsoft 365 features work. This command is required because the **SecurityEnabled** property is set to **False** by default when Microsoft 365 groups are created outside of Microsoft Entra ID.

After a few minutes, you can discover this group in the Power Apps sharing panel and share apps with this group.
<a name="manage-table-permissions"></a>
<a name="dataverse"></a>

## Manage table permissions for Dataverse

If you create an app based on Dataverse, you must also ensure that the users you share the app with have the appropriate permissions for the table or tables used by the app. Particularly, those users must belong to a security role that can do tasks such as creating, reading, writing, and deleting relevant records. In many cases, you'll want to create one or more custom security roles with the exact permissions that users need to run the app. You can then assign the role to each user as appropriate.

> [!NOTE]
> - You can assign security roles to individual users and security groups in Microsoft Entra ID, but not to Microsoft 365 groups.
> - If a user isn't in the Dataverse root business unit, you can share the app without providing a security role, and then set the security role directly.
> - After a security role is assigned to a user or group, you can't unassigned it when you share an app. However, you can still unassign security roles through the admin portal.

### Prerequisite

To assign a role, you must have **System Administrator** permissions for a Dataverse database.

**To assign a security group in Microsoft Entra to a role**

1. In the sharing panel under **Data permissions**, select **Assign a security role**.

1. Select the Dataverse roles that you want to apply to the selected Microsoft Entra users or groups.

     ![Security role list.](media/share-app/cds-assign-security-role-list.png "Security role list")

> [!NOTE]
> When you share an app that's based on an older version of Dataverse, you must share the runtime permission to the service separately. If you don’t have permission to do this, see your environment administrator.

## Next steps

[Share a canvas app with guest users](share-app-guests.md)  

### See also

[Edit an app](edit-app.md)  
[Restore an app to a previous version](restore-an-app.md)  
[Export and import an app](export-import-app.md)  
[Delete an app](delete-app.md)

---

## Share a canvas app with guest users

Source: [share-app-guests.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/share-app-guests)

*Learn about how to share canvas app with guest users.*

# Share a canvas app with guest users

Canvas apps can be shared with guest users of a Microsoft Entra tenant. You can invite external business partners, contractors, and third parties to run your company's canvas apps.

Watch this video to learn how to share an app with guests:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=84cd1908-2ca9-415b-a819-3ffb61e55eca]

## Prerequisites

- In Microsoft Entra ID, enable B2B external collaboration for the tenant. More information: [Configure external collaboration settings for B2B in Microsoft Entra External ID](/entra/external-id/external-collaboration-settings-configure)

  > [!NOTE]
  > B2B external collaboration is enabled by default. However, you need to verify that the settings weren't changed by a tenant admin. For more information about Microsoft Entra B2B, see [Overview: B2B collaboration with external guests for your workforce](/entra/external-id/what-is-b2b).

- Access to an account that can add guest users to a Microsoft Entra tenant. Admins and users with the Guest Inviter role can add guests to a tenant.

- To access an app that connects to Dataverse, the guest user must have a license with Power Apps use rights that matches the capability of the app. The exception to this prerequisite is when an app is hosted in a [Microsoft Dataverse for Teams environment](/power-platform/admin/about-teams-environment).
  
> [!NOTE]
> Ensure that you perform these steps on the **resource tenant**, and not on the **home tenant**.
>
> - A **resource tenant** is where the app is expected to exist, and where the user is expected to create the app using Power Apps as a guest.
> - A **home tenant** is where the user's account resides and authenticates against.

## Steps to grant guest access

1. In Microsoft Entra ID, select **New guest user**. More information: [Quickstart: Add a guest user and send an invitation](/entra/external-id/b2b-quickstart-add-guest-users-portal)

    ![Add a guest in Microsoft Entra ID.](media/share-app/guest_access_doc_1.png "Add a guest in Microsoft Entra ID")

2. If the guest user doesn't already have a license in their home tenant, assign a license to the guest user.

   - To assign guest users from admin.microsoft.com, go to [Add users and assign licenses at the same time](/microsoft-365/admin/add-users/add-users).

   - To assign guest users from portal.azure.com, go to [Assign or remove licenses](/entra/fundamentals/licensing).

   > [!IMPORTANT]
   > You might need to disable the Microsoft 365 admin center preview to assign a license to a guest.

3. [Share an app from Power Apps](Share an app from Power Apps)


## Considerations and limitations for guest access

- Users accessing web experiences in different Microsoft Entra tenants must access Power Apps in a standalone browser session (different browser or InPrivate browser session). The standalone browser session insures that Power Apps picks up the correct Azure B2B user identity for the app being accessed.
- Power Apps guest access uses Azure B2B.
- Power Apps Mobile doesn't support authentication using [Microsoft Entra direct federation](/azure/active-directory/b2b/direct-federation). More information: [Sign in using Power Apps Mobile](../../mobile/run-powerapps-on-mobile.md#sign-in)
- Power Apps [per app plans](/power-platform/admin/powerapps-flow-licensing-faq#how-is-microsoft-power-apps-and-power-automate-licensed) are scoped to apps in a specific environment, so they can't be recognized across tenants.
- Power Apps [included with Office](/power-platform/admin/pricing-billing-skus#power-appspower-automate-for-microsoft-365) and Power Apps [per user plans](/power-platform/admin/powerapps-flow-licensing-faq#how-is-microsoft-power-apps-and-power-automate-licensed) have the following characteristics:
  - In the Azure public cloud, they're recognized across tenants in guest scenarios because they aren't bound to a specific environment.
  - In Azure national or sovereign clouds, they're recognized across tenants in guest scenarios. For more information, see [National clouds](/azure/active-directory/develop/authentication-national-cloud), [Azure geographies](https://azure.microsoft.com/global-infrastructure/geographies/#geographies)
  - Licenses aren't recognized across tenants in difference Azure clouds.
  - Not all connectors create connections in the resource tenant by default.
  - A user that signs in to an app using Azure B2B, doesn't see their identity information in **My account**.

    :::image type="content" source="media/share-app/guest-my-account.png" alt-text="creenshot that shows the Power Apps Azure B2B user profile known issue.":::

## Frequently asked questions

### What's the difference between canvas app guest access and Power Pages?

With canvas apps, you can build an app tailored to digitizing business processes, without writing code in a traditional programming language such as C#. Guest access for canvas apps enables teams of individuals made up of different organizations participating in a common business process to access the same app resources that might be integrated with a wide variety of Microsoft and partner sources. More information: [Overview of canvas-app connectors for Power Apps](./connections-list.md)

[Power Pages](/power-pages/introduction) provide you with the ability to build low-code, responsive websites that allow external users to interact with the data stored in Dataverse. With Power Pages, organizations can create websites and share them with users external to their organization either anonymously or through the sign-in provider of their choice, such as LinkedIn, Microsoft, or other commercial sign-in provider.

The following table outlines a few core capability differences between Power Pages and canvas apps.

| Guest access in | Interface | Authentication | Accessible data sources |
|------|--------|----------|-------------------|
| Power Pages | Browser-only experience | Allows anonymous and authenticated access | Dataverse |
| Canvas apps | Browser and mobile apps | Requires authentication via Microsoft Entra ID | Any of approximately 150 out-of-the-box connectors and any custom connector  |

### Can guests access customized forms in SharePoint?

See [What license must be assigned to my guest so they can run an app shared with them?](#what-license-must-be-assigned-to-my-guest-so-they-can-run-an-app-shared-with-them)

### Why is a guest who accesses a customized form in SharePoint prompted for a trial?

If the custom form uses a premium connector, a guest must have a Power Apps license to access the custom form. If the custom form only uses standard connectors, your tenant must allow Microsoft Power Platform internal consent plans to be assigned to users. For more details about Power Platform internal consent plans, read [block trial license commands](/power-platform/admin/powerapps-powershell#block-trial-licenses-commands).  

### Can guests access apps embedded in SharePoint?

Yes. However, access to canvas standalone apps requires a user license with Power Apps user rights that matches the capability of the app, including embedded apps. When embedding a canvas app in SharePoint with the Power Apps embed control, enter the app ID in the **App web link or ID** box.

![Embed a canvas app in SharePoint for guests.](media/share-app/guest_access_doc_5.PNG "Embed a canvas app in SharePoint for guests")

When embedding a canvas app in SharePoint via the iFrame HTML tag, reference the app by using the full web URL. To find the URL, sign in to [Power Apps](https://make.powerapps.com), select an app, and then select the **Details** tab. The URL is displayed under **Web link**.

![Canvas app details.](media/share-app/guest_access_doc_6.PNG "Canvas app details")

### How is it that guests can open the app shared with them, but no data connections are created?

As is the case with nonguests, the underlying data sources accessed by the app must also be made accessible to the guest.

### What license must be assigned to my guest so they can run an app shared with them?

The following table explains whether the guests can run (use) customized Microsoft Lists or SharePoint library forms, canvas apps, and model-driven apps using the referenced license.

| Plan | Customized Microsoft Lists or SharePoint library form (using nonpremium connectors) | Customized Microsoft Lists or SharePoint library (using premium connectors) | Canvas app (using nonpremium connectors) | Canvas app (using premium connectors) | Model-driven app |
| ------ | ------- | -------- | -------- | --------- | --------- |
| No license | &check; | &cross; | &cross; | &cross; | &cross; |
| SharePoint user (without Power Apps license) | &check; | &cross; | &cross; | &cross; | &cross; |
| Power Apps included with Office | &check; | &cross; | &check; | &cross; | &cross; |
| Power Apps per app plan | &check; | &check; | &check; | &check; | &check; |
| Power Apps per user plan | &check; | &check; | &check; | &check; | &check; |

For more information about pricing and the capabilities of various plans, go to [Microsoft Power Apps and Power Automate Licensing Guide](https://go.microsoft.com/fwlink/?linkid=2085130).

### In Power Apps Mobile, how does a guest see apps for their home tenant?

When users access a canvas app through a mobile device and the app is published in a non-home Microsoft Entra tenant, they can [switch to a different directory](../../mobile/tenant-switcher.md).

### In Power Apps Mobile, how does a guest see apps in the guest tenant?

The guest user opens the email they received when an app in the guest tenant is shared and selects **Open the app**. This view applies to both Microsoft Entra and Microsoft account users. You can also create a deep link. For more information, see [Use deep links with Power Apps mobile](/power-apps/mobile/run-powerapps-on-mobile).

### Must a guest accept the Microsoft Entra guest invitation before an app can be shared with them?

No. If a guest opens an app shared with them before they accept a guest invitation, the guest is prompted to accept the invitation as part of the sign-in experience while opening the app.  

### In which Microsoft Entra tenant are connections created for a guest user?

Connections for an app are always made in the context of the Microsoft Entra tenant the app is associated with. For example, if an app is created in the Contoso tenant, the connections made for Contoso internal and guest users are made in the context of the Contoso tenant.

### Can guests use Microsoft Graph with Power Apps?

By default, Azure B2B users have limited permission to access information from Microsoft Graph. A user’s permission in Microsoft Graph determines what's returned when using connectors such as Microsoft Security Graph, Office 365 Users, Office 365 Groups, and custom connectors using Microsoft Graph APIs. For more information about Microsoft Graph permissions, see [Default user permissions](/entra/fundamentals/users-default-permissions?context=graph%2Fcontext#restrict-guest-users-default-permissions) and [Working with users in Microsoft Graph](/graph/api/resources/users?#user-and-group-search-limitations-for-guest-users-in-organizations).  

### Which Intune policies apply to guests who are using my apps?

Intune only applies the policies of a user's home tenant. For instance, if `Lesa@Contoso.com` shares an app with `Wanda@Fabrikam.com`, Intune continues to apply Fabrikam.com policies on Wanda's device, regardless of the apps Wanda runs.

### Can I disable cross tenant license recognition?

No. Authorization capabilities can and should be used to control which users access a resource. For instance, Dataverse environments can be bound to a security group that excludes Azure B2B guest users.

### Why can an Azure B2B user without a license access a model driven app?

The detection of a previously licensed user no longer having a license isn't immediate. If you expect a user to lose access to an app using Dataverse, then their authorization to the app or data should be updated. For example, the app should be unshared with the user or Dataverse security roles should be removed from the user.

### Which connectors create connections in the resource tenant by default?

Users relying on Azure B2B to access an app only has implications on connectors that use Microsoft Entra ID for authentication. Some Microsoft Entra ID based connectors default to creating a connection in the resource tenant, while others default to creating a connection in the home tenant. Connectors that don't use any type of Microsoft Entra ID authentication work the same for guests and members in a tenant. The following table enumerates all connectors that do use Microsoft Entra ID authentication and default creates connections in the resource tenant. For more information on each connector as there might be restriction, see [List of all Power Apps connectors](/connectors/connector-reference/connector-reference-powerapps-connectors)

| **Connector**                                     | **Creates connection in resource tenant by default**                                             |
|---------------------------------------------------|------------------------------------------------------------------------|
| Microsoft Entra                                          | Yes                                                                    |
| Azure Automation                                  | Yes                                                                    |
| Azure Container Instance                          | Yes                                                                    |
| Azure Data Factory                                | Yes                                                                    |
| Azure Data Lake                                   | Yes                                                                    |
| Azure IoT Central                                 | Yes                                                                    |
| Azure Kusto                                       | Yes                                                                    |
| Azure Log Analytics                               | Yes                                                                    |
| Azure Resource Manager                            | Yes                                                                    |
| Microsoft Dataverse                               | Yes*                                                                     |
| Dynamics 365 AI for Sales                         | Yes                                                                    |
| Microsoft Teams                                   | Yes                                                                    |
| Office 365 Groups                                 | Yes                                                                    |
| Office 365 Users                                  | Yes                                                                    |
| Outlook Tasks                                     | Yes                                                                    |
| Power BI                                          | Yes                                                                    |
| SharePoint                                        | Yes                                                                    |

\* When using the Microsoft Dataverse as the data source, ensure that the guest user is licensed from the same tenant where you have Dataverse data located.


### See also

[Edit an app](edit-app.md)  
[Restore an app to a previous version](restore-an-app.md)  
[Export and import an app](export-import-app.md)  
[Delete an app](delete-app.md)

---

## Share Excel files used by an app

Source: [share-app-data.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/share-app-data)

*Learn about sharing Excel files in Dropbox, OneDrive, and Google Drive.*

# Share Excel data used by your app

You can share Excel data with your app users in a [cloud account](connections/cloud-storage-blob-connections.md), such as OneDrive.

For example, you might create an app that shows the names and phone numbers of the technical-support group at your company. The information is stored in an Excel spreadsheet, which you put in a folder in Dropbox. You then share the folder with your app users so that they can see the names and phone numbers.

You must share the data so that users can run and even modify your app. Users who aren't given the sharing permissions won't see the data in the Excel file.

This topic shows you how to share data in an Excel spreadsheet using Dropbox, OneDrive, and Google Drive. To create an app that displays data from an Excel file, see [Create an app from a set of data](get-started-create-from-data.md).

## Share data in Dropbox
1. Sign in to Dropbox using the same account that you used to create a connection from Power Apps to Dropbox.
2. Select the folder that contains the Excel file, and then select **Share**:  
   
    ![Share command.](./media/share-app-data/dropbox-share.png)
3. In the dialog box, enter the email addresses with which your app users sign in to Dropbox.  
   
    ![Share on Dropbox.](./media/share-app-data/dropbox-perms.png)
4. If your app users will add, modify, or delete data in your app,  select **Can edit**. Otherwise, select **Can view**.
5. Select **Share**.

For more information, see [Sharing folders on Dropbox](https://www.dropbox.com/en/help/19).

## Share data in OneDrive
1. Sign in to OneDrive using the same account that you used when you created a connection from Power Apps to OneDrive.
2. Select the folder that contains the file, and then select **Share**:  
   
    ![Share option.](./media/share-app-data/onedrive-share.png)
   
    > [!NOTE]
   > In OneDrive for Business, share the file itself, not the folder that contains the file.
3. In the dialog box, select **Email**.
   
    ![Share by email.](./media/share-app-data/onedrive-email.png)
4. Specify the email addresses with which your app users sign in to OneDrive, and then select **Share**.  
   
    ![Enter email of a user.](./media/share-app-data/onedrive-perms.png)

For more information, see [Share OneDrive files and folders](https://support.office.com/article/Share-OneDrive-files-and-folders-and-change-permissions-9fcc2f7d-de0c-4cec-93b0-a82024800c07).

## Share data in Google Drive
1. Sign in to Google Drive using the same account with which you created a connection from Power Apps to Google Drive.
2. Right-click the folder that stores your Excel file, and then select **Share**.  
   
    ![Share option in Google Drive.](./media/share-app-data/googledrive-share.png)
3. In the dialog box, enter the email addresses with which your app users sign in to Google Drive:  
   
    ![Specify a user.](./media/share-app-data/googledrive-perms.png)
4. If your app users will add, modify, or delete data in your app, then select **Can edit** in the list of permissions. Otherwise, select **Can view**.
5. Select **Done**.

For more information, see [Share Google Drive files and folders](https://support.google.com/drive/answer/2494822).

### Known limitations
For information about how to share Excel data within your organization, [review these limitations](connections/cloud-storage-blob-connections.md#known-limitations).

---

## Share resources used by canvas apps

Source: [share-app-resources.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/share-app-resources)

*Understand how you share resources that your canvas app uses.*

# Share resources used by canvas apps

Before you [share a canvas app](share-app.md), consider the types of resources on which it relies, such as one or more of the following:

* Tables in Microsoft Dataverse.

    For information about giving users access to this data, see [Manage table permissions](share-app.md#manage-table-permissions).
    
* A connection to a data source.
* An on-premises data gateway.
* A custom connector.
* An Excel workbook or other service.
* A flow.

Some of these resources are shared automatically when you share the app. Other resources require you or the people with whom you share the app to take extra steps so that the app works as you expect.

You can also share your connections, custom connectors and on-premises data gateway with your entire organization.

## Connections

Some connections (such as SQL Server with SQL or Windows authentication) are [implicitly shared](share-app-resources.md#implicit-sharing) with the app when you share the app with other users. Other connections require users to create their own connections and explictly grant security privileges (such as security roles for the Dataverse, OneDrive for Business, SQL Server with Microsoft Entra authentication).

You can determine whether a connection is automatically shared as part of the app when you share the app with other users; allowing you to update sharing permissions. To do this, go to make.powerapps.com and select **Data** -> **Connections** from left navigation. Then select the required connection. If the **Share** button appears on top navigation or if the **Share** option displays when you select *More Commands* (...), the selected connection can be shared with other users.

  ![No share for OneDrive for Business.](./media/share-app-resources/shared-connections-odb.png)

  ![Share SQL auth connection to SQL Server.](./media/share-app-resources/shared-connections-sqlauth.png)

### Implicit sharing

When you share an app that uses a connection that can be shared, the app connection is **implicitly shared** along with the app. For example, following message appears when you go to make.powerapps.com, select **Apps**, choose an app that uses such connection, select *More Commands* (...) and then select **Share**:

  ![Implicit permission warning.](./media/share-app-resources/share-app-implicit-permission.png)

If you select **Confirm** and share the chosen app with other users, the app connection is implicitly shared with those users along with the app.

> [!NOTE]
> To ensure the app works properly, the user who is sharing the app needs to have sharing permission for all connections used by the app. Without these permissions, the user won't be able to access or use the connections correctly. This applies to all app-sharing activities, including app sharing, app publishing, and solution import.

## On-premises data gateways
If you create and share an app that includes data from an on-premises source, the [on-premises data gateway](gateway-management.md) itself and certain types of connections to that gateway will be shared automatically. For any connection that isn’t shared automatically, you can share it manually (as the previous section shows) or let the app prompt users to create their own connections. To show the connection or connections with which a gateway has been configured:

1. Open [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), click or tap **Manage** in the left navigation bar, and then click or tap **Gateways**.
2. Click or tap a gateway, and then click or tap the **Connections** tab.

> [!NOTE]
> If you share one or more connections manually, you might need to reshare them under these circumstances:

* You add an on-premises data gateway to an app that you’ve already shared.
* You change the set of people or groups with whom you’ve shared an app that has an on-premises data gateway.

## Custom connectors
When you share an app that uses a custom connector, it is automatically shared, but users must create their own connections to it.

On [powerapps.com](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc), you can view or update permissions for a custom connector. In the left navigation bar, click or tap **Manage**, click or tap **Connections**, and then click or tap **New connection** (in the upper-right corner). Click or tap **Custom**, and then click or tap a custom connector to display details about it.

## Excel workbooks
If a shared app uses data to which not all users have access (such as an Excel workbook in a cloud-storage account), [share the data](share-app-data.md).

## Flows
If you share an app that includes a flow, users who run the app will be prompted to confirm or update any connections on which the flow relies. In addition, only the person who created the flow can customize its parameters. For example, you can create a flow that sends mail to an address that you specify, but other users can’t change that address.

---

## Change app name and icon for canvas apps

Source: [set-name-tile.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/set-name-tile)

*Step-by-step instructions for changing settings, such the app name and the icon, of a canvas app in Power Apps.*

# Change app name and icon for canvas apps

Customize a canvas app by changing its name and icon.

## Prerequisites

1. Create an app, or open one for editing.

2. Select **Settings**.

## Rename an app

Under **General**, update the app name inside the **Name** text box.

![Close an app.](./media/set-name-tile/rename-app.png)

## Change an app tile

Follow one or more of these steps:

* Select a different background color from the list of options.

    ![Select a tile color.](./media/set-name-tile/tile-colors.png)

* Select an icon from the list of default icons.

    ![Select a tile icon.](./media/set-name-tile/tile-icons.png)

* Select **Browse file**, select the image that you want to use, and then select **Open**.

    > [!NOTE]
  > For best results, use a square-shaped icon.

## Next step
On the **File** menu, select **Save** to republish your app with the new settings.

## More resources
* [Share an app](share-app.md)
* [Delete an app](delete-app.md)
* [Restore an app to a previous version](restore-an-app.md)

---

## Edit a canvas app

Source: [edit-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/edit-app)

*Step-by-step instructions for editing canvas apps and session-locking scenarios in Power Apps.*

# Edit a canvas app

Edit any canvas app that you created, or for which you have **Co-owner** permission. You can edit an app in Power Apps Studio. 

If you try to edit an app that's open for editing elsewhere, a message tells you whether you already have it open or another user does.

## Edit an app

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).

1. Select **Apps** in the left navigation pane.

    ![List of apps.](./media/edit-app/file-apps.png "List of apps")

1. Select an app.

1. Select **Edit** from top menu. You can also use "**...**" (More Commands) for the app and then select **Edit** from the drop-down menu.

    ![Edit an app.](./media/edit-app/edit-app.png "Edit an app")

If you don't see the app that you want to edit, verify that you've selected the correct environment.

![Select environment.](./media/edit-app/select-environment.png "Select environment")

## Collaborate on an app

An app can be shared with others. Any **Co-owner** for an app can edit it. Consider the following scenarios when collaborating over an app.

### Edit an app already being edited

Only one user can edit an app at a time. For more information, see [Find out who's working on the same app](copresence-power-apps-studio.md).

### Edit an app across multiple sessions

Consider that you already have an app open for editing. And then, you try to open the app for editing on another device, or in another browser window. In that case, you'll see the following message.

![App already open for editing by same user.](./media/edit-app/applock-selfuser.png "App already open for editing by same user")

You can override the previous session, but you might lose any changes that you haven't saved.

## Next Steps

Learn more about how to add a [screen](add-screen-context-variables.md), a [control](add-configure-controls.md), or a [data connection](add-data-connection.md).

### See also

- [Restore an app to a previous version](restore-an-app.md)
- [Export and import an app](export-import-app.md)

---

## Overview of exporting and importing canvas apps

Source: [export-import-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/export-import-app)

*Overview of exporting and importing canvas apps.*

# Overview of exporting and importing canvas apps

In this article, you'll learn about the different options available to export and import canvas apps in the form of singular app file, app package, and considerations from the application lifecycle management (ALM) perspective. To effectively manage ALM, it's recommended to use solutions. Canvas apps packages don’t support ALM and should only be used for basic import and export capabilities when Dataverse isn’t accessible.

You can export and import canvas apps using one of the following options:

- [Export and import canvas apps as app packages](export-import-app-package.md)
- [Export and import canvas apps as part of solutions](../data-platform/solutions-overview.md)
- [Export and import a canvas app as a single app file](export-import-single-app.md)


> [!IMPORTANT]
> - Canvas app packages can't be used with [Dataverse solution packages](../data-platform/solutions-overview.md) because of the package incompatibility.
> - Canvas apps that have Dataverse dependencies, such as flows, connection references, etc. are not supported for canvas app packages. For ALM capabilities in Microsoft Power Platform environments, use Microsoft Dataverse and solutions instead of the canvas app package export and import. More information: [ALM overview](/power-platform/alm/overview-alm)
> - An App Insights instrumentation key may be present in imported canvas apps. Inspect the instrumentation key after importing an app to ensure it corresponds to the desired App Insights resource.

## Export and import canvas apps as app packages

You can export and import canvas apps by using packages. This feature allows you to export an app from one environment and import it to another.

## Resources included in canvas apps packages

An app can consume different resources. For example, most apps use connections. Other apps might use Power Automate, have custom connectors, or connect by using gateways to on-premises resources. Some apps might also use Dataverse customizations

The following table explains different resource types, supportability, and import options.

| Resource type | Supported | Import options |
| --- | --- | --- |
| App |Yes, for canvas apps |There are two options to import an app into an environment: <ul><li><b>Create new</b>: The app is created as a new app in the environment where the package is imported.</li> <li><b>Update</b>: The app already exists in the environment and will be updated when this package is imported.</li></ul> |
| Power Automate |Yes |There are two options to import a flow into an environment: <ul><li><b>Create new</b>: The flow is created as a new flow in the environment where the package is imported.</li> <li><b>Update</b>: The flow already exists in the environment and will be updated when this package is imported.</li></ul><br> <b>Note: </b>All resources that the flow depends on will also be included in the app package that's exported and will need to be configured when the package is imported. <br> <br> You can also export and import flows by using solutions. More information: [Power Automate solutions](/power-automate/overview-solution-flows) |
| Custom connectors |No |Exporting a custom connector isn't supported. You need to re-create the custom connector on the target environment. |
| Connections |No |Exporting a connection isn't supported. You need to re-create connections on the target environment. |
| Dataverse customizations |No |Exporting Dataverse customizations as a part of a canvas app package isn't supported. You need to use Dataverse solutions instead. More information: [Dataverse solutions](../../developer/data-platform/introduction-solutions.md) |
| Gateways |No | You can't export or import gateways. You need to re-create gateways on the target environment. |

## Permissions

Only the **Owner** or **Co-owner** of an app can export a canvas app package. To import an app, the [Environment Maker](/power-platform/admin/database-security#predefined-security-roles) security role is required on the destination environment, either directly or through a Dataverse team that is part of the **AAD Security Group** category. Custom security roles are not currently supported. 

### See also

- [Save and publish an app](save-publish-app.md)
- [Edit an app](edit-app.md)
- [Delete an app](delete-app.md)
- [Share an app](share-app.md)

---

## Export and import canvas apps as a package

Source: [export-import-app-package.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/export-import-app-package)

*Learn how to export and import canvas apps as a package.*

# Export and import canvas apps as a package

This article provides a step-by-step guide for exporting and importing canvas apps. Before you begin, review the [overview](export-import-app.md) article to learn about the different export and import options available.

> [!IMPORTANT]
> It's recommended to use solutions for application lifecycle management (ALM) to ensure proper management and support.

## Export a canvas apps package

To export a canvas apps package, select your app, and then select **Export Package**.

![Export package GIF demo with example export walkthrough.](media/export-import-app/export-app.gif "Export package GIF demo with example export walkthrough")


You can change the default **Import Action** for each resource used by your canvas app. By default, resources in a canvas app package, including the app itself, are set to **Update**. However, you have the option to select **Create as new** during import, which will create the resource instead of updating an existing one. The import action you select will be the default action during the app import


> [!IMPORTANT]
> You can only import the exported package. Changes to the exported package file aren't supported.


<!--markdownlint-disable MD036-->
**To export a canvas app package**
<!--markdownlint-enable MD036-->

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** from the left pane.

1. Select the app that you want to export.

1. Select **Export Package**.

    ![Select export.](media/export-import-app/export-app.png "Select export")

1. Enter the package **Name** and **Description**. You can also change the **Environment** name, if needed.

    ![Review package details.](media/export-import-app/export-app-details.png "Review package details")

1. Select **Update** to choose the import action for the app package resource.

    ![Configure package content action.](media/export-import-app/import-app-package-content-action.png "Configure package content action")

1. Select **Create as new** if the app should be created during import, or **Update** to update an existing app.

    ![Import setup.](media/export-import-app/import-setup.png "Import setup")

    > [!NOTE]
    > The **Import Setup** action text changes depending on your new selection.

1. Repeat the previous step for each additional resource in the app package.

1. (Optional) Select ![Import comment icon.](media/export-import-app/comment.png "Import comment icon") (comment icon) to insert a comment for each resource.

    ![Import comment.](media/export-import-app/add-comment.png "Import comment")

1. Select **Export** to export the package.

The package is downloaded to your browser's default downloads folder.

## Importing a canvas app package

To import a canvas app package, select **Import canvas app**. Be sure to select the correct actions for each app package resource&mdash;for example, create a new instance of an app or a flow. You can also read additional information in comments that were entered while the app package was being exported.

![Import package GIF demo with example export walkthrough.](media/export-import-app/import-app.gif "Import package GIF demo with example export walkthrough")

If you're updating an existing app or resource, be sure to [publish](save-publish-app.md) the app so users can see the changes.

> [!TIP]
> You can quickly confirm selections before importing an app package by viewing the icon changes for each resource type.
> <table >
>  <tr>
>    <th align="left">Icon</th>
>    <th align = "left">Description</th>
>  </tr>
>  <tr>
>    <td><img src="media/export-import-app/icon-new.png" alt="Create as new"></td>
>    <td><b>Create as new</b>: A new resource will be created.</td>
>  </tr>
>  <tr>
>    <td><img src="media/export-import-app/icon-changed.png" alt="Import action changed"></td>
>    <td><b>Import action changed</b>: The import action for the resource has been modified.</td>
>  </tr>
>  <tr>
>    <td><img src="media/export-import-app/icon-action-required.png" alt="Action required"></td>
>    <td><b>Action required</b>: You must select an import action before the app package can be imported.</td>
>  </tr>
> </table>

<!--markdownlint-disable MD036-->
**To import a canvas app package**
<!--markdownlint-enable MD036-->

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** from the left pane.

1. Select **Import canvas app**.

    ![Select import.](media/export-import-app/import-app.png "Select import")

1. Select **Upload**, and select the app package file that you want to import.

1. Select the **Import Setup** action, or ![Wrench icon.](media/export-import-app/wrench.png "Wrench icon") for a resource.

    ![Select import action.](media/export-import-app/update-import-action-when-importing.png "Select import action")

    - If you select **Create as new**, you can change the resource name.

        ![Select import action - resource name.](media/export-import-app/create-as-new-resource-name.png "Select import action - resource name")

    - If you select **Update**, select an app that you want to update during the import.

        ![Select import action - update.](media/export-import-app/update-import-action-select-app-to-update.png "Select import action - update")

1. Repeat the previous step for each additional resource in the app package.

1. (Optional) If the app package contains references to [connections](connections-list.md), you can choose the connection from the available connections list.

    ![Select connection during import.](media/export-import-app/select-connection-during-import.png "Select connection during import")

    Select **Select during import** to choose the appropriate connection.

    ![Select connection.](media/export-import-app/select-or-create-connection-during-import.png "Select connection")

    > [!NOTE]
    > - If no connections are available, or the connection you want isn't listed, select **Create new** to create a new connection in a new browser tab. Ensure that you create the connection for the correct resource type. After creating the connection, return to the import app browser tab and select **Refresh list** to reflect and choose the newly created connection.
    > - In some cases, it is necessary to reconfigure the flow association when you import a canvas app with flows. For more information, see [Add an existing flow](working-with-flows.md#add-an-existing-flow)

1. (Optional) If comments were entered for a resource during the export of the app package, the comment icon will appear filled and the text **Comment yes** will appear when you hover over it. Select the comment to view it.

    ![Comment available to view.](media/export-import-app/comment-yes-during-import.png "Comment available to view")

1. Select **Import** to import the app package.

    > [!IMPORTANT]
    > If you select to **Update** an existing app, the new changes will be saved as a draft of the app. You'll need to [publish](save-publish-app.md) the app so users can see the changes.

---

## Export and import a canvas app as a single app file

Source: [export-import-single-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/export-import-single-app)

*Learn how to export and import a canvas app as a single app file.*

# Export and import a canvas app as a single app file

In this article, you'll learn how to export and import a single canvas app. Before you begin, review the [overview](export-import-app.md) article to learn about the different export and import options available.

Using this option, you’re able to export a single canvas app in the format of a **.msapp** file extension. This allows you to export a single file that contains the canvas app that you’re currently editing and import it.

## Permissions 
Only the **Owner** or **Co-owner** of an app can export a canvas app package. To import an app, the [Environment Maker](/power-platform/admin/database-security#predefined-security-roles) security role is required on the destination environment, either directly or through a Dataverse team that is part of the **AAD Security Group** category. Custom security roles are not currently supported. 

## Export .msapp files in Power Apps

1. Sign in to [Power Apps](https://make.powerapps.com).
1. Open the canvas app that you want to export in Power Apps Studio.  
1. In the Power Apps Studio, select **Save** drop-down menu and then select, **Download a copy**. 
 
The  **.msapp** file is downloaded to your device.  

## Import .msapp files in Power Apps
1. Sign in to [Power Apps](https://make.powerapps.com).
1. From the left navigation pane, select **Apps**.
1. Select **Import app** > **From file (.msapp)**. 

When Power Apps Studio opens, you can choose the appropriate  **.msapp** file to import. Power Apps Studio will reload with the  **.msapp** file opened. 

> [!Note]
> For more information on resources included in the single app file, see [Resources included](export-import-app.md#resources-included-in-canvas-apps-packages).

---

## Delete a canvas app

Source: [delete-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delete-app)

*Learn about how to delete an existing canvas app.*

# Delete a canvas app

This article shows you how to delete a canvas app.

## Delete an app as the owner

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).

1. Select **Apps** from the left pane.

    :::image type="content" source="./media/delete-app/file-apps.png" alt-text="Screenshot of the Apps option in the left pane.":::

1. (optional) Near the upper-right corner, filter the list of apps to show only those apps that you own.

    :::image type="content" source="./media/delete-app/filter-list.png" alt-text="Screenshot of the Apps filter near the upper-right corner.":::

   > [!NOTE]
   > If the app that you want to delete doesn't appear, make sure that you're in the right environment.

1. Select an app.

    :::image type="content" source="./media/delete-app/select-app.png" alt-text="Screenshot of selecting an app.":::

1. Select **Delete** from the top menu. You can also select **More Commands** (**..**) and then select **Delete** instead.

    :::image type="content" source="./media/delete-app/select-delete.png" alt-text="Screenshot of selecting Delete from the top menu.":::

1. Select **Delete from cloud**.  

    :::image type="content" source="./media/delete-app/delete-app.png" alt-text="Screenshot of the Delete from cloud option.":::

    > [!IMPORTANT]
    > This action deletes the app not only from your account but also from the accounts of all users with whom this app was shared.

## Delete an app as the administrator

If owner of an app is unavailable, a [Power Platform or Dynamics 365](/power-platform/guidance/adoption/pp-admin) admin can set the owner of an app. And then, the [new owner can delete the app](#delete-an-app-as-the-owner).

To set a user as the owner of an app, use the [Power Apps cmdlets for administrators](/power-platform/admin/powerapps-powershell).

> [!TIP]
> You can also recover a deleted canvas app using [Power Apps cmdlets for administrators](/power-platform/admin/powerapps-powershell#recover-a-deleted-canvas-app) as long as the app is [discoverable](/power-platform/admin/powerapps-powershell#display-a-list-of-deleted-power-apps-in-an-environment).

### See also

- [Share an app](share-app.md)  
- [Change app name and tile](set-name-tile.md)  
- [Restore an app to a previous version](restore-an-app.md)
- [Export and import an app](export-import-app.md)

---

## How to check license designation for an app

Source: [license-designation.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/license-designation)

*Explains how to check license designation for the selected canvas app.*

# How to check license designation for an app

Starting October 2019, several connectors are reclassified from Standard to Premium.

[Power Apps licensing FAQ](/power-platform/admin/powerapps-flow-licensing-faq#office-365) outlines
reclassified connectors. Apps using these connectors before the
reclassification have been granted an extended timeframe allowing users
without a premium license to access these apps.

The following table outlines the designations and which license an end user must have to access an app.

| **Designation​** | **Definition**
|-|-|
| Standard​ | An app that only uses standard connectors. An end user must have a Power Apps for Office 365 plan, per app plan, or a per user plan to access this app.
| Extended​ | An app allowed to use connectors promoted to premium on October 1, 2019.​ An end user must have a Power Apps for Office 365 plan, per app plan or per user plan. [Power Apps licensing FAQ](/power-platform/admin/powerapps-flow-licensing-faq#office-365) outlines which connectors were promoted to premium on October 1, 2019.
| Premium​ | An app that uses at least one premium connector, a custom connector, or an on-premises gateway. An end user must have a per app plan or per user plan to access.

> [!NOTE]
> Power Apps built in Microsoft Teams environments that connect to Dataverse for Teams, or use custom connectors have **Premium** license designation.
> - End-users with a [Microsoft 365 subscription including Dataverse for Teams use rights](/power-platform/admin/powerapps-flow-licensing-faq#which-microsoft-365-subscriptions-include-dataverse-for-teams-and-power-virtual-agents-capabilities-with-teams) will be able to run these apps in Microsoft Teams. 
> - End-users that attempt to run these apps outside of Microsoft Teams are required to have a per app plan or per user plan.

## Check app license designation from app settings

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** from left side.

1. Select an app from the list of app. You can use the **Settings** option from top or, use the **More Commands** (**...**) and then **Settings** from the drop-down menu:

    ![Settings option.](media/license-designation/app-settings.png)

1. Select **Settings** to see the license designation information:

    ![License designation from settings.](media/license-designation/settings-license-designation.png)

## Check app license designation from app details

1. Sign in to [Power Apps](https://make.powerapps.com).

1. Select **Apps** from left side.

1. Select an app from the list of app. You can use the **Details** option from top or, use the **More Commands** (**...**) and then **Details** from the drop-down menu:

    ![App details.](media/license-designation/app-details.png)

1. Select **Details**:

    ![App designation in details.](media/license-designation/app-details-page.png)

## Known issues

- The use of a premium connector in a flow connected to an app isn't recognized by the app's license designation.

    For example, an app that only uses standard connectors and is connected to a flow using a premium connector, like the HTTP connector, will have the license designation as **Standard** although it requires the app users to have **Premium** use rights.

## Pass assignment

For information about Pass assignment, read [Power Apps per app
plans](/power-platform/admin/about-powerapps-perapp#step-three-set-up-apps-to-use-per-app-plans).

## Next steps

- [Power Apps licensing FAQ](/power-platform/admin/powerapps-flow-licensing-faq)

### See also

- [Edit an app](edit-app.md)
- [Delete an app](delete-app.md)

---

## Restore your canvas app to a previous version

Source: [restore-an-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/restore-an-app)

*Learn about how to restore a canvas app to a previous version.*

# Restore a canvas app to a previous version

[This article is prerelease documentation and is subject to change.]

This article shows you how to restore a canvas app to a previous version that was saved to the cloud from your Power Apps account.

## Restore an app from your account

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the left navigation pane, select **Apps**. 

    ![Select Apps](./media/restore-an-app/file-apps.png "Select Apps")

1. Select your app and then select **Details** on the command bar.

    > [!NOTE]
    > If the app that you want to restore doesn't appear, make sure that you're in the right environment.

1. Select **Versions** and then select the app version that you want to restore.

    ![Select Versions](./media/restore-an-app/versions.png "Select Versions")

1. Select **Restore** and confirm your changes by selecting **Restore** again.

    > [!NOTE]
    > - For apps older than 6 months, this action will repackage the app with the oldest version available. Functionality may have changed from the original packaging of the app

    New version is created.

1. (Optional) If you want to publish the restored version, select **Publish this version**, and then select **Publish this version** when prompted to confirm.

    ![Publish restored version](./media/restore-an-app/publish.png "Publish restored version")

    Notice the published restore version that shows up as **Live**.
    
    ![Live version](./media/restore-an-app/live.png "Live version")

    > [!NOTE]
    > **Publish this version** option only appears for the latest unpublished version of an app.

## More resources
[Share an app](share-app.md)  
[Change app name and tile](set-name-tile.md)  
[Delete an app](delete-app.md)

---

## Test Studio

Source: [test-studio.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/test-studio)

*Describes Test Studio with overview, terminology, best practices, and limitations.*

# Test Studio

Build end-to-end UI tests for your canvas app using Test Studio. Maintain your app quality by continually validating that your app works as expected when new changes or updates are deployed. 

## Overview

Testing is an important part of the software development life cycle (SDLC). Testing can help ensure the quality of the app delivered to customers. It can identify issues or defects early in the release process and provides an opportunity to fix these issues to make the app more reliable before releasing changes. Depending on the size and usage of the app, manual testing of new changes might be enough. However, as the app grows in complexity and usage, you might need to consider a test strategy instead of manual testing. If the app is mission-critical, even a small mistake can have a significant impact.

Increased app changes can result in longer testing cycles. Eventually, regression testing of the app might be longer than the time spent to develop new features. In fast-paced development, thoroughly testing every feature in the app becomes a bottleneck to releasing software updates. One option to reduce the time taken during a test cycle and on regression testing is test automation. Test automation can help you test your app with minimal effort, reducing testing time and identifying critical issues before release.

Power Apps Test Studio is a low-code solution to write, organize, and automate tests for canvas apps. In Test Studio, you can write tests using Power Apps expressions or use a recorder to save app interaction to automatically generate the expressions. You can play written tests back within the Test Studio to validate app functionality, and also run the tests in a web browser and build the automated tests into your app deployment process.

![Test Studio.](./media/test-studio/test-studio.png "Test Studio")

## Prerequisites

You must be creator or co-owner of an app to test the app with Test Studio.

## Test Studio terminology

The following section explains key Test Studio terminology.

### Test cases

Test cases are made up of a series of instructions or actions, called test steps. Test cases are executed to validate that your app, or specific features in your app, is working as you expect. For example, in an Expense app, you would like to ensure that only expenses with associated actual cost can be submitted. A test case can help verify that this condition or requirement is always met.

In Test Studio, test steps are written using the Power Apps expression language. Test expressions can consist of both the functions available when building your app and additional expressions to support automated testing.

### Test suites

Test suites are used to organize or group test cases together. As the number of test cases in the app grows, you might consider organizing the test cases in specific features or functionality. For example, you might have one test suite with test cases to validate expense report submissions and another test suite that focuses just on expense approvals.

Test cases contained in test suites are run sequentially. The app state is persisted across all test cases in a suite. For example, if you have a test case that completes on Screen 5 in your app, the next test case in your test suite will begin running from Screen 5. It allows you to break down a complex test scenario into multiple test cases within a single suite, and the state is shared across all test cases. If your second test case expects to begin at the start screen of the app, you can navigate to the start screen as the first step in your test case. It's important to remember that the app is not reloaded at the beginning of every test case in a test suite when planning your test execution.

### Test assertions

Every test case should have an expected result. To validate the expected result of a test against the actual result of your test, you can write test assertions. An assertion is an expression that evaluates to true or false in the test. If the expression returns false, the test case will fail.

In the expense app example above, you can write an assertion to validate whether an expense report is created with an expense line item having zero cost associated.

## Best practices

When testing canvas apps using Test Studio, consider the following best practices to gain maximum benefits to improve your app quality:

1. **Determine which test cases should be automated.**

    It's difficult to automate all tests and we do not recommend that you completely rely on test automation. Manual testing should be performed in addition to test automation. Tests best suited to automation are:

    - Repetitive tests.
    - High business impact functionality tests.
    - Features that are stable and not undergoing significant change.
    - Features that require multiple data sets.
    - Manual testing that takes significant time and effort.

2. **Keep test cases small.**

    While a single test case can support testing all functionality in your app, we recommend that you avoid writing a monolithic test case and try to divide it into multiple test cases. Each test case could test a specific feature or functionality in your app. A failed assertion in a large test case might cause other functionality to remain untested. Using multiple test cases contained in a test suite allows other functionality to get tested regardless of whether a previous test case failed. This strategy also makes it easier to isolate test failures.

3. **Keep expressions to a single test action.**

    A test action can contain multiple expressions. Large multi-action test expressions for a single step might impact your ability to debug and isolate any test failures. Consider dividing a test step with multiple actions into more test steps of single actions to identify issues faster.  

4. **Every test case should have an expected result.**

    Each test case should have one or more expected results. Test assertions should be used to validate the expected outcomes of your test against the actual outcomes. Multiple assertions can be written for a single test case.

5. **Use test suites.**

    For maintenance, group or categorize similar test cases together and describe the purpose and expected results of your test.

## Known limitations

While we work to provide full control coverage in Power Apps Test Studio is in progress, the following functionality is currently unavailable:

- Components.
- Code components written in the Power Apps Component Framework.
- Nested galleries.
- Media controls.
- Formula-level error management experimental feature needs to be turned on for the app.
- Support for controls not listed in the [Select](./functions/function-select.md) and [SetProperty](./functions/function-setproperty.md) functions.
- Person-type columns.
- Test Studio is not compatible with the experimental [Git version control feature](git-version-control.md), and will not work properly if that feature is enabled.

## Next steps

- [Working with Test Studio](working-with-test-studio.md)

### See also

- [Automate tests with Azure Pipelines using classic editor](test-studio-classic-pipeline-editor.md)

---

## Working with Test Studio

Source: [working-with-test-studio.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/working-with-test-studio)

*Describes how to use Test Studio with example for testing canvas apps.*

# Working with Test Studio

In this quickstart, you'll create tests for a canvas app called Kudos. You can also explore and discover testing concepts and apply them to writing tests for your own canvas apps. The sample Kudos app is part of a suite of employee engagement apps available to download from [Employee Experience Starter Kit](https://powerapps.microsoft.com/en-us/blog/powerapps-employee-experience-starter-kit).

Watch this video to learn how to work with Test Studio:
> [!VIDEO https://learn-video.azurefd.net/vod/player?id=3fe85f46-745a-411c-aba8-6044cb184e78]

## Open Test Studio

1. Sign in to [Power Apps](https://make.powerapps.com).

2. Create a [new app](get-started-test-drive.md) or [edit an existing app](edit-app.md).

3. Save your app to Power Apps to open Test Studio. 
    
    > [!NOTE]
    > You must save an app before you can write tests for the app.

4. Select **Advanced tools** in the left navigation.

5. Select **Open tests** to open the Test Studio for this application. This action opens Test Studio in a new browser tab.

    ![Open Test Studio.](./media/working-with-test-studio/open-tests.png "Open Test Studio")

> [!NOTE]
> Tests are published and stored in the app package. Exporting and importing a canvas app package to another environment will also include all the test definitions such as test suites and test cases you have created. 

## Create a test suite

By default, a test suite and test case are created for you in Test Studio. Test suites are used to organize your test cases. An app can contain one or more test suites. You can use the default test suite and case to begin writing your tests immediately or create a new test suite.

1. Select **New suite**.
2. Update the **Test suite name and description** by selecting the fields on the main grid.

    ![New test suite.](./media/working-with-test-studio/new-test-suite.png "New test suite")

## Create a test case

Depending on how you want to organize or group your tests, you can create multiple test cases in a test suite. Each case can test a specific feature or a subset of functionalities in your app.

1. Select a test suite.
2. Select **New Case** in the top menu to create a new case.
3. Update the **Test case name and description** by selecting the fields on the main grid.

 ![New test case.](./media/working-with-test-studio/new-test-case.png "New test case")

## Record a test case

A test case consists of test steps that contain actions. Test actions are written using Power Apps expressions that perform a task. You can use the recorder to automatically generate the test steps as you interact with your app. After you record, you can update the test case, add new steps, delete steps, and write test assertions to validate the result of your test.

> [!NOTE]
> Only a published app plays in record mode. Publish any recent changes to the app before you start recording a test case. Recording without publishing recent changes causes the last published version of the app to play in record mode.

1. Select **Record** from the top menu. This action opens the published app with recording mode in a new browser tab.

    > [!IMPORTANT]
    > Recording on an existing test case overrides any existing test steps already present.

    ![Record tests.](./media/working-with-test-studio/record-tests.png "Record tests")

2. Interact with your app. Your actions are  **recorded** in the left pane.

3. Once interaction completes, select **Done**. Optionally, you can select **Cancel** to return to Test Studio without your interactions getting recorded. 

    ![Save recording.](./media/working-with-test-studio/save-recording.png "Save recording")

4. View the test steps and the expressions that were automatically generated for you in Test Studio.

5. Edit the step description text in the main grid if necessary. You can also update the test step actions by selecting the formula on the main grid.

    ![Update test case.](./media/working-with-test-studio/update-test-case.png "Update test case")

### Add test steps and test assertions

Every test case should have an expected result. In the Kudos example, one of the expected results of sending a kudo is creating a new record in the Microsoft Dataverse (Dataverse) database. You'll now update the test case and add additional test steps to validate that a record was created successfully.

Follow these steps to verify a successful record creation:

- Initialize a variable for the kudo record count in the database at the beginning of the test case.
- Initialize a variable for the kudo record count in the database at the end of the test case.
- Write a test assertion expression to validate it incremented by one count. If the count doesn't increase by one, the test assertion fails, and your test case fails.

To add test steps and test assertions in the Kudos app:

1. Select Step 1 or the step above which you want to insert a new step. 

2. Select **Insert a step above** from the top menu or by selecting the option from the active row. This action creates an empty step.

    ![Insert step.](./media/working-with-test-studio/insert-step-above.png "Insert step")

    > [!NOTE]
    > When you select **Insert step above**, a new blank step is added above the current step. You can also use **Assert**, **SetProperty**, **Select** or **Trace** actions instead. This adds a step with a respective action formula that you can edit.

3. Update the step description. For example, "Count Kudo in database".

4. Enter an expression or formula into the action input to count the records in the database before executing the test.

    You can use any supported expression. You can also query any data sources, collections, variables, or run flows that are contained in your app, and create new global variables or collections to use in your tests.

    ```power-fx
    Set(kudosBeforeTest, CountRows(Filter(Kudos, Receiver.Email = "someone@example.com")))```

5. Select Step 2 or the step above which you want to insert a new step.

6. Select **Insert a step above** from the top menu or by selecting the option from the active row. This action creates an empty step.

7. Enter an expression or formula in the action input to [Trace](./functions/function-trace.md) and write the *kudosBeforeTest* value to test the results record.

    ```power-fx
    Trace("kudosBeforeTest : " & kudosBeforeTest);
    ```

    ![Kudos before test.](./media/working-with-test-studio/kudos-before-test.png "Kudos before test")

8. Go to the bottom of the test case and insert a new step to count the records in the database after the test has completed.

    ```power-fx
    Set(kudosAfterTest, CountRows(Filter(Kudos, Receiver.Email = "someone@example.com")))```

9. Add a final step to validate that the record count in the database has increased by a count of 1, and enter the following assertion action to verify:

    ```power-fx
    Assert(kudosAfterTest = kudosBeforeTest + 1, "Kudos count incorrect. Expected : " & kudosBeforeTest + 1  & " Actual :" & kudosAfterTest)
    ```

    ![Kudos after test assert.](./media/working-with-test-studio/kudos-after-test-assert.png "Kudos after test assert")

10. Save the test case from the top-right menu in Test Studio. 

## Play back your test

You can play back your recorded test to validate app functionality. You can play back all tests within a single test suite, or a single test case. 

Before you play the recording back with recent changes, you must publish the app:

![Play without publishing.](./media/working-with-test-studio/publish-test-studio-changes.png "Play without publishing")

> [!IMPORTANT]
> If you skip publishing, the recording  playback will not contain your recent test changes. The last published test case or suite will play  against the app.

1. Select **Publish** to automatically save and publish your test.

    ![Publish changes.](./media/working-with-test-studio/publish-button.png "Publish changes")

2. Select either a test suite or a single test case.

3. Select **Play**. The published app opens in **Play** mode, and you can see your test steps playing back automatically. A green check mark indicates when a test step is executed successfully. If a step fails, a red failure indicator along with a failure message is displayed.

    ![Play mode.](./media/working-with-test-studio/play-mode.png "Play mode")

4. Select **Done** to return to Test Studio.

### Failed assertion

In this section, you'll change the test assertion to experience a failed test:

1. Edit the assertion step by selecting the expression box.

2. Update ```+ 1``` to ```+ 2``` in test action. This update means that the test  expects two records to be created, which is incorrect. If the test is successful, only one record should be created in the database.

    ```power-fx
    Assert(kudosAfterTest = kudosBeforeTest + 2, "Kudos count incorrect. Expected : " & kudosBeforeTest + 2  & " Actual :" & kudosAfterTest)
    ```

    ![Assert count update.](./media/working-with-test-studio/assert-count-update.png "Assert count update")

3. Select **Publish**.

4. Select **Play**.

5. View the test playing back. The final step now fails and shows an error and the message you provided in the assertion step.  

    ![Playback error.](./media/working-with-test-studio/playback-error.png "Playback error")

### Playing tests in a browser

You can copy a link to play a test in separate browser outside Test Studio. It helps integrate your tests in a continuous build and release pipeline such as **Azure DevOps**.

The play link for the selected test is persisted. It doesn't change for the test suite or test case. You can update your tests  without the need to modify build and release processes.

To play tests in your browser:

1. Select a test suite or test case in the right pane.

2. Select **Copy play link**.

    ![Copy play link.](./media/working-with-test-studio/copy-play-link.png "Copy play link")

3. You're prompted to publish your tests if there are any unpublished changes.

    ![Publish before copy link.](./media/working-with-test-studio/publish-before-copy-link.png "Publish before copy link")

4. You can select to skip the publish process and copy the play link. New test changes don't play if you skip.

    ![Play link copied.](./media/working-with-test-studio/copy-play-link-ack.png "Play link copied")

5. Open a browser and paste the URL into the address bar to play the test.

6. View your test playing back.

## Setup your tests

The **OnTestCaseStart** property of a Test Suite can be used to setup your test. The expression entered for this property triggers for every test case in a suite before the case begins executing. **OnTestCaseStart** helps you avoid writing the same test steps at the beginning of every case. You can customize this property to run set up tasks that are common to all cases in the suite such as:

- Always starting test execution from the first screen. 
- Initializing common collections or variables. 
- Fetching test data from a data source for the current executing test 

The **TestCaseInfo** record contains details for the current test that is executing. It contains the following properties:

- *TestCaseName* – the name of the test case.
- *TestCaseDescription* – the description of the test case.
- *TestCaseId* – the ID of the test case.
- *TestSuiteName* – the test suite name that the case belongs to.
- *TestSuiteDescription* – the description of the test suite.
- *TestSuiteId* – the test suite ID that the case belongs to.

In the below example, you'll customize the **OnTestCaseStart** property so every test case begins from the first screen in your app. You'll also fetch the test data from a data source that can be referenced in the steps for the test case.

1. Select **Test** in the left pane or **View** on the suite header.

    ![Test or view set property.](./media/working-with-test-studio/test-or-view-to-set-property.png "Test or view set property")

2. Select the **OnTestCaseStart** action.

3. Input an expression to Navigate to first screen and fetch the test data for your test. 

    ```power-fx
    //Start every cases on the first screen in the Kudos app
    Navigate('Dashboard Screen');

    //Initialize my test data for the current case. 
    Set(currentTestData, LookUp(KudosTestData, TestCase = TestCaseInfo.TestCaseName));

    //Set kudosBeforeTest to 0
    Set(kudosBeforeTest, 0)
    ```
    ![OnTestCaseStart example.](./media/working-with-test-studio/ontestcasestart-example.png "OnTestCaseStart example")

## Processing test results

The test panel visible when playing back tests in Test Studio isn't visible when using a browser. Because of this behavior, you can't determine the specific test step that executes, or if a test passes or fails.

To determine test results outside of Test Studio, there are two properties called **OnTestCaseComplete** and **OnTestSuiteComplete** available in the test object that you can use to process the results of your tests. When integrating tests into a continuous build and release pipeline like **Azure DevOps**, these properties can be used to determine if you should proceed with the app deployment.

The expression entered for these properties triggers when each case or suite completes. You can customize these properties to process and send the results of your tests to various data sources or services such as:

- SQL Server.
- Dataverse.
- Power Automate.
- Email using Office 365.

These settings apply to every test suite or test case in your app. After each test suite or test case completes, the test results and any trace messages contained in the tests are available in the **TestCaseResult** and **TestSuiteResult** records.

The **TestCaseResult** record contains the following properties:

- *TestCaseName* – the name of the test case.
- *TestCaseDescription* – the description of the test case.
- *TestCaseId* – the ID of the test case.
- *TestSuiteName* – the test suite name that the case belongs to.
- *TestSuiteDescription* – the description of the test suite.
- *TestSuiteId* – the test suite ID that the case belongs to.
- *StartTime* – the start execution time of the test.
- *EndTime* – the end execution time of the test.
- *Traces* – the result of any test assertions and any messages from the Trace function.
- *Success* – indicates if the test case completed successfully.
- *TestFailureMessage* – if the case failed, the failure message.

The **TestSuiteResult** record contains the following properties: 

- *TestSuiteName* – the test suite name.
- *TestSuiteDescription* – the description of the test suite. 
- *TestSuiteId* – the test suite ID.
- *StartTime* – the start execution time of the test suite.
- *EndTime* – the end execution time of the test suite.
- *TestsPassed* – the number of test cases that completed successfully in the suite.
- *TestsFailed* - the number of test cases that failed in the suite.

In this quickstart, you'll create two custom tables in the Dataverse database to store the test results by customizing the **OnTestCaseComplete** and **OnTestSuiteComplete** properties:

1. Select **Test** in the left pane or **View** on the suite header.

    ![Test or view set property.](./media/working-with-test-studio/test-or-view-to-set-property.png "Test or view set property")

2. Select the **OnTestCaseComplete** action.

3. Input an expression to process the results of your test. The following sample saves each test case's results to the custom AppTestResults table in Dataverse. The test results can optionally be stored to SQL, SharePoint, or any other data source. You might need to set or increase the Trace field in your data source as required.

    > [!NOTE]
    > The following samples connect to Microsoft Dataverse. You can create a [simple app](data-platform-create-app.md) or [build an app from scratch](data-platform-create-app-scratch.md) using Dataverse. Also, refer to the [Patch](./functions/function-patch.md) function reference for more details to modify records of a data source used in the following samples.

    ```power-fx
    //Save to Dataverse
    Patch(AppTestResults
    , Defaults(AppTestResults)
    , {
             TestPass: TestCaseResult.TestCaseName & ":" & Text(Now())
             ,TestSuiteId: TestCaseResult.TestSuiteId
             ,TestSuiteName: TestCaseResult.TestSuiteName
             ,TestCaseId: TestCaseResult.TestCaseId
             ,TestCaseName: TestCaseResult.TestCaseName
             ,StartTime: TestCaseResult.StartTime
             ,EndTime: TestCaseResult.EndTime
             ,TestSuccess: TestCaseResult.Success
             ,TestTraces: JSON(TestCaseResult.Traces)
             ,TestFailureMessage: TestCaseResult.TestFailureMessage
    }
    );
    ```
    ![OnTestCaseComplete example.](./media/working-with-test-studio/ontestcasecomplete-example.png "OnTestCaseComplete example")

4. Select the **OnTestSuiteComplete** action.

5. Input an expression to process the results of your test. In the following sample, you'll save each test suite's results to the custom AppTestSuiteResults table in Dataverse. 

    ```power-fx
    //Save to Dataverse
    Patch(AppTestSuiteResults
        , Defaults(AppTestSuiteResults)
        , {
             TestSuiteId: TestSuiteResult.TestSuiteId
             ,TestSuiteName: TestSuiteResult.TestSuiteName
             ,StartTime: TestSuiteResult.StartTime
             ,EndTime: TestSuiteResult.EndTime
             ,TestPassCount: TestSuiteResult.TestsPassed
             ,TestFailCount: TestSuiteResult.TestsFailed
        }
    );
    ```

    ![OnTestSuiteComplete example.](./media/working-with-test-studio/ontestsuitecomplete-example.png "OnTestSuiteComplete example")

Other examples of expressions you could use in these properties are:

- Send results to a flow in Power Automate.

    ```power-fx
    MyTestResultsFlow.Run(JSON(TestCaseResult))
    ```

- Email your results.

    ```power-fx
    Office365.SendMailV2("someone@example.com", "Test case results", JSON(TestCaseResult, JSONFormat.IndentFour))
    ```

- Receive an app notification of the test result.

  For example, receive a notification after the test completes when playing the test in a browser, outside of Test Studio.

    ```power-fx
    Notify(TestCaseResult.TestCaseName & " : "
            & If( TestCaseResult.Success
                , " Passed"
                , TestCaseResult.TestFailureMessage)
            ,If(  TestCaseResult.Success
                , NotificationType.Success
                , NotificationType.Error)
    )
    ```

## Test Functions

In addition to the [functions](formula-reference.md) available in Power Apps, the following are common functions that you'll typically use when authoring tests:

- [Select](./functions/function-select.md)
- [SetProperty](./functions/function-setproperty.md)
- [Assert](./functions/function-assert.md)
- [Trace](./functions/function-trace.md)

## Next steps

- [Automate tests with Azure Pipelines using classic editor](test-studio-classic-pipeline-editor.md)

---

## Automate tests with Azure Pipelines using classic editor

Source: [test-studio-classic-pipeline-editor.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor)

*Describes how to automate test suites and cases using the classic editor from Azure Pipelines.*

# Automate tests with Azure Pipelines using classic editor

In this article, you'll learn how to set up and run your canvas app tests built in Test Studio using the [Azure Pipelines classic editor](/azure/devops/pipelines/get-started/pipelines-get-started#define-pipelines-using-the-classic-interface) in [Azure DevOps Services](/azure/devops/user-guide/what-is-azure-devops).

You can use a public project on GitHub - [Microsoft/PowerAppsTestAutomation](https://github.com/microsoft/PowerAppsTestAutomation) to:

- Automate operations of signing in to your application.
- Open a browser on the build agent and execute a set of test cases and suites.
- View the status of the test execution in the Azure DevOps pipeline.

## Prerequisites

Before you begin, you must complete the following steps:

- [Fork](#step-1---fork-the-powerappstestautomation-project) the [Microsoft/PowerAppsTestAutomation](https://github.com/microsoft/PowerAppsTestAutomation) project on GitHub.

    > [!NOTE]
    > Public forks can’t be made private. If you want to create a private repo, please [duplicate the repository](https://help.github.com/github/creating-cloning-and-archiving-repositories/duplicating-a-repository).

- Create a new [*Test URL .json file*](#step-2---create-test-url-json-file) in the repo with the App Test URLs you want to run from the pipeline.

### Step 1 - Fork the PowerAppsTestAutomation project

A [fork](https://help.github.com/github/getting-started-with-github/fork-a-repo) is a copy of a repository. By forking a repository, you can make changes without affecting the original project.

1. Sign in to [GitHub](https://github.com/).

1. Go to the [microsoft/PowerAppsTestAutomation](https://github.com/microsoft/PowerAppsTestAutomation) repository. You can also search for **microsoft/PowerAppsTestAutomation** instead, and then select the repository:

    ![Search GitHub.](media/test-studio-classic-pipeline-editor/search-github.png "Search GitHub")

1. Select **Fork**:

    ![Select Fork.](media/test-studio-classic-pipeline-editor/fork.png "Select Fork")

1. Select where you want to fork:

    ![Select fork account.](media/test-studio-classic-pipeline-editor/fork-account.png "Select fork account")

Your forked repository will now be available.

### Step 2 - Create Test URL .json file

The Test URL .json file will contain the test suite and test case URLs for validating your app. The app test suite and test case URLs can be retrieved by selecting the [Copy play link](working-with-test-studio.md#playing-tests-in-a-browser) in Test Studio.

You can find a sample file ```Samples/TestAutomationURLs.json``` in the repo you created earlier.

1. Create a new ```TestURLs.json``` file in your repo, or use any other file name. <br> The file name and location will be mapped in the pipeline variables later in the document.

1. Copy the format from the ```Samples/TestAutomationURLs.json``` file.

1. Update the Test URLs section with the tests that you want to validate in your app.

1. Commit the changes to your repo:

    ![JSON updated.](media/test-studio-classic-pipeline-editor/json-update.png "JSON updated")

## Create a pipeline

1. Sign in to your Azure DevOps instance.

1. Select an existing project or create a new project.

1. Select **Pipelines** in the left menu.

1. Select **Create Pipeline**:

    ![Created pipeline.](media/test-studio-classic-pipeline-editor/create-pipeline.png "Created pipeline")

1. Select **Use the classic editor**:

    ![Classic editor.](media/test-studio-classic-pipeline-editor/use-classic-editor.png "Classic editor")

1. Select GitHub as the source.

1. If necessary, authorize your GitHub connection using OAuth or using a
    personal access token:

    ![Pipeline in GitHub.](media/test-studio-classic-pipeline-editor/pipeline-github.png "Pipeline in GitHub")

1. If needed, edit the connection name.

1. Select **...** (ellipsis) from the right side of **Repository** input.

1. Enter the name of your project on GitHub, and then **Select** it:

    ![Select a repo.](media/test-studio-classic-pipeline-editor/select-repo.png "Select a repo")

1. Select **Continue**.

1. In the Select a template screen, select **Empty job**:

    ![Select Empty job.](media/test-studio-classic-pipeline-editor/empty-job.png "Select Empty job")

1. **Save** your pipeline.

## Add tasks to the pipeline

You'll now add new job tasks and configure the tasks to run the tests
from the pipeline in this sequence:

1. [Configure screen resolution using PowerShell.](#step-1---configure-screen-resolution-using-powershell)

1. [Restore NuGet packages for the PowerAppsTestAutomation solution.](#step-2---restore-nuget-packages)

1. [Build the PowerAppsTestAutomation solution.](#step-3---build-the-powerappstestautomation-solution)

1. [Add Visual Studio Tests for Google Chrome.](#step-4---add-visual-studio-tests-for-google-chrome)

1. [Add Visual Studio Tests for Mozilla Firefox.](#step-5---add-visual-studio-tests-for-mozilla-firefox)

### Step 1 - Configure screen resolution using PowerShell

1. Select **+** next to *Agent job 1*.

1. Search for **PowerShell**.

1. Select **Add** to add a PowerShell task to the job:

    ![Add PowerShell.](media/test-studio-classic-pipeline-editor/powershell.png "Add PowerShell")

1. Select the task. <br>
    You can also update the display name to *Set Agent Screen
    Resolution to 1920 x 1080* or similar.

1. Select **Inline** as the script type, and enter the following in the script window:

    ```powershell
    # Set agent screen resolution to 1920x1080 to avoid sizing issues with Portal  
    Set-DisplayResolution -Width 1920 -Height 1080 -Force
    # Wait 10 seconds  
    Start-Sleep -s 10
    # Verify Screen Resolution is set to 1920x1080  
    Get-DisplayResolution
    ```

    ![Script example.](media/test-studio-classic-pipeline-editor/script.png "Script example")

### Step 2 - Restore NuGet packages

1. Select **+** next to *Agent job 1*.

1. Search for **NuGet**.

1. Select **Add** to add a NuGet task to the job.

1. Select the task.
    <br> You can also update the display name to **Restore NuGet
    Packages** or similar.

1. Select **…** (ellipsis) in the **Path to solution, packages.config, or project.json** configuration field.

1. Select the PowerAppsTestAutomation.sln solution file.

1. Select **OK**:

    ![NuGet package.](media/test-studio-classic-pipeline-editor/nuget.png "NuGet package")

### Step 3 - Build the PowerAppsTestAutomation solution

1. Select **+** next to *Agent job 1*.

1. Search for **Visual Studio build**.

1. Select **Add** to add a Visual Studio build task to the job.

1. Select the task.
    <br> You can also update the display name to **Build Power Apps
    Test Automation Solution** or similar.

1. Select **…** (ellipsis) in the **Solution** configuration field.

1. Select the PowerAppsTestAutomation.sln solution file.

1. Select **OK**.

### Step 4 - Add Visual Studio Tests for Google Chrome

1. Select **+** next to *Agent job 1*.

1. Search for **Visual Studio Test**.

1. Select **Add** to add a Visual Studio Test task to the job.

1. Select the task.
    <br> You can also update the display name to **Run Power Apps
    Test Automation Tests via \$(BrowserTypeChrome)** or similar.

1. Remove the default entries in the **Test files** text field and add the following:

    ```**\Microsoft.PowerApps.TestAutomation.Tests\bin\\Debug\Microsoft.PowerApps.TestAutomation.Tests.dll```

1. Enter ```TestCategory=PowerAppsTestAutomation``` in the **Test filter criteria** field.

1. Select **Test mix contains UI tests**.

    ![Test mix contains UI tests.](media/test-studio-classic-pipeline-editor/chrome.png "Test mix contains UI tests")

1. Select **…** (ellipsis) in the **Settings file** field.

1. Expand the **Microsoft.PowerApps.TestAutomation.Tests**, select the
    **patestautomation.runsettings** file, and then select **OK**:

    ![Run settings.](media/test-studio-classic-pipeline-editor/runsettings.png "Run settings")

1. Copy the following in the **Override test run parameters** field.

    ```
    -OnlineUsername "$(OnlineUsername)" -OnlinePassword "$(OnlinePassword)" -BrowserType "$(BrowserTypeChrome)" -OnlineUrl "$(OnlineUrl)" -UsePrivateMode "$(UsePrivateMode)" -TestAutomationURLFilePath "$(TestAutomationURLFilePath)" -DriversPath "$(ChromeWebDriver)"
    ```

    > [!NOTE]
    > This is where the variables in the pipeline are configured, represented above in the form of \$(VariableName).

1. Enter **Run Power Apps Test Automation Tests via \$(BrowserTypeChrome)** or similar in the **Test run title** field.

    ![Test run.](media/test-studio-classic-pipeline-editor/test-run.png "Test run")

### Step 5 - Add Visual Studio Tests for Mozilla Firefox

1. Right-click the **Add Visual Studio Tests for Chrome** task and select **Clone task(s)**.

1. Select the task and update the following areas:

    1. **Title**: Run Power Apps Test Automation Tests via
        \$(BrowserTypeFirefox)

    1.  **Override test run parameters**

        ```
        -OnlineUsername "$(OnlineUsername)" -OnlinePassword "$(OnlinePassword)" -BrowserType "$(BrowserTypeFirefox)" -OnlineUrl "$(OnlineUrl)" -UsePrivateMode "$(UsePrivateMode)" -TestAutomationURLFilePath "$(TestAutomationURLFilePath)" -DriversPath "$(GeckoWebDriver)"
        ```

    1.  **Test Run Title**: Run Power Apps Test Automation Tests via
        \$(BrowserTypeFirefox)

## Configure pipeline variables

You'll now configure the pipeline variables defined in the tasks you've added [earlier](#add-tasks-to-the-pipeline).

1. Select the **Variables** tab.

1. Select **Add** and repeat this step to configure the following variables:

| Variable name             | Variable value                                                                                                                 |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| BrowserTypeChrome         | Chrome                                                                                                                         |
| BrowserTypeFirefox        | Firefox                                                                                                                        |
| OnlineUrl                 | <https://make.powerapps.com>                                                                                                   |
| TestAutomationURLFilePath | ```$(Build.SourcesDirectory)\<test URL file>.json``` <br>**Note:** This is the [*Test URLs .json*](#step-2---create-test-url-json-file) file you created earlier.                      |
| UsePrivateMode            | true                                                                                                                           |
| OnlineUsername            | Enter the Microsoft Entra email address of the user context that will sign in to the application. Tests will run under the context of this user account. Ensure this user has the ability to run the app and connect to any data sources the app might connect to. |

1. Select **Add** and enter **OnlinePassword** in the variable name.

1. Check the lock image to make this variable a secret.

    ![Make variable secret.](media/test-studio-classic-pipeline-editor/variables.png "Make variable secret")

1. **Save** your pipeline configurations.

## Run and analyze tests

To validate that your tests are executing successfully, select **Queue** and then select **Run**. Your job will start running.

![Run job.](media/test-studio-classic-pipeline-editor/run-job.png "Run job")

As the job runs, select the job to see a detailed status on each of the tasks running:

![Job details.](media/test-studio-classic-pipeline-editor/job-details.png "Job details")

When the job completes, you can view the high-level job summary, and any errors or warnings. By selecting the **Tests** tab, you can view specific details on the test cases you've executed.

The following example indicates at least one of our test cases has failed while executing the tests using the Chrome browser:

![Chrome - failed.](media/test-studio-classic-pipeline-editor/chrome-failed.png "Chrome - failed")

Select **RunTestAutomation** test to drill into the details on what test case has failed. In the **Attachments** tab, you can see the summary of the test execution and which test cases have failed or passed in your test suite:

![Attachments tab.](media/test-studio-classic-pipeline-editor/attachments-tab.png "Attachments tab")

> [!NOTE]
> If you execute a test suite, you'll see a summary of test cases passed and failed. If you execute a test case, you'll see specific details on the failure with any trace information, if available.

## Known limitations

- Multifactor authentication isn't supported.

- Test summary will report a single test result per browser. The test result will contain one or more test cases or test suite results. 

- Any authentication process other tha Microsoft Entra sign-in flow requires customization of the sign-in process in the **PowerAppsTestAutomation** solution.

### See also

- [Test Studio overview](test-studio.md)
- [Working with Test Studio](working-with-test-studio.md)
- [Configure pipeline using YAML](test-studio-yaml-pipeline.md)

---

## Automate tests with Azure Pipelines using YAML

Source: [test-studio-yaml-pipeline.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/test-studio-yaml-pipeline)

*Describes how to automate test suites and cases using an Azure Pipelines YAML.*

# Automate tests with Azure Pipelines using YAML

In this article, you'll learn how to set up and run your canvas app tests built in the Test Studio by using a [YAML pipeline](/azure/devops/pipelines/get-started/pipelines-get-started#define-pipelines-using-yaml-syntax) in [Azure DevOps Services](/azure/devops/user-guide/what-is-azure-devops).

You can use a public project on GitHub&mdash;[Microsoft/PowerAppsTestAutomation](https://GitHub.com/microsoft/PowerAppsTestAutomation)&mdash;to:

- Automate the operations of signing in to your application.
- Open a browser on the build agent and execute a set of test cases and suites.
- View the status of the test execution in the Azure DevOps pipeline.

## Prerequisites

Before you begin, you must complete the following steps:

- [Fork](#step-1---fork-the-powerappstestautomation-project) the [Microsoft/PowerAppsTestAutomation](https://GitHub.com/microsoft/PowerAppsTestAutomation) project on GitHub.

    > [!NOTE]
    > Public forks can't be made private. If you want to create a private repo, you need to [duplicate the repository](https://help.GitHub.com/GitHub/creating-cloning-and-archiving-repositories/duplicating-a-repository).

- Create a new [Test URLs .json file](#step-2---create-a-test-url-json-file) that includes the app test URLs you want to run from the pipeline.

- Create a new [Azure Pipelines YAML file](#step-3---create-an-azure-pipelines-yaml-file). 

- Create a [GitHub service connection](#step-4---create-a-github-service-connection) to your repo.

### Step 1 - Fork the PowerAppsTestAutomation project

A *[fork](https://help.GitHub.com/GitHub/getting-started-with-GitHub/fork-a-repo)* is a copy of a repository. By forking a repository, you can make changes without affecting the original project.

1. Sign in to [GitHub](https://GitHub.com/).

1. Go to the [microsoft/PowerAppsTestAutomation](https://GitHub.com/microsoft/PowerAppsTestAutomation) repository. You can also search for **microsoft/PowerAppsTestAutomation** instead, and then select the repository.

    ![Search GitHub.](media/test-studio-classic-pipeline-editor/search-GitHub.png "Search GitHub")

1. Select **Fork**.

    ![Select Fork.](media/test-studio-classic-pipeline-editor/fork.png "Select Fork")

1. Select where you want to locate the fork.

    ![Fork account.](media/test-studio-classic-pipeline-editor/fork-account.png "Fork account")

Your forked repository will now be available.

### Step 2 - Create a test URL .json file

The test URL .json file will contain the test suite and test case URLs for validating your app. The app test suite and test case URLs can be retrieved by selecting the [copy play link](working-with-test-studio.md#playing-tests-in-a-browser) in Test Studio.

You can find a sample file, Samples/TestAutomationURLs.json, in the repo you created earlier.

1. Create a new file named TestURLs.json file in your repo, or use any file name you want. The file name and location will be mapped in the pipeline variables later in the document.

1. Copy the format from the Samples/TestAutomationURLs.json file.

1. Update the **Test URLs** section with the tests that you want to validate in your app.

1. Commit the changes to your repo.

    ![Update the JSON file.](media/test-studio-classic-pipeline-editor/json-update.png "Update the JSON file")

### Step 3 - Create an Azure Pipelines YAML file

You can find a sample file, Samples/azure-pipelines.yml, in the repo you created earlier.

1. Create a new file named azure-pipelines.yml file in your repo.

1. Copy the content from the Samples/azure-pipelines.yml file.

1. Commit the changes to your repo. You'll reference and update the azure-pipelines.yml file when you're configuring your pipeline in Step 4.

### Step 4 - Create a GitHub service connection

1. Sign in to your Azure DevOps instance.

1. Select an existing project, or create a new project.

1. Select **Project settings** at the bottom of the left navigation pane.

    ![Create a pipeline.](media/test-studio-yaml-pipeline/project-settings.png "Create a pipeline")

1. Under **Pipelines**, select **Service connections**.

    ![Service connections.](media/test-studio-yaml-pipeline/select-service-connections.png "Service connections")

1. Select **Create service connection**.

1. Select the **GitHub** service.

1. Select **Next**.

    ![GitHub service connection.](media/test-studio-yaml-pipeline/select-GitHub.png "GitHub service connection")

1. Under **OAuth Configuration**, select **AzurePipelines**.

1. Select **Authorize**.

    ![Authorize the service connection.](media/test-studio-yaml-pipeline/azure-pipelines-authorize.png "Authorize the service connection")

1. Optionally, you can update the **Service connection name**.

1. Select **Save**.

    ![Save the service connection.](media/test-studio-yaml-pipeline/service-connection-save.png "Save the service connection")

## Create a pipeline

1. Select **Pipelines** in the left navigation pane.

1. Select **Create Pipeline**.

    ![Select Create a pipeline.](media/test-studio-classic-pipeline-editor/create-pipeline.png "Select Create a pipeline")

1. Select **GitHub YAML**.

    ![GitHub YAML.](media/test-studio-yaml-pipeline/use-github-yaml.png "GitHub YAML")

1. Search for or select your repo.

    ![Select repo.](media/test-studio-yaml-pipeline/select-repo.png "Select repo")

1. Select **Existing Azure Pipelines YAML file**.

1. Set the path to the [Azure YAML pipeline file](#step-3---create-an-azure-pipelines-yaml-file) you created earlier.

1. Select **Continue**:

    ![Review YAML.](media/test-studio-yaml-pipeline/use-existing-pipelines-yaml.png "Review YAML")

    The azure-pipelines.yml file appears.

    ![Review Azure YAML.](media/test-studio-yaml-pipeline/review-pipeline-yaml.png "Review Azure YAML")

1. Update **repositories name** to your repo. 

1. Update **endpoint** to the name of the [GitHub service connection](#step-4---create-a-github-service-connection) you created earlier.

    ![YAML endpoint.](media/test-studio-yaml-pipeline/update-yaml-endpoint.png "YAML endpoint")

1. Update the **TestAutomationURLs** file name. This is the [test URLs .json file](#step-2---create-a-test-url-json-file) file you created earlier.

1. Update the **LocalProjectName** value to your repo name, if you changed it.

1. Update the **TestAutomationURLFilePath** to the location of the test URLs .json file in your repo.

    ![Test parameters.](media/test-studio-yaml-pipeline/update-yaml-test-file.png "Test parameters")

1. Select **Variables**.

1. Add a variable named **OnlineUsername**, and set the value to the Microsoft Entra email address of the user context who will sign in to the application. Tests will run under the context of this user account.

1. Select **OK**.

1. Add another variable named **OnlinePassword**. Set the value to the password of the Microsoft Entra account created earlier.

1. Select **Keep this value secret** and **Let users override this value when running this pipeline**.
 
    ![Pipeline variables.](media/test-studio-yaml-pipeline/set-password-variable.png "Pipeline variables")

1. **Save** and **Commit** the changes to your repo.  

    ![Save the pipeline configuration.](media/test-studio-yaml-pipeline/save-pipeline.png "Save the pipeline configuration")

## Run and analyze tests

To validate whether your tests are being successfully executed, select **Run**. Optionally, you can optionally select the server image to run your tests and also the browser types.

![Run job.](media/test-studio-yaml-pipeline/run-job.png "Run job")

As the job runs, select it to see detailed status for each of the tasks that are running.

![Job details.](media/test-studio-yaml-pipeline/job-details.png "Job details")

When the job is completed, you can view the high-level job summary and any errors or warnings. By selecting the **Test** tab, you can view specific details on the test cases you've executed.

The following example indicates that at least one of our test cases has failed while executing the tests by using the Chrome browser.

![Chrome - failed.](media/test-studio-classic-pipeline-editor/chrome-failed.png "Chrome - failed")

Select **RunTestAutomation** to drill into the details about the failed test cases<!--Edit okay?-->. On the **Attachments** tab, you can see the summary of the test execution and which test cases have failed or passed in your test suite.

![Attachments tab.](media/test-studio-classic-pipeline-editor/attachments-tab.png "Attachments tab")

> [!NOTE]
> If you execute a test suite, you'll see a summary of test cases that have passed and failed. If you execute a test case, you'll see specific details about the failure with any trace information, if available.

## Known limitations

- Multi-factor authentication isn't supported.

- The test summary will report a single test result per browser. The test result will contain one or more test cases or test suite results.

- For any authentication process other tha Microsoft Entra sign-in, you'll need to customize the sign-in process in the **PowerAppsTestAutomation** solution.

### See also

- [Test Studio overview](test-studio.md)
- [Working with Test Studio](working-with-test-studio.md)
- [Automate tests with Azure Pipelines using classic editor](test-studio-classic-pipeline-editor.md)

---

