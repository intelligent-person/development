const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: String,
  body: String,
  answerId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.commentSchema = commentSchema;
module.exports.Comment = mongoose.model("Comment", commentSchema);
