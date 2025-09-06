const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    email:{
        type:String,
        required:true,
        match:[/^\S+@\S+\.\S+$/,"Email does not match the required pattern"],
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password: {
    type: String,
    required: true,
    minlength:4
  },
    created_at:{
        type: Date,
        default: Date.now(),
        immutable:true
    }
});
const userManager = mongo.model("Users",userSchema);
module.exports = {userManager};