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

class Chat extends Component {
  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
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
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </Container>
    );
  }
}

export default Chat;
