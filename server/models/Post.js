const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isEdited: Boolean,
  body: {
    type: String,
    required: true,
  },
  codeLanguage: String,
  userId: {
    type: String,
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
