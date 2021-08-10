import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Button,
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
    const [isTimerOn, setIsTimerOn] = useState(false);
    const todaysDate = moment().format('MMMM Do YYYY');

    
    const currTime = useSelector(state => state.time);
    const isOn = useSelector(state => state.timerIsOn);
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
            };
        }, [])
    );

    

    const handleStart = () => {
        console.log("START click");
        const interval = setInterval(() => {
            dispatch({
                type: 'TICK',
                time: Date.now()
            });
        });

        dispatch({
            type: 'START_TIMER',
            offset: Date.now(),
            interval
        });
    }

    const handleStop = () => {
        dispatch({
            type: 'STOP_TIMER'
        });
    }

    const handleClick = () => {
        isOn ? startTimer() : stopTimer

    }

    const formatTime = (currTime) => {
        const pad = (time, length) => {
            while (currTime.length < length) {
                currTime = '0' + time;
            }
            return currTime;
        }

        currTime = new Date();
        let m = pad(currTime.getMinutes().toString(), 2);
        let s = pad(currTime.getSeconds().toString(), 2);
        let ms = pad(time.getMilliseconds().toString(), 3);
    
        return `${m} : ${s} : ${ms}`
    };

 
    return (
        <View style={styles.screen}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{todaysDate}</Text>
            </View>
            <Button 
                onPress={interval ? handleStop : handleStart}
                title={interval ? 'Stop' : 'Start'}
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