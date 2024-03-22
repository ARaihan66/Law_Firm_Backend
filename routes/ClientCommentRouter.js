const express = require("express");
const router = express.Router();
const { createComment,getAllComment,deleteComment } = require("../controllers/ClientCommentController");
const verifyAdmin = require("../utils/VerifyAdmin")

router.route("/add").post(createComment);
router.route("/get").get(verifyAdmin,getAllComment);
router.route("/client/get").get(getAllComment);
router.route("/client/get").get(getAllComment);
router.route("/delete/:id").delete(verifyAdmin,deleteComment);

module.exports = router;
