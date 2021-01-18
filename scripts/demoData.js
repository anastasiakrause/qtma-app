// @flow

import stream from 'getstream';
import faker from 'faker';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;
  const appId = process.env.STREAM_APP_ID;

  const serverClient = stream.connect(apiKey, apiSecret, appId);

  function createUserClient(userId) {
    return stream.connect(apiKey, serverClient.createUserToken(userId), appId);
  }

  const batman = createUserClient('batman');
  const fluff = createUserClient('fluff');
  const league = createUserClient('justiceleague');
  const bowie = createUserClient('davidbowie');

  // users: 'batman', 'fluff', 'justiceleague', 'davidbowie'
  // console.log('STREAM_API_TOKEN=' + batman.userToken);

  await batman.currentUser.getOrCreate({
    name: 'Batman',
    url: 'batsignal.com',
    desc: 'Smart, violent and brutally tough solutions to crime.',
    profileImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg',
    coverImage:
      'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1',
  });

  // how to follow a user
  //await batman.feed('timeline').follow('user', fluff.currentUser);

  const batmanActivitynew = await batman.feed('batmanfeed').addActivity({
    foreign_id: 'batman-5',
    time: '2020-08-13T01:23:47',

    actor: batman.currentUser,
    verb: 'post',
    object: 'too good to be true',

    content:
      'Just beat the joker again. Will he ever give me a real challenge?',
  })

  const batmanActivity2 = await batman.feed('batmanfeed').addActivity({
    foreign_id: 'batman-6',
    time: '2020-08-13T01:23:47',

    actor: batman.currentUser,
    verb: 'post',
    object: 'naannanana',

    content:
      'Just beat the joker again fool',
  })
}