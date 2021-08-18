import dayjs from 'dayjs';
import { selectAllTimes } from '../helpers/txTimer';

export const checkTimerStatus = async(isOn, isActive) => {
  let totalElapsedTime = 0;
  let tempElapsedTime = 0;
  let startTime = "";
  let endTime = "";
  let testTime = "";
  let startStopDiff = 0;

  let selectQuery = await selectAllTimes();
  let mydayData = selectQuery.rows;
  if (mydayData.length !== 0) {
    for (let i = 0; i < mydayData.length; i++) {
      let item = mydayData.item(i);
      console.log('item is', item);
      if (item.taskstate === 'start') {
        setStartTime = dayjs(item.timestamp);
        console.log('START: startTime is', startTime);
        console.log('START: endTime is', endTime);
      } else if (item.taskstate === 'stop') {
        setEndTime = dayjs(item.timestamp);
        console.log('STOP:startTime is', startTime);
        console.log('STOP: endTime is', endTime);

        if (startTime !== testTime) {
          startStopDiff = endTime = startTime;
          console.log('startStopDiff is ', startStopDiff);

        }
      }
    }
  }

}

export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
    return `${getHours} : ${getMinutes} : ${getSeconds}`
}


export const CalculateTimerValues = (addtm) => {
  console.log('inside calculateTimerValues');
  /*{
          string timeVal = "";

          timeSec1 = timeSec1 + addtm;

          if (timeSec1 >= 60)
          {
              timeSec1 = 0;
              timeMin1 = timeMin1 + 1;

              if (timeMin1 >= 60)
              {
                  timeMin1 = 0;
                  timeHr1 = timeHr1 + 1;
              }
          }

          timeVal = timeHr1.ToString("00") + ":" + timeMin1.ToString("00") + ":" + timeSec1.ToString("00");

          //Console.WriteLine("Time val: {0}", timeVal);
          return timeVal;
      }
      */
}

export const getMydayDataForToday = () => {
  console.log('inside getMydayDataForToday');
};
