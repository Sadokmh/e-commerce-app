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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) { // has proprety called exists that tells us if a data exists or not
      const {displayName, email} = userAuth;
      const createdAt = new Date();
    

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }
      catch(error) {
        console.log('Error creating user', error.message);
      }
    }
    return userRef;
  };

  export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const tranformedCollection = collections.docs.map((doc) => {
      const {title, items} = doc.data();

      return {
        title,
        items,
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
      };
    });
    
    return tranformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {} );
  };

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    },
    reject)
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }); // we want always trigger the google popup when ever we use this google auth provider

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;