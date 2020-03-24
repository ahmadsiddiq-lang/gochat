import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Spinner} from 'native-base';
import '@react-native-community/geolocation';
import app from '../config/firebase';
navigator.geolocation = require('@react-native-community/geolocation');

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      curentPosition: false,
    };
  }

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

  componentDidMount() {
    this.getCoordinate();
    setInterval(() => {
      this.trackMaps();
    }, 60000);
  }

  render() {
    const data = this.state.curentPosition;
    return (
      <View style={styles.container}>
        {data ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={data}
            showsUserLocation>
            {/* <Marker coordinate={data} /> */}
          </MapView>
        ) : (
          <Spinner />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
