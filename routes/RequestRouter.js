const express = require("express");
const router = express.Router();

const {
  addRequest,
  getRequest,
  deleteRequest,
} = require("../controllers/RequestController");

router.route("/add").post(addRequest);
router.route("/get").get(getRequest);
router.route("/delete/:id").delete(deleteRequest);

module.exports = router;
