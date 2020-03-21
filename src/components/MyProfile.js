import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import app from '../config/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {Icon, Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: [],
      user: '',
      avatarSource: [],
      imageUser: '',
    };
  }

  getSelectedImages = () => {
    const image = this.state.avatarSource.uri;
    const user = this.state.dataUser;

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = app
      .storage()
      .ref('posts')
      .child(user.email);
    let mime = 'image/jpg';
    fs.readFile(image, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        // URL of the image uploaded on Firebase storage
        console.log(url);
        this.setState({
          avatarSource: url,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: response,
        });
      }
      // }
    });
  };

  getProfile = () => {
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
  };
  getUser = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
      });
    });
  };

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  getImage = async () => {
    const user = this.state.user.email;
    const ref = await app.storage().ref('posts/' + user);
    ref
      .getDownloadURL()
      .then(url => {
        // console.log(url);
        this.setState({
          imageUser: url,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  update = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(this.state.user.email)
      .set({
        gender: 0,
        email: this.state.user.email,
        username: this.state.dataUser.username,
        image: this.state.imageUser,
      })
      .then(ref => {
        console.log(ref);
      })
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.getUser();
    setTimeout(() => {
      this.getProfile();
      this.getImage();
    }, 1000);
  };
  render() {
    const data = this.state.dataUser;
    const image = this.state.imageUser;
    // console.log('ini data image : '+this.state.imageUser);
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
            {this.state.avatarSource.fileSize > 0 ? (
              <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                <Image
                  onPress={() => this.handleChoosePhoto()}
                  source={this.state.avatarSource}
                  style={style.Img}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                <Image
                  onPress={() => this.handleChoosePhoto()}
                  source={{uri: image}}
                  style={style.Img}
                />
              </TouchableOpacity>
            )}
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
        <Button
          style={style.buttonUpdate}
          onPress={() => this.getSelectedImages(data)}>
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
    borderRadius: 70,
    top: 7,
    zIndex: 1,
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

export default MyProfile;
