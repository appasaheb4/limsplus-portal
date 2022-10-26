import {stores} from '@/stores';
export const startup = async () => {
  stores.paymentStore.paymentService.listPayment();
};
