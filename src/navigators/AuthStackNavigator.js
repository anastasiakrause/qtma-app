import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import {MainStackNavigator} from './MainStackNavigator';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, createContext } from 'react';

const AuthStack = createStackNavigator();
export const AuthContext = createContext(null);

export function AuthStackNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return authSubscriber; 
    }, []);

    if (initializing) {
      return null;
    }
    console.log("in auth stack", user);
    return user ? (
        <MainStackNavigator/>
    ) : (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
          <AuthStack.Screen name={'AuthScreen'} component={AuthScreen}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }