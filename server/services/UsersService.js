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
      status: "Новичёк",
      topAnswers: [
        {
          answerId: "617911adf60d4f3aee4d67f5",
          voteCount: 5,
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

  async getAll(page, search, sort) {
    const perPage = 20;
    let find = {};
    let sortable = { date: "desc" };
    if (sort === "reputation") sortable = { reputation: "desc" };
    if (search !== "null") {
      find = { $text: { $search: search } };
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
    return user;
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

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const deletedUser = await User.findOneAndDelete({ sub: id });
    return deletedUser;
  }
}

module.exports = new UsersService();
