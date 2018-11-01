import WebService from "../services/WebService";
import { history } from "../router/history";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";

export function userLogout(){
    WebService.getInstance().logout((response)=>{
        logoutReset();
    },(error)=>{
        console.log(error);
        logoutReset();
    });
}

export function logoutReset(){  
        localStorage.clear();
        console.log('In Logout Reset');
        history.push('/');
        return logoutAction();
}

const logoutAction= () => ({
    type: AppActions.LOGOUT_REDUX_RESET,
    payload:{}
});
