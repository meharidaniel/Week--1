const studentRoutes = require('./api/routes/students');
const staffRoutes = require('./api/routes/staffs');
const userRoutes = require('./api/routes/users');
const error = require('./api/middlewares/errorHandler');
const unreachedRoute = require('./api/middlewares/unreachedRoute');
const express = require('express');
const app = express();
const morgan= require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/School-mang-sys',{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('Connected to mongodb...'))
.catch( (error) => console.error(`cant connect bcz of ${error.message}`));



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 
    'Origin, X-Requiested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Mthod', 
        'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({});
    }
    next();
});


app.use('/students', studentRoutes);
app.use('/staffs', staffRoutes);
app.use('/users', userRoutes);
app.use(unreachedRoute);

app.use(error);


module.exports = app;