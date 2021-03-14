// Import UI components
import React, {Component} from 'react';
import { 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    View, Text, 
    Image,
    TouchableOpacity } from 'react-native';

// icons
import down from '../assets/chevron-down.png';
import up from '../assets/chevron-up.png';
import people from '../assets/people.png';
import peopleo from '../assets/people-outline.png';
import add from '../assets/person-add.png';
import addo from '../assets/person-add-outline.png';


class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Alert button
    toNotifs = () => {
        this.props.navigation.navigate("Notifications")
    }

    toggleList = () => {
        this.props.showlist(this.props.shown);
    }
    
    render() {
        return (
            <View style={styles.topBarBox}>
            <View style={styles.topBar}>

                <Text style={[styles.feedTitle, this.props.center ? {flex: 1} : null]}>{this.props.title}</Text>

                {this.props.loopsdown ? 
                <TouchableOpacity 
                    style={styles.loops_dropdown} 
                    onPress={() => this.toggleList()}>
                    <Image source={this.props.shown ? up : down} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
                </TouchableOpacity>
                : null }

                {this.props.back ? 
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                : null }

                {this.props.addfriend ? 
                <TouchableOpacity 
                    style={styles.friend_button} 
                    onPress={() => this.props.addfriend()}>
                    <Image source={this.props.addFriendOpen ? add : addo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
                </TouchableOpacity>
                : null }

                {this.props.showfriendsbutton ? 
                <TouchableOpacity 
                    style={styles.friend_button} 
                    onPress={() => this.props.showFriendsList()}>
                    <Image source={this.props.showfriends ? people : peopleo} style={{ height: 25, width: 25, alignSelf: 'center',  }}/>
                </TouchableOpacity>
                : null }

            </View>
            </View>
      );
    }
}
  
export default Topbar;
  
const styles = StyleSheet.create({
    topBarBox: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        height: 60,
        flexDirection: 'row',
    },
    feedTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    loops_dropdown: {
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 3,
    },
    button: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 100,
        borderColor: 'black',
        alignContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        position: 'absolute',
        backgroundColor: '#009BCB',
    },
    buttonText: {
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        color: 'black',
    },
    friend_button: {
        height: 30,
        width: 30,
        borderColor: 'black',
        alignContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 20,
    },
});