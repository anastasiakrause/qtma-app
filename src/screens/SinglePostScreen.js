// @flow
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';

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
  Avatar,
  ReactionList
} from 'react-native-activity-feed';

import happyclicked from '../assets/HappyClicked.png';
import happyunclicked from '../assets/HappyUnclicked.png';
import heartclicked from '../assets/HeartClicked.png';
import heartunclicked from '../assets/HeartUnclicked.png';
import sadclicked from '../assets/SadClicked.png';
import sadunclicked from '../assets/SadUnclicked.png';

import type { UserResponse } from '../types';
import type { NavigationScreen } from 'react-native-activity-feed';


import ReplyIcon from '../assets/reply.png';
import bookmark from '../assets/bookmark.png';
import bookmarko from '../assets/bookmark-outline.png';

// Topbar
import Topbar from '../components/Topbar';

// Time
var Dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
Dayjs.extend(relativeTime)

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
    return time.fromNow();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const { route } = this.props;
    const activity = route.params.activity;
    const feedGroup = route.params.feedGroup;
    const userId = route.params.userId;

    // random loop tag colors
    const colors = [
      "#99E2FF",
      "#EDAE49",
      "#CC99FF",
      "#FF9999",
      "#009BCB"
    ]

    return (
      <SafeAreaView style={styles.container}>
        <Topbar title="Post" />
        <SinglePost
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
          options={{ withOwnChildren: true , withOwnReactions: true}}
          navigation={this.props.navigation}
          Activity={(props) => (
            <React.Fragment>
              <Activity
                {...props}
                Header={
                  <View>
                    <View style={{
                      width: '100%',
                      paddingTop: 5,
                      paddingBottom: 5,
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

                    {/* Checking if activity has loops param */}
                    {props.activity.loops ?
                    <ScrollView style={styles.loop_tag_box}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                    {  props.activity.loops.map(loop => {
                        const i = this.getRandomInt(5);
                        return (
                          <View style={[styles.loop_tag, {backgroundColor: colors[i]}]}>
                            <Text style={styles.loop_tag_text}>{loop}</Text> 
                          </View>
                        );
                      })}
                    </ScrollView>
                    : 
                    // If activity didn't have a loop param (old test posts - should never happen)
                    <View style={styles.loop_tag_box}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={styles.loop_tag}>
                        <Text style={styles.loop_tag_text}>Loop name TBD</Text> 
                      </View>
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
                      <ReactionToggleIcon
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

              <ReactionList
                activityId={props.activity.id}
                reactionKind={'hearteyes'}
                styles={{
                  container: { padding: 12, paddingLeft: 15, paddingRight: 15 },
                }}
                flatListProps={{ horizontal: true }}
                Reaction={({ reaction }) => (
                  <Avatar
                    source={reaction.user.data.profileImage}
                    size={25}
                    noShadow
                  />
                )}
                noPagination
              >
              </ReactionList>

              <View style={{ flex: 1, backgroundColor: 'white' }}>
              <CommentList
                activityId={props.activity.id}
                infiniteScroll
                reverseOrder
                CommentItem={({ comment }) => (
                  <React.Fragment>
                    <CommentItem
                      comment={comment}
                      styles={{
                        container: {
                          paddingVertical: 20,
                        }
                      }}
                    />
                  </React.Fragment>
                )}
              />
              </View>

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
  loop_tag_box: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 15,
    overflow: 'hidden',
  },
  loop_tag: {
    height: 16,
    paddingHorizontal: 8,
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