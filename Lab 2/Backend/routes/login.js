var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');
var config = require('../settings/config');
var jwt = require('jsonwebtoken');
router.post("/login",function(req,res){
    let response = {};
    console.log(req.body);    
    if(!(req.body.username.trim().length > 0 && req.body.password.trim().length > 0)){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(401).send(response);
    }
    kafka.make_request('homeaway_login', 'homeaway_login_response' ,req.body, function(error,result){
        console.log('In homeaway_login');
        console.log(result);
        if (error){
            console.log("Inside Login Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Login Kafka Response");
            console.log(result);
            if(result.isAuth && result.user){
                var token = jwt.sign(result.user, config.jwt_secret_key, { expiresIn: 10080});
                response['success'] = true;
                response['user'] = result.user;
                delete result['user']['user_password'];
                response['message'] = "User Logged in successfully";
                response['token'] = token;
                res.status(200).send(response);
            }
            else if(!result.isAuth && result.user){
                response['success'] = false ;
                response['message'] = "Email and Password does not match";
                res.status(403).send(response);
            }
            else{
                response['success'] = false ;
                response['message'] = "Email does not exists!";
                res.status(403).send(response);
            }    
        }
    });
});

module.exports = router;
