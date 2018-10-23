import AppActions from "../constant/AppActions";

const initialState = {
  userProfile: null,
  loading: false,
  errorMessage: null
};

export default function(state = initialState, action) {    
  switch (action.type) {
    case AppActions.USER_PROFILE_FETCH_SUCCESS:
      return {
        loading : false,
        userProfile: action.payload.user,
        errorMessage:null
      };
    case AppActions.USER_PROFILE_FETCH_FAILURE:
      return {
        loading:false,
        errorMessage: action.payload
      };
    case AppActions.USER_PROFILE_FETCH:
      return {
        userProfile: null,
        loading:true,
        errorMessage: null
      };
    default:
      return state;
  }
}
