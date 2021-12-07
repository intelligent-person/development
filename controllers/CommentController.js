const CommentServices = require("../services/CommentServices");

class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentServices.create(req.body);
      res.json(comment);
    } catch (err) {
      res.json(err);
    }
  }
  async getAll(req, res) {
    try {
      const comments = await CommentServices.getAll(
        req.params.answerId,
        req.query.page
      );
      res.json(comments);
    } catch (err) {
      res.json(err);
    }
  }

  async delete(req, res) {
    try {
      const answerId = req.params.answerId;
      const comments = await CommentServices.delete(answerId);
      res.json(comments);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new CommentController();
