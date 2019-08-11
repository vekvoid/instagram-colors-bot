const chai = require('chai');

const { expect } = chai;
const imageCreator = require('../app/image-creator');

describe('imageCreator', () => {
  it('create() should return a string', async () => {
    const result = await imageCreator.create();

    expect(result).to.not.be.undefined;
    expect(result).to.have.property('fullPath');
    expect(result.fullPath).to.not.be.undefined;
    expect(result).to.have.property('colorName');
    expect(result.colorName).to.not.be.undefined;
  });
});
