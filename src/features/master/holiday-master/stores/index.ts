import React from 'react';

import { HolidayMasterStore } from './holiday-master.store';

export const Stores = {
  holidayMasterStore: new HolidayMasterStore(),
};

export const Contexts = {
  holidayMasterContext: React.createContext(Stores.holidayMasterStore),
};
