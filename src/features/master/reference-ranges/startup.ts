import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.referenceRangesStore.fetchListReferenceRanges();
  }, 2000);
};

export const resetReferenceRange = () => eventEmitter.emit('reload', {});

export default startup;
