const MessageService = require("../services/MessageService");

class MessageController {
  async create(req, res) {
    try {
      const { mainUser, userId, type, messageId } = req.body;
      const newMessage = await MessageService.create(
        mainUser,
        userId,
        type,
        messageId
      );
      res.json(newMessage);
    } catch (err) {
      res.json(err);
    }
  }

  async getUserMessages(req, res) {
    try {
      const userMessages = await MessageService.getUserMessages(
        req.params.userId
      );
      res.json(userMessages);
    } catch (err) {
      res.json(err);
    }
  }
  async updateUserMessages(req, res) {
    try {
      const updateMessages = await MessageService.update(req.body);
      res.json(updateMessages);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new MessageController();
