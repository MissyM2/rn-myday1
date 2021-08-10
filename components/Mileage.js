import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const Mileage = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.mileageContainer}>
                <TouchableOpacity
                        style={styles.mileageButtonContainer} 
                        onPress={() => {}} 
                >
                    <Text style={styles.mileageButton}>MILEAGE</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.mileageTextContainer1}>
                        <Text style={styles.mileageText1}>Mileage</Text>
                        <Text style={styles.mileageText1}>00</Text>
                    </View>
                    <View style={styles.mileageTextContainer2}>
                        <Text style={styles.mileageText2}>per</Text>
                        <Text style={styles.mileageText2}>day</Text>
                    </View>
                </View>
            </View> 
        </View>
    );

};

const styles = StyleSheet.create({
   // screen: {
    //    flex: 1,
    //    justifyContent: 'center',
    //    alignItems: 'center',
    //    borderWidth: 2
    //},
    mileageContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //marginTop: 80,
        //marginBottom: 20,
        padding: 10,
       // borderWidth: 2
    },
    mileageButtonContainer: {
        backgroundColor: Colors.primaryButton,
        paddingTop: 10,
        paddingRight: 40,
        paddingBottom: 10,
        paddingLeft: 40
    },
    mileageButton: {
        color: Colors.primaryLight,
        fontWeight: '700'
    },
    mileageTextContainer1: {
        flexDirection: 'column',
        alignItems: 'center',
        //borderWidth: 2,
        marginRight: 10
    },
    mileageTextContainer2: {
        flexDirection: 'column',
        alignItems: 'center',
        //borderWidth: 2,
    },
    mileageText1: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        fontWeight: '700'
    },
    mileageText2: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        fontWeight: '300'
    }
});

export default Mileage;