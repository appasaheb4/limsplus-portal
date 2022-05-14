import React from 'react';

import {ShortcutMenuStore} from './short-cut-menu.store';

export const Stores = {
  shortcutMenuStore: new ShortcutMenuStore(),
};

export const Contexts = {
  shortcutMenuContext: React.createContext(Stores.shortcutMenuStore),
};
