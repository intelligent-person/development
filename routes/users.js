const express = require("express");
const UsersController = require("../controllers/UsersController");
const router = express.Router();

router.get("/", UsersController.getAll);
// получение одного пользователя по id
router.get("/:id", UsersController.getOne);
// получение отправленных данных
router.post("/", UsersController.create);
router.get("/uploadPhoto/:id", UsersController.getPhoto);
router.post("/uploadPhoto/:id", UsersController.uploadPhoto);
// удаление пользователя по id
router.delete("/:id", UsersController.delete);
// изменение пользователя
router.put("/", UsersController.update);

module.exports = router;
