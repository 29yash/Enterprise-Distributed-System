var express = require("express");
var router = express.Router();
var uploadPhoto = require('./uploadImage');
var kafka = require('../kafka/client');

async function getUserProfile(req){
    let response = {};
    return await kafka.make_request('homeaway_get_user_profile', 'homeaway_get_user_profile_response', {username: req.user.user_email}, function(error,result){
        console.log('In homeaway_get_user_profile');
        console.log(result);
        if (error){
            console.log("Inside Get User Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            return response;
        }
        else{
            console.log("Inside Get User Kafka Response");
            console.log(result);
            response['success'] = true;
            delete result['user']['user_password'];
            response = { ...response , ...result['user']};
            return response;
        }
    });
};


async function editUserProfile(req, username){
    let response = {};
    console.log(req);
    if(!(req.user_first_name.trim().length > 0 && req.user_last_name.trim().length > 0)){
        response['success'] = false ;
        response['message'] = "First and Last Name are Mandatory";
        return response;
    }
    return await kafka.make_request('homeaway_edit_user', 'homeaway_edit_user_response' ,{username, body: req}, function(error,result){
        console.log('In homeaway_edit_user');
        console.log(result);
        if (error){
            console.log("Inside Edit User Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            return response;
        }
        else{
            console.log("Inside Edit User Kafka Response");
            console.log(result);
            response['success'] = true;
            response['message'] = "User Details Updated successfully";
            return response;
        }
    });
};


router.post("/userProfile/uploadPhoto", uploadPhoto.single('profilePicture'), function(req,res){
    let response = {};
    console.log(req.file);
    if(req.file){
        let photoUrl = "http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080/photos/" + req.file.filename;
        kafka.make_request('homeaway_edit_user', 'homeaway_edit_user_response' ,{username: req.user.user_email, photoUrl, isPictureUpload:true}, function(error,result){
            console.log('In homeaway_edit_user');
            console.log(result);
            if (error){
                console.log("Inside Upload User Profile Photo Kafka Response Error", error);
                response['success'] = false ;
                response['message'] = 'Internal Server Error';
                res.status(500).send(response);
            }
            else{
                console.log("Inside Upload User Profile Photo Kafka Response");
                console.log(result);
                response['success'] = true;
                response['user_pic_url'] = photoUrl;
                response['message'] = "User Profile Photo successfully";
                res.status(200).send(response);
            }
        });
    }
    else{
        response['success'] = false;
        response['message'] = "File type not supported";
        res.status(200).send(response);
    }
});
module.exports = {getUserProfile, editUserProfile};