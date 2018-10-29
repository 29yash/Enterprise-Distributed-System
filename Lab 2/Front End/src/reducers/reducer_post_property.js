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
};

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.POST_PROPERTY_INPUT_CHANGE:
            return{
                ...state, ...action.payload
            }
        default:
         return state;
    }
}