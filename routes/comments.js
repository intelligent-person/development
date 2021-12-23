const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.get("/:answerId", CommentController.getAll);
router.get("/id/:commentId", CommentController.getOne);
// получение отправленных данных
router.post("/", CommentController.create);
router.delete("/:answerId", CommentController.delete);

module.exports = router;
