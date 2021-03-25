const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require('../controllers/auth');
const Router = express.Router();

Router.put("/signup", [
  body("email").isEmail().withMessage("please enter a valid mail")
  .custom((value , {req}) => {
      return User.findOne({email : value}).then( userDoc => {
          if(userDoc){
              return Promise.reject('E-mail address already exists!');
          }
      })
  })
  .normalizeEmail(),
  body('password').trim()
  .isLength({min : 5}),
  body('name')
  .trim()
  .not()
  .isEmpty()  
  
],authController.sginup);

module.exports = Router;
