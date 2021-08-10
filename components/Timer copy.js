
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const Timer = props => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const increment = useRef(null);

    const handleStart = () => {
      console.log('inside handleStart');
        setIsActive(true);
        setIsPaused(true);
        increment.current = setInterval(() => {
          setTimer(timer => timer + 1)
        }, 1000);
    };

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
        setTimer((timer) => timer + 1)
      }, 1000)
    }

    const handleReset = () => {
      console.log('inside handleReset');
      clearInterval(countRef.current)
      setIsActive(false)
      setIsPaused(false)
      setTimer(0)
    }

    const formatTime = () => {
      const getSeconds = `0${(timer % 60)}`.slice(-2)
      const minutes = `${Math.floor(timer / 60)}`
      const getMinutes = `0${minutes % 60}`.slice(-2)
      const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
      return `${getHours} : ${getMinutes} : ${getSeconds}`
    }
  
      return (
        <View style={styles.screen}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{formatTime()}</Text>
          </View>
          <View>
          {!isActive && !isPaused ? (
              <TouchableOpacity 
                  style={styles.imageContainer} 
                  title="Start" 
                  onPress={handleStart} 
              >
                  <Image 
                      style={styles.image} 
                      source={require('../assets/startbutton.png')} 
                  />
              </TouchableOpacity>
            ) : (
              isPaused ? (
                <TouchableOpacity 
                    style={styles.imageContainer} 
                    title="Pause" 
                    onPress={handlePause} 
                >
                     <Image 
                      style={styles.image} 
                      source={require('../assets/stopbutton.png')} 
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                    style={styles.imageContainer} 
                    title="Resume" 
                    onPress={handleResume} 
                >
                   <Image 
                      style={styles.image} 
                      source={require('../assets/startbutton.png')} 
                  />
              </TouchableOpacity>
              )
            )
          }
          </View>
        </View>
      );
    }

    const styles = StyleSheet.create({
      screen: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      },
      timeContainer: {
          alignItems: 'center',
          marginTop: 20
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
  
  export default Timer;

  