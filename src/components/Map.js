import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage, Image} from 'react-native';
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
  componentDidMount() {
    this.getCoordinate();
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
          style={{backgroundColor: '#05e3fc', zIndex: 1}}>
          <Left>
            <Button onPress={() => this.gotoHome()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Map</Title>
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
          {data ? (
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
            <Spinner />
          )}
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
});

export default Map;
