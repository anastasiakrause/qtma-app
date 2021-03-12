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

                <Text style={[styles.feedTitle, this.props.center ? {flex: 1} : null]}>{this.props.title}</Text>

                {this.props.back ? 
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
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
});