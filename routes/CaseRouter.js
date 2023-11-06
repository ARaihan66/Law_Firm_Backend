const express = require("express");
const router = express.Router();
const {addCaseHistory,getCaseHistory} = require("../controllers/CaseController");


router.route("/add")
      .post(addCaseHistory)
router.route("/get")
      .get(getCaseHistory)



module.exports = router;