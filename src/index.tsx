import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './global.scss';
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <div>
    <App />
  </div>,
);

// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
