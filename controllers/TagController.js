const TagServices = require("../services/TagService");

class TagController {
  async create(req, res) {
    try {
      const tags = await TagServices.create(req.body);
      res.json(tags);
    } catch (err) {
      res.json(err);
    }
  }
  async getTagCount(req, res) {
    try {
      const tagCount = await TagServices.getTagCount(req.params.tag);
      res.json(tagCount);
    } catch (err) {
      res.json(err);
    }
  }

  async getUserTags(req, res) {
    try {
      const userTags = await TagServices.getUserTags(req.params.userId);
      res.json(userTags);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req, res) {
    try {
      const answerId = req.params.answerId;
      const comments = await TagServices.update(answerId);
      res.json(comments);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new TagController();
