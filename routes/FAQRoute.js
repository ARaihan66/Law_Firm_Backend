const express = require("express");
const router = express.Router();
const {addFAQs,getAllFAQ,updateFAQ,deleteFAQs} = require('../controllers/FAQsController')


router.route("/add")
      .post(addFAQs)
router.route("/get")
      .get(getAllFAQ)
router.route("/update/:id")
      .put(updateFAQ)
router.route("/delete/:id")
      .delete(deleteFAQs)


module.exports = router;