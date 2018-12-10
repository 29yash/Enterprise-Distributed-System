import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AppConstants from '../constant/AppConstants';
// apollo client setup
const access_token = localStorage.getItem(AppConstants.AUTH_TOKEN);
const headers = {
    authorization: access_token ? `Bearer ${access_token}` : null
};
const httpLink = new createHttpLink({
    uri: 'http://localhost:8080/graphql',
    headers
});
export const ApolloService = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});