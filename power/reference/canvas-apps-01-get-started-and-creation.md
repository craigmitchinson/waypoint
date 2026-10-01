# Power Apps Canvas Apps — Get Started & Create Canvas Apps

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 14

## Contents

1. [Complete guide to building canvas applications](#complete-guide-to-building-canvas-applications)
2. [Keyboard shortcuts for canvas apps](#keyboard-shortcuts-for-canvas-apps)
3. [Create a blank canvas app from scratch](#create-a-blank-canvas-app-from-scratch)
4. [Create and edit canvas apps with AI code generation tools](#create-and-edit-canvas-apps-with-ai-code-generation-tools)
5. [Build apps through conversation with Copilot](#build-apps-through-conversation-with-copilot)
6. [Edit your app with Copilot in Power Apps Studio (preview)](#edit-your-app-with-copilot-in-power-apps-studio-preview)
7. [Use field suggestions by Copilot](#use-field-suggestions-by-copilot)
8. [Create a canvas app using Microsoft Dataverse](#create-a-canvas-app-using-microsoft-dataverse)
9. [Integrate SharePoint Online into Power Apps overview](#integrate-sharepoint-online-into-power-apps-overview)
10. [Create a canvas app with data from a list](#create-a-canvas-app-with-data-from-a-list)
11. [Link lists using a lookup column in Power Apps](#link-lists-using-a-lookup-column-in-power-apps)
12. [Understand SharePoint forms integration](#understand-sharepoint-forms-integration)
13. [Understand SharePoint forms integration](#understand-sharepoint-forms-integration-1)
14. [Create a canvas app based on Excel data](#create-a-canvas-app-based-on-excel-data)

---

## Complete guide to building canvas applications

Source: [getting-started.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/getting-started)

*Learn to build custom canvas apps in Power Apps without coding. Create business applications that connect to data sources, work across devices, and streamline workflows. Start building today.*

# What are canvas apps?

Canvas apps are custom business applications you can create in Microsoft Power Apps without writing code. Think of a canvas as a blank design surface where you can drag and drop components to build exactly the user interface you need. Whether you're creating a simple data entry form or a complex business workflow, canvas apps give you the flexibility to design solutions that work the way your business works.

With canvas apps, you can:

- Connect to [data from hundreds of sources](connections-list.md), including Microsoft 365, Dataverse, SharePoint, and other data sources
- Create responsive designs that work seamlessly across browsers and mobile devices
- Use AI-powered Copilot to build apps through natural language conversations
- Share your apps securely within your organization
- Embed apps directly in SharePoint, Power BI, and Microsoft Teams

This overview helps you understand how to get started building canvas apps and guide you through the key concepts for creating effective business solutions.


## Build an app

The following articles provide guidance on building apps:

- [Create a plan](../plan-designer/create-plan.md)
- [Create a blank canvas app from scratch](create-blank-app.md) 
- [Build apps through conversation with Copilot](ai-conversations-create-app.md)
- [Create a canvas app using Microsoft Dataverse](data-platform-create-app-scratch.md)
- [Create a canvas app with data from a list](app-from-sharepoint.md)
- [Create a canvas app based on Excel data](get-started-create-from-blank.md)


For more information on where makers can create apps, see [Get started with Power Apps](intro-maker-portal.md).

After you generate an app automatically, customize its default appearance and behavior based on your users' workflows. For example, change which types of data appear, how they're sorted, or whether users specify a number by typing it or adjusting a slider. Add and customize [screens](add-screen-context-variables.md), [galleries](customize-layout-sharepoint.md), [forms](customize-forms-sharepoint.md), and other controls.

After you generate and customize an app automatically, create an app from scratch based on [Dataverse](data-platform-create-app-scratch.md), [Excel](get-started-create-from-blank.md), or another data source. By working from the ground up, you get flexibility in app design, flow, and controls, and you can use a larger variety of data sources.

If you're new to Power Apps and want to turn your ideas into a working solution, start with [Planning a Power Apps project](../../guidance/planning/introduction.md).

## Connect to data

Canvas apps can connect to a wide variety of data sources. Choose the data source that best fits your scenario:

- **[Microsoft Dataverse](data-platform-create-app-scratch.md)** &ndash; Use Dataverse as your primary data store for business applications with built-in security, logic, and data management.
- **[SharePoint](app-from-sharepoint.md)** &ndash; Build apps on top of SharePoint lists to extend your existing collaboration workflows.
- **[Excel](get-started-create-from-blank.md)** &ndash; Create apps based on Excel workbooks stored in cloud storage like OneDrive or SharePoint.
- **[SQL Server and Azure SQL](/power-apps/maker/canvas-apps/connections/connection-azure-sqldatabase)** &ndash; Connect directly to SQL databases for enterprise data scenarios.
- **[Other connectors](connections-list.md)** &ndash; Browse hundreds of available connectors for services like Dynamics 365, Salesforce, and more.

For guidance on linking Power Apps data to Microsoft Fabric, see [Configure your environment and link to Microsoft Fabric](/power-apps/maker/data-platform/fabric-link-to-data-platform).

## Share and run an app

When you finish the app and save it to the cloud, [share it with others](share-app.md) in your organization. Specify which users or groups can run the app, and whether they can also customize and share it with more people in the organization.

Run your own apps, and any apps shared with you, on Windows, in a [web browser](../../user/run-app-browser.md), or on an [iOS or Android device](/powerapps/mobile/run-powerapps-on-mobile).

## Licensing and trials

To get started with Power Apps, you need the right license for your scenario:

- **Free trial** &ndash; If you don't have a license for Power Apps, you can [sign up for a free trial](../signup-for-powerapps.md). Trial licenses provide access to most Power Apps features for a limited time.
- **Trial extension** &ndash; If your trial is expiring, contact your admin or visit the [Power Platform admin center](https://admin.powerplatform.microsoft.com/) to explore extension options.
- **Developer environment** &ndash; If you don't have an organization account, establish a developer's account through the [Microsoft Developer Program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
- **Licensing overview** &ndash; For detailed plan comparisons, see the [Power Apps pricing page](https://powerapps.microsoft.com/pricing/).

## Troubleshoot common issues

If you encounter issues while building or running canvas apps, the following resources can help:

- **[Known issues for canvas apps](/power-apps/maker/canvas-apps/common-issues-and-resolutions)** &ndash; Solutions for common errors and known limitations.
- **[Performance optimization](/power-apps/maker/canvas-apps/performance-tips)** &ndash; Tips for improving app load times and responsiveness, including slow site performance.
- **[Formula reference](/power-platform/power-fx/formula-reference-canvas-apps)** &ndash; Complete reference for Power Fx formulas and functions used in canvas apps.
- **[Coding guidelines](../../guidance/coding-guidelines/overview.md)** &ndash; Best practices for maintaining clean, performant canvas app code.
- **[Dataverse troubleshooting](/troubleshoot/power-platform/dataverse/welcome-dataverse)** &ndash; Resolve issues with Dataverse connections, including mailbox configuration and solution imports.

If your issue isn't resolved through documentation, you can [create a support request](/power-platform/admin/get-help-support) through the Power Platform admin center.

## Learn more

- Want to turn your ideas into an app? Start with [Planning a Power Apps project](../../guidance/planning/introduction.md).
- Explore step-by-step, conceptual, and reference articles in the navigation pane on the left.
- Check out the [webinars and video gallery](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/bd-p/VideoGallery?featured=yes) to learn how to use Power Apps features and functions.

## Share your experience

* Read and post in the [Power Apps Community](https://aka.ms/powerapps-community), where anyone who uses Power Apps can post a question for others to answer. Before you post a question, search the community to see if your question is already answered.
* Submit an idea to improve Power Apps in the [Power Apps Ideas Forum](https://ideas.powerapps.com/).
* If you're a Power Apps admin for your organization, open a support ticket in the [Power Platform admin center](https://admin.powerplatform.microsoft.com/support).

---

## Keyboard shortcuts for canvas apps

Source: [keyboard-shortcuts.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/keyboard-shortcuts)

*Learn about the different keyboard shortcuts available to run various actions and operations within canvas apps.*

# Keyboard shortcuts for canvas apps

> [!NOTE]
> Shortcuts can vary based on keyboard layout.

## File

| Shortcut | Action |
|--|--|
| Ctrl+Shift+S (or Alt+P) | Save the app with a different name |
| Ctrl+S | Save the app with the same name or for the first time |
| Ctrl+Shift+P | Save the app and activate the publish dialog |
| F12 | Download the app file (.msapp) |

## Ribbon

| Shortcut | Action |
|--|--|
| Enter | Run the selected command |
| Tab | Move between commands on the selected tab, then to the next tab |
| Alt+I | Select the **Insert** tab |

## Editing

| Shortcut | Action |
|--|--|
| Ctrl+A | Select all |
| Ctrl+X | Cut |
| Ctrl+C | Copy |
| Ctrl+V | Paste |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl+=, Ctrl+Shift+=, or Ctrl+Mouse wheel up | Zoom in |
| Ctrl+-, Ctrl+Shift+-, or Ctrl+Mouse wheel down | Zoom out |
| Ctrl+0 | Fit canvas to page |
| <kbd>Enter</kbd> or <kbd>Shift</kbd>+<kbd>Enter</kbd> | Select a suggestion in a formula without adding a new line (Enhanced formula bar shortcuts is turned off) |
| <kbd>Enter</kbd> | Select a suggestion in a formula and create a new line (Enhanced formula bar shortcuts must be turned on)|
| <kbd>Shift</kbd>+<kbd>Enter</kbd> | Create a new line in a formula without keeping the suggestion (Enhanced formula bar shortcuts must be turned on)| |

> [!IMPORTANT]
> To use keyboard shortcuts for the formula bar, turn on **Enhanced formula bar shortcuts**. In Power Apps, go to [**Settings**](intro-maker-portal.md#settings), and then select **Power App settings**. On the **Editing** tab, turn on **Enhanced formula bar shortcuts**.


## Preview

| Shortcut | Action |
|--|--|
| F5 | Open Preview mode |
| Esc | Close Preview mode, a dialog box, or a flyout pane |

## Canvas

| Shortcut | Action |
|--|--|
| <kbd>Tab</kbd> | Select the next control |
| <kbd>Shift</kbd>+<kbd>F11</kbd> | Set focus to the inline action bar |
| Hold down <kbd>Ctrl</kbd> while selecting or hold down <kbd>Shift</kbd> while selecting | Select multiple objects at once |
| <kbd>Right arrow</kbd> | Move the selected control to the right |
| <kbd>Left arrow</kbd> | Move the selected control to the left |
| <kbd>Up arrow</kbd> | Move the selected control up |
| <kbd>Down arrow</kbd> | Move the selected control down |

## Tree view

> [!NOTE]
> These shortcuts work when the **Tree view** pane has focus.

| Shortcut | Action |
|--|--|
| F2 | Rename a control |
| Esc | Cancel renaming a control |
| Ctrl+G | Group or ungroup controls |
| Ctrl+] | Bring a control forward |
| Ctrl+[ | Send a control backward |
| Ctrl+Shift+] | Bring to front |
| Ctrl+Shift+[ | Send to back |

## Resize

| Shortcut | Action |
|--|--|
| Shift+Left arrow | Decrease width |
| Ctrl+Shift+Left arrow | Decrease width slightly |
| Shift+Down arrow | Decrease height |
| Ctrl+Shift+Down arrow | Decrease height slightly |
| Shift+Right arrow | Increase width |
| Ctrl+Shift+Right arrow | Increase width slightly |
| Shift+Up arrow | Increase height |
| Ctrl+Shift+Up arrow | Increase height slightly |

## Text format

| Shortcut | Action |
|--|--|
| Ctrl+B  | Cycle through levels of bold |
| Ctrl+I | Turn italics on or off |
| Ctrl+U | Add or remove underline |

## Alternate behavior

| Shortcut | Action |
|--|--|
| Alt or Ctrl+Shift | 1. Before selecting a control, hide design elements so that you can interact with the controls as the app's user would.<br>2. After initiating a resize or reposition of a control, holding down these keys overrides any snap points. |

Like an Excel spreadsheet, canvas apps are live and running even when you're editing them. You don't need to switch to preview mode to test your app, so editing and testing are much faster. But this feature creates a challenge: How do you select a button control to resize it instead of selecting it to run the app logic?

When you're in design mode, selecting an object lets you edit it. You can move, resize, change properties, and configure the object. To override this default behavior, hold down the Alt or Ctrl+Shift keys *before* you select the object. This action treats the selection as if a user of the app selected it.

In the following animation, a button control is first selected for editing. Adorners appear around the control, and the formula bar shows the **OnSelect** property, ready to edit. After you release the button, hold down the Alt key and select the button control again. This time, the **OnSelect** property runs, and the notification appears, just like when a user selects the button in a running app.

![Animation that shows holding down the Alt key before selecting a button control, which triggers the OnSelect property and displays a notification.](media/keyboard-shortcuts/alt-select.gif)

You can also use the Alt key *after* you select a control to override snap points when moving or resizing. The next animation shows how to resize a data card in an [**Edit form**](controls/control-form-detail.md) control. At first, resizing is limited to specific snap points. Later, *without releasing the mouse button*, hold down the Alt key. This action overrides the snap points, so you can set any width with the mouse.

![Animation that shows holding down the Alt key while resizing a data card in an Edit form control to override snap points.](media/keyboard-shortcuts/alt-fine-control.gif)

## Other

| Shortcut | Action |
|--|--|
| F1 | Open documentation |
| Ctrl+F6 | Go to the next landmark. It navigates clockwise through the landmarks of a page (for example, headers, navigation bars, main content). Adding the Shift key (Ctrl+Shift+F6) moves through them in counterclockwise order. |
| Ctrl+Shift+F6 | Go to the previous landmark. It navigates in counterclockwise order through the landmarks of a page (for example, headers, navigation bars, main content). |
| Shift+F10 | Open a shortcut menu, for example, in **Tree view** |

---

## Create a blank canvas app from scratch

Source: [create-blank-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-blank-app)

*Learn how to start a blank canvas app in Power Apps so you can add screens, controls, data, and formulas for your business scenario.*

# Create a blank canvas app from scratch

A blank canvas app gives you an empty design surface. You decide what screens to add, which controls to use, and how the app connects to data. This option works well when you want full control over the app layout and experience.

## Prerequisites

Before you start, make sure that:

- You can sign in to [Power Apps](https://make.powerapps.com).
- You have the [Environment Maker](/power-platform/admin/database-security#predefined-security-roles) security role, either directly or through a Microsoft Dataverse team that uses the **Microsoft Entra ID security group** category. Custom security roles aren't currently supported for canvas app maker scenarios.

## Create a blank canvas app

1. Sign in to [Power Apps](https://make.powerapps.com).
1. In the left navigation pane, select **Create**, and then select **Create from blank**.
1. In the **Start with a blank canvas** dialog, choose the app size that fits your scenario: **Responsive**, **Tablet size**, or **Phone size**.
1. If prompted, enter an app name, and then select **Create**.

Power Apps opens the app in [Power Apps Studio](power-apps-studio.md), where you can start building and customizing it.

## Next steps

After the app opens, continue with these common tasks:

1. [Save the app to the cloud](save-publish-app.md).
1. [Add one or more data connections](add-data-connection.md).
1. [Insert controls such as galleries, forms, buttons, and text inputs](add-configure-controls.md).
1. [Add formulas](working-with-formulas.md) and [screens](add-screen-context-variables.md) to support your business process.
1. [Preview, test, and publish the app](preview-app.md).

---

## Create and edit canvas apps with AI code generation tools

Source: [create-canvas-external-tools.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/create-canvas-external-tools)

*Learn how to use AI code generation tools such as GitHub Copilot CLI and Claude Code to create and edit canvas apps in Power Apps.*

# Create and edit canvas apps with AI code generation tools 

This article explains how to use AI code generation tools, such as GitHub Copilot and Claude Code, to build and edit canvas apps in Power Apps. With this approach, you describe what you want in natural language and use a local tool to generate and validate app code.

Using AI code generation tools with canvas apps gives you an authoring option that complements the visual experience in Power Apps at [make.powerapps.com](https://make.powerapps.com).

## What you can do with code generation tools

- **Build new canvas apps** from blank using plain-language requirements.
- **Update existing canvas apps** by describing the changes you want.
- **Work locally** in your preferred IDE and development environment while syncing with a live coauthoring session.

> [!IMPORTANT]
> The app must already exist. It can be new and completely blank, but you must create it in Power Apps, save it in the intended environment, and enable coauthoring before connecting. 

## How it works

1. You create or open a canvas app in Power Apps Studio and connect your AI code generation tool to its coauthoring session.
1. You describe what you want to build in natural language. For example, you might say, "Create a canvas app for tracking expense reports with an approval workflow."
1. The AI code generation tool uses installed canvas app skills to discover available controls, connectors, and data sources. It can ask follow-up questions to clarify your requirements.
1. The tool generates `.pa.yaml` files that define your screens, controls, and Power Fx formulas.
1. The tool validates the generated code by using the canvas app authoring MCP server and fixes any validation errors.
1. The app syncs with Power Apps Studio through the coauthoring session.

## Prerequisites

Before you start, ensure that you have the required software and permissions.

### Software requirements

| Component | Requirements | More information |
|-----------|-----------------|------------------|
| .NET SDK | Version 10.0 or later | [Download .NET SDK](https://dotnet.microsoft.com/download/dotnet/10.0) |
| A coding agent | Support for MCP servers and agent plugins | For example, [GitHub Copilot](https://github.com/features/copilot), Claude Code, or another code generation tool. |

### Additional requirements

- A Power Platform environment and permission to create or edit a canvas app.
- An existing, saved canvas app in the intended environment.
- Power Apps Studio open with **[coauthoring](copresence-power-apps-studio.md)** enabled for the app that you want to build or edit.
  - To enable coauthoring, open your app in Power Apps Studio, go to **Settings** > **Updates**, and turn on **Coauthoring**.

Confirm that the .NET 10 SDK or later is installed:

```shell
dotnet --list-sdks
```

The output must include a version that begins with `10.` or a later major version. If the command isn't found or no supported version appears, install the SDK and restart your terminal and coding agent.

## Install the canvas apps plugin

Install the canvas apps plugin from your coding agent's plugin marketplace.

### Install from a plugin marketplace

Run the following commands in a coding agent that supports plugin marketplace commands:

1. Add the Power Platform Skills marketplace plugin.

   ```shell
   /plugin marketplace add microsoft/power-platform-skills
   ```

1. Install the canvas apps plugin.

   ```shell
   /plugin install canvas-apps@power-platform-skills
   ```

After you install the plugin, configure the canvas app authoring MCP server before you create or edit apps. You can configure the server in either of these ways:

- Run the `/configure-canvas-mcp` command.
- Describe what you want to build, and let the tool guide you through setup.

If your coding agent doesn't support these commands, use its plugin marketplace interface. Search for the `microsoft/power-platform-skills` marketplace, and then install `canvas-apps`.

### Install in Visual Studio Code

1. Open the **Extensions** view.
1. Enter `@agentPlugins canvas apps` in the search field.
1. Select **Canvas Apps**, published by Microsoft, and then select **Install**.
1. Open Chat in Agent mode and confirm that the `canvas-app` and `configure-canvas-mcp` skills are available.

If agent plugins don't appear in the Extensions view, open **Preferences: Open User Settings (JSON)** from the Command Palette, add `"chat.plugins.enabled": true` inside the outer braces, save the file, and search again. For more information, see [Install a plugin from a marketplace](https://code.visualstudio.com/docs/agent-customization/agent-plugins#_install-a-plugin-from-a-marketplace).

## Configure the canvas app authoring MCP server

The canvas apps plugin uses an MCP (Model Context Protocol) server to communicate with Power Apps. Before you create or edit apps, configure this connection.

1. Open your canvas app in Power Apps Studio and confirm that **coauthoring** is enabled.
1. Keep the Power Apps Studio browser tab open for the entire session.
1. Copy the Power Apps Studio URL from your browser.
1. Run `/configure-canvas-mcp` in your AI tool, or ask the tool to configure the MCP server.
1. Provide the complete Studio URL when prompted and complete any sign-in prompt. The tool extracts the environment ID, app ID, and cluster information automatically.
1. Verify the connection by asking the agent, "List the available Canvas App controls."

The connection depends on the open Power Apps Studio coauthoring session. If you close the browser tab or the Studio session expires, reopen the app and run `/configure-canvas-mcp` again.

By using the MCP server, your AI tool can list and describe available controls, discover APIs and data sources, validate app YAML, and sync app state from the live coauthoring session.

The canvas apps plugin [repository](https://aka.ms/canvas-authoring-mcp) includes control documentation, design guidance, technical reference, and workflow instructions that help you create code that follows canvas app requirements.

## Skills overview

The canvas apps plugin provides these skills for working with canvas apps.

| Skill | Command | Description |
|-------|-------------|---------|
| Canvas app | `/canvas-app` | Build a connected blank app or edit an app that already contains screens and content |
| Configure Canvas MCP | `/configure-canvas-mcp` | Connect the canvas app authoring MCP server to the current Power Apps Studio coauthoring session |
| Add data source | `/add-data-source` | Guide you to add a connector or data source in Power Apps Studio and verify that it's available |

These skills let you describe what you want to build, generate `.pa.yaml` files for your app, validate those files against the canvas authoring server, and sync changes with a live Power Apps Studio session.

## Build a blank canvas app

Follow this workflow to build a new app in Power Apps Studio.

1. Create and save a blank canvas app in the intended environment, enable coauthoring, and connect the canvas app authoring MCP server.
1. Run `/canvas-app`, or start a conversation with your AI tool and describe what you want to create, including the layout and the data you want to use, such as Dataverse tables or connectors. Say "Canvas App" in your request to help the coding agent select the right skill. The more detail you include, the better the initial result is likely to be. You can also attach images or other materials to guide the visuals, theming, and layout. For example:
   - "Create a canvas app for tracking inventory with a searchable list and detail view"
   - "Build a canvas app for employee onboarding with a multi-step form"
   - "Make a canvas app dashboard showing sales metrics with charts and KPIs"
   - "Create a canvas app for field inspections with photo capture"
1. Answer any clarifying questions. The AI tool uses the MCP server to discover available controls and data sources and asks questions to better understand your requirements.
1. Review the generated code and validate it. The AI tool generates `.pa.yaml` files for each screen and validates them by using the canvas app authoring MCP server. The tool fixes validation errors automatically, and your changes sync with the live coauthoring session in Power Apps Studio.
1. Test and iterate. Open your canvas app in Power Apps Studio to preview and test it. If you need changes, return to your AI tool and describe the updates in natural language.

Add required connectors and data sources through the **Data** panel in Power Apps Studio. You can run `/add-data-source` for guided setup and verification.

## Edit an existing canvas app

Use this workflow to update an app that already exists in your coauthoring session.

1. Open the app in Power Apps Studio, keep the browser tab open, and connect the canvas app authoring MCP server.
1. Sync the existing app. Run `/canvas-app`, or ask to edit your canvas app. The tool syncs the current app state from the coauthoring session and pulls the existing screens and controls into local `.pa.yaml` files. For example, "I want to edit my expense tracking Canvas App."
1. Describe the updates you want. For example:
   - "Add a filter to show only pending expenses"
   - "Change the home screen layout to use a card-based grid"
   - "Add a new screen for viewing expense history with charts"
   - "Update the form to include a dropdown for expense categories"
1. Review, validate, test, and iterate. The AI tool generates updated `.pa.yaml` files based on your requested changes and validates them with the canvas authoring server. Continue iterating with natural language instructions until the app meets your requirements.

## Troubleshooting

### App doesn't reflect changes

If your changes don't appear in Power Apps Studio:

1. Verify the connection to the canvas app authoring MCP server by asking the tool to list available controls.
1. Ensure coauthoring is enabled in your Power Apps Studio session (**Settings** > **Updates** > **Coauthoring**).
1. Check that the MCP server is configured with the correct environment ID and app ID by running `/configure-canvas-mcp` again.

### MCP server connection problems

If the canvas app authoring MCP server isn't responding:

1. Verify that the .NET 10 SDK is installed by running `dotnet --list-sdks` in your terminal.
1. Ensure that your Power Apps Studio session is still active and that coauthoring is enabled.
1. Confirm that you copied the URL from the app's edit session in Power Apps Studio, not from the app player or Power Apps home page.
1. Run `/configure-canvas-mcp` again with a fresh Studio URL.

### Controls, connectors, or data sources are missing

If expected resources aren't available:

1. Confirm that the MCP server is connected to the intended app and environment.
1. Add required connectors and data sources through the **Data** panel in Power Apps Studio.
1. Ask the agent to list the resources again.
1. Check whether your organization's data policies restrict the resource.

### Plugin installation problems

If the plugin doesn't appear or install, confirm that your coding agent supports MCP and agent plugins. In Visual Studio Code, search for `@agentPlugins canvas apps`, install **Canvas Apps** published by Microsoft, and then restart or reload Visual Studio Code. If the plugin is still unavailable, ask your administrator whether organizational policies block agent plugins, third-party MCP servers, or local MCP processes.

If `dotnet` or `dnx` isn't found, install the .NET 10 SDK, not only the runtime. Restart your terminal and coding agent, and then run `dotnet --list-sdks`.

If the MCP server can't download its package and the error mentions `https://api.nuget.org/v3/index.json`, run `dotnet nuget list source`. Confirm that an enabled source contains `Microsoft.PowerApps.CanvasAuthoring.McpServer`. If none does, ask your administrator which approved NuGet source to use. Update the canvas apps plugin before retrying.

## Security considerations

The plugin handles credentials through the official Azure Identity SDK and doesn't store or manage tokens directly.

- Install the plugin only from a trusted marketplace, and keep the plugin, coding agent, and .NET SDK current.
- Connect with an account that has only the permissions needed to edit the intended app.
- Check the Power Apps environment, app URL, proposed action, and tool parameters before you approve an operation.
- Validate generated changes in a development or nonproduction app before you apply them to a production app.
- Never paste passwords, access tokens, connection strings, or other secrets into prompts, issue reports, or logs.
- Be aware of your organization's connector and data loss prevention policies.
- Review unexpected actions proposed by your coding agent, especially when you work with external data.

For more information, see [Defend against indirect prompt injection attacks](/security/zero-trust/sfi/defend-indirect-prompt-injection) and [Manage Power Platform data policies](/power-platform/admin/prevent-data-loss).

## Best practices

- Start simple. Begin with a basic version of your app and add complexity over time.
- Test often. Preview your app in Power Apps Studio after significant changes.
- Be specific. Detailed requirements usually produce better initial results.
- Reuse patterns. Reference similar apps or UI patterns when you describe your requirements.
- Validate generated code. Always review the generated `.pa.yaml` files to make sure that they meet your organization's standards and compliance requirements.
- Describe the visual direction. If you want a specific layout or style, include that guidance in your prompt.

> [!IMPORTANT]
> AI code generation tools make a best-effort attempt to generate complete, production-ready code that follows accessibility and security best practices, but you're still responsible for validation. Ensure that the generated code meets your organization's standards, policies, and compliance requirements.

## Related content

- [Canvas Apps plugin repository](https://aka.ms/canvas-authoring-mcp)
- [Report a Canvas Apps plugin issue](https://aka.ms/power-skills-canvas-issues)
- [Create a canvas app from scratch](create-blank-app.md)
- [Power Apps canvas app overview](getting-started.md)

---

## Build apps through conversation with Copilot

Source: [ai-conversations-create-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-conversations-create-app)

*Build apps easily with AI in Microsoft Power Apps. Describe the information you want to collect, track, or show in your app, and Copilot creates Dataverse tables and guides you through the process.*

# Build apps through conversation with Copilot

Create apps without writing code or designing screens. By using Copilot in Power Apps, you use natural language to describe what you want your app to do, and AI does the rest.

Copilot is a feature in Power Apps that helps you build apps with AI assistance. From the Power Apps home screen, select **Start with data**, and then select **Create new data** to open the table editor with Copilot. Enter the type of information you want to collect, track, or show in your app, and Copilot generates one or more Microsoft Dataverse tables that you use to build your canvas app.


## Prerequisites

- Check the prerequisites and region availability in [Copilot in Power Apps overview (preview)](ai-overview.md).
- Depending on where your environment is hosted, you might need to enable data movement across regions. For more information, see [Copilots and generative AI features that are available when you enable data movement across regions](/power-platform/admin/geographical-availability-copilot#copilots-and-generative-ai-features-that-are-available-when-you-enable-data-movement-across-regions).
You need access to a Microsoft Dataverse database in your environment to use this feature. For more information, see [Add a Microsoft Dataverse database](/power-platform/admin/create-database).
- Check if this feature is available in your region. For more information, see [Explore Copilot features by geography and languages](https://releaseplans.microsoft.com/en-US/availability-reports/?report=copilotfeaturereport).
- Assign the system customizer security role in the environment.

## Create an app by using Copilot

Let's create an app to track housekeeping tasks for a hotel so you can see how Copilot works.

1. Sign in to [Power Apps](https://make.powerapps.com).

1. On the home screen, select **Start with data**.

1. Select **Create new data**.

   The **Create new tables** workspace opens with a blank table and the Copilot panel on the right side.

1. In the Copilot panel text box, enter your prompt, like the example prompt in the following section.

    ```copilot-prompt
    Create tables to track hotel housekeeping tasks including room numbers, task types, staff assignments, and task status
    ```

1. Select **Submit** or press **Enter**.

Copilot creates one or more Dataverse tables with data that includes typical hotel housekeeping tasks.

> [!IMPORTANT]
> If you don't have the right permissions or access to Dataverse in the environment you're working in, an alert asks you to create the app in your own environment. Make sure you can create the table and app in your environment to continue. If you don't have a personal developer environment, a new one is created for you automatically. For more information, see [Get your developer environment (preview)](../maker-create-environment.md).

## Review the table

Copilot generates tables and relationships based on your description. Review them and make any changes you need before you create your app.

### Review the tables for your app

Copilot shows you the tables and relationships it generates based on your description in the **Create new tables** workspace.

:::image type="content" source="media/artificial-intelligence/data-workspace-copilot.png" alt-text="Screenshot of the Create new tables workspace showing Dataverse tables and the Copilot panel.":::

The workspace includes the following options:

| Option | Description |
|---|---|
| 1. **Back** | Return to the previous screen. |
| 2. **New table** | Add a new table to your workspace. |
| 3. **Existing table** | Add an existing Dataverse table. |
| 4. **View data** | View the data in your tables. |
| 5. **Create relationships** | Create relationships between tables. |
| 6. **Remove** | Remove a table from the workspace. |
| 7. **Save and open app** | Creates draft tables and relationships, then opens your app for editing. |
| 8. **Copilot panel** | Ask Copilot to create tables, import data, or make changes using natural language. |
| 9. **View prompts** | See examples of what you can ask Copilot to do. |

## Use Copilot to make changes

To change something, enter a brief description of the change in the Copilot panel. Copilot makes the change for you.

The Copilot panel provides three options to help you get started:

- **Create**: Describe tables, columns, rows, and relationships and they'll be generated for you.
- **Import data**: Create tables from Excel or .CSV files, or SharePoint lists.
- **Change**: Describe the changes you'd like to make.

For example, ask Copilot to add columns to track cleaning start and end time.

1. In the Copilot text box, enter **Add columns to track start and end time**.

    Copilot adds two new columns called **Start Time** and **End Time**.

1. Continue editing the table as needed. For example, add room status, change room types, or set a priority level for each room.

1. When you're ready to create your app, select **Save and exit**.

## Related information

- [Copilot in Power Apps overview (preview)](ai-overview.md)
- [Add a Copilot control to a canvas app (preview)](add-ai-copilot.md)
- [Build apps through conversation (video)](https://youtu.be/A4cBqQjnIBg?feature=shared)

---

## Edit your app with Copilot in Power Apps Studio (preview)

Source: [ai-edit-app.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-edit-app)

*Learn how to use natural language to edit your app with Copilot, an AI assistant that helps you make changes to your app in Power Apps Studio.*

# Edit your app with Copilot in Power Apps Studio (preview)



> [!IMPORTANT]
> Starting January 6, 2026, this feature will be removed. To continue creating apps with Copilot, use [Plans](../plan-designer/plan-designer.md).

Edit your apps without writing code or designing screens. With Copilot in Power Apps, you can use natural language to describe the changes you want to make, and AI does the rest.

Copilot is a feature in Power Apps that helps you edit your apps with AI assistance. You can access Copilot from Power Apps Studio when you edit a canvas app. Tell Copilot what kind of changes you want to make in the Copilot conversation pane, such as adding a screen, configuring navigation, styling a control, or editing multiple controls at a time.

:::image type="content" source="media/artificial-intelligence/copilot-pane.png" alt-text="Screenshot of the Power Apps Studio, showing an app open for editing in the center of the screen and the Copilot panel on the right side of the screen.":::

> [!IMPORTANT]
>
> - This is a preview feature.
> - Preview features aren't meant for production use and might have restricted functionality. These features are subject to [supplemental terms of use](https://go.microsoft.com/fwlink/?linkid=2189520), and are available before an official release so that customers can get early access and provide feedback.

> [!NOTE]
>
> This capability:
>
> - Is powered by [Azure OpenAI Service](/azure/cognitive-services/openai/overview)
> - Might be subject to usage limits or capacity throttling

## Prerequisites

Ensure you meet the prerequisites and region availability in [Copilot in Power Apps overview (preview)](ai-overview.md).

## Supported languages

The following table lists the languages that Copilot understands.

You can track future language availability in the [Copilot product report](https://releaseplans.microsoft.com/en-US/availability-reports/?report=copilotproductreport).

| **Name**                           | **Language Code** |
|------------------------------------|-------------------|
| English                            | en-US             |
| Chinese (simplified)               | zh-Hans           |
| Czech                              | cs-CZ             |
| Danish                             | da-DK             |
| Dutch                              | nl-NL             |
| Finnish                            | fi-FI             |
| French                             | fr-FR             |
| German                             | de-DE             |
| Greek                              | el-GR             |
| Italian                            | it-IT             |
| Japanese                           | ja-JP             |
| Korean                             | ko-KR             |
| Norwegian (Bokmål)                 | nb-NO             |
| Polish                             | pl-PL             |
| Portuguese                         | pt-BR             |
| Russian                            | ru-RU             |
| Spanish (Traditional Sort)         | es-ES             |
| Swedish                            | sv-SE             |
| Thai                               | th-TH             |
| Turkish                            | tr-TR             |

## Use Copilot to edit your app

1. Sign in to [Power Apps](https://make.powerapps.com) and open a canvas app for editing.
1. In Power Apps Studio, in the upper-right corner of the page, select **Copilot**.
1. In the Copilot text box, describe a change you want to make, such as  *Add an email screen*.

:::image type="content" source="media/artificial-intelligence/ask-copilot.png" alt-text="Screenshot that shows where to ask Copilot a request.":::

## What you can do with Copilot in Power Apps

Copilot in Power Apps allows you to perform the following tasks:

- Add a new screen using a template. Learn more in [Add a screen](add-screen-context-variables.md).
- Modify the properties of some controls, including:
  - Screen
  - Horizontal and vertical containers
  - Gallery
  - Edit form
  - Button
  - Text label
  - Text input

## Sample commands you can try

When you open the Copilot pane, you can select from three preset prompts that demonstrate Copilot's capabilities: **Create**, **Change**, and **Ask**. You can also try entering the following commands in the Copilot text box.

> [!NOTE]
>
> Some Copilot requests are built into preview features, which only work when **Try the new data experience** toggle is turned on from your Power Apps home page. Learn more in [Build apps with Copilot in Power Apps (preview)](ai-conversations-create-app.md#prerequisites).

### Scenario: Add a new screen using a template

- Add a new screen
- Add a new email screen
- Add a new screen with header, body, and footer

### Scenario: Add/edit/style a control

- Add a new button
- Change the selected button to have width 100
- Add a new icon
- Add a new text label
- Add a submit button and a cancel button to the form

### Scenario: Bulk editing

- Change all buttons to gray
- Change all labels in the selected container to red

### Scenario: Working with containers

- Add a button to the selected container

### Scenario: Templatized formulas

- When the user selects `Button1`, show `Screen2`

### Scenario: Modern theming

- Change my app to deep forest green




## Related information

[Editing your app with Copilot in Power Apps (video)](https://youtu.be/g9fFoQ5CETk?feature=shared)

---

## Use field suggestions by Copilot

Source: [ai-field-suggestions.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-field-suggestions)

*Learn how to use field suggestions by Copilot, an AI feature in Microsoft Power Apps, to select the best fields to display when you link a data source to a control in a canvas app.*

# Use field suggestions by Copilot

Copilot is an AI feature in Microsoft Power Apps that helps you select the best fields to display when you link a data source to a control in a canvas app. Instead of using the default fields that Power Apps selects, you can view up to 10 suggestions from Copilot. The field suggestions are based on the data schema and the context of the app. You can review the suggestions and make adjustments as needed, saving time and improving the quality of the app.

## Prerequisites

Ensure you meet the prerequisites and region availability in [Copilot in Power Apps overview (preview)](ai-overview.md).

## Use field suggestions

Field suggestions by Copilot work when you bind a data source to one of the following controls:

- Gallery
- Form (modern)
- Table (modern)
- Edit form (classic)
- Display form (classic)
- Data table (classic)

You can bind these controls to one of the following data sources:

- Dataverse
- SQL Server
- SharePoint list

When you select a data source for a control, Copilot analyzes the data schema and recommends up to 10 fields that are relevant and meaningful for your app. If you have more than 10 required fields, Copilot combines the AI suggestions with the required fields so that you don't get an error when you submit a form.

You can view the suggestions in the **Fields** pane and preview how they look in your app. You can also adjust the order, remove fields, and add more fields from the data source.

:::image type="content" source="media/artificial-intelligence/fields-pane.png" alt-text="Screenshot that shows you where you can view the fields pane from the Properties pane.":::

When you're done, apply the changes and view the results in your app.

## Related information

- [FAQs for field suggestions by Copilot](../common/faq-field-suggestions.md)

---

## Create a canvas app using Microsoft Dataverse

Source: [data-platform-create-app-scratch.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/data-platform-create-app-scratch)

*Learn how to create a canvas app that displays, adds, updates, and deletes records in Microsoft Dataverse.*

# Create a canvas app using Microsoft Dataverse

Microsoft Dataverse is a secure, cloud-based data platform for business data. In Power Apps, you can create canvas apps that connect directly to Dataverse to display, add, update, and manage records without setting up a separate database.

This article shows three ways to build a canvas app with Dataverse:

- Start with an existing Dataverse table.
- Create new Dataverse tables and generate an app.
- Build a blank app and connect it to Dataverse yourself.

## Prerequisites

Before you start:

- [Switch to an environment](intro-maker-portal.md#choose-an-environment) that already has a database with sample data. If you have the right license, you can also [create an environment](/power-platform/admin/create-environment).
- Make sure that you have the [Environment Maker](/power-platform/admin/database-security#predefined-security-roles) security role, either directly or through a Dataverse team that uses the **Microsoft Entra ID security group** category. Custom security roles aren't currently supported for canvas app maker scenarios.

## Create an app

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
1. On the home page, choose one of the following options based on how you want to build your app with Dataverse.

   | Create options using Dataverse | Benefits | Navigation |
   |---|---|---|
   | A single-page gallery app | Use existing business data in Dataverse to create a lightweight responsive app quickly. | Select **Start with data** > **Dataverse**. Select a table, and then select **Create app**. |
   | Create new data and build an app | Create structured tables in Dataverse so you can build secure and scalable apps around new business data. | Select **Start with data** > **Create new data**. Use the table designer or Copilot to create tables, and then select **Save and exit**. |
   | Blank app that uses data from Dataverse | Start with a blank app when you want full control over the layout, screens, and controls. | In the left navigation pane, select **Create** > **Create from blank** > **Phone size**. |


1. Power Apps creates the app and opens [Power Apps Studio](power-apps-studio.md), where you can continue building.

## Start with data using Dataverse

The **Start with data** experience helps you quickly connect to an existing Dataverse table or create a new table and generate an app.

### Connect to an existing Dataverse table

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
1. On the home page, select **Start with data**.
1. On the **Create an app** page, select **Dataverse**.
1. Select an existing Dataverse table, and then select **Create app**.

Power Apps Studio opens with a gallery app that is already connected to the selected table.

### Create new data

If you don't already have a table, create one directly from the **Start with data** experience.

1. On the home page, select **Start with data**.
1. Select **Create new data**.
1. In the **Create new tables** designer, choose one or more of these actions:
   - Select **+ New table** to create a table.
   - Select **+ Existing table** to add an existing table.
   - Use **Copilot** to describe the tables, columns, rows, and relationships that you need.
   - Select **Import data** in the Copilot pane to import data from Excel, .CSV files, or SharePoint lists.
1. When you finish defining your tables, select **Save and exit** to generate the app.

## Add a Dataverse table in a blank app

If you want to understand the building blocks of a Dataverse app, start with a blank app and add the data source yourself.

1. Sign in to [Power Apps](https://make.powerapps.com?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc).
1. In the left navigation pane, select **Create** > **Create from blank**.
1. Select an app size.
1. When Power Apps Studio opens, go to the [app authoring menu](power-apps-studio.md#5--app-authoring-menu) and select **Data**.

   > [!NOTE]
   > If this is your first time connecting to Dataverse, Power Apps prompts you to create a connection. Select **Create** to continue.

1. Select **Add data**, enter **Accounts** in the search box, and then select it. And close the **Data** pane by selecting the close icon in the upper-right corner.

   :::image type="content" source="./media/data-platform-create-app-scratch/add-and-close-data.png" alt-text="Screenshot of the close data pane.":::
### Add a list screen

1. On the command bar, select **New screen** > **List**.
1. In the left navigation bar, select **BrowseGallery1**, and then set the **Items** property to this formula:

   `SortByColumns(Search(CustomGallerySample, TextSearchBox1.Text, SampleText), "SampleText", If(SortDescending1, SortOrder.Descending, SortOrder.Ascending))`

   This formula does the following:

    This expression filters the CustomGallerySample table for records whose SampleText column contains the text entered in TextSearchBox1. It then sorts the filtered results by the SampleText column in descending order when SortDescending1 is true; otherwise, it sorts them in ascending order.

   You can use [these and many other functions](formula-reference.md) to control how your app looks and behaves.

   :::image type="content" source="./media/data-platform-create-app-scratch/gallery-items.png" alt-text="Screenshot that shows the gallery's Items property set to the SortByColumns and Search formula." lightbox="./media/data-platform-create-app-scratch/gallery-items.png":::

1. In the gallery's **Properties** pane, set **Layout** to **Title**.
1. Edit the **Title** text property and rename it to **Browse**. For more information, see [Customize a gallery](customize-layout-sharepoint.md).

   :::image type="content" source="./media/data-platform-create-app-scratch/rename-browse.png" alt-text="Screenshot of the Browse screen showing a list of accounts.":::

1. In the left app authoring pane, hover over **Screen1**, select the ellipsis icon (...), and then select **Delete**.
1. In the left app authoring pane, hover over **Screen2**, select the ellipsis icon (...), and then select **Rename**.
1. Type or paste **BrowseScreen**, and then rename the gallery in that screen to **BrowseGallery**.

   :::image type="content" source="./media/data-platform-create-app-scratch/rename-screens.png" alt-text="Screenshot of the renamed BrowseScreen and BrowseGallery in the tree view.":::
### Add a form screen

1. Repeat the first step in the previous procedure, but add a **Form** screen instead of a **List** screen.
1. Set the form's **DataSource** property to **Accounts** and its **Item** property to **BrowseGallery.Selected**, as shown on the **Advanced** tab of the right-hand pane.
1. On the **Properties** tab of the right-hand pane, in the **Fields** row select the **"N selected"** link (or the **Edit** pencil) to open the **Fields** pane.
1. Select **Add field**, choose these fields, and then select **Add**:

   - **Account Name**
   - **Address 1: Street 1**
   - **Address 1: City**
   - **Address 1: ZIP/Postal code**
   - **Number of Employees**
   - **Annual Revenue**

   > [!NOTE]
   > Outside of this scenario, you can create a custom field by selecting **New field**, entering the required information, and then selecting **Done**. For more information, see [Create a column](../data-platform/create-edit-field-portal.md#create-a-column).

   :::image type="content" source="./media/data-platform-create-app-scratch/choose-or-add-fields.png" alt-text="Screenshot of the Choose a field pane with the New field option highlighted.":::

1. Set the title bar's **Text** property to show **Create/Edit**.

   The screen reflects your changes.

   :::image type="content" source="./media/data-platform-create-app-scratch/field-list.png" alt-text="Screenshot of the Create/Edit form screen showing the configured fields.":::

1. Rename this screen **FormScreen**.

### Configure icons

1. On **BrowseScreen**, set the **OnSelect** property of the circular icon near the top of the screen to this formula:

   `Refresh(Accounts)`

   :::image type="content" source="./media/data-platform-create-app-scratch/refresh-icon.png" alt-text="Screenshot of the refresh icon.":::



1. Set the **OnSelect** property of the plus icon to this formula:

   `NewForm(EditForm1); Navigate(FormScreen, ScreenTransition.None)`

   :::image type="content" source="./media/data-platform-create-app-scratch/plus-icon.png" alt-text="Screenshot of the plus add icon.":::

1. Set the **OnSelect** property of the first arrow that points to the right to this formula:

   `EditForm(EditForm1); Navigate(FormScreen, ScreenTransition.None)`

   :::image type="content" source="./media/data-platform-create-app-scratch/next-icon.png" alt-text="Screenshot of the next arrow icon.":::

1. On **FormScreen**, set the **OnSelect** property of the cancel icon to this formula:

   `ResetForm(EditForm1);Navigate(BrowseScreen, ScreenTransition.None)`

   :::image type="content" source="./media/data-platform-create-app-scratch/cancel-icon.png" alt-text="Screenshot of the cancel icon.":::

1. Set the **OnSelect** property of the checkmark icon to this formula:

   `SubmitForm(EditForm1); Navigate(BrowseScreen, ScreenTransition.None)`

   :::image type="content" source="./media/data-platform-create-app-scratch/checkmark-icon.png" alt-text="Screenshot of the checkmark icon.":::

1. On the **Insert** tab, select **Icons**, and then select the **Trash** icon.
1. Set the **Trash** icon's **Color** property to **White** and its **OnSelect** property to this formula:

   `Remove(Accounts, BrowseGallery.Selected); Navigate(BrowseScreen, ScreenTransition.None)`

   :::image type="content" source="./media/data-platform-create-app-scratch/trash-icon.png" alt-text="Screenshot of the trash delete icon.":::

### Test the app

1. On the actions menu, select the play button to **Preview the app**. For more information, see [Preview an app](preview-app.md).
1. Toggle the list between ascending and descending sort orders. Filter the list by one or more characters in the account name.
1. Add an account, edit the account that you added, start to update the account, cancel the changes, and then delete the account.

## See also

- [Customize a gallery](customize-layout-sharepoint.md)
- [Create a column](../data-platform/create-edit-field-portal.md#create-a-column)

---

## Integrate SharePoint Online into Power Apps overview

Source: [sharepoint-list-integration-overview.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/sharepoint-list-integration-overview)

*An overview of how to integrate lists from SharePoint Online or Microsoft Lists into Microsoft Power Apps.*

# Integrate SharePoint Online into Power Apps overview

This article guides you through creating a list from SharePoint or Microsoft Lists, integrating that list into Power Apps, and customizing the list in your app.

When you add data to an app, you can choose a SharePoint list or Microsoft Lists as a source. Alternatively, you can create an app based on a SharePoint list through the **integrate** menu in Microsoft Lists. Once your list is in your app, you can filter it and customize the list.

> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. You can always find the list in both Microsoft Lists and SharePoint. Learn more in [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5)

## Prerequisites

- A [subscription](https://www.microsoft.com/licensing/terms/productoffering) to [Microsoft 365](https://www.microsoft.com/licensing/terms/productoffering/Microsoft365/all) and [Microsoft Power Platform](https://www.microsoft.com/licensing/terms/productoffering/MicrosoftPowerPlatform/all).

- A basic familiarity with SharePoint Online and Power Apps:

  - [Get started with SharePoint](https://support.microsoft.com/en-us/office/get-started-with-sharepoint-909ec2f0-05c8-4e92-8ad3-3f8b0b6cf261)
  - [What is Power Apps?](../../powerapps-overview.md)

## Create a list

You can create a new SharePoint list through the Microsoft Lists app in [Create a list](https://support.microsoft.com/en-us/office/create-a-list-0d397414-d95f-41eb-addd-5e6eff41b083).

## Integrate a list

Once you have a list, you can integrate it into Power Apps or create an app based on a SharePoint list or Microsoft Lists.

### Connect with a list in Power Apps

One way to work with a list in your app is to connect to SharePoint through the **Data** menu of an app to import a list. The list serves as a data source in Power Apps.

:::image type="content" source="media/sharepoint-integration/connect-to-sharepoint-through-data.png" alt-text="Screenshot showing where you can connect to a SharePoint list through the Data, Add data, and Connectors menu.":::

Learn more in [Connect to SharePoint from a canvas app](connections/connection-sharepoint-online.md).

### Create an app based on a list

When you view a SharePoint list, you automatically go to Microsoft Lists where you can integrate a list with Power Apps:

:::image type="content" source="media/sharepoint-integration/microsoft-lists-integrate-menu.png" alt-text="Screenshot that shows location of the integrate option of the top bar in Microsoft Lists. You can choose this menu to customize the form for a list in an app or create a new app based on the list." lightbox="media/sharepoint-integration/microsoft-lists-integrate-menu.png":::

Learn more in [Create a canvas app with data from Microsoft Lists](app-from-sharepoint.md).

## Customize a list or form

When you import a list into Power Apps as a data source, you can use it to display a form on a screen. You can customize the appearance of your list in your app, including the formatting and behavior for the list.

Customization includes how the list displays the:

- Addition or removal of fields
- Control type and data type for the fields
- Layout orientation and number of columns
- Formatting like alignment, color, and borders
- Interactive features such as **OnFailure** or **OnSuccess**

Learn how to customize a list in [Customize a form for a SharePoint list](/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form).

Learn more about form properties in [Understand SharePoint forms integration](sharepoint-form-integration.md).

## Filter a list in Power Apps

You can apply formulas to interface elements of your app, such as filters. For a list, add a filter formula to a [vertical gallery](add-gallery.md) in your app screen by adding the formula to the formula bar of an *Items* property.

Learn more in [Filter, Search, and LookUp functions](/power-platform/power-fx/reference/function-filter-lookup).

### Example of a search and filter function

Put this example formula on a gallery for the *Items* property. The formula searches for the status in a column and filters for the *Active* status. The list then only shows the list items with an *Active* status.

```powerfx
SortByColumns(Filter('Issue Tracking', 'Issue Status'.Value = "Active", StartsWith(Title, TextSearchBox1.Text)), "Title", If(SortDescending1, Descending, Ascending))
```

The formula contains the following functions:

- [SortByColumns](/power-platform/power-fx/reference/function-sort) sorts a table based on one or more columns.
- [Filter](/power-platform/power-fx/reference/function-filter-lookup) finds the records in a table according to a formula that you specify.
- [StartsWith](/power-platform/power-fx/reference/function-startswith) tests whether one text string begins with another text string.
- [If](/power-platform/power-fx/reference/function-if) returns a value depending on whether a condition is true or false.

Learn more in [Formula reference - canvas apps](/power-platform/power-fx/formula-reference-canvas-apps).

### Linking lists with a lookup column

You can link two lists where one list uses one of its columns as a *lookup* column. A lookup column is the point where the list connects to another list.

Learn more in [How to link lists from Microsoft Lists using a lookup column in Power Apps](sharepoint-lookup-fields.md).

If you want your lookup column to be a dropdown list with options, use the [Choices](/power-platform/power-fx/reference/function-choices) function. The choices function returns a table of the possible values for a lookup column.

For example, you can add a choices function to a [dropdown control](controls/control-drop-down.md) in your canvas app by adding this formula to your *Items* property of the control. You include your list name and the name of the lookup column in the formula.

```powerappsfl
Choices([@'Your list name'].Lookup_x0020_column)
```

## Related information

- [Using the SharePoint connector with canvas apps](/power-platform/guidance/architecture/real-world-examples/sharepoint-canvas)
- [Customize permissions for a SharePoint list or library](https://support.microsoft.com/office/customize-permissions-for-a-sharepoint-list-or-library-02d770f3-59eb-4910-a608-5f84cc297782)
- [Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)
- [Create a report quickly from a SharePoint list or library](/power-bi/create-reports/service-quick-create-sharepoint-list)
- [Embed a report web part in SharePoint Online](/power-bi/collaborate-share/service-embed-report-spo)

---

## Create a canvas app with data from a list

Source: [app-from-sharepoint.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/app-from-sharepoint)

*Create a Power Apps canvas app to manage data in Microsoft Lists or SharePoint Online.*

# Create a canvas app with data from a list

Transform your Microsoft Lists or SharePoint data into a powerful mobile and web app in minutes with no coding required. This article shows you how to create a fully functional canvas app that connects directly to your existing lists, giving you and your team an intuitive way to view, edit, and manage data on any device.

You can also [connect to on-premises SharePoint lists](connections/connection-sharepoint-online.md#create-a-sharepoint-connection) through a data gateway.

You can create an app by using a list in SharePoint or Lists in two ways:

- Sign in to Power Apps and then [create an app by connecting to a list in SharePoint from Power Apps.](app-from-sharepoint.md#use-a-list-in-sharepoint-or-lists-to-create-an-app)
- [Create an app directly from a list in SharePoint or Lists.](app-from-sharepoint.md#create-an-app-directly-from-a-list-in-sharepoint-or-lists)

When you create the app, Power Apps Studio opens with a single-screen, responsive app that's ready to use. The app consolidates all the functionality—browse items, view details, and add, edit, or delete records—onto one screen. It's built with containers, so the layout adjusts to the size of the device or window where the app runs. By default, the app opens in tablet layout and automatically adapts to phones.

> [!NOTE]
> **What changed:** Newly generated apps now use a single responsive screen. Previously, Power Apps generated an app with three separate screens—**Browse**, **Details**, and **Edit**—designed for phones. The new template provides the same functionality in one screen that adapts to both tablet and phone layouts. Apps you generated earlier keep their original three-screen design and continue to work. Only apps you generate going forward use the single-screen template.


> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. The list is always available in both Microsoft Lists and SharePoint. Learn more in [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5)

## Prerequisites

Use SharePoint and Power Apps with a [subscription](https://www.microsoft.com/licensing/terms/productoffering) to [Microsoft 365](https://www.microsoft.com/licensing/terms/productoffering/Microsoft365/all) and [Microsoft Power Platform](https://www.microsoft.com/licensing/terms/productoffering/MicrosoftPowerPlatform/all).

## Create a list

Before you create an app from a list, [create a list](https://support.microsoft.com/office/create-a-list-0d397414-d95f-41eb-addd-5e6eff41b083).

For this example, create a list to track device orders for your company. Include the following columns with sample data:

1. Employee name
1. Device type
1. Request date
1. Reason for the order
1. Approved or denied
1. Status

    :::image type="content" source="media/app-from-sharepoint/sample-list.png" alt-text="Screenshot of a sample list in Microsoft Lists that tracks device orders." lightbox="media/app-from-sharepoint/sample-list.png":::

## Use a list in SharePoint or Lists to create an app

Now, use the list that you created to build an app from the list.

1. Sign in to [Power Apps](https://make.powerapps.com/).

1. From the home screen, select **Start with data**.

1. On the **Create an app** page, select **SharePoint**.

1. Enter the SharePoint URL, and then select **Connect**. Or, select a recent site.

1. Select a list or select the [sample list](app-from-sharepoint.md#create-a-list) you created earlier, and then select **Create app**.

   The app opens in Power Apps Studio, where you design, build, and manage the app. For more information, see [Understand Power Apps Studio](power-apps-studio.md).

1. Select the **Preview the app** icon to see how the app works.

1. [Save and publish](save-publish-app.md) your app.

    When you add or edit information in the app, the information in SharePoint or Lists also updates.

## Create an app directly from a list in SharePoint or Lists

Before you create the app, make sure you [create a list](app-from-sharepoint.md#create-a-list).

1. Sign in to SharePoint: `https://yourorganizationname.sharepoint.com`

1. Open a list in either SharePoint or Lists. If you open the list from SharePoint, you're taken to Lists to view the list.

1. Select **Integrate** > **Power Apps** > **Create an app**.

    :::image type="content" source="./media/app-from-sharepoint/generate-new-app.png" alt-text="Screenshot of the Integrate menu in Lists, showing the option to create an app in Power Apps.":::

1. Select the **Preview the app** icon to see how the app works.

1. [Save and publish](save-publish-app.md) your app.

    When you add or edit information in the app, the information in SharePoint or Lists also updates.

## Manage your app

After you create an app, you can play, save, share, and publish it.

Learn more about these [app actions](power-apps-studio.md#2--app-actions) in the Power Apps Studio interface.

## Related information

[Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)

---

## Link lists using a lookup column in Power Apps

Source: [sharepoint-lookup-fields.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/sharepoint-lookup-fields)

*Learn about linking lists and using lookup columns in Microsoft Power Apps.*

# Link lists using a lookup column in Power Apps

This tutorial shows you how to connect two lists with a lookup column in a canvas app in Power Apps.

SharePoint provides two types of lookup columns:

- **Lookup**: Links to another list. For example, an **Orders** list might have a lookup column that links to customers in a **Customer** list.
- **Choice**: Selecting a column displays a menu of items you can choose.

> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. The list can always be found in both Microsoft Lists and SharePoint. Learn more in [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5)

## Prerequisites

- A [SharePoint license](https://www.microsoft.com/en-us/microsoft-365/sharepoint/compare-sharepoint-plans?msockid=142399bb7d966f5511fe8cc47c2c6ec1) or a [Microsoft 365 license](https://www.microsoft.com/en-us/microsoft-365/business/compare-all-microsoft-365-business-products?msockid=142399bb7d966f5511fe8cc47c2c6ec1)
- A SharePoint site

  To create a SharePoint site, see [Guided walkthrough: Creating an organization site](/sharepoint/guided-walkthrough-creating-organization-site).

## Why use a lookup column?

Data in an enterprise is large and complex. Data in one list often relates to data in another list. Lookup columns are the primary way such business data comes together.

For example, you might have an **Orders** list which has a lookup column that links to a **Customers** list, to show which customer placed the order. The lookup column in the **Orders** list lets you get other data from the **Customers** list as well.

You might also use a lookup column to connect the **Orders** list to a **Product** list, and bring in information you need about the product ordered, such as product pictures, specifications, or manufacturer details.

## What are choice columns used for?

**Choice** columns are used for short lists. Instead of  creating a separate list, you include the list values in a small menu. This menu appears when you select a **Choice** column, and then you can select one of the values from the menu.

Examples include data like Customer Status Code, Product Availability, State Codes—any fixed, relatively short list.

The choice data can stay as a separate list, if you use a **Lookup** column to link them. However, a **Choice** column implementation is easier and quicker than a **Lookup** column implementation.

Learn more in [Integrate SharePoint Online into Power Apps overview](sharepoint-list-integration-overview.md).

## Create the lists

In this tutorial, you link two lists together, **Assets** and **RepairShop**. The **Assets** list is used to track hardware equipment in a team. Since hardware breaks from time to time, we use the **RepairShop** list to track the local shops which can fix it.

### The lookup column used in this example

The **RepairShop** list uses the *ContactEmail* column to identify the shop. This list is defined first so that each row in the **Assets** list points to something.

The **Assets** list has two lookup columns:

- *RepairShop*, of type **Lookup**, uses email addresses to point to entries in the **RepairShop** list.
- *AssetType*, of type **Choice**, lists the asset types for hardware.

You can define more columns, depending on the information you need to track.

### Define the RepairShop list and add data

Create this list first, so when you add data to the **Assets** list, **RepairShop** entries are available from the *Assets.RepairShop* lookup column.

1. On any SharePoint site, create a new **RepairShop** list from a **Blank list** template.

    :::image type="content" source="./media/sharepoint-lookup-fields/new-list.png" alt-text="Screenshot of the location of a List option in the New menu of a SharePoint site.":::
1. Select **Add a column** of type **Text** and name it *ContactEmail*, then choose **Save**.
1. Select **+ Add new item** to enter at least three rows with different *ContactEmail* sample values. When an asset needs to be repaired, you choose one of these repair shops.

    :::image type="content" source="./media/sharepoint-lookup-fields/add-repair-shops.png" alt-text="Screenshot of the location of the Add new item button on a SharePoint site page.":::

### Define the Assets list

1. On the same SharePoint site, create a new **Assets** list from a **Blank list** template.
1. Select **+ Add column** and choose the **Choice** column type. Select **Next** and name it *AssetType*. Fill in the *Choice* values under the **Choices** section with sample assets such as *Desktop*, *Laptop*, *Android phone*, *iPhone*, and *Windows tablet*.

    :::image type="content" source="./media/sharepoint-lookup-fields/define-choice-column.png" alt-text="Screenshot showing where you can define the column choices when you create a column.":::
1. Select **Save**.
1. Select **+ Add column** and choose the **Lookup** column type, then select **Next**.
1. In the **Create a column** pane, add RepairShop to the **Name** field. Go to **Select a list as a source** and choose **RepairShop**. Go to **Select a column from the list above** and choose **ContactEmail**.
1. Select **Save**.

   You see the column *RepairShop* has a two-arrows icon that indicates it's a lookup type column.

   :::image type="content" source="./media/sharepoint-lookup-fields/repair-shop-lookup-column.png" alt-text="Screenshot showing the RepairShop column in the Assets list.":::

## Create an app from the Assets list

Create a [canvas app](app-from-sharepoint.md) from the [Assets list](#define-the-assets-list) created earlier.

## Add data to the Assets list

Let's [preview the app](preview-app.md) and add items to your **Assets** list.

1. Press F5 or select Preview ( ![Preview icon.](./media/sharepoint-lookup-fields/preview.png) ).

2. Select the **+** symbol in the upper right corner of your app to add an entry.

3. Enter a **Title** for this asset, for example *Micah's Laptop*.

4. Select the **AssetType** dropdown arrow. The values displayed are values you entered when you created this column. Choose one of the entries.

   :::image type="content" source="./media/sharepoint-lookup-fields/fill-asset-type-3.png" alt-text="Screenshot that shows the AssetType list when you select the dropdown arrow.":::

5. Select the **RepairShop** dropdown arrow. Choose one of the entries.

   :::image type="content" source="./media/sharepoint-lookup-fields/fill-repair-shop-3.png" alt-text="Scrrenshot that shows the RepairShop list when you select the dropdown arrow.":::

6. Select the check mark to save the new entry.

7. (Optional) Add more items to the list.

8. Press `Esc` to return to the default workspace.

9. [Save and publish](save-publish-app.md) the app.

## Related information

- Configure [Drop down control in Power Apps](controls/control-drop-down.md) in your list.
- [Generate an app by using a Microsoft Dataverse database](data-platform-create-app.md)
- [Create an app from scratch using a Dataverse database](data-platform-create-app-scratch.md)
- [Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)

---

## Understand SharePoint forms integration

Source: [sharepoint-form-integration.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/sharepoint-form-integration)

*Learn about integration of SharePoint forms with Power Apps, and how to customize those forms.*

# Understand SharePoint forms integration

You can [customize a form for a SharePoint list](/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form) when you integrate a list into Power Apps. In this article, you learn how these forms work and how you can customize them.

When you customize a form for a list, you see the default generated form works for all operations, like creating, showing, or editing an item. This functionality uses generated formulas and the **SharePointIntegration** control.

> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. You can always find the list in both Microsoft Lists and SharePoint. For more information, see [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5)

## Understand the default generated form

The default generated form consists of the following controls and their corresponding defaults. Formulas are autogenerated within the defaults.

- **FormScreen1**: This [screen](controls/control-screen.md) contains the form.

- **SharePointForm1**: This [form](working-with-forms.md) can create, show, or edit a list item.

  - **Data Source**: The list for which the form is customized. For example, a SharePoint list acts as a data source.

  - **Item**: A selected item from a list. This item is set to `First()` item in the list for your convenience, when working in Power Apps Studio.

    ```power-fx
    If( IsBlank(SharePointIntegration.Selected) || IsEmpty(SharePointIntegration.Selected),
        First('*YourListName*'),
    SharePointIntegration.Selected )
    ```

    > [!TIP]
    > This formula pattern uses `... SharePointDatasourceName.Selected` and works for the **Item** property of a form. See the [Common issues with the SharePointIntegration object](#common-issues-with-the-sharepointintegration-object) for a formula pattern to set the value of a SharePoint record.

- **OnSuccess**: Once the item is created or saved successfully, the form resets and SharePoint hides the form.

  ```power-fx
  ResetForm(SharePointForm1); RequestHide()
  ```

- **SharePointIntegration**: Communicates user actions between SharePoint and Power Apps.

  | Property | Description | Example |
  |----------|-------------|---------|
  | Data Source | The list for which the form is customized. | *YourListName* |
  | OnNew | Sets **SharePointForm1** in new mode. | *NewForm(SharePointForm1)* |
  | OnView | Sets **SharePointForm1** in view mode. | *ViewForm(SharePointForm1)* |
  | OnEdit | Sets **SharePointForm1** in edit mode. | *EditForm(SharePointForm1)* |
  | OnSave | Submits the changes to **SharePointForm1**. The **SharePointForm1.OnSuccess** formula executes when you successfully submit a form. | *SubmitForm(SharePointForm1)* |
  | OnCancel | Resets the changes to **SharePointForm1**. SharePoint always hides the form when a user selects **Cancel** in SharePoint. | *ResetForm(SharePointForm1)* |

These defaults ensure that the form works when running within SharePoint. The defaults change the Power Apps form mode as the user interacts with it in SharePoint, and they ensure that the changes are submitted to SharePoint.

> [!NOTE]
> While you can manually copy a form from one environment to another, there's currently no automated method in Power Apps to copy a form from one environment to another.

## Understand the SharePointIntegration control

The **SharePointIntegration** control communicates user actions between SharePoint and Power Apps.

:::image type="content" source="./media/sharepoint-form-integration/sharepointintegration-object.png" alt-text="Screenshot of a SharePoint integration object as seen in Power Apps.":::

> [!NOTE]
> You can access properties for the **SharePointIntegration** control only when the form runs in SharePoint, not when you're customizing the form in Power Apps Studio. These properties might not be available in **OnStart** or **OnVisible**.

The **SharePointIntegration** control has these properties:

| Property | Effect or description |
|----------|-----------------------|
| Selected | The selected item from the list. |
| OnNew | Activates when a user selects the **New** button or opens the **Create item** form in SharePoint. |
| OnView | Activates when a user selects an item or opens the **Item detail** form in SharePoint. |
| OnEdit | Activates when a user selects the **Edit all** button or opens the **Edit item** form in SharePoint. |
| OnSave | Activates when a user selects the **Save** button in SharePoint. |
| OnCancel | Activates when a user selects the **Cancel** button in SharePoint. |
| SelectedListItemID | Item ID for the selected item in a list. |
| Data Source | The list that contains the record that the form  shows, edits, or creates. If you change this property, the **Selected** and **SelectedItemID** properties might stop working. |

## Customize the default form

You can change the formulas to further customize the forms.

Consider these tactics when you customize forms:

- Use the **OnSave** formula of the `SharePointIntegration` control to customize the effect of a user selecting **Save** in SharePoint. If you have multiple forms, make sure to submit the changes only for the form currently being used.

  > [!TIP]
  > Set different values for a variable in the **OnNew**, **OnView**, and **OnEdit** formulas. You can use this variable in the **OnSave** formula to determine which form is being used.

- Include **RequestHide()** in the **OnSuccess** formula of all your forms. Without this function, SharePoint doesn't know when to hide the form. Avoid running important code *after* calling **RequestHide()**. Code should run while the form is still visible and able to run logic.

- You can't control the hiding of a form when a user selects **Cancel** in SharePoint. Always reset your forms in the **OnCancel** formula of the `SharePointIntegration` control.

- Properties for the `SharePointIntegration` control might not be available in **OnStart** or **OnVisible**. These events execute only once while the list is loaded. You can use **OnNew**, **OnView**, or **OnEdit** to run logic before the form is shown to the user.

## Common issues with the SharePointIntegration object

- When you set the value of `SharepointIntegration.Selected` to a collection on the **OnView** property, it doesn't show the latest value. To fix this problem, use `SharepointIntegration.SelectedListItemID`, and then do a lookup on the table to get the selectedRecord.

  For example, for **OnView** property:

  - Instead of:

    ```power-fx
    Set( selectedItem,
    SharePointIntegration.Selected );
    ```

  - Use:

    ```power-fx
    Set( selectedLookupItem,
    LookUp( YourSharepointIntegrationObject, 
    ID=SharePointIntegration.SelectedListItemID ) );
    ```

- Collection variables aren't reset when you close the Power Apps form. The state persists for the entire session. If you need to reset the variables, clear them in the **OnView** property of the `SharePointIntegration` object.

- Don't use imperative functions such as **Launch()** in the `SharePointIntegration` properties (such as **OnNew** and **OnView**). This use can cause unexpected behavior since the `SharePointIntegration` lifecycle events (such as selections changing) can trigger in the background even when the form isn't visible.
- 

## Understand user access to customized forms
You can't manually share a SharePoint form customized with Power Apps. Instead, any user who has at least **Read** or **Restricted View** access to the linked SharePoint list inherits access to the form. Users who have only been given permissions to specific items in the list don't have access to the customized form.

### Related information

- [Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)
- [EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions](/power-platform/power-fx/reference/function-form)
- [RequestHide function](/power-platform/power-fx/reference/function-requesthide)

---

## Understand SharePoint forms integration

Source: [sharepoint-form-integration.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/sharepoint-form-integration)

*Learn about integration of SharePoint forms with Power Apps, and how to customize those forms.*

# Understand SharePoint forms integration

You can [customize a form for a SharePoint list](/sharepoint/dev/business-apps/power-apps/get-started/create-your-first-custom-form) when you integrate a list into Power Apps. In this article, you learn how these forms work and how you can customize them.

When you customize a form for a list, you see the default generated form works for all operations, like creating, showing, or editing an item. This functionality uses generated formulas and the **SharePointIntegration** control.

> [!NOTE]
> When you create or view a list in SharePoint, you're automatically redirected to Microsoft Lists. You can always find the list in both Microsoft Lists and SharePoint. For more information, see [What is a list in Microsoft 365?](https://support.microsoft.com/en-us/office/what-is-a-list-in-microsoft-365-93262a88-20ad-4edc-8410-b6909b2f59a5)

## Understand the default generated form

The default generated form consists of the following controls and their corresponding defaults. Formulas are autogenerated within the defaults.

- **FormScreen1**: This [screen](controls/control-screen.md) contains the form.

- **SharePointForm1**: This [form](working-with-forms.md) can create, show, or edit a list item.

  - **Data Source**: The list for which the form is customized. For example, a SharePoint list acts as a data source.

  - **Item**: A selected item from a list. This item is set to `First()` item in the list for your convenience, when working in Power Apps Studio.

    ```power-fx
    If( IsBlank(SharePointIntegration.Selected) || IsEmpty(SharePointIntegration.Selected),
        First('*YourListName*'),
    SharePointIntegration.Selected )
    ```

    > [!TIP]
    > This formula pattern uses `... SharePointDatasourceName.Selected` and works for the **Item** property of a form. See the [Common issues with the SharePointIntegration object](#common-issues-with-the-sharepointintegration-object) for a formula pattern to set the value of a SharePoint record.

- **OnSuccess**: Once the item is created or saved successfully, the form resets and SharePoint hides the form.

  ```power-fx
  ResetForm(SharePointForm1); RequestHide()
  ```

- **SharePointIntegration**: Communicates user actions between SharePoint and Power Apps.

  | Property | Description | Example |
  |----------|-------------|---------|
  | Data Source | The list for which the form is customized. | *YourListName* |
  | OnNew | Sets **SharePointForm1** in new mode. | *NewForm(SharePointForm1)* |
  | OnView | Sets **SharePointForm1** in view mode. | *ViewForm(SharePointForm1)* |
  | OnEdit | Sets **SharePointForm1** in edit mode. | *EditForm(SharePointForm1)* |
  | OnSave | Submits the changes to **SharePointForm1**. The **SharePointForm1.OnSuccess** formula executes when you successfully submit a form. | *SubmitForm(SharePointForm1)* |
  | OnCancel | Resets the changes to **SharePointForm1**. SharePoint always hides the form when a user selects **Cancel** in SharePoint. | *ResetForm(SharePointForm1)* |

These defaults ensure that the form works when running within SharePoint. The defaults change the Power Apps form mode as the user interacts with it in SharePoint, and they ensure that the changes are submitted to SharePoint.

> [!NOTE]
> While you can manually copy a form from one environment to another, there's currently no automated method in Power Apps to copy a form from one environment to another.

## Understand the SharePointIntegration control

The **SharePointIntegration** control communicates user actions between SharePoint and Power Apps.

:::image type="content" source="./media/sharepoint-form-integration/sharepointintegration-object.png" alt-text="Screenshot of a SharePoint integration object as seen in Power Apps.":::

> [!NOTE]
> You can access properties for the **SharePointIntegration** control only when the form runs in SharePoint, not when you're customizing the form in Power Apps Studio. These properties might not be available in **OnStart** or **OnVisible**.

The **SharePointIntegration** control has these properties:

| Property | Effect or description |
|----------|-----------------------|
| Selected | The selected item from the list. |
| OnNew | Activates when a user selects the **New** button or opens the **Create item** form in SharePoint. |
| OnView | Activates when a user selects an item or opens the **Item detail** form in SharePoint. |
| OnEdit | Activates when a user selects the **Edit all** button or opens the **Edit item** form in SharePoint. |
| OnSave | Activates when a user selects the **Save** button in SharePoint. |
| OnCancel | Activates when a user selects the **Cancel** button in SharePoint. |
| SelectedListItemID | Item ID for the selected item in a list. |
| Data Source | The list that contains the record that the form  shows, edits, or creates. If you change this property, the **Selected** and **SelectedItemID** properties might stop working. |

## Customize the default form

You can change the formulas to further customize the forms.

Consider these tactics when you customize forms:

- Use the **OnSave** formula of the `SharePointIntegration` control to customize the effect of a user selecting **Save** in SharePoint. If you have multiple forms, make sure to submit the changes only for the form currently being used.

  > [!TIP]
  > Set different values for a variable in the **OnNew**, **OnView**, and **OnEdit** formulas. You can use this variable in the **OnSave** formula to determine which form is being used.

- Include **RequestHide()** in the **OnSuccess** formula of all your forms. Without this function, SharePoint doesn't know when to hide the form. Avoid running important code *after* calling **RequestHide()**. Code should run while the form is still visible and able to run logic.

- You can't control the hiding of a form when a user selects **Cancel** in SharePoint. Always reset your forms in the **OnCancel** formula of the `SharePointIntegration` control.

- Properties for the `SharePointIntegration` control might not be available in **OnStart** or **OnVisible**. These events execute only once while the list is loaded. You can use **OnNew**, **OnView**, or **OnEdit** to run logic before the form is shown to the user.

## Common issues with the SharePointIntegration object

- When you set the value of `SharepointIntegration.Selected` to a collection on the **OnView** property, it doesn't show the latest value. To fix this problem, use `SharepointIntegration.SelectedListItemID`, and then do a lookup on the table to get the selectedRecord.

  For example, for **OnView** property:

  - Instead of:

    ```power-fx
    Set( selectedItem,
    SharePointIntegration.Selected );
    ```

  - Use:

    ```power-fx
    Set( selectedLookupItem,
    LookUp( YourSharepointIntegrationObject, 
    ID=SharePointIntegration.SelectedListItemID ) );
    ```

- Collection variables aren't reset when you close the Power Apps form. The state persists for the entire session. If you need to reset the variables, clear them in the **OnView** property of the `SharePointIntegration` object.

- Don't use imperative functions such as **Launch()** in the `SharePointIntegration` properties (such as **OnNew** and **OnView**). This use can cause unexpected behavior since the `SharePointIntegration` lifecycle events (such as selections changing) can trigger in the background even when the form isn't visible.
- 

## Understand user access to customized forms
You can't manually share a SharePoint form customized with Power Apps. Instead, any user who has at least **Read** or **Restricted View** access to the linked SharePoint list inherits access to the form. Users who have only been given permissions to specific items in the list don't have access to the customized form.

### Related information

- [Move SharePoint Custom Forms with Power Apps (white paper)](https://go.microsoft.com/fwlink/?linkid=2263521)
- [EditForm, NewForm, SubmitForm, ResetForm, and ViewForm functions](/power-platform/power-fx/reference/function-form)
- [RequestHide function](/power-platform/power-fx/reference/function-requesthide)

---

## Create a canvas app based on Excel data

Source: [get-started-create-from-blank.md](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/get-started-create-from-blank)

*Learn how to create a canvas app from Excel data by uploading a file, connecting to a cloud workbook, or starting with a blank app.*

# Create a canvas app based on Excel data

This article shows you how to create a canvas app by using Excel data as the data source. If you already track business data in Excel, Power Apps gives you several ways to turn that data into an app.

You'll learn three ways to work with Excel data:

- Upload an Excel file and create a Dataverse table.
- Connect to an Excel file that stays in cloud storage.
- Start with a blank canvas app and add Excel data yourself.

Before you begin, make sure that your Excel data is formatted as a table. This preparation helps Power Apps read and use the data correctly. For more information, see [Formatted as a table in Excel](https://support.office.com/article/Create-an-Excel-table-in-a-worksheet-E81AA349-B006-4F8A-9806-5AF9DF0AC664).

To create an app by using Excel data, choose one of the following options in [Power Apps](https://make.powerapps.com).

| Create options by using Excel | Benefits | Navigation |
|---|---|---|
| [Upload an Excel or .CSV file to Power Apps](#upload-an-excel-or-csv-file-to-power-apps) | Power Apps converts the uploaded data into a Dataverse table. Use this approach when you want cloud storage, improved security, and a reusable table for other apps and flows. | Select **Start with data** > **Upload file**. |
| [Connect to an external Excel file and use it to create a canvas app](#connect-to-an-external-excel-file-from-power-apps) | The workbook stays in its current cloud location. Use this approach when you want a fast way to create an app from an existing Excel table. | Select **Start with data** > **Excel Online (Business)**. |
| [Create a blank canvas app and then add Excel data](#create-a-blank-canvas-app-and-add-excel-data) | You control the screens, layout, formulas, and data experience. Use this approach when you want the most flexibility. | In the left navigation pane, select **Create** > **Create from blank**. Then select the app size. |

## Upload an Excel or CSV file to Power Apps

When you upload Excel data to Power Apps, Power Apps converts the data into a Dataverse table. This approach makes the data easier to manage in Power Apps and gives you capabilities that go beyond Excel alone. For more information, see [Why use Dataverse?](../data-platform/data-platform-intro.md#why-use-dataverse).

1. Sign in to [Power Apps](https://make.powerapps.com).
1. On the home screen, select **Start with data**.
1. On the **Create an app** page, select **Upload file**.
1. Select **Select from device**, browse to your Excel file, and then upload it.

   > [!NOTE]
   > The maximum file size is 5 GB.

1. When Power Apps creates the table, select a column name or the table name to edit properties as needed. If you change a column data type and some existing values don't match the new type, Power Apps removes those values when it generates the table. For more information, see [Create and edit tables using Power Apps](../data-platform/create-edit-entities-portal.md#create-new-tables).
1. Select **Row ownership** and choose how you want to manage row ownership.
1. When you're done, select **Save and open app**.

Power Apps uploads the first 20 rows so that you can start reviewing the app right away. It uploads the remaining data in the background.

### Known issues

- The current data upload process doesn't take the environment data format setting into account.

## Connect to an external Excel file from Power Apps

Store the Excel file in a cloud storage service such as Dropbox, Google Drive, OneDrive, or OneDrive for Business. Power Apps can connect only to Excel files that are stored in the cloud.

Power Apps includes an Excel connector that you can use to access Excel data. The [Excel Online (Business)](/connectors/excelonlinebusiness/) connector provides a fast way to create and deploy apps that use data stored in Excel.

1. Sign in to [Power Apps](https://make.powerapps.com).
1. On the home screen, select **Start with data**.
1. On the **Create an app** page, select **Excel Online (Business)**.
1. If more than one connection is available, select **...** to switch connections or add a new one.
1. Enter the file location, and then select the table.
1. Select **Create app**.

To learn more about sharing Excel data, see [Sharing Excel tables](connections/cloud-storage-blob-connections.md#sharing-excel-tables).

## Create a blank canvas app and add Excel data

Use this example to create a two-screen app in which users browse records on one screen and add, edit, or delete records on another screen.

### Prerequisites

1. Copy this data into an Excel file.

   | StartDay | StartTime | Volunteer | Backup |
   |---|---|---|---|
   | Saturday | 10am-noon | Vasquez | Kumashiro |
   | Saturday | noon-2pm | Ice | Singhal |
   | Saturday | 2pm-4pm | Myk | Mueller |
   | Sunday | 10am-noon | Li | Adams |
   | Sunday | noon-2pm | Singh | Morgan |
   | Sunday | 2pm-4pm | Batye | Nguyen |

1. [Format the data as a table in Excel](https://support.office.com/article/Create-an-Excel-table-in-a-worksheet-E81AA349-B006-4F8A-9806-5AF9DF0AC664) and name the table **Schedule** so that Power Apps can read it.
1. Save the file as **eventsignup.xlsx**, close it, and then upload it to a [cloud-storage account](connections/cloud-storage-blob-connections.md) such as OneDrive.

> [!IMPORTANT]
> You can use your own Excel file and follow this example for the general approach. However, the data in the Excel file must be [formatted as a table](https://support.office.com/article/Create-an-Excel-table-in-a-worksheet-E81AA349-B006-4F8A-9806-5AF9DF0AC664).

### Create a blank app and connect to data

1. Sign in to [Power Apps](https://make.powerapps.com).
1. In the left navigation pane, select **Create** > **Start from blank**.
1. Select the **Phone size** layout.

   The app opens in [Power Apps Studio](power-apps-studio.md), where you can add data and start building.

1. In the middle of the screen, select **Connect to data**.
1. In the **Data** pane, select **Add data**. If your cloud-storage connection already appears, select it. Otherwise, add a connection such as OneDrive:
   1. In the search box, enter **OneDrive**, and then select it.
   1. Select **Add a connection**.
   1. On the connection pane, select **Connect**.
   1. If prompted, enter your credentials.
1. Under **Choose an Excel file**, find and select **eventsignup.xlsx**.
1. Under **Choose a table**, select the check box for **Schedule**, and then select **Connect**.
1. In the upper-right corner of the **Data** pane, select the close icon (**X**).

### Create the view screen

1. On the command bar, select **New screen** > **List**.

   Power Apps adds a screen with default controls such as a search box and a **Gallery** control. The gallery covers the entire screen under the search box.

1. At the top of the new screen, select the **[Title]** label control and rename it to **View records**.
1. In **Tree view**, select **BrowseGallery1**.
1. In the gallery's **Properties** pane, set **Layout** to **Title, subtitle, and body**.
1. In the formula bar, replace **CustomGallerySample** with **Schedule**, and replace both instances of **SampleText** with **Volunteer**.
1. On the right edge of the formula bar, select **Expand formula bar**, and then select **Format text**.

   The formula matches this example:

   ```powerfx
   SortByColumns(
       Search(
           Schedule,
           TextSearchBox1.Text,
           "Volunteer"
       ),
       "Volunteer",
       If(
           SortDescending1,
           SortOrder.Descending,
           SortOrder.Ascending
       )
   )
   ```

1. In the **Properties** pane, select **Edit** next to **Fields**.
1. In the **Title2** box, select **Volunteer**. In the **Subtitle2** box, select **StartDay**. In the **Body1** box, select **StartTime**.
1. In the upper-right corner of the **Data** pane, select the close icon (**X**).

   Users can now sort and filter the gallery by volunteer name based on the **SortByColumns** and **Search** functions in the formula.

   - If a user types at least one letter in the search box, the gallery shows only records where the **Volunteer** field contains that text.
   - If a user selects the sort button, the gallery sorts records in ascending or descending order based on the **Volunteer** field.

For more information about these and other functions, see the [formula reference](formula-reference.md).

### Create the change screen

1. On the command bar, select **New screen** > **Form**.
1. In **Tree view**, select **EditForm1**.
1. In the **Properties** pane, select the down arrow next to **Data source**, and then select **Schedule**.
1. Under the data source, select **Edit fields**.
1. In the **Fields** pane, select **Add field**, select the check box for each field, and then select **Add**.
1. Select the arrow next to each field name to collapse it, and then drag **Volunteer** to the top of the list.

   ![Reorder fields.](./media/get-started-create-from-blank/reorder-fields.png)

1. In the upper-right corner of the **Fields** pane, select the close icon (**X**).
1. Set the **Item** property of the form to this expression in the formula bar:

   `BrowseGallery1.Selected`

1. At the top of the screen, select the **[Label](controls/control-text-box.md)** control, and then replace **[Title]** with **Change records**.

   ![Change title bar.](./media/get-started-create-from-blank/change-title-bar2.png)

### Delete and rename screens

1. In **Tree view**, select the ellipsis (...) for **Screen1**, and then select **Delete**.

   ![Delete screen.](./media/get-started-create-from-blank/delete-screen.png)

1. Select the ellipsis (...) for **Screen2**, select **Rename**, and then enter **ViewScreen**.
1. Select the ellipsis (...) for **Screen3**, select **Rename**, and then enter **ChangeScreen**.

### Configure icons on the view screen

1. Near the top of **ViewScreen**, select the circular arrow icon.

   ![Add record for refresh.](./media/get-started-create-from-blank/refresh-icon.png)

1. Set the **OnSelect** property for that icon to this formula:

   `Refresh(Schedule)`

   When a user selects this icon, the app refreshes data from **Schedule**.

   For more information about this and other functions, see the [formula reference](formula-reference.md).

1. In the upper-right corner of **ViewScreen**, select the plus icon.

   ![Add record.](./media/get-started-create-from-blank/add-record.png)

1. Set the **OnSelect** property for that icon to this formula:

   `NewForm(EditForm1);Navigate(ChangeScreen,ScreenTransition.None)`

   When a user selects this icon, **ChangeScreen** opens with empty fields so that the user can create a record.

1. Select the right-pointing arrow for the first record in the gallery.

   ![Select arrow.](./media/get-started-create-from-blank/select-arrow.png)

1. Set the **OnSelect** property for the arrow to this formula:

   `EditForm(EditForm1); Navigate(ChangeScreen, ScreenTransition.None)`

   When a user selects this icon, **ChangeScreen** opens with the selected record so that the user can edit or delete it.

### Configure icons on the change screen

1. On **ChangeScreen**, select the **X** icon in the upper-left corner.

   ![Cancel icon.](./media/get-started-create-from-blank/cancel-icon.png)

1. Set the **OnSelect** property for that icon to this formula:

   `ResetForm(EditForm1);Navigate(ViewScreen, ScreenTransition.None)`

   When a user selects this icon, the app discards changes on this screen and returns to the view screen.

1. In the upper-right corner, select the checkmark icon.

   ![Checkmark icon.](./media/get-started-create-from-blank/checkmark-icon.png)

1. Set the **OnSelect** property for the checkmark to this formula:

   `SubmitForm(EditForm1); Navigate(ViewScreen, ScreenTransition.None)`

   When a user selects this icon, the app saves changes and returns to the view screen.

1. On the **Insert** tab, select **Icons**, and then select the **Trash** icon.
1. Set the new icon's **Color** property to **White** and move it next to the checkmark icon.

   ![Trash icon.](./media/get-started-create-from-blank/trash-icon.png)

1. Set the **Visible** property for the trash icon to this formula:

   `EditForm1.Mode = FormMode.Edit`

   This icon appears only when the form is in **Edit** mode, not when it is in **New** mode.

1. Set the **OnSelect** property for the trash icon to this formula:

   `Remove(Schedule, BrowseGallery1.Selected); Navigate(ViewScreen, ScreenTransition.None)`

   When a user selects this icon, the app deletes the selected record from the data source and opens the view screen.

### Test the app

1. Select **ViewScreen**, and then select the preview play button to **Preview the app**.
1. Type one or more letters in the search box to filter the list by volunteer name.
1. Select the sort icon one or more times to sort the data in ascending or descending order by volunteer name.
1. Add a record.
1. Update the record that you added, and then save the changes.
1. Update the record that you added again, and then cancel the changes.
1. Delete the record that you added.
1. Close Preview mode by pressing <kbd>Esc</kbd> or selecting the close icon in the upper-right corner.

## Next steps

- Press <kbd>Ctrl+S</kbd> to save your app in the cloud so that you can run it from other devices.
- [Share the app](share-app.md) so that other people can run it.

---

