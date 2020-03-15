import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import ListChat from './ListChat';
import Register from './Register';
import Chat from './Chat';
import NewFriends from './NewFriends';
import Login from './Login';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListChat" component={ListChat} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewFriends" component={NewFriends} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
