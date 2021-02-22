import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import { GoogleSignin } from 'react-native-google-signin';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import { ThemeContext } from 'react-navigation';
export default function App() {
  StatusBar.setBarStyle('light-content', false);

  GoogleSignin.configure({
    webClientId: '537506013381-01a1c33eghuc469peaone9cfu1q3v3e6.apps.googleusercontent.com',
  });

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '537506013381-01a1c33eghuc469peaone9cfu1q3v3e6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVE
    });
  }, []);
  return <AuthStackNavigator/>
}



