var {Conversation} = require('../models/conversations');
function postMessage(message, callback){
    console.log("Inside post message kafka backend");
    console.log(message);
    
    let searchQuery = {
        owner: message.owner,
        traveller: message.traveller,
        propertyId: message. propertyId
    };
    Conversation.findOne(searchQuery,(error, result)=>{
        if(error){
            console.log(error);
            callback(error, null);
        }
        else if(result){
            let updateQuery = {
                $push : {
                    messages : {
                        from : message.from, 
                        to : message.to, 
                        message : message.message,
                    }
                }
            }
            Conversation.findOneAndUpdate(searchQuery, updateQuery,(error, conv)=>{
                if(error){
                    console.log(error);
                    callback(error, null);
                }
                else{
                    console.log(conv);
                    callback(null, conv);
                }
             });
        }
        else{
            let newConversation = new Conversation({
                owner: message.owner,
                traveller: message.traveller,
                propertyId: message.propertyId,
                propertyHeadline: message.propertyHeadline,
                messages : [{
                    from : message.from, 
                    to : message.to, 
                    message : message.message
                }]
            });
            newConversation.save().then((conv)=>{
                console.log('Message Posted Successfully !');
                callback(null, conv);
            }, (error)=>{
                console.log(error);
                callback(error, null);
            });
        }
    });
}
exports.handle_request = postMessage;