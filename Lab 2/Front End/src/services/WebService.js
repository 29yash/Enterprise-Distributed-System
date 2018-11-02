import AxiosService from "./AxiosService";
import URI from "../constant/uri"

export default class WebService extends AxiosService{
    
    static instance = null;

    constructor() {
        super();
    }

    /** Singleton Patter
    * @returns {WebService}
    */
    static getInstance() {
        if (WebService.instance == null) {
            WebService.instance = new WebService();
        }
        return this.instance;
    }
    
    /**
    * Login Call - User login api call
    * Takes success and failure operations
    *
    * Required params: username, password and role in detail object.
    */
    login(credentials, success, failure){
        this.postCall(URI.LOGIN, credentials, success, failure);
    }

    /**
    * SignUp Call - User SignUp api call
    * Takes success and failure operations
    *
    * Required params: firstName, lastName, email, password, role in detail object.
    */
    signUp(details, success, failure){
        this.postCall(URI.SIGNUP, details, success, failure);
    }

    /**
    * Edit User Profile api call
    * Takes success and failure operations
    *
    * Required Params : user_first_name, user_last_name in detail object.
    * 
    * Optional Params: user_aboutme, user_city, user_company, user_hometown, 
            user_languages, user_school, user_gender, user_phone_number in detail object.
    */
    editUserProfile(details, success, failure){
        this.postCall(URI.EDIT_USER_PROFILE, details, success, failure, true);
    }

    /**
    * User Profile Photo Upload - Api call
    * Takes success and failure operations
    *
    * Required params: profilePicture in Form Data.
    */
    uploadUserProfilePhoto(details, success, failure){
        this.postCall(URI.USER_PROFILE_PICTURE, details, success, failure, true);
    }
    
    /**
    * Get User Profile - Api call
    * Takes success and failure operations
    *
    * Required params:.
    */
    getUserProfile(success, failure){
        this.getCall(URI.GET_USER_PROFILE, success, failure, true);
    }

    /**
    * Logout Call - User Logout api call
    * Takes success and failure operations
    */

    logout(success, failure = null) {
        this.deleteCall(URI.LOGOUT, null, success, failure, true);
    }

    /**
    * Search Property - Api call
    * Takes success and failure operations
    *
    * Required params:
    */
    searchProperty(details, success, failure){
        this.postCall(URI.SEARCH_PROPERTY, details, success, failure, true);
    }

    /**
    * Post Property - Api call
    * Takes success and failure operations
    *
    * Required params:
    */
    postProperty(details, success, failure){
        this.postCall(URI.POST_PROPERTY, details, success, failure, true);
    }

    /**
    * Post Property Picture - Api call
    * Takes success and failure operations
    *
    * Required params:
    */
    postPropertyPicture(details, success, failure){
        this.postCall(URI.POST_PROPERTY_PICTURE, details, success, failure, true);
    }   

    /**
    * Book Property - Api call
    * Takes success and failure operations
    *
    * Required params: propertyId, location, arrivalDate, departureDate, guests, amount
    */
    bookProperty(details, success, failure){
        this.postCall(URI.BOOK_PROPERTY, details, success, failure, true);
    }  

    /**
    * Booking History - Api call
    * Takes success and failure operations
    *
    * Required params: 
    */
    bookingHistory(success, failure){
        this.getCall(URI.BOOKING_HISTORY, success, failure, true);
    }  
}