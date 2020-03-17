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
      users: [],
      sendData: '',
      messages: '',
      data: [],
    };
  }

  getChat = () => {
    console.log(this.state.user.email);
    app
      .firestore()
      .collection('chat')
      .onSnapshot(chat => {
        const dataChat = this.state.users;
        chat.forEach(doc => {
          if (
            doc.data().email === this.state.user.email ||
            doc.data().sendto === this.state.user.email
          ) {
            dataChat.push({...doc.data(), index: doc.id});
          }
        });
        this.setState({
          messages: dataChat,
        });
      });
  };

  getAllusers = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(users => {
        let dataUsers = [];
        users.forEach(doc => {
          if (doc.data().email !== this.state.user.email) {
            dataUsers.push({...doc.data(), index: doc.id});
          }
        });
        this.setState({
          users: dataUsers,
        });
      });
  };

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
    this.getAllusers();
    this.getUser();
    setTimeout(() => {
      this.getChat();
      this.getFriends();
    }, 1000);
  };

  render() {
    console.log(this.state.dataFriends);
    return (
      <Container>
        <Content>
          {this.state.dataFriends.map(friends => {
            return (
              <List key={friends.friend}>
                <ListItem onPress={() => this.gotoChat(friends)} avatar>
                  {friends.friend === this.state.user.email ? (
                    <Left>
                      <Thumbnail source={{uri: friends.imageA}} />
                    </Left>
                  ) : (
                    <Left>
                      <Thumbnail source={{uri: friends.imageB}} />
                    </Left>
                  )}
                  <Body>
                    {friends.friend === this.state.user.email ? (
                      <Text>{friends.usernameA}</Text>
                    ) : (
                      <Text>{friends.usernameB}</Text>
                    )}
                    <Text note>Selamat malam bro</Text>
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
