export default class Singleton {
  static myInstance: any = null;
  public textFilterVal;
  public numberFilterVal;
  public dateFilterVal;

  /**
   * @returns {Singleton}
   */
  static getInstance() {
    if (Singleton.myInstance == null) {
      Singleton.myInstance = new Singleton();
    }
    return this.myInstance;
  }

  getTextFilterVal() {
    return this.textFilterVal;
  }
  setTextFilterVal(val: any) {
    this.textFilterVal = val;
  }
}
