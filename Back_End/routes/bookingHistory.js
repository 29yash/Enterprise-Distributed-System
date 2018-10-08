var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');


router.get("/bookingHistory",function(req,res){
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
            let getBookings = 'SELECT * FROM bookings where username =?';
            connection.query(getBookings, [user_email],  function(err, rows){           
                console.log(rows);
                if(err){
                    response['success'] = false ;
                    response['message'] = 'Internal Server Error';
                    res.status(500).send(response); 
                    throw err; 
                }
                else {
                    if(rows.length > 0){
                        response['success'] = true;
                        response['bookings'] = rows;
                        response['message'] = 'Successfully finds booking history';
                        res.status(200).send(response); 
                    }
                    else{
                        response['success'] = false ;
                        response['bookings'] = [];
                        response['message'] = 'No Bookings Made Yet !';
                        res.status(200).send(response); 
                    }
                }
            });
        }
        connection.release();    
    });
});
module.exports = router;