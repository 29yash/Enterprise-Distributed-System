var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

router.get("/converstions/getMessages",function(req,res){
    let response = {};
    kafka.make_request('homeaway_get_conversations', 'homeaway_get_conversations_response', {username: req.user.user_email}, function(error,result){
        console.log('In homeaway_get_conversations');
        console.log(result);
        if (error){
            console.log("Inside Get Conversations Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Get Conversations Kafka Response");
            console.log(result);
            response['success'] = true;
            response['conversations']= result
            res.status(200).send(response);
        }
    });
});

router.post("/converstions/postMessage",function(req,res){
    let response = {};
    console.log(req.body);
    
    if(!(req.body.owner.trim().length > 0 && req.body.traveller.trim().length > 0 && req.body.message && req.body.propertyId && req.body.propertyHeadline)){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(400).send(response);
    }
    else{
        kafka.make_request('homeaway_post_message', 'homeaway_post_message_response' ,{...req.body}, function(error,result){
            console.log('In homeaway_post_message');
            console.log(result);
            if (error){
                console.log("Inside Post Message Kafka Response Error", error);
                response['success'] = false ;
                response['message'] = 'Internal Server Error';
                res.status(500).send(response);
            }
            else{
                console.log("Inside Post Message Kafka Response");
                console.log(result);
                response['success'] = true;
                response['conversations']= result;
                response['message'] = "Message Posted successfully";
                res.status(200).send(response);
            }
        });
    }
});

module.exports = router;