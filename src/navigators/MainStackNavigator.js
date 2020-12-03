import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SinglePostScreen from '../screens/SinglePostScreen';

const Tab = createBottomTabNavigator();

function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Test!</Text>
    </View>
  );
}

export function MainStackNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen 
        name="Post" 
        component={SinglePostScreen}
        options={{tabBarVisible: false}} 
      />
    </Tab.Navigator>
  );
}
