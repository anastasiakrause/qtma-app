// Import UI components
import React, {Component} from 'react';
import { 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    View, Text, 
    TouchableOpacity } from 'react-native';
import { Avatar } from 'expo-activity-feed';
// Firebase auth
import auth from '@react-native-firebase/auth';
// Import stylesheet
import {styles} from '../styles/styles.js';

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

    // Alert button
    toNotifs = () => {
        this.props.navigation.navigate("Notifications")
    }
  
    render() {
        let { name, url, desc, profileImage, coverImage } =
        this.props.userData || {};

        return (
            <View style={localstyles.topBarBox}>
            <View style={localstyles.topBar}>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toStatusScreen()}>
                <Text style={localstyles.buttonText}>New Post</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toHome()}>
                <Text style={localstyles.buttonText}>Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.button} 
                onPress={() => this.toNotifs()}>
                <Text style={localstyles.buttonText}>Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={localstyles.profileButton} 
                onPress={() => this.toProfile()}>
                <Avatar source={profileImage} size={40} />
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
        height: 40,
        width: '25%',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'black',
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
        height: 40,
        width: 40,
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