var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ConversationSchema = new Schema({
    owner: {type: String, required : true },
    traveller: {type: String, required : true },
    propertyHeadline: {type: String, required : true },
    propertyId : {type: String, required : true },
    messages : [{
        from : String, 
        to : String, 
        message : String,
    }]
});
var Conversation = mongoose.model('conversations', ConversationSchema);
module.exports = {Conversation};