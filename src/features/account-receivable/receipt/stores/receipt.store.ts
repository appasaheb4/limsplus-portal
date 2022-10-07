import {makeObservable, action, observable, computed} from 'mobx';
import {Receipt} from '../models';
import {ReceiptService} from '../services';

export class ReceiptStore {
  receiptList!: Array<Receipt>;
  receiptListCount: number = 0;
  constructor() {
    this.receiptList = [];
    makeObservable<ReceiptStore, any>(this, {
      receiptList: observable,
      receiptListCount: observable,

      receiptService: computed,

      updateReceiptList: action,
    });
  }

  get receiptService() {
    return new ReceiptService();
  }

  updateReceiptList(res) {
    this.receiptList = res.receipts.data;
    this.receiptListCount = res.receipts.paginatorInfo.count;
  }
}
