import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVWSUWHtHVB5kbtV2yQn5c4nlYU_Jc6jQ",
    authDomain: "ecommerce-9f422.firebaseapp.com",
    projectId: "ecommerce-9f422",
    storageBucket: "ecommerce-9f422.appspot.com",
    messagingSenderId: "1037855398597",
    appId: "1:1037855398597:web:e5c8718e4b78ac9a762eac",
    measurementId: "G-C0DZ6P16NH"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const UserDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(UserDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(UserDocRef,
          displayName, {
            displayName,
            email,
            createdAt
          })
      }catch(error){
        console.log('error creating the user', error.message);
      }
    }
    return UserDocRef;
  }