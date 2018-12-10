var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');
var config = require('../settings/config');
var jwt = require('jsonwebtoken');

async function login(req) {
    let res = {};
    console.log(req);    
    if(!(req.username.trim().length > 0 && req.password.trim().length > 0)){
        res['success'] = false ;
        res['message'] = "All fields are Mandatory";
        return res;
    }
    return await kafka.make_request('homeaway_login', 'homeaway_login_response' ,req, (error, result)=>{
        let response = {};
        console.log('In homeaway_login');
        if (error){
            console.log("Inside Login Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            return response;
        }
        else{
            console.log("Inside Login Kafka Response");
            console.log(result);
            if(result.isAuth && result.user){
                var token = jwt.sign(result.user, config.jwt_secret_key, { expiresIn: 10080});
                response['success'] = true;
                delete result['user']['user_password'];
                let user = result.user;
                response['message'] = "User Logged in successfully";
                response['token'] = token;
                return {...response, ...user};
            }
            else if(!result.isAuth && result.user){
                response['success'] = false ;
                response['message'] = "Email and Password does not match";
                return response;
            }
            else{
                response['success'] = false ;
                response['message'] = "Email does not exists!";
                return response;
            }    
        }
    });
};

module.exports = login;
