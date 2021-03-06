// @flow

// React native and gui component imports
import React, {Component, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StreamApp } from "expo-activity-feed";

// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

// Components
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
// screens
import NewPost from './NewPostScreen';
import NewLoop from './NewLoopScreen';

const Stack = createStackNavigator();

export default class StatusUpdateScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    // back button onPress
    toFeed = () => {
        this.props.navigation.navigate("Home")
    }

    chooseScreen({ navigation }){
      return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
        <Topbar title="Create" center/>
        <Text style={styles.subhead}>What do you want to create?</Text>
        <TouchableOpacity 
          style={styles.postButton}
          onPress={() => navigation.navigate("NewPost")}
        >
          <Text style={styles.buttonText}>New Post!</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loopButton}
          onPress={() => navigation.navigate("NewLoop")}
        >
          <Text style={styles.buttonText}>~New Loop~</Text>
        </TouchableOpacity>
        </View>
      )
    }
    
    render() {
      return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Choose" screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Choose"
              component={this.chooseScreen}
            />
            <Stack.Screen
              name="NewPost"
              component={NewPost}
            />
            <Stack.Screen
              name="NewLoop"
              component={NewLoop}
            />
          </Stack.Navigator>
        </NavigationContainer>

        <Navbar navigation={this.props.navigation} newsc/>  
        </SafeAreaView>
      </SafeAreaProvider>
      );
    }
  
  }
  

const styles = StyleSheet.create({
  subhead: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 50,
    marginBottom: 40,
    textAlign: 'center'
  },
  postButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#99E2FF',
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1
  },
  loopButton: {
    width: '50%',
    alignSelf: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }
})