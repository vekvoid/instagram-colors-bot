const fs = require('fs');
const imageCreator = require('./image-creator');
const instagramService = require('./instagram/instagram.service');

(async () => {
	await instagramService.login();

	const imageInfo = await imageCreator.create();
	const imageFile = fs.readFileSync(imageInfo.fullPath);

	instagramService.client.publish.photo({
		file: imageFile,
		caption: `${imageInfo.colorName}\n#color #colorscheme #picoftheday #instadaily`,
	}).then((result) => {
		console.log(result.status, `https://www.instagram.com/p/${result.media.code}`);
	}).catch(error => {
		console.log(error.message)
	});
})();
