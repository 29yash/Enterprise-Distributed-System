const URI = {
    // BASE_URL : "http://localhost:8080",
    BASE_URL : "http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080",
    LOGIN : "/login",
    LOGOUT: "/logout",
    SIGNUP: "/signUp",
    USER_PROFILE_PICTURE : "/userProfile/uploadPhoto",
    GET_USER_PROFILE: "/userProfile/getProfile",
    EDIT_USER_PROFILE: "/userProfile/editProfile",
    SEARCH_PROPERTY: "/searchProperty", 
    POST_PROPERTY: "/postProperty",
    BOOK_PROPERTY: "/bookProperty",
    POST_PROPERTY_PICTURE: "/postProperty/uploadPhoto",
    BOOKING_HISTORY: "/bookingHistory",
    GET_CONVERSATIONS : "/converstions/getMessages",
    POST_MESSAGE: "/converstions/postMessage"
};

export default URI;