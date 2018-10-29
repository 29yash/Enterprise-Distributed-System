import AppActions from "../constant/AppActions";

const initialState = {
  userProfile: null,
  loading: false,
  message: null,
  errorMessage:null
};

export default function(state = initialState, action) {    
  switch (action.type) {
    case AppActions.USER_PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        userProfile: action.payload.user,
        errorMessage:null
      };
    case AppActions.USER_PROFILE_FETCH_FAILURE:
      return {
        ...state,
        loading:false,
        errorMessage: action.payload,
        message:null
      };
    case AppActions.USER_PROFILE_FETCH:
      return {
        ...state,
        loading:true
      };
    case AppActions.USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload.profile,
        message: action.payload.message
      };
    case AppActions.USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        message:null
      };
    case AppActions.USER_PROFILE_PICTURE_UPLOAD_SUCCESS:
      return {
        ...state,
        userProfile : {...state.userProfile, pic_url:action.payload},
        message: null
      };
    case AppActions.USER_PROFILE_PICTURE_UPLOAD_FAILURE:
    return {
      ...state,
      errorMessage: action.payload,
      message:null
    };
    default:
      return state;
  }
}
