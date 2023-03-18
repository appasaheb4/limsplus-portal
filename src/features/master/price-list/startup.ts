import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.priceListStore.fetchListPriceList();
  }, 2000);
};
export const resetPriceList = () => eventEmitter.emit('reload', {});

export default startup;
