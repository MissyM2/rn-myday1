
import React, { useState, useRef, useEffect, useCallback} from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

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
  const todaysDate = dayjs().format('MMMM Do YYYY');
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [tempElapsedTime, setTempElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [testTime, setTestTime] = useState(0);
  const [startStopDiff, setStartStopDiff] = useState(0);


  useEffect(() => {
      init();
      setTimerIsInitialized(true);
  },[]);

  useEffect(() => {
    //if (tempElapsedTime > 0) {
    //  console.log('UseEffect: what is tempElapsedTime', tempElapsedTime);
    //}
    setTotalElapsedTime(totalElapsedTime + tempElapsedTime);
  },[tempElapsedTime]);

  useEffect(() => {
    if (totalElapsedTime > 0) {
      const getSeconds = `0${(totalElapsedTime % 60)}`.slice(-2);
      const minutes = `${Math.floor(totalElapsedTime / 60)}`
      const getMinutes = `0${minutes % 60}`.slice(-2)
      const getHours = `0${Math.floor(totalElapsedTime / 3600)}`.slice(-2)
    
      let formattedTime =  `${getHours} : ${getMinutes} : ${getSeconds}`
      console.log('formattedTime', formattedTime);
    }
  },[totalElapsedTime]);

const checkTimerStatus = async(isOn, isActive) => {
  let selectQuery = await selectAllTimes();
  let mydayData = selectQuery.rows;
  let st = 0;
  let end = 0;
  if (mydayData.length !== 0) {
    for (let i = 0; i < mydayData.length; i++) {
      let item = mydayData.item(i);
      if (item.taskstate === 'start') {
        st = item.timestamp;   
      } else if (item.taskstate === 'stop') {
        end = item.timestamp;
        let timeDifference = end - st;
        setTempElapsedTime(timeDifference); 
      } else {
         console.log('other');
      }
    }
  }
}

const handleStart = () => {
    setTimerIsOn(true);
    setTimerIsActive(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000);
    insertTime('start', 6);
};

const handleStop = () => {
  setTimerIsOn(false);
  clearInterval(countRef.current);
  insertTime('stop', 6);
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

  