const express = require("express");
const router = express.Router();
const {
  addPracticeArea,
  getPracticeAreaData,
  updatePracticeAreaData,
  deletePracticeAreaData,
} = require("../controllers/PracticeAreaController");
const verifyAdmin = require("../utils/VerifyAdmin");

router.route("/add").post(verifyAdmin, addPracticeArea);
router
  .route("/get")
  //.get(verifyAdmin,getPracticeAreaData)
  .get(getPracticeAreaData);
router.route("/client/get").get(getPracticeAreaData);
router.route("/update/:id").put(verifyAdmin, updatePracticeAreaData);
router.route("/delete/:id").delete(verifyAdmin, deletePracticeAreaData);

module.exports = router;
