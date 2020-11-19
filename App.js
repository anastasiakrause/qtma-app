import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import axios from 'axios';

import {
  Avatar,
  StreamApp,
  IconBadge,
} from 'expo-activity-feed';

const RootStack = createStackNavigator();

import {
  STREAM_API_KEY,
  STREAM_APP_ID,
} from 'babel-dotenv';

export default function App() {
  StatusBar.setBarStyle('light-content', false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function renderScreens(){
    if (initializing) return (
      <RootStack.Screen name="LoadingScreen" component={MainStackNavigator}/>
  );

    if (!user){
      return (
          <RootStack.Screen name="Auth" component={AuthStackNavigator}/>
      );
    }
     return (
      <RootStack.Screen name="Home" component={MainStackNavigator}/>
    );
  }

  let userToken = "";
  axios.get(`http://localhost:5001/qtmaapptwenty/us-central1/userToken`)
    .then(res => {
      console.log(res.data);
      userToken = res.data;
    })
  
  return(
    <StreamApp
    apiKey={STREAM_API_KEY}
    appId={STREAM_APP_ID}
    token={userToken}
      defaultUserData={{
        name: 'Batman',
        url: 'batsignal.com',
        desc: 'batmannnnn'
      }}
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