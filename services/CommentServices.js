const { Comment } = require("../models/Comment");
const MessageService = require("../services/MessageService");

class CommentServices {
  async create(comment) {
    const newComment = await Comment.create(comment);
    const { userId, answerUserId, _id, postUserId } = newComment;
    await MessageService.create(
      "comment",
      userId,
      answerUserId,
      postUserId,
      _id
    );
    return newComment;
  }
  async getAll(answerId, page) {
    const commentsCount = await Comment.find({ answerId }).count();
    const answerComments = await Comment.find({ answerId })
      .sort({ date: "desc" })
      .skip((page - 1) * 3)
      .limit(3);
    return { commentsCount, answerComments };
  }
  async getOne(commentId) {
    const comment = await Comment.findById(commentId);
    return comment;
  }

  async delete(commentId) {
    if (!commentId) {
      throw new Error("Не указан ID");
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    await MessageService.delete(commentId);
    return deletedComment;
  }
}

module.exports = new CommentServices();
