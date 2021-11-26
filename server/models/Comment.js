const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { userSchema } = require("./User");

const commentSchema = new Schema({
  user: userSchema,
  body: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.commentSchema = commentSchema;
