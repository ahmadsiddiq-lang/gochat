/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
            dataUsers.push({...doc.data(), index: doc.id});
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
          dataUsers.push({...doc.data(), index: doc.id});
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
        email: 'ahmadsaja96.as@gmail.com',
        friend: friend,
        status: false,
      });
  };

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  componentDidMount = () => {
    this.getAllusers();
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
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail
                      square
                      source={require('../asset/profile.png')}
                    />
                  </Left>
                  <Body>
                    <Text>{users.username}</Text>
                  </Body>
                  <Right>
                    <Button
                      style={style.BtnAdd}
                      onPress={() => this.addFriend(users.email)}
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
