var {User} = require('../models/user');
function editUserProfile(message, callback){
    console.log("Inside editUserProfile kafka backend");
    console.log(message);
    if(message.isPictureUpload){
        User.update({user_email:message.username},{user_pic_url:message.photoUrl},(error, user)=>{
            if(error){
                console.log(error);
                callback(error, null);
            }
            else{
                callback(null, {isUpdate: true, user});
            }
        });
    }
    else{
        const {user_first_name, user_last_name, user_aboutme, user_city, 
            user_company, user_hometown, user_languages, user_school} = message.body;
        User.update({user_email:message.username}, {user_first_name, user_last_name, user_aboutme, user_city, 
            user_company, user_hometown, user_languages, user_school}, {new: true} ,(error, user)=>{
            if(error){
                console.log(error);
                callback(error, null);
            }
            else{
                callback(null, {isUpdate: true, user});
            }
        });
    }
}

exports.handle_request = editUserProfile;