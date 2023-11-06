const express = require("express");
const router = express.Router();
const {addContactData,getContactData} = require("../controllers/ContactController")

router.route("/add")
      .post(addContactData)
router.route("/get")
      .get(getContactData)

module.exports = router;