/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Item,
  Input,
} from 'native-base';

class NewFriends extends Component {
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
            <Title>NewFriends</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <View searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
        </View>
      </Container>
    );
  }
}

export default NewFriends;
