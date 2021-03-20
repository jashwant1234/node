const express = require('express');

const router = express.Router();

const feedcontroller = require('../controllers/feed')

router.get('/posts',feedcontroller.getPosts);
router.post('/post',feedcontroller.createPosts);
module.exports = router;