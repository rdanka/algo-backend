const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config()


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('connected');
})

mongoose.connection.on('error', (error) => {
    console.log(error);
})

const app = express();

const users = require('./routes/users');
const passport = require('passport');

// Cors Middleware
app.use(cors());

// Body Parser MiddleWare
app.use(bodyParser.json());

// Session 
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);

app.use((req, res, next) => {
    res.send('Express working');
});


module.exports = app;


