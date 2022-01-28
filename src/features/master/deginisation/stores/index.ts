import React from 'react';

import {DeginisationStore} from './deginisation-store';

export const Stores = {
  deginisationStore: new DeginisationStore(),
};

export const Contexts = {
  deginisationContext: React.createContext(Stores.deginisationStore),
};
