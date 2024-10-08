import { makeObservable, action, observable, computed } from 'mobx';
import { BillSummary } from '../models';
import { BillSummaryService } from '../services';

export class BillSummaryStore {
  billSummaryList!: Array<BillSummary>;
  billSummaryListCount: number = 0;
  constructor() {
    this.billSummaryList = [];
    makeObservable<BillSummaryStore, any>(this, {
      billSummaryList: observable,
      billSummaryListCount: observable,

      billSummaryService: computed,

      updateBillSummaryList: action,
    });
  }

  get billSummaryService() {
    return new BillSummaryService();
  }

  updateBillSummaryList(res) {
    this.billSummaryList = res.billSummary.data;
    this.billSummaryListCount = res.billSummary.paginatorInfo.count;
  }
}
