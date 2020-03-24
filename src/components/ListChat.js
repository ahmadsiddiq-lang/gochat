/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage} from 'react-native';
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
      curentPosition: {},
    };
  }

  getChat = () => {
    if (this.state.user) {
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
    if (this.state.user.email) {
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
    if (this.state.user.email) {
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

  trackMaps = async () => {
    const user = await AsyncStorage.getItem('user');
    if (this.state.curentPosition && user) {
      let data = {
        latitude: this.state.curentPosition.latitude,
        longitude: this.state.curentPosition.longitude,
      };
      app
        .firestore()
        .collection('Maps')
        .doc(user)
        .set(data);
    }
  };

  getCoordinate = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // Alert.alert(position)
        // console.log(position.coords)
        const {longitude, latitude} = position.coords;
        let data = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0,
          longitudeDelta: 0.05,
        };
        this.setState({
          curentPosition: data,
        });
        this.trackMaps();
        // console.warn(longitude, latitude);
      },
      error => console.log(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };

  componentDidMount = () => {
    this.getAllusers();
    this.getUser();
    setTimeout(() => {
      this.getChat();
      this.getFriends();
    }, 1000);
    this.getCoordinate();
    setInterval(() => {
      this.trackMaps();
    }, 60000);
  };

  render() {
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
