import React from 'react';

import {TestAnalyteMappingStore} from './testAnalyteMapping-store';

export const Stores = {
  testAnalyteMappingStore: new TestAnalyteMappingStore(),
};

export const Contexts = {
  testAnalyteMappingContext: React.createContext(
    Stores.testAnalyteMappingStore,
  ),
};
