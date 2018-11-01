import AppActions from "../constant/AppActions";

const initialState = {
    country: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    headline :'',
    description: '',
    type: 'Apartment',
    bedrooms: '',
    bathroom: '',
    guests: '',
    bookingOption: 'instant',
    singleNightRate: '',
    minStay: '',
    startDate: null,
    endDate: null,
    propertyPictures : [],
    errorMessage : null
};

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.POST_PROPERTY_INPUT_CHANGE:
            return{
                ...state, ...action.payload
            }
        case AppActions.POST_PROPERTY_UPLOAD_PICTURE_SUCCESS:
            let propertyPictures = state.propertyPictures.concat(action.payload);
            propertyPictures.push()
            return{
                ...state, propertyPictures
            }
        case AppActions.POST_PROPERTY_SUCCESS:
            return initialState;
        case AppActions.POST_PROPERTY_FAILURE:
            return { ...state, errorMessage:action.payload};
        default:
         return state;
    }
}