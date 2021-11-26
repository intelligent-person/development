const { Answer } = require("../models/Answer");
const Post = require("../models/Post");

class AnswersServices {
  async create(answer) {
    const newAnswer = await Answer.create(answer);
    const currentPost = await Post.findById(answer.postId);
    await Post.findByIdAndUpdate(
      answer.postId,
      { answersCount: currentPost.answersCount + 1 },
      { new: true }
    );
    return newAnswer;
  }
  async getAll(postId) {
    const postAnswers = await Answer.find({ postId });
    return postAnswers;
  }
  async update(answer) {
    const updateAnswer = await Answer.findByIdAndUpdate(answer._id, answer, {
      new: true,
    });
    return updateAnswer;
  }
}

module.exports = new AnswersServices();
