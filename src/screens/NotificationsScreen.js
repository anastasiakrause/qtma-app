// @flow

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NotificationFeed } from "expo-activity-feed";

import { Activity, LikeButton, ReactionIcon } from "expo-activity-feed";
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navbar
import Navbar from '../components/Navbar';
// Topbar
import Topbar from '../components/Topbar';

// TODO: Convert to FC
export default class NotificationScreen extends React.Component {

  _renderGroup = ({ activityGroup, styles, ...props }: any) => {
    const verb = activityGroup.activities[0].verb;
    const activity = activityGroup.activities[0];
    // Check console to see notification item json
    console.log(activity)
    if (verb === "follow") {
      const name = activity.actor.data.name;
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{name} followed you.</Text>
        </View>
      );
    } else if (verb === "heart" || verb === "repost") {
      return (
        <Text>Liked</Text>
      );
    } else {
      const name = activity.actor.data.name;
      const content = activity.content;
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{name} made a post: </Text>
          <Text>{content}</Text>
        </View>
      );
    }
  };

  render() {
    return (

      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

      <Topbar title="Notifications"/>

      <NotificationFeed
        Group={this._renderGroup}
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