import auth from '@react-native-firebase/auth';

export function login({ email, password }) {
    auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
  }
  
  export function signup({ email, password, displayName }) {
    auth().createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo)
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