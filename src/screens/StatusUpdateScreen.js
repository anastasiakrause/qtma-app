// @flow

// React native and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

class StatusUpdateScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <StatusUpdateForm feedGroup="timeline" />
  
        </SafeAreaView>
      </SafeAreaProvider>
      );
    }
  
  }
  
  export default StatusUpdateScreen;