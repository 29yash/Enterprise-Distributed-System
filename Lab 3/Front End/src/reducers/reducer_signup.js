import AppActions from "../constant/AppActions";

export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case AppActions.SIGNUP_SUCCESS:
      return {
        failedSignUp: false
      };
    case AppActions.SIGNUP_FAILURE:
      return {
        failedSignUp: true, 
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
