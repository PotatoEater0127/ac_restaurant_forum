const imgur = require("imgur-node-api");

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const IMGUR_CLIENT_ID = config.imgurClientID;

imgur.setClientID(IMGUR_CLIENT_ID);
const uploadAsync = file =>
  new Promise((resolve, reject) => {
    if (!file) {
      console.warn("file for imgur upload doesn't exist");
      resolve(null);
    }
    if (!file.path) {
      console.warn("file path for imgur upload is empty");
      resolve(null);
    }

    imgur.upload(file.path, (err, img) => {
      if (err) {
        reject(err);
      } else {
        resolve(img);
      }
    });
  });

module.exports = { uploadAsync };
