import React from 'react';

import { TatMasterStore } from './tat-master.store';

export const Stores = {
  tatMasterStore: new TatMasterStore(),
};

export const Contexts = {
  libraryContext: React.createContext(Stores.tatMasterStore),
};
