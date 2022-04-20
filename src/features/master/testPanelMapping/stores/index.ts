import React from 'react';

import {TestPanelMappingStore} from './testPanelMapping-store';

export const Stores = {
  testPanelMappingStore: new TestPanelMappingStore(),
};

export const Contexts = {
  testPanelMappingContext: React.createContext(Stores.testPanelMappingStore),
};
