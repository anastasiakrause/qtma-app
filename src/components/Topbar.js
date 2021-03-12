// Import UI components
import React, {Component} from 'react';
import { 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    View, Text, 
    TouchableOpacity } from 'react-native';


class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // Alert button
    toNotifs = () => {
        this.props.navigation.navigate("Notifications")
    }
    
    render() {
        return (
            <View style={styles.topBarBox}>
            <View style={styles.topBar}>

                <Text style={styles.feedTitle}>{this.props.title}</Text>

                {this.props.navigation ? 
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.toNotifs()}>
                    <Text style={styles.buttonText}>!</Text>
                </TouchableOpacity>
                : null }

                {this.props.addfriend ? 
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.addfriend()}>
                    <Text style={styles.buttonText}>+</Text>
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
        width: '90%',
        alignSelf: 'center',
        height: 60,
        flexDirection: 'row',
    },
    feedTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center'
    },
    button: {
        height: 30,
        width: 30,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'black',
        alignContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
    },
    buttonText: {
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
});