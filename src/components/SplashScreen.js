import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={style.BoxImage}>
      <Image style={style.Image} source={require('../asset/icon.png')} />
    </View>
  );
};

const style = StyleSheet.create({
  BoxImage: {
    alignItems: 'center',
  },
  Image: {
    top: 160,
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
