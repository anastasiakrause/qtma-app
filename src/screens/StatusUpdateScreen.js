// @flow

// React native and gui component imports
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
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

class StatusUpdateScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    // back button onPress
    toFeed = () => {
        this.props.navigation.navigate("Home")
    }
    
    render() {
      return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>

        <View style={styles.topBarBox}>
        <View style={styles.topBar}>
          <Text style={styles.feedTitle}>New Post</Text>
        </View>
        </View>

        <StatusUpdateForm 
            feedGroup="timeline"
            height={200} 
            onSuccess={() => this.toFeed()}
        />
  
        </SafeAreaView>
      </SafeAreaProvider>
      );
    }
  
  }
  
export default StatusUpdateScreen;

const styles = StyleSheet.create({
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
},
backButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
},
plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
},
})