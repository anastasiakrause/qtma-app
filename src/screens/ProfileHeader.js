// @flow

import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StreamApp } from 'react-native-activity-feed';
import Count from './Count';
import { Avatar } from 'react-native-activity-feed';
import type { FollowCounts } from 'getstream';
import type { AppCtx } from 'react-native-activity-feed';
import type { UserData } from '../types';

import logo from '../assets/logo.png'

type Props = {};

export default function ProfileHeader(props: Props) {
  return (
    <StreamApp.Consumer>
      {(appCtx) => <ProfileHeaderInner {...props} {...appCtx} />}
    </StreamApp.Consumer>
  );
}

type PropsInner = Props & AppCtx<UserData>;

type State = {
  user: FollowCounts,
};

class ProfileHeaderInner extends React.Component<PropsInner, State> {
  constructor(props: PropsInner) {
    super(props);
    this.state = {
      user: {
        following_count: 3, // TODO: remove hard code
        followers_count: 0,
      },
    };
  }

  async componentDidMount() {
    let data = await this.props.user.profile();
    this.props.changedUserData();
    this.setState({ user: data });
  }

  render() {
    let { following_count, followers_count } = this.state.user;
    let { name, url, desc, profileImage, coverImage } =
      this.props.userData || {};

    coverImage ? StatusBar.setBarStyle('light-content', true) : null;

    return (
      <SafeAreaView style={[styles.profileHeader]}>
        <View style={[styles.mainSection]}>
          <Avatar source={profileImage} size={80}/>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userUrl}>{url}</Text>
            <Text style={styles.userDesc}>{desc}</Text>
          </View>
        </View>

      </SafeAreaView>
    );
  }
}

const margin = 0;

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: '#fff',
    paddingBottom: margin,
    width: 100 + '%',
    paddingHorizontal: 10,
  },
  profileHeaderShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  mainSection: {
    width: 100 + '%',
    marginTop: 5,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userDetails: {
    position: 'relative'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userUrl: {
    fontSize: 12,
    color: 'black',
  },
  userDesc: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    lineHeight: 19,
    marginTop: 7,
  },
  statSection: {
    paddingLeft: margin * 2,
    paddingRight: margin,
    flexDirection: 'row',
  },
});