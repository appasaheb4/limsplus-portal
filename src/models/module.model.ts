import React from 'react';
export interface Definition {
  label: string;
  icon: string;
  path: string;
  category: string;
  component: string;
  description?: string;
  enable?: boolean;
}

export interface Module {
  Definition: Definition[];
  Scenes: {
    [key: string]: React.FunctionComponent;
  };
}

export interface Modules {
  [key: string]: Module;
}
