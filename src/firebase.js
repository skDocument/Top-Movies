import {initializeApp} from 'firebase/app';

let firebaseConfig = {
    apiKey: "AIzaSyBLPEwN5esMgqQWXTPKXJw-2lbJxBUZZ5Q",
    authDomain: "top-movies-c7048.firebaseapp.com",
    projectId: "top-movies-c7048",
    storageBucket: "top-movies-c7048.appspot.com",
    messagingSenderId: "309037199010",
    appId: "1:309037199010:web:8054fa00e16ee91571b1fb"
};

const firebaseI = initializeApp(firebaseConfig)

export {firebaseI as firebase}