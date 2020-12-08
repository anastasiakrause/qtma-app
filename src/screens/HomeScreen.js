// @flow
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

import PostIcon from '../assets/post.png';
import ReplyIcon from '../assets/reply.png';
import { nullFormat } from 'numeral';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Post onPress function
  // Navigates to SinglePostScreen
  _onPressActivity = () => {
    // props.nav is the navigation prop passed from MainStackNavigator
    this.props.nav.navigate("Post")
  }

  // Profile button onPress
  toProfile = () => {
    this.props.nav.navigate("Profile")
  }

  // new post button onPress
  toStatusScreen = () => {
    this.props.nav.navigate("Status")
  }

  render() {
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <View style={styles.topBarBox}>
        <View style={styles.topBar}>
          <Text style={styles.feedTitle}>Your Feed</Text>
          <TouchableOpacity style={styles.profileButton} onPress={() => this.toProfile()}/>
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
              onPress={() => this._onPressActivity()}
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

      <StatusUpdateForm feedGroup="timeline" />

      </SafeAreaView>
    </SafeAreaProvider>
    );
  }

}

export default HomeScreen;

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
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'column',
  },
  feedTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  }
});
