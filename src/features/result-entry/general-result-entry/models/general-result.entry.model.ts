export class FilterGeneralResEntryList {
  pLab: string;
  departement: string;
  testStatus: string;
  resultStatus: string;
  testCode: string;
  analyteCode: string;
  labId: number | string;
  finishResult: string;

  constructor(rawData: { [key in string]: any }) {
    this.pLab = rawData.pLab;
    this.departement = rawData.departement;
    this.testStatus = rawData.testStatus;
    this.resultStatus = rawData.resultStatus;
    this.testCode = rawData.testCode;
    this.analyteCode = rawData.analyteCode;
    this.labId = rawData.labId;
    this.finishResult = rawData.finishResult;
  }
}

export class SelectedItems {
  library: any[];
  constructor(rawData: { [key in string]: any }) {
    this.library = rawData.library;
  }
}
