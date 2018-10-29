import { combineReducers } from "redux";
import LoginReducer from "./reducer_login";
import SignupReducer from "./reducer_signup";
import UserProfileReducer from "./reducer_user";
import PostPropertyReducer from "./reducer_post_property";

const rootReducer = combineReducers({
  login: LoginReducer,
  signup: SignupReducer,
  userProfile: UserProfileReducer,
  postProperty: PostPropertyReducer
});

export default rootReducer;
