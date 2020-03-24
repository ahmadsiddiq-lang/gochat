import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import ListChat from './ListChat';
import Register from './Register';
import Chat from './Chat';
import NewFriends from './NewFriends';
import Login from './Login';
import MyProfile from './MyProfile';
import Profile from './Profile';
import app from '../config/firebase';
import Splash from './SplashScreen';

const Stack = createStackNavigator();

function App() {
  const [login, setLogin] = useState(false);
  const [ready, setReady] = useState(false);
  const [positionMap, curentPosition] = useState(false);

  const checkLogin = () => {
    app.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user !== null) {
        setLogin(true);
        setReady(true);
      } else {
        setLogin(false);
        setReady(true);
      }
    });
  };

  const trackMaps = async () => {
    const user = await AsyncStorage.getItem('user');
    if (positionMap) {
      let data = {
        latitude: positionMap.latitude,
        longitude: positionMap.longitude,
      };
      app
        .firestore()
        .collection('Maps')
        .doc(user)
        .set(data);
    }
  };

  const getCoordinate = () => {
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
        curentPosition(data);
        trackMaps();
        // console.warn(longitude, latitude);
      },
      error => console.log(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => checkLogin(), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCoordinate(), []);
  return (
    <>
      {ready ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={login ? 'Home' : 'Login'}
            headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ListChat" component={ListChat} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="NewFriends" component={NewFriends} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Splash" component={Splash} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Splash />
      )}
    </>
  );
}

export default App;
