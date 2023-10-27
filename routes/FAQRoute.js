const express = require("express");
const router = express.Router();
const {addFAQs,updateFAQ,deleteFAQs} = require('../controllers/FAQsController')


router.route("/add")
      .get(addFAQs)
router.route("/update")
      .put(updateFAQ)
router.route("/delete")
      .delete(deleteFAQs)


module.exports = router;