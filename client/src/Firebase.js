// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// require("dotenv").config()

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// console.log(firebaseConfig, "firebaseconfig")
// console.log(process.env.REACT_APP_API_KEY, "process.env")
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// console.log(app, "app")
// // const auth = getAuth(app);
// const db = getFirestore(app);
// console.log(db, "db")
// // const storage = getStorage(app);

// // export { auth, db, storage };
// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3pWoYpugSslQ8HGh1PUgWHsXHbDwi-Cs",
  authDomain: "chat-away-98e33.firebaseapp.com",
  databaseURL: "http://chat-away-98e33.firebaseapp.com",
  projectId: "chat-away-98e33",
  storageBucket: "chat-away-98e33.appspot.com",
  messagingSenderId: "274759572130",
  appId: "1:274759572130:web:32344e6c7deb62120a95fb",
  measurementId: "G-3GZWDMDBTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db, "db")
console.log(firebaseConfig, "firebaseconfig")
// const analytics = getAnalytics(app);

export { db };
