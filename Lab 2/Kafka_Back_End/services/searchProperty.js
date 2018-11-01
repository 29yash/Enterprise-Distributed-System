var {Property} = require('../models/property');
function searchProperty(message, callback){
    console.log("Inside search property kafka backend");
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
        city: message.location,
        guests : {$gte: parseInt(message.guests)},
    }
    if(message.noOfBedrooms){
        searchQuery = Object.assign(searchQuery, {bedrooms : {$gte: parseInt(message.noOfBedrooms)}});
    }
    if(message.minPrice){
        searchQuery = Object.assign(searchQuery, {singleNightRate : {$gt: parseInt(message.minPrice)}});
    }
    if(message.maxPrice){
        searchQuery = Object.assign(searchQuery, {singleNightRate : {$lt: parseInt(message.maxPrice)}});
    }
    Property.find(searchQuery,(error, properties)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else{
            callback(null, properties);
        }
     });
}
exports.handle_request = searchProperty;



// {
//     blockDates : {
//         $not : {
//             $elemMatch : { 
//                 $or : [
//                      {startDate : {$gte: new Date(message.arrivalDate), $lte: new Date(message.departureDate)}},
//                      {endDate : {$gte: new Date(message.arrivalDate), $lte: new Date(message.departureDate)}},
//                      { $and : [ {endDate : {$gte: new Date(message.departureDate)}}, {startDate:{$lte: new Date(message.arrivalDate)}} ]} 
//                 ]                    
//             }
//         }
//     },
//     city: message.location,
//     guests : {$gte: parseInt(message.guests)},
//     bedrooms : {$gte: parseInt(noOfBedrooms)},
//     singleNightRate : {$gte: parseInt(minPrice)}

//  }


// Property.find({
//     blockDates : {
//         $elemMatch : { 
//             $nor : [
//                  {startDate : {$gte: new Date("2018-11-08"), $lte: new Date("2018-11-10")}},
//                  {endDate : {$gte: new Date("2018-11-08"), $lte: new Date("2018-11-10")}},
//                  { $and : [ {endDate : {$gte: new Date("2018-11-10")}}, {startDate:{$lte: new Date("2018-11-08")}} ]} 
//             ]
                
//          }
//      }
//  })