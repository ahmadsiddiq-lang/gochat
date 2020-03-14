import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'native-base';
import app from '../config/firebase';
import 'firebase/firestore';

class SignUp extends Component {
  SignUp = (email, password) => {
    // app
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
        this.props.navigation.navigate('Login');
    //   });
  };
  render() {
    return (
      <View style={style.Container}>
        <ScrollView>
          <View style={style.ContentForm}>
            <View>
              <TextInput placeholder="Username" style={style.Form} />
              <TextInput placeholder="Email" style={style.Form} />
              <TextInput placeholder="Password" style={style.Form} />
            </View>
            <Button onPress={() => this.SignUp()} style={style.Button}>
              <Text style={style.TextSignUp}>SignUp</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Container: {
    height: '100%',
    backgroundColor: '#05e3fc',
    alignItems: 'center',
  },
  ContentForm: {
    marginTop: '40%',
    minWidth: '90%',
  },
  Form: {
    borderColor: '#00856c',
    marginTop: 20,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#6e6e6e',
    backgroundColor: 'white',
  },
  Button: {
    marginTop: 20,
    backgroundColor: '#17c700',
  },
  TextSignUp: {
    color: 'white',
    marginLeft: '39%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUp;
