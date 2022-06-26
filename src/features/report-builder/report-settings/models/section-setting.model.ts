export class SectionSettings {
  _id: string;
  tempCode: string;
  sectionSetting: string;
  sectionRequired: boolean;
  sectionGrid: boolean;
  lineGrid: boolean;
  columnGrid: boolean;

  version: number;
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.sectionSetting = rawData.sectionSetting;
    this.sectionRequired = rawData.sectionRequired;
    this.sectionGrid = rawData.sectionGrid;
    this.lineGrid = rawData.lineGrid;
    this.columnGrid = rawData.columnGrid;

    this.version = rawData.version;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
