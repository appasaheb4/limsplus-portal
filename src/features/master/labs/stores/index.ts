import React from 'react';

import {LabStore} from './lab-store';

export const Stores = {
  labStore: new LabStore(),
};

export const Contexts = {
  labContext: React.createContext(Stores.labStore),
};
