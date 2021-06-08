const multer = require("multer");
const fs = require("fs");
const { nanoid } = require("nanoid");
class fileController {
  constructor(linkService) {
    this.LinkService = linkService;
  }
  async uploadFile(req, res, next) {
    const configMulter = {
      limits: { fileSize: req.user ? 1024 * 1024 * 10 : 2000000 },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __dirname + "/../uploads");
        },
        filename: (req, file, cb) => {
          const extesion = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
          );
          cb(null, `${nanoid(10)}${extesion}`);
        },
      }),
    };
    const uploads = multer(configMulter).single("file");
    uploads(req, res, async (error) => {
      console.log(req.file);
      if (!error) {
        return res.status(200).json({ file: req.file.filename });
      } else {
        return res.status(500).json({ msg: `Server Error TYPE: ${error}` });
      }
    });
  }
  async downloadFile(req, res, next) {
    const { file } = req.params;
    const fileDownload = __dirname + "/../uploads/" + req.params.file;
    res.download(fileDownload);
    try {
      const link = await this.LinkService.getFile(file);
      const { downloads, name } = link;
      if (downloads === 1) {
        console.log("si pasa a para eliminar a descargas");
        // eliminar el archivo
        fs.unlinkSync(__dirname + `/../uploads/${name}`);
        // eliminar el registro de la bd
        await this.LinkService.deleteLink(link);
      } else {
        link.downloads--;
        await this.LinkService.updateLink(link);
      }
    } catch (error) {
      res.status(500).json({ msg: `Server Error type: ${error}` });
    }
  }
  async deleteFile(req, res, next) {
    res.send("desde controller file delete");
  }
}

module.exports = fileController;
