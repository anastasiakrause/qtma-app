import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';



import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './src/screens/Authentication/AuthScreen';


import { NavigationContainer } from '@react-navigation/native';

import {MainStackNavigator} from './src/navigators/MainStackNavigator'
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';

import LoadingScreen from './src/screens/Drawer/loading';




const RootStack = createStackNavigator();


export default function App() {
  StatusBar.setBarStyle('light-content', false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function renderScreens(){
    if (initializing) return (
      <RootStack.Screen name="LoadingScreen" component={LoadingScreen}/>
  );

    if (!user){
      return (
          <RootStack.Screen name="Auth" component={AuthStackNavigator}/>
      );
    }
     return (
      <RootStack.Screen name="Home" component={MainStackNavigator}/>
  );
  }

  return(
    
    <NavigationContainer>
      
      <RootStack.Navigator screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
        {renderScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  )

}