const express = require('express');
const routeRegistrationHandler = express.Router();
const {createRegistrationHTML, getSingleRegistrationHTML} = require('./registration.controller');

routeRegistrationHandler.post('/events/:id/register', createRegistrationHTML);
// routeRegistrationHandler.delete('/events/:id/register');
routeRegistrationHandler.get('/users/:id/registrations', getSingleRegistrationHTML);

module.exports = {routeRegistrationHandler};