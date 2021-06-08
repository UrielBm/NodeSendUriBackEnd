const User = require("../models/userModel");
const bcrypt = require("bcrypt");
class userService {
  createUser(user) {
    const response = bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      const newUser = new User(user);
      return newUser.save();
    });
    return response;
  }
  checkUser(email) {
    const check = User.findOne({ email }).exec();
    return check;
  }
  getUser(id) {
    const response = User.findById(id).exec();
    return response;
  }
  async comparePassword(password, userpassword) {
    const validPassword = await bcrypt.compare(password, userpassword);
    console.log(validPassword);
    return validPassword;
  }
}
module.exports = userService;
