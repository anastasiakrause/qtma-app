// @flow
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SinglePostScreen from '../screens/SinglePostScreen';

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
    this.props.nav.navigate("Post")
  };

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
        {singlePost = this.state.showPost ? 
          <SinglePostScreen 
            navigation={null} 
            activity={null} 
            feedGroup={null} 
            userId={null}
          /> : 
          null
        }
      <StatusUpdateForm feedGroup="timeline" />
      </SafeAreaView>
    </SafeAreaProvider>
    );
  }

}

export default HomeScreen;
