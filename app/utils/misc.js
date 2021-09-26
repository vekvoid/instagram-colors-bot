const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

module.exports = {
  sleep,
};
