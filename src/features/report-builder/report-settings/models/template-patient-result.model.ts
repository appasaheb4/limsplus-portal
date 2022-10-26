export class TemplatePatientResult {
  _id: string;
  reportTemplateType: string;
  pageBranding: object;
  templateCode: string;
  templateTitle: string;
  endOfPage: any[];
  endOfReport: any[];
  departmentHeader: {
    nameCSS: string;
  };
  panelHeader: {
    descriptionCSS: string;
    methodDescriptionCSS: string;
  };
  testHeader: {
    descriptionCSS: string;
    methodDescriptionCSS: string;
  };
  patientResultList: {
    fieldsTextCSS: string;
  };
  testFooter: {
    interpretationCSS: string;
  };
  panelFooter: {
    interpretationCSS: string;
  };
  departmentFooter: {
    imageCSS: string;
  };
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.reportTemplateType = rawData.reportTemplateType;
    this.pageBranding = rawData.pageBranding;
    this.templateCode = rawData.templateCode;
    this.templateTitle = rawData.templateName;
    this.endOfPage = rawData.endOfPage;
    this.endOfReport = rawData.endOfReport;
    this.departmentHeader = rawData.departmentHeader;
    this.panelHeader = rawData.panelHeader;
    this.testHeader = rawData.testHeader;
    this.patientResultList = rawData.patientResultList;
    this.testFooter = rawData.testFooter;
    this.panelFooter = rawData.panelFooter;
    this.departmentFooter = rawData.departmentFooter;
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
