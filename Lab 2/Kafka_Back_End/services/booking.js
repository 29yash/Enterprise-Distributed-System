var {Property} = require('../models/property');
var ObjectId = require('mongoose').Types.ObjectId;
function booking(message, callback){
    console.log("Inside booking kafka backend");
    console.log(message);
    let searchQuery = {
        blockDates : {
            $not : {
                $elemMatch : { 
                    $or : [
                         {startDate : {$gte: new Date(message.arrivalDate), $lte: new Date(message.departureDate)}},
                         {endDate : {$gte: new Date(message.arrivalDate), $lte: new Date(message.departureDate)}},
                         { $and : [ {endDate : {$gte: new Date(message.departureDate)}}, {startDate:{$lte: new Date(message.arrivalDate)}} ]} 
                    ]                    
                }
            }
        },
        _id: new ObjectId(message.propertyId)
    }
    let updateQuery = {
        $push : {
            blockDates : {startDate : message.arrivalDate, endDate: message.departureDate},
            bookings : {
                customerName: message.username,
                arrivalDate : message.arrivalDate, 
                departureDate: message.departureDate,
                amount : message.amount,
                noOfGuests : message.guests
            }
        }
    }
    Property.findOneAndUpdate(searchQuery, updateQuery,(error, properties)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else{
            console.log(properties);
            callback(null, properties);
        }
     });
}

exports.handle_request = booking;