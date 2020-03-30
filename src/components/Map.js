/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Modal,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Spinner,
} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import '@react-native-community/geolocation';
import app from '../config/firebase';
navigator.geolocation = require('@react-native-community/geolocation');

class Map extends Component {
  constructor() {
    super();
    this.state = {
      curentPosition: false,
      positionFriend: {},
      dataFriend: '',
      user: '',
      modalVisible: false,
    };
  }

  getPosition = async () => {
    const user = await AsyncStorage.getItem('user');
    const data = this.props.route.params;
    if (data) {
      if (data.email !== user) {
        app
          .firestore()
          .collection('Maps')
          .doc(data.email)
          .get()
          .then(dataPosition => {
            this.setState({
              positionFriend: dataPosition.data(),
            });
            // console.log(dataPosition.data())
          });
      } else {
        app
          .firestore()
          .collection('Maps')
          .doc(data.friend)
          .get()
          .then(dataPosition => {
            this.setState({
              positionFriend: dataPosition.data(),
            });
            // console.log(dataPosition.data())
          });
      }
    }
  };

  dataFriend = async () => {
    const user = await AsyncStorage.getItem('user');
    this.setState({
      dataFriend: this.props.route.params,
      user: user,
    });
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
        // console.warn(longitude, latitude);
      },
      error => console.log(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };
  gotoChat = () => {
    this.props.navigation.navigate('Chat');
  };
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
  componentDidMount() {
    setTimeout(() => {
      this.getCoordinate();
    }, 1000);
    this.getPosition();
    this.dataFriend();
  }
  render() {
    console.log(this.state.dataFriend);
    const data = this.state.curentPosition;
    const dataMarker = this.state.positionFriend;
    const dataFriend = this.state.dataFriend;
    const user = this.state.user;
    return (
      <Container>
        <Header
          androidStatusBarColor={'#05e3fc'}
          style={{backgroundColor: '#05e3fc'}}>
          <Left>
            <Button onPress={() => this.gotoChat()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Position</Title>
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
        <View style={styles.container}>
          {data && dataMarker !== null ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              initialRegion={data}
              followsUserLocation={true}
              showsUserLocation>
              {dataFriend.email !== user ? (
                <Marker
                  style={styles.marker}
                  title={dataFriend.usernameA}
                  coordinate={dataMarker}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      borderWidth: 5,
                      borderColor: '#A5EACF',
                    }}
                    source={{
                      uri: dataFriend.imageA,
                    }}
                  />
                </Marker>
              ) : (
                <Marker
                  style={styles.marker}
                  title={dataFriend.usernameB}
                  coordinate={dataMarker}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      borderWidth: 5,
                      borderColor: '#A5EACF',
                    }}
                    source={{
                      uri: dataFriend.imageB,
                    }}
                  />
                </Marker>
              )}
            </MapView>
          ) : (
            <Spinner style={styles.loading} />
          )}
        </View>
        <View style={{marginTop: 22}}>
          <Modal
            style={styles.Modal}
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.BoxModal}>
              <View>
                <Text
                  onPress={() => this.gotoProfile(this.state.dataFriend)}
                  style={styles.Text}>
                  Profile
                </Text>
                <Text onPress={() => this.gotoHome()} style={styles.Text}>
                  Home
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.Text}>Cencel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 58,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#A5EACF',
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
  loading: {
    bottom: '50%',
  },
});

export default Map;
