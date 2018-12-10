import AppActions from "../constant/AppActions";

const initialState = {
    properties : [],
    bookings : [],
    errorMessage:null
}

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.BOOKING_HISTORY_SUCCESS:
            return{...state, ...action.payload}
        case AppActions.BOOKING_HISTORY_FAILURE:
            return {...state, errorMessage : action.payload }
        default:
        return state;
    }
}