/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import ListChat from './ListChat';
import firebase from 'firebase';
import Maps from './Maps';

class Home extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  gotoMyprofile = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('MyProfile');
  };
  logOut = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('Login');
    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }, 1000);
    AsyncStorage.removeItem('user');
  };
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
            <Button
              onPress={() => {
                this.setModalVisible(true);
              }}
              transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading style={style.Tabst}>
                <Icon name="ios-chatbubbles" />
              </TabHeading>
            }>
            <ListChat props={this.props} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={style.Tabst}>
                <Icon name="ios-map" />
              </TabHeading>
            }>
            <Maps />
          </Tab>
        </Tabs>
        <View style={{marginTop: 22}}>
          <Modal
            style={style.Modal}
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={style.BoxModal}>
              <View>
                <Text onPress={() => this.gotoMyprofile()} style={style.Text}>
                  My Profile
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={style.Text}>Cencel</Text>
                </TouchableHighlight>
                <Text onPress={() => this.logOut()} style={style.Text}>
                  Logout
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  Tabst: {
    backgroundColor: '#05e3fc',
    color: '#05e3fc',
  },
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

export default Home;
