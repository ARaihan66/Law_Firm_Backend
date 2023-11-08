const express = require("express");
const router = express.Router();
const {
  addContactData,
  getContactData,
  deleteContactData,
} = require("../controllers/ContactController");

router.route("/add").post(addContactData);
router.route("/get").get(getContactData);
router.route("/delete/:id").delete(deleteContactData);

module.exports = router;
