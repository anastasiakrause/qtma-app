// @flow

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NotificationFeed } from "expo-activity-feed";

import { Activity, LikeButton, ReactionIcon } from "expo-activity-feed";
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navbar
import Navbar from '../components/Navbar';

// TODO: Convert to FC
export default class NotificationScreen extends React.Component {

  render() {
    return (

      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

      <View style={styles.topBarBox}>
      <View style={styles.topBar}>
        <Text style={styles.feedTitle}>Notifications</Text>
      </View>
      </View>

      <NotificationFeed
      />

      <Navbar navigation={this.props.navigation}/>

      </SafeAreaView>
      </SafeAreaProvider>

    );
  }
}

const styles = StyleSheet.create({
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
  }
})