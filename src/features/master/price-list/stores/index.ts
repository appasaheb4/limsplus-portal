import React from 'react';
import {PriceListStore} from './price-list.store';

export const Stores = {
  priceListStore: new PriceListStore(),
};

export const Contexts = {
  priceListContext: React.createContext(Stores.priceListStore),
};
