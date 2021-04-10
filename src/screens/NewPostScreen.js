// React native and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamApp } from 'react-native-activity-feed';

// api imports
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
  StatusUpdateForm
} from 'react-native-activity-feed';

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
          selected_ids: [],
          selected_names: [],  
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
    addSendLoop = ( id , lName) => {
        // adding
        if(!this.state.selected_ids.includes(id)) {
            const idlist = this.state.selected_ids;
            idlist.push(id);
            this.setState({ selected_ids: idlist }); // I think rerender needs a setState to be called
            this.state.selected_names.push(lName);
        // removing
        } else {
            const idlist = this.state.selected_ids;
            idlist.splice(idlist.indexOf(id), 1);
            this.setState({ selected_ids: idlist });
            this.state.selected_names = this.state.selected_names.filter(e=> e !== lName);
        }
        // console.log(this.state.selected_names.map(el=>'loop:' + el));// this.state.selected_ids);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // renders all loops in this.state.loops
    renderLoops() {
        // random loop tag colors
        const colors = [
            "#99E2FF",
            "#EDAE49",
            "#CC99FF",
            "#FF9999"
        ]
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
                    this.state.selected_ids.includes(loop[0]) ? 
                    {backgroundColor: colors[this.getRandomInt(4)]} : 
                    null]}
                onPress={() => this.addSendLoop(loop[0], loop[1])}
                >
                <Text style={styles.looptext}>{loop[1]}</Text>
                </TouchableOpacity>
            );
        });
    }

    // runs on post success
    gotoHome = () => {
        this.props.navigation.navigate("Home");
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
        <ScrollView 
            horizontal={true} 
            style={styles.loopsbox}
            showsHorizontalScrollIndicator={false}
        >
            {this.renderLoops()}
        </ScrollView>

        <Text style={styles.subhead}>Make your post:</Text>
        
        <StatusUpdateForm 
            feedGroup="user"
            height={220}
            modifyActivityData = {(data) => ({...data, to: this.state.selected_names.map(el => 'loop:' + el), loops: this.state.selected_names})}
            onSuccess={() => this.gotoHome()}
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
        paddingBottom: 10,
        maxHeight: 34,
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