import React from 'react';
import {RefernceRangesStore} from './reference-ranges.store';

export const Stores = {
  referenceRangesStore: new RefernceRangesStore(),
};
export const Contexts = {
  referenceRangesContext: React.createContext(Stores.referenceRangesStore),
};
