/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
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
          this.clearForm();
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
        gender: 0,
        email: this.state.email,
        username: this.state.username,
      })
      .then(ref => {
        console.log(ref);
      })
      .catch(err => console.log(err));
  };

  backtoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  clearForm = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  };
  render() {
    return (
      <View style={style.Container}>
        <StatusBar backgroundColor="#05e3fc" barStyle="light-content" />
        <Text style={style.TitleLogin}>GoChat</Text>
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
              value={this.state.username}
              placeholder="Username"
              onChangeText={username => this.setState({username})}
              style={style.Form}
            />
            <TextInput
              value={this.state.email}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              style={style.Form}
            />
            <TextInput
              value={this.state.password}
              secureTextEntry={true}
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
        <Text onPress={() => this.backtoLogin()} style={style.backtologin}>
          Back to Login
        </Text>
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
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 17,
    color: '#696969',
    fontWeight: 'bold',
  },
  ButtonRegister: {
    marginTop: 15,
    backgroundColor: '#0a7500',
  },
  TextRegister: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  TitleLogin: {
    fontSize: 50,
    top: 100,
    color: 'white',
    fontWeight: 'bold',
  },
  backtologin: {
    marginTop: 40,
  },
});

export default Register;
