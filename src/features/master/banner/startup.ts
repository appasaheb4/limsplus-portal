import {stores} from '@/stores';
import {eventEmitter} from '@/core-utils';
const startup = async () => {
  setTimeout(() => {
    stores.bannerStore.fetchListBanner();
  }, 2000);
};

export const resetBanner = () => {
  stores.bannerStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
