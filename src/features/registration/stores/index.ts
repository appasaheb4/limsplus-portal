import React from 'react';

import PatientRegistrationStore from './patientRegistration-store';

export const Stores = {
  patientRegistationStore: new PatientRegistrationStore(),
};

export const Contexts = {
  patientRegistrationContext: React.createContext(
    Stores.patientRegistationStore,
  ),
};

export * from './patientManager-store';
export * from './patientVisit-store';
export * from './patientOrder-store';
export * from './patientTest-store';
export * from './patientResult-store';
