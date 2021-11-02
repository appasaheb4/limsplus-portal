import React from 'react';

import LabMappingStore from './rolemapping-store';
 
export const Stores = {
  roleMappingStore: new LabMappingStore(),
};

export const Contexts = {
  roleMappingContext: React.createContext(Stores.roleMappingStore),
};
