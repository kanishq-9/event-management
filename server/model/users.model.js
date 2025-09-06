const {userManager} = require('./schemas/users.schema');

async function storeUserAuth(name=null, email=null, password=null){
    try{
        if(!email || !password || !name){
            throw new Error('Field empty'+ err);
        }
        await userManager.insertOne({name, email, password});
        return {success:true};
    }catch(err){        
        throw new Error('cannot upload data'+ err);
    }
}

async function getUserAuth(email=null, password=null){
    try{
        if(!email || !password){
            throw new Error('Field Empty'+ err);
        }
        const data = await userManager.findOne({email,password});
        return {success:true, data:{email: data.email, name: data.name, id: data._id}};
    }catch(err){

    }
}

module.exports ={
    storeUserAuth,
    getUserAuth
}