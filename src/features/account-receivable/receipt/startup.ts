import {stores} from '@/stores';
export const startup = async () => {
  stores.receiptStore.receiptService.listReceipt();
};
