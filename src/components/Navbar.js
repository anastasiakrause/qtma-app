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
  
    render() {
        let { name, url, desc, profileImage, coverImage } =
        this.props.userData || {};

        return (
            <View style={localstyles.topBarBox}>
            <View style={localstyles.topBar}>

            <TouchableOpacity 
                style={[localstyles.button, this.props.homesc ? {backgroundColor: 'black'}:null]} 
                onPress={() => this.toHome()}>
                <Text style={[localstyles.buttonText, this.props.homesc ? {color: 'white'}:null]}>L</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[localstyles.button, this.props.newsc ? {backgroundColor: 'black'}:null]} 
                onPress={() => this.toStatusScreen()}>
                <Text style={[localstyles.buttonText, this.props.newsc ? {color: 'white'}:null]}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[localstyles.profileButton, this.props.profsc ? {borderWidth: 1}:null]} 
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
        width: 40,
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
        minHeight: 40,
        minWidth: 40,
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