import React from 'react';

import LookupStore from './lookup-store';

export const Stores = {
  LookupStore: new LookupStore(),
};

export const Contexts = {
  LookupContext: React.createContext(Stores.LookupStore),
};
