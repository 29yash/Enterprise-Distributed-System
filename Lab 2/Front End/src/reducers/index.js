import { combineReducers } from "redux";
import LoginReducer from "./reducer_login";
import SignupReducer from "./reducer_signup";
import UserProfileReducer from "./reducer_user";

const rootReducer = combineReducers({
  login: LoginReducer,
  signup: SignupReducer,
  userProfile: UserProfileReducer
});

export default rootReducer;
