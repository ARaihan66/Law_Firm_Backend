const express = require("express");
const router = express.Router();
const {
  addContactData,
  getContactData,
  deleteContactData,
} = require("../controllers/ContactController");
const verifyAdmin = require("../utils/VerifyAdmin")


router.route("/add").post(addContactData);
router.route("/get").get(verifyAdmin,getContactData);
router.route("/delete/:id").delete(verifyAdmin,deleteContactData);

module.exports = router;
