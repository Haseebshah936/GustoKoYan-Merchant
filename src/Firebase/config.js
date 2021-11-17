import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, firebaseApp };
