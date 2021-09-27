import React from 'react';

import {LoginStore} from './login-store';

export const Stores = {
  loginStore: new LoginStore(),
};

export const Contexts = {
  loginContext: React.createContext(Stores.loginStore),
};
