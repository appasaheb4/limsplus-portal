import React from 'react';

import {RoleMappingStore} from './role-mapping.store';

export const Stores = {
  roleMappingStore: new RoleMappingStore(),
};

export const Contexts = {
  roleMappingContext: React.createContext(Stores.roleMappingStore),
};
