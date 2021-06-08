const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const linkController = require("../controllers/linkController");
const fileController = require("../controllers/fileController");
const userService = require("../services/userService");
const linkService = require("../services/linkService");
const IntanceController = new userController(new userService());
const IntanceAuthController = new authController(new userService());
const IntanceLinkController = new linkController(new linkService());
const IntanceFileController = new fileController(new linkService());
const { check } = require("express-validator");
const checkAuth = require("../middleware/Verifyauth");
/*upload y delete files */
router.post("/file/upload", checkAuth, (req, res, next) => {
  IntanceFileController.uploadFile(req, res, next);
});
router.get("/file/download/:file", (req, res, next) => {
  IntanceFileController.downloadFile(req, res, next);
});
/* Create link */
router.get("/links", (req, res, next) => {
  IntanceLinkController.getAllLinks(req, res, next);
});
router.get("/link/:url", (req, res, next) => {
  IntanceLinkController.getPassword(req, res, next),
    IntanceLinkController.getLink(req, res, next);
});
router.post("/verify/:url", (req, res, next) => {
  IntanceLinkController.verifyPassword(req, res, next);
});
router.post(
  "/link",
  [
    check("name", "Sube un archivo").not().isEmpty(),
    check("original_name", "Sube un archivo").not().isEmpty(),
  ],
  checkAuth,
  (req, res, next) => {
    IntanceLinkController.createLink(req, res, next);
  }
);

/*Auth User */
router.post(
  "/auth",
  [
    check("email", "Ingresa un email valido").isEmail(),
    check("password", "El password es necesario").not().isEmpty(),
  ],
  (req, res, next) => {
    IntanceAuthController.authUser(req, res, next);
  }
);

router.get("/auth/user", checkAuth, (req, res) => {
  IntanceAuthController.getUser(req, res);
});

/* Create User */
router.post(
  "/user/createuser",
  [
    check("name", "El nombre es Obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check(
      "password",
      "El password debe de ser de almenos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    IntanceController.createUser(req, res);
  }
);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("werlcome to the backend Uri");
});

module.exports = router;
