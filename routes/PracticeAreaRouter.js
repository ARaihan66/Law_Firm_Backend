const express = require("express");
const router = express.Router();
const {addPracticeArea,getPracticeAreaData,updatePracticeAreaData,deletePracticeAreaData} = require('../controllers/PracticeAreaController')


router.route("/add")
      .post(addPracticeArea)
router.route("/get")
      .get(getPracticeAreaData)
router.route("/update/:id")
      .put(updatePracticeAreaData)
router.route("/delete/:id")
      .delete(deletePracticeAreaData)


module.exports = router;