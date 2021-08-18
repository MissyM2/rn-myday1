
import React, { useState, useRef, useEffect, useCallback} from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import Mileage from '../components/Mileage';
import Colors from '../constants/Colors';
import StartMessage from '../components/StartMessage';
import Timer from '../components/Timer';
import { init, insertTime, selectAllTimes, deleteAllTimes } from '../helpers/txTimer';
import { checkTimerStatus } from "../utils/timer-utils";

const MyDayScreen = () => {
  const [timerIsInitialized, setTimerIsInitialized] = useState(false);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsOn, setTimerIsOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  const todaysDate = moment().format('MMMM Do YYYY');
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [tempElapsedTime, setTempElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [startStopDiff, setStartStopDiff] = useState(0);


  useEffect(() => {
      init();
      setTimerIsInitialized(true);
  },[timerIsInitialized]);
/*
  useFocusEffect(
      useCallback(() => {
          console.log('myDay screen was focused');
          if (timer) {
            console.log('timer has started.  i know this because it is not 0.', timer);
            handleStart();
          }
          return () => {
              console.log('myDay screen was unfocused should stop');
              handleStart();
          };
      }, [])
  );
*/

const checkTimerStatus = async(isOn, isActive) => {
  let selectQuery = await selectAllTimes();
  let mydayData = selectQuery.rows;
  console.log('current time is ', moment());
  if (mydayData.length !== 0) {
    for (let i = 0; i < mydayData.length; i++) {

      let item = mydayData.item(i);
      let st = "";
      let end = "";
      let el= 0;
      //let itemTimestamp = moment(item.timestamp);
      //console.log('itemTimeStamp', itemTimestamp);
      console.log('item is ', item);
      /*if (item.taskstate === 'start') {
        console.log('item is START');
        st = item.timestamp;
        console.log('st', st);
        setStartTime(st);
        console.log('startTime is', startTime);
        //console.log('endTime is', endTime);
      } else if (item.taskstate === 'stop') {
        console.log('item is STOP');
        end = item.timestamp;
        console.log('end is', end);
        setEndTime(end);
        console.log('endTime is', endTime);
        stMoment = moment(st);
        endMoment = moment(end);
        console.log('stMoment, endMoment', stMoment + " " + endMoment);
        let diff = stMoment.diff(endMoment)
        console.log('elapsed time is: ', diff);*/
        //let ms = moment(endTime,"DD/MM/YYYY HH:mm:ss").diff(startTime,"DD/MM/YYYY HH:mm:ss");
        //let d = moment.duration(ms);
       // console.log('Here are the elapsed time', d.days() + ':' + d.hours() + ':' + d.minutes() + ':' + d.seconds());


     // }
      //  else {
      //    console.log('other');
      //}


      //if (startTime !== testTime) {
        //console.log('startTime does not equal testTime');
        //setStartStopDiff(endTime - startTime);
       // let ms = moment(endTime,"DD/MM/YYYY HH:mm:ss").diff(startTime,"DD/MM/YYYY HH:mm:ss");
       // let d = moment.duration(ms);
        //console.log('Here are the elapsed time', d.days() + ':' + d.hours() + ':' + d.minutes() + ':' + d.seconds());
        //setStartStopDiff(d);
        //console.log('duration is ', start);
        //console.log('startStopDiff', startStopDiff)
        //setTempElapsedTime(startStopDiff);
        //console.log('tempElapsedTime is ', tempElapsedTime.days() + ':' + tempElapsedTime.hours() + ':' + tempElapsedTime.minutes() + ':' + tempElapsedTime.seconds());
        //setTotalElapsedTime(totalElapsedTime + startStopDiff);
        //console.log('totalElapsedTime is ', tempElapsedTime.days() + ':' + tempElapsedTime.hours() + ':' + tempElapsedTime.minutes() + ':' + tempElapsedTime.seconds());
      //}
    //}
  }

}

const handleStart = () => {
    setTimerIsOn(true);
    setTimerIsActive(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000);
    insertTime(moment().format("YYYY-MM-DD HH:mm:ss"), 'start', 6);
};

const handleStop = () => {
  setTimerIsOn(false);
  clearInterval(countRef.current);
  insertTime(moment().format("YYYY-MM-DD HH:mm:ss"), 'stop', 6);
}

const handleReset = () => {
  setTimerIsOn(false);
  setTimer(0);
  clearInterval(countRef.current);
  deleteAllTimes();
    
}



return (
  <View style={styles.screen}>
          {(timerIsInitialized && !timerIsActive && !timerIsOn) 
          ? ( 
            <View> 
                <StartMessage start={handleStart}/>
            </View>
            )
          : (
            <View>
              <View style={styles.dateContainer}>
                  <Text style={styles.date}>{todaysDate}</Text>
              </View>
              <View style={styles.timerContainer}>
                  <Timer
                    timer={timer} 
                    stop={handleStop}
                    start={handleStart}
                    timerIsOn={timerIsOn}
                  />
              </View>
              <View>
                  <Button 
                    onPress={handleReset} 
                    title="Reset"
                  />
              </View>
              <View>
                  <Button 
                    onPress={checkTimerStatus} 
                    title="Check Timer Status"
                  />
              </View>
              <Mileage />
            </View>
        )
      }
  </View>
);

}

export const screenOptions = navData => {
  return {
    headerTitle: 'MyDay'
  };
};


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    dateContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 24,
        color: Colors.primaryGray,
    },
    timerContainer: {
      alignItems: 'center'
    },
    time: {
        fontFamily: 'open-sans',
        fontSize: 24,
        color: Colors.primaryDark
    },
    imageContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 2
    },
    image: {
        //borderWidth: 2
    }

});
  
export default MyDayScreen;

  