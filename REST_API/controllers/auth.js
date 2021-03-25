const User = require('../models/user');
const { validationResult } = require("express-validator");


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
    
}