const express = require("express");
const router = express.Router();
const { createComment,getAllComment,deleteComment } = require("../controllers/ClientCommentController");

router.route("/add").post(createComment);
router.route("/get").get(getAllComment);
router.route("/delete").delete(deleteComment);

module.exports = router;
