import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Drawer/home';
import LoadingScreen from '../screens/Drawer/loading';
import SettingsScreen from '../screens/Drawer/settings';

const Tab = createBottomTabNavigator();

export function MainStackNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Loading" component={LoadingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
