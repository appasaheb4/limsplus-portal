import React from 'react';

import CommunicationStore from './communication-store';

export const Stores = {
  communicationStore: new CommunicationStore(),
};

export const Contexts = {
  communicationContext: React.createContext(Stores.communicationStore),
};
