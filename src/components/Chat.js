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
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import app from '../config/firebase';
import firebase from 'firebase';

class Chat extends Component {
  state = {
    messages: [],
    dataFriend: [],
    dataUser: [],
    nameChat: '',
    modalVisible: false,
    image: '',
  };

  sendMessage = text => {
    const userA = this.state.dataUser.email;
    const userB = this.state.dataFriend.friend;
    if (userA === userB) {
      app
        .firestore()
        .collection('chat')
        .add({
          chat: text,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          email: this.state.dataUser.email,
          name: this.state.dataFriend.usernameB,
          sendto: this.state.dataFriend.email,
          image: this.state.image.imageB,
        });
    } else {
      app
        .firestore()
        .collection('chat')
        .add({
          chat: text,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          email: this.state.dataUser.email,
          name: this.state.dataFriend.usernameA,
          sendto: this.state.dataFriend.friend,
          image: this.state.image.imageA,
        });
    }
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
                _id: doc.data().email === this.state.dataUser.email ? 1 : 2,
                name: doc.data().name,
                avatar: doc.data().image,
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
    this.getUser();
    this.getprofile();
    this.setState({
      dataFriend: this.props.route.params,
    });
    setTimeout(() => {
      this.getChat();
      this.getName();
    }, 1000);
  }

  getUser = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({
        dataUser: user,
      });
    });
  };

  getprofile = () => {
    // console.log(this.props.route.params);
    // if (this.props.route.params.email === this.state.dataUser.email) {
    this.setState({
      image: this.props.route.params,
    });
    // } else {
    //   this.setState({
    //     image: this.props.route.params.emailA,
    //   });
    // }
  };

  getName = async () => {
    if (this.props.route.params.email === this.state.dataUser.email) {
      this.setState({
        nameChat: this.state.dataFriend.usernameB,
      });
    } else {
      this.setState({
        nameChat: this.state.dataFriend.usernameA,
      });
    }
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  gotoProfile = data => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('Profile', data);
  };
  gotoMap = data => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('Map', data);
  };
  render() {
    // console.log(this.state.dataFriend);
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
            <Title>{this.state.nameChat}</Title>
          </Body>
          <Right>
            <Button
              onPress={() => {
                this.setModalVisible(true);
              }}
              transparent>
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
        <View style={{marginTop: 22}}>
          <Modal
            style={style.Modal}
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={style.BoxModal}>
              <View>
                <Text
                  onPress={() => this.gotoProfile(this.state.dataFriend)}
                  style={style.Text}>
                  Profile
                </Text>
                <Text
                  onPress={() => this.gotoMap(this.state.dataFriend)}
                  style={style.Text}>
                  Position
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={style.Text}>Cencel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  Modal: {
    alignContent: 'flex-end',
  },
  BoxModal: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    shadowColor: '#000',
    position: 'absolute',
    right: 5,
    top: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  Text: {
    padding: 5,
  },
});

export default Chat;
