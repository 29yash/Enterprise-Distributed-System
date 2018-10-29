var express = require("express");
var router = express.Router();
// var getConnectionFromPool = require('../database');

var kafka = require('../kafka/client');

router.post("/signup",function(req,res){
    let response = {};
    console.log(req.body);
    if(!(req.body.firstName.trim().length > 0 && req.body.lastName.trim().length > 0 && req.body.email.trim().length > 0 )){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(200).send(response);
    }
    else if(req.body.password.trim().length < 6) {
        response['success'] = false ;
        response['message'] = "Password must have atleast 6 characters";
        res.status(200).send(response);
    }
    else{
        kafka.make_request('homeaway_signup', 'homeaway_signup_response' ,req.body, function(error,result){
            console.log('In homeaway_signup');
            console.log(result);
            if (error){
                console.log("Inside Singup Kafka Response Error", error);
                if(error.code === 11000){
                    response['success'] = false ;
                    response['message'] = 'Email already exist';
                    res.status(200).send(response);
                }
                else{
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response);
                }
            }
            else{
                console.log("Inside Signup Kafka Response");
                console.log(result);
                response['success'] = true;
                response['user'] = result;
                response['message'] = "User Registered successfully";
                res.status(200).send(response);
            }
        });
    }
});

module.exports = router; 