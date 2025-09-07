const { eventManager } = require('./schemas/events.schema');
const mongo = require('mongoose');
const {getUserRegisteredByEventId} = require('./registrations.model');

async function createEventDB(title, description, date_time, location, max_capacity, created_by) {
    try {
        if (!title || !description || !date_time || !location || !max_capacity || !created_by) {
            throw new Error('Missing data');
        }
        created_by = new mongo.Types.ObjectId(created_by);
        await eventManager.insertOne({ title, description, date_time, location, max_capacity, created_by });
        return { success: true };

    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

async function getEventDB() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await eventManager.find({ date_time: { $gte: today } });
        return { success: true, data: response };
    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

async function deleteEventById(id) {
    try {
        if (!id) {
            throw new Error('Missing data');
        }
        const _id = new mongo.Types.ObjectId(id);
        await eventManager.delete({ _id });
        return { success: true }

    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

async function getEventById(id) {
    try {
        if (!id) {
            throw new Error('Missing data');
        }
        const _id = new mongo.Types.ObjectId(id);
        let response = await eventManager.findById({ _id });
        response= response.toObject();
        const usersRegistered = await getUserRegisteredByEventId(id);  
        response["total_registered"] = usersRegistered.data.length;
        return { success: true, data: response };
    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

async function updateEventById(
    id,
    title,
    description,
    date_time,
    location,
    max_capacity,
    created_by
) {
    try {
        if (!id || !title || !description || !date_time || !location || !max_capacity || !created_by) {
            res.status(400).json({ success: false, error: 'Missing data' });
        }
        const _id = new mongo.Types.ObjectId(id);
        const createdby = new mongo.Types.ObjectId(created_by);
        const reqData = await getEventById(id);
        if (reqData.success) {
            reqData.data;
            if (title === reqData.data.title && description === reqData.data.description && date_time === reqData.data.date_time && location === reqData.data.location && max_capacity === reqData.data.max_capacity && createdby === reqData.data.created_by) {
                return { success: true, data: reqData.data };
            } else {
                const response = await eventManager.updateOne({ _id }, {
                    $set: {
                        title,
                        description,
                        date_time,
                        location,
                        max_capacity,
                        created_by
                    }
                });
                return {success:true, data:response};
            }
        } else {
            throw new Error('some Error Occurred : Could not fetch data ');
        }
    } catch (err) {
        throw new Error('some Error Occurred : ' + err);
    }
}

module.exports = { createEventDB, getEventDB, deleteEventById, updateEventById, getEventById }