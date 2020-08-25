import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/styles.js';

Loading = () => (
  <View style={styles.form}>
    <ActivityIndicator
      size="large"
      color="#1e90ff"
      style={styles.loading}></ActivityIndicator>
  </View>
);

export default Loading;
