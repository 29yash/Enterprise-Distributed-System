var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

async function searchProperties (req, res) {
    let isBadRequest = false;
    let response = {};
    if (!(req.location.trim().length > 0)) {
        isBadRequest = true;
    }
    else if (!(req.arrivalDate.trim().length > 0 && req.departureDate.trim().length > 0)) {
        isBadRequest = true;
    }
    else if (!(req.guests.trim().length > 0)) {
        isBadRequest = true;
    }
    if (isBadRequest) {
        response['success'] = false;
        response['message'] = "All fields are Mandatory";
        return response;
    } else {
        return await kafka.make_request('homeaway_search_property', 'homeaway_search_property_response', { ...req }, function (error, result) {
            console.log('In homeaway_search_property');
            console.log(result);
            if (error) {
                console.log("Inside Search Property Kafka Response Error", error);
                response['success'] = false;
                response['message'] = 'Internal Server Error';
                return response;
            }
            else {
                console.log("Inside Search Property Kafka Response");
                console.log(result);
                response['success'] = true;
                response['properties'] = result;
                return response;
            }
        });
    }
};

module.exports = searchProperties;