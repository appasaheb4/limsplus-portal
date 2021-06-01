import React from 'react';

import LookupStore from './lookup-store';

export const Stores = {
  lookupStore: new LookupStore(),
};

export const Contexts = {
  lookupContext: React.createContext(Stores.lookupStore),
};
