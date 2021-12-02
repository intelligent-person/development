const { Answer } = require("../models/Answer");
const Post = require("../models/Post");

class AnswersServices {
  async create(answer) {
    const newAnswer = await Answer.create(answer);
    await Post.findByIdAndUpdate(answer.postId, { $inc: { answersCount: +1 } });
    return newAnswer;
  }
  async getAll(postId, page) {
    const postAnswers = await Answer.find({ postId })
      .skip((page - 1) * 10)
      .limit(10);
    return postAnswers;
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
    return { postId: postId, deletedAnswer };
  }
}

module.exports = new AnswersServices();
