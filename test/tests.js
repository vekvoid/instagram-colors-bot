const chai = require('chai'),
      expect = chai.expect,
      ImageCreator = require('./../app/image-creator');

describe('ImageCreator', () => {
  it('create() should return true', (done) => {
    ImageCreator.create()
    .then( (result) => {
      expect(result).to.be.true;
    }).then(done, done);
  });
  
});