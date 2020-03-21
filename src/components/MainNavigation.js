import React, {useEffect, useState} from 'react';
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

  useEffect(() => checkLogin(), []);
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
