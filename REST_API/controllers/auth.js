const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.sginup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation  failed.",
      errors: errors.array(),
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  bcrypt
    .hash(password, 12)
    .then((hasPw) => {
      const user = new User({
        email: email,
        password: hasPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User was created",
        userId: result._id,
      });
    })
    .catch((err) => {
      return res.status(422).json({
        message: "some issue with saving",
        errors: err,
      });
    });
};

//login an user
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "email not authenticated" });
      }
      loadUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ message: "password is incorect" });
      }

      const token = jwt.sign(
        {
          email: loadUser.email,
          userId: loadUser._id.toString(),
        },
        "jashwant9658531212pradhan",
        { expiresIn: "1h" }
      );
     return res.status(200).json({
         token : token,
         userId : loadUser._id.toString()
     });
      //console.log("login");
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
