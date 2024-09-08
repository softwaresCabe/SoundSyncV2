import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAAhaB_JkcLNZo7jeGW9_mIYkeIm58LP_o",
  authDomain: "soundsync-426706.firebaseapp.com",
  projectId: "soundsync-426706",
  storageBucket: "soundsync-426706.appspot.com",
  messagingSenderId: "299455983656",
  appId: "1:299455983656:web:76738ae8e55ed7ba8d051d",
  measurementId: "G-0TM1XRJN4F"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()){
        const {displayNme, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayNme,
                email,
                createdAt
            })

        } catch (error){
            console.log('error creating the user', error.message);
        }
    }
   return userDocRef;
}

