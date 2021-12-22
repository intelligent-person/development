const { UserTag } = require("../models/UserTag");

class UserTagsServices {
  async create(userId, tagName) {
    const createdTag = await UserTag.create({
      sub: userId,
      tags: [{ tagName }],
    });
    return createdTag;
  }

  async getUserTags(userId) {
    if (!userId) {
      throw new Error("Не указан id");
    }
    const userTags = await UserTag.findOne({ sub: userId });
    if (userTags === null) return undefined;
    const userTagsCount = userTags.tags.reduce(
      (sum, current) => sum + Number(current.tagCount),
      0
    );
    const sortTags = [
      ...userTags.tags
        .sort((a, b) => {
          if (a.tagCount < b.tagCount) return 1;
          if (a.tagCount === b.tagCount) return 0;
          if (a.tagCount > b.tagCount) return -1;
        })
        .slice(0, 5),
    ];
    return {
      ...userTags._doc,
      tags: sortTags,
      userTagsCount,
    };
  }
  async getUserTag(userId, tagName) {
    if (!tagName) {
      throw new Error("Не указан Tag");
    }
    const currentUserTag = await UserTag.findOne({
      sub: userId,
      "tags.tagName": tagName,
    });

    return currentUserTag;
  }

  async update(userId, tagName) {
    if (!tagName) {
      throw new Error("Не указан Name");
    }
    const existingTag = await this.getUserTag(userId, tagName);
    const prevTags = await this.getUserTags(userId);
    let updatedTag;
    if (existingTag !== null) {
      updatedTag = await UserTag.findOneAndUpdate(
        { sub: userId, "tags.tagName": tagName },
        { $inc: { "tags.$.tagCount": +1 } }
      );
    } else {
      updatedTag = await UserTag.findOneAndUpdate(
        { sub: userId },
        { tags: [...prevTags.tags, { tagName, tagCount: 1 }] },
        {
          new: true,
        }
      );
    }
    return updatedTag;
  }
}

module.exports = new UserTagsServices();
