import React from 'react';

import {MethodsStore} from './methods-store';

export const Stores = {
  methodsStore: new MethodsStore(),
};

export const Contexts = {
  methodsContext: React.createContext(Stores.methodsStore),
};
