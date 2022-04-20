import React from 'react';

import {EnvironmentStore} from './EnvironmentStore';

export const Stores = {
  enviromentStore: new EnvironmentStore(),
};

export const Contexts = {
  enviromentContext: React.createContext(Stores.enviromentStore),
};
