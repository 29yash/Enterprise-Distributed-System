import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/actions_login";

export default function(state = {}, action) {

  console.log(action);
    
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loginFailed: false, 
        user: action.payload.user
      };
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        loginFailed: true, 
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
