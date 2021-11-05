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
const answerSchema = new Schema({
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
    picture: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  body: {
    type: String,
  },
  codeLanguage: String,
  votes: {
    type: Number,
  },
  comments: [commentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  codeLanguage: String,
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
    picture: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  tags: [String],
  views: {
    type: Number,
  },
  answers: [answerSchema],
  answersCount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
postSchema.index({ title: "text", body: "text" });

module.exports = mongoose.model("Post", postSchema);
