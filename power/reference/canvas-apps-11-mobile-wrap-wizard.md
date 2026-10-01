# Power Apps Canvas Apps — Native Mobile Apps (Wrap Wizard)

Verbatim Markdown pulled directly from Microsoft's published documentation source (the `MicrosoftDocs/powerapps-docs` and `MicrosoftDocs/power-platform` GitHub repositories that generate the live Microsoft Learn pages), snapshot dated 19 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading. Part of a multi-file set covering the full Power Apps canvas apps documentation tree.

Pages in this file: 9

## Contents

1. [Overview of wrap](#overview-of-wrap)
2. [System requirements and prerequisites for Wrap](#system-requirements-and-prerequisites-for-wrap)
3. [Customize and build your mobile app using the wrap wizard](#customize-and-build-your-mobile-app-using-the-wrap-wizard)
4. [Manual code sign for iOS](#manual-code-sign-for-ios)
5. [Code sign for Android](#code-sign-for-android)
6. [Code signing process for AAB files](#code-signing-process-for-aab-files)
7. [How to set up Azure Key Vault for code signing in wrap wizard](#how-to-set-up-azure-key-vault-for-code-signing-in-wrap-wizard)
8. [Use deep links with wrapped native mobile apps](#use-deep-links-with-wrapped-native-mobile-apps)
9. [Advantages and limitations of Wrap](#advantages-and-limitations-of-wrap)

---

## Overview of wrap

Source: [overview.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/overview)

*Learn about the wrap functionality in Power Apps.*

# Overview of wrap

The **wrap** feature in Power Apps lets you package your canvas app as a custom-branded Android or iOS app for native distribution to mobile users. Distribute these wrapped native mobile apps to users through the [Google Play Store](https://support.google.com/googleplay/work/answer/6138458), [Apple Business Manager](https://developer.apple.com/custom-apps/), or Microsoft Intune.

:::image type="content" source="media/wrap-intro/wrap.png" alt-text="Canvas apps published to mobile users as mobile app package using wrap feature." border="false":::


## Key capabilities

With wrap, you can:

- Package one or more Power Apps canvas apps in the same native mobile app package.
- Customize your mobile app startup experience to match your organization's branding.
- Specify the app icon, splash screen image, welcome screen image, and color palette.
- Update wrapped mobile apps by publishing changes to the included canvas app through the [Power Apps](https://make.powerapps.com) maker portal.
- Distribute apps using MDM.

> [!NOTE]
> All published changes to the included canvas app(s) are downloaded automatically by existing, released versions of your wrapped mobile apps.

## Benefits of wrap

**Wrap** brings native mobile application development platform (MADP) capabilities to Power Apps:

| Benefit | Description |
|---------|-------------|
| **No-code mobile app development** | Create mobile apps with no previous experience |
| **Managed mobile app builds** | We generate the app for you |
| **Seamless end-to-end branding** | Use your own logo and color palette |
| **Multiple canvas apps support** | Bundle multiple apps in a single mobile app |
| **Enterprise governance with Microsoft Intune** | Protect your data with app management |
  

## Software and device requirements

### Platforms supported

- **iOS**: Version 14.0 or later.
- **Android**: Version 8.0 (API level 26) or later.

### Device requirements

- **iOS**: iPhone 6S or later, iPad 5th generation or later.
- **Android**: Any device that runs Android 8.0 or later.

### Developer requirements

- Microsoft Power Apps account with appropriate licenses.
- Access to Microsoft Entra ID (formerly Azure AD) for app registration.
- Azure subscription (for Azure Key Vault and Blob Storage).
- For manual code signing:
  - iOS: macOS device with Xcode installed.
  - Android: Windows PC with Android Studio installed.


## Wrap process overview

The **wrap** feature packages your canvas app in a native mobile app shell and produces a mobile package. You can digitally sign and distribute this mobile package as your custom-branded Android and iOS app through native distribution channels, like [Google Play Store](https://support.google.com/googleplay/work/answer/6138458) and [Apple Business Manager](https://developer.apple.com/custom-apps/).

### Step-by-step process

1. Select your **primary canvas app** and start the wrap wizard. A primary canvas app provides the initial experience users see when launching your mobile app. Your canvas apps must be part of a solution. More information: [Add canvas app to solution](prerequisites.md#add-canvas-app-to-a-solution).
1. Optionally, add **secondary canvas apps** to your mobile app in the wrap wizard. More information: [Wrapping multiple canvas apps together](#wrap-multiple-canvas-apps-together).
1. Select the **target platforms** (iOS and Android) for your mobile app. Optionally, select **automatically code sign** your mobile app package.
1. Register your app. Use an existing **app registration** or create a new one in the wrap wizard.
1. Customize **app branding** with icons, images, and a color palette to personalize your mobile app.
1. Add the **Azure blob storage account name and container name**. Use an existing **Azure blob storage** or create a new one.
1. Start the build process in the **Wrap up** step to generate your custom branded mobile app.
1. Download your mobile app from the **App blob storage location**.
1. If you don't select **automatically code sign** in the wrap wizard, code sign the mobile app package manually. More about signing your mobile app package manually: [Signing your mobile app package manually](wrap-how-to.md#sign-your-mobile-app-package-manually-optional).
1. Test the app package.
1. Distribute the app package to mobile users.


## Wrap multiple canvas apps together

You can wrap more than one canvas app into a single mobile app package. The mobile app package needs a home app, called the primary app. This app becomes the entry point for all other canvas apps included in the mobile app package, which are called secondary apps.

Secondary apps are optional. When you wrap only one canvas app, that app is considered the primary app, and the mobile app package has no secondary apps.

As shown in the illustration below, a primary app can have links to multiple secondary apps. You can manage navigation between primary and secondary apps using the [Launch()](../../canvas-apps/functions/function-param.md) function.

:::image type="content" source="media/wrap-intro/primary-secondary-apps.png" alt-text="Primary and secondary apps wrapped together." border="false":::


## Brand your mobile app

Wrap supports customization of the mobile app bootstrap experience to match your organization's branding requirements. You can specify:

- App icon
- Splash screen image
- Welcome (sign in) screen image
- Color palette for native experiences

:::image type="content" source="media/wrap-intro/wrap-branding.png" alt-text="Branding in wrap." border="false":::

Branding customization options are available when building your wrap project. Learn more in [Configure branding](wrap-how-to.md#6-configure-branding)

---

## Wrap terminology

Wrap involves multiple components across Power Apps and third-party platforms such as iOS and Android. Understanding these components is important when working with the wrap functionality.

### App platform(s)

Target platforms for your app during the build process. You can create builds for:

- **iOS** — creates IPA package
- **Android** — creates APK package
- **Google Play Store** — creates AAB package for distribution

### Bundle ID

The bundle ID is a unique identifier for your app that follows a reverse domain name pattern. It must contain one period (.) and no spaces. Example: `com.contoso.myapp`.

This bundle ID is used when [creating the Azure key vault for wrap](create-key-vault-for-code-signing.md) after iOS or Android certificates are created and uploaded. If you've already created the Azure key vault, verify the bundle ID in the **Tags** section of the [Azure portal](https://portal.azure.com). Use this same bundle ID in [Step 2: Target platform](wrap-how-to.md#3-choose-target-platform).

### Code signing

Code signing completes a mobile app before distribution to end users. A code-signed app assures users it comes from a known source and the app code hasn't changed since it was last signed by the trusted source.

### Primary app

A primary app is the entry point or home app for the mobile app experience when wrapping multiple canvas apps together. If only one canvas app is wrapped, it's considered the primary app.

### Secondary app

Secondary apps are optional canvas apps that you wrap in the same build for mobile app distribution along with the [primary app](#primary-app).

### Redirect URI

A redirect URI (reply URL) is the location where the authorization server sends the user after successful app authorization and access token grant. The authorization server sends the code or token to the redirect URI, so registering the correct location during app registration is important. More information: [Redirect URI](/azure/active-directory/develop/reply-url)

---

## Common issues and limitations

### Known limitations

- The wrap feature only supports canvas apps (not model-driven apps)
- All canvas apps in a wrap project must be from the same environment
- Users must have a Power Apps license to use wrapped apps

### Common issues

- **Bundle ID conflicts**: Ensure your bundle ID is unique across your organization
- **Image format issues**: All images must be in PNG format
- **Signing certificate problems**: Verify certificate validity and expiration dates
- **Azure Key Vault access**: Make sure proper permissions are configured

For troubleshooting details, see [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues).

---

## Next steps

[System requirements and prerequisites for Wrap](prerequisites.md)  

### See also

- [Use the wrap wizard to build your mobile app](wrap-how-to.md) 
- [Manual code sign on iOS](code-sign-ios.md)
- [Manual code sign on Android](code-sign-Android.md)
- [Code sign for Google Play Store](https://developer.android.com/studio/publish/app-signing)
- [Create your Azure Key Vault for automated code signing](create-key-vault-for-code-signing.md)
- [Frequently Asked Questions](faq.yml)  
- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues)  
- [Benefits and limitations of Wrap](limitations.md)

---

## System requirements and prerequisites for Wrap

Source: [prerequisites.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/prerequisites)

*Learn about system requirements and other prerequisites for wrap.*

# System requirements and prerequisites for Wrap

Before you use Wrap to create native mobile apps from your Power Apps canvas apps, check that your system meets these requirements.

## Software and device requirements

- You need a Mac device for [manual code signing with iOS](code-sign-ios.md).
- You need a Windows PC for [manual code signing with Android](code-sign-android.md).
- To run the wrapped mobile app:
  - Android device with version 10 or higher
  - iOS device with version 14 or higher

> [!NOTE]
> You need an [Apple Developer Program](https://developer.apple.com/) account to develop apps for iOS.

## Permissions and access requirements

1. You need access to:
    - One or more [canvas apps](../../canvas-apps/share-app.md) to build the wrap project.
    - Azure blob storage, including the account name and container name. More information: [Create an Azure storage account](/azure/storage/common/storage-account-create?tabs=azure-portal).
    - The [Azure portal](https://portal.azure.com/) to create [app registration](/azure/active-directory/develop/quickstart-register-app#prerequisites) and register your app, which should be in the same environment as your Power Apps.

1. An Azure admin must grant you access to use the specific wrap app. More information: [API permissions](wrap-how-to.md#grant-api-permissions-as-an-azure-tenant-admin).
1. Your apps must be part of a [managed or unmanaged solution](/power-platform/alm/solution-concepts-alm#managed-and-unmanaged-solutions). If not, add them to an existing or new solution. More information: [Create a canvas app from within a solution](../../canvas-apps/add-app-solution.md#add-an-existing-canvas-app-to-a-solution).
1. You need an Azure key vault to perform the automatic sign-in process through Wrap wizard. More information: [Create a key vault using the Azure portal](/azure/key-vault/general/quick-create-portal).
1. Check the policies enabled for your application. More information: [Conditional Access policy templates](/entra/identity/conditional-access/concept-conditional-access-policy-common)
1. If multifactor authentication (MFA) is enabled, make sure MFA is enabled for the accounts you'll use to sign in, or disable the conditional access policies.

## Sign-in options in Wrap

- **Manual code sign-in for Android and iOS**: This option is best for most scenarios. For Android, [generate keys](code-sign-android.md#generate-key-and-signature-hash) and [generate a signature hash](code-sign-android.md#generate-signature-hash-key-and-certificate) before you start. You need the signature hash to set up the [Redirect URI](overview.md#redirect-uri). More information: [manual code sign-in for Android](code-sign-android.md).
- **Automatic sign-in using Wrap wizard**: This option requires an Azure key vault. More information: [creating a key vault using the Azure portal](/azure/key-vault/general/quick-create-portal).

## Add canvas app to a solution

Wrap requires your apps to be part of a solution. If your canvas apps aren't already in a solution, add them to an existing or new solution.

1. In the left navigation pane, select **Solutions**. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.
1. Select a solution, and then select **Edit**.

:::image type="content" source="media/wrap-canvas-app/select-solution.png" alt-text="Screenshot of the Solutions page with a solution selected.":::

Select **+ Add existing** from the top menu, and then select **App > Canvas app** from the dropdown.

:::image type="content" source="media/wrap-canvas-app/select-add-existing.png" alt-text="Screenshot of the top menu showing the Add existing option selected from the menu.":::

Select the **Outside Dataverse** tab, select your app from the list, and then select **Add** to add the app to the solution.

:::image type="content" source="media/wrap-canvas-app/add-app.png" alt-text="Screenshot of the Outside Dataverse tab with a canvas app selected and the Add button highlighted.":::

More information: [Add an app to a solution](../../canvas-apps/add-app-solution.md#add-an-existing-canvas-app-to-a-solution)

## Next steps

[Use the wrap wizard to build your mobile app](wrap-how-to.md)

### See also

- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps-and-solutions/wrap-issues)
- [Manual code sign on iOS](code-sign-ios.md)
- [Manual code sign on Android](code-sign-Android.md)
- [Code sign for Google Play Store](https://developer.android.com/studio/publish/app-signing)
- [Create your Azure Key Vault for automated code signing](create-key-vault-for-code-signing.md)
- [Frequently Asked Questions](faq.yml)

---

## Customize and build your mobile app using the wrap wizard

Source: [wrap-how-to.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/wrap-how-to)

*Learn about the steps to build and customize your mobile app using wrap wizard.*

# Wrap wizard: Step-by-step guide to building your native mobile app

Use this guide to convert one or more canvas apps into a single custom-branded app package that you can deploy on Google Play and the iOS App Store.

The wrap feature in Power Apps enables you to create native mobile versions of your [canvas apps](../../canvas-apps/getting-started.md) as custom-branded Android and iOS mobile apps (IPA, APK, AAB packages). You can distribute these wrapped native mobile apps to end users through [Google Play](https://support.google.com/googleplay/work/answer/6138458), [Apple Business Manager](https://developer.apple.com/custom-apps/), or other native distribution methods.

When you update and republish your app, the wrapped app is automatically updated for users.

## Steps to create a custom-branded native app using the wrap wizard

Follow these steps to configure, build, sign, and distribute a custom-branded native mobile app package (APK, AAB, or IPA) from your canvas apps using the wrap wizard in Power Apps.

### 1. Sign in and start a wrap project

1. Sign in to [Power Apps maker portal](https://make.powerapps.com).
2. Select **Wrap** from the left navigation pane. If the item isn’t in the side panel pane, select […More](../maker/canvas-apps/intro-maker-portal.md#1--left-navigation-pane) and then select the item you want.
3. Select the app you want to wrap, then select **Wrap** on the command bar.

### 2. Select apps

1. On the **Select the app(s) to wrap** screen, select your primary and secondary app.

   - **Primary app**: The main app end users see when the mobile app launches.
   - **Secondary app(s)**: Optional other apps bundled in the same mobile app package.

   > [!NOTE]
   > - You can use the same primary app in multiple wrap projects.
   > - If the primary app name appears incorrect, proceed to the next step and return to refresh the name.

2. Select **Next**.

### 3. Choose target platform

1. On the **Choose mobile platform to target** screen, enter a **Bundle ID**.

   > [!NOTE]
   > The **Bundle ID** is a unique identifier for your app. It must contain one period (.) and no spaces. Use this same bundle ID when [creating the Azure key vault](create-key-vault-for-code-signing.md) after generating and uploading your iOS or Android certificates. If you have already created the Azure Key Vault, verify the bundle ID in the **Tags** section of the [Azure portal](https://portal.azure.com).

2. Under **Target platform(s)**, select all the mobile platforms that your end users use on their mobile devices.

3. You need to have Azure key vault, to upload your build to Azure blob storage. If you haven't already created, create one. Create an Azure key vault right within the Wrap wizard, or follow the instructions manually.

4. Turn on the **Autosigning** toggle to automate the signing process.
   > [!NOTE]
   > Manual signing options:
   > - [Code sign for iOS](code-sign-ios.md)
   > - [Code sign for Android](code-sign-android.md)
   > - [Code sign for Google Play Store](https://developer.android.com/studio/publish/app-signing)
   > You must manually sign AAB files regardless of the signing option selected in the wizard.

5. Set up autosigning through the wizard.
   1. In the target platform step, toggle on **Autosigning**. The service checks if key vault and certificate are already attached.

      > [!NOTE]
      > Azure Key Vault is used to securely store and manage application secrets and certificates, with centralized access and full audit logging.
   1. If you don't have key vault and certificate or want to change them, select **Configure**.

      > [!NOTE]
      > Only Azure admins can create a key vault from the wrap wizard. Other users need to follow the [manual key vault creation process](create-key-vault-for-code-signing.md).

      :::image type="content" source="media/how-to-v2/auto-signing-target-platform.png" alt-text="Screenshot that shows auto signing option in target platform step." lightbox="media/how-to-v2/auto-signing-target-platform.png":::
   1. On the side panel, select the subscription and resource group, and choose the key vault. To create a new key vault, select **Create a new keyvault**. After you select the key vault, select **Next**.

      :::image type="content" source="media/how-to-v2/auto-signing-key-vault-selection.png" alt-text="Screenshot that shows key vault selected for auto signing in target platform step" lightbox="media/how-to-v2/auto-signing-key-vault-selection.png":::
   1. The service checks if the appropriate service principal, reader role, access policies, and environment variables are set up for the key vault. If errors appear, fix them. After all checks pass, select **Next**.
   1. On the next screen, enter the name of the certificate in the key vault. 
   1. If no certificate exists or you want to change the certificate, see [Generate key and signature hash](code-sign-android.md#generate-key-and-signature-hash) to create a new certificate. Then select **Create a certificate** on this screen. This action takes you to the Azure portal key vault location. Upload the generated certificate into the configured key vault. 
      > [!NOTE]
      > Users are responsible for creating the certificate.

      :::image type="content" source="media/how-to-v2/auto-signing-adding-mobile-signing-certificates.png" alt-text="Screenshot that shows create or enter a certificate for auto signing in target platform step" lightbox="media/how-to-v2/auto-signing-adding-mobile-signing-certificates.png":::
   1. Select **Finish**.
   1. On the main screen, the Azure Key Vault and certificate appear as confirmed.
   1. On the main screen, select **Next**.

6. Set up autosigning from within Azure portal.
    1. Refer to instructions in [create an Azure key vault](create-key-vault-for-code-signing.md) to create an Azure key vault. Once the vault is created, you need to add the required tags, secrets, and certificates. Add the environment variable if not created already.
    1. To create the environment variable, go to [Power Apps](https://make.powerapps.com) > **Solutions** > **Default solution**. Then select **New** > **More** > **Environment variable**, add the display name as "PA_Wrap_KV_ResourceID".
       :::image type="content" source="media/how-to-v2/add-new-env-variable.png" alt-text="Screenshot that shows screen for adding new environment variable." lightbox="media/how-to-v2/add-new-env-variable.png":::
    The name of the new environment variable must have the prefix "new." If it doesn't, see [Set Environment Variable Prefix](#set-environment-variable-prefix) for detailed steps.
       :::image type="content" source="media/how-to-v2/new-prefix-solution.png" alt-text="Screenshot that shows screen with prefix as new" lightbox="media/how-to-v2/new-prefix-solution.png":::
    1. To add vault information to your environment variables, access the **Azure** portal as an admin. Navigate to **All Resources** > **Your Key Vault** > **Properties**, and then copy the **Resource ID**.
      :::image type="content" source="media/how-to-v2/copy-resource-id.png" alt-text="Screenshot that shows resource id to be copied." lightbox="media/how-to-v2/copy-resource-id.png":::
    1. To add the input to the environment variable, go to **Power Apps** > **ApplicationName** > **All** > **Environment variable**. Click the three dots, select **Edit**, add the copied value to **Default value**, and save.
    1. To check whether the table value has been updated, go to **Power Apps** > **Tables** > **Environment variable definition** > **new_PA_Wrap_KV_ResourceID** . The value in **Default value** must be same as that of the resourceID for which you want to add the vault. 
         > [!NOTE]
         > Guidelines for adding the input behind the environment variables for Key vault information:
         > - Environment variables must not be empty or can contain multiple entries.
         > - Ensure that the resourceID added is correct (verify spelling).
         > - Ensure that the resourceID added has non-empty tags and includes all the tags expected with the bundle ID used in the wrap wizard.
    1. Follow the steps in [Steps for automated code signing](create-key-vault-for-code-signing.md) to create the tags, secrets, and certificates required during the automatic signing process.

### 4. Manage output

Configure where your app binaries (APK and IPA files) will be stored. Choose one of the following options based on your storage and access requirements. 
  :::image type="content" source="media/how-to-v2/manage-output-dataverse-storage.png" alt-text="Screenshot that shows options for storage like Dataverse and Azure Blob Storage" lightbox="media/how-to-v2/manage-output-dataverse-storage.png":::

#### Dataverse (Recommended)

Dataverse storage is the simpler option and is recommended for testing and evaluation of deployments. 

When you select Dataverse, build binaries are automatically stored in the `msdyn_PowerAppsWrapBuild` table in your current environment. Builds count against your Dataverse storage capacity.

#### Azure Blob Storage 

Azure Blob Storage requires setup. 

##### Prerequisites 

Before you configure Azure Blob Storage, make sure you have: 

- An Azure Blob Storage account and container. If you don't have them, learn how to [create a storage account](/azure/storage/common/storage-account-create?tabs=azure-portal). 

- An Azure Key Vault that contains the access credentials for your storage account. If you don't have one, learn how to [create a key vault](create-key-vault-for-code-signing.md). 

- Sufficient permissions to read secrets from the key vault. 

##### Configure Azure Blob Storage 

To configure Azure blob storage follow these steps:

1. On the **Manage output** page, select **Configure**. 
 :::image type="content" source="media/how-to-v2/manage-output-screen-configure-keyvault.png" alt-text="Screenshot that shows key vault selected in manage output step" lightbox="media/how-to-v2/manage-output-screen-configure-keyvault.png":::
1. In the **Configure keyvault** side panel, select the key vault that stores your Azure blob storage credentials, and then select **Next**.
1. Enter the following details:  
     - **Storage account name**: The name of your Azure Blob Storage account.
     - **Container name**: The container where build artifacts will be uploaded. 
1. Select **Save**. 

After you save, the configuration is applied to subsequent builds. To verify, run a build and confirm that the APK or IPA file appears in your specified container. 

### 5. Register your app

On the **Register your app** screen, register your application in Azure to establish trust with the Microsoft identity platform.

- **If you have already registered an app**:
  - Find your registration in the owned registration field.

- **If you do not see your registered app**:
  1. Select **New app registration** to create a new registration.
  2. Provide:
     - **Application name**: The customer-facing name of your app
     - **Android signature hash** (if targeting Android): A 28-character alphanumeric string
       :::image type="content" source="media/how-to-v2/new-app-reg2-updated.png" alt-text="Screenshot that shows new app registration screen" lightbox="media/how-to-v2/new-app-reg2-updated.png":::
  3. Save your changes.
     
#### Configure admin allowed third-party apps as an azure tenant admin

The registered app must be configured as a third-party app. To configure the app, the Azure tenant admin follows these steps.

# [For Windows](#tab/windows)

1. Open Windows PowerShell as administrator.
2. Run these commands:
   ```powershell
   Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -AllowClobber -Force
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
   Import-Module -Name Microsoft.PowerApps.Administration.PowerShell
   Add-AdminAllowedThirdPartyApps
   Get-AdminAllowedThirdPartyApps
   ```
3. Provide the App ID when prompted.

# [For Mac](#tab/mac)

1. Open Azure PowerShell as tenant admin.
2. Run these commands:
   ```powershell
   Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -AllowClobber -Force
   Import-Module -Name Microsoft.PowerApps.Administration.PowerShell
   Add-AdminAllowedThirdPartyApps
   Get-AdminAllowedThirdPartyApps
   ```
3. Provide the App ID when prompted.

---

After completing these steps, the registration screen will look like this:

:::image type="content" source="media/how-to-v2/new-app-reg-updated.png" alt-text="Screenshot that shows registration screen with green ticks for steps completed" lightbox="media/how-to-v2/new-app-reg-updated.png":::

#### Grant API permissions as an Azure tenant admin

The app requires the following API permissions to function correctly.

##### Required API permissions

| API Type                    | Specific API                                             | Reason                                                                                                                       |
|----------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **Microsoft APIs**         | Dynamics CRM                                             | The application needs `user_impersonation` to call Dataverse for the user.                      |
| **APIs my organization uses** | Azure API Connections                                      | The application needs `Runtime.All` to call any connector from Power Platform.                                   |
| **APIs my organization uses** | PowerApps Service                                         | The application needs the `User` permission to contact Power Apps backend services from Power Platform.                                     |
| **APIs my organization uses** | Power BI                                                 | The application needs Power BI permissions to access or embed Power BI content.                                          |
| **APIs my organization uses** | Microsoft Mobile Application Management        | The application needs this permission because Power Apps uses Intune SDK internally. |

##### Configure permissions from within Wrap wizard 

The wrap wizard checks and flags permissions that aren't available with the app. As an Azure admin, select one click access in the wrap wizard to grant the pending permissions. Alternatively, you can configure permissions through the Powershell commands below.

:::image type="content" source="media/how-to-v2/api-permission-one-click.png" alt-text="Screenshot that shows one click fix app permissions option" lightbox="media/how-to-v2/api-permission-one-click.png":::

##### Configure permissions through Powershell commands:

Make sure **DeviceManagementManagedApplication** is set to **Yes** when you grant admin consent for your app.
    :::image type="content" source="media/how-to-v2/api-permissions-2.png" alt-text="Screenshot that shows the API permissions for the app." lightbox="media/how-to-v2/api-permissions-2.png":::

Run these PowerShell commands as an Azure admin if you don't see permissions under **APIs my organization uses**:

1. Ensure the module [Microsoft Graph](https://www.powershellgallery.com/packages/Microsoft.Graph/) is available or install it:
   ```powershell
   Install-Module -Name Microsoft.Graph
   ```

2. Grant *Azure API Connections* permission for the static AppId fe053c5f-3692-4f14-aef2-ee34fc081cae:
   ```powershell
   Connect-MgGraph -TenantId <your tenant ID>
   New-MgServicePrincipal -AppId fe053c5f-3692-4f14-aef2-ee34fc081cae -DisplayName "Azure API Connections"
   ```

3. Grant *PowerApps Service* permission for the static AppId 475226c6-020e-4fb2-8a90-7a972cbfc1d4:
   ```powershell
   Connect-MgGraph -TenantId <your tenant ID>
   New-MgServicePrincipal -AppId 475226c6-020e-4fb2-8a90-7a972cbfc1d4 -DisplayName "PowerApps Service"
   ```

> [!NOTE]
> If only the **Application name** field is visible, continue to the next steps and select **Android** as a target platform to display the signature hash field.

##### Configure API permissions manually (optional)

If you get errors, manually configure API permissions. For more information, see [Add and configure](/azure/active-directory/develop/v2-permissions-and-consent#request-the-permissions-in-the-app-registration-portal).


#### Add Redirect URIs as an app admin

1. In the Azure Portal, go to your app registration > **Authentication**.
2. Select **Add a platform** and choose **iOS** or **Android**.
3. For iOS, enter the **Bundle ID**.
   For Android, enter both the **Bundle ID** and **Signature hash key**.
   :::image type="content" source="media/how-to-v2/redirect-uri.png" alt-text="Screenshot that shows redirect URIs for the app." lightbox="media/how-to-v2/redirect-uri.png":::

### 6. Configure branding

1. On the **Configure Branding** step, set the following options for your app:

> [!NOTE]
> All images must be in .png format. Default images will be used if no custom images are selected.

| Setting | Description | Requirements |
|---------|-------------|--------------|
| **App icons** | Icons for your app | iOS: 1024x1024 px or larger<br>Android: 432x432 px or larger |
| **Splash screen image** | Image shown while the app loads | .png format |
| **Welcome screen image** | Image shown on the sign-in screen | .png format |
| **Background fill color** | Color for welcome screen background | Hexadecimal color code |
| **Button fill color** | Color for buttons | Hexadecimal color code |
| **Status bar text theme** | Color for the status bar text | Light or Dark |

2. Select **Next**.

### 7. Wrap up and build

1. On the **Wrap up** screen, review your app details and select **Build**.
2. After a successful build, your app package will be available in the Azure blob storage you specified.

### View your build

You can view your build in several ways:

- After building, select **View Builds**
- Go to **Wrap projects** in the side pane, hover over the required project, and select it
- Select the **View builds** option in the top header

:::image type="content" source="media/how-to-v2/view-build.png" alt-text="Screenshot that shows how to view builds." lightbox="media/how-to-v2/view-build.png":::

> [!NOTE]
> To manually code sign an iOS app, unzip the IPA file using a Mac device.

## Test and distribute your app

Test your app and distribute it as needed. If you encounter issues, see the [troubleshooting page](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues).

## Set environment variable prefix 

The name of the new environment variable must have the prefix "new." If it doesn't, follow these steps:

1. Go to **Solutions** > **New solution**.
1. Select a **Publisher** or create one.
1. Select the edit icon next to the **Publisher** to view or change the prefix. 
1. If the prefix isn't "new," change it to "new."
1. Save your changes.

## Register your app on Azure portal manually (optional)

You can create your app registration automatically in the wizard or manually in Azure. More information: [Quickstart: Register an application with the Microsoft identity platform](/azure/active-directory/develop/quickstart-register-app).

> [!NOTE]
> Both single tenant and multitenant customers can use wrap to create native mobile apps based on their Power Apps canvas apps.

When registering, select an account type containing **Any Microsoft Entra directory - Multitenant**:
- Accounts in any organizational directory (Any Microsoft Entra directory - Multitenant)
- Accounts in any organizational directory (Any Microsoft Entra directory - Multitenant) and personal Microsoft accounts such as Skype or Xbox

:::image type="content" source="media/wrap-intro/AppResgistration_AccountTypes.png" alt-text="App registration - supported account types for wrap.":::

> [!IMPORTANT]
> - Wrap only supports **Multitenant** account types currently. The single tenant account type is not yet supported. More information: [Account types in Microsoft identity platform](/azure/active-directory/develop/v2-supported-account-types).
> - You must create a separate **Redirect URI** for each platform (iOS, Android).

## Sign your mobile app package manually (optional)

You can sign your app automatically in **Step 2** or manually after building. [Code signing](overview.md#code-signing) is different for Android and iOS.

**Advantages of automatic signing for iOS and Android (APK):**

- You don't need to repeat the signing process during rewrapping.
- You don't have to wait for app developers to finish the process.
- You don't need to set up Android Studio or remember passwords.
- You don't need a Mac device for iOS signing.

| Platform | Signing Method |
|----------|---------------|
| iOS                  | [Manual code sign for iOS](code-sign-ios.md) |
| Android              | [Manual code sign for Android](code-sign-android.md) |
| Google Play Store    | [Code signing for Google Play Store](https://developer.android.com/studio/publish/app-signing) |

## See also

- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues)
- [Wrap overview](overview.md)
- [Manual code sign for iOS](code-sign-ios.md)
- [Manual code sign for Android](code-sign-android.md)
- [Create your Azure Key Vault for automated code signing](create-key-vault-for-code-signing.md)
- [Frequently asked questions for wrap](faq.yml)

---

## Manual code sign for iOS

Source: [code-sign-ios.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/code-sign-ios)

*Learn how to manually code sign for iOS for Power Apps wrap.*

# Manual code sign for iOS

This article explains how to code sign for iOS. You need to sign your app for iOS if you selected iOS as one of the [platforms](overview.md#app-platforms) while creating and building your [wrap project](wrap-how-to.md#steps-to-create-a-custom-branded-native-app-using-the-wrap-wizard).

> [!IMPORTANT]
> Using Xcode to digitally sign your wrapped mobile apps for iOS is not supported. Follow the instructions below to sign your wrapped mobile app packages for iOS correctly.


## Before you begin

### Prerequisites

Before you start, make sure you have:

- App ID
- Device UDIDs (only for testing and development purposes)
- A macOS device to code sign for iOS

### Set up your Mac

1. Install **Xcode**. More information: [Xcode](https://developer.apple.com/support/xcode/)
2. Install PowerShell for macOS. More information: [Installing PowerShell on macOS](/powershell/scripting/install/installing-powershell-on-macos)
3. Enroll in the [Apple Developer Program](https://developer.apple.com/programs/)
4. For organization distribution, sign up for the [Apple Enterprise Developer Program](https://developer.apple.com/programs/enterprise/)


## Create App ID

1. Sign in to your developer account at <https://developer.apple.com> and select the **Account** tab.

    :::image type="content" source="media/code-sign-ios/account-tab.png" alt-text="Account tab.":::

2. Go to [**Certificates, IDs & Profiles > Identifiers**](https://developer.apple.com/account/resources/identifiers/list).

3. Select **+** to create a new identifier.

    :::image type="content" source="media/code-sign-ios/identifier.png" alt-text="Create new identifier.":::

4. Select **App IDs**, then select **Continue**.

    :::image type="content" source="media/code-sign-ios/register-identifier.png" alt-text="Register a new identifier.":::

5. Select the type as **App**, then select **Continue**.

6. Register an **App ID**:

    :::image type="content" source="media/code-sign-ios/register-appid.png" alt-text="Register an App ID.":::

    - **Description** - Name of your app.
    - **Bundle ID** - Select **Explicit Bundle ID**.
    - Enter the bundle ID that you used while [creating the wrap project](wrap-how-to.md#3-choose-target-platform). More information: [Bundle ID](overview.md#bundle-id)
    - Enable these capabilities:
        - Associated Domains
        - iCloud
        - NFC Tag Reading
        - Push Notifications
    - Select **Continue**.

7. Review and register the App ID.

## Create distribution certificate

### Create Certificate Signing Request (CSR)

1. On your Mac, go to the **Applications** folder > **Utilities** > open **Keychain Access**.

2. Select **Keychain Access** > **Certificate Assistant** > **Request a Certificate from a Certificate Authority**.

    :::image type="content" source="media/code-sign-ios/cert-req.png" alt-text="Request a certificate from a CA.":::

3. Fill out the **Certificate Information**:
    - In the **User Email Address** field, enter your Apple ID email address.
    - In the **Common Name** field, enter your name.
    - In the **Request** group, select **Saved to disk**.
    - Save the file to your Mac.
    - Select **Continue**.

### Upload and install certificate

1. Sign in to your developer account at <https://developer.apple.com> by selecting the **Account** tab.

2. Go to [**Certificates, IDs & Profiles > Certificates**](https://developer.apple.com/account/resources/certificates/list).

3. Select **+** to create a new certificate.

4. Select **App Store and Ad Hoc** > **Continue**.

    ![Certificates, Identifiers & Profiles](media/code-sign-ios/new-cert.png)

    > [!NOTE]
    > If you have an Enterprise Developer Account, you'll have the option to create an Enterprise Distribution certificate.

5. Upload the Certificate Signing Request (CSR) file that you generated in the previous steps.

    :::image type="content" source="media/code-sign-ios/upload-cert.png" alt-text="Upload the certificate.":::

6. Select **Continue**, and download the certificate to your Mac.

7. Double-click the downloaded .cer file to install it in Keychain Access.

8. Make note of the **Name** of the certificate (usually formatted as **iPhone Distribution: Name (Team ID)**). This value is the code signing identity needed for signing.


## Register devices for testing

> [!NOTE]
> This step is only necessary if you're distributing the app to external users. It's not required if the app is only for internal users.

1. Sign in to your developer account at <https://developer.apple.com> by selecting the **Account** tab.

2. Go to [**Certificates, IDs & Profiles > Devices**](https://developer.apple.com/account/resources/devices/list).

3. Select **+** to register one or more devices.

4. Enter the **Device Name** and **Device ID (UDID)**.

    :::image type="content" source="media/code-sign-ios/register-device.png" alt-text="Register a device.":::

5. Select **Save**.

    > [!TIP]
    > You can register multiple devices at once by uploading a list of UDIDs.


## Create iOS Provisioning Profile

1. Sign in to your developer account at <https://developer.apple.com> and select the **Account** tab.

2. Go to [**Certificates, IDs & Profiles > Profiles**](https://developer.apple.com/account/resources/profiles/list).

3. Select **+** to create a new profile.

4. Select **Ad Hoc** > **Continue**.

    :::image type="content" source="media/code-sign-ios/ad-hoc.png" alt-text="Ad Hoc.":::

    > [!NOTE]
    > For production use, select the **App Store** distribution method.

5. Select the App ID you created earlier, then select **Continue**.

    :::image type="content" source="media/code-sign-ios/app-id.png" alt-text="App ID.":::

6. Select the certificate you created earlier, then select **Continue**.

    :::image type="content" source="media/code-sign-ios/select-cert.png" alt-text="Select certificate.":::

7. Select all the test devices where you want to install your app, then select **Continue**.

    :::image type="content" source="media/code-sign-ios/add-devices.png" alt-text="Add devices.":::

8. Name your provisioning profile and note down the name.

9. Select **Generate** and download the profile to your Mac.

10. Double-click the downloaded file (*.mobileprovision) to register it with Xcode.

## Sign the iOS Archive

1. Download and unzip the **iOS-Archive.zip** file from your Azure blob storage. This creates a folder named after the [Bundle ID](wrap-how-to.md#3-choose-target-platform). In the example below, the Bundle ID is **com.single.wrap**.

2. For enterprise signing only: Open the file **Distribution-exportOptions.plist** with Xcode and change the value for the **method** field to **enterprise**.

    > [!NOTE]
    > Enterprise signing is not supported with Key Vault signing.

3. Open Terminal and change directory to the unzipped folder.

4. Enter `pwsh` to start PowerShell in the terminal.

5. Run the PowerShell script with your certificate and provisioning profile information:
   ```
   ./SignAndGenerateIPA.ps1 -CodeSigningIdentity "YOUR_CODE_SIGNING_IDENTITY" -ProvisioningProfilePath "PATH_TO_PROVISIONING_PROFILE"
   ```

    > [!NOTE]
    > To find your **CodeSigningIdentity** value, right-click on the **.mobileprovision** file, select **More Info** > **Preview**. Look for the **Name** field under **Certificates**.

    > [!TIP]
    > The **ProvisioningProfilePath** is the path to the .mobileprovision file you downloaded. For example: `/Users/username/Downloads/MyProvisioningProfile.mobileprovision`

    :::image type="content" source="media/code-sign-ios/powershell.png" alt-text="Run PowerShell script.":::

6. When the script completes, a **.ipa** file is created (for example, **com.single.wrap.ipa**).

    > [!IMPORTANT]
    > If the script fails, delete the unzipped folder and files as they might be corrupted. Unzip **iOS-Archive.zip** again before retrying.

    :::image type="content" source="media/code-sign-ios/folder-structure.png" alt-text="IPA package.":::



## Distribute the app

Install the **.ipa** file on registered devices using the **Finder** app. 

For enterprise distribution with Microsoft Intune:
- [Add an iOS/iPadOS line-of-business app to Microsoft Intune](/mem/intune/apps/lob-apps-ios) 
- [Give your app access to the Intune app protection service](/mem/intune/developer/app-sdk-get-started#give-your-app-access-to-the-intune-app-protection-service-optional)



## See also

- [Wrap overview](overview.md)
- [Manual code sign on Android](code-sign-android.md)  
- [Frequently asked questions for wrap](faq.yml)  
- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues)

---

## Code sign for Android

Source: [code-sign-android.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/code-sign-android)

*Learn how to code sign for Android for Power Apps wrap.*

# Code sign for Android

This article explains how to manually code sign your Android (APK) app for Power Apps wrap. Sign your app for Android if you select Android as one of the [platforms](overview.md#app-platforms) when you create and build your [wrap project](wrap-how-to.md#steps-to-create-a-custom-branded-native-app-using-the-wrap-wizard).

> [!IMPORTANT]
> To sign an AAB app for Google Play distribution, see [Sign your app](https://developer.android.com/studio/publish/app-signing).

## Before you begin

### Required software

Before you begin, install and set up:

- [Android Studio](https://developer.android.com/studio)
- [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)
- [apksigner tool](https://developer.android.com/studio/command-line/apksigner) (included with Android Studio)

### Prerequisites

You need:
- The application name to create the hash key.
- The latest APK file to sign in.

> [!NOTE]
> Use the `.jks` extension for manual signing and the `.pfx` extension for automatic signing.

## Generate key and signature hash

> [!NOTE]
> Skip to [Manual signing](#manual-signing-of-apk-package-not-for-kv-signing) if you already generated keys and the signature hash when you created the [app registration](wrap-how-to.md#5-register-your-app).

### Set up environment variables

If you don't set environment variables:

1. Download and install Android Studio and OpenSSL.
1. Add `keytool` and `openssl` to your PATH environment variable:
   - Add `C:\Program Files\Android\Android Studio\jbr\bin` to your PATH.
   - Add the path of `openssl.exe` (for example, `C:\Program Files\OpenSSL-Win64\bin`) to your PATH.


## **For manual signing process**
### Generate signature hash key and certificate

Run this command in the command prompt:

```
keytool -genkey -alias powerappswrap -keyalg RSA -keystore powerappswrap.jks -keysize 2048 -validity 10000
```

When prompted:
1. Enter a password for your keystore.
1. Enter your name, organization, location, and other required details.
1. Confirm the information.

Run this command to generate key and certificate:

```
keytool -exportcert -alias powerappswrap -keystore powerappswrap.jks | openssl sha1 -binary | openssl base64
```

When prompted, enter the keystore password you created earlier.

:::image type="content" source="media/code-sign-android/codeSignIn3.png" alt-text="A screenshot with keytool command using the parameters in the example shown earlier." lightbox="media/code-sign-android/codeSignIn3.png":::

**Parameters explained:**

| Parameter | Description |
|-----------|-------------|
| **genkey** | Command to generate a key |
| **alias** | Alias for the keystore entry |
| **keyalg** | Key algorithm name |
| **keystore** | Name of the keystore |
| **keysize** | Size of each key |
| **validity** | Validity of the key in days |
| **exportcert** | Reads the certificate from the keystore |
| **openssl** | Generates SHA1 key for Android |

## **For automatic key vault signing process**

### Generate signature hash key and certificate

Run this command in the command prompt:

```
keytool -genkey -alias powerappswrap -keyalg RSA -keystore powerappswrap.pfx -keysize 2048 -validity 10000
```

When prompted:
1. Enter a password for your keystore.
1. Enter your name, organization, location, and other required details.
1. Confirm the information.

Run this command to generate key and certificate:

```
keytool -exportcert -alias powerappswrap -keystore powerappswrap.pfx | openssl sha1 -binary | openssl base64
```

When prompted, enter the keystore password you created earlier.

:::image type="content" source="media/code-sign-android/codeSignIn3.png" alt-text="Screenshot of keytool command using the parameters in the example shown earlier." lightbox="media/code-sign-android/codeSignIn3.png":::

**Parameters explained:**

| Parameter | Description |
|-----------|-------------|
| **genkey** | Generates a key. |
| **alias** | Alias for the keystore entry. |
| **keyalg** | Key algorithm name. |
| **keystore** | Name of the keystore. |
| **keysize** | Size of each key. |
| **validity** | Validity of the key in days. |
| **exportcert** | Reads the certificate from the keystore |
| **openssl** | Generates SHA1 key for Android |


## Manual signing of APK package (Not for KV signing)

Follow these steps if you don't use automatic sign-in during wrap or if you try to upload an AAB file for Play Store. To avoid repeating this process, use automatic sign-in when possible.

### Locate the apksigner tool

1. Open Android Studio.
1. Go to **Tools** > **SDK Manager** > **Android SDK Location** to find your SDK path.
1. In the SDK directory, navigate to:
   - **build-tools** > **[version number]** > find **apksigner.bat** (Windows) or **apksigner** (Mac/Linux)
   - Or: **build-tools** > **[version number]** > **lib** > find **apksigner.jar**

:::image type="content" source="media/code-sign-android/codeSignIn2.png" alt-text="A screenshot with apksigner location information." lightbox="media/code-sign-android/codeSignIn2.png":::

### Sign the APK file

Run this command to sign your APK:

```
apksigner.bat sign --ks PATH_TO_KEYSTORE --ks-key-alias KEY_ALIAS PATH_TO_APK
```

**Parameters explained:**

| Parameter | Description |
|-----------|-------------|
| **ks** | Path to your keystore file (for example, `C:\Users\name\Desktop\powerappswrap.jks`) |
| **ks-key-alias** | The alias you used when generating the key (for example, `powerappswrap`) |
| **PATH_TO_APK** | Full path to your APK file (for example, `C:\Users\name\Downloads\MyApp.apk`) |

When prompted, enter the keystore password.

**Example:**
```
apksigner.bat sign --ks C:\Users\name\Desktop\powerappswrap.jks --ks-key-alias powerappswrap C:\Users\name\Desktop\MyApp.apk
```

### Verify the signature

After signing, verify the APK signature with:
```
apksigner.bat verify --verbose PATH_TO_APK
```

A successful verification confirms your APK is properly signed and ready for distribution.

For more information, see [Android Studio command line tools: apksigner](https://developer.android.com/studio/command-line/apksigner).


## Distribute the app

After signing your app, you can distribute it using several methods:

### Distribution options

- **Microsoft Intune**: To distribute using Microsoft Intune, see [Add an Android line-of-business app to Microsoft Intune](/mem/intune/apps/lob-apps-android).

- **Intune app protection**: To give your app access to the Intune app protection service, see [Give your app access to the Intune app protection service](/mem/intune/developer/app-sdk-get-started#give-your-app-access-to-the-intune-app-protection-service-optional).

- **Direct distribution**: You can also distribute the signed APK directly to users for manual installation.


## See also

- [Wrap overview](overview.md)
- [Manually Signing the APK - Xamarin](/xamarin/android/deploy-test/signing/manually-signing-the-apk)
- [Manual code sign on iOS](code-sign-ios.md)
- [Frequently asked questions for wrap](faq.yml)
- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues)

---

## Code signing process for AAB files

Source: [code-sign-aab-file.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/code-sign-aab-file)

*Learn how to manually code sign in Android App Bundle (AAB) files and convert them to APKs for debugging, including required tools and step-by-step commands.*

# Code signing process for AAB file

This article explains how to manually code sign an AAB file.

## Prerequisite

1. Set up [Android Studio](https://developer.android.com/studio).

1. Install bundletool for converting AAB file to APK file. You can download the latest version from the [official site](https://github.com/google/bundletool/releases).

1. Install jarsigner for signing in the AAB file. You can install jarsigner by downloading and setting up the [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html).

## Signing process for AAB file 

> [!NOTE]
> You need to sign the AAB file even if you select the automatic signing process in the wrap wizard.

To sign an AAB file, follow these steps:

1. Open a terminal or command prompt.
1. Go to the directory where `jarsigner` is installed.
1. Run the commands shown in the image.
    :::image type="content" source="media/code-sign-aab-file/jarsigner-code.png" alt-text="Screenshot of command prompt showing jarsigner usage for AAB file.":::
        Replace the placeholders:
        - `<path-to-your-keystore>.jks` – Path to your .jks keystore file
        - `<output-signed-aab-file>.aab` – Output file name.
        - `<input-unsigned-aab-file>.aab` – Unsigned .aab file.
        - `<bundleid>` – Bundle ID used while wrapping.

## Convert AAB to APK file for manual debugging

To convert an AAB file to an APK file, follow these steps:

1. Open a terminal or command prompt.
2. Run the commands shown in the screenshot.
    :::image type="content" source="media/code-sign-aab-file/java-code.png" alt-text="Screenshot of command prompt showing java code for AAB file.":::
        Replace the placeholders:
        - `<path-to-signed-aab-file>.aab` – Path to the signed AAB file.
        - `<output-directory>` – Output directory for the .apks file.

- Sign the APK if you use the manual signing process. For more information, see [Code sign for Android - Power Apps](/power-apps/maker/common/wrap/code-sign-android#manual-sign-the-apk-package).


## See also

- [Manual code sign for iOS](code-sign-ios.md)
- [Manual code sign for Android](code-sign-android.md)

---

## How to set up Azure Key Vault for code signing in wrap wizard

Source: [create-key-vault-for-code-signing.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/create-key-vault-for-code-signing)

*Step-by-step guide to configure Azure Key Vault and automate code signing for native mobile apps in wrap wizard.*

# Set up Azure Key Vault for wrap wizard code signing

Azure Key Vault is a cloud service that securely stores secrets like certificates, passwords, encryption keys, and other sensitive data. Use Key Vault to manage certificates and secrets for automated code signing in wrap wizard. For more information, see [Introduction to Azure Key Vault](/azure/key-vault/general/overview).  

This guide explains how new users create and configure an Azure Key Vault.

## Prerequisites

Before you begin, ensure you have the following:

- A Microsoft Entra subscription to [create a key vault](/azure/key-vault/general/quick-create-portal).
- Admin access to your Azure tenant.
- An [Apple Developer account](https://developer.apple.com) enrolled in the Apple Developer Program or Apple Enterprise Developer Program.
- An [Apple distribution certificate](code-sign-ios.md#create-distribution-certificate) and either an [ad-hoc provisioning profile](code-sign-ios.md#create-ios-provisioning-profile) or an enterprise provisioning profile.

## Step 1: Create an Azure Key Vault

If you do not already have a Key Vault, follow the steps in [Create a vault](/azure/key-vault/general/quick-create-portal#create-a-vault) using the Azure portal.

## Step 2: Create a service principal for wrap Key Vault access

A service principal is required so wrap wizard can access your Key Vault.

1. Sign in to your tenant as an admin.
2. Open PowerShell and run the following command:
   ```
   Connect-AzureAD -TenantId <your tenant ID>
   New-AzureADServicePrincipal -AppId 4e1f8dc5-5a42-45ce-a096-700fa485ba20 -DisplayName "Wrap KeyVault Access App"
   ```

## Step 3: Assign Reader Role to the Service Principal

Give the service principal permission to read your Key Vault.

1. In the Azure portal, navigate to your Key Vault.
2. Select **Access control (IAM)**.
3. Select **Add** > **Add role assignment**.  
4. On the **Members** tab, select **Job function roles**, and  then choose **Reader**.
5. Select **Select member**, search for "Wrap KeyVault Access App", and select it.
6. Select **Review + assign**.

:::image type="content" source="media/how-to-v2/Add_role_for_wrap_signing.png" alt-text="Screenshot that shows how to assign the Reader role to the Wrap KeyVault Access App." lightbox="media/how-to-v2/Add_role_for_wrap_signing.png":::

Repeat these steps to add user access permissions to your account.

## Step 4: Configure access policies for Key Vault

1. Go to Key Vault settings.
2. In **Access configuration**, select **Vault access policies**.
3. Add a policy for the service principal and your user account.
    - For **Secret permissions** and **Certificate permissions**, select **Get** and **List**.

:::image type="content" source="media/how-to-v2/AzureKV-Access-Policy.png" alt-text="Screenshot of Access Policies required: Get and List for secret and certificate permissions." lightbox="media/how-to-v2/AzureKV-Access-Policy.png":::

## Step 5: Upload Certificates and Secrets

You need platform-specific certificates and secrets for Android and iOS apps.

### For Android

- Generate a `.pfx` certificate file.
- Upload it to the **Certificates** section of your Key Vault.
- For guidance, see [Generate keys](code-sign-android.md#generate-key-and-signature-hash).

:::image type="content" source="media/wrap-canvas-app/wrap-1.png" alt-text="Screenshot that shows how to create a cert for Android." lightbox="media/wrap-canvas-app/wrap-1.png":::

> [!NOTE]
> Ensure the certificate name is included in the tag step, and its password matches the store pass parameter you set when creating the `.pfx` file.

### For iOS

1. Install your `.cer` file using Keychain Access. For more information, see [Create the distribution certificate](code-sign-ios.md#create-distribution-certificate).
2. Export the certificate as a `.p12` file and rename its extension to `.pfx` (required by Key Vault).
3. Upload the `.pfx` file to your Key Vault and provide the password you set for the `.p12` file.
4. Create a provisioning profile. For more information, see [Create the provisioning profile](code-sign-ios.md#create-ios-provisioning-profile).
5. Encode the provisioning profile to base64:
   - On Mac, run: `base64 -i example.mobileprovision`
   - On Windows, run: `certutil -encode data.txt tmp.b64`
6. Upload the base64 string as a secret in Key Vault and the `.pfx` file as a certificate.

:::image type="content" source="media/wrap-canvas-app/wrap-2.png" alt-text="Screenshot that shows how to create a cert for iOS." lightbox="media/wrap-canvas-app/wrap-2.png":::

## Step 6: Add Certificate Tags

After uploading your iOS or Android certificates, add three tags:

- Tag name: Use your app’s bundle ID.
- Tag value: Use the name of the uploaded certificate.

Use the same bundle ID that you’ll use in the [wrap wizard](wrap-how-to.md#3-choose-target-platform).

:::image type="content" source="media/wrap-canvas-app/wrap-3.png" alt-text="Screenshot that shows how to add tags." lightbox="media/wrap-canvas-app/wrap-3.png":::

## Reference Video

Watch a walkthrough video: [How to configure access to key vault](https://www.youtube.com/watch?v=QV5xAUoJDcA&t=7s)

## Troubleshooting

If you run into issues, see [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps-and-solutions/wrap-issues).

## See also

- [Wrap overview](overview.md)
- [Code sign for iOS](code-sign-ios.md)
- [Code sign for Android](code-sign-android.md)
- [Code sign for Google Play Store](https://developer.android.com/studio/publish/app-signing)
- [Frequently asked questions for wrap](faq.yml)
- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps/wrap-issues)

---

## Use deep links with wrapped native mobile apps

Source: [wrap-deep-links.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/wrap-deep-links)

*Learn about deep linking in wrap functionality in Power Apps.*

# Use deep links with wrapped mobile apps

Deep links let users move from one application to another on computers and mobile devices. For example, a mobile app can deep link to Facebook to sign in. Deep linking an email address could open an email app to allow users to start composing a message. A website could use a deep link to an app store to start download for a specfic mobile app.

You can deep link to a wrapped native mobile app from other apps. Deep links for wrapped mobile apps should start with the following:

```ms-mobile-apps:///providers/Microsoft.PowerApps/apps/<appID>?tenantId=<tenantId>```

| **Parameter**        | **Description**                                                              |
|----------------------|------------------------------------------------------------------------------|
| &lt;app-id&gt;       | Opens the correct app module                                                 |
| &lt;tenantId&gt;     | Connects to the correct tenant                                               |

  
 For information on how to deep link into other apps in Power Apps, see [Use deep links with Power Apps mobile](/power-apps/mobile/mobile-deep-links).

---

## Advantages and limitations of Wrap

Source: [limitations.md](https://learn.microsoft.com/en-us/power-apps/maker/common/wrap/limitations)

*Learn about advantages and limitations of Wrap*

# Benefits and limitations of Wrap

Wrap gives app makers benefits like improved adoption, better branding, and flexible distribution options. But it also has some limitations you need to consider.

## Benefits of wrap

1. **Improved app adoption**: Users easily find and use your app by searching for its name in the App Store or Play Store. This direct access streamlines the experience and increases adoption rates.
1. **Enhanced branding flexibility**: Makers customize their app's branding, improving both distribution and user engagement.
1. **Custom distribution channels**: Distribute your apps through preferred channels, so you have more control and can reach your target audience more effectively, instead of relying only on standard platforms.
1. **Power Apps mobile for frontline workers (FLWs)**: Power Apps Mobile is for frontline workers. The wrap APK lets guest accounts sign in, so frontline workers outside your organization can use it. For details, see [Frequently asked questions for wrap: Why am I not able to sign into my wrapped application?](faq.yml).
1. **Access without MFA or Intune**: You can use the Power Apps mobile app without multifactor authentication (MFA) or Microsoft Intune if your organization's conditional access policies allow it.
1. **Offline features**: Wrap apps support offline capabilities.

## Limitations of Wrap

1. **Logout button**: There's no visible sign out button. 
   > [!NOTE]
   > Users can select and hold the intended application to sign out. Makers should let users know about this method.
1. **Push notifications**: Push notifications aren't supported.
1. **Navigation between apps**: You can't go directly from a specific screen in one app to a specific screen in another app. Only the home screen of the other app opens.
1. **APK size limit**: APK files distributed through the Google Play Store are limited to 100 MB. To support larger apps (up to 150 MB), create an AAB file during the wrap process.
1. **Android hardware back button**: The Android hardware back button doesn't always sync with the application back button.
1. **Feedback**: You can't provide feedback in the wrap app.
1. **Surveys**: Surveys aren't available for wrap users.
1. **Sovereign cloud**: Wrap doesn't support sovereign cloud environments.
1. **Full image view (offline)**: Offline-enabled wrap apps only show image thumbnails, not full image views.
1. **VPN**: The wrap wizard doesn't support creating a wrapped app while you're connected to a VPN. Updates are in progress.

### See also

- [Troubleshoot issues with the wrap feature in Power Apps](/troubleshoot/power-platform/power-apps/manage-apps-and-solutions/wrap-issues)
- [Frequently Asked Questions](faq.yml)

---

