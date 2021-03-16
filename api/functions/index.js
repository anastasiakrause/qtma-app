const functions = require('firebase-functions');
const stream = require("getstream");
const apiKey = functions.config().stream.key;
const appId = functions.config().stream.id;
const appSecret = functions.config().stream.secret;
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

if (!apiKey || !appId || !appSecret) {
    console.error('Environemnt vars should be set');
}
exports.userToken = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    function createUserClient(ID) {
        return stream.connect(apiKey, serverClient.createUserToken(ID), appId);
    }

    if (serverClient == null){
        console.error('server client not established');
        res.end();
    }
    
    const handle = request.body;
    const userH = handle.userHandle;
    console.log(userH);
    if (userH == null){
        console.error('user data not received');
        res.end();
    }

    const userClient = createUserClient(userH);
    const id = userClient.userToken;
    await serverClient.user(userH).getOrCreate({
        name: userH,
        profileImage: 'https://bit.ly/3bh6wgq',
        loop_data: {},
    });
    await userClient.feed('timeline').get({
        withReactionCounts: true,
        withOwnReactions: true,
        withRecentReactions: true,
    });
    const userFeed = serverClient.feed('user', userH, id);
    // personal timeline feed follows user timeline
    await userClient.feed('timeline').follow('user', userH);
    // Add the activity to the feed
    // TODO: format schema for activity
    await userFeed.addActivity({
        actor: 'SU:' + userH,
        tweet: 'Hello world',
        verb: 'post',
        object: "first post!",
    });
    response.status(200);
    response.type('jwt');
    response.setHeader("alg", "RS256");
    response.setHeader("type", "JWT");
    response.send({ "user_id": id });
});

// TODO: write to firebase {id:name}
exports.createLoop = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userH = incomingData.userHandle;
    const loopN = incomingData.loopName;
    
    serverClient.feed('loop', loopN);

    // create a following relationship between loop user creator and loop timeline
    const userFeed = serverClient.feed('timeline', userH);
    await userFeed.follow('loop', loopN);

    const userData = serverClient.user(userH).get();
    let newUserData = {};
    let nummy;
    userData.then(function (result) {
        newUserData = result.data;
    }).then(function () {
        const newLoopID = (Math.floor(100000 + Math.random() * 900000));
        nummy = newLoopID;
        newUserData.loop_ids[newLoopID] = loopN;
    }).then(function () {
        serverClient.user(userH).update(newUserData);
    }).then(function() {
        response.status(200);
        response.setHeader("type", "JSON");
        response.send({"loop_id": nummy, "loop_name": loopN});
    })
});

exports.joinLoop = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const loopCode = incomingData.loopCode;
    const userH = incomingData.userHandle;

    // create a following relationship between loop user creator and loop timeline
    const userFeed = serverClient.feed('user', userH);

    // get user information
    const userData = serverClient.user(userH).get();
    let newUserData = {};
    
    // get name of loop from code
    let loopName;
    const db = admin.firestore();
    const docRef = db.collection('loops').doc(loopCode);
    const getDoc = docRef.get()
        .then(doc => {
            loopName = doc.data().name;
        }).then(() => {
            serverClient.feed('timeline', userH).follow('loop', loopName);
        }).then(() => {
            userData.then(function (result) {
                newUserData = result.data;
            }).then( function () {
                newUserData.loop_ids[loopCode] = loopName;
            }).then(function () {
                serverClient.user(userH).update(newUserData);
            }).then(function() {
                response.status(200);
                response.setHeader("type", "JSON");
                response.send({"status": "success"});
            })
        }).catch (err => console.log(err)
    ); 
});