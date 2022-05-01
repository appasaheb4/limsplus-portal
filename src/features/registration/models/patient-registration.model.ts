export class DefaultValues {
  labId?: number;
  labIdLock?: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.labId = rawData.labId;
    this.labIdLock = rawData.labIdLock;
  }
}
