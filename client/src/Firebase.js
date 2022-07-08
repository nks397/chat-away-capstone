import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3pWoYpugSslQ8HGh1PUgWHsXHbDwi-Cs",
  authDomain: "chat-away-98e33.firebaseapp.com",
  databaseURL: "http://chat-away-98e33.firebaseapp.com",
  projectId: "chat-away-98e33",
  storageBucket: "chat-away-98e33.appspot.com",
  messagingSenderId: "274759572130",
  appId: "1:274759572130:web:32344e6c7deb62120a95fb",
  measurementId: "G-3GZWDMDBTB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
