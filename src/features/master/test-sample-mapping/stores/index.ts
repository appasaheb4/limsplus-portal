import React from 'react';

import {TestSampleMappingStore} from './test-sample-mapping.store';

export const Stores = {
  testSampleMappingStore: new TestSampleMappingStore(),
};

export const Contexts = {
  testSampleMappingContext: React.createContext(Stores.testSampleMappingStore),
};
