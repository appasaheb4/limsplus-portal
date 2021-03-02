import React from 'react';

import DepartmentStore from './department-store';

export const Stores = {
  departmentStore: new DepartmentStore(),
};

export const Contexts = {
  departmentContext: React.createContext(Stores.departmentStore),
};
