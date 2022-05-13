import React from 'react';

import {PossibleResultsStore} from './possible-result.store';

export const Stores = {
  possibleResultsStore: new PossibleResultsStore(),
};

export const Contexts = {
  possibleResultsContext: React.createContext(Stores.possibleResultsStore),
};
