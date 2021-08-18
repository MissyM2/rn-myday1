import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyApptsScreen = props => {
  return (
    <View styles={styles.screen}>
        <Text>My Appts Screen goes here</Text>
    </View> 
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'MyAppts'
  };
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default MyApptsScreen;