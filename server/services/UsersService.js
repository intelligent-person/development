const { User } = require("../models/User");

class UsersService {
  async create(user /*, picture*/) {
    // const fileName = FileService.saveFile(picture)
    let newUser = {
      ...user,
      about: "",
      reputation: 1,
      answers: 1,
      questions: 0,
      tags: ["react", "valid", "js"],
      status: "Новичёк",
      topAnswers: [
        {
          answerId: "617911adf60d4f3aee4d67f5",
          votes: 5,
          title: "Ребят, есть проблемка",
          date: "2021-10-27T08:45:33.153+00:00",
        },
      ],
      links: [
        {
          telegram: "https://t.me/intelligent_person",
        },
      ],
    };
    const createdUser = await User.create(newUser);
    return createdUser;
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
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = new UsersService();
