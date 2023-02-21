import React from 'react';
import {stores} from '@/stores';
import {eventEmitter} from '@/core-utils';
const startup = async () => {
  setTimeout(() => {
    stores.bannerStore.fetchListBanner();
  }, 2000);
};

export const resetBanner = async () => {
  stores.bannerStore.reset();
  eventEmitter.emit('reload', {});
};
export default startup;
