import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const StartMessage = props => {
    return (
           <View style={styles.startMessageContainer}>
                <View>
                    <Text style={styles.startMessage}>
                        myDay is about to start. Press STOP on myDay tab when done working
                    </Text>
                </View>
                <View  style={styles.okButtonContainer}>
                    <Button
                        style={styles.okButton}
                        onPress={props.start}
                        title="OK"
                    />
                </View>
                  
            </View>
    );

};

const styles = StyleSheet.create({
    startMessageContainer: {
      height: '60%',
      width: '80%',
      backgroundColor: 'white',
      borderWidth: 1,
      padding: 20,
      borderColor: 'black'
    },
    startMessage: {
      alignItems: 'center',
      justifyContent: 'center',
      color: Colors.primaryOrange
    },
    okButtonContainer: {
        backgroundColor: Colors.primaryBlue,
        margin: 10
    },
    okButton: {
        color: 'green',
        backgroundColor: 'orange'
    }
});

export default StartMessage;