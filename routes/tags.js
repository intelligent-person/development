const express = require("express");
const TagController = require("../controllers/TagController");
const UserTagsController = require("../controllers/UserTagsController");
const router = express.Router();

router.post("/", TagController.create);
// получение отправленных данных
router.get("/:tag", TagController.getTagCount);
router.delete("/:tagId", TagController.update);

module.exports = router;
