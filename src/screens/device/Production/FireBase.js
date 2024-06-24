import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAK8CawtD-YuhyLr4GllcbZiixYDWHe-1k",
    authDomain: "ota-testing-54b0e.firebaseapp.com",
    projectId: "ota-testing-54b0e",
    storageBucket: "ota-testing-54b0e.appspot.com",
    messagingSenderId: "88961585160",
    appId: "1:88961585160:web:bdfd3074c7bd10489c41bd"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);