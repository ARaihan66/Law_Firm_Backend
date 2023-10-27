const express = require("express");
const router = express.Router();
const {addCaseHistory} = require("../controllers/CaseController");


router.route("/add")
      .post(addCaseHistory)



module.exports = router;