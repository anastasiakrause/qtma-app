import React from 'react';
import {View, Text, ScrollView} from 'react-native';
// Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// App screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';


//===== Defining Screen Functions =====//

function toHomeScreen({ navigation }) {
  return (
    <HomeScreen nav={ navigation }/>
  );
}

function toProfileScreen() {
  return (
    <ProfileScreen/>
  );
}

function toSinglePostScreen() {
  return (
    <SinglePostScreen/>
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
    </Stack.Navigator>
  );
}
