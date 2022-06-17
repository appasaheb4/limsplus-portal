import React from 'react';

import {SampleContainerStore} from './sample-container.store';

export const Stores = {
  sampleContainerStore: new SampleContainerStore(),
};

export const Contexts = {
  sampleContainerContext: React.createContext(Stores.sampleContainerStore),
};
