import { eventEmitter } from '@/core-utils';
import { stores } from '@/stores';

const startup = async () => {
  setTimeout(() => {
    stores.holidayMasterStore.fetchHolidayMaster();
  }, 2000);
};

export const resetLibrary = () => {
  stores.holidayMasterStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
