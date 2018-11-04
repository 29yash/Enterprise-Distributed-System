var {Property} = require('../models/property');
function bookingHistory(message, callback){
    console.log("Inside Boooking History kafka backend");
    console.log(message);
    if(message.role === 'Traveller'){
        Property.find({'bookings': {$elemMatch: {customerName: message.username}}},(error, properties)=>{
            if(error){
                console.log(error);
                callback(error, null);
            }
            else{
                let bookings = [];
                if(properties){
                    properties.map((property)=>{
                        let {country, street, city, state, unit, headline, type, bedrooms, bathroom, guests, propertyPictures} = property
                        property.bookings.map((booking)=>{
                            if(booking.customerName == message.username){
                                bookings.push({ booking, country, street, state, unit, 
                                    headline, type, city, bedrooms, bathroom, guests, propertyPictures});
                            }
                        });
                    });
                }
                callback(null, {bookings});
            }
        });
    }
    else{
        Property.find({owner:message.username},(error, properties)=>{
            if(error){
                console.log(error);
                callback(error, null);
            }
            else{
                let bookings = [];
                if(properties){
                    properties.map((property)=>{
                        let {country, street, city, state, unit, headline, type, bedrooms, bathroom, guests, propertyPictures} = property
                        property.bookings.map((booking)=>{
                            bookings.push({booking, country, street, state, unit, 
                                headline, type, city, bedrooms, bathroom, guests, propertyPictures});
                        });
                    });
                }
                else{
                    properties = [];
                }
                callback(null, {properties, bookings});
            }
        });
    }
}
exports.handle_request = bookingHistory;