import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/Authentication/AuthScreen';

const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
    return (
      <AuthStack.Navigator screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
        <AuthStack.Screen name={'AuthScreen'} component={AuthScreen}/>
      </AuthStack.Navigator>
    );
  }