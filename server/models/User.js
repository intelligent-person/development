const mongoose = require("mongoose");
// const { answerSchema } = require("./Answer");
const Schema = mongoose.Schema;

// const linkSchema = new Schema({
//   telegram: String,
//   github: String,
// });

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  answers: {
    type: Number,
    default: 0,
  },
  questions: {
    type: Number,
    default: 0,
  },
  isOnline: {
    type: String,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
  },
  sub: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.User = mongoose.model("User", userSchema);
module.exports.userSchema = userSchema;
