const User = require('../models/user');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

exports.sginup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message : "validation  failed.",
            errors : errors.array()  
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password,12).then( hasPw => {
        const user = new User({
            email : email,
            password : hasPw,
            name : name
        });
        return user.save();
    })
    .then( result => {
        res.status(201)
        .json({
            message : 'User was created',
            userId : result._id
        })
    }).catch( err => {
        return res.status(422).json({
            message : "some issue with saving",
            errors : err
        });
    });
};