// @flow

// React and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Time
var Dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
Dayjs.extend(relativeTime)

// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  ReactionToggleIcon,
  UserBar,
} from 'react-native-activity-feed';
// COPIED FROM ProfileHeader.js
import type { UserData } from '../types';
import type { AppCtx } from 'react-native-activity-feed';
import { StreamApp } from 'react-native-activity-feed';

import Navbar from '../components/Navbar';
// Topbar
import Topbar from '../components/Topbar';

import NotificationScreen from '../screens/NotificationsScreen';

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
import bookmark from '../assets/bookmark.png';
import bookmarko from '../assets/bookmark-outline.png';

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
      currentLoopId: '', // Will contain current loop id to pass to Flatfeed
      showFriends: false,
      loopMembers: [],
      addLoopPopup: false,
      loopName: '',
      forceFeedRefresh: false,
      showNotifications: false,
    };
  }

  async componentDidMount() {
    let data = await this.props.user.profile();
    this.props.changedUserData();
    this.setState({ user: data });
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
    return time.from(now);
  }

  // Post onPress function
  // Navigates to SinglePostScreen
  _onPressActivity = activity => {
    this.props.navigation.navigate("Post", { activity });
  };

  _onSaveActivity = activity => {
    console.log(activity);
  }

  showLoopsList = ( show ) => {
    // !show bc of some kinda weird state thing
    this.setState({ showList: !show });
  }

  changeLoop = ( loop ) => {
    this.state.currentLoopId = loop[0];
    this.state.currentLoopName = loop[1];
    this.setState({ forceFeedRefresh: false });
    if (loop == "My Loop"){
      this.setState({showFriends: false});
    }
    else {
      const tokenEndpoint = 'https://us-central1-qtmaapptwenty.cloudfunctions.net/getLoopFollowers';
      let data = {
           method: 'POST',
           headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json'
           },
           body: JSON.stringify ({
             loopName : this.state.currentLoopName,
           }) 
       };
  
       fetch(tokenEndpoint, data) 
        .then(response => {
            if(response.ok) return response.json()
            throw new Error('Network response was not ok');
        }).then( (data) => {
          this.state.loopMembers=data.followers;
        }).catch( (error) => {
            console.error(error);
        });
    }
    this.showLoopsList( true );
  }

  // renders list of loops dropdown
  renderLoops() {
    var loopslist = [[this.props.userData.name, 'My Loop']];
    for (var key in this.props.userData.loop_ids) {
         if (this.props.userData.loop_ids.hasOwnProperty(key)) {
             loopslist.push( [ key, this.props.userData.loop_ids[key] ] );
         }
     }
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
              <Text style={styles.loop_list_item}>{loop[1]}</Text>
              </TouchableOpacity>
          );
        }
    });
  }

  showFriendsList = () => {
    this.setState({ showFriends: !this.state.showFriends });
    this.setState({forceFeedRefresh: true});
  }

  // Renders memebers of current loop
  renderFriends() {
    return this.state.loopMembers.map(friend => {
         return (
            <View key={friend} style={styles.friend_box}>
              <UserBar
                username={friend.userName}
                avatar={friend.userImage}
              />
              <TouchableOpacity 
                style={styles.remove_button}
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

  // Renders selected loop
  renderLoopFeed() {
    return (
    <FlatFeed
          feedGroup="loop"
          userId={this.state.currentLoopName}
          options={{
            limit: 10,
            refresh: true,
          }}
          notify
          navigation={this.props.navigation}
          Activity={(props) => (
            <TouchableOpacity
              onPress={() => this._onPressActivity(props.activity)}
            >
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
    
                  </View>
                }
                Footer={
                  <View style={{ flexDirection: 'row', backgroundColor: 'white'}}>
    
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
    
                    <View style={{marginLeft: 'auto', marginRight: 15, flexDirection: 'row'}}>
                    <ReactionIcon
                      icon={ReplyIcon}
                      labelSingle="comment"
                      labelPlural="comments"
                      counts={props.activity.reaction_counts}
                      kind="comment"
                    />
                    <ReactionToggleIcon // SAVE POST BUTTON
                      {...props}
                      activeIcon={bookmark}
                      inactiveIcon={bookmarko}
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
                      kind={'saved'}
                      reactionKind="saved"
                      onPress = { async (e) => {
                        // TODO: edit this to do something w activity
                        // SHOULD WORK BUT NEED LOOP TO WAIVE READ/WRITE RESTRICTIONS                  
                        await this.props.client
                        .feed('saved', this.props.userId)
                        .addActivity(props.activity);
                        props.onToggleReaction("saved", props.activity, {},{});
                      } }
                    />
                    </View>
                  </View>
                }
              />
            </TouchableOpacity>
          )}
        />
    )
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // Renders user's timeline feed
  renderTimelineFeed() {
    // random loop tag colors
    const colors = [
      "#99E2FF",
      "#EDAE49",
      "#CC99FF",
      "#FF9999",
      "#009BCB"
    ]
    return (
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
                  <View style={styles.loop_tag_box}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                  {  props.activity.loops.map(loop => {
                      return (
                        <View style={[styles.loop_tag, {backgroundColor: colors[this.getRandomInt(5)]}]}>
                          <Text style={styles.loop_tag_text}>{loop}</Text> 
                        </View>
                      );
                    })}
                  </View>
                  : 
                  // If activity has more than 1 loops to tag
                  <View style={styles.loop_tag_box}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={[styles.loop_tag, {backgroundColor: 'transparent', marginLeft: -3, padding: 0}]}>
                      <Text style={{
                        fontSize: 10.5,
                        color: 'black',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>+{props.activity.loops.length-1} more</Text> 
                    </View>
                    <View style={[styles.loop_tag, {backgroundColor: colors[this.getRandomInt(5)]}]}>
                      <Text style={styles.loop_tag_text}>
                        {props.activity.loops[0]}
                      </Text> 
                    </View>
                  </View>
                  :
                  // If activity didn't have a loop param (old test posts - should never happen)
                  <View style={[styles.loop_tag, {marginLeft: 'auto'}]}>
                    <Text style={styles.loop_tag_text}>Loop name TBD</Text> 
                  </View>
                  }

              </View>
            }
            Footer={
              <View style={{ flexDirection: 'row', backgroundColor: 'white'}}>

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

                <View style={{marginLeft: 'auto', marginRight: 15, flexDirection: 'row'}}>
                  <ReactionIcon
                    icon={ReplyIcon}
                    labelSingle="comment"
                    labelPlural="comments"
                    counts={props.activity.reaction_counts}
                    kind="comment"
                  />
                  <ReactionToggleIcon // SAVE POST BUTTON
                    {...props}
                    activeIcon={bookmark}
                    inactiveIcon={bookmarko}
                    own_reactions={props.activity.own_reactions}
                    counts={props.activity.reaction_counts}
                    kind={'saved'}
                    reactionKind="saved"
                    onPress = { async (e) => {
                      // TODO: edit this to do something w activity
                      // SHOULD WORK BUT NEED LOOP TO WAIVE READ/WRITE RESTRICTIONS                  
                      await this.props.client
                        .feed('saved', this.props.userId)
                        .addActivity(props.activity);

                      props.onToggleReaction("saved", props.activity, {},{});
                    } }
                  />
                </View>
              </View>
            }
          />
        </TouchableOpacity>
      )}
    />
    )
  }

  removeFriend = (name) => {
    // Onpress for when remove button is pressed
    // Name is name of friend
    Alert.alert("remove "+ name)
  }

  toggleNotificationScreen = () => {
    this.setState({ showNotifications: !this.state.showNotifications });
  }

  addLoop = () => {
    const tokenEndpoint = 'https://us-central1-qtmaapptwenty.cloudfunctions.net/joinLoop';
    let data = {
        method: 'POST',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          loopCode : this.state.loopName,
          userHandle : this.props.userData.name,
        }) 
    };
    fetch(tokenEndpoint, data) 
    .then(response => {
        if(response.ok) return response.json()
        throw new Error('Network response was not ok');
    }).then( () => {
      Alert.alert("Added new loop "+ this.props.userData.loop_ids[this.state.currentLoopName])
    }).catch( (error) => {
        console.error(error);
    });

    this.setState({addLoopPopup: false});
    this.showLoopsList( true ); // toggles loops list
  }

  render() {
    // quick check for when user exits then returns home screen
    if (this.state.currentLoopName != "My Loop" && 
      !this.state.forceFeedRefresh &&
      !this.state.showList) {
      this.setState({forceFeedRefresh: true});
    }
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar 
          title={this.state.showNotifications ? "Notifications" : this.state.currentLoopName}
          navigation={this.props.navigation}
          loopsdown={!this.state.showNotifications}
          showlist={this.showLoopsList}
          shown={this.state.showList}
          showfriendsbutton={this.state.currentLoopName != "My Loop"}
          showfriends={this.state.showFriends}
          showFriendsList={this.showFriendsList}
          loopid={this.state.currentLoopName == "My Loop" ? null : this.state.currentLoopId}
          shownotifbutton={this.state.currentLoopName == "My Loop"}
          showNotifications={this.toggleNotificationScreen}
          shownotif={this.state.showNotifications}
        />

        {this.state.showNotifications ?  
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <NotificationScreen />
          </View>
        :
          <>
            {/* Feed dependent on whether loop selected */}
            {this.state.currentLoopName == 'My Loop' ?  this.renderTimelineFeed() : null}
            {this.state.forceFeedRefresh ? this.renderLoopFeed() :
            this.state.currentLoopName == 'My Loop' ? null : <View style = {{flex:1}}></View>
            }
          </>
        }

        {/* Toggleable friends list component */}
        {
          this.state.showFriends ? 
          <View style={{
            position: 'absolute',
            marginTop: 130, // topbar height + top margin (ios fix)
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
          <ScrollView style={{ 
            backgroundColor: 'white',
            paddingHorizontal: 20, 
            position: 'absolute',
            width: '100%',
            maxHeight: '70%',
            marginTop: 75, // topbar height + top margin
            paddingBottom: 10,
          }}>
            <TouchableOpacity 
              style={{
                width: '100%',
                marginBottom: 15,
              }}
              onPress={() => this.setState({addLoopPopup: true})}
            >
              <Text style={[styles.loop_list_item, {color: "#BCBCBC"}]}>Join a new Loop +</Text>
            </TouchableOpacity>
            {this.renderLoops()}
          </ScrollView>  

          </>
          :
          null
        }

        {/* Add new loop popup - copied from add friend popup in profile screen */}
        {/* Sets the state variable loopName */}
        {
          this.state.addLoopPopup ?
          <View style={styles.add_friend_popup}>
            <Text style={styles.aftext}>Enter Loop code:</Text>
            <TextInput 
              style={styles.afinput}
              onChangeText={text => this.setState({loopName: text})}
            />
            <View style={styles.afbbox}>
              <TouchableOpacity onPress={() => this.setState({addLoopPopup: false})}>
                <Text 
                  style={styles.afbut}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addLoop()}>
                <Text 
                  style={[styles.afbut, {backgroundColor: '#FF9999'}]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  },
  friend_box: {
    width: '100%',
    height: 55, // ios adjustment
    paddingHorizontal: 25, // ios adjustment
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
});
