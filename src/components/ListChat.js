/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
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
      loading: 1,
    };
  }

  getChat = () => {
    if (this.state.user !== null) {
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
    }
  };

  getAllusers = () => {
    if (this.state.user.email !== null) {
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
    }
  };

  getFriends = () => {
    if (this.state.user !== null) {
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
            loading: 0,
          });
        });
    }
  };

  getUser = () => {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
        });
      }
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
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            opacity: this.state.loading,
            position: 'absolute',
            top: '50%',
            left: '45%',
            // zIndex: 1,
          }}
        />
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
