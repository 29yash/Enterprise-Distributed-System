import WebService from "../services/WebService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";

export function userSignup(values){   
    return (dispatch) => WebService.getInstance().signUp(values, (response)=>{
        console.log(response);
        if(response.success){
            dispatch(signupSuccess(response));
            values.role === AppConstants.USER_ROLE_OWNER ? history.push('/dashboard') : history.push('/');
        }
        else{
            dispatch(signupFailure(response.message));
        }
    },(error)=>{
        console.log(error);
        dispatch(signupFailure(error));
    });
}

const signupSuccess = (response) => ({
    type: AppActions.SIGNUP_SUCCESS,
    payload:response
});

const signupFailure = (error) => ({
    type: AppActions.SIGNUP_FAILURE,
    payload:error
});
