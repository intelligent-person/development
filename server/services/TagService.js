const { Tag } = require("../models/Tag");

class TagService {
  async create(params) {
    let returnedTag = [];
    for (let i = 0; i < params.tags.length; i++) {
      if (params.tags[i] !== "" && params.tags[i] !== " ") {
        const checkTag = await Tag.findOne({ tagName: params.tags[i] });
        const checkUser = await Tag.findOne({
          tagName: params.tags[i],
          "users.userId": params.userId,
        });
        if (!checkTag) {
          const createdTag = await Tag.create({
            tagName: params.tags[i],
            users: [{ userId: params.userId }],
          });
          returnedTag = [...returnedTag, createdTag];
        } else if (checkUser) {
          const updatedTag = await Tag.findOneAndUpdate(
            {
              tagName: params.tags[i],
              "users.userId": params.userId,
            },
            { $inc: { tagCount: +1, "users.$.count": +1 } }
          );
          returnedTag = [...returnedTag, updatedTag];
        } else if (checkUser === null) {
          const updatedTag = await Tag.findOneAndUpdate(
            {
              tagName: params.tags[i],
            },
            {
              $inc: {
                tagCount: +1,
              },
              users: [
                ...checkTag.users,
                { userId: params.userId, tagCount: 0 },
              ],
            }
          );
          console.log(updatedTag);
          returnedTag = [...returnedTag, updatedTag];
        }
      }
    }
    return returnedTag;
  }

  async getTagCount(tag) {
    if (!tag) {
      throw new Error("Не указан Tag");
    }
    const currentTag = await Tag.findOne({ tagName: tag });
    return currentTag.tagCount;
  }

  async getUserTags(userId, count) {
    console.log(userId);
    if (!userId) {
      throw new Error("Не указан id");
    }
    const userTags = await Tag.find({ "users.userId": userId })
      .sort({
        "users.count": "desc",
      })
      .limit(3);
    return userTags;
  }

  async update(tag) {
    if (!tag._id) {
      throw new Error("Не указан ID");
    }
    const updatedTag = await Tag.findByIdAndUpdate(tag._id, tag, {
      new: true,
    });
    return updatedTag;
  }
}

module.exports = new TagService();
