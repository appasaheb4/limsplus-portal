import {makeObservable, action, observable, computed} from 'mobx';
import {ReportDelivery, OrderDelivered} from '../models';
import {DeliveryQueueService} from '../services';

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

      deliveryQueueService: computed,

      updateReportDeliveryList: action,
      updateOrderDeliveredList: action,
    });
  }

  get deliveryQueueService() {
    return new DeliveryQueueService();
  }

  updateReportDeliveryList(res) {
    this.reportDeliveryList = res.deliveryQueues.data;
    this.reportDeliveryListCount = res.deliveryQueues.paginatorInfo.count;
  }
  updateOrderDeliveredList(res) {
    if (!Array.isArray(res)) {
      this.orderDeliveredList = res;
      this.orderDeliveredListCount = res;
    }
    this.orderDeliveredList = res;
    this.orderDeliveredListCount = res?.length || 0;
  }
}
