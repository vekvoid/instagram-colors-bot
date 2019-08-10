const fs = require('fs');
const config = require('../config');

const saveSession = (cookies, state) => {
  const session = sessionObject(cookies, state);

  return fs.writeFileSync(config.sessionPath, JSON.stringify(session));
};

const sessionObject = (cookies, state) => {
  return {
    cookies: JSON.stringify(cookies),
    state,
  };
}

const getSession = () => {
  //let session;
  try {
    const sesion = fs.readFileSync(config.sessionPath).toString();
    return JSON.parse(sesion);
  } catch {}

  return;
};

module.exports = {
  saveSession,
  getSession
}
