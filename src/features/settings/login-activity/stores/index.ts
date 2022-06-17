import React from 'react';

import {LoginActivityStore} from './login-activity.store';

export const Stores = {
  loginActivityStore: new LoginActivityStore(),
};

export const Contexts = {
  loginActivityContext: React.createContext(Stores.loginActivityStore),
};
