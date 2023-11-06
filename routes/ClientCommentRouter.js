const express = require("express");
const router = express.Router();
const { createComment,getAllComment } = require("../controllers/ClientCommentController");

router.route("/create").post(createComment);
router.route("/get").get(getAllComment);

module.exports = router;
