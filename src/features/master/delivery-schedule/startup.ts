import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.deliveryScheduleStore.fetchDeliverySchedule();
  }, 2000);
};

export const resetDeliverySchedule = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
