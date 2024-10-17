
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQfV18jWlufBzV1DG71nNlwrXBjtvZ3Xc",
  authDomain: "newsapp-6c7f8.firebaseapp.com",
  projectId: "newsapp-6c7f8",
  storageBucket: "newsapp-6c7f8.appspot.com",
  messagingSenderId: "645406153441",
  appId: "1:645406153441:web:8eaf1c81f16347374db5a0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
