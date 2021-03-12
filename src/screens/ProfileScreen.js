// Import UI components
import React, {Component} from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { FlatFeed, BackButton } from 'expo-activity-feed';
import {Avatar, Button, Title, Card, IconButton } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'feed', // 'feed' or 'friends'
      friends: [
        "Steven",
        "Jo Jo",
        "Mario",
        "Steven",
        "Jo Jo",
        "Mario",
        "Steven",
        "Jo Jo",
        "Mario",
        "Steven",
        "Jo Jo",
        "Mario",
      ],
      addFriendPopup: false, // toggles add friend popup
      friendName: ''
    };
  }

  // switches active screen to feed view
  gotoPosts = () => {
    this.setState({show: "feed"})
  }
  // switches active screen to friends list
  gotoFriends = () => {
    this.setState({show: "friends"})
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

  render() {

    // Dynamic border color on posts / friends buttons
    const posts_color = {
      borderColor: this.state.show == "feed" ? "#99E2FF" : '#D3D3D3'
    }
    const friends_color = {
      borderColor: this.state.show == "friends" ? "#99E2FF" : '#D3D3D3'
    }

    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar title="My Profile" addfriend={this.toggleAddFriendPopup}/>

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
        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
        {this.state.show == "feed" ?
        <FlatFeed feedGroup="user" />
        :
        <ScrollView style={{flex: 1, paddingTop: 0, backgroundColor: 'white'}}>
          {this.renderFriends()}
        </ScrollView> }

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
        </Button>
        </View>

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

        <Navbar navigation={this.props.navigation}/>

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
    width: "50%",
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
    alignSelf: 'center',
    marginTop: '97%',
    width: 100,
    height: 30,
  }
})