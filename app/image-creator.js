const gm = require('gm');
const randomColor = require('./random-color');
const getColorName = require('./color-name');

const imageCreator = {};

const validatedProps = (props = {}) => {
  const result = { ...props };

  if (!props.width) { result.width = 624; }
  if (!props.height) { result.height = 593; }
  if (!props.color) { result.color = randomColor(); }
  if (!props.noise) { result.noise = 0; }
  if (!props.path) { result.path = './app/images/'; }
  if (!props.name) { result.name = 'tempImage'; }

  return result;
};

const colorName = (color) => getColorName.from(color);

const noisePercentHEXFix = (percent) => {
  const decimalValue = Math.round((percent * 255) / 100);

  if (percent < 7) {
    return `0${decimalValue.toString(16).toUpperCase()}`;
  }
  return decimalValue.toString(16).toUpperCase();
};

imageCreator.create = (props) => new Promise(((resolve, reject) => {
  const imageProps = validatedProps(props);

  imageProps.fullPath = `${imageProps.path + imageProps.name}.jpg`;
  imageProps.colorName = colorName(imageProps.color) || '';

  gm(imageProps.width, imageProps.height, imageProps.color).noise('laplacian').fill(`${imageProps.color}${noisePercentHEXFix(imageProps.noise)}`).drawRectangle(0, 0, imageProps.width, imageProps.height)
    .write(imageProps.fullPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(imageProps);
      }
    });
}));

module.exports = imageCreator;
