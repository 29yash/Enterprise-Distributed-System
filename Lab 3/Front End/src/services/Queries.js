import { gql } from 'apollo-boost';
const Queries = {
    GET_USER_PROFILE: gql`query getUserProfile{
                getUserProfile{
                    user_email, user_first_name, user_last_name, user_aboutme, 
                    user_gender, user_phone_number, user_languages, message              
                    user_city, user_company, user_school, user_hometown, user_role, success
                }
            }`,
    SEARCH_PROPERTY: gql`query searchProperties($location: String, $arrivalDate: String, $departureDate: String, $guests: String){
        searchProperties(location: $location, arrivalDate: $arrivalDate, departureDate: $departureDate, guests: $guests){
            properties {
                country,
                street,
                unit,
                city,
                state,
                zip,
                headline,
                description,
                type,
                bedrooms,
                bathroom,
                guests,
                bookingOption,
                singleNightRate,
                minStay,
                propertyPictures,
                _id
              },
              success
            }
        }`,
    BOOKING_HISTORY: gql`query bookingHistory{
                        bookingHistory{
                            properties {
                                country,
                                street,
                                unit,
                                city,
                                state,
                                zip,
                                headline,
                                description,
                                type,
                                bedrooms,
                                bathroom,
                                guests,
                                bookingOption,
                                singleNightRate,
                                minStay,
                                propertyPictures,
                                _id
                            },
                            success
                            bookings{
                                customerName,  
                                arrivalDate, 
                                departureDate,  
                                amount,
                                noOfGuests,
                                property{
                                    country, street, state, unit,
                                        headline, type, city, bedrooms, bathroom, guests, propertyPictures
                                }  
                            }
                        }
                    }`
};

export default Queries;