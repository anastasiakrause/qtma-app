/* eslint-disable no-undef */

const { connect, StreamApiError } = require('getstream');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;
  const appId = process.env.STREAM_APP_ID;

  console.log(apiKey, appId, apiSecret);
  if (!apiKey || !appId  || !apiSecret) {
    console.error('credential problem');
    return;
  }

  const serverClient = connect(apiKey, apiSecret, appId);

  function createUserClient(userId) {
    return connect(apiKey, serverClient.createUserToken(userId), appId);
  }

  const newuser = createUserClient('newuser');

  console.log('================================================= \n');
  console.log('Add the following line to your .env file');
  console.log('STREAM_API_TOKEN=' + newuser.userToken);
  console.log('\n=================================================');

  await serverClient.user('newuser').getOrCreate({
    name: 'new',
    url: 'neww.com',
    desc: 'hiya',
    profileImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg',
    coverImage:
      'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1',
  });


  const newActivity = await newuser.feed('user').addActivity({
    foreign_id: 'batman-3',
    time: '2020-08-13T01:23:47',

    actor: newuser.currentUser,
    verb: 'post',
    object: '-',

    content:
      'Just beat the joker again. Will he ever give me a real challenge?',
  });

  await newuser.feed('timeline').get({
    withReactionCounts: true,
    withOwnReactions: true,
    withRecentReactions: true,
  });

  async function ignore409(asyncfn) {
    try {
      await asyncfn();
    } catch (e) {
      if (!(e instanceof StreamApiError) || e.response.status !== 409) {
        throw e;
      }
    }
  }
}
main();
