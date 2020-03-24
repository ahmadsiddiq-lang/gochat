/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Item,
  Input,
  Text,
  Content,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import app from '../config/firebase';

class NewFriends extends Component {
  constructor() {
    super();
    this.state = {
      usersSearch: [],
      users: [],
      mydata: [],
      user: '',
    };
  }

  search = () => {
    if (this.state.usersSearch.length > 0) {
      app
        .firestore()
        .collection('users')
        .onSnapshot(users => {
          let dataUsers = [];
          users.forEach(doc => {
            if (doc.data().email !== this.state.mydata.email) {
              dataUsers.push({...doc.data(), index: doc.id});
            } else {
              this.setState({
                user: doc.data(),
              });
            }
          });
          const text = this.state.usersSearch.trim().toLowerCase();
          const data = dataUsers.filter(l => {
            return l.username.toLowerCase().match(text);
          });
          console.log(data);
          this.setState({
            users: data,
          });
        });
    }
  };

  getAllusers = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(users => {
        let dataUsers = [];
        users.forEach(doc => {
          if (doc.data().email !== this.state.mydata.email) {
            dataUsers.push({...doc.data(), index: doc.id});
          } else {
            this.setState({
              user: doc.data(),
            });
          }
        });
        this.setState({
          users: dataUsers,
        });
      });
  };

  addFriend = friend => {
    app
      .firestore()
      .collection('friends')
      .add({
        email: this.state.user.email,
        usernameA: this.state.user.username,
        friend: friend.email,
        usernameB: friend.username,
        imageA: this.state.user.image,
        imageB: friend.image,
        status: false,
      })
      .then(data => {
        Alert.alert('Success !');
      });
  };

  gotoProfile = data => {
    this.props.navigation.navigate('Profile', data);
  };

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };
  getUser = () => {
    app.auth().onAuthStateChanged(mydata => {
      this.setState({
        mydata: mydata,
      });
    });
  };

  componentDidMount = () => {
    this.getAllusers();
    this.getUser();
  };

  render() {
    return (
      <Container>
        <Header
          searchBar
          rounded
          androidStatusBarColor={'#05e3fc'}
          style={{backgroundColor: '#05e3fc'}}>
          <Item>
            <Button onPress={() => this.gotoHome()} transparent>
              <Icon style={style.icon} name="arrow-back" />
            </Button>
            <Input
              placeholder="Search"
              onChangeText={usersSearch => this.setState({usersSearch})}
            />
            <Button onPress={() => this.search()} transparent>
              <Icon style={style.icon} name="ios-search" />
            </Button>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          {this.state.users.map(users => {
            return (
              <List key={users.email}>
                <ListItem onPress={() => this.gotoProfile(users)} thumbnail>
                  <Left>
                    <Thumbnail source={{uri: users.image}} />
                  </Left>
                  <Body>
                    <Text>{users.username}</Text>
                  </Body>
                  <Right>
                    <Button
                      style={style.BtnAdd}
                      onPress={() => this.addFriend(users)}
                      transparent>
                      <Icon style={style.icon} name="person-add" />
                    </Button>
                  </Right>
                </ListItem>
              </List>
            );
          })}
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    color: '#05e3fc',
  },
  BtnAdd: {
    height: 25,
  },
});

export default NewFriends;
