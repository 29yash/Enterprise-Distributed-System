var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');
var uploadPhoto = require('./uploadImage');

router.post("/postProperty/uploadPhoto", uploadPhoto.single('propertyPicture'), function(req,res){
    let response = {};
    console.log(req.file);
    if(req.file){
        let photoUrl = "http://localhost:8080/photos/" + req.file.filename;
        response['success'] = true;
        response['message'] = "Image uploaded successfully";
        response['url'] = photoUrl;
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
    getConnectionFromPool((err, connection)=>{
        if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
        }
        else{
            let username = req.cookies['HomeawayAuth']['user_email'];
            let insertProperty = 'INSERT INTO properties VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            let blockDateQuery = 'INSERT INTO propertyblockdates(propertyId, startDate, endDate) VALUES (?,?,?)';
            let insertQueryValues = [null, username, req.body.street, req.body.unit, req.body.city, 
                req.body.state, req.body.zip, req.body.country, req.body.headline, req.body.description,
                req.body.type, req.body.bedrooms, req.body.bathroom, req.body.guests, req.body.bookingOption, 
                req.body.singleNightRate, req.body.minStay, JSON.stringify(req.body.propertyPictures)];

            connection.query(insertProperty, insertQueryValues, function(err, result){
                if(err){
                    console.log(err);
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response); 
                }
                else{
                    if(result.affectedRows > 0){
                        connection.query(blockDateQuery, [result.insertId, req.body.startDate, req.body.endDate], function(err, blockDateResult){
                            if(err){
                                console.log(err);
                                response['success'] = false ;
                                response['message'] = 'Internal Server Error';
                                res.status(500).send(response); 
                            }
                            else{
                                if(blockDateResult.affectedRows > 0){
                                    response['success'] = true;
                                    response['propertyID'] = result.insertId;
                                    response['message'] = "Property Posted successfully";
                                    res.status(200).send(response);
                                }
                                else{
                                    response['success'] = false;
                                    response['message'] = "Unable to Block Dates now. Please try again later !";
                                    res.status(200).send(response);
                                }
                            }
                        });
                    }
                    else{
                        response['success'] = false;
                        response['message'] = "Unable to Post Property. Please try again later !";
                        res.status(200).send(response);
                    }
                }
            });
        }
        connection.release();
    });
});
module.exports = router;