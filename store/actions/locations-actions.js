import * as FileSystem from 'expo-file-system';

export const ADD_LOCATION = 'ADD_LOCATION';
export const LOAD_LOCATIONS = 'LOAD_LOCATIONS';

import { fetchLocations, insertLocation } from '../../helpers/db';
import ENV from '../../env';

export const addLocation = (location) => {
    console.log('inside addLocation');
    /*
    return async dispatch => {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat${
            location.lat}&lon=${
                location.lng}&apiKey=${
                    ENV.geoApiKey}`)
        .catch(error => {
            console.log('error', error);
            throw new Error(error);
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if(!resData.features) {
            throw new Error('Something went wrong!');
        }
        const address = resData.features[0].properties.formatted;
        // not sure what file name should be since we are not logging image
        const fileName = address;
        const newPath = FileSystem.documentDirectory + fileName;
*/
}

export const loadLocations = () => {
    console.log('inside loadLocations');
};