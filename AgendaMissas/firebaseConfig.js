import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCaATsMHWaeYAaoiidnzqK1RuE9RsKTi8",
  authDomain: "com.danielbrito.agendamissas",
  projectId: "agenda-de-missas",
  storageBucket: "agenda-de-missas.appspot.com",
  messagingSenderId: "86216330705",
  appId: "1:86216330705:android:a4f253538edd180da464f0",
};

// Inicialize o Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Configura o Firestore
const db = getFirestore(app);

console.log("DB Inicializado:", db); // Verifique se db é inicializado corretamente

export { app, db };