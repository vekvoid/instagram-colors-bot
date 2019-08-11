const chai = require('chai');

const { expect } = chai;
const imageCreator = require('../app/image-creator');

describe('imageCreator', () => {
  it('create() should return a string', (done) => {
    imageCreator.create()
      .then((result) => {
        expect(result).to.not.be.undefined;
        expect(result).to.have.property('fullPath');
        expect(result.fullPath).to.not.be.undefined;
        expect(result).to.have.property('colorName');
        expect(result.colorName).to.not.be.undefined;
      }).then(done, done);
  });
});
