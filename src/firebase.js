import firebase from 'firebase/app';
import 'firebase/messaging';
//import {fireEvent} from 'react-app-events';

const firebaseConfig = {
  apiKey: 'AIzaSyDD6wgEjzaMQ_K9h2hcokebQ_nY8NbNzIs',
  authDomain: 'limsplus-portal.firebaseapp.com',
  projectId: 'limsplus-portal',
  storageBucket: 'limsplus-portal.appspot.com',
  messagingSenderId: '915349017907',
  appId: '1:915349017907:web:bbfd24b8af34f47fba5a46',
  measurementId: 'G-BGFMC3E248',
};
firebase.initializeApp(firebaseConfig);

const firebaseMessaging = firebase.messaging();
export const getToken = () =>
  new Promise((resolve, reject) => {
    try {
      firebaseMessaging
        .getToken({
          vapidKey:
            'BCPJi3XEAiTnorOIhMurr1HNXlPRXuTssenqxoEDZfX06VrcKKEzs2BW3fnEK_z5bldXIkLB7B83SJpvfZb0DMU',
        })
        .then(currentToken => {
          if (currentToken) {
            resolve(currentToken);
            return currentToken;
          } else {
            alert('Please enable notification permission');
            return;
          }
        })
        .catch(err => {
          alert('Please enable notification permission');
          console.log('An error occurred while retrieving token.', err);
        });
    } catch (error) {
      reject(error);
    }
  });

export const onMessageListener = () =>
  new Promise(resolve => {
    firebase.messaging().onMessage(payload => {
      //fireEvent('notificationPopup', payload);
      console.log({payload});
      setTimeout(() => {
        resolve(payload);
      }, 1000);
    });
  });
