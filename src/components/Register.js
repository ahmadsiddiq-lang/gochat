/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Button} from 'native-base';
// import app from '../config/firebase';
import firebase from 'firebase';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      loading: 0,
    };
  }
  register = (email, password) => {
    if (
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.inserUser();
          this.props.navigation.navigate('Login');
        });
      this.setState({loading: 1});
    } else {
      Alert.alert('Form Empty !');
    }
  };

  inserUser = () => {
    firebase
      .firestore()
      .collection('users')
      .add({
        email: this.state.email,
        username: this.state.username,
      })
      .then(ref => {
        console.log(ref);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={style.Container}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            opacity: this.state.loading,
            position: 'absolute',
            top: '65%',
            zIndex: 1,
          }}
        />
        <View style={style.Content}>
          <View style={style.FormBox}>
            <TextInput
              placeholder="Username"
              onChangeText={username => this.setState({username})}
              style={style.Form}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              style={style.Form}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              style={style.Form}
            />
          </View>
          <Button
            onPress={() =>
              this.register(
                this.state.email,
                this.state.password,
                this.state.username,
              )
            }
            style={style.ButtonRegister}>
            <Text style={style.TextRegister}>Register</Text>
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

export default Register;
