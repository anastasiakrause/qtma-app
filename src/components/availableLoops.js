import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { StreamApp } from "expo-activity-feed";
//import Count from "./Count";
import { Avatar } from "expo-activity-feed";
//import CoverImage from "./CoverImage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvailableLoops(props) {
  return (
    <StreamApp.Consumer>
      {appCtx => <AvailableLoopsInner {...props} {...appCtx} />}
    </StreamApp.Consumer>
  );
}
class AvailableLoopsInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        //following_count: 0,
       // followers_count: 0
      }
    };
  }

  async componentDidMount() {
    const data = await this.props.user.profile();
    this.props.changedUserData();
    this.setState({ user: data });
  }

  render() {
    //const { following_count, followers_count } = this.state.user;
    const { loop_ids } =
      this.props.userData || {};
    //console.log(loop_ids);
    for (var key of Object.keys(loop_ids)) {
        console.log(key + " -> " + loop_ids[key])
    }

    return (
      <SafeAreaView style={[styles.profileHeader]}>
        <View style={[styles.mainSection]}>
          <View style={styles.userDetails}>
            <Text style={styles.userDetails}>{"1: " + loop_ids[1]}</Text>
            <Text style={styles.userDetails}>{"2: " + loop_ids[2]}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const margin = 15;

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: "#fff",
    paddingBottom: margin,
    width: 100 + "%"
  },
  profileHeaderShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },

  mainSection: {
    width: 100 + "%",
    height: 150,
    marginTop: 90,
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  userDetails: {
    flex: 1
  },
  userName: {
    fontSize: 39,
    fontWeight: "600",
    color: "#364047"
  },
  userUrl: {
    fontSize: 12,
    color: "#364047"
  },
  userDesc: {
    fontSize: 14,
    fontWeight: "500",
    color: "#364047",
    lineHeight: 19,
    marginTop: 7
  },
  statSection: {
    paddingLeft: margin * 2,
    paddingRight: margin,
    flexDirection: "row"
  }
});