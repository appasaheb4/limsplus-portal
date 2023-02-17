import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {ToastContainer, ModalLoader} from '@/library/components';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import {configure} from 'mobx';
import {I18nextProvider} from 'react-i18next';
import {Alert, Snackbar} from '@mui/material';

import i18next, {setLanguage} from './localization';
import store from './redux/store/index';
import Routes from './routes/root-route';
import {getToken, onMessageListener} from './firebase';
import {Toast} from 'react-bootstrap';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
//import {useOnEvent, fireEvent} from 'react-app-events';

// Toast
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import {stores} from '@/stores';

import hydrateStore from '@/library/modules/startup';
import {ApolloProvider, client} from '@/core-services/graphql/apollo-client';

// setup again new method
configure({
  reactionScheduler: f => {
    setTimeout(f, 1);
  },
});

const App = observer(() => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  setLanguage();

  const loader = async () => {
    await hydrateStore('loginStore', stores.loginStore);
    await hydrateStore('routerStore', stores.routerStore);
    await hydrateStore('appStore', stores.appStore);
    await hydrateStore(
      'patientRegistrationStore',
      stores.patientRegistrationStore,
    );
    if (!__DEV__) {
      console.log('this is prod');
      LogRocket.init('ycpqi5/limsplus-portal');
      setupLogRocketReact(LogRocket);
    }
  };

  // useOnEvent('notificationPopup', payload => {
  //   setShow(true);
  //   setNotification({
  //     title: payload.notification.title,
  //     body: payload.notification.body,
  //   });
  // });
   
  const loaderNotification = async () => {
    await getToken().then(webPushTokenFcm => {
      stores.loginStore.updateInputUser({
        ...stores.loginStore.inputLogin,
        webPushTokenFcm,
      });
    });
    onMessageListener()
      .then(payload => {
        //fireEvent('notificationPopup', payload);
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch(err => console.log('failed:', err));
  };

  React.useEffect(() => {
    loader();
    loaderNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const environments = {
    Local: 'error',
    Development: 'error',
    Qa: 'warning',
    Uat: 'info',
    Production: 'success',
  };

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
        animation
        style={{
          position: 'absolute',
          top: 100,
          right: 20,
          minWidth: 400,
          zIndex: 1,
        }}
      >
        <Toast.Header>
          <strong className='mr-auto'>{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <Routes />
            <ReduxToastr
              timeOut={5000}
              newestOnTop={true}
              position='top-right'
              transitionIn='fadeIn'
              transitionOut='fadeOut'
              progressBar
              closeOnToastrClick
            />
          </Provider>
        </I18nextProvider>
        <ToastContainer />
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Alert severity='error'>{process.env.REACT_APP_ENV}</Alert>
        </Snackbar>
        {stores.flagLoading && stores.loading && <ModalLoader />}
      </ApolloProvider>
    </>
  );
});
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default App;
