import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCU_IfHNjr_EjyJwQ5-aZwRf6TdWtehazM",
    authDomain: "day-planer-c694c.firebaseapp.com",
    databaseURL: "https://day-planer-c694c.firebaseio.com",
    projectId: "day-planer-c694c",
    storageBucket: "day-planer-c694c.appspot.com",
    messagingSenderId: "585747683644",
    appId: "1:585747683644:web:5fbac3656b8789190ae639",
    measurementId: "G-3BQJRM7536"
  };

  const fb = firebase.initializeApp(firebaseConfig);
  export default fb;