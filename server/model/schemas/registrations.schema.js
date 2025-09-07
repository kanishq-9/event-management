const mongo = require('mongoose');

const registrationSchema = new mongo.Schema({

    user_id:{
        type: mongo.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }, 
    event_id:{
        type: mongo.Schema.Types.ObjectId,
        ref:"Events",
        required:true
    }, 
    registration_date:{
        type:Date,
        default: Date.now()
    }, 
    status:{
        type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed"
    }
});
const registerManager = mongo.model("Registrations",registrationSchema);
module.exports = {registerManager};