import React, {Component} from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import firebase from '../config/firebase';

class Login extends Component {
  register = (emial, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emial, password)
      .then(user => {
        this.navigation.navigate('Login');
      });
  };
  render() {
    return (
      <View style={style.Container}>
        <View style={style.Content}>
          <View style={style.FormBox}>
            <TextInput style={style.Form} />
            <TextInput style={style.Form} />
            <TextInput style={style.Form} />
          </View>
          <Button style={style.ButtonRegister}>
            <Text style={style.TextRegister}>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Container: {
    backgroundColor: '#05e3fc',
    height: '100%',
    alignItems: 'center',
  },
  Content: {
    width: '80%',
    marginTop: '30%',
  },
  Form: {
    borderColor: '#0a7500',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  ButtonRegister: {
    marginTop: 15,
    backgroundColor: '#0a7500',
  },
  TextRegister: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '40%',
  },
});

export default Login;
