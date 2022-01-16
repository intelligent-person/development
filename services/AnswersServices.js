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
  async votes(answerParams) {
    let updateAnswer;
    const { userId, answerId, answerUserId, action } = answerParams;
    const answer = await Answer.findById(answerId);
    const userAction = answer.votes.find(
      (item) => item && item.userId === userId
    );
    if (answer.votesCount >= 0) {
      let newVotesCount;
      let newAction;
      let stop = false;
      if (action === "liked") {
        if (!userAction || userAction?.action === null) {
          newVotesCount = true;
          newAction = "liked";
        } else if (userAction.action === "disliked") {
          newVotesCount = true;
          newAction = null;
        } else {
          newVotesCount = false;
          newAction = null;
        }
      } else if (action === "disliked") {
        if (
          (!userAction || userAction?.action === null) &&
          answer.votesCount > 0
        ) {
          newVotesCount = false;
          newAction = "disliked";
        } else if (userAction?.action === "liked" && answer.votesCount > 0) {
          newVotesCount = false;
          newAction = null;
        } else if (
          answer.votesCount !== 0 &&
          userAction?.action === "disliked"
        ) {
          newVotesCount = true;
          newAction = null;
        } else stop = true;
      }
      if (!stop) {
        updateAnswer = await Answer.findByIdAndUpdate(
          answerId,
          {
            $inc: { votesCount: newVotesCount ? +1 : -1 },
            votes: [
              ...answer.votes.filter((vote) => vote.userId !== userId),
              { userId, action: newAction },
            ],
          },
          {
            new: true,
          }
        );
        await User.findOneAndUpdate(
          { sub: answerUserId },
          { $inc: { reputation: newVotesCount ? +1 : -1 } },
          {
            new: true,
          }
        );
      }
    }

    return updateAnswer;
  }
  async delete(answerId, postId) {
    if (!answerId) {
      throw new Error("Не указан ID");
    }
    const deletedAnswer = await Answer.findByIdAndDelete(answerId);
    await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { answersCount: -1 },
      },
      {
        new: true,
      }
    );
    await User.findOneAndUpdate(
      { sub: deletedAnswer.userId },
      { $inc: { answers: -1 } },
      {
        new: true,
      }
    );
    await MessageService.delete(answerId);
    return { postId: postId, deletedAnswer };
  }
}

module.exports = new AnswersServices();
