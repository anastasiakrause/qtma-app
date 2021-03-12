// @flow
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import {
  SinglePost,
  CommentBox,
  BackButton,
  Activity,
  LikeButton,
  ReactionIcon,
  CommentList,
  CommentItem,
  LikeList,
  ReactionToggleIcon,
} from 'expo-activity-feed';

import happyclicked from '../assets/HappyClicked.png';
import happyunclicked from '../assets/HappyUnclicked.png';
import heartclicked from '../assets/HeartClicked.png';
import heartunclicked from '../assets/HeartUnclicked.png';
import sadclicked from '../assets/SadClicked.png';
import sadunclicked from '../assets/SadUnclicked.png';

import type { UserResponse } from '../types';
import type { NavigationScreen } from 'expo-activity-feed';

import ReplyIcon from '../assets/reply.png';

// Topbar
import Topbar from '../components/Topbar';

export const navigationOptions = ({ navigation }) => ({
  title: "POST DETAIL",
  headerLeft: () => (
    <View style={{ paddingLeft: 15 }}>
      <BackButton pressed={() => navigation.goBack()} blue />
    </View>
  ),
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 13
  }
});

type Props = {|
  navigation: NavigationScreen,
|};

export default class SinglePostScreen extends React.Component {

  render() {
    const { route } = this.props;
    const activity = route.params.activity;
    const feedGroup = route.params.feedGroup;
    const userId = route.params.userId;

    return (
      <SafeAreaView style={styles.container}>
        <Topbar title="Post" />
        <SinglePost
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
          options={{ withOwnChildren: true }}
          navigation={this.props.navigation}
          Activity={(props) => (
            <React.Fragment>
              <Activity
                {...props}
                Footer={
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LikeButton reactionKind="heart" {...props} />

                    <ReactionToggleIcon
                      {...props}
                      activeIcon={happyclicked}
                      inactiveIcon={happyunclicked}
                      kind={'music'}
                      reactionKind="music"
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
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
              <View style={styles.likesContainer}>
                <LikeList activityId={props.activity.id} reactionKind="heart" />
              </View>
              <CommentList
                activityId={props.activity.id}
                infiniteScroll
                reverseOrder
                CommentItem={({ comment }) => (
                  <React.Fragment>
                    <CommentItem
                      comment={comment}
                      Footer={<LikeButton reaction={comment} {...props} />}
                    />
                  </React.Fragment>
                )}
              />

              <View style={styles.sectionHeader} />
            </React.Fragment>
          )}
          Footer={(props) => (
            <CommentBox
              activity={activity}
              onAddReaction={props.onAddReaction}
              avatarProps={{
                source: (userData: UserResponse) => userData.data.profileImage,
              }}
              styles={{ container: { height: 78 } }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});