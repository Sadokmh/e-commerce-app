import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBLS0U2qbkPm5xydzt1ZjYKWDifOpgpzI0",
    authDomain: "ecommerce-1b0a2.firebaseapp.com",
    databaseURL: "https://ecommerce-1b0a2.firebaseio.com",
    projectId: "ecommerce-1b0a2",
    storageBucket: "ecommerce-1b0a2.appspot.com",
    messagingSenderId: "675780842339",
    appId: "1:675780842339:web:a2ae2b7cc7dcf3c964b956",
    measurementId: "G-F69980DD4V"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // we want always trigger the google popup when ever we use this google auth provider

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;