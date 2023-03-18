import {makeObservable, action, observable, computed} from 'mobx';
import {Payment} from '../models';
import {PaymentService} from '../services';

export class PaymentStore {
  payment!: Payment;
  paymentList!: Array<Payment>;
  paymentListCount: number = 0;
  constructor() {
    this.payment = new Payment({});
    this.paymentList = [];
    this.reset();
    makeObservable<PaymentStore, any>(this, {
      payment: observable,
      paymentList: observable,
      paymentListCount: observable,

      paymentService: computed,

      updatePayment: action,
      updatePaymentList: action,
      reset: action,
    });
  }

  reset() {
    this.payment = new Payment({});
    this.paymentList = [];
    this.paymentListCount = 0;
  }

  get paymentService() {
    return new PaymentService();
  }

  updatePayment(payload: Payment) {
    this.payment = payload;
  }

  updatePaymentList(res) {
    if (!Array.isArray(res)) {
      this.paymentList = res.payments.data;
      this.paymentListCount = res.payments.paginatorInfo?.count;
    } else {
      this.paymentList = res;
      this.paymentListCount = res?.length || 0;
    }
  }
}
