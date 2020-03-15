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
      email: '',
      password: '',
      loading: 0,
    };
  }
  login = (email, password) => {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.props.navigation.navigate('Home');
        });
      this.setState({loading: 1});
    } else {
      Alert.alert('Form Empty !');
    }
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
            onPress={() => this.login(this.state.email, this.state.password)}
            style={style.ButtonRegister}>
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
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '40%',
  },
});

export default Register;
