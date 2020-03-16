import * as React from 'react';
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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyProfile" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListChat" component={ListChat} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewFriends" component={NewFriends} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
