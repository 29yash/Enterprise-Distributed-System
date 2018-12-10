import WebService from "../services/WebService";
import GraphQLService from "../services/GraphQLService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";

export function userLogin(values){   
    return (dispatch) => GraphQLService.getInstance().login(values, (response)=>{
        console.log(response);
        if(response.success){
            localStorage.setItem(AppConstants.USER_DETAILS, JSON.stringify(response));
            localStorage.setItem(AppConstants.AUTH_TOKEN, JSON.stringify(response.token));
            dispatch(loginSuccess(response));
            values.role === AppConstants.USER_ROLE_OWNER ? history.push('/dashboard') : history.push('/');
        }
        else{
            dispatch(loginFailure(response.message));
        }
    },(error)=>{
        console.log(error);
        dispatch(loginFailure(error));
    });
}

const loginSuccess = (response) => ({
    type: AppActions.LOGIN_SUCCESS,
    payload:response
});

const loginFailure = (error) => ({
    type: AppActions.LOGIN_FAILURE,
    payload:error
});
