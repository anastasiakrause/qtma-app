import React, {Component} from 'react';
import { ScrollView, StatusBar } from 'react-native';
import ProfileHeader from '../ProfileHeader';
import { FlatFeed } from 'expo-activity-feed';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/styles.js';
import {Avatar, Button, Title, Card, IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';



class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
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
    );
  }
}

export default ProfileScreen;