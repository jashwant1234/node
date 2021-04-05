const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const feedcontroller = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");
const upload = require("../multer/multer.js");


router.get("/posts", isAuth, feedcontroller.getPosts);
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  upload.single("image"),
  feedcontroller.createPosts
);
router.get("/post/:postId", isAuth, feedcontroller.getPostsById);
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedcontroller.updatePost
);
router.delete("/post/:postId", isAuth, feedcontroller.deletePost);
module.exports = router;
