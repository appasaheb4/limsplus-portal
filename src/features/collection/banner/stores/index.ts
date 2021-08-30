import React from 'react';

import BannerStore from './banner-store';

export const Stores = {
  bannerStore: new BannerStore(),
};

export const Contexts = {
  bannerContext: React.createContext(Stores.bannerStore),
};
