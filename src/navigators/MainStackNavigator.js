import React from 'react';
import {View, Text, ScrollView} from 'react-native';
// Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// App screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import StatusUpdateScreen from '../screens/StatusUpdateScreen';


//===== Defining Screen Functions =====//

function toHomeScreen({ navigation }) {
  return (
    <HomeScreen nav={ navigation }/>
  );
}

function toProfileScreen({ navigation }) {
  return (
    <ProfileScreen nav={ navigation }/>
  );
}

function toSinglePostScreen() {
  return (
    <SinglePostScreen/>
  );
}

function toStatusUpdateScreen({ navigation }) {
  return (
    <StatusUpdateScreen nav={ navigation }/>
  );
}


//===== Creating Navigation Stack =====//

const Stack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={toHomeScreen} />
      <Stack.Screen name="Profile" component={toProfileScreen} />
      <Stack.Screen name="Post" component={toSinglePostScreen} />
      <Stack.Screen name="Status" component={toStatusUpdateScreen} />
    </Stack.Navigator>
  );
}
