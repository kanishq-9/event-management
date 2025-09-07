const { storeUserAuth, getUserAuth } = require('./../model/users.model');

async function registerAuthUserHTML(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: `empty name, password or email` });
        }
        return res.status(200).json(await storeUserAuth(name, email, password));
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }

}

async function getAuthUserHTML(req, res) {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, error: `empty password or email` });
        }
        return res.status(200).json(await getUserAuth(email, password));
    }catch(err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}

module.exports = { registerAuthUserHTML, getAuthUserHTML }