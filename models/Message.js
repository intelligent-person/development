const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  mainUser: String,
  type: String,
  answerUserId: String,
  postUserId: String,
  messageId: String,
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.messageSchema = messageSchema;
module.exports.Message = mongoose.model("Message", messageSchema);
