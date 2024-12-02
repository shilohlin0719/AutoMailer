const CHANNEL_ACCESS_TOKEN = MY_TOKEN;  // Should be in config.gs

function doPost(e) {
  const json = JSON.parse(e.postData.contents);

  // Loop through events to handle multiple messages in a single request
  for (let i = 0; i < json.events.length; i++) {
    const event = json.events[i];
    const userId = event.source.userId;
    const message = event.message.text;

    // Log user interaction for debugging
    Logger.log(`User ID: ${userId}`);
    Logger.log(`Message: ${message}`);

    const userProperties = PropertiesService.getUserProperties();
    let userData = JSON.parse(userProperties.getProperty(userId));

    // Store globalUserId and globalReplyToken for future access in action_second()
    PropertiesService.getScriptProperties().setProperty('globalUserId', userId);

    // Handle the case for sending email first
    if (message === '遅延') {
      handlesendEmail(event);
      return; // Stop further processing if the '遅延' command is triggered
    }

    // Handle the case for creating email format
    if (message === '定型文設定') {
      // Initialize user data and start the process
      createFormat(event, userId);

    } else {
      // Check if the user is in an active collection process
      if (userData && userData.collectionComplete) {
      // If collection is complete, send a message that their data is saved
        replyToUser(event.replyToken, { type: 'text', text: 'Your data collection is already complete. Type "定型文設定" to start again.' });
        return; // Stop further processing for data collection
      } else {
        // Continue the form collection flow for the user
        continueCollecting(event, userId, message);
      }
    }
  }
}

function replyToUser(replyToken, message) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };

  const payload = {
    replyToken: replyToken,
    messages: [message]
  };

  const options = {
    method: 'POST',
    headers: headers,
    payload: JSON.stringify(payload)
  };

  // Send the reply
  UrlFetchApp.fetch(url, options);
}

