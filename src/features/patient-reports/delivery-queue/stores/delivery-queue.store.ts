import {makeObservable, action, observable, computed} from 'mobx';
import {ReportDelivery, OrderDelivered} from '../models';
import {DeliveryQueueService} from '../services';

export class DeliveryQueueStore {
  reportDeliveryList!: Array<ReportDelivery>;
  reportDeliveryListCopy!: Array<ReportDelivery>;
  reportDeliveryListCount: number = 0;
  orderDeliveredList!: Array<OrderDelivered>;
  orderDeliveredListCount: number = 0;
  orderDeliveryPageNo = 0;
  constructor() {
    this.reportDeliveryList = [];
    this.orderDeliveredList = [];
    makeObservable<DeliveryQueueStore, any>(this, {
      reportDeliveryList: observable,
      reportDeliveryListCopy: observable,
      reportDeliveryListCount: observable,
      orderDeliveredList: observable,
      orderDeliveredListCount: observable,
      orderDeliveryPageNo: observable,

      deliveryQueueService: computed,

      updateReportDeliveryList: action,
      updateOrderDeliveredList: action,
      updateOrderDeliveryPageNo: action,
    });
  }

  get deliveryQueueService() {
    return new DeliveryQueueService();
  }

  updateReportDeliveryList(res) {
    if (!Array.isArray(res)) {
      this.reportDeliveryList = res.deliveryQueues.data;
      this.reportDeliveryListCopy = res.deliveryQueues.data;
      this.reportDeliveryListCount = res.deliveryQueues.paginatorInfo.count;
    } else {
      this.reportDeliveryList = res;
      this.reportDeliveryListCount = res?.length;
    }
  }
  updateOrderDeliveredList(res) {
    if (!Array.isArray(res)) {
      this.orderDeliveredList = res;
      this.orderDeliveredListCount = res;
    } else {
      this.orderDeliveredList = res;
      this.orderDeliveredListCount = res?.length || 0;
    }
  }

  filterReportDeliveryList(res: any) {
    this.reportDeliveryList = res.filterDeliveryQueue.data;
    this.reportDeliveryListCopy = res.filterDeliveryQueue.data;
    this.reportDeliveryListCount = res.filterDeliveryQueue.paginatorInfo.count;
  }

  updateOrderDeliveryPageNo(number) {
    this.orderDeliveryPageNo = number;
  }
}
