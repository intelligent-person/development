const User = require("../models/User");

class AuthService {
  async getAuth(sub) {
    if (!sub) {
      throw new Error("Не указан ID");
    }
    const mainUser = await User.findOne({ sub });
    return mainUser;
  }
}

module.exports = new AuthService();
