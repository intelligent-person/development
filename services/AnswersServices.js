const { Answer } = require("../models/Answer");
const Post = require("../models/Post");
const { User } = require("../models/User");
const MessageService = require("../services/MessageService");

class AnswersServices {
  async create(answer) {
    const newAnswer = await Answer.create(answer);
    await Post.findByIdAndUpdate(answer.postId, { $inc: { answersCount: +1 } });
    await User.findOneAndUpdate(
      { sub: answer.userId },
      { $inc: { answers: +1 } }
    );
    const { userId, postUserId, _id } = newAnswer;
    await MessageService.create("answer", userId, null, postUserId, _id);
    return newAnswer;
  }
  async getAll(postId, page) {
    const postAnswers = await Answer.find({ postId })
      .sort({ votesCount: "desc" })
      .sort({ date: "desc" })
      .skip((page - 1) * 10)
      .limit(10);
    return postAnswers;
  }
  async getUserTopAnswers(userId, page) {
    const userTopAnswers = await Answer.find({ userId })
      .select("title postId date votesCount")
      .sort({ votesCount: "desc" })
      .sort({ date: "desc" })
      .skip((page - 1) * 5)
      .limit(5);
    return userTopAnswers;
  }
  async getOne(answerId) {
    const postAnswer = await Answer.findById(answerId);
    return postAnswer;
  }
  async update(answer) {
    const updateAnswer = await Answer.findByIdAndUpdate(answer._id, answer, {
      new: true,
    });
    return updateAnswer;
  }
  async delete(answerId, postId) {
    if (!answerId) {
      throw new Error("Не указан ID");
    }
    const deletedAnswer = await Answer.findByIdAndDelete(answerId);
    await Post.findByIdAndUpdate(postId, {
      $inc: { answersCount: -1 },
    });
    await MessageService.delete(answerId);
    return { postId: postId, deletedAnswer };
  }
}

module.exports = new AnswersServices();
