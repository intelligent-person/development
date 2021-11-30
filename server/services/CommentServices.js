const { Comment } = require("../models/Comment");
const Post = require("../models/Post");

class CommentServices {
  async create(comment) {
    const newComment = await Comment.create(comment);
    return newComment;
  }
  async getAll(answerId) {
    const answerComments = await Comment.find({ answerId });
    return answerComments;
  }
  async delete(commentId) {
    if (!commentId) {
      throw new Error("Не указан ID");
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  }
}

module.exports = new CommentServices();
