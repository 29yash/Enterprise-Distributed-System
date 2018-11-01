var {Property} = require('../models/property');
function postProperty(message, callback){
    console.log("Inside post property kafka backend");
    console.log(message);
    let newProperty = new Property({
        country : message.country,
        street: message.street, 
        unit: message.unit, 
        city: message.city, 
        state: message.state, 
        zip: message.zip, 
        headline:message.headline, 
        description: message.description, 
        type: message.type, 
        bedrooms: parseInt(message.bedrooms), 
        bathroom: parseInt(message.bathroom), 
        guests: parseInt(message.guests),
        bookingOption: message.bookingOption, 
        singleNightRate: message.singleNightRate, 
        minStay: parseInt(message.minStay), 
        owner: message.username,
        blockDates: [{ startDate: message.startDate, endDate: message.endDate}],
        propertyPictures: message.propertyPictures
    });
    newProperty.save().then((property)=>{
        console.log('Property Posted Successfully !');
        callback(null, property);
    }, (error)=>{
        console.log(error);
        callback(error, null);
    });
}
exports.handle_request = postProperty;