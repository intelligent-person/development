const UsersService = require("../services/UsersService");
const { User } = require("../models/User");

class UsersController {
  async create(req, res) {
    try {
      const oldUser = await User.find({ sub: req.body.sub });
      // const admin = await User.find({status: "Админ"})
      if (oldUser[0] === undefined) {
        const savedUser = await UsersService.create(
          req.body /*, req.files.picture*/
        );
        res.json(savedUser);
      }
    } catch (err) {
      res.json({ message: err }, res.sendStatus(400));
    }
  }

  async getAll(req, res) {
    try {
      const users = await UsersService.getAll();
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  }

  async getOne(req, res) {
    try {
      const user = await UsersService.getOne(req.params.id);
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await UsersService.update(req.body);
      return res.json(updatedUser);
    } catch (err) {
      res.json(err);
    }
  }

  async delete(req, res) {
    try {
      const users = await UsersService.delete(req.params.id);
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new UsersController();
