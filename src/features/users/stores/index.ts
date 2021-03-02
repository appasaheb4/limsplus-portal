import React from 'react';

import UserStore from './user-store';

export const Stores = {
  userStore: new UserStore(),
};

export const Contexts = {
  userContext: React.createContext(Stores.userStore),
};
