import {makeObservable, action, observable, computed} from 'mobx';
import {TransactionHeader, TransactionLine} from '../models';
import {TransactionDetailsService} from '../services';
import _ from 'lodash';

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

      transactionDetailsService: computed,

      updateTransactionHeaderList: action,
      updateTransactionListList: action,
    });
  }

  get transactionDetailsService() {
    return new TransactionDetailsService();
  }

  updateTransactionHeaderList(res) {
    this.transactionHeaderList = res.transactionHeaders.data;
    this.transactionHeaderListCount =
      res.transactionHeaders.paginatorInfo.count;
  }

  updateTransactionListList(res) {
    if (!Array.isArray(res)) {
      this.transactionListList = _.orderBy(
        res.findByFieldsTransactionLine.data,
        ['lineId'],
        ['asc'],
      );
      this.transactionListListCount =
        res.findByFieldsTransactionLine.data?.length;
    } else {
      this.transactionListList = res;
      this.transactionListListCount = res?.length || 0;
    }
  }
}
