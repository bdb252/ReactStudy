import {initializeApp, getApps} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
  databaseURL: import.meta.env.VITE_databaseURL
}

// const app = initializeApp(firebaseConfig);
// const realtime = getDatabase(app);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const realtime = getDatabase(app);
export {realtime};