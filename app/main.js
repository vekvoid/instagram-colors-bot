const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const imageCreator = require('./image-creator');
const config = require('./config');

const ig = new IgApiClient();
ig.state.generateDevice(config.igUsername);

(async () => {
	await ig.simulate.preLoginFlow();
	await ig.account.login(config.igUsername, config.igPassword);
	await ig.simulate.postLoginFlow().catch(error => console.log(error.message,'postloginflow'));

	const imageInfo = await imageCreator.create();
	const imageFile = fs.readFileSync(imageInfo.fullPath);

	ig.publish.photo({
		file: imageFile,
		caption: `${imageInfo.colorName}\n#color #colorscheme #picoftheday #instadaily`,
	}).then((result) => {
		console.log(result.status, `https://www.instagram.com/p/${result.media.code}`);
	}).catch(error => {
		console.log(error.message)
	});
})();
