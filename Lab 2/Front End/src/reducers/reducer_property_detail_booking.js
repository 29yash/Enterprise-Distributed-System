import AppActions from "../constant/AppActions";

const initialState = {
    property: null,
    isBooked: false,
    bookConfirmation:null,
    location:null, 
    arrivalDate:null, 
    departureDate:null, 
    guests :null,
    amount:null,
    isAckPositive:null,
}

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.VIEW_PROPERTY_DETAIL:
            return{...state, ...action.payload, isAckPositive: null, bookConfirmation : null}
        case AppActions.BOOK_PROPERTY_SUCCESS:
            return {...state, isAckPositive: true, bookConfirmation:action.payload}
        case AppActions.BOOK_PROPERTY_FAILURE:
            return {...state, isAckPositive: false, bookConfirmation:action.payload}
        default:
        return state;
    }
}