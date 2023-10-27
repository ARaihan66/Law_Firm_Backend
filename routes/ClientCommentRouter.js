const express = require("express");
const router = express.Router();
const { createComment } = require("../controllers/ClientCommentController");

router.route("/create").post(createComment);

module.exports = router;
