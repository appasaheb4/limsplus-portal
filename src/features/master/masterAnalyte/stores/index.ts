import React from 'react';

import {MasterAnalyteStore} from './masterAnalyte-store';

export const Stores = {
  masterAnalyteStore: new MasterAnalyteStore(),
};

export const Contexts = {
  masterAnalyteContext: React.createContext(Stores.masterAnalyteStore),
};
