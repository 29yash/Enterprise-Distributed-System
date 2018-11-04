var express = require("express");
var router = express.Router();
var kafka = require('../kafka/client');

router.get("/bookingHistory",function(req,res){
    let response = {};
    kafka.make_request('homeaway_booking_history', 'homeaway_booking_history_response' ,{username: req.user.user_email, role:req.user.user_role, ...req.body}, function(error,result){
        console.log('In homeaway_booking_history');
        console.log(result);
        if (error){
            console.log("Inside Booking History Kafka Response Error", error);
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response);
        }
        else{
            console.log("Inside Booking History Kafka Response");
            console.log(result);
            response['success'] = true;
            response ['history'] = result;
            response['message'] = "Booking History fetched successfully";
            res.status(200).send(response);
        }
    });
});
module.exports = router;

            // getConnectionFromPool((err, connection)=>{
            //     if(err){
            //         response['success'] = false ;
            //         response['message'] = 'Internal Server Error';
            //         res.status(500).send(response); 
            //         throw err; 
            //     }
            //     else{
            //         let user_email = req.cookies['HomeawayAuth']['user_email'];
            //         let user_role = req.cookies['HomeawayAuth']['user_role'];
            //         console.log(user_email);
            //         let getBookingsTraveller = 'SELECT * FROM bookings where username =?';
            //         let getBookingsOwner = 'SELECT * FROM bookings where propertyId IN (SELECT propertyId from properties where username =?)';
            //         connection.query(user_role === 'Owner' ? getBookingsOwner : getBookingsTraveller, [user_email], function(err, rows){           
            //             console.log(rows);
            //             if(err){
            //                 response['success'] = false ;
            //                 response['message'] = 'Internal Server Error';
            //                 res.status(500).send(response); 
            //                 throw err; 
            //             }
            //             else {
            //                 if(rows.length > 0){
            //                     response['success'] = true;
            //                     response['bookings'] = rows;
            //                     response['message'] = 'Successfully finds booking history';
            //                     res.status(200).send(response); 
            //                 }
            //                 else{
            //                     response['success'] = false ;
            //                     response['bookings'] = [];
            //                     response['message'] = 'No Bookings Made Yet !';
            //                     res.status(200).send(response); 
            //                 }
            //             }
            //         });
            //     }
            //     connection.release();    
            // });