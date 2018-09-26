var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');


router.use(function (req, res, next) {
    let isBadRequest = false;
    if(!(req.body.propertyId.trim().length > 0)){
        isBadRequest = true;
    }
    else if(!(req.body.startDate.trim().length > 0 && req.body.endDate.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.guests.trim().length > 0)){
        isBadRequest = true;
    }
    else if (!(req.body.amount.trim().length > 0)){
        isBadRequest = true;    
    }

    if (isBadRequest) {
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(400).send(response);
    } else {
        next();
    }
});

router.post("/bookProperty",function(req,res){
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
            let checkBookDatesQuery = 'select * from propertyblockdates where propertyId=? AND ? BETWEEN startDate AND endDate OR ? BETWEEN startDate AND endDate';
            connection.query(checkBookDatesQuery, [req.body.propertyId, req.body.startDate, req.body.endDate],function(err, rows){
                if(err){
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response); 
                    console.log(err);
                }
                else{
                    if(!(rows.length > 0)){
                        let bookingQuery = 'INSERT INTO bookings(propertyId, username, startDate, endDate, guests, amount) VALUES (?,?,?,?,?,?)';
                        let blockDateQuery = 'INSERT INTO propertyblockdates(propertyId, startDate, endDate) VALUES (?,?,?)';
                        let bookingQueryValues = [req.body.propertyId, username, req.body.startDate, req.body,endDate, req.body.guests, req.body.amount];
                        let blockDateQueryValues = [req.body.propertyId, req.body.startDate, req.body,endDate];
                        connection.query(bookingQuery, bookingQueryValues, function(err, result){
                            if(err){
                                response['success'] = false ;
                                response['message'] = 'Internal Server Error';
                                res.status(500).send(response); 
                                console.log(err);
                            }
                            else{
                                if(result.affectedRows > 0){
                                    connection.query(blockDateQuery,blockDateQueryValues, function(err, result){
                                        if(err){
                                            response['success'] = false ;
                                            response['message'] = 'Internal Server Error';
                                            res.status(500).send(response); 
                                            console.log(err);
                                        }
                                        else{
                                            response['success'] = true;
                                            response['bookingID'] = result.insertId;
                                            response['message'] = "Booking successfully";
                                            res.status(200).send(response);
                                        }
                                    });
                                }
                                else{
                                    response['success'] = false;
                                    response['message'] = "Unable to Book now. Please try again later !";
                                    res.status(200).send(response);
                                }
                            }
                        });
                    }
                    else{
                        response['success'] = false;
                        response['message'] = "Property not available for the selected dates";
                        res.status(200).send(response);
                    }
                }
            });
        }
        connection.release();
    });
});

module.exports = router;
