const chai = require('chai'),
      expect = chai.expect,
      ImageCreator = require('./../app/image-creator');

describe('ImageCreator', () => {
  it('create() should return a string', (done) => {
    ImageCreator.create()
    .then( (result) => {
      expect(result).to.not.be.undefined;
      expect(result).to.have.property('fullPath');
      expect(result.fullPath).to.not.be.undefined;
      expect(result).to.have.property('colorName');
      expect(result.colorName).to.not.be.undefined;
    }).then(done, done);
  });
  
});
