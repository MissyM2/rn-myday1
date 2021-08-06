import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import LocationItem from '../components/LocationItem';
import * as locationsActions from '../store/actions/mfos';

const LocationsListScreen = props => {
  const locations = useSelector(state => state.places.places);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationsActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={locations}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <LocationItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('LocationDetail', {
              locationTitle: itemData.item.title,
              locationId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

LocationsListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default LocationsListScreen;