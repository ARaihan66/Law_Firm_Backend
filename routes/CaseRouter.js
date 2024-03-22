const express = require("express");
const router = express.Router();
const {
  addCaseHistory,
  getCaseHistory,
  updateCase,
  deleteCase,
} = require("../controllers/CaseController");
const verifyAdmin = require("../utils/VerifyAdmin");

router.route("/add").post(verifyAdmin, addCaseHistory);
router.route("/get").get(verifyAdmin, getCaseHistory);
router.route("/client/get").get( getCaseHistory);
router.route("/update/:id").put(verifyAdmin, updateCase);
router.route("/delete/:id").delete(verifyAdmin, deleteCase);

module.exports = router;
