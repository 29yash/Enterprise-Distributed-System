import WebService from "../services/WebService";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { history } from "../router/history";


export function postPropertyPicture(profilePictures){
    return(dispatch) => {
        WebService.getInstance().postPropertyPicture(profilePictures, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(uploadPropertyPictureSuccess(response.urls));
            }
            else{
                dispatch(uploadPropertyPictureFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(uploadPropertyPictureFailure(error));
        })
    }
}

export function postProperty(property){
    return(dispatch) => {
        WebService.getInstance().postProperty(property, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(postPropertySuccess(response));
                history.push('/dashboard')
            }
            else{
                dispatch(postPropertyFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(postPropertyFailure(error));
        })
    }
}


export function inputChange(inputValues){
    return(dispatch)=>{
        dispatch(propertyInputChange(inputValues));
    }
}

const propertyInputChange = (inputValues)=>({
    type: AppActions.POST_PROPERTY_INPUT_CHANGE , 
    payload : inputValues
});

const postPropertySuccess = () => ({
    type: AppActions.POST_PROPERTY_SUCCESS,
    payload:{}
});

const postPropertyFailure = (error) => ({
    type: AppActions.POST_PROPERTY_FAILURE,
    payload:error
});

const uploadPropertyPictureSuccess = (profilePictures) => ({
    type: AppActions.POST_PROPERTY_UPLOAD_PICTURE_SUCCESS,
    payload:profilePictures
});

const uploadPropertyPictureFailure = (error) => ({
    type: AppActions.POST_PROPERTY_UPLOAD_PICTURE_FAILURE,
    payload:error
});