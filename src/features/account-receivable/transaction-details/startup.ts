import {stores} from '@/stores';
export const startup = async () => {
  stores.transactionDetailsStore.transactionDetailsService.listTransactionHeader();
};
