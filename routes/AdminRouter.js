const express = require("express");
const router = express.Router();
const { adminRegister,adminEmailVerify,adminLogin,adminLogOut,changePassword } = require("../controllers/AdminController");

router.route("/register").post(adminRegister);
router.route("/:id/verify/:token").get(adminEmailVerify);
router.route("/login").post(adminLogin);
router.route("/password-change").post(changePassword);
router.route("/log-out").get(adminLogOut);

module.exports = router; 
