import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import styles from '../styles/styles';

export default class HomeCard extends React.Component {
  render() {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Card title</Title>
        </Card.Content>
        <Card.Cover
          source={{uri: 'https://picsum.photos/700'}}
          style={(padding = 20)}
        />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    );
  }
}
