import {makeObservable, action, observable, computed} from 'mobx';

export class DeliveryQueueStore {
  constructor() {
    makeObservable<DeliveryQueueStore, any>(this, {});
  }
}
