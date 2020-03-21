import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import app from '../config/firebase';
import {Icon, Button} from 'native-base';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: [],
      user: '',
      mydata: '',
    };
  }

  getProfile = () => {
    if (this.state.user.email === this.state.mydata.email) {
      app
        .firestore()
        .collection('users')
        .onSnapshot(user => {
          user.forEach(doc => {
            if (doc.data().email === this.state.user.friend) {
              this.setState({
                dataUser: doc.data(),
              });
            }
          });
        });
    } else {
      app
        .firestore()
        .collection('users')
        .onSnapshot(user => {
          user.forEach(doc => {
            if (doc.data().email === this.state.user.email) {
              this.setState({
                dataUser: doc.data(),
              });
            }
          });
        });
    }
  };

  getUser = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({
        mydata: user,
      });
    });
  };
  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.route.params,
    });
    this.getUser();
    setTimeout(() => {
      this.getProfile();
    }, 1000);
  };
  render() {
    const data = this.state.dataUser;
    return (
      <View style={style.Container}>
        <StatusBar backgroundColor="#636363" barStyle="light-content" />
        <View style={style.Banner}>
          <Image
            source={require('../asset/Desert.png')}
            style={style.imgBanner}
          />
        </View>
        <View style={style.Content}>
          <View style={style.BoxImg}>
            <Image source={{uri: data.image}} style={style.Img} />
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
          <Text style={style.TextUpdate}>Follow</Text>
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
  imgBanner: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  Content: {
    top: 120,
    width: '85%',
    backgroundColor: 'white',
    height: '75%',
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
    width: 140,
    height: 140,
    maxWidth: 140,
    maxHeight: 140,
    opacity: 1,
    borderRadius: 70,
    top: 7,
  },
  Name: {
    fontWeight: 'bold',
    fontSize: 30,
    top: 10,
    color: '#636363',
  },
  boxIcon: {
    flexDirection: 'row',
    marginTop: 50,
  },
  iconfb: {
    color: '#57ffff',
    fontSize: 50,
  },
  icontw: {
    color: '#57ffff',
    fontSize: 50,
    marginLeft: 50,
  },
  BoxFollow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  flwing: {
    left: -5,
    fontSize: 18,
    color: '#636363',
  },
  flwer: {
    left: -5,
    fontSize: 18,
    color: '#636363',
    marginLeft: 100,
  },
  BoxFol: {
    flexDirection: 'row',
    marginTop: 10,
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
    width: 60,
    maxWidth: 150,
    maxHeight: 200,
    right: 0,
    position: 'absolute',
  },
  text: {
    top: 10,
    color: '#636363',
  },
  buttonUpdate: {
    top: 50,
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
    top: 60,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#57ffff',
  },
});

export default Profile;
