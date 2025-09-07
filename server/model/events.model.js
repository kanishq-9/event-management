const {eventManager} = require('./schemas/events.schema');
const mongo = require('mongoose');

async function createEventDB(title, description, date_time, location, max_capacity, created_by) {
    try{
        if(!title || !description || !date_time || !location || !max_capacity || !created_by){
            throw new Error('Missing data');
        }
        created_by = new mongo.Types.ObjectId(created_by);
        await eventManager.insertOne({title, description, date_time, location, max_capacity, created_by});
        return {success:true};

    }catch(err){
        throw new Error('some Error Occurred : '+err);
    }
}

async function getEventDB() {
    try{        
        const today = new Date().toISOString().split('T')[0];
        const response = await eventManager.find({date_time:{$gte:today}});
        return {success:true, data: response};
    }catch(err){
        throw new Error('some Error Occurred : '+err);
    }
}

async function deleteEventById(id) {
    try{
        if(!id){
            throw new Error('Missing data');
        }
        const _id = new mongo.Types.ObjectId(id);
        await eventManager.deleteOne({_id});
        return {success:true}

    }catch(err){
        throw new Error('some Error Occurred : '+err);
    }
}

module.exports = {createEventDB, getEventDB, deleteEventById}