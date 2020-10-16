import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_h3vSw6vwoQCRYDQhkHWXfKTrbu1zbqQ",
    authDomain: "reactblog-12e56.firebaseapp.com",
    databaseURL: "https://reactblog-12e56.firebaseio.com",
    projectId: "reactblog-12e56",
    storageBucket: "reactblog-12e56.appspot.com",
    messagingSenderId: "377438658779",
    appId: "1:377438658779:web:0d66a17bd4693a7da5ecfe"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

export {db, auth};