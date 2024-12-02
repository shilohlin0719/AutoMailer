function getUrl(trainName) {
  let date = new Date();  // 現在の日付を取得
  let timezone = Session.getScriptTimeZone();  // スクリプトのタイムゾーンを取得
  let formattedDate = Utilities.formatDate(date, timezone, 'yyyy/MM/dd');  // yyyy/MM/dd 形式で日付をフォーマット
  let formattedDatenoslash = Utilities.formatDate(date, timezone, 'yyyyMMdd');    // yyyyMMdd 形式で日付をフォーマット
  switch(trainName){
    case('東横'):
      var url = `https://syoumeisyo.tokyu.co.jp/lines/delay?line_name=toyoko&direction=up&occurrence_date=${formattedDate}&time_zone=first_half`;
      break;
    case('西武新宿'):
      var url = `https://www.seiburailway.jp/railway/delay/detail/?indexTime=4&date=${formattedDate}`;
      break;
    case('小田急'):
      var url = `https://www.odakyu.jp/program/emg/certificate11.html`;
      break;
    case('丸ノ内'):
      var url = `https://www.tokyometro.jp/delay/detail/${formattedDatenoslash}/marunouchi_7_print.shtml`;
      break;
    case('山手線'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=05&T=02`;
      break;
    case('中央快速'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=06&T=02`;
      break;  
    case('中央本線'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=06&T=02`;
      break; 
    case('中央'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=07&T=02`;
      break; 
    case('総武'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=07&T=02`;
      break; 
    case('宇都宮'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=08&T=02`;
      break; 
    case('埼京'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=09&T=02`;
      break;       
    case('川越宮'):
      var url = `https://traininfo.jreast.co.jp/delay_certificate/pop.aspx?D=${formattedDatenoslash}&R=09&T=02`;
      break;                        
  }
 Logger.log(url);
  return url;    
}
