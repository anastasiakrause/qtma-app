import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import { GoogleSignin } from 'react-native-google-signin';
import * as Permissions from 'expo-permissions';


const RootStack = createStackNavigator();


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import { ThemeContext } from 'react-navigation';
export default function App() {
  StatusBar.setBarStyle('light-content', false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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


  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '537506013381-01a1c33eghuc469peaone9cfu1q3v3e6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVE
    });
  }, []);

  function renderScreens(){
    // Function loads all appropriate app screens
    // if no user logged in
    if (!user){ return (
          <RootStack.Screen name="Auth" component={AuthStackNavigator}/>
      );
    }
    // loading screen
    if (initializing) return (
      <RootStack.Screen name="LoadingScreen" component={MainStackNavigator}/>
    );
    // if user logged in, take to activity feed / profile navigator
    return (
      <RootStack.Screen name="Home" component={MainStackNavigator}/>
    );
  }

  return(
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{
          headerShown: false,
          animationEnabled: false,
            }}>
        {renderScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}



