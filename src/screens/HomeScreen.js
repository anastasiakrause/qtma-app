// @flow

// React and gui component imports
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
  ReactionToggleIcon,
} from 'expo-activity-feed';
// COPIED FROM ProfileHeader.js
import type { UserData } from '../types';
import type { AppCtx } from 'expo-activity-feed';
import { StreamApp } from 'expo-activity-feed';

import Navbar from '../components/Navbar';
// Topbar
import Topbar from '../components/Topbar';

// image imports
import PostIcon from '../assets/post.png';
import ReplyIcon from '../assets/reply.png';
import { nullFormat } from 'numeral';

import happyclicked from '../assets/HappyClicked.png';
import happyunclicked from '../assets/HappyUnclicked.png';
import heartclicked from '../assets/HeartClicked.png';
import heartunclicked from '../assets/HeartUnclicked.png';
import sadclicked from '../assets/SadClicked.png';
import sadunclicked from '../assets/SadUnclicked.png';

// COPIED FROM ProfileHeader.js to try to get the profile picture
type Props = {};
type PropsInner = Props & AppCtx<UserData>;

export default function HomeScreen(props: Props) {
  return (
    <StreamApp.Consumer>
      {(appCtx) => <HomeInner {...props} {...appCtx} />}
    </StreamApp.Consumer>
  );
}

class HomeInner extends React.Component<PropsInner, State> {
  constructor(props: PropsInner) {
    super(props);
    this.state = {
      user: {},
    };
  }

  // NO CLUE WHAT THIS DOES - copied from ProfileHeader.js
  async componentDidMount() {
    let data = await this.props.user.profile(); // error catch here
    this.props.changedUserData();
    this.setState({ user: data });
  }

  // Post onPress function
  // Navigates to SinglePostScreen
  _onPressActivity = activity => {
    this.props.navigation.navigate("Post", { activity });
  };

  render() {
    // NO CLUE HOW TO USE THIS - needed for profileImage
    // copied from profileHeader.js
    let { name, url, desc, profileImage, coverImage } =
      this.props.userData || {};
      
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar 
          title="My Loop"
          navigation={this.props.navigation}
        />
        
        <FlatFeed
          feedGroup="timeline"
          options={{
            limit: 10,
          }}
          notify
          navigation={this.props.navigation}
          Activity={(props) => (
            <TouchableOpacity
              onPress={() => this._onPressActivity(props.activity)}
            >
              <Activity
                {...props}
                Footer={
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LikeButton reactionKind="heart" {...props} />

                    <ReactionToggleIcon
                      {...props}
                      activeIcon={happyclicked}
                      inactiveIcon={happyunclicked}
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
                      kind={'music'}
                      reactionKind="music"
                      onPress = { async (e) => {
                        props.onToggleReaction("music", props.activity, {},{});
                      } }
                    />

                    <ReactionToggleIcon
                      {...props}
                      activeIcon={sadclicked}
                      inactiveIcon={sadunclicked}
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
                      kind={'bookmark'}
                      reactionKind="bookmark"
                      onPress = { async (e) => {
                        props.onToggleReaction("bookmark", props.activity, {},{});
                      } }
                    />
                    <ReactionToggleIcon
                      {...props}
                      activeIcon={heartclicked}
                      inactiveIcon={heartunclicked}
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
                      kind={'hearteyes'}
                      reactionKind="hearteyes"
                      onPress = { async (e) => {
                        props.onToggleReaction("hearteyes", props.activity, {},{});
                      } }
                    />

                    <ReactionIcon
                      icon={ReplyIcon}
                      labelSingle="comment"
                      labelPlural="comments"
                      counts={props.activity.reaction_counts}
                      kind="comment"
                    />
                  </View>
                }
              />
            </TouchableOpacity>
          )}
        />

        <Navbar navigation={this.props.navigation} homesc/>

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
});
