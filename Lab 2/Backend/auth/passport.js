const passport = require('passport');
const kafka = require('../kafka/client');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../settings/config');

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret_key
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        kafka.make_request('homeaway_login', 'homeaway_login_response' , {username: jwt_payload.user_email, fromPassport: true}, function(error,result){
            console.log('In passport_auth');
            console.log(result);
            if (error){
                console.log("Inside Passport Auth Kafka Response Error", error);
                return callback(error, false);
            }
            else{
                console.log("Inside Passport Auth Kafka Response");
                console.log(result);
                if(result.isAuth && result.user){
                    callback(null, result.user);
                }
                else{
                    callback(null, false);
                }    
            }
        });
    }));
};