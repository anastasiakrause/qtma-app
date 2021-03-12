// @flow

// React native and gui component imports
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
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
// import { styles } from '../styles/styles';

class NewLoop extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loop_name: "",
          loop_code: "123456",
          done: false
      };
    }

    createLoop = () => {
        // add create loop functionality
        if(this.state.loop_name){
            this.setState({done: true})
        } else {
            Alert.alert("Loop name cannot be blank!")
        }
    }
    
    render() {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>

        <Topbar 
            title={this.state.done ? "Loop Created!" : "Create Loop"} 
            center={true} 
            back={true}
            navigation={this.props.navigation}
        />

        {this.state.done ?
        <>
            <Text style={styles.subhead}>Your Loop Code is:</Text>
            <Text style={styles.loopCode}>{this.state.loop_code}</Text>
            <Text style={styles.loopCodeSub}>Your friends can use this code to join the loop.</Text>
        </>
        :
        <>

        <Text style={styles.subhead}>Name your loop:</Text>
        <TextInput 
            style={styles.loopNameInput}
            onChangeText={text =>this.setState({loop_name: text})}
            autoFocus
            clearTextOnFocus
        />

        <TouchableOpacity 
          style={styles.loopButton}
          onPress={() => this.createLoop()}
        >
          <Text style={styles.buttonText}>Create Loop</Text>
        </TouchableOpacity>

        </>
        }

        </View>
      );
    }
  
  }
  
export default NewLoop;

const styles = StyleSheet.create({
    subhead: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20
    },
    loopNameInput: {
        marginTop: 10,
        marginHorizontal: 20,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#A6A6A6"
    },
    loopButton: {
        width: '50%',
        alignSelf: 'center',
        marginBottom: 10,
        paddingVertical: 5,
        borderWidth: 0,
        borderRadius: 50,
        backgroundColor: '#FF9999',
        borderWidth: 1,
        marginTop: 30,
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loopCode: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100
    },
    loopCodeSub: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5
    }
})