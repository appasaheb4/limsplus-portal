import React from 'react';

import {TestMasterStore} from './test-master.store';

export const Stores = {
  testMasterStore: new TestMasterStore(),
};

export const Contexts = {
  testMasterContext: React.createContext(Stores.testMasterStore),
};
