import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import ListChat from './ListChat';
import SignUp from './SignUp';
import Chat from './Chat';
import NewFriends from './NewFriends';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListChat" component={ListChat} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="NewFriends" component={NewFriends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
