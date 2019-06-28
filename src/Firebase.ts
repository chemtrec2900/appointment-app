import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAF_teGnwcjpAvIIvsXt4e4fio2xRAGpo",
  authDomain: "demodb-meetings.firebaseapp.com",
  databaseURL: "https://demodb-meetings.firebaseio.com",
  projectId: "demodb-meetings",
  storageBucket: "",
  messagingSenderId: "1082835017463",
  appId: "1:1082835017463:web:67fedf8d748729b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
