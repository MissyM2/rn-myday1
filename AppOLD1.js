import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import locationsReducer from './store/reducers/locations-reducer';

import MyDayScreen from './screens/MyDayScreen';
import Colors from './constants/Colors';


const rootReducer = combineReducers({
  locations: locationsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};



const Tab = createBottomTabNavigator();

function MfosTabs() {
  return (
    <Tab.Navigator
      initialRouteName="myDay"
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryOrange,
        tabBarInactiveTintColor: Colors.primaryGray,
        tabBarActiveBackgroundColor: Colors.primaryGray
      }}
      >
          <Tab.Screen
            name="myDay"
            component={MyDayScreen}
            options={{
              tabBarLabel: 'myDay',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons 
                    name="home" 
                    color={color} 
                    size={size} 
                />
              ),

            }}
          />

      </Tab.Navigator>
  )
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {setFontLoaded(true)}}
        onError={(err) => console.log(err)}
        />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
          <MfosTabs />
      </NavigationContainer>
    </Provider>
  );
}