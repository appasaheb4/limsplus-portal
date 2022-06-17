import React from 'react';

import AssetsStore from './assets.store';

export const Stores = {
  assetsStore: new AssetsStore(),
};

export const Contexts = {
  assetsContext: React.createContext(Stores.assetsStore),
};
