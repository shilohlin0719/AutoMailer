// Save user data to Google Sheets
function saveUserData(userId, studentName, studentNumber, teacherEmail, trainName) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('UserData');  // Sheet name: 'UserData'

  if (!sheet) {
    Logger.log('Error: UserData sheet does not exist.');
    return;
  }

  const data = sheet.getDataRange().getValues();  // Get all the data in the sheet
  let rowToUpdate = -1;  // Default value for no existing row
  
  // Loop through the rows to find the userId
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == userId) {  // Assuming userId is in the first column (index 0)
      rowToUpdate = i + 1;  // Store the row index (1-based for Google Sheets)
      break;
    }
  }

  if (rowToUpdate !== -1) {
    // If the user already has a row, update it
    sheet.getRange(rowToUpdate, 2, 1, 4).setValues([[studentName, studentNumber, teacherEmail, trainName]]);
    Logger.log('Updated existing data for user: ' + userId);
  } else {
    // If the user doesn't have a row, append new data
    sheet.appendRow([userId, studentName, studentNumber, teacherEmail, trainName]);
    Logger.log('Appended new data for user: ' + userId);
  }
}


// Collect user info and create format
function createFormat(event, userId) {
  const userProperties = PropertiesService.getUserProperties();

  // Initialize user data and state if not already set
  let userData = {
    step: 'studentName', // Start with asking for student name
    collectionComplete: false // Add flag to track if collection is complete
  };
  userProperties.setProperty(userId, JSON.stringify(userData));

  // Start by asking for the student's name
  replyToUser(event.replyToken, { type: 'text', text: '氏名を入力してください' });
}

function continueCollecting(event, userId, message) {
  const userProperties = PropertiesService.getUserProperties();
  let userData = JSON.parse(userProperties.getProperty(userId));

  if (!userData) {
    // If no data is found, the user is either not in the flow or the session expired.
    replyToUser(event.replyToken, { type: 'text', text: 'Please start the process by sending "定型文設定".' });
    return;
  }

  // If collection is complete, do not proceed with collecting data
  if (userData.collectionComplete) {
    replyToUser(event.replyToken, { type: 'text', text: 'Your data collection is already complete.' });
    return;
  }

  // Collect data based on current step
  switch (userData.step) {
    case 'studentName':
      userData.studentName = message;
      userData.step = 'studentNumber';  // Move to next step
      replyToUser(event.replyToken, { type: 'text', text: '学籍番号を入力してください。' });
      break;
      
    case 'studentNumber':
      userData.studentNumber = message;
      userData.step = 'teacherEmail';  // Move to next step
      replyToUser(event.replyToken, { type: 'text', text: '担当の先生のメールを入力してください。' });
      break;

    case 'teacherEmail':
      userData.teacherEmail = message;
      userData.step = 'trainName';  // Move to next step
      replyToUser(event.replyToken, { type: 'text', text: '電車の名前[  ]線を入力してください。' });
      break;

    case 'trainName':
      userData.trainName = message;
      // All data collected, now save to Google Sheets
      saveUserData(userId, userData.studentName, userData.studentNumber, userData.teacherEmail, userData.trainName);
      // Confirm with the user and end the session
      replyToUser(event.replyToken, { type: 'text', text: '定型文を設定しました。' });

      // Mark the collection as complete
      userData.collectionComplete = true;

      // Clear the session data
      userProperties.deleteProperty(userId);
      break;

    default:
      // If no valid step, prompt the user to start again
      replyToUser(event.replyToken, { type: 'text', text: 'Please start by sending "定型文設定".' });
      break;
  }

  // Update the user's progress (step)
  userProperties.setProperty(userId, JSON.stringify(userData));
}
