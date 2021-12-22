const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTagSchema = new Schema({
  sub: String,
  tags: [
    {
      tagCount: {
        type: Number,
        default: 1,
      },
      tagName: String,
    },
  ],
});

module.exports.userTagSchema = userTagSchema;
module.exports.UserTag = mongoose.model("UserTag", userTagSchema);
