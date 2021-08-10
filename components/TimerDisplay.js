import React  from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const TimerDisplay = props => {
      return (
        <View style={styles.screen}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{props.display}</Text>
          </View>
          
        </View>
      );
    }

    const styles = StyleSheet.create({
      timeContainer: {
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2
      },
      time: {
          fontFamily: 'open-sans',
          fontSize: 24,
          color: Colors.primaryDark
      }

  });
  
  export default TimerDisplay;

  