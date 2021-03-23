const { validationResult } = require('express-validator');
const Post = require('../models/post');
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    post: [
      {
        _id: "1",
        title: "my name is",
        content: "This is the first post",
        imageUrl: "images/1.jpeg",
        creator: {
          name: "Msximlian",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      message  : 'Validation failed , Entered data is incorrect.',
      errors : errors.array()
    })
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/1.jpeg",
    creator: { name: "jashwant" }
  });
  post.save().then(result => {
     console.log(result);
     res.status(201).json({
      message: "creted sucsfuly",
      post: result
    });

  }).catch(err =>{
    console.log(err);
  })
};
