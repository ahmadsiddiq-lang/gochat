import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import app from '../config/firebase';
import {Icon, Button} from 'native-base';

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: [],
    };
  }

  getProfile = () => {
    app
      .firestore()
      .collection('users')
      .onSnapshot(user => {
        user.forEach(doc => {
          if (doc.data().email === 'ahmadsaja96.as@gmail.com') {
            this.setState({
              dataUser: doc.data(),
            });
          }
        });
      });
  };

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  componentDidMount = () => {
    this.getProfile();
  };
  render() {
    const data = this.state.dataUser;
    return (
      <View style={style.Container}>
        <StatusBar backgroundColor="#636363" barStyle="light-content" />
        <View style={style.Banner}>
          <Image style={style.imgBanner} />
        </View>
        <View style={style.Content}>
          <View style={style.BoxImg}>
            <Image source={require('../asset/profile.png')} style={style.Img} />
          </View>
        </View>
        <Text style={style.Name}>{data.username}</Text>
        <Text style={style.text}>{data.email}</Text>
        <View style={style.boxIcon}>
          <Icon style={style.iconfb} name="logo-facebook" />
          <Icon style={style.icontw} name="logo-twitter" />
        </View>
        <View style={style.BoxFollow}>
          <Text style={style.flwing}>Following</Text>
          <Text style={style.flwer}>Follower</Text>
        </View>
        <View style={style.BoxFol}>
          <View style={style.boxfoll}>
            <Text style={style.folwing}>34</Text>
          </View>
          <View style={style.boxfollwer}>
            <Text style={style.folwer}>4</Text>
          </View>
        </View>
        <Button style={style.buttonUpdate}>
          <Text style={style.TextUpdate}>Update</Text>
        </Button>
        <Button onPress={() => this.gotoHome()} style={style.buttonCencel}>
          <Text style={style.TextUpdate}>Cencel</Text>
        </Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Container: {
    backgroundColor: '#ceedf2',
    height: '100%',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  Banner: {
    width: '100%',
    height: '30%',
    backgroundColor: '#636363',
  },
  Content: {
    top: 120,
    width: '85%',
    backgroundColor: 'white',
    height: '83%',
    position: 'absolute',
    borderRadius: 10,
    alignItems: 'center',
  },
  BoxImg: {
    borderWidth: 3,
    borderColor: '#57ffff',
    width: 160,
    height: 160,
    borderRadius: 90,
    position: 'absolute',
    top: -90,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  Img: {
    maxWidth: 140,
    maxHeight: 140,
    top: 6,
    opacity: 1,
  },
  Name: {
    fontSize: 40,
    top: -70,
  },
  boxIcon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconfb: {
    color: '#57ffff',
    fontSize: 60,
  },
  icontw: {
    color: '#57ffff',
    fontSize: 60,
    marginLeft: 50,
  },
  BoxFollow: {
    flexDirection: 'row',
    marginTop: 100,
  },
  flwing: {
    left: -5,
    fontSize: 25,
    color: '#636363',
  },
  flwer: {
    left: -5,
    fontSize: 25,
    color: '#636363',
    marginLeft: 100,
  },
  BoxFol: {
    flexDirection: 'row',
    marginTop: 30,
    width: 220,
  },
  folwing: {
    fontSize: 20,
    left: 0,
    color: '#636363',
    textAlign: 'center',
  },
  folwer: {
    fontSize: 20,
    left: 0,
    textAlign: 'center',
    color: '#636363',
  },
  boxfoll: {
    maxWidth: 150,
    maxHeight: 200,
    marginRight: 50,
    position: 'absolute',
  },
  boxfollwer: {
    maxWidth: 150,
    maxHeight: 200,
    right: 0,
    position: 'absolute',
  },
  text: {
    top: -60,
  },
  buttonUpdate: {
    top: 120,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#57ffff',
  },
  TextUpdate: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    left: '130%',
  },
  buttonCencel: {
    top: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#57ffff',
  },
});

export default MyProfile;
