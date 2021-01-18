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
  ReactionIcon
} from 'expo-activity-feed';
// COPIED FROM ProfileHeader.js
import type { UserData } from '../types';
import type { AppCtx } from 'expo-activity-feed';
import { StreamApp } from 'expo-activity-feed';


// image imports
import PostIcon from '../assets/post.png';
import ReplyIcon from '../assets/reply.png';
import { nullFormat } from 'numeral';

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

  // Profile button onPress
  toProfile = () => {
    this.props.navigation.navigate("Profile")
  }

  // new post button onPress
  toStatusScreen = () => {
    this.props.navigation.navigate("Status")
  }

  render() {
    // NO CLUE HOW TO USE THIS - needed for profileImage
    // copied from profileHeader.js
    let { name, url, desc, profileImage, coverImage } =
      this.props.userData || {};
      
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <View style={styles.topBarBox}>
        <View style={styles.topBar}>
          <Text style={styles.feedTitle}>LOOP</Text>
          <TouchableOpacity style={styles.profileButton} onPress={() => this.toProfile()}>
            <Avatar source={profileImage} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newPostButton} onPress={() => this.toStatusScreen()}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
        </View>

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
      </SafeAreaView>
    </SafeAreaProvider>
    );
  }

}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  newPostButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignContent: 'center',
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
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
