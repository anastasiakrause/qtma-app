// @flow

import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
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
  constructor(props) {
    super(props);
    this.state = {
      notifications: [ // fake notification data structure
        {
          actor: 'Person',
          verb: 'liked your post in',
          loop: 'loop1',
          time: '5 min ago'
        },
        {
          actor: 'Person',
          verb: 'joined',
          loop: 'loop2',
          time: '10 min ago'
        },
        {
          actor: 'Person',
          verb: 'commented on your post in',
          loop: 'loop3',
          time: '2 hrs ago'
        },
        {
          actor: 'Person',
          verb: 'tagged you in',
          loop: 'loop4',
          time: 'a day ago'
        }
      ]
    };
  }

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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  renderFakeData() {
    // random loop tag colors
    const colors = [
      "#99E2FF",
      "#EDAE49",
      "#CC99FF",
      "#FF9999",
      "#009BCB"
    ]
    return this.state.notifications.map(item => {
      const i = this.getRandomInt(5);
      return (
         <View style={{
           width: '100%',
           paddingVertical: 10,
           paddingHorizontal: 20,
           flexDirection: 'row',
           alignItems: 'center',
         }}>
            <View style={[styles.friend_circle, {backgroundColor: colors[i]}]}/>
            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text>{item.actor} {item.verb} </Text>
                <View style={[styles.loop_tag, {backgroundColor: colors[i]}]}>
                  <Text style={styles.loop_tag_text}>{item.loop}</Text> 
                </View>
              </View>
              <Text style={{
                fontSize: 10,
                color: '#6F7E82'
              }}>{item.time}</Text>
            </View>
         </View>
      );
  });
  }

  render() {
    return (

      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
        <ScrollView>

          {/* <NotificationFeed
            Group={this._renderGroup}
          /> */}
          {this.renderFakeData()}

        </ScrollView>
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
  },
  loop_tag: {
    height: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 3,
  },
  loop_tag_text: {
    fontSize: 10.5,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  friend_circle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    backgroundColor: '#009BCB',
    borderRadius: 200,
    marginRight: 10,
  }
})