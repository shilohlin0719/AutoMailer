function replyToDelayEmail(studentName, studentNumber, teacherEmail, trainName) {
  try {
    let replyBody = `AIシステム科の先生方へ \n\n${studentNumber}の${studentName}です。\n遅延証明書を添付いたします。\n\nよろしくお願いします \n${studentNumber}\n${studentName}`;
    
    // 返信メッセージに遅延証明書ファイルを添付
    let file = DriveApp.getFileById(screenshot(trainName));  // Google Driveからファイルを取得

    GmailApp.sendEmail(teacherEmail, "[連絡]遅延証明書の送付", replyBody, {
      attachments: [file]
    });
    
    Logger.log("返信メールを送信しました。");
  } catch (error) {
    // Catch any errors during the email sending process
    Logger.log("Error sending email: " + error.message);
    return `メール送信中にエラーが発生しました。再試行してください。${error.message}`;  // Error message
  }
}
