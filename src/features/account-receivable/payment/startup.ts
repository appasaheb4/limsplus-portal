import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
export const startup = async () => {
  setTimeout(() => {
    stores.paymentStore.paymentService.listPayment();
  }, 2000);
};

export const resetPayment = () => eventEmitter.emit('reload', {});
