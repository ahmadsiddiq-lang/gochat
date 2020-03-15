/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Fab,
} from 'native-base';
import app from '../config/firebase';

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      dataFriends: [],
    };
  }

  getFriends = () => {
    app
      .firestore()
      .collection('friends')
      .where('email', '==', 'ahmadsaja96.as@gmail.com')
      .where('status', '==', true)
      .onSnapshot(friens => {
        let dataFriends = [];
        friens.forEach(doc => {
          dataFriends.push({...doc.data(), index: doc.id});
        });
        this.setState({
          dataFriends: dataFriends,
        });
      });
  };

  gotoChat = email => {
    this.props.props.navigation.navigate('Chat', email);
  };
  NewFriends = () => {
    this.props.props.navigation.navigate('NewFriends');
  };

  componentDidMount = () => {
    this.getFriends();
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.dataFriends.map(friends => {
            return (
              <List key={friends.friend}>
                <ListItem onPress={() => this.gotoChat(friends.friend)} avatar>
                  <Left>
                    <Thumbnail source={require('../asset/profile.png')} />
                  </Left>
                  <Body>
                    <Text>{friends.username}</Text>
                    <Text note>
                      Doing what you like will always keep you happy . .
                    </Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            );
          })}
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#05e3fc'}}
          position="bottomRight"
          onPress={() => this.NewFriends()}>
          <Icon name="person-add" />
        </Fab>
      </Container>
    );
  }
}

export default ListChat;
