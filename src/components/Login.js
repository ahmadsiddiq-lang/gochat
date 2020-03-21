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
  TouchableHighlight,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import firebase from 'firebase';
import {StackActions} from '@react-navigation/native';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: 0,
      user: '',
    };
  }
  login = (email, password) => {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.props.navigation.dispatch(StackActions.replace('Home'));
          this.setState({loading: 0});
          this.clearForm();
        })
        .catch(err => console.log(err));
      this.setState({loading: 1});
    } else {
      Alert.alert('Form Empty !');
    }
  };
  clearForm = () => {
    this.setState({
      email: '',
      password: '',
    });
  };
  gotoRegister = () => {
    this.props.navigation.navigate('Register');
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
            top: '50%',
            zIndex: 1,
          }}
        />
        <StatusBar backgroundColor="#05e3fc" barStyle="light-content" />
        <Image style={style.ImageIcon} source={require('../asset/icon.png')} />
        <Text style={style.TitleLogin}>GoChat</Text>
        <View style={style.Content}>
          <View style={style.FormBox}>
            <TextInput
              value={this.state.email}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              style={style.Form}
            />
            <TextInput
              value={this.state.password}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={true}
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
        <TouchableHighlight onPress={() => this.gotoRegister()}>
          <Text style={style.backtologin}>Register</Text>
        </TouchableHighlight>
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
    marginTop: '10%',
  },
  ImageIcon: {
    top: '5%',
    width: 150,
    height: 150,
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
    marginLeft: '40%',
  },
  TitleLogin: {
    fontSize: 50,
    top: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  backtologin: {
    marginTop: 40,
  },
});

export default Register;
