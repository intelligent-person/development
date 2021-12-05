const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: String,
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
  isEdited: Boolean,
  votesCount: {
    type: Number,
    default: 0,
  },
  votes: [
    {
      userId: {
        type: String,
      },
      action: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports.answerSchema = answerSchema;
module.exports.Answer = mongoose.model("Answer", answerSchema);
