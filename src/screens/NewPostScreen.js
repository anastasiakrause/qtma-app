// @flow

// React native and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamApp } from "expo-activity-feed";

// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'expo-activity-feed';

// Topbar
import Topbar from '../components/Topbar';

export default function NewPostScreen(props) {
    return (
      <StreamApp.Consumer>
        {appCtx => <NewPost {...props} {...appCtx} />}
      </StreamApp.Consumer>
    );
  }

class NewPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          selected_ids: [1]
      };
    }

    async componentDidMount() {
        const data = await this.props.user.profile();
        this.props.changedUserData();
        this.setState({ user: data });
      }
    // back button onPress
    toFeed = () => {
        this.props.navigation.navigate("Home")
    }

    // adds or removes selected loops to this.state.selected_ids
    addSendLoop = ( id ) => {
        // adding
        if(!this.state.selected_ids.includes(parseInt(id))) {
            this.setState({
                selected_ids: this.state.selected_ids.concat(parseInt(id))
            })
        // removing
        } else {
            var array = [...this.state.selected_ids]; // make a separate copy of the array
            var index = array.indexOf(parseInt(id))
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({selected_ids: array});
            }
        }
    }

    // renders all loops in this.state.loops
    renderLoops() {
        // casting dict to a list
        var loopslist = []
        //for (var key in this.state.loops) {
        for (var key in this.props.userData.loop_ids) {
            if (this.props.userData.loop_ids.hasOwnProperty(key)) {
                loopslist.push( [ key, this.props.userData.loop_ids[key] ] );
            }
        }
        // for loop - looping through list
        return loopslist.map(loop => {
            return (
                <TouchableOpacity 
                style={[styles.loopbutton, 
                    this.state.selected_ids.includes(parseInt(loop[0])) ? 
                    {backgroundColor: '#FF9999'} : 
                    null]}
                onPress={() => this.addSendLoop(loop[0])}
                >
                <Text style={styles.looptext}>{loop[1]}</Text>
                </TouchableOpacity>
            );
        });
    }
    
    render() {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
        
        <Topbar 
            title="Create Post" 
            center={true} 
            back={true}
            navigation={this.props.navigation}
        />

        <Text style={styles.subhead}>Share to:</Text>
        <View style={styles.loopsbox}>
            {this.renderLoops()}
        </View>

        <Text style={styles.subhead}>Make your post:</Text>
        {/* TODO: Connect this.state.selected_ids to update form */}
        <StatusUpdateForm 
            feedGroup="timeline"
            height={200} 
            onSuccess={() => this.toFeed()}
        />

        </View>
      );
    }
  
  }
  
const styles = StyleSheet.create({
    subhead: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20
    },
    loopsbox: {
        marginHorizontal: 20,
        marginBottom: 30,
        marginTop: 5,
        flexDirection: 'row',
    },
    loopbutton: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginRight: 5
    },
    looptext: {
        fontSize: 12,
    }
})