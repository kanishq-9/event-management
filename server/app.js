const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const {routeAuthHandler} = require('./routes/auth.route');
const {routeEventHandler} = require('./routes/event.route');
const {routeRegistrationHandler} = require('./routes/registration.route');

app.use(cors());
app.use(helmet());
app.use(express.json());

//auth
app.use('/api/auth',routeAuthHandler);

//User Registration
app.use('/api',routeRegistrationHandler);

//Event Management 
app.use('/api',routeEventHandler);

app.use(express.static(path.join(__dirname, "public")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = {app};