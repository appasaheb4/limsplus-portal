import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./firebase-messaging-sw.js')
//     .then(function (registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     })
//     .catch(function (err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// }

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
