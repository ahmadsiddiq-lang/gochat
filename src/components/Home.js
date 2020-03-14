/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Container, Header, Body, Right, Button, Icon, Title} from 'native-base';
import ListChat from './ListChat';
class Home extends Component {
  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor={'#05e3fc'}
          style={{backgroundColor: '#05e3fc'}}>
          <Body>
            <Title>GoChat</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <ListChat props={this.props} />
      </Container>
    );
  }
}

export default Home;
