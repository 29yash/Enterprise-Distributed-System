var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

async function bookingHistory(username, role){
    let response = {};
    return await kafka.make_request('homeaway_booking_history', 'homeaway_booking_history_response' ,{username, role}, function(error,result){
        console.log('In homeaway_booking_history');
        console.log(result);
        if (error){
            console.log("Inside Booking History Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            return response;
        }
        else{
            console.log("Inside Booking History Kafka Response");
            console.log(result);
            response['success'] = true;
            response['message'] = "Booking History fetched successfully";
            return {...response, ...result};
        }
    });
};
module.exports = bookingHistory;