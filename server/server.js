const http = require('http');
const {app} = require('./app');
const {connectDB} = require('./config/database/mongodb');
require(`dotenv`).config();
const PORT = process.env.PORT;

const server = http.createServer(app);




async function startServer(){

    await connectDB();
    server.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
    
})
}

startServer();