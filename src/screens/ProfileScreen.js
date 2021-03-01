// Import UI components
import React, {Component} from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatFeed, BackButton } from 'expo-activity-feed';
import {Avatar, Button, Title, Card, IconButton} from 'react-native-paper';
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
      show: 'feed',
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
      ]
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
             <Text key={friend} style={localStyles.friend_list}>{friend}</Text>
         );
     });
  }

  render() {

    // Dynamic border color on posts / friends buttons
    const posts_color = {
      borderColor: this.state.show == "feed" ? "#4F4F4F" : '#D3D3D3'
    }
    const friends_color = {
      borderColor: this.state.show == "friends" ? "#4F4F4F" : '#D3D3D3'
    }

    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <Topbar title="My Profile" />

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

        {this.state.show == "feed" ?
        <FlatFeed feedGroup="user" />
        :
        <ScrollView style={{flex: 1, marginTop: 15}}>
          {this.renderFriends()}
        </ScrollView> }

        <Button
            style={styles.authButton}
            mode="outlined"
            onPress={() => auth().signOut()}
            color="#1e90ff"
            compact={false}>
            Sign Out
        </Button>

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
  friend_list: {
    width: '100%',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
  }
})