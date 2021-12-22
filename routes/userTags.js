const express = require("express");
const UserTagsController = require("../controllers/UserTagsController");
const router = express.Router();

router.post("/", UserTagsController.create);
// получение отправленных данных
router.get("/:userId", UserTagsController.getUserTags);

module.exports = router;
