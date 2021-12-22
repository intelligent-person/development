const UserTagsServices = require("../services/UserTagsService");

class UserTagsController {
  async create(req, res) {
    try {
      const userId = req.body.userId;
      const tags = req.body.tags;
      let newUserTags = [];
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].split("").length > 1 && tags[i] !== " ") {
          const checkUser = await UserTagsServices.getUserTags(userId);
          if (!checkUser) {
            const newUserTag = await UserTagsServices.create(userId, tags[i]);
            newUserTags = [...newUserTags, newUserTag];
          } else {
            const updatedUserTags = await UserTagsServices.update(
              userId,
              tags[i]
            );
            newUserTags = [...newUserTags, updatedUserTags];
          }
        }
      }
      res.json(newUserTags);
    } catch (err) {
      res.json(err);
    }
  }

  async getUserTags(req, res) {
    try {
      const userTags = await UserTagsServices.getUserTags(req.params.userId);
      res.json(userTags);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new UserTagsController();
