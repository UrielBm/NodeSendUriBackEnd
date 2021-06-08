const jwt = require("jsonwebtoken");
const Verifyauth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = jwt.verify(token, "3sS3cr3t4");
      req.user = user;
    } catch (e) {
      return res.status(500).json({ msg: `Server Error type ${e}` });
    }
  }
  return next();
};
module.exports = Verifyauth;
