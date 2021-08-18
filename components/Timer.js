
import React from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    Platform,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { formatTime } from "../utils/timer-utils";

import Colors from '../constants/Colors';


const Timer = props => {
      return (
        <View style={styles.screen}>
            <View style={styles.timeContainer}>
                    <Text style={styles.time}>{formatTime(props.timer)}</Text>
            </View>
            <View>
              {
                !props.timerIsOn 
                ? (
                  <TouchableOpacity style={styles.btn} onPress={props.start}>
                      <View>
                          <Image source={require("../assets/startbutton.png")} style={styles.img} />
                      </View>
                  </TouchableOpacity>
                 
                )
                : (
                  <TouchableOpacity style={styles.btn} onPress={props.stop}>
                      <View>
                          <Image source={require("../assets/stopbutton.png")} style={styles.img} />
                      </View>
                  </TouchableOpacity>
                )
              }
          </View>
        </View>
      );
    }

    const styles = StyleSheet.create({
    
      timeContainer: {
          alignItems: 'center',
          marginBottom: 20
      },
      time: {
          fontFamily: 'open-sans',
          fontSize: 24,
          color: Colors.primaryDark
      },
      btn: {
        justifyContent: 'center',
        alignItems: 'center'

      },
      img: {

      }

  });
  
  export default Timer;

  