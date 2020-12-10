import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import { firebase } from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import { AsyncStorage } from 'react-native';
import * as stream from 'getstream';
import { GoogleSignin } from 'react-native-google-signin';
import {
  Avatar,
  StreamApp,
  IconBadge,
} from 'expo-activity-feed';

const RootStack = createStackNavigator();

import {
  STREAM_API_KEY,
  STREAM_APP_ID,
  STREAM_TOKEN
} from 'babel-dotenv';

import { ThemeContext } from 'react-navigation';
export default function App() {
  StatusBar.setBarStyle('light-content', false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState("");


  GoogleSignin.configure({
    webClientId: '537506013381-01a1c33eghuc469peaone9cfu1q3v3e6.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect( () => {
    if (user){
      console.log("state var before: ", userToken);
      setLocalUserToken();
      console.log("state var after: ", userToken);
      getLocalUserToken();
    } 
  });

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '537506013381-01a1c33eghuc469peaone9cfu1q3v3e6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVE
    });
  }, []);


  async function setLocalUserToken() {
      //set
      var currentUser = firebase.auth().currentUser;
      const uid = currentUser?.uid;
    
      const user = await firestore()
        .collection('users')
        .doc(uid)
        .get();
    
      let userToken = user.get('token');
      console.log("usertoken from local: ", userToken);
      setUserToken(userToken); // add this later when migrate to login

      try {
        await AsyncStorage.setItem('userToken', userToken);
        console.log("User token storage successful!");
      } catch (error){
        console.log("Unable to store User Token.");
      }
    }
  async function getLocalUserToken() {
    //get

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        console.log("User token storage found!");
        setUserToken(userToken);
      }
    } catch (error){
      console.log("Unable to store User Token.");
    }
  }

  function renderScreens(){
    // Function loads all appropriate app screens
    // loading screen
    if (initializing) return (
      <RootStack.Screen name="LoadingScreen" component={MainStackNavigator}/>
    );
    // if no user logged in
    if (!user){
      return (
          <RootStack.Screen name="Auth" component={AuthStackNavigator}/>
      );
    }
    // if user logged in, take to activity feed / profile navigator
    return (
      <RootStack.Screen name="Home" component={MainStackNavigator}/>
    );
  }

  return(
    <StreamApp
      apiKey={STREAM_API_KEY}
      appId={STREAM_APP_ID}
      token={STREAM_TOKEN}
    >
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{
          headerShown: false,
          animationEnabled: false,
            }}>
        {renderScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  </StreamApp>
  );
}



