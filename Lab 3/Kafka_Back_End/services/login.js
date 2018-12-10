var {User} = require('../models/user');
var becrypt = require('../beCrypt');
function login (message, callback) {
    console.log("Inside login kafka backend");
    console.log(message);
    User.findOne({user_email:message.username},(error, user)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else if (user){
            if(message.fromPassport){
                callback(null, {isAuth: true, user});
            }
            else{
                becrypt.compareHash(message.password, user.user_password, function (err, isMatch) {
                    if (isMatch && !err) {
                        callback(null, {isAuth: true, user});
                    }
                    else{
                        callback(null, {isAuth: false, user});
                    }
                    },function (err) {
                        console.log(error);
                        callback(error, null);
                    }
                );
            }
        }
        else{
            callback(null, {isAuth: false, user:null});
        }
    });
}

exports.handle_request = login;