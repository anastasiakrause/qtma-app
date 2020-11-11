import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Appbar} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {Button, Title, Paragraph, Card} from 'react-native-paper';
import HomeCard from '../../components/card';

import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

import PostIcon from '../../assets/post.png';
import ReplyIcon from '../../assets/reply.png';

class HomeScreen extends Component {

  СustomActivity = (props) => {
    return (
        <TouchableOpacity onPress={() => this._onPressActivity(props.activity)}>
          <Activity
            {...props}
            Footer={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LikeButton {...props} />
  
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
      );
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
                Activity= {this.CustomActivity}
            />
            <StatusUpdateForm feedGroup="timeline" />
        </SafeAreaView>
    </SafeAreaProvider>
    );
  }
}

export default HomeScreen;
