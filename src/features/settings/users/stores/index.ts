import React from 'react';

import {UserStore} from './UsersStore';

export const Stores = {
  userStore: new UserStore(),
};

export const Contexts = {
  userContext: React.createContext(Stores.userStore),
};
