import React from 'react';

import {RoleStore} from './role.store';

export const Stores = {
  roleStore: new RoleStore(),
};

export const Contexts = {
  roleContext: React.createContext(Stores.roleStore),
};
