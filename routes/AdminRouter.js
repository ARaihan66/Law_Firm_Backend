const express = require("express");
const router = express.Router();
const { adminRegister, adminLogin } = require("../controllers/AdminController");

router.route("/register").get(adminRegister);
router.route("/login").post(adminLogin);

module.exports = router;
