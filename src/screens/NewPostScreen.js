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

// Topbar
import Topbar from '../components/Topbar';

class NewPost extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loops: {
              1: "My Loops",
              2: "Buddies",
              3: "Soccer"
          },
          selected_ids: [1]
      };
    }

    // back button onPress
    toFeed = () => {
        this.props.navigation.navigate("Home")
    }

    // adds or removes selected loops to this.state.selected_ids
    addSendLoop = ( id ) => {
        if(!this.state.selected_ids.includes(parseInt(id))) {
            this.setState({
                selected_ids: this.state.selected_ids.concat(parseInt(id))
            })
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
        var loopslist = []
        for (var key in this.state.loops) {
            if (this.state.loops.hasOwnProperty(key)) {
                loopslist.push( [ key, this.state.loops[key] ] );
            }
        }
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
        <StatusUpdateForm 
            feedGroup="timeline"
            height={200} 
            onSuccess={() => this.toFeed()}
        />

        </View>
      );
    }
  
  }
  
export default NewPost;

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