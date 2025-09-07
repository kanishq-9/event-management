const {createEventDB, getEventDB, deleteEventById} = require('./../model/events.model');

async function createEventHTML(req,res) {
    try{
        const {title, description, date_time, location, max_capacity, created_by} = req.body;
        if(!title || !description || !date_time || !location || !max_capacity || !created_by){
            res.status(400).json({success: false, error: 'Missing data'});
        }
        res.status(200).json(await createEventDB(
            title, 
            description, 
            date_time, 
            location, 
            max_capacity, 
            created_by
        ));

        
    }catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}


async function getEventsHTML(req, res){
    try{        
        res.status(200).json(await getEventDB());
    }catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}

async function deleteEventHTML(req, res) {
    try{
        const id = req.params.id;        
        if(!id){
            res.status(400).json({success: false, error: 'Missing data'});
        }
        res.status(200).json(await deleteEventById(id));
    }catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}

module.exports={createEventHTML, getEventsHTML, deleteEventHTML}