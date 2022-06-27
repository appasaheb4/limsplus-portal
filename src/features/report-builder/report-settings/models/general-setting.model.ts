export class GeneralSettings {
  _id: string;
  tempCode: string;
  reportSection: string;
  sectionSetting: string;
  pageSetting: string;

  version: number;
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.reportSection = rawData.reportSection;
    this.sectionSetting = rawData.sectionSetting;
    this.pageSetting = rawData.pageSetting;
    this.version = rawData.version;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
