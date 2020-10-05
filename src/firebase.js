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
export const auth = firebase.auth();
export default firebase;

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signinWithGoogle = () =>
  auth.signInWithRedirect(googleAuthProvider);

export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
export const signinWithTwitter = () =>
  auth.signInWithRedirect(twitterAuthProvider);

export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
export const signinWithGithub = () =>
  auth.signInWithRedirect(githubAuthProvider);
