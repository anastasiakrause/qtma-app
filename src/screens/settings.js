import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from '../styles/styles.js';
import signout from '../firebase/functions';
import auth from '@react-native-firebase/auth';

import {Avatar, Button, Title, Card, IconButton} from 'react-native-paper';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.pageTitle}>{'Profile'}</Text>
        </View>

        <Button
          style={styles.authButton}
          mode="outlined"
          onPress={() => auth().signOut()}
          color="#1e90ff"
          compact={false}>
          Sign Out
        </Button>
      </View>
    );
  }
}

export default SettingsScreen;
