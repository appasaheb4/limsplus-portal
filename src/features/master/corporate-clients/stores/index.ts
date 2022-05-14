import React from 'react';

import {CorporateClientsStore} from './corporate-clients.store';

export const Stores = {
  corporateClientsStore: new CorporateClientsStore(),
};

export const Contexts = {
  corporateClientsContext: React.createContext(Stores.corporateClientsStore),
};
