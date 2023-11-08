const express = require("express");
const router = express.Router();
const {addFAQs,getAllFAQs,updateFAQs,deleteFAQs} = require('../controllers/FAQsController')


router.route("/add")
      .post(addFAQs)
router.route("/get")
      .get(getAllFAQs)
router.route("/update/:id")
      .put(updateFAQs)
router.route("/delete/:id")
      .delete(deleteFAQs)


module.exports = router;