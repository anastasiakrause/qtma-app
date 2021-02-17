import React from 'react';
import {View, Text, ScrollView} from 'react-native';
// Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';

// App screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatusUpdateScreen from '../screens/StatusUpdateScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import SinglePostScreen, { navigationOptions as singlePostNavigationOptions } from "../screens/SinglePostScreen";
import {
  StreamApp,
} from 'expo-activity-feed';

import { STREAM_API_KEY, HARD_TOKEN, STREAM_APP_ID } from "@env";
import AuthForm from '../components/AuthForm';
import { SafeAreaProvider } from 'react-native-safe-area-view';
let TOKEN;

// TODO: add screen navigation options as done with SinglePostScreen

//===== Creating Navigation Stack =====//

const Stack = createStackNavigator();

function storeUserToken(tok) {
  TOKEN = tok;
  console.log("Token has been set to ", TOKEN);
}

async function getCurrentUserToken() {
  var currentUser = firebase.auth().currentUser;
  const currUID = currentUser?.uid;
  const userDoc = await firestore()
    .collection('users')
    .doc(currUID)
    .get()
    .then(result => {
      console.log('here in getCurrentUserToken()');
      storeUserToken(result?._data?.token); // unhandled promise rejection
    });
}

export function MainStackNavigator() {
  getCurrentUserToken();

  return (
    <SafeAreaProvider>
      <StreamApp
        apiKey={STREAM_API_KEY}
        appId={STREAM_APP_ID}
        token={ HARD_TOKEN }
      >
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
          name="Status"
          component={StatusUpdateScreen}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
        />
      </Stack.Navigator>
      </StreamApp>
    </SafeAreaProvider>
  );
}
