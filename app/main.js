const fs = require('fs');
const logger = require('./utils/logger');
const { sleep } = require('./utils/misc');
const imageCreator = require('./image-creator');
const instagramService = require('./instagram/instagram.service');

const loginWithRetries = async (maxRetries) => {
  let retries = 0;

  const login = async () => {
    if (retries > maxRetries) {
      throw new Error(`- login max retries (${retries}) reached`);
    }

    try {
      await instagramService.login();
      console.log(`login after ${retries} retries`); //eslint-disable-line
    } catch (error) {
      retries += 1;
      console.log(error.message); //eslint-disable-line
      console.log(`- login retry ${retries}`); //eslint-disable-line

      await sleep(2500 * retries);
      await login();
    }
  };

  return login();
};

const postImage = async (imageFile, imageInfo) => {
  try {
    const result = await instagramService.client.publish.photo({
      file: imageFile,
      caption: `${imageInfo.colorName}\n${imageInfo.color} (noise: ${imageInfo.noise}%)\n#color #colorscheme #picoftheday #instadaily`,
    });

    logger.info(result.status, `https://www.instagram.com/p/${result.media.code}`);
  } catch (error) {
    console.log(error); // eslint-disable-line
    logger.fatal(error.message);
  }
};

const run = async () => {
  await loginWithRetries(15);

  const imageInfo = await imageCreator.create({
    noise: Math.floor(Math.random() * (100 - 0 + 1) + 0),
  });
  console.log(imageInfo); // eslint-disable-line
  const imageFile = fs.readFileSync(imageInfo.fullPath);

  await postImage(imageFile, imageInfo);
};

run();
