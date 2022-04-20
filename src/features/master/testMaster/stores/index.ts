import React from 'react';

import {TestMasterStore} from './testMaster-store';

export const Stores = {
  testMasterStore: new TestMasterStore(),
};

export const Contexts = {
  testMasterContext: React.createContext(Stores.testMasterStore),
};
