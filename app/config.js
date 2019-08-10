require('dotenv').config();
const path = require('path');

module.exports = {
  igUsername: process.env.IG_USERNAME,
  igPassword: process.env.IG_PASSWORD,
  sessionPath: path.resolve(__dirname, './instagram/session.json')
};
