var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');

var validateRequest = function (req, res, next) {    
    let isBadRequest = false;
    if(!(req.body.location.trim().length > 0)){
        isBadRequest = true;
    }
    else if(!(req.body.arrivalDate.trim().length > 0 && req.body.departureDate.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.guests.trim().length > 0)){
        isBadRequest = true;
    }    
    if (isBadRequest) {
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(400).send(response);
    } else {
        next();
    }
};

router.post("/searchProperty", validateRequest, function(req,res){
    let response = {};
    getConnectionFromPool((err, connection)=>{
        if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
        }
        else{
            let searchPropertyQuery = "select * from properties WHERE city =? AND guests >= ? AND propertyId NOT IN (select propertyId from propertyblockdates where (CAST(? AS DATE) <= startDate AND startDate <= CAST(? AS DATE)) OR (CAST(? AS DATE) <= endDate AND endDate<= CAST(? AS DATE)) AND propertyId IN (select propertyId from properties where city =? AND guests >= ?))";
            let searchPropertyValues = [req.body.location, req.body.guests, req.body.arrivalDate, req.body.departureDate, req.body.arrivalDate, req.body.departureDate, req.body.location, req.body.guests];
            connection.query(searchPropertyQuery, searchPropertyValues,  function(err, rows){
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
                        response['properties'] = rows;
                        res.status(200).send(response);
                    }
                    else {
                        response['success'] = true ;
                        response['message'] = 'No Properties Available';
                        response['properties'] = [];
                        res.status(200).send(response);
                    }
                }
            });
        }
        connection.release();
    });
});

module.exports = router;