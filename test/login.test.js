const {expect} = require('chai');
const { IgApiClient } = require('instagram-private-api');
const config = require('../app/config');

describe('instagram-private-api', () => {
  it('should login', async () => {
    const login = async () => {
      const ig = new IgApiClient();
      ig.state.generateDevice(config.igUsername);
      
      await ig.simulate.preLoginFlow();
      await ig.account.login(config.igUsername, config.igPassword);
      await ig.simulate.postLoginFlow().catch(error => console.log(error.message,'postloginflow'));
      return;
    }

    expect(await login()).to.not.throw;
  });
});
