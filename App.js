import * as React from 'react';
import { Provider } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import MyDayScreen from './screens/MyDayScreen';
import LocationsListScreen from './screens/LocationsListScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function LocationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Locations screen</Text>
      <LocationsListScreen />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function MyDayStackScreen() {
  return (
    <MyDayScreen />
   );
}

const LocationsStack = createStackNavigator();

function LocationsStackScreen() {
  return (
    <LocationsStack.Navigator>
        <LocationsStack.Screen name="Locations" component={LocationsScreen} />
        <LocationsStack.Screen name="Details" component={DetailsScreen} />
      </LocationsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'MyDay') {
                iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              } else if (route.name === 'LocationsList') {
                iconName = focused
                ? 'ios-list'
                : 'ios-list';
              }
        
              return <Ionicons name={iconName} size={size} color={color}     />;
                },
              })}
              tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              }}
            >
            <Tab.Screen name="MyDay" component={MyDayStackScreen} />
            <Tab.Screen name="LocationsList" component={LocationsStackScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}