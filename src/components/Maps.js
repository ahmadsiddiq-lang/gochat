import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      curentPosition: {},
    };
  }

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
        console.warn(data);
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
  };

  render() {
    const data = this.state.curentPosition;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={data}
          showsUserLocation>
          {/* <Marker coordinate={data} /> */}
        </MapView>
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
