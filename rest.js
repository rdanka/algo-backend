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
    console.info('Database connected.');
})

mongoose.connection.on('error', (error) => {
    console.error(error);
})

const app = express();

const users = require('./routes/users');
const results = require('./routes/results');
const quiz = require('./routes/quiz');
const Quiz = require('./models/quiz');
const students = require('./routes/students');

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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/results', results);
app.use('/students', students);
app.use('/quiz', quiz);

Quiz.initialize();


app.use((req, res, next) => {
    res.send('Express working');
});


module.exports = app;