export interface UpdateItem {
  value: string | boolean | undefined | any[];
  dataField: string;
  id: string;
}

export interface MappingValues {
  segments?: string;
  field?: string;
  component?: any;
  field_no?: number;
  mandatory?: boolean;
  default?: string;
}

export interface Mapping {
  [key: string]: {
    values: MappingValues[];
  };
}

export * from './communication.model';
export * from './constant.model';
