import React from 'react';

import {RoleMappingStore} from './rolemapping-store';
 
export const Stores = {
  roleMappingStore: new RoleMappingStore(),
};

export const Contexts = {
  roleMappingContext: React.createContext(Stores.roleMappingStore),
};
