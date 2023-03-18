import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.sampleContainerStore.fetchListSampleContainer();
  }, 2000);
};
export const resetSampleContainer = () => eventEmitter.emit('reload', {});

export default startup;
