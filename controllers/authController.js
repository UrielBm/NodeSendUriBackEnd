const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
class authController {
  constructor(userService) {
    this.UserService = userService;
  }
  async authUser(req, res, next) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await this.UserService.checkUser(email);
      console.log(user);
      if (!user) {
        res.status(401).json({ msg: "El usuario no existe" });
        return next();
      }
      const passwordVerification = await this.UserService.comparePassword(
        password,
        user.password
      );
      if (passwordVerification) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
          },
          "3sS3cr3t4",
          {
            expiresIn: "2h",
          }
        );
        return res.status(200).json({ token });
      } else {
        res
          .status(401)
          .json({ msg: "credenciales no validas,revise usuario y contraseña" });
        return next();
      }
    } catch (e) {
      res.status(500).json({ msg: `Error en el servidor ${e}` });
    }
  }
  async getUser(req, res) {
    const { id } = req.user;
    try {
      const response = await this.UserService.getUser(id);
      const user = {
        id: response._id,
        name: response.name,
        email: response.email,
      };
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ msg: `Server Error Type: ${e}` });
    }
  }
}
module.exports = authController;
