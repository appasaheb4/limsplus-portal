export class TransactionHeader {
  _id: string;
  headerId: number;
  locationCode: string;
  clientCode: string;
  labId: string;
  acSub: string;
  department: string;
  serviceType: string;
  panelCode: string;
  panelName: string;
  priceGroup: string;
  priceList: string;
  grossAmount: number;
  netAmount: number;
  discount: number;
  miscCharges: number;
  transaction: string;
  acClass: string;
  accountType: string;
  customerGroup: string;
  status: string;
  enteredBy: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
  }
}
