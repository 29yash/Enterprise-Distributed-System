import WebService from "../services/WebService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILURE= "login_failure";

export function userLogin(values){   
    return (dispatch) => WebService.getInstance().login(values, (response)=>{
        console.log(response);
        dispatch(loginSuccess(response));
       values.role === AppConstants.USER_ROLE_OWNER ? history.push('/dashboard') : history.push('/');
    },(error)=>{
        console.log(error);
        dispatch(loginFailure(error));
    });
}

const loginSuccess = (response) => ({
    type: LOGIN_SUCCESS,
    payload:response
});

const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload:error
});
