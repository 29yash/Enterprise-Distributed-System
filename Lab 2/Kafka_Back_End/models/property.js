var mongoose = require('mongoose');
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    country : {type: String, required : true },
    street: {type: String, required : true }, 
    unit: {type: String, required : true }, 
    city: {type: String, required : true }, 
    state: {type: String, required : true }, 
    zip: {type: String, required : true }, 
    headline: {type: String, required : true }, 
    description: {type: String, required : true }, 
    type: {type: String, required : true }, 
    bedrooms: {type: Number, required : true }, 
    bathroom: {type: Number, required : true }, 
    guests: {type: Number, required : true },
    bookingOption: {type: String, required : true }, 
    singleNightRate: {type: Number, required : true }, 
    minStay: {type: Number, required : true }, 
    owner: {type: String, required : true },
    blockDates: [{ startDate: Date, endDate: Date}],
    propertyPictures: {type: [String], required:true},
    bookings : [{
        customerName : String, 
        arrivalDate : Date, 
        departureDate : Date,
        noOfGuests: Number,
        amount: Number
    }]
}); 
var Property = mongoose.model('properties', PropertySchema);

module.exports = {Property};