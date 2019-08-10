const { IgApiClient, IgCheckpointError  } = require('instagram-private-api');
const Bluebird = require('bluebird');
const config = require('../config');
const repository = require('./igSession.repository');

const ig = new IgApiClient();

const login = async () => {
  // save session and cookies after each request
  ig.request.end$.subscribe(async () => {
    // store session
    const cookies = await ig.state.serializeCookieJar();
    const state = {
      deviceString: ig.state.deviceString,
      deviceId: ig.state.deviceId,
      uuid: ig.state.uuid,
      phoneId: ig.state.phoneId,
      adid: ig.state.adid,
      build: ig.state.build,
    };
    repository.saveSession(cookies, state);
  });

  // restore session
  const session = repository.getSession();
  if (session) {
    await ig.state.deserializeCookieJar(session.cookies);
    ig.state.deviceString = session.state.deviceString;
    ig.state.deviceId = session.state.deviceId;
    ig.state.uuid = session.state.uuid;
    ig.state.phoneId = session.state.phoneId;
    ig.state.adid = session.state.adid;
    ig.state.build = session.state.build;
  }

  try {
    // try to use api without loggin but with session
    const pk = await ig.user.getIdByUsername(config.igUsername);
    await ig.feed.accountFollowers(pk);

  } catch(error) {
    console.info('Error: not a valid session');
    console.info('Trying a clean login...');

    // login
    ig.state.generateDevice(config.igUsername);
    
    await ig.simulate.preLoginFlow();
    await actualIgLoggin();
    await ig.simulate.postLoginFlow().catch(error => console.log(error.message,'postloginflow'));
  }

  return;
};

const actualIgLoggin = async () => {
  return Bluebird.try(async () => await ig.account.login(config.igUsername, config.igPassword)).catch(IgCheckpointError, async () => {
    // TODO
    console.log(1, ig.state.checkpoint); // Checkpoint info here
    await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
    console.log(2, ig.state.checkpoint); // Challenge info here
  });
}

module.exports = {
  client: ig,
  login,
};
