const { Comment } = require("../models/Comment");
const Post = require("../models/Post");

class CommentServices {
  async create(comment) {
    const newComment = await Comment.create(comment);
    return newComment;
  }
  async getAll(answerId, page) {
    console.log(page);
    const commentsCount = await Comment.find({ answerId }).count();
    const answerComments = await Comment.find({ answerId })
      .sort({ date: "desc" })
      .skip((page - 1) * 5)
      .limit(5);
    return { commentsCount, answerComments };
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
