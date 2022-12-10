import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBSEVfJAzr5qYLFmpF3yZQUp-bm56YtXbE',
  authDomain: 'lims-plus-854e4.firebaseapp.com',
  databaseURL: 'https://lims-plus-854e4-default-rtdb.firebaseio.com',
  projectId: 'lims-plus-854e4',
  storageBucket: 'lims-plus-854e4.appspot.com',
  messagingSenderId: '723104013699',
  appId: '1:723104013699:web:bca08f35ba368978216ab6',
  measurementId: 'G-7CKTV11Q6S',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
