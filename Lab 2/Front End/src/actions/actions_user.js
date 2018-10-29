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

export function updateUserProfile(profile){
    return(dispatch) => {
        dispatch(updateUserProfileloading());
        WebService.getInstance().editUserProfile(profile, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(updateUserProfileSuccess(profile, response.message));
            }
            else{
                dispatch(updateUserProfileFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(updateUserProfileFailure(error));
        })
    }
}

export function uploadUserProfilePicture(profilePicture){
    return(dispatch) => {
        WebService.getInstance().uploadUserProfilePhoto(profilePicture, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(uploadUserProfileSuccess(response.url));
            }
            else{
                dispatch(uploadUserProfileFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(uploadUserProfileFailure(error));
        })
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

const updateUserProfileSuccess = (profile, message) => ({
    type: AppActions.USER_PROFILE_UPDATE_SUCCESS,
    payload:{profile, message}
});

const updateUserProfileFailure = (error) => ({
    type: AppActions.USER_PROFILE_UPDATE_FAILURE,
    payload:error
});

const updateUserProfileloading = () => ({
    type: AppActions.USER_PROFILE_UPDATE,
    payload:true
});

const uploadUserProfileSuccess = (profilePicture) => ({
    type: AppActions.USER_PROFILE_PICTURE_UPLOAD_SUCCESS,
    payload:profilePicture
});

const uploadUserProfileFailure = (error) => ({
    type: AppActions.USER_PROFILE_PICTURE_UPLOAD_FAILURE,
    payload:error
});

