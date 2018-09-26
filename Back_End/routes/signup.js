var express = require("express");
var router = express.Router();
var getConnectionFromPool = require('../database');

router.post("/signup",function(req,res){
    let response = {};
    console.log(req.body);    
    if(!(req.body.firstName.trim().length > 0 && req.body.lastName.trim().length > 0 && req.body.email.trim().length > 0 )){
        response['success'] = false ;
        response['message'] = "All fields are Mandatory";
        res.status(200).send(response);
    }
    else if(req.body.password.trim().length < 6) {
        response['success'] = false ;
        response['message'] = "Password must have atleast 6 characters";
        res.status(200).send(response);
    }
    else{
        getConnectionFromPool((err, connection)=>{
            if(err){
                response['success'] = false ;
                response['message'] = 'Internal Server Error';
                res.status(500).send(response); 
                throw err;
            }
            connection.query('INSERT INTO users(user_email,user_first_name, user_last_name, user_password, user_role) VALUES (?,?,?,?,?)',
                [req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.role ],  function(err, result){
                if(err){
                    if(err.code === 'ER_DUP_ENTRY'){
                        response['success'] = false ;
                        response['message'] = 'Email already exist';
                        res.status(200).send(response);
                    }
                    else{
                        response['success'] = false ;
                        response['message'] = 'Internal Server Error';
                        res.status(500).send(response); 
                        console.log(err);
                    }
                }
                else{
                    if(result.affectedRows > 0){
                        response['success'] = true;
                        response['message'] = "User Registered successfully";
                        res.cookie('HomewayAuth', 
                        {user_email: req.body.email, user_first_name: req.body.firstName, 
                            user_last_name: req.body.lastName},
                        {maxAge: 900000, httpOnly: false, path : '/'});
                        res.status(200).send(response);
                    }
                    else{
                        response['success'] = false;
                        response['message'] = "Unable to Register User !";
                        res.status(200).send(response);
                    }
                }
            }); 
            connection.release();   
        });
    }
});

module.exports = router;