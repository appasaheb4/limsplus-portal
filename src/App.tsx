import React from 'react';
import {observer} from 'mobx-react';
import {ToastContainer, ModalLoader} from '@/library/components';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import {configure} from 'mobx';
import {I18nextProvider} from 'react-i18next';
import i18next, {setLanguage} from './localization';

import store from './redux/store/index';
import Routes from './routes/root-route';

// toast
import 'react-toastify/dist/ReactToastify.css';

import {stores} from '@/stores';

import hydrateStore from '@/library/modules/startup';
import {ApolloProvider, client} from '@/library/modules/apolloClient';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyBSEVfJAzr5qYLFmpF3yZQUp-bm56YtXbE",
//   authDomain: "lims-plus-854e4.firebaseapp.com",
//   projectId: "lims-plus-854e4",
//   storageBucket: "lims-plus-854e4.appspot.com",
//   messagingSenderId: "723104013699",
//   appId: "1:723104013699:web:52a9edfd4c898101216ab6",
//   measurementId: "G-46WKN1KLQM"
// };

configure({
  reactionScheduler: (f): void => {
    setTimeout(f, 1);
  },
});

const App = observer(() => {
  setLanguage();
  const loader = async () => {
    await hydrateStore('loginStore', stores.loginStore);
    await hydrateStore('routerStore', stores.routerStore);
    await hydrateStore('appStore', stores.appStore);
  };

  React.useEffect(() => {
    loader();
  }, []);

  return (
    <>
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
        {stores.flagLoading && stores.loading && <ModalLoader />}
      </ApolloProvider>
    </>
  );
});
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default App;
