import WebService from "../services/WebService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";

export function fetchUserProfile(values){   
    return (dispatch) => {
        dispatch(fetchUserProfileloading());    
        WebService.getInstance().getUserProfile((response)=>{
            if (response.success) {
                console.log(response);
                dispatch(fetchUserProfileSuccess(response));
            }
            else{
                dispatch(fetchUserProfileFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(fetchUserProfileFailure(error));
        });
    }
}

const fetchUserProfileSuccess = (response) => ({
    type: AppActions.USER_PROFILE_FETCH_SUCCESS,
    payload:response
});

const fetchUserProfileFailure = (error) => ({
    type: AppActions.USER_PROFILE_FETCH_FAILURE,
    payload:error
});

const fetchUserProfileloading = () => ({
    type: AppActions.USER_PROFILE_FETCH,
    payload:true
});
