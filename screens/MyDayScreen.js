
import React, { useEffect, useCallback } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
//import * as SQLite from 'expo-sqlite';

import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';

import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Mileage from '../components/Mileage';
import Colors from '../constants/Colors';


//const db = SQLite.openDatabase('mtbl_myday.db');

const MyDayScreen = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);
  const todaysDate = moment().format('MMMM Do YYYY');

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

  return (
    <View style={styles.screen}>
      <View style={styles.dateContainer}>
          <Text style={styles.date}>{todaysDate}</Text>
      </View>
      <View>
        <View style={styles.timeContainer}>
          <Text>{timer}</Text>
          <Text style={styles.time}>{formatTime(timer)}</Text>
        </View>
        <View>
          {
            !isActive && !isPaused ?
              <Button 
                onPress={handleStart}
                title="Start"
              />
              : (
                isPaused 
                ? <Button 
                    onPress={handlePause}
                    title="Pause"
                  />
                : <Button 
                    onPress={handleResume}
                    title="Resume"
                  />
              )
          }
          <Button 
            onPress={handleReset} 
            disabled={!isActive}
            title="Reset"
          />
        </View>
      </View>
      <Mileage />
    </View>
  );
}

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

  