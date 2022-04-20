import React from 'react';

import {LoginStore} from './LoginStore';

export const Stores = {
  loginStore: new LoginStore(),
};

export const Contexts = {
  loginContext: React.createContext(Stores.loginStore),
};
export * from './LoginStore';
