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

  render() {
    return (
      <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
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
        <TouchableOpacity style={styles.profileButton} onPress={() => this.toProfile()}/>
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
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'flex-end',
  }
});
