const { validationResult } = require("express-validator");
class linkController {
  constructor(linkService) {
    this.LinkService = linkService;
  }
  async createLink(req, res, next) {
    const { original_name, name } = req.body;
    // pasando la validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    try {
      if (req.user) {
        let { password, downloads } = req.body;
        if (password) {
          password = password.toString();
        }
        console.log(password, downloads);
        const user = req.user.id;
        const link = await this.LinkService.createAuthLink(
          name,
          original_name,
          password,
          downloads,
          user
        );
        return res.status(200).json({ msg: link.url });
      }
      const link = await this.LinkService.createlink(original_name, name);
      return res.status(200).json({ msg: link.url });
      next();
    } catch (error) {
      return res.status(500).json({ msg: `Server Error ${error}` });
    }
  }
  //retorna si el enlace tiene password o no
  async getPassword(req, res, next) {
    const { url } = req.params;
    try {
      const link = await this.LinkService.getUrl(url);
      if (!link) {
        return res.status(404).json({
          msg: "el link a expirado o no logramos encontar el archivo",
        });
      }
      if (link.password) {
        return res
          .status(200)
          .json({ password: true, url: link.url, file: link.name });
      }
      next();
    } catch (error) {
      return res.status(500).json({ msg: `Server Error,type : ${error}` });
    }
  }
  async verifyPassword(req, res, next) {
    const { url } = req.params;
    const { password } = req.body;
    try {
      const link = await this.LinkService.getUrl(url);
      const response = await this.LinkService.comparePassword(
        password,
        link.password
      );
      if (response) {
        if (!link) {
          return res.status(404).json({
            msg: "el link a expirado o no logramos encontar el archivo",
          });
        }
        return res.status(200).json({ file: link.name, password: false });
      } else {
        return res.status(401).json({ msg: "Verificar contraseña" });
      }
    } catch (error) {
      return res.status(500).json({ msg: `Server Error type ${error}` });
    }
  }
  async getLink(req, res, next) {
    const { url } = req.params;
    try {
      const link = await this.LinkService.getUrl(url);
      if (!link) {
        return res.status(404).json({
          msg: "el link a expirado o no logramos encontar el archivo",
        });
      }
      return res.status(200).json({ file: link.name, password: false });
    } catch (error) {
      return res.status(500).json({ msg: `Server Error,type : ${error}` });
    }
  }
  async getAllLinks(req, res, next) {
    try {
      const response = await this.LinkService.getAllUrls();
      return res.status(200).json({ links: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: `Server Error,type : ${error}` });
    }
  }
}
module.exports = linkController;
