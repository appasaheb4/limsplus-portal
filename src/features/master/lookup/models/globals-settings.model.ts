export class GlobalSettings {
  router: Array<any>;
  documentList: Array<any>;
  fieldName: string;
  arrValue: {value: string; code: string; flagUpperCase: boolean}[];
  description: string;
  defaultItem: Array<{value: string; code: string; flagUpperCase: boolean}>;
  environment: string;

  constructor(rawData: {[key in string]: any}) {
    this.router = rawData.router;
    this.documentList = rawData.documentList;
    this.fieldName = rawData.fieldName;
    this.arrValue = rawData.arrValue;
    this.description = rawData.description;
    this.defaultItem = rawData.defaultItem;
    this.environment = rawData.environment;
  }
}
