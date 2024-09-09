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
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth'

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

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
        if(!userAuth) return;

        const userDocRef = doc(db, 'users', userAuth.uid)

        const userSnapshot = await getDoc(userDocRef);


        if(!userSnapshot.exists()){
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                })

            } catch (error){
                console.log('error creating the user', error.message);
            }
        }
    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
