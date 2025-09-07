const express = require('express');
const routeEventHandler = express.Router();
const {createEventHTML, getEventsHTML, deleteEventHTML, updateEventHTML, getEventHTML} = require('./event.controller');

routeEventHandler.get('/events/:id', getEventHTML);
routeEventHandler.put('/events/:id', updateEventHTML);
routeEventHandler.delete('/events/:id', deleteEventHTML);
routeEventHandler.post('/events', createEventHTML);
routeEventHandler.get('/events', getEventsHTML);

module.exports = {routeEventHandler};