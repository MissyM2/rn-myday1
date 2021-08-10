export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  /* calculate correct time
  int sMydayID = Convert.ToInt16(myDayID);
  sMydayID = sMydayID - 1;
  MTBL_MYDAY startObj = databaseHelper.GetMydayStartObject(sMydayID);
  MTBL_MYDAY stopObj = databaseHelper.GetMydayObjectForLocation(Convert.ToInt16(myDayID));
  if (startObj != null && stopObj != null)
  {
      if (Convert.ToInt16(startObj.TimestampMilliSec) > Convert.ToInt16(stopObj.TimestampMilliSec))
      {
          timeSec1 = timeSec1 + 1;
          timerLbl.Text = timeHr1.ToString("00") + ":" + timeMin1.ToString("00") + ":" + timeSec1.ToString("00");
      }
  }
  */
