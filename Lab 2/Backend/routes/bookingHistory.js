var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

router.get("/bookingHistory",function(req,res){
    let response = {};
    kafka.make_request('homeaway_booking_history', 'homeaway_booking_history_response' ,{username: req.user.user_email, role:req.user.user_role, ...req.body}, function(error,result){
        console.log('In homeaway_booking_history');
        console.log(result);
        if (error){
            console.log("Inside Booking History Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Booking History Kafka Response");
            console.log(result);
            response['success'] = true;
            response ['history'] = result;
            response['message'] = "Booking History fetched successfully";
            res.status(200).send(response);
        }
    });
});
module.exports = router;