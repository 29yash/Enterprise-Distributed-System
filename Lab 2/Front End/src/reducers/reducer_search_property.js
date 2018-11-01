import AppActions from "../constant/AppActions";

const initialState = {
    location: null,
    arrivalDate: null,
    departureDate: null,
    guests: null,
    properties: [],
    maxPrice: null,
    minPrice:null,
    noOfBedrooms: null,
    showError:false,
    error:null,
}

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.SEARCH_PROPERTY_INPUT_CHANGE:
            return{
                ...state, ...action.payload, showError : false
            }
        case AppActions.SEARCH_PROPERTY_SUCCESS:
            return{
                ...state, ...action.payload, showError : false
            }
        case AppActions.SEARCH_PROPERTY_FAILURE:
            return{
                ...state, ...action.payload, showError : true
            }
        default:
        return state;
    }
}