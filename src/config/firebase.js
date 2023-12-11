import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { GoogleAuthProvider } from 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAF-YH5paQltjkw1aPJ_Rms30NaSXtdVfY",
    authDomain: "resenhapp-181ca.firebaseapp.com",
    projectId: "resenhapp-181ca",
    storageBucket: "resenhapp-181ca.appspot.com",
    messagingSenderId: "827979057440",
    appId: "1:827979057440:web:1d67c2f6ba19752e136f45" 
})

export const db = firebase.firestore()
export const auth = firebase.auth()
export const googleProvider = new GoogleAuthProvider()

