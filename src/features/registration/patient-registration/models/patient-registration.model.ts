export class DefaultValues {
  pId?: number | string;
  labId?: number | string;
  mobileNo?: string;
  filterLock?: boolean;
  accordionExpandItem?: string;
  isPVPIdLock: boolean;
  isPOLabIdLock: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.mobileNo = rawData.mobileNo;
    this.filterLock = rawData.filterLock;
    this.accordionExpandItem = rawData.accordionExpandItem;
    this.isPVPIdLock = rawData.isPVPIdLock;
    this.isPOLabIdLock = rawData.isPOLabIdLock;
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
