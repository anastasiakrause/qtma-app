// Import UI components
import React, {Component} from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatFeed, BackButton } from 'expo-activity-feed';
import {Avatar, Button, Title, Card, IconButton} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Firebase auth
import auth from '@react-native-firebase/auth';
// Profile header UI
import ProfileHeader from './ProfileHeader';
// Import stylesheet
import {styles} from '../styles/styles.js';


class ProfileScreen extends Component {

  // back button onPress
  toFeed = () => {
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <View style={localStyles.topBarBox}>
        <View style={localStyles.topBar}>
          <Text style={localStyles.feedTitle}>LOOP</Text>
          <TouchableOpacity style = {localStyles.backButton} onPress={() => this.toFeed()}>
            <BackButton white />
          </TouchableOpacity>
        </View>
        </View>
          <ProfileHeader />
          <FlatFeed feedGroup="timeline" />
          <Button
              style={styles.authButton}
              mode="outlined"
              onPress={() => auth().signOut()}
              color="#1e90ff"
              compact={false}>
              Sign Out
          </Button>

      </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default ProfileScreen;

const localStyles = StyleSheet.create({
  topBarBox: {
    width: '100%',
    backgroundColor: '#FF9999',
  },
  topBar: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'column',
  },
  feedTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  }, 
  backButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    borderColor: 'white',
    alignContent: 'center',
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
})