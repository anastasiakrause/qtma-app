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
    
    render() {
        return (
            <View style={styles.topBarBox}>
            <View style={styles.topBar}>
                <Text style={styles.feedTitle}>{this.props.title}</Text>
            </View>
            </View>
      );
    }
}
  
export default Topbar;
  
const styles = StyleSheet.create({
    topBarBox: {
        width: '100%',
        backgroundColor: '#FF9999',
    },
    topBar: {
        width: '90%',
        alignSelf: 'center',
        height: 60,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'column',
    },
    feedTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        fontStyle: 'italic',
    }
});