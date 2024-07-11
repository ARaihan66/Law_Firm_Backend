const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  adminRegister,
  adminEmailVerify,
  adminLogin,
  adminForgotPassword,
  adminResetPassword,
  changePassword,
  adminLogOut,
  getAdminInfo,
  addAdmin,
  updateAdmin
} = require("../controllers/AdminController");
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

router.route("/register").post(adminRegister);
router.route("/:id/verify/:token").get(adminEmailVerify);
router.route("/login").post(adminLogin);
router.route("/password-change").post(verifyAdmin, changePassword);
router.route("/password-forgot").post(adminForgotPassword);
router.route("/:id/reset/:token").post(adminResetPassword);
router.route("/log-out").get( adminLogOut);
router.route("/get").get(verifyAdmin, getAdminInfo);
router.route("/client/get").get(getAdminInfo);

router.route("/add").put(verifyAdmin,upload.single("imageUrl"), addAdmin);
router.route("/update/:id").put(verifyAdmin,upload.single("imageUrl"),updateAdmin);

module.exports = router;
