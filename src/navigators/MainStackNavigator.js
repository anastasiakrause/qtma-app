import {View, Text, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';

// Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// App screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import SinglePostScreen, { navigationOptions as singlePostNavigationOptions } from "../screens/SinglePostScreen";
import {
  StreamApp,
} from 'react-native-activity-feed';
import NewPostScreen from '../screens/NewPostScreen';
import NewLoopScreen from '../screens/NewLoopScreen';

import { STREAM_API_KEY, STREAM_APP_ID } from "@env";
import AuthForm from '../screens/AuthForm';
import { SafeAreaProvider } from 'react-native-safe-area-view';
let TOKEN;

// TODO: add screen navigation options as done with SinglePostScreen

//===== Creating Navigation Stack =====//

const Stack = createStackNavigator();

export function MainStackNavigator() {
  const [userTok, setUserTok] = useState();

  async function getCurrentUserToken() {
    var currentUser = firebase.auth().currentUser;
    const currUID = currentUser?.uid;
    const userDoc = await firestore()
      .collection('users')
      .doc(currUID)
      .get()
      .then(result => {
        setUserTok(result?._data?.token);
      });
  }

  getCurrentUserToken();

  if (!userTok){
    return null;
  }
  
  return (
    <SafeAreaProvider>
      <StreamApp
          apiKey={STREAM_API_KEY}
          appId={STREAM_APP_ID}
          token={ userTok }
        >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
            />
            <Stack.Screen
              name="Post"
              component={SinglePostScreen}
              options={singlePostNavigationOptions}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationScreen}
            />
            <Stack.Screen
              name="NewPost"
              component={NewPostScreen}
            />
            <Stack.Screen
              name="NewLoop"
              component={NewLoopScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StreamApp>
    </SafeAreaProvider>
  );
}
