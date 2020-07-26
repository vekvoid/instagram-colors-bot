const nearestColor = require('nearest-color');
const namedColors = require('color-name-list');

// nearestColor need objects {name => hex} as input
const colors = namedColors.reduce((acc, { name, hex }) => Object.assign(acc, { [name]: hex }), {});

const nearest = nearestColor.from(colors);

const colorName = (hexColor) => {
  const colorInfo = nearest(hexColor);
  return colorInfo.name;
};

module.exports = {
  from: colorName,
};
