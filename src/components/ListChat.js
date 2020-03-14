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
  Button,
  Icon,
  Fab,
} from 'native-base';

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  gotoChat = () => {
    this.props.props.navigation.navigate('Chat');
  };
  NewFriends = () => {
    this.props.props.navigation.navigate('NewFriends');
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem onPress={() => this.gotoChat()} avatar>
              <Left>
                <Thumbnail source={require('../asset/profile.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../asset/profile.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../asset/profile.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../asset/profile.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../asset/profile.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
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
