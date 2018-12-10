var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

async function Signup(req){
    let response = {};
    console.log(req);
    if(!(req.firstName.trim().length > 0 && req.lastName.trim().length > 0 && req.email.trim().length > 0 )){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        return response;
    }
    else if(req.password.trim().length < 6) {
        response['success'] = false ;
        response['message'] = "Password must have atleast 6 characters";
        return response;
    }
    else{
        return await kafka.make_request('homeaway_signup', 'homeaway_signup_response' ,req, function(error,result){
            console.log('In homeaway_signup');
            console.log(result);
            if (error){
                console.log("Inside Singup Kafka Response Error", error);
                if(error.code === 11000){
                    response['success'] = false ;
                    response['message'] = 'Email already exist';
                    return response;
                }
                else{
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    return response;
                }
            }
            else{
                console.log("Inside Signup Kafka Response");
                console.log(result);
                response['success'] = true;
                response['message'] = "User Registered successfully";
                return {...response, ...result};
            }
        });
    }
};

module.exports = Signup; 