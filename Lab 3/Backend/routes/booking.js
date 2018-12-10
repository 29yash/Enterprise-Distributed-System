var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

 async function booking (req, username ) {
    let response = {};
    let isBadRequest = false;
    console.log(req);
    if (!(req.propertyId)) {
        isBadRequest = true;
    }
    else if (!(req.arrivalDate.trim().length > 0 && req.departureDate.trim().length > 0)) {
        isBadRequest = true;
    }
    else if (!(req.guests.trim().length > 0)) {
        isBadRequest = true;
    }
    else if (!(req.amount)) {
        isBadRequest = true;
    }

    if (isBadRequest) {
        response['success'] = false;
        response['message'] = "All fields are Mandatory";
        return response;
    } else {
        return await kafka.make_request('homeaway_book_property', 'homeaway_book_property_response', { username, ...req }, function (error, result) {
            console.log('In homeaway_book_property');
            console.log(result);
            if (error) {
                console.log("Inside Book Property Kafka Response Error", error);
                response['success'] = false;
                response['message'] = 'Internal Server Error';
                return response;
            }
            else if (result) {
                console.log("Inside Book Property Kafka Response");
                console.log(result);
                response['success'] = true;
                response['bookingID'] = ""
                response['message'] = "Booking successfully"
                return response;
            }
            else {
                response['success'] = false;
                response['message'] = "Property not available for the selected dates";
                return response;
            }
        });
    }
};

module.exports = booking;           
