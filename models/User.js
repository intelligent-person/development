const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  telegram: String,
  github: String,
  instagram: String,
  facebook: String,
  linkedIn: String,
});
const topAnswerSchema = new Schema({
  answerId: String,
  votes: Number,
  title: String,
  date: String,
});
const topTagsSchema = new Schema({
  tag: String,
  tagCount: Number,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [topTagsSchema],
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
  links: linkSchema,
  topAnswers: [topAnswerSchema],
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
  helpInPostCreate: {
    type: Number,
    default: 1,
  },
});
userSchema.index({ name: "text" });
module.exports.User = mongoose.model("User", userSchema);
module.exports.userSchema = userSchema;
