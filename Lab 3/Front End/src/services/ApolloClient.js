import ApolloClient from 'apollo-boost';
// apollo client setup
export const ApolloService = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
});