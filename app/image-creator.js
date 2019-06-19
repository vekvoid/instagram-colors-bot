const gm = require('gm').subClass({ imageMagick: true });
const randomColor = require('./random-color');
const nameThatColor = require('./utils/ntc');
const imageCreator = {};

let color = '#FFFFFF';

const setProps = (props) => {
  props = props || {};

  if (!props.w)
    props.w = 624;
  if (!props.h)
    props.h = 593;
  if (!props.color)
    // props.color = '#FFFFFF';
    props.color = randomColor();
  if (!props.path)
    props.path = './app/images/';
  if (!props.name)
    props.name = 'tempImage';

  return props;
};

const colorName = (color) => nameThatColor.name(color)[1];

imageCreator.create = (props) => {
  return new Promise(function(resolve, reject) {
    props = setProps(props);

    const imageProps = { ...props };
    imageProps.fullPath = props.path + props.name + '.jpg';
    imageProps.colorName = colorName(props.color) || '';

    gm(props.w, props.h, props.color)
      .write(imageProps.fullPath, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(imageProps);
        }
      });
  });
};

module.exports = imageCreator;
