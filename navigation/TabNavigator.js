import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import MyDayScreen from '../screens/MyDayScreen';
import MyCasesScreen from '../screens/MyCasesScreen';
import MyApptsScreen from '../screens/MyApptsScreen';
import BsmScreen from '../screens/BsmScreen';

import Colors from '../constants/Colors';

enableScreens();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            initialRouteName="MyDayScreen" 
            screenOptions={{
                tabBarActiveTintColor: Colors.primaryOrange,
                tabBarInactiveTintColor: Colors.primaryGray,
                tabBarActiveBackgroundColor: Colors.primaryGray
            }}>
            <Tab.Screen 
                name="MyDayScreen" 
                component={MyDayScreen} 
                options={{
                    tabBarLabel: 'myDay',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="circle" 
                            color={color} 
                            size={size} 
                         />
                    )
                }}
            />
            <Tab.Screen 
                name="MyCases" 
                component={MyCasesScreen}
                options={{
                    tabBarLabel: 'myCases',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="format-list-bulleted" 
                            color={color} 
                            size={size} 
                         />
                    )
                }}
            />
            <Tab.Screen 
                name="MyAppts" 
                component={MyApptsScreen}
                options={{
                    tabBarLabel: 'myAppts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="calendar-month" 
                            color={color} 
                            size={size} 
                         />
                    )
                }} 
            />
            <Tab.Screen 
                name="BSM" 
                component={BsmScreen}
                options={{
                    tabBarLabel: 'BSM',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="chat" 
                            color={color} 
                            size={size} 
                         />
                    )
                }} 
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;