import React from 'react';
import {View, Text, ScrollView} from 'react-native';
// Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// App screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatusUpdateScreen from '../screens/StatusUpdateScreen';
import SinglePostScreen, { navigationOptions as singlePostNavigationOptions } from "../screens/SinglePostScreen";
// TODO: add screen navigation options as done with SinglePostScreen

//===== Creating Navigation Stack =====//

const Stack = createStackNavigator();

export function MainStackNavigator() {
  return (
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
    </Stack.Navigator>
  );
}
