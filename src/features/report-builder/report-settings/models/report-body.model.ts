export class ReportBody {
  _id: string;
  reportCode: string;
  reportName: string;
  general: {
    printDepartmentNameCSS: string;
    isPrintDepartmentName: boolean;
    packageNamePrintCSS: string;
    isPackageNamePrint: boolean;
    reportGroupingCSS: string;
    isReportGrouping: boolean;
    reportOrderCSS: string;
    isReportOrder: boolean;
    methodFlagCSS: string;
    isMethodFlag: boolean;
  };
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.reportCode = rawData.reportCode;
    this.reportName = rawData.reportName;
    this.general = rawData.general;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
