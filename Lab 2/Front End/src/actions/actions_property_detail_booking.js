import WebService from "../services/WebService";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { history } from "../router/history";


export function viewProperty(propertyAndBookingDetails){
    return(dispatch)=>{
        let amount = parseInt(Math.round(Math.abs((new Date(propertyAndBookingDetails.departureDate).getTime() - new Date(propertyAndBookingDetails.arrivalDate).getTime())/(24*60*60*1000)))) * parseInt(propertyAndBookingDetails.property.singleNightRate);
        propertyAndBookingDetails = { ...propertyAndBookingDetails, amount};
        dispatch(viewPropertyDetail(propertyAndBookingDetails));
        history.push("/viewProperty");
    }
}

export function bookProperty(bookingDetails){
    return(dispatch) => {
        WebService.getInstance().bookProperty(bookingDetails, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(bookPropertySuccess(response));
            }
            else{
                dispatch(bookPropertyFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(bookPropertyFailure(error));
        })
    }
}

const bookPropertySuccess = (bookingResponse) => ({
    type: AppActions.BOOK_PROPERTY_SUCCESS,
    payload:bookingResponse.message
});

const bookPropertyFailure = (error) => ({
    type: AppActions.BOOK_PROPERTY_FAILURE,
    payload:error
});

const viewPropertyDetail = (propertyAndBookingDetails) => ({
    type: AppActions.VIEW_PROPERTY_DETAIL,
    payload: propertyAndBookingDetails
});