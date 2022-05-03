export class DefaultValues {
  labId?: number | string;
  labIdLock?: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.labId = rawData.labId;
    this.labIdLock = rawData.labIdLock;
  }
}
