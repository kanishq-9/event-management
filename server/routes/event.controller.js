const { createEventDB, getEventDB, deleteEventById, updateEventById, getEventById } = require('./../model/events.model');

async function createEventHTML(req, res) {
    try {
        const { title, description, date_time, location, max_capacity, created_by } = req.body;
        if (!title || !description || !date_time || !location || !max_capacity || !created_by) {
           return res.status(400).json({ success: false, error: 'Missing data' });
        }
        res.status(200).json(await createEventDB(
            title,
            description,
            date_time,
            location,
            max_capacity,
            created_by
        ));


    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}


async function getEventsHTML(req, res) {
    try {
        return res.status(200).json(await getEventDB());
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}

async function deleteEventHTML(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Missing data' });
        }
        return res.status(200).json(await deleteEventById(id));
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}

async function getEventHTML(req, res) {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({ success: false, error: 'Missing data' });
        }
        return res.status(200).json(await getEventById(id));
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });

    }
}

async function updateEventHTML(req, res) {
    try {
        const id = req.params.id;
        const { title, description, date_time, location, max_capacity, created_by } = req.body;
        if (!id || !title || !description || !date_time || !location || !max_capacity || !created_by) {
            return res.status(400).json({ success: false, error: 'Missing data' });
        }
        res.status(200).json(await updateEventById(
            id,
            title,
            description,
            date_time,
            location,
            max_capacity,
            created_by
        ));
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}

module.exports = { createEventHTML, getEventsHTML, deleteEventHTML, updateEventHTML, getEventHTML }