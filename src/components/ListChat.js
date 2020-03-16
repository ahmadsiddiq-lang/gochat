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
      user: '',
      sendData: '',
    };
  }

  getFriends = () => {
    app
      .firestore()
      .collection('friends')
      .onSnapshot(friens => {
        let dataFriends = [];
        friens.forEach(doc => {
          if (
            doc.data().email === this.state.user.email ||
            doc.data().friend === this.state.user.email
          ) {
            dataFriends.push({...doc.data(), index: doc.id});
            this.setState({
              sendData: doc.data(),
            });
          }
        });
        this.setState({
          dataFriends: dataFriends,
        });
      });
  };

  getUser = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
      });
    });
  };

  gotoChat = data => {
    this.props.props.navigation.navigate('Chat', data);
  };
  NewFriends = () => {
    const data = this.state.sendData;
    this.props.props.navigation.navigate('NewFriends', data);
  };

  componentDidMount = () => {
    this.getUser();
    setTimeout(() => {
      this.getFriends();
    }, 1000);
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.dataFriends.map(friends => {
            return (
              <List key={friends.friend}>
                <ListItem onPress={() => this.gotoChat(friends)} avatar>
                  <Left>
                    <Thumbnail source={require('../asset/profile.png')} />
                  </Left>
                  <Body>
                    {friends.friend === this.state.user.email ? (
                      <Text>{friends.usernameA}</Text>
                    ) : (
                      <Text>{friends.usernameB}</Text>
                    )}
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
