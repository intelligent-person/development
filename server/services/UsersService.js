const User = require("../models/User");
const FileService = require("./FileService");
const { pin } = require("nodemon/lib/version");

class UsersService {
  async create(user /*, picture*/) {
    // const fileName = FileService.saveFile(picture)
    await User.create(user);
  }

  async getAll() {
    const perPage = 20;
    const page = Math.max(0, 1);
    const users = await User.find({})
      .select("name reputation picture status date sub")
      .sort({
        date: "desc",
      })
      .skip((page - 1) * perPage)
      .limit(perPage);
    return users;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const user = await User.findOne({ sub: id });
    return user;
  }

  async update(user) {
    if (!user._id) {
      throw new Error("Не указан ID");
    }
    console.log(user);
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    await User.findByIdAndDelete(id);
    const users = await User.find();
    return users;
  }
}

module.exports = new UsersService();
