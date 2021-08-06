import React, { useState, useCallback } from 'react';
import { 
    View, 
    Button, 
    Text, 
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';

import * as locationsActions from '../store/actions/mfos';

import LocationPicker from '../components/LocationPicker';

const GetLocationScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(locationsActions.addLocation(selectedLocation));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text>Get Location</Text>
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                />
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
        );
};

GetLocationScreen.navigationOptions = {
    headerTitle: 'Add Location'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }   
});

export default GetLocationScreen;
