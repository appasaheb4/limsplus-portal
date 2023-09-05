export class Lookup {
  _id: string;
  documentName: object;
  fieldName: string;
  arrValue: {value: string; code: string; flagUpperCase: boolean}[];
  description: string;
  defaultItem: Array<{value: string; code: string; flagUpperCase: boolean}>;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.documentName = rawData.documentName;
    this.fieldName = rawData.fieldName;
    this.arrValue = rawData.arrValue;
    this.description = rawData.description;
    this.defaultItem = rawData.defaultItem;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class LocalInput {
  code: string;
  value: string;
  flagUpperCase: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.code = rawData.code;
    this.value = rawData.value;
    this.flagUpperCase = rawData.flagUpperCase;
  }
}
