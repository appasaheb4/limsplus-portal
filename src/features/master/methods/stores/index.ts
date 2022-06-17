import React from 'react';

import {MethodsStore} from './method.store';

export const Stores = {
  methodsStore: new MethodsStore(),
};

export const Contexts = {
  methodsContext: React.createContext(Stores.methodsStore),
};
