import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC48EFe5yXKr-3VMgk76qx1TZzhlHfArMQ",
    authDomain: "rom-creator-3eb8b.firebaseapp.com",
    projectId: "rom-creator-3eb8b",
    storageBucket: "rom-creator-3eb8b.appspot.com",
    messagingSenderId: "349299034905",
    appId: "1:349299034905:web:98280efe3ae3ac41ec9388",
    measurementId: "G-14EJ1DFZLH",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);



