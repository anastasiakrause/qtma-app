/* eslint-disable no-undef */
import * as functions from 'firebase-functions';
import * as stream from 'getstream';

const apiKey = functions.config().stream.key;
const appId = functions.config().stream.id;
const appSecret = functions.config().stream.secret;

if (!apiKey || !appId || !appSecret ) {
    console.error ('Environemnt vars should be set');
}

export const userToken = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {

    const serverClient = stream.connect(apiKey, appSecret, appId);

    function createUserClient(ID: string) {
        return stream.connect(apiKey, serverClient.createUserToken(ID), appId);
    }

    const handle: {userHandle : string} = request.body;
    const userH = handle.userHandle; // this is string userHandle
    const userClient = createUserClient(userH);
    const id = userClient.userToken;

    await serverClient.user(userH).getOrCreate({
        name: userH,
        url: 'qtma.ca',
        desc: 'loop sample user!',
        profileImage:
        'https://bit.ly/3bh6wgq',
        coverImage:
        'https://bit.ly/3bh6wgq',
      });
    

    await userClient.feed('timeline').get({
        withReactionCounts: true,
        withOwnReactions: true,
        withRecentReactions: true,
    });

    const userFeed = serverClient.feed('user', userH, id);

    // Add the activity to the feed
    // TODO: format schema for activity
    await userFeed.addActivity({
        actor: 'SU:' + userH,
        tweet: 'Hello world', 
        verb: 'post', 
        object: 1,
    });

    response.status(200);
    response.type('jwt');
    response.setHeader("alg" , "RS256");
    response.setHeader("type", "JWT");
    response.send({"user_id" : id });
});