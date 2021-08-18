import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BsmScreen = props => {
  return (
    <View styles={styles.screen}>
        <Text>Bsm Screen goes here</Text>
    </View> 
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'BSM'
  };
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default BsmScreen;