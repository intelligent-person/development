const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

// получение одного пользователя по id
router.get("/:sub", AuthController.getAuth);

module.exports = router;
