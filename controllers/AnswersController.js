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
      const answers = await AnswersServices.getAll(
        req.params.postId,
        req.query.page
      );
      res.json(answers);
    } catch (err) {
      res.json(err);
    }
  }
  async getUserTopAnswers(req, res) {
    try {
      const userTopAnswers = await AnswersServices.getUserTopAnswers(
        req.params.userId,
        req.query.page
      );
      res.json(userTopAnswers);
    } catch (err) {
      res.json(err);
    }
  }
  async getOne(req, res) {
    try {
      const answer = await AnswersServices.getOne(req.params.answerId);
      res.json(answer);
    } catch (err) {
      res.json(err);
    }
  }
  async update(req, res) {
    try {
      const updateAnswer = await AnswersServices.update(req.body);
      res.json(updateAnswer);
    } catch (err) {
      res.json(err);
    }
  }

  async delete(req, res) {
    try {
      const answerId = req.params.answerId;
      const postId = req.params.postId;
      const answers = await AnswersServices.delete(answerId, postId);
      res.json(answers);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new AnswersController();
