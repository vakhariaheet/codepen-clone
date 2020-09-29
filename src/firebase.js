import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC7eGyIF2YramJO1I17b9HE0r3cVCEIUvY",
  authDomain: "codepen-e9316.firebaseapp.com",
  databaseURL: "https://codepen-e9316.firebaseio.com",
  projectId: "codepen-e9316",
  storageBucket: "codepen-e9316.appspot.com",
  messagingSenderId: "646035277972",
  appId: "1:646035277972:web:96364356ed0dafe8e8cc81",
  measurementId: "G-2W9H4MH5G3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
