const TagServices = require("../services/TagService");

class TagController {
  async create(req, res) {
    try {
      const tags = req.body.tags;
      console.log(tags);
      let newTags = [];
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].split("").length > 1 && tags[i] !== " ") {
          const checkTag = await TagServices.getTag(tags[i]);
          if (checkTag === null) {
            const newTag = await TagServices.create(tags[i]);
            newTags = [...newTags, newTag];
          } else {
            const updatedTag = await TagServices.update(tags[i]);
            newTags = [...newTags, updatedTag];
          }
        }
      }
      res.json(newTags);
    } catch (err) {
      res.json(err);
    }
  }
  async getTagCount(req, res) {
    try {
      const tag = await TagServices.getTagCount(req.params.tag);
      res.json(tag);
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
