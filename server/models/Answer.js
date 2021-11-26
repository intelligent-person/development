const mongoose = require("mongoose");
// const { commentSchema } = require("./Comment");
const { userSchema } = require("./User");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  user: userSchema,
  postId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  codeLanguage: {
    type: String,
    required: true,
  },
  votes: {
    votesCount: {
      type: Number,
      default: 0,
    },
    users: [
      {
        userId: {
          type: String,
        },
        action: {
          type: String,
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports.answerSchema = answerSchema;
module.exports.Answer = mongoose.model("Answer", answerSchema);
