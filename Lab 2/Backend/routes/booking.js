var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

var validateRequest = function (req, res, next) {
    let isBadRequest = false;
    let response = {};
    console.log(req.body);
    
    if(!(req.body.propertyId)){
        isBadRequest = true;
    }
    else if(!(req.body.arrivalDate.trim().length > 0 && req.body.departureDate.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.guests.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.amount)){
        isBadRequest = true;    
    }

    if (isBadRequest) {
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(400).send(response);
    } else {
        next();
    }
};

router.post("/bookProperty", validateRequest,function(req,res){
    let response = {};
    kafka.make_request('homeaway_book_property', 'homeaway_book_property_response' ,{username: req.user.user_email, ...req.body}, function(error,result){
        console.log('In homeaway_book_property');
        console.log(result);
        if (error){
            console.log("Inside Book Property Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else if (result){
            console.log("Inside Book Property Kafka Response");
            console.log(result);
            response['success'] = true ;
            response['bookingID'] = ""
            response['message'] = "Booking successfully"
            res.status(200).send(response);
        }
        else {
            response['success'] = false;
            response['message'] = "Property not available for the selected dates";
            res.status(200).send(response);
        }
    });
});

module.exports = router;           
