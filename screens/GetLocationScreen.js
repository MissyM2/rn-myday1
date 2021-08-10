import React, { useState, useCallback } from 'react';
import { 
    ScrollView,
    View, 
    Button, 
    Text, 
    StyleSheet,
    TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';

import * as locationsActions from '../store/actions/locations-actions';
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';

const GetLocationScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

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
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
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

export const screenOptions =  {
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
