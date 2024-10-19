import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuQ0_RYY98O-LZ4_shc2KNsv9qq1feNos",
  authDomain: "kykmenu-cc9c7.firebaseapp.com",
  projectId: "kykmenu-cc9c7",
  storageBucket: "kykmenu-cc9c7.appspot.com",
  messagingSenderId: "547542680911",
  appId: "1:547542680911:web:a8aea7268dae7f4797313a"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



const db = getFirestore(app); 

export { auth, db };
export default app;