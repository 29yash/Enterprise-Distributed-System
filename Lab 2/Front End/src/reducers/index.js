import { combineReducers } from "redux";
import LoginReducer from "./reducer_login";
import SignupReducer from "./reducer_signup";
import UserProfileReducer from "./reducer_user";
import PostPropertyReducer from "./reducer_post_property";
import SearchProperty from "./reducer_search_property";
import PropertyDetailAndBooking from "./reducer_property_detail_booking";
import BookingHistory from "./reducer_booking_history";
import AppActions from "../constant/AppActions";

const appReducer = combineReducers({
  /*  App’s top-level reducers */
  login: LoginReducer,
  signup: SignupReducer,
  userProfile: UserProfileReducer,
  postProperty: PostPropertyReducer,
  searchProperty: SearchProperty,
  propertyDetailAndBooking: PropertyDetailAndBooking,
  bookingHistory:BookingHistory
});


const rootReducer = (state, action) => {
  if (action.type === AppActions.LOGOUT_REDUX_RESET) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
