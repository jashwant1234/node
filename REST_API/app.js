const express = require('express');
 
const app = express();

const feedRoutes = require('./routes/feed');
const body_parser = require('body-parser')

app.use(body_parser.json());

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET , PUT , POST , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    next();
});
app.use('/feed',feedRoutes);
app.listen(8080);