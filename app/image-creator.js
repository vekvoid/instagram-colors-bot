const gm = require('gm').subClass({ imageMagick: true });
const randomColor = require('./random-color');
const nameThatColor = require('./utils/ntc');

const imageCreator = {};

const validatedProps = (props) => {
  const result = props || {};

  if (!props.w) { result.w = 624; }
  if (!props.h) { result.h = 593; }
  if (!props.color) { result.color = randomColor(); }
  if (!props.path) { result.path = './app/images/'; }
  if (!props.name) { result.name = 'tempImage'; }

  return result;
};

const colorName = (color) => nameThatColor.name(color)[1];

imageCreator.create = (props) => new Promise(((resolve, reject) => {
  const imageProps = validatedProps(props);

  imageProps.fullPath = `${props.path + props.name}.jpg`;
  imageProps.colorName = colorName(props.color) || '';

  gm(props.w, props.h, props.color)
    .write(imageProps.fullPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(imageProps);
      }
    });
}));

module.exports = imageCreator;
