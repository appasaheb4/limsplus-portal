import React from 'react';

import {RegistrationLocationsStore} from './registration-location.store';

export const Stores = {
  registrationLocationsStore: new RegistrationLocationsStore(),
};

export const Contexts = {
  registrationLocationsContext: React.createContext(
    Stores.registrationLocationsStore,
  ),
};
