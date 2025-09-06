const mongo = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
try{
    await mongo.connect(process.env.MONGO_DB_URL);
    console.log(`mongoDB connected successfully`);
    
}catch(err){
    console.error(`failed connecting to DB:`,err);
}
}

module.exports={connectDB};