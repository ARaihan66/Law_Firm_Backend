const express = require("express");
const router = express.Router();
const {addPracticeArea,getPracticeAreaData} = require('../controllers/PracticeAreaController')


router.route("/add")
      .post(addPracticeArea)
router.route("/get")
      .get(getPracticeAreaData)
//router.route("/update")
//      .put(updateFAQ)
//router.route("/delete")
//      .delete(deleteFAQs)


module.exports = router;