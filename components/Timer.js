
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';

const Timer = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)

  return (
    <View style={styles.screen}>
      <Text>React Stopwatch</Text>
      <View>
        <Text>{formatTime(timer)}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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

  