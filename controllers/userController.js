const { validationResult } = require("express-validator");
class userController {
  constructor(userService) {
    this.UserService = userService;
  }
  async createUser(req, res) {
    const user = req.body;
    const { email } = req.body;
    // pasando la validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    try {
      const verify = await this.UserService.checkUser(email);
      if (verify) {
        return res
          .status(400)
          .json({ msg: "Este usuario ya ha sido registrado" });
      }
      const response = await this.UserService.createUser(user);
      return res
        .status(200)
        .json({ msg: `Usuario ${response.name} creado correctamente` });
    } catch (e) {
      return res.status(500).send(`Server error ${e}`);
    }
  }
}
module.exports = userController;
