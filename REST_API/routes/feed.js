const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const feedcontroller = require("../controllers/feed");
const isAuth = require('../middleware/is-auth');

router.get("/posts",isAuth, feedcontroller.getPosts);
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedcontroller.createPosts
);
router.get("/post/:postId",feedcontroller.getPostsById);
router.put("/post/:postId",[
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
],
feedcontroller.updatePost
);
router.delete('/post/:postId',feedcontroller.deletePost);
module.exports = router;
