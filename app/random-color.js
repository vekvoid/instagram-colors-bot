function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // eslint-disable-line no-bitwise
}

const randomColor = () => {
  const newColor = {};
  let newHexColor = '#FFFFFF';

  newColor.r = getRandomInt(0, 255);
  newColor.g = getRandomInt(0, 255);
  newColor.b = getRandomInt(0, 255);

  newHexColor = rgbToHex(newColor.r, newColor.g, newColor.b);

  return newHexColor;
};

module.exports = randomColor;
