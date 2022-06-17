import React from 'react';

import {SampleTypeStore} from './sample-type.store';

export const Stores = {
  sampleTypeStore: new SampleTypeStore(),
};

export const Contexts = {
  sampleTypeContext: React.createContext(Stores.sampleTypeStore),
};
