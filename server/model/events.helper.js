const { eventManager } = require('./schemas/events.schema');
const {registerManager} = require('./schemas/registrations.schema');
const mongo = require('mongoose');
async function getEventById(id) {
    try {
        if (!id) {
            throw new Error('Missing data');
        }
        
        const _id = new mongo.Types.ObjectId(id);
        let response = await eventManager.findOne({ _id });
        if(!response){
            return {success:false, message:"Event not found. Maybe Admin Deleted the event."};
        }      
        response= response.toObject();
        const usersRegistered = await getUserRegisteredByEventId(id); 
        response["total_registered"] = usersRegistered.success ? usersRegistered.data.length : 0;
        return { success: true, data: response };
    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

async function getUserRegisteredByEventId(event_id) {    
    try{
        if(!event_id){
            throw new Error("Missing data");
        }
        event_id = new mongo.Types.ObjectId(event_id);
        const data = await registerManager.find({event_id});        
        if(data.length==0){
            return {success:false};
        }
        return {success:true, data}
    }catch(err){
        throw new Error("Some Error Occurred: "+err);
    }
}
module.exports = {getEventById, getUserRegisteredByEventId};