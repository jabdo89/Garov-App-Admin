import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJw23LISlNz7E8hbKk9aqRYK53rxIGT48',
  authDomain: 'garov-3c5b2.firebaseapp.com',
  projectId: 'garov-3c5b2',
  storageBucket: 'garov-3c5b2.appspot.com',
  messagingSenderId: '451240460429',
  appId: '1:451240460429:web:6409be76e527062e6862c4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const { auth, firestore: db } = firebase;

export { auth, db };
