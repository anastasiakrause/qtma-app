import * as functions from 'firebase-functions';
import * as stream from 'getstream';

const apiKey = functions.config().stream.key;
const appId = functions.config().stream.id;
const appSecret = functions.config().stream.secret;

if (!apiKey || !appId || !appSecret ) {
    console.error ('Environemnt vars should be set');
}
const client = stream.connect(apiKey, appSecret, appId);
//const firstuser = client.feed('user', module.exports.uid); // later: make '1' the UID generated on sign up

export const userToken = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    const id = client.createUserToken("thiisID");
    response.status(200);
    response.type('jwt');
    response.setHeader('user_id', id);
    response.setHeader("alg" , "RS256");
    response.setHeader("type", "JWT");
    response.send({"user_id" : id });
});
