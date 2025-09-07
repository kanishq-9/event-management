const express = require('express');
const routeEventHandler = express.Router();
const {createEventHTML, getEventsHTML, deleteEventHTML} = require('./event.controller');

// routeEventHandler.get('/events/:id');
// routeEventHandler.put('/events/:id');
routeEventHandler.delete('/events/:id', deleteEventHTML);
routeEventHandler.post('/events', createEventHTML);
routeEventHandler.get('/events', getEventsHTML);

module.exports = {routeEventHandler};