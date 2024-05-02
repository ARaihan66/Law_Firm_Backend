const express = require("express");
const router = express.Router();

const {
  addRequest,
  getRequest,
  deleteRequest,
} = require("../controllers/RequestController");

router.route("/add").post(addRequest);
router.route("/get").post(getRequest);
router.route("/delete/:id").post(deleteRequest);

module.exports = router;
