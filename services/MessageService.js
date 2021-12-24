const { Message } = require("../models/Message");

class MessageServices {
  async create(type, mainUser, answerUserId, postUserId, messageId) {
    const createdMessage = await Message.create({
      type,
      mainUser,
      answerUserId,
      postUserId,
      messageId,
    });
    return createdMessage;
  }
  async getUserMessages(userId) {
    if (!userId) {
      throw new Error("Не указан Tag");
    }
    const currentUserTag = await Message.find({
      $or: [{ answerUserId: userId }, { postUserId: userId }],
      mainUser: { $ne: userId },
    })

      .sort({ date: "desc" })
      .limit(10);
    return currentUserTag;
  }

  async update(message) {
    if (!message) {
      throw new Error("Не указан ID");
    }
    const deletedComment = await Message.findOneAndUpdate(
      { messageId: message.messageId },
      message
    );
    return deletedComment;
  }

  async delete(messageId) {
    if (!messageId) {
      throw new Error("Не указан ID");
    }
    const deletedComment = await Message.findOneAndDelete(messageId);
    return deletedComment;
  }
}

module.exports = new MessageServices();
