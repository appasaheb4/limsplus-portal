import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.lookupStore.fetchListLookup();
  }, 2000);
};
export const resetLookup = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
