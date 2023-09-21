// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_t2MjgDMybGat720vc76ldKW5pV6Pk7k",
  authDomain: "survirun-webview.firebaseapp.com",
  projectId: "survirun-webview",
  storageBucket: "survirun-webview.appspot.com",
  messagingSenderId: "60237515561",
  appId: "1:60237515561:web:a5a6bdd3b99042c8eac538",
  measurementId: "G-KW0RL5NF2N"
};

//* firebaseConfig 정보로 firebase 시작
const fbaseApp = initializeApp(firebaseConfig);
//* firebase의 storage 인스턴스를 변수에 저장
export const fstorage = getStorage(fbaseApp);