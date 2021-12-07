const express = require("express");
const UsersController = require("../controllers/UsersController");
const router = express.Router();

router.get("/", UsersController.getAll);
// получение одного пользователя по id
router.get("/:id", UsersController.getOne);
// получение отправленных данных
router.post("/", UsersController.create);
// удаление пользователя по id
router.delete("/:id", UsersController.delete);
// изменение пользователя
router.put("/", UsersController.update);

module.exports = router;
