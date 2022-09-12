export class TransactionHeader {
  _id: string;
  headerId: number;
  locationCode: string;
  clientCode: string;
  labId: string;
  invoiceAc: number;
  invoiceDate: Date;
  actionDate: Date;
  registrationDate: Date;
  dueDate: Date;
  reportingDate: Date;
  doctorId: number;
  pId: number;
  priceList: string;
  grossAmount: number;
  netAmount: number;
  discount: number;
  receivedAmount: number;
  balance: number;
  acClass: string;
  accountType: string;
  customerGroup: string;
  status: string;
  enteredBy: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.headerId = rawData.headerId;
    this.locationCode = rawData.locationCode;
    this.clientCode = rawData.clientCode;
    this.labId = rawData.labId;
    this.invoiceAc = rawData.invoiceAc;
    this.invoiceDate = rawData.invoiceDate;
    this.actionDate = rawData.actionDate;
    this.registrationDate = rawData.registrationDate;
    this.dueDate = rawData.dueDate;
    this.reportingDate = rawData.reportingDate;
    this.doctorId = rawData.doctorId;
    this.pId = rawData.pId;
    this.priceList = rawData.priceList;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.discount = rawData.discount;
    this.receivedAmount = rawData.receivedAmount;
    this.balance = rawData.balance;
    this.acClass = rawData.acClass;
    this.accountType = rawData.accountType;
    this.customerGroup = rawData.customerGroup;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
  }
}
