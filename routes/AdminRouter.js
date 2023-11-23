const express = require("express");
const router = express.Router();
const {
  adminRegister,
  adminEmailVerify,
  adminLogin,
  adminForgotPassword,
  adminResetPassword,
  changePassword,
  adminLogOut,
} = require("../controllers/AdminController");
const verifyAdmin = require("../utils/VerifyAdmin");

router.route("/register").post(adminRegister);
router.route("/:id/verify/:token").get(adminEmailVerify);
router.route("/login").post(adminLogin);
router.route("/password-change").post(verifyAdmin, changePassword);
router.route("/password-forgot").post(adminForgotPassword);
router.route("/:id/reset/:token").post(adminResetPassword);
router.route("/log-out").get(verifyAdmin, adminLogOut);

module.exports = router;
