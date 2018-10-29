var express = require("express");
var router = express.Router();
// var getConnectionFromPool = require('../database');
var uploadPhoto = require('./uploadImage');
var kafka = require('../kafka/client');

router.get("/userProfile/getProfile",function(req,res){
    let response = {};
    kafka.make_request('homeaway_get_user_profile', 'homeaway_get_user_profile_response', {username: req.user.user_email}, function(error,result){
        console.log('In homeaway_get_user_profile');
        console.log(result);
        if (error){
            console.log("Inside Get User Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Get User Kafka Response");
            console.log(result);
            response['success'] = true;
            delete result['user']['user_password'];
            response['user'] = result;
            res.status(200).send(response);
        }
    });
});


router.post("/userProfile/editProfile",function(req,res){
    let response = {};
    console.log(req.body);
    
    if(!(req.body.user_first_name.trim().length > 0 && req.body.user_last_name.trim().length > 0)){
        response['success'] = false ;
        response['message'] = "First and Last Name are Mandatory";
        res.status(400).send(response);
    }
    kafka.make_request('homeaway_edit_user', 'homeaway_edit_user_response' ,{username: req.user.user_email, body: req.body}, function(error,result){
        console.log('In homeaway_edit_user');
        console.log(result);
        if (error){
            console.log("Inside Edit User Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Edit User Kafka Response");
            console.log(result);
            response['success'] = true;
            delete result['user']['user_password'];
            response['user'] = result;
            response['message'] = "User Details Updated successfully";
            res.status(200).send(response);
        }
    });
});


router.post("/userProfile/uploadPhoto", uploadPhoto.single('profilePicture'), function(req,res){
    let response = {};
    console.log(req.file);
    if(req.file){
        getConnectionFromPool((err, connection)=>{
            if(err){
                response['success'] = false ;
                response['message'] = 'Internal Server Error';
                res.status(500).send(response); 
                throw err; 
            }
            else{
                let photoInsertQuery = 'REPLACE INTO user_profile_picture VALUES (?,?)';
                let photoUrl = "http://localhost:8080/photos/" + req.file.filename;
                let username = req.cookies['HomeawayAuth']['user_email'];
                connection.query(photoInsertQuery, [username, photoUrl], function(err, result){
                    if(err){
                        response['success'] = false ;
                        response['message'] = 'Internal Server Error';
                        res.status(500).send(response); 
                        console.log(err);
                    }
                    else{
                        if(result.affectedRows > 0){
                            response['success'] = true;
                            response['message'] = "Image uploaded successfully";
                            response['url'] = photoUrl;
                            res.status(200).send(response);
                        }
                        else{
                            response['success'] = false;
                            response['message'] = "Unable to update your profile !";
                            res.status(200).send(response);
                        }  
                    }
                });
            }
            connection.release();
        });
    }
    else{
        response['success'] = false;
        response['message'] = "File type not supported";
        res.status(200).send(response);
    }
});
module.exports = router;