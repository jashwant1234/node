const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
const app = express();
app.use(body_parser.json());

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET , PUT , POST , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    next();
});
app.use('/feed',feedRoutes);
mongoose.connect('mongodb://localhost:27017/feed',{ useNewUrlParser: true }).then( result =>{
    app.listen(8080);
}).catch(err=>{
    console.log(err);
});
