const { expect } = require('chai');
const colorName = require('../app/color-name');

describe.only('color-name', () => {
  describe('getColorNames', () => {
    it('should return color names', () => {
      const result = colorName.from('#FF00Ac');

      expect(result).to.exist;
      expect(result).to.be.a('string');
    });
  });
});
