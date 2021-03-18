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
        friends: []
    });

    await userClient.feed('timeline').get({
        withReactionCounts: true,
        withOwnReactions: true,
        withRecentReactions: true,
    });
    
    // create user feed on server
    await serverClient.feed('user', userH, id).get();
    // personal timeline feed follows user timeline
    await userClient.feed('timeline').follow('user', userH);
    
    response.status(200);
    response.type('jwt');
    response.setHeader("alg", "RS256");
    response.setHeader("type", "JWT");
    response.send({ "user_id": id });
});

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
            })
        }).catch (err => console.log(err)
    ); 
});

// WRITTEN WITHOUT TESTING
exports.removeFromLoop = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userHandle = incomingData.userHandle;
    const loopCode = incomingData.loopCode;

    // create a following relationship between loop user creator and loop timeline
    //const userFeed = serverClient.feed('user', userH);

    // remove follow relationship
    serverClient.feed('timeline', userHandle).unfollow('loop', loopName);

    // get user information
    const userData = await serverClient.user(userHandle).get();
    let copyData = userData.data;
    copyData.loop_ids
    delete copyData.loop_ids.loopCode;
    serverClient.user(userH).update(newUserData);

    response.send(200);
    
});

exports.getLoopFollowers = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const loopName = incomingData.loopName;

    let allFollowers = [];
    const followers = await serverClient.feed('loop', loopName).followers();

    for (const item of followers.results){
        const userName = String(item.feed_id.slice(9));
        const userData = await serverClient.user(userName).get();
        const userImage = userData.data.profileImage;
        const userObj = { userName: userName, userImage : userImage}; 
        allFollowers.push(userObj);
    };

    response.status(200);
    response.setHeader("type","JSON");
    response.send({"followers": allFollowers});
});

exports.addFriend = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userHandle = incomingData.userHandle;
    const userToAdd = incomingData.userToAdd;
    // get avatar of userToAdd
    const friendData = await serverClient.user(userToAdd).get();
    const friendImage = friendData.data.profileImage;
    const friendObj = { userName: userToAdd, userImage : friendImage};  

    // get user data of current user and add their new friend to their friends list
    const userData = await serverClient.user(userHandle).get();
    let copyData = userData
    copyData.data.friends.push(friendObj);
    serverClient.user(userHandle).update(copyData.data);

    response.status(200);
});

exports.getUserFriends = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userHandle = incomingData.userHandle;

    const userData = await serverClient.user(userHandle).get();
    const allFriends = userData.data.friends;

    response.status(200);
    response.setHeader("type","JSON");
    response.send({"allFriends": allFriends});
});

// TODO: remove friend NEEDS TESTING
exports.removeFriend = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userHandle = incomingData.userHandle;
    const removeFriend = incomingData.removeFriend;
    
    // get user data of current user and add their new friend to their friends list
    const userData = await serverClient.user(userHandle).get();
    let copyData = userData.data;

    // filter out name of friend to be deleted from friend's list
    copyData.friends = copyData.friends.filter(function( obj ) {
        return obj.userName !== removeFriend;
    });
    serverClient.user(userHandle).update(copyData);

    response.status(200);
});

exports.addSavedPost = functions.https.onRequest(async (request, response) => {
    const serverClient = stream.connect(apiKey, appSecret, appId);
    const incomingData = request.body;
    const userHandle = incomingData.userHandle;
    const activityData = incomingData.activityData;
    await serverClient.feed('saved', userHandle).addActivity(activityData);
    response.status(200);
})





