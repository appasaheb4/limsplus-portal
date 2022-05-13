import React from 'react';

import {AdministrativeDivisionsStore} from './administrative-divisions.store';

export const Stores = {
  administrativeDivStore: new AdministrativeDivisionsStore(),
};

export const Contexts = {
  administrativeDivContext: React.createContext(Stores.administrativeDivStore),
};
