import React from 'react';

import {DoctorsStore} from './doctor.store';

export const Stores = {
  doctorsStore: new DoctorsStore(),
};

export const Contexts = {
  doctorsContext: React.createContext(Stores.doctorsStore),
};
