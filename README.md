# LINE Messaging API Integration with Google Apps Script

This project integrates **LINE Messaging API** with **Google Apps Script** to send automated emails and screenshots when a train delay occurs. The steps below will guide you through the setup process.

## Steps for Setting Up the Project

### 1. Create a New Apps Script Project
- Go to [Google Apps Script](https://script.google.com/).
- Create a new project.
- Copy the code from [GitHub](https://github.com/shilohlin0719/AutoMailer) (omit the `README.md` file).

### 2. Set Up LINE Messaging API

1. **Create a LINE Messaging API Channel:**
   - Visit the [LINE Developers Console](https://developers.line.biz/).
   - Create a **New Provider** (if you don’t already have one).
   - Create a **New Channel** and choose **Messaging API**.
   - Obtain your **Channel Access Token**.
   - Replace the `MY_TOKEN` placeholder in `config.gs` with your Channel Access Token.

   ![LINE Messaging API Setup](https://github.com/shilohlin0719/AutoMailer/raw/main/images/MY_TOKEN.png)


### 3. Configure Google Sheets

1. **Create a New Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com/) and create a new blank spreadsheet.
   - Copy the **Sheet ID** from the URL (the long string between `/d/` and `/edit`).
   - Replace the `sheetId` placeholder in `config.gs` with your Google Sheets ID.

### 4. Configure Google Drive Folder

1. **Create a New Folder in Google Drive:**
   - Go to [Google Drive](https://drive.google.com/).
   - Click **New** and select **Folder** to create a new folder.
   - Copy the **Folder ID** from the URL (the string after `/folders/`).
   - Replace the `screenshotfolder` placeholder in `config.gs` with your Folder ID.

### 5. Set Up Webhook URL

1. **Deploy the Script as a Web App:**
   - In Apps Script, click **Deploy** → **Test Deploy** → **Manage Deployments**.
   - Choose **Web App** and give it a name.
   - Set the **App Executer** to your Google Account.
   - Set **Access** to **Anyone (even anonymous)**.
   - Click **Deploy**, and copy the **Webhook URL**.

2. **Configure Webhook in LINE Developers Console:**
   - Go back to the [LINE Developers Console](https://developers.line.biz/).
   - Open your **Messaging API Channel**.
   - Under **Messaging API Settings**, paste the copied **Webhook URL** and save.

   ![Webhook URL Configuration](https://github.com/shilohlin0719/AutoMailer/raw/main/images/webhook-url.png)

   - Enable **Webhooks** under the **Response Settings** and disable the other options.

   ![Webhook URL Configuration](https://github.com/shilohlin0719/AutoMailer/raw/main/images/enable-webhooks.png)



### 6. Create and Set Up Rich Menus in LINE
1. In the LINE Developers Console:
   - Go to **Home** → **Rich Menus** → Create a new menu.
   - Configure your template and set up delays for sending the messages.

   ![Rich Menu Setup](https://github.com/shilohlin0719/AutoMailer/raw/main/images/rich-menu.png)

### 7. Modify Email Sending Time

1. To change the time when the email is sent:
   - Open `settime.gs` and modify the first parameter (1 for 1 minute, 240 for 4 hours).
   - After updating, **deploy** the changes and replace the Webhook URL in LINE Developers Console with the new URL from the deployment.

   ![Set Time Example](https://github.com/shilohlin0719/AutoMailer/raw/main/images/set-time.png)

### 8. Test the Chatbot

Once the bot's rich menu and delay settings are configured:
- When the **Delay** button is pressed, the system will automatically send a delay notification email to the designated teacher.
- After the specified delay, a screenshot of the delay certificate will also be sent automatically.

---

## Requirements
- **Google Apps Script** account
- **LINE Messaging API** account
- **Google Sheets** and **Google Drive** access

## Acknowledgements

- Special thanks to **Yu** ([@LiuYuRungGitHub](https://github.com/LiuYuRung)) for her contribution to the `reply.gs`, `screenshot.gs`, and `settime.gs` file. Her work on the response handling logic has been invaluable!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
