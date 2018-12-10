import { ApolloService } from './ApolloClient';
import Mutations from './Mutations';
import Queries from './Queries';
export default class GraphQLService {

    static instance = null;

    constructor() {

    }

    /** Singleton Patter
    * @returns {WebService}
    */
    static getInstance() {
        if (GraphQLService.instance == null) {
            GraphQLService.instance = new GraphQLService();
        }
        return this.instance;
    }

    /**
    * Login Call - User login api call
    * Takes success and failure operations
    *
    * Required params: username, password and role in detail object.
    */
    login(credentials, success, failure) {
        ApolloService.mutate({
            mutation: Mutations.LOGIN,
            variables: { username: credentials.username, password: credentials.password }
        }).then(data => { success(data.data.login) })
            .catch(error => failure(error));
    }

    /**
    * SignUp Call - User SignUp api call
    * Takes success and failure operations
    *
    * Required params: firstName, lastName, email, password, role in detail object.
    */
    signUp(values, success, failure) {
        ApolloService.mutate({
            mutation: Mutations.SIGN_UP,
            variables: values
        }).then(data => { success(data.data.signUp) })
            .catch(error => failure(error));
    }

    /**
    * Get User Profile - Api call
    * Takes success and failure operations
    *
    * Required params:.
    */
    getUserProfile(success, failure) {
        ApolloService.query({
            query: Queries.GET_USER_PROFILE
        }).then(data => { success(this.handleResponse(data.data.getUserProfile, "user")) }).catch(error => failure(error));
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
    editUserProfile(details, success, failure) {
        ApolloService.mutate({
            mutation: Mutations.EDIT_USER_PROFILE,
            variables: details
        }).then(data => { success(this.handleResponse(data.data.editUserProfile, "user")) })
            .catch(error => failure(error));
    }

    /**
    * Search Property - Api call
    * Takes success and failure operations
    *
    * Required params:
    */
    searchProperty(details, success, failure) {
        ApolloService.query({
            query: Queries.SEARCH_PROPERTY,
            variables: details
        }).then(data => { success(data.data.searchProperties) }).catch(error => failure(error));
    }

    /**
    * Book Property - Api call
    * Takes success and failure operations
    *
    * Required params: propertyId, location, arrivalDate, departureDate, guests, amount
    */
    bookProperty(details, success, failure) {
        ApolloService.mutate({
            mutation: Mutations.BOOKING,
            variables: details
        }).then(data => { success(data.data.booking) })
            .catch(error => failure(error));
    }

    /**
    * Booking History - Api call
    * Takes success and failure operations
    *
    * Required params: 
    */
    bookingHistory(success, failure) {
        ApolloService.query({
            query: Queries.BOOKING_HISTORY,
        }).then(data => { console.log(data);
            success((data.data.bookingHistory));
        }).catch(error => failure(error));
    }


    handleResponse(response, key) {
        let res = {}
        if (response.success) {
            res['success'] = response.success
            delete response['success'];
        }
        if (response.message) {
            res['message'] = response.message
            delete response['message'];
        }
        res[key] = { ...response }
        return res;
    }

}
