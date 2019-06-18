const chai = require('chai'),
      expect = chai.expect,
      ImageCreator = require('./../app/image-creator');

describe('ImageCreator', () => {
  it('create() should return a string', (done) => {
    ImageCreator.create()
    .then( (result) => {
      expect(result).to.be.string;
    }).then(done, done);
  });
  
});
