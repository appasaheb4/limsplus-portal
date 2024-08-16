export class FilterGeneralResEntryList {
  pLab: string;
  departement: string | undefined;
  testStatus: string;
  resultStatus: string;
  testCode: string | undefined;
  analyteCode: string;
  labId: number | string | undefined;
  name: string;
  finishResult: string;
  isSingleLabId?: boolean;

  constructor(rawData: { [key in string]: any }) {
    this.pLab = rawData.pLab;
    this.departement = rawData.departement;
    this.testStatus = rawData.testStatus;
    this.resultStatus = rawData.resultStatus;
    this.testCode = rawData.testCode;
    this.analyteCode = rawData.analyteCode;
    this.labId = rawData.labId;
    this.name = rawData.name;
    this.finishResult = rawData.finishResult;
    this.isSingleLabId = rawData.isSingleLabId;
  }
}

export class SelectedItems {
  library: any[];
  constructor(rawData: { [key in string]: any }) {
    this.library = rawData.library;
  }
}
