const express = require("express");
const router = express.Router();
const {
  addCaseHistory,
  getCaseHistory,
  updateCase,
  deleteCase,
} = require("../controllers/CaseController");
const verifyAdmin = require("../utils/VerifyAdmin");

router.route("/add").post(addCaseHistory);
router.route("/get").get(getCaseHistory);
router.route("/client/get").get( getCaseHistory);
router.route("/update/:id").put(updateCase);
router.route("/delete/:id").delete(deleteCase);

module.exports = router;
