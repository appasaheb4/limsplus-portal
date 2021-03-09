import React from 'react';

import CommunicationStore from './communication-store';
import SegmentMappingStore from './segmentMapping-store';

export const Stores = {
  communicationStore: new CommunicationStore(),
  segmentMappingStore: new SegmentMappingStore(),
};

export const Contexts = {
  communicationContext: React.createContext(Stores.communicationStore),
  segmentMappingContext: React.createContext(Stores.segmentMappingStore)
};
