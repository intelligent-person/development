const { Tag } = require("../models/Tag");

class TagService {
  async create(tagName) {
    const createdTag = await Tag.create({
      tagName,
    });
    return createdTag;
  }

  async getTag(tagName) {
    if (!tagName) {
      throw new Error("Не указан Tag");
    }
    const currentTag = await Tag.findOne({ tagName });
    return currentTag;
  }
  async getTagCount(tagName) {
    if (!tagName) {
      throw new Error("Не указан Tag");
    }
    const currentTag = await Tag.findOne({ tagName });
    return currentTag.tagCount;
  }

  async update(tagName) {
    if (!tagName) {
      throw new Error("Не указан Name");
    }
    const updatedTag = await Tag.findOneAndUpdate(
      { tagName },
      { $inc: { tagCount: +1 } }
    );
    return updatedTag;
  }
}

module.exports = new TagService();
