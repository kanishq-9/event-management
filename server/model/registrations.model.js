const mongo  = require('mongoose');
const {registerManager} = require('./schemas/registrations.schema');
const {getEventById, getUserRegisteredByEventId} = require("./events.helper");

async function getRegistrationByEventDB(user_id, event_id) {
    try{
        if(!user_id || !event_id){
            throw new Error("Missing data");
        }
        user_id = new mongo.Types.ObjectId(user_id);
        event_id = new mongo.Types.ObjectId(event_id);
        const data = await registerManager.findOne({user_id, event_id, status:"confirmed"});
        if(!data){
            return {success:false};
        }
        return {success:true, data}
    }catch(err){
        throw new Error("Some Error Occurred: "+err);
    }
}



async function createRegistrationDB(user_id, event_id) {
    try{
        if(!user_id || !event_id){
            throw new Error("Mission data");
        }        
        const isPresent = await getRegistrationByEventDB(user_id, event_id);        
        const eventData = await getEventById(event_id);
        const userRegisteredForEvent = await getUserRegisteredByEventId(event_id);        
        if(userRegisteredForEvent.success && eventData.success){
            if(userRegisteredForEvent.data.length === eventData.data.max_capacity){
                return {success:false,message:"Max Limit Reached"};
            }
        }
        user_id = new mongo.Types.ObjectId(user_id);
        event_id = new mongo.Types.ObjectId(event_id);
        if(isPresent.success){
            throw new Error('User Already Registered');
        }
        const data = await registerManager.insertOne({user_id, event_id});
        return {success:true, data}
    }catch(err){
        throw new Error("Some Error Occurred: "+err);
    }
}


async function deleteRegistrationDB(user_id, event_id) {
    try{
        if(!user_id || !event_id){
            throw new Error("Mission data");
        }
        user_id = new mongo.Types.ObjectId(user_id);
        event_id = new mongo.Types.ObjectId(event_id);

        await registerManager.deleteOne({user_id, event_id});
        return {success:true}
    }catch(err){
        throw new Error("Some Error Occurred: "+err);
    }
}

async function getSingleRegistrationDB(id) {
    try{
        if(!id){
            throw new Error("Missing data");
        }
        user_id = new mongo.Types.ObjectId(id);
        const data = await registerManager.find({user_id});
        if(!data){
            return {success:false};
        }
        return {success:true, data}
    }catch(err){
        throw new Error("Some Error Occurred: "+err);
    }
}

module.exports = {createRegistrationDB, getSingleRegistrationDB, deleteRegistrationDB }