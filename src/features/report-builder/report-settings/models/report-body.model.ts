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
  panel: {
    printPanelNameCSS: string;
    isPrintPanelName: boolean;
    methodNameCSS: string;
    isMethodName: boolean;
    panelInterpretationCSS: string;
    isPanelInterpretation: boolean;
  };
  test: {
    printTestNameCSS: string;
    isPrintTestName: boolean;
    methodNameCSS: string;
    isMethodName: boolean;
    testInterpretationCSS: string;
    isTestInterpretation: boolean;
  };
  analyte: {
    printAnalyteNameCSS: string;
    isPrintAnalyteName: boolean;
    methodNameCSS: string;
    isMethodName: boolean;
    headerItemCSS: string;
    isHeaderItem: boolean;
    abnFlagCSS: string;
    isAbnFlag: boolean;
    criticalCSS: string;
    isCritical: boolean;
    loNorCSS: string;
    isLoNor: boolean;
    hiNorCSS: string;
    isHiNor: boolean;
    resultStatusCSS: string;
    isResultStatus: boolean;
    methodCSS: string;
    isMethod: boolean;
    reportableCSS: string;
    isReportable: boolean;
    interpretationCSS: string;
    isInterpretation: boolean;
    conclusionCSS: string;
    isConclusion: boolean;
    printAnalyteInterpretationCSS: string;
    isPrintAnalyteInterpretation: boolean;
  };
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.reportCode = rawData.reportCode;
    this.reportName = rawData.reportName;
    this.general = rawData.general;
    this.panel = rawData.panel;
    this.test = rawData.test;
    this.analyte = rawData.analyte;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
