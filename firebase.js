import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDRHkTRoN2GMxJAcw9H-fqt-ogWseLvar0",
  authDomain: "smart-india-cf986.firebaseapp.com",
  projectId: "smart-india-cf986",
  storageBucket: "smart-india-cf986.appspot.com",
  messagingSenderId: "452455533370",
  appId: "1:452455533370:web:454b50e517a44bce7dde03",
};

const iniApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

var db = iniApp.firestore();

export { db };
