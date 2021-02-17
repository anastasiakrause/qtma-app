import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
let tok;

export function login({ email, password }) {
    auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
  }

export function signup({ email, password, displayName }) {
  auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      module.exports.uid = userInfo.user.uid;
      getUserToken(displayName);
      console.log("TOKEN: ", tok);
      writeUserData(userInfo.user.uid, email, displayName, tok);
      userInfo.user.updateProfile({ displayName: displayName.trim() })
        .then(() => { })
    })
}

export function subscribeToAuthChanges(authStateChanged) {
  auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}

export function signout(onSignedOut) {
  auth().signOut()
    .then(() => {
      onSignedOut();
    })
}

function getUserToken(userHand) {
  console.log("passed in user handle: ", userHand);
  const tokenEndpoint = 'https://us-central1-qtmaapptwenty.cloudfunctions.net/userToken';
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({userHandle : userHand})
  };
    fetch(tokenEndpoint, data)
    .then(response => {
      //If the response status code is between 200-299, if so
      if(response.ok) return response.json();

      //if not, throw a error
      throw new Error('Network response was not ok');
    })
    .then((data)=> {
      console.log("in the second then");
      storeUserToken(data.user_id)
    })
    .catch( (error) => {
      console.error(error);
    });
}

function storeUserToken(token) {
  tok = token;
}

const writeUserData = (uid, email, displayName, userToken) => {
    firestore().collection('users')
    .doc(uid)
    .set({
      name: displayName,
      email: email,
      token: userToken
    })
    .then (item => console.log("successfully added user to collection" + item) )
    .catch(err =>
      { console.log(err); }
  );
};
