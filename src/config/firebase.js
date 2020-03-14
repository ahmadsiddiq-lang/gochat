import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfJ7ZyNpmkSCoqfpfGJhoElFWJeQPypxw',
  authDomain: 'gochat-672cd.firebaseapp.com',
  databaseURL: 'https://gochat-672cd.firebaseio.com',
  projectId: 'gochat-672cd',
  storageBucket: 'gochat-672cd.appspot.com',
  messagingSenderId: '657280147841',
  appId: '1:657280147841:web:7a7fbc58025e41ddff0880',
};
const app = firebase.initializeApp(firebaseConfig);
export default app;
