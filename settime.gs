function action_first() {
  // Logger.log("最初の動作を実行しました");
  //不要になったトリガーを削除
  let delect = new deleteTriggers();
  
  // 1分後に次の動作を実行するトリガーを設定
  let triggerTime = new Date();
  triggerTime.setMinutes(triggerTime.getMinutes() + 1); // 現在時刻から4時間後に設定

  // 1分後に次の動作を実行するトリガーを作成
  ScriptApp.newTrigger('action_second')  // 次の関数名
    .timeBased()
    .at(triggerTime)  // 1分後に実行
    .create();

  Logger.log("1分後に次の動作が実行されるように設定しました");
}

//不要になったトリガーを削除
function deleteTriggers() {
  let triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function action_second() {
  const globalUserId = PropertiesService.getScriptProperties().getProperty('globalUserId');
  if (!globalUserId) {
    Logger.log("No user ID found in script properties.");
    return 'User not found!';
  }

  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('UserData');
  const data = sheet.getDataRange().getValues();

  // Find user data based on userId
  const user = data.find(row => row[0] === globalUserId);
  if (user) {
    const studentName = user[1];
    const studentNumber = user[2];
    const teacherEmail = user[3];
    const trainName = user[4];

  try {
      // Attempt to reply screenshot to the teacher
      replyToDelayEmail(studentName, studentNumber, teacherEmail, trainName);
      return "返信メールを送信しました。";

    } catch (error) {
      // Catch any errors during the email sending process
      Logger.log("Error sending email: " + error.message);
      return `メール送信中にエラーが発生しました。再試行してください。${error.message}`;  // Error message
    }
  }
  return 'User not found!';
}