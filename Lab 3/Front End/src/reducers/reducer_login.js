import AppActions from "../constant/AppActions";

export default function(state = {}, action) {

  console.log(action);
    
  switch (action.type) {
    case AppActions.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loginFailed: false, 
        user: action.payload.user
      };
    case AppActions.LOGIN_FAILURE:
      return {
        loggedIn: false,
        loginFailed: true, 
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
