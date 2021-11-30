const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    sub: String,
    reputation: Number,
    status: String,
    name: String,
    picture: String,
  },
  body: String,
  answerId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.commentSchema = commentSchema;
module.exports.Comment = mongoose.model("Comment", commentSchema);
