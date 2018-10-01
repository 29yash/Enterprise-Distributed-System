var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');
var uploadPhoto = require('./uploadImage');

router.get("/userProfile/getProfile",function(req,res){
    let response = {};
    getConnectionFromPool((err, connection)=>{
        if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
        }
        else{
            let user_email = req.cookies['HomeawayAuth']['user_email'];
            console.log(user_email);          
            let leftJoin = 'SELECT * FROM users LEFT JOIN user_profile_picture ON users.user_email = user_profile_picture.username AND users.user_email = ?';  
            connection.query(leftJoin, [user_email],  function(err, rows){
                console.log('Rows :'+ rows);            
                if(err){
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response); 
                    throw err; 
                }
                else {
                    if(rows.length > 0){
                        response['success'] = true ;
                        response['user'] = rows[0];
                        delete response['user']['user_password'];
                        res.status(200).send(response); 
                    }
                    else{
                        response['success'] = false ;
                        response['message'] = "User doesn't exist";
                        res.status(200).send(response); 
                    }
                }
            });
        }
        connection.release();
    });
});


router.post("/userProfile/editProfile",function(req,res){
    let response = {};
    if(!(req.body.user_first_name.trim().length > 0 && req.body.user_last_name.trim().length > 0)){
        response['success'] = false ;
        response['message'] = "First and Last Name are Mandatory";
        res.status(400).send(response);
    }
    getConnectionFromPool((err, connection)=>{
        if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
        }
        else{
            let user_email = req.cookies['HomeawayAuth']['user_email'];
            let updateQuery = "UPDATE users SET user_first_name=?, user_last_name=?, user_aboutme=?, user_city=?, user_company=?, user_hometown=?, user_languages=?, user_school=? WHERE user_email=?";
            connection.query(updateQuery,[req.body.user_first_name, req.body.user_last_name, req.body.user_aboutme, req.body.user_city, 
                req.body.user_company, req.body.user_hometown, req.body.user_languages, req.body.user_school, user_email],  function(err, result){
                if(err){
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response); 
                    console.log(err);
                }
                else{
                    if(result.affectedRows > 0){
                        response['success'] = true;
                        response['message'] = "Your profile has been updated.";
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
});


router.post("/userProfile/uploadPhoto", uploadPhoto.single('profilePicture'), function(req,res){
    debugger;
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
        });
    }
    else{
        response['success'] = false;
        response['message'] = "File type not supported";
        res.status(200).send(response);
    }
});
module.exports = router;