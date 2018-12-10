const graphql = require('graphql');
const _ = require('lodash');
var login = require('../routes/login');
var Signup = require('../routes/signup');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        user_email : { type: GraphQLString },               
        user_first_name: { type: GraphQLString },            
        user_last_name: { type: GraphQLString },                    
        user_aboutme : { type: GraphQLString },               
        user_gender: { type: GraphQLString },               
        user_phone_number: { type: GraphQLString },               
        user_languages:{ type: GraphQLString },               
        user_city: { type: GraphQLString },               
        user_company: { type: GraphQLString },
        user_school: { type: GraphQLString },               
        user_hometown:{ type: GraphQLString },
        user_role: { type: GraphQLString },
        token : { type: GraphQLString },
        success : {type: GraphQLBoolean},
        message : { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user:{
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return {};
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password :  { type: GraphQLString }
            },
             async resolve(parent, args){
                let response =  await login (args);
                console.log("Response :", response);
                return response;
            }
        },
        signUp : {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password :  { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName :  { type: GraphQLString },
                role :  { type: GraphQLString }
            },
             async resolve(parent, args){
                let response =  await Signup(args);
                console.log("Response :", response);
                return response;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});