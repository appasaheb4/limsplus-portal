import {makeObservable, action, observable, computed} from 'mobx';
import {ReportDelivery, OrderDelivered} from '../models';

export class DeliveryQueueStore {
  reportDeliveryList!: Array<ReportDelivery>;
  reportDeliveryListCount: number = 0;
  orderDeliveredList!: Array<OrderDelivered>;
  orderDeliveredListCount: number = 0;
  constructor() {
    this.reportDeliveryList = [];
    this.orderDeliveredList = [];
    makeObservable<DeliveryQueueStore, any>(this, {
      reportDeliveryList: observable,
      reportDeliveryListCount: observable,
      orderDeliveredList: observable,
      orderDeliveredListCount: observable,

      updateReportDeliveryList: action,
      updateOrderDeliveredList: action,
    });
  }
  updateReportDeliveryList(res) {
    this.reportDeliveryList = res;
    this.reportDeliveryListCount = res;
  }
  updateOrderDeliveredList(res) {
    this.orderDeliveredList = res;
    this.orderDeliveredListCount = res;
  }
}
