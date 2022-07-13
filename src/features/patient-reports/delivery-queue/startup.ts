import {stores} from '@/stores';
export const startup = async () => {
  stores.deliveryQueueStore.deliveryQueueService.listDeliveryQueue();
};
