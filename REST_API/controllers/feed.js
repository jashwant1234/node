const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const Post = require("../models/post");

//fatching all post
exports.getPosts = (req, res, next) => {
  //pagination
  const currentpage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((currentpage - 1) * perPage)
        .limit(perPage);
    })
    .then((posts) => {
      return res.status(200).json({
        message: "Fetch successfully.",
        post: posts,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//creat a new post
exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed , Entered data is incorrect.",
      errors: errors.array(),
    });
  }
  if (!req.file) {
    return res.status(422).json({
      message: "No image provided.",
    });
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "jashwant" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      return res.status(201).json({
        message: "creted successfuly",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Post is not created",
        error: err,
      });
    });
};

//find a post by id
exports.getPostsById = (req, res, next) => {
  const postId = req.params.postId;
  //console.log(postId);
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Could not find a post.",
        });
      }
      return res.status(200).json({
        post: post,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
//update a post
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  let imageUrl = req.body.image;
  const title = req.body.title;
  const content = req.body.content;
  console.log(postId);
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    return res.status(422).json({
      message: "No file picked.",
    });
  }
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Could not find a post.",
        });
      }
      if (post.imageUrl !== imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      return res.status(200).json({
        message: "Post updated!",
        post: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//delete a post
exports.deletePost = (req, res, nex) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      //check logged in user
      if (!post) {
        return res.status(404).json({
          message: "Could not find a post.",
        });
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return res.status(200).json({
        message: "Post deleted!",
        post: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//delete the image from the file
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
