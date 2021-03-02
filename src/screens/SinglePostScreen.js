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

import bookmark1 from '../assets/1.png';
import bookmark2 from '../assets/11.png';
import music1 from '../assets/4.png';
import music2 from '../assets/44.png';

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
                      activeIcon={music2}
                      inactiveIcon={music1}
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
                      activeIcon={bookmark2}
                      inactiveIcon={bookmark1}
                      own_reactions={props.activity.own_reactions}
                      counts={props.activity.reaction_counts}
                      kind={'bookmark'}
                      reactionKind="bookmark"
                      onPress = { async (e) => {
                        props.onToggleReaction("bookmark", props.activity, {},{});
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