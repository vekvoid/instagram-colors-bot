const gm = require('gm');
const randomColor = require('./random-color');
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

imageCreator.create = (props) => {
  return new Promise(function(resolve, reject) {
    props = setProps(props);

    gm(props.w, props.h, props.color)
      .write(props.path + props.name + ".jpg", function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
  });
};

module.exports = imageCreator;