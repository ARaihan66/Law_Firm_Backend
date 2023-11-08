const express = require("express");
const router = express.Router();
const {
  addCaseHistory,
  getCaseHistory,
  updateCase,
  deleteCase,
} = require("../controllers/CaseController");

router.route("/add").post(addCaseHistory);
router.route("/get").get(getCaseHistory);
router.route("/update/:id").put(updateCase);
router.route("/delete/:id").delete(deleteCase);

module.exports = router;
