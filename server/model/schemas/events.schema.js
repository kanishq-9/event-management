const mongo = require('mongoose');

const eventSchema = new mongo.Schema({
    title:{
        type: String,
        required:true
    }, 
    description:{
        type: String,
        required:true
    }, 
    date_time:{
        type: Date,
        required:true
    }, 
    location:{
        type: String,
        required:true
    }, 
    max_capacity:{
        type: Number,
        required:true
    }, 
    created_by:{
        type: mongo.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    }, 
    created_at:{
        type: Date,
        default: Date.now(),
        immutable:true
    }
});
const eventManager = mongo.model("Events",eventSchema);
module.exports = {eventManager};