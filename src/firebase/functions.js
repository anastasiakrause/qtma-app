import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, createContext } from 'react';

export function login({ email, password }) {
    auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
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


export function signup({ email, password, displayName }) {
  let userToken;
  const tokenEndpoint = 'https://us-central1-qtmaapptwenty.cloudfunctions.net/userToken';
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({userHandle : displayName})
  };
  fetch(tokenEndpoint, data) 
  .then(response => {
    if(response.ok) return response.json();
    throw new Error('Network response was not ok');
  })
  .then((data)=> {
    console.log("in the second then");
    userToken = data.user_id;
  })
  .catch( (error) => {
    console.error(error);
  });

  auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      module.exports.uid = userInfo.user.uid;
      if (userToken){
        writeUserData(userInfo.user.uid, email, displayName, userToken);
        userInfo.user.updateProfile({ displayName: displayName.trim() })
          .then(() => { })
      }
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

