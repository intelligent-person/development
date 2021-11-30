const express = require("express");
const AnswersController = require("../controllers/AnswersController");
const router = express.Router();

router.get("/:postId", AnswersController.getAll);
// получение отправленных данных
router.post("/", AnswersController.create);
router.put("/", AnswersController.update);
router.delete("/:answerId/:postId", AnswersController.delete);

module.exports = router;
