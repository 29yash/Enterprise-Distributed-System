import { ApolloService } from './ApolloClient';
import Mutations from './Mutations';
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
            variables: { username: credentials.username, password: credentials.password}
        }).then(data => {success(data.data.login)})
            .catch(error => failure(error));
    }

    signUp(values, success, failure) {
        ApolloService.mutate({
            mutation: Mutations.SIGN_UP,
            variables: values
        }).then(data => {success(data.data.signUp)})
            .catch(error => failure(error));
    }

}
