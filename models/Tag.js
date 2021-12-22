const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagName: String,
  tagCount: {
    type: Number,
    default: 1,
  },
});

module.exports.tagSchema = tagSchema;
module.exports.Tag = mongoose.model("Tag", tagSchema);
