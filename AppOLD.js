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
import timerReducer from './store/reducers/timer-reducer';

import MyDayScreen from './screens/MyDayScreen';
import LocationsListScreen, {
  screenOptions as locationListScreenOptions
} from './screens/LocationsListScreen';
import LocationDetailScreen, {
  screenOptions as LocationDetailScreenOptions
} from './screens/LocationDetailScreen';
import GetLocationScreen, {
  screenOptions as GetLocationScreenOptions
} from './screens/GetLocationScreen';
import MapScreen, {
  screenOptions as MapScreenOptions
} from './screens/MapScreen';
import Colors from './constants/Colors';


const rootReducer = combineReducers({
  locations: locationsReducer,
  timer: timerReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const LocationsStack = createStackNavigator();

function LocationsStackScreen() {
  return (
    <LocationsStack.Navigator>
        <LocationsStack.Screen 
            name="LocationsListScreen" 
            component={LocationsListScreen}
            options={locationListScreenOptions}
        />
        <LocationsStack.Screen 
            name="LocationDetailScreen" 
            component={LocationDetailScreen} 
            options={LocationDetailScreenOptions}
          />
        <LocationsStack.Screen 
            name="GetLocation" 
            component={GetLocationScreen} 
            options={GetLocationScreenOptions}
          />
        <LocationsStack.Screen 
            name="Map" 
            component={MapScreen} 
            options={MapScreenOptions}
        />
      </LocationsStack.Navigator>
  );
}

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
          <Tab.Screen
            name="Locations"
            component={LocationsStackScreen}
            options={{
              tabBarLabel: 'Locations',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons 
                    name="bell" 
                    color={color} 
                    size={size} 
                  />
              ),
              tabBarBadge: 0,
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