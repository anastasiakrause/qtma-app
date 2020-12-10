import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function login({ email, password }) {
    auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
  }

export function signup({ email, password, displayName }) {
  auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log(userInfo);
      module.exports.uid = userInfo.user.uid;
      console.log("UID: " + module.exports.uid);
      const t = firebase.functions().httpsCallable("createToken");
      t().then(result => {
        result.data
      });
      console.log("token: "+ t);
      writeUserData(userInfo.user.uid, email, displayName, t)
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

const writeUserData = (uid, email, displayName, userToken) => {
  firestore().collection('users')
  .doc(uid)
  .set({
    name: displayName,
    email: email,
    token: userToken
  })
  .then (item => console.log("successfully added user to collection" + item) )
  .catch(err => { console.log(err); });
};
