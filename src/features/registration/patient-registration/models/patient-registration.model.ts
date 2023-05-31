export class DefaultValues {
  pId?: number | string;
  labId?: number | string;
  mobileNo?: string;
  filterLock?: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.mobileNo = rawData.mobileNo;
    this.filterLock = rawData.filterLock;
  }
}

export class FilterOptionList {
  pIds: Array<any>;
  labIds: Array<any>;
  mobileNos: Array<any>;
  constructor(rawData: {[key in string]: any}) {
    this.pIds = rawData.pIds;
    this.labIds = rawData.labIds;
    this.mobileNos = rawData.mobileNos;
  }
}
