export class DefaultValues {
  pId?: number | string;
  labId?: number | string;
  mobileNo?: string;
  filterLock?: boolean;
  accordionExpandItem?: string;
  constructor(rawData: {[key in string]: any}) {
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.mobileNo = rawData.mobileNo;
    this.filterLock = rawData.filterLock;
    this.accordionExpandItem = rawData.accordionExpandItem;
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
