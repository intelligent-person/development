const { User } = require("../models/User");
const path = require("path");
const { uploadFile, getFileStream } = require("../s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

class UsersService {
  async create(user) {
    let newUser = {
      ...user,
      reputation: 1,
      answers: 0,
      questions: 0,
    };
    const createdUser = await User.create(newUser);
    return createdUser;
  }

  async getAll(page, search, sort) {
    const perPage = 20;
    let find = {};
    let sortable = { date: "desc" };
    if (sort === "reputation") sortable = { reputation: "desc" };
    if (search !== "null") {
      find = { name: { $regex: search, $options: "$i" } };
    }
    const usersCount = await User.find(find).count();

    const users = await User.find(find)
      .select("name reputation picture status date sub tags")
      .sort(sortable)
      .skip((page - 1) * perPage)
      .limit(perPage);
    return { users, usersCount };
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const user = await User.findOne({ sub: id });
    const usersTop = await User.find({}).sort({ reputation: -1 });
    const rang = usersTop.findIndex((user) => user.sub === id) + 1;
    return { ...user._doc, rang };
  }

  async update(user) {
    if (!user.sub) {
      throw new Error("Не указан ID");
    }
    const updatedUser = await User.findOneAndUpdate({ sub: user.sub }, user, {
      new: true,
    });
    return updatedUser;
  }

  async getPhoto(fileName) {
    try {
      const readStream = getFileStream(fileName);
      return readStream;
    } catch (err) {
      console.log(err);
    }
  }
  async uploadPhoto(file, userId) {
    try {
      console.log(userId);
      const fileName = userId.replace("|", "-") + ".jpg";
      const filePath = path.resolve("static", fileName);
      const result = await uploadFile(file, fileName, filePath);
      await unlinkFile(filePath);

      return `${process.env.filePath}/api/users/uploadPhoto/${result.Key}`;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const deletedUser = await User.findOneAndDelete({ sub: id });
    return deletedUser;
  }
}

module.exports = new UsersService();
