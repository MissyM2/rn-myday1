
import React, { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
//import * as SQLite from 'expo-sqlite';

import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//import HeaderButton from '../components/HeaderButton';
import Mileage from '../components/Mileage';
import Colors from '../constants/Colors';
import StartMessage from '../components/StartMessage';
import Timer from '../components/Timer';
import { formatTime, checkTimerStatus, CalculateTimerValues, getMydayDataForToday } from "../utils/timer-utils";
import { init, insertTime, selectAllTimes, deleteAllTimes } from "../helpers/txTimer";
//import { init } from "../helpers/dbLocations";


const  initialState = {
  isAutoMyDay: true,
  isMyDayStart: false,
  isTimerStart: false,
  isMyDayScreen: true,
  isTimerOn: false,
  isActive: false,
  isPaused: false,
  timestamp: moment().format("YYYY-MM-DD hh:mm:ss a"),
  taskstate: "",
  userId: 6,
  taskName: 'Work',
  timeSec1: 0,
  timeMin1: 0,
  timeHr1: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        isActive:true,
        isPaused:false,
        isAutoMyDay:true,
        isTimerStart:true,
        isTimerOn:true,
        taskstate:"start",
        timestamp:moment().format('YYYY-MM-DD hh:mm:ss a'),
        timeSec1:0,
        timeMin1:0,
        timeHr1:0
      }
    case 'pause':
      return {
        ...state,
        isPaused:true,
        timestamp:moment().format('YYYY-MM-DD hh:mm:ss a'),
        taskstate:"paused"
      }
    case 'resume':
      return {
        ...state,
        isPaused:false,
        timestamp:moment().format('YYYY-MM-DD hh:mm:ss a'),
        taskstate:'resume'
      }
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const MyDayScreen = () => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  const todaysDate = moment().format('MMMM Do YYYY');
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isAutoMyDay,
    isMyDayStart,
    isTimerStart,
    isMyDayScreen,
    isTimerOn,
    isActive,
    isPaused,
    timestamp,
    taskstate,
    userId,
    taskName,
    timeSec1,
    timeMin1,
    timeHr1
  } = state;

  useEffect(() => {
    init()
    .then(() => {
      console.log('initialized myDay database');
    })
    .catch(err => {
      console.log('Initializing db failed.');
      console.log(err);
    });
  
  },[]);

  useFocusEffect(
      useCallback(() => {
          console.log('myDay screen was focused');
          if (timer) {
            console.log('timer has started.  i know this because it is not 0.', timer);
            handleResume();
          }
          return () => {
              console.log('myDay screen was unfocused should pause');
              handlePause();
          };
      }, [])
  );


const handleStart = () => {
  console.log('inside handleStart');
  dispatch({
    type: "start"
  });
  console.log('what is taskstate?', state);
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000);

  insertTime(timestamp, taskstate, userId);
  console.log('after handleStart insertion', state);

};

const handlePause = () => {
  console.log('inside handlePause');
  clearInterval(countRef.current);
  dispatch({
    type: "pause"
  });

  console.log('after handlePause dispatch taskstate', state.taskstate);
  insertTime(timestamp, taskstate, userId);
  console.log('after handlePause insertion', state.taskstate);
}

const handleResume = () => {
  console.log('inside handleResume');
  dispatch({
    type: "resume"
  });
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000);
  insertTime(timestamp, taskstate, userId);
  console.log('after handleResume insertion', state);
}

const handleReset = () => {
  console.log('inside handleReset');
    clearInterval(countRef.current);
    dispatch({
      type: "reset"
    });
    deleteAllTimes();
    console.log('handleReset:there should be no records in db.  Timer has been reset. state should be initialState', state);
}



return (
  <View style={styles.screen}>
    {console.log('isAutoMyDay, isTimerStart, isTimerOn', isAutoMyDay, isTimerStart, isTimerOn)}
      {(isAutoMyDay && !isTimerStart && !isTimerOn) 
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
              <View>
                  <Timer 
                    timer={timer} 
                    format={formatTime}
                    isActive={isActive}
                    isPaused={isPaused}
                    start={handleStart} 
                    pause={handlePause}
                    resume={handleResume}
                  />
              </View>
              <View>
                  <Button 
                    onPress={handleReset} 
                    disabled={!isActive}
                    title="Reset"
                  />
              </View>
              <Mileage />
            </View>
        )
      }
  </View>
);

}


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
    timeContainer: {
      alignItems: 'center',
      marginTop: 20,
      borderWidth: 2
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

  