importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
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
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log(event);
});
