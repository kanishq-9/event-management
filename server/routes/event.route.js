const express = require('express');
const routeEventHandler = express.Router();
const {createEvent} = require('./event.controller');

// routeEventHandler.get('/events/:id');
// routeEventHandler.put('/events/:id');
// routeEventHandler.delete('/events/:id');
routeEventHandler.post('/events', createEvent);
// routeEventHandler.get('/events');

module.exports = {routeEventHandler};