import * as functions from 'firebase-functions';
import * as stream from 'getstream';
let apiKey = functions.config().stream_api.key;
let appId = functions.config().stream_app.id;
let appSecret = functions.config().stream.secret;
if (!apiKey || !appId || !appSecret) {
    console.error ('Environemnt vars should be set');
}
const client = stream.connect(apiKey, appSecret, appId);
const firstuser = client.feed('user', '1');
export const userToken = functions.https.onRequest((request, response) => {
    let token = firstuser.token;
    response.send(token);
});