const graphql = require('graphql');
const _ = require('lodash');
var login = require('../routes/login');
var Signup = require('../routes/signup');
var { getUserProfile, editUserProfile } = require('../routes/userProfile');
var searchProperty = require('../routes/searchProperty');
var booking = require('../routes/booking');
var bookingHistory = require('../routes/bookingHistory');
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
    fields: () => ({
        user_email: { type: GraphQLString },
        user_first_name: { type: GraphQLString },
        user_last_name: { type: GraphQLString },
        user_aboutme: { type: GraphQLString },
        user_gender: { type: GraphQLString },
        user_phone_number: { type: GraphQLString },
        user_languages: { type: GraphQLString },
        user_city: { type: GraphQLString },
        user_company: { type: GraphQLString },
        user_school: { type: GraphQLString },
        user_hometown: { type: GraphQLString },
        user_role: { type: GraphQLString },
        token: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        _id: { type: GraphQLString },
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        unit: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        headline: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLString },
        bathroom: { type: GraphQLString },
        guests: { type: GraphQLString },
        bookingOption: { type: GraphQLString },
        singleNightRate: { type: GraphQLString },
        minStay: { type: GraphQLString },
        owner: { type: GraphQLString },
        propertyPictures: { type: new GraphQLList(GraphQLString) },
    })
});

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        customerName: { type: GraphQLString },
        arrivalDate: { type: GraphQLString },
        departureDate: { type: GraphQLString },
        amount: { type: GraphQLInt },
        noOfGuests: { type: GraphQLString },
        property : {type: PropertyType}, 
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    })
});


const PropertiesType = new GraphQLObjectType({
    name: 'Properties',
    fields: () => ({
        properties: { type: new GraphQLList(PropertyType) },
        success: { type: GraphQLBoolean }
    })
});

const BookingsType = new GraphQLObjectType({
    name: 'Bookings',
    fields: () => ({
        properties: { type: new GraphQLList(PropertyType) },
        bookings: { type: new GraphQLList(BookingType) },
        success: { type: GraphQLBoolean }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUserProfile: {
            type: UserType,
            async resolve(parent, args, context) {
                if (context.user) {
                    let response = await getUserProfile(context);
                    console.log("Response :", response);
                    return response;
                }
            }
        },
        searchProperties: {
            type: PropertiesType,
            args: {
                location: { type: GraphQLString }, guests: { type: GraphQLString },
                arrivalDate: { type: GraphQLString }, departureDate: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                if (context.user) {
                    let response = await searchProperty(args);
                    console.log("Response :", response);
                    return response;
                }
            }
        },
        bookingHistory:{
            type: BookingsType,
            args: {},
            async resolve(parent, args, context) {
                if (context.user) {
                    let response = await bookingHistory(context.user.user_email, context.user.user_role);
                    console.log("Response :", response);
                    return response;
                }
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
                password: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                let response = await login(args);
                console.log("Response :", response);
                return response;
            }
        },
        signUp: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let response = await Signup(args);
                console.log("Response :", response);
                return response;
            }
        },
        editUserProfile: {
            type: UserType,
            args: {
                user_first_name: { type: GraphQLString },
                user_last_name: { type: GraphQLString },
                user_aboutme: { type: GraphQLString },
                user_gender: { type: GraphQLString },
                user_phone_number: { type: GraphQLString },
                user_languages: { type: GraphQLString },
                user_city: { type: GraphQLString },
                user_company: { type: GraphQLString },
                user_school: { type: GraphQLString },
                user_hometown: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
                if (context.user) {
                    let response = await editUserProfile(args, context.user.user_email);
                    console.log("Response :", response);
                    return response;
                }
            }
        },
        booking: {
            type: BookingType,
            args: {
                propertyId: { type: GraphQLString },
                arrivalDate: { type: GraphQLString },
                departureDate: { type: GraphQLString },
                guests: { type: GraphQLString },
                amount: { type: GraphQLInt },
            },
            async resolve(parent, args, context) {
                if (context.user) {
                    let response = await booking(args, context.user.user_email);
                    console.log("Response :", response);
                    return response;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});