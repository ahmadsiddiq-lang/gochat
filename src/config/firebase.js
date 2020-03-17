// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCrU4VVIAGY48HXhGTknqI_8hh5fs0NOZE",
//     authDomain: "message-789d7.firebaseapp.com",
//     databaseURL: "https://message-789d7.firebaseio.com",
//     projectId: "message-789d7",
//     storageBucket: "message-789d7.appspot.com",
//     messagingSenderId: "636894697495",
//     appId: "1:636894697495:web:a56af6b2ce7e5924302452"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdg35a7umPVb4mKoyBtkETYCmu_oGLPyo',
  authDomain: 'gochat-8d5dd.firebaseapp.com',
  databaseURL: 'https://gochat-8d5dd.firebaseio.com',
  projectId: 'gochat-8d5dd',
  storageBucket: 'gochat-8d5dd.appspot.com',
  messagingSenderId: '1034025662118',
  appId: '1:1034025662118:web:cda20a2ac0276e9ef72667',
};
const app = firebase.initializeApp(firebaseConfig);
export default app;
