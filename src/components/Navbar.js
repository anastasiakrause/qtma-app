// Import UI components
import React, {Component} from 'react';
import { 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    View, Text, 
    TouchableOpacity,
    Image } from 'react-native';
import { Avatar } from 'expo-activity-feed';
// Firebase auth
import auth from '@react-native-firebase/auth';
// Import stylesheet
import {styles} from '../styles/styles.js';

// Import icon components
import home from '../assets/home.png';
import homeo from '../assets/home-outline.png';
import plus from '../assets/plus-square.png';
import pluso from '../assets/plus-square-outline.png';
import guy from '../assets/person.png';
import guyo from '../assets/person-outline.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreationTab: false
        };
    }

    // New post button
    toggleCreationTab = () => {
        this.setState({showCreationTab: !this.state.showCreationTab});
    }

    // Feed button
    toHome = () => {
      this.props.navigation.navigate("Home")
    }

    // to new post screen
    toNewPost = () => {
        this.props.navigation.navigate("NewPost")
        this.setState({showCreationTab: false})
    }

    toNewLoop = () => {
        this.props.navigation.navigate("NewLoop")
        this.setState({showCreationTab: false})
    }

    // Profile button
    toProfile = () => {
        this.props.navigation.navigate("Profile")
    }
  
    render() {
        let { name, url, desc, profileImage, coverImage } =
        this.props.userData || {};

        return (
            <>

            <View style={localstyles.topBarBox}>
            <View style={localstyles.topBar}>

            <TouchableOpacity 
                style={[localstyles.button]} 
                onPress={() => this.toHome()}>
                <Image source={this.props.homesc ? home : homeo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toggleCreationTab()}>
                <Image source={this.state.showCreationTab ? plus : pluso} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toProfile()}>
                <Image source={this.props.profsc ? guy : guyo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            </View>
            </View>
            
            { this.state.showCreationTab ?
            <View style={localstyles.creation_menu}>
                <Text style={localstyles.subhead}>What do you want to create?</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity 
                    style={localstyles.postButton}
                    onPress={() => this.toNewPost()}
                    >
                    <Text style={localstyles.buttonText}>New Post!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={localstyles.loopButton}
                    onPress={() => this.toNewLoop()}
                    >
                    <Text style={localstyles.buttonText}>~New Loop~</Text>
                    </TouchableOpacity>
                </View>
            </View>
            : null
            }
            </>
      );
    }
  }
  
  export default Navbar;
  
const localstyles = StyleSheet.create({
    topBarBox: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        width: '90%',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    button: {
        width: 40,
        alignContent: 'center',
    },
    buttonText: {
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    profileButton: {
        minHeight: 30,
        minWidth: 30,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    feedTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        fontStyle: 'italic',
    },
    creation_menu: {
        position: 'absolute',
        width: '100%',
        bottom: 60,
        backgroundColor: 'white',
        alignContent: 'space-around',
    },
    subhead: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    postButton: {
        width: '30%',
        alignSelf: 'center',
        backgroundColor: '#99E2FF',
        paddingVertical: 5,
        borderRadius: 50,
        borderWidth: 1,
        marginRight: 10,
    },
    loopButton: {
        width: '30%',
        alignSelf: 'center',
        paddingVertical: 5,
        borderWidth: 0,
        borderRadius: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginLeft: 10,
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    }
});