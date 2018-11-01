var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_email : {type: String, unique : true, required : true },
    user_first_name: {type: String, required : true },
    user_last_name: {type: String, required : true},
    user_password:{type: String, required : true },
    user_aboutme : {type: String,  default: ''},
    user_gender: {type: String,  default: ''},
    user_phone_number: {type: String,  default: ''},
    user_languages:{type: String,  default: ''},
    user_city: {type: String,  default: ''},
    user_company: {type: String,  default: ''},
    user_school: {type: String,  default: ''},
    user_hometown:{type: String,  default: ''},
    user_role:{type: String, default: null},
    user_pic_url:{type: String, default: null},
});

// UserSchema.plugin(uniqueValidator)

var User = mongoose.model('users', UserSchema);

module.exports = {User};