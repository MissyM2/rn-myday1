import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyCasesScreen = props => {
  return (
    <View styles={styles.screen}>
        <Text>My Cases Screen goes here</Text>
    </View> 
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'MyCases'
  };
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default MyCasesScreen;