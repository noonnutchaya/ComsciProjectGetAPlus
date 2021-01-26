import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZjj8SMfD2ZahFWv8ng_rrAWyxb-X7h5c",
    authDomain: "comsciproject-c79ec.firebaseapp.com",
    projectId: "comsciproject-c79ec",
    storageBucket: "comsciproject-c79ec.appspot.com",
    messagingSenderId: "898186785329",
    appId: "1:898186785329:web:cc12d2f219adaa1c4e1b10",
    measurementId: "G-WXW2NXJGW7"
  };

firebase.initializeApp(firebaseConfig) ;

const storage = firebase.storage();

export {
  storage, firebase as default
}
