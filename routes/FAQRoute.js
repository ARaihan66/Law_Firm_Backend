const express = require("express");
const router = express.Router();
const {addFAQs,getAllFAQs,updateFAQs,deleteFAQs} = require('../controllers/FAQsController')
const verifyAdmin = require("../utils/VerifyAdmin")


router.route("/add")
      .post(verifyAdmin,addFAQs)
router.route("/get")
      .get(verifyAdmin,getAllFAQs)
router.route("/update/:id")
      .put(verifyAdmin,updateFAQs)
router.route("/delete/:id")
      .delete(verifyAdmin,deleteFAQs)


module.exports = router;