import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc0XjDcpyMoK3GXX1qJdkPK_QMbck3yBY",
  authDomain: "cooking-ninja-site-3014b.firebaseapp.com",
  projectId: "cooking-ninja-site-3014b",
  storageBucket: "cooking-ninja-site-3014b.appspot.com",
  messagingSenderId: "1044153147150",
  appId: "1:1044153147150:web:d2b3261a9c63344c9e415f",
};

//Initializing Firebase
firebase.initializeApp(firebaseConfig);

//Initializing services, firestore in ths case
const projectFirestore = firebase.firestore();

export { projectFirestore };
