var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');

router.post("/login",function(req,res){
    let response = {};
    console.log(req.body);    
    if(!(req.body.username.trim().length > 0 && req.body.password.trim().length > 0)){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(401).send(response);
    }
    getConnectionFromPool((err, connection)=>{
        if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
        }
        connection.query('select * from users where user_email=? AND user_role=?', [req.body.username, req.body.role],  function(err, rows){
            console.log('Rows :'+ rows);            
          if(err){
            response['success'] = false ;
            response['message'] = 'Internal Server Error';
            res.status(500).send(response); 
            throw err; 
          }
          else {
            console.log(rows);
            if(rows.length > 0){
                if(rows[0].user_password === req.body.password){
                    let cookie = {
                      user_email: req.body.username,
                      user_first_name: rows[0].user_first_name,
                      user_last_name: rows[0].user_last_name
                    };
                    res.cookie('HomeawayAuth', cookie, {maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = rows[0];
                    response['success'] = true;
                    response['message'] = "User Logged in successfully";
                    response['user'] = rows[0];
                    res.status(200).send(response);
                }
                else{
                    response['success'] = false ;
                    response['message'] = "Email and Password does not match";
                    res.status(401).send(response);
                }
            }
            else{
                response['success'] = false ;
                response['message'] = 'Email does not exists!';
                res.writeHead(401,{
                    'Content-Type' : 'application/json'
                });
                res.end(JSON.stringify(response));
            }              
          }
        });
        connection.release();
    });
});

module.exports = router;