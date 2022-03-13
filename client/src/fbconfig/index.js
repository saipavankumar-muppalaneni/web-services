import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5jykBWeOSTWb8X8PTyCFJDbrbEFk47CU",
  authDomain: "web-service-project-8eb02.firebaseapp.com",
  projectId: "web-service-project-8eb02",
  storageBucket: "web-service-project-8eb02.appspot.com",
  messagingSenderId: "290959485454",
  appId: "1:290959485454:web:2186297e8af01a69d8aa5f",
  measurementId: "G-8BQHFE4BHC"

};
// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();

export const auth = getAuth();

export const storage = getStorage()
