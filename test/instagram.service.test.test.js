const { expect } = require('chai');
const instagramService = require('../app/instagram/instagram.service');

describe('instagram.service', () => {
  describe('login()', () => {
    it('should login', async () => {
      expect(await instagramService.login()).to.not.throw;
    });
  });
});
