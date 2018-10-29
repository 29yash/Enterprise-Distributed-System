var {User} = require('../models/user');
var becrypt = require('../beCrypt');
function signup (message, callback) {
    var newUser;
    console.log("Inside signup kafka backend");
    console.log(message);
    becrypt.createHash(message.password, (hashedPassword)=>{
        newUser = new User({
            user_email : message.email,
            user_first_name: message.firstName,
            user_last_name: message.lastName,
            user_password: hashedPassword,
            user_role: message.role
        });
        newUser.save().then((user)=>{
            console.log('User Registered Successfully !');
            callback(null, user);
        }, (error)=>{
            console.log(error);
            callback(error, null);
        });
    });
}

exports.handle_request = signup;