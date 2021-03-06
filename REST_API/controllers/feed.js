const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");

//fatching all post
exports.getPosts = async (req, res, next) => {
  //pagination
  try {
    const currentpage = req.query.page || 1;
    const perPage = 2;
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentpage - 1) * perPage)
      .limit(perPage);
    return res.status(200).json({
      message: "Fetch successfully.",
      post: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

//then and catch like strutre
// const currentpage = req.query.page || 1;
// const perPage = 2;
// let totalItems;
// Post.find()
//   .countDocuments()
//   .then((count) => {
//     totalItems = count;
//     return Post.find()
//       .skip((currentpage - 1) * perPage)
//       .limit(perPage);
//   })
//   .then((posts) => {
//     return res.status(200).json({
//       message: "Fetch successfully.",
//       post: posts,
//       totalItems: totalItems,
//     });
//   })
//   .catch((err) => {
//     return res.status(500).json({
//       error: err,
//     });
//   });

//creat a new post
exports.createPosts = (req, res, next) => {
  // console.log("i am here");
  // console.log(req.userId);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     message: "Validation failed , Entered data is incorrect.",
  //     errors: errors.array(),
  //   });
  // }
  if (!req.file) {
    return res.status(422).json({
      message: "No image provided.",
    });
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });
  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.post.push(post);
      // console.log(result);
      return user.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "creted successfuly",
        post: post,
        creator: creator,
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
exports.updatePost = async (req, res, next) => {
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
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Could not find a post.",
      });
    }
    if (post.creator.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized!",
      });
    }
    if (post.imageUrl !== imageUrl) {
      clearImage(post.imageUrl);
    }
    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;
    const save = await post.save();
    return res.status(200).json({
      message: "Post updated!",
      post: save,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
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
      if (post.creator.toString() !== req.userId) {
        return res.status(403).json({
          message: "Not authorized!",
        });
      }

      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
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
