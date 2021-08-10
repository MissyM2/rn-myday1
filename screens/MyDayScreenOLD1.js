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
import Timer from '../components/Timer';
import Mileage from '../components/Mileage';
import Colors from '../constants/Colors';

const MyDayScreen = props => {
    const todaysDate = moment().format('MMMM Do YYYY');

    useFocusEffect(
        useCallback(() => {
            console.log('myDay screen was focused');
            return () => {
                console.log('myDay screen was unfocused');
            };
        }, [])
    );
 
    return (
        <View style={styles.screen}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{todaysDate}</Text>
            </View>
            <Timer />
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