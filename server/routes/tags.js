const express = require("express");
const TagController = require("../controllers/TagController");
const router = express.Router();

router.post("/", TagController.create);
// получение отправленных данных
router.get("/:tag", TagController.getTagCount);
router.get("/userTags/:userId", TagController.getUserTags);
router.delete("/:tagId", TagController.update);

module.exports = router;
