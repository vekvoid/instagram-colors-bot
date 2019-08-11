const fs = require('fs');
const config = require('../config');

const sessionObject = (cookies, state) => ({
  cookies: JSON.stringify(cookies),
  state,
});

const saveSession = (cookies, state) => {
  const session = sessionObject(cookies, state);

  return fs.writeFileSync(config.sessionPath, JSON.stringify(session));
};

const getSession = () => {
  // let session;
  try {
    const sesion = fs.readFileSync(config.sessionPath).toString();
    return JSON.parse(sesion);
  } catch {
    return undefined;
  }
};

module.exports = {
  saveSession,
  getSession,
};
