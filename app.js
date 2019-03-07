require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');

// set routes
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/img', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
    }
    next();
});

// use routers
app.use('/', indexRouter);

// catch 404 error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});

// handle errors
app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(error.status || 500);
    res.json({message: error.message});
});

module.exports = app;
