const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { userSchema } = require("./User");

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
    type: userSchema,
    required: true,
  },
  tags: [String],
  views: {
    type: Number,
    default: 0,
  },
  answersCount: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
postSchema.index({ title: "text", body: "text" });

module.exports = mongoose.model("Post", postSchema);
