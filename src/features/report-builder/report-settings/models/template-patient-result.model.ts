export class TemplatePatientResult {
  _id: string;
  templateCode: string;
  templateTitle: string;
  pageBranding: object;
  endOfPage: any[];
  endOfReport: any[];
  reportTemplateType: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.templateCode = rawData.templateCode;
    this.templateTitle = rawData.templateName;
    this.pageBranding = rawData.pageBranding;
    this.reportTemplateType = rawData.reportTemplateType;
    this.endOfPage = rawData.endOfPage;
    this.endOfReport = rawData.endOfReport;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItemsTemplatePatientResult {
  endOfPage: any[];
  endOfReport: any[];
  constructor(rawData: {[key in string]: any}) {
    this.endOfPage = rawData.endOfPage;
    this.endOfReport = rawData.endOfReport;
  }
}
