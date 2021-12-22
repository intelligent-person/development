const express = require("express");
const PostsController = require("../controllers/PostsController");
const router = express.Router();

router.get("/", PostsController.getAll);
router.get("/:id", PostsController.getOne);
router.get("/userPosts/:userId", PostsController.getLastUserPosts);
router.get("/tagCount/:tag", PostsController.getTagCount);
// получение отправленных данных
router.post("/", PostsController.create);
router.put("/", PostsController.update);
router.put("/setPostView/:id", PostsController.setPostView);
// удаление пользователя по id
router.delete("/:id", PostsController.delete);

module.exports = router;
