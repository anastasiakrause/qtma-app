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

    // Feed button
    toHome = () => {
      this.props.navigation.navigate("Home")
    }

    // New post button
    toStatusScreen = () => {
        this.props.navigation.navigate("Status")
    }

    // Profile button
    toProfile = () => {
        this.props.navigation.navigate("Profile")
    }
  
    render() {
        let { name, url, desc, profileImage, coverImage } =
        this.props.userData || {};

        return (
            <View style={localstyles.topBarBox}>
            <View style={localstyles.topBar}>

            <TouchableOpacity 
                style={[localstyles.button]} 
                onPress={() => this.toHome()}>
                <Image source={this.props.homesc ? home : homeo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toStatusScreen()}>
                <Image source={this.props.newsc ? plus : pluso} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toProfile()}>
                <Image source={this.props.profsc ? guy : guyo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
            </TouchableOpacity>

            </View>
            </View>
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
    }
});