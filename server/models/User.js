const mongoose = require("mongoose");
const { answerSchema } = require("./Answer");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  telegram: String,
  github: String,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  reputation: {
    type: Number,
    required: true,
  },
  answers: {
    type: Number,
    required: true,
  },
  questions: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
  },
  isOnline: {
    type: String,
    required: true,
  },
  topAnswers: {
    type: [answerSchema],
  },
  links: {
    type: [linkSchema],
  },
  tags: {
    type: [],
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
