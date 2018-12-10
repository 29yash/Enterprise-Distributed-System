import GraphQLService from "../services/GraphQLService";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { history } from "../router/history";


export function getBookingHistory(){
    return(dispatch)=>{
        GraphQLService.getInstance().bookingHistory((response)=>{
            if (response.success) {
                console.log(response);
                dispatch(bookingHistorySuccess(response));
            }
            else{
                dispatch(bookingHistoryFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(bookingHistoryFailure(error));
        })
    }
}

const bookingHistorySuccess = (bookingResponse) => ({
    type: AppActions.BOOKING_HISTORY_SUCCESS,
    payload: bookingResponse
});

const bookingHistoryFailure = (error) => ({
    type: AppActions.BOOKING_HISTORY_FAILURE,
    payload:error
});