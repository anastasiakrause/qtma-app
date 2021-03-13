// @flow

// React and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
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
      showList: false,
      currentLoopName: 'My Loop', // Will contain current loop name
      currentLoopId: 'user_id', // Will contain current loop id to pass to Flatfeed
      showFriends: false,
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

  showLoopsList = ( show ) => {
    // !show bc of some kinda weird state thing
    this.setState({ showList: !show });
  }

  changeLoop = ( loop ) => {
    // TODO implement changeloop functionality
    this.setState({currentLoopName: loop});
    this.setState({currentLoopId: loop});
    this.showLoopsList( true );
  }

  // renders list of loops dropdown
  // TODO - Connect to get stream
  renderLoops() {
    var loopslist = ["My Loop", "loop1", "loop2", "loop3"]
    // //for (var key in this.state.loops) {
    // for (var key in this.props.userData.loop_ids) {
    //     if (this.props.userData.loop_ids.hasOwnProperty(key)) {
    //         loopslist.push( [ key, this.props.userData.loop_ids[key] ] );
    //     }
    // }
    return loopslist.map(loop => {
        if(loop != this.state.currentLoopName) {
          return (
              <TouchableOpacity 
              key={loop}
              style={{
                width: '100%',
                marginBottom: 15,
              }}
              onPress={() => this.changeLoop(loop)}
              >
              <Text style={styles.loop_list_item}>{loop}</Text>
              </TouchableOpacity>
          );
        }
    });
  }

  showFriendsList = () => {
    this.setState({ showFriends: !this.state.showFriends });
  }

  renderFriends() {
    return this.state.friends.map(friend => {
         return (
            <View key={friend} style={localStyles.friend_box}>
              <View style={localStyles.friend_circle}/>
              <Text style={localStyles.friend_list}>{friend}</Text>
              <TouchableOpacity 
                style={localStyles.remove_button}
                onPress={() => this.removeFriend(friend)}
              >
                <Text style={{
                  fontSize: 10, 
                color: 'white', 
                textAlign: 'center', 
                textAlignVertical: 'center'
                }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
         );
     });
  }

  render() {
    // NO CLUE HOW TO USE THIS - needed for profileImage
    // copied from profileHeader.js
    let { name, url, desc, profileImage, coverImage } =
      this.props.userData || {};
      
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar 
          title={this.state.currentLoopName}
          navigation={this.props.navigation}
          loopsdown
          showlist={this.showLoopsList}
          shown={this.state.showList}
          showfriendsbutton={this.state.currentLoopName != "My Loop"}
          showfriends={this.state.showFriends}
          showFriendsList={this.showFriendsList}
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

        {/* Toggleable friends list component */}
        {
          this.state.showFriends ? 
          <View style={{
            position: 'absolute',
            marginTop: 75, // topbar height + top margin
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
          }}>
            {this.renderFriends()}
          </View>
          : null
        }

        {/* Dropdown loop selection componenet */}
        {
          this.state.showList ? 
          <>

          <View style={{
            position: 'absolute',
            marginTop: 75, // topbar height + top margin
            backgroundColor: '#A0A0A0',
            opacity: 0.25,
            height: '100%',
            width: '100%',
          }} />
          <View style={{ 
            backgroundColor: 'white',
            paddingHorizontal: 20, 
            position: 'absolute',
            width: '100%',
            marginTop: 75, // topbar height + top margin
            paddingBottom: 10,
            }}>
          {this.renderLoops()}
          </View>  

          </>
          :
          null
        }

        <Navbar navigation={this.props.navigation} homesc/>

      </SafeAreaView>
    </SafeAreaProvider>
    );
  }

}

const styles = StyleSheet.create({
  loop_list_item: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
