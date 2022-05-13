import React from 'react';

import {SalesTeamStore} from './sales-team.store';

export const Stores = {
  salesTeamStore: new SalesTeamStore(),
};

export const Contexts = {
  salesTeamContext: React.createContext(Stores.salesTeamStore),
};
