import React from 'react';

import PatientRegistrationStore from './patient-registration.store';

export const Stores = {
  patientRegistationStore: new PatientRegistrationStore(),
};

export const Contexts = {
  patientRegistrationContext: React.createContext(
    Stores.patientRegistationStore,
  ),
};

export * from './patient-manager.store';
export * from './patient-visit.store';
export * from './patient-order.store';
export * from './patient-test.store';
export * from './patient-result.store';
