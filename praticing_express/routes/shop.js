const express = require('express');
const path = require('path');
const router = express.Router();
const dirname = require('../util/path');

router.get('/',(req , res , next) => {
    res.sendFile(path.join(dirname,'views','shop.html'))
});




module.exports = router ;