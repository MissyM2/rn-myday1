import { useState, useEffect } from 'react';
import { selectAllTimes } from '../helpers/txTimer';

export const CheckTimerStatus = (isOn, isActive) => {
    const [isLoading, setIsLoading] = useState(false);
    const [myDayData, setMyDayData] = useState([]);

    useEffect(() => {
        setMyDayData(selectAllTimes());
    },[myDayData]);

    console.log('what is myDayData', myDayData);



}
/*
        {

            // GET ALL TODAYS TASKS
                // get all rows from the db with today's date and put them into mydayData:  this should be an array of objects
                mydayData = databaseHelper.GetMydayDataForToday();
            }
            else
            {
                logController.LogInfo(className + ".CheckTimerStatus", "Invalid token reset labels and buttons ");

                timeSec1 = 0;
                timeMin1 = 0;
                timeHr1 = 0;

                //RESET LABELS:  Should I use these
                UIApplication.SharedApplication.InvokeOnMainThread(delegate
                {
                    //RESET LABELS
                    dateLbl.Text = DateTime.Now.ToString("dddd\r\nMM/dd/yyyy");
                    timerLbl.Text = "00:00:00";
                    mileageShowLbl.Text = "Mileage\n00";
                });


                // if there are any rows returned and in mydayData, then
            if (mydayData.Count != 0
            {
                System.TimeSpan task1TmSpan = new TimeSpan(0, 0, 0);

                DateTime startTm = new DateTime(1000, 1, 1);
                DateTime endTm = new DateTime(1000, 1, 1);
                DateTime testTm = new DateTime(1000, 1, 1);


                // for each row in the array of mydataData
                for (int i = 0; i < mydayData.Count; i += 1)
                {
                    // make the selected row equal to a new object

                    MTBL_MYDAY mydayObj = mydayData.ElementAt(i);

                    // now, check in that object.  if the task state equals start then do the following

                    if (mydayObj.TaskState.Equals("Start"))
                    {
                        // make starttm equal to the mydayobj.timestamp value

                        startTm = mydayObj.Timestamp;
                        // make the endTm equal to the testTm
                        endTm = testTm;
                        //  add an accumlated time variable and, if it is start and it is in the first row, make accumulatedTime equal to start time?

                    }
                    else if (mydayObj.TaskState.Equals("Stop"))
                    {
                        // make endtm equal to the mydayobj.timestamp value
                        endTm = mydayObj.Timestamp;

                        // if startTm is not testTm (testTm) then it won't be the first on

                        if (startTm != testTm)
                        {
                            // find the difference between the startTm (which is not the first start time) and the end time and put it in diff1
                            TimeSpan diff1 = endTm.Subtract(startTm);

                            // make the accumulatedTime equal to the old accumulated time plus the difference.. diff1

                            task1TmSpan = task1TmSpan + diff1;
                        }
                    }
                }

                if (endTm == testTm && startTm != testTm)
                {
                    TimeSpan diff1 = DateTime.UtcNow.Subtract(startTm);
                    task1TmSpan = task1TmSpan + diff1;
                }

                timeSec1 = task1TmSpan.Seconds;
                timeMin1 = task1TmSpan.Minutes;
                timeHr1 = task1TmSpan.Hours;

                timerLbl.Text = timeHr1.ToString("00") + ":" + timeMin1.ToString("00") + ":" + timeSec1.ToString("00");

                if (isTimerStart == true)
                {
                    // SET BUTTON

                    Parallel.Invoke(() =>
                   {
                       if (isTimerOn == false)
                       {
                           StartTimer();
         
                   },

                }
            else
            {
                timerLbl.Text = timeHr1.ToString("00") + ":" + timeMin1.ToString("00") + ":" + timeSec1.ToString("00");
            }
        }
        //----------- START TIMER -----------
        void StartTimer()
        {
            // 	UPDATE 
            isTimerOn = true;

            // SET TIMER
            if (aTimer == null)
            {
                // create a timer that fires every sec
                string timerInt = settingsController.GetMyDayTimerIntervel();
                double tm = Convert.ToDouble(timerInt);
                aTimer = new Timer(tm);

                // Hook up the Elapsed event for the timer.
                aTimer.Elapsed += OnTimedEvent;
            }

            aTimer.Enabled = true;
            aTimer.Start();

        }
*/