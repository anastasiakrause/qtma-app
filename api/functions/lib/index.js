"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const stream = require("getstream");
const apiKey = functions.config().stream.key;
const appId = functions.config().stream.id;
const appSecret = functions.config().stream.secret;
if (!apiKey || !appId || !appSecret) {
    console.error('Environemnt vars should be set');
}
const client = stream.connect(apiKey, appSecret, appId);
//const firstuser = client.feed('user', module.exports.uid); // later: make '1' the UID generated on sign up
exports.createToken = functions.https.onCall((data, context) => {
    const id = client.createUserToken(module.exports.uid);
    return id;
});
//# sourceMappingURL=index.js.map