import React from 'react';

import {DeliveryScheduleStore} from './delivery-schedule.store';

export const Stores = {
  deliveryScheduleStore: new DeliveryScheduleStore(),
};

export const Contexts = {
  deliveryScheduleContext: React.createContext(Stores.deliveryScheduleStore),
};
