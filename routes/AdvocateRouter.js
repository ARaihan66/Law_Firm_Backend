const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addAdvocate,
  getAdvocateInfo,
  updateAdvocate,
  deleteAdvocate
} = require("../controllers/AdvocateController");
const verifyAdmin = require("../utils/VerifyAdmin");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

// Multer upload
const upload = multer({ storage: storage });

router.route("/add").post(verifyAdmin,upload.single("image"), addAdvocate);
router.route("/get").get(verifyAdmin,getAdvocateInfo);
router.route("/update/:id").put(verifyAdmin,upload.single("image"),updateAdvocate);
router.route("/delete/:id").delete(verifyAdmin,deleteAdvocate);

module.exports = router;
