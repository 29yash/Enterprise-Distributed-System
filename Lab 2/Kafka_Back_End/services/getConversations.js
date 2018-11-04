var {Conversation} = require('../models/conversations');
function getConversations(message, callback){
    console.log("Inside get Conversions kafka backend");
    console.log(message);
    Conversation.find({
        $or : [
            {owner : message.username},
            {traveller : message.username}
        ]
    },(error, conv)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else{
            callback(null, conv);
        }
    });
}

exports.handle_request = getConversations;