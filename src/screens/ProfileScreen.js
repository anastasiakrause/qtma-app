// Import UI components
import React, {Component} from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import {Button, Title, Card, IconButton } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Time
var Dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
Dayjs.extend(relativeTime)
// Firebase auth
import auth from '@react-native-firebase/auth';
// Profile header UI
import ProfileHeader from './ProfileHeader';
// Navbar
import Navbar from '../components/Navbar';
// Topbar
import Topbar from '../components/Topbar';
// Import stylesheet
import {styles} from '../styles/styles.js';
// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  ReactionToggleIcon,
} from 'react-native-activity-feed';


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'feed', // 'feed' or 'friends'
      showSaved: false,
      friends: [
        "Steven",
        "Jo Jo",
        "Mario",
      ],
      addFriendPopup: false, // toggles add friend popup
      friendName: '',
      showSignout: false,
    };
  }

  humanizeTimestamp(timestamp) {
    // TAKEN FROM GETSTREAM EXAMPLE APP
    // Return time elapsed from timestamp
    let time;
    if (
      typeof timestamp === 'string' &&
      timestamp[timestamp.length - 1].toLowerCase() === 'z'
    ) {
      time = Dayjs(timestamp);
    } else {
      time = Dayjs(timestamp).add(
        Dayjs(timestamp).utcOffset(),
        'minute',
      ); // parse time as UTC
    }

    const now = Dayjs();
    return time.fromNow();
  }

  // switches active screen to feed view
  gotoPosts = () => {
    this.setState({showSaved: false});
    this.setState({show: "feed"});
  }
  // switches active screen to friends list
  gotoFriends = () => {
    this.setState({showSaved: false});
    this.setState({show: "friends"});
  }

  gotoSaved = () => {
    this.setState({showSaved: true});
  }

  // renders list of friends from "friends" state variable
  // TODO: connect variable with GetStream
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

  toggleAddFriendPopup = () => {
    // toggles add friend popup
    this.setState({addFriendPopup: !this.state.addFriendPopup})
  }

  addFriend = () => {
    // Onpress for add friend button
    Alert.alert("add "+this.state.friendName)
    this.toggleAddFriendPopup()
  }

  removeFriend = (name) => {
    // Onpress for when remove button is pressed
    // Name is name of friend
    Alert.alert("remove "+name)
  }

  toggleSignout = () => {
    this.setState({showSignout: !this.state.showSignout});
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  render() {

    // Dynamic border color on posts / friends buttons
    const posts_color = {
      borderColor: !this.state.showSaved && this.state.show == "feed" ? "#99E2FF" : '#D3D3D3'
    }
    const friends_color = {
      borderColor: !this.state.showSaved && this.state.show == "friends" ? "#99E2FF" : '#D3D3D3'
    }
    const saved_color = {
      borderColor: this.state.showSaved ? "#99E2FF" : '#D3D3D3'
    }

    const colors = [
      "#99E2FF",
      "#EDAE49",
      "#CC99FF",
      "#FF9999",
      "#009BCB"
    ]

    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar 
          title="My Profile" 
          addfriend={this.toggleAddFriendPopup}
          addFriendOpen={this.state.addFriendPopup}
          settings
          signout={this.toggleSignout}
        />

        <ProfileHeader />

        <View style={localStyles.profile_navbar}>
          <TouchableOpacity 
            style={[localStyles.profile_nav_button, posts_color]}
            onPress={this.gotoPosts}>
            <Text style={localStyles.profile_nav_button_text}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[localStyles.profile_nav_button, friends_color]} 
            onPress={this.gotoFriends}>
            <Text style={localStyles.profile_nav_button_text}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[localStyles.profile_nav_button, saved_color]} 
            onPress={this.gotoSaved}>
            <Text style={localStyles.profile_nav_button_text}>Saved</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
        {this.state.showSaved ? 
        // TODO: change to user saved posts feed
        <FlatFeed 
          feedGroup="user" 
          Activity={(props) => (
            <Activity
              {...props}
              Header={
                <View style={{
                  width: '100%',
                  paddingTop: 5,
                  paddingBottom: 15,
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  backgroundColor: 'white'
                }}>

                  <Avatar 
                    source={props.activity.actor.data.profileImage}
                    size={40}
                  />

                  <View style={{marginLeft: 10, maxHeight: 40, justifyContent: 'center',}}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>{props.activity.actor.data.name}</Text>
                    <Text style={{
                      fontSize: 10,
                      color: "#6F7E82"
                    }}>{this.humanizeTimestamp(props.activity.time)}</Text>
                  </View>

                    {/* Checking if activity has loops param */}
                    {props.activity.loops ?
                    // If activity has less than 2 loops to tag
                    props.activity.loops.length < 2 ?
                    <View style={localStyles.loop_tag_box}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                    {  props.activity.loops.map(loop => {
                        const i = this.getRandomInt(5);
                        return (
                          <View style={[localStyles.loop_tag, {backgroundColor: colors[i]}]}>
                            <Text style={localStyles.loop_tag_text}>{loop}</Text> 
                          </View>
                        );
                      })}
                    </View>
                    : 
                    // If activity has more than 1 loops to tag
                    <View style={localStyles.loop_tag_box}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={[localStyles.loop_tag, {backgroundColor: 'transparent', marginLeft: -3, padding: 0}]}>
                        <Text style={{
                          fontSize: 10.5,
                          color: 'black',
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>+{props.activity.loops.length-1} more</Text> 
                      </View>
                      <View style={[localStyles.loop_tag, {backgroundColor: colors[this.getRandomInt(5)]}]}>
                        <Text style={localStyles.loop_tag_text}>
                          {props.activity.loops[0]}
                        </Text> 
                      </View>
                    </View>
                    :
                    // If activity didn't have a loop param (old test posts - should never happen)
                    <View style={[localStyles.loop_tag, {marginLeft: 'auto'}]}>
                      <Text style={localStyles.loop_tag_text}>Loop name TBD</Text> 
                    </View>
                    }

                </View>
              }
            />
          )}
        />
        :
          this.state.show == "feed" ?
          <FlatFeed 
            feedGroup="user" 
            Activity={(props) => (
              <Activity
                {...props}
                Header={
                  <View style={{
                    width: '100%',
                    paddingTop: 5,
                    paddingBottom: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    backgroundColor: 'white'
                  }}>
    
                    <Avatar 
                      source={props.activity.actor.data.profileImage}
                      size={40}
                    />
    
                    <View style={{marginLeft: 10, maxHeight: 40, justifyContent: 'center',}}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>{props.activity.actor.data.name}</Text>
                      <Text style={{
                        fontSize: 10,
                        color: "#6F7E82"
                      }}>{this.humanizeTimestamp(props.activity.time)}</Text>
                    </View>
    
                      {/* Checking if activity has loops param */}
                      {props.activity.loops ?
                      // If activity has less than 2 loops to tag
                      props.activity.loops.length < 2 ?
                      <View style={localStyles.loop_tag_box}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                      {  props.activity.loops.map(loop => {
                          return (
                            <View style={[localStyles.loop_tag, {backgroundColor: colors[this.getRandomInt(5)]}]}>
                              <Text style={localStyles.loop_tag_text}>{loop}</Text> 
                            </View>
                          );
                        })}
                      </View>
                      : 
                      // If activity has more than 1 loops to tag
                      <View style={localStyles.loop_tag_box}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        <View style={[localStyles.loop_tag, {backgroundColor: 'transparent', marginLeft: -3, padding: 0}]}>
                          <Text style={{
                            fontSize: 10.5,
                            color: 'black',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                          }}>+{props.activity.loops.length-1} more</Text> 
                        </View>
                        <View style={[localStyles.loop_tag, {backgroundColor: colors[this.getRandomInt(5)]}]}>
                          <Text style={localStyles.loop_tag_text}>
                            {props.activity.loops[0]}
                          </Text> 
                        </View>
                      </View>
                      :
                      // If activity didn't have a loop param (old test posts - should never happen)
                      <View style={[localStyles.loop_tag, {marginLeft: 'auto'}]}>
                        <Text style={localStyles.loop_tag_text}>Loop name TBD</Text> 
                      </View>
                      }
    
                  </View>
                }
              />
            )}
          />
          :
          <ScrollView style={{flex: 1, paddingTop: 0, backgroundColor: 'white'}}>
            {this.renderFriends()}
          </ScrollView> 
        }

        </View>

        {/* Signout button component */}
        {this.state.showSignout ?
        <Button
            style={localStyles.authButton}
            onPress={() => auth().signOut()}
            compact={false}
            >
              <Text style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                flex: 1,
                color: '#BCBCBC',
                fontSize: 12,
              }}>Sign out</Text>
        </Button> : null
        }

        {
          this.state.addFriendPopup ?
          <View style={localStyles.add_friend_popup}>
            <Text style={localStyles.aftext}>Add a Friend:</Text>
            <TextInput 
              style={localStyles.afinput}
              onChangeText={text => this.setState({friendName: text})}
            />
            <View style={localStyles.afbbox}>
              <TouchableOpacity onPress={this.toggleAddFriendPopup}>
                <Text 
                  style={localStyles.afbut}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addFriend()}>
                <Text 
                  style={[localStyles.afbut, {backgroundColor: '#FF9999'}]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          null
        }

        <Navbar navigation={this.props.navigation} profsc/>

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
  profile_navbar: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
  },
  profile_nav_button: {
    height: '100%',
    width: '33.33%',
    borderBottomWidth: 2,
  },
  profile_nav_button_text: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold'
  },
  friend_box: {
    width: '100%',
    height: 45,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  friend_circle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    backgroundColor: '#009BCB',
    borderRadius: 200
  },
  friend_list: {
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 10,
    textAlignVertical: 'center',
    fontWeight: 'bold'
  },
  remove_button: {
    backgroundColor: '#BCBCBC',
    width: 50,
    paddingVertical: 2,
    marginLeft: 'auto',
    alignSelf: 'center',
    borderRadius: 5,
  },
  add_friend_popup: {
    position: 'absolute',
    width: "80%",
    alignSelf: 'center',
    marginTop: '25%',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    padding: 20,
  },
  aftext: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  afinput: {
    borderBottomWidth: 1,
    height: 40,
    marginTop: 10,
  },
  afbbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  afbut: {
    paddingVertical: 5,
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 100,
    borderWidth: 1
  },
  authButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: "#BCBCBC",
    fontSize: 14,
    color: 'black',
    borderWidth: 1,
    width: 100,
    height: 30,
    marginTop: 80,
    alignSelf: 'flex-end'
  },
  loop_tag_box: {
    marginRight: 0,
    marginLeft: 'auto',
    flexDirection: 'row-reverse',
    maxWidth: 250,
    overflow: 'hidden'
  },
  loop_tag: {
    height: 16,
    paddingHorizontal: 8,
    backgroundColor: "#009BCB",
    borderRadius: 5,
    marginRight: 3,
  },
  loop_tag_text: {
    fontSize: 10.5,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})