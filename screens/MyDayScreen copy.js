import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import TimerDisplay from '../components/TimerDisplay';
import Timer from '../components/Timer';
import Mileage from '../components/Mileage';
import Colors from '../constants/Colors';

import * as timerActions from '../store/actions/timer-actions';

import { useSelector, useDispatch} from 'react-redux';

const MyDayScreen = props => {
    const todaysDate = moment().format('MMMM Do YYYY');
    //const [aTimer, setATimer] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    //const [isPaused, setIsPaused] = useState(false);
    //const increment = useRef(null);

    const timer = useSelector(state => state.atimer);
    const dispatch = useDispatch();

    const createTimer = () => {
        dispatch(timerActions.setTimer);
    };

    useEffect(() => {
        createTimer()
    }, [dispatch, createTimer])

    useFocusEffect(
        useCallback(() => {
            console.log('myDay screen was focused');

            return () => {
                console.log('myDay screen was unfocused');
                //console.log('what is the minutes', minutes);
                //console.log('what hours, minutes, seconds', hours, minutes, seconds);

            };
        }, [])
    );

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }

    const handleStart = () => {
        console.log("START click");

        // UPDATE
        setIsTimerOn(true);

        // MISSY DO I NEED THIS
        setIsPaused(true);

        // SET TIMER
        if (timer === 0) {
            // create a timer that fires every second
            dispatch(setTimer());
            /*increment.current = setInterval(() => {
                setATimer(aTimer => aTimer + 1)
            }, 1000);  
            */

        }
         
      };
  /*
      const handlePause = () => {
          console.log('inside handlePause',);
          clearInterval(increment.current);
          setIsPaused(false);
          console.log('isPaused should be false', isPaused);
      };
  
      const handleResume = () => {
        console.log('inside handleResume');
        setIsPaused(true)
        increment.current = setInterval(() => {
          setTimer((aTimer) => aTimer + 1)
        }, 1000)
      }
  
      const handleReset = () => {
        console.log('inside handleReset');
        clearInterval(countRef.current)
        setIsTimerOn(false)
        setIsPaused(false)
        setATimer(0)
      }
      */

    return (
        <View style={styles.screen}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{todaysDate}</Text>
            </View>
            <TimerDisplay 
                display={formatTime()} 
            />
            <Timer 
                start={handleStart}
                timerOn={isTimerOn}
            />
            <Mileage />
        </View>
    );

};

export const screenOptions = navData =>  {
    return { 
        title: 'My Day',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Settings"
                iconName="ios-cog"
                onPress={() => {}}
            />
            </HeaderButtons>
        )
    };     
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
    }
});

export default MyDayScreen;