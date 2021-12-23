const express = require("express");
const MessageController = require("../controllers/MessageController");
const router = express.Router();

router.post("/", MessageController.create);
router.put("/", MessageController.updateUserMessages);
// получение отправленных данных
router.get("/:userId", MessageController.getUserMessages);

module.exports = router;
