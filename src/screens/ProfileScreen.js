// Import UI components
import React, {Component} from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { FlatFeed } from 'expo-activity-feed';
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
  render() {
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <ScrollView style={{ position: 'absolute', flex: 1 }}>
          <ProfileHeader />
          <FlatFeed feedGroup="user" />
          <Button
              style={styles.authButton}
              mode="outlined"
              onPress={() => auth().signOut()}
              color="#1e90ff"
              compact={false}>
              Sign Out
          </Button>
        </ScrollView>

      </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default ProfileScreen;