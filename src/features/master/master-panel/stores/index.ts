import React from 'react';

import {MasterPanelStore} from './master-panel.store';

export const Stores = {
  masterPanelStore: new MasterPanelStore(),
};

export const Contexts = {
  masterPanelContext: React.createContext(Stores.masterPanelStore),
};
