import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTmneNW7OpDZkq8DwZiBcBzMlyF9by-Fg",
  authDomain: "valkie-d4c74.firebaseapp.com",
  projectId: "valkie-d4c74",
  storageBucket: "valkie-d4c74.appspot.com",
  messagingSenderId: "424808548649",
  appId: "1:424808548649:web:35f96fff3f6282440a0f38",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
