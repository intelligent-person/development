const AnswersServices = require("../services/AnswersServices");

class AnswersController {
  async create(req, res) {
    try {
      const answers = await AnswersServices.create(req.body);
      res.json(answers);
    } catch (err) {
      res.json(err);
    }
  }
  async getAll(req, res) {
    try {
      const answers = await AnswersServices.getAll(req.params.postId);
      res.json(answers);
    } catch (err) {
      res.json(err);
    }
  }
  async update(req, res) {
    try {
      const updateAmswer = await AnswersServices.update(req.body);
      res.json(updateAmswer);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new AnswersController();
