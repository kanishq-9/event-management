async function createEvent(req,res) {
    try{
        const [] = req.body;
    }catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}

module.exports={createEvent}