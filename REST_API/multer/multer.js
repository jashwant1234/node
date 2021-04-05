const path = require('path');
const multer  = require('multer');
var storage = multer.diskStorage(
  {
      destination: path.join(__dirname,'..','images'),
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);
const upload = multer({storage});
module.exports = upload;