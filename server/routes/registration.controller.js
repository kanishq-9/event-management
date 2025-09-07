const {createRegistrationDB, getSingleRegistrationDB} = require('./../model/registrations.model');

async function createRegistrationHTML(req, res){
    try {
        const id = req.params.id;
        const {user_id, event_id} = req.body;        
        if(!id || !user_id || !event_id){
            return res.status(400).json({ success: false, error: 'Missing data' });
        }
        if(id !== event_id){
            return res.status(400).json({ success: false, error: 'Mismatch of event' });
        }
        return res.status(200).json(await createRegistrationDB(user_id, event_id));
    } catch (err) {        
        return res.status(400).json({ success: false, error: err.message });

    }
}

async function getSingleRegistrationHTML(req, res) {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({ success: false, error: 'Missing data' });
        }
        return res.status(200).json(await getSingleRegistrationDB(id));
    } catch (err) {        
        return res.status(400).json({ success: false, error: err.message });

    }
}

module.exports = {createRegistrationHTML, getSingleRegistrationHTML}