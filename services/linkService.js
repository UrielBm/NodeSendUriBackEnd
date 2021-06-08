const Link = require("../models/linkModel");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
class linkService {
  createlink(original_name, name) {
    const link = new Link();
    link.url = nanoid(10);
    link.name = name;
    link.original_name = original_name;
    return link.save();
  }
  createAuthLink(name, original_name, password, downloads, user_id) {
    if (password && downloads) {
      const response = bcrypt.hash(password, 10).then((hash) => {
        const link = new Link();
        link.password = hash;
        link.url = nanoid(10);
        link.name = name;
        link.original_name = original_name;
        link.downloads = downloads;
        link.author = user_id;
        console.log(link);
        return link.save();
      });
      return response;
    } else if (password) {
      const response = bcrypt.hash(password, 10).then((hash) => {
        const link = new Link();
        link.password = hash;
        link.url = nanoid(10);
        link.name = name;
        link.original_name = original_name;
        link.author = user_id;
        console.log(link);
        return link.save();
      });
      return response;
    } else if (downloads) {
      const link = new Link();
      link.url = nanoid(10);
      link.name = name;
      link.original_name = original_name;
      link.downloads = downloads;
      link.author = user_id;
      return link.save();
    } else {
      const link = new Link();
      link.url = nanoid(10);
      link.name = name;
      link.original_name = original_name;
      link.author = user_id;
      return link.save();
    }
  }
  getUrl(url) {
    const response = Link.findOne({ url }).exec();
    return response;
  }
  getFile(file) {
    const response = Link.findOne({ name: file }).exec();
    return response;
  }
  updateLink(link) {
    const response = Link.findByIdAndUpdate({ _id: link._id }, link).exec();
    return response;
  }
  deleteLink(link) {
    const response = Link.findByIdAndDelete({ _id: link._id }).exec();
    return response;
  }
  getAllUrls() {
    const response = Link.find().select("url -_id").exec();
    return response;
  }
  async comparePassword(password, frontpassword) {
    const validPassword = await bcrypt.compare(password, frontpassword);
    return validPassword;
  }
}
module.exports = linkService;
