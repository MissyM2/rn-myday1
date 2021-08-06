import { ADD_LOCATION, SET_LOCATIONS } from "../actions/mfos";
import location from '../../models/location';

const initialState = {
    locations: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATIONS:
            return {
                locations: action.locations.map(
                    loc => new Location(
                        loc.id.toString(),
                        loc.title,
                        loc.imageUri,
                        loc.address,
                        loc.lat,
                        loc.lng
                    )
                )
            }
        case ADD_LOCATION:
            const newLocaton = new Location(
                action.locationData.id.toString(),
                action.locationData.title,
                action.locationData.image,
                action.locationData.address,
                action.locationData.coords.lat,
                action.locationData.coords.lng
            );
            return {
                locations: state.locations.concat(newLocation)
            };
        default:
            return state;
    }
};