function screenshot(trainName) {
  let date = new Date();  // 現在の日付を取得
  let timezone = Session.getScriptTimeZone();  // スクリプトのタイムゾーンを取得
  let formattedDate = Utilities.formatDate(date, timezone, 'yyyy/MM/dd');  // yyyy/MM/dd 形式で日付をフォーマット
  let formattedDatenoslash = Utilities.formatDate(date, timezone, 'yyyyMMdd');    // yyyyMMdd 形式で日付をフォーマット
  let url = getUrl(trainName);
  let apiKey = '743a4c52618142c8beaf2404d2d69944';  // ApiFlashのAPIキー
  let apiUrl = 'https://api.apiflash.com/v1/urltoimage?access_key=' + apiKey + '&url=' + encodeURIComponent(url)+'&format=png'; 

  try {
    // APIリクエストを送信
    let response = UrlFetchApp.fetch(apiUrl, {muteHttpExceptions: true});  // エラーレスポンスも取得
    let responseCode = response.getResponseCode();
    let responseBody = response.getContentText();
    
    if (responseCode == 200) {
      // スクリーンショットが成功した場合
      let imageBlob = response.getBlob();
      let folder = DriveApp.getFolderById(screenshotfolder);  // 保存先のGoogle DriveフォルダID
      let file = folder.createFile(imageBlob);
      file.setName('screenshot.png');
      Logger.log('スクリーンショットが保存されました: ' + file.getUrl() + `\n`+ file.getId());
      return file.getId();
    } else {
      // エラーが発生した場合
      Logger.log('APIリクエストエラー: ' + responseCode);
      Logger.log('エラー詳細: ' + responseBody);
    }
  } catch (e) {
    Logger.log('リクエスト中にエラーが発生しました: ' + e.message);
  }
}

//trainName

// 西武新宿線
// https://www.seiburailway.jp/railway/delay/detail/?indexTime=4&date=${formattedDate}

// 小田急線
// https://www.odakyu.jp/program/emg/certificate11.html

// 丸ノ内線
// https://www.tokyometro.jp/delay/detail/${formattedDatenoslash}/marunouchi_7_print.shtml

// 山手線
// https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=05&T=02

// 中央快速線・中央本線
// https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=06&T=02

// 中央・総武線
// https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=07&T=02

// 宇都宮線
// https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=08&T=02

// 埼京線・川越線
// https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=09&T=02
