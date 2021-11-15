const AuthService = require("../services/AuthService");

class AuthController {
  async getAuth(req, res) {
    try {
      const user = await AuthService.getAuth(req.params.sub);
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new AuthController();
