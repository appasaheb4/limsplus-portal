import React from 'react';

import {SectionStore} from './section-store';

export const Stores = {
  sectionStore: new SectionStore(),
};

export const Contexts = {
  sectionContext: React.createContext(Stores.sectionStore),
};
