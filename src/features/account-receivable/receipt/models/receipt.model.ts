export class Receipt {
  _id: string;
  headerId: number;
  labId: string;
  customerName: string;
  grossAmount: number;
  netAmount: number;
  discount: number;
  receivedAmount: number;
  balance: number;
  acClass: string;
  invoiceAc: number;
  enteredBy: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.headerId = rawData.headerId;
    this.labId = rawData.labId;
    this.customerName = rawData.customerName;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.discount = rawData.discount;
    this.receivedAmount = rawData.receivedAmount;
    this.balance = rawData.balance;
    this.acClass = rawData.acClass;
    this.invoiceAc = rawData.invoiceAc;
    this.enteredBy = rawData.enteredBy;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
