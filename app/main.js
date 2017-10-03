const Client = require('instagram-private-api').V1;
const userConfig = require('./userconfig.json');
const device = new Client.Device(userConfig.username);
const storage = new Client.CookieFileStorage(__dirname + '/cookies/' + userConfig.username + '.json');

Client.Session.create(device, storage, userConfig.username, userConfig.password)
  .then(uploadImage(session, './app/images/testcolor.jpg'));

var uploadImage = (session, file) => {
  Client.Upload.photo(session, file)
	  .then(function(upload) {
	    console.log(upload.params.uploadId);
	    return Client.Media.configurePhoto(session, upload.params.uploadId, '#color');
	  })
	  .then(function(medium) {
	    console.log(medium.params);
	  });
};