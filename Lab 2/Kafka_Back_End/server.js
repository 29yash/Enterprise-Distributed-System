var connection =  new require('./kafka/Connection');
var mangoose = require('./database');
var Signup = require('./services/signup.js');
var Login = require('./services/login');
var EditUserProfile = require('./services/editUserProfile');
var GetUserProfile = require('./services/getUserProfile');
var PostProperty = require('./services/postProperty');
var SearchProperty = require('./services/searchProperty');
var BookProperty = require('./services/booking');
var BookingHistory = require('./services/bookingHistory');

function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            console.log('in Handle', err);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res,
                        error : err
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("homeaway_signup",Signup);
handleTopicRequest("homeaway_login",Login);
handleTopicRequest("homeaway_edit_user",EditUserProfile);
handleTopicRequest("homeaway_get_user_profile",GetUserProfile);
handleTopicRequest("homeaway_post_property",PostProperty);
handleTopicRequest("homeaway_search_property",SearchProperty);
handleTopicRequest("homeaway_book_property",BookProperty);
handleTopicRequest("homeaway_booking_history",BookingHistory);