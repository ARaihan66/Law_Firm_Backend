const express = require("express");
const router = express.Router();
const {
  addContactData,
  getContactData,
  deleteContactData,
} = require("../controllers/ContactController");
const verifyAdmin = require("../utils/VerifyAdmin")


router.route("/add").post(addContactData);
router.route("/get").get(getContactData);
router.route("/client/get").get(getContactData);
router.route("/delete/:id").delete(deleteContactData);

module.exports = router;
