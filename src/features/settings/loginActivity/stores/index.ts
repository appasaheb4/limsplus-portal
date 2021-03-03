import React from 'react';

import LoginActivityStore from './loginActivity-store';
  
export const Stores = {
  loginActivityStore: new LoginActivityStore(),
};

export const Contexts = {
  loginActivityContext: React.createContext(Stores.loginActivityStore),
};
