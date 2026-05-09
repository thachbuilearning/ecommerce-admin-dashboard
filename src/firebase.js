import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNoeYMr3I9XcCYM2wsAo5vwYPous7rSqg",
    authDomain: "my1stnodejs-ecommercelama.firebaseapp.com",
    projectId: "my1stnodejs-ecommercelama",
    storageBucket: "my1stnodejs-ecommercelama.appspot.com",
    messagingSenderId: "342314743536",
    appId: "1:342314743536:web:6a11e9ad93fdf6e8ca7435",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;