const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const repository = require('../app/instagram/igSession.repository');
const config = require('../app/config');

describe('igSession.repository', () => {
  const actualConfig = { ...config };
  const fakeSesionPath = path.resolve(__dirname, '../app/instagram/sessionToTest.json');

  before(() => {
    config.sessionPath = fakeSesionPath;
  });

  after(() => {
    config.sessionPath = actualConfig.sessionPath;
    fs.unlinkSync(fakeSesionPath);
  });

  describe('saveSession()', () => {
    it('should store the session', () => {
      const cookies = '{"key":"value", cookies: []}';

      const state = {
        deviceString: 'device; String',
        deviceId: 'android-id',
        uuid: 'uuid',
        phoneId: 'phoneId',
        adid: 'adid',
        build: 'BUILD',
      };

      repository.saveSession(cookies, state);

      const fileExist = () => fs.readFileSync(fakeSesionPath);

      expect(fileExist()).to.not.throw;
    });
  });

  describe('getSession()', () => {
    it('should get the stored the session', () => {
      const cookies = '{"key":"value", cookies: []}';

      const state = {
        deviceString: 'device; String',
        deviceId: 'android-id',
        uuid: 'uuid',
        phoneId: 'phoneId',
        adid: 'adid',
        build: 'BUILD',
      };

      repository.saveSession(cookies, state);

      const session = repository.getSession();

      expect(session.cookies).to.exist;
      expect(session.state).to.exist;
    });
  });
});
