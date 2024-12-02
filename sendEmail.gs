function sendEmail(userId) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('UserData');
  const data = sheet.getDataRange().getValues();

  // Find user data based on userId
  const user = data.find(row => row[0] === userId);
  if (user) {
    const studentName = user[1];
    const studentNumber = user[2];
    const teacherEmail = user[3];
    const trainName = user[4];

    // Create email subject and body
    const subject = '遅刻に関する連絡';
    const body = `AIシステム科の先生方へ \n\n ${studentNumber}の${studentName}です。\n\n 本日、${trainName}線で遅延があり、本日の一限に遅刻にする可能性があります。\n\n よろしくお願いします \n${studentName}`;

    try {
      // Attempt to send the email to the teacher
      GmailApp.sendEmail(teacherEmail, subject, body);

      // Set timer for 1 minute
      action_first();

      return '送信完了!';  // Return success message

    } catch (error) {
      // Catch any errors during the email sending process
      Logger.log("Error sending email: " + error.message);
      return `メール送信中にエラーが発生しました。再試行してください。${error.message}`;  // Error message
    }
  }
  return 'User not found!';
}

function handlesendEmail(event) {
  const userId = event.source.userId;

  // If the user presses "Send Email", trigger the sendEmail function
  if (event.message.text === '遅延') {
    const result = sendEmail(userId);
    replyToUser(event.replyToken, { type: 'text', text: result });
  }
}
