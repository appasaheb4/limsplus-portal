import {makeObservable, action, observable, computed} from 'mobx';
import {TransactionHeader, TransactionLine} from '../models';
import {DeliveryQueueService} from '../services';

export class TransactionDetailsStore {
  transactionHeaderList!: Array<TransactionHeader>;
  transactionHeaderListCount: number = 0;
  transactionListList!: Array<TransactionLine>;
  transactionListListCount: number = 0;
  constructor() {
    this.transactionHeaderList = [];
    this.transactionListList = [];
    makeObservable<TransactionDetailsStore, any>(this, {
      transactionHeaderList: observable,
      transactionHeaderListCount: observable,
      transactionListList: observable,
      transactionListListCount: observable,

      deliveryQueueService: computed,

      updateTransactionHeaderList: action,
      updateTransactionListList: action,
    });
  }

  get deliveryQueueService() {
    return new DeliveryQueueService();
  }

  updateTransactionHeaderList(res) {
    this.transactionHeaderList = res.deliveryQueues.data;
    this.transactionHeaderListCount = res.deliveryQueues.paginatorInfo.count;
  }
  updateTransactionListList(res) {
    if (!Array.isArray(res)) {
      this.transactionListList = res;
      this.transactionListListCount = res;
    } else {
      this.transactionListList = res;
      this.transactionListListCount = res?.length || 0;
    }
  }
}
