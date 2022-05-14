import React from 'react';

import {MasterAnalyteStore} from './master-analyte.store';

export const Stores = {
  masterAnalyteStore: new MasterAnalyteStore(),
};

export const Contexts = {
  masterAnalyteContext: React.createContext(Stores.masterAnalyteStore),
};
