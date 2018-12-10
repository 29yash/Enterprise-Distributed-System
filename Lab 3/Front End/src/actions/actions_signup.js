import GraphQLService from "../services/GraphQLService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { userLogin } from "./actions_login";

export function userSignup(values){   
    return (dispatch) => GraphQLService.getInstance().signUp(values, (response)=>{
        console.log(response);
        if(response.success){
            dispatch(signupSuccess(response));
            dispatch(userLogin({username: values.email, password:values.password, role:values.role}));
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
