const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {addAdvocate,getAdvocateInfo} = require("../controllers/AdvocateController");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/'); 
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + path.extname(file.originalname));
    }
  });
  
  // Multer upload
  const upload = multer({ storage: storage });



 router.route("/add")
       .post(upload.single("image"), addAdvocate)
router.route("/get")
       .get(getAdvocateInfo)


module.exports = router