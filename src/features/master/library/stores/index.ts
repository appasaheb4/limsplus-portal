import React from 'react';

import {LibraryStore} from './library.store';

export const Stores = {
  libraryStore: new LibraryStore(),
};

export const Contexts = {
  libraryContext: React.createContext(Stores.libraryStore),
};
