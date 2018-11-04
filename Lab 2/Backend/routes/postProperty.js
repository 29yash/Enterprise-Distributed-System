var express = require("express");
var router = express.Router();
var uploadPhoto = require('./uploadImage');
var kafka = require('../kafka/client');


router.post("/postProperty/uploadPhoto", uploadPhoto.any(), function(req,res){
    let response = {};
    let photoURLS = [];
    if(req.files.length > 0){
        console.log(req.files);
        req.files.map((file)=>{
            photoURLS.push("http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080/photos/" + file.filename);
        });
        response['success'] = true;
        response['message'] = "Image uploaded successfully";
        response['urls'] = photoURLS;
        res.status(200).send(response);
    }
    else{
        response['success'] = false;
        response['message'] = "File type not supported";
        res.status(200).send(response);
    }
});



var validateRequest = function (req, res, next) {
    let response = {}
    console.log(req.body);
    let isBadRequest = false;
    if(!(req.body.country.trim().length > 0 && req.body.state.trim().length && req.body.zip.trim().length)){
        isBadRequest = true;
    }
    else if(!(req.body.street.trim().length > 0 && req.body.unit.trim().length && req.body.city.trim().length > 0 )){
        isBadRequest = true;
    }
    else if(!(req.body.headline.trim().length > 0 && req.body.description.trim().length  && req.body.guests.trim().length)){
        isBadRequest = true;
    }
    else if(!(req.body.type.trim().length > 0 && req.body.bedrooms.trim().length  && req.body.bathroom.trim().length)){
        isBadRequest = true;
    }
    else if(!(req.body.startDate.trim().length > 0 && req.body.endDate.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.bookingOption.trim().length > 0 && req.body.minStay.trim().length > 0 && req.body.singleNightRate.trim().length > 0)){
        isBadRequest = true;
    }
    if (isBadRequest) {
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(400).send(response);
    } 
    else {
        next();
    }
};


router.post("/postProperty", validateRequest, function(req,res){
    let response = {};
    kafka.make_request('homeaway_post_property', 'homeaway_post_property_response' ,{username: req.user.user_email, ...req.body}, function(error,result){
        console.log('In homeaway_post_property');
        console.log(result);
        if (error){
            console.log("Inside Post Property Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Post Property Kafka Response");
            console.log(result);
            response['success'] = true;
            response ['property'] = result;
            response['message'] = "Property Posted successfully";
            res.status(200).send(response);
        }
    });
});
module.exports = router;