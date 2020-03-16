/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import app from '../config/firebase';
import firebase from 'firebase';

class Chat extends Component {
  state = {
    messages: [],
    dataFriend: [],
    dataUser: [],
  };

  sendMessage = text => {
    // console.log(text)
    app
      .firestore()
      .collection('chat')
      .add({
        chat: text,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        email: this.state.dataFriend.email,
        name: this.state.dataFriend.usernameA,
        sendto: this.state.dataFriend.friend,
      });
  };

  getChat = () => {
    app
      .firestore()
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async chat => {
        const dataChat = [];
        await chat.forEach(doc => {
          if (
            (doc.data().email === this.state.dataFriend.email &&
              doc.data().sendto === this.state.dataFriend.friend) ||
            (doc.data().email === this.state.dataFriend.friend &&
              doc.data().sendto === this.state.dataFriend.email)
          ) {
            dataChat.push({
              _id: Math.random(),
              text: doc.data().chat,
              createdAt: new Date(doc.data().createdAt.toDate()),
              user: {
                _id: doc.data().email === this.state.dataFriend.email ? 1 : 2,
                name: doc.data().name,
              },
            });
          }
        });
        this.setState({
          messages: dataChat,
        });
      });
  };

  componentDidMount() {
    this.setState({
      dataFriend: this.props.route.params,
    });
    setTimeout(() => {
      this.getChat();
    }, 1000);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor={'#05e3fc'}
          style={{backgroundColor: '#05e3fc'}}>
          <Left>
            <Button onPress={() => this.gotoHome()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Chat</Title>
          </Body>
          <Right>
            <Button onPress={() => this.getChat()} transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.sendMessage(messages[0].text)}
          user={{
            _id: 1,
          }}
        />
      </Container>
    );
  }
}

export default Chat;
