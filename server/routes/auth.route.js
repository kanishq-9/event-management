const express = require('express');
const routeAuthHandler = express.Router();
const {registerAuthUserHTML, getAuthUserHTML}=require('./auth.controller');

routeAuthHandler.post('/login', getAuthUserHTML );
routeAuthHandler.post('/register', registerAuthUserHTML);

module.exports = {routeAuthHandler};