import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from '../../styles/styles';
import signout from '../../firebase/functions';
import auth from '@react-native-firebase/auth';
import {Appbar} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {Avatar, Button, Title, Paragraph, Card} from 'react-native-paper';
import HomeCard from '../../components/card';

class HomeScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.pageTitle}>{'Home'}</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Example</Title>
            </Card.Content>
            <Card.Cover
              source={{uri: 'https://picsum.photos/700'}}
              style={(padding = 20)}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Example</Title>
            </Card.Content>
            <Card.Cover
              source={{uri: 'https://picsum.photos/600'}}
              style={(padding = 20)}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Example</Title>
            </Card.Content>
            <Card.Cover
              source={{uri: 'https://picsum.photos/500'}}
              style={(padding = 20)}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Example</Title>
            </Card.Content>
            <Card.Cover
              source={{uri: 'https://picsum.photos/400'}}
              style={(padding = 20)}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Example</Title>
            </Card.Content>
            <Card.Cover
              source={{uri: 'https://picsum.photos/300'}}
              style={(padding = 20)}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
