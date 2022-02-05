import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD2omCWik2y4JW-6jl2OgH0h8d5URDuXVg",
    authDomain: "instagram-clone-4d8c0.firebaseapp.com",
    projectId: "instagram-clone-4d8c0",
    storageBucket: "instagram-clone-4d8c0.appspot.com",
    messagingSenderId: "162213265320",
    appId: "1:162213265320:web:1e4b5bd35dcc878c37e79d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage();

export { db, auth,storage};