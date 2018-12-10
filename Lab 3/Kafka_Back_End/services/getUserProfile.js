var {User} = require('../models/user');
function getUserProfile(message, callback){
    console.log("Inside getUserProfile kafka backend");
    console.log(message);
    User.findOne({user_email:message.username},(error, user)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else{
            callback(null, {user});
        }
    });
}

exports.handle_request = getUserProfile;