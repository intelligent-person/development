const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reputation: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
  },
  body: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.commentSchema = commentSchema;
